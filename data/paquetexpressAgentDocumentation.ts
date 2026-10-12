// Documentación del agente Paquete_Express_vX versión V12 (Draft con RAD + Glp* reales).
// Misma estructura que betterwareAgentDocumentation.ts — no agrega campos extra.
//
// Agent ID (BotDefinition): 0Xxdh0000005iq1CAA
// Bundle: aiAuthoringBundles/Paquete_Express_vX_12 (retrievado del sandbox
// paquetexpress-sandbox / qa2020 el 2026-10-12 · 4,897 líneas).
//
// Este Draft V12 es el agente objetivo de la Fase 2 (RAD):
//   - 11 subagentes consolidados (incluye RAD_Management).
//   - Enganchado a las clases Apex Glp* reales (GlpBuscarCliente, GlpCrearCliente,
//     GlpConsultarGuia, GlpConsultarZona, GlpConsultarSucursalesOcurre, GlpCotizar,
//     GlpConsultarFechas, GlpCrearRecoleccion, GlpCrearDireccionFiscal) — ya NO
//     usa los mocks MOCK_GLP_*.
//   - Incluye International_Quote_Management separado y las mejoras de UAT ya
//     portadas (teléfono en verificación, isExistingContact, escalamiento operativo).
//
// El audit, el plan por olas, el timeline y los escenarios de prueba
// NO viven aquí — viven en las tabs Plan, Calendario y Pruebas del portal.

export type PaquetexpressAgentCategory =
  | "Entrada y verificación"
  | "Cotización"
  | "Rastreo y envíos"
  | "Recolección a domicilio"
  | "Información y servicios"
  | "Casos y escalamiento"
  | "Control de conversación";

export const PAQUETEXPRESS_CATEGORIES: readonly PaquetexpressAgentCategory[] = [
  "Entrada y verificación",
  "Cotización",
  "Rastreo y envíos",
  "Recolección a domicilio",
  "Información y servicios",
  "Casos y escalamiento",
  "Control de conversación",
];

export type PaquetexpressAgentActionDoc = {
  name: string;
  target: string;
  description?: string;
};

export type PaquetexpressSubagentDoc = {
  id: string;
  number: number;
  name: string;
  category: PaquetexpressAgentCategory;
  descripcion: string;
  activacion: string;
  respuestas: string;
  acciones: PaquetexpressAgentActionDoc[];
  criterios: string[];
};

export type PaquetexpressAgentDocumentation = {
  name: string;
  developerName: string;
  version: string;
  revision: string;
  base: string;
  categories: readonly PaquetexpressAgentCategory[];
  subagents: PaquetexpressSubagentDoc[];
};

export const paquetexpressAgentDocs: PaquetexpressAgentDocumentation = {
  name: "Paquete Express vX",
  developerName: "Paquete_Express_vX",
  version: "V12 Draft (bundle Paquete_Express_vX_12 · BotDefinition 0Xxdh0000005iq1CAA)",
  revision: "12-oct-2026",
  base:
    "Agente objetivo de la Fase 2 (RAD). 11 subagentes consolidados: router + verificación (nombre+correo+teléfono con isExistingContact) + cotización nacional + cotización internacional (subagente separado) + rastreo + casos + FAQ + sucursales/empleo + escalamiento con compuerta de horario + RAD_Management (los 3 tipos del Excel: Normal, Prepago/RPP, WW) + ambiguous + off_topic. El subagente RAD invoca las clases Apex Glp* reales ya desplegadas en la org (GlpBuscarCliente, GlpConsultarGuia, GlpConsultarZona, GlpConsultarSucursalesOcurre, GlpCotizar, GlpConsultarFechas, GlpCrearRecoleccion, GlpCrearCliente, GlpCrearDireccionFiscal) — ya NO usa mocks. Modelo: sfdc_ai__DefaultGPT4Omni.",
  categories: PAQUETEXPRESS_CATEGORIES,
  subagents: [
    {
      id: "agent_router",
      number: 1,
      name: "Enrutador del Agente",
      category: "Entrada y verificación",
      descripcion:
        "`start_agent` del bundle. Clasifica el intent del cliente y transfiere al subagente de dominio. Enruta por `pendingIntent` (Quote, Order, Case, GeneralInfo, JobBranch, Escalation, RAD) y por palabras clave. Nunca ejecuta acciones ni responde al cliente directamente.",
      activacion:
        "En cada turno nuevo mientras el cliente no esté dentro de un subagente de dominio. Si isVerified != True transfiere a Customer_Verification. Si pendingIntent == 'RAD' transfiere a RAD_Management. Si shipmentType == 'International' transfiere al subagente internacional dedicado.",
      respuestas:
        "No produce texto propio. El welcome lo entrega system.messages: 'Hola, buen día. Soy el asistente virtual de Paquetexpress. Para ayudarle mejor, ¿me indica su nombre completo, por favor?'",
      acciones: [
        { name: "go_to_Customer_Verification", target: "@utils.transition", description: "Verificación de identidad (nombre + correo + teléfono)." },
        { name: "go_to_Quote_Management", target: "@utils.transition", description: "Cotización nacional (clasificador inicial)." },
        { name: "go_to_International_Quote_Management", target: "@utils.transition", description: "Cotización internacional (único dato: país destino)." },
        { name: "go_to_Orden_Management", target: "@utils.transition", description: "Rastreo/estatus de envío." },
        { name: "go_to_CaseManagement_v2", target: "@utils.transition", description: "Casos: alta, consulta, comentarios." },
        { name: "go_to_General_Information_Management", target: "@utils.transition", description: "FAQ y preguntas informativas." },
        { name: "go_to_Job_Search", target: "@utils.transition", description: "Sucursales y vacantes de empleo." },
        { name: "go_to_Escalation_v2", target: "@utils.transition", description: "Transferencia a agente humano con compuerta de horario." },
        { name: "go_to_RAD_Management", target: "@utils.transition", description: "Agendar recolección a domicilio (Normal, Prepago/RPP o WW)." },
        { name: "go_to_ambiguous_question", target: "@utils.transition", description: "Fallback cuando la solicitud es demasiado ambigua." },
        { name: "go_to_off_topic", target: "@utils.transition", description: "Redirige intents fuera del dominio." },
      ],
      criterios: [
        "Dado que el cliente aún no está verificado, cuando el router recibe un mensaje, entonces transfiere a Customer_Verification sin importar el intent — pendingIntent se preserva.",
        "Dado que pendingIntent == 'RAD' y isVerified == True, cuando el router evalúa, entonces transiciona directo a RAD_Management.",
        "Dado que el cliente envía solo dígitos, cuando el router evalúa, entonces lo trata como número de guía y rutea a Orden_Management.",
        "Dado que el cliente menciona explícitamente un país fuera de México, cuando el router evalúa, entonces va directo a International_Quote_Management.",
      ],
    },
    {
      id: "customer_verification",
      number: 2,
      name: "Verificación del Cliente",
      category: "Entrada y verificación",
      descripcion:
        "Gate de identidad obligatorio antes de abrir cualquier subagente de dominio. Captura nombre + apellido + correo + **teléfono**. Para WhatsApp pre-popula teléfono desde WhatsAppPhone; para web/voice lo pide. Ejecuta AG_Get_and_create_contact: busca por correo y, si no existe, crea el Contact. Devuelve isExistingContact para diferenciar saludo de retorno vs. de alta.",
      activacion:
        "Al inicio de la conversación, o cuando cualquier subagente detecta isVerified != True antes de ejecutar su propio reasoning. El cliente puede dictar su intención en el mismo turno; se guarda con capture_pending_intent para retomarla.",
      respuestas:
        "Normaliza correo (sin acentos, minúsculas) y valida formato. Pide solo los datos faltantes. Para contacto existente responde '¡Hola de nuevo, {firstName}! ¿En qué puedo ayudarte hoy?'; para contacto nuevo responde '¡Gracias! ¿En qué puedo ayudarte hoy?'.",
      acciones: [
        { name: "capture_customer_details", target: "@utils.setVariables", description: "Nombre + apellido + correo (sin acentos, minúsculas)." },
        { name: "capture_phone", target: "@utils.setVariables", description: "Teléfono. En WhatsApp no se usa — se pre-popula desde WhatsAppPhone." },
        { name: "capture_pending_intent", target: "@utils.setVariables", description: "Valores: Quote, Order, Case, GeneralInfo, JobBranch, Escalation, RAD." },
        { name: "AG_Get_and_create_contact", target: "flow://AG_Get_and_create_contact", description: "Busca por correo; crea si no existe. Devuelve contactId, isVerified, isExistingContact y recordContact." },
      ],
      criterios: [
        "Dado que ChannelType == 'WhatsApp' y WhatsAppPhone tiene valor, cuando se evalúa el reasoning, entonces customerPhone se setea desde WhatsAppPhone sin pedirlo.",
        "Dado que la verificación aún no termina, cuando el agente responde, entonces NO confirma al cliente que ya está verificado.",
        "Dado que el cliente dicta nombre completo en un mensaje (p.ej. 'Regina Segura'), cuando el agente captura, entonces toma la primera palabra como nombre y el resto como apellido.",
        "Dado que isVerified ya fue True durante la sesión, cuando el cliente intenta cambiar de identidad, entonces el agente mantiene la verificación original.",
      ],
    },
    {
      id: "quote_management",
      number: 3,
      name: "Gestión de Cotización (Nacional + Clasificador)",
      category: "Cotización",
      descripcion:
        "Clasifica el envío como Domestic o International. Para Domestic recorre un cuestionario determinista pregunta-por-pregunta (CP origen → CP destino → tipo Paquete/Sobre → peso → largo → ancho → alto → RAD → EAD → IVPF → monto asegurado), invoca Obtener_Cotizaci_n_Paqueteria_V2 y crea un caso de cotización nacional. Para International delega a International_Quote_Management. Si quoteRAD == 'Yes' y el cliente acepta tras cotizar, pivota a RAD_Management.",
      activacion:
        "pendingIntent == 'Quote' o palabras clave (cotizar, cotización, precio, tarifa, budget, price, quotation). Requiere cliente verificado.",
      respuestas:
        "Mientras shipmentType esté vacío, PROHIBIDO pedir detalles del envío — solo clasifica. Al obtener la tarifa muestra quoteResult palabra por palabra (limpia HTML, convierte ** → *). Informa el CaseNumber si está disponible. Linkea PAM al cierre.",
      acciones: [
        { name: "capture_shipment_classification", target: "@utils.setVariables", description: "shipmentType = 'Domestic' | 'International' (tokens inglés exactos)." },
        { name: "request_new_quote", target: "@utils.setVariables", description: "Reinicia todo el flujo cuando el cliente pide otra cotización desde cero." },
        { name: "capture_cp_origen / capture_cp_destino / capture_tipo / capture_peso / capture_largo / capture_ancho / capture_alto / capture_rad / capture_ead / capture_ivpf / capture_amt", target: "@utils.setVariables", description: "Captura paso-a-paso." },
        { name: "capture_pending_intent_quote_to_rad", target: "@utils.setVariables", description: "Post-cotización, si quoteRAD = Yes y el cliente acepta → pendingIntent = 'RAD'." },
        { name: "Obtener_Codigo_postal_origen_valido_v2A", target: "flow://PE_GetValidOriginPostalCode" },
        { name: "Obtener_Codigo_postal_destino_valido_v2A", target: "flow://PE_GetValidDestinationPostalCode" },
        { name: "Obtener_Cotizaci_n_Paqueteria_V2", target: "flow://Obtener_Cotizaci_n_Paqueter_a", description: "Devuelve quoteResult con opciones de servicio." },
        { name: "Crea_caso_cotizacion_nacional_v2", target: "flow://Crea_caso_cotizacion_nacional" },
      ],
      criterios: [
        "Dado que shipmentType == '', cuando el cliente aún no clasifica, entonces el agente SOLO pregunta nacional vs internacional.",
        "Dado que quoteTipo == 'Envelope', cuando se piden detalles, entonces NUNCA se pregunta peso ni dimensiones ni IVPF.",
        "Dado que quoteResult != '', cuando el agente muestra la cotización, entonces respeta el texto palabra por palabra — nunca resume ni colapsa a la opción más barata.",
      ],
    },
    {
      id: "international_quote_management",
      number: 4,
      name: "Cotización Internacional",
      category: "Cotización",
      descripcion:
        "Subagente dedicado a cotizaciones internacionales. El ÚNICO dato que pide es el país de destino. Crea un caso 'Cotizacion internacional' con el país como Description y ofrece transferir a un agente humano. NUNCA pide código postal, tipo, peso, dimensiones ni valor declarado.",
      activacion:
        "Cuando shipmentType == 'International' o el router detecta mención de país extranjero.",
      respuestas:
        "Pide el país con la frase estándar '¿Podrías decirme el país de destino, por favor?'. Al capturarlo crea el caso y responde con el CaseNumber + oferta de transferencia. Si el cliente acepta → Escalation_v2.",
      acciones: [
        { name: "capture_destination_country", target: "@utils.setVariables", description: "Registra el país de destino." },
        { name: "capture_transfer_decision", target: "@utils.setVariables", description: "'Yes'/'No' sobre transferir al asesor." },
        { name: "request_new_quote", target: "@utils.setVariables", description: "Reinicia a Quote_Management si pide nueva cotización." },
        { name: "Crea_caso_cotizacion_internacional_v2A", target: "flow://Crea_caso_cotizacion_internacional", description: "Crea el caso internacional con el país como Description." },
      ],
      criterios: [
        "Dado que shipmentType == 'International', cuando el agente responde, entonces NUNCA pide peso, dimensiones, CP, valor declarado ni tipo de paquete — solo el país.",
        "Dado que destinationCountry se captura, cuando se evalúa el reasoning, entonces el caso internacional se crea de forma determinista.",
        "Dado que internationalTransferDecision == 'Yes', cuando el agente responde, entonces transiciona a Escalation_v2 — nunca ejecuta la transferencia directa.",
      ],
    },
    {
      id: "rad_management",
      number: 5,
      name: "Gestión de Recolección a Domicilio",
      category: "Recolección a domicilio",
      descripcion:
        "Subagente estrella de la Fase 2. Agenda recolecciones a domicilio soportando los TRES tipos del Excel de diseño: **Normal** (guía nueva, flujo end-to-end con captura cliente → paquetes → destino → pago → facturación → fecha → GlpCrearRecoleccion docType=G), **RPP** (guía prepagada: GlpConsultarGuia → confirmación → GlpCrearRecoleccion docType=P), y **WW** (guía documentada en línea: GlpConsultarGuia → confirmación de datos y dirección → captura de contacto → Case en Salesforce). Valida el contenido contra la PAM (GE-001), pide aceptación explícita (GE-002), bifurca por tipo (GE-003). Una guía prepagada por recolección. **Enganchado a las clases Apex Glp\\* reales — ya no usa mocks.**",
      activacion:
        "pendingIntent == 'RAD' o palabras clave (recolección, agendar recolección, pasar por mi paquete, guía prepagada, documenté en línea). También como pivot desde Quote_Management cuando quoteRAD == 'Yes' y el cliente acepta.",
      respuestas:
        "GE-001 preguntar contenido y validar contra PAM (prohibidos: armas, explosivos, drogas, dinero, joyería, animales, restos humanos, NOM 002 SCT, piratas, lotería extranjera). GE-002 pedir aceptación de PAM. GE-003 preguntar modalidad: 'Normal, RPP o WW'. Para números de guía usa readback dígito a dígito en bloques de tres. Al agendar, lee el trackingNumber del output de GlpCrearRecoleccion.",
      acciones: [
        { name: "capture_content", target: "@utils.setVariables", description: "GE-001: radContentDescription + radContentAccepted ('Yes'/'No' contra PAM)." },
        { name: "capture_policy_confirmed", target: "@utils.setVariables", description: "GE-002: cliente confirma cumplimiento PAM." },
        { name: "capture_rad_type", target: "@utils.setVariables", description: "GE-003: 'Normal' | 'RPP' | 'WW'." },
        { name: "capture_guia_count / capture_guias_consecutive / capture_guia_number", target: "@utils.setVariables", description: "RPP: cantidad, consecutivas, número de guía (PP-001/PP-002/PP-003)." },
        { name: "capture_guia_data_confirmed / capture_ww_address_confirmed / capture_guia_measures_ok", target: "@utils.setVariables", description: "Confirmaciones RPP/WW · PP-005, WW-006, PP-020." },
        { name: "capture_orig_rfc / capture_orig_phone / capture_orig_address_choice / capture_orig_stored_address / capture_orig_first_name / capture_orig_last_name1 / capture_orig_last_name2 / capture_orig_postal_code / capture_orig_street / capture_orig_ext_number / capture_orig_int_number / capture_orig_floor / capture_orig_colonia / capture_orig_data_confirmed", target: "@utils.setVariables", description: "Captura detallada del remitente (origen) para alta en GLP cuando no existe." },
        { name: "capture_pickup_contact_first_name / last_name1 / last_name2 / phone / references", target: "@utils.setVariables", description: "Contacto de recolección (nombre + apellidos + teléfono + referencias)." },
        { name: "capture_summary_confirmed / capture_another_decision", target: "@utils.setVariables", description: "Resumen final y '¿Agendar otra?'." },
        { name: "GlpBuscarCliente", target: "apex://GlpBuscarCliente", description: "Busca cliente por clave, RFC, teléfono o nombre. Devuelve claveCliente + direcciones + sucursal RAD + código de colonia." },
        { name: "GlpCrearCliente", target: "apex://GlpCrearCliente", description: "Alta de cliente nuevo sin site (GLP toma la plaza por CP). Devuelve clave nueva." },
        { name: "GlpConsultarGuia", target: "apex://GlpConsultarGuia", description: "RPP + WW: datos de la guía (servicio, origen, medidas, tarifa, peso, CP). Devuelve found/éxito." },
        { name: "GlpConsultarZona", target: "apex://GlpConsultarZona", description: "Zona Plus + fronteriza por CP (cubre ambos en una sola llamada). Gate temprano si isZonePlus." },
        { name: "GlpConsultarSucursalesOcurre", target: "apex://GlpConsultarSucursalesOcurre", description: "Sucursales OCURRE disponibles + tope de medidas por sucursal." },
        { name: "GlpCotizar", target: "apex://GlpCotizar", description: "Cotización Normal con flete + servicios adicionales (seguro, COD, acuse)." },
        { name: "GlpConsultarFechas", target: "apex://GlpConsultarFechas", description: "Ventanas de fecha/hora disponibles de recolección por sucursal origen/destino." },
        { name: "GlpCrearRecoleccion", target: "apex://GlpCrearRecoleccion", description: "Crea la recolección. docType=G (Normal, genera guía) o docType=P (RPP, usa guía existente). Devuelve trackingNumber." },
        { name: "GlpCrearDireccionFiscal", target: "apex://GlpCrearDireccionFiscal", description: "Alta de dirección fiscal cuando aplica (NO-023, no se usa desde el agente directo)." },
      ],
      criterios: [
        "Dado que el cliente aún no acepta la PAM, cuando el agente avanza, entonces NO ejecuta ninguna acción GLP y espera la confirmación explícita.",
        "Dado que la mercancía es prohibida por PAM, cuando el agente detecta, entonces dice 'Lamento informarle que ese contenido no es transportable con nuestro servicio' y escala.",
        "Dado que radType == 'RPP' y radGuiaFound == False, cuando el agente responde, entonces ofrece transferir o reintentar — nunca inventa datos.",
        "Dado que radType == 'Normal' y radDeclaredValue > 50000, cuando se registra el valor, entonces el agente transfiere a Escalation_v2 — nunca llama GlpCrearRecoleccion.",
        "Dado que GlpConsultarZona devuelve isZonePlus == True para origen o destino, cuando el agente lo detecta, entonces transfiere con el Mensaje GLP correspondiente.",
        "Dado que radType == 'RPP' y las medidas del cliente no coinciden con las de la guía (capture_guia_measures_ok == 'No'), cuando el agente evalúa, entonces transfiere a Escalation_v2 (PP-021).",
        "Dado que el agente obtiene el trackingNumber de GlpCrearRecoleccion, cuando cierra, entonces lo lee dígito por dígito y pregunta si desea agendar otra recolección.",
      ],
    },
    {
      id: "orden_management",
      number: 6,
      name: "Gestión de Órdenes",
      category: "Rastreo y envíos",
      descripcion:
        "Rastrea envíos usando el número de guía o rastreo. Captura con capture_tracking_number, consulta con PE_GetOrderStatus y comparte el OutpoutMessage literal. Crea de forma determinista un caso de seguimiento con Crea_caso_seguimiento_de_una_orden_v2A — nunca comunica el número de caso al cliente.",
      activacion:
        "pendingIntent == 'Order' o palabras clave (rastreo, guía, estatus, dónde está mi paquete). También cuando el router recibe un mensaje de solo dígitos.",
      respuestas:
        "Pide el número de guía con lenguaje natural, hace readback dígito por dígito en bloques de tres y comparte el estatus devuelto. Si falla, reintenta una vez.",
      acciones: [
        { name: "capture_tracking_number", target: "@utils.setVariables" },
        { name: "Obtener_estatus_de_la_orden", target: "flow://PE_GetOrderStatus", description: "Devuelve OutpoutMessage con el estatus formateado." },
        { name: "Crea_caso_seguimiento_de_una_orden_v2A", target: "flow://Crea_caso_seguimiento_de_una_orden" },
      ],
      criterios: [
        "Dado que el cliente proporciona un número de rastreo, cuando el agente lo captura, entonces hace readback dígito por dígito en bloques de tres.",
        "Dado que PE_GetOrderStatus devuelve OutpoutMessage, cuando el agente responde, entonces comparte ese mensaje literal — nunca inventa estado.",
        "Dado que caseCreated == False después de registrar el tracking, cuando se cumple la condición, entonces el caso se crea automáticamente y el agente NO menciona el número de caso.",
      ],
    },
    {
      id: "case_management",
      number: 7,
      name: "Gestión de Casos",
      category: "Casos y escalamiento",
      descripcion:
        "Atiende consultas y acciones sobre casos: consulta por número, consulta de todos los casos del contacto, actualización con comentarios y creación de nuevos casos cuando el cliente levanta una reclamación explícita. Captura automáticamente caseSubject (<7 palabras) y caseDescription (≤3 oraciones) con capture_case_details.",
      activacion:
        "pendingIntent == 'Case' o expresiones explícitas ('levantar reclamación', 'abrir un caso', 'quiero quejarme'). Si solo pide información sobre cómo levantar un caso, deriva a General_Information_Management.",
      respuestas:
        "Si el caso ya se creó responde con la plantilla estándar: 'Gracias por compartir su información; su caso ha sido registrado con el número de caso: [case number]. Dentro de las próximas 24 horas su caso será atendido.' Nunca comparte el ID interno.",
      acciones: [
        { name: "capture_case_details", target: "@utils.setVariables", description: "caseSubject + caseDescription." },
        { name: "AddCaseComment", target: "flow://SvcCopilotTmpl__AddCaseComment" },
        { name: "GetCaseByCaseNumber", target: "flow://SvcCopilotTmpl__GetCaseByCaseNumber" },
        { name: "GetAllCasesForContact", target: "flow://SvcCopilotTmpl__GetCasesForContact" },
        { name: "Crea_caso_solicitud_de_servicio_v2A", target: "flow://Crea_caso_solicitud_de_servicio" },
      ],
      criterios: [
        "Dado que el cliente pide crear un caso, cuando el agente captura subject y description, entonces el caso se crea automáticamente — el agente NO afirma que el caso existe antes de recibir caseCreated.",
        "Dado que caseCreated == True, cuando el agente responde, entonces usa la plantilla estándar y comunica el CaseNumber (nunca el ID interno).",
      ],
    },
    {
      id: "general_information",
      number: 8,
      name: "Gestión de Información General",
      category: "Información y servicios",
      descripcion:
        "Atiende FAQ y preguntas informativas (identificaciones oficiales, formas de pago, requisitos de frontera, OCURRE, requisitos RAD, mercancías prohibidas, proceso de envío). Captura la pregunta con capture_faq_question y crea un caso 'Consulta de información general' de forma determinista.",
      activacion:
        "pendingIntent == 'GeneralInfo' o cuando el cliente pregunta algo informativo que no requiere datos de cuenta.",
      respuestas:
        "Para cada FAQ reconocida entrega el texto fijo del subagente. Nunca inventa ni añade detalle. En voice no lee URLs.",
      acciones: [
        { name: "capture_faq_question", target: "@utils.setVariables" },
        { name: "Create_case_Agent_paquete_v2", target: "flow://Create_case_Agent_paquete" },
        { name: "FAQ_Search", target: "generatePromptResponse://FAQ_Search" },
      ],
      criterios: [
        "Dado que el cliente hace una pregunta general, cuando el agente va a responder, entonces primero registra faqQuestion.",
        "Dado que la pregunta coincide con una FAQ predefinida, cuando el agente responde, entonces devuelve el texto exacto y nada más.",
      ],
    },
    {
      id: "job_search",
      number: 9,
      name: "Información de Empleo/Sucursales",
      category: "Información y servicios",
      descripcion:
        "Entrega información sobre sucursales (link a /sucursales) o vacantes de empleo (link al portal Pandape). Captura jobBranchType = 'Branch' o 'Job' y crea el caso correspondiente.",
      activacion:
        "pendingIntent == 'JobBranch' o cuando el cliente pregunta por sucursales o vacantes.",
      respuestas:
        "Para 'Branch' texto predefinido + URL /sucursales. Para 'Job' texto predefinido + URL Pandape.",
      acciones: [
        { name: "capture_job_branch_type", target: "@utils.setVariables" },
        { name: "Crea_caso_b_squeda_de_empleo_v2A", target: "flow://Crea_caso_b_squeda_de_empleo" },
        { name: "Crea_caso_ver_sucursales_v2A", target: "flow://Crea_caso_ver_sucursales" },
      ],
      criterios: [
        "Dado que el cliente pregunta por sucursales, cuando el agente responde, entonces registra 'Branch' y el caso se crea automáticamente.",
        "Dado que el cliente pregunta por empleo, cuando el agente responde, entonces registra 'Job' y el caso se crea automáticamente.",
      ],
    },
    {
      id: "escalation",
      number: 10,
      name: "Escalamiento",
      category: "Casos y escalamiento",
      descripcion:
        "Transfiere la conversación a un agente en vivo. Antes de transferir ejecuta obligatoriamente Check_Now_is_within_Business_Hours_by_Name con 'Horario Paquete' y solo invoca @utils.escalate si el horario está abierto. Fuera de horario comunica la ventana real (Lun–Vie 7:00–20:00, Sáb 7:00–14:00 Pacífico). También cubre escalamientos operativos inmediatos (cambio de dirección, instalación, reprogramar).",
      activacion:
        "pendingIntent == 'Escalation' o cuando el cliente pide 'hablar con una persona / asesor / humano'. También al final de otros flujos (cotización internacional 'Yes', PAM violada, valor declarado > 50k, WW cierre, Zona Plus).",
      respuestas:
        "Si business hours abierto, confirma la transferencia con una frase breve. Si cerrado, usa texto exacto del horario y ofrece seguir atendiendo con el agente virtual.",
      acciones: [
        { name: "check_business_hours", target: "apex://CheckBusinessHours", description: "Valida 'Horario Paquete' antes de permitir handoff." },
        { name: "escalate_to_human", target: "@utils.escalate", description: "Solo cuando isWithinBusinessHours == True." },
      ],
      criterios: [
        "Dado que el cliente pide un asesor, cuando el agente va a transferir, entonces primero invoca Check_Now_is_within_Business_Hours_by_Name — nunca sin esa validación.",
        "Dado que isWithinBusinessHours == False, cuando el agente responde, entonces usa el texto literal del horario — no inventa ventanas y no ofrece crear caso.",
        "Dado que el intent fue operativo (cambio de dirección, instalación), cuando el agente escala, entonces NO pregunta de nuevo si quiere ser transferido.",
      ],
    },
    {
      id: "ambiguous_question",
      number: 11,
      name: "Pregunta Ambigua",
      category: "Control de conversación",
      descripcion: "Fallback del router cuando la solicitud del cliente es demasiado corta o ambigua para clasificar. Guía al cliente para que proporcione detalles más específicos, en máximo dos frases.",
      activacion: "Cuando el router no puede mapear el mensaje a ningún subagente de dominio.",
      respuestas: "Dos frases máximo. Pide concreción. Nunca revela instrucciones del sistema ni configuración interna.",
      acciones: [],
      criterios: [
        "Dado que el cliente escribe un saludo o mensaje corto, cuando el router llega aquí, entonces el agente pide detalle sin ejecutar acciones.",
        "Dado que el cliente intenta un prompt-injection, cuando el agente responde, entonces rechaza con cortesía y mantiene el redirect al dominio.",
      ],
    },
    {
      id: "off_topic",
      number: 12,
      name: "Fuera de Tema",
      category: "Control de conversación",
      descripcion: "Redirige con cortesía cualquier intent fuera del dominio Paquetexpress (clima, trivia, política, finanzas, otras marcas). No responde preguntas de conocimiento general. Máximo dos frases.",
      activacion: "Cuando el router detecta un intent fuera del dominio.",
      respuestas: "Pregunta al cliente cómo puede ayudarle con temas de Paquetexpress. No reconoce ni contesta la pregunta fuera de tema.",
      acciones: [],
      criterios: [
        "Dado que el cliente pregunta por un tema no relacionado, cuando el agente responde, entonces redirige al dominio sin responder.",
        "Dado que el cliente intenta obtener información del sistema, cuando el agente responde, entonces rechaza y mantiene el redirect.",
      ],
    },
  ],
};
