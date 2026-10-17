import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import {
  submitEvaluation,
  getActiveTemplateForSlug,
  type FinalDecision,
} from "@/lib/salesforce/acceptanceWizard";
import { sfUploadFileToRecord, sfUpdate } from "@/lib/salesforce";
import { getCurrentUser } from "@/lib/portalAuth";
import { AcceptancePdfDocument } from "@/lib/acceptance/pdfDocument";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Uint8Array> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return new Uint8Array(Buffer.concat(chunks));
}

/**
 * POST /api/portal/acceptance/submit
 * body: { evaluationId, finalDecision, confidenceLevel, finalComment, signatureConfirmed, slug }
 *
 * Cierra la evaluación (Status → Submitted), genera el PDF firmado, lo sube
 * como ContentDocument linkeado a la Evaluation, y guarda el Id del documento
 * en SubmittedPdfId__c.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const body = (await request.json()) as {
      evaluationId?: string;
      slug?: string;
      finalDecision?: FinalDecision;
      confidenceLevel?: number | null;
      finalComment?: string | null;
      signatureConfirmed?: boolean;
    };
    if (!body.evaluationId) {
      return NextResponse.json(
        { error: "evaluationId required" },
        { status: 400 },
      );
    }
    if (!body.slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }
    if (!body.signatureConfirmed) {
      return NextResponse.json(
        { error: "signatureConfirmed must be true" },
        { status: 400 },
      );
    }
    if (body.finalDecision !== "Si" && body.finalDecision !== "No") {
      return NextResponse.json(
        { error: "finalDecision must be 'Si' or 'No'" },
        { status: 400 },
      );
    }
    const confidence =
      body.confidenceLevel == null ? null : Number(body.confidenceLevel);
    if (confidence != null && (confidence < 0 || confidence > 100)) {
      return NextResponse.json(
        { error: "confidenceLevel must be 0-100" },
        { status: 400 },
      );
    }

    // 1) Submit the evaluation (status → Submitted, decision, confidence)
    const evaluation = await submitEvaluation({
      evaluationId: body.evaluationId,
      finalDecision: body.finalDecision,
      confidenceLevel: confidence,
      finalComment: body.finalComment ?? null,
    });

    // 2) Generate PDF
    const template = await getActiveTemplateForSlug(body.slug);
    if (!template) {
      // Shouldn't happen · submit succeeded already
      return NextResponse.json({ evaluation, pdfError: "template not found" });
    }

    let submittedPdfId: string | null = null;
    try {
      const stream = await renderToStream(
        <AcceptancePdfDocument template={template} evaluation={evaluation} />,
      );
      const pdfBytes = await streamToBuffer(stream);
      const filename = `Evaluacion_${evaluation.name}_${(evaluation.submittedAt ?? "").substring(0, 10)}.pdf`;
      const uploaded = await sfUploadFileToRecord(
        evaluation.id,
        filename,
        "application/pdf",
        pdfBytes,
      );
      submittedPdfId = uploaded.contentDocumentId;
      await sfUpdate("JGR_FDE_AcceptanceEvaluation__c", evaluation.id, {
        SubmittedPdfId__c: submittedPdfId,
      });
    } catch (pdfErr) {
      // PDF generation/upload failed — the submission is still valid.
      console.error("PDF generation failed", pdfErr);
    }

    return NextResponse.json({
      evaluation: { ...evaluation, submittedPdfId: submittedPdfId ?? undefined },
      pdfReady: submittedPdfId !== null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
