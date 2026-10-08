// ============================================================================
// Project document lookup · generic by slug
// Replaces the hardcoded DOCS array in DocumentosTab.
// Adding a new project = new entry in DOCS_BY_SLUG; zero code changes elsewhere.
// ============================================================================

import type { PortalRole } from "@/lib/portalAuth";

export type DocEntry = {
  slug: string;
  label: string;
  description: string;
  url: string;
  category: "Ejecutivo" | "Técnico" | "Arquitectura" | "Pilot";
  icon: string;
  visibleTo: readonly PortalRole[];
};

export type DocCategory = DocEntry["category"];

export const CATEGORY_ORDER: DocCategory[] = [
  "Pilot",
  "Ejecutivo",
  "Arquitectura",
  "Técnico",
];

// ----------------------------------------------------------------------------
// Betterware docs
// ----------------------------------------------------------------------------
const BETTERWARE_DOCS: DocEntry[] = [
  {
    slug: "presentacion-kickoff",
    label: "Presentación · Kick-off CS (compartida con Jafra)",
    description:
      "Deck del kick-off ejecutivo del martes 2026-10-07. Compartido Betterware + Jafra. Squad Salesforce + Partner Capptus, organigrama y timeline conjunto del piloto.",
    url: "/Customers/Betterware/files/Presentacion_Kickoff_Betterware.html",
    category: "Ejecutivo",
    icon: "🎤",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "programa-insiders",
    label: "Programa Insiders · Betty",
    description:
      "Narrativa del pilot con 15–25 distribuidores. Cutover 2026-10-16. Tono business.",
    url: "/Customers/Betterware/files/Programa_Insiders_Betty.html",
    category: "Pilot",
    icon: "📘",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "presentacion-partner",
    label: "Presentación · Partner + Betterware",
    description: "Deck del kickoff. 10 slides. Horizontal.",
    url: "/Customers/Betterware/files/Presentacion_Partner_FDE.html",
    category: "Ejecutivo",
    icon: "🎯",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "presentacion-demo",
    label: "Demo · Betterware",
    description: "Deck de demo end-to-end. 10 slides. Horizontal.",
    url: "/Customers/Betterware/files/Presentacion_Demo_Betterware.html",
    category: "Ejecutivo",
    icon: "🎥",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "estrategia-recomendada",
    label: "Estrategia FDE recomendada",
    description: "Resumen del plan de ejecución y decisiones de diseño.",
    url: "/Customers/Betterware/files/FDE_Estrategia_Recomendada.html",
    category: "Ejecutivo",
    icon: "🧭",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "reporte-descubrimientos",
    label: "Reporte de descubrimientos · BW_AGENT_N",
    description:
      "16 hallazgos del agente actual, verificados contra la org.",
    url: "/Customers/Betterware/files/BW_AGENT_N%20%E2%80%94%20Reporte%20de%20descubrimientos.pdf",
    category: "Técnico",
    icon: "🧪",
    visibleTo: ["Salesforce", "Partner"],
  },
  {
    slug: "reporte-remediaciones",
    label: "Reporte de remediaciones · Betty",
    description:
      "Avance del audit: 7 resueltos en V42 producción, 10 completados en V2, 25 fixes nuevos, 6 al roadmap.",
    url: "/Customers/Betterware/files/Reporte_Remediaciones_Betty.pdf",
    category: "Ejecutivo",
    icon: "✅",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "agent-deep-dive",
    label: "BW_AGENT_N · Agent Deep Dive (sesión 2)",
    description: "Workshop técnico sobre el agente actual.",
    url: "/Customers/Betterware/BW_AGENT_N-Agent-Deep-Dive-Sesion-2.pdf",
    category: "Técnico",
    icon: "🔬",
    visibleTo: ["Salesforce", "Partner"],
  },
  {
    slug: "befra-to-be",
    label: "Befra Architecture · To-Be V1",
    description:
      "Arquitectura target del stack conversacional (WhatsApp · Agentforce · Data Cloud · backend).",
    url: "/Customers/Betterware/files/Befra%20%28Betterware%29%20Architecture%20VF%20-%20To%20Be%20V1.pdf",
    category: "Arquitectura",
    icon: "🏛️",
    visibleTo: ["Salesforce", "Partner"],
  },
  {
    slug: "befra-as-is",
    label: "Befra Architecture · As-Is",
    description:
      "Arquitectura actual del stack conversacional de Betterware.",
    url: "/Customers/Betterware/files/Befra%20%28Betterware%29%20Architecture%20VF%20-%20As%20Is.pdf",
    category: "Arquitectura",
    icon: "🏗️",
    visibleTo: ["Salesforce", "Partner"],
  },
  {
    slug: "contenido-personalizado",
    label: "Arquitectura · Contenido personalizado",
    description:
      "Atribución por distribuidora para contenido personalizado.",
    url: "/Customers/Betterware/files/Betterware%20%E2%80%94%20Arquitectura%3A%20Contenido%20Personalizado%20con%20Atribuci%C3%B3n%20por%20Distribuidora.pdf",
    category: "Arquitectura",
    icon: "🎨",
    visibleTo: ["Salesforce", "Partner"],
  },
  {
    slug: "jtbd-entregable",
    label: "Entregable JTBD · Insights, Journey & Roadmap",
    description: "Jobs-to-be-done, insights y roadmap.",
    url: "/Customers/Betterware/files/Betterware%20%E2%80%94%20Entregable%20JTBD%3A%20Insights%2C%20Journey%20%26%20Roadmap.pdf",
    category: "Ejecutivo",
    icon: "🗺️",
    visibleTo: ["Salesforce", "Partner"],
  },
  {
    slug: "antiexperience",
    label: "Antiexperience Workshop · Betterware",
    description: "Workshop de experiencias que NO queremos replicar.",
    url: "/Customers/Betterware/files/Antiexperience%20Workshop%20%E2%80%94%20Betterware.pdf",
    category: "Técnico",
    icon: "🧯",
    visibleTo: ["Salesforce", "Partner"],
  },
];

// ----------------------------------------------------------------------------
// Jafra · Janet v2 docs
// ----------------------------------------------------------------------------
const JAFRA_DOCS: DocEntry[] = [
  {
    slug: "presentacion-kickoff",
    label: "Presentación · Kick-off (compartida con Betterware)",
    description:
      "Deck del kick-off ejecutivo del martes 2026-10-07. Compartido Jafra + Betterware. Squad Salesforce + Partner Capptus, organigrama y timeline conjunto.",
    url: "/Customers/Betterware/files/Presentacion_Kickoff_Betterware.html",
    category: "Ejecutivo",
    icon: "🎤",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "conociendo-agente",
    label: "Conociendo a Janet · agente actual",
    description:
      "Documento interno con la ficha del agente Jafra_Agentforce en producción. Tono comercial.",
    url: "/Customers/Jafra/files/Conociendo-a-nuestro-agente.html",
    category: "Ejecutivo",
    icon: "📘",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
];

// ----------------------------------------------------------------------------
// Lookup
// ----------------------------------------------------------------------------
const DOCS_BY_SLUG: Record<string, DocEntry[]> = {
  betterware: BETTERWARE_DOCS,
  jafra: JAFRA_DOCS,
};

export function getDocsForSlug(slug: string): DocEntry[] {
  return DOCS_BY_SLUG[slug] ?? [];
}

// Overview tab uses "key docs" — a role-filtered subset (first 3 of each project).
export function getKeyDocsForSlug(slug: string, role: PortalRole): DocEntry[] {
  return getDocsForSlug(slug)
    .filter((d) => d.visibleTo.includes(role))
    .slice(0, 3);
}
