// ============================================================================
// Server-side plan resolver con overrides aplicados desde Salesforce.
// Usar desde server components (/portal/page.tsx, /portal/[slug]/tabs/*)
// para que el "avance global" se calcule contra la misma fuente de verdad
// que el PlanCanvas (que ya hace la misma merge del lado cliente vía la
// API /api/portal/plan/overrides?slug=X).
// ============================================================================

import "server-only";
import { sfQuery } from "./salesforce";
import { getPlanForSlug, type ProjectPlan } from "@/data/plans";

type OverrideRow = {
  JGR_FDE_Activity_Id__c: string;
  JGR_FDE_Status__c: "not-started" | "in-progress" | "blocked" | "done";
  JGR_FDE_Progress_Percent__c: number;
};

export type ActivityOverride = {
  status: OverrideRow["JGR_FDE_Status__c"];
  progressPercent: number;
};

function escapeSoql(value: string): string {
  return value.replace(/'/g, "\\'");
}

export async function fetchOverridesForSlug(
  slug: string,
): Promise<Map<string, ActivityOverride>> {
  if (!slug) return new Map();
  try {
    const rows = await sfQuery<OverrideRow>(
      `SELECT JGR_FDE_Activity_Id__c, JGR_FDE_Status__c, JGR_FDE_Progress_Percent__c
       FROM JGR_FDE_Plan_Override__c
       WHERE JGR_FDE_Project_Slug__c = '${escapeSoql(slug)}'`,
    );
    const map = new Map<string, ActivityOverride>();
    for (const r of rows) {
      map.set(r.JGR_FDE_Activity_Id__c, {
        status: r.JGR_FDE_Status__c,
        progressPercent: r.JGR_FDE_Progress_Percent__c,
      });
    }
    return map;
  } catch (err) {
    // Si la query falla (red, auth, config), degradamos a plan estático.
    console.error(`[portalPlan] fetchOverridesForSlug(${slug}) failed:`, err);
    return new Map();
  }
}

/**
 * Devuelve el plan del slug con los overrides de Salesforce aplicados
 * actividad por actividad. Si no hay plan para el slug, devuelve null.
 * Si hay plan pero fallan los overrides, devuelve el plan estático
 * (fail-open, nunca rompe la UI).
 */
export async function getEffectivePlan(
  slug: string,
): Promise<ProjectPlan | null> {
  const plan = getPlanForSlug(slug);
  if (!plan) return null;

  const overrides = await fetchOverridesForSlug(slug);
  if (overrides.size === 0) return plan;

  const activities = plan.activities.map((a) => {
    const o = overrides.get(a.id);
    if (!o) return a;
    return { ...a, status: o.status, progressPercent: o.progressPercent };
  });
  return { ...plan, activities } as ProjectPlan;
}
