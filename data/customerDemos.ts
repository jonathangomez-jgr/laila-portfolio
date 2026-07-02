export type KpiItem = {
  name: string;
  baseline: string;
  goal6m: string;
  goal12m: string;
};

export type KpiGroup = {
  group: string;
  items: KpiItem[];
};

export type KpiSummaryRow = {
  dimension: string;
  kpiName: string;
  value6m: string;
  value12m: string;
  color: "indigo" | "violet" | "sky";
};

export type ObjectiveOkr = {
  label: string;
  description: string;
  enabler: string;
  color: "indigo" | "violet" | "sky";
};

export type ObjectiveData = {
  headline: string;
  okrs: ObjectiveOkr[];
};

export type OverviewStat = {
  value: string;
  label: string;
};

export type OverviewData = {
  stats: OverviewStat[];
};

export type CustomerProfileStat = {
  label: string;
  value: string;
};

export type CustomerSegment = {
  name: string;
  description: string;
};

export type TechStackItem = {
  category: string;
  tool: string;
};

export type CustomerProfileData = {
  stats: CustomerProfileStat[];
  segments: CustomerSegment[];
  techStack: TechStackItem[];
};

export type ContextGroup = {
  name: string;
  findings: string[];
};

export type ContextData = {
  groups: ContextGroup[];
};

export type NarrativePillar = {
  title: string;
  description: string;
  image?: string;
};

export type NarrativeData = {
  quote: string;
  pillars: NarrativePillar[];
  closing: string;
};

export type StoryScene = {
  number: number;
  title: string;
  subtitle?: string;
  description: string;
  channel: string;
  image: string;
  icon?: string;
  pilar?: string;
  pilarColor?: "indigo" | "violet" | "sky" | "emerald" | "amber";
  products?: string[];
  insight?: string;
};

export type StoryData = {
  protagonist?: string;
  protagonistRole?: string;
  intro?: string;
  scenes: StoryScene[];
};

export type JourneyTouchpoint = {
  number: number;
  phaseId: string;
  icon: string;
  title: string;
  subtitle: string;
  before: string;
  transformation: string;
  value: string;
  products: string[];
};

export type JourneyPhase = {
  id: string;
  label: string;
  span: number;
  color: "indigo" | "violet" | "sky" | "emerald";
};

export type JourneyData = {
  phases: JourneyPhase[];
  touchpoints: JourneyTouchpoint[];
};

export type AgentforceAgent = {
  name: string;
  capabilities: string[];
};

export type AgentforceStackLayer = {
  name: string;
  items: string[];
};

export type AgentforceChannel = {
  name: string;
  items: string[];
};

export type AgentforceApp = {
  name: string;
  items: string[];
};

export type AgentforceDataNode = {
  name: string;
  items: string[];
};

export type AgentforceLandscapeData = {
  title: string;
  svgUrl?: string;
  agents: AgentforceAgent[];
  customer360: AgentforceApp[];
  aiStack: AgentforceStackLayer[];
  channels: AgentforceChannel[];
  dataCloud: AgentforceDataNode[];
};

export type AssetItem = {
  name: string;
  description: string;
  available: boolean;
  type: "doc" | "deck" | "mockup" | "arch" | "video" | "story";
  url?: string;
};

export type AssetsData = {
  items: AssetItem[];
};

export type SolutionLayer = {
  product: string;
  focus: string;
  color: "indigo" | "violet" | "sky";
  items: string[];
};

export type ArchNode = {
  name: string;
  items: string[];
};

export type ArchZone = {
  id: string;
  label: string;
  color: "slate" | "indigo" | "violet" | "sky" | "emerald" | "amber";
  nodes: ArchNode[];
};

export type ArchBridge = {
  label: string;
  sublabel: string;
  items: string[];
};

export type ArchFoundation = {
  label: string;
  items: string[];
};

export type ArchData = {
  title: string;
  svgUrl?: string;
  zones: ArchZone[];
  bridge: ArchBridge;
  foundation: ArchFoundation;
};

export type BefraArchZone = {
  label: string;
  tone: "channels" | "platform" | "data" | "integration" | "external" | "agentforce";
  nodes: string[];
};

export type BefraArchHighlight = {
  label: string;
  body: string;
  tone: "blue" | "amber" | "violet" | "teal" | "red";
};

export type BefraLandscape = {
  id: "asis" | "tobe";
  eyebrow: string;
  title: string;
  summary: string;
  svgUrl: string;
  pdfUrl?: string;
  zones: BefraArchZone[];
  highlights: BefraArchHighlight[];
};

export type BefraArchitectureData = {
  asIs: BefraLandscape;
  toBe: BefraLandscape;
};

export type WorkshopArea = {
  number: number;
  title: string;
  summary: string;
  pains: string[];
  redDots?: number;
};

export type WorkshopPersona = {
  name: string;
  role: string;
  context: string;
  characteristics: string[];
  needs: string[];
};

export type WorkshopData = {
  date: string;
  intro: string;
  persona: WorkshopPersona;
  areas: WorkshopArea[];
  topPriority: { title: string; reason: string };
  aspirational: string;
};

export type BlueprintComponent = {
  number: string;
  name: string;
  shortName: string;
  type: "external" | "internal" | "data" | "orchestration";
  purpose: string;
  user: string;
  channels?: string[];
  capabilities: { title: string; body: string }[];
  products: string[];
};

export type BlueprintData = {
  principle: { title: string; quote: string; capabilities: string[] };
  components: BlueprintComponent[];
  topics?: { name: string; goal: string; actions: string[]; limits: string[] }[];
  trustControls?: { name: string; items: string[] }[];
};

export type RoadmapPhase = {
  number: number;
  name: string;
  goal: string;
  scope: string[];
  metrics: string[];
  duration?: string;
  isMvp?: boolean;
  color: "indigo" | "violet" | "sky" | "emerald";
};

export type RoadmapMvp = {
  title: string;
  reason: string;
  included: string[];
  excluded: string[];
};

export type RoadmapData = {
  phases: RoadmapPhase[];
  mvp: RoadmapMvp;
};

export type JtbdInsightGroup = {
  name: string;
  eyebrow: string;
  tone: "indigo" | "violet" | "sky" | "amber";
  insights: { title: string; body: string }[];
};

export type JtbdPersonaColumn = {
  heading: string;
  tone: "indigo" | "violet" | "sky";
  items: string[];
};

export type JtbdFunnelStage = {
  number: number;
  name: string;
  color: "indigo" | "violet" | "sky" | "emerald";
  jobToBeDone: string;
  kpi: string;
  channel: string;
};

export type JtbdGapRow = {
  job: string;
  asIs: string;
  toBe: string;
  severity: "critico" | "alto";
};

export type JtbdChannel = {
  name: string;
  role: string;
  tone: "emerald" | "indigo" | "amber" | "violet";
  livesHere: string[];
  notHere: string[];
};

export type JtbdInitiative = {
  number: number;
  name: string;
  solves: string;
  capability: string;
  impact: string;
};

export type JtbdInitiativeBucket = {
  label: string;
  subtitle: string;
  tone: "indigo" | "violet" | "sky";
  items: JtbdInitiative[];
};

export type JtbdSprint = {
  label: string;
  dates: string;
  tone: "indigo" | "violet" | "sky" | "emerald";
  initiatives: number[];
  extras?: string[];
};

export type JtbdKpiRow = {
  kpi: string;
  baseline: string;
  goal90d: string;
  goal6m: string;
};

export type JtbdData = {
  intro: string;
  authoredBy: string;
  workshopDate: string;
  funnelStats: { value: string; label: string }[];
  insightGroups: JtbdInsightGroup[];
  persona: {
    headline: string;
    columns: JtbdPersonaColumn[];
  };
  funnel: JtbdFunnelStage[];
  channelDecision: string;
  channels: JtbdChannel[];
  gaps: JtbdGapRow[];
  initiatives: JtbdInitiativeBucket[];
  sprints: JtbdSprint[];
  kpis: JtbdKpiRow[];
};

export type Sprint3Role = {
  name: string;
  tagline: string;
  description: string;
  tone: "indigo" | "violet" | "sky" | "emerald";
};

export type Sprint3FlowStep = {
  number: number;
  title: string;
  description: string;
  actor: string;
  tone: "indigo" | "violet" | "sky" | "emerald";
};

export type Sprint3LandingZone = {
  number: number;
  label: string;
  example: string;
  description: string;
};

export type Sprint3Audience = {
  name: string;
  signal: string;
  activation: string;
  outcome: string;
  tone: "indigo" | "violet" | "sky" | "emerald" | "amber";
};

export type Sprint3StackItem = {
  product: string;
  role: string;
  tone: "indigo" | "violet" | "sky" | "emerald";
};

export type Sprint3Kpi = {
  metric: string;
  detail: string;
};

export type Sprint3Data = {
  conceptQuote: string;
  highlights: { value: string; label: string }[];
  roles: Sprint3Role[];
  shift: {
    after: { heading: string; body: string; bullets: string[] };
  };
  flow: Sprint3FlowStep[];
  landingZones: Sprint3LandingZone[];
  audiences: Sprint3Audience[];
  attribution: {
    intro: string;
    direct: { title: string; how: string; when?: string };
    indirect: { title: string; how: string; when?: string };
    persistence: string;
  };
  stack: Sprint3StackItem[];
  kpis: Sprint3Kpi[];
};

export type JobStoryKnowledgeSource = {
  label: string;
  path: string;
  library?: string;
  relevance?: string;
};

export type JobStory = {
  id: string;
  epicId: string;
  epicName: string;
  name: string;
  category:
    | "Information & Discovery"
    | "Self-Service & Transactions"
    | "Personalization"
    | "Status & Tracking"
    | "Problem Resolution"
    | "Retention & Engagement"
    | "Escalation & Human Handoff";
  cuando: string;
  yoQuiero: string;
  paraPoder: string;
  businessValue: string;
  priority: "High" | "Medium" | "Low";
  package: "MVP" | "TBD" | "NA" | "Blocked";
  blocked?: boolean;
  coverage: "covered" | "partial" | "missing" | "out-of-scope";
  knowledgeSources?: JobStoryKnowledgeSource[];
  pending?: string[];
  resolution?: "knowledge" | "data-only" | "handoff" | "hybrid";
};

export type JobStoriesSummary = {
  totalStories: number;
  byCoverage: { covered: number; partial: number; missing: number; outOfScope: number };
  byResolution: { knowledgeOnly: number; dataOnly: number; hybrid: number; handoff: number };
  notes: string[];
  pendingArtifacts: string[];
};

export type JobStoriesData = {
  intro: string;
  stories: JobStory[];
  summary: JobStoriesSummary;
};

export type TestScriptStep = {
  turn: number;
  role: "user" | "agent" | "system";
  text: string;
  validations?: string[];
  dataLookup?: string;
  knowledgeRef?: string;
  handoff?: string;
};

export type TestScript = {
  id: string;
  jobStoryId: string;
  name: string;
  status: "ready" | "partial" | "blocked";
  persona: string;
  channel: "WhatsApp" | "Web Chat" | "SMS" | "Mobile";
  language: "es" | "en" | "pt";
  preconditions: string[];
  steps: TestScriptStep[];
  expectedOutcome: string;
  successCriteria: string[];
  blockers?: string[];
};

export type TestScriptsData = {
  intro: string;
  scripts: TestScript[];
};

export type KnowledgeLibraryFileGroup = {
  label: string;
  note?: string;
  files: string[];
};

export type KnowledgeLibraryItem = {
  id: string;
  name: string;
  focus: string;
  description: string;
  tone: "indigo" | "violet" | "sky" | "emerald" | "amber";
  fileCount?: number;
  indexed?: boolean;
  fileGroups: KnowledgeLibraryFileGroup[];
  pending?: string[];
};

export type KnowledgeLibraryInventoryData = {
  libraries: KnowledgeLibraryItem[];
};

export type CustomRetrieverArticleRef = {
  articleId: string;
  title: string;
  recordType:
    | "Property Fact Sheet"
    | "Room Description"
    | "Policy"
    | "FAQ"
    | "Benefit & Program"
    | "How-To / Self-Service"
    | "Security";
};

export type CustomRetrieverCard = {
  id: string;
  order: number;
  name: string;
  backend: "Salesforce Knowledge" | "UDMO Files (Data Cloud)" | "Hybrid" | "System Prompt";
  tone: "indigo" | "violet" | "sky" | "emerald" | "amber";
  intent: string;
  description: string;
  articles: CustomRetrieverArticleRef[];
  filters: string[];
  threshold?: string;
  fallback?: string;
};

export type CustomRetrieverData = {
  intro?: string;
  retrievers: CustomRetrieverCard[];
};

export type KbArticleDataCategory = {
  group: "Audience" | "Topic" | "Property" | "Lifecycle" | "Room Category";
  value: string;
};

export type KbArticleCard = {
  id: string;
  title: string;
  summary: string;
  recordType:
    | "Property Fact Sheet"
    | "Room Description"
    | "Policy"
    | "FAQ"
    | "Benefit & Program"
    | "How-To / Self-Service"
    | "Security";
  dataCategories: KbArticleDataCategory[];
  retrievers: string[];
  channels?: Array<"Agentforce" | "Portal LVC" | "Service Console" | "Public Web">;
  languages?: Array<"es" | "en" | "pt">;
  jobStories?: string[];
  membershipLevel?: string;
  sourceFile?: string;
  status?: "planned" | "draft" | "in-review" | "validated";
};

export type KbArticleBucket = {
  recordType: string;
  description: string;
  articles: KbArticleCard[];
};

export type KbArticlesData = {
  intro?: string;
  totals?: {
    masterArticles: number;
    languageVersions: number;
    coveredJobStories: number;
    totalMvpJobStories: number;
  };
  buckets: KbArticleBucket[];
};

export type WorkPlanOpportunity = {
  code: string;
  name: string;
  pilar: "P1" | "P2" | "P3" | "P0";
  pilarColor: "indigo" | "violet" | "sky" | "emerald";
  useCase: string;
  salesforceProducts: string[];
  duration: string;
  prerequisites: string[];
  sizing: string[];
  dependsOn?: string[];
  outcome: string;
};

export type WorkPlanWave = {
  id: string;
  label: string;
  window: string;
  headline: string;
  focus: string;
  color: "indigo" | "violet" | "sky" | "emerald";
  goals: string[];
  opportunities: WorkPlanOpportunity[];
  clientAsk: string[];
};

export type WorkPlanCriticalPathStep = {
  step: number;
  gate: string;
  detail: string;
};

export type WorkPlanData = {
  intro: string;
  horizon: string;
  principles: string[];
  waves: WorkPlanWave[];
  criticalPath: WorkPlanCriticalPathStep[];
  governance: {
    steerco: string;
    roles: { role: string; owner: string }[];
    risks: { risk: string; mitigation: string }[];
  };
  nextGate: {
    title: string;
    body: string;
    asks: string[];
  };
};

export type CustomerDemoTab = {
  id: string;
  label: string;
  title: string;
  content: string;
  banner?: string;
  videoUrl?: string;
  kpis?: KpiGroup[];
  kpiSummary?: KpiSummaryRow[];
  solution?: SolutionLayer[];
  archData?: ArchData;
  befraArchData?: BefraArchitectureData;
  objective?: ObjectiveData;
  overviewData?: OverviewData;
  customerProfile?: CustomerProfileData;
  contextData?: ContextData;
  narrativeData?: NarrativeData;
  storyData?: StoryData;
  journeyData?: JourneyData;
  assetsData?: AssetsData;
  argosArch?: true;
  argosKpiSummary?: true;
  workPlanData?: WorkPlanData;
  agentforceLandscapeData?: AgentforceLandscapeData;
  workshopData?: WorkshopData;
  blueprintData?: BlueprintData;
  roadmapData?: RoadmapData;
  jtbdData?: JtbdData;
  sprint3Data?: Sprint3Data;
  knowledgeInventoryData?: KnowledgeLibraryInventoryData;
  customRetrieverData?: CustomRetrieverData;
  kbArticlesData?: KbArticlesData;
  jobStoriesData?: JobStoriesData;
  testScriptsData?: TestScriptsData;
};

export type CustomerDemoI18n = {
  title: string;
  description: string;
  industry: string;
  tabs: { id: string; label: string; title: string; content: string }[];
};

export type EmbeddedMessagingConfig = {
  orgId: string;
  deploymentName: string;
  siteUrl: string;
  scrt2URL: string;
  language?: string;
  bootstrapSrc?: string;
};

export type CustomerDemo = {
  slug: string;
  title: string;
  customerName: string;
  industry: string;
  description: string;
  logo?: string;
  qrCode?: string;
  tags: string[];
  tabs: CustomerDemoTab[];
  passcode: string;
  hidden?: boolean;
  embeddedMessaging?: EmbeddedMessagingConfig;
  translations?: { en?: CustomerDemoI18n; pt?: CustomerDemoI18n };
};

export const customerDemos: CustomerDemo[] = [
  {
    slug: "vivalux",
    title: "Transformación Inteligente del Customer Experience con Agentforce",
    customerName: "VivaLux Retail Group",
    industry: "Retail Omnicanal — Moda y Artículos para el Hogar",
    description:
      "Plan de cuenta estratégico para transformar la experiencia post-compra de VivaLux mediante Salesforce Agentforce, Service Cloud y Data Cloud — revirtiendo una caída de 21 puntos en NPS y desbloqueando $180M+ en valor combinado de ahorro operativo, retención y uplift de revenue.",
    logo: "/Customers/vivalux-logo.png",
    qrCode: "/vivalux-code.png",
    passcode: "vivalux2026",
    tags: [
      "Agentforce",
      "Service Cloud",
      "Data Cloud",
      "MuleSoft",
      "Retail LATAM",
    ],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        title: "Resumen ejecutivo",
        content:
          "VivaLux Retail Group enfrenta una paradoja peligrosa: su crecimiento comercial está siendo erosionado por una experiencia post-compra que no escala. En 18 meses, el NPS cayó de 62 a 41 — una señal crítica que representa decenas de millones en revenue en riesgo. Este plan propone una hoja de ruta ejecutable en 3 fases con ROI proyectado del 340% en el primer año.",
        overviewData: {
          stats: [
            { value: "$1.2B", label: "Revenue anual" },
            { value: "8,000", label: "Empleados" },
            { value: "62 → 41", label: "Caída NPS en 18 meses" },
            { value: "340%", label: "ROI proyectado año 1" },
            { value: "$180M+", label: "Valor potencial combinado" },
            { value: "3", label: "Fases de implementación" },
          ],
        },
      },
      {
        id: "customer",
        label: "Cliente / industria",
        title: "Cliente e industria",
        content:
          "Retailer omnicanal de moda y artículos para el hogar con presencia multi-país en América Latina. Modelo de negocio que combina tiendas físicas, e-commerce, WhatsApp y redes sociales. Su ambición estratégica es la expansión agresiva en 3 años — nuevos mercados, más tiendas y canales digitales.",
        customerProfile: {
          stats: [
            { label: "Sede", value: "América Latina (multi-país)" },
            { label: "Segmento", value: "B2C — medio-alto y premium" },
            { label: "Empleados", value: "~8,000" },
            { label: "Revenue", value: "$1.2B USD/año" },
            { label: "NPS actual", value: "41 (en declive)" },
            { label: "Estrategia", value: "Expansión agresiva 3 años" },
          ],
          segments: [
            {
              name: "Fashion (Moda)",
              description:
                "Tiendas físicas premium + e-commerce + WhatsApp + redes sociales. Clientes B2C de segmentos medio-alto en LATAM con alta expectativa de experiencia personalizada y servicio omnicanal fluido.",
            },
            {
              name: "Home Goods (Artículos para el Hogar)",
              description:
                "Línea de artículos del hogar con operación multi-país. Asociados de tienda sin herramientas de clienteling en tiempo real, generando interacciones genéricas que frustran al cliente VIP.",
            },
          ],
          techStack: [
            { category: "ERP", tool: "SAP" },
            { category: "CRM", tool: "Salesforce Sales Cloud (básico)" },
            { category: "Mensajería", tool: "WhatsApp (manual)" },
            { category: "Contact Center", tool: "On-prem legacy" },
          ],
        },
      },
      {
        id: "context",
        label: "Contexto",
        title: "Contexto del reto",
        content:
          "Cinco dolores críticos con impacto financiero cuantificable. Este diagnóstico no es solo técnico — es la base del caso de negocio para el Directorio.",
        contextData: {
          groups: [
            {
              name: "Experiencia del Cliente y NPS",
              findings: [
                "NPS cayó de 62 a 41 en 18 meses (-21 pts) — $72-180M en revenue en riesgo por churn",
                "WhatsApp manual: 1 agente = ~80 chats/día vs 5,000-8,000 mensajes diarios recibidos",
                "Tiempo de respuesta en WhatsApp: horas/días vs benchmark líderes de <5 minutos",
                "Mayoría de clientes en categoría 'pasivo' según Net Promoter System",
                "Escalaciones perdidas en silos y pedidos sin estatus claro para el cliente",
              ],
            },
            {
              name: "Operaciones y Deuda Técnica",
              findings: [
                "Asociados de tienda sin historial online, pedidos activos ni valor del cliente al momento del servicio",
                "Contact center on-prem: $3.5-5M/año sin IA, sin integración CRM nativa, inescalable",
                "Tasa de automatización de servicio <10% vs 35% benchmark y 75-80% de líderes del mercado",
                "Sin modelo predictivo de churn — equipo de CX reacciona en lugar de prevenir pérdidas",
                "Churn estimado 18-22% en base activa — impacto anual superior a $20M en valor perdido",
              ],
            },
          ],
        },
      },
      {
        id: "objective",
        label: "Objetivo",
        title: "Reconvertir cada punto de contacto en una experiencia inteligente y proactiva.",
        content:
          "Tres hipótesis de valor. Una plataforma. Resultados medibles en 90 días.",
        objective: {
          headline:
            "Construir el Customer Intelligence Agent Ecosystem que transforma cómo VivaLux entiende, anticipa y sirve a sus clientes — antes de que la brecha entre crecimiento comercial y experiencia post-compra erosione su liderazgo en LATAM.",
          okrs: [
            {
              label: "Recuperar NPS",
              description:
                "Agent proactivo de fidelización con análisis predictivo de churn. Identificar clientes en riesgo antes de que se vayan.",
              enabler: "Agentforce + Data Cloud + Einstein AI",
              color: "indigo",
            },
            {
              label: "Escalar WhatsApp",
              description:
                "Agentforce maneja +3,000 conversaciones simultáneas 24/7 — liberando al equipo para casos de alta complejidad.",
              enabler: "Agentforce Service Agent + WhatsApp Business API",
              color: "violet",
            },
            {
              label: "Habilitar Clienteling",
              description:
                "Mobile app con Customer 360 en tiempo real para asociados de tienda — historial, preferencias y riesgo de churn en un clic.",
              enabler: "Field Service Mobile + MuleSoft SAP",
              color: "sky",
            },
          ],
        },
      },
      {
        id: "solution",
        label: "Solución",
        title: "Customer Intelligence Agent Ecosystem",
        content:
          "Cuatro agentes inteligentes construidos sobre tres pilares: datos unificados (Data Cloud), integración robusta (MuleSoft) e inteligencia agéntica (Agentforce). Cada agente actúa de forma autónoma dentro de guardrails definidos y colabora con los demás de forma fluida.",
        solution: [
          {
            product: "Agentforce + Service Cloud",
            focus: "LuxServe & LuxEscalation — Servicio Digital 24/7",
            color: "indigo",
            items: [
              "LuxServe Agent: resuelve order status, devoluciones y FAQ de forma autónoma",
              "+3,000 conversaciones simultáneas vs ~80 por agente humano",
              "Tiempo de respuesta: de horas/días a <5 minutos en WhatsApp",
              "LuxEscalation Agent: detecta sentimiento negativo y escala con contexto completo",
              "Handoff inteligente con resumen IA al agente humano — cero pérdida de contexto",
              "Einstein Sentiment + Omni-Channel routing nativo",
              "Reducción 75% costo operativo Tier-1 = $8.2M/año ahorrado",
              "Einstein Trust Layer: gobernanza total de datos de clientes",
            ],
          },
          {
            product: "Field Service Mobile + MuleSoft SAP",
            focus: "LuxAssist — Clienteling en Tienda",
            color: "violet",
            items: [
              "Mobile Clienteling App con Customer 360 en tiempo real para asociados",
              "Historial de compras online, pedidos pendientes y devoluciones activas",
              "Loyalty Risk Score visible antes de iniciar la interacción presencial",
              "Integración SAP via MuleSoft — API-Led Connectivity con zero-copy architecture",
              "Preferencias, historial de tickets y segmento del cliente en un clic",
              "Product Affinity Graph: recomendaciones personalizadas en tiempo real",
              "Aumento 23% ticket promedio en tienda = $27M uplift anual",
              "Piloto en 5 tiendas campeón — NPS +8 pts en 60 días",
            ],
          },
          {
            product: "Data Cloud + Einstein AI + Marketing Cloud",
            focus: "LuxInsight — Retención Predictiva",
            color: "sky",
            items: [
              "Unified Customer Profile: SAP + CRM + WhatsApp + visitas en tienda unificados",
              "Loyalty Risk Score 0-100 calculado semanalmente por Einstein AI",
              "Identifica top 500 clientes en riesgo cada semana con señales de alerta temprana",
              "Dispara campañas preventivas de retención via Marketing Cloud automáticamente",
              "Service Interaction Timeline: historial cronológico de todas las interacciones",
              "Dashboards ejecutivos de NPS, churn risk y revenue en riesgo para el Directorio",
              "Salvar 15% clientes en riesgo = $18M revenue retenido anualmente",
              "Data residency LATAM — cumplimiento LGPD Brasil y leyes locales de datos",
            ],
          },
        ],
      },
      {
        id: "storytelling",
        label: "Narrativa",
        title: "Narrativa de valor",
        content:
          "No es una venta de licencias. Es una reconfiguración fundamental de cómo VivaLux entiende, anticipa y sirve a sus clientes.",
        narrativeData: {
          quote:
            "El cliente que VivaLux pierde hoy no es solo una transacción perdida — es un embajador de marca que se convierte en detractor. Agentforce no es solo una inversión en tecnología; es una inversión en la promesa de marca que VivaLux hace a sus clientes cada día.",
          pillars: [
            {
              title: "El cliente contacta, el agente ya lo conoce",
              description:
                "Cuando el cliente escribe por WhatsApp, LuxServe Agent tiene su historial completo, pedidos activos y riesgo de churn. No hay preguntas redundantes. No hay fricciones. La respuesta llega en segundos, no en horas.",
              image: "/Customers/lux-serve.png",
            },
            {
              title: "El asociado vende más porque conoce más",
              description:
                "LuxAssist entrega Customer 360 al asociado antes de que el cliente abra la boca. Saber que 'María compró online hace 3 días y su pedido llegó con defecto' transforma completamente la calidad del servicio presencial.",
              image: "/Customers/lux-assist.png",
            },
            {
              title: "VivaLux actúa antes de que el cliente se vaya",
              description:
                "LuxInsight identifica cada semana qué clientes están en riesgo de abandonar la marca. Las campañas preventivas llegan en el momento justo, con el mensaje correcto, antes de que sea demasiado tarde.",
              image: "/Customers/lux-insight.png",
            },
          ],
          closing:
            "En el ecosistema retail latinoamericano, la adopción de IA agéntica está en sus primeras etapas. Ser el primer retailer de moda y hogar en desplegar Customer Intelligence Agents a escala nacional es la ventaja competitiva que los competidores tardarán 2-3 años en replicar.",
        },
      },
      {
        id: "historia",
        label: "Historia",
        title: "Historia del Cliente",
        content:
          "El viaje completo de María Clara: desde la compra online hasta ver la final del Mundial con su familia, gracias a la coordinación entre LuxServe y LuxAssist.",
        storyData: {
          scenes: [
            {
              number: 1,
              title: "La final se acerca",
              description:
                "María Clara compró en línea un proyector de alta luminosidad de más de 4,000 lúmenes en VivaLux. Lo eligió porque quería ver la final del Mundial México vs. Portugal con toda su familia, incluso con la sala iluminada, sin tener que cerrar cortinas ni apagar todas las luces. La familia llegará de visita al día siguiente y el proyector es el centro del plan.",
              channel: "Hogar de María Clara / Sitio web de VivaLux",
              image: "/Customers/vivalux/vl-1.png",
            },
            {
              number: 2,
              title: "El pedido no llega",
              description:
                "A un día de la final, María Clara revisa el estado del pedido y ve que aún no ha llegado. Preocupada, escribe por WhatsApp a VivaLux para preguntar por la entrega. LuxServe le informa que el pedido ya fue enviado desde el centro logístico y que la fecha programada de entrega es el domingo, el mismo día del partido. El problema es que no puede garantizarse si llegará antes o después del inicio de la final.",
              channel: "WhatsApp / LuxServe",
              image: "/Customers/vivalux/vl-2.png",
            },
            {
              number: 3,
              title: "El miedo al país paralizado",
              description:
                "María Clara imagina el peor escenario: todo México paralizado por la final, repartidores viendo el partido, calles cerradas por festejos y su proyector llegando después de que termine el juego. Si México gana, piensa exageradamente que el país celebrará durante semanas y que el proyector llegará hasta el mes siguiente.",
              channel: "Imaginación de María Clara",
              image: "/Customers/vivalux/vl-3.png",
            },
            {
              number: 4,
              title: "La primera solución de LuxServe",
              description:
                "María Clara pregunta si puede cancelar el pedido y comprar el proyector directamente en tienda. LuxServe revisa el estado logístico y detecta que el pedido ya fue procesado, pero aún no ha salido a ruta de última milla. Por eso, puede pausarse preventivamente la entrega a domicilio mientras María Clara busca una alternativa en tienda.",
              channel: "WhatsApp / LuxServe / Sistema de órdenes VivaLux",
              image: "/Customers/vivalux/vl-4.png",
            },
            {
              number: 5,
              title: "Disponibilidad en Plaza Olimpo",
              description:
                "María Clara pregunta si el mismo proyector está disponible en la tienda VivaLux de Plaza Olimpo. LuxServe consulta inventario y confirma que aparece una unidad disponible. María Clara decide ir de inmediato a la tienda para comprarlo personalmente y asegurarse de tenerlo antes del partido.",
              channel: "WhatsApp / LuxServe / Tienda VivaLux Plaza Olimpo",
              image: "/Customers/vivalux/vl-5.png",
            },
            {
              number: 6,
              title: "La última unidad desaparece",
              description:
                "María Clara llega corriendo a Plaza Olimpo. Al entrar, casi choca con una señora que lleva una caja del mismo proyector. Cuando pregunta a una vendedora, la dependiente revisa con LuxAssist y confirma que esa era la última unidad disponible. La unidad aparecía en inventario, pero otra clienta la tomó mientras María Clara iba en camino.",
              channel: "Tienda VivaLux Plaza Olimpo / LuxAssist",
              image: "/Customers/vivalux/vl-6.png",
            },
            {
              number: 7,
              title: "Alternativas que no convencen",
              description:
                "LuxAssist recomienda productos similares disponibles en Plaza Olimpo. La vendedora le muestra otras opciones, pero María Clara explica que eligió ese modelo porque tenía más de 4,000 lúmenes y podía usarse en una sala iluminada. Los otros proyectores no cumplen del todo con esa necesidad.",
              channel: "Tienda VivaLux Plaza Olimpo / LuxAssist",
              image: "/Customers/vivalux/vl-7.png",
            },
            {
              number: 8,
              title: "Una tentación muy poco mundialista",
              description:
                "Por un segundo, María Clara mira con demasiada intensidad la caja que lleva la otra clienta. La presión del partido y la visita familiar la hacen imaginar una escena absurda en la que arrebata el proyector y sale corriendo. Pero respira profundo y decide preguntar si hay disponibilidad en otra sucursal.",
              channel: "Tienda VivaLux Plaza Olimpo",
              image: "/Customers/vivalux/vl-8.png",
            },
            {
              number: 9,
              title: "El último proyector en Los Montes",
              description:
                "La dependiente consulta nuevamente con LuxAssist. El sistema encuentra una última unidad disponible en la sucursal VivaLux Los Montes. Es una pieza de exhibición, pero está en buen estado y puede venderse. María Clara acepta. La vendedora solicita apartarla inmediatamente.",
              channel: "Tienda VivaLux Plaza Olimpo / LuxAssist / Inventario intersucursal",
              image: "/Customers/vivalux/vl-9.png",
            },
            {
              number: 10,
              title: "Apartado confirmado",
              description:
                "LuxAssist genera el apartado del proyector en Los Montes. Automáticamente se envía una notificación al equipo de esa sucursal por Slack para que localicen el producto, lo retiren de exhibición, lo marquen como apartado y lo resguarden hasta que María Clara llegue. Al mismo tiempo, María Clara recibe por WhatsApp una confirmación del apartado con el tiempo de reserva.",
              channel: "LuxAssist / Slack interno / WhatsApp / Tienda VivaLux Los Montes",
              image: "/Customers/vivalux/vl-10.png",
            },
            {
              number: 11,
              title: "La carrera contra el tráfico",
              description:
                "María Clara sale hacia Los Montes. El tráfico está pesado porque toda la ciudad se prepara para la final. Después de dos horas, llega a la sucursal. El equipo ya la estaba esperando gracias a la notificación de LuxAssist y le entrega el proyector apartado.",
              channel: "Trayecto a Los Montes / Tienda VivaLux Los Montes",
              image: "/Customers/vivalux/vl-11.png",
            },
            {
              number: 12,
              title: "Compra confirmada, entrega cancelada",
              description:
                "Cuando María Clara confirma la compra y recibe el proyector en la sucursal Los Montes, LuxAssist actualiza el estado del caso. El sistema cancela definitivamente la entrega a domicilio del pedido original, evitando duplicidad, errores logísticos y una mala experiencia posterior.",
              channel: "Tienda VivaLux Los Montes / LuxAssist / Sistema de órdenes VivaLux",
              image: "/Customers/vivalux/vl-12.png",
            },
            {
              number: 13,
              title: "El proyector no funciona",
              description:
                "María Clara llega a casa, conecta el proyector y trata de probarlo antes de que llegue la familia. Pero la imagen no aparece. Se frustra y piensa que fue un error comprar una pieza de exhibición. Con el tiempo encima, llama por teléfono a VivaLux.",
              channel: "Hogar de María Clara / Teléfono / LuxServe",
              image: "/Customers/vivalux/vl-13.png",
            },
            {
              number: 14,
              title: "LuxServe reconoce el contexto",
              description:
                "Al llamar, LuxServe identifica a María Clara por su número telefónico. El sistema reconoce su última compra en la sucursal Los Montes y anticipa el motivo probable de la llamada. El agente le pregunta si necesita ayuda con la configuración de su proyector.",
              channel: "Teléfono / LuxServe / CRM VivaLux",
              image: "/Customers/vivalux/vl-14.png",
            },
            {
              number: 15,
              title: "La configuración correcta",
              description:
                "María Clara explica que el proyector \"no sirve\". LuxServe la guía paso a paso: revisar la fuente de entrada, activar el modo de alto brillo, quitar el protector del lente y confirmar la conexión HDMI. El problema no era una falla del producto, sino una configuración inicial incompleta. El proyector enciende correctamente y la imagen se ve clara incluso con la sala iluminada.",
              channel: "Hogar de María Clara / Teléfono / LuxServe",
              image: "/Customers/vivalux/vl-15.png",
            },
            {
              number: 16,
              title: "La final en familia",
              description:
                "La familia llega a casa de María Clara. Todos se acomodan frente a la proyección, con comida, camisetas y banderas. Gracias a la atención coordinada entre LuxServe y LuxAssist, María Clara puede disfrutar la final sin preocuparse por la entrega ni por la configuración del producto.",
              channel: "Hogar de María Clara / Experiencia del cliente",
              image: "/Customers/vivalux/vl-16.png",
            },
            {
              number: 17,
              title: "La visión ejecutiva de Don Raúl",
              description:
                "Mientras María Clara disfruta el partido, Don Raúl revisa en LuxInsight el desempeño de una campaña creada para mitigar abandono de clientes. La campaña estaba dirigida a miembros del programa de lealtad con intereses en tecnología y fútbol. Los datos muestran que la campaña fue altamente efectiva: aumentó la conversión, redujo cancelaciones y provocó sold out de proyectores de más de 4,000 lúmenes.",
              channel: "Oficinas de VivaLux / LuxInsight / Dashboard ejecutivo",
              image: "/Customers/vivalux/vl-17.png",
            },
            {
              number: 18,
              title: "De una urgencia individual a una estrategia ganadora",
              description:
                "LuxInsight conecta los puntos: clientes con interés en fútbol, alta intención de compra, riesgo de abandono por entregas inciertas, búsqueda de disponibilidad en tienda y preferencia por proyectores de alta luminosidad. El caso de María Clara deja de ser solo una atención aislada y se convierte en evidencia de una estrategia omnicanal exitosa para VivaLux.",
              channel: "LuxInsight / Omnichannel Command Center / Estrategia VivaLux",
              image: "/Customers/vivalux/vl-18.png",
            },
          ],
        },
      },
      {
        id: "outcomes",
        label: "Resultados",
        title: "Resultados esperados",
        content:
          "Los KPIs de éxito se organizan en tres dimensiones: experiencia del cliente, eficiencia operativa y revenue uplift. Cada métrica tiene línea base documentada, meta a 6 meses y meta a 12 meses — diseñadas para demostrar valor financiero cuantificable ante el Directorio en cada fase.",
        kpiSummary: [
          {
            dimension: "Experiencia al Cliente",
            kpiName: "NPS Score",
            value6m: "+8 pts → 49",
            value12m: "+15 pts → 56",
            color: "indigo",
          },
          {
            dimension: "Eficiencia Operativa",
            kpiName: "Costo operativo Tier-1 anual",
            value6m: "Reducción 40%",
            value12m: "Reducción 75% = $8.2M ahorrado",
            color: "violet",
          },
          {
            dimension: "Revenue Uplift",
            kpiName: "Ticket promedio en tienda",
            value6m: "+10% piloto 5 tiendas",
            value12m: "+23% = $27M uplift anual",
            color: "sky",
          },
        ],
        kpis: [
          {
            group: "Experiencia del Cliente — NPS y Retención",
            items: [
              {
                name: "NPS Score",
                baseline: "41 pts (en declive)",
                goal6m: "+8 pts → 49",
                goal12m: "+15 pts → 56",
              },
              {
                name: "Tasa de churn estimada",
                baseline: "18-22% base activa",
                goal6m: "Reducción 8%",
                goal12m: "Reducción 15% = $18M retenidos",
              },
              {
                name: "Clientes en riesgo identificados/semana",
                baseline: "0 (sin modelo predictivo)",
                goal6m: "Top 500 identificados",
                goal12m: "Top 1,000 + campañas activas",
              },
              {
                name: "Tiempo de respuesta WhatsApp",
                baseline: "Horas / días",
                goal6m: "<15 minutos",
                goal12m: "<5 minutos (IA 24/7)",
              },
              {
                name: "Retención clientes VIP",
                baseline: "Sin datos unificados",
                goal6m: "Línea base establecida",
                goal12m: "+12% retención",
              },
            ],
          },
          {
            group: "Eficiencia Operativa — Tier-1 y Contact Center",
            items: [
              {
                name: "Tasa automatización Tier-1 WhatsApp",
                baseline: "<10% (casi manual)",
                goal6m: "45%+",
                goal12m: "75%+",
              },
              {
                name: "Conversaciones simultáneas",
                baseline: "~80/agente/día",
                goal6m: "+1,500 simultáneas (IA)",
                goal12m: "+3,000 simultáneas 24/7",
              },
              {
                name: "Costo operativo Tier-1 anual",
                baseline: ">$1.5M/año",
                goal6m: "Reducción 40%",
                goal12m: "Reducción 75% = $8.2M ahorrado",
              },
              {
                name: "Resolución en primer contacto",
                baseline: "Est. 40-45%",
                goal6m: "65%+",
                goal12m: "80%+ (benchmark líderes)",
              },
              {
                name: "Contact center on-prem (Año 3)",
                baseline: "$4.5M/año en infraestructura",
                goal6m: "Migración iniciada (Fase 3)",
                goal12m: "Descomisionado — $4.5M ahorrado",
              },
            ],
          },
          {
            group: "Revenue Uplift — Clienteling e InStore",
            items: [
              {
                name: "Ticket promedio en tienda",
                baseline: "Sin herramienta de clienteling",
                goal6m: "+10% piloto 5 tiendas",
                goal12m: "+23% = $27M uplift anual",
              },
              {
                name: "Conversión in-store con clienteling",
                baseline: "Sin benchmark (sin herramienta)",
                goal6m: "1.8x vs sin herramienta",
                goal12m: "2.5x vs sin herramienta",
              },
              {
                name: "Tiendas con LuxAssist activo",
                baseline: "0 tiendas",
                goal6m: "5 tiendas piloto",
                goal12m: "100% tiendas (rollout nacional)",
              },
              {
                name: "Adopción mobile app por asociados",
                baseline: "0%",
                goal6m: "70%+ en tiendas piloto",
                goal12m: "90%+ nacional",
              },
              {
                name: "ROI documentado sobre inversión total",
                baseline: "Inversión Fase 1: $180K",
                goal6m: "ROI ≥150% (Fases 1+2)",
                goal12m: "7,846% ROI neto Año 1",
              },
            ],
          },
        ],
      },
      {
        id: "arquitectura",
        label: "Arquitectura",
        title: "System Landscape — VivaLux",
        content:
          "Vista completa del ecosistema tecnológico de VivaLux: sistemas externos, capa de integración MuleSoft, productos Salesforce y el foundation de Einstein Trust Layer.",
        archData: {
          title: "VivaLux System Landscape",
          svgUrl: "/vivalux-landscape.svg",
          zones: [
            {
              id: "external",
              label: "Sistemas Externos",
              color: "slate",
              nodes: [
                {
                  name: "SAP (ERP)",
                  items: ["Finanzas", "Proveedores", "Inventario"],
                },
                {
                  name: "NCR (POS)",
                  items: ["Caja", "Pagos", "Inventario en tienda", "Cambios", "Devoluciones", "Promociones"],
                },
                {
                  name: "Manhattan (Warehouse)",
                  items: ["Recepción", "Picking", "Packing", "Inventario", "Despacho"],
                },
                {
                  name: "Manhattan (OMS)",
                  items: ["Pedidos", "Entregas", "Sourcing", "Shipments", "Cambios", "Devoluciones", "Reembolsos"],
                },
              ],
            },
            {
              id: "salesforce",
              label: "Salesforce Customer 360",
              color: "indigo",
              nodes: [
                {
                  name: "Sales",
                  items: ["Account Management", "Contact Management", "Partner mgmt", "Forecast", "Territories"],
                },
                {
                  name: "Service",
                  items: ["Case management", "SLAs", "Escalations", "Contact Center", "Omni-channel", "Field Service"],
                },
                {
                  name: "Marketing",
                  items: ["Marketing Cloud Engagement", "Personalization", "Loyalty"],
                },
                {
                  name: "Commerce",
                  items: ["Storefront", "Order Management", "Product Catalogs", "Campaigns & Promos"],
                },
                {
                  name: "Industries",
                  items: ["Retail Execution"],
                },
                {
                  name: "Slack",
                  items: ["Slackbot", "Collaboration", "Integration", "3rd party apps", "Agents"],
                },
                {
                  name: "Tableau",
                  items: ["Tableau Cloud", "Tableau Pulse", "Tableau Agent"],
                },
                {
                  name: "Data Cloud",
                  items: ["Harmonization", "Identity resolution", "Segmentation", "Data Graphs", "Calculated Insights", "Unstructured Data / Retrievers"],
                },
              ],
            },
            {
              id: "zerocopy",
              label: "Zero Copy Partner Network",
              color: "sky",
              nodes: [
                {
                  name: "Snowflake (Zero Copy)",
                  items: ["customer_master", "sales_transactions", "order_history"],
                },
              ],
            },
          ],
          bridge: {
            label: "MuleSoft Integration",
            sublabel: "API-Led Connectivity",
            items: ["Anypoint Platform", "Anypoint Design Center", "Anypoint Monitoring", "API Manager"],
          },
          foundation: {
            label: "Einstein Trust Layer — Core Metadata Platform",
            items: ["Built-in AI", "Copilot", "Agentforce"],
          },
        },
      },
      {
        id: "agentforce-landscape",
        label: "Agentforce Landscape",
        title: "Agentforce Landscape — VivaLux",
        content:
          "Mapa del ecosistema de Agentforce para VivaLux: agentes inteligentes, AI Stack, canales de interacción, Customer 360 y Data Cloud.",
        agentforceLandscapeData: {
          title: "VivaLux Agentforce Landscape",
          svgUrl: "/vivalux-agentforce-landscape.svg",
          agents: [
            {
              name: "LuxServe (Service)",
              capabilities: [
                "Order Tracking",
                "Warranty",
                "Troubleshooting",
                "FAQs",
                "Case Management",
              ],
            },
            {
              name: "LuxAssist (In-Store)",
              capabilities: [
                "Order Management",
                "Recommendations",
                "Multi-Store Collab",
                "Customer Insights",
              ],
            },
            {
              name: "LuxInsights (Marketing)",
              capabilities: [
                "Churn Risk",
                "Product Trends",
                "Promotions & Campaigns Insights",
                "Proactive Insights",
              ],
            },
          ],
          customer360: [
            {
              name: "Sales",
              items: ["Account Mgmt", "Contact Mgmt", "Forecast", "Territories"],
            },
            {
              name: "Service",
              items: ["Case Mgmt", "SLAs", "Omni-channel", "Contact Center"],
            },
            {
              name: "Marketing",
              items: ["Engagement", "Personalization", "Loyalty"],
            },
            {
              name: "Commerce",
              items: ["Storefront", "Order Mgmt", "Catalogs", "Promos"],
            },
          ],
          aiStack: [
            {
              name: "Generative Services & Apps",
              items: [
                "Agentforce Studio",
                "Prompt Template",
                "Analytics",
                "Optimization",
              ],
            },
            {
              name: "Foundational Services",
              items: [
                "Generative AI Gateway",
                "Content Moderation",
                "Masking & Demasking",
                "Inference Engine & Domain Adaptation",
              ],
            },
            {
              name: "Foundational Models",
              items: [
                "Internal Models by Salesforce",
                "Salesforce-Hosted Models",
                "OpenAI",
                "Anthropic",
                "Vertex AI",
                "AWS Sagemaker",
                "Cohere",
              ],
            },
            {
              name: "Human in the Loop",
              items: ["Content Review", "Feedback"],
            },
          ],
          channels: [
            {
              name: "Messaging",
              items: ["WhatsApp", "SMS", "Web Chat", "Email"],
            },
            {
              name: "Slack",
              items: ["Slackbot", "Internal Collab", "Agent Notifications"],
            },
            {
              name: "Tableau",
              items: ["Tableau Cloud", "Tableau Pulse", "Tableau Agent"],
            },
          ],
          dataCloud: [
            {
              name: "AI Ready Data",
              items: ["DMO Retriever", "File Retriever", "Web Retriever", "Data Libraries"],
            },
            {
              name: "Unificación",
              items: ["Harmonization", "Identity Resolution", "Segmentation"],
            },
            {
              name: "Insights",
              items: ["Data Graphs", "Calculated Insights"],
            },
            {
              name: "Unstructured",
              items: ["Unstructured Data", "Retrievers"],
            },
          ],
        },
      },
      {
        id: "assets",
        label: "Assets",
        title: "Assets de la solución",
        content:
          "Materiales disponibles y por desarrollar para soportar la conversación con VivaLux Retail Group.",
        assetsData: {
          items: [
            {
              name: "Plan de Cuenta Estratégico",
              description:
                "Documento completo con análisis de 5 dolores críticos, arquitectura del Customer Intelligence Agent Ecosystem, business case ROI 340% y roadmap 18 meses.",
              available: true,
              type: "doc",
              url: "/plan_cuenta_vivalux.docx.pdf",
            },
            {
              name: "Deck Ejecutivo Board VivaLux",
              description:
                "Presentación de 20 min para el Directorio: problema, solución, ROI por fase y próximos pasos — co-presentada con IT Director como co-sponsor técnico.",
              available: true,
              type: "deck",
              url: "/customer-demos/vivalux/deck/executive",
            },
            {
              name: "Demo en Vivo LuxServe en WhatsApp",
              description:
                "Demo live de Agentforce resolviendo un caso real de VivaLux (order status en WhatsApp simulado con datos ficticios de muestra).",
              available: false,
              type: "video",
            },
            {
              name: "Arquitectura de Referencia",
              description:
                "Diagrama de la arquitectura de solución completa: capas de datos, integración y agentes inteligentes del Customer Intelligence Ecosystem sobre Salesforce Platform.",
              available: true,
              type: "arch",
              url: "/[JGR]VivaLux-System-landscape.pdf",
            },
            {
              name: "Agentforce Landscape",
              description:
                "Mapa completo del ecosistema de Agentforce para VivaLux: agentes, capacidades y puntos de integración dentro de la plataforma Salesforce.",
              available: true,
              type: "arch",
              url: "/[JGR]VivaLux-Agentforce-landscape.pdf",
            },
            {
              name: "Mockup LuxAssist Mobile Clienteling App",
              description:
                "Vista del Customer 360 en mobile para asociados de tienda: historial online, Loyalty Risk Score, pedidos activos y recomendaciones personalizadas.",
              available: false,
              type: "mockup",
            },
          ],
        },
      },
    ],
    translations: {
      en: {
        title: "Intelligent Customer Experience Transformation with Agentforce",
        description: "Strategic account plan to transform VivaLux's post-purchase experience through Salesforce Agentforce, Service Cloud, and Data Cloud — reversing a 21-point NPS drop and unlocking $180M+ in combined value from operational savings, retention, and revenue uplift.",
        industry: "Omnichannel Retail — Fashion and Home Goods",
        tabs: [
          { id: "overview", label: "Overview", title: "Executive summary", content: "VivaLux Retail Group faces a dangerous paradox: its commercial growth is being eroded by a post-purchase experience that doesn't scale. In 18 months, NPS dropped from 62 to 41 — a critical signal representing tens of millions in at-risk revenue. This plan proposes an executable roadmap in 3 phases with a projected 340% ROI in the first year." },
          { id: "customer", label: "Client / industry", title: "Client and industry", content: "Omnichannel fashion and home goods retailer with multi-country presence in Latin America. Business model combining physical stores, e-commerce, WhatsApp, and social media. Its strategic ambition is aggressive expansion in 3 years — new markets, more stores, and digital channels." },
          { id: "context", label: "Context", title: "Challenge context", content: "Five critical pain points with quantifiable financial impact. This diagnosis is not just technical — it is the foundation of the business case for the Board." },
          { id: "objective", label: "Objective", title: "Reconvert every touchpoint into an intelligent, proactive experience.", content: "Three value hypotheses. One platform. Measurable results in 90 days." },
          { id: "solution", label: "Solution", title: "Customer Intelligence Agent Ecosystem", content: "Four intelligent agents built on three pillars: unified data (Data Cloud), robust integration (MuleSoft), and agentic intelligence (Agentforce). Each agent acts autonomously within defined guardrails and collaborates with the others seamlessly." },
          { id: "storytelling", label: "Narrative", title: "Value narrative", content: "This is not a license sale. It is a fundamental reconfiguration of how VivaLux understands, anticipates, and serves its customers." },
          { id: "historia", label: "Story", title: "Customer Story", content: "María Clara's complete journey: from online purchase to watching the World Cup final with her family, thanks to the coordinated effort between LuxServe and LuxAssist." },
          { id: "outcomes", label: "Results", title: "Expected outcomes", content: "Success KPIs are organized across three dimensions: customer experience, operational efficiency, and revenue uplift. Each metric has a documented baseline, 6-month target, and 12-month target — designed to demonstrate quantifiable financial value to the Board at each phase." },
          { id: "arquitectura", label: "Architecture", title: "System Landscape — VivaLux", content: "Full view of the VivaLux technology ecosystem: external systems, MuleSoft integration layer, Salesforce products, and the Einstein Trust Layer foundation." },
          { id: "agentforce-landscape", label: "Agentforce Landscape", title: "Agentforce Landscape — VivaLux", content: "Map of the Agentforce ecosystem for VivaLux: intelligent agents, AI Stack, interaction channels, Customer 360, and Data Cloud." },
          { id: "assets", label: "Assets", title: "Solution assets", content: "Available and to-be-developed materials to support the conversation with VivaLux Retail Group." },
        ],
      },
      pt: {
        title: "Transformação Inteligente da Experiência do Cliente com Agentforce",
        description: "Plano de conta estratégico para transformar a experiência pós-compra da VivaLux por meio do Salesforce Agentforce, Service Cloud e Data Cloud — revertendo uma queda de 21 pontos no NPS e desbloqueando mais de $180M em valor combinado de economias operacionais, retenção e aumento de receita.",
        industry: "Varejo Omnicanal — Moda e Artigos para Casa",
        tabs: [
          { id: "overview", label: "Overview", title: "Resumo executivo", content: "O VivaLux Retail Group enfrenta um paradoxo perigoso: seu crescimento comercial está sendo erodido por uma experiência pós-compra que não escala. Em 18 meses, o NPS caiu de 62 para 41 — um sinal crítico que representa dezenas de milhões em receita em risco. Este plano propõe um roadmap executável em 3 fases com ROI projetado de 340% no primeiro ano." },
          { id: "customer", label: "Cliente / indústria", title: "Cliente e indústria", content: "Varejista omnicanal de moda e artigos para casa com presença em múltiplos países na América Latina. Modelo de negócio que combina lojas físicas, e-commerce, WhatsApp e redes sociais. Sua ambição estratégica é a expansão agressiva em 3 anos — novos mercados, mais lojas e canais digitais." },
          { id: "context", label: "Contexto", title: "Contexto do desafio", content: "Cinco pontos de dor críticos com impacto financeiro quantificável. Este diagnóstico não é apenas técnico — é a base do caso de negócio para o Conselho." },
          { id: "objective", label: "Objetivo", title: "Reconverter cada ponto de contato em uma experiência inteligente e proativa.", content: "Três hipóteses de valor. Uma plataforma. Resultados mensuráveis em 90 dias." },
          { id: "solution", label: "Solução", title: "Customer Intelligence Agent Ecosystem", content: "Quatro agentes inteligentes construídos sobre três pilares: dados unificados (Data Cloud), integração robusta (MuleSoft) e inteligência agêntica (Agentforce). Cada agente age de forma autônoma dentro de guardrails definidos e colabora com os demais de forma fluida." },
          { id: "storytelling", label: "Narrativa", title: "Narrativa de valor", content: "Não é uma venda de licenças. É uma reconfiguração fundamental de como a VivaLux entende, antecipa e serve seus clientes." },
          { id: "historia", label: "História", title: "História do Cliente", content: "A jornada completa de María Clara: desde a compra online até assistir à final da Copa do Mundo com sua família, graças à coordenação entre LuxServe e LuxAssist." },
          { id: "outcomes", label: "Resultados", title: "Resultados esperados", content: "Os KPIs de sucesso estão organizados em três dimensões: experiência do cliente, eficiência operacional e aumento de receita. Cada métrica tem uma linha de base documentada, meta de 6 meses e meta de 12 meses — projetadas para demonstrar valor financeiro quantificável ao Conselho em cada fase." },
          { id: "arquitectura", label: "Arquitetura", title: "System Landscape — VivaLux", content: "Visão completa do ecossistema tecnológico da VivaLux: sistemas externos, camada de integração MuleSoft, produtos Salesforce e a fundação Einstein Trust Layer." },
          { id: "agentforce-landscape", label: "Agentforce Landscape", title: "Agentforce Landscape — VivaLux", content: "Mapa do ecossistema Agentforce para VivaLux: agentes inteligentes, AI Stack, canais de interação, Customer 360 e Data Cloud." },
          { id: "assets", label: "Ativos", title: "Ativos da solução", content: "Materiais disponíveis e a serem desenvolvidos para apoiar a conversa com o VivaLux Retail Group." },
        ],
      },
    },
  },
  {
    slug: "grupo-argos",
    title: "Cementos Argos — Plataforma de Inteligencia Comercial con Agentforce",
    customerName: "Grupo Argos",
    industry: "Materiales de Construcción",
    description:
      "Plan de cuenta estratégico articulado en tres pilares: Market Share (+15%), Segmentación de alta resolución e Integración Tecnológica. Argos ya opera Salesforce — la conversación es de evolución y profundización hacia una plataforma agéntica con Agentforce, con Slack como sistema operativo del asesor y la dirección.",
    logo: "/Customers/logo-argos.svg",
    passcode: "argos2026",
    tags: [
      "Sales Cloud",
      "Agentforce",
      "Service Cloud",
      "Marketing Cloud",
      "Data Cloud",
      "Slack",
      "MuleSoft",
      "Manufacturing",
    ],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        title: "Resumen ejecutivo",
        banner: "/Customers/cementos-argos.jpg",
        content:
          "Cementos Argos ya opera Salesforce — la conversación es de evolución y profundización. Este plan articula 20 iniciativas sobre tres pilares estratégicos: Market Share (+15%), Segmentación de alta resolución e Integración Tecnológica. Slack atraviesa los tres pilares como el sistema operativo del asesor — una sola interfaz donde se prepara cada visita, se consulta la Vista 360, se registran actividades y se reciben las alertas RADAR sin abrir el CRM.",
        overviewData: {
          stats: [
            { value: "90+", label: "Años de trayectoria" },
            { value: "$5.3B", label: "COP ingresos 2024 (consolidado)" },
            { value: "16", label: "Países y territorios" },
            { value: "40%+", label: "Ventas digitales (Argos ONE)" },
            { value: "11%", label: "Crecimiento canal ferreterías 2025" },
            { value: "25%", label: "Margen EBITDA 2025 — meta SPRINT cumplida" },
          ],
        },
      },
      {
        id: "customer",
        label: "Cliente / industria",
        title: "Cliente e industria",
        content:
          "Producción y comercialización de cemento, concreto y agregados. Sede en Medellín, Colombia. SPRINT 4.0 activo: márgenes EBITDA 24-26%, crecimiento y digitalización para 2026-2027.",
        customerProfile: {
          stats: [
            { label: "Nombre", value: "Cementos Argos S.A. (subsidiaria de Grupo Argos S.A.)" },
            { label: "Sede", value: "Medellín, Colombia" },
            { label: "Fundación", value: "1934 — 90+ años de trayectoria" },
            { label: "Ingresos 2024", value: "COP 5.3 billones (~USD 1,300M)" },
            { label: "EBITDA 2025", value: "COP 1.3 billones | Margen 25% (meta SPRINT cumplida 1 año antes)" },
            { label: "Meta Market Share", value: "+15% — Pilar estratégico #1" },
            { label: "Canal Masivo 2025", value: "11% crecimiento en ferreterías (Retail Digital)" },
            { label: "Clientes clave", value: "~360 (80% del volumen)" },
            { label: "Integrador CRM", value: "Quantics" },
            { label: "Canal digital", value: "Argos ONE (40%+ ventas digitales)" },
            { label: "Programa", value: "SPRINT 4.0 (2026-2027)" },
          ],
          segments: [
            {
              name: "Negocio Industrial",
              description:
                "Atiende obras de infraestructura, constructoras y proyectos licitados. Cotizaciones técnicas complejas de cemento, concreto y agregados. Seguimiento de obras registradas en Galería Inmobiliaria y Licitacion.info. Stakeholders: Jorge Mario Yepes, Luz Cristina (apoyo industrial).",
            },
            {
              name: "Negocio Masivo — Canal Retail Digital",
              description:
                "Gestiona ~360 clientes que representan el 80% del volumen: ferreterías (crecimiento 11% en 2025), distribuidores mayoristas/detallistas y cadenas (Homecenter, Easy). Principal vehículo para el objetivo de +15% de market share. Stakeholders: Carlos Alzate, Sandra Pulgarin (Admin CRM), Carolina Camacho, Luz Mari.",
            },
          ],
          techStack: [
            { category: "CRM", tool: "Salesforce (Sales Cloud + Service Cloud — en producción)" },
            { category: "ERP", tool: "SAP (sin integración en tiempo real — brecha Pilar 3)" },
            { category: "BI", tool: "Tableau (reportes de ventas y RADAR de fuga)" },
            { category: "E-commerce", tool: "Argos ONE (sin visibilidad en Salesforce — brecha Pilar 3)" },
            { category: "Email Mktg", tool: "Brevo (envío masivo, sin microsegmentación — brecha Pilar 2)" },
            { category: "Fidelización", tool: "Gluki (integrado con CRM para Argos Amigos y Trade Mkt)" },
            { category: "Contact Center", tool: "Konecta / BTO (sin integración omnicanal — brecha Pilar 3)" },
            { category: "Integrador CRM", tool: "Quantics (soporte y desarrollo Salesforce)" },
            { category: "Com. interna", tool: "Grupos de WhatsApp (no estandarizado, sin trazabilidad — Slack como reemplazo propuesto en Pilar 1)" },
            { category: "SO del Asesor (propuesto)", tool: "Slack + Slackbot — base para gestionar el ciclo completo de venta del CRM, registrar visitas y operar Vista 360 sin salir de la conversación (Pilar 1)" },
          ],
        },
      },
      {
        id: "context",
        label: "Contexto",
        title: "Contexto del reto",
        content:
          "Las sesiones de discovery revelaron un ecosistema CRM activo pero con brechas críticas en tres dimensiones. Cada brecha está mapeada a uno de los tres pilares estratégicos de Cementos Argos.",
        contextData: {
          groups: [
            {
              name: "PILAR 1 — Market Share: Brechas Comerciales",
              findings: [
                "Asesor sin un sistema operativo único — la información del cliente vive repartida entre CRM, correo, WhatsApp y Excel; el asesor empieza el día sin un lugar único donde ver foco, tareas y agenda",
                "Sin preparación asistida de la visita: el asesor arma manualmente el contexto del cliente antes de cada reunión, sin briefing automático ni Vista 360 conversacional",
                "Plan de visitas 100% manual: sin optimización de rutas ni ciclos automatizados por territorio",
                "Oportunidades no capturadas: creación manual, dependiente de la acción del asesor",
                "Sin mecanismo de alerta para clientes que reducen volumen o llevan días sin actividad — RADAR existe pero no llega al asesor en tiempo real ni en su herramienta de trabajo",
                "Cotización de concretos excesivamente compleja — frena el cierre de oportunidades",
                "Reporte diario de ventas por email en Excel con rezago de 24h+ — toma de decisiones lenta",
                "Liberación de pedidos manual con fotos de consignaciones vía WhatsApp — alta carga operativa",
              ],
            },
            {
              name: "PILAR 2 — Segmentación: Brechas de Marketing y Fidelización",
              findings: [
                "Segmentación básica: sin perfiles diferenciados por tipo de ferretería, tamaño o productos clave",
                "Campañas de fidelización (Argos Amigos, Trade Mkt) con cargue manual de bases de datos",
                "Machine Sellers opera manualmente desde el laboratorio digital — sin automatización",
                "Sin trazabilidad entre inversión de marketing (Trade Mkt, promociones) y venta real",
                "Chatter implementado pero no utilizado como canal de colaboración ni para campañas",
                "Base de datos no enriquecida: sin atributos de comportamiento digital (Argos ONE)",
              ],
            },
            {
              name: "PILAR 3 — Integración: Brechas Tecnológicas",
              findings: [
                "Argos ONE (40%+ de ventas digitales) no está integrado con Salesforce — experiencia fragmentada",
                "Salesforce y SAP sin integración en tiempo real: inventario, crédito y capacidad requieren verificación manual",
                "Servicio al Cliente opera sin visibilidad del comportamiento digital del cliente en Argos ONE",
                "PQRs gestionadas en silos por canal (WhatsApp, web, Contact Center, RRSS) sin consolidación",
                "Múltiples líneas de WhatsApp sin unificación ni agente centralizado",
                "Sin capacidad offline robusta en la app móvil — pérdida de información en campo",
              ],
            },
          ],
        },
      },
      {
        id: "objective",
        label: "Objetivo",
        title: "Posicionar Salesforce como la plataforma que habilita los tres pilares de Argos.",
        content:
          "20 iniciativas. 3 pilares estratégicos. Una plataforma que conecta tecnología con los resultados del negocio.",
        objective: {
          headline:
            "Posicionar a Salesforce como la plataforma que habilita los tres pilares estratégicos de Cementos Argos: crecer en market share con herramientas comerciales para el canal masivo, desplegar fidelización con microsegmentación de alta resolución, e integrar el ecosistema para dar visión 360 unificada.",
          okrs: [
            {
              label: "PILAR 1 — Market Share",
              description:
                "Meta: +15% de crecimiento. Equipar al equipo comercial con herramientas que aumenten la productividad en campo y la conversión de oportunidades. Canal ferreterías ya creció 11% en 2025 — hay mercado resiliente que capturar. Slack se convierte en el sistema operativo del asesor: la pestaña Hoy organiza foco, tareas y agenda; Slackbot prepara cada reunión con briefing y RADAR integrado; la Vista 360 se consulta dentro del chat sin abrir el CRM; cada visita queda registrada desde la misma conversación.",
              enabler: "Slack + Slackbot + Sales Cloud + Agentforce SDR + Salesforce Maps",
              color: "indigo",
            },
            {
              label: "PILAR 2 — Segmentación",
              description:
                "Alta resolución y agilidad operativa sin aumentar headcount. Microsegmentación para campañas efectivas, automatización de Machine Sellers y trazabilidad completa inversión de marketing → venta real (ROI).",
              enabler: "Marketing Cloud + Data Cloud + Agentforce Mktg",
              color: "violet",
            },
            {
              label: "PILAR 3 — Integración Tecnológica",
              description:
                "Eliminar silos de información. Argos ONE visible en CRM. Salesforce integrado con SAP en tiempo real. Visión 360 del cliente para ventas y servicio.",
              enabler: "MuleSoft + Service Cloud + WhatsApp Business API",
              color: "sky",
            },
          ],
        },
      },
      {
        id: "storytelling",
        label: "Narrativa",
        title: "Narrativa de valor",
        content: "Los tres pilares no son un framework inventado: son el diagnóstico honesto de las tres brechas que separan a Argos de su próximo nivel de desempeño.",
        narrativeData: {
          quote:
            "El cemento construye estructuras. La tecnología construye relaciones. Juntos, construimos el futuro comercial de Argos.",
          pillars: [
            {
              title: "Market share porque hay mercado — y porque el asesor por fin tiene una sola interfaz",
              description:
                "El canal de ferreterías creció 11% en 2025 con las herramientas actuales. Con Slack como sistema operativo del asesor (pestaña Hoy, preparación de reuniones con Slackbot, Vista 360 conversacional, RADAR en tiempo real), sumado a Salesforce Maps y Agentforce SDR, el camino hacia el +15% deja de depender de la disciplina individual y empieza a depender del sistema.",
            },
            {
              title: "Segmentación porque la genérica desperdicia",
              description:
                "Cada punto de participación de mercado vale miles de millones. La microsegmentación con Data Cloud sobre datos existentes tiene un costo marginal comparado con construir desde cero.",
            },
            {
              title: "Integración porque los silos cuestan",
              description:
                "Argos ONE genera el 40%+ de las ventas. Cada día sin integración con Salesforce es un día donde el equipo de servicio opera a ciegas. MuleSoft tiene conectores nativos para SAP — no es desarrollo desde cero.",
            },
          ],
          closing:
            "2026 es el año ideal: SPRINT 4.0 exige márgenes EBITDA 24-26%, Agentforce for Manufacturing disponible con habilidades preconfiguradas, y la base de clientes ya existe en Salesforce. El time-to-value es significativamente menor que hace 12 meses.",
        },
      },
      {
        id: "solution",
        label: "Solución",
        title: "Solución propuesta",
        content:
          "La arquitectura propuesta es una respuesta directa a los tres pilares estratégicos de Argos. Cada capa de la plataforma está alineada con al menos un pilar, y la integración entre capas cierra las brechas identificadas en el proceso de discovery.",
        solution: [
          {
            product: "Slack + Slackbot + Sales Cloud + Agentforce SDR + Maps",
            focus: "PILAR 1 — Market Share",
            color: "indigo",
            items: [
              "Slack como sistema operativo del asesor — la pestaña Hoy reúne foco, tareas, agenda y alertas RADAR en una sola pantalla; no es necesario abrir el CRM",
              "Preparación de reuniones asistida por Slackbot — link 'preparar reunión' que devuelve briefing completo del cliente, histórico, cartera, cupo y reporte RADAR del día",
              "Vista 360 conversacional dentro de Slack — el asesor pregunta y obtiene en un solo bloque la información que antes vivía repartida en cinco pestañas del CRM",
              "Alertas RADAR entregadas por Slack en cualquier momento — el asesor no espera el reporte semanal; las recibe en tiempo real con acción sugerida",
              "Registro de visitas y actualización de oportunidades desde el mismo Slack — sin abrir otra pantalla",
              "Funnel de conversión automatizado (Agente SDR)",
              "Ingesta obras/licitaciones desde Galería Inmobiliaria, Licitacion.info y Secop",
              "Pedido sugerido por Einstein AI dentro del chat",
              "Plan de visitas inteligente por ruta y territorio (Salesforce Maps)",
              "Cotización inteligente multiproducto (cemento, concreto, agregados)",
              "Dashboards en tiempo real por nivel jerárquico, publicados en canales de Slack para asesor, jefe de zona y dirección",
              "Gestión de obras con alertas de finalización",
            ],
          },
          {
            product: "Marketing Cloud + Data Cloud + Agentforce Mktg",
            focus: "PILAR 2 — Segmentación",
            color: "violet",
            items: [
              "Microsegmentación: ferreterías A/B/C por volumen, constructoras por proyecto, distribuidores por canal",
              "Journey Builder por perfil y comportamiento",
              "Machine Sellers: venta cruzada/incremental automatizada",
              "Argos Amigos — fidelización multicanal automatizada",
              "Trade Marketing: gestión de acciones, inversión y analítica de ROI",
              "Trazabilidad completa: inversión en campaña → activación → pedido → venta",
              "Reactivación automática de clientes inactivos",
              "Unificación Brevo + Gluki en Data Cloud",
            ],
          },
          {
            product: "MuleSoft + Service Cloud + WhatsApp API",
            focus: "PILAR 3 — Integración Tecnológica",
            color: "sky",
            items: [
              "Integración Argos ONE ↔ Salesforce en tiempo real vía MuleSoft",
              "Conector SAP ↔ Salesforce: inventario, crédito y capacidad productiva desde CRM",
              "Service Cloud Omni-Channel: PQRs unificados desde todos los canales",
              "WhatsApp Business API: línea única con Agente autónomo para pedidos y PQRs",
              "PQR automatizado con clasificación inteligente y SLAs",
              "Liberación de pedidos digitalizada (sin fotos de consignaciones manuales)",
              "App móvil robusta con capacidad offline",
              "Visión 360 Servicio: CRM + Argos ONE + SAP unificados",
            ],
          },
        ],
      },
      {
        id: "arquitectura",
        label: "Arquitectura",
        title: "Arquitectura Técnica — Cementos Argos",
        content:
          "Vista completa de las 4 capas de la solución: canales de contacto, plataforma Salesforce (9 productos + Agentforce transversal), capa de integración MuleSoft (5 conectores bidireccionales en tiempo real) y sistemas externos del ecosistema Argos. Las brechas críticas de integración están marcadas con su estado y solución propuesta.",
        argosArch: true,
      },
      {
        id: "outcomes",
        label: "Resultados",
        title: "Resultados esperados",
        content:
          "Los KPIs de éxito se organizan por pilar estratégico. Cada métrica tiene línea base documentada en sesiones de discovery, meta a 6 meses y meta a 12 meses.",
        argosKpiSummary: true,
        kpis: [
          {
            group: "PILAR 1 — Market Share: KPIs Comerciales",
            items: [
              {
                name: "Adopción de Slack como SO del asesor",
                baseline: "0% — sin Slack como base del ciclo de venta",
                goal6m: "60% del equipo arranca el día en la pestaña Hoy y prepara visitas con Slackbot",
                goal12m: "90%+ gestiona Vista 360, RADAR y registro de visitas en Slack sin abrir el CRM",
              },
              {
                name: "Visitas con briefing automático antes de la reunión",
                baseline: "Preparación manual ad-hoc",
                goal6m: "70%+ visitas preparadas con Slackbot",
                goal12m: "95%+ visitas con briefing + Vista 360 entregados en Slack",
              },
              {
                name: "Crecimiento de Market Share (Canal Masivo)",
                baseline: "Base: +11% en ferreterías 2025",
                goal6m: "+13%",
                goal12m: "+15% (meta SPRINT)",
              },
              {
                name: "Oportunidades creadas automáticamente",
                baseline: "0% (proceso manual)",
                goal6m: "30%+",
                goal12m: "60%+",
              },
              {
                name: "Cobertura del plan de visitas trimestral",
                baseline: "Manual / parcial",
                goal6m: "85%",
                goal12m: "95%+",
              },
              {
                name: "Clientes en riesgo gestionados proactivamente",
                baseline: "Sin seguimiento sistemático",
                goal6m: "RADAR activo 100% — alertas en Slack en tiempo real",
                goal12m: "Reducción fuga >20%",
              },
              {
                name: "Tiempo de decisión de venta (inventario/crédito)",
                baseline: "Manual — horas/días (sin SAP integrado)",
                goal6m: "Tiempo real (MuleSoft piloto)",
                goal12m: "Tiempo real para todos los asesores",
              },
            ],
          },
          {
            group: "PILAR 2 — Segmentación: KPIs de Marketing y Fidelización",
            items: [
              {
                name: "Segmentos de cliente activos y diferenciados",
                baseline: "Segmentación básica (sin microsegm.)",
                goal6m: "5+ segmentos activos",
                goal12m: "10+ con enriquecimiento IA",
              },
              {
                name: "Campañas Machine Sellers automatizadas",
                baseline: "0 — proceso manual (Lab Digital)",
                goal6m: "2 campañas activas",
                goal12m: "6+ campañas activas",
              },
              {
                name: "Clientes inactivos reactivados por mes",
                baseline: "Sin seguimiento",
                goal6m: "5%+ base inactiva",
                goal12m: "10%+ base inactiva",
              },
              {
                name: "Trazabilidad inversión mktg → venta (ROI)",
                baseline: "Sin trazabilidad",
                goal6m: "Línea base establecida",
                goal12m: "ROI visible por campaña",
              },
              {
                name: "Carga manual Admin CRM (Sandra Pulgarin)",
                baseline: "Alta — construye todos los reportes",
                goal6m: "Reducción 50%",
                goal12m: "Autoservicio completo",
              },
            ],
          },
          {
            group: "PILAR 3 — Integración Tecnológica: KPIs de Experiencia y Eficiencia",
            items: [
              {
                name: "Actividad Argos ONE visible en Salesforce",
                baseline: "0% — silo completo",
                goal6m: "POC integración activo (Meta 3 meses)",
                goal12m: "100% integrado (MuleSoft)",
              },
              {
                name: "Consulta SAP desde Salesforce (inventario/crédito)",
                baseline: "Proceso manual / asíncrono",
                goal6m: "Piloto conector activo",
                goal12m: "Tiempo real para todos los asesores",
              },
              {
                name: "PQRs resueltos por Agente autónomo",
                baseline: "0% — gestión manual Konecta",
                goal6m: "30%+ automatizados",
                goal12m: "50%+ automatizados",
              },
              {
                name: "Canales WhatsApp unificados",
                baseline: "Múltiples líneas separadas",
                goal6m: "1 línea unificada + agente",
                goal12m: "Agente autónomo con >80% resolución",
              },
              {
                name: "NPS post-interacción (medición sistemática)",
                baseline: "Sin medición en CRM",
                goal6m: "Medición activa",
                goal12m: "+8 puntos NPS vs. línea base",
              },
            ],
          },
        ],
      },
      {
        id: "historia",
        label: "Historia",
        title: "El día de Carlos empieza en Slack — y termina recuperando a Don Hernán",
        content:
          "Hernán Ríos lleva años al frente de Ferretería El Paisa en Itagüí, Antioquia. Un cliente masivo clase B que compraba entre 12 y 15 toneladas de cemento al mes — hasta que dejó de hacerlo. Esta historia muestra cómo Carlos Alzate, su asesor en Cementos Argos, comienza el día en Slack — no en el CRM — y desde una sola interfaz prepara la reunión, recibe el RADAR, consulta la Vista 360 y conduce la conversación que convierte un cliente en riesgo de fuga en el distribuidor más activo del trimestre.",
        storyData: {
          protagonist: "Hernán Ríos",
          protagonistRole: "Propietario · Ferretería El Paisa · Itagüí, Antioquia",
          intro: "Hernán Ríos y Ferretería El Paisa son personajes compuestos que representan fielmente el perfil del cliente masivo clase B del canal ferreterías. La historia ilustra el futuro posible habilitado por Salesforce Agentforce — basada en hallazgos reales del proceso de discovery con el equipo de Cementos Argos.",
          scenes: [
            {
              number: 1,
              title: "Slack abre el día — pestaña Hoy",
              subtitle: "Lunes · 06:47 a.m. · Slack mobile · Carlos en su casa, Medellín",
              icon: "💼",
              description: "Antes de tomar el primer café, Carlos Alzate, asesor de Cementos Argos para el canal masivo de Medellín, abre Slack en su celular. No abre el CRM. No abre el correo. No abre WhatsApp. Va directo a la pestaña 'Hoy' — su sistema operativo del día. Allí Slack le muestra exactamente en qué enfocarse: tres oportunidades que necesitan seguimiento, una tarea pendiente del viernes, dos clientes en riesgo según el RADAR nocturno y, en el calendario integrado, su primera reunión: 09:30 a.m. — Ferretería El Paisa, Hernán Ríos. No hay que buscar nada. El día ya está organizado. Su Slackbot incluso le sugiere por dónde empezar: 'Hoy tienes una visita de alto impacto. ¿Quieres prepararla?'",
              channel: "Slack · Slackbot · Calendar · Sales Cloud",
              image: "/Customers/argos/story-v2/Escena-01.png",
              pilar: "P1 · Slack como SO del asesor",
              pilarColor: "indigo",
              products: ["Slack", "Slackbot", "Sales Cloud", "Agentforce"],
              insight: "Antes, el día empezaba revisando WhatsApp, correo y un Excel. Hoy empieza en una sola pestaña — la pestaña Hoy de Slack. Tareas, foco, calendario y alertas convergen donde el asesor ya estaba: la herramienta donde colabora con su equipo.",
            },
            {
              number: 2,
              title: "Preparar reunión — Slackbot arma el briefing",
              subtitle: "Lunes · 07:15 a.m. · Slack desktop · Camino a la oficina",
              icon: "📋",
              description: "Carlos hace click en el link 'Preparar reunión con Hernán Ríos' que Slack le sugirió. En segundos, Slackbot le devuelve un briefing completo en el mismo hilo: histórico de compra (12–15 ton/mes hace un año, 0 ton las últimas tres semanas), última interacción registrada, estado de cartera al día, cupo disponible $8.2M COP y — destacado en rojo — el reporte RADAR de hoy con índice de riesgo 89/100 y acción sugerida. Junto al link del reporte, Slackbot le aclara: esta alerta también pudo haberle llegado en cualquier momento como mensaje directo en Slack, no solo dentro del briefing de la reunión. Antes, Carlos habría tenido que pedirle a Sandra que armara un Excel. Hoy, todo el contexto vive en el chat.",
              channel: "Slack · Slackbot · RADAR · Sales Cloud · Agentforce",
              image: "/Customers/argos/story-v2/Escena-02.png",
              pilar: "P1 · Preparación asistida · P3 · RADAR integrado",
              pilarColor: "indigo",
              products: ["Slack", "Slackbot", "Agentforce SDR", "Einstein AI", "RADAR"],
              insight: "El RADAR ya no es un reporte que se descarga una vez por semana de Tableau. Es una alerta que Slackbot entrega cuando importa — al preparar la reunión, o en cualquier momento del día — directamente en Slack, con contexto y acción sugerida.",
            },
            {
              number: 3,
              title: "Vista 360 desde Slack — sin abrir el CRM",
              subtitle: "Lunes · 07:32 a.m. · Slack mobile · Carro · Camino a Itagüí",
              icon: "🎯",
              description: "Carlos escribe en Slack: '@Slackbot dame la 360 de Hernán Ríos'. La respuesta llega en una sola pantalla. Todo lo que normalmente está repartido entre cinco pestañas del CRM, dos reportes y un correo, ahora cabe en un solo bloque dentro del chat: actividad reciente, pedido sugerido por Einstein (12 ton Argos 50 + 2 ton Cemento Gris), estado de cartera, cupo disponible, programa Argos Amigos vigente y — clave — que Don Hernán entró a Argos ONE hace cinco días y cotizó 8 toneladas sin finalizar el pedido. Esa información antes era invisible. Hoy, gracias a la integración Argos ONE ↔ Salesforce vía MuleSoft, llega al perfil unificado y Slackbot la trae al chat. Carlos no abrió el CRM. No abrió Argos ONE. No abrió SAP. Todo lo gestiona desde Slack — y eso es exactamente el punto.",
              channel: "Slack · Slackbot · MuleSoft · Sales Cloud · Argos ONE · SAP",
              image: "/Customers/argos/story-v2/Escena-03.png",
              pilar: "P1 · Una sola interfaz · P3 · Visión 360 unificada",
              pilarColor: "indigo",
              products: ["Slack", "Slackbot", "MuleSoft", "Argos ONE", "SAP", "Sales Cloud"],
              insight: "El asesor no necesita ir al CRM a buscar la información. Slack se convierte en la interfaz única donde se gestiona todo el ciclo de venta: consulta, prepara, decide y registra. Esa es la promesa del Pilar 1 hecha rutina diaria.",
            },
            {
              number: 4,
              title: "La visita que sí importa",
              subtitle: "Lunes · 09:30 a.m. · Ferretería El Paisa · Itagüí",
              icon: "🤝",
              description: "Carlos llega puntual. Salesforce Maps optimizó su ruta desde la mañana: El Paisa es la primera parada del ciclo porque tiene el índice de riesgo más alto. Don Hernán lo recibe con cara de pocos amigos: 'Parcero, es que el otro man me está dejando el cemento más barato.' Carlos no se pone a la defensiva. Abre su celular y muestra algo que no es un descuento genérico — es una oferta personalizada generada esta mañana por el agente de Marketing Cloud: 12 toneladas Cemento Argos 50 con 200 puntos Argos Amigos adicionales + ingreso al programa Dependientes Argos para los 3 vendedores de la ferretería. Generada automáticamente para ferreterías Clase B en Antioquia con más de 36 meses de antigüedad y volumen en riesgo. Esta oferta no existía ayer. Don Hernán mira los puntos. Sonríe. '¿Y para mis vendedores también?' Carlos confirma.",
              channel: "Salesforce Maps · Marketing Cloud · Data Cloud",
              image: "/Customers/argos/story-v2/Escena-04.png",
              pilar: "P2 · Microsegmentación + Oferta personalizada",
              pilarColor: "violet",
              products: ["Salesforce Maps", "Marketing Cloud", "Data Cloud", "Argos Amigos"],
              insight: "Antes, las campañas de fidelización eran iguales para todos — un email masivo con la misma oferta para Don Hernán que para un distribuidor mayorista de Bogotá. Hoy, la microsegmentación de Data Cloud crea ofertas que Don Hernán siente que fueron diseñadas para él. Porque lo fueron.",
            },
            {
              number: 5,
              title: "El pedido que se hace solo",
              subtitle: "Lunes · 10:55 a.m. · WhatsApp Business · Ferretería El Paisa",
              icon: "💬",
              description: "Don Hernán acepta. Carlos registra la visita desde Slack en 30 segundos — sin abrir el CRM. Slackbot toma los datos, agrega geoetiquetado y crea la actividad en Sales Cloud automáticamente. Luego le dice a Don Hernán: 'Puede hacer el pedido ahora mismo por WhatsApp.' Don Hernán escribe al número único de Cementos Argos. Lo que responde no es un humano: confirma la dirección, consulta inventario en SAP en tiempo real, verifica el cupo de crédito ($8.2M disponibles), confirma entrega para el miércoles y genera el pedido #ARG-2026-048312 en dos minutos, sin intervención humana. Los 200 puntos Argos Amigos quedan aplicados automáticamente. El pedido se registra en Salesforce vinculado al cliente, a la visita de Carlos (registrada desde Slack) y a la campaña de reactivación que lo disparó.",
              channel: "Slack · WhatsApp Business API · Agentforce · SAP · Service Cloud",
              image: "/Customers/argos/story-v2/Escena-05.png",
              pilar: "P3 · Agente autónomo + SAP tiempo real",
              pilarColor: "sky",
              products: ["Slack", "WhatsApp Business API", "Agentforce Service", "MuleSoft SAP", "Service Cloud"],
              insight: "Carlos no abrió el CRM en todo el día. La visita se registró desde Slack, el pedido entró por WhatsApp y todo se reflejó en Sales Cloud en tiempo real. El asesor vive en Slack, el cliente vive en WhatsApp, y los sistemas conversan detrás.",
            },
            {
              number: 6,
              title: "El Machine Seller que nunca para",
              subtitle: "Jueves · 08:15 a.m. · Marketing Cloud · Automatización",
              icon: "🤖",
              description: "Tres días después del pedido, el sistema detecta algo nuevo. Las ferreterías Clase B de Antioquia que compraron cemento en septiembre también compraron mortero seco en octubre — con una correlación del 78%. Einstein lo sabe. Sin que nadie en el laboratorio digital tenga que hacer nada, Agentforce genera y dispara una campaña de venta cruzada personalizada para Don Hernán. A las 9:02 a.m., Don Hernán responde por WhatsApp: 'Si man, ese producto siempre se mueve. Mandame el precio.' A las 9:06 a.m., el pedido de 80 bolsas de mortero ($1.48M COP) está confirmado. Carlos lo ve aparecer en Slack — Slackbot le notifica que su cliente acaba de generar un cross-sell autónomo. Intervención humana requerida: ninguna.",
              channel: "Marketing Cloud · Agentforce · Einstein AI · WhatsApp · Slack",
              image: "/Customers/argos/story-v2/Escena-06.png",
              pilar: "P2 · Machine Sellers automatizado",
              pilarColor: "violet",
              products: ["Marketing Cloud", "Agentforce Marketing", "Data Cloud", "Einstein AI", "Slack"],
              insight: "El equipo de marketing puede ver en tiempo real cuántos pedidos generó esta campaña, cuánto ingreso produjo y cuál fue el ROI exacto. El asesor se entera en su Slack — sin abrir un reporte aparte.",
            },
            {
              number: 7,
              title: "El viernes en Slack — y lo que cambió para Argos",
              subtitle: "Viernes · 16:00 p.m. · Slack · Canal Dirección Zona Antioquia",
              icon: "✨",
              description: "El director de zona de Antioquia abre Slack. Antes, este momento significaba esperar el Excel que Sandra construía los viernes — un reporte con 24 horas de rezago y dos horas de consolidación. Hoy, Slackbot publicó el resumen ejecutivo en el canal de dirección a las 15:58: 847 toneladas en la semana (+12% vs. anterior), 8 clientes reactivados (incluye Ferretería El Paisa), 63 de 70 visitas del plan (90% cumplimiento), 3 clientes en riesgo (bajó de 11), $6.3M COP en ventas cruzadas sin intervención humana. Hernán Ríos no se fue a la competencia. No porque Argos le diera el mejor precio, sino porque Argos llegó en el momento justo, con la oferta correcta, y le hizo más fácil comprar que no hacerlo. Eso no es suerte: +58% de recuperación de volumen, $7.8M COP en ventas adicionales en la semana, 0 minutos que tardó Sandra en construir el reporte. Market Share, Segmentación e Integración funcionaron juntos — y Slack fue la interfaz donde todo se hizo visible para el asesor y para la dirección.",
              channel: "Slack · CRM Analytics · Agentforce · Sales · Marketing · Service · MuleSoft",
              image: "/Customers/argos/story-v2/Escena-EP.png",
              pilar: "Los 3 Pilares — Slack como interfaz transversal",
              pilarColor: "emerald",
              products: ["Slack", "Agentforce", "Sales Cloud", "Marketing Cloud", "Service Cloud", "MuleSoft", "Data Cloud"],
              insight: "Market Share. Segmentación. Integración. Tres pilares, una plataforma, un socio — y una sola interfaz para el asesor y la dirección: Slack.",
            },
          ],
        },
      },
      {
        id: "plan-de-trabajo",
        label: "Plan de trabajo",
        title: "Plan de trabajo — Roadmap ejecutable de oportunidades",
        content:
          "Del diagnóstico a la ejecución. Este plan traduce los 3 pilares y las 20 iniciativas en un roadmap comercial de 18 meses articulado en 4 waves y 12 oportunidades de venta. Cada oportunidad especifica el caso de uso que resuelve, las soluciones Salesforce involucradas, el tiempo estimado de implementación, los prerequisitos que necesitamos del cliente y un dimensionamiento orientativo para dimensionar la propuesta económica.",
        workPlanData: {
          intro:
            "El roadmap sigue una línea crítica: Wave 0 valida y compromete, Wave 1 conquista al asesor, Wave 2 desbloquea segmentación de alta resolución y Wave 3 cierra la visión 360 con el ecosistema integrado. Cada wave habilita técnicamente a la siguiente — no se ejecutan en paralelo por diseño sino por dependencia.",
          horizon: "Jul 2026 → Dic 2027 · 18 meses · alineado a cierre SPRINT 4.0",
          principles: [
            "Cliente pilotea con equipo real antes de escalar (sin big-bang).",
            "Slack es el sistema operativo del asesor desde Wave 1 — no un add-on posterior.",
            "Quantics ejecuta Sales Cloud y Service Cloud; Salesforce PS lidera Data Cloud, Agentforce y MuleSoft.",
            "Cada wave cierra con business review formal (Go/No-Go a la siguiente).",
            "Sizing indicativo — la propuesta comercial formal se firma tras la fase de discovery técnico de Wave 0.",
          ],
          waves: [
            {
              id: "wave-0",
              label: "Wave 0 · Discovery Ejecutivo + Quick Wins",
              window: "Jul 2026 → Ago 2026 (8 semanas)",
              headline: "Alinear, dimensionar y comprometer.",
              focus:
                "No es implementación de plataforma. Es el paquete de trabajo pagado que baja el plan estratégico a un backlog técnico ejecutable, dimensiona la inversión real y firma el contrato marco. Sin esta wave, cualquier estimación posterior es especulación.",
              color: "emerald",
              goals: [
                "Contrato marco firmado con alcance, sizing y comercial de Wave 1 aprobados.",
                "Backlog técnico detallado de las 20 iniciativas priorizadas por valor/esfuerzo.",
                "Arquitectura de referencia validada con Quantics y con TI Argos.",
              ],
              opportunities: [
                {
                  code: "W0-01",
                  name: "Discovery Técnico + Assessment Salesforce actual",
                  pilar: "P0",
                  pilarColor: "emerald",
                  useCase:
                    "Auditar la instancia productiva de Argos, mapear customizaciones de Quantics, medir deuda técnica de Sales y Service Cloud, y proponer plan de saneamiento para habilitar Agentforce sobre base limpia.",
                  salesforceProducts: [
                    "Salesforce Professional Services (Advisory)",
                    "Well-Architected review",
                    "Signals Discovery",
                  ],
                  duration: "3 semanas",
                  prerequisites: [
                    "Acceso solo-lectura al org productivo de Argos.",
                    "Sesiones con Sandra Pulgarin (Admin CRM) y equipo Quantics.",
                    "Reportes de adopción actuales (login history, feature usage).",
                  ],
                  sizing: [
                    "1 equipo advisory Salesforce (arquitecto + business architect).",
                    "~120 horas de consultoría.",
                  ],
                  outcome:
                    "Documento de assessment con hallazgos priorizados + Well-Architected scorecard + roadmap de remediación técnica.",
                },
                {
                  code: "W0-02",
                  name: "Executive Alignment + Value Engineering",
                  pilar: "P0",
                  pilarColor: "emerald",
                  useCase:
                    "Sesión ejecutiva con Dirección Comercial, Dirección de TI y CFO para validar hipótesis de valor por pilar, atar cada iniciativa a un KPI SPRINT 4.0 y construir el business case consolidado que se presentará al Comité.",
                  salesforceProducts: [
                    "Value Engineering (Salesforce)",
                    "Executive Briefing Center (opcional visita)",
                  ],
                  duration: "2 semanas",
                  prerequisites: [
                    "Sponsors ejecutivos identificados (Comercial + TI + Finanzas).",
                    "Data histórica de KPIs del plan de cuenta (baselines documentados).",
                    "Agenda del Comité SPRINT 4.0 alineada.",
                  ],
                  sizing: [
                    "1 sesión Value Discovery (~4 horas).",
                    "1 sesión Executive Readout (~2 horas).",
                    "Value Engineer asignado al programa completo.",
                  ],
                  dependsOn: ["W0-01"],
                  outcome:
                    "Business case firmado con TCV objetivo, ROI proyectado por wave y comité de dirección comprometido con el programa.",
                },
                {
                  code: "W0-03",
                  name: "Contrato Marco + Sizing definitivo Wave 1",
                  pilar: "P0",
                  pilarColor: "emerald",
                  useCase:
                    "Cerrar comercial de Wave 1 (Slack + Agentforce SDR + Sales Cloud extensions) con precio, volumetría y calendario. Marco maestro con precios de referencia para Waves 2 y 3, sujeto a discovery incremental.",
                  salesforceProducts: [
                    "Contrato Marco (MSA + Order Form Wave 1)",
                    "Salesforce Signature Success (opcional)",
                  ],
                  duration: "3 semanas",
                  prerequisites: [
                    "Aprobación Comité SPRINT 4.0.",
                    "Legal Argos y Legal Salesforce coordinados.",
                    "Definición del rol Quantics vs. Salesforce PS en cada wave.",
                  ],
                  sizing: [
                    "Order Form Wave 1 firmado.",
                    "MSA con addendums de Data, Security y GDPR/Habeas Data Colombia.",
                  ],
                  dependsOn: ["W0-02"],
                  outcome:
                    "Contrato firmado. Wave 1 arranca kickoff en septiembre 2026.",
                },
              ],
              clientAsk: [
                "Nombrar Sponsor Ejecutivo (nivel VP) y PMO del programa por Argos.",
                "Confirmar disponibilidad de Sandra Pulgarin, Carlos Alzate, Carolina Camacho y Jorge Mario Yepes para sesiones de discovery.",
                "Acceso solo-lectura a org Salesforce productivo + a Tableau (dashboards RADAR).",
                "Definición de responsabilidad Argos vs. Quantics vs. Salesforce en el governance.",
              ],
            },
            {
              id: "wave-1",
              label: "Wave 1 · Pilar 1 — Slack como SO del asesor",
              window: "Sep 2026 → Feb 2027 (6 meses)",
              headline: "El asesor arranca el día en Slack, no en el CRM.",
              focus:
                "La wave que mueve la aguja del KPI +15% market share. Slack se convierte en la interfaz única del ciclo de venta: pestaña Hoy, Slackbot para preparación de reuniones, Vista 360 conversacional, RADAR en tiempo real, registro de visitas y aprobación de oportunidades desde el chat. Se despliega piloto en Antioquia (~40 asesores) antes de escalar nacional.",
              color: "indigo",
              goals: [
                "60% del equipo de canal masivo arranca el día en Slack.",
                "70%+ de visitas preparadas con briefing automático.",
                "RADAR llega al asesor en Slack en <5 minutos vs. reporte semanal actual.",
                "Adopción validada en Antioquia → luz verde para rollout nacional Wave 2.",
              ],
              opportunities: [
                {
                  code: "W1-01",
                  name: "Slack + Sales Cloud Integration Core",
                  pilar: "P1",
                  pilarColor: "indigo",
                  useCase:
                    "Desplegar Slack para toda la fuerza comercial de canal masivo con integración nativa Sales Cloud: canales por territorio, pestaña Hoy con foco/tareas/agenda, mensajería DM con clientes internos y Chatter migrado a Slack.",
                  salesforceProducts: [
                    "Slack Business+ (canales, huddles, workflows)",
                    "Sales Cloud Enterprise / Unlimited (verificar edición actual)",
                    "Slack Sales Elevate (integración nativa Sales-Slack)",
                  ],
                  duration: "10 semanas",
                  prerequisites: [
                    "SSO corporativo Argos (Azure AD o Okta) validado.",
                    "Política de seguridad y DLP aprobada por CISO.",
                    "Lista de canales por territorio y jerarquía comercial.",
                    "Change management plan con RH y Comunicaciones internas.",
                  ],
                  sizing: [
                    "~150-250 usuarios Slack Business+ (piloto Antioquia + expansión).",
                    "~150-250 licencias Sales Cloud Enterprise (base ya existente — verificar upgrade).",
                    "~50-80 licencias Slack Sales Elevate (asesores y jefes de zona).",
                  ],
                  outcome:
                    "Slack productivo con 100% de asesores del piloto conectados. Ciclo de venta operable desde Slack sin abrir CRM.",
                },
                {
                  code: "W1-02",
                  name: "Slackbot Conversacional + Vista 360",
                  pilar: "P1",
                  pilarColor: "indigo",
                  useCase:
                    "Construir el Slackbot que responde '@Slackbot dame la 360 de [cliente]', prepara briefings automáticos antes de cada reunión (histórico + cartera + cupo + RADAR + Argos ONE) y permite registrar visitas desde el chat con geoetiquetado.",
                  salesforceProducts: [
                    "Agentforce for Sales (Employee Agent)",
                    "Data Cloud (perfil unificado — foundation edition)",
                    "Slack Platform (Slack apps + Bolt SDK)",
                    "Einstein Trust Layer",
                  ],
                  duration: "12 semanas",
                  prerequisites: [
                    "Fuentes de datos identificadas: Sales Cloud, Argos ONE (API), Tableau RADAR, cartera SAP (feed batch aceptable en esta wave).",
                    "Definición del prompt corporativo y guardrails de Agentforce.",
                    "Aprobación de datos que Agentforce puede consumir (compliance).",
                  ],
                  sizing: [
                    "1 agente Agentforce Sales productivo.",
                    "Data Cloud: ~1-3 millones Customer Information (perfiles asesor + cliente).",
                    "~50K-100K Einstein Requests/mes (proyección piloto).",
                  ],
                  dependsOn: ["W1-01"],
                  outcome:
                    "Asesor pide 360, briefing y registra visita desde Slack. Tiempo de preparación de reunión: <2 min vs. ~20 min actual.",
                },
                {
                  code: "W1-03",
                  name: "RADAR de Fuga en Slack + Salesforce Maps",
                  pilar: "P1",
                  pilarColor: "indigo",
                  useCase:
                    "Migrar el reporte RADAR de Tableau (semanal) a alertas Slack en tiempo real con acción sugerida. Añadir Salesforce Maps para plan de visitas inteligente por ruta y territorio con optimización.",
                  salesforceProducts: [
                    "Salesforce Maps (Standard + Territory Planning)",
                    "Data Cloud Segments + Activation",
                    "Slack workflows + Slack notifications",
                    "Einstein Discovery (opcional — modelo de propensión de fuga)",
                  ],
                  duration: "8 semanas",
                  prerequisites: [
                    "Modelo RADAR actual documentado (variables, umbral, frecuencia).",
                    "Datos de geolocalización de clientes (direcciones normalizadas).",
                    "Territorios formales de canal masivo cargados en Salesforce.",
                  ],
                  sizing: [
                    "~150-250 licencias Salesforce Maps.",
                    "~5-10 territorios activos (piloto).",
                  ],
                  dependsOn: ["W1-02"],
                  outcome:
                    "Alerta RADAR llega al asesor <5 min después de detección. Cobertura del plan de visitas trimestral pasa de manual a 85%+.",
                },
                {
                  code: "W1-04",
                  name: "Cotización Inteligente + Pedido Sugerido (Agentforce SDR)",
                  pilar: "P1",
                  pilarColor: "indigo",
                  useCase:
                    "Simplificar la cotización de concretos y agregados con un asistente en Slack que sugiere producto/volumen/precio y arma el CPQ. Agentforce SDR ingesta obras nuevas de Galería Inmobiliaria, Licitacion.info y Secop, y crea oportunidades automáticamente.",
                  salesforceProducts: [
                    "Salesforce CPQ (Revenue Cloud)",
                    "Agentforce Sales (SDR Agent)",
                    "Einstein AI for Sales (pedido sugerido)",
                    "MuleSoft Composer (para conectores no productivos: Galería, Licitación, Secop)",
                  ],
                  duration: "12 semanas",
                  prerequisites: [
                    "Reglas de negocio actuales de cotización de concreto documentadas.",
                    "Catálogo maestro de productos limpio en Sales Cloud.",
                    "Contratos de acceso a Galería Inmobiliaria, Licitacion.info y Secop.",
                    "Reglas de aprobación (montos, descuentos, plazos).",
                  ],
                  sizing: [
                    "~150-250 licencias CPQ.",
                    "1 agente Agentforce SDR productivo.",
                    "MuleSoft Composer con ~3 conectores externos.",
                  ],
                  dependsOn: ["W1-01"],
                  outcome:
                    "Tiempo de cotización de concretos: horas → minutos. Oportunidades creadas automáticamente: 0% → 30%+.",
                },
              ],
              clientAsk: [
                "Definir el piloto (recomendado: Antioquia, ~40 asesores + 3 jefes de zona).",
                "SSO corporativo funcionando (Azure AD/Okta) + DLP aprobado.",
                "Modelo RADAR actual documentado (Sandra Pulgarin + equipo Analítica).",
                "Reglas de cotización de concreto documentadas por producto.",
                "Change management activo: comunicación, entrenamiento y adopción con RH.",
                "Contratos vigentes con Galería Inmobiliaria, Licitacion.info y Secop (o proceso de compra iniciado).",
              ],
            },
            {
              id: "wave-2",
              label: "Wave 2 · Pilar 2 — Segmentación de alta resolución",
              window: "Mar 2027 → Ago 2027 (6 meses)",
              headline: "Cada punto de mercado vale millones. La genérica desperdicia.",
              focus:
                "Con Slack ya como interfaz del asesor, ahora activamos Marketing Cloud + Data Cloud para microsegmentar (ferreterías A/B/C, constructoras por proyecto, distribuidores por canal), automatizar Machine Sellers, dar trazabilidad ROI a Trade Marketing y reactivar clientes inactivos. Argos Amigos y Gluki se unifican en Data Cloud.",
              color: "violet",
              goals: [
                "5+ segmentos activos y diferenciados a 6 meses.",
                "2 campañas Machine Sellers automatizadas (venta cruzada).",
                "Reactivación de 5%+ de la base inactiva mensual.",
                "Reducción 50% de carga manual del Admin CRM (Sandra Pulgarin).",
              ],
              opportunities: [
                {
                  code: "W2-01",
                  name: "Data Cloud — Perfil unificado del cliente masivo",
                  pilar: "P2",
                  pilarColor: "violet",
                  useCase:
                    "Unificar en Data Cloud las fuentes: Sales Cloud, Argos ONE (feed diario), Brevo, Gluki (Argos Amigos), Tableau (RADAR) y SAP (batch). Identity resolution + calculated insights (frecuencia, recencia, tendencia, propensión de compra por producto).",
                  salesforceProducts: [
                    "Data Cloud (Enterprise) — expansión sobre foundation W1",
                    "Data Cloud Segments + Calculated Insights",
                    "Data Cloud Activation Targets",
                  ],
                  duration: "14 semanas",
                  prerequisites: [
                    "Feeds definidos por sistema (Argos ONE, Brevo, Gluki, Tableau).",
                    "Modelo de datos unificado aprobado (Cliente Masivo, Cliente Industrial).",
                    "Data governance: dueño de dato por dominio.",
                  ],
                  sizing: [
                    "Data Cloud: ~5-10 millones CIs.",
                    "~15-25 fuentes de datos.",
                    "~500K-1M unified profiles.",
                  ],
                  dependsOn: ["W1-02"],
                  outcome:
                    "Perfil unificado disponible para Marketing, Ventas y Servicio. Base para microsegmentación y para Wave 3.",
                },
                {
                  code: "W2-02",
                  name: "Marketing Cloud + Journey Builder por perfil",
                  pilar: "P2",
                  pilarColor: "violet",
                  useCase:
                    "Migrar Brevo a Marketing Cloud Engagement con Journey Builder por segmento y comportamiento. Reemplazo del email masivo por journeys personalizados (bienvenida, activación, reactivación, cross-sell, fidelización).",
                  salesforceProducts: [
                    "Marketing Cloud Engagement (Pro / Corporate)",
                    "Journey Builder + Content Builder + Audience Builder",
                    "Data Cloud → Marketing Cloud Activation",
                  ],
                  duration: "12 semanas",
                  prerequisites: [
                    "Playbook de comunicación por segmento aprobado.",
                    "Plantillas de email y SMS aprobadas por Marca.",
                    "Migración de contactos y suscripciones Brevo → MC (con opt-in validado).",
                  ],
                  sizing: [
                    "Marketing Cloud Corporate — ~500K-1M contactos activos.",
                    "~10-15 usuarios Marketing (analistas + admin).",
                    "3-5 SMS units / MMS units según necesidad.",
                  ],
                  dependsOn: ["W2-01"],
                  outcome:
                    "Journeys activos por segmento. Base para Machine Sellers automatizados.",
                },
                {
                  code: "W2-03",
                  name: "Agentforce Marketing — Machine Sellers automatizado",
                  pilar: "P2",
                  pilarColor: "violet",
                  useCase:
                    "Automatizar la creación de campañas de venta cruzada e incremental que hoy el Lab Digital corre manualmente. Agentforce Marketing detecta patrones (ej. ferreterías A que compran cemento → también compran mortero seco), genera contenido y dispara la campaña.",
                  salesforceProducts: [
                    "Agentforce for Marketing",
                    "Einstein Copy Insights + Einstein Content Generation",
                    "Marketing Cloud Personalization (opcional)",
                  ],
                  duration: "10 semanas",
                  prerequisites: [
                    "Modelos de propensión validados (Wave 2-01).",
                    "Playbook de aprobación de contenido generado por IA.",
                    "Guardrails de marca y tono aprobados.",
                  ],
                  sizing: [
                    "1 agente Agentforce Marketing productivo.",
                    "~50K-100K Einstein Requests/mes adicionales.",
                  ],
                  dependsOn: ["W2-02"],
                  outcome:
                    "6+ campañas Machine Sellers activas a 12 meses. ROI trazable por campaña.",
                },
                {
                  code: "W2-04",
                  name: "Trade Marketing + Argos Amigos digitalizado",
                  pilar: "P2",
                  pilarColor: "violet",
                  useCase:
                    "Digitalizar Argos Amigos (fidelización multicanal) y Trade Marketing (gestión de acciones + inversión + analítica) sobre Marketing Cloud + Data Cloud. Trazabilidad completa: inversión → activación → pedido → venta.",
                  salesforceProducts: [
                    "Marketing Cloud + Data Cloud (extensión)",
                    "Loyalty Management (opcional — evaluar vs. Gluki extendido)",
                    "CRM Analytics (para dashboards de ROI Trade)",
                  ],
                  duration: "12 semanas",
                  prerequisites: [
                    "Modelo actual Gluki documentado + decisión: extender o migrar a Loyalty Management.",
                    "Presupuestos Trade Marketing por acción disponibles en CRM o feed.",
                    "Definición de KPI de ROI Trade y fuente de la venta atribuida.",
                  ],
                  sizing: [
                    "~10-15 usuarios CRM Analytics.",
                    "Loyalty Management: ~100K-500K miembros (si se decide migrar).",
                  ],
                  dependsOn: ["W2-02"],
                  outcome:
                    "ROI de Trade Marketing visible por campaña. Argos Amigos con activaciones automatizadas.",
                },
              ],
              clientAsk: [
                "Data governance formal: dueño de dato por dominio.",
                "Contratos y opt-in de Brevo listos para migración legal.",
                "Decisión: extender Gluki o migrar a Loyalty Management (recomendación en Wave 0).",
                "Alineación con Marca: guardrails para contenido generado por IA.",
                "Analista de Data Cloud dedicado (interno o Quantics).",
              ],
            },
            {
              id: "wave-3",
              label: "Wave 3 · Pilar 3 — Integración y Visión 360 unificada",
              window: "Sep 2027 → Dic 2027 (4 meses de arranque, extensión 2028)",
              headline: "Los silos cuestan. Argos ONE + SAP dentro de Salesforce.",
              focus:
                "Cerrar la triada. MuleSoft conecta Argos ONE (40%+ ventas digitales) y SAP (inventario, crédito, capacidad) a Salesforce en tiempo real. Service Cloud omnicanal + WhatsApp Business API + Agentforce Service consolidan PQRs. App móvil offline. Contact Center integrado con Konecta.",
              color: "sky",
              goals: [
                "POC Argos ONE ↔ Salesforce activo en 90 días desde kickoff.",
                "Consulta SAP desde Slack/Sales Cloud en tiempo real (inventario + crédito).",
                "PQRs unificadas de todos los canales en Service Cloud.",
                "WhatsApp Business unificado con agente autónomo (>50% resolución).",
              ],
              opportunities: [
                {
                  code: "W3-01",
                  name: "MuleSoft — Argos ONE ↔ Salesforce en tiempo real",
                  pilar: "P3",
                  pilarColor: "sky",
                  useCase:
                    "Conectar el e-commerce Argos ONE con Salesforce vía MuleSoft en tiempo real: catálogo, cotizaciones sin cerrar, pedidos, actividad de navegación y estado de cuenta. Nutre Data Cloud y hace visible el 40%+ de ventas digitales en el CRM.",
                  salesforceProducts: [
                    "MuleSoft Anypoint Platform (Titan edition)",
                    "Anypoint Connectors (custom para Argos ONE)",
                    "Salesforce Data Cloud ingestion",
                  ],
                  duration: "14 semanas",
                  prerequisites: [
                    "API de Argos ONE documentada + ambiente sandbox.",
                    "Modelo de datos Argos ONE mapeado a Data Cloud.",
                    "Latencia SLA acordada con TI Argos.",
                  ],
                  sizing: [
                    "MuleSoft Titan: ~2-4 vCores producción + 1 vCore sandbox.",
                    "~5-8 APIs bidireccionales.",
                  ],
                  dependsOn: ["W2-01"],
                  outcome:
                    "Argos ONE 100% integrado. Cotización abandonada en digital → oportunidad en Sales Cloud + alerta en Slack del asesor.",
                },
                {
                  code: "W3-02",
                  name: "MuleSoft — SAP conector (inventario + crédito + capacidad)",
                  pilar: "P3",
                  pilarColor: "sky",
                  useCase:
                    "Consultar SAP desde Salesforce y desde Slack (Slackbot) en tiempo real: inventario de cemento/concreto/agregados por planta, cupo de crédito por cliente y capacidad productiva. Habilita el 'pedido que se hace solo' del storytelling.",
                  salesforceProducts: [
                    "MuleSoft Anypoint SAP Connector",
                    "Salesforce Flow Orchestration",
                    "Composable Storefront (opcional para Argos ONE)",
                  ],
                  duration: "16 semanas",
                  prerequisites: [
                    "Acceso SAP con permisos de lectura + módulos definidos (MM, FI, SD).",
                    "Integrator SAP interno de Argos disponible para pareo técnico.",
                    "Reglas de negocio de crédito y liberación de pedidos.",
                  ],
                  sizing: [
                    "MuleSoft vCores adicionales: ~2-4 sobre W3-01.",
                    "~3-5 servicios SAP consumidos (RFC/BAPI/OData).",
                  ],
                  dependsOn: ["W3-01"],
                  outcome:
                    "Asesor consulta stock y cupo en tiempo real desde Slack. Fin de la liberación manual con fotos de consignaciones por WhatsApp.",
                },
                {
                  code: "W3-03",
                  name: "Service Cloud Omni + WhatsApp Business API + Agentforce Service",
                  pilar: "P3",
                  pilarColor: "sky",
                  useCase:
                    "Consolidar Service Cloud como plataforma única de PQRs con Omni-Channel (WhatsApp, web, correo, RRSS). Línea única WhatsApp Business con Agentforce Service resolviendo pedidos, consultas de cartera y PQRs simples. Escalación con contexto completo al Contact Center (Konecta).",
                  salesforceProducts: [
                    "Service Cloud Enterprise/Unlimited (upgrade sobre base actual)",
                    "Digital Engagement (WhatsApp Business API oficial)",
                    "Agentforce Service Agent",
                    "Service Cloud Voice (evaluar integración Konecta)",
                    "Einstein Case Classification",
                  ],
                  duration: "16 semanas",
                  prerequisites: [
                    "Unificación de números WhatsApp existentes (proceso con Meta).",
                    "Base de conocimiento (KB Articles) construida — probablemente durante Wave 2/3.",
                    "SLAs y jerarquías de escalamiento definidos con Konecta.",
                    "Compliance Habeas Data para conversaciones WhatsApp.",
                  ],
                  sizing: [
                    "~40-80 licencias Service Cloud (agentes Konecta + supervisores).",
                    "1 agente Agentforce Service productivo.",
                    "Digital Engagement: ~500K-1M conversaciones/año iniciales.",
                    "~100K-200K Einstein Requests/mes.",
                  ],
                  dependsOn: ["W3-02"],
                  outcome:
                    "30%+ de PQRs resueltos por agente autónomo a 6 meses. WhatsApp unificado con >50% de resolución sin humano a 12 meses.",
                },
              ],
              clientAsk: [
                "Owner técnico de SAP con capacidad de pareo (mínimo 20h/semana durante W3-02).",
                "Estrategia de unificación WhatsApp: consolidación de números vs. migración progresiva.",
                "Contrato con Meta para WhatsApp Business API (o vía Salesforce Digital Engagement).",
                "Revisión de contrato con Konecta: modelo de operación con Agentforce en Tier-1.",
                "KB Articles base disponible (idealmente arrancada durante Wave 2).",
              ],
            },
          ],
          criticalPath: [
            {
              step: 1,
              gate: "Kickoff programa (Jul 2026)",
              detail:
                "W0 arranca. Discovery técnico + Value Engineering en paralelo. Sin resultado de W0-01 y W0-02, no se firma W0-03.",
            },
            {
              step: 2,
              gate: "Firma contrato marco (Ago 2026)",
              detail:
                "W0-03 cierra. Sin este gate no arranca Wave 1. Es el único punto donde el proyecto puede pausarse sin costo hundido de plataforma.",
            },
            {
              step: 3,
              gate: "Piloto Antioquia productivo (Nov 2026)",
              detail:
                "W1-01 y W1-02 en producción. Punto de decisión: adopción >60% en el piloto habilita rollout nacional en W1-03 y W1-04.",
            },
            {
              step: 4,
              gate: "Rollout nacional Wave 1 completo (Feb 2027)",
              detail:
                "Toda la fuerza de canal masivo operando en Slack. Fin de la dependencia Excel/WhatsApp para el ciclo de venta. Business Review de Wave 1.",
            },
            {
              step: 5,
              gate: "Data Cloud unificado productivo (Jun 2027)",
              detail:
                "W2-01 en producción. Prerequisito para Marketing Cloud, Machine Sellers y para toda la Wave 3. Cuello de botella crítico del programa.",
            },
            {
              step: 6,
              gate: "Machine Sellers en producción (Ago 2027)",
              detail:
                "W2-03 activo. Marketing pasa de operativo a estratégico. Business Review de Wave 2.",
            },
            {
              step: 7,
              gate: "Integración SAP + Argos ONE productiva (Dic 2027)",
              detail:
                "W3-01 y W3-02 productivos. Fin de los silos operativos. Cierre formal SPRINT 4.0. Business Review de programa completo.",
            },
          ],
          governance: {
            steerco:
              "Comité mensual con Sponsor Ejecutivo Argos, PMO Argos, Delivery Lead Quantics, Customer Success Salesforce y Business Architect. Business Review formal al cierre de cada wave con decisión Go/No-Go a la siguiente.",
            roles: [
              { role: "Sponsor Ejecutivo Argos", owner: "Por definir (VP Comercial o CTO)" },
              { role: "PMO Programa", owner: "Argos + apoyo Salesforce Signature Success" },
              { role: "Delivery Sales/Service Cloud", owner: "Quantics (partner integrador)" },
              { role: "Delivery Data Cloud + Agentforce + MuleSoft", owner: "Salesforce Professional Services" },
              { role: "Value Engineering + Business Case", owner: "Salesforce Value Engineer asignado" },
              { role: "Adoption + Change Management", owner: "Argos RH + Comunicaciones (con playbook Salesforce)" },
            ],
            risks: [
              {
                risk: "Capacidad de Quantics limitada — cuello de botella en delivery Wave 1.",
                mitigation:
                  "Firma anexo de capacidad garantizada en Wave 0. Salesforce PS cubre picos con equipo dedicado a Data Cloud/Agentforce/MuleSoft para no competir por Quantics.",
              },
              {
                risk: "Adopción del asesor (WhatsApp → Slack): resistencia cultural.",
                mitigation:
                  "Change management activo desde Wave 0. Piloto Antioquia con champions internos. Incentivos comerciales atados a adopción durante primer trimestre.",
              },
              {
                risk: "Calidad de datos SAP y de Argos ONE por debajo de lo asumido.",
                mitigation:
                  "Discovery técnico W0-01 incluye data quality assessment. Si el índice es <70%, se agrega Wave 2.5 de saneamiento antes de Data Cloud unificado.",
              },
              {
                risk: "SPRINT 4.0 sufre reprioorización — el programa pierde tracción.",
                mitigation:
                  "Business case atado a KPIs SPRINT 4.0 desde W0-02. Value Engineer sigue KPIs mensualmente. Wave 1 diseñada para dar resultado visible en 6 meses (antes del segundo semestre 2027).",
              },
              {
                risk: "Compliance / Habeas Data Colombia para IA generativa y WhatsApp.",
                mitigation:
                  "Einstein Trust Layer + revisión legal Argos + Salesforce Legal en cada wave que consuma datos de cliente.",
              },
            ],
          },
          nextGate: {
            title: "Próximo paso para arrancar el programa",
            body: "Wave 0 puede arrancar en 2 semanas desde la firma del acuerdo de discovery. No requiere contrato marco todavía — es la fase que dimensiona ese contrato. Recomendamos cerrar comercial de W0 en las próximas 4 semanas para preservar la ventana de 18 meses y aterrizar el programa dentro de SPRINT 4.0.",
            asks: [
              "Confirmación de Sponsor Ejecutivo (nivel VP) por parte de Argos.",
              "Acuerdo de discovery firmado (SoW de 8 semanas para Wave 0).",
              "Agenda del Comité SPRINT 4.0 para presentar business case consolidado al final de Wave 0.",
              "Definición del rol de Quantics en el programa: co-delivery vs. líder Wave 1.",
            ],
          },
        },
      },
      {
        id: "assets",
        label: "Assets",
        title: "Assets de la solución",
        content: "Materiales disponibles y por desarrollar para soportar la conversación con Cementos Argos.",
        assetsData: {
          items: [
            {
              name: "Plan de Cuenta Estratégico v2.0",
              description: "Documento completo de 16 páginas con 20 iniciativas priorizadas mapeadas a 3 pilares (Market Share, Segmentación, Integración Tecnológica). Versión Mayo 2026.",
              available: true,
              type: "doc",
              url: "https://drive.google.com/file/d/10LPr8Ep1bcilMDmPGL2B4ArTJkowmNHo/view?usp=sharing",
            },
            {
              name: "Deck Ejecutivo",
              description: "Presentación para sesión de Executive Briefing con Dirección Comercial y Tecnología de Argos.",
              available: true,
              type: "deck",
              url: "/customer-demos/grupo-argos/deck/executive",
            },
            {
              name: "Historia de Cliente — Modo Inmersivo",
              description: "La ferretería de Don Hernán: recorrido cinematográfico por las 7 escenas de la historia, con vista pantalla completa, navegación por teclado y ambientación por pilar estratégico.",
              available: true,
              type: "story",
              url: "/customer-demos/grupo-argos#historia",
            },
            {
              name: "Mockup Vista 360",
              description: "Vista del cliente en Sales Cloud con pedido sugerido, radar de fuga y estado de cartera.",
              available: false,
              type: "mockup",
            },
            {
              name: "Arquitectura Agentforce",
              description: "Diagrama conceptual de agentes para manufacturing: ingesta de oportunidades, creación de clientes y cotización.",
              available: false,
              type: "arch",
            },
            {
              name: "Flujo de Cotización Inteligente",
              description: "Demostración del flujo multiproducto (cemento, concreto, agregados) con filtros inteligentes.",
              available: false,
              type: "mockup",
            },
            {
              name: "Video Demo",
              description: "Recorrido grabado de las iniciativas prioritarias con datos reales del cliente.",
              available: false,
              type: "video",
            },
          ],
        },
      },
    ],
    translations: {
      en: {
        title: "Cementos Argos — Commercial Intelligence Platform with Agentforce",
        description: "Strategic account plan articulated in three pillars: Market Share (+15%), High-resolution Segmentation, and Technology Integration. Argos already operates Salesforce — the conversation is about evolution and deepening toward an agentic platform with Agentforce.",
        industry: "Construction Materials",
        tabs: [
          { id: "overview", label: "Overview", title: "Executive summary", content: "Cementos Argos already operates Salesforce — the conversation is about evolution and deepening. This plan articulates 20 initiatives across three strategic pillars: Market Share (+15%), High-resolution Segmentation, and Technology Integration to eliminate silos." },
          { id: "customer", label: "Client / industry", title: "Client and industry", content: "Production and commercialization of cement, concrete, and aggregates. Headquartered in Medellín, Colombia. SPRINT 4.0 active: EBITDA margins 24-26%, growth and digitalization for 2026-2027." },
          { id: "context", label: "Context", title: "Challenge context", content: "Discovery sessions revealed an active CRM ecosystem but with critical gaps in three dimensions. Each gap is mapped to one of the three strategic pillars of Cementos Argos." },
          { id: "objective", label: "Objective", title: "Position Salesforce as the platform that enables Argos's three pillars.", content: "20 initiatives. 3 strategic pillars. One platform that connects technology with business results." },
          { id: "storytelling", label: "Narrative", title: "Value narrative", content: "The three pillars are not an invented framework: they are the honest diagnosis of the three gaps separating Argos from its next level of performance." },
          { id: "solution", label: "Solution", title: "Proposed solution", content: "The proposed architecture is a direct response to Argos's three strategic pillars. Each layer of the platform is aligned with at least one pillar, and the integration between layers closes the gaps identified during discovery." },
          { id: "arquitectura", label: "Architecture", title: "Technical Architecture — Cementos Argos", content: "Full view of the 4-layer solution: contact channels, Salesforce platform (9 products + transversal Agentforce), MuleSoft integration layer (5 bidirectional real-time connectors), and Argos ecosystem external systems. Critical integration gaps are marked with their status and proposed solution." },
          { id: "outcomes", label: "Results", title: "Expected outcomes", content: "Success KPIs are organized by strategic pillar. Each metric has a documented baseline from discovery sessions, a 6-month target, and a 12-month target." },
          { id: "historia", label: "Story", title: "Don Hernán's Hardware Store and the Team That Never Sleeps", content: "Hernán Ríos has been running Ferretería El Paisa in Itagüí, Antioquia for years. A class B bulk customer who used to buy 12 to 15 tons of cement per month — until he stopped. This is the story of how Salesforce turned an at-risk customer into the most active distributor of the quarter." },
          { id: "plan-de-trabajo", label: "Work plan", title: "Work plan — Executable opportunity roadmap", content: "From diagnosis to execution. This plan translates the 3 pillars and 20 initiatives into an 18-month commercial roadmap articulated in 4 waves and 12 sales opportunities. Each opportunity specifies the use case it solves, the Salesforce solutions involved, the estimated implementation time, the prerequisites we need from the client, and orientative sizing to shape the commercial proposal." },
          { id: "assets", label: "Assets", title: "Solution assets", content: "Available and to-be-developed materials to support the conversation with Cementos Argos." },
        ],
      },
      pt: {
        title: "Cementos Argos — Plataforma de Inteligência Comercial com Agentforce",
        description: "Plano de conta estratégico articulado em três pilares: Market Share (+15%), Segmentação de alta resolução e Integração Tecnológica. A Argos já opera o Salesforce — a conversa é de evolução e aprofundamento em direção a uma plataforma agêntica com Agentforce.",
        industry: "Materiais de Construção",
        tabs: [
          { id: "overview", label: "Overview", title: "Resumo executivo", content: "A Cementos Argos já opera o Salesforce — a conversa é de evolução e aprofundamento. Este plano articula 20 iniciativas em três pilares estratégicos: Market Share (+15%), Segmentação de alta resolução e Integração Tecnológica para eliminar silos." },
          { id: "customer", label: "Cliente / indústria", title: "Cliente e indústria", content: "Produção e comercialização de cimento, concreto e agregados. Sede em Medellín, Colômbia. SPRINT 4.0 ativo: margens EBITDA 24-26%, crescimento e digitalização para 2026-2027." },
          { id: "context", label: "Contexto", title: "Contexto do desafio", content: "As sessões de discovery revelaram um ecossistema CRM ativo, mas com lacunas críticas em três dimensões. Cada lacuna está mapeada a um dos três pilares estratégicos da Cementos Argos." },
          { id: "objective", label: "Objetivo", title: "Posicionar o Salesforce como a plataforma que habilita os três pilares da Argos.", content: "20 iniciativas. 3 pilares estratégicos. Uma plataforma que conecta tecnologia com os resultados do negócio." },
          { id: "storytelling", label: "Narrativa", title: "Narrativa de valor", content: "Os três pilares não são um framework inventado: são o diagnóstico honesto das três lacunas que separam a Argos do seu próximo nível de desempenho." },
          { id: "solution", label: "Solução", title: "Solução proposta", content: "A arquitetura proposta é uma resposta direta aos três pilares estratégicos da Argos. Cada camada da plataforma está alinhada com pelo menos um pilar, e a integração entre camadas fecha as lacunas identificadas no processo de discovery." },
          { id: "arquitectura", label: "Arquitetura", title: "Arquitetura Técnica — Cementos Argos", content: "Visão completa das 4 camadas da solução: canais de contato, plataforma Salesforce (9 produtos + Agentforce transversal), camada de integração MuleSoft (5 conectores bidirecionais em tempo real) e sistemas externos do ecossistema Argos. As lacunas críticas de integração estão marcadas com seu status e solução proposta." },
          { id: "outcomes", label: "Resultados", title: "Resultados esperados", content: "Os KPIs de sucesso estão organizados por pilar estratégico. Cada métrica tem uma linha de base documentada nas sessões de discovery, uma meta de 6 meses e uma meta de 12 meses." },
          { id: "historia", label: "História", title: "A Ferreteria do Don Hernán e a Equipe que Nunca Para", content: "Hernán Ríos está à frente da Ferreteria El Paisa em Itagüí, Antioquia há anos. Um cliente classe B que comprava entre 12 e 15 toneladas de cimento por mês — até que parou. Esta é a história de como o Salesforce transformou um cliente em risco de fuga no distribuidor mais ativo do trimestre." },
          { id: "plan-de-trabajo", label: "Plano de trabalho", title: "Plano de trabalho — Roadmap executável de oportunidades", content: "Do diagnóstico à execução. Este plano traduz os 3 pilares e as 20 iniciativas em um roadmap comercial de 18 meses articulado em 4 waves e 12 oportunidades de venda. Cada oportunidade especifica o caso de uso que resolve, as soluções Salesforce envolvidas, o tempo estimado de implementação, os prerequisitos do cliente e um dimensionamento orientativo para a proposta comercial." },
          { id: "assets", label: "Ativos", title: "Ativos da solução", content: "Materiais disponíveis e a serem desenvolvidos para apoiar a conversa com a Cementos Argos." },
        ],
      },
    },
  },
  {
    slug: "betterware",
    title: "Aliada Digital — Resolver, acompañar y hacer crecer a cada Distribuidora",
    customerName: "Betterware de México (BeFra)",
    industry: "Retail / Consumer Goods — Venta Directa",
    description:
      "Programa Aliada Digital — un ecosistema agéntico que conoce, guía y hace crecer a las 1.24M de Distribuidoras Independientes. La hoja de ruta para pasar de un soporte reactivo y fragmentado a un acompañamiento inteligente, proactivo y personalizado con Agentforce, Service Cloud, Data Cloud y Marketing Cloud.",
    logo: "/Customers/Betterware/images/Logo-betterware.png",
    passcode: "better26",
    tags: [
      "Agentforce",
      "Service Cloud",
      "Data Cloud",
      "Marketing Cloud",
      "Venta Directa LATAM",
      "Aliada Digital",
    ],
    tabs: [
      // ── 1. Overview ───────────────────────────────────────────────────
      {
        id: "overview",
        label: "Overview",
        title: "Resumen ejecutivo",
        banner: "/Customers/Betterware/images/better.gif",
        content:
          "Betterware (NASDAQ: BWMX, hoy BeFra) opera el ecosistema de venta directa más grande de México: 1.24M de Asociadas y Distribuidoras que llegan a 8M de hogares. El Antiexperience Workshop reveló que la peor experiencia para una DS no es solo tener un problema operativo: es no saber a quién acudir, recibir información confusa y depender de terceros para resolver. Aliada Digital propone un ecosistema con cuatro componentes — Agente DS 360, Copiloto Staff 360, Capa de datos DS 360 y Orquestación proactiva — que evolucionan a Betterware de un modelo de soporte reactivo a un acompañamiento proactivo, personalizado y medible.",
        overviewData: {
          stats: [
            { value: "$14.1B", label: "MXN ingresos consolidados FY 2024" },
            { value: "1.24M", label: "Asociadas + Distribuidoras (BW + JAFRA)" },
            { value: "8M", label: "Hogares mexicanos alcanzados" },
            { value: "40–48%", label: "DS que no realizan su primer pedido (JTBD)" },
            { value: "6 meses", label: "Journey crítico de la DS" },
            { value: "4", label: "Componentes del programa Aliada Digital" },
          ],
        },
      },

      // ── 2. Cliente / Industria ────────────────────────────────────────
      {
        id: "customer",
        label: "Cliente / industria",
        title: "Cliente e industria",
        content:
          "Betterware de México es la primera empresa mexicana con listado directo en NASDAQ (2020). Bajo la matriz BeFra opera dos marcas: Betterware (organización del hogar, cocina, baño, jardín) y JAFRA Cosmetics (fragancias, color, skincare), adquirida en 2022 a Vorwerk por US$255M. Su modelo de venta directa de dos niveles — Distribuidora líder + Asociada vendedora — es el motor del negocio: ciclos quincenales con ticket promedio de $2,158 MXN (BW) y $2,439 MXN (JAFRA) por Asociada.",
        customerProfile: {
          stats: [
            { label: "Razón social", value: "Betterware de México, S.A.P.I. de C.V. (BeFra)" },
            { label: "Ticker", value: "NASDAQ: BWMX (cotización directa desde 2020)" },
            { label: "Sede", value: "Guadalajara, Jalisco — México" },
            { label: "Fundación", value: "1995 — 30 años en venta directa" },
            { label: "Ingresos FY 2024", value: "Ps. 14,100.8 M (~USD $700M) · +8.4% YoY" },
            { label: "Adj. EBITDA 2024", value: "Ps. 2,774.7 M · margen 19.7%" },
            { label: "Hogares alcanzados", value: "~8M en México · ~4% market share household" },
            { label: "Sales force EOP 2024", value: "1,180,458 Asociadas + 63,339 Distribuidoras" },
            { label: "Mercados", value: "México (core), USA (JAFRA), Guatemala, Ecuador (May 2025)" },
            { label: "Ticket promedio Asociada", value: "BW MX $2,158 · JAFRA MX $2,439 (Q4 2024)" },
            { label: "Stack actual", value: "Shopify+, B+/J+ Apps, LMS Cenapia, contact center tradicional" },
          ],
          segments: [
            {
              name: "Betterware México — Hogar",
              description:
                "Catálogo de organización, cocina, baño, jardín y limpieza. 674K Asociadas y 42K Distribuidoras al cierre de 2024. Margen EBITDA 21.6% — el negocio más rentable del grupo. Crecimiento +4.6% YoY 2024 con foco en producto innovador y experiencia de la DS.",
            },
            {
              name: "JAFRA México — Belleza",
              description:
                "Fragancias, color, skincare y toiletries. 480K Asociadas y 19K Distribuidoras. Crecimiento +13.0% YoY 2024 — la marca pasó de 0% durante 15 años a doblar utilidades en 3 años. Margen EBITDA 13.0% (2021) → 20.7% (2024).",
            },
            {
              name: "Distribuidora Independiente — Persona del Blueprint",
              description:
                "Emprendedora comercial que vende, distribuye y promueve productos en su comunidad. Niveles variables de madurez digital. Vive una etapa crítica de activación, aprendizaje y consolidación durante sus primeros 6 meses. Necesita autonomía operativa sin perder cercanía humana.",
            },
          ],
          techStack: [
            { category: "E-commerce DS", tool: "Shopify+ (B+/J+ Apps · catálogo digital · live shopping piloto)" },
            { category: "ERP / Pedidos", tool: "Sistemas legacy de pedidos, saldos y liberación" },
            { category: "Capacitación", tool: "LMS interno · Cenapia (capacitación nacional)" },
            { category: "Contact Center", tool: "Operación tradicional · saturación en horas pico, sin IA" },
            { category: "Mensajería", tool: "WhatsApp / SMS / Email — múltiples líneas, sin agente unificado" },
            { category: "Pagos", tool: "Kitspay (canal de pago — fricción reportada en taller)" },
            { category: "BI", tool: "Reportes operativos dispersos · sin visión 360 de la DS" },
          ],
        },
      },

      // ── 3. Contexto ───────────────────────────────────────────────────
      {
        id: "context",
        label: "Contexto",
        title: "5 problemas críticos identificados",
        content:
          "El Blueprint identifica cinco problemas estructurales que explican por qué la experiencia de la DS se rompe hoy. Cada uno tiene dolores asociados y todos confluyen en la misma conclusión: la DS termina dependiendo de personas, esperando respuestas y sintiendo que la empresa no entiende su rol.",
        contextData: {
          groups: [
            {
              name: "1 · Resolución operativa deficiente",
              findings: [
                "La DS depende de personas, directorios o canales indirectos para resolver",
                "Pedido incompleto / recibo incompleto sin gestión clara",
                "Saldos pendientes sin resolución · promesas de respuesta que no se cumplen",
                "Escalaciones innecesarias y falta de visibilidad del estado real de una incidencia",
              ],
            },
            {
              name: "2 · Información confusa o no disponible",
              findings: [
                "Información dispersa, desactualizada y escrita en lenguaje complejo",
                "Respuestas tardadas · información contradictoria · saturación en horas pico",
                "Reglas comerciales difíciles de entender · comunicación no segmentada",
              ],
            },
            {
              name: "3 · Experiencia emocional débil",
              findings: [
                "Atención sin empatía · lenguaje poco cercano · experiencia impersonal",
                "Falta de reconocimiento del esfuerzo de la DS",
                "Sensación de desconexión con Betterware",
              ],
            },
            {
              name: "4 · Procesos complejos y sistemas desconectados",
              findings: [
                "Acceso complicado a información · datos desactualizados · falta de trazabilidad",
                "Procesos repetitivos · comunicación desconectada entre áreas",
                "Fricción explícita con canales actuales de pago o gestión (ej. Kitspay)",
              ],
            },
            {
              name: "5 · Onboarding insuficiente",
              findings: [
                "Onboarding no adaptado al rol · baja adopción digital",
                "Falta de capacitación continua · dificultad para entender cómo crecer paso a paso",
                "Falta de acompañamiento proactivo en los 6 primeros meses críticos",
              ],
            },
          ],
        },
      },

      // ── 4. Objetivo ───────────────────────────────────────────────────
      {
        id: "objective",
        label: "Objetivo",
        title: "Transformar la experiencia de la Distribuidora en autonomía, crecimiento y resolución en primer contacto.",
        content:
          "Pasar de un modelo reactivo, fragmentado y dependiente del soporte humano a un modelo inteligente, proactivo, personalizado y de autoservicio.",
        objective: {
          headline:
            "Construir un sistema inteligente de acompañamiento, resolución y crecimiento — donde cada Distribuidora pueda decir: «Betterware me entiende, me guía, me resuelve y me ayuda a crecer sin tener que perseguir respuestas».",
          okrs: [
            {
              label: "Resolver",
              description:
                "Resolución en primer contacto como obsesión. La DS no debería tener que saber a quién escribirle ni cómo formular técnicamente su problema — debe poder expresar su necesidad en lenguaje natural y recibir una respuesta clara, confiable y accionable.",
              enabler: "Agente DS 360 + Service Cloud + Knowledge",
              color: "indigo",
            },
            {
              label: "Acompañar",
              description:
                "Anticipar necesidades, comunicar antes de que aparezcan los problemas y hacer sentir a la DS reconocida durante todo su journey — especialmente los primeros 6 meses críticos donde se define si crece o desiste.",
              enabler: "Marketing Cloud + Data Cloud + Journeys orquestados",
              color: "violet",
            },
            {
              label: "Hacer crecer",
              description:
                "Habilitar al staff con visión 360 real de cada DS y, en el siguiente paso, anticipar churn y recomendar acciones comerciales — pasar de resolver problemas a impulsar el crecimiento de cada Distribuidora.",
              enabler: "Copiloto Staff 360 + Tableau Next + Einstein Predictions",
              color: "sky",
            },
          ],
        },
      },

      // ── 5. Workshop ───────────────────────────────────────────────────
      {
        id: "workshop",
        label: "Workshop",
        title: "Resultado del Antiexperience Workshop",
        content:
          "El 29 de mayo de 2026, cinco equipos de Betterware trabajaron sobre dos tableros paralelos: el primero para definir la peor experiencia posible para una DS, el segundo para diseñar agentes que la inviertan. El resultado a continuación es el insumo de descubrimiento sobre el cuál se construyó el Blueprint propuesto en la siguiente sección.",
        workshopData: {
          date: "29 de mayo de 2026",
          intro:
            "El equipo de Betterware llevó a cabo el Antiexperience Workshop con la Distribuidora Independiente (DS) como persona central. Cinco equipos trabajaron en paralelo definiendo la peor experiencia posible y diseñando agentes que la inviertan. La conclusión transversal: la DS necesita ser menos dependiente del soporte humano, más productiva y sentirse acompañada en su journey de crecimiento desde el primer día — con resolución en primer contacto como prioridad máxima.",
          persona: {
            name: "Distribuidora Independiente Betterware",
            role: "Emprendedora comercial · vende, distribuye y promueve Betterware en su comunidad",
            context:
              "Persona con distintos niveles de madurez digital. Durante sus primeros 6 meses vive una etapa crítica de activación, aprendizaje y consolidación. Tiene poco tiempo, busca respuestas rápidas y autonomía para operar y crecer su negocio.",
            characteristics: [
              "Tiene poco tiempo disponible",
              "Necesita respuestas rápidas, simples y confiables",
              "No siempre sabe cómo explicar técnicamente su problema",
              "Puede sentirse saturada por procesos, reglas y comunicación dispersa",
              "Necesita entender cómo cumplir objetivos, mejorar ventas y crecer su cartera",
              "Quiere sentirse acompañada, no evaluada ni abandonada",
              "Necesita autonomía operativa sin perder cercanía humana",
            ],
            needs: [
              "Resolver dudas e incidencias en primer contacto",
              "Consultar pedidos, entregas, devoluciones, saldos, transacciones y objetivos",
              "Recibir información clara, vigente y contextualizada",
              "Entender reglas comerciales sin lenguaje complejo",
              "Recibir acompañamiento durante sus primeros meses",
              "Tener capacitación integrada a su flujo normal de trabajo",
              "Recibir comunicación proactiva antes de que los problemas aparezcan",
              "Ser atendida con empatía y con lenguaje cercano a su realidad",
            ],
          },
          areas: [
            {
              number: 1,
              title: "Atención y resolución de problemas",
              summary:
                "La DS depende de personas o directorios para resolver, lo que genera fricción, espera y reprocesos.",
              redDots: 3,
              pains: [
                "Recurrir a alguien directo o un directorio para resolver",
                "Pedido / recibo incompleto",
                "No darle respuesta",
                "Saldos pendientes sin resolución",
              ],
            },
            {
              number: 2,
              title: "Información y comunicación",
              summary:
                "La información existe pero está dispersa, desactualizada o escrita en lenguaje complejo.",
              pains: [
                "Respuestas tardadas",
                "No tener información disponible",
                "Saturación en horas pico",
                "Información confusa",
                "Atención sin empatía",
              ],
            },
            {
              number: 3,
              title: "Experiencia emocional",
              summary:
                "El problema no es solo resolver: es cómo se resuelve. La DS siente desconexión.",
              pains: [
                "DS no conectada emocionalmente con la empresa",
                "Empresa no entiende mi rol",
              ],
            },
            {
              number: 4,
              title: "Acceso a sistemas e información",
              summary:
                "Múltiples sistemas, fuentes y reportes dispersos. La DS termina haciendo cosas que no son su responsabilidad.",
              pains: [
                "Acceso complicado · errores · información descontinuada",
                "Hacer cosas que no son responsabilidad primaria de la DS",
                "No le llega su objetivo",
              ],
            },
            {
              number: 5,
              title: "Comunicación empresa-DS",
              summary:
                "Onboarding insuficiente, fricción con canales de pago y procesos repetitivos.",
              redDots: 2,
              pains: [
                "El onboarding no fue adecuado al rol",
                "Las DS no quieren salir a Kitspay",
                "Comunicación desconectada SIA · empresa · Cenapia",
                "Procesos complejos o repetitivos",
                "Falta de datos, especialidades y comunicación centrada",
              ],
            },
          ],
          topPriority: {
            title: "Resolver en Primer Contacto",
            reason:
              "Con 3 puntos rojos acumulados entre tableros, esta es la prioridad máxima del taller. La razón es estratégica: ataca dolor emocional (Área 3) y operativo (Áreas 1, 2 y 4) al mismo tiempo, reduce fricción visible para la DS y libera al staff para casos que sí requieren empatía humana. Por eso debe ser el eje del MVP de Agentforce para Betterware.",
          },
          aspirational:
            "Con Agentforce, Service Cloud y Data Cloud, Betterware puede transformar la experiencia de sus Distribuidoras en un acompañamiento 24/7 verdaderamente personalizado: un agente que conoce el perfil, el historial y los objetivos de cada DS, que habla su lenguaje, resuelve sus dudas en tiempo real con resolución en primer contacto y la guía proactivamente hacia el éxito de su negocio.",
        },
      },

      // ── 6. Jobs To Be Done ────────────────────────────────────────────
      {
        id: "jtbd",
        label: "Jobs To Be Done",
        title: "Jobs To Be Done — Insights, Journey & Roadmap",
        content:
          "Segundo ejercicio de descubrimiento, complementario al Antiexperience Workshop. Combina la sesión JTBD del 14-may-2026 con visita en calle a Distribuidoras reales y el mapeo AS-IS / TO-BE del equipo Betterware. Su valor diferenciador: pone el foco en la Distribuidora Nueva — sus jobs, sus emociones, sus canales reales — y traduce los hallazgos a un funnel de 6 etapas, 10 jobs priorizados y 10 iniciativas con roadmap por sprints.",
        jtbdData: {
          intro:
            "Construido a partir del workshop JTBD (14-may-2026), notas de campo de visita en calle y el mapeo AS-IS / TO-BE del equipo Betterware. EA Lead: Rina Margarita Suarez.",
          authoredBy: "EA Lead · Rina Margarita Suarez",
          workshopDate: "Junio 2026 · Post-Workshop JTBD + Visita en Calle",
          funnelStats: [
            { value: "40–48%", label: "DS no realizan su primer pedido" },
            { value: "25%", label: "Altas con problemas de documentación" },
            { value: "30%", label: "Asociadas que arman pedido en la app" },
          ],
          insightGroups: [
            {
              name: "Insights del Workshop",
              eyebrow: "Equipo Betterware · Cuantitativo",
              tone: "indigo",
              insights: [
                {
                  title: "El mayor riesgo no es el alta, es la activación",
                  body: "Entre 40–48% de las distribuidoras no realizan su primer pedido. El sistema no detecta ni interviene en señales de deserción temprana.",
                },
                {
                  title: "La motivación es 80% emocional e incentivos, 20% económica",
                  body: "Las distribuidoras responden más a premios, puntos y reconocimiento que al ingreso directo. Los programas de puntos son complejos y pocas los entienden completamente.",
                },
                {
                  title: "El proceso de alta es manual y lento",
                  body: "10 personas en 3 turnos validan solicitudes. El 25% de las altas tienen problemas de documentación; solo el 10% de esos casos se recupera.",
                },
                {
                  title: "El staff opera sin trazabilidad",
                  body: "No hay validación real de si las visitas ocurrieron. El 90% del trabajo de promotores es en campo pero sin registro ni seguimiento sistemático.",
                },
                {
                  title: "La capacitación tiene consumo muy bajo",
                  body: "Existe plataforma, contenido y reuniones, pero no hay un journey de onboarding estandarizado ni automatizado.",
                },
              ],
            },
            {
              name: "Insights de Visita en Calle",
              eyebrow: "Cualitativos · No visibles en datos",
              tone: "violet",
              insights: [
                {
                  title: "La mamá de linaje es el sistema nervioso de la red",
                  body: "Es la fuente primaria de información, confianza y acompañamiento para la distribuidora nueva. Es la pieza más importante de retención y crecimiento — más que cualquier campaña de marketing. Hoy opera completamente fuera del sistema de Betterware.",
                },
                {
                  title: "WhatsApp es el canal real, la app es solo para pedidos",
                  body: "La distribuidora no percibe la app como fuente de conocimiento ni de valor agregado. WhatsApp es donde vive la relación con su mamá, con sus clientas y con Better.",
                },
                {
                  title: "La logística de entrega es una barrera real",
                  body: "Para distribuidoras con asociadas lejos de casa, entregar el pedido requiere transporte. Esto no está resuelto ni contemplado en el journey actual.",
                },
                {
                  title: "Reclutar es doloroso",
                  body: "A muchas les da pena abordar a prospectos. No saben el pitch. No tienen experiencia. El principal bloqueo es la desconfianza del prospecto hacia el modelo de negocio.",
                },
                {
                  title: "Los tips de venta son el contenido más valioso",
                  body: "Un consejo práctico y específico (como pedir el número del prospecto con el pretexto de \"enviarte promociones solo digitales\") tiene más impacto que un módulo de capacitación completo.",
                },
                {
                  title: "El control de clientes es papel y lápiz",
                  body: "Las distribuidoras llevan en libretas quién les compra, cuánto, con qué frecuencia, quién es su mejor clienta. No consultan la app para esto.",
                },
                {
                  title: "No saben que Better las acompaña institucionalmente",
                  body: "Desconocen que hay asesores, promotores y visitas disponibles. Tampoco saben que pueden visitar las instalaciones de Better.",
                },
                {
                  title: "Los planes comerciales se hacen en Excel",
                  body: "Las asesoras construyen planes de crecimiento con las distribuidoras fuera de cualquier sistema.",
                },
                {
                  title: "Las distribuidoras usan sus puntos para premiar a su red",
                  body: "Compran regalos para sus asociadas y distribuidoras que están debajo de ellas con sus puntos acumulados.",
                },
                {
                  title: "Hay distribuidoras influencers",
                  body: "Crean su propio contenido para atraer personas y clientes. Este activo no está habilitado ni potenciado por Better.",
                },
              ],
            },
          ],
          persona: {
            headline:
              "Mujer (90%), mamá o ama de casa, sin experiencia formal en ventas. Su red social primaria es familia, vecinas y amigas. WhatsApp es su canal natural. Su motivación es 80% emocional + reconocimiento.",
            columns: [
              {
                heading: "Quién es",
                tone: "indigo",
                items: [
                  "Mujer (90% del total)",
                  "Principalmente mamás y amas de casa",
                  "Sin experiencia formal en ventas",
                  "Red social primaria: familia, vecinas, amigas",
                  "Canal preferido: WhatsApp",
                  "Motivación: ingresos complementarios + premios + reconocimiento social",
                ],
              },
              {
                heading: "Qué siente al inicio",
                tone: "violet",
                items: [
                  "Entusiasmo mezclado con miedo e incertidumbre",
                  "Confusión frente a la cantidad de información inicial",
                  "Ansiedad por el pedido mínimo ($2,500 MXN)",
                  "Pena y falta de confianza para prospectar",
                  "Dependencia emocional y práctica de su mamá de linaje",
                ],
              },
              {
                heading: "Su relación con la tecnología",
                tone: "sky",
                items: [
                  "Adopta lo digital cuando es simple, conversacional y resuelve un dolor inmediato",
                  "Rechaza herramientas que la obligan a cambiar su rutina (papel, WhatsApp, voz)",
                ],
              },
            ],
          },
          funnel: [
            {
              number: 1,
              name: "Descubrimiento & Captación",
              color: "indigo",
              jobToBeDone:
                "Escucha la propuesta de su mamá de linaje o ve contenido en redes · Evalúa si el negocio es real y confiable · Decide inscribirse",
              kpi: "Conversión prospecto → inicio de formulario · Hoy: 36–37%",
              channel: "WhatsApp (boca a boca) · Redes sociales (influencers DS)",
            },
            {
              number: 2,
              name: "Inscripción & Alta",
              color: "indigo",
              jobToBeDone:
                "Llena formulario · Entrega documentos · Espera validación crediticia y domiciliaria · Recibe activación en la app",
              kpi: "Completitud del formulario · Hoy: 42% → Meta: >65%",
              channel: "App · WhatsApp (notificaciones de estado)",
            },
            {
              number: 3,
              name: "Onboarding (2 semanas)",
              color: "violet",
              jobToBeDone:
                "Aprende cómo funciona la app y el catálogo · Entiende cuánto debe pedir para activarse · Construye su primer pedido · Recibe acompañamiento de su mamá",
              kpi: "Primer pedido en las primeras 2 semanas · Hoy: 52–60% NO lo logra",
              channel: "WhatsApp (primario) · App (pedido)",
            },
            {
              number: 4,
              name: "Primera Venta & Primer Ingreso",
              color: "violet",
              jobToBeDone:
                "Vende a sus clientas · Entrega pedidos · Cobra · Recibe su primer ingreso o incentivo",
              kpi: "% DS que completan venta y cobran en primeras 4 semanas",
              channel: "WhatsApp · App (pedido y seguimiento)",
            },
            {
              number: 5,
              name: "Consolidación",
              color: "sky",
              jobToBeDone:
                "Construye su cartera de clientas · Hace pedidos recurrentes · Recluta asociadas · Gestiona entregas · Sigue metas de incentivos",
              kpi: "Recurrencia semanal de pedidos · Retención a 90 días",
              channel: "WhatsApp (relacional) · App (operativo)",
            },
            {
              number: 6,
              name: "Ascenso & Mamá de Linaje",
              color: "emerald",
              jobToBeDone:
                "Recluta nuevas distribuidoras · Las acompaña · Gestiona su red de linaje · Crece en categoría",
              kpi: "Crecimiento de red de 2° nivel · % retención de su linaje",
              channel: "WhatsApp (primario para la mamá) · App/consola (Salesforce)",
            },
          ],
          channelDecision:
            "Decisión estratégica clave — WhatsApp debe ser el canal primario de relación. La app debe ser el canal de transacción. No son competidores: son complementarios con roles distintos y claros.",
          channels: [
            {
              name: "WhatsApp (Agentforce)",
              role: "Canal de relación, acompañamiento e intervención inteligente",
              tone: "emerald",
              livesHere: [
                "Bienvenida y onboarding",
                "Tips de venta",
                "Alertas de carrito",
                "Resúmenes semanales",
                "Consultas en lenguaje natural",
                "Alertas a mamá de linaje",
                "Comunicación de Better al staff",
              ],
              notHere: [
                "Pedidos complejos",
                "Catálogo completo",
                "Gestión de crédito",
              ],
            },
            {
              name: "App Betterware",
              role: "Canal de transacción y consulta de catálogo",
              tone: "indigo",
              livesHere: [
                "Pedidos",
                "Catálogo",
                "Estado de entrega",
                "Puntos e incentivos (simplificados)",
              ],
              notHere: [
                "Capacitación larga",
                "Comunicación relacional",
                "Gestión de red de linaje",
              ],
            },
            {
              name: "Asesora / Promotora",
              role: "Canal humano de alta intensidad en momentos críticos",
              tone: "amber",
              livesHere: [
                "Primera visita",
                "Activación de DS que no han pedido",
                "Plan comercial",
              ],
              notHere: [
                "Soporte operativo rutinario (lo cubre Agentforce)",
              ],
            },
            {
              name: "Mamá de Linaje",
              role: "Canal humano de confianza y motivación",
              tone: "violet",
              livesHere: [
                "Acompañamiento emocional",
                "Reclutamiento",
                "Motivación continua",
              ],
              notHere: [
                "Soporte técnico de la app",
                "Información operativa de Better",
              ],
            },
          ],
          gaps: [
            {
              job: "Ganar el primer ingreso rápido y sentir que valió la pena",
              asIs: "Proceso de alta lento, sin acompañamiento post-registro",
              toBe: "Journey de onboarding inteligente vía WhatsApp + Agentforce",
              severity: "critico",
            },
            {
              job: "Saber qué hacer cada día para avanzar",
              asIs: "No hay checklist ni guía diaria; información abrumadora",
              toBe: "Micro-contenido diario por WhatsApp + dashboard personal simple",
              severity: "critico",
            },
            {
              job: "Tener a alguien de confianza que me ayude cuando tengo dudas",
              asIs: "La mamá cubre esto, pero sin herramientas ni datos del sistema",
              toBe: "Consola de linaje + Agentforce que escala a la mamá en momentos clave",
              severity: "critico",
            },
            {
              job: "Reclutar sin sentir pena ni rechazo",
              asIs: "Sin material de apoyo para el pitch · Sin entrenamiento en prospección",
              toBe: "Kit de prospección digital vía WhatsApp + tips micro-formato",
              severity: "critico",
            },
            {
              job: "Saber que Better me apoya institucionalmente",
              asIs: "No saben que hay asesores, promotores ni instalaciones",
              toBe: "Comunicación proactiva del equipo de soporte + visibilidad del staff",
              severity: "critico",
            },
            {
              job: "Entender cuánto gano y cómo crecer",
              asIs: "Programas de puntos complejos · Sin simulador de ganancias",
              toBe: "Resumen semanal personalizado de avance y ganancias vía WhatsApp",
              severity: "alto",
            },
            {
              job: "Gestionar mi cartera de clientas y asociadas",
              asIs: "Papel y lápiz · La app no lo facilita",
              toBe: "CRM simple vía WhatsApp (consultas en lenguaje natural a Agentforce)",
              severity: "alto",
            },
            {
              job: "Entregar pedidos sin complicaciones logísticas",
              asIs: "Sin solución para distribuidoras con asociadas lejos de casa",
              toBe: "Mapa de entregas · Opciones de logística colaborativa",
              severity: "alto",
            },
            {
              job: "Hacer contenido para atraer clientes y reclutas",
              asIs: "Algunas lo hacen solas como influencers, sin apoyo de Better",
              toBe: "Templates de contenido · Profesionalización de comunicación en redes",
              severity: "alto",
            },
            {
              job: "Tener un plan de crecimiento claro con mi asesora",
              asIs: "Se hace en Excel, fuera del sistema",
              toBe: "Plan comercial digital integrado en Salesforce (Sales Cloud / Service Cloud)",
              severity: "alto",
            },
          ],
          initiatives: [
            {
              label: "Prioridad 1 · Fundacional",
              subtitle: "Lanzar en producción",
              tone: "indigo",
              items: [
                {
                  number: 1,
                  name: "Agentforce para Distribuidoras vía WhatsApp",
                  solves: "Consultas 24/7 en lenguaje natural sobre pedidos, crédito, puntos, entrega",
                  capability: "Agentforce + Service Cloud + WhatsApp Business API",
                  impact: "−30% tickets Contact Center · WhatsApp como canal oficial",
                },
                {
                  number: 2,
                  name: "Journey de Onboarding Inteligente",
                  solves: "Acompañamiento automático en las primeras 2 semanas post-alta",
                  capability: "Marketing Cloud Journey Builder + Data Cloud (segmentación)",
                  impact: "+15–20 pts en conversión inscripción → primer pedido",
                },
                {
                  number: 3,
                  name: "Consola de Linaje para la Mamá",
                  solves: "Visibilidad de su red, alertas de riesgo, señales de churn temprano",
                  capability: "Service Cloud + Data Cloud (red de linaje) + WhatsApp",
                  impact: "+15–20% retención en primeras 8 semanas",
                },
              ],
            },
            {
              label: "Prioridad 2 · Diferenciación",
              subtitle: "Primeros 90 días post-producción",
              tone: "violet",
              items: [
                {
                  number: 4,
                  name: "Resumen Semanal Personalizado",
                  solves: "Distribuidora no sabe cuánto ganó ni cómo avanzó",
                  capability: "Marketing Cloud + Data Cloud (ganancias y progreso) vía WhatsApp",
                  impact: "Incremento en recurrencia de pedido semanal",
                },
                {
                  number: 5,
                  name: "Kit de Prospección Digital",
                  solves: "DS no saben cómo reclutar ni hacer el pitch",
                  capability: "Marketing Cloud (contenido) + WhatsApp (micro-tips)",
                  impact: "Aumento en captación de asociadas por DS",
                },
                {
                  number: 6,
                  name: "Plan Comercial Digital (Staff + DS)",
                  solves: "Planes se hacen en Excel fuera del sistema",
                  capability: "Sales Cloud (plan comercial) + Tableau (visualización)",
                  impact: "Trazabilidad de visitas · Reemplazo de Excel",
                },
              ],
            },
            {
              label: "Prioridad 3 · Escalabilidad",
              subtitle: "Siguiente ciclo de inversión",
              tone: "sky",
              items: [
                {
                  number: 7,
                  name: "CRM Simple vía WhatsApp para DS",
                  solves: "Llevan clientes en papel y lápiz",
                  capability: "Agentforce (consultas CRM en lenguaje natural) + Service Cloud",
                  impact: "Reemplazo del papel · Visibilidad de cartera de clientes",
                },
                {
                  number: 8,
                  name: "Programa de Mentoras Certificadas",
                  solves: "No hay formalización del rol de la mamá de linaje",
                  capability: "Service Cloud (perfil de mentora) + Tableau (KPIs de red)",
                  impact: "Retención · Crecimiento de red de 2° nivel",
                },
                {
                  number: 9,
                  name: "Hub de Contenido para Influencers DS",
                  solves: "Distribuidoras influencers sin apoyo de Better",
                  capability: "Marketing Cloud (templates) + Salesforce CMS",
                  impact: "Captación orgánica · Imagen de marca consistente",
                },
                {
                  number: 10,
                  name: "Automatización del Alta y Recuperación",
                  solves: "25% de altas perdidas por documentación · 42% completan formulario",
                  capability: "Service Cloud (case management) + Marketing Cloud (recuperación)",
                  impact: "+20 pts en completitud de formulario",
                },
              ],
            },
          ],
          sprints: [
            {
              label: "Sprint 0 · Fundación y Piloto",
              dates: "1-jun-2026 → 31-jul-2026",
              tone: "indigo",
              initiatives: [1],
              extras: [
                "Lanzamiento a producción de la plataforma BEFRA (Service + Marketing + Data Cloud)",
                "Modelo de datos de linaje en Data Cloud · UX research con mamás reales",
              ],
            },
            {
              label: "Sprint 1 · Activación y Onboarding",
              dates: "1-ago-2026 → 31-oct-2026",
              tone: "violet",
              initiatives: [2, 3, 4, 5, 6],
              extras: [
                "Medición de KPIs: conversión inscripción → primer pedido · retención 8 semanas",
              ],
            },
            {
              label: "Sprint 2 · Consolidación y Escala",
              dates: "1-nov-2026 → 31-ene-2027",
              tone: "sky",
              initiatives: [7, 8, 9, 10],
              extras: [
                "Dashboard de Ascenso/Upgrade en Tableau · Revisión de KPIs y decisión sobre siguiente ciclo",
              ],
            },
            {
              label: "Sprint 3 · Inteligencia y Personalización",
              dates: "1-feb-2027 en adelante",
              tone: "emerald",
              initiatives: [],
              extras: [
                "Personalización avanzada en la app por perfil (DS vs. asociada)",
                "Modelos predictivos de churn (Data Cloud + Einstein)",
                "Amplitude + Data Cloud para journey optimization · Expansión de Mentoras a toda la red",
              ],
            },
          ],
          kpis: [
            {
              kpi: "Conversión inscripción → primer pedido",
              baseline: "52–60%",
              goal90d: "65%",
              goal6m: "75%",
            },
            {
              kpi: "Completitud del formulario de alta",
              baseline: "42%",
              goal90d: "60%",
              goal6m: "70%",
            },
            {
              kpi: "Retención DS nuevas (8 semanas)",
              baseline: "No medido sistemáticamente",
              goal90d: "Línea base establecida",
              goal6m: "+15–20 pts vs. línea base",
            },
            {
              kpi: "Tickets Contact Center (consultas operativas)",
              baseline: "Línea base actual",
              goal90d: "−15%",
              goal6m: "−30%",
            },
            {
              kpi: "Apertura comunicaciones WhatsApp vs App push",
              baseline: "App: \"casi no se abren\"",
              goal90d: "WhatsApp: >40% open rate",
              goal6m: "WhatsApp: >60% open rate",
            },
            {
              kpi: "DS con mamá de linaje activa en sistema",
              baseline: "0% (sin visibilidad)",
              goal90d: "Piloto: 50–100 mamás",
              goal6m: "20% de la red activa en sistema",
            },
            {
              kpi: "Planes comerciales creados digitalmente",
              baseline: "0 (Excel)",
              goal90d: "50 planes piloto",
              goal6m: "80% del staff usa herramienta digital",
            },
          ],
        },
      },

      // ── 7. Inteligencia y Personalización ────────────────────────────
      {
        id: "sprint-3",
        label: "Inteligencia y Personalización",
        title: "Inteligencia y Personalización",
        content:
          "La continuación natural del roadmap del JTBD. Aquí Betterware da el salto: deja de tratar a todas las distribuidoras igual y convierte a cada una en una influencer digital con su propia tienda — sin crear miles de páginas. Un solo sitio, un link único por distribuidora, contenido que se transforma en tiempo real con su identidad, y atribución 1:1 entre cada compra y la distribuidora que la generó.",
        sprint3Data: {
          conceptQuote:
            "Betterware crea el contenido. Salesforce le da identidad. La distribuidora se convierte en influencer digital — sin crear nada desde cero.",
          highlights: [
            { value: "1 sitio", label: "Una sola landing — no miles de micrositios" },
            { value: "1 link", label: "Único y seguro por distribuidora" },
            { value: "1:1", label: "Atribución directa: compra ↔ distribuidora" },
            { value: "+", label: "Adopción de la app" },
          ],
          roles: [
            {
              name: "Betterware",
              tagline: "Empresa · marca",
              description:
                "Crea el contenido base de la campaña una sola vez: copy, productos, estructura. Configura la plataforma. No mantiene una página por distribuidora.",
              tone: "indigo",
            },
            {
              name: "Distribuidora",
              tagline: "Cada una con su propia red de asociadas",
              description:
                "Recibe por WhatsApp su link único personalizado. Lo comparte con sus asociadas como si fuera su propio catálogo personal. No edita, no diseña, no crea.",
              tone: "violet",
            },
            {
              name: "Asociada",
              tagline: "Cliente final · revendedora",
              description:
                "Recibe el link, abre la landing y ve el \"catálogo personal de María\" con su mensaje, sus productos top y su CTA personal. Compra directamente — y esa compra queda atribuida a su distribuidora.",
              tone: "sky",
            },
          ],
          shift: {
            after: {
              heading: "Un sitio, identidad por distribuidora",
              body:
                "Una sola landing base. Cuando la asociada abre el link, el sitio se transforma en tiempo real con la identidad de la distribuidora: su nombre, su mensaje, sus productos top, su CTA.",
              bullets: [
                "Una sola página que mantener — el catálogo se actualiza una vez",
                "UX unificada con el resto del sitio · checkout directo",
                "Atribución limpia entre compra y distribuidora",
                "Cada distribuidora se siente como creadora de contenido",
              ],
            },
          },
          flow: [
            {
              number: 1,
              title: "Marketing crea el contenido base",
              description:
                "Betterware diseña una sola campaña con segmento, copy y estructura. El contenido base vive en una librería compartida — no se duplica por distribuidora.",
              actor: "Marketing Cloud",
              tone: "indigo",
            },
            {
              number: 2,
              title: "Se genera un link único por distribuidora",
              description:
                "Cada distribuidora recibe un link seguro y personal. El link no expone IDs internos y no se puede falsificar — está pensado para vivir en WhatsApp.",
              actor: "Marketing Cloud",
              tone: "indigo",
            },
            {
              number: 3,
              title: "Marketing lo envía por WhatsApp",
              description:
                "La distribuidora recibe su link como un mensaje de WhatsApp oficial de Betterware, listo para reenviar a sus asociadas.",
              actor: "Marketing Cloud",
              tone: "indigo",
            },
            {
              number: 4,
              title: "La distribuidora comparte su link",
              description:
                "Reenvía el mensaje a sus asociadas como si fuera su propio catálogo personal. Cero esfuerzo creativo: el contenido y la identidad ya están listos.",
              actor: "Distribuidora",
              tone: "violet",
            },
            {
              number: 5,
              title: "Salesforce reconoce a la distribuidora",
              description:
                "Salesforce Personalization detecta el link único y consulta a Data 360 para resolver la identidad de la distribuidora que lo generó.",
              actor: "Salesforce",
              tone: "sky",
            },
            {
              number: 6,
              title: "Data 360 entrega el perfil unificado",
              description:
                "Data 360 devuelve nombre, badge, mensaje personal y los productos top que la distribuidora recomienda — todo en milisegundos.",
              actor: "Data 360",
              tone: "sky",
            },
            {
              number: 7,
              title: "La landing se transforma en tiempo real",
              description:
                "La página se renderiza con la identidad de la distribuidora: su nombre, su mensaje, sus productos, su CTA. La asociada ve el catálogo personal de su distribuidora — sin que Betterware haya creado miles de páginas.",
              actor: "Salesforce",
              tone: "emerald",
            },
            {
              number: 8,
              title: "La asociada hace clic",
              description:
                "El link abre el sitio oficial de Betterware. La asociada nunca sale del entorno seguro de la marca — dirigir a la app en un click para realizar pedido.",
              actor: "Asociada",
              tone: "violet",
            },
            {
              number: 9,
              title: "Se direcciona a la app para realizar el pedido",
              description:
                "Desde la landing, la asociada pasa a la app Betterware Plus en un click. El checkout vive en la app — donde ya hay catálogo completo, gestión de pago y entrega.",
              actor: "App Betterware Plus",
              tone: "emerald",
            },
            {
              number: 10,
              title: "Se genera la atribución para la distribuidora",
              description:
                "La compra queda atribuida a la distribuidora — directa si la asociada cierra en la misma sesión, indirecta si vuelve después y Data 360 la reconoce.",
              actor: "Data 360",
              tone: "emerald",
            },
          ],
          landingZones: [
            {
              number: 1,
              label: "Encabezado de identidad",
              example: "María González · Distribuidora Líder",
              description:
                "Nombre y badge de la distribuidora en el hero — la asociada reconoce a quién le está comprando desde el primer segundo.",
            },
            {
              number: 2,
              label: "Mensaje inspiracional",
              example: "\"Estos productos cambiaron mi vida — y pueden cambiar la tuya.\"",
              description:
                "Una frase personal que da voz a la distribuidora. La marca presta el contenido base; ella aporta la cercanía.",
            },
            {
              number: 3,
              label: "Productos top que recomienda",
              example: "Set cocina · Limpiadores · Velas",
              description:
                "Grid dinámico con los productos que esa distribuidora vende más, alineados a su perfil y a su región.",
            },
            {
              number: 4,
              label: "CTA personal",
              example: "Pide con María",
              description:
                "El llamado a la acción se siente personal, no genérico. Hace explícito que esta compra apoya el negocio de su distribuidora.",
            },
          ],
          audiences: [
            {
              name: "Top performers digitales",
              signal: "Distribuidoras con mayor tasa de conversión por link compartido",
              activation: "Campañas de reconocimiento, badges públicos, contenido premium destacado",
              outcome: "Refuerzo del comportamiento que ya está funcionando",
              tone: "indigo",
            },
            {
              name: "Asociadas que vieron pero no compraron",
              signal: "Llegaron al link pero no completaron pedido",
              activation: "Recordatorio en WhatsApp con el carrito y un cupón de la distribuidora",
              outcome: "Recuperación de la conversión sin esfuerzo manual de la distribuidora",
              tone: "violet",
            },
            {
              name: "Distribuidoras inactivas con red activa",
              signal: "DS sin movimiento, pero con asociadas que sí compran",
              activation: "Reactivación con resumen de su red y oferta de re-onboarding",
              outcome: "Recuperación de DS con potencial real, no de DS vacías",
              tone: "sky",
            },
            {
              name: "Asociadas leales · embajadoras potenciales",
              signal: "Asociadas con compras recurrentes desde el link de una misma DS",
              activation: "Invitación a convertirse en distribuidoras (programa de upgrade)",
              outcome: "Crecimiento orgánico de la red — sin captación pagada",
              tone: "emerald",
            },
            {
              name: "Segmentos por región y producto",
              signal: "Comportamiento de compra por geografía y categoría",
              activation: "Campañas regionales con productos relevantes y mensaje local",
              outcome: "Mensaje correcto, en el lugar correcto, con la distribuidora correcta",
              tone: "amber",
            },
          ],
          attribution: {
            intro:
              "La atribución no vive en cookies del navegador — vive en el perfil unificado de Data 360. No se pierde si la asociada cierra el navegador, si cambia de dispositivo o si vuelve días después.",
            direct: {
              title: "Directa",
              how: "La asociada compra a través del link que direcciona a la app",
            },
            indirect: {
              title: "Indirecta",
              how: "Llega desde el link, no compra, pero regresa después y Data 360 la reconoce",
              when: "Asociada ya identificada en Data Cloud (login o resolución por email/teléfono)",
            },
            persistence:
              "La atribución es persistente en el perfil de ambas — distribuidora y asociada. Cada comisión, cada ranking y cada campaña de fidelización vive sobre una verdad medible: quién generó qué venta.",
          },
          stack: [
            {
              product: "Marketing Cloud",
              role: "Crea el contenido base, genera los links únicos y los envía por WhatsApp en escala",
              tone: "indigo",
            },
            {
              product: "Data 360",
              role: "Mantiene el perfil unificado de cada distribuidora, resuelve identidades y guarda la atribución",
              tone: "violet",
            },
            {
              product: "Salesforce Personalization",
              role: "Transforma la landing en tiempo real con la identidad de cada distribuidora y link que direcciona a la app",
              tone: "sky",
            },
            {
              product: "Una sola landing",
              role: "Es el lienzo donde la experiencia personalizada se renderiza",
              tone: "emerald",
            },
            {
              product: "App Betterware Plus",
              role: "Hacia donde se direccionan para hacer el checkout",
              tone: "indigo",
            },
          ],
          kpis: [
            {
              metric: "Tasa de conversión por distribuidora",
              detail: "Visible y comparable entre distribuidoras",
            },
            {
              metric: "Ticket promedio por link compartido",
              detail: "Por distribuidora · por región · por producto",
            },
            {
              metric: "Ranking de distribuidoras digitales",
              detail: "Basado en lo que cada DS genera con sus asociadas",
            },
            {
              metric: "Asociadas activas por distribuidora",
              detail: "Dashboard en tiempo real desde Data 360",
            },
          ],
        },
      },

      // ── 8. Solución ────────────────────────────────────────────────────
      {
        id: "solution",
        label: "Solución",
        title: "Aliada Digital — Un ecosistema que conoce, guía y resuelve",
        content:
          "Aliada Digital no es un chatbot. Es un sistema inteligente con cuatro componentes que trabajan en conjunto sobre una capa de datos confiable y bajo controles explícitos de gobernanza. A continuación, el principio rector, los cuatro componentes, el diseño de tópicos del agente y la capa de confianza. Validado contra los 10 Jobs to Be Done identificados — ver pestaña JTBD.",
        blueprintData: {
          principle: {
            title:
              "El principio rector: resolver primero, explicar simple, acompañar siempre y escalar solo cuando sea necesario.",
            quote:
              "La Distribuidora no debería tener que saber qué sistema consultar, a quién escribirle o cómo formular técnicamente su problema. Debería poder expresar su necesidad en lenguaje natural y recibir una respuesta clara, confiable y accionable.",
            capabilities: [
              "Entender la intención real de la DS, incluso cuando la pregunta venga incompleta o mal redactada",
              "Consultar información confiable en tiempo real desde las fuentes correctas",
              "Ejecutar acciones operativas permitidas mediante flujos, APIs e integraciones controladas",
              "Escalar con contexto completo cuando el caso requiera intervención humana",
            ],
          },
          components: [
            {
              number: "01",
              name: "Orquestación proactiva de journeys",
              shortName: "Marketing & Journeys",
              type: "orchestration",
              purpose:
                "Activaciones desde Marketing Cloud para onboarding, recordatorios, capacitación, objetivos, alertas, comunicación de procesos y prevención de abandono.",
              user: "Marketing & Customer Success → DS",
              channels: ["📲 WhatsApp", "📧 Email", "💬 SMS", "🔔 Push"],
              capabilities: [
                {
                  title: "Journeys por etapa de onboarding",
                  body: "6 momentos clave en los primeros 6 meses con contenidos progresivos por madurez digital de la DS.",
                },
                {
                  title: "Recordatorios y alertas",
                  body: "Fechas de corte, brecha de objetivo, pedidos pendientes, capacitaciones por completar — todo proactivo, no reactivo.",
                },
                {
                  title: "Comunicación segmentada",
                  body: "Por antigüedad, comportamiento, canal preferido y nivel de actividad — nunca un mensaje masivo cuadrado.",
                },
                {
                  title: "Prevención de abandono",
                  body: "Disparada por señales del Data Cloud: caída de actividad, recurrencia de quejas, falta de avance en objetivo.",
                },
              ],
              products: ["Marketing Cloud", "Data Cloud", "Journey Builder"],
            },
            {
              number: "02",
              name: "Agente DS 360 — Asistente Inteligente para Distribuidoras",
              shortName: "Agente DS 360",
              type: "external",
              purpose:
                "Punto único de atención, guía y resolución para la Distribuidora. Disponible 24/7, capaz de responder dudas, consultar información operativa, orientar sobre objetivos, resolver incidencias simples y acompañar el crecimiento de la DS.",
              user: "Distribuidora Independiente Betterware",
              channels: ["💬 WhatsApp", "📱 Portal / App DS", "🌐 Web chat autenticado", "🎙️ Voz (futuro)"],
              capabilities: [
                {
                  title: "A · Resolución en primer contacto",
                  body: "Atiende preguntas e incidencias frecuentes sin intervención humana: pedido incompleto, saldo, objetivo, devolución, cargo desconocido.",
                },
                {
                  title: "B · Consulta de pedidos, devoluciones y saldos",
                  body: "Visibilidad clara del estado operativo y financiero de la DS: pedidos abiertos, faltantes, saldos, pagos, transacciones, fechas relevantes.",
                },
                {
                  title: "C · Acompañamiento de objetivos",
                  body: "Avance vs meta, brecha de cumplimiento, recomendaciones comerciales, recordatorios de fechas clave, alertas y celebración de avances.",
                },
                {
                  title: "D · Explicación simple de reglas",
                  body: "Traduce reglas complejas a lenguaje claro con ejemplo aplicado al caso de la DS — nunca jerga corporativa.",
                },
                {
                  title: "E · Onboarding guiado (6 meses)",
                  body: "Ruta progresiva: Día 1 bienvenida → Semana 1 primer pedido → Mes 1 objetivos → Mes 2-3 cartera → Mes 4-6 hábitos y autonomía.",
                },
                {
                  title: "F · Capacitación integrada al flujo",
                  body: "Microcontenidos justo cuando aplican: cómo leer estado de cuenta, cómo explicar promoción, cómo organizar pedidos.",
                },
              ],
              products: ["Agentforce", "Service Cloud", "Knowledge"],
            },
            {
              number: "03",
              name: "Copiloto Staff 360 — Asistente Interno para Atención y Operaciones",
              shortName: "Copiloto Staff 360",
              type: "internal",
              purpose:
                "Vista completa, resumida y accionable de cada Distribuidora para mejorar la calidad de atención, reducir tiempos de resolución y evitar escalaciones innecesarias.",
              user: "Operaciones · Atención · Customer Success · Soporte comercial · Supervisión",
              channels: ["🖥️ Salesforce Console", "💼 Slack", "📊 Tableau Next"],
              capabilities: [
                {
                  title: "A · Resumen DS 360",
                  body: "Perfil, clasificación, antigüedad, nivel de actividad, historial de ventas, objetivos, pedidos recientes, saldos, casos abiertos, riesgo de abandono y recomendación de atención.",
                },
                {
                  title: "B · Asistencia durante la atención",
                  body: "Sugiere respuestas, explica contexto y recomienda acciones: «Esta DS ya contactó dos veces por el mismo tema», «tiene saldo pendiente desde hace 7 días».",
                },
                {
                  title: "C · Reducción de escalaciones",
                  body: "Antes de escalar, valida si existe política aplicable, caso previo, respuesta en knowledge o si la acción puede ejecutarse automáticamente.",
                },
                {
                  title: "D · Empatía asistida",
                  body: "Ayuda al staff a adaptar tono y respuesta según el contexto histórico de la DS — reconocer frustración, evitar respuestas genéricas.",
                },
              ],
              products: ["Agentforce", "Service Cloud", "Slack", "Tableau Next"],
            },
            {
              number: "04",
              name: "Capa de datos e inteligencia DS 360",
              shortName: "Capa DS 360",
              type: "data",
              purpose:
                "Vista unificada de la Distribuidora construida con Data Cloud, Service Cloud, fuentes operativas y datos comerciales. Habilita personalización, segmentación, priorización y comunicación proactiva.",
              user: "Plataforma transversal · alimenta Agente DS 360, Copiloto Staff y Marketing",
              capabilities: [
                {
                  title: "Perfil DS",
                  body: "ID, nombre, región, antigüedad, clasificación, nivel, segmento, estatus, canal preferido, madurez digital, relación con OJ.",
                },
                {
                  title: "Actividad comercial",
                  body: "Ventas por periodo, objetivo vigente, avance, brecha, categorías top, frecuencia, ticket promedio, tendencia.",
                },
                {
                  title: "Pedidos · saldos · interacciones",
                  body: "Pedidos recientes, estado de entrega, faltantes, devoluciones, saldos, pagos, casos abiertos/cerrados, sentimiento, recurrencia.",
                },
                {
                  title: "Capacitación y onboarding",
                  body: "Etapa, contenidos completados, hitos pendientes, nivel de adopción digital, alertas de riesgo.",
                },
              ],
              products: ["Data Cloud", "Service Cloud", "Einstein"],
            },
          ],
          topics: [
            {
              name: "Tópico 1 · Consulta de pedidos",
              goal: "Resolver dudas sobre pedidos, entregas, faltantes y devoluciones.",
              actions: [
                "Buscar pedido por DS",
                "Consultar estado de entrega",
                "Validar faltantes",
                "Crear caso de pedido incompleto",
                "Consultar política de devolución",
              ],
              limits: [
                "No prometer compensaciones sin validación",
                "No modificar pedidos si la política no lo permite",
                "Escalar si hay inconsistencia entre sistemas",
              ],
            },
            {
              name: "Tópico 2 · Saldos y transacciones",
              goal: "Dar claridad financiera a la DS.",
              actions: [
                "Consultar saldo actual",
                "Consultar pagos recientes",
                "Consultar cargos y abonos",
                "Explicar saldo en lenguaje simple",
                "Crear caso financiero si hay discrepancia",
              ],
              limits: [
                "No revelar información sin autenticación",
                "No modificar saldos directamente",
                "No prometer ajustes sin autorización",
              ],
            },
            {
              name: "Tópico 3 · Objetivos y crecimiento",
              goal: "Ayudar a la DS a entender su avance y tomar acciones para cumplir sus metas.",
              actions: [
                "Consultar objetivo vigente",
                "Calcular avance",
                "Explicar brecha",
                "Recomendar acciones comerciales",
                "Sugerir capacitación relacionada",
              ],
              limits: [
                "No inventar metas",
                "No recomendar acciones fuera de reglas vigentes",
                "No presentar proyecciones como garantía",
              ],
            },
            {
              name: "Tópico 4 · Reglas comerciales",
              goal: "Explicar reglas, promociones, beneficios y procesos de manera simple.",
              actions: [
                "Buscar artículo de conocimiento",
                "Resumir regla",
                "Dar ejemplo aplicado al caso de la DS",
                "Confirmar entendimiento",
                "Escalar si requiere interpretación especial",
              ],
              limits: [
                "Responder solo con fuentes aprobadas",
                "Mostrar fecha de vigencia",
                "Evitar respuestas si la fuente está desactualizada",
              ],
            },
            {
              name: "Tópico 5 · Onboarding y capacitación",
              goal: "Guiar a nuevas DS durante sus primeros meses.",
              actions: [
                "Identificar etapa de onboarding",
                "Recomendar siguiente paso",
                "Enviar microcontenido",
                "Validar avance",
                "Activar journey de seguimiento",
              ],
              limits: [
                "No saturar con demasiada información",
                "Adaptar contenido al nivel digital de la DS",
                "Escalar a humano si hay bloqueo persistente",
              ],
            },
            {
              name: "Tópico 6 · Escalación inteligente",
              goal: "Transferir a humano únicamente cuando sea necesario y con contexto completo.",
              actions: [
                "Crear caso",
                "Clasificar motivo y priorizar severidad",
                "Resumir conversación",
                "Adjuntar datos relevantes",
                "Recomendar siguiente acción al agente humano",
              ],
              limits: [
                "No transferir sin intentar resolver primero (salvo casos sensibles)",
                "No repetir preguntas ya respondidas",
                "No perder contexto entre canales",
              ],
            },
          ],
          trustControls: [
            {
              name: "🔐 Autenticación y autorización",
              items: [
                "Autenticación por canal seguro",
                "Validación de número telefónico",
                "OTP cuando aplique",
                "Control de acceso por perfil",
                "Restricción de datos por DS ID",
              ],
            },
            {
              name: "📚 Grounding en fuentes confiables",
              items: [
                "Knowledge aprobado",
                "Datos transaccionales",
                "Reglas comerciales vigentes",
                "Datos unificados Data Cloud",
                "APIs oficiales",
              ],
            },
            {
              name: "🤝 Human-in-the-loop",
              items: [
                "Discrepancia financiera",
                "Reclamo repetido",
                "Frustración alta de la DS",
                "Excepción comercial",
                "Riesgo reputacional",
              ],
            },
            {
              name: "📋 Auditoría completa",
              items: [
                "Intención detectada",
                "Datos consultados",
                "Respuesta entregada",
                "Acción ejecutada",
                "Nivel de confianza · feedback DS",
              ],
            },
          ],
        },
      },

      // ── 7. Arquitectura ───────────────────────────────────────────────
      {
        id: "arquitectura",
        label: "Arquitectura",
        title: "Arquitectura técnica Grupo BeFra — As Is → To Be",
        content:
          "Dos vistas comparables del mismo ecosistema. Primero la fotografía actual (As Is) con sistemas dispersos, integraciones puntuales y datos atrapados en silos por marca. Después la arquitectura objetivo (To Be) sobre Salesforce Customer 360 + Data Cloud + Agentforce, con MuleSoft como columna de integración y Einstein Trust Layer como foundation.",
        befraArchData: {
          asIs: {
            id: "asis",
            eyebrow: "Estado actual",
            title: "Arquitectura As Is — sistemas dispersos por marca",
            summary:
              "Hoy Grupo BeFra opera con dos organizaciones Salesforce separadas (Betterware y JAFRA), múltiples canales sin orquestar (WhatsApp, App Móvil, Web, Voice, Email, Excel, SharePoint), un ERP Odoo, motores legacy (DB AS400, Ax212, Dynamics, ServiceNow) y reportería en Power BI. La integración existe pero es puntual: MuleSoft conecta lo crítico, mientras que muchos procesos siguen dependiendo de archivos manuales y conexiones directas.",
            svgUrl: "/Customers/Betterware/files/Befra%20(Betterware)%20Architecture%20VF%20-%20As%20Is.svg",
            pdfUrl: "/Customers/Betterware/files/Befra%20(Betterware)%20Architecture%20VF%20-%20As%20Is.pdf",
            highlights: [
              {
                label: "Dos orgs separadas",
                tone: "red",
                body: "Org Betterware y Org JAFRA viven en paralelo: cuentas, casos y comportamiento comercial duplicados, sin Data 360 unificada.",
              },
              {
                label: "Canales sin orquestación",
                tone: "amber",
                body: "WhatsApp, App Móvil, Web, Voice, Email y Excel funcionan, pero no comparten contexto ni hand-off automatizado al staff.",
              },
              {
                label: "Datos en silos",
                tone: "violet",
                body: "DB SQL, DB AS400 Legacy, SharePoint y procesos manuales generan reportes Power BI desfasados — sin perfil 360 de la DS.",
              },
            ],
            zones: [
              {
                label: "Canales actuales",
                tone: "channels",
                nodes: ["WhatsApp", "App Móvil", "Web", "Voice", "Email", "Excel"],
              },
              {
                label: "Salesforce — dos orgs",
                tone: "platform",
                nodes: [
                  "Org Betterware",
                  "Org JAFRA",
                  "Service",
                  "Marketing",
                  "Data 360 (parcial)",
                  "Agentforce (piloto)",
                ],
              },
              {
                label: "Sistemas back-office",
                tone: "external",
                nodes: [
                  "Odoo ERP",
                  "Ax212",
                  "Dynamics",
                  "ServiceNow",
                  "DB SQL",
                  "DB AS400 Legacy",
                  "SharePoint",
                  "Power BI",
                ],
              },
              {
                label: "Integración",
                tone: "integration",
                nodes: ["MuleSoft (selectivo)", "Conectores puntuales", "Procesos manuales"],
              },
            ],
          },
          toBe: {
            id: "tobe",
            eyebrow: "Estado objetivo",
            title: "Arquitectura To Be — Customer 360 + Data Cloud + Agentforce",
            summary:
              "El target organiza el ecosistema en cinco capas: canales de engagement unificados, Salesforce Customer 360 (Service, Marketing, Platform, Field Service, Tableau, Agentforce) sobre una sola Data 360, MuleSoft como capa de integración API-Led, aplicaciones empresariales (Odoo, AS400, Dynamics, ServiceNow) detrás del bus, y datalakes (Databricks, GCP) accesibles vía Zero Copy. Una sola visión de la DS, agentes con grounding sobre Data 360, integración gobernada y orquestación nativa.",
            svgUrl: "/Customers/Betterware/files/Befra%20(Betterware)%20Architecture%20VF%20-%20To%20Be%20V1.svg",
            pdfUrl: "/Customers/Betterware/files/Befra%20(Betterware)%20Architecture%20VF%20-%20To%20Be%20V1.pdf",
            highlights: [
              {
                label: "Customer 360 unificado",
                tone: "blue",
                body: "Service, Marketing Advanced, Platform, Field Service, Tableau y Agentforce sobre la misma plataforma — sin orgs duplicadas.",
              },
              {
                label: "Data 360 con Zero Copy",
                tone: "violet",
                body: "Streaming + Batch Ingestion, Unified Customer Profile, Calculated Insights, Semantic Layer y grounding directo a Agentforce. Datalake Databricks y GCP via Zero Copy.",
              },
              {
                label: "MuleSoft como columna",
                tone: "amber",
                body: "API Management, Anypoint Platform, Event-Driven Architecture y Security & Governance — todas las apps back-office detrás del bus.",
              },
              {
                label: "Agentforce nativo",
                tone: "teal",
                body: "Agent Builder, Observability y Orchestration trabajando con Data 360 — ya no piloto aislado, sino capa transversal.",
              },
              {
                label: "Engagement multicanal",
                tone: "blue",
                body: "WhatsApp, SMS, Push, Email, Landing Page y App Móvil orquestados desde Marketing Advanced + Personalization + Intelligence.",
              },
              {
                label: "Back-office gobernado",
                tone: "red",
                body: "Odoo, AS400, Ax212, ServiceNow, Credilazo y Driving entran al modelo via integraciones API/ETL/EDI con políticas centralizadas.",
              },
            ],
            zones: [
              {
                label: "Engagement Channels",
                tone: "channels",
                nodes: [
                  "WhatsApp",
                  "SMS",
                  "Email",
                  "Push Notification",
                  "Landing Page",
                  "App Móvil",
                ],
              },
              {
                label: "Salesforce Customer 360",
                tone: "platform",
                nodes: [
                  "Service · Case Mgmt · Omnichannel",
                  "Marketing Advanced · Engagement",
                  "Platform · Flow · Apex",
                  "Field Service",
                  "Tableau · Reports · Intelligence",
                ],
              },
              {
                label: "Data 360 + Agentforce",
                tone: "data",
                nodes: [
                  "Unified Customer Profile",
                  "Calculated Insights",
                  "Semantic Layer",
                  "Grounding Agentforce",
                  "Agent Builder",
                  "Observability",
                  "Orchestration",
                ],
              },
              {
                label: "Integración (API · ETL · P2P · EDI)",
                tone: "integration",
                nodes: [
                  "MuleSoft Anypoint",
                  "API Management",
                  "Event-Driven Architecture",
                  "Security & Governance",
                ],
              },
              {
                label: "Enterprise Applications",
                tone: "external",
                nodes: [
                  "Odoo ERP",
                  "Ax212",
                  "Dynamics",
                  "ServiceNow",
                  "DB AS400 Legacy",
                  "DB SQL",
                  "SharePoint",
                  "Org Credilazo",
                  "Driving",
                ],
              },
              {
                label: "Datalake · Zero Copy",
                tone: "agentforce",
                nodes: ["Datalake Databricks", "Datalake GCP", "Zero Copy"],
              },
            ],
          },
        },
      },

      // ── 8. Roadmap ────────────────────────────────────────────────────
      {
        id: "roadmap",
        label: "Roadmap",
        title: "MVP y roadmap de evolución",
        content:
          "El MVP no debe intentar resolver todos los casos de uso desde el inicio. Se enfoca en el punto de mayor dolor y mayor valor — Resolver en Primer Contacto — y desde ahí evoluciona en cuatro fases hacia un sistema completo de inteligencia predictiva y optimización comercial.",
        roadmapData: {
          mvp: {
            title: "MVP · Resolución en Primer Contacto para DS",
            reason:
              "Este MVP ataca directamente la prioridad máxima del taller, reduce fricción visible, genera métricas rápidas y crea la base técnica para evolucionar hacia DS 360, onboarding y comunicación proactiva. Time-to-value: 8-12 semanas según disponibilidad de datos e integraciones.",
            included: [
              "Consulta de pedido",
              "Pedido incompleto",
              "Consulta de saldo",
              "Explicación de transacciones",
              "Consulta de objetivo",
              "Explicación de reglas comerciales frecuentes",
              "Creación de caso con resumen automático",
              "Escalación inteligente",
            ],
            excluded: [
              "Predicción avanzada de churn",
              "Recomendaciones comerciales complejas",
              "Modificación directa de saldos",
              "Excepciones financieras",
              "Onboarding completo de 6 meses",
              "Optimización avanzada de cartera",
              "Automatización de procesos no documentados",
            ],
          },
          phases: [
            {
              number: 1,
              name: "MVP · Resolver en Primer Contacto",
              goal: "Demostrar valor rápido resolviendo los motivos de contacto más frecuentes de la DS.",
              duration: "Sprint 0 · jun → jul 2026 · 8 a 12 semanas",
              isMvp: true,
              color: "indigo",
              scope: [
                "Agente DS 360 en canal prioritario",
                "Consulta de pedidos · saldos · objetivos",
                "Explicación de reglas comerciales frecuentes",
                "Base de conocimiento estructurada",
                "Creación y escalación de casos",
                "Resumen automático para agente humano",
                "Dashboard de métricas inicial",
              ],
              metrics: [
                "% Resolución en primer contacto",
                "% Contención sin humano",
                "Tiempo promedio de respuesta",
                "CSAT de la DS · precisión de intención",
              ],
            },
            {
              number: 2,
              name: "DS 360 y Staff Copilot",
              goal: "Dar contexto completo al staff y mejorar la calidad de atención.",
              duration: "Sprint 1 · ago → oct 2026",
              color: "violet",
              scope: [
                "Perfil DS 360 completo",
                "Historial de interacciones y casos",
                "Pedidos y saldos en vista consolidada",
                "Recomendaciones de atención",
                "Resúmenes automáticos · priorización",
                "Detección de recurrencia",
              ],
              metrics: [
                "Reducción tiempo promedio de manejo",
                "Reducción escalaciones innecesarias",
                "Mejora calidad de respuesta",
                "Reducción de reprocesos",
              ],
            },
            {
              number: 3,
              name: "Onboarding inteligente y comunicación proactiva",
              goal: "Acompañar a las DS nuevas durante sus primeros 6 meses para mejorar activación, adopción y retención.",
              duration: "Sprint 2 · nov 2026 → ene 2027",
              color: "sky",
              scope: [
                "Journeys por etapa (6 momentos clave)",
                "Microcapacitaciones embebidas",
                "Recordatorios de objetivos",
                "Alertas de riesgo",
                "Recomendaciones personalizadas",
                "Segmentación por comportamiento",
                "Comunicación por canal preferido",
              ],
              metrics: [
                "Reducción deserción primeros 6 meses",
                "Aumento activación temprana",
                "Mayor adopción digital",
                "Engagement con capacitación",
              ],
            },
            {
              number: 4,
              name: "Inteligencia predictiva y optimización comercial",
              goal: "Pasar de resolver problemas a anticiparlos y recomendar acciones de crecimiento.",
              duration: "Sprint 3 · feb 2027 en adelante",
              color: "emerald",
              scope: [
                "Predicción de riesgo de churn",
                "Recomendaciones comerciales",
                "Next Best Action",
                "Segmentos inteligentes",
                "Detección de DS con caída de actividad",
                "Alertas proactivas al staff",
                "Optimización de comunicación",
              ],
              metrics: [
                "Reducción de churn",
                "Incremento en ventas por DS",
                "Incremento en frecuencia de pedido",
                "Mayor productividad del staff",
              ],
            },
          ],
        },
      },

      // ── 9. Historia ───────────────────────────────────────────────────
      {
        id: "historia",
        label: "Historia",
        title: "Lupita y la Mamá Virtual",
        content:
          "Lupita Hernández tiene 38 años, vive en Tlaquepaque y entró a Betterware hace 4 meses. Está en el corazón del journey crítico de 6 meses. Esta es la historia de cómo, en un solo día complicado, el ecosistema agéntico del Blueprint la sostuvo — y la convirtió de una DS al borde de desistir en una líder en crecimiento.",
        storyData: {
          protagonist: "Lupita Hernández",
          protagonistRole: "Distribuidora Independiente · Mes 4 · Tlaquepaque, Jalisco",
          intro:
            "Lupita es un personaje compuesto que representa fielmente el perfil de la DS en su journey crítico de 6 meses. La historia ilustra el futuro habilitado por Aliada Digital — basado en hallazgos reales del Antiexperience Workshop con el equipo de Betterware (29-may-2026).",
          scenes: [
            {
              number: 1,
              title: "El catálogo cierra mañana",
              subtitle: "Lunes · 09:14 a.m. · Cocina de Lupita · Tlaquepaque",
              icon: "💬",
              description:
                "Lupita está terminando de armar los pedidos de su grupo antes de que cierre el catálogo. Tiene 11 clientas en lista y un saldo pendiente con Betterware que la tiene preocupada — le prometieron una bonificación hace dos quincenas y aún no la ve. En meses anteriores hubiera escrito al directorio, esperado horas y aceptado una respuesta vaga. Hoy abre WhatsApp y le escribe a Betterware en el lenguaje en que habla: 'Oye, ¿qué onda con mi saldo? Ya van dos quincenas.'",
              channel: "WhatsApp · Agente DS 360",
              image: "/Customers/Betterware/images/story/escena01.png",
              pilar: "Tópico 2 · Saldos y transacciones · resolución autónoma",
              pilarColor: "indigo",
              products: ["Agentforce", "Service Cloud", "Data Cloud"],
              insight:
                "El agente reconoce el tono coloquial sin tropezar. Antes el sistema esperaba un formato cuadrado; hoy entiende intención. La DS se siente escuchada desde la primera frase.",
            },
            {
              number: 2,
              title: "El agente ya la conoce",
              subtitle: "Lunes · 09:14 a.m. · WhatsApp Business",
              icon: "🤖",
              description:
                "Antes de que Lupita termine de escribir, el Agente DS 360 ya tiene su contexto completo desde la Capa de datos: DS desde febrero, ciclo 4, segmento 'Cohorte Nueva 6m', historial de pedidos, bonificación pendiente del concurso 'Marzo Imparable' por $640 MXN sin aplicar. El agente no le pide su número de DS ni le pregunta de qué bonificación habla. Le responde: 'Hola Lupita, ya vi tu bonificación de Marzo Imparable. Está pendiente por una incidencia de aplicación. Te la libero ahora mismo, en 5 minutos la ves reflejada en tu saldo.'",
              channel: "Agente DS 360 · Capa de datos DS 360",
              image: "/Customers/Betterware/images/story/escena02.png",
              pilar: "Resolución en primer contacto + Visión 360",
              pilarColor: "indigo",
              products: ["Agentforce", "Data Cloud", "Service Cloud"],
              insight:
                "El staff tradicional pide número de cliente, motivo, fecha. La Capa DS 360 entrega a Lupita completa: identidad, comportamiento, saldo, segmento. Cero preguntas redundantes. Resolución en primer contacto.",
            },
            {
              number: 3,
              title: "Pedido incompleto — el dolor #1 del workshop",
              subtitle: "Lunes · 11:42 a.m. · Sala de Lupita",
              icon: "📦",
              description:
                "Llega su pedido de la quincena. Faltan dos productos. Antes esto era una llamada al contact center de 47 minutos. Lupita le saca foto al recibo y le manda al agente: 'Mira, no me llegaron estos.' El Agente reconoce el recibo, identifica los SKUs faltantes, abre un caso vía Tópico 1 (Consulta de pedidos), dispara el reenvío express desde Cenapia y le confirma fecha de entrega: jueves antes de las 6 p.m.",
              channel: "WhatsApp · Tópico 1 · Service Cloud",
              image: "/Customers/Betterware/images/story/escena03.png",
              pilar: "Tópico 1 · Consulta de pedidos · acción ejecutiva",
              pilarColor: "indigo",
              products: ["Agentforce", "Service Cloud", "OMS"],
              insight:
                "Antes la DS hacía cosas que no son su responsabilidad — buscar SKUs, escribir formularios, llamar varias veces. Hoy una foto del recibo es suficiente. La autonomía se vuelve estrategia de prospección.",
            },
            {
              number: 4,
              title: "La Mamá Virtual la cuida",
              subtitle: "Lunes · 11:43 a.m. · Mensaje proactivo",
              icon: "💖",
              description:
                "Antes de cerrar la conversación, el Agente DS 360 le manda un mensaje proactivo: 'Lupita, vi que en este ciclo te faltan $2,150 para llegar a tu objetivo. Tienes 3 clientas que compraron menos que el ciclo pasado: doña Cris, Jessi y Mary. ¿Te paso un mensaje listo para reactivarlas? También vi que aún no terminas el módulo de Cierre de Venta del LMS — te tomaría 8 minutos y aplica directo a este caso.' Lupita acepta los dos. Tópico 3 (Objetivos) + Tópico 5 (Onboarding) trabajando juntos.",
              channel: "Marketing Cloud · LMS embebido · Tópicos 3 y 5",
              image: "/Customers/Betterware/images/story/escena04.png",
              pilar: "Orquestación proactiva · acompañamiento personalizado",
              pilarColor: "violet",
              products: ["Marketing Cloud", "Agentforce", "Data Cloud"],
              insight:
                "El acompañamiento deja de ser intención y se vuelve momento. La capacitación deja de ser un curso fuera del flujo y se convierte en una microintervención de 8 minutos justo cuando aplica.",
            },
            {
              number: 5,
              title: "Doña Carmen quiere pagar (pero Kitspay no le late)",
              subtitle: "Lunes · 14:08 p.m. · Doña Carmen llama a Lupita",
              icon: "💳",
              description:
                "Doña Carmen quiere pagar pero le dice a Lupita: 'Eso del Kitspay no me late, mejor te paso transferencia.' Es exactamente la fricción que el Área 5 del workshop identificó. Lupita le pregunta al Agente qué hacer. El Tópico 4 (Reglas comerciales) le explica en lenguaje claro las dos opciones: cómo registrar la transferencia y cómo, si Doña Carmen quiere, ayudarla con el primer Kitspay paso a paso. No es respuesta cuadrada — es información contextualizada.",
              channel: "Agente DS 360 · Tópico 4 · Knowledge",
              image: "/Customers/Betterware/images/story/escena05.png",
              pilar: "Tópico 4 · Explicación simple de reglas",
              pilarColor: "violet",
              products: ["Agentforce", "Knowledge", "Data Cloud"],
              insight:
                "La fricción con Kitspay no se resuelve forzando — se resuelve acompañando. El agente da opciones, no respuestas únicas. La DS siente que tiene un asistente, no un chatbot.",
            },
            {
              number: 6,
              title: "El staff la ve completa",
              subtitle: "Martes · 10:30 a.m. · Centro de Servicio Betterware · Guadalajara",
              icon: "🧑‍💼",
              description:
                "Marisol, del equipo de customer success de Cenapia, recibe una alerta del Copiloto Staff 360: 'Lupita Hernández — DS Mes 4 — score de churn medio creciente. Recomendación: llamada de acompañamiento esta semana.' Antes Marisol llamaba con un nombre y un número. Hoy abre el perfil 360: comportamiento de consumo, comportamiento comercial, historial de interacciones con el Agente, módulos del LMS completados. Llama con datos accionables y empatía real.",
              channel: "Copiloto Staff 360 · Tableau Next · Capa DS 360",
              image: "/Customers/Betterware/images/story/escena06.png",
              pilar: "Componente 02 · Staff con visión 360",
              pilarColor: "sky",
              products: ["Tableau Next", "Data Cloud", "Agentforce", "Slack"],
              insight:
                "La empatía deja de ser intención y se vuelve dato accionable. El staff ya no atiende a ciegas — atiende con el contexto completo que el workshop pidió desde el primer dolor identificado.",
            },
            {
              number: 7,
              title: "Lupita en su mes 6 — la cohorte que sí se queda",
              subtitle: "Epílogo · Dos meses después · Tlaquepaque",
              icon: "🌟",
              description:
                "Lupita cumple 6 meses como Distribuidora. Está en el percentil correcto de su cohorte: cumplió objetivo en 4 de los últimos 5 ciclos, completó 80% del LMS, recomendó a 2 nuevas Asociadas y no escaló ningún ticket al humano en las últimas 4 semanas. Cuando una compañera nueva le pregunta '¿qué hago si no me llega un pedido?', Lupita le responde: 'Le escribes al Agente. Te resuelve.' Eso es lo que cambió. No es la tecnología — es la sensación de tener a alguien que la conoce, que habla su idioma y que la acompaña a cualquier hora.",
              channel: "Sales Cloud · Marketing Cloud · Data Cloud · Agentforce",
              image: "/Customers/Betterware/images/story/epilogo.png",
              pilar: "Los 4 componentes en sinergia · DS que se queda y crece",
              pilarColor: "emerald",
              products: ["Agentforce", "Sales Cloud", "Data Cloud", "Marketing Cloud", "Tableau Next"],
              insight:
                "Resolver. Acompañar. Hacer crecer. Los 4 componentes del Blueprint trabajando juntos producen el resultado que el workshop pidió: una DS que se queda — y multiplica.",
            },
          ],
        },
      },

      // ── 10. Assets ────────────────────────────────────────────────────
      {
        id: "assets",
        label: "Assets",
        title: "Assets de la solución",
        content:
          "Materiales que soportan la conversación con Betterware — desde el insumo del workshop hasta el blueprint propuesto y el deck ejecutivo.",
        assetsData: {
          items: [
            {
              name: "Antiexperience Workshop — Betterware (29-may-2026)",
              description:
                "Documento del taller con persona DS, 5 áreas de pain points, agentes diseñados por equipos y temas transversales identificados. Es el insumo de descubrimiento sobre el cuál se construyó el Blueprint.",
              available: true,
              type: "doc",
              url: "/Customers/Betterware/files/Antiexperience Workshop — Betterware.pdf",
            },
            {
              name: "Entregable JTBD — Insights, Journey & Roadmap (14-may-2026)",
              description:
                "Canvas Jobs to Be Done construido con el equipo Betterware: insights del workshop + visita en calle, perfil de la DS nueva, funnel de 6 etapas, AS-IS vs TO-BE, gap analysis priorizado, rol de canales (WhatsApp ↔ App), 10 iniciativas y roadmap de 3 sprints con KPIs de éxito. EA Lead: Rina Margarita Suarez.",
              available: true,
              type: "doc",
              url: "/Customers/Betterware/files/Betterware%20%E2%80%94%20Entregable%20JTBD%3A%20Insights%2C%20Journey%20%26%20Roadmap.pdf",
            },
            {
              name: "Sprint 3 — Contenido Personalizado con Atribución por Distribuidora",
              description:
                "Documento de arquitectura del Sprint 3: cómo Betterware convierte a cada distribuidora en una creadora de contenido digital con un solo sitio que se transforma en tiempo real. Incluye flujo completo, zonas personalizables de la landing, audiencias activables en Data 360 y atribución directa vs. indirecta.",
              available: true,
              type: "doc",
              url: "/Customers/Betterware/files/Betterware%20%E2%80%94%20Arquitectura%3A%20Contenido%20Personalizado%20con%20Atribuci%C3%B3n%20por%20Distribuidora.pdf",
            },
            {
              name: "Deck Ejecutivo — Inteligencia y Personalización",
              description:
                "Presentación de 14 minutos: el cambio de enfoque de micrositios a un solo sitio personalizado, los 8 pasos del flujo, las 4 zonas de la landing, las audiencias dinámicas de Data 360, atribución 1:1 y fases de despliegue. Misma identidad visual que los demás decks.",
              available: true,
              type: "deck",
              url: "/customer-demos/betterware/deck/sprint-3",
            },
            {
              name: "Aliada Digital — Blueprint Betterware",
              description:
                "Documento maestro del programa Aliada Digital: principio rector, 4 componentes (Agente DS 360, Copiloto Staff 360, Capa de datos, Orquestación proactiva), tópicos del agente con acciones y límites, controles de gobernanza, roadmap 4 fases y MVP recomendado.",
              available: true,
              type: "doc",
              url: "/Customers/Betterware/files/Agentforce-Blueprint.pdf",
            },
            {
              name: "Deck Ejecutivo — Comité Directivo BeFra",
              description:
                "Presentación de 18 minutos para el Comité Directivo: contexto, hallazgos del workshop, principio rector, 4 componentes del Blueprint, MVP, roadmap y próximos pasos. Diseñada con los lineamientos visuales oficiales de Salesforce.",
              available: true,
              type: "deck",
              url: "/customer-demos/betterware/deck/executive",
            },
            {
              name: "Deck Ejecutivo — Jobs To Be Done",
              description:
                "Presentación de 14 minutos centrada en el segundo ejercicio de descubrimiento (JTBD): perfil de la DS Nueva, insights de workshop + visita en calle, funnel de 6 etapas, AS-IS vs TO-BE, gap analysis de 10 jobs, decisión estratégica de canales, 10 iniciativas y roadmap por sprints. Hermana del deck del Comité Directivo, con la misma identidad visual de Salesforce.",
              available: true,
              type: "deck",
              url: "/customer-demos/betterware/deck/jtbd",
            },
            {
              name: "Historia de la DS — Modo Inmersivo (Lupita)",
              description:
                "Recorrido por las 7 escenas del journey de Lupita en su Mes 4: del dolor del workshop a la cohorte que sí se queda, gracias a los 4 componentes del Blueprint trabajando juntos.",
              available: true,
              type: "story",
              url: "/customer-demos/betterware#historia",
            },
            {
              name: "Lupita y la Mamá Virtual — Historia (PDF)",
              description:
                "Documento descargable con la historia completa: persona central, las 7 escenas con canal, componente del Blueprint, productos involucrados e insight de cada escena. Listo para compartir con stakeholders fuera de la sesión ejecutiva.",
              available: true,
              type: "doc",
              url: "/Customers/Betterware/files/Lupita-Historia-del-Cliente.pdf",
            },
            {
              name: "Demo Live — Agente DS 360 en WhatsApp",
              description:
                "Demo en vivo del Tópico 1 (Consulta de pedidos) y Tópico 2 (Saldos) con datos sintéticos de una DS de Tlaquepaque.",
              available: false,
              type: "video",
            },
            {
              name: "Mockup — Copiloto Staff 360 (Cenapia)",
              description:
                "Pantalla del Copiloto interno con perfil DS, comportamiento de consumo y comercial, historial de interacciones, score de churn (Tableau Next) y recomendaciones de atención.",
              available: false,
              type: "mockup",
            },
            {
              name: "Arquitectura de Referencia — Aliada Digital",
              description:
                "Diagrama del System Landscape: ERP, Shopify+, LMS, Kitspay y mensajería integrados con Salesforce + Agentforce + Capa de datos DS 360 + Einstein Trust Layer.",
              available: false,
              type: "arch",
            },
            {
              name: "Catálogo Digital Betterware — Junio",
              description:
                "Catálogo comercial vigente que las Distribuidoras consultan, comparten con sus clientas y usan como guía de venta. Es una de las fuentes oficiales sobre las que el Agente DS 360 hará grounding para explicar productos, precios y promociones.",
              available: true,
              type: "doc",
              url: "/Customers/Betterware/files/Cat Digital JUNIO_FINAL.pdf",
            },
            {
              name: "Oportunidades y Premios — Programa de Incentivos",
              description:
                "Folleto oficial del programa de oportunidades y premios para Distribuidoras. Documento clave para entender las reglas comerciales, beneficios y mecánicas de incentivo que el Agente DS 360 traducirá a lenguaje claro en cada conversación.",
              available: true,
              type: "doc",
              url: "/Customers/Betterware/files/Oportunidaddes_Premios_01_26_17_MB_1.pdf",
            },
          ],
        },
      },
    ],
    translations: {
      en: {
        title: "Digital Ally — Resolve, accompany and grow every Distributor",
        description:
          "Digital Ally — an agentic ecosystem that knows, guides and grows every one of Betterware's 1.24M Independent Distributors. The roadmap to move from reactive, fragmented support to intelligent, proactive and personalized companionship, built on Agentforce, Service Cloud, Data Cloud and Marketing Cloud.",
        industry: "Retail / Consumer Goods — Direct Selling",
        tabs: [
          { id: "overview", label: "Overview", title: "Executive summary", content: "Betterware (NASDAQ: BWMX, today BeFra) operates Mexico's largest direct-selling ecosystem: 1.24M Associates and Distributors reaching 8M households. The Antiexperience Workshop revealed that the worst experience for a DS is not just an operational problem — it is not knowing who to turn to, getting confusing information, depending on others to resolve. Digital Ally proposes an ecosystem with four components — DS 360 Agent, Staff 360 Copilot, DS 360 data layer and proactive orchestration — that evolve Betterware from reactive support to a proactive, personalized and measurable companionship model." },
          { id: "customer", label: "Client / industry", title: "Client and industry", content: "Betterware de México is the first Mexican company directly listed on NASDAQ (2020). Under parent BeFra it runs two brands: Betterware (home organization) and JAFRA Cosmetics, acquired in 2022 from Vorwerk for US$255M. Its two-tier direct sales model — Distributor leader + Associate seller — is the engine: biweekly cycles with average ticket of $2,158 MXN (BW) and $2,439 MXN (JAFRA) per Associate." },
          { id: "context", label: "Context", title: "5 critical problems identified", content: "The Blueprint identifies five structural problems that explain why the DS experience breaks today. Each one has associated pains and they all converge on the same conclusion: the DS ends up depending on people, waiting for answers, and feeling that the company does not understand her role." },
          { id: "objective", label: "Objective", title: "Transform the Distributor's experience into autonomy, growth and first-contact resolution.", content: "Move from a reactive, fragmented and human-dependent support model to an intelligent, proactive, personalized and self-service model." },
          { id: "workshop", label: "Workshop", title: "Antiexperience Workshop result", content: "On May 29, 2026, five Betterware teams worked on parallel boards: the first to define the worst possible experience for a DS, the second to design agents to invert it. The result below is the discovery input on which the Blueprint proposed in the next section was built." },
          { id: "jtbd", label: "Jobs To Be Done", title: "Jobs To Be Done — Insights, Journey & Roadmap", content: "Second discovery exercise, complementary to the Antiexperience Workshop. Built from the JTBD session (May 14, 2026), field notes from real distributor visits, and the team's AS-IS / TO-BE mapping. Focus: the new Distributor — her jobs, emotions and real channels — translated into a 6-stage funnel, 10 prioritized jobs and 10 initiatives with a sprint roadmap." },
          { id: "sprint-3", label: "Intelligence & Personalization", title: "Intelligence & Personalization", content: "The natural continuation of the JTBD roadmap. Betterware turns each distributor into a digital influencer with her own storefront — without creating thousands of pages. One landing, one unique link per distributor, real-time identity rendering, and 1:1 attribution between every order and the distributor who generated it." },
          { id: "solution", label: "Solution", title: "Digital Ally — An ecosystem that knows, guides and resolves", content: "Digital Ally is not a chatbot. It is an intelligent system with four components that work together on a reliable data layer and under explicit governance controls. Below: the guiding principle, four components, agent topics design and trust layer. Validated against the 10 Jobs to Be Done identified — see the JTBD tab." },
          { id: "arquitectura", label: "Architecture", title: "System Landscape — Betterware (BeFra)", content: "Tech ecosystem view supporting the Blueprint: external direct-selling systems, integration layer, Salesforce products, and Einstein Trust Layer foundation." },
          { id: "roadmap", label: "Roadmap", title: "MVP and evolution roadmap", content: "The MVP should not try to solve all use cases from day one. It focuses on the highest-pain, highest-value point — Resolve in First Contact — and from there evolves across four phases toward a complete predictive intelligence and commercial optimization system." },
          { id: "historia", label: "Story", title: "Lupita and the Virtual Mom", content: "Lupita Hernández is 38, lives in Tlaquepaque, and joined Betterware 4 months ago — at the heart of the critical 6-month journey. This is the story of how, in a single hectic day, the Blueprint's agentic ecosystem held her up — and turned a DS on the verge of giving up into a growing leader." },
          { id: "assets", label: "Assets", title: "Solution assets", content: "Materials that support the conversation with Betterware — from the workshop input to the proposed blueprint and the executive deck." },
        ],
      },
      pt: {
        title: "Aliada Digital — Resolver, acompanhar e fazer crescer cada Distribuidora",
        description:
          "Aliada Digital — um ecossistema agêntico que conhece, orienta e faz crescer cada uma das 1,24M de Distribuidoras Independentes da Betterware. O roteiro para passar de um suporte reativo e fragmentado para um acompanhamento inteligente, proativo e personalizado, construído sobre Agentforce, Service Cloud, Data Cloud e Marketing Cloud.",
        industry: "Varejo / Bens de Consumo — Venda Direta",
        tabs: [
          { id: "overview", label: "Overview", title: "Resumo executivo", content: "A Betterware (NASDAQ: BWMX, hoje BeFra) opera o maior ecossistema de venda direta do México: 1,24M de Associadas e Distribuidoras que alcançam 8M de lares. O Antiexperience Workshop revelou que a pior experiência para uma DS não é apenas ter um problema operacional — é não saber a quem recorrer, receber informação confusa, depender de terceiros para resolver. Aliada Digital propõe um ecossistema com quatro componentes — Agente DS 360, Copiloto Staff 360, Camada de dados DS 360 e Orquestração proativa — que evoluem a Betterware de um modelo de suporte reativo para um acompanhamento proativo, personalizado e mensurável." },
          { id: "customer", label: "Cliente / indústria", title: "Cliente e indústria", content: "A Betterware de México é a primeira empresa mexicana com listagem direta na NASDAQ (2020). Sob a holding BeFra opera duas marcas: Betterware (organização do lar) e JAFRA Cosmetics, adquirida em 2022 da Vorwerk por US$255M. Seu modelo de venda direta de dois níveis — Distribuidora líder + Associada vendedora — é o motor: ciclos quinzenais com ticket médio de $2.158 MXN (BW) e $2.439 MXN (JAFRA) por Associada." },
          { id: "context", label: "Contexto", title: "5 problemas críticos identificados", content: "O Blueprint identifica cinco problemas estruturais que explicam por que a experiência da DS se quebra hoje. Cada um tem dores associadas e todos convergem para a mesma conclusão: a DS acaba dependendo de pessoas, esperando respostas, e sentindo que a empresa não entende seu papel." },
          { id: "objective", label: "Objetivo", title: "Transformar a experiência da Distribuidora em autonomia, crescimento e resolução em primeiro contato.", content: "Sair de um modelo reativo, fragmentado e dependente de suporte humano para um modelo inteligente, proativo, personalizado e de autoatendimento." },
          { id: "workshop", label: "Workshop", title: "Resultado do Antiexperience Workshop", content: "Em 29 de maio de 2026, cinco times da Betterware trabalharam em quadros paralelos: o primeiro para definir a pior experiência possível para uma DS, o segundo para desenhar agentes que a invertam. O resultado a seguir é o insumo de descoberta sobre o qual o Blueprint proposto na seção seguinte foi construído." },
          { id: "jtbd", label: "Jobs To Be Done", title: "Jobs To Be Done — Insights, Journey & Roadmap", content: "Segundo exercício de descoberta, complementar ao Antiexperience Workshop. Construído a partir da sessão JTBD (14-mai-2026), notas de campo de visitas a Distribuidoras reais e o mapeamento AS-IS / TO-BE da equipe. Foco: a Distribuidora Nova — seus jobs, emoções e canais reais — traduzidos em um funil de 6 etapas, 10 jobs priorizados e 10 iniciativas com roadmap por sprints." },
          { id: "sprint-3", label: "Inteligência e Personalização", title: "Inteligência e Personalização", content: "A continuação natural do roadmap do JTBD. A Betterware transforma cada distribuidora em uma influenciadora digital com sua própria vitrine — sem criar milhares de páginas. Uma landing única, um link exclusivo por distribuidora, identidade renderizada em tempo real e atribuição 1:1 entre cada pedido e a distribuidora que o gerou." },
          { id: "solution", label: "Solução", title: "Aliada Digital — Um ecossistema que conhece, orienta e resolve", content: "Aliada Digital não é um chatbot. É um sistema inteligente com quatro componentes que trabalham juntos sobre uma camada de dados confiável e sob controles explícitos de governança. A seguir: o princípio reitor, os quatro componentes, o desenho de tópicos do agente e a camada de confiança. Validado contra os 10 Jobs to Be Done identificados — ver a aba JTBD." },
          { id: "arquitectura", label: "Arquitetura", title: "System Landscape — Betterware (BeFra)", content: "Visão do ecossistema tecnológico que suporta o Blueprint: sistemas externos do modelo de venda direta, camada de integração, produtos Salesforce e fundação Einstein Trust Layer." },
          { id: "roadmap", label: "Roadmap", title: "MVP e roteiro de evolução", content: "O MVP não deve tentar resolver todos os casos de uso desde o início. Foca-se no ponto de maior dor e maior valor — Resolver em Primeiro Contato — e a partir daí evolui em quatro fases até um sistema completo de inteligência preditiva e otimização comercial." },
          { id: "historia", label: "História", title: "Lupita e a Mamãe Virtual", content: "Lupita Hernández tem 38 anos, mora em Tlaquepaque e entrou na Betterware há 4 meses — no coração da jornada crítica de 6 meses. Esta é a história de como, em um único dia complicado, o ecossistema agêntico do Blueprint a sustentou — e transformou uma DS prestes a desistir em uma líder em crescimento." },
          { id: "assets", label: "Ativos", title: "Ativos da solução", content: "Materiais que apoiam a conversa com a Betterware — desde o insumo do workshop até o blueprint proposto e o deck executivo." },
        ],
      },
    },
  },
];
