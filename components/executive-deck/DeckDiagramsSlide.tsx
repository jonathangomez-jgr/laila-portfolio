"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { SlideAccent } from "../../data/executiveDecks";

type Diagram = {
  caption: string;
  src: string;
  alt?: string;
  accent?: SlideAccent;
};

type Props = {
  diagrams: Diagram[];
};

const accentRing: Record<SlideAccent, string> = {
  indigo: "ring-indigo-200/60",
  violet: "ring-violet-200/60",
  sky: "ring-sky-200/60",
  emerald: "ring-emerald-200/60",
};

const accentBadge: Record<SlideAccent, string> = {
  indigo: "bg-indigo-50 text-indigo-700",
  violet: "bg-violet-50 text-violet-700",
  sky: "bg-sky-50 text-sky-700",
  emerald: "bg-emerald-50 text-emerald-700",
};

export default function DeckDiagramsSlide({ diagrams }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const isOpen = lightboxIndex !== null;
  const count = diagrams.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback((i: number) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % count)),
    [count],
  );
  const goPrev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + count) % count)),
    [count],
  );

  useEffect(() => {
    if (!isOpen) return;

    function handler(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        close();
        return;
      }
      if (
        event.key === "ArrowRight" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        goNext();
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        event.stopImmediatePropagation();
        goPrev();
        return;
      }
    }

    window.addEventListener("keydown", handler, { capture: true });
    return () =>
      window.removeEventListener(
        "keydown",
        handler,
        { capture: true } as EventListenerOptions,
      );
  }, [isOpen, close, goNext, goPrev]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const gridCols =
    count === 1 ? "grid-cols-1" : count === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  const activeDiagram = lightboxIndex !== null ? diagrams[lightboxIndex] : null;

  return (
    <>
      <div className={`mt-8 grid gap-6 ${gridCols}`}>
        {diagrams.map((d, i) => {
          const accent = d.accent ?? "indigo";
          return (
            <figure
              key={d.caption}
              className={`group relative rounded-2xl bg-white/70 ring-1 ${accentRing[accent]} p-4 shadow-sm backdrop-blur transition hover:shadow-lg`}
            >
              <button
                type="button"
                onClick={() => open(i)}
                className="absolute inset-0 z-10 h-full w-full cursor-zoom-in rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                aria-label={`Ampliar diagrama: ${d.caption}`}
              />
              <figcaption
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${accentBadge[accent]}`}
              >
                {d.caption}
              </figcaption>
              <img
                src={d.src}
                alt={d.alt ?? d.caption}
                className="mt-3 block h-auto w-full transition group-hover:scale-[1.01]"
                style={{ maxHeight: "58vh", objectFit: "contain" }}
              />
              <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-slate-900/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 transition group-hover:opacity-100">
                Clic para ampliar
              </span>
            </figure>
          );
        })}
      </div>

      {isOpen && activeDiagram && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada: ${activeDiagram.caption}`}
          className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md"
          style={{ backgroundColor: "#cfe9fe" }}
          onClick={close}
        >
          <div className="pointer-events-none absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-4">
            <div className="pointer-events-auto flex items-center gap-3">
              <span className="rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-900">
                {activeDiagram.caption}
              </span>
              {count > 1 && (
                <span className="text-xs text-slate-700">
                  {(lightboxIndex ?? 0) + 1} / {count}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Cerrar"
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/10 text-2xl leading-none text-slate-900 transition hover:bg-slate-900/20"
            >
              ×
            </button>
          </div>

          {count > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Diagrama anterior"
              className="absolute left-6 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/10 text-2xl text-slate-900 transition hover:bg-slate-900/20"
            >
              ←
            </button>
          )}

          <img
            src={activeDiagram.src}
            alt={activeDiagram.alt ?? activeDiagram.caption}
            className="block object-contain"
            style={{ maxHeight: "88vh", maxWidth: "94vw" }}
            onClick={(e) => e.stopPropagation()}
          />

          {count > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Diagrama siguiente"
              className="absolute right-6 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/10 text-2xl text-slate-900 transition hover:bg-slate-900/20"
            >
              →
            </button>
          )}

          <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-xs text-slate-700/70">
            ← → para navegar · Esc para cerrar
          </p>
        </div>,
        document.body,
      )}
    </>
  );
}
