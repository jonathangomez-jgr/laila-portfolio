"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { StoryData } from "../data/customerDemos";

/* ─── Salesforce Brand Palette 2026 ─── */
const SF = {
  eb15: "#001E5B", eb30: "#022AC0", eb50: "#066AFE",
  cb68: "#00B3FF", cb80: "#90D0FE", cb90: "#cfe9fe",
  teal60: "#06A59A", teal80: "#04E1CB",
  violet30: "#730394", violet65: "#D17DFE",
};

/* Cloud Blue 90 — fixed background for all slides */
const BG = SF.cb90;

type ColorKey = "indigo" | "violet" | "sky" | "emerald" | "amber";

/* Per-pillar: only accent + insight text used now */
const P: Record<ColorKey, { accent: string; insightBg: string; insightBorder: string; insightText: string; insightLabel: string }> = {
  indigo:  { accent: SF.eb50,    insightBg: `${SF.eb50}12`,    insightBorder: `${SF.eb50}30`,    insightText: SF.eb15,   insightLabel: SF.eb50    },
  violet:  { accent: SF.violet65, insightBg: `${SF.violet65}12`, insightBorder: `${SF.violet65}30`, insightText: SF.violet30, insightLabel: SF.violet65 },
  sky:     { accent: SF.cb68,    insightBg: `${SF.cb68}15`,    insightBorder: `${SF.cb68}35`,    insightText: "#003A5C", insightLabel: SF.cb68    },
  emerald: { accent: SF.teal60,  insightBg: `${SF.teal60}12`,  insightBorder: `${SF.teal60}30`,  insightText: "#01312F", insightLabel: SF.teal60  },
  amber:   { accent: "#E4A201",  insightBg: "#E4A20112",       insightBorder: "#E4A20130",       insightText: "#3A2800", insightLabel: "#E4A201"  },
};

const ANIM_CSS = `
@keyframes sf-story-r { from { opacity:0; transform:translateX(44px) } to { opacity:1; transform:translateX(0) } }
@keyframes sf-story-l { from { opacity:0; transform:translateX(-44px) } to { opacity:1; transform:translateX(0) } }
.sf-story-next { animation: sf-story-r 0.38s cubic-bezier(.22,1,.36,1) both }
.sf-story-prev { animation: sf-story-l 0.38s cubic-bezier(.22,1,.36,1) both }
`;

type Props = { data: StoryData; onClose: () => void; customerLogo?: string; customerName?: string };

export default function StoryFullscreenPlayer({ data, onClose, customerLogo, customerName }: Props) {
  const [idx, setIdx] = useState(-1);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const scrollRef = useRef<HTMLDivElement>(null);
  const total = data.scenes.length;

  const goTo = useCallback(
    (next: number, d: "next" | "prev") => {
      if (next < -1 || next >= total) return;
      setDir(d);
      setIdx(next);
    },
    [total],
  );

  const next = useCallback(() => goTo(idx + 1, "next"), [goTo, idx]);
  const prev = useCallback(() => goTo(idx - 1, "prev"), [goTo, idx]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [idx]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
      if (e.key === "Escape") onClose();
      if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) void document.documentElement.requestFullscreen();
        else void document.exitFullscreen();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  const isIntro = idx === -1;
  const scene = isIntro ? null : data.scenes[idx];
  const c = scene ? P[scene.pilarColor ?? "indigo"] : P.indigo;
  const progress = isIntro ? 0 : ((idx + 1) / total) * 100;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{ backgroundColor: BG }}
        role="dialog"
        aria-modal="true"
        aria-label={`Historia: ${data.protagonist ?? ""}`}
      >
        {/* ── Top bar ── */}
        <header
          className="relative z-10 flex shrink-0 items-center justify-between px-5 py-2.5 sm:px-7"
          style={{
            borderBottom: isIntro ? "1px solid rgba(255,255,255,0.08)" : `1px solid ${SF.eb50}1A`,
            backgroundColor: isIntro ? "rgba(0,0,0,0.22)" : `${SF.eb15}06`,
          }}
        >
          {/* Left: SF logo + divider + customer logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/sfdc-logos/corporate-logo-horiz-allw.svg"
              alt="Salesforce"
              width={100}
              height={32}
              className="h-5 w-auto object-contain"
              style={{ filter: isIntro ? undefined : "brightness(0) saturate(100%) invert(11%) sepia(64%) saturate(2000%) hue-rotate(210deg) brightness(80%)" }}
            />
            {(customerLogo || customerName) && (
              <>
                <span
                  className="h-4 w-px"
                  style={{ backgroundColor: isIntro ? "rgba(255,255,255,0.22)" : `${SF.eb50}35` }}
                />
                {customerLogo ? (
                  <Image
                    src={customerLogo}
                    alt={customerName ?? "Customer"}
                    width={100}
                    height={32}
                    className="h-6 w-auto object-contain"
                    unoptimized
                  />
                ) : (
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.18em]"
                    style={{ color: isIntro ? "rgba(255,255,255,0.5)" : SF.eb30 }}
                  >
                    {customerName}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Center: scene title */}
          <div className="flex items-center gap-4">
            {!isIntro && scene && (
              <span
                className="hidden text-[11px] font-semibold sm:block"
                style={{ color: SF.eb30 }}
              >
                {scene.title}
              </span>
            )}
          </div>

          {/* Right: close */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition focus:outline-none focus-visible:ring-2"
            style={{
              color: isIntro ? "rgba(255,255,255,0.45)" : SF.eb15,
              opacity: isIntro ? 1 : 0.45,
            }}
            aria-label="Cerrar historia"
          >
            ✕
          </button>
        </header>

        {/* ── Main stage ── */}
        <main className="relative z-10 flex flex-1 overflow-hidden">

          {isIntro ? (
            /* ── Intro — Electric Blue background ── */
            <div
              key="intro"
              className={`sf-story-${dir} flex w-full flex-col items-center justify-center px-6 py-8 text-center`}
              style={{ backgroundColor: SF.eb15 }}
            >
              {/* ambient blobs — only on intro */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                <div className="absolute -top-1/3 -right-1/4 h-[80vh] w-[80vh] rounded-full blur-[130px]"
                  style={{ backgroundColor: SF.eb50, opacity: 0.12 }} />
                <div className="absolute -bottom-1/3 -left-1/4 h-[60vh] w-[60vh] rounded-full blur-[110px]"
                  style={{ backgroundColor: SF.violet30, opacity: 0.10 }} />
              </div>

              <div className="relative flex h-20 w-20 select-none items-center justify-center rounded-3xl text-4xl font-black text-white shadow-xl"
                style={{ background: `linear-gradient(135deg, ${SF.eb50} 0%, ${SF.violet30} 100%)` }}>
                {(data.protagonist ?? "C")[0]}
              </div>

              <p className="relative mt-6 text-[11px] font-bold uppercase tracking-[0.25em]"
                style={{ color: SF.cb80 }}>
                Protagonista
              </p>
              <h2 className="relative mt-2 font-black leading-tight text-white"
                style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}>
                {data.protagonist}
              </h2>
              <p className="relative mt-1.5 text-sm font-semibold" style={{ color: SF.cb68 }}>
                {data.protagonistRole}
              </p>
              <p className="relative mt-5 max-w-xl text-sm leading-7 text-white/50">
                {data.intro}
              </p>

              <div className="relative mt-9 flex flex-wrap items-center justify-center gap-8">
                {[
                  { v: `${total}`, l: "escenas" },
                  { v: "3", l: "pilares" },
                  { v: "12m", l: "horizonte" },
                ].map((s) => (
                  <div key={s.l} className="flex flex-col items-center gap-1">
                    <span className="text-3xl font-black text-white">{s.v}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/35">{s.l}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                className="relative mt-9 flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                style={{
                  background: `linear-gradient(135deg, ${SF.eb50} 0%, ${SF.cb68} 100%)`,
                  boxShadow: `0 12px 32px ${SF.eb50}55`,
                }}
              >
                Comenzar historia
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>

              <p className="relative mt-4 text-[10px] text-white/22">← → navegar · Esc cerrar</p>
            </div>

          ) : (
            /* ── Scene slide ── */
            <div
              key={idx}
              className={`sf-story-${dir} mx-auto flex w-full max-w-[90%] flex-col gap-5 overflow-y-auto p-5 lg:flex-row lg:items-stretch lg:gap-12 lg:overflow-hidden lg:p-6`}
            >
              {/* LEFT: 4/12 — image with card radius */}
              <div className="shrink-0 lg:w-1/3">
                <div
                  className="relative h-52 w-full overflow-hidden sm:h-64 lg:h-full"
                  style={{
                    borderRadius: "24px",
                    backgroundColor: `${SF.eb15}07`,
                    border: `1px solid ${SF.eb50}15`,
                  }}
                >
                  <Image
                    src={scene!.image}
                    alt={scene!.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    unoptimized
                    priority
                  />

                  {/* Scene number */}
                  <div
                    className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-xs font-black text-white shadow-md"
                    style={{ backgroundColor: c.accent }}
                  >
                    {scene!.number}
                  </div>

                  {/* Pilar badge — mobile only */}
                  <div className="absolute bottom-3 left-3 lg:hidden">
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm"
                      style={{
                        backgroundColor: `${c.accent}22`,
                        color: c.accent,
                        border: `1px solid ${c.accent}45`,
                      }}
                    >
                      {scene!.pilar}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT: 8/12 — scrollable text */}
              <div
                ref={scrollRef}
                className="flex flex-1 flex-col overflow-y-auto lg:pr-2"
              >
                {/* Pilar badge — desktop */}
                <div className="mb-4 hidden lg:block">
                  <span
                    className="rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{
                      backgroundColor: `${c.accent}18`,
                      color: c.accent,
                      border: `1px solid ${c.accent}40`,
                    }}
                  >
                    {scene!.pilar}
                  </span>
                </div>

                {/* Title block */}
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: SF.eb15, opacity: 0.35 }}
                  >
                    Escena {scene!.number} · {String(idx + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
                  </p>
                  <h2
                    className="mt-1.5 font-black leading-tight"
                    style={{ color: SF.eb15, fontSize: "clamp(1.35rem, 2.8vw, 2rem)" }}
                  >
                    {scene!.title}
                  </h2>
                  <p
                    className="mt-1.5 text-sm font-semibold"
                    style={{ color: SF.eb30, opacity: 0.7 }}
                  >
                    {scene!.subtitle}
                  </p>
                </div>

                {/* Channel tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {scene!.channel.split("·").map((ch) => (
                    <span
                      key={ch.trim()}
                      className="rounded-full px-3 py-1 text-[11px] font-semibold"
                      style={{
                        backgroundColor: `${SF.eb50}0F`,
                        color: SF.eb30,
                        border: `1px solid ${SF.eb50}20`,
                      }}
                    >
                      {ch.trim()}
                    </span>
                  ))}
                </div>

                {/* Description sentences */}
                <div
                  className="mt-5 border-l-2 pl-5"
                  style={{ borderColor: `${c.accent}55` }}
                >
                  {scene!.description
                    .split(/(?<=[.!?])\s+/)
                    .filter(Boolean)
                    .map((sentence, i) => (
                      <p
                        key={i}
                        className={i === 0 ? "text-[15px] font-semibold leading-7" : "mt-3.5 text-[13.5px] leading-7"}
                        style={{
                          color: i === 0 ? SF.eb15 : SF.eb15,
                          opacity: i === 0 ? 0.92 : 0.62,
                        }}
                      >
                        {sentence}
                      </p>
                    ))}
                </div>

                {/* Product tags */}
                {scene!.products && scene!.products.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {scene!.products.map((prod) => (
                      <span
                        key={prod}
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                        style={{
                          backgroundColor: `${SF.eb15}08`,
                          color: SF.eb30,
                          border: `1px solid ${SF.eb50}25`,
                        }}
                      >
                        {prod}
                      </span>
                    ))}
                  </div>
                )}

                {/* Insight — accent color preserved */}
                {scene!.insight && (
                  <div
                    className="mt-7 rounded-2xl p-5"
                    style={{
                      backgroundColor: c.insightBg,
                      border: `1px solid ${c.insightBorder}`,
                    }}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${c.accent}20` }}
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke={c.accent} strokeWidth={2} aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <p
                          className="mb-1.5 text-[9px] font-bold uppercase tracking-widest"
                          style={{ color: c.insightLabel }}
                        >
                          Insight arquitecto
                        </p>
                        <p
                          className="text-sm font-semibold leading-6"
                          style={{ color: c.insightText }}
                        >
                          {scene!.insight}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="h-6 shrink-0" />
              </div>
            </div>
          )}
        </main>

        {/* ── Footer ── */}
        <footer
          className="relative z-10 shrink-0 px-4 py-3 sm:px-6"
          style={{
            borderTop: `1px solid ${SF.eb50}1A`,
            backgroundColor: `${SF.eb15}06`,
          }}
        >
          <div className="flex items-center gap-3 sm:gap-4">

            <button
              type="button"
              onClick={prev}
              disabled={isIntro}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-20 hover:bg-black/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              style={{ borderColor: `${SF.eb50}30`, color: SF.eb15 }}
              aria-label="Escena anterior"
            >←</button>

            <div className="flex flex-1 flex-col items-center gap-2.5">
              <div
                className="h-[3px] w-full overflow-hidden rounded-full"
                style={{ backgroundColor: `${SF.eb15}15` }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: isIntro ? SF.eb50 : c.accent,
                  }}
                />
              </div>

              <div className="flex items-center gap-2" role="tablist" aria-label="Escenas">
                {data.scenes.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={idx === i}
                    aria-label={`Ir a escena ${i + 1}`}
                    onClick={() => goTo(i, i > idx ? "next" : "prev")}
                    className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-400"
                    style={{
                      width: idx === i ? "22px" : "6px",
                      height: "6px",
                      backgroundColor: idx === i
                        ? c.accent
                        : `${SF.eb15}28`,
                    }}
                  />
                ))}
              </div>
            </div>

            <span
              className="hidden w-14 shrink-0 text-right text-xs font-semibold tabular-nums sm:block"
              style={{ color: SF.eb15, opacity: 0.3 }}
            >
              {isIntro ? "intro" : `${String(idx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
            </span>

            <button
              type="button"
              onClick={next}
              disabled={idx === total - 1}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-20 hover:bg-black/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              style={{ borderColor: `${SF.eb50}30`, color: SF.eb15 }}
              aria-label="Escena siguiente"
            >→</button>
          </div>

          <p
            className="mt-1.5 text-center text-[10px]"
            style={{ color: SF.eb15, opacity: 0.22 }}
          >
            ← → Navegar · Esc Cerrar · F Pantalla completa
          </p>
        </footer>
      </div>
    </>
  );
}
