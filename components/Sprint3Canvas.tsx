"use client";

import Link from "next/link";
import { useState } from "react";
import type { Sprint3Data } from "../data/customerDemos";

const TONES = {
  indigo: {
    border: "border-indigo-200",
    bg: "bg-indigo-50/60",
    bgSolid: "bg-indigo-50",
    text: "text-indigo-700",
    dot: "bg-indigo-500",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
    gradient: "from-indigo-500 to-blue-500",
    ring: "ring-indigo-200",
  },
  violet: {
    border: "border-violet-200",
    bg: "bg-violet-50/60",
    bgSolid: "bg-violet-50",
    text: "text-violet-700",
    dot: "bg-violet-500",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    gradient: "from-violet-500 to-fuchsia-500",
    ring: "ring-violet-200",
  },
  sky: {
    border: "border-sky-200",
    bg: "bg-sky-50/60",
    bgSolid: "bg-sky-50",
    text: "text-sky-700",
    dot: "bg-sky-500",
    badge: "bg-sky-100 text-sky-700 border-sky-200",
    gradient: "from-sky-500 to-cyan-500",
    ring: "ring-sky-200",
  },
  emerald: {
    border: "border-emerald-200",
    bg: "bg-emerald-50/60",
    bgSolid: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    gradient: "from-emerald-500 to-teal-500",
    ring: "ring-emerald-200",
  },
  amber: {
    border: "border-amber-200",
    bg: "bg-amber-50/60",
    bgSolid: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    gradient: "from-amber-500 to-orange-500",
    ring: "ring-amber-200",
  },
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

export default function Sprint3Canvas({
  data,
  deckHref,
}: {
  data: Sprint3Data;
  deckHref?: string;
}) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const step = data.flow.find((s) => s.number === activeStep) ?? data.flow[0];
  const stepTone = TONES[step.tone as ToneKey];

  return (
    <div className="mt-10 space-y-14">
      {/* Sprint 3 strip */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-sky-50/80 px-5 py-3 text-xs sm:text-sm">
        <span className="rounded-full bg-white px-3 py-1 font-semibold text-emerald-700 shadow-sm">
          Sprint 3 · feb 2027 en adelante
        </span>
        <span className="text-gray-500">·</span>
        <span className="text-gray-700">
          La continuación natural del roadmap del JTBD — donde Betterware da el salto a personalización en tiempo real.
        </span>
      </div>

      {/* Deck CTA banner */}
      {deckHref && (
        <Link
          href={deckHref}
          className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 p-5 text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)] transition hover:shadow-[0_14px_36px_rgba(16,185,129,0.35)] sm:flex-row sm:items-center sm:justify-between sm:p-6"
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
                Inteligencia y Personalización
              </p>
              <p className="mt-1 text-xs text-white/85 sm:text-sm">
                Vista presentable: concepto, flujo, audiencias, atribución, KPIs y fases.
              </p>
            </div>
          </div>

          <span className="relative inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition group-hover:bg-emerald-50">
            Abrir deck
            <svg className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
      )}

      {/* ── 1. Highlights ─────────────────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="Lo esencial"
          title="Una sola landing. Identidad por distribuidora. Atribución 1:1."
          subtitle="Cuatro promesas medibles del programa — el resto del documento las explica una a una."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {data.highlights.map((h, i) => {
            const tone = ([TONES.indigo, TONES.violet, TONES.sky, TONES.emerald] as const)[i % 4];
            return (
              <div
                key={h.label}
                className={`relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm ${tone.border}`}
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone.gradient}`} />
                <p className={`text-3xl font-bold ${tone.text} sm:text-4xl`}>{h.value}</p>
                <p className="mt-2 text-xs leading-5 text-gray-600 sm:text-sm">{h.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 2. Concept quote ──────────────────────────────────────── */}
      <section>
        <div className="relative overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-violet-50 to-sky-50 p-8 sm:p-12">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-200/40 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet-200/40 blur-3xl" />
          <p className="relative text-xs font-bold uppercase tracking-widest text-indigo-600">
            El concepto central
          </p>
          <blockquote className="relative mt-3 text-2xl font-bold leading-tight text-gray-950 sm:text-3xl">
            &ldquo;{data.conceptQuote}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── 3. Roles ────────────────────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="Roles y jerarquía"
          title="Tres actores. Una sola plataforma. Cada uno hace lo que mejor sabe hacer."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {data.roles.map((role, i) => {
            const tone = TONES[role.tone];
            const isLast = i === data.roles.length - 1;
            return (
              <div key={role.name} className="relative">
                <div className={`h-full rounded-3xl border p-6 ${tone.border} ${tone.bg}`}>
                  <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${tone.badge}`}>
                    Actor {i + 1}
                  </div>
                  <h4 className="mt-3 text-xl font-bold text-gray-950">{role.name}</h4>
                  <p className={`mt-1 text-sm font-semibold ${tone.text}`}>{role.tagline}</p>
                  <p className="mt-3 text-sm leading-6 text-gray-700">{role.description}</p>
                </div>
                {!isLast && (
                  <div className="hidden lg:block absolute right-[-22px] top-1/2 z-10 -translate-y-1/2">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ${tone.text}`}>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. Antes vs Ahora ──────────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="El cambio de enfoque"
          title="De miles de micrositios a un solo sitio que se transforma en tiempo real"
          subtitle="Un cambio de arquitectura que simplifica la operación y, a la vez, hace la experiencia más rica para la asociada."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-gray-50/60 p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-[11px] font-bold text-white">✕</span>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">{data.shift.before.heading}</p>
            </div>
            <p className="text-sm leading-6 text-gray-700">{data.shift.before.body}</p>
            <ul className="mt-4 space-y-2">
              {data.shift.before.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm leading-6 text-gray-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-sky-50/40 p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-bold text-white">✓</span>
              <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">{data.shift.after.heading}</p>
            </div>
            <p className="text-sm leading-6 text-gray-800">{data.shift.after.body}</p>
            <ul className="mt-4 space-y-2">
              {data.shift.after.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm leading-6 text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. Flujo en 8 pasos ────────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="El flujo de la experiencia"
          title="8 pasos — del contenido base a la atribución 1:1"
          subtitle="Selecciona un paso para ver el detalle. Cada paso responde a un actor concreto y deja una huella medible."
        />
        <div className="grid gap-2 md:grid-cols-4 lg:grid-cols-8">
          {data.flow.map((s) => {
            const tone = TONES[s.tone as ToneKey];
            const isActive = activeStep === s.number;
            return (
              <button
                key={s.number}
                type="button"
                onClick={() => setActiveStep(s.number)}
                className="group flex flex-col items-center gap-2 focus:outline-none"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white shadow-md transition-all ${tone.dot} ${
                    isActive ? `scale-110 ring-4 ${tone.ring}` : "group-hover:scale-105"
                  }`}
                >
                  {s.number}
                </div>
                <p
                  className={`px-1 text-center text-[11px] font-bold leading-tight transition-colors ${
                    isActive ? tone.text : "text-gray-500 group-hover:text-gray-800"
                  }`}
                >
                  {s.title}
                </p>
              </button>
            );
          })}
        </div>
        <div
          className={`mt-6 overflow-hidden rounded-3xl border bg-white shadow-sm ${stepTone.border}`}
        >
          <div className={`border-b px-6 py-4 ${stepTone.border} ${stepTone.bgSolid}`}>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${stepTone.dot}`}
              >
                {step.number}
              </span>
              <h4 className="text-xl font-bold text-gray-950">{step.title}</h4>
              <span className={`ml-auto inline-flex rounded-full border px-3 py-1 text-[11px] font-bold ${stepTone.badge}`}>
                {step.actor}
              </span>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm leading-7 text-gray-700">{step.description}</p>
          </div>
        </div>
      </section>

      {/* ── 6. Landing zonas ───────────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="La landing transformada"
          title="Cuatro zonas que se renderizan con la identidad de cada distribuidora"
          subtitle="La asociada ve la tienda personal de su distribuidora. Sin que Betterware haya creado miles de páginas."
        />
        <div className="overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/40 via-white to-violet-50/30 shadow-sm">
          <div className="border-b border-indigo-100 bg-white/60 px-6 py-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-600">
              Vista de la landing — ejemplo: María González · Distribuidora Diamante
            </p>
          </div>
          <div className="grid gap-0 p-2 md:p-4">
            {data.landingZones.map((z) => (
              <div
                key={z.number}
                className="grid gap-3 rounded-2xl border border-transparent p-4 transition hover:border-indigo-200 hover:bg-white md:grid-cols-12 md:gap-5"
              >
                <div className="md:col-span-1 flex md:justify-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                    {z.number}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-700">
                    Zona {z.number}
                  </p>
                  <p className="mt-1 text-base font-bold text-gray-950">{z.label}</p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Ejemplo</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">{z.example}</p>
                </div>
                <div className="md:col-span-4">
                  <p className="text-sm leading-6 text-gray-600">{z.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Audiencias Data 360 ─────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="Audiencias dinámicas en Data 360"
          title="Cinco audiencias accionables que viven en el perfil unificado"
          subtitle="Data 360 no solo guarda datos: convierte cada señal de comportamiento en un grupo activable. La marca decide qué decirles, cuándo y por qué canal."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.audiences.map((a) => {
            const tone = TONES[a.tone];
            return (
              <div key={a.name} className={`rounded-3xl border p-5 ${tone.border} ${tone.bg}`}>
                <div className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${tone.badge}`}>
                  Audiencia
                </div>
                <h4 className="mt-3 text-base font-bold text-gray-950">{a.name}</h4>
                <div className="mt-4 space-y-2.5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Señal</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">{a.signal}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Activación</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">{a.activation}</p>
                  </div>
                  <div className={`rounded-2xl border p-3 ${tone.border} bg-white`}>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${tone.text}`}>Resultado</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-gray-800">{a.outcome}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 8. Atribución ──────────────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="Atribución 1:1"
          title="Cada compra deja huella en el perfil — no en una cookie"
        />
        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-white p-6 shadow-sm">
          <p className="text-sm leading-7 text-gray-800">{data.attribution.intro}</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">✓</span>
                <p className="text-sm font-bold text-emerald-700">{data.attribution.direct.title}</p>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Cómo funciona</p>
              <p className="mt-1 text-sm leading-6 text-gray-700">{data.attribution.direct.how}</p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">Cuándo aplica</p>
              <p className="mt-1 text-sm leading-6 text-gray-700">{data.attribution.direct.when}</p>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">↺</span>
                <p className="text-sm font-bold text-sky-700">{data.attribution.indirect.title}</p>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Cómo funciona</p>
              <p className="mt-1 text-sm leading-6 text-gray-700">{data.attribution.indirect.how}</p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">Cuándo aplica</p>
              <p className="mt-1 text-sm leading-6 text-gray-700">{data.attribution.indirect.when}</p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-500/10 p-4">
            <p className="text-sm font-semibold leading-6 text-emerald-900">{data.attribution.persistence}</p>
          </div>
        </div>
      </section>

      {/* ── 9. Stack ───────────────────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="El stack que lo hace posible"
          title="Cuatro piezas trabajando juntas"
          subtitle="Cada producto cumple un rol específico. Ninguno hace el trabajo de otro."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.stack.map((s) => {
            const tone = TONES[s.tone];
            return (
              <div key={s.product} className={`rounded-3xl border bg-white p-5 shadow-sm ${tone.border}`}>
                <div className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${tone.badge}`}>
                  Producto
                </div>
                <h4 className="mt-3 text-base font-bold text-gray-950">{s.product}</h4>
                <p className="mt-2 text-sm leading-6 text-gray-600">{s.role}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 10. KPIs ───────────────────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="Impacto de negocio"
          title="Lo que pasa de no medible a medible"
        />
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="hidden grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50 px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-gray-500 md:grid">
            <div className="col-span-4">Métrica</div>
            <div className="col-span-4">Antes</div>
            <div className="col-span-4">Después</div>
          </div>
          <ul>
            {data.kpis.map((row, i) => (
              <li
                key={row.metric}
                className={`grid gap-2 px-5 py-4 md:grid-cols-12 md:gap-4 ${
                  i !== data.kpis.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="md:col-span-4">
                  <p className="text-sm font-bold text-gray-950">{row.metric}</p>
                </div>
                <div className="md:col-span-4">
                  <p className="text-sm text-gray-500">{row.before}</p>
                </div>
                <div className="md:col-span-4">
                  <p className="text-sm font-semibold text-emerald-700">{row.after}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 11. Phases ─────────────────────────────────────────── */}
      <section>
        <SectionHeader
          eyebrow="Fases de despliegue"
          title="Empieza simple. Escala completo."
          subtitle="Dos puntos de partida posibles. La Fase 1 valida la mecánica; la Fase 2 entrega la versión completa con UX unificada y atribución más limpia."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {data.phases.map((p) => {
            const tone = TONES[p.tone];
            return (
              <div
                key={p.label}
                className={`relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm ${tone.border}`}
              >
                {p.recommended && (
                  <div className="absolute right-4 top-4">
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Recomendada
                    </span>
                  </div>
                )}
                <p className={`text-[11px] font-bold uppercase tracking-widest ${tone.text}`}>{p.label}</p>
                <h4 className="mt-1 text-xl font-bold text-gray-950">{p.subtitle}</h4>
                <p className="mt-3 text-sm leading-6 text-gray-600">{p.description}</p>
                <ul className="mt-4 space-y-2">
                  {p.enables.map((e) => (
                    <li key={e} className="flex items-start gap-2.5 text-sm leading-6 text-gray-700">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`} />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
