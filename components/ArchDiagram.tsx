"use client";

import { useState } from "react";
import type { ArchData, ArchNode } from "../data/customerDemos";

type ArchDiagramProps = {
  data: ArchData;
};

function NodeCard({ node, color }: { node: ArchNode; color: "slate" | "indigo" | "sky" | "amber" }) {
  const [hovered, setHovered] = useState(false);

  const styles = {
    slate: {
      card: "border-slate-600/40 bg-slate-800/70 hover:border-slate-400/60 hover:bg-slate-700/80",
      title: "text-slate-200",
      dot: "bg-slate-400",
      item: "text-slate-300",
    },
    indigo: {
      card: "border-indigo-500/30 bg-indigo-900/50 hover:border-indigo-400/60 hover:bg-indigo-800/60",
      title: "text-indigo-100",
      dot: "bg-indigo-400",
      item: "text-indigo-200/80",
    },
    sky: {
      card: "border-sky-500/30 bg-sky-900/40 hover:border-sky-400/60 hover:bg-sky-800/50",
      title: "text-sky-100",
      dot: "bg-sky-400",
      item: "text-sky-200/80",
    },
    amber: {
      card: "border-amber-500/30 bg-amber-900/40 hover:border-amber-400/60 hover:bg-amber-800/50",
      title: "text-amber-100",
      dot: "bg-amber-400",
      item: "text-amber-200/80",
    },
  } as const;

  const s = styles[color];

  return (
    <div
      className={`relative cursor-default rounded-lg border px-3 py-2.5 transition-all duration-200 ${s.card}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className={`text-xs font-bold ${s.title}`}>{node.name}</p>

      {/* items — visible solo en hover */}
      <div
        className={`overflow-hidden transition-all duration-200 ${
          hovered ? "mt-2 max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-0.5">
          {node.items.map((item) => (
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

export default function ArchDiagram({ data }: ArchDiagramProps) {
  const [svgOpen, setSvgOpen] = useState(false);

  const externalZone = data.zones.find((z) => z.id === "external");
  const sfZone = data.zones.find((z) => z.id === "salesforce");
  const zeroCopyZone = data.zones.find((z) => z.id === "zerocopy");

  // Split SF nodes: top row (products) and Data Cloud (separate band)
  const sfProducts = sfZone?.nodes.filter((n) => n.name !== "Data Cloud") ?? [];
  const dataCloudNode = sfZone?.nodes.find((n) => n.name === "Data Cloud");

  return (
    <div className="mt-8 space-y-3">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 shadow-[0_24px_60px_rgba(30,27,75,0.32)] ring-1 ring-white/10">

        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              System Landscape
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs font-medium text-slate-500">{data.title}</p>
            {data.svgUrl && (
              <button
                type="button"
                onClick={() => setSvgOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 transition hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-indigo-300"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Ver diagrama
              </button>
            )}
          </div>
        </div>

        <div className="p-5 space-y-3">

          {/* ── Einstein Trust Layer (top-right badge, fiel al original) ── */}
          <div className="flex justify-end">
            <div className="flex items-center gap-4 rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                <span className="text-xs font-semibold text-indigo-300">Einstein Trust Layer</span>
              </div>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-indigo-300/70">Built-in AI &amp; Copilot &amp; Agents</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-indigo-300/70">Core Metadata Platform</span>
            </div>
          </div>

          {/* ── Customer 360 block ── */}
          <div className="rounded-xl border border-indigo-500/25 bg-indigo-950/50">
            {/* C360 header */}
            <div className="flex items-center gap-2.5 border-b border-indigo-500/15 px-4 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-200">Customer 360</p>
            </div>

            <div className="p-3 space-y-3">
              {/* Products row */}
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
                {sfProducts.map((node) => (
                  <NodeCard key={node.name} node={node} color="indigo" />
                ))}
              </div>

              {/* Data Cloud band */}
              {dataCloudNode && (
                <div className="rounded-lg border border-sky-500/25 bg-sky-950/40">
                  <div className="flex items-center gap-2 border-b border-sky-500/15 px-3 py-2">
                    <span className="h-1 w-1 rounded-full bg-sky-400" />
                    <p className="text-xs font-bold text-sky-200">Data Cloud</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3">
                    {/* Split Data Cloud items into sub-groups matching the original layout */}
                    {[
                      { name: "Unificación", items: dataCloudNode.items.slice(0, 3) },
                      { name: "Insights", items: dataCloudNode.items.slice(3, 5) },
                      { name: "AI Ready Data", items: dataCloudNode.items.slice(5) },
                    ].map((sub) => (
                      <NodeCard key={sub.name} node={sub} color="sky" />
                    ))}
                  </div>
                  {/* Zero Copy strip */}
                  <div className="mx-3 mb-3 rounded border border-sky-400/15 bg-sky-900/20 px-3 py-1 text-center">
                    <span className="text-[11px] font-semibold text-sky-400/70">Zero Copy</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── MuleSoft row ── */}
          <div className="flex flex-col items-center gap-1">
            <svg className="h-5 w-5 text-amber-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <div className="w-full rounded-xl border border-amber-500/30 bg-amber-950/50 px-5 py-3">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-amber-400/30 bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    Integration
                  </span>
                  <p className="text-sm font-bold text-amber-200">{data.bridge.label}</p>
                  <span className="text-amber-600/50">·</span>
                  <p className="text-xs text-amber-400/60">{data.bridge.sublabel}</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {data.bridge.items.map((item) => (
                    <span key={item} className="text-[11px] text-amber-300/70">{item}</span>
                  ))}
                </div>
              </div>
            </div>
            <svg className="h-5 w-5 text-amber-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div>

          {/* ── External Systems + Zero Copy (bottom row) ── */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_320px]">

            {/* External Systems */}
            {externalZone && (
              <div className="rounded-xl border border-slate-600/35 bg-slate-800/40">
                <div className="flex items-center gap-2.5 border-b border-slate-600/25 px-4 py-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-300">External Systems</p>
                </div>
                <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
                  {externalZone.nodes.map((node) => (
                    <NodeCard key={node.name} node={node} color="slate" />
                  ))}
                </div>
              </div>
            )}

            {/* Zero Copy Partner Network */}
            {zeroCopyZone && (
              <div className="rounded-xl border border-sky-500/25 bg-sky-950/40">
                <div className="flex items-center gap-2.5 border-b border-sky-500/15 px-4 py-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-200">Zero Copy Partner Network</p>
                </div>
                <div className="p-3">
                  {zeroCopyZone.nodes.map((node) => (
                    <NodeCard key={node.name} node={node} color="sky" />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── SVG lightbox ── */}
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
