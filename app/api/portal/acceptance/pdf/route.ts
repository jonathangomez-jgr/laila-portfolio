import { NextRequest, NextResponse } from "next/server";
import { sfQuery, sfFetchFileBytes } from "@/lib/salesforce";
import { getCurrentUser } from "@/lib/portalAuth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/portal/acceptance/pdf?evaluationId=...
 *
 * Streams the signed PDF for the evaluation. The ContentDocumentId is stored
 * in SubmittedPdfId__c on the Evaluation. We query the latest ContentVersion
 * for that document and serve its VersionData.
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const evaluationId = request.nextUrl.searchParams
      .get("evaluationId")
      ?.trim();
    if (!evaluationId) {
      return NextResponse.json(
        { error: "evaluationId required" },
        { status: 400 },
      );
    }

    const evalRows = await sfQuery<{
      SubmittedPdfId__c: string | null;
      Evaluator__c: string | null;
      Name: string;
    }>(
      `SELECT SubmittedPdfId__c, Evaluator__c, Name
       FROM JGR_FDE_AcceptanceEvaluation__c
       WHERE Id = '${evaluationId}' LIMIT 1`,
    );
    if (evalRows.length === 0) {
      return NextResponse.json({ error: "evaluation not found" }, { status: 404 });
    }
    const ev = evalRows[0];
    if (user.role === "Client" && ev.Evaluator__c !== user.id) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    if (!ev.SubmittedPdfId__c) {
      return NextResponse.json({ error: "pdf not generated" }, { status: 404 });
    }

    const versions = await sfQuery<{ Id: string }>(
      `SELECT Id FROM ContentVersion
       WHERE ContentDocumentId = '${ev.SubmittedPdfId__c}' AND IsLatest = true
       LIMIT 1`,
    );
    if (versions.length === 0) {
      return NextResponse.json({ error: "pdf version not found" }, { status: 404 });
    }

    const { bytes, contentType } = await sfFetchFileBytes(versions[0].Id);
    const filename = `Evaluacion_${ev.Name}.pdf`;
    // Copy into a fresh Buffer so NextResponse accepts it as BodyInit
    const body = Buffer.from(bytes);
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType || "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
