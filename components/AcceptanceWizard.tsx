"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PortalUser } from "@/lib/portalAuth";
import { getPortalProjectMeta } from "@/lib/portalProjectsMeta";
import type {
  TemplateDTO,
  EvaluationDTO,
  Result,
  CategoryDTO,
  CriterionDTO,
  FinalDecision,
} from "@/lib/salesforce/acceptanceWizard";

const CUSTOMER_LOGO_FALLBACK = "/Customers/Betterware/images/Logo-betterware.png";

function customerLogoFor(slug: string): string {
  return getPortalProjectMeta(slug)?.logo ?? CUSTOMER_LOGO_FALLBACK;
}

function customerNameFor(slug: string): string {
  return getPortalProjectMeta(slug)?.customerName ?? "Cliente";
}

type Props = {
  user: PortalUser;
  template: TemplateDTO;
  evaluation: EvaluationDTO;
  onExit: () => void;
};

// -----------------------------------------------------------------------------
// Response state helper · we keep an in-memory map keyed by criterionId
// -----------------------------------------------------------------------------
type ResponseState = {
  id: string;
  result: Result | null;
  comment: string | null;
};

export default function AcceptanceWizard({
  user: _user,
  template,
  evaluation: initialEval,
  onExit,
}: Props) {
  // page 0 = welcome, 1..N = categories, N+1 = dashboard, N+2 = confirmation
  const numCategoryPages = template.categories.length;
  const dashboardPage = numCategoryPages + 1;
  const confirmationPage = numCategoryPages + 2;
  const totalPages = numCategoryPages + 3;

  const [page, setPage] = useState<number>(initialEval.currentPage ?? 0);
  const [evaluation, setEvaluation] = useState<EvaluationDTO>(initialEval);

  // responses map by criterionId
  const [responses, setResponses] = useState<Map<string, ResponseState>>(() => {
    const m = new Map<string, ResponseState>();
    initialEval.responses.forEach((r) =>
      m.set(r.criterionId, {
        id: r.id,
        result: r.result,
        comment: r.comment,
      }),
    );
    return m;
  });

  // Final page state
  const [finalDecision, setFinalDecision] = useState<FinalDecision | null>(
    evaluation.finalDecision,
  );
  const [confidence, setConfidence] = useState<number | null>(
    evaluation.confidenceLevel,
  );
  const [finalComment, setFinalComment] = useState<string>(
    evaluation.finalComment ?? "",
  );
  const [signatureConfirmed, setSignatureConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // After submit, holds the ContentDocumentId of the generated PDF (if any)
  const [submittedPdfId, setSubmittedPdfId] = useState<string | null>(null);

  const persistResponse = useCallback(
    async (criterion: CriterionDTO, result: Result | null, comment: string | null) => {
      const current = responses.get(criterion.id);
      if (!current) return;
      // Optimistic UI
      setResponses((prev) => {
        const next = new Map(prev);
        next.set(criterion.id, {
          id: current.id,
          result,
          comment,
        });
        return next;
      });
      try {
        const res = await fetch("/api/portal/acceptance/response", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            evaluationId: evaluation.id,
            responseId: current.id,
            result,
            comment,
          }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          console.warn("response save failed", body);
        }
      } catch (err) {
        console.warn("response save error", err);
      }
    },
    [evaluation.id, responses],
  );

  const persistCurrentPage = useCallback(
    async (p: number) => {
      try {
        await fetch(
          `/api/portal/acceptance/evaluation?id=${encodeURIComponent(evaluation.id)}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ currentPage: p }),
          },
        );
      } catch (err) {
        console.warn("page save error", err);
      }
    },
    [evaluation.id],
  );

  const goTo = (p: number) => {
    setPage(p);
    void persistCurrentPage(p);
  };

  const submit = async () => {
    if (!finalDecision || !signatureConfirmed) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/portal/acceptance/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          evaluationId: evaluation.id,
          slug: template.projectSlug,
          finalDecision,
          confidenceLevel: confidence,
          finalComment: finalComment.trim() || null,
          signatureConfirmed: true,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      const body = (await res.json()) as {
        evaluation: EvaluationDTO & { submittedPdfId?: string };
        pdfReady?: boolean;
      };
      setEvaluation(body.evaluation);
      setSubmittedPdfId(body.evaluation.submittedPdfId ?? null);
      setPage(confirmationPage);
    } catch (err) {
      alert("No se pudo enviar la evaluación: " + (err instanceof Error ? err.message : "error"));
    } finally {
      setSubmitting(false);
    }
  };

  // Progress across the whole wizard (0-100)
  const answeredCount = useMemo(
    () => Array.from(responses.values()).filter((r) => r.result != null).length,
    [responses],
  );
  const progressPct =
    template.totalCriteria === 0
      ? 0
      : Math.round((answeredCount / template.totalCriteria) * 100);

  // Current page content
  const isCategoryPage = page >= 1 && page <= numCategoryPages;
  const currentCategory: CategoryDTO | null = isCategoryPage
    ? template.categories[page - 1]
    : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <WizardHeader
        page={page}
        totalPages={totalPages}
        template={template}
        evaluation={evaluation}
        currentCategoryName={currentCategory?.name ?? null}
        progressPct={progressPct}
      />

      <div className="p-6 min-h-[480px]">
        {page === 0 && <WelcomePage template={template} onStart={() => goTo(1)} />}

        {isCategoryPage && currentCategory && (
          <CategoryPage
            category={currentCategory}
            responses={responses}
            onChange={persistResponse}
          />
        )}

        {page === dashboardPage && (
          <FinalPage
            template={template}
            responses={responses}
            evaluator={evaluation.evaluatorName ?? "evaluador"}
            finalDecision={finalDecision}
            setFinalDecision={setFinalDecision}
            confidence={confidence}
            setConfidence={setConfidence}
            finalComment={finalComment}
            setFinalComment={setFinalComment}
            signatureConfirmed={signatureConfirmed}
            setSignatureConfirmed={setSignatureConfirmed}
            onSubmit={submit}
            submitting={submitting}
          />
        )}

        {page === confirmationPage && (
          <ConfirmationPage
            evaluation={evaluation}
            submittedPdfId={submittedPdfId}
            onExit={onExit}
          />
        )}
      </div>

      {page !== confirmationPage && (
        <WizardFooter
          page={page}
          totalPages={totalPages}
          dashboardPage={dashboardPage}
          onNavigate={goTo}
          onSaveLater={onExit}
          responses={responses}
          categories={template.categories}
        />
      )}
    </div>
  );
}

// =============================================================================
// Header slim con logos + progreso + evaluador
// =============================================================================

function WizardHeader({
  page,
  totalPages,
  template,
  evaluation,
  currentCategoryName,
  progressPct,
}: {
  page: number;
  totalPages: number;
  template: TemplateDTO;
  evaluation: EvaluationDTO;
  currentCategoryName: string | null;
  progressPct: number;
}) {
  const label =
    page === 0
      ? "Bienvenida"
      : currentCategoryName
        ? currentCategoryName
        : page === totalPages - 2
          ? "Resumen y decisión"
          : "Evaluación completada";

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-5 px-6 py-3 border-b border-slate-200">
      <img
        src={customerLogoFor(template.projectSlug)}
        alt={customerNameFor(template.projectSlug)}
        className="h-7 object-contain"
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-bold text-slate-900">{label}</span>
          <span className="text-[11px] text-slate-500">
            Página {page + 1} de {totalPages} · {progressPct}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right text-[11px] leading-tight text-slate-500">
          <strong className="block text-xs text-slate-900">
            {evaluation.evaluatorName ?? "Evaluador"}
          </strong>
          UAT
        </div>
        <img
          src="/sfdc-logos/corporate-logo-horiz.png"
          alt="Salesforce"
          className="h-5 object-contain"
        />
      </div>
    </div>
  );
}

// =============================================================================
// Welcome page
// =============================================================================

function WelcomePage({
  template,
  onStart,
}: {
  template: TemplateDTO;
  onStart: () => void;
}) {
  const defaultMsg =
    "Hemos llegado hasta aquí juntos.\nTu evaluación de hoy es lo que convierte este trabajo en una experiencia real.";
  const msg = template.welcomeMessage ?? defaultMsg;
  const lines = msg.split("\n");

  return (
    <div className="max-w-2xl mx-auto py-10 text-center">
      <div className="flex items-center justify-center gap-5 mb-8">
        <img
          src={customerLogoFor(template.projectSlug)}
          alt={customerNameFor(template.projectSlug)}
          className="h-10 object-contain"
        />
        <span className="h-6 w-px bg-slate-300" />
        <img
          src="/sfdc-logos/corporate-logo-horiz.png"
          alt="Salesforce"
          className="h-8 object-contain"
        />
      </div>

      <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-cyan-700">
          Evaluación de aceptación · {template.label}
        </p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900 leading-snug">
          {lines[0]}
        </h1>
        {lines.slice(1).map((line, i) => (
          <p key={i} className="mt-2 text-base text-slate-700 leading-relaxed">
            {line}
          </p>
        ))}

        <div className="mt-8 text-left mx-auto max-w-md">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Instrucciones breves
          </p>
          <ul className="space-y-1.5 text-sm text-slate-700">
            <li>
              · Avanza por cada categoría respondiendo si Betty <strong>cumple</strong>{" "}
              👍 o <strong>no cumple</strong> 👎.
            </li>
            <li>
              · Si marcas "no cumple", agrega un comentario breve y, si quieres,
              un adjunto.
            </li>
            <li>
              · Al final confirmas si Betty está lista para arrancar con
              Insiders.
            </li>
          </ul>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mt-8 rounded-lg bg-cyan-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700 transition"
        >
          Comenzar evaluación →
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// Category page · lista de criterios
// =============================================================================

function CategoryPage({
  category,
  responses,
  onChange,
}: {
  category: CategoryDTO;
  responses: Map<string, ResponseState>;
  onChange: (
    criterion: CriterionDTO,
    result: Result | null,
    comment: string | null,
  ) => void | Promise<void>;
}) {
  // Group criteria by topic for sub-headers
  const byTopic = useMemo(() => {
    const map = new Map<string, CriterionDTO[]>();
    category.criteria.forEach((c) => {
      const key = c.topic ?? "(sin tema)";
      const list = map.get(key) ?? [];
      list.push(c);
      map.set(key, list);
    });
    return Array.from(map.entries());
  }, [category.criteria]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-slate-900 tracking-tight">
        {category.name}
      </h2>
      {category.description && (
        <p className="mt-1 text-sm text-slate-600">{category.description}</p>
      )}

      <div className="mt-5 space-y-4">
        {byTopic.map(([topicName, crits]) => (
          <div key={topicName}>
            {topicName !== "(sin tema)" && (
              <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {topicName}
              </h3>
            )}
            <div className="space-y-2">
              {crits.map((c, i) => (
                <CriterionCard
                  key={c.id}
                  index={i + 1}
                  criterion={c}
                  response={responses.get(c.id) ?? null}
                  onChange={onChange}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CriterionCard({
  index,
  criterion,
  response,
  onChange,
}: {
  index: number;
  criterion: CriterionDTO;
  response: ResponseState | null;
  onChange: (
    criterion: CriterionDTO,
    result: Result | null,
    comment: string | null,
  ) => void | Promise<void>;
}) {
  const result = response?.result ?? null;
  const [commentDraft, setCommentDraft] = useState(response?.comment ?? "");

  const borderClass =
    result === "Pass"
      ? "border-green-300 bg-green-50/40"
      : result === "Fail"
        ? "border-red-300 bg-red-50/40"
        : result === "NA"
          ? "border-slate-200 bg-slate-50 opacity-85"
          : "border-slate-200 bg-white";

  const sevBadge =
    criterion.severity === "Blocker"
      ? "bg-red-100 text-red-700 border-red-200"
      : criterion.severity === "Critical"
        ? "bg-amber-100 text-amber-700 border-amber-200"
        : "bg-slate-100 text-slate-600 border-slate-200";

  const resultChip =
    result === "Pass"
      ? "bg-green-100 text-green-700"
      : result === "Fail"
        ? "bg-red-100 text-red-700"
        : result === "NA"
          ? "bg-slate-200 text-slate-600"
          : "";

  const commitComment = () => {
    if (result !== "Fail") return;
    void onChange(criterion, "Fail", commentDraft);
  };

  return (
    <div className={`rounded-xl border p-3.5 transition ${borderClass}`}>
      <div className="grid grid-cols-[auto_1fr_auto] gap-2.5 items-center">
        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${sevBadge}`}
          >
            {criterion.severity}
          </span>
          {result && (
            <span
              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${resultChip}`}
            >
              {result === "Pass"
                ? "✓ Cumple"
                : result === "Fail"
                  ? "✕ No cumple"
                  : "— N/A"}
            </span>
          )}
        </div>
        <div className="flex gap-0.5 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
          <ToggleBtn
            active={result === "Pass"}
            activeClass="bg-green-600 text-white border-green-600"
            onClick={() => onChange(criterion, "Pass", null)}
          >
            👍 Cumple
          </ToggleBtn>
          <ToggleBtn
            active={result === "Fail"}
            activeClass="bg-red-600 text-white border-red-600"
            onClick={() => {
              if (result !== "Fail")
                void onChange(criterion, "Fail", commentDraft || "(pendiente)");
            }}
          >
            👎 No cumple
          </ToggleBtn>
          <ToggleBtn
            active={result === "NA"}
            activeClass="bg-slate-500 text-white border-slate-500"
            onClick={() => onChange(criterion, "NA", null)}
          >
            N/A
          </ToggleBtn>
        </div>
      </div>

      <p className="mt-2 text-sm text-slate-800 leading-relaxed pl-0.5">
        {renderGivenWhenThen(criterion.givenWhenThen)}
      </p>

      {result === "Fail" && (
        <div className="mt-3 pt-3 border-t border-dashed border-red-200 space-y-2.5">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Comentario <span className="text-red-600">· Requerido</span>
            </label>
            <textarea
              className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400"
              rows={3}
              value={commentDraft}
              onChange={(e) => setCommentDraft(e.target.value)}
              onBlur={commitComment}
              placeholder="¿Qué observaste? Sé lo más específico posible."
            />
          </div>
          <AttachmentUploader responseId={response?.id ?? ""} />
        </div>
      )}
    </div>
  );
}

function ToggleBtn({
  active,
  activeClass,
  onClick,
  children,
}: {
  active: boolean;
  activeClass: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "px-3 py-1.5 rounded-md text-xs font-semibold border-2 transition " +
        (active
          ? activeClass
          : "bg-transparent text-slate-500 border-transparent hover:bg-white hover:text-slate-800")
      }
    >
      {children}
    </button>
  );
}

function renderGivenWhenThen(text: string): React.ReactNode {
  // Bold the Spanish Given-When-Then connectors so they pop
  const parts = text.split(/\b(Dado que|cuando|entonces)\b/i);
  return parts.map((p, i) =>
    /^(Dado que|cuando|entonces)$/i.test(p) ? (
      <strong key={i}>{p}</strong>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

function AttachmentUploader({ responseId }: { responseId: string }) {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(
        `/api/portal/acceptance/response/attachment?responseId=${encodeURIComponent(responseId)}`,
        { method: "POST", body: form },
      );
      if (!res.ok) throw new Error(`Upload failed (${res.status})`);
      setFiles((prev) => [...prev, file.name]);
    } catch (err) {
      alert("No se pudo subir: " + (err instanceof Error ? err.message : "error"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
        Adjuntos{" "}
        <span className="text-slate-400 normal-case font-medium tracking-normal">
          (opcional)
        </span>
      </label>
      <div className="mt-1 flex flex-wrap gap-2 items-center">
        {files.map((name, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded text-xs text-slate-800"
          >
            📎 {name}
          </span>
        ))}
        <label className="cursor-pointer inline-flex items-center gap-1.5 bg-transparent border border-dashed border-slate-300 px-2.5 py-1 rounded text-xs text-cyan-700 font-bold hover:bg-cyan-50">
          + Agregar archivo
          <input
            type="file"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
            }}
          />
        </label>
      </div>
    </div>
  );
}

// =============================================================================
// Final dashboard page
// =============================================================================

function FinalPage({
  template,
  responses,
  evaluator,
  finalDecision,
  setFinalDecision,
  confidence,
  setConfidence,
  finalComment,
  setFinalComment,
  signatureConfirmed,
  setSignatureConfirmed,
  onSubmit,
  submitting,
}: {
  template: TemplateDTO;
  responses: Map<string, ResponseState>;
  evaluator: string;
  finalDecision: FinalDecision | null;
  setFinalDecision: (d: FinalDecision) => void;
  confidence: number | null;
  setConfidence: (c: number | null) => void;
  finalComment: string;
  setFinalComment: (s: string) => void;
  signatureConfirmed: boolean;
  setSignatureConfirmed: (b: boolean) => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  // Totals by severity × result
  type SeverityKey = "Blocker" | "Critical" | "Nice-to-have";
  type Bucket = { Pass: number; Fail: number; NA: number; Unanswered: number; total: number };
  const totals = useMemo<Record<SeverityKey, Bucket>>(() => {
    const bySev: Record<SeverityKey, Bucket> = {
      Blocker: { Pass: 0, Fail: 0, NA: 0, Unanswered: 0, total: 0 },
      Critical: { Pass: 0, Fail: 0, NA: 0, Unanswered: 0, total: 0 },
      "Nice-to-have": { Pass: 0, Fail: 0, NA: 0, Unanswered: 0, total: 0 },
    };
    template.categories.forEach((cat) => {
      cat.criteria.forEach((c) => {
        bySev[c.severity].total++;
        const r = responses.get(c.id)?.result ?? null;
        if (r === "Pass") bySev[c.severity].Pass++;
        else if (r === "Fail") bySev[c.severity].Fail++;
        else if (r === "NA") bySev[c.severity].NA++;
        else bySev[c.severity].Unanswered++;
      });
    });
    return bySev;
  }, [template.categories, responses]);

  const brokenBlockers = useMemo(() => {
    const list: CriterionDTO[] = [];
    template.categories.forEach((cat) => {
      cat.criteria.forEach((c) => {
        if (c.severity === "Blocker" && responses.get(c.id)?.result === "Fail")
          list.push(c);
      });
    });
    return list;
  }, [template.categories, responses]);

  // Gate 1 · Si 3 o más Blockers no cumplen, Sí queda bloqueado y se fuerza "No"
  const BLOCKER_THRESHOLD = 3;
  const blockerGateTriggered = brokenBlockers.length >= BLOCKER_THRESHOLD;

  useEffect(() => {
    if (blockerGateTriggered && finalDecision === "Si") {
      setFinalDecision("No");
    }
  }, [blockerGateTriggered, finalDecision, setFinalDecision]);

  // Gate 2 · Progreso mínimo 95% para poder enviar
  const PROGRESS_THRESHOLD = 95;
  const answeredCount = useMemo(
    () => Array.from(responses.values()).filter((r) => r.result != null).length,
    [responses],
  );
  const progressPct =
    template.totalCriteria === 0
      ? 0
      : Math.round((answeredCount / template.totalCriteria) * 100);
  const progressGatePassed = progressPct >= PROGRESS_THRESHOLD;

  const canSubmit =
    finalDecision !== null &&
    !submitting &&
    progressGatePassed &&
    signatureConfirmed;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Resumen y decisión final
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Revisa el conteo de tu evaluación y firma la decisión binaria.
        </p>
      </div>

      {/* Compliance bars per severity · neutral palette, % cumplimiento visible */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4">
          Cumplimiento por severidad
        </p>
        <div className="space-y-3">
          {(["Blocker", "Critical", "Nice-to-have"] as const).map((sev) => {
            const t = totals[sev];
            const applicable = t.Pass + t.Fail; // excluye NA e sin respuesta del denominador de compliance
            const pct =
              applicable === 0 ? 0 : Math.round((t.Pass / applicable) * 100);
            const passPct = t.total === 0 ? 0 : (t.Pass / t.total) * 100;
            const failPct = t.total === 0 ? 0 : (t.Fail / t.total) * 100;
            const naPct = t.total === 0 ? 0 : (t.NA / t.total) * 100;
            return (
              <div key={sev}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-800">
                    {sev}
                    <span className="text-xs font-normal text-slate-500">
                      {" "}
                      · {t.total} criterios
                    </span>
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    {pct}% cumplimiento
                  </span>
                </div>
                <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
                  <div className="bg-emerald-500" style={{ width: `${passPct}%` }} />
                  <div className="bg-rose-500" style={{ width: `${failPct}%` }} />
                  <div className="bg-slate-400" style={{ width: `${naPct}%` }} />
                </div>
                <div className="mt-1 text-[11px] text-slate-600 flex gap-4">
                  <span>
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1 align-middle" />
                    {t.Pass} cumple
                  </span>
                  <span>
                    <span className="inline-block w-2 h-2 rounded-full bg-rose-500 mr-1 align-middle" />
                    {t.Fail} no cumple
                  </span>
                  <span>
                    <span className="inline-block w-2 h-2 rounded-full bg-slate-400 mr-1 align-middle" />
                    {t.NA} N/A
                  </span>
                  {t.Unanswered > 0 && (
                    <span className="text-slate-400">
                      {t.Unanswered} pendiente
                      {t.Unanswered === 1 ? "" : "s"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {brokenBlockers.length > 0 && (
        <div
          className={
            "rounded-xl border p-4 " +
            (blockerGateTriggered
              ? "border-red-400 bg-red-50"
              : "border-amber-200 bg-amber-50")
          }
        >
          <p
            className={
              "text-sm font-bold " +
              (blockerGateTriggered ? "text-red-800" : "text-amber-800")
            }
          >
            {brokenBlockers.length} criterio
            {brokenBlockers.length === 1 ? "" : "s"} Blocker marcado
            {brokenBlockers.length === 1 ? "" : "s"} como "no cumple"
          </p>
          {blockerGateTriggered && (
            <p className="mt-1 text-xs text-red-700">
              Con {BLOCKER_THRESHOLD} o más Blockers sin cumplir, la decisión
              queda fijada en <strong>No, aún no</strong>. Para habilitar la
              opción "Sí, está lista" revisa los criterios Blocker marcados
              como "no cumple" en las páginas correspondientes.
            </p>
          )}
          <ul
            className={
              "mt-2 text-xs space-y-1 list-disc list-inside " +
              (blockerGateTriggered ? "text-red-700" : "text-amber-700")
            }
          >
            {brokenBlockers.slice(0, 5).map((c) => (
              <li key={c.id}>{c.givenWhenThen.substring(0, 160)}…</li>
            ))}
          </ul>
        </div>
      )}

      {/* Final decision — card hero · icono + 2 opciones grandes */}
      <div
        className={
          "rounded-2xl border-2 p-6 transition-colors " +
          (finalDecision === "Si"
            ? "border-emerald-400 bg-emerald-50"
            : finalDecision === "No"
              ? "border-rose-400 bg-rose-50"
              : "border-blue-200 bg-blue-50")
        }
      >
        <p
          className={
            "text-[11px] font-bold uppercase tracking-wider " +
            (finalDecision === "Si"
              ? "text-emerald-700"
              : finalDecision === "No"
                ? "text-rose-700"
                : "text-blue-700")
          }
        >
          Decisión final · requerida
        </p>
        <div className="mt-3 flex items-center gap-5">
          <div className="flex-shrink-0">
            <div
              className={
                "w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold border-2 " +
                (finalDecision === "Si"
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : finalDecision === "No"
                    ? "bg-rose-500 text-white border-rose-500"
                    : "bg-white text-slate-400 border-dashed border-slate-300")
              }
            >
              {finalDecision === "Si" ? "✓" : finalDecision === "No" ? "⏱" : "?"}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              ¿Betty está lista para arrancar con el Programa Insiders?
            </h3>
            <p className="mt-0.5 text-xs text-slate-600">
              Tu respuesta queda vinculada a tu firma con fecha y hora.
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <DecisionBtn
            active={finalDecision === "Si"}
            activeClass="bg-emerald-600 text-white border-emerald-600 shadow-md"
            disabled={blockerGateTriggered}
            onClick={() => !blockerGateTriggered && setFinalDecision("Si")}
          >
            ✓ Sí, está lista
          </DecisionBtn>
          <DecisionBtn
            active={finalDecision === "No"}
            activeClass="bg-rose-600 text-white border-rose-600 shadow-md"
            onClick={() => setFinalDecision("No")}
          >
            ⏱ No, aún no
          </DecisionBtn>
        </div>
        {blockerGateTriggered && (
          <p className="mt-3 text-xs text-rose-700">
            🔒 "Sí, está lista" se habilitará cuando queden menos de{" "}
            {BLOCKER_THRESHOLD} Blockers sin cumplir.
          </p>
        )}
      </div>

      {/* Confidence slider */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Opcional
        </p>
        <h3 className="mt-1 text-sm font-semibold text-slate-800">
          ¿Cuál es tu nivel de confianza si HOY fuera un Go-live al 100%?
        </h3>
        <div className="mt-3 flex items-center gap-4">
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={confidence ?? 0}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="flex-1 accent-cyan-600"
          />
          <span className="w-14 text-right text-lg font-bold text-cyan-700">
            {confidence ?? 0}%
          </span>
        </div>
      </div>

      {/* Final comment */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Comentario final (opcional)
        </label>
        <textarea
          className="mt-1 w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-400"
          rows={3}
          value={finalComment}
          onChange={(e) => setFinalComment(e.target.value)}
          placeholder="Cualquier contexto adicional que quieras dejar firmado."
        />
      </div>

      {!progressGatePassed && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-bold text-amber-800">
            Progreso insuficiente para finalizar
          </p>
          <p className="mt-1 text-xs text-amber-700">
            Para enviar la evaluación necesitas al menos{" "}
            <strong>{PROGRESS_THRESHOLD}%</strong> de criterios respondidos.
            Hoy llevas <strong>{progressPct}%</strong> ({answeredCount} de{" "}
            {template.totalCriteria}). Responde los criterios faltantes antes
            de firmar.
          </p>
        </div>
      )}

      {/* Signature checkbox */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Firma implícita · requerida
        </p>
        <label className="mt-3 flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 accent-cyan-600 cursor-pointer"
            checked={signatureConfirmed}
            onChange={(e) => setSignatureConfirmed(e.target.checked)}
          />
          <span className="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900">
            Yo, <strong className="text-slate-900">{evaluator}</strong>,
            confirmo que los resultados mostrados en este reporte reflejan mi
            evaluación honesta de los {template.totalCriteria} criterios y
            asumo responsabilidad por la decisión final registrada. Entiendo
            que esta firma queda vinculada a mi usuario con fecha y hora.
          </span>
        </label>
      </div>

      <div className="flex justify-end items-center gap-3">
        {progressGatePassed && finalDecision === null && (
          <span className="text-xs text-slate-500">
            Selecciona Sí o No para habilitar la firma
          </span>
        )}
        {progressGatePassed && finalDecision !== null && !signatureConfirmed && (
          <span className="text-xs text-slate-500">
            Marca la casilla de firma para continuar
          </span>
        )}
        <button
          type="button"
          disabled={!canSubmit}
          onClick={onSubmit}
          className="rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-cyan-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? "Firmando y generando PDF…" : "Finalizar y firmar"}
        </button>
      </div>
    </div>
  );
}

function DecisionBtn({
  active,
  activeClass,
  disabled = false,
  onClick,
  children,
}: {
  active: boolean;
  activeClass: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        "px-5 py-2 rounded-lg text-sm font-bold border-2 transition " +
        (disabled
          ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
          : active
            ? activeClass
            : "bg-white text-slate-700 border-slate-300 hover:border-slate-400")
      }
    >
      {children}
    </button>
  );
}

// =============================================================================
// Confirmation page
// =============================================================================

function ConfirmationPage({
  evaluation,
  submittedPdfId,
  onExit,
}: {
  evaluation: EvaluationDTO;
  submittedPdfId: string | null;
  onExit: () => void;
}) {
  const pdfUrl = submittedPdfId
    ? `/api/portal/acceptance/pdf?evaluationId=${encodeURIComponent(evaluation.id)}`
    : null;

  return (
    <div className="max-w-xl mx-auto py-10 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-green-100 border-2 border-green-500 text-green-700 flex items-center justify-center text-2xl font-bold">
        ✓
      </div>
      <h2 className="mt-5 text-xl font-bold text-slate-900 leading-snug">
        Listo. Tu evaluación quedó registrada.
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Gracias por tu tiempo y por el cuidado puesto en cada criterio.
      </p>
      <div className="mt-6 inline-block text-left bg-slate-50 border border-slate-200 rounded-lg px-5 py-3 text-xs text-slate-600 space-y-1">
        <p>
          <strong className="text-slate-800">Evaluador:</strong>{" "}
          {evaluation.evaluatorName}
        </p>
        <p>
          <strong className="text-slate-800">Firmada:</strong>{" "}
          {evaluation.submittedAt
            ? new Date(evaluation.submittedAt).toLocaleString("es-MX")
            : "—"}
        </p>
        <p>
          <strong className="text-slate-800">Decisión:</strong>{" "}
          {evaluation.finalDecision === "Si" ? "Sí · lista" : "No · aún no"}
        </p>
        {evaluation.confidenceLevel != null && (
          <p>
            <strong className="text-slate-800">Confianza:</strong>{" "}
            {evaluation.confidenceLevel}%
          </p>
        )}
        <p>
          <strong className="text-slate-800">Registro:</strong> {evaluation.name}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
        {pdfUrl ? (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-300 bg-white px-4 py-2 text-sm font-semibold text-cyan-700 hover:bg-cyan-50 transition"
          >
            📄 Descargar PDF firmado
          </a>
        ) : (
          <span className="text-xs text-slate-500">
            El PDF firmado se está generando…
          </span>
        )}
        <button
          type="button"
          onClick={onExit}
          className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-semibold text-white hover:bg-cyan-700 transition"
        >
          Volver al portal
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// Footer navigation (prev, next, page-jumper, save-later, go-to-final)
// =============================================================================

function WizardFooter({
  page,
  totalPages,
  dashboardPage,
  onNavigate,
  onSaveLater,
  responses,
  categories,
}: {
  page: number;
  totalPages: number;
  dashboardPage: number;
  onNavigate: (p: number) => void;
  onSaveLater: () => void;
  responses: Map<string, ResponseState>;
  categories: CategoryDTO[];
}) {
  const atWelcome = page === 0;
  const atLast = page === totalPages - 1;

  // Page dots: welcome (W), categories (1..N), dashboard (D)
  const totalDots = totalPages - 1; // exclude confirmation page

  const categoryAnswered = (categoryIdx: number): "none" | "partial" | "full" => {
    const cat = categories[categoryIdx];
    if (!cat) return "none";
    let answered = 0;
    for (const c of cat.criteria) {
      if (responses.get(c.id)?.result != null) answered++;
    }
    if (answered === 0) return "none";
    if (answered === cat.criteria.length) return "full";
    return "partial";
  };

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-3 border-t border-slate-200 bg-slate-50">
      <button
        type="button"
        onClick={() => !atWelcome && onNavigate(page - 1)}
        disabled={atWelcome}
        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition disabled:opacity-40"
      >
        ← Anterior
      </button>

      <div className="flex gap-1 justify-center flex-wrap">
        {Array.from({ length: totalDots }).map((_, i) => {
          const isWelcome = i === 0;
          const isDashboard = i === totalDots - 1;
          const isCategory = !isWelcome && !isDashboard;
          const categoryIdx = isCategory ? i - 1 : -1;
          const answered = isCategory ? categoryAnswered(categoryIdx) : "none";
          const label = isWelcome
            ? "W"
            : isDashboard
              ? "D"
              : String(categoryIdx + 1);

          const cls =
            page === i
              ? "bg-cyan-600 text-white border-cyan-600"
              : answered === "full"
                ? "bg-green-50 text-green-700 border-green-500"
                : answered === "partial"
                  ? "bg-amber-50 text-amber-700 border-amber-400"
                  : "bg-white text-slate-500 border-slate-300 hover:border-cyan-500 hover:text-cyan-700";

          return (
            <button
              key={i}
              type="button"
              onClick={() => onNavigate(i)}
              className={`w-7 h-7 rounded-md border text-[11px] font-bold transition ${cls}`}
              title={
                isWelcome
                  ? "Bienvenida"
                  : isDashboard
                    ? "Decisión final"
                    : categories[categoryIdx]?.name
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onSaveLater}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
        >
          Guardar para después
        </button>
        {!atLast && (
          <button
            type="button"
            onClick={() => onNavigate(Math.min(page + 1, dashboardPage))}
            className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-cyan-700 transition"
          >
            {page === dashboardPage - 1 ? "Ir a decisión →" : "Siguiente →"}
          </button>
        )}
      </div>
    </div>
  );
}
