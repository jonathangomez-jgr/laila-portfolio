export type SlideAccent = "indigo" | "violet" | "sky" | "emerald";

export type DeckSparkleVariant =
  | "yellow-main"
  | "yellow-inclined"
  | "blue-main"
  | "blue-inclined"
  | "darkblue-main"
  | "darkblue-inclined";

export type DeckAstroVariant =
  | "astro"
  | "astro-2"
  | "astro-4"
  | "astro-5"
  | "astro-7"
  | "astro-10"
  | "astro-11"
  | "agent-astro-4-l"
  | "agent-astro-10-l"
  | "agent-astro-10-r"
  | "agent-astro-12-r"
  | "agent-astro-20-l"
  | "agent-astro-flip-009"
  | "agent-astro-flip-020";

export type DeckProductLogo =
  | "Agentforce"
  | "Service"
  | "Sales"
  | "Marketing"
  | "Data Cloud"
  | "Tableau"
  | "Slack"
  | "Commerce"
  | "Industries"
  | "Platform";

export type DeckBrandDecor = {
  sparkles?: {
    variant: DeckSparkleVariant;
    side: "left" | "right";
    top: string;
    size?: number;
    rotate?: number;
    opacity?: number;
  }[];
  astro?: {
    variant: DeckAstroVariant;
    side: "left" | "right";
    bottom?: string;
    top?: string;
    size?: number;
  };
  cloudLogo?: "top-right" | "bottom-right";
};

type SlideBrand = { brand?: DeckBrandDecor; products?: DeckProductLogo[] };

export type ExecutiveSlide =
  | ({
      layout: "title";
      eyebrow?: string;
      title: string;
      subtitle?: string;
      footnote?: string;
    } & SlideBrand)
  | ({
      layout: "section";
      eyebrow?: string;
      title: string;
      subtitle?: string;
    } & SlideBrand)
  | ({
      layout: "bullets";
      eyebrow?: string;
      title: string;
      bullets: string[];
      highlight?: string;
    } & SlideBrand)
  | ({
      layout: "metrics";
      eyebrow?: string;
      title: string;
      metrics: { value: string; label: string }[];
    } & SlideBrand)
  | ({
      layout: "split";
      eyebrow?: string;
      title: string;
      left: { heading: string; items: string[] };
      right: { heading: string; items: string[] };
    } & SlideBrand)
  | ({
      layout: "pillars";
      eyebrow?: string;
      title: string;
      pillars: { title: string; body: string; accent?: SlideAccent }[];
    } & SlideBrand)
  | ({
      layout: "closing";
      title: string;
      bullets?: string[];
      cta?: string;
    } & SlideBrand)
  | ({
      layout: "quote";
      quote: string;
      author?: string;
      context?: string;
    } & SlideBrand)
  | ({
      layout: "comparison";
      eyebrow?: string;
      title: string;
      before: { heading: string; items: string[] };
      after: { heading: string; items: string[] };
    } & SlideBrand)
  | ({
      layout: "kpi-table";
      eyebrow?: string;
      title: string;
      rows: {
        label: string;
        baseline: string;
        goal6m: string;
        goal12m: string;
        accent?: SlideAccent;
      }[];
    } & SlideBrand)
  | ({
      layout: "thanks";
      eyebrow?: string;
      title: string;
      subtitle?: string;
    } & SlideBrand);

export type ExecutiveDeck = {
  slug: string;
  customerSlug: string;
  title: string;
  subtitle: string;
  duration: string;
  slides: ExecutiveSlide[];
};

export const executiveDecks: ExecutiveDeck[] = [
  {
    slug: "executive",
    customerSlug: "vivalux",
    title: "Deck Ejecutivo — Board",
    subtitle: "Transformación del Customer Experience con Agentforce",
    duration: "20 min",
    slides: [
      // ── SLIDE 1 · Portada ──────────────────────────────────────────────
      {
        layout: "title",
        eyebrow: "VivaLux Retail Group",
        title: "Customer Intelligence\nAgent Ecosystem",
        subtitle:
          "De NPS en declive a experiencia post-compra escalable con Salesforce Agentforce — $180M+ en valor combinado",
        footnote: "Sesión ejecutiva · Confidencial · Mayo 2026",
      },

      // ── SLIDE 2 · La paradoja del crecimiento ─────────────────────────
      {
        layout: "metrics",
        eyebrow: "Situación actual",
        title: "El crecimiento comercial no está siendo acompañado por la experiencia",
        metrics: [
          { value: "$1.2B", label: "Revenue anual" },
          { value: "62 → 41", label: "NPS caído en 18 meses" },
          { value: "$72–180M", label: "Revenue en riesgo por churn" },
          { value: "<10%", label: "Automatización Tier-1 actual" },
        ],
      },

      // ── SLIDE 3 · Diagnóstico ─────────────────────────────────────────
      {
        layout: "comparison",
        eyebrow: "Diagnóstico — Brechas críticas",
        title: "Dónde se rompe la experiencia hoy",
        before: {
          heading: "Situación actual",
          items: [
            "WhatsApp: 1 agente maneja ~80 chats/día vs 5,000–8,000 mensajes recibidos",
            "Tiempo de respuesta: horas o días — benchmark líderes: <5 min",
            "Asociados en tienda sin historial de cliente ni riesgo de churn visible",
            "Contact center on-prem: $3.5–5M/año sin IA ni escalabilidad",
            "Sin modelo predictivo — el equipo reacciona, no previene la fuga",
          ],
        },
        after: {
          heading: "Con Agentforce",
          items: [
            "3,000+ conversaciones simultáneas 24/7 en WhatsApp",
            "Respuesta media <5 min — resolución autónoma en primer contacto",
            "Customer 360 + Loyalty Risk Score en mobile para cada asociado",
            "Contact center cloud-native integrado — $4.5M ahorrados (Año 3)",
            "Top 500 clientes en riesgo identificados cada semana con alerta temprana",
          ],
        },
      },

      // ── SLIDE 4 · Impacto financiero ──────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Impacto financiero cuantificado",
        title: "Cinco dolores con costo documentado",
        bullets: [
          "Churn no detectado: 18–22% base activa → pérdida estimada >$20M anuales en valor de vida",
          "WhatsApp sin escala: 94%+ de mensajes sin respuesta oportuna → detractores garantizados",
          "Interacciones genéricas en tienda: sin clienteling, el ticket promedio no crece",
          "Contact center on-prem: $3.5–5M/año sin integración a CRM ni capacidad agéntica",
          "NPS en 41: cada punto perdido equivale a millones en lifetime value erosionado",
        ],
        highlight: "$72M–$180M en revenue en riesgo documentado — no es una hipótesis",
      },

      // ── SLIDE 5 · Visión ──────────────────────────────────────────────
      {
        layout: "section",
        eyebrow: "Visión estratégica",
        title: "Reconvertir cada punto de contacto en experiencia inteligente y proactiva",
        subtitle:
          "Tres hipótesis de valor. Una plataforma unificada. Resultados medibles en 90 días.",
      },

      // ── SLIDE 6 · Tres palancas ───────────────────────────────────────
      {
        layout: "pillars",
        eyebrow: "Objetivos estratégicos",
        title: "Tres palancas de valor para el Directorio",
        pillars: [
          {
            title: "Recuperar NPS",
            body: "Agente proactivo + churn predictivo. LuxInsight identifica a los 500 clientes con mayor riesgo cada semana y activa retención antes de que sea tarde.",
            accent: "indigo",
          },
          {
            title: "Escalar WhatsApp",
            body: "+3,000 conversaciones simultáneas 24/7. LuxServe resuelve de forma autónoma. El equipo humano se enfoca en los casos de mayor valor.",
            accent: "violet",
          },
          {
            title: "Habilitar Clienteling",
            body: "Customer 360 en mobile para asociados: historial online, pedidos activos, Loyalty Risk Score y recomendaciones personalizadas en un clic.",
            accent: "sky",
          },
        ],
      },

      // ── SLIDE 7 · Presentación del ecosistema ─────────────────────────
      {
        layout: "section",
        eyebrow: "La solución",
        title: "Customer Intelligence Agent Ecosystem",
        subtitle:
          "Tres agentes inteligentes — LuxServe, LuxAssist y LuxInsight — construidos sobre Data Cloud, MuleSoft y Agentforce",
      },

      // ── SLIDE 8 · LuxServe ────────────────────────────────────────────
      {
        layout: "split",
        eyebrow: "Agente 1 de 3",
        title: "LuxServe — Servicio Digital 24/7",
        left: {
          heading: "Capacidades del agente",
          items: [
            "Resuelve order status, devoluciones y FAQ de forma autónoma",
            "Escala con contexto completo cuando detecta sentimiento negativo",
            "Reconoce al cliente por número de teléfono antes de que hable",
            "Handoff inteligente: el agente humano recibe resumen IA — cero pérdida de contexto",
          ],
        },
        right: {
          heading: "Impacto de negocio",
          items: [
            "De ~80 chats/agente/día a 3,000+ simultáneos",
            "Respuesta: de horas a <5 minutos en WhatsApp",
            "Resolución en primer contacto: 40% → 80%+",
            "Reducción 75% costo operativo Tier-1 = $8.2M/año ahorrado",
          ],
        },
      },

      // ── SLIDE 9 · LuxAssist ───────────────────────────────────────────
      {
        layout: "split",
        eyebrow: "Agente 2 de 3",
        title: "LuxAssist — Clienteling en Tienda",
        left: {
          heading: "Customer 360 para el asociado",
          items: [
            "Historial de compras online y pedidos activos antes de que el cliente hable",
            "Loyalty Risk Score visible: el asociado sabe si el cliente está en riesgo de abandono",
            "Recomendaciones personalizadas basadas en Product Affinity Graph",
            "Apartado y transferencia entre sucursales en tiempo real",
          ],
        },
        right: {
          heading: "Impacto de negocio",
          items: [
            "Interacción genérica → conversación personalizada desde el primer segundo",
            "+23% ticket promedio en tienda = $27M uplift anual",
            "NPS piloto +8 pts en 60 días (5 tiendas campeón)",
            "Adopción proyectada: 90%+ asociados al año 1",
          ],
        },
      },

      // ── SLIDE 10 · LuxInsight ─────────────────────────────────────────
      {
        layout: "split",
        eyebrow: "Agente 3 de 3",
        title: "LuxInsight — Retención Predictiva",
        left: {
          heading: "Inteligencia para el Directorio",
          items: [
            "Unified Customer Profile: SAP + CRM + WhatsApp + visitas en tienda unificados",
            "Loyalty Risk Score 0–100 calculado semanalmente por Einstein AI",
            "Alertas tempranas sobre top 500 clientes en riesgo cada semana",
            "Dashboards ejecutivos de NPS, churn risk y revenue en riesgo en tiempo real",
          ],
        },
        right: {
          heading: "Impacto de negocio",
          items: [
            "Churn reactivo → retención proactiva con campañas disparadas automáticamente",
            "Salvar 15% de clientes en riesgo = $18M revenue retenido/año",
            "Data residency LATAM — cumplimiento LGPD Brasil y leyes locales",
            "El Directorio ve el impacto en revenue en tiempo real, no en Excel",
          ],
        },
      },

      // ── SLIDE 11 · KPIs para el Directorio ───────────────────────────
      {
        layout: "kpi-table",
        eyebrow: "KPIs para el Directorio",
        title: "Métricas de éxito — Base documentada, metas por fase",
        rows: [
          {
            label: "NPS Score",
            baseline: "41 pts (en declive)",
            goal6m: "+8 pts → 49",
            goal12m: "+15 pts → 56",
            accent: "indigo",
          },
          {
            label: "Automatización Tier-1 WhatsApp",
            baseline: "<10% (casi manual)",
            goal6m: "45%+",
            goal12m: "75%+",
            accent: "violet",
          },
          {
            label: "Ahorro operativo anual",
            baseline: "$0 (on-prem legacy)",
            goal6m: "−40% costo Tier-1",
            goal12m: "$8.2M ahorrado",
            accent: "sky",
          },
          {
            label: "Ticket promedio en tienda",
            baseline: "Sin clienteling",
            goal6m: "+10% (piloto 5 tiendas)",
            goal12m: "+23% = $27M uplift",
            accent: "emerald",
          },
          {
            label: "Revenue retenido por churn evitado",
            baseline: "Sin modelo predictivo",
            goal6m: "Top 500 clientes alertados",
            goal12m: "$18M revenue retenido",
            accent: "indigo",
          },
        ],
      },

      // ── SLIDE 12 · ROI consolidado ────────────────────────────────────
      {
        layout: "metrics",
        eyebrow: "Caso de negocio",
        title: "ROI consolidado — Año 1",
        metrics: [
          { value: "$8.2M", label: "Ahorro operativo Tier-1" },
          { value: "$27M", label: "Uplift ticket en tienda" },
          { value: "$18M", label: "Revenue retenido (churn)" },
          { value: "340%", label: "ROI proyectado año 1" },
        ],
      },

      // ── SLIDE 13 · Roadmap ────────────────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Roadmap de implementación",
        title: "Tres fases — valor demostrable desde el día 90",
        bullets: [
          "Fase 1 · 0–90 días ($180K): LuxServe en WhatsApp + piloto LuxAssist en 5 tiendas campeón — primer ROI visible",
          "Fase 2 · 3–9 meses: LuxInsight + rollout nacional de clienteling en todas las tiendas",
          "Fase 3 · 9–18 meses: Migración contact center on-prem a nube + optimización continua de agentes",
        ],
        highlight: "Arquitectura incremental — no big-bang. El negocio ve valor en cada fase antes de aprobar la siguiente.",
      },

      // ── SLIDE 14 · Ventaja competitiva ───────────────────────────────
      {
        layout: "pillars",
        eyebrow: "Ventaja competitiva",
        title: "Por qué actuar en 2026",
        pillars: [
          {
            title: "Ventana de liderazgo",
            body: "Ser el primer retailer de moda/hogar en LATAM con Customer Intelligence Agents a escala. Los competidores tardarán 2–3 años en replicar esta capacidad agéntica.",
            accent: "indigo",
          },
          {
            title: "Gobernanza y cumplimiento",
            body: "Einstein Trust Layer garantiza privacidad de datos y cumplimiento LGPD desde el día uno. Datos de clientes permanecen en jurisdicción LATAM.",
            accent: "violet",
          },
          {
            title: "Arquitectura defensible",
            body: "Data Cloud + MuleSoft + Agentforce sobre SAP existente. La inversión acumula valor — cada dato enriquece el modelo, cada interacción mejora el agente.",
            accent: "sky",
          },
        ],
      },

      // ── SLIDE 15 · Cita ejecutiva ─────────────────────────────────────
      {
        layout: "quote",
        quote: "El cliente que VivaLux pierde hoy no es solo una transacción perdida — es un embajador de marca que se convierte en detractor. Agentforce no es una inversión en tecnología; es una inversión en la promesa de marca que VivaLux hace a sus clientes cada día.",
        context: "Propuesta de valor estratégica · Laila González · Account Executive, Salesforce",
      },

      // ── SLIDE 16 · Cierre y próximos pasos ───────────────────────────
      {
        layout: "closing",
        title: "Próximos pasos",
        bullets: [
          "Aprobación ejecutiva para Fase 1 — inversión $180K, ROI demostrable en 90 días",
          "Co-sponsor IT + CX — kickoff en 30 días con equipo Salesforce dedicado",
          "Demo live LuxServe en WhatsApp con datos de muestra del cliente",
          "Workshop técnico de arquitectura con el equipo de TI de VivaLux",
        ],
        cta: "¿Avanzamos con el piloto en las 5 tiendas campeón?",
      },

      // ── SLIDE 17 · Gracias ────────────────────────────────────────────
      {
        layout: "thanks",
        eyebrow: "Salesforce · VivaLux Retail Group",
        title: "Gracias",
        subtitle: "Juntos, construimos la experiencia que los clientes de VivaLux merecen.",
      },
    ],
  },
  {
    slug: "executive",
    customerSlug: "grupo-argos",
    title: "Deck Ejecutivo — Dirección",
    subtitle: "Market Share · Segmentación · Integración Tecnológica — tres pilares, una plataforma",
    duration: "20 min",
    slides: [
      // ── SLIDE 1 · Portada ──────────────────────────────────────────────
      {
        layout: "title",
        eyebrow: "Cementos Argos · Grupo Argos",
        title: "Tres pilares.\nUna plataforma.\nUn socio.",
        subtitle:
          "Market Share · Segmentación · Integración Tecnológica — Plan de Cuenta Estratégico v2.0 alineado a SPRINT 4.0",
        footnote: "Executive Briefing · Confidencial · Mayo 2026",
      },

      // ── SLIDE 2 · Argos hoy ───────────────────────────────────────────
      {
        layout: "metrics",
        eyebrow: "Argos en números",
        title: "Una organización de escala con Salesforce ya en producción",
        metrics: [
          { value: "90+", label: "Años de trayectoria" },
          { value: "$5.3B", label: "COP Ingresos 2024 (consolidado)" },
          { value: "11%", label: "Crecimiento canal ferreterías 2025" },
          { value: "25%", label: "Margen EBITDA 2025 — meta SPRINT cumplida un año antes" },
          { value: "40%+", label: "Ventas digitales Argos ONE" },
          { value: "SPRINT 4.0", label: "Marco estratégico activo 2026–27" },
        ],
      },

      // ── SLIDE 3 · El reto ─────────────────────────────────────────────
      {
        layout: "comparison",
        eyebrow: "Diagnóstico — Los 3 pilares y sus brechas",
        title: "Salesforce está en producción — la conversación es de evolución, no de adopción",
        before: {
          heading: "Brechas identificadas en discovery",
          items: [
            "P1 — Plan de visitas 100% manual: sin rutas optimizadas ni alertas de clientes en riesgo",
            "P1 — Reporte diario de ventas llega por Excel con rezago de 24h+ — decisiones lentas",
            "P2 — Segmentación básica: campañas genéricas, Machine Sellers manual, sin ROI trazable",
            "P3 — Argos ONE (40%+ ventas) no visible en Salesforce — experiencia del cliente fragmentada",
            "P3 — SAP y Salesforce sin integración: inventario y crédito requieren procesos manuales",
          ],
        },
        after: {
          heading: "Con los 3 pilares activados",
          items: [
            "P1 — +15% market share: Agentforce SDR + Maps + RADAR de fuga integrado en CRM",
            "P1 — Pipeline y dashboards en tiempo real por nivel jerárquico — decisiones el mismo día",
            "P2 — Microsegmentación A/B/C + Machine Sellers automático + trazabilidad ROI completa",
            "P3 — Argos ONE ↔ Salesforce en tiempo real vía MuleSoft — visión 360 real del cliente",
            "P3 — SAP ↔ Salesforce: inventario, crédito y capacidad consultables desde el CRM",
          ],
        },
      },

      // ── SLIDE 4 · OKRs corporativos ───────────────────────────────────
      {
        layout: "pillars",
        eyebrow: "Los 3 Pilares Estratégicos — SPRINT 4.0 (2026-2027)",
        title: "Cada iniciativa Salesforce alineada a un pilar del negocio",
        pillars: [
          {
            title: "01 Market Share",
            body: "Meta: +15% de crecimiento. Canal Masivo creció 11% en ferreterías en 2025 con herramientas insuficientes. Agentforce SDR + Salesforce Maps + RADAR integrado capturan ese crecimiento de forma sistemática.",
            accent: "indigo",
          },
          {
            title: "02 Segmentación",
            body: "Alta resolución y agilidad operativa. Superar la comunicación genérica. Data Cloud + Marketing Cloud + Machine Sellers automatizan la fidelización y habilitan trazabilidad completa inversión → venta real (ROI).",
            accent: "violet",
          },
          {
            title: "03 Integración Tecnológica",
            body: "Eliminar silos de información. Argos ONE visible en CRM. SAP integrado en tiempo real. MuleSoft + Service Cloud Omni-Channel + WhatsApp API dan visión 360 unificada a ventas y servicio.",
            accent: "sky",
          },
        ],
      },

      // ── SLIDE 5 · Visión de la solución ──────────────────────────────
      {
        layout: "section",
        eyebrow: "La propuesta — 20 iniciativas sobre 3 pilares",
        title: "Cada capa de la plataforma responde a una brecha estratégica de Argos",
        subtitle:
          "Pilar 1: Sales Cloud + Agentforce SDR + Maps · Pilar 2: Marketing Cloud + Data Cloud · Pilar 3: MuleSoft + Service Cloud + WhatsApp API",
      },

      // ── SLIDE 6 · Excelencia Comercial ────────────────────────────────
      {
        layout: "split",
        eyebrow: "Pilar 1 — Sales Cloud + Agentforce SDR + Salesforce Maps",
        title: "Market Share — capturar el +15% con herramientas a la altura de la ambición",
        left: {
          heading: "Iniciativas clave",
          items: [
            "Agentforce SDR: monitorea Galería Inmobiliaria, Licitacion.info y Secop — oportunidades automáticas en Salesforce",
            "Salesforce Maps: plan de visitas optimizado por ruta y territorio con registro offline y Voice-to-Form",
            "RADAR de clientes en riesgo integrado en CRM con acciones sugeridas automáticas",
            "Vista 360 + pedido sugerido Einstein AI — asesor llega preparado a cada visita",
            "Dashboards en tiempo real por nivel jerárquico (asesor, jefe de zona, dirección)",
          ],
        },
        right: {
          heading: "KPIs del Pilar 1",
          items: [
            "Market share: +11% base 2025 → +13% (6 meses) → +15% meta SPRINT (12 meses)",
            "Oportunidades automáticas: 0% → 30%+ (6m) → 60%+ (12m)",
            "Cobertura plan de visitas: parcial → 85% (6m) → 95%+ (12m)",
            "Clientes en riesgo gestionados: sin seguimiento → RADAR 100% → reducción fuga >20%",
          ],
        },
      },

      // ── SLIDE 7 · Servicio Omnicanal ─────────────────────────────────
      {
        layout: "split",
        eyebrow: "Pilar 2 — Marketing Cloud + Data Cloud + Agentforce Marketing",
        title: "Segmentación — microsegmentación real con trazabilidad completa de ROI",
        left: {
          heading: "Iniciativas clave",
          items: [
            "Data Cloud: unifica Salesforce + Argos ONE + Gluki + Brevo en perfil unificado del cliente",
            "Microsegmentación: ferreterías A/B/C por volumen, constructoras por proyecto, distribuidores por canal",
            "Machine Sellers automatizado: Einstein detecta inactividad y dispara campaña personalizada sin intervención manual",
            "Argos Amigos: fidelización multicanal automatizada vía Journey Builder",
            "Trade Marketing: cada peso invertido conectado al pedido resultante (ROI visible)",
          ],
        },
        right: {
          heading: "KPIs del Pilar 2",
          items: [
            "Segmentos activos: básico → 5+ (6m) → 10+ con enriquecimiento IA (12m)",
            "Campañas Machine Sellers: 0 manual → 2 activas (6m) → 6+ activas (12m)",
            "Clientes inactivos reactivados: sin seguimiento → 5%+ (6m) → 10%+ por mes (12m)",
            "ROI marketing: sin trazabilidad → línea base (6m) → ROI visible por campaña (12m)",
          ],
        },
      },

      // ── SLIDE 8 · Crecimiento y Fidelización ─────────────────────────
      {
        layout: "split",
        eyebrow: "Pilar 3 — MuleSoft + Service Cloud + WhatsApp Business API",
        title: "Integración Tecnológica — eliminar silos y habilitar la visión 360 real",
        left: {
          heading: "Iniciativas clave",
          items: [
            "MuleSoft — Argos ONE ↔ Salesforce: actividad digital del cliente visible en CRM en tiempo real",
            "MuleSoft — SAP ↔ Salesforce: inventario, línea de crédito y capacidad de producción consultables al negociar",
            "Service Cloud Omni-Channel: PQRs unificadas desde WhatsApp + Contact Center + web + RRSS",
            "WhatsApp Business API: una sola línea con Agente autónomo que clasifica, responde y escala inteligentemente",
            "Liberación de pedidos digitalizada — elimina fotos de consignaciones por WhatsApp",
          ],
        },
        right: {
          heading: "KPIs del Pilar 3",
          items: [
            "Argos ONE en CRM: 0% silo → POC activo (3m) → 100% integrado MuleSoft (12m)",
            "SAP desde Salesforce: manual/asíncrono → piloto (6m) → tiempo real todos los asesores (12m)",
            "PQRs por Agente autónomo: 0% → 30%+ (6m) → 50%+ (12m)",
            "WhatsApp: múltiples líneas separadas → 1 línea + agente (6m) → >80% resolución autónoma (12m)",
          ],
        },
      },

      // ── SLIDE 9 · KPIs ejecutivos ─────────────────────────────────────
      {
        layout: "kpi-table",
        eyebrow: "KPIs para la Dirección — organizados por pilar",
        title: "Resultados medibles — tres pilares, dos horizontes",
        rows: [
          {
            label: "Market Share (Canal Masivo)",
            baseline: "Base: +11% ferreterías 2025",
            goal6m: "+13%",
            goal12m: "+15% (meta SPRINT)",
            accent: "indigo",
          },
          {
            label: "Oportunidades creadas automáticamente",
            baseline: "0% (100% manual)",
            goal6m: "30%+",
            goal12m: "60%+",
            accent: "indigo",
          },
          {
            label: "Campañas Machine Sellers activas",
            baseline: "0 (proceso manual Lab Digital)",
            goal6m: "2 campañas activas",
            goal12m: "6+ campañas activas",
            accent: "violet",
          },
          {
            label: "Argos ONE visible en Salesforce",
            baseline: "0% — silo completo",
            goal6m: "POC integración activo",
            goal12m: "100% integrado (MuleSoft)",
            accent: "sky",
          },
          {
            label: "PQRs resueltas por agente autónomo",
            baseline: "0% (gestión manual Konecta)",
            goal6m: "30%+",
            goal12m: "50%+",
            accent: "sky",
          },
          {
            label: "NPS post-interacción",
            baseline: "Sin medición sistemática en CRM",
            goal6m: "Medición activa",
            goal12m: "+8 puntos NPS vs. línea base",
            accent: "emerald",
          },
        ],
      },

      // ── SLIDE 10 · Métricas de impacto ───────────────────────────────
      {
        layout: "metrics",
        eyebrow: "Impacto proyectado a 12 meses — los 3 pilares",
        title: "Resultados que importan al negocio",
        metrics: [
          { value: "+15%", label: "Market share — meta SPRINT (P1)" },
          { value: "60%+", label: "Oportunidades creadas automáticamente (P1)" },
          { value: "6+", label: "Campañas Machine Sellers activas (P2)" },
          { value: "100%", label: "Argos ONE integrado en Salesforce vía MuleSoft (P3)" },
          { value: "50%+", label: "PQRs resueltas por agente autónomo (P3)" },
          { value: "+8 pts", label: "NPS post-interacción (P3)" },
        ],
      },

      // ── SLIDE 11 · Por qué 2026 ───────────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Timing estratégico — Por qué los 3 pilares son urgentes en 2026",
        title: "El momento es estratégico — cada mes de espera tiene un costo real",
        bullets: [
          "P1 — Canal ferreterías creció 11% en 2025 con herramientas insuficientes. Con Maps + Agentforce, la meta del +15% es alcanzable este ciclo.",
          "P1 — SPRINT 4.0 exige márgenes EBITDA 24-26%: la eficiencia comercial no es opcional, es una obligación estratégica.",
          "P2 — Cada mes sin Machine Sellers automatizado es un mes donde los competidores pueden activar clientes inactivos de Argos antes que Argos misma.",
          "P3 — Argos ONE ya genera el 40%+ de ventas. Cada día sin integración con Salesforce es un día donde servicio opera a ciegas frente al comportamiento digital del cliente.",
          "General — Agentforce for Manufacturing disponible con habilidades preconfiguradas. El time-to-value es significativamente menor que hace 12 meses.",
        ],
        highlight: "La base de clientes ya existe en Salesforce. El costo marginal de activar los tres pilares es mínimo comparado con construir desde cero.",
      },

      // ── SLIDE 12 · El journey del asesor ─────────────────────────────
      {
        layout: "comparison",
        eyebrow: "Antes y después — el día a día del asesor de campo (Pilar 1)",
        title: "Cuando el CRM trabaja para el asesor, el asesor captura el +15%",
        before: {
          heading: "Asesor hoy",
          items: [
            "Construye su ruta de visitas manualmente — sin optimización de territorio",
            "No sabe si el cliente tiene PQR abierta ni si bajó su volumen de compra",
            "Cotización de concretos compleja sin filtros inteligentes — frena el cierre",
            "Reporta en Excel al final del día — el gerente lo ve al día siguiente con 24h+ de rezago",
          ],
        },
        after: {
          heading: "Asesor con Pilar 1 activado",
          items: [
            "Ruta optimizada por Salesforce Maps con ciclos por territorio y registro offline",
            "RADAR de riesgo integrado en CRM: alerta si el cliente redujo volumen o lleva días sin actividad",
            "Vista 360 con historial de compra, pedido sugerido por Einstein y estado de cartera en una pantalla",
            "Pipeline del gerente actualizado en tiempo real — jefe de zona y dirección deciden el mismo día",
          ],
        },
      },

      // ── SLIDE 13 · Cita ejecutiva ─────────────────────────────────────
      {
        layout: "quote",
        quote: "Market Share. Segmentación. Integración. Tres pilares, una plataforma, un socio.",
        context: "Plan de Cuenta Estratégico v2.0 · Grupo Argos / Cementos Argos S.A. · Salesforce · Mayo 2026",
      },

      // ── SLIDE 14 · Cierre y próximos pasos ───────────────────────────
      {
        layout: "closing",
        title: "Próximos pasos recomendados",
        bullets: [
          "Executive Briefing (Jun 2026) — alineación con Dirección Comercial y Tecnología sobre los 3 pilares; validación de roadmap",
          "Discovery Comercial P1 (Jun 2026) — workshop con Carlos Alzate y equipo de campo: visitas, oportunidades y cotizaciones",
          "Assessment Integraciones P3 (Jun 2026) — revisión técnica de APIs Argos ONE y SAP con CTO Argos + Arquitecto Salesforce",
          "POC Vista 360 P1+P3 (Jul 2026) — demo con datos reales: cliente en Salesforce con actividad Argos ONE + disponibilidad SAP",
          "Discovery Segmentación P2 (Jul 2026) — workshop Marketing: inventario de segmentos, campañas y trazabilidad deseada",
          "Business Case (Ago 2026) — cuantificación de ROI por pilar con métricas reales para CFO/CTO",
          "Kick-off Pilot Zona (Sep 2026) — implementación piloto en zona ferreterías con los 3 pilares activos",
        ],
        cta: "¿Agendamos el Executive Briefing con los stakeholders clave esta semana?",
      },

      // ── SLIDE 15 · Gracias ────────────────────────────────────────────
      {
        layout: "thanks",
        eyebrow: "Salesforce · Grupo Argos / Cementos Argos S.A.",
        title: "Gracias",
        subtitle: "Market Share. Segmentación. Integración. Tres pilares, una plataforma, un socio.",
      },
    ],
  },
  {
    slug: "executive",
    customerSlug: "betterware",
    title: "Deck Ejecutivo — Comité Directivo BeFra",
    subtitle: "Mamá Virtual · Resolución en Primer Contacto · Staff con visión 360",
    duration: "18 min",
    slides: [
      // ── SLIDE 1 · Portada ──────────────────────────────────────────────
      {
        layout: "title",
        eyebrow: "Betterware de México · BeFra",
        title: "Mamá Virtual.\nUna plataforma agéntica\npara las 1.24M.",
        subtitle:
          "Acompañamiento 24/7 a la Distribuidora — resolución en primer contacto, lenguaje tropicalizado y staff con visión 360. Plan de cuenta basado en el Antiexperience Workshop del 29 de mayo de 2026.",
        footnote: "Sesión ejecutiva · Confidencial · Junio 2026",
        brand: {
          astro: { variant: "agent-astro-20-l", side: "right", bottom: "-30px", size: 360 },
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "6%",  size: 48, rotate: 12 },
            { variant: "blue-inclined",   side: "left",  top: "92%", size: 30, rotate: -10 },
            { variant: "yellow-inclined", side: "right", top: "4%",  size: 34, rotate: 22 },
          ],
        },
      },

      // ── SLIDE 2 · Betterware en números ───────────────────────────────
      {
        layout: "metrics",
        eyebrow: "BeFra en números — FY 2024",
        title: "Una organización de escala con un ecosistema humano enorme",
        metrics: [
          { value: "$14.1B", label: "MXN ingresos consolidados (+8.4% YoY)" },
          { value: "19.7%", label: "Margen Adj. EBITDA · FY 2024" },
          { value: "1.24M", label: "Asociadas + Distribuidoras (BW + JAFRA)" },
          { value: "8M", label: "Hogares mexicanos alcanzados" },
          { value: "NASDAQ", label: "BWMX · primer listado directo MX (2020)" },
          { value: "6 meses", label: "Journey crítico de la DS — donde se define todo" },
        ],
      },

      // ── SLIDE 3 · El reto del workshop ────────────────────────────────
      {
        layout: "comparison",
        eyebrow: "Diagnóstico — Antiexperience Workshop · 29-may-2026",
        title: "Lo que la propia organización dijo sobre la experiencia de la DS hoy",
        before: {
          heading: "Lo que duele a la DS hoy",
          items: [
            "Tiene que recurrir a alguien directo o a un directorio para resolver — sin fuente única",
            "Pedido / recibo incompleto sin gestión clara — saldo prometido sin resolución",
            "Respuestas tardadas · saturación en horas pico · información confusa y dispersa",
            "Atención sin empatía — la DS siente que el staff no entiende su rol ni su perfil",
            "Onboarding no adecuado · fricción explícita con Kitspay · procesos complejos",
          ],
        },
        after: {
          heading: "Con la plataforma agéntica activa",
          items: [
            "Una sola Mamá Virtual que la conoce, habla su lenguaje y resuelve en primer contacto",
            "Resolución autónoma de pedidos, saldos y devoluciones · escalación inteligente con contexto",
            "WhatsApp 24/7 · respuesta media <3 min · respuestas adaptativas, no cuadradas",
            "Staff atiende con visión 360: perfil, segmento, comportamiento de consumo y comercial",
            "Onboarding personalizado por cohorte · capacitación embebida en el flujo · Kitspay acompañado",
          ],
        },
      },

      // ── SLIDE 4 · La prioridad #1 ─────────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "La prioridad #1 confirmada por el taller",
        title: "Resolver en Primer Contacto — 3 puntos rojos acumulados",
        bullets: [
          "Es la prioridad más alta real del workshop — más alta que la propia Mamá Virtual o segmentación",
          "Implica tres cosas en paralelo: Asistente Operativo + base de conocimiento estructurada + escalación inteligente",
          "Su impacto cruza dolor emocional (Área 3) y operativo (Áreas 1, 2 y 4) — resuelve cinco frentes a la vez",
          "Los benchmarks confirman la viabilidad: Williams-Sonoma 'Olive' resuelve ~60% de chats; Safari365 62% de casos vía Agentforce",
          "El time-to-value es corto: Agentforce con WhatsApp Business API se despliega en semanas, no en trimestres",
        ],
        highlight:
          "Si Betterware solo activa la palanca #1 en 2026, ya recupera capacidad operativa equivalente a un equipo entero de contact center — y libera al staff actual para los casos que sí necesitan empatía humana.",
        brand: {
          sparkles: [
            { variant: "yellow-main", side: "right", top: "10%", size: 36, rotate: 14 },
          ],
        },
      },

      // ── SLIDE 5 · Visión ──────────────────────────────────────────────
      {
        layout: "section",
        eyebrow: "Visión estratégica",
        title: "Convertir a la DS en el centro del ecosistema con un acompañamiento 24/7 inteligente.",
        subtitle:
          "Tres palancas — Resolución Autónoma, Mamá Virtual y Staff 360 — sobre una sola plataforma agéntica con guardrails y trazabilidad.",
        brand: {
          astro: { variant: "astro-7", side: "left", bottom: "-50px", size: 230 },
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "18%", size: 44, rotate: 12 },
            { variant: "yellow-inclined", side: "right", top: "70%", size: 28, rotate: -18 },
          ],
        },
      },

      // ── SLIDE 6 · Tres palancas ───────────────────────────────────────
      {
        layout: "pillars",
        eyebrow: "Los 3 OKRs estratégicos",
        title: "Tres palancas de valor para el Comité Directivo",
        pillars: [
          {
            title: "01 Resolución Autónoma",
            body: "Asistente Operativo que entiende intención en lenguaje tropicalizado y resuelve pedidos, saldos y reglas comerciales sin intervención humana. Meta: >50% de incidencias resueltas en primer contacto al año 1.",
            accent: "indigo",
          },
          {
            title: "02 Mamá Virtual",
            body: "Acompañamiento personalizado en los 6 meses críticos: pronósticos por DS, agenda compartida DS-OJ, alertas motivacionales y capacitación embebida en el flujo. Meta: -25% de churn en cohortes nuevas.",
            accent: "violet",
          },
          {
            title: "03 Staff con Visión 360",
            body: "Habilitador interno con perfil completo de cada DS — comportamiento de consumo y comercial — y anticipación de churn vía Tableau Next. Meta: -45% en tiempo de resolución y -60% en escalaciones innecesarias.",
            accent: "sky",
          },
        ],
        products: ["Agentforce", "Data Cloud", "Marketing", "Tableau"],
      },

      // ── SLIDE 7 · Presentación del ecosistema ─────────────────────────
      {
        layout: "section",
        eyebrow: "La solución",
        title: "DS Intelligence Agent Ecosystem",
        subtitle:
          "5 agentes inteligentes — Mamá Virtual, Asistente Operativo, Asistente Personal, Agente DS 360 y Habilitador de Staff — sobre Agentforce, Data Cloud, Service Cloud, Marketing Cloud Advanced y Tableau Next.",
        products: ["Agentforce", "Data Cloud", "Service", "Marketing", "Tableau"],
        brand: {
          astro: { variant: "agent-astro-10-r", side: "right", bottom: "-50px", size: 230 },
          sparkles: [
            { variant: "yellow-main",     side: "left", top: "14%", size: 44, rotate: 14 },
            { variant: "yellow-inclined", side: "left", top: "72%", size: 28, rotate: -10 },
          ],
        },
      },

      // ── SLIDE 8 · Asistente Operativo ────────────────────────────────
      {
        layout: "split",
        eyebrow: "Palanca 1 — Agentforce + Service Cloud + Data Cloud",
        title: "Asistente Operativo — Resolución en Primer Contacto",
        left: {
          heading: "Capacidades del agente",
          items: [
            "Detección de intención en preguntas mal articuladas — la DS no necesita saber cómo explicarlas",
            "Resuelve pedidos, devoluciones, saldos y reglas comerciales sin escalación",
            "Respuestas adaptativas en lenguaje tropicalizado · 24/7 en WhatsApp",
            "Escalación inteligente con resumen IA al humano cuando es estrictamente necesario",
          ],
        },
        right: {
          heading: "Impacto de negocio",
          items: [
            "FCR 30%+ a 6 meses · 50%+ a 12 meses (ref. Williams-Sonoma 'Olive' 60%)",
            "Reducción 60% de tickets escalados al staff humano al año 1",
            "Tiempo de respuesta <3 min · disponible 24/7 en horas pico y fin de semana",
            "Liberación del contact center para casos de alto valor — no más saturación",
          ],
        },
        products: ["Agentforce", "Service", "Data Cloud"],
      },

      // ── SLIDE 9 · Mamá Virtual ───────────────────────────────────────
      {
        layout: "split",
        eyebrow: "Palanca 2 — Agentforce + Marketing Cloud Advanced + Data Cloud",
        title: "Mamá Virtual — Acompañamiento Personalizado en 6 Meses",
        left: {
          heading: "Capacidades del agente",
          items: [
            "Pronósticos personalizados de venta por DS y evaluación de objetivos del ciclo",
            "Agenda compartida DS-OJ visible en un solo lugar · alertas motivacionales en momento correcto",
            "Onboarding paso a paso para DS no nativas digitales · capacitación embebida en el flujo",
            "Reactivación proactiva de clientes inactivos con campañas Journey Builder por cohorte",
          ],
        },
        right: {
          heading: "Impacto de negocio",
          items: [
            "Reducción 25% de deserción en los primeros 6 meses críticos",
            "75%+ adopción del agente entre DS activas · 90%+ entre DS nuevas",
            "Top 60% de DS con plan personalizado activo a 12 meses (vs. baseline ~30%)",
            "+15 puntos NPS DS · medición sistemática integrada al CRM",
          ],
        },
        products: ["Agentforce", "Marketing", "Data Cloud"],
      },

      // ── SLIDE 10 · Staff 360 ─────────────────────────────────────────
      {
        layout: "split",
        eyebrow: "Palanca 3 — Agentforce + Tableau Next + Data Cloud",
        title: "Staff con Visión 360 — Atención Empática y Accionable",
        left: {
          heading: "Capacidades del staff",
          items: [
            "Perfil unificado de cada DS · comportamiento de consumo y comportamiento comercial",
            "Anticipación de riesgo de churn con Tableau Next + Calculated Insights de Data Cloud",
            "Comunicación proactiva ('DU on cía') · información clara antes de que surja la duda",
            "Base de conocimiento siempre actualizada · sugerencia de solución por situación",
          ],
        },
        right: {
          heading: "Impacto de negocio",
          items: [
            "Tiempo promedio de resolución del staff: -45% al año 1",
            "Escalaciones innecesarias: -60% · staff con contexto completo desde el primer contacto",
            "Top 5,000 DS en riesgo identificadas cada mes con campañas preventivas activas",
            "+34% productividad del equipo (ref. Agentforce customer base · TechHQ 2025)",
          ],
        },
        products: ["Agentforce", "Tableau", "Data Cloud", "Slack"],
      },

      // ── SLIDE 11 · KPIs para el Directorio ───────────────────────────
      {
        layout: "kpi-table",
        eyebrow: "KPIs para el Comité Directivo",
        title: "Métricas de éxito — base documentada del workshop, metas por fase",
        rows: [
          {
            label: "Resolución en primer contacto (FCR)",
            baseline: "Bajo · sin medición sistemática",
            goal6m: "30%+ tickets por agente",
            goal12m: "50%+ · ref. Williams-Sonoma 60%",
            accent: "indigo",
          },
          {
            label: "Tickets escalados al staff humano",
            baseline: "Alto · saturación horas pico",
            goal6m: "−40% volumen escalado",
            goal12m: "−60% · staff en alto valor",
            accent: "indigo",
          },
          {
            label: "Churn DS en primeros 6 meses",
            baseline: "Alto · journey sin acompañamiento",
            goal6m: "−10% deserción cohorte",
            goal12m: "−25% · activación temprana",
            accent: "violet",
          },
          {
            label: "Adopción agente Mamá Virtual",
            baseline: "0% — agente no existe",
            goal6m: "40%+ DS activas",
            goal12m: "75%+ DS · 90%+ DS nuevas",
            accent: "violet",
          },
          {
            label: "Tiempo promedio de resolución del staff",
            baseline: "Alto · información dispersa",
            goal6m: "−25% TPR",
            goal12m: "−45% · vista 360 unificada",
            accent: "sky",
          },
          {
            label: "NPS de Distribuidora",
            baseline: "Sin medición consolidada",
            goal6m: "Línea base activa",
            goal12m: "+15 pts NPS DS",
            accent: "emerald",
          },
        ],
      },

      // ── SLIDE 12 · Métricas de impacto ───────────────────────────────
      {
        layout: "metrics",
        eyebrow: "Impacto proyectado a 12 meses",
        title: "Resultados que importan al negocio",
        metrics: [
          { value: "50%+", label: "FCR · resolución autónoma en primer contacto" },
          { value: "−25%", label: "Churn de DS en los primeros 6 meses" },
          { value: "75%+", label: "Adopción Mamá Virtual entre DS activas" },
          { value: "−45%", label: "Tiempo de resolución del staff (visión 360)" },
          { value: "+34%", label: "Productividad del equipo (Agentforce ref.)" },
          { value: "+15 pts", label: "NPS de Distribuidora" },
        ],
      },

      // ── SLIDE 13 · Por qué actuar en 2026 ────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Timing estratégico — Por qué los 3 OKRs son urgentes en 2026",
        title: "El momento es estratégico — la base humana ya existe; falta la plataforma agéntica",
        bullets: [
          "OKR 1 — Cada quincena sin resolución autónoma son miles de DS con preguntas básicas saturando un contact center diseñado para la mitad del volumen actual.",
          "OKR 2 — La cohorte de DS nuevas vive su journey crítico hoy. Cada cohorte que pasa sin Mamá Virtual es una oportunidad perdida de retención que no vuelve.",
          "OKR 3 — JAFRA pasó de 0% de crecimiento durante 15 años a doblar utilidades en 3 años. La capacidad ejecutiva está demostrada — la siguiente palanca es agéntica.",
          "Mercado — La venta directa en México es Ps. 88,574 M con +1.2% YoY (AMVD 2024) y headwinds de e-commerce. La diferenciación se construye con experiencia, no con catálogo.",
          "Tecnología — Agentforce + WhatsApp Business API tiene time-to-value de semanas. Los benchmarks (Williams-Sonoma, Safari365, IRS) ya validaron la viabilidad operativa.",
        ],
        highlight:
          "Betterware ya es líder en escala. La pregunta es qué tipo de relación quiere construir con su 1.24M antes que un competidor lance un acompañamiento que sí se sienta humano.",
        brand: {
          sparkles: [
            { variant: "yellow-inclined", side: "right", top: "8%", size: 32, rotate: 10 },
            { variant: "blue-main",       side: "left",  top: "82%", size: 30, rotate: -8 },
          ],
        },
      },

      // ── SLIDE 14 · El día de Lupita ──────────────────────────────────
      {
        layout: "comparison",
        eyebrow: "Antes y después — un día de Lupita en su Mes 4",
        title: "Cuando los 3 OKRs trabajan juntos, la DS no se va — multiplica",
        before: {
          heading: "Lupita hoy",
          items: [
            "Saldo prometido pendiente desde hace 2 quincenas — sin canal claro de resolución",
            "Pedido incompleto que la obliga a llamar al contact center y esperar 47 minutos",
            "Sin pronóstico personalizado de su quincena — depende de la intuición y el calendario",
            "Capacitación fuera del flujo · módulos del LMS no aplicables al caso de hoy",
          ],
        },
        after: {
          heading: "Lupita con los 3 OKRs activos",
          items: [
            "Saldo liberado en 5 minutos por la Mamá Virtual — visión 360 sin preguntas redundantes",
            "Pedido incompleto resuelto con una foto del recibo · reenvío express auto-disparado",
            "Pronóstico personalizado y mensaje listo para reactivar 3 clientas en bajo consumo",
            "Microcápsula del LMS de 8 minutos justo cuando aplica · módulo Cierre de Venta",
          ],
        },
      },

      // ── SLIDE 15 · Cita ejecutiva ────────────────────────────────────
      {
        layout: "quote",
        quote:
          "La DS no se va por el catálogo. Se va porque nadie la conoció a tiempo. Agentforce es la 'Mamá Virtual' que sí la conoce — desde el primer pedido y a las 11 de la noche cuando termina su turno y empieza su negocio.",
        context:
          "Antiexperience Workshop · Betterware · 29 de mayo de 2026 · Equipos 1 a 5",
        brand: {
          astro: { variant: "agent-astro-12-r", side: "left", bottom: "-30px", size: 220 },
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "20%", size: 44, rotate: 12 },
            { variant: "yellow-inclined", side: "right", top: "70%", size: 28, rotate: -18 },
          ],
        },
      },

      // ── SLIDE 16 · Cierre y próximos pasos ───────────────────────────
      {
        layout: "closing",
        title: "Próximos pasos recomendados",
        bullets: [
          "Executive Briefing (Jun 2026) — alineación con Comité Directivo BeFra: presentación de los 3 OKRs y validación de roadmap.",
          "Discovery OKR 1 (Jul 2026) — workshop con Operaciones y Cenapia: inventario de intents, base de conocimiento y reglas comerciales.",
          "POC Asistente Operativo (Jul-Ago 2026) — piloto controlado en WhatsApp con cohorte de 5,000 DS y casos top-10 del workshop.",
          "Discovery OKR 2 (Ago 2026) — workshop Marketing + Cenapia: cohortes 0-6m, contenidos LMS embebibles y agenda DS-OJ.",
          "Business case por OKR (Sep 2026) — cuantificación de ROI por palanca con métricas reales del piloto OKR 1 para CFO/CEO.",
          "Kick-off Fase 2 (Oct 2026) — Mamá Virtual en cohorte completa de DS nuevas + Habilitador de Staff en Cenapia.",
        ],
        cta: "¿Avanzamos con el POC del Asistente Operativo en una cohorte de 5,000 DS?",
      },

      // ── SLIDE 17 · Gracias ───────────────────────────────────────────
      {
        layout: "thanks",
        eyebrow: "Salesforce · Betterware de México (BeFra)",
        title: "Gracias",
        subtitle:
          "Resolución autónoma. Acompañamiento personalizado. Staff con visión 360. Tres palancas, una plataforma, 1.24M de razones.",
        brand: {
          astro: { variant: "astro-11", side: "right", bottom: "-50px", size: 240 },
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "16%", size: 44, rotate: -10 },
            { variant: "yellow-inclined", side: "left",  top: "70%", size: 28, rotate: 18 },
            { variant: "blue-main",       side: "right", top: "20%", size: 32, rotate: 6 },
          ],
        },
      },
    ],
  },
];

export function getExecutiveDeck(
  customerSlug: string,
  deckSlug: string,
): ExecutiveDeck | undefined {
  return executiveDecks.find(
    (deck) => deck.customerSlug === customerSlug && deck.slug === deckSlug,
  );
}

export function hasExecutiveDeck(
  customerSlug: string,
  deckSlug = "executive",
): boolean {
  return executiveDecks.some(
    (deck) => deck.customerSlug === customerSlug && deck.slug === deckSlug,
  );
}
