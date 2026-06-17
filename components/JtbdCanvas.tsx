"use client";

import Link from "next/link";
import { useState } from "react";
import type { JtbdData } from "../data/customerDemos";

const TONE_INDIGO = {
  border: "border-indigo-200",
  bg: "bg-indigo-50/60",
  bgSolid: "bg-indigo-50",
  text: "text-indigo-700",
  ring: "ring-indigo-200",
  dot: "bg-indigo-500",
  badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
  gradient: "from-indigo-500 to-blue-500",
  iconBg: "bg-indigo-100 text-indigo-600",
};
const TONE_VIOLET = {
  border: "border-violet-200",
  bg: "bg-violet-50/60",
  bgSolid: "bg-violet-50",
  text: "text-violet-700",
  ring: "ring-violet-200",
  dot: "bg-violet-500",
  badge: "bg-violet-100 text-violet-700 border-violet-200",
  gradient: "from-violet-500 to-fuchsia-500",
  iconBg: "bg-violet-100 text-violet-600",
};
const TONE_SKY = {
  border: "border-sky-200",
  bg: "bg-sky-50/60",
  bgSolid: "bg-sky-50",
  text: "text-sky-700",
  ring: "ring-sky-200",
  dot: "bg-sky-500",
  badge: "bg-sky-100 text-sky-700 border-sky-200",
  gradient: "from-sky-500 to-cyan-500",
  iconBg: "bg-sky-100 text-sky-600",
};
const TONE_EMERALD = {
  border: "border-emerald-200",
  bg: "bg-emerald-50/60",
  bgSolid: "bg-emerald-50",
  text: "text-emerald-700",
  ring: "ring-emerald-200",
  dot: "bg-emerald-500",
  badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
  gradient: "from-emerald-500 to-teal-500",
  iconBg: "bg-emerald-100 text-emerald-600",
};
const TONE_AMBER = {
  border: "border-amber-200",
  bg: "bg-amber-50/60",
  bgSolid: "bg-amber-50",
  text: "text-amber-700",
  ring: "ring-amber-200",
  dot: "bg-amber-500",
  badge: "bg-amber-100 text-amber-700 border-amber-200",
  gradient: "from-amber-500 to-orange-500",
  iconBg: "bg-amber-100 text-amber-600",
};

const TONES = {
  indigo: TONE_INDIGO,
  violet: TONE_VIOLET,
  sky: TONE_SKY,
  emerald: TONE_EMERALD,
  amber: TONE_AMBER,
} as const;

type ToneKey = keyof typeof TONES;

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h3 className="text-2xl font-bold text-gray-950 sm:text-3xl">{title}</h3>
      {subtitle && (
        <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">{subtitle}</p>
      )}
    </div>
  );
}

export default function JtbdCanvas({
  data,
  deckHref,
}: {
  data: JtbdData;
  deckHref?: string;
}) {
  const [activeStage, setActiveStage] = useState<number>(1);
  const stage = data.funnel.find((s) => s.number === activeStage) ?? data.funnel[0];
  const stageTone = TONES[stage.color as ToneKey];

  return (
    <div className="mt-10 space-y-14">
      {/* Authoring strip */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-violet-50/80 px-5 py-3 text-xs sm:text-sm">
        <span className="rounded-full bg-white px-3 py-1 font-semibold text-indigo-700 shadow-sm">
          {data.authoredBy}
        </span>
        <span className="text-gray-500">·</span>
        <span className="text-gray-600">{data.workshopDate}</span>
        <span className="text-gray-500">·</span>
        <span className="text-gray-600">{data.intro}</span>
      </div>

      {/* Deck CTA banner */}
      {deckHref && (
        <Link
          href={deckHref}
          className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 p-5 text-white shadow-[0_10px_30px_rgba(95,111,255,0.25)] transition hover:shadow-[0_14px_36px_rgba(95,111,255,0.35)] sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/80">
                Deck ejecutivo · 14 min
              </p>
              <p className="mt-1 text-base font-bold sm:text-lg">
                Jobs To Be Done — Insights, Journey & Roadmap
              </p>
              <p className="mt-1 text-xs text-white/85 sm:text-sm">
                Vista presentable del entregable: perfil DS, funnel, gaps, canales, iniciativas y sprints.
              </p>
            </div>
          </div>

          <span className="relative inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition group-hover:bg-indigo-50">
            Abrir deck
            <svg className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
      )}

      {/* ── 1. Stats clave del funnel ───────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="Hallazgos cuantitativos"
          title="Las cifras que definen el problema"
          subtitle="Seis números clave del funnel actual de la Distribuidora Nueva — el dolor visible en datos."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {data.funnelStats.map((s, i) => {
            const tone = [TONE_INDIGO, TONE_VIOLET, TONE_SKY, TONE_EMERALD, TONE_AMBER, TONE_INDIGO][i % 6];
            return (
              <div
                key={s.label}
                className={`group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${tone.border}`}
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone.gradient}`} />
                <p className={`text-3xl font-bold ${tone.text} sm:text-4xl`}>{s.value}</p>
                <p className="mt-2 text-xs leading-5 text-gray-600 sm:text-sm">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 2. Insights (workshop + visita en calle) ─────────────── */}
      <section>
        <SectionHeader
          eyebrow="Resumen de insights clave"
          title="Lo que dijeron los datos. Lo que dijo la calle."
          subtitle="Dos perspectivas distintas sobre el mismo journey: la que el equipo de Betterware reconoció en sesión, y la que solo emerge cuando se camina con una distribuidora real."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {data.insightGroups.map((group) => {
            const tone = TONES[group.tone];
            return (
              <div key={group.name} className={`rounded-3xl border p-6 sm:p-7 ${tone.border} ${tone.bg}`}>
                <div className="mb-5 flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone.iconBg}`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${tone.text}`}>{group.eyebrow}</p>
                    <p className="text-base font-bold text-gray-950">{group.name}</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {group.insights.map((ins) => (
                    <li key={ins.title} className="flex items-start gap-3">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`} />
                      <div>
                        <p className="text-sm font-semibold text-gray-950">{ins.title}</p>
                        <p className="mt-1 text-sm leading-6 text-gray-600">{ins.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. Persona ────────────────────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="Perfil de la Distribuidora Nueva"
          title="A quién estamos sirviendo"
          subtitle={data.persona.headline}
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {data.persona.columns.map((col) => {
            const tone = TONES[col.tone];
            return (
              <div key={col.heading} className={`rounded-3xl border p-6 ${tone.border} ${tone.bg}`}>
                <div className={`mb-4 inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${tone.badge}`}>
                  {col.heading}
                </div>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`} />
                      <span className="text-sm leading-6 text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. Funnel de 6 etapas ───────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="Funnel de la Distribuidora Nueva"
          title="6 etapas con dos perspectivas: lo que la DS hace, lo que Better debe habilitar"
          subtitle="Selecciona una etapa para ver el job, lo que Better debe habilitar, el KPI crítico y el canal."
        />

        {/* Stage selector */}
        <div className="relative">
          <div className="absolute left-0 right-0 top-5 hidden h-0.5 bg-gradient-to-r from-indigo-300 via-violet-300 via-sky-300 to-emerald-300 md:block" />
          <div className="grid gap-2 md:grid-cols-6">
            {data.funnel.map((s) => {
              const tone = TONES[s.color as ToneKey];
              const isActive = activeStage === s.number;
              return (
                <button
                  key={s.number}
                  type="button"
                  onClick={() => setActiveStage(s.number)}
                  className="group relative flex flex-col items-center gap-2 focus:outline-none"
                >
                  <div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white shadow-md transition-all ${tone.dot} ${
                      isActive ? `scale-110 ring-4 ${tone.ring}` : "group-hover:scale-105"
                    }`}
                  >
                    {s.number}
                  </div>
                  <p
                    className={`px-2 text-center text-[11px] font-bold leading-tight transition-colors ${
                      isActive ? tone.text : "text-gray-500 group-hover:text-gray-800"
                    }`}
                  >
                    {s.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active stage detail */}
        <div
          className={`mt-6 overflow-hidden rounded-3xl border bg-gradient-to-br from-white to-white shadow-sm ${stageTone.border}`}
        >
          <div className={`border-b px-6 py-4 ${stageTone.border} ${stageTone.bgSolid}`}>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${stageTone.dot}`}
              >
                {stage.number}
              </span>
              <h4 className="text-xl font-bold text-gray-950">{stage.name}</h4>
            </div>
          </div>
          <div className="grid gap-5 p-6 md:grid-cols-2">
            <div>
              <p className={`text-xs font-bold uppercase tracking-widest ${stageTone.text}`}>Job to be Done</p>
              <p className="mt-2 text-sm leading-6 text-gray-700">{stage.jobToBeDone}</p>
            </div>
            <div>
              <p className={`text-xs font-bold uppercase tracking-widest ${stageTone.text}`}>Better debe habilitar</p>
              <ul className="mt-2 space-y-2">
                {stage.betterEnables.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm leading-6 text-gray-700">
                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${stageTone.dot}`} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`rounded-2xl border p-4 ${stageTone.border} ${stageTone.bg}`}>
              <p className={`text-xs font-bold uppercase tracking-widest ${stageTone.text}`}>KPI crítico</p>
              <p className="mt-1.5 text-sm font-semibold text-gray-950">{stage.kpi}</p>
            </div>
            <div className={`rounded-2xl border p-4 ${stageTone.border} ${stageTone.bg}`}>
              <p className={`text-xs font-bold uppercase tracking-widest ${stageTone.text}`}>Canal principal</p>
              <p className="mt-1.5 text-sm font-semibold text-gray-950">{stage.channel}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Gap Analysis ──────────────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="Gap Analysis · 10 Jobs to Be Done"
          title="Lo que la DS quiere lograr, vs. lo que hoy puede"
          subtitle="Cinco jobs críticos (rojo) y cinco de prioridad alta (ámbar). La capacidad TO-BE define lo que Aliada Digital tiene que entregar."
        />
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="hidden grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50 px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-gray-500 md:grid">
            <div className="col-span-3">Job (lo que quiere lograr)</div>
            <div className="col-span-4">Estado AS-IS</div>
            <div className="col-span-1 text-center">Brecha</div>
            <div className="col-span-4">Capacidad TO-BE</div>
          </div>
          <ul>
            {data.gaps.map((g, i) => {
              const isCritical = g.severity === "critico";
              return (
                <li
                  key={g.job}
                  className={`grid gap-3 px-5 py-4 md:grid-cols-12 md:gap-4 md:py-5 ${
                    i !== data.gaps.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="md:col-span-3">
                    <p className="text-sm font-bold text-gray-950">{g.job}</p>
                  </div>
                  <div className="md:col-span-4">
                    <p className="text-sm leading-6 text-gray-600">{g.asIs}</p>
                  </div>
                  <div className="md:col-span-1">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest ${
                        isCritical
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${isCritical ? "bg-red-500" : "bg-amber-500"}`} />
                      {isCritical ? "Crítico" : "Alto"}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <p className="text-sm leading-6 text-gray-700">{g.toBe}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── 6. Rol de Canales ────────────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="Rol de los canales"
          title="WhatsApp para relación. App para transacción."
        />
        <div className="mb-5 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-4 text-sm font-semibold text-emerald-900">
          {data.channelDecision}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.channels.map((ch) => {
            const tone = TONES[ch.tone];
            return (
              <div key={ch.name} className={`flex flex-col rounded-3xl border bg-white p-5 shadow-sm ${tone.border}`}>
                <div className={`absolute -mt-9 inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${tone.badge}`}>
                  Canal
                </div>
                <h4 className="text-base font-bold text-gray-950">{ch.name}</h4>
                <p className={`mt-1 text-xs font-semibold ${tone.text}`}>{ch.role}</p>
                <div className="mt-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Qué vive aquí</p>
                  <ul className="mt-2 space-y-1.5">
                    {ch.livesHere.map((l) => (
                      <li key={l} className="flex items-start gap-2 text-xs leading-5 text-gray-700">
                        <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${tone.dot}`} />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Qué NO vive aquí</p>
                  <ul className="mt-2 space-y-1.5">
                    {ch.notHere.map((l) => (
                      <li key={l} className="flex items-start gap-2 text-xs leading-5 text-gray-500">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 7. Iniciativas Priorizadas ──────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="10 iniciativas priorizadas"
          title="Tres olas: fundacional, diferenciación y escalabilidad"
          subtitle="Cada iniciativa nombra qué resuelve, qué capacidad Salesforce la habilita y el impacto esperado."
        />
        <div className="space-y-6">
          {data.initiatives.map((bucket) => {
            const tone = TONES[bucket.tone];
            return (
              <div key={bucket.label} className={`rounded-3xl border p-6 ${tone.border} ${tone.bg}`}>
                <div className="mb-5 flex flex-wrap items-baseline gap-3">
                  <h4 className={`text-lg font-bold ${tone.text}`}>{bucket.label}</h4>
                  <span className="text-xs font-medium text-gray-500">{bucket.subtitle}</span>
                </div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {bucket.items.map((it) => (
                    <div key={it.number} className={`rounded-2xl border bg-white p-4 shadow-sm ${tone.border}`}>
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${tone.dot}`}
                        >
                          {it.number}
                        </span>
                        <p className="text-sm font-bold text-gray-950">{it.name}</p>
                      </div>
                      <p className="mt-3 text-xs leading-5 text-gray-600">{it.solves}</p>
                      <div className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${tone.badge}`}>
                        {it.capability}
                      </div>
                      <p className="mt-3 text-xs font-semibold text-gray-800">→ {it.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 8. Roadmap por Sprints ──────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="Roadmap por Sprints"
          title="De fundación a inteligencia predictiva en 4 sprints"
          subtitle="Junio 2026 → Febrero 2027 en adelante. Cada sprint con entregables concretos en producción."
        />
        <div className="space-y-4">
          {data.sprints.map((sp) => {
            const tone = TONES[sp.tone];
            return (
              <div
                key={sp.label}
                className={`overflow-hidden rounded-3xl border bg-white shadow-sm ${tone.border}`}
              >
                <div className={`border-b px-5 py-3 ${tone.border} ${tone.bgSolid}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className={`text-sm font-bold ${tone.text}`}>{sp.label}</p>
                    <p className="text-xs font-semibold text-gray-600">{sp.dates}</p>
                  </div>
                </div>
                <ul className="grid gap-2 p-5 md:grid-cols-2">
                  {sp.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm leading-6 text-gray-700">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 9. KPIs de Éxito ───────────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="KPIs de éxito del programa"
          title="Lo que vamos a medir — y contra qué"
        />
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="hidden grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50 px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-gray-500 md:grid">
            <div className="col-span-4">KPI</div>
            <div className="col-span-3">Línea base actual</div>
            <div className="col-span-2">Meta 90 días</div>
            <div className="col-span-3">Meta 6 meses</div>
          </div>
          <ul>
            {data.kpis.map((row, i) => (
              <li
                key={row.kpi}
                className={`grid gap-2 px-5 py-4 md:grid-cols-12 md:gap-4 ${
                  i !== data.kpis.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="md:col-span-4">
                  <p className="text-sm font-bold text-gray-950">{row.kpi}</p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-sm text-gray-600">{row.baseline}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-semibold text-indigo-700">{row.goal90d}</p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-sm font-semibold text-violet-700">{row.goal6m}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
