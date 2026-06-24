"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* ─── Salesforce brand palette (Corporate Template 2026) ─── */
const SF = {
  eb15: "#001E5B",
  eb30: "#022AC0",
  eb50: "#066AFE",
  cb68: "#00B3FF",
  cb80: "#90D0FE",
  cb95: "#EAF5FE",
  teal20: "#023434",
  teal60: "#06A59A",
  teal80: "#04E1CB",
  teal95: "#DEF9F3",
  violet20: "#481A54",
  violet30: "#730394",
  violet65: "#D17DFE",
  violet95: "#F9F0FF",
  yellow20: "#4F2100",
  yellow70: "#E4A201",
  yellow80: "#FCC003",
  yellow95: "#FBF3E0",
  red: "#C23934",
  redLight: "#FFBAB8",
  white: "#FFFFFF",
};

/* ─── Pillar color tokens ─── */
type PillarKey = "P1" | "P2" | "P3" | "ALL";

const PC: Record<
  PillarKey,
  {
    badge: string;
    badgeText: string;
    nodeBg: string;
    nodeBorder: string;
    dot: string;
    label: string;
    bodyText: string;
    zoneBg: string;
    zoneBorder: string;
    zoneLabel: string;
  }
> = {
  P1: {
    badge: SF.eb30,
    badgeText: SF.white,
    nodeBg: SF.eb15,
    nodeBorder: SF.eb50,
    dot: SF.cb68,
    label: SF.cb80,
    bodyText: SF.cb95,
    zoneBg: SF.eb15,
    zoneBorder: SF.eb50,
    zoneLabel: SF.cb80,
  },
  P2: {
    badge: SF.violet30,
    badgeText: SF.white,
    nodeBg: SF.violet20,
    nodeBorder: SF.violet65,
    dot: SF.violet65,
    label: SF.violet65,
    bodyText: SF.violet95,
    zoneBg: SF.violet20,
    zoneBorder: SF.violet65,
    zoneLabel: SF.violet65,
  },
  P3: {
    badge: SF.teal20,
    badgeText: SF.teal80,
    nodeBg: SF.teal20,
    nodeBorder: SF.teal60,
    dot: SF.teal80,
    label: SF.teal80,
    bodyText: SF.teal95,
    zoneBg: SF.teal20,
    zoneBorder: SF.teal60,
    zoneLabel: SF.teal80,
  },
  ALL: {
    badge: "#014D40",
    badgeText: SF.teal80,
    nodeBg: "#012E28",
    nodeBorder: SF.teal60,
    dot: SF.teal80,
    label: SF.teal80,
    bodyText: SF.teal95,
    zoneBg: "#012E28",
    zoneBorder: SF.teal60,
    zoneLabel: SF.teal95,
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

/* ─── Data (identical to ArgosArchDiagram.tsx) ─── */
const CHANNELS: ArchNode[] = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    subtitle: "Línea única + Agente autónomo",
    pillars: ["P3"],
    description:
      "Reemplaza las múltiples líneas actuales con una sola línea gestionada por Agentforce. Clasifica intención (pedido, PQR, fidelización) y escala a humano cuando lo requiere.",
    bullets: [
      "1 línea unificada gestionada por IA",
      "Clasificación automática de intención",
      "Escalada inteligente a humano",
    ],
  },
  {
    id: "argos-one-ch",
    name: "Argos ONE",
    subtitle: "E-commerce / portal clientes",
    pillars: ["P3"],
    description:
      "Toda la actividad digital del cliente en Argos ONE se sincroniza en tiempo real al CRM vía MuleSoft. Cierra la brecha de visibilidad más crítica.",
    bullets: [
      "Actividad digital → perfil CRM en tiempo real",
      "Cotizaciones no completadas visibles al asesor",
      "Integración vía MuleSoft API-Led",
    ],
  },
  {
    id: "sf-mobile",
    name: "Salesforce Mobile",
    subtitle: "Asesores en campo",
    pillars: ["P1"],
    description:
      "App móvil con funcionalidad offline: Vista 360, Voice-to-Form, plan de visitas integrado con Maps, cotizaciones y alertas RADAR.",
    bullets: [
      "Vista 360 del cliente con pedido sugerido",
      "Voice-to-Form: registro de visita por voz",
      "Offline con sincronización automática",
      "Alertas RADAR en tiempo real",
    ],
  },
  {
    id: "contact-center",
    name: "Contact Center",
    subtitle: "Konecta / BTO",
    pillars: ["P3"],
    description:
      "El equipo de Konecta y BTO atiende desde una consola unificada de Service Cloud. PQRs de bajo nivel resueltas automáticamente por Agentforce.",
    bullets: [
      "Consola unificada Service Cloud",
      "PQRs básicos → Agentforce autónomo",
      "Escalada con historial completo",
    ],
  },
  {
    id: "rrss",
    name: "Redes Sociales",
    subtitle: "Facebook · Instagram · TikTok",
    pillars: ["P2"],
    description:
      "Integradas con Marketing Cloud Social Studio. Menciones y mensajes entran a cola unificada. Agentforce responde consultas estándar.",
    bullets: [
      "Cola unificada multicanal",
      "Respuesta automática a consultas estándar",
      "Escalada reputacional a corporativo",
    ],
  },
  {
    id: "web-form",
    name: "Web / Formularios",
    subtitle: "Argos.co",
    pillars: ["P3"],
    description:
      "Formularios crean automáticamente candidatos en Sales Cloud o casos en Service Cloud. Marketing Cloud captura leads para journeys.",
    bullets: [
      "Web-to-Lead automático → Sales Cloud",
      "Web-to-Case → Service Cloud",
      "Captura de leads para journeys Marketing Cloud",
    ],
  },
];

const SF_ALL: ArchNode[] = [
  {
    id: "agentforce",
    name: "Agentforce",
    subtitle: "IA agéntica autónoma · P1 + P2 + P3",
    pillars: ["ALL"],
    description:
      "Motor de agentes autónomos que ejecuta tareas end-to-end: crea oportunidades (SDR), gestiona pedidos por WhatsApp, clasifica PQRs, dispara Machine Sellers y genera resúmenes ejecutivos.",
    bullets: [
      "SDR: ingesta automática de oportunidades (Galería, Secop)",
      "Agente de servicio: PQR y pedidos por WhatsApp",
      "Agente de marketing: Machine Sellers automatizado",
      "Resumen ejecutivo semanal para dirección",
      "Notificaciones proactivas RADAR al asesor correcto",
    ],
  },
  {
    id: "einstein",
    name: "Einstein AI",
    subtitle: "Inteligencia predictiva · P1 + P2",
    pillars: ["P1", "P2"],
    description:
      "Alimenta la Vista 360 con: pedido sugerido (rotación histórica), score RADAR de riesgo de fuga (0–100), correlaciones de venta cruzada y probabilidad de cierre.",
    bullets: [
      "RADAR: score de riesgo de fuga 0–100",
      "Pedido sugerido basado en rotación histórica",
      "Correlaciones de venta cruzada (Machine Sellers)",
      "Probabilidad de cierre de oportunidades",
    ],
  },
];

const SF_P1: ArchNode[] = [
  {
    id: "sales-cloud",
    name: "Sales Cloud",
    subtitle: "Núcleo comercial",
    pillars: ["P1"],
    description:
      "Gestiona el ciclo de venta completo: oportunidades industriales y masivas, cotizaciones multi-producto, gestión de obras con alertas de finalización y Vista 360.",
    bullets: [
      "Pipeline industrial y canal masivo",
      "Cotización multi-producto (cemento, concreto, agregados)",
      "Vista 360 con pedido sugerido Einstein",
      "Gestión de obras con alertas de finalización",
      "Funnel de conversión con métricas completas",
    ],
  },
  {
    id: "sf-maps",
    name: "Salesforce Maps",
    subtitle: "Visitas inteligentes",
    pillars: ["P1"],
    description:
      "Optimización de rutas por ciclos de visita. Voice-to-Form. Alertas de clientes no visitados en 15/30 días. Capacidad offline completa.",
    bullets: [
      "Rutas optimizadas por territorio y riesgo",
      "Ciclos de visita configurables por gerencia",
      "Voice-to-Form: registro de visita por voz",
      "Alertas de clientes no visitados",
    ],
  },
  {
    id: "crm-analytics",
    name: "CRM Analytics",
    subtitle: "Dashboards en tiempo real",
    pillars: ["P1"],
    description:
      "Reemplaza los reportes Excel manuales. Dashboards por nivel jerárquico: asesor, jefe de zona, director. Resumen ejecutivo semanal generado por Agentforce.",
    bullets: [
      "Dashboards en tiempo real por nivel jerárquico",
      "Reporte diario de ventas (elimina Excel)",
      "Seguimiento de rigor comercial (up-rigor)",
      "Analítica de Trade Marketing y ROI",
    ],
  },
  {
    id: "slack",
    name: "Slack",
    subtitle: "SO del asesor · pestaña Hoy + Slackbot + RADAR",
    pillars: ["P1"],
    description:
      "Sistema operativo del asesor. Carlos arranca el día en la pestaña 'Hoy' de Slack — foco, tareas y agenda en una pantalla. Slackbot prepara cada reunión y devuelve briefing + RADAR. La Vista 360 se consulta dentro del chat, sin abrir el CRM. Las alertas RADAR llegan en tiempo real al asesor correcto. Reemplaza grupos de WhatsApp internos.",
    bullets: [
      "Pestaña Hoy: foco, tareas y agenda en una pantalla",
      "Preparar reunión con Slackbot — briefing + RADAR en el chat",
      "Vista 360 conversacional, sin abrir el CRM",
      "Alertas RADAR en tiempo real al asesor correcto",
      "Registro de visitas y actualización de oportunidades desde Slack",
      "Aprobaciones de descuento y crédito",
      "Resúmenes de visita automáticos",
      "Reemplaza grupos WhatsApp internos — trazabilidad completa",
    ],
  },
];

const SF_P2: ArchNode[] = [
  {
    id: "mkt-cloud",
    name: "Marketing Cloud",
    subtitle: "Fidelización y campañas",
    pillars: ["P2"],
    description:
      "Journeys automatizados por segmento: Argos Amigos, Machine Sellers, Trade Marketing. Sincronización con Data Cloud para microsegmentación.",
    bullets: [
      "Journey Builder por perfil y comportamiento",
      "Argos Amigos — fidelización multicanal",
      "Machine Sellers: venta cruzada automatizada",
      "Trade Marketing: acciones, inversión y ROI",
      "Reactivación automática de clientes inactivos",
    ],
  },
  {
    id: "data-cloud",
    name: "Data Cloud",
    subtitle: "Perfil unificado · Microsegmentación",
    pillars: ["P2"],
    description:
      "Unifica CRM, Argos ONE, Gluki, Brevo y Tableau en un perfil único. Habilita microsegmentos de alta resolución: ferreterías A/B/C, constructoras por tipo.",
    bullets: [
      "Perfil 360° unificado del cliente",
      "Microsegmentación: ferreterías por tamaño y producto",
      "Activación de segmentos en Marketing Cloud",
      "Trazabilidad inversión marketing → venta (ROI)",
    ],
  },
];

const SF_P3: ArchNode[] = [
  {
    id: "service-cloud",
    name: "Service Cloud",
    subtitle: "Servicio omnicanal",
    pillars: ["P3"],
    description:
      "Gestión unificada de PQRs desde todos los canales en una sola cola con SLAs por tipología. Liberación de pedidos digitalizada. CSAT automático.",
    bullets: [
      "Omni-Channel: todos los canales en una cola",
      "PQR automatizado con clasificación inteligente",
      "SLAs con alertas de incumplimiento",
      "Liberación de pedidos digitalizada (elimina fotos WhatsApp)",
      "Encuesta CSAT automática post-cierre",
    ],
  },
];

const MULESOFT: ArchNode[] = [
  {
    id: "ms-sap",
    name: "SAP ↔ Salesforce",
    subtitle: "Inventario y crédito en tiempo real",
    pillars: ["P3"],
    description:
      "Bidireccional. El asesor consulta inventario por planta, crédito y capacidad de producción. Los pedidos confirmados se convierten automáticamente en órdenes SAP.",
    bullets: [
      "SAP → SF: Inventario por planta en tiempo real",
      "SAP → SF: Crédito y cupo disponible",
      "SF → SAP: Pedidos confirmados → Órdenes de venta",
    ],
    gap: "Sin integración en tiempo real — brecha crítica P3",
  },
  {
    id: "ms-argosone",
    name: "Argos ONE ↔ Salesforce",
    subtitle: "Actividad digital → CRM",
    pillars: ["P3"],
    description:
      "Sincroniza en tiempo real la actividad digital del cliente en Argos ONE al perfil en Sales Cloud y Data Cloud.",
    bullets: [
      "Argos ONE → SF: Cotizaciones no completadas",
      "Argos ONE → SF: Pedidos digitales",
      "SF → Argos ONE: Precios personalizados",
    ],
    gap: "Actividad digital invisible en CRM — brecha crítica P3",
  },
  {
    id: "ms-gluki",
    name: "Gluki ↔ Salesforce",
    subtitle: "Puntos y fidelización",
    pillars: ["P2"],
    description:
      "Acredita puntos automáticamente al cerrar un pedido y personaliza campañas según el tier del cliente en Argos Amigos.",
    bullets: [
      "SF → Gluki: Pedido cerrado → acreditar puntos",
      "Gluki → SF: Saldo y tier en tiempo real",
      "Gluki → SF: Historial de canjes",
    ],
  },
  {
    id: "ms-tableau",
    name: "Tableau ↔ CRM Analytics",
    subtitle: "RADAR y precios → CRM",
    pillars: ["P1"],
    description:
      "El RADAR de clientes en riesgo (hoy aislado en Tableau) se integra con CRM Analytics y el perfil del cliente como alerta accionable con Agentforce.",
    bullets: [
      "Tableau → SF: Score RADAR de riesgo",
      "Tableau → SF: Precios de competencia por zona",
      "SF → Tableau: Datos de gestión comercial",
    ],
  },
  {
    id: "wa-api",
    name: "WhatsApp Business API",
    subtitle: "Mensajería ↔ Service Cloud",
    pillars: ["P3"],
    description:
      "La API oficial conecta con Service Cloud Omni-Channel. Todos los mensajes entran a la misma cola. Agentforce atiende; casos complejos escalan con historial.",
    bullets: [
      "WA → SF: Mensajes → cola Service Cloud",
      "SF → WA: Respuestas y notificaciones proactivas",
      "SF → WA: Alertas de entrega y documentos",
    ],
  },
];

const EXTERNAL: ArchNode[] = [
  {
    id: "sap",
    name: "SAP ERP",
    subtitle: "Sistema de registro central",
    pillars: ["P3"],
    description:
      "ERP central. Gestiona inventarios por planta (Nare, Yumbo, Rioclaro), órdenes de venta (OTC), crédito por cliente, producción y logística.",
    bullets: [
      "Inventario y almacén (WM)",
      "Órdenes de venta (SD)",
      "Crédito y finanzas (FI)",
      "Producción (PP) · Logística (LE)",
    ],
    gap: "Sin integración en tiempo real — brecha crítica P3",
  },
  {
    id: "argos1",
    name: "Argos ONE",
    subtitle: "Portal e-commerce propio",
    pillars: ["P3"],
    description:
      "Portal de autogestión. Genera el 40%+ de las ventas digitales. Hoy invisible para Servicio al Cliente y asesores en Salesforce.",
    bullets: [
      "40%+ de las ventas digitales",
      "Cotizaciones, pedidos, historial",
      "Completamente invisible en CRM actualmente",
    ],
    gap: "Actividad digital invisible en Salesforce — brecha crítica P3",
  },
  {
    id: "gluki",
    name: "Gluki",
    subtitle: "Programa Argos Amigos",
    pillars: ["P2"],
    description:
      "Sistema externo de fidelización: puntos por compra, canje de recompensas, lealtad a distribuidores, dependientes y maestros de obra.",
    bullets: [
      "Lealtad a clientes distribuidores",
      "Lealtad a dependientes (vendedores)",
      "Lealtad a maestros de obra",
    ],
  },
  {
    id: "tableau",
    name: "Tableau",
    subtitle: "Business Intelligence",
    pillars: ["P1"],
    description:
      "BI actual: RADAR de clientes en riesgo, tableros de ventas por zona, análisis de precios de competencia, Trade Marketing. Se integra con CRM Analytics.",
    bullets: [
      "RADAR clientes en riesgo",
      "Ventas por zona y asesor",
      "Precios de competencia",
      "Trade Marketing visibility",
    ],
  },
  {
    id: "brevo",
    name: "Brevo",
    subtitle: "Email marketing masivo",
    pillars: ["P2"],
    description:
      "Herramienta actual de envío masivo con cargue manual de bases. La integración con Data Cloud automatiza segmentos y habilita trazabilidad ROI.",
    bullets: [
      "Envío masivo actual",
      "Cargue manual → se automatiza con Data Cloud",
    ],
  },
  {
    id: "galeria",
    name: "Galería Inmobiliaria",
    subtitle: "Fuente obras residenciales",
    pillars: ["P1"],
    description:
      "Plataforma que publica nuevas obras. Agentforce la monitorea para crear automáticamente oportunidades industriales en Sales Cloud.",
    bullets: [
      "Monitoreo automático por Agentforce",
      "Creación automática de oportunidades industriales",
    ],
  },
  {
    id: "secop",
    name: "Secop / Licitacion.info",
    subtitle: "Licitaciones infraestructura pública",
    pillars: ["P1"],
    description:
      "Licitaciones públicas del Estado colombiano. Agentforce monitorea convocatorias para crear oportunidades industriales automáticamente.",
    bullets: [
      "Secop I y II",
      "Monitoreo automático por Agentforce",
      "Creación automática de oportunidades",
    ],
  },
];

const GAPS = [
  {
    id: "gap-sap",
    label: "SAP ↔ Salesforce sin conector",
    desc: "Inventario, crédito y capacidad productiva requieren procesos manuales o asíncronos — errores y retrasos críticos.",
    pillar: "P3" as PillarKey,
    critical: true,
  },
  {
    id: "gap-argos1",
    label: "Argos ONE invisible en CRM",
    desc: "40%+ de las ventas digitales completamente invisible para asesores y Servicio al Cliente en Salesforce.",
    pillar: "P3" as PillarKey,
    critical: true,
  },
  {
    id: "gap-segm",
    label: "Segmentación básica sin ROI",
    desc: "Cargue manual de bases en Brevo. Sin microsegmentación ni trazabilidad entre inversión de marketing y venta real.",
    pillar: "P2" as PillarKey,
    critical: false,
  },
  {
    id: "gap-radar",
    label: "RADAR aislado en Tableau",
    desc: "Score de riesgo descargado manualmente una vez por semana. Para cuando llegaba al asesor, el cliente podía haber firmado con la competencia.",
    pillar: "P1" as PillarKey,
    critical: false,
  },
];

/* ─── Product icons ─── */
const ICONS: Record<string, React.ReactNode> = {
  whatsapp: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  ),
  "argos-one-ch": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  ),
  "sf-mobile": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  ),
  "contact-center": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  ),
  rrss: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
    />
  ),
  "web-form": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  agentforce: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </>
  ),
  einstein: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  ),
  "sales-cloud": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7zM17 11l2 2 4-4"
    />
  ),
  "sf-maps": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  ),
  "crm-analytics": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  ),
  slack: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
    />
  ),
  "mkt-cloud": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  ),
  "data-cloud": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    />
  ),
  "service-cloud": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
    />
  ),
  "ms-sap": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  ),
  "ms-argosone": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  ),
  "ms-gluki": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  ),
  "ms-tableau": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
    />
  ),
  "wa-api": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  ),
  sap: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
    />
  ),
  argos1: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  ),
  gluki: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  ),
  tableau: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
    />
  ),
  brevo: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  ),
  galeria: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  ),
  secop: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
    />
  ),
};

/* ─── Animation CSS ─── */
const ANIM_CSS = `
@keyframes arch-in { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
.arch-in { animation: arch-in 0.5s cubic-bezier(.22,1,.36,1) both }
@keyframes flow-dash { from { stroke-dashoffset: 20 } to { stroke-dashoffset: 0 } }
.flow-line { animation: flow-dash 1.2s linear infinite }
`;

/* ─── Props ─── */
type Props = { onClose: () => void };

type PillarFilter = "ALL" | "P1" | "P2" | "P3";

/* ─── AnimatedConnector ─── */
function AnimatedConnector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-3">
      <svg width="40" height="28" viewBox="0 0 40 28" aria-hidden>
        <line
          x1="20"
          y1="0"
          x2="20"
          y2="28"
          stroke={SF.cb68}
          strokeWidth="1.5"
          strokeDasharray="4,3"
          className="flow-line"
        />
        <polygon points="14,18 26,18 20,26" fill={SF.cb68} opacity="0.5" />
      </svg>
      <span
        className="text-[9px] font-bold uppercase tracking-[0.18em]"
        style={{ color: SF.cb68, opacity: 0.4 }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── FullscreenNodeCard ─── */
function FullscreenNodeCard({
  node,
  filter,
}: {
  node: ArchNode;
  filter: PillarFilter;
}) {
  const [open, setOpen] = useState(false);
  const primary = node.pillars[0];
  const isGap = !!node.gap;
  const isHighlighted =
    filter === "ALL" || node.pillars.includes(filter as PillarKey);

  const iconBg =
    primary === "ALL"
      ? `linear-gradient(135deg, ${SF.eb30}, ${SF.teal60})`
      : primary === "P1"
        ? SF.eb30
        : primary === "P2"
          ? SF.violet30
          : primary === "P3"
            ? SF.teal60
            : SF.yellow70;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && setOpen((v) => !v)
      }
      className="cursor-pointer rounded-2xl border transition-all duration-200 focus:outline-none focus-visible:ring-2"
      style={{
        backgroundColor: isGap
          ? "#1A0000"
          : primary === "P2"
            ? SF.violet20
            : primary === "P3"
              ? SF.teal20
              : primary === "ALL"
                ? SF.teal20
                : SF.eb15,
        borderColor: isGap ? SF.red : PC[primary].nodeBorder,
        opacity: isHighlighted ? 1 : 0.25,
        padding: "12px",
        boxShadow: open
          ? `0 0 20px ${isGap ? SF.red : PC[primary].dot}44`
          : "none",
        transition: "all 0.2s ease",
      }}
    >
      {/* Icon + pillar badges row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{ background: isGap ? SF.red : iconBg }}
        >
          <svg
            className="h-[18px] w-[18px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={1.75}
          >
            {ICONS[node.id] ?? <circle cx="12" cy="12" r="4" />}
          </svg>
        </div>
        <div className="flex flex-wrap gap-0.5 justify-end">
          {node.pillars.map((p) => (
            <span
              key={p}
              className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
              style={{
                backgroundColor: PC[p].badge,
                color: PC[p].badgeText,
              }}
            >
              {p === "ALL" ? "P1·P2·P3" : p}
            </span>
          ))}
        </div>
      </div>

      {/* Name */}
      <p
        className="text-xs font-bold leading-snug"
        style={{ color: isGap ? SF.redLight : PC[primary].label }}
      >
        {node.name}
      </p>
      <p
        className="mt-0.5 text-[10px] leading-tight truncate"
        style={{ color: SF.cb95, opacity: 0.5 }}
      >
        {node.subtitle}
      </p>

      {/* Gap indicator (collapsed) */}
      {isGap && !open && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full animate-pulse"
            style={{ backgroundColor: SF.red }}
          />
          <span
            className="text-[9px] font-semibold"
            style={{ color: SF.redLight }}
          >
            Brecha crítica
          </span>
        </div>
      )}

      {/* Expanded content */}
      {open && (
        <div
          className="mt-3 space-y-2 border-t pt-2"
          style={{ borderColor: `${PC[primary].dot}20` }}
        >
          {isGap && (
            <p
              className="rounded-lg px-2 py-1.5 text-[10px] font-semibold leading-snug"
              style={{
                backgroundColor: "#3B0000",
                color: SF.redLight,
                border: `1px solid ${SF.red}55`,
              }}
            >
              ⚠ {node.gap}
            </p>
          )}
          <p
            className="text-[10px] leading-4"
            style={{ color: SF.cb95, opacity: 0.65 }}
          >
            {node.description}
          </p>
          {node.bullets && (
            <ul className="space-y-1">
              {node.bullets.map((b) => (
                <li key={b} className="flex items-start gap-1.5">
                  <span
                    className="mt-[5px] h-1 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: PC[primary].dot }}
                  />
                  <span
                    className="text-[10px] leading-4"
                    style={{ color: PC[primary].bodyText }}
                  >
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

/* ─── LayerSection ─── */
function LayerSection({
  title,
  sublabel,
  dotColor,
  textColor,
  nodes,
  filter,
  gridCols,
  animDelay,
}: {
  title: string;
  sublabel: string;
  dotColor: string;
  textColor: string;
  nodes: ArchNode[];
  filter: PillarFilter;
  gridCols: string;
  animDelay: string;
}) {
  return (
    <div
      className="arch-in rounded-2xl border overflow-hidden"
      style={{
        borderColor: `${dotColor}25`,
        backgroundColor: `${SF.eb15}88`,
        animationDelay: animDelay,
      }}
    >
      {/* Layer header */}
      <div
        className="flex items-center gap-2.5 border-b px-4 py-2.5"
        style={{ borderColor: `${dotColor}22` }}
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
        <p
          className="text-[11px] font-bold uppercase tracking-[0.16em]"
          style={{ color: textColor }}
        >
          {title}
        </p>
        {sublabel && (
          <span
            className="text-[10px]"
            style={{ color: SF.cb80, opacity: 0.4 }}
          >
            {sublabel}
          </span>
        )}
      </div>
      {/* Nodes grid */}
      <div className={`grid gap-2 p-3 ${gridCols}`}>
        {nodes.map((n) => (
          <FullscreenNodeCard key={n.id} node={n} filter={filter} />
        ))}
      </div>
    </div>
  );
}

/* ─── GapsPanel ─── */
function GapsPanel() {
  return (
    <div
      className="arch-in rounded-2xl border p-4 mt-4"
      style={{
        borderColor: `${SF.red}30`,
        backgroundColor: "#1A000088",
        animationDelay: "0.5s",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="h-1.5 w-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: SF.red }}
        />
        <p
          className="text-xs font-bold uppercase tracking-[0.16em]"
          style={{ color: SF.redLight }}
        >
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
              <p
                className="text-xs font-bold"
                style={{ color: g.critical ? SF.redLight : SF.yellow80 }}
              >
                {g.label}
              </p>
              <div className="flex items-center gap-1 shrink-0">
                <span
                  className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                  style={{
                    backgroundColor: PC[g.pillar].badge,
                    color: PC[g.pillar].badgeText,
                  }}
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
            <p
              className="text-[11px] leading-4"
              style={{
                color: g.critical ? SF.redLight : SF.yellow95,
                opacity: 0.7,
              }}
            >
              {g.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function ArgosArchFullscreen({ onClose }: Props) {
  const [filter, setFilter] = useState<PillarFilter>("ALL");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />
      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{
          background:
            "linear-gradient(160deg, #001E5B 0%, #000A2B 60%, #023434 100%)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Arquitectura Técnica Salesforce — Cementos Argos"
      >
        {/* ── TOP BAR ── */}
        <header
          className="relative z-10 flex shrink-0 flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-7"
          style={{
            borderBottom: `1px solid ${SF.eb50}22`,
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        >
          {/* Left: logos */}
          <div className="flex items-center gap-3">
            <Image
              src="/sfdc-logos/corporate-logo-horiz-allw.svg"
              alt="Salesforce"
              width={100}
              height={32}
              className="h-5 w-auto object-contain"
            />
            <span
              className="h-4 w-px"
              style={{ backgroundColor: "rgba(255,255,255,0.22)" }}
            />
            <Image
              src="/Customers/logo-argos.svg"
              alt="Argos"
              width={80}
              height={32}
              className="h-5 w-auto object-contain"
              unoptimized
            />
          </div>

          {/* Center: pillar filter pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(["ALL", "P1", "P2", "P3"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor:
                    filter === f
                      ? f === "P1"
                        ? SF.eb50
                        : f === "P2"
                          ? SF.violet65
                          : f === "P3"
                            ? SF.teal80
                            : SF.cb68
                      : "rgba(255,255,255,0.08)",
                  color:
                    filter === f ? SF.white : "rgba(255,255,255,0.45)",
                }}
              >
                {f === "ALL"
                  ? "Todos"
                  : f === "P1"
                    ? "P1 · Market Share"
                    : f === "P2"
                      ? "P2 · Segmentación"
                      : "P3 · Integración"}
              </button>
            ))}
          </div>

          {/* Right: close */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition focus:outline-none focus-visible:ring-2"
            style={{ color: "rgba(255,255,255,0.45)" }}
            aria-label="Cerrar diagrama"
          >
            ✕
          </button>
        </header>

        {/* ── SCROLLABLE CONTENT ── */}
        <main className="flex-1 overflow-y-auto px-6 py-4 lg:px-10">

          {/* Stats strip */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 arch-in" style={{ animationDelay: "0s" }}>
            {[
              { value: "9", label: "Productos SF" },
              { value: "5", label: "Conectores MuleSoft" },
              { value: "7", label: "Sistemas externos" },
              { value: "4", label: "Brechas identificadas" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center rounded-2xl border py-3"
                style={{
                  borderColor: `${SF.eb50}25`,
                  backgroundColor: `${SF.eb15}66`,
                }}
              >
                <p
                  className="text-2xl font-black"
                  style={{ color: SF.white }}
                >
                  {s.value}
                </p>
                <p
                  className="text-[10px] font-semibold"
                  style={{ color: SF.cb95, opacity: 0.45 }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Layer 1: Channels */}
          <LayerSection
            title="Canales y Usuarios"
            sublabel="Puntos de contacto"
            dotColor={SF.cb68}
            textColor={SF.cb80}
            nodes={CHANNELS}
            filter={filter}
            gridCols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
            animDelay="0.05s"
          />

          <AnimatedConnector label="API-LED · EVENTS" />

          {/* Layer 2: Salesforce Platform */}
          <div
            className="arch-in rounded-2xl border overflow-hidden"
            style={{
              borderColor: `${SF.eb50}30`,
              backgroundColor: `${SF.eb15}99`,
              animationDelay: "0.1s",
            }}
          >
            {/* Platform header */}
            <div
              className="flex items-center gap-2.5 border-b px-4 py-2.5"
              style={{ borderColor: `${SF.teal80}22` }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: SF.teal80 }}
              />
              <p
                className="text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{ color: SF.teal80 }}
              >
                Salesforce Platform
              </p>
              <span
                className="text-[10px]"
                style={{ color: SF.cb80, opacity: 0.4 }}
              >
                9 productos · Agentforce transversal
              </span>
            </div>

            <div className="space-y-2 p-3">
              {/* Transversal band: Agentforce + Einstein */}
              <div
                className="rounded-xl border"
                style={{
                  borderColor: `${SF.teal60}30`,
                  backgroundColor: `${SF.teal20}cc`,
                }}
              >
                <div
                  className="flex items-center gap-2 border-b px-3 py-1.5"
                  style={{ borderColor: `${SF.teal60}20` }}
                >
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: SF.teal80 }}
                  />
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: SF.teal80 }}
                  >
                    Agentforce + Einstein AI — capa transversal P1 · P2 · P3
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2">
                  {SF_ALL.map((n) => (
                    <FullscreenNodeCard key={n.id} node={n} filter={filter} />
                  ))}
                </div>
              </div>

              {/* P1 sub-band */}
              <div
                className="rounded-xl border"
                style={{
                  borderColor: `${SF.eb50}20`,
                  backgroundColor: `${SF.eb15}cc`,
                }}
              >
                <div
                  className="flex items-center gap-2 border-b px-3 py-1.5"
                  style={{ borderColor: `${SF.eb50}18` }}
                >
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: SF.cb68 }}
                  />
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: SF.cb80 }}
                  >
                    P1 · Market Share
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-4">
                  {SF_P1.map((n) => (
                    <FullscreenNodeCard key={n.id} node={n} filter={filter} />
                  ))}
                </div>
              </div>

              {/* P2 sub-band */}
              <div
                className="rounded-xl border"
                style={{
                  borderColor: `${SF.violet65}20`,
                  backgroundColor: `${SF.violet20}cc`,
                }}
              >
                <div
                  className="flex items-center gap-2 border-b px-3 py-1.5"
                  style={{ borderColor: `${SF.violet65}18` }}
                >
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: SF.violet65 }}
                  />
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: SF.violet65 }}
                  >
                    P2 · Segmentación
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2">
                  {SF_P2.map((n) => (
                    <FullscreenNodeCard key={n.id} node={n} filter={filter} />
                  ))}
                </div>
              </div>

              {/* P3 sub-band */}
              <div
                className="rounded-xl border"
                style={{
                  borderColor: `${SF.teal60}20`,
                  backgroundColor: `${SF.teal20}cc`,
                }}
              >
                <div
                  className="flex items-center gap-2 border-b px-3 py-1.5"
                  style={{ borderColor: `${SF.teal60}18` }}
                >
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: SF.teal60 }}
                  />
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: SF.teal80 }}
                  >
                    P3 · Integración Tecnológica
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2 p-2">
                  {SF_P3.map((n) => (
                    <FullscreenNodeCard key={n.id} node={n} filter={filter} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <AnimatedConnector label="MULESOFT API-LED CONNECTIVITY" />

          {/* Layer 3: MuleSoft */}
          <LayerSection
            title="MuleSoft Anypoint Platform"
            sublabel="5 conectores bidireccionales · tiempo real"
            dotColor={SF.yellow80}
            textColor={SF.yellow80}
            nodes={MULESOFT}
            filter={filter}
            gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
            animDelay="0.2s"
          />

          <AnimatedConnector label="SISTEMAS EXTERNOS" />

          {/* Layer 4: External */}
          <LayerSection
            title="Ecosistema Externo Argos"
            sublabel="7 sistemas · SAP y Argos ONE son brechas críticas P3"
            dotColor={SF.cb68}
            textColor={SF.cb80}
            nodes={EXTERNAL}
            filter={filter}
            gridCols="grid-cols-2 sm:grid-cols-4 lg:grid-cols-7"
            animDelay="0.3s"
          />

          {/* Gaps panel */}
          <GapsPanel />

          {/* Bottom padding */}
          <div className="h-4" />
        </main>

        {/* ── FOOTER ── */}
        <footer
          className="relative z-10 shrink-0 px-5 py-2 text-center"
          style={{
            borderTop: `1px solid ${SF.eb50}22`,
            backgroundColor: "rgba(0,0,0,0.20)",
          }}
        >
          <p
            className="text-[10px]"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            Clic en cualquier nodo para expandir · Esc cerrar
          </p>
        </footer>
      </div>
    </>
  );
}
