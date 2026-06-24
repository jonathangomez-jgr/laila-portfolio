"use client";

import { useMemo, useState } from "react";
import type { TestScript, TestScriptsData } from "../data/customerDemos";

const statusStyles: Record<
  TestScript["status"],
  { label: string; badge: string; dot: string; accent: string }
> = {
  ready: {
    label: "Listo para ejecutar",
    badge: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
    accent: "border-l-emerald-500",
  },
  partial: {
    label: "Ejecutable con datos pendientes",
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    accent: "border-l-amber-500",
  },
  blocked: {
    label: "Bloqueado — falta KB o config",
    badge: "bg-rose-100 text-rose-700",
    dot: "bg-rose-500",
    accent: "border-l-rose-500",
  },
};

const channelIcons: Record<TestScript["channel"], string> = {
  WhatsApp: "💬",
  "Web Chat": "🌐",
  SMS: "📱",
  Mobile: "📲",
};

type StatusFilter = "all" | TestScript["status"];

export default function TestScriptsCanvas({ data }: { data: TestScriptsData }) {
  const [filter, setFilter] = useState<StatusFilter>("all");

  const counts = useMemo(() => {
    const c = { ready: 0, partial: 0, blocked: 0 };
    for (const s of data.scripts) c[s.status]++;
    return c;
  }, [data.scripts]);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? data.scripts
        : data.scripts.filter((s) => s.status === filter),
    [filter, data.scripts]
  );

  return (
    <div className="mt-10 space-y-8">
      {/* Intro */}
      <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-indigo-50/40 via-white to-violet-50/40 p-6 sm:p-8">
        <p className="max-w-4xl text-base leading-7 text-gray-700">
          {data.intro}
        </p>
      </div>

      {/* Stats + filter strip */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {data.scripts.length} scripts
        </span>
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label={`Todos (${data.scripts.length})`}
        />
        <FilterChip
          active={filter === "ready"}
          onClick={() => setFilter("ready")}
          label={`Listos (${counts.ready})`}
          tone="emerald"
        />
        <FilterChip
          active={filter === "partial"}
          onClick={() => setFilter("partial")}
          label={`Parciales (${counts.partial})`}
          tone="amber"
        />
        <FilterChip
          active={filter === "blocked"}
          onClick={() => setFilter("blocked")}
          label={`Bloqueados (${counts.blocked})`}
          tone="rose"
        />
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {filtered.map((script) => {
          const status = statusStyles[script.status];
          return (
            <article
              key={script.id}
              className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm border-l-4 ${status.accent}`}
            >
              {/* Header */}
              <header className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white px-6 py-5 sm:px-8 sm:py-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-gray-900 px-2 py-0.5 font-mono text-xs font-bold text-white">
                    {script.id}
                  </span>
                  <a
                    href={`#${script.jobStoryId}`}
                    className="rounded-md bg-indigo-50 px-2 py-0.5 font-mono text-xs font-bold text-indigo-700 hover:bg-indigo-100"
                  >
                    ↪ {script.jobStoryId}
                  </a>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${status.badge}`}
                  >
                    {status.label}
                  </span>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-700">
                    {channelIcons[script.channel]} {script.channel}
                  </span>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase text-gray-600">
                    {script.language}
                  </span>
                </div>
                <h3 className="text-xl font-bold leading-snug text-gray-950">
                  {script.name}
                </h3>
              </header>

              <div className="px-6 py-6 sm:px-8 sm:py-7">
                {/* Persona */}
                <div className="mb-6 rounded-xl bg-indigo-50/40 px-4 py-3">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                    Persona
                  </p>
                  <p className="text-sm leading-6 text-gray-700">
                    {script.persona}
                  </p>
                </div>

                {/* Preconditions */}
                {script.preconditions.length > 0 && (
                  <div className="mb-6">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Preparación / datos requeridos
                    </p>
                    <ul className="space-y-1.5">
                      {script.preconditions.map((pre) => (
                        <li
                          key={pre}
                          className="flex items-start gap-2 text-sm leading-6 text-gray-700"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                          <span>{pre}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Transcript */}
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Guión conversacional
                  </p>
                  <ol className="space-y-3">
                    {script.steps.map((step) => (
                      <li
                        key={step.turn}
                        className={`flex gap-3 ${
                          step.role === "user" ? "" : ""
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                            step.role === "user"
                              ? "bg-gray-900 text-white"
                              : step.role === "agent"
                                ? "bg-indigo-600 text-white"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {step.turn}
                        </span>
                        <div
                          className={`min-w-0 flex-1 rounded-2xl px-4 py-3 ${
                            step.role === "user"
                              ? "bg-gray-100"
                              : step.role === "agent"
                                ? "bg-indigo-50"
                                : "border border-amber-200 bg-amber-50/60"
                          }`}
                        >
                          <p
                            className={`mb-1 text-[10px] font-bold uppercase tracking-wider ${
                              step.role === "user"
                                ? "text-gray-500"
                                : step.role === "agent"
                                  ? "text-indigo-700"
                                  : "text-amber-700"
                            }`}
                          >
                            {step.role === "user"
                              ? "Socio"
                              : step.role === "agent"
                                ? "Concierge"
                                : "Sistema"}
                          </p>
                          <p className="text-sm leading-6 text-gray-800">
                            {step.text}
                          </p>

                          {/* metadata pills */}
                          {(step.dataLookup ||
                            step.knowledgeRef ||
                            step.handoff) && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {step.dataLookup && (
                                <span className="inline-flex items-center gap-1 rounded bg-white px-1.5 py-0.5 text-[10px] font-mono font-semibold text-gray-600 ring-1 ring-gray-200">
                                  🗂 {step.dataLookup}
                                </span>
                              )}
                              {step.knowledgeRef && (
                                <span className="inline-flex items-center gap-1 rounded bg-white px-1.5 py-0.5 text-[10px] font-mono font-semibold text-indigo-600 ring-1 ring-indigo-200">
                                  📚 {step.knowledgeRef}
                                </span>
                              )}
                              {step.handoff && (
                                <span className="inline-flex items-center gap-1 rounded bg-white px-1.5 py-0.5 text-[10px] font-mono font-semibold text-orange-700 ring-1 ring-orange-200">
                                  👤 {step.handoff}
                                </span>
                              )}
                            </div>
                          )}

                          {/* validations */}
                          {step.validations && step.validations.length > 0 && (
                            <ul className="mt-2.5 space-y-1 border-t border-white/60 pt-2">
                              {step.validations.map((v) => (
                                <li
                                  key={v}
                                  className="flex items-start gap-1.5 text-[12px] leading-5 text-gray-600"
                                >
                                  <svg
                                    className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  <span>
                                    <span className="font-semibold text-gray-700">
                                      Validar:
                                    </span>{" "}
                                    {v}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Expected outcome */}
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-4">
                  <p className="mb-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Resultado esperado
                  </p>
                  <p className="text-sm leading-6 text-emerald-900">
                    {script.expectedOutcome}
                  </p>
                </div>

                {/* Success criteria */}
                {script.successCriteria.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Criterios de éxito (pass/fail)
                    </p>
                    <ul className="space-y-1.5">
                      {script.successCriteria.map((sc) => (
                        <li
                          key={sc}
                          className="flex items-start gap-2 text-sm leading-6 text-gray-700"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                          <span>{sc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Blockers */}
                {script.blockers && script.blockers.length > 0 && (
                  <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/60 px-4 py-4">
                    <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      <svg
                        className="h-3.5 w-3.5"
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
                      Bloqueadores / pendientes para correr este script
                    </p>
                    <ul className="space-y-1">
                      {script.blockers.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-sm leading-6 text-amber-900"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                          <span>{b}</span>
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
    </div>
  );
}

function FilterChip({
  active,
  label,
  onClick,
  tone,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  tone?: "emerald" | "amber" | "rose";
}) {
  const activeMap: Record<string, string> = {
    emerald: "bg-emerald-600 text-white ring-emerald-600",
    amber: "bg-amber-500 text-white ring-amber-500",
    rose: "bg-rose-600 text-white ring-rose-600",
    default: "bg-gray-900 text-white ring-gray-900",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 transition ${
        active
          ? activeMap[tone ?? "default"]
          : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}
