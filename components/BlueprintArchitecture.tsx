import type { BlueprintData } from "../data/customerDemos";

const TYPE_ACCENT: Record<
  string,
  { ring: string; text: string; bg: string; chip: string; chipText: string }
> = {
  external: {
    ring: "ring-indigo-200",
    text: "text-indigo-700",
    bg: "from-indigo-50 to-white",
    chip: "bg-indigo-100",
    chipText: "text-indigo-700",
  },
  internal: {
    ring: "ring-violet-200",
    text: "text-violet-700",
    bg: "from-violet-50 to-white",
    chip: "bg-violet-100",
    chipText: "text-violet-700",
  },
  data: {
    ring: "ring-sky-200",
    text: "text-sky-700",
    bg: "from-sky-50 to-white",
    chip: "bg-sky-100",
    chipText: "text-sky-700",
  },
  orchestration: {
    ring: "ring-emerald-200",
    text: "text-emerald-700",
    bg: "from-emerald-50 to-white",
    chip: "bg-emerald-100",
    chipText: "text-emerald-700",
  },
};

export default function BlueprintArchitecture({ data }: { data: BlueprintData }) {
  return (
    <div className="mt-10 space-y-12">
      {/* Principio rector */}
      <section className="overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/40 to-sky-50 p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-500">
          Principio rector
        </p>
        <h3 className="mt-3 text-2xl font-semibold leading-snug text-gray-950 sm:text-3xl">
          {data.principle.title}
        </h3>
        <blockquote className="mt-5 max-w-3xl border-l-4 border-indigo-400 pl-5 text-lg italic leading-relaxed text-gray-700">
          “{data.principle.quote}”
        </blockquote>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.principle.capabilities.map((cap, i) => (
            <div
              key={cap}
              className="rounded-2xl border border-indigo-100 bg-white/70 p-4 shadow-sm backdrop-blur"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">
                Capacidad {i + 1}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-gray-900">
                {cap}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 componentes — diagrama */}
      <section>
        <h3 className="text-xl font-semibold text-gray-950">
          Los 4 componentes del ecosistema
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
          La solución no es un chatbot. Es un sistema inteligente con cuatro piezas que
          trabajan en conjunto para resolver, acompañar y hacer crecer a la Distribuidora.
        </p>

        <div className="relative mt-8 grid gap-5 lg:grid-cols-2">
          {data.components.map((c) => {
            const a = TYPE_ACCENT[c.type];
            return (
              <article
                key={c.number}
                className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br p-7 shadow-md ring-1 ${a.ring} ${a.bg}`}
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
                <div className="relative flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-lg font-bold shadow-md ring-1 ${a.ring} ${a.text}`}
                  >
                    {c.number}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-bold uppercase tracking-widest ${a.text}`}>
                      {c.type === "external" && "Agente externo · DS"}
                      {c.type === "internal" && "Copiloto interno · Staff"}
                      {c.type === "data" && "Capa de datos"}
                      {c.type === "orchestration" && "Orquestación proactiva"}
                    </p>
                    <h4 className="mt-1 text-lg font-semibold leading-snug text-gray-950">
                      {c.name}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-gray-700">{c.purpose}</p>
                  </div>
                </div>

                <div className="relative mt-5 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${a.chip} ${a.chipText}`}
                  >
                    👤 {c.user}
                  </span>
                  {c.channels?.map((ch) => (
                    <span
                      key={ch}
                      className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200"
                    >
                      {ch}
                    </span>
                  ))}
                </div>

                <div className="relative mt-6 grid gap-2.5">
                  {c.capabilities.map((cap) => (
                    <div
                      key={cap.title}
                      className="rounded-xl border border-white/70 bg-white/70 p-3 backdrop-blur"
                    >
                      <p className={`text-xs font-bold ${a.text}`}>{cap.title}</p>
                      <p className="mt-1 text-xs leading-5 text-gray-600">{cap.body}</p>
                    </div>
                  ))}
                </div>

                <div className="relative mt-5 flex flex-wrap gap-1.5 border-t border-white/60 pt-4">
                  {c.products.map((p) => (
                    <span
                      key={p}
                      className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-700 shadow-sm ring-1 ring-gray-200"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Tópicos del Agente DS 360 */}
      {data.topics && data.topics.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-gray-950">
            Diseño Agentforce · Tópicos del Agente DS 360
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
            Cada tópico tiene un objetivo claro, acciones permitidas y límites explícitos
            para garantizar resoluciones confiables y escalación con criterio.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {data.topics.map((t, i) => (
              <div
                key={t.name}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-gray-950">{t.name}</h4>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{t.goal}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                      ✓ Acciones permitidas
                    </p>
                    <ul className="mt-2 space-y-1">
                      {t.actions.map((a) => (
                        <li
                          key={a}
                          className="flex gap-2 text-xs leading-5 text-gray-700"
                        >
                          <span className="text-emerald-500">•</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-rose-50/60 p-3 ring-1 ring-rose-100">
                    <p className="text-xs font-bold uppercase tracking-widest text-rose-600">
                      ✕ Límites
                    </p>
                    <ul className="mt-2 space-y-1">
                      {t.limits.map((l) => (
                        <li
                          key={l}
                          className="flex gap-2 text-xs leading-5 text-gray-700"
                        >
                          <span className="text-rose-500">•</span>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trust controls */}
      {data.trustControls && data.trustControls.length > 0 && (
        <section className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-950">
                Controles de confianza, seguridad y gobernanza
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Capa explícita de control para que Agentforce sea confiable en producción.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.trustControls.map((tc) => (
              <div
                key={tc.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-slate-700">
                  {tc.name}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {tc.items.map((it) => (
                    <li
                      key={it}
                      className="flex gap-2 text-xs leading-5 text-gray-600"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
