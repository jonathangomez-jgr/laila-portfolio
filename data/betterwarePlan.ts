// ============================================================================
// Betterware · FDE_BW_Service_Agent — Plan de reconstrucción (COMPRIMIDO)
// Arranque: Dom 2026-10-04 · Cutover 5%: Vie 2026-10-16 · Go-live 100%: Vie 2026-12-11
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
    endDate: "2026-10-15",
    requires: [
      "F0 cerrada · alineación con Capptus confirmada",
      "Insumos del proyecto entregados por Capptus (docs, requerimientos, escenarios, datos de prueba)",
      "Capptus disponible para pruebas conjuntas 06-08 oct",
      "Betterware UAT disponible 08-10 oct",
      "Permissions de deploy a producción confirmados",
    ],
    outcome:
      "20+ escenarios pasando · UAT sign-off de Betterware · lista de 15-25 Insiders marcada en MessagingEndUser · agente publicado en producción.",
    gate:
      "Approval firmado (Jue 15-oct) · publish + activate del FDE_BW_Service_Agent en producción.",
    color: "#00B3FF",
  },
  {
    id: "f1_5",
    number: 1.5,
    title: "Programa Insiders · Cutover 10% → GA",
    shortLabel: "F1.5 · Insiders → GA",
    description:
      "Arranque Vie 16-oct AM con el 10% inicial de la lista de Insiders. Escalada diaria de +10% a partir del lunes 19 (20% → 30% → 40% → 50%) hasta el viernes 23-oct donde el agente nuevo pasa a flujo general (GA · 100%). 1 semana de observación intensiva con daily standups y monitoreo de conversaciones.",
    objective:
      "Pasar de piloto cerrado a flujo general en 1 semana, con evidencia dura día a día de que el nuevo agente mejora KPIs vs BW_AGENT_N, y rollback inmediato (desmarcar FDE_Pilot__c) ante cualquier regresión significativa.",
    startDate: "2026-10-16",
    endDate: "2026-10-23",
    requires: [
      "F1 cerrada · Approval publish firmado",
      "Lista de 15-25 Insiders curada y marcada en MessagingEndUser",
      "Dashboards de KPIs operativos con split por versión del agente",
      "Rollback operativo validado (desmarcar FDE_Pilot__c)",
    ],
    outcome:
      "Agente nuevo en GA (100% del tráfico), KPIs comparados contra baseline del agente actual, aprendizajes documentados para la Fase 2.",
    gate:
      "Executive Review 3 (Vie 23-oct) · firma de GA + aprobar entrar a reemplazo gradual de acciones.",
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
    startDate: "2026-10-26",
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

  // ============== FASE 1.5 — A/B PRODUCCIÓN (Vie 2026-10-16 → Vie 2026-10-30) ==============
  act({
    id: "1.5.1",
    phaseId: "f1_5",
    number: "1.5.1",
    title: "🚀 CUTOVER: Programa Insiders al 10%",
    description:
      "Viernes 16-oct AM: arranque del Programa Insiders en producción con el 10% inicial de la lista cerrada (primeras distribuidoras marcadas con MessagingEndUser.FDE_Pilot__c = true). Equipo completo en war room para los primeros 90 minutos monitoreando conversaciones minuto a minuto. Si Error Rate > 2% o Abandon crece > 10 pp en primera hora: rollback inmediato desmarcando el checkbox en las distribuidoras activas.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Betterware - IT Lead", "Betterware - Sponsor"],
    delegableToPartner: false,
    type: "Deploy",
    week: 2,
    plannedStart: "2026-10-16",
    plannedEnd: "2026-10-16",
    dependencies: ["1.7"],
    deliverables: ["Programa Insiders activo al 10% · primeros KPIs capturados"],
    references: [],
    tags: ["deploy", "cutover", "critical-path"],
  }),
  act({
    id: "1.5.2",
    phaseId: "f1_5",
    number: "1.5.2",
    title: "War room primeras 48h",
    description:
      "Equipo completo disponible en war room viernes 16 y sábado 17: FDE, Partner, Betterware IT Lead. Monitoreo minuto a minuto, decisiones rápidas de hotfix o rollback. Reporte cada 4 horas al Sponsor con snapshot de KPIs.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner", "Betterware - IT Lead"],
    delegableToPartner: false,
    type: "Ops",
    week: 2,
    plannedStart: "2026-10-16",
    plannedEnd: "2026-10-17",
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
      "Standup diario de 15 min con FDE + Partner + Betterware IT Lead durante la ventana de escalada lunes 19 → viernes 23. Agenda fija: KPIs del día anterior, blockers vigentes, hotfixes necesarios, decisión de escalar al siguiente % o mantener.",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner", "Betterware - IT Lead"],
    delegableToPartner: false,
    type: "Mgmt",
    week: 3,
    plannedStart: "2026-10-19",
    plannedEnd: "2026-10-23",
    dependencies: ["1.5.2"],
    deliverables: ["5 minutas de standup"],
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
    week: 2,
    plannedStart: "2026-10-16",
    plannedEnd: "2026-10-23",
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
      "Lunes 19-oct AM: evaluar métricas del fin de semana post-cutover. Si cero regresión y Error Rate < 1%, incrementar la cohorte Insiders al 20% marcando más MessagingEndUser con FDE_Pilot__c. Monitoreo intensivo primeras 24h del nuevo porcentaje.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Deploy",
    week: 3,
    plannedStart: "2026-10-19",
    plannedEnd: "2026-10-19",
    dependencies: ["1.5.2"],
    deliverables: ["Cohorte Insiders al 20% · KPIs 24h capturados"],
    references: [],
    tags: ["deploy", "insiders"],
  }),
  act({
    id: "1.5.6",
    phaseId: "f1_5",
    number: "1.5.6",
    title: "Escalada al 30%",
    description:
      "Martes 20-oct: incremento diario de +10%. Review de KPIs del día previo antes de activar. Monitoreo intensivo.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Deploy",
    week: 3,
    plannedStart: "2026-10-20",
    plannedEnd: "2026-10-20",
    dependencies: ["1.5.5"],
    deliverables: ["Cohorte Insiders al 30%"],
    references: [],
    tags: ["deploy", "insiders"],
  }),
  act({
    id: "1.5.7",
    phaseId: "f1_5",
    number: "1.5.7",
    title: "Escalada al 40%",
    description:
      "Miércoles 21-oct: incremento diario de +10%. Review de KPIs del día previo antes de activar. Monitoreo intensivo.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Deploy",
    week: 3,
    plannedStart: "2026-10-21",
    plannedEnd: "2026-10-21",
    dependencies: ["1.5.6"],
    deliverables: ["Cohorte Insiders al 40%"],
    references: [],
    tags: ["deploy", "insiders"],
  }),
  act({
    id: "1.5.8",
    phaseId: "f1_5",
    number: "1.5.8",
    title: "Escalada al 50%",
    description:
      "Jueves 22-oct: incremento diario de +10%. Review de KPIs del día previo antes de activar. Preparación del salto final a GA para el viernes.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Deploy",
    week: 3,
    plannedStart: "2026-10-22",
    plannedEnd: "2026-10-22",
    dependencies: ["1.5.7"],
    deliverables: ["Cohorte Insiders al 50%"],
    references: [],
    tags: ["deploy", "insiders"],
  }),
  act({
    id: "1.5.9",
    phaseId: "f1_5",
    number: "1.5.9",
    title: "🎯 GA · Flujo total General Available",
    description:
      "Viernes 23-oct: salto a GA. El agente nuevo (FDE_BW_Service_Agent) queda como el flujo general para todas las distribuidoras — ya no limitado a la cohorte Insiders marcada con FDE_Pilot__c. Review ejecutivo final con el Sponsor para firmar GA y aprobar la entrada a Fase 2 (reemplazo gradual de acciones legacy).",
    owner: "Shared",
    collaborators: ["Salesforce - FDE", "Partner", "Betterware - Sponsor", "Betterware - IT Lead"],
    delegableToPartner: false,
    type: "Deploy",
    week: 3,
    plannedStart: "2026-10-23",
    plannedEnd: "2026-10-23",
    dependencies: ["1.5.8"],
    deliverables: [
      "Agente nuevo en GA · 100% del tráfico",
      "Minuta ER3 · firma de GA + decisión formal F2",
    ],
    references: [],
    tags: ["executive", "ga", "critical-path"],
  }),

  // ============== FASE 2 — REEMPLAZO GRADUAL (Lun 2026-11-02 → Vie 2026-11-20) ==============
  act({
    id: "2.1",
    phaseId: "f2",
    number: "2.1",
    title: "Reemplazo seguridad: Consultar_Informacion_Distribuidor",
    description:
      "Documentar el Flow legacy BW_CtrlDistributor + Consultar_Informacion_Distribuidor, escribir tests de paridad, implementar BW_FDE_GetDistributorInfo propia con SOQL + enforcement WITH USER_MODE o stripInaccessible, correr paridad, cortar adapter. Cierra hallazgos 04 y 07 para esta acción.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 5,
    plannedStart: "2026-10-26",
    plannedEnd: "2026-10-28",
    dependencies: ["1.5.8"],
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
      "Implementar BW_CheckAffiliateOwnership real contra el modelo de datos. Reemplazar ConsultarAsociados por implementación propia con el gate de propiedad primero. Cierra hallazgo 05.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: false,
    type: "Dev",
    week: 5,
    plannedStart: "2026-10-28",
    plannedEnd: "2026-10-30",
    dependencies: ["2.1"],
    deliverables: ["BW_CheckAffiliateOwnership real · tests de IDOR passing"],
    references: [],
    tags: ["security", "idor", "critical-path"],
  }),
  act({
    id: "2.3",
    phaseId: "f2",
    number: "2.3",
    title: "Reemplazo seguridad: reset password con canal alterno",
    description:
      "Implementar BW_FDE_GeneratePasswordResetLink con entrega del enlace por email/SMS (no transcript). Cierra hallazgo 06. Requiere decisión previa de Betterware sobre canal.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Betterware - IT Lead"],
    delegableToPartner: false,
    type: "Dev",
    week: 5,
    plannedStart: "2026-10-29",
    plannedEnd: "2026-10-30",
    dependencies: ["1.5.8"],
    deliverables: ["Reset link entregado fuera del transcript"],
    references: [],
    tags: ["security", "critical-path"],
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
    plannedStart: "2026-10-28",
    plannedEnd: "2026-10-30",
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
    dependencies: ["1.5.8"],
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
    dependencies: ["1.5.8"],
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
      "Convertir el resto de adapters en implementación propia (puntos, premios, pagos, consultas de saldo, tickets, catálogo). Priorizar por volumen de uso y riesgo residual.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Dev",
    week: 7,
    plannedStart: "2026-11-09",
    plannedEnd: "2026-11-13",
    dependencies: ["2.4", "2.5", "2.6", "2.7"],
    deliverables: ["0 adapters restantes en acciones de datos"],
    references: [],
    tags: ["dev"],
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
    plannedStart: "2026-10-30",
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
    plannedStart: "2026-10-30",
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
    title: "Escalar feature flag progresivamente (70→85→100% en subset)",
    description:
      "Incrementar el porcentaje de tráfico al nuevo agente a medida que las acciones críticas se reemplazan y validan. Monitoreo intensivo tras cada incremento. Al cierre de F2, agente debe estar al 70-85% del tráfico.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Deploy",
    week: 5,
    plannedStart: "2026-10-26",
    plannedEnd: "2026-11-13",
    dependencies: ["1.5.8"],
    deliverables: ["Feature flag en 70-85% al cerrar F2"],
    references: [],
    tags: ["deploy", "ab-test"],
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
      "Documentación operacional completa: runbook de incidentes, dashboards de monitoring, test coverage report, documentación de arquitectura actualizada.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner"],
    delegableToPartner: true,
    type: "Doc",
    week: 9,
    plannedStart: "2026-11-23",
    plannedEnd: "2026-11-27",
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
    title: "Rollout final 85% → 100%",
    description:
      "Incremento final del feature flag en producción durante 48 horas. 85% al abrir el lunes, 100% al martes si no hay regresión. V40 queda como rollback de emergencia.",
    owner: "Salesforce - FDE",
    collaborators: ["Partner", "Betterware - IT Lead"],
    delegableToPartner: true,
    type: "Deploy",
    week: 10,
    plannedStart: "2026-11-30",
    plannedEnd: "2026-12-01",
    dependencies: ["3.9"],
    deliverables: ["100% tráfico en nuevo agente"],
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
    status: "scheduled",
    references: [],
  },
  {
    id: "cutover",
    title: "🚀 CUTOVER — Programa Insiders al 10%",
    description:
      "Arranque del Programa Insiders con el 10% inicial de la lista de distribuidoras marcadas con MessagingEndUser.FDE_Pilot__c. Primer hito tangible del proyecto en producción. War room primeras 48h con equipo completo.",
    date: "2026-10-16",
    kind: "Go-live",
    phaseId: "f1_5",
    participants: [
      "Salesforce - FDE",
      "Partner",
      "Betterware - IT Lead",
      "Betterware - Sponsor",
    ],
    status: "scheduled",
    references: [],
  },
  {
    id: "escalada_20",
    title: "Escalada al 20%",
    description:
      "Lunes 19-oct. Si los KPIs del fin de semana post-cutover son verdes, se marcan más MessagingEndUser con FDE_Pilot__c para subir la cohorte Insiders del 10% al 20%. Arranca la ventana de escalada diaria de +10% hasta GA.",
    date: "2026-10-19",
    kind: "Go-live",
    phaseId: "f1_5",
    participants: ["Salesforce - FDE", "Partner", "Betterware - IT Lead"],
    status: "scheduled",
    references: [],
  },
  {
    id: "escalada_30",
    title: "Escalada al 30%",
    description:
      "Martes 20-oct. Incremento diario de +10% si los KPIs del día previo se mantuvieron verdes.",
    date: "2026-10-20",
    kind: "Go-live",
    phaseId: "f1_5",
    participants: ["Salesforce - FDE", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "escalada_40",
    title: "Escalada al 40%",
    description:
      "Miércoles 21-oct. Incremento diario de +10% si los KPIs del día previo se mantuvieron verdes.",
    date: "2026-10-21",
    kind: "Go-live",
    phaseId: "f1_5",
    participants: ["Salesforce - FDE", "Partner"],
    status: "scheduled",
    references: [],
  },
  {
    id: "escalada_50",
    title: "Escalada al 50%",
    description:
      "Jueves 22-oct. Incremento diario de +10%. Último escalón antes del salto a GA. Preparación de la comunicación interna para el flujo general.",
    date: "2026-10-22",
    kind: "Go-live",
    phaseId: "f1_5",
    participants: ["Salesforce - FDE", "Partner", "Betterware - Sponsor"],
    status: "scheduled",
    references: [],
  },
  {
    id: "ga",
    title: "🎯 GA · Flujo total General Available",
    description:
      "Viernes 23-oct. El agente nuevo (FDE_BW_Service_Agent) queda como el flujo general para todas las distribuidoras — ya no limitado a la cohorte Insiders marcada con FDE_Pilot__c. Review ejecutivo final con el Sponsor para firmar GA y aprobar la entrada a Fase 2 (reemplazo gradual de acciones legacy).",
    date: "2026-10-23",
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
      "Review ejecutivo al cierre del ciclo Insiders → GA. Firma formal de GA y decisión de entrar a Fase 2 (reemplazo gradual de acciones legacy) o ajustar según evidencia.",
    date: "2026-10-23",
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
      "File upload managed requiere GPT-4.1 (caveat oficial). Si Betterware corre GPT-4o, el feature no está disponible.",
    probability: "High",
    impact: "Low",
    mitigation:
      "Dejar file_upload: error inicialmente con mensaje claro al usuario. Decisión de upgrade del modelo queda al cliente.",
    owner: "Betterware - IT Lead",
    status: "active",
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

const STATUS_UPDATES: StatusUpdate[] = [];

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
