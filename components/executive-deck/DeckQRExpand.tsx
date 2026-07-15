"use client";

import { useCallback, useEffect, useState } from "react";

type Props = {
  qrSrc: string;
  targetUrl: string;
  caption?: string;
  overlayTitle?: string;
  overlaySubtitle?: string;
};

export default function DeckQRExpand({
  qrSrc,
  targetUrl,
  caption = "Escanea para responder",
  overlayTitle = "Escanea para abrir la plantilla",
  overlaySubtitle = "Google Docs · Conociendo a nuestro agente",
}: Props) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey, true);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="deck-questionnaire-qr deck-questionnaire-qr-btn"
        onClick={() => setOpen(true)}
        aria-label="Ampliar código QR para escanear"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrSrc} alt="" aria-hidden />
        <span>
          <strong>{caption}</strong>
          <em>Toca para ampliar</em>
        </span>
      </button>

      {open && (
        <div
          className="deck-qr-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Código QR ampliado"
          onClick={close}
        >
          <div
            className="deck-qr-overlay-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="deck-qr-overlay-close"
              onClick={close}
              aria-label="Cerrar"
            >
              ×
            </button>
            <p className="deck-qr-overlay-eyebrow">Escanea con tu teléfono</p>
            <h3 className="deck-qr-overlay-title">{overlayTitle}</h3>
            {overlaySubtitle && (
              <p className="deck-qr-overlay-subtitle">{overlaySubtitle}</p>
            )}
            <div className="deck-qr-overlay-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrSrc} alt="QR — plantilla en Google Docs" />
            </div>
            <a
              className="deck-qr-overlay-link"
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              O abrir en este dispositivo →
            </a>
            <p className="deck-qr-overlay-hint">Presiona Esc o clic fuera para cerrar</p>
          </div>
        </div>
      )}
    </>
  );
}
