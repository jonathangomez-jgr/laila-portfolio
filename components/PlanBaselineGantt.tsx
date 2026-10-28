"use client";

import type { BetterwarePlan } from "../data/betterwarePlan";
import {
  globalProgress,
  phaseProgress,
  stageProgress,
  type PlanBaselineData,
  type PlanStage,
} from "../data/plans";

// Progreso vs baseline: la línea base congelada al kickoff (gris, con el avance que
// debería llevarse hoy) contra el plan real (fechas movidas y avance real por fase).
// Los avances usan la misma fórmula del portal: promedio simple de actividades.

const DAY_MS = 86_400_000;
const BRAND_GLOBAL = "#39AEC7"; // teal Betterware del deck de kickoff
const ETAPA_LABEL_COLORS = ["#39AEC7", "#8C4799"];
const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

type Span = { start: string; end: string }; // end inclusivo

function toDate(iso: string): Date {
  return new Date(iso + "T00:00:00");
}

function toISO(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function addDays(iso: string, n: number): string {
  return toISO(new Date(toDate(iso).getTime() + n * DAY_MS));
}

function daysBetween(a: string, b: string): number {
  return Math.round((toDate(b).getTime() - toDate(a).getTime()) / DAY_MS);
}

function fmtShort(iso: string): string {
  const d = toDate(iso);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

function fmtRange(span: Span): string {
  return `${fmtShort(span.start)} → ${fmtShort(span.end)}`;
}

function minISO(values: string[]): string {
  return values.reduce((a, b) => (b < a ? b : a));
}

function maxISO(values: string[]): string {
  return values.reduce((a, b) => (b > a ? b : a));
}

// Avance que debería tener una actividad hoy según su ventana planeada (lineal por días)
function plannedFraction(today: string, start: string, end: string): number {
  const total = daysBetween(start, end) + 1;
  const elapsed = daysBetween(start, today) + 1;
  if (elapsed <= 0) return 0;
  if (elapsed >= total) return 1;
  return elapsed / total;
}

function plannedPercent(baseline: PlanBaselineData, today: string, phaseIds?: string[]): number {
  const acts = baseline.activities.filter((a) => !phaseIds || phaseIds.includes(a.phaseId));
  if (acts.length === 0) return 0;
  const sum = acts.reduce((acc, a) => acc + plannedFraction(today, a.plannedStart, a.plannedEnd), 0);
  return Math.round((sum / acts.length) * 100);
}

function deltaLabel(days: number, word: string): string | null {
  if (days === 0) return null;
  return `${word} ${days > 0 ? "+" : "−"}${Math.abs(days)} d`;
}

type Row = {
  key: string;
  label: string;
  sublabel?: string;
  span: Span;
  value: number;
  color: string;
  meta: string;
  emphasis?: boolean;
};

function Track({
  row,
  x,
  baseColor,
}: {
  row: Row;
  x: (iso: string) => number;
  baseColor: string;
}) {
  const left = x(row.span.start);
  const width = x(addDays(row.span.end, 1)) - left;
  const fill = Math.min(100, Math.max(0, row.value));
  return (
    <div className="grid grid-cols-[250px_1fr] items-center gap-3 py-1.5">
      <div className="text-right leading-tight">
        <p className={`text-[12px] font-semibold ${row.emphasis ? "text-slate-900" : "text-slate-700"}`}>
          {row.label}
        </p>
        {row.sublabel && <p className="text-[10.5px] text-slate-500">{row.sublabel}</p>}
      </div>
      <div className="relative h-[44px]">
        <div
          className="absolute top-1 h-[22px] overflow-hidden rounded-full shadow-[0_4px_12px_rgba(0,30,91,0.08)]"
          style={{ left: `${left}%`, width: `${width}%`, background: baseColor }}
        >
          <div className="h-full rounded-full" style={{ width: `${fill}%`, background: row.color }} />
        </div>
        <span
          className="absolute top-1 flex h-[22px] items-center pl-2 font-mono text-[12px] font-bold text-slate-800"
          style={{ left: `${left + width}%` }}
        >
          {row.value}%
        </span>
        <span
          className="absolute top-[28px] whitespace-nowrap text-[10px] text-slate-500"
          style={{ left: `${left}%` }}
        >
          {row.meta}
        </span>
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  rows,
  x,
  baseColor,
  stageBands,
}: {
  title: string;
  subtitle: string;
  rows: Row[];
  x: (iso: string) => number;
  baseColor: string;
  stageBands: { label: string; span: Span; color: string }[];
}) {
  return (
    <div className="relative">
      <div className="mb-1 grid grid-cols-[250px_1fr] items-end gap-3">
        <div className="text-right">
          <p className="font-['AvantGarde_Salesforce','Century_Gothic',sans-serif] text-[17px] font-semibold text-[#03234D]">
            {title}
          </p>
          <p className="text-[10.5px] text-slate-500">{subtitle}</p>
        </div>
        <div className="relative h-5">
          {stageBands.map((b) => (
            <span
              key={b.label}
              className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pl-1 text-[10px] font-extrabold uppercase tracking-[0.14em]"
              style={{ left: `${x(b.span.start)}%`, color: b.color }}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>
      {rows.map((r) => (
        <Track key={r.key} row={r} x={x} baseColor={baseColor} />
      ))}
    </div>
  );
}

export default function PlanBaselineGantt({
  plan,
  baseline,
  stages,
  today = toISO(new Date()),
}: {
  plan: BetterwarePlan;
  baseline: PlanBaselineData;
  stages: PlanStage[];
  today?: string;
}) {
  // ---- línea base (estática) -------------------------------------------------
  const baseSpan = (ids: string[]): Span => {
    const ps = baseline.phases.filter((p) => ids.includes(p.id));
    return { start: minISO(ps.map((p) => p.startDate)), end: maxISO(ps.map((p) => p.endDate)) };
  };

  // ---- real: fechas actuales, recorridas por actividades que arrancaron antes ----
  const realPhaseSpan = (phaseId: string): Span => {
    const phase = plan.phases.find((p) => p.id === phaseId)!;
    const acts = plan.activities.filter((a) => a.phaseId === phaseId);
    const starts = [phase.startDate, ...acts.map((a) => a.actualStart).filter((d): d is string => Boolean(d))];
    const ends = [phase.endDate, ...acts.map((a) => a.actualEnd).filter((d): d is string => Boolean(d))];
    let end = maxISO(ends);
    if (phaseProgress(plan, phaseId) < 100 && today > end) end = today;
    return { start: minISO(starts), end };
  };
  const realSpan = (ids: string[]): Span => {
    const spans = ids.map(realPhaseSpan);
    return { start: minISO(spans.map((s) => s.start)), end: maxISO(spans.map((s) => s.end)) };
  };

  const phaseIds = plan.phases.map((p) => p.id);
  const allBase = baseSpan(baseline.phases.map((p) => p.id));
  const allReal = realSpan(phaseIds);

  // ---- eje: semanas lunes→viernes desde el kickoff, como en el deck ------------
  const kickoff = plan.kickoffDate;
  const kickoffDow = (toDate(kickoff).getDay() + 6) % 7; // 0 = lunes
  const firstMonday = addDays(kickoff, -kickoffDow);
  const domainStart = minISO([allBase.start, allReal.start, firstMonday]);
  const lastEnd = maxISO([allBase.end, allReal.end, plan.endDate]);
  const weeks: { n: number; start: string; label: string }[] = [];
  for (let m = firstMonday, n = 1; m <= lastEnd; m = addDays(m, 7), n++) {
    const labelStart = m < kickoff ? kickoff : m;
    weeks.push({ n, start: m, label: `${fmtShort(labelStart)} → ${toDate(addDays(m, 4)).getDate()}` });
  }
  const domainEnd = addDays(weeks[weeks.length - 1].start, 7);
  const totalDays = daysBetween(domainStart, domainEnd);
  const x = (iso: string) => (daysBetween(domainStart, iso) / totalDays) * 100;

  const code = (phaseId: string) => plan.phases.find((p) => p.id === phaseId)!.shortLabel.split(" · ")[0];
  const title = (phaseId: string) => plan.phases.find((p) => p.id === phaseId)!.title;

  const baselineRows: Row[] = [
    ...baseline.phases.map((bp) => ({
      key: `b-${bp.id}`,
      label: `${code(bp.id)} · ${title(bp.id)}`,
      span: { start: bp.startDate, end: bp.endDate },
      value: plannedPercent(baseline, today, [bp.id]),
      color: "#6B7280",
      meta: fmtRange({ start: bp.startDate, end: bp.endDate }),
    })),
    ...stages.map((st) => ({
      key: `b-${st.id}`,
      label: `Etapa ${st.number} · ${st.name}`,
      span: baseSpan(st.phaseIds),
      value: plannedPercent(baseline, today, st.phaseIds),
      color: "#4B5563",
      meta: fmtRange(baseSpan(st.phaseIds)),
      emphasis: true,
    })),
    {
      key: "b-global",
      label: "Global",
      span: allBase,
      value: plannedPercent(baseline, today),
      color: "#374151",
      meta: fmtRange(allBase),
      emphasis: true,
    },
  ];

  const realMeta = (real: Span, base: Span) => {
    const shifts = [
      deltaLabel(daysBetween(base.start, real.start), "inicio"),
      deltaLabel(daysBetween(base.end, real.end), "fin"),
    ].filter(Boolean);
    return [fmtRange(real), ...shifts].join(" · ");
  };

  const realRows: Row[] = [
    ...plan.phases.map((p) => {
      const span = realPhaseSpan(p.id);
      const bp = baseline.phases.find((b) => b.id === p.id);
      return {
        key: `r-${p.id}`,
        label: `${code(p.id)} · ${p.title}`,
        span,
        value: phaseProgress(plan, p.id),
        color: p.color,
        meta: bp ? realMeta(span, { start: bp.startDate, end: bp.endDate }) : fmtRange(span),
      };
    }),
    ...stages.map((st) => {
      const span = realSpan(st.phaseIds);
      return {
        key: `r-${st.id}`,
        label: `Etapa ${st.number} · ${st.name}`,
        span,
        value: stageProgress(plan, st),
        color: st.color ?? "#64748B",
        meta: realMeta(span, baseSpan(st.phaseIds)),
        emphasis: true,
      };
    }),
    {
      key: "r-global",
      label: "Global",
      span: allReal,
      value: globalProgress(plan),
      color: BRAND_GLOBAL,
      meta: realMeta(allReal, allBase),
      emphasis: true,
    },
  ];

  const bands = (spanOf: (ids: string[]) => Span) =>
    stages.map((st, i) => ({
      label: `Etapa ${st.number} · ${st.name}${i < stages.length - 1 ? "" : " →"}`,
      span: spanOf(st.phaseIds),
      color: ETAPA_LABEL_COLORS[i % ETAPA_LABEL_COLORS.length],
    }));

  const plannedGlobal = plannedPercent(baseline, today);
  const realGlobal = globalProgress(plan);
  const gap = realGlobal - plannedGlobal;
  const todayInRange = today >= domainStart && today < domainEnd;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-[12px]">
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600">
          Global planeado hoy <b className="font-mono text-slate-900">{plannedGlobal}%</b>
        </span>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600">
          Global real <b className="font-mono text-slate-900">{realGlobal}%</b>
        </span>
        <span
          className={`rounded-full px-3 py-1 font-semibold ${
            gap >= 0 ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"
          }`}
        >
          {gap >= 0 ? `+${gap}` : gap} pp vs baseline
        </span>
        <span className="text-slate-500">
          Línea base congelada al kickoff ({fmtShort(baseline.capturedOn)}) · avance planeado lineal por actividad
        </span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-gradient-to-b from-[#F4F8FD] to-[#EAF2FB] p-5">
        <div className="relative min-w-[1020px]">
          {/* Encabezado de semanas */}
          <div className="grid grid-cols-[250px_1fr] gap-3">
            <div />
            <div className="relative h-12 border-b border-slate-200">
              {weeks.map((w) => (
                <div
                  key={w.n}
                  className="absolute top-0 text-center"
                  style={{ left: `${x(w.start)}%`, width: `${(7 / totalDays) * 100}%` }}
                >
                  <p className="font-['AvantGarde_Salesforce','Century_Gothic',sans-serif] text-[15px] font-semibold text-[#03234D]">
                    Sem {w.n}
                  </p>
                  <p className="whitespace-nowrap text-[10.5px] font-semibold text-slate-500">{w.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Separadores de semana + línea de hoy */}
          <div className="pointer-events-none absolute inset-0 grid grid-cols-[250px_1fr] gap-3">
            <div />
            <div className="relative">
              {weeks.map((w) => (
                <div
                  key={w.n}
                  className="absolute bottom-0 top-12 border-l border-dashed border-slate-300"
                  style={{ left: `${x(w.start)}%` }}
                />
              ))}
              {todayInRange && (
                <div className="absolute bottom-0 top-10" style={{ left: `${x(today)}%` }}>
                  <div className="h-full w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#39AEC7] to-[#8C4799] shadow-[0_0_16px_rgba(140,71,153,0.25)]" />
                  <span className="absolute -top-0 left-1.5 whitespace-nowrap rounded bg-white/80 px-1 text-[10px] font-bold text-[#8C4799]">
                    Hoy · {fmtShort(today)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="relative pt-4">
            <Section
              title="Línea base"
              subtitle={`Plan al kickoff · ${fmtShort(baseline.capturedOn)}`}
              rows={baselineRows}
              x={x}
              baseColor="#E5E7EB"
              stageBands={bands(baseSpan)}
            />
            <div className="my-4 border-t-2 border-dashed border-slate-300" />
            <Section
              title="Progreso real"
              subtitle={`Al ${fmtShort(today)} · fechas y avance vigentes`}
              rows={realRows}
              x={x}
              baseColor="#E5E7EB"
              stageBands={bands(realSpan)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
