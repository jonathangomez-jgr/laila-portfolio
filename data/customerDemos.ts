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
  description: string;
  channel: string;
  image: string;
};

export type StoryData = {
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
        id: "historia",
        label: "Historia",
        title: "El Journey Comercial de Argos",
        content:
          "De prospectos dispersos a clientes fidelizados: el journey completo que transforma cómo Argos captura, gestiona y hace crecer cada relación comercial.",
        journeyData: {
          phases: [
            { id: "acquire", label: "Captura y Calificación", span: 2, color: "indigo" },
            { id: "convert", label: "Conversión y Venta", span: 2, color: "violet" },
            { id: "serve", label: "Servicio y Fidelización", span: 3, color: "sky" },
            { id: "optimize", label: "Inteligencia y Optimización", span: 2, color: "emerald" },
          ],
          touchpoints: [
            {
              number: 1,
              phaseId: "acquire",
              icon: "🔍",
              title: "Lead Management",
              subtitle: "De prospectos dispersos a oportunidades accionables",
              before:
                "La oportunidad quedaba dispersa en conversaciones, fuentes externas o en el conocimiento individual del asesor. Sin captura sistemática, muchas señales de crecimiento se perdían antes de llegar al CRM.",
              transformation:
                "Con Salesforce, Agentforce y Sales Cloud, la oportunidad se captura automáticamente desde Galería Inmobiliaria, Licitacion.info u otras fuentes, se enriquece con contexto del cliente y se asigna al equipo comercial correcto en minutos.",
              value:
                "Menos oportunidades perdidas, mayor velocidad de respuesta y mejor control del funnel desde el primer contacto.",
              products: ["Sales Cloud", "Agentforce SDR", "Einstein AI"],
            },
            {
              number: 2,
              phaseId: "acquire",
              icon: "📊",
              title: "Grow Pipeline",
              subtitle: "Un pipeline más inteligente y mejor priorizado",
              before:
                "El asesor priorizaba por intuición o por urgencia del cliente. Sin criterios objetivos, las cuentas de alto potencial podían esperar mientras se atendían las más ruidosas.",
              transformation:
                "Salesforce analiza zona, tipo de cliente, volumen potencial, historial, riesgo competitivo y probabilidad de conversión para entregar al asesor una lista priorizada de cuentas y oportunidades accionables.",
              value:
                "Mayor productividad comercial, mejor enfoque del equipo y más oportunidades relevantes avanzando en el pipeline.",
              products: ["Sales Cloud", "Einstein AI", "Tableau"],
            },
            {
              number: 3,
              phaseId: "convert",
              icon: "🎯",
              title: "Grow Deals",
              subtitle: "Del seguimiento manual a la ejecución comercial guiada",
              before:
                "El seguimiento de oportunidades dependía de la disciplina individual del asesor: llamadas sin contexto, cotizaciones sin flujo post-creación y alertas de seguimiento que no existían.",
              transformation:
                "Salesforce guía al asesor con recomendaciones concretas: siguiente mejor acción, productos sugeridos, historial de interacción, cotización recomendada y alertas automáticas de seguimiento para cada oportunidad.",
              value:
                "Mejor conversión de oportunidades, ciclos de venta más cortos y mayor disciplina comercial en todo el equipo.",
              products: ["Sales Cloud", "Agentforce", "Einstein Next Best Action"],
            },
            {
              number: 4,
              phaseId: "convert",
              icon: "💰",
              title: "Grow Revenue",
              subtitle: "Más ventas con pedido sugerido, cross-sell y e-commerce",
              before:
                "El asesor no tenía visibilidad del historial de compras completo, frecuencia, cartera o productos complementarios al momento de la visita. Las oportunidades de venta cruzada se perdían por falta de contexto.",
              transformation:
                "Salesforce conecta información comercial con inteligencia de negocio: historial de compras, frecuencia, volumen, productos complementarios y pedido sugerido por Einstein AI. La experiencia se extiende a Argos ONE para compras digitales personalizadas.",
              value:
                "Incremento del ticket promedio, mayor recompra, más ventas cruzadas y mejor adopción de canales digitales.",
              products: ["Sales Cloud", "Einstein AI", "Argos ONE", "Commerce Cloud"],
            },
            {
              number: 5,
              phaseId: "serve",
              icon: "🎧",
              title: "Improve Service",
              subtitle: "Servicio omnicanal con contexto completo",
              before:
                "El cliente contactaba por WhatsApp, Contact Center o web y cada canal manejaba conversaciones aisladas. Sin contexto compartido, los agentes pedían la misma información múltiples veces y la resolución tardaba días.",
              transformation:
                "Service Cloud centraliza cada interacción en una sola vista omnicanal. Agentforce clasifica solicitudes, responde casos simples, enruta PQRs y escala al agente humano con el contexto completo del cliente.",
              value:
                "Menor tiempo de respuesta, reducción de carga operativa, mejor experiencia de cliente y aumento del NPS.",
              products: ["Service Cloud", "Agentforce Service", "WhatsApp Business API", "Konecta"],
            },
            {
              number: 6,
              phaseId: "serve",
              icon: "🔭",
              title: "Vista 360°",
              subtitle: "Conocer mejor a cada cliente para crecer con él",
              before:
                "Argos veía a sus clientes solo como cuentas o pedidos. Sin integración de datos, el historial de compras, comportamiento digital, riesgo de fuga y potencial de crecimiento vivían en sistemas separados o en Excel.",
              transformation:
                "Con Data Cloud, Sales Cloud y Analytics, Argos consolida una visión integral por cliente: historial de compras, comportamiento digital, riesgo de fuga, potencial de crecimiento, participación de cartera, casos abiertos, campañas recibidas y preferencias de canal.",
              value:
                "Mejor segmentación, mayor retención, conversaciones más relevantes y decisiones comerciales basadas en datos.",
              products: ["Data Cloud", "Sales Cloud", "Tableau", "Einstein AI"],
            },
            {
              number: 7,
              phaseId: "serve",
              icon: "📣",
              title: "Campaign Effectiveness",
              subtitle: "Campañas más precisas, no comunicaciones masivas",
              before:
                "Marketing enviaba comunicaciones genéricas a toda la base de clientes. Sin segmentación por comportamiento o potencial, las campañas generaban ruido en lugar de conversiones.",
              transformation:
                "Marketing Cloud permite activar journeys personalizados agrupando clientes por comportamiento, potencial, riesgo, zona o etapa del ciclo comercial. Argos puede reactivar inactivos, retener clientes con caída de volumen o impulsar cross-sell a distribuidores de alto potencial.",
              value:
                "Mayor efectividad comercial, mejor conversión de campañas y activación inteligente de clientes.",
              products: ["Marketing Cloud", "Data Cloud", "Agentforce Marketing", "Argos Amigos"],
            },
            {
              number: 8,
              phaseId: "optimize",
              icon: "🔗",
              title: "Seamless Experience",
              subtitle: "Una experiencia conectada entre ventas, servicio y marketing",
              before:
                "Ventas, servicio y marketing operaban en silos. Un asesor no sabía si el cliente tenía una PQR abierta. Marketing no era alertado del riesgo de fuga detectado por ventas. Los pedidos digitales no eran visibles para el equipo comercial.",
              transformation:
                "Salesforce conecta ventas, servicio, marketing, e-commerce, contact center y analítica sobre el mismo contexto del cliente. Si hay PQR abierta, el asesor lo sabe. Si hay riesgo de fuga, marketing activa una campaña. Si el pedido llegó por WhatsApp, ventas lo ve en la Vista 360.",
              value:
                "Experiencia consistente, menor fricción operativa y equipos internos mejor coordinados.",
              products: ["Sales Cloud", "Service Cloud", "Marketing Cloud", "Slack", "MuleSoft"],
            },
            {
              number: 9,
              phaseId: "optimize",
              icon: "📈",
              title: "Measure & Optimize",
              subtitle: "Medir lo que importa y optimizar continuamente",
              before:
                "Los líderes de Argos dependían de reportes manuales en Excel con rezago de 24 horas o más. El Admin CRM construía todos los reportes a mano. La visibilidad del pipeline, NPS o efectividad de campañas llegaba tarde para actuar.",
              transformation:
                "Los líderes visualizan en tiempo real el avance del pipeline, cobertura de visitas, ventas por zona, clientes en riesgo, efectividad de campañas, PQRs, SLAs, NPS y adopción comercial. Cada iniciativa se conecta con los OKRs estratégicos de Argos.",
              value:
                "Mejores decisiones, mayor visibilidad ejecutiva y capacidad de optimizar la operación comercial en tiempo real.",
              products: ["Tableau", "Einstein Analytics", "Data Cloud", "Salesforce Dashboards"],
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
              name: "Plan de Cuenta Estratégico",
              description: "Documento completo de 14 páginas con análisis de 20 iniciativas priorizadas, mapa de OKRs e implementación.",
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