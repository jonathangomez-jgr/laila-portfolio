export type CustomerDemoTab = {
  id: string;
  label: string;
  title: string;
  content: string;
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
};

export const customerDemos: CustomerDemo[] = [
  {
    slug: "vivalux",
    title: "VivaLux AI-Powered Luxury Experience Demo",
    customerName: "VivaLux",
    industry: "Luxury Hospitality & Lifestyle",
    description:
      "Demo conceptual orientada a mostrar cómo una marca premium puede transformar la relación con sus clientes mediante experiencias hiperpersonalizadas, datos unificados, agentes inteligentes y journeys aspiracionales impulsados por IA.",
    logo: "/customers/vivalux-logo.png",
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
];