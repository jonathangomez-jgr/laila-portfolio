import type { AgentSpecSection } from "@/data/agentDeliverables";
import ScreenshotPlaceholder from "./ScreenshotPlaceholder";

function FieldRow({
  label,
  value,
  monospace,
  href,
}: {
  label: string;
  value: string;
  monospace?: boolean;
  href?: string;
}) {
  const isExternal = href?.startsWith("http");
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-gray-100 py-3 last:border-b-0 sm:grid-cols-[220px_1fr] sm:items-baseline sm:gap-4">
      <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
        {label}
      </dt>
      <dd
        className={`text-sm leading-6 text-gray-800 ${
          monospace ? "font-mono text-[13px] break-all" : ""
        }`}
      >
        {href ? (
          <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 px-2 py-1 font-medium text-indigo-700 no-underline hover:bg-indigo-100 hover:text-indigo-900"
          >
            {value}
            <span aria-hidden className="text-xs">↗</span>
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function SubHeader({
  order,
  title,
  subtitle,
}: {
  order: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-600">
        {order}
      </span>
      <div>
        <h3 className="text-lg font-semibold text-gray-950">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 text-xs leading-5 text-gray-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default function AgentSpecPanel({ spec }: { spec: AgentSpecSection }) {
  return (
    <div className="mt-8 space-y-12">
      {/* Identidad */}
      <section>
        <SubHeader
          order="3.1"
          title="Identidad del agente"
          subtitle="Datos verbatim del retrieve SFDX de la sandbox QA."
        />
        <div className="soft-card p-6">
          <dl>
            {spec.identity.map((f) => (
              <FieldRow
                key={f.label}
                label={f.label}
                value={f.value}
                monospace={f.monospace}
                href={f.href}
              />
            ))}
          </dl>
        </div>
      </section>

      {/* Bot user */}
      <section>
        <SubHeader
          order="3.2"
          title="Usuario del agente"
          subtitle="Usuario de servicio que ejecuta cada invocación del agente."
        />
        <div className="soft-card p-6">
          <dl>
            {spec.botUser.map((f) => (
              <FieldRow
                key={f.label}
                label={f.label}
                value={f.value}
                monospace={f.monospace}
                href={f.href}
              />
            ))}
          </dl>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-3">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500">
                Permission Sets asignados
              </p>
              <span className="ml-auto rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600">
                {spec.permissionSets.length}
              </span>
            </div>
            <ul className="divide-y divide-gray-100">
              {spec.permissionSets.map((p) => (
                <li key={p.name} className="px-5 py-4">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p className="font-mono text-[13px] font-semibold text-gray-900">
                      {p.name}
                    </p>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                      {p.type}
                    </span>
                    {p.license && (
                      <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-600">
                        Lic: {p.license}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-gray-600">
                    {p.purpose}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-lg">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                Permission Set Licenses
              </p>
              <span className="ml-auto rounded-full bg-violet-500/20 px-2.5 py-0.5 text-xs font-bold text-violet-300">
                {spec.permissionSetLicenses.length}
              </span>
            </div>
            <ul className="divide-y divide-white/5">
              {spec.permissionSetLicenses.map((psl) => (
                <li key={psl} className="px-5 py-4 text-sm leading-6 text-slate-200">
                  {psl}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Voz */}
      <section>
        <SubHeader
          order="3.3"
          title="Configuración de voz"
          subtitle="Canal telefónico, motor de síntesis y ruta de escalación."
        />
        <div className="soft-card p-6">
          <dl>
            {spec.voiceConfig.map((f) => (
              <FieldRow
                key={f.label}
                label={f.label}
                value={f.value}
                monospace={f.monospace}
                href={f.href}
              />
            ))}
          </dl>
        </div>
      </section>

      {/* Topics */}
      <section>
        <SubHeader
          order="3.4"
          title="Topics y acciones"
          subtitle="Los 7 subagents que estructuran las capacidades del agente."
        />
        <div className="space-y-3">
          {spec.topics.map((t, i) => (
            <div
              key={t.name}
              className="soft-card overflow-hidden p-0"
            >
              <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-indigo-50/60 to-blue-50/60 px-5 py-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-bold text-indigo-600 shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-[13px] font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500">{t.label}</p>
                </div>
                <span
                  className={`ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    t.requiresVerification
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {t.requiresVerification ? "Requiere verificación" : "Público"}
                </span>
              </div>
              <div className="grid gap-4 px-5 py-4 md:grid-cols-[1fr_260px]">
                <p className="text-sm leading-6 text-gray-700">
                  {t.description}
                </p>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                    Actions
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {t.actions.map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-2 text-xs leading-5 text-gray-700"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                        <span className="font-mono text-[12px]">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Knowledge */}
      <section>
        <SubHeader
          order="3.5"
          title="Data Library — base de conocimiento"
          subtitle="Cómo el agente accede a la fuente autoritativa vía RAG."
        />
        <div className="soft-card p-6">
          <dl>
            {spec.knowledge.map((f) => (
              <FieldRow
                key={f.label}
                label={f.label}
                value={f.value}
                monospace={f.monospace}
                href={f.href}
              />
            ))}
          </dl>
        </div>
      </section>

      {/* Guardrails */}
      <section>
        <SubHeader
          order="3.6"
          title="Guardrails y Trust Layer"
          subtitle="Reglas duras del sistema — reflejan las instrucciones del agent script."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {spec.guardrails.map((g) => (
            <div
              key={g.category}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500">
                {g.category}
              </p>
              <ul className="mt-3 space-y-2">
                {g.rules.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-2 text-sm leading-6 text-gray-700"
                  >
                    <svg
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshots */}
      <section>
        <SubHeader
          order="3.7"
          title="Evidencia visual del sandbox"
          subtitle="Espacios listos para insertar las capturas oficiales."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {spec.screenshots.map((s, i) => (
            <ScreenshotPlaceholder key={s.id} placeholder={s} index={i} />
          ))}
        </div>
      </section>

      {/* Growth statement */}
      {spec.growthStatement && (
        <section
          aria-labelledby="growth-headline"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-600 p-1 shadow-[0_28px_70px_rgba(76,89,255,0.35)]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl"
          />

          <div className="relative rounded-[calc(1.5rem-4px)] bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-8 sm:p-12">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.32em] text-indigo-300"
            >
              {spec.growthStatement.eyebrow}
            </p>

            <h3
              id="growth-headline"
              className="mt-4 max-w-3xl text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl"
            >
              {spec.growthStatement.headline}
            </h3>

            <p className="mt-5 max-w-3xl text-base leading-7 text-indigo-100/90 sm:text-lg">
              {spec.growthStatement.body}
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {spec.growthStatement.pillars.map((p, i) => (
                <div
                  key={p.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                >
                  <span
                    aria-hidden
                    className="absolute right-4 top-4 font-mono text-xs text-white/25"
                  >
                    0{i + 1}
                  </span>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-violet-400 text-white shadow-lg">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-base font-semibold leading-snug text-white">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-indigo-100/85">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <p className="text-base font-medium italic leading-7 text-white">
                {spec.growthStatement.closing}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
