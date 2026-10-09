// ============================================================================
// Telasist × Invex · Voice AI Agent para Retención Invex TDC
// Kick-off: 2026-10-13 · Shadow pilot: 2026-11-17 · GA 100 %: 2027-02-13
// Autor: Jonathan Gomez (Salesforce FDE)
// ============================================================================
// Objetivo: construir y desplegar un Voice AI Agent en Agentforce Voice +
// Agent Script que atienda las llamadas entrantes de cancelación de la
// campaña Invex Retenciones TDC (~930 llamadas/día, 142k casos cerrados
// hasta oct-2026), reutilizando el patrón de voice agent interno existente,
// el modelo de datos del Case en producción y la integración Amazon Connect
// + HVCC ya productiva.
// ============================================================================

export type ISODate = string; // "YYYY-MM-DD"

export type OwnerTag =
  | "Salesforce - FDE"
  | "Salesforce - CSM"
  | "Salesforce - AE"
  | "Salesforce - Support"
  | "Partner"
  | "Telasist - Sponsor"
  | "Telasist - IT Lead"
  | "Telasist - Operations"
  | "Telasist - UAT"
  | "Invex - Sponsor"
  | "Invex - Legal"
  | "Invex - IT Lead"
  | "Shared";

export type ActivityType =
  | "Dev"
  | "Test"
  | "Deploy"
  | "Mgmt"
  | "Ops"
  | "Doc"
  | "Config"
  | "Review";

export type ActivityStatus =
  | "not-started"
  | "in-progress"
  | "blocked"
  | "done";

export type HealthColor = "green" | "yellow" | "red";

export type ReferenceKind =
  | "document"
  | "pdf"
  | "org-record"
  | "spec"
  | "external"
  | "confluence"
  | "jira"
  | "slack"
  | "figma";

export type Reference = {
  label: string;
  url: string;
  kind: ReferenceKind;
};

export type ActivityUpdate = {
  date: ISODate;
  author: OwnerTag;
  note: string;
};

export type Blocker = {
  id: string;
  description: string;
  raisedDate: ISODate;
  owner: OwnerTag;
  resolvedDate?: ISODate;
  resolution?: string;
};

export type Phase = {
  id: string;
  number: number;
  title: string;
  shortLabel: string;
  description: string;
  objective: string;
  startDate: ISODate;
  endDate: ISODate;
  requires: string[];
  outcome: string;
  gate: string;
  color: string;
};

export type Activity = {
  id: string;
  phaseId: string;
  number: string;
  title: string;
  description: string;
  owner: OwnerTag;
  collaborators: OwnerTag[];
  delegableToPartner: boolean;
  type: ActivityType;
  week: number;
  plannedStart: ISODate;
  plannedEnd: ISODate;
  actualStart?: ISODate;
  actualEnd?: ISODate;
  status: ActivityStatus;
  progressPercent: number;
  dependencies: string[];
  deliverables: string[];
  references: Reference[];
  updates: ActivityUpdate[];
  blockers: Blocker[];
  tags: string[];
};

export type MilestoneKind =
  | "Executive Review"
  | "Kick-off"
  | "UAT Session"
  | "Go-live"
  | "QBR"
  | "Daily Standup"
  | "Weekly Status"
  | "Internal Review";

export type Milestone = {
  id: string;
  title: string;
  description: string;
  date: ISODate;
  kind: MilestoneKind;
  phaseId: string;
  participants: OwnerTag[];
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  outcome?: string;
  references: Reference[];
};

export type Risk = {
  id: string;
  title: string;
  description: string;
  probability: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High";
  mitigation: string;
  owner: OwnerTag;
  status: "active" | "mitigated" | "realized" | "closed";
  phaseId?: string;
  references: Reference[];
};

export type StableDimension =
  | "Producto"
  | "Seguridad"
  | "Operación"
  | "Mantenibilidad"
  | "Observabilidad";

export type StableCriterion = {
  id: string;
  dimension: StableDimension;
  criterion: string;
  status: "pending" | "in-progress" | "met";
  evidence?: string;
  references: Reference[];
};

export type KpiSnapshot = {
  deflection?: number;
  escalation?: number;
  abandon?: number;
  success?: number;
  errorRate?: number;
};

export type StatusUpdate = {
  id: string;
  weekOf: ISODate;
  author: OwnerTag;
  overallHealth: HealthColor;
  phaseId: string;
  highlights: string[];
  nextWeek: string[];
  activeBlockers: string[];
  activeRisks: string[];
  kpiSnapshot?: KpiSnapshot;
  references: Reference[];
};

export type TelasistRetencionPlan = {
  slug: "telasist-retencion";
  projectName: string;
  kickoffDate: ISODate;
  endDate: ISODate;
  phases: Phase[];
  activities: Activity[];
  milestones: Milestone[];
  risks: Risk[];
  stableCriteria: StableCriterion[];
  statusUpdates: StatusUpdate[];
};

// ============================================================================
// PHASES
// ============================================================================

const PHASES: Phase[] = [
  {
    id: "f0",
    number: 0,
    title: "Discovery closure · definiciones de negocio y decisiones operativas",
    shortLabel: "F0 · Discovery",
    description:
      "Tres semanas para cerrar las 3 dependencias bloqueantes de Invex (matriz de decisión del beneficio, aprobación legal para uso de IA, política de fallo de identidad) y las 6 decisiones operativas que destraban F1 (ubicación de los 10 campos del tarjetahabiente, Record Type dedicado, ruta de transferencia humana, catálogo 2026, reconciliación de inconsistencias documentales, normalización del catálogo de productos). Sin esto F2 no puede arrancar; F1 puede empezar en paralelo contra mocks.",
    objective:
      "3 dependencias bloqueantes cerradas con dueño y fecha, 6 decisiones operativas firmadas, catálogo 2026 confirmado, sandbox QA refrescado desde PROD, Partner implementador seleccionado y onboarding firmado.",
    startDate: "2026-10-13",
    endDate: "2026-10-31",
    requires: [
      "Discovery Brief v0 publicado (16-pag · ya existe)",
      "Audit técnico sandbox + PROD completado (ya existe)",
      "Snapshot externo distribuido a Telasist + Invex (ya existe)",
      "Acceso lectura al sandbox QA y PROD de Telasist",
    ],
    outcome:
      "Matriz de decisión del beneficio entregada por Invex en formato consumible por metadata, aprobación legal firmada, política de fallo de identidad documentada, Record Type creado o decisión de reuso, ruta de transferencia humana definida, Partner con alcance firmado.",
    gate:
      "Telasist Sponsor + Invex Sponsor firman el cierre de las 9 definiciones. Partner confirma disponibilidad para F1.",
    color: "#066AFE",
  },
  {
    id: "f1",
    number: 1,
    title: "Build en sandbox · Agent Script + acciones + metadata contra mocks",
    shortLabel: "F1 · Build",
    description:
      "Cuatro semanas de construcción en paralelo con F0. Clonar el patrón de voice agent interno (33 versiones iteradas) como base. Diseñar el subagent Retencion_TDC con las 7 etapas del call model. Construir 8 Apex invocable actions (búsqueda del tarjetahabiente, lectura del bloque, decisión de beneficio contra mock, folio, 3 trámites, comentario a planchar, creación/actualización del Case, transferencia humana). Poblar Custom Metadata del catálogo A-J y matriz producto × beneficio como v2026-draft. Suite de 12 pruebas Agent Script. Code review conjunto FDE + Partner. Puede arrancar sin F0 cerrada — opera contra mocks reemplazables en F1.5.",
    objective:
      "Agent Script funcional en sandbox QA con las 7 etapas, 8 acciones invocables desplegadas, 12 pruebas pasando, catálogo Custom Metadata poblado como v2026-draft, PR mergeada tras code review conjunto.",
    startDate: "2026-10-13",
    endDate: "2026-11-07",
    requires: [
      "Sandbox QA con metadata refrescada desde PROD (actividad 0.13)",
      "Partner firmado y con acceso a sandbox (actividad 0.14)",
      "Record Type decidido (actividad 0.10) · lo demás contra mocks",
    ],
    outcome:
      "Agente demostrable en preview que entra, valida identidad, lee el bloque Tarjetahabiente, ofrece beneficio natural como fallback, maneja objeciones, cierra en uno de 3 escenarios (RB/CC/CB) y escribe el Case con el contrato de salida completo.",
    gate:
      "`sf agent validate` con 0 errores · 12/12 pruebas pasando · code review firmado por FDE y Partner · demo en vivo al Telasist Sponsor.",
    color: "#022AC0",
  },
  {
    id: "f1_5",
    number: 2,
    title: "Reemplazar mocks · reglas reales de Invex y catálogo 2026",
    shortLabel: "F1.5 · Replace mocks",
    description:
      "Ventana corta de 1 semana para reemplazar el fallback 'beneficio natural' por las reglas reales que entregue Invex (DEP-1). Poblar `Benefit_Rule__mdt` con la matriz semáforo + VPN + segmento → beneficio, reemplazar los textos genéricos de oferta por los montos reales del catálogo 2026, re-correr la suite de pruebas con 50 escenarios reales y confirmar accuracy ≥ 95 % antes de pasar a F2.",
    objective:
      "`Benefit_Rule__mdt` poblado con las reglas finales, scripts actualizados con montos reales, suite extendida a 50 escenarios con accuracy ≥ 95 %.",
    startDate: "2026-11-10",
    endDate: "2026-11-14",
    requires: [
      "DEP-1 cerrada por Invex (actividad 0.4)",
      "DEP-3 política de fallo de identidad cerrada (actividad 0.6)",
      "F1 mergeada con mocks (actividad 1.17)",
    ],
    outcome:
      "Agente operando con reglas y montos reales en sandbox, suite extendida con 50 escenarios pasando ≥ 95 %, listo para shadow pilot.",
    gate:
      "FDE firma validación de accuracy sobre 50 escenarios reales · Invex IT Lead firma validación de las reglas aplicadas.",
    color: "#00B3FF",
  },
  {
    id: "f2",
    number: 3,
    title: "Shadow pilot · agente escucha, humano decide",
    shortLabel: "F2 · Shadow",
    description:
      "Dos semanas de piloto en modo observación en producción. El agente de voz corre contra el 5-10 % del tráfico real pero NO actúa — su decisión se registra en paralelo con la del operador humano para comparación. Métricas que decidimos: accuracy en captura de nombre/RFC/últ.6, latencia de primera respuesta, mix de outcomes (retención/CC/CB) vs humano, tasa de propuesta de beneficio óptimo. Requiere aprobación legal cerrada (DEP-2) y grabación activa alineada con la política.",
    objective:
      "Dashboard A/B operativo mostrando decisión agente vs humano en 5-10 % del tráfico, con muestreo ≥ 300 llamadas por semana. Decisión go/no-go documentada en base a KPIs definidos.",
    startDate: "2026-11-17",
    endDate: "2026-11-28",
    requires: [
      "DEP-2 aprobación legal Invex firmada (actividad 0.5)",
      "F1.5 cerrada con accuracy ≥ 95 %",
      "Call recording configurado según política legal",
      "Dashboard A/B desplegado (actividad 2.2)",
    ],
    outcome:
      "Reporte con accuracy real, mix de outcomes, 2-3 ajustes de prompt identificados, decisión firmada por Telasist + Invex sobre pasar a F3.",
    gate:
      "Accuracy en captura ≥ 95 % · mix de outcomes dentro de ±5 % del baseline humano por razón · 0 incidentes P1 · firma del comité de pilotaje.",
    color: "#90D0FE",
  },
  {
    id: "f3",
    number: 4,
    title: "Soft launch · 10 % en horario valle con rollback automático",
    shortLabel: "F3 · Soft launch",
    description:
      "Dos semanas de activación real limitada: el agente atiende el 10 % del tráfico pero solo en franjas horarias de bajo volumen (p. ej. L-V 10-12 y 15-17) con un trigger de rollback automático si la tasa de error supera un umbral acordado. Resto del tráfico sigue al operador humano. Daily standups durante toda F3. Smoke test diario sobre casos reales ya cerrados por el agente.",
    objective:
      "10 % del tráfico atendido por el agente en horario valle durante 2 semanas sin incidente P1. KPIs ≥ baseline humano en 3 de 4 métricas clave.",
    startDate: "2026-12-01",
    endDate: "2026-12-12",
    requires: [
      "F2 cerrada con firma del comité",
      "Trigger de rollback automático configurado (actividad 3.1)",
      "Horario valle acordado con Telasist Operations",
    ],
    outcome:
      "~200 llamadas reales atendidas por el agente con KPIs documentados, 0 incidente P1, decisión firmada sobre arrancar F4 tras el freeze de fin de año.",
    gate:
      "KPIs ≥ baseline en 3 de 4 métricas (tasa de retención, handle time, accuracy, mix outcomes) · 0 P1 · comité firma go para F4.",
    color: "#001E5B",
  },
  {
    id: "f4",
    number: 5,
    title: "Rollout gradual · 25 % → 50 % → 75 % → 100 %",
    shortLabel: "F4 · Rollout",
    description:
      "Rollout escalonado post-freeze de fin de año (reanuda 2027-01-12). Semana a semana se eleva el porcentaje de tráfico atendido por el agente: 25 %, 50 %, 75 %, 100 %. En cada punto se revisa KPIs y se puede frenar o rollback. Al llegar a 100 % se entrega el runbook operativo y se hace QBR final con handoff a soporte.",
    objective:
      "100 % del tráfico de la campaña atendido por el agente, runbook operativo entregado, QBR final firmado por Telasist Sponsor + Invex Sponsor.",
    startDate: "2027-01-12",
    endDate: "2027-02-13",
    requires: [
      "F3 cerrada con firma",
      "Validación post-freeze de la carga diaria Invex (actividad 4.1)",
    ],
    outcome:
      "Agente en 100 % del tráfico, runbook, QBR firmado, handoff formal a soporte operativo.",
    gate:
      "KPIs sostenidos ≥ baseline durante las 4 semanas · runbook aceptado · QBR firmado.",
    color: "#0F0F1A",
  },
];

// ============================================================================
// ACTIVITY FACTORY
// ============================================================================

function act(
  params: Partial<Activity> &
    Pick<
      Activity,
      | "id"
      | "phaseId"
      | "number"
      | "title"
      | "description"
      | "owner"
      | "type"
      | "week"
      | "plannedStart"
      | "plannedEnd"
      | "deliverables"
    >,
): Activity {
  return {
    collaborators: [],
    delegableToPartner: false,
    status: "not-started",
    progressPercent: 0,
    dependencies: [],
    references: [],
    updates: [],
    blockers: [],
    tags: [],
    ...params,
  };
}

// ============================================================================
// ACTIVITIES
// ============================================================================

const ACTIVITIES: Activity[] = [
  // ============ F0 · Discovery closure ============
  act({
    id: "0.1",
    phaseId: "f0",
    number: "0.1",
    title: "Kick-off interno Salesforce (FDE + CSM + AE)",
    description:
      "Alinear al equipo interno sobre el Discovery Brief, el audit técnico y el snapshot externo. Confirmar roles: FDE lidera arquitectura y entregables técnicos; CSM maneja relación con Telasist Sponsor; AE maneja comercial y relación con Invex.",
    owner: "Salesforce - FDE",
    collaborators: ["Salesforce - CSM", "Salesforce - AE"],
    type: "Mgmt",
    week: 1,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-13",
    deliverables: ["Plan interno validado", "Narrativa alineada para Telasist + Invex"],
    tags: ["kick-off", "internal", "critical-path"],
  }),
  act({
    id: "0.2",
    phaseId: "f0",
    number: "0.2",
    title: "Kick-off ejecutivo con Telasist (Sponsor + IT + Operations)",
    description:
      "Presentar el snapshot externo a Telasist. Confirmar stakeholders por Telasist (Sponsor, IT Lead, Operations Lead), owner de las decisiones operativas (DEC-1 a DEC-4 que le corresponden). Acordar daily standups durante F1-F3 y cadencia de reporting ejecutivo semanal.",
    owner: "Salesforce - CSM",
    collaborators: ["Salesforce - FDE", "Telasist - Sponsor", "Telasist - IT Lead", "Telasist - Operations"],
    type: "Mgmt",
    week: 1,
    plannedStart: "2026-10-14",
    plannedEnd: "2026-10-14",
    dependencies: ["0.1"],
    deliverables: ["Acta de kick-off con stakeholders + RACI", "Agenda de daily standups confirmada"],
    tags: ["kick-off", "critical-path"],
  }),
  act({
    id: "0.3",
    phaseId: "f0",
    number: "0.3",
    title: "Alineación tripartita Telasist + Invex + Salesforce",
    description:
      "Sesión conjunta para presentar el snapshot externo a Invex, confirmar los 3 owners de dependencias bloqueantes (matriz de decisión, legal, política de identidad) y acordar fechas límite duras. Es la sesión más importante de F0 — define si el proyecto arranca o se detiene.",
    owner: "Salesforce - CSM",
    collaborators: ["Salesforce - FDE", "Salesforce - AE", "Telasist - Sponsor", "Invex - Sponsor", "Invex - IT Lead"],
    type: "Mgmt",
    week: 1,
    plannedStart: "2026-10-16",
    plannedEnd: "2026-10-16",
    dependencies: ["0.2"],
    deliverables: [
      "Acta tripartita con 3 owners de dependencias bloqueantes",
      "Fechas límite comprometidas para DEP-1, DEP-2, DEP-3",
    ],
    tags: ["kick-off", "critical-path", "invex"],
  }),
  act({
    id: "0.4",
    phaseId: "f0",
    number: "0.4",
    title: "DEP-1 bloqueante · Matriz de decisión del beneficio (Invex)",
    description:
      "Invex entrega la matriz que define cómo el semáforo (código + color), la VPN (valor numérico), el segmento y el standing de la cuenta determinan qué beneficio A-J es aplicable a cada cliente. Formato esperado: tabla consumible por Custom Metadata (semaforo_code, semaforo_color, vpn_min, vpn_max, segmento, standing → benefit_code). Sin esto el agente solo puede ofrecer 'beneficio natural' como fallback, perdiendo tasa de retención.",
    owner: "Invex - IT Lead",
    collaborators: ["Invex - Sponsor", "Salesforce - FDE"],
    type: "Doc",
    week: 2,
    plannedStart: "2026-10-19",
    plannedEnd: "2026-10-30",
    dependencies: ["0.3"],
    deliverables: ["Matriz de decisión del beneficio en CSV o Excel con los campos acordados"],
    tags: ["dep-blocker", "invex", "critical-path"],
  }),
  act({
    id: "0.5",
    phaseId: "f0",
    number: "0.5",
    title: "DEP-2 bloqueante · Aprobación legal Invex para uso de IA",
    description:
      "Invex Legal firma la autorización para usar un agente de IA en la campaña Invex Retenciones TDC. Define: política de disclosure al cliente (¿se avisa que es IA al inicio?, ¿solo si pregunta?, ¿no se avisa?), reglas de grabación de la llamada, residencia de los datos de voz, requisitos de retención y supresión. Gate regulatorio del proyecto completo.",
    owner: "Invex - Legal",
    collaborators: ["Invex - Sponsor", "Salesforce - CSM"],
    type: "Review",
    week: 2,
    plannedStart: "2026-10-19",
    plannedEnd: "2026-10-30",
    dependencies: ["0.3"],
    deliverables: [
      "Autorización firmada para uso de IA en la campaña",
      "Política de disclosure al cliente definida",
      "Reglas de grabación y residencia de datos documentadas",
    ],
    tags: ["dep-blocker", "invex", "legal", "critical-path"],
  }),
  act({
    id: "0.6",
    phaseId: "f0",
    number: "0.6",
    title: "DEP-3 bloqueante · Política de fallo de identidad y lista de escalamientos",
    description:
      "Invex entrega: (a) cuántos reintentos máximo tiene el agente para validar identidad antes de transferir a humano, (b) qué dice el agente al cliente cuando falla la validación, (c) lista completa de casos que se escalan sin negociación (muerte del titular, incapacidad médica, tarjeta avalada, EXPI, cliente no encontrado en la carga, repeated validation failures, quejas legales).",
    owner: "Invex - IT Lead",
    collaborators: ["Invex - Sponsor", "Salesforce - FDE"],
    type: "Doc",
    week: 2,
    plannedStart: "2026-10-19",
    plannedEnd: "2026-10-30",
    dependencies: ["0.3"],
    deliverables: [
      "Política de reintentos de validación de identidad",
      "Lista completa de casos de escalamiento forzado",
    ],
    tags: ["dep-blocker", "invex", "critical-path"],
  }),
  act({
    id: "0.7",
    phaseId: "f0",
    number: "0.7",
    title: "Catálogo 2026 de beneficios A-J con montos y vigencias",
    description:
      "Invex confirma los montos exactos para cada beneficio (A: anualidad diferida 6/9 MSI, B: 50% waiver anualidad, C: 50% diferido 6 MSI, D: 50%+50%, E: Programa Cero 3 meses, F: Volaris bonus $500, G: UCEDOM $100, H: UCEDOM $50, I: non-use fee 3 meses, J: minimum spend $300), confirma cuáles tablas de fees son promocionales vs vigentes, y confirma los costos de Programa Cero. El brief tiene valores drafted como v2026-draft.",
    owner: "Invex - IT Lead",
    collaborators: ["Invex - Sponsor"],
    type: "Doc",
    week: 2,
    plannedStart: "2026-10-19",
    plannedEnd: "2026-10-27",
    dependencies: ["0.3"],
    deliverables: ["Catálogo 2026 oficial con montos, vigencias y referencia de catálogo trámite"],
    tags: ["definition", "invex", "catalog"],
  }),
  act({
    id: "0.8",
    phaseId: "f0",
    number: "0.8",
    title: "Reconciliar 8 inconsistencias documentales del Discovery Brief §9",
    description:
      "Invex resuelve los 8 puntos donde el manual, el training deck y los scripts no coinciden: (1) timing cancelación 24h vs 48h, (2) fuente oficial del folio, (3) bloqueo pre-cancelación, (4) catálogo 2025 obsoleto, (5) waiver 50 % único vs variantes, (6) nombres canónicos de producto, (7) datos de validación requeridos, (8) estado del template Salesforce. Un agente de voz lee literal; si hay dos versiones, dirá cualquiera.",
    owner: "Invex - IT Lead",
    collaborators: ["Telasist - Operations", "Salesforce - FDE"],
    type: "Doc",
    week: 3,
    plannedStart: "2026-10-26",
    plannedEnd: "2026-10-30",
    dependencies: ["0.3"],
    deliverables: ["Documento canónico con las 8 definiciones resueltas"],
    tags: ["definition", "invex"],
  }),
  act({
    id: "0.9",
    phaseId: "f0",
    number: "0.9",
    title: "Decisión: ubicación de los 10 campos del tarjetahabiente faltantes",
    description:
      "Decidir dónde se obtendrán los 10 campos que hoy no viven en Salesforce (balance, cut-off date, semáforo code, canal, plaza, provider, suspensión anualidad, segmento, standing). Opciones: (a) extender la carga diaria SFTP+MuleSoft, (b) callout a Invex en tiempo real desde el agente, (c) operar con default seguro. Impacto directo en el alcance de F1 (si es callout, nueva integración MuleSoft).",
    owner: "Telasist - IT Lead",
    collaborators: ["Invex - IT Lead", "Salesforce - FDE"],
    type: "Review",
    week: 2,
    plannedStart: "2026-10-19",
    plannedEnd: "2026-10-23",
    dependencies: ["0.3"],
    deliverables: ["Decisión arquitectónica firmada · tabla de campos por fuente"],
    tags: ["decision", "architecture", "critical-path"],
  }),
  act({
    id: "0.10",
    phaseId: "f0",
    number: "0.10",
    title: "Decisión Telasist · Record Type dedicado vs genérico",
    description:
      "Decidir si crear un Record Type 'Retención Invex TDC' en Case (recomendación FDE: dedicado para simplificar permisos del bot user, page layout específico y reportería del piloto) o seguir con 'Caso general' + filtro por Campana__c. Decisión arquitectónica ligera que define parte del metadata de F1.",
    owner: "Telasist - IT Lead",
    collaborators: ["Salesforce - FDE", "Partner"],
    type: "Review",
    week: 1,
    plannedStart: "2026-10-14",
    plannedEnd: "2026-10-16",
    dependencies: ["0.2"],
    deliverables: ["Decisión firmada · ADR corto"],
    tags: ["decision", "telasist", "architecture"],
  }),
  act({
    id: "0.11",
    phaseId: "f0",
    number: "0.11",
    title: "Decisión Telasist · Ruta de transferencia humana",
    description:
      "Decidir dónde van las transferencias humanas del agente: (a) cola Invex genérica (SC_Invex_Case_PC), (b) skill routing con el campo `Skill_Invex__c` ya poblado por la carga diaria (recomendación FDE), (c) crear cola nueva 'Cuentas Especiales'. Hoy los Cases se asignan directo a usuarios individuales, no hay cola de retención como tal.",
    owner: "Telasist - Operations",
    collaborators: ["Telasist - IT Lead", "Salesforce - FDE"],
    type: "Review",
    week: 1,
    plannedStart: "2026-10-14",
    plannedEnd: "2026-10-16",
    dependencies: ["0.2"],
    deliverables: ["Decisión firmada sobre routing de escalaciones"],
    tags: ["decision", "telasist", "routing"],
  }),
  act({
    id: "0.12",
    phaseId: "f0",
    number: "0.12",
    title: "Normalizar catálogo de productos Invex",
    description:
      "El training deck lista productos (Volaris 0/1/2, Invex, Invex 2.0, Farmacias Guadalajara) que no coinciden con los que están realmente en la picklist `Producto_Invex_Picklist__c` de PROD (Volaris 2.0 y variantes 2026, SiCard Plus/Platinum, Despegar Gold/Platinum, Voyage Oro/Platinum, Manchester, FRAGUA, Wal-Mart, SAM's, IKEA). Invex confirma el catálogo canónico y Telasist actualiza la picklist si es necesario.",
    owner: "Invex - IT Lead",
    collaborators: ["Telasist - IT Lead", "Salesforce - FDE"],
    type: "Doc",
    week: 2,
    plannedStart: "2026-10-19",
    plannedEnd: "2026-10-26",
    dependencies: ["0.3"],
    deliverables: ["Catálogo canónico de productos", "Picklist Producto_Invex_Picklist__c alineada"],
    tags: ["definition", "invex", "catalog"],
  }),
  act({
    id: "0.13",
    phaseId: "f0",
    number: "0.13",
    title: "Refresh del sandbox QA desde PROD",
    description:
      "El sandbox QA actual tiene ~98 campos custom menos que PROD en el Case y 0 cases de la campaña Invex Retenciones TDC. Hacer un refresh completo (metadata + sample data) para alinear el entorno de desarrollo con lo que se encontrará en PROD. Después del refresh re-validar accesos del bot user.",
    owner: "Telasist - IT Lead",
    collaborators: ["Salesforce - Support", "Partner"],
    delegableToPartner: true,
    type: "Config",
    week: 2,
    plannedStart: "2026-10-19",
    plannedEnd: "2026-10-23",
    dependencies: ["0.2"],
    deliverables: ["Sandbox QA refrescada y accesible al equipo del proyecto"],
    tags: ["ops", "critical-path", "delegable"],
  }),
  act({
    id: "0.14",
    phaseId: "f0",
    number: "0.14",
    title: "Selección y onboarding del Partner implementador",
    description:
      "Confirmar quién es el Partner que implementa F1 (actividades delegables: construcción de flows, actions, deploys, operations). Opciones a evaluar: partner que ya construyó el patrón AF Voice El Águila (tiene expertise del voice stack en Telasist). Firma del alcance y acceso al sandbox QA.",
    owner: "Salesforce - CSM",
    collaborators: ["Salesforce - AE", "Telasist - Sponsor", "Partner"],
    type: "Mgmt",
    week: 2,
    plannedStart: "2026-10-19",
    plannedEnd: "2026-10-28",
    dependencies: ["0.2"],
    deliverables: ["SOW firmada con el Partner", "Acceso del Partner al sandbox QA"],
    tags: ["partner", "critical-path"],
  }),
  act({
    id: "0.15",
    phaseId: "f0",
    number: "0.15",
    title: "Handshake con Partner · alcance delegable vs no delegable",
    description:
      "Sesión de alineación con el Partner. FDE presenta la matriz de delegación: Partner se encarga de implementaciones con spec clara (flows, actions, config), FDE se queda con diseño del subagent, textos críticos, Agent Spec, validaciones independientes y revisión de documentación.",
    owner: "Salesforce - FDE",
    collaborators: ["Salesforce - CSM", "Partner"],
    type: "Mgmt",
    week: 3,
    plannedStart: "2026-10-29",
    plannedEnd: "2026-10-30",
    dependencies: ["0.14"],
    deliverables: ["Matriz de delegación firmada con `delegableToPartner` por actividad"],
    tags: ["partner", "critical-path"],
  }),

  // ============ F1 · Build en sandbox ============
  act({
    id: "1.1",
    phaseId: "f1",
    number: "1.1",
    title: "Clonar patrón voice agent interno como template base",
    description:
      "Partir de la versión más reciente del patrón de voice agent interno de Telasist (33 versiones iteradas durante 2 meses). Crear la nueva GenAiPlannerBundle con nombre `AF_Voice_Invex_Retenciones_TDC_v1`. Mantener system/config/access base, variables de telefonía, surface, voice definition. Reemplazar el subagent de dominio.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-15",
    deliverables: ["GenAiPlannerBundle base clonada y renombrada en sandbox QA"],
    tags: ["dev", "delegable"],
  }),
  act({
    id: "1.2",
    phaseId: "f1",
    number: "1.2",
    title: "Diseñar Agent Spec para Retención Invex TDC",
    description:
      "Agent Spec en es_MX: persona (asesor de Cuentas Especiales, empático, no agresivo, respeta negativa clara), tono casual, límites de persuasión (sin presión tras no claro, sin promesas que no se pueden cumplir, sin falsa urgencia), objetivo del subagent, lista de intents fuera de alcance que escalan.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    type: "Doc",
    week: 1,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-16",
    deliverables: ["Agent Spec documentado · base del prompt del subagent"],
    tags: ["design", "spec"],
  }),
  act({
    id: "1.3",
    phaseId: "f1",
    number: "1.3",
    title: "Build subagent Retencion_TDC con las 7 etapas del call model",
    description:
      "Topic principal con las etapas: Welcome (<5s, 'Cuentas Especiales'), Identity_Validation (RFC con alfabeto aeronáutico, últ.6 tarjeta, nombre completo, producto), Reason_Probing (SPIN questions, ≤2), Benefit_Decision (llama acción Evaluate_Benefit), Offer_And_Rebuttal (≥2 objeciones), Closing (3 ramas RB/CC/CB), Farewell. Guardas booleanas por etapa (etapa_N_resuelta).",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-16",
    plannedEnd: "2026-10-23",
    dependencies: ["1.1", "1.2"],
    deliverables: ["Subagent Retencion_TDC en Agent Script DSL · 7 etapas con guardas"],
    tags: ["dev", "critical-path"],
  }),
  act({
    id: "1.4",
    phaseId: "f1",
    number: "1.4",
    title: "Build acción Validar_Cardholder_Invex",
    description:
      "Apex invocable action que busca el PersonAccount por `RFC__c` + `X6_ultimos_digitos_de_tarjeta_from__c` + nombre/apellidos. Devuelve `accountId`, `isValid`, `errorMessage`. Idempotencia con `Id_carga_data_loader__c`.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-16",
    plannedEnd: "2026-10-21",
    dependencies: ["0.13"],
    deliverables: ["Apex action desplegada + test class ≥ 80 %"],
    tags: ["dev", "delegable", "apex"],
  }),
  act({
    id: "1.5",
    phaseId: "f1",
    number: "1.5",
    title: "Build acción Get_Cardholder_Data",
    description:
      "Lee los campos del bloque 'Información Tarjetahabiente Invex' que viven en PersonAccount y Case (producto, semáforo color, VPN, fecha originación, folio Invex previo, 6 últ tarjeta). Devuelve estructura serializada al prompt.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-24",
    dependencies: ["1.4"],
    deliverables: ["Apex action + test class"],
    tags: ["dev", "delegable", "apex"],
  }),
  act({
    id: "1.6",
    phaseId: "f1",
    number: "1.6",
    title: "Build acción Evaluate_Benefit_Eligibility (contra mock)",
    description:
      "Núcleo de la lógica. Lee `Benefit_Rule__mdt` (vacío en F1 — se poblará en F1.5) y devuelve el beneficio aplicable. Fallback: 'beneficio natural de la tarjeta'. Entrada: razón, producto, semáforo, VPN, segmento. Salida: benefit_code, argument_text, cost_hint.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-27",
    dependencies: ["1.4"],
    deliverables: ["Apex action + Custom Metadata type + test class", "Fallback 'natural' documentado"],
    tags: ["dev", "critical-path"],
  }),
  act({
    id: "1.7",
    phaseId: "f1",
    number: "1.7",
    title: "Build acción Build_Folio",
    description:
      "Arma `RB/CC/CB + DDMMAA + últ.4` según el escenario de cierre. Validaciones de formato. Devuelve `folio` string.",
    owner: "Partner",
    delegableToPartner: true,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-22",
    deliverables: ["Apex action + test class"],
    tags: ["dev", "delegable", "apex"],
  }),
  act({
    id: "1.8",
    phaseId: "f1",
    number: "1.8",
    title: "Build acción Register_Tramite (hasta 3 con comentario)",
    description:
      "Escribe `Tramite_1/2/3__c` + `Comentarios_Tramite_1/2/3__c` en el Case. Lógica de slots (si ya hay Tramite_1, usa el 2; etc.) con tope de 3.",
    owner: "Partner",
    delegableToPartner: true,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-23",
    plannedEnd: "2026-10-27",
    dependencies: ["1.7"],
    deliverables: ["Apex action + test class"],
    tags: ["dev", "delegable", "apex"],
  }),
  act({
    id: "1.9",
    phaseId: "f1",
    number: "1.9",
    title: "Build acción Build_Analyst_Comment",
    description:
      "Produce el 'comentario a plancha' con formato `TYPE|CAT1|CAT2|CAT3|CAT4|ANALYST COMMENT` ≤150 chars. Codigos joined por pipe, categorías vacías permitidas. Escribe en `TIPIFICADOR_COMENTARIO_A_PLANCHAR__c`.",
    owner: "Partner",
    delegableToPartner: true,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-23",
    plannedEnd: "2026-10-27",
    deliverables: ["Apex action + test class"],
    tags: ["dev", "delegable", "apex"],
  }),
  act({
    id: "1.10",
    phaseId: "f1",
    number: "1.10",
    title: "Build acción Create_Update_Case_Retencion",
    description:
      "Crea o actualiza el Case con el contrato de salida completo: `Campana__c`, `Plan__c`, `Servicio__c`, `Resultado_de_llamada__c`, `Tipo_Invex__c` (RTCC/RTSC/CANC/TEAT), `Categoria_1..4__c`, `Subcategoria_1..4__c`, `Comentario_Analista__c`, `Folio__c`, `VPN__c`, `semaforo_color__c`, `rfc__c`, `Status` (Toma de datos → Cerrado o Cancelado), ownership. Idempotencia.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Dev",
    week: 3,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-11-03",
    dependencies: ["1.4", "1.7", "1.8", "1.9"],
    deliverables: ["Apex action + test class ≥ 80 %"],
    tags: ["dev", "delegable", "apex", "critical-path"],
  }),
  act({
    id: "1.11",
    phaseId: "f1",
    number: "1.11",
    title: "Build acción Escalate_To_Human",
    description:
      "Transfiere la llamada a la cola o skill definida en DEC-11 (actividad 0.11) con contexto: `caseId`, `accountId`, `motivo_escalamiento`, `transcript_summary`. Usa OmniChannelFlow como el patrón El Águila.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Dev",
    week: 3,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-11-03",
    dependencies: ["0.11", "1.10"],
    deliverables: ["Flow + Apex action + test"],
    tags: ["dev", "delegable", "routing"],
  }),
  act({
    id: "1.12",
    phaseId: "f1",
    number: "1.12",
    title: "Custom Metadata Beneficio_Invex__mdt (v2026-draft)",
    description:
      "Crear el Custom Metadata type con los 10 beneficios A-J del brief marcados como v2026-draft. Campos: `code`, `label`, `description`, `terms`, `tramite_code`, `is_active`. Poblar con las drafted values del Discovery Brief para pruebas en F1; se reemplaza en F1.5 con el catálogo oficial.",
    owner: "Partner",
    delegableToPartner: true,
    type: "Config",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-23",
    deliverables: ["Beneficio_Invex__mdt desplegado con 10 registros v2026-draft"],
    tags: ["config", "delegable", "metadata"],
  }),
  act({
    id: "1.13",
    phaseId: "f1",
    number: "1.13",
    title: "Custom Metadata Matriz_Producto_Beneficio__mdt",
    description:
      "Matriz producto × beneficio: `product_code`, `benefit_code`, `is_offered`. Base para la lógica de 'qué beneficios aplican a cada producto' del brief. Poblar con los valores drafted del PDF; se reconcilia en F1.5 contra el catálogo canónico de productos (actividad 0.12).",
    owner: "Partner",
    delegableToPartner: true,
    type: "Config",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-23",
    deliverables: ["Matriz_Producto_Beneficio__mdt desplegada"],
    tags: ["config", "delegable", "metadata"],
  }),
  act({
    id: "1.14",
    phaseId: "f1",
    number: "1.14",
    title: "Scripts base en es_MX con ortografía corregida",
    description:
      "Escribir los 5 scripts de cierre (Retención, Cancelación sin saldo, Pre-cancelación, Beneficio no aplicado, Cancelación no aplicada) + script de bienvenida + script de despedida. Normalizar ortografía ('Asimismo', 'continuará', 'horas' — los errores del manual original los lee literal el agente). Spanish Mexico, voz Marisa (patrón El Águila).",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    type: "Doc",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-27",
    dependencies: ["1.2"],
    deliverables: ["Scripts normalizados · base del prompt del subagent"],
    tags: ["copy", "spanish"],
  }),
  act({
    id: "1.15",
    phaseId: "f1",
    number: "1.15",
    title: "Suite de 12 pruebas Agent Script",
    description:
      "Escenarios: (1) retención exitosa, (2) cancelación sin saldo, (3) pre-cancelación con saldo, (4) cliente no encontrado en la carga, (5) fallo de identidad 2 intentos, (6) muerte del titular, (7) incapacidad médica, (8) tarjeta avalada, (9) EXPI, (10) cliente agresivo/legal, (11) beneficio no aplicado (follow-up), (12) interrupción del cliente mid-call.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    type: "Test",
    week: 4,
    plannedStart: "2026-11-03",
    plannedEnd: "2026-11-07",
    dependencies: ["1.3", "1.10", "1.11"],
    deliverables: ["12 escenarios de prueba en formato Agent Script test suite"],
    tags: ["test", "critical-path"],
  }),
  act({
    id: "1.16",
    phaseId: "f1",
    number: "1.16",
    title: "Code review conjunto FDE + Partner",
    description:
      "Review completo del subagent, las 8 acciones Apex, los 2 Custom Metadata types, los scripts y la test suite. Resolver findings antes del merge.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    type: "Review",
    week: 4,
    plannedStart: "2026-11-04",
    plannedEnd: "2026-11-06",
    dependencies: ["1.15"],
    deliverables: ["Review firmado · findings resueltos"],
    tags: ["review", "critical-path"],
  }),
  act({
    id: "1.17",
    phaseId: "f1",
    number: "1.17",
    title: "Deploy inicial al sandbox QA refrescado",
    description:
      "Deploy completo del bundle a sandbox QA. Validate con 0 errores. Publish del agente. Verificación manual con 3 llamadas de prueba desde el preview + 1 llamada real al número Partner Voice Forwarding.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Deploy",
    week: 4,
    plannedStart: "2026-11-06",
    plannedEnd: "2026-11-07",
    dependencies: ["0.13", "1.16"],
    deliverables: ["Agente desplegado y publishable en sandbox QA · demo end-to-end"],
    tags: ["deploy", "delegable", "critical-path"],
  }),

  // ============ F1.5 · Reemplazar mocks ============
  act({
    id: "1.5.1",
    phaseId: "f1_5",
    number: "1.5.1",
    title: "Poblar Benefit_Rule__mdt con reglas reales de Invex",
    description:
      "Transformar la matriz de decisión entregada en 0.4 a registros de Custom Metadata. Hasta cientos de reglas dependiendo de combinatoria semáforo × VPN × segmento × producto. Usar un data loader. Validar que no haya reglas en conflicto.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Config",
    week: 5,
    plannedStart: "2026-11-10",
    plannedEnd: "2026-11-11",
    dependencies: ["0.4", "1.6"],
    deliverables: ["Benefit_Rule__mdt poblado · reglas en conflicto resueltas"],
    tags: ["config", "delegable", "critical-path"],
  }),
  act({
    id: "1.5.2",
    phaseId: "f1_5",
    number: "1.5.2",
    title: "Actualizar scripts con montos reales del catálogo 2026",
    description:
      "Reemplazar los textos genéricos de oferta por los montos exactos del catálogo 2026 confirmado en 0.7. Normalizar errores ortográficos pendientes. Confirmar paráfrasis para dictado de montos.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    type: "Doc",
    week: 5,
    plannedStart: "2026-11-10",
    plannedEnd: "2026-11-12",
    dependencies: ["0.7", "1.14"],
    deliverables: ["Scripts v2 con montos reales"],
    tags: ["copy", "critical-path"],
  }),
  act({
    id: "1.5.3",
    phaseId: "f1_5",
    number: "1.5.3",
    title: "Suite extendida a 50 escenarios reales",
    description:
      "Expandir la suite de 12 a 50 escenarios cubriendo combinaciones de razón × producto × semáforo × segmento más frecuentes en producción (según mix observado en el audit).",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    type: "Test",
    week: 5,
    plannedStart: "2026-11-11",
    plannedEnd: "2026-11-13",
    dependencies: ["1.5.1", "1.5.2"],
    deliverables: ["Suite de 50 escenarios"],
    tags: ["test"],
  }),
  act({
    id: "1.5.4",
    phaseId: "f1_5",
    number: "1.5.4",
    title: "Validar accuracy ≥ 95 % sobre 50 escenarios",
    description:
      "Correr suite y confirmar accuracy ≥ 95 % en captura (nombre, RFC, últimos 4) + decisión de beneficio correcta contra la matriz. Si no se logra, iterar prompt y re-correr. Gate para F2.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    type: "Test",
    week: 5,
    plannedStart: "2026-11-13",
    plannedEnd: "2026-11-14",
    dependencies: ["1.5.3"],
    deliverables: ["Reporte de accuracy · ≥ 95 % o plan de iteración"],
    tags: ["test", "critical-path"],
  }),

  // ============ F2 · Shadow pilot ============
  act({
    id: "2.1",
    phaseId: "f2",
    number: "2.1",
    title: "Setup A/B routing con split 5 % a shadow",
    description:
      "Configurar en Amazon Connect + HVCC un split del 5 % del tráfico de la cola Invex Retenciones TDC hacia Agentforce Voice en modo observación: el agente genera decisión y comentario, pero el Case lo cierra el humano. La decisión del agente queda guardada en campos custom para comparación.",
    owner: "Partner",
    collaborators: ["Telasist - IT Lead", "Salesforce - FDE"],
    delegableToPartner: true,
    type: "Config",
    week: 6,
    plannedStart: "2026-11-17",
    plannedEnd: "2026-11-19",
    dependencies: ["1.5.4"],
    deliverables: ["Routing A/B operativo con 5 % hacia shadow"],
    tags: ["config", "delegable", "critical-path"],
  }),
  act({
    id: "2.2",
    phaseId: "f2",
    number: "2.2",
    title: "Dashboard A/B operativo",
    description:
      "Reporte Salesforce (CRM Analytics o Reports estándar) con split por 'decisión agente' vs 'decisión humana' en: tipo de llamada (RTCC/RTSC/CANC/TEAT), beneficio ofrecido, tasa de retención, handle time, accuracy en RFC/nombre/últ.6. Refresh diario.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Config",
    week: 6,
    plannedStart: "2026-11-17",
    plannedEnd: "2026-11-20",
    dependencies: ["2.1"],
    deliverables: ["Dashboard A/B accesible al equipo del proyecto"],
    tags: ["config", "delegable", "observability"],
  }),
  act({
    id: "2.3",
    phaseId: "f2",
    number: "2.3",
    title: "Activar call recording según política legal",
    description:
      "Activar grabación de las llamadas del agente alineado con la política firmada en 0.5. Confirmar residencia de datos y retención. Documentar quién tiene acceso a las grabaciones.",
    owner: "Telasist - IT Lead",
    collaborators: ["Invex - Legal"],
    type: "Config",
    week: 6,
    plannedStart: "2026-11-17",
    plannedEnd: "2026-11-18",
    dependencies: ["0.5"],
    deliverables: ["Call recording activo con policy documentada"],
    tags: ["config", "legal"],
  }),
  act({
    id: "2.4",
    phaseId: "f2",
    number: "2.4",
    title: "Semana 1 de shadow + daily standup",
    description:
      "Primera semana en modo observación. Daily standup de 15 min con FDE + Partner + Telasist Ops para revisar accuracy, outliers y ajustes de prompt. Objetivo: ~150 llamadas en shadow.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Telasist - Operations"],
    type: "Ops",
    week: 6,
    plannedStart: "2026-11-18",
    plannedEnd: "2026-11-21",
    dependencies: ["2.1", "2.2", "2.3"],
    deliverables: ["Reporte semana 1 con accuracy, mix outcomes y 1-3 ajustes aplicados"],
    tags: ["ops", "pilot"],
  }),
  act({
    id: "2.5",
    phaseId: "f2",
    number: "2.5",
    title: "Review mid-shadow + ajustes",
    description:
      "Review ejecutivo del fin de semana 1. Ajustes de prompt, textos, umbrales de confianza. Decidir si se mantiene el 5 % o se sube a 10 % para semana 2.",
    owner: "Salesforce - FDE",
    collaborators: ["Telasist - Operations", "Invex - IT Lead", "Partner"],
    type: "Review",
    week: 7,
    plannedStart: "2026-11-24",
    plannedEnd: "2026-11-24",
    dependencies: ["2.4"],
    deliverables: ["Acta con ajustes y decisión de split para semana 2"],
    tags: ["review"],
  }),
  act({
    id: "2.6",
    phaseId: "f2",
    number: "2.6",
    title: "Semana 2 de shadow",
    description:
      "Segunda semana con split acordado. Daily standup. Validar que los ajustes de semana 1 impactaron positivamente. Objetivo: ≥ 300 llamadas en shadow acumuladas (2 semanas).",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Telasist - Operations"],
    type: "Ops",
    week: 7,
    plannedStart: "2026-11-24",
    plannedEnd: "2026-11-27",
    dependencies: ["2.5"],
    deliverables: ["Reporte semana 2 con delta vs semana 1"],
    tags: ["ops", "pilot"],
  }),
  act({
    id: "2.7",
    phaseId: "f2",
    number: "2.7",
    title: "Reporte final shadow + go/no-go decision",
    description:
      "Reporte ejecutivo con accuracy, mix de outcomes, deltas vs baseline humano, ajustes aplicados. Comité (Telasist Sponsor + Invex Sponsor + FDE + Partner) decide pasar a F3.",
    owner: "Salesforce - FDE",
    collaborators: ["Salesforce - CSM", "Telasist - Sponsor", "Invex - Sponsor"],
    type: "Review",
    week: 7,
    plannedStart: "2026-11-27",
    plannedEnd: "2026-11-28",
    dependencies: ["2.6"],
    deliverables: ["Reporte final · decisión firmada go/no-go F3"],
    tags: ["review", "critical-path"],
  }),

  // ============ F3 · Soft launch ============
  act({
    id: "3.1",
    phaseId: "f3",
    number: "3.1",
    title: "Setup trigger de rollback automático",
    description:
      "Configurar un trigger que al detectar tasa de error ≥ umbral (p. ej. 3 cases con `Resultado_de_llamada__c = 'Error_Tecnico'` en < 30 min) automáticamente revierte el routing al 100 % humano. Dashboard con botón kill-switch manual también.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE", "Telasist - IT Lead"],
    delegableToPartner: true,
    type: "Config",
    week: 8,
    plannedStart: "2026-12-01",
    plannedEnd: "2026-12-02",
    dependencies: ["2.7"],
    deliverables: ["Trigger de rollback + kill-switch manual documentados"],
    tags: ["config", "delegable", "safety", "critical-path"],
  }),
  act({
    id: "3.2",
    phaseId: "f3",
    number: "3.2",
    title: "Definir horario valle y acuerdo operativo",
    description:
      "Telasist Operations define las franjas horarias de bajo volumen (p. ej. L-V 10-12 y 15-17). El agente solo opera ahí durante F3. Fuera de esas franjas el 100 % va al humano.",
    owner: "Telasist - Operations",
    collaborators: ["Telasist - IT Lead", "Salesforce - FDE"],
    type: "Review",
    week: 8,
    plannedStart: "2026-11-27",
    plannedEnd: "2026-11-28",
    dependencies: ["2.7"],
    deliverables: ["Acuerdo horario valle firmado"],
    tags: ["ops", "config"],
  }),
  act({
    id: "3.3",
    phaseId: "f3",
    number: "3.3",
    title: "Activación 10 % con kill-switch armado",
    description:
      "Cutover del split: 10 % del tráfico en horario valle al agente, 90 % al humano. Verificar con 5 llamadas smoke test antes de abrir el flujo real.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE", "Telasist - IT Lead"],
    delegableToPartner: true,
    type: "Deploy",
    week: 8,
    plannedStart: "2026-12-01",
    plannedEnd: "2026-12-01",
    dependencies: ["3.1", "3.2"],
    deliverables: ["Agente operando en producción al 10 % en horario valle"],
    tags: ["deploy", "delegable", "critical-path"],
  }),
  act({
    id: "3.4",
    phaseId: "f3",
    number: "3.4",
    title: "Daily standup de monitoring (10 días)",
    description:
      "Standup diario de 15 min durante los 10 días hábiles de F3. Revisar: KPIs del día, incidentes, ajustes necesarios, tasa de rollback. Si algún día dispara rollback automático, triage inmediato.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Telasist - Operations", "Invex - IT Lead"],
    type: "Ops",
    week: 8,
    plannedStart: "2026-12-01",
    plannedEnd: "2026-12-12",
    dependencies: ["3.3"],
    deliverables: ["10 actas de standup con KPIs del día y acciones"],
    tags: ["ops"],
  }),
  act({
    id: "3.5",
    phaseId: "f3",
    number: "3.5",
    title: "Reporte semana 1 soft launch",
    description:
      "Reporte ejecutivo del cierre de semana 1 con KPIs vs baseline humano: tasa de retención, handle time, accuracy, mix outcomes, tasa de escalamiento. Decisión de mantener o ajustar el split.",
    owner: "Salesforce - FDE",
    collaborators: ["Salesforce - CSM"],
    type: "Review",
    week: 8,
    plannedStart: "2026-12-05",
    plannedEnd: "2026-12-05",
    dependencies: ["3.4"],
    deliverables: ["Reporte semana 1 · decisión para semana 2"],
    tags: ["review"],
  }),
  act({
    id: "3.6",
    phaseId: "f3",
    number: "3.6",
    title: "Reporte semana 2 + go/no-go para F4",
    description:
      "Reporte final de F3. Comité decide pasar a F4 o repetir F3 con ajustes. Dado el freeze de fin de año, aunque haya 'go' no se arranca F4 hasta 2027-01-12.",
    owner: "Salesforce - FDE",
    collaborators: ["Salesforce - CSM", "Telasist - Sponsor", "Invex - Sponsor"],
    type: "Review",
    week: 9,
    plannedStart: "2026-12-11",
    plannedEnd: "2026-12-12",
    dependencies: ["3.4"],
    deliverables: ["Reporte final F3 · decisión firmada"],
    tags: ["review", "critical-path"],
  }),

  // ============ F4 · Rollout ============
  act({
    id: "4.1",
    phaseId: "f4",
    number: "4.1",
    title: "Validación post-freeze de la carga diaria Invex",
    description:
      "Durante el freeze de fin de año (14-dic a 11-ene) MuleSoft puede haber tenido pausas. Validar que la carga diaria SFTP está activa y poblando PersonAccounts al día antes de reanudar el agente.",
    owner: "Telasist - IT Lead",
    collaborators: ["Invex - IT Lead", "Salesforce - FDE"],
    type: "Ops",
    week: 14,
    plannedStart: "2027-01-12",
    plannedEnd: "2027-01-13",
    deliverables: ["Carga diaria confirmada activa · 3 días consecutivos sin falla"],
    tags: ["ops", "critical-path"],
  }),
  act({
    id: "4.2",
    phaseId: "f4",
    number: "4.2",
    title: "Rollout 25 % (semana 1)",
    description:
      "Elevar split a 25 % del tráfico. Ya no restringido a horario valle. Monitoring sigue en daily standup los primeros 3 días, luego 2x semana.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE", "Telasist - Operations"],
    delegableToPartner: true,
    type: "Deploy",
    week: 14,
    plannedStart: "2027-01-13",
    plannedEnd: "2027-01-19",
    dependencies: ["4.1"],
    deliverables: ["25 % del tráfico operando · reporte semana"],
    tags: ["deploy", "delegable"],
  }),
  act({
    id: "4.3",
    phaseId: "f4",
    number: "4.3",
    title: "Rollout 50 % (semana 2)",
    description:
      "Elevar split a 50 %. Si KPIs sostenidos, continuar. Si no, pausar y triage.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Deploy",
    week: 15,
    plannedStart: "2027-01-20",
    plannedEnd: "2027-01-26",
    dependencies: ["4.2"],
    deliverables: ["50 % del tráfico operando"],
    tags: ["deploy", "delegable"],
  }),
  act({
    id: "4.4",
    phaseId: "f4",
    number: "4.4",
    title: "Rollout 75 % (semana 3)",
    description: "Elevar split a 75 %. Último punto de pausa seguro antes del full flip.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Deploy",
    week: 16,
    plannedStart: "2027-01-27",
    plannedEnd: "2027-02-02",
    dependencies: ["4.3"],
    deliverables: ["75 % del tráfico operando"],
    tags: ["deploy", "delegable"],
  }),
  act({
    id: "4.5",
    phaseId: "f4",
    number: "4.5",
    title: "🎯 Rollout 100 % · GA",
    description:
      "Flip final al 100 % del tráfico. El agente es ahora el flujo primario de la campaña Invex Retenciones TDC. Operadores humanos atienden solo las escalaciones y los casos fuera de alcance del agente.",
    owner: "Telasist - IT Lead",
    collaborators: ["Salesforce - FDE", "Partner", "Invex - Sponsor"],
    type: "Deploy",
    week: 17,
    plannedStart: "2027-02-03",
    plannedEnd: "2027-02-06",
    dependencies: ["4.4"],
    deliverables: ["Agente al 100 % · smoke test post-cutover · 24h de monitoring reforzado"],
    tags: ["deploy", "ga", "critical-path"],
  }),
  act({
    id: "4.6",
    phaseId: "f4",
    number: "4.6",
    title: "Runbook operativo + handoff a soporte",
    description:
      "Documentar: cómo activar/desactivar el agente, cómo leer el dashboard A/B, troubleshooting común (fallos de validación, timeouts, errores de MuleSoft), proceso de rollback de emergencia. Handoff a Telasist Operations + Salesforce Support.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Telasist - Operations", "Salesforce - Support"],
    type: "Doc",
    week: 17,
    plannedStart: "2027-02-03",
    plannedEnd: "2027-02-10",
    dependencies: ["4.5"],
    deliverables: ["Runbook en Confluence o portal · aceptado por Operations y Support"],
    tags: ["doc", "handoff"],
  }),
  act({
    id: "4.7",
    phaseId: "f4",
    number: "4.7",
    title: "QBR final + cierre del proyecto",
    description:
      "Quarterly Business Review con Telasist Sponsor + Invex Sponsor + Salesforce (FDE, CSM, AE). KPIs finales vs baseline, ROI estimado, lecciones aprendidas, siguientes pasos (p. ej. extender a otras campañas Invex).",
    owner: "Salesforce - CSM",
    collaborators: ["Salesforce - FDE", "Salesforce - AE", "Telasist - Sponsor", "Invex - Sponsor"],
    type: "Mgmt",
    week: 17,
    plannedStart: "2027-02-11",
    plannedEnd: "2027-02-13",
    dependencies: ["4.6"],
    deliverables: ["Deck de QBR final · firma de cierre"],
    tags: ["mgmt", "qbr"],
  }),
];

// ============================================================================
// MILESTONES
// ============================================================================

const MILESTONES: Milestone[] = [
  {
    id: "kickoff-internal",
    title: "Kick-off interno Salesforce",
    description: "Alineación interna FDE + CSM + AE sobre el plan completo F0-F4.",
    date: "2026-10-13",
    kind: "Internal Review",
    phaseId: "f0",
    participants: ["Salesforce - FDE", "Salesforce - CSM", "Salesforce - AE"],
    status: "scheduled",
    references: [],
  },
  {
    id: "kickoff-telasist",
    title: "Kick-off ejecutivo con Telasist",
    description: "Presentar snapshot externo a Telasist Sponsor + IT + Operations.",
    date: "2026-10-14",
    kind: "Kick-off",
    phaseId: "f0",
    participants: ["Salesforce - CSM", "Salesforce - FDE", "Telasist - Sponsor", "Telasist - IT Lead", "Telasist - Operations"],
    status: "scheduled",
    references: [],
  },
  {
    id: "kickoff-tripartite",
    title: "Alineación tripartita Telasist + Invex + Salesforce",
    description: "Sesión conjunta con Invex para confirmar owners de dependencias bloqueantes.",
    date: "2026-10-16",
    kind: "Kick-off",
    phaseId: "f0",
    participants: ["Salesforce - CSM", "Salesforce - FDE", "Telasist - Sponsor", "Invex - Sponsor", "Invex - IT Lead"],
    status: "scheduled",
    references: [],
  },
  {
    id: "f0-review",
    title: "F0 Review · dependencias y decisiones cerradas",
    description: "Verificar que las 3 bloqueantes de Invex (DEP-1/2/3) y las 6 decisiones operativas estén firmadas.",
    date: "2026-10-30",
    kind: "Executive Review",
    phaseId: "f0",
    participants: ["Salesforce - FDE", "Salesforce - CSM", "Telasist - Sponsor", "Invex - Sponsor"],
    status: "scheduled",
    references: [],
  },
  {
    id: "f1-code-review",
    title: "F1 Code review + merge",
    description: "Review conjunto FDE + Partner · deploy inicial a sandbox QA refrescado.",
    date: "2026-11-07",
    kind: "Internal Review",
    phaseId: "f1",
    participants: ["Salesforce - FDE", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "f1_5-mocks-replaced",
    title: "F1.5 · Mocks reemplazados con reglas reales",
    description: "Benefit_Rule__mdt poblado · scripts con montos reales · accuracy ≥ 95 % sobre 50 escenarios.",
    date: "2026-11-14",
    kind: "Internal Review",
    phaseId: "f1_5",
    participants: ["Salesforce - FDE", "Partner", "Invex - IT Lead"],
    status: "scheduled",
    references: [],
  },
  {
    id: "shadow-start",
    title: "Shadow pilot · activación",
    description: "Primera semana en modo observación con 5 % del tráfico.",
    date: "2026-11-17",
    kind: "UAT Session",
    phaseId: "f2",
    participants: ["Salesforce - FDE", "Partner", "Telasist - IT Lead", "Telasist - Operations"],
    status: "scheduled",
    references: [],
  },
  {
    id: "shadow-go-no-go",
    title: "Shadow · decisión go/no-go para soft launch",
    description: "Comité decide pasar a F3 en base a accuracy y mix de outcomes.",
    date: "2026-11-28",
    kind: "Executive Review",
    phaseId: "f2",
    participants: ["Telasist - Sponsor", "Invex - Sponsor", "Salesforce - FDE", "Salesforce - CSM"],
    status: "scheduled",
    references: [],
  },
  {
    id: "soft-launch-cutover",
    title: "Soft launch cutover · 10 % en horario valle",
    description: "Primera activación real del agente con tráfico de clientes.",
    date: "2026-12-01",
    kind: "Go-live",
    phaseId: "f3",
    participants: ["Salesforce - FDE", "Partner", "Telasist - IT Lead"],
    status: "scheduled",
    references: [],
  },
  {
    id: "soft-launch-decision",
    title: "Soft launch · decisión final F4",
    description: "Comité decide arrancar rollout gradual tras el freeze.",
    date: "2026-12-12",
    kind: "Executive Review",
    phaseId: "f3",
    participants: ["Telasist - Sponsor", "Invex - Sponsor", "Salesforce - FDE", "Salesforce - CSM"],
    status: "scheduled",
    references: [],
  },
  {
    id: "ga",
    title: "🎯 GA · Agente al 100 % del tráfico",
    description: "Flip final. El agente pasa a ser el flujo primario de Invex Retenciones TDC.",
    date: "2027-02-06",
    kind: "Go-live",
    phaseId: "f4",
    participants: ["Telasist - IT Lead", "Salesforce - FDE", "Partner", "Invex - Sponsor"],
    status: "scheduled",
    references: [],
  },
  {
    id: "qbr-final",
    title: "QBR final · cierre del proyecto",
    description: "KPIs finales, ROI y siguientes pasos (otras campañas Invex).",
    date: "2027-02-13",
    kind: "QBR",
    phaseId: "f4",
    participants: ["Salesforce - CSM", "Salesforce - FDE", "Salesforce - AE", "Telasist - Sponsor", "Invex - Sponsor"],
    status: "scheduled",
    references: [],
  },
];

// ============================================================================
// RISKS
// ============================================================================

const RISKS: Risk[] = [
  {
    id: "R1",
    title: "DEP-1 (matriz de decisión) no se cierra a tiempo",
    description:
      "Invex no entrega la matriz semáforo + VPN + segmento → beneficio antes del fin de F0. F1.5 queda bloqueada; el agente opera con fallback 'beneficio natural' y pierde tasa de retención en el piloto, lo que compromete la decisión go/no-go.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Escalar en la sesión tripartita (0.3) con compromiso de fecha dura (0.4). Si al 2026-10-28 no hay entrega, Salesforce ofrece a Invex un workshop de 2 días para co-construir la matriz. F1 arranca contra mocks desde el día 1.",
    owner: "Salesforce - CSM",
    status: "active",
    phaseId: "f0",
    references: [],
  },
  {
    id: "R2",
    title: "DEP-2 (aprobación legal Invex) se extiende y bloquea F2",
    description:
      "La aprobación legal para uso de IA en la campaña se demora más allá de F1.5. Shadow pilot no puede arrancar en producción porque falta el gate regulatorio.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Involucrar a Invex Legal desde el kick-off tripartita (0.3) con un one-pager preparado por FDE con política sugerida de disclosure, grabación y residencia. Mientras tanto se construye todo en sandbox (F1) y se corre shadow interno con grabaciones simuladas si fuera necesario.",
    owner: "Invex - Sponsor",
    status: "active",
    phaseId: "f0",
    references: [],
  },
  {
    id: "R3",
    title: "10 campos del tarjetahabiente requieren callout real-time",
    description:
      "Si Invex no acepta extender la carga diaria con balance, cut-off, canal, plaza, segmento y los otros 5 campos faltantes, el agente necesita un callout en tiempo real a Invex para cada llamada. Esto amplía scope significativamente: nueva integración MuleSoft, SLA de Invex, autenticación, latencia que puede violar el budget de 5s.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Decisión temprana en 0.9 (semana 2 de F0). Si va callout, agregar actividad extra en F1 para construir la integración (~2 semanas de esfuerzo adicional del Partner). Si no se puede, el agente opera con 'default seguro CB' para toda decisión de balance.",
    owner: "Telasist - IT Lead",
    status: "active",
    phaseId: "f0",
    references: [],
  },
  {
    id: "R4",
    title: "Freshness de balance (24h) causa cancelaciones erróneas",
    description:
      "La carga diaria SFTP tiene snapshot del día anterior. Un cliente con saldo marcado 0 ayer pero que pagó hoy puede ser cancelado por error (CC) cuando debió ser pre-cancelado (CB). Riesgo operativo y de reputación.",
    probability: "Medium",
    impact: "Medium",
    mitigation:
      "Hard-coded: ante balance marginal (< $1000 o umbral acordado) default a CB (pre-cancelación). Marcar case con flag para revisión humana. Reporte diario de cancelaciones marginales durante F2/F3.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f2",
    references: [],
  },
  {
    id: "R5",
    title: "Partner no identificado o no disponible a tiempo",
    description:
      "F0 depende de confirmar el Partner implementador en la semana 2. Si no hay Partner, F1 arranca solo con FDE y se retrasan todas las actividades delegables (acciones Apex, configs, deploys). Impacto estimado: +2 semanas.",
    probability: "Medium",
    impact: "Medium",
    mitigation:
      "Trabajar en paralelo con Salesforce AE la selección (0.14). Priorizar partners con expertise previa en el patrón de voice agent interno de Telasist. Si no hay Partner, Salesforce absorbe las actividades delegables ampliando el esfuerzo FDE.",
    owner: "Salesforce - AE",
    status: "active",
    phaseId: "f0",
    references: [],
  },
  {
    id: "R6",
    title: "Diciembre · freeze de fin de año comprime F3",
    description:
      "Muchas organizaciones tienen freeze de cambios en producción desde mediados de diciembre hasta mediados de enero. Si Telasist o Invex tienen freeze, F3 se comprime o se parte y la decisión de F4 se demora.",
    probability: "High",
    impact: "Medium",
    mitigation:
      "Confirmar política de freeze de Telasist e Invex en 0.2 y 0.3. Ajustar fechas de F3 para cerrar antes del freeze (ya planeado: F3 termina 2026-12-12). F4 arranca 2027-01-12 ya alineado con el post-freeze.",
    owner: "Salesforce - CSM",
    status: "active",
    phaseId: "f3",
    references: [],
  },
  {
    id: "R7",
    title: "Volumen desde día 1 del rollout satura logs y monitoring",
    description:
      "Al llegar al 100 % el agente recibe ~930 llamadas/día. Si el logging del voice agent no está optimizado o el dashboard A/B no escala, se pierde observabilidad justo cuando más se necesita.",
    probability: "Low",
    impact: "Medium",
    mitigation:
      "Stress test del dashboard A/B en F2 con 10 % simulado. Confirmar límites de VoiceCall y storage en el org. En F4 arrancar con 25 % y escalar gradualmente para observar comportamiento del monitoring.",
    owner: "Partner",
    status: "active",
    phaseId: "f4",
    references: [],
  },
];

// ============================================================================
// STABLE CRITERIA
// ============================================================================

const STABLE_CRITERIA: StableCriterion[] = [
  {
    id: "C1",
    dimension: "Producto",
    criterion:
      "Las 7 etapas del call model (Welcome, Identity, Probing, Benefit Decision, Offer+Rebuttal, Closing, Farewell) cubiertas end-to-end con guardas booleanas por etapa.",
    status: "pending",
    references: [],
  },
  {
    id: "C2",
    dimension: "Producto",
    criterion:
      "Contrato de salida del Case escrito completo en cada llamada: Tipo_Invex, Resultado_de_llamada, Categoria_1..4, Subcategoria_1..4, Comentario_Analista, Folio, Tramite_1..3 + comentarios, TIPIFICADOR_COMENTARIO_A_PLANCHAR.",
    status: "pending",
    references: [],
  },
  {
    id: "C3",
    dimension: "Operación",
    criterion:
      "Accuracy en captura (nombre, RFC, 6 últ. tarjeta) ≥ 95 % sobre 50 escenarios reales. Validado en F1.5.",
    status: "pending",
    references: [],
  },
  {
    id: "C4",
    dimension: "Operación",
    criterion:
      "Mix de outcomes (retención, cancelación, pre-cancelación) del agente dentro de ±5 % del baseline humano por razón de llamada. Validado en F2 shadow.",
    status: "pending",
    references: [],
  },
  {
    id: "C5",
    dimension: "Operación",
    criterion:
      "Tasa de transferencia a humano por fallo técnico ≤ 2 % en F3 soft launch.",
    status: "pending",
    references: [],
  },
  {
    id: "C6",
    dimension: "Seguridad",
    criterion:
      "Grabación activa alineada con política legal firmada por Invex Legal. Residencia de datos documentada. Retención y supresión configuradas.",
    status: "pending",
    references: [],
  },
  {
    id: "C7",
    dimension: "Mantenibilidad",
    criterion:
      "Runbook operativo entregado y aceptado por Telasist Operations + Salesforce Support antes de GA.",
    status: "pending",
    references: [],
  },
  {
    id: "C8",
    dimension: "Observabilidad",
    criterion:
      "Dashboard A/B operativo con split por decisión agente vs humano, refresh diario, accesible a Telasist + Invex + Salesforce.",
    status: "pending",
    references: [],
  },
];

// ============================================================================
// EXPORT · PLAN OBJECT
// ============================================================================

export const telasistRetencionPlan: TelasistRetencionPlan = {
  slug: "telasist-retencion",
  projectName: "Telasist × Invex · Voice AI Agent para Retención Invex TDC",
  kickoffDate: "2026-10-13",
  endDate: "2027-02-13",
  phases: PHASES,
  activities: ACTIVITIES,
  milestones: MILESTONES,
  risks: RISKS,
  stableCriteria: STABLE_CRITERIA,
  statusUpdates: [],
};

// ============================================================================
// HELPER FUNCTIONS (compatibles con jafraPlan.ts y betterwarePlan.ts)
// ============================================================================

export function phaseProgress(plan: TelasistRetencionPlan, phaseId: string): number {
  const acts = plan.activities.filter((a) => a.phaseId === phaseId);
  if (acts.length === 0) return 0;
  const total = acts.reduce((sum, a) => sum + a.progressPercent, 0);
  return Math.round(total / acts.length);
}

export function phaseStatus(plan: TelasistRetencionPlan, phaseId: string): ActivityStatus {
  const acts = plan.activities.filter((a) => a.phaseId === phaseId);
  if (acts.length === 0) return "not-started";
  if (acts.every((a) => a.status === "done")) return "done";
  if (acts.some((a) => a.status === "blocked")) return "blocked";
  if (acts.some((a) => a.status === "in-progress" || a.status === "done")) return "in-progress";
  return "not-started";
}

export function globalProgress(plan: TelasistRetencionPlan): number {
  if (plan.activities.length === 0) return 0;
  const total = plan.activities.reduce((sum, a) => sum + a.progressPercent, 0);
  return Math.round(total / plan.activities.length);
}

export function currentPhase(
  plan: TelasistRetencionPlan,
  today: ISODate = new Date().toISOString().slice(0, 10),
): Phase | undefined {
  return (
    plan.phases.find((p) => today >= p.startDate && today <= p.endDate) ??
    plan.phases.find((p) => today < p.startDate)
  );
}

export function upcomingMilestones(
  plan: TelasistRetencionPlan,
  from: ISODate = new Date().toISOString().slice(0, 10),
  limit = 3,
): Milestone[] {
  return plan.milestones
    .filter((m) => m.date >= from && m.status === "scheduled")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

export function overallHealth(plan: TelasistRetencionPlan): HealthColor {
  const activeRealized = plan.risks.filter((r) => r.status === "realized").length;
  if (activeRealized > 0) return "red";
  const activeHighImpact = plan.risks.filter(
    (r) => r.status === "active" && r.impact === "High",
  ).length;
  if (activeHighImpact >= 2) return "yellow";
  const blocked = plan.activities.filter((a) => a.status === "blocked").length;
  if (blocked > 0) return "yellow";
  return "green";
}
