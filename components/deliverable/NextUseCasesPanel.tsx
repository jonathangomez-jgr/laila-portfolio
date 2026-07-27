import type { NextUseCase } from "@/data/agentDeliverables";

const impactBadge: Record<NextUseCase["valueImpact"], string> = {
  alto: "bg-emerald-500 text-white",
  medio: "bg-amber-500 text-white",
  bajo: "bg-sky-500 text-white",
};

const effortBadge: Record<NextUseCase["effort"], string> = {
  alto: "bg-rose-50 text-rose-700 ring-rose-200",
  medio: "bg-amber-50 text-amber-700 ring-amber-200",
  bajo: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export default function NextUseCasesPanel({
  cases,
}: {
  cases: NextUseCase[];
}) {
  return (
    <div className="mt-8 space-y-8">
      {/* Matriz de priorización compacta */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-[80px_1fr_120px_120px_160px] gap-2 border-b border-gray-100 bg-gray-50 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">
          <span>#</span>
          <span>Caso de uso</span>
          <span>Impacto</span>
          <span>Esfuerzo</span>
          <span>Timeline</span>
        </div>
        <ul>
          {cases.map((c) => (
            <li
              key={c.key}
              className="grid grid-cols-[80px_1fr_120px_120px_160px] items-center gap-2 border-b border-gray-100 px-5 py-3 last:border-b-0 text-sm"
            >
              <span className="font-mono font-bold text-indigo-600">
                {c.key}
              </span>
              <span className="font-semibold text-gray-900">{c.name}</span>
              <span>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    impactBadge[c.valueImpact]
                  }`}
                >
                  {c.valueImpact}
                </span>
              </span>
              <span>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${
                    effortBadge[c.effort]
                  }`}
                >
                  {c.effort}
                </span>
              </span>
              <span className="text-xs text-gray-600">{c.timeline}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Detalle por caso */}
      <div className="space-y-4">
        {cases.map((c) => (
          <article
            key={c.key}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <header className="flex flex-wrap items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 px-6 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-xs font-bold text-white shadow-sm">
                {String(c.order).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-500">
                  {c.key} · {c.timeline}
                </p>
                <h3 className="text-lg font-semibold leading-tight text-gray-950">
                  {c.name}
                </h3>
              </div>
              <p className="ml-auto max-w-md text-sm italic leading-6 text-gray-700">
                {c.headline}
              </p>
            </header>
            <div className="grid gap-6 px-6 py-5 lg:grid-cols-[1.4fr_1fr]">
              <p className="text-sm leading-6 text-gray-700">{c.description}</p>
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                    Dependencias
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {c.dependencies.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 text-xs leading-5 text-gray-700"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                    KPI de éxito
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-800">
                    {c.kpi}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
