// ============================================================================
// Paquete Express · Agente Agentforce — Plan Fase 2 (RAD) + mejoras en UAT
// ----------------------------------------------------------------------------
// Dos iniciativas en paralelo:
//   · Iniciativa 1 (en UAT sobre V14 Active): WhatsApp Voice Messages + STT
//     en el widget web, migración a Agent Script.
//   · Iniciativa 2 (este plan): Fase 2 — flujo RAD completo (Normal/RPP/WW)
//     en el bundle Draft FDE_Paquetexpress_Service_Agent_Split_voice_16,
//     convergencia con el Active y publicación.
//
// Fuente de verdad del Draft:
//   aiAuthoringBundles/FDE_Paquetexpress_Service_Agent_Split_voice_16.agent
//   retrievado del sandbox paquetexpress-sandbox (qa2020) el 2026-10-12.
//
// Fuente de verdad del diseño:
//   Files - Freeway/RAD - simulacion de pruebas por tipo - unificado.xlsx
//   (hojas DISEÑO - RAD, Normal, Prepago, WW, Datos de prueba).
//
// Autor: Jonathan Gomez (Salesforce FDE)
// ============================================================================

export type ISODate = string; // "YYYY-MM-DD"

export type OwnerTag =
  | "Salesforce - FDE"
  | "Salesforce - CSM"
  | "Salesforce - AE"
  | "Salesforce - Support"
  | "Partner"
  | "Paquetexpress - Sponsor"
  | "Paquetexpress - IT Lead"
  | "Paquetexpress - UAT"
  | "Paquetexpress - Operación"
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

export type PaquetexpressPlan = {
  slug: "paquetexpress";
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
    title: "Iniciativa 1 · UAT WhatsApp Voice + STT en widget web",
    shortLabel: "F0 · UAT voz",
    description:
      "Pruebas del cliente sobre el agente Active V14 (`Paquete_Express_vX`): mejoras de reconocimiento para audios de WhatsApp (Speech-to-Text) y dictado por voz en el widget web. Hotfixes al bundle Active según se van capturando bugs.",
    objective:
      "V14 Active estable con el soporte de audio de WhatsApp y voice en web validado por operación del cliente, listo para seguir recibiendo tráfico mientras avanza la Fase 2.",
    startDate: "2026-10-06",
    endDate: "2026-10-19",
    requires: [
      "Bundle Paquete_Express_vX_15 publicado como V14 Active",
      "Canal WhatsApp con media habilitado",
      "Widget web con dictado activo",
      "Equipo UAT del cliente disponible",
    ],
    outcome:
      "Reporte de UAT con bugs capturados, hotfixes aplicados sobre el V14 y sign-off operativo de la iniciativa 1.",
    gate:
      "Operación del cliente firma sign-off de UAT · se puede continuar enfocado en Fase 2 sin regresiones del V14.",
    color: "#A855F7",
  },
  {
    id: "f1",
    number: 1,
    title: "Convergencia Draft ↔ Active (Ola 0)",
    shortLabel: "F1 · Convergencia",
    description:
      "Portar al bundle Draft (`FDE_Paquetexpress_Service_Agent_Split_voice_16`) las mejoras validadas en UAT sobre el Active V14 — es cambio solo de YAML, no toca Apex. Pre-requisito antes de empezar a enganchar los Glp* reales.",
    objective:
      "Bundle Draft fusionado: incluye International_Quote_Management separado + verificación con teléfono + isExistingContact + escalamiento operativo directo + welcome/saludos actualizados, además de su subagente RAD_Management_voice.",
    startDate: "2026-10-13",
    endDate: "2026-10-19",
    requires: [
      "V14 Active publicado y estable (feature set a portar fijo)",
      "Bundle Draft FDE_Paquetexpress_Service_Agent_Split_voice_16 accesible",
      "Preview en Agent Builder habilitado para iteración",
    ],
    outcome:
      "Draft con todos los subagentes del Active + RAD_Management_voice. AiEvaluationDefinition pasando los smoke tests existentes del Active.",
    gate:
      "Preview corre sin regresiones vs. V14 en 20 escenarios base no-RAD.",
    color: "#066AFE",
  },
  {
    id: "f2",
    number: 2,
    title: "Reemplazar mocks por clases Glp* reales (Ola 1)",
    shortLabel: "F2 · Mocks→Glp*",
    description:
      "Migrar los 7 MOCK_GLP_* del subagente RAD a las 11 clases Glp* reales ya desplegadas en la org (GlpBuscarCliente, GlpConsultarGuia, GlpConsultarZona, GlpConsultarSucursalesOcurre, GlpConsultarFechas, GlpCotizar, GlpCrearRecoleccion, GlpCrearCliente, GlpHttpCliente, GlpCrearDireccionFiscal, GlpCalloutMock). Los contratos de entrada/salida ya son compatibles.",
    objective:
      "Draft con 100% de las acciones RAD contra GLP real. Smoke tests pasando con los datos de la hoja Datos de prueba.",
    startDate: "2026-10-20",
    endDate: "2026-10-26",
    requires: [
      "F1 cerrada",
      "Clases Glp* desplegadas en qa2020 (ya existen)",
      "Datos de prueba de la hoja validados: cliente 5619946, guías 13167470703 (RPP nueva) y 19168671204 (WW consultable)",
    ],
    outcome:
      "Draft invoca Glp* reales en los tres flujos (Normal / RPP / WW). 3 recolecciones agendadas en QA con trackingNumber real.",
    gate:
      "Operación valida los 3 escenarios Normal / RPP / WW en Preview con datos reales — tracking IDs quedan en la org.",
    color: "#00ACC8",
  },
  {
    id: "f3",
    number: 3,
    title: "Construir flujo WW completo (Ola 2)",
    shortLabel: "F3 · Flujo WW",
    description:
      "Hoy el subagente colapsa WW a escalación directa (solo da aviso 'no cajas de huevo' y transfiere). Implementar los pasos WW-003 → WW-010 del Excel: consulta a GlpConsultarGuia (SIPWEB), confirmación de datos y dirección, captura de contacto RAD, Flow autolanzado para Case en Salesforce y Email Alert a la sucursal RAD origen (requiere agregar campo Email al objeto Sucursal y poblar el listado).",
    objective:
      "Flujo WW end-to-end: Case creado + correo disparado + número de Case comunicado al cliente.",
    startDate: "2026-10-27",
    endDate: "2026-11-09",
    requires: [
      "F2 cerrada",
      "Listado de correos por sucursal RAD (pendiente del cliente)",
      "Flow autolanzado Create_case_RAD_WW diseñado y aprobado",
      "Email template RAD aprobado por operación",
    ],
    outcome:
      "Case + email generados automáticamente en QA. Test con guía 19168671204 cierra el flujo WW sin intervención humana.",
    gate:
      "Operación recibe el correo en una sucursal real de QA y valida el formato del Case.",
    color: "#E8275A",
  },
  {
    id: "f4",
    number: 4,
    title: "Hardening de gaps Altos/Medios (Ola 3)",
    shortLabel: "F4 · Hardening",
    description:
      "Cerrar los 7 hallazgos del audit no cubiertos por F2/F3: persistir estado parcial al escalar por valor > 50k, no auto-asignar clave SAT genérica, validar medidas en RPP vs. guía, agregar paso de cambio de facturación en Normal, verificar el correo de confirmación, cobro de seguro en Normal, Zona Plus en ambos CPs.",
    objective:
      "Draft con los 10 hallazgos del audit cerrados y Preview estable en 25+ escenarios.",
    startDate: "2026-11-10",
    endDate: "2026-11-16",
    requires: [
      "F3 cerrada",
      "Decisión del cliente sobre si GLP ya dispara el correo de confirmación o si hay que construirlo",
    ],
    outcome:
      "0 hallazgos abiertos. AiEvaluationDefinition cubriendo los 10 criterios como escenarios regresivos.",
    gate:
      "Code review interno + sign-off FDE sobre el Draft antes de UAT con cliente.",
    color: "#F28B42",
  },
  {
    id: "f5",
    number: 5,
    title: "UAT de RAD con cliente",
    shortLabel: "F5 · UAT RAD",
    description:
      "Correr los 3 escenarios Normal / Prepago / WW con operación del cliente en el sandbox, usando los datos de prueba de la hoja (claves, guías, rastreos QA). Capturar bugs y ajustes de UX.",
    objective:
      "Agente Draft validado por operación con los 3 flujos agendando recolecciones reales en GLP (QA).",
    startDate: "2026-11-17",
    endDate: "2026-11-23",
    requires: [
      "F4 cerrada",
      "Operación del cliente disponible la semana 17-21 nov",
      "Matriz de pruebas sembrada con los 22 escenarios base + los nuevos RAD",
    ],
    outcome:
      "Reporte de UAT RAD · sign-off de operación · hotfixes aplicados al Draft.",
    gate:
      "Operación firma UAT. Approval para publish a producción.",
    color: "#15803D",
  },
  {
    id: "f6",
    number: 6,
    title: "Publicar agente final V15/V16 Active",
    shortLabel: "F6 · Go-live",
    description:
      "Mergear Draft al bot principal, publicar BotVersion V15/V16 y activar. Comunicar cambios a operación y canales. Monitoreo intensivo primera semana.",
    objective:
      "Agente Active con los dos requerimientos entregados: mejoras de voice/STT + flujo RAD completo.",
    startDate: "2026-11-24",
    endDate: "2026-11-30",
    requires: [
      "F5 cerrada · sign-off UAT firmado",
      "Approval firmado por el Sponsor",
      "Feature flags por canal (si aplica)",
    ],
    outcome:
      "V15/V16 Active atendiendo tráfico de producción. Dashboards de KPIs activos.",
    gate:
      "Executive Review final · go/no-go de publish firmado por el Sponsor.",
    color: "#022AC0",
  },
];

// ============================================================================
// ACTIVITIES
// ============================================================================

const noUpdates: ActivityUpdate[] = [];
const noBlockers: Blocker[] = [];
const noRefs: Reference[] = [];

const ACTIVITIES: Activity[] = [
  // ---- F0 · Iniciativa 1 · UAT voz (en curso) ----
  {
    id: "a-f0-1",
    phaseId: "f0",
    number: "F0.1",
    title: "Publicar V14 Active con mejoras UAT",
    description:
      "Publicar bundle Paquete_Express_vX_15 (V14) con International_Quote_Management separado, verificación con teléfono, isExistingContact y escalamiento operativo directo. Habilitar en WhatsApp y web.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Paquetexpress - IT Lead"],
    delegableToPartner: true,
    type: "Deploy",
    week: 1,
    plannedStart: "2026-10-06",
    plannedEnd: "2026-10-07",
    actualStart: "2026-10-06",
    actualEnd: "2026-10-09",
    status: "done",
    progressPercent: 100,
    dependencies: [],
    deliverables: ["BotVersion V14 Active", "Bundle Paquete_Express_vX_15 publicado"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["uat", "voice", "deploy"],
  },
  {
    id: "a-f0-2",
    phaseId: "f0",
    number: "F0.2",
    title: "UAT de WhatsApp Voice Messages + STT en chat web",
    description:
      "Pruebas del cliente sobre el nuevo soporte de audios de WhatsApp (Speech-to-Text) y el widget web con dictado por voz. Capturar bugs de reconocimiento (números de guía, CPs, correos) y ajustes de copy.",
    owner: "Paquetexpress - UAT",
    collaborators: ["Salesforce - FDE", "Partner"],
    delegableToPartner: false,
    type: "Test",
    week: 2,
    plannedStart: "2026-10-06",
    plannedEnd: "2026-10-12",
    actualStart: "2026-10-06",
    status: "in-progress",
    progressPercent: 50,
    dependencies: ["a-f0-1"],
    deliverables: ["Reporte UAT · lista de hotfixes"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["uat", "voice"],
  },
  {
    id: "a-f0-3",
    phaseId: "f0",
    number: "F0.3",
    title: "Hotfixes de UAT + consolidación en V14.x",
    description:
      "Aplicar los ajustes identificados en el UAT. Publicar V14 patch si aplica. Preparar handoff a operación.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 3,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-19",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f0-2"],
    deliverables: ["Agente V14 estable · sign-off UAT"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["uat", "voice"],
  },
  // ---- F1 · Convergencia ----
  {
    id: "a-f1-1",
    phaseId: "f1",
    number: "F1.1",
    title: "Portar separación International_Quote_Management al Draft",
    description:
      "En el Draft, el Quote_Management maneja Domestic + International en un mismo subagente. Replicar la separación del Active V14 creando el subagente dedicado International_Quote_Management que solo pide el país y crea el caso.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 3,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-15",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f0-1"],
    deliverables: ["Subagente International_Quote_Management en Draft"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["draft", "quote", "convergencia"],
  },
  {
    id: "a-f1-2",
    phaseId: "f1",
    number: "F1.2",
    title: "Portar teléfono + isExistingContact a Customer_Verification",
    description:
      "Agregar customerPhone + capture_phone + input Phone en AG_Get_and_create_contact. En WhatsApp pre-poblar con WhatsAppPhone; en web/voice pedirlo. isExistingContact para saludar diferente a clientes recurrentes.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Paquetexpress - IT Lead"],
    delegableToPartner: true,
    type: "Dev",
    week: 3,
    plannedStart: "2026-10-15",
    plannedEnd: "2026-10-17",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f1-1"],
    deliverables: ["Verification con teléfono + saludo diferenciado en Draft"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["draft", "verification", "convergencia"],
  },
  {
    id: "a-f1-3",
    phaseId: "f1",
    number: "F1.3",
    title: "Portar escalamiento operativo directo + copy actualizados",
    description:
      "Agregar al Escalation_v2 del Draft el trigger explícito para intents operativos (cambio de dirección, instalación, reprogramar). Transferir sin pedir confirmación adicional. Actualizar copy de welcome y saludos.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 3,
    plannedStart: "2026-10-17",
    plannedEnd: "2026-10-19",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f1-2"],
    deliverables: ["Escalation operativa + copy sincronizado en Draft"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["draft", "escalation", "convergencia"],
  },
  // ---- F2 · Mocks → Glp* reales ----
  {
    id: "a-f2-1",
    phaseId: "f2",
    number: "F2.1",
    title: "Swap MOCK_GLP_BuscarCliente → GlpBuscarCliente",
    description:
      "Reemplazar en el subagente RAD_Management_voice. Validar en Preview con cliente 5619946 (dirección HIDALGO 10 Juárez · sucursal MEX14 · colonia 25655).",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-21",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f1-3"],
    deliverables: ["RAD Normal invoca GlpBuscarCliente real"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "glp", "mock-swap"],
  },
  {
    id: "a-f2-2",
    phaseId: "f2",
    number: "F2.2",
    title: "Swap MOCK_GLP_BuscarGuia → GlpConsultarGuia",
    description:
      "Usar en RPP y WW. GlpConsultarGuia devuelve servicio, origen, medidas, tarifa, peso, CP + flag found. Validar con guía RPP 13167470703 (nueva) y guía WW 19168671204 (consultable).",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-21",
    plannedEnd: "2026-10-22",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f1-3"],
    deliverables: ["RAD RPP y WW invocan GlpConsultarGuia real"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "glp", "mock-swap"],
  },
  {
    id: "a-f2-3",
    phaseId: "f2",
    number: "F2.3",
    title: "Swap Zona Plus/Fronteriza + Sucursales Ocurre",
    description:
      "MOCK_GLP_ConsultarSucursalFronteriza → GlpConsultarZona (cubre plus + fronteriza en un solo call). MOCK_GLP_SucursalesDisponibles → GlpConsultarSucursalesOcurre. Gate temprano si isZonePlus en origen o destino.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-22",
    plannedEnd: "2026-10-23",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f2-1", "a-f2-2"],
    deliverables: ["Normal con zona + sucursales reales"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "glp", "mock-swap"],
  },
  {
    id: "a-f2-4",
    phaseId: "f2",
    number: "F2.4",
    title: "Swap Dates + RadCreate · 3 escenarios end-to-end",
    description:
      "MOCK_GLP_DatesToCollection → GlpConsultarFechas. MOCK_GLP_RadCreate → GlpCrearRecoleccion (docType=G Normal, P RPP). Correr los 3 escenarios Normal (cliente 5619946), RPP (guía 13167470703) y WW (guía 19168671204) end-to-end en QA. Validar trackingNumbers reales.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Paquetexpress - UAT"],
    delegableToPartner: true,
    type: "Test",
    week: 4,
    plannedStart: "2026-10-23",
    plannedEnd: "2026-10-26",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f2-3"],
    deliverables: ["3 recolecciones agendadas en QA con trackingNumber real"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "glp", "e2e"],
  },
  // ---- F3 · WW ----
  {
    id: "a-f3-1",
    phaseId: "f3",
    number: "F3.1",
    title: "Diseñar Flow autolanzado Create_case_RAD_WW",
    description:
      "Inputs: número de guía, dirección confirmada, nombre contacto, teléfono, ventana horaria. Output: caseNumber. Record type del Case definido con operación.",
    owner: "Salesforce - FDE",
    collaborators: ["Paquetexpress - IT Lead", "Paquetexpress - Operación"],
    delegableToPartner: false,
    type: "Config",
    week: 5,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-10-30",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f2-4"],
    deliverables: ["Flow Create_case_RAD_WW desplegado en QA"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "ww", "flow"],
  },
  {
    id: "a-f3-2",
    phaseId: "f3",
    number: "F3.2",
    title: "Agregar campo Email a Sucursal + poblar correos",
    description:
      "Nuevo campo Email (tipo email) en el objeto Sucursal. Poblar los registros con el listado de correos de operación por sucursal RAD (pendiente del cliente).",
    owner: "Paquetexpress - IT Lead",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: false,
    type: "Config",
    week: 5,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-10-31",
    status: "not-started",
    progressPercent: 0,
    dependencies: [],
    deliverables: ["Objeto Sucursal con Email + registros poblados"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "ww", "data"],
  },
  {
    id: "a-f3-3",
    phaseId: "f3",
    number: "F3.3",
    title: "Email Alert + plantilla WW a sucursal RAD",
    description:
      "Construir Email Alert disparado por Create_case_RAD_WW. Plantilla con guía, dirección, contacto y ventana. Enviar al Email de la Sucursal RAD origen.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Paquetexpress - Operación"],
    delegableToPartner: true,
    type: "Config",
    week: 6,
    plannedStart: "2026-11-02",
    plannedEnd: "2026-11-05",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f3-1", "a-f3-2"],
    deliverables: ["Email a sucursal + Case con número comunicado al cliente"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "ww", "email"],
  },
  {
    id: "a-f3-4",
    phaseId: "f3",
    number: "F3.4",
    title: "Integrar flujo WW en RAD_Management_voice",
    description:
      "Reemplazar en el subagente la rama 'if radType == WW' actual (que solo escala) por la implementación completa: GlpConsultarGuia + confirmaciones WW-004/WW-005 + capture_rad_ww_contact + llamada al Flow + comunicar caseNumber.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 6,
    plannedStart: "2026-11-05",
    plannedEnd: "2026-11-09",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f3-3"],
    deliverables: ["Flujo WW end-to-end funcionando en Preview"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "ww"],
  },
  // ---- F4 · Hardening ----
  {
    id: "a-f4-1",
    phaseId: "f4",
    number: "F4.1",
    title: "Persistir estado parcial al escalar por valor declarado > 50k",
    description:
      "Antes del transfer en el bloque radDeclaredValue > 50000, crear Case con resumen de los datos ya capturados (cliente, direcciones, paquetes, pago, valor declarado) para que el asesor retome sin re-preguntar.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 7,
    plannedStart: "2026-11-10",
    plannedEnd: "2026-11-11",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f3-4"],
    deliverables: ["Case con briefing creado antes del transfer"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "hardening"],
  },
  {
    id: "a-f4-2",
    phaseId: "f4",
    number: "F4.2",
    title: "No auto-asignar clave SAT genérica + validar medidas en RPP",
    description:
      "Dejar radSatKey en vacío cuando el cliente no la tiene (GLP la asigna por contenido). En RPP, después de confirmar la guía, pedir embalaje/contenido/peso/medidas y comparar con las que trae la guía — si no coinciden, transferir (PP-020/PP-021 del Excel).",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 7,
    plannedStart: "2026-11-11",
    plannedEnd: "2026-11-13",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f3-4"],
    deliverables: ["Clave SAT condicional + validación medidas RPP"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "hardening"],
  },
  {
    id: "a-f4-3",
    phaseId: "f4",
    number: "F4.3",
    title: "Cambio de facturación en Normal + cobro de seguro",
    description:
      "NO-030/NO-031 del Excel: '¿Desea modificar la información de facturación?' Si Yes → Case + escalar. Para la cobertura, pasar `Tipo de cobertura` y `Valor declarado` a GlpCotizar en Normal para que calcule el cargo del seguro.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 7,
    plannedStart: "2026-11-13",
    plannedEnd: "2026-11-16",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f4-2"],
    deliverables: ["Normal con facturación opcional + cargo de seguro"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "hardening"],
  },
  // ---- F5 · UAT RAD ----
  {
    id: "a-f5-1",
    phaseId: "f5",
    number: "F5.1",
    title: "Preparar matriz de pruebas RAD",
    description:
      "Sembrar los test cases de los 3 flujos Normal / Prepago / WW en la matriz del portal (tab Pruebas) con las precondiciones y datos de prueba de la hoja Datos de prueba del Excel.",
    owner: "Salesforce - FDE",
    collaborators: ["Paquetexpress - UAT"],
    delegableToPartner: false,
    type: "Doc",
    week: 8,
    plannedStart: "2026-11-17",
    plannedEnd: "2026-11-18",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f4-3"],
    deliverables: ["Test matrix sembrada con escenarios RAD"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["uat", "test-matrix"],
  },
  {
    id: "a-f5-2",
    phaseId: "f5",
    number: "F5.2",
    title: "UAT RAD con operación del cliente",
    description:
      "Correr los 3 escenarios Normal / Prepago / WW con datos reales. Registrar ejecuciones en la matriz del portal. Capturar bugs y ajustes UX.",
    owner: "Paquetexpress - UAT",
    collaborators: ["Salesforce - FDE", "Partner"],
    delegableToPartner: false,
    type: "Test",
    week: 8,
    plannedStart: "2026-11-18",
    plannedEnd: "2026-11-21",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f5-1"],
    deliverables: ["Reporte UAT RAD · issues clasificados · sign-off operación"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["uat", "rad"],
  },
  {
    id: "a-f5-3",
    phaseId: "f5",
    number: "F5.3",
    title: "Aplicar hotfixes y confirmar sign-off",
    description:
      "Resolver los issues del UAT, re-correr los test cases afectados y obtener sign-off formal.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 8,
    plannedStart: "2026-11-21",
    plannedEnd: "2026-11-23",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f5-2"],
    deliverables: ["Draft listo para publish · UAT sign-off firmado"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["uat", "hotfix"],
  },
  // ---- F6 · Go-live ----
  {
    id: "a-f6-1",
    phaseId: "f6",
    number: "F6.1",
    title: "Mergear Draft al bot principal + publish BotVersion",
    description:
      "Fusionar el Draft (con RAD + Olas 0-3 cerradas) sobre el bot `Paquete_Express_vX`. Correr `sf agent publish` y promover BotVersion a Active.",
    owner: "Salesforce - FDE",
    collaborators: ["Paquetexpress - IT Lead"],
    delegableToPartner: false,
    type: "Deploy",
    week: 9,
    plannedStart: "2026-11-24",
    plannedEnd: "2026-11-26",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f5-3"],
    deliverables: ["BotVersion V15/V16 Active"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["deploy", "go-live"],
  },
  {
    id: "a-f6-2",
    phaseId: "f6",
    number: "F6.2",
    title: "Monitoreo intensivo primera semana",
    description:
      "Dashboards de KPIs activos, revisión diaria de transcripts, standup diario con operación. Rollback plan preparado si aparece regresión.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Paquetexpress - Operación"],
    delegableToPartner: true,
    type: "Ops",
    week: 9,
    plannedStart: "2026-11-26",
    plannedEnd: "2026-11-30",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f6-1"],
    deliverables: ["Reporte semana 1 post-go-live con KPIs"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["ops", "monitoring"],
  },
];

// ============================================================================
// MILESTONES
// ============================================================================

const MILESTONES: Milestone[] = [
  {
    id: "ms-uat-kickoff",
    title: "Kick-off UAT voice",
    description: "Arranque de UAT del Active V14 con WhatsApp Voice + STT.",
    date: "2026-10-06",
    kind: "Kick-off",
    phaseId: "f0",
    participants: ["Salesforce - FDE", "Partner", "Paquetexpress - UAT"],
    status: "completed",
    outcome: "V14 publicado · UAT en curso",
    references: noRefs,
  },
  {
    id: "ms-uat-signoff",
    title: "Sign-off UAT voice",
    description: "Operación firma UAT de WhatsApp Voice + STT.",
    date: "2026-10-19",
    kind: "UAT Session",
    phaseId: "f0",
    participants: ["Salesforce - FDE", "Paquetexpress - UAT", "Paquetexpress - Sponsor"],
    status: "scheduled",
    references: noRefs,
  },
  {
    id: "ms-rad-kickoff",
    title: "Kick-off Fase 2 · RAD",
    description: "Arranque formal de la Fase 2 (RAD). Alineación del plan por olas.",
    date: "2026-10-13",
    kind: "Kick-off",
    phaseId: "f1",
    participants: ["Salesforce - FDE", "Partner", "Paquetexpress - IT Lead", "Paquetexpress - Sponsor"],
    status: "scheduled",
    references: noRefs,
  },
  {
    id: "ms-rev-f2",
    title: "Review F2 · mocks → Glp* reales",
    description: "Revisión conjunta con operación de los 3 escenarios RAD agendando recolecciones reales en QA.",
    date: "2026-10-26",
    kind: "Internal Review",
    phaseId: "f2",
    participants: ["Salesforce - FDE", "Partner", "Paquetexpress - UAT"],
    status: "scheduled",
    references: noRefs,
  },
  {
    id: "ms-rev-f3",
    title: "Review F3 · flujo WW",
    description: "Operación recibe el email en una sucursal real y valida el formato del Case.",
    date: "2026-11-09",
    kind: "Internal Review",
    phaseId: "f3",
    participants: ["Salesforce - FDE", "Paquetexpress - Operación"],
    status: "scheduled",
    references: noRefs,
  },
  {
    id: "ms-exec-f4",
    title: "Executive Review F4 · hardening cerrado",
    description: "Code review interno + sign-off FDE antes de UAT con cliente.",
    date: "2026-11-16",
    kind: "Executive Review",
    phaseId: "f4",
    participants: ["Salesforce - FDE", "Salesforce - CSM"],
    status: "scheduled",
    references: noRefs,
  },
  {
    id: "ms-uat-rad",
    title: "UAT RAD con operación",
    description: "Correr los 3 escenarios con operación del cliente. Firma sign-off.",
    date: "2026-11-21",
    kind: "UAT Session",
    phaseId: "f5",
    participants: ["Paquetexpress - UAT", "Salesforce - FDE", "Partner"],
    status: "scheduled",
    references: noRefs,
  },
  {
    id: "ms-golive",
    title: "Go-live V15/V16",
    description: "Publicar agente final con RAD + mejoras UAT. Activar en producción.",
    date: "2026-11-26",
    kind: "Go-live",
    phaseId: "f6",
    participants: ["Salesforce - FDE", "Paquetexpress - Sponsor", "Paquetexpress - IT Lead"],
    status: "scheduled",
    references: noRefs,
  },
];

// ============================================================================
// RISKS  (= hallazgos del audit del Draft)
// ============================================================================

const RISKS: Risk[] = [
  {
    id: "r-c1",
    title: "C-1 · Flujo RAD usa mocks, no GLP real",
    description:
      "El subagente RAD_Management_voice del Draft invoca 7 MOCK_GLP_*. En paralelo existen las 11 clases Glp* reales con last modified entre 22-sep y 06-oct 2026. Un publish hoy no agenda recolecciones reales en GLP.",
    probability: "High",
    impact: "High",
    mitigation: "Ola 1 del plan (F2): swap de MOCK_GLP_* → Glp* real. Contratos de I/O ya son compatibles; es cambio de target.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f2",
    references: noRefs,
  },
  {
    id: "r-c2",
    title: "C-2 · Flujo WW colapsado a escalación directa",
    description:
      "El bloque `if radType == 'WW'` solo da aviso 'no cajas de huevo' y transfiere. Faltan WW-003 a WW-010 del Excel: consultar guía, confirmar, capturar contacto, crear Case y disparar email.",
    probability: "High",
    impact: "High",
    mitigation: "Ola 2 del plan (F3): construir Flow autolanzado + Email Alert + integrar en el subagente.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f3",
    references: noRefs,
  },
  {
    id: "r-c3",
    title: "C-3 · Divergencia Draft ↔ Active (features UAT no están en Draft)",
    description:
      "El V14 Active tiene mejoras post-UAT que NO están en el Draft: International_Quote_Management separado, verificación con teléfono, isExistingContact, escalación operativa directa, copy actualizado. Si se publica el Draft tal cual, se pierden.",
    probability: "High",
    impact: "High",
    mitigation: "Ola 0 del plan (F1): portar los 5 cambios del Active al Draft antes de empezar F2.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f1",
    references: noRefs,
  },
  {
    id: "r-a1",
    title: "A-1 · Perder estado capturado al escalar por valor declarado > 50k",
    description:
      "Después de ~20 turnos capturando datos, al pasar el tope el flujo transfiere sin crear Case con el briefing. El asesor empieza de cero.",
    probability: "Medium",
    impact: "Medium",
    mitigation: "F4.1: crear Case con resumen antes del transfer.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f4",
    references: noRefs,
  },
  {
    id: "r-a2",
    title: "A-2 · Clave SAT auto-asignada a '01010101' sin aviso",
    description:
      "El Excel NO-013 dice literal: 'Si no la tiene, no inventes una: se omite y GLP la asigna con el contenido.' El Draft hoy guarda '01010101' por default.",
    probability: "Medium",
    impact: "Low",
    mitigation: "F4.2: dejar radSatKey vacío cuando no la tiene y no mandarla a GlpCrearRecoleccion.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f4",
    references: noRefs,
  },
  {
    id: "r-a3",
    title: "A-3 · RPP no valida medidas del cliente vs. las de la guía",
    description:
      "El Excel PP-020/PP-021 pide comparar peso/largo/ancho/alto del cliente vs. los de la guía y transferir si no coinciden. El Draft hoy salta directo a elegir fecha.",
    probability: "Medium",
    impact: "Medium",
    mitigation: "F4.2: después de confirmar guía, pedir medidas y validar.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f4",
    references: noRefs,
  },
  {
    id: "r-a4",
    title: "A-4 · Normal no permite cambio de facturación (NO-030/NO-031)",
    description:
      "Falta el paso de preguntar '¿Desea modificar la información de facturación?' con transferencia a asesor si Yes.",
    probability: "Medium",
    impact: "Low",
    mitigation: "F4.3: agregar paso entre pago y valor declarado.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f4",
    references: noRefs,
  },
  {
    id: "r-m1",
    title: "M-1 · Prometer correo de confirmación sin verificar",
    description:
      "Agente dice 'recibirá un correo electrónico con la confirmación' pero no hay evidencia en la org de un Email Alert conectado al agendamiento.",
    probability: "Medium",
    impact: "Medium",
    mitigation: "F4.3: confirmar con operación si GLP ya lo dispara. Si no, construir Email Alert o eliminar la mención.",
    owner: "Paquetexpress - Operación",
    status: "active",
    phaseId: "f4",
    references: noRefs,
  },
  {
    id: "r-m2",
    title: "M-2 · Normal no calcula el cobro del seguro",
    description:
      "capture_coverage pregunta si contrata cobertura pero el valor del seguro no se refleja en el total. GlpCotizar debe recibir Tipo de cobertura y Valor declarado para calcular el cargo.",
    probability: "Medium",
    impact: "Medium",
    mitigation: "F4.3: pasar los campos a GlpCotizar y reflejar en el total.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f4",
    references: noRefs,
  },
  {
    id: "r-m3",
    title: "M-3 · Zona Plus solo se consulta en origen, no en destino",
    description:
      "El Excel NO-009 y NO-026 piden consultar GlpConsultarZona para origen y destino con corte si Zona Plus. El Draft solo chequea el origen.",
    probability: "Medium",
    impact: "Low",
    mitigation: "F2.3: consultar GlpConsultarZona para ambos CPs y gate temprano si plus.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f2",
    references: noRefs,
  },
];

// ============================================================================
// STABLE CRITERIA
// ============================================================================

const STABLE_CRITERIA: StableCriterion[] = [
  {
    id: "sc-prod-1",
    dimension: "Producto",
    criterion: "Los 3 flujos RAD (Normal / RPP / WW) agendan recolecciones reales en GLP con trackingNumber comunicado al cliente.",
    status: "pending",
    references: noRefs,
  },
  {
    id: "sc-prod-2",
    dimension: "Producto",
    criterion: "El flujo WW cierra con número de Case en Salesforce y correo enviado a la sucursal RAD origen.",
    status: "pending",
    references: noRefs,
  },
  {
    id: "sc-seg-1",
    dimension: "Seguridad",
    criterion: "Toda recolección pasa por el gate PAM (contenido + aceptación explícita) antes de ejecutar cualquier acción GLP.",
    status: "in-progress",
    evidence: "Gate ya implementado en el intake común del subagente.",
    references: noRefs,
  },
  {
    id: "sc-ops-1",
    dimension: "Operación",
    criterion: "Clientes con valor declarado > 50,000 MXN se transfieren con briefing (Case) para que el asesor no re-pregunte.",
    status: "pending",
    references: noRefs,
  },
  {
    id: "sc-mant-1",
    dimension: "Mantenibilidad",
    criterion: "0 MOCK_GLP_* en el bundle Draft a go-live. Todas las acciones apuntan a las clases Glp* reales.",
    status: "pending",
    references: noRefs,
  },
  {
    id: "sc-obs-1",
    dimension: "Observabilidad",
    criterion: "Dashboards por tipo de recolección (Normal / RPP / WW) + tiempos de agendamiento + tasa de escalación con breakdown.",
    status: "pending",
    references: noRefs,
  },
];

// ============================================================================
// EXPORT
// ============================================================================

export const paquetexpressPlan: PaquetexpressPlan = {
  slug: "paquetexpress",
  projectName: "Paquete Express · Agente Agentforce — Fase 2 (RAD) + mejoras en UAT",
  kickoffDate: "2026-10-06",
  endDate: "2026-11-30",
  phases: PHASES,
  activities: ACTIVITIES,
  milestones: MILESTONES,
  risks: RISKS,
  stableCriteria: STABLE_CRITERIA,
  statusUpdates: [
    {
      id: "upd-2026-10-12",
      weekOf: "2026-10-12",
      author: "Salesforce - FDE",
      overallHealth: "yellow",
      phaseId: "f0",
      highlights: [
        "V14 Active en producción con mejoras UAT (voice + STT) · UAT en curso con operación",
        "Bundle Draft FDE_Paquetexpress_Service_Agent_Split_voice_16 identificado como base de Fase 2 — incluye RAD_Management_voice con los 3 flujos del Excel (Normal end-to-end, RPP con mocks, WW colapsado)",
        "11 clases Glp* reales ya desplegadas en la org (GlpBuscarCliente, GlpConsultarGuia, GlpConsultarZona, GlpConsultarSucursalesOcurre, GlpConsultarFechas, GlpCotizar, GlpCrearRecoleccion, GlpCrearCliente, GlpCrearDireccionFiscal, GlpHttpCliente, GlpCalloutMock)",
        "Audit del Draft: 10 hallazgos (3 Críticos, 4 Altos, 3 Medios) con plan por 4 olas",
      ],
      nextWeek: [
        "Cerrar hotfixes del UAT voice (F0.3)",
        "Arrancar Fase 2 · Convergencia Draft ↔ Active (F1.1, F1.2, F1.3)",
        "Confirmar listado de correos por sucursal RAD con operación (dependencia para F3.2)",
      ],
      activeBlockers: [],
      activeRisks: ["r-c1", "r-c2", "r-c3"],
      references: noRefs,
    },
  ],
};
