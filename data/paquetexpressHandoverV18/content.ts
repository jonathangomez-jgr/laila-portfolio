// Contenido curado del handover V18: lectura funcional del agente y catálogo de acciones.
// Fuente de verdad técnica: Agent Script Paquete_Express_vX_18 + auditoría read-only
// del sandbox qa2020 (2026-10-20). Ver inventory.generated.ts para el inventario completo.
import type { ActionDoc, HandoverDoc, SubagentDoc } from "./types";

export const meta: HandoverDoc["meta"] = {
  agentLabel: "Paquetexpress vX",
  developerName: "Paquete_Express_vX",
  botDefinitionId: "0Xxdh0000005iq1CAA (sandbox)",
  botVersion: "v18 · Active (0X9dh0000004yX3CAI)",
  bundle: "AiAuthoringBundle Paquete_Express_vX_18 · versionTag \"Version 9.2 final\"",
  versionTag: "Version 9.2 final",
  sourceOrg: "paquetexpress--qa2020 (sandbox, Org Id 00Ddh000001pK4BEAU) · refrescado desde producción 00D2E0000013ExD",
  auditDate: "2026-10-20",
  builder: "Agentforce Builder · Agent Script (agentDSLEnabled=true). No es Builder legacy: los topics/plugins del planner se compilan al publicar.",
  model: "sfdc_ai__DefaultGPT4Omni (agente) · FAQ_Search usa sfdc_ai__DefaultGPT5 · Case_Summary_Agentforce usa sfdc_ai__DefaultGPT5Mini",
  locale: "es_MX (secundario es)",
  agentUser: "agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (profile Einstein Agent User)",
  readiness: "No listo",
  readinessSummary:
    "La V18 funciona en el sandbox, pero hoy no se puede promover sin cambios: hay un token del API de cotización en el código, cobertura de Apex registrada en 0%, IDs del sandbox en el flow de entrada de WhatsApp, un retriever de Data Cloud que no es portable y un usuario de agente con username de sandbox. Con esos 9 bloqueantes cerrados (ver Go/No-Go), el despliegue es reproducible siguiendo el runbook.",
};

export const overview: HandoverDoc["overview"] = {
  purpose:
    "Agente de servicio (Agentforce Service Agent) que atiende a clientes de Paquetexpress por WhatsApp y chat web. Verifica al cliente con nombre, correo y teléfono; cotiza envíos nacionales contra el API de Paquetexpress; registra solicitudes de cotización internacional; rastrea guías; responde preguntas frecuentes con una Data Library de Data Cloud; entrega ligas oficiales de sucursales y empleo; crea, consulta y comenta casos, y transfiere a un asesor humano por Omni-Channel dentro del horario de atención. Cada interacción relevante deja un caso en Salesforce para métricas (\"portería\").",
  scope: [
    "Verificación del cliente (busca o crea el Contacto por correo).",
    "Cotización nacional (CP origen/destino validados por API, paquete o sobre, servicios RAD/EAD/seguro) y caso de cotización.",
    "Cotización internacional: solo captura país destino, crea caso y ofrece transferencia.",
    "Rastreo de envíos por número de guía y caso de portería; caso de reclamación solo si el cliente lo pide.",
    "Preguntas frecuentes (FAQ_Search con grounding) y respuestas fijas para 6 temas.",
    "Sucursales y empleo: ligas oficiales fijas + caso de portería.",
    "Gestión de casos: abrir caso explícito, consultar por número, listar casos del contacto, agregar comentario.",
    "Escalamiento a asesor humano con validación de horario (Business Hours \"Horario Paquete\").",
  ],
  outOfScope: [
    "Recolección a domicilio (RAD) conversacional: la V18 NO incluye el subagente RAD_Management ni las acciones Glp*. Ese flujo vive en la V19 (Draft) y no forma parte de este pase.",
    "Canal de voz: el Agent Script tiene instrucciones de voz, pero la V18 solo declara las conexiones messaging y customer_web_client.",
    "Knowledge de Salesforce: está habilitado en el org pero la V18 no lo usa (sin knowledge action ni RAG configurado en el agente).",
  ],
  channels: [
    { name: "WhatsApp (Enhanced)", detail: "Canal WHATSAPP_US_889770550884886. Entra por el Omni Flow Routes_to_Messaging_Agent, que enruta al agente por copilotId. 156 sesiones en 30 días en el sandbox." },
    { name: "Web messaging (Embedded)", detail: "Canal fde_Web_messaging ligado directo al agente (sessionHandlerAsa=Paquete_Express_vX), sin autenticación (UnAuth). 140 sesiones en 30 días en el sandbox." },
    { name: "Escalamiento humano", detail: "Ambas conexiones escalan por flow://FDE_Route_to_ASA a la cola \"WhatsApp\" (PaquetePrueba) por el canal de servicio sfdc_livemessage." },
  ],
  keyFacts: [
    { label: "Subagentes", value: "10 + enrutador (start_agent)" },
    { label: "Acciones que invocan recursos", value: "18 definiciones (17 destinos únicos) + ruta de escalamiento" },
    { label: "Acciones internas (Agent Script)", value: "Capturas @utils.setVariables, transiciones y escalate" },
    { label: "Flows propios", value: "12 autolaunched + 2 Omni (escalamiento y entrada WhatsApp)" },
    { label: "Apex", value: "5 clases productivas + 4 tests + 4 mocks" },
    { label: "Prompt templates", value: "FAQ_Search (grounding Data Cloud) · Case_Summary_Agentforce" },
    { label: "APIs externas", value: "3 endpoints en cc.paquetexpress.com.mx (rastreo, cotización, código postal)" },
    { label: "Objeto principal", value: "Case (6 record types) + Contact" },
  ],
};

export const architectureMermaid = `flowchart LR
  subgraph CH["Canales"]
    WA["WhatsApp<br/>Routes_to_Messaging_Agent"]
    WEB["Web messaging<br/>fde_Web_messaging"]
  end
  subgraph AG["Paquete_Express_vX · v18"]
    R(["agent_router<br/>Enrutador"])
    CV["Customer_Verification"]
    QM["Quote_Management"]
    IQ["International_Quote_Management"]
    OM["Orden_Management"]
    CM["CaseManagement_v2"]
    GI["General_Information_Management"]
    JS["Job_Search"]
    ES["Escalation_v2"]
    AQ["ambiguous_question"]
    OT["off_topic"]
  end
  WA --> R
  WEB --> R
  R -->|"isVerified != True"| CV
  CV -->|"pendingIntent"| R
  R --> QM
  R --> IQ
  R --> OM
  R --> CM
  R --> GI
  R --> JS
  R --> ES
  R --> AQ
  R --> OT
  QM -->|"International"| IQ
  IQ -->|"acepta transferencia"| ES
  IQ -->|"nueva cotización"| QM
  OM --> ES
  CM --> OM
  CM --> ES
  CM --> GI
  ES -->|"escalate (dentro de horario)"| OMNI[["FDE_Route_to_ASA<br/>cola WhatsApp"]]
`;

export const dependencyMermaid = `flowchart LR
  subgraph SA["Subagentes"]
    CV["Verificación"]
    QM["Cotización"]
    IQ["Cot. internacional"]
    OM["Órdenes"]
    CM["Casos"]
    GI["Info general"]
    JS["Empleo/Sucursales"]
    ES["Escalamiento"]
  end
  CV --> F1["AG_Get_and_create_contact"]
  QM --> F12["PE_GetValidOriginPostalCode"]
  QM --> F11["PE_GetValidDestinationPostalCode"]
  QM --> F9["Obtener_Cotizaci_n_Paqueter_a"]
  QM --> F4["Crea_caso_cotizacion_nacional"]
  IQ --> F3["Crea_caso_cotizacion_internacional"]
  OM --> F10["PE_GetOrderStatus"]
  OM --> F5["Crea_caso_seguimiento_de_una_orden"]
  OM --> F6["Crea_caso_solicitud_de_servicio"]
  CM --> F6
  CM --> T["SvcCopilotTmpl__ (3 plantillas)"]
  GI --> PT1["FAQ_Search"]
  JS --> PT1
  GI --> F8["Create_case_Agent_paquete"]
  JS --> F7["Crea_caso_ver_sucursales"]
  JS --> F2["Crea_caso_b_squeda_de_empleo"]
  ES --> A1["CheckBusinessHours"]
  ES --> RT["FDE_Route_to_ASA"]
  F12 --> A4["validaCodigo2"]
  F11 --> A4
  F9 --> A2["CotizacionEnvioV2"]
  F10 --> A3["RastreoEnvio"]
  F5 --> A5["CaseSummaryAgentforceInvocable"]
  A5 --> PT2["Case_Summary_Agentforce"]
  A2 --> API[("API cc.paquetexpress.com.mx")]
  A3 --> API
  A4 --> API
  PT1 --> RET["Retriever ADL_LibreriaDeDatos<br/>(Data Cloud)"]
  A1 --> BH["Business Hours<br/>Horario Paquete"]
  F1 --> ACC["Account<br/>7 PUBLICO GENERAL"]
  RT --> Q["Queue PaquetePrueba<br/>+ sfdc_livemessage"]
  F2 --> CASE[("Case · 6 record types")]
  F3 --> CASE
  F4 --> CASE
  F5 --> CASE
  F6 --> CASE
  F7 --> CASE
  F8 --> CASE
  CASE --> WF["WF Ticket Cerrado<br/>Trigger Ticket"]
`;

export const generalConfig: HandoverDoc["generalConfig"] = [
  { label: "Tipo de agente", value: "AgentforceServiceAgent (BotDefinition AgentType EinsteinServiceAgent, Type ExternalCopilot)" },
  { label: "Construcción", value: "Agent Script (AiAuthoringBundle). El planner GenAiPlannerBundle Paquete_Express_vX_v18 se genera al publicar." },
  { label: "Usuario de ejecución", value: "default_agent_user = agentforce_paquete_express@00d2e0000013exd.ext.qa2020 (también en Bot.botUser)" },
  { label: "Modelo", value: "model://sfdc_ai__DefaultGPT4Omni" },
  { label: "Idioma", value: "default_locale es_MX · additional_locales es" },
  { label: "Mensaje de bienvenida", value: "\"Hola. Soy el asistente de servicio de IA de Paquetexpress. Para continuar con su solicitud, compártame su nombre completo y correo electrónico, por favor.\"" },
  { label: "Mensaje de error", value: "\"Lo siento, parece que algo ha salido mal.\"" },
  { label: "Mensaje de escalamiento", value: "\"Un momento mientras lo conecto con el próximo representante de servicio disponible.\" (ambas conexiones)" },
  { label: "Conexiones", value: "messaging y customer_web_client → outbound_route flow://FDE_Route_to_ASA (OmniChannelFlow), adaptive_response_allowed False" },
  { label: "Knowledge", value: "citations_enabled False · rag_feature_config_id vacío (no usa Knowledge)" },
  { label: "Clasificador de seguridad", value: "additional_parameter__safety_classifier_prompt_version v1 · descripción con #DisableURLRedaction#" },
  { label: "Variables", value: "59 mutables + 7 enlazadas (MessagingSession.ChannelName/ChannelType/Id/MessagingEndUserId/EndUserLanguage, MessagingEndUser.ContactId/MessagingPlatformKey)" },
  { label: "Autenticación del cliente", value: "Sin autenticación de canal. Verificación conversacional: nombre + apellido + correo + teléfono (en WhatsApp el teléfono se toma del remitente)." },
  { label: "Transferencia a humanos", value: "@utils.escalate en Escalation_v2, solo disponible si isWithinBusinessHours == True (CheckBusinessHours)." },
];

export const systemInstructionsSummary: string[] = [
  "Rol: \"el asistente virtual de Paquetexpress\" (no usa nombre de persona); español de México, tono cordial y conciso, apto para texto y voz.",
  "El cliente debe estar verificado antes de atender cualquier solicitud. No pide tarjetas, contraseñas ni identificaciones.",
  "Marca obligatoria \"Paquetexpress\" en una sola palabra, aunque la fuente la escriba distinto.",
  "Ligas oficiales fijas: empleo https://paquetexpress.pandape.computrabajo.com y sucursales https://www.paquetexpress.com.mx/sucursales. Prohibido compartir otras.",
  "Reglas de normalización de datos dictados: guías, códigos postales (5 dígitos), teléfonos, correos (fonética de dominios) y fechas (ISO YYYY-MM-DD).",
  "Cotizaciones: nunca inventar tarifas; importes en pesos mexicanos. Rastreo: priorizar estado, ubicación y fecha estimada; nunca garantizar fechas.",
  "Errores de acciones: no describir el error técnico; responder \"No pude completar la consulta en este momento.\" y ofrecer el siguiente paso.",
];

/** Lectura funcional por subagente. Las listas `deterministic` son lógica explícita
 * del Agent Script; `llm` es comportamiento que depende del razonamiento del modelo. */
export const subagentDocs: SubagentDoc[] = [
  {
    apiName: "agent_router",
    objective: "Punto de entrada. Envía a verificación a todo cliente no verificado y enruta el resto por intención.",
    activation: ["Es el start_agent: recibe cada turno nuevo."],
    deterministic: [
      "isVerified != True → Customer_Verification.",
      "Caso explícito en curso (explicitCaseRequested y !serviceCaseCreated) → CaseManagement_v2.",
      "Cotización nacional sin resultado → Quote_Management; internacional sin decisión de transferencia → International_Quote_Management; quoteInProgress sin clasificar → Quote_Management.",
      "pendingIntent (Quote/Order/Case/GeneralInfo/JobBranch/Escalation) → subagente correspondiente.",
      "Todas las transiciones salvo verificación, ambiguous_question y off_topic requieren isVerified == True.",
    ],
    llm: [
      "Elige la transición según la intención cuando no aplica ninguna regla determinista.",
      "Un mensaje solo con dígitos de un cliente verificado se trata como rastreo (Orden_Management).",
      "No responde por sí mismo temas generales ni financieros: los manda a off_topic.",
    ],
    outputs: ["No responde contenido; solo transiciona."],
    escalation: ["Transición a Escalation_v2 cuando el cliente pide un asesor."],
    errors: ["Sin acciones propias."],
    security: ["La compuerta isVerified protege todos los subagentes con datos."],
    observations: [],
  },
  {
    apiName: "Customer_Verification",
    objective: "Identificar al cliente (buscar o crear su Contacto) y retomar la intención original.",
    activation: ["Desde el router o cualquier subagente cuando isVerified != True."],
    deterministic: [
      "Siembra contactChannel con ChannelType y, en WhatsApp, customerPhone con el número del remitente.",
      "Con correo, nombre, apellido y teléfono capturados ejecuta AG_Get_and_create_contact y guarda contactId, isVerified, isExistingContact y el registro del contacto.",
      "Verificado → transición a la intención pendiente (pendingIntent).",
      "Respuesta fija \"¡Hola de nuevo, {nombre}!\" (contacto existente) o \"¡Gracias!\" (contacto nuevo).",
    ],
    llm: [
      "Captura nombre, apellido y correo (minúsculas, sin acentos) con capture_customer_details y la intención con capture_pending_intent, sin mencionarlo al cliente.",
      "En web pide el teléfono con naturalidad (capture_phone, no disponible en WhatsApp).",
    ],
    outputs: ["verifiedContactId, contactRecord, isVerified, isExistingContact."],
    escalation: ["Ninguna."],
    errors: ["Si el flow falla, isVerified queda False y el agente vuelve a pedir datos; no hay mensaje específico."],
    security: [
      "La verificación no autentica: cualquiera que conozca el correo de un cliente queda verificado como ese contacto (ver R-10).",
      "Una vez verificado no se permite cambiar de cliente en la sesión (instrucción al LLM, no regla determinista).",
    ],
    observations: ["El mensaje de bienvenida pide nombre y correo, pero el teléfono también es obligatorio para verificar."],
  },
  {
    apiName: "Quote_Management",
    objective: "Clasificar el envío y, si es nacional, capturar datos paso a paso, cotizar contra el API y crear el caso de cotización.",
    activation: ["Intención de cotizar (cotizar, precio, tarifa) o pendingIntent Quote."],
    deterministic: [
      "Normaliza tokens (Nacional→Domestic, Sobre→Envelope, Sí→Yes…). Un país en shipmentType se convierte en International y transiciona a International_Quote_Management.",
      "Valida CP origen y destino con PE_GetValidOriginPostalCode / PE_GetValidDestinationPostalCode; solo promueve el CP si el mensaje es exactamente \"Código Postal  válido\" (con doble espacio).",
      "Sobre: autollenado peso 1, 35.5 × 24 × 1, sin seguro.",
      "Con todos los datos ejecuta Obtener_Cotizaci_n_Paqueteria_V2 y después Crea_caso_cotizacion_nacional_v2 (Subject \"Cotizacion nacional\").",
      "Cambiar Paquete↔Sobre limpia los datos capturados; quoteResultShown reinicia todo el estado para una nueva cotización.",
    ],
    llm: [
      "Una pregunta por turno en orden fijo (CP origen, CP destino, tipo, peso, largo, ancho, alto, RAD, EAD, seguro, monto).",
      "Muestra la cotización textual sin resumir, con todas las opciones de servicio, el número de caso y la liga de política de aceptación.",
    ],
    outputs: ["quoteResult (texto del API), caseRecord del caso nacional."],
    escalation: ["No escala directamente."],
    errors: [
      "Si el API devuelve código 500 el mensaje queda vacío (ver R-14) y el flujo no avanza.",
      "La comparación exacta con \"Código Postal  válido\" depende del texto del flow PE_GetValid*.",
    ],
    security: ["Las entradas numéricas viajan como texto al Apex; un valor no numérico provoca una excepción no controlada (R-14)."],
    observations: ["El caso nacional se crea con Status Cerrado y valores comerciales fijos (descuento 0%, motivo \"Cliente solo se encuentra cotizando\")."],
  },
  {
    apiName: "International_Quote_Management",
    objective: "Registrar la solicitud de cotización internacional (solo país destino) y ofrecer transferencia a un asesor.",
    activation: ["Cliente indica envío internacional o un país fuera de México; también desde Quote_Management."],
    deterministic: [
      "Con destinationCountry ejecuta Crea_caso_cotizacion_internacional_v2A (Subject \"Cotizacion internacional\", Description = país).",
      "Normaliza la decisión de transferencia (Sí/si/yes → Yes). Yes → Escalation_v2; No → cierra el flujo.",
      "newQuoteRequested → vuelve a Quote_Management.",
    ],
    llm: ["Pide únicamente el país destino; prohibido pedir peso, medidas o CP.", "Mensaje fijo con número de caso y oferta de transferencia."],
    outputs: ["caseRecord del caso internacional."],
    escalation: ["Transferencia vía Escalation_v2 (sujeta a horario)."],
    errors: ["Si el CaseNumber viene vacío omite la frase del número; nunca informa error."],
    security: [],
    observations: [],
  },
  {
    apiName: "Orden_Management",
    objective: "Consultar el estatus de un envío por guía y registrar el caso de portería o de reclamación.",
    activation: ["Rastreo, \"¿dónde está mi paquete?\", número de guía, pendingIntent Order."],
    deterministic: [
      "Con orderStatusMessage y sin reclamación ejecuta Crea_caso_solicitud_de_servicio_orden (portería silenciosa, Seguimiento \"No\").",
      "Con reportRequested ejecuta Crea_caso_seguimiento_de_una_orden_v2A (Seguimiento \"Si\", con messagingSessionId para la transcripción).",
      "Obtener_estatus_de_la_orden solo está disponible cuando hay trackingNumber.",
    ],
    llm: [
      "Captura la guía (capture_tracking_number) y llama Obtener_estatus_de_la_orden; comparte el estatus con empatía.",
      "Solo marca reclamación (capture_report_request) ante una petición explícita.",
      "Solicitudes operativas (cambio de dirección, reprogramar) → Escalation_v2 sin caso.",
    ],
    outputs: ["orderStatusMessage, caseRecord (solo en reclamación)."],
    escalation: ["go_to_Escalation_v2 para operativas y quejas implícitas."],
    errors: ["Instrucción de reintentar una vez si la acción falla.", "El flow de rastreo no tiene fault path (R-14)."],
    security: ["La consulta por guía no valida que la guía pertenezca al contacto verificado."],
    observations: [
      "El caso de reclamación se crea con Status \"Abierto\" (no existe en el picklist) y la regla de workflow Ticket Cerrado lo cierra al crearse (R-07).",
    ],
  },
  {
    apiName: "CaseManagement_v2",
    objective: "Abrir casos explícitos, consultar casos existentes y agregar comentarios.",
    activation: ["Petición explícita de abrir/levantar caso, reclamación o queja general; consulta de un caso existente; agregar comentario."],
    deterministic: [
      "caseRouteLock bloquea transiciones a Órdenes y Escalamiento mientras se arma un caso explícito.",
      "Secuencia con candados por turno: motivo (caseMotivoShown → caseMotivoReady) → guía/rastreo (caseTrackingShown → caseTrackingReady) → crear.",
      "Con asunto, descripción y caseTrackingAsked ejecuta Crea_caso_solicitud_de_servicio_v2A; muestra el CaseNumber con texto fijo.",
    ],
    llm: [
      "Gate de ruteo: rastreo → Orden_Management; operativas → Escalation_v2; preguntas de \"cómo\" → General_Information_Management.",
      "GetCaseByCaseNumber_v2A y GetAllCasesForContact usan el contactRecord verificado; AddCaseComment_v2A pide confirmación del usuario.",
    ],
    outputs: ["caseRecord, lista de casos, mensaje de resultado del comentario."],
    escalation: ["go_to_Escalation_v2 (bloqueado por caseRouteLock)."],
    errors: ["Si CaseNumber viene vacío: disculpa y ofrece ayuda; no inventa número."],
    security: [
      "Las plantillas SvcCopilotTmpl__ filtran por el contacto verificado; con verificación débil se exponen casos de terceros (R-10).",
      "Con OWD Private el usuario del agente probablemente solo ve casos propios (R-17).",
    ],
    observations: [
      "Análisis estático: la portería silenciosa de este subagente (consultas administrativas) no puede crear su caso. capture_case_details solo está disponible con caseMotivoReady y la creación exige caseTrackingAsked, dos condiciones que solo se cumplen en la ruta de caso explícito (R-19).",
    ],
  },
  {
    apiName: "General_Information_Management",
    objective: "Responder preguntas frecuentes con FAQ_Search o con textos fijos y registrar el caso de consulta.",
    activation: ["Preguntas informativas o de \"cómo hacer\" (reclamación, artículos prohibidos, privacidad, ARCO), incluso si mencionan \"caso\"."],
    deterministic: [
      "Con faqQuestion ejecuta Create_case_Agent_paquete_v2 (Subject \"Consulta de informacion general\").",
      "Mientras faqQuestion esté vacío solo puede capturar la pregunta.",
    ],
    llm: [
      "Llama FAQ_Search y resume sin omitir requisitos, montos ni ligas.",
      "Textos fijos para identificaciones oficiales, frontera, requisitos de RAD, proceso de envío, formas de pago y OCURRE (persona física/moral).",
    ],
    outputs: ["Respuesta generada por FAQ_Search (promptResponse)."],
    escalation: ["Ofrece escalar si no puede responder."],
    errors: ["Si el retriever no devuelve contenido, la plantilla no tiene instrucción de abstenerse (ver PT-001)."],
    security: ["No pide datos personales para responder."],
    observations: [],
  },
  {
    apiName: "Job_Search",
    objective: "Entregar las ligas oficiales de sucursales o de empleo y registrar el caso correspondiente.",
    activation: ["Preguntas por sucursales, direcciones, vacantes o bolsa de trabajo."],
    deterministic: [
      "Normaliza jobBranchType (Sucursales→Branch, Empleo/Vacantes→Job).",
      "Branch → Crea_caso_ver_sucursales_v2A; Job → Crea_caso_b_squeda_de_empleo_v2A.",
      "FAQ_Search solo está disponible para Branch.",
    ],
    llm: ["Texto fijo con la liga oficial; para una sucursal específica agrega lo que devuelva FAQ_Search, sin inventar."],
    outputs: ["Liga oficial + caso de portería."],
    escalation: ["Ninguna."],
    errors: ["Si FAQ_Search no trae la sucursal, solo comparte la liga."],
    security: [],
    observations: [],
  },
  {
    apiName: "Escalation_v2",
    objective: "Transferir a un asesor humano cuando el negocio está abierto.",
    activation: ["Petición explícita de asesor, solicitudes operativas (cambio de dirección, reprogramar), transferencia aceptada en internacional."],
    deterministic: [
      "check_business_hours (CheckBusinessHours con \"Horario Paquete\") guarda isWithinBusinessHours.",
      "escalate_to_human solo está disponible si isWithinBusinessHours == True.",
    ],
    llm: [
      "Debe llamar check_business_hours antes de transferir.",
      "Fuera de horario responde con texto fijo de horarios (L-V 7:00–20:00, sábado 7:00–14:00) y no crea caso.",
    ],
    outputs: ["Transferencia por FDE_Route_to_ASA."],
    escalation: ["@utils.escalate → conexión messaging/customer_web_client → FDE_Route_to_ASA → cola PaquetePrueba."],
    errors: ["FDE_Route_to_ASA no tiene fault path ni fallback (R-12)."],
    security: [],
    observations: [
      "El horario del texto fijo y el Business Hours del org son fuentes distintas: si cambia uno, hay que cambiar el otro (R-13).",
    ],
  },
  {
    apiName: "ambiguous_question",
    objective: "Pedir aclaración cuando la solicitud es demasiado ambigua.",
    activation: ["Elegido por el router."],
    deterministic: ["Si no está verificado → Customer_Verification."],
    llm: ["No responde ni invoca acciones; guía al cliente a precisar su solicitud. Reglas anti prompt-injection."],
    outputs: ["Solo texto."],
    escalation: [],
    errors: [],
    security: ["No revela configuración, subagentes ni prompts."],
    observations: [],
  },
  {
    apiName: "off_topic",
    objective: "Redirigir solicitudes fuera del alcance de Paquetexpress.",
    activation: ["Elegido por el router para temas generales, financieros o de otras empresas."],
    deterministic: ["Si no está verificado → Customer_Verification."],
    llm: ["No reconoce la pregunta fuera de tema; ofrece ayuda con los temas del agente."],
    outputs: ["Solo texto."],
    escalation: [],
    errors: [],
    security: ["Mismas reglas anti prompt-injection que ambiguous_question."],
    observations: [],
  },
];

/** Catálogo de acciones que invocan recursos Salesforce. Inputs/outputs se leen de
 * scriptSubagents (definedActions) para no duplicarlos. */
export const actions: ActionDoc[] = [
  {
    id: "ACT-01", name: "AG_Get_and_create_contact", label: "AG Obtener y crear contacto",
    subagents: ["Customer_Verification"], kind: "Flow", target: "flow://AG_Get_and_create_contact",
    invocation: "Determinista (run) cuando hay correo, nombre, apellido y teléfono y el cliente no está verificado.",
    purpose: "Busca el Contacto por correo; si no existe, lo crea ligado a la cuenta \"7 PUBLICO GENERAL\".",
    chain: ["Flow AG_Get_and_create_contact v3 (autolaunched, contexto de usuario)", "Get Contact por Email", "Get Account Name = '7 PUBLICO GENERAL' (dato)", "Create Contact (FirstName, LastName, Email, MobilePhone normalizado a 10 dígitos, AccountId)"],
    rootNodes: ["FLW-001", "DATA-001", "OBJ-002", "OBJ-003", "VR-001", "AUT-014"],
    sideEffects: ["Crea registros Contact (72 en 30 días en el sandbox)."],
    errorHandling: ["Sin fault paths. Con correo vacío falla la validation rule de Contact (pide Phone o Email; el flow llena MobilePhone)."],
    permissions: ["SEC-009", "SEC-010", "SEC-021", "SEC-024"],
    risks: ["R-06", "R-10", "R-24"],
    analysis: "Completa", evidence: "Retrieve Flow AG_Get_and_create_contact; FlowDefinition activa = última (v3).",
  },
  {
    id: "ACT-02", name: "Obtener_Codigo_postal_origen_valido_v2A", label: "Obtener Código postal origen válido",
    subagents: ["Quote_Management"], kind: "Flow", target: "flow://PE_GetValidOriginPostalCode",
    invocation: "Determinista cuando el cliente dio un CP de origen (quoteCPOrigenRaw) y aún no hay CP validado.",
    purpose: "Valida el CP de origen contra el API de Paquetexpress.",
    chain: ["Flow PE_GetValidOriginPostalCode v1", "Apex validaCodigo2 (tipo Origen)", "GET {URL_VALIDA_CP}{cp}{URL_VALIDACP_ORIGEN_END} · Remote Site PRD_TOKEN_PAQUETEXPRESS_LOGIN", "API Código Postal v3 (cc.paquetexpress.com.mx)"],
    rootNodes: ["FLW-012", "APX-004", "LBL-004", "LBL-005", "RSS-001", "INT-003"],
    sideEffects: ["Ninguno (lectura)."],
    errorHandling: ["validaCodigo2 captura la excepción y devuelve el mensaje de error, que el agente muestra al cliente."],
    permissions: ["SEC-016", "SEC-018"],
    risks: ["R-08", "R-11", "R-14"],
    analysis: "Completa", evidence: "Retrieve Flow + ApexClass validaCodigo2 + CustomLabels.",
  },
  {
    id: "ACT-03", name: "Obtener_Codigo_postal_destino_valido_v2A", label: "Obtener Código postal destino válido",
    subagents: ["Quote_Management"], kind: "Flow", target: "flow://PE_GetValidDestinationPostalCode",
    invocation: "Determinista cuando hay quoteCPDestinoRaw y no hay CP de destino validado.",
    purpose: "Valida el CP de destino contra el API de Paquetexpress.",
    chain: ["Flow PE_GetValidDestinationPostalCode v1", "Apex validaCodigo2 (tipo Destino)", "GET {URL_VALIDA_CP}{cp}{URL_VALIDACP_DESTINO_END}", "API Código Postal v3"],
    rootNodes: ["FLW-011", "APX-004", "LBL-004", "LBL-006", "RSS-001", "INT-003"],
    sideEffects: ["Ninguno (lectura)."],
    errorHandling: ["Igual que ACT-02."],
    permissions: ["SEC-016", "SEC-018"],
    risks: ["R-08", "R-11", "R-14"],
    analysis: "Completa", evidence: "Retrieve Flow + ApexClass validaCodigo2.",
  },
  {
    id: "ACT-04", name: "Obtener_Cotizaci_n_Paqueteria_V2", label: "Obtener Cotización Paqueteria V2",
    subagents: ["Quote_Management"], kind: "Flow", target: "flow://Obtener_Cotizaci_n_Paqueter_a",
    invocation: "Determinista con todos los datos del envío capturados (dos ramas: sin seguro / con seguro y monto).",
    purpose: "Obtiene las opciones de servicio y precio del cotizador de Paquetexpress.",
    chain: ["Flow Obtener_Cotizaci_n_Paqueter_a v2", "Apex CotizacionEnvioV2.getQuotation", "POST {URL_COTIZACION} (/WsQuotePaquetexpress/api/apiQuoter/v2/getQuotation) con header de seguridad", "API Cotizador v2"],
    rootNodes: ["FLW-009", "APX-002", "LBL-001", "RSS-001", "INT-001"],
    sideEffects: ["Ninguno en Salesforce."],
    errorHandling: ["La decisión del flow solo cubre Code 200 y nulo: un 500 deja OutputMessage vacío.", "Conversión numérica fuera del try en Apex: un ancho decimal o texto lanza excepción.", "Sin fault path."],
    permissions: ["SEC-015", "SEC-018", "SEC-029"],
    risks: ["R-01", "R-08", "R-11", "R-14"],
    analysis: "Completa", evidence: "Retrieve Flow + ApexClass CotizacionEnvioV2 (token no reproducido).",
  },
  {
    id: "ACT-05", name: "Crea_caso_cotizacion_nacional_v2", label: "Crea caso cotizacion nacional v2",
    subagents: ["Quote_Management"], kind: "Flow", target: "flow://Crea_caso_cotizacion_nacional",
    invocation: "Determinista en cuanto hay quoteResult y no se ha creado el caso.",
    purpose: "Registra la cotización nacional como caso cerrado (RT Cotizacion_de_Envios_Nacionales).",
    chain: ["Flow Crea_caso_cotizacion_nacional v6", "Get RecordType por DeveloperName", "Create Case con valores comerciales fijos y Como_nos_conoci_el_cliente__c = canal"],
    rootNodes: ["FLW-004", "RT-004", "FLD-012", "FLD-009", "FLD-015", "WF-005", "TRG-001"],
    sideEffects: ["Crea un Case por cotización."],
    errorHandling: ["Sin fault path. Como_nos_conoci_el_cliente__c es picklist restringido: el valor por defecto 'Chat' (pruebas por CLI/Preview) no está en la lista."],
    permissions: ["SEC-008", "SEC-020", "SEC-022"],
    risks: ["R-15", "R-24"],
    analysis: "Completa", evidence: "Retrieve Flow; datos: 101 casos nacionales del agente en 60 días con valores WhatsApp / Chat en línea / vacío.",
  },
  {
    id: "ACT-06", name: "Crea_caso_cotizacion_internacional_v2A", label: "Crea caso cotizacion internacional v2A",
    subagents: ["International_Quote_Management"], kind: "Flow", target: "flow://Crea_caso_cotizacion_internacional",
    invocation: "Determinista con destinationCountry y sin caso previo.",
    purpose: "Registra la solicitud de cotización internacional (RT Cotizacion_de_Envios_Internacionales).",
    chain: ["Flow Crea_caso_cotizacion_internacional v4", "Get RecordType", "Create Case (Status Cerrado, Tarifa T0, Pais_destino__c 'N/A')"],
    rootNodes: ["FLW-003", "RT-003", "FLD-003", "FLD-004", "FLD-006", "TRG-001"],
    sideEffects: ["Crea un Case."],
    errorHandling: ["Sin fault path."],
    permissions: ["SEC-008", "SEC-020", "SEC-022"],
    risks: ["R-24"],
    analysis: "Completa", evidence: "Retrieve Flow.",
  },
  {
    id: "ACT-07", name: "Check_Now_is_within_Business_Hours_by_Name", label: "Verifica si estamos dentro del Horario de Atención por Nombre",
    subagents: ["Escalation_v2"], kind: "Apex", target: "apex://CheckBusinessHours",
    invocation: "La elige el LLM (check_business_hours) antes de transferir; el input se fija en \"Horario Paquete\".",
    purpose: "Indica si el negocio está abierto en este momento.",
    chain: ["Apex CheckBusinessHours.checkBusinessHoursByName", "SOQL BusinessHours WHERE Name = 'Horario Paquete' AND IsActive (nombre fijo en código)", "BusinessHours.isWithin"],
    rootNodes: ["APX-001", "BH-001", "TST-001"],
    sideEffects: ["Ninguno."],
    errorHandling: ["Sin manejo de excepciones. Si no hay exactamente un Business Hours activo con ese nombre, el resultado es incorrecto o error."],
    permissions: ["SEC-013"],
    risks: ["R-02", "R-13"],
    analysis: "Completa", evidence: "Retrieve ApexClass CheckBusinessHours; SetupEntityAccess en PS del agente.",
  },
  {
    id: "ACT-08", name: "escalate_to_human", label: "Escalamiento a asesor (ruta Omni-Channel)",
    subagents: ["Escalation_v2"], kind: "Omni-Channel Flow", target: "flow://FDE_Route_to_ASA",
    invocation: "La elige el LLM; solo disponible si isWithinBusinessHours == True.",
    purpose: "Transfiere la MessagingSession a la cola humana.",
    chain: ["@utils.escalate", "Conexión messaging / customer_web_client", "Routing Flow FDE_Route_to_ASA v2", "routeWork QueueBased → Queue 00G2E000008f2uRUAQ (PaquetePrueba, label WhatsApp) · ServiceChannel 0N92E000000DcLRSA0 (sfdc_livemessage)"],
    rootNodes: ["FLW-016", "QUE-001", "SCH-001", "QRC-001", "STD-002"],
    sideEffects: ["Asigna trabajo a asesores (Omni)."],
    errorHandling: ["Sin fault path ni cola de respaldo."],
    permissions: ["SEC-011"],
    risks: ["R-12", "R-23"],
    analysis: "Completa", evidence: "Retrieve Flow FDE_Route_to_ASA; SOQL Group/QueueSobject/ServiceChannel.",
  },
  {
    id: "ACT-09", name: "FAQ_Search", label: "Búsqueda de FAQ v2",
    subagents: ["General_Information_Management", "Job_Search"], kind: "Prompt Template", target: "generatePromptResponse://FAQ_Search",
    invocation: "La elige el LLM. En Job_Search solo está disponible para sucursales (jobBranchType Branch).",
    purpose: "Genera la respuesta a preguntas frecuentes con grounding en la Data Library.",
    chain: ["GenAiPromptTemplate FAQ_Search (flex, versión activa 5, GPT-5)", "Retriever File_ADL_LibreriaDeDatos_1Cx_K4B73f7782b", "Search Index ADL_LibreriaDeDatos (Hybrid) · DMO ADL_LibreriaDeDatos__dlm · data space default", "3 PDFs: Preguntas frecuentes, Aviso de Privacidad, Paquetexpress Info"],
    rootNodes: ["PT-001", "RET-001", "DC-001", "DC-002", "DC-003", "DC-004", "INT-004"],
    sideEffects: ["Consumo de créditos de IA generativa / Data Cloud."],
    errorHandling: ["Sin instrucción para responder \"no sé\" cuando el retriever no devuelve resultados."],
    permissions: ["SEC-006", "SEC-026"],
    risks: ["R-04", "R-21"],
    analysis: "Parcial", analysisNote: "La configuración interna del retriever (campos, filtros, top-k) no es inspeccionable por metadata en este org.",
    evidence: "Retrieve GenAiPromptTemplate FAQ_Search; SOQL DataSemanticSearch y AiGroundingFileRefCustom__dlm.",
  },
  {
    id: "ACT-10", name: "Create_case_Agent_paquete_v2", label: "Crea caso consulta de informacion general",
    subagents: ["General_Information_Management"], kind: "Flow", target: "flow://Create_case_Agent_paquete",
    invocation: "Determinista en cuanto se captura faqQuestion.",
    purpose: "Registra la consulta de información general (RT Consulta_de_Informacion_General).",
    chain: ["Flow Create_case_Agent_paquete v5", "Get RecordType", "Create Case (sin Status; lo cierra WF Ticket Cerrado)"],
    rootNodes: ["FLW-008", "RT-001", "WF-003", "TRG-001"],
    sideEffects: ["Crea un Case."],
    errorHandling: ["Sin fault path."],
    permissions: ["SEC-008", "SEC-020", "SEC-022"],
    risks: ["R-24"],
    analysis: "Completa", evidence: "Retrieve Flow + Workflow Case.",
  },
  {
    id: "ACT-11", name: "Crea_caso_ver_sucursales_v2A", label: "Crea caso ver sucursales v2A",
    subagents: ["Job_Search"], kind: "Flow", target: "flow://Crea_caso_ver_sucursales",
    invocation: "Determinista con jobBranchType Branch.",
    purpose: "Registra la consulta de sucursales (RT Direccion_de_Sucursales).",
    chain: ["Flow Crea_caso_ver_sucursales v5", "Get RecordType", "Create Case Status Cerrado"],
    rootNodes: ["FLW-007", "RT-002", "TRG-001"],
    sideEffects: ["Crea un Case."],
    errorHandling: ["Sin fault path."],
    permissions: ["SEC-008", "SEC-022"],
    risks: [],
    analysis: "Completa", evidence: "Retrieve Flow.",
  },
  {
    id: "ACT-12", name: "Crea_caso_b_squeda_de_empleo_v2A", label: "Crea caso busqueda de empleo v2A",
    subagents: ["Job_Search"], kind: "Flow", target: "flow://Crea_caso_b_squeda_de_empleo",
    invocation: "Determinista con jobBranchType Job.",
    purpose: "Registra la consulta de vacantes (RT Direccion_de_vacantes).",
    chain: ["Flow Crea_caso_b_squeda_de_empleo v8", "Get RecordType Direccion_de_vacantes", "Create Case Status Cerrado"],
    rootNodes: ["FLW-002", "RT-006", "TRG-001"],
    sideEffects: ["Crea un Case."],
    errorHandling: ["Sin fault path. Si el record type no existe en producción, el caso se crea sin RT o falla."],
    permissions: ["SEC-008", "SEC-022"],
    risks: ["R-06"],
    analysis: "Completa", evidence: "Retrieve Flow; SOQL RecordType.",
  },
  {
    id: "ACT-13", name: "AddCaseComment_v2A", label: "Agregar Comentario al Caso",
    subagents: ["CaseManagement_v2"], kind: "Flow (plantilla estándar)", target: "flow://SvcCopilotTmpl__AddCaseComment",
    invocation: "La elige el LLM tras obtener el caso; require_user_confirmation True.",
    purpose: "Agrega un comentario a un caso existente del contacto.",
    chain: ["Plantilla de plataforma SvcCopilotTmpl__AddCaseComment", "CaseComment"],
    rootNodes: ["FLW-013", "OBJ-005"],
    sideEffects: ["Crea CaseComment."],
    errorHandling: ["Lógica interna no inspeccionable."],
    permissions: ["SEC-025", "SEC-008"],
    risks: ["R-10", "R-17"],
    analysis: "Parcial", analysisNote: "Plantilla de plataforma: solo se confirmó su firma por REST.",
    evidence: "REST /actions/custom/flow/SvcCopilotTmpl__AddCaseComment.",
  },
  {
    id: "ACT-14", name: "Crea_caso_solicitud_de_servicio_v2A", label: "Crea caso solicitud de servicio v2A",
    subagents: ["CaseManagement_v2"], kind: "Flow", target: "flow://Crea_caso_solicitud_de_servicio",
    invocation: "Determinista con asunto, descripción y la pregunta de guía/rastreo respondida.",
    purpose: "Crea el caso explícito pedido por el cliente (RT Estatus_Solicitud_de_Servicio).",
    chain: ["Flow Crea_caso_solicitud_de_servicio v8", "Get RecordType", "Create Case (Status Cerrado, Cliente_solicito_crear_caso__c 'Si', Guia__c, Numero_de_Rastreo__c)", "Get Case (CaseNumber)"],
    rootNodes: ["FLW-006", "RT-005", "FLD-016", "FLD-017", "FLD-008", "WF-003", "TRG-001"],
    sideEffects: ["Crea un Case."],
    errorHandling: ["Sin fault path."],
    permissions: ["SEC-008", "SEC-020", "SEC-022"],
    risks: ["R-07", "R-19"],
    analysis: "Completa", evidence: "Retrieve Flow.",
  },
  {
    id: "ACT-15", name: "GetCaseByCaseNumber_v2A", label: "Obtener Caso por Número de Caso",
    subagents: ["CaseManagement_v2"], kind: "Flow (plantilla estándar)", target: "flow://SvcCopilotTmpl__GetCaseByCaseNumber",
    invocation: "La elige el LLM con el número de caso; contactRecord fijo al contacto verificado.",
    purpose: "Devuelve un caso del contacto.",
    chain: ["Plantilla SvcCopilotTmpl__GetCaseByCaseNumber", "Case"],
    rootNodes: ["FLW-014", "OBJ-001", "OBJ-002"],
    sideEffects: ["Ninguno."],
    errorHandling: ["Lógica interna no inspeccionable."],
    permissions: ["SEC-025", "SEC-023"],
    risks: ["R-10", "R-17"],
    analysis: "Parcial", analysisNote: "Plantilla de plataforma.",
    evidence: "REST /actions/custom/flow/SvcCopilotTmpl__GetCaseByCaseNumber.",
  },
  {
    id: "ACT-16", name: "GetAllCasesForContact", label: "Obtener Todos los Casos del Contacto",
    subagents: ["CaseManagement_v2"], kind: "Flow (plantilla estándar)", target: "flow://SvcCopilotTmpl__GetCasesForContact",
    invocation: "La elige el LLM; contactRecord fijo al contacto verificado.",
    purpose: "Lista los casos del contacto.",
    chain: ["Plantilla SvcCopilotTmpl__GetCasesForContact", "Case"],
    rootNodes: ["FLW-015", "OBJ-001", "OBJ-002"],
    sideEffects: ["Ninguno."],
    errorHandling: ["Lógica interna no inspeccionable."],
    permissions: ["SEC-025", "SEC-023"],
    risks: ["R-10", "R-17"],
    analysis: "Parcial", analysisNote: "Plantilla de plataforma.",
    evidence: "REST /actions/custom/flow/SvcCopilotTmpl__GetCasesForContact.",
  },
  {
    id: "ACT-17", name: "Obtener_estatus_de_la_orden", label: "Obtener estatus de la orden",
    subagents: ["Orden_Management"], kind: "Flow", target: "flow://PE_GetOrderStatus",
    invocation: "La elige el LLM cuando hay trackingNumber; el output OutpoutMessage (con typo, es contrato) se guarda en orderStatusMessage.",
    purpose: "Consulta el último evento de la guía.",
    chain: ["Flow PE_GetOrderStatus v1", "Apex RastreoEnvio.getOrderStatus", "GET {URL_RASTREO}{guía}{URL_RASTREO_END}", "API Rastreo v3"],
    rootNodes: ["FLW-010", "APX-003", "LBL-002", "LBL-003", "RSS-001", "INT-002"],
    sideEffects: ["Ninguno en Salesforce."],
    errorHandling: ["Ante HTTP ≠ 200 el Apex devuelve lista vacía → el flow falla con error genérico en vez de \"no encuentro la información\" (deducido del código). Sin fault path."],
    permissions: ["SEC-014", "SEC-018"],
    risks: ["R-08", "R-11", "R-14"],
    analysis: "Completa", evidence: "Retrieve Flow + ApexClass RastreoEnvio.",
  },
  {
    id: "ACT-18", name: "Crea_caso_seguimiento_de_una_orden_v2A", label: "Crea caso seguimiento de una orden v2A",
    subagents: ["Orden_Management"], kind: "Flow", target: "flow://Crea_caso_seguimiento_de_una_orden",
    invocation: "Determinista cuando el cliente pidió explícitamente reporte o reclamación.",
    purpose: "Crea el caso de reclamación con resumen generado por IA y la transcripción.",
    chain: ["Flow Crea_caso_seguimiento_de_una_orden v13", "getConvTscpForRecord (transcripción de la MessagingSession, con fault path)", "Apex CaseSummaryAgentforceInvocable → ConnectApi.EinsteinLLM con plantilla Case_Summary_Agentforce (GPT-5 Mini)", "Create Case RT Estatus_Solicitud_de_Servicio, Status 'Abierto', Cliente_solicito_crear_caso__c = Seguimiento"],
    rootNodes: ["FLW-005", "STD-001", "APX-005", "PT-002", "RT-005", "FLD-016", "FLD-019", "WF-003", "TRG-001", "OBJ-006"],
    sideEffects: ["Crea un Case y consume una generación de IA."],
    errorHandling: ["Si la plantilla falla, Subject y Description quedan vacíos (los sobrescribe la salida del Apex).", "Status 'Abierto' no existe y el WF Ticket Cerrado cierra el caso al crearse (confirmado: 370/370 casos del tipo están Cerrado)."],
    permissions: ["SEC-017", "SEC-006", "SEC-011"],
    risks: ["R-07", "R-08", "R-16"],
    analysis: "Completa", evidence: "Retrieve Flow + ApexClass + GenAiPromptTemplate; SOQL Case agregado por Status.",
  },
  {
    id: "ACT-19", name: "Crea_caso_solicitud_de_servicio_orden", label: "Crea caso solicitud de servicio (portería orden)",
    subagents: ["Orden_Management"], kind: "Flow", target: "flow://Crea_caso_solicitud_de_servicio",
    invocation: "Determinista tras compartir un estatus, sin reclamación (portería silenciosa).",
    purpose: "Registro interno de la consulta de estatus; no se comparte folio.",
    chain: ["Mismo flow que ACT-14 (Crea_caso_solicitud_de_servicio v8) con Seguimiento 'No'"],
    rootNodes: ["FLW-006", "RT-005", "WF-003", "TRG-001"],
    sideEffects: ["Crea un Case por cada consulta de estatus."],
    errorHandling: ["Sin fault path."],
    permissions: ["SEC-008", "SEC-020"],
    risks: [],
    analysis: "Completa", evidence: "Retrieve Flow.",
  },
];
