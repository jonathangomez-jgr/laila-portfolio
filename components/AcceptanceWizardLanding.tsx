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

type ConsolidationPreviewResponse = {
  preview: {
    masterTemplateId: string;
    masterTemplateLabel: string;
    totalCriteria: number;
    sourceEvaluations: {
      id: string;
      name: string;
      version: string | null;
      label: string;
      status: string;
      submittedAt: string | null;
    }[];
    byResult: {
      Pass: number;
      PassWithObservations: number;
      Fail: number;
      NA: number;
      Unanswered: number;
    };
  };
  existing: EvaluationDTO | null;
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
  const [consolidation, setConsolidation] =
    useState<ConsolidationPreviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [consolidating, setConsolidating] = useState(false);
  const [showConsolidatePreview, setShowConsolidatePreview] = useState(false);
  const [consolidateAck, setConsolidateAck] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeEvaluation, setActiveEvaluation] =
    useState<EvaluationDTO | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [tplRes, listRes, consRes] = await Promise.all([
        fetch(`/api/portal/acceptance/template?slug=${encodeURIComponent(slug)}`),
        fetch(
          `/api/portal/acceptance/evaluation?slug=${encodeURIComponent(slug)}`,
        ),
        fetch(
          `/api/portal/acceptance/consolidate?slug=${encodeURIComponent(slug)}`,
        ),
      ]);
      if (!tplRes.ok) throw new Error(`Template load failed (${tplRes.status})`);
      if (!listRes.ok)
        throw new Error(`Listing load failed (${listRes.status})`);
      const tplBody = (await tplRes.json()) as { template: TemplateDTO };
      const listBody = (await listRes.json()) as ListingResponse;
      setTemplate(tplBody.template);
      setListing(listBody);
      if (consRes.ok) {
        const consBody = (await consRes.json()) as ConsolidationPreviewResponse;
        setConsolidation(consBody);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void load();
  }, [load]);

  const startConsolidation = async () => {
    setConsolidating(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/acceptance/consolidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (!res.ok) throw new Error(`Consolidate failed (${res.status})`);
      const body = (await res.json()) as { evaluation: EvaluationDTO };
      // Al abrir la consolidada hay que cargar el template maestro (no el activo)
      const tplRes = await fetch(
        `/api/portal/acceptance/template?id=${encodeURIComponent(body.evaluation.templateId)}`,
      );
      if (tplRes.ok) {
        const tplBody = (await tplRes.json()) as { template: TemplateDTO };
        setTemplate(tplBody.template);
      }
      setActiveEvaluation(body.evaluation);
      setShowConsolidatePreview(false);
      setConsolidateAck(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setConsolidating(false);
    }
  };

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

      {/* Consolidation card · aparece cuando hay 2+ evaluaciones parciales del mismo rol */}
      {consolidation &&
        consolidation.preview.sourceEvaluations.length >= 2 && (
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
              Firma consolidada · evaluación final
            </p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">
              Unir las {consolidation.preview.sourceEvaluations.length} evaluaciones
              y firmar sobre el universo completo
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Tomamos la última marca por criterio de cada evaluación previa y
              armamos una vista final sobre los{" "}
              <strong className="text-slate-900">
                {consolidation.preview.totalCriteria} criterios
              </strong>{" "}
              del template maestro ({consolidation.preview.masterTemplateLabel}).
              Vas a poder revisar, ajustar lo que haga falta, y firmar una sola
              vez con trazabilidad por criterio.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowConsolidatePreview(true)}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition disabled:opacity-50"
                disabled={consolidating}
              >
                {consolidation.existing
                  ? "Continuar consolidación →"
                  : "Consolidar y firmar →"}
              </button>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-full bg-green-100 text-green-700 px-2 py-0.5 font-semibold">
                  ✓ {consolidation.preview.byResult.Pass} cumple
                </span>
                {consolidation.preview.byResult.PassWithObservations > 0 && (
                  <span className="rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 font-semibold">
                    ⚠ {consolidation.preview.byResult.PassWithObservations} con obs.
                  </span>
                )}
                <span className="rounded-full bg-red-100 text-red-700 px-2 py-0.5 font-semibold">
                  ✕ {consolidation.preview.byResult.Fail} no cumple
                </span>
                {consolidation.preview.byResult.NA > 0 && (
                  <span className="rounded-full bg-slate-200 text-slate-600 px-2 py-0.5 font-semibold">
                    — {consolidation.preview.byResult.NA} N/A
                  </span>
                )}
                {consolidation.preview.byResult.Unanswered > 0 && (
                  <span className="rounded-full bg-slate-100 text-slate-500 px-2 py-0.5 font-semibold">
                    {consolidation.preview.byResult.Unanswered} sin responder
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

      {/* Preview modal · confirmación antes de crear */}
      {showConsolidatePreview && consolidation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
          onClick={() => {
            if (consolidating) return;
            setShowConsolidatePreview(false);
            setConsolidateAck(false);
          }}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
              Antes de consolidar
            </p>
            <h3 className="mt-1 text-lg font-bold text-slate-900">
              Vas a crear una evaluación final sobre {consolidation.preview.totalCriteria} criterios
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Para cada criterio tomaremos la última respuesta registrada de las
              siguientes evaluaciones previas:
            </p>

            <ul className="mt-3 space-y-1.5 max-h-48 overflow-y-auto">
              {consolidation.preview.sourceEvaluations.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                >
                  <span className="text-slate-800 font-medium">
                    {s.label}{" "}
                    <span className="text-xs text-slate-500">· {s.name}</span>
                  </span>
                  <span
                    className={
                      "text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 " +
                      (s.status === "Submitted"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700")
                    }
                  >
                    {s.status === "Submitted" ? "Firmada" : "En curso"}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-xs text-slate-500">
              Podrás revisar y ajustar cada respuesta antes de firmar. Los
              criterios heredados mostrarán de qué evaluación vienen y cuándo
              fueron marcados.
            </p>

            <label className="mt-4 flex items-start gap-3 cursor-pointer group rounded-xl border border-slate-200 bg-slate-50 p-3">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 accent-emerald-600 cursor-pointer flex-shrink-0"
                checked={consolidateAck}
                onChange={(e) => setConsolidateAck(e.target.checked)}
                disabled={consolidating}
              />
              <span className="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900">
                Entiendo que estoy unificando respuestas de evaluaciones
                anteriores y me comprometo a verificar los resultados antes
                de firmar.
              </span>
            </label>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowConsolidatePreview(false);
                  setConsolidateAck(false);
                }}
                disabled={consolidating}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={startConsolidation}
                disabled={consolidating || !consolidateAck}
                className="rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed"
                title={
                  !consolidateAck
                    ? "Marca la casilla de confirmación para habilitar"
                    : undefined
                }
              >
                {consolidating ? "Creando…" : "Crear consolidación"}
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                    {ev.evaluatorName ?? "Evaluador"}
                    {ev.templateVersion && (
                      <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5">
                        {ev.templateVersion}
                      </span>
                    )}
                    {ev.evaluationType === "Consolidated" && (
                      <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5">
                        Consolidada
                      </span>
                    )}
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
