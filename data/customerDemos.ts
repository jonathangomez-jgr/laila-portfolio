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
  },
];