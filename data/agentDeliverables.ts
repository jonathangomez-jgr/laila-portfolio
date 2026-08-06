export type DeliverableStat = {
  value: string;
  label: string;
  helper?: string;
};

export type DeliverableCallout = {
  variant: "info" | "warn" | "success" | "critical";
  title: string;
  body: string;
};

export type BusinessMetric = {
  name: string;
  baseline: string;
  target: string;
  window: string;
  color: "indigo" | "violet" | "sky" | "emerald" | "amber" | "rose";
};

export type ContextSection = {
  intro: string;
  problem: string;
  scope: string;
  stats: DeliverableStat[];
  metrics: BusinessMetric[];
  callouts?: DeliverableCallout[];
};

export type ConceptCard = {
  order: number;
  name: string;
  definition: string;
  usage: string;
  sourceLabel: string;
  sourceUrl: string;
};

export type AgentField = {
  label: string;
  value: string;
  copyable?: boolean;
  monospace?: boolean;
  href?: string;
};

export type PermissionSetRow = {
  name: string;
  type: "Regular" | "Group" | "Standard" | "Profile-based";
  license?: string;
  purpose: string;
};

export type TopicRow = {
  name: string;
  label: string;
  requiresVerification: boolean;
  actions: string[];
  description: string;
};

export type SystemRule = {
  category: string;
  rules: string[];
};

export type ScreenshotPlaceholder = {
  id: string;
  caption: string;
  navigationPath: string;
  aspect?: "wide" | "tall" | "square";
  imageUrl?: string;
};

export type GrowthStatement = {
  eyebrow: string;
  headline: string;
  body: string;
  pillars: {
    title: string;
    description: string;
  }[];
  closing: string;
};

export type AgentSpecSection = {
  identity: AgentField[];
  botUser: AgentField[];
  permissionSets: PermissionSetRow[];
  permissionSetLicenses: string[];
  voiceConfig: AgentField[];
  topics: TopicRow[];
  knowledge: AgentField[];
  guardrails: SystemRule[];
  screenshots: ScreenshotPlaceholder[];
  growthStatement?: GrowthStatement;
};

export type QuestionCategory = {
  name: string;
  intent:
    | "informative"
    | "verification"
    | "escalation"
    | "off-topic"
    | "prompt-injection"
    | "hallucination-guard";
  color: "indigo" | "violet" | "sky" | "emerald" | "amber" | "rose";
  description: string;
  questions: {
    prompt: string;
    expected: string;
  }[];
};

export type ProductionStep = {
  order: number;
  phase: string;
  title: string;
  description: string;
  owner: "Partner de Salesforce" | "Cliente" | "Ambos";
  status: "critical" | "recommended" | "optional";
};

export type ProductionSection = {
  intro: string;
  steps: ProductionStep[];
  rollback: string;
  monitoring: string[];
};

export type NextUseCase = {
  key: string;
  order: number;
  name: string;
  headline: string;
  description: string;
  valueImpact: "alto" | "medio" | "bajo";
  effort: "alto" | "medio" | "bajo";
  timeline: string;
  dependencies: string[];
  kpi: string;
};

export type AppendixSection = {
  intro: string;
  pdfName: string;
  pdfUrl: string;
  disclaimer: string;
};

export type DeliverableTab = {
  id: string;
  label: string;
  section: string;
  title: string;
  intro?: string;
  content?: string;
  contextData?: ContextSection;
  conceptCards?: ConceptCard[];
  agentSpec?: AgentSpecSection;
  questionCategories?: QuestionCategory[];
  productionData?: ProductionSection;
  nextUseCases?: NextUseCase[];
  appendix?: AppendixSection;
};

export type AgentDeliverable = {
  slug: string;
  title: string;
  subtitle: string;
  customerName: string;
  customerLogo?: string;
  agentName: string;
  agentId: string;
  environment: string;
  version: string;
  publishedAt: string;
  preparedBy: {
    name: string;
    role: string;
    email: string;
  };
  testPhone?: {
    number: string;
    display: string;
    label?: string;
    helper?: string;
  };
  tabs: DeliverableTab[];
};
