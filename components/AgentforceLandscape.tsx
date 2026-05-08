"use client";

import { useState } from "react";
import type { AgentforceLandscapeData } from "../data/customerDemos";

type Props = { data: AgentforceLandscapeData };

function AgentCard({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: "indigo" | "violet" | "sky" | "emerald";
}) {
  const [hovered, setHovered] = useState(false);

  const styles = {
    indigo: {
      wrap: "border-indigo-500/35 bg-indigo-900/50 hover:border-indigo-400/60",
      title: "text-indigo-100",
      dot: "bg-indigo-400",
      item: "text-indigo-200/80",
    },
    violet: {
      wrap: "border-violet-500/35 bg-violet-900/50 hover:border-violet-400/60",
      title: "text-violet-100",
      dot: "bg-violet-400",
      item: "text-violet-200/80",
    },
    sky: {
      wrap: "border-sky-500/30 bg-sky-900/40 hover:border-sky-400/60",
      title: "text-sky-100",
      dot: "bg-sky-400",
      item: "text-sky-200/80",
    },
    emerald: {
      wrap: "border-emerald-500/30 bg-emerald-900/40 hover:border-emerald-400/60",
      title: "text-emerald-100",
      dot: "bg-emerald-400",
      item: "text-emerald-200/80",
    },
  } as const;

  const s = styles[accent];

  return (
    <div
      className={`cursor-default rounded-lg border px-3 py-2.5 transition-all duration-200 ${s.wrap}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className={`text-xs font-bold ${s.title}`}>{title}</p>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          hovered ? "mt-2 max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-1.5">
              <span className={`mt-[5px] h-1 w-1 shrink-0 rounded-full ${s.dot}`} />
              <span className={`text-[11px] leading-4 ${s.item}`}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AgentforceLandscape({ data }: Props) {
  const [svgOpen, setSvgOpen] = useState(false);

  return (
    <div className="mt-8 space-y-3">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 shadow-[0_24px_60px_rgba(30,27,75,0.32)] ring-1 ring-white/10">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Agentforce Landscape
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs font-medium text-slate-500">{data.title}</p>
            {data.svgUrl && (
              <button
                type="button"
                onClick={() => setSvgOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Ver diagrama
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3 p-5">

          {/* Trust Layer badge */}
          <div className="flex justify-end">
            <div className="flex items-center gap-3 rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              <span className="text-xs font-semibold text-indigo-300">Einstein GPT Trust Layer</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-indigo-300/70">Built-in AI &amp; Copilot &amp; Agents</span>
            </div>
          </div>

          {/* Agentforce Agents zone */}
          <div className="rounded-xl border border-violet-500/25 bg-violet-950/40">
            <div className="flex items-center gap-2.5 border-b border-violet-500/15 px-4 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-200">
                Agentforce Agents
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-3">
              {data.agents.map((agent) => (
                <AgentCard
                  key={agent.name}
                  title={agent.name}
                  items={agent.capabilities}
                  accent="violet"
                />
              ))}
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center">
            <svg className="h-5 w-5 text-violet-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div>

          {/* Mid row: Customer 360 + AI Stack + Channels */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

            {/* Customer 360 Apps */}
            <div className="rounded-xl border border-indigo-500/25 bg-indigo-950/50">
              <div className="flex items-center gap-2 border-b border-indigo-500/15 px-4 py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-200">Customer 360</p>
              </div>
              <div className="grid grid-cols-2 gap-2 p-3">
                {data.customer360.map((app) => (
                  <AgentCard key={app.name} title={app.name} items={app.items} accent="indigo" />
                ))}
              </div>
            </div>

            {/* Agentforce AI Stack */}
            <div className="rounded-xl border border-sky-500/25 bg-sky-950/40">
              <div className="flex items-center gap-2 border-b border-sky-500/15 px-4 py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-200">Agentforce AI Stack</p>
              </div>
              <div className="space-y-2 p-3">
                {data.aiStack.map((layer) => (
                  <AgentCard key={layer.name} title={layer.name} items={layer.items} accent="sky" />
                ))}
              </div>
            </div>

            {/* Channels */}
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/40">
              <div className="flex items-center gap-2 border-b border-emerald-500/15 px-4 py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-200">Channels</p>
              </div>
              <div className="space-y-2 p-3">
                {data.channels.map((ch) => (
                  <AgentCard key={ch.name} title={ch.name} items={ch.items} accent="emerald" />
                ))}
              </div>
            </div>
          </div>

          {/* Data Cloud band */}
          <div className="rounded-xl border border-sky-500/25 bg-sky-950/40">
            <div className="flex items-center gap-2.5 border-b border-sky-500/15 px-4 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-200">Data Cloud</p>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
              {data.dataCloud.map((node) => (
                <AgentCard key={node.name} title={node.name} items={node.items} accent="sky" />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* SVG lightbox */}
      {svgOpen && data.svgUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSvgOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-6xl overflow-auto rounded-2xl bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSvgOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
              aria-label="Cerrar"
            >
              ✕
            </button>
            <img src={data.svgUrl} alt={data.title} className="h-auto w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
