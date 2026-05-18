export default function LailaSystemLandscapePlaceholder() {
  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 shadow-[0_24px_60px_rgba(30,27,75,0.32)] ring-1 ring-white/10">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/8 px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            System Landscape
          </p>
        </div>
        <p className="text-xs font-medium text-slate-500">Laila · VivaLux</p>
      </div>

      {/* Placeholder body */}
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-5 p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10">
          <svg className="h-7 w-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
        </div>

        <div>
          <p className="text-base font-semibold text-slate-200">Diagrama en construcción</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
            El diagrama de System Landscape de Laila se publicará en una próxima versión.
            Incluirá zonas de integración, data flows y componentes de Agentforce.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {["Agentforce", "Data Cloud", "Service Cloud", "MuleSoft", "External APIs"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
