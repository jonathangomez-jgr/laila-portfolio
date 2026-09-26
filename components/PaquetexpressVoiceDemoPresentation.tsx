"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type {
  VoiceDemoIcon,
  VoiceDemoScene,
} from "@/data/paquetexpress/voiceDemoScenes";

type Props = {
  scenes: VoiceDemoScene[];
};

/* Salesforce electric blue gradient (mismo que otras presentaciones) */
const BG_GRADIENT = `
  radial-gradient(ellipse at 18% 12%, rgba(0, 179, 255, 0.32) 0%, transparent 48%),
  radial-gradient(ellipse at 82% 88%, rgba(115, 3, 148, 0.18) 0%, transparent 50%),
  linear-gradient(150deg, #066afe 0%, #022ac0 42%, #001e5b 100%)
`;

const ACCENT = "#22B4FF";
const ACCENT_SOFT = "rgba(34, 180, 255, 0.22)";
const TEXT = "#FFFFFF";
const MUTED = "rgba(232, 240, 255, 0.78)";
const DIM = "rgba(232, 240, 255, 0.48)";

const ANIM_CSS = `
@keyframes pxvd-fade-slide { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
@keyframes pxvd-pulse { 0%,100% { box-shadow:0 0 0 0 rgba(34,180,255,0.55) } 50% { box-shadow:0 0 0 16px rgba(34,180,255,0) } }
@keyframes pxvd-astro-float { 0%,100% { transform:translateY(0) rotate(-4deg) } 50% { transform:translateY(-14px) rotate(-1deg) } }
.pxvd-detail-anim { animation: pxvd-fade-slide 0.42s cubic-bezier(.22,1,.36,1) both }
.pxvd-dot-active { animation: pxvd-pulse 2.2s ease-out infinite }
.pxvd-astro { animation: pxvd-astro-float 6s ease-in-out infinite }
`;

function SceneIcon({ name, size = 22 }: { name: VoiceDemoIcon; size?: number }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "chat":
      return (
        <svg {...props}>
          <path d="M21 12a8 8 0 1 1-3.4-6.5L21 4l-1 3.6A8 8 0 0 1 21 12Z" />
          <path d="M8 11h.01M12 11h.01M16 11h.01" />
        </svg>
      );
    case "person":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );
    case "doc":
      return (
        <svg {...props}>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
          <path d="M14 3v6h6M8 13h8M8 17h6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      );
    case "barcode":
      return (
        <svg {...props}>
          <path d="M4 6v12M8 6v12M11 6v12M14 6v12M17 6v12M20 6v12" />
        </svg>
      );
    case "hangup":
      return (
        <svg {...props}>
          <path d="M3 11.5C7.5 7.5 16.5 7.5 21 11.5" />
          <path d="M5 13.5 7 15a1.5 1.5 0 0 0 2-.2l1.2-1.7a1 1 0 0 1 1-.4l3.6.6a1 1 0 0 1 .8.7l.7 2.1a1.5 1.5 0 0 1-.6 1.7L15 19" transform="rotate(20 12 14)" />
        </svg>
      );
  }
}

export default function PaquetexpressVoiceDemoPresentation({
  scenes,
}: Props) {
  // idx = -1 → cover slide; 0..total-1 → escenas
  const [idx, setIdx] = useState(-1);
  const total = scenes.length;

  const next = useCallback(() => {
    setIdx((i) => (i < total - 1 ? i + 1 : i));
  }, [total]);
  const prev = useCallback(() => {
    setIdx((i) => (i > -1 ? i - 1 : i));
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.key === "ArrowRight" ||
        e.key === "ArrowDown" ||
        e.key === " " ||
        e.key === "PageDown"
      ) {
        e.preventDefault();
        next();
      } else if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowUp" ||
        e.key === "PageUp"
      ) {
        e.preventDefault();
        prev();
      } else if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
          void document.documentElement.requestFullscreen();
        } else {
          void document.exitFullscreen();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const isCover = idx === -1;
  const scene = isCover ? scenes[0] : scenes[idx];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      <div
        className="fixed inset-0 flex flex-col overflow-hidden"
        style={{ background: BG_GRADIENT, color: TEXT }}
        role="application"
        aria-label="Guión de la llamada del agente de voz Paquetexpress"
      >
        {isCover ? (
          <CoverSlide />
        ) : (
          <>
        {/* ── Top bar ── */}
        <header className="relative z-10 flex shrink-0 items-center justify-between px-10 py-5">
          {/* Logos juntos: Paquetexpress + separador + Salesforce (ambos en blanco) */}
          <div className="flex items-center gap-6">
            <Image
              src="/Customers/Paquetexpress/logo-white.png"
              alt="Paquetexpress"
              width={190}
              height={40}
              style={{ height: 36, width: "auto" }}
              priority
            />
            <div
              className="h-8 w-px"
              style={{ backgroundColor: "rgba(255,255,255,0.32)" }}
            />
            <Image
              src="/sfdc-logos/corporate-logo-horiz-allw.png"
              alt="Salesforce"
              width={170}
              height={34}
              style={{ height: 32, width: "auto" }}
              priority
            />
          </div>

          {/* Product chip — Salesforce Agentforce Voice */}
          <div
            className="flex items-center gap-3 rounded-full px-5 py-2.5"
            style={{
              border: "1px solid rgba(255,255,255,0.32)",
              backgroundColor: "rgba(0,20,60,0.28)",
              backdropFilter: "blur(6px)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={ACCENT}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="9" y="3" width="6" height="12" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
            </svg>
            <span
              className="text-[13px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "#FFFFFF" }}
            >
              Salesforce · Agentforce Voice
            </span>
          </div>
        </header>

        {/* ── Body · 50/50 split ── */}
        <div className="relative z-10 flex min-h-0 flex-1 items-stretch px-10 pb-10 pt-2">
          {/* Left half · Phone alineado a los logos + Timeline centrado en espacio libre */}
          <div className="relative flex w-1/2 items-center">
            <div className="flex shrink-0 items-center justify-start">
              <PhoneFrame />
            </div>
            <div className="flex flex-1 items-center justify-center">
              <Timeline
                scenes={scenes}
                activeIdx={idx}
                onSelect={(i) => setIdx(i)}
              />
            </div>
          </div>

          {/* Right half · Detail card */}
          <div className="relative flex w-1/2 items-center pl-8">
            <DetailCard key={idx} scene={scene} />
          </div>
        </div>

        {/* ── Astro flotante en la esquina inferior derecha ── */}
        <div
          className="pxvd-astro pointer-events-none absolute z-20"
          style={{
            right: 20,
            bottom: 20,
            width: 240,
            height: 240,
            filter:
              "drop-shadow(0 26px 52px rgba(0,10,40,0.6)) drop-shadow(0 0 32px rgba(34,180,255,0.25))",
            opacity: 0.82,
          }}
          aria-hidden="true"
        >
          <Image
            src="/sfdc-brand/Carachters/Agent Astro/Agent Astro 3D 4 L.png"
            alt=""
            width={480}
            height={480}
            className="h-full w-full object-contain"
            unoptimized
          />
        </div>

        {/* ── Progress bar ── */}
        <div
          className="relative z-10 h-1 w-full shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
        >
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${((idx + 1) / total) * 100}%`,
              background: `linear-gradient(90deg, ${ACCENT}, #90D0FE)`,
            }}
          />
        </div>
          </>
        )}

      </div>
    </>
  );
}

function CoverSlide() {
  return (
    <div className="pxvd-detail-anim relative z-10 flex h-full w-full flex-col items-center justify-center px-10">
      <div className="flex items-center gap-8">
        <Image
          src="/Customers/Paquetexpress/logo-white.png"
          alt="Paquetexpress"
          width={340}
          height={72}
          style={{ height: 68, width: "auto" }}
          priority
        />
        <div
          className="h-14 w-px"
          style={{ backgroundColor: "rgba(255,255,255,0.36)" }}
        />
        <Image
          src="/sfdc-logos/corporate-logo-horiz-allw.png"
          alt="Salesforce"
          width={320}
          height={64}
          style={{ height: 60, width: "auto" }}
          priority
        />
      </div>

      <h1
        className="mt-16 text-center font-semibold leading-[1.02] tracking-tight"
        style={{
          color: "#FFFFFF",
          fontSize: "clamp(4rem, 8vw, 7.5rem)",
          letterSpacing: "-0.025em",
        }}
      >
        Recolección a domicilio
      </h1>

      <p
        className="mt-8 text-center font-semibold uppercase tracking-[0.32em]"
        style={{
          color: "#B8E4FF",
          fontSize: "clamp(1rem, 1.3vw, 1.5rem)",
        }}
      >
        Salesforce · Agentforce Voice
      </p>
    </div>
  );
}

function PhoneFrame() {
  // iPhone-shaped bezel — ancho alineado al grupo de logos del header (~400px).
  // Interior vacío para overlay OBS de la grabación real.
  const phoneWidth = 400;
  const phoneHeight = 825;
  return (
    <div
      className="relative"
      style={{ width: phoneWidth, height: phoneHeight, maxHeight: "84vh" }}
      aria-hidden="true"
    >
      {/* Outer bezel — grueso tipo case, radius exterior tipo iPhone,
          radius interior menor para que coincida con las esquinas del video overlay. */}
      <div
        className="absolute inset-0 rounded-[52px]"
        style={{
          background: "linear-gradient(180deg, #0a1a48 0%, #030a22 100%)",
          boxShadow:
            "0 50px 140px rgba(0,10,40,0.65), 0 0 0 2px rgba(180,210,255,0.18), inset 0 0 0 1px rgba(255,255,255,0.06)",
          padding: 22,
        }}
      >
        {/* Inner cavity (empty — OBS overlay fills this).
            Fondo replica el degradado gris de la pantalla de llamada de iOS
            para que la unión con el video overlay pase desapercibida. */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[28px]"
          style={{
            background:
              "linear-gradient(180deg, #2A2A2C 0%, #333335 22%, #3C3C3E 52%, #363638 78%, #2B2B2D 100%)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          {/* Notch */}
          <div
            className="absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full"
            style={{
              width: 118,
              height: 28,
              backgroundColor: "#020203",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.05)",
            }}
          />
          {/* Watermark hint */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="text-center text-[12px] font-semibold uppercase tracking-[0.36em]"
              style={{ color: "rgba(255,255,255,0.14)" }}
            >
              Overlay
              <br />
              OBS
            </div>
          </div>
        </div>
      </div>
      {/* Side buttons */}
      <div
        className="absolute -left-[3px] top-[140px] rounded-r-sm"
        style={{ width: 3, height: 52, backgroundColor: "#0a1631" }}
      />
      <div
        className="absolute -left-[3px] top-[214px] rounded-r-sm"
        style={{ width: 3, height: 76, backgroundColor: "#0a1631" }}
      />
      <div
        className="absolute -left-[3px] top-[306px] rounded-r-sm"
        style={{ width: 3, height: 76, backgroundColor: "#0a1631" }}
      />
      <div
        className="absolute -right-[3px] top-[214px] rounded-l-sm"
        style={{ width: 3, height: 118, backgroundColor: "#0a1631" }}
      />
    </div>
  );
}

function Timeline({
  scenes,
  activeIdx,
  onSelect,
}: {
  scenes: VoiceDemoScene[];
  activeIdx: number;
  onSelect: (i: number) => void;
}) {
  return (
    <ol className="relative flex flex-col gap-1.5">
      {scenes.map((s, i) => {
        const isActive = i === activeIdx;
        const isPast = i < activeIdx;
        return (
          <li key={s.title} className="relative">
            <button
              type="button"
              onClick={() => onSelect(i)}
              className="group flex w-full items-center gap-4 rounded-xl px-2 py-2 text-left transition"
              style={{
                backgroundColor: isActive ? ACCENT_SOFT : "transparent",
              }}
            >
              <div className="relative flex flex-col items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                    isActive ? "pxvd-dot-active" : ""
                  }`}
                  style={{
                    backgroundColor: isActive
                      ? ACCENT
                      : isPast
                      ? "rgba(34,180,255,0.42)"
                      : "rgba(255,255,255,0.08)",
                    color: isActive ? "#001E5B" : TEXT,
                    border: `1px solid ${
                      isActive
                        ? "rgba(34,180,255,0.78)"
                        : "rgba(232,240,255,0.24)"
                    }`,
                  }}
                >
                  <SceneIcon name={s.icon} size={22} />
                </div>
                {i < scenes.length - 1 && (
                  <div
                    className="mt-1 w-px flex-1"
                    style={{
                      minHeight: 28,
                      borderLeft: `1.5px dashed ${
                        i < activeIdx
                          ? "rgba(34,180,255,0.60)"
                          : "rgba(232,240,255,0.22)"
                      }`,
                    }}
                  />
                )}
              </div>
              <span
                className={`text-[17px] leading-tight transition ${
                  isActive ? "font-semibold" : "font-medium"
                }`}
                style={{
                  color: isActive
                    ? TEXT
                    : isPast
                    ? MUTED
                    : "rgba(232,240,255,0.62)",
                }}
              >
                {s.title}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function DetailCard({ scene }: { scene: VoiceDemoScene }) {
  return (
    <div
      className="pxvd-detail-anim relative w-full overflow-hidden rounded-[32px] p-10 md:p-14"
      style={{
        background:
          "linear-gradient(160deg, rgba(20,50,120,0.72), rgba(3,20,68,0.6))",
        border: "1px solid rgba(150,200,255,0.32)",
        boxShadow:
          "0 40px 100px rgba(0,10,40,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
        backdropFilter: "blur(14px)",
      }}
    >
      {/* Corner glow */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
        style={{
          background: `radial-gradient(circle, ${ACCENT}55, transparent 70%)`,
        }}
      />

      <div className="relative flex items-start gap-6">
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: "rgba(34,180,255,0.18)",
            border: "1px solid rgba(34,180,255,0.42)",
            color: ACCENT,
          }}
        >
          <SceneIcon name={scene.icon} size={40} />
        </div>
        <div className="min-w-0 pt-1">
          <h2
            className="font-semibold leading-[1.02] tracking-tight"
            style={{
              color: TEXT,
              fontSize: "clamp(3rem, 5vw, 4.8rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {scene.title}
          </h2>
          <p
            className="mt-4 font-medium leading-snug"
            style={{
              color: "rgba(232,240,255,0.92)",
              fontSize: "clamp(1.4rem, 1.8vw, 2rem)",
            }}
          >
            {scene.subtitle}
          </p>
        </div>
      </div>

      <p
        className="relative mt-10 leading-[1.55]"
        style={{
          color: "rgba(236,244,255,0.94)",
          fontSize: "clamp(1.15rem, 1.35vw, 1.55rem)",
        }}
      >
        {scene.description}
      </p>

      {scene.tags.length > 0 && (
        <div className="relative mt-10 flex flex-wrap gap-3">
          {scene.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-5 py-2.5 font-semibold"
              style={{
                backgroundColor: "rgba(34,180,255,0.14)",
                border: "1px solid rgba(34,180,255,0.42)",
                color: "#DCEFFF",
                fontSize: "clamp(0.95rem, 1.05vw, 1.15rem)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
