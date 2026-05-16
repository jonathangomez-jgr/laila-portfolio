export type SlideAccent = "indigo" | "violet" | "sky" | "emerald";

export type ExecutiveSlide =
  | {
      layout: "title";
      eyebrow?: string;
      title: string;
      subtitle?: string;
      footnote?: string;
    }
  | {
      layout: "section";
      eyebrow?: string;
      title: string;
      subtitle?: string;
    }
  | {
      layout: "bullets";
      eyebrow?: string;
      title: string;
      bullets: string[];
      highlight?: string;
    }
  | {
      layout: "metrics";
      eyebrow?: string;
      title: string;
      metrics: { value: string; label: string }[];
    }
  | {
      layout: "split";
      eyebrow?: string;
      title: string;
      left: { heading: string; items: string[] };
      right: { heading: string; items: string[] };
    }
  | {
      layout: "pillars";
      eyebrow?: string;
      title: string;
      pillars: { title: string; body: string; accent?: SlideAccent }[];
    }
  | {
      layout: "closing";
      title: string;
      bullets?: string[];
      cta?: string;
    }
  | {
      layout: "quote";
      quote: string;
      author?: string;
      context?: string;
    }
  | {
      layout: "comparison";
      eyebrow?: string;
      title: string;
      before: { heading: string; items: string[] };
      after: { heading: string; items: string[] };
    }
  | {
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
    }
  | {
      layout: "thanks";
      eyebrow?: string;
      title: string;
      subtitle?: string;
    };

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
    subtitle: "Plataforma de Inteligencia Comercial con Agentforce",
    duration: "20 min",
    slides: [
      // ── SLIDE 1 · Portada ──────────────────────────────────────────────
      {
        layout: "title",
        eyebrow: "Cementos Argos · Grupo Argos",
        title: "Del CRM al motor del\ncrecimiento comercial",
        subtitle:
          "Evolución hacia inteligencia comercial y ejecución agéntica alineada a los OKRs de SPRINT 4.0",
        footnote: "Executive Briefing · Confidencial · Mayo 2026",
      },

      // ── SLIDE 2 · Argos hoy ───────────────────────────────────────────
      {
        layout: "metrics",
        eyebrow: "Argos en números",
        title: "Una organización de escala con Salesforce ya en producción",
        metrics: [
          { value: "90+", label: "Años de trayectoria cementada" },
          { value: "$5.3B", label: "COP Ingresos 2024" },
          { value: "16", label: "Países y territorios" },
          { value: "SPRINT 4.0", label: "Programa estratégico activo 2026–27" },
        ],
      },

      // ── SLIDE 3 · El reto ─────────────────────────────────────────────
      {
        layout: "comparison",
        eyebrow: "Diagnóstico — Brechas de valor",
        title: "Salesforce está en producción — pero el valor está sin activar",
        before: {
          heading: "Realidad operativa hoy",
          items: [
            "Oportunidades dispersas: sin captura automática desde Galería Inmobiliaria ni Licitacion.info",
            "Pipeline reportado con rezago 24h+ — los líderes deciden sobre Excel del día anterior",
            "PQRs y WhatsApp en silos — sin contexto unificado del cliente al atender",
            "Marketing genérico sin microsegmentación: comunicaciones masivas de baja efectividad",
            "Radar de churn en Tableau aislado — no integrado al CRM ni accionable en campo",
          ],
        },
        after: {
          heading: "Con Agentforce activado",
          items: [
            "60%+ de oportunidades creadas automáticamente desde fuentes externas",
            "Pipeline visible en tiempo real con predicción Einstein — decisiones el mismo día",
            "Service Cloud omnicanal: PQR, WhatsApp y Contact Center sobre el mismo contexto",
            "Machine Sellers + segmentación avanzada: cross-sell y reactivación automatizados",
            "Radar de fuga integrado al CRM — asesor notificado, campaña disparada automáticamente",
          ],
        },
      },

      // ── SLIDE 4 · OKRs corporativos ───────────────────────────────────
      {
        layout: "pillars",
        eyebrow: "OKRs corporativos — SPRINT 4.0",
        title: "La plataforma que conecta tecnología con los resultados del negocio",
        pillars: [
          {
            title: "Incremento de PDM",
            body: "Capturar más oportunidades más rápido con inteligencia predictiva. Funnel automatizado desde fuentes externas y alertas de competencia en tiempo real.",
            accent: "indigo",
          },
          {
            title: "Mejora de NPS",
            body: "Atención omnicanal, contextual y rápida en cada punto de contacto. PQRs resueltos por agente autónomo con escalamiento inteligente.",
            accent: "violet",
          },
          {
            title: "Incremento de Ventas",
            body: "Crecer los ingresos con pedido sugerido (Einstein AI), Machine Sellers para cross-sell y reactivación automática de clientes inactivos.",
            accent: "sky",
          },
        ],
      },

      // ── SLIDE 5 · Visión de la solución ──────────────────────────────
      {
        layout: "section",
        eyebrow: "La propuesta",
        title: "Convertir el CRM en el motor activo del crecimiento de Argos",
        subtitle:
          "Tres capas de valor interconectadas — Excelencia Comercial · Servicio Omnicanal · Crecimiento y Fidelización",
      },

      // ── SLIDE 6 · Excelencia Comercial ────────────────────────────────
      {
        layout: "split",
        eyebrow: "Capa 1 de 3 — Sales Cloud + Agentforce Sales",
        title: "Excelencia Comercial — el asesor vende más porque trabaja mejor",
        left: {
          heading: "Capacidades clave",
          items: [
            "Ingesta automática de oportunidades: Galería Inmobiliaria + Licitacion.info",
            "Agentforce SDR: califica, enriquece y asigna oportunidades en minutos",
            "Vista 360 del cliente con pedido sugerido por Einstein AI",
            "Plan de visitas optimizado con rutas y ciclos automatizados",
          ],
        },
        right: {
          heading: "Impacto esperado",
          items: [
            "De 0% a 60%+ de oportunidades creadas automáticamente",
            "Tiempo de creación de oportunidad: <2 min vs proceso manual",
            "Cobertura del plan de visitas: parcial → 95%",
            "+25% ticket promedio con cross-sell guiado por IA",
          ],
        },
      },

      // ── SLIDE 7 · Servicio Omnicanal ─────────────────────────────────
      {
        layout: "split",
        eyebrow: "Capa 2 de 3 — Service Cloud + Agentforce Service",
        title: "Servicio Omnicanal — cada PQR resuelta con contexto completo",
        left: {
          heading: "Capacidades clave",
          items: [
            "Gestión unificada de PQRs: WhatsApp + Contact Center + web en un solo contexto",
            "Agentforce clasifica, responde casos simples y escala con historial completo",
            "Liberación de pedidos digitalizada — adiós a las fotos de consignaciones por WhatsApp",
            "SLAs visibles en tiempo real para gerencia de servicio",
          ],
        },
        right: {
          heading: "Impacto esperado",
          items: [
            "50%+ de PQRs resueltas por agente autónomo al año 1",
            "Tiempo de resolución: reducción 50% vs proceso actual",
            "WhatsApp unificado: de múltiples líneas separadas a un canal gestionado con IA",
            "+8 pts NPS en 12 meses — servicio como diferenciador competitivo",
          ],
        },
      },

      // ── SLIDE 8 · Crecimiento y Fidelización ─────────────────────────
      {
        layout: "split",
        eyebrow: "Capa 3 de 3 — Marketing Cloud + Agentforce Marketing",
        title: "Crecimiento y Fidelización — marketing que genera ventas reales",
        left: {
          heading: "Capacidades clave",
          items: [
            "Microsegmentación avanzada: por volumen, potencial, riesgo y zona",
            "Machine Sellers: venta cruzada e incremental con IA por cliente",
            "Reactivación automática de clientes inactivos con journeys personalizados",
            "Argos Amigos — automatización multicanal del programa de fidelización",
          ],
        },
        right: {
          heading: "Impacto esperado",
          items: [
            "De 0 a 6+ campañas Machine Sellers activas al año 1",
            "10%+ de clientes inactivos reactivados por mes",
            "Tasa de apertura de comunicaciones: 35%+ vs sin benchmark actual",
            "Reducción 80% en carga manual del Admin CRM — reportes en autoservicio",
          ],
        },
      },

      // ── SLIDE 9 · KPIs ejecutivos ─────────────────────────────────────
      {
        layout: "kpi-table",
        eyebrow: "KPIs para la Dirección",
        title: "Resultados medibles — tres dimensiones, dos horizontes",
        rows: [
          {
            label: "Oportunidades creadas automáticamente",
            baseline: "0% (100% manual)",
            goal6m: "30%+",
            goal12m: "60%+",
            accent: "indigo",
          },
          {
            label: "PQRs resueltas por agente autónomo",
            baseline: "0% (manual)",
            goal6m: "30%+",
            goal12m: "50%+",
            accent: "violet",
          },
          {
            label: "NPS post-interacción",
            baseline: "Sin medición sistemática",
            goal6m: "Línea base activa",
            goal12m: "+8 pts",
            accent: "sky",
          },
          {
            label: "Ticket promedio (cross-sell)",
            baseline: "Sin seguimiento",
            goal6m: "+15% por asesor",
            goal12m: "+25% por asesor",
            accent: "emerald",
          },
          {
            label: "Visibilidad de pipeline ejecutivo",
            baseline: "Rezago 24h+ (Excel)",
            goal6m: "Tiempo real",
            goal12m: "Tiempo real + predictivo",
            accent: "indigo",
          },
        ],
      },

      // ── SLIDE 10 · Métricas de impacto ───────────────────────────────
      {
        layout: "metrics",
        eyebrow: "Impacto proyectado a 12 meses",
        title: "Resultados que importan al negocio",
        metrics: [
          { value: "60%+", label: "Oportunidades creadas automáticamente" },
          { value: "+8 pts", label: "NPS post-interacción" },
          { value: "+25%", label: "Ticket promedio por asesor" },
          { value: "50%+", label: "PQRs resueltas por agente autónomo" },
        ],
      },

      // ── SLIDE 11 · Por qué 2026 ───────────────────────────────────────
      {
        layout: "bullets",
        eyebrow: "Timing estratégico",
        title: "Por qué 2026 es la ventana ideal",
        bullets: [
          "SPRINT 4.0 activo: presupuesto, patrocinio ejecutivo y mandato de transformación ya alineados",
          "Agentforce for Manufacturing disponible: capacidades diseñadas específicamente para el modelo de Argos",
          "Base de clientes ya en Salesforce: el costo marginal de activar nuevas capas es mínimo vs un greenfield",
          "Competidores en LATAM sin esta madurez agéntica — la ventana de diferenciación se cerrará en 18–24 meses",
        ],
        highlight: "La inversión más cara es la que no se hace cuando el momento es correcto.",
      },

      // ── SLIDE 12 · El journey del asesor ─────────────────────────────
      {
        layout: "comparison",
        eyebrow: "Antes y después — el día a día del asesor",
        title: "Cuando el CRM trabaja para el asesor, el asesor vende más",
        before: {
          heading: "Asesor hoy",
          items: [
            "Construye su ruta de visitas manualmente cada semana",
            "No sabe si el cliente tiene una PQR abierta antes de la visita",
            "Genera cotizaciones sin flujo post-creación ni seguimiento automático",
            "Reporta en Excel al final del día — el gerente lo ve al día siguiente",
          ],
        },
        after: {
          heading: "Asesor con Agentforce",
          items: [
            "Ruta optimizada por Salesforce con priorización por potencial y riesgo",
            "Notificado de PQRs activas antes de llamar — contexto completo en un clic",
            "Cotización guiada con siguiente mejor acción y alerta de seguimiento automática",
            "Pipeline del gerente actualizado en tiempo real — decisiones el mismo día",
          ],
        },
      },

      // ── SLIDE 13 · Cita ejecutiva ─────────────────────────────────────
      {
        layout: "quote",
        quote: "El cemento construye estructuras. La tecnología construye relaciones. Juntos, construimos el futuro comercial de Argos.",
        context: "Visión estratégica de la cuenta · Laila González · Account Executive, Salesforce",
      },

      // ── SLIDE 14 · Cierre y próximos pasos ───────────────────────────
      {
        layout: "closing",
        title: "Próximos pasos",
        bullets: [
          "Executive Briefing con Dirección Comercial y Tecnología — validación de OKRs y prioridades",
          "Priorización de 3 iniciativas quick-win de 90 días: captura de oportunidades, Vista 360 y PQRs unificadas",
          "Demo vivo: Agentforce SDR + pedido sugerido con datos reales de Argos",
          "Workshop técnico de arquitectura con Quantics (integrador CRM actual)",
        ],
        cta: "¿Agendamos la sesión de validación con los stakeholders clave esta semana?",
      },

      // ── SLIDE 15 · Gracias ────────────────────────────────────────────
      {
        layout: "thanks",
        eyebrow: "Salesforce · Grupo Argos",
        title: "Gracias",
        subtitle: "Juntos, construimos el motor comercial que Argos necesita para el siguiente capítulo.",
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
