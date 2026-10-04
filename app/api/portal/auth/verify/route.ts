import { NextRequest, NextResponse } from "next/server";
import {
  setSessionCookie,
  updateLastLogin,
  verifyMagicToken,
} from "@/lib/portalAuth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const returnToRaw =
    request.nextUrl.searchParams.get("returnTo") ?? "/portal";

  // Solo paths internos aceptados como returnTo
  const returnTo = returnToRaw.startsWith("/") ? returnToRaw : "/portal";

  const user = await verifyMagicToken(token);
  if (!user) {
    return NextResponse.redirect(
      new URL("/portal/login?error=expired", request.url),
    );
  }

  await setSessionCookie(user);
  await updateLastLogin(user.id);

  return NextResponse.redirect(new URL(returnTo, request.url));
}
