// Tipos del handover a producción de Paquete_Express_vX v18.
// Módulo de datos puro (sin "server-only" ni alias "@/") para que lo puedan
// consumir tanto el portal como el generador de Markdown (scripts/).

export type VerificationStatus = "Confirmado" | "Pendiente" | "No verificado";

export type Criticality = "Crítica" | "Alta" | "Media" | "Baja";

export type DeployClass =
  | "Metadata desplegable"
  | "Configuración manual"
  | "Configuración específica del ambiente"
  | "Dependencia externa"
  | "Datos / registros de configuración"
  | "Elemento existente a validar"
  | "Requiere investigación";

export type Owner = "Partner" | "Paquetexpress" | "Salesforce" | "Partner + Paquetexpress";

/** Componente del inventario. `usedBy`/`dependsOn` permiten recorrer el árbol. */
export type DependencyNode = {
  id: string;
  name: string;
  apiName: string;
  type: string;
  source: "dependencias" | "canales" | "curado";
  usedBy: string[];
  dependsOn: string[];
  /** `Subagente.Acción` del Agent Script que llega a este nodo (cuando aplica). */
  actions: string[];
  deployClass: DeployClass;
  deployMethod: string | null;
  actionRequired: string;
  envSpecific: boolean;
  envNotes: string;
  phase: string;
  order: number;
  criticality: Criticality;
  status: VerificationStatus;
  statusNote?: string | null;
  evidence: string;
  risks: string[];
  details: Record<string, string>;
  /** Ids de otras fuentes de la auditoría que describen el mismo componente. */
  aliases: string[];
};

export type SecurityRow = {
  id: string;
  component: string;
  operation: string;
  permission: string;
  identity: string;
  evidence: string;
  classification: "Efectivo" | "Deducido" | "Pendiente";
  notes: string;
};

export type ScriptVariable = {
  name: string;
  kind: "mutable" | "linked";
  type: string;
  default: string | null;
  description: string;
  source: string | null;
  visibility: string | null;
};

export type ScriptActionIO = {
  name: string;
  type: string;
  label: string;
  description: string;
  required: boolean | null;
  userInput: boolean | null;
  displayable: boolean | null;
  complexType: string | null;
};

export type ScriptDefinedAction = {
  name: string;
  label: string;
  description: string;
  target: string;
  source: string | null;
  requireConfirmation: boolean | null;
  progressIndicator: boolean | null;
  inputs: ScriptActionIO[];
  outputs: ScriptActionIO[];
};

export type ScriptReasoningAction = {
  name: string;
  kind: "setVariables" | "transition" | "escalate" | "action";
  ref: string;
  description: string;
  availableWhen: string | null;
  with: string[];
  set: string[];
};

export type ScriptSubagent = {
  apiName: string;
  isStart: boolean;
  label: string;
  description: string;
  lines: string;
  variablesRead: string[];
  variablesSet: string[];
  transitions: string[];
  deterministicRuns: string[];
  reasoningActions: ScriptReasoningAction[];
  definedActions: ScriptDefinedAction[];
};

/** Lectura funcional de un subagente (curada a partir del Agent Script). */
export type SubagentDoc = {
  apiName: string;
  objective: string;
  activation: string[];
  deterministic: string[];
  llm: string[];
  outputs: string[];
  escalation: string[];
  errors: string[];
  security: string[];
  observations: string[];
};

/** Acción del agente que invoca un recurso Salesforce. */
export type ActionDoc = {
  id: string;
  name: string;
  label: string;
  subagents: string[];
  kind: "Flow" | "Apex" | "Prompt Template" | "Flow (plantilla estándar)" | "Omni-Channel Flow";
  target: string;
  invocation: string;
  purpose: string;
  chain: string[];
  rootNodes: string[];
  sideEffects: string[];
  errorHandling: string[];
  permissions: string[];
  risks: string[];
  analysis: "Completa" | "Parcial";
  analysisNote?: string;
  evidence: string;
};

export type RiskDoc = {
  id: string;
  title: string;
  description: string;
  impact: string;
  uncertainty: "Confirmado" | "Alta probabilidad" | "Incierto";
  severity: Criticality;
  blocking: boolean;
  evidence: string;
  prevention: string;
  validation: string;
  owner: Owner;
  related: string[];
};

export type RunbookStep = {
  id: string;
  stage: "Pre-deployment" | "Deployment" | "Post-deployment" | "Rollback / Recovery";
  title: string;
  detail: string;
  commands?: string[];
  owner: Owner;
  gate?: string;
  related: string[];
};

export type TestCaseDoc = {
  id: string;
  subagent: string;
  feature: string;
  scenario: string;
  type: "Positiva" | "Negativa" | "Integración" | "Permisos" | "Enrutamiento" | "Entrada inesperada" | "Estática";
  execution: "Estática" | "Funcional";
  preconditions: string;
  data: string;
  steps: string;
  expected: string;
  dependencies: string[];
  evidence: string;
  criticality: Criticality;
  status: "No ejecutada";
};

export type GoNoGoCriterion = {
  id: string;
  criterion: string;
  threshold: string;
  related: string[];
  status: "Abierto" | "Cerrado";
};

/** Pendiente que debe cerrarse antes de salir a producción (deriva de un riesgo bloqueante). */
export type ProductionPrerequisite = {
  id: string;
  riskId: string;
  title: string;
  whatHappens: string;
  whyItMatters: string;
  evidence: string;
  steps: string[];
  owner: Owner;
  doneWhen: string;
  related: string[];
};

export type OpenQuestion = {
  id: string;
  question: string;
  howToVerify: string;
  owner: Owner;
  related: string[];
};

export type HandoverDoc = {
  meta: {
    agentLabel: string;
    developerName: string;
    botDefinitionId: string;
    botVersion: string;
    bundle: string;
    versionTag: string;
    sourceOrg: string;
    auditDate: string;
    builder: string;
    model: string;
    locale: string;
    agentUser: string;
    readiness: "No listo" | "Condicionado" | "Listo";
    readinessSummary: string;
  };
  overview: {
    purpose: string;
    scope: string[];
    outOfScope: string[];
    channels: { name: string; detail: string }[];
    keyFacts: { label: string; value: string }[];
  };
  architectureMermaid: string;
  dependencyMermaid: string;
  generalConfig: { label: string; value: string }[];
  systemInstructionsSummary: string[];
  subagentDocs: SubagentDoc[];
  actions: ActionDoc[];
  manualConfig: { id: string; title: string; detail: string; related: string[] }[];
  integrationsSummary: { name: string; implementation: string; endpoint: string; auth: string; envNote: string; related: string[] }[];
  securityFindings: string[];
  risks: RiskDoc[];
  productionPrerequisites: ProductionPrerequisite[];
  openQuestions: OpenQuestion[];
  runbook: RunbookStep[];
  tests: TestCaseDoc[];
  goNoGo: GoNoGoCriterion[];
  handover: {
    acceptance: string[];
    responsibilities: { party: Owner; items: string[] }[];
    support: string[];
  };
  limitations: string[];
  packageXml: string;
};

export type CoverageMetrics = {
  subagents: number;
  definedActions: number;
  uniqueTargets: number;
  internalActions: number;
  actionsFullyAnalyzed: number;
  actionsPartial: number;
  dependencies: number;
  dependenciesPending: number;
  deployClasses: Record<string, number>;
  envSpecific: number;
  manualConfig: number;
  risksBlocking: number;
  risksCritical: number;
  openQuestions: number;
  tests: number;
  coverageNote: string;
};
