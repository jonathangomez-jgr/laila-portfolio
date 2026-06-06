import type { WorkshopData } from "../data/customerDemos";

const AREA_ACCENT: Record<number, { ring: string; text: string; bg: string }> = {
  1: { ring: "ring-rose-200", text: "text-rose-700", bg: "bg-rose-50/70" },
  2: { ring: "ring-amber-200", text: "text-amber-700", bg: "bg-amber-50/70" },
  3: { ring: "ring-fuchsia-200", text: "text-fuchsia-700", bg: "bg-fuchsia-50/70" },
  4: { ring: "ring-violet-200", text: "text-violet-700", bg: "bg-violet-50/70" },
  5: { ring: "ring-indigo-200", text: "text-indigo-700", bg: "bg-indigo-50/70" },
};

export default function WorkshopResult({ data }: { data: WorkshopData }) {
  return (
    <div className="mt-10 space-y-12">
      {/* Workshop intro band */}
      <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-indigo-100">
            🧩 Antiexperience Workshop
          </span>
          <span className="text-gray-400">{data.date}</span>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-700">{data.intro}</p>
      </div>

      {/* Persona */}
      <section>
        <h3 className="text-xl font-semibold text-gray-950">
          Persona central · {data.persona.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-indigo-600">{data.persona.role}</p>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">
          {data.persona.context}
        </p>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
              Características clave
            </p>
            <ul className="mt-4 space-y-2.5">
              {data.persona.characteristics.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-6 text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-violet-100 bg-violet-50/50 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-500">
              Necesidades principales
            </p>
            <ul className="mt-4 space-y-2.5">
              {data.persona.needs.map((n) => (
                <li key={n} className="flex gap-3 text-sm leading-6 text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5 Áreas */}
      <section>
        <h3 className="text-xl font-semibold text-gray-950">
          5 áreas de la peor experiencia
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
          Cinco equipos de Betterware diseñaron en paralelo la peor experiencia posible para
          la DS. Estos son los hallazgos consolidados — los puntos rojos indican prioridad
          votada por los equipos.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.areas.map((area) => {
            const a = AREA_ACCENT[area.number] ?? AREA_ACCENT[1];
            return (
              <div
                key={area.number}
                className={`relative rounded-2xl border bg-white p-6 shadow-sm ring-1 ${a.ring}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${a.text}`}>
                      Área {area.number}
                    </p>
                    <h4 className="mt-1 text-base font-semibold text-gray-950">
                      {area.title}
                    </h4>
                  </div>
                  {area.redDots && area.redDots > 0 && (
                    <span
                      className={`flex shrink-0 items-center gap-1 rounded-full ${a.bg} px-2.5 py-1 text-xs font-bold ${a.text}`}
                    >
                      {Array.from({ length: area.redDots }).map((_, i) => (
                        <span key={i} className="text-red-500">
                          ●
                        </span>
                      ))}
                      <span>×{area.redDots}</span>
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">{area.summary}</p>
                <ul className="mt-4 space-y-1.5">
                  {area.pains.map((p) => (
                    <li
                      key={p}
                      className="flex gap-2 text-xs leading-5 text-gray-600"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top Priority callout */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 p-8 text-white shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-100">
          Prioridad #1 del taller
        </p>
        <h3 className="mt-3 text-3xl font-semibold leading-tight">
          {data.topPriority.title}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-7 text-indigo-50">
          {data.topPriority.reason}
        </p>
      </section>

      {/* Aspirational closing */}
      <section className="rounded-3xl border border-emerald-100 bg-emerald-50/40 p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
          Visión aspiracional
        </p>
        <p className="mt-3 max-w-3xl text-base italic leading-7 text-gray-700">
          “{data.aspirational}”
        </p>
      </section>
    </div>
  );
}
