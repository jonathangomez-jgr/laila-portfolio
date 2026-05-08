import type { KpiSummaryRow } from "../data/customerDemos";

type KpiSummaryTableProps = {
  rows: KpiSummaryRow[];
};

const COLOR_MAP = {
  indigo: {
    pill: "bg-indigo-500/20 text-indigo-200 border border-indigo-400/30",
    dot: "bg-indigo-400",
    kpi: "text-white",
    val6m: "text-indigo-300",
    val12m: "text-white",
    divider: "bg-indigo-400/20",
    glow: "shadow-[inset_0_0_40px_rgba(99,102,241,0.07)]",
  },
  violet: {
    pill: "bg-violet-500/20 text-violet-200 border border-violet-400/30",
    dot: "bg-violet-400",
    kpi: "text-white",
    val6m: "text-violet-300",
    val12m: "text-white",
    divider: "bg-violet-400/20",
    glow: "shadow-[inset_0_0_40px_rgba(139,92,246,0.07)]",
  },
  sky: {
    pill: "bg-sky-500/20 text-sky-200 border border-sky-400/30",
    dot: "bg-sky-400",
    kpi: "text-white",
    val6m: "text-sky-300",
    val12m: "text-white",
    divider: "bg-sky-400/20",
    glow: "shadow-[inset_0_0_40px_rgba(14,165,233,0.07)]",
  },
} as const;

export default function KpiSummaryTable({ rows }: KpiSummaryTableProps) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 shadow-[0_24px_60px_rgba(30,27,75,0.32)] ring-1 ring-white/10">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/8 px-6 py-4">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Resumen de impacto — KPI clave por dimensión
        </p>
      </div>

      {/* Column labels */}
      <div className="hidden grid-cols-[1fr_1fr_1fr_1fr] border-b border-white/8 px-6 py-3 md:grid">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Dimensión</p>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">KPI clave</p>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">6 meses</p>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">12 meses</p>
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/[0.06]">
        {rows.map((row) => {
          const c = COLOR_MAP[row.color];
          return (
            <div
              key={row.dimension}
              className={`grid items-center gap-4 px-6 py-5 transition-colors hover:bg-white/[0.03] md:grid-cols-[1fr_1fr_1fr_1fr] md:gap-0 ${c.glow}`}
            >
              {/* Dimension */}
              <div>
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${c.pill}`}>
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${c.dot}`} />
                  {row.dimension}
                </span>
              </div>

              {/* KPI name */}
              <div className="pr-4">
                <p className={`text-sm font-medium leading-snug ${c.kpi}`}>{row.kpiName}</p>
              </div>

              {/* 6m value */}
              <div>
                <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 md:hidden">
                  6 meses
                </p>
                <p className={`text-base font-semibold ${c.val6m}`}>{row.value6m}</p>
              </div>

              {/* 12m value */}
              <div>
                <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 md:hidden">
                  12 meses
                </p>
                <p className={`text-lg font-bold ${c.val12m}`}>{row.value12m}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
