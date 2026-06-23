"use client";

import { useMemo, useState } from "react";
import type { JobStoriesData, JobStory } from "../data/customerDemos";

const categoryStyles: Record<
  JobStory["category"],
  { bg: string; text: string; ring: string }
> = {
  "Information & Discovery": {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    ring: "ring-indigo-200",
  },
  "Self-Service & Transactions": {
    bg: "bg-violet-50",
    text: "text-violet-700",
    ring: "ring-violet-200",
  },
  Personalization: {
    bg: "bg-pink-50",
    text: "text-pink-700",
    ring: "ring-pink-200",
  },
  "Status & Tracking": {
    bg: "bg-sky-50",
    text: "text-sky-700",
    ring: "ring-sky-200",
  },
  "Problem Resolution": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-200",
  },
  "Retention & Engagement": {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
  },
  "Escalation & Human Handoff": {
    bg: "bg-orange-50",
    text: "text-orange-700",
    ring: "ring-orange-200",
  },
};

const priorityStyles: Record<JobStory["priority"], string> = {
  High: "bg-red-50 text-red-700 ring-red-200",
  Medium: "bg-yellow-50 text-yellow-700 ring-yellow-200",
  Low: "bg-gray-50 text-gray-600 ring-gray-200",
};

const packageStyles: Record<JobStory["package"], string> = {
  MVP: "bg-indigo-600 text-white",
  TBD: "bg-gray-400 text-white",
  NA: "bg-gray-200 text-gray-700",
  Blocked: "bg-rose-600 text-white",
};

const coverageStyles: Record<
  JobStory["coverage"],
  {
    label: string;
    dot: string;
    badgeBg: string;
    badgeText: string;
    border: string;
    accentBar: string;
    icon: string;
  }
> = {
  covered: {
    label: "Cubierto por Knowledge",
    dot: "bg-emerald-500",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    border: "border-emerald-200",
    accentBar: "bg-emerald-500",
    icon: "M5 13l4 4L19 7",
  },
  partial: {
    label: "Parcial — falta data o doc",
    dot: "bg-amber-500",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    border: "border-amber-200",
    accentBar: "bg-amber-500",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
  },
  missing: {
    label: "Pendiente Knowledge",
    dot: "bg-rose-500",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    border: "border-rose-200",
    accentBar: "bg-rose-500",
    icon: "M6 18L18 6M6 6l12 12",
  },
  "out-of-scope": {
    label: "Sin Knowledge (data o handoff)",
    dot: "bg-slate-400",
    badgeBg: "bg-slate-50",
    badgeText: "text-slate-700",
    border: "border-slate-200",
    accentBar: "bg-slate-400",
    icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
};

const resolutionLabels: Record<NonNullable<JobStory["resolution"]>, string> = {
  knowledge: "Knowledge (RAG)",
  "data-only": "Solo datos Salesforce",
  hybrid: "Knowledge + datos",
  handoff: "Escalamiento humano",
};

type CoverageFilter = "all" | JobStory["coverage"];

export default function JobStoriesCanvas({ data }: { data: JobStoriesData }) {
  const [filter, setFilter] = useState<CoverageFilter>("all");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const counts = data.summary.byCoverage;
  const total = data.summary.totalStories;
  const coveredPct = Math.round((counts.covered / total) * 100);
  const partialPct = Math.round((counts.partial / total) * 100);
  const missingPct = Math.round((counts.missing / total) * 100);
  const oosPct = Math.round((counts.outOfScope / total) * 100);

  const filteredStories = useMemo(() => {
    if (filter === "all") return data.stories;
    return data.stories.filter((s) => s.coverage === filter);
  }, [filter, data.stories]);

  const groupedByEpic = useMemo(() => {
    const map = new Map<string, { epicId: string; epicName: string; stories: JobStory[] }>();
    for (const s of filteredStories) {
      if (!map.has(s.epicId)) {
        map.set(s.epicId, { epicId: s.epicId, epicName: s.epicName, stories: [] });
      }
      map.get(s.epicId)!.stories.push(s);
    }
    return Array.from(map.values());
  }, [filteredStories]);

  return (
    <div className="mt-10 space-y-10">
      {/* Intro */}
      <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-indigo-50/40 via-white to-violet-50/40 p-6 sm:p-8">
        <p className="max-w-4xl text-base leading-7 text-gray-700">{data.intro}</p>
      </div>

      {/* Coverage strip */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-950">
            Cobertura de Knowledge sobre el backlog
          </h3>
          <span className="text-sm text-gray-500">{total} Job Stories</span>
        </div>

        {/* stacked bar */}
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full bg-emerald-500"
            style={{ width: `${coveredPct}%` }}
            title={`Cubierto: ${counts.covered}`}
          />
          <div
            className="h-full bg-amber-400"
            style={{ width: `${partialPct}%` }}
            title={`Parcial: ${counts.partial}`}
          />
          <div
            className="h-full bg-rose-500"
            style={{ width: `${missingPct}%` }}
            title={`Pendiente: ${counts.missing}`}
          />
          <div
            className="h-full bg-slate-400"
            style={{ width: `${oosPct}%` }}
            title={`Fuera de scope KB: ${counts.outOfScope}`}
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCell
            label="Cubierto"
            value={counts.covered}
            pct={coveredPct}
            dot="bg-emerald-500"
            text="text-emerald-700"
          />
          <StatCell
            label="Parcial"
            value={counts.partial}
            pct={partialPct}
            dot="bg-amber-500"
            text="text-amber-700"
          />
          <StatCell
            label="Pendiente"
            value={counts.missing}
            pct={missingPct}
            dot="bg-rose-500"
            text="text-rose-700"
          />
          <StatCell
            label="Sin KB"
            value={counts.outOfScope}
            pct={oosPct}
            dot="bg-slate-400"
            text="text-slate-600"
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Filtrar:
        </span>
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label={`Todas (${total})`}
        />
        <FilterChip
          active={filter === "covered"}
          onClick={() => setFilter("covered")}
          label={`Cubierto (${counts.covered})`}
          color="emerald"
        />
        <FilterChip
          active={filter === "partial"}
          onClick={() => setFilter("partial")}
          label={`Parcial (${counts.partial})`}
          color="amber"
        />
        <FilterChip
          active={filter === "missing"}
          onClick={() => setFilter("missing")}
          label={`Pendiente (${counts.missing})`}
          color="rose"
        />
        <FilterChip
          active={filter === "out-of-scope"}
          onClick={() => setFilter("out-of-scope")}
          label={`Sin KB (${counts.outOfScope})`}
          color="slate"
        />
      </div>

      {/* Stories grouped by epic */}
      <div className="space-y-10">
        {groupedByEpic.map((epic) => (
          <section key={epic.epicId}>
            <div className="mb-4 flex items-baseline gap-3">
              <span className="rounded-md bg-gray-900 px-2 py-0.5 font-mono text-xs font-semibold text-white">
                {epic.epicId}
              </span>
              <h3 className="text-xl font-semibold text-gray-950">
                {epic.epicName}
              </h3>
              <span className="text-sm text-gray-400">
                · {epic.stories.length}{" "}
                {epic.stories.length === 1 ? "story" : "stories"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {epic.stories.map((story) => {
                const cat = categoryStyles[story.category];
                const cov = coverageStyles[story.coverage];
                const isExpanded = expanded[story.id] ?? false;

                return (
                  <article
                    key={story.id}
                    className={`relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md ${cov.border}`}
                  >
                    {/* coverage accent bar */}
                    <div
                      className={`absolute left-0 top-0 h-full w-1 ${cov.accentBar}`}
                    />

                    <div className="p-5 pl-6">
                      {/* meta row */}
                      <div className="mb-3 flex flex-wrap items-center gap-1.5">
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-gray-700">
                          {story.id}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${cat.bg} ${cat.text} ${cat.ring}`}
                        >
                          {story.category}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${priorityStyles[story.priority]}`}
                        >
                          {story.priority}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${packageStyles[story.package]}`}
                        >
                          {story.package}
                        </span>
                        {story.blocked && (
                          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[11px] font-bold text-rose-700">
                            BLOQUEADO
                          </span>
                        )}
                      </div>

                      <h4 className="mb-2 text-base font-bold leading-snug text-gray-950">
                        {story.name}
                      </h4>

                      {/* story format: cuando / quiero / para poder */}
                      <div className="mb-4 space-y-1.5 text-sm leading-6 text-gray-700">
                        <p>
                          <span className="font-semibold text-gray-500">
                            Cuando
                          </span>{" "}
                          {story.cuando}
                        </p>
                        <p>
                          <span className="font-semibold text-gray-500">
                            yo quiero
                          </span>{" "}
                          {story.yoQuiero}
                        </p>
                        <p>
                          <span className="font-semibold text-gray-500">
                            para poder
                          </span>{" "}
                          {story.paraPoder}
                        </p>
                      </div>

                      {/* coverage row */}
                      <div
                        className={`mb-3 flex items-center gap-2 rounded-lg px-3 py-2 ${cov.badgeBg}`}
                      >
                        <svg
                          className={`h-4 w-4 ${cov.badgeText}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={cov.icon}
                          />
                        </svg>
                        <span
                          className={`text-xs font-semibold ${cov.badgeText}`}
                        >
                          {cov.label}
                        </span>
                        {story.resolution && (
                          <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                            {resolutionLabels[story.resolution]}
                          </span>
                        )}
                      </div>

                      {/* knowledge sources */}
                      {story.knowledgeSources &&
                        story.knowledgeSources.length > 0 && (
                          <details
                            className="group"
                            open={isExpanded}
                            onToggle={(e) =>
                              setExpanded((prev) => ({
                                ...prev,
                                [story.id]: (e.target as HTMLDetailsElement)
                                  .open,
                              }))
                            }
                          >
                            <summary className="flex cursor-pointer list-none items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                              <svg
                                className="h-3.5 w-3.5 transition group-open:rotate-90"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                              Documentos que responden ({story.knowledgeSources.length})
                            </summary>
                            <ul className="mt-3 space-y-1.5">
                              {story.knowledgeSources.map((src) => (
                                <li key={src.path}>
                                  <a
                                    href={`/Customers/PAM/kb/${src.path.split("/").map(encodeURIComponent).join("/")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/src block rounded-md border border-gray-100 bg-gray-50/60 p-2.5 transition hover:border-indigo-300 hover:bg-white hover:shadow-sm"
                                  >
                                    <div className="flex items-start gap-2">
                                      <svg
                                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400 group-hover/src:text-indigo-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                      </svg>
                                      <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-gray-800 group-hover/src:text-indigo-700">
                                          {src.label}
                                          {src.library && (
                                            <span className="ml-1.5 rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600">
                                              {src.library}
                                            </span>
                                          )}
                                        </p>
                                        <code className="break-all font-mono text-[10px] leading-5 text-gray-500">
                                          {src.path}
                                        </code>
                                      </div>
                                      <svg
                                        className="mt-0.5 h-3 w-3 shrink-0 text-gray-300 transition group-hover/src:text-indigo-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                      </svg>
                                    </div>
                                    {src.relevance && (
                                      <div className="mt-2 flex items-start gap-1.5 border-t border-gray-100 pt-2">
                                        <svg
                                          className="mt-0.5 h-3 w-3 shrink-0 text-indigo-400"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth={2.5}
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                        </svg>
                                        <p className="text-[11px] leading-5 text-gray-600">
                                          <span className="font-semibold text-indigo-700">¿Por qué responde?</span>{" "}
                                          {src.relevance}
                                        </p>
                                      </div>
                                    )}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </details>
                        )}

                      {/* pending */}
                      {story.pending && story.pending.length > 0 && (
                        <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/60 p-3">
                          <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700">
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                              />
                            </svg>
                            Pendiente
                          </p>
                          <ul className="space-y-1">
                            {story.pending.map((p) => (
                              <li
                                key={p}
                                className="text-xs leading-5 text-amber-900"
                              >
                                • {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Final summary */}
      <section className="rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 p-6 sm:p-8">
        <div className="mb-6">
          <p className="eyebrow mb-2">Resumen ejecutivo</p>
          <h3 className="text-2xl font-bold text-gray-950">
            ¿Cuánto del backlog ya se puede responder con la Knowledge actual?
          </h3>
        </div>

        {/* big numbers */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <BigNumber
            value={counts.covered}
            sub={`de ${total} stories`}
            label="✅ Listas con KB actual"
            tone="emerald"
          />
          <BigNumber
            value={counts.partial}
            sub="parciales"
            label="⚠ Falta data o doc específico"
            tone="amber"
          />
          <BigNumber
            value={counts.missing}
            sub="pendientes"
            label="❌ Knowledge no entregada"
            tone="rose"
          />
          <BigNumber
            value={counts.outOfScope}
            sub="no aplican"
            label="⊘ Resuelven con datos o handoff"
            tone="slate"
          />
        </div>

        {/* resolution mix */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5">
          <p className="mb-3 text-sm font-bold text-gray-700">
            ¿Cómo se resuelve cada story?
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ResolutionCell
              count={data.summary.byResolution.knowledgeOnly}
              label="Knowledge (RAG)"
              icon="📚"
            />
            <ResolutionCell
              count={data.summary.byResolution.hybrid}
              label="Knowledge + datos"
              icon="🔗"
            />
            <ResolutionCell
              count={data.summary.byResolution.dataOnly}
              label="Solo datos Salesforce"
              icon="🗂"
            />
            <ResolutionCell
              count={data.summary.byResolution.handoff}
              label="Escalamiento humano"
              icon="👤"
            />
          </div>
        </div>

        {/* notes */}
        {data.summary.notes.length > 0 && (
          <div className="mb-6 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold text-indigo-900">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Lectura del análisis
            </p>
            <ul className="space-y-2">
              {data.summary.notes.map((n) => (
                <li
                  key={n}
                  className="flex items-start gap-2 text-sm leading-6 text-indigo-900"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-500" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* pending artifacts */}
        {data.summary.pendingArtifacts.length > 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-800">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              Por recibir del cliente
            </p>
            <ul className="space-y-2">
              {data.summary.pendingArtifacts.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 text-sm leading-6 text-amber-900"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCell({
  label,
  value,
  pct,
  dot,
  text,
}: {
  label: string;
  value: number;
  pct: number;
  dot: string;
  text: string;
}) {
  return (
    <div className="flex items-baseline gap-3 rounded-xl bg-gray-50 px-4 py-3">
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot}`} />
      <div>
        <p className={`text-2xl font-bold ${text}`}>
          {value}
          <span className="ml-1.5 text-xs font-semibold text-gray-400">
            ({pct}%)
          </span>
        </p>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </p>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  label,
  onClick,
  color,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  color?: "emerald" | "amber" | "rose" | "slate";
}) {
  const activeStyles: Record<string, string> = {
    emerald: "bg-emerald-600 text-white ring-emerald-600",
    amber: "bg-amber-500 text-white ring-amber-500",
    rose: "bg-rose-600 text-white ring-rose-600",
    slate: "bg-slate-600 text-white ring-slate-600",
    default: "bg-gray-900 text-white ring-gray-900",
  };
  const inactive =
    "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50 hover:ring-gray-300";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 transition ${
        active ? activeStyles[color ?? "default"] : inactive
      }`}
    >
      {label}
    </button>
  );
}

function BigNumber({
  value,
  sub,
  label,
  tone,
}: {
  value: number;
  sub: string;
  label: string;
  tone: "emerald" | "amber" | "rose" | "slate";
}) {
  const tones: Record<string, string> = {
    emerald: "text-emerald-600",
    amber: "text-amber-600",
    rose: "text-rose-600",
    slate: "text-slate-600",
  };
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center">
      <p className={`text-4xl font-bold ${tones[tone]}`}>{value}</p>
      <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-gray-400">
        {sub}
      </p>
      <p className="mt-2 text-xs font-semibold text-gray-700">{label}</p>
    </div>
  );
}

function ResolutionCell({
  count,
  label,
  icon,
}: {
  count: number;
  label: string;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-lg font-bold text-gray-950">{count}</p>
        <p className="text-[11px] font-semibold text-gray-500">{label}</p>
      </div>
    </div>
  );
}
