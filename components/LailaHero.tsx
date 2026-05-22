"use client";

import { useState } from "react";
import Image from "next/image";

const accounts = [
  "Coomeva", "Compensar", "Tuya", "Colmena", "Coto",
  "Alkosto", "Corona", "Éxito", "Colsubsidio", "Comfama",
  "Atlético Nacional", "BBVA", "Sura", "Telecom",
];

export default function LailaHero({
  accountsEyebrow,
  closeHint,
  accountsMore,
  accountsLabel,
}: {
  accountsEyebrow: string;
  closeHint: string;
  accountsMore: string;
  accountsLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mb-12 w-full overflow-hidden rounded-3xl" style={{ minHeight: "300px" }}>
      {/* Background */}
      <Image
        src="/laila-back.jpg"
        alt="Laila hero"
        fill
        className="object-cover"
        priority
      />

      {/* Base overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/88 via-gray-950/65 to-gray-950/35" />

      {/* Accounts overlay */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-5 bg-gray-950/88 p-8 backdrop-blur-sm transition-all duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-indigo-400">
          {accountsEyebrow}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {accounts.map((name) => (
            <span
              key={name}
              className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-sm font-medium text-white/85"
            >
              {name}
            </span>
          ))}
          <span className="rounded-full border border-indigo-400/30 bg-indigo-500/20 px-3 py-1.5 text-sm font-semibold text-indigo-300">
            {accountsMore}
          </span>
        </div>
        <p className="text-[11px] text-white/35">{closeHint}</p>
      </div>

      {/* Main content */}
      <div
        className="relative flex min-h-[300px] flex-col justify-between p-6 sm:min-h-[380px] sm:p-10 md:min-h-[420px]"
        onClick={() => open && setOpen(false)}
      >
        {/* Spacer top */}
        <div />

        {/* Bottom row: title left, stat right */}
        <div className="flex items-end justify-between gap-4">
          {/* Left: logo + title */}
          <div className="min-w-0">
            <img
              src="/laila-logo-full.png"
              alt="Laila logo"
              className="mb-3 h-9 w-auto object-contain sm:h-14"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              Built once.
              <br />
              <span className="bg-gradient-to-r from-indigo-300 to-sky-300 bg-clip-text text-transparent">
                Delivered everywhere.
              </span>
            </h1>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50 sm:text-xs">
              All About Laila
            </p>
          </div>

          {/* Right: 20+ stat */}
          <button
            type="button"
            className="group shrink-0 cursor-pointer rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm transition-colors hover:border-indigo-300/40 hover:bg-indigo-500/20 sm:px-6 sm:py-4"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
          >
            <span className="block text-center text-5xl font-bold tabular-nums text-white sm:text-6xl md:text-7xl">
              20<span className="text-indigo-300">+</span>
            </span>
            <span className="mt-1 block text-center text-[10px] font-semibold uppercase tracking-wider text-white/60 sm:text-xs">
              {accountsLabel}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
