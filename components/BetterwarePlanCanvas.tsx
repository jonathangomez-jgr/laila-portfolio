"use client";

import { useEffect, useMemo, useState } from "react";
import { betterwarePlan } from "../data/betterwarePlan";
import {
  type ProjectPlan,
  phaseProgress,
  phaseStatus,
  globalProgress,
  overallHealth,
} from "../data/plans";
import type {
  Activity,
  ActivityStatus,
  ActivityType,
  BetterwarePlan,
  HealthColor,
  Milestone,
  MilestoneKind,
  OwnerTag,
  Phase,
  Risk,
} from "../data/betterwarePlan";

type ViewTab =
  | "dashboard"
  | "gantt"
  | "calendar"
  | "activities"
  | "milestones"
  | "risks"
  | "stable"
  | "status";

type Override = { status: ActivityStatus; progressPercent: number };
type OverrideMap = Record<string, Override>;
const OVERRIDES_KEY = "betterware-plan-overrides-v1";

const STATUS_STYLES: Record<ActivityStatus, string> = {
  "not-started": "bg-slate-100 text-slate-600 border-slate-200",
  "in-progress": "bg-emerald-50 text-emerald-700 border-emerald-200",
  blocked: "bg-rose-50 text-rose-700 border-rose-200",
  done: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

const STATUS_LABELS: Record<ActivityStatus, string> = {
  "not-started": "Pendiente",
  "in-progress": "En curso",
  blocked: "Bloqueada",
  done: "Done",
};

function StatusDot({ status }: { status: ActivityStatus }) {
  if (status === "done") {
    return (
      <span
        className="inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-emerald-500 text-white"
        title="Completada"
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-2.5 w-2.5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10l4 4 8-8" />
        </svg>
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span
        className="inline-flex h-4 w-4 flex-none items-center justify-center rounded-full border-2 border-emerald-500 bg-white"
        title="En curso"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
      </span>
    );
  }
  if (status === "blocked") {
    return (
      <span
        className="inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-rose-500 text-[9px] font-black leading-none text-white"
        title="Bloqueada"
      >
        !
      </span>
    );
  }
  return (
    <span
      className="inline-flex h-4 w-4 flex-none rounded-full border border-slate-300 bg-white"
      title="Pendiente"
    />
  );
}

const OWNER_STYLES: Record<OwnerTag, string> = {
  "Salesforce - FDE": "bg-blue-100 text-blue-900",
  "Salesforce - CSM": "bg-sky-100 text-sky-900",
  "Salesforce - AE": "bg-indigo-100 text-indigo-900",
  "Salesforce - Support": "bg-cyan-100 text-cyan-900",
  Partner: "bg-amber-100 text-amber-900",
  "Betterware - Sponsor": "bg-fuchsia-100 text-fuchsia-900",
  "Betterware - IT Lead": "bg-violet-100 text-violet-900",
  "Betterware - UAT": "bg-pink-100 text-pink-900",
  Shared: "bg-slate-200 text-slate-900",
};

const TYPE_STYLES: Record<ActivityType, string> = {
  Dev: "bg-emerald-100 text-emerald-800",
  Test: "bg-amber-100 text-amber-800",
  Deploy: "bg-indigo-100 text-indigo-800",
  Mgmt: "bg-slate-100 text-slate-700",
  Ops: "bg-orange-100 text-orange-800",
  Doc: "bg-neutral-100 text-neutral-700",
  Config: "bg-cyan-100 text-cyan-800",
  Review: "bg-violet-100 text-violet-800",
};

const HEALTH_LABEL: Record<HealthColor, { label: string; className: string }> = {
  green: { label: "Verde", className: "bg-emerald-500 text-white" },
  yellow: { label: "Amarillo", className: "bg-amber-500 text-white" },
  red: { label: "Rojo", className: "bg-rose-500 text-white" },
};

const MILESTONE_KIND_COLOR: Record<MilestoneKind, string> = {
  "Executive Review": "#E8275A",
  "Kick-off": "#066AFE",
  "UAT Session": "#F28B42",
  "Go-live": "#10B981",
  QBR: "#8B5CF6",
  "Internal Review": "#64748B",
  "Daily Standup": "#06B6D4",
  "Weekly Status": "#A3A3A3",
};

function fmtDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-MX", { month: "short", day: "numeric" });
}

function todayISO(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function daysBetween(aIso: string, bIso: string): number {
  const a = new Date(aIso + "T00:00:00").getTime();
  const b = new Date(bIso + "T00:00:00").getTime();
  return Math.round((b - a) / (24 * 3600 * 1000));
}

function inRange(iso: string, startIso: string, endIso: string): boolean {
  return iso >= startIso && iso <= endIso;
}

function Chip({ label, className }: { label: string; className: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${className}`}>
      {label}
    </span>
  );
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
      />
    </div>
  );
}

// --- PHASE TIMELINE (vista horizontal · 6 fases) ---------------------------

function MilestoneTimeline({ plan }: { plan: BetterwarePlan }) {
  const today = todayISO();

  const activePhase = plan.phases.find(
    (p) => p.startDate <= today && today <= p.endDate,
  );
  const prePhase = plan.phases.find((p) => today < p.startDate);
  const isClosed = !activePhase && !prePhase;

  function phaseState(p: Phase): "past" | "active" | "future" {
    if (p.endDate < today) return "past";
    if (p.startDate <= today && today <= p.endDate) return "active";
    return "future";
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-5">
      {/* Header con fase activa */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
            Línea de tiempo del proyecto
          </p>
          <h3 className="text-xl font-semibold text-slate-900">
            {plan.phases.length} fases · {fmtDate(plan.kickoffDate)} – {fmtDate(plan.endDate)}
          </h3>
        </div>
        {activePhase ? (
          <div
            className="rounded-lg border px-4 py-2 text-xs"
            style={{
              background: `${activePhase.color}15`,
              borderColor: activePhase.color,
              color: activePhase.color,
            }}
          >
            <span className="font-semibold uppercase tracking-wide">
              Fase activa
            </span>
            <div className="mt-0.5 text-sm font-semibold text-slate-900">
              {activePhase.shortLabel} · {activePhase.title}
            </div>
            <div className="font-mono text-[10px] text-slate-500">
              {fmtDate(activePhase.startDate)} – {fmtDate(activePhase.endDate)}
            </div>
          </div>
        ) : prePhase ? (
          <div className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs">
            <span className="font-semibold uppercase tracking-wide text-slate-500">
              Pre-kickoff
            </span>
            <div className="mt-0.5 text-sm font-semibold text-slate-900">
              Siguiente: {prePhase.shortLabel}
            </div>
            <div className="font-mono text-[10px] text-slate-500">
              Inicia {fmtDate(prePhase.startDate)}
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs">
            <span className="font-semibold uppercase tracking-wide text-emerald-700">
              Proyecto cerrado
            </span>
          </div>
        )}
      </div>

      {/* Timeline horizontal con 6 fases */}
      <div className="relative overflow-x-auto pb-2">
        <div
          className="relative flex items-start"
          style={{ minWidth: `${plan.phases.length * 170}px` }}
        >
          {/* línea conectora */}
          <div className="absolute left-0 right-0 top-[46px] h-0.5 bg-slate-300" />
          {plan.phases.map((p) => {
            const state = phaseState(p);
            const isPast = state === "past";
            const isActive = state === "active";
            return (
              <div
                key={p.id}
                className="relative flex flex-1 flex-shrink-0 flex-col items-center px-3"
                style={{ minWidth: "170px" }}
              >
                {/* Fecha de inicio arriba */}
                <div
                  className={`mb-2 font-mono text-[10px] font-semibold uppercase tracking-wide ${
                    isPast ? "text-slate-400" : "text-slate-700"
                  }`}
                >
                  {fmtDate(p.startDate)}
                </div>
                {/* Dot */}
                <div
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-[3px] bg-white transition-shadow ${
                    isActive ? "ring-4 ring-offset-2" : ""
                  }`}
                  style={{
                    borderColor: isPast ? "#94A3B8" : p.color,
                    ...(isActive
                      ? { boxShadow: `0 0 0 4px ${p.color}30` }
                      : {}),
                  }}
                  title={p.title}
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      background: isPast ? "transparent" : p.color,
                    }}
                  />
                </div>
                {/* Short label + título */}
                <div className="mt-2 text-center">
                  <div
                    className="inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                    style={{
                      background: isPast ? "#94A3B8" : p.color,
                      opacity: isPast ? 0.6 : 1,
                    }}
                  >
                    {p.shortLabel}
                  </div>
                  <div
                    className={`mt-1.5 text-xs font-semibold leading-tight ${
                      isPast
                        ? "text-slate-500"
                        : isActive
                          ? "text-slate-900"
                          : "text-slate-700"
                    }`}
                  >
                    {p.title}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-slate-500">
                    {fmtDate(p.startDate)} – {fmtDate(p.endDate)}
                  </div>
                </div>
                {/* Badge "ACTIVA" sobre el dot */}
                {isActive && (
                  <div
                    className="absolute -top-5 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-bold uppercase text-white shadow"
                    style={{ background: p.color }}
                  >
                    Activa
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mensaje si está cerrado */}
      {isClosed && (
        <p className="mt-3 text-center text-xs text-emerald-700">
          Todas las fases finalizaron. Proyecto cerrado.
        </p>
      )}
    </div>
  );
}

function PhaseCard({ phase, progress, status }: { phase: Phase; progress: number; status: ActivityStatus }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div
            className="mb-1 inline-flex items-center gap-2 rounded-md px-2 py-0.5 text-[11px] font-semibold text-white"
            style={{ background: phase.color }}
          >
            {phase.shortLabel}
          </div>
          <h4 className="text-sm font-semibold text-slate-900">{phase.title}</h4>
          <p className="mt-0.5 text-[11px] text-slate-500">
            {fmtDate(phase.startDate)} – {fmtDate(phase.endDate)}
          </p>
        </div>
        <Chip label={STATUS_LABELS[status]} className={STATUS_STYLES[status]} />
      </div>
      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-[11px] text-slate-600">
          <span>Avance</span>
          <span className="font-mono font-semibold">{progress}%</span>
        </div>
        <ProgressBar value={progress} color={phase.color} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">{phase.objective}</p>
    </div>
  );
}

function MilestoneRow({ m }: { m: Milestone }) {
  const past = m.date < todayISO();
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 py-2 last:border-0">
      <div
        className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
          m.status === "completed" ? "bg-emerald-500" : past ? "bg-rose-400" : "bg-slate-300"
        }`}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <h5 className="text-sm font-semibold text-slate-900">{m.title}</h5>
          <span className="font-mono text-[11px] text-slate-500">{fmtDate(m.date)}</span>
        </div>
        <p className="text-[11px] text-slate-600">{m.description}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          <Chip label={m.kind} className="bg-violet-100 text-violet-800" />
          {m.participants.slice(0, 3).map((p) => (
            <Chip key={p} label={p} className={OWNER_STYLES[p]} />
          ))}
        </div>
        {m.references && m.references.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {m.references.map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 hover:bg-blue-100"
              >
                📎 {r.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- THIS WEEK CARD ---------------------------------------------------------

function ThisWeekCard({
  activities,
  phases,
  milestones,
  kickoffDate,
  endDate,
}: {
  activities: Activity[];
  phases: Phase[];
  milestones: Milestone[];
  kickoffDate: string;
  endDate: string;
}) {
  const today = todayISO();
  const preKickoff = today < kickoffDate;
  const postEnd = today > endDate;

  const activePhase = phases.find((p) => inRange(today, p.startDate, p.endDate));
  const nextMilestone = milestones
    .filter((m) => m.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  // Pre-kickoff: anchor on F0
  if (preKickoff) {
    const f0 = phases[0];
    const daysToKickoff = daysBetween(today, kickoffDate);
    const daysToF0Start = daysBetween(today, f0.startDate);
    const bg = `linear-gradient(135deg, ${f0.color} 0%, ${phases[1]?.color || f0.color} 100%)`;
    return (
      <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg" style={{ background: bg }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/80">Esta semana</p>
            <h3 className="mt-1 text-2xl font-bold">Pre-kickoff</h3>
            <p className="mt-1 text-sm text-white/85">
              {daysToKickoff > 0
                ? `Kick-off ejecutivo en ${daysToKickoff} día${daysToKickoff === 1 ? "" : "s"} · ${fmtDate(kickoffDate)}`
                : `Kick-off ejecutivo hoy · ${fmtDate(kickoffDate)}`}
            </p>
            <p className="mt-0.5 text-xs text-white/70">
              {daysToF0Start > 0
                ? `Fase 0 inicia en ${daysToF0Start} día${daysToF0Start === 1 ? "" : "s"}`
                : `Fase 0 ya iniciada · revisión interna hoy`}
            </p>
          </div>
          <div className="rounded-lg bg-white/15 px-3 py-2 text-right backdrop-blur">
            <p className="text-[10px] uppercase tracking-wide text-white/70">Próximo milestone</p>
            <p className="mt-0.5 text-sm font-semibold">{nextMilestone?.title ?? "—"}</p>
            {nextMilestone && (
              <p className="font-mono text-[11px] text-white/80">{fmtDate(nextMilestone.date)}</p>
            )}
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="rounded-lg bg-white/10 p-3 backdrop-blur">
            <p className="text-[10px] uppercase tracking-wide text-white/70">Fase que arranca</p>
            <p className="mt-1 text-sm font-semibold">{f0.shortLabel} · {f0.title}</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3 backdrop-blur">
            <p className="text-[10px] uppercase tracking-wide text-white/70">Actividades F0</p>
            <p className="mt-1 text-sm font-semibold">
              {activities.filter((a) => a.phaseId === f0.id).length} planificadas
            </p>
          </div>
          <div className="rounded-lg bg-white/10 p-3 backdrop-blur">
            <p className="text-[10px] uppercase tracking-wide text-white/70">Avance global</p>
            <p className="mt-1 text-sm font-semibold">0% · aún no iniciado</p>
          </div>
        </div>
      </div>
    );
  }

  if (postEnd) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 text-white shadow-lg">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/80">Esta semana</p>
        <h3 className="mt-1 text-2xl font-bold">Proyecto cerrado</h3>
        <p className="mt-1 text-sm text-white/85">
          El plan concluyó el {fmtDate(endDate)}. Fase 4 completada.
        </p>
      </div>
    );
  }

  if (!activePhase) {
    return (
      <div className="rounded-2xl bg-slate-700 p-6 text-white shadow-lg">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/80">Esta semana</p>
        <h3 className="mt-1 text-2xl font-bold">Entre fases</h3>
        <p className="mt-1 text-sm text-white/85">No hay fase activa para la fecha de hoy.</p>
      </div>
    );
  }

  const weekActivities = activities.filter(
    (a) => a.phaseId === activePhase.id && inRange(today, a.plannedStart, a.plannedEnd),
  );
  const doneCount = weekActivities.filter((a) => a.status === "done").length;
  const totalCount = weekActivities.length;
  const weekProgress = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);
  const activeBlockers = activities.reduce(
    (n, a) => n + a.blockers.filter((b) => !b.resolvedDate).length,
    0,
  );
  const phaseProg = Math.round(
    activities
      .filter((a) => a.phaseId === activePhase.id)
      .reduce((s, a) => s + a.progressPercent, 0) /
      Math.max(1, activities.filter((a) => a.phaseId === activePhase.id).length),
  );

  const bg = `linear-gradient(135deg, ${activePhase.color} 0%, ${activePhase.color}DD 100%)`;

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg" style={{ background: bg }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/80">Esta semana</p>
          <h3 className="mt-1 text-2xl font-bold">
            {activePhase.shortLabel} · {activePhase.title}
          </h3>
          <p className="mt-1 text-sm text-white/85">{activePhase.objective}</p>
        </div>
        <div className="rounded-lg bg-white/15 px-3 py-2 text-right backdrop-blur">
          <p className="text-[10px] uppercase tracking-wide text-white/70">Próximo milestone</p>
          <p className="mt-0.5 text-sm font-semibold">{nextMilestone?.title ?? "—"}</p>
          {nextMilestone && (
            <p className="font-mono text-[11px] text-white/80">{fmtDate(nextMilestone.date)}</p>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-lg bg-white/10 p-3 backdrop-blur">
          <p className="text-[10px] uppercase tracking-wide text-white/70">Avance fase</p>
          <p className="mt-1 font-mono text-xl font-bold">{phaseProg}%</p>
        </div>
        <div className="rounded-lg bg-white/10 p-3 backdrop-blur">
          <p className="text-[10px] uppercase tracking-wide text-white/70">Semana</p>
          <p className="mt-1 font-mono text-xl font-bold">
            {doneCount}/{totalCount}
          </p>
          <div className="mt-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white" style={{ width: `${weekProgress}%` }} />
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white/10 p-3 backdrop-blur">
          <p className="text-[10px] uppercase tracking-wide text-white/70">Blockers activos</p>
          <p className={`mt-1 font-mono text-xl font-bold ${activeBlockers > 0 ? "text-rose-200" : ""}`}>
            {activeBlockers}
          </p>
        </div>
      </div>

      {weekActivities.length > 0 && (
        <div className="mt-4 rounded-lg bg-white/10 p-3 backdrop-blur">
          <p className="mb-2 text-[10px] uppercase tracking-wide text-white/70">
            Actividades esta semana ({weekActivities.length})
          </p>
          <ul className="space-y-1.5">
            {weekActivities.slice(0, 6).map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-[10px] text-white/60">#{a.number}</span>
                  <span className="truncate text-white/95">{a.title}</span>
                </div>
                <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[a.status]}`}>
                  {STATUS_LABELS[a.status]}
                </span>
              </li>
            ))}
          </ul>
          {weekActivities.length > 6 && (
            <p className="mt-2 text-[11px] text-white/70">+{weekActivities.length - 6} más…</p>
          )}
        </div>
      )}
    </div>
  );
}

// --- ACTIVITY DETAIL (with edit mode) ----------------------------------------

function ActivityDetail({
  activity,
  onClose,
  onUpdate,
  readOnly = false,
  persistenceLabel,
}: {
  activity: Activity;
  onClose: () => void;
  onUpdate: (status: ActivityStatus, progressPercent: number) => void;
  readOnly?: boolean;
  persistenceLabel?: string;
}) {
  const [status, setStatus] = useState<ActivityStatus>(activity.status);
  const [progress, setProgress] = useState<number>(activity.progressPercent);

  useEffect(() => {
    setStatus(activity.status);
    setProgress(activity.progressPercent);
  }, [activity.id, activity.status, activity.progressPercent]);

  function pick(newStatus: ActivityStatus) {
    const autoProgress =
      newStatus === "done" ? 100 : newStatus === "not-started" ? 0 : progress;
    setStatus(newStatus);
    setProgress(autoProgress);
    onUpdate(newStatus, autoProgress);
  }

  function slide(v: number) {
    setProgress(v);
    onUpdate(status, v);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-slate-900/40 p-0 sm:items-center sm:justify-center sm:p-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs text-slate-500">#{activity.number}</p>
            <h3 className="text-lg font-semibold text-slate-900">{activity.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
          >
            Cerrar
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <Chip label={STATUS_LABELS[status]} className={STATUS_STYLES[status]} />
          <Chip label={activity.type} className={TYPE_STYLES[activity.type]} />
          <Chip label={activity.owner} className={OWNER_STYLES[activity.owner]} />
          {activity.delegableToPartner && (
            <Chip label="Delegable a Partner" className="bg-amber-50 text-amber-700" />
          )}
          <Chip label={`Semana ${activity.week}`} className="bg-slate-100 text-slate-700" />
        </div>

        <div className="mb-4">
          <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Descripción</h4>
          <p className="text-sm leading-relaxed text-slate-700">{activity.description}</p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Fechas planeadas
            </h4>
            <p className="font-mono text-sm text-slate-700">
              {fmtDate(activity.plannedStart)} – {fmtDate(activity.plannedEnd)}
            </p>
          </div>
          <div>
            <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Fechas reales
            </h4>
            <p className="font-mono text-sm text-slate-700">
              {activity.actualStart ? fmtDate(activity.actualStart) : "—"}
              {" – "}
              {activity.actualEnd ? fmtDate(activity.actualEnd) : "—"}
            </p>
          </div>
        </div>

        {activity.collaborators.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Colaboradores
            </h4>
            <div className="flex flex-wrap gap-1">
              {activity.collaborators.map((c) => (
                <Chip key={c} label={c} className={OWNER_STYLES[c]} />
              ))}
            </div>
          </div>
        )}

        {activity.deliverables.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Entregables</h4>
            <ul className="list-disc pl-4 text-sm text-slate-700">
              {activity.deliverables.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        )}

        {activity.dependencies.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Depende de</h4>
            <div className="flex flex-wrap gap-1 font-mono text-xs">
              {activity.dependencies.map((d) => (
                <span key={d} className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-700">
                  #{d}
                </span>
              ))}
            </div>
          </div>
        )}

        {activity.tags.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Tags</h4>
            <div className="flex flex-wrap gap-1">
              {activity.tags.map((t) => (
                <Chip key={t} label={t} className="bg-slate-100 text-slate-700" />
              ))}
            </div>
          </div>
        )}

        {activity.references.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Referencias</h4>
            <ul className="space-y-1">
              {activity.references.map((r, i) => (
                <li key={i}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 underline-offset-2 hover:underline"
                  >
                    {r.label} <span className="text-[11px] text-slate-500">· {r.kind}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activity.blockers.length > 0 && (
          <div className="mb-4 rounded-md bg-rose-50 p-3">
            <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-rose-700">
              Blockers activos
            </h4>
            <ul className="space-y-1 text-sm text-rose-900">
              {activity.blockers
                .filter((b) => !b.resolvedDate)
                .map((b) => (
                  <li key={b.id}>
                    <span className="font-mono text-[11px]">[{fmtDate(b.raisedDate)}]</span> {b.description}{" "}
                    <span className="text-[11px] text-rose-700">· {b.owner}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {activity.updates.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Historial de updates
            </h4>
            <ul className="space-y-1 border-l border-slate-200 pl-3 text-sm text-slate-700">
              {activity.updates.map((u, i) => (
                <li key={i}>
                  <span className="font-mono text-[11px] text-slate-500">
                    [{fmtDate(u.date)} · {u.author}]
                  </span>{" "}
                  {u.note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* EDIT MODE */}
        {!readOnly && (
          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-700">
              Actualizar estado
            </h4>
            <div className="mb-3 flex flex-wrap gap-2">
              {(["not-started", "in-progress", "blocked", "done"] as ActivityStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => pick(s)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                    status === s
                      ? `${STATUS_STYLES[s]} ring-2 ring-blue-300`
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-blue-700">Avance</label>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={progress}
                onChange={(e) => slide(Number(e.target.value))}
                className="flex-1 accent-blue-600"
              />
              <span className="w-12 text-right font-mono text-sm font-bold text-blue-900">{progress}%</span>
            </div>
            <p className="mt-2 text-[11px] text-blue-700/70">
              {persistenceLabel ??
                "Los cambios se guardan localmente en tu navegador. Exporta el patch desde el header para persistirlo en el repo."}
            </p>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md border border-slate-200 bg-white px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

// --- CALENDAR MONTH ---------------------------------------------------------

function MonthGrid({
  year,
  month,
  milestones,
  kickoffDate,
  endDate,
  onPickDay,
  selectedDay,
}: {
  year: number;
  month: number; // 0-11
  milestones: Milestone[];
  kickoffDate: string;
  endDate: string;
  onPickDay: (iso: string | null) => void;
  selectedDay: string | null;
}) {
  const monthName = new Date(year, month, 1).toLocaleDateString("es-MX", { month: "long", year: "numeric" });
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // mon=0
  const totalCells = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7;
  const today = todayISO();

  const cells: Array<{ iso: string | null; day: number | null }> = [];
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - startOffset + 1;
    if (dayNum < 1 || dayNum > lastDay.getDate()) {
      cells.push({ iso: null, day: null });
    } else {
      const mm = String(month + 1).padStart(2, "0");
      const dd = String(dayNum).padStart(2, "0");
      cells.push({ iso: `${year}-${mm}-${dd}`, day: dayNum });
    }
  }

  const byDay = new Map<string, Milestone[]>();
  for (const m of milestones) {
    const list = byDay.get(m.date) ?? [];
    list.push(m);
    byDay.set(m.date, list);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <h4 className="mb-2 text-sm font-semibold capitalize text-slate-900">{monthName}</h4>
      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[9px] font-semibold uppercase tracking-wider text-slate-400">
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((c, i) => {
          if (!c.iso) return <div key={i} className="h-10" />;
          const outOfRange = c.iso < kickoffDate || c.iso > endDate;
          const isToday = c.iso === today;
          const isSelected = c.iso === selectedDay;
          const dayMilestones = byDay.get(c.iso) ?? [];
          return (
            <button
              key={i}
              onClick={() => onPickDay(dayMilestones.length > 0 ? c.iso : null)}
              disabled={dayMilestones.length === 0}
              className={`relative h-10 rounded-md border px-1 text-left text-[11px] transition-colors ${
                isSelected
                  ? "border-blue-500 bg-blue-50"
                  : isToday
                    ? "border-blue-500 bg-white"
                    : outOfRange
                      ? "border-transparent bg-slate-50/60 text-slate-400"
                      : "border-slate-100 bg-white hover:bg-slate-50"
              } ${dayMilestones.length === 0 ? "cursor-default" : "cursor-pointer"}`}
            >
              <span className={isToday ? "font-bold text-blue-700" : "font-mono text-slate-700"}>{c.day}</span>
              {dayMilestones.length > 0 && (
                <div className="absolute bottom-1 left-1 flex gap-0.5">
                  {dayMilestones.slice(0, 3).map((m, j) => (
                    <span
                      key={j}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: MILESTONE_KIND_COLOR[m.kind] }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- MAIN -------------------------------------------------------------------

export default function BetterwarePlanCanvas({
  readOnly = false,
  projectSlug,
  onlyView,
  plan: planProp,
}: {
  readOnly?: boolean;
  /**
   * Si se pasa, los overrides se persisten contra la API `/api/portal/plan/overrides`
   * (fuente de verdad compartida). Si se omite, el canvas opera en modo "admin interno"
   * con localStorage (compatibilidad con /customer-projects/betterware).
   */
  projectSlug?: string;
  /**
   * Si se pasa, el canvas se renderiza en modo "una sola vista": oculta el header
   * principal y la barra de navegación entre views, mostrando únicamente la vista
   * indicada. Útil para embebér una vista específica (ej. Calendario) desde otro tab.
   */
  onlyView?: ViewTab;
  /**
   * Si se pasa, el canvas renderiza este plan en vez del de Betterware. Permite
   * reutilizar el componente para cualquier proyecto (jafra, pam, etc.) sin
   * tocar lógica. Si se omite, por backward-compat se usa `betterwarePlan`.
   */
  plan?: ProjectPlan;
} = {}) {
  const plan = (planProp ?? betterwarePlan) as BetterwarePlan;
  const usesApi = Boolean(projectSlug);
  const singleView = Boolean(onlyView);
  const [view, setView] = useState<ViewTab>(onlyView ?? "dashboard");
  const [filterOwner, setFilterOwner] = useState<OwnerTag | "all">("all");
  const [filterType, setFilterType] = useState<ActivityType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<ActivityStatus | "all">("all");
  const [filterPhase, setFilterPhase] = useState<string | "all">("all");
  const [selected, setSelected] = useState<Activity | null>(null);
  const [overrides, setOverrides] = useState<OverrideMap>({});
  const [overridesLoaded, setOverridesLoaded] = useState(false);
  const [calendarDay, setCalendarDay] = useState<string | null>(null);
  const [showExport, setShowExport] = useState(false);

  // Hydrate overrides from API (portal mode) or localStorage (admin interno)
  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (usesApi) {
        try {
          const res = await fetch(
            `/api/portal/plan/overrides?slug=${encodeURIComponent(projectSlug!)}`,
            { cache: "no-store" },
          );
          if (res.ok) {
            const data = (await res.json()) as {
              overrides: Array<{
                activityId: string;
                status: ActivityStatus;
                progressPercent: number;
              }>;
            };
            if (!cancelled) {
              const map: OverrideMap = {};
              for (const o of data.overrides) {
                map[o.activityId] = {
                  status: o.status,
                  progressPercent: o.progressPercent,
                };
              }
              setOverrides(map);
            }
          }
        } catch {
          // ignore — queda sin overrides
        }
      } else {
        try {
          const raw =
            typeof window !== "undefined"
              ? window.localStorage.getItem(OVERRIDES_KEY)
              : null;
          if (raw && !cancelled) setOverrides(JSON.parse(raw));
        } catch {
          // ignore
        }
      }
      if (!cancelled) setOverridesLoaded(true);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [usesApi, projectSlug]);

  // Apply overrides to the base plan
  const activitiesWithOverrides: Activity[] = useMemo(() => {
    return plan.activities.map((a) => {
      const o = overrides[a.id];
      if (!o) return a;
      return { ...a, status: o.status, progressPercent: o.progressPercent };
    });
  }, [plan.activities, overrides]);

  const planWithOverrides = useMemo(
    () => ({ ...plan, activities: activitiesWithOverrides }),
    [plan, activitiesWithOverrides],
  );

  function updateActivityOverride(activityId: string, status: ActivityStatus, progressPercent: number) {
    setOverrides((prev) => {
      const next = { ...prev, [activityId]: { status, progressPercent } };
      if (!usesApi) {
        try {
          window.localStorage.setItem(OVERRIDES_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
      }
      return next;
    });
    // Keep the open drawer in sync
    setSelected((cur) =>
      cur && cur.id === activityId ? { ...cur, status, progressPercent } : cur,
    );
    if (usesApi) {
      // Fire-and-forget: la UI ya actualizó el optimistic state. Si falla,
      // loguear sin romper al user.
      fetch("/api/portal/plan/overrides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: projectSlug,
          activityId,
          status,
          progressPercent,
        }),
      }).catch((err) => {
        console.error("[plan overrides] POST failed:", err);
      });
    }
  }

  function resetOverrides() {
    try {
      window.localStorage.removeItem(OVERRIDES_KEY);
    } catch {
      // ignore
    }
    setOverrides({});
    if (typeof window !== "undefined") window.location.reload();
  }

  const health = useMemo(() => overallHealth(planWithOverrides), [planWithOverrides]);
  const progress = useMemo(() => globalProgress(planWithOverrides), [planWithOverrides]);

  const filteredActivities = useMemo(() => {
    return activitiesWithOverrides.filter((a) => {
      if (filterOwner !== "all" && a.owner !== filterOwner) return false;
      if (filterType !== "all" && a.type !== filterType) return false;
      if (filterStatus !== "all" && a.status !== filterStatus) return false;
      if (filterPhase !== "all" && a.phaseId !== filterPhase) return false;
      return true;
    });
  }, [activitiesWithOverrides, filterOwner, filterType, filterStatus, filterPhase]);

  const upcomingMilestones = useMemo(() => {
    const today = todayISO();
    return plan.milestones
      .filter((m) => m.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 6);
  }, [plan.milestones]);

  const activeBlockers = activitiesWithOverrides.flatMap((a) =>
    a.blockers.filter((b) => !b.resolvedDate).map((b) => ({ ...b, activityNum: a.number })),
  );
  const activeRisks = plan.risks.filter((r) => r.status === "active");

  const overridesCount = Object.keys(overrides).length;
  const exportPatch = useMemo(() => {
    const list = Object.entries(overrides).map(([id, o]) => ({
      id,
      status: o.status,
      progressPercent: o.progressPercent,
    }));
    return JSON.stringify(list, null, 2);
  }, [overrides]);

  const dayMilestones = calendarDay ? plan.milestones.filter((m) => m.date === calendarDay) : [];

  return (
    <div className="w-full">
      {/* Header (oculto en modo single-view: lo pinta el tab padre) */}
      {!singleView && (
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Proyecto · {plan.projectName}
          </p>
          <h3 className="text-xl font-semibold text-slate-900">
            Plan de reconstrucción · {fmtDate(plan.kickoffDate)} – {fmtDate(plan.endDate)} 2026
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[11px] text-slate-500">Avance global</p>
            <p className="font-mono text-lg font-bold text-slate-900">{progress}%</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-500">Health</p>
            <span
              className={`inline-flex rounded-full px-3 py-0.5 text-xs font-semibold ${HEALTH_LABEL[health].className}`}
            >
              {HEALTH_LABEL[health].label}
            </span>
          </div>
          {!readOnly && !usesApi && overridesLoaded && overridesCount > 0 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowExport(true)}
                className="rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-100"
                title={`${overridesCount} cambios locales`}
              >
                ⬇ Exportar ({overridesCount})
              </button>
              <button
                onClick={resetOverrides}
                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-50"
                title="Limpiar cambios locales"
              >
                ↻ Reset
              </button>
            </div>
          )}
          {!readOnly && usesApi && overridesLoaded && overridesCount > 0 && (
            <span
              className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800"
              title={`${overridesCount} actividad${overridesCount === 1 ? "" : "es"} con cambios sincronizados a Salesforce`}
            >
              ☁ {overridesCount} sync
            </span>
          )}
        </div>
      </div>
      )}

      {/* Nav (oculto en modo single-view) · scroll horizontal en mobile */}
      {!singleView && (
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-slate-200">
        {(
          [
            ["dashboard", "Dashboard"],
            ["gantt", "Timeline"],
            ["calendar", "Calendario"],
            ["activities", `Actividades (${plan.activities.length})`],
            ["milestones", `Milestones (${plan.milestones.length})`],
            ["risks", `Riesgos (${plan.risks.length})`],
            ["stable", "Criterios de estable"],
            ["status", `Status semanal (${plan.statusUpdates.length})`],
          ] as [ViewTab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`shrink-0 whitespace-nowrap -mb-px border-b-2 px-3 py-2 text-xs font-semibold transition-colors ${
              view === key
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      )}

      {/* DASHBOARD */}
      {view === "dashboard" && (
        <div className="space-y-6">
          <ThisWeekCard
            activities={activitiesWithOverrides}
            phases={plan.phases}
            milestones={plan.milestones}
            kickoffDate={plan.kickoffDate}
            endDate={plan.endDate}
          />

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {plan.phases.map((p) => (
              <PhaseCard
                key={p.id}
                phase={p}
                progress={phaseProgress(planWithOverrides, p.id)}
                status={phaseStatus(planWithOverrides, p.id)}
              />
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-slate-900">Próximos milestones</h4>
              {upcomingMilestones.length === 0 ? (
                <p className="text-xs text-slate-500">No hay milestones próximos.</p>
              ) : (
                upcomingMilestones.map((m) => <MilestoneRow key={m.id} m={m} />)
              )}
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-slate-900">
                Blockers activos <span className="font-mono text-xs text-slate-500">({activeBlockers.length})</span>
              </h4>
              {activeBlockers.length === 0 ? (
                <p className="text-xs text-slate-500">Sin blockers activos.</p>
              ) : (
                <ul className="space-y-2 text-sm text-slate-700">
                  {activeBlockers.map((b) => (
                    <li key={b.id} className="border-b border-slate-100 pb-2 last:border-0">
                      <span className="font-mono text-[11px] text-slate-500">
                        #{b.activityNum} · {fmtDate(b.raisedDate)}
                      </span>
                      <p className="text-slate-900">{b.description}</p>
                      <p className="text-[11px] text-slate-500">owner · {b.owner}</p>
                    </li>
                  ))}
                </ul>
              )}

              <h4 className="mb-2 mt-4 text-sm font-semibold text-slate-900">
                Riesgos activos <span className="font-mono text-xs text-slate-500">({activeRisks.length})</span>
              </h4>
              <ul className="space-y-1 text-xs text-slate-700">
                {activeRisks.map((r) => (
                  <li key={r.id}>
                    <span className="font-mono text-[11px] text-slate-500">{r.id}</span> · {r.title}{" "}
                    <span className="text-[11px] text-slate-500">
                      ({r.probability}/{r.impact})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* GANTT */}
      {view === "gantt" && (
        <div className="space-y-4">
          {/* HORIZONTAL MILESTONE TIMELINE */}
          <MilestoneTimeline plan={plan} />

          {/* GRID DE ACTIVIDADES POR SEMANA (detalle) */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-sm font-semibold text-slate-900">
                Detalle · actividades por semana
              </h4>
              <div className="flex flex-wrap items-center gap-3 text-[10.5px] text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <StatusDot status="done" />Completada
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <StatusDot status="in-progress" />En curso
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <StatusDot status="blocked" />Bloqueada
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <StatusDot status="not-started" />Pendiente
                </span>
              </div>
            </div>
            <div className="min-w-[900px]">
              <div className="mb-2 grid grid-cols-[260px_repeat(10,minmax(60px,1fr))] gap-1 text-[11px] font-semibold text-slate-500">
                <div>Actividad</div>
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className="text-center">
                    S{i + 1}
                  </div>
                ))}
              </div>
              {plan.phases.map((phase) => (
              <div key={phase.id} className="mb-2">
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-900">
                  <span
                    className="rounded px-1.5 py-0.5 text-[10px] text-white"
                    style={{ background: phase.color }}
                  >
                    {phase.shortLabel}
                  </span>
                  <span>{phase.title}</span>
                </div>
                {activitiesWithOverrides
                  .filter((a) => a.phaseId === phase.id)
                  .map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setSelected(a)}
                      className="grid grid-cols-[260px_repeat(10,minmax(60px,1fr))] gap-1 py-0.5 text-left hover:bg-slate-50 rounded"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <StatusDot status={a.status} />
                        <div className="truncate text-[11px] text-slate-700">
                          <span className="mr-1 font-mono text-slate-400">#{a.number}</span>
                          {a.title}
                        </div>
                      </div>
                      {Array.from({ length: 10 }, (_, i) => {
                        const w = i + 1;
                        const inW = w === a.week;
                        const bg = inW
                          ? a.status === "done"
                            ? "#10b981"
                            : a.status === "blocked"
                            ? "#f43f5e"
                            : phase.color
                          : "#F1F5F9";
                        const opacity = inW
                          ? a.status === "not-started"
                            ? 0.3
                            : 0.9
                          : 1;
                        return (
                          <div
                            key={i}
                            className={`h-5 rounded ${inW && a.status === "in-progress" ? "ring-2 ring-emerald-500/30" : ""}`}
                            style={{ background: bg, opacity }}
                          />
                        );
                      })}
                    </button>
                  ))}
              </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-slate-500">Clic en una fila para abrir el detalle de la actividad.</p>
          </div>
        </div>
      )}

      {/* CALENDAR */}
      {view === "calendar" && (
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <MonthGrid
              year={2026}
              month={9}
              milestones={plan.milestones}
              kickoffDate={plan.kickoffDate}
              endDate={plan.endDate}
              onPickDay={setCalendarDay}
              selectedDay={calendarDay}
            />
            <MonthGrid
              year={2026}
              month={10}
              milestones={plan.milestones}
              kickoffDate={plan.kickoffDate}
              endDate={plan.endDate}
              onPickDay={setCalendarDay}
              selectedDay={calendarDay}
            />
            <MonthGrid
              year={2026}
              month={11}
              milestones={plan.milestones}
              kickoffDate={plan.kickoffDate}
              endDate={plan.endDate}
              onPickDay={setCalendarDay}
              selectedDay={calendarDay}
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h4 className="text-sm font-semibold text-slate-900">
                {calendarDay ? `Milestones del ${fmtDate(calendarDay)}` : "Leyenda de tipos"}
              </h4>
              {calendarDay && (
                <button
                  onClick={() => setCalendarDay(null)}
                  className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-slate-600 hover:bg-slate-50"
                >
                  Limpiar selección
                </button>
              )}
            </div>
            {calendarDay && dayMilestones.length > 0 ? (
              <div className="space-y-2">
                {dayMilestones.map((m) => (
                  <div key={m.id} className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ background: MILESTONE_KIND_COLOR[m.kind] }}
                      />
                      <h5 className="text-sm font-semibold text-slate-900">{m.title}</h5>
                      <Chip label={m.kind} className="bg-violet-100 text-violet-800" />
                    </div>
                    <p className="mt-1 text-xs text-slate-700">{m.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {m.participants.map((p) => (
                        <Chip key={p} label={p} className={OWNER_STYLES[p]} />
                      ))}
                    </div>
                    {m.references && m.references.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.references.map((r, i) => (
                          <a
                            key={i}
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700 hover:bg-blue-100"
                          >
                            📎 {r.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {(Object.keys(MILESTONE_KIND_COLOR) as MilestoneKind[]).map((k) => (
                  <div key={k} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: MILESTONE_KIND_COLOR[k] }}
                    />
                    {k}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ACTIVITIES LIST */}
      {view === "activities" && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-3">
            <select
              value={filterPhase}
              onChange={(e) => setFilterPhase(e.target.value)}
              className="rounded border border-slate-300 px-2 py-1 text-xs"
            >
              <option value="all">Todas las fases</option>
              {plan.phases.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.shortLabel}
                </option>
              ))}
            </select>
            <select
              value={filterOwner}
              onChange={(e) => setFilterOwner(e.target.value as OwnerTag | "all")}
              className="rounded border border-slate-300 px-2 py-1 text-xs"
            >
              <option value="all">Todos los owners</option>
              {Object.keys(OWNER_STYLES).map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as ActivityType | "all")}
              className="rounded border border-slate-300 px-2 py-1 text-xs"
            >
              <option value="all">Todos los tipos</option>
              {Object.keys(TYPE_STYLES).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ActivityStatus | "all")}
              className="rounded border border-slate-300 px-2 py-1 text-xs"
            >
              <option value="all">Cualquier status</option>
              {Object.keys(STATUS_STYLES).map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s as ActivityStatus]}
                </option>
              ))}
            </select>
            <span className="ml-auto self-center font-mono text-[11px] text-slate-500">
              {filteredActivities.length} / {plan.activities.length}
            </span>
          </div>

          <div className="space-y-2">
            {filteredActivities.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelected(a)}
                className="w-full rounded-lg border border-slate-200 bg-white p-3 text-left transition-colors hover:bg-slate-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-400">#{a.number}</span>
                      <h5 className="text-sm font-semibold text-slate-900">{a.title}</h5>
                    </div>
                    <p className="line-clamp-2 text-xs text-slate-600">{a.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <Chip label={a.owner} className={OWNER_STYLES[a.owner]} />
                      <Chip label={a.type} className={TYPE_STYLES[a.type]} />
                      <Chip label={STATUS_LABELS[a.status]} className={STATUS_STYLES[a.status]} />
                      {a.delegableToPartner && (
                        <Chip label="Delegable" className="bg-amber-50 text-amber-700" />
                      )}
                      <Chip label={`S${a.week}`} className="bg-slate-100 text-slate-600" />
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <p className="font-mono text-xs text-slate-700">{a.progressPercent}%</p>
                    <ProgressBar value={a.progressPercent} color="#066AFE" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MILESTONES */}
      {view === "milestones" && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          {plan.milestones.map((m) => (
            <MilestoneRow key={m.id} m={m} />
          ))}
        </div>
      )}

      {/* RISKS */}
      {view === "risks" && (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Riesgo</th>
                <th className="px-3 py-2">Prob / Impacto</th>
                <th className="px-3 py-2">Mitigación</th>
                <th className="px-3 py-2">Owner</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {plan.risks.map((r: Risk) => (
                <tr key={r.id} className="border-t border-slate-100 align-top">
                  <td className="px-3 py-2 font-mono text-xs">{r.id}</td>
                  <td className="px-3 py-2">
                    <p className="font-semibold text-slate-900">{r.title}</p>
                    <p className="text-xs text-slate-600">{r.description}</p>
                  </td>
                  <td className="px-3 py-2 text-xs">
                    <span className="font-mono">
                      {r.probability} / {r.impact}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-700">{r.mitigation}</td>
                  <td className="px-3 py-2 text-xs">
                    <Chip label={r.owner} className={OWNER_STYLES[r.owner]} />
                  </td>
                  <td className="px-3 py-2 text-xs">
                    <Chip
                      label={r.status}
                      className={
                        r.status === "active"
                          ? "bg-amber-100 text-amber-800"
                          : r.status === "mitigated"
                            ? "bg-emerald-100 text-emerald-800"
                            : r.status === "realized"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-slate-100 text-slate-700"
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* STABLE */}
      {view === "stable" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            Los 5 criterios que deben cumplirse para considerar el proyecto estable al cierre. Cada criterio es trackeable
            independientemente.
          </p>
          {plan.stableCriteria.map((c) => (
            <div key={c.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-1 flex items-start justify-between gap-3">
                <h4 className="text-sm font-semibold text-slate-900">{c.dimension}</h4>
                <Chip
                  label={c.status}
                  className={
                    c.status === "met"
                      ? "bg-emerald-100 text-emerald-800"
                      : c.status === "in-progress"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-700"
                  }
                />
              </div>
              <p className="text-xs leading-relaxed text-slate-700">{c.criterion}</p>
              {c.evidence && (
                <p className="mt-2 text-[11px] text-slate-500">
                  <strong>Evidencia:</strong> {c.evidence}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* STATUS */}
      {view === "status" && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          {plan.statusUpdates.length === 0 ? (
            <p className="text-sm text-slate-500">
              Aún no hay reportes semanales. Se agregarán uno por semana durante la ejecución del plan.
            </p>
          ) : (
            plan.statusUpdates.map((s) => (
              <div key={s.id} className="mb-4 border-b border-slate-100 pb-4 last:border-0">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-slate-500">Semana del {fmtDate(s.weekOf)}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${HEALTH_LABEL[s.overallHealth].className}`}
                  >
                    {HEALTH_LABEL[s.overallHealth].label}
                  </span>
                </div>
                <h5 className="mt-1 text-sm font-semibold text-slate-900">Highlights</h5>
                <ul className="list-disc pl-5 text-xs text-slate-700">
                  {s.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <h5 className="mt-2 text-sm font-semibold text-slate-900">Próxima semana</h5>
                <ul className="list-disc pl-5 text-xs text-slate-700">
                  {s.nextWeek.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}

      {selected && (
        <ActivityDetail
          activity={selected}
          onClose={() => setSelected(null)}
          onUpdate={(status, progressPercent) =>
            updateActivityOverride(selected.id, status, progressPercent)
          }
          readOnly={readOnly}
          persistenceLabel={
            usesApi
              ? "Los cambios se sincronizan con Salesforce al instante."
              : "Los cambios se guardan localmente en tu navegador. Exporta el patch desde el header para persistirlo en el repo."
          }
        />
      )}

      {showExport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-6"
          onClick={() => setShowExport(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h4 className="text-base font-semibold text-slate-900">Exportar cambios locales</h4>
                <p className="text-xs text-slate-600">
                  {overridesCount} actividad{overridesCount === 1 ? "" : "es"} con cambios. Copia este patch y aplícalo
                  manualmente en <code className="font-mono text-[11px]">betterwarePlan.ts</code> para persistir.
                </p>
              </div>
              <button
                onClick={() => setShowExport(false)}
                className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
              >
                Cerrar
              </button>
            </div>
            <textarea
              readOnly
              value={exportPatch}
              className="h-64 w-full rounded-md border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-800"
            />
            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(exportPatch);
                }}
                className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
              >
                Copiar al portapapeles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
