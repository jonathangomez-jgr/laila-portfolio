"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const SITE_URL = "https://laila-jgr.com";

export default function SiteQRModal({
  btnLabel,
  modalTitle,
  modalSub,
}: {
  btnLabel: string;
  modalTitle: string;
  modalSub: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="secondary-button px-6 py-3 text-sm font-semibold"
      >
        {btnLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative flex flex-col items-center gap-5 rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
              aria-label="Cerrar"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="overflow-hidden rounded-2xl border border-gray-100 p-3 shadow-sm">
              <QRCodeSVG
                value={SITE_URL}
                size={200}
                bgColor="#ffffff"
                fgColor="#022ac0"
                level="M"
              />
            </div>

            <div className="text-center">
              <p className="text-base font-semibold text-gray-950">
                {modalTitle}
              </p>
              <p className="mt-1 text-sm text-gray-500">{modalSub}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
