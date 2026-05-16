"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

export default function DeckQRCode() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  return (
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
  );
}
