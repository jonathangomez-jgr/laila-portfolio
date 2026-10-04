import Link from "next/link";
import {
  betterwarePlan,
  currentPhase,
  upcomingMilestones,
  globalProgress,
  overallHealth,
} from "@/data/betterwarePlan";
import type { PortalUser } from "@/lib/portalAuth";

const HEALTH_LABEL: Record<string, { label: string; cls: string }> = {
  green: { label: "En verde", cls: "bg-emerald-100 text-emerald-800" },
  yellow: { label: "Atención", cls: "bg-amber-100 text-amber-800" },
  red: { label: "Riesgo", cls: "bg-rose-100 text-rose-800" },
};

const INTRO_BY_ROLE: Record<string, string> = {
  Salesforce:
    "Vista completa del proyecto. Desde acá podés navegar al Plan maestro, la Matriz de pruebas y los documentos ejecutivos.",
  Partner:
    "Acá vas a seguir el avance del rewrite del Service Agent y las sesiones del Programa Insiders. Tenés acceso al Plan y a las pruebas.",
  Client:
    "Resumen ejecutivo del rewrite de Betty. Acá vas a ver avances semanales, documentos compartibles y los hitos clave del Programa Insiders.",
};

const KEY_DOCS = [
  {
    slug: "programa-insiders",
    label: "Programa Insiders · Betty",
    description: "Pilot con 15–25 distribuidores. Cutover 2026-10-16.",
    url: "/Customers/Betterware/files/Programa_Insiders_Betty.html",
    icon: "📘",
    visibleTo: ["Salesforce", "Partner", "Client"] as const,
  },
  {
    slug: "presentacion-partner",
    label: "Presentación · Partner + Betterware",
    description: "Deck del kickoff · 10 slides · tono business.",
    url: "/Customers/Betterware/files/Presentacion_Partner_FDE.html",
    icon: "🎯",
    visibleTo: ["Salesforce", "Partner", "Client"] as const,
  },
  {
    slug: "reporte-descubrimientos",
    label: "Reporte de descubrimientos · BW_AGENT_N",
    description: "16 hallazgos del agente actual, verificados contra la org.",
    url: "/Customers/Betterware/files/BW_AGENT_N%20%E2%80%94%20Reporte%20de%20descubrimientos.pdf",
    icon: "🧪",
    visibleTo: ["Salesforce", "Partner"] as const,
  },
];

function fmtDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function OverviewTab({
  slug,
  user,
}: {
  slug: string;
  user: PortalUser;
}) {
  const plan = betterwarePlan;
  const phase = currentPhase(plan);
  const upcoming = upcomingMilestones(plan, undefined, 3);
  const progress = globalProgress(plan);
  const health = overallHealth(plan);
  const healthMeta = HEALTH_LABEL[health];
  const docs = KEY_DOCS.filter((d) =>
    (d.visibleTo as readonly string[]).includes(user.role),
  );

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
              Estado del proyecto
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
              Hola, {user.name.split(" ")[0]} 👋
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              {INTRO_BY_ROLE[user.role] ?? ""}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-semibold ${healthMeta.cls}`}
          >
            {healthMeta.label}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Fase actual
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {phase ? `${phase.shortLabel} · ${phase.title}` : "—"}
            </p>
            {phase && (
              <p className="mt-1 text-[11px] text-slate-500">
                {fmtDate(phase.startDate)} → {fmtDate(phase.endDate)}
              </p>
            )}
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Avance global
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {progress}%
            </p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-blue-600"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Kickoff · Go-live
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {fmtDate(plan.kickoffDate)}
            </p>
            <p className="text-[11px] text-slate-500">
              → {fmtDate(plan.endDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Próximos hitos */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
              Próximos hitos
            </p>
            <h3 className="mt-1 text-base font-semibold text-slate-900">
              Lo que viene en las próximas semanas
            </h3>
          </div>
          <Link
            href={`/portal/${slug}?tab=plan`}
            className="text-xs font-semibold text-blue-700 hover:underline"
          >
            Ver plan completo →
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            No hay hitos programados en esta ventana.
          </p>
        ) : (
          <ul className="mt-4 space-y-2.5">
            {upcoming.map((m) => (
              <li
                key={m.id}
                className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5"
              >
                <div className="min-w-[80px] text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-600">
                    {new Date(m.date + "T12:00:00").toLocaleDateString("es-MX", {
                      month: "short",
                    })}
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    {new Date(m.date + "T12:00:00").getDate()}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {m.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-600">
                    {m.description}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    {m.kind}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Documentos clave */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
              Documentos clave
            </p>
            <h3 className="mt-1 text-base font-semibold text-slate-900">
              Para arrancar
            </h3>
          </div>
          <Link
            href={`/portal/${slug}?tab=documentos`}
            className="text-xs font-semibold text-blue-700 hover:underline"
          >
            Ver todos →
          </Link>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((d) => (
            <a
              key={d.slug}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="text-2xl">{d.icon}</div>
              <p className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                {d.label}
              </p>
              <p className="mt-1 text-xs text-slate-600">{d.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
