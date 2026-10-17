import { NextRequest, NextResponse } from "next/server";
import { getActiveTemplateForSlug } from "@/lib/salesforce/acceptanceWizard";
import { getCurrentUser, userHasAccessToSlug } from "@/lib/portalAuth";

export const dynamic = "force-dynamic";

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
    const template = await getActiveTemplateForSlug(slug);
    if (!template) {
      return NextResponse.json({ error: "template not found" }, { status: 404 });
    }
    return NextResponse.json({ template });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
