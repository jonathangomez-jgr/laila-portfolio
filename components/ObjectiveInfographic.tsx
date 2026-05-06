import type { ObjectiveData } from "../data/customerDemos";

type Props = { data: ObjectiveData };

const palette = {
  indigo: {
    ring: "ring-indigo-200",
    icon: "bg-indigo-500",
    badge: "bg-indigo-50 text-indigo-700",
    connector: "bg-indigo-200",
    glow: "shadow-[0_0_32px_rgba(99,102,241,0.12)]",
    label: "text-indigo-600",
    number: "bg-indigo-500",
  },
  violet: {
    ring: "ring-violet-200",
    icon: "bg-violet-500",
    badge: "bg-violet-50 text-violet-700",
    connector: "bg-violet-200",
    glow: "shadow-[0_0_32px_rgba(139,92,246,0.12)]",
    label: "text-violet-600",
    number: "bg-violet-500",
  },
  sky: {
    ring: "ring-sky-200",
    icon: "bg-sky-500",
    badge: "bg-sky-50 text-sky-700",
    connector: "bg-sky-200",
    glow: "shadow-[0_0_32px_rgba(14,165,233,0.12)]",
    label: "text-sky-600",
    number: "bg-sky-500",
  },
} as const;

const icons = {
  indigo: (
    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  violet: (
    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  sky: (
    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function ObjectiveInfographic({ data }: Props) {
  return (
    <div className="mt-8 space-y-8">
      {/* headline central */}
      <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 text-center shadow-sm">
        <p className="mx-auto max-w-2xl text-base leading-7 text-gray-700">
          {data.headline}
        </p>
      </div>

      {/* OKRs */}
      <div className="relative grid gap-5 md:grid-cols-3">
        {/* línea conectora decorativa (solo desktop) */}
        <div className="pointer-events-none absolute left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] top-10 hidden h-px bg-gradient-to-r from-indigo-200 via-violet-200 to-sky-200 md:block" />

        {data.okrs.map((okr, i) => {
          const p = palette[okr.color];
          return (
            <div
              key={okr.label}
              className={`relative flex flex-col rounded-3xl border bg-white p-6 ring-1 ${p.ring} ${p.glow}`}
            >
              {/* número + icono */}
              <div className="mb-5 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${p.icon}`}>
                  {icons[okr.color]}
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${p.label}`}>
                  OKR {i + 1}
                </span>
              </div>

              {/* label */}
              <p className="mb-3 text-lg font-bold text-gray-950">{okr.label}</p>

              {/* descripción */}
              <p className="flex-1 text-sm leading-6 text-gray-600">
                {okr.description}
              </p>

              {/* enabler badge */}
              <div className={`mt-5 inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-xs font-semibold ${p.badge}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${p.icon}`} />
                {okr.enabler}
              </div>
            </div>
          );
        })}
      </div>

      {/* timeline rápido */}
      <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-gray-100 text-center text-sm shadow-sm">
        {[
          { period: "Hoy", action: "Discovery + alineación estratégica", bg: "bg-white" },
          { period: "90 días", action: "POC de las 3 iniciativas prioritarias con ROI demostrable", bg: "bg-indigo-50/60" },
          { period: "12 meses", action: "Plataforma agéntica end-to-end operando", bg: "bg-white" },
        ].map(({ period, action, bg }) => (
          <div key={period} className={`px-4 py-5 ${bg}`}>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-indigo-500">
              {period}
            </p>
            <p className="leading-5 text-gray-700">{action}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
