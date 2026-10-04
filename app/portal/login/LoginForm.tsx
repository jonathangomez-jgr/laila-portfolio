"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getPortalProjectMeta } from "@/lib/portalProjectsMeta";

function LoginForm() {
  const params = useSearchParams();
  const router = useRouter();
  const returnTo = params.get("returnTo") ?? "";
  const projectParam = params.get("project") ?? "";
  const error = params.get("error");

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<
    | { kind: "error"; message: string }
    | { kind: "not_authorized"; message: string }
    | null
  >(null);

  // Resolver slug:
  //  1) ?project=betterware (entry directo al login de un cliente)
  //  2) returnTo=/portal/betterware (redirect desde /portal/[slug] sin sesión)
  //  3) sin slug (login genérico) — el server infiere desde user.projects[0]
  const slugFromReturnTo = returnTo.startsWith("/portal/")
    ? returnTo.replace("/portal/", "").split("/")[0]
    : "";
  const slug = projectParam || slugFromReturnTo;
  const project = getPortalProjectMeta(slug);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setFeedback({ kind: "error", message: "Falta tu correo." });
      return;
    }
    setSubmitting(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/portal/auth/request-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), slug: slug || null }),
      });
      const data: { status?: string; message?: string } = await res
        .json()
        .catch(() => ({}));

      if (data.status === "sent") {
        router.push("/portal/auth/sent");
        return;
      }
      if (data.status === "not_authorized") {
        setFeedback({
          kind: "not_authorized",
          message:
            data.message ??
            "Este correo no está autorizado para acceder al portal.",
        });
        return;
      }
      setFeedback({
        kind: "error",
        message:
          data.message ??
          "No pudimos procesar tu solicitud. Intenta de nuevo en unos minutos.",
      });
    } catch {
      setFeedback({
        kind: "error",
        message:
          "No pudimos procesar tu solicitud. Intenta de nuevo en unos minutos.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <div className="mb-6 flex items-center gap-3">
        {project ? (
          <>
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
              <Image
                src={project.logo}
                alt={project.customerName}
                width={48}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
                Portal del proyecto
              </p>
              <h1 className="text-lg font-semibold leading-tight text-slate-900">
                {project.customerName}
              </h1>
              {project.tagline && (
                <p className="text-[11px] text-slate-500">{project.tagline}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <Image
              src="/Assets Salesforce Brand/Logo/Main Salesforce Cloud - Primary.svg"
              alt="Salesforce"
              width={40}
              height={40}
            />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
                Portal de Proyectos
              </p>
              <h1 className="text-xl font-semibold text-slate-900">
                FDE · Salesforce
              </h1>
            </div>
          </>
        )}
      </div>

      {error === "expired" && (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Tu enlace expiró o no es válido. Pedí uno nuevo con tu correo.
        </div>
      )}

      <p className="mb-4 text-sm text-slate-600">
        {project ? (
          <>
            Ingresá tu correo autorizado para acceder al portal de{" "}
            <strong className="text-slate-900">{project.customerName}</strong>.
            Te enviamos un enlace de un solo clic.
          </>
        ) : (
          <>
            Ingresá tu correo autorizado para recibir un enlace de acceso al
            portal del proyecto que tenés asignado.
          </>
        )}
      </p>

      <form onSubmit={submit} className="space-y-3">
        <label className="block">
          <span className="text-xs font-semibold text-slate-700">Correo</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@correo.com"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>

        {feedback?.kind === "error" && (
          <p className="text-xs text-rose-700">{feedback.message}</p>
        )}

        {feedback?.kind === "not_authorized" && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
            <p className="font-semibold">Correo no autorizado</p>
            <p className="mt-1 text-amber-800">
              Este correo no está en la lista de acceso al portal. Si deberías
              tener acceso, escribí a{" "}
              <a
                href="mailto:jonathan.gomez@salesforce.com?subject=Solicitud%20de%20acceso%20al%20Portal%20FDE"
                className="font-semibold text-amber-900 underline underline-offset-2 hover:text-amber-950"
              >
                jonathan.gomez@salesforce.com
              </a>{" "}
              y lo gestionamos.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Enviando..." : "Enviar enlace de acceso"}
        </button>
      </form>

      <p className="mt-6 text-[11px] text-slate-500">
        El enlace llega al correo en los próximos minutos y es válido por 15
        minutos. ¿Necesitás acceso? Escribí a{" "}
        <a
          href="mailto:jonathan.gomez@salesforce.com?subject=Solicitud%20de%20acceso%20al%20Portal%20FDE"
          className="font-medium text-slate-700 underline underline-offset-2 hover:text-slate-900"
        >
          jonathan.gomez@salesforce.com
        </a>
        .
      </p>
    </div>
  );
}

export default function PortalLoginShell() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      <Suspense fallback={<div className="text-sm text-slate-500">Cargando…</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
