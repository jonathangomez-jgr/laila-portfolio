"use client";

import { useState } from "react";
import type { ArchData, ArchNode } from "../data/customerDemos";

type ArchDiagramProps = {
  data: ArchData;
};

function NodeCard({ node, color }: { node: ArchNode; color: "eb" | "cb" | "teal" | "amber" }) {
  const [hovered, setHovered] = useState(false);

  const styles = {
    eb:    { card: "border-[#066afe]/30 bg-[#022ac0]/60 hover:border-[#066afe]/70 hover:bg-[#022ac0]/80", title: "text-white",       dot: "bg-[#066afe]", item: "text-[#90d0fe]/80" },
    cb:    { card: "border-[#00b3ff]/30 bg-[#013a6b]/50 hover:border-[#00b3ff]/70 hover:bg-[#013a6b]/70", title: "text-[#cfe9fe]",   dot: "bg-[#00b3ff]", item: "text-[#90d0fe]/80" },
    teal:  { card: "border-[#06a59a]/30 bg-[#013a3a]/50 hover:border-[#06a59a]/70 hover:bg-[#013a3a]/70", title: "text-[#a0f0eb]",   dot: "bg-[#06a59a]", item: "text-[#a0f0eb]/70" },
    amber: { card: "border-[#f59e0b]/30 bg-[#3a2000]/50 hover:border-[#f59e0b]/70 hover:bg-[#3a2000]/70", title: "text-[#fde68a]",   dot: "bg-[#f59e0b]", item: "text-[#fde68a]/70" },
  } as const;

  const s = styles[color];

  return (
    <div
      className={`relative cursor-default rounded-lg border px-3 py-2.5 transition-all duration-200 ${s.card}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className={`text-xs font-bold ${s.title}`}>{node.name}</p>
      <div className={`overflow-hidden transition-all duration-200 ${hovered ? "mt-2 max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
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

  const sfProducts = sfZone?.nodes.filter((n) => n.name !== "Data Cloud") ?? [];
  const dataCloudNode = sfZone?.nodes.find((n) => n.name === "Data Cloud");

  return (
    <div className="mt-8 space-y-3">
      <div className="overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(2,42,192,0.28)] ring-1 ring-white/10"
           style={{ background: "linear-gradient(150deg,#066afe 0%,#022ac0 45%,#001e5b 100%)" }}>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00b3ff]" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#90d0fe]">
              System Landscape
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs font-medium text-[#90d0fe]/60">{data.title}</p>
            {data.svgUrl && (
              <button
                type="button"
                onClick={() => setSvgOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-[#90d0fe] transition hover:border-[#00b3ff]/40 hover:bg-[#00b3ff]/10 hover:text-white"
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

          {/* Einstein Trust Layer */}
          <div className="flex justify-end">
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#00b3ff]/20 bg-[#066afe]/20 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00b3ff]" />
                <span className="text-xs font-semibold text-[#cfe9fe]">Einstein Trust Layer</span>
              </div>
              <span className="text-white/20">·</span>
              <span className="text-xs text-[#90d0fe]/70">Built-in AI &amp; Copilot &amp; Agents</span>
              <span className="text-white/20">·</span>
              <span className="text-xs text-[#90d0fe]/70">Core Metadata Platform</span>
            </div>
          </div>

          {/* Customer 360 */}
          <div className="rounded-xl border border-[#066afe]/25 bg-[#022ac0]/40">
            <div className="flex items-center gap-2.5 border-b border-[#066afe]/20 px-4 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#066afe]" />
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#90d0fe]">Customer 360</p>
            </div>

            <div className="p-3 space-y-3">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
                {sfProducts.map((node) => (
                  <NodeCard key={node.name} node={node} color="eb" />
                ))}
              </div>

              {/* Data Cloud band */}
              {dataCloudNode && (
                <div className="rounded-lg border border-[#00b3ff]/25 bg-[#013a6b]/40">
                  <div className="flex items-center gap-2 border-b border-[#00b3ff]/15 px-3 py-2">
                    <span className="h-1 w-1 rounded-full bg-[#00b3ff]" />
                    <p className="text-xs font-bold text-[#cfe9fe]">Data Cloud</p>
                    <span className="ml-auto text-[10px] text-[#90d0fe]/60">Zero Copy</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3">
                    {[
                      { name: "Unificación",   items: dataCloudNode.items.slice(0, 3) },
                      { name: "Insights",      items: dataCloudNode.items.slice(3, 5) },
                      { name: "AI Ready Data", items: dataCloudNode.items.slice(5) },
                    ].map((sub) => (
                      <NodeCard key={sub.name} node={sub} color="cb" />
                    ))}
                  </div>
                  <div className="mx-3 mb-3 rounded border border-[#00b3ff]/15 bg-[#013a6b]/30 px-3 py-1 text-center">
                    <span className="text-[11px] font-semibold text-[#90d0fe]/70">Zero Copy</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* MuleSoft row */}
          <div className="flex flex-col items-center gap-1">
            <svg className="h-5 w-5 text-[#f59e0b]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <div className="w-full rounded-xl border border-[#f59e0b]/30 bg-[#3a2000]/50 px-5 py-3">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#fde68a]">
                    Integration
                  </span>
                  <p className="text-sm font-bold text-[#fde68a]">{data.bridge.label}</p>
                  <span className="text-white/20">·</span>
                  <p className="text-xs text-[#fde68a]/60">{data.bridge.sublabel}</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {data.bridge.items.map((item) => (
                    <span key={item} className="text-[11px] text-[#fde68a]/70">{item}</span>
                  ))}
                </div>
              </div>
            </div>
            <svg className="h-5 w-5 text-[#f59e0b]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div>

          {/* External + Zero Copy */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_320px]">
            {externalZone && (
              <div className="rounded-xl border border-[#06a59a]/25 bg-[#013a3a]/40">
                <div className="flex items-center gap-2.5 border-b border-[#06a59a]/20 px-4 py-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#06a59a]" />
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a0f0eb]">External Systems</p>
                </div>
                <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
                  {externalZone.nodes.map((node) => (
                    <NodeCard key={node.name} node={node} color="teal" />
                  ))}
                </div>
              </div>
            )}

            {zeroCopyZone && (
              <div className="rounded-xl border border-[#00b3ff]/25 bg-[#013a6b]/40">
                <div className="flex items-center gap-2.5 border-b border-[#00b3ff]/20 px-4 py-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00b3ff]" />
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#cfe9fe]">Zero Copy Partner Network</p>
                </div>
                <div className="p-3">
                  {zeroCopyZone.nodes.map((node) => (
                    <NodeCard key={node.name} node={node} color="cb" />
                  ))}
                </div>
              </div>
            )}
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
            >✕</button>
            <img src={data.svgUrl} alt={data.title} className="h-auto w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
