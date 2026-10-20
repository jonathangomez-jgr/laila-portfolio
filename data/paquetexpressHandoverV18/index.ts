// Punto de entrada del handover V18. Consumido por el tab del portal (solo en
// Server Components) y por scripts/gen-paquetexpress-handover-md.ts.
import {
  actions,
  architectureMermaid,
  dependencyMermaid,
  generalConfig,
  meta,
  overview,
  subagentDocs,
  systemInstructionsSummary,
} from "./content";
import {
  dependencyNodes,
  scriptSubagents,
  scriptVariables,
  securityRows,
} from "./inventory.generated";
import {
  goNoGo,
  handover,
  integrationsSummary,
  limitations,
  manualConfig,
  openQuestions,
  packageXml,
  risks,
  runbook,
  securityFindings,
  tests,
} from "./operations";
import type { CoverageMetrics, HandoverDoc } from "./types";

export type * from "./types";
export { dependencyNodes, scriptSubagents, scriptVariables, securityRows };

export const paquetexpressHandoverV18: HandoverDoc = {
  meta,
  overview,
  architectureMermaid,
  dependencyMermaid,
  generalConfig,
  systemInstructionsSummary,
  subagentDocs,
  actions,
  manualConfig,
  integrationsSummary,
  securityFindings,
  risks,
  openQuestions,
  runbook,
  tests,
  goNoGo,
  handover,
  limitations,
  packageXml,
};

function countBy<T>(items: T[], key: (t: T) => string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const it of items) out[key(it)] = (out[key(it)] ?? 0) + 1;
  return out;
}

export function computeCoverage(): CoverageMetrics {
  const defined = scriptSubagents.flatMap((s) => s.definedActions);
  const internal = scriptSubagents
    .flatMap((s) => s.reasoningActions)
    .filter((a) => a.kind !== "action");
  return {
    subagents: scriptSubagents.filter((s) => !s.isStart).length,
    definedActions: new Set(defined.map((a) => a.name)).size,
    uniqueTargets: new Set(defined.map((a) => a.target)).size,
    internalActions: internal.length,
    actionsFullyAnalyzed: actions.filter((a) => a.analysis === "Completa").length,
    actionsPartial: actions.filter((a) => a.analysis === "Parcial").length,
    dependencies: dependencyNodes.length,
    dependenciesPending: dependencyNodes.filter((n) => n.status !== "Confirmado").length,
    deployClasses: countBy(dependencyNodes, (n) => n.deployClass),
    envSpecific: dependencyNodes.filter((n) => n.envSpecific).length,
    manualConfig: manualConfig.length,
    risksBlocking: risks.filter((r) => r.blocking).length,
    risksCritical: risks.filter((r) => r.severity === "Crítica").length,
    openQuestions: openQuestions.length,
    tests: tests.length,
    coverageNote:
      "Cobertura no es 100%: 4 acciones dependen de componentes no inspeccionables (3 plantillas SvcCopilotTmpl__ y el retriever de Data Cloud) y nada se verificó en producción.",
  };
}

/** Ids referenciados en el contenido curado que no existen en ninguna colección. */
export function findBrokenReferences(): string[] {
  const known = new Set<string>([
    ...dependencyNodes.map((n) => n.id),
    ...dependencyNodes.flatMap((n) => n.aliases),
    ...securityRows.map((r) => r.id),
    ...actions.map((a) => a.id),
    ...risks.map((r) => r.id),
    ...openQuestions.map((q) => q.id),
    ...manualConfig.map((m) => m.id),
    ...runbook.map((s) => s.id),
    ...tests.map((t) => t.id),
  ]);
  const refs = [
    ...actions.flatMap((a) => [...a.rootNodes, ...a.permissions, ...a.risks]),
    ...risks.flatMap((r) => r.related),
    ...openQuestions.flatMap((q) => q.related),
    ...manualConfig.flatMap((m) => m.related),
    ...runbook.flatMap((s) => s.related),
    ...tests.flatMap((t) => t.dependencies),
    ...goNoGo.flatMap((g) => g.related),
    ...integrationsSummary.flatMap((i) => i.related),
    ...dependencyNodes.flatMap((n) => [...n.usedBy, ...n.dependsOn]),
  ];
  return [...new Set(refs.filter((r) => !known.has(r)))].sort();
}
