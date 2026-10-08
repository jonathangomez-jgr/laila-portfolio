"use client";

import { useMemo, useState } from "react";
import {
  AGENT_CATEGORY_STYLES,
  type AgentCategory,
  betterwareAgentDocs,
} from "@/data/betterwareAgentDocumentation";

const ALL_CATEGORIES: AgentCategory[] = [
  "Atención y seguridad",
  "Cuenta y datos",
  "Pedidos y logística",
  "Pagos y finanzas",
  "Puntos y programas",
  "Contenido y FAQ",
  "Guardarraíles",
];

export default function AgentDocsTab() {
  const [filter, setFilter] = useState<AgentCategory | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return betterwareAgentDocs.subagents;
    return betterwareAgentDocs.subagents.filter((s) => s.category === filter);
  }, [filter]);

  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = { all: betterwareAgentDocs.subagents.length };
    for (const s of betterwareAgentDocs.subagents) {
      counts[s.category] = (counts[s.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const doc = betterwareAgentDocs;

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
          Documentación · {doc.developerName}
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">{doc.name}</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">{doc.description}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5">
            <span className="font-mono text-slate-500">Versión:</span>{" "}
            <span className="font-semibold text-slate-900">{doc.version}</span>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5">
            <span className="font-mono text-slate-500">Revisión:</span>{" "}
            <span className="font-semibold text-slate-900">{doc.revision}</span>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5">
            <span className="font-mono text-slate-500">Subagentes:</span>{" "}
            <span className="font-semibold text-slate-900">{doc.subagentCount}</span>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5">
            <span className="font-mono text-slate-500">Acciones:</span>{" "}
            <span className="font-semibold text-slate-900">{doc.actionCount}</span>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5">
            <span className="font-mono text-slate-500">Variables linked:</span>{" "}
            <span className="font-semibold text-slate-900">{doc.linkedVariableCount}</span>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5">
            <span className="font-mono text-slate-500">Variables mutable:</span>{" "}
            <span className="font-semibold text-slate-900">{doc.mutableVariableCount}</span>
          </div>
        </div>

        <p className="mt-3 text-xs italic text-slate-500">{doc.base}</p>
      </header>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
            filter === "all"
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          Todos · {countsByCategory.all}
        </button>
        {ALL_CATEGORIES.map((cat) => {
          const count = countsByCategory[cat] ?? 0;
          if (count === 0) return null;
          const active = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                active
                  ? "border-blue-600 bg-blue-600 text-white"
                  : `${AGENT_CATEGORY_STYLES[cat]} hover:opacity-80`
              }`}
            >
              {cat} · {count}
            </button>
          );
        })}
      </div>

      {/* Subagent cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((sub) => {
          const expanded = expandedId === sub.id;
          const catStyle = AGENT_CATEGORY_STYLES[sub.category];
          return (
            <article
              key={sub.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-slate-900">{sub.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-slate-500">
                    {sub.id}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${catStyle}`}
                >
                  {sub.category}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-700">{sub.summary}</p>

              <blockquote className="mt-3 border-l-2 border-slate-300 pl-3 text-xs italic text-slate-500">
                {sub.example}
              </blockquote>

              <div className="mt-3 rounded-md bg-slate-50 p-3 text-xs text-slate-700">
                <p className="font-semibold text-slate-900">Alcance</p>
                <p className="mt-1">{sub.scope}</p>
              </div>

              <button
                onClick={() => setExpandedId(expanded ? null : sub.id)}
                className="mt-3 self-start text-xs font-semibold text-blue-700 hover:underline"
              >
                {expanded ? "Ocultar detalle ↑" : "Ver detalle ↓"}
              </button>

              {expanded && (
                <div className="mt-4 space-y-4 border-t border-slate-200 pt-4">
                  <Section title="Comportamiento esperado" items={sub.behavior} tone="neutral" />
                  <Section title="Criterios de aceptación" items={sub.accept} tone="positive" />
                  <Section title="Evitar" items={sub.avoid} tone="negative" />
                  {sub.pending && sub.pending.length > 0 && (
                    <Section title="Pendientes" items={sub.pending} tone="warning" />
                  )}

                  {sub.actions && sub.actions.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Acciones ({sub.actions.length})
                      </p>
                      <ul className="mt-2 space-y-1">
                        {sub.actions.map((a) => (
                          <li key={a.name} className="rounded-md bg-slate-50 px-2 py-1 text-xs">
                            <span className="font-semibold text-slate-900">{a.name}</span>{" "}
                            <span className="font-mono text-[10px] text-slate-500">→ {a.target}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {sub.extra && sub.extra.length > 0 && (
                    <div className="space-y-2">
                      {sub.extra.map((e) => (
                        <div
                          key={e.title}
                          className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs"
                        >
                          <p className="font-semibold text-amber-900">{e.title}</p>
                          <p className="mt-1 text-amber-800">{e.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
        <p>
          <strong>Base:</strong> rebuild de <code className="font-mono">BW_AGENT_N v42</code>{" "}
          consolidando 26 subagentes en 11. Reutiliza al 100% las Apex y Flow de V42; aplica fixes
          de orquestación del audit deep-dive (SEC-1 ownership gate, SEC-3 session bind, R-1/R-2
          structural auth, F-3 pending_write_intent, F-16 deterministic business hours, D-4 Knowledge
          wiring, nuevo sistema de linaje con <code className="font-mono">V_CodigoLinaje</code>).
        </p>
      </footer>
    </div>
  );
}

function Section({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "neutral" | "positive" | "negative" | "warning";
}) {
  const toneStyles: Record<typeof tone, string> = {
    neutral: "text-slate-700",
    positive: "text-emerald-800",
    negative: "text-rose-800",
    warning: "text-amber-900",
  };
  const bullet: Record<typeof tone, string> = {
    neutral: "text-slate-400",
    positive: "text-emerald-500",
    negative: "text-rose-500",
    warning: "text-amber-500",
  };
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className={`flex gap-2 text-xs ${toneStyles[tone]}`}>
            <span className={bullet[tone]}>•</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
