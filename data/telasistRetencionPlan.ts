// ============================================================================
// Telasist × Invex · Voice AI Agent para Retención Invex TDC
// Discovery: 2026-10-07 · Entrega a TS4/Skala: 2026-11-12 · UAT y pase a
// producción (tentativos): 2026-11-13 → 2026-12-11
// Autor: Equipo FDE Salesforce · Replan: 2026-10-26
// ============================================================================
// Objetivo: entregar el 12-nov al partner TS4/Skala un Voice AI Agent en
// Agentforce Voice + Agent Script, configurado con las reglas oficiales de la
// Knowledge "Invex - Retenciones", probado, auditado y afinado, para que
// atienda las llamadas entrantes de cancelación de la campaña Invex
// Retenciones TDC (~930 llamadas/día). Después del 12-nov: UAT del cliente y
// pase a producción a cargo del partner.
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
    title: "Discovery y definiciones de negocio",
    shortLabel: "F0 · Discovery",
    description: "Entender a fondo la operación humana de retención y cerrar las definiciones que solo Invex y Telasist pueden dar. Del 7 al 26-oct el Equipo FDE Salesforce produjo el Discovery Brief, la auditoría técnica, la línea base humana, el Plan de Estado, el mapa de datos y la conciliación contra la capacitación; el 25-oct apareció la Knowledge oficial 'Invex - Retenciones', que resolvió buena parte de los pendientes. Lo que sigue abierto tiene corte el 30-oct: lo que no llegue se configura con un supuesto documentado detrás de un interruptor.",
    objective: "Todas las reglas comerciales que el agente lee al cliente confirmadas por Invex o Telasist, o documentadas como supuesto con dueño.",
    startDate: "2026-10-07",
    endDate: "2026-10-30",
    requires: [
      "Acceso de lectura a Telasist-Sandbox y Telasist-Prod",
      "Knowledge oficial 'Invex - Retenciones'",
      "Manual de Proceso v2.0",
    ],
    outcome: "Matriz de elegibilidad, catálogo de productos, tipificaciones y folios confirmados; inconsistencias documentales resueltas o con supuesto explícito.",
    gate: "Sesión de cierre de definiciones del 30-oct con Telasist e Invex.",
    color: "#066AFE",
  },
  {
    id: "f1",
    number: 1,
    title: "Build base del agente (v1 → v8)",
    shortLabel: "F1 · Build",
    description: "Construcción del agente en Agent Script con la capa Apex de reglas: enrutador determinista, 6 subagentes (recepción, identificación, sondeo, oferta, cierre, escalamiento), 7 acciones, catálogo en Custom Metadata, guiones del Manual v2.0 y 79 pruebas Apex. Ocho versiones entre el 10 y el 22-oct; v8 está activa en el sandbox.",
    objective: "Motor conversacional y de reglas completo y demostrable en sandbox.",
    startDate: "2026-10-10",
    endDate: "2026-10-25",
    requires: [
      "Sandbox Telasist-Sandbox",
      "Manual de Proceso v2.0",
      "Discovery Brief v1",
    ],
    outcome: "Agente v8 activo, capa Apex desplegada, mapa de datos y Knowledge replicada.",
    gate: "Agente activo en sandbox y mapa de datos publicado.",
    color: "#022AC0",
  },
  {
    id: "f2",
    number: 2,
    title: "Configuración con reglas reales · Knowledge, Case y Cuenta",
    shortLabel: "F2 · Configuración",
    description: "Reemplazar el catálogo borrador por la matriz oficial de la Knowledge, alinear la escritura del Case con los valores de PROD, conectar las lecturas de la cuenta (saldo, producto, semáforo, VPN, Custom Data) y conectar la Knowledge al agente. Termina con la v9 activa en sandbox y las pruebas Apex otra vez en verde.",
    objective: "El agente decide con reglas reales y deja el Case tipificado como lo deja un ejecutivo humano.",
    startDate: "2026-10-26",
    endDate: "2026-11-04",
    requires: [
      "Definiciones de F0 (o supuestos documentados)",
      "Tarjetahabientes de prueba en QA y permisos de campo",
    ],
    outcome: "Agente v9 activo con reglas reales, Case correcto y Knowledge conectada.",
    gate: "v9 activa · pruebas Apex ≥ 85 % de cobertura · 0 rechazos de DML en Case.",
    color: "#0B5CAB",
  },
  {
    id: "f3",
    number: 3,
    title: "Voz y telefonía en sandbox",
    shortLabel: "F3 · Voz",
    description: "Conectar el agente a una ruta de voz de prueba (Partner Voice Forwarding / Amazon Connect), validar la transferencia a asesor con contexto y afinar el reconocimiento de RFC, dígitos y nombres de producto.",
    objective: "Llamada real por teléfono de principio a fin contra el sandbox.",
    startDate: "2026-10-29",
    endDate: "2026-11-06",
    requires: [
      "Ruta de transferencia humana definida",
      "Agente v9 (o v8) activo",
    ],
    outcome: "Primera llamada E2E por voz con transferencia probada.",
    gate: "Llamada E2E exitosa el 6-nov.",
    color: "#0176D3",
  },
  {
    id: "f4",
    number: 4,
    title: "Pruebas, auditoría y afinación",
    shortLabel: "F4 · Pruebas",
    description: "Suite de pruebas de conversación (≥ 40 escenarios), auditorías contra la Cédula de Evaluación v10, de código, de compliance del discurso y de UX de voz, observabilidad y una ronda de afinación (v10) con regresión. Cierra con un pre-UAT guiado con Telasist Operación.",
    objective: "Agente probado, auditado y afinado con evidencia.",
    startDate: "2026-11-02",
    endDate: "2026-11-11",
    requires: [
      "v9 activa",
      "Ruta de voz en sandbox",
    ],
    outcome: "Accuracy ≥ 95 % y hallazgos de auditoría cerrados o documentados.",
    gate: "Readiness review del 10-nov.",
    color: "#1B96FF",
  },
  {
    id: "f5",
    number: 5,
    title: "Entrega y handoff a TS4/Skala",
    shortLabel: "F5 · Entrega",
    description: "Paquete de deployment, documentación técnica, runbook, casos de UAT, Guía Maestra v2 y transferencia de conocimiento al partner TS4/Skala, que hará el pase a producción. Presentación final el 12-nov.",
    objective: "TS4/Skala recibe todo lo necesario para llevar el agente a producción sin depender del Equipo FDE Salesforce.",
    startDate: "2026-11-09",
    endDate: "2026-11-12",
    requires: [
      "Readiness review aprobado",
    ],
    outcome: "Acta de entrega firmada.",
    gate: "Presentación final del 12-nov.",
    color: "#5A1BA9",
  },
  {
    id: "f6",
    number: 6,
    title: "UAT del cliente (tentativo)",
    shortLabel: "F6 · UAT",
    description: "Telasist e Invex prueban el agente con los casos de UAT entregados; TS4/Skala corrige con soporte del Equipo FDE Salesforce. Fechas tentativas.",
    objective: "Sign-off de UAT de Invex y Telasist.",
    startDate: "2026-11-13",
    endDate: "2026-11-24",
    requires: [
      "Acta de entrega del 12-nov",
    ],
    outcome: "UAT aprobado.",
    gate: "Sign-off formal de UAT.",
    color: "#9050E9",
  },
  {
    id: "f7",
    number: 7,
    title: "Pase a producción (tentativo)",
    shortLabel: "F7 · Producción",
    description: "TS4/Skala despliega a PROD, conecta la cola de la campaña y hace un arranque controlado con rollout gradual. Requiere la aprobación legal de Invex para el uso de IA. Fechas tentativas.",
    objective: "Agente atendiendo llamadas reales de la campaña con fallback humano.",
    startDate: "2026-11-25",
    endDate: "2026-12-11",
    requires: [
      "UAT aprobado",
      "Aprobación legal Invex (0.14)",
    ],
    outcome: "Agente en producción con hypercare.",
    gate: "Go-live con aprobación de Invex y Telasist.",
    color: "#BA01FF",
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
  // ============ F0 · Discovery ============
  act({
    id: "0.1",
    phaseId: "f0",
    number: "0.1",
    title: "Kick-off interno Salesforce (FDE + CSM + AE)",
    description: "Alinear al equipo interno sobre el Discovery Brief, la auditoría técnica y el snapshot externo; roles de FDE, CSM y AE.",
    owner: "Salesforce - FDE",
    collaborators: ["Salesforce - CSM", "Salesforce - AE"],
    type: "Mgmt",
    week: 2,
    plannedStart: "2026-10-12",
    plannedEnd: "2026-10-12",
    actualStart: "2026-10-12",
    actualEnd: "2026-10-12",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Plan interno validado",
    ],
    tags: ["kick-off"],
  }),
  act({
    id: "0.2",
    phaseId: "f0",
    number: "0.2",
    title: "Kick-off ejecutivo con Telasist y sesión de arranque con Skala",
    description: "Presentación del snapshot externo y de la sesión de arranque Telasist × Skala × Invex; stakeholders, cadencia de seguimiento y decisiones operativas por dueño.",
    owner: "Salesforce - CSM",
    collaborators: ["Salesforce - FDE", "Telasist - Sponsor", "Telasist - IT Lead", "Telasist - Operations", "Partner"],
    type: "Mgmt",
    week: 2,
    plannedStart: "2026-10-12",
    plannedEnd: "2026-10-12",
    actualStart: "2026-10-12",
    actualEnd: "2026-10-12",
    status: "done",
    progressPercent: 100,
    dependencies: ["0.1"],
    deliverables: [
      "Presentación de arranque",
      "Stakeholders y cadencia acordados",
    ],
    references: [
      { label: "Presentación · Sesión de arranque Telasist × Skala × Invex", url: "/Customers/Telasist/files/Presentacion_Arranque_Telasist.html", kind: "document" },
    ],
    tags: ["kick-off"],
  }),
  act({
    id: "0.3",
    phaseId: "f0",
    number: "0.3",
    title: "Alineación tripartita Telasist + Invex + Salesforce",
    description: "Sesión con Invex para confirmar dueños y fechas de las definiciones bloqueantes (matriz de elegibilidad, aprobación legal, catálogo). Se concreta en la sesión de cierre del 30-oct (0.29).",
    owner: "Salesforce - CSM",
    collaborators: ["Salesforce - FDE", "Salesforce - AE", "Telasist - Sponsor", "Invex - Sponsor", "Invex - IT Lead"],
    type: "Mgmt",
    week: 2,
    plannedStart: "2026-10-12",
    plannedEnd: "2026-10-30",
    actualStart: "2026-10-12",
    status: "in-progress",
    progressPercent: 60,
    dependencies: ["0.2"],
    deliverables: [
      "Dueños y fechas comprometidas por Invex",
    ],
    tags: ["invex", "critical-path"],
  }),
  act({
    id: "0.4",
    phaseId: "f0",
    number: "0.4",
    title: "Discovery Brief v0 → v1",
    description: "Documento de discovery del caso de uso: alcance por fases, modelo de llamada en 7 etapas, catálogo de 10 beneficios × 14 productos, contrato de salida del Case y 12 inconsistencias documentales.",
    owner: "Salesforce - FDE",
    collaborators: ["Telasist - Operations"],
    type: "Doc",
    week: 1,
    plannedStart: "2026-10-07",
    plannedEnd: "2026-10-08",
    actualStart: "2026-10-07",
    actualEnd: "2026-10-08",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Discovery Brief v0 (7-oct)",
      "Discovery Brief v1 (8-oct)",
    ],
    tags: ["discovery"],
  }),
  act({
    id: "0.5",
    phaseId: "f0",
    number: "0.5",
    title: "Auditoría técnica sandbox + PROD y snapshot externo",
    description: "Auditoría del org (modelo de datos del Case, campaña, cola, VoiceCalls, integraciones) y versión externa sin IDs ni PII para Telasist e Invex.",
    owner: "Salesforce - FDE",
    type: "Review",
    week: 1,
    plannedStart: "2026-10-08",
    plannedEnd: "2026-10-09",
    actualStart: "2026-10-08",
    actualEnd: "2026-10-09",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Reporte de auditoría",
      "Snapshot externo (12 pp)",
    ],
    references: [
      { label: "Snapshot de preparación · versión externa (PDF)", url: "/Customers/Telasist/files/Telasist-Invex-Retencion-TDC-Snapshot-Externo.pdf", kind: "pdf" },
    ],
    tags: ["discovery"],
  }),
  act({
    id: "0.6",
    phaseId: "f0",
    number: "0.6",
    title: "Análisis de la línea base humana",
    description: "144,644 casos y 132,613 VoiceCalls de la campaña: retención 25.2 % acumulada y 34.5 % en ago-sep, 73 % de retenciones con costo, 23 % de llamadas de seguimiento, 48 % tipificado 'Otros'. Es la referencia contra la que se medirá el agente.",
    owner: "Salesforce - FDE",
    type: "Review",
    week: 2,
    plannedStart: "2026-10-12",
    plannedEnd: "2026-10-13",
    actualStart: "2026-10-12",
    actualEnd: "2026-10-13",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Análisis de línea base humana (PDF)",
    ],
    tags: ["baseline"],
  }),
  act({
    id: "0.7",
    phaseId: "f0",
    number: "0.7",
    title: "Follow-up #1 y matriz de preguntas técnicas",
    description: "Seguimiento al snapshot (qué está construido, 4 bloqueantes de Invex, 5 preguntas técnicas, 3 decisiones de Telasist) y matriz de preguntas técnicas para el partner.",
    owner: "Salesforce - FDE",
    type: "Doc",
    week: 1,
    plannedStart: "2026-10-11",
    plannedEnd: "2026-10-12",
    actualStart: "2026-10-11",
    actualEnd: "2026-10-12",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Follow-up #1 (5 pp)",
      "Matriz de preguntas técnicas",
    ],
    references: [
      { label: "Follow-up #1 · Estado del proyecto (PDF)", url: "/Customers/Telasist/files/Telasist-Invex-Retencion-TDC-Followup-01.pdf", kind: "pdf" },
    ],
    tags: ["discovery"],
  }),
  act({
    id: "0.8",
    phaseId: "f0",
    number: "0.8",
    title: "Plan de Estado del agente",
    description: "Qué hace el agente hoy en lenguaje de negocio, inventario verificado, línea base y bloqueantes. Corregido el 22-oct por el reporte semanal (la escritura del Case no estaba completa).",
    owner: "Salesforce - FDE",
    type: "Doc",
    week: 3,
    plannedStart: "2026-10-19",
    plannedEnd: "2026-10-19",
    actualStart: "2026-10-19",
    actualEnd: "2026-10-19",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Plan de Estado (10 pp)",
    ],
    references: [
      { label: "Plan de Estado · Agente de Voz Invex Retención TDC (PDF)", url: "/Customers/Telasist/files/Plan_Estado_Agente_Invex_Retencion_TDC.pdf", kind: "pdf" },
    ],
    tags: ["status"],
  }),
  act({
    id: "0.9",
    phaseId: "f0",
    number: "0.9",
    title: "Sesión de capacitación Telasist · proceso operativo INVEX Retenciones TDC",
    description: "Capacitación de Telasist sobre cómo trabaja el ejecutivo humano. Minuta de Skala con 14 pendientes (VPN, semáforo, Custom Data, folios, Walmart, matriz por motivo, saldo > $5,557.56, tipificaciones).",
    owner: "Telasist - Operations",
    collaborators: ["Salesforce - FDE", "Partner"],
    type: "Mgmt",
    week: 3,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-20",
    actualStart: "2026-10-20",
    actualEnd: "2026-10-20",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Minuta con 14 pendientes",
    ],
    references: [
      { label: "Reporte Semanal · 19 al 23 oct (PDF)", url: "/Customers/Telasist/files/Reporte_Semanal_Invex_Retencion_TDC_2026-10-22.pdf", kind: "pdf" },
    ],
    tags: ["discovery"],
  }),
  act({
    id: "0.10",
    phaseId: "f0",
    number: "0.10",
    title: "Conciliación de la capacitación contra el agente y los datos reales",
    description: "Contraste de los 14 pendientes contra el agente v7 y los datos de QA y PROD: 7 colores de semáforo reales, Custom Data 2/3 = 99 % de las cuentas, Generales ya existentes en PROD (4,895 casos), formato de folio confirmado.",
    owner: "Salesforce - FDE",
    type: "Review",
    week: 3,
    plannedStart: "2026-10-21",
    plannedEnd: "2026-10-22",
    actualStart: "2026-10-21",
    actualEnd: "2026-10-22",
    status: "done",
    progressPercent: 100,
    dependencies: ["0.9"],
    deliverables: [
      "Conciliación incluida en el Reporte Semanal S2",
    ],
    references: [
      { label: "Reporte Semanal · 19 al 23 oct (PDF)", url: "/Customers/Telasist/files/Reporte_Semanal_Invex_Retencion_TDC_2026-10-22.pdf", kind: "pdf" },
    ],
    tags: ["discovery"],
  }),
  act({
    id: "0.11",
    phaseId: "f0",
    number: "0.11",
    title: "Análisis de la Knowledge oficial 'Invex - Retenciones' contra los pendientes",
    description: "Barrido de la KB oficial (directorio, reglas comerciales, scripts, matriz tarjeta × trámite, generales), Ingeniería social, comunicados y Excel Campo Código. Resuelve folios, plazos, los 6 datos de validación, la regla Custom Data, la matriz por producto y 7 de las 12 inconsistencias del brief; detecta 10 contradicciones nuevas (semáforo, VPN, plantillas de comentario, trámites fuera de la KB).",
    owner: "Salesforce - FDE",
    type: "Review",
    week: 3,
    plannedStart: "2026-10-25",
    plannedEnd: "2026-10-26",
    actualStart: "2026-10-25",
    actualEnd: "2026-10-26",
    status: "done",
    progressPercent: 100,
    dependencies: ["1.18"],
    deliverables: [
      "Inventario de lo resuelto vs abierto",
      "10 contradicciones nuevas para 0.17",
    ],
    tags: ["knowledge"],
  }),
  act({
    id: "0.12",
    phaseId: "f0",
    number: "0.12",
    title: "Reporte semanal · semana 2 (19 al 23 oct)",
    description: "Reporte semanal con la conciliación de la capacitación, los 12 desajustes de la escritura al caso y 21 pendientes de negocio con dueño.",
    owner: "Salesforce - FDE",
    type: "Mgmt",
    week: 3,
    plannedStart: "2026-10-22",
    plannedEnd: "2026-10-22",
    actualStart: "2026-10-22",
    actualEnd: "2026-10-22",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Reporte Semanal S2 (8 pp)",
    ],
    references: [
      { label: "Reporte Semanal · 19 al 23 oct (PDF)", url: "/Customers/Telasist/files/Reporte_Semanal_Invex_Retencion_TDC_2026-10-22.pdf", kind: "pdf" },
    ],
    tags: ["status"],
  }),
  act({
    id: "0.13",
    phaseId: "f0",
    number: "0.13",
    title: "DEP-1 · Matriz de elegibilidad y ofertas (Invex)",
    description: "La KB ya trae la matriz tarjeta × trámite y las reglas por semáforo. Falta de Invex: valor numérico de VPN, equivalencia código ↔ color del semáforo, definición de 'segmento', criterio para elegir entre beneficios elegibles y orden de ofertas por motivo. En los datos de PROD el VPN es casi una función del color del semáforo (azul 500, oro 881, verde 2,000, platino 2,940, negro 5,000, rojo 0): hay que confirmar si es un tope en pesos del beneficio.",
    owner: "Invex - IT Lead",
    collaborators: ["Invex - Sponsor", "Salesforce - FDE"],
    type: "Doc",
    week: 2,
    plannedStart: "2026-10-12",
    plannedEnd: "2026-10-30",
    actualStart: "2026-10-12",
    status: "in-progress",
    progressPercent: 60,
    dependencies: ["0.3"],
    deliverables: [
      "Matriz VPN × semáforo → beneficio",
      "Orden de ofertas por motivo",
    ],
    updates: [
      {
        date: "2026-10-25",
        author: "Salesforce - FDE",
        note: "Knowledge oficial \"Invex - Retenciones\" (Prod v7, 20-oct; replicada al sandbox el 25-oct como 000001071) ya trae la tabla 'Beneficio × Regla comercial' y la matriz por producto (14 productos) con códigos de trámite. Reglas por semáforo: 12 MSI para azul, verde, dorado, negro y gris; bonificación 75 % para negro, dorado y gris sin VPN; Programa Cero para negro, dorado, gris, azul y verde; rojo no aplica en ningún beneficio. Pendiente: nombres de color vs datos (dorado/gris/plata vs ORO/PLATINO; AMARILLO no aparece) y matriz por motivo.",
      },
      {
        date: "2026-10-20",
        author: "Salesforce - FDE",
        note: "Sesión de capacitación: el VPN lo asigna el banco y se compara contra un catálogo de beneficios (Excel mostrado en la sesión, pendiente de entrega formal). Semáforo ROJO = no se ofrecen beneficios; sin color = beneficios básicos (cuenta reciente). Colores reales en QA: AZUL, ORO, PLATINO, VERDE, NEGRO, ROJO, AMARILLO.",
      },
    ],
    tags: ["invex", "blocker", "critical-path"],
  }),
  act({
    id: "0.14",
    phaseId: "f0",
    number: "0.14",
    title: "DEP-2 · Aprobación legal Invex para uso de IA, disclosure y grabación",
    description: "Aprobación formal de Invex y su área legal para que un agente de IA atienda la campaña: cómo se avisa al cliente que habla con una IA, grabación, residencia de datos y límites de persuasión. Incluye el aviso de privacidad simplificado que exige la LFPDPPP 2025 (art. 16) cuando los datos se obtienen por voz; los guiones de entrada no lo traen. Ya no condiciona la entrega del 12-nov; es el gate del pase a producción (F7).",
    owner: "Invex - Legal",
    collaborators: ["Invex - Sponsor", "Salesforce - CSM"],
    type: "Review",
    week: 2,
    plannedStart: "2026-10-12",
    plannedEnd: "2026-11-20",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["0.3"],
    deliverables: [
      "Aprobación legal firmada",
      "Política de disclosure y grabación",
    ],
    tags: ["invex", "legal", "gate-f7"],
  }),
  act({
    id: "0.15",
    phaseId: "f0",
    number: "0.15",
    title: "DEP-3 · Política de validación de identidad y escalamientos",
    description: "La KB fija los 6 datos de validación (nombre, RFC, teléfono, 6 dígitos, producto, estado). Falta confirmar qué pasa cuando falla la validación (el Manual dice que no se genera caso; el agente hoy lo crea) y la lista final de escalamientos.",
    owner: "Invex - IT Lead",
    collaborators: ["Telasist - Operations", "Salesforce - FDE"],
    type: "Doc",
    week: 2,
    plannedStart: "2026-10-12",
    plannedEnd: "2026-10-30",
    actualStart: "2026-10-12",
    status: "in-progress",
    progressPercent: 70,
    deliverables: [
      "Política de fallo de identidad",
    ],
    tags: ["invex"],
  }),
  act({
    id: "0.16",
    phaseId: "f0",
    number: "0.16",
    title: "Vigencia del catálogo de beneficios 2026",
    description: "Confirmar si siguen vigentes los trámites que están en el Excel o en el brief pero no en la KB (TRA31, TRA34, TRA50, SUBON, ACUC, TRA80–86 Altitude) y los montos con IVA de cada beneficio. El Monedero Volaris se eliminó en mayo de 2026, por lo que el Bono Volaris (TRA50) podría estar obsoleto.",
    owner: "Invex - IT Lead",
    collaborators: ["Telasist - Operations", "Salesforce - FDE"],
    type: "Doc",
    week: 2,
    plannedStart: "2026-10-12",
    plannedEnd: "2026-10-30",
    actualStart: "2026-10-12",
    status: "in-progress",
    progressPercent: 60,
    deliverables: [
      "Catálogo 2026 confirmado",
    ],
    tags: ["invex", "catalogo"],
  }),
  act({
    id: "0.17",
    phaseId: "f0",
    number: "0.17",
    title: "Reconciliar inconsistencias documentales (brief + KB)",
    description: "De las 12 inconsistencias del Discovery Brief, 7 quedaron resueltas por la KB. Se suman 10 contradicciones nuevas detectadas en la KB (vocabulario del semáforo, VPN en comentarios, plantillas de comentario KB vs Excel, Volaris 0, etiqueta de UCEDOM $100, exclusión por beneficios previos, taxonomía de motivos). Además, la sigla PC significa Programa Cero en la Knowledge y precancelación en el Manual.",
    owner: "Invex - IT Lead",
    collaborators: ["Telasist - Operations", "Salesforce - FDE"],
    type: "Review",
    week: 2,
    plannedStart: "2026-10-15",
    plannedEnd: "2026-10-30",
    actualStart: "2026-10-15",
    status: "in-progress",
    progressPercent: 55,
    dependencies: ["0.11"],
    deliverables: [
      "Una respuesta oficial por inconsistencia",
    ],
    tags: ["invex", "knowledge"],
  }),
  act({
    id: "0.18",
    phaseId: "f0",
    number: "0.18",
    title: "Catálogo canónico de productos",
    description: "La carga de PROD confirma los nombres (Volaris 0, Volaris, Volaris 2.0, Sams, Walmart, Despegar, IKEA, Voyage, NOW, SiCard, Manchester, Fragua). Falta: distinguir gold de platinum (Despegar, Voyage, SiCard; de eso depende UCEDOM $80) y definir el flujo para Hilton (~4,200 cuentas, lanzada en mayo de 2026), American Airlines (~770, septiembre de 2026), Amazon (que Invex publica como débito) y Real Madrid (sin rastro público). Mientras tanto el agente debe canalizar a Atención a Clientes cualquier producto fuera de catálogo.",
    owner: "Invex - IT Lead",
    collaborators: ["Telasist - IT Lead", "Salesforce - FDE"],
    type: "Doc",
    week: 2,
    plannedStart: "2026-10-12",
    plannedEnd: "2026-10-30",
    actualStart: "2026-10-12",
    status: "in-progress",
    progressPercent: 50,
    deliverables: [
      "Lista única de productos con variante",
    ],
    tags: ["invex", "catalogo"],
  }),
  act({
    id: "0.19",
    phaseId: "f0",
    number: "0.19",
    title: "Campos del tarjetahabiente en la carga diaria",
    description: "Confirmar llenado y frescura de saldo, producto, semáforo, VPN, Custom Data y fecha de corte en la Cuenta Personal, y si la carga trae línea de crédito (regla del 30 %), monto y fecha de facturación de la anualidad, bloqueos/agencia y la variante gold/platinum. El barrido del 26-oct confirmó que en la Cuenta de PROD sí existen Saldo, Producto, Custom Data, Bonif. suspensión y Fecha de corte, pero no hay fecha ni monto de la anualidad, línea de crédito ni Programa Cero activo, y el indicador de bloqueo es falso en todas las cuentas.",
    owner: "Telasist - IT Lead",
    collaborators: ["Salesforce - FDE"],
    type: "Config",
    week: 2,
    plannedStart: "2026-10-12",
    plannedEnd: "2026-10-29",
    actualStart: "2026-10-12",
    status: "in-progress",
    progressPercent: 60,
    deliverables: [
      "Campos confirmados con permisos en QA",
    ],
    updates: [
      {
        date: "2026-10-22",
        author: "Salesforce - FDE",
        note: "Prácticamente resuelta: el proceso AS-IS (16-oct) y la capacitación (20-oct) confirman que los campos llegan en la carga diaria SFTP → MuleSoft a la Cuenta Personal (saldo, fecha de corte, VPN, producto, semáforo código y color, fecha de originación, Custom Data, Bonif. suspensión anualidad, canal, plaza, proveedor, Skill). Falta confirmar llenado, frescura y permisos de campo sobre Saldo__c y Producto__c en QA.",
      },
    ],
    tags: ["telasist", "datos"],
  }),
  act({
    id: "0.20",
    phaseId: "f0",
    number: "0.20",
    title: "Decisión Telasist · Record Type del caso",
    description: "Se reutiliza el Record Type Caso_general con Campaña y Plan 'Invex Retenciones TDC'.",
    owner: "Telasist - IT Lead",
    collaborators: ["Salesforce - FDE"],
    type: "Config",
    week: 2,
    plannedStart: "2026-10-12",
    plannedEnd: "2026-10-12",
    actualStart: "2026-10-12",
    actualEnd: "2026-10-12",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Record Type decidido",
    ],
    tags: ["telasist"],
  }),
  act({
    id: "0.21",
    phaseId: "f0",
    number: "0.21",
    title: "Ruta de transferencia humana",
    description: "Definir a qué cola y con qué opción de IVR se transfiere cada motivo de escalamiento (hoy el agente usa una sola opción: Opciones_IVR_Motivo = *=1).",
    owner: "Telasist - Operations",
    collaborators: ["Telasist - IT Lead", "Salesforce - FDE"],
    type: "Config",
    week: 4,
    plannedStart: "2026-10-26",
    plannedEnd: "2026-10-30",
    status: "not-started",
    progressPercent: 0,
    deliverables: [
      "Matriz motivo de escalamiento → cola/opción",
    ],
    tags: ["telasist", "telefonia"],
  }),
  act({
    id: "0.22",
    phaseId: "f0",
    number: "0.22",
    title: "Validación operativa con ejecutivo INVEX (equipo de Antonio)",
    description: "Sesión con el ejecutivo de Invex para validar los 14 puntos de la capacitación y las contradicciones de la KB.",
    owner: "Telasist - Operations",
    collaborators: ["Partner", "Salesforce - FDE", "Invex - IT Lead"],
    type: "Review",
    week: 4,
    plannedStart: "2026-10-26",
    plannedEnd: "2026-10-28",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["0.9"],
    deliverables: [
      "Minuta con los 14 puntos validados",
    ],
    tags: ["telasist", "invex"],
  }),
  act({
    id: "0.23",
    phaseId: "f0",
    number: "0.23",
    title: "Reglas de Custom Data y tipificación general del caso",
    description: "Regla confirmada por la KB; pendiente solo la validación del ejecutivo INVEX.",
    owner: "Telasist - Operations",
    collaborators: ["Salesforce - FDE"],
    type: "Doc",
    week: 3,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-29",
    actualStart: "2026-10-20",
    status: "in-progress",
    progressPercent: 80,
    dependencies: ["0.22"],
    deliverables: [
      "Regla Custom Data validada",
    ],
    updates: [
      {
        date: "2026-10-25",
        author: "Salesforce - FDE",
        note: "Knowledge oficial confirma: solo Custom Data 2 o 3 procede a cancelación o retención; con 1, 4, 5, 6 o 7 se tipifica Resultado = Otros, Categoría = Mesa de Control, Subcategoría = Expediente Incompleto, Generales = Sin documentación y trámite INCEXP con o sin saldo.",
      },
    ],
    tags: ["telasist", "knowledge"],
  }),
  act({
    id: "0.24",
    phaseId: "f0",
    number: "0.24",
    title: "Nomenclatura de folios y cierre con saldo > $5,557.56",
    description: "Folio confirmado (prefijo + DDMMAA + últimos 4 dígitos) y precancelación solo con saldo ≤ $5,557.56. Falta qué folio y seguimiento aplican cuando el saldo supera ese monto. Prioridad alta: la práctica actual (pedir el pago sin generar folio) se parece a condicionar la cancelación frente a la LTOSF (art. 10 Bis 1), por lo que Invex debe definir un procedimiento con folio antes de producción.",
    owner: "Telasist - Operations",
    collaborators: ["Invex - IT Lead", "Salesforce - FDE"],
    type: "Doc",
    week: 3,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-30",
    actualStart: "2026-10-20",
    status: "in-progress",
    progressPercent: 60,
    deliverables: [
      "Regla para saldo > $5,557.56",
    ],
    updates: [
      {
        date: "2026-10-25",
        author: "Salesforce - FDE",
        note: "Knowledge oficial confirma el folio como prefijo + DDMMAA + últimos 4 dígitos (RB retención, CC sin adeudo, CB precancelación) y que la precancelación solo procede con saldo pendiente igual o menor a $5,557.56.",
      },
    ],
    tags: ["telasist", "knowledge"],
  }),
  act({
    id: "0.25",
    phaseId: "f0",
    number: "0.25",
    title: "Datos de cuenta por definir · fecha de originación y Bonif. suspensión anualidad",
    description: "Cómo se usa la fecha de originación en la elegibilidad y qué significa cada valor de Bonif. suspensión anualidad.",
    owner: "Invex - IT Lead",
    collaborators: ["Telasist - Operations", "Salesforce - FDE"],
    type: "Doc",
    week: 3,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-30",
    actualStart: "2026-10-20",
    status: "in-progress",
    progressPercent: 30,
    deliverables: [
      "Definición de ambos campos",
    ],
    updates: [
      {
        date: "2026-10-25",
        author: "Salesforce - FDE",
        note: "Knowledge oficial: la bonificación al 75 % aplica aunque el registro tenga 'No aplica' en Bonif. suspensión anualidad. Fecha de originación sigue sin definición.",
      },
    ],
    tags: ["invex"],
  }),
  act({
    id: "0.26",
    phaseId: "f0",
    number: "0.26",
    title: "Homologar semáforo y plantillas de comentario de trámite",
    description: "Una sola equivalencia de colores (KB: dorado/gris; comunicado: plata; Excel: amarillo/platino; datos: ORO/PLATINO/AMARILLO) y una sola plantilla de comentario por trámite (la KB y el Excel difieren, e Invex procesa ese texto).",
    owner: "Telasist - Operations",
    collaborators: ["Salesforce - FDE"],
    type: "Doc",
    week: 4,
    plannedStart: "2026-10-26",
    plannedEnd: "2026-10-30",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["0.11"],
    deliverables: [
      "Tabla de equivalencia de semáforo",
      "Plantillas de comentario oficiales",
    ],
    tags: ["telasist", "knowledge"],
  }),
  act({
    id: "0.27",
    phaseId: "f0",
    number: "0.27",
    title: "Cerrar los 7 'POR DEFINIR' del Manual v2.0, tipificación Walmart y Call Notes",
    description: "Del Manual v2.0 §6 queda resuelto de facto el lugar de la frase de entrada; parciales la matriz por motivo, saldo > $5,557.56 y el uso de Seguimiento a devolución / Cargo no reconocido / Consulta de saldo. Abiertos: tipificación del decremento Walmart, canalización a PC vs encuesta y el segundo 5 vs 6 de la Cédula. Además, mapear las 16 tipificaciones de Call Notes a las del manual.",
    owner: "Telasist - Operations",
    collaborators: ["Invex - IT Lead", "Salesforce - FDE"],
    type: "Doc",
    week: 3,
    plannedStart: "2026-10-19",
    plannedEnd: "2026-10-30",
    actualStart: "2026-10-19",
    status: "in-progress",
    progressPercent: 30,
    deliverables: [
      "Respuesta a los 7 puntos",
      "Mapeo de Call Notes",
    ],
    tags: ["telasist", "manual"],
  }),
  act({
    id: "0.28",
    phaseId: "f0",
    number: "0.28",
    title: "Alcance con el partner TS4/Skala y modelo de handoff",
    description: "Se acuerda que el Equipo FDE Salesforce entrega el agente configurado, probado y auditado el 12-nov a TS4/Skala, que ejecuta el UAT con el cliente y el pase a producción.",
    owner: "Salesforce - CSM",
    collaborators: ["Salesforce - FDE", "Partner"],
    type: "Mgmt",
    week: 2,
    plannedStart: "2026-10-12",
    plannedEnd: "2026-10-26",
    actualStart: "2026-10-12",
    actualEnd: "2026-10-26",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Modelo de entrega acordado",
    ],
    tags: ["partner"],
  }),
  act({
    id: "0.29",
    phaseId: "f0",
    number: "0.29",
    title: "Sesión de cierre de definiciones con Telasist e Invex",
    description: "Sesión con un solo entregable: respuesta o supuesto aprobado para cada pendiente de 0.13 a 0.27. Lo que no se cierre se configura con supuesto documentado detrás de un interruptor y queda en la lista de decisiones abiertas del handoff.",
    owner: "Salesforce - CSM",
    collaborators: ["Salesforce - FDE", "Telasist - Operations", "Invex - IT Lead", "Partner"],
    type: "Mgmt",
    week: 4,
    plannedStart: "2026-10-30",
    plannedEnd: "2026-10-30",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["0.13", "0.22", "0.26", "0.27"],
    deliverables: [
      "Acta con decisiones y supuestos",
    ],
    tags: ["gate", "critical-path"],
  }),
  act({
    id: "0.30",
    phaseId: "f0",
    number: "0.30",
    title: "Investigación de negocio Invex y de los productos de la campaña",
    description: "Investigación pública de Grupo Financiero Invex, de cada tarjeta de la campaña (anualidad, beneficios, recompensas, canal de cancelación) y de la regulación mexicana de cancelación de tarjetas de crédito. Base de la Guía Maestra y de la auditoría de compliance.",
    owner: "Salesforce - FDE",
    type: "Review",
    week: 4,
    plannedStart: "2026-10-26",
    plannedEnd: "2026-10-26",
    actualStart: "2026-10-26",
    actualEnd: "2026-10-26",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Notas de investigación A–D (≈52k palabras)",
    ],
    tags: ["guia-maestra"],
  }),
  act({
    id: "0.31",
    phaseId: "f0",
    number: "0.31",
    title: "Guía Maestra v1 · negocio, operación de retención y agente v8",
    description: "Libro de estudio del negocio de Invex, la operación humana de retención en Telasist y cómo la automatiza el agente v8, con diagramas y fact-check. Se publica en Documentos.",
    owner: "Salesforce - FDE",
    type: "Doc",
    week: 4,
    plannedStart: "2026-10-26",
    plannedEnd: "2026-10-31",
    actualStart: "2026-10-26",
    status: "in-progress",
    progressPercent: 40,
    dependencies: ["0.30"],
    deliverables: [
      "Guía Maestra v1 (PDF)",
    ],
    tags: ["guia-maestra"],
  }),
  // ============ F1 · Build ============
  act({
    id: "1.1",
    phaseId: "f1",
    number: "1.1",
    title: "Patrón base de voice agent como template",
    description: "Se parte del patrón de voice agent interno (Agent Script, template AgentforceServiceAgent, conexión de telefonía).",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-10",
    plannedEnd: "2026-10-10",
    actualStart: "2026-10-10",
    actualEnd: "2026-10-10",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Template base",
    ],
  }),
  act({
    id: "1.2",
    phaseId: "f1",
    number: "1.2",
    title: "Agent Spec del agente de retención",
    description: "Especificación del modelo de llamada, variables, acciones y contrato de salida del Case.",
    owner: "Salesforce - FDE",
    type: "Doc",
    week: 1,
    plannedStart: "2026-10-10",
    plannedEnd: "2026-10-12",
    actualStart: "2026-10-10",
    actualEnd: "2026-10-12",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Agent Spec",
    ],
  }),
  act({
    id: "1.3",
    phaseId: "f1",
    number: "1.3",
    title: "Enrutador determinista y 6 subagentes",
    description: "Recepción, identificación, sondeo, oferta, cierre y escalamiento, con transiciones deterministas y ~55 variables tipadas.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-10",
    plannedEnd: "2026-10-10",
    actualStart: "2026-10-10",
    actualEnd: "2026-10-10",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Agente v1–v5",
    ],
  }),
  act({
    id: "1.4",
    phaseId: "f1",
    number: "1.4",
    title: "Acción Validar tarjetahabiente",
    description: "Busca la cuenta de la campaña y valida identidad; crea o reutiliza el Case del día.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-10",
    plannedEnd: "2026-10-16",
    actualStart: "2026-10-10",
    actualEnd: "2026-10-16",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "InvexValidarTarjetahabiente",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    updates: [
      {
        date: "2026-10-20",
        author: "Salesforce - FDE",
        note: "Mapa de datos 20-oct: busca por SOSL con los primeros 10 caracteres del RFC filtrando por la campaña y exige 4 coincidencias (RFC, 6 dígitos, nombre, últimos 4 del teléfono). Máximo 2 intentos; si fallan crea un Case 'Identidad no validada' (el Manual v2.0 dice que no se genera caso, ver INV-19).",
      },
    ],
  }),
  act({
    id: "1.5",
    phaseId: "f1",
    number: "1.5",
    title: "Motor de ofertas · Obtener y Siguiente oferta",
    description: "Motor de retención (Engine/Service/Repository/Config): orden por motivo × producto, secuencia sin costo → con costo, mínimo y máximo de ofertas, memoria de 12 meses. Construido contra catálogo borrador.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-10",
    plannedEnd: "2026-10-16",
    actualStart: "2026-10-10",
    actualEnd: "2026-10-16",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "InvexObtenerOferta",
      "InvexSiguienteOferta",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
  }),
  act({
    id: "1.6",
    phaseId: "f1",
    number: "1.6",
    title: "Construcción del folio RB / CC / CB",
    description: "Prefijo + DDMMAA + últimos 4 dígitos, dictado dos veces en el cierre.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-10",
    plannedEnd: "2026-10-16",
    actualStart: "2026-10-10",
    actualEnd: "2026-10-16",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Folio en InvexRegistrarResultado",
    ],
  }),
  act({
    id: "1.7",
    phaseId: "f1",
    number: "1.7",
    title: "Registrar resultado, trámites y comentario del analista",
    description: "Hasta 3 trámites con comentario, respuesta literal del cliente y guion leído.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-10",
    plannedEnd: "2026-10-16",
    actualStart: "2026-10-10",
    actualEnd: "2026-10-16",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "InvexRegistrarResultado",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    updates: [
      {
        date: "2026-10-20",
        author: "Salesforce - FDE",
        note: "Mapa de datos 20-oct: los trámites se mandan como código (TRA37, ACUC6…) y el picklist usa nombres descriptivos, así que no se guarda ningún trámite (DM-02). Corrección en 2.3.",
      },
    ],
  }),
  act({
    id: "1.8",
    phaseId: "f1",
    number: "1.8",
    title: "Escritura del Case (InvexCaseWriter)",
    description: "Escritura del contrato de salida según Mapeo_Campos_Case. Construida; los valores no coinciden con PROD y se corrigen en F2.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-10",
    plannedEnd: "2026-10-16",
    actualStart: "2026-10-10",
    actualEnd: "2026-10-16",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "InvexCaseWriter",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    updates: [
      {
        date: "2026-10-20",
        author: "Salesforce - FDE",
        note: "Mapa de datos 20-oct: al cerrar, en QA se rechazó RTCC en Tipo_Invex__c y se perdió el bloque de retención (DM-01). Además Resultado_de_llamada__c espera Retención/Cancelación/Otros, la precancelación sale CANC en vez de PRECANC, categorías vacías y el folio no tiene campo propio. Corrección en 2.1–2.5.",
      },
    ],
  }),
  act({
    id: "1.9",
    phaseId: "f1",
    number: "1.9",
    title: "Escalamiento a asesor humano (12 motivos)",
    description: "Registro del escalamiento, resumen de 1–2 frases para el asesor, actualización de la VoiceCall y transferencia.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-10",
    plannedEnd: "2026-10-16",
    actualStart: "2026-10-10",
    actualEnd: "2026-10-16",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "InvexRegistrarEscalamiento",
      "Flow Update_Voice_Call_Description",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    updates: [
      {
        date: "2026-10-20",
        author: "Salesforce - FDE",
        note: "Mapa de datos 20-oct: el Case queda abierto en Toma de datos sin tipificar y la opción de IVR es siempre 1 (DM-10, ligado a 0.21). En el Case 00014209 la nota de transferencia quedó duplicada (DM-13).",
      },
    ],
  }),
  act({
    id: "1.10",
    phaseId: "f1",
    number: "1.10",
    title: "Catálogo en Custom Metadata (v2026-draft)",
    description: "Invex_Config, Invex_Beneficio (12), Invex_Motivo (6), Invex_Producto (14) e Invex_Regla (1 ejemplo). Borrador: todo marcado Pendiente_Confirmar y con costo; se reemplaza en 2.7–2.8.",
    owner: "Salesforce - FDE",
    type: "Config",
    week: 1,
    plannedStart: "2026-10-10",
    plannedEnd: "2026-10-16",
    actualStart: "2026-10-10",
    actualEnd: "2026-10-16",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "5 tipos de Custom Metadata",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    updates: [
      {
        date: "2026-10-20",
        author: "Salesforce - FDE",
        note: "Invex_Beneficio__mdt con 12 registros (A–J, variantes A6/A9 y J6/J12), todos v2026-draft. Invex_Regla__mdt tiene un solo ejemplo (excluir A con semáforo ROJO) y las reglas están apagadas.",
      },
    ],
  }),
  act({
    id: "1.11",
    phaseId: "f1",
    number: "1.11",
    title: "Guiones en es_MX del Manual v2.0",
    description: "Guion de entrada, retención (2.6), precancelación, cancelación y cierre con encuesta.",
    owner: "Salesforce - FDE",
    type: "Doc",
    week: 1,
    plannedStart: "2026-10-10",
    plannedEnd: "2026-10-22",
    actualStart: "2026-10-10",
    actualEnd: "2026-10-22",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Guiones en Config y Agent Script",
    ],
  }),
  act({
    id: "1.12",
    phaseId: "f1",
    number: "1.12",
    title: "Pruebas Apex · 79/79",
    description: "Pruebas de Actions (15), Engine (37) y Service (31) en verde el 16-oct. Se vuelven a correr tras los cambios de v8 y F2 (2.15).",
    owner: "Salesforce - FDE",
    type: "Test",
    week: 2,
    plannedStart: "2026-10-15",
    plannedEnd: "2026-10-16",
    actualStart: "2026-10-15",
    actualEnd: "2026-10-16",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "79 pruebas en verde",
    ],
  }),
  act({
    id: "1.13",
    phaseId: "f1",
    number: "1.13",
    title: "Primeros escenarios de conversación del agente",
    description: "Primeros 12 escenarios de conversación y casos de prueba en el sandbox (16 y 22-oct). En las 6 pruebas del 16-oct, 5 no pasaron la validación de identidad por falta de tarjetahabientes de prueba. Se completa con la suite de F4 (4.1).",
    owner: "Salesforce - FDE",
    type: "Test",
    week: 2,
    plannedStart: "2026-10-12",
    plannedEnd: "2026-10-22",
    actualStart: "2026-10-12",
    status: "in-progress",
    progressPercent: 50,
    deliverables: [
      "12 escenarios iniciales",
    ],
  }),
  act({
    id: "1.14",
    phaseId: "f1",
    number: "1.14",
    title: "Iteración v6 del agente",
    description: "Versión v6 (15-oct) con ajustes al planner.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-15",
    plannedEnd: "2026-10-15",
    actualStart: "2026-10-15",
    actualEnd: "2026-10-15",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Agente v6",
    ],
  }),
  act({
    id: "1.15",
    phaseId: "f1",
    number: "1.15",
    title: "Deploy al sandbox y agente v7",
    description: "Versión v7 publicada el 16-oct con la capa Apex completa.",
    owner: "Salesforce - FDE",
    type: "Deploy",
    week: 2,
    plannedStart: "2026-10-16",
    plannedEnd: "2026-10-16",
    actualStart: "2026-10-16",
    actualEnd: "2026-10-16",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Agente v7",
    ],
  }),
  act({
    id: "1.16",
    phaseId: "f1",
    number: "1.16",
    title: "Agente v8 alineado al Manual v2.0",
    description: "v8 activa desde el 22-oct: guion de retención 2.6, un intento de desescalamiento, captura de producto y estado, cierre con folio dictado dos veces y salvaguarda para no leer notas internas. Cambios en ObtenerOferta, RegistrarResultado, Config, Engine y Service.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 3,
    plannedStart: "2026-10-22",
    plannedEnd: "2026-10-22",
    actualStart: "2026-10-22",
    actualEnd: "2026-10-22",
    status: "done",
    progressPercent: 100,
    dependencies: ["1.15"],
    deliverables: [
      "Agente v8 activo",
    ],
    updates: [
      {
        date: "2026-10-26",
        author: "Salesforce - FDE",
        note: "Barrido 26-oct: v8 está Active en el sandbox (no inactiva como se reportó el 22-oct). El código modificado el 22-oct no tiene corrida de pruebas posterior; la cobertura quedó en 0 al recompilar (ver 2.15 y R10).",
      },
    ],
  }),
  act({
    id: "1.17",
    phaseId: "f1",
    number: "1.17",
    title: "Mapa de datos del agente v7 · qué consulta y dónde registra",
    description: "Qué lee y qué escribe el agente, con 12 desajustes contra la org (4 críticos).",
    owner: "Salesforce - FDE",
    type: "Doc",
    week: 3,
    plannedStart: "2026-10-19",
    plannedEnd: "2026-10-20",
    actualStart: "2026-10-19",
    actualEnd: "2026-10-20",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "Mapa de datos v7 (PDF)",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
  }),
  act({
    id: "1.18",
    phaseId: "f1",
    number: "1.18",
    title: "Réplica de los artículos Knowledge de Invex Retenciones al sandbox",
    description: "Los 3 artículos (Retenciones, Ingeniería social, comunicados) replicados como 000001069/70/71 con maestro es_MX y traducción en_US; Knowledge multilenguaje activado.",
    owner: "Salesforce - FDE",
    type: "Config",
    week: 3,
    plannedStart: "2026-10-25",
    plannedEnd: "2026-10-25",
    actualStart: "2026-10-25",
    actualEnd: "2026-10-25",
    status: "done",
    progressPercent: 100,
    deliverables: [
      "3 artículos Online en sandbox",
    ],
  }),
  // ============ F2 · Configuración ============
  act({
    id: "2.1",
    phaseId: "f2",
    number: "2.1",
    title: "Resultado de llamada y dependencia de Tipo Invex (DM-01, DM-05)",
    description: "Escribir Retención / Cancelación / Otros en Resultado_de_llamada__c. Hoy se escribe Retenido/Cancelado; como Tipo_Invex__c depende de ese campo, el DML rechaza también RTCC y se pierde el bloque de retención. No es un tema de permisos. Se corrige junto con 2.3: cada dependencia de picklist que falla tumba toda la escritura del cierre.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-10-28",
    status: "not-started",
    progressPercent: 0,
    deliverables: [
      "Mapeo corregido en Config",
      "Case de prueba con RTCC guardado",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "case", "critical-path"],
  }),
  act({
    id: "2.2",
    phaseId: "f2",
    number: "2.2",
    title: "PRECANC para precancelación (DM-07)",
    description: "La precancelación (folio CB) se tipifica hoy como CANC; en PROD existe PRECANC (1,530 casos humanos en 30 días).",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-10-28",
    status: "not-started",
    progressPercent: 0,
    deliverables: [
      "Codigo_Tipo_Precancelacion = PRECANC",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "case"],
  }),
  act({
    id: "2.3",
    phaseId: "f2",
    number: "2.3",
    title: "Trámites con nombre oficial y producto controlador (DM-02)",
    description: "Tramite_1-3__c depende de Producto_Invex_Picklist__c y espera nombres largos ('Anualidad a 9 MSI (cuenta con valor VPN)'). Mapear código → nombre oficial y escribir el campo controlador.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-10-30",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["2.6"],
    deliverables: [
      "Tabla código → nombre",
      "Producto_Invex_Picklist__c escrito",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "case", "critical-path"],
  }),
  act({
    id: "2.4",
    phaseId: "f2",
    number: "2.4",
    title: "Categoría y subcategoría por motivo (DM-08)",
    description: "Poblar Categoria_1/Subcategoria_1 por motivo como lo hace el ejecutivo (p. ej. CARGOS Y COMISIONES/CA2, NO ACEPTA RETENCIÓN/OTNE1) y corregir la posición del código de seguimiento (OTUCE2/5 es subcategoría de OTROS UCE).",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-28",
    plannedEnd: "2026-10-29",
    status: "not-started",
    progressPercent: 0,
    deliverables: [
      "Categorías en Invex_Motivo__mdt",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "case"],
  }),
  act({
    id: "2.5",
    phaseId: "f2",
    number: "2.5",
    title: "Comentario del analista ≤ 100 caracteres y formato oficial de trámites (DM-06)",
    description: "Comentario_Analista__c mide 100 caracteres y hoy se corta el folio. Usar el comentario oficial de cada trámite (KB, homologado en 0.26).",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-28",
    plannedEnd: "2026-10-29",
    status: "not-started",
    progressPercent: 0,
    deliverables: [
      "Comentarios con folio completo",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "case"],
  }),
  act({
    id: "2.6",
    phaseId: "f2",
    number: "2.6",
    title: "Lecturas de la cuenta · saldo, producto, semáforo, VPN, Custom Data y LC (DM-03, DM-04)",
    description: "Conectar Campo_Saldo_Account y Campo_Producto_Account (hoy vacíos: toda cancelación termina en CB) y leer semáforo, VPN, Custom Data, línea de crédito y fecha de corte. Validar el estado capturado contra la cuenta.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-10-30",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["0.19", "2.14"],
    deliverables: [
      "Lecturas conectadas",
      "Estado validado",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    updates: [
      {
        date: "2026-10-20",
        author: "Salesforce - FDE",
        note: "Mapa de datos 20-oct: lee de Account solo identidad, teléfono, semáforo y VPN, y estos dos solo con Usar_Reglas__c encendido (hoy apagado). Fecha de corte, Bonif. suspensión, canal, plaza y segmento no se leen.",
      },
    ],
    tags: ["f2", "cuenta", "critical-path"],
  }),
  act({
    id: "2.7",
    phaseId: "f2",
    number: "2.7",
    title: "Matriz de la Knowledge en el catálogo (tarjeta × trámite)",
    description: "Cargar la matriz oficial en Invex_Producto / Invex_Beneficio: 14 productos, TRA39 (12 MSI), TRA30, TRA32, TRA43/44/45, UCEDOM $50/$80/$100, con/sin costo correcto y Pendiente_Confirmar apagado donde la KB lo confirma.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-28",
    plannedEnd: "2026-10-30",
    actualStart: "2026-10-28",
    status: "in-progress",
    progressPercent: 10,
    dependencies: ["0.11"],
    deliverables: [
      "Catálogo v2026 cargado",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    updates: [
      {
        date: "2026-10-25",
        author: "Salesforce - FDE",
        note: "La matriz por producto de la Knowledge usa códigos que el catálogo del agente no tiene: TRA30 (promesa de anualidad gratis), TRA32 (bonificación 75 %), TRA43/TRA44 (Programa Cero 12M/6M) y TRA39.",
      },
    ],
    tags: ["f2", "catalogo", "knowledge", "critical-path"],
  }),
  act({
    id: "2.8",
    phaseId: "f2",
    number: "2.8",
    title: "Reglas de elegibilidad detrás de interruptor",
    description: "En Invex_Regla__mdt: semáforo rojo no aplica, anualidad facturada ≤ 90 días, Programa Cero ≤ 30 % de la LC, VPN donde aplique, exclusión por beneficios previos. Ajustar el orden de ofertas: la bonificación al 50 % es el 37 % de los trámites humanos y hoy nunca sale entre las tres primeras. Usar_Reglas encendido; lo no confirmado queda como supuesto documentado.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-29",
    plannedEnd: "2026-11-03",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["2.6", "2.7", "0.29"],
    deliverables: [
      "Reglas activas",
      "Lista de supuestos",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "catalogo", "critical-path"],
  }),
  act({
    id: "2.9",
    phaseId: "f2",
    number: "2.9",
    title: "Custom Data distinto de 2/3 y tarjetas canalizadas a Atención a Clientes",
    description: "Custom Data 1, 4, 5, 6 o 7 → cancelación sin expediente (INCEXP) y pedir al cliente completar documentación. NOW, Mercado Libre, Claire, CI Banco y Multiva se canalizan a AT.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-29",
    plannedEnd: "2026-10-30",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["2.6"],
    deliverables: [
      "Regla Custom Data",
      "Canalización a AT",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "knowledge"],
  }),
  act({
    id: "2.10",
    phaseId: "f2",
    number: "2.10",
    title: "Umbral de $5,557.56 con saldo real",
    description: "Precancelación (CB) solo con saldo ≤ $5,557.56; sin saldo, cancelación (CC). Comportamiento para saldo mayor según 0.24. El umbral coincide con la anualidad de Volaris 2.0 con IVA ($4,791 × 1.16): dejarlo como parámetro en Custom Metadata.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-30",
    plannedEnd: "2026-10-30",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["2.6", "0.24"],
    deliverables: [
      "Regla de saldo",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "cuenta"],
  }),
  act({
    id: "2.11",
    phaseId: "f2",
    number: "2.11",
    title: "Textos oficiales de beneficios naturales",
    description: "Reemplazar los 14 textos de Beneficios_Naturales que contienen la nota interna 'Confirmar con Invex el texto oficial…' por los textos de la KB, y usar los scripts oficiales de cierre CC y CB (hoy el agente usa textos propios).",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-30",
    plannedEnd: "2026-11-03",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["2.7"],
    deliverables: [
      "Textos sin notas internas",
      "Scripts de cierre oficiales",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "catalogo"],
  }),
  act({
    id: "2.12",
    phaseId: "f2",
    number: "2.12",
    title: "Conectar la Knowledge al agente",
    description: "Acción de respuestas con Knowledge para dudas de beneficios, comercios de domiciliación y plazos, limitada a los 3 artículos de Invex Retenciones.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-30",
    plannedEnd: "2026-11-03",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["1.18"],
    deliverables: [
      "Knowledge conectada",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "knowledge"],
  }),
  act({
    id: "2.13",
    phaseId: "f2",
    number: "2.13",
    title: "Ajustes técnicos menores (DM-09 a DM-13)",
    description: "Folio en su propio campo, escalamiento tipificado con IVR por motivo, Origin que distinga al agente, no crear Case al fallar identidad (según 0.15) y nota de transferencia sin duplicar.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 5,
    plannedStart: "2026-11-02",
    plannedEnd: "2026-11-03",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["0.15", "0.21"],
    deliverables: [
      "DM-09..13 cerrados",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "case"],
  }),
  act({
    id: "2.14",
    phaseId: "f2",
    number: "2.14",
    title: "Tarjetahabientes de prueba en QA y permisos de campo",
    description: "3–5 cuentas de prueba anonimizadas con todos los campos de la carga y permisos de campo sobre Saldo__c, Producto__c y los campos de Case para el usuario del bot.",
    owner: "Telasist - IT Lead",
    collaborators: ["Salesforce - FDE"],
    type: "Config",
    week: 4,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-10-29",
    status: "not-started",
    progressPercent: 0,
    deliverables: [
      "Cuentas de prueba",
      "Permisos de campo",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "telasist", "datos"],
  }),
  act({
    id: "2.18",
    phaseId: "f2",
    number: "2.18",
    title: "Memoria entre llamadas que reconozca los casos de los asesores",
    description: "La memoria de 12 meses no reconoce los Cases de los ejecutivos humanos (trámites guardados como etiqueta, comentario a planchar vacío) y podría volver a ofrecer un beneficio que el cliente ya recibió.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 5,
    plannedStart: "2026-11-02",
    plannedEnd: "2026-11-03",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["2.3"],
    deliverables: [
      "Memoria lee trámites por etiqueta",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "cuenta"],
  }),
  act({
    id: "2.19",
    phaseId: "f2",
    number: "2.19",
    title: "Robustez del flujo conversacional",
    description: "Hallazgos de la revisión del agente v8: si el motor de ofertas falla la llamada termina en cancelación sin escalar; con producto 'NO SABE' se cancela sin ofertar (tomar el producto de la cuenta); el validador de consentimiento marca como ambiguas o negadas respuestas válidas ('sí, me quedo con este beneficio'); posible doble validación de identidad en un mismo turno; escalamientos antes de validar sin registro.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-30",
    plannedEnd: "2026-11-03",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["2.6"],
    deliverables: [
      "Errores de acción escalan",
      "Validador de consentimiento corregido",
      "Producto desde la cuenta",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "critical-path"],
  }),
  act({
    id: "2.15",
    phaseId: "f2",
    number: "2.15",
    title: "Pruebas Apex otra vez en verde",
    description: "Correr todas las pruebas después de v8 y F2; cobertura ≥ 85 % en las clases Invex.",
    owner: "Salesforce - FDE",
    type: "Test",
    week: 5,
    plannedStart: "2026-11-03",
    plannedEnd: "2026-11-04",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["2.1", "2.3", "2.6", "2.8", "2.18", "2.19"],
    deliverables: [
      "Corrida de pruebas",
      "Reporte de cobertura",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "testing"],
  }),
  act({
    id: "2.16",
    phaseId: "f2",
    number: "2.16",
    title: "Publicar y activar el agente v9",
    description: "Publicar el authoring bundle con la configuración real y activarlo en el sandbox.",
    owner: "Salesforce - FDE",
    type: "Deploy",
    week: 5,
    plannedStart: "2026-11-04",
    plannedEnd: "2026-11-04",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["2.15"],
    deliverables: [
      "Agente v9 activo",
    ],
    references: [
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
    tags: ["f2", "critical-path"],
  }),
  act({
    id: "2.17",
    phaseId: "f2",
    number: "2.17",
    title: "Reporte semanal · semana 3",
    description: "Avance de F2, decisiones de la sesión de cierre y riesgos.",
    owner: "Salesforce - FDE",
    type: "Mgmt",
    week: 4,
    plannedStart: "2026-10-29",
    plannedEnd: "2026-10-29",
    status: "not-started",
    progressPercent: 0,
    deliverables: [
      "Reporte Semanal S3",
    ],
    tags: ["f2", "status"],
  }),
  // ============ F3 · Voz ============
  act({
    id: "3.1",
    phaseId: "f3",
    number: "3.1",
    title: "Ruta de voz en sandbox hacia el agente",
    description: "Routing flow y cola de prueba que entreguen la llamada al agente vía Partner Voice Forwarding / Amazon Connect (hoy ningún flujo apunta al agente Invex).",
    owner: "Salesforce - FDE",
    collaborators: ["Telasist - IT Lead"],
    type: "Config",
    week: 5,
    plannedStart: "2026-11-02",
    plannedEnd: "2026-11-04",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["0.21"],
    deliverables: [
      "Routing de voz al agente",
    ],
    tags: ["telefonia", "critical-path"],
  }),
  act({
    id: "3.2",
    phaseId: "f3",
    number: "3.2",
    title: "Número de prueba y transferencia a asesor con contexto",
    description: "Transferencia a la cola humana con el resumen y el folio visibles para el asesor.",
    owner: "Salesforce - FDE",
    collaborators: ["Telasist - Operations", "Telasist - IT Lead"],
    type: "Test",
    week: 5,
    plannedStart: "2026-11-04",
    plannedEnd: "2026-11-05",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["3.1"],
    deliverables: [
      "Transferencia probada",
    ],
    tags: ["telefonia"],
  }),
  act({
    id: "3.3",
    phaseId: "f3",
    number: "3.3",
    title: "Afinación de reconocimiento de voz",
    description: "RFC con alfabeto aeronáutico, dígitos, nombres de producto; keywords, latencia e interrupciones.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 5,
    plannedStart: "2026-11-05",
    plannedEnd: "2026-11-06",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["3.1"],
    deliverables: [
      "Ajustes de voz",
    ],
    tags: ["telefonia", "voz"],
  }),
  act({
    id: "3.4",
    phaseId: "f3",
    number: "3.4",
    title: "Primera llamada E2E por voz",
    description: "Llamada telefónica completa: autenticación, oferta, cierre con folio y Case tipificado, más una transferencia.",
    owner: "Salesforce - FDE",
    collaborators: ["Telasist - Operations"],
    type: "Test",
    week: 5,
    plannedStart: "2026-11-06",
    plannedEnd: "2026-11-06",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["2.16", "3.2", "3.3"],
    deliverables: [
      "Evidencia de la llamada E2E",
    ],
    tags: ["telefonia", "critical-path"],
  }),
  // ============ F4 · Pruebas ============
  act({
    id: "4.1",
    phaseId: "f4",
    number: "4.1",
    title: "Suite de pruebas de conversación (≥ 40 escenarios)",
    description: "Identidad válida y fallida, cada motivo × productos principales, Walmart, EXPI, saldo > $5,557.56, Custom Data, tarjetas canalizadas, fallecimiento, amenaza legal, cliente molesto, seguimiento.",
    owner: "Salesforce - FDE",
    type: "Test",
    week: 5,
    plannedStart: "2026-11-02",
    plannedEnd: "2026-11-05",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["1.13", "2.16"],
    deliverables: [
      "Suite de pruebas del agente",
    ],
    tags: ["testing", "critical-path"],
  }),
  act({
    id: "4.2",
    phaseId: "f4",
    number: "4.2",
    title: "Ejecución de la suite y accuracy ≥ 95 %",
    description: "Ejecución completa, reporte de fallas y corrección.",
    owner: "Salesforce - FDE",
    type: "Test",
    week: 5,
    plannedStart: "2026-11-05",
    plannedEnd: "2026-11-06",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["4.1"],
    deliverables: [
      "Reporte de accuracy",
    ],
    tags: ["testing"],
  }),
  act({
    id: "4.3",
    phaseId: "f4",
    number: "4.3",
    title: "Escenarios basados en llamadas reales",
    description: "Conversaciones reales (muestra de Telasist) o, si no llega, sintéticas a partir de las objeciones de Ingeniería social.",
    owner: "Salesforce - FDE",
    collaborators: ["Telasist - Operations"],
    type: "Test",
    week: 5,
    plannedStart: "2026-11-05",
    plannedEnd: "2026-11-09",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["4.1"],
    deliverables: [
      "Escenarios de objeciones reales",
    ],
    tags: ["testing"],
  }),
  act({
    id: "4.4",
    phaseId: "f4",
    number: "4.4",
    title: "Auditoría contra la Cédula de Evaluación v10",
    description: "Calificar conversaciones del agente con la misma cédula que al ejecutivo humano: saludo, autenticación, scripts mandatorios, errores críticos.",
    owner: "Salesforce - FDE",
    collaborators: ["Telasist - Operations"],
    type: "Review",
    week: 5,
    plannedStart: "2026-11-06",
    plannedEnd: "2026-11-09",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["4.2"],
    deliverables: [
      "Cédula aplicada al agente",
    ],
    tags: ["auditoria"],
  }),
  act({
    id: "4.5",
    phaseId: "f4",
    number: "4.5",
    title: "Auditoría técnica · Apex, Agent Script y seguridad",
    description: "Code review de la capa Apex y del Agent Script, permisos y FLS del usuario del bot, manejo de errores.",
    owner: "Salesforce - FDE",
    type: "Review",
    week: 5,
    plannedStart: "2026-11-06",
    plannedEnd: "2026-11-09",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["2.16"],
    deliverables: [
      "Reporte de auditoría técnica",
    ],
    tags: ["auditoria"],
  }),
  act({
    id: "4.6",
    phaseId: "f4",
    number: "4.6",
    title: "Auditoría de compliance del discurso",
    description: "Sin comparativas con la competencia, aviso de IA, respeto del derecho a cancelar y sin insistir después de un rechazo claro; contrastado con la regulación mexicana de cancelación de TDC. Verificar que el agente solo escriba textos fijos (en comentarios de asesores en PROD aparece PII completa del titular).",
    owner: "Salesforce - FDE",
    type: "Review",
    week: 6,
    plannedStart: "2026-11-09",
    plannedEnd: "2026-11-09",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["4.2", "0.30"],
    deliverables: [
      "Reporte de compliance",
    ],
    tags: ["auditoria", "compliance"],
  }),
  act({
    id: "4.7",
    phaseId: "f4",
    number: "4.7",
    title: "Auditoría de UX de voz",
    description: "Revisión contra los principios de diseño de voz: longitud de turnos, reparación, confirmaciones, latencia percibida.",
    owner: "Salesforce - FDE",
    type: "Review",
    week: 5,
    plannedStart: "2026-11-06",
    plannedEnd: "2026-11-09",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["3.4"],
    deliverables: [
      "Reporte de UX de voz",
    ],
    tags: ["auditoria", "voz"],
  }),
  act({
    id: "4.8",
    phaseId: "f4",
    number: "4.8",
    title: "Observabilidad · session tracing y tablero de calidad",
    description: "Trazas de sesión y un tablero con retención, escalamientos y errores de escritura para el UAT y la producción.",
    owner: "Salesforce - FDE",
    type: "Config",
    week: 6,
    plannedStart: "2026-11-09",
    plannedEnd: "2026-11-10",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["2.16"],
    deliverables: [
      "Tablero de calidad",
    ],
    tags: ["observabilidad"],
  }),
  act({
    id: "4.9",
    phaseId: "f4",
    number: "4.9",
    title: "Afinación v10 y regresión",
    description: "Aplicar los hallazgos de pruebas y auditorías y repetir la suite completa.",
    owner: "Salesforce - FDE",
    type: "Dev",
    week: 6,
    plannedStart: "2026-11-09",
    plannedEnd: "2026-11-11",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["4.2", "4.4", "4.5", "4.6", "4.7"],
    deliverables: [
      "Agente v10 activo",
      "Regresión en verde",
    ],
    tags: ["critical-path"],
  }),
  act({
    id: "4.10",
    phaseId: "f4",
    number: "4.10",
    title: "Pre-UAT guiado con Telasist Operación",
    description: "Demostración guiada con supervisores de Telasist sobre los casos principales antes del handoff.",
    owner: "Salesforce - FDE",
    collaborators: ["Telasist - Operations", "Partner"],
    type: "Review",
    week: 6,
    plannedStart: "2026-11-10",
    plannedEnd: "2026-11-10",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["4.2"],
    deliverables: [
      "Minuta de pre-UAT",
    ],
    tags: ["uat"],
  }),
  act({
    id: "4.11",
    phaseId: "f4",
    number: "4.11",
    title: "Reporte semanal · semana 4",
    description: "Avance de F3 y F4, resultados de pruebas.",
    owner: "Salesforce - FDE",
    type: "Mgmt",
    week: 5,
    plannedStart: "2026-11-05",
    plannedEnd: "2026-11-05",
    status: "not-started",
    progressPercent: 0,
    deliverables: [
      "Reporte Semanal S4",
    ],
    tags: ["status"],
  }),
  // ============ F5 · Entrega ============
  act({
    id: "5.1",
    phaseId: "f5",
    number: "5.1",
    title: "Paquete de deployment para TS4/Skala",
    description: "Manifest, orden de despliegue, Custom Metadata, permission sets, pasos manuales post-deploy y checklist de verificación en PROD. Los Custom Metadata del agente no existen en PROD y el Origin 'Agentforce Voice' solo existe en el sandbox.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Deploy",
    week: 6,
    plannedStart: "2026-11-09",
    plannedEnd: "2026-11-11",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["4.9"],
    deliverables: [
      "Paquete de deployment",
    ],
    tags: ["handoff", "critical-path"],
  }),
  act({
    id: "5.2",
    phaseId: "f5",
    number: "5.2",
    title: "Documentación técnica v10",
    description: "Arquitectura, mapa de datos actualizado, matriz de reglas y lista de decisiones abiertas con su supuesto.",
    owner: "Salesforce - FDE",
    type: "Doc",
    week: 6,
    plannedStart: "2026-11-09",
    plannedEnd: "2026-11-11",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["4.9"],
    deliverables: [
      "Documentación técnica (PDF)",
    ],
    tags: ["handoff"],
  }),
  act({
    id: "5.3",
    phaseId: "f5",
    number: "5.3",
    title: "Runbook de operación y afinación",
    description: "Cómo cambiar catálogo, guiones e interruptores sin tocar código; qué monitorear; a quién escalar.",
    owner: "Salesforce - FDE",
    type: "Doc",
    week: 6,
    plannedStart: "2026-11-10",
    plannedEnd: "2026-11-11",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["4.8"],
    deliverables: [
      "Runbook",
    ],
    tags: ["handoff"],
  }),
  act({
    id: "5.4",
    phaseId: "f5",
    number: "5.4",
    title: "Plan y casos de UAT",
    description: "Casos de UAT cargados en el portal para que Telasist e Invex los ejecuten con TS4/Skala.",
    owner: "Salesforce - FDE",
    type: "Test",
    week: 6,
    plannedStart: "2026-11-10",
    plannedEnd: "2026-11-11",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["4.1"],
    deliverables: [
      "Casos de UAT en el portal",
    ],
    tags: ["handoff", "uat"],
  }),
  act({
    id: "5.5",
    phaseId: "f5",
    number: "5.5",
    title: "Transferencia de conocimiento a TS4/Skala",
    description: "Sesión técnica con el partner: arquitectura, despliegue, operación y afinación.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    type: "Mgmt",
    week: 6,
    plannedStart: "2026-11-11",
    plannedEnd: "2026-11-11",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["5.1", "5.2", "5.3"],
    deliverables: [
      "Sesión de KT grabada",
    ],
    tags: ["handoff"],
  }),
  act({
    id: "5.6",
    phaseId: "f5",
    number: "5.6",
    title: "Deck de la presentación final",
    description: "Qué se construyó, evidencia de pruebas y auditorías, decisiones abiertas y siguientes pasos.",
    owner: "Salesforce - FDE",
    type: "Doc",
    week: 6,
    plannedStart: "2026-11-11",
    plannedEnd: "2026-11-12",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["4.9"],
    deliverables: [
      "Deck final",
    ],
    tags: ["handoff"],
  }),
  act({
    id: "5.7",
    phaseId: "f5",
    number: "5.7",
    title: "🎯 Presentación final y acta de entrega",
    description: "Presentación a Telasist, Invex y TS4/Skala; firma del acta de entrega.",
    owner: "Salesforce - FDE",
    collaborators: ["Salesforce - CSM", "Telasist - Sponsor", "Invex - Sponsor", "Partner"],
    type: "Mgmt",
    week: 6,
    plannedStart: "2026-11-12",
    plannedEnd: "2026-11-12",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["5.5", "5.6"],
    deliverables: [
      "Acta de entrega",
    ],
    tags: ["handoff", "critical-path"],
  }),
  act({
    id: "5.8",
    phaseId: "f5",
    number: "5.8",
    title: "Guía Maestra v2 para TS4/Skala",
    description: "Actualización de la Guía Maestra al agente v10 como material de transferencia de conocimiento.",
    owner: "Salesforce - FDE",
    type: "Doc",
    week: 6,
    plannedStart: "2026-11-10",
    plannedEnd: "2026-11-11",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["0.31", "4.9"],
    deliverables: [
      "Guía Maestra v2 (PDF)",
    ],
    tags: ["guia-maestra", "handoff"],
  }),
  // ============ F6 · UAT ============
  act({
    id: "6.1",
    phaseId: "f6",
    number: "6.1",
    title: "Ejecución del UAT",
    description: "Telasist e Invex ejecutan los casos de UAT con TS4/Skala; el Equipo FDE Salesforce da soporte.",
    owner: "Telasist - UAT",
    collaborators: ["Partner", "Invex - Sponsor", "Salesforce - FDE"],
    type: "Test",
    week: 6,
    plannedStart: "2026-11-13",
    plannedEnd: "2026-11-20",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["5.7"],
    deliverables: [
      "Resultados de UAT",
    ],
    tags: ["uat"],
  }),
  act({
    id: "6.2",
    phaseId: "f6",
    number: "6.2",
    title: "Correcciones de UAT",
    description: "TS4/Skala corrige los hallazgos del UAT.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    type: "Dev",
    week: 7,
    plannedStart: "2026-11-16",
    plannedEnd: "2026-11-23",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["6.1"],
    deliverables: [
      "Hallazgos cerrados",
    ],
    tags: ["uat"],
  }),
  act({
    id: "6.3",
    phaseId: "f6",
    number: "6.3",
    title: "Sign-off de UAT",
    description: "Aprobación formal de Invex y Telasist.",
    owner: "Invex - Sponsor",
    collaborators: ["Telasist - Sponsor", "Partner"],
    type: "Review",
    week: 8,
    plannedStart: "2026-11-24",
    plannedEnd: "2026-11-24",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["6.2"],
    deliverables: [
      "Acta de UAT",
    ],
    tags: ["uat", "gate"],
  }),
  // ============ F7 · Producción ============
  act({
    id: "7.1",
    phaseId: "f7",
    number: "7.1",
    title: "Gate de aprobación legal",
    description: "Confirmar la aprobación legal de Invex (0.14) antes de exponer el agente a clientes reales.",
    owner: "Invex - Legal",
    collaborators: ["Invex - Sponsor", "Salesforce - CSM"],
    type: "Review",
    week: 8,
    plannedStart: "2026-11-25",
    plannedEnd: "2026-11-25",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["0.14", "6.3"],
    deliverables: [
      "Aprobación vigente",
    ],
    tags: ["legal", "gate"],
  }),
  act({
    id: "7.2",
    phaseId: "f7",
    number: "7.2",
    title: "Deploy a PROD",
    description: "TS4/Skala despliega con el paquete de 5.1.",
    owner: "Partner",
    collaborators: ["Telasist - IT Lead"],
    type: "Deploy",
    week: 8,
    plannedStart: "2026-11-26",
    plannedEnd: "2026-11-27",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["7.1", "5.1"],
    deliverables: [
      "Agente en PROD",
    ],
    tags: ["produccion"],
  }),
  act({
    id: "7.3",
    phaseId: "f7",
    number: "7.3",
    title: "Conexión a la cola de la campaña y grabación",
    description: "Enlace del agente a la cola PROD - INVEX - Invex Retenciones TDC - Unico y grabación según la política aprobada.",
    owner: "Telasist - IT Lead",
    collaborators: ["Partner"],
    type: "Config",
    week: 8,
    plannedStart: "2026-11-27",
    plannedEnd: "2026-11-30",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["7.2"],
    deliverables: [
      "Cola conectada",
    ],
    tags: ["produccion", "telefonia"],
  }),
  act({
    id: "7.4",
    phaseId: "f7",
    number: "7.4",
    title: "Arranque controlado",
    description: "Porcentaje bajo de tráfico en horario valle con criterio de rollback.",
    owner: "Partner",
    collaborators: ["Telasist - Operations", "Salesforce - FDE"],
    type: "Ops",
    week: 9,
    plannedStart: "2026-12-01",
    plannedEnd: "2026-12-04",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["7.3"],
    deliverables: [
      "Reporte de arranque",
    ],
    tags: ["produccion"],
  }),
  act({
    id: "7.5",
    phaseId: "f7",
    number: "7.5",
    title: "Rollout gradual e hypercare",
    description: "Escalamiento del tráfico con monitoreo diario.",
    owner: "Partner",
    collaborators: ["Telasist - Operations", "Salesforce - FDE"],
    type: "Ops",
    week: 10,
    plannedStart: "2026-12-07",
    plannedEnd: "2026-12-11",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["7.4"],
    deliverables: [
      "Agente al 100 % del tráfico objetivo",
    ],
    tags: ["produccion"],
  }),
  act({
    id: "7.6",
    phaseId: "f7",
    number: "7.6",
    title: "Cierre del proyecto y QBR",
    description: "Resultados contra la línea base humana y siguientes casos de uso.",
    owner: "Salesforce - CSM",
    collaborators: ["Salesforce - FDE", "Salesforce - AE", "Telasist - Sponsor", "Invex - Sponsor"],
    type: "Mgmt",
    week: 10,
    plannedStart: "2026-12-11",
    plannedEnd: "2026-12-11",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["7.5"],
    deliverables: [
      "QBR",
    ],
    tags: ["cierre"],
  }),
];

// ============================================================================
// MILESTONES
// ============================================================================

const MILESTONES: Milestone[] = [
  {
    id: "kickoff-internal",
    title: "Kick-off interno Salesforce",
    description: "Alineación interna FDE + CSM + AE.",
    date: "2026-10-12",
    kind: "Internal Review",
    phaseId: "f0",
    participants: ["Salesforce - FDE", "Salesforce - CSM", "Salesforce - AE"],
    status: "completed",
    references: [],
  },
  {
    id: "kickoff-telasist",
    title: "Kick-off con Telasist y sesión de arranque con Skala",
    description: "Snapshot externo y presentación de arranque.",
    date: "2026-10-12",
    kind: "Kick-off",
    phaseId: "f0",
    participants: ["Salesforce - CSM", "Salesforce - FDE", "Telasist - Sponsor", "Telasist - IT Lead", "Telasist - Operations", "Partner"],
    status: "completed",
    references: [
      { label: "Presentación · Sesión de arranque Telasist × Skala × Invex", url: "/Customers/Telasist/files/Presentacion_Arranque_Telasist.html", kind: "document" },
    ],
  },
  {
    id: "capacitacion-telasist-2026-10-20",
    title: "Sesión de capacitación Telasist · proceso INVEX Retenciones TDC",
    description: "Cómo trabaja el ejecutivo humano; minuta con 14 pendientes.",
    date: "2026-10-20",
    kind: "Internal Review",
    phaseId: "f0",
    participants: ["Telasist - Operations", "Salesforce - FDE", "Partner"],
    status: "completed",
    references: [],
  },
  {
    id: "agente-v8",
    title: "Agente v8 activo en sandbox",
    description: "v8 alineada al Manual v2.0.",
    date: "2026-10-22",
    kind: "Internal Review",
    phaseId: "f1",
    participants: ["Salesforce - FDE"],
    status: "completed",
    references: [],
  },
  {
    id: "reporte-semanal-2026-10-22",
    title: "Reporte semanal · semana 2 (19 al 23 oct)",
    description: "Conciliación de la capacitación y 21 pendientes con dueño.",
    date: "2026-10-22",
    kind: "Weekly Status",
    phaseId: "f0",
    participants: ["Salesforce - FDE", "Telasist - Operations", "Partner"],
    status: "completed",
    references: [
      { label: "Reporte Semanal · 19 al 23 oct (PDF)", url: "/Customers/Telasist/files/Reporte_Semanal_Invex_Retencion_TDC_2026-10-22.pdf", kind: "pdf" },
    ],
  },
  {
    id: "kb-replicada",
    title: "Knowledge oficial replicada al sandbox",
    description: "3 artículos de Invex Retenciones en es_MX y en_US.",
    date: "2026-10-25",
    kind: "Internal Review",
    phaseId: "f1",
    participants: ["Salesforce - FDE"],
    status: "completed",
    references: [],
  },
  {
    id: "reporte-semanal-2026-10-29",
    title: "Reporte semanal · semana 3",
    description: "Avance de F2 y decisiones.",
    date: "2026-10-29",
    kind: "Weekly Status",
    phaseId: "f2",
    participants: ["Salesforce - FDE", "Telasist - Operations", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "corte-definiciones",
    title: "Corte de definiciones Invex / Telasist",
    description: "Lo que no llegue se configura con supuesto documentado detrás de un interruptor.",
    date: "2026-10-30",
    kind: "Executive Review",
    phaseId: "f0",
    participants: ["Salesforce - CSM", "Salesforce - FDE", "Telasist - Operations", "Invex - Sponsor", "Invex - IT Lead", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "guia-maestra-v1",
    title: "Guía Maestra v1 publicada",
    description: "Libro de estudio del negocio y del agente v8.",
    date: "2026-10-31",
    kind: "Internal Review",
    phaseId: "f0",
    participants: ["Salesforce - FDE"],
    status: "scheduled",
    references: [],
  },
  {
    id: "agente-v9",
    title: "Agente v9 con reglas reales activo en sandbox",
    description: "Catálogo de la Knowledge, Case correcto y cuenta conectada.",
    date: "2026-11-04",
    kind: "Internal Review",
    phaseId: "f2",
    participants: ["Salesforce - FDE"],
    status: "scheduled",
    references: [],
  },
  {
    id: "reporte-semanal-2026-11-05",
    title: "Reporte semanal · semana 4",
    description: "Avance de F3 y F4.",
    date: "2026-11-05",
    kind: "Weekly Status",
    phaseId: "f4",
    participants: ["Salesforce - FDE", "Telasist - Operations", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "llamada-e2e",
    title: "Primera llamada E2E por voz en sandbox",
    description: "Llamada telefónica completa con transferencia.",
    date: "2026-11-06",
    kind: "UAT Session",
    phaseId: "f3",
    participants: ["Salesforce - FDE", "Telasist - Operations", "Telasist - IT Lead"],
    status: "scheduled",
    references: [],
  },
  {
    id: "readiness-review",
    title: "Readiness review · pruebas y auditorías cerradas",
    description: "Decisión interna de entrega.",
    date: "2026-11-10",
    kind: "Internal Review",
    phaseId: "f4",
    participants: ["Salesforce - FDE", "Salesforce - CSM"],
    status: "scheduled",
    references: [],
  },
  {
    id: "entrega-final",
    title: "🎯 Presentación final y entrega a TS4/Skala",
    description: "Acta de entrega del agente configurado, probado, auditado y afinado.",
    date: "2026-11-12",
    kind: "Executive Review",
    phaseId: "f5",
    participants: ["Salesforce - FDE", "Salesforce - CSM", "Telasist - Sponsor", "Telasist - Operations", "Invex - Sponsor", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "uat-signoff",
    title: "Sign-off de UAT (tentativo)",
    description: "Aprobación de Invex y Telasist.",
    date: "2026-11-24",
    kind: "UAT Session",
    phaseId: "f6",
    participants: ["Telasist - UAT", "Invex - Sponsor", "Partner", "Salesforce - FDE"],
    status: "scheduled",
    references: [],
  },
  {
    id: "go-live",
    title: "Go-live en producción (tentativo)",
    description: "Agente en PROD operado por TS4/Skala, sujeto a aprobación legal.",
    date: "2026-12-07",
    kind: "Go-live",
    phaseId: "f7",
    participants: ["Partner", "Telasist - IT Lead", "Telasist - Operations", "Invex - Sponsor"],
    status: "scheduled",
    references: [],
  },
  {
    id: "qbr-final",
    title: "QBR final · cierre del proyecto",
    description: "Resultados contra la línea base.",
    date: "2026-12-11",
    kind: "QBR",
    phaseId: "f7",
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
    title: "Las definiciones de Invex no llegan al corte del 30-oct",
    description:
      "VPN numérico, equivalencia del semáforo, matriz por motivo y catálogo 2026 siguen abiertos. Sin ellos el agente opera con supuestos.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Sesión de cierre del 30-oct (0.29). Lo que no llegue se configura con supuesto documentado detrás de un interruptor y entra a la lista de decisiones abiertas del handoff.",
    owner: "Salesforce - CSM",
    status: "active",
    phaseId: "f0",
    references: [],
  },
  {
    id: "R2",
    title: "La aprobación legal de Invex se retrasa",
    description:
      "Sin aprobación legal no hay pase a producción. Ya no afecta la entrega del 12-nov, pero sí el go-live.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Gate explícito en F7 (7.1). Seguimiento semanal con Invex Sponsor desde ya.",
    owner: "Invex - Sponsor",
    status: "active",
    phaseId: "f7",
    references: [],
  },
  {
    id: "R3",
    title: "Datos de la cuenta que requieran consulta en tiempo real",
    description:
      "Saldo y semáforo llegan en una carga diaria; si Invex exige dato en línea habría que integrar una consulta.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Confirmar en 0.19; operar con la carga diaria y documentarlo en el handoff.",
    owner: "Telasist - IT Lead",
    status: "active",
    phaseId: "f2",
    references: [],
  },
  {
    id: "R4",
    title: "Frescura del saldo (24 h) causa precancelaciones o cancelaciones erróneas",
    description:
      "Un pago del día no se ve en la carga y el agente decide CB cuando correspondía CC.",
    probability: "Medium",
    impact: "Medium",
    mitigation:
      "Regla de saldo (2.10) con aviso al cliente sobre el plazo; validar con Telasist.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f2",
    references: [],
  },
  {
    id: "R5",
    title: "Partner no identificado o no disponible a tiempo",
    description:
      "Resuelto: TS4/Skala recibe el agente el 12-nov y hace el pase a producción.",
    probability: "Low",
    impact: "Medium",
    mitigation:
      "Modelo de handoff acordado (0.28).",
    owner: "Salesforce - CSM",
    status: "mitigated",
    phaseId: "f5",
    references: [],
  },
  {
    id: "R6",
    title: "Ventana corta hasta el 12-nov",
    description:
      "Quedan 13 días hábiles para configurar, conectar voz, probar, auditar, afinar y entregar.",
    probability: "High",
    impact: "High",
    mitigation:
      "Ruta crítica explícita (2.1 → 2.6 → 2.8 → 2.16 → 4.1 → 4.9 → 5.7), hitos internos el 4, 6 y 10-nov y alcance fijo: las decisiones abiertas se entregan como supuestos.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f2",
    references: [],
  },
  {
    id: "R7",
    title: "El volumen del rollout satura monitoreo",
    description:
      "~930 llamadas/día desde el arranque en PROD.",
    probability: "Low",
    impact: "Medium",
    mitigation:
      "Tablero de calidad (4.8) y arranque controlado (7.4).",
    owner: "Partner",
    status: "active",
    phaseId: "f7",
    references: [],
  },
  {
    id: "R8",
    title: "La escritura del Case no coincide con los valores de PROD",
    description:
      "Causa raíz confirmada el 26-oct: Resultado_de_llamada recibe valores inexistentes y, por la dependencia de picklist, Tipo_Invex también se rechaza; trámites como código, CANC en lugar de PRECANC, categorías vacías y comentario truncado.",
    probability: "High",
    impact: "High",
    mitigation:
      "Actividades 2.1–2.5 y 2.13; prueba de DML contra los valores de PROD antes de v9.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f2",
    references: [],
  },
  {
    id: "R9",
    title: "Reglas de negocio basadas en la capacitación sin validar",
    description:
      "Mitigado en parte por la Knowledge oficial; siguen sin validación del ejecutivo INVEX.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Validación con el ejecutivo INVEX (0.22) y sesión de cierre (0.29).",
    owner: "Telasist - Operations",
    status: "active",
    phaseId: "f0",
    references: [],
  },
  {
    id: "R10",
    title: "Código de v8 sin pruebas después del 22-oct",
    description:
      "Cinco clases cambiaron el 22-oct y no hay corrida posterior; la cobertura quedó en 0 al recompilar.",
    probability: "High",
    impact: "Medium",
    mitigation:
      "Correr la suite completa antes de v9 (2.15).",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f2",
    references: [],
  },
  {
    id: "R11",
    title: "Contradicciones internas de la Knowledge",
    description:
      "Cuatro vocabularios del semáforo, VPN contradictorio entre reglas y comentarios, plantillas de comentario distintas entre KB y Excel.",
    probability: "High",
    impact: "Medium",
    mitigation:
      "Homologación con Telasist (0.26) y supuestos documentados.",
    owner: "Telasist - Operations",
    status: "active",
    phaseId: "f0",
    references: [],
  },
  {
    id: "R12",
    title: "Telefonía sin conectar en el sandbox",
    description:
      "Ningún flujo de voz apunta al agente; la primera llamada E2E depende de Telasist IT.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Arrancar 3.1 en paralelo a F2 y definir la ruta de transferencia (0.21) antes del 30-oct.",
    owner: "Telasist - IT Lead",
    status: "active",
    phaseId: "f3",
    references: [],
  },
  {
    id: "R13",
    title: "Muestra de llamadas reales no disponible para las pruebas",
    description:
      "Sin grabaciones o transcripciones, las pruebas se basan en el guion y no en objeciones reales.",
    probability: "Medium",
    impact: "Medium",
    mitigation:
      "Escenarios sintéticos desde Ingeniería social (4.3) y pre-UAT con supervisores (4.10).",
    owner: "Telasist - Operations",
    status: "active",
    phaseId: "f4",
    references: [],
  },
  {
    id: "R14",
    title: "Datos de elegibilidad que no existen en la carga",
    description:
      "La Cuenta no trae fecha ni monto de la anualidad, línea de crédito ni Programa Cero activo; sin ellos no se evalúan las reglas de 90 días, 6 meses y 30 % de la línea ni se calcula el monto del comentario oficial.",
    probability: "High",
    impact: "High",
    mitigation:
      "Pedir los campos a Telasist IT e Invex (0.19); mientras tanto, reglas con supuesto documentado o confirmación verbal del cliente detrás de interruptor (2.8).",
    owner: "Telasist - IT Lead",
    status: "active",
    phaseId: "f2",
    references: [],
  },
  {
    id: "R16",
    title: "Rama de saldo mayor a $5,557.56 que condiciona la cancelación",
    description:
      "La práctica descrita (pedir el pago sin generar folio) se parece a condicionar la terminación, que la LTOSF no permite: el cliente puede cancelar en cualquier momento y el saldo no lo impide. Tampoco hay aviso de privacidad simplificado en los guiones.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Definición prioritaria de Invex con folio (0.24) y validación legal (0.14); auditoría de compliance (4.6). El agente no sale a producción sin esa definición.",
    owner: "Invex - Legal",
    status: "active",
    phaseId: "f0",
    references: [],
  },
  {
    id: "R15",
    title: "Errores de flujo que producen cancelaciones indebidas",
    description:
      "En v8, un error del motor de ofertas o un producto desconocido llevan a cancelación sin ofertar, y el validador de consentimiento rechaza aceptaciones válidas.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Actividad 2.19 y escenarios específicos en la suite (4.1).",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f2",
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

// ============================================================================
// STATUS UPDATES
// ============================================================================

const STATUS_UPDATES: StatusUpdate[] = [
  {
    id: "status-2026-10-26",
    weekOf: "2026-10-26",
    author: "Salesforce - FDE",
    overallHealth: "yellow",
    phaseId: "f2",
    highlights: [
      "Replan del proyecto: el 12-nov el Equipo FDE Salesforce entrega a TS4/Skala el agente configurado, probado, auditado y afinado. Después vienen el UAT del cliente (13 al 24-nov, tentativo) y el pase a producción a cargo del partner (25-nov al 11-dic, tentativo, sujeto a la aprobación legal de Invex).",
      "Barrido global 26-oct: el agente está en v8 y activo desde el 22-oct (no inactivo como se reportó). Capa Apex con 11 clases productivas y 79/79 pruebas el 16-oct; el código de v8 no tiene corrida posterior.",
      "Causa raíz de la escritura del Case: Resultado_de_llamada recibe Retenido/Cancelado en lugar de Retención/Cancelación; por la dependencia de picklist también se rechaza Tipo_Invex (DM-01). No es un tema de permisos.",
      "La Knowledge oficial 'Invex - Retenciones' resuelve folios, plazos, los 6 datos de validación, la regla Custom Data, la matriz tarjeta × trámite y 7 de las 12 inconsistencias del brief; detecta 10 contradicciones nuevas.",
      "Portal reorganizado en 8 fases con trabajo previo registrado (Discovery Brief, auditoría, línea base, follow-up, conciliación, análisis de la KB, v6–v8) y actividades nuevas para configuración, voz, pruebas, auditoría y entrega.",
      "Arranca en paralelo la Guía Maestra Invex Retención TDC (v1 el 31-oct).",
    ],
    nextWeek: [
      "Equipo FDE Salesforce: escritura del Case (2.1–2.5), lecturas de cuenta (2.6), matriz de la Knowledge (2.7) y reglas (2.8).",
      "Telasist IT: tarjetahabientes de prueba y permisos de campo en QA (2.14); ruta de voz (3.1).",
      "Telasist Operación: validación con el ejecutivo INVEX (0.22), homologar semáforo y plantillas (0.26), ruta de transferencia (0.21).",
      "Invex: VPN numérico, semáforo, matriz por motivo y catálogo 2026 antes del corte del 30-oct (0.13, 0.16, 0.18).",
    ],
    activeBlockers: [
      "Tarjetahabientes de prueba y permisos de campo en QA (Telasist IT · 2.14).",
      "Definiciones de Invex con corte el 30-oct (0.13, 0.16, 0.18).",
      "Ruta de voz en sandbox y ruta de transferencia (Telasist · 0.21, 3.1).",
    ],
    activeRisks: ["R1", "R6", "R8", "R10", "R11", "R12"],
    references: [],
  },
  {
    id: "status-2026-10-22",
    weekOf: "2026-10-22",
    author: "Salesforce - FDE",
    overallHealth: "yellow",
    phaseId: "f1_5",
    highlights: [
      "Semana de discovery operativo: el agente no cambió (v7, última modificación 16-oct). Lo que avanzó fue el entendimiento de cómo trabaja el ejecutivo humano y de qué falta exactamente.",
      "20-oct · Sesión de capacitación de Telasist sobre el proceso INVEX Retenciones TDC. Minuta de Skala con 14 pendientes: matriz VPN, semáforo, validación con ejecutivo INVEX, fecha de originación, Bonif. suspensión anualidad, Custom Data, folios, Walmart (tipificación y ofertas), matriz de ofertas por motivo, saldo > $5,557.56 y 3 tipificaciones.",
      "19-20-oct · Mapa de datos del agente v7 (qué consulta y dónde registra) por el Equipo FDE Salesforce, publicado en Documentos · Técnico: 12 desajustes entre la configuración y la org, 4 críticos (Tipo_Invex__c rechaza RTCC, trámites como código vs nombres, saldo y producto no conectados).",
      "21-22-oct · Conciliación contra datos reales: 7 colores de semáforo en QA (PLATINO, no 'plata'); Custom Data 2/3 = 99 % de las cuentas; Generales / Tipo Generales ya existen en PROD con los valores de la tabla (4,895 casos); el folio con 4 dígitos del agente coincide con el ejemplo de la propia minuta.",
      "Corrección al Plan de Estado del 19-oct: la escritura al caso no está completa (R8) y las versiones del agente aparecen inactivas en el sandbox.",
      "Portal actualizado: actividades 0.16-0.20, 1.18 y 1.5.5-1.5.8, riesgos R8 y R9, 21 pendientes de negocio (INV) y 13 ajustes técnicos (DM) en el backlog, Reporte Semanal y Mapa de datos publicados.",
    ],
    nextWeek: [
      "Equipo FDE Salesforce (no depende de Invex): alinear escritura del Case a PROD (1.5.5), conectar lecturas de la cuenta (1.5.6), tipificación general y comentarios de trámite en formato oficial (1.5.7), reactivar el agente y repetir pruebas (1.5.8).",
      "Telasist + Skala: agendar la sesión con ejecutivo INVEX (equipo de Antonio) para validar los 14 puntos (0.17).",
      "Invex: matriz VPN × semáforo, matriz de ofertas por motivo y catálogo 2026 (DEP-1); avanzar aprobación legal (DEP-2).",
    ],
    activeBlockers: [
      "DEP-1 · Matriz VPN × semáforo → beneficio y matriz de ofertas por motivo (Invex · 0.4).",
      "DEP-2 · Aprobación legal Invex para uso de IA (Invex Legal · 0.5).",
      "Validación operativa de los 14 hallazgos de la capacitación (Telasist · 0.17).",
      "Telasist IT: causa del rechazo de RTCC en Tipo_Invex__c, permisos de campo sobre Saldo__c / Producto__c y 3-5 tarjetahabientes de prueba en QA.",
    ],
    activeRisks: ["R1", "R2", "R6", "R8", "R9"],
    references: [
      {
        label: "Reporte Semanal · 19 al 23 oct (PDF)",
        url: "/Customers/Telasist/files/Reporte_Semanal_Invex_Retencion_TDC_2026-10-22.pdf",
        kind: "pdf",
      },
      { label: "Mapa de datos del agente v7 (PDF)", url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf", kind: "pdf" },
    ],
  },
  {
    id: "status-2026-10-19",
    weekOf: "2026-10-19",
    author: "Salesforce - FDE",
    overallHealth: "yellow",
    phaseId: "f1",
    highlights: [
      "Agente AF_Voice_Invex_Retenciones_TDC publicado como v7 en el sandbox Telasist-Sandbox (00DDM000003ftUk2AI). Última modificación 16-oct. Idioma es_MX, tono casual, Agent Script DSL habilitado, template AgentforceServiceAgent, planner AF_Voice_Invex_Retenciones_TDC_v7 enganchado, usuario de bot dedicado.",
      "Capa Apex desplegada por el Equipo FDE Salesforce (15 clases productivas + 4 de prueba): motor InvexRetencionEngine + InvexRetencionService + InvexRetencionRepository + InvexRetencionConfig, 7 acciones invocables (InvexValidarTarjetahabiente, InvexObtenerOferta, InvexSiguienteOferta, InvexCaseWriter, InvexRegistrarResultado, InvexRegistrarEscalamiento, InvexRegistrarSeguimiento) y factory de datos de prueba.",
      "48 variables de conversación tipadas cubriendo identidad, autenticación, motivo, ofertas con secuencia sin-costo→con-costo, consentimiento (CONFIRMADO/NEGADO/AMBIGUO), folio (RB/CC/CB) con guion de cierre, historial entre llamadas de 15 días, escalamiento tipificado en 12 motivos (FALLECIMIENTO, INCAPACIDAD_MEDICA, TARJETA_GARANTIZADA, EXCEPCION_EXPI, CLIENTE_MOLESTO, AMENAZA_LEGAL, OTRO_TEMA, SOLICITA_HUMANO, SEGUIMIENTO, NO_ENCONTRADO, VALIDACION_FALLIDA, ERROR_TECNICO), e idempotencia de cierre.",
      "Nueva fuente documental de Telasist: Manual de Proceso Retención INVEX TDC v2.0 (13-oct). Trae el árbol de decisión completo, los 5 scripts mandatorios, la Cédula de Evaluación v10.0 y las 6 tipificaciones autorizadas. Convive con el Discovery Brief v1 (8-oct). Entre ambos quedan ya identificadas las decisiones pendientes de Invex.",
      "Deliverable publicado hoy en el portal: Plan de Estado · Agente de Voz Invex Retención TDC (10 páginas) con capacidades actuales en lenguaje de negocio, inventario, línea base y bloqueantes.",
    ],
    nextWeek: [
      "Afinar el agente contra los puntos firmes del manual v2.0 (etapa 1 del plan público): cablear la rama Walmart como oferta válida, dejar el límite de 3 objeciones como regla dura, imponer la triple condición 'script + Sí verbal + folio' antes de tipificar RETENCION, reordenar el script de entrada para no mencionar producto ni últimos 4 dígitos antes de pasar candados.",
      "Agendar sesión de 60 min con Invex con un único entregable: cerrar los 3 bloqueantes principales (matriz de ofertas, aprobación legal, políticas de disclosure). Si salen, el agente queda listo para piloto en 3 semanas.",
      "Preparar suite extendida de pruebas Agent Script apenas Telasist entregue la primera muestra de grabaciones reales (gap 2 del Discovery Brief).",
    ],
    activeBlockers: [
      "DEP-1 · Matriz de decisión del beneficio (Invex IT Lead · actividad 0.4). Sin esto el agente opera con placeholder; bloqueante absoluto para pasar a F1.5.",
      "DEP-2 · Aprobación legal Invex para uso de IA (Invex Legal · actividad 0.5). Gate regulatorio del proyecto completo; sin esto no hay shadow pilot.",
      "DEP-3 · Políticas de disclosure, grabación y residencia de datos (Invex · parte de 0.5). El agente puede decir frases no autorizadas sin esta política firmada.",
      "Catálogo canónico de productos y lista única de validación de identidad (actividad 0.12). Hoy conviven tres nomenclaturas (Invex 0/1/2, Volaris 0/1/2, SiCard/FRAGUA).",
      "Muestra de grabaciones reales para la suite de pruebas (Telasist con consentimiento Invex · 20-30 llamadas cruzando motivos y resultados).",
      "Siete reglas 'POR DEFINIR' del propio Manual v2.0 §6: matriz de ofertas por motivo, tipificación del decremento Walmart, folio y seguimiento para saldo > $5,557.56, canalización a PC vs encuesta, cuándo usan 'Seguimiento a devolución / Cargo no reconocido / Consulta de saldo', ubicación de la frase 'Lamento que esté considerando llevar a cabo este proceso', y aclaración del segundo 5 vs 6 en el rubro Saludo de la Cédula.",
    ],
    activeRisks: ["R1", "R2", "R6"],
    references: [
      {
        label: "Plan de Estado · Agente de Voz Invex Retención TDC (PDF)",
        url: "/Customers/Telasist/files/Plan_Estado_Agente_Invex_Retencion_TDC.pdf",
        kind: "pdf",
      },
    ],
  },
];

export const telasistRetencionPlan: TelasistRetencionPlan = {
  slug: "telasist-retencion",
  projectName: "Telasist × Invex · Voice AI Agent para Retención Invex TDC",
  kickoffDate: "2026-10-07",
  endDate: "2026-12-11",
  phases: PHASES,
  activities: ACTIVITIES,
  milestones: MILESTONES,
  risks: RISKS,
  stableCriteria: STABLE_CRITERIA,
  statusUpdates: STATUS_UPDATES,
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
