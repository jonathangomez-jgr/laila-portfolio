import { NextRequest, NextResponse } from "next/server";
import { getTestMatrixForCustomer } from "@/lib/salesforce/fdeTracker";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug")?.trim();
    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }
    const cases = await getTestMatrixForCustomer(slug);
    return NextResponse.json({ cases });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
