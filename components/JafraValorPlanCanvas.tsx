import type {
  ValorWorkshopPlanData,
  ValorAgendaBlock,
  ValorPreworkGroup,
  ValorGovernanceCadence,
} from "../data/customerDemos";

const BLOCK_ACCENT: Record<
  ValorAgendaBlock["accent"],
  { border: string; bg: string; text: string; badge: string; ring: string }
> = {
  indigo: {
    border: "border-indigo-200",
    bg: "bg-indigo-50/60",
    text: "text-indigo-700",
    badge: "bg-indigo-600 text-white",
    ring: "ring-indigo-200",
  },
  violet: {
    border: "border-violet-200",
    bg: "bg-violet-50/60",
    text: "text-violet-700",
    badge: "bg-violet-600 text-white",
    ring: "ring-violet-200",
  },
  sky: {
    border: "border-sky-200",
    bg: "bg-sky-50/60",
    text: "text-sky-700",
    badge: "bg-sky-600 text-white",
    ring: "ring-sky-200",
  },
  emerald: {
    border: "border-emerald-200",
    bg: "bg-emerald-50/60",
    text: "text-emerald-700",
    badge: "bg-emerald-600 text-white",
    ring: "ring-emerald-200",
  },
  amber: {
    border: "border-amber-200",
    bg: "bg-amber-50/60",
    text: "text-amber-700",
    badge: "bg-amber-600 text-white",
    ring: "ring-amber-200",
  },
  rose: {
    border: "border-rose-200",
    bg: "bg-rose-50/60",
    text: "text-rose-700",
    badge: "bg-rose-600 text-white",
    ring: "ring-rose-200",
  },
};

const PREWORK_ACCENT: Record<
  ValorPreworkGroup["key"],
  { border: string; text: string; icon: string; bg: string }
> = {
  business: {
    border: "border-indigo-200",
    text: "text-indigo-700",
    icon: "📊",
    bg: "bg-indigo-50/50",
  },
  consumption: {
    border: "border-violet-200",
    text: "text-violet-700",
    icon: "💸",
    bg: "bg-violet-50/50",
  },
  technical: {
    border: "border-sky-200",
    text: "text-sky-700",
    icon: "🧩",
    bg: "bg-sky-50/50",
  },
  conversations: {
    border: "border-emerald-200",
    text: "text-emerald-700",
    icon: "💬",
    bg: "bg-emerald-50/50",
  },
};

const CADENCE_LABEL: Record<ValorGovernanceCadence["cadence"], string> = {
  weekly: "Semanal",
  monthly: "Mensual",
  "per-change": "Por cambio",
};

const CADENCE_ACCENT: Record<
  ValorGovernanceCadence["cadence"],
  { border: string; bg: string; text: string }
> = {
  weekly: { border: "border-indigo-200", bg: "bg-indigo-50/50", text: "text-indigo-700" },
  monthly: { border: "border-violet-200", bg: "bg-violet-50/50", text: "text-violet-700" },
  "per-change": { border: "border-sky-200", bg: "bg-sky-50/50", text: "text-sky-700" },
};

export default function JafraValorPlanCanvas({
  data,
}: {
  data: ValorWorkshopPlanData;
}) {
  return (
    <div className="mt-10 space-y-14">
      {/* ── Propósito + pregunta rectora ─────────────────────────── */}
      <section className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-indigo-100">
            🎯 Propósito del workshop
          </span>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-700">
          {data.purpose}
        </p>

        <div className="mt-6 rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 p-6 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-100">
            Pregunta rectora
          </p>
          <p className="mt-2 text-xl font-semibold leading-8 sm:text-2xl">
            “{data.guidingQuestion}”
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            Nota sobre el benchmark
          </p>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            {data.benchmarkNote}
          </p>
        </div>
      </section>

      {/* ── Entregables esperados ─────────────────────────────────── */}
      <section>
        <h3 className="text-xl font-semibold text-gray-950">
          {data.expectedOutcomes.length} entregables tangibles al cerrar
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
          Ningún entregable termina en «hay que revisar». Todos terminan en
          decisión con owner, fecha y métrica.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.expectedOutcomes.map((outcome, i) => (
            <div
              key={outcome}
              className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-3 text-sm leading-6 text-gray-700">{outcome}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Prework ───────────────────────────────────────────────── */}
      <section>
        <h3 className="text-xl font-semibold text-gray-950">
          Trabajo previo indispensable · 3-5 días antes
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
          Sin datos previos, las 2 horas se convierten en opiniones. Los cuatro
          grupos de información deben estar completos y compartidos antes de la
          sesión — la sesión valida y decide, no construye.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {data.prework.map((group) => {
            const a = PREWORK_ACCENT[group.key];
            return (
              <div
                key={group.key}
                className={`rounded-2xl border bg-white p-6 shadow-sm ${a.border}`}
              >
                <div className={`inline-flex items-center gap-2 rounded-full ${a.bg} px-3 py-1`}>
                  <span aria-hidden>{a.icon}</span>
                  <span className={`text-xs font-bold uppercase tracking-widest ${a.text}`}>
                    {group.title}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {group.purpose}
                </p>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-gray-700"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                {group.note && (
                  <p className={`mt-4 rounded-lg ${a.bg} px-3 py-2 text-xs leading-5 ${a.text}`}>
                    ⓘ {group.note}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Agenda de 2 horas ─────────────────────────────────────── */}
      <section>
        <h3 className="text-xl font-semibold text-gray-950">
          Agenda ejecutable · 120 minutos
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
          Cada bloque tiene un objetivo, un contenido y un entregable único. Los
          tableros llegan pre-cargados desde el prework — la sesión los valida y
          los convierte en decisiones.
        </p>
        <div className="mt-6 space-y-4">
          {data.agenda.map((block) => {
            const a = BLOCK_ACCENT[block.accent];
            return (
              <div
                key={block.code}
                className={`overflow-hidden rounded-2xl border ${a.border} bg-white shadow-sm`}
              >
                <div className={`flex flex-wrap items-center gap-4 ${a.bg} px-6 py-4 border-b ${a.border}`}>
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${a.badge}`}
                  >
                    {block.code === "wrap" ? "✓" : block.code}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-gray-950">
                      {block.title}
                    </h4>
                    <p className={`text-xs font-semibold uppercase tracking-widest ${a.text}`}>
                      {block.duration}
                    </p>
                  </div>
                </div>
                <div className="grid gap-6 p-6 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Objetivo
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-gray-700">
                      {block.objective}
                    </p>
                    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                      Contenido
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-gray-700">
                      {block.content}
                    </p>
                  </div>
                  <div>
                    {block.exercise && (
                      <>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                          Ejercicio
                        </p>
                        <p className="mt-1.5 text-sm leading-6 text-gray-700">
                          {block.exercise}
                        </p>
                      </>
                    )}
                    <p className={`text-xs font-bold uppercase tracking-widest ${a.text} ${block.exercise ? "mt-4" : ""}`}>
                      Entregable
                    </p>
                    <div className={`mt-1.5 rounded-lg ${a.bg} p-3 ring-1 ${a.ring}`}>
                      <p className="text-sm font-medium leading-6 text-gray-800">
                        {block.deliverable}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Materiales de facilitación ────────────────────────────── */}
      <section>
        <h3 className="text-xl font-semibold text-gray-950">
          Materiales de facilitación
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
          Siete tableros que llegan pre-cargados a la sesión. El trabajo pesado
          ocurrió en el prework — el taller los desafía, prioriza y compromete.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.materials.map((material, i) => (
            <div
              key={material.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gray-900 text-[10px] font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-3 text-sm font-semibold text-gray-950">
                {material.title}
              </p>
              <p className="mt-2 text-xs leading-5 text-gray-600">
                {material.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Participantes ─────────────────────────────────────────── */}
      <section>
        <h3 className="text-xl font-semibold text-gray-950">
          Participantes recomendados
        </h3>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">
              {data.participants.client.heading}
            </p>
            <ul className="mt-4 space-y-3">
              {data.participants.client.roles.map((r) => (
                <li key={r.role} className="text-sm leading-6 text-gray-700">
                  <span className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                    <span>
                      {r.role}
                      {r.note && (
                        <span className="mt-0.5 block text-xs italic text-gray-500">
                          {r.note}
                        </span>
                      )}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-violet-100 bg-violet-50/40 p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              {data.participants.partner.heading}
            </p>
            <ul className="mt-4 space-y-3">
              {data.participants.partner.roles.map((r) => (
                <li key={r.role} className="text-sm leading-6 text-gray-700">
                  <span className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500" />
                    <span>
                      {r.role}
                      {r.note && (
                        <span className="mt-0.5 block text-xs italic text-gray-500">
                          {r.note}
                        </span>
                      )}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            Regla firme
          </p>
          <p className="mt-1 text-sm leading-6 text-gray-700">
            {data.participants.note}
          </p>
        </div>
      </section>

      {/* ── Gobierno / Seguimiento continuo ───────────────────────── */}
      <section>
        <h3 className="text-xl font-semibold text-gray-950">
          Modelo de operación continuo
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
          La sesión no termina el trabajo — lo empieza. Tres cadencias que
          convierten al V.A.L.O.R. Review en una disciplina, no un evento.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {data.governance.map((g) => {
            const a = CADENCE_ACCENT[g.cadence];
            return (
              <div
                key={g.cadence}
                className={`rounded-2xl border bg-white p-6 shadow-sm ${a.border}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className={`text-xs font-bold uppercase tracking-widest ${a.text}`}>
                    {CADENCE_LABEL[g.cadence]}
                  </p>
                  {g.duration && (
                    <span className="text-xs font-semibold text-gray-500">
                      {g.duration}
                    </span>
                  )}
                </div>
                <h4 className="mt-2 text-base font-semibold text-gray-950">
                  {g.title}
                </h4>
                <ul className="mt-4 space-y-2">
                  {g.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-xs leading-5 text-gray-600"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Pipeline de próximos agentes ──────────────────────────── */}
      <section className="rounded-3xl border border-emerald-100 bg-emerald-50/40 p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
          Pipeline de próximos agentes
        </p>
        <h3 className="mt-2 text-xl font-semibold text-gray-950">
          Cómo aprobamos el siguiente agente — sin crecer sin control
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-700">
          {data.nextAgents.intro}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.nextAgents.criteria.map((c, i) => (
            <div
              key={c.title}
              className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-3 text-sm font-semibold text-gray-950">
                {c.title}
              </p>
              <p className="mt-2 text-xs leading-5 text-gray-600">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Principios rectores ───────────────────────────────────── */}
      <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Principios rectores del taller
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {data.guidingPrinciples.map((p) => (
            <li
              key={p}
              className="flex gap-3 text-sm leading-6 text-gray-700"
            >
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
              {p}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
