"use client";

import { useState } from "react";
import ArgosArchFullscreen from "./ArgosArchFullscreen";

/* ─── Salesforce brand palette (from Corporate Template 2026) ─── */
const SF = {
  // Electric Blues
  eb15: "#001E5B",
  eb30: "#022AC0",
  eb50: "#066AFE",
  // Cloud Blues
  cb68: "#00B3FF",
  cb80: "#90D0FE",
  cb95: "#EAF5FE",
  // Teal  (P3 · Integración)
  teal20: "#023434",
  teal60: "#06A59A",
  teal80: "#04E1CB",
  teal95: "#DEF9F3",
  // Violet (P2 · Segmentación)
  violet20: "#481A54",
  violet30: "#730394",
  violet65: "#D17DFE",
  violet95: "#F9F0FF",
  // Yellow (MuleSoft)
  yellow20: "#4F2100",
  yellow70: "#E4A201",
  yellow80: "#FCC003",
  yellow95: "#FBF3E0",
  // Red (gaps)
  red: "#C23934",
  redLight: "#FFBAB8",
  // Neutrals
  white: "#FFFFFF",
  gray95: "#F3F3F3",
};

/* ─── Pillar color tokens ─── */
type PillarKey = "P1" | "P2" | "P3" | "ALL";

const PC: Record<PillarKey, {
  badge: string; badgeText: string;
  nodeBg: string; nodeBorder: string; nodeHover: string;
  dot: string; label: string; bodyText: string;
  zoneBg: string; zoneBorder: string; zoneLabel: string;
}> = {
  P1: {
    badge: SF.eb30,         badgeText: SF.white,
    nodeBg: SF.eb15,        nodeBorder: SF.eb50,     nodeHover: SF.eb30,
    dot: SF.cb68,           label: SF.cb80,          bodyText: SF.cb95,
    zoneBg: SF.eb15,        zoneBorder: SF.eb50,     zoneLabel: SF.cb80,
  },
  P2: {
    badge: SF.violet30,     badgeText: SF.white,
    nodeBg: SF.violet20,    nodeBorder: SF.violet65, nodeHover: SF.violet30,
    dot: SF.violet65,       label: SF.violet65,      bodyText: SF.violet95,
    zoneBg: SF.violet20,    zoneBorder: SF.violet65, zoneLabel: SF.violet65,
  },
  P3: {
    badge: SF.teal20,       badgeText: SF.teal80,
    nodeBg: SF.teal20,      nodeBorder: SF.teal60,   nodeHover: "#034040",
    dot: SF.teal80,         label: SF.teal80,        bodyText: SF.teal95,
    zoneBg: SF.teal20,      zoneBorder: SF.teal60,   zoneLabel: SF.teal80,
  },
  ALL: {
    badge: "#014D40",       badgeText: SF.teal80,
    nodeBg: "#012E28",      nodeBorder: SF.teal60,   nodeHover: "#014D40",
    dot: SF.teal80,         label: SF.teal80,        bodyText: SF.teal95,
    zoneBg: "#012E28",      zoneBorder: SF.teal60,   zoneLabel: SF.teal95,
  },
};

/* ─── Node type ─── */
type ArchNode = {
  id: string;
  name: string;
  subtitle: string;
  pillars: PillarKey[];
  description: string;
  bullets?: string[];
  gap?: string;
};

/* ─── Data ─── */
const CHANNELS: ArchNode[] = [
  { id: "whatsapp",       name: "WhatsApp Business",   subtitle: "Línea única + Agente autónomo",  pillars: ["P3"], description: "Reemplaza las múltiples líneas actuales con una sola línea gestionada por Agentforce. Clasifica intención (pedido, PQR, fidelización) y escala a humano cuando lo requiere.", bullets: ["1 línea unificada gestionada por IA","Clasificación automática de intención","Escalada inteligente a humano"] },
  { id: "argos-one-ch",   name: "Argos ONE",            subtitle: "E-commerce / portal clientes",    pillars: ["P3"], description: "Toda la actividad digital del cliente en Argos ONE se sincroniza en tiempo real al CRM vía MuleSoft. Cierra la brecha de visibilidad más crítica.", bullets: ["Actividad digital → perfil CRM en tiempo real","Cotizaciones no completadas visibles al asesor","Integración vía MuleSoft API-Led"] },
  { id: "sf-mobile",      name: "Salesforce Mobile",   subtitle: "Asesores en campo",              pillars: ["P1"], description: "App móvil con funcionalidad offline: Vista 360, Voice-to-Form, plan de visitas integrado con Maps, cotizaciones y alertas RADAR.", bullets: ["Vista 360 del cliente con pedido sugerido","Voice-to-Form: registro de visita por voz","Offline con sincronización automática","Alertas RADAR en tiempo real"] },
  { id: "contact-center", name: "Contact Center",       subtitle: "Konecta / BTO",                  pillars: ["P3"], description: "El equipo de Konecta y BTO atiende desde una consola unificada de Service Cloud. PQRs de bajo nivel resueltas automáticamente por Agentforce.", bullets: ["Consola unificada Service Cloud","PQRs básicos → Agentforce autónomo","Escalada con historial completo"] },
  { id: "rrss",           name: "Redes Sociales",       subtitle: "Facebook · Instagram · TikTok",  pillars: ["P2"], description: "Integradas con Marketing Cloud Social Studio. Menciones y mensajes entran a cola unificada. Agentforce responde consultas estándar.", bullets: ["Cola unificada multicanal","Respuesta automática a consultas estándar","Escalada reputacional a corporativo"] },
  { id: "web-form",       name: "Web / Formularios",    subtitle: "Argos.co",                        pillars: ["P3"], description: "Formularios crean automáticamente candidatos en Sales Cloud o casos en Service Cloud. Marketing Cloud captura leads para journeys.", bullets: ["Web-to-Lead automático → Sales Cloud","Web-to-Case → Service Cloud","Captura de leads para journeys Marketing Cloud"] },
];

const SF_ALL: ArchNode[] = [
  { id: "agentforce", name: "Agentforce", subtitle: "IA agéntica autónoma · P1 + P2 + P3", pillars: ["ALL"], description: "Motor de agentes autónomos que ejecuta tareas end-to-end: crea oportunidades (SDR), gestiona pedidos por WhatsApp, clasifica PQRs, dispara Machine Sellers y genera resúmenes ejecutivos.", bullets: ["SDR: ingesta automática de oportunidades (Galería, Secop)","Agente de servicio: PQR y pedidos por WhatsApp","Agente de marketing: Machine Sellers automatizado","Resumen ejecutivo semanal para dirección","Notificaciones proactivas RADAR al asesor correcto"] },
  { id: "einstein",   name: "Einstein AI",   subtitle: "Inteligencia predictiva · P1 + P2",   pillars: ["P1", "P2"], description: "Alimenta la Vista 360 con: pedido sugerido (rotación histórica), score RADAR de riesgo de fuga (0–100), correlaciones de venta cruzada y probabilidad de cierre.", bullets: ["RADAR: score de riesgo de fuga 0–100","Pedido sugerido basado en rotación histórica","Correlaciones de venta cruzada (Machine Sellers)","Probabilidad de cierre de oportunidades"] },
];

const SF_P1: ArchNode[] = [
  { id: "sales-cloud",    name: "Sales Cloud",        subtitle: "Núcleo comercial",               pillars: ["P1"], description: "Gestiona el ciclo de venta completo: oportunidades industriales y masivas, cotizaciones multi-producto, gestión de obras con alertas de finalización y Vista 360.", bullets: ["Pipeline industrial y canal masivo","Cotización multi-producto (cemento, concreto, agregados)","Vista 360 con pedido sugerido Einstein","Gestión de obras con alertas de finalización","Funnel de conversión con métricas completas"] },
  { id: "sf-maps",        name: "Salesforce Maps",    subtitle: "Visitas inteligentes",            pillars: ["P1"], description: "Optimización de rutas por ciclos de visita. Voice-to-Form. Alertas de clientes no visitados en 15/30 días. Capacidad offline completa.", bullets: ["Rutas optimizadas por territorio y riesgo","Ciclos de visita configurables por gerencia","Voice-to-Form: registro de visita por voz","Alertas de clientes no visitados"] },
  { id: "crm-analytics",  name: "CRM Analytics",     subtitle: "Dashboards en tiempo real",       pillars: ["P1"], description: "Reemplaza los reportes Excel manuales. Dashboards por nivel jerárquico: asesor, jefe de zona, director. Resumen ejecutivo semanal generado por Agentforce.", bullets: ["Dashboards en tiempo real por nivel jerárquico","Reporte diario de ventas (elimina Excel)","Seguimiento de rigor comercial (up-rigor)","Analítica de Trade Marketing y ROI"] },
  { id: "slack",          name: "Slack",              subtitle: "Hub de comunicación comercial",   pillars: ["P1"], description: "Reemplaza grupos de WhatsApp internos. Recibe notificaciones automáticas de Agentforce: alertas RADAR, oportunidades creadas, aprobaciones de descuento.", bullets: ["Reemplaza grupos WhatsApp internos","Alertas RADAR en tiempo real","Aprobaciones de descuento y crédito","Resúmenes de visita automáticos"] },
];

const SF_P2: ArchNode[] = [
  { id: "mkt-cloud",   name: "Marketing Cloud",  subtitle: "Fidelización y campañas",            pillars: ["P2"], description: "Journeys automatizados por segmento: Argos Amigos, Machine Sellers, Trade Marketing. Sincronización con Data Cloud para microsegmentación.", bullets: ["Journey Builder por perfil y comportamiento","Argos Amigos — fidelización multicanal","Machine Sellers: venta cruzada automatizada","Trade Marketing: acciones, inversión y ROI","Reactivación automática de clientes inactivos"] },
  { id: "data-cloud",  name: "Data Cloud",        subtitle: "Perfil unificado · Microsegmentación", pillars: ["P2"], description: "Unifica CRM, Argos ONE, Gluki, Brevo y Tableau en un perfil único. Habilita microsegmentos de alta resolución: ferreterías A/B/C, constructoras por tipo.", bullets: ["Perfil 360° unificado del cliente","Microsegmentación: ferreterías por tamaño y producto","Activación de segmentos en Marketing Cloud","Trazabilidad inversión marketing → venta (ROI)"] },
];

const SF_P3: ArchNode[] = [
  { id: "service-cloud", name: "Service Cloud", subtitle: "Servicio omnicanal", pillars: ["P3"], description: "Gestión unificada de PQRs desde todos los canales en una sola cola con SLAs por tipología. Liberación de pedidos digitalizada. CSAT automático.", bullets: ["Omni-Channel: todos los canales en una cola","PQR automatizado con clasificación inteligente","SLAs con alertas de incumplimiento","Liberación de pedidos digitalizada (elimina fotos WhatsApp)","Encuesta CSAT automática post-cierre"] },
];

const MULESOFT: ArchNode[] = [
  { id: "ms-sap",       name: "SAP ↔ Salesforce",          subtitle: "Inventario y crédito en tiempo real", pillars: ["P3"], description: "Bidireccional. El asesor consulta inventario por planta, crédito y capacidad de producción. Los pedidos confirmados se convierten automáticamente en órdenes SAP.",         bullets: ["SAP → SF: Inventario por planta en tiempo real","SAP → SF: Crédito y cupo disponible","SF → SAP: Pedidos confirmados → Órdenes de venta"], gap: "Sin integración en tiempo real — brecha crítica P3" },
  { id: "ms-argosone",  name: "Argos ONE ↔ Salesforce",    subtitle: "Actividad digital → CRM",             pillars: ["P3"], description: "Sincroniza en tiempo real la actividad digital del cliente en Argos ONE al perfil en Sales Cloud y Data Cloud.",                                                        bullets: ["Argos ONE → SF: Cotizaciones no completadas","Argos ONE → SF: Pedidos digitales","SF → Argos ONE: Precios personalizados"], gap: "Actividad digital invisible en CRM — brecha crítica P3" },
  { id: "ms-gluki",     name: "Gluki ↔ Salesforce",        subtitle: "Puntos y fidelización",               pillars: ["P2"], description: "Acredita puntos automáticamente al cerrar un pedido y personaliza campañas según el tier del cliente en Argos Amigos.",                                            bullets: ["SF → Gluki: Pedido cerrado → acreditar puntos","Gluki → SF: Saldo y tier en tiempo real","Gluki → SF: Historial de canjes"] },
  { id: "ms-tableau",   name: "Tableau ↔ CRM Analytics",   subtitle: "RADAR y precios → CRM",               pillars: ["P1"], description: "El RADAR de clientes en riesgo (hoy aislado en Tableau) se integra con CRM Analytics y el perfil del cliente como alerta accionable con Agentforce.",          bullets: ["Tableau → SF: Score RADAR de riesgo","Tableau → SF: Precios de competencia por zona","SF → Tableau: Datos de gestión comercial"] },
  { id: "wa-api",       name: "WhatsApp Business API",     subtitle: "Mensajería ↔ Service Cloud",           pillars: ["P3"], description: "La API oficial conecta con Service Cloud Omni-Channel. Todos los mensajes entran a la misma cola. Agentforce atiende; casos complejos escalan con historial.",  bullets: ["WA → SF: Mensajes → cola Service Cloud","SF → WA: Respuestas y notificaciones proactivas","SF → WA: Alertas de entrega y documentos"] },
];

const EXTERNAL: ArchNode[] = [
  { id: "sap",      name: "SAP ERP",                subtitle: "Sistema de registro central",       pillars: ["P3"], description: "ERP central. Gestiona inventarios por planta (Nare, Yumbo, Rioclaro), órdenes de venta (OTC), crédito por cliente, producción y logística.", bullets: ["Inventario y almacén (WM)","Órdenes de venta (SD)","Crédito y finanzas (FI)","Producción (PP) · Logística (LE)"], gap: "Sin integración en tiempo real — brecha crítica P3" },
  { id: "argos1",   name: "Argos ONE",              subtitle: "Portal e-commerce propio",          pillars: ["P3"], description: "Portal de autogestión. Genera el 40%+ de las ventas digitales. Hoy invisible para Servicio al Cliente y asesores en Salesforce.", bullets: ["40%+ de las ventas digitales","Cotizaciones, pedidos, historial","Completamente invisible en CRM actualmente"], gap: "Actividad digital invisible en Salesforce — brecha crítica P3" },
  { id: "gluki",    name: "Gluki",                  subtitle: "Programa Argos Amigos",             pillars: ["P2"], description: "Sistema externo de fidelización: puntos por compra, canje de recompensas, lealtad a distribuidores, dependientes y maestros de obra.", bullets: ["Lealtad a clientes distribuidores","Lealtad a dependientes (vendedores)","Lealtad a maestros de obra"] },
  { id: "tableau",  name: "Tableau",                subtitle: "Business Intelligence",             pillars: ["P1"], description: "BI actual: RADAR de clientes en riesgo, tableros de ventas por zona, análisis de precios de competencia, Trade Marketing. Se integra con CRM Analytics.", bullets: ["RADAR clientes en riesgo","Ventas por zona y asesor","Precios de competencia","Trade Marketing visibility"] },
  { id: "brevo",    name: "Brevo",                  subtitle: "Email marketing masivo",            pillars: ["P2"], description: "Herramienta actual de envío masivo con cargue manual de bases. La integración con Data Cloud automatiza segmentos y habilita trazabilidad ROI.", bullets: ["Envío masivo actual","Cargue manual → se automatiza con Data Cloud"] },
  { id: "galeria",  name: "Galería Inmobiliaria",   subtitle: "Fuente obras residenciales",        pillars: ["P1"], description: "Plataforma que publica nuevas obras. Agentforce la monitorea para crear automáticamente oportunidades industriales en Sales Cloud.", bullets: ["Monitoreo automático por Agentforce","Creación automática de oportunidades industriales"] },
  { id: "secop",    name: "Secop / Licitacion.info",subtitle: "Licitaciones infraestructura pública", pillars: ["P1"], description: "Licitaciones públicas del Estado colombiano. Agentforce monitorea convocatorias para crear oportunidades industriales automáticamente.", bullets: ["Secop I y II","Monitoreo automático por Agentforce","Creación automática de oportunidades"] },
];

const GAPS = [
  { id: "gap-sap",    label: "SAP ↔ Salesforce sin conector",    desc: "Inventario, crédito y capacidad productiva requieren procesos manuales o asíncronos — errores y retrasos críticos.", pillar: "P3" as PillarKey, critical: true },
  { id: "gap-argos1", label: "Argos ONE invisible en CRM",       desc: "40%+ de las ventas digitales completamente invisible para asesores y Servicio al Cliente en Salesforce.", pillar: "P3" as PillarKey, critical: true },
  { id: "gap-segm",   label: "Segmentación básica sin ROI",       desc: "Cargue manual de bases en Brevo. Sin microsegmentación ni trazabilidad entre inversión de marketing y venta real.", pillar: "P2" as PillarKey, critical: false },
  { id: "gap-radar",  label: "RADAR aislado en Tableau",         desc: "Score de riesgo descargado manualmente una vez por semana. Para cuando llegaba al asesor, el cliente podía haber firmado con la competencia.", pillar: "P1" as PillarKey, critical: false },
];

/* ─── NodeCard ─── */
function NodeCard({ node, size = "md" }: { node: ArchNode; size?: "sm" | "md" }) {
  const [open, setOpen] = useState(false);
  const primary = node.pillars[0];
  const pal = PC[primary];
  const isGap = !!node.gap;

  const PILLAR_LABELS: Record<PillarKey, string> = { P1: "P1", P2: "P2", P3: "P3", ALL: "P1·P2·P3" };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen((v) => !v)}
      className="cursor-pointer rounded-xl border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
      style={{
        backgroundColor: pal.nodeBg,
        borderColor: isGap ? SF.red : pal.nodeBorder,
        padding: size === "sm" ? "8px 10px" : "10px 12px",
        boxShadow: open ? `0 0 16px ${isGap ? SF.red : pal.dot}33` : "none",
      }}
    >
      {/* header */}
      <div className="flex items-start justify-between gap-1.5">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold leading-tight" style={{ color: isGap ? SF.redLight : pal.label }}>
            {node.name}
          </p>
          {size === "md" && (
            <p className="mt-0.5 text-[10px] leading-tight truncate" style={{ color: SF.cb95, opacity: 0.55 }}>
              {node.subtitle}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap gap-0.5">
          {node.pillars.map((p) => (
            <span
              key={p}
              className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-bold leading-none"
              style={{ backgroundColor: PC[p].badge, color: PC[p].badgeText }}
            >
              {PILLAR_LABELS[p]}
            </span>
          ))}
        </div>
      </div>

      {/* gap indicator (collapsed) */}
      {isGap && !open && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full animate-pulse" style={{ backgroundColor: SF.red }} />
          <span className="text-[9px] font-semibold" style={{ color: SF.redLight }}>Brecha crítica</span>
        </div>
      )}

      {/* expanded */}
      {open && (
        <div className="mt-2 space-y-2">
          {isGap && (
            <p
              className="rounded-lg px-2 py-1.5 text-[10px] font-semibold leading-snug"
              style={{ backgroundColor: "#3B0000", color: SF.redLight, border: `1px solid ${SF.red}66` }}
            >
              ⚠ {node.gap}
            </p>
          )}
          <p className="text-[10px] leading-4" style={{ color: SF.cb95, opacity: 0.65 }}>
            {node.description}
          </p>
          {node.bullets && (
            <ul className="space-y-0.5">
              {node.bullets.map((b) => (
                <li key={b} className="flex items-start gap-1.5">
                  <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: pal.dot }} />
                  <span className="text-[10px] leading-4" style={{ color: pal.bodyText }}>
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Layer header ─── */
function LayerHeader({ label, sublabel, dotColor, textColor }: { label: string; sublabel?: string; dotColor: string; textColor: string }) {
  return (
    <div
      className="flex items-center gap-2.5 border-b px-4 py-2.5"
      style={{ borderColor: `${dotColor}22` }}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} />
      <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: textColor }}>{label}</p>
      {sublabel && <span className="text-[10px]" style={{ color: SF.cb80, opacity: 0.4 }}>{sublabel}</span>}
    </div>
  );
}

/* ─── Connector arrow ─── */
function Connector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 py-0.5">
      <svg width="24" height="20" viewBox="0 0 24 20" aria-hidden="true">
        <line x1="12" y1="0" x2="12" y2="7" stroke={SF.cb68} strokeWidth="1.5" strokeDasharray="3,2" />
        <polygon points="7,7 17,7 12,13" fill={SF.cb68} opacity="0.5" />
        <polygon points="7,13 17,13 12,7" fill={SF.cb68} opacity="0.5" />
        <line x1="12" y1="13" x2="12" y2="20" stroke={SF.cb68} strokeWidth="1.5" strokeDasharray="3,2" />
      </svg>
      <span className="text-[9px] tracking-widest" style={{ color: SF.cb68, opacity: 0.45 }}>{label}</span>
    </div>
  );
}

/* ─── Main ─── */
export default function ArgosArchDiagram() {
  const [svgOpen, setSvgOpen] = useState(false);

  return (
    <div className="mt-8 space-y-4">

      {/* ══════════════════════════════════════════════════════
          CARD VIEW — interactive architecture
      ══════════════════════════════════════════════════════ */}
      <div
        className="overflow-hidden rounded-2xl ring-1 ring-white/10"
        style={{
          background: `linear-gradient(160deg, ${SF.eb15} 0%, #001133 50%, ${SF.teal20} 100%)`,
          boxShadow: `0 24px 60px ${SF.eb30}55`,
        }}
      >

        {/* Header bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 border-b px-6 py-3.5"
          style={{ borderColor: `${SF.eb50}22` }}
        >
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: SF.cb68 }} />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: SF.cb80 }}>
              Arquitectura Técnica
            </p>
          </div>
          <p className="text-xs" style={{ color: SF.cb95, opacity: 0.35 }}>
            Cementos Argos — Salesforce Platform · Mayo 2026
          </p>
          <div className="flex items-center gap-4">
            {/* Pillar legend */}
            <div className="hidden sm:flex items-center gap-3">
              {(["P1", "P2", "P3"] as const).map((p) => (
                <div key={p} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: PC[p].dot }} />
                  <span className="text-[10px]" style={{ color: SF.cb95, opacity: 0.5 }}>
                    {p === "P1" ? "Market Share" : p === "P2" ? "Segmentación" : "Integración"}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: SF.red }} />
                <span className="text-[10px]" style={{ color: SF.cb95, opacity: 0.5 }}>Brecha</span>
              </div>
            </div>
            {/* Ver diagrama button — same pattern as VivaLux */}
            <button
              type="button"
              onClick={() => setSvgOpen(true)}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
              style={{
                borderColor: `${SF.cb68}40`,
                backgroundColor: `${SF.cb68}10`,
                color: SF.cb80,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${SF.cb68}20`;
                e.currentTarget.style.borderColor = `${SF.cb68}70`;
                e.currentTarget.style.color = SF.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${SF.cb68}10`;
                e.currentTarget.style.borderColor = `${SF.cb68}40`;
                e.currentTarget.style.color = SF.cb80;
              }}
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Ver diagrama
            </button>
          </div>
        </div>

        <div className="space-y-1 p-4">
          <p className="mb-2 text-center text-[10px]" style={{ color: SF.cb95, opacity: 0.3 }}>
            Clic en cualquier nodo para ver descripción y capacidades
          </p>

          {/* ── CAPA 1: Canales ── */}
          <div
            className="rounded-xl border"
            style={{ borderColor: `${SF.cb68}18`, backgroundColor: `${SF.eb15}88` }}
          >
            <LayerHeader label="Canales y usuarios finales" sublabel="Puntos de contacto · eventos → Salesforce" dotColor={SF.cb68} textColor={SF.cb80} />
            <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 lg:grid-cols-6">
              {CHANNELS.map((n) => <NodeCard key={n.id} node={n} />)}
            </div>
          </div>

          <Connector label="API-LED · EVENTS" />

          {/* ── CAPA 2: Salesforce Platform ── */}
          <div
            className="rounded-xl border"
            style={{ borderColor: `${SF.eb50}30`, backgroundColor: `${SF.eb15}99` }}
          >
            <LayerHeader label="Salesforce Platform — Núcleo" sublabel="9 productos · Agentforce transversal" dotColor={SF.teal80} textColor={SF.teal80} />

            <div className="space-y-2 p-3">

              {/* Agentforce + Einstein — transversal band */}
              <div
                className="rounded-lg border"
                style={{ borderColor: `${SF.teal60}30`, backgroundColor: `${SF.teal20}cc` }}
              >
                <div className="flex items-center gap-2 border-b px-3 py-1.5" style={{ borderColor: `${SF.teal60}20` }}>
                  <span className="h-1 w-1 rounded-full" style={{ backgroundColor: SF.teal80 }} />
                  <span className="text-[10px] font-bold" style={{ color: SF.teal80 }}>Agentforce + Einstein AI — capa transversal P1 · P2 · P3</span>
                </div>
                <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2">
                  {SF_ALL.map((n) => <NodeCard key={n.id} node={n} />)}
                </div>
              </div>

              {/* P1 */}
              <div
                className="rounded-lg border"
                style={{ borderColor: `${SF.eb50}20`, backgroundColor: `${SF.eb15}cc` }}
              >
                <div className="flex items-center gap-2 border-b px-3 py-1.5" style={{ borderColor: `${SF.eb50}18` }}>
                  <span className="h-1 w-1 rounded-full" style={{ backgroundColor: SF.cb68 }} />
                  <span className="text-[10px] font-bold" style={{ color: SF.cb80 }}>P1 · Market Share</span>
                </div>
                <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-4">
                  {SF_P1.map((n) => <NodeCard key={n.id} node={n} />)}
                </div>
              </div>

              {/* P2 */}
              <div
                className="rounded-lg border"
                style={{ borderColor: `${SF.violet65}20`, backgroundColor: `${SF.violet20}cc` }}
              >
                <div className="flex items-center gap-2 border-b px-3 py-1.5" style={{ borderColor: `${SF.violet65}18` }}>
                  <span className="h-1 w-1 rounded-full" style={{ backgroundColor: SF.violet65 }} />
                  <span className="text-[10px] font-bold" style={{ color: SF.violet65 }}>P2 · Segmentación</span>
                </div>
                <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2">
                  {SF_P2.map((n) => <NodeCard key={n.id} node={n} />)}
                </div>
              </div>

              {/* P3 */}
              <div
                className="rounded-lg border"
                style={{ borderColor: `${SF.teal60}20`, backgroundColor: `${SF.teal20}cc` }}
              >
                <div className="flex items-center gap-2 border-b px-3 py-1.5" style={{ borderColor: `${SF.teal60}18` }}>
                  <span className="h-1 w-1 rounded-full" style={{ backgroundColor: SF.teal60 }} />
                  <span className="text-[10px] font-bold" style={{ color: SF.teal80 }}>P3 · Integración Tecnológica</span>
                </div>
                <div className="grid grid-cols-1 gap-2 p-2">
                  {SF_P3.map((n) => <NodeCard key={n.id} node={n} />)}
                </div>
              </div>

            </div>
          </div>

          <Connector label="MULESOFT API-LED CONNECTIVITY" />

          {/* ── CAPA 3: MuleSoft ── */}
          <div
            className="rounded-xl border"
            style={{ borderColor: `${SF.yellow70}40`, backgroundColor: `${SF.yellow20}cc` }}
          >
            <LayerHeader label="MuleSoft Anypoint Platform — Integración" sublabel="5 conectores bidireccionales · tiempo real" dotColor={SF.yellow80} textColor={SF.yellow80} />
            <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 lg:grid-cols-5">
              {MULESOFT.map((n) => <NodeCard key={n.id} node={n} />)}
            </div>
          </div>

          <Connector label="SISTEMAS EXTERNOS" />

          {/* ── CAPA 4: Externos ── */}
          <div
            className="rounded-xl border"
            style={{ borderColor: `${SF.cb68}15`, backgroundColor: `${SF.eb15}88` }}
          >
            <LayerHeader label="Sistemas Externos — Ecosistema Argos" sublabel="7 sistemas · SAP y Argos ONE son brechas críticas P3" dotColor={SF.cb68} textColor={SF.cb80} />
            <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4 lg:grid-cols-7">
              {EXTERNAL.map((n) => <NodeCard key={n.id} node={n} size="sm" />)}
            </div>
          </div>

        </div>

        {/* Stats footer */}
        <div className="grid grid-cols-2 gap-px border-t sm:grid-cols-4" style={{ borderColor: `${SF.eb50}18`, backgroundColor: `${SF.eb50}10` }}>
          {[
            { value: "9",  label: "Productos Salesforce" },
            { value: "5",  label: "Conectores MuleSoft" },
            { value: "7",  label: "Sistemas externos" },
            { value: "6",  label: "Canales de contacto" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-3" style={{ backgroundColor: `${SF.eb15}66` }}>
              <p className="text-lg font-black" style={{ color: SF.white }}>{s.value}</p>
              <p className="text-[10px]" style={{ color: SF.cb95, opacity: 0.45 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Integration gaps panel ── */}
      <div
        className="rounded-2xl border p-4"
        style={{ borderColor: `${SF.red}30`, backgroundColor: "#1A000088" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: SF.red }} />
          <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: SF.redLight }}>
            Brechas de integración identificadas
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {GAPS.map((g) => (
            <div
              key={g.id}
              className="rounded-xl border p-3"
              style={{
                borderColor: g.critical ? `${SF.red}40` : `${SF.yellow70}30`,
                backgroundColor: g.critical ? "#2A000055" : `${SF.yellow20}55`,
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-xs font-bold" style={{ color: g.critical ? SF.redLight : SF.yellow80 }}>{g.label}</p>
                <div className="flex items-center gap-1 shrink-0">
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                    style={{ backgroundColor: PC[g.pillar].badge, color: PC[g.pillar].badgeText }}
                  >
                    {g.pillar}
                  </span>
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                    style={{
                      backgroundColor: g.critical ? SF.red : SF.yellow70,
                      color: SF.white,
                    }}
                  >
                    {g.critical ? "Crítica" : "Alta"}
                  </span>
                </div>
              </div>
              <p className="text-[11px] leading-4" style={{ color: g.critical ? SF.redLight : SF.yellow95, opacity: 0.7 }}>
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {svgOpen && (
        <ArgosArchFullscreen onClose={() => setSvgOpen(false)} />
      )}
    </div>
  );
}
