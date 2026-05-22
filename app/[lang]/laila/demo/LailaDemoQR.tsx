"use client";

import { QRCodeSVG } from "qrcode.react";

const WA_URL = "http://wa.me/5714430988?text=Hola%20Laila";

export default function LailaDemoQR({
  qrEyebrow,
  qrTitle,
  qrSub,
  qrBtn,
}: {
  qrEyebrow: string;
  qrTitle: string;
  qrSub: string;
  qrBtn: string;
}) {
  return (
    <div className="flex w-full flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:w-auto md:min-w-[300px]">
      <p className="eyebrow mb-5">{qrEyebrow}</p>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <QRCodeSVG
          value={WA_URL}
          size={200}
          bgColor="#ffffff"
          fgColor="#111827"
          level="M"
          imageSettings={{
            src: "/laila-favicon.png",
            height: 40,
            width: 40,
            excavate: true,
          }}
        />
      </div>

      <p className="mt-5 text-center text-base font-semibold text-gray-900">
        {qrTitle}
      </p>
      <p className="mt-1 text-center text-sm text-gray-500">{qrSub}</p>

      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1ebe5d]"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.531 5.856L0 24l6.305-1.508A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.667-.523-5.184-1.43l-.371-.22-3.742.895.928-3.648-.242-.381A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
        {qrBtn}
      </a>
    </div>
  );
}
