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
      logo?: string;
      showQr?: boolean;
    } & SlideBrand)
  | ({
      layout: "section";
      eyebrow?: string;
      title: string;
      subtitle?: string;
      deckLink?: { label: string; href: string; direction?: "forward" | "back" };
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
      qrSrc?: string;
      qrLabel?: string;
      qrCaption?: string;
    } & SlideBrand)
  | ({
      layout: "agenda-block";
      eyebrow?: string;
      title: string;
      duration: string;
      objective: string;
      content: string;
      exercise: string;
      deliverable: string;
      accent?: SlideAccent;
      deckLink?: { label: string; href: string; direction?: "forward" | "back" };
    } & SlideBrand)
  | ({
      layout: "agent-profile";
      eyebrow?: string;
      title: string;
      agentName: string;
      agentRole: string;
      avatar?: string;
      traits: {
        label: string;
        value: string;
        icon: string;
        accent?: SlideAccent;
      }[];
    } & SlideBrand)
  | ({
      layout: "agenda-list";
      eyebrow?: string;
      title: string;
      items: {
        number: string;
        title: string;
        duration: string;
        accent?: SlideAccent;
      }[];
    } & SlideBrand)
  | ({
      layout: "diagrams";
      eyebrow?: string;
      title: string;
      subtitle?: string;
      diagrams: {
        caption: string;
        src: string;
        alt?: string;
        accent?: SlideAccent;
      }[];
      footnote?: string;
    } & SlideBrand)
  | ({
      layout: "agent-questionnaire";
      eyebrow?: string;
      title: string;
      intro: string;
      questions: {
        number: string;
        icon: string;
        title: string;
        prompt: string;
        format: "fill-blanks" | "list" | "scale" | "nickname" | "short";
        accent?: SlideAccent;
        template?: string;
        listCount?: number;
        scaleMax?: number;
      }[];
      printUrl?: string;
      driveUrl?: string;
      driveQrSrc?: string;
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
        brand: {
          astro: { variant: "agent-astro-20-l", side: "right", bottom: "-30px", size: 360 },
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "6%",  size: 48, rotate: 12 },
            { variant: "blue-inclined",   side: "left",  top: "92%", size: 30, rotate: -10 },
            { variant: "yellow-inclined", side: "right", top: "4%",  size: 34, rotate: 22 },
          ],
        },
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
        brand: {
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "10%", size: 40, rotate: 14 },
            { variant: "blue-inclined",   side: "left",  top: "78%", size: 28, rotate: -12 },
          ],
        },
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
        brand: {
          sparkles: [
            { variant: "yellow-main", side: "right", top: "8%", size: 38, rotate: 12 },
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
            body: "Meta: +15% de crecimiento. Canal Masivo creció 11% en ferreterías en 2025 con herramientas insuficientes. Agentforce SDR + Salesforce Maps + Slack como sistema operativo del asesor capturan ese crecimiento de forma sistemática.",
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
        products: ["Sales", "Agentforce", "Slack", "Marketing", "Data Cloud", "Service"],
        brand: {
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "8%",  size: 42, rotate: 12 },
            { variant: "yellow-inclined", side: "right", top: "78%", size: 28, rotate: -14 },
          ],
        },
      },

      // ── SLIDE 5 · Visión de la solución ──────────────────────────────
      {
        layout: "section",
        eyebrow: "La propuesta — 20 iniciativas sobre 3 pilares",
        title: "Cada capa de la plataforma responde a una brecha estratégica de Argos",
        subtitle:
          "Pilar 1: Sales Cloud + Agentforce SDR + Maps + Slack · Pilar 2: Marketing Cloud + Data Cloud · Pilar 3: MuleSoft + Service Cloud + WhatsApp API",
        products: ["Sales", "Agentforce", "Slack", "Marketing", "Data Cloud", "Service"],
        brand: {
          astro: { variant: "agent-astro-10-r", side: "right", bottom: "-50px", size: 230 },
          sparkles: [
            { variant: "yellow-main",     side: "left", top: "14%", size: 44, rotate: 14 },
            { variant: "yellow-inclined", side: "left", top: "72%", size: 28, rotate: -10 },
          ],
        },
      },

      // ── SLIDE 6 · Excelencia Comercial ────────────────────────────────
      {
        layout: "split",
        eyebrow: "Pilar 1 — Sales Cloud + Agentforce SDR + Salesforce Maps + Slack",
        title: "Market Share — capturar el +15% con herramientas a la altura de la ambición",
        left: {
          heading: "Iniciativas clave",
          items: [
            "Agentforce SDR: monitorea Galería Inmobiliaria, Licitacion.info y Secop — oportunidades automáticas en Salesforce",
            "Salesforce Maps: plan de visitas optimizado por ruta y territorio con registro offline y Voice-to-Form",
            "RADAR de clientes en riesgo integrado en CRM con acciones sugeridas automáticas",
            "Vista 360 + pedido sugerido Einstein AI — asesor llega preparado a cada visita",
            "Dashboards en tiempo real por nivel jerárquico (asesor, jefe de zona, dirección)",
            "Slack como sistema operativo del asesor: ciclo de venta completo en una sola interfaz — crear, modificar y actualizar oportunidades del CRM, dejar registro de cada visita y conversar con Slackbot sin salir de Slack",
          ],
        },
        right: {
          heading: "KPIs del Pilar 1",
          items: [
            "Market share: +11% base 2025 → +13% (6 meses) → +15% meta SPRINT (12 meses)",
            "Oportunidades automáticas: 0% → 30%+ (6m) → 60%+ (12m)",
            "Cobertura plan de visitas: parcial → 85% (6m) → 95%+ (12m)",
            "Clientes en riesgo gestionados: sin seguimiento → RADAR 100% → reducción fuga >20%",
            "Adopción Slack del equipo comercial: 0 → 60% (6m) → 90%+ con Slackbot guiando el flujo (12m)",
          ],
        },
        products: ["Sales", "Agentforce", "Slack"],
        brand: {
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "12%", size: 40, rotate: 12 },
            { variant: "yellow-inclined", side: "left",  top: "82%", size: 28, rotate: -10 },
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
        products: ["Marketing", "Data Cloud", "Agentforce"],
        brand: {
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "10%", size: 38, rotate: 12 },
            { variant: "blue-inclined",   side: "right", top: "78%", size: 28, rotate: -14 },
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
        products: ["Service", "Agentforce", "Data Cloud"],
        brand: {
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "10%", size: 38, rotate: 14 },
            { variant: "yellow-inclined", side: "left",  top: "78%", size: 28, rotate: -10 },
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
            label: "Adopción Slack del equipo comercial",
            baseline: "0% — sin Slack como SO del asesor",
            goal6m: "60% del equipo gestionando ciclo en Slack",
            goal12m: "90%+ con Slackbot guiando el flujo",
            accent: "indigo",
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
          { value: "90%+", label: "Asesores gestionando el ciclo de venta en Slack (P1)" },
          { value: "6+", label: "Campañas Machine Sellers activas (P2)" },
          { value: "100%", label: "Argos ONE integrado en Salesforce vía MuleSoft (P3)" },
          { value: "+8 pts", label: "NPS post-interacción (P3)" },
        ],
        brand: {
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "8%",  size: 40, rotate: 12 },
            { variant: "blue-inclined",   side: "right", top: "82%", size: 28, rotate: -10 },
          ],
        },
      },

      // ── SLIDE 11 · Por qué 2026 ───────────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Timing estratégico — Por qué los 3 pilares son urgentes en 2026",
        title: "El momento es estratégico — cada mes de espera tiene un costo real",
        bullets: [
          "P1 — Canal ferreterías creció 11% en 2025 con herramientas insuficientes. Con Maps + Agentforce + Slack como SO del asesor, la meta del +15% es alcanzable este ciclo.",
          "P1 — SPRINT 4.0 exige márgenes EBITDA 24-26%: la eficiencia comercial no es opcional, es una obligación estratégica.",
          "P2 — Cada mes sin Machine Sellers automatizado es un mes donde los competidores pueden activar clientes inactivos de Argos antes que Argos misma.",
          "P3 — Argos ONE ya genera el 40%+ de ventas. Cada día sin integración con Salesforce es un día donde servicio opera a ciegas frente al comportamiento digital del cliente.",
          "General — Agentforce for Manufacturing disponible con habilidades preconfiguradas. El time-to-value es significativamente menor que hace 12 meses.",
        ],
        highlight: "La base de clientes ya existe en Salesforce. El costo marginal de activar los tres pilares es mínimo comparado con construir desde cero.",
        brand: {
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "10%", size: 40, rotate: 14 },
            { variant: "yellow-inclined", side: "left",  top: "76%", size: 28, rotate: -10 },
          ],
        },
      },

      // ── SLIDE 12 · El journey del asesor ─────────────────────────────
      {
        layout: "comparison",
        eyebrow: "Antes y después — el día a día del asesor de campo (Pilar 1)",
        title: "Cuando el CRM trabaja para el asesor, el asesor captura el +15%",
        before: {
          heading: "Asesor hoy",
          items: [
            "Empieza el día revisando WhatsApp, correo y un Excel — sin un lugar único para foco, tareas y agenda",
            "Prepara cada reunión manualmente — busca histórico, cartera y cupo en sistemas distintos",
            "Construye su ruta de visitas manualmente — sin optimización de territorio",
            "No sabe si el cliente tiene PQR abierta ni si bajó su volumen de compra",
            "Reporta en Excel al final del día — el gerente lo ve al día siguiente con 24h+ de rezago",
            "Salta entre apps: CRM, correo, WhatsApp, Excel — la información de cada cliente vive en un sistema distinto",
          ],
        },
        after: {
          heading: "Asesor con Pilar 1 activado",
          items: [
            "Abre Slack y va a la pestaña Hoy — foco, tareas, agenda y alertas RADAR en una sola pantalla",
            "Pide 'preparar reunión' y Slackbot devuelve briefing + Vista 360 + RADAR del día en el mismo chat",
            "Ruta optimizada por Salesforce Maps con ciclos por territorio y registro offline",
            "Vista 360 conversacional dentro de Slack — sin abrir el CRM, sin pestañas múltiples",
            "Registra cada visita y actualiza oportunidades desde Slack — Slackbot lo guía paso a paso",
            "Pipeline del gerente actualizado en tiempo real — el resumen ejecutivo del viernes llega solo a Slack",
          ],
        },
        brand: {
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "10%", size: 40, rotate: 12 },
            { variant: "yellow-inclined", side: "left",  top: "82%", size: 28, rotate: -10 },
          ],
        },
      },

      // ── SLIDE 12b · Slack-first storyboard ────────────────────────────
      {
        layout: "split",
        eyebrow: "Pilar 1 · Storyboard — el día de Carlos antes de visitar a Don Hernán",
        title: "Slack como sistema operativo del asesor — la historia en tres pasos",
        left: {
          heading: "Paso 1 · Pestaña Hoy",
          items: [
            "Carlos abre Slack en su celular antes del primer café",
            "La pestaña 'Hoy' le muestra foco, tareas pendientes y calendario",
            "Aparece la reunión 09:30 a.m. con Hernán Ríos — y un sugerido: '¿quieres prepararla?'",
            "Sin abrir CRM, correo ni WhatsApp — un solo lugar para arrancar el día",
          ],
        },
        right: {
          heading: "Pasos 2 y 3 · Slackbot + Vista 360",
          items: [
            "Carlos hace click en 'preparar reunión' — Slackbot devuelve briefing completo + link RADAR",
            "Esa misma alerta RADAR también puede llegarle a Slack en cualquier momento del día",
            "Carlos pide '@Slackbot dame la 360 de Hernán Ríos' — la respuesta cabe en una sola pantalla",
            "Histórico, cartera, cupo, Argos ONE: todo dentro del chat — sin necesidad de ir al CRM",
          ],
        },
        products: ["Slack", "Agentforce"],
        brand: {
          sparkles: [
            { variant: "blue-inclined",   side: "right", top: "8%",  size: 36, rotate: 14 },
            { variant: "yellow-inclined", side: "left",  top: "80%", size: 28, rotate: -12 },
          ],
        },
      },

      // ── SLIDE 13 · Cita ejecutiva ─────────────────────────────────────
      {
        layout: "quote",
        quote: "Market Share. Segmentación. Integración. Tres pilares, una plataforma, un socio.",
        context: "Plan de Cuenta Estratégico v2.0 · Grupo Argos / Cementos Argos S.A. · Salesforce · Mayo 2026",
        brand: {
          astro: { variant: "agent-astro-12-r", side: "left", bottom: "-30px", size: 220 },
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "20%", size: 44, rotate: 12 },
            { variant: "yellow-inclined", side: "right", top: "70%", size: 28, rotate: -18 },
          ],
        },
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
          "Demo Slack como SO del asesor (Jul 2026) — flujo completo del ciclo de venta en Slack con Slackbot y conectores nativos a Sales Cloud",
          "Discovery Segmentación P2 (Jul 2026) — workshop Marketing: inventario de segmentos, campañas y trazabilidad deseada",
          "Business Case (Ago 2026) — cuantificación de ROI por pilar con métricas reales para CFO/CTO",
          "Kick-off Pilot Zona (Sep 2026) — implementación piloto en zona ferreterías con los 3 pilares activos",
        ],
        cta: "¿Agendamos el Executive Briefing con los stakeholders clave esta semana?",
        brand: {
          astro: { variant: "agent-astro-10-l", side: "right", bottom: "-50px", size: 230 },
          sparkles: [
            { variant: "yellow-main",     side: "left", top: "12%", size: 44, rotate: 14 },
            { variant: "yellow-inclined", side: "left", top: "70%", size: 28, rotate: -10 },
          ],
        },
      },

      // ── SLIDE 15 · Gracias ────────────────────────────────────────────
      {
        layout: "thanks",
        eyebrow: "Salesforce · Grupo Argos / Cementos Argos S.A.",
        title: "Gracias",
        subtitle: "Market Share. Segmentación. Integración. Tres pilares, una plataforma, un socio.",
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
  {
    slug: "executive",
    customerSlug: "betterware",
    title: "Deck Ejecutivo — Aliada Digital",
    subtitle: "Resolver · Acompañar · Hacer crecer — la nueva experiencia de la Distribuidora",
    duration: "18 min",
    slides: [
      // ── 1 · Portada ────────────────────────────────────────────────────
      {
        layout: "title",
        eyebrow: "Betterware de México · BeFra",
        title: "Aliada\nDigital.",
        subtitle:
          "Un ecosistema agéntico que conoce, guía y hace crecer a cada Distribuidora Independiente — con Agentforce, Service Cloud, Data Cloud y Marketing Cloud.",
        footnote: "Comité Directivo · Confidencial · Junio 2026",
        brand: {
          astro: { variant: "agent-astro-20-l", side: "right", bottom: "-30px", size: 360 },
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "6%",  size: 48, rotate: 12 },
            { variant: "blue-inclined",   side: "left",  top: "92%", size: 30, rotate: -10 },
            { variant: "yellow-inclined", side: "right", top: "4%",  size: 34, rotate: 22 },
          ],
        },
      },

      // ── 2 · Betterware en números ─────────────────────────────────────
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

      // ── 3 · La oportunidad ────────────────────────────────────────────
      {
        layout: "section",
        eyebrow: "La oportunidad",
        title: "Pasar de un soporte reactivo y fragmentado a un acompañamiento inteligente, proactivo y personalizado.",
        subtitle:
          "La peor experiencia para una DS no es solo tener un problema operativo. Es no saber a quién acudir, recibir información confusa y sentir que la empresa no entiende su rol como emprendedora.",
        brand: {
          astro: { variant: "astro-7", side: "left", bottom: "-50px", size: 230 },
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "16%", size: 44, rotate: 12 },
            { variant: "yellow-inclined", side: "right", top: "70%", size: 28, rotate: -18 },
          ],
        },
      },

      // ── 4 · Hallazgo del workshop ─────────────────────────────────────
      {
        layout: "comparison",
        eyebrow: "Antiexperience Workshop · 29-may-2026",
        title: "Lo que la propia organización dijo sobre la experiencia de la DS hoy",
        before: {
          heading: "5 problemas críticos identificados",
          items: [
            "1 · Resolución operativa deficiente — la DS depende de personas y directorios para resolver",
            "2 · Información confusa o no disponible — saturación, contradicciones, lenguaje complejo",
            "3 · Experiencia emocional débil — atención sin empatía, sensación de desconexión",
            "4 · Procesos complejos y sistemas desconectados — datos desactualizados, fricción con Kitspay",
            "5 · Onboarding insuficiente — los 6 primeros meses sin acompañamiento adecuado",
          ],
        },
        after: {
          heading: "La prioridad #1 (3 puntos rojos)",
          items: [
            "Resolver en Primer Contacto — eje del MVP de Agentforce",
            "Ataca dolor emocional (Área 3) y operativo (Áreas 1, 2 y 4) al mismo tiempo",
            "Reduce fricción visible para la DS y libera al staff para casos de alta complejidad",
            "Genera métricas rápidas (8-12 semanas) y crea base técnica para evolucionar",
            "Es lo que el propio equipo de Betterware votó como el cambio más urgente",
          ],
        },
        brand: {
          sparkles: [
            { variant: "yellow-main", side: "right", top: "8%", size: 38, rotate: 12 },
          ],
        },
      },

      // ── 5 · Principio rector ──────────────────────────────────────────
      {
        layout: "quote",
        quote:
          "La Distribuidora no debería tener que saber qué sistema consultar, a quién escribirle o cómo formular técnicamente su problema. Debería poder expresar su necesidad en lenguaje natural y recibir una respuesta clara, confiable y accionable.",
        context: "Principio rector · Aliada Digital · Betterware",
        brand: {
          astro: { variant: "agent-astro-12-r", side: "left", bottom: "-30px", size: 220 },
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "20%", size: 44, rotate: 12 },
            { variant: "yellow-inclined", side: "right", top: "70%", size: 28, rotate: -18 },
          ],
        },
      },

      // ── 6 · Resolver, explicar, acompañar, escalar ────────────────────
      {
        layout: "pillars",
        eyebrow: "Las 4 capacidades fundamentales de Agentforce",
        title: "Resolver primero · Explicar simple · Acompañar siempre · Escalar solo cuando sea necesario",
        pillars: [
          {
            title: "1 · Entender intención real",
            body: "Aunque la pregunta de la DS venga incompleta, mal redactada o expresada en lenguaje cotidiano. Sin formularios cuadrados ni jerga técnica.",
            accent: "indigo",
          },
          {
            title: "2 · Consultar información confiable",
            body: "En tiempo real, desde las fuentes correctas: knowledge aprobado, datos transaccionales, reglas vigentes, Data Cloud, APIs oficiales.",
            accent: "violet",
          },
          {
            title: "3 · Ejecutar acciones permitidas",
            body: "Mediante flujos, APIs e integraciones controladas — con límites explícitos y auditoría completa.",
            accent: "sky",
          },
          {
            title: "4 · Escalar con contexto completo",
            body: "Cuando el caso requiera intervención humana, el agente humano recibe resumen, intención clasificada y siguiente acción recomendada.",
            accent: "emerald",
          },
        ],
      },

      // ── 7 · Presentación del Blueprint ────────────────────────────────
      {
        layout: "section",
        eyebrow: "La propuesta",
        title: "Aliada Digital · 4 componentes que trabajan juntos",
        subtitle:
          "No es un chatbot. Es un sistema inteligente con cuatro piezas: Agente DS 360 + Copiloto Staff 360 + Capa de datos DS 360 + Orquestación proactiva de journeys.",
        products: ["Agentforce", "Service", "Data Cloud", "Marketing", "Tableau"],
        brand: {
          astro: { variant: "agent-astro-10-r", side: "right", bottom: "-50px", size: 230 },
          sparkles: [
            { variant: "yellow-main",     side: "left", top: "14%", size: 44, rotate: 14 },
            { variant: "yellow-inclined", side: "left", top: "72%", size: 28, rotate: -10 },
          ],
        },
      },

      // ── 8 · Componente 01 · Agente DS 360 ─────────────────────────────
      {
        layout: "split",
        eyebrow: "Componente 01 · Agente externo · Distribuidora",
        title: "Agente DS 360 — Asistente Inteligente para Distribuidoras",
        left: {
          heading: "Capacidades principales",
          items: [
            "A · Resolución en primer contacto: pedido incompleto, saldo, devolución, cargo, regla",
            "B · Consulta de pedidos, devoluciones y saldos en lenguaje claro",
            "C · Acompañamiento de objetivos: avance, brecha, recomendaciones, alertas",
            "D · Explicación simple de reglas comerciales con ejemplos aplicados a la DS",
            "E · Onboarding guiado en los 6 meses críticos · F · Capacitación integrada al flujo",
          ],
        },
        right: {
          heading: "Disponibilidad",
          items: [
            "WhatsApp · canal prioritario del modelo de venta directa",
            "Portal / App de Distribuidoras · Web chat autenticado",
            "24/7 · sin horarios pico · sin saturación",
            "Lenguaje natural — la DS habla como habla",
            "Escalación inteligente con resumen automático al humano",
          ],
        },
        products: ["Agentforce", "Service", "Data Cloud"],
      },

      // ── 9 · Componente 02 · Copiloto Staff 360 ────────────────────────
      {
        layout: "split",
        eyebrow: "Componente 02 · Copiloto interno · Staff",
        title: "Copiloto Staff 360 — Asistente Interno para Atención y Operaciones",
        left: {
          heading: "Capacidades principales",
          items: [
            "A · Resumen DS 360: perfil, antigüedad, ventas, objetivos, pedidos, saldos, recurrencia",
            "B · Asistencia en la atención: sugiere respuestas, explica contexto, recomienda acciones",
            "C · Reducción de escalaciones: valida políticas, casos previos, knowledge antes de escalar",
            "D · Empatía asistida: adapta tono y respuesta según historial de la DS",
          ],
        },
        right: {
          heading: "Impacto en operación",
          items: [
            "Calidad de atención más alta · staff con contexto completo desde el primer segundo",
            "Reducción de tiempo promedio de resolución",
            "Menos escalaciones innecesarias entre niveles",
            "Reducción de reprocesos · mejora de satisfacción del staff",
            "Disponible en Salesforce Console, Slack y Tableau Next",
          ],
        },
        products: ["Agentforce", "Service", "Slack", "Tableau"],
      },

      // ── 10 · Componente 03 · Capa de datos DS 360 ─────────────────────
      {
        layout: "split",
        eyebrow: "Componente 03 · Plataforma transversal",
        title: "Capa de datos e inteligencia DS 360",
        left: {
          heading: "Entidades unificadas",
          items: [
            "Perfil DS — ID, región, antigüedad, clasificación, segmento, canal preferido, madurez digital",
            "Actividad comercial — ventas, objetivo vigente, avance, brecha, ticket, tendencia",
            "Pedidos y entregas — pedidos recientes, faltantes, devoluciones, incidencias",
            "Saldos y transacciones — saldo actual, pagos, cargos, abonos, fechas de corte",
            "Interacciones y casos — sentimiento, recurrencia, escalaciones, motivos de contacto",
            "Capacitación y onboarding — etapa, contenidos completados, hitos, alertas de riesgo",
          ],
        },
        right: {
          heading: "Habilita",
          items: [
            "Personalización en cada respuesta del Agente DS 360",
            "Segmentación accionable para Marketing y Customer Success",
            "Priorización del Copiloto Staff cuando atiende casos",
            "Comunicación proactiva basada en señales reales de comportamiento",
            "Predicciones de churn y next best action (Fase 4)",
          ],
        },
        products: ["Data Cloud", "Service", "Sales"],
      },

      // ── 11 · Componente 04 · Orquestación proactiva ───────────────────
      {
        layout: "split",
        eyebrow: "Componente 04 · Orquestación proactiva",
        title: "Marketing & Journeys — Acompañamiento antes de que el problema aparezca",
        left: {
          heading: "Activaciones",
          items: [
            "Onboarding journeys por etapa: 6 momentos clave en los primeros 6 meses",
            "Recordatorios y alertas: fechas de corte, brecha de objetivo, capacitaciones pendientes",
            "Comunicación segmentada por antigüedad, comportamiento y canal preferido",
            "Prevención de abandono disparada por señales de Data Cloud",
            "Reactivación de DS inactivas con mensajes contextualizados",
          ],
        },
        right: {
          heading: "Canales y resultado",
          items: [
            "WhatsApp · Email · SMS · Push — cada DS por su canal preferido",
            "La DS recibe lo que necesita antes de tener que pedirlo",
            "Reduce contactos reactivos · libera capacidad operativa",
            "Mejora activación temprana y retención en el journey crítico",
            "Engagement con contenidos de capacitación medible",
          ],
        },
        products: ["Marketing", "Data Cloud", "Agentforce"],
      },

      // ── 12 · Tópicos del Agente DS 360 ────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Diseño Agentforce · Tópicos del Agente DS 360",
        title: "6 tópicos con acciones permitidas y límites explícitos",
        bullets: [
          "Tópico 1 · Consulta de pedidos — buscar pedido, validar faltantes, crear caso. Límite: no prometer compensaciones sin validación.",
          "Tópico 2 · Saldos y transacciones — consultar saldo, pagos, cargos, abonos. Límite: no modificar saldos directamente, no prometer ajustes.",
          "Tópico 3 · Objetivos y crecimiento — calcular avance, explicar brecha, recomendar acciones. Límite: no inventar metas, no presentar proyecciones como garantía.",
          "Tópico 4 · Reglas comerciales — buscar artículo, resumir regla, dar ejemplo aplicado. Límite: solo fuentes aprobadas, mostrar fecha de vigencia.",
          "Tópico 5 · Onboarding y capacitación — identificar etapa, recomendar siguiente paso, enviar microcontenido. Límite: no saturar, adaptar al nivel digital.",
          "Tópico 6 · Escalación inteligente — crear caso, clasificar motivo, resumir conversación. Límite: no transferir sin intentar resolver, no perder contexto.",
        ],
        highlight:
          "Cada tópico está acotado con políticas explícitas. Esto es lo que diferencia a un sistema inteligente con guardrails de un chatbot que improvisa.",
      },

      // ── 13 · Confianza y gobernanza ───────────────────────────────────
      {
        layout: "pillars",
        eyebrow: "Capa de confianza, seguridad y gobernanza",
        title: "Cuatro controles explícitos para que Agentforce sea confiable en producción",
        pillars: [
          {
            title: "🔐 Autenticación",
            body: "Validación de identidad por canal seguro, número telefónico asociado, OTP cuando aplique, control de acceso por perfil y restricción de datos por DS ID.",
            accent: "indigo",
          },
          {
            title: "📚 Grounding",
            body: "Respuestas solo desde knowledge aprobado, datos transaccionales, reglas vigentes y APIs oficiales. Nunca conocimiento genérico para políticas, saldos o compensaciones.",
            accent: "violet",
          },
          {
            title: "🤝 Human-in-the-loop",
            body: "Reglas claras de escalación: discrepancia financiera, reclamo repetido, frustración alta, excepción comercial, riesgo reputacional.",
            accent: "sky",
          },
          {
            title: "📋 Auditoría",
            body: "Cada interacción registra intención detectada, datos consultados, respuesta entregada, acción ejecutada, nivel de confianza y feedback de la DS.",
            accent: "emerald",
          },
        ],
      },

      // ── 14 · MVP recomendado ──────────────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Recomendación · MVP de 8 a 12 semanas",
        title: "MVP · Resolución en Primer Contacto para DS",
        bullets: [
          "INCLUYE — Consulta de pedido · Pedido incompleto · Consulta de saldo · Explicación de transacciones",
          "INCLUYE — Consulta de objetivo · Explicación de reglas comerciales frecuentes",
          "INCLUYE — Creación de caso con resumen automático · Escalación inteligente con contexto",
          "EXCLUYE — Predicción avanzada de churn, recomendaciones comerciales complejas, modificación directa de saldos",
          "EXCLUYE — Onboarding completo de 6 meses, optimización avanzada de cartera, automatización de procesos no documentados",
        ],
        highlight:
          "Este MVP ataca directamente la prioridad máxima del taller, reduce fricción visible, genera métricas rápidas y crea la base técnica para evolucionar hacia DS 360, onboarding y comunicación proactiva.",
      },

      // ── 15 · Roadmap de 4 fases ───────────────────────────────────────
      {
        layout: "kpi-table",
        eyebrow: "Roadmap evolutivo · 4 fases",
        title: "De resolver problemas a anticiparlos y recomendar acciones de crecimiento",
        rows: [
          {
            label: "Fase 1 · MVP — Resolver en Primer Contacto",
            baseline: "8-12 semanas",
            goal6m: "FCR medible · contención sin humano",
            goal12m: "Base técnica DS 360 lista",
            accent: "indigo",
          },
          {
            label: "Fase 2 · DS 360 y Staff Copilot",
            baseline: "Tras MVP",
            goal6m: "Vista 360 staff · resúmenes auto",
            goal12m: "Reducción TPR · escalaciones",
            accent: "violet",
          },
          {
            label: "Fase 3 · Onboarding inteligente y comunicación proactiva",
            baseline: "Activación cohortes nuevas",
            goal6m: "Journeys 6 meses activos",
            goal12m: "Reducción deserción · mayor adopción",
            accent: "sky",
          },
          {
            label: "Fase 4 · Inteligencia predictiva y optimización comercial",
            baseline: "Datos maduros",
            goal6m: "Churn risk · NBA piloto",
            goal12m: "Reducción churn · uplift ventas",
            accent: "emerald",
          },
        ],
      },

      // ── 16 · KPIs ─────────────────────────────────────────────────────
      {
        layout: "metrics",
        eyebrow: "KPIs recomendados",
        title: "Cómo se mide el éxito",
        metrics: [
          { value: "FCR ↑", label: "% Resolución en primer contacto" },
          { value: "TMR ↓", label: "Tiempo promedio de respuesta y resolución" },
          { value: "Escal. ↓", label: "Reducción de escalaciones a humano" },
          { value: "CSAT ↑", label: "Satisfacción de la DS por interacción" },
          { value: "Churn ↓", label: "Reducción de deserción primeros 6 meses" },
          { value: "Adopción ↑", label: "% DS autosuficientes · uso por canal" },
        ],
      },

      // ── 17 · Cierre y próximos pasos ──────────────────────────────────
      {
        layout: "closing",
        title: "Próximos pasos recomendados",
        bullets: [
          "Aprobación ejecutiva del programa Aliada Digital y del MVP de Resolución en Primer Contacto.",
          "Discovery técnico (Jul 2026) — disponibilidad de datos, integraciones y reglas comerciales documentadas.",
          "Workshop de tópicos y límites (Jul 2026) — con Operaciones, Atención y Cenapia para validar acciones permitidas.",
          "Build del MVP (Ago-Oct 2026) — Agente DS 360 en canal prioritario con 6 tópicos y casos top.",
          "Piloto controlado (Nov 2026) — cohorte de DS con métricas instrumentadas (FCR, contención, CSAT).",
          "Plan de Fase 2 (Dic 2026) — DS 360 y Staff Copilot · base lista para acompañamiento proactivo.",
        ],
        cta: "¿Avanzamos con el MVP de Resolución en Primer Contacto en una cohorte piloto de DS?",
      },

      // ── 18 · Cierre narrativa ─────────────────────────────────────────
      {
        layout: "thanks",
        eyebrow: "Salesforce · Betterware de México (BeFra)",
        title: "Gracias",
        subtitle:
          "La experiencia ideal no es que la DS contacte menos a Betterware porque se resignó. Es que contacte menos porque ahora sí puede resolver, entender y avanzar con autonomía.",
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

  // ───────────────────────────────────────────────────────────────────
  // BETTERWARE · JTBD DECK · Jobs To Be Done
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "jtbd",
    customerSlug: "betterware",
    title: "Jobs To Be Done — Betterware DS",
    subtitle: "Insights, Journey & Roadmap — sesión post-workshop + visita en calle",
    duration: "14 min",
    slides: [
      // ── 1 · Portada ────────────────────────────────────────────────────
      {
        layout: "title",
        eyebrow: "Betterware · Distribuidora Independiente",
        title: "Jobs\nTo Be Done.",
        subtitle:
          "El segundo ejercicio de descubrimiento — workshop JTBD del 14-may-2026 + visita en calle a distribuidoras reales. Foco: la Distribuidora Nueva.",
        footnote: "EA Lead · Rina Margarita Suarez · Junio 2026",
        brand: {
          astro: { variant: "agent-astro-10-l", side: "right", bottom: "-30px", size: 340 },
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "8%",  size: 48, rotate: 14 },
            { variant: "blue-inclined",   side: "left",  top: "90%", size: 30, rotate: -10 },
            { variant: "yellow-inclined", side: "right", top: "6%",  size: 34, rotate: 22 },
          ],
        },
      },

      // ── 2 · Por qué este ejercicio ────────────────────────────────────
      {
        layout: "section",
        eyebrow: "Por qué este ejercicio",
        title: "El workshop reveló los problemas. La calle reveló por qué siguen ahí.",
        subtitle:
          "El workshop nos dio los datos cuantitativos. La visita en calle nos mostró la mamá de linaje, el papel y lápiz, los tips de venta — todo lo que ningún sistema captura hoy.",
        brand: {
          astro: { variant: "astro-7", side: "left", bottom: "-50px", size: 230 },
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "16%", size: 44, rotate: 12 },
            { variant: "yellow-inclined", side: "right", top: "70%", size: 28, rotate: -18 },
          ],
        },
      },

      // ── 3 · Resumen de hallazgos en 6 frases bandera ─────────────────
      {
        layout: "metrics",
        eyebrow: "Las cifras que definen el problema",
        title: "Seis números que cambian la conversación",
        metrics: [
          { value: "40–48%", label: "DS no realizan su primer pedido" },
          { value: "52–60%", label: "No logran primer pedido en 2 semanas" },
          { value: "42%", label: "Completitud actual del formulario de alta" },
          { value: "30%", label: "Asociadas que arman pedido en la app" },
          { value: "25%", label: "Altas con problemas de documentación" },
          { value: "0%", label: "Mamás de linaje visibles en el sistema hoy" },
        ],
      },

      // ── 4 · Perfil de la DS Nueva ─────────────────────────────────────
      {
        layout: "pillars",
        eyebrow: "Perfil de la Distribuidora Nueva",
        title: "Quién es. Qué siente. Cómo usa la tecnología.",
        pillars: [
          {
            title: "Quién es",
            body: "Mujer (90%), mamá o ama de casa, sin experiencia formal en ventas. Su red social primaria son familia, vecinas y amigas. Su canal natural es WhatsApp.",
            accent: "indigo",
          },
          {
            title: "Qué siente al inicio",
            body: "Entusiasmo mezclado con miedo. Confusión por la cantidad de información. Ansiedad por el pedido mínimo de $2,500 MXN. Pena para prospectar. Dependencia emocional de su mamá de linaje.",
            accent: "violet",
          },
          {
            title: "Su relación con la tecnología",
            body: "WhatsApp intensivamente. La app de Better solo para hacer pedidos. Lleva el control de sus clientas en papel. No consulta métricas ni reportes.",
            accent: "sky",
          },
        ],
      },

      // ── 5 · Insights del Workshop ────────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Insights del Workshop · Equipo Betterware",
        title: "Lo que el equipo reconoció en sesión",
        bullets: [
          "El mayor riesgo no es el alta, es la activación — 40-48% nunca hacen primer pedido",
          "Motivación 80% emocional + incentivos, 20% económica — premios y reconocimiento ganan al ingreso",
          "Alta manual: 10 personas, 3 turnos, 25% con problemas de documentación, solo 10% se recupera",
          "La app no engancha — notificaciones \"casi no se abren\", carrito eliminado semanalmente",
          "Staff sin trazabilidad — 90% del trabajo en campo, sin registro sistemático",
          "Capacitación con consumo muy bajo — sin onboarding estandarizado ni automatizado",
        ],
        highlight: "Diagnóstico cuantitativo del propio equipo de Betterware (29-may-2026)",
      },

      // ── 6 · Insights de Visita en Calle ─────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Insights de Visita en Calle · Cualitativos",
        title: "Lo que solo se ve caminando con una distribuidora",
        bullets: [
          "La mamá de linaje es el sistema nervioso de la red — y opera fuera de cualquier sistema de Better",
          "WhatsApp es el canal real de la relación. La app es solo para pedidos",
          "La logística de entrega es una barrera real — sin solución para asociadas lejos de casa",
          "Reclutar es doloroso — pena, falta de pitch, desconfianza del prospecto al modelo",
          "Los tips de venta son el contenido más valioso — un consejo práctico vence a un módulo de capacitación",
          "El control de clientas es papel y lápiz — no consultan la app para esto",
          "Las distribuidoras no saben que hay asesores, promotores, ni instalaciones que pueden visitar",
          "Hay distribuidoras influencers creando contenido solas — un activo que Better no habilita ni potencia",
        ],
        highlight: "Activos invisibles para los datos. Decisivos para la retención.",
      },

      // ── 7 · Funnel de 6 etapas ───────────────────────────────────────
      {
        layout: "split",
        eyebrow: "Funnel de la Distribuidora Nueva",
        title: "6 etapas con dos perspectivas: la DS y Better",
        left: {
          heading: "Etapas (KPI crítico)",
          items: [
            "1 · Descubrimiento & Captación — 36–37% prospecto → formulario",
            "2 · Inscripción & Alta — 42% completitud (meta >65%)",
            "3 · Onboarding 2 semanas — 52–60% NO logra primer pedido",
            "4 · Primera Venta & Primer Ingreso — venta + cobro en 4 semanas",
            "5 · Consolidación — recurrencia semanal · retención 90 días",
            "6 · Ascenso & Mamá de Linaje — crecimiento red 2° nivel",
          ],
        },
        right: {
          heading: "Lo que Better debe habilitar (transversal)",
          items: [
            "Onboarding inteligente vía WhatsApp con bienvenida, checklist y tips",
            "Recuperación automática de formularios y validación con IA",
            "Alertas a la mamá cuando la DS no avanza",
            "Simulador de ganancias y notificación de incentivos en tiempo real",
            "Dashboard de red personal y plan comercial digital (reemplazo de Excel)",
            "Consola de linaje formal para la mamá con KPIs y alertas de churn",
          ],
        },
      },

      // ── 8 · AS-IS vs TO-BE ───────────────────────────────────────────
      {
        layout: "comparison",
        eyebrow: "AS-IS vs. TO-BE",
        title: "Cómo cambia la experiencia de la DS en 4 fases",
        before: {
          heading: "AS-IS · Hoy",
          items: [
            "Inscripción: confusión, abrumación, 10 validadores manuales en 3 turnos",
            "Onboarding: nadie le explica cómo hacer el primer pedido — 40-48% nunca lo hace",
            "Primera venta: miedo, inseguridad, \"no sé cómo vender\"",
            "Consolidación: \"no tengo a quién me acompañe\" — papel y lápiz, sin staff con herramientas",
          ],
        },
        after: {
          heading: "TO-BE · Aliada Digital",
          items: [
            "Inscripción: claridad, validación con IA, recuperación de formularios abandonados",
            "Onboarding: Agentforce 24/7 en WhatsApp + alerta a la mamá si no hay avance",
            "Primera venta: emoción y confianza con recomendaciones basadas en datos",
            "Consolidación: felicidad por crecer · staff con herramientas · linaje habilitado",
          ],
        },
      },

      // ── 9 · Gap Analysis · 10 Jobs ───────────────────────────────────
      {
        layout: "split",
        eyebrow: "Gap Analysis · 10 Jobs to Be Done",
        title: "Cinco jobs críticos. Cinco de prioridad alta.",
        left: {
          heading: "Críticos (rojo)",
          items: [
            "Ganar el primer ingreso rápido y sentir que valió la pena",
            "Saber qué hacer cada día para avanzar",
            "Tener a alguien de confianza que me ayude cuando tengo dudas",
            "Reclutar sin sentir pena ni rechazo",
            "Saber que Better me apoya institucionalmente",
          ],
        },
        right: {
          heading: "Prioridad alta (ámbar)",
          items: [
            "Entender cuánto gano y cómo crecer",
            "Gestionar mi cartera de clientas y asociadas",
            "Entregar pedidos sin complicaciones logísticas",
            "Hacer contenido para atraer clientes y reclutas",
            "Tener un plan de crecimiento claro con mi asesora",
          ],
        },
      },

      // ── 10 · Decisión estratégica de canales ─────────────────────────
      {
        layout: "quote",
        quote:
          "WhatsApp debe ser el canal primario de relación. La app debe ser el canal de transacción. No son competidores: son complementarios con roles distintos y claros.",
        context: "Decisión estratégica · Rol de canales · JTBD Betterware",
        brand: {
          astro: { variant: "agent-astro-12-r", side: "left", bottom: "-30px", size: 220 },
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "20%", size: 44, rotate: 12 },
            { variant: "yellow-inclined", side: "right", top: "70%", size: 28, rotate: -18 },
          ],
        },
      },

      // ── 11 · Iniciativas Priorizadas ─────────────────────────────────
      {
        layout: "pillars",
        eyebrow: "10 iniciativas priorizadas",
        title: "Tres olas: fundacional, diferenciación, escalabilidad",
        pillars: [
          {
            title: "P1 · Fundacional",
            body: "(1) Agentforce DS vía WhatsApp · (2) Journey de Onboarding Inteligente · (3) Consola de Linaje para la Mamá. Lanzar en producción.",
            accent: "indigo",
          },
          {
            title: "P2 · Diferenciación",
            body: "(4) Resumen Semanal Personalizado · (5) Kit de Prospección Digital · (6) Plan Comercial Digital (Staff + DS). Primeros 90 días post-producción.",
            accent: "violet",
          },
          {
            title: "P3 · Escalabilidad",
            body: "(7) CRM Simple vía WhatsApp · (8) Mentoras Certificadas · (9) Hub de Contenido para Influencers · (10) Automatización del Alta. Siguiente ciclo de inversión.",
            accent: "sky",
          },
        ],
        products: ["Agentforce", "Service", "Marketing", "Data Cloud", "Tableau"],
      },

      // ── 12 · Roadmap por sprints ─────────────────────────────────────
      {
        layout: "split",
        eyebrow: "Roadmap por Sprints · jun 2026 → feb 2027+",
        title: "De fundación a inteligencia predictiva en 4 sprints",
        left: {
          heading: "Sprint 0 · Fundación y Piloto (jun → jul 2026)",
          items: [
            "Plataforma BEFRA en producción (Service + Marketing + Data Cloud)",
            "Piloto Agentforce WhatsApp con 50–100 DS",
            "Modelo de datos de linaje en Data Cloud",
            "Primeras alertas de riesgo de abandono",
            "Kick-off Consola de Linaje con UX research",
          ],
        },
        right: {
          heading: "Sprint 1 · Activación y Onboarding (ago → oct 2026)",
          items: [
            "Journey de Onboarding Inteligente en producción",
            "Resumen semanal personalizado vía WhatsApp",
            "Consola de Linaje v1 (alertas básicas)",
            "Kit de Prospección Digital v1 (micro-tips)",
            "Plan Comercial Digital con asesoras (sin Excel)",
          ],
        },
      },

      // ── 13 · KPIs de éxito ───────────────────────────────────────────
      {
        layout: "kpi-table",
        eyebrow: "KPIs de éxito del programa",
        title: "Lo que vamos a medir — y contra qué",
        rows: [
          {
            label: "Conversión inscripción → primer pedido",
            baseline: "52–60%",
            goal6m: "65%",
            goal12m: "75%",
            accent: "indigo",
          },
          {
            label: "Completitud del formulario de alta",
            baseline: "42%",
            goal6m: "60%",
            goal12m: "70%",
            accent: "indigo",
          },
          {
            label: "Retención DS nuevas (8 semanas)",
            baseline: "No medido",
            goal6m: "Línea base establecida",
            goal12m: "+15–20 pts",
            accent: "violet",
          },
          {
            label: "Tickets Contact Center (operativos)",
            baseline: "Línea base actual",
            goal6m: "−15%",
            goal12m: "−30%",
            accent: "violet",
          },
          {
            label: "Apertura WhatsApp vs App push",
            baseline: "App: \"casi no se abren\"",
            goal6m: "WhatsApp >40%",
            goal12m: "WhatsApp >60%",
            accent: "sky",
          },
          {
            label: "Mamás de linaje activas en sistema",
            baseline: "0% (sin visibilidad)",
            goal6m: "Piloto: 50–100 mamás",
            goal12m: "20% de la red",
            accent: "emerald",
          },
        ],
      },

      // ── 14 · Cierre y próximos pasos ─────────────────────────────────
      {
        layout: "closing",
        title: "Próximos pasos recomendados",
        bullets: [
          "Validar con el equipo Betterware los hallazgos cualitativos de la visita en calle.",
          "Aprobar el piloto Agentforce WhatsApp (Sprint 0) con cohorte de 50–100 distribuidoras.",
          "Iniciar UX research con mamás de linaje reales para diseñar la Consola.",
          "Instrumentar línea base de retención a 8 semanas — hoy no se mide sistemáticamente.",
          "Definir el modelo de datos de linaje en Data Cloud junto con MuleSoft y Operaciones.",
        ],
        cta: "¿Avanzamos con el Sprint 0 — piloto Agentforce + Consola de Linaje + onboarding inteligente?",
      },

      // ── 15 · Cierre narrativa ────────────────────────────────────────
      {
        layout: "thanks",
        eyebrow: "Salesforce · Betterware de México (BeFra)",
        title: "Gracias",
        subtitle:
          "La DS Nueva no necesita más sistemas. Necesita que el sistema la conozca, le hable como ella habla y la sostenga cuando su mamá de linaje no puede.",
        brand: {
          astro: { variant: "agent-astro-flip-009", side: "right", bottom: "-50px", size: 240 },
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "16%", size: 44, rotate: -10 },
            { variant: "yellow-inclined", side: "left",  top: "70%", size: 28, rotate: 18 },
            { variant: "blue-main",       side: "right", top: "20%", size: 32, rotate: 6 },
          ],
        },
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────
  // BETTERWARE · SPRINT 3 DECK · Inteligencia y Personalización
  // ───────────────────────────────────────────────────────────────────
  {
    slug: "sprint-3",
    customerSlug: "betterware",
    title: "Inteligencia y Personalización",
    subtitle:
      "Contenido base + identidad de cada distribuidora = atribución 1:1",
    duration: "14 min",
    slides: [
      // ── 1 · Portada ────────────────────────────────────────────────────
      {
        layout: "title",
        eyebrow: "Betterware · Sprint 3 del Roadmap",
        title: "Inteligencia\ny Personalización.",
        subtitle:
          "Cada distribuidora se convierte en una influencer digital — sin crear nada desde cero. Un sitio. Un link único. Atribución 1:1.",
        footnote: "Sprint 3 · feb 2027 en adelante · Confidencial",
        brand: {
          astro: { variant: "agent-astro-20-l", side: "right", bottom: "-30px", size: 360 },
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "8%",  size: 48, rotate: 14 },
            { variant: "blue-inclined",   side: "left",  top: "92%", size: 30, rotate: -10 },
            { variant: "yellow-inclined", side: "right", top: "6%",  size: 34, rotate: 22 },
          ],
        },
      },

      // ── 2 · El concepto central ─────────────────────────────────────
      {
        layout: "quote",
        quote:
          "Betterware crea el contenido. Salesforce le da identidad. La distribuidora se convierte en influencer digital — sin crear nada desde cero.",
        context: "El concepto central · Sprint 3",
        brand: {
          astro: { variant: "agent-astro-12-r", side: "left", bottom: "-30px", size: 220 },
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "20%", size: 44, rotate: 12 },
            { variant: "yellow-inclined", side: "right", top: "70%", size: 28, rotate: -18 },
          ],
        },
      },

      // ── 3 · El cambio de enfoque ────────────────────────────────────
      {
        layout: "comparison",
        eyebrow: "El cambio de enfoque",
        title: "De miles de micrositios a un solo sitio que se transforma en tiempo real",
        before: {
          heading: "Antes — Miles de micrositios",
          items: [
            "Una página estática por cada distribuidora",
            "Catálogo que se desactualiza el día siguiente del lanzamiento",
            "Equipo de marketing atrapado en mantenimiento",
            "Difícil de medir y de escalar",
          ],
        },
        after: {
          heading: "Ahora — Un sitio, identidad por distribuidora",
          items: [
            "Una sola landing que mantener",
            "UX unificada con el sitio de Betterware · checkout directo",
            "Atribución limpia entre compra y distribuidora",
            "Cada distribuidora se siente como creadora de contenido",
          ],
        },
      },

      // ── 4 · Roles y jerarquía ───────────────────────────────────────
      {
        layout: "pillars",
        eyebrow: "Roles y jerarquía",
        title: "Tres actores. Cada uno hace lo que mejor sabe hacer.",
        pillars: [
          {
            title: "Betterware",
            body: "Crea el contenido base de la campaña una sola vez. No mantiene una página por distribuidora. Configura la plataforma y deja que el sistema haga el resto.",
            accent: "indigo",
          },
          {
            title: "Distribuidora",
            body: "Recibe por WhatsApp su link único personalizado. Lo comparte con sus asociadas como su propia tienda digital. Cero esfuerzo creativo.",
            accent: "violet",
          },
          {
            title: "Asociada",
            body: "Abre el link y ve la tienda personal de su distribuidora con su mensaje, sus productos top y su CTA. Compra sin salir del sitio de Betterware.",
            accent: "sky",
          },
        ],
      },

      // ── 5 · El flujo en 8 pasos ─────────────────────────────────────
      {
        layout: "split",
        eyebrow: "El flujo de la experiencia",
        title: "8 pasos — del contenido base a la atribución 1:1",
        left: {
          heading: "Pasos 1–4 · Marketing y distribución",
          items: [
            "1 · Marketing crea el contenido base (una sola vez)",
            "2 · Se genera un link único y seguro por distribuidora",
            "3 · Marketing Cloud envía el link por WhatsApp",
            "4 · La distribuidora reenvía a sus asociadas",
          ],
        },
        right: {
          heading: "Pasos 5–8 · Personalización y atribución",
          items: [
            "5 · La asociada hace clic — entra al sitio de Betterware",
            "6 · Salesforce reconoce a la distribuidora desde el link",
            "7 · Data 360 entrega el perfil unificado en milisegundos",
            "8 · La landing se transforma en tiempo real con su identidad",
          ],
        },
        products: ["Marketing", "Data Cloud", "Platform"],
      },

      // ── 6 · María, distribuidora diamante ───────────────────────────
      {
        layout: "section",
        eyebrow: "Storytelling · Lo que ve la asociada",
        title: "María González · Distribuidora Diamante",
        subtitle:
          "La asociada abre el link y entra a una tienda que se siente personal: el nombre de María, su mensaje, sus productos top y su CTA — todo dentro del sitio oficial de Betterware.",
        brand: {
          astro: { variant: "astro-7", side: "left", bottom: "-50px", size: 230 },
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "16%", size: 44, rotate: 12 },
            { variant: "yellow-inclined", side: "right", top: "70%", size: 28, rotate: -18 },
          ],
        },
      },

      // ── 7 · Las 4 zonas de la landing ───────────────────────────────
      {
        layout: "pillars",
        eyebrow: "La landing transformada",
        title: "Cuatro zonas que se renderizan con la identidad de cada distribuidora",
        pillars: [
          {
            title: "1 · Identidad",
            body: "Nombre y badge en el hero — \"María González · Distribuidora Diamante\". La asociada reconoce a quién le compra desde el primer segundo.",
            accent: "indigo",
          },
          {
            title: "2 · Mensaje personal",
            body: "\"Estos productos cambiaron mi vida — y pueden cambiar la tuya.\" La marca presta el contenido base; la distribuidora aporta cercanía.",
            accent: "violet",
          },
          {
            title: "3 · Productos top",
            body: "Grid dinámico con los productos que esa distribuidora vende más, alineados a su perfil y a su región.",
            accent: "sky",
          },
          {
            title: "4 · CTA personal",
            body: "\"Pide con María\" — el llamado se siente personal, no genérico. Hace explícito que esta compra apoya el negocio de su distribuidora.",
            accent: "emerald",
          },
        ],
      },

      // ── 8 · Audiencias de Data 360 ──────────────────────────────────
      {
        layout: "split",
        eyebrow: "Audiencias dinámicas en Data 360",
        title: "Cinco audiencias accionables — el sistema las arma; marketing decide qué decirles",
        left: {
          heading: "Audiencias",
          items: [
            "Top performers digitales — DS con mayor conversión por link",
            "Asociadas que vieron pero no compraron — recuperación",
            "Distribuidoras inactivas con red activa — reactivación",
            "Asociadas leales — embajadoras potenciales para upgrade a DS",
            "Audiencias por región y producto — campañas locales",
          ],
        },
        right: {
          heading: "Cómo se activan",
          items: [
            "Reconocimiento, badges, contenido premium",
            "Recordatorio de carrito por WhatsApp con cupón de la DS",
            "Resumen de su red + oferta de re-onboarding",
            "Invitación a programa de upgrade",
            "Mensaje correcto, en el lugar correcto, con la DS correcta",
          ],
        },
        products: ["Data Cloud", "Marketing"],
      },

      // ── 9 · Atribución directa vs indirecta ─────────────────────────
      {
        layout: "comparison",
        eyebrow: "Atribución 1:1",
        title: "Cada compra deja huella en el perfil — no en una cookie",
        before: {
          heading: "Atribución directa",
          items: [
            "La asociada compra en la misma sesión en que abrió el link",
            "Caso ideal — sesión continua",
            "Atribución inmediata al cierre del pedido",
            "100% trazable sin dependencia del navegador",
          ],
        },
        after: {
          heading: "Atribución indirecta",
          items: [
            "La asociada llega desde el link, no compra, regresa después",
            "Data 360 la reconoce por login, email o teléfono",
            "La atribución vive en el perfil — no se pierde",
            "Funciona aún cambiando de dispositivo o navegador",
          ],
        },
      },

      // ── 10 · El stack ──────────────────────────────────────────────
      {
        layout: "pillars",
        eyebrow: "El stack que lo hace posible",
        title: "Cuatro piezas — cada una hace su trabajo",
        pillars: [
          {
            title: "Marketing Cloud",
            body: "Crea el contenido base, genera los links únicos y los envía por WhatsApp en escala.",
            accent: "indigo",
          },
          {
            title: "Data 360",
            body: "Mantiene el perfil unificado de cada distribuidora, resuelve identidades y guarda la atribución.",
            accent: "violet",
          },
          {
            title: "Salesforce Personalization",
            body: "Transforma la landing en tiempo real con la identidad de cada distribuidora.",
            accent: "sky",
          },
          {
            title: "Sitio de Betterware",
            body: "Es el lienzo donde la experiencia personalizada se renderiza — checkout incluido.",
            accent: "emerald",
          },
        ],
        products: ["Marketing", "Data Cloud", "Platform"],
      },

      // ── 11 · Impacto de negocio ────────────────────────────────────
      {
        layout: "kpi-table",
        eyebrow: "Impacto de negocio",
        title: "Lo que pasa de no medible a medible",
        rows: [
          {
            label: "Tasa de conversión por distribuidora",
            baseline: "No medible — sin link único",
            goal6m: "Visible por DS",
            goal12m: "Comparable entre DS",
            accent: "indigo",
          },
          {
            label: "Ticket promedio por link",
            baseline: "Promedio único de la marca",
            goal6m: "Por DS y por región",
            goal12m: "Por DS, región y producto",
            accent: "indigo",
          },
          {
            label: "Ranking de DS digitales",
            baseline: "Basado en pedido propio",
            goal6m: "Basado en pedido propio + red",
            goal12m: "Basado en lo que cada DS genera con sus asociadas",
            accent: "violet",
          },
          {
            label: "Asociadas activas por DS",
            baseline: "Conteo manual",
            goal6m: "Dashboard semanal",
            goal12m: "Dashboard en tiempo real",
            accent: "violet",
          },
          {
            label: "Comisiones e incentivos",
            baseline: "Sujetas a disputa",
            goal6m: "Reducción de disputas",
            goal12m: "Liquidación automática 1:1 verificable",
            accent: "sky",
          },
          {
            label: "Audiencias activables",
            baseline: "1 lista genérica",
            goal6m: "3 audiencias dinámicas",
            goal12m: "5+ audiencias dinámicas en Data 360",
            accent: "emerald",
          },
        ],
      },

      // ── 12 · Fases de despliegue ───────────────────────────────────
      {
        layout: "split",
        eyebrow: "Fases de despliegue",
        title: "Empieza simple. Escala completo.",
        left: {
          heading: "Fase 1 — Punto de partida (MVP)",
          items: [
            "Sin tocar el sitio de Betterware",
            "Link único por distribuidora vía WhatsApp",
            "Personalización con datos básicos de la DS",
            "Atribución cuando la asociada vuelve al sitio",
            "Valida la mecánica antes de invertir más",
          ],
        },
        right: {
          heading: "Fase 2 — Versión completa (Recomendada)",
          items: [
            "Landing dentro del sitio de Betterware",
            "Identidad por distribuidora en tiempo real",
            "Checkout directo · atribución 1:1 sin saltos",
            "Personalización sin recargar la página",
            "Audiencias dinámicas y campañas multicanal desde Data 360",
          ],
        },
      },

      // ── 13 · Próximos pasos ───────────────────────────────────────
      {
        layout: "closing",
        title: "Próximos pasos recomendados",
        bullets: [
          "Validar el alcance del MVP (Fase 1) con marketing y operaciones de Betterware.",
          "Definir la lista inicial de distribuidoras piloto (50–100) y los productos del catálogo a destacar.",
          "Acordar las primeras 3 audiencias dinámicas a construir en Data 360 — empezar por las que tienen mayor potencial de revenue.",
          "Diseñar el template de WhatsApp y aprobarlo con Meta antes del envío.",
          "Confirmar el equipo dev de Betterware para Fase 2 — Web SDK, zonas personalizables y API de conversión.",
        ],
        cta: "¿Avanzamos con el MVP del Sprint 3 — link único por DS y primera audiencia activa en Data 360?",
      },

      // ── 14 · Cierre narrativa ─────────────────────────────────────
      {
        layout: "thanks",
        eyebrow: "Salesforce · Betterware de México (BeFra)",
        title: "Gracias",
        subtitle:
          "Cada compra sabrá quién la generó. Cada distribuidora se sentirá creadora. Y la marca seguirá hablando con una sola voz — la suya.",
        brand: {
          astro: { variant: "agent-astro-flip-020", side: "right", bottom: "-50px", size: 240 },
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "16%", size: 44, rotate: -10 },
            { variant: "yellow-inclined", side: "left",  top: "70%", size: 28, rotate: 18 },
            { variant: "blue-main",       side: "right", top: "20%", size: 32, rotate: 6 },
          ],
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // JAFRA — Deck de agenda · Revisión del agente Agentforce
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "valor-workshop",
    customerSlug: "jafra",
    title: "Revisión del agente Agentforce · JAFRA",
    subtitle: "Agenda de la sesión de dos horas · Salesforce · JAFRA",
    duration: "4 min",
    slides: [
      // ── 1 · Portada ──────────────────────────────────────────────────
      {
        layout: "title",
        logo: "/sfdc-logos/corporate-logo.png",
        title: "Camino a su\nmáximo potencial.",
        subtitle:
          "Un agente que ya brilla · acompañémoslo hasta su mejor luz.",
        footnote: "Salesforce México · Workshop JAFRA · Julio 2026",
        showQr: true,
        brand: {
          astro: { variant: "agent-astro-20-l", side: "right", bottom: "-30px", size: 360 },
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "6%",  size: 48, rotate: 12 },
            { variant: "blue-inclined",   side: "left",  top: "92%", size: 30, rotate: -10 },
            { variant: "yellow-inclined", side: "right", top: "4%",  size: 34, rotate: 22 },
          ],
        },
      },

      // ── 2 · Objetivo general ─────────────────────────────────────────
      {
        layout: "section",
        eyebrow: "Objetivo general de la sesión",
        title: "Ver juntos el valor que el agente ya está entregando — y acordar cómo lo acompañamos para que entregue más.",
        subtitle:
          "Miramos al agente con los ojos de negocio y los de tecnología al mismo tiempo. Reconocemos lo que funciona, identificamos la oportunidad más clara de incremento, y salimos con acuerdos claros.",
        brand: {
          astro: { variant: "astro-7", side: "left", bottom: "-50px", size: 230 },
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "16%", size: 44, rotate: 12 },
            { variant: "yellow-inclined", side: "right", top: "70%", size: 28, rotate: -18 },
          ],
        },
      },

      // ── 3 · Agenda ───────────────────────────────────────────────────
      {
        layout: "agenda-list",
        eyebrow: "Agenda de la sesión",
        title: "Camino a su máximo potencial",
        items: [
          { number: "1", title: "Introducción", duration: "10 min", accent: "indigo" },
          { number: "2", title: "Conociendo al agente", duration: "15 min", accent: "violet" },
          { number: "3", title: "Lo que queremos proteger", duration: "20 min", accent: "sky" },
          { number: "4", title: "Incrementar valor", duration: "20 min", accent: "emerald" },
          { number: "5", title: "Acuerdos y seguimiento", duration: "25 min", accent: "indigo" },
          { number: "6", title: "Conclusiones", duration: "10 min", accent: "violet" },
        ],
      },

      // ── 4 · Bloque 1 · Introducción ──────────────────────────────────
      {
        layout: "agenda-block",
        eyebrow: "Bloque 1 · Introducción",
        title: "Contexto agéntico y encuadre de la sesión",
        duration: "10 min",
        objective:
          "Situar al equipo en el momento actual de la IA aplicada al negocio y compartir la visión de empresa agéntica que Salesforce trae como aliado estratégico de JAFRA — antes de entrar al agente.",
        content:
          "Un vistazo corto a las tendencias globales de IA en la industria de belleza y venta directa, seguido de cómo Salesforce acompaña a JAFRA en la construcción de una organización agéntica — con datos, agentes, personas y confianza como pilares.",
        exercise:
          "Presentación breve del equipo de la sala · cada participante se presenta con su rol y una expectativa concreta para la sesión.",
        deliverable:
          "Contexto compartido y expectativas alineadas · el equipo entra a la sesión con la misma mirada.",
        accent: "indigo",
        deckLink: {
          label: "Abrir deck · Tendencias de IA",
          href: "/customer-demos/jafra/deck/tendencias-ia",
          direction: "forward",
        },
      },

      // ── 5 · Bloque 2 · Conociendo al agente ──────────────────────────
      {
        layout: "agenda-block",
        eyebrow: "Bloque 2 · Conociendo al agente",
        title: "Presentemos al agente entre todos — qué es, qué hace y con qué trabaja",
        duration: "15 min",
        objective:
          "Construir de forma colectiva una descripción común del agente productivo de JAFRA — desde lo que cada participante ha visto, usado o escuchado — para que negocio y tecnología partan de la misma foto.",
        content:
          "Cada participante responde individualmente el ejercicio «Conociendo a nuestro agente». Después se comparten respuestas, se contrastan miradas y se construye entre todos la ficha común del agente.",
        exercise:
          "Ejercicio individual «Conociendo a nuestro agente» · 6 preguntas cortas (ver siguiente slide o plantilla imprimible). Después, 3 min por participante para leer su respuesta a la sala.",
        deliverable:
          "Ficha del agente construida entre los cinco — con nombre o apodo acordado, capacidades reconocidas y una escala compartida de su poder actual.",
        accent: "violet",
      },

      // ── 6 · Ejercicio · Conociendo a nuestro agente ──────────────────
      {
        layout: "agent-questionnaire",
        eyebrow: "Bloque 2 · Ejercicio individual",
        title: "Conociendo a nuestro agente",
        intro:
          "Responde desde lo que has visto, utilizado, escuchado o lo que te imaginas que puede ser. No es necesario que conozcas su configuración técnica.",
        questions: [
          {
            number: "1",
            icon: "👋",
            title: "Preséntame al agente",
            prompt:
              "Imagina que le estás presentando al agente a alguien más. ¿Qué dirías de cómo es?",
            format: "fill-blanks",
            template:
              "«_______ es un agente que atiende a _______ a través de _______. Se comunica de una manera _______.»",
            accent: "indigo",
          },
          {
            number: "2",
            icon: "🛠",
            title: "¿Qué sabe hacer?",
            prompt:
              "Escribe hasta cinco cosas que puede hacer. Marca con ✓ las que has visto funcionar personalmente.",
            format: "list",
            listCount: 5,
            accent: "violet",
          },
          {
            number: "3",
            icon: "📚",
            title: "¿Qué sabe?",
            prompt:
              "¿De dónde saca lo que sabe? Piensa en fuentes de información, datos o experiencia que consulta.",
            format: "list",
            listCount: 3,
            accent: "sky",
          },
          {
            number: "4",
            icon: "🤝",
            title: "¿Cuándo pide ayuda humana?",
            prompt:
              "¿En qué situaciones crees que el agente entrega la conversación a una persona?",
            format: "short",
            accent: "emerald",
          },
          {
            number: "5",
            icon: "⚡",
            title: "¿Cuál es su nivel de poder?",
            prompt:
              "De 0 a 10, como si fuera un personaje de acción, ¿qué tan poderoso te parece hoy?",
            format: "scale",
            scaleMax: 10,
            accent: "indigo",
          },
          {
            number: "6",
            icon: "🏷",
            title: "¿Qué apodo le pondrías?",
            prompt:
              "Un apodo cariñoso, divertido o inspirado en su forma de trabajar. El que salga primero.",
            format: "nickname",
            accent: "violet",
          },
        ],
        printUrl: "/Customers/Jafra/files/Conociendo-a-nuestro-agente.html",
        driveUrl:
          "https://docs.google.com/document/d/1fbiVgJu5CciunZ1_uo_mxE-4nIBhkwA_/edit?usp=sharing&ouid=108015117135038623865&rtpof=true&sd=true",
        driveQrSrc: "/Customers/Jafra/images/conociendo-agente-qr.svg",
      },

      // ── 7 · Bloque 3 · Lo que queremos proteger ──────────────────────
      {
        layout: "agenda-block",
        eyebrow: "Bloque 3 · Valor actual",
        title: "Lo que queremos proteger — el caso donde ya entrega valor",
        duration: "20 min",
        objective:
          "Reconocer al menos un caso concreto donde el agente ya entrega valor claro a la Consultora — para nombrar el patrón que lo hace funcionar y protegerlo en los cambios siguientes.",
        content:
          "Revisamos en vivo una conversación exitosa. Tecnología cuenta qué hizo el agente en lenguaje simple. Negocio traduce: «esto le resolvió a la Consultora tal cosa concreta». Se identifica el patrón repetible.",
        exercise:
          "Marcamos qué pasos aportaron valor real y cuáles fueron trámite — se escribe el patrón que hace que este caso funcione, en una frase.",
        deliverable:
          "Un caso de uso etiquetado como valor demostrado — con evidencia concreta y el patrón que lo hace funcionar.",
        accent: "sky",
      },

      // ── 8 · Bloque 4 · Incrementar valor ─────────────────────────────
      {
        layout: "agenda-block",
        eyebrow: "Bloque 4 · Valor siguiente",
        title: "Incrementar valor — la oportunidad más clara",
        duration: "20 min",
        objective:
          "Identificar el área donde el agente puede entregar más valor en las próximas semanas — nombrando la causa técnica en simple y el beneficio de negocio concreto.",
        content:
          "Revisamos en vivo una conversación con oportunidad de mejora. Tecnología explica qué está pasando sin tecnicismos. Negocio traduce el impacto en la Consultora y en el negocio. Se busca la causa raíz.",
        exercise:
          "Completamos entre los cinco una frase: «si mejoramos X, la Consultora recibe Y, y JAFRA gana Z». Si la frase no cierra, el hallazgo es que hay que investigar más antes de decidir.",
        deliverable:
          "La oportunidad principal nombrada en una frase clara — con causa técnica y beneficio de negocio.",
        accent: "emerald",
      },

      // ── 9 · Bloque 5 · Acuerdos y seguimiento ────────────────────────
      {
        layout: "agenda-block",
        eyebrow: "Bloque 5 · Acuerdos y seguimiento",
        title: "Acuerdos firmados por ambos lados y mecanismo de seguimiento",
        duration: "25 min",
        objective:
          "Convertir lo aprendido en compromisos concretos por Salesforce y por JAFRA — con responsables nombrados — y acordar en la sala el mecanismo de seguimiento y las fechas esperadas de cumplimiento.",
        content:
          "Ponemos sobre la mesa lo que salió de los bloques 3 y 4. Agrupamos en dos columnas: qué compromete Salesforce y qué compromete JAFRA. Cada acuerdo lleva dueño único, mecanismo de seguimiento y fecha esperada — todo definido y aceptado en la sala.",
        exercise:
          "Llenamos la tabla en vivo: acción · lado (Salesforce / JAFRA) · responsable · mecanismo de seguimiento · fecha esperada de cumplimiento. Los cinco lo aceptan y lo agendan en su calendario.",
        deliverable:
          "Tabla de acuerdos firmada por ambos lados — con responsables, mecanismo de seguimiento y fechas de cumplimiento acordados.",
        accent: "indigo",
      },

      // ── 10 · Bloque 6 · Conclusiones ─────────────────────────────────
      {
        layout: "agenda-block",
        eyebrow: "Bloque 6 · Conclusiones",
        title: "Conclusiones — qué nos llevamos y qué sigue",
        duration: "10 min",
        objective:
          "Sintetizar lo que se logró en la sesión y cerrar con claridad sobre próximos pasos inmediatos — para que todos salgan con el mismo entendimiento.",
        content:
          "Recapitulamos las tres ideas centrales de la sesión: la foto compartida del agente, los acuerdos firmados y el mecanismo de seguimiento. Cada participante comparte una frase de cierre.",
        exercise:
          "Ronda de cierre · una frase por persona respondiendo: «me llevo de esta sesión…».",
        deliverable:
          "Conclusiones compartidas y cierre alineado · la sesión no termina el trabajo, lo enciende.",
        accent: "violet",
      },

      // ── 11 · Gracias ─────────────────────────────────────────────────
      {
        layout: "thanks",
        eyebrow: "Salesforce · Aliado estratégico de JAFRA",
        title: "Gracias.",
        subtitle:
          "Del valor actual al valor que sigue — un paso a la vez, negocio y tecnología en la misma mesa.",
        brand: {
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "16%", size: 44, rotate: -10 },
            { variant: "yellow-inclined", side: "left",  top: "70%", size: 28, rotate: 18 },
            { variant: "blue-main",       side: "right", top: "20%", size: 32, rotate: 6 },
          ],
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // JAFRA — Deck de contexto · Tendencias de IA en la industria (Bloque 1)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "tendencias-ia",
    customerSlug: "jafra",
    title: "Tendencias de IA en la industria · JAFRA",
    subtitle: "Contexto agéntico para el bloque 1 del workshop · Salesforce · JAFRA",
    duration: "10 min",
    slides: [
      // ── 1 · Portada ──────────────────────────────────────────────────
      {
        layout: "title",
        logo: "/sfdc-logos/corporate-logo.png",
        eyebrow: "Bloque 1 · Introducción",
        title: "La IA ya\nestá en el mostrador.",
        subtitle:
          "Cómo la industria de belleza y venta directa está usando IA hoy — y qué significa para JAFRA.",
        footnote: "Salesforce México · Workshop JAFRA · Julio 2026",
        brand: {
          astro: { variant: "agent-astro-20-l", side: "right", bottom: "-30px", size: 360 },
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "8%",  size: 48, rotate: 12 },
            { variant: "blue-inclined",   side: "left",  top: "88%", size: 30, rotate: -10 },
            { variant: "yellow-inclined", side: "right", top: "4%",  size: 34, rotate: 22 },
          ],
        },
      },

      // ── 2 · Encuadre ─────────────────────────────────────────────────
      {
        layout: "section",
        eyebrow: "Cómo miramos este bloque",
        title: "Diez minutos para situarnos — no para asombrarnos.",
        subtitle:
          "Miramos qué está pasando en belleza, en venta directa y en el ecosistema Salesforce. Sin promesas de moda: solo los movimientos que ya cambian el negocio, para llegar al agente de JAFRA con la misma foto en la cabeza.",
        brand: {
          astro: { variant: "astro-7", side: "left", bottom: "-50px", size: 220 },
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "16%", size: 44, rotate: 12 },
            { variant: "yellow-inclined", side: "right", top: "70%", size: 28, rotate: -18 },
          ],
        },
      },

      // ── 3 · El momento — métricas globales ────────────────────────────
      {
        layout: "metrics",
        eyebrow: "El momento de la IA · 2026",
        title: "La IA agéntica dejó de ser una prueba piloto",
        metrics: [
          { value: "78%", label: "de las organizaciones usan IA en al menos una función de negocio · McKinsey State of AI 2025" },
          { value: "$4.4T", label: "en productividad anual estimada de la IA generativa a nivel global · McKinsey Global Institute" },
          { value: "1 de 3", label: "interacciones con clientes serán mediadas por un agente autónomo hacia 2028 · Gartner 2025" },
          { value: "10×", label: "más rápido en resolver un caso de servicio con agente que con flujo tradicional · benchmark Salesforce Agentforce" },
        ],
      },

      // ── 4 · IA en belleza y consumo · pillars ─────────────────────────
      {
        layout: "pillars",
        eyebrow: "IA en belleza y consumo",
        title: "Tres frentes donde la belleza ya vive con IA",
        pillars: [
          {
            title: "Descubrimiento personalizado",
            body: "Sephora, Ulta y L'Oréal usan probadores virtuales con visión por computadora y recomendaciones 1:1. La consumidora prueba tonos sin tocar el producto — y compra con más certeza.",
            accent: "violet",
          },
          {
            title: "Contenido generativo a escala",
            body: "Estée Lauder y Coty producen textos, imágenes y videos de campaña con IA generativa. Un lanzamiento que antes tomaba semanas se prepara en días, con variantes por mercado.",
            accent: "sky",
          },
          {
            title: "Agentes de atención 24/7",
            body: "Las marcas de belleza reemplazan los FAQ estáticos por agentes conversacionales que resuelven pedidos, cambios y consejos de rutina — con la voz de la marca — sin depender de horarios.",
            accent: "emerald",
          },
        ],
      },

      // ── 5 · Antes y después en venta directa ──────────────────────────
      {
        layout: "comparison",
        eyebrow: "IA en venta directa · Consultora + agente",
        title: "Lo que cambia para la Consultora cuando la IA entra al modelo",
        before: {
          heading: "Modelo tradicional",
          items: [
            "La Consultora repite el mismo pitch a toda su red — sin datos de qué le funciona a cada clienta.",
            "Consultas de precio, existencia o promoción llegan por WhatsApp fuera de horario y se pierden.",
            "El catálogo digital es el mismo para todas — no aprende de patrones de compra.",
            "El onboarding de una consultora nueva depende de la disposición de su líder y del papel impreso.",
            "El seguimiento post-venta es manual — se cae en cuanto la Consultora atiende a otra clienta.",
          ],
        },
        after: {
          heading: "Con IA agéntica en el flujo",
          items: [
            "La Consultora recibe recomendaciones por clienta — qué producto, qué combo, qué promo activar.",
            "El agente responde 24/7 en WhatsApp con la voz de la marca — la Consultora entra solo cuando aporta.",
            "El catálogo se reordena por clienta según historial, temporada y rutina — sube ticket promedio.",
            "Onboarding conversacional — la nueva Consultora aprende preguntándole al agente, no leyendo un PDF.",
            "El agente detecta señales (silencio, cambio de patrón) y le sugiere a la Consultora cuándo tocar puerta.",
          ],
        },
      },

      // ── 6 · Visión Salesforce · pillars ───────────────────────────────
      {
        layout: "pillars",
        eyebrow: "Cómo Salesforce compone la empresa agéntica",
        title: "Datos + Agentes + Confianza — los tres pilares",
        pillars: [
          {
            title: "Data 360",
            body: "Los datos de la Consultora, la clienta, el pedido y el catálogo viven en una sola foto activa. El agente no adivina — actúa sobre datos reales, en tiempo real.",
            accent: "sky",
          },
          {
            title: "Agentforce",
            body: "Del copiloto al colega. Agentes especializados que ejecutan tareas de negocio con reglas claras — no un chatbot más, sino un compañero de trabajo con permisos y responsabilidad.",
            accent: "violet",
          },
          {
            title: "Trust Layer",
            body: "Cada respuesta del agente se apoya en fuentes trazables, con guardarraíles de marca y de privacidad. La conversación con la Consultora es segura, auditable y consistente.",
            accent: "emerald",
          },
        ],
        products: ["Data Cloud", "Agentforce", "Platform"],
      },

      // ── 7 · Bridge · qué significa para JAFRA ─────────────────────────
      {
        layout: "bullets",
        eyebrow: "Qué significa para JAFRA hoy",
        title: "El agente de JAFRA ya está en esta ola — no llegando tarde",
        bullets: [
          "Belleza + venta directa + IA agéntica no es una promesa a futuro — es el estándar competitivo del 2026.",
          "JAFRA ya tiene un agente en producción · el punto de partida no es «si empezamos», es «cómo lo llevamos a su mejor luz».",
          "El resto de la sesión mira al agente actual con esos ojos — qué protege, qué incrementa, qué se puede acompañar mejor.",
          "Salesforce entra como aliado estratégico — no como proveedor de plataforma — para acelerar la curva sin romper lo que funciona.",
        ],
        highlight: "La conversación de hoy no es sobre tecnología. Es sobre cuánto valor está listo el agente para entregar en los próximos 90 días.",
      },

      // ── 8 · Puente al bloque 2 ────────────────────────────────────────
      {
        layout: "section",
        eyebrow: "Pasamos al bloque 2 · Conociendo al agente",
        title: "Ya vimos dónde estamos. Ahora, ¿cómo describimos al agente que ya tenemos?",
        subtitle:
          "Cinco personas · cinco miradas · una foto común del agente antes de decidir qué proteger y qué incrementar.",
        deckLink: {
          label: "Volver al deck de la agenda",
          href: "/customer-demos/jafra/deck/valor-workshop",
          direction: "back",
        },
        brand: {
          astro: { variant: "agent-astro-flip-020", side: "right", bottom: "-40px", size: 240 },
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "18%", size: 44, rotate: -10 },
            { variant: "blue-main",       side: "right", top: "22%", size: 32, rotate: 6 },
          ],
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // JAFRA — Deck ejecutivo · Resultados del Workshop
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "resultados-workshop",
    customerSlug: "jafra",
    title: "Resultados del Workshop · JAFRA",
    subtitle: "Lectura ejecutiva de la sesión de dos horas · Salesforce · JAFRA",
    duration: "8 min",
    slides: [
      // ── 1 · Portada ──────────────────────────────────────────────────
      {
        layout: "title",
        logo: "/sfdc-logos/corporate-logo.png",
        eyebrow: "Workshop JAFRA · Julio 2026",
        title: "Janet ya entrega\nvalor — protejámoslo.",
        subtitle:
          "Resultados de la sesión de dos horas · una fricción eclipsa el resto · camino claro a la Convención de Septiembre.",
        footnote: "Salesforce México · Confidencial · Julio 2026",
        showQr: false,
        brand: {
          astro: { variant: "agent-astro-20-l", side: "right", bottom: "-30px", size: 360 },
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "6%",  size: 48, rotate: 12 },
            { variant: "blue-inclined",   side: "left",  top: "92%", size: 30, rotate: -10 },
            { variant: "yellow-inclined", side: "right", top: "4%",  size: 34, rotate: 22 },
          ],
        },
      },

      // ── 2 · Contexto de la sesión ─────────────────────────────────────
      {
        layout: "section",
        eyebrow: "Contexto de la sesión",
        title: "Dos horas · seis personas · una lectura común de Janet.",
        subtitle:
          "Reunimos negocio y tecnología en oficinas de Salesforce para revisar juntos al agente en producción. Dinámica fluida, orgánica y participativa. La pieza más valiosa: el ejercicio «Conociendo a nuestro agente».",
        brand: {
          astro: { variant: "astro-7", side: "left", bottom: "-50px", size: 230 },
          sparkles: [
            { variant: "yellow-main",     side: "right", top: "16%", size: 44, rotate: 12 },
            { variant: "yellow-inclined", side: "right", top: "70%", size: 28, rotate: -18 },
          ],
        },
      },

      // ── 3 · Métricas de adopción ──────────────────────────────────────
      {
        layout: "metrics",
        eyebrow: "Lo que Janet ya está entregando",
        title: "Adopción orgánica creciente · sin lanzamiento oficial",
        metrics: [
          { value: "10K–11K", label: "interacciones a julio · vs 2K–3K previos" },
          { value: "~20K", label: "usuarios únicos activos hoy · base 20K–25K" },
          { value: "50K", label: "sesiones mensuales promedio" },
          { value: "20–25%", label: "reducción estimada en llamadas al call center (por validar)" },
        ],
      },

      // ── 4 · Cambio de percepción ──────────────────────────────────────
      {
        layout: "quote",
        quote:
          "Pasamos de «el agente no está funcionando» a «Janet ya resuelve, orienta y acompaña — el siguiente paso es proteger ese valor, resolver una fricción crítica y prepararla para el lanzamiento formal».",
        author: "Conclusión de la sala",
        context: "Después del ejercicio «Conociendo a nuestro agente»",
        brand: {
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "14%", size: 44, rotate: -10 },
            { variant: "yellow-inclined", side: "right", top: "72%", size: 28, rotate: 18 },
          ],
        },
      },

      // ── 5 · Ficha del agente ──────────────────────────────────────────
      {
        layout: "agent-profile",
        eyebrow: "Ficha construida entre los seis",
        title: "Janet · así la describe la sala hoy",
        agentName: "Janet · «La Janet»",
        agentRole: "Aliada de la Consultora · atiende por WhatsApp de manera conversacional",
        traits: [
          { label: "Atiende a", value: "Consultoras · Líderes · señoras", icon: "👥", accent: "indigo" },
          { label: "Canal", value: "WhatsApp · conversacional", icon: "💬", accent: "violet" },
          { label: "Fuentes", value: "AS/400 · Knowledge · SharePoint · Salesforce", icon: "📚", accent: "sky" },
          { label: "Escala humano", value: "Pedidos y pagos sin información", icon: "🤝", accent: "emerald" },
          { label: "Nivel de poder", value: "Aún aprendiendo · ya en producción", icon: "⚡", accent: "indigo" },
          { label: "Diferencial", value: "Cercanía · aliada del negocio", icon: "❤️", accent: "violet" },
        ],
      },

      // ── 6 · Capacidades reconocidas ───────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Lo que la sala reconoció que Janet ya sabe hacer",
        title: "Seis capacidades entregadas hoy",
        bullets: [
          "Abre tickets sin necesidad de intervención humana",
          "Resuelve al menos el 80% de las solicitudes (percepción interna)",
          "Asesora sobre promociones, comisiones y puntos en segundos",
          "Orienta a la consultora sobre el momento del ciclo comercial",
          "Brinda indicadores e insights sobre la información de las consultoras",
          "Es percibida como aliada del negocio · no solo canal de atención",
        ],
        highlight:
          "Cinco de estas seis capacidades quedaban invisibles antes del taller · una sola fricción estaba tapando todo lo demás.",
      },

      // ── 7 · La fricción crítica ───────────────────────────────────────
      {
        layout: "comparison",
        eyebrow: "Fricción crítica · pedidos incompletos",
        title: "Un flujo tapa el valor de Janet — resolverlo desbloquea el anuncio oficial",
        before: {
          heading: "Hoy · lo que eclipsa el valor",
          items: [
            "Janet pide datos técnicos (llega a solicitar SKU) que la consultora no siempre tiene",
            "Se genera un caso por cada producto faltante · fragmentación de la incidencia",
            "La consultora invierte más esfuerzo del razonable para reportar el problema",
            "Este incidente adquirió peso desproporcionado en la percepción interna",
            "El anuncio oficial está condicionado a resolver esta experiencia",
          ],
        },
        after: {
          heading: "Deseado · un solo caso por incidencia",
          items: [
            "Captura simplificada · Janet deriva del pedido lo que puede sin pedirlo",
            "Un caso único consolida faltantes, incorrectos y dañados de la misma entrega",
            "Menor esfuerzo · la consultora reporta rápido y con confianza",
            "La percepción se realinea con el valor real que Janet entrega",
            "Se abre la puerta al lanzamiento oficial y a la comunicación masiva",
          ],
        },
      },

      // ── 8 · Formulación del hallazgo principal ────────────────────────
      {
        layout: "quote",
        quote:
          "Si simplificamos la captura de pedidos incompletos y consolidamos toda la incidencia en un solo caso, la consultora reportará con menor esfuerzo — y JAFRA eliminará una de las principales barreras para el lanzamiento y adopción de Janet.",
        context: "Formulación del hallazgo principal · síntesis de la sesión, no una frase textual acordada.",
      },

      // ── 9 · Proteger vs mejorar ───────────────────────────────────────
      {
        layout: "split",
        eyebrow: "Doble movimiento",
        title: "Lo que protegemos · lo que mejoramos",
        left: {
          heading: "Proteger",
          items: [
            "Cercanía emocional con las consultoras",
            "Capacidad de orientar y guiar en el momento del negocio",
            "Información sobre productos y promociones",
            "Apoyo para alcanzar metas · aliada del negocio",
            "Resolución de dudas sin necesidad de llamada",
            "Registro escrito de las interacciones",
            "Adopción orgánica ya observada",
          ],
        },
        right: {
          heading: "Mejorar",
          items: [
            "Flujo de pedidos incompletos",
            "Solicitud de información innecesariamente técnica",
            "Consolidación de incidencias en un solo caso",
            "Acceso a información histórica más allá de 3 meses",
            "Integración del conocimiento de SharePoint",
            "Proactividad y personalización",
            "Medición formal del éxito",
          ],
        },
      },

      // ── 10 · Visión de evolución · tres capacidades ──────────────────
      {
        layout: "pillars",
        eyebrow: "Visión de evolución",
        title: "Tres capacidades que la sala imaginó para Janet",
        pillars: [
          {
            title: "Anticipar dentro de la conversación",
            body: "«Sé que normalmente consultas tu balance, aquí lo tienes antes de que me lo pidas». Señales: historial, momento del ciclo, estado de metas, pedidos recientes.",
            accent: "indigo",
          },
          {
            title: "Comunicar de forma proactiva",
            body: "Balance periódico, avance a meta, alertas de vencimiento, promociones contextuales. No necesariamente por Janet · parte de una estrategia de omnicanalidad más amplia.",
            accent: "violet",
          },
          {
            title: "Autoconsultarse",
            body: "Aprovechar el historial de conversación para personalizar las siguientes. Requiere diseño de memoria del agente · qué se guarda, cuánto tiempo, con qué consentimiento.",
            accent: "sky",
          },
        ],
      },

      // ── 11 · Primos de Janet ─────────────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "«Primos de Janet» · nuevos agentes esbozados",
        title: "Dos candidatos aparecieron en la sala",
        bullets: [
          "**Agente para temas de crédito** · dudas recurrentes con sensibilidad regulatoria · problema y métrica por definir",
          "**Agente para educación y capacitación** · hoy JAFRA no cuenta con una plataforma de formación para consultoras",
          "Regla acordada implícitamente · Janet consolidada y anunciada antes de abrir presupuesto a un nuevo agente",
          "Mismo estándar de aprobación · problema en una frase · métrica con umbral · dueño con nombre",
        ],
        highlight:
          "Un agente consolidado vale más que tres a medio camino · el foco es demostrar valor en Convención primero.",
      },

      // ── 12 · Métricas para septiembre · KPI table ────────────────────
      {
        layout: "kpi-table",
        eyebrow: "Hoja de ruta a la Convención Anual · Septiembre 2026",
        title: "Cuatro indicadores clave para llegar con evidencia",
        rows: [
          {
            label: "Reducción de llamadas al call center",
            baseline: "20–25% estimado · sin validar",
            goal6m: "Línea base validada con periodo y volumen",
            goal12m: "Reducción sostenida ≥30% post-anuncio",
            accent: "sky",
          },
          {
            label: "Casos por conversación (pedidos incompletos)",
            baseline: "1 caso por producto faltante",
            goal6m: "1 caso consolidado por pedido",
            goal12m: "Sin fragmentación reportada",
            accent: "indigo",
          },
          {
            label: "Adopción · interacciones y usuarios únicos",
            baseline: "10K–11K interacciones · ~20K únicos",
            goal6m: "Crecimiento sostenido tras anuncio",
            goal12m: "Cobertura mayoritaria de la base 20K–25K",
            accent: "violet",
          },
          {
            label: "CSAT y esfuerzo de la consultora",
            baseline: "Por capturar",
            goal6m: "Baseline formal con muestra representativa",
            goal12m: "CSAT superior al baseline humano en casos productivos",
            accent: "emerald",
          },
        ],
      },

      // ── 13 · Pendientes por confirmar ─────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Pendientes que aún NO son acuerdos formales",
        title: "Once puntos por convertir en tabla de acuerdos",
        bullets: [
          "Corregir el flujo de pedidos incompletos",
          "Definir un solo caso por pedido o incidencia",
          "Revisar qué datos realmente necesita la consultora",
          "Validar la reducción reportada del 20–25% en llamadas",
          "Confirmar la ventana histórica trasladada desde AS/400",
          "Documentar el consumo de SharePoint (Data Cloud · versionado · permisos)",
          "Definir casos de proactividad · dentro y fuera de la conversación",
          "Aterrizar el significado funcional de «autoconsultarse»",
          "Establecer métricas, línea base y mecanismo de seguimiento",
          "Definir los criterios para autorizar el lanzamiento oficial de Janet",
          "Confirmar responsables con nombre y fechas por cada punto",
        ],
        highlight:
          "Nada de esto es aún un acuerdo firmado por Salesforce y JAFRA · es el insumo para la próxima sesión.",
      },

      // ── 14 · Cierre ejecutivo ─────────────────────────────────────────
      {
        layout: "closing",
        title: "Un agente que ya brilla · acompañémoslo hasta su mejor luz.",
        bullets: [
          "Janet ya entrega valor · lo protegemos antes de agregarle nada",
          "Resolver pedidos incompletos es el prerrequisito para el anuncio oficial",
          "La Convención de Septiembre es el hito · toda métrica debe llegar con línea base",
          "Los «primos de Janet» esperan · un agente consolidado vale más que tres a medio camino",
        ],
        cta: "Siguiente paso · convertir los once pendientes en la tabla de acuerdos firmada.",
      },

      // ── 15 · Gracias ──────────────────────────────────────────────────
      {
        layout: "thanks",
        eyebrow: "Salesforce · Aliado estratégico de JAFRA",
        title: "Gracias.",
        subtitle:
          "Del valor actual al valor que sigue — un paso a la vez, negocio y tecnología en la misma mesa.",
        brand: {
          sparkles: [
            { variant: "yellow-main",     side: "left",  top: "16%", size: 44, rotate: -10 },
            { variant: "yellow-inclined", side: "left",  top: "70%", size: 28, rotate: 18 },
            { variant: "blue-main",       side: "right", top: "20%", size: 32, rotate: 6 },
          ],
        },
      },
    ],
  },
  {
    slug: "executive",
    customerSlug: "corona",
    title: "Deck Ejecutivo — Centro de Experiencia B2B",
    subtitle:
      "Atención al cliente por WhatsApp, 24/7 — sin sacrificar calidad, control ni tranquilidad operativa",
    duration: "10 min",
    slides: [
      // ── 1 · Portada ────────────────────────────────────────────────────
      {
        layout: "title",
        eyebrow: "Corona · Centro de Experiencia B2B",
        title: "Un asistente virtual que atiende\nsin que tú pierdas el control",
        subtitle:
          "Nuestros distribuidores hablan por WhatsApp, un asistente les responde de inmediato con la información del Centro de Experiencia, y solo llega al equipo lo que realmente necesita a una persona.",
        footnote: "Presentación ejecutiva · Confidencial · Julio 2026",
      },

      // ── 2 · Punto de partida ──────────────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Punto de partida",
        title: "Lo que hoy le quita el sueño al Centro de Experiencia",
        bullets: [
          "El cliente escribe por WhatsApp fuera de horario y siente que Corona lo dejó esperando",
          "Cada asesor repite las mismas respuestas de horarios, canales y garantías decenas de veces al día",
          "Los casos llegan al equipo sin datos completos y toca reprocesarlos antes de resolver",
          "No hay trazabilidad clara de qué le respondió Corona a cada distribuidor",
          "Si el volumen sube, la única palanca es contratar más asesores",
        ],
        highlight:
          "El reto no es tecnológico — es servir mejor, más rápido y con menos fricción, sin perder el control de la experiencia.",
      },

      // ── 3 · La promesa ────────────────────────────────────────────────
      {
        layout: "section",
        eyebrow: "La promesa",
        title: "Un asistente que atiende bien lo simple, y le pasa al equipo solo lo que sí requiere un humano",
        subtitle:
          "Estable, predecible y con una sola fuente de verdad: la misma base de conocimiento del Centro de Experiencia.",
      },

      // ── 4 · Qué recibe el cliente ──────────────────────────────────────
      {
        layout: "comparison",
        eyebrow: "Experiencia del cliente",
        title: "Lo que cambia para el distribuidor cuando escribe por WhatsApp",
        before: {
          heading: "Hoy",
          items: [
            "Escribe y no sabe si alguien lo va a leer",
            "Si es fuera de horario, espera hasta el siguiente día hábil",
            "Cuando lo atienden, tiene que volver a explicarse y a identificarse",
            "Consultas simples (horarios, canales, garantías) toman minutos",
            "Percibe una atención inconsistente según qué asesor le tocó",
          ],
        },
        after: {
          heading: "Con el asistente",
          items: [
            "Recibe respuesta inmediata — el asistente saluda y lo identifica",
            "Es atendido 24/7 — sábados, domingos y festivos sin excepción",
            "Su información se conserva; no lo obligamos a repetir todo cada vez",
            "Preguntas frecuentes se resuelven en segundos, con datos oficiales",
            "Todos los clientes escuchan la misma respuesta correcta y actualizada",
          ],
        },
      },

      // ── 5 · Qué gana el equipo ────────────────────────────────────────
      {
        layout: "pillars",
        eyebrow: "Impacto interno",
        title: "Qué gana el equipo del Centro de Experiencia",
        pillars: [
          {
            title: "Foco en lo que sí requiere una persona",
            body: "Los asesores dejan de repetir las mismas 8 preguntas y se concentran en los casos que sí requieren juicio humano: garantías complejas, escalamientos, retención.",
            accent: "indigo",
          },
          {
            title: "Casos que llegan listos",
            body: "Cuando el asistente escala, el caso ya viene con el cliente identificado, la cuenta asociada, el tipo tipificado y una descripción del problema. Cero re-captura.",
            accent: "violet",
          },
          {
            title: "Capacidad que escala con el volumen",
            body: "Si mañana entran el triple de mensajes por WhatsApp, el equipo humano no se satura — el asistente absorbe el pico y solo pasa lo relevante.",
            accent: "sky",
          },
        ],
      },

      // ── 6 · Cómo protegemos la calidad ────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Estabilidad y control",
        title: "Cómo garantizamos que sea confiable — no una caja negra",
        bullets: [
          "El asistente responde SOLO con información de la base de conocimiento oficial del Centro de Experiencia. Nada inventado.",
          "Antes de dar horarios pregunta el canal — porque cada canal (Almacenes, Puntos de venta, Distribuidores, Persona natural) tiene un horario distinto y nunca se puede equivocar.",
          "Cada conversación queda registrada en Salesforce — auditable, exportable y visible para el equipo.",
          "Cuando detecta un caso emocional o complejo, cede la conversación al asesor humano con todo el contexto.",
          "La base de conocimiento se actualiza en un solo lugar: cambias el contenido en Corona y el asistente lo refleja al día siguiente.",
        ],
      },

      // ── 7 · Regla no negociable ───────────────────────────────────────
      {
        layout: "quote",
        quote:
          "El asistente nunca da un horario sin antes preguntar de qué canal — porque un horario equivocado es peor que un turno adicional para aclarar.",
        author: "Regla operativa del Centro de Experiencia B2B",
        context:
          "Reglas como esta se configuran una vez y aplican a todas las conversaciones — control total sin depender de la memoria del asesor.",
      },

      // ── 8 · Qué resuelve hoy ──────────────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Alcance del piloto",
        title: "Qué preguntas ya responde correctamente el asistente",
        bullets: [
          "Horarios de atención por canal (Almacenes Corona, Puntos de venta, Distribuidores, Persona natural)",
          "Canales disponibles para montar un caso siendo B2B (WhatsApp, correo, Uno a Uno)",
          "Cómo solicitar un servicio técnico o una garantía, y qué documentos tener a la mano",
          "Cómo montar un pedido, recuperar contraseña o escalar una novedad en Uno a Uno",
          "Medidas de estibas por línea de producto",
          "Descarga de RUT y Cámara de Comercio desde Uno a Uno",
        ],
        highlight:
          "Cada respuesta viene con la redacción oficial aprobada por el Centro de Experiencia — misma calidad que atendería el mejor asesor.",
      },

      // ── 9 · Cómo mediremos el éxito ───────────────────────────────────
      {
        layout: "kpi-table",
        eyebrow: "Cómo mediremos el éxito",
        title: "Indicadores clave para seguir el desempeño del asistente",
        rows: [
          {
            label: "Satisfacción del cliente (CSAT WhatsApp)",
            baseline: "Sin medición sistemática",
            goal6m: "≥ 4.2 / 5",
            goal12m: "≥ 4.5 / 5",
            accent: "indigo",
          },
          {
            label: "% consultas resueltas sin intervención humana",
            baseline: "0%",
            goal6m: "40% de las consultas B2B",
            goal12m: "65%+",
            accent: "violet",
          },
          {
            label: "Tiempo de primera respuesta en WhatsApp",
            baseline: "Horas o hasta el día siguiente",
            goal6m: "< 10 segundos, 24/7",
            goal12m: "< 5 segundos, 24/7",
            accent: "sky",
          },
          {
            label: "Casos que llegan al asesor con datos completos",
            baseline: "~55%",
            goal6m: "≥ 90%",
            goal12m: "≥ 98%",
            accent: "emerald",
          },
        ],
      },

      // ── 10 · Qué haremos si algo falla ────────────────────────────────
      {
        layout: "split",
        eyebrow: "Tranquilidad operativa",
        title: "Qué pasa si algo sale mal — plan de contingencia",
        left: {
          heading: "Lo que NUNCA pasa",
          items: [
            "Que el asistente responda algo que no está en la base de conocimiento",
            "Que un cliente se quede sin respuesta — siempre hay un fallback conocido",
            "Que se pierda una conversación — todo queda registrado en Salesforce",
            "Que el equipo humano se entere tarde de un caso urgente",
          ],
        },
        right: {
          heading: "Lo que hacemos si algo no funciona",
          items: [
            "Alertas inmediatas al equipo técnico si el asistente deja de responder",
            "Redireccionamiento automático al canal humano si algo se degrada",
            "Panel de monitoreo con volumen, tiempos y satisfacción en vivo",
            "Ventana de revisión semanal para ajustar respuestas que no fueron óptimas",
          ],
        },
      },

      // ── 11 · Estado y siguiente paso ──────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Dónde estamos",
        title: "Estado del piloto y siguiente paso",
        bullets: [
          "El asistente ya está construido, publicado y conectado con WhatsApp",
          "La base de conocimiento del Centro de Experiencia ya está cargada",
          "Las reglas operativas críticas — como la de horarios por canal — ya están integradas",
          "Falta un ajuste técnico de credenciales para pasar del ambiente de pruebas a producción real",
          "Con ese ajuste listo, arrancamos con un piloto acotado de 2 semanas antes de escalar a toda la base de distribuidores",
        ],
        highlight:
          "No pedimos una decisión de tecnología — pedimos autorización para iniciar el piloto controlado y demostrar el valor con números reales.",
      },

      // ── 12 · Cierre con QR de WhatsApp ────────────────────────────────
      {
        layout: "thanks",
        eyebrow: "Corona · Centro de Experiencia B2B",
        title: "Pruébalo tú misma.",
        subtitle:
          "Escanea el código para hablar directamente con el asistente por WhatsApp. Cero preparación, cero riesgo — es la misma experiencia que tendría un distribuidor real.",
        qrSrc: "/Customers/Corona/corona-whatsapp-qr.png",
        qrLabel: "Conversa con el asistente",
        qrCaption: "WhatsApp · +55 11 91711-1888",
      },
    ],
  },

  // ── LOMAS HOSPITALITY · Deck ejecutivo — Introducción a Agentforce ────────
  {
    slug: "executive",
    customerSlug: "lomas-hospitality",
    title: "Hospitalidad que se anticipa",
    subtitle:
      "Cómo Agentforce lleva la experiencia More Inclusive® del huésped, la pareja que se casa y la agencia aliada a un nuevo estándar — 24/7, en cada idioma, con la esencia de Lomas intacta",
    duration: "20 min",
    slides: [
      // ── 1 · Portada ──────────────────────────────────────────────────────
      {
        layout: "title",
        eyebrow: "Lomas Hospitality · Presentación ejecutiva",
        title: "Hospitalidad que se anticipa.\nExperiencias que dejan huella.",
        subtitle:
          "Un vistazo a cómo la nueva generación de agentes inteligentes de Salesforce puede llevar la esencia de Lomas — hospitalidad mexicana auténtica — a cada punto de contacto del viaje, sin diluirla.",
        footnote: "Presentación ejecutiva · Confidencial · 2026",
        brand: {
          sparkles: [
            { variant: "yellow-main", side: "left", top: "12%", size: 96, rotate: -8 },
            { variant: "blue-inclined", side: "right", top: "58%", size: 120, rotate: 12 },
          ],
          astro: { variant: "astro-2", side: "right", bottom: "6%", size: 220 },
          cloudLogo: "top-right",
        },
        products: ["Agentforce", "Data Cloud", "Service", "Marketing"],
      },

      // ── 2 · El momento actual ───────────────────────────────────────────
      {
        layout: "quote",
        quote:
          "Los huéspedes de hoy no comparan a Lomas con otro all-inclusive. Lo comparan con la mejor experiencia digital que tuvieron ayer — la que resolvió su duda en 3 segundos, en su idioma, sin fricción.",
        author: "El nuevo estándar de la hospitalidad",
        context:
          "La conversación con el huésped se movió a los canales digitales, y la ventana de paciencia se redujo a segundos. Ahí es donde nace la oportunidad.",
        brand: {
          sparkles: [
            { variant: "yellow-inclined", side: "left", top: "18%", size: 80, opacity: 0.7 },
          ],
        },
      },

      // ── 3 · Panorama global ─────────────────────────────────────────────
      {
        layout: "metrics",
        eyebrow: "El mundo ya se movió",
        title: "Tres señales que están redefiniendo la industria en 2026",
        metrics: [
          { value: "78%", label: "de las empresas ya opera IA en al menos una función crítica de negocio" },
          { value: "<5 s", label: "es el tiempo que un huésped acepta esperar en un canal digital antes de rebotar" },
          { value: "3×", label: "más conversión en canales conversacionales vs. formularios tradicionales" },
          { value: "24/7", label: "es el nuevo horario por defecto — no un diferencial" },
        ],
        brand: {
          sparkles: [
            { variant: "blue-main", side: "right", top: "22%", size: 90 },
          ],
        },
      },

      // ── 4 · Referencias globales — hoteleros que ya lo hicieron ─────────
      {
        layout: "pillars",
        eyebrow: "Referencias globales · hospitalidad en Salesforce + IA",
        title: "Lo que la industria ya está haciendo — y el listón que marca",
        pillars: [
          {
            title: "Marriott — Hilton — Hyatt",
            body: "Marriott corrió su transformación digital con Salesforce como plataforma unificada de huésped y lealtad. Hilton apoya Hilton Honors — 158M de miembros — sobre Salesforce y Data Cloud. Hyatt personaliza mensajes 1:1 a más de 40M de miembros World of Hyatt con Marketing Cloud y Data Cloud.",
            accent: "indigo",
          },
          {
            title: "Wyndham & AccorHotels",
            body: "Wyndham Hotels & Resorts atiende reservaciones y servicio con Service Cloud desde 2018 — miles de propiedades en un solo modelo. Accor unificó a 40+ marcas y 5,700 hoteles en Salesforce para tener una vista 360 del huésped ALL — Accor Live Limitless.",
            accent: "violet",
          },
          {
            title: "La ola actual · Agentes con IA",
            body: "IHG, Four Seasons y las marcas líderes de resort all-inclusive del Caribe están lanzando en 2025–2026 agentes de IA para reservas, concierge in-stay y lealtad — sobre la misma plataforma Agentforce que se propone hoy para Lomas.",
            accent: "sky",
          },
        ],
        brand: {
          cloudLogo: "bottom-right",
        },
      },

      // ── 5 · La punta de lanza · Agentforce ──────────────────────────────
      {
        layout: "section",
        eyebrow: "La nueva capa de la experiencia",
        title: "Agentforce — la plataforma de agentes de Salesforce que ya opera en producción para miles de marcas",
        subtitle:
          "No es un chatbot. Es un empleado digital que razona, decide, ejecuta acciones sobre datos reales y sabe cuándo llamar a un humano.",
        brand: {
          astro: { variant: "agent-astro-10-l", side: "left", bottom: "8%", size: 240 },
        },
        products: ["Agentforce"],
      },

      // ── 6 · Qué es Agentforce · en palabras simples ─────────────────────
      {
        layout: "pillars",
        eyebrow: "Qué es Agentforce",
        title: "Cuatro cosas que hay que saber — y no una más",
        pillars: [
          {
            title: "Razona sobre datos reales",
            body: "Agentforce lee el perfil unificado del huésped en Data Cloud — reservas, preferencias, canjes, historial de conversaciones — y decide la mejor respuesta con contexto completo. No inventa: fundamenta.",
            accent: "indigo",
          },
          {
            title: "Ejecuta acciones, no solo responde",
            body: "Confirma una reserva, aplica un beneficio de LH Rewards, agenda una experiencia More Inclusive®, escala a un planner de bodas. Trabaja de verdad — no solo conversa.",
            accent: "violet",
          },
          {
            title: "Vive en el canal del huésped",
            body: "Web, WhatsApp, correo, teléfono, portal de agencias, app interna del staff. Un mismo cerebro, muchas voces — todas alineadas al tono de Lomas.",
            accent: "sky",
          },
          {
            title: "Confianza integrada de fábrica",
            body: "Einstein Trust Layer, enmascarado de datos personales, audit trail y controles de contenido sensible desde el día uno. Lo que se dice y lo que se hace queda registrado y auditable.",
            accent: "emerald",
          },
        ],
        products: ["Agentforce", "Data Cloud"],
      },

      // ── 7 · Objetivo de la sesión ───────────────────────────────────────
      {
        layout: "section",
        eyebrow: "Objetivo",
        title: "Identificar los 2 casos de uso prioritarios para Lomas y trazar el plan que los lleva a producción",
        subtitle:
          "Salir con un MVP acotado, con dueño, con métrica y con fecha. Nada de teoría — evidencia en 90 días.",
        brand: {
          sparkles: [
            { variant: "darkblue-main", side: "right", top: "20%", size: 100 },
          ],
        },
      },

      // ── 8 · Hipótesis · Concierge de reservas ───────────────────────────
      {
        layout: "split",
        eyebrow: "Hipótesis 1 · Concierge Digital de Reservas",
        title: "El anfitrión que responde al huésped en 3 segundos, en su idioma, y lo lleva a la reserva",
        left: {
          heading: "Qué hace el agente",
          items: [
            "Recibe al huésped en la web y en WhatsApp — en español o inglés — con el tono de Lomas",
            "Compara marcas (El Dorado · Palafitos · Hidden Beach · Generations · Maison México Roma) según lo que busca la persona",
            "Aplica beneficios LH Rewards en el mismo turno — Resort Credits, mejor tarifa, check-in privado",
            "Recupera carritos abandonados con contexto personalizado y ofrece la habitación exacta que el huésped miró",
            "Escala al contact center humano cuando el valor lo pide — con todo el contexto ya listo",
          ],
        },
        right: {
          heading: "Resultado esperado en 90 días",
          items: [
            "+18 a 25% de conversión en la web vs baseline actual",
            "Contención autónoma ≥ 55% de las consultas — el equipo humano se enfoca en el cierre de valor",
            "Tiempo de primera respuesta < 5 segundos, 24/7",
            "Lift de reserva directa vs OTA — más margen recuperado al canal propio",
            "Doblar la tasa de alta en LH Rewards por su asistencia proactiva",
          ],
        },
        products: ["Agentforce", "Service", "Data Cloud"],
      },

      // ── 9 · Hipótesis · Wedding & MICE Concierge ────────────────────────
      {
        layout: "split",
        eyebrow: "Hipótesis 2 · Wedding & MICE Concierge",
        title: "El planner virtual que abre el pipeline de bodas y grupos, y no lo suelta hasta el evento",
        left: {
          heading: "Qué hace el agente",
          items: [
            "Atiende la primera pregunta de la pareja o del organizador — a cualquier hora, en cualquier canal",
            "Configura paquete de boda o RFP de grupo con locación (rooftop · cenote · muelle · ballroom), aforo y fecha",
            "Entrega cotización preliminar y agenda la llamada con el planner humano al mejor momento",
            "Hace nurture personalizado durante el ciclo de venta largo — el prospecto nunca se enfría",
            "Da seguimiento post-evento con encuesta, upsell y activación de referidos",
          ],
        },
        right: {
          heading: "Resultado esperado en 90 días",
          items: [
            "Tiempo de primera respuesta de bodas y grupos: de horas a < 2 minutos, 24/7",
            "Lift ≥ 30% en leads calificados que llegan al planner humano",
            "Reducción de 40% del ciclo de venta desde primer contacto a firma",
            "Win rate B2B +8 a 12 puntos — la competencia sigue respondiendo con emails a 24h",
            "Pipeline visible por primera vez en un CRM — forecast confiable para Comercial",
          ],
        },
        products: ["Agentforce", "Sales", "Service"],
      },

      // ── 10 · Hipótesis · LH Rewards & In-stay ───────────────────────────
      {
        layout: "split",
        eyebrow: "Hipótesis 3 · Amplificador · LH Rewards + In-stay",
        title: "El asistente que hace sentir a cada miembro que Lomas lo conoce — antes, durante y después de la estancia",
        left: {
          heading: "Qué hace el agente",
          items: [
            "Personaliza Resort Credits (50% spa / 25% vinos / 25% cena) según preferencia real del huésped, no default",
            "Activa experiencias More Inclusive® por WhatsApp desde la habitación — catamarán, cenote, wave runner, parque acuático",
            "Recomienda la próxima escapada cross-marca (Palafitos → Maison México Roma como pre-estancia)",
            "Convierte la estancia en referidos activos con incentivo dirigido a Rewards",
            "Recupera al miembro dormido con oferta relevante — no genérica",
          ],
        },
        right: {
          heading: "Resultado esperado en 90 días",
          items: [
            "Redención de Resort Credits > 80% — hoy queda valor sin usar en cada estancia",
            "Reservas repeat de miembros LH Rewards +15 a 20%",
            "Activación de al menos 1 experiencia More Inclusive® por huésped ≥ 65%",
            "NPS in-stay +6 a 10 puntos en las propiedades piloto",
            "Alta orgánica en LH Rewards por recomendación de un miembro activo × 2",
          ],
        },
        products: ["Agentforce", "Marketing", "Data Cloud"],
      },

      // ── 11 · Cómo se ve por dentro ─────────────────────────────────────
      {
        layout: "comparison",
        eyebrow: "El cambio operativo",
        title: "Cómo se ve un día en Lomas — antes y después",
        before: {
          heading: "Hoy",
          items: [
            "El huésped en Toronto pregunta a las 2 AM y espera hasta las 9 AM MX para respuesta",
            "La pareja que se casa recibe un PDF genérico y compara con 3 competidores durante el silencio",
            "La agencia aliada llama al ejecutivo para confirmar disponibilidad — a veces sí, a veces no",
            "El miembro de LH Rewards ve un descuento uniforme — sin sentir que Lomas lo conoce",
            "El staff resuelve las mismas 12 preguntas cada día, sin capacidad de personalizar",
          ],
        },
        after: {
          heading: "Con Agentforce",
          items: [
            "El huésped recibe respuesta en 3 segundos, con el nombre de la marca que mejor le encaja, en su idioma",
            "La pareja cierra su boda en un configurador conversacional que sabe qué locación pidió y cuánto vale",
            "La agencia consulta disponibilidad y comisiones al agente, sin llamar — el ejecutivo ve un pipeline vivo",
            "El miembro recibe Resort Credits repartidos según su preferencia real y ve el vuelo de vuelta ya reservado",
            "El staff trabaja con un copiloto que le prepara la respuesta y le sugiere el próximo paso",
          ],
        },
      },

      // ── 12 · Cómo se ve en 90 días ─────────────────────────────────────
      {
        layout: "kpi-table",
        eyebrow: "Indicadores clave · MVP de 90 días",
        title: "El tablero que se abre con los primeros dos agentes en producción",
        rows: [
          {
            label: "Contención autónoma en canales digitales (web + WhatsApp)",
            baseline: "N/A",
            goal6m: "≥ 55%",
            goal12m: "≥ 70%",
            accent: "indigo",
          },
          {
            label: "Conversión reserva directa desde canal conversacional",
            baseline: "Baseline actual del motor",
            goal6m: "+18–25%",
            goal12m: "+30–40%",
            accent: "violet",
          },
          {
            label: "Tiempo de primera respuesta 24/7",
            baseline: "Horas (fuera de horario)",
            goal6m: "< 5 segundos",
            goal12m: "< 3 segundos",
            accent: "sky",
          },
          {
            label: "Bodas y grupos — leads → oportunidad calificada",
            baseline: "Sin visibilidad",
            goal6m: "+30% velocity",
            goal12m: "+50% velocity · +10 pts win rate",
            accent: "emerald",
          },
          {
            label: "Miembros LH Rewards activos con redención",
            baseline: "% actual",
            goal6m: "+15–20%",
            goal12m: "Programa tierizado con NBO por segmento",
            accent: "indigo",
          },
        ],
      },

      // ── 13 · Plan de trabajo ────────────────────────────────────────────
      {
        layout: "pillars",
        eyebrow: "El plan",
        title: "Tres olas — cada una entrega valor por sí sola, prepara la siguiente y minimiza el shock de cambio",
        pillars: [
          {
            title: "Ola 1 · Cimientos + MVP conversacional",
            body: "Meses 0–4 · Data Cloud stand-up con perfil unificado del huésped · MuleSoft para exponer inventario del motor · Agentforce con el Concierge de Reservas (web + WhatsApp) en ES/EN · Loyalty Management con LH Rewards tierizado · journeys base en Marketing Cloud.",
            accent: "indigo",
          },
          {
            title: "Ola 2 · Bodas · Grupos · B2B",
            body: "Meses 4–9 · Sales Cloud + CPQ con pipeline Bodas y MICE · Experience Cloud para pareja, planners y agencias · Agentforce Wedding Concierge · MICE Agent · B2B Agency Agent · integración con Bluma Rewards y Exotic Travelers.",
            accent: "violet",
          },
          {
            title: "Ola 3 · In-stay · Copiloto del staff · Personalización avanzada",
            body: "Meses 9–18 · Agentforce In-stay para More Inclusive® · Field Service para la operación de actividades · Copiloto del staff en Service Cloud + Slack · Einstein Predictions para churn y next-best-offer · Data Cloud extendida a ESG y Fundación Lomas.",
            accent: "sky",
          },
        ],
      },

      // ── 14 · Por qué ahora ──────────────────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Por qué ahora",
        title: "Cuatro razones que hacen del 2026 la ventana correcta",
        bullets: [
          "El huésped ya opera en modo conversacional — quien no está en su canal, no está en su decisión",
          "La tecnología está madura — Agentforce ya opera en producción para miles de marcas globales, no es un experimento",
          "Los competidores directos del Caribe están lanzando ahora — moverse antes es capitalizar la ventaja del posicionamiento premium",
          "La inversión en Data Cloud se paga con el primer agente en producción — cada agente adicional cuesta menos y entrega más",
        ],
        highlight:
          "El costo de esperar no es cero — cada mes sin agente son huéspedes ganados por otro, y datos perdidos que no vuelven.",
      },

      // ── 15 · Lo que se pide ─────────────────────────────────────────────
      {
        layout: "closing",
        title: "Elegir los 2 casos de uso prioritarios y arrancar la Ola 1 este trimestre",
        bullets: [
          "Nombrar un sponsor ejecutivo y un dueño de producto — negocio + tecnología, no uno solo",
          "Confirmar los dos casos prioritarios entre las tres hipótesis presentadas — Concierge · Wedding & MICE · LH Rewards In-stay",
          "Abrir la ventana de 4 semanas para el discovery técnico y firmar el MVP con métrica y fecha",
          "Comprometer un piloto acotado en 2 propiedades del portafolio — evidencia real antes de escalar al grupo",
        ],
        cta: "Salir de la sala con los dos casos elegidos, el sponsor nombrado y la fecha del kickoff en el calendario.",
        brand: {
          astro: { variant: "agent-astro-flip-020", side: "right", bottom: "6%", size: 220 },
          cloudLogo: "top-right",
        },
      },

      // ── 16 · Cierre ─────────────────────────────────────────────────────
      {
        layout: "thanks",
        eyebrow: "Lomas Hospitality · Salesforce",
        title: "La hospitalidad de Lomas — amplificada, no reemplazada.",
        subtitle:
          "La tecnología no cuenta la historia. Solo la cuenta más veces, en más idiomas, a más huéspedes, sin que la esencia se pierda. Gracias.",
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
