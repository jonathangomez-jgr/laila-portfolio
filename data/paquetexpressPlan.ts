// ============================================================================
// Paquete Express · Agente Agentforce V12 — Plan Fase 2 (RAD)
// ----------------------------------------------------------------------------
// Agente objetivo: Paquete_Express_vX V12 Draft (BotDefinition 0Xxdh0000005iq1CAA ·
// bundle Paquete_Express_vX_12).
//
// Estado actual (12-oct-2026):
//   · El agente V12 YA tiene el subagente RAD_Management (3 flujos: Normal,
//     Prepago/RPP, WW) completamente enganchado a las 9 clases Apex Glp*
//     reales desplegadas en la org — NO quedan referencias a MOCK_GLP_*.
//   · Las mejoras de UAT ya están portadas (teléfono en Verification,
//     International_Quote_Management separado, isExistingContact,
//     escalamiento operativo directo).
//   · Lo que queda es cerrar configuraciones finales de RAD (copy, instrucciones,
//     edge cases, cierres) y pasar al ciclo de pruebas interno → Partner → UAT
//     con el cliente → publish a producción.
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
    title: "Build V12 · integración RAD + Glp* reales (DONE)",
    shortLabel: "F0 · Build V12",
    description:
      "Construcción del bundle Paquete_Express_vX_12: fusión de las mejoras de UAT del Active V14 (International_Quote_Management separado, teléfono en Verification, isExistingContact, escalamiento operativo directo) con el flujo RAD completo (Normal / RPP / WW) enganchado a las 9 clases Apex Glp* reales ya desplegadas en la org. Reemplaza por completo el bundle paralelo con mocks.",
    objective:
      "Agente V12 Draft funcional en Preview con los 12 subagentes operando contra GLP real.",
    startDate: "2026-09-25",
    endDate: "2026-10-11",
    requires: [
      "9 clases Apex Glp* desplegadas en qa2020 (confirmado 2026-10-09)",
      "Flow AG_Get_and_create_contact con input Phone (confirmado)",
      "Mejoras de V14 Active aplicables al Draft",
    ],
    outcome:
      "Bundle Paquete_Express_vX_12 (4,897 líneas) con 12 subagentes y 0 mocks. RAD_Management invocando GlpBuscarCliente, GlpCrearCliente, GlpConsultarGuia, GlpConsultarZona, GlpConsultarSucursalesOcurre, GlpCotizar, GlpConsultarFechas, GlpCrearRecoleccion, GlpCrearDireccionFiscal.",
    gate: "Bundle compila sin errores, 0 mocks en el .agent, Preview arranca.",
    color: "#15803D",
  },
  {
    id: "f1",
    number: 1,
    title: "Cerrar configuraciones finales de RAD",
    shortLabel: "F1 · Config final RAD",
    description:
      "Afinar las configuraciones restantes del flujo RAD en el V12 antes de abrir pruebas internas: copy / tono por tipo, instrucciones del cierre (resumen + '¿agendar otra?'), normalización de edge cases (correo con tipeo fonético, nombre completo en un turno, cambio de intent), gating consistente para Zona Plus en origen y destino, y el ladder de repair cuando el readback de guía falla.",
    objective:
      "Agente V12 listo para pruebas internas sin bugs conocidos de configuración o copy.",
    startDate: "2026-10-13",
    endDate: "2026-10-17",
    requires: [
      "F0 cerrada",
      "Checklist de configuración RAD (copy + edge cases) revisado por FDE",
    ],
    outcome:
      "Bundle con configuraciones RAD cerradas · changelog interno con los deltas vs. V11 · 25+ edge cases cubiertos en instrucciones.",
    gate: "FDE firma internamente antes de pruebas conjuntas.",
    color: "#066AFE",
  },
  {
    id: "f2",
    number: 2,
    title: "Pruebas internas · Salesforce FDE",
    shortLabel: "F2 · Pruebas internas",
    description:
      "Ejecutar los 47 escenarios de la matriz de pruebas internamente (Salesforce FDE) sobre el bundle V12. Reproducir los 3 flujos del Excel con los datos de prueba (cliente 5619946, guías 13167470703 y 19168671204, CPs 06600/80000, PAID+N y TO_PAY+C, >50k, Zona Plus, prompt injection, etc.). Levantar bugs y corregir in-situ. Documentar comportamiento real vs. esperado.",
    objective:
      "Pasar ≥90% de los 47 escenarios internamente antes de entregar al Partner.",
    startDate: "2026-10-20",
    endDate: "2026-10-24",
    requires: [
      "F1 cerrada",
      "47 test cases ya sembrados en la matriz del portal",
      "Datos de prueba disponibles en qa2020 (clientes y guías listadas)",
    ],
    outcome:
      "Reporte interno de ejecución: 47/47 escenarios registrados con status (OK / defect / bloqueado). Bugs priorizados y resueltos. Trazas de ≥3 recolecciones reales creadas en GLP (Normal + RPP + WW).",
    gate: "≥90% de escenarios en OK. Bugs críticos cerrados.",
    color: "#00ACC8",
  },
  {
    id: "f3",
    number: 3,
    title: "Pruebas conjuntas con Partner",
    shortLabel: "F3 · Pruebas Partner",
    description:
      "Sesión de pruebas conjuntas con el Partner. El Partner valida que el agente responde conforme al diseño, revisa el impacto de la Fase 2 sobre lo que ya corría en UAT (voice + STT), prueba edge cases desde su perspectiva operativa y firma handoff a UAT cliente.",
    objective:
      "Alineación completa con Partner · 0 bugs críticos abiertos · agente listo para UAT con operación del cliente.",
    startDate: "2026-10-27",
    endDate: "2026-10-31",
    requires: [
      "F2 cerrada con ≥90% OK",
      "Partner disponible 27-31 oct",
      "Agenda de sesión + checklist de pruebas Partner",
    ],
    outcome:
      "Reporte de pruebas Partner · observaciones aplicadas al Draft · firma de handoff a UAT.",
    gate: "Partner firma handoff. 0 bugs críticos abiertos.",
    color: "#A855F7",
  },
  {
    id: "f4",
    number: 4,
    title: "UAT con cliente · operación Paquetexpress",
    shortLabel: "F4 · UAT cliente",
    description:
      "UAT formal con operación de Paquetexpress sobre los 3 flujos RAD + regresión completa del resto de subagentes. Ejecutar los 47 escenarios documentados + los que operación proponga. Capturar bugs, cambios de UX y requerimientos adicionales.",
    objective:
      "Operación valida el V12 en los 3 flujos RAD con datos reales y firma sign-off para publish a producción.",
    startDate: "2026-11-03",
    endDate: "2026-11-07",
    requires: [
      "F3 cerrada con handoff del Partner",
      "Equipo UAT de Paquetexpress disponible",
      "Guías de prueba RPP no agendadas disponibles",
      "Rollback plan documentado",
    ],
    outcome:
      "Reporte UAT · sign-off formal de operación · hotfixes aplicados al Draft tras el UAT.",
    gate: "Sign-off UAT firmado · Approval publish por el Sponsor.",
    color: "#F28B42",
  },
  {
    id: "f5",
    number: 5,
    title: "Publicar V12 a producción · V15 Active",
    shortLabel: "F5 · Go-live",
    description:
      "Publicar bundle V12 como BotVersion V15 Active sobre `Paquete_Express_vX`. Comunicar cambios a operación y canales. Monitoreo intensivo primera semana (daily standup, revisión de transcripts, dashboards). Rollback plan preparado.",
    objective:
      "Agente V15 Active atendiendo tráfico de producción con RAD completo + mejoras voice/STT.",
    startDate: "2026-11-10",
    endDate: "2026-11-14",
    requires: [
      "F4 cerrada con sign-off operación",
      "Approval firmado por el Sponsor",
      "Dashboards de KPIs listos",
      "Comunicación al equipo de atención preparada",
    ],
    outcome:
      "BotVersion V15 Active · tráfico 100% sobre el nuevo agente · dashboards de KPIs en vivo.",
    gate: "Monitoreo primera semana sin regresión significativa · Executive Review de cierre.",
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
  // ---- F0 · Build V12 (DONE) ----
  {
    id: "a-f0-1",
    phaseId: "f0",
    number: "F0.1",
    title: "Portar mejoras del V14 Active al Draft V12",
    description:
      "Separar International_Quote_Management en subagente dedicado. Agregar teléfono + isExistingContact a Customer_Verification. Trigger de escalamiento operativo directo en Escalation_v2. Copy actualizado (welcome + saludos de retorno).",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 1,
    plannedStart: "2026-09-25",
    plannedEnd: "2026-10-02",
    actualStart: "2026-09-25",
    actualEnd: "2026-10-02",
    status: "done",
    progressPercent: 100,
    dependencies: [],
    deliverables: ["Draft V12 con las 5 mejoras portadas"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["build", "convergencia"],
  },
  {
    id: "a-f0-2",
    phaseId: "f0",
    number: "F0.2",
    title: "Construir subagente RAD_Management",
    description:
      "Implementar el intake común (GE-001/GE-002/GE-003 — PAM + aceptación + tipo) y las 3 ramas (Normal / RPP / WW) según el diseño del Excel. Variables de estado, acciones de captura y gates por fase del flujo.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 2,
    plannedStart: "2026-09-29",
    plannedEnd: "2026-10-08",
    actualStart: "2026-09-29",
    actualEnd: "2026-10-08",
    status: "done",
    progressPercent: 100,
    dependencies: ["a-f0-1"],
    deliverables: ["Subagente RAD_Management con 3 flujos"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "build"],
  },
  {
    id: "a-f0-3",
    phaseId: "f0",
    number: "F0.3",
    title: "Enganchar las 9 clases Apex Glp* reales",
    description:
      "Mapear cada acción del flujo RAD a su clase Apex real: GlpBuscarCliente, GlpCrearCliente, GlpConsultarGuia, GlpConsultarZona, GlpConsultarSucursalesOcurre, GlpCotizar, GlpConsultarFechas, GlpCrearRecoleccion, GlpCrearDireccionFiscal. 0 mocks en el bundle final.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Paquetexpress - IT Lead"],
    delegableToPartner: true,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-02",
    plannedEnd: "2026-10-11",
    actualStart: "2026-10-02",
    actualEnd: "2026-10-11",
    status: "done",
    progressPercent: 100,
    dependencies: ["a-f0-2"],
    deliverables: ["9/9 Glp* enganchadas · 0 MOCK_GLP_* en bundle"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "glp", "integración"],
  },
  // ---- F1 · Config final (EN CURSO) ----
  {
    id: "a-f1-1",
    phaseId: "f1",
    number: "F1.1",
    title: "Afinar copy y tono por tipo de recolección",
    description:
      "Revisar frase-por-frase los textos del subagente RAD en los 3 tipos. Alinear estilo con el system prompt (voice-first, usted formal, sin siglas). Validar readback de guías y teléfonos.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Doc",
    week: 3,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-14",
    status: "in-progress",
    progressPercent: 60,
    dependencies: ["a-f0-3"],
    deliverables: ["Copy RAD alineado al system prompt"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["copy", "rad"],
  },
  {
    id: "a-f1-2",
    phaseId: "f1",
    number: "F1.2",
    title: "Gate consistente de Zona Plus en origen y destino",
    description:
      "Confirmar que `GlpConsultarZona` se invoca para los dos CPs (NO-009 origen y NO-026 destino del Excel) y que la rama de corte isZonePlus escala con el Mensaje GLP correspondiente. Reusar la respuesta de origen si ya se consultó.",
    owner: "Salesforce - FDE",
    collaborators: [],
    delegableToPartner: false,
    type: "Config",
    week: 3,
    plannedStart: "2026-10-14",
    plannedEnd: "2026-10-15",
    status: "in-progress",
    progressPercent: 40,
    dependencies: ["a-f0-3"],
    deliverables: ["Zona Plus gate en ambos CPs · tests de corte en los dos lados"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "zona"],
  },
  {
    id: "a-f1-3",
    phaseId: "f1",
    number: "F1.3",
    title: "Validar guardia de valor declarado > 50k",
    description:
      "Verificar que `if radDeclaredValue > 50000` corta antes de llamar `GlpCrearRecoleccion` y transfiere a Escalation_v2 con el texto del Mensaje GLP. Confirmar que persiste un Case con el briefing antes del transfer para que el asesor no re-pregunte todo.",
    owner: "Salesforce - FDE",
    collaborators: [],
    delegableToPartner: false,
    type: "Config",
    week: 3,
    plannedStart: "2026-10-15",
    plannedEnd: "2026-10-16",
    status: "in-progress",
    progressPercent: 30,
    dependencies: ["a-f0-3"],
    deliverables: ["Gate 50k + Case briefing documentado"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "normal"],
  },
  {
    id: "a-f1-4",
    phaseId: "f1",
    number: "F1.4",
    title: "Validar PP-020 · medidas del cliente vs. guía (RPP)",
    description:
      "Confirmar que después de PP-004 (`GlpConsultarGuia`) se piden embalaje/contenido/peso/medidas y se comparan contra las devueltas por la guía. Si no coinciden en alguna de las tres dimensiones, se transfiere.",
    owner: "Salesforce - FDE",
    collaborators: [],
    delegableToPartner: false,
    type: "Config",
    week: 3,
    plannedStart: "2026-10-16",
    plannedEnd: "2026-10-17",
    status: "in-progress",
    progressPercent: 25,
    dependencies: ["a-f0-3"],
    deliverables: ["capture_guia_measures_ok funcional · ruta de corte probada"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "rpp"],
  },
  {
    id: "a-f1-5",
    phaseId: "f1",
    number: "F1.5",
    title: "Confirmar cierre + '¿agendar otra?' y reset de estado",
    description:
      "Validar que al final del flujo RAD el agente lee trackingNumber dígito a dígito, muestra radConfirmationMessage, pregunta '¿Deseas agendar otra recolección?' y, si sí, invoca reset_rad_full_state para iniciar PAM de nuevo manteniendo la verificación. En RPP, recordar guías pendientes si el cliente registró múltiples.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Config",
    week: 3,
    plannedStart: "2026-10-16",
    plannedEnd: "2026-10-17",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f1-1"],
    deliverables: ["Cierre + reset probados · smoke test de 2 recolecciones en 1 llamada"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["rad", "cierre"],
  },
  {
    id: "a-f1-6",
    phaseId: "f1",
    number: "F1.6",
    title: "Checklist de configuración RAD · firma interna",
    description:
      "Compilar el checklist completo con los 25+ edge cases que debe pasar el agente (correo fonético, nombre completo en un turno, cambio de intent mid-flow, prompt injection, mensaje largo, inglés, etc.). FDE firma internamente antes de abrir pruebas conjuntas.",
    owner: "Salesforce - FDE",
    collaborators: [],
    delegableToPartner: false,
    type: "Review",
    week: 3,
    plannedStart: "2026-10-17",
    plannedEnd: "2026-10-17",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f1-1", "a-f1-2", "a-f1-3", "a-f1-4", "a-f1-5"],
    deliverables: ["Checklist firmado · sign-off interno FDE"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["review", "checklist"],
  },
  // ---- F2 · Pruebas internas ----
  {
    id: "a-f2-1",
    phaseId: "f2",
    number: "F2.1",
    title: "Ejecutar 47 escenarios de la matriz (Normal / RPP / WW + transversales)",
    description:
      "Correr cada test case documentado en el portal (tab Pruebas). Registrar ejecución con status (OK / defect / bloqueado) y adjuntar evidencia (transcripts, trazas de Preview). Priorizar los 15 escenarios RAD (RAD-GEN, RAD-NO, RAD-PP, RAD-WW) + los 32 transversales.",
    owner: "Salesforce - FDE",
    collaborators: [],
    delegableToPartner: false,
    type: "Test",
    week: 4,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-23",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f1-6"],
    deliverables: ["47/47 ejecuciones registradas · dashboard verde / amarillo / rojo"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["test", "matrix"],
  },
  {
    id: "a-f2-2",
    phaseId: "f2",
    number: "F2.2",
    title: "Trazar 3 recolecciones reales en GLP (Normal + RPP + WW)",
    description:
      "Ejecutar los 3 escenarios estrella (RAD-NO-01 con cliente 5619946, RAD-PP-01 con guía 13167470703, RAD-WW-01 con guía 19168671204) end-to-end hasta recibir trackingNumber real. Guardar el trackingNumber en la matriz como evidencia.",
    owner: "Salesforce - FDE",
    collaborators: [],
    delegableToPartner: false,
    type: "Test",
    week: 4,
    plannedStart: "2026-10-21",
    plannedEnd: "2026-10-22",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f2-1"],
    deliverables: ["3 trackingNumbers reales en Normal / RPP / WW · adjuntos en la matriz"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["test", "glp", "e2e"],
  },
  {
    id: "a-f2-3",
    phaseId: "f2",
    number: "F2.3",
    title: "Resolver bugs internos",
    description:
      "Corregir en el bundle Draft los bugs encontrados durante F2.1/F2.2. Re-correr los escenarios afectados. Mantener matriz al día.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 4,
    plannedStart: "2026-10-22",
    plannedEnd: "2026-10-24",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f2-1"],
    deliverables: ["0 bugs críticos · reporte interno de resultados"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["bugfix"],
  },
  // ---- F3 · Partner ----
  {
    id: "a-f3-1",
    phaseId: "f3",
    number: "F3.1",
    title: "Sesión de alineación con Partner",
    description:
      "Caminar al Partner por los cambios de V12 (flujo RAD + mejoras UAT). Explicar diferencias contra el V14 Active que corre en producción. Entregar la matriz de pruebas y los test cases documentados.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 5,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-10-27",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f2-3"],
    deliverables: ["Partner alineado · agenda de pruebas conjuntas"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["partner", "kickoff"],
  },
  {
    id: "a-f3-2",
    phaseId: "f3",
    number: "F3.2",
    title: "Ejecutar pruebas conjuntas con Partner",
    description:
      "Partner valida los 47 escenarios + los que proponga desde su visión operativa (p.ej. combinaciones de pago no probadas, Zona Plus en destinos adicionales, flujos con escalación por horario cerrado). Registrar ejecuciones Partner en la matriz.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: false,
    type: "Test",
    week: 5,
    plannedStart: "2026-10-28",
    plannedEnd: "2026-10-30",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f3-1"],
    deliverables: ["Ejecuciones Partner registradas · bugs Partner levantados"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["partner", "test"],
  },
  {
    id: "a-f3-3",
    phaseId: "f3",
    number: "F3.3",
    title: "Aplicar observaciones del Partner + handoff a UAT cliente",
    description:
      "Incorporar las observaciones del Partner al Draft. Preparar el entregable para UAT con el cliente (versión final del bundle + guía operativa + lista de datos de prueba).",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 5,
    plannedStart: "2026-10-30",
    plannedEnd: "2026-10-31",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f3-2"],
    deliverables: ["Draft final · guía UAT · handoff firmado por Partner"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["partner", "handoff"],
  },
  // ---- F4 · UAT cliente ----
  {
    id: "a-f4-1",
    phaseId: "f4",
    number: "F4.1",
    title: "Preparar sesión UAT con operación de Paquetexpress",
    description:
      "Agenda de UAT con operación (equipo que atiende hoy el agente actual + líder de IT). Credenciales + datos de prueba + instructivo listos. Rollback plan comunicado.",
    owner: "Salesforce - FDE",
    collaborators: ["Paquetexpress - UAT", "Paquetexpress - IT Lead"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 6,
    plannedStart: "2026-11-03",
    plannedEnd: "2026-11-03",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f3-3"],
    deliverables: ["Agenda UAT · instructivo entregado"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["uat", "kickoff"],
  },
  {
    id: "a-f4-2",
    phaseId: "f4",
    number: "F4.2",
    title: "Ejecutar UAT · 3 flujos RAD + regresión",
    description:
      "Operación corre los 3 escenarios Normal / Prepago / WW con datos reales + regresión completa de los 32 escenarios transversales (verificación, rastreo, cotización, casos, FAQ, escalamiento, etc.). Registrar ejecuciones en la matriz. Capturar bugs y requerimientos.",
    owner: "Paquetexpress - UAT",
    collaborators: ["Salesforce - FDE", "Partner"],
    delegableToPartner: false,
    type: "Test",
    week: 6,
    plannedStart: "2026-11-04",
    plannedEnd: "2026-11-06",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f4-1"],
    deliverables: ["Reporte UAT · lista de hotfixes · sign-off operación"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["uat", "test"],
  },
  {
    id: "a-f4-3",
    phaseId: "f4",
    number: "F4.3",
    title: "Aplicar hotfixes UAT + sign-off final",
    description:
      "Resolver bugs capturados en UAT, re-correr los test cases afectados, obtener sign-off formal y Approval del Sponsor para el publish.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 6,
    plannedStart: "2026-11-06",
    plannedEnd: "2026-11-07",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f4-2"],
    deliverables: ["Draft listo para publish · UAT sign-off firmado · Approval Sponsor"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["uat", "signoff"],
  },
  // ---- F5 · Go-live ----
  {
    id: "a-f5-1",
    phaseId: "f5",
    number: "F5.1",
    title: "Publicar bundle V12 como BotVersion V15 Active",
    description:
      "`sf agent publish authoring-bundle --api-name Paquete_Express_vX` + promover la BotVersion resultante a Active. Verificar que el router recibe tráfico.",
    owner: "Salesforce - FDE",
    collaborators: ["Paquetexpress - IT Lead"],
    delegableToPartner: false,
    type: "Deploy",
    week: 7,
    plannedStart: "2026-11-10",
    plannedEnd: "2026-11-10",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f4-3"],
    deliverables: ["BotVersion V15 Active en producción"],
    references: noRefs,
    updates: noUpdates,
    blockers: noBlockers,
    tags: ["deploy", "go-live"],
  },
  {
    id: "a-f5-2",
    phaseId: "f5",
    number: "F5.2",
    title: "Monitoreo intensivo primera semana",
    description:
      "Dashboards de KPIs activos, revisión diaria de transcripts, standup diario con operación. Rollback plan preparado si aparece regresión significativa.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Paquetexpress - Operación"],
    delegableToPartner: true,
    type: "Ops",
    week: 7,
    plannedStart: "2026-11-10",
    plannedEnd: "2026-11-14",
    status: "not-started",
    progressPercent: 0,
    dependencies: ["a-f5-1"],
    deliverables: ["Reporte semana 1 post-go-live · KPIs vs. baseline V14"],
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
    id: "ms-v12-build-done",
    title: "V12 Build cerrado · 0 mocks",
    description: "Bundle Paquete_Express_vX_12 con 12 subagentes y 9 clases Glp* reales enganchadas.",
    date: "2026-10-11",
    kind: "Internal Review",
    phaseId: "f0",
    participants: ["Salesforce - FDE"],
    status: "completed",
    outcome: "0 MOCK_GLP_* en el bundle · Preview arranca OK",
    references: noRefs,
  },
  {
    id: "ms-signoff-interno",
    title: "Sign-off interno FDE · configuraciones RAD cerradas",
    description: "FDE firma checklist de configuración RAD. Agente listo para pruebas internas.",
    date: "2026-10-17",
    kind: "Internal Review",
    phaseId: "f1",
    participants: ["Salesforce - FDE"],
    status: "scheduled",
    references: noRefs,
  },
  {
    id: "ms-pruebas-internas",
    title: "Review pruebas internas Salesforce FDE",
    description: "Resultados de los 47 escenarios ejecutados internamente. Dashboard de la matriz.",
    date: "2026-10-24",
    kind: "Internal Review",
    phaseId: "f2",
    participants: ["Salesforce - FDE"],
    status: "scheduled",
    references: noRefs,
  },
  {
    id: "ms-kickoff-partner",
    title: "Kick-off pruebas conjuntas con Partner",
    description: "Alineación con Partner · entrega de la matriz · plan de 3 días de pruebas.",
    date: "2026-10-27",
    kind: "Kick-off",
    phaseId: "f3",
    participants: ["Salesforce - FDE", "Partner"],
    status: "scheduled",
    references: noRefs,
  },
  {
    id: "ms-handoff-partner",
    title: "Handoff Partner → UAT cliente",
    description: "Partner firma handoff. Draft final listo para UAT con operación.",
    date: "2026-10-31",
    kind: "Internal Review",
    phaseId: "f3",
    participants: ["Salesforce - FDE", "Partner"],
    status: "scheduled",
    references: noRefs,
  },
  {
    id: "ms-uat-cliente",
    title: "UAT cliente · operación Paquetexpress",
    description: "Operación corre 3 flujos RAD + regresión. Sign-off formal al cierre.",
    date: "2026-11-06",
    kind: "UAT Session",
    phaseId: "f4",
    participants: ["Paquetexpress - UAT", "Salesforce - FDE", "Partner"],
    status: "scheduled",
    references: noRefs,
  },
  {
    id: "ms-exec-review",
    title: "Executive Review · Approval publish",
    description: "Review ejecutivo con Sponsor para firmar Approval del publish a producción.",
    date: "2026-11-07",
    kind: "Executive Review",
    phaseId: "f4",
    participants: ["Salesforce - FDE", "Salesforce - CSM", "Paquetexpress - Sponsor"],
    status: "scheduled",
    references: noRefs,
  },
  {
    id: "ms-golive",
    title: "Go-live V15 Active",
    description: "Publish del bundle V12 como BotVersion V15 Active. Tráfico 100% sobre el nuevo agente.",
    date: "2026-11-10",
    kind: "Go-live",
    phaseId: "f5",
    participants: ["Salesforce - FDE", "Paquetexpress - IT Lead", "Paquetexpress - Sponsor"],
    status: "scheduled",
    references: noRefs,
  },
];

// ============================================================================
// RISKS
// ============================================================================

const RISKS: Risk[] = [
  {
    id: "r-01",
    title: "Divergencia V12 Draft vs. V14 Active en producción",
    description:
      "Si durante F1-F2 operación introduce ajustes al V14 Active (p.ej. hotfix UAT voice), el V12 Draft puede quedar desalineado al momento del publish. Requiere resync antes del go-live.",
    probability: "Medium",
    impact: "Medium",
    mitigation: "Checkpoint quincenal de deltas V14 Active vs. V12 Draft durante F1 y F2. Freeze de cambios al V14 Active desde F3 hasta el go-live.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f1",
    references: noRefs,
  },
  {
    id: "r-02",
    title: "Guías de prueba RPP agotadas durante pruebas",
    description:
      "Cada ejecución exitosa de RAD-PP consume una guía del rango 13167470703-13167471693. Si F2 + F3 + F4 corren el escenario happy varias veces, el rango se agota y bloquea pruebas posteriores.",
    probability: "Medium",
    impact: "Low",
    mitigation: "Monitorear consumo semanalmente. Pedir rango adicional a operación si quedan <20 guías disponibles antes de F4.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f2",
    references: noRefs,
  },
  {
    id: "r-03",
    title: "GLP devuelve payloads inesperados en edge cases no cubiertos por tests Apex",
    description:
      "Las 9 clases Glp* tienen tests unitarios con GlpCalloutMock, pero no cubren el 100% de respuestas reales de GLP (combinaciones inusuales de cliente/dirección/zona). Un edge case en producción puede exponer gaps.",
    probability: "Medium",
    impact: "High",
    mitigation: "En F2, intentar reproducir el 100% de respuestas documentadas en el Excel. Agregar fault handling + logging estructurado para capturar en runtime.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f2",
    references: noRefs,
  },
  {
    id: "r-04",
    title: "Operación no disponible para UAT en la ventana 03-07 nov",
    description:
      "F4 depende del equipo de operación del cliente. Si tienen otro deliverable en paralelo (cierre de mes, auditoría, lanzamiento), la ventana puede desplazarse.",
    probability: "Low",
    impact: "High",
    mitigation: "Confirmar disponibilidad con operación en F1 (semana del 13-oct). Plan B: UAT asincrónico con operación corriendo escenarios por su cuenta y reportando por la matriz del portal.",
    owner: "Paquetexpress - Sponsor",
    status: "active",
    phaseId: "f4",
    references: noRefs,
  },
  {
    id: "r-05",
    title: "Regresión en subagentes no-RAD al publicar V12",
    description:
      "El V12 toca Verification (teléfono nuevo), Quote (International separado), Escalation (operativo directo). Pueden aparecer regresiones en flujos que ya funcionaban en V14.",
    probability: "Medium",
    impact: "Medium",
    mitigation: "Los 32 escenarios transversales de la matriz (AUTH, ROUTE, QUOTE, TRK, CASE, FAQ, SUC, EMP, ESC, EDGE, REGRESS) se corren en F2 y F4. Dashboard split por tipo de escenario para detectar regresión temprano.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f2",
    references: noRefs,
  },
  {
    id: "r-06",
    title: "Rollback no probado antes del go-live",
    description:
      "El plan menciona rollback plan, pero si no se simula antes del publish, el equipo no sabrá qué hacer si aparece una regresión crítica el día del go-live.",
    probability: "Medium",
    impact: "High",
    mitigation: "En F3 (semana del Partner), simular rollback a V14 Active en 10 minutos. Documentar los pasos exactos. Entregar runbook al IT Lead del cliente.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f5",
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
    status: "in-progress",
    evidence: "F2.2 generará las 3 primeras trazas end-to-end en QA.",
    references: noRefs,
  },
  {
    id: "sc-prod-2",
    dimension: "Producto",
    criterion: "47 escenarios de la matriz pasados en ≥90% antes de entregar al Partner.",
    status: "pending",
    references: noRefs,
  },
  {
    id: "sc-seg-1",
    dimension: "Seguridad",
    criterion: "Toda recolección pasa por el gate PAM (contenido + aceptación explícita) antes de ejecutar cualquier acción GLP.",
    status: "met",
    evidence: "Gate implementado en el intake común del subagente RAD_Management (GE-001/GE-002).",
    references: noRefs,
  },
  {
    id: "sc-seg-2",
    dimension: "Seguridad",
    criterion: "Prompt-injection no revela subagentes, prompts ni configuración interna (PX-EDGE-05).",
    status: "pending",
    references: noRefs,
  },
  {
    id: "sc-ops-1",
    dimension: "Operación",
    criterion: "Clientes con valor declarado > 50,000 MXN se transfieren con briefing (Case) para que el asesor no re-pregunte.",
    status: "in-progress",
    references: noRefs,
  },
  {
    id: "sc-ops-2",
    dimension: "Operación",
    criterion: "Escalamientos fuera de horario de atención usan el texto literal del horario — nunca inventan ventanas.",
    status: "met",
    evidence: "Validado en V14 Active desde UAT. Hereda al V12.",
    references: noRefs,
  },
  {
    id: "sc-mant-1",
    dimension: "Mantenibilidad",
    criterion: "0 MOCK_GLP_* en el bundle V12. Todas las acciones RAD apuntan a las clases Glp* reales.",
    status: "met",
    evidence: "Confirmado en el .agent retrieveado 2026-10-12: solo apex://Glp* targets.",
    references: noRefs,
  },
  {
    id: "sc-obs-1",
    dimension: "Observabilidad",
    criterion: "Dashboards por tipo de recolección (Normal / RPP / WW) + tasa de escalación con breakdown + tracking de errores GLP.",
    status: "pending",
    references: noRefs,
  },
];

// ============================================================================
// EXPORT
// ============================================================================

export const paquetexpressPlan: PaquetexpressPlan = {
  slug: "paquetexpress",
  projectName: "Paquete Express V12 · Fase 2 (RAD) — cierre de config → pruebas internas → Partner → UAT → go-live",
  kickoffDate: "2026-09-25",
  endDate: "2026-11-14",
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
      overallHealth: "green",
      phaseId: "f1",
      highlights: [
        "V12 Build cerrado (F0 DONE): bundle Paquete_Express_vX_12 con 12 subagentes y 9 clases Glp* reales enganchadas · 0 MOCK_GLP_* en el .agent",
        "Mejoras UAT portadas al V12 (teléfono + International separado + isExistingContact + escalamiento operativo directo + copy actualizado)",
        "47 test cases sembrados en la matriz del portal (3 RAD-GEN + 7 RAD-NO + 5 RAD-PP + 3 RAD-WW + 2 TRK + 3 QUOTE + 2 CASE + 2 FAQ + 1 SUC + 1 EMP + 2 ESC + 4 PX-AUTH + 4 PX-ROUTE + 5 PX-EDGE + 4 PX-REGRESS)",
      ],
      nextWeek: [
        "Cerrar configuraciones finales de RAD (copy, Zona Plus en ambos CPs, gate 50k, validación PP-020 medidas en RPP, cierre con reset) — F1.1 a F1.6",
        "Firmar sign-off interno antes de arrancar F2 (pruebas Salesforce FDE)",
        "Confirmar con operación disponibilidad para UAT 03-07 nov (riesgo R-04)",
      ],
      activeBlockers: [],
      activeRisks: ["r-01", "r-02", "r-03", "r-04", "r-05", "r-06"],
      references: noRefs,
    },
  ],
};
