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

    // Resolver returnTo + projectName:
    //  1) Si el request trae slug Y el user tiene acceso → `/portal/${slug}`.
    //  2) Si no trae slug y el user tiene 1 proyecto → `/portal/${único}`.
    //  3) Si no trae slug y el user tiene varios → `/portal` (selector).
    //  4) Si no cumple nada, no está autorizado.
    let returnTo: string;
    let projectName: string;

    if (requestedSlug && userHasAccessToSlug(user, requestedSlug)) {
      returnTo = `/portal/${requestedSlug}`;
      const project = customerProjects.find((p) => p.slug === requestedSlug);
      projectName = project?.customerName ?? requestedSlug;
    } else if (!requestedSlug && user.projects.length === 1) {
      const only = user.projects[0];
      returnTo = `/portal/${only}`;
      const project = customerProjects.find((p) => p.slug === only);
      projectName = project?.customerName ?? only;
    } else if (!requestedSlug && user.projects.length > 1) {
      returnTo = "/portal";
      projectName = "Portal FDE";
    } else {
      return NextResponse.json(NOT_AUTHORIZED_RESPONSE, { status: 403 });
    }

    await sendMagicLink(user, returnTo, projectName);
    return NextResponse.json(OK_RESPONSE);
  } catch (err) {
    console.error("[portal/request-link] error:", err);
    return NextResponse.json(ERROR_RESPONSE, { status: 500 });
  }
}
