// Alias de `/api/portal/test-matrix?slug=betterware` para backward-compat con
// la ruta pública /customer-projects/betterware (que no pasa slug en el fetch).
// Toda nueva integración debería usar `/api/portal/test-matrix?slug=X`.

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
