"use client";

import { useState } from "react";
import type {
  WorkPlanData,
  WorkPlanOpportunity,
  WorkPlanWave,
} from "../data/customerDemos";

const TONES = {
  indigo: {
    border: "border-indigo-200",
    bg: "bg-indigo-50/60",
    bgSolid: "bg-indigo-50",
    text: "text-indigo-700",
    textStrong: "text-indigo-900",
    dot: "bg-indigo-500",
    ring: "ring-indigo-200",
    gradient: "from-indigo-500 to-blue-500",
    softBadge: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
  violet: {
    border: "border-violet-200",
    bg: "bg-violet-50/60",
    bgSolid: "bg-violet-50",
    text: "text-violet-700",
    textStrong: "text-violet-900",
    dot: "bg-violet-500",
    ring: "ring-violet-200",
    gradient: "from-violet-500 to-fuchsia-500",
    softBadge: "bg-violet-100 text-violet-700 border-violet-200",
  },
  sky: {
    border: "border-sky-200",
    bg: "bg-sky-50/60",
    bgSolid: "bg-sky-50",
    text: "text-sky-700",
    textStrong: "text-sky-900",
    dot: "bg-sky-500",
    ring: "ring-sky-200",
    gradient: "from-sky-500 to-cyan-500",
    softBadge: "bg-sky-100 text-sky-700 border-sky-200",
  },
  emerald: {
    border: "border-emerald-200",
    bg: "bg-emerald-50/60",
    bgSolid: "bg-emerald-50",
    text: "text-emerald-700",
    textStrong: "text-emerald-900",
    dot: "bg-emerald-500",
    ring: "ring-emerald-200",
    gradient: "from-emerald-500 to-teal-500",
    softBadge: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
} as const;

type Tone = keyof typeof TONES;

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h3 className="text-2xl font-bold text-gray-950 sm:text-3xl">{title}</h3>
      {subtitle && (
        <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function OpportunityCard({
  opp,
  tone,
}: {
  opp: WorkPlanOpportunity;
  tone: Tone;
}) {
  const t = TONES[tone];
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border ${t.border} bg-white p-5 shadow-sm ring-1 ${t.ring}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p
            className={`text-[10px] font-bold uppercase tracking-widest ${t.text}`}
          >
            {opp.code} · {opp.pilar}
          </p>
          <h4 className="mt-1 text-base font-semibold leading-snug text-gray-950">
            {opp.name}
          </h4>
        </div>
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${t.softBadge}`}
        >
          {opp.duration}
        </span>
      </header>

      <p className="text-sm leading-6 text-gray-700">{opp.useCase}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Salesforce
          </p>
          <ul className="mt-2 space-y-1">
            {opp.salesforceProducts.map((p) => (
              <li
                key={p}
                className="flex gap-2 text-[13px] leading-5 text-gray-800"
              >
                <span className={`mt-1.5 h-1 w-1 flex-none rounded-full ${t.dot}`} />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Del cliente
          </p>
          <ul className="mt-2 space-y-1">
            {opp.prerequisites.map((p) => (
              <li
                key={p}
                className="flex gap-2 text-[13px] leading-5 text-gray-800"
              >
                <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-gray-400" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`rounded-xl border ${t.border} ${t.bg} p-3`}>
        <p
          className={`text-[10px] font-bold uppercase tracking-widest ${t.text}`}
        >
          Dimensionamiento orientativo
        </p>
        <ul className="mt-1.5 space-y-0.5">
          {opp.sizing.map((s) => (
            <li key={s} className="text-[12px] leading-5 text-gray-800">
              • {s}
            </li>
          ))}
        </ul>
      </div>

      <footer className="flex flex-col gap-2 border-t border-gray-100 pt-3 text-[12px] text-gray-600">
        {opp.dependsOn && opp.dependsOn.length > 0 && (
          <p>
            <span className="font-semibold text-gray-700">Depende de: </span>
            {opp.dependsOn.join(" · ")}
          </p>
        )}
        <p>
          <span className={`font-semibold ${t.textStrong}`}>Resultado: </span>
          {opp.outcome}
        </p>
      </footer>
    </article>
  );
}

function WaveBlock({ wave }: { wave: WorkPlanWave }) {
  const t = TONES[wave.color];
  const [expanded, setExpanded] = useState(true);

  return (
    <section
      id={wave.id}
      className={`overflow-hidden rounded-3xl border ${t.border} bg-white shadow-md`}
    >
      <button
        type="button"
        onClick={() => setExpanded((s) => !s)}
        className={`flex w-full items-center gap-4 bg-gradient-to-r ${t.gradient} p-6 text-left text-white`}
      >
        <div className="flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">
            {wave.label}
          </p>
          <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
            {wave.headline}
          </h3>
          <p className="mt-1 text-sm text-white/85">{wave.window}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white sm:inline-flex">
            {wave.opportunities.length} oportunidades
          </span>
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition ${
              expanded ? "rotate-180" : ""
            }`}
            aria-hidden
          >
            ▾
          </span>
        </div>
      </button>

      {expanded && (
        <div className="space-y-6 p-6">
          <p className="text-sm leading-7 text-gray-700 sm:text-base">
            {wave.focus}
          </p>

          <div className={`rounded-2xl ${t.bg} border ${t.border} p-4`}>
            <p
              className={`text-[10px] font-bold uppercase tracking-widest ${t.text}`}
            >
              Metas de la wave
            </p>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {wave.goals.map((g) => (
                <li
                  key={g}
                  className="flex gap-2 text-[13px] leading-5 text-gray-800"
                >
                  <span className={`mt-1.5 h-1 w-1 flex-none rounded-full ${t.dot}`} />
                  {g}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {wave.opportunities.map((opp) => (
              <OpportunityCard key={opp.code} opp={opp} tone={wave.color} />
            ))}
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">
              Qué necesitamos del cliente para arrancar esta wave
            </p>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {wave.clientAsk.map((a) => (
                <li
                  key={a}
                  className="flex gap-2 text-[13px] leading-5 text-gray-800"
                >
                  <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-amber-500" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

export default function WorkPlanCanvas({ data }: { data: WorkPlanData }) {
  const totalOpps = data.waves.reduce(
    (acc, w) => acc + w.opportunities.length,
    0
  );

  return (
    <div className="mt-10 space-y-12">
      {/* Intro / horizon banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-8 text-white shadow-xl">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-200">
            Plan de trabajo
          </p>
          <h3 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            {data.horizon}
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">
            {data.intro}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-200">
                Waves
              </p>
              <p className="mt-1 text-3xl font-bold">{data.waves.length}</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-200">
                Oportunidades
              </p>
              <p className="mt-1 text-3xl font-bold">{totalOpps}</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-200">
                Gates críticos
              </p>
              <p className="mt-1 text-3xl font-bold">
                {data.criticalPath.length}
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-200">
                Pilares
              </p>
              <p className="mt-1 text-3xl font-bold">3</p>
            </div>
          </div>
        </div>
      </section>

      {/* Principios */}
      <section>
        <SectionHeader
          eyebrow="Reglas del programa"
          title="Principios de ejecución"
          subtitle="Cómo trabajamos con Argos, con Quantics y con Salesforce PS durante los 18 meses del programa."
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {data.principles.map((p, i) => (
            <li
              key={p}
              className="flex gap-3 rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm"
            >
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                {i + 1}
              </span>
              <p className="text-sm leading-6 text-gray-800">{p}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Waves */}
      <section>
        <SectionHeader
          eyebrow="Roadmap ejecutable"
          title="4 waves · 12 oportunidades de venta"
          subtitle="Cada wave habilita técnicamente a la siguiente. Al cierre de cada wave hay un Business Review formal con decisión Go/No-Go."
        />

        <div className="space-y-6">
          {data.waves.map((w) => (
            <WaveBlock key={w.id} wave={w} />
          ))}
        </div>
      </section>

      {/* Línea crítica */}
      <section>
        <SectionHeader
          eyebrow="Línea crítica"
          title="Gates que no se pueden saltar"
          subtitle="Estas son las decisiones y entregables cuyo retraso mueve toda la línea de tiempo del programa."
        />

        <ol className="relative space-y-4 border-l-2 border-indigo-200 pl-6">
          {data.criticalPath.map((step) => (
            <li key={step.step} className="relative">
              <span className="absolute -left-[33px] flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-[11px] font-bold text-white shadow-md">
                {step.step}
              </span>
              <div className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-indigo-800">
                  {step.gate}
                </p>
                <p className="mt-1 text-[13px] leading-6 text-gray-700">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Governance */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-700">
            Governance del programa
          </p>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            {data.governance.steerco}
          </p>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Roles clave
          </p>
          <ul className="mt-2 space-y-2">
            {data.governance.roles.map((r) => (
              <li
                key={r.role}
                className="flex flex-col rounded-xl border border-gray-100 bg-gray-50 p-3 text-[13px]"
              >
                <span className="font-semibold text-gray-900">{r.role}</span>
                <span className="text-gray-600">{r.owner}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-700">
            Riesgos y mitigación
          </p>
          <ul className="mt-3 space-y-3">
            {data.governance.risks.map((r) => (
              <li
                key={r.risk}
                className="rounded-xl border border-amber-100 bg-amber-50/40 p-3 text-[13px] leading-6"
              >
                <p className="font-semibold text-amber-900">⚠ {r.risk}</p>
                <p className="mt-1 text-gray-700">
                  <span className="font-semibold text-emerald-700">
                    Mitigación:{" "}
                  </span>
                  {r.mitigation}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next gate — CTA */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white shadow-xl">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">
            ⚡ Próximo paso
          </p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
            {data.nextGate.title}
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/95">
            {data.nextGate.body}
          </p>

          <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white">
              Lo que necesitamos de Argos para arrancar
            </p>
            <ul className="mt-3 space-y-1.5">
              {data.nextGate.asks.map((a, i) => (
                <li key={a} className="flex gap-3 text-[14px] leading-6 text-white/95">
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/25 text-[11px] font-bold">
                    {i + 1}
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
