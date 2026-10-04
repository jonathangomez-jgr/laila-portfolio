import { NextResponse } from "next/server";
import { getTestMatrixForCustomer } from "@/lib/salesforce/fdeTracker";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cases = await getTestMatrixForCustomer("betterware");
    return NextResponse.json({ cases });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
