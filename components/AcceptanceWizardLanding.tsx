"use client";

import { useCallback, useEffect, useState } from "react";
import type { PortalUser } from "@/lib/portalAuth";
import type {
  TemplateDTO,
  EvaluationDTO,
} from "@/lib/salesforce/acceptanceWizard";
import AcceptanceWizard from "./AcceptanceWizard";

const ROLE_LABEL: Record<string, string> = {
  Client: "del cliente",
  Partner: "del partner",
  Salesforce: "del equipo Salesforce",
};

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

type ListingResponse = {
  templateId: string;
  inProgress: EvaluationDTO | null;
  all: EvaluationDTO[];
};

export default function AcceptanceWizardLanding({
  user,
  slug,
}: {
  user: PortalUser;
  slug: string;
}) {
  const [template, setTemplate] = useState<TemplateDTO | null>(null);
  const [listing, setListing] = useState<ListingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeEvaluation, setActiveEvaluation] =
    useState<EvaluationDTO | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [tplRes, listRes] = await Promise.all([
        fetch(`/api/portal/acceptance/template?slug=${encodeURIComponent(slug)}`),
        fetch(
          `/api/portal/acceptance/evaluation?slug=${encodeURIComponent(slug)}`,
        ),
      ]);
      if (!tplRes.ok) throw new Error(`Template load failed (${tplRes.status})`);
      if (!listRes.ok)
        throw new Error(`Listing load failed (${listRes.status})`);
      const tplBody = (await tplRes.json()) as { template: TemplateDTO };
      const listBody = (await listRes.json()) as ListingResponse;
      setTemplate(tplBody.template);
      setListing(listBody);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void load();
  }, [load]);

  const startNew = async () => {
    setStarting(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/acceptance/evaluation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (!res.ok) throw new Error(`Start failed (${res.status})`);
      const body = (await res.json()) as { evaluation: EvaluationDTO };
      setActiveEvaluation(body.evaluation);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setStarting(false);
    }
  };

  if (activeEvaluation && template) {
    return (
      <AcceptanceWizard
        user={user}
        template={template}
        evaluation={activeEvaluation}
        onExit={() => {
          setActiveEvaluation(null);
          void load();
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Cargando evaluación…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
        <p className="font-semibold">No pudimos cargar la evaluación</p>
        <p className="mt-1 text-red-700">{error}</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Aún no hay una plantilla de aceptación configurada para este proyecto.
      </div>
    );
  }

  const inProgress = listing?.inProgress ?? null;
  const otherEvals = (listing?.all ?? []).filter(
    (e) => !inProgress || e.id !== inProgress.id,
  );
  const roleLabel = ROLE_LABEL[user.role] ?? "del equipo";
  const openerIsMe =
    inProgress?.evaluatorPortalAccessId === user.id;

  return (
    <div className="space-y-5">
      {/* Hero card */}
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
          Evaluación de aceptación · colaborativa {roleLabel}
        </p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          {template.label}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Set integral de {template.totalCriteria} criterios en{" "}
          {template.categories.length} categorías. Pueden trabajar en paralelo
          varios evaluadores de tu equipo; cada respuesta queda estampada con
          quién la registró. Un solo firmante cierra la evaluación.
        </p>

        {inProgress && inProgress.collaborators.length > 0 && (
          <div className="mt-4 flex items-center gap-3">
            <div className="flex -space-x-2">
              {inProgress.collaborators.slice(0, 5).map((c) => (
                <span
                  key={c.portalAccessId}
                  className={
                    "w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-bold shadow-sm " +
                    (c.portalAccessId === user.id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-200 text-slate-700")
                  }
                  title={`${c.name} · ${c.answeredCount} respuestas`}
                >
                  {initialsOf(c.name)}
                </span>
              ))}
              {inProgress.collaborators.length > 5 && (
                <span className="w-8 h-8 rounded-full border-2 border-white bg-white text-slate-600 flex items-center justify-center text-[11px] font-bold shadow-sm">
                  +{inProgress.collaborators.length - 5}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600">
              {inProgress.collaborators.length}{" "}
              {inProgress.collaborators.length === 1
                ? "colaborador ha"
                : "colaboradores han"}{" "}
              respondido ya
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {inProgress ? (
            <button
              type="button"
              onClick={() => setActiveEvaluation(inProgress)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              {openerIsMe || inProgress.collaborators.some((c) => c.portalAccessId === user.id)
                ? "Continuar evaluación →"
                : "Unirme a la evaluación →"}
            </button>
          ) : (
            <button
              type="button"
              onClick={startNew}
              disabled={starting}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {starting ? "Iniciando…" : "Iniciar evaluación"}
            </button>
          )}
          {inProgress && (
            <span className="text-xs text-slate-600">
              Progreso:{" "}
              <strong className="text-slate-900">
                {inProgress.progress.answered} de {inProgress.progress.total}
              </strong>{" "}
              ({inProgress.progress.pct}%)
              {inProgress.evaluatorName && !openerIsMe && (
                <>
                  {" "}· iniciada por{" "}
                  <strong className="text-slate-900">
                    {inProgress.evaluatorName}
                  </strong>
                </>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Previous evaluations · firmadas por el mismo rol */}
      {otherEvals.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Evaluaciones firmadas {roleLabel}
          </p>
          <div className="mt-3 divide-y divide-slate-100">
            {otherEvals.map((ev) => (
              <div
                key={ev.id}
                className="flex items-center justify-between py-2.5 gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">
                    {ev.evaluatorName ?? "Evaluador"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {ev.status === "Submitted"
                      ? `Firmada el ${new Date(ev.submittedAt ?? "").toLocaleString("es-MX")}`
                      : `En curso · ${ev.progress.pct}%`}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {ev.status === "Submitted" && ev.finalDecision && (
                    <span
                      className={
                        "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider " +
                        (ev.finalDecision === "Si"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700")
                      }
                    >
                      {ev.finalDecision === "Si" ? "Sí · lista" : "No · aún no"}
                    </span>
                  )}
                  {ev.confidenceLevel != null && (
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      Confianza {ev.confidenceLevel}%
                    </span>
                  )}
                  {ev.status === "Submitted" && (
                    <a
                      href={`/api/portal/acceptance/pdf?evaluationId=${encodeURIComponent(ev.id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:border-cyan-400 hover:text-cyan-700 hover:bg-cyan-50 transition"
                      title="Descargar PDF firmado"
                    >
                      📄 PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
