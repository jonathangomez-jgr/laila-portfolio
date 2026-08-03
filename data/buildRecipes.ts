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

export const buildRecipes: Recipe[] = [
  whatsappAttachmentsCustom,
  whatsappV2Handoff,
  whatsappLightweightInterception,
];

export function getRecipe(slug: string): Recipe | undefined {
  return buildRecipes.find((r) => r.slug === slug);
}
