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

export const buildRecipes: Recipe[] = [whatsappAttachmentsCustom];

export function getRecipe(slug: string): Recipe | undefined {
  return buildRecipes.find((r) => r.slug === slug);
}
