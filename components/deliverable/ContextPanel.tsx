import type { ContextSection } from "@/data/agentDeliverables";

const metricColor: Record<
  ContextSection["metrics"][0]["color"],
  { badge: string; bar: string }
> = {
  indigo: { badge: "bg-indigo-50 text-indigo-700", bar: "bg-indigo-500" },
  violet: { badge: "bg-violet-50 text-violet-700", bar: "bg-violet-500" },
  sky: { badge: "bg-sky-50 text-sky-700", bar: "bg-sky-500" },
  emerald: { badge: "bg-emerald-50 text-emerald-700", bar: "bg-emerald-500" },
  amber: { badge: "bg-amber-50 text-amber-700", bar: "bg-amber-500" },
  rose: { badge: "bg-rose-50 text-rose-700", bar: "bg-rose-500" },
};

const calloutStyles: Record<
  NonNullable<ContextSection["callouts"]>[0]["variant"],
  { wrap: string; icon: string; label: string }
> = {
  info: {
    wrap: "border-sky-200 bg-sky-50/70",
    icon: "text-sky-500",
    label: "text-sky-700",
  },
  success: {
    wrap: "border-emerald-200 bg-emerald-50/70",
    icon: "text-emerald-500",
    label: "text-emerald-700",
  },
  warn: {
    wrap: "border-amber-200 bg-amber-50/70",
    icon: "text-amber-500",
    label: "text-amber-700",
  },
  critical: {
    wrap: "border-rose-200 bg-rose-50/70",
    icon: "text-rose-500",
    label: "text-rose-700",
  },
};

export default function ContextPanel({ data }: { data: ContextSection }) {
  return (
    <div className="mt-8 space-y-10">
      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-4 text-base leading-8 text-gray-700 sm:text-lg">
          <p>{data.intro}</p>
          <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">
              El problema
            </p>
            <p className="mt-2 text-base leading-7 text-gray-700">
              {data.problem}
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-500">
              Alcance de la Fase 1
            </p>
            <p className="mt-2 text-base leading-7 text-gray-800">
              {data.scope}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {data.stats.map((stat) => (
            <div
              key={stat.label}
              className="soft-card flex flex-col justify-between gap-2 p-5"
            >
              <p className="text-3xl font-bold tracking-tight text-gray-950">
                {stat.value}
              </p>
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  {stat.label}
                </p>
                {stat.helper && (
                  <p className="mt-0.5 text-xs leading-5 text-gray-500">
                    {stat.helper}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">Indicadores de negocio a impactar</p>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
              <tr>
                <th className="px-5 py-3">Métrica</th>
                <th className="px-5 py-3">Baseline</th>
                <th className="px-5 py-3">Objetivo</th>
                <th className="px-5 py-3">Ventana</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.metrics.map((m) => {
                const c = metricColor[m.color];
                return (
                  <tr key={m.name} className="align-top">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${c.bar}`}
                        />
                        <span className="font-semibold text-gray-900">
                          {m.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{m.baseline}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${c.badge}`}
                      >
                        {m.target}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{m.window}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {data.callouts && data.callouts.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {data.callouts.map((c) => {
            const s = calloutStyles[c.variant];
            return (
              <div
                key={c.title}
                className={`flex gap-3 rounded-2xl border p-5 ${s.wrap}`}
              >
                <span className={`mt-0.5 shrink-0 ${s.icon}`}>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M12 22a10 10 0 100-20 10 10 0 000 20z"
                    />
                  </svg>
                </span>
                <div>
                  <p
                    className={`text-xs font-bold uppercase tracking-[0.16em] ${s.label}`}
                  >
                    {c.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-700">
                    {c.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
