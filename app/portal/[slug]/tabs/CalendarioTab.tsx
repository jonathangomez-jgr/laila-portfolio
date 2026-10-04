import {
  betterwarePlan,
  currentPhase,
  type ISODate,
  type Activity,
  type Milestone,
} from "@/data/betterwarePlan";
import type { PortalUser } from "@/lib/portalAuth";

function startOfWeek(iso: ISODate): ISODate {
  const d = new Date(iso + "T12:00:00");
  const day = d.getDay(); // 0=Sun..6=Sat
  const diff = day === 0 ? -6 : 1 - day; // Monday as start
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

function fmtDate(iso: ISODate): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
  });
}

function fmtDay(iso: ISODate): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("es-MX", {
    weekday: "short",
    day: "2-digit",
  });
}

type WeekBucket = {
  weekStart: ISODate;
  weekEnd: ISODate;
  milestones: Milestone[];
  activityStarts: Activity[];
  activityEnds: Activity[];
};

function buildWeeks(plan: typeof betterwarePlan): WeekBucket[] {
  const map = new Map<string, WeekBucket>();

  function ensureWeek(iso: ISODate): WeekBucket {
    const key = startOfWeek(iso);
    if (!map.has(key)) {
      const end = new Date(key + "T12:00:00");
      end.setDate(end.getDate() + 6);
      map.set(key, {
        weekStart: key,
        weekEnd: end.toISOString().slice(0, 10),
        milestones: [],
        activityStarts: [],
        activityEnds: [],
      });
    }
    return map.get(key)!;
  }

  for (const m of plan.milestones) {
    ensureWeek(m.date).milestones.push(m);
  }
  for (const a of plan.activities) {
    ensureWeek(a.plannedStart).activityStarts.push(a);
    if (a.plannedEnd !== a.plannedStart) {
      ensureWeek(a.plannedEnd).activityEnds.push(a);
    }
  }

  return [...map.values()].sort((a, b) =>
    a.weekStart.localeCompare(b.weekStart),
  );
}

const MILESTONE_STYLES: Record<string, string> = {
  "Kick-off": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Go-live": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "Executive Review": "bg-blue-100 text-blue-800 border-blue-200",
  "UAT Session": "bg-amber-100 text-amber-800 border-amber-200",
  QBR: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  "Daily Standup": "bg-slate-100 text-slate-700 border-slate-200",
  "Weekly Status": "bg-slate-100 text-slate-700 border-slate-200",
  "Internal Review": "bg-slate-100 text-slate-700 border-slate-200",
};

export default function CalendarioTab({ user: _user }: { user: PortalUser }) {
  void _user;
  const plan = betterwarePlan;
  const weeks = buildWeeks(plan);
  const today = new Date().toISOString().slice(0, 10);
  const currentWeekStart = startOfWeek(today);
  const phase = currentPhase(plan);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
          Calendario del proyecto
        </p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          Línea de tiempo semana a semana
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Hitos, inicios y cierres de actividades agrupados por semana.
          Kickoff <strong>{fmtDate(plan.kickoffDate)}</strong> · Go-live{" "}
          <strong>{fmtDate(plan.endDate)}</strong>
          {phase && (
            <>
              {" "}
              · Fase actual: <strong>{phase.shortLabel}</strong>
            </>
          )}
        </p>
      </div>

      {/* Weeks */}
      <div className="space-y-3">
        {weeks.map((w) => {
          const isCurrent = w.weekStart === currentWeekStart;
          const isPast = w.weekEnd < today;
          return (
            <div
              key={w.weekStart}
              className={`rounded-xl border bg-white p-4 shadow-sm ${
                isCurrent
                  ? "border-blue-400 ring-2 ring-blue-100"
                  : isPast
                    ? "border-slate-200 opacity-70"
                    : "border-slate-200"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    Semana del
                  </p>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {fmtDate(w.weekStart)} — {fmtDate(w.weekEnd)}
                  </h3>
                </div>
                {isCurrent && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-800">
                    Esta semana
                  </span>
                )}
              </div>

              {w.milestones.length === 0 &&
              w.activityStarts.length === 0 &&
              w.activityEnds.length === 0 ? (
                <p className="text-xs text-slate-400">—</p>
              ) : (
                <div className="space-y-3">
                  {w.milestones.length > 0 && (
                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        Hitos
                      </p>
                      <ul className="space-y-1">
                        {w.milestones.map((m) => (
                          <li
                            key={m.id}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="w-24 shrink-0 font-mono text-[11px] text-slate-500">
                              {fmtDay(m.date)}
                            </span>
                            <span
                              className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold ${
                                MILESTONE_STYLES[m.kind] ??
                                "bg-slate-100 text-slate-700 border-slate-200"
                              }`}
                            >
                              {m.kind}
                            </span>
                            <span className="flex-1 text-slate-900">
                              {m.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {w.activityStarts.length > 0 && (
                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                        Comienzan
                      </p>
                      <ul className="space-y-0.5">
                        {w.activityStarts.map((a) => (
                          <li
                            key={a.id}
                            className="flex items-start gap-2 text-xs"
                          >
                            <span className="w-24 shrink-0 font-mono text-[11px] text-slate-500">
                              {fmtDay(a.plannedStart)}
                            </span>
                            <span className="flex-1 text-slate-700">
                              <span className="font-mono text-[10px] text-slate-400">
                                #{a.number}
                              </span>{" "}
                              {a.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {w.activityEnds.length > 0 && (
                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-indigo-600">
                        Entregan / cierran
                      </p>
                      <ul className="space-y-0.5">
                        {w.activityEnds.map((a) => (
                          <li
                            key={a.id}
                            className="flex items-start gap-2 text-xs"
                          >
                            <span className="w-24 shrink-0 font-mono text-[11px] text-slate-500">
                              {fmtDay(a.plannedEnd)}
                            </span>
                            <span className="flex-1 text-slate-700">
                              <span className="font-mono text-[10px] text-slate-400">
                                #{a.number}
                              </span>{" "}
                              {a.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
