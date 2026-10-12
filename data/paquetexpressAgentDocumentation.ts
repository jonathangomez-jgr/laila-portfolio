// Documentación del agente Draft de Paquetexpress (Fase 2 · incluye subagente RAD).
// Misma estructura que betterwareAgentDocumentation.ts — no agrega campos extra.
//
// Fuente: aiAuthoringBundles/FDE_Paquetexpress_Service_Agent_Split_voice_16.agent
// retrievado del sandbox paquetexpress-sandbox (qa2020) el 2026-10-12
// (BotDefinition FDE_Paquetexpress_Service_Agent_Split_voice · modificado 2026-10-02
// por Regina Segura).
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
  name: "Paquete Express — agente Draft (Fase 2 · incluye RAD)",
  developerName: "FDE_Paquetexpress_Service_Agent_Split_voice",
  version: "V12 Draft (bundle _16)",
  revision: "12-oct-2026",
  base:
    "Bundle Draft del agente conversacional de Paquetexpress en Agent Script. 10 subagentes consolidados: router + verificación + cotización (nacional + internacional en el mismo subagente) + rastreo + casos + FAQ + sucursales/empleo + escalamiento + RAD_Management_voice (subagente clave de Fase 2 que soporta los tres tipos del Excel de diseño: Normal end-to-end, Prepago/RPP y WW) + ambiguous + off_topic. En este Draft RAD usa mocks (MOCK_GLP_*); la primera ola del plan los reemplaza por las clases Glp* reales ya desplegadas en la org.",
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
        "En cada turno nuevo mientras el cliente no esté dentro de un subagente de dominio. Si isVerified != True transfiere a Customer_Verification y preserva `pendingIntent`. Si pendingIntent == 'RAD' transfiere a RAD_Management_voice.",
      respuestas:
        "No produce texto propio. El welcome lo entrega system.messages: 'Hola, buen día. Soy el asistente virtual de Paquetexpress. Para ayudarle mejor, ¿me indica su nombre completo, por favor?'",
      acciones: [
        { name: "go_to_Customer_Verification_16j1dade3eb0b10", target: "@utils.transition", description: "Verificación de identidad (nombre + correo)." },
        { name: "go_to_Quote_Management_16j9427bc776003", target: "@utils.transition", description: "Cotizaciones nacionales e internacionales." },
        { name: "go_to_Orden_Management_16je7f3f3223af5", target: "@utils.transition", description: "Rastreo/estatus de envío." },
        { name: "go_to_CaseManagement_v2_16jf9db4b526803", target: "@utils.transition", description: "Casos: alta, consulta, comentarios." },
        { name: "go_to_General_Information_Management_16jeb86fca18701", target: "@utils.transition", description: "FAQ y preguntas informativas." },
        { name: "go_to_Job_Search_16jfb5eb38adcd9", target: "@utils.transition", description: "Sucursales y vacantes de empleo." },
        { name: "go_to_Escalation_v2_16j6b2f5f1ead75", target: "@utils.transition", description: "Transferencia a agente humano." },
        { name: "go_to_RAD_Management_voice", target: "@utils.transition", description: "Agendar recolección a domicilio (RPP, WW o Normal)." },
        { name: "go_to_ambiguous_question", target: "@utils.transition", description: "Fallback cuando la solicitud es demasiado ambigua." },
        { name: "go_to_off_topic", target: "@utils.transition", description: "Redirige intents fuera del dominio." },
      ],
      criterios: [
        "Dado que el cliente aún no está verificado, cuando el router recibe un mensaje, entonces transfiere a Customer_Verification sin importar el intent — pendingIntent se preserva.",
        "Dado que pendingIntent == 'RAD' y isVerified == True, cuando el router evalúa, entonces transiciona directo a RAD_Management_voice.",
        "Dado que el cliente envía solo dígitos, cuando el router evalúa, entonces lo trata como número de guía y rutea a Orden_Management.",
        "Dado que el mensaje queda fuera del dominio, cuando el router responde, entonces delega a off_topic — nunca responde conocimiento general por su cuenta.",
      ],
    },
    {
      id: "customer_verification",
      number: 2,
      name: "Verificación del Cliente",
      category: "Entrada y verificación",
      descripcion:
        "Gate de identidad obligatorio antes de abrir cualquier subagente de dominio. Captura nombre + apellido + correo con regla de dos turnos. Ejecuta `AG_Get_and_create_contact` para buscar o crear el Contact. Guarda `verifiedContactId`, `isVerified` y `contactRecord` para que los subagentes downstream consulten sin re-identificar.",
      activacion:
        "Al inicio de la conversación, o cuando cualquier subagente detecta isVerified != True antes de ejecutar su propio reasoning. El cliente puede dictar su intención en el mismo turno; se guarda con `capture_pending_intent` para retomarla.",
      respuestas:
        "Turno 1: captura el nombre completo y lo confirma con readback natural. Turno 2: pide el correo con 'Gracias. Y para completar la validación, ¿me dicta su correo electrónico? Puede decirlo despacio.' + readback silábico. Al capturar: 'Gracias. Un momento mientras valido sus datos. Mientras tanto, ¿en qué le puedo ayudar hoy?'",
      acciones: [
        { name: "capture_customer_details", target: "@utils.setVariables", description: "customerFirstName + customerLastName + customerEmail." },
        { name: "capture_pending_intent", target: "@utils.setVariables", description: "Valores permitidos: Quote, Order, Case, GeneralInfo, JobBranch, Escalation, RAD." },
        { name: "AG_Get_and_create_contact", target: "flow://AG_Get_and_create_contact", description: "Busca por correo; si no existe crea con FirstName + LastName. Devuelve contactId, isVerified y recordContact." },
      ],
      criterios: [
        "Dado que el cliente ya proporcionó nombre y correo, cuando se ejecuta AG_Get_and_create_contact, entonces el flow actualiza isVerified = True, verifiedContactId y contactRecord — sin volver a pedir datos.",
        "Dado que la verificación aún no termina, cuando el agente responde, entonces NO confirma que ya está verificado y NO usa frases como '¿en qué puedo ayudarle?'.",
        "Dado que el cliente dicta un correo, cuando el agente lo repite, entonces hace readback silábico y nunca lee la URL ni el ID del contacto.",
        "Dado que isVerified ya fue True durante la sesión, cuando el cliente intenta cambiar de identidad, entonces el agente mantiene la verificación original y no permite el cambio.",
      ],
    },
    {
      id: "quote_management",
      number: 3,
      name: "Gestión de Cotización",
      category: "Cotización",
      descripcion:
        "Clasifica el envío como Domestic o International. Para Domestic recorre un cuestionario determinista (CP origen → CP destino → tipo paquete/sobre → peso → largo → ancho → alto → RAD → EAD → IVPF → monto), invoca Obtener_Cotizaci_n_Paqueteria_V2 y crea un caso. Para International registra país destino, crea caso internacional y ofrece transferir. Si quoteRAD == 'Yes' y el cliente acepta tras la cotización, pivota a RAD_Management_voice.",
      activacion:
        "pendingIntent == 'Quote' o palabras clave (cotizar, cotización, precio, tarifa, budget, price, quotation). Requiere cliente verificado.",
      respuestas:
        "Pregunta a la vez, registra cada respuesta con su capture_*. Para Envelope informa dimensiones fijas (35.5 × 24 cm) y bloquea seguro. Al obtener la tarifa comparte el mensaje de la acción sin inventar y, si quoteRAD = Yes, ofrece agendar la recolección ahora.",
      acciones: [
        { name: "capture_shipment_classification", target: "@utils.setVariables", description: "shipmentType = 'Domestic' o 'International' (tokens inglés exactos)." },
        { name: "capture_cp_origen / capture_cp_destino / capture_tipo / capture_peso / capture_largo / capture_ancho / capture_alto / capture_rad / capture_ead / capture_ivpf / capture_amt", target: "@utils.setVariables", description: "Captura paso-a-paso de los datos del envío." },
        { name: "capture_pending_intent_quote_to_rad", target: "@utils.setVariables", description: "Post-cotización, si quoteRAD = Yes y el cliente acepta → pendingIntent = 'RAD'." },
        { name: "capture_transfer_decision", target: "@utils.setVariables", description: "'Yes'/'No' para transferir al asesor tras cotización internacional." },
        { name: "Obtener_C_digo_postal_origen_v_lido_17935e53f97ff97", target: "flow://PE_GetValidOriginPostalCode", description: "Valida CP origen." },
        { name: "Obtener_C_digo_postal_destino_v_lido_179b20f1eec67d9", target: "flow://PE_GetValidDestinationPostalCode", description: "Valida CP destino." },
        { name: "Obtener_Cotizaci_n_Paqueteria_V2", target: "flow://Obtener_Cotizaci_n_Paqueter_a", description: "Calcula la cotización final." },
        { name: "Crea_caso_cotizacion_nacional_v2", target: "flow://Crea_caso_cotizacion_nacional", description: "Caso de cotización nacional." },
        { name: "Crea_caso_cotizacion_internacional_v2A", target: "flow://Crea_caso_cotizacion_internacional", description: "Caso de cotización internacional." },
      ],
      criterios: [
        "Dado que shipmentType aún no se registra, cuando el cliente pide una cotización, entonces el agente primero clasifica Domestic/International antes de pedir cualquier dimensión.",
        "Dado que shipmentType == 'International', cuando se registra destinationCountry, entonces se crea automáticamente el caso internacional y se pregunta si transferir — nunca se cotiza.",
        "Dado que quoteRAD == 'Yes' y la cotización ya se compartió, cuando el cliente acepta agendar, entonces pendingIntent='RAD' y transiciona a RAD_Management_voice.",
      ],
    },
    {
      id: "rad_management",
      number: 4,
      name: "Gestión de Recolección a Domicilio (RAD)",
      category: "Recolección a domicilio",
      descripcion:
        "Subagente clave de Fase 2. Soporta los tres tipos del Excel de diseño: **RPP** (guía prepagada: BuscarGuia → DatesToCollection → RadCreate), **WW** (guía documentada en línea: hoy colapsado a escalación directa — pendiente construir WW-003 → WW-010), y **Normal** (recolección completa: captura cliente origen → dirección → paquetes → cliente destino → entrega → pago → cobertura → valor declarado → fecha → RadCreate docType=G). Intake común GE-001/GE-002/GE-003 compartido (contenido + PAM + tipo). En este Draft invoca MOCK_GLP_*; la Ola 1 del plan los reemplaza por las clases Glp* reales ya desplegadas (GlpBuscarCliente, GlpConsultarGuia, GlpConsultarZona, GlpConsultarSucursalesOcurre, GlpConsultarFechas, GlpCotizar, GlpCrearRecoleccion, GlpCrearCliente, GlpHttpCliente).",
      activacion:
        "pendingIntent == 'RAD' o palabras clave (recolección, agendar recolección, pasar por mi paquete, guía prepagada, documenté en línea). También pivot desde Quote_Management cuando quoteRAD == 'Yes' y el cliente acepta.",
      respuestas:
        "GE-001 preguntar contenido y validar contra PAM (prohibidos: armas, explosivos, drogas, dinero, joyería, animales, restos humanos, NOM 002 SCT, piratas, lotería extranjera). GE-002 pedir aceptación de PAM sin leer URL. GE-003 preguntar modalidad con frase natural: '¿Su recolección es con guía prepagada, con guía documentada en línea, o es una recolección normal?'. En voice usa 'guía prepagada' / 'recolección a domicilio' / 'OCURRE o recoger en sucursal' — nunca RPP/RAD/EAD como siglas. Readback dígito a dígito para números de guía. Al agendar, lee el trackingNumber en bloques de tres.",
      acciones: [
        { name: "capture_rad_content_accepted", target: "@utils.setVariables", description: "Contenido del paquete + validación PAM OK." },
        { name: "capture_rad_policy_confirmed", target: "@utils.setVariables", description: "Cliente confirmó aceptación PAM." },
        { name: "capture_rad_type", target: "@utils.setVariables", description: "'RPP' | 'WW' | 'Normal'." },
        { name: "capture_rad_guia_number", target: "@utils.setVariables", description: "RPP · número de guía tras readback confirmado." },
        { name: "capture_rad_selected_option", target: "@utils.setVariables", description: "RPP · OPT_1, OPT_2 u OPT_3." },
        { name: "reset_rad_guia_state", target: "@utils.setVariables", description: "RPP · limpia estado de guía para reintentar." },
        { name: "capture_orig_customer_search", target: "@utils.setVariables", description: "Normal · identificadores del cliente origen (clave/RFC/nombre+tel)." },
        { name: "capture_orig_address_manual / confirm_orig_address / capture_orig_postal_code", target: "@utils.setVariables", description: "Normal · dirección de recolección confirmada." },
        { name: "capture_orig_contact", target: "@utils.setVariables", description: "Normal · nombre + teléfono + referencias del contacto en origen." },
        { name: "capture_package_count / capture_packages_summary / capture_sat_key", target: "@utils.setVariables", description: "Normal · cantidad, resumen consolidado y clave SAT." },
        { name: "capture_dest_customer_search / capture_dest_address_manual / confirm_dest_address / capture_dest_postal_code / capture_dest_contact", target: "@utils.setVariables", description: "Normal · cliente, dirección y contacto de destino." },
        { name: "capture_shipment_delivery / capture_branch_name", target: "@utils.setVariables", description: "Normal · 'Domicilio' o 'Ocurre' + sucursal elegida." },
        { name: "capture_payment_method / capture_payment_mode", target: "@utils.setVariables", description: "Normal · método ('Origin'|'FreightCollect'|'Requester'|'ThirdParty') + modo ('Cash'|'Transfer'|'Info')." },
        { name: "capture_declared_value", target: "@utils.setVariables", description: "Normal · valor declarado entero. Si > 50k → escalar." },
        { name: "capture_coverage / capture_additional_service", target: "@utils.setVariables", description: "Normal · cobertura + COD/Acuse." },
        { name: "capture_pickup_datetime", target: "@utils.setVariables", description: "Normal · fecha + ventana. Dispara agendamiento automático." },
        { name: "reset_rad_full_state", target: "@utils.setVariables", description: "Reset de 40+ variables para agendar otra recolección en la misma llamada." },
        { name: "MOCK_GLP_BuscarGuia", target: "apex://MOCK_GLP_BuscarGuia", description: "Mock · real pendiente: GlpConsultarGuia. RPP + WW." },
        { name: "MOCK_GLP_BuscarCliente", target: "apex://MOCK_GLP_BuscarCliente", description: "Mock · real pendiente: GlpBuscarCliente. Normal (origen + destino)." },
        { name: "MOCK_GLP_ConsultarSucursalFronteriza", target: "apex://MOCK_GLP_ConsultarSucursalFronteriza", description: "Mock · real pendiente: GlpConsultarZona (cubre fronteriza + Zona Plus)." },
        { name: "MOCK_GLP_ValidarDimensiones", target: "apex://MOCK_GLP_ValidarDimensiones", description: "Mock · absorbida por GlpConsultarSucursalesOcurre." },
        { name: "MOCK_GLP_SucursalesDisponibles", target: "apex://MOCK_GLP_SucursalesDisponibles", description: "Mock · real pendiente: GlpConsultarSucursalesOcurre." },
        { name: "MOCK_GLP_DatesToCollection (datesToCollectionMock)", target: "apex://MOCK_GLP_DatesToCollection", description: "Mock · real pendiente: GlpConsultarFechas." },
        { name: "MOCK_GLP_RadCreate", target: "apex://MOCK_GLP_RadCreate", description: "Mock · real pendiente: GlpCrearRecoleccion (docType=G Normal, P RPP)." },
      ],
      criterios: [
        "Dado que el cliente aún no acepta la PAM, cuando el agente avanza, entonces NO ejecuta ninguna acción GLP y espera la confirmación explícita.",
        "Dado que la mercancía es prohibida por PAM, cuando el agente detecta, entonces dice 'Lamento informarle que ese contenido no es transportable con nuestro servicio' y escala.",
        "Dado que radType == 'RPP' y radGuiaFound == False, cuando el agente responde, entonces ofrece transferir o reintentar con otro número — nunca inventa datos.",
        "Dado que radType == 'Normal' y radDeclaredValue > 50000, cuando se registra el valor, entonces el agente transfiere a Escalation_v2 — nunca llama RadCreate.",
        "Dado que el agente obtiene el trackingNumber, cuando cierra, entonces lo lee dígito por dígito en bloques de tres.",
        "Dado que radType == 'WW', cuando el agente responde, entonces hoy solo escala al asesor; el flujo completo (WW-003 → WW-010 del Excel) está pendiente de construir.",
      ],
    },
    {
      id: "orden_management",
      number: 5,
      name: "Gestión de Órdenes",
      category: "Rastreo y envíos",
      descripcion:
        "Rastrea envíos usando el número de guía o rastreo. Captura con capture_tracking_number, consulta con PE_GetOrderStatus y comparte el OutpoutMessage devuelto. Crea de forma determinista un caso de seguimiento con Crea_caso_seguimiento_de_una_orden_v2A — nunca comunica el número de caso al cliente.",
      activacion:
        "pendingIntent == 'Order' o palabras clave (rastreo, guía, estatus, dónde está mi paquete). Requiere cliente verificado.",
      respuestas:
        "Pide el número de guía con lenguaje natural, hace readback dígito por dígito en bloques de tres y comparte el estatus devuelto. Si una acción falla, reintenta una vez y, si persiste, informa sin exponer el error técnico.",
      acciones: [
        { name: "capture_tracking_number", target: "@utils.setVariables", description: "Captura el número de rastreo/guía antes de consultar." },
        { name: "Obtener_estatus_de_la_orden", target: "flow://PE_GetOrderStatus", description: "Devuelve OutpoutMessage con el estatus formateado." },
        { name: "Crea_caso_seguimiento_de_una_orden_v2A", target: "flow://Crea_caso_seguimiento_de_una_orden", description: "Caso de seguimiento asociado al contacto verificado." },
      ],
      criterios: [
        "Dado que el cliente proporciona un número de rastreo, cuando el agente lo captura, entonces hace readback dígito por dígito en bloques de tres antes de consultar.",
        "Dado que PE_GetOrderStatus devuelve OutpoutMessage, cuando el agente responde, entonces comparte ese mensaje literal — nunca inventa estado ni fecha de entrega.",
        "Dado que caseCreated == False después de registrar el tracking, cuando se cumple la condición del reasoning, entonces Crea_caso_seguimiento_de_una_orden_v2A se ejecuta automáticamente y el agente NO menciona el número de caso.",
      ],
    },
    {
      id: "case_management",
      number: 6,
      name: "Gestión de Casos",
      category: "Casos y escalamiento",
      descripcion:
        "Atiende consultas y acciones sobre casos: consulta por número, consulta de todos los casos del contacto, actualización con comentarios y creación de nuevos casos cuando el cliente levanta una reclamación o queja explícita. Captura automáticamente caseSubject (<7 palabras) y caseDescription (≤3 oraciones) con capture_case_details, y el reasoning dispara la creación con Crea_caso_solicitud_de_servicio_v2A.",
      activacion:
        "pendingIntent == 'Case' o expresiones explícitas ('levantar reclamación', 'abrir un caso', 'quiero quejarme') o consulta de estatus de caso existente. Si solo pide información sobre cómo levantar un caso, deriva a General_Information_Management.",
      respuestas:
        "Si el caso ya se creó responde con la plantilla estándar: 'Gracias por compartir su información; su caso ha sido registrado con el número de caso: [case number]. Dentro de las próximas 24 horas su caso será atendido. ¿Hay algo más en lo que pueda ayudarle?'. Nunca comparte el ID interno.",
      acciones: [
        { name: "capture_case_details", target: "@utils.setVariables", description: "caseSubject (<7 palabras) + caseDescription (≤3 oraciones)." },
        { name: "AddCaseComment_179e67ef5aa18da", target: "flow://SvcCopilotTmpl__AddCaseComment", description: "Agrega un comentario a un caso existente." },
        { name: "GetCaseByCaseNumber_1792c1c327ab424", target: "flow://SvcCopilotTmpl__GetCaseByCaseNumber", description: "Obtiene un caso por su número." },
        { name: "GetAllCasesForContact", target: "flow://SvcCopilotTmpl__GetCasesForContact", description: "Lista todos los casos del contacto." },
        { name: "Crea_caso_solicitud_de_servicio_v2A", target: "flow://Crea_caso_solicitud_de_servicio", description: "Crea el caso con subject + description capturados." },
      ],
      criterios: [
        "Dado que el cliente pide crear un caso, cuando el agente captura caseSubject y caseDescription, entonces el caso se crea automáticamente — el agente NO afirma al cliente que el caso existe antes de recibir caseCreated == True.",
        "Dado que caseCreated == True, cuando el agente responde al cliente, entonces usa la plantilla estándar y comunica el CaseNumber (nunca el ID interno).",
        "Dado que el cliente pide información genérica sobre reclamaciones, cuando el agente lo detecta, entonces transiciona a General_Information_Management en vez de crear un caso.",
      ],
    },
    {
      id: "general_information",
      number: 7,
      name: "Gestión de Información General",
      category: "Información y servicios",
      descripcion:
        "Atiende preguntas frecuentes y preguntas informativas (identificaciones oficiales, formas de pago, requisitos de frontera, requisitos para OCURRE, requisitos RAD, mercancías prohibidas, proceso de envío). Captura la pregunta con capture_faq_question y crea un caso 'Consulta de información general' de forma determinista. En voice no lee URLs.",
      activacion:
        "pendingIntent == 'GeneralInfo' o cuando el cliente pregunta algo informativo que no requiere datos de su cuenta.",
      respuestas:
        "Para cada FAQ reconocida entrega el texto fijo (p.ej. 'INE, pasaporte mexicano o cédula profesional.'). Nunca inventa ni añade detalle fuera de los textos definidos. Si el cliente pregunta por el sitio web en voice, ofrece transferir con un asesor que comparta el enlace.",
      acciones: [
        { name: "capture_faq_question", target: "@utils.setVariables", description: "Registra una versión concisa de la pregunta antes de responder." },
        { name: "Create_case_Agent_paquete_v2", target: "flow://Create_case_Agent_paquete", description: "Crea el caso 'Consulta de información general'." },
        { name: "FAQ_Search", target: "generatePromptResponse://FAQ_Search", description: "Búsqueda sobre Knowledge cuando la pregunta no cae en los textos predefinidos." },
      ],
      criterios: [
        "Dado que el cliente hace una pregunta general, cuando el agente va a responder, entonces primero registra faqQuestion con capture_faq_question.",
        "Dado que la pregunta coincide con una FAQ predefinida, cuando el agente responde, entonces devuelve el texto exacto y nada más.",
        "Dado que el canal es voice, cuando el cliente pide el sitio web, entonces el agente NO lee la URL y ofrece una vía alternativa.",
      ],
    },
    {
      id: "job_search",
      number: 8,
      name: "Información de Empleo/Sucursales",
      category: "Información y servicios",
      descripcion:
        "Entrega información sobre sucursales (link a /sucursales) o vacantes de empleo (link al portal Pandape). Captura jobBranchType = 'Branch' o 'Job' con capture_job_branch_type y crea el caso correspondiente.",
      activacion: "pendingIntent == 'JobBranch' o cuando el cliente pregunta por sucursales/direcciones o por vacantes de empleo.",
      respuestas: "Para 'Branch' responde con texto predefinido + URL /sucursales. Para 'Job' responde con texto predefinido + URL Pandape. Al cerrar pregunta si puede ayudar con algo más.",
      acciones: [
        { name: "capture_job_branch_type", target: "@utils.setVariables", description: "'Branch' o 'Job'." },
        { name: "Crea_caso_b_squeda_de_empleo_v2A", target: "flow://Crea_caso_b_squeda_de_empleo", description: "Caso de consulta de vacantes." },
        { name: "Crea_caso_ver_sucursales_v2A", target: "flow://Crea_caso_ver_sucursales", description: "Caso de consulta de sucursales." },
      ],
      criterios: [
        "Dado que el cliente pregunta por sucursales, cuando el agente responde, entonces registra jobBranchType = 'Branch' y el caso se crea automáticamente.",
        "Dado que el cliente pregunta por empleo, cuando el agente responde, entonces registra jobBranchType = 'Job' y el caso se crea automáticamente.",
      ],
    },
    {
      id: "escalation",
      number: 9,
      name: "Escalamiento",
      category: "Casos y escalamiento",
      descripcion:
        "Transfiere la conversación a un agente en vivo. Antes de transferir ejecuta obligatoriamente Check_Now_is_within_Business_Hours_by_Name con 'Horario Paquete' y solo invoca @utils.escalate si el horario está abierto. Fuera de horario comunica la ventana real (Lun–Vie 7:00–20:00, Sáb 7:00–14:00 Pacífico).",
      activacion:
        "pendingIntent == 'Escalation' o cuando el cliente pide 'hablar con una persona / asesor / humano'. También al final de otros flujos (cotización internacional 'Yes', PAM violada, valor declarado > 50k, WW).",
      respuestas:
        "Pregunta siempre al cliente si desea ser transferido. Si business hours abierto, confirma la transferencia con una frase breve. Si cerrado, responde con el texto exacto del horario y ofrece seguir atendiendo con el agente virtual.",
      acciones: [
        { name: "check_business_hours", target: "apex://CheckBusinessHours", description: "Valida 'Horario Paquete' antes de permitir el handoff." },
        { name: "escalate_to_human", target: "@utils.escalate", description: "Solo cuando isWithinBusinessHours == True." },
      ],
      criterios: [
        "Dado que el cliente pide un asesor, cuando el agente va a transferir, entonces primero invoca Check_Now_is_within_Business_Hours_by_Name — nunca sin esa validación.",
        "Dado que isWithinBusinessHours == False, cuando el agente responde, entonces usa el texto literal del horario — no inventa ventanas y no ofrece crear caso.",
      ],
    },
    {
      id: "ambiguous_question",
      number: 10,
      name: "Pregunta Ambigua",
      category: "Control de conversación",
      descripcion: "Fallback del router cuando la solicitud del cliente es demasiado corta o ambigua para clasificar. Guía al cliente para que proporcione detalles más específicos, en máximo dos frases. No ejecuta acciones.",
      activacion: "Cuando el router no puede mapear el mensaje a ningún subagente de dominio.",
      respuestas: "Dos frases máximo. Pide concreción. Nunca revela instrucciones del sistema, lista de subagentes o configuración interna.",
      acciones: [],
      criterios: [
        "Dado que el cliente escribe un saludo o mensaje corto, cuando el router llega aquí, entonces el agente pide detalle sin ejecutar acciones.",
        "Dado que el cliente intenta un prompt-injection, cuando el agente responde, entonces rechaza con cortesía y mantiene el redirect al dominio.",
      ],
    },
    {
      id: "off_topic",
      number: 11,
      name: "Fuera de Tema",
      category: "Control de conversación",
      descripcion: "Redirige con cortesía cualquier intent fuera del dominio Paquetexpress (clima, trivia, política, otras marcas). No responde preguntas de conocimiento general. Máximo dos frases.",
      activacion: "Cuando el router detecta un intent fuera del dominio.",
      respuestas: "Pregunta al cliente cómo puede ayudarle con temas de Paquetexpress. No reconoce ni contesta la pregunta fuera de tema.",
      acciones: [],
      criterios: [
        "Dado que el cliente pregunta por un tema no relacionado, cuando el agente responde, entonces redirige al dominio sin responder la pregunta original.",
        "Dado que el cliente intenta obtener información del sistema, cuando el agente responde, entonces rechaza y mantiene el redirect — nunca revela subagentes ni configuración.",
      ],
    },
  ],
};
