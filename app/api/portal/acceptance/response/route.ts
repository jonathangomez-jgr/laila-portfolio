import { NextRequest, NextResponse } from "next/server";
import {
  updateResponse,
  getEvaluationRoleById,
  type Result,
} from "@/lib/salesforce/acceptanceWizard";
import { getCurrentUser } from "@/lib/portalAuth";

export const dynamic = "force-dynamic";

/**
 * PATCH /api/portal/acceptance/response
 * body: { evaluationId, responseId, result (Pass|Fail|NA|null), comment }
 *
 * Guarda una respuesta individual. Si la evaluación está Submitted, rechaza
 * (immutability). Si Result === "Fail" y comment vacío, rechaza (requerido).
 */
export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const body = (await request.json()) as {
      evaluationId?: string;
      responseId?: string;
      result?: Result | null;
      comment?: string | null;
    };

    if (!body.evaluationId || !body.responseId) {
      return NextResponse.json(
        { error: "evaluationId + responseId required" },
        { status: 400 },
      );
    }
    const result = body.result ?? null;
    const comment = body.comment ?? null;

    if (
      (result === "Fail" || result === "PassWithObservations") &&
      (!comment || comment.trim().length === 0)
    ) {
      return NextResponse.json(
        {
          error:
            "comment is required when result = Fail or PassWithObservations",
        },
        { status: 400 },
      );
    }

    // Role guard: solo usuarios del mismo rol pueden editar respuestas de la eval.
    const evalRole = await getEvaluationRoleById(body.evaluationId);
    if (evalRole === undefined) {
      return NextResponse.json(
        { error: "evaluation not found" },
        { status: 404 },
      );
    }
    if (evalRole !== user.role) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    await updateResponse({
      evaluationId: body.evaluationId,
      responseId: body.responseId,
      result,
      comment,
      answeredBy: {
        portalAccessId: user.id,
        name: user.name,
        email: user.email,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
