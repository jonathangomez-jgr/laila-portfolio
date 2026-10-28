// ============================================================================
// Betterware · FDE_BW_Service_Agent — Plan de reconstrucción (COMPRIMIDO)
// Arranque: Dom 2026-10-04 · Salida Insiders: Jue 2026-10-22 · GA: Mar 2026-11-03 · Go-live 100%: Vie 2026-12-11
// Autor: Jonathan Gomez (Salesforce FDE)
// ============================================================================

export type ISODate = string; // "YYYY-MM-DD"

export type OwnerTag =
  | "Salesforce - FDE"
  | "Salesforce - CSM"
  | "Salesforce - AE"
  | "Salesforce - Support"
  | "Partner"
  | "Betterware - Sponsor"
  | "Betterware - IT Lead"
  | "Betterware - UAT"
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

// Etapa del proyecto: agrupa fases para comunicar el avance al cliente
// (p. ej. Etapa 1 · Eficacia = F0 + F1 + F1.5). Opcional en cualquier plan.
export type Stage = {
  id: string;
  number: number;
  name: string;
  subtitle: string;
  phaseIds: string[];
  startLabel: string;
  endLabel: string;
};

export type BetterwarePlan = {
  slug: "betterware";
  projectName: string;
  kickoffDate: ISODate;
  endDate: ISODate;
  phases: Phase[];
  activities: Activity[];
  milestones: Milestone[];
  risks: Risk[];
  stableCriteria: StableCriterion[];
  statusUpdates: StatusUpdate[];
  stages?: Stage[];
};

// ============================================================================
// PHASES
// ============================================================================

const PHASES: Phase[] = [
  {
    id: "f0",
    number: 0,
    title: "Setup express",
    shortLabel: "F0 · Setup",
    description:
      "Arranque comprimido en 2 días: convertir los 12 stubs FDE en adapters al legacy, validar el agente funcional y presentarlo al Partner el lunes antes del kick-off oficial.",
    objective:
      "Agente FDE_BW_Service_Agent funcional en sandbox con adapters al legacy y validado por el Partner, listo para kick-off ejecutivo el martes.",
    startDate: "2026-10-04",
    endDate: "2026-10-05",
    requires: [
      "FDE_BW_Service_Agent.agent (963 LOC, ya compila)",
      "12 stubs BW_FDE_* desplegados en sandbox",
      "Acceso al sandbox betterwaremx--better1to1",
      "Catálogo de 19 clases BW_Ctrl* del Partner (acceso de lectura)",
      "Reporte de descubrimientos (PDF) + estrategia híbrida (HTML)",
    ],
    outcome:
      "Adapters funcionales, .agent alineado con outputs reales, preview UAT local passing en 10 escenarios base, deck ejecutivo listo para el Partner y validación del Partner recibida.",
    gate:
      "Partner valida los adapters y confirma su disponibilidad para kick-off ejecutivo el martes AM.",
    color: "#066AFE",
  },
  {
    id: "f1",
    number: 1,
    title: "Pruebas conjuntas + UAT + preparación Insiders",
    shortLabel: "F1 · Pruebas+UAT",
    description:
      "Kick-off oficial martes con Betterware CS, pruebas conjuntas Salesforce + Capptus (06-08 oct), UAT con Betterware (08-10 oct), bugfix loop y preparación operativa del Programa Insiders (lista de distribuidoras, marca FDE_Pilot__c). Al cierre, Approval para Publish del agente a producción.",
    objective:
      "Agente completamente validado por Capptus y Betterware, publicado en producción como bot activo con la lista de Insiders cargada y lista para activar.",
    startDate: "2026-10-06",
    endDate: "2026-10-21",
    requires: [
      "F0 cerrada · alineación con Capptus confirmada",
      "Insumos del proyecto entregados por Capptus (docs, requerimientos, escenarios, datos de prueba)",
      "Capptus disponible para pruebas conjuntas 06-08 oct",
      "Betterware UAT disponible 08-10 oct",
      "Permissions de deploy a producción confirmados",
    ],
    outcome:
      "20+ escenarios pasando · UAT sign-off de Betterware · lista de 15-25 Insiders marcada en MessagingEndUser · agente publicado en producción · ventana de pruebas internas y aceptación 16-21 oct previa a la salida con Insiders.",
    gate:
      "Approval firmado (Jue 15-oct) + pruebas internas y aceptación 16-21 oct · salida formal con Insiders el Jue 22-oct.",
    color: "#00B3FF",
  },
  {
    id: "f1_5",
    number: 1.5,
    title: "Programa Insiders · Salida → GA",
    shortLabel: "F1.5 · Insiders → GA",
    description:
      "Salida formal Jue 22-oct con la cohorte de Insiders sobre Betty v38. Observación jue 22 → dom 25 y escalada a partir del Lun 26-oct (20% el 27-oct → Mié 28 50% → Lun 2-nov 80%) hasta el Mar 3-nov donde el agente nuevo pasa a flujo general (GA · 100%). Observación intensiva con daily standups y monitoreo de conversaciones.",
    objective:
      "Pasar de piloto cerrado a flujo general en 1 semana, con evidencia dura día a día de que el nuevo agente mejora KPIs vs BW_AGENT_N, y rollback inmediato (desmarcar FDE_Pilot__c) ante cualquier regresión significativa.",
    startDate: "2026-10-22",
    endDate: "2026-11-03",
    requires: [
      "F1 cerrada · Approval publish firmado · pruebas internas y aceptación 16-21 oct completadas",
      "Lista de 15-25 Insiders curada y marcada en MessagingEndUser",
      "Dashboards de KPIs operativos con split por versión del agente",
      "Rollback operativo validado (desmarcar FDE_Pilot__c)",
    ],
    outcome:
      "Agente nuevo en GA (100% del tráfico), KPIs comparados contra baseline del agente actual, aprendizajes documentados para la Fase 2.",
    gate:
      "Executive Review 3 (Mar 3-nov) · firma de GA + aprobar entrar a reemplazo gradual de acciones.",
    color: "#F28B42",
  },
  {
    id: "f2",
    number: 2,
    title: "Reemplazo gradual acción por acción",
    shortLabel: "F2 · Reemplazo",
    description:
      "Cortar la dependencia del legacy acción por acción, priorizando por riesgo. Cerrar los hallazgos críticos y altos del reporte en código propio.",
    objective:
      "Hallazgos críticos (03-06) + Alto 07 cerrados en código · ownership real sobre acciones críticas · deuda estructural absorbida.",
    startDate: "2026-11-02",
    endDate: "2026-11-13",
    requires: [
      "F1.5 cerrada · GA firmado",
      "Framework de tests de paridad operativo",
      "Decisión de Betterware sobre canal alterno de reset (SEC-1)",
      "Modelo del org en GPT-4.1 (si se habilita file_upload)",
    ],
    outcome:
      "Hallazgos 03, 04, 05, 06, 07, 10, 14 cerrados en código · todas las acciones críticas con tests de paridad passing · 0 adapters en acciones de seguridad.",
    gate:
      "Executive Review 4 (medio) + review final de F2 · 100% de acciones críticas sin adapters.",
    color: "#E8275A",
  },
  {
    id: "f3",
    number: 3,
    title: "UAT formal + bugfix",
    shortLabel: "F3 · UAT",
    description:
      "Validación completa con Betterware antes de rollout al 100%. Pruebas de seguridad, carga, regresión y UAT formal.",
    objective:
      "Agente validado para producción al 100% · 0 bugs críticos abiertos.",
    startDate: "2026-11-16",
    endDate: "2026-11-27",
    requires: [
      "F2 cerrada · todas las acciones críticas con implementación propia",
      "Test spec expandido (~30 escenarios)",
      "Equipo UAT de Betterware disponible",
    ],
    outcome:
      "UAT sign-off formal · test suite completo passing · documentación y runbook finalizados.",
    gate:
      "Executive Review 5 · go/no-go final para rollout 100%.",
    color: "#022AC0",
  },
  {
    id: "f4",
    number: 4,
    title: "Go-live 100% + handoff",
    shortLabel: "F4 · Go-live",
    description:
      "Cutover final al 100% de tráfico, estabilización, handoff formal al equipo cliente y cierre del proyecto.",
    objective:
      "100% de tráfico en nuevo agente · V40 deprecado · handoff firmado · criterios de estable verificados.",
    startDate: "2026-11-30",
    endDate: "2026-12-04",
    requires: [
      "F3 cerrada · UAT sign-off",
      "Runbook finalizado",
      "Equipo cliente disponible para training",
    ],
    outcome:
      "Agente estable en producción con criterios de estable cumplidos. Proyecto formalmente cerrado.",
    gate:
      "Executive Review 6 · cierre del proyecto · QBR con AE.",
    color: "#001E5B",
  },
];

// ============================================================================
// ACTIVITIES
// ============================================================================

const act = (a: Omit<Activity, "updates" | "blockers" | "actualStart" | "actualEnd" | "progressPercent" | "status"> & Partial<Pick<Activity, "updates" | "blockers" | "actualStart" | "actualEnd" | "progressPercent" | "status">>): Activity => ({
  updates: [],
  blockers: [],
  progressPercent: 0,
  status: "not-started",
  ...a,
});

const ACTIVITIES: Activity[] = [
  // ============== FASE 0 — SETUP EXPRESS (Dom 2026-10-04 → Lun 2026-10-05) ==============
  act({
    id: "0.1",
    phaseId: "f0",
    number: "0.1",
    title: "Revisión interna del plan comprimido",
    description:
      "Sesión FDE interna hoy mismo: validar el plan comprimido de 12 días (hoy → 16-oct cutover). Confirmar scope mínimo viable, criterios de 'done' por actividad, identificar riesgos de la compresión temporal y preparar la narrativa para el Partner.",
    owner: "Salesforce - FDE",
    collaborators: ["Salesforce - CSM", "Salesforce - AE"],
    delegableToPartner: false,
    type: "Review",
    week: 1,
    plannedStart: "2026-10-04",
    plannedEnd: "2026-10-04",
    dependencies: [],
    deliverables: ["Plan comprimido validado internamente", "Narrativa para el Partner"],
    references: [],
    tags: ["kick-off-prep", "internal", "critical-path"],
  }),
  act({
    id: "0.2",
    phaseId: "f0",
    number: "0.2",
    title: "Convertir 12 stubs FDE en adapters al legacy BW_Ctrl*",
    description:
      "Para cada BW_FDE_*.cls, modificar su implementación para delegar al BW_Ctrl* correspondiente del Partner. Transformar el shape del output del _Ctrl al contract que espera el .agent. Cero reglas de negocio nuevas - sólo wiring. Mapping tentativo: GetDistributorInfo→BW_CtrlDistributor; GetAffiliateInfo→BW_CtrlAsociados; GetSaldos→BW_CtrlSaldosPagos; GetHistorial→BW_CtrlHistorialMovimientos; GetConvenios→BW_CtrlConvenios; GetTicketsServiceNow→BW_CtrlServiceNowTickets; GetPremiosCanjeados→BW_CtrlPremiosCanjeados.",
    owner: "Salesforce - FDE",
    collaborators: [],
    delegableToPartner: false,
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-04",
    plannedEnd: "2026-10-04",
    dependencies: ["0.1"],
    deliverables: ["12 adapters funcionales · desplegados en sandbox · compilan 0 errores"],
    references: [],
    tags: ["adapter", "dev", "critical-path"],
  }),
  act({
    id: "0.3",
    phaseId: "f0",
    number: "0.3",
    title: "Validar .agent compila con adapters + alinear outputs",
    description:
      "Ejecutar sf agent validate contra el FDE_BW_Service_Agent con los adapters en su sitio. Ajustar los output bindings del .agent para empatar con los shapes reales que devuelven los adapters (~22 renames estimados). Iterar hasta 0 errores.",
    owner: "Salesforce - FDE",
    collaborators: [],
    delegableToPartner: false,
    type: "Dev",
    week: 1,
    plannedStart: "2026-10-04",
    plannedEnd: "2026-10-04",
    dependencies: ["0.2"],
    deliverables: [".agent compila con adapters · outputs alineados"],
    references: [],
    tags: ["agent-script", "critical-path"],
  }),
  act({
    id: "0.4",
    phaseId: "f0",
    number: "0.4",
    title: "Preview UAT local con 10 escenarios base",
    description:
      "Correr sf agent preview start --use-live-actions y ejecutar los 10 escenarios base: 4 escenarios del PDF (SEC-3 bleed, escalation limpia, off-topic, ambiguous) + 6 escenarios funcionales (autenticación código, autenticación referencia bancaria, consulta saldo, consulta pedido, consulta premios, consulta ticket). Capturar evidencia (transcripts) de cada uno.",
    owner: "Salesforce - FDE",
    collaborators: [],
    delegableToPartner: false,
    type: "Test",
    week: 1,
    plannedStart: "2026-10-04",
    plannedEnd: "2026-10-04",
    dependencies: ["0.3"],
    deliverables: ["Reporte de preview UAT · 10 transcripts capturados"],
    references: [],
    tags: ["test", "internal", "critical-path"],
  }),
  act({
    id: "0.5",
    phaseId: "f0",
    number: "0.5",
    title: "Preparar deck ejecutivo del scope del 16-oct",
    description:
      "Deck de 8-10 slides: contexto (reporte descubrimientos), scope del cutover 16-oct, qué SÍ entra y qué NO (hereda del legacy), timeline día a día, dependencias críticas del Partner y Betterware, plan de rollback, criterios de éxito del primer cutover. Enfoque: recuperar confianza del cliente con evidencia tangible rápida.",
    owner: "Salesforce - FDE",
    collaborators: ["Salesforce - CSM", "Salesforce - AE"],
    delegableToPartner: false,
    type: "Doc",
    week: 1,
    plannedStart: "2026-10-04",
    plannedEnd: "2026-10-04",
    dependencies: ["0.1"],
    deliverables: ["Deck ejecutivo PDF/PPTX"],
    references: [],
    tags: ["doc", "executive", "critical-path"],
  }),
  act({
    id: "0.6",
    phaseId: "f0",
    number: "0.6",
    title: "Alineación con Capptus · deck + agente funcionando",
    description:
      "Sesión Salesforce + Capptus el lunes 05-oct AM. Presentar el deck de alineación (Alineación Betty) + demo en vivo del agente funcionando en sandbox con los adaptadores. Objetivo: alinear al Partner con el plan de validación (insumos → pruebas conjuntas → UAT Betterware → Insiders), obtener el commit explícito de Capptus para la ventana de pruebas conjuntas 06-08 oct y cerrar fecha de entrega de insumos del proyecto (documentación, requerimientos, historias de usuario, escenarios y datos de prueba).",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner", "Salesforce - CSM"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 1,
    plannedStart: "2026-10-05",
    plannedEnd: "2026-10-05",
    dependencies: ["0.4", "0.5"],
    deliverables: [
      "Aceptación del plan por parte de Capptus",
      "Fecha confirmada de entrega de insumos del proyecto",
      "Ventana de pruebas conjuntas 06-08 oct comprometida",
    ],
    references: [
      {
        label: "Deck Alineación Betty · Salesforce + Capptus",
        url: "/Customers/Betterware/files/Presentacion_Partner_FDE.html",
        kind: "document",
      },
    ],
    tags: ["partner-alignment", "executive", "critical-path"],
  }),
  act({
    id: "0.7",
    phaseId: "f0",
    number: "0.7",
    title: "Inicio pruebas Agente · Salesforce + Partner",
    description:
      "Arranque de la ventana de pruebas conjuntas sobre FDE_BW_Service_Agent. Salesforce y Capptus corren en paralelo escenarios base sobre el agente en sandbox. Captura de evidencia (transcripts) y bugs iniciales. Preparación para expandir la cobertura durante martes-jueves con los insumos de proyecto que entregue Capptus.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner"],
    delegableToPartner: false,
    type: "Test",
    week: 1,
    plannedStart: "2026-10-05",
    plannedEnd: "2026-10-05",
    dependencies: ["0.6"],
    deliverables: [
      "Primera ronda de pruebas conjuntas ejecutada",
      "Lista inicial de bugs/observaciones",
    ],
    references: [],
    tags: ["test", "partner", "critical-path"],
  }),

  // ============== FASE 1 — ADAPTER + QUICK WINS + UAT (Mar 2026-10-06 → Jue 2026-10-15) ==============
  act({
    id: "1.1",
    phaseId: "f1",
    number: "1.1",
    title: "Kick-off ejecutivo oficial con Partner + Betterware",
    description:
      "Reunión formal de arranque del proyecto. Presentar scope del cutover 16-oct, plan de 12 días comprimido, roles, cadencia de comunicación. Firmar scope. Confirmar disponibilidad explícita del Partner (vie 09 → lun 12 testing) y Betterware (mar 13 → mié 14 UAT).",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner", "Betterware - Sponsor", "Betterware - IT Lead"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 1,
    plannedStart: "2026-10-06",
    plannedEnd: "2026-10-06",
    dependencies: ["0.7"],
    deliverables: ["Minuta de kick-off", "Scope firmado", "Disponibilidad confirmada"],
    references: [
      {
        label: "Reporte de descubrimientos",
        url: "/Customers/Betterware/files/BW_AGENT_N%20%E2%80%94%20Reporte%20de%20descubrimientos.pdf",
        kind: "pdf",
      },
      {
        label: "Estrategia híbrida FDE",
        url: "/Customers/Betterware/files/FDE_Estrategia_Recomendada.html",
        kind: "document",
      },
    ],
    tags: ["critical-path", "executive", "kick-off"],
  }),
  act({
    id: "1.3",
    phaseId: "f1",
    number: "1.3",
    title: "Pruebas conjuntas Salesforce + Capptus · 20+ escenarios",
    description:
      "Ventana comprometida 06-08 oct. Salesforce + Capptus corren juntos los escenarios y datos de prueba entregados por Capptus sobre FDE_BW_Service_Agent en sandbox. Cobertura esperada 20+ escenarios cubriendo todos los subagentes: autenticación (3 vías), consulta distribuidor, asociados (con ownership), saldos, pagos, pedidos, puntos/premios, tickets, reset password, escalación legítima, off-topic, ambigüedad, timeout handling. Captura de evidencia por escenario (transcripts). Resolución inline de bugs no bloqueantes.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner"],
    delegableToPartner: false,
    type: "Test",
    week: 1,
    plannedStart: "2026-10-06",
    plannedEnd: "2026-10-08",
    dependencies: ["0.7", "1.1"],
    deliverables: [
      "Matriz de pruebas con 20+ escenarios ejecutados",
      "Transcripts por escenario",
      "Lista cerrada de bugs para resolver antes de UAT",
    ],
    references: [],
    tags: ["test", "partner", "critical-path"],
  }),
  act({
    id: "1.4",
    phaseId: "f1",
    number: "1.4",
    title: "UAT con Betterware",
    description:
      "UAT estructurado con el equipo de Betterware (2-3 personas). Jueves 08-oct kick-off del UAT; ventana del 08 al 10. Script documentado con 15+ escenarios + criterios de aceptación por cada uno. Incluye casos edge documentados en el reporte de descubrimientos (SEC-3 bleed Julieth, IDOR asociados, horario negocio sábados). Firma formal al cierre o lista de defects críticos a resolver antes del Programa Insiders.",
    owner: "Betterware - UAT",
    collaborators: ["Salesforce - FDE", "Partner"],
    delegableToPartner: false,
    type: "Test",
    week: 1,
    plannedStart: "2026-10-08",
    plannedEnd: "2026-10-10",
    dependencies: ["1.3"],
    deliverables: ["UAT sign-off formal de Betterware o lista cerrada de bugs"],
    references: [],
    tags: ["uat", "critical-path"],
  }),
  act({
    id: "1.5",
    phaseId: "f1",
    number: "1.5",
    title: "Bugfix loop post-UAT",
    description:
      "Resolución inmediata de bugs encontrados en UAT Betterware. Ciclo acelerado dev-test-redeploy con priorización por severidad. Ventana sábado-domingo 11-12 oct para absorber defects críticos sin desplazar el inicio del Programa Insiders.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-11",
    plannedEnd: "2026-10-12",
    dependencies: ["1.4"],
    deliverables: ["0 bugs críticos abiertos · PRs de hotfix merged"],
    references: [],
    tags: ["dev", "critical-path"],
  }),
  act({
    id: "1.6",
    phaseId: "f1",
    number: "1.6",
    title: "Inicio preparación Programa Insiders",
    description:
      "Arranque de la preparación operativa del Programa Insiders. Betterware cura la lista final de 15-25 distribuidoras aliadas con perfiles representativos; se marca a cada MessagingEndUser con el checkbox FDE_Pilot__c. Preparación de comunicación interna y materiales de soporte para las distribuidoras del piloto.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner", "Betterware - Sponsor", "Betterware - UAT"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 2,
    plannedStart: "2026-10-12",
    plannedEnd: "2026-10-14",
    dependencies: ["1.4"],
    deliverables: [
      "Lista final de 15-25 Insiders · MessagingEndUser.FDE_Pilot__c marcado",
      "Comunicación a distribuidoras lista",
      "Materiales de soporte preparados",
    ],
    references: [
      {
        label: "Programa Insiders · Betty",
        url: "/Customers/Betterware/files/Programa_Insiders_Betty.html",
        kind: "document",
      },
    ],
    tags: ["insiders", "critical-path"],
  }),
  act({
    id: "1.7",
    phaseId: "f1",
    number: "1.7",
    title: "Approval para Publish + Activate del agente",
    description:
      "Approval formal firmado para activar FDE_BW_Service_Agent como bot activo en producción. Fecha límite: jueves 15-oct. Incluye verificación final del Flow FDE_BW_RouteAgent activo + smoke test del transfer-to-bot en WhatsApp de producción con un número del piloto marcado. Rollback drill validado (desactivar FDE_Pilot__c en todos los MessagingEndUser).",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner", "Betterware - Sponsor", "Betterware - IT Lead"],
    delegableToPartner: false,
    type: "Deploy",
    week: 2,
    plannedStart: "2026-10-15",
    plannedEnd: "2026-10-15",
    dependencies: ["1.5", "1.6"],
    deliverables: [
      "Approval firmado · agente publicado y activo en prod",
      "Smoke test post-activate exitoso",
      "Rollback drill validado",
    ],
    references: [],
    tags: ["deploy", "executive", "critical-path"],
  }),

  // ============== F1 · Sprint "Observaciones Betty Bot" (13-15 oct) ==============
  act({
    id: "1.8",
    phaseId: "f1",
    number: "1.8",
    title: "Sprint S1 · Fixes raíz del audit Betterware · v14",
    description:
      "Atacar los 3 bugs raíz detectados por el equipo Betterware (documento Observaciones_Betty_Bot_Revision.pdf, 12 hallazgos). BET-001 pedido extemporáneo: eliminar actions con target corrupto (flow://Registrar_Pedid) y reemplazar por escalation silenciosa al bot especializado downstream (patrón contenido digital). BET-002 pago fuera de tiempo: agregar acción escalate_pago_fuera_de_tiempo en PaymentsAndFinance. BET-003 contenido digital: re-validar en v13 (las pruebas del PDF son del 12-oct 22:15, probablemente contra versión anterior al fix). Publish + activate v14.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-14",
    dependencies: ["1.5"],
    deliverables: [
      "Items BET-001, BET-002, BET-003 cerrados en código",
      "v14 publicada y activa",
      "Suite de pruebas específicas pasando (pedido extemporáneo, pago fuera de tiempo, 5 categorías contenido digital)",
    ],
    references: [
      {
        label: "Observaciones Betty Bot · PDF del cliente",
        url: "/Customers/Betterware/files/Observaciones_Betty_Bot_Revision.pdf",
        kind: "pdf",
      },
    ],
    tags: ["audit-fix", "critical-path"],
  }),
  act({
    id: "1.9",
    phaseId: "f1",
    number: "1.9",
    title: "Sprint S2 · Routing + comportamiento · v15",
    description:
      "BET-004 fix routing saldos vs descuentos (reasoning PaymentsAndFinance). BET-008 verificar + endurecer triggers de escalación directa en router y Escalation. BET-009 OV vs FC — antes de rastreo, si el folio es OV* resolver la factura primero. BET-011 cuando isAuthenticated=True ignorar códigos ajenos como login. BET-012 encadenar validar_linaje → consulta real downstream. Publish + activate v15.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-14",
    plannedEnd: "2026-10-15",
    dependencies: ["1.8"],
    deliverables: [
      "Items BET-004, BET-008, BET-009, BET-011, BET-012 cerrados en código",
      "v15 publicada y activa",
      "Suite de regresión sin confusiones de intent · consulta de linaje devuelve datos reales",
    ],
    references: [
      {
        label: "Observaciones Betty Bot · PDF del cliente",
        url: "/Customers/Betterware/files/Observaciones_Betty_Bot_Revision.pdf",
        kind: "pdf",
      },
    ],
    tags: ["audit-fix", "critical-path"],
  }),
  act({
    id: "1.10",
    phaseId: "f1",
    number: "1.10",
    title: "Sprint S3 · Comunicación y guardarraíles · v16",
    description:
      "BET-005 afinar reasoning por subagente para solo ofrecer siguientes-pasos ejecutables (lista blanca). BET-006 aplicar pautas de tono de la Guía Betty (calidez, personalización, emojis puntuales). BET-007 formato V42 (etiquetas en negritas, un dato por línea, emoji de cierre). BET-010 guardarraíl global contra sugerir líder/staff/mamá de linaje. Publish + activate v16 — versión final pre-cutover.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-15",
    plannedEnd: "2026-10-15",
    actualStart: "2026-10-13",
    actualEnd: "2026-10-14",
    status: "done",
    progressPercent: 100,
    dependencies: ["1.9"],
    deliverables: [
      "Items BET-005, BET-006, BET-007, BET-010 cerrados en código",
      "v16 publicada y activa como versión del cutover",
      "Side-by-side de 10+ interacciones vs V42 con calidad equivalente",
    ],
    references: [
      {
        label: "Observaciones Betty Bot · PDF del cliente",
        url: "/Customers/Betterware/files/Observaciones_Betty_Bot_Revision.pdf",
        kind: "pdf",
      },
    ],
    tags: ["audit-fix", "polish", "critical-path"],
  }),
  act({
    id: "1.11",
    phaseId: "f1",
    number: "1.11",
    title: "Rework V42 · Expansión de reasoning en 9 subagentes core",
    description:
      "Expansión del reasoning por subagente para alcanzar paridad funcional con las 349 instrucciones productivas de BW_AGENT_N v42 (26 topics). Delegación paralela a 4 fde-engineer agents + edits quirúrgicos secuenciales. Subagentes core adaptados: AuthAndSecurity (state machine deterministic), AccountAndInfo (451 líneas · 4 topics), OrdersAndDelivery (499 líneas · 7 topics), PaymentsAndFinance (323 líneas · 5 topics · 10 bloques nombrados), RewardsAndLoyalty (263 líneas · 3 topics), DigitalContent (8 categorías con triggers V42 + URL videos literal), GeneralFAQ (filtro post-Knowledge anti-líder/mamá-linaje), Escalation (3 reglas V42: 'quiero ejecutivo' solo no escala, insistencia no cambia criterio, no revelar criterios). Publish de v24 y v25 + activate v25 ejecutados 2026-10-15. Validate OK. State machine de autenticación confirmado en preview.",
    owner: "Salesforce - FDE",
    collaborators: [],
    delegableToPartner: false,
    type: "Dev",
    week: 2,
    plannedStart: "2026-10-14",
    plannedEnd: "2026-10-15",
    actualStart: "2026-10-14",
    actualEnd: "2026-10-15",
    status: "done",
    progressPercent: 100,
    dependencies: ["1.10"],
    deliverables: [
      "9 subagentes core con reasoning V42 adaptado",
      "BotVersion v25 publicada y activa en Betterware-Prod",
      "Smoke test de auth validado en preview session",
    ],
    references: [],
    tags: ["parity-v42", "polish", "critical-path"],
  }),

  // ============== FASE 1.5 — A/B PRODUCCIÓN (Jue 2026-10-22 → Mar 2026-11-03) ==============
  act({
    id: "1.5.1",
    phaseId: "f1_5",
    number: "1.5.1",
    title: "🚀 CUTOVER: Programa Insiders arranque formal",
    description:
      "Salida formal del Programa Insiders Jue 22-oct con la cohorte de distribuidoras aliadas marcadas con MessagingEndUser.FDE_Pilot__c = true, sobre Betty v38. Esta actividad marca el inicio de la cohorte real de Insiders tomando tráfico productivo (previo a esto, solo pruebas internas y aceptación Salesforce + Betterware). El resto del tráfico sigue en BW_AGENT_N v42 vía omni-flow FDE_BW_routeAgent. Monitoreo activo con rollback operativo (desmarcar checkbox) ante cualquier regresión.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Betterware - IT Lead", "Betterware - Sponsor"],
    delegableToPartner: false,
    type: "Deploy",
    week: 3,
    plannedStart: "2026-10-22",
    plannedEnd: "2026-10-22",
    actualStart: "2026-10-22",
    actualEnd: "2026-10-22",
    status: "done",
    progressPercent: 100,
    dependencies: ["1.7"],
    deliverables: [
      "Cohorte Insiders inicial (15-25 distribuidoras) tomando tráfico real sobre v38",
      "Omni-flow FDE_BW_routeAgent operativo con decisión por FDE_Pilot__c",
    ],
    references: [],
    tags: ["deploy", "cutover", "critical-path"],
  }),
  act({
    id: "1.5.2",
    phaseId: "f1_5",
    number: "1.5.2",
    title: "War room primeras 48h",
    description:
      "Equipo completo disponible en war room jueves 22 y viernes 23: FDE, Partner, Betterware IT Lead. Monitoreo minuto a minuto, decisiones rápidas de hotfix o rollback. Reporte cada 4 horas al Sponsor con snapshot de KPIs.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner", "Betterware - IT Lead"],
    delegableToPartner: false,
    type: "Ops",
    week: 3,
    plannedStart: "2026-10-22",
    plannedEnd: "2026-10-23",
    dependencies: ["1.5.1"],
    deliverables: ["Log del war room · reportes cada 4h · decisiones documentadas"],
    references: [],
    tags: ["ops", "critical-path"],
  }),
  act({
    id: "1.5.3",
    phaseId: "f1_5",
    number: "1.5.3",
    title: "Daily standup durante escalada",
    description:
      "Standup diario de 15 min con FDE + Partner + Betterware IT Lead durante la ventana de escalada lunes 26-oct → martes 3-nov. Agenda fija: KPIs del día anterior, blockers vigentes, hotfixes necesarios, decisión de escalar al siguiente % o mantener.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner", "Betterware - IT Lead"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 4,
    plannedStart: "2026-10-26",
    plannedEnd: "2026-11-03",
    dependencies: ["1.5.2"],
    deliverables: ["4 minutas de standup"],
    references: [],
    tags: ["ceremony"],
  }),
  act({
    id: "1.5.4",
    phaseId: "f1_5",
    number: "1.5.4",
    title: "Monitoreo continuo + hotfix inmediato",
    description:
      "Observación continua de KPIs + Error Rate + Avg Interactions de la cohorte Insiders vs. baseline del agente actual. Alertas automáticas si Error Rate > 2% o Abandon crece > 10 pp. Resolución inmediata de bugs reportados (ciclo <24h para críticos, <72h para mayores). Monitoreo de conversaciones en el canal de operaciones.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Ops",
    week: 3,
    plannedStart: "2026-10-22",
    plannedEnd: "2026-11-03",
    dependencies: ["1.5.1"],
    deliverables: ["Reporte diario de KPIs · PRs de hotfix merged"],
    references: [],
    tags: ["ops", "insiders"],
  }),
  act({
    id: "1.5.5",
    phaseId: "f1_5",
    number: "1.5.5",
    title: "Escalada al 20%",
    description:
      "Lunes 26-oct AM: evaluar métricas de los primeros días de Insiders (jue 22 → dom 25). Si cero regresión y Error Rate < 1%, incrementar la cohorte al 20% marcando más MessagingEndUser con FDE_Pilot__c. Monitoreo intensivo primeras 24h del nuevo porcentaje.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Deploy",
    week: 4,
    plannedStart: "2026-10-26",
    plannedEnd: "2026-10-26",
    dependencies: ["1.5.2"],
    deliverables: ["Cohorte Insiders al 20% · KPIs 24h capturados"],
    references: [],
    tags: ["deploy", "insiders"],
  }),
  act({
    id: "1.5.6",
    phaseId: "f1_5",
    number: "1.5.6",
    title: "Escalada al 50%",
    description:
      "Miércoles 28-oct: incremento de 20% a 50% de las distribuidoras del WhatsApp de Betty, por sorteo determinista sobre el mismo orden del 20%. Review de KPIs del día previo antes de activar. Monitoreo intensivo.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Deploy",
    week: 4,
    plannedStart: "2026-10-28",
    plannedEnd: "2026-10-28",
    dependencies: ["1.5.5"],
    deliverables: ["Cohorte al 50%"],
    references: [],
    tags: ["deploy", "insiders"],
  }),
  act({
    id: "1.5.7",
    phaseId: "f1_5",
    number: "1.5.7",
    title: "Escalada al 80%",
    description:
      "Lunes 2-nov: incremento de 50% a 80%. Review de KPIs del día previo antes de activar. Último escalón antes del salto a GA.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Deploy",
    week: 4,
    plannedStart: "2026-11-02",
    plannedEnd: "2026-11-02",
    dependencies: ["1.5.6"],
    deliverables: ["Cohorte al 80%"],
    references: [],
    tags: ["deploy", "insiders"],
  }),
  act({
    id: "1.5.9",
    phaseId: "f1_5",
    number: "1.5.9",
    title: "🎯 GA · Flujo total General Available",
    description:
      "Martes 3-nov: salto a GA (100% · flujo total). El agente nuevo (FDE_BW_Service_Agent) queda como el flujo general para todas las distribuidoras — ya no limitado a la cohorte Insiders marcada con FDE_Insider__c. Review ejecutivo final con el Sponsor para firmar GA y aprobar la entrada a Fase 2 (reemplazo gradual de acciones legacy).",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner", "Betterware - Sponsor", "Betterware - IT Lead"],
    delegableToPartner: false,
    type: "Deploy",
    week: 4,
    plannedStart: "2026-11-03",
    plannedEnd: "2026-11-03",
    dependencies: ["1.5.7"],
    deliverables: [
      "Agente nuevo en GA · 100% del tráfico",
      "Minuta ER3 · firma de GA + decisión formal F2",
    ],
    references: [],
    tags: ["executive", "ga", "critical-path"],
  }),

  // ============== FASE 2 — REEMPLAZO GRADUAL (Lun 2026-11-02 → Vie 2026-11-13) ==============
  act({
    id: "2.1",
    phaseId: "f2",
    number: "2.1",
    title: "Reemplazo seguridad: Consultar_Informacion_Distribuidor",
    description:
      "Documentar el Flow legacy BW_CtrlDistributor + Consultar_Informacion_Distribuidor, escribir tests de paridad, implementar BW_FDE_GetDistributorInfo propia con SOQL + enforcement WITH USER_MODE o stripInaccessible, correr paridad, cortar adapter. Cierra hallazgos 04 y 07 para esta acción. Avance al 28-oct: Betty ya consulta la información del distribuidor con los clones propios FDE_BW_InformacionDistribuidor y FDE_BW_ConsultarInformacionComercialGeneralDeUnDistribuidor, detrás de la compuerta de autenticación (hallazgo 04 cerrado en Betty). Pendiente: tests de paridad documentados.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 5,
    plannedStart: "2026-11-02",
    plannedEnd: "2026-11-04",
    actualStart: "2026-10-14",
    progressPercent: 70,
    status: "in-progress",
    dependencies: ["1.5.9"],
    deliverables: ["BW_FDE_GetDistributorInfo impl propia · tests paridad green"],
    references: [],
    tags: ["security", "critical-path"],
  }),
  act({
    id: "2.2",
    phaseId: "f2",
    number: "2.2",
    title: "Reemplazo seguridad: ConsultarAsociados + ownership gate",
    description:
      "Implementar BW_CheckAffiliateOwnership real contra el modelo de datos. Reemplazar ConsultarAsociados por implementación propia con el gate de propiedad primero. Cierra hallazgo 05. Avance al 28-oct: el IDOR (hallazgo 05) está cerrado en Betty: BWPlusAffiliateLookupAction valida la propiedad contra el distribuidor de la sesión y FDE_ValidarLinaje valida el linaje. Pendiente: implementación propia de la consulta y tests de IDOR.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 5,
    plannedStart: "2026-11-04",
    plannedEnd: "2026-11-06",
    actualStart: "2026-10-14",
    progressPercent: 40,
    status: "in-progress",
    dependencies: ["2.1"],
    deliverables: ["BW_CheckAffiliateOwnership real · tests de IDOR passing"],
    references: [],
    tags: ["security", "idor", "critical-path"],
  }),
  act({
    id: "4.11",
    phaseId: "f4",
    number: "4.11",
    title: "Reemplazo seguridad: reset password con canal alterno",
    description:
      "Movida de F2 a F4 (post-GA). Alcance: implementar BW_FDE_GeneratePasswordResetLink con entrega del enlace por email/SMS en lugar del chat. Cierra hallazgo 06. Fuera del scope del cutover inicial — la etapa 1 del piloto mantiene paridad V42 (link en chat). Requiere decisión previa de Betterware sobre canal alterno (email corporativo registrado, SMS, u otro).",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Betterware - IT Lead"],
    delegableToPartner: false,
    type: "Dev",
    week: 10,
    plannedStart: "2026-12-02",
    plannedEnd: "2026-12-04",
    dependencies: [],
    deliverables: ["Reset link entregado fuera del transcript"],
    references: [],
    tags: ["security", "post-ga"],
  }),
  act({
    id: "2.4",
    phaseId: "f2",
    number: "2.4",
    title: "Rediseño autenticación (BW_Auth_*) · funcional + técnico",
    description:
      "Dos frentes en paralelo. (1) Técnico: reemplazar los 2 Flows gigantes (943+842 líneas) por Apex invocable con sharing explícito y tests ≥80%. Cierra hallazgo 11 parcial. (2) Funcional: revisar y ratificar con cliente la lógica del subagente AuthAndSecurity — umbral global de intentos (hoy 2 por método en el Flow, propuesta V2 es 3 globales), decisión de escalar vs cerrar conversación al agotarlos, exclusividad o mezcla de método código/ref bancaria por sesión, y continuidad del estado AUTENTICADO_TEMPORAL (7 días) de ref bancaria. Las confirmaciones viven como items en el backlog del portal.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 5,
    plannedStart: "2026-11-02",
    plannedEnd: "2026-11-06",
    actualStart: "2026-10-21",
    status: "in-progress",
    progressPercent: 45,
    dependencies: ["2.1"],
    deliverables: ["BW_FDE_Auth* clases · Flows auth deprecados"],
    references: [],
    tags: ["security", "auth"],
  }),
  act({
    id: "2.5",
    phaseId: "f2",
    number: "2.5",
    title: "Fault-swallow fix: BW_InvConsultarRegistrosDS",
    description:
      "Eliminar los 2 catches silenciosos en enriquecimiento Data Cloud. Re-lanzar excepciones tipadas, usar logger propio del servicio. Cierra hallazgo 14.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 6,
    plannedStart: "2026-11-02",
    plannedEnd: "2026-11-03",
    dependencies: ["1.5.9"],
    deliverables: ["BW_InvConsultarRegistrosDS sin fault-swallow"],
    references: [],
    tags: ["error-handling"],
  }),
  act({
    id: "2.6",
    phaseId: "f2",
    number: "2.6",
    title: "Agregar faultConnector a Flows críticos",
    description:
      "Añadir fault paths explícitos en los 20 Flows de acción (al menos en Record Lookups y Action Calls críticos). Cierra hallazgo 10. Prioridad por volumen de uso.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 6,
    plannedStart: "2026-11-03",
    plannedEnd: "2026-11-06",
    dependencies: ["1.5.9"],
    deliverables: ["20 Flows con fault paths · tests de regresión"],
    references: [],
    tags: ["error-handling", "flows"],
  }),
  act({
    id: "2.7",
    phaseId: "f2",
    number: "2.7",
    title: "Remediar 6 clases Apex without sharing",
    description:
      "Cambiar las 6 clases restantes de public without sharing a public with sharing. Donde no sea posible por diseño (sistema), añadir checks explícitos de propiedad/autenticación. Cierra hallazgo 07.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 6,
    plannedStart: "2026-11-04",
    plannedEnd: "2026-11-06",
    dependencies: ["2.2"],
    deliverables: ["6 clases remediadas · 0 without sharing en acciones de datos"],
    references: [],
    tags: ["security"],
  }),
  act({
    id: "2.8",
    phaseId: "f2",
    number: "2.8",
    title: "Consolidar funciones GenAI duplicadas",
    description:
      "Unificar BW_CheckBusinessHours (×3 funciones) y BW_ConsulaRecogerDevoluciones (×2) en una sola función GenAI cada una, reusada por todos los subagentes. Cierra hallazgo 16.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Config",
    week: 7,
    plannedStart: "2026-11-09",
    plannedEnd: "2026-11-10",
    dependencies: ["2.5", "2.6"],
    deliverables: ["46 funciones GenAI (desde 50)"],
    references: [],
    tags: ["cleanup"],
  }),
  act({
    id: "2.9",
    phaseId: "f2",
    number: "2.9",
    title: "Limpiar orphan reference V40",
    description:
      "Depurar la referencia huérfana c__BW_M010_ConsultarAltasAsociados en el bundle V40 (vía Setup UI). Habilita el retrieve completo del bundle vía Metadata API. Cierra hallazgo 15.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Config",
    week: 7,
    plannedStart: "2026-11-10",
    plannedEnd: "2026-11-10",
    dependencies: ["2.8"],
    deliverables: ["Bundle V40 retrievable sin errores"],
    references: [],
    tags: ["cleanup"],
  }),
  act({
    id: "2.10",
    phaseId: "f2",
    number: "2.10",
    title: "Reemplazo de acciones restantes (valor medio-alto)",
    description:
      "Convertir el resto de adapters en implementación propia (puntos, premios, pagos, consultas de saldo, tickets, catálogo). Priorizar por volumen de uso y riesgo residual. Avance al 28-oct: 25 de las 53 acciones de Betty ya corren sobre componentes propios FDE_* (17 flows + 8 Apex); al 23-oct eran 19 de 51.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 7,
    plannedStart: "2026-11-09",
    plannedEnd: "2026-11-13",
    actualStart: "2026-10-14",
    status: "in-progress",
    progressPercent: 47,
    dependencies: ["2.4", "2.5", "2.6", "2.7"],
    deliverables: ["0 adapters restantes en acciones de datos"],
    references: [],
    tags: ["dev"],
  }),
  act({
    id: "2.16",
    phaseId: "f2",
    number: "2.16",
    title: "Fijar modelo del agente a GPT-4.1 (sfdc_ai__DefaultGPT41)",
    description:
      "Agregar al bundle del agente la configuración explícita `model_config: model://sfdc_ai__DefaultGPT41` para fijar el modelo del planner a GPT-4.1 en vez del default del org (que podría ser GPT5Mini u otro). Razones por las cuales se eligió este modelo específico: (1) requisito oficial de Salesforce — el modo `file_upload: managed` del Agentforce Service Agent solo opera correctamente con GPT-4.1; con GPT-4o o modelos más chicos el feature queda inhabilitado o inestable (ver R4 del plan y Agent Script skill reference). (2) Procesamiento multimodal nativo — GPT-4.1 interpreta imágenes y PDFs sin conectores extra, que es lo que necesita el subagente Analizar_Adjuntos (2.15) para describir fotos y extraer texto. (3) Vs GPT5Mini (anterior default del org): 5Mini es más barato pero NO soporta managed file_upload — probarlo dejó la capability inoperable. (4) Vs modelos custom: fuera del alcance del cutover inicial — nos quedamos con el default endorsado por Salesforce para managed infra. Deploy aplicado a producción el 13-oct-2026.",
    owner: "Salesforce - FDE",
    collaborators: [],
    delegableToPartner: false,
    type: "Dev",
    week: 5,
    plannedStart: "2026-10-13",
    plannedEnd: "2026-10-13",
    dependencies: [],
    deliverables: [
      "model_config: model://sfdc_ai__DefaultGPT41 en el bundle · desbloquea 2.15 (adjuntos)",
    ],
    references: [],
    tags: ["config", "capability"],
    status: "done",
    progressPercent: 100,
  }),
  act({
    id: "2.15",
    phaseId: "f2",
    number: "2.15",
    title: "Manejo de archivos adjuntos (fotos + PDFs)",
    description:
      "Habilitar la capacidad del agente para procesar fotos y PDFs que el usuario envía por WhatsApp. Incluye activar `file_upload: managed` en el config del bundle y crear el subagente `Analizar_Adjuntos` que identifica el contenido del archivo (describe fotos, extrae texto de PDFs) y continúa con la solicitud del usuario. Actualizar la REGLA GLOBAL M034 para que ya no rechace fotos/PDFs — solo audios y stickers piden que escriban.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 5,
    plannedStart: "2026-11-02",
    plannedEnd: "2026-11-04",
    dependencies: [],
    deliverables: [
      "config.file_upload: managed · subagente Analizar_Adjuntos · regla M034 actualizada",
    ],
    references: [],
    tags: ["ux", "capability"],
    status: "in-progress",
    progressPercent: 80,
  }),
  act({
    id: "2.17",
    phaseId: "f2",
    number: "2.17",
    title: "Evaluar el escalamiento antes de ofrecer un ejecutivo",
    description:
      "Unificar en una sola decisión cuándo Betty ofrece un ejecutivo y cuándo procede el pase. Betty consulta el criterio de escalamiento y el horario antes de ofrecer: si procede, ofrece; si es fuera de horario, informa el horario; si no procede, sigue ayudando sin ofrecer. Si la distribuidora acepta, se transfiere sin volver a evaluar. Requiere una consulta de sólo evaluación (sin envío de mensajes ni cambios en registros). Pendiente de ratificar alcance con los resultados de v41 (backlog FASE-B-09). Avance al 28-oct: Betty v39 (activa desde el 24-oct) ya consulta el criterio de escalamiento y el horario antes de ofrecer un ejecutivo, y si no procede sigue ayudando sin ofrecerlo. Pendiente: prueba en WhatsApp de la rama sin escalamiento, refresco del estado de escalamiento y la medición de ofertas.",
    owner: "Salesforce - FDE",
    collaborators: ["Betterware - UAT"],
    delegableToPartner: false,
    type: "Dev",
    week: 6,
    plannedStart: "2026-11-09",
    plannedEnd: "2026-11-13",
    actualStart: "2026-10-24",
    progressPercent: 40,
    status: "in-progress",
    dependencies: ["1.5.9"],
    deliverables: [
      "Consulta de sólo evaluación · ofertas de ejecutivo condicionadas a la decisión · pase sin reevaluación al aceptar · medición de ofertas hechas, aceptadas y transferidas",
    ],
    references: [],
    tags: ["escalamiento", "ux"],
  }),
  act({
    id: "2.11",
    phaseId: "f2",
    number: "2.11",
    title: "Weekly status report Fase 2",
    description:
      "Reporte ejecutivo semanal con avance de reemplazos, KPIs del A/B, hallazgos cerrados y riesgos vigentes. Enviado al Sponsor cada viernes.",
    owner: "Salesforce - FDE",
    collaborators: [],
    delegableToPartner: false,
    type: "Doc",
    week: 5,
    plannedStart: "2026-11-02",
    plannedEnd: "2026-11-13",
    dependencies: [],
    deliverables: ["3 reportes semanales (S5, S6, S7)"],
    references: [],
    tags: ["doc", "executive"],
  }),
  act({
    id: "2.12",
    phaseId: "f2",
    number: "2.12",
    title: "Partner internal testing (end of each week)",
    description:
      "El Partner ejecuta regresión sobre los reemplazos de la semana. Validación independiente de calidad antes de merge a main.",
    owner: "Partner",
    collaborators: ["Salesforce - FDE"],
    delegableToPartner: false,
    type: "Test",
    week: 5,
    plannedStart: "2026-11-02",
    plannedEnd: "2026-11-13",
    dependencies: [],
    deliverables: ["3 reportes de regresión del Partner"],
    references: [],
    tags: ["test", "partner"],
  }),
  act({
    id: "2.13",
    phaseId: "f2",
    number: "2.13",
    title: "Estabilización post-GA al 100% del tráfico",
    description:
      "Betty atiende el 100% del tráfico desde el GA del Mar 3-nov. Durante F2 se vigilan los KPIs después de cada reemplazo de acción (Error Rate, escalaciones, abandono) y se mantiene el rollback operativo al agente legacy por acción, no por porcentaje de tráfico.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Deploy",
    week: 5,
    plannedStart: "2026-11-02",
    plannedEnd: "2026-11-13",
    dependencies: ["1.5.9"],
    deliverables: ["KPIs estables al 100% tras cada reemplazo · rollback por acción documentado"],
    references: [],
    tags: ["ops", "ga"],
  }),
  act({
    id: "2.14",
    phaseId: "f2",
    number: "2.14",
    title: "Executive Review 4 — checkpoint medio",
    description:
      "Revisión ejecutiva al cierre de la semana 6 (mitad de Fase 2). Validar que el plan va encaminado, ajustar prioridades de reemplazo si surgieron riesgos nuevos.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner", "Betterware - Sponsor"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 6,
    plannedStart: "2026-11-06",
    plannedEnd: "2026-11-06",
    dependencies: ["2.5", "2.6", "2.7"],
    deliverables: ["Minuta ER4"],
    references: [],
    tags: ["executive"],
  }),

  // ============== FASE 3 — UAT FORMAL + BUGFIX (Lun 2026-11-23 → Vie 2026-12-04) ==============
  act({
    id: "3.1",
    phaseId: "f3",
    number: "3.1",
    title: "Test spec completo (~30 escenarios)",
    description:
      "Expandir el test spec con sf agent generate test-spec cubriendo cada gate, cada acción crítica y cada edge case documentado en el reporte. Objetivo: ~30 escenarios automatizados.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Test",
    week: 8,
    plannedStart: "2026-11-16",
    plannedEnd: "2026-11-18",
    dependencies: ["2.10"],
    deliverables: ["Test spec con 30+ escenarios · CI green"],
    references: [],
    tags: ["test"],
  }),
  act({
    id: "3.2",
    phaseId: "f3",
    number: "3.2",
    title: "Pruebas de seguridad (todos los SEC-* del PDF)",
    description:
      "Validar que cada hallazgo SEC-* del PDF deep-dive esté cerrado: SEC-1 (reset en transcript), SEC-2 (IDOR), SEC-3 (bleed Julieth), SEC-4 (URLs Drivin). Red team interno.",
    owner: "Salesforce - FDE",
    collaborators: [],
    delegableToPartner: false,
    type: "Test",
    week: 8,
    plannedStart: "2026-11-17",
    plannedEnd: "2026-11-19",
    dependencies: ["2.3"],
    deliverables: ["Reporte de seguridad · 0 hallazgos abiertos"],
    references: [],
    tags: ["security", "test"],
  }),
  act({
    id: "3.3",
    phaseId: "f3",
    number: "3.3",
    title: "Pruebas de carga/stress (2× peak de producción)",
    description:
      "Simular 2× el tráfico pico de producción (76k sesiones base → ~5k sesiones/día peak) contra el nuevo agente. Validar latencia, concurrencia y comportamiento bajo load.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Test",
    week: 8,
    plannedStart: "2026-11-18",
    plannedEnd: "2026-11-20",
    dependencies: ["3.1"],
    deliverables: ["Reporte de carga · thresholds documentados"],
    references: [],
    tags: ["test", "performance"],
  }),
  act({
    id: "3.4",
    phaseId: "f3",
    number: "3.4",
    title: "Pruebas de regresión completas",
    description:
      "Ejecutar la suite completa de tests (Apex + sf agent test + paridad) sobre todas las acciones. Objetivo: coverage ≥ 80% y 100% passing.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Test",
    week: 8,
    plannedStart: "2026-11-19",
    plannedEnd: "2026-11-20",
    dependencies: ["3.1"],
    deliverables: ["Suite regresión 100% green · coverage 80%+"],
    references: [],
    tags: ["test"],
  }),
  act({
    id: "3.5",
    phaseId: "f3",
    number: "3.5",
    title: "UAT formal completa con Betterware",
    description:
      "UAT estructurado y completo con equipo de Betterware. 20+ escenarios documentados con criterios de aceptación. Firma formal al cierre.",
    owner: "Betterware - UAT",
    collaborators: ["Salesforce - FDE", "Partner"],
    delegableToPartner: false,
    type: "Test",
    week: 8,
    plannedStart: "2026-11-18",
    plannedEnd: "2026-11-25",
    dependencies: ["3.1"],
    deliverables: ["UAT sign-off formal"],
    references: [],
    tags: ["uat", "critical-path"],
  }),
  act({
    id: "3.6",
    phaseId: "f3",
    number: "3.6",
    title: "Bugfix loop sobre bugs UAT",
    description:
      "Resolución de bugs reportados en UAT. Ciclo de dev-test-redeploy con priorización por severidad. Buffer de capacidad reservado para esta semana.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 9,
    plannedStart: "2026-11-23",
    plannedEnd: "2026-11-27",
    dependencies: ["3.5"],
    deliverables: ["0 bugs críticos abiertos al cierre"],
    references: [],
    tags: ["dev"],
  }),
  act({
    id: "3.7",
    phaseId: "f3",
    number: "3.7",
    title: "Pre-prod rehearsal 100%",
    description:
      "Deploy a producción con feature flag al 100% en un ambiente de staging para validar que todos los hooks funcionan sin sorpresas. Rollback drill final.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Deploy",
    week: 9,
    plannedStart: "2026-11-26",
    plannedEnd: "2026-11-27",
    dependencies: ["3.6"],
    deliverables: ["Rehearsal 100% exitoso · rollback drill validado"],
    references: [],
    tags: ["deploy", "critical-path"],
  }),
  act({
    id: "3.8",
    phaseId: "f3",
    number: "3.8",
    title: "Finalizar runbook, docs y dashboards",
    description:
      "Documentación operacional completa: runbook de incidentes, dashboards de monitoring, test coverage report, documentación de arquitectura actualizada. Avance al 28-oct: app Seguimiento Betty en producción con dashboard de sesiones (filtro por agente) y de distribuidoras Insiders, reportes FDE de sesiones por agente y de Insiders activas, seguimiento diario Betty vs BW_AGENT_N en PDF/Excel, y la Guía Maestra (137 pp) como documentación de arquitectura y operación.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Doc",
    week: 9,
    plannedStart: "2026-11-23",
    plannedEnd: "2026-11-27",
    actualStart: "2026-10-22",
    status: "in-progress",
    progressPercent: 40,
    dependencies: [],
    deliverables: ["Runbook · dashboards · docs completas"],
    references: [],
    tags: ["doc"],
  }),
  act({
    id: "3.9",
    phaseId: "f3",
    number: "3.9",
    title: "Executive Review 5 — go/no-go final 100%",
    description:
      "Decisión formal de activar el agente al 100% en producción. Review de métricas, UAT sign-off, criterios de estable y plan de contingencia.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner", "Betterware - Sponsor"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 9,
    plannedStart: "2026-11-27",
    plannedEnd: "2026-11-27",
    dependencies: ["3.5", "3.6", "3.7", "3.8"],
    deliverables: ["Minuta ER5 · aprobación 100% rollout"],
    references: [],
    tags: ["executive", "critical-path"],
  }),

  // ============== FASE 4 — GO-LIVE 100% + HANDOFF (Lun 2026-12-07 → Vie 2026-12-11) ==============
  act({
    id: "4.1",
    phaseId: "f4",
    number: "4.1",
    title: "Corte final: 100% de acciones en implementación propia",
    description:
      "Betty ya atiende el 100% del tráfico desde el GA (3-nov). Este corte final retira las últimas dependencias de acciones legacy en 48 horas: lunes se activan los reemplazos restantes, martes se confirma cero regresión. V40 queda solo como rollback de emergencia.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Betterware - IT Lead"],
    delegableToPartner: true,
    type: "Deploy",
    week: 10,
    plannedStart: "2026-11-30",
    plannedEnd: "2026-12-01",
    dependencies: ["3.9"],
    deliverables: ["100% de acciones de Betty sobre implementación propia"],
    references: [],
    tags: ["deploy", "critical-path"],
  }),
  act({
    id: "4.2",
    phaseId: "f4",
    number: "4.2",
    title: "War room primeras 48h post-cutover final",
    description:
      "Equipo completo disponible en war room para los primeros 2 días post-cutover 100%. Monitoreo minuto a minuto, decisiones rápidas de hotfix o rollback si aplica.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner", "Betterware - IT Lead"],
    delegableToPartner: false,
    type: "Ops",
    week: 10,
    plannedStart: "2026-11-30",
    plannedEnd: "2026-12-01",
    dependencies: ["4.1"],
    deliverables: ["Log del war room · decisiones documentadas"],
    references: [],
    tags: ["ops", "critical-path"],
  }),
  act({
    id: "4.3",
    phaseId: "f4",
    number: "4.3",
    title: "Monitoreo intensivo + hotfix",
    description:
      "Observación continua durante toda la semana de go-live. Resolución inmediata de bugs no detectados en UAT. Reportes diarios de salud.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Ops",
    week: 10,
    plannedStart: "2026-11-30",
    plannedEnd: "2026-12-04",
    dependencies: ["4.1"],
    deliverables: ["Reporte diario de salud (5 días)"],
    references: [],
    tags: ["ops"],
  }),
  act({
    id: "4.4",
    phaseId: "f4",
    number: "4.4",
    title: "Handoff training al equipo cliente",
    description:
      "Sesión formal de handoff: arquitectura, operación, debugging, deployment, extensión. Preguntas y respuestas con el equipo que mantendrá el agente post-FDE.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Betterware - IT Lead"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 10,
    plannedStart: "2026-12-03",
    plannedEnd: "2026-12-03",
    dependencies: ["4.3"],
    deliverables: ["Grabación training · deck handoff · Q&A"],
    references: [],
    tags: ["handoff"],
  }),
  act({
    id: "4.5",
    phaseId: "f4",
    number: "4.5",
    title: "Entrega formal de artefactos",
    description:
      "Entrega formal firmada: código en SFDX, test suite, runbook, dashboards, documentación de arquitectura, criterios de estable con evidencia.",
    owner: "Salesforce - FDE",
    collaborators: ["Betterware - IT Lead"],
    delegableToPartner: false,
    type: "Doc",
    week: 10,
    plannedStart: "2026-12-03",
    plannedEnd: "2026-12-04",
    dependencies: ["4.4"],
    deliverables: ["Acta de entrega firmada"],
    references: [],
    tags: ["handoff"],
  }),
  act({
    id: "4.6",
    phaseId: "f4",
    number: "4.6",
    title: "Deprecate V40",
    description:
      "V40 queda sólo como rollback de emergencia. Feature flag cerrado en nuevo agente. Comunicación formal al equipo de que V40 ya no es la versión activa.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Deploy",
    week: 10,
    plannedStart: "2026-12-04",
    plannedEnd: "2026-12-04",
    dependencies: ["4.3"],
    deliverables: ["V40 marcado como legacy"],
    references: [],
    tags: ["deploy"],
  }),
  act({
    id: "4.7",
    phaseId: "f4",
    number: "4.7",
    title: "Executive Review 6 — cierre del proyecto",
    description:
      "Review final: criterios de estable verificados, lecciones aprendidas, próximos pasos sugeridos, cierre formal del engagement.",
    owner: "Shared",
    collaborators: [
      "Salesforce - FDE",
      "Salesforce - CSM",
      "Salesforce - AE",
      "Partner",
      "Betterware - Sponsor",
    ],
    delegableToPartner: false,
    type: "Mgmt",
    week: 10,
    plannedStart: "2026-12-04",
    plannedEnd: "2026-12-04",
    dependencies: ["4.5", "4.6"],
    deliverables: ["Minuta ER6 · acta de cierre"],
    references: [],
    tags: ["executive", "critical-path"],
  }),
  act({
    id: "4.8",
    phaseId: "f4",
    number: "4.8",
    title: "QBR + next steps comerciales",
    description:
      "Reunión con el Account Executive y Customer Success Manager. Review ejecutivo del proyecto, NPS, próximos proyectos u oportunidades identificadas (Data Cloud expansion, monitoring premium, otros agentes).",
    owner: "Shared",
    collaborators: [
      "Salesforce - AE",
      "Salesforce - CSM",
      "Betterware - Sponsor",
    ],
    delegableToPartner: false,
    type: "Mgmt",
    week: 10,
    plannedStart: "2026-12-04",
    plannedEnd: "2026-12-04",
    dependencies: ["4.7"],
    deliverables: ["Minuta QBR · próximos pasos comerciales"],
    references: [],
    tags: ["commercial", "cs"],
  }),
  act({
    id: "4.9",
    phaseId: "f4",
    number: "4.9",
    title: "Alinear botones interactivos del canal con Betty",
    description:
      "Detectado en pruebas de v25 (sesión 01a1407d-ae4c-7b50-afd2-c98c9f8dc9ed del 15-oct). El canal SCRT2 - WhatsApp renderiza botones interactivos cuando Betty ofrece opciones múltiples (ej. 'Saldo de cuenta principal / Saldo de monedero / Ambos saldos'). Cuando el distribuidor tapea un botón, el canal envía el payload numérico (ej. '2') en vez del label, y Betty responde como si fuera un mensaje ambiguo. Dos opciones: (A) desactivar la auto-generación de botones a nivel canal/Enhanced Messaging para que Betty responda y reciba solo texto; o (B) enseñar a Betty a interpretar dígitos cortos como selección de la última lista ofrecida. Decisión y aplicación quedan post-cutover para no mover superficie durante el pilot.",
    owner: "Salesforce - FDE",
    collaborators: ["Betterware - IT Lead", "Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 10,
    plannedStart: "2026-12-07",
    plannedEnd: "2026-12-09",
    dependencies: [],
    deliverables: ["Comportamiento alineado · botones ↔ reasoning de Betty sin desalineo de payload"],
    references: [],
    tags: ["ux", "channel", "post-ga"],
  }),
  act({
    id: "4.10",
    phaseId: "f4",
    number: "4.10",
    title: "Duplicar actions propia/linaje para determinismo total",
    description:
      "Riesgo residual del fix aplicado el 16-oct sobre V_CodigoLinaje (sesión 01a1407d-ae4c-7b50-afd2-c98c9f8dc9ed). La Salida A elegida introduce varCodigoLinajeAuth validada por validar_linaje y una action prep_consulta_propia que resetea el contexto cuando el user pide algo propio después de haber consultado linaje. El determinismo depende de que el LLM invoque prep_consulta_propia correctamente. Si falla, el wiring hardcoded sigue pasando varCodigoLinajeAuth y el flow interpreta linaje. Salida B (determinística) requiere duplicar 27 actions en variantes _propio (solo v_CodigoDistribuidor) y _linaje (ambos códigos, available when varCodigoLinajeAuth != ''). Alcance de duplicación por dominio: AccountAndInfo (altas_asociados, clasificacion_venta_acumulada, consultar_asociados_data_cloud, estado_alta_distribuidora, facturacion_garantia_entrega, fecha_activacion, informacion_comercial_general, informacion_distribuidor, limite_credito_liberado, reclutas_referidos, venta_por_catalogo). PaymentsAndFinance (consultar_convenio_cobranza, consultar_pagos, descuentos_esta_semana, descuentos_por_semana, detalle_descuentos, saldo_restante). OrdersAndDelivery (consultar_bodega, devoluciones_bwplus, guia_paqueteria, recoger_devolucion, revision_bonificacion, revision_reenvio, tracking_drivin, venta_retenida). RewardsAndLoyalty (premios_drivin, traspasos). Decisión final (A permanente vs upgrade a B) depende de telemetría del pilot: si STDM muestra falsos positivos de linaje tras consulta propia, escalamos a B.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 10,
    plannedStart: "2026-12-07",
    plannedEnd: "2026-12-10",
    dependencies: [],
    deliverables: ["Decisión A permanente vs B upgrade", "54 actions duplicadas (opcional)"],
    references: [],
    tags: ["linaje", "determinism", "post-ga"],
  }),
];

// ============================================================================
// MILESTONES
// ============================================================================

const MILESTONES: Milestone[] = [
  {
    id: "kickoff_internal_prep",
    title: "Preparación interna + materiales partner",
    description:
      "Sesión interna del equipo FDE para validar plan comprimido, construir adapters y preparar deck ejecutivo para presentar al Partner el lunes.",
    date: "2026-10-04",
    kind: "Internal Review",
    phaseId: "f0",
    participants: ["Salesforce - FDE", "Salesforce - CSM", "Salesforce - AE"],
    status: "scheduled",
    references: [],
  },
  {
    id: "partner_review",
    title: "Inicio pruebas · Agente · Salesforce + Partner",
    description:
      "Lunes 05-oct AM. Sesión de alineación Salesforce + Capptus (deck Alineación Betty + demo en vivo del agente) y arranque de la ventana de pruebas conjuntas sobre FDE_BW_Service_Agent en sandbox. Objetivo: aceptación del plan por parte de Capptus, confirmación de la ventana de pruebas 06-08 oct y cierre de fecha de entrega de insumos del proyecto.",
    date: "2026-10-05",
    kind: "Kick-off",
    phaseId: "f0",
    participants: ["Salesforce - FDE", "Partner", "Salesforce - CSM"],
    status: "scheduled",
    references: [
      {
        label: "Deck Alineación Betty · Salesforce + Capptus",
        url: "/Customers/Betterware/files/Presentacion_Partner_FDE.html",
        kind: "document",
      },
    ],
  },
  {
    id: "kickoff",
    title: "Kick-off ejecutivo oficial",
    description:
      "Arranque formal con Partner y Betterware. Confirmación de scope del cutover 16-oct, roles, disponibilidad y cadencia.",
    date: "2026-10-06",
    kind: "Kick-off",
    phaseId: "f1",
    participants: [
      "Salesforce - FDE",
      "Salesforce - AE",
      "Partner",
      "Betterware - Sponsor",
      "Betterware - IT Lead",
    ],
    status: "scheduled",
    references: [
      {
        label: "Deck Kick-off ejecutivo · Betterware + Jafra",
        url: "/Customers/Betterware/files/Presentacion_Kickoff_Betterware.html",
        kind: "document",
      },
      {
        label: "Programa Insiders · Betty",
        url: "/Customers/Betterware/files/Programa_Insiders_Betty.html",
        kind: "document",
      },
    ],
  },
  {
    id: "uat_inicio",
    title: "Inicio UAT · Betterware prueba el agente",
    description:
      "Jueves 08-oct. Arranque de la ventana de UAT con el equipo de Betterware (2-3 personas). Script documentado con 15+ escenarios + criterios de aceptación por cada uno. Incluye casos edge del reporte de descubrimientos. La ventana corre del 08 al 10-oct; al cierre firma formal o lista cerrada de bugs.",
    date: "2026-10-08",
    kind: "UAT Session",
    phaseId: "f1",
    participants: ["Betterware - UAT", "Salesforce - FDE", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "insiders_prep_inicio",
    title: "Inicio preparación Programa Insiders",
    description:
      "Lunes 12-oct. Arranque de la preparación operativa del Programa Insiders. Betterware cura la lista final de 15-25 distribuidoras aliadas con perfiles representativos; se marca a cada MessagingEndUser con el checkbox FDE_Pilot__c. Preparación de comunicación interna y materiales de soporte para las distribuidoras del piloto.",
    date: "2026-10-12",
    kind: "Internal Review",
    phaseId: "f1",
    participants: ["Salesforce - FDE", "Partner", "Betterware - Sponsor", "Betterware - UAT"],
    status: "scheduled",
    references: [
      {
        label: "Programa Insiders · Betty",
        url: "/Customers/Betterware/files/Programa_Insiders_Betty.html",
        kind: "document",
      },
    ],
  },
  {
    id: "approval_publish",
    title: "Approval para Publish + Activate",
    description:
      "Jueves 15-oct. Approval formal firmado para publicar FDE_BW_Service_Agent como bot activo en producción. Incluye verificación final del Flow FDE_BW_RouteAgent activo + smoke test del transfer-to-bot en WhatsApp de producción con un número del piloto marcado. Rollback drill validado.",
    date: "2026-10-15",
    kind: "Executive Review",
    phaseId: "f1",
    participants: ["Salesforce - FDE", "Partner", "Betterware - Sponsor", "Betterware - IT Lead"],
    status: "completed",
    outcome:
      "Publish + activate ejecutados 2026-10-15 sobre FDE_BW_Service_Agent_V2. BotVersion v25 activa en Betterware-Prod. Validate del bundle OK. Preview session confirmó state machine de autenticación funcional (código inválido → oferta de login alternativo sin exponer referencia bancaria, paridad V42).",
    references: [],
  },
  {
    id: "snapshot-16-oct",
    title: "📊 Snapshot Semanal · Reporte de avances",
    description:
      "Vie 16-oct · publicación del snapshot ejecutivo de 1 página con el estado del agente al cierre de la semana (12 al 16 de octubre). Primer reporte de la cadencia semanal de los viernes. Formato institucional Salesforce FDE con progreso de fase, Etapa 1 y global, entregables de la semana, valor para el negocio y gauge radial del avance del Reporte de Descubrimientos (110 hallazgos).",
    date: "2026-10-16",
    kind: "Internal Review",
    phaseId: "f1",
    participants: ["Salesforce - FDE", "Betterware - Sponsor", "Betterware - IT Lead"],
    status: "completed",
    outcome:
      "Snapshot publicado en el portal de Laila. Formato de referencia para la cadencia semanal de los viernes y plantilla homologada para Jafra.",
    references: [
      {
        label: "Snapshot Semanal · 16-oct (PDF)",
        url: "/Customers/Betterware/files/Snapshot_Viernes_2026_10_16.pdf",
        kind: "document",
      },
    ],
  },
  {
    id: "cutover",
    title: "🚀 CUTOVER — Programa Insiders arranque formal",
    description:
      "Jue 22-oct. Salida formal del Programa Insiders con la cohorte de distribuidoras aliadas (MessagingEndUser.FDE_Pilot__c=true) tomando tráfico real en WhatsApp productivo sobre Betty v38, tras la ventana de pruebas internas y aceptación 16-21 oct.",
    date: "2026-10-22",
    kind: "Go-live",
    phaseId: "f1_5",
    participants: [
      "Salesforce - FDE",
      "Partner",
      "Betterware - IT Lead",
      "Betterware - Sponsor",
    ],
    status: "completed",
    outcome:
      "Salida formal ejecutada el Jue 22-oct con la cohorte de Insiders sobre Betty v38.",
    references: [],
  },
  {
    id: "snapshot-23-oct",
    title: "📊 Snapshot Semanal · Reporte de avances",
    description:
      "Vie 23-oct · snapshot ejecutivo de 1 página con el estado del agente al cierre de la semana (19 al 23 de octubre): salida con Insiders, aceptación formal de Betterware, 10 versiones de mejora (v28 → v38) y app Seguimiento Betty en Salesforce.",
    date: "2026-10-23",
    kind: "Internal Review",
    phaseId: "f1_5",
    participants: ["Salesforce - FDE", "Betterware - Sponsor", "Betterware - IT Lead"],
    status: "completed",
    outcome:
      "Snapshot publicado en el portal de Laila · segundo reporte de la cadencia semanal de los viernes.",
    references: [
      {
        label: "Snapshot Semanal · 23-oct (PDF)",
        url: "/Customers/Betterware/files/Snapshot_Viernes_2026_10_23.pdf",
        kind: "document",
      },
    ],
  },
  {
    id: "escalada_20",
    title: "Escalada al 20%",
    description:
      "Ejecutada el Mar 27-oct: 20,377 MessagingEndUser del WhatsApp de Betty marcados con FDE_Insider__c por sorteo determinista, más las 256 elegidas por Betterware (~20% del canal). Plan original: Lunes 26-oct. Si los KPIs de los primeros días de Insiders (jue 22 → dom 25) son verdes, se marcan más MessagingEndUser con FDE_Pilot__c para subir la cohorte al 20%. Escalada siguiente: 50% (28-oct) → 80% (2-nov) → GA (3-nov).",
    date: "2026-10-26",
    kind: "Go-live",
    phaseId: "f1_5",
    participants: ["Salesforce - FDE", "Partner", "Betterware - IT Lead"],
    status: "completed",
    references: [],
  },
  {
    id: "escalada_50",
    title: "Escalada al 50%",
    description:
      "Miércoles 28-oct. Incremento de 20% a 50% si los KPIs del día previo se mantuvieron verdes.",
    date: "2026-10-28",
    kind: "Go-live",
    phaseId: "f1_5",
    participants: ["Salesforce - FDE", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "escalada_80",
    title: "Escalada al 80%",
    description:
      "Lunes 2-nov. Incremento de 50% a 80% si los KPIs del día previo se mantuvieron verdes. Último escalón antes del salto a GA.",
    date: "2026-11-02",
    kind: "Go-live",
    phaseId: "f1_5",
    participants: ["Salesforce - FDE", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "deck_golive_insiders",
    title: "🚀 Go-Live Insiders · Betty v38",
    description:
      "Arranque formal del Programa Insiders con Betty v38 publicada en producción. Firma consolidada EVAL-000021 (SÍ · LISTA PARA ARRANCAR) + 22 Insiders activos con sesión registrada + dashboard de seguimiento disponible en Salesforce (app Seguimiento Betty).",
    date: "2026-10-22",
    kind: "Go-live",
    phaseId: "f1_5",
    participants: [
      "Salesforce - FDE",
      "Partner",
      "Betterware - Sponsor",
    ],
    status: "completed",
    outcome:
      "Deck publicado en el portal y salida con Insiders ejecutada el 22-oct.",
    references: [
      {
        label: "Deck · Go-Live Insiders · 22-oct",
        url: "/Customers/Betterware/files/Deck_GoLive_Insiders_22oct.pdf",
        kind: "document",
      },
    ],
  },
  {
    id: "ga",
    title: "🎯 GA · Flujo total General Available",
    description:
      "Martes 3-nov. Salto a 100% · flujo total: el agente nuevo (FDE_BW_Service_Agent) queda como el flujo general para todas las distribuidoras — ya no limitado a la cohorte Insiders marcada con FDE_Insider__c. Review ejecutivo final con el Sponsor para firmar GA y aprobar la entrada a Fase 2 (reemplazo gradual de acciones legacy).",
    date: "2026-11-03",
    kind: "Go-live",
    phaseId: "f1_5",
    participants: [
      "Salesforce - FDE",
      "Partner",
      "Betterware - Sponsor",
      "Betterware - IT Lead",
    ],
    status: "scheduled",
    references: [],
  },
  {
    id: "er3",
    title: "ER3 — firma de GA + go/no-go reemplazo",
    description:
      "Review ejecutivo al cierre del ciclo Insiders → GA (Mar 3-nov). Firma formal de GA y decisión de entrar a Fase 2 (reemplazo gradual de acciones legacy) o ajustar según evidencia.",
    date: "2026-11-03",
    kind: "Executive Review",
    phaseId: "f1_5",
    participants: ["Shared"],
    status: "scheduled",
    references: [],
  },
  {
    id: "er4",
    title: "ER4 — checkpoint medio F2",
    description: "Checkpoint ejecutivo a mitad de la Fase 2 (reemplazo gradual).",
    date: "2026-11-06",
    kind: "Executive Review",
    phaseId: "f2",
    participants: ["Shared"],
    status: "scheduled",
    references: [],
  },
  {
    id: "uat_formal_final",
    title: "UAT formal completa con Betterware",
    description:
      "UAT estructurada y completa con 20+ escenarios. Validación final del agente ya con todas las acciones críticas en código propio.",
    date: "2026-11-18",
    kind: "UAT Session",
    phaseId: "f3",
    participants: ["Betterware - UAT", "Salesforce - FDE", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "er5",
    title: "ER5 — go/no-go cierre F3",
    description:
      "Decisión formal de cerrar F3 y pasar a estabilización + handoff.",
    date: "2026-11-27",
    kind: "Executive Review",
    phaseId: "f3",
    participants: ["Shared"],
    status: "scheduled",
    references: [],
  },
  {
    id: "golive_100",
    title: "Estabilización final + handoff",
    description:
      "Cierre operativo del engagement con criterios de estable verificados y runbook entregado a Betterware + Partner.",
    date: "2026-11-30",
    kind: "Go-live",
    phaseId: "f4",
    participants: ["Shared"],
    status: "scheduled",
    references: [],
  },
  {
    id: "er6",
    title: "ER6 — cierre del proyecto",
    description:
      "Review final: criterios de estable verificados, lecciones aprendidas, cierre formal del engagement.",
    date: "2026-12-04",
    kind: "Executive Review",
    phaseId: "f4",
    participants: ["Shared"],
    status: "scheduled",
    references: [],
  },
  {
    id: "qbr",
    title: "QBR + next steps comerciales",
    description:
      "Reunión con AE y CSM para review ejecutivo del proyecto y oportunidades identificadas.",
    date: "2026-12-04",
    kind: "QBR",
    phaseId: "f4",
    participants: ["Salesforce - AE", "Salesforce - CSM", "Betterware - Sponsor"],
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
    title: "Partner no entrega wiring de _Ctrl a tiempo",
    description:
      "Si el Partner no documenta y provee acceso al código legacy a tiempo, se retrasa la Fase 1.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Adapters FDE cubren F1 sin dependencia dura del Partner. Se puede empezar con introspección del código ya accesible en el sandbox.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f1",
    references: [],
  },
  {
    id: "R2",
    title: "QUEUE_MAP real no disponible",
    description:
      "Si Betterware no provee los BusinessHours IDs reales por cola, el fix B-1 queda incompleto.",
    probability: "Medium",
    impact: "Medium",
    mitigation:
      "Fail-open por default con copia explícita informando ventana genérica. Permite deploy sin bloquear.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f1",
    references: [],
  },
  {
    id: "R3",
    title: "UAT descubre bug crítico tardío",
    description:
      "Un bug no detectado antes del UAT formal puede retrasar el go-live.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Buffer completo de S9 reservado para bugfix. Pre-prod rehearsal temprano.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f3",
    references: [],
  },
  {
    id: "R4",
    title: "Modelo del org no es GPT-4.1",
    description:
      "File upload managed requiere GPT-4.1 (caveat oficial). Si Betterware corre GPT-4o, el feature no está disponible. MITIGADO 13-oct-2026 vía actividad 2.16 — se fijó explícitamente model_config: model://sfdc_ai__DefaultGPT41 a nivel del bundle, independiente del default del org.",
    probability: "High",
    impact: "Low",
    mitigation:
      "Hecho: pinned el modelo a sfdc_ai__DefaultGPT41 en el bundle del agente (actividad 2.16). El default del org deja de ser dependencia dura.",
    owner: "Betterware - IT Lead",
    status: "mitigated",
    phaseId: "f2",
    references: [],
  },
  {
    id: "R5",
    title: "A/B muestra regresión en algún KPI",
    description:
      "El nuevo agente puede comportarse peor que V40 en algún subset de intents no cubierto en pruebas internas.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Rollback automático si Error Rate > 2% o Abandon crece > 10 pp. Daily standup en semana A/B.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f1_5",
    references: [],
  },
  {
    id: "R6",
    title: "Policy de reset de contraseña no se decide",
    description:
      "La política de entrega del reset link (email/SMS/combinación) requiere decisión de Betterware.",
    probability: "Medium",
    impact: "Medium",
    mitigation:
      "Entrega por email registrado como default. Policy puede evolucionar sin bloquear.",
    owner: "Betterware - Sponsor",
    status: "active",
    phaseId: "f2",
    references: [],
  },
  {
    id: "R7",
    title: "Baseline de dashboard no disponible",
    description:
      "Si Agent Analytics no permite particionar por versión del agente, no hay comparación A/B directa.",
    probability: "Low",
    impact: "Medium",
    mitigation:
      "Reconstruir baseline en S1 con exports CSV. Separar por horario si no por versión.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f0",
    references: [],
  },
  {
    id: "R8",
    title: "Partner no disponible para review lunes 05-oct",
    description:
      "El Partner podría no estar disponible para la presentación del lunes, poniendo en riesgo el commit previo al kick-off oficial del martes.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Grabación del agente funcionando en el sandbox + deck ejecutivo + acceso compartido a Setup del sandbox. Partner valida asíncrono y confirma el martes AM antes del kick-off.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f0",
    references: [],
  },
  {
    id: "R9",
    title: "UAT descubre bug crítico mié/jue y bloquea cutover 16-oct",
    description:
      "Si el UAT formal del 13-14 oct o el bugfix del 14-15 oct no cierra los defects críticos, el cutover del viernes 16-oct queda comprometido.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "24h de buffer el jueves 15-oct para absorber hotfixes. Plan de contingencia: deploy a prod con flag OFF se mantiene y cutover se desliza al lunes 19-oct sin perder scope.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f1",
    references: [],
  },
  {
    id: "R10",
    title: "Feature flag en WhatsApp Enhanced Messaging no configurable por routing nativo",
    description:
      "El canal WhatsApp vía Enhanced Messaging puede no soportar routing nativo por porcentaje al nuevo agente, bloqueando la activación controlada del cutover.",
    probability: "Medium",
    impact: "High",
    mitigation:
      "Usar `BloquearFunciones` como kill-switch o controlar el % desde el Messaging Deployment del Partner (requiere coordinación con Partner en F0). Validar mecanismo en pre-prod deploy antes del ER2.",
    owner: "Salesforce - FDE",
    status: "active",
    phaseId: "f1",
    references: [],
  },
];

// ============================================================================
// STABLE CRITERIA
// ============================================================================

const STABLE_CRITERIA: StableCriterion[] = [
  {
    id: "sc_producto",
    dimension: "Producto",
    criterion:
      "Deflection ≥ 30% · Escalation ≤ 30% · Abandon ≤ 20% · Success ≥ 65% · Avg Interactions/Session ≤ 4.5 (30 días post-cutover en Agent Analytics)",
    status: "pending",
    references: [],
  },
  {
    id: "sc_seguridad",
    dimension: "Seguridad",
    criterion:
      "Hallazgos 03, 04, 05, 06 cerrados en código · hallazgo 07 remediado (0 Apex without sharing en acciones de datos) · 0 Flows en SystemModeWithoutSharing sin justificación documentada",
    status: "pending",
    references: [],
  },
  {
    id: "sc_operacion",
    dimension: "Operación",
    criterion:
      "Error Rate < 0.5% · 0 fault-swallow en acciones críticas · 20 Flows con faultConnector en Record Lookup y Action Call críticos · retry/timeout alineado con MuleSoft client",
    status: "pending",
    references: [],
  },
  {
    id: "sc_mantenibilidad",
    dimension: "Mantenibilidad",
    criterion:
      "100% del .agent + acciones bajo ownership del cliente · versionado SFDX con PR review · CI con tests automáticos (coverage ≥ 80%) · 0 referencias huérfanas · spec maestro aprobado",
    status: "pending",
    references: [],
  },
  {
    id: "sc_observabilidad",
    dimension: "Observabilidad",
    criterion:
      "Dashboards de los 4 KPIs + health · alertas sobre thresholds críticos · runbook en el repo · handoff training completado",
    status: "pending",
    references: [],
  },
];

// ============================================================================
// STATUS UPDATES (histórico, se agregan semanalmente)
// ============================================================================

const STATUS_UPDATES: StatusUpdate[] = [
  {
    id: "status-2026-10-12",
    weekOf: "2026-10-12",
    author: "Salesforce - FDE",
    overallHealth: "green",
    phaseId: "f1_5",
    highlights: [
      "Rework V42 completado: 9 subagentes core con reasoning expandido para paridad funcional con las 349 instrucciones productivas (26 topics).",
      "Publish de v24 y v25 ejecutado 2026-10-15. BotVersion v25 activa en Betterware-Prod.",
      "Cutover técnico anticipado 1 día (plan original 16-oct): Insiders Salesforce + Betterware ya reciben tráfico de v25 en WhatsApp productivo.",
      "Validate del bundle OK. State machine de autenticación confirmado en preview (código inválido → oferta de login alternativo sin exponer referencia bancaria, paridad V42).",
    ],
    nextWeek: [
      "Pruebas internas Salesforce + Betterware sobre v25 con la cohorte Insiders inicial.",
      "Esperar sign-off de Betterware antes de escalar la cohorte a más distribuidoras.",
      "Monitoreo de regresiones vs V42 en los flujos de saldos, descuentos, pagos, puntos.",
    ],
    activeBlockers: [],
    activeRisks: ["R2", "R6"],
    references: [],
  },
  {
    id: "status-2026-10-19",
    weekOf: "2026-10-19",
    author: "Salesforce - FDE",
    overallHealth: "green",
    phaseId: "f1",
    highlights: [
      "Replan del Programa Insiders: inicio formal recorrido de Vie 16-oct a Lun 19-oct. Esta semana (16-18 oct) seguimos en Fase 1 con pruebas internas Salesforce + Betterware sobre v25.",
      "Observabilidad habilitada vía telemetría del org (sin ECA/JWT): podemos reconstruir cualquier sesión reportada contra los DMOs ssot__AiAgentSession__dlm / Interaction / Step / Message con SOQL directo.",
      "Diagnóstico de la sesión 01a1407d-ae4c-7b50-afd2-c98c9f8dc9ed del 15-oct: V_CodigoLinaje se contaminaba durante autenticación porque el router invocaba setCodigoLinaje con el código de auth. Fix estructural aplicado.",
      "Nuevo flow propio FDE_ValidarLinaje (clon de Partner) con output varCodigoValidado determinístico. Nueva variable varCodigoLinajeAuth en el agente que solo se puebla con códigos validados. 24 wirings cross-dominio apuntan al código validado, no al intento.",
      "Fix adicional: setCodigoLinaje queda estructuralmente bloqueado hasta isAuthenticated=True. Reset de V_CodigoLinaje en auth success. Nueva action prep_consulta_propia por subagente para purgar contexto en el cambio linaje → propia.",
      "Backlog etapa 2 documentado en actividades 4.9 (botones interactivos del canal) y 4.10 (duplicación de 27 actions en variantes propia/linaje si la telemetría del pilot muestra que la limpieza no basta).",
    ],
    nextWeek: [
      "Lun 19-oct AM: cutover formal del Programa Insiders — cohorte inicial de distribuidoras aliadas marcadas con FDE_Pilot__c tomando tráfico real sobre v26 (con fix de linaje publicado).",
      "Preview + pruebas del fix de linaje antes del lunes · validación de los 5 casos clave (linaje válido, inválido, múltiple, linaje→propia, auth con código propio).",
      "Monitoreo de la primera jornada completa de Insiders con rollback operativo listo (desmarcar FDE_Pilot__c).",
    ],
    activeBlockers: [],
    activeRisks: ["R2", "R6"],
    references: [],
  },
];

// ============================================================================
// EXPORT
// ============================================================================

export const betterwarePlan: BetterwarePlan = {
  slug: "betterware",
  projectName: "FDE_BW_Service_Agent",
  kickoffDate: "2026-10-06",
  endDate: "2026-12-04",
  phases: PHASES,
  activities: ACTIVITIES,
  milestones: MILESTONES,
  risks: RISKS,
  stableCriteria: STABLE_CRITERIA,
  statusUpdates: STATUS_UPDATES,
  stages: [
    {
      id: "etapa_1",
      number: 1,
      name: "Eficacia",
      subtitle: "Go-live con cohorte Insiders → GA",
      phaseIds: ["f0", "f1", "f1_5"],
      startLabel: "Kickoff 06-oct",
      endLabel: "GA 03-nov",
    },
    {
      id: "etapa_2",
      number: 2,
      name: "Eficacia + Eficiencia",
      subtitle: "Reemplazo total · entrega final",
      phaseIds: ["f2", "f3", "f4"],
      startLabel: "Arranque 02-nov",
      endLabel: "Entrega 04-dic",
    },
  ],
};

// ============================================================================
// COMPUTED HELPERS
// ============================================================================

export function phaseProgress(plan: BetterwarePlan, phaseId: string): number {
  const activities = plan.activities.filter((a) => a.phaseId === phaseId);
  if (activities.length === 0) return 0;
  const sum = activities.reduce((acc, a) => acc + a.progressPercent, 0);
  return Math.round(sum / activities.length);
}

export function phaseStatus(plan: BetterwarePlan, phaseId: string): ActivityStatus {
  const activities = plan.activities.filter((a) => a.phaseId === phaseId);
  if (activities.length === 0) return "not-started";
  if (activities.some((a) => a.status === "blocked")) return "blocked";
  if (activities.every((a) => a.status === "done")) return "done";
  if (activities.some((a) => a.status === "in-progress" || a.status === "done"))
    return "in-progress";
  return "not-started";
}

export function globalProgress(plan: BetterwarePlan): number {
  if (plan.activities.length === 0) return 0;
  const sum = plan.activities.reduce((acc, a) => acc + a.progressPercent, 0);
  return Math.round(sum / plan.activities.length);
}

export function currentPhase(
  plan: BetterwarePlan,
  today: ISODate = new Date().toISOString().slice(0, 10),
): Phase | null {
  const active = plan.phases.find(
    (p) => today >= p.startDate && today <= p.endDate,
  );
  if (active) return active;
  // Pre-kickoff: devolver la primera fase. Post-end: la última.
  if (today < plan.phases[0].startDate) return plan.phases[0];
  return plan.phases[plan.phases.length - 1];
}

export function upcomingMilestones(
  plan: BetterwarePlan,
  today: ISODate = new Date().toISOString().slice(0, 10),
  limit = 3,
): Milestone[] {
  return plan.milestones
    .filter((m) => m.date >= today && m.status === "scheduled")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

export function overallHealth(plan: BetterwarePlan): HealthColor {
  const activeBlockers = plan.activities.flatMap((a) =>
    a.blockers.filter((b) => !b.resolvedDate),
  );
  const activeRisks = plan.risks.filter(
    (r) => r.status === "active" && r.impact === "High",
  );
  if (activeBlockers.length > 2 || activeRisks.length > 2) return "red";
  if (activeBlockers.length > 0 || activeRisks.length > 0) return "yellow";
  return "green";
}
