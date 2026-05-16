"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { ExecutiveDeck } from "../../data/executiveDecks";
import ExecutiveSlideView from "./ExecutiveSlideView";

type ExecutiveDeckPlayerProps = {
  deck: ExecutiveDeck;
  customerName: string;
  logo?: string;
  backHref: string;
};

export default function ExecutiveDeckPlayer({
  deck,
  customerName,
  logo,
  backHref,
}: ExecutiveDeckPlayerProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const total = deck.slides.length;
  const progress = ((index + 1) / total) * 100;

  const goTo = useCallback(
    (nextIndex: number, navDirection: "next" | "prev") => {
      if (nextIndex < 0 || nextIndex >= total) return;
      setDirection(navDirection);
      setIndex(nextIndex);
    },
    [total],
  );

  const next = useCallback(() => goTo(index + 1, "next"), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, "prev"), [goTo, index]);

  useEffect(() => {
    document.body.classList.add("deck-mode");
    return () => document.body.classList.remove("deck-mode");
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault();
        next();
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        prev();
      }
      if (event.key === "Home") {
        event.preventDefault();
        goTo(0, "prev");
      }
      if (event.key === "End") {
        event.preventDefault();
        goTo(total - 1, "next");
      }
      if (event.key === "f" || event.key === "F") {
        if (!document.fullscreenElement) {
          void document.documentElement.requestFullscreen();
        } else {
          void document.exitFullscreen();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, next, prev, total]);

  const slide = deck.slides[index];

  return (
    <div className="executive-deck">
      <div className="deck-ambient deck-ambient-a" aria-hidden />
      <div className="deck-ambient deck-ambient-b" aria-hidden />

      <header className="deck-topbar">
        <div className="deck-topbar-left">
          <Image
            src="/sfdc-logos/corporate-logo-horiz-allw.svg"
            alt="Salesforce"
            width={110}
            height={36}
            className="h-[1.35rem] w-auto object-contain opacity-80"
          />
          <span className="deck-topbar-divider" />
          {logo ? (
            <Image
              src={logo}
              alt={`${customerName} logo`}
              width={120}
              height={48}
              className="h-8 w-auto object-contain brightness-0 invert opacity-90"
            />
          ) : (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {customerName}
            </span>
          )}
          <span className="deck-topbar-divider" />
          <span className="deck-topbar-meta">{deck.duration}</span>
        </div>

        <div className="deck-topbar-center">
          <span className="deck-topbar-title">{deck.title}</span>
        </div>

        <div className="deck-topbar-right">
          <Link href={backHref} className="deck-exit-link">
            Salir
          </Link>
        </div>
      </header>

      <main className="deck-stage">
        <button
          type="button"
          className="deck-nav-zone deck-nav-zone-left"
          onClick={prev}
          disabled={index === 0}
          aria-label="Diapositiva anterior"
        />
        <button
          type="button"
          className="deck-nav-zone deck-nav-zone-right"
          onClick={next}
          disabled={index === total - 1}
          aria-label="Diapositiva siguiente"
        />

        <article
          key={index}
          className={`deck-slide deck-slide-${direction}`}
          aria-live="polite"
        >
          <ExecutiveSlideView slide={slide} />
        </article>
      </main>

      <footer className="deck-footer">
        <div className="deck-footer-controls">
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            className="deck-control-btn"
            aria-label="Anterior"
          >
            ←
          </button>

          <div className="deck-progress-wrap">
            <div className="deck-progress-track">
              <div
                className="deck-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="deck-dots" role="tablist" aria-label="Diapositivas">
              {deck.slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Ir a diapositiva ${i + 1}`}
                  onClick={() => goTo(i, i > index ? "next" : "prev")}
                  className={`deck-dot ${i === index ? "deck-dot-active" : ""}`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            disabled={index === total - 1}
            className="deck-control-btn"
            aria-label="Siguiente"
          >
            →
          </button>

          <span className="deck-counter">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <p className="deck-hint">
          ← → Espacio · F pantalla completa
        </p>
      </footer>
    </div>
  );
}
