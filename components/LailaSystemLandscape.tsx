"use client";

import { useState } from "react";

type NodeCardProps = {
  name: string;
  items: string[];
  accent: "eb" | "cb" | "teal" | "violet" | "green" | "amber";
};

const accentStyles = {
  eb:     { card: "border-[#066afe]/30 bg-[#022ac0]/60 hover:border-[#066afe]/70 hover:bg-[#022ac0]/80", title: "text-white",          dot: "bg-[#066afe]",  item: "text-[#90d0fe]/80" },
  cb:     { card: "border-[#00b3ff]/30 bg-[#013a6b]/50 hover:border-[#00b3ff]/70 hover:bg-[#013a6b]/70", title: "text-[#cfe9fe]",      dot: "bg-[#00b3ff]",  item: "text-[#90d0fe]/80" },
  teal:   { card: "border-[#06a59a]/30 bg-[#013a3a]/50 hover:border-[#06a59a]/70 hover:bg-[#013a3a]/70", title: "text-[#a0f0eb]",      dot: "bg-[#06a59a]",  item: "text-[#a0f0eb]/70" },
  violet: { card: "border-[#730394]/30 bg-[#2d0150]/50 hover:border-[#730394]/70 hover:bg-[#2d0150]/70", title: "text-[#e8b4fb]",      dot: "bg-[#730394]",  item: "text-[#e8b4fb]/70" },
  green:  { card: "border-[#06a59a]/30 bg-[#013a3a]/50 hover:border-[#06a59a]/70 hover:bg-[#013a3a]/70", title: "text-[#a0f0eb]",      dot: "bg-[#06a59a]",  item: "text-[#a0f0eb]/70" },
  amber:  { card: "border-[#f59e0b]/30 bg-[#3a2000]/50 hover:border-[#f59e0b]/70 hover:bg-[#3a2000]/70", title: "text-[#fde68a]",      dot: "bg-[#f59e0b]",  item: "text-[#fde68a]/70" },
} as const;

const layerStyles = {
  eb:     { zone: "border-[#066afe]/25 bg-[#022ac0]/40", header: "border-[#066afe]/20", dot: "bg-[#066afe]", label: "text-[#90d0fe]", badge: "text-[#90d0fe]/60" },
  cb:     { zone: "border-[#00b3ff]/25 bg-[#013a6b]/40", header: "border-[#00b3ff]/20", dot: "bg-[#00b3ff]", label: "text-[#cfe9fe]", badge: "text-[#cfe9fe]/60" },
  teal:   { zone: "border-[#06a59a]/25 bg-[#013a3a]/40", header: "border-[#06a59a]/20", dot: "bg-[#06a59a]", label: "text-[#a0f0eb]", badge: "text-[#a0f0eb]/60" },
  violet: { zone: "border-[#730394]/25 bg-[#2d0150]/40", header: "border-[#730394]/20", dot: "bg-[#730394]", label: "text-[#e8b4fb]", badge: "text-[#e8b4fb]/60" },
  green:  { zone: "border-[#06a59a]/25 bg-[#013a3a]/40", header: "border-[#06a59a]/20", dot: "bg-[#06a59a]", label: "text-[#a0f0eb]", badge: "text-[#a0f0eb]/60" },
  amber:  { zone: "border-[#f59e0b]/25 bg-[#3a2000]/40", header: "border-[#f59e0b]/20", dot: "bg-[#f59e0b]", label: "text-[#fde68a]", badge: "text-[#fde68a]/60" },
} as const;

function NodeCard({ name, items, accent }: NodeCardProps) {
  const [hovered, setHovered] = useState(false);
  const s = accentStyles[accent];
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

function Arrow() {
  return (
    <div className="flex justify-center py-0.5">
      <svg className="h-4 w-4 text-[#066afe]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

type LayerDef = {
  id: string;
  label: string;
  accent: keyof typeof layerStyles;
  badge?: string;
  gridCols: string;
  nodes: { name: string; items: string[] }[];
};

const layers: LayerDef[] = [
  {
    id: "top-row",
    label: "", // rendered as 2-col manually
    accent: "teal",
    gridCols: "",
    nodes: [],
  },
  {
    id: "agency",
    label: "System of Agency",
    accent: "violet",
    badge: "Agentforce",
    gridCols: "grid-cols-2",
    nodes: [
      { name: "Service Agent", items: ["Atención al cliente", "Resolución de casos", "Omni-channel", "Contact Center Digital"] },
      { name: "Employee Agent", items: ["Collaboration", "Slack", "Gestión interna"] },
    ],
  },
  {
    id: "work",
    label: "System of Work",
    accent: "eb",
    gridCols: "grid-cols-2 md:grid-cols-4",
    nodes: [
      { name: "Sales Cloud",     items: ["Account Management", "Contact Management", "Revenue Management", "Opportunity Management", "Orders", "Products", "Quotes"] },
      { name: "Service Cloud",   items: ["Case management", "SLAs", "Escalations", "Contact Center", "Contact Center Digital", "Omni-channel"] },
      { name: "Marketing Cloud", items: ["Marketing Cloud Engagement", "Unified Messaging", "Loyalty"] },
      { name: "Platform",        items: ["Financial Accounts", "Insurance", "Créditos", "Afiliaciones", "Beneficiarios", "Medicina Prepagada", "Premium Experience"] },
    ],
  },
  {
    id: "context",
    label: "System of Context",
    accent: "cb",
    badge: "Data Cloud · Zero Copy",
    gridCols: "grid-cols-2",
    nodes: [
      { name: "Unificación",   items: ["Harmonization", "Identity resolution", "Segmentation"] },
      { name: "AI Ready Data", items: ["Unstructured Data Model Objects", "Retrievers", "Data Libraries"] },
    ],
  },
];

const topRowLayers = [
  {
    id: "engagement",
    label: "System of Engagement",
    accent: "amber" as const,
    nodes: [{ name: "Slack", items: ["Collaboration", "Employee Agents"] }],
  },
  {
    id: "external",
    label: "External Channels",
    accent: "teal" as const,
    nodes: [{ name: "WhatsApp", items: ["Outbound", "Inbound", "Unified Messaging"] }],
  },
];

function Layer({ layer }: { layer: LayerDef }) {
  const ls = layerStyles[layer.accent];
  return (
    <div className={`rounded-xl border ${ls.zone}`}>
      <div className={`flex items-center justify-between border-b ${ls.header} px-4 py-2.5`}>
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${ls.dot}`} />
          <p className={`text-xs font-bold uppercase tracking-[0.14em] ${ls.label}`}>{layer.label}</p>
        </div>
        {layer.badge && (
          <span className={`text-[10px] font-semibold ${ls.badge}`}>{layer.badge}</span>
        )}
      </div>
      <div className={`grid gap-2 p-3 ${layer.gridCols}`}>
        {layer.nodes.map((node) => (
          <NodeCard key={node.name} name={node.name} items={node.items} accent={layer.accent} />
        ))}
      </div>
    </div>
  );
}

export default function LailaSystemLandscape() {
  const [svgOpen, setSvgOpen] = useState(false);

  return (
    <div className="space-y-1">
      <div className="overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(2,42,192,0.28)] ring-1 ring-white/10"
           style={{ background: "linear-gradient(150deg,#066afe 0%,#022ac0 45%,#001e5b 100%)" }}>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00b3ff]" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#90d0fe]">System Landscape</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs font-medium text-[#90d0fe]/60">Laila · VivaLux</p>
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
          </div>
        </div>

        {/* Einstein Trust Layer */}
        <div className="flex justify-end px-5 pt-4">
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

        <div className="space-y-0 p-5 pt-3">
          {/* Top row: Engagement + External side by side */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {topRowLayers.map((tl) => {
              const ls = layerStyles[tl.accent];
              return (
                <div key={tl.id} className={`rounded-xl border ${ls.zone}`}>
                  <div className={`flex items-center gap-2 border-b ${ls.header} px-4 py-2.5`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${ls.dot}`} />
                    <p className={`text-xs font-bold uppercase tracking-[0.14em] ${ls.label}`}>{tl.label}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-2 p-3">
                    {tl.nodes.map((node) => (
                      <NodeCard key={node.name} name={node.name} items={node.items} accent={tl.accent} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remaining layers */}
          {layers.filter((l) => l.id !== "top-row").map((layer) => (
            <div key={layer.id}>
              <Arrow />
              <Layer layer={layer} />
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
            >✕</button>
            <img src="/Laila/laila-landscape.svg" alt="Laila System Landscape" className="h-auto w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
