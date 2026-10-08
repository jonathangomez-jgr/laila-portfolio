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
    slug: "reporte-observaciones",
    label: "Reporte de observaciones · Betterware",
    description:
      "Tracker consolidado: 40 ajustes pendientes (24 observaciones técnicas + 16 de plataforma) y 136 modificaciones (82% cerradas).",
    url: "/Customers/Betterware/files/Reporte_Observaciones_Betterware.pdf",
    category: "Ejecutivo",
    icon: "📊",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "reporte-cobertura-v42",
    label: "Cobertura V42 en el agente nuevo",
    description:
      "Punto por punto de los 17 cambios liberados en V42 entre 29-sep y 07-oct, con el estado de cada uno en Betty V2. Cobertura 100%.",
    url: "/Customers/Betterware/files/Reporte_Cobertura_Cambios_V42.pdf",
    category: "Ejecutivo",
    icon: "🔄",
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
