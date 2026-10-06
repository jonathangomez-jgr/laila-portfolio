// ============================================================================
// Project plan lookup · generic by slug
// Replaces direct imports of `data/betterwarePlan` in portal tabs and canvas.
// Adding a new project = new entry in PLANS; zero code changes elsewhere.
// ============================================================================

import { betterwarePlan, type BetterwarePlan } from "../betterwarePlan";
import { jafraPlan, type JafraPlan } from "../jafraPlan";

// Union of all project plans. Both share the same structural shape; only the
// literal `slug` type differs. Downstream consumers (canvas, tabs) treat this
// as a structural type and don't care about the discriminator.
export type ProjectPlan = BetterwarePlan | JafraPlan;

const PLANS: Record<string, ProjectPlan> = {
  betterware: betterwarePlan,
  jafra: jafraPlan,
};

export function getPlanForSlug(slug: string): ProjectPlan | null {
  return PLANS[slug] ?? null;
}

// ============================================================================
// Generic helpers · work on any ProjectPlan
// Mirrors the signatures of helpers in `betterwarePlan.ts` / `jafraPlan.ts`,
// but widened to the union so canvas code can be slug-agnostic.
// ============================================================================

type ActivityStatus = "not-started" | "in-progress" | "blocked" | "done";
type HealthColor = "green" | "yellow" | "red";
type ISODate = string;

export function phaseProgress(plan: ProjectPlan, phaseId: string): number {
  const acts = plan.activities.filter((a) => a.phaseId === phaseId);
  if (acts.length === 0) return 0;
  const total = acts.reduce((sum, a) => sum + a.progressPercent, 0);
  return Math.round(total / acts.length);
}

export function phaseStatus(plan: ProjectPlan, phaseId: string): ActivityStatus {
  const acts = plan.activities.filter((a) => a.phaseId === phaseId);
  if (acts.length === 0) return "not-started";
  if (acts.every((a) => a.status === "done")) return "done";
  if (acts.some((a) => a.status === "blocked")) return "blocked";
  if (acts.some((a) => a.status === "in-progress" || a.status === "done"))
    return "in-progress";
  return "not-started";
}

export function globalProgress(plan: ProjectPlan): number {
  if (plan.activities.length === 0) return 0;
  const total = plan.activities.reduce((sum, a) => sum + a.progressPercent, 0);
  return Math.round(total / plan.activities.length);
}

export function currentPhase(
  plan: ProjectPlan,
  today: ISODate = new Date().toISOString().slice(0, 10),
) {
  return (
    plan.phases.find((p) => today >= p.startDate && today <= p.endDate) ??
    plan.phases.find((p) => today < p.startDate)
  );
}

export function upcomingMilestones(
  plan: ProjectPlan,
  from: ISODate = new Date().toISOString().slice(0, 10),
  limit = 3,
) {
  return plan.milestones
    .filter((m) => m.date >= from && m.status === "scheduled")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

export function overallHealth(plan: ProjectPlan): HealthColor {
  const activeRealized = plan.risks.filter(
    (r) => r.status === "realized",
  ).length;
  if (activeRealized > 0) return "red";
  const activeHighImpact = plan.risks.filter(
    (r) => r.status === "active" && r.impact === "High",
  ).length;
  if (activeHighImpact >= 2) return "yellow";
  const blocked = plan.activities.filter((a) => a.status === "blocked").length;
  if (blocked > 0) return "yellow";
  return "green";
}
