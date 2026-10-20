// Handover a producción de Paquete_Express_vX v18 (Server Component).
// Los datos se importan solo aquí, en el servidor: cada sección (?s=) serializa
// únicamente lo que muestra hacia las islas cliente. No convertir a "use client".

import Link from "next/link";
import { notFound } from "next/navigation";
import type { PortalUser } from "@/lib/portalAuth";
import MermaidBlock from "@/components/MermaidBlock";
import HandoverTable, { type HandoverRow } from "@/components/handover/HandoverTable";
import {
  computeCoverage,
  dependencyNodes,
  paquetexpressHandoverV18 as doc,
  scriptSubagents,
  scriptVariables,
  securityRows,
  type DependencyNode,
} from "@/data/paquetexpressHandoverV18";

export const HANDOVER_SLUGS = ["paquetexpress"];
export const HANDOVER_ROLES: PortalUser["role"][] = ["Salesforce", "Partner"];

const SECTIONS = [
  { id: "resumen", label: "A · Resumen" },
  { id: "arquitectura", label: "B · Arquitectura" },
  { id: "subagentes", label: "C · Subagentes" },
  { id: "acciones", label: "D · Acciones" },
  { id: "dependencias", label: "E · Dependencias" },
  { id: "seguridad", label: "F · Seguridad" },
  { id: "manifest", label: "G · Manifest" },
  { id: "runbook", label: "H · Runbook" },
  { id: "riesgos", label: "I · Riesgos y pendientes" },
  { id: "pruebas", label: "J · Pruebas" },
  { id: "entrega", label: "K · Entrega" },
] as const;
type SectionId = (typeof SECTIONS)[number]["id"];

const DEP_PREFIXES = ["FLW", "APX", "TST", "MCK", "PT", "RET", "DC", "LBL", "RSS", "INT", "CINT", "OBJ", "FLD", "RT", "AUT", "WF", "VR", "EA", "TRG", "BH", "DATA", "QUE", "QRC", "SCH", "STD", "USR", "AR", "ARR", "ENT", "AGT", "PS", "CHN", "OMNI", "FEAT", "ENV"];
const LINK_MAP: Record<string, string> = {
  ...Object.fromEntries(DEP_PREFIXES.map((p) => [p, "dependencias"])),
  ACT: "acciones", PP: "resumen", R: "riesgos", OQ: "riesgos", MAN: "manifest",
  PRE: "runbook", DEP: "runbook", POST: "runbook", RB: "runbook",
  HV18: "pruebas", GO: "entrega", SEC: "seguridad",
};

const nodeById = new Map(dependencyNodes.map((n) => [n.id, n]));

/** Primera ruta hacia el agente (AGT-001) recorriendo usedBy. */
function pathToAgent(id: string): string {
  const seen = new Set<string>();
  const queue: string[][] = [[id]];
  while (queue.length) {
    const path = queue.shift()!;
    const last = path[path.length - 1];
    if (last === "AGT-001") return path.join(" ← ");
    if (seen.has(last)) continue;
    seen.add(last);
    for (const p of nodeById.get(last)?.usedBy ?? []) queue.push([...path, p]);
  }
  return "Sin ruta directa al agente (configuración de plataforma o canal)";
}

function functionality(n: DependencyNode): string {
  if (n.actions.length) return [...new Set(n.actions.map((a) => a.split(".")[0]))].join(", ");
  return n.type;
}

function depRow(n: DependencyNode): HandoverRow {
  return {
    id: n.id,
    cells: {
      name: n.name, apiName: n.apiName, type: n.type, deployClass: n.deployClass,
      phase: n.phase, criticality: n.criticality, status: n.status,
      functionality: functionality(n), usedBy: n.usedBy.join(", "), dependsOn: n.dependsOn.join(", "),
      actionRequired: n.actionRequired, deployMethod: n.deployMethod ?? "—",
      env: n.envSpecific ? "Sí" : "No", evidence: n.evidence,
    },
    detail: [
      ["Ruta al agente", pathToAgent(n.id)],
      ["Usado por", n.usedBy.join(", ") || "—"],
      ["Depende de", n.dependsOn.join(", ") || "—"],
      ["Acciones de origen", n.actions.join(", ") || "—"],
      ["Acción requerida", n.actionRequired],
      ["Método de despliegue", n.deployMethod ?? "—"],
      ["Específico del ambiente", n.envSpecific ? `Sí. ${n.envNotes}` : "No"],
      ...(n.statusNote ? ([["Nota de estado", n.statusNote]] as Array<[string, string]>) : []),
      ["Evidencia", n.evidence || "—"],
      ["Riesgos", n.risks.length ? n.risks.map((r) => `• ${r}`).join("\n") : "—"],
      ...(n.aliases.length ? ([["También descrito como", n.aliases.join(", ")]] as Array<[string, string]>) : []),
      ...Object.entries(n.details),
    ],
  };
}

function Card({ title, eyebrow, children, id }: { title: string; eyebrow?: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {eyebrow && <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-700">{eyebrow}</p>}
      <h3 className="mt-0.5 text-base font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 text-sm text-slate-700">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (!items.length) return <p className="text-slate-400">—</p>;
  return (
    <ul className="list-disc space-y-1 pl-5">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

function Pill({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "rose" | "amber" | "emerald" | "cyan" }) {
  const cls = {
    slate: "bg-slate-100 text-slate-700",
    rose: "bg-rose-100 text-rose-800",
    amber: "bg-amber-100 text-amber-800",
    emerald: "bg-emerald-100 text-emerald-800",
    cyan: "bg-cyan-100 text-cyan-800",
  }[tone];
  return <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${cls}`}>{children}</span>;
}

export default function HandoverTab({ slug, user, section }: { slug: string; user: PortalUser; section?: string }) {
  // Segundo candado (el primero está en page.tsx): el contenido técnico no se sirve a otros roles o proyectos.
  if (!HANDOVER_SLUGS.includes(slug) || !HANDOVER_ROLES.includes(user.role)) notFound();

  const active: SectionId = (SECTIONS.find((s) => s.id === section)?.id ?? "resumen") as SectionId;
  const baseHref = `/portal/${slug}?tab=handover`;
  const tableProps = { linkMap: LINK_MAP, baseHref };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-700">Handover a producción · uso exclusivo Salesforce y Partner</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {doc.meta.agentLabel} · <span className="font-mono text-base">{doc.meta.developerName}</span> · {doc.meta.botVersion.split(" ·")[0]}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Fuente: {doc.meta.sourceOrg} · Auditoría read-only del {doc.meta.auditDate}
            </p>
          </div>
          <Pill tone={doc.meta.readiness === "Listo" ? "emerald" : doc.meta.readiness === "Condicionado" ? "amber" : "rose"}>
            Preparación: {doc.meta.readiness}
          </Pill>
        </div>
        <nav className="mt-4 flex flex-wrap gap-1">
          {SECTIONS.map((s) => (
            <Link
              key={s.id}
              href={`${baseHref}&s=${s.id}`}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                s.id === active ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s.label}
            </Link>
          ))}
        </nav>
      </div>

      {active === "resumen" && <Resumen />}
      {active === "arquitectura" && <Arquitectura tableProps={tableProps} />}
      {active === "subagentes" && <Subagentes baseHref={baseHref} />}
      {active === "acciones" && <Acciones tableProps={tableProps} />}
      {active === "dependencias" && (
        <div className="space-y-5">
          <Card eyebrow="E · Dependency explorer" title="Del agente a los servicios externos">
            <p className="mb-3">
              Cada fila es un componente con Id estable. Abre una fila para ver la ruta hasta el agente, lo que usa y lo que lo usa, la evidencia y los riesgos.
              Los Ids son enlaces entre secciones.
            </p>
            <MermaidBlock code={doc.dependencyMermaid} />
          </Card>
          <HandoverTable
            {...tableProps}
            placeholder="Buscar componente, API name, riesgo…"
            columns={[
              { key: "name", label: "Componente" },
              { key: "apiName", label: "API Name", className: "font-mono text-[11px]" },
              { key: "type", label: "Tipo" },
              { key: "deployClass", label: "Clase" },
              { key: "phase", label: "Fase" },
              { key: "criticality", label: "Criticidad", badge: true },
              { key: "status", label: "Estado", badge: true },
            ]}
            filterKeys={["deployClass", "phase", "criticality", "status"]}
            rows={dependencyNodes.map(depRow)}
          />
        </div>
      )}
      {active === "seguridad" && <Seguridad tableProps={tableProps} />}
      {active === "manifest" && <Manifest tableProps={tableProps} />}
      {active === "runbook" && <Runbook baseHref={baseHref} />}
      {active === "riesgos" && <Riesgos tableProps={tableProps} />}
      {active === "pruebas" && (
        <div className="space-y-5">
          <Card eyebrow="J · Validation & test plan" title="Matriz de pruebas">
            <p>
              {doc.tests.length} pruebas derivadas de las funcionalidades de la V18. Ninguna está ejecutada: el estado cambia solo con evidencia
              (captura, trace de sesión o resultado de SOQL). Las pruebas &quot;Estática&quot; se resuelven revisando metadata o configuración.
            </p>
          </Card>
          <HandoverTable
            {...tableProps}
            columns={[
              { key: "subagent", label: "Subagente" },
              { key: "feature", label: "Funcionalidad" },
              { key: "scenario", label: "Escenario" },
              { key: "type", label: "Tipo" },
              { key: "execution", label: "Ejecución" },
              { key: "criticality", label: "Criticidad", badge: true },
              { key: "status", label: "Estado", badge: true },
            ]}
            filterKeys={["subagent", "type", "execution", "criticality"]}
            rows={doc.tests.map((t) => ({
              id: t.id,
              cells: { subagent: t.subagent, feature: t.feature, scenario: t.scenario, type: t.type, execution: t.execution, criticality: t.criticality, status: t.status },
              detail: [
                ["Precondiciones", t.preconditions], ["Datos de prueba", t.data], ["Pasos", t.steps],
                ["Resultado esperado", t.expected], ["Dependencias", t.dependencies.join(", ") || "—"], ["Evidencia requerida", t.evidence],
              ],
            }))}
          />
        </div>
      )}
      {active === "entrega" && <Entrega tableProps={tableProps} />}
    </div>
  );
}

type TableProps = { linkMap: Record<string, string>; baseHref: string };

function Resumen() {
  const cov = computeCoverage();
  const metrics: Array<[string, string | number]> = [
    ["Subagentes", `${cov.subagents} + router`],
    ["Acciones definidas", `${cov.definedActions} (${cov.uniqueTargets} destinos)`],
    ["Acciones internas", cov.internalActions],
    ["Acciones analizadas completas", `${cov.actionsFullyAnalyzed} de ${doc.actions.length}`],
    ["Componentes inventariados", cov.dependencies],
    ["Pendientes / no verificados", cov.dependenciesPending],
    ["Específicos del ambiente", cov.envSpecific],
    ["Configuraciones manuales", cov.manualConfig],
    ["Pendientes previos a producción", doc.productionPrerequisites.length],
    ["Preguntas abiertas", cov.openQuestions],
  ];
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-900">
        <p className="font-semibold">Estado de preparación: {doc.meta.readiness}</p>
        <p className="mt-1">{doc.meta.readinessSummary}</p>
      </div>
      <PendientesPrevios />
      <Card eyebrow="A · Executive overview" title="Qué hace el agente">
        <p>{doc.overview.purpose}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-500">Alcance</p>
            <Bullets items={doc.overview.scope} />
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-500">Fuera de alcance</p>
            <Bullets items={doc.overview.outOfScope} />
          </div>
        </div>
      </Card>
      <div className="grid gap-3 sm:grid-cols-5">
        {metrics.map(([k, v]) => (
          <div key={k} className="rounded-lg border border-slate-200 bg-white p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{k}</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{v}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500">{cov.coverageNote}</p>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Canales">
          <ul className="space-y-2">
            {doc.overview.channels.map((c) => (
              <li key={c.name}>
                <span className="font-semibold">{c.name}:</span> {c.detail}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Datos clave">
          <dl className="grid grid-cols-[160px_1fr] gap-y-1.5 text-xs">
            {[...doc.overview.keyFacts, { label: "Construcción", value: doc.meta.builder }, { label: "Modelo", value: doc.meta.model }].map((f) => (
              <div key={f.label} className="contents">
                <dt className="font-semibold text-slate-500">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </div>
  );
}

function PendientesPrevios() {
  const sevTone = (id: string) => (doc.risks.find((r) => r.id === id)?.severity === "Crítica" ? "rose" : "amber");
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-700">Antes del go-live</p>
      <h3 className="mt-0.5 text-base font-semibold text-slate-900">
        Pendientes previos para salir a producción ({doc.productionPrerequisites.length})
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        Cada punto debe cerrarse (o aceptarse por escrito) antes de activar el agente en producción. Abre uno para ver qué pasa, por qué importa,
        los pasos y cómo se da por cerrado.
      </p>
      <ol className="mt-4 space-y-2">
        {doc.productionPrerequisites.map((p, idx) => {
          const severity = doc.risks.find((r) => r.id === p.riskId)?.severity ?? "Alta";
          return (
            <li key={p.id} id={p.id}>
              <details className="group rounded-lg border border-slate-200 open:border-cyan-200 open:bg-cyan-50/30">
                <summary className="flex cursor-pointer flex-wrap items-center gap-2 px-4 py-3 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">{idx + 1}</span>
                  <span className="font-semibold text-slate-900">{p.title}</span>
                  <Pill tone={sevTone(p.riskId)}>{severity}</Pill>
                  <Pill tone="cyan">{p.owner}</Pill>
                  <span className="ml-auto font-mono text-[11px] text-slate-500">{p.id} · {p.riskId}</span>
                </summary>
                <div className="grid gap-4 border-t border-slate-100 px-4 py-4 text-xs text-slate-700 lg:grid-cols-2">
                  <div className="space-y-3">
                    <Block title="Qué pasa"><p>{p.whatHappens}</p></Block>
                    <Block title="Por qué importa"><p>{p.whyItMatters}</p></Block>
                    <Block title="Evidencia"><p className="text-slate-600">{p.evidence}</p></Block>
                  </div>
                  <div className="space-y-3">
                    <Block title="Pasos">
                      <ol className="list-decimal space-y-1 pl-5">
                        {p.steps.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ol>
                    </Block>
                    <Block title="Se da por cerrado cuando"><p>{p.doneWhen}</p></Block>
                    <Block title="Relacionado">
                      <p className="flex flex-wrap gap-x-2 gap-y-1">
                        {p.related.map((r) => (
                          <Link key={r} href={`/portal/paquetexpress?tab=handover&s=${LINK_MAP[r.split("-")[0]] ?? "resumen"}#${r}`} className="font-mono text-cyan-700 hover:underline">
                            {r}
                          </Link>
                        ))}
                      </p>
                    </Block>
                  </div>
                </div>
              </details>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Arquitectura({ tableProps }: { tableProps: TableProps }) {
  return (
    <div className="space-y-5">
      <Card eyebrow="B · Agent architecture" title="Canales, enrutador y subagentes">
        <MermaidBlock code={doc.architectureMermaid} />
      </Card>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Configuración general">
          <dl className="space-y-2 text-xs">
            {doc.generalConfig.map((c) => (
              <div key={c.label}>
                <dt className="font-semibold text-slate-500">{c.label}</dt>
                <dd className="break-words">{c.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
        <Card title="Instrucciones generales (resumen)">
          <Bullets items={doc.systemInstructionsSummary} />
        </Card>
      </div>
      <Card title={`Variables de sesión (${scriptVariables.length})`}>
        <p className="mb-3 text-xs text-slate-500">Las variables enlazadas (linked) se leen de MessagingSession / MessagingEndUser y requieren las context variables del Bot.</p>
        <HandoverTable
          {...tableProps}
          columns={[
            { key: "kind", label: "Clase" },
            { key: "type", label: "Tipo" },
            { key: "default", label: "Default / fuente" },
            { key: "visibility", label: "Visibilidad" },
          ]}
          filterKeys={["kind", "type"]}
          rows={scriptVariables.map((v) => ({
            id: v.name,
            cells: { kind: v.kind, type: v.type, default: v.source ?? v.default ?? "—", visibility: v.visibility ?? "—" },
            detail: [["Descripción", v.description || "—"]],
          }))}
        />
      </Card>
    </div>
  );
}

function Subagentes({ baseHref }: { baseHref: string }) {
  return (
    <div className="space-y-3">
      <Card eyebrow="C · Subagents explorer" title="Responsabilidades, condiciones y acciones">
        <p>
          <strong>Determinista</strong> = lógica explícita del Agent Script (siempre ocurre). <strong>LLM</strong> = depende del razonamiento del modelo
          con las instrucciones del subagente.
        </p>
      </Card>
      {scriptSubagents.map((s) => {
        const d = doc.subagentDocs.find((x) => x.apiName === s.apiName)!;
        const acts = doc.actions.filter((a) => a.subagents.includes(s.apiName));
        const internal = s.reasoningActions.filter((a) => a.kind !== "action");
        return (
          <details key={s.apiName} id={s.apiName} className="group rounded-xl border border-slate-200 bg-white shadow-sm">
            <summary className="flex cursor-pointer flex-wrap items-center gap-2 px-5 py-3">
              <span className="text-sm font-semibold text-slate-900">{s.label}</span>
              <span className="font-mono text-xs text-slate-500">{s.apiName}</span>
              {s.isStart && <Pill tone="cyan">start_agent</Pill>}
              <span className="ml-auto text-xs text-slate-500">
                {acts.length} acciones · {internal.length} internas · líneas {s.lines}
              </span>
            </summary>
            <div className="grid gap-4 border-t border-slate-100 px-5 py-4 text-xs text-slate-700 lg:grid-cols-2">
              <div className="space-y-3">
                <Block title="Objetivo"><p>{d.objective}</p></Block>
                <Block title="Descripción configurada"><p className="text-slate-600">{s.description}</p></Block>
                <Block title="Activación / enrutamiento"><Bullets items={d.activation} /></Block>
                <Block title="Lógica determinista"><Bullets items={d.deterministic} /></Block>
                <Block title="Comportamiento LLM"><Bullets items={d.llm} /></Block>
                <Block title="Salidas"><Bullets items={d.outputs} /></Block>
              </div>
              <div className="space-y-3">
                <Block title="Acciones que invocan recursos">
                  {acts.length ? (
                    <ul className="space-y-1">
                      {acts.map((a) => (
                        <li key={a.id}>
                          <Link href={`${baseHref}&s=acciones#${a.id}`} className="font-mono text-cyan-700 hover:underline">{a.id}</Link>{" "}
                          {a.name} <span className="text-slate-500">→ {a.target}</span>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-slate-400">—</p>}
                </Block>
                <Block title="Acciones internas (Agent Script)">
                  {internal.length ? (
                    <ul className="space-y-1">
                      {internal.map((a) => (
                        <li key={a.name}>
                          <span className="font-mono">{a.name}</span> <Pill>{a.kind}</Pill>
                          {a.availableWhen && <span className="block pl-2 text-[11px] text-slate-500">available when {a.availableWhen}</span>}
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-slate-400">—</p>}
                </Block>
                <Block title="Transiciones posibles"><p className="font-mono">{s.transitions.join(", ") || "—"}</p></Block>
                <Block title="Variables que usa"><p className="font-mono text-[11px] leading-5">{s.variablesRead.join(", ") || "—"}</p></Block>
                <Block title="Escalamiento"><Bullets items={d.escalation} /></Block>
                <Block title="Manejo de errores"><Bullets items={d.errors} /></Block>
                <Block title="Seguridad"><Bullets items={d.security} /></Block>
                {d.observations.length > 0 && <Block title="Observaciones de la auditoría"><Bullets items={d.observations} /></Block>}
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      {children}
    </div>
  );
}

function ioText(name: string, kind: "inputs" | "outputs"): string {
  const def = scriptSubagents.flatMap((s) => s.definedActions).find((a) => a.name === name);
  if (!def) return "—";
  return (
    def[kind]
      .map((p) => {
        const flags = [p.required ? "obligatorio" : kind === "inputs" ? "opcional" : null, p.userInput ? "lo captura el LLM" : null, p.complexType].filter(Boolean).join(", ");
        return `${p.name}: ${p.type}${flags ? ` (${flags})` : ""} — ${p.description}`;
      })
      .join("\n") || "—"
  );
}

function Acciones({ tableProps }: { tableProps: TableProps }) {
  const internal = scriptSubagents.flatMap((s) => s.reasoningActions.filter((a) => a.kind !== "action").map((a) => ({ ...a, subagent: s.apiName })));
  return (
    <div className="space-y-5">
      <Card eyebrow="D · Actions catalog" title="Acciones que invocan recursos de Salesforce">
        <p>
          Abre una fila para ver la cadena de implementación hasta el servicio final, inputs/outputs exactos del Agent Script, efectos secundarios,
          permisos y riesgos.
        </p>
      </Card>
      <HandoverTable
        {...tableProps}
        columns={[
          { key: "name", label: "Acción", className: "font-mono text-[11px]" },
          { key: "subagents", label: "Subagentes" },
          { key: "kind", label: "Tipo" },
          { key: "target", label: "Destino", className: "font-mono text-[11px]" },
          { key: "analysis", label: "Análisis", badge: true },
        ]}
        filterKeys={["kind", "analysis"]}
        rows={doc.actions.map((a) => ({
          id: a.id,
          cells: { name: a.name, subagents: a.subagents.join(", "), kind: a.kind, target: a.target, analysis: a.analysis },
          detail: [
            ["Etiqueta", a.label],
            ["Propósito", a.purpose],
            ["Invocación", a.invocation],
            ["Cadena de implementación", a.chain.map((c, i) => `${i + 1}. ${c}`).join("\n")],
            ["Componentes", a.rootNodes.join(", ")],
            ["Inputs", ioText(a.name, "inputs")],
            ["Outputs", ioText(a.name, "outputs")],
            ["Efectos secundarios", a.sideEffects.join("\n")],
            ["Manejo de errores", a.errorHandling.join("\n")],
            ["Permisos", a.permissions.join(", ")],
            ["Riesgos", a.risks.join(", ") || "—"],
            ...(a.analysisNote ? ([["Límite del análisis", a.analysisNote]] as Array<[string, string]>) : []),
            ["Evidencia", a.evidence],
          ],
        }))}
      />
      <Card title={`Acciones internas del Agent Script (${internal.length})`}>
        <p className="mb-3 text-xs text-slate-500">
          Capturas de variables (@utils.setVariables), transiciones entre subagentes y escalamiento. No requieren metadata adicional: viajan con el AiAuthoringBundle.
        </p>
        <HandoverTable
          {...tableProps}
          columns={[
            { key: "subagent", label: "Subagente" },
            { key: "name", label: "Acción", className: "font-mono text-[11px]" },
            { key: "kind", label: "Tipo" },
            { key: "available", label: "Disponible cuando", className: "font-mono text-[11px]" },
          ]}
          filterKeys={["subagent", "kind"]}
          rows={internal.map((a) => ({
            id: `${a.subagent}.${a.name}`,
            cells: { subagent: a.subagent, name: a.name, kind: a.kind, available: a.availableWhen ?? "siempre" },
            detail: [["Referencia", a.ref], ["Descripción", a.description || "—"], ["Asigna", [...a.with, ...a.set].join("\n") || "—"]],
          }))}
        />
      </Card>
    </div>
  );
}

function Seguridad({ tableProps }: { tableProps: TableProps }) {
  return (
    <div className="space-y-5">
      <Card eyebrow="F · Security & permissions" title="Identidades y hallazgos">
        <p className="mb-2 text-xs text-slate-500">Identidad de ejecución: {doc.meta.agentUser}</p>
        <Bullets items={doc.securityFindings} />
      </Card>
      <Card title="Matriz componente → operación → permiso → identidad → evidencia">
        <p className="mb-3 text-xs text-slate-500">
          Efectivo = permiso observado en el sandbox. Deducido = necesidad técnica inferida. Pendiente = a comprobar en producción.
        </p>
        <HandoverTable
          {...tableProps}
          columns={[
            { key: "component", label: "Componente" },
            { key: "operation", label: "Operación" },
            { key: "permission", label: "Permiso" },
            { key: "classification", label: "Clasificación", badge: true },
          ]}
          filterKeys={["classification"]}
          rows={securityRows.map((r) => ({
            id: r.id,
            cells: { component: r.component, operation: r.operation, permission: r.permission, classification: r.classification },
            detail: [["Identidad", r.identity], ["Evidencia", r.evidence], ["Notas", r.notes || "—"]],
          }))}
        />
      </Card>
    </div>
  );
}

function Manifest({ tableProps }: { tableProps: TableProps }) {
  const rows = dependencyNodes.filter((n) => n.order <= 10).map(depRow);
  return (
    <div className="space-y-5">
      <Card eyebrow="G · Deployment manifest" title="Matriz de despliegue">
        <p>
          Componentes de las fases F0–F10 con su acción requerida, método y orden. La automatización existente que se dispara con los casos del agente
          (fase V) está en Dependencias. Clases: Metadata desplegable · Configuración manual · Específica del ambiente · Dependencia externa · Datos ·
          Existente a validar · Requiere investigación.
        </p>
      </Card>
      <HandoverTable
        {...tableProps}
        columns={[
          { key: "name", label: "Componente" },
          { key: "apiName", label: "API Name", className: "font-mono text-[11px]" },
          { key: "functionality", label: "Funcionalidad" },
          { key: "actionRequired", label: "Acción requerida" },
          { key: "phase", label: "Orden" },
          { key: "criticality", label: "Criticidad", badge: true },
          { key: "status", label: "Estado", badge: true },
        ]}
        filterKeys={["deployClass", "phase", "criticality", "status", "env"]}
        filterLabels={{ deployClass: "Clase", env: "Específico del ambiente" }}
        rows={rows}
      />
      <Card title="Configuración manual (no viaja con Metadata API)">
        <ol className="space-y-2">
          {doc.manualConfig.map((m) => (
            <li key={m.id} id={m.id}>
              <span className="font-mono text-xs text-slate-500">{m.id}</span> <span className="font-semibold">{m.title}.</span> {m.detail}{" "}
              <span className="text-xs text-slate-500">({m.related.join(", ")})</span>
            </li>
          ))}
        </ol>
      </Card>
      <Card title="package.xml de referencia">
        <p className="mb-2 text-xs text-slate-500">
          Base para el validate. Compararlo con producción y quitar lo que ya exista sin cambios. No incluye GenAiPlannerBundle ni Bot: se generan con el publish.
        </p>
        <pre className="max-h-[420px] overflow-auto rounded-lg bg-slate-900 p-4 text-[11px] leading-5 text-slate-100">{doc.packageXml}</pre>
      </Card>
      <Card title="Integraciones">
        <div className="space-y-3">
          {doc.integrationsSummary.map((i) => (
            <div key={i.name} className="rounded-lg border border-slate-100 p-3 text-xs">
              <p className="font-semibold text-slate-900">{i.name}</p>
              <p>{i.implementation}</p>
              <p className="font-mono text-[11px] text-slate-500">{i.endpoint}</p>
              <p>Autorización: {i.auth}</p>
              <p className="text-amber-800">{i.envNote}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Runbook({ baseHref }: { baseHref: string }) {
  const stages = ["Pre-deployment", "Deployment", "Post-deployment", "Rollback / Recovery"] as const;
  return (
    <div className="space-y-5">
      {stages.map((stage) => (
        <Card key={stage} eyebrow="H · Deployment runbook" title={stage}>
          <ol className="space-y-3">
            {doc.runbook.filter((s) => s.stage === stage).map((s) => (
              <li key={s.id} id={s.id} className="rounded-lg border border-slate-100 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-slate-500">{s.id}</span>
                  <span className="font-semibold text-slate-900">{s.title}</span>
                  <Pill tone="cyan">{s.owner}</Pill>
                  {s.gate && <Pill tone="amber">Gate: {s.gate}</Pill>}
                </div>
                <p className="mt-1">{s.detail}</p>
                {s.commands?.map((c, i) => (
                  <pre key={i} className="mt-2 overflow-x-auto rounded bg-slate-900 p-2 text-[11px] text-slate-100">{c}</pre>
                ))}
                {s.related.length > 0 && (
                  <p className="mt-1 text-xs text-slate-500">
                    Relacionado:{" "}
                    {s.related.map((r, i) => (
                      <span key={r}>
                        {i > 0 && ", "}
                        <Link href={`${baseHref}&s=${LINK_MAP[r.split("-")[0]] ?? "runbook"}#${r}`} className="font-mono text-cyan-700 hover:underline">{r}</Link>
                      </span>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </Card>
      ))}
    </div>
  );
}

function Riesgos({ tableProps }: { tableProps: TableProps }) {
  return (
    <div className="space-y-5">
      <Card eyebrow="I · Risks & open items" title={`Riesgos de producción (${doc.risks.length})`}>
        <p>Un riesgo no se marca resuelto solo porque no falló en el sandbox: se cierra con la validación indicada.</p>
      </Card>
      <HandoverTable
        {...tableProps}
        columns={[
          { key: "title", label: "Riesgo" },
          { key: "severity", label: "Severidad", badge: true },
          { key: "blocking", label: "Previo a producción", badge: true },
          { key: "uncertainty", label: "Certeza" },
          { key: "owner", label: "Responsable" },
        ]}
        filterKeys={["severity", "blocking", "owner"]}
        rows={doc.risks.map((r) => ({
          id: r.id,
          cells: { title: r.title, severity: r.severity, blocking: r.blocking ? "Sí" : "No", uncertainty: r.uncertainty, owner: r.owner },
          detail: [
            ["Descripción", r.description], ["Impacto", r.impact], ["Evidencia", r.evidence],
            ["Acción preventiva", r.prevention], ["Validación requerida", r.validation], ["Relacionado", r.related.join(", ")],
          ],
        }))}
      />
      <Card title={`Pendientes de verificación (${doc.openQuestions.length})`}>
        <HandoverTable
          {...tableProps}
          columns={[
            { key: "question", label: "Pregunta" },
            { key: "owner", label: "Responsable" },
          ]}
          filterKeys={["owner"]}
          rows={doc.openQuestions.map((q) => ({
            id: q.id,
            cells: { question: q.question, owner: q.owner },
            detail: [["Cómo verificar", q.howToVerify], ["Relacionado", q.related.join(", ")]],
          }))}
        />
      </Card>
      <Card title="Limitaciones del análisis">
        <Bullets items={doc.limitations} />
      </Card>
    </div>
  );
}

function Entrega({ tableProps }: { tableProps: TableProps }) {
  return (
    <div className="space-y-5">
      <Card eyebrow="K · Production handover" title="Criterios Go / No-Go">
        <HandoverTable
          {...tableProps}
          columns={[
            { key: "criterion", label: "Criterio" },
            { key: "threshold", label: "Umbral" },
            { key: "status", label: "Estado", badge: true },
          ]}
          rows={doc.goNoGo.map((g) => ({
            id: g.id,
            cells: { criterion: g.criterion, threshold: g.threshold, status: g.status },
            detail: [["Relacionado", g.related.join(", ") || "—"]],
          }))}
        />
      </Card>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Criterios de aceptación">
          <Bullets items={doc.handover.acceptance} />
        </Card>
        <Card title="Soporte post-deployment">
          <Bullets items={doc.handover.support} />
        </Card>
      </div>
      <Card title="Responsabilidades">
        <div className="grid gap-4 sm:grid-cols-3">
          {doc.handover.responsibilities.map((r) => (
            <div key={r.party}>
              <p className="mb-1 text-xs font-semibold uppercase text-slate-500">{r.party}</p>
              <Bullets items={r.items} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
