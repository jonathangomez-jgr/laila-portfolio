"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { StoryData } from "../data/customerDemos";

export default function StoryTimeline({ data }: { data: StoryData }) {
  const [active, setActive] = useState<number | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const scenes = data.scenes;
  const activeIndex = active !== null ? scenes.findIndex((s) => s.number === active) : -1;

  function navigate(dir: 1 | -1) {
    if (activeIndex === -1) return;
    const next = activeIndex + dir;
    if (next >= 0 && next < scenes.length) {
      setActive(scenes[next].number);
    }
  }

  useEffect(() => {
    if (active === null) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") { e.preventDefault(); navigate(1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); navigate(-1); }
      if (e.key === "Escape")     { setActive(null); }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, activeIndex]);

  // Scroll detail panel into view when it first opens
  useEffect(() => {
    if (active !== null && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [active !== null]);

  const scene = active !== null ? scenes.find((s) => s.number === active) : null;

  return (
    <div className="mt-8">
      {/* connector line behind cards */}
      <div className="relative">
        {/* vertical stem on mobile, hidden on md+ */}
        <div className="absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-indigo-300 via-violet-300 to-sky-300 md:hidden" />

        {/* horizontal stem on md+ */}
        <div className="absolute left-0 right-0 top-[52px] hidden h-0.5 bg-gradient-to-r from-indigo-300 via-violet-300 to-sky-300 md:block" />

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {scenes.map((s) => {
            const isActive = active === s.number;
            const col = (s.number - 1) % 3;
            const dotColors = ["bg-indigo-500", "bg-violet-500", "bg-sky-500"] as const;
            const ringColors = ["ring-indigo-200", "ring-violet-200", "ring-sky-200"] as const;

            return (
              <button
                key={s.number}
                type="button"
                onClick={() => setActive(isActive ? null : s.number)}
                className="group relative flex flex-col items-center gap-0 text-left transition-all focus:outline-none md:flex-col"
              >
                {/* dot */}
                <div
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2 ${ringColors[col]} ${dotColors[col]} shadow-md transition-transform group-hover:scale-110 ${isActive ? "scale-110 shadow-lg" : ""}`}
                >
                  <span className="text-xs font-bold text-white">{s.number}</span>
                </div>

                {/* card */}
                <div
                  className={`mt-3 w-full overflow-hidden rounded-2xl border bg-white shadow-sm transition-all ${isActive ? "border-indigo-300 shadow-md ring-1 ring-indigo-200" : "border-gray-100 group-hover:border-indigo-200 group-hover:shadow-md"}`}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-50">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 16vw"
                    />
                  </div>

                  <div className="p-3">
                    <p className="line-clamp-2 text-xs font-bold leading-snug text-gray-900">
                      {s.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-tight text-indigo-500">
                      {s.channel}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* expanded detail panel */}
      {scene && (
        <div
          ref={detailRef}
          className="mt-6 overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white shadow-lg"
        >
          {/* nav bar */}
          <div className="flex items-center justify-between border-b border-indigo-100 px-6 py-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={activeIndex === 0}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-200 bg-white text-indigo-600 shadow-sm transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Escena anterior"
            >
              ←
            </button>

            <span className="text-xs font-semibold text-gray-400">
              {activeIndex + 1} / {scenes.length}
            </span>

            <button
              type="button"
              onClick={() => navigate(1)}
              disabled={activeIndex === scenes.length - 1}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-200 bg-white text-indigo-600 shadow-sm transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Escena siguiente"
            >
              →
            </button>
          </div>

          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-start">
            <div className="relative w-full shrink-0 overflow-hidden rounded-2xl md:w-96">
              <Image
                src={scene.image}
                alt={scene.title}
                width={800}
                height={600}
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 384px"
              />
            </div>

            <div className="flex-1">
              <p className="eyebrow mb-2">Escena {scene.number}</p>
              <h3 className="text-xl font-bold text-gray-950">{scene.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {scene.channel.split(" / ").map((ch) => (
                  <span
                    key={ch}
                    className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700"
                  >
                    {ch}
                  </span>
                ))}
              </div>
              {scene.description && (
                <p className="mt-4 text-sm leading-7 text-gray-600">
                  {scene.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
