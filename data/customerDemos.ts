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

export type AssetItem = {
  name: string;
  description: string;
  available: boolean;
  type: "doc" | "deck" | "mockup" | "arch" | "video";
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

export type CustomerDemoTab = {
  id: string;
  label: string;
  title: string;
  content: string;
  banner?: string;
  kpis?: KpiGroup[];
  solution?: SolutionLayer[];
  objective?: ObjectiveData;
  overviewData?: OverviewData;
  customerProfile?: CustomerProfileData;
  contextData?: ContextData;
  narrativeData?: NarrativeData;
  assetsData?: AssetsData;
};

export type CustomerDemo = {
  slug: string;
  title: string;
  customerName: string;
  industry: string;
  description: string;
  logo?: string;
  tags: string[];
  tabs: CustomerDemoTab[];
  passcode: string;
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
        id: "outcomes",
        label: "Resultados",
        title: "Resultados esperados",
        content:
          "Los KPIs de éxito se organizan en tres dimensiones: experiencia del cliente, eficiencia operativa y revenue uplift. Cada métrica tiene línea base documentada, meta a 6 meses y meta a 12 meses — diseñadas para demostrar valor financiero cuantificable ante el Directorio en cada fase.",
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
        id: "assets",
        label: "Assets",
        title: "Assets de la demo",
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
              url: "https://drive.google.com/file/d/1HxSmUuCN0MU2h3eDAVvRRRNnRQGM_VJO/view?usp=sharing",
            },
            {
              name: "Deck Ejecutivo Board VivaLux",
              description:
                "Presentación de 20 min para el Directorio: problema, solución, ROI por fase y próximos pasos — co-presentada con IT Director como co-sponsor técnico.",
              available: false,
              type: "deck",
            },
            {
              name: "Demo en Vivo LuxServe en WhatsApp",
              description:
                "Demo live de Agentforce resolviendo un caso real de VivaLux (order status en WhatsApp simulado con datos ficticios de muestra).",
              available: false,
              type: "video",
            },
            {
              name: "Arquitectura Customer Intelligence Ecosystem",
              description:
                "Diagrama técnico de los 4 agentes (LuxServe, LuxEscalation, LuxAssist, LuxInsight) con integración SAP-MuleSoft-Agentforce y modelo de datos unificado.",
              available: false,
              type: "arch",
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
  },
  {
    slug: "grupo-argos",
    title: "Cementos Argos — Plataforma de Inteligencia Comercial con Agentforce",
    customerName: "Grupo Argos",
    industry: "Materiales de Construcción",
    description:
      "Plan de cuenta estratégico para evolucionar el CRM de Cementos Argos hacia una plataforma de inteligencia comercial y ejecución agéntica, impactando directamente sus OKRs corporativos: participación de mercado, NPS e incremento de ventas.",
    logo: "/Customers/logo-argos.svg",
    passcode: "argos2026",
    tags: [
      "Sales Cloud",
      "Agentforce",
      "Service Cloud",
      "Marketing Cloud",
      "Manufacturing",
    ],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        title: "Resumen ejecutivo",
        banner: "/Customers/cementos-argos.jpg",
        content:
          "Cementos Argos opera Salesforce desde hace más de una década. Este plan propone evolucionar ese CRM hacia una plataforma de inteligencia comercial y ejecución agéntica con Agentforce.",
        overviewData: {
          stats: [
            { value: "90+", label: "Años de trayectoria" },
            { value: "$5.3B", label: "COP ingresos 2024" },
            { value: "16", label: "Países y territorios" },
            { value: "40%+", label: "Ventas digitales (Argos ONE)" },
            { value: "9.3M", label: "Ton. cemento despachadas" },
            { value: "25%", label: "Margen EBITDA 2025" },
          ],
        },
      },
      {
        id: "customer",
        label: "Cliente / industria",
        title: "Cliente e industria",
        content:
          "Producción y comercialización de cemento, concreto y agregados. Sede en Medellín, Colombia. Programa estratégico SPRINT 4.0 activo.",
        customerProfile: {
          stats: [
            { label: "Sede", value: "Medellín, Colombia" },
            { label: "Fundación", value: "1934" },
            { label: "Clientes clave", value: "~360 (80% del volumen)" },
            { label: "Integrador CRM", value: "Quantics" },
            { label: "Canal digital", value: "Argos ONE (e-commerce)" },
            { label: "Programa", value: "SPRINT 4.0 (2026-2027)" },
          ],
          segments: [
            {
              name: "Negocio Industrial",
              description:
                "Atiende obras de infraestructura, constructoras y proyectos licitados. Seguimiento de oportunidades complejas y cotizaciones técnicas de cemento, concreto y agregados.",
            },
            {
              name: "Negocio Masivo",
              description:
                "Gestiona ~360 clientes: distribuidores mayoristas, detallistas y cadenas (Homecenter, Easy). Relaciones gestionadas con rutas de visita trimestrales.",
            },
          ],
          techStack: [
            { category: "CRM", tool: "Salesforce" },
            { category: "ERP", tool: "SAP" },
            { category: "BI", tool: "Tableau" },
            { category: "E-commerce", tool: "Argos ONE" },
            { category: "Email Mktg", tool: "Brevo" },
            { category: "Fidelización", tool: "Gluki" },
            { category: "Contact Center", tool: "Konecta / BTO" },
          ],
        },
      },
      {
        id: "context",
        label: "Contexto",
        title: "Contexto del reto",
        content:
          "Salesforce está en producción, pero con brechas significativas en adopción, estandarización y aprovechamiento de capacidades avanzadas.",
        contextData: {
          groups: [
            {
              name: "Negocio Industrial",
              findings: [
                "Gestión de obras sin alertas de finalización ni seguimiento proactivo",
                "Cotizaciones sin flujo post-creación ni anexos automáticos",
                "Complejidad en cotización de concretos sin filtros inteligentes",
                "Gestión de consorcios no resuelta nativamente en CRM",
                "Liberación de pedidos manual con fotos de consignaciones por WhatsApp",
                "Sin panel individual para seguimiento de pendientes del asesor",
              ],
            },
            {
              name: "Negocio Masivo",
              findings: [
                "Plan de visitas manual sin optimización de rutas ni ciclos automatizados",
                "Rigor comercial no estandarizado entre asesores",
                "Reportes construidos manualmente por el Admin CRM en Excel",
                "Reporte diario de ventas llega por email con rezago de 24h+",
                "Aplicación móvil con problemas de conectividad en campo",
                "Radar de clientes en riesgo de fuga en Tableau, sin integración en CRM",
              ],
            },
          ],
        },
      },
      {
        id: "objective",
        label: "Objetivo",
        title: "Convertir el CRM en el motor del crecimiento de Argos.",
        content:
          "Tres OKRs corporativos. Una plataforma. Resultados medibles en 90 días.",
        objective: {
          headline:
            "Convertir el CRM de Cementos Argos de un repositorio de datos en una plataforma viva que anticipa, actúa y genera valor en cada interacción comercial.",
          okrs: [
            {
              label: "Incremento de PDM",
              description:
                "Ganar participación de mercado atrayendo nuevos clientes y reteniendo los actuales con inteligencia predictiva.",
              enabler: "Agentforce SDR + Sales Cloud",
              color: "indigo",
            },
            {
              label: "Mejora de NPS",
              description:
                "Elevar la experiencia del cliente en cada punto de contacto con atención omnicanal, rápida y personalizada.",
              enabler: "Service Cloud + WhatsApp API",
              color: "violet",
            },
            {
              label: "Incremento de Ventas",
              description:
                "Crecer los ingresos activando venta cruzada, reactivando clientes inactivos y automatizando pedidos sugeridos.",
              enabler: "Agentforce + Marketing Cloud",
              color: "sky",
            },
          ],
        },
      },
      {
        id: "solution",
        label: "Solución",
        title: "Solución propuesta",
        content:
          "La propuesta se estructura en tres capas de valor interconectadas, implementables de forma incremental con generación de valor en cada etapa.",
        solution: [
          {
            product: "Sales Cloud + Agentforce Sales",
            focus: "Excelencia Comercial",
            color: "indigo",
            items: [
              "Funnel de conversión automatizado",
              "Ingesta de oportunidades desde Galería Inmobiliaria y Licitacion.info",
              "Vista 360 del cliente con pedido sugerido (Einstein AI)",
              "Plan de visitas con optimización de rutas",
              "Gestión de obras con alertas y seguimiento proactivo",
              "Rigor comercial estandarizado entre asesores",
              "Pipeline analytics en tiempo real",
              "Cotización inteligente multiproducto",
            ],
          },
          {
            product: "Service Cloud + Agentforce Service",
            focus: "Atención al Cliente Omnicanal",
            color: "violet",
            items: [
              "Gestión unificada de PQR automatizada",
              "WhatsApp Business API integrado",
              "Contact Center (Konecta) con CRM nativo",
              "Automatización de pedidos por voz y WhatsApp",
              "Escalamiento inteligente por tipología",
              "Liberación de pedidos digitalizada",
              "SLAs y métricas de atención en tiempo real",
              "Base de conocimiento para autoservicio",
            ],
          },
          {
            product: "Marketing Cloud + Agentforce Mktg",
            focus: "Crecimiento y Fidelización",
            color: "sky",
            items: [
              "Microsegmentación avanzada de clientes",
              "Argos Amigos — automatización multicanal",
              "Machine Sellers: venta cruzada e incremental",
              "Reactivación automática de clientes inactivos",
              "Gestión de Trade Marketing (acciones e inversión)",
              "Analítica de efectividad de campañas",
              "Journey Builder personalizado por segmento",
              "Social Listening y gestión de RRSS",
            ],
          },
        ],
      },
      {
        id: "storytelling",
        label: "Narrativa",
        title: "Narrativa de valor",
        content: "No es una venta de licencias. Es una asociación estratégica orientada a resultados medibles.",
        narrativeData: {
          quote:
            "El cemento construye estructuras. La tecnología construye relaciones. Juntos, construimos el futuro.",
          pillars: [
            {
              title: "Cada asesor vende más",
              description:
                "Porque pasa más tiempo frente al cliente y menos en tareas administrativas. El CRM trabaja para él.",
            },
            {
              title: "Cada gerente decide mejor",
              description:
                "Porque tiene datos en tiempo real en lugar de un Excel con 24 horas de rezago.",
            },
            {
              title: "Cada cliente recibe más",
              description:
                "Una experiencia personalizada, oportuna y coherente en todos los puntos de contacto.",
            },
          ],
          closing:
            "2026 es el año ideal: SPRINT 4.0 activo, Agentforce para Manufacturing disponible, y la base de datos de clientes ya existente en Salesforce. El costo de activar nuevas capacidades es marginal comparado con una implementación desde cero.",
        },
      },
      {
        id: "outcomes",
        label: "Resultados",
        title: "Resultados esperados",
        content:
          "Los KPIs de éxito se organizan en tres dimensiones: comercial, servicio y marketing. Cada métrica tiene una línea base documentada, una meta a 6 meses y una meta a 12 meses, permitiendo demostrar valor incremental en cada etapa de la implementación.",
        kpis: [
          {
            group: "Dimensión Comercial — Sales Cloud + Agentforce",
            items: [
              {
                name: "Oportunidades creadas automáticamente",
                baseline: "0% (manual)",
                goal6m: "30%+",
                goal12m: "60%+",
              },
              {
                name: "Tiempo de creación de oportunidad",
                baseline: "Sin benchmark",
                goal6m: "< 5 min (Agente)",
                goal12m: "< 2 min (Agente)",
              },
              {
                name: "Cobertura del plan de visitas trimestral",
                baseline: "Manual / parcial",
                goal6m: "85%",
                goal12m: "95%",
              },
              {
                name: "Adopción CRM móvil en campo",
                baseline: "Sin benchmark",
                goal6m: "70%+",
                goal12m: "90%+",
              },
              {
                name: "Visibilidad de pipeline en tiempo real",
                baseline: "Rezago 24h+ (Excel)",
                goal6m: "Tiempo real",
                goal12m: "Tiempo real + predictivo",
              },
              {
                name: "Cross-sell / Up-sell por asesor",
                baseline: "Sin seguimiento",
                goal6m: "+15% ticket promedio",
                goal12m: "+25% ticket promedio",
              },
            ],
          },
          {
            group: "Dimensión de Servicio — Service Cloud + Agentforce",
            items: [
              {
                name: "PQRs resueltos por agente autónomo",
                baseline: "0% (manual)",
                goal6m: "30%+",
                goal12m: "50%+",
              },
              {
                name: "Tiempo promedio de resolución de PQR",
                baseline: "Sin benchmark oficial",
                goal6m: "Reducción 30%",
                goal12m: "Reducción 50%+",
              },
              {
                name: "Canales WhatsApp unificados",
                baseline: "Múltiples líneas separadas",
                goal6m: "1 línea unificada",
                goal12m: "Agente autónomo activo",
              },
              {
                name: "NPS de clientes (post-interacción)",
                baseline: "Sin medición sistemática",
                goal6m: "Medición en curso",
                goal12m: "+8 puntos NPS",
              },
              {
                name: "Satisfacción post-PQR (CSAT)",
                baseline: "Sin medición",
                goal6m: "Línea base establecida",
                goal12m: "> 4.2 / 5.0",
              },
            ],
          },
          {
            group: "Dimensión de Marketing — Marketing Cloud + Data Cloud",
            items: [
              {
                name: "Segmentos de cliente activos",
                baseline: "Básico (sin microsegmentación)",
                goal6m: "5+ segmentos",
                goal12m: "10+ con IA",
              },
              {
                name: "Campañas Machine Sellers automatizadas",
                baseline: "0 (proceso manual)",
                goal6m: "2 campañas activas",
                goal12m: "6+ campañas activas",
              },
              {
                name: "Clientes inactivos reactivados/mes",
                baseline: "Sin seguimiento",
                goal6m: "5%+ base inactiva",
                goal12m: "10%+ base inactiva",
              },
              {
                name: "Tasa de apertura de comunicaciones",
                baseline: "Sin benchmark CRM",
                goal6m: "25%+",
                goal12m: "35%+",
              },
              {
                name: "Carga manual del Admin CRM",
                baseline: "Alta — construye todos los reportes",
                goal6m: "Reducción 50%",
                goal12m: "Autoservicio completo",
              },
            ],
          },
        ],
      },
      {
        id: "assets",
        label: "Assets",
        title: "Assets de la demo",
        content: "Materiales disponibles y por desarrollar para soportar la conversación con Cementos Argos.",
        assetsData: {
          items: [
            {
              name: "Plan de Cuenta Estratégico",
              description: "Documento completo de 14 páginas con análisis de 20 iniciativas priorizadas, mapa de OKRs e implementación.",
              available: true,
              type: "doc",
              url: "https://drive.google.com/file/d/10LPr8Ep1bcilMDmPGL2B4ArTJkowmNHo/view?usp=sharing",
            },
            {
              name: "Deck Ejecutivo",
              description: "Presentación para sesión de Executive Briefing con Dirección Comercial y Tecnología de Argos.",
              available: false,
              type: "deck",
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
  },
];