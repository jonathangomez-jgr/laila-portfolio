// ============================================================================
// Jafra · Janet v2.1 (V42) — Plan a live sobre la base de V41
// Fuente de verdad: Janet-JAFRA-Dossier-Ejecutivo.pdf · sesión 2026-10-09
// Base propuesta: V42 = V41 + paquete V2 con valores de prod + 6 ediciones
// Deep-dive: vie 2026-10-09 · Live propuesto: semana del 20-24 oct 2026
// Autor: Jonathan Gomez (Salesforce FDE)
// ============================================================================
// Objetivo: salir a prod la próxima semana con Janet v2.1 (V42). Sujeta a los
// 8 criterios go/no-go G1-G8. Si uno queda en «no», se frena el live.
// Nota histórica: el plan previo de 6 fases y GA 14-nov quedó superado por
// el deep-dive del 9-oct. Base documental anterior disponible en:
//   /Customers/Jafra/files/Conociendo-a-nuestro-agente.html
// ============================================================================

export type ISODate = string; // "YYYY-MM-DD"

export type OwnerTag =
  | "Salesforce - FDE"
  | "Salesforce - CSM"
  | "Salesforce - AE"
  | "Salesforce - Support"
  | "Partner" // Capptus — construyó v35 con los issues que V42 corrige
  | "Jafra - Sponsor"
  | "Jafra - IT Lead"
  | "Jafra - CS Lead"
  | "Jafra - UAT"
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

export type JafraPlan = {
  slug: "jafra";
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
// PHASES — 4 pasos del dossier ejecutivo del 9-oct
// ============================================================================

const PHASES: Phase[] = [
  {
    id: "p0",
    number: 0,
    title: "Acción inmediata en prod",
    shortLabel: "Paso 0 · Prod",
    description:
      "Tres cambios en prod que no dependen de V41: (1) activar en prod el Resolver que llama la verificación de linaje (Hallazgo 5) y correr AC-01, (2) decisión de JAFRA sobre la transferencia a persona (habilitar con cola y horario, o salir sin transferencia y registrar el caso), (3) decisión sobre el estatus de pedido — (a) la integración actualiza Status con el estado real o (b) la acción Janet lee facturación/entrega/rastreo que ya están en Salesforce. Ambos cambios aplican a v35 desde el día que se habilitan.",
    objective:
      "Linaje validado en el Resolver de prod · AC-01 pasa 3/3 (0 casos, sin datos fuera de linaje) · decisiones firmadas sobre persona y pedido · texto del validador alineado a BusinessHours.",
    startDate: "2026-10-13",
    endDate: "2026-10-15",
    requires: [
      "Dossier ejecutivo del 9-oct firmado por JAFRA",
      "Acceso de FDE Salesforce a prod + sandbox",
      "Resolver_cuenta_solicitante_en_linaje_ALF (prod) retrievado · aaf_verificacion_de_linaje_consultora disponible en prod",
    ],
    outcome:
      "Resolver activo en prod llamando aaf_verificacion_de_linaje_consultora · AC-01 verde · 3 decisiones de JAFRA firmadas (persona, horario, pedido) · cancelarFlujo retirado del Flow validador si se habilita transferencia.",
    gate:
      "AC-01 pasa en prod · JAFRA firma las 3 decisiones · si se habilita transferencia, 1 transferencia real llega a la cola de prod.",
    color: "#066AFE",
  },
  {
    id: "p1",
    number: 1,
    title: "V41 → V42 y paquete",
    shortLabel: "Paso 1 · V42",
    description:
      "V42 = V41 (base publicada en sandbox target Jafra_Agentforce_V2.v41) + paquete V2 completo con valores de prod (Case_Type_Config__c con las 61 filas · Janet_Setting__mdt.Default con Validate_Phone__c=true, sin Test_Until__c, 0 teléfonos aprobados · JAF_ClassifyChannelMessage · JAF_LogSessionState) + seis ediciones cortas al script que no cambian la arquitectura de V41. Suite de humo en sandbox con la traza abierta. Dueño: Leo + María Paula (FDE Salesforce).",
    objective:
      "V42 lista para publish con los 6 cambios aplicados, 61 filas de tipos de caso cargadas, Janet_Setting__mdt con valores de prod, Get_Approved_Phone_Membership retirado del script de prod, y suite de humo en sandbox pasando.",
    startDate: "2026-10-13",
    endDate: "2026-10-17",
    requires: [
      "Paso 0 avanzado · decisiones de JAFRA conocidas (algunas pueden paralelizar)",
      "V41 publicada en sandbox (ya existe · bundle target Jafra_Agentforce_V2.v41)",
      "Permission set del paquete V2 preparado",
    ],
    outcome:
      "V42 lista. Suite de humo en sandbox con traza abierta. Paquete V2 con valores de prod. Documento de los 6 cambios firmado. Preparado para la reunión de go/no-go.",
    gate:
      "sf agent validate pasa con 0 errores · suite de humo con traza completa · 61 filas de Case_Type_Config__c cargadas · Janet_Setting__mdt con valores de prod confirmados.",
    color: "#00B3FF",
  },
  {
    id: "p2",
    number: 2,
    title: "Go/no-go G1–G8",
    shortLabel: "Paso 2 · Go/no-go",
    description:
      "Reunión go/no-go con negocio JAFRA y FDE Salesforce. Ocho criterios G1–G8 (linaje · verificación · persona · reporte con folio · saldo-facturas-pagos · pedido · paquete · latencia). Cada criterio es sí o no. Uno en «no» frena el live. FDE presenta resultados; JAFRA decide.",
    objective:
      "Decisión go o no-go documentada. 8 criterios evaluados con evidencia (traces de sandbox, SOQL de prod para Case_Type_Config__c, resultados AC-01/AC-11/AC-16/AC-19/AC-23).",
    startDate: "2026-10-20",
    endDate: "2026-10-20",
    requires: [
      "Paso 0 cerrado · AC-01 verde",
      "Paso 1 cerrado · V42 lista con suite de humo pasando",
      "JAFRA Sponsor + FDE Salesforce disponibles para la reunión",
    ],
    outcome:
      "Decisión firmada go o no-go. Si go, V42 publicada en prod con medio día de tráfico interno antes de abrir a toda la base. Si no-go, lista de ajustes con fecha de re-corrida del go/no-go.",
    gate:
      "G1-G8 todos en «sí» · JAFRA Sponsor firma el go · plan de reversa a v35 ensayado una vez antes de abrir todo el tráfico.",
    color: "#9CDCFE",
  },
  {
    id: "p3",
    number: 3,
    title: "Lanzamiento monitoreado",
    shortLabel: "Paso 3 · Lanzamiento",
    description:
      "Medio día con números internos para validar en prod sin consultoras reales. Después todo el tráfico. v35 lista para reactivarse si gatilla la regla de reversa (casos con folio caen más de 30 % contra el mismo día de la semana anterior · Error Rate >3 % · una consulta con datos fuera de linaje · transferencia deja de llegar a la cola en horario). Revisión diaria de 15 min por función con Log_Session_State.",
    objective:
      "V42 corriendo en prod con 100 % del tráfico de WhatsApp. KPIs post-GA ≥ baseline v35 en las funciones medidas (reporte, saldo, estatus de pedido, transferencia, verificación).",
    startDate: "2026-10-21",
    endDate: "2026-10-24",
    requires: [
      "Paso 2 go firmado",
      "v35 publicada y lista para reactivarse como fallback",
      "Dashboard de Log_Session_State operativo por los 8 subagentes",
    ],
    outcome:
      "V42 en 100 % del tráfico, dashboard A/B con split V2.1 vs línea base v35 operativo, 5 días de revisión diaria con KPIs en verde.",
    gate:
      "5 días consecutivos con Error Rate ≤ 3 % · 0 incidentes P1 · métricas por función ≥ baseline AA-30d v35 · JAFRA confirma transición exitosa.",
    color: "#4CB2FF",
  },
  {
    id: "p4",
    number: 4,
    title: "Hypercare + handoff a Jafra IT",
    shortLabel: "Paso 4 · Hypercare",
    description:
      "2 semanas de hypercare post-launch (27-oct a 7-nov) con monitoreo diario de KPIs, runbook operativo del V2 (cómo deshabilitar, cómo agregar tipo de caso vía Case_Type_Config__c, cómo cambiar settings de Janet_Setting__mdt), documentación de los 17 Apex JAF_* + 5 Flows, entrenamiento al equipo de Jafra IT, deprecación formal del agente v35 (archivo + documentación) y handoff formal del ownership de V2.1 a Jafra IT.",
    objective:
      "V2.1 corre bajo ownership de Jafra IT sin involucramiento de Salesforce FDE por 2 semanas consecutivas. Documentación completa entregada y revisada.",
    startDate: "2026-10-27",
    endDate: "2026-11-07",
    requires: [
      "Paso 3 cerrado · V2.1 en 100 % con KPIs en verde",
      "Jafra IT asignado como owner post-FDE",
      "Capptus disponible para documentación de Apex/Flows que construyó",
    ],
    outcome:
      "Runbook completo · documentación de los 17 Apex + 5 Flows revisada por FDE · entrenamiento firmado por Jafra IT · agente v35 formalmente deprecado y archivado como fallback de 90 días.",
    gate:
      "Jafra IT firma handoff · V2.1 corre sin FDE involucrado por 2 semanas · Jafra Sponsor confirma cierre del engagement.",
    color: "#1E63D8",
  },
];

// ============================================================================
// ACTIVITIES — detalladas por paso
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

const ACTIVITIES: Activity[] = [
  // ============ PASO 0 · Acción inmediata en prod ============
  act({
    id: "0.1",
    phaseId: "p0",
    number: "0.1",
    title: "Decisión JAFRA · transferencia a persona",
    description:
      "Habilitar con cola y horario, o salir sin transferencia y registrar el caso. Soporte: 0 transferencias en EXP-1204; 55 de 62 sesiones con Validate_Human_Escalation responden «no se encuentra disponible»; 25 etiquetadas Escalated; Human Assistance Requests 500 sesiones en AA-30d. Hallazgo 1 del dossier.",
    owner: "Jafra - Sponsor",
    collaborators: ["Salesforce - FDE", "Jafra - IT Lead", "Jafra - CS Lead"],
    delegableToPartner: false,
    type: "Review",
    week: 1,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-14",
    deliverables: [
      "Decisión firmada · si habilita, cola destino + horario operativo + lista de agentes conectados",
    ],
    tags: ["decision", "hallazgo-1", "critical-path"],
  }),
  act({
    id: "0.2",
    phaseId: "p0",
    number: "0.2",
    title: "Decisión JAFRA · horario de atención",
    description:
      "Alinear el texto del Flow validador (9:00 a 18:00) con BusinessHours.settings-meta.xml (09:00 a 20:00). Fuente: Flow validador prod L426; BusinessHours.settings-meta.xml L6-17.",
    owner: "Jafra - Sponsor",
    collaborators: ["Jafra - IT Lead"],
    delegableToPartner: false,
    type: "Review",
    week: 1,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-14",
    dependencies: ["0.1"],
    deliverables: ["Horario firmado · aplicado al texto del Flow validador"],
    tags: ["decision", "critical-path"],
  }),
  act({
    id: "0.3",
    phaseId: "p0",
    number: "0.3",
    title: "Decisión JAFRA · estatus de pedido (opción a vs b)",
    description:
      "(a) La integración de pedidos (AS/400) actualiza Order.Status con el estado real, o (b) la acción Janet responde con fecha de facturación, fecha de entrega y número de rastreo que ya están en Salesforce. Soporte: 786,450/786,450 pedidos en «Borrador» en prod. JAF_InvoicingOrderDate__c no nulo en 786,450 (285,385 en últimos 30 días); JAF_DeliveryOrderDate__c no nulo en 786,450; JAF_TrackingNumber__c no nulo en 784,458. Hallazgo 2 del dossier.",
    owner: "Jafra - Sponsor",
    collaborators: ["Jafra - IT Lead", "Salesforce - FDE"],
    delegableToPartner: false,
    type: "Review",
    week: 1,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-14",
    dependencies: ["0.1"],
    deliverables: [
      "Decisión firmada (a o b) · si b, confirmar si fecha de entrega es programada o real",
    ],
    tags: ["decision", "hallazgo-2", "critical-path"],
  }),
  act({
    id: "0.4",
    phaseId: "p0",
    number: "0.4",
    title: "Decisión JAFRA · preguntas de Knowledge",
    description:
      "Responder sin membresía las preguntas que no consultan datos de la cuenta, o pedir membresía una vez. Soporte: 160 de 172 sesiones con Knowledge llaman la verificación. Hallazgo 4 del dossier.",
    owner: "Jafra - Sponsor",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: false,
    type: "Review",
    week: 1,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-15",
    dependencies: ["0.1"],
    deliverables: ["Decisión firmada · afecta edición 6 del Paso 1 (AC-09)"],
    tags: ["decision", "hallazgo-4"],
  }),
  act({
    id: "0.5",
    phaseId: "p0",
    number: "0.5",
    title: "Decisión JAFRA · evidencia (fotos)",
    description:
      "Por chat o por link. Soporte: 73 sesiones con «No pude procesar el archivo» y «Ya me llegó tu foto» en EXP-1204.",
    owner: "Jafra - Sponsor",
    collaborators: ["Jafra - IT Lead"],
    delegableToPartner: false,
    type: "Review",
    week: 1,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-15",
    dependencies: ["0.1"],
    deliverables: ["Decisión firmada · afecta edición 5 del Paso 1"],
    tags: ["decision"],
  }),
  act({
    id: "0.6",
    phaseId: "p0",
    number: "0.6",
    title: 'Decisión JAFRA · "ya no me escriban" / baja',
    description:
      "Qué se registra y cómo se cierra la sesión. Soporte: V41 L268 envía estas sesiones a Human_Handoff; sesión 01a11d72-df75 termina en «Safety violation limit exceeded.»",
    owner: "Jafra - Sponsor",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: false,
    type: "Review",
    week: 1,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-15",
    dependencies: ["0.1"],
    deliverables: ["Decisión firmada · afecta edición 2 del Paso 1 (AC-22)"],
    tags: ["decision"],
  }),
  act({
    id: "0.7",
    phaseId: "p0",
    number: "0.7",
    title: "Resolver de linaje · activar verificación en prod",
    description:
      "FDE Salesforce activa en prod una versión del Resolver_cuenta_solicitante_en_linaje_ALF que llame aaf_verificacion_de_linaje_consultora (como sí lo hace el de sandbox, L194-202), con normalización de ceros. Aplica a v35 desde el día que se habilita. Hallazgo 5 del dossier.",
    owner: "Salesforce - FDE",
    collaborators: ["Jafra - IT Lead"],
    delegableToPartner: false,
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-14",
    plannedEnd: "2026-10-15",
    dependencies: ["0.1"],
    deliverables: [
      "Resolver con <subflows> a aaf_verificacion_de_linaje_consultora activo en prod · diff vs sandbox cero",
    ],
    tags: ["hallazgo-5", "critical-path"],
  }),
  act({
    id: "0.8",
    phaseId: "p0",
    number: "0.8",
    title: "AC-01 en prod · verificación de linaje con membresía ajena",
    description:
      "Verificada como la membresía de prueba A, pedir los pedidos de B, el estatus de un folio de B y un reporte para B. Pasa con 3 de 3 rechazados, sin datos de B y 0 casos creados. Se corre con v35 ya con el Resolver activo. Criterio G1.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Test",
    week: 1,
    plannedStart: "2026-10-15",
    plannedEnd: "2026-10-15",
    dependencies: ["0.7"],
    deliverables: ["Evidencia AC-01 · 3/3 rechazados · 0 casos · 0 datos fuera de linaje"],
    tags: ["g1", "test", "critical-path"],
  }),
  act({
    id: "0.9",
    phaseId: "p0",
    number: "0.9",
    title: "Habilitar transferencia a persona en prod (si JAFRA aprueba)",
    description:
      "FDE retira cancelarFlujo=true del Flow janet_agentforce_validar_escalamiento_humano_alf_f_a (L428-437). Cambia la cola de JAF_routeLive (L88-93 · queueId 00GWe000006ykR9MAI) por una cola real de prod. Ejecuta una transferencia real de prueba y confirma que llega al agente. Hallazgo 1 del dossier.",
    owner: "Salesforce - FDE",
    collaborators: ["Jafra - IT Lead"],
    delegableToPartner: false,
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-14",
    plannedEnd: "2026-10-15",
    dependencies: ["0.1"],
    deliverables: [
      "Flow validador sin cancelarFlujo · JAF_routeLive con cola de prod · 1 transferencia de prueba exitosa",
    ],
    tags: ["hallazgo-1", "g3", "critical-path"],
  }),

  // ============ PASO 1 · V41 → V42 y paquete ============
  act({
    id: "1.1",
    phaseId: "p1",
    number: "1.1",
    title: "Paquete V2 completo con valores de prod",
    description:
      "Case_Type_Config__c con las 61 filas (ya en sandbox, 0 en prod). Janet_Setting__mdt.Default con Validate_Phone__c=true, sin Test_Until__c, 0 teléfonos aprobados en Janet_Approved_Phone__mdt. JAF_ClassifyChannelMessage + JAF_LogSessionState desplegadas. Permission set asignado. Criterio G7.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Deploy",
    week: 1,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-16",
    deliverables: [
      "Paquete V2 desplegado a sandbox + preparado para prod · SOQL en prod confirma 61 filas · settings con valores de prod",
    ],
    tags: ["g7", "delegable", "critical-path"],
  }),
  act({
    id: "1.2",
    phaseId: "p1",
    number: "1.2",
    title: "Edición 1 · Sin persona disponible, ofrecer caso una vez",
    description:
      "En V42, si canEscalate=false, el agente lo informa una vez y ofrece registrar el caso (AC-12). El validador corre en cada pedido de persona. El agente no menciona un límite de intentos. Criterio G3 (ruta alterna).",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-14",
    plannedEnd: "2026-10-15",
    dependencies: ["0.1"],
    deliverables: ["Rama out-of-availability en Human_Handoff con oferta de caso única"],
    tags: ["hallazgo-1", "g3"],
  }),
  act({
    id: "1.3",
    phaseId: "p1",
    number: "1.3",
    title: 'Edición 2 · "Ya no me escriban" · registrar y cerrar',
    description:
      "Hoy V41 lo envía a Human_Handoff (L268); en 01a11d72-df75 la persona escribe «dejen de mandar msjs» y la sesión termina en «Safety violation limit exceeded.». Nueva rama: registrar la baja y cerrar la sesión limpiamente. AC-22.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-14",
    plannedEnd: "2026-10-15",
    dependencies: ["0.6"],
    deliverables: ["Rama registra+cierra en Human_Handoff o Guardrails según decisión 0.6"],
    tags: ["ac-22", "dev"],
  }),
  act({
    id: "1.4",
    phaseId: "p1",
    number: "1.4",
    title: "Edición 3 · RFC, CURP y fecha de nacimiento no se muestran",
    description:
      "V41 L585 los permite si la consultora los pide, y JAF_ConsultaSimpleService.cls los devuelve al modelo (L88-93, L187-192). Una línea en el script y un ajuste en el Apex para no exponerlos.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-15",
    plannedEnd: "2026-10-16",
    deliverables: [
      "V42 L585 restringe salida · JAF_ConsultaSimpleService no devuelve RFC/CURP/fecha nacimiento",
    ],
    tags: ["security", "dev"],
  }),
  act({
    id: "1.5",
    phaseId: "p1",
    number: "1.5",
    title: "Edición 4 · Retirar Get_Approved_Phone_Membership del script de prod",
    description:
      "V41 L253 llama Get_Approved_Phone_Membership antes de verificar y verifica con la membresía simulada. Se conserva en sandbox para pruebas, se retira del script de prod. Soporte: Janet_Setting__mdt no existe en prod; sesión 01a11daf-9e0e valida con «11» contra MEMBRESIA DE PRUEBAS LGM. Criterio G2.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-14",
    plannedEnd: "2026-10-15",
    deliverables: [
      "V42 sin la acción Get_Approved_Phone_Membership · verificación limpia · cuenta de pruebas fuera de prod",
    ],
    tags: ["hallazgo-3", "g2", "critical-path"],
  }),
  act({
    id: "1.6",
    phaseId: "p1",
    number: "1.6",
    title: "Edición 5 · Ligar adjuntos al folio del caso",
    description:
      "73 sesiones con «No pude procesar el archivo» y «Ya me llegó tu foto» en EXP-1204. Hoy Sync_Case_Attachments corre pero no siempre liga al folio correcto. Edición en V42 según decisión 0.5 (chat vs link).",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-15",
    plannedEnd: "2026-10-16",
    dependencies: ["0.5"],
    deliverables: ["Sync_Case_Attachments con binding al folio · 0 archivos huérfanos en pruebas"],
    tags: ["dev", "delegable"],
  }),
  act({
    id: "1.7",
    phaseId: "p1",
    number: "1.7",
    title: "Edición 6 · Preguntas de Knowledge sin membresía (si JAFRA aprueba)",
    description:
      "Si JAFRA aprueba (decisión 0.4): V42 responde sin membresía las preguntas que no consultan datos de la cuenta. Si JAFRA mantiene la verificación: el agente pide la membresía una vez. Sin respuesta en Knowledge: ofrece una vez registrar un caso. AC-09.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-16",
    plannedEnd: "2026-10-16",
    dependencies: ["0.4"],
    deliverables: ["Rama Knowledge sin verificación · o pide membresía una sola vez"],
    tags: ["hallazgo-4", "ac-09", "optional"],
  }),
  act({
    id: "1.8",
    phaseId: "p1",
    number: "1.8",
    title: "Instrucción interina para pedidos (si no hay opción a/b)",
    description:
      "Si la decisión 0.3 no se aplica antes del go/no-go: instrucción en V42 para no usar «Borrador» como explicación de una demora y ofrecer el reporte. Fallback del Hallazgo 2.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-16",
    plannedEnd: "2026-10-16",
    dependencies: ["0.3"],
    deliverables: ["Instrucción en V42 que suprime «Borrador» como explicación"],
    tags: ["hallazgo-2", "fallback"],
  }),
  act({
    id: "1.9",
    phaseId: "p1",
    number: "1.9",
    title: "sf agent validate authoring-bundle · V42",
    description:
      "Ejecutar sf agent validate authoring-bundle --json --api-name Jafra_Agentforce_V2 y confirmar 0 errores. Automatizable — Capptus lo corre, FDE revisa output.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Test",
    week: 1,
    plannedStart: "2026-10-16",
    plannedEnd: "2026-10-16",
    dependencies: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8"],
    deliverables: ["JSON de validate · 0 errores"],
    tags: ["delegable", "validate"],
  }),
  act({
    id: "1.10",
    phaseId: "p1",
    number: "1.10",
    title: "Suite de humo en sandbox con la traza abierta",
    description:
      "Correr sf agent preview start --use-live-actions sobre los escenarios de referencia del dossier: 01a11d0d (reporte faltante · G4), 01a11c17 (saldo · G5), 01a119fb (estatus pedido · G6), 01a1039f (premio dañado · AC-08), 01a11bd9 (transferencia · G3), 01a11da2 (verificación membresía 10 dígitos · G2). Toda la traza queda abierta en Agent Analytics del sandbox.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Test",
    week: 1,
    plannedStart: "2026-10-16",
    plannedEnd: "2026-10-17",
    dependencies: ["1.9"],
    deliverables: [
      "6+ escenarios con evidencia de trace · todos pasan · diferencias documentadas si las hubiera",
    ],
    tags: ["smoke", "critical-path"],
  }),

  // ============ PASO 2 · Go/no-go G1-G8 ============
  act({
    id: "2.1",
    phaseId: "p2",
    number: "2.1",
    title: "G1 · Linaje",
    description:
      "AC-01 en prod: 3 de 3 intentos fuera de linaje rechazados, sin datos de la otra membresía, 0 casos. Se repite el AC-01 del Paso 0 ya con V42 lista.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Test",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-20",
    dependencies: ["0.8", "1.10"],
    deliverables: ["Resultado AC-01 verde · evidencia subida a la reunión go/no-go"],
    tags: ["g1", "critical-path"],
  }),
  act({
    id: "2.2",
    phaseId: "p2",
    number: "2.2",
    title: "G2 · Verificación",
    description:
      "Teléfono encendido (Validate_Phone__c=true), sin modo prueba, 0 teléfonos aprobados; 5 de 5 formatos validan la misma membresía (con y sin dígito verificador, con guion, con espacio, con prefijo); un teléfono distinto devuelve PHONE_MISMATCH. Hallazgo 3.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Test",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-20",
    dependencies: ["1.5", "1.10"],
    deliverables: ["5/5 formatos validan · PHONE_MISMATCH alcanzable · evidencia subida"],
    tags: ["g2", "hallazgo-3", "critical-path"],
  }),
  act({
    id: "2.3",
    phaseId: "p2",
    number: "2.3",
    title: "G3 · Persona",
    description:
      "1 transferencia real llega a la cola de prod; o, sin persona, el agente lo informa una vez y crea el caso (AC-12). Depende de la decisión 0.1.",
    owner: "Salesforce - FDE",
    collaborators: ["Jafra - CS Lead"],
    delegableToPartner: false,
    type: "Test",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-20",
    dependencies: ["0.9", "1.2"],
    deliverables: ["Evidencia transferencia o AC-12 según decisión 0.1"],
    tags: ["g3", "hallazgo-1", "critical-path"],
  }),
  act({
    id: "2.4",
    phaseId: "p2",
    number: "2.4",
    title: "G4 · Reporte con folio",
    description:
      "AC-16 ≥ 58/61 (cada frase real de reporte cae en su tipo de Case_Type_Config__c) · AC-23 pasa (un «sí» crea exactamente un caso: 0, 1, 1 y 2 casos en los cuatro guiones) · AC-08 pasa (un «Si» corto en un reporte de premio o puntos crea el caso, sin «Safety violation») · la sesión 01a11d0d-8b9a se reproduce igual.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Test",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-20",
    dependencies: ["1.1", "1.10"],
    deliverables: ["AC-16, AC-23, AC-08 verdes · evidencia subida"],
    tags: ["g4", "critical-path"],
  }),
  act({
    id: "2.5",
    phaseId: "p2",
    number: "2.5",
    title: "G5 · Saldo, facturas y pagos",
    description:
      "AC-11 ≥ 19/20 (cada cifra de saldo y pagos viene de una acción, 0 cifras inventadas) · la sesión 01a11c17-f46c se reproduce igual.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Test",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-20",
    dependencies: ["1.10"],
    deliverables: ["AC-11 verde · evidencia subida"],
    tags: ["g5", "critical-path"],
  }),
  act({
    id: "2.6",
    phaseId: "p2",
    number: "2.6",
    title: "G6 · Pedido",
    description:
      "3 pedidos facturados muestran su estatus real (opción a de 0.3) o su fecha de facturación, entrega y rastreo (opción b), o el agente no usa «Borrador» como explicación; el número mostrado crea el reporte.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Jafra - IT Lead"],
    delegableToPartner: false,
    type: "Test",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-20",
    dependencies: ["0.3", "1.8"],
    deliverables: ["3 pedidos facturados con estatus correcto o fallback aplicado"],
    tags: ["g6", "hallazgo-2", "critical-path"],
  }),
  act({
    id: "2.7",
    phaseId: "p2",
    number: "2.7",
    title: "G7 · Paquete",
    description:
      "61 filas en Case_Type_Config__c (SOQL prod), permission set asignado, router y cola de prod configurados.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Test",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-20",
    dependencies: ["1.1"],
    deliverables: ["SOQL prod · 61 filas · permission set asignado"],
    tags: ["g7", "delegable", "critical-path"],
  }),
  act({
    id: "2.8",
    phaseId: "p2",
    number: "2.8",
    title: "G8 · Latencia",
    description:
      "Latencia por turno ≤ 5.4 s en una corrida de 20 turnos (AC-19). Línea base AA-30d Health: Agent Interaction Latency 5.42 (unidad no visible en la tarjeta).",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Test",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-20",
    dependencies: ["1.10"],
    deliverables: ["20 turnos medidos · promedio ≤ 5.4 s"],
    tags: ["g8", "critical-path"],
  }),
  act({
    id: "2.9",
    phaseId: "p2",
    number: "2.9",
    title: "Reunión go/no-go con JAFRA Sponsor",
    description:
      "FDE Salesforce presenta los 8 resultados G1-G8 con evidencia. JAFRA Sponsor decide. Un «no» en cualquier G frena el live. Si go: V42 queda lista para publish el lunes siguiente.",
    owner: "Jafra - Sponsor",
    collaborators: ["Salesforce - CSM", "Salesforce - FDE"],
    delegableToPartner: false,
    type: "Review",
    week: 2,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-20",
    dependencies: ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8"],
    deliverables: ["Acta go/no-go firmada"],
    tags: ["decision", "critical-path"],
  }),

  // ============ PASO 3 · Lanzamiento monitoreado ============
  act({
    id: "3.1",
    phaseId: "p3",
    number: "3.1",
    title: "sf agent publish authoring-bundle · V42 en prod",
    description:
      "sf agent publish authoring-bundle --api-name Jafra_Agentforce_V2 + sf agent activate. V35 queda publicada como fallback para reversa inmediata.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Deploy",
    week: 2,
    plannedStart: "2026-10-21",
    plannedEnd: "2026-10-21",
    dependencies: ["2.9"],
    deliverables: ["V42 publicada y activa en prod · v35 archivada como fallback"],
    tags: ["publish", "delegable", "critical-path"],
  }),
  act({
    id: "3.2",
    phaseId: "p3",
    number: "3.2",
    title: "Medio día con números internos",
    description:
      "Primera mitad de día con números del equipo Jafra + FDE Salesforce. Verifica Log_Session_State en los 8 subagentes, latencia ≤ 5.4s, 0 errores en la traza, flujo end-to-end de los 4 casos de referencia (G1-G4).",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Jafra - IT Lead", "Jafra - CS Lead", "Partner"],
    delegableToPartner: false,
    type: "Test",
    week: 2,
    plannedStart: "2026-10-21",
    plannedEnd: "2026-10-21",
    dependencies: ["3.1"],
    deliverables: ["Smoke test medio día · 10+ sesiones internas · 0 incidentes"],
    tags: ["smoke-test", "critical-path"],
  }),
  act({
    id: "3.3",
    phaseId: "p3",
    number: "3.3",
    title: "Abrir todo el tráfico",
    description:
      "100% del tráfico de WhatsApp enruta al V42. Dashboard A/B con split V2.1 vs línea base v35 en pantalla. Equipo on-call con regla de reversa ensayada.",
    owner: "Jafra - IT Lead",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Deploy",
    week: 2,
    plannedStart: "2026-10-22",
    plannedEnd: "2026-10-22",
    dependencies: ["3.2"],
    deliverables: ["100% del tráfico en V42 · dashboard A/B operativo"],
    tags: ["go-live", "critical-path"],
  }),
  act({
    id: "3.4",
    phaseId: "p3",
    number: "3.4",
    title: "Revisión diaria de 15 min por función con Log_Session_State",
    description:
      "Cada día de la semana de live, 15 min por función (reporte · saldo · estatus pedido · transferencia · verificación · Knowledge · linaje · evidencia). Log_Session_State registra los 8 subagentes (17 referencias en V41 L292-L2859). Reversa inmediata a v35 si gatilla la regla.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Jafra - IT Lead", "Jafra - CS Lead"],
    delegableToPartner: false,
    type: "Ops",
    week: 2,
    plannedStart: "2026-10-22",
    plannedEnd: "2026-10-24",
    dependencies: ["3.3"],
    deliverables: ["3 standups diarios · reporte KPIs end-of-week · lista de bugs si los hubiera"],
    tags: ["ops", "critical-path"],
  }),

  // ============ PASO 4 · Hypercare + handoff ============
  act({
    id: "4.1",
    phaseId: "p4",
    number: "4.1",
    title: "Hypercare semana 1 · 27-oct a 31-oct",
    description:
      "Monitoreo diario de KPIs con comparativa vs baseline AA-30d v35. FDE + Jafra IT lideran — NO Capptus (quien construyó v35). Standup semanal con JAFRA Sponsor.",
    owner: "Salesforce - FDE",
    collaborators: ["Jafra - IT Lead"],
    delegableToPartner: false,
    type: "Ops",
    week: 3,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-10-31",
    dependencies: ["3.4"],
    deliverables: ["Reporte semanal · KPIs V2.1 vs baseline v35"],
    tags: ["hypercare", "critical-path"],
  }),
  act({
    id: "4.2",
    phaseId: "p4",
    number: "4.2",
    title: "Runbook operativo del V2.1",
    description:
      "Operaciones típicas: cómo deshabilitar el V2.1 (cambiar el Flow del canal al v35), cómo agregar un tipo de caso (nuevo record en Case_Type_Config__c), cómo cambiar settings (Janet_Setting__mdt), cómo agregar un aviso, cómo monitorear KPIs. FDE escribe el runbook.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Doc",
    week: 3,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-10-31",
    dependencies: ["3.3"],
    deliverables: ["Runbook markdown entregado a Jafra IT"],
    tags: ["doc"],
  }),
  act({
    id: "4.3",
    phaseId: "p4",
    number: "4.3",
    title: "Documentación de los 17 Apex JAF_* + 5 Flows",
    description:
      "Capptus escribe la documentación técnica de los Apex y Flows que construyó (contrato, comportamiento, decisiones de diseño). FDE revisa fidelidad al comportamiento observado.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Doc",
    week: 3,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-11-04",
    dependencies: ["3.3"],
    deliverables: ["Documentación 17 Apex + 5 Flows · revisada por FDE"],
    tags: ["doc", "delegable"],
  }),
  act({
    id: "4.4",
    phaseId: "p4",
    number: "4.4",
    title: "Entrenamiento al equipo de Jafra IT",
    description:
      "Sesión de 2-3 horas: arquitectura del V2.1 (8 Topics, router, verificación como paso fijo, Case_Type_Config__c como panel de control, patrón de agregar tipo nuevo), lectura del dashboard A/B. FDE conduce, Capptus asiste como observador.",
    owner: "Salesforce - FDE",
    collaborators: ["Jafra - IT Lead", "Partner"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 4,
    plannedStart: "2026-11-03",
    plannedEnd: "2026-11-04",
    dependencies: ["4.2", "4.3"],
    deliverables: ["Sesión grabada · materiales entregados"],
    tags: ["training"],
  }),
  act({
    id: "4.5",
    phaseId: "p4",
    number: "4.5",
    title: "Deprecación formal del agente v35",
    description:
      "Documentar la decisión de deprecar Jafra_Agentforce v35. Mantener como fallback de 90 días post-live. Las 35 versiones quedan en el org pero sin tráfico. Comunicar a Jafra IT que no deben modificarse.",
    owner: "Jafra - IT Lead",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Mgmt",
    week: 4,
    plannedStart: "2026-11-04",
    plannedEnd: "2026-11-05",
    dependencies: ["3.3"],
    deliverables: ["Doc de deprecación · comunicación interna"],
    tags: ["deprecation", "delegable"],
  }),
  act({
    id: "4.6",
    phaseId: "p4",
    number: "4.6",
    title: "Handoff formal · V2.1 bajo ownership de Jafra IT",
    description:
      "Jafra Sponsor + Jafra IT Lead confirman que reciben V2.1 con documentación completa, entrenamiento firmado y 2 semanas de hypercare validadas. FDE sale del día a día. Capptus queda como partner de operación bajo contrato directo con Jafra.",
    owner: "Shared",
    collaborators: ["Jafra - Sponsor", "Jafra - IT Lead", "Salesforce - FDE", "Salesforce - CSM"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 4,
    plannedStart: "2026-11-07",
    plannedEnd: "2026-11-07",
    dependencies: ["4.1", "4.2", "4.3", "4.4", "4.5"],
    deliverables: ["Acta de handoff firmada por ambas partes"],
    tags: ["handoff", "critical-path", "closing"],
  }),
];

// ============================================================================
// MILESTONES
// ============================================================================

const MILESTONES: Milestone[] = [
  {
    id: "deep-dive-9oct",
    title: "🎤 Sesión de trabajo deep-dive · JAFRA México",
    description:
      "Sesión ejecutiva con JAFRA + FDE Salesforce + Capptus (vie 2026-10-09). Entrega del dossier ejecutivo con cifras de prod AA-30d, cambios de V41 con línea del script, 5 hallazgos con fuente y plan de 4 pasos. Deck ejecutivo publicado en el portal.",
    date: "2026-10-09",
    kind: "Executive Review",
    phaseId: "p0",
    participants: [
      "Salesforce - FDE",
      "Salesforce - CSM",
      "Jafra - Sponsor",
      "Jafra - IT Lead",
      "Jafra - CS Lead",
      "Partner",
    ],
    status: "completed",
    outcome:
      "Dossier firmado como fuente de verdad. 4 pasos y 8 criterios G1-G8 aceptados. Reunión go/no-go programada para la próxima semana.",
    references: [
      {
        label: "Deck ejecutivo · Janet v2.1 a live",
        url: "/Customers/Jafra/files/janet-jafra-deck/index.html",
        kind: "document",
      },
      {
        label: "Dossier ejecutivo · PDF",
        url: "/Customers/Jafra/files/Janet-JAFRA-Dossier-Ejecutivo.pdf",
        kind: "pdf",
      },
    ],
  },
  {
    id: "p0-review",
    title: "Review Paso 0 · decisiones y linaje",
    description:
      "Verificar que las 6 decisiones de JAFRA (persona, horario, pedido, Knowledge, evidencia, baja) y el AC-01 en prod estén cerrados antes de arrancar la reunión go/no-go.",
    date: "2026-10-16",
    kind: "Executive Review",
    phaseId: "p0",
    participants: ["Salesforce - FDE", "Jafra - Sponsor", "Jafra - IT Lead"],
    status: "scheduled",
    references: [],
  },
  {
    id: "v42-ready",
    title: "V42 lista · suite de humo pasa",
    description:
      "sf agent validate con 0 errores. Suite de humo en sandbox pasa los 6 escenarios de referencia del dossier.",
    date: "2026-10-17",
    kind: "Internal Review",
    phaseId: "p1",
    participants: ["Salesforce - FDE", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "go-no-go",
    title: "🚦 Reunión go/no-go G1-G8",
    description:
      "Jafra Sponsor + Salesforce revisan los 8 criterios con evidencia. Un «no» frena el live. Si go, V42 va a publish al día siguiente.",
    date: "2026-10-20",
    kind: "Executive Review",
    phaseId: "p2",
    participants: ["Jafra - Sponsor", "Salesforce - CSM", "Salesforce - FDE"],
    status: "scheduled",
    references: [],
  },
  {
    id: "live-internal",
    title: "V42 en prod · medio día con números internos",
    description:
      "Primera mitad del día con números del equipo Jafra + FDE. Validación de los 4 casos de referencia end-to-end antes de abrir todo el tráfico.",
    date: "2026-10-21",
    kind: "Go-live",
    phaseId: "p3",
    participants: ["Salesforce - FDE", "Jafra - IT Lead", "Jafra - CS Lead", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "live-100",
    title: "🎯 V2.1 · 100 % del tráfico de WhatsApp",
    description:
      "Flip a 100 %. Dashboard A/B operativo con split V2.1 vs baseline v35. v35 queda archivada como fallback 90 días.",
    date: "2026-10-22",
    kind: "Go-live",
    phaseId: "p3",
    participants: ["Jafra - IT Lead", "Salesforce - FDE", "Jafra - Sponsor"],
    status: "scheduled",
    references: [],
  },
  {
    id: "handoff",
    title: "Handoff formal · V2.1 bajo ownership de Jafra IT",
    description:
      "Firma ejecutiva del handoff tras 2 semanas de hypercare. FDE sale del día a día.",
    date: "2026-11-07",
    kind: "Executive Review",
    phaseId: "p4",
    participants: [
      "Jafra - Sponsor",
      "Jafra - IT Lead",
      "Salesforce - CSM",
      "Salesforce - FDE",
    ],
    status: "scheduled",
    references: [],
  },
];

// ============================================================================
// RISKS — derivados de los 5 hallazgos y los pivotes de prod
// ============================================================================

const RISKS: Risk[] = [
  {
    id: "R1",
    title: "Decisión de estatus de pedido (opción a vs b) no llega a tiempo",
    description:
      "786,450/786,450 pedidos en prod tienen Status = «Borrador» (SOQL prod 9-oct). La acción Get_Consultant_Orders solo lee Status (JAF_ConsultaPedidosService L79, L174). 164/173 sesiones responden «Borrador». Un cambio en el script no corrige el estatus — el cambio va en la integración AS/400 o en el Apex. Si la decisión 0.3 no se cierra, el Hallazgo 2 queda sin resolver para live.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Fallback activo en edición 1.8: instrucción en V42 para no usar «Borrador» como explicación y ofrecer el reporte. Mantiene G6 alcanzable aunque sin opción a/b. Decisión escalada en el Paso 0 con fecha límite dura mar 14-oct.",
    owner: "Jafra - Sponsor",
    status: "active",
    phaseId: "p0",
    references: [],
  },
  {
    id: "R2",
    title: "Transferencia habilitada sin personas en cola",
    description:
      "Si se habilita la transferencia sin personas asignadas a la cola, Check Availability for Routing devolverá 0 agentes conectados y canEscalate=false (Flow validador prod L340). Con la transferencia habilitada, Escalation Rate del tablero cuenta esas sesiones por definición. Puede degradar la métrica aparente sin agregar valor real.",
    probability: "Medium",
    impact: "Medium",
    mitigation:
      "Decisión 0.1 incluye horario operativo y lista de agentes conectados. FDE ejecuta transferencia real de prueba (0.9) antes del go/no-go. Si JAFRA opta por 'sin persona', la edición 1.2 cubre AC-12 y G3 pasa por la ruta alterna.",
    owner: "Jafra - CS Lead",
    status: "active",
    phaseId: "p0",
    references: [],
  },
  {
    id: "R3",
    title: "Capptus modifica Flow sin coordinar",
    description:
      "Capptus construyó v35 con los issues que V2.1 corrige. Existe riesgo de que modifique Flows del V2 en sandbox durante Paso 1-2 sin coordinación con FDE, introduciendo regresiones silenciosas en los reasonCodes, en la normalización, o en el Resolver de linaje.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Alcance de delegación limitado a one-liners, config/admin ops y ejecución de scripts prescritos (actividades con delegableToPartner: true). FDE conserva Flows críticos (Resolver de linaje, Validate_Human_Escalation, Verify Flow). Code review conjunto antes de publish (actividad 2.9). sf agent validate + suite de humo obligatorios.",
    owner: "Salesforce - FDE",
    status: "active",
    references: [],
  },
  {
    id: "R4",
    title: "Get_Approved_Phone_Membership no se retira del script de prod",
    description:
      "V41 L253 llama Get_Approved_Phone_Membership y verifica con la membresía simulada. Janet_Approved_Phone__mdt tiene 2 registros, 1 activo en sandbox. Sesión 01a11daf-9e0e valida con «11» contra MEMBRESIA DE PRUEBAS LGM. Si la acción queda en V42 cuando sube a prod, cualquier membresía simulada activa validaría en prod. Hallazgo 3.",
    probability: "Low",
    impact: "High",
    mitigation:
      "Edición 1.5 obligatoria en Paso 1: retirar la acción del script de prod (se conserva en sandbox para pruebas). Validación en el go/no-go G2: 0 teléfonos aprobados activos, Validate_Phone__c=true, Test_Until__c vacío.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "p1",
    references: [],
  },
  {
    id: "R5",
    title: "Error Rate >3 % en live gatilla reversa a v35",
    description:
      "Línea base AA-30d Health: 1.14 % (+356 % contra los 30 días anteriores). Umbral de reversa: >3 %. Error Rate alto implica fallas sistémicas en acciones Apex o en el modelo. La reversa a v35 pierde la mejora pero preserva el servicio.",
    probability: "Low",
    impact: "High",
    mitigation:
      "Dashboard por acción con alerta a FDE on-call en live. Regla de reversa ensayada una vez antes de abrir todo el tráfico. Reversa es cambiar el Flow del canal en Messaging Settings — minutos, no horas. V35 queda activa como fallback.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "p3",
    references: [],
  },
  {
    id: "R6",
    title: "Pico Escalated 22-29 sep sin causa identificada",
    description:
      "1,130 de 1,240 sesiones Escalated de AA-30d (91.1 %) caen entre el 22 y el 29-sep. 13 de 25 sesiones Escalated de EXP-1204 registran Errores=1; 12 terminan en «Safety violation limit exceeded.». Puede ser un cambio no documentado o un pico de malinterpretaciones.",
    probability: "Low",
    impact: "Medium",
    mitigation:
      "Monitoreo de Escalation Rate en live con alerta si vuelve a subir a +3 pp. Guardrails de V41 (subagente consolidado L2661) debería reducir «Safety violation limit exceeded.». JAF_ClassifyChannelMessage (V41 L213) clasifica los mensajes del canal antes de razonar — reduce 39 sesiones con «unsupported message type» de v35.",
    owner: "Salesforce - FDE",
    status: "active",
    references: [],
  },
  {
    id: "R7",
    title: "KPIs post-live no superan baseline v35",
    description:
      "Deflection Rate baseline: 11.24 % (21.7 % excluyendo Not set); Missing and Damaged Products 24 % defl.; Account Balance 25 % defl.; Order Tracking 8 % defl. Si V2.1 no supera estos valores en los primeros 5 días, se cuestiona la decisión de live.",
    probability: "Low",
    impact: "High",
    mitigation:
      "Dashboard A/B operativo desde minuto 1 con split por versión. Revisión diaria de 15 min por función en Paso 3. Si al día 3 KPIs están iguales o peor, análisis de root cause FDE + bugfix. Reversa como opción si no mejora al día 5.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "p3",
    references: [],
  },
  {
    id: "R8",
    title: "61 filas de Case_Type_Config__c no cargan limpias en prod",
    description:
      "Las 61 filas existen en sandbox; prod tiene 0. El describe de prod del 9-oct responde «The requested resource does not exist» para el objeto. Si el permission set o el objeto no se despliega correctamente, la acción Create_Case (V41 L2098) falla.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Paquete V2 (actividad 1.1) incluye el objeto + permission set + 61 filas como un deployment atómico. G7 valida 61 filas en SOQL prod antes del go/no-go. Capptus ejecuta siguiendo script prescrito y FDE revisa output.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "p1",
    references: [],
  },
];

// ============================================================================
// STABLE CRITERIA — las 8 Gs + 5 criterios de operación continua
// ============================================================================

const STABLE_CRITERIA: StableCriterion[] = [
  {
    id: "G1",
    dimension: "Producto",
    criterion:
      "G1 · Linaje · AC-01 en prod: 3 de 3 intentos fuera de linaje rechazados, sin datos de la otra membresía, 0 casos.",
    status: "pending",
    references: [],
  },
  {
    id: "G2",
    dimension: "Seguridad",
    criterion:
      "G2 · Verificación · Validate_Phone__c=true, sin modo prueba, 0 teléfonos aprobados; 5/5 formatos validan; teléfono distinto da PHONE_MISMATCH.",
    status: "pending",
    references: [],
  },
  {
    id: "G3",
    dimension: "Operación",
    criterion:
      "G3 · Persona · 1 transferencia real llega a la cola de prod; o, sin persona, el agente lo informa una vez y crea el caso (AC-12).",
    status: "pending",
    references: [],
  },
  {
    id: "G4",
    dimension: "Producto",
    criterion:
      "G4 · Reporte con folio · AC-16 ≥ 58/61; AC-23 pasa; AC-08 pasa; la sesión de referencia 01a11d0d-8b9a se reproduce igual.",
    status: "pending",
    references: [],
  },
  {
    id: "G5",
    dimension: "Producto",
    criterion:
      "G5 · Saldo, facturas y pagos · AC-11 ≥ 19/20; la sesión de referencia 01a11c17-f46c se reproduce igual.",
    status: "pending",
    references: [],
  },
  {
    id: "G6",
    dimension: "Producto",
    criterion:
      "G6 · Pedido · 3 pedidos facturados muestran su estatus real (opción a) o facturación/entrega/rastreo (opción b), o el agente no usa «Borrador» como explicación.",
    status: "pending",
    references: [],
  },
  {
    id: "G7",
    dimension: "Mantenibilidad",
    criterion:
      "G7 · Paquete · 61 filas en Case_Type_Config__c (SOQL prod), permission set asignado, router y cola de prod configurados.",
    status: "pending",
    references: [],
  },
  {
    id: "G8",
    dimension: "Operación",
    criterion:
      "G8 · Latencia · ≤ 5.4 s por turno en 20 turnos medidos (AC-19). Línea base AA-30d: Agent Interaction Latency 5.42.",
    status: "pending",
    references: [],
  },
  {
    id: "C1",
    dimension: "Observabilidad",
    criterion:
      "Log_Session_State registra los 8 subagentes en V2.1 (17 referencias en V41 L292-L2859) y produce traza completa para revisión diaria de 15 min por función.",
    status: "pending",
    references: [],
  },
  {
    id: "C2",
    dimension: "Mantenibilidad",
    criterion:
      "Runbook operativo + documentación de los 17 Apex JAF_* + 5 Flows entregados y revisados por FDE antes del handoff.",
    status: "pending",
    references: [],
  },
];

// ============================================================================
// EXPORT · PLAN OBJECT
// ============================================================================

export const jafraPlan: JafraPlan = {
  slug: "jafra",
  projectName: "Jafra · Janet v2.1 — Live sobre la base de V41",
  kickoffDate: "2026-10-09",
  endDate: "2026-11-07",
  phases: PHASES,
  activities: ACTIVITIES,
  milestones: MILESTONES,
  risks: RISKS,
  stableCriteria: STABLE_CRITERIA,
  statusUpdates: [
    {
      id: "upd-2026-10-09",
      weekOf: "2026-10-09",
      author: "Salesforce - FDE",
      overallHealth: "yellow",
      phaseId: "p0",
      highlights: [
        "Sesión de trabajo deep-dive con JAFRA México cerrada el 9-oct",
        "Dossier ejecutivo entregado como fuente de verdad (21 páginas, nivel A/B/C de evidencia por afirmación)",
        "Deck ejecutivo de 24 slides publicado en el portal",
        "4 pasos y 8 criterios G1-G8 aceptados por JAFRA · Sponsor firma arranque Paso 0",
      ],
      nextWeek: [
        "Paso 0 · 6 decisiones de JAFRA (persona, horario, pedido, Knowledge, evidencia, baja)",
        "Paso 0 · Resolver de linaje con verificación activo en prod + AC-01",
        "Paso 1 · V41 → V42 + paquete V2 con valores de prod + 6 ediciones",
        "Reunión go/no-go G1-G8 programada para mar 20-oct",
      ],
      activeBlockers: [
        "Decisión 0.3 (estatus de pedido · opción a vs b) · owner JAFRA Sponsor · fecha límite mar 14-oct",
        "Decisión 0.1 (habilitar transferencia · cola + horario) · owner JAFRA Sponsor + CS Lead",
      ],
      activeRisks: ["R1", "R2", "R3"],
      kpiSnapshot: {
        deflection: 11.24,
        escalation: 4.0,
        abandon: 35.46,
        errorRate: 1.14,
      },
      references: [
        {
          label: "Deck ejecutivo · Janet v2.1 a live",
          url: "/Customers/Jafra/files/janet-jafra-deck/index.html",
          kind: "document",
        },
        {
          label: "Dossier ejecutivo · PDF",
          url: "/Customers/Jafra/files/Janet-JAFRA-Dossier-Ejecutivo.pdf",
          kind: "pdf",
        },
      ],
    },
  ],
};

// ============================================================================
// HELPER FUNCTIONS (compatibles con betterwarePlan.ts)
// ============================================================================

export function phaseProgress(plan: JafraPlan, phaseId: string): number {
  const acts = plan.activities.filter((a) => a.phaseId === phaseId);
  if (acts.length === 0) return 0;
  const total = acts.reduce((sum, a) => sum + a.progressPercent, 0);
  return Math.round(total / acts.length);
}

export function phaseStatus(
  plan: JafraPlan,
  phaseId: string,
): ActivityStatus {
  const acts = plan.activities.filter((a) => a.phaseId === phaseId);
  if (acts.length === 0) return "not-started";
  if (acts.every((a) => a.status === "done")) return "done";
  if (acts.some((a) => a.status === "blocked")) return "blocked";
  if (acts.some((a) => a.status === "in-progress" || a.status === "done"))
    return "in-progress";
  return "not-started";
}

export function globalProgress(plan: JafraPlan): number {
  if (plan.activities.length === 0) return 0;
  const total = plan.activities.reduce((sum, a) => sum + a.progressPercent, 0);
  return Math.round(total / plan.activities.length);
}

export function currentPhase(
  plan: JafraPlan,
  today: ISODate = new Date().toISOString().slice(0, 10),
): Phase | undefined {
  return (
    plan.phases.find((p) => today >= p.startDate && today <= p.endDate) ??
    plan.phases.find((p) => today < p.startDate)
  );
}

export function upcomingMilestones(
  plan: JafraPlan,
  from: ISODate = new Date().toISOString().slice(0, 10),
  limit = 3,
): Milestone[] {
  return plan.milestones
    .filter((m) => m.date >= from && m.status === "scheduled")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

export function overallHealth(plan: JafraPlan): HealthColor {
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
