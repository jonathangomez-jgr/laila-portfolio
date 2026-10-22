import { NextRequest, NextResponse } from "next/server";
import {
  previewConsolidation,
  createConsolidatedEvaluation,
  findConsolidatedInProgress,
} from "@/lib/salesforce/acceptanceWizard";
import { getCurrentUser, userHasAccessToSlug } from "@/lib/portalAuth";

export const dynamic = "force-dynamic";

/**
 * GET /api/portal/acceptance/consolidate?slug=...
 * Preview de la consolidación para el slug + rol del usuario:
 * - cuántos criterios totales (universo del master template)
 * - cuáles evaluaciones parciales lo alimentan
 * - desglose de cómo quedaría cada criterio (Pass/PWO/Fail/NA/Unanswered)
 * - si ya hay una Consolidated InProgress, se incluye para redirigir
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const slug = request.nextUrl.searchParams.get("slug")?.trim();
    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }
    if (!userHasAccessToSlug(user, slug)) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    const [preview, existing] = await Promise.all([
      previewConsolidation(slug, user.role),
      findConsolidatedInProgress(slug, user.role),
    ]);
    if (!preview) {
      return NextResponse.json(
        { error: "no master template found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ preview, existing });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST /api/portal/acceptance/consolidate
 * body: { slug }
 * Crea una Consolidated eval para el rol del user. Si ya existe una InProgress,
 * la devuelve en lugar de crear otra.
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
    const existing = await findConsolidatedInProgress(slug, user.role);
    if (existing) {
      return NextResponse.json({ evaluation: existing, resumed: true });
    }
    const evaluation = await createConsolidatedEvaluation({
      slug,
      role: user.role,
      signer: { portalAccessId: user.id, name: user.name, email: user.email },
    });
    return NextResponse.json({ evaluation, resumed: false });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
