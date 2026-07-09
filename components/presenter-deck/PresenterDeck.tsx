"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PresenterSlide } from "@/data/presenterNotes";

type Props = {
  deckUrl: string;
  backHref: string;
  slides: PresenterSlide[];
  insightTitle: string;
};

export default function PresenterDeck({
  deckUrl,
  backHref,
  slides,
  insightTitle,
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [notesOpen, setNotesOpen] = useState(true);
  const total = slides.length;
  const current = slides[currentIndex - 1];

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      const d = e.data;
      if (d && d.type === "slide" && typeof d.index === "number") {
        setCurrentIndex(d.index);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const post = useCallback((message: Record<string, unknown>) => {
    const w = iframeRef.current?.contentWindow;
    if (!w) return;
    w.postMessage(message, "*");
  }, []);

  const go = useCallback(
    (index: number) => {
      if (index < 1 || index > total) return;
      post({ type: "go", index });
      setCurrentIndex(index);
    },
    [post, total],
  );

  return (
    <main className="fixed inset-0 flex flex-col bg-[#001e5b] text-white">
      {/* Top toolbar */}
      <header className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#001e5b]/95 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-4">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-white/70 transition hover:text-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Volver al insight
          </Link>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-white/50 md:inline">
            Modo presentador · {insightTitle}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={deckUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-white/15 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/80 transition hover:border-white/40 hover:text-white md:inline-flex"
          >
            Abrir en ventana nueva
          </a>
          <button
            type="button"
            onClick={() => setNotesOpen((v) => !v)}
            className="rounded-full border border-[#00b3ff]/40 bg-[#00b3ff]/10 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#00b3ff] transition hover:bg-[#00b3ff]/20"
          >
            {notesOpen ? "Ocultar notas" : "Mostrar notas"}
          </button>
        </div>
      </header>

      {/* Body: deck + notes */}
      <div className="flex flex-1 min-h-0 flex-col lg:flex-row">
        <div className="relative flex-1 min-h-0 min-w-0 bg-[#001e5b]">
          <iframe
            ref={iframeRef}
            src={deckUrl}
            title="Deck TED · Retail IA México"
            className="h-full w-full border-0"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>

        {notesOpen && (
          <aside className="flex w-full flex-col border-t border-white/10 bg-[#0a1533] lg:w-[420px] lg:border-l lg:border-t-0">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="mono text-[11px] font-semibold tracking-[0.14em] text-[#00b3ff]">
                  {String(currentIndex).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span className="text-[10.5px] uppercase tracking-[0.18em] text-white/60">
                  {current?.timing}
                </span>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] ${
                  current?.role === "Inspiration"
                    ? "bg-[#00b3ff]/15 text-[#00b3ff]"
                    : "bg-white/10 text-white/70"
                }`}
              >
                {current?.role}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <h2
                className="font-serif text-2xl leading-tight tracking-tight text-white"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                {current?.title}
              </h2>
              <p className="mt-3 rounded-lg border border-white/10 bg-white/[.04] px-4 py-3 text-[13px] leading-relaxed text-white/85">
                <span className="font-semibold text-white">Objetivo · </span>
                {current?.goal}
              </p>

              <div className="mt-5">
                <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#00b3ff]">
                  Guion sugerido
                </h3>
                <div
                  className="mt-2 whitespace-pre-line rounded-lg border-l-2 border-white/40 bg-white/[.03] px-4 py-3 text-[13.5px] leading-relaxed text-white/85"
                  dangerouslySetInnerHTML={{ __html: current?.script || "" }}
                />
              </div>

              {current?.tips && current.tips.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#ffdd00]">
                    Tips & señales
                  </h3>
                  <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-white/80">
                    {current.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00b3ff]" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Nav footer */}
            <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-black/20 px-4 py-3">
              <button
                type="button"
                onClick={() => go(currentIndex - 1)}
                disabled={currentIndex <= 1}
                className="flex-1 rounded-full border border-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/85 transition hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={() => go(currentIndex + 1)}
                disabled={currentIndex >= total}
                className="flex-1 rounded-full bg-[#00b3ff] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#001e5b] transition hover:bg-[#66d1ff] disabled:cursor-not-allowed disabled:opacity-30"
              >
                Siguiente →
              </button>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
