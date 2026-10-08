import BetterwarePlanCanvas from "@/components/BetterwarePlanCanvas";
import FDETracker from "@/components/FDETracker";
import { getPlanForSlug } from "@/data/plans";
import { getTrackerForCustomer } from "@/lib/salesforce/fdeTracker";
import type { PortalUser } from "@/lib/portalAuth";
import {
  createPortalItemAction,
  updatePortalItemStatusAction,
  createPortalActivityAction,
} from "../plan-tracker-actions";

export default async function PlanTab({
  user,
  slug,
  customerName,
}: {
  user: PortalUser;
  slug: string;
  customerName: string;
}) {
  const canEdit = user.role === "Salesforce" || user.role === "Partner";
  const plan = getPlanForSlug(slug);

  // Backlog + activities se cargan en paralelo con el plan (silently falls back
  // a slot vacío si Salesforce no responde — el canvas sigue funcionando sin él).
  let backlogSlot: React.ReactNode = null;
  let backlogCount: number | undefined;
  try {
    const projects = await getTrackerForCustomer(slug);
    const totalItems = projects.reduce((n, p) => n + p.items.length, 0);
    backlogCount = totalItems;

    const boundCreateItemAction = createPortalItemAction.bind(null, { slug });
    const boundUpdateStatusAction = updatePortalItemStatusAction.bind(null, {
      slug,
    });
    const boundCreateActivityAction = createPortalActivityAction.bind(null, {
      slug,
    });

    backlogSlot = (
      <div className="space-y-3">
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-xs text-indigo-900">
          <p className="font-semibold">Comentarios, feedback y oportunidades de mejora</p>
          <p className="mt-0.5 text-indigo-800">
            Captura aquí cualquier item que quieras sumar al proyecto: mejoras,
            bugs, riesgos o decisiones. El squad lo revisa y lo prioriza.
          </p>
        </div>
        <FDETracker
          projects={projects}
          customerName={customerName}
          lang="es"
          slug={slug}
          tab="backlog"
          lastRefreshedAt={new Date()}
          boundCreateItemAction={boundCreateItemAction}
          boundUpdateStatusAction={boundUpdateStatusAction}
          boundCreateActivityAction={boundCreateActivityAction}
          hideHeader
          hideInnerNav
        />
      </div>
    );
  } catch {
    // slot vacío → simplemente no se muestra el tab Backlog
  }

  if (!plan) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
        No hay plan registrado para este proyecto todavía.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {canEdit && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-900">
          <p className="font-semibold">Edición habilitada · sync con Salesforce</p>
          <p className="mt-0.5 text-emerald-800">
            Podés mover status y avance de cualquier actividad. Los cambios se
            guardan en Salesforce y los ve todo el equipo en vivo.
          </p>
        </div>
      )}
      <BetterwarePlanCanvas
        readOnly={!canEdit}
        projectSlug={slug}
        plan={plan}
        backlogSlot={backlogSlot}
        backlogCount={backlogCount}
      />
    </div>
  );
}
