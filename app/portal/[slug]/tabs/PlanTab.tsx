import BetterwarePlanCanvas from "@/components/BetterwarePlanCanvas";
import { getPlanForSlug } from "@/data/plans";
import type { PortalUser } from "@/lib/portalAuth";

export default function PlanTab({
  user,
  slug,
}: {
  user: PortalUser;
  slug: string;
}) {
  const canEdit = user.role === "Salesforce" || user.role === "Partner";
  const plan = getPlanForSlug(slug);

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
      <BetterwarePlanCanvas readOnly={!canEdit} projectSlug={slug} plan={plan} />
    </div>
  );
}
