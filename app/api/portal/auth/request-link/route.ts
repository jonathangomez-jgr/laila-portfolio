import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail, sendMagicLink, userHasAccessToSlug } from "@/lib/portalAuth";
import { customerProjects } from "@/data/customerProjects";

export const dynamic = "force-dynamic";

const OK_RESPONSE = {
  status: "sent" as const,
  message:
    "Te enviamos un enlace de acceso. Revisá tu correo en los próximos minutos.",
};

const NOT_AUTHORIZED_RESPONSE = {
  status: "not_authorized" as const,
  message:
    "Este correo no está autorizado para acceder al portal. Si deberías tener acceso, escribí a jonathan.gomez@salesforce.com y lo gestionamos.",
};

const ERROR_RESPONSE = {
  status: "error" as const,
  message:
    "No pudimos procesar tu solicitud en este momento. Volvé a intentar en unos minutos.",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const requestedSlug =
      typeof body.slug === "string" ? body.slug.trim() : "";

    if (!email) {
      return NextResponse.json(
        { status: "error", message: "Ingresá un correo." },
        { status: 400 },
      );
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(NOT_AUTHORIZED_RESPONSE, { status: 403 });
    }

    // Resolver slug efectivo:
    //  1) Si el request trae uno Y el user tiene acceso, usarlo.
    //  2) Si no trae uno (login directo), usar el primer proyecto autorizado.
    //  3) Si no cumple nada, el usuario está autorizado pero no para ese proyecto.
    let effectiveSlug: string | null = null;
    if (requestedSlug && userHasAccessToSlug(user, requestedSlug)) {
      effectiveSlug = requestedSlug;
    } else if (!requestedSlug && user.projects.length > 0) {
      effectiveSlug = user.projects[0];
    }

    if (!effectiveSlug) {
      return NextResponse.json(NOT_AUTHORIZED_RESPONSE, { status: 403 });
    }

    const project = customerProjects.find((p) => p.slug === effectiveSlug);
    const projectName = project?.customerName ?? effectiveSlug;

    await sendMagicLink(user, effectiveSlug, projectName);
    return NextResponse.json(OK_RESPONSE);
  } catch (err) {
    console.error("[portal/request-link] error:", err);
    return NextResponse.json(ERROR_RESPONSE, { status: 500 });
  }
}
