// ============================================================================
// Jafra · Janet v2 — Plan de cierre de gaps + piloto + GA
// Arranque: Lun 2026-10-06 · Cutover piloto: Lun 2026-11-03 · GA: Vie 2026-11-14
// Autor: Jonathan Gomez (Salesforce FDE)
// ============================================================================
// Objetivo: dejar Jafra_Agentforce_V2 (sandbox develop) sin issues detectados,
// pasarlo a producción como agente paralelo con piloto cerrado de consultoras
// aliadas, y promover a GA al cerrar los 11 CA abiertos del backlog CRM-5 +
// las 4 banderas rojas post-verificación.
// ============================================================================

export type ISODate = string; // "YYYY-MM-DD"

export type OwnerTag =
  | "Salesforce - FDE"
  | "Salesforce - CSM"
  | "Salesforce - AE"
  | "Salesforce - Support"
  | "Partner" // Capptus — mismo partner que Betterware
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
// PHASES
// ============================================================================

const PHASES: Phase[] = [
  {
    id: "f0",
    number: 0,
    title: "Preparación · decisiones y validaciones operacionales",
    shortLabel: "F0 · Preparación",
    description:
      "Semana de desbloqueo: kick-off con Jafra, resolver las 4 decisiones de negocio pendientes (DEC-02/03/04/05 del backlog), validar las 3 dependencias operacionales (DEP-02/03/04), confirmar el modo TEST del sandbox y acordar con Capptus el alcance delegable. Sin esto, F1 no puede empezar.",
    objective:
      "Decisiones y validaciones resueltas, modo TEST del sandbox documentado, handshake con Capptus firmado con la lista de actividades delegables vs no delegables.",
    startDate: "2026-10-06",
    endDate: "2026-10-10",
    requires: [
      "Auditoría de cobertura Janet v2 completada (29/40 CA cubiertos, 8 abiertos)",
      "Proyecto SFDX local con los dos agentes retrievados (force-app + sandbox-app)",
      "Matriz de cobertura publicada en el customerProject card",
      "Acceso al sandbox develop + producción",
    ],
    outcome:
      "4 decisiones resueltas, 3 dependencias validadas, modo TEST confirmado con fecha de salida, Capptus con alcance acordado y acceso al proyecto.",
    gate:
      "Jafra Sponsor firma las decisiones; Capptus confirma disponibilidad para F1 y acepta el alcance delegable.",
    color: "#066AFE",
  },
  {
    id: "f1",
    number: 1,
    title: "Cierre de gaps en el `.agent` + Flows",
    shortLabel: "F1 · Cierre gaps",
    description:
      "Semana de desarrollo: cerrar los 8 CA abiertos y las 4 banderas rojas. Construir el Topic `Public_Info_And_Prospects` (CRM-10), agregar oferta de caso fuera de horario (CRM-9 CA-2), bajar `clarifyTurns` a 2 y agregar la regla anti-repetición en Clarify (CRM-8 CA-1 y CA-2), completar el enum de `authMode` y resolver las 2 opcionales (LINEAGE_SUFFIX_STRIPPED, errorType) según decisión de F0.",
    objective:
      "Matriz 40/40 CA cubiertos (o 38/40 si se declinaron las 2 opcionales). `sf agent validate` con 0 errores. Code review conjunto Salesforce + Capptus firmado.",
    startDate: "2026-10-13",
    endDate: "2026-10-17",
    requires: [
      "F0 cerrada · decisiones DEC y DEP firmadas",
      "Capptus con acceso al sandbox develop y a la rama del `.agent` V2",
      "Alcance delegable acordado (one-liners y config a Capptus; arquitectura y texto crítico a FDE)",
    ],
    outcome:
      "V2 modificado con 11 cambios cerrados, 0 errores de validate, code review firmado, PR mergeado a la rama principal del `.agent`.",
    gate:
      "Validate pasa con 0 errores · code review de los 11 cambios firmado por FDE y Capptus · matriz de cobertura actualizada en el customerProject card.",
    color: "#00B3FF",
  },
  {
    id: "f2",
    number: 2,
    title: "Validación · preview live-actions + regresión histórica",
    shortLabel: "F2 · Validación",
    description:
      "Semana de evidencia: activar `Validate_Phone__c = True` en sandbox, correr preview live-actions sobre los 20+ escenarios del backlog (P-1..P-5 de CRM-2 · P-1..P-6 de CRM-6 · P-1..P-7 de CRM-9 · P-1..P-3 de CRM-10 · regresión sobre las 189 sesiones históricas), producir el Agent Spec reverse-engineered con diagrama Mermaid, re-contabilizar presupuestos por Topic separando `instructions:` de contratos de acciones, y diff vs la rama mirror v1.",
    objective:
      "20+ escenarios pasan live-actions. 189 sesiones históricas re-corridas sin regresión. Agent Spec + Mermaid + re-contabilidad de presupuestos entregados.",
    startDate: "2026-10-20",
    endDate: "2026-10-24",
    requires: [
      "F1 cerrada · PR mergeado",
      "`Validate_Phone__c = True` en sandbox (coordinado con Jafra Admin)",
      "Test spec sintético generado con `sf agent generate test-spec`",
      "AiEvaluationDefinition desplegada",
    ],
    outcome:
      "Evidencia dura de que los 11 cambios cierran los gaps sin romper lo que ya funcionaba. Agent Spec como fuente de verdad del V2. Presupuestos re-contabilizados.",
    gate:
      "20+ escenarios pasan · 189 sesiones históricas sin regresión · UAT interno Salesforce + Capptus firmado · aprobación para publish.",
    color: "#9CDCFE",
  },
  {
    id: "f3",
    number: 3,
    title: "Publish + routing al piloto · Programa Insiders Jafra",
    shortLabel: "F3 · Publish+Insiders",
    description:
      "Semana de deploy a producción: Approval ejecutivo del publish, `sf agent publish authoring-bundle` + `sf agent activate` del V2 como agente paralelo. Infraestructura de routing: checkbox `FDE_Pilot_Janet__c` en `MessagingEndUser`, `AgentVersion__c` en `MessagingSession` para analítica A/B, omni-Flow `FDE_JAFRA_routeAgent`. Jafra CS cura la lista de 15-25 consultoras aliadas y las marca. Smoke test con 1 número real.",
    objective:
      "V2 publicado y activo en producción como agente paralelo. 15-25 consultoras del piloto marcadas. 1 smoke test exitoso con el `AgentVersion__c = \"FDE_PILOT_INSIDER\"`.",
    startDate: "2026-10-27",
    endDate: "2026-10-31",
    requires: [
      "F2 cerrada · Approval publish firmado por Jafra Sponsor + Salesforce",
      "Permissions de deploy a producción confirmados",
      "Lista preliminar de consultoras aliadas disponible",
    ],
    outcome:
      "V2 corriendo en producción, solo accesible a los MessagingEndUser con `FDE_Pilot_Janet__c = true`. Dashboard A/B con split por `AgentVersion__c` operativo.",
    gate:
      "Smoke test exitoso · Jafra CS confirma 15-25 Insiders marcadas · rollback operativo validado (desmarcar `FDE_Pilot_Janet__c`).",
    color: "#4CB2FF",
  },
  {
    id: "f4",
    number: 4,
    title: "Programa Insiders · piloto cerrado + escalada diaria → GA",
    shortLabel: "F4 · Piloto → GA",
    description:
      "Semana 1 (03-07 nov): piloto cerrado con las 15-25 consultoras aliadas; daily standup de KPIs con split por AgentVersion. Decisión go/no-go el viernes. Semana 2 (10-14 nov): escalada diaria del tráfico general — Lun 10% · Mar 25% · Mié 50% · Jue 75% · Vie 100% = GA. Rollback inmediato cambiando el Flow del canal en Messaging Settings ante cualquier regresión significativa.",
    objective:
      "V2 en GA (100% del tráfico de WhatsApp) con KPIs mejorados vs la baseline del agente actual: contención ↑, bucles de clarificación ↓, confirmaciones involuntarias de adjuntos ↓, oferta de caso fuera de horario ↑.",
    startDate: "2026-11-03",
    endDate: "2026-11-14",
    requires: [
      "F3 cerrada · V2 publicado y activo",
      "Dashboards de KPIs operativos con split por versión del agente",
      "Rollback operativo validado",
      "Lista final de 15-25 Insiders curada y marcada",
    ],
    outcome:
      "V2 en GA el viernes 14-nov. KPIs post-GA ≥ baseline en las 4 métricas clave. Aprendizajes del piloto documentados.",
    gate:
      "GA el vie 14-nov · KPIs en verde los 5 días de escalada · 0 incidentes P1 · Jafra Sponsor firma la decisión de GA.",
    color: "#2D7FFF",
  },
  {
    id: "f5",
    number: 5,
    title: "Hypercare + handoff a Jafra IT",
    shortLabel: "F5 · Hypercare+Handoff",
    description:
      "2 semanas de hypercare post-GA (17-28 nov) con monitoreo diario de KPIs, runbook operativo del V2 (cómo deshabilitar, cómo agregar tipo de caso vía `Case_Type_Config__c`, cómo cambiar settings de `Janet_Setting__mdt`), documentación de los 17 Apex `JAF_*` + 5 Flows (contrato + comportamiento), entrenamiento al equipo de desarrollo de Jafra, deprecación formal del agente v1 (archivo + documentación de la decisión) y handoff formal del ownership del V2 a Jafra IT.",
    objective:
      "V2 corre bajo ownership de Jafra IT sin involucramiento de Salesforce FDE por 2 semanas consecutivas. Documentación completa entregada y revisada.",
    startDate: "2026-11-17",
    endDate: "2026-11-28",
    requires: [
      "F4 cerrada · V2 en GA con KPIs en verde",
      "Jafra IT asignado como owner post-FDE",
      "Capptus disponible para documentación de los Apex/Flows que construyó",
    ],
    outcome:
      "Runbook completo · documentación de los 17 Apex + 5 Flows revisada por FDE · entrenamiento firmado por Jafra IT · agente v1 formalmente deprecado.",
    gate:
      "Jafra IT firma handoff · V2 corre sin FDE involucrado por 2 semanas · Jafra Sponsor confirma cierre del engagement.",
    color: "#1E63D8",
  },
];

// ============================================================================
// ACTIVITIES
// ============================================================================

function act(params: Partial<Activity> & Pick<Activity, "id" | "phaseId" | "number" | "title" | "description" | "owner" | "type" | "week" | "plannedStart" | "plannedEnd" | "deliverables">): Activity {
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
  // ============ F0 · Preparación ============
  act({
    id: "0.1",
    phaseId: "f0",
    number: "0.1",
    title: "Kick-off interno Salesforce (FDE + CSM + AE)",
    description:
      "Alinear al equipo interno sobre la auditoría de cobertura, los 11 CA abiertos, las 4 banderas rojas y el plan de 8 semanas. Confirmar roles: FDE lidera arquitectura y validaciones; CSM maneja relación con Sponsor; AE maneja comercial.",
    owner: "Salesforce - FDE",
    collaborators: ["Salesforce - CSM", "Salesforce - AE"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 1,
    plannedStart: "2026-10-06",
    plannedEnd: "2026-10-06",
    deliverables: ["Plan interno validado", "Narrativa alineada para Jafra"],
    tags: ["kick-off", "internal", "critical-path"],
  }),
  act({
    id: "0.2",
    phaseId: "f0",
    number: "0.2",
    title: "Kick-off ejecutivo con Jafra (Sponsor + IT + CS)",
    description:
      "Presentar la auditoría de cobertura, los gaps críticos y el plan hacia GA. Confirmar stakeholders por lado Jafra (Sponsor, IT Lead, CS Lead), responsables de cada decisión pendiente (DEC-02/03/04/05) y de las validaciones operacionales (DEP-02/03/04). Acordar daily standups durante F1-F4.",
    owner: "Salesforce - CSM",
    collaborators: ["Salesforce - FDE", "Jafra - Sponsor", "Jafra - IT Lead", "Jafra - CS Lead"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 1,
    plannedStart: "2026-10-07",
    plannedEnd: "2026-10-07",
    dependencies: ["0.1"],
    deliverables: ["Acta de kick-off con stakeholders y RACI", "Portal access list confirmada"],
    tags: ["kick-off", "critical-path"],
  }),
  act({
    id: "0.3",
    phaseId: "f0",
    number: "0.3",
    title: "Decisión DEC-02 · Knowledge público vs restringido",
    description:
      "Clasificar los artículos del Knowledge actual en 'público' (consumible por Public_Info_And_Prospects sin verificación) vs 'restringido' (solo tras verificación de identidad). Bloquea CA-2 de CRM-10.",
    owner: "Jafra - Sponsor",
    collaborators: ["Jafra - IT Lead", "Salesforce - FDE"],
    delegableToPartner: false,
    type: "Review",
    week: 1,
    plannedStart: "2026-10-08",
    plannedEnd: "2026-10-10",
    dependencies: ["0.2"],
    deliverables: ["Lista oficial de artículos público vs restringido"],
    tags: ["decision", "blocker-crm10", "critical-path"],
  }),
  act({
    id: "0.4",
    phaseId: "f0",
    number: "0.4",
    title: "Decisión DEC-03 · cola/campaña destino de Leads",
    description:
      "Definir dónde aterrizan los Leads capturados por el Topic Public_Info_And_Prospects (cola de Comercial, campaña específica, equipo de ventas directo). Bloquea CA-3 de CRM-10.",
    owner: "Jafra - Sponsor",
    collaborators: ["Jafra - IT Lead"],
    delegableToPartner: false,
    type: "Review",
    week: 1,
    plannedStart: "2026-10-08",
    plannedEnd: "2026-10-10",
    dependencies: ["0.2"],
    deliverables: ["Cola / Campaign ID + mapping de campos del Lead"],
    tags: ["decision", "blocker-crm10", "critical-path"],
  }),
  act({
    id: "0.5",
    phaseId: "f0",
    number: "0.5",
    title: "Decisiones DEC-04 / DEC-05 pendientes del backlog",
    description:
      "Resolver las 2 decisiones adicionales del backlog Jira (DEC-04 / DEC-05) que quedaron sin definir. FDE presenta las opciones; Jafra Operaciones decide.",
    owner: "Jafra - Sponsor",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: false,
    type: "Review",
    week: 1,
    plannedStart: "2026-10-08",
    plannedEnd: "2026-10-10",
    dependencies: ["0.2"],
    deliverables: ["Acta con DEC-04 / DEC-05 resueltos"],
    tags: ["decision"],
  }),
  act({
    id: "0.6",
    phaseId: "f0",
    number: "0.6",
    title: "Validar DEP-02 · Omni-Channel presencia en extremos del horario",
    description:
      "Confirmar que hay agentes humanos en Omni-Channel disponibles al inicio y al cierre del horario de servicio. Afecta la rama 'Not_Enough_Agents' del Escalation Flow.",
    owner: "Jafra - IT Lead",
    collaborators: ["Jafra - CS Lead"],
    delegableToPartner: false,
    type: "Ops",
    week: 1,
    plannedStart: "2026-10-08",
    plannedEnd: "2026-10-10",
    dependencies: ["0.2"],
    deliverables: ["Reporte de presencia de agentes vs horario planificado"],
    tags: ["ops-validation", "crm-9"],
  }),
  act({
    id: "0.7",
    phaseId: "f0",
    number: "0.7",
    title: "Validar DEP-03 · existencia del Queue Area_de_atencion_y_servicio",
    description:
      "Confirmar en producción que existe un Queue con DeveloperName exacto `Area_de_atencion_y_servicio` (el referenciado por `escalationQueueName` del V2). Si no existe, crearlo con el staffing correcto.",
    owner: "Jafra - IT Lead",
    delegableToPartner: true,
    type: "Config",
    week: 1,
    plannedStart: "2026-10-08",
    plannedEnd: "2026-10-09",
    dependencies: ["0.2"],
    deliverables: ["Queue verificada o creada con members correctos"],
    tags: ["ops-validation", "crm-9", "delegable"],
  }),
  act({
    id: "0.8",
    phaseId: "f0",
    number: "0.8",
    title: "Validar DEP-04 · BusinessHours alineados al staffing real",
    description:
      "Revisar el registro de `BusinessHours` usado por el Escalation Flow y confirmar que refleja los horarios reales de staffing de Jafra. Si hay desfase, actualizar.",
    owner: "Jafra - IT Lead",
    delegableToPartner: true,
    type: "Config",
    week: 1,
    plannedStart: "2026-10-08",
    plannedEnd: "2026-10-09",
    dependencies: ["0.2"],
    deliverables: ["BusinessHours record actualizado y validado contra el staffing"],
    tags: ["ops-validation", "crm-9", "delegable"],
  }),
  act({
    id: "0.9",
    phaseId: "f0",
    number: "0.9",
    title: "Confirmar modo TEST del sandbox + fecha de salida",
    description:
      "Documentar formalmente que el sandbox develop tiene `Janet_Setting__mdt.Default.Validate_Phone__c = False` y un `Test_Until__c` con fecha futura. Acordar: (a) la fecha de salida se mantiene, o (b) se activa `Validate_Phone__c = True` cuando empiece F2 para pruebas de identidad reales.",
    owner: "Jafra - IT Lead",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: false,
    type: "Review",
    week: 1,
    plannedStart: "2026-10-07",
    plannedEnd: "2026-10-08",
    dependencies: ["0.2"],
    deliverables: ["Decisión documentada sobre `Validate_Phone__c` durante F2"],
    tags: ["red-flag-2", "critical-path"],
  }),
  act({
    id: "0.10",
    phaseId: "f0",
    number: "0.10",
    title: "Decidir strip transparente vs opaco de LINEAGE_SUFFIX_STRIPPED",
    description:
      "Decisión arquitectónica: ¿el Flow debe reportar explícitamente `LINEAGE_SUFFIX_STRIPPED` cuando normaliza un sufijo de linaje (CA-1 estricto de CRM-2), o se mantiene el strip transparente actual (devuelve `OK` sin exponer el reasonCode)? La segunda opción es más limpia UX; la primera es más auditable.",
    owner: "Salesforce - FDE",
    collaborators: ["Jafra - IT Lead"],
    delegableToPartner: false,
    type: "Review",
    week: 1,
    plannedStart: "2026-10-09",
    plannedEnd: "2026-10-09",
    dependencies: ["0.2"],
    deliverables: ["Decisión documentada · afecta actividad 1.6"],
    tags: ["decision", "crm-2"],
  }),
  act({
    id: "0.11",
    phaseId: "f0",
    number: "0.11",
    title: "Decidir errorType por rama vs 3 outcomes separados en Escalation Flow",
    description:
      "Decisión arquitectónica: ¿agregar output `errorType` al Escalation Flow y rama por outcome para cumplir CA-6 estricto de CRM-9, o aceptar que los 3 outcomes separados (sin converger a un `Assign_Error_Outcome`) son arquitectónicamente *mejor* aunque rompan la letra del CA?",
    owner: "Salesforce - FDE",
    collaborators: ["Jafra - IT Lead"],
    delegableToPartner: false,
    type: "Review",
    week: 1,
    plannedStart: "2026-10-09",
    plannedEnd: "2026-10-09",
    dependencies: ["0.2"],
    deliverables: ["Decisión documentada · afecta actividad 1.3"],
    tags: ["decision", "crm-9"],
  }),
  act({
    id: "0.12",
    phaseId: "f0",
    number: "0.12",
    title: "Handshake con Capptus · alcance delegable vs no delegable",
    description:
      "Sesión de alineación con Capptus. FDE presenta el plan y la matriz de delegación: Capptus se encarga de implementaciones con spec clara (one-liners, enum completion, config/admin ops, ejecución de scripts prescritos), FDE se queda con análisis arquitectónico, decisiones de diseño, validaciones independientes y revisión de documentación. Capptus confirma disponibilidad para F1 y acepta el alcance.",
    owner: "Salesforce - FDE",
    collaborators: ["Salesforce - CSM", "Partner"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 1,
    plannedStart: "2026-10-10",
    plannedEnd: "2026-10-10",
    dependencies: ["0.1"],
    deliverables: [
      "Matriz de delegación firmada (actividades delegables marcadas con `delegableToPartner: true`)",
      "Capptus con acceso al sandbox develop y a la rama del `.agent` V2",
    ],
    tags: ["partner", "critical-path", "capptus-handshake"],
  }),

  // ============ F1 · Cierre de gaps ============
  act({
    id: "1.1",
    phaseId: "f1",
    number: "1.1",
    title: "Construir Topic Public_Info_And_Prospects + acción Create_Lead",
    description:
      "Diseñar y construir el Topic faltante (CRM-10, 5 SP). 4 CA a cubrir: (CA-1) intenciones de registro atendidas sin pedir membresía; (CA-2) Topic NO tiene acceso a Knowledge restringido (solo público según DEC-02); (CA-3) genera Lead con teléfono WhatsApp e intención, aterriza en la cola/campaña de DEC-03; (CA-4) quien dice ser consultora sin membresía va a Identity_Verification, no a este Topic. **No delegable a Capptus** — es un Topic nuevo que debe seguir el patrón arquitectónico del V2 (Hub-and-Spoke, descripciones afirmativas disjuntas, actions con contratos limpios).",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-15",
    dependencies: ["0.3", "0.4", "0.12"],
    deliverables: [
      "Topic Public_Info_And_Prospects agregado al `.agent` del V2",
      "Acción Apex `JAF_CreateLead` con contrato `.agent`",
      "Routing en `agent_router` para la nueva intención",
    ],
    tags: ["crm-10", "critical-path", "dev"],
  }),
  act({
    id: "1.2",
    phaseId: "f1",
    number: "1.2",
    title: "Agregar branch de oferta de caso fuera de horario (CRM-9 CA-2)",
    description:
      "En `Human_Handoff.reasoning.instructions`, agregar la rama que detecta outside_hours y ofrece: 'Nuestro horario es X. Si prefieres, puedo levantar tu caso ahora para que un ejecutivo te contacte en cuanto abramos. ¿Lo abrimos?' Si acepta → `go_to_Case_Intake`. Spec clara; delegable a Capptus con revisión FDE del texto final.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-14",
    plannedEnd: "2026-10-14",
    dependencies: ["1.1"],
    deliverables: ["Rama out-of-hours en el Topic Human_Handoff · revisada por FDE"],
    tags: ["crm-9", "red-flag-3", "delegable", "dev"],
  }),
  act({
    id: "1.3",
    phaseId: "f1",
    number: "1.3",
    title: "(Opcional) errorType output + rama en Escalation Flow (CRM-9 CA-6)",
    description:
      "Depende de la decisión 0.11. Si se decide cumplir CA-6 estricto: agregar variable `errorType` al Escalation Flow, cada rama de fallo la asigna antes de converger. **No delegable** — toca estructura del Flow y requiere entender las 4 decisiones del Flow (Queue_Found, Business_Hours_Found, Within_Business_Hours, Enough_Agents).",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-14",
    plannedEnd: "2026-10-15",
    dependencies: ["0.11"],
    deliverables: ["Flow con errorType por rama · o skip explícito si se decide la opción B"],
    tags: ["crm-9", "optional", "dev"],
  }),
  act({
    id: "1.4",
    phaseId: "f1",
    number: "1.4",
    title: "Bajar umbral clarifyTurns de 3 a 2 (CRM-8 CA-1)",
    description:
      "En el Topic Clarify, cambiar `if @variables.clarifyTurns > 3` a `if @variables.clarifyTurns > 2`. One-liner, delegable a Capptus con validación FDE post-cambio.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-13",
    dependencies: ["0.12"],
    deliverables: ["Topic Clarify con umbral = 2 · validate pasa"],
    tags: ["crm-8", "delegable", "one-liner"],
  }),
  act({
    id: "1.5",
    phaseId: "f1",
    number: "1.5",
    title: "Agregar regla anti-repetición en Clarify (CRM-8 CA-2)",
    description:
      "Agregar al Topic Clarify la regla 'Nunca repitas sustancialmente idéntico al mensaje anterior'. Texto crítico — redacción debe ser consistente con el estilo del resto del `.agent`. **No delegable** — FDE redacta, Capptus implementa el apply.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-14",
    plannedEnd: "2026-10-14",
    dependencies: ["0.12"],
    deliverables: ["Regla anti-repetición agregada al Topic Clarify"],
    tags: ["crm-8", "dev"],
  }),
  act({
    id: "1.6",
    phaseId: "f1",
    number: "1.6",
    title: "(Opcional) Assignment rc_lineage_stripped en Verify Flow (CRM-2 CA-1)",
    description:
      "Depende de la decisión 0.10. Si se decide reportar explícitamente: agregar un Assignment en el Flow que emita `reasonCode = LINEAGE_SUFFIX_STRIPPED` tras la normalización exitosa de un número con sufijo. **No delegable** — toca el Flow de verificación, requiere entender la secuencia `unified → baseMembership → convertirANumero`.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-15",
    plannedEnd: "2026-10-15",
    dependencies: ["0.10"],
    deliverables: ["Verify Flow con rc_lineage_stripped · o skip explícito si se decide strip transparente"],
    tags: ["crm-2", "optional", "dev"],
  }),
  act({
    id: "1.7",
    phaseId: "f1",
    number: "1.7",
    title: "Completar enum de authMode con PHONE_APPROVED_BYPASS",
    description:
      "En el `.agent`, cambiar la description del output `authMode` de la acción `Verify_Messaging_user_by_MembershipNumber` para incluir `PHONE_APPROVED_BYPASS` en el enum documentado. Fix del contrato roto (bandera roja 4).",
    owner: "Partner",
    delegableToPartner: true,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-13",
    dependencies: ["0.12"],
    deliverables: ["Enum authMode completo en el `.agent`"],
    tags: ["red-flag-4", "delegable", "one-liner"],
  }),
  act({
    id: "1.8",
    phaseId: "f1",
    number: "1.8",
    title: "Routing Public_Info_And_Prospects en agent_router",
    description:
      "Agregar en el `agent_router.reasoning.instructions` la regla de routing: si la intención es registro/información general sin membresía → Public_Info_And_Prospects. Agregar `go_to_Public_Info_And_Prospects` a las actions del router.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-15",
    plannedEnd: "2026-10-15",
    dependencies: ["1.1"],
    deliverables: ["Router actualizado con la ruta Public_Info_And_Prospects"],
    tags: ["crm-10", "dev"],
  }),
  act({
    id: "1.9",
    phaseId: "f1",
    number: "1.9",
    title: "sf agent validate authoring-bundle · V2 modificado",
    description:
      "Ejecutar `sf agent validate authoring-bundle --json --api-name Jafra_Agentforce_V2` y confirmar 0 errores. Automatizable — Capptus lo corre, FDE revisa output.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Test",
    week: 2,
    plannedStart: "2026-10-16",
    plannedEnd: "2026-10-16",
    dependencies: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8"],
    deliverables: ["Output JSON de validate · 0 errores"],
    tags: ["delegable", "validate"],
  }),
  act({
    id: "1.10",
    phaseId: "f1",
    number: "1.10",
    title: "Code review conjunto Salesforce + Capptus",
    description:
      "Revisión conjunta de los 8 cambios (más las 2 opcionales si se decidieron hacer) antes de merge. FDE revisa fidelidad al patrón arquitectónico V2; Capptus revisa impacto operativo. Dejar PR mergeado en la rama principal del `.agent`.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner"],
    delegableToPartner: false,
    type: "Review",
    week: 2,
    plannedStart: "2026-10-17",
    plannedEnd: "2026-10-17",
    dependencies: ["1.9"],
    deliverables: ["PR firmado · merge a rama principal del `.agent` V2"],
    tags: ["review", "critical-path"],
  }),

  // ============ F2 · Validación ============
  act({
    id: "2.1",
    phaseId: "f2",
    number: "2.1",
    title: "Activar Validate_Phone__c = True en sandbox",
    description:
      "Para ejecutar las pruebas P-1..P-5 de CRM-2 (incluyendo PHONE_MISMATCH) fielmente, activar temporalmente `Validate_Phone__c = True` en `Janet_Setting__mdt.Default`. Documentar el cambio y acordar fecha de rollback.",
    owner: "Jafra - IT Lead",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Config",
    week: 3,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-20",
    dependencies: ["0.9", "1.10"],
    deliverables: ["Setting cambiado · validación de que PHONE_MISMATCH es alcanzable"],
    tags: ["red-flag-2", "config", "delegable"],
  }),
  act({
    id: "2.2",
    phaseId: "f2",
    number: "2.2",
    title: "Preview live-actions · P-1..P-5 de CRM-2 (Identity Verification)",
    description:
      "Correr `sf agent preview start --use-live-actions --authoring-bundle Jafra_Agentforce_V2` y ejecutar los 5 escenarios del plan de pruebas de CRM-2: membresía válida desde teléfono registrado, desde otro teléfono (PHONE_MISMATCH), con sufijos de linaje, membresía inexistente con 2 intentos, caída de la integración. **No delegable** — Capptus construyó el agente v1 con los issues; validación debe ser independiente.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Test",
    week: 3,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-21",
    dependencies: ["2.1"],
    deliverables: ["5 escenarios con evidencia de trace · 5/5 pasan"],
    tags: ["crm-2", "preview", "critical-path"],
  }),
  act({
    id: "2.3",
    phaseId: "f2",
    number: "2.3",
    title: "Preview live-actions · P-1..P-6 de CRM-6 (Case Intake)",
    description:
      "Ejecutar los 6 escenarios de Case_Intake: pregunta informativa (no crea caso), reportar producto dañado, intent ambiguo (una pregunta de desambiguación), 'listo' sin subir nada, 6 membresías en texto corrido, alta de nuevo tipo por configuración (verificar que agregar un record en Case_Type_Config__c lo habilita sin despliegue).",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Test",
    week: 3,
    plannedStart: "2026-10-21",
    plannedEnd: "2026-10-22",
    dependencies: ["2.1"],
    deliverables: ["6 escenarios con evidencia de trace · 6/6 pasan"],
    tags: ["crm-6", "preview", "critical-path"],
  }),
  act({
    id: "2.4",
    phaseId: "f2",
    number: "2.4",
    title: "Preview live-actions · P-1..P-7 de CRM-9 (Human Handoff)",
    description:
      "Ejecutar los 7 escenarios de Human_Handoff: petición en sábado, dentro de horario sin agentes, con agente disponible, mención de muerte, mención de Profeco/demanda, usuario no verificado pide humano, 3 peticiones consecutivas fuera de horario. Verificar especialmente la nueva rama out-of-hours con oferta de caso (CA-2).",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Test",
    week: 3,
    plannedStart: "2026-10-22",
    plannedEnd: "2026-10-23",
    dependencies: ["2.1"],
    deliverables: ["7 escenarios con evidencia de trace · 7/7 pasan"],
    tags: ["crm-9", "preview", "critical-path"],
  }),
  act({
    id: "2.5",
    phaseId: "f2",
    number: "2.5",
    title: "Preview live-actions · P-1..P-3 de CRM-10 (Public Info)",
    description:
      "Ejecutar los 3 escenarios de Public_Info_And_Prospects: 'Quisiera convertirme en vendedor de Jafra' (sin membresía, genera Lead), 'Soy consultora pero no traigo mi número' (va a verificación, no a este Topic), pregunta cubierta solo por Knowledge restringido (no responde con contenido restringido, ofrece ruta de registro).",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Test",
    week: 3,
    plannedStart: "2026-10-23",
    plannedEnd: "2026-10-23",
    dependencies: ["2.1", "1.1"],
    deliverables: ["3 escenarios con evidencia de trace · 3/3 pasan"],
    tags: ["crm-10", "preview", "critical-path"],
  }),
  act({
    id: "2.6",
    phaseId: "f2",
    number: "2.6",
    title: "Agent Spec reverse-engineered + diagrama Mermaid",
    description:
      "Producir el Agent Spec completo del V2 según el workflow 'Comprehend an Existing Agent' de la skill `developing-agentforce`: propósito, grafo de subagentes, acciones con backing logic, variables, lógica de gating, comportamiento esperado. Diagrama Mermaid del subagent-map con transiciones, gates y acciones asociadas. **Análisis que FDE debe hacer** — es la fuente de verdad para test coverage y futuras evoluciones.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Doc",
    week: 3,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-24",
    dependencies: ["1.10"],
    deliverables: ["Agent Spec markdown · diagrama Mermaid · publicados en customerProject card"],
    tags: ["doc", "agent-spec"],
  }),
  act({
    id: "2.7",
    phaseId: "f2",
    number: "2.7",
    title: "Re-contabilidad de presupuestos por Topic",
    description:
      "Separar chars de `instructions:` vs chars de contratos de acciones por Topic, para evaluar el V2 justamente contra el objetivo <45K del backlog. Hipótesis: solo Account_Inquiries y Clarify exceden presupuesto si se cuentan solo las instrucciones.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Review",
    week: 3,
    plannedStart: "2026-10-22",
    plannedEnd: "2026-10-23",
    dependencies: ["1.10"],
    deliverables: ["Tabla recalculada · publicada en customerProject card"],
    tags: ["analysis"],
  }),
  act({
    id: "2.8",
    phaseId: "f2",
    number: "2.8",
    title: "Diff vs rama mirror v1 en sandbox",
    description:
      "El sandbox develop también tiene un `Jafra_Agentforce` mirror de la v1 que ha evolucionado hasta la v58 (más versiones que las 35 en producción). Diff estructural: ¿hay cambios recientes a la v1 que no están en el V2? ¿Hay patterns operativos que la v1 ha aprendido y conviene adoptar?",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Review",
    week: 3,
    plannedStart: "2026-10-23",
    plannedEnd: "2026-10-24",
    dependencies: ["1.10"],
    deliverables: ["Reporte diff v1-mirror vs V2 · lista de posibles adopciones"],
    tags: ["analysis"],
  }),
  act({
    id: "2.9",
    phaseId: "f2",
    number: "2.9",
    title: "Generar test spec sintético con sf agent generate test-spec",
    description:
      "Correr `sf agent generate test-spec` sobre el V2 para autogenerar ~20 escenarios adicionales que cubran cada gate y cada acción. Capptus lo ejecuta siguiendo script prescrito.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Test",
    week: 3,
    plannedStart: "2026-10-21",
    plannedEnd: "2026-10-22",
    dependencies: ["1.10"],
    deliverables: ["YAML del test spec con ~20 escenarios"],
    tags: ["delegable", "test-spec"],
  }),
  act({
    id: "2.10",
    phaseId: "f2",
    number: "2.10",
    title: "Desplegar AiEvaluationDefinition + primera corrida",
    description:
      "Convertir el test spec YAML en `AiEvaluationDefinition` metadata y desplegarlo al sandbox. Correr la primera ejecución del test.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Deploy",
    week: 3,
    plannedStart: "2026-10-22",
    plannedEnd: "2026-10-23",
    dependencies: ["2.9"],
    deliverables: ["AiEvaluationDefinition desplegada · resultados primera corrida"],
    tags: ["delegable", "test-eval"],
  }),
  act({
    id: "2.11",
    phaseId: "f2",
    number: "2.11",
    title: "Revisión FDE de los resultados del test spec",
    description:
      "FDE revisa los resultados de la primera corrida del test spec: ¿los escenarios autogenerados cubren los gates críticos? ¿Hay falsos positivos (test fail por mala formulación del expected)? ¿Hay fallas reales que requieren ajuste del `.agent`? **No delegable** — Capptus escribió y corrió el test; FDE valida independencia.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Review",
    week: 3,
    plannedStart: "2026-10-23",
    plannedEnd: "2026-10-24",
    dependencies: ["2.10"],
    deliverables: ["Reporte de resultados · lista de ajustes al test spec si aplica"],
    tags: ["review"],
  }),
  act({
    id: "2.12",
    phaseId: "f2",
    number: "2.12",
    title: "Regresión sobre las 189 sesiones históricas del backlog",
    description:
      "Re-correr las 189 sesiones fallidas analizadas en el backlog (31 cierres por verificación · 77 casos · 37 bucles · 32 handoffs · 41 sin membresía) contra el V2 y confirmar que ninguna reproduce el fallo original.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner"],
    delegableToPartner: false,
    type: "Test",
    week: 3,
    plannedStart: "2026-10-23",
    plannedEnd: "2026-10-24",
    dependencies: ["1.10"],
    deliverables: ["Reporte de regresión · 0 reproducciones del fallo original"],
    tags: ["regression", "critical-path"],
  }),

  // ============ F3 · Publish + routing al piloto ============
  act({
    id: "3.1",
    phaseId: "f3",
    number: "3.1",
    title: "Approval ejecutivo de publish a producción",
    description:
      "Sesión de aprobación con Jafra Sponsor + Salesforce AE/CSM: presentar la matriz 40/40 (o 38/40), evidencia de los 20+ escenarios, resultados del test spec y regresión histórica. Decisión go/no-go para publish.",
    owner: "Salesforce - FDE",
    collaborators: ["Salesforce - CSM", "Jafra - Sponsor"],
    delegableToPartner: false,
    type: "Review",
    week: 4,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-10-27",
    dependencies: ["2.2", "2.3", "2.4", "2.5", "2.11", "2.12"],
    deliverables: ["Acta de approval firmada"],
    tags: ["approval", "critical-path"],
  }),
  act({
    id: "3.2",
    phaseId: "f3",
    number: "3.2",
    title: "sf agent publish authoring-bundle del V2",
    description:
      "Correr `sf agent publish authoring-bundle --api-name Jafra_Agentforce_V2`. Automatizable — Capptus ejecuta siguiendo script prescrito.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Deploy",
    week: 4,
    plannedStart: "2026-10-28",
    plannedEnd: "2026-10-28",
    dependencies: ["3.1"],
    deliverables: ["Versión publicada confirmada en el org de producción"],
    tags: ["delegable", "publish", "critical-path"],
  }),
  act({
    id: "3.3",
    phaseId: "f3",
    number: "3.3",
    title: "sf agent activate del V2",
    description:
      "Correr `sf agent activate --api-name Jafra_Agentforce_V2`. Hace la versión activa, disponible como destino de Transfer-to-Bot.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Deploy",
    week: 4,
    plannedStart: "2026-10-28",
    plannedEnd: "2026-10-28",
    dependencies: ["3.2"],
    deliverables: ["V2 activo en producción"],
    tags: ["delegable", "activate", "critical-path"],
  }),
  act({
    id: "3.4",
    phaseId: "f3",
    number: "3.4",
    title: "Crear MessagingEndUser.FDE_Pilot_Janet__c (Checkbox)",
    description:
      "Crear el checkbox custom en MessagingEndUser que define si una consultora es piloto. Default false. Track history activo. Jafra CS activa/desactiva por record desde Setup UI.",
    owner: "Jafra - IT Lead",
    delegableToPartner: true,
    type: "Config",
    week: 4,
    plannedStart: "2026-10-28",
    plannedEnd: "2026-10-28",
    dependencies: ["3.1"],
    deliverables: ["Campo FDE_Pilot_Janet__c desplegado en producción"],
    tags: ["config", "delegable", "routing"],
  }),
  act({
    id: "3.5",
    phaseId: "f3",
    number: "3.5",
    title: "Crear MessagingEndUser.FDE_Pilot_Entered_Date__c",
    description:
      "DateTime field que se setea cuando el checkbox pasa a true, para analítica de cohorts.",
    owner: "Jafra - IT Lead",
    delegableToPartner: true,
    type: "Config",
    week: 4,
    plannedStart: "2026-10-28",
    plannedEnd: "2026-10-28",
    dependencies: ["3.4"],
    deliverables: ["Campo FDE_Pilot_Entered_Date__c desplegado"],
    tags: ["config", "delegable"],
  }),
  act({
    id: "3.6",
    phaseId: "f3",
    number: "3.6",
    title: "Crear MessagingSession.AgentVersion__c",
    description:
      "Text 50 field en MessagingSession que persiste la decisión del routing para analítica A/B. Valores: V35_LEGACY / FDE_PILOT_INSIDER / FDE_GA.",
    owner: "Jafra - IT Lead",
    delegableToPartner: true,
    type: "Config",
    week: 4,
    plannedStart: "2026-10-28",
    plannedEnd: "2026-10-28",
    dependencies: ["3.1"],
    deliverables: ["Campo AgentVersion__c desplegado"],
    tags: ["config", "delegable", "analytics"],
  }),
  act({
    id: "3.7",
    phaseId: "f3",
    number: "3.7",
    title: "Crear omni-Flow FDE_JAFRA_routeAgent",
    description:
      "Flow autolaunched sobre MessagingSession (RecordAfterSave) que lee `MessagingEndUser.FDE_Pilot_Janet__c` y hace Transfer-to-Bot al V2 si es true, al legacy si es false. Setea `AgentVersion__c` según decisión.",
    owner: "Jafra - IT Lead",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Config",
    week: 4,
    plannedStart: "2026-10-29",
    plannedEnd: "2026-10-30",
    dependencies: ["3.3", "3.4", "3.5", "3.6"],
    deliverables: ["Flow FDE_JAFRA_routeAgent desplegado · activo · asignado al canal"],
    tags: ["config", "delegable", "routing", "critical-path"],
  }),
  act({
    id: "3.8",
    phaseId: "f3",
    number: "3.8",
    title: "Curar lista de 15-25 consultoras aliadas (Programa Insiders Jafra)",
    description:
      "Jafra CS Lead selecciona 15-25 consultoras con perfil representativo (categorías de linaje variadas, actividad reciente, histórico de contacto con Janet). Preparar comunicación interna.",
    owner: "Jafra - CS Lead",
    delegableToPartner: false,
    type: "Mgmt",
    week: 4,
    plannedStart: "2026-10-27",
    plannedEnd: "2026-10-30",
    dependencies: ["0.2"],
    deliverables: ["Lista final de 15-25 Insiders curada con rationale por cada selección"],
    tags: ["insiders", "customer-prep"],
  }),
  act({
    id: "3.9",
    phaseId: "f3",
    number: "3.9",
    title: "Marcar FDE_Pilot_Janet__c=true en los MessagingEndUser del piloto",
    description:
      "Jafra CS activa el checkbox para los MessagingEndUser de las 15-25 Insiders curadas.",
    owner: "Jafra - CS Lead",
    delegableToPartner: true,
    type: "Config",
    week: 4,
    plannedStart: "2026-10-30",
    plannedEnd: "2026-10-30",
    dependencies: ["3.4", "3.5", "3.8"],
    deliverables: ["15-25 MessagingEndUser con FDE_Pilot_Janet__c = true"],
    tags: ["config", "delegable", "insiders"],
  }),
  act({
    id: "3.10",
    phaseId: "f3",
    number: "3.10",
    title: "Smoke test con 1 número real en WhatsApp",
    description:
      "Shared: FDE + Jafra ejecutan 1 conversación real con un número piloto (preferentemente del equipo Jafra, no de una consultora real todavía) y verifican que la sesión queda marcada con `AgentVersion__c = \"FDE_PILOT_INSIDER\"` y que el agente responde correctamente.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Jafra - IT Lead", "Partner"],
    delegableToPartner: false,
    type: "Test",
    week: 4,
    plannedStart: "2026-10-31",
    plannedEnd: "2026-10-31",
    dependencies: ["3.7", "3.9"],
    deliverables: ["1 sesión real en V2 · AgentVersion__c = FDE_PILOT_INSIDER confirmado"],
    tags: ["smoke-test", "critical-path"],
  }),
  act({
    id: "3.11",
    phaseId: "f3",
    number: "3.11",
    title: "Comunicación interna + prep materiales de soporte",
    description:
      "Jafra CS prepara comunicación a las 15-25 consultoras: narrativa 'Janet mejorada', canales para reportar bugs, SLA de respuesta. Materiales de soporte interno para el equipo que atiende escalations durante el piloto.",
    owner: "Jafra - CS Lead",
    delegableToPartner: false,
    type: "Mgmt",
    week: 4,
    plannedStart: "2026-10-29",
    plannedEnd: "2026-10-31",
    dependencies: ["3.8"],
    deliverables: ["Mensajes a Insiders · materiales de soporte interno"],
    tags: ["insiders", "communication"],
  }),

  // ============ F4 · Escalada + GA ============
  act({
    id: "4.1",
    phaseId: "f4",
    number: "4.1",
    title: "Semana de piloto cerrado · 03-07 nov · daily standup",
    description:
      "Las 15-25 Insiders usan el V2 durante la semana. Daily standup diario (15 min) con split de KPIs por AgentVersion__c: tasa de contención, bucles de clarificación, confirmaciones involuntarias de adjuntos, folios de caso correctamente abiertos, oferta de caso fuera de horario. Rollback inmediato si P1.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Jafra - CS Lead", "Jafra - IT Lead", "Partner"],
    delegableToPartner: false,
    type: "Ops",
    week: 5,
    plannedStart: "2026-11-03",
    plannedEnd: "2026-11-07",
    dependencies: ["3.10"],
    deliverables: ["5 daily standups · reporte de KPIs al final de semana · lista de bugs encontrados"],
    tags: ["pilot", "ops", "critical-path"],
  }),
  act({
    id: "4.2",
    phaseId: "f4",
    number: "4.2",
    title: "Decisión go/no-go post-piloto",
    description:
      "Jafra Sponsor + Salesforce revisan resultados del piloto. KPIs ≥ baseline en al menos 3 de 4 métricas clave. 0 incidentes P1. Si go → arranca escalada; si no-go → bugfix loop y re-piloto.",
    owner: "Jafra - Sponsor",
    collaborators: ["Salesforce - CSM", "Salesforce - FDE"],
    delegableToPartner: false,
    type: "Review",
    week: 5,
    plannedStart: "2026-11-07",
    plannedEnd: "2026-11-07",
    dependencies: ["4.1"],
    deliverables: ["Acta de decisión go/no-go"],
    tags: ["decision", "critical-path"],
  }),
  act({
    id: "4.3",
    phaseId: "f4",
    number: "4.3",
    title: "Escalada 10% (lun 10-nov)",
    description:
      "Agregar MessagingEndUser al checkbox hasta llegar al 10% del tráfico. Monitoreo intensivo. Daily standup.",
    owner: "Jafra - IT Lead",
    collaborators: ["Jafra - CS Lead"],
    delegableToPartner: true,
    type: "Ops",
    week: 6,
    plannedStart: "2026-11-10",
    plannedEnd: "2026-11-10",
    dependencies: ["4.2"],
    deliverables: ["10% del tráfico en V2 · KPIs en verde"],
    tags: ["rollout", "delegable"],
  }),
  act({
    id: "4.4",
    phaseId: "f4",
    number: "4.4",
    title: "Escalada 25% (mar 11-nov)",
    description: "Siguiente paso de escalada. Daily standup.",
    owner: "Jafra - IT Lead",
    delegableToPartner: true,
    type: "Ops",
    week: 6,
    plannedStart: "2026-11-11",
    plannedEnd: "2026-11-11",
    dependencies: ["4.3"],
    deliverables: ["25% del tráfico en V2 · KPIs en verde"],
    tags: ["rollout", "delegable"],
  }),
  act({
    id: "4.5",
    phaseId: "f4",
    number: "4.5",
    title: "Escalada 50% (mié 12-nov)",
    description: "Siguiente paso de escalada. Daily standup.",
    owner: "Jafra - IT Lead",
    delegableToPartner: true,
    type: "Ops",
    week: 6,
    plannedStart: "2026-11-12",
    plannedEnd: "2026-11-12",
    dependencies: ["4.4"],
    deliverables: ["50% del tráfico en V2 · KPIs en verde"],
    tags: ["rollout", "delegable"],
  }),
  act({
    id: "4.6",
    phaseId: "f4",
    number: "4.6",
    title: "Escalada 75% (jue 13-nov)",
    description: "Último paso antes de GA. Daily standup.",
    owner: "Jafra - IT Lead",
    delegableToPartner: true,
    type: "Ops",
    week: 6,
    plannedStart: "2026-11-13",
    plannedEnd: "2026-11-13",
    dependencies: ["4.5"],
    deliverables: ["75% del tráfico en V2 · KPIs en verde"],
    tags: ["rollout", "delegable"],
  }),
  act({
    id: "4.7",
    phaseId: "f4",
    number: "4.7",
    title: "🎯 GA · 100% del tráfico en V2 (vie 14-nov)",
    description:
      "Flip final: 100% del tráfico de WhatsApp enruta al V2. El agente v1 queda disponible pero sin tráfico. Daily standup continúa.",
    owner: "Jafra - IT Lead",
    collaborators: ["Salesforce - FDE", "Jafra - Sponsor"],
    delegableToPartner: false,
    type: "Ops",
    week: 6,
    plannedStart: "2026-11-14",
    plannedEnd: "2026-11-14",
    dependencies: ["4.6"],
    deliverables: ["V2 en GA · KPIs post-GA en verde"],
    tags: ["ga", "critical-path", "milestone"],
  }),

  // ============ F5 · Hypercare + handoff ============
  act({
    id: "5.1",
    phaseId: "f5",
    number: "5.1",
    title: "Monitoreo KPIs 30 días post-GA",
    description:
      "Dashboard de KPIs del V2 con comparativa vs la baseline (últimos 30 días previos al GA): tasa de contención, bucles de clarificación, confirmaciones involuntarias de adjuntos, oferta de caso fuera de horario, abandono. Revisión semanal. **FDE + Jafra IT lideran el análisis — NO Capptus** (quien construyó la v1 que estamos reemplazando).",
    owner: "Salesforce - FDE",
    collaborators: ["Jafra - IT Lead"],
    delegableToPartner: false,
    type: "Ops",
    week: 7,
    plannedStart: "2026-11-17",
    plannedEnd: "2026-11-28",
    dependencies: ["4.7"],
    deliverables: ["Reporte semanal x2 · comparación GA vs baseline"],
    tags: ["hypercare", "analytics", "critical-path"],
  }),
  act({
    id: "5.2",
    phaseId: "f5",
    number: "5.2",
    title: "Runbook operativo del V2",
    description:
      "Documentar operaciones típicas: cómo deshabilitar el V2 (cambiar el Flow del canal), cómo agregar un tipo de caso (agregar record a `Case_Type_Config__c`), cómo cambiar settings (`Janet_Setting__mdt`), cómo agregar un aviso (`Janet_Notice__mdt`), cómo monitorear KPIs. **FDE escribe el runbook** — es la fuente de verdad para Jafra IT.",
    owner: "Salesforce - FDE",
    delegableToPartner: false,
    type: "Doc",
    week: 7,
    plannedStart: "2026-11-17",
    plannedEnd: "2026-11-21",
    dependencies: ["4.7"],
    deliverables: ["Runbook markdown entregado a Jafra IT"],
    tags: ["doc", "handoff"],
  }),
  act({
    id: "5.3",
    phaseId: "f5",
    number: "5.3",
    title: "Documentación de los 17 Apex JAF_* + 5 Flows",
    description:
      "Capptus escribe la documentación técnica de los Apex y Flows que construyó (contrato, comportamiento, decisiones de diseño). FDE revisa que la documentación refleja fielmente el comportamiento observado y marca gaps o inconsistencias.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Doc",
    week: 7,
    plannedStart: "2026-11-17",
    plannedEnd: "2026-11-24",
    dependencies: ["4.7"],
    deliverables: ["Documentación de 17 Apex + 5 Flows · revisada por FDE"],
    tags: ["doc", "delegable", "capptus-review"],
  }),
  act({
    id: "5.4",
    phaseId: "f5",
    number: "5.4",
    title: "Entrenamiento al equipo de desarrollo de Jafra",
    description:
      "Sesión de 2-3 horas con Jafra IT: arquitectura del V2 (8 Topics, Hub-and-Spoke, Verification Gate), objeto `Case_Type_Config__c` como panel de control, patrón de agregar un tipo de caso nuevo (demo en vivo), lectura del dashboard de KPIs. **FDE conduce** — Capptus asiste como observador.",
    owner: "Salesforce - FDE",
    collaborators: ["Jafra - IT Lead", "Partner"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 8,
    plannedStart: "2026-11-24",
    plannedEnd: "2026-11-25",
    dependencies: ["5.2", "5.3"],
    deliverables: ["Sesión grabada · materiales entregados a Jafra IT"],
    tags: ["training", "handoff", "critical-path"],
  }),
  act({
    id: "5.5",
    phaseId: "f5",
    number: "5.5",
    title: "Deprecación formal del agente v1",
    description:
      "Documentar la decisión de deprecar el `Jafra_Agentforce` v35. Archivar los bundles (los 35 versiones quedan en el org pero sin tráfico). Comunicar a Jafra IT que no deben modificarse. Mantener como fallback de emergencia por 90 días post-GA.",
    owner: "Jafra - IT Lead",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: true,
    type: "Mgmt",
    week: 8,
    plannedStart: "2026-11-25",
    plannedEnd: "2026-11-26",
    dependencies: ["4.7"],
    deliverables: ["Doc de deprecación · comunicación interna enviada"],
    tags: ["deprecation", "delegable"],
  }),
  act({
    id: "5.6",
    phaseId: "f5",
    number: "5.6",
    title: "Handoff formal · V2 bajo ownership de Jafra IT",
    description:
      "Firma ejecutiva del handoff: Jafra Sponsor + Jafra IT Lead confirman que reciben el V2 con la documentación completa, el entrenamiento firmado y 2 semanas de hypercare validadas. FDE sale del día a día. Capptus queda como partner de operación bajo contrato directo con Jafra.",
    owner: "Shared",
    collaborators: ["Jafra - Sponsor", "Jafra - IT Lead", "Salesforce - FDE", "Salesforce - CSM"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 8,
    plannedStart: "2026-11-28",
    plannedEnd: "2026-11-28",
    dependencies: ["5.1", "5.2", "5.3", "5.4", "5.5"],
    deliverables: ["Acta de handoff firmada por ambas partes"],
    tags: ["handoff", "critical-path", "closing"],
  }),
];

// ============================================================================
// MILESTONES
// ============================================================================

const MILESTONES: Milestone[] = [
  {
    id: "kickoff-internal",
    title: "Kick-off interno Salesforce",
    description: "Alineación interna FDE + CSM + AE sobre el plan de 8 semanas.",
    date: "2026-10-06",
    kind: "Internal Review",
    phaseId: "f0",
    participants: ["Salesforce - FDE", "Salesforce - CSM", "Salesforce - AE"],
    status: "scheduled",
    references: [],
  },
  {
    id: "kickoff-jafra",
    title: "Kick-off ejecutivo con Jafra",
    description: "Presentar auditoría, gaps y plan al Sponsor + IT + CS de Jafra.",
    date: "2026-10-07",
    kind: "Kick-off",
    phaseId: "f0",
    participants: ["Salesforce - CSM", "Salesforce - FDE", "Jafra - Sponsor", "Jafra - IT Lead", "Jafra - CS Lead"],
    status: "scheduled",
    references: [],
  },
  {
    id: "f0-review",
    title: "Review decisiones F0",
    description: "Verificar que las 4 decisiones (DEC-02/03/04/05) y las 3 validaciones operacionales (DEP-02/03/04) estén resueltas antes de arrancar F1.",
    date: "2026-10-10",
    kind: "Executive Review",
    phaseId: "f0",
    participants: ["Salesforce - FDE", "Jafra - Sponsor"],
    status: "scheduled",
    references: [],
  },
  {
    id: "capptus-handshake",
    title: "Handshake con Capptus · alcance delegable",
    description: "Firma del alcance de delegación a Capptus para F1. Capptus confirma disponibilidad.",
    date: "2026-10-10",
    kind: "Kick-off",
    phaseId: "f0",
    participants: ["Salesforce - FDE", "Salesforce - CSM", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "uat-internal-f1",
    title: "UAT interno · cierre F1",
    description: "Code review conjunto + validate 0 errores + merge a rama principal del `.agent` V2.",
    date: "2026-10-17",
    kind: "Internal Review",
    phaseId: "f1",
    participants: ["Salesforce - FDE", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "approval-publish",
    title: "Approval ejecutivo de publish",
    description: "Jafra Sponsor firma go-ahead para publish del V2 a producción.",
    date: "2026-10-27",
    kind: "Executive Review",
    phaseId: "f3",
    participants: ["Jafra - Sponsor", "Salesforce - CSM", "Salesforce - FDE"],
    status: "scheduled",
    references: [],
  },
  {
    id: "smoke-test",
    title: "Smoke test cutover",
    description: "Primera sesión real en V2 con `AgentVersion__c = FDE_PILOT_INSIDER` confirmada.",
    date: "2026-10-31",
    kind: "UAT Session",
    phaseId: "f3",
    participants: ["Salesforce - FDE", "Jafra - IT Lead", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "pilot-review",
    title: "Decisión go/no-go post-piloto",
    description: "Revisión de KPIs del piloto; decisión de arrancar escalada a GA.",
    date: "2026-11-07",
    kind: "Executive Review",
    phaseId: "f4",
    participants: ["Jafra - Sponsor", "Salesforce - CSM", "Salesforce - FDE"],
    status: "scheduled",
    references: [],
  },
  {
    id: "ga",
    title: "🎯 GA · V2 en 100% del tráfico",
    description: "Flip final a GA. El V2 pasa a ser el agente oficial de WhatsApp de Jafra.",
    date: "2026-11-14",
    kind: "Go-live",
    phaseId: "f4",
    participants: ["Jafra - IT Lead", "Salesforce - FDE", "Jafra - Sponsor"],
    status: "scheduled",
    references: [],
  },
  {
    id: "handoff",
    title: "Handoff formal · V2 bajo ownership de Jafra IT",
    description: "Firma ejecutiva del handoff. FDE sale del día a día.",
    date: "2026-11-28",
    kind: "Executive Review",
    phaseId: "f5",
    participants: ["Jafra - Sponsor", "Jafra - IT Lead", "Salesforce - CSM", "Salesforce - FDE"],
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
    title: "DEC-02 / DEC-03 no se cierran a tiempo",
    description:
      "Las decisiones de negocio sobre Knowledge público/restringido y cola destino de Leads bloquean CRM-10 completo. Si llegamos a F1 sin estas definiciones, no se puede construir el Topic Public_Info_And_Prospects.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Escalar explícitamente con Jafra Sponsor en el kick-off ejecutivo (0.2). Dejar fecha límite dura: vie 10-oct EOD. Si no se cierra, F1 arranca sin CRM-10 (37/40 CA) y se agrega al post-GA roadmap.",
    owner: "Salesforce - CSM",
    status: "active",
    phaseId: "f0",
    references: [],
  },
  {
    id: "R2",
    title: "Modo TEST del sandbox se extiende sin aviso",
    description:
      "Si `Janet_Setting__mdt.Default.Validate_Phone__c` sigue en false durante F2, no se pueden ejercitar las pruebas de PHONE_MISMATCH de CRM-2. Si alguien lo cambia durante el piloto, el comportamiento de verificación cambia sin aviso.",
    probability: "Medium",
    impact: "Medium",
    mitigation:
      "Documentar explícitamente la fecha de salida del modo TEST (actividad 0.9). Activar `Validate_Phone__c = True` al inicio de F2 (actividad 2.1) con rollback acordado. Validar en producción que el setting equivalente SÍ tenga `Validate_Phone__c = True`.",
    owner: "Jafra - IT Lead",
    status: "active",
    phaseId: "f2",
    references: [],
  },
  {
    id: "R3",
    title: "Agentes Omni-Channel no disponibles en extremos del horario",
    description:
      "Si no hay presencia de agentes humanos al inicio o al cierre del horario, la rama 'Not_Enough_Agents' del Escalation Flow dispara con usuarios reales esperando. Afecta la tasa de contención aparente.",
    probability: "Medium",
    impact: "Medium",
    mitigation:
      "Validar DEP-02 en F0 (actividad 0.6). Si hay gap, acordar con Jafra Operaciones el ajuste de staffing antes de iniciar escalada.",
    owner: "Jafra - IT Lead",
    status: "active",
    phaseId: "f0",
    references: [],
  },
  {
    id: "R4",
    title: "⚠️ Capptus construye los fixes inconsistentes con el patrón arquitectónico del V2",
    description:
      "Capptus construyó el agente v1 que estamos reemplazando (23 subagentes, 638K chars, lógica en prompts, no `Case_Type_Config__c`, etc.) — exactamente los antipatterns que el V2 corrige. Existe riesgo de que al cerrar los 8 CA abiertos, Capptus derive hacia los patrones del v1 sin notarlo (p. ej., agregar lógica al prompt del Topic nuevo en vez de llevarla a un action con contrato).",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Limitar delegación a one-liners, config/admin ops y ejecución de scripts prescritos (ver actividades con `delegableToPartner: true`). FDE conserva el diseño del Topic Public_Info_And_Prospects, la redacción del texto crítico, el Agent Spec, la re-contabilidad de presupuestos y las validaciones independientes de preview + test spec. Code review conjunto obligatorio antes del merge (actividad 1.10).",
    owner: "Salesforce - FDE",
    status: "active",
    references: [],
  },
  {
    id: "R5",
    title: "Consultoras del piloto no activas → sin tráfico en V2",
    description:
      "Las 15-25 Insiders curadas pueden no interactuar con Janet durante la semana del piloto, dejándonos sin datos para la decisión de escalada.",
    probability: "Low",
    impact: "Medium",
    mitigation:
      "Jafra CS Lead cura la lista en base a actividad reciente con Janet (actividad 3.8). Pre-engagement individual con las 25 consultoras avisando que son parte del piloto. Si al día 3 del piloto no hay tráfico, agregar MessagingEndUser adicionales.",
    owner: "Jafra - CS Lead",
    status: "active",
    phaseId: "f4",
    references: [],
  },
  {
    id: "R6",
    title: "Bug detectado en piloto bloquea escalada",
    description:
      "Un bug P1 (p. ej., falla sistémica en una acción Apex, comportamiento regresivo en una rama común) obliga a frenar la escalada.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Rollback inmediato: cambiar el Flow del canal en Messaging Settings al legacy, o desmarcar `FDE_Pilot_Janet__c` en lote (en escalada). Bugfix loop con FDE + Capptus. Re-piloto antes de intentar escalada otra vez.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f4",
    references: [],
  },
  {
    id: "R7",
    title: "KPIs post-piloto no mejoran vs v1",
    description:
      "Al final de la semana de piloto, los KPIs del V2 no son medibleente mejores que la baseline del v1. No se justifica promover.",
    probability: "Low",
    impact: "High",
    mitigation:
      "Medir desde día 1 del piloto. Si al día 3 los KPIs están iguales o peor, análisis de root cause (FDE), bugfix loop. Si al final de semana sigue sin mejora, se extiende el piloto 1 semana más antes de decidir go/no-go.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f4",
    references: [],
  },
  {
    id: "R8",
    title: "Flow janet_v2_verificar_cliente modificado sin coordinar",
    description:
      "Capptus o Jafra IT modifican el Flow de verificación en el sandbox durante F2-F3 sin coordinación con FDE, introduciendo regresiones silenciosas en los reasonCodes o la normalización.",
    probability: "Low",
    impact: "High",
    mitigation:
      "Agregar al handshake con Capptus (0.12) la regla: cualquier cambio a Flows del V2 pasa por review FDE. Monitorear el changeset del Flow en el sandbox. Correr `sf agent validate` + los 5 escenarios P-1..P-5 antes de cualquier publish.",
    owner: "Salesforce - FDE",
    status: "active",
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
      "Matriz 40/40 CA cubiertos (o 38/40 con las 2 opcionales declinadas en F0 por decisión arquitectónica).",
    status: "pending",
    references: [],
  },
  {
    id: "C2",
    dimension: "Operación",
    criterion:
      "Piloto cerrado de 1 semana con 15-25 Insiders sin incidente P1; 20+ escenarios de regresión pasan live-actions.",
    status: "pending",
    references: [],
  },
  {
    id: "C3",
    dimension: "Operación",
    criterion:
      "KPIs post-piloto ≥ baseline del v1 en al menos 3 de las 4 métricas clave: tasa de contención, bucles de clarificación, confirmaciones involuntarias de adjuntos, oferta de caso fuera de horario.",
    status: "pending",
    references: [],
  },
  {
    id: "C4",
    dimension: "Mantenibilidad",
    criterion:
      "Runbook operativo + documentación de los 17 Apex `JAF_*` + 5 Flows entregados y revisados por FDE antes del handoff.",
    status: "pending",
    references: [],
  },
  {
    id: "C5",
    dimension: "Observabilidad",
    criterion:
      "Dashboard A/B operativo con split por `MessagingSession.AgentVersion__c`, mostrando KPIs del V2 vs la baseline del v1 en una sola vista.",
    status: "pending",
    references: [],
  },
];

// ============================================================================
// EXPORT · PLAN OBJECT
// ============================================================================

export const jafraPlan: JafraPlan = {
  slug: "jafra",
  projectName: "Jafra · Janet v2 — Cierre de gaps + piloto + GA",
  kickoffDate: "2026-10-06",
  endDate: "2026-11-28",
  phases: PHASES,
  activities: ACTIVITIES,
  milestones: MILESTONES,
  risks: RISKS,
  stableCriteria: STABLE_CRITERIA,
  statusUpdates: [],
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

export function phaseStatus(plan: JafraPlan, phaseId: string): ActivityStatus {
  const acts = plan.activities.filter((a) => a.phaseId === phaseId);
  if (acts.length === 0) return "not-started";
  if (acts.every((a) => a.status === "done")) return "done";
  if (acts.some((a) => a.status === "blocked")) return "blocked";
  if (acts.some((a) => a.status === "in-progress" || a.status === "done")) return "in-progress";
  return "not-started";
}

export function globalProgress(plan: JafraPlan): number {
  if (plan.activities.length === 0) return 0;
  const total = plan.activities.reduce((sum, a) => sum + a.progressPercent, 0);
  return Math.round(total / plan.activities.length);
}

export function currentPhase(plan: JafraPlan, today: ISODate = new Date().toISOString().slice(0, 10)): Phase | undefined {
  return plan.phases.find((p) => today >= p.startDate && today <= p.endDate)
    ?? plan.phases.find((p) => today < p.startDate);
}

export function upcomingMilestones(plan: JafraPlan, from: ISODate = new Date().toISOString().slice(0, 10), limit = 3): Milestone[] {
  return plan.milestones
    .filter((m) => m.date >= from && m.status === "scheduled")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

export function overallHealth(plan: JafraPlan): HealthColor {
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
