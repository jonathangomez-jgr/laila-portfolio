import { NextRequest, NextResponse } from "next/server";
import {
  startEvaluation,
  getEvaluationById,
  findInProgressEvaluation,
  listEvaluationsForTemplate,
  getActiveTemplateForSlug,
} from "@/lib/salesforce/acceptanceWizard";
import { getCurrentUser, userHasAccessToSlug } from "@/lib/portalAuth";

export const dynamic = "force-dynamic";

/**
 * GET /api/portal/acceptance/evaluation?id=...        → trae una evaluación por Id
 * GET /api/portal/acceptance/evaluation?slug=...       → trae mi evaluación InProgress + lista de todas las sometidas del template
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const id = request.nextUrl.searchParams.get("id")?.trim();
    const slug = request.nextUrl.searchParams.get("slug")?.trim();

    if (id) {
      const evaluation = await getEvaluationById(id);
      if (!evaluation) {
        return NextResponse.json(
          { error: "evaluation not found" },
          { status: 404 },
        );
      }
      // Simple ownership guard: evaluator can read their own eval; Salesforce/Partner can read any.
      if (
        user.role === "Client" &&
        evaluation.evaluatorPortalAccessId !== user.id
      ) {
        return NextResponse.json({ error: "forbidden" }, { status: 403 });
      }
      return NextResponse.json({ evaluation });
    }

    if (slug) {
      if (!userHasAccessToSlug(user, slug)) {
        return NextResponse.json({ error: "forbidden" }, { status: 403 });
      }
      const template = await getActiveTemplateForSlug(slug);
      if (!template) {
        return NextResponse.json(
          { error: "template not found" },
          { status: 404 },
        );
      }
      const inProgress = await findInProgressEvaluation(template.id, user.id);
      const all = await listEvaluationsForTemplate(template.id);
      return NextResponse.json({
        templateId: template.id,
        inProgress,
        all,
      });
    }

    return NextResponse.json(
      { error: "id or slug required" },
      { status: 400 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST /api/portal/acceptance/evaluation   → inicia una evaluación nueva para el user actual contra el template activo del slug
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const body = (await request.json()) as { slug?: string };
    const slug = body.slug?.trim();
    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }
    if (!userHasAccessToSlug(user, slug)) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const template = await getActiveTemplateForSlug(slug);
    if (!template) {
      return NextResponse.json(
        { error: "no active template for slug" },
        { status: 404 },
      );
    }

    // If the user already has an InProgress evaluation, return it instead of
    // creating a new one — multi-evaluator but single open eval per user.
    const existing = await findInProgressEvaluation(template.id, user.id);
    if (existing) {
      return NextResponse.json({ evaluation: existing, resumed: true });
    }

    const evaluation = await startEvaluation({
      templateId: template.id,
      evaluatorPortalAccessId: user.id,
      evaluatorName: user.name,
      evaluatorEmail: user.email,
    });
    return NextResponse.json({ evaluation, resumed: false });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * PATCH /api/portal/acceptance/evaluation?id=...  → actualiza currentPage para resume
 */
export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const id = request.nextUrl.searchParams.get("id")?.trim();
    if (!id) {
      return NextResponse.json(
        { error: "evaluation id required" },
        { status: 400 },
      );
    }
    const body = (await request.json()) as { currentPage?: number };
    if (typeof body.currentPage !== "number") {
      return NextResponse.json(
        { error: "currentPage required (number)" },
        { status: 400 },
      );
    }
    const { updateCurrentPage } = await import(
      "@/lib/salesforce/acceptanceWizard"
    );
    await updateCurrentPage(id, body.currentPage);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
