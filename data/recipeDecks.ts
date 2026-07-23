import type { ExecutiveDeck } from "./executiveDecks";

export type RecipeDeck = ExecutiveDeck & {
  recipeSlug: string;
};

export const recipeDecks: RecipeDeck[] = [
  {
    slug: "deck",
    customerSlug: "recipe",
    recipeSlug: "whatsapp-attachments-custom-channel",
    title: "Adjuntos en Agentforce por WhatsApp",
    subtitle:
      "Canal custom conectado directo a Meta para procesar imágenes, audio, video y documentos con IA.",
    duration: "12 min",
    slides: [
      // 1 · Portada
      {
        layout: "title",
        eyebrow: "Build Recipes · Postura técnica y práctica",
        title:
          "Adjuntos en Agentforce\npor WhatsApp",
        subtitle:
          "Cuando el canal estándar no puede procesarlos, el negocio no se detiene: se construye un canal custom que sí lo hace.",
        footnote: "Build Recipes · Laila Portfolio · 2026",
      },

      // 2 · Statement ejecutivo
      {
        layout: "quote",
        quote:
          "El archivo llega a Salesforce, pero Agentforce no puede procesarlo. La receta reemplaza el canal por un webhook público conectado directo a Meta, y un pipeline de IA que convierte cada adjunto en texto entendible por el agente. El cliente sigue mandando fotos, notas de voz y documentos — el agente responde como si los hubiera leído.",
        context: "Statement técnico · Postura completa",
      },

      // 3 · Sección: El Reto
      {
        layout: "section",
        eyebrow: "Parte 1 · El Reto",
        title: "Por qué falla el path estándar",
        subtitle:
          "El adjunto se guarda como ContentDocument. El Agent recibe la referencia — pero no procesa el binario. Responde con error y el caso de uso muere ahí.",
      },

      // 4 · Contexto del problema
      {
        layout: "bullets",
        eyebrow: "Síntomas observados",
        title: "Qué pasa hoy con Digital Engagement estándar",
        bullets: [
          "El cliente envía una foto, audio o documento por WhatsApp.",
          "El archivo llega a Salesforce y se relaciona al Messaging Session como ContentDocument.",
          "Agentforce recibe el mensaje con la referencia al media — no invoca un modelo multimodal sobre el binario.",
          "El agente responde 'no pude procesar el archivo'.",
          "Casos con comprobantes, evidencia visual o notas de voz quedan bloqueados.",
        ],
        highlight:
          "Impacto: en servicios financieros, retail o seguros, esto elimina buena parte del valor de tener un canal conversacional.",
      },

      // 5 · Sección: comparativa
      {
        layout: "section",
        eyebrow: "Parte 2 · Estándar vs Custom",
        title: "¿Por qué salirse del canal nativo?",
        subtitle:
          "El estándar simplifica todo lo que ya cubre. Pero cuando el requisito de negocio es procesar adjuntos hoy — no en el próximo release — el custom se justifica.",
      },

      // 6 · Comparativa
      {
        layout: "comparison",
        eyebrow: "Comparativa honesta",
        title: "Path estándar vs approach custom",
        before: {
          heading: "Estándar · Messaging for WhatsApp + Agentforce",
          items: [
            "WhatsApp conectado vía Messaging Channel nativo.",
            "Session, User y ContentDocument creados automáticamente.",
            "Configuración declarativa; Salesforce mantiene la integración.",
            "El Agent recibe la referencia al media — no procesa el binario.",
            "Ideal cuando solo hay intercambio de texto.",
          ],
        },
        after: {
          heading: "Custom · Webhook + Meta + Custom Channel",
          items: [
            "Force.com Site expone un webhook público que Meta llama.",
            "HMAC-SHA256 valida la firma; Platform Event decouplea la recepción.",
            "Pipeline de IA convierte cada adjunto en texto interpretado.",
            "El Agent responde el análisis del contenido — nunca ve el binario.",
            "Multi-tenant nativo: varios números en el mismo org, cada uno con su agente.",
          ],
        },
      },

      // 7 · Sección: cómo funciona
      {
        layout: "section",
        eyebrow: "Parte 3 · Cómo funciona",
        title: "El flujo end-to-end",
        subtitle:
          "Todo lo pesado ocurre asíncrono. El webhook responde rápido; el pipeline procesa; el agente ve texto ya interpretado.",
      },

      // 8 · Tres capas conceptuales
      {
        layout: "pillars",
        eyebrow: "Fundamentos técnicos",
        title: "Tres piezas que sostienen el canal",
        pillars: [
          {
            title: "Webhook público",
            body: "Force.com Site expone la URL que Meta llama en cada evento. Guest User Profile con FLS acotado. Validación HMAC-SHA256 sobre el body para verificar autenticidad.",
            accent: "indigo",
          },
          {
            title: "Platform Events + Queueable",
            body: "El webhook publica un Platform Event y responde 200. Los subscribers y Queueables procesan de forma asíncrona, evitando bloquear el hilo síncrono y respetando governor limits.",
            accent: "violet",
          },
          {
            title: "Agent API con JWT",
            body: "Callout explícito al Einstein Agent Runtime desde Apex. Client Credentials Flow con isNamedUserJwtEnabled=true — sin esto, api.salesforce.com devuelve 404.",
            accent: "sky",
          },
        ],
      },

      // 9 · Arquitectura de alto nivel
      {
        layout: "split",
        eyebrow: "Arquitectura",
        title: "De Meta al agente, de vuelta al cliente",
        left: {
          heading: "Recepción",
          items: [
            "Meta → Force.com Site (webhook público, Guest User).",
            "WhatsAppWebhookHandler valida HMAC y publica Platform Event.",
            "Handler asíncrono deduplica por Message_ID__c (External ID).",
            "Crea Conversation + Message + Media según el tipo.",
          ],
        },
        right: {
          heading: "Procesamiento",
          items: [
            "Media Queueable descarga el binario de la CDN de Meta.",
            "Flow admin-configurable invoca Prompt Template (GPT-4o vision, Whisper, GPT-4o docs).",
            "El resultado se entrega al Agent como mensaje sintético con prefijo [IMAGE CONTEXT] / [AUDIO CONTEXT].",
            "Agent responde en texto — o vía OpenAI TTS si el usuario pidió audio.",
          ],
        },
      },

      // 10 · Sección: modelo de datos
      {
        layout: "section",
        eyebrow: "Parte 4 · Modelo de datos",
        title: "Seis objetos custom sostienen el canal",
        subtitle:
          "Cada uno con un rol claro. Diseñados para trazabilidad completa: cada mensaje, cada archivo, cada llamada al Agent queda registrada.",
      },

      // 11 · Los seis objetos
      {
        layout: "pillars",
        eyebrow: "Data model",
        title: "Objetos que sostienen la integración",
        pillars: [
          {
            title: "WhatsApp_Configuration__c",
            body: "Credenciales de Meta, agente ruteado, Flow API names, TTS. Un registro por número — multi-tenant nativo.",
            accent: "indigo",
          },
          {
            title: "WhatsApp_Conversation__c",
            body: "Sesión por cliente + configuración. Guarda session_id del Agent y modo de respuesta (audio/texto).",
            accent: "violet",
          },
          {
            title: "WhatsApp_Message__c",
            body: "Un registro por cada mensaje inbound/outbound. Message_ID__c es External ID — evita duplicados de reintentos.",
            accent: "sky",
          },
          {
            title: "WhatsApp_Media__c",
            body: "Metadata del adjunto + link a Salesforce Files (ContentVersion). Un registro por archivo entrante.",
            accent: "emerald",
          },
        ],
      },

      // 12 · Sección: pipelines
      {
        layout: "section",
        eyebrow: "Parte 5 · Pipelines",
        title: "Un pipeline por tipo de media",
        subtitle:
          "Imagen, audio, video, documento. Todos terminan en un mensaje sintético con el resultado del análisis — que el Agent recibe como si el usuario lo hubiera escrito.",
      },

      // 13 · Pipelines side-by-side
      {
        layout: "split",
        eyebrow: "Procesamiento asíncrono",
        title: "Imagen y documento vs audio y video",
        left: {
          heading: "Imagen · Documento",
          items: [
            "Download desde Meta CDN → Salesforce Files.",
            "Flow (forImage / forFile) invoca Prompt Template GPT-4o.",
            "Extrae texto, estructura del documento o descripción visual.",
            "Mensaje sintético con [IMAGE CONTEXT] o [DOCUMENT CONTEXT] al Agent.",
          ],
        },
        right: {
          heading: "Audio · Video",
          items: [
            "Audio: Whisper transcribe la nota de voz a texto.",
            "Video: Whisper sobre la pista de audio + GPT-4o-mini para summary.",
            "Prefijo [AUDIO CONTEXT] o [VIDEO CONTEXT] en el mensaje sintético.",
            "Limitación honesta: OpenAI no analiza frames visuales — solo la pista de audio.",
          ],
        },
      },

      // 14 · Métricas de la integración
      {
        layout: "metrics",
        eyebrow: "Costo de ownership",
        title: "Lo que hay que mantener",
        metrics: [
          { value: "6", label: "Objetos custom" },
          { value: "~30", label: "Clases Apex" },
          { value: "4", label: "Pipelines de media" },
          { value: "67+", label: "Campos con FLS explícito" },
        ],
      },

      // 15 · Sección: seguridad
      {
        layout: "section",
        eyebrow: "Parte 6 · Seguridad",
        title: "Un canal público — protegido por diseño",
        subtitle:
          "HMAC en el webhook, JWT en el Agent API, secretos en campos protegidos, sharing model conservador, DML fuera de callouts.",
      },

      // 16 · Cuándo elegir esta receta
      {
        layout: "comparison",
        eyebrow: "Trade-offs",
        title: "Cuándo elegir esta receta — y cuándo no",
        before: {
          heading: "Cuándo NO usarla",
          items: [
            "El caso es solo intercambio de texto — el estándar sobra.",
            "El release nativo de Salesforce ya cubre tu escenario.",
            "No hay developer disponible para mantener Apex y pipelines asíncronos.",
            "El volumen no justifica el costo de ownership.",
          ],
        },
        after: {
          heading: "Cuándo SÍ usarla",
          items: [
            "Procesar adjuntos es requisito no negociable de negocio.",
            "El caso incluye audio, video o documentos que requieren análisis multimodal.",
            "Necesitas varios números en el mismo org con routing independiente por agente.",
            "Tienes equipo con capacidad de mantener Apex y monitorear async.",
          ],
        },
      },

      // 17 · Cierre
      {
        layout: "closing",
        title: "Cómo aterrizarla en tu org",
        bullets: [
          "Confirma que el requisito de adjuntos justifica salirte del canal estándar.",
          "Levanta el Force.com Site con Guest User configurado — HMAC activado desde el día uno.",
          "Crea el Connected App para Agent API con isNamedUserJwtEnabled=true (crítico).",
          "Activa manualmente los Prompt Templates en Prompt Builder tras el deploy.",
          "Empieza con imagen — el pipeline más simple — y agrega audio/video/documento después.",
        ],
        cta: "¿Conversamos sobre cómo aterrizar esta receta en tu caso?",
      },

      // 18 · Gracias
      {
        layout: "thanks",
        eyebrow: "Build Recipes · Laila Portfolio",
        title: "Gracias",
        subtitle:
          "El canal estándar simplifica lo que cubre. Cuando no cubre, hay recetas que sí — con criterio, no por moda.",
      },
    ],
  },
];

export function getRecipeDeck(recipeSlug: string): RecipeDeck | undefined {
  return recipeDecks.find((deck) => deck.recipeSlug === recipeSlug);
}
