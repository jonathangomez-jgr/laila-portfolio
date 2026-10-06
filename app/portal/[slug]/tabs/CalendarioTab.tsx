import { getPlanForSlug, currentPhase } from "@/data/plans";
import BetterwarePlanCanvas from "@/components/BetterwarePlanCanvas";
import type { PortalUser } from "@/lib/portalAuth";

type ISODate = string;

function fmtDate(iso: ISODate): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
  });
}

export default function CalendarioTab({
  user: _user,
  slug,
}: {
  user: PortalUser;
  slug: string;
}) {
  void _user;
  const plan = getPlanForSlug(slug);

  if (!plan) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
        No hay calendario registrado para este proyecto todavía.
      </div>
    );
  }

  const phase = currentPhase(plan);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
          Calendario del proyecto
        </p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          Vista mensual con hitos
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Tres meses del plan con los hitos marcados por día. Hacé click en una
          celda con punto para ver qué hito cae ese día. Kickoff{" "}
          <strong>{fmtDate(plan.kickoffDate)}</strong> · Go-live{" "}
          <strong>{fmtDate(plan.endDate)}</strong>
          {phase && (
            <>
              {" "}
              · Fase actual: <strong>{phase.shortLabel}</strong>
            </>
          )}
        </p>
      </div>

      {/* Grid de calendario (reutiliza la vista "calendar" del canvas) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <BetterwarePlanCanvas onlyView="calendar" readOnly plan={plan} />
      </div>
    </div>
  );
}
