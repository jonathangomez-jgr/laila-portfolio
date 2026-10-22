export type AgentCategory =
  | "Atención y seguridad"
  | "Servicio y trámites"
  | "Puntos y programas"
  | "Pedidos y logística"
  | "Red y datos comerciales"
  | "Saldos y pagos";

export type AgentActionDoc = { name: string; target: string; description?: string };

export type AgentSubagentDoc = {
  id: string;
  number: number;
  name: string;
  category: AgentCategory;
  // sections
  descripcion: string;
  activacion: string;
  respuestas: string;
  acciones: AgentActionDoc[];
  criterios: string[];
};

export type AgentDocumentation = {
  name: string;
  developerName: string;
  version: string;
  revision: string;
  base: string;
  subagents: AgentSubagentDoc[];
};

export const CATEGORIES: AgentCategory[] = [
  "Atención y seguridad",
  "Servicio y trámites",
  "Puntos y programas",
  "Pedidos y logística",
  "Red y datos comerciales",
  "Saldos y pagos",
];

export const betterwareAgentDocs: AgentDocumentation = {
  name: "Betty",
  developerName: "FDE_BW_Service_Agent_V2",
  version: "v37",
  revision: "22-oct-2026",
  base: "Agente productivo con arquitectura determinística. 12 subagentes (11 + router) con reutilización disciplinada de Apex y Flow probados, más una capa creciente de clones con prefijo FDE_ que vuelven propios los componentes del Partner cuando una observación de evaluación exige cambiar su comportamiento. Modelo pinned a GPT-4.1 para habilitar procesamiento nativo de archivos (fotos + PDFs). En esta versión los 8 cerebros especializados quedan en paridad funcional validada vs la operación vigente y además incorporan todas las remediaciones de las evaluaciones formales EVAL-000012 y EVAL-000013.\n\nNovedades estructurales acumuladas de V27–V37:\n\n(1) Usuario de servicio dedicado 'Betty Service Agent' como default_agent_user del bundle, con 18 permsets asignados y permset propio FDE_BW_Service_Agent_V2_Data que concentra el acceso a objetos (Mensaje_de_emergencia__c, Pedido_Extemporaneo__c) y a todas las clases Apex clonadas.\n\n(2) Capa de componentes clonados con prefijo FDE_, creada para no depender del roadmap del Partner cuando una observación requiere cambios de texto o lógica puntual. En v37 esta capa incluye: FDE_BW_Auth_Check_y_Login_por_C_digo (flow de login principal, corre en API 68 User Mode, expone v_Mensaje literal por motivo y el flag booleano v_OfrecerLoginAlternativo para disparar la ruta alterna determinísticamente); FDE_BW_InvFullAutenticacion (Apex de validación código+teléfono con los textos ratificados por Betterware el 21-OCT para CODIGO_NO_EXISTE y TELEFONO_NO_COINCIDE, 6/6 tests); FDE_InvConsultarDrivin (Apex de rastreo logístico con validación de linaje server-side y, desde v37, 4 campos output top-level de evidencias de entrega pdfPod/signature/fotoPedido/fotoDomicilio pre-extraídos para evitar que el LLM parsee el detalleJSON crudo, 10/10 tests); FDE_InvServiceNowTickets (Apex de tickets con validación de linaje transversal, 20 campos top-level); FDE_ConsultarPremiosDrivin (Apex de entrega de premios); FDE_BW_InvGenerarURLResetChatbotV3 (Apex de reset con ownership gate). Cada clon FDE_ queda documentado y asignado al permset FDE_BW_Service_Agent_V2_Data.\n\n(3) Reset de contraseña determinístico con tres escenarios (propio · asociado del linaje · limpieza de estado) y máquina de estados entre turnos.\n\n(4) Fix 'ghost binding' en altas de Asociados — habilitado cross-linaje real vía dos variants con available_when (altas_asociados_propia y altas_asociados_linaje).\n\n(5) EVAL-000012 cerrado: textos de autenticación ratificados por Betterware el 21-OCT embebidos literal en Apex clon; oferta de inicio alternativo por referencia bancaria sólo cuando corresponde; dos items server-side (vigencia 7 días del acceso alternativo y contador dedicado de intentos alternos) aparcados en backlog técnico por decisión expresa de Betterware de no bloquear el cutover.\n\n(6) EVAL-000013 cerrado con 7 remediaciones: (a) puntos ajenos — guard duro contra consultar resumen_puntos antes de validar linaje, con ejemplo canónico EAEE/L123456 en el prompt; (b) rastreo premios — checklist obligatoria pre-callout + state machine para folios enviados sueltos tras listar premios; (c) evidencias de recolección en devoluciones — regla literal reforzada; (d) evidencias de tracking Drivin — 4 campos output top-level en el Apex clon y prompt reforzado para cita literal sin truncado del query token; (e) datos de conductor y vehículo PROHIBIDOS en todo flujo de entrega (tracking, devoluciones y premios Drivin) — revierte el fix F06/R-02 anterior tras ratificación formal de Betterware; (f) descuentos y comisiones — TODOS los triggers de descuentos/comisiones redirigen a la acción detalle_descuentos (que entrega el desglose completo con cargos itemizados) con formato de un concepto por línea, degradando descuentos_esta_semana a fallback técnico; (g) anti-divagación en Preguntas Generales — regla dura contra forzar pivote a otro dominio cuando Knowledge no respalda la pregunta; y adicional (h) altas de Distribuidor — datos de acceso se envían SOLO por SMS, prohibido sugerir correo/bandeja de entrada.\n\n(7) Hallazgo técnico documentado sobre entrega de URLs con JWT tokens largos: el truncado detectado en pruebas se originó por un ejemplo WGLL del prompt que incluía la elipsis '?token=...' — el modelo obedecía el template en lugar de citar el valor completo del campo output. Fix: eliminar la elipsis del prompt y escribir reglas imperativas con 'cita literal del valor completo del campo', más una checklist pre-envío. Las tres recomendaciones de endurecimiento futuro (proxy Salesforce, rehost en Files, presigned URL del Partner logístico) quedan documentadas en el deliverable 'Evidencias de entrega · análisis técnico'.\n\nResultado operativo: v37 ACTIVE desde el 22-oct-2026, con todas las observaciones formales EVAL-000012 y EVAL-000013 remediadas, saludo canónico post-login garantizado, escalación silenciosa con wording fijo 'Enseguida continuamos con tu solicitud. 💙🤗' y reglas duras contra inventos de URLs o criterios internos.",
  subagents: [
    {
      id: "agent_router",
      number: 1,
      name: "Agent Router",
      category: "Atención y seguridad",
      descripcion:
        "Punto de entrada de cada conversación. Clasifica la intención del usuario y transfiere al subagente apropiado según el dominio de la solicitud. Nunca ejecuta acciones ni responde preguntas directamente — su única tarea es ruteo determinista. Antes del ruteo evalúa un gate estructural: si hay un flujo guiado en curso (ej. pedido extemporáneo) o un saludo canónico pendiente (post-login), fuerza la transición al subagente dueño sin que el modelo pueda decidir otra cosa.",
      activacion:
        "En cada turno nuevo de conversación, cuando el usuario envía un mensaje y Betty no está dentro de un subagente de dominio. Si llega un saludo o mensaje ambiguo, prefiere Pregunta Ambigua. Solo escala directo con 5 triggers literales: lenguaje agresivo, emergencia física, 'hablar con asesor humano', 'Compra con Confianza' o 'Garantía Betterware'. Si el mensaje menciona catálogo, flyer, premios, combos, ofertas, reglas comerciales, nuevos productos o última oportunidad, rutea OBLIGATORIAMENTE a Contenido Digital — nunca a Preguntas Generales ni a Ambigua.",
      respuestas:
        "No produce mensajes al usuario. Transfiere silenciosamente al subagente destino, que a su vez saluda o pide información según su propio flujo.",
      acciones: [
        { name: "go_to_auth", target: "@utils.transition", description: "A Autenticación y Recuperación de Acceso" },
        { name: "go_to_account", target: "@utils.transition", description: "A Cuenta e Información del Distribuidor" },
        { name: "go_to_orders", target: "@utils.transition", description: "A Pedidos y Entregas" },
        { name: "go_to_payments", target: "@utils.transition", description: "A Pagos y Finanzas" },
        { name: "go_to_rewards", target: "@utils.transition", description: "A Premios y Lealtad BW+" },
        { name: "go_to_content", target: "@utils.transition", description: "A Contenido Digital Comercial" },
        { name: "go_to_faq", target: "@utils.transition", description: "A Preguntas Generales (FAQ)" },
        { name: "go_to_escalation", target: "@utils.transition", description: "A Transferencia con Asesor (solo 5 triggers)" },
        { name: "go_to_off_topic", target: "@utils.transition", description: "A Fuera de Tema" },
        { name: "go_to_ambiguous", target: "@utils.transition", description: "A Pregunta Ambigua (default fallback)" },
        { name: "go_to_adjuntos", target: "@utils.transition", description: "A Analizar Adjuntos (fotos o PDFs enviados por el usuario)" },
      ],
      criterios: [
        "Dado que el usuario escribe un saludo o mensaje corto, cuando el router recibe el mensaje, entonces transfiere a Ambiguous — nunca a Escalation.",
        "Dado que el mensaje contiene palabras literales de los 5 triggers de escalación, cuando el router lo detecta, entonces transfiere a Escalation.",
        "Dado que el usuario pide un dato específico de su cuenta, cuando el router recibe el intent, entonces rutea al subagente de dominio correspondiente, el cual exigirá autenticación si aplica.",
        "Dado que el mensaje menciona cualquiera de las categorías de contenido comercial (catálogo, flyer, premios, combos, ofertas, reglas comerciales, nuevos productos, última oportunidad), cuando el router lo detecta, entonces rutea obligatoriamente a Contenido Digital — bypass de Preguntas Generales y Ambigua.",
        "Dado que hay un flujo guiado en curso o un saludo canónico post-login pendiente, cuando el router recibe el próximo mensaje, entonces el gate estructural fuerza la transición al subagente dueño antes de que el modelo evalúe cualquier otro ruteo.",
        "Dado que el mensaje contiene un código de distribuidor embebido en texto (p. ej. 'Pásame los puntos de EAEE', 'quiero ver la venta de L123456'), cuando el router procesa el intent, entonces extrae el código del texto y lo propaga como V_CodigoLinaje al subagente destino — el subagente downstream exigirá validar_linaje antes de ejecutar la consulta cross-lineage (fix v37).",
      ],
    },
    {
      id: "auth_and_security",
      number: 2,
      name: "Autenticación y Recuperación de Acceso",
      category: "Atención y seguridad",
      descripcion:
        "Verifica la identidad del distribuidor por código o referencia bancaria y gestiona la recuperación de contraseña con tres escenarios diferenciados: reset del propio distribuidor, reset de un asociado del linaje autenticado y limpieza del estado de reset. Opera como una máquina de estados determinística entre turnos: cada paso del flujo (código, formato inválido, ofrecer alternativa, referencia bancaria, éxito, reset propio, captura de código del asociado, confirmación del asociado, limpieza) se gatea con variables de estado — el modelo nunca decide a solas cuál es el siguiente paso. Después de un login exitoso un flag estructural fuerza el saludo canónico personalizado antes de que el router procese el siguiente mensaje, para que el distribuidor reciba siempre '¡Listo, [primer nombre]!' y nunca un saludo genérico. Reglas duras vigentes: (1) orden fijo con primer intento SIEMPRE por código; (2) validación estricta de formato ANTES de cualquier callout; (3) comunicación del formato solo cuando el input ya es inválido, nunca en el saludo; (4) el reset de un asociado del linaje exige captura explícita del código del asociado y confirmación afirmativa separada antes del write final. Guarda contexto de la sesión (código, nombre, teléfono) para que los subagentes downstream consulten sin pedir re-identificación.\n\nEn V37 el login principal corre sobre dos componentes propios clonados con prefijo FDE_, que vuelven controlables los textos y la lógica de borde sin depender del Partner: (a) el flow FDE_BW_Auth_Check_y_Login_por_C_digo (API 68, User Mode, hereda CRUD/FLS del usuario Betty Service Agent, auditoría por sesión), extendido para exponer un flag booleano v_OfrecerLoginAlternativo que dispara la ruta alterna determinísticamente cuando el motivo es TELEFONO_NO_COINCIDE — ya no se infiere parseando v_Mensaje; y (b) el Apex FDE_BW_InvFullAutenticacion, que embebe los textos literales ratificados por Betterware el 21-OCT para los escenarios CODIGO_NO_EXISTE ('El código ingresado no corresponde a ningún Distribuidor registrado.') y TELEFONO_NO_COINCIDE ('Los datos no coinciden con lo registrado. Verifica el código y el teléfono.'). El Apex pasa 6/6 pruebas unitarias y está asignado al permset FDE_BW_Service_Agent_V2_Data.\n\nQueda aparcado en backlog técnico, por decisión expresa de Betterware para no bloquear el cutover de Insiders: la vigencia de 7 días del acceso alternativo por referencia bancaria y un contador dedicado de intentos del flujo alterno (hoy el flujo comparte el contador global de 5 intentos). Ambos requieren modelo de datos adicional y están diseñados en el deliverable backlog_backend_f02.md.",
      activacion:
        "Al inicio cuando el usuario pide un dato autenticado y aún no se ha identificado. También cuando el usuario pide reset de contraseña, propio o de un asociado del linaje. La ruta de referencia bancaria se ofrece SOLO después de que el login por código falla.",
      respuestas:
        "Pide el código con una frase corta sin detalles técnicos. Si el valor que manda el usuario no matchea el patrón (código: letra + 6 dígitos o 4 alfanuméricos; referencia: 10 dígitos consecutivos), responde con el formato detallado y pide reintentar sin invocar la acción. Al éxito, emite un saludo personalizado canónico: '¡Listo, [primer nombre]! ✅ Puedo ayudarte con tus pedidos, pagos, puntos y muchas otras consultas. Cuéntame, ¿qué necesitas hoy?'. Para reset propio entrega la recoveryURL en el chat (paridad etapa 1 con V42 productivo). Para reset de un asociado del linaje recorre el flujo guiado: pregunta el código del asociado, muestra sus datos para que el distribuidor confirme afirmativamente y solo entonces ejecuta el reset. El cambio a canal alterno (email/SMS) está planeado post-cutover · actividad 4.3 del plan.",
      acciones: [
        { name: "auth_check_login_codigo_fde_usermode", target: "flow://FDE_BW_Auth_Check_y_Login_por_C_digo", description: "Login principal (v37): flow clonado FDE_ en API 68 User Mode que invoca internamente el Apex clon FDE_BW_InvFullAutenticacion con los textos ratificados por Betterware el 21-OCT. Expone v_OfrecerLoginAlternativo (boolean) para disparar determinísticamente la ruta alterna de referencia bancaria sin parsear v_Mensaje. Hereda CRUD/FLS del usuario Betty Service Agent." },
        { name: "auth_login_referencia", target: "flow://BW_Auth_Login_Referencia", description: "Autenticación alternativa por referencia bancaria. Solo tras fallar código, y solo cuando v_OfrecerLoginAlternativo=true del login principal." },
        { name: "reset_distribuidor", target: "apex://BW_InvGenerarURLResetChatbotV2", description: "Reset de contraseña del propio distribuidor con ownership gate interno. Entrega recoveryURL en el chat (etapa 1 del piloto)." },
        { name: "capturar_codigo_asociado_reset", target: "@utils.setVariables", description: "Fija varCodigoAsociadoReset con el código del asociado capturado — paso 1 del flujo guiado de reset de asociado." },
        { name: "reset_asociado", target: "apex://BW_InvGenerarURLResetChatbotV2", description: "Reset de contraseña de un asociado del linaje autenticado — paso 2, muestra datos para confirmación afirmativa explícita antes del write final." },
        { name: "confirmar_reset_asociado", target: "@utils.setVariables", description: "Fija varConfirmacionResetAsociado tras el 'sí' explícito del distribuidor — gate final que habilita la entrega de la recoveryURL del asociado." },
        { name: "limpiar_reset_asociado", target: "@utils.setVariables", description: "Resetea las variables del flujo guiado de reset de asociado para no bloquear futuras solicitudes." },
      ],
      criterios: [
        "Dado que el usuario está sin autenticar, cuando pide un dato de su cuenta, entonces Betty transfiere al subagente de autenticación y pide código antes de ejecutar la consulta.",
        "Dado que el valor que manda el usuario no matchea el patrón esperado (código o referencia), cuando Betty lo detecta, entonces responde con el formato detallado y pide reintentar sin invocar la acción.",
        "Dado que el login por código falla una vez, cuando el usuario reintenta, entonces Betty ofrece la referencia bancaria como ruta alternativa — nunca antes.",
        "Dado que la autenticación es exitosa, cuando Betty responde al usuario, entonces usa el saludo canónico con su primer nombre y el call-to-action corto ('pedidos, pagos, puntos y muchas otras consultas') — nunca el saludo genérico de bienvenida.",
        "Dado que el usuario pide reset de contraseña propio, cuando el ownership gate aprueba, entonces Betty cita el campo recoveryURL del output en el chat (paridad etapa 1 con V42 productivo).",
        "Dado que el usuario pide reset de contraseña de un asociado del linaje, cuando Betty prepara el flujo, entonces primero captura el código del asociado, muestra los datos del asociado y solo tras un 'sí' explícito ejecuta el write final — nunca registra en el mismo turno de la aclaración.",
        "Dado que el flujo guiado de reset de asociado termina (éxito, cancelación o datos insuficientes), cuando Betty cierra, entonces ejecuta limpiar_reset_asociado para que el distribuidor pueda iniciar una nueva solicitud sin arrastre de estado.",
        "Dado que el usuario acumula 5 intentos globales fallidos (contador combinado de código + referencia), cuando ocurre el quinto fallo, entonces Betty termina la interacción sin escalar y sin texto adicional. · NOTA v13: hasta implementar la Apex de cierre técnico, aún transita a Escalation al 5° — ver item en backlog.",
      ],
    },
    {
      id: "escalation",
      number: 3,
      name: "Transferencia con Asesor",
      category: "Atención y seguridad",
      descripcion:
        "Transferencia silenciosa al queue de asesor humano. Al activarse, dispara automáticamente el escalation_message canónico 'Enseguida continuamos con tu solicitud. 💙🤗' vía connection.messaging.escalation_message y hace handoff al flow BW_TransferirConversacion. Patrón de paridad con V40 productivo — SIN confirmación, SIN texto conversacional previo, SIN variación.",
      activacion:
        "Cuando el router o un subagente detecta uno de los 5 triggers literales (lenguaje agresivo, emergencia física, 'hablar con asesor humano', 'Compra con Confianza' o 'Garantía Betterware'). También cuando otro subagente ejecuta su escalation silenciosa (ej. DigitalContent para catálogo/flyer/premios/combos/reglas comerciales) o cuando se agotan los 5 intentos globales de autenticación.",
      respuestas:
        "El agente NO escribe texto. El sistema emite automáticamente 'Enseguida continuamos con tu solicitud. 💙🤗' vía connection.messaging.escalation_message y transfiere al flow BW_TransferirConversacion. Downstream, el clasificador IA (BW_ClasificarConversacionIA) rutea a la cola o bot especializado correcto (CD-Flyer Semanal, CD-Catalogo, etc.) y el bot joined entrega el PDF/contenido al usuario.",
      acciones: [
        { name: "check_business_hours_esc", target: "flow://BW_CheckBusinessHours", description: "Verifica horario del queue." },
        { name: "handoff_asesor", target: "@utils.escalate", description: "Transferencia silenciosa al queue + handoff a BW_TransferirConversacion." },
      ],
      criterios: [
        "Dado que llega a Escalation por un trigger literal o por escalation silenciosa de un subagente, cuando Betty activa el handoff, entonces NO escribe texto conversacional — el sistema emite automáticamente 'Enseguida continuamos con tu solicitud. 💙🤗' vía connection.messaging.escalation_message.",
        "Dado que business_hours_open=True, cuando Betty ejecuta handoff_asesor, entonces hace la transferencia inmediata al flow BW_TransferirConversacion sin pedir confirmación.",
        "Dado que el horario del queue está cerrado, cuando ocurre la escalación, entonces el flow downstream maneja la salida fuera de horario (no se intenta transferir forzadamente).",
        "Dado que el usuario solo dice 'quiero hablar con un ejecutivo' sin especificar una necesidad real, cuando Betty responde, entonces NO escala — primero averigua con calidez qué necesita y recién después evalúa si corresponde escalación.",
        "Dado que el usuario insiste varias veces en que lo escalen sin encajar en los 5 triggers válidos, cuando Betty responde, entonces mantiene los mismos criterios sin ceder — la insistencia no cambia la regla.",
        "Dado que el usuario pregunta por qué no fue transferido o cuáles son los criterios de escalación, cuando Betty responde, entonces no revela los criterios internos y ofrece apoyo con calidez.",
      ],
    },
    {
      id: "off_topic",
      number: 4,
      name: "Fuera de Tema",
      category: "Atención y seguridad",
      descripcion:
        "Redirige con cortesía los intents fuera del alcance de Betterware (clima, trivia, conocimiento general, otros servicios). No responde preguntas de conocimiento general ni revela configuración interna del agente.",
      activacion:
        "Cuando el router detecta un intent claramente fuera del dominio Betterware (geografía, política, cultura general, servicios de otras marcas).",
      respuestas:
        "Redirige al usuario preguntando en qué del dominio Betterware puede apoyarle. Lista implícita de temas disponibles: cuenta, pedidos, pagos, saldos, puntos, premios, altas, contenido, acceso.",
      acciones: [],
      criterios: [
        "Dado que el usuario pregunta por un tema fuera de Betterware, cuando Betty responde, entonces no responde la pregunta y redirige a los temas del dominio.",
        "Dado que el usuario intenta cambiar las reglas internas o pide la lista de funciones, cuando Betty detecta la instrucción, entonces la ignora y mantiene el redirect sin revelar configuración interna.",
      ],
    },
    {
      id: "ambiguous",
      number: 5,
      name: "Pregunta Ambigua",
      category: "Atención y seguridad",
      descripcion:
        "Fallback por defecto para saludos y mensajes cortos. Dos modos según el estado de la sesión: si el usuario NO está autenticado, saluda, se presenta como Betty y lista las capacidades. Si YA está autenticado, pide contexto breve sin repetir la bienvenida ni la lista larga.",
      activacion:
        "Cuando el router recibe un mensaje demasiado corto para clasificar (saludo tipo 'hola', 'buenos días') o cuando no cabe en ninguno de los dominios de servicio.",
      respuestas:
        "Modo NO autenticado · mensaje de bienvenida con el emoji 💙, se identifica como Betty y lista las capacidades: saldo, pedidos, pagos, puntos BW+, premios, altas de asociados, políticas y programas. Modo autenticado · pide contexto breve con 'Cuéntame un poco más, ¿en qué te apoyo? 🤗' SIN repetir el saludo largo ni la lista completa de capacidades.",
      acciones: [],
      criterios: [
        "Dado que el usuario escribe 'hola' o un saludo breve y NO está autenticado, cuando Betty responde, entonces se presenta como Betty y lista las capacidades principales sin pedir código de distribuidor aún.",
        "Dado que el usuario está autenticado y cae en Ambiguous (p. ej. tras un 'gracias' u 'ok'), cuando Betty responde, entonces usa la variante corta — NUNCA el saludo genérico de bienvenida.",
        "Dado que Ambiguous entregó la invitación, cuando el usuario responde con una capacidad concreta, entonces el router rutea al subagente de dominio apropiado.",
      ],
    },
    {
      id: "general_faq",
      number: 6,
      name: "Preguntas Generales (FAQ)",
      category: "Servicio y trámites",
      descripcion:
        "Responde preguntas sobre políticas, programas y procesos usando artículos oficiales de Knowledge. No requiere autenticación. Si la pregunta exige datos de cuenta, deriva al subagente correspondiente que exige auth.",
      activacion:
        "Cuando el router detecta una pregunta general que no requiere datos específicos del distribuidor (p. ej. '¿cómo funciona el programa de puntos?', '¿cuál es la política de devoluciones?').",
      respuestas:
        "Entrega la respuesta directa desde el output de Knowledge (campo Respuesta). Aplica un filtro post-Knowledge: aunque un artículo mencione a 'líder' o 'mamá de linaje' en un contexto distinto, Betty NO sugiere al distribuidor contactarlos y nunca inventa URLs ni placeholders. Si Knowledge no tiene información suficiente, lo reconoce explícitamente. Nunca inventa políticas ni acepta excepciones por insistencia del usuario.",
      acciones: [
        { name: "knowledge_faq", target: "flow://BW_AnswerQuestionsWithKnwoledge", description: "Búsqueda y respuesta en artículos oficiales de Knowledge." },
      ],
      criterios: [
        "Dado que el usuario pregunta sobre una política general, cuando Betty responde, entonces usa el output de Knowledge y cita solo lo que esté en los artículos oficiales.",
        "Dado que la respuesta de Knowledge no cubre la pregunta, cuando Betty responde, entonces lo reconoce y ofrece transferir a un asesor si el usuario lo pide.",
        "Dado que la pregunta requiere un dato de cuenta específico, cuando Betty lo detecta, entonces indica al usuario que debe autenticarse y rutea al subagente correspondiente.",
        "Dado que un artículo de Knowledge menciona a 'líder' o 'mamá de linaje', cuando Betty prepara la respuesta, entonces aplica el filtro post-Knowledge: no sugiere al distribuidor contactarlos y reformula la respuesta sin esas referencias.",
        "Dado que la pregunta roza alguna categoría de Contenido Digital (catálogo, flyer, premios, combos, reglas comerciales, nuevos productos, última oportunidad), cuando Betty lo detecta, entonces transiciona al subagente de Contenido Digital en lugar de responder con prosa de Knowledge.",
        "Dado que Knowledge no respalda la pregunta del distribuidor, cuando Betty responde, entonces reconoce explícitamente la falta de información y ofrece escalación — PROHIBIDO forzar un pivote a otro dominio o inventar una respuesta (fix E13-06 EVAL-000013).",
      ],
    },
    {
      id: "digital_content",
      number: 7,
      name: "Contenido Digital Comercial",
      category: "Servicio y trámites",
      descripcion:
        "Entrega material comercial del período activo con 8 categorías vigentes en producción. Para 7 de 8 categorías (catálogo, flyer semanal, premios, nuevos productos, última oportunidad, combos, reglas comerciales, programa de referidos) ejecuta escalation silenciosa — el clasificador IA (BW_ClasificarConversacionIA) y el flow BW_TransferirConversacion delegan al bot especializado downstream (CD-Flyer Semanal, CD-Catalogo, etc.) que entrega el PDF/archivo al usuario. La categoría VIDEOS es la ÚNICA excepción: entrega el link textual directamente en el chat (acortar.link/bmknDT) sin escalar. En esta versión se ampliaron los triggers para capturar variantes reales del canal productivo ('tienes el catálogo', 'me compartes el catálogo', 'catalogo' sin acento, 'reglas comerciales', 'nuevos productos', etc.).",
      activacion:
        "Cuando el usuario pide un material comercial concreto (catálogo, flyer, promociones, premios, combos, reglas comerciales, nuevos productos, programa de referidos, videos) o pregunta por los contenidos del período.",
      respuestas:
        "Detecta la categoría por triggers específicos y ejecuta la acción canónica. Para flyer/catálogo/premios/combos/reglas/nuevos productos/última oportunidad/referidos invoca escalate_contenido (escalation silenciosa — el usuario ve el escalation_message canónico y recibe el archivo del bot downstream). Para VIDEOS entrega directamente el link literal acortar.link/bmknDT con backticks. NUNCA inventa URLs, placeholders ni redirecciones a terceros.",
      acciones: [
        { name: "escalate_contenido", target: "@utils.escalate", description: "Escalation silenciosa que delega al bot downstream (CD-Flyer Semanal, CD-Catalogo, etc.) vía BW_ClasificarConversacionIA + BW_TransferirConversacion." },
      ],
      criterios: [
        "Dado que el usuario pide flyer, catálogo, premios, combos, nuevos productos, última oportunidad o reglas comerciales, cuando Betty detecta la categoría, entonces ejecuta escalation silenciosa — el escalation_message canónico sale automático y el bot downstream entrega el archivo real.",
        "Dado que el usuario pide un video, cuando Betty responde, entonces entrega el link textual con backticks sin escalar — es la única excepción del subagente.",
        "Dado que la clasificación de la categoría es ambigua, cuando Betty responde, entonces no inventa URLs, placeholders ni redirecciones — pide al usuario precisar antes de ejecutar la acción.",
      ],
    },
    {
      id: "rewards_and_loyalty",
      number: 8,
      name: "Premios y Lealtad BW+",
      category: "Puntos y programas",
      descripcion:
        "Puntos BW+ (resumen, velocímetro, duplicador), programas de lealtad (Arranca y Gana, Haz Linaje y Gana Más, Recluta Asociados), premios BW+ y Drivin, y traspasos de Asociadas. Consulta propia o de linaje autorizado tras validación.",
      activacion:
        "Cuando el usuario pregunta por puntos, premios, velocímetro, un programa de lealtad específico o estatus de traspasos. Requiere autenticación. Si la consulta es sobre una hija/nieta del linaje, exige Validar_Linaje antes.",
      respuestas:
        "Cita los campos exactos del output: puntosTotalesDisponibles, puntosCanjeados, puntosGanados para el resumen; cantidadReclutas y recibioBono para Arranca y Gana; estatusEntrega y fechaPlaneada para premios Drivin. Si una fecha viene 'planeada', nunca la presenta como entrega garantizada.",
      acciones: [
        { name: "resumen_puntos", target: "apex://BW_OrcPuntos", description: "Resumen de puntos BW+." },
        { name: "velocimetro", target: "apex://BW_ConsultarVelocimetroAction", description: "Velocímetro BW+." },
        { name: "duplica_velocimetro", target: "apex://BW_ConsultarDuplicaVelocimetroAction", description: "Duplicador del velocímetro." },
        { name: "arranca_y_gana", target: "apex://BW_ArrancaYGana", description: "Programa Arranca y Gana." },
        { name: "haz_linaje_y_gana", target: "apex://BW_HazLinajeYGana", description: "Programa Haz Linaje y Gana Más." },
        { name: "recluta_asociados", target: "apex://BW_ConsultarPuntosReclutamiento", description: "Programa Recluta Asociados." },
        { name: "premios_bwplus", target: "apex://BW_InvConsultarPremiosBwPlus", description: "Premios BW+ del distribuidor." },
        { name: "premios_drivin", target: "apex://FDE_ConsultarPremiosDrivin", description: "Entrega de premios vía Drivin (clon FDE_). Expone campos top-level de evidencia (pdfComprobanteEntrega, firma, fotoDomicilio, fotoPedido, evidenciasAdicionales). v37: PROHIBIDO compartir conductor/vehículo (E13-04b) + state machine folio-solo que preserva prizeCode/year/week cuando el distribuidor envía solo el folio tras listar sus premios (fix E13-02)." },
        { name: "traspasos", target: "apex://BW_InvConsultarTraspasosBwPlus", description: "Traspasos de Asociadas." },
      ],
      criterios: [
        "Dado que el usuario pide sus puntos, cuando Betty consulta BW_OrcPuntos, entonces cita puntosTotalesDisponibles del output sin recalcular.",
        "Dado que el usuario pregunta por puntos de una hija del linaje, cuando Betty lo detecta, entonces ejecuta Validar_Linaje antes de consultar — si varValido=False, rechaza con cortesía.",
        "Dado que la fecha de entrega del premio Drivin viene como 'planeada', cuando Betty responde, entonces la presenta como fecha estimada y nunca como entrega garantizada.",
        "Dado que el usuario pregunta por códigos canjeables de terceros (Cinépolis, etc.), cuando Betty detecta la pregunta, entonces no inventa códigos — solo cita lo que viene en el output.",
        "Dado que el distribuidor acaba de listar sus premios y envía un folio solo (ej. 'PRM007361919') en el siguiente turno, cuando Betty invoca premios_drivin, entonces propaga prizeCode + year + week del contexto preservado por la state machine folio-solo — nunca pierde el contexto ni le pide al distribuidor repetir los datos (fix E13-02 EVAL-000013).",
        "Dado que el distribuidor pregunta por los puntos de otra distribuidora mencionando un código embebido en el texto (ej. 'Pasame los puntos de EAEE'), cuando Betty responde, entonces primero invoca validar_linaje con el código extraído y solo si varValido=True ejecuta resumen_puntos — PROHIBIDO invocar resumen_puntos antes de validar linaje (fix E13-01 EVAL-000013).",
      ],
    },
    {
      id: "orders_and_delivery",
      number: 9,
      name: "Pedidos y Entregas",
      category: "Pedidos y logística",
      descripcion:
        "Operación completa de pedidos: estatus por folio, facturación, último pedido, tracking Drivin, guías de paquetería (M024), coberturas por CP, bodega asignada y directorio (M036), venta retenida (M028), devoluciones (bonificación, reenvío, recolección por RMA) y flujo guiado multi-turno para registro de pedido extemporáneo. El flujo guiado de pedido extemporáneo opera como máquina de estados determinística: captura tipo de solicitud, motivo, importe, horario y confirmación en pasos separados y gatea el registro final solo si todos los datos están completos y el horario fue validado. Los valores de picklist (tipo y motivo) se asignan por acciones literales con valor hardcodeado — Betty elige cuál invocar según la respuesta del distribuidor, el valor exacto nunca lo redacta el modelo.\n\nEn v37 el rastreo logístico corre sobre el Apex clon FDE_InvConsultarDrivin, que agrega dos capas sobre el servicio del Partner: (1) validación de linaje server-side (fix F08 de EVAL-000012) — solo autoriza folios propios, de hija o de nieta del linaje, y sanitiza el response si el folio corresponde a un distribuidor ajeno; y (2) extracción server-side de las URLs de evidencia como 4 campos output top-level pdfPod, signature, fotoPedido y fotoDomicilio (fix E13-04a de EVAL-000013) — el Apex localiza el escenario con entrega real dentro del detalleJSON y expone cada URL ya validada como https:// o null si no es enlace público; el LLM ya no tiene que parsear mentalmente un JSON de 8 KB. Betty entrega las URLs completas y literales desde la primera respuesta.\n\nAdicionalmente, en v37 queda PROHIBIDO compartir datos de conductor y vehículo con el Distribuidor en cualquier flujo de entrega (tracking Drivin, recolección de devolución y entrega de premio Drivin) — observación E13-04b del EVAL-000013, ratificada por Betterware el 22-OCT. La regla aplica aunque el Distribuidor pregunte explícitamente por el chofer o el vehículo, y revierte el permiso anterior que estuvo vigente del 20 al 22 de octubre.",
      activacion:
        "Cuando el usuario pregunta por un pedido, su facturación, su estado de entrega, cobertura, bodegas, venta retenida, devoluciones o quiere registrar un pedido extemporáneo. Requiere autenticación.",
      respuestas:
        "Cita campos específicos según la consulta: estatusEntrega y fechaPlaneada para Drivin; codigoRastreo + paqueteria + fechaEnvio + urlRastreo para guía; nombreBodega + direccion + horario + urlMapa para bodega. Para evidencia de Drivin no imprime URLs firmadas — solo dice 'adjunto la evidencia'. Para pedido extemporáneo recorre el flujo guiado paso a paso: pregunta tipo (Propia / Linaje), motivo (opciones literales), importe, valida horario, resume y pide confirmación afirmativa explícita; solo entonces ejecuta el registro final. Si falta algún dato o la validación de horario no permite registrar, cierra con cortesía y limpia el estado para no bloquear futuros flujos.",
      acciones: [
        { name: "tracking_drivin", target: "apex://FDE_InvConsultarDrivin", description: "Seguimiento de entrega Drivin con validación de linaje server-side (fix F08) y 4 campos top-level de evidencia pre-extraídos (fix E13-04a): pdfPod, signature, fotoPedido, fotoDomicilio. 10/10 tests." },
        { name: "guia_paqueteria", target: "apex://BW_ConsultarGuiaPaqueteria", description: "Número de guía por factura." },
        { name: "estatus_pedido_facturacion", target: "apex://BW_ConsultaStatusPedidoFactAction", description: "Estatus del pedido por folio." },
        { name: "ultimo_pedido_facturado", target: "apex://BW_ConsultarFacturacionPedidoAction", description: "Último pedido facturado." },
        { name: "consultar_cobertura", target: "apex://BW_ConsultarCoberturaAction", description: "Cobertura por código postal." },
        { name: "bodega_asignada", target: "apex://BW_ConsultarBodegaAsignadaAction", description: "Bodega del domicilio del distribuidor." },
        { name: "consultar_bodega", target: "apex://BW_ConsultarBodegaAction", description: "Directorio de bodegas." },
        { name: "venta_retenida", target: "flow://BW_ConsultarVentaRetenida", description: "Venta/pedido retenido." },
        { name: "validar_horario_extemporaneo", target: "flow://Validar_Horario_Pedido_Extemporaneo", description: "Verifica ventana del extemporáneo." },
        { name: "SetTipoSolicitudPropia", target: "@utils.setVariables", description: "Fija tipo de solicitud = 'Propia' (valor literal del picklist)." },
        { name: "SetTipoSolicitudLinaje", target: "@utils.setVariables", description: "Fija tipo de solicitud = 'Linaje' (valor literal del picklist)." },
        { name: "SetMotivoPedidoFueraTiempo", target: "@utils.setVariables", description: "Fija motivo = 'Pedido enviado fuera de tiempo' (valor literal del picklist)." },
        { name: "SetMotivoPedidoAnexo", target: "@utils.setVariables", description: "Fija motivo = 'Pedido adicional (Anexo)' (valor literal del picklist)." },
        { name: "SetMotivoPagoVencido", target: "@utils.setVariables", description: "Fija motivo = 'Pago de saldo vencido fuera de tiempo' (valor literal del picklist)." },
        { name: "SetMotivoOtros", target: "@utils.setVariables", description: "Fija motivo = 'Otros' (valor literal del picklist)." },
        { name: "registrar_pedido_extemporaneo", target: "flow://Registrar_Pedid", description: "Registra el pedido extemporáneo (write final, gated por estado completo + confirmación afirmativa)." },
        { name: "limpiar_pedido_extemporaneo", target: "@utils.setVariables", description: "Resetea las variables del flujo guiado para no bloquear futuras solicitudes." },
        { name: "devoluciones_bwplus", target: "apex://BW_InvConsultarDevolucionesBwPlus", description: "Lista de devoluciones." },
        { name: "recoger_devolucion", target: "apex://BW_ConsulaRecogerDevoluciones", description: "Recolección de devolución por folio RMA." },
        { name: "revision_bonificacion", target: "apex://BWPlusBonificacionAction", description: "Revisión de bonificación de devolución." },
        { name: "revision_reenvio", target: "apex://BWPlusReenvioAction", description: "Revisión de reenvío de devolución." },
        { name: "go_to_escalation", target: "@utils.transition", description: "Transfiere a Escalation ante lenguaje agresivo, emergencia física o solicitud explícita de asesor humano aparecida dentro del flujo de pedidos." },
      ],
      criterios: [
        "Dado que el usuario pregunta '¿dónde está mi pedido?', cuando Betty consulta Drivin, entonces cita estatusEntrega y fechaPlaneada del output y entrega las URLs de evidencia (pdfPod, signature, fotoPedido, fotoDomicilio) literal y completas desde la primera respuesta cuando vengan pobladas — nunca las trunca ni las sustituye por 'URL_Redacted'.",
        "Dado que el output de tracking Drivin, recolección de devolución o entrega de premio Drivin trae conductor o vehículo poblados, cuando Betty responde al distribuidor, entonces NO los comparte bajo ninguna circunstancia — aunque el distribuidor pregunte explícitamente — y responde 'Esa información no está disponible para compartir'.",
        "Dado que el usuario pide número de guía de una factura, cuando Betty consulta BW_ConsultarGuiaPaqueteria, entonces cita paqueteria, codigoRastreo y urlRastreo — y no lo confunde con tracking.",
        "Dado que el usuario pide un pedido extemporáneo, cuando Betty prepara el write, entonces primero valida horario y solo registra tras un 'sí' explícito del usuario — nunca registra en el mismo turno de la aclaración.",
        "Dado que Betty necesita capturar tipo o motivo del pedido extemporáneo, cuando el distribuidor responde, entonces Betty invoca la acción literal correspondiente (SetTipoSolicitudPropia/Linaje, SetMotivoPedidoFueraTiempo/Anexo/PagoVencido/Otros) — el valor del picklist nunca lo redacta el modelo, lo asigna la acción.",
        "Dado que el flujo guiado termina (registro exitoso, cancelación o datos insuficientes), cuando Betty cierra, entonces ejecuta la limpieza de las variables del flujo para que el distribuidor pueda iniciar una nueva solicitud sin arrastre de estado.",
        "Dado que el usuario pregunta por venta retenida, cuando Betty consulta BW_ConsultarVentaRetenida, entonces si vo_VentaRetenidaEncontrada=True cita vo_RegistrosPermitidos sin exponer motivo sensible.",
      ],
    },
    {
      id: "account_and_info",
      number: 10,
      name: "Cuenta e Información del Distribuidor",
      category: "Red y datos comerciales",
      descripcion:
        "Datos del distribuidor autenticado y de su red: perfil, clasificación comercial, venta por catálogo (M027), venta acumulada (M025), límite de crédito liberado, facturación y garantía de entrega, fecha de activación, reclutas y referidos, altas de nuevas distribuidoras en trámite (M010 V2), consulta de Asociados vía Data Cloud, consultas de linaje y tickets de ServiceNow.",
      activacion:
        "Cuando el usuario pide un dato de su perfil, su venta, su clasificación, su crédito, el estado de alta de una nueva distribuidora o información de un Asociado o hija del linaje. Requiere autenticación. Para consultas de linaje exige Validar_Linaje antes de la consulta real.",
      respuestas:
        "Cita campos específicos del output según la consulta: vo_Venta y vo_VentaNeta para venta por catálogo; vo_ClasificacionDistribuidor para clasificación; vo_CorreoElectronicoDistribuidor, vo_DireccionDistribuidor y vo_NumeroTelefonicoTelefonico para perfil. Nunca cita comentarios internos de tickets de ServiceNow.",
      acciones: [
        { name: "informacion_distribuidor", target: "flow://BW_InformacionDistribuidor", description: "Perfil general." },
        { name: "venta_por_catalogo", target: "flow://BW_ConsultarVentaCatalogo", description: "Venta por catálogo (M027)." },
        { name: "clasificacion_venta_acumulada", target: "flow://BW_ConsultarClasificacionYVentaAcumulada", description: "Clasificación y venta acumulada (M025)." },
        { name: "limite_credito_liberado", target: "flow://BW_ConsultarLimiteCreditoLiberado", description: "Límite de crédito liberado." },
        { name: "facturacion_garantia_entrega", target: "flow://BW_ConsultaFacturacionYGarantiaEntrega", description: "Facturación y garantía." },
        { name: "fecha_activacion", target: "flow://BW_ConsultaFechaActivacion", description: "Fecha de activación comercial." },
        { name: "reclutas_referidos", target: "flow://BW_ConsultaReclutasReferidos_Flow", description: "Avance de reclutamiento." },
        { name: "informacion_comercial_general", target: "flow://BW_ConsultarInformacionComercialGeneralDeUnDistribuidor", description: "Información comercial general." },
        { name: "estado_alta_distribuidora", target: "apex://BW_M010_ConsultarEstadoAltaV2Action", description: "Estado de alta de nueva distribuidora (M010 V2)." },
        { name: "consultar_asociados_data_cloud", target: "apex://BWPlusAffiliateLookupAction", description: "Lookup de Asociado desde Data Cloud." },
        { name: "altas_asociados_propia", target: "apex://BW_M010_ConsultarAltasAsociados", description: "Altas recientes de Asociados bajo el distribuidor autenticado. Disponible solo cuando no hay linaje validado activo (available when varCodigoLinajeAuth == '')." },
        { name: "altas_asociados_linaje", target: "apex://BW_M010_ConsultarAltasAsociados", description: "Altas recientes de Asociados bajo una hija del linaje validada. Requiere Validar_Linaje previo (available when varCodigoLinajeAuth != ''). Fix v28: la clase M010 ignoraba V_CodigoLinaje — ahora se pasa el código validado directo como distributorCode." },
        { name: "validar_linaje", target: "flow://Consulta_mama_de_linaje_Pedidos_fuera_de_tiempo", description: "Confirma pertenencia de linaje antes de consultas cross-lineage." },
        { name: "consultar_hijas_linaje", target: "apex://BW_ConsultarLinajeAction", description: "Lista hijas del linaje." },
        { name: "service_now_tickets", target: "apex://FDE_InvServiceNowTickets", description: "Tickets abiertos de ServiceNow. Clon FDE_ con validación de linaje server-side y 20 campos top-level (ticketNumber, state, priority, openedAt, closedAt, assignedTo, comments, closeNotes, etc.)." },
        { name: "go_to_escalation", target: "@utils.transition", description: "Transfiere a Escalation ante lenguaje agresivo, emergencia física o solicitud explícita de asesor humano aparecida dentro del flujo de cuenta/altas." },
      ],
      criterios: [
        "Dado que el usuario pide su venta del catálogo, cuando Betty consulta BW_ConsultarVentaCatalogo, entonces cita vo_Venta y vo_VentaNeta del output y nunca inventa cifras.",
        "Dado que el usuario pregunta por una hija del linaje, cuando Betty lo detecta, entonces ejecuta Validar_Linaje primero — si varValido=False responde que solo puede consultar su propia red.",
        "Dado que un ticket de ServiceNow trae un comentario marcado como interno, cuando Betty responde, entonces nunca cita ese comentario — solo los campos permitidos.",
        "Dado que una acción devuelve Resultadodeconsulta diferente de 'OK', cuando Betty responde al usuario, entonces cita el motivo específico (MensajeResultado) en lugar de un genérico 'no encontré registros'.",
        "Dado que el distribuidor pregunta cuándo recibirá los datos de acceso de una alta nueva de Distribuidora, cuando Betty responde, entonces indica que los datos de acceso se envían SOLO por SMS al teléfono registrado — PROHIBIDO sugerir correo, bandeja de entrada o carpeta de spam (fix E13-07 EVAL-000013).",
      ],
    },
    {
      id: "payments_and_finance",
      number: 11,
      name: "Pagos y Finanzas",
      category: "Saldos y pagos",
      descripcion:
        "Consulta de pagos realizados, saldos (vigente y restante), descuentos y comisiones semanales, convenios de cobranza y Credilazos (saldo y préstamo activo). Diferenciación disjunta entre pagos, saldos, descuentos, convenios y Credilazos.\n\nEn v37, todos los triggers naturales de descuentos y comisiones ('mis descuentos', 'mis comisiones', 'pago semanal', 'no me llegó mi pago', 'cuánto me pagaron', 'mi depósito', 'detalle de mis descuentos', 'más detalle', 'desglose completo') redirigen por default a la acción detalle_descuentos, que entrega el desglose completo con cargos itemizados — fix E13-05 de EVAL-000013. La respuesta se presenta con un concepto por línea para legibilidad en WhatsApp. La acción descuentos_por_semana se reserva solo para cuando el distribuidor especifica semana número o año distinto al actual; y descuentos_esta_semana queda como fallback técnico si la acción principal falla.",
      activacion:
        "Cuando el usuario pregunta por pagos realizados, saldo pendiente, descuentos de la semana, convenio de cobranza vigente o datos de Credilazos. Requiere autenticación. Si pregunta por una hija del linaje, exige Validar_Linaje. Si quiere registrar/reportar un pago nuevo, deriva a Escalation.",
      respuestas:
        "Cita campos específicos del output según el intent: vo_SaldoRestante y vo_TotalSaldoVencido para saldo; importe y cuentaBancaria para descuentos; outMonto y outPlazo para Credilazos. Nunca mezcla saldo del distribuidor con saldo Credilazos. Convenios son read-only — no ofrece transferencia automática tras la lectura.",
      acciones: [
        { name: "consultar_pagos", target: "apex://BW_ConsultaPagosAction", description: "Historial de pagos realizados." },
        { name: "saldo_restante", target: "flow://BW_ConsultarSaldoRestante", description: "Saldo del distribuidor." },
        { name: "detalle_descuentos", target: "apex://BW_ConsultaDescuentosAction", description: "Desglose completo de descuentos y comisiones con cargos itemizados. v37: acción PRINCIPAL por default ante cualquier consulta de descuentos o comisiones del distribuidor; se entrega con un concepto por línea." },
        { name: "descuentos_por_semana", target: "flow://BW_ConsultarDescuentosPorSemana", description: "Descuentos de una semana o año específicos distintos al actual. Solo cuando el distribuidor explicita el número de semana o el año." },
        { name: "descuentos_esta_semana", target: "apex://BW_ConsultarDescuentosEstaSemana", description: "Acción legada (resumen de la semana en curso). v37: fallback técnico solo si detalle_descuentos falla." },
        { name: "consultar_convenio_cobranza", target: "flow://Consultar_convenio_de_cobranza", description: "Convenio de cobranza (read-only)." },
        { name: "consultar_prestamo_credilazos", target: "flow://Consultar_prestamo_Credilazos", description: "Préstamo Credilazos activo." },
        { name: "consultar_saldo_credilazos", target: "flow://Consultar_saldo_Credilazos", description: "Saldo del préstamo Credilazos." },
      ],
      criterios: [
        "Dado que el usuario pide su saldo, cuando Betty consulta BW_ConsultarSaldoRestante, entonces cita vo_SaldoRestante y vo_TotalSaldoVencido — nunca mezcla con saldo Credilazos.",
        "Dado que el distribuidor pide descuentos o comisiones con cualquier wording ('mis descuentos', 'cuánto me pagaron', 'mi depósito'), cuando Betty responde, entonces invoca detalle_descuentos y entrega el desglose completo con cargos itemizados desde la primera respuesta, con un concepto por línea.",
        "Dado que el usuario pregunta por su convenio o Credilazos, cuando se muestra el resultado, entonces Betty informa solo los datos devueltos, pregunta si desea un asesor y, si dice que sí, transfiere sin pedir una segunda confirmación.",
        "Dado que el usuario quiere registrar un pago fuera de tiempo, cuando Betty lo detecta, entonces pide confirmación y solo transfiere si responde afirmativamente — nunca registra el pago aquí.",
        "Dado que el usuario pregunta por qué no se le transfiere, cuando Betty responde, entonces no revela criterios internos y solo ofrece apoyo con calidez.",
      ],
    },
    {
      id: "analizar_adjuntos",
      number: 12,
      name: "Analizar Adjuntos",
      category: "Servicio y trámites",
      descripcion:
        "Procesa archivos adjuntos enviados por el usuario (fotos y PDFs) usando el modelo nativo GPT-4.1 con config file_upload: managed. Describe el contenido de las imágenes y extrae texto de los PDFs. No procesa audios ni stickers — para esos pide al usuario escribir su solicitud.",
      activacion:
        "Cuando el router detecta que el usuario adjuntó un archivo (foto o PDF) junto con su mensaje. El modelo del agente está pinned a GPT-4.1 (model://sfdc_ai__DefaultGPT41) para soportar nativamente el procesamiento multimodal.",
      respuestas:
        "Describe el contenido del archivo (qué muestra la foto, qué dice el PDF) y conecta con el intent del usuario. Si el adjunto es un audio o sticker, no lo procesa — pide amablemente escribir la solicitud. Si el adjunto es una foto de un documento con información sensible, no la cita literalmente.",
      acciones: [],
      criterios: [
        "Dado que el usuario envía una foto o PDF, cuando Betty lo detecta, entonces usa el procesamiento nativo del modelo GPT-4.1 y describe el contenido en respuesta.",
        "Dado que el adjunto es un audio o sticker, cuando Betty lo detecta, entonces pide amablemente al usuario que escriba su solicitud en texto — no intenta transcribir.",
        "Dado que la foto contiene información sensible (ej. estado de cuenta), cuando Betty responde, entonces no cita literalmente datos personales y mantiene la cortesía.",
      ],
    },
  ],
};
