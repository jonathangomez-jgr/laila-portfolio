import type { PortalUser, PortalRole } from "@/lib/portalAuth";

type DocEntry = {
  slug: string;
  label: string;
  description: string;
  url: string;
  category: "Ejecutivo" | "Técnico" | "Arquitectura" | "Pilot";
  icon: string;
  visibleTo: readonly PortalRole[];
};

const DOCS: DocEntry[] = [
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
    description: "16 hallazgos del agente actual, verificados contra la org.",
    url: "/Customers/Betterware/files/BW_AGENT_N%20%E2%80%94%20Reporte%20de%20descubrimientos.pdf",
    category: "Técnico",
    icon: "🧪",
    visibleTo: ["Salesforce", "Partner"],
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
    description: "Arquitectura actual del stack conversacional de Betterware.",
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

const CATEGORY_ORDER: DocEntry["category"][] = [
  "Pilot",
  "Ejecutivo",
  "Arquitectura",
  "Técnico",
];

export default function DocumentosTab({
  slug: _slug,
  user,
}: {
  slug: string;
  user: PortalUser;
}) {
  void _slug;
  const visible = DOCS.filter((d) => d.visibleTo.includes(user.role));

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
          Documentos del proyecto
        </p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          Material compartible
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          {user.role === "Client"
            ? "Documentos ejecutivos y del Programa Insiders. Hacé click en cualquier card para abrirlo."
            : "Material ejecutivo, técnico y de arquitectura. Hacé click en cualquier card para abrirlo."}
        </p>
      </div>

      {CATEGORY_ORDER.map((cat) => {
        const items = visible.filter((d) => d.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat}>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              {cat}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((d) => (
                <a
                  key={d.slug}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-md"
                >
                  <div className="text-2xl">{d.icon}</div>
                  <p className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                    {d.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">{d.description}</p>
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
