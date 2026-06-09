"use client";

import { useEffect, useState } from "react";

export type BefraLandscape = {
  id: "asis" | "tobe";
  eyebrow: string;
  title: string;
  summary: string;
  svgUrl: string;
  pdfUrl?: string;
  zones: BefraZone[];
  highlights: { label: string; body: string; tone: "blue" | "amber" | "violet" | "teal" | "red" }[];
};

export type BefraZone = {
  label: string;
  tone: "channels" | "platform" | "data" | "integration" | "external" | "agentforce";
  nodes: string[];
};

export type BefraArchitectureData = {
  asIs: BefraLandscape;
  toBe: BefraLandscape;
};

const ZONE_STYLES: Record<
  BefraZone["tone"],
  { card: string; chip: string; label: string; dot: string }
> = {
  channels: {
    card: "border-sky-200 bg-sky-50/70",
    chip: "bg-white/80 text-sky-700 border-sky-200",
    label: "text-sky-700",
    dot: "bg-sky-500",
  },
  platform: {
    card: "border-indigo-200 bg-indigo-50/70",
    chip: "bg-white/80 text-indigo-700 border-indigo-200",
    label: "text-indigo-700",
    dot: "bg-indigo-500",
  },
  data: {
    card: "border-violet-200 bg-violet-50/70",
    chip: "bg-white/80 text-violet-700 border-violet-200",
    label: "text-violet-700",
    dot: "bg-violet-500",
  },
  integration: {
    card: "border-amber-200 bg-amber-50/70",
    chip: "bg-white/80 text-amber-800 border-amber-200",
    label: "text-amber-800",
    dot: "bg-amber-500",
  },
  external: {
    card: "border-slate-200 bg-slate-50/70",
    chip: "bg-white/80 text-slate-700 border-slate-200",
    label: "text-slate-700",
    dot: "bg-slate-500",
  },
  agentforce: {
    card: "border-emerald-200 bg-emerald-50/70",
    chip: "bg-white/80 text-emerald-700 border-emerald-200",
    label: "text-emerald-700",
    dot: "bg-emerald-500",
  },
};

const HIGHLIGHT_STYLES: Record<
  NonNullable<BefraLandscape["highlights"][number]["tone"]>,
  string
> = {
  blue: "border-indigo-200 bg-indigo-50 text-indigo-900",
  amber: "border-amber-200 bg-amber-50 text-amber-900",
  violet: "border-violet-200 bg-violet-50 text-violet-900",
  teal: "border-teal-200 bg-teal-50 text-teal-900",
  red: "border-rose-200 bg-rose-50 text-rose-900",
};

function LandscapeBlock({
  data,
  index,
  onOpen,
}: {
  data: BefraLandscape;
  index: number;
  onOpen: (svg: string, title: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-indigo-500">{data.eyebrow}</p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-950 sm:text-3xl">
            {`${index + 1}. ${data.title}`}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onOpen(data.svgUrl, data.title)}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8V5a2 2 0 012-2h3M3 16v3a2 2 0 002 2h3M21 8V5a2 2 0 00-2-2h-3M21 16v3a2 2 0 01-2 2h-3"
              />
            </svg>
            Ver en grande
          </button>
          {data.pdfUrl && (
            <a
              href={data.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
            >
              PDF
            </a>
          )}
        </div>
      </div>

      <p className="max-w-4xl text-base leading-7 text-gray-600">{data.summary}</p>

      <button
        type="button"
        onClick={() => onOpen(data.svgUrl, data.title)}
        className="group relative block w-full overflow-hidden rounded-3xl border border-gray-200 bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.08)] transition hover:border-indigo-200"
      >
        <img
          src={data.svgUrl}
          alt={data.title}
          className="h-auto w-full"
          loading="lazy"
        />
        <span className="pointer-events-none absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gray-950/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Ampliar
        </span>
      </button>

      {data.highlights.length > 0 && (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {data.highlights.map((h) => (
            <div
              key={h.label}
              className={`rounded-2xl border p-4 ${HIGHLIGHT_STYLES[h.tone]}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
                {h.label}
              </p>
              <p className="mt-2 text-sm leading-6">{h.body}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {data.zones.map((zone) => {
          const s = ZONE_STYLES[zone.tone];
          return (
            <div key={zone.label} className={`rounded-2xl border p-4 ${s.card}`}>
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                <p className={`text-xs font-bold uppercase tracking-[0.18em] ${s.label}`}>
                  {zone.label}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {zone.nodes.map((node) => (
                  <span
                    key={node}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${s.chip}`}
                  >
                    {node}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BefraArchitecture({ data }: { data: BefraArchitectureData }) {
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const handleOpen = (src: string, title: string) => setLightbox({ src, title });

  return (
    <div className="mt-10 space-y-12">
      <LandscapeBlock data={data.asIs} index={0} onOpen={handleOpen} />

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
        </div>
        <div className="relative flex justify-center">
          <span className="rounded-full border border-indigo-200 bg-white px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-600 shadow-sm">
            Evolución
          </span>
        </div>
      </div>

      <LandscapeBlock data={data.toBe} index={1} onOpen={handleOpen} />

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-7xl overflow-auto rounded-2xl bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-gray-700">{lightbox.title}</p>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>
            <img src={lightbox.src} alt={lightbox.title} className="h-auto w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
