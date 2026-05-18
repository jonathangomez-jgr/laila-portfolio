"use client";

import { useState } from "react";
import Image from "next/image";

const accounts = [
  "Coomeva", "Compensar", "Tuya", "Colmena", "Coto",
  "Alkosto", "Corona", "Éxito", "Colsubsidio", "Comfama",
  "Atlético Nacional", "BBVA", "Sura", "Telecom",
];

export default function LailaHero() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative mb-12 h-64 w-full overflow-visible rounded-3xl sm:h-80 md:h-96">
      {/* Background image */}
      <Image
        src="/laila-back.jpg"
        alt="Laila hero"
        fill
        className="rounded-3xl object-cover"
        priority
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-950/85 via-gray-950/60 to-gray-950/30" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-7 sm:p-10">
        {/* Top: vacío para empujar contenido abajo */}
        <div />

        {/* Bottom: title + stat */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <img
              src="/laila-logo-full.png"
              alt="Laila logo"
              className="mb-3 h-10 w-auto object-contain sm:h-14"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <h1 className="max-w-lg text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              Built once.
              <br />
              <span className="bg-gradient-to-r from-indigo-300 to-sky-300 bg-clip-text text-transparent">
                Delivered everywhere.
              </span>
            </h1>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
              All About Laila
            </p>
          </div>

          {/* 20+ stat with hover tooltip */}
          <div className="relative shrink-0 self-end sm:self-auto">
            <div
              className="group cursor-default"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className="flex flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-sm transition-colors group-hover:border-indigo-300/40 group-hover:bg-indigo-500/20">
                <span className="text-6xl font-bold tabular-nums text-white sm:text-7xl">
                  20<span className="text-indigo-300">+</span>
                </span>
                <span className="mt-1 text-center text-xs font-semibold uppercase tracking-wider text-white/60">
                  Cuentas con Laila
                </span>
              </div>
            </div>

            {/* Tooltip */}
            <div
              className={`absolute bottom-full right-0 z-50 mb-3 w-56 rounded-2xl border border-white/10 bg-gray-950/95 p-4 shadow-2xl backdrop-blur-md transition-all duration-200 ${
                hovered ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
              }`}
            >
              <p className="mb-2.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                Cuentas donde ha participado
              </p>
              <div className="flex flex-wrap gap-1.5">
                {accounts.map((name) => (
                  <span
                    key={name}
                    className="rounded-full bg-white/8 px-2.5 py-1 text-xs font-medium text-white/80"
                  >
                    {name}
                  </span>
                ))}
                <span className="rounded-full bg-indigo-500/20 px-2.5 py-1 text-xs font-semibold text-indigo-300">
                  y más...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
