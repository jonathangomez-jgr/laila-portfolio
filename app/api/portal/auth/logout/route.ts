import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/portalAuth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  await clearSessionCookie();
  return NextResponse.redirect(new URL("/portal/login", request.url), {
    status: 303,
  });
}

export async function GET(request: NextRequest) {
  // también permitir GET para links tipo "cerrar sesión"
  await clearSessionCookie();
  return NextResponse.redirect(new URL("/portal/login", request.url));
}
