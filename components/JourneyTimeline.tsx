"use client";

import { useEffect, useRef, useState } from "react";
import type { JourneyData, JourneyPhase, JourneyTouchpoint } from "../data/customerDemos";

type ColorKey = "indigo" | "violet" | "sky" | "emerald";

const C: Record<
  ColorKey,
  {
    phaseBg: string;
    phaseText: string;
    phaseBorder: string;
    dot: string;
    dotRing: string;
    dotShadow: string;
    activeText: string;
    panelBorder: string;
    panelGrad: string;
    transformBg: string;
    transformBorder: string;
    valueBg: string;
    valueText: string;
    productBadge: string;
    navBtn: string;
  }
> = {
  indigo: {
    phaseBg: "bg-indigo-100",
    phaseText: "text-indigo-700",
    phaseBorder: "border-indigo-200",
    dot: "bg-indigo-500",
    dotRing: "ring-indigo-200",
    dotShadow: "shadow-indigo-200",
    activeText: "text-indigo-600",
    panelBorder: "border-indigo-200",
    panelGrad: "from-indigo-50/70 to-white",
    transformBg: "bg-indigo-50",
    transformBorder: "border-indigo-200",
    valueBg: "bg-indigo-600",
    valueText: "text-white",
    productBadge: "bg-indigo-100 text-indigo-700 border-indigo-200",
    navBtn: "text-indigo-600 border-indigo-200 hover:bg-indigo-50",
  },
  violet: {
    phaseBg: "bg-violet-100",
    phaseText: "text-violet-700",
    phaseBorder: "border-violet-200",
    dot: "bg-violet-500",
    dotRing: "ring-violet-200",
    dotShadow: "shadow-violet-200",
    activeText: "text-violet-600",
    panelBorder: "border-violet-200",
    panelGrad: "from-violet-50/70 to-white",
    transformBg: "bg-violet-50",
    transformBorder: "border-violet-200",
    valueBg: "bg-violet-600",
    valueText: "text-white",
    productBadge: "bg-violet-100 text-violet-700 border-violet-200",
    navBtn: "text-violet-600 border-violet-200 hover:bg-violet-50",
  },
  sky: {
    phaseBg: "bg-sky-100",
    phaseText: "text-sky-700",
    phaseBorder: "border-sky-200",
    dot: "bg-sky-500",
    dotRing: "ring-sky-200",
    dotShadow: "shadow-sky-200",
    activeText: "text-sky-600",
    panelBorder: "border-sky-200",
    panelGrad: "from-sky-50/70 to-white",
    transformBg: "bg-sky-50",
    transformBorder: "border-sky-200",
    valueBg: "bg-sky-600",
    valueText: "text-white",
    productBadge: "bg-sky-100 text-sky-700 border-sky-200",
    navBtn: "text-sky-600 border-sky-200 hover:bg-sky-50",
  },
  emerald: {
    phaseBg: "bg-emerald-100",
    phaseText: "text-emerald-700",
    phaseBorder: "border-emerald-200",
    dot: "bg-emerald-500",
    dotRing: "ring-emerald-200",
    dotShadow: "shadow-emerald-200",
    activeText: "text-emerald-600",
    panelBorder: "border-emerald-200",
    panelGrad: "from-emerald-50/70 to-white",
    transformBg: "bg-emerald-50",
    transformBorder: "border-emerald-200",
    valueBg: "bg-emerald-600",
    valueText: "text-white",
    productBadge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    navBtn: "text-emerald-600 border-emerald-200 hover:bg-emerald-50",
  },
};

function phaseColor(phases: JourneyPhase[], phaseId: string): ColorKey {
  return (phases.find((p) => p.id === phaseId)?.color ?? "indigo") as ColorKey;
}

export default function JourneyTimeline({ data }: { data: JourneyData }) {
  const [active, setActive] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const tps = data.touchpoints;
  const activeTP: JourneyTouchpoint | undefined = active !== null ? tps.find((t) => t.number === active) : undefined;
  const activeIdx = active !== null ? tps.findIndex((t) => t.number === active) : -1;

  function navigate(dir: 1 | -1) {
    if (activeIdx === -1) return;
    const next = activeIdx + dir;
    if (next >= 0 && next < tps.length) setActive(tps[next].number);
  }

  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") { e.preventDefault(); navigate(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); navigate(-1); }
      if (e.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, activeIdx]);

  useEffect(() => {
    if (active !== null && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active !== null]);

  const totalCols = tps.length;

  return (
    <div className="mt-8 space-y-5">

      {/* ── DESKTOP JOURNEY RAIL ── */}
      <div className="hidden md:block">
        {/* Phase header row */}
        <div
          className="grid gap-1.5 mb-3"
          style={{ gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))` }}
        >
          {data.phases.map((phase) => {
            const c = C[phase.color];
            return (
              <div
                key={phase.id}
                style={{ gridColumn: `span ${phase.span}` }}
                className={`rounded-xl border px-2 py-2 text-center text-[11px] font-bold tracking-wide ${c.phaseBg} ${c.phaseText} ${c.phaseBorder}`}
              >
                {phase.label}
              </div>
            );
          })}
        </div>

        {/* Connecting line + nodes */}
        <div className="relative">
          <div
            className="absolute top-5 h-0.5 bg-gradient-to-r from-indigo-300 via-violet-300 via-sky-300 to-emerald-300"
            style={{ left: `${(100 / totalCols) * 0.5}%`, right: `${(100 / totalCols) * 0.5}%` }}
          />
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))` }}
          >
            {tps.map((tp) => {
              const color = phaseColor(data.phases, tp.phaseId);
              const c = C[color];
              const isActive = active === tp.number;
              return (
                <button
                  key={tp.number}
                  type="button"
                  onClick={() => setActive(isActive ? null : tp.number)}
                  className="group flex flex-col items-center gap-1.5 pt-0.5 focus:outline-none"
                >
                  <div
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2 ${c.dotRing} ${c.dot} shadow-md transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg ${isActive ? "scale-110 shadow-lg " + c.dotShadow : ""}`}
                  >
                    <span className="text-xs font-bold text-white">{tp.number}</span>
                  </div>
                  <span className="text-base leading-none">{tp.icon}</span>
                  <p
                    className={`text-center text-[10px] font-bold leading-tight transition-colors ${isActive ? c.activeText : "text-gray-600 group-hover:" + c.activeText}`}
                  >
                    {tp.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hint */}
        {active === null && (
          <p className="mt-4 text-center text-xs text-gray-400">
            Selecciona un touchpoint para ver el detalle del journey
          </p>
        )}
      </div>

      {/* ── MOBILE: vertical list ── */}
      <div className="space-y-2 md:hidden">
        {data.phases.map((phase) => {
          const c = C[phase.color];
          const phaseTps = tps.filter((t) => t.phaseId === phase.id);
          return (
            <div key={phase.id}>
              <div className={`mb-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold ${c.phaseBg} ${c.phaseText} ${c.phaseBorder}`}>
                {phase.label}
              </div>
              <div className="space-y-1.5 pl-3">
                {phaseTps.map((tp) => {
                  const isActive = active === tp.number;
                  return (
                    <button
                      key={tp.number}
                      type="button"
                      onClick={() => setActive(isActive ? null : tp.number)}
                      className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition-all ${isActive ? `${c.panelBorder} shadow-md ring-1 ${c.panelBorder}` : "border-gray-100 hover:border-gray-200 hover:shadow-md"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${c.dot}`}>
                          {tp.number}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{tp.icon} {tp.title}</p>
                          <p className="mt-0.5 text-xs text-gray-500">{tp.subtitle}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── DETAIL PANEL ── */}
      {activeTP && (() => {
        const color = phaseColor(data.phases, activeTP.phaseId);
        const c = C[color];
        const phaseLabel = data.phases.find((p) => p.id === activeTP.phaseId)?.label ?? "";
        return (
          <div
            ref={panelRef}
            className={`overflow-hidden rounded-3xl border ${c.panelBorder} bg-gradient-to-br ${c.panelGrad} shadow-lg`}
          >
            {/* Nav bar */}
            <div className={`flex items-center justify-between border-b ${c.panelBorder} px-6 py-3`}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={activeIdx === 0}
                className={`flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-30 ${c.navBtn}`}
                aria-label="Touchpoint anterior"
              >←</button>
              <span className="text-xs font-semibold text-gray-400">
                {activeIdx + 1} / {tps.length}
              </span>
              <button
                type="button"
                onClick={() => navigate(1)}
                disabled={activeIdx === tps.length - 1}
                className={`flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-30 ${c.navBtn}`}
                aria-label="Touchpoint siguiente"
              >→</button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="mb-6 flex items-start gap-4">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-2xl ${c.phaseBg} ${c.phaseBorder}`}>
                  {activeTP.icon}
                </div>
                <div>
                  <span className={`inline-block rounded-full border px-3 py-0.5 text-[11px] font-bold ${c.productBadge} mb-2`}>
                    {phaseLabel}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-950 leading-tight">
                    {activeTP.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gray-500">{activeTP.subtitle}</p>
                </div>
              </div>

              {/* Before / Con Salesforce */}
              <div className="grid gap-4 md:grid-cols-2 mb-4">
                <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-[10px] font-bold text-white">✕</span>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Antes</p>
                  </div>
                  <p className="text-sm leading-6 text-gray-600">{activeTP.before}</p>
                </div>

                <div className={`rounded-2xl border ${c.transformBorder} ${c.transformBg} p-5`}>
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${c.dot}`}>✓</span>
                    <p className={`text-[11px] font-bold uppercase tracking-widest ${c.phaseText}`}>Con Salesforce</p>
                  </div>
                  <p className="text-sm leading-6 text-gray-700">{activeTP.transformation}</p>
                </div>
              </div>

              {/* Valor para Argos */}
              <div className={`rounded-2xl ${c.valueBg} p-5 mb-4`}>
                <p className={`text-[11px] font-bold uppercase tracking-widest ${c.valueText} opacity-75 mb-2`}>
                  Valor para Argos
                </p>
                <p className={`text-sm leading-6 font-semibold ${c.valueText}`}>{activeTP.value}</p>
              </div>

              {/* Products */}
              <div className="flex flex-wrap gap-2">
                {activeTP.products.map((p) => (
                  <span key={p} className={`rounded-full border px-3 py-1 text-xs font-semibold ${c.productBadge}`}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
