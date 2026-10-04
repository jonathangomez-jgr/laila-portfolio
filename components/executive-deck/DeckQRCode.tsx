"use client";

import { QRCodeSVG } from "qrcode.react";
import { useCallback, useState, useSyncExternalStore } from "react";

type Feedback = "idle" | "copied" | "shared" | "error";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("popstate", callback);
  window.addEventListener("hashchange", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("hashchange", callback);
  };
}

function getSnapshot() {
  return typeof window === "undefined" ? "" : window.location.href;
}

function getServerSnapshot() {
  return "";
}

export default function DeckQRCode() {
  const url = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [feedback, setFeedback] = useState<Feedback>("idle");

  const flash = useCallback((state: Feedback) => {
    setFeedback(state);
    window.setTimeout(() => setFeedback("idle"), 2200);
  }, []);

  const handleShare = useCallback(async () => {
    if (!url) return;
    const shareData = {
      title: document.title || "Insight",
      text: "Síguelo en tu móvil",
      url,
    };

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        flash("shared");
        return;
      } catch (err) {
        if ((err as DOMException | undefined)?.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      flash("copied");
    } catch {
      flash("error");
    }
  }, [url, flash]);

  if (!url) return null;

  const label =
    feedback === "copied"
      ? "Link copiado"
      : feedback === "shared"
        ? "Compartido"
        : feedback === "error"
          ? "No se pudo copiar"
          : "Share me";

  return (
    <>
      <div className="deck-qr-wrapper">
        <QRCodeSVG
          value={url}
          size={148}
          bgColor="transparent"
          fgColor="rgba(255,255,255,0.85)"
          level="M"
        />
        <p className="deck-qr-label">Scan me</p>
      </div>

      <button
        type="button"
        onClick={handleShare}
        className={`deck-share-button${feedback !== "idle" ? ` deck-share-button-${feedback}` : ""}`}
        aria-label="Compartir enlace de la presentación"
      >
        <span className="deck-share-button-icon" aria-hidden>
          {feedback === "copied" || feedback === "shared" ? "✓" : "⇪"}
        </span>
        <span className="deck-share-button-label">{label}</span>
      </button>
    </>
  );
}
