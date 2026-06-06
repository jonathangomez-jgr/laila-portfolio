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

export type KpiSummaryRow = {
  dimension: string;
  kpiName: string;
  value6m: string;
  value12m: string;
  color: "indigo" | "violet" | "sky";
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

export type StoryScene = {
  number: number;
  title: string;
  subtitle?: string;
  description: string;
  channel: string;
  image: string;
  icon?: string;
  pilar?: string;
  pilarColor?: "indigo" | "violet" | "sky" | "emerald" | "amber";
  products?: string[];
  insight?: string;
};

export type StoryData = {
  protagonist?: string;
  protagonistRole?: string;
  intro?: string;
  scenes: StoryScene[];
};

export type JourneyTouchpoint = {
  number: number;
  phaseId: string;
  icon: string;
  title: string;
  subtitle: string;
  before: string;
  transformation: string;
  value: string;
  products: string[];
};

export type JourneyPhase = {
  id: string;
  label: string;
  span: number;
  color: "indigo" | "violet" | "sky" | "emerald";
};

export type JourneyData = {
  phases: JourneyPhase[];
  touchpoints: JourneyTouchpoint[];
};

export type AgentforceAgent = {
  name: string;
  capabilities: string[];
};

export type AgentforceStackLayer = {
  name: string;
  items: string[];
};

export type AgentforceChannel = {
  name: string;
  items: string[];
};

export type AgentforceApp = {
  name: string;
  items: string[];
};

export type AgentforceDataNode = {
  name: string;
  items: string[];
};

export type AgentforceLandscapeData = {
  title: string;
  svgUrl?: string;
  agents: AgentforceAgent[];
  customer360: AgentforceApp[];
  aiStack: AgentforceStackLayer[];
  channels: AgentforceChannel[];
  dataCloud: AgentforceDataNode[];
};

export type AssetItem = {
  name: string;
  description: string;
  available: boolean;
  type: "doc" | "deck" | "mockup" | "arch" | "video" | "story";
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

export type ArchNode = {
  name: string;
  items: string[];
};

export type ArchZone = {
  id: string;
  label: string;
  color: "slate" | "indigo" | "violet" | "sky" | "emerald" | "amber";
  nodes: ArchNode[];
};

export type ArchBridge = {
  label: string;
  sublabel: string;
  items: string[];
};

export type ArchFoundation = {
  label: string;
  items: string[];
};

export type ArchData = {
  title: string;
  svgUrl?: string;
  zones: ArchZone[];
  bridge: ArchBridge;
  foundation: ArchFoundation;
};

export type CustomerDemoTab = {
  id: string;
  label: string;
  title: string;
  content: string;
  banner?: string;
  videoUrl?: string;
  kpis?: KpiGroup[];
  kpiSummary?: KpiSummaryRow[];
  solution?: SolutionLayer[];
  archData?: ArchData;
  objective?: ObjectiveData;
  overviewData?: OverviewData;
  customerProfile?: CustomerProfileData;
  contextData?: ContextData;
  narrativeData?: NarrativeData;
  storyData?: StoryData;
  journeyData?: JourneyData;
  assetsData?: AssetsData;
  argosArch?: true;
  argosKpiSummary?: true;
  agentforceLandscapeData?: AgentforceLandscapeData;
};

export type CustomerDemoI18n = {
  title: string;
  description: string;
  industry: string;
  tabs: { id: string; label: string; title: string; content: string }[];
};

export type CustomerDemo = {
  slug: string;
  title: string;
  customerName: string;
  industry: string;
  description: string;
  logo?: string;
  qrCode?: string;
  tags: string[];
  tabs: CustomerDemoTab[];
  passcode: string;
  translations?: { en?: CustomerDemoI18n; pt?: CustomerDemoI18n };
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
    qrCode: "/vivalux-code.png",
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
        id: "historia",
        label: "Historia",
        title: "Historia del Cliente",
        content:
          "El viaje completo de María Clara: desde la compra online hasta ver la final del Mundial con su familia, gracias a la coordinación entre LuxServe y LuxAssist.",
        storyData: {
          scenes: [
            {
              number: 1,
              title: "La final se acerca",
              description:
                "María Clara compró en línea un proyector de alta luminosidad de más de 4,000 lúmenes en VivaLux. Lo eligió porque quería ver la final del Mundial México vs. Portugal con toda su familia, incluso con la sala iluminada, sin tener que cerrar cortinas ni apagar todas las luces. La familia llegará de visita al día siguiente y el proyector es el centro del plan.",
              channel: "Hogar de María Clara / Sitio web de VivaLux",
              image: "/Customers/vivalux/vl-1.png",
            },
            {
              number: 2,
              title: "El pedido no llega",
              description:
                "A un día de la final, María Clara revisa el estado del pedido y ve que aún no ha llegado. Preocupada, escribe por WhatsApp a VivaLux para preguntar por la entrega. LuxServe le informa que el pedido ya fue enviado desde el centro logístico y que la fecha programada de entrega es el domingo, el mismo día del partido. El problema es que no puede garantizarse si llegará antes o después del inicio de la final.",
              channel: "WhatsApp / LuxServe",
              image: "/Customers/vivalux/vl-2.png",
            },
            {
              number: 3,
              title: "El miedo al país paralizado",
              description:
                "María Clara imagina el peor escenario: todo México paralizado por la final, repartidores viendo el partido, calles cerradas por festejos y su proyector llegando después de que termine el juego. Si México gana, piensa exageradamente que el país celebrará durante semanas y que el proyector llegará hasta el mes siguiente.",
              channel: "Imaginación de María Clara",
              image: "/Customers/vivalux/vl-3.png",
            },
            {
              number: 4,
              title: "La primera solución de LuxServe",
              description:
                "María Clara pregunta si puede cancelar el pedido y comprar el proyector directamente en tienda. LuxServe revisa el estado logístico y detecta que el pedido ya fue procesado, pero aún no ha salido a ruta de última milla. Por eso, puede pausarse preventivamente la entrega a domicilio mientras María Clara busca una alternativa en tienda.",
              channel: "WhatsApp / LuxServe / Sistema de órdenes VivaLux",
              image: "/Customers/vivalux/vl-4.png",
            },
            {
              number: 5,
              title: "Disponibilidad en Plaza Olimpo",
              description:
                "María Clara pregunta si el mismo proyector está disponible en la tienda VivaLux de Plaza Olimpo. LuxServe consulta inventario y confirma que aparece una unidad disponible. María Clara decide ir de inmediato a la tienda para comprarlo personalmente y asegurarse de tenerlo antes del partido.",
              channel: "WhatsApp / LuxServe / Tienda VivaLux Plaza Olimpo",
              image: "/Customers/vivalux/vl-5.png",
            },
            {
              number: 6,
              title: "La última unidad desaparece",
              description:
                "María Clara llega corriendo a Plaza Olimpo. Al entrar, casi choca con una señora que lleva una caja del mismo proyector. Cuando pregunta a una vendedora, la dependiente revisa con LuxAssist y confirma que esa era la última unidad disponible. La unidad aparecía en inventario, pero otra clienta la tomó mientras María Clara iba en camino.",
              channel: "Tienda VivaLux Plaza Olimpo / LuxAssist",
              image: "/Customers/vivalux/vl-6.png",
            },
            {
              number: 7,
              title: "Alternativas que no convencen",
              description:
                "LuxAssist recomienda productos similares disponibles en Plaza Olimpo. La vendedora le muestra otras opciones, pero María Clara explica que eligió ese modelo porque tenía más de 4,000 lúmenes y podía usarse en una sala iluminada. Los otros proyectores no cumplen del todo con esa necesidad.",
              channel: "Tienda VivaLux Plaza Olimpo / LuxAssist",
              image: "/Customers/vivalux/vl-7.png",
            },
            {
              number: 8,
              title: "Una tentación muy poco mundialista",
              description:
                "Por un segundo, María Clara mira con demasiada intensidad la caja que lleva la otra clienta. La presión del partido y la visita familiar la hacen imaginar una escena absurda en la que arrebata el proyector y sale corriendo. Pero respira profundo y decide preguntar si hay disponibilidad en otra sucursal.",
              channel: "Tienda VivaLux Plaza Olimpo",
              image: "/Customers/vivalux/vl-8.png",
            },
            {
              number: 9,
              title: "El último proyector en Los Montes",
              description:
                "La dependiente consulta nuevamente con LuxAssist. El sistema encuentra una última unidad disponible en la sucursal VivaLux Los Montes. Es una pieza de exhibición, pero está en buen estado y puede venderse. María Clara acepta. La vendedora solicita apartarla inmediatamente.",
              channel: "Tienda VivaLux Plaza Olimpo / LuxAssist / Inventario intersucursal",
              image: "/Customers/vivalux/vl-9.png",
            },
            {
              number: 10,
              title: "Apartado confirmado",
              description:
                "LuxAssist genera el apartado del proyector en Los Montes. Automáticamente se envía una notificación al equipo de esa sucursal por Slack para que localicen el producto, lo retiren de exhibición, lo marquen como apartado y lo resguarden hasta que María Clara llegue. Al mismo tiempo, María Clara recibe por WhatsApp una confirmación del apartado con el tiempo de reserva.",
              channel: "LuxAssist / Slack interno / WhatsApp / Tienda VivaLux Los Montes",
              image: "/Customers/vivalux/vl-10.png",
            },
            {
              number: 11,
              title: "La carrera contra el tráfico",
              description:
                "María Clara sale hacia Los Montes. El tráfico está pesado porque toda la ciudad se prepara para la final. Después de dos horas, llega a la sucursal. El equipo ya la estaba esperando gracias a la notificación de LuxAssist y le entrega el proyector apartado.",
              channel: "Trayecto a Los Montes / Tienda VivaLux Los Montes",
              image: "/Customers/vivalux/vl-11.png",
            },
            {
              number: 12,
              title: "Compra confirmada, entrega cancelada",
              description:
                "Cuando María Clara confirma la compra y recibe el proyector en la sucursal Los Montes, LuxAssist actualiza el estado del caso. El sistema cancela definitivamente la entrega a domicilio del pedido original, evitando duplicidad, errores logísticos y una mala experiencia posterior.",
              channel: "Tienda VivaLux Los Montes / LuxAssist / Sistema de órdenes VivaLux",
              image: "/Customers/vivalux/vl-12.png",
            },
            {
              number: 13,
              title: "El proyector no funciona",
              description:
                "María Clara llega a casa, conecta el proyector y trata de probarlo antes de que llegue la familia. Pero la imagen no aparece. Se frustra y piensa que fue un error comprar una pieza de exhibición. Con el tiempo encima, llama por teléfono a VivaLux.",
              channel: "Hogar de María Clara / Teléfono / LuxServe",
              image: "/Customers/vivalux/vl-13.png",
            },
            {
              number: 14,
              title: "LuxServe reconoce el contexto",
              description:
                "Al llamar, LuxServe identifica a María Clara por su número telefónico. El sistema reconoce su última compra en la sucursal Los Montes y anticipa el motivo probable de la llamada. El agente le pregunta si necesita ayuda con la configuración de su proyector.",
              channel: "Teléfono / LuxServe / CRM VivaLux",
              image: "/Customers/vivalux/vl-14.png",
            },
            {
              number: 15,
              title: "La configuración correcta",
              description:
                "María Clara explica que el proyector \"no sirve\". LuxServe la guía paso a paso: revisar la fuente de entrada, activar el modo de alto brillo, quitar el protector del lente y confirmar la conexión HDMI. El problema no era una falla del producto, sino una configuración inicial incompleta. El proyector enciende correctamente y la imagen se ve clara incluso con la sala iluminada.",
              channel: "Hogar de María Clara / Teléfono / LuxServe",
              image: "/Customers/vivalux/vl-15.png",
            },
            {
              number: 16,
              title: "La final en familia",
              description:
                "La familia llega a casa de María Clara. Todos se acomodan frente a la proyección, con comida, camisetas y banderas. Gracias a la atención coordinada entre LuxServe y LuxAssist, María Clara puede disfrutar la final sin preocuparse por la entrega ni por la configuración del producto.",
              channel: "Hogar de María Clara / Experiencia del cliente",
              image: "/Customers/vivalux/vl-16.png",
            },
            {
              number: 17,
              title: "La visión ejecutiva de Don Raúl",
              description:
                "Mientras María Clara disfruta el partido, Don Raúl revisa en LuxInsight el desempeño de una campaña creada para mitigar abandono de clientes. La campaña estaba dirigida a miembros del programa de lealtad con intereses en tecnología y fútbol. Los datos muestran que la campaña fue altamente efectiva: aumentó la conversión, redujo cancelaciones y provocó sold out de proyectores de más de 4,000 lúmenes.",
              channel: "Oficinas de VivaLux / LuxInsight / Dashboard ejecutivo",
              image: "/Customers/vivalux/vl-17.png",
            },
            {
              number: 18,
              title: "De una urgencia individual a una estrategia ganadora",
              description:
                "LuxInsight conecta los puntos: clientes con interés en fútbol, alta intención de compra, riesgo de abandono por entregas inciertas, búsqueda de disponibilidad en tienda y preferencia por proyectores de alta luminosidad. El caso de María Clara deja de ser solo una atención aislada y se convierte en evidencia de una estrategia omnicanal exitosa para VivaLux.",
              channel: "LuxInsight / Omnichannel Command Center / Estrategia VivaLux",
              image: "/Customers/vivalux/vl-18.png",
            },
          ],
        },
      },
      {
        id: "outcomes",
        label: "Resultados",
        title: "Resultados esperados",
        content:
          "Los KPIs de éxito se organizan en tres dimensiones: experiencia del cliente, eficiencia operativa y revenue uplift. Cada métrica tiene línea base documentada, meta a 6 meses y meta a 12 meses — diseñadas para demostrar valor financiero cuantificable ante el Directorio en cada fase.",
        kpiSummary: [
          {
            dimension: "Experiencia al Cliente",
            kpiName: "NPS Score",
            value6m: "+8 pts → 49",
            value12m: "+15 pts → 56",
            color: "indigo",
          },
          {
            dimension: "Eficiencia Operativa",
            kpiName: "Costo operativo Tier-1 anual",
            value6m: "Reducción 40%",
            value12m: "Reducción 75% = $8.2M ahorrado",
            color: "violet",
          },
          {
            dimension: "Revenue Uplift",
            kpiName: "Ticket promedio en tienda",
            value6m: "+10% piloto 5 tiendas",
            value12m: "+23% = $27M uplift anual",
            color: "sky",
          },
        ],
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
        id: "arquitectura",
        label: "Arquitectura",
        title: "System Landscape — VivaLux",
        content:
          "Vista completa del ecosistema tecnológico de VivaLux: sistemas externos, capa de integración MuleSoft, productos Salesforce y el foundation de Einstein Trust Layer.",
        archData: {
          title: "VivaLux System Landscape",
          svgUrl: "/vivalux-landscape.svg",
          zones: [
            {
              id: "external",
              label: "Sistemas Externos",
              color: "slate",
              nodes: [
                {
                  name: "SAP (ERP)",
                  items: ["Finanzas", "Proveedores", "Inventario"],
                },
                {
                  name: "NCR (POS)",
                  items: ["Caja", "Pagos", "Inventario en tienda", "Cambios", "Devoluciones", "Promociones"],
                },
                {
                  name: "Manhattan (Warehouse)",
                  items: ["Recepción", "Picking", "Packing", "Inventario", "Despacho"],
                },
                {
                  name: "Manhattan (OMS)",
                  items: ["Pedidos", "Entregas", "Sourcing", "Shipments", "Cambios", "Devoluciones", "Reembolsos"],
                },
              ],
            },
            {
              id: "salesforce",
              label: "Salesforce Customer 360",
              color: "indigo",
              nodes: [
                {
                  name: "Sales",
                  items: ["Account Management", "Contact Management", "Partner mgmt", "Forecast", "Territories"],
                },
                {
                  name: "Service",
                  items: ["Case management", "SLAs", "Escalations", "Contact Center", "Omni-channel", "Field Service"],
                },
                {
                  name: "Marketing",
                  items: ["Marketing Cloud Engagement", "Personalization", "Loyalty"],
                },
                {
                  name: "Commerce",
                  items: ["Storefront", "Order Management", "Product Catalogs", "Campaigns & Promos"],
                },
                {
                  name: "Industries",
                  items: ["Retail Execution"],
                },
                {
                  name: "Slack",
                  items: ["Slackbot", "Collaboration", "Integration", "3rd party apps", "Agents"],
                },
                {
                  name: "Tableau",
                  items: ["Tableau Cloud", "Tableau Pulse", "Tableau Agent"],
                },
                {
                  name: "Data Cloud",
                  items: ["Harmonization", "Identity resolution", "Segmentation", "Data Graphs", "Calculated Insights", "Unstructured Data / Retrievers"],
                },
              ],
            },
            {
              id: "zerocopy",
              label: "Zero Copy Partner Network",
              color: "sky",
              nodes: [
                {
                  name: "Snowflake (Zero Copy)",
                  items: ["customer_master", "sales_transactions", "order_history"],
                },
              ],
            },
          ],
          bridge: {
            label: "MuleSoft Integration",
            sublabel: "API-Led Connectivity",
            items: ["Anypoint Platform", "Anypoint Design Center", "Anypoint Monitoring", "API Manager"],
          },
          foundation: {
            label: "Einstein Trust Layer — Core Metadata Platform",
            items: ["Built-in AI", "Copilot", "Agentforce"],
          },
        },
      },
      {
        id: "agentforce-landscape",
        label: "Agentforce Landscape",
        title: "Agentforce Landscape — VivaLux",
        content:
          "Mapa del ecosistema de Agentforce para VivaLux: agentes inteligentes, AI Stack, canales de interacción, Customer 360 y Data Cloud.",
        agentforceLandscapeData: {
          title: "VivaLux Agentforce Landscape",
          svgUrl: "/vivalux-agentforce-landscape.svg",
          agents: [
            {
              name: "LuxServe (Service)",
              capabilities: [
                "Order Tracking",
                "Warranty",
                "Troubleshooting",
                "FAQs",
                "Case Management",
              ],
            },
            {
              name: "LuxAssist (In-Store)",
              capabilities: [
                "Order Management",
                "Recommendations",
                "Multi-Store Collab",
                "Customer Insights",
              ],
            },
            {
              name: "LuxInsights (Marketing)",
              capabilities: [
                "Churn Risk",
                "Product Trends",
                "Promotions & Campaigns Insights",
                "Proactive Insights",
              ],
            },
          ],
          customer360: [
            {
              name: "Sales",
              items: ["Account Mgmt", "Contact Mgmt", "Forecast", "Territories"],
            },
            {
              name: "Service",
              items: ["Case Mgmt", "SLAs", "Omni-channel", "Contact Center"],
            },
            {
              name: "Marketing",
              items: ["Engagement", "Personalization", "Loyalty"],
            },
            {
              name: "Commerce",
              items: ["Storefront", "Order Mgmt", "Catalogs", "Promos"],
            },
          ],
          aiStack: [
            {
              name: "Generative Services & Apps",
              items: [
                "Agentforce Studio",
                "Prompt Template",
                "Analytics",
                "Optimization",
              ],
            },
            {
              name: "Foundational Services",
              items: [
                "Generative AI Gateway",
                "Content Moderation",
                "Masking & Demasking",
                "Inference Engine & Domain Adaptation",
              ],
            },
            {
              name: "Foundational Models",
              items: [
                "Internal Models by Salesforce",
                "Salesforce-Hosted Models",
                "OpenAI",
                "Anthropic",
                "Vertex AI",
                "AWS Sagemaker",
                "Cohere",
              ],
            },
            {
              name: "Human in the Loop",
              items: ["Content Review", "Feedback"],
            },
          ],
          channels: [
            {
              name: "Messaging",
              items: ["WhatsApp", "SMS", "Web Chat", "Email"],
            },
            {
              name: "Slack",
              items: ["Slackbot", "Internal Collab", "Agent Notifications"],
            },
            {
              name: "Tableau",
              items: ["Tableau Cloud", "Tableau Pulse", "Tableau Agent"],
            },
          ],
          dataCloud: [
            {
              name: "AI Ready Data",
              items: ["DMO Retriever", "File Retriever", "Web Retriever", "Data Libraries"],
            },
            {
              name: "Unificación",
              items: ["Harmonization", "Identity Resolution", "Segmentation"],
            },
            {
              name: "Insights",
              items: ["Data Graphs", "Calculated Insights"],
            },
            {
              name: "Unstructured",
              items: ["Unstructured Data", "Retrievers"],
            },
          ],
        },
      },
      {
        id: "assets",
        label: "Assets",
        title: "Assets de la solución",
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
              url: "/plan_cuenta_vivalux.docx.pdf",
            },
            {
              name: "Deck Ejecutivo Board VivaLux",
              description:
                "Presentación de 20 min para el Directorio: problema, solución, ROI por fase y próximos pasos — co-presentada con IT Director como co-sponsor técnico.",
              available: true,
              type: "deck",
              url: "/customer-demos/vivalux/deck/executive",
            },
            {
              name: "Demo en Vivo LuxServe en WhatsApp",
              description:
                "Demo live de Agentforce resolviendo un caso real de VivaLux (order status en WhatsApp simulado con datos ficticios de muestra).",
              available: false,
              type: "video",
            },
            {
              name: "Arquitectura de Referencia",
              description:
                "Diagrama de la arquitectura de solución completa: capas de datos, integración y agentes inteligentes del Customer Intelligence Ecosystem sobre Salesforce Platform.",
              available: true,
              type: "arch",
              url: "/[JGR]VivaLux-System-landscape.pdf",
            },
            {
              name: "Agentforce Landscape",
              description:
                "Mapa completo del ecosistema de Agentforce para VivaLux: agentes, capacidades y puntos de integración dentro de la plataforma Salesforce.",
              available: true,
              type: "arch",
              url: "/[JGR]VivaLux-Agentforce-landscape.pdf",
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
    translations: {
      en: {
        title: "Intelligent Customer Experience Transformation with Agentforce",
        description: "Strategic account plan to transform VivaLux's post-purchase experience through Salesforce Agentforce, Service Cloud, and Data Cloud — reversing a 21-point NPS drop and unlocking $180M+ in combined value from operational savings, retention, and revenue uplift.",
        industry: "Omnichannel Retail — Fashion and Home Goods",
        tabs: [
          { id: "overview", label: "Overview", title: "Executive summary", content: "VivaLux Retail Group faces a dangerous paradox: its commercial growth is being eroded by a post-purchase experience that doesn't scale. In 18 months, NPS dropped from 62 to 41 — a critical signal representing tens of millions in at-risk revenue. This plan proposes an executable roadmap in 3 phases with a projected 340% ROI in the first year." },
          { id: "customer", label: "Client / industry", title: "Client and industry", content: "Omnichannel fashion and home goods retailer with multi-country presence in Latin America. Business model combining physical stores, e-commerce, WhatsApp, and social media. Its strategic ambition is aggressive expansion in 3 years — new markets, more stores, and digital channels." },
          { id: "context", label: "Context", title: "Challenge context", content: "Five critical pain points with quantifiable financial impact. This diagnosis is not just technical — it is the foundation of the business case for the Board." },
          { id: "objective", label: "Objective", title: "Reconvert every touchpoint into an intelligent, proactive experience.", content: "Three value hypotheses. One platform. Measurable results in 90 days." },
          { id: "solution", label: "Solution", title: "Customer Intelligence Agent Ecosystem", content: "Four intelligent agents built on three pillars: unified data (Data Cloud), robust integration (MuleSoft), and agentic intelligence (Agentforce). Each agent acts autonomously within defined guardrails and collaborates with the others seamlessly." },
          { id: "storytelling", label: "Narrative", title: "Value narrative", content: "This is not a license sale. It is a fundamental reconfiguration of how VivaLux understands, anticipates, and serves its customers." },
          { id: "historia", label: "Story", title: "Customer Story", content: "María Clara's complete journey: from online purchase to watching the World Cup final with her family, thanks to the coordinated effort between LuxServe and LuxAssist." },
          { id: "outcomes", label: "Results", title: "Expected outcomes", content: "Success KPIs are organized across three dimensions: customer experience, operational efficiency, and revenue uplift. Each metric has a documented baseline, 6-month target, and 12-month target — designed to demonstrate quantifiable financial value to the Board at each phase." },
          { id: "arquitectura", label: "Architecture", title: "System Landscape — VivaLux", content: "Full view of the VivaLux technology ecosystem: external systems, MuleSoft integration layer, Salesforce products, and the Einstein Trust Layer foundation." },
          { id: "agentforce-landscape", label: "Agentforce Landscape", title: "Agentforce Landscape — VivaLux", content: "Map of the Agentforce ecosystem for VivaLux: intelligent agents, AI Stack, interaction channels, Customer 360, and Data Cloud." },
          { id: "assets", label: "Assets", title: "Solution assets", content: "Available and to-be-developed materials to support the conversation with VivaLux Retail Group." },
        ],
      },
      pt: {
        title: "Transformação Inteligente da Experiência do Cliente com Agentforce",
        description: "Plano de conta estratégico para transformar a experiência pós-compra da VivaLux por meio do Salesforce Agentforce, Service Cloud e Data Cloud — revertendo uma queda de 21 pontos no NPS e desbloqueando mais de $180M em valor combinado de economias operacionais, retenção e aumento de receita.",
        industry: "Varejo Omnicanal — Moda e Artigos para Casa",
        tabs: [
          { id: "overview", label: "Overview", title: "Resumo executivo", content: "O VivaLux Retail Group enfrenta um paradoxo perigoso: seu crescimento comercial está sendo erodido por uma experiência pós-compra que não escala. Em 18 meses, o NPS caiu de 62 para 41 — um sinal crítico que representa dezenas de milhões em receita em risco. Este plano propõe um roadmap executável em 3 fases com ROI projetado de 340% no primeiro ano." },
          { id: "customer", label: "Cliente / indústria", title: "Cliente e indústria", content: "Varejista omnicanal de moda e artigos para casa com presença em múltiplos países na América Latina. Modelo de negócio que combina lojas físicas, e-commerce, WhatsApp e redes sociais. Sua ambição estratégica é a expansão agressiva em 3 anos — novos mercados, mais lojas e canais digitais." },
          { id: "context", label: "Contexto", title: "Contexto do desafio", content: "Cinco pontos de dor críticos com impacto financeiro quantificável. Este diagnóstico não é apenas técnico — é a base do caso de negócio para o Conselho." },
          { id: "objective", label: "Objetivo", title: "Reconverter cada ponto de contato em uma experiência inteligente e proativa.", content: "Três hipóteses de valor. Uma plataforma. Resultados mensuráveis em 90 dias." },
          { id: "solution", label: "Solução", title: "Customer Intelligence Agent Ecosystem", content: "Quatro agentes inteligentes construídos sobre três pilares: dados unificados (Data Cloud), integração robusta (MuleSoft) e inteligência agêntica (Agentforce). Cada agente age de forma autônoma dentro de guardrails definidos e colabora com os demais de forma fluida." },
          { id: "storytelling", label: "Narrativa", title: "Narrativa de valor", content: "Não é uma venda de licenças. É uma reconfiguração fundamental de como a VivaLux entende, antecipa e serve seus clientes." },
          { id: "historia", label: "História", title: "História do Cliente", content: "A jornada completa de María Clara: desde a compra online até assistir à final da Copa do Mundo com sua família, graças à coordenação entre LuxServe e LuxAssist." },
          { id: "outcomes", label: "Resultados", title: "Resultados esperados", content: "Os KPIs de sucesso estão organizados em três dimensões: experiência do cliente, eficiência operacional e aumento de receita. Cada métrica tem uma linha de base documentada, meta de 6 meses e meta de 12 meses — projetadas para demonstrar valor financeiro quantificável ao Conselho em cada fase." },
          { id: "arquitectura", label: "Arquitetura", title: "System Landscape — VivaLux", content: "Visão completa do ecossistema tecnológico da VivaLux: sistemas externos, camada de integração MuleSoft, produtos Salesforce e a fundação Einstein Trust Layer." },
          { id: "agentforce-landscape", label: "Agentforce Landscape", title: "Agentforce Landscape — VivaLux", content: "Mapa do ecossistema Agentforce para VivaLux: agentes inteligentes, AI Stack, canais de interação, Customer 360 e Data Cloud." },
          { id: "assets", label: "Ativos", title: "Ativos da solução", content: "Materiais disponíveis e a serem desenvolvidos para apoiar a conversa com o VivaLux Retail Group." },
        ],
      },
    },
  },
  {
    slug: "grupo-argos",
    title: "Cementos Argos — Plataforma de Inteligencia Comercial con Agentforce",
    customerName: "Grupo Argos",
    industry: "Materiales de Construcción",
    description:
      "Plan de cuenta estratégico articulado en tres pilares: Market Share (+15%), Segmentación de alta resolución e Integración Tecnológica. Argos ya opera Salesforce — la conversación es de evolución y profundización hacia una plataforma agéntica con Agentforce.",
    logo: "/Customers/logo-argos.svg",
    passcode: "argos2026",
    tags: [
      "Sales Cloud",
      "Agentforce",
      "Service Cloud",
      "Marketing Cloud",
      "Data Cloud",
      "MuleSoft",
      "Manufacturing",
    ],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        title: "Resumen ejecutivo",
        banner: "/Customers/cementos-argos.jpg",
        content:
          "Cementos Argos ya opera Salesforce — la conversación es de evolución y profundización. Este plan articula 20 iniciativas sobre tres pilares estratégicos: Market Share (+15%), Segmentación de alta resolución e Integración Tecnológica para eliminar silos.",
        overviewData: {
          stats: [
            { value: "90+", label: "Años de trayectoria" },
            { value: "$5.3B", label: "COP ingresos 2024 (consolidado)" },
            { value: "16", label: "Países y territorios" },
            { value: "40%+", label: "Ventas digitales (Argos ONE)" },
            { value: "11%", label: "Crecimiento canal ferreterías 2025" },
            { value: "25%", label: "Margen EBITDA 2025 — meta SPRINT cumplida" },
          ],
        },
      },
      {
        id: "customer",
        label: "Cliente / industria",
        title: "Cliente e industria",
        content:
          "Producción y comercialización de cemento, concreto y agregados. Sede en Medellín, Colombia. SPRINT 4.0 activo: márgenes EBITDA 24-26%, crecimiento y digitalización para 2026-2027.",
        customerProfile: {
          stats: [
            { label: "Nombre", value: "Cementos Argos S.A. (subsidiaria de Grupo Argos S.A.)" },
            { label: "Sede", value: "Medellín, Colombia" },
            { label: "Fundación", value: "1934 — 90+ años de trayectoria" },
            { label: "Ingresos 2024", value: "COP 5.3 billones (~USD 1,300M)" },
            { label: "EBITDA 2025", value: "COP 1.3 billones | Margen 25% (meta SPRINT cumplida 1 año antes)" },
            { label: "Meta Market Share", value: "+15% — Pilar estratégico #1" },
            { label: "Canal Masivo 2025", value: "11% crecimiento en ferreterías (Retail Digital)" },
            { label: "Clientes clave", value: "~360 (80% del volumen)" },
            { label: "Integrador CRM", value: "Quantics" },
            { label: "Canal digital", value: "Argos ONE (40%+ ventas digitales)" },
            { label: "Programa", value: "SPRINT 4.0 (2026-2027)" },
          ],
          segments: [
            {
              name: "Negocio Industrial",
              description:
                "Atiende obras de infraestructura, constructoras y proyectos licitados. Cotizaciones técnicas complejas de cemento, concreto y agregados. Seguimiento de obras registradas en Galería Inmobiliaria y Licitacion.info. Stakeholders: Jorge Mario Yepes, Luz Cristina (apoyo industrial).",
            },
            {
              name: "Negocio Masivo — Canal Retail Digital",
              description:
                "Gestiona ~360 clientes que representan el 80% del volumen: ferreterías (crecimiento 11% en 2025), distribuidores mayoristas/detallistas y cadenas (Homecenter, Easy). Principal vehículo para el objetivo de +15% de market share. Stakeholders: Carlos Alzate, Sandra Pulgarin (Admin CRM), Carolina Camacho, Luz Mari.",
            },
          ],
          techStack: [
            { category: "CRM", tool: "Salesforce (Sales Cloud + Service Cloud — en producción)" },
            { category: "ERP", tool: "SAP (sin integración en tiempo real — brecha Pilar 3)" },
            { category: "BI", tool: "Tableau (reportes de ventas y RADAR de fuga)" },
            { category: "E-commerce", tool: "Argos ONE (sin visibilidad en Salesforce — brecha Pilar 3)" },
            { category: "Email Mktg", tool: "Brevo (envío masivo, sin microsegmentación — brecha Pilar 2)" },
            { category: "Fidelización", tool: "Gluki (integrado con CRM para Argos Amigos y Trade Mkt)" },
            { category: "Contact Center", tool: "Konecta / BTO (sin integración omnicanal — brecha Pilar 3)" },
            { category: "Integrador CRM", tool: "Quantics (soporte y desarrollo Salesforce)" },
            { category: "Com. interna", tool: "Grupos de WhatsApp (no estandarizado, sin trazabilidad)" },
          ],
        },
      },
      {
        id: "context",
        label: "Contexto",
        title: "Contexto del reto",
        content:
          "Las sesiones de discovery revelaron un ecosistema CRM activo pero con brechas críticas en tres dimensiones. Cada brecha está mapeada a uno de los tres pilares estratégicos de Cementos Argos.",
        contextData: {
          groups: [
            {
              name: "PILAR 1 — Market Share: Brechas Comerciales",
              findings: [
                "Plan de visitas 100% manual: sin optimización de rutas ni ciclos automatizados por territorio",
                "Oportunidades no capturadas: creación manual, dependiente de la acción del asesor",
                "Sin mecanismo de alerta para clientes que reducen volumen o llevan días sin actividad",
                "Cotización de concretos excesivamente compleja — frena el cierre de oportunidades",
                "Reporte diario de ventas por email en Excel con rezago de 24h+ — toma de decisiones lenta",
                "Liberación de pedidos manual con fotos de consignaciones vía WhatsApp — alta carga operativa",
              ],
            },
            {
              name: "PILAR 2 — Segmentación: Brechas de Marketing y Fidelización",
              findings: [
                "Segmentación básica: sin perfiles diferenciados por tipo de ferretería, tamaño o productos clave",
                "Campañas de fidelización (Argos Amigos, Trade Mkt) con cargue manual de bases de datos",
                "Machine Sellers opera manualmente desde el laboratorio digital — sin automatización",
                "Sin trazabilidad entre inversión de marketing (Trade Mkt, promociones) y venta real",
                "Chatter implementado pero no utilizado como canal de colaboración ni para campañas",
                "Base de datos no enriquecida: sin atributos de comportamiento digital (Argos ONE)",
              ],
            },
            {
              name: "PILAR 3 — Integración: Brechas Tecnológicas",
              findings: [
                "Argos ONE (40%+ de ventas digitales) no está integrado con Salesforce — experiencia fragmentada",
                "Salesforce y SAP sin integración en tiempo real: inventario, crédito y capacidad requieren verificación manual",
                "Servicio al Cliente opera sin visibilidad del comportamiento digital del cliente en Argos ONE",
                "PQRs gestionadas en silos por canal (WhatsApp, web, Contact Center, RRSS) sin consolidación",
                "Múltiples líneas de WhatsApp sin unificación ni agente centralizado",
                "Sin capacidad offline robusta en la app móvil — pérdida de información en campo",
              ],
            },
          ],
        },
      },
      {
        id: "objective",
        label: "Objetivo",
        title: "Posicionar Salesforce como la plataforma que habilita los tres pilares de Argos.",
        content:
          "20 iniciativas. 3 pilares estratégicos. Una plataforma que conecta tecnología con los resultados del negocio.",
        objective: {
          headline:
            "Posicionar a Salesforce como la plataforma que habilita los tres pilares estratégicos de Cementos Argos: crecer en market share con herramientas comerciales para el canal masivo, desplegar fidelización con microsegmentación de alta resolución, e integrar el ecosistema para dar visión 360 unificada.",
          okrs: [
            {
              label: "PILAR 1 — Market Share",
              description:
                "Meta: +15% de crecimiento. Equipar al equipo comercial con herramientas que aumenten la productividad en campo y la conversión de oportunidades. Canal ferreterías ya creció 11% en 2025 — hay mercado resiliente que capturar.",
              enabler: "Sales Cloud + Agentforce SDR + Salesforce Maps",
              color: "indigo",
            },
            {
              label: "PILAR 2 — Segmentación",
              description:
                "Alta resolución y agilidad operativa sin aumentar headcount. Microsegmentación para campañas efectivas, automatización de Machine Sellers y trazabilidad completa inversión de marketing → venta real (ROI).",
              enabler: "Marketing Cloud + Data Cloud + Agentforce Mktg",
              color: "violet",
            },
            {
              label: "PILAR 3 — Integración Tecnológica",
              description:
                "Eliminar silos de información. Argos ONE visible en CRM. Salesforce integrado con SAP en tiempo real. Visión 360 del cliente para ventas y servicio.",
              enabler: "MuleSoft + Service Cloud + WhatsApp Business API",
              color: "sky",
            },
          ],
        },
      },
      {
        id: "storytelling",
        label: "Narrativa",
        title: "Narrativa de valor",
        content: "Los tres pilares no son un framework inventado: son el diagnóstico honesto de las tres brechas que separan a Argos de su próximo nivel de desempeño.",
        narrativeData: {
          quote:
            "El cemento construye estructuras. La tecnología construye relaciones. Juntos, construimos el futuro comercial de Argos.",
          pillars: [
            {
              title: "Market share porque hay mercado",
              description:
                "El canal de ferreterías creció 11% en 2025 con las herramientas actuales. Con Salesforce Maps, Agentforce SDR y Vista 360, el potencial de crecimiento hacia el +15% es alcanzable.",
            },
            {
              title: "Segmentación porque la genérica desperdicia",
              description:
                "Cada punto de participación de mercado vale miles de millones. La microsegmentación con Data Cloud sobre datos existentes tiene un costo marginal comparado con construir desde cero.",
            },
            {
              title: "Integración porque los silos cuestan",
              description:
                "Argos ONE genera el 40%+ de las ventas. Cada día sin integración con Salesforce es un día donde el equipo de servicio opera a ciegas. MuleSoft tiene conectores nativos para SAP — no es desarrollo desde cero.",
            },
          ],
          closing:
            "2026 es el año ideal: SPRINT 4.0 exige márgenes EBITDA 24-26%, Agentforce for Manufacturing disponible con habilidades preconfiguradas, y la base de clientes ya existe en Salesforce. El time-to-value es significativamente menor que hace 12 meses.",
        },
      },
      {
        id: "solution",
        label: "Solución",
        title: "Solución propuesta",
        content:
          "La arquitectura propuesta es una respuesta directa a los tres pilares estratégicos de Argos. Cada capa de la plataforma está alineada con al menos un pilar, y la integración entre capas cierra las brechas identificadas en el proceso de discovery.",
        solution: [
          {
            product: "Sales Cloud + Agentforce Sales + Maps",
            focus: "PILAR 1 — Market Share",
            color: "indigo",
            items: [
              "Funnel de conversión automatizado (Agente SDR)",
              "Ingesta obras/licitaciones desde Galería Inmobiliaria, Licitacion.info y Secop",
              "Vista 360 del cliente con pedido sugerido (Einstein AI)",
              "Plan de visitas inteligente por ruta y territorio (Salesforce Maps)",
              "Alertas RADAR — clientes en riesgo de fuga integrado en CRM",
              "Cotización inteligente multiproducto (cemento, concreto, agregados)",
              "Dashboards en tiempo real por nivel jerárquico",
              "Gestión de obras con alertas de finalización",
            ],
          },
          {
            product: "Marketing Cloud + Data Cloud + Agentforce Mktg",
            focus: "PILAR 2 — Segmentación",
            color: "violet",
            items: [
              "Microsegmentación: ferreterías A/B/C por volumen, constructoras por proyecto, distribuidores por canal",
              "Journey Builder por perfil y comportamiento",
              "Machine Sellers: venta cruzada/incremental automatizada",
              "Argos Amigos — fidelización multicanal automatizada",
              "Trade Marketing: gestión de acciones, inversión y analítica de ROI",
              "Trazabilidad completa: inversión en campaña → activación → pedido → venta",
              "Reactivación automática de clientes inactivos",
              "Unificación Brevo + Gluki en Data Cloud",
            ],
          },
          {
            product: "MuleSoft + Service Cloud + WhatsApp API",
            focus: "PILAR 3 — Integración Tecnológica",
            color: "sky",
            items: [
              "Integración Argos ONE ↔ Salesforce en tiempo real vía MuleSoft",
              "Conector SAP ↔ Salesforce: inventario, crédito y capacidad productiva desde CRM",
              "Service Cloud Omni-Channel: PQRs unificados desde todos los canales",
              "WhatsApp Business API: línea única con Agente autónomo para pedidos y PQRs",
              "PQR automatizado con clasificación inteligente y SLAs",
              "Liberación de pedidos digitalizada (sin fotos de consignaciones manuales)",
              "App móvil robusta con capacidad offline",
              "Visión 360 Servicio: CRM + Argos ONE + SAP unificados",
            ],
          },
        ],
      },
      {
        id: "arquitectura",
        label: "Arquitectura",
        title: "Arquitectura Técnica — Cementos Argos",
        content:
          "Vista completa de las 4 capas de la solución: canales de contacto, plataforma Salesforce (9 productos + Agentforce transversal), capa de integración MuleSoft (5 conectores bidireccionales en tiempo real) y sistemas externos del ecosistema Argos. Las brechas críticas de integración están marcadas con su estado y solución propuesta.",
        argosArch: true,
      },
      {
        id: "outcomes",
        label: "Resultados",
        title: "Resultados esperados",
        content:
          "Los KPIs de éxito se organizan por pilar estratégico. Cada métrica tiene línea base documentada en sesiones de discovery, meta a 6 meses y meta a 12 meses.",
        argosKpiSummary: true,
        kpis: [
          {
            group: "PILAR 1 — Market Share: KPIs Comerciales",
            items: [
              {
                name: "Crecimiento de Market Share (Canal Masivo)",
                baseline: "Base: +11% en ferreterías 2025",
                goal6m: "+13%",
                goal12m: "+15% (meta SPRINT)",
              },
              {
                name: "Oportunidades creadas automáticamente",
                baseline: "0% (proceso manual)",
                goal6m: "30%+",
                goal12m: "60%+",
              },
              {
                name: "Cobertura del plan de visitas trimestral",
                baseline: "Manual / parcial",
                goal6m: "85%",
                goal12m: "95%+",
              },
              {
                name: "Clientes en riesgo gestionados proactivamente",
                baseline: "Sin seguimiento sistemático",
                goal6m: "RADAR activo 100%",
                goal12m: "Reducción fuga >20%",
              },
              {
                name: "Tiempo de decisión de venta (inventario/crédito)",
                baseline: "Manual — horas/días (sin SAP integrado)",
                goal6m: "Tiempo real (MuleSoft piloto)",
                goal12m: "Tiempo real para todos los asesores",
              },
            ],
          },
          {
            group: "PILAR 2 — Segmentación: KPIs de Marketing y Fidelización",
            items: [
              {
                name: "Segmentos de cliente activos y diferenciados",
                baseline: "Segmentación básica (sin microsegm.)",
                goal6m: "5+ segmentos activos",
                goal12m: "10+ con enriquecimiento IA",
              },
              {
                name: "Campañas Machine Sellers automatizadas",
                baseline: "0 — proceso manual (Lab Digital)",
                goal6m: "2 campañas activas",
                goal12m: "6+ campañas activas",
              },
              {
                name: "Clientes inactivos reactivados por mes",
                baseline: "Sin seguimiento",
                goal6m: "5%+ base inactiva",
                goal12m: "10%+ base inactiva",
              },
              {
                name: "Trazabilidad inversión mktg → venta (ROI)",
                baseline: "Sin trazabilidad",
                goal6m: "Línea base establecida",
                goal12m: "ROI visible por campaña",
              },
              {
                name: "Carga manual Admin CRM (Sandra Pulgarin)",
                baseline: "Alta — construye todos los reportes",
                goal6m: "Reducción 50%",
                goal12m: "Autoservicio completo",
              },
            ],
          },
          {
            group: "PILAR 3 — Integración Tecnológica: KPIs de Experiencia y Eficiencia",
            items: [
              {
                name: "Actividad Argos ONE visible en Salesforce",
                baseline: "0% — silo completo",
                goal6m: "POC integración activo (Meta 3 meses)",
                goal12m: "100% integrado (MuleSoft)",
              },
              {
                name: "Consulta SAP desde Salesforce (inventario/crédito)",
                baseline: "Proceso manual / asíncrono",
                goal6m: "Piloto conector activo",
                goal12m: "Tiempo real para todos los asesores",
              },
              {
                name: "PQRs resueltos por Agente autónomo",
                baseline: "0% — gestión manual Konecta",
                goal6m: "30%+ automatizados",
                goal12m: "50%+ automatizados",
              },
              {
                name: "Canales WhatsApp unificados",
                baseline: "Múltiples líneas separadas",
                goal6m: "1 línea unificada + agente",
                goal12m: "Agente autónomo con >80% resolución",
              },
              {
                name: "NPS post-interacción (medición sistemática)",
                baseline: "Sin medición en CRM",
                goal6m: "Medición activa",
                goal12m: "+8 puntos NPS vs. línea base",
              },
            ],
          },
        ],
      },
      {
        id: "historia",
        label: "Historia",
        title: "La ferretería de Don Hernán y el equipo que nunca duerme",
        content:
          "Hernán Ríos lleva años al frente de Ferretería El Paisa en Itagüí, Antioquia. Un cliente masivo clase B que compraba entre 12 y 15 toneladas de cemento al mes — hasta que dejó de hacerlo. Esta es la historia de cómo Salesforce convirtió un cliente en riesgo de fuga en el distribuidor más activo del trimestre.",
        storyData: {
          protagonist: "Hernán Ríos",
          protagonistRole: "Propietario · Ferretería El Paisa · Itagüí, Antioquia",
          intro: "Hernán Ríos y Ferretería El Paisa son personajes compuestos que representan fielmente el perfil del cliente masivo clase B del canal ferreterías. La historia ilustra el futuro posible habilitado por Salesforce Agentforce — basada en hallazgos reales del proceso de discovery con el equipo de Cementos Argos.",
          scenes: [
            {
              number: 1,
              title: "El RADAR no miente",
              subtitle: "Lunes · 06:47 a.m. · Salesforce CRM · Zona Antioquia",
              icon: "📡",
              description: "Antes de que Carlos Alzate, asesor de Cementos Argos para el canal masivo de Medellín, tome su primer café, Agentforce ya leyó el RADAR nocturno. El modelo predictivo integrado en Sales Cloud procesó las compras de los últimos 60 días de todos sus clientes. Un nombre aparece marcado en rojo: Ferretería El Paisa — Hernán Ríos. Hace tres trimestres compraba entre 12 y 15 toneladas al mes. En agosto compró 9. En septiembre, 6. En las últimas tres semanas: nada. La alerta llega al celular de Carlos a las 7:02 a.m. — con índice de riesgo 89/100, acción sugerida y contexto completo. No tuvo que pedirle a Sandra que armara un Excel. El sistema lo buscó a él.",
              channel: "Sales Cloud · Agentforce · Einstein AI",
              image: "/Customers/argos/story-v2/Escena-01.png",
              pilar: "P1 · Market Share · P3 · Integración",
              pilarColor: "indigo",
              products: ["Sales Cloud", "Agentforce SDR", "Einstein AI", "RADAR"],
              insight: "Antes, el RADAR existía en Tableau como un informe descargado una vez por semana. Para cuando Carlos lo veía, Don Hernán ya podría haber firmado con la competencia. Ahora la alerta llega en tiempo real con acción sugerida.",
            },
            {
              number: 2,
              title: "La Vista 360 — todo en una pantalla",
              subtitle: "Lunes · 07:15 a.m. · Salesforce Mobile · Camino a Itagüí",
              icon: "📱",
              description: "Carlos abre el perfil de Don Hernán en Salesforce desde el carro. Antes de tocar la puerta, ya sabe todo: compra últimos 90 días (6.1 ton vs. 14.3 ton el año anterior), pedido sugerido por Einstein (12 ton Argos 50 + 2 ton Cemento Gris), estado de cartera al día, cupo disponible $8.2M COP. Pero hay algo más: Don Hernán sí entró a Argos ONE hace cinco días y cotizó 8 toneladas, pero no terminó el pedido. Esa información antes era invisible. Hoy, gracias a la integración de Argos ONE con Salesforce vía MuleSoft, ese dato llega al perfil del cliente en tiempo real. Don Hernán no se fue. Está dudando. Carlos sabe exactamente cómo entrar a esa conversación.",
              channel: "Salesforce Mobile · MuleSoft · SAP · Argos ONE",
              image: "/Customers/argos/story-v2/Escena-02.png",
              pilar: "P1 · Pedido sugerido · P3 · Visión 360",
              pilarColor: "indigo",
              products: ["Sales Cloud Mobile", "MuleSoft", "Argos ONE", "SAP"],
              insight: "La integración de Argos ONE con Salesforce vía MuleSoft convierte la actividad digital del cliente — cotizaciones sin finalizar, últimas visitas, historial de navegación — en inteligencia comercial accionable en tiempo real.",
            },
            {
              number: 3,
              title: "La visita que sí importa",
              subtitle: "Lunes · 09:30 a.m. · Ferretería El Paisa · Itagüí",
              icon: "🤝",
              description: "Carlos llega puntual. Salesforce Maps optimizó su ruta desde la mañana: El Paisa es la primera parada del ciclo porque tiene el índice de riesgo más alto. Don Hernán lo recibe con cara de pocos amigos: 'Parcero, es que el otro man me está dejando el cemento más barato.' Carlos no se pone a la defensiva. Abre su celular y muestra algo que no es un descuento genérico — es una oferta personalizada generada esta mañana por el agente de Marketing Cloud: 12 toneladas Cemento Argos 50 con 200 puntos Argos Amigos adicionales + ingreso al programa Dependientes Argos para los 3 vendedores de la ferretería. Generada automáticamente para ferreterías Clase B en Antioquia con más de 36 meses de antigüedad y volumen en riesgo. Esta oferta no existía ayer. Don Hernán mira los puntos. Sonríe. '¿Y para mis vendedores también?' Carlos confirma.",
              channel: "Salesforce Maps · Marketing Cloud · Data Cloud",
              image: "/Customers/argos/story-v2/Escena-03.png",
              pilar: "P2 · Microsegmentación + Oferta personalizada",
              pilarColor: "violet",
              products: ["Salesforce Maps", "Marketing Cloud", "Data Cloud", "Argos Amigos"],
              insight: "Antes, las campañas de fidelización eran iguales para todos — un email masivo con la misma oferta para Don Hernán que para un distribuidor mayorista de Bogotá. Hoy, la microsegmentación de Data Cloud crea ofertas que Don Hernán siente que fueron diseñadas para él. Porque lo fueron.",
            },
            {
              number: 4,
              title: "El pedido que se hace solo",
              subtitle: "Lunes · 10:55 a.m. · WhatsApp Business · Ferretería El Paisa",
              icon: "💬",
              description: "Don Hernán acepta. Carlos registra la visita en Salesforce Mobile en 30 segundos con geoetiquetado. Luego le dice: 'Don Hernán, puede hacer el pedido ahora mismo por WhatsApp.' Don Hernán escribe al número único de Cementos Argos. Lo que responde no es un humano: confirma la dirección, consulta inventario en SAP en tiempo real, verifica el cupo de crédito ($8.2M disponibles), confirma entrega para el miércoles y genera el pedido #ARG-2026-048312 en dos minutos, sin intervención humana. Los 200 puntos Argos Amigos quedan aplicados automáticamente. El pedido se registra en Salesforce vinculado al cliente, a la visita de Carlos y a la campaña de reactivación que lo disparó. Antes, este proceso tomaba horas con fotos de consignación por WhatsApp y llamadas. Hoy tomó dos minutos.",
              channel: "WhatsApp Business API · Agentforce · SAP · Service Cloud",
              image: "/Customers/argos/story-v2/Escena-04.png",
              pilar: "P3 · Agente autónomo + SAP tiempo real",
              pilarColor: "sky",
              products: ["WhatsApp Business API", "Agentforce Service", "MuleSoft SAP", "Service Cloud"],
              insight: "La integración cierra el ciclo completo: el pedido de WhatsApp se convierte en una orden en SAP, un caso cerrado en Service Cloud, un registro de actividad en el perfil del cliente en Sales Cloud, y un punto acumulado en Gluki — todo en tiempo real.",
            },
            {
              number: 5,
              title: "El Machine Seller que nunca para",
              subtitle: "Jueves · 08:15 a.m. · Marketing Cloud · Automatización",
              icon: "🤖",
              description: "Tres días después del pedido, el sistema detecta algo nuevo. Las ferreterías Clase B de Antioquia que compraron cemento en septiembre también compraron mortero seco en octubre — con una correlación del 78%. Einstein lo sabe. Sin que nadie en el laboratorio digital tenga que hacer nada, Agentforce genera y dispara una campaña de venta cruzada personalizada para Don Hernán. A las 9:02 a.m., Don Hernán responde: 'Si man, ese producto siempre se mueve. Mandame el precio.' A las 9:06 a.m., el pedido de 80 bolsas de mortero ($1.48M COP) está confirmado. Intervención humana requerida: ninguna. Antes, el laboratorio digital gestionaba estas campañas manualmente — detectar el patrón, armar la base, cargar Brevo, enviar, medir. Cada ciclo tomaba días. Hoy ocurre en horas, de forma autónoma.",
              channel: "Marketing Cloud · Agentforce · Einstein AI · WhatsApp",
              image: "/Customers/argos/story-v2/Escena-05.png",
              pilar: "P2 · Machine Sellers automatizado",
              pilarColor: "violet",
              products: ["Marketing Cloud", "Agentforce Marketing", "Data Cloud", "Einstein AI"],
              insight: "El equipo de marketing puede ver en tiempo real cuántos pedidos generó esta campaña, cuánto ingreso produjo y cuál fue el ROI exacto versus el costo del incentivo. Ya no hay que esperar fin de mes para saber si la campaña funcionó.",
            },
            {
              number: 6,
              title: "Lo que ve el Director de Zona",
              subtitle: "Viernes · 16:00 p.m. · CRM Analytics · Dashboard Gerencial",
              icon: "📊",
              description: "El director de zona de Antioquia abre su dashboard en Salesforce. Antes, este momento significaba esperar el Excel que Sandra construía los viernes — un reporte con 24 horas de rezago y dos horas de consolidación. Hoy el dashboard está vivo: 847 toneladas en la semana (+12% vs. anterior), 8 clientes reactivados (incluye Ferretería El Paisa), 63 de 70 visitas del plan (90% cumplimiento), 3 clientes en riesgo (bajó de 11). Agentforce genera el resumen ejecutivo automáticamente a las 15:58: '$6.3M COP en ventas cruzadas sin intervención humana'. El director no tuvo que pedirle el reporte a nadie. Sandra no tuvo que construirlo. Carlos no tuvo que enviarlo. Los tres pilares funcionaron como un sistema integrado esta semana.",
              channel: "CRM Analytics · Agentforce · Salesforce Dashboards",
              image: "/Customers/argos/story-v2/Escena-06.png",
              pilar: "P1 · P2 · P3 — Vista ejecutiva integrada",
              pilarColor: "sky",
              products: ["CRM Analytics", "Agentforce", "Einstein AI", "Salesforce Dashboards"],
              insight: "El RADAR detectó a Don Hernán (P1+P3), la microsegmentación generó la oferta correcta (P2), la integración SAP + Argos ONE permitió que el pedido fluyera sin fricción (P3), y el dashboard consolidó todo sin esfuerzo manual. Así se ve cuando los tres pilares funcionan juntos.",
            },
            {
              number: 7,
              title: "Lo que cambió para Don Hernán — y para Argos",
              subtitle: "Epílogo · El futuro posible habilitado por Salesforce",
              icon: "✨",
              description: "Hernán Ríos no se fue a la competencia. No porque Argos le diera el mejor precio, sino porque Argos llegó en el momento justo, con la oferta correcta, y le hizo más fácil comprar que no hacerlo. Eso no es suerte. +58% de recuperación de volumen vs. mínimo del trimestre. $7.8M COP en ventas adicionales generadas sin intervención humana en la semana. 0 minutos que tardó Sandra en construir el reporte del viernes. Eso es lo que pasa cuando los tres pilares funcionan juntos: Market Share porque hay mercado resiliente que capturar con mejores herramientas. Segmentación porque la comunicación genérica desperdicia recursos. Integración porque la experiencia del cliente no puede ser excelente cuando los sistemas que la soportan no se hablan.",
              channel: "Sales Cloud · Marketing Cloud · Service Cloud · MuleSoft · Agentforce",
              image: "/Customers/argos/story-v2/Escena-EP.png",
              pilar: "Los 3 Pilares — visión completa",
              pilarColor: "emerald",
              products: ["Agentforce", "Sales Cloud", "Marketing Cloud", "Service Cloud", "MuleSoft", "Data Cloud"],
              insight: "Market Share. Segmentación. Integración. Tres pilares, una plataforma, un socio.",
            },
          ],
        },
      },
      {
        id: "assets",
        label: "Assets",
        title: "Assets de la solución",
        content: "Materiales disponibles y por desarrollar para soportar la conversación con Cementos Argos.",
        assetsData: {
          items: [
            {
              name: "Plan de Cuenta Estratégico v2.0",
              description: "Documento completo de 16 páginas con 20 iniciativas priorizadas mapeadas a 3 pilares (Market Share, Segmentación, Integración Tecnológica). Versión Mayo 2026.",
              available: true,
              type: "doc",
              url: "https://drive.google.com/file/d/10LPr8Ep1bcilMDmPGL2B4ArTJkowmNHo/view?usp=sharing",
            },
            {
              name: "Deck Ejecutivo",
              description: "Presentación para sesión de Executive Briefing con Dirección Comercial y Tecnología de Argos.",
              available: true,
              type: "deck",
              url: "/customer-demos/grupo-argos/deck/executive",
            },
            {
              name: "Historia de Cliente — Modo Inmersivo",
              description: "La ferretería de Don Hernán: recorrido cinematográfico por las 7 escenas de la historia, con vista pantalla completa, navegación por teclado y ambientación por pilar estratégico.",
              available: true,
              type: "story",
              url: "/customer-demos/grupo-argos#historia",
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
    translations: {
      en: {
        title: "Cementos Argos — Commercial Intelligence Platform with Agentforce",
        description: "Strategic account plan articulated in three pillars: Market Share (+15%), High-resolution Segmentation, and Technology Integration. Argos already operates Salesforce — the conversation is about evolution and deepening toward an agentic platform with Agentforce.",
        industry: "Construction Materials",
        tabs: [
          { id: "overview", label: "Overview", title: "Executive summary", content: "Cementos Argos already operates Salesforce — the conversation is about evolution and deepening. This plan articulates 20 initiatives across three strategic pillars: Market Share (+15%), High-resolution Segmentation, and Technology Integration to eliminate silos." },
          { id: "customer", label: "Client / industry", title: "Client and industry", content: "Production and commercialization of cement, concrete, and aggregates. Headquartered in Medellín, Colombia. SPRINT 4.0 active: EBITDA margins 24-26%, growth and digitalization for 2026-2027." },
          { id: "context", label: "Context", title: "Challenge context", content: "Discovery sessions revealed an active CRM ecosystem but with critical gaps in three dimensions. Each gap is mapped to one of the three strategic pillars of Cementos Argos." },
          { id: "objective", label: "Objective", title: "Position Salesforce as the platform that enables Argos's three pillars.", content: "20 initiatives. 3 strategic pillars. One platform that connects technology with business results." },
          { id: "storytelling", label: "Narrative", title: "Value narrative", content: "The three pillars are not an invented framework: they are the honest diagnosis of the three gaps separating Argos from its next level of performance." },
          { id: "solution", label: "Solution", title: "Proposed solution", content: "The proposed architecture is a direct response to Argos's three strategic pillars. Each layer of the platform is aligned with at least one pillar, and the integration between layers closes the gaps identified during discovery." },
          { id: "arquitectura", label: "Architecture", title: "Technical Architecture — Cementos Argos", content: "Full view of the 4-layer solution: contact channels, Salesforce platform (9 products + transversal Agentforce), MuleSoft integration layer (5 bidirectional real-time connectors), and Argos ecosystem external systems. Critical integration gaps are marked with their status and proposed solution." },
          { id: "outcomes", label: "Results", title: "Expected outcomes", content: "Success KPIs are organized by strategic pillar. Each metric has a documented baseline from discovery sessions, a 6-month target, and a 12-month target." },
          { id: "historia", label: "Story", title: "Don Hernán's Hardware Store and the Team That Never Sleeps", content: "Hernán Ríos has been running Ferretería El Paisa in Itagüí, Antioquia for years. A class B bulk customer who used to buy 12 to 15 tons of cement per month — until he stopped. This is the story of how Salesforce turned an at-risk customer into the most active distributor of the quarter." },
          { id: "assets", label: "Assets", title: "Solution assets", content: "Available and to-be-developed materials to support the conversation with Cementos Argos." },
        ],
      },
      pt: {
        title: "Cementos Argos — Plataforma de Inteligência Comercial com Agentforce",
        description: "Plano de conta estratégico articulado em três pilares: Market Share (+15%), Segmentação de alta resolução e Integração Tecnológica. A Argos já opera o Salesforce — a conversa é de evolução e aprofundamento em direção a uma plataforma agêntica com Agentforce.",
        industry: "Materiais de Construção",
        tabs: [
          { id: "overview", label: "Overview", title: "Resumo executivo", content: "A Cementos Argos já opera o Salesforce — a conversa é de evolução e aprofundamento. Este plano articula 20 iniciativas em três pilares estratégicos: Market Share (+15%), Segmentação de alta resolução e Integração Tecnológica para eliminar silos." },
          { id: "customer", label: "Cliente / indústria", title: "Cliente e indústria", content: "Produção e comercialização de cimento, concreto e agregados. Sede em Medellín, Colômbia. SPRINT 4.0 ativo: margens EBITDA 24-26%, crescimento e digitalização para 2026-2027." },
          { id: "context", label: "Contexto", title: "Contexto do desafio", content: "As sessões de discovery revelaram um ecossistema CRM ativo, mas com lacunas críticas em três dimensões. Cada lacuna está mapeada a um dos três pilares estratégicos da Cementos Argos." },
          { id: "objective", label: "Objetivo", title: "Posicionar o Salesforce como a plataforma que habilita os três pilares da Argos.", content: "20 iniciativas. 3 pilares estratégicos. Uma plataforma que conecta tecnologia com os resultados do negócio." },
          { id: "storytelling", label: "Narrativa", title: "Narrativa de valor", content: "Os três pilares não são um framework inventado: são o diagnóstico honesto das três lacunas que separam a Argos do seu próximo nível de desempenho." },
          { id: "solution", label: "Solução", title: "Solução proposta", content: "A arquitetura proposta é uma resposta direta aos três pilares estratégicos da Argos. Cada camada da plataforma está alinhada com pelo menos um pilar, e a integração entre camadas fecha as lacunas identificadas no processo de discovery." },
          { id: "arquitectura", label: "Arquitetura", title: "Arquitetura Técnica — Cementos Argos", content: "Visão completa das 4 camadas da solução: canais de contato, plataforma Salesforce (9 produtos + Agentforce transversal), camada de integração MuleSoft (5 conectores bidirecionais em tempo real) e sistemas externos do ecossistema Argos. As lacunas críticas de integração estão marcadas com seu status e solução proposta." },
          { id: "outcomes", label: "Resultados", title: "Resultados esperados", content: "Os KPIs de sucesso estão organizados por pilar estratégico. Cada métrica tem uma linha de base documentada nas sessões de discovery, uma meta de 6 meses e uma meta de 12 meses." },
          { id: "historia", label: "História", title: "A Ferreteria do Don Hernán e a Equipe que Nunca Para", content: "Hernán Ríos está à frente da Ferreteria El Paisa em Itagüí, Antioquia há anos. Um cliente classe B que comprava entre 12 e 15 toneladas de cimento por mês — até que parou. Esta é a história de como o Salesforce transformou um cliente em risco de fuga no distribuidor mais ativo do trimestre." },
          { id: "assets", label: "Ativos", title: "Ativos da solução", content: "Materiais disponíveis e a serem desenvolvidos para apoiar a conversa com a Cementos Argos." },
        ],
      },
    },
  },
  {
    slug: "betterware",
    title: "Mamá Virtual — Acompañamiento 24/7 a la Distribuidora con Agentforce",
    customerName: "Betterware de México (BeFra)",
    industry: "Retail / Consumer Goods — Venta Directa",
    description:
      "Plan de cuenta para acompañar a las 1.24M de Distribuidoras y Asociadas de Betterware + JAFRA con un ecosistema agéntico — resolución en primer contacto, lenguaje tropicalizado y un equipo interno con visión 360 de cada DS para reducir churn en los primeros 6 meses críticos.",
    logo: "/Customers/Betterware/images/Logo-betterware.png",
    passcode: "better26",
    tags: [
      "Agentforce",
      "Service Cloud",
      "Data Cloud",
      "Marketing Cloud Advanced",
      "Tableau Next",
      "Sales Cloud",
      "Venta Directa LATAM",
    ],
    tabs: [
      // ── 1. Overview ───────────────────────────────────────────────────
      {
        id: "overview",
        label: "Overview",
        title: "Resumen ejecutivo",
        banner: "/Customers/Betterware/images/better.gif",
        content:
          "Betterware de México (NASDAQ: BWMX, ahora BeFra) opera el ecosistema de venta directa más grande del país: 1.24M de Asociadas y 63K Distribuidoras Independientes que llegan a 8M de hogares. El Antiexperience Workshop con la DS como persona central reveló que la prioridad #1 es resolver en primer contacto — y que la solución pasa por un agente que conozca su perfil, hable su lenguaje y la acompañe desde el primer día. Esta es la hoja de ruta para construir ese acompañamiento con Agentforce, Data Cloud y Service Cloud.",
        overviewData: {
          stats: [
            { value: "$14.1B", label: "MXN ingresos consolidados FY 2024" },
            { value: "1.24M", label: "Asociadas + Distribuidoras (BW + JAFRA)" },
            { value: "8M", label: "Hogares mexicanos alcanzados" },
            { value: "19.7%", label: "Margen Adj. EBITDA FY 2024" },
            { value: "6 meses", label: "Journey crítico de la DS" },
            { value: "3 🔴", label: "Resolver en primer contacto — prioridad #1 del taller" },
          ],
        },
      },

      // ── 2. Cliente / Industria ────────────────────────────────────────
      {
        id: "customer",
        label: "Cliente / industria",
        title: "Cliente e industria",
        content:
          "Betterware de México es la primera empresa mexicana con listado directo en NASDAQ (2020). Bajo la matriz BeFra opera dos marcas: Betterware (organización del hogar, cocina, baño, jardín) y JAFRA Cosmetics (fragancias, color, skincare), adquirida en 2022 por US$255M a Vorwerk. Su modelo de venta directa de dos niveles — Distribuidora (líder) + Asociada (vendedora) — es el motor del negocio: cada Asociada coloca pedidos por ~$2,158 MXN al mes (BW) o $2,439 MXN (JAFRA) en ciclos quincenales.",
        customerProfile: {
          stats: [
            { label: "Razón social", value: "Betterware de México, S.A.P.I. de C.V. (BeFra)" },
            { label: "Ticker", value: "NASDAQ: BWMX (cotización directa desde 2020)" },
            { label: "Sede", value: "Guadalajara, Jalisco — México" },
            { label: "Fundación", value: "1995 — 30 años de trayectoria en venta directa" },
            { label: "Ingresos FY 2024", value: "Ps. 14,100.8 M (~USD $700M) · +8.4% YoY" },
            { label: "Adj. EBITDA 2024", value: "Ps. 2,774.7 M · margen 19.7%" },
            { label: "Hogares alcanzados", value: "~8M en México · ~4% market share household products" },
            { label: "Sales force EOP 2024", value: "1,180,458 Asociadas + 63,339 Distribuidoras" },
            { label: "Mercados", value: "México (core), USA (JAFRA), Guatemala, Ecuador (May 2025)" },
            { label: "Modelo comercial", value: "Catálogo quincenal + 2 niveles (DS líder / Asociada)" },
            { label: "Ticket promedio Asociada", value: "BW MX: $2,158 MXN · JAFRA MX: $2,439 MXN (Q4 2024)" },
            { label: "Stack actual", value: "Shopify+ (e-comm), B+/J+ Apps, LMS de capacitación, contact center tradicional" },
          ],
          segments: [
            {
              name: "Betterware México — Hogar",
              description:
                "Catálogo de organización, cocina, baño, jardín y limpieza. 674K Asociadas y 42K Distribuidoras al cierre de 2024. Margen EBITDA 21.6% — el negocio más rentable del grupo. Crecimiento +4.6% YoY 2024 con foco en producto innovador y experiencia de la DS.",
            },
            {
              name: "JAFRA México — Belleza y Cuidado Personal",
              description:
                "Fragancias, color, skincare y toiletries. 480K Asociadas y 19K Distribuidoras. Crecimiento +13.0% YoY 2024 — la marca pasó de 0% de crecimiento durante 15 años (bajo Vorwerk) a doblar utilidades en 3 años bajo BeFra. Margen EBITDA 13.0% (2021) → 20.7% (2024).",
            },
            {
              name: "Distribuidora Independiente (DS) — Persona del Workshop",
              description:
                "Emprendedora que vende y distribuye en su comunidad. Puede ser nativa digital o no. Vive un journey crítico de 6 meses donde se define si crece o desiste. Necesita lenguaje tropicalizado, autonomía operativa y una sola fuente confiable que la conozca y la acompañe — no un directorio ni un escalamiento humano.",
            },
          ],
          techStack: [
            { category: "E-commerce DS", tool: "Shopify+ (B+/J+ Apps · catálogo digital · live shopping piloto)" },
            { category: "ERP/Pedidos", tool: "Sistemas legacy de pedidos, saldos y liberación (manual)" },
            { category: "Capacitación", tool: "LMS interno · Cenapia (centro nacional de capacitación)" },
            { category: "Contact Center", tool: "Operación tradicional · saturación en horas pico, sin IA" },
            { category: "Mensajería", tool: "WhatsApp / SMS / Email — múltiples líneas, sin agente unificado" },
            { category: "Pagos", tool: "Kitspay (canal de pago — fricción reportada en taller)" },
            { category: "BI", tool: "Reportes operativos (dispersos) — sin visión 360 de la DS" },
          ],
        },
      },

      // ── 3. Contexto ───────────────────────────────────────────────────
      {
        id: "context",
        label: "Contexto",
        title: "Contexto del reto — Antiexperience Workshop",
        content:
          "El Antiexperience Workshop (29 de mayo de 2026) reunió a 5 equipos en torno a la DS como persona central. Los dolores se mapearon en 5 áreas. La conclusión transversal: la DS depende excesivamente del soporte humano, recibe información confusa y siente atención sin empatía — justamente cuando vive su journey más crítico (los primeros 6 meses).",
        contextData: {
          groups: [
            {
              name: "Área 1 — Atención y resolución de problemas",
              findings: [
                "Tiene que recurrir a alguien directo o a un directorio para resolver — no hay una sola fuente confiable",
                "Pedido incompleto / recibo incompleto que se queda sin gestión clara",
                "No darle respuesta — el silencio operativo se convierte en motivo de churn",
                "Saldos prometidos sin resolución — la confianza con la marca se erosiona",
                "Prioridad #1 del taller — Resolver en Primer Contacto: 3 puntos rojos acumulados entre tableros",
              ],
            },
            {
              name: "Área 2 — Información y comunicación",
              findings: [
                "Respuestas tardadas — fuera de los tiempos del ciclo quincenal de venta",
                "No tener información disponible cuando la DS la necesita (pedidos, saldos, reglas)",
                "Saturación en horas pico — el contact center no escala a la base de 1.24M",
                "Información confusa, dispersa entre sistemas y reportes desactualizados",
                "Atención sin empatía — el dolor emocional pesa tanto como el operativo (Área 3)",
              ],
            },
            {
              name: "Áreas 3-5 — Experiencia, sistemas y comunicación empresa-DS",
              findings: [
                "DS no conectada emocionalmente con la marca — 'no estoy buscando, pero sí'",
                "El staff no entiende el rol de la DS ni su perfil (segmentación, antigüedad, comportamiento)",
                "Acceso complicado a información: errores, datos descontinuados, múltiples sistemas",
                "El onboarding no es adecuado al rol — DS no entiende cómo ganar poco a poco con Betterware",
                "Las DS no quieren salir a Kitspay — fricción explícita con el canal de pago actual",
                "Comunicación desconectada entre SIA, empresa y Cenapia · procesos complejos o repetitivos",
              ],
            },
          ],
        },
      },

      // ── 4. Objetivo ───────────────────────────────────────────────────
      {
        id: "objective",
        label: "Objetivo",
        title: "Convertir a la DS en el centro del ecosistema con un acompañamiento 24/7 inteligente.",
        content:
          "Tres palancas. Una plataforma agéntica. Resolución en primer contacto como obsesión.",
        objective: {
          headline:
            "Construir la 'Mamá Virtual' que conoce a cada Distribuidora — su perfil, su historial, sus objetivos y su lenguaje — y la acompaña desde el primer día con resolución autónoma, comunicación proactiva y el contexto completo que necesita el staff interno para atenderla con empatía real.",
          okrs: [
            {
              label: "Resolver en Primer Contacto",
              description:
                "Asistente Operativo que clasifica intención en lenguaje natural tropicalizado, resuelve pedidos/saldos/reglas comerciales sin intervención humana y solo escala cuando es estrictamente necesario. Meta: pasar de soporte humano dependiente a >50% de incidencias resueltas por el agente.",
              enabler: "Agentforce + Service Cloud + Data Cloud",
              color: "indigo",
            },
            {
              label: "Acompañamiento Personalizado en 6 Meses",
              description:
                "Mamá Virtual con pronósticos personalizados, agenda compartida DS-OJ, alertas motivacionales y capacitación embebida en el flujo. Reducir el churn en los primeros 6 meses críticos donde se define si la DS crece o desiste.",
              enabler: "Agentforce + Marketing Cloud Advanced + Data Cloud",
              color: "violet",
            },
            {
              label: "Staff con Visión 360 de la DS",
              description:
                "Habilitador interno que entrega al equipo de operaciones y customer success el perfil completo, comportamiento de consumo y comportamiento comercial de cada DS — para atenderla con datos accionables y empatía real.",
              enabler: "Agentforce + Tableau Next + Data Cloud",
              color: "sky",
            },
          ],
        },
      },

      // ── 5. Narrativa ──────────────────────────────────────────────────
      {
        id: "storytelling",
        label: "Narrativa",
        title: "Narrativa de valor",
        content:
          "Betterware no necesita más canales. Necesita un acompañamiento que se sienta humano cuando hay 1.24M de personas pidiendo respuestas a la vez.",
        narrativeData: {
          quote:
            "La DS no se va por el catálogo. Se va porque nadie la conoció a tiempo. Agentforce es la 'Mamá Virtual' que sí la conoce — desde el primer pedido y a las 11 de la noche cuando termina su turno y empieza su negocio.",
          pillars: [
            {
              title: "Empatía a escala — lenguaje tropicalizado, contexto completo",
              description:
                "Cada DS recibe atención que se siente personal, en su lenguaje, con su historial al frente. El agente reconoce si es una DS nueva en su mes 2 o una líder con 5 años de carrera. No hay preguntas redundantes ni respuestas cuadradas.",
            },
            {
              title: "Autonomía como estrategia de prospección",
              description:
                "La DS más autónoma es la que más prospecta. Cuando puede resolver una incidencia operativa en 30 segundos por WhatsApp en lugar de esperar 4 horas a un humano, libera tiempo y energía para hacer lo que sí hace crecer su negocio: vender.",
            },
            {
              title: "El staff atiende mejor cuando ve a la DS completa",
              description:
                "El equipo de Cenapia y customer success deja de operar a ciegas. Ve perfil, segmento, antigüedad, último pedido, comportamiento de consumo y agenda compartida con su OJ — todo en una pantalla. La empatía deja de ser intención y se vuelve dato accionable.",
            },
          ],
          closing:
            "El ecosistema de venta directa en LATAM representa $88,574M MXN al año (AMVD 2024). Betterware ya es líder. La pregunta es qué tipo de relación quiere construir con su 1.24M de distribuidoras antes que sus competidores se la lleven con un acompañamiento que sí se sienta humano.",
        },
      },

      // ── 6. Solución ───────────────────────────────────────────────────
      {
        id: "solution",
        label: "Solución",
        title: "DS Intelligence Agent Ecosystem",
        content:
          "7 casos de uso priorizados desde el Antiexperience Workshop, agrupados en tres capas: agentes externos para la DS, habilitador interno para el staff y comunicación proactiva 360. Todos sobre la misma plataforma Salesforce con guardrails y trazabilidad completa.",
        solution: [
          {
            product: "Agentforce + Service Cloud + Data Cloud",
            focus: "Capa 1 — Resolución Autónoma para la DS (Externo)",
            color: "indigo",
            items: [
              "Asistente Operativo: resolución en primer contacto de pedidos, devoluciones, saldos y reglas comerciales",
              "Detección de intención en preguntas mal articuladas — la DS no necesita saber cómo explicarlo",
              "Lenguaje natural tropicalizado · respuestas adaptativas, no cuadradas ni cerradas",
              "Escalación inteligente solo cuando es necesario — con resumen IA y contexto completo al humano",
              "Seguimiento de Pedidos y Gestión Financiera: visibilidad total saldos, transacciones y devoluciones",
              "Notificaciones automáticas y proactivas — la DS deja de tener que perseguir información",
              "Reducción >50% de tickets escalados a humanos · resolución medible en primer contacto",
            ],
          },
          {
            product: "Agentforce + Marketing Cloud Advanced + Data Cloud",
            focus: "Capa 2 — Mamá Virtual y Acompañamiento Personalizado (Externo)",
            color: "violet",
            items: [
              "Mamá Virtual: pronósticos personalizados de venta y evaluación de objetivos del ciclo",
              "Análisis del perfil de la DS — el agente adapta lenguaje y tono (tropicalizado)",
              "Seguimiento proactivo de avances · alertas motivacionales en el momento correcto",
              "Agenda DS-OJ compartida — la DS y su Organizadora de Junta ven lo mismo, en un solo lugar",
              "Asistente Personal de Negocio — '1 sola persona que pueda resolver' · guía a la autonomía",
              "Onboarding Digital: journey paso a paso para DS no nativas digitales con lenguaje simple",
              "Capacitación constante embebida en el flujo de trabajo · interfaz amigable",
              "Reducción de deserción en los primeros 6 meses críticos del journey",
            ],
          },
          {
            product: "Agentforce + Tableau Next + Data Cloud",
            focus: "Capa 3 — Staff con Visión 360 + Comunicación Proactiva (Interno / Híbrido)",
            color: "sky",
            items: [
              "Habilitador de Información: acceso unificado al perfil y contexto completo de cada DS",
              "Tracking de comportamiento de consumo y comportamiento comercial — el staff atiende con datos",
              "Base de conocimiento siempre actualizada · sugerencia de solución adecuada por situación",
              "Agente DS 360: segmentación por tiempo, antigüedad y clasificación de DS",
              "Comunicación proactiva clara de procesos, objetivos y novedades antes de que surjan dudas",
              "'DU on cía' — transmitir lo más relevante hoy de forma clara y digerible",
              "Anticipación de riesgos de churn con Tableau Next + datos unificados en Data Cloud",
              "Cumplimiento LFPDPPP México · datos en jurisdicción local · Einstein Trust Layer",
            ],
          },
        ],
      },

      // ── 7. Arquitectura ───────────────────────────────────────────────
      {
        id: "arquitectura",
        label: "Arquitectura",
        title: "System Landscape — Betterware (BeFra)",
        content:
          "Vista del ecosistema tecnológico: sistemas externos del modelo de venta directa, capa de integración, productos Salesforce y foundation Einstein Trust Layer. La arquitectura responde directamente a las brechas del Antiexperience Workshop.",
        archData: {
          title: "Betterware System Landscape",
          zones: [
            {
              id: "external",
              label: "Sistemas Externos · Operación BW + JAFRA",
              color: "slate",
              nodes: [
                {
                  name: "ERP / Pedidos",
                  items: ["Catálogo quincenal", "Liberación de pedidos", "Saldos y transacciones", "Reglas comerciales"],
                },
                {
                  name: "Shopify+ (B+ / J+)",
                  items: ["Storefront DS", "Catálogo digital", "Live shopping piloto"],
                },
                {
                  name: "LMS · Cenapia",
                  items: ["Capacitación", "Onboarding por rol", "Contenidos certificados"],
                },
                {
                  name: "Kitspay",
                  items: ["Pagos DS", "Cobros", "Conciliación"],
                },
                {
                  name: "Mensajería",
                  items: ["WhatsApp Business", "SMS", "Email transaccional"],
                },
              ],
            },
            {
              id: "salesforce",
              label: "Salesforce Customer 360 · DS Intelligence Platform",
              color: "indigo",
              nodes: [
                {
                  name: "Service Cloud",
                  items: ["Casos DS", "SLAs", "Omni-Channel routing", "Knowledge", "Escalaciones inteligentes"],
                },
                {
                  name: "Sales Cloud",
                  items: ["Cuentas DS", "Pipeline de prospección", "Comportamiento comercial", "Segmentación"],
                },
                {
                  name: "Marketing Cloud Advanced",
                  items: ["Journey Builder por cohorte", "Comunicación proactiva", "Capacitación embebida", "Personalización"],
                },
                {
                  name: "Data Cloud",
                  items: ["Perfil unificado DS", "Identity Resolution", "Calculated Insights", "Churn risk score"],
                },
                {
                  name: "Tableau Next",
                  items: ["Dashboards staff", "Anticipación de churn", "Comportamiento de consumo", "Tableau Pulse"],
                },
                {
                  name: "Slack",
                  items: ["Colaboración interna", "Notificaciones a staff", "Agentes embebidos"],
                },
              ],
            },
            {
              id: "agents",
              label: "Agentforce · Capa Agéntica",
              color: "violet",
              nodes: [
                {
                  name: "Mamá Virtual",
                  items: ["Acompañamiento", "Objetivos", "Lenguaje tropicalizado"],
                },
                {
                  name: "Asistente Operativo",
                  items: ["Resolución 1er contacto", "Pedidos / saldos", "Escalación inteligente"],
                },
                {
                  name: "Asistente Personal",
                  items: ["1 sola persona que resuelve", "Reglas comerciales", "Autonomía"],
                },
                {
                  name: "Agente DS 360",
                  items: ["Segmentación", "Comunicación proactiva", "Agenda DS-OJ"],
                },
                {
                  name: "Habilitador Staff",
                  items: ["Vista 360 DS", "Atención empática", "Datos accionables"],
                },
              ],
            },
          ],
          bridge: {
            label: "Capa de Integración",
            sublabel: "API-Led Connectivity · Zero Copy donde aplique",
            items: ["MuleSoft Anypoint", "API Manager", "Conectores ERP / Shopify+ / Kitspay / LMS"],
          },
          foundation: {
            label: "Einstein Trust Layer · LFPDPPP MX · Auditoría y Gobernanza",
            items: ["Datos en jurisdicción MX", "Masking dinámico", "Audit Trail", "Toxicity & Bias detection"],
          },
        },
      },

      // ── 8. Resultados ─────────────────────────────────────────────────
      {
        id: "outcomes",
        label: "Resultados",
        title: "Resultados esperados",
        content:
          "Los KPIs se organizan en tres dimensiones que reflejan los tres OKRs: resolución autónoma, acompañamiento y staff con visión 360. Línea base extraída del Antiexperience Workshop y de las métricas operativas reportadas por BeFra. Benchmarks de la industria usados como referencia.",
        kpiSummary: [
          {
            dimension: "Resolución Autónoma · DS",
            kpiName: "Resolución en primer contacto (FCR)",
            value6m: "30%+ tickets resueltos por agente",
            value12m: "50%+ tickets · benchmark Williams-Sonoma 60%",
            color: "indigo",
          },
          {
            dimension: "Acompañamiento · 6 Meses",
            kpiName: "Reducción de churn DS nuevas",
            value6m: "−10% deserción cohorte 0-6m",
            value12m: "−25% · cohortes activadas tempranamente",
            color: "violet",
          },
          {
            dimension: "Staff · Visión 360",
            kpiName: "Tiempo promedio de resolución staff",
            value6m: "−25% TPR con vista 360",
            value12m: "−45% TPR · NPS staff +12 pts",
            color: "sky",
          },
        ],
        kpis: [
          {
            group: "OKR 1 — Resolución Autónoma · Resolver en Primer Contacto (3 🔴 prioridad #1)",
            items: [
              {
                name: "Resolución en primer contacto (FCR) — agente vs humano",
                baseline: "Bajo · sin medición sistemática",
                goal6m: "30%+ tickets resueltos por agente",
                goal12m: "50%+ · ref. Williams-Sonoma Olive 60%",
              },
              {
                name: "Tickets escalados al staff humano",
                baseline: "Alto — saturación en horas pico",
                goal6m: "−40% volumen escalado",
                goal12m: "−60% · staff enfocado en alto valor",
              },
              {
                name: "Tiempo de respuesta promedio (WhatsApp)",
                baseline: "Horas / días en horas pico",
                goal6m: "<10 min · 24/7",
                goal12m: "<3 min · resolución autónoma",
              },
              {
                name: "Cobertura de intención en lenguaje tropicalizado",
                baseline: "0% — sin agente conversacional",
                goal6m: "70%+ intents cubiertos",
                goal12m: "90%+ · respuestas adaptativas",
              },
              {
                name: "Tasa de éxito en gestión de saldos / devoluciones",
                baseline: "Sin agente — gestión manual",
                goal6m: "60%+ casos cerrados sin humano",
                goal12m: "80%+ · benchmark Safari365 62%",
              },
            ],
          },
          {
            group: "OKR 2 — Acompañamiento · Mamá Virtual (DS 6 meses críticos)",
            items: [
              {
                name: "Churn DS en primeros 6 meses",
                baseline: "Alto · journey crítico sin acompañamiento",
                goal6m: "−10% deserción cohorte",
                goal12m: "−25% · activación temprana",
              },
              {
                name: "Cumplimiento de objetivos de venta DS",
                baseline: "DS reportadamente sin objetivo claro",
                goal6m: "Top 30% DS con plan activo",
                goal12m: "Top 60% · pronósticos personalizados",
              },
              {
                name: "Adopción agente Mamá Virtual",
                baseline: "0% — agente no existe",
                goal6m: "40%+ DS activas usándolo",
                goal12m: "75%+ DS · 90%+ DS nuevas",
              },
              {
                name: "Capacitación completada en flujo (LMS embebido)",
                baseline: "Cursos fuera del flujo de trabajo",
                goal6m: "+50% módulos completados",
                goal12m: "+120% · capacitación en contexto",
              },
              {
                name: "NPS de Distribuidora (medición sistemática)",
                baseline: "Sin medición consolidada en CRM",
                goal6m: "Línea base activa",
                goal12m: "+15 pts NPS DS",
              },
            ],
          },
          {
            group: "OKR 3 — Staff con Visión 360 · Atención Empática y Accionable",
            items: [
              {
                name: "Tiempo promedio de resolución del staff",
                baseline: "Alto · información dispersa entre sistemas",
                goal6m: "−25% TPR",
                goal12m: "−45% · vista 360 unificada",
              },
              {
                name: "Escalaciones innecesarias (mismo nivel)",
                baseline: "Frecuentes · falta de contexto",
                goal6m: "−30%",
                goal12m: "−60% · staff con perfil completo",
              },
              {
                name: "DS clasificadas y segmentadas activamente",
                baseline: "Segmentación básica",
                goal6m: "5+ segmentos por tiempo / clasificación",
                goal12m: "12+ segmentos con enriquecimiento IA",
              },
              {
                name: "Anticipación de riesgo de churn (Tableau Next)",
                baseline: "Reactivo · sin modelo predictivo",
                goal6m: "Modelo activo top 1,000 DS riesgo",
                goal12m: "Top 5,000/mes · campañas preventivas",
              },
              {
                name: "Productividad del staff (benchmark Salesforce)",
                baseline: "Sin línea base con IA generativa",
                goal6m: "+15% productividad equipo",
                goal12m: "+34% · ref. Agentforce customer base",
              },
            ],
          },
        ],
      },

      // ── 9. Historia ───────────────────────────────────────────────────
      {
        id: "historia",
        label: "Historia",
        title: "Lupita y la Mamá Virtual",
        content:
          "Lupita Hernández tiene 38 años, vive en Tlaquepaque y entró a Betterware hace 4 meses. Está en el corazón del journey crítico de 6 meses. Esta es la historia de cómo, en un solo día complicado, el ecosistema agéntico de Betterware la sostuvo — y la convirtió de una DS al borde de desistir en una líder en crecimiento.",
        storyData: {
          protagonist: "Lupita Hernández",
          protagonistRole: "Distribuidora Independiente · Mes 4 · Tlaquepaque, Jalisco",
          intro:
            "Lupita es un personaje compuesto que representa fielmente el perfil de la DS en su journey crítico de 6 meses. La historia ilustra el futuro habilitado por Agentforce — basado en hallazgos reales del Antiexperience Workshop con el equipo de Betterware (29-may-2026).",
          scenes: [
            {
              number: 1,
              title: "El catálogo cierra mañana",
              subtitle: "Lunes · 09:14 a.m. · Cocina de Lupita · Tlaquepaque",
              description:
                "Lupita está terminando de armar los pedidos de su grupo antes de que cierre el catálogo de la quincena. Tiene 11 clientas en lista y un saldo pendiente con Betterware que la tiene preocupada — le prometieron una bonificación hace dos quincenas y aún no la ve aplicada. En meses anteriores hubiera escrito al directorio, esperado horas y aceptado una respuesta vaga. Hoy abre WhatsApp y le escribe a Betterware en el lenguaje en que habla: 'Oye, ¿qué onda con mi saldo? Ya van dos quincenas.'",
              channel: "WhatsApp · Mamá Virtual (Agentforce)",
              image: "/Customers/Betterware/images/better.gif",
              pilar: "OKR 1 · Resolución autónoma + lenguaje tropicalizado",
              pilarColor: "indigo",
              products: ["Agentforce", "Service Cloud", "Data Cloud"],
              insight:
                "El agente reconoce el tono coloquial sin tropezar. Antes el sistema esperaba un formato cuadrado; hoy entiende intención. La DS se siente escuchada desde la primera frase.",
            },
            {
              number: 2,
              title: "El agente ya la conoce",
              subtitle: "Lunes · 09:14 a.m. · WhatsApp Business",
              description:
                "Antes de que Lupita termine de escribir, la Mamá Virtual ya tiene su contexto completo: DS desde febrero, ciclo 4, segmento 'Cohorte Nueva 6m', historial de pedidos, bonificación pendiente del concurso 'Marzo Imparable' por $640 MXN sin aplicar por una incidencia conocida en el sistema de saldos. El agente no le pide su número de DS ni le pregunta de qué bonificación habla. Le responde: 'Hola Lupita, ya vi tu bonificación de Marzo Imparable. Está pendiente por una incidencia de aplicación. Te la libero ahora mismo, en 5 minutos la ves reflejada en tu saldo.'",
              channel: "Agentforce · Data Cloud (Perfil DS unificado)",
              image: "/Customers/Betterware/images/better.gif",
              pilar: "OKR 1 · FCR + Visión 360",
              pilarColor: "indigo",
              products: ["Agentforce", "Data Cloud", "Service Cloud"],
              insight:
                "El staff tradicional pide número de cliente, motivo, fecha. La Mamá Virtual ve a Lupita completa: identidad, comportamiento, saldo, segmento. Cero preguntas redundantes. Resolución en primer contacto.",
            },
            {
              number: 3,
              title: "Pedido incompleto — el dolor #2 del workshop",
              subtitle: "Lunes · 11:42 a.m. · Sala de Lupita",
              description:
                "Llega su pedido de la quincena. Faltan dos productos: el set de organizadores que prometió a doña Carmen y un kit JAFRA que va a regalar su comadre el sábado. Antes esto era una llamada al contact center de 47 minutos en hora pico. Lupita le saca foto al recibo y le manda al agente: 'Mira, no me llegaron estos.' La Mamá Virtual reconoce el recibo, identifica los SKUs faltantes, abre un caso, dispara el reenvío express desde Cenapia y le confirma fecha de entrega: jueves antes de las 6 p.m.",
              channel: "WhatsApp · Asistente Operativo · OMS",
              image: "/Customers/Betterware/images/better.gif",
              pilar: "OKR 1 · Resolución autónoma de pedidos",
              pilarColor: "indigo",
              products: ["Agentforce", "Service Cloud", "OMS"],
              insight:
                "Antes la DS hacía cosas que no son su responsabilidad primaria — buscar SKUs, escribir formularios, llamar varias veces. Hoy una foto del recibo es suficiente. La autonomía se vuelve estrategia de prospección.",
            },
            {
              number: 4,
              title: "La Mamá Virtual la cuida",
              subtitle: "Lunes · 11:43 a.m. · Mensaje proactivo",
              description:
                "Antes de cerrar la conversación, la Mamá Virtual le manda un mensaje proactivo: 'Lupita, vi que en este ciclo te faltan $2,150 para llegar a tu objetivo de quincena. Tienes 3 clientas que compraron menos que el ciclo pasado: doña Cris, Jessi y Mary. ¿Te paso un mensaje listo para reactivarlas? También vi que aún no terminas el módulo de Cierre de Venta del LMS — te tomaría 8 minutos y aplica directo a este caso.' Lupita acepta los dos. Antes esto requería que un OJ humano la llamara. Hoy es la propia Mamá Virtual la que la guía.",
              channel: "Mamá Virtual · Marketing Cloud Advanced · LMS embebido",
              image: "/Customers/Betterware/images/better.gif",
              pilar: "OKR 2 · Acompañamiento personalizado + capacitación en flujo",
              pilarColor: "violet",
              products: ["Agentforce", "Marketing Cloud Advanced", "Data Cloud"],
              insight:
                "El acompañamiento deja de ser intención y se vuelve momento. La capacitación deja de ser un curso fuera del flujo y se convierte en una microintervención de 8 minutos justo cuando aplica.",
            },
            {
              number: 5,
              title: "Doña Carmen quiere pagar con Kitspay (pero no quiere)",
              subtitle: "Lunes · 14:08 p.m. · Doña Carmen llama a Lupita",
              description:
                "Doña Carmen quiere pagar pero le dice a Lupita que 'eso del Kitspay no me late, mejor te paso transferencia.' Es exactamente la fricción que el Área 5 del workshop identificó: 'Las DS no quieren salir a Kitspay.' Lupita le pregunta a la Mamá Virtual qué hacer. El agente le explica en lenguaje claro las dos opciones: cómo registrar la transferencia en el sistema y cómo, si Doña Carmen quiere, ayudarla con el primer Kitspay paso a paso. No es una respuesta cuadrada — es información contextualizada que se adapta a la situación.",
              channel: "Mamá Virtual · Asistente Personal de Negocio",
              image: "/Customers/Betterware/images/better.gif",
              pilar: "OKR 2 · '1 sola persona que resuelve' · respuestas adaptativas",
              pilarColor: "violet",
              products: ["Agentforce", "Sales Cloud", "Data Cloud"],
              insight:
                "La fricción con Kitspay no se resuelve forzando — se resuelve acompañando. El agente da opciones, no respuestas únicas. La DS siente que tiene un asistente, no un chatbot.",
            },
            {
              number: 6,
              title: "El staff la ve completa",
              subtitle: "Martes · 10:30 a.m. · Centro de Servicio Betterware · Guadalajara",
              description:
                "Marisol, del equipo de customer success de Cenapia, recibe una alerta del Habilitador de Información: 'Lupita Hernández — DS Mes 4 — score de churn riesgo medio creciente. Recomendación: llamada de acompañamiento esta semana.' Antes Marisol llamaba con un nombre y un número. Hoy abre el perfil 360 en Tableau Next: comportamiento de consumo de las clientas de Lupita, comportamiento comercial (cumplimiento, recencia, tipo de productos), historial de interacciones con la Mamá Virtual, módulos de capacitación completados, agenda DS-OJ. Llama con datos accionables y empatía real.",
              channel: "Tableau Next · Habilitador de Información · Service Cloud",
              image: "/Customers/Betterware/images/better.gif",
              pilar: "OKR 3 · Staff con visión 360 + anticipación de churn",
              pilarColor: "sky",
              products: ["Tableau Next", "Data Cloud", "Agentforce", "Slack"],
              insight:
                "La empatía deja de ser intención y se vuelve dato accionable. El staff ya no atiende a ciegas — atiende con el contexto completo que el workshop pidió desde el primer dolor identificado.",
            },
            {
              number: 7,
              title: "Lupita en su mes 6 — la cohorte que sí se queda",
              subtitle: "Epílogo · Dos meses después · Tlaquepaque",
              description:
                "Lupita cumple 6 meses como Distribuidora. Está en el percentil correcto de su cohorte: cumplió objetivo en 4 de los últimos 5 ciclos, completó 80% del LMS, recomendó a 2 nuevas Asociadas y no escaló ningún ticket al humano en las últimas 4 semanas. Cuando una compañera nueva le pregunta '¿qué hago si no me llega un pedido?', Lupita le responde: 'Le escribes a la Mamá. Te resuelve.' Eso es lo que cambió. No es la tecnología — es la sensación de tener a alguien que la conoce, que habla su idioma y que la acompaña a cualquier hora.",
              channel: "Sales Cloud · Marketing Cloud · Data Cloud · Agentforce",
              image: "/Customers/Betterware/images/better.gif",
              pilar: "Los 3 OKRs · DS que sí se queda y crece",
              pilarColor: "emerald",
              products: ["Agentforce", "Sales Cloud", "Data Cloud", "Marketing Cloud Advanced", "Tableau Next"],
              insight:
                "Resolución autónoma. Acompañamiento personalizado. Staff con visión 360. Tres palancas, una plataforma, una DS que se queda — y multiplica.",
            },
          ],
        },
      },

      // ── 10. Assets ────────────────────────────────────────────────────
      {
        id: "assets",
        label: "Assets",
        title: "Assets de la solución",
        content:
          "Materiales disponibles y por desarrollar para soportar la conversación con Betterware (BeFra).",
        assetsData: {
          items: [
            {
              name: "Antiexperience Workshop — Betterware (29-may-2026)",
              description:
                "Documento del taller con persona DS, 5 áreas de pain points, 7 casos de uso Agentforce, roadmap Now/Next/Future y métricas de la industria.",
              available: true,
              type: "doc",
              url: "/Customers/Betterware/files/Antiexperience Workshop — Betterware.pdf",
            },
            {
              name: "Deck Ejecutivo — Comité Directivo",
              description:
                "Presentación de 18 minutos para el Comité Directivo de BeFra con los 3 OKRs, ROI por palanca y próximos pasos. Diseñada con los lineamientos visuales oficiales de Salesforce.",
              available: true,
              type: "deck",
              url: "/customer-demos/betterware/deck/executive",
            },
            {
              name: "Historia de la DS — Modo Inmersivo (Lupita)",
              description:
                "Recorrido por las 7 escenas del journey de Lupita en su Mes 4: del dolor del workshop a la cohorte que sí se queda, gracias a la Mamá Virtual.",
              available: true,
              type: "story",
              url: "/customer-demos/betterware#historia",
            },
            {
              name: "Demo Live — Mamá Virtual en WhatsApp",
              description:
                "Demo en vivo del agente conversacional con datos sintéticos de una DS de Tlaquepaque (saldo pendiente, pedido incompleto y reactivación).",
              available: false,
              type: "video",
            },
            {
              name: "Mockup — Vista 360 del Staff (Cenapia)",
              description:
                "Pantalla del Habilitador de Información con perfil DS, comportamiento de consumo y comercial, agenda DS-OJ y score de churn (Tableau Next).",
              available: false,
              type: "mockup",
            },
            {
              name: "Arquitectura de Referencia — DS Intelligence Platform",
              description:
                "Diagrama del System Landscape: ERP, Shopify+, LMS, Kitspay y mensajería integrados con Salesforce + Agentforce + Einstein Trust Layer.",
              available: false,
              type: "arch",
            },
          ],
        },
      },
    ],
    translations: {
      en: {
        title: "Virtual Mom — 24/7 AI Companion for Distributors with Agentforce",
        description:
          "Account plan to support Betterware + JAFRA's 1.24M Distributors and Associates with an agentic ecosystem — first-contact resolution, tropicalized language, and an internal team with full 360 visibility of every DS to reduce churn during the critical first 6 months.",
        industry: "Retail / Consumer Goods — Direct Selling",
        tabs: [
          { id: "overview", label: "Overview", title: "Executive summary", content: "Betterware de México (NASDAQ: BWMX, now BeFra) operates Mexico's largest direct-selling ecosystem: 1.24M Associates and 63K Independent Distributors reaching 8M households. The Antiexperience Workshop, with the DS at the center, identified first-contact resolution as priority #1 — solved by an agent that knows her profile, speaks her language, and supports her from day one. This is the roadmap to build that companion with Agentforce, Data Cloud, and Service Cloud." },
          { id: "customer", label: "Client / industry", title: "Client and industry", content: "Betterware de México is the first Mexican company directly listed on NASDAQ (2020). Under parent BeFra it runs two brands: Betterware (home organization, kitchen, bath, garden) and JAFRA Cosmetics (fragrance, color, skincare), acquired in 2022 from Vorwerk for US$255M. Its two-tier direct sales model — Distributor (leader) + Associate (seller) — is the engine: every Associate places ~$2,158 MXN/month (BW) or $2,439 MXN (JAFRA) on biweekly cycles." },
          { id: "context", label: "Context", title: "Workshop diagnosis", content: "The Antiexperience Workshop (May 29, 2026) brought 5 teams together around the DS. Pain points were mapped across 5 areas. Cross-cutting conclusion: the DS is overly dependent on human support, gets confusing information, and feels attention without empathy — exactly when she's living her most critical journey (the first 6 months)." },
          { id: "objective", label: "Objective", title: "Put the DS at the center with intelligent 24/7 support.", content: "Three levers. One agentic platform. First-contact resolution as obsession." },
          { id: "storytelling", label: "Narrative", title: "Value narrative", content: "Betterware doesn't need more channels. It needs support that feels human when 1.24M people are asking for answers at the same time." },
          { id: "solution", label: "Solution", title: "DS Intelligence Agent Ecosystem", content: "7 use cases prioritized from the Antiexperience Workshop, grouped into three layers: external agents for the DS, internal enablement for staff, and proactive 360 communication. All on the same Salesforce platform with full guardrails and traceability." },
          { id: "arquitectura", label: "Architecture", title: "System Landscape — Betterware (BeFra)", content: "Tech ecosystem view: external direct-selling systems, integration layer, Salesforce products, and Einstein Trust Layer foundation. The architecture responds directly to the workshop gaps." },
          { id: "outcomes", label: "Results", title: "Expected outcomes", content: "KPIs are organized in three dimensions reflecting the three OKRs: autonomous resolution, accompaniment, and 360 staff visibility. Baseline from the Antiexperience Workshop and BeFra reported metrics. Industry benchmarks used as reference." },
          { id: "historia", label: "Story", title: "Lupita and the Virtual Mom", content: "Lupita Hernández is 38, lives in Tlaquepaque, and joined Betterware 4 months ago — at the heart of the critical 6-month journey. This is the story of how, in a single hectic day, Betterware's agentic ecosystem held her up — and turned a DS on the verge of giving up into a growing leader." },
          { id: "assets", label: "Assets", title: "Solution assets", content: "Available and to-be-developed materials to support the conversation with Betterware (BeFra)." },
        ],
      },
      pt: {
        title: "Mamãe Virtual — Acompanhamento 24/7 da Distribuidora com Agentforce",
        description:
          "Plano de conta para acompanhar as 1,24M de Distribuidoras e Associadas da Betterware + JAFRA com um ecossistema agêntico — resolução em primeiro contato, linguagem tropicalizada e uma equipe interna com visão 360 de cada DS para reduzir churn nos 6 primeiros meses críticos.",
        industry: "Varejo / Bens de Consumo — Venda Direta",
        tabs: [
          { id: "overview", label: "Overview", title: "Resumo executivo", content: "A Betterware de México (NASDAQ: BWMX, agora BeFra) opera o maior ecossistema de venda direta do país: 1,24M de Associadas e 63K de Distribuidoras Independentes que alcançam 8M de lares. O Antiexperience Workshop, com a DS no centro, mostrou que a prioridade nº1 é resolver em primeiro contato — e a solução passa por um agente que conhece seu perfil, fala sua linguagem e a acompanha desde o primeiro dia. Este é o roadmap para construir esse acompanhamento com Agentforce, Data Cloud e Service Cloud." },
          { id: "customer", label: "Cliente / indústria", title: "Cliente e indústria", content: "A Betterware de México foi a primeira empresa mexicana com listagem direta na NASDAQ (2020). Sob a holding BeFra opera duas marcas: Betterware (organização do lar, cozinha, banho, jardim) e JAFRA Cosmetics (perfumaria, cor, skincare), adquirida em 2022 da Vorwerk por US$ 255M. Seu modelo de venda direta de dois níveis — Distribuidora (líder) + Associada (vendedora) — é o motor: cada Associada coloca ~$2.158 MXN/mês (BW) ou $2.439 MXN (JAFRA) em ciclos quinzenais." },
          { id: "context", label: "Contexto", title: "Diagnóstico do workshop", content: "O Antiexperience Workshop (29-mai-2026) reuniu 5 times em torno da DS como persona central. Os pontos de dor foram mapeados em 5 áreas. Conclusão transversal: a DS depende excessivamente do suporte humano, recebe informação confusa e sente atendimento sem empatia — justamente quando vive sua jornada mais crítica (os primeiros 6 meses)." },
          { id: "objective", label: "Objetivo", title: "Colocar a DS no centro com acompanhamento inteligente 24/7.", content: "Três alavancas. Uma plataforma agêntica. Resolução em primeiro contato como obsessão." },
          { id: "storytelling", label: "Narrativa", title: "Narrativa de valor", content: "A Betterware não precisa de mais canais. Precisa de um acompanhamento que pareça humano quando 1,24M de pessoas pedem respostas ao mesmo tempo." },
          { id: "solution", label: "Solução", title: "DS Intelligence Agent Ecosystem", content: "7 casos de uso priorizados a partir do Antiexperience Workshop, agrupados em três camadas: agentes externos para a DS, habilitador interno para a equipe e comunicação proativa 360. Tudo na mesma plataforma Salesforce com guardrails e rastreabilidade completa." },
          { id: "arquitectura", label: "Arquitetura", title: "System Landscape — Betterware (BeFra)", content: "Visão do ecossistema tecnológico: sistemas externos do modelo de venda direta, camada de integração, produtos Salesforce e fundação Einstein Trust Layer. A arquitetura responde diretamente às lacunas do workshop." },
          { id: "outcomes", label: "Resultados", title: "Resultados esperados", content: "Os KPIs estão organizados em três dimensões que refletem os três OKRs: resolução autônoma, acompanhamento e equipe com visão 360. Linha de base extraída do Antiexperience Workshop e das métricas reportadas pela BeFra. Benchmarks da indústria usados como referência." },
          { id: "historia", label: "História", title: "Lupita e a Mamãe Virtual", content: "Lupita Hernández tem 38 anos, mora em Tlaquepaque e entrou na Betterware há 4 meses — no coração da jornada crítica de 6 meses. Esta é a história de como, em um único dia complicado, o ecossistema agêntico da Betterware a sustentou — e transformou uma DS prestes a desistir em uma líder em crescimento." },
          { id: "assets", label: "Ativos", title: "Ativos da solução", content: "Materiais disponíveis e a desenvolver para apoiar a conversa com a Betterware (BeFra)." },
        ],
      },
    },
  },
];