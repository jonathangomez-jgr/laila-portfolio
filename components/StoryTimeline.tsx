"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { StoryData } from "../data/customerDemos";
import StoryFullscreenPlayer from "./StoryFullscreenPlayer";

type ColorKey = "indigo" | "violet" | "sky" | "emerald" | "amber";

const C: Record<ColorKey, {
  bg: string; border: string; text: string; badge: string; badgeText: string;
  dot: string; ring: string; insightBg: string; insightBorder: string; insightText: string;
  productBadge: string; navBtn: string; panelBorder: string; panelGrad: string;
  numberBg: string; sceneRing: string;
}> = {
  indigo: {
    bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700",
    badge: "bg-indigo-600", badgeText: "text-white",
    dot: "bg-indigo-500", ring: "ring-indigo-300",
    insightBg: "bg-indigo-600", insightBorder: "border-indigo-500", insightText: "text-white",
    productBadge: "bg-indigo-100 text-indigo-700 border-indigo-200",
    navBtn: "text-indigo-600 border-indigo-200 hover:bg-indigo-50",
    panelBorder: "border-indigo-200", panelGrad: "from-indigo-50/60 to-white",
    numberBg: "bg-indigo-500", sceneRing: "ring-indigo-300",
  },
  violet: {
    bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700",
    badge: "bg-violet-600", badgeText: "text-white",
    dot: "bg-violet-500", ring: "ring-violet-300",
    insightBg: "bg-violet-600", insightBorder: "border-violet-500", insightText: "text-white",
    productBadge: "bg-violet-100 text-violet-700 border-violet-200",
    navBtn: "text-violet-600 border-violet-200 hover:bg-violet-50",
    panelBorder: "border-violet-200", panelGrad: "from-violet-50/60 to-white",
    numberBg: "bg-violet-500", sceneRing: "ring-violet-300",
  },
  sky: {
    bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-700",
    badge: "bg-sky-600", badgeText: "text-white",
    dot: "bg-sky-500", ring: "ring-sky-300",
    insightBg: "bg-sky-600", insightBorder: "border-sky-500", insightText: "text-white",
    productBadge: "bg-sky-100 text-sky-700 border-sky-200",
    navBtn: "text-sky-600 border-sky-200 hover:bg-sky-50",
    panelBorder: "border-sky-200", panelGrad: "from-sky-50/60 to-white",
    numberBg: "bg-sky-500", sceneRing: "ring-sky-300",
  },
  emerald: {
    bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700",
    badge: "bg-emerald-600", badgeText: "text-white",
    dot: "bg-emerald-500", ring: "ring-emerald-300",
    insightBg: "bg-emerald-600", insightBorder: "border-emerald-500", insightText: "text-white",
    productBadge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    navBtn: "text-emerald-600 border-emerald-200 hover:bg-emerald-50",
    panelBorder: "border-emerald-200", panelGrad: "from-emerald-50/60 to-white",
    numberBg: "bg-emerald-500", sceneRing: "ring-emerald-300",
  },
  amber: {
    bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700",
    badge: "bg-amber-500", badgeText: "text-white",
    dot: "bg-amber-400", ring: "ring-amber-300",
    insightBg: "bg-amber-500", insightBorder: "border-amber-400", insightText: "text-white",
    productBadge: "bg-amber-100 text-amber-700 border-amber-200",
    navBtn: "text-amber-600 border-amber-200 hover:bg-amber-50",
    panelBorder: "border-amber-200", panelGrad: "from-amber-50/60 to-white",
    numberBg: "bg-amber-500", sceneRing: "ring-amber-300",
  },
};

export default function StoryTimeline({
  data,
  customerLogo,
  customerName,
}: {
  data: StoryData;
  customerLogo?: string;
  customerName?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  const scenes = data.scenes;
  const activeIndex = active !== null ? scenes.findIndex((s) => s.number === active) : -1;
  const scene = active !== null ? scenes.find((s) => s.number === active) : null;

  function navigate(dir: 1 | -1) {
    if (activeIndex === -1) return;
    const next = activeIndex + dir;
    if (next >= 0 && next < scenes.length) setActive(scenes[next].number);
  }

  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") { e.preventDefault(); navigate(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); navigate(-1); }
      if (e.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, activeIndex]);

  useEffect(() => {
    if (active !== null && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active !== null]);

  const c = scene ? C[scene.pilarColor ?? "indigo"] : C.indigo;

  return (
    <div className="mt-8 space-y-8">

      {/* ── Protagonist card ── */}
      {"protagonist" in data && (
        <div className="flex items-start gap-5 rounded-2xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white p-5 shadow-sm">
          {/* Avatar placeholder */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 text-3xl font-black text-white shadow-md select-none">
            C
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">Protagonista</p>
            <p className="text-xl font-black text-gray-950">{data.protagonist}</p>
            <p className="text-sm font-semibold text-indigo-600">{data.protagonistRole}</p>
            <p className="mt-2 text-sm leading-6 text-gray-500 max-w-3xl">{data.intro}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 text-xs font-bold text-white shadow-[0_8px_20px_rgba(6,106,254,0.3)] transition hover:opacity-90 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
              Ver historia completa
            </button>
            <span className="hidden rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 lg:block">3 pilares estratégicos</span>
          </div>
        </div>
      )}

      {/* ── Story rail ── */}
      <div>
        {/* Connector line desktop */}
        <div className="relative hidden md:block">
          <div className="absolute left-0 right-0 top-[52px] h-0.5 bg-gradient-to-r from-indigo-300 via-violet-300 via-sky-300 to-emerald-300" />

          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${scenes.length}, minmax(0, 1fr))` }}
          >
            {scenes.map((s) => {
              const sc = C[s.pilarColor ?? "indigo"];
              const isActive = active === s.number;
              return (
                <button
                  key={s.number}
                  type="button"
                  onClick={() => setActive(isActive ? null : s.number)}
                  className="group flex flex-col items-center gap-0 text-left transition-all focus:outline-none"
                >
                  {/* Number dot */}
                  <div
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2 shadow-md transition-all duration-200 group-hover:scale-110 ${sc.dot} ${sc.ring} ${isActive ? "scale-110 shadow-lg" : ""}`}
                  >
                    <span className="text-xs font-black text-white">{s.number}</span>
                  </div>

                  {/* Scene card thumbnail */}
                  <div
                    className={`mt-3 w-full overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 ${isActive ? `${sc.panelBorder} shadow-lg ring-2 ${sc.sceneRing}` : "border-gray-100 group-hover:border-gray-200 group-hover:shadow-md"}`}
                  >
                    {/* Icon display */}
                    <div className={`flex aspect-video w-full items-center justify-center ${sc.bg} transition-colors duration-200`}>
                      <span className="text-4xl select-none">{s.icon ?? "🎬"}</span>
                    </div>
                    {/* Caption */}
                    <div className="p-2.5">
                      <p className="line-clamp-2 text-[10px] font-bold leading-snug text-gray-900">
                        {s.title}
                      </p>
                      <p className={`mt-0.5 text-[9px] font-semibold truncate ${sc.text}`}>
                        {s.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="space-y-3 md:hidden">
          {/* connector */}
          <div className="absolute left-[26px] h-full w-0.5 bg-gradient-to-b from-indigo-300 via-violet-300 to-emerald-300 opacity-40" />
          {scenes.map((s) => {
            const sc = C[s.pilarColor ?? "indigo"];
            const isActive = active === s.number;
            return (
              <button
                key={s.number}
                type="button"
                onClick={() => setActive(isActive ? null : s.number)}
                className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition-all ${isActive ? `${sc.panelBorder} shadow-md ring-2 ${sc.sceneRing}` : "border-gray-100 hover:border-gray-200 hover:shadow-md"}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${sc.bg}`}>
                    {s.icon ?? "🎬"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{s.title}</p>
                    <p className={`text-xs font-semibold truncate ${sc.text}`}>{s.subtitle}</p>
                  </div>
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${sc.dot}`}>
                    {s.number}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Hint */}
        {active === null && (
          <p className="mt-4 text-center text-xs text-gray-400">
            Selecciona una escena para leer la historia completa
          </p>
        )}
      </div>

      {/* ── Detail panel ── */}
      {scene && (
        <div
          ref={detailRef}
          className={`overflow-hidden rounded-3xl border ${c.panelBorder} bg-gradient-to-br ${c.panelGrad} shadow-xl`}
        >
          {/* Nav bar */}
          <div className={`flex items-center justify-between border-b ${c.panelBorder} bg-white/60 px-6 py-3`}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={activeIndex === 0}
              className={`flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-30 ${c.navBtn}`}
              aria-label="Escena anterior"
            >←</button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-400">
                {activeIndex + 1} / {scenes.length}
              </span>
              <span className={`rounded-full px-3 py-0.5 text-[10px] font-bold ${c.badge} ${c.badgeText}`}>
                {scene.pilar}
              </span>
            </div>

            <button
              type="button"
              onClick={() => navigate(1)}
              disabled={activeIndex === scenes.length - 1}
              className={`flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-30 ${c.navBtn}`}
              aria-label="Escena siguiente"
            >→</button>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">

            {/* ── Two-column row: image + text ── */}
            <div className="flex flex-col gap-8 md:flex-row md:items-start">

              {/* Left: image */}
              <div className="w-full shrink-0 md:w-[380px] lg:w-[440px]">
                <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-xl">
                  <Image
                    src={scene.image}
                    alt={scene.title}
                    width={800}
                    height={500}
                    className="h-auto w-full"
                    sizes="(max-width: 768px) 100vw, 440px"
                    unoptimized
                  />
                  <div className={`absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-white shadow-md ${c.numberBg}`}>
                    {scene.number}
                  </div>
                </div>

                {scene.products && scene.products.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {scene.products.map((p) => (
                      <span key={p} className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${c.productBadge}`}>
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: title + description */}
              <div className="flex-1 min-w-0">

                {/* Escena label */}
                <p className={`text-[11px] font-bold uppercase tracking-widest ${c.text}`}>
                  Escena {scene.number}
                </p>

                {/* Title */}
                <h3 className="mt-1 text-2xl font-black leading-tight text-gray-950 sm:text-3xl">
                  {scene.title}
                </h3>

                {/* Subtitle */}
                <p className="mt-1.5 text-sm font-semibold text-gray-500">
                  {scene.subtitle}
                </p>

                {/* Channel tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {scene.channel.split("·").map((ch) => (
                    <span
                      key={ch.trim()}
                      className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-600"
                    >
                      {ch.trim()}
                    </span>
                  ))}
                </div>

                {/* Description — broken into sentences for readability */}
                <div className={`mt-5 border-l-2 pl-4 ${c.border}`}>
                  {scene.description
                    .split(/(?<=[.!?])\s+/)
                    .filter(Boolean)
                    .map((sentence, i) => (
                      <p
                        key={i}
                        className={`leading-7 text-gray-700 ${i === 0 ? "text-base font-semibold text-gray-800" : "mt-3 text-sm"}`}
                      >
                        {sentence}
                      </p>
                    ))}
                </div>

                {/* Navigation hint */}
                <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
                  <span>← →</span>
                  <span>Navega con teclado o los botones</span>
                </div>
              </div>
            </div>

            {/* ── Insight: full width, below both columns ── */}
            {scene.insight && (
              <div className={`mt-8 rounded-2xl ${c.insightBg} px-6 py-5`}>
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 shrink-0 rounded-lg p-2 ${c.insightText} bg-white/15`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${c.insightText} opacity-70 mb-1.5`}>
                      Insight arquitecto
                    </p>
                    <p className={`text-sm font-semibold leading-6 ${c.insightText}`}>
                      {scene.insight}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Fullscreen player portal ── */}
      {fullscreen && (
        <StoryFullscreenPlayer
          data={data}
          onClose={() => setFullscreen(false)}
          customerLogo={customerLogo}
          customerName={customerName}
        />
      )}
    </div>
  );
}
