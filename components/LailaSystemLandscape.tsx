"use client";

import { useState } from "react";

type NodeCardProps = {
  name: string;
  items: string[];
  color: "indigo" | "sky" | "violet" | "amber" | "slate" | "green" | "teal";
};

function NodeCard({ name, items, color }: NodeCardProps) {
  const [hovered, setHovered] = useState(false);

  const styles = {
    indigo: { card: "border-indigo-500/30 bg-indigo-900/50 hover:border-indigo-400/60 hover:bg-indigo-800/60", title: "text-indigo-100", dot: "bg-indigo-400", item: "text-indigo-200/80" },
    sky:    { card: "border-sky-500/30 bg-sky-900/40 hover:border-sky-400/60 hover:bg-sky-800/50",       title: "text-sky-100",    dot: "bg-sky-400",    item: "text-sky-200/80"    },
    violet: { card: "border-violet-500/30 bg-violet-900/40 hover:border-violet-400/60 hover:bg-violet-800/50", title: "text-violet-100", dot: "bg-violet-400", item: "text-violet-200/80" },
    amber:  { card: "border-amber-500/30 bg-amber-900/40 hover:border-amber-400/60 hover:bg-amber-800/50",   title: "text-amber-100",  dot: "bg-amber-400",  item: "text-amber-200/80"  },
    slate:  { card: "border-slate-500/30 bg-slate-800/50 hover:border-slate-400/60 hover:bg-slate-700/60",   title: "text-slate-100",  dot: "bg-slate-400",  item: "text-slate-200/80"  },
    green:  { card: "border-green-500/30 bg-green-900/40 hover:border-green-400/60 hover:bg-green-800/50",   title: "text-green-100",  dot: "bg-green-400",  item: "text-green-200/80"  },
    teal:   { card: "border-teal-500/30 bg-teal-900/40 hover:border-teal-400/60 hover:bg-teal-800/50",       title: "text-teal-100",   dot: "bg-teal-400",   item: "text-teal-200/80"   },
  } as const;

  const s = styles[color];

  return (
    <div
      className={`cursor-default rounded-lg border px-3 py-2.5 transition-all duration-200 ${s.card}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className={`text-xs font-bold ${s.title}`}>{name}</p>
      <div className={`overflow-hidden transition-all duration-200 ${hovered ? "mt-2 max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
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

function LayerArrow({ color = "text-slate-600/40" }: { color?: string }) {
  return (
    <div className="flex justify-center py-1">
      <svg className={`h-4 w-4 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

const layers = [
  {
    id: "external",
    label: "External Channels",
    dot: "bg-green-400",
    border: "border-green-500/25",
    bg: "bg-green-950/40",
    headerText: "text-green-200",
    color: "green" as const,
    nodes: [
      { name: "WhatsApp", items: ["Outbound", "Inbound", "Unified Messaging"] },
    ],
    gridCols: "grid-cols-1 sm:grid-cols-2",
    arrowColor: "text-green-500/30",
  },
  {
    id: "engagement",
    label: "System of Engagement",
    dot: "bg-amber-400",
    border: "border-amber-500/25",
    bg: "bg-amber-950/40",
    headerText: "text-amber-200",
    color: "amber" as const,
    nodes: [
      { name: "Slack", items: ["Collaboration", "Employee Agents"] },
    ],
    gridCols: "grid-cols-1 sm:grid-cols-2",
    arrowColor: "text-amber-500/30",
  },
  {
    id: "agency",
    label: "System of Agency",
    dot: "bg-violet-400",
    border: "border-violet-500/25",
    bg: "bg-violet-950/50",
    headerText: "text-violet-200",
    color: "violet" as const,
    nodes: [
      { name: "Service Agent", items: ["Atención al cliente", "Resolución de casos", "Omni-channel", "Contact Center Digital"] },
      { name: "Employee Agent", items: ["Collaboration", "Slack", "Gestión interna"] },
    ],
    gridCols: "grid-cols-2",
    arrowColor: "text-violet-500/30",
    badge: "Agentforce",
  },
  {
    id: "work",
    label: "System of Work",
    dot: "bg-indigo-400",
    border: "border-indigo-500/25",
    bg: "bg-indigo-950/50",
    headerText: "text-indigo-200",
    color: "indigo" as const,
    nodes: [
      { name: "Sales Cloud", items: ["Account Management", "Contact Management", "Revenue Management", "Opportunity Management", "Orders", "Products", "Quotes"] },
      { name: "Service Cloud", items: ["Case management", "SLAs", "Escalations", "Contact Center", "Contact Center Digital", "Omni-channel"] },
      { name: "Marketing Cloud", items: ["Marketing Cloud Engagement", "Unified Messaging", "Loyalty"] },
      { name: "Platform", items: ["Financial Accounts", "Insurance", "Créditos", "Afiliaciones", "Beneficiarios", "Medicina Prepagada", "Premium Experience"] },
    ],
    gridCols: "grid-cols-2 md:grid-cols-4",
    arrowColor: "text-indigo-500/30",
  },
  {
    id: "context",
    label: "System of Context",
    dot: "bg-sky-400",
    border: "border-sky-500/25",
    bg: "bg-sky-950/40",
    headerText: "text-sky-200",
    color: "sky" as const,
    nodes: [
      { name: "Unificación", items: ["Harmonization", "Identity resolution", "Segmentation"] },
      { name: "AI Ready Data", items: ["Unstructured Data Model Objects", "Retrievers", "Data Libraries"] },
    ],
    gridCols: "grid-cols-2",
    arrowColor: undefined,
    badge: "Data Cloud · Zero Copy",
  },
];

export default function LailaSystemLandscape() {
  const [svgOpen, setSvgOpen] = useState(false);

  return (
    <div className="space-y-1">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 shadow-[0_24px_60px_rgba(30,27,75,0.32)] ring-1 ring-white/10">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">System Landscape</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs font-medium text-slate-500">Laila · VivaLux</p>
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
          </div>
        </div>

        {/* Einstein Trust Layer */}
        <div className="flex justify-end px-5 pt-4">
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

        {/* Layers */}
        <div className="space-y-0 p-5 pt-3">

          {/* Row 1: External Channels + System of Engagement — side by side */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {layers.filter((l) => l.id === "external" || l.id === "engagement").map((layer) => (
              <div key={layer.id} className={`rounded-xl border ${layer.border} ${layer.bg}`}>
                <div className={`flex items-center justify-between border-b ${layer.border} px-4 py-2.5`}>
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${layer.dot}`} />
                    <p className={`text-xs font-bold uppercase tracking-[0.14em] ${layer.headerText}`}>
                      {layer.label}
                    </p>
                  </div>
                  {layer.badge && (
                    <span className={`text-[10px] font-semibold ${layer.headerText} opacity-60`}>
                      {layer.badge}
                    </span>
                  )}
                </div>
                <div className={`grid gap-2 p-3 ${layer.gridCols}`}>
                  {layer.nodes.map((node) => (
                    <NodeCard key={node.name} name={node.name} items={node.items} color={layer.color} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Rows 2–4: remaining layers stacked */}
          {layers.filter((l) => l.id !== "external" && l.id !== "engagement").map((layer, i, arr) => (
            <div key={layer.id}>
              <LayerArrow color={layer.arrowColor ?? "text-slate-600/40"} />
              <div className={`rounded-xl border ${layer.border} ${layer.bg}`}>
                <div className={`flex items-center justify-between border-b ${layer.border} px-4 py-2.5`}>
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${layer.dot}`} />
                    <p className={`text-xs font-bold uppercase tracking-[0.14em] ${layer.headerText}`}>
                      {layer.label}
                    </p>
                  </div>
                  {layer.badge && (
                    <span className={`text-[10px] font-semibold ${layer.headerText} opacity-60`}>
                      {layer.badge}
                    </span>
                  )}
                </div>
                <div className={`grid gap-2 p-3 ${layer.gridCols}`}>
                  {layer.nodes.map((node) => (
                    <NodeCard key={node.name} name={node.name} items={node.items} color={layer.color} />
                  ))}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* SVG lightbox */}
      {svgOpen && (
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
            <img src="/Laila/laila-landscape.svg" alt="Laila System Landscape" className="h-auto w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
