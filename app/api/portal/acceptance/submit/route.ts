import { NextRequest, NextResponse } from "next/server";
import {
  submitEvaluation,
  type FinalDecision,
} from "@/lib/salesforce/acceptanceWizard";
import { getCurrentUser } from "@/lib/portalAuth";

export const dynamic = "force-dynamic";

/**
 * POST /api/portal/acceptance/submit
 * body: { evaluationId, finalDecision (Si|No · requerido), confidenceLevel (0-100 · opcional), finalComment }
 *
 * Cierra la evaluación. Status → Submitted (locked). PDF generation queda
 * para el siguiente endpoint; aquí persistimos la decisión y la confianza.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const body = (await request.json()) as {
      evaluationId?: string;
      finalDecision?: FinalDecision;
      confidenceLevel?: number | null;
      finalComment?: string | null;
    };
    if (!body.evaluationId) {
      return NextResponse.json(
        { error: "evaluationId required" },
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
    const evaluation = await submitEvaluation({
      evaluationId: body.evaluationId,
      finalDecision: body.finalDecision,
      confidenceLevel: confidence,
      finalComment: body.finalComment ?? null,
    });
    return NextResponse.json({ evaluation });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
