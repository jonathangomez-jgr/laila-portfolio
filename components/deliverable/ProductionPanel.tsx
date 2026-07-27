import type { ProductionSection, ProductionStep } from "@/data/agentDeliverables";

const statusStyles: Record<
  ProductionStep["status"],
  { chip: string; bar: string; label: string }
> = {
  critical: {
    chip: "bg-rose-50 text-rose-700",
    bar: "bg-rose-500",
    label: "Crítico",
  },
  recommended: {
    chip: "bg-amber-50 text-amber-700",
    bar: "bg-amber-500",
    label: "Recomendado",
  },
  optional: {
    chip: "bg-sky-50 text-sky-700",
    bar: "bg-sky-500",
    label: "Opcional",
  },
};

const ownerStyles: Record<
  ProductionStep["owner"],
  { chip: string }
> = {
  Salesforce: { chip: "bg-indigo-50 text-indigo-700" },
  Cliente: { chip: "bg-violet-50 text-violet-700" },
  Ambos: { chip: "bg-emerald-50 text-emerald-700" },
};

export default function ProductionPanel({
  data,
}: {
  data: ProductionSection;
}) {
  const phases = Array.from(new Set(data.steps.map((s) => s.phase)));

  return (
    <div className="mt-8 space-y-10">
      <p className="text-base leading-8 text-gray-700 sm:text-lg">
        {data.intro}
      </p>

      {phases.map((phase) => {
        const items = data.steps.filter((s) => s.phase === phase);
        return (
          <div key={phase}>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 items-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-4 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-sm">
                {phase}
              </span>
              <p className="text-xs font-semibold text-gray-500">
                {items.length} paso{items.length === 1 ? "" : "s"}
              </p>
            </div>

            <ol className="relative space-y-3 border-l-2 border-dashed border-indigo-200 pl-6">
              {items.map((s) => {
                const st = statusStyles[s.status];
                const ow = ownerStyles[s.owner];
                return (
                  <li key={s.order} className="relative">
                    <span
                      className={`absolute -left-[33px] top-4 flex h-6 w-6 items-center justify-center rounded-full ${st.bar} text-[10px] font-bold text-white shadow-sm ring-4 ring-white`}
                    >
                      {s.order}
                    </span>
                    <div className="soft-card p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h4 className="max-w-2xl text-base font-semibold text-gray-950">
                          {s.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${st.chip}`}
                          >
                            {st.label}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${ow.chip}`}
                          >
                            Owner · {s.owner}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-gray-700">
                        {s.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-rose-200 bg-rose-50/60 shadow-sm">
          <div className="flex items-center gap-3 border-b border-rose-200/60 bg-rose-100/40 px-5 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white shadow-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-rose-700">
                Estrategia de rollback
              </p>
              <p className="text-sm font-semibold text-rose-900">
                Recuperación en menos de 5 minutos
              </p>
            </div>
          </div>
          <div className="px-5 py-4 text-sm leading-6 text-rose-900/90">
            {data.rollback}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-indigo-200 bg-indigo-50/50 shadow-sm">
          <div className="flex items-center gap-3 border-b border-indigo-200/60 bg-indigo-100/40 px-5 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3v18h18M7 15l4-4 4 4 5-6"
                />
              </svg>
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-700">
                Monitoreo continuo
              </p>
              <p className="text-sm font-semibold text-indigo-900">
                Dashboards y auditorías post-Go Live
              </p>
            </div>
          </div>
          <ul className="divide-y divide-indigo-200/50">
            {data.monitoring.map((m) => (
              <li
                key={m}
                className="flex items-start gap-2.5 px-5 py-3 text-sm leading-6 text-indigo-950/90"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"
                />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
