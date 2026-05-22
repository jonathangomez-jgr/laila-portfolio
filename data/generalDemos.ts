export type GeneralDemoTranslations = {
  en: { title: string; description: string };
  pt: { title: string; description: string };
};

export type GeneralDemo = {
  slug: string;
  title: string;
  description: string;
  translations: GeneralDemoTranslations;
  industries: string[];
  solutions: string[];
  videoUrl?: string;
  hidden?: boolean;
};

export const generalDemos: GeneralDemo[] = [
  {
    slug: "financial-services-digital-engagement",
    title: "Vivi, Agente Hipotecario",
    description:
      "Ejemplo de cómo podemos tener un agente autónomo para dar seguimiento a las solicitudes de créditos hipotecarios, consultando la información del cliente para evitar pedir información repetida y así únicamente solicitar documentación faltante.",
    translations: {
      en: {
        title: "Vivi, Mortgage Agent",
        description:
          "An example of how we can have an autonomous agent to follow up on mortgage loan applications, consulting the client's information to avoid requesting repeated data and only asking for missing documentation.",
      },
      pt: {
        title: "Vivi, Agente Hipotecário",
        description:
          "Exemplo de como podemos ter um agente autônomo para acompanhar as solicitações de crédito hipotecário, consultando as informações do cliente para evitar pedir dados repetidos e assim solicitar apenas a documentação faltante.",
      },
    },
    industries: ["Servicios Financieros"],
    solutions: ["Financial Services Cloud", "Digital Engagement", "WhatsApp"],
    videoUrl: "https://youtu.be/UMZ00Ayu2uo",
  },
  {
    slug: "soft-transitions-unified-messaging",
    title: "Soft Transitions with Unified Messaging",
    description:
      "Cómo Salesforce Unified Messaging (UCP) permite transiciones fluidas entre canales digitales sin perder el contexto de la conversación.",
    translations: {
      en: {
        title: "Soft Transitions with Unified Messaging",
        description:
          "How Salesforce Unified Messaging (UCP) enables smooth transitions between digital channels without losing conversation context.",
      },
      pt: {
        title: "Transições Suaves com Unified Messaging",
        description:
          "Como o Salesforce Unified Messaging (UCP) permite transições fluidas entre canais digitais sem perder o contexto da conversa.",
      },
    },
    industries: ["Multi Industria", "Retail"],
    solutions: ["Service Cloud", "Marketing Cloud", "WhatsApp", "Agentforce"],
    videoUrl: "https://youtu.be/Wk7SvNqCUWk",
  },
  {
    slug: "consumer-goods-mobile-execution",
    title: "Consumer Goods Mobile Execution",
    description:
      "Demo genérica para mostrar ejecución comercial, visitas, cuentas, pedidos y operación móvil.",
    translations: {
      en: {
        title: "Consumer Goods Mobile Execution",
        description:
          "Generic demo to show commercial execution, visits, accounts, orders, and mobile operations.",
      },
      pt: {
        title: "Consumer Goods Mobile Execution",
        description:
          "Demo genérica para mostrar execução comercial, visitas, contas, pedidos e operação móvel.",
      },
    },
    industries: ["Consumer Goods"],
    solutions: ["CG Cloud"],
    hidden: true,
  },
  {
    slug: "data-cloud-loyalty-activation",
    title: "Data Cloud & Loyalty Activation",
    description:
      "Demo para explicar unificación de perfiles, asistencia a eventos, segmentación y activación.",
    translations: {
      en: {
        title: "Data Cloud & Loyalty Activation",
        description:
          "Demo to explain profile unification, event attendance, segmentation, and activation.",
      },
      pt: {
        title: "Data Cloud & Loyalty Activation",
        description:
          "Demo para explicar unificação de perfis, participação em eventos, segmentação e ativação.",
      },
    },
    industries: ["Sports & Entertainment"],
    solutions: ["Data Cloud"],
    hidden: true,
  },
  {
    slug: "field-service-quotes",
    title: "Field Service Quotes",
    description:
      "Demo sobre generación de cotizaciones desde una experiencia de servicio en campo.",
    translations: {
      en: {
        title: "Field Service Quotes",
        description:
          "Demo about generating quotes from a field service experience.",
      },
      pt: {
        title: "Field Service Quotes",
        description:
          "Demo sobre geração de cotações a partir de uma experiência de serviço em campo.",
      },
    },
    industries: ["Field Service"],
    solutions: ["Salesforce Field Service"],
    hidden: true,
  },
];
