// Genera la documentación portable (Markdown) del handover V18 desde la misma
// fuente de datos que usa el portal (data/paquetexpressHandoverV18).
//
// Uso: npx jiti scripts/gen-paquetexpress-handover-md.ts <directorio-salida>
// No escribir la salida dentro de public/: es documentación restringida.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import {
  computeCoverage,
  dependencyNodes,
  findBrokenReferences,
  paquetexpressHandoverV18 as doc,
  scriptSubagents,
  scriptVariables,
  securityRows,
  type DependencyNode,
} from "../data/paquetexpressHandoverV18/index";

const outDir = process.argv[2];
if (!outDir) {
  console.error("Uso: npx jiti scripts/gen-paquetexpress-handover-md.ts <directorio-salida>");
  process.exit(1);
}
if (/[\\/]public([\\/]|$)/.test(resolve(outDir))) {
  console.error("La salida no puede estar dentro de public/.");
  process.exit(1);
}
const broken = findBrokenReferences();
if (broken.length) {
  console.error("Referencias rotas en los datos:", broken.join(", "));
  process.exit(1);
}

const esc = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, "<br>");
const table = (headers: string[], rows: string[][]) =>
  [`| ${headers.join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.map((c) => esc(c ?? "")).join(" | ")} |`)].join("\n");
const list = (items: string[]) => (items.length ? items.map((i) => `- ${i}`).join("\n") : "—");
const HEADER = `> Handover a producción · ${doc.meta.agentLabel} (\`${doc.meta.developerName}\`) ${doc.meta.botVersion.split(" ·")[0]} · auditoría ${doc.meta.auditDate}. Documento restringido (Salesforce y Partner). Generado desde \`laila-portfolio/data/paquetexpressHandoverV18\`: no editar a mano.\n`;

const files: Record<string, string> = {};
const cov = computeCoverage();

files["README.md"] = `# Handover a producción · Paquete_Express_vX v18

${HEADER}
**Estado de preparación: ${doc.meta.readiness}.** ${doc.meta.readinessSummary}

| Documento | Contenido |
|---|---|
| [01-executive-overview](01-executive-overview.md) | Qué hace el agente, pendientes previos a producción, alcance, canales, métricas |
| [02-agent-architecture](02-agent-architecture.md) | Diagrama, configuración general, variables |
| [03-subagents](03-subagents.md) | Subagentes: lógica determinista vs LLM |
| [04-actions-catalog](04-actions-catalog.md) | Acciones, cadena de implementación, inputs/outputs |
| [05-dependency-inventory](05-dependency-inventory.md) | Inventario de ${cov.dependencies} componentes con trazabilidad |
| [06-security-permissions](06-security-permissions.md) | Identidades y matriz de permisos |
| [07-integrations](07-integrations.md) | APIs externas y grounding |
| [08-deployment-manifest](08-deployment-manifest.md) | Matriz de despliegue, configuración manual, package.xml |
| [09-deployment-runbook](09-deployment-runbook.md) | Pre, deployment, post y rollback |
| [10-test-plan](10-test-plan.md) | ${cov.tests} pruebas |
| [11-risks-open-items](11-risks-open-items.md) | ${doc.risks.length} riesgos y ${doc.openQuestions.length} pendientes |
| [12-production-readiness](12-production-readiness.md) | Go/No-Go, aceptación, responsabilidades |
| [evidence/README](evidence/README.md) | Fuentes y evidencia |
`;

const prereqMd = `## Pendientes previos para salir a producción (${doc.productionPrerequisites.length})

Cada punto debe cerrarse (o aceptarse por escrito) antes de activar el agente en producción.

${doc.productionPrerequisites
  .map(
    (p, i) => `### ${i + 1}. ${p.title} (${p.id} · ${p.riskId})
- **Responsable:** ${p.owner}
- **Qué pasa:** ${p.whatHappens}
- **Por qué importa:** ${p.whyItMatters}
- **Evidencia:** ${p.evidence}

**Pasos**
${p.steps.map((s, j) => `${j + 1}. ${s}`).join("\n")}

- **Se da por cerrado cuando:** ${p.doneWhen}
- **Relacionado:** ${p.related.join(", ")}
`,
  )
  .join("\n")}`;

files["01-executive-overview.md"] = `# 01 · Executive overview

${HEADER}
**Estado de preparación: ${doc.meta.readiness}.** ${doc.meta.readinessSummary}

${doc.overview.purpose}

${prereqMd}

## Alcance
${list(doc.overview.scope)}

## Fuera de alcance
${list(doc.overview.outOfScope)}

## Canales
${list(doc.overview.channels.map((c) => `**${c.name}:** ${c.detail}`))}

## Datos clave
${table(["Dato", "Valor"], [...doc.overview.keyFacts.map((f) => [f.label, f.value]), ["Construcción", doc.meta.builder], ["Modelo", doc.meta.model], ["Usuario", doc.meta.agentUser]])}

## Cobertura del análisis
${table(["Métrica", "Valor"], [
  ["Subagentes", `${cov.subagents} + router`],
  ["Acciones definidas (destinos únicos)", `${cov.definedActions} (${cov.uniqueTargets})`],
  ["Acciones internas del Agent Script", String(cov.internalActions)],
  ["Acciones analizadas completas / parciales", `${cov.actionsFullyAnalyzed} / ${cov.actionsPartial}`],
  ["Componentes inventariados", String(cov.dependencies)],
  ["Componentes pendientes o no verificados", String(cov.dependenciesPending)],
  ["Específicos del ambiente", String(cov.envSpecific)],
  ["Pendientes previos a producción / riesgos críticos", `${doc.productionPrerequisites.length} / ${cov.risksCritical}`],
  ...Object.entries(cov.deployClasses).map(([k, v]) => [`Clase: ${k}`, String(v)]),
])}

${cov.coverageNote}
`;

files["02-agent-architecture.md"] = `# 02 · Agent architecture

${HEADER}
\`\`\`mermaid
${doc.architectureMermaid}\`\`\`

## Configuración general
${table(["Elemento", "Valor"], doc.generalConfig.map((c) => [c.label, c.value]))}

## Instrucciones generales (resumen)
${list(doc.systemInstructionsSummary)}

## Variables (${scriptVariables.length})
${table(["Variable", "Clase", "Tipo", "Default / fuente", "Visibilidad", "Descripción"], scriptVariables.map((v) => [`\`${v.name}\``, v.kind, v.type, v.source ?? v.default ?? "—", v.visibility ?? "—", v.description]))}
`;

files["03-subagents.md"] = `# 03 · Subagents

${HEADER}
**Determinista** = lógica explícita del Agent Script. **LLM** = depende del razonamiento del modelo.

${scriptSubagents
  .map((s) => {
    const d = doc.subagentDocs.find((x) => x.apiName === s.apiName)!;
    const acts = doc.actions.filter((a) => a.subagents.includes(s.apiName));
    const internal = s.reasoningActions.filter((a) => a.kind !== "action");
    return `## ${s.label} · \`${s.apiName}\`${s.isStart ? " (start_agent)" : ""}

- **Objetivo:** ${d.objective}
- **Descripción configurada:** ${s.description}
- **Líneas del Agent Script:** ${s.lines}

**Activación / enrutamiento**
${list(d.activation)}

**Lógica determinista**
${list(d.deterministic)}

**Comportamiento LLM**
${list(d.llm)}

**Acciones que invocan recursos:** ${acts.map((a) => `${a.id} \`${a.name}\``).join(", ") || "—"}

**Acciones internas:** ${internal.map((a) => `\`${a.name}\` (${a.kind}${a.availableWhen ? `, available when \`${a.availableWhen}\`` : ""})`).join("; ") || "—"}

**Transiciones:** ${s.transitions.join(", ") || "—"}

**Variables usadas:** ${s.variablesRead.map((v) => `\`${v}\``).join(", ") || "—"}

**Salidas:** ${d.outputs.join(" ") || "—"}

**Escalamiento**
${list(d.escalation)}

**Errores**
${list(d.errors)}

**Seguridad**
${list(d.security)}
${d.observations.length ? `\n**Observaciones de la auditoría**\n${list(d.observations)}\n` : ""}`;
  })
  .join("\n")}`;

const defined = scriptSubagents.flatMap((s) => s.definedActions);
files["04-actions-catalog.md"] = `# 04 · Actions catalog

${HEADER}
${table(["Id", "Acción", "Subagentes", "Tipo", "Destino", "Análisis"], doc.actions.map((a) => [a.id, `\`${a.name}\``, a.subagents.join(", "), a.kind, `\`${a.target}\``, a.analysis]))}

${doc.actions
  .map((a) => {
    const def = defined.find((x) => x.name === a.name);
    const io = (k: "inputs" | "outputs") =>
      def?.[k].length
        ? table(["Nombre", "Tipo", "Obligatorio", "Lo captura el LLM", "Descripción"], def[k].map((p) => [`\`${p.name}\``, p.type + (p.complexType ? ` (${p.complexType})` : ""), p.required == null ? "—" : p.required ? "Sí" : "No", p.userInput == null ? "—" : p.userInput ? "Sí" : "No", p.description]))
        : "—";
    return `## ${a.id} · \`${a.name}\`

- **Etiqueta:** ${a.label}
- **Subagentes:** ${a.subagents.join(", ")}
- **Destino:** \`${a.target}\` (${a.kind})
- **Invocación:** ${a.invocation}
- **Propósito:** ${a.purpose}
${def ? `- **Confirmación del usuario:** ${def.requireConfirmation ? "Sí" : "No"}\n` : ""}
**Cadena de implementación**
${a.chain.map((c, i) => `${i + 1}. ${c}`).join("\n")}

**Inputs**
${io("inputs")}

**Outputs**
${io("outputs")}

- **Componentes:** ${a.rootNodes.join(", ")}
- **Efectos secundarios:** ${a.sideEffects.join(" ")}
- **Manejo de errores:** ${a.errorHandling.join(" ")}
- **Permisos:** ${a.permissions.join(", ")}
- **Riesgos:** ${a.risks.join(", ") || "—"}
${a.analysisNote ? `- **Límite del análisis:** ${a.analysisNote}\n` : ""}- **Evidencia:** ${a.evidence}
`;
  })
  .join("\n")}`;

const depTable = (nodes: DependencyNode[]) =>
  table(
    ["Id", "Componente", "API Name", "Tipo", "Clase", "Usado por", "Depende de", "Acción requerida", "Método", "Fase", "Criticidad", "Estado", "Evidencia"],
    nodes.map((n) => [n.id, n.name, `\`${n.apiName}\``, n.type, n.deployClass, n.usedBy.join(", "), n.dependsOn.join(", "), n.actionRequired, n.deployMethod ?? "—", n.phase, n.criticality, n.status, n.evidence]),
  );

files["05-dependency-inventory.md"] = `# 05 · Dependency inventory

${HEADER}
\`\`\`mermaid
${doc.dependencyMermaid}\`\`\`

${depTable(dependencyNodes)}

## Riesgos y detalle por componente
${dependencyNodes
  .filter((n) => n.risks.length || n.envSpecific)
  .map((n) => `### ${n.id} · ${n.name}\n${n.envSpecific ? `- **Específico del ambiente:** ${n.envNotes || "Sí"}\n` : ""}${n.risks.map((r) => `- ${r}`).join("\n")}`)
  .join("\n\n")}
`;

files["06-security-permissions.md"] = `# 06 · Security & permissions

${HEADER}
**Identidad de ejecución:** ${doc.meta.agentUser}

${list(doc.securityFindings)}

## Matriz componente → operación → permiso → identidad → evidencia
${table(["Id", "Componente", "Operación", "Permiso", "Identidad", "Evidencia", "Clasificación", "Notas"], securityRows.map((r) => [r.id, r.component, r.operation, r.permission, r.identity, r.evidence, r.classification, r.notes]))}
`;

files["07-integrations.md"] = `# 07 · Integrations

${HEADER}
${table(["Integración", "Implementación", "Endpoint", "Autorización", "Nota de ambiente", "Relacionado"], doc.integrationsSummary.map((i) => [i.name, i.implementation, i.endpoint, i.auth, i.envNote, i.related.join(", ")]))}

Los valores secretos no se documentan. Ver R-01 y MAN-11.
`;

files["08-deployment-manifest.md"] = `# 08 · Deployment manifest

${HEADER}
## Matriz de despliegue (fases F0–F10)
${depTable(dependencyNodes.filter((n) => n.order <= 10))}

## Configuración manual
${table(["Id", "Tarea", "Detalle", "Relacionado"], doc.manualConfig.map((m) => [m.id, m.title, m.detail, m.related.join(", ")]))}

## package.xml de referencia
Compararlo con producción y quitar lo que ya exista sin cambios. No incluye GenAiPlannerBundle ni Bot: se generan con el publish.

\`\`\`xml
${doc.packageXml}
\`\`\`
`;

files["09-deployment-runbook.md"] = `# 09 · Deployment runbook

${HEADER}
${(["Pre-deployment", "Deployment", "Post-deployment", "Rollback / Recovery"] as const)
  .map(
    (stage) => `## ${stage}

${doc.runbook
  .filter((s) => s.stage === stage)
  .map(
    (s) => `### ${s.id} · ${s.title}
- **Responsable:** ${s.owner}${s.gate ? `\n- **Gate:** ${s.gate}` : ""}
- ${s.detail}
${(s.commands ?? []).map((c) => `\n\`\`\`bash\n${c}\n\`\`\``).join("")}${s.related.length ? `\n- Relacionado: ${s.related.join(", ")}` : ""}
`,
  )
  .join("\n")}`,
  )
  .join("\n")}`;

files["10-test-plan.md"] = `# 10 · Test plan

${HEADER}
Ninguna prueba está ejecutada. Una prueba solo cambia de estado con evidencia.

${table(["Id", "Subagente", "Funcionalidad", "Escenario", "Tipo", "Ejecución", "Precondiciones", "Datos", "Pasos", "Resultado esperado", "Dependencias", "Evidencia", "Criticidad", "Estado"], doc.tests.map((t) => [t.id, t.subagent, t.feature, t.scenario, t.type, t.execution, t.preconditions, t.data, t.steps, t.expected, t.dependencies.join(", "), t.evidence, t.criticality, t.status]))}
`;

files["11-risks-open-items.md"] = `# 11 · Risks & open items

${HEADER}
${table(["Id", "Riesgo", "Severidad", "Previo a producción", "Certeza", "Responsable"], doc.risks.map((r) => [r.id, r.title, r.severity, r.blocking ? "Sí" : "No", r.uncertainty, r.owner]))}

${doc.risks
  .map(
    (r) => `## ${r.id} · ${r.title}
- **Descripción:** ${r.description}
- **Impacto:** ${r.impact}
- **Certeza:** ${r.uncertainty} · **Severidad:** ${r.severity} · **Previo a producción:** ${r.blocking ? "Sí" : "No"}
- **Evidencia:** ${r.evidence}
- **Acción preventiva:** ${r.prevention}
- **Validación requerida:** ${r.validation}
- **Responsable sugerido:** ${r.owner}
- **Relacionado:** ${r.related.join(", ")}
`,
  )
  .join("\n")}
## Pendientes de verificación
${table(["Id", "Pregunta", "Cómo verificar", "Responsable", "Relacionado"], doc.openQuestions.map((q) => [q.id, q.question, q.howToVerify, q.owner, q.related.join(", ")]))}

## Limitaciones del análisis
${list(doc.limitations)}
`;

files["12-production-readiness.md"] = `# 12 · Production readiness

${HEADER}
**Estado: ${doc.meta.readiness}.** ${doc.meta.readinessSummary}

${prereqMd}

## Go / No-Go
${table(["Id", "Criterio", "Umbral", "Estado", "Relacionado"], doc.goNoGo.map((g) => [g.id, g.criterion, g.threshold, g.status, g.related.join(", ")]))}

## Criterios de aceptación
${list(doc.handover.acceptance)}

## Responsabilidades
${doc.handover.responsibilities.map((r) => `### ${r.party}\n${list(r.items)}`).join("\n\n")}

## Soporte post-deployment
${list(doc.handover.support)}
`;

files["evidence/README.md"] = `# Evidencia

${HEADER}
La auditoría fue de solo lectura sobre \`${doc.meta.sourceOrg}\`. Cada componente del inventario indica su evidencia (consulta SOQL/Tooling o archivo de metadata recuperado).

- Agent Script: \`aiAuthoringBundles/Paquete_Express_vX_18/Paquete_Express_vX_18.agent\` (retrieve del ${doc.meta.auditDate}).
- Metadata recuperada y hallazgos crudos: \`paquetexpress/_work/handover-v18/\` (local, **no versionar**: contiene metadata con un secreto que debe rotarse).
- Consultas principales: FlowDefinition, Flow, ApexClass, ApexCodeCoverageAggregate, MetadataComponentDependency, ValidationRule, WorkflowRule, PermissionSetAssignment, ObjectPermissions, FieldPermissions, SetupEntityAccess, MessagingChannel, MessagingSession, Group/QueueSobject, ServiceChannel, BusinessHours, DataSemanticSearch y agregados de Case por RT/Status/Origin.

## Limitaciones
${list(doc.limitations)}
`;

const root = resolve(outDir);
mkdirSync(join(root, "evidence"), { recursive: true });
for (const [name, body] of Object.entries(files)) writeFileSync(join(root, name), body.trimEnd() + "\n", "utf-8");
console.log(`${Object.keys(files).length} archivos en ${root}`);
