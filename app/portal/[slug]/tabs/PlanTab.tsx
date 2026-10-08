import Link from "next/link";
import BetterwarePlanCanvas from "@/components/BetterwarePlanCanvas";
import FDETracker, { type TrackerTab } from "@/components/FDETracker";
import { getPlanForSlug } from "@/data/plans";
import { getTrackerForCustomer } from "@/lib/salesforce/fdeTracker";
import type { PortalUser } from "@/lib/portalAuth";
import {
  createPortalItemAction,
  updatePortalItemStatusAction,
  createPortalActivityAction,
} from "../plan-tracker-actions";

export type PlanSubTab = "timeline" | "backlog" | "activities";

export default async function PlanTab({
  user,
  slug,
  planTab = "timeline",
  customerName,
}: {
  user: PortalUser;
  slug: string;
  planTab?: PlanSubTab;
  customerName: string;
}) {
  const canEdit = user.role === "Salesforce" || user.role === "Partner";
  const plan = getPlanForSlug(slug);

  const subTabs: Array<{ id: PlanSubTab; label: string }> = [
    { id: "timeline", label: "🗓 Timeline" },
    { id: "backlog", label: "🧩 Backlog y feedback" },
    { id: "activities", label: "✅ Actividades realizadas" },
  ];

  const nav = (
    <nav className="mb-5 flex flex-wrap gap-2 border-b border-slate-200">
      {subTabs.map((t) => {
        const active = planTab === t.id;
        return (
          <Link
            key={t.id}
            href={`/portal/${slug}?tab=plan&planTab=${t.id}`}
            className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2 text-xs font-semibold transition ${
              active
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );

  // ----- Timeline (plan canvas) -----
  if (planTab === "timeline") {
    if (!plan) {
      return (
        <div className="space-y-4">
          {nav}
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
            No hay plan registrado para este proyecto todavía.
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        {nav}
        {canEdit && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-900">
            <p className="font-semibold">Edición habilitada · sync con Salesforce</p>
            <p className="mt-0.5 text-emerald-800">
              Podés mover status y avance de cualquier actividad. Los cambios se
              guardan en Salesforce y los ve todo el equipo en vivo.
            </p>
          </div>
        )}
        <BetterwarePlanCanvas readOnly={!canEdit} projectSlug={slug} plan={plan} />
      </div>
    );
  }

  // ----- Backlog / Activities (shared FDETracker) -----
  const trackerSubTab: TrackerTab =
    planTab === "activities" ? "activities" : "backlog";

  let projects: Awaited<ReturnType<typeof getTrackerForCustomer>> = [];
  let loadError: string | null = null;
  try {
    projects = await getTrackerForCustomer(slug);
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Unknown error";
  }

  if (loadError) {
    return (
      <div className="space-y-4">
        {nav}
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-900">
          <p className="font-semibold">No pudimos cargar el backlog.</p>
          <pre className="mt-2 whitespace-pre-wrap text-[11px] text-rose-800">{loadError}</pre>
        </div>
      </div>
    );
  }

  const boundCreateItemAction = createPortalItemAction.bind(null, { slug });
  const boundUpdateStatusAction = updatePortalItemStatusAction.bind(null, {
    slug,
  });
  const boundCreateActivityAction = createPortalActivityAction.bind(null, {
    slug,
  });

  return (
    <div className="space-y-4">
      {nav}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-xs text-indigo-900">
        <p className="font-semibold">Comparte tus comentarios y sugerencias aquí</p>
        <p className="mt-0.5 text-indigo-800">
          Cualquier mejora, feedback u oportunidad que detectes queda registrada
          contra el proyecto. Lo revisa el squad y se prioriza con el equipo.
        </p>
      </div>
      <div className="-mx-4 sm:-mx-5">
        <FDETracker
          projects={projects}
          customerName={customerName}
          lang="es"
          slug={slug}
          tab={trackerSubTab}
          lastRefreshedAt={new Date()}
          boundCreateItemAction={boundCreateItemAction}
          boundUpdateStatusAction={boundUpdateStatusAction}
          boundCreateActivityAction={boundCreateActivityAction}
          heading="Backlog y feedback del proyecto"
          subheading="Comparte mejoras, bugs, riesgos o decisiones que quieras sumar al tablero. El squad las revisa y las prioriza."
          tabsHrefBuilder={(t) => `/portal/${slug}?tab=plan&planTab=${t === "activities" ? "activities" : "backlog"}`}
        />
      </div>
    </div>
  );
}
