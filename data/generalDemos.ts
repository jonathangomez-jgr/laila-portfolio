export type GeneralDemo = {
  slug: string;
  title: string;
  description: string;
  industries: string[];
  solutions: string[];
  videoUrl?: string;
  hidden?: boolean;
};

export const generalDemos: GeneralDemo[] = [
  {
    slug: "soft-transitions-unified-messaging",
    title: "Soft Transitions with Unified Messaging",
    description:
      "Cómo Salesforce Unified Messaging (UCP) permite transiciones fluidas entre canales digitales sin perder el contexto de la conversación.",
    industries: ["Multi Industria", "Retail"],
    solutions: ["Service Cloud", "Marketing Cloud", "WhatsApp", "Agentforce"],
    videoUrl: "https://youtu.be/Wk7SvNqCUWk",
  },
  {
    slug: "consumer-goods-mobile-execution",
    title: "Consumer Goods Mobile Execution",
    description:
      "Demo genérica para mostrar ejecución comercial, visitas, cuentas, pedidos y operación móvil.",
    industries: ["Consumer Goods"],
    solutions: ["CG Cloud"],
    hidden: true,
  },
  {
    slug: "data-cloud-loyalty-activation",
    title: "Data Cloud & Loyalty Activation",
    description:
      "Demo para explicar unificación de perfiles, asistencia a eventos, segmentación y activación.",
    industries: ["Sports & Entertainment"],
    solutions: ["Data Cloud"],
    hidden: true,
  },
  {
    slug: "field-service-quotes",
    title: "Field Service Quotes",
    description:
      "Demo sobre generación de cotizaciones desde una experiencia de servicio en campo.",
    industries: ["Field Service"],
    solutions: ["Salesforce Field Service"],
    hidden: true,
  },
];
