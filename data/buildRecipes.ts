export type RecipeApproach = "standard" | "hybrid" | "custom";

export type RecipeAudience = "admin" | "developer" | "architect";

export type RecipeBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | {
      type: "callout";
      tone: "info" | "warning" | "success" | "critical" | "note";
      title?: string;
      text: string;
    }
  | { type: "quote"; text: string; author?: string }
  | { type: "divider" }
  | {
      type: "problem";
      symptom: string;
      rootCause: string;
      impact?: string;
    }
  | {
      type: "comparison";
      standardLabel: string;
      customLabel: string;
      rows: Array<{
        dimension: string;
        standard: string;
        custom: string;
      }>;
    }
  | {
      type: "concept";
      title: string;
      peek: string;
      audience?: RecipeAudience[];
      blocks: RecipeBlock[];
    }
  | {
      type: "architecture";
      title?: string;
      diagram: string;
      legend?: Array<{ label: string; description: string }>;
    }
  | {
      type: "pipeline";
      title: string;
      steps: Array<{
        component: string;
        action: string;
        note?: string;
      }>;
    }
  | {
      type: "dataModel";
      name: string;
      purpose: string;
      fields: Array<{
        name: string;
        type: string;
        purpose: string;
      }>;
    }
  | {
      type: "codeRef";
      name: string;
      kind: "apex" | "lwc" | "flow" | "prompt" | "trigger" | "event";
      sharing?: string;
      purpose: string;
      methods?: Array<{ name: string; description: string }>;
    }
  | {
      type: "apiCall";
      title: string;
      method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
      url: string;
      headers?: Array<{ name: string; value: string }>;
      body?: string;
      response?: string;
      note?: string;
    }
  | {
      type: "tradeoffs";
      pros: string[];
      cons: string[];
      whenToUse: string[];
      whenNotToUse: string[];
    }
  | {
      type: "setupStep";
      number: number;
      title: string;
      instructions: string;
      command?: string;
      screenshotPlaceholder?: { caption: string; aspect?: "wide" | "square" | "tall" };
    }
  | {
      type: "troubleshoot";
      rows: Array<{ issue: string; solution: string }>;
    }
  | {
      type: "screenshot";
      caption: string;
      aspect?: "wide" | "square" | "tall";
      src?: string;
      alt?: string;
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    }
  | {
      type: "sources";
      items: Array<{ label: string; url: string }>;
    };

export type RecipeSection = {
  id: string;
  title: string;
  eyebrow?: string;
  peek?: string;
  defaultOpen?: boolean;
  audience?: RecipeAudience[];
  blocks: RecipeBlock[];
};

export type Recipe = {
  slug: string;
  title: string;
  problemOneLiner: string;
  approach: RecipeApproach;
  tags: string[];
  audiences: RecipeAudience[];
  author: string;
  authorRole: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  tldr: string[];
  sections: RecipeSection[];
  hidden?: boolean;
};

const whatsappAttachmentsCustom: Recipe = {
  slug: "whatsapp-attachments-custom-channel",
  title: "Adjuntos en Agentforce por WhatsApp — canal custom conectado a Meta",
  problemOneLiner:
    "Los adjuntos enviados por WhatsApp llegan a Salesforce pero Agentforce falla al procesarlos.",
  approach: "custom",
  tags: [
    "Adjuntos",
    "Agentforce",
    "WhatsApp",
    "Digital Engagement",
    "Platform Events",
    "Apex",
    "LWC",
    "Prompt Templates",
    "Flows",
  ],
  audiences: ["admin", "developer", "architect"],
  author: "Jonathan Gomez",
  authorRole: "Agentforce Enterprise Architect",
  publishedAt: "2026-07-23",
  updatedAt: "2026-07-23",
  readingMinutes: 22,
  tldr: [
    "El path estándar de Digital Engagement guarda el archivo en Salesforce como ContentDocument, pero Agentforce recibe el mensaje sin capacidad de procesar el binario y responde con error.",
    "La receta reemplaza el canal estándar: un webhook público en Force.com Sites recibe directo de Meta, valida HMAC-SHA256 y publica un Platform Event.",
    "Un pipeline asíncrono descarga el archivo, lo procesa con un Flow + Prompt Template (GPT-4o para imágenes/documentos, Whisper para audio) y entrega el resultado como mensaje sintético al Agent.",
    "El Agent responde el análisis del contenido — nunca ve el binario, solo el texto interpretado.",
    "Costo: 6 objetos custom, ~30 clases Apex, 4 pipelines (imagen/audio/video/documento), permission sets dedicados y un Guest User Profile para el webhook.",
  ],
  sections: [
    {
      id: "problem",
      eyebrow: "El problema",
      title: "Por qué falla el path estándar",
      defaultOpen: true,
      blocks: [
        {
          type: "problem",
          symptom:
            "El cliente envía una foto, audio o documento por WhatsApp. El archivo llega a Salesforce como ContentDocument relacionado al Messaging Session, pero el Agent responde 'no pude procesar el archivo'.",
          rootCause:
            "En el path estándar, Digital Engagement le entrega al Agent un mensaje con referencia al media, no el contenido interpretado. Agentforce (a la fecha de este documento) no invoca automáticamente un modelo multimodal sobre ese binario, así que reporta el fallo.",
          impact:
            "Cualquier caso de uso donde el cliente adjunte evidencia (comprobantes, fotos de producto, notas de voz) queda bloqueado. En verticales como servicios financieros, retail o seguros, esto elimina buena parte del valor de un canal conversacional.",
        },
        {
          type: "callout",
          tone: "note",
          title: "Fecha de la nota",
          text: "Salesforce puede cerrar esta brecha en releases futuros. Esta receta documenta el estado observado en 2026-07 y la mitigación construida para producción.",
        },
      ],
    },
    {
      id: "comparison",
      eyebrow: "Comparativa",
      title: "Path estándar vs este approach custom",
      defaultOpen: true,
      blocks: [
        {
          type: "comparison",
          standardLabel: "Estándar · Messaging for WhatsApp + Agentforce",
          customLabel: "Este approach · Webhook + Meta + Custom Channel",
          rows: [
            {
              dimension: "Configuración del canal",
              standard:
                "WhatsApp conectado vía Messaging Channel de Salesforce. Number, templates y routing configurados en Digital Engagement.",
              custom:
                "Number registrado directo en Meta Business. Salesforce se comunica con la Graph API vía Named Credentials / Remote Site Settings.",
            },
            {
              dimension: "Recepción de mensajes",
              standard:
                "Salesforce recibe eventos vía la integración nativa. Messaging Session, Messaging User y ContentDocument son creados automáticamente.",
              custom:
                "Force.com Site expone un endpoint público (REST). Meta hace POST al webhook. Un Platform Event decouplea la recepción de la lógica de negocio.",
            },
            {
              dimension: "Almacenamiento del contenido",
              standard:
                "ContentDocument relacionado al Messaging Session. Sin metadata adicional del canal.",
              custom:
                "Objetos custom: WhatsApp_Conversation__c, WhatsApp_Message__c, WhatsApp_Media__c, WhatsApp_Log__c. Trazabilidad completa del canal.",
            },
            {
              dimension: "Procesamiento de adjuntos",
              standard:
                "El Agent recibe el mensaje con referencia al media pero no procesa el binario. Responde error.",
              custom:
                "Pipeline dedicado: download → Flow → Prompt Template (GPT-4o vision / Whisper) → mensaje sintético → Agent. El Agent ve texto interpretado.",
            },
            {
              dimension: "Comunicación con el Agent",
              standard:
                "Routing automático vía Digital Engagement + Omni-Channel.",
              custom:
                "Callout explícito al Agent API (Einstein Agent Runtime) con JWT desde Connected App con Client Credentials Flow.",
            },
            {
              dimension: "Governance & mantenimiento",
              standard:
                "Configuración declarativa. Salesforce mantiene la integración.",
              custom:
                "~30 clases Apex, permission sets, Guest User Profile con FLS en 67+ campos, Remote Site Settings, Named Credentials. Requiere developer.",
            },
            {
              dimension: "Multitenancy (varios números)",
              standard:
                "Un Messaging Channel por número. Routing configurable.",
              custom:
                "WhatsApp_Configuration__c por número; webhook path incluye configId. Config cache map-based por transacción.",
            },
            {
              dimension: "Extensibilidad",
              standard:
                "Limitada a lo que Digital Engagement expone.",
              custom:
                "Flows admin-configurables por tipo de media. TTS opcional. Reglas custom sobre keywords, audio-mode, escalamiento.",
            },
          ],
        },
      ],
    },
    {
      id: "flow-side-by-side",
      eyebrow: "Paso a paso — estándar vs custom",
      title: "Cómo funciona cada camino, sin dar nada por sentado",
      peek: "Dos caminos, del mismo mensaje de WhatsApp hasta la respuesta del Agent. Con analogías para perfil de negocio y detalle técnico verificable en fuentes oficiales.",
      defaultOpen: true,
      blocks: [
        {
          type: "paragraph",
          text: "Antes del detalle, la idea en una frase: en el camino estándar Salesforce actúa como recepcionista con contrato firmado con Meta — recibe, guarda y clasifica todo por ti; en el camino custom tú montas tu propia recepción, tus propias reglas, y una banda transportadora de IA que traduce cada adjunto a texto antes de entregarlo al agente. El camino estándar es más simple; el custom procesa lo que el estándar hoy no procesa.",
        },
        {
          type: "concept",
          title: "Lenguaje común antes de arrancar",
          peek: "Cinco términos que se repiten. Con analogía en una línea para que cualquiera pueda seguir el flujo.",
          blocks: [
            {
              type: "list",
              items: [
                "Webhook — es un timbre. En vez de que Salesforce pregunte cada rato '¿llegó algo nuevo?', Meta le toca el timbre cada vez que llega un mensaje. La URL del timbre es pública.",
                "HMAC-SHA256 — es el sello con firma del mensajero. Meta firma cada paquete con un secreto que solo comparte con Salesforce; si la firma no coincide, el paquete se descarta como sospechoso.",
                "Platform Event — es el intercomunicador del edificio. Alguien lo pulsa (publica) y todos los suscritos oyen a la vez, sin que quien pulsó tenga que esperar respuesta. Sirve para no bloquear el hilo del webhook.",
                "Queueable / Async Apex — es una lista de pendientes. En vez de hacer todo en el momento (y arriesgarse a que el timbre suene ocupado), Salesforce apunta la tarea y la ejecuta cuando puede, respetando límites de plataforma.",
                "Prompt Template — es una receta guardada. Le decimos al modelo de IA con qué instrucciones tratar el archivo (una imagen, un PDF), y siempre la sigue igual. Vive en Prompt Builder, se activa desde Setup.",
                "JWT (JSON Web Token) — es un pasaporte con foto y sellos. Lo emite Salesforce, lo firma criptográficamente, y el Agent API solo acepta ese formato — no un boleto ordinario.",
                "Multimodal — que el modelo entiende más de un tipo de dato. Un modelo multimodal puede leer texto, mirar una imagen y sacar conclusiones sobre ambos.",
              ],
            },
          ],
        },
        {
          type: "concept",
          title: "Camino estándar — cómo funciona hoy en Salesforce",
          peek: "Enhanced WhatsApp Channel + Omni-Channel Flow + Agentforce Service Agent. Todo lo pesado lo mantiene Salesforce; tú configuras el ruteo y el agente.",
          blocks: [
            {
              type: "paragraph",
              text: "El path estándar se llama Enhanced WhatsApp Channel. Se levanta desde Setup → Messaging Settings, se vincula al Meta Business Account vía embedded signup, y a partir de ahí Salesforce se encarga de la relación técnica con Meta (endpoint, tokens, firma). El cliente responsable solo configura el ruteo hacia el agente y el consentimiento del canal.",
            },
            {
              type: "pipeline",
              title: "Flujo estándar paso a paso",
              steps: [
                {
                  component: "Setup del canal",
                  action:
                    "Un admin va a Setup → Messaging Settings → New Channel → WhatsApp → Enhanced → Connect to WhatsApp. Se abre el 'embedded signup' de Meta (login con la cuenta Business), se elige la WABA y el número.",
                  note: "Crea un registro MessagingChannel + un MessagingChannelUsage con deploymentType (ej. DigitalEngagementConversation) y channelConsentType (ImplicitOptIn / ExplicitOptIn / DoubleOptIn). Fuente: MessagingChannel Metadata API — developer.salesforce.com.",
                },
                {
                  component: "Meta Cloud API",
                  action:
                    "Cuando un cliente le escribe al número, Meta manda el evento HTTP al endpoint receptor que hostea Salesforce. El cliente responsable no ve esa URL — Salesforce la administra internamente como parte del canal Enhanced.",
                  note: "Tokens y verificación de firma del lado Salesforce ↔ Meta son gestionados por Salesforce en el canal Enhanced; el admin no los maneja.",
                },
                {
                  component: "Persistencia en Salesforce",
                  action:
                    "Salesforce crea o reutiliza tres registros por conversación: MessagingEndUser (el contacto por su canal), MessagingSession (la sesión con estado y ruteo) y ConversationEntry (una fila por cada turno del hilo).",
                  note: "ConversationEntry.entry_payload puede ser MESSAGE, PARTICIPANT_CHANGED, ROUTING_RESULT, SESSION_STATUS_CHANGED, entre otros. Ref oficial: docs/service/messaging-object-model.",
                },
                {
                  component: "Ruteo por Omni-Channel Flow",
                  action:
                    "El MessagingChannel apunta a un Omni-Channel Flow con Routing Type = Omni-Flow. Ese flow usa el elemento Route Work y decide a qué recurso enviar el trabajo — en este caso, a un Agentforce Service Agent (uno por inbound flow).",
                  note: "Salesforce Help — ai.agent_parent_deploy.htm confirma: 'each inbound flow can be connected to one agent only'.",
                },
                {
                  component: "Turno inbound al Agent",
                  action:
                    "El texto del mensaje llega al agente a través del runtime de Agentforce (Atlas Reasoning Engine). El agente clasifica el topic, planifica y ejecuta acciones (invocable actions, prompt templates, flows).",
                },
                {
                  component: "Adjunto en canal Enhanced",
                  action:
                    "Si el cliente manda una imagen o PDF, Salesforce guarda el archivo como ContentDocument / ContentVersion y lo enlaza al MessagingSession vía ContentDocumentLink (aparece en la Files Related List de la sesión).",
                  note: "Referencia: help.salesforce.com — service.livemessage_agent_send_files.htm. El agente recibe la referencia al archivo, no el binario.",
                },
                {
                  component: "Procesar el binario del adjunto",
                  action:
                    "Para que el agente 'entienda' la imagen o el PDF, hay que construir una acción custom que llame a un Flex Prompt Template con File Input. El agente invoca esa acción; el prompt corre sobre GPT-4o Mini o Gemini 2.0 Flash. Formatos soportados por el prompt: PNG, JPEG, PDF.",
                  note: "developer.salesforce.com/blogs/2025/05/unlock-multi-modal-ai-with-file-inputs-in-prompt-builder + .../2025/07/how-to-build-a-multimodal-agent-in-salesforce. Nota: audio, video, .docx, .xlsx no aparecen en la matriz oficial.",
                },
                {
                  component: "Respuesta outbound",
                  action:
                    "La respuesta del agente se publica como un ConversationEntry de tipo MESSAGE en la MessagingSession. Salesforce se encarga de enviarlo a Meta Cloud API y de vuelta al WhatsApp del cliente.",
                  note: "Dentro de la ventana de 24 h del cliente se envía como mensaje libre; fuera de ella, se requiere un WhatsApp Message Template pre-aprobado por Meta.",
                },
              ],
            },
            {
              type: "callout",
              tone: "info",
              title: "En una analogía de negocio",
              text: "Enhanced WhatsApp es como contratar una empresa de recepción llave-en-mano: te ponen el mostrador, el guardia, el sistema de correo interno y el archivo. Tú decides a qué asesor va cada llamada (Omni-Channel Flow) y qué se le contesta al cliente (el agente). Si llega un paquete de un tipo que la empresa no procesa hoy — por ejemplo, una nota de voz —, la recepcionista lo archiva pero no lo abre; hay que contratar aparte a alguien que lo abra.",
            },
            {
              type: "callout",
              tone: "warning",
              title: "Lo que el estándar NO cubre hoy (2026-07)",
              text: "Multimodal nativo del canal cubre imagen (PNG/JPEG) y PDF vía Flex Prompt Template + acción custom. No hay capability oficial de canal Enhanced que procese audio (nota de voz), video, ni documentos Office (.docx, .xlsx) automáticamente sin código adicional del cliente responsable.",
            },
          ],
        },
        {
          type: "concept",
          title: "Camino custom — cómo funciona esta receta",
          peek: "Force.com Site + HMAC + Platform Event + pipeline de IA + Agent API con JWT. Tú administras la relación con Meta; tú decides cómo se procesa cada adjunto.",
          blocks: [
            {
              type: "paragraph",
              text: "En el camino custom, la 'recepcionista' es tuya. Meta no entrega el paquete a un mostrador de Salesforce — te lo entrega directo a la puerta pública que tú expones desde Force.com Sites. Todo lo demás (validar, guardar, descargar el archivo, correr la IA, llamar al agente y responder) es orquestación asíncrona que corre dentro del org y que tú controlas.",
            },
            {
              type: "pipeline",
              title: "Flujo custom paso a paso",
              steps: [
                {
                  component: "Meta Cloud API",
                  action:
                    "Meta hace POST a la URL pública del Force.com Site (Guest User). El path incluye el configId del número — así el mismo org atiende varios números en paralelo, uno por WhatsApp_Configuration__c.",
                  note: "Un Force.com Site expone endpoints anónimos protegidos por Guest User Profile con FLS explícito.",
                },
                {
                  component: "WhatsAppWebhookHandler (Apex REST)",
                  action:
                    "Valida la firma HMAC-SHA256 del header X-Hub-Signature-256 sobre el body recibido usando el Webhook_Verify_Token__c. Si la firma no coincide, descarta. Si coincide, publica un WhatsApp_Inbound_Event__e y responde 200 en milisegundos.",
                  note: "El handler es without sharing porque el Guest User no tiene sesión de usuario. HMAC evita spoofing del endpoint público.",
                },
                {
                  component: "WhatsApp_Inbound_Event__e (Platform Event)",
                  action:
                    "El evento carga el payload de Meta y el configId. Es HighVolume y se publica con PublishAfterCommit — decouplea la recepción síncrona del procesamiento.",
                  note: "Analogía: el webhook toca el intercomunicador y cuelga. Los suscritos (subscribers) reaccionan a su ritmo.",
                },
                {
                  component: "WhatsAppInboundEventHandler",
                  action:
                    "Deduplica por Message_ID__c (External ID indexado) — Meta reintenta si no ve un 200, y esto evita procesar el mismo mensaje dos veces. Crea o reutiliza WhatsApp_Conversation__c + WhatsApp_Message__c.",
                  note: "Si el mensaje es texto, salta directo al Agent. Si es media (imagen/audio/video/documento), crea WhatsApp_Media__c en estado Pending y encola descarga.",
                },
                {
                  component: "WhatsAppMediaDownloadQueueable",
                  action:
                    "Descarga el binario desde el CDN de Meta (graph.facebook.com → lookaside.fbsbx.com) y lo guarda como ContentVersion + ContentDocumentLink en Salesforce Files. Calcula SHA-256 para integridad.",
                  note: "Las URLs de Meta expiran en ~5 minutos. La descarga tiene que ser inmediata.",
                },
                {
                  component: "Trigger + Queueable de análisis por tipo",
                  action:
                    "Cuando ContentVersion_ID__c queda poblado, un trigger encola el queueable correcto: WhatsAppImageAnalysisQueueable, WhatsAppAudioTranscriptionQueueable, WhatsAppVideoAnalysisQueueable o WhatsAppFileProcessingQueueable.",
                },
                {
                  component: "Flow + Prompt Template",
                  action:
                    "El queueable invoca un Flow admin-configurable (Image_Analysis_Flow_API_Name__c, File_Processing_Flow_API_Name__c, Audio_Transcription_Flow_API_Name__c). El Flow llama a un Prompt Template en Prompt Builder — GPT-4o vision para imagen/documento, Whisper para audio, GPT-4o-mini + Whisper para video.",
                  note: "El admin puede editar el Flow y el Prompt Template sin tocar Apex — el criterio de análisis vive fuera del código.",
                },
                {
                  component: "Mensaje sintético al Agent",
                  action:
                    "El resultado del análisis se envuelve como un WhatsApp_Message__c inbound con prefijo — [IMAGE CONTEXT] / [AUDIO CONTEXT] / [DOCUMENT CONTEXT] / [VIDEO CONTEXT]. El Agent lo recibe como si el usuario hubiera escrito ese texto.",
                  note: "El Agent nunca ve el binario. Solo ve texto ya interpretado por la IA.",
                },
                {
                  component: "WhatsAppAgentforceService → Agent API (JWT)",
                  action:
                    "Crea o reutiliza sesión contra api.salesforce.com/einstein/ai-agent/v1/agents/{agentId}/sessions con Bearer JWT. Envía el mensaje al endpoint /sessions/{sessionId}/messages. Parsea la respuesta (messages[type=='Inform'].message).",
                  note: "El Connected App debe tener isNamedUserJwtEnabled=true — sin ese flag, el Agent API responde 404. Es el error más difícil de diagnosticar.",
                },
                {
                  component: "WhatsAppAPIService.sendTextMessage",
                  action:
                    "Callout a Meta Graph API con el texto (o audio TTS de OpenAI si Response_Mode__c='audio'). El cliente recibe la respuesta en WhatsApp — texto, o nota de voz si pidió audio.",
                  note: "Cada paso queda registrado en WhatsApp_Log__c con action code, source, payload, timestamps y relaciones — trazabilidad end-to-end para debugging asíncrono.",
                },
              ],
            },
            {
              type: "callout",
              tone: "info",
              title: "En la misma analogía",
              text: "El camino custom es como abrir tu propia recepción: pones el timbre en la puerta (webhook), le enseñas al mensajero un sello secreto (HMAC), pones un intercomunicador para no dejarlo esperando (Platform Event), tienes tu propio equipo de traducción que abre cada paquete y lo transcribe (pipeline de IA), y tú vas al asesor con el paquete ya traducido (mensaje sintético al Agent). Más piezas — pero cada una es tuya, y cada tipo de paquete tiene traducción.",
            },
          ],
        },
        {
          type: "callout",
          tone: "success",
          title: "Ventajas concretas de la solución custom",
          text: "1) Procesa todo tipo de adjunto (imagen, audio, video, documento .pdf/.docx/.xlsx) hoy, sin esperar release nativo. 2) Multi-tenant nativo: varios números de WhatsApp en el mismo org, cada uno ruteado a su propio agente. 3) Criterio de análisis editable por Admin — Flows y Prompt Templates viven fuera del código Apex. 4) TTS opcional: responder por nota de voz cuando el cliente lo pide. 5) Trazabilidad total en WhatsApp_Log__c (INFO/WARN/ERROR por acción y fuente). 6) Evoluciona al ritmo del negocio — no depende del roadmap de Digital Engagement.",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Riesgos y elementos a tomar en cuenta",
          text: "1) Cost of ownership alto: ~30 clases Apex, 6 objetos custom, 2 Platform Events, Guest User Profile con FLS en 67+ campos y Remote Site Settings. 2) Requiere developer para mantenimiento — deploys, permisos, monitoreo asíncrono. 3) La relación con Meta la administras tú: rotación de tokens del System User, monitoreo del rate limit de Graph API, actualización de HMAC secret. 4) Costos recurrentes de OpenAI (vision, Whisper, TTS) que no existen en el path estándar. 5) Se pierde la integración nativa con Omni-Channel routing — reconstruirla es esfuerzo adicional. 6) Templates de WhatsApp se sincronizan manualmente desde Meta — no hay embedded signup. 7) Si Salesforce libera capability nativa que cubra tu caso, hay que evaluar migración. 8) Un endpoint público mal configurado (HMAC apagado, Guest User con permisos de más) es superficie de ataque real — la seguridad se diseña desde el día uno.",
        },
      ],
    },
    {
      id: "how-it-works",
      eyebrow: "Cómo funciona",
      title: "Flujo end-to-end",
      peek: "Desde que Meta emite el webhook hasta que el Agent responde al usuario.",
      blocks: [
        {
          type: "paragraph",
          text: "La solución sustituye la capa de canal por un webhook público que Meta llama directamente. Todo lo que ocurre después es orquestación asíncrona dentro de Salesforce para no bloquear el hilo síncrono del webhook y respetar los governor limits de callouts.",
        },
        {
          type: "concept",
          title: "Webhooks — el mecanismo base",
          peek: "Un webhook es una URL pública que un sistema llama cuando ocurre un evento. No es polling, no es una API: es una notificación push.",
          blocks: [
            {
              type: "paragraph",
              text: "Meta necesita entregarle a Salesforce cada mensaje que llega al número de WhatsApp. En vez de que Salesforce le pregunte constantemente a Meta ('¿hay algo nuevo?'), Meta invierte la relación: guarda una URL de Salesforce y le hace POST cada vez que hay un evento. Esa URL es el webhook.",
            },
            {
              type: "list",
              items: [
                "GET al webhook con un challenge → verificación inicial (una sola vez, al registrar).",
                "POST al webhook con el payload del evento → recepción normal de mensajes.",
                "El receptor SIEMPRE debe responder HTTP 200 rápido; si tarda o falla, Meta reintenta y produce duplicados.",
              ],
            },
            {
              type: "callout",
              tone: "info",
              title: "Por qué Force.com Sites",
              text: "El webhook debe ser público (Meta no autentica con OAuth). Force.com Sites permite exponer un endpoint anónimo vía Guest User Profile — no requiere que Meta tenga credenciales del org.",
            },
          ],
        },
        {
          type: "concept",
          title: "HMAC-SHA256 — proteger un endpoint público",
          peek: "Un endpoint público es un blanco de spoofing. HMAC valida que el request realmente venga de Meta.",
          blocks: [
            {
              type: "paragraph",
              text: "Meta firma cada POST con un secret compartido (Webhook Verify Token) usando HMAC-SHA256 y lo envía en el header X-Hub-Signature-256. Salesforce recalcula la firma sobre el body recibido con el mismo secret. Si coincide, el mensaje es legítimo; si no, se descarta.",
            },
            {
              type: "list",
              items: [
                "El secret nunca viaja en la red — solo la firma derivada.",
                "Cualquier cambio de 1 byte en el body invalida la firma.",
                "Un atacante que no tenga el secret no puede fabricar mensajes válidos.",
              ],
            },
          ],
        },
        {
          type: "concept",
          title: "Platform Events + Queueable — desacoplar la recepción",
          peek: "El webhook debe responder rápido. Todo el trabajo pesado ocurre asíncrono.",
          blocks: [
            {
              type: "paragraph",
              text: "El handler del webhook (WhatsAppWebhookHandler) hace lo mínimo posible: validar HMAC, parsear, publicar un Platform Event y responder 200. El resto — crear registros, descargar media, llamar al Agent — ocurre en subscribers y Queueables asíncronos.",
            },
            {
              type: "list",
              items: [
                "Platform Events son bus de mensajería nativo: se publican con DML o EventBus.publish, y disparan triggers sobre el evento.",
                "Queueable + Database.AllowsCallouts permite encadenar HTTP callouts sin chocar con el límite de 'no callouts after DML'.",
                "Trade-off: el webhook responde rápido, pero cualquier error después es asíncrono — hay que loggear todo (WhatsApp_Log__c cubre esto).",
              ],
            },
          ],
        },
        {
          type: "architecture",
          title: "Arquitectura de alto nivel",
          diagram: `WhatsApp Cloud API (Meta)
        │
        ▼
Force.com Public Site  (wppwebhook · Guest User)
        │  HMAC-SHA256 validated
        ▼
WhatsAppWebhookHandler  (@RestResource, without sharing)
  · GET  → returns hub.challenge
  · POST → validates HMAC, publishes Platform Event
        │
        ▼
WhatsApp_Inbound_Event__e  (HighVolume, PublishAfterCommit)
        │
        ▼
WhatsAppInboundEventHandler
  · Dedup via Message_ID__c External ID
  · Creates Conversation + Message
  · Routes by media type
        │
   ┌────┴────────────────────────┐
   ▼                             ▼
AgentforceService         Media Pipeline
(Agent API callouts)      (download → AI → synthetic message → Agent)
   │
   ▼
WhatsApp_Assistant (Agentforce agent)
   │
   ├── Text  → WhatsApp API
   └── Audio → OpenAI TTS → WhatsApp audio message`,
          legend: [
            {
              label: "Force.com Site",
              description:
                "Endpoint público expuesto vía Guest User. Único componente accesible desde internet.",
            },
            {
              label: "Platform Event",
              description:
                "Bus de mensajería que decouplea la recepción síncrona de la lógica asíncrona.",
            },
            {
              label: "Media Pipeline",
              description:
                "Descarga el binario de Meta CDN, lo pasa por un Flow con Prompt Template, y genera un mensaje sintético con el resultado.",
            },
          ],
        },
      ],
    },
    {
      id: "data-model",
      eyebrow: "Modelo de datos",
      title: "Objetos custom y Platform Events",
      peek: "6 objetos custom y 2 Platform Events sostienen el canal.",
      blocks: [
        {
          type: "paragraph",
          text: "Cada objeto tiene un rol claro. Están diseñados para trazabilidad completa: cada mensaje, cada archivo, cada llamada al Agent queda registrada.",
        },
        {
          type: "dataModel",
          name: "WhatsApp_Configuration__c",
          purpose:
            "Credenciales de Meta + settings del canal. Un registro por número de WhatsApp; soporta múltiples cuentas en el mismo org.",
          fields: [
            { name: "API_Key__c", type: "LongTextArea(500)", purpose: "Meta System User Token (Bearer)" },
            { name: "Phone_Number_ID__c", type: "Text(50)", purpose: "ID del número en Meta" },
            { name: "Business_Account_ID__c", type: "Text(50)", purpose: "WABA ID" },
            { name: "Webhook_Verify_Token__c", type: "Text(255)", purpose: "Secret para HMAC + verificación GET" },
            { name: "Agentforce_Agent_Id__c", type: "Text(18)", purpose: "BotDefinition ID del agent ruteado" },
            { name: "HMAC_Validation_Enabled__c", type: "Checkbox", purpose: "Toggle de validación (producción = true)" },
            { name: "Session_Timeout_Minutes__c", type: "Number", purpose: "Ventana de sesión (default 1440)" },
            { name: "Image_Analysis_Flow_API_Name__c", type: "Text(255)", purpose: "Flow para análisis de imágenes" },
            { name: "File_Processing_Flow_API_Name__c", type: "Text(255)", purpose: "Flow para documentos" },
            { name: "Audio_Transcription_Flow_API_Name__c", type: "Text(255)", purpose: "Flow para audio" },
            { name: "TTS_Enabled__c", type: "Checkbox", purpose: "Respuestas por voz vía OpenAI TTS" },
            { name: "SF_Client_Id__c / SF_Client_Secret__c", type: "Text", purpose: "Connected App para JWT del Agent API" },
          ],
        },
        {
          type: "dataModel",
          name: "WhatsApp_Conversation__c",
          purpose:
            "Una conversación por número de cliente + configuración. Guarda el session_id del Agent y el modo de respuesta (texto/audio).",
          fields: [
            { name: "WhatsApp_Configuration__c", type: "Lookup", purpose: "Link a la config; requerido" },
            { name: "Customer_Phone__c", type: "Text(30)", purpose: "Número del cliente" },
            { name: "Status__c", type: "Picklist", purpose: "Active / Idle / Closed" },
            { name: "Agentforce_Session_Id__c", type: "Text(255)", purpose: "Sesión activa del Agent" },
            { name: "Agentforce_Agent_Id__c", type: "Text(18)", purpose: "Agent dueño de la sesión — mismatch = invalida" },
            { name: "Response_Mode__c", type: "Text(20)", purpose: "'audio' | 'text' — preferencia por conversación" },
            { name: "Contact__c / Case__c / Lead__c", type: "Lookup", purpose: "Links opcionales al CRM" },
          ],
        },
        {
          type: "dataModel",
          name: "WhatsApp_Message__c",
          purpose:
            "Un registro por cada mensaje inbound u outbound, de cualquier tipo. Message_ID__c es External ID indexado — evita duplicados cuando Meta reintenta.",
          fields: [
            { name: "Conversation__c", type: "Lookup", purpose: "Parent" },
            { name: "Message_ID__c", type: "Text(255) ExternalId", purpose: "Dedup + status updates" },
            { name: "Direction__c", type: "Picklist", purpose: "Inbound / Outbound" },
            { name: "Message_Type__c", type: "Picklist", purpose: "text, image, audio, video, document, location, interactive, template, ..." },
            { name: "Content__c", type: "LongTextArea(32768)", purpose: "Texto o resultado de transcripción/análisis" },
            { name: "Is_From_Agentforce__c", type: "Checkbox", purpose: "Marca respuestas generadas por el Agent" },
            { name: "Raw_Payload_JSON__c", type: "LongTextArea(131072)", purpose: "Payload original — debugging" },
          ],
        },
        {
          type: "dataModel",
          name: "WhatsApp_Media__c",
          purpose:
            "Metadata del archivo + link a Salesforce Files (ContentVersion). Un registro por adjunto entrante.",
          fields: [
            { name: "Message__c", type: "Lookup", purpose: "Parent message" },
            { name: "Media_ID__c", type: "Text(255)", purpose: "ID del media en Meta" },
            { name: "Media_Type__c", type: "Picklist", purpose: "Image / Video / Audio / Document / Sticker" },
            { name: "MIME_Type__c", type: "Text(100)", purpose: "MIME string" },
            { name: "Download_Status__c", type: "Picklist", purpose: "Pending / Downloading / Completed / Failed" },
            { name: "ContentVersion_ID__c", type: "Text(18)", purpose: "Link a Salesforce Files tras descarga" },
            { name: "SHA256_Hash__c", type: "Text(64)", purpose: "Integridad del binario" },
          ],
        },
        {
          type: "dataModel",
          name: "WhatsApp_Template__c",
          purpose:
            "Templates pre-aprobados de Meta sincronizados al org. Usados para mensajes outbound iniciados por el negocio.",
          fields: [
            { name: "Template_Name__c / Template_ID__c", type: "Text", purpose: "Identificador + ID de Meta" },
            { name: "Language__c / Category__c / Status__c", type: "Text", purpose: "Metadata" },
            { name: "Body_Text__c", type: "LongTextArea", purpose: "Cuerpo con placeholders" },
            { name: "Button_JSON__c", type: "LongTextArea", purpose: "Botones como JSON" },
            { name: "Variable_Count__c", type: "Number", purpose: "Cantidad de variables dinámicas" },
          ],
        },
        {
          type: "dataModel",
          name: "WhatsApp_Log__c",
          purpose:
            "Log estructurado unificado. INFO/WARN/ERROR con action code, source, payload request/response, stack trace y relaciones. Esencial para debugging asíncrono.",
          fields: [
            { name: "Level__c", type: "Picklist", purpose: "INFO / WARN / ERROR" },
            { name: "Action__c", type: "Text", purpose: "Ej. WEBHOOK_RECEIVED, AGENTFORCE_RESPONSE_SENT_TO_WHATSAPP" },
            { name: "Source__c", type: "Text", purpose: "Apex class.method" },
            { name: "Details__c", type: "LongTextArea(131072)", purpose: "Descripción legible" },
            { name: "Request_Payload__c / Response_Payload__c", type: "LongTextArea", purpose: "HTTP raw" },
            { name: "Related_Conversation__c / Related_Message__c", type: "Lookup", purpose: "Contexto" },
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Platform Events",
          text: "Además, existen 2 Platform Events: WhatsApp_Inbound_Event__e (carga el payload de Meta desde el webhook hacia el handler; incluye Configuration_Id__c para routing multi-config) y WhatsApp_Outbound_Event__e (tracking de outbound, uso futuro).",
        },
      ],
    },
    {
      id: "pipelines",
      eyebrow: "Pipelines de procesamiento",
      title: "Cómo se convierte un binario en respuesta del Agent",
      peek: "Un pipeline por tipo de media. Todos terminan en un mensaje sintético entregado al Agent.",
      blocks: [
        {
          type: "paragraph",
          text: "El patrón general: descargar el binario, procesarlo con IA en un Flow, generar un mensaje sintético (con prefijo tipo [IMAGE CONTEXT]) y entregar ese mensaje al Agent como si lo hubiera enviado el usuario. El Agent nunca ve el binario — solo texto ya interpretado.",
        },
        {
          type: "pipeline",
          title: "Pipeline de imagen",
          steps: [
            { component: "Webhook", action: "Recibe payload con media_id" },
            { component: "WhatsAppInboundEventHandler", action: "Crea WhatsApp_Media__c en Pending", note: "No rutea a Agent aún" },
            { component: "WhatsAppMediaDownloadQueueable", action: "Descarga binario desde Meta CDN (graph.facebook.com → lookaside.fbsbx.com)" },
            { component: "WhatsAppMediaHandler.downloadAndStoreMedia", action: "Almacena como ContentVersion + ContentDocumentLink" },
            { component: "WhatsAppMediaTrigger", action: "Detecta ContentVersion_ID__c poblado → enqueue analysis" },
            { component: "WhatsAppImageAnalysisQueueable", action: "Invoca WhatsAppMediaFlowService (forImage)" },
            { component: "Flow WhatsApp_Image_Analysis_Template", action: "Llama al Prompt Template GPT-4o vision" },
            { component: "createInboundTranscriptionMessage", action: "Genera mensaje sintético con prefijo [IMAGE CONTEXT]" },
            { component: "WhatsAppAgentforceQueueable", action: "Envía el mensaje al Agent y espera respuesta" },
            { component: "WhatsAppAPIService.sendTextMessage", action: "Devuelve la respuesta al cliente por WhatsApp" },
          ],
        },
        {
          type: "pipeline",
          title: "Pipeline de audio",
          steps: [
            { component: "Webhook + WhatsAppInboundEventHandler", action: "Crea Media en Pending" },
            { component: "WhatsAppMediaDownloadQueueable", action: "Descarga el archivo de audio" },
            { component: "WhatsAppMediaHandler", action: "Detecta type=audio → processAudioTranscription" },
            { component: "Flow (forAudio)", action: "Ejecuta transcripción (stub o Whisper directo)" },
            { component: "Mensaje sintético con [AUDIO CONTEXT]", action: "Entregado al Agent" },
          ],
        },
        {
          type: "pipeline",
          title: "Pipeline de documento (PDF/Word/Excel)",
          steps: [
            { component: "Webhook + Handler", action: "Media creada" },
            { component: "Download Queueable", action: "Binario en Salesforce Files" },
            { component: "WhatsAppMediaHandler.processFileContent", action: "Detecta tipo documento" },
            { component: "Flow (forFile) + Prompt Template GPT-4o", action: "Extrae contenido del documento" },
            { component: "Mensaje sintético con [DOCUMENT CONTEXT]", action: "Entregado al Agent" },
          ],
        },
        {
          type: "pipeline",
          title: "Pipeline de video",
          steps: [
            { component: "Webhook + Handler", action: "Media creada" },
            { component: "Download Queueable", action: "Binario en Files" },
            { component: "WhatsAppVideoAnalysisQueueable", action: "Callout 1: OpenAI Whisper (audio del video)" },
            { component: "GPT-4o-mini", action: "Callout 2: summary de la transcripción" },
            { component: "Mensaje sintético con [VIDEO CONTEXT]", action: "Entregado al Agent" },
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Limitación del pipeline de video",
          text: "OpenAI no analiza frames visuales del video — solo la pista de audio vía Whisper. Videos sin audio devuelven 'no audio detected' (deliberadamente honesto, sin alucinar).",
        },
      ],
    },
    {
      id: "agentforce-integration",
      eyebrow: "Integración con el Agent",
      title: "Cómo se llama al Agent desde Apex",
      peek: "Agent API + JWT tokens. Client Credentials Flow con isNamedUserJwtEnabled=true.",
      blocks: [
        {
          type: "concept",
          title: "Agent API — Einstein Agent Runtime",
          peek: "REST API oficial para orquestar sesiones y mensajes con un Agentforce Agent desde fuera del canal estándar.",
          blocks: [
            {
              type: "paragraph",
              text: "El Agent API expone tres operaciones básicas: crear sesión, enviar mensaje, cerrar sesión. Requiere un JWT (no un token opaco). Sirve exactamente para casos como este: donde el canal no es Salesforce nativo pero necesitas al Agent en el flujo.",
            },
          ],
        },
        {
          type: "concept",
          title: "JWT vs token opaco — la diferencia crítica",
          peek: "Sin JWT, el Agent API devuelve 404. La diferencia está en un checkbox del Connected App.",
          blocks: [
            {
              type: "paragraph",
              text: "El Connected App usa Client Credentials Flow para autenticar Salesforce-a-Salesforce. Por default, devuelve un token opaco tipo '00D...!AQE...' que funciona con la Data API pero NO con api.salesforce.com. El Agent API vive en api.salesforce.com y espera un JWT (eyJ...).",
            },
            {
              type: "callout",
              tone: "critical",
              title: "isNamedUserJwtEnabled = true",
              text: "Sin este flag activado en el Connected App, todo lo demás está bien configurado y el endpoint responde 404. Es el error más difícil de diagnosticar porque el token 'parece funcionar' — sirve para otras APIs.",
            },
          ],
        },
        {
          type: "apiCall",
          title: "Crear sesión con el Agent",
          method: "POST",
          url: "https://api.salesforce.com/einstein/ai-agent/v1/agents/{agentId}/sessions",
          headers: [
            { name: "Authorization", value: "Bearer {JWT}" },
            { name: "Content-Type", value: "application/json" },
          ],
          body: `{
  "externalSessionKey": "<UUID>",
  "instanceConfig": {
    "endpoint": "https://yourorg.my.salesforce.com"
  },
  "bypassUser": true
}`,
          response: `{
  "sessionId": "...",
  "messages": [ ... ]
}`,
        },
        {
          type: "apiCall",
          title: "Enviar mensaje al Agent",
          method: "POST",
          url: "https://api.salesforce.com/einstein/ai-agent/v1/sessions/{sessionId}/messages",
          headers: [
            { name: "Authorization", value: "Bearer {JWT}" },
            { name: "Content-Type", value: "application/json" },
          ],
          body: `{
  "message": {
    "sequenceId": 1,
    "type": "Text",
    "text": "[IMAGE CONTEXT] Foto de un comprobante de pago por $1,250 MXN a nombre de Elena Torres..."
  }
}`,
          note: "No pasar el campo 'variables' — Agent Script bundles rechazan mutaciones externas con InternalVariableMutationAttemptException.",
        },
        {
          type: "codeRef",
          name: "WhatsAppAgentforceService",
          kind: "apex",
          sharing: "with sharing",
          purpose:
            "Encapsula la integración completa con el Agent. Session create/reuse, message send, response parsing, detección de keywords de audio-mode. Usa el patrón pendingSessionId/pendingAudioMode (variables estáticas) para diferir DML entre callouts.",
          methods: [
            { name: "processMessage(conversationId, text)", description: "Punto de entrada — encola el mensaje al Agent" },
            { name: "createOrReuseSession(configId, conversationId)", description: "Reusa la sesión si existe y es del mismo agent; crea nueva si no" },
            { name: "parseResponse(responseMap)", description: "Extrae messages[type=='Inform'].message" },
          ],
        },
        {
          type: "codeRef",
          name: "WhatsAppAuthService",
          kind: "apex",
          sharing: "with sharing",
          purpose:
            "OAuth 2.0 Client Credentials → JWT. Fallback a UserInfo.getSessionId() para contextos interactivos. Cache del token por transacción.",
        },
      ],
    },
    {
      id: "flows-and-prompts",
      eyebrow: "Flows y Prompt Templates",
      title: "Cómo un Admin puede modificar el procesamiento sin código",
      peek: "El pipeline invoca Flows configurados por API name. Cambiar el análisis = editar un Flow.",
      blocks: [
        {
          type: "paragraph",
          text: "Un principio del diseño: separar la ingeniería del canal (Apex) del criterio de negocio (qué se analiza y cómo). Los Flows son extensibles por Admin — cada configuración apunta a un Flow por tipo de media.",
        },
        {
          type: "table",
          headers: ["Flow API Name", "Tipo", "Propósito"],
          rows: [
            [
              "WhatsApp_Audio_Transcription_Template",
              "AutoLaunchedFlow",
              "Stub para transcripción de audio. Input: contentDocumentId. Output: transcription. Admins reemplazan con Whisper, Einstein STT, etc.",
            ],
            [
              "WhatsApp_Image_Analysis_Template",
              "AutoLaunchedFlow",
              "Llama al Prompt Template WhatsApp_Image_Analysis (GPT-4o vision). Input: contentDocumentId. Output: analysis.",
            ],
            [
              "WhatsApp_File_Processing_Template",
              "AutoLaunchedFlow",
              "Llama al Prompt Template WhatsApp_File_Processing (GPT-4o). Input: contentDocumentId. Output: content.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Contrato del Flow",
          text: "Los Flows deben tener input contentDocumentId (String, isInput=true) y output con la key correcta (transcription | analysis | content). Los nombres son case-sensitive.",
        },
        {
          type: "screenshot",
          src: "/recipes/Custom%20Whatsapp%20%20channel/Prompt%20Template%20WhatsApp.png",
          alt: "Prompt Template WhatsApp_Image_Analysis en Prompt Builder",
          caption:
            "Prompt Template [FDE] Interpretación de archivo adjunto en Prompt Builder. Modelo GPT 5.4, input types Image/PDF/Text, instrucciones para estructurar la respuesta como descripción del Caso.",
          aspect: "wide",
        },
        {
          type: "screenshot",
          src: "/recipes/Custom%20Whatsapp%20%20channel/Flow%20WhatsApp_Image_Analysis.png",
          alt: "Flow WhatsApp_Image_Analysis en Flow Builder",
          caption:
            "Flow [FDE] file from WA. Recupera Content Document Link → Messaging Session → Contact → Content Document; rama por tipo de documento (Excel vs otros); invoca el Prompt Template y crea o actualiza el Case.",
          aspect: "wide",
        },
      ],
    },
    {
      id: "conversation-experience",
      eyebrow: "Experiencia del usuario",
      title: "Qué ve el cliente y qué ve el operador",
      peek: "Conversaciones en WhatsApp + dashboard en Salesforce con el panel de mensajes en tiempo real.",
      blocks: [
        {
          type: "paragraph",
          text: "Del lado del cliente, la experiencia es la de WhatsApp de siempre. Del lado del operador, un LWC dashboard consolida configuraciones, conversaciones, templates y analytics.",
        },
        {
          type: "table",
          headers: ["Componente LWC", "Propósito"],
          rows: [
            ["whatsappDashboard", "Contenedor principal. Tabs: Configurations, Conversations, Templates, Analytics."],
            ["whatsappConversationPanel", "Chat UI en tiempo real. Muestra todos los tipos de mensaje (texto, imagen, audio, documento, ubicación, botones)."],
            ["whatsappConfigurationList / whatsappConfiguration", "CRUD de configuraciones. Secretos con toggle show/hide y mask guard."],
            ["whatsappTemplateManager", "Sync desde Meta, preview y envío de templates."],
            ["whatsappAnalytics", "Métricas: message counts, tiempos de respuesta, stats por conversación."],
          ],
        },
        {
          type: "screenshot",
          src: "/recipes/Custom%20Whatsapp%20%20channel/Conversation%20Panel%20.png",
          alt: "WhatsApp Conversation Panel LWC en el WhatsApp Dashboard",
          caption:
            "Conversation Panel del WhatsApp Dashboard. Lista de conversaciones activas a la izquierda, hilo en tiempo real a la derecha — imagen y documento procesados, respuestas de Agentforce en verde.",
          aspect: "wide",
        },
        {
          type: "screenshot",
          src: "/recipes/Custom%20Whatsapp%20%20channel/Dashboard%20con%20lista%20de%20configuraciones%20multi-n%C3%BAmero%20.png",
          alt: "WhatsApp Dashboard con configuraciones múltiples",
          caption:
            "WhatsApp Integration Dashboard: dos WhatsApp_Configuration__c registrados (BR +55 y CO +57), cada uno con Phone Number ID, WABA ID y Agent ID independientes.",
          aspect: "wide",
        },
        {
          type: "screenshot",
          src: "/recipes/Custom%20Whatsapp%20%20channel/Case%20creado%20desde%20una%20conversaci%C3%B3n.png",
          alt: "Caso de Salesforce creado desde una conversación de WhatsApp",
          caption:
            "Vista del WhatsApp_Conversation__c CONV-0048 vinculado al Case 01535442. El Case fue creado por el Flow con la descripción generada por el Prompt Template (tipo de documento + resumen).",
          aspect: "wide",
        },
      ],
    },
    {
      id: "security",
      eyebrow: "Seguridad",
      title: "Cómo se protege un canal que es público por diseño",
      peek: "HMAC en el webhook, JWT en el Agent API, secretos en campos protegidos, sharing model conservador.",
      blocks: [
        {
          type: "table",
          headers: ["Área", "Implementación"],
          rows: [
            ["Autenticación del webhook", "HMAC-SHA256 vía Crypto.generateMac(). Siempre activo en producción."],
            ["Autenticación del Agent API", "JWT tokens vía Connected App Client Credentials Flow (isNamedUserJwtEnabled=true)."],
            ["Modelo de sharing", "WhatsAppWebhookHandler: without sharing (Guest User). WhatsAppConfigService: inherited. Resto: with sharing."],
            ["Almacenamiento de secretos", "Campos custom protegidos. Nunca en código ni logs."],
            ["Masking en LWC", "Password inputs client-side. Mask guard evita sobrescribir con placeholders al guardar."],
            ["SOQL injection", "Todas las queries con bind variables (:variable). Nunca concatenación."],
            ["Tamaño del API Key", "LongTextArea(500). Los tokens de Meta exceden 295 chars; Text(255) trunca."],
            ["DML durante callouts", "Prohibido. System.debug entre callouts; WhatsAppLogService solo antes o después."],
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Guest User Profile",
          text: "El profile del Site (wppwebhook) requiere: acceso a 29 clases Apex, Read en WhatsApp_Configuration__c, Read/Create en Conversation/Message/Media/Log, y FLS en 67+ campos. Los scripts post-deploy configuran esto automáticamente.",
        },
      ],
    },
    {
      id: "installation",
      eyebrow: "Instalación",
      title: "Setup paso a paso",
      peek: "10 pasos: deploy, site público, permission sets, Remote Site, Connected App, activación, config record, webhook en Meta, agent, verificación.",
      blocks: [
        {
          type: "callout",
          tone: "info",
          title: "Prerrequisitos",
          text: "Org con Agentforce habilitado + Einstein Agent User license. Cuenta de WhatsApp Business API en Meta con token del System User (scopes: whatsapp_business_management, whatsapp_business_messaging). Cuenta OpenAI con créditos. Salesforce CLI v2.x+.",
        },
        {
          type: "setupStep",
          number: 1,
          title: "Autenticar y desplegar",
          instructions:
            "Login al org destino y push del metadata completo.",
          command: `sf org login web --alias WhatsAppSF --instance-url https://your-org.my.salesforce.com
sf config set target-org WhatsAppSF
sf project deploy start`,
        },
        {
          type: "setupStep",
          number: 2,
          title: "Crear Force.com Site para el webhook",
          instructions:
            "Setup → Digital Experiences → Sites and Networks → New. Site Label: 'WhatsApp Webhook Public', Site Name: 'wppwebhook', Type: ChatterNetwork. Activar. Anotar la URL pública.",
          screenshotPlaceholder: {
            caption:
              "Configuración del Force.com Site (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 3,
          title: "Correr scripts post-deploy",
          instructions:
            "Configuran FLS del profile del site, acceso a clases Apex, permisos de objeto y FLS de campos para el Guest User.",
          command: `sf apex run --file scripts/apex/fix-fls.apex --target-org WhatsAppSF
sf apex run --file scripts/apex/configure-guest-profile.apex --target-org WhatsAppSF
sf apex run --file scripts/apex/configure-guest-object-perms.apex --target-org WhatsAppSF
sf apex run --file scripts/apex/configure-guest-fls.apex --target-org WhatsAppSF`,
        },
        {
          type: "setupStep",
          number: 4,
          title: "Agregar Remote Site Settings",
          instructions:
            "Setup → Security → Remote Site Settings → New para cada URL: graph.facebook.com, lookaside.fbsbx.com, api.salesforce.com, api.openai.com.",
        },
        {
          type: "setupStep",
          number: 5,
          title: "Crear Connected App para JWT",
          instructions:
            "Setup → App Manager → New Connected App. Enable OAuth Settings + Client Credentials Flow + Issue JWT-based access tokens (CRÍTICO). Scopes: Api, Chatbot API, SFAP API, Refresh Token. Después de guardar: Manage → Edit Policies → Run As: Einstein Agent User. Anotar Consumer Key y Secret.",
          screenshotPlaceholder: {
            caption:
              "Connected App con JWT tokens habilitado (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 6,
          title: "Activar Prompt Templates",
          instructions:
            "Setup → Einstein → Prompt Builder. Activar WhatsApp_Image_Analysis y WhatsApp_File_Processing. Sin esto, retornan generations vacías sin error.",
          screenshotPlaceholder: {
            caption:
              "Prompt Templates activados en Prompt Builder (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 7,
          title: "Crear WhatsApp Configuration Record",
          instructions:
            "Abrir el tab Configurations del dashboard. New Configuration. Llenar API Key, Phone Number ID, Business Account ID, Webhook Verify Token, Agentforce Agent ID (BotDefinition ID 0Xx...), Consumer Key/Secret del Connected App, Flow API Names, TTS settings. Guardar y anotar el Record ID (18 chars).",
        },
        {
          type: "setupStep",
          number: 8,
          title: "Configurar webhook en Meta",
          instructions:
            "Meta for Developers → tu WhatsApp app → Configuration. Callback URL: https://<org>.salesforce-sites.com/wppwebhook/services/apexrest/whatsapp/webhook/{configId}. Verify Token: mismo valor que Webhook_Verify_Token__c. Verify and Save. Suscribirse al webhook 'messages'. App en modo Live.",
        },
        {
          type: "setupStep",
          number: 9,
          title: "Publicar el Agent",
          instructions: "Validar, publicar y activar el authoring bundle del agent.",
          command: `sf agent validate authoring-bundle --json --api-name WhatsApp_Assistant
sf agent publish authoring-bundle --json --api-name WhatsApp_Assistant --skip-retrieve
sf agent activate --json --api-name WhatsApp_Assistant`,
        },
        {
          type: "setupStep",
          number: 10,
          title: "Verificar la integración",
          instructions:
            "Enviar un WhatsApp al número desde tu teléfono. Revisar WhatsApp Dashboard → Logs para WEBHOOK_RECEIVED, AGENTFORCE_QUEUEABLE_ENQUEUED, AGENTFORCE_RESPONSE_SENT_TO_WHATSAPP. Confirmar respuesta del agent en tu WhatsApp.",
        },
      ],
    },
    {
      id: "tradeoffs",
      eyebrow: "Trade-offs",
      title: "Cuándo elegir esta receta",
      peek: "Cuando el path estándar no procesa adjuntos y necesitas producción hoy — no cuando puedes esperar el release nativo.",
      blocks: [
        {
          type: "tradeoffs",
          pros: [
            "Procesa cualquier tipo de adjunto (imagen, audio, video, documento) con IA multimodal.",
            "Multi-tenant nativo: varios números en el mismo org con configs independientes.",
            "Extensible por Admin: los Flows de análisis se editan sin código.",
            "TTS opcional para respuestas por voz.",
            "Trazabilidad completa vía WhatsApp_Log__c.",
            "Independiente del roadmap de Digital Engagement — evoluciona a tu ritmo.",
          ],
          cons: [
            "~30 clases Apex + 6 objetos custom + Platform Events + Guest User Profile. Cost of ownership alto.",
            "Requiere developer para mantenimiento (permisos, deploys, debugging asíncrono).",
            "Se pierde la integración nativa con Omni-Channel routing (existe una base opcional pero requiere trabajo adicional).",
            "Los templates de WhatsApp se sincronizan manualmente desde Meta.",
            "Costos recurrentes de OpenAI (vision, Whisper, TTS) que no aplican en el path estándar.",
          ],
          whenToUse: [
            "Procesar adjuntos es un requisito de negocio no negociable.",
            "El caso incluye audio, video o documentos que requieren análisis multimodal.",
            "Necesitas múltiples números en el mismo org con routing independiente.",
            "Tienes un equipo con capacidad de mantener Apex y monitorear pipelines asíncronos.",
          ],
          whenNotToUse: [
            "Solo intercambio de texto con el cliente — el estándar es suficiente.",
            "El release nativo de Salesforce ya cubre tu caso (revisar antes de construir).",
            "No hay developer disponible para mantenimiento.",
            "El volumen es tan bajo que el costo de ownership supera el valor.",
          ],
        },
      ],
    },
    {
      id: "troubleshooting",
      eyebrow: "Troubleshooting",
      title: "Síntomas comunes y cómo resolverlos",
      peek: "Los errores más frecuentes al levantar la integración.",
      blocks: [
        {
          type: "troubleshoot",
          rows: [
            {
              issue: "Agent no responde",
              solution:
                "Filtrar WhatsApp_Log__c por Action LIKE 'AGENTFORCE_%'. Verificar Agentforce_Agent_Id__c, agent publicado, Run-As user en el Connected App.",
            },
            {
              issue: "Webhook no recibe mensajes",
              solution:
                "Site activo, Guest User con acceso a clases Apex, URL incluye configId, Meta App en Live mode, HMAC secret coincide.",
            },
            {
              issue: "HMAC validation failing",
              solution:
                "Webhook_Verify_Token__c debe coincidir con el App Secret de Meta. Buscar WEBHOOK_HMAC_VALIDATION_FAILED en logs.",
            },
            {
              issue: "Media no se descarga",
              solution:
                "Auto_Download_Media__c=true. Remote Site Settings incluye lookaside.fbsbx.com. Las URLs de Meta expiran en 5 minutos.",
            },
            {
              issue: "Image analysis retorna vacío",
              solution:
                "Activar WhatsApp_Image_Analysis Prompt Template en Prompt Builder. Verificar Image_Analysis_Flow_API_Name__c.",
            },
            {
              issue: "JWT token retorna 404",
              solution:
                "isNamedUserJwtEnabled=true no está seteado en el Connected App. Redeploy y reset de credenciales.",
            },
            {
              issue: "Agent retorna 401/403",
              solution:
                "Run-As user no configurado. Setup → App Manager → Manage → Edit Policies.",
            },
            {
              issue: "Mensajes duplicados",
              solution:
                "Los reintentos de Meta se manejan por el External ID indexado en Message_ID__c. No remover ese guard.",
            },
            {
              issue: "'You have uncommitted work pending'",
              solution:
                "DML entre callouts. Auditar el path — no llamar WhatsAppLogService entre callouts; usar System.debug.",
            },
          ],
        },
      ],
    },
    {
      id: "references",
      eyebrow: "Referencias",
      title: "Documentación oficial",
      blocks: [
        {
          type: "sources",
          items: [
            {
              label: "WhatsApp Business Cloud API — Meta",
              url: "https://developers.facebook.com/docs/whatsapp/cloud-api",
            },
            {
              label: "Agent API — Einstein Agent Runtime",
              url: "https://developer.salesforce.com/docs/einstein/genai/guide/agent-api.html",
            },
            {
              label: "Platform Events — Salesforce",
              url: "https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/",
            },
            {
              label: "Force.com Sites",
              url: "https://help.salesforce.com/s/articleView?id=sf.sites_overview.htm",
            },
            {
              label: "Prompt Builder",
              url: "https://help.salesforce.com/s/articleView?id=sf.prompt_builder.htm",
            },
          ],
        },
      ],
    },
  ],
};

const whatsappV2Handoff: Recipe = {
  slug: "whatsapp-attachments-custom-channel-v2-handoff",
  title: "WhatsApp + Agentforce v2 · Handoff completo bot → cola → humano, ownership real y visibilidad de adjuntos en el Case",
  problemOneLiner:
    "La V1 ya recibe adjuntos y responde por Agentforce. Falta: escalar a un humano cuando el cliente lo pide, saber quién está atendiendo, cerrar conversaciones inactivas y que los adjuntos aparezcan también en el Case.",
  approach: "custom",
  tags: [
    "Handoff",
    "Agentforce",
    "WhatsApp",
    "Queue",
    "Bot User",
    "Timeout Scheduler",
    "Custom Notifications",
    "Platform Events",
    "empApi",
    "ContentDocumentLink",
    "GenAiFunction",
    "Custom Permission",
    "LWC Record Page",
    "Invocable Apex",
    "Prompt Templates",
  ],
  audiences: ["admin", "developer", "architect"],
  author: "Jonathan Gomez",
  authorRole: "Agentforce Enterprise Architect",
  publishedAt: "2026-07-30",
  updatedAt: "2026-07-30",
  readingMinutes: 32,
  tldr: [
    "V2 se apoya en toda la infraestructura de la V1 (webhook Meta, objetos custom, pipelines de adjuntos) y agrega el layer que faltaba: gestión de conversaciones cuando el bot NO puede resolver.",
    "El cliente puede pedir 'hablar con una persona' y una GenAiFunction (FDE_afEscalateToHuman) reasigna la conversación a una cola configurable, opcionalmente crea Case, dispara Custom Notifications a los miembros y bloquea al bot de responder.",
    "El bot ahora se muestra como owner de la conversación (Bot User real, no 'Automated Process'). Al aceptar un asesor, el owner cambia al User. Reports y list views nativos por owner cuentan la historia.",
    "Nuevo tab Administración en el LWC (gated por Custom Permission) donde el admin configura por línea: cola destino, crear caso o no, mensajes al cliente y timeouts bot/humano.",
    "Timeout Scheduler cierra conversaciones inactivas cada 5 minutos, con umbrales distintos para modo bot y modo humano.",
    "3 acciones invocables nuevas conectan puntos: FDE_afEscalateToHuman (escalar), FDE_LinkContactToConversation (persistir el contact identificado en la conversación) y las dos que resuelven el 'hueco' de los adjuntos históricos que no se vinculaban al Case cuando llegaba después.",
    "Toda la fase queda detrás de un feature flag Handoff_Enabled__c por línea. Rollback es un checkbox, sin redeploy.",
  ],
  sections: [
    {
      id: "what-is-new",
      eyebrow: "Qué cambia respecto a la V1",
      title: "El resumen que necesitas antes de leer nada más",
      defaultOpen: true,
      blocks: [
        {
          type: "paragraph",
          text: "La V1 dejó al bot conversando con el cliente y procesando adjuntos. La V2 responde a la pregunta que nadie contestaba: y cuando el bot NO puede, ¿qué? Antes, la conversación quedaba huérfana — sin owner claro, sin ruta al asesor humano, sin cierre automático, y con los adjuntos previos invisibles cuando alguien creaba el Case después. La V2 cierra esos cuatro huecos con piezas mínimas y compostables.",
        },
        {
          type: "list",
          items: [
            "Handoff a humano — cuando el cliente lo pide o el bot lo decide, una GenAiFunction transfiere ownership de la conversación a una cola, notifica a los miembros y bloquea al bot para que no responda encima del humano.",
            "Ownership del bot visible — mientras el bot atiende, el owner es un Bot User real con nombre propio (no 'Automated Process'). Reports, list views y auditoría dicen la verdad.",
            "Cierre automático por inactividad — un scheduler cada 5 minutos cierra conversaciones idle. Timeout distinto para modo bot y modo humano.",
            "Adjuntos vinculados al Case y a la conversación — dos acciones invocables Apex hacen el linking bidireccional: cuando llega un adjunto nuevo se enlaza forward al Case si ya existe; cuando el Case se crea después, se hace backfill de los adjuntos históricos.",
            "Contact auto-linked a la conversación — una acción invocable persiste el ContactId que el agente ya resolvió, sin duplicar lookups.",
            "Tab de administración en el LWC — un admin con Custom Permission configura la política de handoff por línea de WhatsApp: cola, checkbox de crear Case, mensajes al cliente, timeouts. Sin código.",
            "Feature flag por línea (Handoff_Enabled__c) — todo lo nuevo vive detrás de un checkbox por WhatsApp_Configuration__c. Se activa por línea de forma independiente. Rollback = destildar.",
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "V1 y V2 conviven",
          text: "Nada de la V2 rompe la V1. Si un cliente en V1 quiere quedarse ahí, puede. La V2 es opt-in por línea. Un mismo org puede tener líneas V1 (bot puro) y líneas V2 (bot + handoff) al mismo tiempo.",
        },
      ],
    },
    {
      id: "v1-vs-v2",
      eyebrow: "Comparativa",
      title: "V1 vs V2 — qué es nuevo, qué se conservó",
      defaultOpen: true,
      blocks: [
        {
          type: "comparison",
          standardLabel: "V1 · Bot atiende adjuntos y responde",
          customLabel: "V2 · V1 + handoff, ownership, timeouts, backfill",
          rows: [
            {
              dimension: "Rol del bot",
              standard: "Responde texto, procesa imagen/audio/documento vía prompt templates, y genera Case cuando el planner lo pide.",
              custom: "Todo lo de V1 + puede invocar FDE_afEscalateToHuman cuando el cliente pide humano o cuando el propio planner detecta que no puede continuar.",
            },
            {
              dimension: "Owner de la conversación",
              standard: "Automated Process (User de sistema para contextos async). Impide reports por owner útiles.",
              custom: "Bot User real durante modo bot; Queue durante handoff pending; User cuando un asesor acepta. Todos los list views y reports nativos por owner cuentan la historia real.",
            },
            {
              dimension: "Cuando el bot no puede resolver",
              standard: "El bot responde con su fallback textual o pide reintentar. Cliente queda sin escalamiento real.",
              custom: "Cliente pide humano → GenAiFunction escalona → cola → notificaciones a asesores → primer asesor que acepta se lleva la conversación. Bot bloqueado de responder mientras humano atiende.",
            },
            {
              dimension: "Vida de la conversación",
              standard: "Session_Expiry_Time__c controla reutilización de conversación (para nuevas sesiones Agentforce). Sin cierre automático.",
              custom: "Session_Expiry_Time__c conservado como está. Se agrega Idle_Expiry_Time__c que un scheduler evalúa cada 5 min con umbrales distintos según owner (Bot_Idle_Timeout_Minutes__c vs Human_Idle_Timeout_Minutes__c).",
            },
            {
              dimension: "Adjuntos vs Case",
              standard: "Adjuntos quedan vinculados solo al WhatsApp_Message__c. Si el Case se crea después, esos adjuntos no aparecen en el Case.",
              custom: "Dos acciones invocables cierran el hueco: forward al Case cuando el adjunto llega y ya existe Case; backfill cuando el Case se crea y hay adjuntos previos.",
            },
            {
              dimension: "Contact ↔ Conversation",
              standard: "El agente identifica al Contact vía lookup pero no persiste el vínculo en WhatsApp_Conversation__c.Contact__c.",
              custom: "Una acción invocable (FDE_LinkContactToConversation) persiste el vínculo idempotentemente después de que el planner resuelve el Contact.",
            },
            {
              dimension: "Administración",
              standard: "Configuración vía metadata de WhatsApp_Configuration__c y setup manual. Cambios requieren edit del registro por developer.",
              custom: "Nuevo tab Administración en el LWC dashboard, gated por Custom Permission WhatsApp_Admin. El admin configura cola, crear-caso, mensajes al cliente y timeouts sin código.",
            },
            {
              dimension: "Notificación al equipo",
              standard: "No hay señal al equipo cuando el bot no puede continuar. La conversación queda en la lista general.",
              custom: "Custom Notifications al bell de cada miembro del queue al escalar. Custom Notifications al owner cuando llega mensaje nuevo en modo humano. LWC actualiza en vivo vía empApi + Platform Event dedicado.",
            },
            {
              dimension: "Ubicación del chat en la UI",
              standard: "Un solo LWC dashboard con lista + panel de chat.",
              custom: "Mismo dashboard + un LWC nuevo standalone (whatsappConversationRecord) para embed en el record page de WhatsApp_Conversation__c. Altura configurable desde App Builder.",
            },
            {
              dimension: "Feature flag",
              standard: "Sin flag. Todo prendido siempre.",
              custom: "Handoff_Enabled__c por WhatsApp_Configuration__c. Deploy no cambia comportamiento de ninguna línea hasta que el admin la enciende. Rollback = destildar.",
            },
          ],
        },
        {
          type: "callout",
          tone: "success",
          title: "Regla que respetamos en toda la V2",
          text: "Todo cambio a código existente está gated por Handoff_Enabled__c. Con la flag apagada, el flujo es idéntico al de la V1. Esto lo probamos en producción: mismo binary, dos líneas, comportamiento distinto según el checkbox.",
        },
      ],
    },
    {
      id: "handoff-topology",
      eyebrow: "Handoff",
      title: "Cómo fluye una conversación de bot a humano",
      peek: "El ciclo completo: cliente pide humano, cola recibe, humano acepta, humano cierra. Con los eventos, actores y salvaguardas.",
      defaultOpen: true,
      blocks: [
        {
          type: "paragraph",
          text: "El handoff no es un flag mágico. Es una secuencia disciplinada: el LLM decide, invoca una acción Apex, la acción cambia ownership de la conversación, dispara notificaciones, publica un Platform Event para el LWC en vivo, y el gate en el InboundEventHandler impide que el bot responda encima del humano cuando llegue el próximo mensaje.",
        },
        {
          type: "pipeline",
          title: "Ciclo bot → cola → humano",
          steps: [
            {
              component: "Cliente en WhatsApp",
              action: "Manda 'necesito hablar con una persona' o similar",
            },
            {
              component: "WhatsAppInboundEventHandler",
              action: "Procesa el mensaje como de costumbre y encola a Agentforce Queueable",
            },
            {
              component: "Agentforce (planner)",
              action: "El topic 'Escalamiento a asesor humano' se activa y decide invocar FDE_afEscalateToHuman",
              note: "Requiere que la Context Variable conversationId tenga visibility=external en Studio",
            },
            {
              component: "GenAiFunction FDE_afEscalateToHuman",
              action: "Bridge al Apex WhatsAppEscalateAction",
            },
            {
              component: "WhatsAppEscalateAction (Apex)",
              action: "Lee la config, respeta o crea Case, reasigna conv.OwnerId al Queue, nullea Agentforce_Session_Id__c",
              note: "Idempotente frente a re-invocaciones",
            },
            {
              component: "Messaging.CustomNotification",
              action: "Envía notificación de bell a todos los User members del Queue",
            },
            {
              component: "WhatsApp_Message_Notification__e",
              action: "Platform Event publicado para que el LWC de cada miembro refresque en vivo",
            },
            {
              component: "WhatsAppAPIService.sendTextMessage",
              action: "Manda al cliente el mensaje configurado en Escalation_Notify_Message__c",
            },
            {
              component: "Humano #1 acepta desde el LWC",
              action: "acceptConversation reasigna owner al User con optimistic locking",
              note: "Si dos humanos aceptan simultáneamente, solo uno gana",
            },
            {
              component: "Cliente responde por WhatsApp",
              action: "InboundEventHandler evalúa gate: Owner.Type=User real → skipAgentforce=true, no encola bot",
              note: "El bot NO responde porque la conv está con humano",
            },
            {
              component: "Humano responde desde el LWC",
              action: "sendMessage vía WhatsAppSendMessageQueueable dispara la API de Meta",
            },
            {
              component: "Humano cierra desde el LWC",
              action: "closeConversationById marca Status=Closed, opcionalmente manda mensaje de cierre",
            },
          ],
        },
        {
          type: "architecture",
          title: "Actores y objetos que participan",
          diagram: `
Cliente WhatsApp
     │
     ▼
Meta Cloud API  ──►  WhatsAppWebhookHandler (Site público)
                            │
                            ▼
                    WhatsApp_Inbound_Event__e  ──►  WhatsAppInboundEventHandler
                                                            │
                                                            │  [gate: Handoff_Enabled__c + Owner.Type]
                                                            │
                                            ┌───────────────┴───────────────┐
                                            │                               │
                                            ▼                               ▼
                                WhatsAppAgentforceQueueable        (SKIP — humano atiende)
                                            │
                                            ▼
                                Agentforce Runtime API
                                            │  (planner decide escalar)
                                            ▼
                                FDE_afEscalateToHuman
                                            │
                                            ▼
                                WhatsAppEscalateAction
                                    ├─► Case (opcional, respeta existente)
                                    ├─► WhatsApp_Conversation__c
                                    │      OwnerId = Queue
                                    │      Agentforce_Session_Id__c = null
                                    │
                                    ├─► Messaging.CustomNotification → miembros del Queue
                                    ├─► Platform Event → LWC (empApi)
                                    └─► WhatsAppAPIService.sendTextMessage → cliente
`,
          legend: [
            { label: "gate", description: "Antes de encolar Agentforce, el handler consulta OwnerId de la conversación. Si owner es User real (no bot user ni Automated Process), no encola." },
            { label: "Queue", description: "Grupo Salesforce tipo Queue. Debe soportar WhatsApp_Conversation__c y Case como sobject types." },
            { label: "empApi", description: "El LWC del dashboard y del record page se suscriben a WhatsApp_Message_Notification__e para refresh sin polling." },
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "El LLM a veces no invoca la acción",
          text: "En pruebas descubrimos que ~10-15% de las veces el LLM produce la despedida textual pero no invoca FDE_afEscalateToHuman. Es un fenómeno documentado de function-calling con context largo. La mitigación es prompt engineering imperativo en el topic ('DEBES invocar la acción; sin ella no hay escalamiento') y validación humana desde el LWC como respaldo.",
        },
      ],
    },
    {
      id: "admin-config",
      eyebrow: "Administración sin código",
      title: "El tab Administración del LWC — 9 campos que gobiernan la política de handoff",
      peek: "Configuración por línea de WhatsApp, gated por Custom Permission. Cero deploys para cambiar el comportamiento.",
      defaultOpen: false,
      blocks: [
        {
          type: "paragraph",
          text: "Todo lo que hace la V2 configurable — desde el checkbox de si crear Case, hasta los timeouts de cierre — vive en 9 campos nuevos sobre WhatsApp_Configuration__c. El LWC del dashboard trae un tab nuevo (Administración) que solo aparece si el user tiene la Custom Permission WhatsApp_Admin. El admin edita esos campos ahí, sin abrir el registro directamente.",
        },
        {
          type: "table",
          headers: ["Campo", "Tipo", "Propósito"],
          rows: [
            ["Handoff_Enabled__c", "Checkbox", "Feature flag. Con esto en false, la V2 duerme y la línea se comporta como V1."],
            ["Escalation_Target_Queue_DeveloperName__c", "Text(80)", "DeveloperName de la Queue destino del escalamiento. Debe soportar WhatsApp_Conversation__c y Case."],
            ["Escalation_Create_Case__c", "Checkbox", "Si true y la conversación no tiene Case aún, la acción de escalar crea uno. Si ya tiene Case, respeta el existente."],
            ["Reassign_Case_Owner_On_Escalation__c", "Checkbox", "Si true, al escalar cambia el OwnerId del Case también al Queue. Si false, respeta las assignment rules del Case."],
            ["Escalation_Notify_Message__c", "LongTextArea(1000)", "Mensaje que se envía al cliente por WhatsApp al momento de escalar. Vacío = no manda mensaje."],
            ["Human_Accept_Message__c", "LongTextArea(1000)", "Mensaje al cliente cuando el humano acepta. Soporta merge token {!User.FirstName}."],
            ["Timeout_Close_Message__c", "LongTextArea(1000)", "Reservado. Hoy el scheduler cierra silenciosamente."],
            ["Bot_Idle_Timeout_Minutes__c", "Number(3,0)", "Minutos de inactividad para cerrar conversación en modo bot. Null o 0 = no cerrar automáticamente."],
            ["Human_Idle_Timeout_Minutes__c", "Number(3,0)", "Minutos de inactividad para cerrar en modo humano. Típicamente mayor que bot."],
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Por qué en WhatsApp_Configuration__c y no un Custom Setting",
          text: "Cada línea de WhatsApp tiene su propia política. Un mismo org con líneas B2B y B2C puede tener queue, timeouts y mensajes distintos por línea. Un Custom Setting global no lo permite. La config por registro también hereda el sharing model del objeto sin custom code.",
        },
        {
          type: "concept",
          title: "Custom Permission WhatsApp_Admin",
          peek: "Cómo se gate el tab de administración.",
          blocks: [
            {
              type: "paragraph",
              text: "El LWC del dashboard evalúa @salesforce/customPermission/WhatsApp_Admin. Si es truthy, muestra el 5to tab. Si es falsy, el tab no aparece siquiera. La Custom Permission se asigna vía un Permission Set (WhatsApp_Admin_Access) que también trae acceso al objeto y FLS de los campos nuevos.",
            },
            {
              type: "list",
              items: [
                "Ventaja frente a chequear profile: cualquier user puede tener el permission set sin cambiar de profile.",
                "Ventaja frente a hardcode del username: cualquier persona nueva del equipo lo hereda al asignársele el permission set.",
                "Rollback: quitar el permission set → el tab desaparece → no puede tocar más la config.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "ownership-model",
      eyebrow: "Ownership",
      title: "Quién es dueño de la conversación en cada momento",
      peek: "El OwnerId cuenta la historia: bot atendiendo, en cola pendiente, humano trabajando.",
      defaultOpen: false,
      blocks: [
        {
          type: "paragraph",
          text: "En V1 el OwnerId era siempre 'Automated Process' — el user de sistema que Salesforce usa para contextos async. Funcional pero opaco. En V2 el OwnerId refleja el estado real del ciclo:",
        },
        {
          type: "table",
          headers: ["Estado", "OwnerId", "Comportamiento del bot"],
          rows: [
            ["Conversación fresh, sin sesión Agentforce guardada", "Automated Process (compat V1)", "Bot procesa mensajes normalmente"],
            ["Bot atendiendo (sesión Agentforce activa)", "Bot User configurado en Bot_User_Id__c", "Bot procesa mensajes normalmente"],
            ["Escalada a la cola, sin asesor todavía", "Queue (Escalation_Target_Queue_DeveloperName__c)", "Bot bloqueado (gate del InboundEventHandler)"],
            ["Asesor humano aceptó", "User (el que aceptó primero)", "Bot bloqueado. Solo el owner puede responder desde el LWC"],
            ["Cerrada", "Último owner al cerrar", "Bot bloqueado. La conv no aparece en list views activas"],
          ],
        },
        {
          type: "concept",
          title: "El gate del InboundEventHandler",
          peek: "Cómo el sistema decide si el bot puede responder o no.",
          audience: ["developer", "architect"],
          blocks: [
            {
              type: "paragraph",
              text: "Antes de encolar el WhatsAppAgentforceQueueable para responder al mensaje entrante, el InboundEventHandler consulta OwnerId de la conversación. La lógica es sencilla pero tuvo dos iteraciones importantes durante el desarrollo:",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "V1 del gate — no existía. El bot respondía siempre.",
                "V2 primera iteración — 'si OwnerId es un User que no sea Automated Process, saltar bot'. Falló porque el Bot User configurado (UserType=Standard) era interpretado como humano y bloqueaba al bot con sus propias conversaciones.",
                "V2 final — 'si OwnerId es un User que NO sea Automated Process, NO sea EinsteinAgent, Y NO sea el Bot_User_Id__c configurado en la Configuration, entonces bloquear'. El bot user configurado es whitelist explícita.",
              ],
            },
            {
              type: "callout",
              tone: "note",
              title: "Detalle técnico del comparador",
              text: "El comparador contra Bot_User_Id__c usa startsWith(substring(0,15)) para tolerar tanto Ids de 15 como de 18 caracteres. Salesforce puede devolver cualquiera de los dos formatos según el contexto.",
            },
          ],
        },
        {
          type: "concept",
          title: "Bot User setup",
          peek: "Qué usuario poner en Bot_User_Id__c y qué permisos necesita.",
          audience: ["admin", "developer"],
          blocks: [
            {
              type: "paragraph",
              text: "El Bot User es el usuario bajo cuya identidad corre Agentforce cuando invoca acciones Apex. Se descubre haciendo query al metadata del Bot (BotDefinition tiene un campo botUser con el username). Ese user necesita permisos amplios pero acotados:",
            },
            {
              type: "list",
              items: [
                "Apex class access — a WhatsAppEscalateAction y todas las clases que ésta invoca (WhatsAppConfigService, WhatsAppLogService, WhatsAppAPIService, WhatsAppConstants).",
                "Object CRUD — Case (Create/Read/Edit), WhatsApp_Conversation__c (Read/Edit con viewAll), WhatsApp_Log__c (Create), Contact (Read).",
                "FLS — todos los campos de handoff en WhatsApp_Configuration__c (los 9 nuevos) + Agentforce_Session_Id__c y Idle_Expiry_Time__c en WhatsApp_Conversation__c.",
                "No requiere viewAllRecords sobre Account/Contact — la licencia Einstein Agent la rechaza y con record sharing normal alcanza.",
              ],
            },
            {
              type: "callout",
              tone: "warning",
              title: "Fallback defensivo por si el bot user no ve el Contact",
              text: "En algunos orgs, aunque el Permission Set le da Read sobre Contact, el sharing model bloquea el registro específico que el Case referencia. WhatsAppEscalateAction intercepta el INSUFFICIENT_ACCESS_ON_CROSS_REFERENCE_ENTITY y reintenta el insert de Case SIN ContactId, loggeando ESCALATE_CASE_RETRY_NO_CONTACT como warning. El escalamiento se completa; el humano puede vincular el Contact manualmente después.",
            },
          ],
        },
      ],
    },
    {
      id: "timeout-scheduler",
      eyebrow: "Cierre automático",
      title: "El scheduler que cierra conversaciones inactivas",
      peek: "Cada 5 minutos revisa y cierra lo que pasó el timeout. Timeouts distintos para bot y humano.",
      defaultOpen: false,
      blocks: [
        {
          type: "paragraph",
          text: "En cualquier canal conversacional, la mayor deuda operativa son las conversaciones que nadie cierra. El cliente se olvida, el asesor pasa a otra cosa, la conversación queda en 'Active' para siempre. El scheduler resuelve eso con un contrato simple: cada mensaje empuja hacia adelante el Idle_Expiry_Time__c; si nadie escribe, el scheduler la cierra.",
        },
        {
          type: "pipeline",
          title: "Cómo funciona el ciclo",
          steps: [
            {
              component: "Cliente o humano manda mensaje",
              action: "InboundEventHandler o SendMessageQueueable llama a WhatsAppConversationService.updateConversationOnMessage",
            },
            {
              component: "updateConversationOnMessage",
              action: "Consulta config para saber el timeout aplicable según owner actual",
            },
            {
              component: "Idle_Expiry_Time__c",
              action: "Se actualiza a NOW() + timeout aplicable (bot o humano)",
              note: "Solo si Handoff_Enabled__c=true en la config",
            },
            {
              component: "WhatsAppTimeoutScheduler (cada 5 min)",
              action: "Query: SELECT Id FROM WhatsApp_Conversation__c WHERE Idle_Expiry_Time__c < NOW() AND Status__c != 'Closed'",
            },
            {
              component: "WhatsAppTimeoutQueueable",
              action: "Para cada conversación encontrada: Status = Closed, Agentforce_Session_Id__c = null, publish event al LWC",
              note: "Cierre silencioso — no manda mensaje al cliente por default",
            },
          ],
        },
        {
          type: "concept",
          title: "12 jobs paralelos, uno por slot de 5 min",
          peek: "Por qué el scheduler necesita 12 CronTriggers en vez de uno solo.",
          audience: ["developer", "architect"],
          blocks: [
            {
              type: "paragraph",
              text: "Salesforce Schedulable no soporta granularidad menor que 1 hora en un solo trigger. La solución estándar es programar 12 CronTriggers, uno por cada slot de 5 min dentro de la hora: 0, 5, 10, ..., 55. Todos ejecutan la misma clase (WhatsAppTimeoutScheduler). Efecto neto: scan cada 5 min, 288 veces al día.",
            },
            {
              type: "callout",
              tone: "info",
              title: "scripts/apex/schedule-timeout-scanner.apex (extracto)",
              text: "List<Integer> minuteSlots = new List<Integer>{ 0, 5, 10, ..., 55 };\nfor (Integer min : minuteSlots) {\n    String jobName = 'WhatsApp Timeout Scanner - ' + ...;\n    String cronExpr = '0 ' + min + ' * * * ?';\n    System.schedule(jobName, cronExpr, new WhatsAppTimeoutScheduler());\n}",
            },
            {
              type: "callout",
              tone: "info",
              title: "Cancelar",
              text: "El script scripts/apex/cancel-timeout-scanner.apex hace lo inverso: query CronTrigger WHERE Name LIKE 'WhatsApp Timeout Scanner%' y System.abortJob para cada uno.",
            },
          ],
        },
      ],
    },
    {
      id: "agentforce-integration",
      eyebrow: "Agentforce",
      title: "Cómo se enlaza la GenAiFunction con el Apex",
      peek: "3 piezas: la GenAiFunction FDE_afEscalateToHuman, la Context Variable conversationId y las instrucciones del topic.",
      defaultOpen: false,
      blocks: [
        {
          type: "paragraph",
          text: "Que el agente pueda 'invocar' la acción de escalar depende de 3 elementos coordinados. Uno solo mal configurado y la acción no dispara, aunque el LLM entienda perfectamente la intención del cliente.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "GenAiFunction FDE_afEscalateToHuman — declara los inputs/outputs y apunta a WhatsAppEscalateAction como invocationTarget=apex. Vive versionada en el repo (force-app/main/default/genAiFunctions/FDE_afEscalateToHuman/).",
            "Context Variable conversationId — variable custom del bot, tipo Text. CRÍTICO: debe tener 'Allow value to be set by API' activo (visibility=external). Sin ese flag, cuando Apex inyecta el conversationId al crear la sesión, Salesforce responde HTTP 400 con InternalVariableMutationAttemptException.",
            "Instrucciones del topic — texto imperativo en las Reasoning Instructions del topic 'Escalamiento a asesor humano'. Debe forzar la invocación ('DEBES invocar la acción antes de responder al cliente'), mapear inputs explícitamente ('conversationId = {!$Context.conversationId}'), y prohibir textos de despedida pre-escritos que hacen que el LLM produzca la respuesta sin invocar.",
          ],
        },
        {
          type: "concept",
          title: "Cómo pasa Apex el conversationId al bot",
          peek: "El payload que le manda al Agent Runtime API.",
          audience: ["developer", "architect"],
          blocks: [
            {
              type: "paragraph",
              text: "Cuando WhatsAppAgentforceService.createAgentSession() llama al Agent Runtime, además del externalSessionKey y el instanceConfig manda un array variables con el conversationId. Esto se activa solo cuando la constante INJECT_CONVERSATION_ID_VAR está en true.",
            },
            {
              type: "callout",
              tone: "info",
              title: "WhatsAppAgentforceService.cls (extracto)",
              text: "Map<String, Object> requestBody = new Map<String, Object>{\n    'externalSessionKey' => generateSessionKey(),\n    'instanceConfig' => new Map<String, Object>{ 'endpoint' => instanceUrl },\n    'bypassUser' => true\n};\n\nfinal Boolean INJECT_CONVERSATION_ID_VAR = true;\nif (INJECT_CONVERSATION_ID_VAR && conversationId != null) {\n    requestBody.put('variables', new List<Object>{\n        new Map<String, Object>{\n            'name' => 'conversationId',\n            'type' => 'Text',\n            'value' => String.valueOf(conversationId)\n        }\n    });\n}",
            },
            {
              type: "callout",
              tone: "warning",
              title: "El orden importa",
              text: "El flag INJECT_CONVERSATION_ID_VAR debe estar en false hasta que la Context Variable conversationId exista en la versión ACTIVA del bot. Si se activa el flag antes, cada creación de sesión falla y el bot responde con el fallback textual local. Aprendimos esto en producción — está documentado en la sección 'Learned the hard way'.",
            },
          ],
        },
      ],
    },
    {
      id: "attachments-lifecycle",
      eyebrow: "Adjuntos",
      title: "Vincular archivos al Case en ambas direcciones",
      peek: "Dos acciones invocables Apex complementarias — una forward, una backfill.",
      defaultOpen: false,
      blocks: [
        {
          type: "paragraph",
          text: "En V1, cuando el cliente mandaba un archivo, éste quedaba vinculado al WhatsApp_Message__c vía ContentDocumentLink. Pero si después alguien creaba un Case relacionado a esa conversación, los adjuntos no aparecían en el Case. Y viceversa: si el Case ya existía cuando llegaba un archivo nuevo, tampoco se vinculaba automáticamente. La V2 cierra ambos huecos con dos acciones invocables complementarias.",
        },
        {
          type: "table",
          headers: ["Cuándo se dispara", "Acción", "Input", "Efecto"],
          rows: [
            ["Llega un archivo nuevo por WhatsApp", "FDE_LinkDocumentToWhatsAppEntities", "ContentDocumentId", "Sube desde el Message hasta la Conversation, y si hay Case, también lo enlaza al Case"],
            ["Se crea Case y se vincula a la Conversation", "FDE_BackfillDocumentsToCase", "conversationId + caseId", "Busca todos los WhatsApp_Media__c históricos con ContentDocumentId poblado y los enlaza al Case y a la Conversation (por completitud)"],
          ],
        },
        {
          type: "concept",
          title: "Por qué WhatsApp_Media__c y no WhatsApp_Message__c como fuente",
          peek: "El modelo de datos permite un camino más limpio.",
          audience: ["developer"],
          blocks: [
            {
              type: "paragraph",
              text: "Cada mensaje con media tiene un WhatsApp_Media__c child. Ese objeto guarda directamente el ContentDocumentId__c cuando el archivo se termina de descargar. Buscar por WhatsApp_Media__c.Message__r.Conversation__c es una sola relación, sin necesidad de filtrar por Message_Type__c (que podría dejar afuera tipos raros como stickers o reactions). Además, filtrar por ContentDocumentId__c IS NOT NULL descarta automáticamente los mensajes que aún se están descargando.",
            },
          ],
        },
        {
          type: "concept",
          title: "Idempotencia",
          peek: "Cómo no crear ContentDocumentLinks duplicados si el flow corre dos veces.",
          audience: ["developer"],
          blocks: [
            {
              type: "paragraph",
              text: "Ambas acciones hacen bulk query de los ContentDocumentLinks existentes (Conv + Case) antes de decidir qué insertar. Comparan el par (ContentDocumentId, LinkedEntityId) contra un Set de keys. Si ya existe, skip silencioso. Si no, insert con Database.insert(list, false) para partial success — un fallo en un link no bloquea los demás.",
            },
          ],
        },
      ],
    },
    {
      id: "contact-auto-link",
      eyebrow: "Contact",
      title: "Persistir el Contact identificado en la conversación",
      peek: "Después de que el agente resuelve el Contact, una acción invocable lo pega en WhatsApp_Conversation__c.Contact__c.",
      defaultOpen: false,
      blocks: [
        {
          type: "paragraph",
          text: "Corona ya tenía COR_afIdentifyTheContactByEmail — un flow que hace lookup del Contact por correo + código SAP. El agente lo llama y obtiene el ContactId. Pero ese Id se usaba solo en memoria durante la sesión del bot; nadie lo persistía en WhatsApp_Conversation__c.Contact__c. Consecuencia: al día siguiente, si alguien abría la conversación en Salesforce, no sabía quién era el cliente sin re-parsear los mensajes.",
        },
        {
          type: "paragraph",
          text: "La V2 agrega FDE_LinkContactToConversation — una acción invocable independiente que respeta el trabajo previo del equipo COR y solo hace el 'último kilómetro': recibe el ContactId y el conversationId, y actualiza el campo Contact__c en la conversación si estaba vacío. Si ya había Contact vinculado, respeta el existente sin sobrescribir.",
        },
        {
          type: "callout",
          tone: "info",
          title: "FDE_LinkContactToConversation.cls (comportamiento)",
          text: "// Skip silencioso si el Contact ya existe\nif (conv.Contact__c != null) {\n    r.success = true;\n    r.wasUpdated = false;\n    continue;\n}\n\n// Solo escribe si el campo está vacío\nconvsToUpdate.add(new WhatsApp_Conversation__c(\n    Id = convId,\n    Contact__c = contactId\n));",
        },
        {
          type: "callout",
          tone: "info",
          title: "Inputs como String, no Id",
          text: "Los inputs de la acción son String, no Id, porque Agentforce Studio no permite mapear Context Variables (tipo Text) a inputs de tipo Id directamente. Internamente la Apex hace cast con try/catch para reportar Ids inválidos como error de request específico sin bloquear los otros.",
        },
      ],
    },
    {
      id: "lwc-experience",
      eyebrow: "UI",
      title: "Un LWC compartido que sirve al dashboard y al record page",
      peek: "Refactor en 2 wrappers para reusar el mismo chat en ambos contextos.",
      defaultOpen: false,
      blocks: [
        {
          type: "paragraph",
          text: "En V1 el chat de conversaciones vivía dentro de whatsappConversationPanel (el dashboard). Para poner el mismo chat en el record page de WhatsApp_Conversation__c sin duplicar código, la V2 hizo un refactor: extrae el chat a whatsappConversationChat (child, recibe conversationId como @api) y crea 2 wrappers finos que lo consumen.",
        },
        {
          type: "table",
          headers: ["LWC", "Rol", "Dónde vive"],
          rows: [
            ["whatsappConversationChat", "Child. Contiene toda la lógica del chat (mensajes, input, botones Aceptar/Cerrar, empApi refresh, hyperlink al record).", "Interno — usado por los wrappers"],
            ["whatsappConversationPanel", "Wrapper del dashboard. Sidebar de conversaciones + chat delegado al child.", "Tab Conversations del whatsappDashboard"],
            ["whatsappConversationRecord", "Wrapper del record page. Sólo pasa el recordId al child.", "App Builder → Record Page de WhatsApp_Conversation__c"],
            ["whatsappAdminSettings", "Tab de administración. Custom Permission gate, form de 9 campos, dropdown de queues.", "Tab Administración del whatsappDashboard"],
            ["whatsappDashboard", "Padre. 5 tabs: Configurations, Conversations (default), Templates, Analytics, Administración (gated).", "App WhatsApp Dashboard"],
          ],
        },
        {
          type: "concept",
          title: "Elementos nuevos en la UI del chat",
          peek: "Owner visible, botones contextuales, refresh en vivo.",
          audience: ["admin", "developer"],
          blocks: [
            {
              type: "list",
              items: [
                "Header muestra Owner con ícono según tipo (utility:user, utility:groups, utility:info) y badges 'En cola' o 'Tú' según corresponda.",
                "Hyperlink CONV-XXXX al lado del nombre del cliente — abre el record page como tab del workspace en Console App, o en misma pestaña en Standard App. Se oculta cuando el LWC ya está EN el record page.",
                "Botón Aceptar visible sólo si Owner.Type=Queue.",
                "Botón Cerrar visible cuando la conversación no está cerrada.",
                "Input de mensaje deshabilitado si no eres el owner, con banner explicativo ('Esta conversación está asignada a X. Solo el owner puede responder').",
                "Suscripción empApi a /event/WhatsApp_Message_Notification__e para refresh en vivo del chat y de la lista de conversaciones.",
                "Botón manual de refresh como fallback si empApi falla.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "migration-from-v1",
      eyebrow: "Migración",
      title: "Cómo pasar una línea de V1 a V2 sin romper nada",
      peek: "6 pasos ordenados. Cero downtime.",
      defaultOpen: false,
      blocks: [
        {
          type: "paragraph",
          text: "La V2 fue diseñada para ser opt-in por línea. El código y la metadata se despliegan sin activar nada. La línea sigue comportándose como V1 hasta que el admin prende el checkbox. Este es el orden seguro:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Deploy de código y metadata — 9 campos nuevos en Configuration, campo Idle_Expiry_Time__c en Conversation, Custom Permission, Custom Notification Type, Platform Event, 3 clases Apex nuevas (WhatsAppEscalateAction extendido, WhatsAppTimeoutScheduler, WhatsAppTimeoutQueueable), 3 acciones invocables FDE_*, 3 LWCs (whatsappAdminSettings, whatsappConversationChat, whatsappConversationRecord) + modificaciones a los existentes. Handoff_Enabled__c queda en false por default.",
            "Configuración del Bot User — encontrar el Bot User del planner (query a User WHERE Username LIKE 'cor_afagent%' o similar), asignarle el Permission Set WhatsApp_Agent extendido (con Contact Read, Case CRUD, y los nuevos campos FLS).",
            "Configuración de la Queue destino — crear la Queue con WhatsApp_Conversation__c y Case como sobject types, agregar miembros users.",
            "Configuración del Agentforce Studio — crear la Context Variable custom conversationId (tipo Text) en el bot, ACTIVAR 'Allow value to be set by API', crear el topic 'Escalamiento a asesor humano' con FDE_afEscalateToHuman asignada y las Reasoning Instructions imperativas, publicar nueva versión del bot y activarla.",
            "Llenar la configuración de la línea — en el tab Administración del LWC, o directamente en el registro de WhatsApp_Configuration__c, poblar los 9 campos: Bot_User_Id__c con el Id del bot user, Handoff_Enabled__c en TRUE, Queue DeveloperName, checkbox de crear Case, mensajes, timeouts.",
            "Activar el Timeout Scheduler — ejecutar scripts/apex/schedule-timeout-scanner.apex una sola vez. Programa 12 jobs paralelos que ya no necesitan atención.",
          ],
        },
        {
          type: "callout",
          tone: "success",
          title: "Rollback",
          text: "Si algo se comporta raro, destildar Handoff_Enabled__c en la config de la línea. Todo el código nuevo se salta y la línea vuelve al comportamiento V1 instantáneamente. Sin redeploy.",
        },
      ],
    },
    {
      id: "learned-the-hard-way",
      eyebrow: "Lo aprendimos peleando",
      title: "Los golpes en la cabeza que valieron la lección",
      peek: "Confesión honesta de los issues que encontramos durante el desarrollo y cómo los resolvimos. Léelo antes de implementar en otro cliente.",
      defaultOpen: false,
      blocks: [
        {
          type: "paragraph",
          text: "Esta sección existe para que quien implemente esto en otro cliente sepa los tropezones antes de encontrarlos. Cada uno de estos issues nos costó tiempo y confusión. Los documentamos con detalle porque la mayoría no salen en la documentación oficial de Salesforce.",
        },
        {
          type: "problem",
          symptom: "El deploy del PermissionSet falla con 'The user license doesn't allow the permission: View All Account'.",
          rootCause: "El Bot User tiene licencia Einstein Agent, que restringe viewAllRecords sobre objetos estándar como Account y Contact aunque el Permission Set intente concederlo.",
          impact: "Fix: bajar viewAllRecords=false en el Permission Set. El bot user obtiene Read normal y hereda el sharing del org. En la mayoría de casos alcanza. Si un Case referencia un Contact que el sharing no le comparte al bot, cae al fallback defensivo del EscalateAction.",
        },
        {
          type: "problem",
          symptom: "El agente responde 'te transfiero con un asesor humano' pero el owner de la conversación no cambia y no se crea Case.",
          rootCause: "En 10-15% de los casos, el LLM genera la respuesta textual sin invocar la GenAiFunction. Es el fenómeno de 'grounding failure' documentado en function-calling LLMs. Empeora si el prompt del topic tiene la respuesta pre-escrita como plantilla ('responde con: te transfiero...').",
          impact: "Mitigación: instrucciones imperativas en el topic. 'DEBES invocar la acción antes de responder. Sin invocarla no hay escalamiento. Repetir la despedida sin invocar es un error grave.' Adicionalmente, el humano puede aceptar manualmente desde el LWC como respaldo.",
        },
        {
          type: "problem",
          symptom: "createAgentSession devuelve HTTP 400 con 'InternalVariableMutationAttemptException: 1cvhQ0000...' y el bot cae al fallback textual local.",
          rootCause: "La Context Variable custom conversationId en el Bot fue creada por default como internal/read-only. Cuando Apex intenta setearla vía el array variables del payload, el Agent Runtime API la rechaza.",
          impact: "Fix: en Agentforce Studio → Variables → conversationId → activar 'Allow value to be set by API' (visibility=external), publicar nueva versión del bot y activarla. Sin ese flag, cualquier intento de inyectar la variable destruye la sesión completa.",
        },
        {
          type: "problem",
          symptom: "El insert de Case falla con INSUFFICIENT_ACCESS_ON_CROSS_REFERENCE_ENTITY apuntando a un Contact Id.",
          rootCause: "El Bot User tiene Read sobre Contact pero el sharing model del org no le comparte el Contact específico referenciado. La licencia Einstein Agent no permite viewAllRecords=true sobre Contact.",
          impact: "Fix: WhatsAppEscalateAction intercepta el error específicamente (StatusCode.INSUFFICIENT_ACCESS_ON_CROSS_REFERENCE_ENTITY), loggea ESCALATE_CASE_RETRY_NO_CONTACT como warning, y reintenta el insert de Case SIN ContactId. El escalamiento se completa; el humano vincula el Contact manualmente después.",
        },
        {
          type: "problem",
          symptom: "Después de configurar el Bot User como owner (Bot_User_Id__c en la Config), el bot deja de responder el segundo mensaje de la misma conversación.",
          rootCause: "El gate del InboundEventHandler estaba comparando OwnerId contra AutomatedProcess y EinsteinAgent solamente. El Bot User real (UserType=Standard) caía en 'humano' y el bot se auto-bloqueaba.",
          impact: "Fix: ampliar el gate para reconocer también el Bot_User_Id__c configurado en la Configuration. Comparación startsWith(substring(0,15)) para tolerar Ids de 15 y 18 chars.",
        },
        {
          type: "problem",
          symptom: "Después de deployar la Fase 1 con dry-run, los campos nuevos no existen en la org.",
          rootCause: "sf project deploy start --dry-run valida pero NO persiste metadata. Es una diferencia sutil pero crítica frente a otros comandos que sí muestran el efecto real. El dry-run es solo linting.",
          impact: "Fix: correr el deploy real (sin --dry-run) después del dry-run exitoso. Escribimos un script check-fields.apex para verificar rápidamente qué campos ya existen antes de asumir.",
        },
        {
          type: "problem",
          symptom: "El LWC no refresca en vivo cuando llega un mensaje o cambia el owner, aunque el Platform Event server-side se publica correctamente.",
          rootCause: "Múltiples causas simultáneas: getConversationMessages estaba marcado como cacheable=true (cache del cliente sin invalidar), doble subscribe al empApi (connectedCallback corría 2 veces al cambiar de tab), y el InboundEventHandler no publicaba WhatsApp_Message_Notification__e (solo publicaba WhatsApp_Inbound_Event__e que es PublishAfterCommit).",
          impact: "Fix: quitar cacheable=true del método que trae mensajes, agregar guard contra double-subscribe, y publicar explícitamente WhatsApp_Message_Notification__e en cada mensaje inbound. Además, en cada outbound del ejecutivo desde el LWC.",
        },
        {
          type: "problem",
          symptom: "La campanita del bell no muestra el toast desktop siempre, aunque en el bell tray sí aparece la notificación.",
          rootCause: "Chrome tiene un comportamiento de 'quiet notifications' — si el user desecha muchas notificaciones seguidas del mismo origen, deja de mostrar el toast pero SÍ crea la entrada en el sistema. No es un bug de Salesforce.",
          impact: "No accionable server-side. Documentar que en uso real diario los usuarios verán la campanita bien; solo se pierde el toast después de dozens de repeticiones durante testing.",
        },
        {
          type: "problem",
          symptom: "Los tests de la V2 pasan al 100% en aislamiento, pero al correr RunLocalTests el org-wide coverage está en 53%.",
          rootCause: "El proyecto original tenía deuda técnica preexistente — muchas clases sin tests, tests que fallan por config drift (validation rules, campos que no existen, flows con INVALID_INPUT). No es responsabilidad de la V2, pero sí bloquea el deploy a producción con RunLocalTests.",
          impact: "Fix pendiente: escribir tests adicionales para las 3-5 clases modificadas con menos coverage. Alternativa: usar --tests con selección explícita de los tests de WhatsApp al deployar a producción.",
        },
      ],
    },
    {
      id: "references",
      eyebrow: "Referencias",
      title: "Documentación oficial de las piezas de Salesforce usadas",
      defaultOpen: false,
      blocks: [
        {
          type: "sources",
          items: [
            {
              label: "Agent Runtime API — Start Session",
              url: "https://developer.salesforce.com/docs/einstein/genai/references/agent-api",
            },
            {
              label: "Custom Notifications — Messaging.CustomNotification",
              url: "https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_class_Messaging_CustomNotification.htm",
            },
            {
              label: "Custom Permissions",
              url: "https://help.salesforce.com/s/articleView?id=sf.custom_perms_overview.htm",
            },
            {
              label: "Queues",
              url: "https://help.salesforce.com/s/articleView?id=sf.setting_up_queues.htm",
            },
            {
              label: "Scheduled Apex",
              url: "https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_scheduler.htm",
            },
            {
              label: "empApi Wire Adapter (LWC)",
              url: "https://developer.salesforce.com/docs/component-library/bundle/lightning-emp-api/documentation",
            },
            {
              label: "ContentDocumentLink",
              url: "https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_contentdocumentlink.htm",
            },
            {
              label: "InvocableMethod / InvocableVariable",
              url: "https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_classes_annotation_InvocableMethod.htm",
            },
            {
              label: "GenAiFunction metadata",
              url: "https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_genaifunction.htm",
            },
            {
              label: "Bot metadata — contextVariables",
              url: "https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_bot.htm",
            },
          ],
        },
      ],
    },
  ],
};

const whatsappLightweightInterception: Recipe = {
  slug: "whatsapp-attachments-lightweight-interception",
  title: "Intercepción liviana de adjuntos en WhatsApp + Agentforce — PROTOTIPO",
  problemOneLiner:
    "Cuando el usuario envía un archivo por WhatsApp mid-conversación, Agentforce responde error. Este approach intercepta en el punto sync disponible en el path estándar, sin reemplazar el canal Enhanced.",
  approach: "hybrid",
  tags: [
    "Adjuntos",
    "Agentforce",
    "WhatsApp",
    "Digital Engagement",
    "ContentDocumentLink",
    "Prompt Builder",
    "Prototipo",
  ],
  audiences: ["developer", "architect"],
  author: "Jonathan Gomez",
  authorRole: "Agentforce Enterprise Architect",
  publishedAt: "2026-08-01",
  updatedAt: "2026-08-01",
  readingMinutes: 15,
  hidden: false,
  tldr: [
    "El path estándar Enhanced WhatsApp no expone un hook post-agent — descartado empíricamente después de probar 10 candidatos (ConversationEntry no es triggerable, Message vacío, Sensitive Data Rules son del stack Live Chat legado, no hay 'post-response flow', el Trust Layer no acepta filtros custom, action sequencing es no-determinístico).",
    "El único punto sync-observable en el path estándar es ContentDocumentLink.BEFORE_INSERT cuando LinkedEntityType=MessagingSession — dispara en el AutomatedProcess user context antes de que Agentforce procese el turno con el adjunto.",
    "Desde ese trigger podemos publicar un Platform Event y encolar un Queueable que llama a Prompt Builder (GPT-4o vision para imagen/PDF, Whisper para audio) — todo dentro de Salesforce, sin credenciales externas.",
    "El resultado del análisis se puede escribir en campos custom de MessagingSession (AI_Issue__c, AI_Resolution__c, AI_Summary__c ya existen en la org Laila) o inyectar como mensaje sintético al canal.",
    "Prototipo no verificado — falta construir y probar el pipeline completo. El write-back al canal (cómo entregar el mensaje sintético al usuario) es la parte más incierta.",
  ],
  sections: [
    {
      id: "status-warning",
      eyebrow: "Estado — actualizado 2026-08-01",
      title: "Diagnóstico definitivo — approach NO viable en el path estándar",
      defaultOpen: true,
      blocks: [
        {
          type: "callout",
          tone: "critical",
          title: "Este approach NO es implementable con el path estándar Enhanced WhatsApp",
          text: "Update 2026-08-01: después de probar empíricamente 10+ hipótesis de write-back en la org Laila (incluidas 4 rutas técnicas específicas: LiveChatSensitiveDataRule, ConnectApi.EnhancedMessaging, ConvMessageSendRequest, y ConversationEntry DML insert con ActorType=Bot y ActorType=EndUser), se confirma que NO existe una API pública Apex/REST/Metadata para inyectar mensajes al canal Enhanced desde afuera del agente. El punto de detección (CDL BEFORE_INSERT) funciona, pero no hay canal outbound utilizable. Las únicas rutas viables son: (a) Flex Prompt Template + acción custom para imagen/PDF, (b) bypass total Corona-style (ver whatsappAttachmentsCustom / whatsappV2Handoff), (c) BYOC (reemplazar el canal Enhanced por uno custom). Esta receta se conserva como diagnóstico con evidencia empírica reproducible.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Qué sí sirvió del research",
          text: "Confirmamos que aiplatform.ModelsAPI funciona (GPT-4o texto con Trust Layer aplicado). Descubrimos que AutomatedProcess es el user que ejecuta el pipeline Enhanced Messaging — crítico para debugging futuro. Mapeamos los 10 candidatos de intercepción con evidencia de por qué cada uno falla. Estos aprendizajes son reusables para futuros research de messaging.",
        },
      ],
    },
    {
      id: "problem",
      eyebrow: "El problema, otra vez",
      title: "Por qué las dos opciones anteriores no cierran el caso",
      defaultOpen: true,
      blocks: [
        {
          type: "problem",
          symptom:
            "El usuario envía un archivo por WhatsApp mid-conversación. Agentforce responde 'no pude procesar el archivo' o similar. Las dos primeras 'soluciones' probadas (instruir al agente para omitir el error, o reemplazar todo el canal con webhook custom) tienen problemas: la primera es no-determinística, la segunda es cara.",
          rootCause:
            "En Enhanced WhatsApp, ConversationEntry vive off-platform y el campo Message está vacío en 100% de los registros consultables. El texto del agente nunca es visible on-platform. Ver hallazgos empíricos.",
          impact:
            "Cualquier caso donde el cliente adjunta evidencia (comprobantes, fotos, notas de voz) durante una conversación activa queda bloqueado.",
        },
      ],
    },
    {
      id: "empirical-findings",
      eyebrow: "Hallazgos empíricos",
      title: "Qué encontramos el 2026-08-01 desplegando triggers de solo-debug",
      defaultOpen: true,
      blocks: [
        {
          type: "paragraph",
          text: "El 2026-08-01 se desplegaron 3 triggers de solo-debug en la org Laila (jgr@laila.demo) para mapear qué objetos disparan y bajo qué user context durante flujos reales de WhatsApp. La tabla siguiente resume la matriz observada.",
        },
        {
          type: "table",
          headers: [
            "Objeto",
            "Triggerable en describe",
            "Dispara en test real",
            "User context observado",
            "Utilidad",
          ],
          rows: [
            [
              "ConversationEntry",
              "false",
              "N/A",
              "N/A",
              "Descartado — no permite trigger. Field 'Message' además está siempre vacío.",
            ],
            [
              "MessagingSession",
              "true",
              "Sí — insert + updates de Status/Owner",
              "AutomatedProcess (05K...002DT8JYAW)",
              "Útil para reaccionar a cambios de sesión, no a turnos individuales.",
            ],
            [
              "MessagingEndUser",
              "true",
              "No en este test (MEU pre-existente)",
              "N/A",
              "Dispararía solo en primer contacto de un teléfono nuevo.",
            ],
            [
              "ContentDocumentLink",
              "true",
              "Sí — BEFORE_INSERT sync con LinkedEntityType=MessagingSession",
              "AutomatedProcess",
              "PUNTO DE INTERCEPCIÓN CLAVE.",
            ],
          ],
        },
        {
          type: "codeRef",
          name: "JGR_ExperimentB_ContentDocumentLink",
          kind: "trigger",
          purpose:
            "Trigger de solo-debug que confirmó empíricamente que ContentDocumentLink.BEFORE_INSERT dispara sync con LinkedEntityType=MessagingSession cuando llega un archivo por WhatsApp. Este es el hook que el approach lightweight explota.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Timeline capturada en el test",
          text: "11:32:51.245 CDL BEFORE_INSERT — Doc 069KY00000GY97ZYAT linked a MessagingSession 0MwKY000001t4nq0AA. La sesión ya estaba Active desde 11:31:39 (bot procesando). El archivo se enlazó a la sesión existente 72 segundos después de que empezó. Nuestro código correría antes de que Agentforce procese el turno con ese adjunto.",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Lo que NO pudimos observar",
          text: "El texto de la respuesta del agente ('no pude procesar el archivo') nunca aparece on-platform. Los ConversationEntry de la sesión de hoy no fueron consultables ni siquiera post-cierre en la ventana del test — los últimos consultables eran de febrero 2026. Cualquier estrategia de 'leer lo que dijo el agente para reemplazarlo' es inviable.",
        },
      ],
    },
    {
      id: "poc-attempts",
      eyebrow: "Intentos de PoC 2026-08-01",
      title: "Qué probamos después del mapeo — y qué falló",
      defaultOpen: true,
      blocks: [
        {
          type: "paragraph",
          text: "Con el punto de detección (CDL BEFORE_INSERT) confirmado, la pregunta abierta era: ¿cómo hacemos write-back al canal para entregar un texto útil al usuario? Se probaron 4 rutas concretas en Apex ejecutado directamente contra la org.",
        },
        {
          type: "table",
          headers: ["Ruta probada", "Comportamiento observado", "Veredicto"],
          rows: [
            [
              "aiplatform.ModelsAPI.createChatGenerations con content multi-part (image_url embed base64)",
              "El wrapper Apex rechaza content como JSON serializado — sólo acepta String plano. Sin API multimodal en la clase nativa.",
              "Descartado — para imagen se requiere Flex Prompt Template invocado con ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate. Texto sí funciona (respuesta real de GPT-4o obtenida).",
            ],
            [
              "Insert ConversationEntry con ActorType=Bot, Message poblado, MessageStatus=Sent",
              "DML success. Registro persiste (Id 0ZyKY000009QuNB0A0). Pero MessageStatusCode=null, MessageSendTime=null, MessageDeliverTime=null. El usuario NO recibe el mensaje por WhatsApp.",
              "Descartado — el registro es cosmético, no dispara pipeline outbound a Meta.",
            ],
            [
              "Insert ConversationEntry con ActorType=EndUser (imitando el approach Corona de 'turno sintético del usuario')",
              "DML success (Id 0ZyKY000009QuNG0A0). Se probó en una sesión ACTIVA de WhatsApp. El bot NO reaccionó al insert. Los contadores EndUserMessageCount/AgentMessageCount no cambiaron. Cero notificación al usuario, cero turno de Agentforce.",
              "Descartado — el pipeline inbound del agente vive off-platform. Insertar CE on-platform no lo activa.",
            ],
            [
              "ConvMessageSendRequest — probable candidato por nombre",
              "createable=false, updateable=false. TODOS los fields con create=false. Es read-only para clientes.",
              "Descartado — es un log del sistema, no un vector de write-back.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "critical",
          title: "El bloqueante definitivo",
          text: "No existe una API pública Apex/REST/Metadata para inyectar mensajes al canal Enhanced desde afuera del agente. El agente de Agentforce es el único emisor válido hacia Meta. Todo lo demás son registros contables que Salesforce persiste pero no propaga al pipeline off-platform. La única vía oficial para tener control outbound arbitrario es BYOC (reemplazar el canal Enhanced por uno custom con Interaction Service APIs).",
        },
        {
          type: "callout",
          tone: "note",
          title: "Nota sobre el bot Valeria en la org Laila",
          text: "Como camino alternativo se consideró modificar el bot para leer un campo custom de MessagingSession (por ejemplo AI_Summary__c) como Context Variable. Requiere editar el botVersion metadata, agregar la contextVariable, redeployar, y modificar el role prompt. Es factible pero regresa al problema del no-determinismo del LLM (la instrucción 'usa AI_Summary si está poblado' es una instrucción de prompt, no un contrato duro). Este approach queda documentado como opción para ejercicio futuro con expectativas ajustadas.",
        },
      ],
    },
    {
      id: "descartados",
      eyebrow: "Opciones descartadas",
      title: "10 candidatos evaluados antes de aterrizar en CDL",
      defaultOpen: false,
      blocks: [
        {
          type: "paragraph",
          text: "Antes de aterrizar en CDL, se evaluaron 10 candidatos de intercepción. La siguiente tabla documenta por qué se descartaron con fuente autoritativa.",
        },
        {
          type: "table",
          headers: ["Candidato", "Por qué se descartó", "Fuente"],
          rows: [
            [
              "Trigger before/after sobre ConversationEntry",
              "triggerable=false en describe de la org. Además Message vacío en 100% de registros consultables (2010 revisados).",
              "Object Reference v67 + describe empírico en jgr@laila.demo",
            ],
            [
              "Platform Event ConversationEvent como mutador",
              "Los subscribers Apex son observadores post-commit, nunca mutadores.",
              "Platform Events Developer Guide",
            ],
            [
              "Omni-Channel 'Post-Response Flow'",
              "No existe. El único outbound flow documentado es del programa BYOC para escalación humano-agente, no interceptación de contenido.",
              "developer.salesforce.com/docs/service/messaging-partner",
            ],
            [
              "LiveChatSensitiveDataRule con Replace",
              "Es del stack Live Chat legado. No hay MessagingChannelSensitiveDataRule en Enhanced.",
              "Object Reference Summer '26",
            ],
            [
              "Einstein Trust Layer custom filters",
              "Trust Layer es managed por Salesforce, sin extension points públicos.",
              "Agentforce Developer Guide",
            ],
            [
              "Agentforce Guardrails post-response",
              "Los guardrails son controles de diseño (Topic Scope, instructions, filters, Instruction Adherence), no runtime callbacks.",
              "Trailhead — Understanding Agentforce Guardrails and Trust Patterns",
            ],
            [
              "Composite Invocable Action forzada por prompt",
              "Action sequencing es explícitamente no-determinístico. Además output no se emite verbatim — Atlas reformula.",
              "Salesforce Developer Blog 29-jul-2025",
            ],
            [
              "Trigger MessagingSession before/after update para leer Message",
              "Dispara pero MessagingSession no expone texto del turno — solo cambia Status/Owner/counters.",
              "Empírico 2026-08-01",
            ],
            [
              "MessagingEndUser trigger",
              "Solo dispara en primer contacto de un teléfono nuevo. No sirve mid-conversación.",
              "Empírico 2026-08-01",
            ],
            [
              "ContentDocumentLink after-insert para leer texto del agente",
              "Solo tiene el binario del usuario, no la respuesta del agente. Sirve para intercepción proactiva del adjunto entrante, no para reescribir salida del agente.",
              "Empírico 2026-08-01",
            ],
          ],
        },
      ],
    },
    {
      id: "architecture-hypothesis",
      eyebrow: "Arquitectura propuesta",
      title: "Cómo se vería el pipeline si se construyera (HIPÓTESIS)",
      defaultOpen: true,
      blocks: [
        {
          type: "callout",
          tone: "warning",
          title: "Diseño propuesto",
          text: "Todo lo siguiente es diseño propuesto, NO implementado ni probado.",
        },
        {
          type: "architecture",
          title: "Pipeline lightweight — sin reemplazar el canal Enhanced",
          diagram: `
Meta Cloud API  ──►  Enhanced WhatsApp Channel  (path estándar, sin cambios)
                              │
                              ▼
                     ContentDocument creado  (por AutomatedProcess)
                              │
                              ▼
                     ContentDocumentLink insert
                     (LinkedEntityType=MessagingSession)
                              │
                              ▼   [TRIGGER ANTES DE QUE AGENTFORCE PROCESE EL TURNO]
        WhatsApp_MediaIntercept_Event__e publica  (Platform Event)
                              │
                              ▼
                     WhatsApp_MediaProcess_Queueable
                              │
                              ▼
                     ConnectApi.EinsteinLLM.generateMessages
                     (Prompt Template: WhatsApp_Image_Analysis o similar,
                      GPT-4o vision / Whisper — todo dentro de Salesforce)
                              │
                              ▼
                     Update MessagingSession.AI_Summary__c
                              │
                              ▼
                     [PENDIENTE: cómo hacer que Agentforce vea el resumen
                      antes de responder, o cómo enviar mensaje sintético
                      al usuario]
`,
          legend: [
            {
              label: "AutomatedProcess",
              description:
                "User system que Salesforce usa para persistir el flujo de Enhanced Messaging. userId 005KY000002DT8JYAW en la org Laila.",
            },
          ],
        },
      ],
    },
    {
      id: "prompt-builder-in-salesforce",
      eyebrow: "Modelo dentro de la plataforma",
      title: "Todo dentro de Salesforce — Prompt Builder + Trust Layer",
      defaultOpen: false,
      blocks: [
        {
          type: "paragraph",
          text: "Punto de diseño importante — este approach no llama a OpenAI directamente. Prompt Builder de Salesforce ya expone GPT-4o vision (para imágenes y PDFs) y Whisper (para audio) via ConnectApi.EinsteinLLM o via Flow con Prompt Template Action. Trust Layer se aplica automáticamente. Named Credentials no son necesarios para este path.",
        },
        {
          type: "list",
          items: [
            "Prompt Template en Prompt Builder — se crea desde Setup → Einstein → Prompt Builder. Soporta 'Sales Email', 'Field Generation', 'Record Summary', 'Flex' — usaremos Flex para input=file.",
            "Model — se elige entre los conectados a la org via Model Playground. GPT-4o (multimodal) y Whisper son los defaults; también aplican modelos custom si están registrados.",
            "Invocación — desde Apex con ConnectApi.EinsteinLLM.generateMessages, desde Flow con acción 'Get Response from a Prompt Template', o desde otro topic Agentforce.",
            "Costo — se contabiliza contra el consumo de créditos Einstein de la org, no contra billing OpenAI directo.",
          ],
        },
      ],
    },
    {
      id: "components-hipotesis",
      eyebrow: "Componentes",
      title: "Piezas por construir — pendientes",
      defaultOpen: false,
      blocks: [
        {
          type: "list",
          items: [
            "Trigger: WhatsAppMediaInterceptTrigger on ContentDocumentLink (before insert). Detecta LinkedEntityType=MessagingSession, publica Platform Event, retorna sin bloquear.",
            "Platform Event: WhatsApp_MediaIntercept__e con campos ContentDocumentId__c, MessagingSessionId__c, DetectedAt__c.",
            "Apex handler: WhatsAppMediaInterceptHandler — suscrito al PE, encola WhatsAppMediaProcessQueueable.",
            "Apex Queueable: WhatsAppMediaProcessQueueable — descarga ContentVersion, decide tipo (imagen/PDF/audio), invoca Prompt Template via ConnectApi.EinsteinLLM.generateMessages.",
            "Prompt Templates: WhatsApp_Image_Analysis (Flex), WhatsApp_File_Processing (Flex) — same names as Corona receipes for consistency.",
            "Write-back opciones (aún por decidir): (a) update MessagingSession.AI_Summary__c y esperar a que Agentforce lo lea via context vars, (b) ConnectApi.EnhancedMessaging.sendMessage para inyectar mensaje sintético directamente al canal, (c) publicar otro PE que dispare un Flow que escale al agente humano.",
          ],
        },
      ],
    },
    {
      id: "tradeoffs-vs-corona",
      eyebrow: "Comparativa",
      title: "Lightweight vs bypass completo Corona",
      defaultOpen: true,
      blocks: [
        {
          type: "comparison",
          standardLabel: "Corona (bypass completo)",
          customLabel: "Lightweight interception (este approach)",
          rows: [
            {
              dimension: "Cambios al canal",
              standard:
                "Reemplaza Enhanced WhatsApp Channel con webhook + Meta directo",
              custom: "Ninguno — sigue usando Enhanced Channel",
            },
            {
              dimension: "Componentes construidos",
              standard:
                "6 objetos custom + ~30 Apex classes + 4 Flows + 2 Platform Events",
              custom:
                "1 trigger + 1 Platform Event + 1 Apex handler + 1 Queueable + 2 Prompt Templates",
            },
            {
              dimension: "Compatibilidad con Digital Engagement",
              standard: "N/A (bypass)",
              custom: "100% — no interfiere",
            },
            {
              dimension: "Manejo de firma HMAC con Meta",
              standard: "Cliente responsable la maneja",
              custom: "Salesforce la maneja (inalterada)",
            },
            {
              dimension: "Escalación a humano",
              standard: "Custom Apex + custom LWC console",
              custom: "Omni-Channel Flow estándar sigue funcionando",
            },
            {
              dimension: "Rollback",
              standard: "Complejo — desactivar múltiples piezas coordinadas",
              custom: "Simple — desactivar 1 trigger",
            },
            {
              dimension: "Riesgo de romper demos existentes",
              standard: "Alto durante migración",
              custom: "Bajo — no toca el path del agente ni Meta",
            },
            {
              dimension: "Estado",
              standard: "Verificado en producción (Corona)",
              custom: "Prototipo — NO verificado",
            },
            {
              dimension: "Casos que cubre",
              standard:
                "Todos los tipos de adjunto + escalamiento humano avanzado",
              custom:
                "Solo el adjunto entrante — la respuesta del agente sigue siendo la que Atlas decide",
            },
          ],
        },
      ],
    },
    {
      id: "unknowns",
      eyebrow: "Riesgos",
      title: "Preguntas abiertas del prototipo",
      defaultOpen: true,
      blocks: [
        {
          type: "list",
          items: [
            "¿El trigger CDL BEFORE_INSERT tiene tiempo suficiente para publicar el PE antes de que Agentforce procese el turno? La ventana observada es ~milisegundos. Necesita medición empírica en múltiples cargas.",
            "¿Actualizar MessagingSession.AI_Summary__c hace que Agentforce lo vea antes de responder al turno? Depende de si Agentforce refresca contexto entre turnos.",
            "¿Existe API pública para inyectar un mensaje sintético al canal Enhanced sin pasar por el agente? ConnectApi.EnhancedMessaging tiene métodos como sendMessage pero su comportamiento en sesiones con bot activo no está documentado.",
            "¿El AutomatedProcess user tiene los permisos necesarios para publicar Platform Events y hacer callouts internos (ConnectApi.EinsteinLLM)? Probable que sí para PE, dudoso para EinsteinLLM.",
            "¿Latencia total del pipeline (CDL insert → PE → Queueable → Prompt Template → write-back)? Meta espera respuesta rápida — si el pipeline toma >2 seg, el usuario ve el error del agente antes de que llegue el resumen.",
          ],
        },
      ],
    },
    {
      id: "next-steps",
      eyebrow: "Verificación",
      title: "Qué falta antes de marcar esta receta como verificada",
      defaultOpen: true,
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Construir el Trigger + Platform Event + Queueable + Prompt Template en sandbox (no en jgr@laila.demo directo).",
            "Medir latencia end-to-end con 20+ archivos de prueba mixtos (imagen/PDF/audio).",
            "Probar las 3 opciones de write-back y comparar cuál llega al usuario primero.",
            "Si el approach funciona: actualizar esta receta a status 'verified' y documentar la solución final. Si falla: documentar por qué y volver al bypass Corona para casos críticos.",
          ],
        },
      ],
    },
    {
      id: "sources",
      eyebrow: "Fuentes",
      title: "Referencias consultadas",
      defaultOpen: false,
      blocks: [
        {
          type: "sources",
          items: [
            {
              label:
                "ConversationEntry Object Reference — 'Message field is blank in enhanced channels'",
              url: "https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_conversationentry.htm",
            },
            {
              label: "Enhanced Messaging schema off-platform",
              url: "https://developer.salesforce.com/docs/service/messaging-object-model/references/messaging-object-model-conversationEntry/messaging-object-model-conversationentry.html",
            },
            {
              label: "BYOC outbound flow (solo escalación humano)",
              url: "https://developer.salesforce.com/docs/service/messaging-partner/guide/create-agentforce-service-agent.html",
            },
            {
              label:
                "Best practices for building Agentforce Apex Actions (action ordering is non-deterministic)",
              url: "https://developer.salesforce.com/blogs/2025/07/best-practices-for-building-agentforce-apex-actions",
            },
            {
              label: "Understanding Agentforce Guardrails and Trust Patterns",
              url: "https://trailhead.salesforce.com/content/learn/modules/trusted-agentic-ai/explore-agentforce-guardrails-and-trust-patterns",
            },
            {
              label: "ConnectApi.EinsteinLLM (Prompt Builder invocation)",
              url: "https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_ConnectAPI_EinsteinLLM_static_methods.htm",
            },
            {
              label: "LiveChatSensitiveDataRule (legacy Live Chat only)",
              url: "https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_livechatsensitivedatarule.htm",
            },
          ],
        },
      ],
    },
  ],
};

const agentforceVoiceHandoffHumano: Recipe = {
  slug: "agentforce-voice-handoff-humano",
  title: "Handoff a asesor humano en Agentforce Voice — enrutamiento end-to-end desde el bot hasta la cola",
  problemOneLiner:
    "Cuando el bot de Voz llega a su límite, la llamada debe transferirse a un humano sin cortar, sin perder contexto y con enrutamiento por skills.",
  approach: "hybrid",
  tags: [
    "Agentforce Voice",
    "Handoff",
    "OmniChannel",
    "Route Work",
    "Queue",
    "Service Presence",
    "End Action",
    "Contact Center",
    "Amazon Connect",
    "Quick Connect",
    "Transfer to Number",
    "SIP Transfer",
  ],
  audiences: ["admin", "developer", "architect"],
  author: "Jonathan Gomez",
  authorRole: "Agentforce Enterprise Architect",
  publishedAt: "2026-08-05",
  updatedAt: "2026-08-11",
  readingMinutes: 32,
  tldr: [
    "En Agentforce Voice el handoff no es un solo botón: es un contrato entre el .agent (End Action tipo Escalate), un OmniChannelFlow (Route Work) y la operación humana (Service Presence + Queue + Skills).",
    "Existen dos rutas fundamentalmente distintas — no son alternativas del mismo punto: (a) Handoff interno — OmniChannelFlow con Route Work enruta a agent/queue/flow ID dentro de Salesforce. (b) Transferencia externa — el .agent invoca una GenAiFunction → Apex → Toolkit API que setea un contact attribute en Amazon Connect y dispara un Quick Connect cuyo Contact Flow ejecuta el bloque 'Transfer to phone number'.",
    "El OmniChannelFlow no acepta números telefónicos como target (verificado en voice_rest_route_call.htm). El Agent Script DSL v2 no expone un End Action 'TransferToNumber'. La transferencia externa vive en el motor del proveedor de telefonía, no en Salesforce.",
    "El path recomendado por default es OmniChannelFlow — mantiene contexto, skill matching, reporting nativo y warm transfer. Transfer to Number se reserva para overflow legacy, partners externos sin acceso a Salesforce, callbacks específicos o números de emergencia — el contexto no viaja y la VoiceCall se cierra al transferir.",
    "La receta cubre paso a paso ambas rutas — 9 pasos para OmniChannelFlow (Service Presence → Configuration → Queue → Skills → OmniChannelFlow → End Action → prueba → métricas) y 8 pasos para Transfer to Number (verificar service quota AWS → Contact Flow → Quick Connect → habilitación en Queue → Apex invocable → GenAiFunction → activar .agent → prueba end-to-end).",
    "Solo Amazon Connect está verificado end-to-end en docs oficiales. Genesys Cloud CX, NICE CXone y BYOC resuelven Transfer to Number dentro de su propio flow engine — requieren consulta con el partner.",
  ],
  sections: [
    {
      id: "problem",
      eyebrow: "El problema",
      title: "Por qué el handoff en Voz merece receta propia",
      defaultOpen: true,
      blocks: [
        {
          type: "problem",
          symptom:
            "El agente de Voz llega a un punto donde debe transferir. El cliente termina en un beep, la llamada cae al IVR general, o el asesor humano contesta sin ver el registro de la Voice Call ni la transcripción parcial. En algunos casos, la llamada se cuelga silenciosamente porque no hay agente disponible con el skill correcto y no se definió fallback.",
          rootCause:
            "En Agentforce Voice, la escalación es una coreografía de tres piezas que trabajan por separado: (a) el .agent debe declarar el End Action correcto y pasar el contexto adecuado, (b) el OmniChannelFlow debe existir y estar publicado con la lógica de Route Work, (c) la operación humana (Presence Status, Presence Configuration, Queue, Skills, licencias) debe estar lista para aceptar la llamada. Si cualquiera falla, la llamada muere.",
          impact:
            "Sin un handoff limpio, el ROI del agente de Voz colapsa: cada caso que no puede contener genera una segunda llamada del cliente o un ticket manual, más el costo de reputación de cortar la conversación. Además pierde la promesa central del canal: escalación con contexto, no reinicio.",
        },
        {
          type: "callout",
          tone: "note",
          title: "A quién le sirve esta receta",
          text: "Admins que configuran Agentforce Voice por primera vez, developers que deben conectar el .agent con un OmniChannelFlow existente, y arquitectos que necesitan decidir entre OmniChannelFlow vs Transfer to Number para un cliente específico. Cubre la ruta principal (OmniChannelFlow) paso a paso y documenta la alternativa (Transfer to Number) para el caso legacy.",
        },
      ],
    },

    {
      id: "conceptos",
      eyebrow: "Conceptos",
      title: "Las piezas que juegan en un handoff de Voz",
      peek: "Antes del step-by-step: qué es cada pieza, qué hace, y por qué no puedes saltártela.",
      defaultOpen: true,
      blocks: [
        {
          type: "paragraph",
          text: "Un handoff limpio en Agentforce Voice no lo resuelve una sola configuración. Es una cadena de siete piezas — algunas del bot, otras del canal, otras de la operación humana. Si entiendes lo que hace cada una, el step-by-step se vuelve mecánico.",
        },
        {
          type: "concept",
          title: "1. El .agent y el End Action tipo Escalate",
          peek: "El bot no transfiere; declara que quiere transferir. La ejecución vive fuera.",
          blocks: [
            {
              type: "paragraph",
              text: "En Agent Script (DSL v2 de los .agent) existen los End Actions: acciones terminales que un topic puede invocar para cerrar la interacción. Escalate es uno de ellos, y su semántica es única en Voz: no responde texto al cliente y no cierra sesión — le entrega el control al canal (Voice) para que resuelva la transferencia según el routing configurado.",
            },
            {
              type: "list",
              items: [
                "El End Action Escalate se declara en un topic (por ejemplo, 'Escalación a humano') y se ejecuta cuando el planner decide que ese topic aplica.",
                "El .agent puede pasar variables de contexto (intent detectado, sentimiento, campos capturados) que el OmniChannelFlow lee vía CurrentSession o via el Voice Call record.",
                "El mensaje verbatim que se le da al cliente antes de transferir (‘Espera un momento, te estoy transfiriendo con un humano’) NO va en el End Action — va como respuesta previa del bot dentro del mismo turn.",
              ],
            },
            {
              type: "callout",
              tone: "warning",
              title: "El End Action no es opcional",
              text: "Si el bot solamente dice 'te voy a transferir' sin invocar el End Action, la llamada se queda con el bot esperando input del cliente. La transferencia solo ocurre cuando Escalate se ejecuta en el runtime del agente.",
            },
          ],
        },
        {
          type: "concept",
          title: "2. OmniChannelFlow — Route Work",
          peek: "El único lugar donde vive la lógica de enrutamiento: routing type, skills, priority, fallback.",
          audience: ["admin", "developer", "architect"],
          blocks: [
            {
              type: "paragraph",
              text: "Un OmniChannelFlow es un Flow con trigger OmniChannel. Recibe el work item (en Voz, una Voice Call en curso), evalúa condiciones y usa la Route Work action (Standard Action del Flow) para enrutar a un Queue, User o Skill Set. Es el reemplazo moderno de las Routing Configurations manuales.",
            },
            {
              type: "list",
              items: [
                "Routing Type: 'Queue-Based Routing' (más común), 'Skill-Based Routing' (matching por skills), o 'Direct to Agent'.",
                "Priority: número que compite contra otros items en la misma cola. Menor = más urgente.",
                "Fallback: si no hay agente con match en X segundos, se puede rerroutear a otra Queue o notificar. Se implementa con branches del Flow.",
                "Context: el Flow tiene acceso al RecordId de la Voice Call. Desde ahí puede leer transcripción, campos captados por el bot, y datos del Contact/Case relacionado.",
              ],
            },
            {
              type: "callout",
              tone: "info",
              title: "Un solo flow, N agents",
              text: "Un mismo OmniChannelFlow puede ser reutilizado por varios agentes de Voz. La escalación en el .agent lo referencia por API Name. Recomendamos un flow por producto/vertical (ej. 'Voice_Escalate_Proteccion_Familiar'), no uno por agente.",
            },
          ],
        },
        {
          type: "concept",
          title: "3. Service Presence Status",
          peek: "Estados de presencia que declaran qué canales atiende un asesor en cada momento.",
          audience: ["admin"],
          blocks: [
            {
              type: "paragraph",
              text: "Antes de que un asesor pueda recibir una llamada de Voice, necesita un Presence Status habilitado que incluya el Service Channel ‘Voice Call’. Sin eso, aunque esté logueado y en la cola, OmniChannel no le enrutará la llamada porque no la considera 'disponible para Voz'.",
            },
            {
              type: "list",
              items: [
                "Se crean desde Setup → Service Presence Statuses → New.",
                "Cada Status declara qué Service Channels acepta. Para Voz debe incluir el channel ‘sfdc_voice’ (o el custom equivalente si el Contact Center usa uno propio).",
                "Los Presence Statuses se asocian al usuario vía Permission Set — no directamente al User.",
              ],
            },
          ],
        },
        {
          type: "concept",
          title: "4. Presence Configuration",
          peek: "Cuántas conversaciones/llamadas paralelas puede atender un asesor y su Capacity.",
          audience: ["admin"],
          blocks: [
            {
              type: "paragraph",
              text: "La Presence Configuration define la capacidad de un asesor: cuántos work items puede atender simultáneamente y cuánto pesa cada uno. Para Voz, la práctica estándar es capacity 100 con la Voice Call pesando 100 — es decir, mientras está en llamada no recibe nada más.",
            },
            {
              type: "list",
              items: [
                "Setup → Presence Configurations → New.",
                "Capacity total (por default 100). Voice Call debe pesar suficiente para bloquear otras asignaciones mientras habla — típicamente 100.",
                "Asigna Users o Profiles a la Configuration. Los cambios impactan a las próximas asignaciones, no a las activas.",
              ],
            },
          ],
        },
        {
          type: "concept",
          title: "5. Queue con canal Voice Call",
          peek: "La cola destino. Debe tener 'Voice Call' declarado como Supported Object.",
          audience: ["admin"],
          blocks: [
            {
              type: "paragraph",
              text: "Una Queue en Salesforce es un grupo de usuarios que puede recibir work items compartidos. Para que un OmniChannelFlow pueda hacer Route Work → Queue en Voz, la Queue debe declarar 'Voice Call' como Supported Object.",
            },
            {
              type: "list",
              items: [
                "Setup → Queues → New. Nombre visible (Queue_ProteccionFamiliar_Voice), DeveloperName sin espacios, agregar Voice Call en Supported Objects.",
                "Agregar Members: Users individuales, Public Groups, Roles, Roles y Subordinados. Para Voz normalmente son Users individuales del contact center.",
                "Asignar Skills a la Queue si vas a usar Skill-Based Routing (opcional, pero recomendado en operaciones grandes).",
              ],
            },
          ],
        },
        {
          type: "concept",
          title: "6. Skills (opcional pero recomendado)",
          peek: "Etiquetas por asesor que permiten routing por match, no solo por queue.",
          audience: ["admin", "architect"],
          blocks: [
            {
              type: "paragraph",
              text: "Los Skills son etiquetas asignables a Users. En un Skill-Based Routing, el OmniChannelFlow declara los skills requeridos y OmniChannel busca al asesor disponible con match. Es especialmente útil cuando la cola tiene asesores generalistas y especialistas, o cuando el idioma/vertical importa.",
            },
            {
              type: "list",
              items: [
                "Setup → Skills → New. Ejemplos: 'Español', 'Producto Protección Familiar', 'Escalación Nivel 2'.",
                "Asignar skills a los Users desde el registro del User (Related List: Skills).",
                "En el OmniChannelFlow, la Route Work action acepta un input 'Requested Skills' (una List de Skill Ids) y un 'Skill Matching Type' (All / Any).",
              ],
            },
          ],
        },
        {
          type: "concept",
          title: "7. Contact Center y Voice Configuration",
          peek: "El paraguas donde vive todo lo de Voz: número, IVR, integración con proveedor.",
          audience: ["admin", "architect"],
          blocks: [
            {
              type: "paragraph",
              text: "El Contact Center es la unidad organizativa que agrupa toda la configuración de Voz de un tenant: SIP trunk o proveedor (Amazon Connect, Service Cloud Voice provider partner), números asignados, agentes, y la Flow de arranque de llamada. El agente de Voz de Agentforce se despliega dentro de un Contact Center y su handoff termina llegando a asesores del mismo Contact Center.",
            },
            {
              type: "list",
              items: [
                "El Contact Center debe estar creado y activo. Setup → Contact Centers.",
                "Los asesores humanos deben estar asignados al Contact Center para recibir llamadas.",
                "El número asignado al agente de Voz apunta a un Voice Call flow que — en la primera etapa — invoca al bot. Cuando el bot ejecuta End Action Escalate, el mismo canal enruta con el OmniChannelFlow declarado en el agente.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "comparison",
      eyebrow: "Comparativa",
      title: "Handoff interno (OmniChannelFlow) vs transferencia a número externo — no son alternativas del mismo punto",
      peek: "Aclaración crítica: OmniChannelFlow NO transfiere a números externos. Son dos rutas con distintas piezas.",
      defaultOpen: true,
      blocks: [
        {
          type: "callout",
          tone: "critical",
          title: "El error de framing más común",
          text: "Al empezar a diseñar handoff en Agentforce Voice es tentador plantear 'OmniChannelFlow para interno, Transfer to Number para externo' como dos configs alternas del mismo punto. NO lo son. El OmniChannelFlow (Route Work action) solo acepta como target un agent ID, queue ID o flow ID — nunca un número telefónico (verificado en voice_rest_route_call.htm, 2026-08). La transferencia a número externo es una acción del Contact Flow del proveedor de telefonía (Amazon Connect en Service Cloud Voice), no de Salesforce. Requiere una cadena distinta de piezas.",
        },
        {
          type: "comparison",
          standardLabel: "Handoff interno · OmniChannelFlow → Queue/Skill",
          customLabel: "Transferencia externa · Amazon Connect 'Transfer to phone number'",
          rows: [
            {
              dimension: "Dónde vive la lógica de ruteo",
              standard:
                "OmniChannelFlow en Salesforce (Route Work action). Declarativo, visual, con skill matching y branches de fallback.",
              custom:
                "Contact Flow de Amazon Connect (bloque 'Transfer to phone number'). Vive fuera de Salesforce, en la consola del proveedor de telefonía.",
            },
            {
              dimension: "Cómo se dispara desde el .agent",
              standard:
                "End Action tipo Escalate con parameter omniFlowApiName. El runtime de Voice pasa la Voice Call al OmniFlow al ejecutarse.",
              custom:
                "No hay End Action nativo para transferir a número (Agent Script DSL v2, verificado hasta 2026-08). Hay que exponer una GenAiFunction → Apex invocable que llame la Toolkit API de Amazon Connect para setear un contact attribute y disparar un Quick Connect predefinido.",
            },
            {
              dimension: "Destino que acepta",
              standard:
                "Agent ID, Queue ID o Flow ID. Solo destinos dentro de Salesforce.",
              custom:
                "Cualquier número telefónico en formato E.164. Sujeto al service quota de países permitidos en Amazon Connect (allowlist por país).",
            },
            {
              dimension: "Contexto que viaja al destino",
              standard:
                "Completo. Transcripción, Voice Call record, Contact, campos capturados. El asesor humano abre el registro y lo ve todo.",
              custom:
                "Nulo por default. Transcripción y campos capturados NO viajan por SIP. Si el destino es otro Amazon Connect / SF Voice, el contact attribute puede persistir vía CTR sync — cualquier otro caso, el destino recibe la llamada 'a ciegas'.",
            },
            {
              dimension: "Vida de la VoiceCall record",
              standard:
                "Sigue viva. Se reasigna OwnerId al asesor, se puebla IsAcceptedByAgent, TimeToRoute, HoldTime. Reporting nativo cuenta la historia.",
              custom:
                "Se cierra cuando el bot cuelga su rama. En Salesforce solo sobreviven TotalHoldDuration y campos del CTR sync. El leg externo vive en Amazon Connect, no en Salesforce.",
            },
            {
              dimension: "Cold vs warm",
              standard:
                "Warm por naturaleza. El asesor acepta con contexto visible antes de escuchar la llamada.",
              custom:
                "Cold por default. El bloque 'Transfer to phone number' es un bridge inmediato. Warm transfer solo se implementa con Consult desde un softphone humano — no desde el bot.",
            },
            {
              dimension: "Fallback si el destino no contesta",
              standard:
                "Branch del OmniChannelFlow puede rerroutear a otra Queue, mandar notification, o pasar a IVR.",
              custom:
                "Branches nativos del bloque de Amazon Connect: Success | Call Failed | Timeout | Error. La lógica de fallback vive en el Contact Flow del proveedor.",
            },
            {
              dimension: "Proveedores de telefonía soportados",
              standard:
                "Amazon Connect (SCV HVCC) + cualquier Service Cloud Voice partner telephony y Bring Your Own Channel — la Route Work action es agnóstica al proveedor.",
              custom:
                "Amazon Connect verificado end-to-end en docs oficiales. Genesys Cloud CX, NICE CXone y BYOC resuelven la transferencia externa dentro de su propio flow engine — sin path oficial de Salesforce documentado. Verificar con el partner respectivo.",
            },
            {
              dimension: "Casos donde tiene sentido",
              standard:
                "El default. Cualquier caso donde el asesor humano vive en Salesforce y debe ver la conversación del bot.",
              custom:
                "Overflow a IVR legacy, redirección a un partner externo sin acceso a Salesforce, número de emergencia, o cierre de llamada a un número de callback específico del cliente.",
            },
          ],
        },
        {
          type: "callout",
          tone: "success",
          title: "Regla de decisión",
          text: "Por default, handoff interno vía OmniChannelFlow. Solo elige Transfer to Number cuando el destino no puede vivir en Salesforce — típicamente un IVR legacy o un partner externo. Nunca uses Transfer to Number si el contexto de la conversación es importante para el destino; asume que no viaja nada más allá del número del cliente y (si configuras Caller ID) del identificador que declares.",
        },
      ],
    },

    {
      id: "architecture",
      eyebrow: "Arquitectura",
      title: "El ciclo completo — de la llamada del cliente al asesor conectado",
      peek: "Diagrama de las piezas y sus mensajes. Léelo antes del step-by-step.",
      defaultOpen: true,
      blocks: [
        {
          type: "architecture",
          title: "Handoff Agentforce Voice → OmniChannel → Asesor",
          diagram: `
Cliente marca al número del Contact Center
                │
                ▼
       Voice Call flow inicial ──►  Agentforce Voice Bot
                                          │
                                          │  (planner evalúa turno)
                                          │
                                    ┌─────┴─────┐
                                    │           │
                        (bot puede resolver)   (escalar)
                                    │           │
                                    ▼           ▼
                            Continúa turno   Topic "Escalación a humano"
                                                │
                                                ▼
                                         End Action · Escalate
                                                │
                                                ▼
                                     OmniChannelFlow (Route Work)
                                                │
                                    ┌───────────┴───────────┐
                                    │                       │
                          Queue destino               (fallback branch)
                          + Requested Skills          si no hay match
                                    │                       │
                                    ▼                       ▼
                        Presence Configuration       Otra Queue / IVR
                        + Presence Status
                                    │
                          Asesor disponible con
                          Presence Status "Available for Voice"
                          y skill match
                                    │
                                    ▼
                          OmniChannel Widget · alerta al asesor
                                    │
                          (asesor Accept)
                                    │
                                    ▼
                          Voice Call reasignada
                          Owner = User (asesor)
                          Asesor ve: transcripción parcial,
                          campos capturados, Contact, Voice Call record
`,
          legend: [
            {
              label: "End Action · Escalate",
              description:
                "Acción terminal declarada en el topic del .agent. No responde texto — invoca el runtime del canal Voice para que ejecute el OmniChannelFlow declarado.",
            },
            {
              label: "OmniChannelFlow",
              description:
                "Flow con trigger OmniChannel. Único punto donde vive la lógica de routing (Queue/Skill/Priority/Fallback).",
            },
            {
              label: "Presence Status + Configuration",
              description:
                "Combinación que decide si un asesor puede recibir una Voice Call en un momento dado. Ambas deben incluir el canal Voice.",
            },
            {
              label: "Owner reasignado",
              description:
                "Al aceptar, la Voice Call queda con OwnerId = asesor. A partir de ese momento el reporting nativo dice la verdad.",
            },
          ],
        },
      ],
    },

    {
      id: "step-by-step",
      eyebrow: "Guía paso a paso",
      title: "Cómo configurar el handoff — 9 pasos secuenciales",
      peek: "Orden importa: la operación humana antes que el flow, el flow antes que el agente.",
      defaultOpen: true,
      blocks: [
        {
          type: "callout",
          tone: "info",
          title: "Prerrequisitos",
          text: "Org con Agentforce habilitado + Service Cloud Voice + Contact Center activo con proveedor configurado. Licencias: Service Cloud Voice para asesores, Einstein Agent User para el bot. Agente de Voz ya publicado y accesible por número de prueba.",
        },
        {
          type: "setupStep",
          number: 1,
          title: "Crear el Service Presence Status para Voz",
          instructions:
            "Setup → Service Presence Statuses → New. Label: 'Disponible para Voz'. Developer Name: 'Available_For_Voice'. Status Option: Online. En Service Channels agregar 'Voice Call' (channel developer name: sfdc_voice). Guardar.",
          screenshotPlaceholder: {
            caption:
              "Setup → Service Presence Statuses → new status 'Available for Voice' con channel Voice Call agregado (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 2,
          title: "Crear la Presence Configuration",
          instructions:
            "Setup → Presence Configurations → New. Label: 'Contact Center Voice'. Capacity: 100. En Assigned Users agregar los Users (o Profiles) del contact center. Guardar. Luego editar y en Assigned Presence Statuses agregar 'Disponible para Voz'.",
          screenshotPlaceholder: {
            caption:
              "Presence Configuration 'Contact Center Voice' con capacidad 100 y Presence Status asignado (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 3,
          title: "Crear (o preparar) la Queue destino con canal Voice",
          instructions:
            "Setup → Queues → New. Label: 'Cola Protección Familiar Voz'. Developer Name: 'Queue_ProteccionFamiliar_Voice'. En Supported Objects agregar 'Voice Call'. En Queue Members agregar los Users que deben recibir escalaciones de este agente. Guardar.",
          screenshotPlaceholder: {
            caption:
              "Queue con Voice Call declarado como Supported Object y Users agregados (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 4,
          title: "Crear Skills (opcional, si vas a usar Skill-Based Routing)",
          instructions:
            "Setup → Skills → New. Ejemplos: 'Español', 'Producto Protección Familiar', 'Escalación N2'. Luego, en cada User que debe recibir handoff, ir al registro y agregar los Skills en la related list.",
          screenshotPlaceholder: {
            caption:
              "Skills creados y asignados a Users del contact center (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 5,
          title: "Construir el OmniChannelFlow",
          instructions:
            "Flow Builder → New Flow → OmniChannel Flow. Object: Voice Call. En el start element se recibe implícitamente el RecordId de la Voice Call. Agregar action 'Route Work': Routing Type = Queue-Based (o Skill-Based), Queue Id = Id de 'Queue_ProteccionFamiliar_Voice', Priority = 1, Push Timeout = 30 segundos. Opcional: agregar branch de fallback para rerroutear si no hay agente en X segundos. Guardar como 'Voice_Escalate_ProteccionFamiliar' y activar.",
          screenshotPlaceholder: {
            caption:
              "Flow Builder mostrando el OmniChannelFlow con Route Work configurado (Queue + Priority + Push Timeout) (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 6,
          title: "Declarar el End Action Escalate en el .agent",
          instructions:
            "Abrir el bundle del .agent en VS Code (Agent Script DSL v2). En el topic de escalación (ej. 'Escalación a humano') agregar el End Action: endAction: escalate con parameter omniFlowApiName='Voice_Escalate_ProteccionFamiliar'. Antes del End Action, el bot debe emitir el mensaje verbatim al cliente ('Espera un momento, te estoy transfiriendo con un humano'). Guardar. Publicar y activar el bundle.",
          command: `sf agent validate authoring-bundle --json --api-name ProteccionFamiliarVoice
sf agent publish authoring-bundle --json --api-name ProteccionFamiliarVoice --skip-retrieve
sf agent activate --json --api-name ProteccionFamiliarVoice`,
          screenshotPlaceholder: {
            caption:
              "Vista del .agent en Agent Builder mostrando el topic 'Escalación a humano' con End Action Escalate y el OmniChannelFlow referenciado (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 7,
          title: "Asignar el Permission Set / Presence al asesor",
          instructions:
            "Cada asesor humano necesita: (a) licencia Service Cloud Voice asignada, (b) el Permission Set del Contact Center, (c) acceso a la Presence Configuration (asignada al Profile o directamente al User), (d) el Presence Status 'Disponible para Voz' habilitado. Verificar login al Service Console con OmniChannel Widget visible y estado 'Disponible para Voz' seleccionable.",
          screenshotPlaceholder: {
            caption:
              "Service Console con OmniChannel Widget abierto y el asesor en estado 'Disponible para Voz' (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 8,
          title: "Prueba end-to-end del handoff",
          instructions:
            "Con al menos un asesor logueado en el Service Console y en estado 'Disponible para Voz': marcar al número del agente desde un teléfono de prueba. Conversar hasta forzar el topic de escalación. Verificar (a) el bot dice el mensaje verbatim de transferencia, (b) el asesor recibe alerta en OmniChannel Widget en menos de los segundos configurados en Push Timeout, (c) al aceptar, el asesor recibe la llamada y ve el Voice Call record con transcripción parcial y campos capturados.",
          screenshotPlaceholder: {
            caption:
              "Timeline de la Voice Call con turno del bot, escalación, y aceptación del asesor humano (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 9,
          title: "Instrumentar métricas de handoff",
          instructions:
            "Crear reportes sobre Voice Call filtrando IsAcceptedByAgent, TimeToRoute, TimeInQueue, HoldTime. Recomendamos KPIs: 'Tasa de handoff exitoso' (aceptado / escalados), 'Tiempo promedio hasta aceptación', 'Tasa de fallback' (llamadas que cayeron en branch de fallback por no encontrar agente).",
          screenshotPlaceholder: {
            caption:
              "Dashboard con métricas de handoff (tasa de aceptación, TTA, fallback) (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
      ],
    },

    {
      id: "transfer-to-number-conceptos",
      eyebrow: "Transfer to Number · Conceptos",
      title: "Cómo funciona realmente la transferencia a un número externo",
      peek: "No hay End Action nativo. Es una cadena indirecta que pasa por el Contact Flow del proveedor.",
      defaultOpen: false,
      blocks: [
        {
          type: "paragraph",
          text: "Cuando en Agentforce Voice el objetivo es transferir la llamada a un número telefónico externo (por ejemplo, un IVR legacy, un partner que no vive en Salesforce, un callback específico del cliente), no existe un mecanismo directo desde el .agent ni desde el OmniChannelFlow. La transferencia ocurre en el motor del proveedor de telefonía. Esta receta documenta el patrón verificado end-to-end para Amazon Connect (Service Cloud Voice HVCC); para Genesys Cloud CX, NICE CXone o BYOC hay que consultar la documentación del partner respectivo.",
        },
        {
          type: "concept",
          title: "El patrón de 4 saltos",
          peek: "La cadena real que ejecuta una transferencia a número desde el .agent.",
          blocks: [
            {
              type: "paragraph",
              text: "No es un solo botón. Es una secuencia disciplinada donde el .agent declara intención, un Apex invocable traduce esa intención en un contact attribute de Amazon Connect, y un Quick Connect predefinido dispara el bloque 'Transfer to phone number' del Contact Flow.",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "El .agent invoca un Topic (ej. 'Transferir a número externo') que ejecuta una GenAiFunction con input phoneNumber en formato E.164.",
                "La GenAiFunction llama a un Apex invocable custom que a su vez invoca la Toolkit API de Amazon Connect (vía Lambda InvokeTelephonyIntegrationApiFunction) para setear un contact attribute — por ejemplo sfdc-TargetE164__c — sobre el contact activo.",
                "El bot ejecuta un Quick Connect predefinido cuyo Contact Flow lee ese atributo con el bloque 'Get customer input' o 'Check contact attributes' y bifurca hacia el bloque 'Transfer to phone number'.",
                "Amazon Connect hace el bridge SIP al destino. La VoiceCall record de Salesforce se cierra cuando el bot cuelga su rama.",
              ],
            },
          ],
        },
        {
          type: "concept",
          title: "El bloque 'Transfer to phone number' en Amazon Connect",
          peek: "Qué inputs acepta, qué branches devuelve, qué restricciones tiene.",
          audience: ["admin", "developer", "architect"],
          blocks: [
            {
              type: "paragraph",
              text: "Documentado oficialmente en docs.aws.amazon.com/connect/latest/adminguide/transfer-to-phone-number.html (verificado 2026-08). Es un bloque nativo del Contact Flow Designer, solo válido para canal Voice.",
            },
            {
              type: "table",
              headers: ["Propiedad", "Descripción", "Notas"],
              rows: [
                ["Country code", "Prefijo del país destino", "E.164 obligatorio. Debe estar en el service quota allowlist del instance de Amazon Connect."],
                ["Set timeout", "Segundos de espera antes de considerar Timeout", "Si expira, cae por el branch Timeout."],
                ["Send DTMF", "Tonos a mandar tras contestar", "Ej. '1,,,2' navega opciones de IVR. La coma equivale a 750 ms de pausa."],
                ["Caller ID number", "Número que ve el destino", "Si vacío, se pasa el número original del cliente. UK requiere E.164 válido. Australia requiere DID de Amazon Connect."],
                ["Caller ID name", "Nombre que ve el destino (si el trunk soporta CNAM)", "Usualmente cortesía; muchos destinos lo ignoran."],
                ["Resume flow after disconnect", "Si el flow sigue tras colgar el destino", "Solo aplica si cuelga el externo primero. Si cuelga el cliente, cae toda la llamada."],
              ],
            },
            {
              type: "callout",
              tone: "warning",
              title: "Branches del bloque",
              text: "Success | Call Failed | Timeout | Error. El diseño del Contact Flow debe manejar los cuatro. Si solo cableas Success, cualquier fallo del destino termina la llamada sin dar aviso al cliente ni loguear nada útil en Salesforce.",
            },
          ],
        },
        {
          type: "concept",
          title: "El Quick Connect como puente",
          peek: "El artefacto que le da al bot un 'destino' invocable sin exponer el número directamente.",
          audience: ["admin", "architect"],
          blocks: [
            {
              type: "paragraph",
              text: "Un Quick Connect en Amazon Connect es un identificador nombrado que un flow puede usar como destino. Existen tres tipos: Agent, Queue, External (Phone Number). Para este patrón, se crea un Quick Connect que dispara un Contact Flow custom — no se apunta al número directamente — para que la lógica de qué número marcar viva en el atributo dinámico seteado por Salesforce.",
            },
            {
              type: "list",
              items: [
                "El Quick Connect apunta a un Contact Flow tipo 'Transfer to Agent Flow' que a su vez lee el atributo dinámico y ejecuta 'Transfer to phone number'.",
                "El .agent nunca conoce el número real — solo el DeveloperName del Quick Connect. Cambiar destinos por vertical o cliente se hace en Amazon Connect, sin redeploy del .agent.",
                "Permite auditoría: los reportes de Amazon Connect muestran quién invocó cada Quick Connect y con qué frecuencia.",
              ],
            },
          ],
        },
        {
          type: "architecture",
          title: "Ciclo completo — Agentforce Voice → número externo",
          diagram: `
Cliente en llamada activa con el bot
                │
                ▼
Bot detecta intent "transferir a número externo"
                │
                ▼
Topic invoca GenAiFunction TransferToExternalNumber(phoneNumber)
                │
                ▼
GenAiFunction ──► Apex invocable (SFDC)
                        │
                        ▼
                Toolkit API / Lambda helper
                (InvokeTelephonyIntegrationApiFunction)
                        │
                        ▼
                Amazon Connect · UpdateContactAttributes
                sfdc-TargetE164__c = "+525512345678"
                        │
                        ▼
Bot invoca Quick Connect "SFDC_ExternalTransfer"
                │
                ▼
Quick Connect ──► Contact Flow (Transfer to Agent Flow type)
                        │
                        │  1. Check contact attributes → sfdc-TargetE164__c
                        │
                        ▼
                Bloque 'Transfer to phone number'
                    ├─ Success  → llamada bridged, bot cuelga
                    ├─ Timeout  → play prompt + reintento o fallback OmniFlow
                    ├─ CallFailed  → play prompt "no pudimos conectar"
                    └─ Error    → notification + close call
                        │
                        ▼
                Salesforce VoiceCall
                    Status = Closed cuando el bot cuelga
                    TotalHoldDuration se puebla vía CTR sync
                    Reporting del leg externo NO existe en SF
`,
          legend: [
            {
              label: "GenAiFunction",
              description:
                "Bridge entre Agent Script y Apex. Recibe el phoneNumber como input tipado, se conecta al Apex invocable.",
            },
            {
              label: "Toolkit API",
              description:
                "APIs cliente/servidor que Service Cloud Voice expone para hablar con la telefonía del proveedor. La Lambda InvokeTelephonyIntegrationApiFunction es el broker documentado para Amazon Connect.",
            },
            {
              label: "Contact Attribute",
              description:
                "Variable de sesión del contact en Amazon Connect. Persiste hasta el fin de la llamada. Es la variable que el Contact Flow lee para saber a qué número transferir.",
            },
            {
              label: "CTR sync",
              description:
                "Contact Trace Record. Es el bulk sync que Salesforce hace después de la llamada para consolidar datos operativos de Amazon Connect. Es lo único que sobrevive del leg externo en Salesforce.",
            },
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Límites duros que hay que aceptar de antemano",
          text: "El contexto conversacional NO viaja al destino externo. Transcripción, campos capturados por el bot, sentimiento — nada de eso cruza el SIP. Si el destino necesita saber quién llama y por qué, hay que planear un mecanismo out-of-band (SMS previo, webhook al partner con el contexto, o registrar el número de referencia del case en Salesforce y que el partner haga lookup). La VoiceCall record de Salesforce se cierra en el momento de transferir; el reporting del leg externo vive en Amazon Connect. Y el país destino debe estar en el service quota allowlist de Amazon Connect — no lo está por default para todos los países.",
        },
      ],
    },

    {
      id: "transfer-to-number-step",
      eyebrow: "Transfer to Number · Guía paso a paso",
      title: "Configurar transferencia a número externo en Amazon Connect — 8 pasos",
      peek: "Solo Amazon Connect. Genesys / NICE / BYOC requieren consultar docs del partner.",
      defaultOpen: false,
      blocks: [
        {
          type: "callout",
          tone: "info",
          title: "Prerrequisitos específicos",
          text: "Instance de Amazon Connect asociado al Contact Center de SCV. Acceso admin al instance. Números destino en formato E.164 y en el service quota allowlist del instance (revisar 'Countries you can call' en la consola de AWS). Lambda InvokeTelephonyIntegrationApiFunction desplegada como parte del setup base de SCV (viene con el paquete de deployment de Amazon Connect + Salesforce).",
        },
        {
          type: "setupStep",
          number: 1,
          title: "Verificar el service quota de países en Amazon Connect",
          instructions:
            "AWS Console → Service Quotas → Amazon Connect. Revisar 'Countries you can call' o el quota específico del instance. Si el país destino no está permitido, abrir ticket de aumento con AWS Support ANTES de continuar — la habilitación puede tardar 24-72 horas.",
          screenshotPlaceholder: {
            caption:
              "AWS Console — Service Quotas de Amazon Connect mostrando países permitidos (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 2,
          title: "Crear el Contact Flow que ejecuta el transfer",
          instructions:
            "Amazon Connect Console → Routing → Contact flows → Create contact flow → Type: 'Transfer to Agent Flow'. Name: 'SFDC_ExternalTransfer_Flow'. Bloques mínimos: (a) 'Set logging behavior' Enable, (b) 'Set contact attributes' — copiar sfdc-TargetE164__c a una variable local si querés facilitar debug, (c) 'Transfer to phone number' con Country code obtenido del atributo (dinámico) y Timeout=30s, (d) rama Success termina, (e) ramas Timeout/CallFailed/Error → 'Play prompt' con mensaje de fallback y opción de rerroutear a OmniFlow. Guardar y publicar.",
          screenshotPlaceholder: {
            caption:
              "Contact Flow Designer con el bloque 'Transfer to phone number' y las 4 branches cableadas (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 3,
          title: "Crear el Quick Connect",
          instructions:
            "Amazon Connect Console → Routing → Quick connects → Add new. Name: 'SFDC_ExternalTransfer'. Type: 'External' NO — usar 'Agent' o 'Queue' según la topología, PERO apuntando al Contact Flow del paso 2. Nota: para este patrón se recomienda tipo Queue apuntando a una Queue placeholder con el Contact Flow custom, lo que permite reasignar el destino sin cambiar el Quick Connect referenciado por el bot.",
          screenshotPlaceholder: {
            caption:
              "Quick Connect 'SFDC_ExternalTransfer' con referencia al Contact Flow SFDC_ExternalTransfer_Flow (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 4,
          title: "Habilitar el Quick Connect en la Queue del bot",
          instructions:
            "Amazon Connect Console → Routing → Queues → abrir la Queue asignada al bot Agentforce → Quick connects → agregar 'SFDC_ExternalTransfer'. Sin este paso, el bot no podrá invocar el Quick Connect aunque exista.",
          screenshotPlaceholder: {
            caption:
              "Queue del bot con Quick Connect agregado en la lista habilitada (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 5,
          title: "Crear el Apex invocable en Salesforce",
          instructions:
            "Nueva Apex class 'TransferToExternalNumberAction' con método @InvocableMethod. Input: List<Request> con phoneNumber (Text, E.164) y voiceCallId (Text). Lógica: (a) validar formato E.164 con regex; (b) llamar VoiceCallToolkitApi o hacer HTTP callout autenticado a la Lambda InvokeTelephonyIntegrationApiFunction con action='UpdateContactAttributes' y payload {sfdc-TargetE164__c: phoneNumber}; (c) retornar success/error. Deploy con test class que mockea el HTTP callout.",
          command: `sf apex generate class --name TransferToExternalNumberAction --api-version 62.0
sf project deploy start --source-dir force-app/main/default/classes/TransferToExternalNumberAction.cls`,
          screenshotPlaceholder: {
            caption:
              "Vista de la Apex class TransferToExternalNumberAction con @InvocableMethod (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 6,
          title: "Registrar la GenAiFunction en el .agent",
          instructions:
            "En el bundle authoring del .agent (Agent Script DSL v2), crear una GenAiFunction 'TransferToExternalNumber' con InputParameter phoneNumber (String, description clara del formato E.164). Bindear la function al Apex invocable TransferToExternalNumberAction. Crear un Topic 'Transferencia a número externo' con instrucciones imperativas: cuando el usuario pide ser transferido a un número específico O el flujo lo determina, invocar TransferToExternalNumber con el número extraído. Después de la función, emitir mensaje verbatim al cliente ('Te estoy conectando ahora') y luego invocar el Quick Connect via End Action de transfer (referenciando SFDC_ExternalTransfer como target).",
          screenshotPlaceholder: {
            caption:
              "Agent Builder mostrando la GenAiFunction TransferToExternalNumber y el topic asociado (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "setupStep",
          number: 7,
          title: "Publicar y activar el .agent",
          instructions:
            "Validar, publicar y activar el bundle. Verificar en Agent Trace que la GenAiFunction se resuelve y que el phoneNumber se pasa correctamente al Apex.",
          command: `sf agent validate authoring-bundle --json --api-name ProteccionFamiliarVoice
sf agent publish authoring-bundle --json --api-name ProteccionFamiliarVoice --skip-retrieve
sf agent activate --json --api-name ProteccionFamiliarVoice`,
        },
        {
          type: "setupStep",
          number: 8,
          title: "Prueba end-to-end de la transferencia externa",
          instructions:
            "Marcar al número del bot. Conversar hasta forzar el topic de transferencia (ej. 'necesito hablar con proveedor X al 555-1234'). Verificar: (a) Agent Trace muestra invocación de TransferToExternalNumber, (b) Amazon Connect Contact Trace Record muestra el atributo sfdc-TargetE164__c seteado, (c) el bloque 'Transfer to phone number' ejecuta y sale por Success, (d) el número destino recibe la llamada, (e) el VoiceCall record en Salesforce queda con Status=Closed y CTR sync poblado.",
          screenshotPlaceholder: {
            caption:
              "Diagnóstico end-to-end: Agent Trace + Amazon Connect CTR + Voice Call record cerrado en Salesforce (placeholder — reemplazar).",
            aspect: "wide",
          },
        },
        {
          type: "callout",
          tone: "note",
          title: "Sobre otros proveedores de telefonía",
          text: "Genesys Cloud CX, NICE CXone y BYOC (Bring Your Own Channel) resuelven la transferencia externa dentro de su propio flow engine — sin path oficial de Salesforce documentado al 2026-08. El patrón general se mantiene (bot declara intención → capa de proveedor ejecuta transfer), pero la implementación del paso 2, 3, 4 y del broker de atributos cambia radicalmente. Consultar la documentación del partner respectivo antes de comprometerse a Transfer to Number con esos stacks.",
        },
      ],
    },

    {
      id: "troubleshoot",
      eyebrow: "Troubleshooting",
      title: "Los errores más comunes y cómo diagnosticarlos",
      peek: "Si algo se rompe, generalmente es uno de estos escenarios.",
      defaultOpen: false,
      blocks: [
        {
          type: "troubleshoot",
          rows: [
            {
              issue:
                "[Handoff interno] El bot dice 'te estoy transfiriendo' pero la llamada se queda muda, luego cuelga.",
              solution:
                "El End Action Escalate no está declarado en el topic, o el bundle .agent no está publicado con la última versión. Verificar en Agent Builder que el topic activo incluye el End Action; publicar y activar de nuevo.",
            },
            {
              issue:
                "[Handoff interno] El End Action se ejecuta pero la llamada nunca llega al asesor.",
              solution:
                "El OmniChannelFlow no está activo o el API Name declarado en el .agent no coincide. Verificar en Setup → Flows que el Flow está en estado 'Active'. Confirmar en el .agent que omniFlowApiName es idéntico al Flow API Name.",
            },
            {
              issue:
                "[Handoff interno] El Flow existe y está activo pero la Route Work falla con 'No agents available'.",
              solution:
                "Ningún asesor tiene Presence Status compatible con el channel Voice Call. Revisar: (a) la Queue tiene 'Voice Call' en Supported Objects, (b) los Users son Members de la Queue, (c) los Users tienen el Presence Status 'Disponible para Voz' habilitado y seleccionado en el OmniChannel Widget.",
            },
            {
              issue:
                "[Handoff interno] El asesor recibe la llamada pero el registro Voice Call viene vacío, sin transcripción.",
              solution:
                "El Contact Center no tiene habilitada la Voice Transcription en tiempo real, o el proveedor de Voice no la soporta. Verificar en la configuración del Contact Center la sección 'Transcription' y la licencia del proveedor.",
            },
            {
              issue:
                "[Handoff interno] El match por skills no funciona — la llamada la agarra cualquier asesor.",
              solution:
                "Skill-Based Routing requiere que la Route Work action tenga (a) Routing Type='Skills-Based', (b) Requested Skills poblado con Ids de Skill, y (c) los Users deben tener esos Skills asignados. Si la Queue tiene skills asignados pero el Flow usa Queue-Based Routing, los skills se ignoran.",
            },
            {
              issue:
                "[Handoff interno] La llamada se transfiere pero el Owner del Voice Call sigue siendo el bot user.",
              solution:
                "Se completó Route Work pero el asesor no le hizo Accept. Verificar en el OmniChannel Widget que la alerta apareció y que el asesor la aceptó. Sin Accept, OmniChannel no cambia el Owner.",
            },
            {
              issue:
                "[Transfer to Number] El Apex invocable ejecuta pero la llamada no se transfiere.",
              solution:
                "El contact attribute no llegó a Amazon Connect. Revisar en Amazon Connect → Contact search → detalle del contact → Attributes: si sfdc-TargetE164__c está vacío, la Lambda InvokeTelephonyIntegrationApiFunction no está llegando o no se está invocando con el contactId correcto. Verificar los CloudWatch logs de la Lambda.",
            },
            {
              issue:
                "[Transfer to Number] La transferencia falla con 'Call Failed' branch inmediato, incluso a un número válido.",
              solution:
                "El país destino no está en el service quota allowlist de Amazon Connect. Revisar Service Quotas en la consola AWS. Cada país requiere solicitud explícita a AWS Support para habilitarse. También validar que el número está en E.164 correcto (+ prefijo país, sin espacios ni guiones).",
            },
            {
              issue:
                "[Transfer to Number] La transferencia sale por Timeout aunque el destino contesta.",
              solution:
                "El Set timeout del bloque puede ser demasiado bajo para el ring pattern del destino (ej. IVR con prompt largo antes de contestar). Subir a 45-60 segundos. Alternativamente, el destino puede estar rechazando el Caller ID declarado — probar con Caller ID vacío para pasar el número original del cliente.",
            },
            {
              issue:
                "[Transfer to Number] El destino recibe la llamada pero el cliente cuelga porque cree que se cortó.",
              solution:
                "El bot no le comunicó al cliente que iba a haber transferencia. Debe haber un mensaje verbatim ANTES de ejecutar la GenAiFunction ('Te estoy conectando ahora con...'). Además, si el destino tiene un ring o un mensaje de bienvenida largo, considerar mandar DTMF automático inicial para skipear IVR.",
            },
            {
              issue:
                "[Transfer to Number] El VoiceCall record en Salesforce no muestra la transferencia externa.",
              solution:
                "Comportamiento esperado. La VoiceCall se cierra cuando el bot cuelga. Solo TotalHoldDuration y campos del CTR sync sobreviven. Para trazabilidad del leg externo, usar el CTR de Amazon Connect (Contact search → Contact ID) o el reporting del proveedor destino.",
            },
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "Logs para investigar",
          text: "Handoff interno — Agent Trace (Setup → Agent Studio → Agent → Traces), Debug Logs con categoría Workflow=FINE, OmniChannel Debug Log. Transfer to Number — mismos logs de Salesforce + CloudWatch Logs de la Lambda InvokeTelephonyIntegrationApiFunction + Amazon Connect Contact Trace Record (Contact search por ContactId).",
        },
      ],
    },

    {
      id: "sources",
      eyebrow: "Fuentes",
      title: "Documentación oficial y referencias",
      defaultOpen: false,
      blocks: [
        {
          type: "paragraph",
          text: "URLs verificadas al 2026-08-11. Las páginas de help.salesforce.com con renderizado dinámico pueden devolver 'CSS Error' al primer fetch — están linkeadas de todas formas para consulta manual. Las de developer.salesforce.com y docs.aws.amazon.com fueron confirmadas con contenido en el momento del research.",
        },
        {
          type: "sources",
          items: [
            {
              label: "Handoff interno · Voice — Enable Voice Call Transfers with Omni-Channel Flow (developer.salesforce.com, verificado)",
              url: "https://developer.salesforce.com/docs/atlas.en-us.voice_developer_guide.meta/voice_developer_guide/voice_example_omni_amazon_enable_voice_call_transfers.htm",
            },
            {
              label: "Handoff interno · Voice REST API — Route a Voice Call (Spring '26, verificado)",
              url: "https://developer.salesforce.com/docs/atlas.en-us.voice_developer_guide.meta/voice_developer_guide/voice_rest_route_call.htm",
            },
            {
              label: "Voice Contact Flows — restricciones y patrones (developer.salesforce.com, verificado)",
              url: "https://developer.salesforce.com/docs/atlas.en-us.voice_developer_guide.meta/voice_developer_guide/voice_contact_flows.htm",
            },
            {
              label: "Voice CTR Sync — comportamiento post-transferencia",
              url: "https://developer.salesforce.com/docs/atlas.en-us.voice_developer_guide.meta/voice_developer_guide/voice_ctr_sync.htm",
            },
            {
              label: "Voice — SMS Transfer to IVR (patrón que valida el uso de contact attributes)",
              url: "https://developer.salesforce.com/docs/atlas.en-us.voice_developer_guide.meta/voice_developer_guide/voice_example_sms_transfer_ivr.htm",
            },
            {
              label: "Transfer to Number · Amazon Connect Admin Guide — 'Transfer to phone number' block (AWS, verificado)",
              url: "https://docs.aws.amazon.com/connect/latest/adminguide/transfer-to-phone-number.html",
            },
            {
              label: "Service Cloud Voice — Contact Flow examples (GitHub oficial)",
              url: "https://github.com/service-cloud-voice/examples-from-doc/tree/main/ContactFlows",
            },
            {
              label: "Voice Release Notes — cambios por versión",
              url: "https://developer.salesforce.com/docs/atlas.en-us.voice_developer_guide.meta/voice_developer_guide/voice_release_notes.htm",
            },
            {
              label: "Agentforce Service Agent Setup — Voice",
              url: "https://help.salesforce.com/s/articleView?id=service.miaw_agent_setup.htm",
            },
            {
              label: "OmniChannel Flow — Route Work Standard Action",
              url: "https://help.salesforce.com/s/articleView?id=service.omnichannel_flow_route_work.htm",
            },
            {
              label: "Service Presence Statuses",
              url: "https://help.salesforce.com/s/articleView?id=service.presence_statuses_create.htm",
            },
            {
              label: "Presence Configurations",
              url: "https://help.salesforce.com/s/articleView?id=service.presence_configurations_create.htm",
            },
            {
              label: "Skill-Based Routing in OmniChannel",
              url: "https://help.salesforce.com/s/articleView?id=service.omnichannel_skills_routing.htm",
            },
            {
              label: "Service Cloud Voice — Contact Center Setup",
              url: "https://help.salesforce.com/s/articleView?id=service.voice_setup_contact_center.htm",
            },
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "Gaps documentales identificados",
          text: "Al momento del research (2026-08-11), los endpoints de developer.salesforce.com/docs/service/agent-script/* y agentforce-service-agent/* devolvieron 404 en múltiples ocasiones — la doc parece estar en migración. Esto impidió confirmar por escrito que Agent Script DSL v2 no expone un End Action nativo tipo TransferToNumber. La afirmación se sostiene sobre inferencia fuerte (repos GitHub oficiales, patrones documentados, ausencia en release notes) pero merece verificación cuando la doc se estabilice.",
        },
      ],
    },
  ],
};

const headlessFeedbackManagement: Recipe = {
  slug: "headless-feedback-management-unauth",
  title:
    "Encuesta headless con Salesforce Feedback Management — frontend externo consumiendo la unAuth Response API",
  problemOneLiner:
    "Servir una encuesta de Salesforce Feedback Management dentro de un frontend propio, sin bajar SObjects a mano y sin renunciar a branching, display logic ni persistencia estándar.",
  approach: "standard",
  tags: [
    "Feedback Management",
    "Salesforce Surveys",
    "Connect REST API",
    "unAuth Response API",
    "Next.js",
    "Route Handlers",
    "React",
    "Headless",
    "BFF",
  ],
  audiences: ["admin", "developer", "architect"],
  author: "Jonathan Gomez",
  authorRole: "Agentforce Enterprise Architect",
  publishedAt: "2026-08-13",
  updatedAt: "2026-08-13",
  readingMinutes: 25,
  tldr: [
    "La encuesta vive en Survey Builder (Feedback Management) — pages, questions, branching, display logic, todo configurado por admin, sin código.",
    "Un BFF en Next.js (Route Handlers) intermedia entre el navegador y el dominio salesforce-scrt.com. Emite el accessToken unAuth, guarda la sesión en cookie firmada httpOnly y traduce a la Business API oficial.",
    "El frontend React tiene un componente único (SurveyRunner) que dispatcha por questionType. Cero código de branching o display logic en el cliente.",
    "Al PATCH con navigationAction: Next, Salesforce evalúa la ramificación y devuelve la página correcta (o la Thank You Page). El cliente solo renderiza lo que llega.",
    "Persistencia intacta: SurveyResponse + SurveyQuestionResponse quedan en el sistema de registro estándar. Dashboards y Data Mapper heredados funcionan sin cambios.",
  ],
  sections: [
    {
      id: "overview",
      eyebrow: "El problema",
      title: "Qué resuelve esta receta",
      defaultOpen: true,
      blocks: [
        {
          type: "problem",
          symptom:
            "Un equipo necesita servir encuestas dentro de su propia experiencia web o móvil — con su look & feel, sus animaciones, su i18n, su accesibilidad — pero la encuesta ya está definida en Salesforce Feedback Management y no quiere renunciar a la administración de páginas, ramificación y persistencia que Salesforce ya ofrece.",
          rootCause:
            "El camino más obvio para un desarrollador — bajar SurveyQuestion, SurveyQuestionChoice y SurveyPage vía SOQL y reconstruir el motor en TypeScript — es un antipatrón: se pierde el branching server-side, el display logic, el versionamiento por SurveyVersion, los merge fields y la persistencia oficial. Cada cambio en Survey Builder requiere sincronizar código.",
          impact:
            "El equipo termina construyendo un motor paralelo que hay que mantener, sincronizar y auditar en cada release. La licencia de Feedback Management deja de generar el valor por el que se compró.",
        },
        {
          type: "callout",
          tone: "success",
          title: "La forma correcta ya existe",
          text: "Salesforce Feedback Management expone una Business API oficial (Connect REST autenticada + unAuth Response API en el dominio salesforce-scrt.com) diseñada exactamente para este caso. Esta receta la implementa end-to-end.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Base conceptual",
          text: "Esta receta es la contraparte operativa del insight 'Headless Salesforce Feedback Management' — léalo primero si necesita el marco conceptual, el análisis de riesgos y las decisiones de arquitectura. Aquí implementamos exactamente lo que ese insight recomienda.",
        },
      ],
    },
    {
      id: "comparison",
      eyebrow: "Decisión clave",
      title: "Por qué no reconstruir el motor",
      blocks: [
        {
          type: "comparison",
          standardLabel: "Business API oficial (esta receta)",
          customLabel: "Reconstruir con SObjects + SOQL",
          rows: [
            {
              dimension: "Branching",
              standard:
                "Salesforce evalúa server-side. El PATCH devuelve la página correcta.",
              custom:
                "Reimplementar reglas en TypeScript. Sincronizar cada cambio del builder.",
            },
            {
              dimension: "Display logic",
              standard:
                "Muy probablemente server-side (validar en POC). El cliente pinta lo que llega.",
              custom:
                "Consultar y ejecutar reglas de visibilidad manualmente en cliente.",
            },
            {
              dimension: "Versionamiento",
              standard:
                "Cada invitación queda anclada a la SurveyVersion activa. Consistencia garantizada.",
              custom:
                "Cada publish del builder puede romper el mapping en producción.",
            },
            {
              dimension: "Persistencia",
              standard:
                "SurveyResponse + SurveyQuestionResponse automáticos. Dashboards y Data Mapper heredados.",
              custom:
                "DML manual, composite calls, riesgo de shape incorrecto.",
            },
            {
              dimension: "Esfuerzo",
              standard:
                "Un sprint para POC funcional. Bajo mantenimiento sostenido.",
              custom:
                "6–10 semanas para paridad. Cada feature nueva del motor requiere código nuevo.",
            },
          ],
        },
      ],
    },
    {
      id: "architecture",
      eyebrow: "Arquitectura",
      title: "Tres capas · una encuesta · dos consumidores",
      blocks: [
        {
          type: "architecture",
          title: "Vista lógica end-to-end",
          diagram: `┌──────────────────────────────────────────────────────────────────────┐
│  SALESFORCE (motor · sistema de registro)                            │
│                                                                      │
│    Feedback Management — Survey Builder                              │
│    Survey → SurveyVersion → Page → Question → Choice                 │
│         · page branching  · display logic  · required flags          │
│                                                                      │
│    Business API oficial                                              │
│      · Auth flow    /connect/surveys/…/survey-response               │
│      · unAuth flow  salesforce-scrt.com/surveys/v1/…                 │
│                                                                      │
│    Persistencia                                                      │
│      · SurveyInvitation · SurveyResponse · SurveyQuestionResponse    │
│      · SurveySubject → MessagingSession / Case (Sprint 2)            │
└──────────────────────────────────────┬───────────────────────────────┘
                                       │
              ┌────────────────────────┴────────────────────────┐
              ▼                                                 ▼
┌─────────────────────────────────────┐   ┌──────────────────────────────────┐
│  BFF (Sprint 1 · web)               │   │  Agentforce Agent (Sprint 2)     │
│  Next.js Route Handlers             │   │  Runs in-org via Apex actions    │
│                                     │   │                                  │
│  · POST /accessToken (SCRT)         │   │  · Uses authenticated Connect    │
│  · POST /survey-response (start)    │   │    REST — no BFF needed          │
│  · PATCH /survey-response (nav)     │   │  · SurveyInvitation prehecho     │
│                                     │   │    con SubjectId = Session       │
│  Sesión firmada HMAC · cookie       │   │                                  │
│  httpOnly con { invitationId,       │   │  Renderiza cada pregunta como    │
│  invitationUuid, flowInterviewState}│   │  turno WhatsApp                  │
└──────────────────┬──────────────────┘   └──────────────────┬───────────────┘
                   ▼                                         ▼
┌─────────────────────────────────────┐   ┌──────────────────────────────────┐
│  FRONTEND REACT                     │   │  WhatsApp                        │
│  SurveyRunner · QuestionInputs      │   │  List messages · Quick replies   │
│                                     │   │  · Free text · Rating text       │
│  Renderiza · valida required        │   │                                  │
│  · dispatcher por questionType      │   │  El agente es genérico —         │
│                                     │   │  no hardcodea preguntas          │
└─────────────────────────────────────┘   └──────────────────────────────────┘`,
          legend: [
            {
              label: "Sprint 1 · web (esta receta)",
              description:
                "Consumidor externo anónimo desde el navegador. Usa el unAuth path. BFF obligatorio para no exponer el token.",
            },
            {
              label: "Sprint 2 · WhatsApp",
              description:
                "Consumidor conocido post-sesión. Contact + MessagingSession ya resueltos. Usa el path autenticado desde dentro de la org. Fuera del alcance de esta receta.",
            },
          ],
        },
      ],
    },
    {
      id: "survey-design",
      eyebrow: "Paso 1 · Salesforce",
      title: "Construir la encuesta en Survey Builder",
      peek: "5 páginas · 10 preguntas · 7 tipos · flujo lineal (Basic Survey)",
      blocks: [
        {
          type: "callout",
          tone: "critical",
          title: "Sobre el tipo de encuesta — hallazgo empírico del POC",
          text: "El diálogo de New Survey ofrece tres tipos: Basic, Standard y Assessment. La doc pública sugiere que Standard es 'a survey with all the features' — y por tanto la mejor opción. En la práctica, la unAuth Response API responde: `INVALID_INPUT_COMBINATION — Specify a basic or conversational survey and try again` cuando se envía un Standard. Es decir: solo Basic y una variante 'Conversational' (que no está en las docs públicas ni en el picklist SurveyType de orgs estándar — parece feature en pilot/EA) son aceptadas por el endpoint /surveys/v1/survey-response. Esta receta usa Basic. Standard requiere el path autenticado (Connect REST), no el unAuth.",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Basic no soporta page branching ni display logic",
          text: "La Object Reference oficial dice: 'BASIC — Survey with a question page with like or dislike, long text, multiple selection, NPS, rating, short text, and single selection questions, and without inserted participant responses, display logic, and page branching logic'. Usar Basic significa flujo lineal y todas las preguntas siempre visibles. Si necesitas branching o display logic empresarial hoy, tienes que usar el path autenticado con Standard, o abrir case con Salesforce para activar Conversational en tu org.",
        },
        {
          type: "paragraph",
          text: "El diseño abajo se adaptó a Basic. Mantenemos los 7 tipos de pregunta como showcase técnico, pero el flujo es lineal — todas las páginas se recorren en orden y todas las preguntas siempre son visibles. Nombre sugerido: 'Descubrimiento_Agentforce_Basic'. Ese developer name se pasa al env SF_LAILA_SURVEY_DEV_NAME.",
        },
        {
          type: "dataModel",
          name: "Descubrimiento_Agentforce_Basic",
          purpose:
            "Discovery lineal — perfil, estado con Agentforce, priorización y follow-up",
          fields: [
            {
              name: "Página 1 · Perfil",
              type: "SurveyPage",
              purpose:
                "Q1 Industria (Single selection, requerida) · Q2 Rol (Single selection, requerida)",
            },
            {
              name: "Página 2 · Estado actual",
              type: "SurveyPage",
              purpose:
                "Q3 ¿Ya usan Agentforce? (Single selection Sí/No, requerida) · Q4 Canales (Multi-select, opcional — los no-clientes lo dejan vacío) · Q5 Satisfacción (Rating 1-5, opcional)",
            },
            {
              name: "Página 3 · Priorización",
              type: "SurveyPage",
              purpose:
                "Q6 Probabilidad IA este año (NPS 0-10, requerida) · Q7 ¿Qué te frena? (Single selection, requerida) · Q8 Cuéntanos más (Long text, opcional)",
            },
            {
              name: "Página 4 · Contacto",
              type: "SurveyPage",
              purpose:
                "Q9 ¿Sesión con arquitecto? (Single selection Sí/No, requerida) · Q10 Email (Short text, opcional)",
            },
            {
              name: "Página 5 · Thank You",
              type: "Survey Thank You Page",
              purpose:
                "thankYouMessage: 'Gracias por tu tiempo.' · redirectUrl: '/es/insights/headless-feedback-management-salesforce'",
            },
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Mapping de tipos Survey Builder ↔ API",
          text: "El UI de Basic Survey usa 'Single selection', 'Multi-select', 'Rating', 'NPS', 'Short text', 'Long text'. Para preguntas Sí/No usa Single selection con dos choices — el API devuelve questionType 'Boolean' o 'RadioButton' según cómo lo detecte el motor. El dispatcher del frontend maneja ambos.",
        },
        {
          type: "table",
          headers: ["Pregunta", "Tipo (Builder)", "questionType (API)", "Requerida"],
          rows: [
            ["Q1 · Industria", "Single selection", "RadioButton", "✅"],
            ["Q2 · Rol", "Single selection", "RadioButton", "✅"],
            ["Q3 · ¿Ya usan Agentforce?", "Single selection (Sí/No)", "Boolean | RadioButton", "✅"],
            ["Q4 · Canales", "Multi-select", "MultiChoice", "❌"],
            ["Q5 · Satisfacción", "Rating (1-5)", "Rating", "❌"],
            ["Q6 · Probabilidad IA", "NPS", "NPS", "✅"],
            ["Q7 · ¿Qué te frena?", "Single selection", "RadioButton", "✅"],
            ["Q8 · Cuéntanos más", "Long text", "FreeText", "❌"],
            ["Q9 · Sesión con arquitecto", "Single selection (Sí/No)", "Boolean | RadioButton", "✅"],
            ["Q10 · Email", "Short text", "ShortText", "❌"],
          ],
        },
        {
          type: "setupStep",
          number: 1,
          title: "Crear la encuesta y las 5 páginas",
          instructions:
            "En Setup → Feedback Management → New Survey. Nombra 'Descubrimiento_Agentforce_Basic'. En el diálogo, elige **Basic Survey** (el primero de los tres). Marca 'Save partially completed survey responses' para habilitar Status=PartiallyCompleted. Agrega 4 páginas de preguntas más 1 página Thank You. Configura la Thank You con el mensaje y redirectUrl indicados arriba.",
        },
        {
          type: "setupStep",
          number: 2,
          title: "Marcar preguntas requeridas",
          instructions:
            "Q1, Q2, Q3, Q6, Q7, Q9 → isResponseRequired = true. Q4, Q5, Q8, Q10 → false. En Basic Survey el toggle 'Required' aparece al editar cada pregunta — no en un panel separado como en Standard.",
        },
        {
          type: "setupStep",
          number: 3,
          title: "Publicar la encuesta",
          instructions:
            "Publish → crea la SurveyVersion activa. Anota el Survey Id (Kdxx...) — recupéralo con SOQL. Confirma también que el DeveloperName quedó exactamente como esperas (Salesforce normaliza a minúsculas: 'descubrimiento_agentforce_basic') porque ese es el valor case-sensitive que va al env.",
          command:
            "sf data query --query \"SELECT Id, Name, DeveloperName, SurveyType FROM Survey WHERE DeveloperName = 'descubrimiento_agentforce_basic'\" --target-org Laila",
        },
      ],
    },
    {
      id: "sandbox-config",
      eyebrow: "Paso 2 · Configuración unAuth",
      title: "Habilitar el path público en la org",
      peek: "Toggle en Survey Settings · Guest User sharing · verificar accessToken",
      blocks: [
        {
          type: "callout",
          tone: "warning",
          title: "Prerrequisito de licencia",
          text: "El path unAuth requiere Feedback Management — Growth. Con Starter no funciona. Verifica en Setup → Company Information → licencias antes de continuar.",
        },
        {
          type: "setupStep",
          number: 1,
          title: "Habilitar Unauthenticated Survey Participation",
          instructions:
            "Setup → Survey Settings → toggle 'Unauthenticated Survey Participation'. Selecciona el Experience Cloud site que se usará como contexto de la invitación (el mismo debe estar activo).",
        },
        {
          type: "setupStep",
          number: 2,
          title: "Compartir la encuesta al perfil Guest User",
          instructions:
            "Setup → Sharing Settings → Survey → Manual Sharing → agrega el Guest User Profile del Experience Cloud site elegido en el paso 1 con acceso Read. Sin esto, todo el flujo devuelve 403.",
        },
        {
          type: "setupStep",
          number: 3,
          title: "Configurar merge-field access (solo si la encuesta usa merge fields)",
          instructions:
            "Setup → Session Settings o Survey Settings, según el release → 'System Context - Enforce record-level access'. Si tu encuesta no tiene merge fields (esta receta MVP no los usa), puedes omitirlo.",
        },
        {
          type: "setupStep",
          number: 4,
          title: "Probar el accessToken endpoint desde curl",
          instructions:
            "Reemplaza <MY_DOMAIN> por el My Domain de la org (ej: laila-demo.my.salesforce.com) y <ORG_ID> por el 18-char Org Id. Si responde con {accessToken, expiresIn}, la configuración quedó bien.",
          command: `curl -X POST 'https://<MY_DOMAIN_SIN_LA_M>.my.salesforce-scrt.com/surveys/v1/accessToken' \\
  -H 'Content-Type: application/json' \\
  -d '{"orgId": "<ORG_ID>"}'`,
        },
        {
          type: "callout",
          tone: "note",
          title: "El host SCRT",
          text: "El endpoint no vive en my.salesforce.com — vive en my.salesforce-scrt.com (Omni-Channel Engagement URL). El BFF construye el host automáticamente reemplazando '.my.salesforce.com' por '.my.salesforce-scrt.com' — verifica que la resolución DNS funcione desde tu red.",
        },
      ],
    },
    {
      id: "env",
      eyebrow: "Paso 3 · Variables de entorno",
      title: "Configurar el .env.local del BFF",
      blocks: [
        {
          type: "paragraph",
          text: "El BFF necesita cinco variables server-side. Ninguna con prefijo NEXT_PUBLIC — todas quedan en el servidor.",
        },
        {
          type: "table",
          headers: ["Variable", "Valor de ejemplo", "Propósito"],
          rows: [
            [
              "SF_LAILA_MY_DOMAIN",
              "laila-demo.my.salesforce.com",
              "El BFF deriva el host SCRT desde aquí — reemplaza .my.salesforce.com por .my.salesforce-scrt.com",
            ],
            [
              "SF_LAILA_ORG_ID",
              "00DKY00000F1KgF2AV",
              "Organization Id de 18 caracteres — se envía al /accessToken",
            ],
            [
              "SF_LAILA_SURVEY_DEV_NAME",
              "descubrimiento_agentforce_basic",
              "Developer name de la encuesta publicada (Salesforce normaliza a minúsculas — case-sensitive)",
            ],
            [
              "SF_LAILA_UNAUTH_APP_PREFIX",
              "surveys/v1",
              "Prefijo de la unAuth Response API — valor por defecto salvo que Salesforce lo cambie",
            ],
            [
              "SURVEY_SESSION_SECRET",
              "openssl rand -base64 48",
              "Secret usado por el session store server-side (reservado — la implementación actual solo indexa por ID aleatorio; el secret queda listo para migrar a JWT o firma HMAC en producción)",
            ],
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "SF_LAILA_COMMUNITY_ID (opcional)",
          text: "Si tu Experience Cloud site requiere que la invitación referencie el communityId explícitamente, agrégalo. Si dejas en blanco, el BFF omite el campo.",
        },
      ],
    },
    {
      id: "bff-walkthrough",
      eyebrow: "Paso 4 · BFF",
      title: "Route Handlers de Next.js",
      peek: "Cliente unAuth · sesión firmada · dos endpoints públicos",
      blocks: [
        {
          type: "codeRef",
          name: "lib/salesforce/feedbackManagement.ts",
          kind: "apex",
          purpose:
            "Cliente server-side de la unAuth Response API. Cachea el accessToken en memoria del módulo. Decodifica entities HTML en labels (Salesforce devuelve 'Tecnolog&iacute;a', no 'Tecnología'). Normaliza el surveyPage polimórfico (QuestionPage vs ThankYouPage) en un tipo discriminado con kind: 'question' | 'thankyou'.",
          methods: [
            {
              name: "getAccessToken",
              description:
                "POST /surveys/v1/accessToken con { orgId }. Devuelve { accessToken, expiresIn }. Cache in-memory con margen de 30s.",
            },
            {
              name: "startSurvey(languageCode)",
              description:
                "POST /surveys/v1/survey-response con surveyDeveloperName + invitationSettings { collectAnonymousResponse }. Devuelve { session, page, navigationActions, surveyLabel }. La session incluye currentPageName (usado por navigate).",
            },
            {
              name: "navigate(session, action, answers)",
              description:
                "PATCH /surveys/v1/survey-response con surveyPageResponses.name (page id) + questionResponses[]. Debe enviar UNA entrada por cada pregunta de la página — no solo las contestadas. Devuelve { session, page, navigationActions }.",
            },
          ],
        },
        {
          type: "callout",
          tone: "critical",
          title: "Hallazgo empírico · shape de PATCH que la doc no explicita",
          text: "Dos requisitos que salieron en el POC y que la doc pública no deja claros: (1) surveyPageResponses.name — el ID de la página actual — es REQUERIDO en cada PATCH, aunque el brief dice 'reserved for future use'. (2) questionResponses[] debe contener una entrada por cada pregunta de la página, incluso las no contestadas — Salesforce responde 'Specify the same number of questions in the survey and the input representation' si falta alguna. Para las no contestadas: responses: [] en selection types, o omitir responseValue en NPS/Text.",
        },
        {
          type: "codeRef",
          name: "lib/survey/session.ts",
          kind: "apex",
          purpose:
            "Session store server-side indexado por session ID corto (64 chars hex). Ancla el Map a globalThis para sobrevivir HMR de Next en dev. La cookie httpOnly solo lleva el session ID — el estado real (invitationId + invitationUuid + flowInterviewState + responseId + languageCode + currentPageName) vive en memoria del servidor.",
          methods: [
            {
              name: "saveSession(session)",
              description:
                "Genera un ID aleatorio de 32 bytes, guarda { session, expiresAt: now+2h }. Sweep de sesiones expiradas en cada write. Devuelve el ID para la cookie.",
            },
            {
              name: "loadSession(id)",
              description:
                "Look up por ID. Verifica expiresAt. Devuelve null si no existe o expiró (elimina expiradas al pasar).",
            },
            {
              name: "updateSession(id, session)",
              description:
                "Refresca la sesión al navegar. El session ID de la cookie no cambia; solo el estado interno.",
            },
          ],
        },
        {
          type: "callout",
          tone: "critical",
          title: "Por qué el estado NO viaja en la cookie — el flowInterviewState no cabe",
          text: "Primera implementación puso el estado firmado con HMAC en la cookie. Fallo empírico: el flowInterviewState que devuelve Salesforce mide ~3.8 KB base64, y la sesión JSON serializada + base64 + firma + gzip queda en ~4.8 KB — por encima del límite de 4096 bytes por cookie que la mayoría de navegadores acepta silenciosamente. Chrome/Firefox rechazan la cookie sin decir nada y el próximo PATCH llega sin sesión. Solución: server-side session store con un session ID corto en la cookie (64 bytes). Para producción multi-instancia, cambia el Map de globalThis por Redis/KV — la interfaz saveSession/loadSession/updateSession queda igual.",
        },
        {
          type: "codeRef",
          name: "app/api/surveys/[surveyName]/start/route.ts",
          kind: "apex",
          purpose:
            "Endpoint POST. Llama startSurvey, guarda la session server-side vía saveSession, escribe el session ID en cookie httpOnly usando NextResponse.cookies.set. Devuelve { page, navigationActions, surveyLabel } al cliente.",
        },
        {
          type: "codeRef",
          name: "app/api/surveys/[surveyName]/navigate/route.ts",
          kind: "apex",
          purpose:
            "Endpoint PATCH. Lee el session ID desde NextRequest.cookies, hidrata la sesión con loadSession, valida action ∈ {Next, Back}, llama navigate, refresca la sesión con updateSession (el session ID de la cookie NO cambia). Rechaza 400 si no hay sesión válida.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Por qué el token NO va al navegador",
          text: "El accessToken unAuth es per-org — filtrarlo compromete todas las encuestas públicas de la org. Vive solo en el servidor, con TTL 3600s y cache in-memory. El navegador ve cookie con session ID de 64 bytes + JSON de páginas y respuestas. Cero superficie de secreto en cliente.",
        },
      ],
    },
    {
      id: "api-flow",
      eyebrow: "Paso 5 · Flujo API",
      title: "Cómo se ve una respuesta desde el primer clic",
      blocks: [
        {
          type: "pipeline",
          title: "Ciclo Start · Navigate · Thank You",
          steps: [
            {
              component: "Frontend",
              action: "POST /api/surveys/[name]/start",
              note: "Sin body relevante — el BFF pone el languageCode",
            },
            {
              component: "BFF",
              action: "POST /surveys/v1/accessToken (cached) → POST /surveys/v1/survey-response",
              note: "Salesforce crea SurveyInvitation con collectAnonymousResponse:true y devuelve Survey Description Output",
            },
            {
              component: "BFF",
              action: "saveSession(state) → Set-Cookie con session ID (64 bytes)",
              note: "El estado (invitationId + invitationUuid + flowInterviewState + currentPageName + …) queda en el store server-side; solo el ID viaja",
            },
            {
              component: "Frontend",
              action: "Renderiza Página 1 · valida required · usuario responde",
              note: "Dispatcher por questionType — sin condicionales por página",
            },
            {
              component: "Frontend",
              action: "PATCH /api/surveys/[name]/navigate { action: 'Next', answers: [...] }",
              note: "IMPORTANTE: answers[] debe incluir TODAS las preguntas de la página, no solo las contestadas — SF rechaza si falta alguna",
            },
            {
              component: "BFF",
              action: "loadSession(id) → PATCH /surveys/v1/survey-response con surveyPageResponses.name + questionResponses[]",
              note: "surveyPageResponses.name es requerido (el ID de la página actual) — la doc pública dice 'reserved for future use' pero en la práctica sí se necesita",
            },
            {
              component: "BFF",
              action: "updateSession(id, next) con el nuevo flowInterviewState y currentPageName",
              note: "El session ID de la cookie NO cambia; el estado interno sí. Cookie sigue viva.",
            },
            {
              component: "Frontend",
              action: "Repite hasta que surveyPage sea Thank You",
              note: "Detecta finalización por polimorfía: presencia de thankYouMessage/redirectUrl vs surveyQuestions[]",
            },
          ],
        },
        {
          type: "apiCall",
          title: "POST /accessToken · unAuth",
          method: "POST",
          url: "https://laila-demo.my.salesforce-scrt.com/surveys/v1/accessToken",
          headers: [{ name: "Content-Type", value: "application/json" }],
          body: `{ "orgId": "00DKY00000F1KgF2AV" }`,
          response: `{
  "accessToken": "eyJ...",
  "expiresIn": 3600,
  "tokenType": "Bearer"
}`,
          note: "TTL 3600s. El BFF cachea in-memory con margen de 30s antes del expiry.",
        },
        {
          type: "apiCall",
          title: "POST /survey-response · Start",
          method: "POST",
          url: "https://laila-demo.my.salesforce-scrt.com/surveys/v1/survey-response",
          headers: [
            { name: "Authorization", value: "Bearer <accessToken>" },
            { name: "Content-Type", value: "application/json" },
          ],
          body: `{
  "surveyDeveloperName": "descubrimiento_agentforce_basic",
  "languageCode": "es",
  "invitationSettings": {
    "collectAnonymousResponse": true
  }
}`,
          response: `{
  "status": "Success",
  "responseId": "0Myxx...",
  "invitationId": "0Kixx...",
  "invitationUuid": "11845-...",
  "flowInterviewState": "state1",
  "languageCode": "es",
  "navigationActions": ["Next"],
  "surveyDetail": {
    "label": "Descubrimiento_Agentforce_Basic",
    "name": "descubrimiento_agentforce_basic",
    "surveyPage": {
      "label": "Page 1",
      "name": "S_617968c2_...",
      "pageType": "QuestionPage",
      "surveyQuestions": [
        {
          "name": "q_industria",
          "label": "¿En qué industria trabajas?",
          "questionType": "RadioButton",
          "isResponseRequired": true,
          "questionChoices": [
            { "name": "c_retail", "label": "Retail" },
            { "name": "c_banca",  "label": "Banca" }
          ]
        },
        {
          "name": "q_rol",
          "label": "¿Cu\\u00e1l es tu rol?",
          "questionType": "RadioButton",
          "isResponseRequired": true,
          "questionChoices": [ ... ]
        }
      ]
    }
  }
}`,
          note: "Guarda surveyPage.name — se necesita en el próximo PATCH como surveyPageResponses.name.",
        },
        {
          type: "apiCall",
          title: "PATCH /survey-response · Navigate Next (una entrada por pregunta)",
          method: "PATCH",
          url: "https://laila-demo.my.salesforce-scrt.com/surveys/v1/survey-response",
          headers: [
            { name: "Authorization", value: "Bearer <accessToken>" },
            { name: "Content-Type", value: "application/json" },
          ],
          body: `{
  "surveyDeveloperName": "descubrimiento_agentforce_basic",
  "invitationId": "0Kixx...",
  "invitationUuid": "11845-...",
  "flowInterviewState": "state1",
  "languageCode": "es",
  "navigationAction": "Next",
  "surveyPageResponses": {
    "name": "S_617968c2_...",
    "questionResponses": [
      { "name": "q_industria", "questionType": "RadioButton", "responses": [{ "name": "c_retail" }] },
      { "name": "q_rol",       "questionType": "RadioButton", "responses": [] }
    ]
  }
}`,
          response: `{
  "status": "Success",
  "flowInterviewState": "state2",
  "navigationActions": ["Next", "Back"],
  "surveyPage": {
    "label": "Page 2",
    "name": "p_estado",
    "pageType": "QuestionPage",
    "surveyQuestions": [
      {
        "name": "q_usa_agentforce",
        "label": "¿Tu organización ya usa Agentforce o agentes IA?",
        "questionType": "RadioButton",
        "isResponseRequired": true,
        "questionChoices": [
          { "name": "yes", "label": "Sí" },
          { "name": "no",  "label": "No" }
        ]
      }
    ]
  }
}`,
          note: "Fíjate: q_rol se envía con responses: [] (unanswered) — no se omite. Y surveyPageResponses.name lleva el ID de la página actual, no el nuevo.",
        },
        {
          type: "apiCall",
          title: "PATCH final · Thank You devuelve",
          method: "PATCH",
          url: "https://laila-demo.my.salesforce-scrt.com/surveys/v1/survey-response",
          body: `{ "navigationAction": "Next", "surveyPageResponses": { "questionResponses": [...] }, ... }`,
          response: `{
  "status": "Success",
  "flowInterviewState": "final",
  "navigationActions": [],
  "surveyPage": {
    "label": "Gracias",
    "name": "p_thanks",
    "thankYouMessage": "Gracias por tu tiempo.",
    "messageDescription": "Tu respuesta quedó registrada.",
    "redirectUrl": "https://laila-portfolio.local/es/insights/headless-feedback-management-salesforce",
    "urlButtons": [
      { "label": "Leer el insight", "url": "https://laila-portfolio.local/es/insights/headless-feedback-management-salesforce" }
    ]
  }
}`,
          note: "Detecta el fin comparando la forma del surveyPage: thankYouMessage/redirectUrl presente vs surveyQuestions[] presente.",
        },
      ],
    },
    {
      id: "frontend-walkthrough",
      eyebrow: "Paso 6 · Frontend",
      title: "SurveyRunner y el dispatcher por questionType",
      blocks: [
        {
          type: "codeRef",
          name: "components/survey/SurveyRunner.tsx",
          kind: "lwc",
          purpose:
            "Client component que orquesta el ciclo start/navigate. Maneja estado de máquina: idle → loading → running → error. Renderiza SurveyPage con Back/Next o ThankYouPage cuando el server devuelve el fin.",
          methods: [
            {
              name: "handleStart",
              description: "POST /api/surveys/[name]/start · setState running",
            },
            {
              name: "handleNavigate(action)",
              description:
                "Arma answers desde el state local · PATCH · actualiza page y navigationActions",
            },
            {
              name: "buildAnswersPayload(questions, answers)",
              description:
                "Mapper del state UI → forma que la API espera: responses[] para selección, responseValue para NPS/Text. Es la única pieza que traduce entre representaciones.",
            },
            {
              name: "isAnswered(q, v)",
              description:
                "Valida required en la UI antes de habilitar el botón Next. Consulta isResponseRequired de cada pregunta.",
            },
          ],
        },
        {
          type: "codeRef",
          name: "components/survey/QuestionInputs.tsx",
          kind: "lwc",
          purpose:
            "Siete componentes de tipo de pregunta (SingleChoice, MultiChoice, BooleanYesNo, Rating, NPS, TextInput, TextArea). Cada uno recibe { question, value, onChange } y no conoce ni siquiera qué encuesta está corriendo — son puros presentadores.",
        },
        {
          type: "concept",
          title: "El dispatcher — la única pieza no trivial del cliente",
          peek: "Un switch(questionType) que mapea a componentes. Nada más.",
          blocks: [
            {
              type: "paragraph",
              text: "El dispatcher vive dentro de SurveyRunner como QuestionInput({ question, value, onChange }). Su forma es un switch de siete casos + un fallback para tipos no soportados que renderiza un placeholder claro y loguea el tipo (útil para descubrir en el POC si un tipo raro como Ranking o Slider llega vía API).",
            },
            {
              type: "list",
              items: [
                "RadioButton → SingleChoice · value: string · onChange(name)",
                "MultiChoice → MultiChoice · value: string[] · onChange([names])",
                "Boolean → BooleanYesNo · value: string · onChange(name)",
                "Rating → Rating · value: string (name de la choice) · onChange(name)",
                "NPS → NPS · value: number · onChange(n)",
                "ShortText → TextInput · value: string · onChange(s)",
                "FreeText → TextArea · value: string · onChange(s)",
                "default → <Unsupported type={type}/> con telemetría — no romper silencioso",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "demo",
      eyebrow: "Paso 7 · Probar",
      title: "Levantar el demo en local",
      blocks: [
        {
          type: "setupStep",
          number: 1,
          title: "Escribir .env.local",
          instructions:
            "Copia las 5 variables server-side en .env.local en la raíz del repo. Genera SURVEY_SESSION_SECRET con openssl rand -base64 48.",
          command: `# .env.local
SF_LAILA_MY_DOMAIN=laila-demo.my.salesforce.com
SF_LAILA_ORG_ID=00DKY00000F1KgF2AV
SF_LAILA_SURVEY_DEV_NAME=descubrimiento_agentforce_basic
SF_LAILA_UNAUTH_APP_PREFIX=surveys/v1
SURVEY_SESSION_SECRET=$(openssl rand -base64 48)`,
        },
        {
          type: "setupStep",
          number: 2,
          title: "Iniciar el dev server",
          instructions:
            "El demo vive en /es/demo/survey. El SurveyRunner llama al BFF, el BFF llama a Salesforce, Salesforce devuelve la Página 1.",
          command: "npm run dev",
        },
        {
          type: "setupStep",
          number: 3,
          title: "Recorrer el flujo completo",
          instructions:
            "Abre localhost:3000/es/demo/survey. Cubre las 5 páginas en orden. En Basic Survey no hay ramificación ni display logic — todas las páginas se recorren en secuencia. Confirma que el Back funciona (regresa a la página previa preservando respuestas) y que el Thank You Page aparece al final.",
        },
        {
          type: "setupStep",
          number: 4,
          title: "Verificar persistencia en la org",
          instructions:
            "Después de completar la encuesta, revisa que se hayan creado los objetos estándar. Deberías ver 1 SurveyResponse (Status=Completed) y N SurveyQuestionResponse (una por pregunta respondida).",
          command: `sf data query --query "SELECT Id, Status, CompletionDateTime FROM SurveyResponse ORDER BY CreatedDate DESC LIMIT 5" --target-org Laila
sf data query --query "SELECT Id, ResponseId, ResponseValue FROM SurveyQuestionResponse ORDER BY CreatedDate DESC LIMIT 20" --target-org Laila`,
        },
        {
          type: "callout",
          tone: "success",
          title: "El acid test del headless",
          text: "Busca en components/survey/SurveyRunner.tsx cualquier if que decida qué página mostrar. No debería haber ninguno. El único condicional del cliente es 'si page.kind === thankyou → renderiza ThankYouCard, si no → renderiza SurveyPage'. Toda la lógica de flujo vive en Salesforce.",
        },
      ],
    },
    {
      id: "phase-2",
      eyebrow: "Sprint 2 · WhatsApp",
      title: "Preview de la Fase 2 — Agente Encuestador",
      blocks: [
        {
          type: "paragraph",
          text: "La misma encuesta armada en Feedback Management se consume también desde Agentforce vía WhatsApp — post-sesión, cuando ya conocemos MessagingEndUser + Contact. Este preview describe cómo se conecta; la implementación completa vive en una receta separada.",
        },
        {
          type: "pipeline",
          title: "Flujo post-sesión",
          steps: [
            {
              component: "Trigger",
              action: "Al cerrar MessagingSession (o cerrar Case)",
              note: "Puede ser Flow, Apex trigger o invocable — según el diseño del handoff",
            },
            {
              component: "SurveyInvitation",
              action:
                "Insert con ParticipantId = MessagingEndUser.ContactId, Options.AllowGuestUserResponse = true",
              note: "Path autenticado desde dentro de la org — no necesita el token unAuth",
            },
            {
              component: "SurveySubject",
              action:
                "Insert con ParentId = invitationId, SubjectEntityType = 'MessagingSession', SubjectId = <session Id>",
              note: "Linking nativo — no requiere custom fields ni custom objects",
            },
            {
              component: "Handoff",
              action:
                "Ruta a Agente Encuestador con context { surveyName, invitationId }",
              note: "Reutiliza la MessagingSession si sigue en la ventana de 24h de WhatsApp",
            },
            {
              component: "Agente Encuestador",
              action:
                "Loop turno-a-turno: POST /connect/surveys/…/invitation/{id}/survey-response → PATCH por cada página",
              note: "Genérico — no hardcodea la encuesta. Un cambio en Survey Builder llega gratis.",
            },
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Por qué no hay BFF en este path",
          text: "El agente vive dentro de la org y puede usar el path autenticado (Connect REST estándar) contra yourInstance.my.salesforce.com. Sin cross-origin, sin token unAuth, sin CORS. Las acciones Apex del agente llaman directo. Menos piezas, más simple.",
        },
      ],
    },
    {
      id: "troubleshoot",
      eyebrow: "Troubleshooting",
      title: "Errores comunes y qué revisar",
      blocks: [
        {
          type: "troubleshoot",
          rows: [
            {
              issue:
                "POST /accessToken responde 400 'UnauthenticatedSurveyParticipation API isn't enabled'",
              solution:
                "Falta habilitar el toggle 'Unauthenticated Survey Participation' en Setup → Survey Settings. Ojo: la propagación tarda ~30 segundos después de guardarlo — si probaste inmediatamente y ya activaste el toggle, espera y reintentaste.",
            },
            {
              issue:
                "POST /accessToken responde 401 o 'Invalid org id'",
              solution:
                "Verifica que SF_LAILA_ORG_ID sea el Id de 18 caracteres (no el de 15). En Setup → Company Information está el valor correcto.",
            },
            {
              issue:
                "POST /survey-response responde 'Specify a basic or conversational survey and try again'",
              solution:
                "La encuesta es de tipo Standard (SurveyType=Survey). El unAuth API solo acepta Basic o Conversational. Borra la encuesta actual (SurveyType no se puede modificar por DML) y créala de nuevo como Basic Survey en el diálogo New Survey.",
            },
            {
              issue: "POST /survey-response responde 403 al iniciar",
              solution:
                "El Guest User del Experience Cloud site no tiene acceso al Survey. Ve a Sharing Settings → Survey → agrega el perfil Guest User con acceso Read.",
            },
            {
              issue:
                "Unable to find survey 'Descubrimiento_Agentforce_Basic'",
              solution:
                "El DeveloperName no coincide. Salesforce lo normaliza a minúsculas — verifica con SOQL: `SELECT DeveloperName FROM Survey`. El valor exacto (case-sensitive) va en SF_LAILA_SURVEY_DEV_NAME.",
            },
            {
              issue:
                "PATCH devuelve 400 'Invalid request content' sin más detalle",
              solution:
                "Casi siempre es surveyPageResponses.name ausente. Aunque el brief dice 'reserved for future use', la unAuth API lo requiere — envía el nombre de la página actual (el que llegó en surveyPage.name en la respuesta previa).",
            },
            {
              issue:
                "PATCH devuelve 'Specify the same number of questions in the survey and the input representation'",
              solution:
                "questionResponses[] debe incluir una entrada por cada pregunta de la página — no solo las contestadas. Para no contestadas: responses: [] en selection types, o omitir responseValue en NPS/Text. Enviar la página con menos entradas que preguntas siempre falla.",
            },
            {
              issue: "PATCH devuelve 'Flow interview state expired'",
              solution:
                "La sesión tiene un flowInterviewState que Salesforce ya no reconoce. Puede haber pasado la ventana de tolerancia o la SurveyVersion cambió mid-flight. Solución: reiniciar la respuesta (POST /start de nuevo).",
            },
            {
              issue:
                "Cookie 'sf_survey_session' desaparece entre POST /start y PATCH /navigate",
              solution:
                "Puede ser tamaño (cookies > 4096 bytes se rechazan silenciosamente) — verifica el log '[survey/start] session stored id=… cookie carries N bytes' (debe ser ~64). Si es mucho más grande, la implementación cayó en el patrón 'estado en cookie' — usa el session store server-side (Map en globalThis con session ID corto).",
            },
            {
              issue:
                "Labels vienen con caracteres HTML raros como 'Tecnolog&iacute;a'",
              solution:
                "Salesforce Survey Builder guarda labels HTML-encoded. El cliente FM (lib/salesforce/feedbackManagement.ts) trae un decoder de entities que se aplica server-side en normalizePage — si aparece en tu frontend, verifica que estás recibiendo los datos ya normalizados por el BFF, no directo desde Salesforce.",
            },
            {
              issue:
                "CORS bloqueado en el browser al llamar salesforce-scrt.com",
              solution:
                "Verifica que estás llamando al BFF (/api/surveys/*) — NO a salesforce-scrt.com directo. Si por error el frontend está apuntando al host de Salesforce, el navegador siempre bloqueará el CORS. Todas las requests deben pasar por el BFF.",
            },
          ],
        },
      ],
    },
    {
      id: "tradeoffs",
      eyebrow: "Cuándo usar",
      title: "Encajes y contraindicaciones",
      blocks: [
        {
          type: "tradeoffs",
          pros: [
            "Cero lógica de flujo en el frontend — un solo switch(questionType) resuelve todo el rendering.",
            "Cambios en la encuesta desde Survey Builder llegan gratis al frontend — no hay redeploy.",
            "Persistencia estándar — dashboards, Data Mapper y automatizaciones existentes siguen funcionando.",
            "Superficie de seguridad mínima en cliente — solo un session ID de 64 chars, cero secretos.",
            "Reutilizable: la misma encuesta la puede consumir un React, una app móvil o un Agente Encuestador de WhatsApp (con el path autenticado).",
          ],
          cons: [
            "Requiere Feedback Management Growth para el path unAuth (Starter solo cubre el path autenticado).",
            "En el path unAuth solo funciona con Basic Survey — que NO soporta page branching ni question display logic. Si necesitas branching o condicionalidad, o vas por el path autenticado con Standard, o abres case para activar Conversational Survey.",
            "Depende del contrato Business API — si Salesforce cambia un campo (ej: surveyPageResponses.name, questionResponses[] count), hay que actualizar el cliente TypeScript.",
            "El session store server-side en memoria no escala a producción multi-instancia — cambiar a Redis/KV antes de deploy.",
            "Preguntas 'menos comunes' (Ranking, Slider, Date, Picklist, Scoring) requieren validación empírica adicional — no están confirmadas verbatim en docs ni las verificamos en este POC.",
          ],
          whenToUse: [
            "Necesita servir encuestas de Salesforce dentro de una experiencia web/móvil propia (no dentro de Salesforce).",
            "El admin quiere seguir gestionando la encuesta desde Survey Builder sin tocar código.",
            "La organización ya invirtió en Feedback Management y quiere sacarle el valor completo.",
            "Va a haber múltiples consumidores de la misma encuesta (web + WhatsApp + móvil).",
          ],
          whenNotToUse: [
            "La encuesta necesita tipos de pregunta que no están soportados por la Business API (validar en POC).",
            "Requiere una experiencia visual radicalmente distinta al modelo de páginas (encuesta conversacional pura, sin páginas) — considere entonces un motor conversacional propio.",
            "La organización solo tiene licencia base ('Survey Response Pack') y no puede subir a Starter/Growth.",
            "El caso de uso es un formulario simple que no requiere branching ni display logic — un formulario nativo del sitio sirve.",
          ],
        },
      ],
    },
    {
      id: "sources",
      eyebrow: "Referencias",
      title: "Fuentes oficiales",
      blocks: [
        {
          type: "sources",
          items: [
            {
              label: "Salesforce Feedback Management Developer Guide",
              url: "https://developer.salesforce.com/docs/atlas.en-us.salesforce_feedback_management_dev_guide.meta/salesforce_feedback_management_dev_guide/",
            },
            {
              label: "Surveys for Unauthenticated Participants",
              url: "https://developer.salesforce.com/docs/atlas.en-us.salesforce_feedback_management_dev_guide.meta/salesforce_feedback_management_dev_guide/salesforce_surveys_for_unauthenticated_participants.htm",
            },
            {
              label: "Set Up Your Environment · unAuth APIs",
              url: "https://developer.salesforce.com/docs/atlas.en-us.salesforce_feedback_management_dev_guide.meta/salesforce_feedback_management_dev_guide/surveys_set_up_your_environment_unauth_apis.htm",
            },
            {
              label: "Get Access Token · unAuth APIs",
              url: "https://developer.salesforce.com/docs/atlas.en-us.salesforce_feedback_management_dev_guide.meta/salesforce_feedback_management_dev_guide/salesforce_surveys_get_access_token_unauth_apis.htm",
            },
            {
              label: "Create and Submit Surveys · unAuth APIs",
              url: "https://developer.salesforce.com/docs/atlas.en-us.salesforce_feedback_management_dev_guide.meta/salesforce_feedback_management_dev_guide/surveys_resources_create_submit_surveys_unauth_apis.htm",
            },
            {
              label: "Survey Response Input · unAuth",
              url: "https://developer.salesforce.com/docs/atlas.en-us.salesforce_feedback_management_dev_guide.meta/salesforce_feedback_management_dev_guide/surveys_requests_survey_response_input_unauth_apis.htm",
            },
            {
              label: "Survey Response Output · unAuth",
              url: "https://developer.salesforce.com/docs/atlas.en-us.salesforce_feedback_management_dev_guide.meta/salesforce_feedback_management_dev_guide/surveys_responses_survey_response_output_unauth_apis.htm",
            },
            {
              label: "SurveyInvitation · SObject Reference",
              url: "https://developer.salesforce.com/docs/atlas.en-us.salesforce_feedback_management_dev_guide.meta/salesforce_feedback_management_dev_guide/sforce_api_objects_surveyinvitation.htm",
            },
            {
              label: "SurveySubject · SObject Reference (para Sprint 2)",
              url: "https://developer.salesforce.com/docs/atlas.en-us.salesforce_feedback_management_dev_guide.meta/salesforce_feedback_management_dev_guide/sforce_api_objects_surveysubject.htm",
            },
            {
              label: "Feedback Management License Comparison",
              url: "https://help.salesforce.com/s/articleView?id=xcloud.concept_add_on_license.htm&type=5",
            },
            {
              label: "Insight base — Headless Salesforce Feedback Management",
              url: "/es/insights/headless-feedback-management-salesforce",
            },
          ],
        },
      ],
    },
  ],
};

const agentforceInAppUserVerification: Recipe = {
  slug: "agentforce-in-app-user-verification",
  title:
    "Auth passthrough móvil → Agentforce chat — User Verification en MIAW con JWT firmado",
  problemOneLiner:
    "El cliente ya hizo login en la app móvil (auth propia, no SF). Al abrir el chat de Agentforce embebido, la conversación arranca anónima y el agente no sabe quién escribe. Queremos que sepa desde el turno 0, sin re-autenticar.",
  approach: "hybrid",
  tags: [
    "Agentforce",
    "MIAW",
    "Messaging for In-App and Web",
    "User Verification",
    "JWT",
    "RS256",
    "iOS SDK",
    "Android SDK",
    "Auth passthrough",
    "Pre-chat",
  ],
  audiences: ["admin", "developer", "architect"],
  author: "Jonathan Gomez",
  authorRole: "Agentforce Enterprise Architect",
  publishedAt: "2026-08-17",
  updatedAt: "2026-08-17",
  readingMinutes: 18,
  tldr: [
    "La solución correcta es User Verification de Messaging for In-App and Web (MIAW) — el nombre viejo era 'Authenticated Conversations'; si buscas por ese término te vas a perder los docs actuales.",
    "El customer firma un JWT (RS256 o RS512, asimétrico — HMAC no está soportado) en su backend con su private key; la public key vive en Salesforce dentro del Auth Method del deployment.",
    "El SDK móvil (iOS/Android) entrega el JWT vía un delegate/provider al que MIAW le pide el token cuando lo necesita. El SDK web usa 'setIdentityToken' (no 'setAuthorizationToken' — ese es el nombre viejo).",
    "MIAW valida la firma, resuelve el subject contra un Contact/PersonAccount/User de Salesforce y liga la Messaging Session a ese registro. Agentforce recibe el contexto y puede saludar por nombre desde el turno 0.",
    "El truco del pre-chat hidden field NO es una autenticación — es data set por el cliente, no verificable. Sirve para enriquecer contexto pero jamás para identificar. Se documenta como anti-patrón.",
    "Regla fuerte de MIAW: un deployment atiende usuarios verified O unverified; no se mezclan. Decidí eso desde el diseño.",
  ],
  sections: [
    {
      id: "problem",
      eyebrow: "El problema",
      title: "Por qué el chat arranca anónimo y qué pierdes con eso",
      defaultOpen: true,
      blocks: [
        {
          type: "problem",
          symptom:
            "El cliente hace login en la app móvil del negocio (auth propia, no Salesforce). Abre el componente de chat con Agentforce embebido vía MIAW. La conversación arranca anónima: el agente no sabe quién es, saluda genérico ('Hola, ¿en qué te ayudo?') y — peor — le pide datos que la app ya conoce (nombre, DNI, número de póliza).",
          rootCause:
            "MIAW, por default, trata cada conversación nueva como anónima. El SDK móvil y el SDK web no comparten cookies ni tokens con la capa de auth del negocio. Salesforce no tiene forma de saber que el usuario ya se autenticó afuera a menos que el customer se lo demuestre — con una firma criptográfica, no con un simple dato.",
          impact:
            "Fricción alta: doble autenticación percibida, saludo despersonalizado, agente que pide datos redundantes, más turnos hasta la resolución. En verticales regulados (banca, salud, telco) incluso obliga a validaciones extra por cumplimiento — cuando la app ya lo hizo mejor upstream.",
        },
        {
          type: "callout",
          tone: "note",
          title: "Rename importante",
          text: "Hasta 2024/2025 esta feature se llamaba 'Authenticated Conversations'. En la doc actual el término canónico es 'User Verification'. Si buscas por el nombre viejo vas a caer en material desactualizado y en el método SDK viejo 'setAuthorizationToken', que ya no es el que se usa.",
        },
      ],
    },
    {
      id: "options",
      eyebrow: "Los tres caminos posibles",
      title: "Sin auth, pre-chat hidden field, o User Verification",
      defaultOpen: true,
      blocks: [
        {
          type: "paragraph",
          text: "Antes de entrar al detalle, aclaramos las tres opciones que tiene un customer que quiere resolver esto. Solo una es una autenticación real.",
        },
        {
          type: "comparison",
          standardLabel: "Pre-chat hidden field (anti-patrón)",
          customLabel: "User Verification con JWT (correcto)",
          rows: [
            {
              dimension: "Qué se envía",
              standard:
                "Un valor plano (por ejemplo customerId=12345) inyectado como hidden field del pre-chat form. Data cualquiera, sin firma.",
              custom:
                "Un JWT firmado con la private key del customer. Salesforce valida con la public key. El contenido es no falsificable.",
            },
            {
              dimension: "Verificación server-side",
              standard:
                "Ninguna. Salesforce confía en el valor que llega. Un cliente malicioso puede setear el customerId de otro usuario y suplantarlo.",
              custom:
                "Salesforce recalcula la firma del JWT con la public key del Auth Method. Si la firma no valida, la sesión se rechaza.",
            },
            {
              dimension: "Vinculación al CRM",
              standard:
                "No vincula. El campo llega como texto libre a la Messaging Session; hay que resolver manualmente contra Contact/Account.",
              custom:
                "El subject del JWT se resuelve contra un campo (typ. External Id) de Contact / PersonAccount / User. La Messaging Session queda linkeada a ese record automáticamente.",
            },
            {
              dimension: "Contexto que ve Agentforce",
              standard:
                "Un valor de texto sin identidad. El agente no puede confiar en él para decisiones sensibles (mostrar datos, ejecutar acciones a nombre del usuario).",
              custom:
                "El agente ve el Contact/Person Account real. Puede usar sus datos en el saludo, en las variables del topic, y en las acciones que ejecute.",
            },
            {
              dimension: "Cuándo usarlo",
              standard:
                "Solo como enriquecimiento de contexto no sensible — por ejemplo, pre-poblar la pantalla que ve el asesor humano con el país de origen del cliente.",
              custom:
                "Cualquier caso donde la identidad del usuario debe ser fiable — que es prácticamente el 100% de los casos de negocio.",
            },
          ],
        },
        {
          type: "callout",
          tone: "critical",
          title: "El pre-chat hidden field NO es una autenticación",
          text: "Un campo 'hidden' del pre-chat form solo está oculto de la UI. Un atacante puede modificarlo con DevTools en web, o interceptar la petición con un proxy en móvil. Es data set por el cliente, no verificable por Salesforce. Si te suena tentador porque es más simple, es porque estás resolviendo un problema distinto — enriquecimiento — no autenticación.",
        },
      ],
    },
    {
      id: "user-verification-concept",
      eyebrow: "Cómo funciona User Verification",
      title: "El mecanismo: JWT firmado con private key del customer",
      defaultOpen: true,
      blocks: [
        {
          type: "concept",
          title: "Piezas del rompecabezas",
          peek: "Cinco piezas: private key en el backend del customer, public key en Salesforce, JWT firmado, SDK móvil que lo entrega, y el Auth Method que resuelve el subject.",
          blocks: [
            {
              type: "list",
              items: [
                "Par de llaves asimétricas — RS256 o RS512. El customer conserva la private key. La public key se sube a Salesforce (Cert & Key Management o directamente al Auth Method).",
                "JWT (JSON Web Token) — el pasaporte firmado. Emitido y firmado por el backend del customer con la private key. Salesforce valida la firma con la public key correspondiente.",
                "Auth Method (en Messaging Settings) — configuración en Salesforce que dice: 'para este deployment, acepto JWTs firmados con esta public key, y resuelvo el subject contra este campo de este objeto'.",
                "SDK móvil (iOS/Android) o Web SDK — el envoltorio que corre en la app del cliente. Expone un hook (delegate/provider en móvil, evento de expiración en web) que se dispara cuando MIAW necesita el JWT.",
                "MIAW runtime — recibe el JWT, valida firma y expiración, resuelve el subject contra el registro configurado, y liga la Messaging Session a ese Contact / PersonAccount / User.",
              ],
            },
          ],
        },
        {
          type: "concept",
          title: "Por qué firmado con private key (no HMAC)",
          peek: "MIAW User Verification exige asimétrico (RS256/RS512). HMAC (secreto compartido) NO está soportado.",
          blocks: [
            {
              type: "paragraph",
              text: "La razón práctica es que la private key nunca sale del backend del customer. Salesforce solo tiene la public key — con eso valida pero no puede firmar. Si Salesforce se comprometiera, un atacante no podría forjar JWTs válidos porque no tendría la private key. En un esquema HMAC, en cambio, la misma llave firma y verifica; si cualquiera de los dos lados se compromete, el atacante puede fabricar tokens legítimos.",
            },
            {
              type: "callout",
              tone: "info",
              title: "Consecuencia operativa",
              text: "El customer debe montar la infraestructura de firma: manejo seguro de la private key, rotación planificada, y un endpoint interno que la app llame para pedir un JWT recién firmado. En un cliente enterprise esto casi siempre ya existe (identity provider, KMS, HSM); en clientes más chicos hay que provisionar.",
            },
          ],
        },
        {
          type: "concept",
          title: "Regla fuerte: verified XOR unverified por deployment",
          peek: "Un deployment MIAW atiende usuarios verificados O usuarios anónimos. No los mezcla.",
          blocks: [
            {
              type: "paragraph",
              text: "Si tu app expone chat a usuarios logueados y a usuarios anónimos (por ejemplo un pre-sales chat que no requiere login), necesitas dos deployments: uno con User Verification requerido y otro sin. No se pueden mezclar en el mismo deployment. Tampoco se puede reutilizar un ConversationID entre deployments — cada uno tiene su propio scope de sesiones.",
            },
            {
              type: "callout",
              tone: "warning",
              title: "Decide desde el diseño",
              text: "Si el negocio tiene ambos casos (logueado y anónimo), plantea desde el arranque dos deployments con dos MessagingChannel independientes. Migrar después de estar en producción con uno solo obliga a reemitir configuración en el cliente móvil.",
            },
          ],
        },
      ],
    },
    {
      id: "end-to-end-flow",
      eyebrow: "Flujo end-to-end",
      title: "Del login en la app al 'Hola Jonathan' del agente",
      defaultOpen: true,
      blocks: [
        {
          type: "pipeline",
          title: "Secuencia completa",
          steps: [
            {
              component: "App móvil (login)",
              action:
                "El usuario abre la app del customer y se autentica con las credenciales del negocio (típ. OAuth contra el IdP corporativo). Recibe la sesión propia del customer.",
              note: "Esta capa es 100% del customer. Salesforce no participa.",
            },
            {
              component: "App móvil (usuario tap 'Chat')",
              action:
                "La app va a pedir un JWT específico para MIAW a su propio backend. La sesión que ya tiene el usuario autoriza esa petición.",
              note: "El JWT NO es la sesión de la app: es un token corto (típ. 5–15 min) emitido específicamente para el chat.",
            },
            {
              component: "Backend del customer (endpoint minter)",
              action:
                "Recibe la petición autenticada, arma los claims del JWT (iss, sub=customerId, aud, iat, exp), lo firma con la private key RS256/RS512 y lo devuelve.",
              note: "El sub debe matchear con el campo configurado en el Auth Method (típ. External Id de Contact o Email).",
            },
            {
              component: "SDK móvil (delegate/provider)",
              action:
                "El SDK dispara el hook userVerificationChallenge (Android) / userVerificationChallengeWithReason (iOS) cuando necesita el JWT. La app responde con el token recién obtenido del backend.",
              note: "El SDK NO llama al backend por vos: solo te avisa 'necesito un token'. La lógica de traerlo es tuya.",
            },
            {
              component: "MIAW runtime (Salesforce)",
              action:
                "Recibe el JWT vía el SDK. Valida firma con la public key del Auth Method, valida exp/iat, y resuelve el subject contra el campo configurado.",
              note: "Si falla cualquier paso, la sesión no arranca y el SDK dispara un error que la app debe manejar.",
            },
            {
              component: "MIAW → MessagingSession",
              action:
                "Crea (o reutiliza) la MessagingSession y la liga al Contact/PersonAccount/User resuelto. A partir de acá la conversación NO es anónima.",
            },
            {
              component: "Agentforce Service Agent",
              action:
                "Recibe el primer turno del usuario con el contexto de sesión ya poblado. Puede acceder al Contact desde las variables de contexto del topic y usarlas en el saludo y en cualquier acción downstream.",
              note: "El path exacto de la variable de contexto (algo como $Context.MessagingSession.MessagingEndUser.Contact) debe validarse abriendo el .agent en Studio del org destino — puede variar por release.",
            },
            {
              component: "SDK móvil (token expiration)",
              action:
                "Cuando el JWT está por expirar, MIAW dispara el evento onEmbeddedMessagingIdentityTokenExpired (web) o vuelve a invocar el delegate/provider (móvil). La app pide un nuevo JWT al backend y lo entrega dentro de la ventana permitida.",
              note: "En web la ventana para responder es 30 segundos: si no llega token fresco, la sesión termina.",
            },
          ],
        },
        {
          type: "architecture",
          title: "Arquitectura de alto nivel",
          diagram: `App móvil del customer
        │
        │  1. Login (IdP corporativo)
        ▼
Auth propia del negocio  ────────────────────┐
                                             │
        │  2. Usuario abre chat              │
        ▼                                    │
Backend del customer (Token Minter)          │
        │                                    │
        │  3. Firma JWT (RS256, private key) │
        ▼                                    │
Retorna JWT ────────────────────────────────►│
                                             │
        │  4. SDK dispara challenge          │
        ▼                                    ▼
MIAW SDK (iOS/Android/Web)            Cert & Key Mgmt
setIdentityToken / delegate               (public key)
        │                                    │
        │  5. JWT viaja al runtime           │
        ▼                                    │
MIAW Runtime en Salesforce  ◄────────────────┘
        │  6. Valida firma con public key
        │  7. Resuelve sub → Contact/PersonAccount
        ▼
MessagingSession vinculada al Contact
        │
        ▼
Agentforce Service Agent
"Hola Jonathan, ¿en qué te ayudo?"`,
          legend: [
            {
              label: "Token Minter",
              description:
                "Endpoint interno del customer que emite JWTs firmados. Autorizado por la sesión que la app ya tiene. La private key nunca sale de este componente.",
            },
            {
              label: "Cert & Key Mgmt",
              description:
                "Setup > Security > Certificate and Key Management (o directamente en el Auth Method). Almacena la public key que Salesforce usa para validar el JWT.",
            },
            {
              label: "MIAW Runtime",
              description:
                "El servicio de Salesforce que recibe el JWT, valida firma/expiración, resuelve el subject y liga la MessagingSession al registro correspondiente.",
            },
          ],
        },
      ],
    },
    {
      id: "jwt-structure",
      eyebrow: "El JWT",
      title: "Estructura del token que firma el customer",
      blocks: [
        {
          type: "paragraph",
          text: "Formato estándar JWT (header.payload.signature). El header declara el algoritmo (RS256/RS512) y el key id que apunta a la public key registrada en Salesforce. El payload transporta los claims. La firma es RSASSA con la private key.",
        },
        {
          type: "table",
          headers: ["Claim", "Requerido", "Contenido"],
          rows: [
            ["alg (header)", "sí", "RS256 o RS512. HS256/HMAC NO está soportado."],
            ["kid (header)", "recomendado", "Identifier de la key en Salesforce — necesario si registrás múltiples public keys por rotación."],
            ["iss", "sí", "Identificador del emisor. Debe coincidir con el issuer configurado en el Auth Method."],
            ["sub", "sí", "El identificador del usuario. Salesforce lo resuelve contra el campo configurado (típ. Contact.External_Id__c, PersonAccount.Email, User.Username)."],
            ["aud", "sí", "Audience. Debe coincidir con el aud configurado en el Auth Method (típ. la URL del org o un valor lógico definido en config)."],
            ["iat", "sí", "Issued-at, epoch seconds. Debe estar en el pasado próximo."],
            ["exp", "sí", "Expiration, epoch seconds. TTL corto — 5 a 15 minutos es lo típico; el máximo lo configurás en Messaging Settings > 'Authorization Token Expiration Time for Verified Users' (default 60 min)."],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Verificar en tu Setup",
          text: "Las claim names y el mapeo de subject dependen de la versión del Auth Method y de cómo lo configures. Lo listado arriba es el patrón estándar JWT; abrí Setup > Messaging Settings > tu Auth Method para confirmar los nombres exactos que espera tu deployment antes de escribir el minter del backend.",
        },
      ],
    },
    {
      id: "sdk-integration",
      eyebrow: "SDK móvil y web",
      title: "Cómo entregar el JWT desde cada plataforma",
      peek: "iOS, Android y Web tienen tres APIs distintas pero el mismo modelo mental: MIAW te pide el token, tu app lo entrega.",
      blocks: [
        {
          type: "paragraph",
          text: "Los tres SDKs implementan el mismo patrón: exponen un hook al que MIAW llama cuando necesita un token (al abrir la conversación y cuando el token está por expirar). El customer implementa ese hook, hace la llamada a su backend, y devuelve el JWT.",
        },
        {
          type: "concept",
          title: "Web SDK — embeddedservice_bootstrap",
          peek: "Método principal setIdentityToken. Evento onEmbeddedMessagingIdentityTokenExpired con ventana de 30 segundos.",
          blocks: [
            {
              type: "table",
              headers: ["Método / Evento", "Uso"],
              rows: [
                [
                  "embeddedservice_bootstrap.userVerificationAPI.setIdentityToken({identityTokenType: 'JWT', identityToken: jwt})",
                  "Llamar después de que dispare onEmbeddedMessagingReady. Registra el JWT para la sesión actual.",
                ],
                [
                  "onEmbeddedMessagingIdentityTokenExpired",
                  "Evento que dispara MIAW cuando el token está por expirar. Ventana de 30 segundos para llamar de nuevo a setIdentityToken con un token fresco.",
                ],
                [
                  "embeddedservice_bootstrap.userVerificationAPI.clearSession(true)",
                  "Logout. El parámetro true termina la auth session, no solo limpia el estado local del SDK.",
                ],
              ],
            },
          ],
        },
        {
          type: "concept",
          title: "iOS SDK ≥ 1.2.0 — MessagingInApp",
          peek: "Protocolo UserVerificationDelegate. La app conforma al protocolo y responde al challenge con el JWT.",
          blocks: [
            {
              type: "table",
              headers: ["Símbolo", "Uso"],
              rows: [
                [
                  "Configuration(url:, userVerificationRequired: true)",
                  "Init del SDK exigiendo verificación. El SDK no permite arrancar una conversación sin JWT.",
                ],
                [
                  "func userVerificationChallengeWithReason(_ reason:, completionHandler:)",
                  "Método del protocolo UserVerificationDelegate. El SDK lo invoca cuando necesita el token. La app pide el JWT a su backend y lo devuelve por el completionHandler.",
                ],
                [
                  "completionHandler(UserVerification(customerIdentityToken: jwt, type: .SMIAuthorizationTypeJWT))",
                  "Retorno del challenge. El type explícito es requerido — es una enum tipo JWT.",
                ],
                [
                  "coreClient.userVerificationDelegate = self",
                  "Wire up del delegate al core client durante la inicialización del SDK.",
                ],
                [
                  "CoreClient.revokeTokenAndDeregisterDevice",
                  "Logout desde iOS. Revoca el token en Salesforce y deregistra el device de push notifications.",
                ],
              ],
            },
          ],
        },
        {
          type: "concept",
          title: "Android SDK ≥ 1.2.0 — messaging-in-app",
          peek: "Interface UserVerificationProvider. Suspend function que devuelve el JWT dentro de una coroutine.",
          blocks: [
            {
              type: "table",
              headers: ["Símbolo", "Uso"],
              rows: [
                [
                  "CoreConfiguration.fromFile(context, 'config.json', true)",
                  "El tercer parámetro (isUserVerificationRequired) marca el SDK como verified-only.",
                ],
                [
                  "suspend fun userVerificationChallenge(reason: ChallengeReason): UserVerificationToken",
                  "Método del interface UserVerificationProvider. Se implementa como suspend function; dentro se hace la llamada al backend con Retrofit/OkHttp para obtener el JWT.",
                ],
                [
                  "return UserVerificationToken(UserVerificationType.JWT, jwt)",
                  "Retorno del challenge. Explicit type JWT.",
                ],
                [
                  "coreClient.registerUserVerificationProvider(provider)",
                  "Wire up del provider al core client durante la inicialización del SDK.",
                ],
                [
                  "CoreClient.revokeToken",
                  "Logout desde Android.",
                ],
              ],
            },
          ],
        },
        {
          type: "callout",
          tone: "critical",
          title: "Nombre viejo que ya NO funciona",
          text: "Si buscas 'setAuthorizationToken' en docs o Stack Overflow vas a encontrar posts de 2023/2024 que hablan del método viejo del Web SDK. El nombre actual es setIdentityToken. Si el customer tiene código legacy con el nombre viejo, hay que migrarlo — no basta con actualizar el SDK.",
        },
      ],
    },
    {
      id: "salesforce-setup",
      eyebrow: "Setup en Salesforce",
      title: "Pasos para levantar el Auth Method y ligar al deployment",
      peek: "El path exacto de Setup puede haber cambiado con releases recientes. Los pasos que siguen son la secuencia lógica — validá cada uno en el Setup del org antes de dar valores por confirmados.",
      blocks: [
        {
          type: "callout",
          tone: "warning",
          title: "Sobre los paths exactos de Setup",
          text: "Las pantallas específicas de Setup para User Verification (Auth Methods) están en help.salesforce.com y se renderizan con JS — no las pude validar programáticamente. Los pasos siguen el patrón conocido de otros features de MIAW, pero validá los nombres exactos en tu Setup al levantar el ambiente. Los references al final apuntan a la doc oficial.",
        },
        {
          type: "setupStep",
          number: 1,
          title: "Subir la public key del customer a Salesforce",
          instructions:
            "Setup > Security > Certificate and Key Management. Import de un certificate self-signed o CA-signed que contenga la public key del par que el customer usará para firmar. Anotar el Unique Name / Label del certificate.",
        },
        {
          type: "setupStep",
          number: 2,
          title: "Crear el MIAW deployment (o abrir uno existente)",
          instructions:
            "Setup > Feature Settings > Service > Messaging > Messaging Settings > New Custom Client (o el existente que atenderá usuarios verificados). Elegir Deployment Type según la plataforma (Custom Client for In-App / Custom Client for Web).",
        },
        {
          type: "setupStep",
          number: 3,
          title: "Crear el Auth Method (User Verification)",
          instructions:
            "Dentro del deployment, ir a la sección de Authentication Methods (nombre exacto: 'User Verification' o 'Authentication Methods' según release). New. Configurar: Identity Token Type = JWT, Algorithm = RS256 o RS512, Public Key = el certificate del paso 1, Issuer (iss) = valor acordado con el customer, Audience (aud) = valor acordado, Subject Field Mapping = objeto y campo contra el que se resuelve el sub del JWT (típ. Contact + External_Id__c).",
        },
        {
          type: "setupStep",
          number: 4,
          title: "Asociar el Auth Method al deployment",
          instructions:
            "En el deployment, marcarlo como requiring User Verification y elegir el Auth Method recién creado como el método aceptado.",
        },
        {
          type: "setupStep",
          number: 5,
          title: "Ajustar el token expiration window",
          instructions:
            "Setup > Messaging Settings > 'Authorization Token Expiration Time for Verified Users'. Default 60 min. Bajarlo a un valor razonable para tu app (5–15 min es lo típico). El TTL del JWT del customer debe ser menor o igual a este valor.",
        },
        {
          type: "setupStep",
          number: 6,
          title: "Ligar el deployment al Messaging Channel + Omni-Channel Flow",
          instructions:
            "El MessagingChannel es lo que conecta el deployment al Agentforce Service Agent vía un Omni-Channel Flow (Route Work → Agent). Si ya tenías un deployment con Agentforce funcionando sin verificación, esta parte no cambia — solo se agrega el Auth Method arriba.",
        },
        {
          type: "setupStep",
          number: 7,
          title: "Preparar el minter en el backend del customer",
          instructions:
            "Endpoint interno protegido por la sesión de la app. Cada request devuelve un JWT firmado con la private key (RS256/RS512), con sub = customer identifier, iss/aud consistentes con el Auth Method, y exp en 5–15 min.",
        },
        {
          type: "setupStep",
          number: 8,
          title: "Integrar el SDK móvil / web",
          instructions:
            "En iOS, conformar al UserVerificationDelegate. En Android, registrar el UserVerificationProvider. En Web, escuchar onEmbeddedMessagingReady y llamar setIdentityToken. Ver la sección 'SDK móvil y web' para los métodos exactos por plataforma.",
        },
        {
          type: "setupStep",
          number: 9,
          title: "Probar con un Contact real",
          instructions:
            "Antes de habilitar auto-create (si aplica), probá con un JWT cuyo sub matchee con un Contact que ya existe en Salesforce. Confirmá que la MessagingSession queda vinculada a ese Contact y que el agente puede leerlo desde el topic.",
        },
      ],
    },
    {
      id: "agent-context",
      eyebrow: "Del lado del Agent",
      title: "Cómo el .agent lee la identidad del usuario",
      blocks: [
        {
          type: "paragraph",
          text: "Una vez que User Verification vincula la MessagingSession al Contact/PersonAccount, ese contexto queda disponible para el Agentforce Service Agent asociado al deployment. El path exacto de la variable de contexto depende de la versión del framework y del .agent que tengas — no lo hardcodees desde memoria, abrilo en Studio.",
        },
        {
          type: "list",
          items: [
            "En el .agent authoring bundle, revisar las Context Variables definidas: típicamente hay una que refleja el MessagingEndUser resuelto y otra que expone el Contact/PersonAccount asociado.",
            "En las instructions del topic, referenciar esas variables directamente para el saludo — por ejemplo 'Saluda al usuario por su nombre usando {!$Context.Contact.FirstName}'. Confirmar la sintaxis exacta en tu bundle.",
            "En las invocable actions y prompt templates que el agente ejecute, pasar la referencia al Contact como input variable. Esto evita re-lookups y garantiza que todas las acciones operan sobre el mismo registro identificado.",
            "Si vas a hacer decisiones sensibles (mostrar saldo, cambiar datos), no confíes solo en el saludo — hacé re-check del Contact.Id en cada acción invocable con un SOQL simple. La sesión está autenticada, pero el diseño defensive-in-depth vale.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Prompt Template con EndUser input",
          text: "Un patrón práctico es tener un Prompt Template auxiliar con un EndUser (Contact/PersonAccount) input variable. Todas las acciones del agente que necesiten datos del usuario invocan ese template pasándole el ID resuelto, y el template resuelve nombre, saldo, plan, etc. desde SOQL. Centralizás el acceso a datos del usuario en un solo lugar.",
        },
      ],
    },
    {
      id: "security",
      eyebrow: "Seguridad",
      title: "Qué protege este diseño y qué NO protege",
      blocks: [
        {
          type: "table",
          headers: ["Amenaza", "Cubierto por User Verification", "Nota"],
          rows: [
            ["Suplantación (fabricar sub de otro usuario)", "Sí", "El JWT firmado con la private key es infalsificable sin acceder al backend del customer."],
            ["Man-in-the-middle en tránsito", "Sí (asumiendo TLS)", "Todo va sobre HTTPS. El JWT viaja en el channel del SDK, cifrado en transporte."],
            ["Replay de un JWT viejo", "Sí (por exp)", "El claim exp corto (5–15 min) limita la ventana de replay. Un TTL más largo relaja esta garantía."],
            ["Robo de la private key del customer", "NO", "Si la private key se filtra, un atacante puede firmar JWTs a nombre de cualquier usuario hasta que rotes el par de llaves. Manejo con KMS/HSM es lo esperado."],
            ["Cliente móvil comprometido (root/jailbreak)", "Parcial", "El SDK confía en el backend del customer. Si el device está rooteado, el atacante puede leer memoria y potencialmente el JWT vigente. TTL corto mitiga."],
            ["Sesión anónima paralela", "Diseñado XOR", "Deployment verified NO acepta usuarios anónimos. Si necesitas ambos, dos deployments separados."],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "La private key es el activo crítico",
          text: "Todo el modelo de confianza descansa en que la private key nunca sale del backend del customer. Almacenarla en un KMS/HSM, rotarla en cadencia (típicamente anual o al cambiar personal), y auditar quién puede acceder al servicio de firma son prácticas no-negociables. Si la private key se compromete, hay que rotarla en Salesforce (subir el nuevo public key + retirar el viejo) y en el minter del customer.",
        },
      ],
    },
    {
      id: "tradeoffs",
      eyebrow: "Trade-offs",
      title: "Cuándo usar User Verification, y cuándo no vale la pena",
      blocks: [
        {
          type: "tradeoffs",
          pros: [
            "Identidad verificable server-side — es la única forma legítima de hacer auth passthrough en MIAW.",
            "Vinculación automática al Contact/PersonAccount — nada de resolver manualmente contra el CRM.",
            "El agente arranca con contexto completo desde el turno 0 — mejor experiencia y menos turnos hasta la resolución.",
            "Feature 100% estándar de Salesforce — sin desarrollo custom del lado del org.",
            "Compatible con reports y auditoría — todas las MessagingSession quedan trazables al Contact real.",
          ],
          cons: [
            "Requiere infraestructura de firma en el customer — endpoint minter, manejo seguro de private key, rotación planificada.",
            "Verified XOR unverified — si el negocio tiene ambos casos, necesitas dos deployments.",
            "TTL corto obliga a implementar el refresh handler en el SDK — no es solo 'setear una vez y olvidar'.",
            "Debug más complejo cuando algo falla — errores como 'invalid subject' o 'signature verification failed' requieren correlacionar backend del customer + Auth Method config + payload del JWT.",
            "Solo RS256/RS512 — si el customer solo tiene infraestructura HMAC, hay que provisionar par de llaves asimétricas nueva.",
          ],
          whenToUse: [
            "La app móvil tiene login propio y la conversación con el agente debe operar como usuario identificado.",
            "El caso de uso incluye acciones sensibles (consultar saldo, cambiar datos, tramitar solicitudes).",
            "El customer ya tiene o puede montar KMS/HSM y un identity provider maduro.",
          ],
          whenNotToUse: [
            "El chat es puramente pre-sales / anónimo — no hay identidad que traspasar.",
            "El customer no puede montar el endpoint minter — sin backend firmante, no hay verificación.",
            "El caso de uso es un enriquecimiento no-sensible — pre-chat hidden field alcanza y es más simple.",
          ],
        },
      ],
    },
    {
      id: "troubleshooting",
      eyebrow: "Troubleshooting",
      title: "Fallos comunes al levantar la integración",
      blocks: [
        {
          type: "troubleshoot",
          rows: [
            {
              issue: "La conversación arranca pero el agente sigue anónimo",
              solution:
                "Confirmar que el deployment tiene el Auth Method asociado y marcado como requerido. Sin eso, MIAW acepta la conversación pero la trata como anónima. Verificar también que el SDK está llamando setIdentityToken / respondiendo al challenge — un console.log del token entregado ayuda.",
            },
            {
              issue: "Error 'invalid signature' o 'signature verification failed'",
              solution:
                "El JWT se firma con private key que no matchea la public key del Auth Method. Confirmar que subiste el certificate correcto y que el alg del JWT (RS256/RS512) coincide con el configurado. Un cambio de kid sin registrar la nueva key es la causa típica.",
            },
            {
              issue: "Error 'invalid subject' o 'user not found'",
              solution:
                "El sub del JWT no matchea el campo configurado en el Auth Method. Si el subject field es Contact.External_Id__c, el sub debe coincidir con un Contact con ese valor. Casos frecuentes: campos con distinto case-sensitivity, valores con whitespace, o el Contact simplemente no existe (habilitar auto-create si aplica).",
            },
            {
              issue: "Error 'token expired' al primer mensaje",
              solution:
                "Diferencia de reloj entre backend del customer y Salesforce. Confirmar que el minter emite iat en tiempo actual y exp con TTL positivo. Un skew mayor a ~30 segundos suele romper la validación.",
            },
            {
              issue: "Web SDK: la sesión termina después de un turno largo",
              solution:
                "El JWT expiró y el listener onEmbeddedMessagingIdentityTokenExpired no respondió en 30 segundos. Confirmar que el handler está registrado antes de setIdentityToken y que el backend del customer puede emitir un token nuevo en menos de esa ventana.",
            },
            {
              issue: "iOS: el delegate no se dispara",
              solution:
                "coreClient.userVerificationDelegate no está seteado, o el Configuration se inicializa sin userVerificationRequired: true. Confirmar el wiring en el init del SDK y que el delegate sobrevive al lifecycle (retain).",
            },
            {
              issue: "Android: 'no verification provider registered'",
              solution:
                "El CoreConfiguration está marcado como isUserVerificationRequired=true pero coreClient.registerUserVerificationProvider(...) no se llamó antes de arrancar la conversación. Orden de inicialización importa.",
            },
            {
              issue: "El agente no ve al Contact aunque la MessagingSession está linkeada",
              solution:
                "Confirmar en el .agent que el topic tiene la Context Variable correcta (visibility External si se referencia desde una GenAiFunction). Si el bundle es viejo, puede necesitar regenerarse.",
            },
          ],
        },
      ],
    },
    {
      id: "sources",
      eyebrow: "Referencias",
      title: "Documentación oficial verificada",
      blocks: [
        {
          type: "sources",
          items: [
            {
              label: "Messaging for Web SDK — userVerificationAPI reference",
              url: "https://developer.salesforce.com/docs/service/messaging-web/references/m4w-reference/userVerificationAPI.html",
            },
            {
              label: "Messaging for Web SDK — API overview",
              url: "https://developer.salesforce.com/docs/service/messaging-web/guide/api-overview.html",
            },
            {
              label: "Messaging for Web SDK — User Verification guide",
              url: "https://developer.salesforce.com/docs/service/messaging-web/guide/user-verification.html",
            },
            {
              label: "Messaging for In-App iOS — User Verification",
              url: "https://developer.salesforce.com/docs/service/messaging-in-app/guide/ios-user-verification.html",
            },
            {
              label: "Messaging for In-App Android — User Verification",
              url: "https://developer.salesforce.com/docs/service/messaging-in-app/guide/android-user-verification.html",
            },
            {
              label: "Salesforce Help — User Verification (buscar por término actual)",
              url: "https://help.salesforce.com/s/articleView?id=service.user_verification.htm",
            },
          ],
        },
      ],
    },
  ],
};

export const buildRecipes: Recipe[] = [
  whatsappAttachmentsCustom,
  whatsappV2Handoff,
  whatsappLightweightInterception,
  agentforceVoiceHandoffHumano,
  headlessFeedbackManagement,
  agentforceInAppUserVerification,
];

export function getRecipe(slug: string): Recipe | undefined {
  return buildRecipes.find((r) => r.slug === slug);
}
