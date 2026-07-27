"use client";

import { useEffect, useState } from "react";
import type { ScreenshotPlaceholder as Placeholder } from "@/data/agentDeliverables";

type ScreenshotPlaceholderProps = {
  placeholder: Placeholder;
  index: number;
};

const aspectClass: Record<NonNullable<Placeholder["aspect"]>, string> = {
  wide: "aspect-[16/9]",
  tall: "aspect-[3/4]",
  square: "aspect-square",
};

export default function ScreenshotPlaceholder({
  placeholder,
  index,
}: ScreenshotPlaceholderProps) {
  const aspect = aspectClass[placeholder.aspect ?? "wide"];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasImage = Boolean(placeholder.imageUrl);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <>
      <figure
        className={`group flex flex-col overflow-hidden rounded-2xl border shadow-sm transition ${
          hasImage
            ? "border-gray-200 bg-white hover:shadow-lg"
            : "border-dashed border-indigo-200/70 bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/60 hover:shadow-md"
        }`}
      >
        {hasImage ? (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className={`relative ${aspect} w-full overflow-hidden bg-slate-100`}
            aria-label={`Abrir captura ampliada · ${placeholder.caption}`}
          >
            <img
              src={placeholder.imageUrl}
              alt={placeholder.caption}
              className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-gray-700 opacity-0 shadow-md transition group-hover:opacity-100">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7"
                />
              </svg>
            </span>
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
              #{String(index + 1).padStart(2, "0")}
            </span>
          </button>
        ) : (
          <div
            className={`relative flex ${aspect} w-full items-center justify-center bg-white/50`}
          >
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-40">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-indigo-100/50" />
              ))}
            </div>
            <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100/80 text-indigo-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5A2.25 2.25 0 015.25 5.25h1.5l1.05-1.575A1.5 1.5 0 019.048 3h5.904a1.5 1.5 0 011.248.675L17.25 5.25h1.5A2.25 2.25 0 0121 7.5v9.75A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25V7.5z"
                  />
                  <circle cx="12" cy="12" r="3.75" />
                </svg>
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-500">
                Screenshot #{String(index + 1).padStart(2, "0")}
              </p>
              <p className="text-xs leading-5 text-gray-500">
                Espacio para captura del sandbox
              </p>
            </div>
          </div>
        )}

        <figcaption
          className={`px-4 py-3 ${
            hasImage
              ? "border-t border-gray-100 bg-white"
              : "border-t border-indigo-100/60 bg-white/70"
          }`}
        >
          <p className="text-sm font-semibold leading-snug text-gray-950">
            {placeholder.caption}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium leading-4 text-gray-500">
            <svg
              className="h-3 w-3 shrink-0 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="font-mono text-[11px] tracking-tight text-gray-500">
              {placeholder.navigationPath}
            </span>
          </p>
        </figcaption>
      </figure>

      {lightboxOpen && placeholder.imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={placeholder.caption}
        >
          <div
            className="relative flex max-h-full w-full max-w-6xl flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                  Screenshot #{String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white sm:text-base">
                  {placeholder.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Cerrar"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl bg-slate-950 shadow-2xl ring-1 ring-white/10">
              <img
                src={placeholder.imageUrl}
                alt={placeholder.caption}
                className="max-h-[calc(100vh-9rem)] w-full object-contain"
              />
            </div>
            <p className="flex items-center justify-center gap-2 text-[11px] font-mono text-white/60">
              {placeholder.navigationPath}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
