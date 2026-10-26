// Documentación del agente AF_Voice_Invex_Retenciones_TDC versión v8 Active.
// Misma estructura que betterwareAgentDocumentation.ts — no agrega campos extra
// salvo `owner` opcional por acción (lo usa AgentActionsSubtab).
//
// Bundle: aiAuthoringBundles/AF_Voice_Invex_Retenciones_TDC (target .v8),
// retrieveado del sandbox Telasist-Sandbox el 2026-10-26 · 1,059 líneas de
// Agent Script. v8 publicada y activa el 2026-10-22.
//
// Agente de voz de Cuentas Especiales: enrutador determinista + 6 subagentes
// (una etapa de la llamada por subagente). Toda decisión de negocio
// (identidad, oferta, límites, consentimiento, tipo de cierre, folio,
// tipificación) vive en las acciones Apex InvexRetencion*. Claude Opus 4.7 en
// todas las etapas. 8 acciones conectadas: 6 Apex Invex* + 2 Flows.
//
// El plan por fases, los riesgos y las pruebas NO viven aquí — viven en las
// tabs Plan, Calendario y Pruebas del portal.

export type TelasistRetencionAgentCategory =
  | "Enrutador"
  | "Bienvenida e intención"
  | "Identidad y seguridad"
  | "Sondeo del motivo"
  | "Oferta y consentimiento"
  | "Cierre y folio"
  | "Escalamiento a humano";

export const TELASIST_RETENCION_CATEGORIES: readonly TelasistRetencionAgentCategory[] = [
  "Enrutador",
  "Bienvenida e intención",
  "Identidad y seguridad",
  "Sondeo del motivo",
  "Oferta y consentimiento",
  "Cierre y folio",
  "Escalamiento a humano",
];

export type TelasistRetencionAgentActionDoc = {
  name: string;
  target: string;
  description?: string;
  owner?: "FDE" | "Partner" | "Built-in";
};

export type TelasistRetencionSubagentDoc = {
  id: string;
  number: number;
  name: string;
  category: TelasistRetencionAgentCategory;
  descripcion: string;
  activacion: string;
  respuestas: string;
  acciones: TelasistRetencionAgentActionDoc[];
  criterios: string[];
};

export type TelasistRetencionAgentDocumentation = {
  name: string;
  developerName: string;
  version: string;
  revision: string;
  base: string;
  categories: readonly TelasistRetencionAgentCategory[];
  subagents: TelasistRetencionSubagentDoc[];
};

const ESCALAMIENTO = {
  name: "marcar_escalamiento",
  target: "@utils.setVariables",
  description:
    "Registra motivo_escalamiento y resumen_escalamiento (los llena el modelo). El after_reasoning transiciona a escalamiento en cuanto el motivo tiene valor.",
};

export const telasistRetencionAgentDocs: TelasistRetencionAgentDocumentation = {
  name: "AF Voice Invex Retenciones TDC",
  developerName: "AF_Voice_Invex_Retenciones_TDC",
  version: "v8 Active (bundle AF_Voice_Invex_Retenciones_TDC · target .v8 · sandbox Telasist-Sandbox)",
  revision: "22-oct-2026 (Active) · snapshot 26-oct-2026",
  base:
    "Agente de voz de Cuentas Especiales para solicitudes de cancelación de tarjetas de crédito Invex. Enrutador determinista + 6 subagentes, una etapa de la llamada por subagente: recepción → identificación → sondeo → oferta → cierre, con salida a escalamiento desde cualquier etapa. Template AgentforceServiceAgent · Agent Script · es_MX · Claude Opus 4.7 en todas las etapas · voz con 17 keywords de producto (Invex, RFC, Volaris, Walmart, Programa Cero, folio…). Toda decisión de negocio (identidad, oferta, límites, consentimiento, tipo de cierre, folio y tipificación) la toma la capa Apex InvexRetencion*; el modelo conversa. 8 acciones: 6 Apex Invex* + 2 Flows. Alineado al Manual de Proceso v2.0 (guion de retención obligatorio, un intento de desescalamiento, cierre con plazo y folio dictado dos veces). Estado de la configuración y pendientes (catálogo v2026-draft, escritura del Case, lecturas de cuenta, Knowledge y telefonía sin conectar): ver la fase F2 del Plan.",
  categories: TELASIST_RETENCION_CATEGORIES,
  subagents: [
    {
      id: "enrutador",
      number: 1,
      name: "Enrutador",
      category: "Enrutador",
      descripcion:
        "`start_agent` del bundle. No conversa: en `before_reasoning` envía cada turno a la etapa vigente según las variables que dejaron las acciones. Orden de prioridad: escalamiento (motivo_escalamiento ≠ vacío) → cierre (folio ≠ vacío) → oferta (codigo_motivo ≠ vacío) → sondeo (verificado = True) → identificación (intencion_confirmada = True) → recepción.",
      activacion: "En cada turno. La transición es determinista: el modelo no elige la etapa.",
      respuestas:
        "No produce texto propio. El saludo inicial lo da el mensaje de bienvenida del sistema: \"Gracias por comunicarse a Cuentas Especiales. Le atiende una asistente virtual. ¿Con quién tengo el gusto?\"",
      acciones: [
        { name: "ir_a_recepcion", target: "@utils.transition", description: "Única acción del enrutador; continúa en la etapa de bienvenida si ninguna condición previa aplica." },
      ],
      criterios: [
        "Dado que motivo_escalamiento tiene valor, cuando llega cualquier turno, entonces la llamada va a escalamiento sin pasar por otra etapa.",
        "Dado que ya existe un folio, cuando el cliente vuelve a hablar, entonces la llamada va a cierre y no se vuelve a ofrecer ni registrar nada.",
        "Dado que el cliente ya fue validado y no hay motivo, cuando llega un turno, entonces la llamada está en sondeo; nunca regresa a identificación.",
      ],
    },
    {
      id: "recepcion",
      number: 2,
      name: "Recepción",
      category: "Bienvenida e intención",
      descripcion:
        "Agradece el nombre con empatía, pregunta en qué puede ayudar y confirma que la llamada es una solicitud de cancelación de tarjeta de crédito Invex. No pide datos. Separa desde el inicio las llamadas que no son cancelación: seguimiento de una solicitud previa, otros temas, petición de asesor, fallecimiento, incapacidad médica o tarjeta garantizada.",
      activacion: "Primera etapa de la llamada, mientras intencion_confirmada = False y no hay motivo de escalamiento.",
      respuestas:
        "Frase de empatía con el nombre y pregunta abierta. Si el cliente quiere cancelar, confirma su intención en una frase. En fallecimiento expresa condolencias. Si el mensaje no es claro, pide que explique en qué puede ayudarle.",
      acciones: [
        { name: "confirmar_cancelacion", target: "@utils.setVariables", description: "Fija intencion_confirmada = True; el after_reasoning transiciona a identificación." },
        { ...ESCALAMIENTO, description: "Motivos posibles en esta etapa: SEGUIMIENTO, OTRO_TEMA, SOLICITA_HUMANO, FALLECIMIENTO, INCAPACIDAD_MEDICA, TARJETA_GARANTIZADA." },
      ],
      criterios: [
        "Dado que el cliente dice que quiere cancelar su tarjeta, cuando el agente responde, entonces confirma la intención y pasa a identificación sin pedir datos en este turno.",
        "Dado que el cliente llama por un beneficio o una cancelación que no se aplicó, cuando el agente lo identifica, entonces registra SEGUIMIENTO y transfiere.",
        "Dado que el cliente informa el fallecimiento del titular, cuando el agente responde, entonces expresa condolencias, registra FALLECIMIENTO y no pide datos ni ofrece beneficios.",
        "Dado que el cliente llama por saldo, aclaraciones, cargos o seguros, cuando el agente lo identifica, entonces registra OTRO_TEMA y transfiere.",
      ],
    },
    {
      id: "identificacion",
      number: 3,
      name: "Identificación",
      category: "Identidad y seguridad",
      descripcion:
        "Captura seis datos en orden: nombre completo, teléfono registrado, RFC, seis últimos dígitos, nombre de la tarjeta y estado. Una herramienta por dato. Lee el RFC de regreso carácter por carácter con referencias y pide confirmación; los dígitos nunca se repiten en voz alta. Cuando los seis datos están completos y el RFC confirmado, el código ejecuta la validación contra la carga diaria de Invex (la acción también está disponible para el modelo, con la misma precondición). El estado se captura pero Apex aún no lo valida.",
      activacion:
        "Desde recepción cuando intencion_confirmada = True. before_reasoning incrementa turnos_identificacion; con 10 turnos sin validar se marca VALIDACION_FALLIDA. Si un intento no coincide y quedan intentos, se limpian RFC y dígitos para volver a pedirlos.",
      respuestas:
        "Explica una vez que necesita validar datos para proteger la cuenta y pide solo el siguiente dato que falte. Nunca revela qué dato no coincidió. Mensaje de espera durante la validación: \"Permítame un momento, estoy validando su información.\"",
      acciones: [
        { name: "registrar_nombre", target: "@utils.setVariables", description: "dato_nombre. Available when verificado == False." },
        { name: "registrar_telefono", target: "@utils.setVariables", description: "dato_telefono (solo dígitos, o NO si no lo tiene)." },
        { name: "registrar_rfc", target: "@utils.setVariables", description: "dato_rfc en mayúsculas sin espacios; reinicia rfc_confirmado." },
        { name: "confirmar_rfc", target: "@utils.setVariables", description: "rfc_confirmado = True cuando el cliente confirma la lectura del RFC." },
        { name: "registrar_digitos", target: "@utils.setVariables", description: "dato_ultimos6 (solo dígitos)." },
        { name: "registrar_producto", target: "@utils.setVariables", description: "dato_producto tal como lo dijo el cliente, o NO SABE." },
        { name: "registrar_estado", target: "@utils.setVariables", description: "dato_estado. Se captura; Apex todavía no lo valida." },
        { name: "validar_tarjetahabiente", target: "apex://InvexValidarTarjetahabiente", owner: "FDE", description: "Valida contra la carga diaria de Invex (RFC, 6 dígitos, nombre y teléfono), crea o reutiliza el Case del día y devuelve producto canónico, nombre de pila, últimos 4, historial de 12 meses, alerta de gestión reciente, último folio e intentos. Available when los seis datos están completos y el RFC confirmado; también se ejecuta por código (run) en after_reasoning." },
        { ...ESCALAMIENTO, description: "Motivos posibles: FALLECIMIENTO, INCAPACIDAD_MEDICA, SOLICITA_HUMANO; por código, VALIDACION_FALLIDA (10 turnos) o el motivo que devuelva la validación (intentos agotados, NO_ENCONTRADO)." },
      ],
      criterios: [
        "Dado que el cliente dice varios datos en una frase, cuando el agente responde, entonces registra cada uno con su herramienta y solo pide el siguiente que falte.",
        "Dado que el cliente dictó su RFC, cuando el agente lo registra, entonces lo lee de regreso carácter por carácter y espera confirmación antes de validar.",
        "Dado que la validación devuelve NO_COINCIDE o NO_ENCONTRADO y quedan intentos, cuando el agente responde, entonces pide de nuevo RFC y seis dígitos sin decir qué dato falló.",
        "Dado que pasaron 10 turnos sin validar, cuando termina el turno, entonces se registra VALIDACION_FALLIDA y la llamada se transfiere.",
        "Dado que el cliente no sabe el nombre de su tarjeta, cuando el agente lo pregunta, entonces registra NO SABE y continúa (en v8 eso deja al motor sin producto; ver F2 del Plan).",
      ],
    },
    {
      id: "sondeo",
      number: 4,
      name: "Sondeo",
      category: "Sondeo del motivo",
      descripcion:
        "Agradece la validación por el nombre, usa la memoria del cliente (gestiones de los últimos 12 meses) con naturalidad, pregunta qué le motiva a cancelar con un máximo de dos preguntas directas y clasifica el motivo en NO_USA, NO_COMPRA, NO_LE_CONVIENE, VIAJA_POCO, ANUALIDAD_ALTA u OTRO. Con el motivo pide al motor la primera oferta. Si hubo una gestión en los últimos 15 días, primero pregunta si la llamada es por esa solicitud. Un solo intento de desescalar a un cliente muy molesto.",
      activacion: "Desde identificación cuando verificado = True. Sale a oferta en cuanto codigo_motivo tiene valor, o a cierre si se registró un seguimiento.",
      respuestas:
        "Empatía breve, escucha sin interrumpir. No ofrece nada antes de recibir la oferta del motor. Desescalamiento: \"¿Me permite un minuto para entender qué pasó?\". Mensaje de espera: \"Permítame un momento, estoy revisando las opciones para su tarjeta.\"",
      acciones: [
        { name: "obtener_oferta", target: "apex://InvexObtenerOferta", owner: "FDE", description: "Motor de retención: con cuenta, producto canónico, motivo e historial devuelve la primera oferta (código, guion aprobado, condiciones, alternativa), los límites (puede ofrecer más, cancelación habilitada) y las preguntas exactas de retención y de cancelación. El script de retención lo arma Apex desde Invex_Config__mdt." },
        { name: "registrar_seguimiento", target: "apex://InvexRegistrarSeguimiento", owner: "FDE", description: "Fase 1b: registra beneficio o cancelación no aplicados con el folio previo y devuelve el guion de seguimiento. Available when Automatizar_Seguimiento está encendido (hoy apagado: el seguimiento se transfiere)." },
        { name: "marcar_desescalamiento", target: "@utils.setVariables", description: "desescalamiento_intentado = True tras el único intento." },
        { ...ESCALAMIENTO, description: "Motivos posibles: FALLECIMIENTO, INCAPACIDAD_MEDICA, TARJETA_GARANTIZADA, EXCEPCION_EXPI, AMENAZA_LEGAL, SOLICITA_HUMANO, CLIENTE_MOLESTO, SEGUIMIENTO; por código, ERROR_TECNICO si el registro falla." },
      ],
      criterios: [
        "Dado que el cliente explicó su motivo, cuando el agente lo clasifica, entonces llama a obtener_oferta con el código y no menciona ningún beneficio antes de recibir la respuesta.",
        "Dado que el cliente está muy molesto, cuando el agente responde por primera vez, entonces hace un solo intento de desescalar y no transfiere en ese turno.",
        "Dado que ya se intentó desescalar y el cliente sigue sin querer escuchar, cuando el agente responde, entonces registra CLIENTE_MOLESTO sin usar la palabra transferencia.",
        "Dado que hubo una gestión de retención en los últimos 15 días, cuando inicia el sondeo, entonces el agente pregunta primero si la llamada es por esa solicitud.",
      ],
    },
    {
      id: "oferta",
      number: 5,
      name: "Oferta y consentimiento",
      category: "Oferta y consentimiento",
      descripcion:
        "Presenta un beneficio a la vez, conectado con el motivo, usando solo el texto aprobado y sus condiciones. Si el cliente rechaza, pide la siguiente oferta al motor; no inventa. La cancelación solo se habilita cuando se presentó el mínimo de ofertas (Config: 2 a 3). Si el cliente acepta, lee completo y literal el script obligatorio de retención y registra su respuesta exacta; si reitera que quiere cancelar, hace la pregunta exacta de cancelación y registra su respuesta. Apex valida el consentimiento (CONFIRMADO / NEGADO / AMBIGUO), decide el tipo de cierre, genera el folio y tipifica el Case.",
      activacion: "Desde sondeo cuando codigo_motivo tiene valor. Sale a cierre en cuanto hay folio, o a escalamiento si hay motivo o error técnico.",
      respuestas:
        "Beneficio actual con su guion aprobado; alternativa si el plazo no convence. Sin enumerar todos los beneficios ni cambiar montos o plazos. Si la respuesta no fue un sí claro, aclara y repite la pregunta. Al registrar con éxito, una frase de agradecimiento y la pregunta de si tiene dónde anotar su folio.",
      acciones: [
        { name: "siguiente_oferta", target: "apex://InvexSiguienteOferta", owner: "FDE", description: "Siguiente beneficio cuando el cliente rechazó el actual. Available when puede_ofrecer_mas == True." },
        { name: "registrar_retencion", target: "apex://InvexRegistrarResultado", owner: "FDE", description: "RETENCION con el código del beneficio aceptado, la respuesta literal y el script leído (un script repetido como respuesta se rechaza como AMBIGUO). Genera folio RB y tipifica. Available when ofertas_presentadas > 0." },
        { name: "registrar_cancelacion", target: "apex://InvexRegistrarResultado", owner: "FDE", description: "CANCELACION con la respuesta literal a la pregunta de cancelación. Apex decide CC o CB según saldo (en v8 el saldo no está conectado y toda cancelación sale CB). Available when cancelacion_habilitada == True." },
        { name: "marcar_desescalamiento", target: "@utils.setVariables", description: "desescalamiento_intentado = True tras el único intento." },
        { ...ESCALAMIENTO, description: "Motivos posibles: AMENAZA_LEGAL, FALLECIMIENTO, INCAPACIDAD_MEDICA, TARJETA_GARANTIZADA, EXCEPCION_EXPI, SOLICITA_HUMANO, CLIENTE_MOLESTO; por código, ERROR_TECNICO." },
      ],
      criterios: [
        "Dado que el cliente rechaza la oferta y quedan ofertas, cuando el agente responde, entonces usa siguiente_oferta y presenta un solo beneficio nuevo.",
        "Dado que aún no se presentó el mínimo de ofertas, cuando el cliente insiste en cancelar, entonces el agente reconoce su postura y presenta brevemente la siguiente oferta.",
        "Dado que el cliente acepta un beneficio, cuando el agente confirma, entonces lee el script obligatorio de retención tal cual y registra la respuesta exacta del cliente.",
        "Dado que el consentimiento resulta AMBIGUO o NEGADO, cuando el agente responde, entonces no registra nada y vuelve a pedir un sí o un no explícito.",
        "Dado que el cliente reitera con claridad que quiere cancelar y la cancelación está habilitada, cuando el agente responde, entonces no insiste: hace la pregunta exacta de cancelación y registra la respuesta.",
      ],
    },
    {
      id: "cierre",
      number: 6,
      name: "Cierre y despedida",
      category: "Cierre y folio",
      descripcion:
        "Con el registro hecho (retención, cancelación o seguimiento) no vuelve a ofrecer ni negociar. Pregunta si el cliente tiene dónde anotar, lee el guion oficial de cierre con el folio, repite el folio una segunda vez lentamente, repite el plazo que diga el guion, pregunta si hay algo más, menciona la encuesta y se despide una sola vez. El código cuelga la llamada una sola vez.",
      activacion: "Desde oferta o sondeo cuando folio tiene valor.",
      respuestas:
        "Guion oficial de cierre (guion_cierre) y folio dictado (folio_dictado). Nunca dice que el beneficio o la cancelación ya quedó aplicado: la solicitud quedó registrada y se aplica conforme al proceso.",
      acciones: [
        { name: "despedirse", target: "@utils.setVariables", description: "despedida_dicha = True; available when despedida_dicha == False (una sola vez)." },
        { name: "Finalizar_llamada", target: "flow://Finalizar_llamada", owner: "FDE", description: "Cuelga la llamada. Se ejecuta por código (run) en after_reasoning, una sola vez (finalizacion_intentada), cuando hay VoiceCallId." },
        { ...ESCALAMIENTO, description: "Motivos posibles: OTRO_TEMA, SOLICITA_HUMANO (si la llamada no ha finalizado)." },
      ],
      criterios: [
        "Dado que hay folio, cuando el cliente indica que está listo para anotar, entonces el agente lee el guion de cierre y repite el folio una segunda vez.",
        "Dado que el cliente no necesita nada más, cuando el agente se despide, entonces menciona la encuesta, se despide una sola vez y el sistema finaliza la llamada.",
        "Dado que el agente ya se despidió, cuando llega otro turno, entonces no se vuelve a ejecutar la finalización ni se repite la despedida.",
      ],
    },
    {
      id: "escalamiento",
      number: 7,
      name: "Escalamiento a asesor",
      category: "Escalamiento a humano",
      descripcion:
        "En before_reasoning, una sola vez: registra en el Case el motivo y el resumen de la llamada (InvexRegistrarEscalamiento devuelve la opción de IVR) y avisa a la telefonía la opción de transferencia (flow Update_Voice_Call_Description). Luego dice una frase breve adecuada al motivo y transfiere. 12 motivos: FALLECIMIENTO, INCAPACIDAD_MEDICA, TARJETA_GARANTIZADA, EXCEPCION_EXPI, CLIENTE_MOLESTO, AMENAZA_LEGAL, OTRO_TEMA, SOLICITA_HUMANO, SEGUIMIENTO, NO_ENCONTRADO, VALIDACION_FALLIDA, ERROR_TECNICO.",
      activacion: "Desde cualquier etapa en cuanto motivo_escalamiento tiene valor.",
      respuestas:
        "Una sola frase cálida. En fallecimiento, condolencias antes de comunicar al área. En NO_ENCONTRADO o VALIDACION_FALLIDA, explica que un asesor revisará su información sin decir qué dato no coincidió. Mensaje de la telefonía: \"Le comunico con un asesor de Cuentas Especiales. Por favor, permanezca en la línea.\"",
      acciones: [
        { name: "Registrar_escalamiento", target: "apex://InvexRegistrarEscalamiento", owner: "FDE", description: "Registra motivo y resumen en el Case y devuelve la opción de IVR (hoy siempre 1: Opciones_IVR_Motivo = *=1). Se ejecuta por código (run)." },
        { name: "Transferir_a_humano", target: "flow://Update_Voice_Call_Description", owner: "FDE", description: "Indica a la telefonía la opción de transferencia sobre la VoiceCall. Se ejecuta por código (run)." },
        { name: "transferir", target: "@utils.escalate", description: "Transfiere la llamada a un asesor humano en el mismo turno de la frase final." },
      ],
      criterios: [
        "Dado que hay motivo de escalamiento, cuando se entra a la etapa, entonces se registra el motivo en el Case y se avisa a la telefonía una sola vez, antes de que el modelo hable.",
        "Dado que el motivo es FALLECIMIENTO, cuando el agente responde, entonces expresa condolencias antes de indicar que lo comunica con el área.",
        "Dado que la validación falló, cuando el agente transfiere, entonces no revela qué dato no coincidió.",
      ],
    },
  ],
};
