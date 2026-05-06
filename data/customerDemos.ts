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
    title: "VivaLux AI-Powered Luxury Experience Demo",
    customerName: "VivaLux",
    industry: "Omnichannel Retail (Fashion + Home Goods)",
    description:
      "Demo conceptual orientada a mostrar cómo una marca premium puede transformar la relación con sus clientes mediante experiencias hiperpersonalizadas, datos unificados, agentes inteligentes y journeys aspiracionales impulsados por IA.",
    logo: "/Customers/vivalux-logo.png",
    passcode: "vivalux2026",
    tags: [
      "Luxury",
      "Customer 360",
      "Data Cloud",
      "Agentforce",
      "Personalization",
    ],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        title: "Resumen ejecutivo",
        content:
          "VivaLux representa una experiencia premium donde cada interacción con el cliente se siente personal, elegante y profundamente contextual. La demo muestra cómo una marca de lujo puede usar datos, IA y automatización para anticipar deseos, personalizar momentos y convertir cada contacto en una experiencia memorable.",
      },
      {
        id: "customer",
        label: "Cliente / industria",
        title: "Cliente e industria",
        content:
          "VivaLux es una marca conceptual de lujo enfocada en experiencias exclusivas, hospitalidad premium y servicios personalizados para clientes de alto valor. Su diferenciador no está únicamente en el producto o servicio, sino en la capacidad de crear momentos cuidadosamente diseñados alrededor de cada cliente.",
      },
      {
        id: "context",
        label: "Contexto",
        title: "Contexto del reto",
        content:
          "Las marcas premium enfrentan el reto de mantener una relación cercana, relevante y consistente con clientes que esperan atención excepcional. La información suele vivir dispersa entre canales, interacciones, preferencias, historial de compra, eventos y señales de intención, dificultando una experiencia verdaderamente personalizada.",
      },
      {
        id: "objective",
        label: "Objetivo",
        title: "Objetivo de la presentación",
        content:
          "Demostrar cómo VivaLux puede convertir datos fragmentados en experiencias inteligentes, permitiendo que equipos comerciales, agentes de servicio y canales digitales conozcan mejor al cliente, anticipen necesidades y recomienden acciones elegantes, oportunas y altamente personalizadas.",
      },
      {
        id: "solution",
        label: "Solución",
        title: "Solución propuesta",
        content:
          "La solución conecta perfiles unificados de cliente, preferencias, historial de interacción, señales de comportamiento y agentes inteligentes para orquestar experiencias premium. A través de Data Cloud, Agentforce y automatización de journeys, VivaLux puede generar recomendaciones, mensajes y acciones personalizadas en cada punto de contacto.",
      },
      {
        id: "storytelling",
        label: "Narrativa",
        title: "Narrativa de valor",
        content:
          "La historia sigue a un cliente de alto valor que deja de recibir comunicaciones genéricas y comienza a vivir una relación diseñada a su medida. Cada interacción —desde una invitación exclusiva hasta una recomendación personalizada— refleja que la marca entiende su estilo, sus preferencias y su momento de vida.",
      },
      {
        id: "outcomes",
        label: "Resultados",
        title: "Resultados esperados",
        content:
          "Los resultados esperados incluyen mayor lealtad, incremento en conversión de ofertas premium, mejor retención de clientes de alto valor, reducción de fricción en la atención y una experiencia de marca más consistente, aspiracional y diferenciada.",
      },
      {
        id: "assets",
        label: "Assets",
        title: "Assets de la demo",
        content:
          "Aquí se podrán incluir el guion de la demo, screenshots de journeys personalizados, arquitectura conceptual, ejemplos de prompts de agentes, mockups de experiencia, presentación ejecutiva y video demo.",
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