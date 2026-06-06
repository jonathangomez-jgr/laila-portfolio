import type { RoadmapData } from "../data/customerDemos";

const COLOR: Record<
  "indigo" | "violet" | "sky" | "emerald",
  { dot: string; ring: string; text: string; line: string; bg: string }
> = {
  indigo: {
    dot: "bg-indigo-500",
    ring: "ring-indigo-300",
    text: "text-indigo-700",
    line: "from-indigo-500",
    bg: "bg-indigo-50",
  },
  violet: {
    dot: "bg-violet-500",
    ring: "ring-violet-300",
    text: "text-violet-700",
    line: "from-violet-500",
    bg: "bg-violet-50",
  },
  sky: {
    dot: "bg-sky-500",
    ring: "ring-sky-300",
    text: "text-sky-700",
    line: "from-sky-500",
    bg: "bg-sky-50",
  },
  emerald: {
    dot: "bg-emerald-500",
    ring: "ring-emerald-300",
    text: "text-emerald-700",
    line: "from-emerald-500",
    bg: "bg-emerald-50",
  },
};

export default function RoadmapTimeline({ data }: { data: RoadmapData }) {
  return (
    <div className="mt-10 space-y-12">
      {/* MVP destacado */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 p-8 text-white shadow-xl">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
              ⚡ MVP recomendado
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-blue-100">
              Donde empezar
            </span>
          </div>
          <h3 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
            {data.mvp.title}
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-7 text-blue-50">
            {data.mvp.reason}
          </p>

          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">
                ✓ Casos incluidos
              </p>
              <ul className="mt-3 space-y-1.5">
                {data.mvp.included.map((c, i) => (
                  <li key={c} className="flex gap-3 text-sm leading-6 text-white/95">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-[11px] font-bold">
                      {i + 1}
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-widest text-rose-200">
                ✕ Casos excluidos del MVP
              </p>
              <ul className="mt-3 space-y-1.5">
                {data.mvp.excluded.map((c) => (
                  <li
                    key={c}
                    className="flex gap-2 text-sm leading-6 text-white/80"
                  >
                    <span className="text-rose-200">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4 fases timeline */}
      <section>
        <h3 className="text-xl font-semibold text-gray-950">Roadmap evolutivo</h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
          De resolver problemas a anticiparlos. Cada fase construye sobre la anterior y
          tiene métricas de éxito propias.
        </p>

        <ol className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {data.phases.map((phase) => {
            const c = COLOR[phase.color];
            return (
              <li
                key={phase.number}
                className={`relative flex flex-col rounded-3xl border bg-white p-6 shadow-md ring-1 ${c.ring}`}
              >
                {phase.isMvp && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-md">
                    MVP
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-md ${c.dot}`}
                  >
                    F{phase.number}
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>
                      Fase {phase.number}
                    </p>
                    {phase.duration && (
                      <p className="text-[11px] font-medium text-gray-500">
                        {phase.duration}
                      </p>
                    )}
                  </div>
                </div>

                <h4 className="mt-3 text-base font-semibold leading-snug text-gray-950">
                  {phase.name}
                </h4>
                <p className="mt-2 text-sm leading-6 text-gray-600">{phase.goal}</p>

                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Alcance
                  </p>
                  <ul className="mt-2 space-y-1">
                    {phase.scope.slice(0, 6).map((s) => (
                      <li
                        key={s}
                        className="flex gap-2 text-xs leading-5 text-gray-700"
                      >
                        <span className={`mt-1.5 h-1 w-1 flex-shrink-0 rounded-full ${c.dot}`} />
                        {s}
                      </li>
                    ))}
                    {phase.scope.length > 6 && (
                      <li className="text-xs italic text-gray-400">
                        +{phase.scope.length - 6} más…
                      </li>
                    )}
                  </ul>
                </div>

                <div className={`mt-auto pt-5`}>
                  <div className={`rounded-xl ${c.bg} p-3 ring-1 ring-inset ${c.ring}`}>
                    <p className={`text-[11px] font-bold uppercase tracking-widest ${c.text}`}>
                      Métricas de éxito
                    </p>
                    <ul className="mt-1.5 space-y-0.5">
                      {phase.metrics.slice(0, 4).map((m) => (
                        <li
                          key={m}
                          className="text-[11px] leading-5 text-gray-700"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
