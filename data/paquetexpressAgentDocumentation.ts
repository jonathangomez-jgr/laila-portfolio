// Documentación + audit del agente DRAFT de Paquetexpress (Fase 2 · RAD).
//
// Fuente de verdad: aiAuthoringBundles/FDE_Paquetexpress_Service_Agent_Split_voice_16.agent
// retrievado del sandbox paquetexpress-sandbox (qa2020) el 2026-10-12.
// Este bundle es el Draft con el subagente RAD_Management_voice que cubre los
// tres flujos del Excel de diseño (Normal, Prepago/RPP, WW).
//
// Mapa de iniciativas:
//   - Iniciativa 1 (en UAT · sobre el Active `Paquete_Express_vX` V14): migración a
//     Agent Script + WhatsApp Voice Messages + Speech-to-Text en chat web.
//   - Iniciativa 2 (Fase 2 · este documento): construcción del flujo RAD completo
//     para integrarlo al agente definitivo.
//
// Diseño de referencia: Files - Freeway/RAD - simulacion de pruebas por tipo - unificado.xlsx
// (hojas DISEÑO - RAD, Normal, Prepago, WW, Datos de prueba).

export type PaquetexpressAgentCategory =
  | "Entrada y verificación"
  | "Cotización"
  | "Rastreo y envíos"
  | "Recolección a domicilio"
  | "Información y servicios"
  | "Casos y escalamiento"
  | "Control de conversación";

export const PAQUETEXPRESS_CATEGORIES: PaquetexpressAgentCategory[] = [
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

export type PaquetexpressTestTurn = {
  speaker: "Agente" | "Cliente" | "Sistema";
  text: string;
  nota?: string;
};

export type PaquetexpressTestScenario = {
  id: string;
  flujo: "Normal" | "Prepago (RPP)" | "WW" | "General";
  titulo: string;
  descripcion: string;
  precondiciones: string[];
  datosDePrueba: Array<{ campo: string; valor: string }>;
  conversacion: PaquetexpressTestTurn[];
  resultadoEsperado: string;
};

export type PaquetexpressSubagentDoc = {
  id: string;
  number: number;
  name: string;
  developerName: string;
  category: PaquetexpressAgentCategory;
  estado:
    | "Implementado · Active"
    | "Implementado · Draft"
    | "Draft parcial · mocks"
    | "No implementado · diseño pendiente"
    | "Deprecated";
  descripcion: string;
  activacion: string;
  respuestas: string;
  acciones: PaquetexpressAgentActionDoc[];
  criterios: string[];
  escenarios?: PaquetexpressTestScenario[];
};

export type PaquetexpressAuditFinding = {
  id: string;
  severidad: "Crítico" | "Alto" | "Medio" | "Observación";
  titulo: string;
  evidencia: string;
  impacto: string;
  fix: string;
};

export type PaquetexpressGapWave = {
  nombre: string;
  objetivo: string;
  items: Array<{ titulo: string; detalle: string }>;
};

export type PaquetexpressTimelineMilestone = {
  semana: string;
  fecha: string;
  iniciativa: "Iniciativa 1 · UAT" | "Iniciativa 2 · RAD" | "Transversal";
  titulo: string;
  descripcion: string;
  entregable: string;
  estado: "Hecho" | "En curso" | "Pendiente" | "Riesgo";
};

export type PaquetexpressAgentDocumentation = {
  name: string;
  developerName: string;
  botId: string;
  version: string;
  estado: "Active" | "Draft" | "Deprecated";
  revision: string;
  canal: string;
  base: string;
  iniciativaResumen: string;
  resumenAudit: string;
  hallazgos: PaquetexpressAuditFinding[];
  planOlas: PaquetexpressGapWave[];
  timeline: PaquetexpressTimelineMilestone[];
  subagents: PaquetexpressSubagentDoc[];
};

// -----------------------------------------------------------------------------
// Datos comunes de prueba — hoja "Datos de prueba" del libro RAD unificado
// -----------------------------------------------------------------------------

const DATOS_IDENTIFICACION = [
  { campo: "Clave GLP (origen)", valor: "5619946 — PRUEBA SALESFORCE RAD" },
  { campo: "RFC alterno", valor: "XAXX-010101-000" },
  { campo: "Teléfono alterno", valor: "5558649070" },
  { campo: "Nombre alterno", valor: "PRUEBA SALESFORCE RAD" },
  { campo: "Alta ya creada (solo buscar)", valor: "clave 5620393" },
];

const DATOS_DIRECCION_ORIGEN = [
  { campo: "Dirección de recolección", valor: "HIDALGO 10, JUAREZ, 06600, CIUDAD DE MEXICO" },
  { campo: "Sucursal RAD origen", valor: "MEX14" },
  { campo: "Código de colonia origen", valor: "25655" },
];

const DATOS_DIRECCION_DESTINO = [
  { campo: "Dirección destino", valor: "CALLE INDUSTRIAL 2 no. 14, CENTRO SINALOA, 80000, CULIACAN, SINALOA" },
  { campo: "Sucursal destino", valor: "CUL01 (alternativa CUL02, tope 9999)" },
  { campo: "Código de colonia destino", valor: "171185" },
];

// -----------------------------------------------------------------------------
// Documento
// -----------------------------------------------------------------------------

export const paquetexpressAgentDocs: PaquetexpressAgentDocumentation = {
  name: "Paquete Express — Agente Draft (Fase 2 · RAD)",
  developerName: "FDE_Paquetexpress_Service_Agent_Split_voice",
  botId: "Bundle Draft: FDE_Paquetexpress_Service_Agent_Split_voice_16 (BotDefinition 0XxVn… · ExternalCopilot)",
  version: "V12 Draft",
  estado: "Draft",
  revision: "12-oct-2026 · bundle retrievado del sandbox qa2020 (modificado 2026-10-02 por Regina Segura)",
  canal: "Voice (telefonía con mocks GLP) + Enhanced Messaging (default_locale es_MX, additional en_US)",
  base:
    "Bundle Draft objetivo de la Fase 2. Agent Script con 10 subagentes consolidados y un subagente dedicado RAD_Management_voice que soporta los TRES tipos de recolección del Excel de diseño: RPP (guía prepagada con flujo completo mock), WW (simplificado — escala directo a asesor), y Normal (flujo end-to-end completo con captura cliente → dirección → paquetes → cliente destino → pago → cobertura → agendamiento). Hoy el flujo RAD usa mocks (MOCK_GLP_*); el paralelo pendiente es engancharlo a las 11 clases Glp* reales ya desplegadas en la org.",
  iniciativaResumen:
    "Dos iniciativas corren en paralelo. **Iniciativa 1** (en UAT sobre `Paquete_Express_vX` V14 Active): migración a Agent Script + mejoras de WhatsApp Voice Messages + Speech-to-Text en el widget web — ya en pruebas del cliente. **Iniciativa 2** (este documento): este Draft con el flujo RAD completo. La versión final del agente consolidará ambas: los subagentes Active V14 (quote nacional + internacional separados, verificación con teléfono) + el subagente RAD_Management del Draft, enganchado contra las clases Glp* reales en lugar de los mocks.",
  resumenAudit:
    "El Draft cubre el flujo RAD de los tres tipos como lo pide el Excel de diseño — pero todavía usa mocks (MOCK_GLP_*), no las clases Glp* reales que ya existen en la org. El flujo WW está muy simplificado (solo escala) en lugar de implementar WW-003 a WW-010 del diseño. La convergencia con el Active V14 (que ya tiene International_Quote_Management separado, verificación con teléfono y mejoras post-UAT) todavía no está hecha: ambos bundles divergen y hay que portar los learnings. Los Glp* reales ya cubren TODO lo que el Draft necesita (buscar/crear cliente, consultar guía, zona, sucursales Ocurre, fechas, cotizar, crear recolección), así que la Ola 1 es la migración mock→real.",
  hallazgos: [
    {
      id: "C-1",
      severidad: "Crítico",
      titulo: "Flujo RAD completo usa mocks — no las clases Glp* reales ya desplegadas",
      evidencia:
        "El subagente RAD_Management_voice del Draft invoca: MOCK_GLP_BuscarGuia, MOCK_GLP_BuscarCliente, MOCK_GLP_ConsultarSucursalFronteriza, MOCK_GLP_ValidarDimensiones, MOCK_GLP_SucursalesDisponibles, MOCK_GLP_DatesToCollection, MOCK_GLP_RadCreate. En paralelo existen las clases reales: GlpBuscarCliente, GlpConsultarGuia, GlpConsultarZona, GlpConsultarSucursalesOcurre, GlpConsultarFechas, GlpCotizar, GlpCrearRecoleccion, GlpCrearCliente, GlpCrearDireccionFiscal, GlpHttpCliente, GlpCalloutMock — con last modified entre 22-sep y 06-oct 2026.",
      impacto:
        "El Draft funciona en Preview pero no está wired al back-office real. Un publish hoy no genera recolecciones reales en GLP. Riesgo también de divergencia silenciosa si GLP cambia contratos.",
      fix:
        "Ola 1 del plan: migrar cada MOCK_GLP_* al Glp* real. El contrato de entrada/salida ya es compatible — es cambio de `target: apex://MOCK_GLP_*` a `target: apex://Glp*` y ajuste de nombres de inputs/outputs donde difieran.",
    },
    {
      id: "C-2",
      severidad: "Crítico",
      titulo: "Flujo WW colapsado — hoy solo escala, no construye el caso/correo",
      evidencia:
        "El bloque `if radType == 'WW'` del subagente dice: `1. Di al cliente: 'Le pido de favor no usar cartones de huevo'. 2. Luego: 'Para completar el agendamiento con guía documentada en línea, le voy a comunicar con un asesor especializado. Le mantengo en línea.' y transiciona al subagente de Escalation.` No llama a GlpConsultarGuia(SIPWEB), no confirma dirección, no captura contacto, no crea Case ni dispara email.",
      impacto:
        "El Excel especifica WW-002 → WW-010: consultar guía en SIPWEB, confirmar datos, confirmar dirección, pedir contacto RAD, crear Case en Salesforce con los datos y disparar email a la sucursal RAD de origen. Hoy el agente escala siempre — carga 100% al humano.",
      fix:
        "Construir el flujo WW: integración a `GlpConsultarGuia`, confirmación de datos, captura de contacto, Flow autolanzado para crear Case (template de email por diseñar), y disparo de email a la sucursal via Email Alert. Está marcado en Ola 2 porque depende de alinear el template de correo con operación.",
    },
    {
      id: "C-3",
      severidad: "Crítico",
      titulo: "Divergencia Draft ↔ Active: features de UAT no están en el Draft",
      evidencia:
        "El Active `Paquete_Express_vX` V14 tiene mejoras post-UAT que NO están en este Draft: (a) subagente `International_Quote_Management` separado (en Draft la rama internacional vive dentro de Quote_Management), (b) `Customer_Verification` ahora pide teléfono y usa WhatsAppPhone pre-poblado, (c) `isExistingContact` para saludar diferente a clientes recurrentes, (d) `Escalation_v2` cubre intents operativos directos, (e) saludos y copy actualizados.",
      impacto:
        "Si se publica este Draft tal cual, se pierden todas las mejoras ya validadas en UAT. La versión final tiene que ser una fusión Draft + Active, no una u otra.",
      fix:
        "Ola 0 del plan: portar al Draft los 5 cambios del Active V14 ANTES de empezar la Ola 1 (migración mocks→reales). Esto es solo mover YAML, no toca código Apex.",
    },
    {
      id: "A-1",
      severidad: "Alto",
      titulo: "Validación de valor declarado > 50,000 presente pero sin fallback de retomar",
      evidencia:
        "El bloque `if radDeclaredValue > 50000: … transición al subagente de Escalation` corta correctamente. Pero el flujo nunca persiste el estado parcial (datos capturados hasta ese paso) ni crea un Case con la info ya recolectada para que el asesor retome sin volver a preguntar todo.",
      impacto:
        "Cuando el valor pasa el tope, el cliente ya invirtió ~20 turnos capturando datos de origen, paquetes, destino, pago. Esa inversión se pierde al escalar — mala UX.",
      fix:
        "Antes de transferir, crear un Case con `Description` = resumen de datos capturados (cliente, direcciones, paquetes, pago, valor declarado) para que el asesor lo tome como briefing.",
    },
    {
      id: "A-2",
      severidad: "Alto",
      titulo: "Captura de clave SAT por default a '01010101' sin aviso",
      evidencia:
        "`capture_sat_key` guarda `01010101` cuando el cliente no la sabe. El Excel (NO-013) dice literal: 'Si no la tiene, no inventes una: se omite y GLP la asigna con el contenido.'",
      impacto:
        "Agente envía una clave SAT genérica aunque GLP ya tiene esa lógica de assignación. Si el producto real cae en otra categoría, factura/carta porte queda mal clasificada.",
      fix:
        "Dejar `radSatKey` en vacío cuando el cliente no la tiene, y en GlpCrearRecoleccion no mandar el campo (el back-end lo asigna por contenido).",
    },
    {
      id: "A-3",
      severidad: "Alto",
      titulo: "RPP: medidas del cliente no se validan contra las de la guía",
      evidencia:
        "El Excel PP-020/PP-021 pide comparar peso/largo/ancho/alto de lo que dicta el cliente vs. lo que trae la guía (devuelto por GlpConsultarGuia) y transferir si no coinciden. En el Draft, después de encontrar la guía solo se lee `radGuiaVoiceSummary` y se pasa directo a elegir fecha — nunca se re-captura el paquete ni se valida.",
      impacto:
        "Si el cliente dicta medidas distintas al despachar, el operador llega sin saberlo. GLP puede rechazar la operación en el campo.",
      fix:
        "En RPP, después de confirmar la guía, agregar PP-015 (pedir embalaje/contenido/peso/medidas) y PP-020 (comparar). Si no coinciden en kilometraje o alguna dimensión → transferir.",
    },
    {
      id: "A-4",
      severidad: "Alto",
      titulo: "Normal: cambio de información fiscal no implementado",
      evidencia:
        "El Excel NO-030/NO-031 cubre: 'La factura sale a nombre de quien paga. ¿Desea modificar la información de facturación?' — si Sí, transferir a asesor. En el Draft no existe este paso ni la variable asociada.",
      impacto:
        "Clientes con información fiscal distinta a la del alta no tienen vía de atención self-service para pedir el cambio dentro del flujo RAD.",
      fix:
        "Agregar `capture_facturacion_change` entre pago y valor declarado. Si Yes → crear Case y escalar.",
    },
    {
      id: "M-1",
      severidad: "Medio",
      titulo: "Agente dice 'recibirá un correo electrónico con la confirmación' sin verificar que exista el flow de email",
      evidencia:
        "Instrucción línea 2520: `Comparte con el cliente: 'Listo. Su recolección quedó agendada y recibirá un correo electrónico con la confirmación.'` Pero no hay evidencia en la org de un Email Alert conectado a la creación de GlpCrearRecoleccion.",
      impacto: "Expectativa generada no cumplida. Potencial queja del cliente.",
      fix:
        "Construir el Email Alert o quitar la mención del correo. Si GLP ya envía el correo del lado back-office, confirmar canal y adaptar el copy.",
    },
    {
      id: "M-2",
      severidad: "Medio",
      titulo: "Normal: no se cobra el seguro al valor declarado",
      evidencia:
        "`capture_coverage` pregunta si quiere contratar cobertura y qué tipo, pero el valor del seguro NO se calcula ni se refleja en el total cotizado. El Excel menciona en NO-032/NO-033 cobertura amplia (A), limitada (L) o sin seguro (N).",
      impacto: "Cotización incompleta en Normal cuando se contrata cobertura.",
      fix: "Al llamar GlpCotizar en Normal, incluir `Tipo de cobertura` y `Valor declarado`. GLP calcula el cargo y lo refleja en la respuesta.",
    },
    {
      id: "M-3",
      severidad: "Medio",
      titulo: "Zona Plus origen y destino no se consulta en Draft",
      evidencia:
        "El Excel NO-009 y NO-026 piden consultar `GlpConsultarZona` para origen y destino, con corte si Zona Plus. En el Draft solo se consulta `MOCK_GLP_ConsultarSucursalFronteriza` para el origen — no se chequea destino, ni se diferencia zona plus de fronteriza.",
      impacto:
        "Clientes en zonas plus llegan hasta el agendamiento aunque la operación no las soporta sin tramites adicionales.",
      fix:
        "En Normal reemplazar `MOCK_GLP_ConsultarSucursalFronteriza` por `GlpConsultarZona` (que ya cubre plus + fronteriza) para ambos CPs. Gate temprano si `isZonePlus`.",
    },
    {
      id: "O-1",
      severidad: "Observación",
      titulo: "Positivo · reset_rad_full_state limpia 40 variables para 'otra recolección'",
      evidencia:
        "La acción `reset_rad_full_state` resetea todo el estado local del subagente RAD en un solo call — permite al cliente agendar múltiples recolecciones en una misma llamada sin ensuciar state.",
      impacto: "Buen patrón para replicar en flujos largos (Quote, Case).",
      fix: "Agregar el mismo patrón `request_new_quote` en Quote_Management si no existe ya al mismo nivel.",
    },
    {
      id: "O-2",
      severidad: "Observación",
      titulo: "Positivo · flujo intake común (PAM + tipo) consolidado",
      evidencia:
        "Los pasos GE-001/GE-002/GE-003 del Excel (contenido + PAM + tipo de recolección) viven en el inicio del subagente RAD y son el mismo para los 3 tipos. Reduce duplicación.",
      impacto: "Mantenibilidad alta.",
      fix: "N/A — mantener.",
    },
  ],
  planOlas: [
    {
      nombre: "Ola 0 · Convergencia Draft ↔ Active (pre-requisito)",
      objetivo:
        "Portar al bundle Draft las 5 mejoras validadas en UAT sobre el Active V14, para que la versión final no pierda ninguna. Es cambio solo de YAML — no toca Apex.",
      items: [
        {
          titulo: "Dividir Quote_Management en nacional + International_Quote_Management",
          detalle:
            "Replicar la separación del Active V14. International_Quote_Management es un subagente dedicado que solo pide el país y crea el caso. Simplifica el router y reduce confusión del LLM.",
        },
        {
          titulo: "Agregar teléfono a Customer_Verification",
          detalle:
            "Nuevos campos customerPhone + capture_phone + input Phone en AG_Get_and_create_contact. En WhatsApp pre-popular con WhatsAppPhone; en web/voice pedirlo. isExistingContact para saludar diferente.",
        },
        {
          titulo: "Agregar escalamiento operativo directo en Escalation_v2",
          detalle:
            "Nuevo trigger explícito para intents operativos (cambio de dirección, instalación, reprogramar). Transfiere sin pedir confirmación adicional. Mantener Business Hours check.",
        },
        {
          titulo: "Actualizar copy del welcome y saludos de retorno",
          detalle:
            "Mensaje de welcome del Active V14 ya pide nombre + correo + teléfono en el saludo. Saludo diferente para contacto existente ('¡Hola de nuevo, {firstName}!').",
        },
        {
          titulo: "Modelo config y rich content enabled",
          detalle:
            "Sincronizar `model_config: sfdc_ai__DefaultGPT4Omni` y `#DisableURLRedaction#` tag en description. Verificar `additional_parameter__safety_classifier_prompt_version: v1`.",
        },
      ],
    },
    {
      nombre: "Ola 1 · Reemplazar mocks por clases Glp* reales",
      objetivo:
        "Enganchar los 7 MOCK_GLP_* a los Glp* reales ya desplegados. Es la transición de 'funciona en Preview' a 'funciona en QA real con back-office GLP'. Cierra hallazgos C-1, M-3.",
      items: [
        {
          titulo: "MOCK_GLP_BuscarCliente → GlpBuscarCliente",
          detalle:
            "Reemplazar en RAD_Management_voice. Mismo contrato: inputs (customerKey/rfc/fullName/phone) y outputs (found/hasAddresses/customerId/primaryAddressVoiceSummary). Validar con cliente real 5619946 que QA ya conoce.",
        },
        {
          titulo: "MOCK_GLP_BuscarGuia → GlpConsultarGuia",
          detalle:
            "Usar en RPP y WW. GlpConsultarGuia devuelve servicio, origen, medidas, tarifa, peso, CP + flag found. Validar con guía 13167470703 (RPP, nueva) y 19168671204 (WW ya consultable).",
        },
        {
          titulo: "MOCK_GLP_ConsultarSucursalFronteriza → GlpConsultarZona",
          detalle:
            "GlpConsultarZona cubre zona plus + fronteriza en un solo call (fix de M-3). Agregar gate para zona plus en origen y destino.",
        },
        {
          titulo: "MOCK_GLP_SucursalesDisponibles → GlpConsultarSucursalesOcurre",
          detalle:
            "Para flujo Normal cuando radShipmentDelivery == 'Ocurre'. Devuelve lista de sucursales con tope de medidas por sucursal. Validar con destino CP 80000 (CUL01/CUL02 tope 9999).",
        },
        {
          titulo: "MOCK_GLP_ValidarDimensiones → GlpConsultarSucursalesOcurre (abosorbida)",
          detalle:
            "El Excel dice que la validación de dimensiones vive dentro de Sucursales Ocurre. Si el agente no es Ocurre, saltarla; el cap de tamaño absoluto lo cubre GLP al agendar.",
        },
        {
          titulo: "MOCK_GLP_DatesToCollection → GlpConsultarFechas",
          detalle:
            "Mismos tres slots. Validar con sucursal origen MEX14 → destino CUL01 y fechas que ya funcionaron (07, 08, 09, 12 oct 2026, ventana 10:00-18:30).",
        },
        {
          titulo: "MOCK_GLP_RadCreate → GlpCrearRecoleccion",
          detalle:
            "docType = G (Normal) o P (RPP). Devuelve trackingNumber real. Validar con rastreos QA ya probados (21168675514 origen efectivo, 21168675516 TO_PAY/C, 21168675517 dos paquetes).",
        },
      ],
    },
    {
      nombre: "Ola 2 · Construir flujo WW completo",
      objetivo: "Cerrar hallazgo C-2 implementando los pasos WW-003 a WW-010 del Excel.",
      items: [
        {
          titulo: "WW-003: consultar guía documentada en línea",
          detalle:
            "Llamar GlpConsultarGuia con el número que dicta el cliente. Si Éxito=False cortar y transferir. Si True, mostrar datos devueltos (nombre, servicio, dirección, CP, tarifa, peso, medidas).",
        },
        {
          titulo: "WW-004/WW-005: confirmar datos y dirección",
          detalle:
            "Pedir sí/no sobre datos devueltos. Si no coinciden o pide cambiar plaza/dirección → transferir. No construir caso.",
        },
        {
          titulo: "WW-006: capturar contacto RAD",
          detalle:
            "Nombre completo, teléfono, ventana horaria. Readback del teléfono dígito a dígito.",
        },
        {
          titulo: "WW-007: crear Case en Salesforce",
          detalle:
            "Flow autolanzado nuevo: Create_case_RAD_WW. Inputs: guía, dirección confirmada, contacto. Output: caseNumber. Agente informa el caseNumber al cliente.",
        },
        {
          titulo: "WW-008: email a sucursal RAD origen",
          detalle:
            "Email Alert nuevo + plantilla con los datos de la recolección (guía, dirección, contacto, ventana). Agregar campo Email de tipo email al objeto Sucursal + poblar registros (pendiente listado de correos del cliente).",
        },
      ],
    },
    {
      nombre: "Ola 3 · Hardening y gaps menores",
      objetivo: "Cerrar hallazgos A-* y M-* no cubiertos en olas anteriores.",
      items: [
        {
          titulo: "A-1: persistir estado parcial cuando se escala por valor declarado > 50k",
          detalle: "Antes del transfer, crear Case con resumen de datos capturados para que el asesor retome sin re-preguntar.",
        },
        {
          titulo: "A-2: no auto-asignar clave SAT genérica",
          detalle: "Dejar radSatKey en vacío cuando el cliente no la tiene y no pasarla a GlpCrearRecoleccion.",
        },
        {
          titulo: "A-3: en RPP validar medidas vs guía (PP-020/PP-021)",
          detalle: "Después de confirmar la guía, pedir embalaje/contenido/peso/medidas y comparar con las medidas devueltas por GlpConsultarGuia. Si no coinciden → transferir.",
        },
        {
          titulo: "A-4: cambio de facturación en Normal (NO-030/NO-031)",
          detalle: "Pregunta: '¿Desea modificar la información de facturación?'. Si Yes → crear Case y transferir.",
        },
        {
          titulo: "M-1: verificar o quitar la promesa del correo de confirmación",
          detalle: "Confirmar si GLP ya dispara el correo back-office. Si no, construir el Email Alert o eliminar la mención.",
        },
        {
          titulo: "M-2: cobro de seguro en Normal",
          detalle: "Pasar `Tipo de cobertura` y `Valor declarado` a GlpCotizar para que calcule el cargo. Reflejarlo en el total mostrado al cliente.",
        },
      ],
    },
  ],
  timeline: [
    // Iniciativa 1 (UAT sobre V14 Active) — status actual, basado en que ya hay UAT en curso
    {
      semana: "S1",
      fecha: "2026-09-29 – 2026-10-05",
      iniciativa: "Iniciativa 1 · UAT",
      titulo: "Deploy V14 Active con mejoras UAT",
      descripcion:
        "Publicar bundle Paquete_Express_vX_15 (V14) con International_Quote_Management separado, verificación con teléfono, isExistingContact y escalamiento operativo directo. Habilitar en canal WhatsApp y web.",
      entregable: "BotVersion V14 Active + bundle publicado",
      estado: "Hecho",
    },
    {
      semana: "S2",
      fecha: "2026-10-06 – 2026-10-12",
      iniciativa: "Iniciativa 1 · UAT",
      titulo: "UAT de WhatsApp Voice Messages + STT en chat web",
      descripcion:
        "Pruebas del cliente sobre el nuevo soporte de audios de WhatsApp (Speech-to-Text) y el widget web con dictado por voz. Capturar bugs de reconocimiento (números de guía, CPs, correos) y ajustes de copy.",
      entregable: "Reporte de UAT + lista de hotfixes",
      estado: "En curso",
    },
    {
      semana: "S3",
      fecha: "2026-10-13 – 2026-10-19",
      iniciativa: "Iniciativa 1 · UAT",
      titulo: "Hotfixes de UAT + consolidación en V14.x",
      descripcion:
        "Aplicar los ajustes identificados en S2 al bundle. Publicar V14 patch si aplica. Preparar handoff a operación.",
      entregable: "Agente V14 estable en Active + sign-off UAT",
      estado: "Pendiente",
    },
    // Iniciativa 2 (RAD) — plan hacia la convergencia
    {
      semana: "S3",
      fecha: "2026-10-13 – 2026-10-19",
      iniciativa: "Iniciativa 2 · RAD",
      titulo: "Ola 0 · Convergencia Draft ↔ Active",
      descripcion:
        "Portar al Draft (`FDE_Paquetexpress_Service_Agent_Split_voice`) los 5 cambios de UAT del V14 Active: International_Quote_Management separado, Customer_Verification con teléfono, isExistingContact, escalamiento operativo directo, welcome y saludos actualizados. Cambio solo de YAML.",
      entregable: "Bundle Draft fusionado · validar con AiEvaluationDefinition en Preview",
      estado: "Pendiente",
    },
    {
      semana: "S4",
      fecha: "2026-10-20 – 2026-10-26",
      iniciativa: "Iniciativa 2 · RAD",
      titulo: "Ola 1 · Reemplazar mocks por Glp* reales",
      descripcion:
        "Swap de los 7 MOCK_GLP_* → Glp* reales. Correr smoke tests por tipo (RPP con guía 13167470703, Normal con cliente 5619946, WW con guía 19168671204). Validar que los contratos de entrada/salida calzan.",
      entregable: "Draft con integraciones GLP reales + traza de 3 recolecciones agendadas en QA",
      estado: "Pendiente",
    },
    {
      semana: "S5-S6",
      fecha: "2026-10-27 – 2026-11-09",
      iniciativa: "Iniciativa 2 · RAD",
      titulo: "Ola 2 · Construir flujo WW completo",
      descripcion:
        "Implementar WW-003 → WW-010: integración GlpConsultarGuia, confirmaciones, captura de contacto, Flow autolanzado para Case, Email Alert a sucursal RAD. Agregar campo Email a objeto Sucursal + poblar.",
      entregable: "Flujo WW end-to-end + Case y correo generados en QA",
      estado: "Pendiente",
    },
    {
      semana: "S7",
      fecha: "2026-11-10 – 2026-11-16",
      iniciativa: "Iniciativa 2 · RAD",
      titulo: "Ola 3 · Hardening (A-1 … M-2)",
      descripcion:
        "Cerrar los 7 hallazgos Altos/Medios: persistir estado parcial al escalar, no auto-asignar clave SAT, validar medidas en RPP, cambio de facturación Normal, cobro de seguro, verificar correo de confirmación.",
      entregable: "Agente Draft listo para UAT de RAD",
      estado: "Pendiente",
    },
    {
      semana: "S8",
      fecha: "2026-11-17 – 2026-11-23",
      iniciativa: "Iniciativa 2 · RAD",
      titulo: "UAT de RAD con el cliente",
      descripcion:
        "Correr los 3 escenarios Normal / Prepago / WW con operación del cliente. Usar los datos de prueba de la hoja Datos de prueba. Capturar bugs y ajustes de UX.",
      entregable: "Reporte UAT RAD + sign-off operación",
      estado: "Pendiente",
    },
    {
      semana: "S9",
      fecha: "2026-11-24 – 2026-11-30",
      iniciativa: "Transversal",
      titulo: "Publicar agente final V15/V16",
      descripcion:
        "Mergear Draft (con RAD + Olas 0-3 cerradas) al bot principal. Promover BotVersion a Active. Comunicar cambios a operación y canales.",
      entregable: "Agente V15/V16 Active con RAD completo + feature flags por canal",
      estado: "Pendiente",
    },
  ],
  subagents: [
    {
      id: "agent_router",
      number: 1,
      name: "Enrutador del Agente",
      developerName: "agent_router",
      category: "Entrada y verificación",
      estado: "Implementado · Draft",
      descripcion:
        "`start_agent` del bundle Draft. Da la bienvenida, aplica gate de verificación y, cuando el cliente ya está verificado, enruta por `pendingIntent`: Quote, Order, Case, GeneralInfo, JobBranch, Escalation o **RAD**. En el Draft la rama internacional vive dentro de Quote_Management (ver hallazgo C-3 — se debe portar la separación del Active V14).",
      activacion:
        "En cada turno nuevo. Si isVerified != True transiciona a Customer_Verification_16j1dade3eb0b10. Si pendingIntent == 'RAD' transiciona a RAD_Management_voice.",
      respuestas:
        "No produce texto propio. Welcome definido en system.messages: 'Hola, buen día. Soy el asistente virtual de Paquetexpress. Para ayudarle mejor, ¿me indica su nombre completo, por favor?'",
      acciones: [
        { name: "go_to_Customer_Verification_16j1dade3eb0b10", target: "@utils.transition" },
        { name: "go_to_Quote_Management_16j9427bc776003", target: "@utils.transition", description: "Nacional + internacional (en el Draft no están separados)." },
        { name: "go_to_Orden_Management_16je7f3f3223af5", target: "@utils.transition" },
        { name: "go_to_CaseManagement_v2_16jf9db4b526803", target: "@utils.transition" },
        { name: "go_to_General_Information_Management_16jeb86fca18701", target: "@utils.transition" },
        { name: "go_to_Job_Search_16jfb5eb38adcd9", target: "@utils.transition" },
        { name: "go_to_Escalation_v2_16j6b2f5f1ead75", target: "@utils.transition" },
        { name: "go_to_RAD_Management_voice", target: "@utils.transition", description: "Palabras clave: recolección, agendar recolección, recoger paquete, pasar por mi paquete, guía prepagada, recolección a domicilio." },
        { name: "go_to_ambiguous_question", target: "@utils.transition" },
        { name: "go_to_off_topic", target: "@utils.transition" },
      ],
      criterios: [
        "Dado que el cliente aún no está verificado, cuando el router recibe un mensaje, entonces transiciona a Customer_Verification sin importar el intent inicial — pendingIntent se preserva para retomarlo.",
        "Dado que pendingIntent == 'RAD' y isVerified == True, cuando el router evalúa, entonces transiciona directo a RAD_Management_voice.",
        "**Gap vs Active V14 (hallazgo C-3):** este router no tiene International_Quote_Management separado. Ola 0 lo porta.",
      ],
    },
    {
      id: "rad_management",
      number: 2,
      name: "Gestión de Recolección a Domicilio (RAD)",
      developerName: "RAD_Management_voice",
      category: "Recolección a domicilio",
      estado: "Draft parcial · mocks",
      descripcion:
        "⭐ **Subagente clave de la Fase 2.** Soporta los tres tipos de recolección del Excel: **RPP** (guía prepagada — flujo corto con MOCK_GLP_BuscarGuia + MOCK_GLP_DatesToCollection + MOCK_GLP_RadCreate), **WW** (guía documentada en línea — hoy colapsado a escalación directa, ver hallazgo C-2), y **Normal** (recolección completa end-to-end con captura cliente → dirección → paquetes → cliente destino → entrega → forma de pago → cobertura → valor declarado → agendamiento). El intake común GE-001/GE-002/GE-003 (contenido + PAM + tipo) es compartido. **Hoy usa MOCK_GLP_* — la Ola 1 del plan los reemplaza por las 11 clases Glp* reales ya desplegadas en la org (hallazgo C-1).**",
      activacion:
        "pendingIntent == 'RAD' o palabras clave (recolección, agendar recolección, pasar por mi paquete, guía prepagada, documenté en línea, WW). También como pivot desde Quote_Management cuando quoteRAD == 'Yes' y el cliente acepta.",
      respuestas:
        "GE-001 preguntar contenido + validar contra PAM (lista: armas, explosivos, drogas, dinero, joyería, animales, restos humanos, NOM 002 SCT, piratas, lotería extranjera). GE-002 pedir aceptación de PAM sin leer la URL. GE-003 preguntar modalidad: '¿Su recolección es con guía prepagada, con guía documentada en línea, o es una recolección normal?'. En voice usar 'guía prepagada'/'recolección a domicilio'/'OCURRE o recoger en sucursal' — nunca RPP/RAD/EAD como siglas. Readback dígito a dígito para números de guía.",
      acciones: [
        { name: "capture_rad_content_accepted", target: "@utils.setVariables", description: "Contenido del paquete + validación PAM OK." },
        { name: "capture_rad_policy_confirmed", target: "@utils.setVariables", description: "Cliente confirmó aceptación PAM." },
        { name: "capture_rad_type", target: "@utils.setVariables", description: "'RPP' | 'WW' | 'Normal'." },
        { name: "capture_rad_guia_number", target: "@utils.setVariables", description: "Número de guía (RPP) tras readback confirmado." },
        { name: "capture_rad_selected_option", target: "@utils.setVariables", description: "OPT_1, OPT_2 u OPT_3 (RPP)." },
        { name: "reset_rad_guia_state", target: "@utils.setVariables", description: "Limpiar guía RPP para reintentar." },
        { name: "capture_orig_customer_search", target: "@utils.setVariables", description: "Normal · Identificadores del cliente origen (clave/RFC/nombre+tel)." },
        { name: "capture_orig_address_manual / confirm_orig_address / capture_orig_postal_code", target: "@utils.setVariables", description: "Normal · dirección de recolección confirmada." },
        { name: "capture_orig_contact", target: "@utils.setVariables", description: "Normal · nombre + teléfono + referencias del contacto en origen." },
        { name: "capture_package_count / capture_packages_summary", target: "@utils.setVariables", description: "Normal · cantidad y resumen consolidado de paquetes + totales." },
        { name: "capture_sat_key", target: "@utils.setVariables", description: "Normal · clave SAT ('01010101' si el cliente no la tiene) — ver A-2." },
        { name: "capture_dest_customer_search / capture_dest_address_manual / confirm_dest_address / capture_dest_postal_code", target: "@utils.setVariables", description: "Normal · cliente y dirección de destino." },
        { name: "capture_dest_contact", target: "@utils.setVariables", description: "Normal · contacto de entrega." },
        { name: "capture_shipment_delivery / capture_branch_name", target: "@utils.setVariables", description: "Normal · 'Domicilio' o 'Ocurre' + sucursal elegida si Ocurre." },
        { name: "capture_payment_method / capture_payment_mode", target: "@utils.setVariables", description: "Normal · 'Origin'|'FreightCollect'|'Requester'|'ThirdParty' + 'Cash'|'Transfer'|'Info'." },
        { name: "capture_declared_value", target: "@utils.setVariables", description: "Normal · valor declarado entero. Si > 50k → escalar." },
        { name: "capture_coverage / capture_additional_service", target: "@utils.setVariables", description: "Normal · cobertura + COD/Acuse." },
        { name: "capture_pickup_datetime", target: "@utils.setVariables", description: "Normal · fecha + ventana. Dispara agendamiento automático." },
        { name: "reset_rad_full_state", target: "@utils.setVariables", description: "Reset de 40+ variables para agendar otra recolección en la misma llamada." },
        { name: "MOCK_GLP_BuscarGuia", target: "apex://MOCK_GLP_BuscarGuia", description: "⚠️ MOCK · Real pendiente: GlpConsultarGuia. RPP y WW." },
        { name: "MOCK_GLP_BuscarCliente", target: "apex://MOCK_GLP_BuscarCliente", description: "⚠️ MOCK · Real pendiente: GlpBuscarCliente. Normal (origen + destino)." },
        { name: "MOCK_GLP_ConsultarSucursalFronteriza", target: "apex://MOCK_GLP_ConsultarSucursalFronteriza", description: "⚠️ MOCK · Real pendiente: GlpConsultarZona (cubre fronteriza + Zona Plus — ver M-3)." },
        { name: "MOCK_GLP_ValidarDimensiones", target: "apex://MOCK_GLP_ValidarDimensiones", description: "⚠️ MOCK · Real pendiente: absorbida por GlpConsultarSucursalesOcurre." },
        { name: "MOCK_GLP_SucursalesDisponibles", target: "apex://MOCK_GLP_SucursalesDisponibles", description: "⚠️ MOCK · Real pendiente: GlpConsultarSucursalesOcurre." },
        { name: "MOCK_GLP_DatesToCollection (datesToCollectionMock)", target: "apex://MOCK_GLP_DatesToCollection", description: "⚠️ MOCK · Real pendiente: GlpConsultarFechas." },
        { name: "MOCK_GLP_RadCreate", target: "apex://MOCK_GLP_RadCreate", description: "⚠️ MOCK · Real pendiente: GlpCrearRecoleccion (docType=G Normal, P RPP)." },
      ],
      criterios: [
        "Dado que el cliente aún no acepta la PAM, cuando el agente avanza, entonces NO ejecuta ninguna acción GLP y espera la confirmación explícita.",
        "Dado que la mercancía es prohibida por PAM, cuando el agente detecta, entonces dice el texto literal 'Lamento informarle que ese contenido no es transportable con nuestro servicio' y escala.",
        "Dado que radType == 'RPP' y radGuiaFound == False, cuando el agente responde, entonces ofrece transferir o reintentar con otro número — nunca inventa datos.",
        "Dado que radType == 'Normal' y radDeclaredValue > 50000, cuando se registra el valor, entonces el agente transfiere a Escalation_v2 — nunca llama RadCreate.",
        "Dado que el agente obtiene el trackingNumber, cuando cierra, entonces lo lee dígito por dígito en bloques de tres — nunca lo pronuncia como número decimal.",
        "**Gap C-2:** cuando radType == 'WW', entonces hoy solo escala; falta construir WW-003 → WW-010 (consultar guía, confirmar, contacto, Case, email).",
        "**Gap A-3:** en RPP falta validar medidas del cliente vs. las de la guía (PP-020/PP-021).",
        "**Gap A-4:** en Normal falta el paso de 'desea modificar facturación' (NO-030/NO-031).",
      ],
      escenarios: [
        {
          id: "rad-normal-01",
          flujo: "Normal",
          titulo: "RAD Normal · recolección agendada desde cero con cliente origen existente",
          descripcion:
            "El cliente no tiene guía prepagada; quiere programar una recolección completa (origen → destino) para que el operador genere la guía al pasar. Cliente origen 5619946 ya está dado de alta en GLP; destino se dicta como domicilio nuevo. Al cierre se calcula tarifa con GlpCotizar y se agenda con GlpCrearRecoleccion (docType=G).",
          precondiciones: [
            "Cliente verificado en Salesforce (nombre + correo + teléfono).",
            "Mercancía permitida por la PAM (ej. libros, ropa, documentos).",
            "Cliente origen existente en GLP; destino puede dictarse como dirección libre.",
            "Valor declarado ≤ 50,000 MXN (sobre ese umbral se transfiere a asesor por NO-032).",
          ],
          datosDePrueba: [
            ...DATOS_IDENTIFICACION,
            ...DATOS_DIRECCION_ORIGEN,
            ...DATOS_DIRECCION_DESTINO,
            { campo: "Paquete de ejemplo", valor: "1 paquete, libros, 1 kg, 30 x 20 x 10 cm" },
            { campo: "Clave SAT (opcional)", valor: "01010101 — ⚠️ A-2: hoy el agente la auto-asigna; debería dejarse vacía" },
            { campo: "Valor declarado", valor: "1,000 MXN · cobertura N (sin seguro) | pruebas con 5,000 y cobertura A no agregaron cargo adicional" },
            { campo: "Forma de pago", valor: "PAID + N (origen efectivo) | TO_PAY + C (flete por cobrar) · TO_PAY + N lo rechaza GLP" },
            { campo: "Fecha/hora preferida", valor: "05/10/2026, ventana 10:00–18:30 (ventana real sale de GlpConsultarFechas)" },
            { campo: "Rastreos ya creados en QA (solo leer, no re-ejecutar)", valor: "21168675514 (origen efectivo), 21168675515 (SAT+COD+acuse), 21168675516 (TO_PAY/C), 21168675517 (dos paquetes), 21168674207" },
          ],
          conversacion: [
            { speaker: "Agente", text: "Hola, buen día. Soy el asistente virtual de Paquetexpress. Para ayudarle mejor, ¿me indica su nombre completo, por favor?" },
            { speaker: "Cliente", text: "Jonathan Gómez." },
            { speaker: "Agente", text: "¿Jonathan Gómez, es correcto?" },
            { speaker: "Cliente", text: "Sí." },
            { speaker: "Agente", text: "Gracias. Y para completar la validación, ¿me dicta su correo electrónico? Puede decirlo despacio." },
            { speaker: "Cliente", text: "jonathan punto gomez arroba salesforce punto com." },
            { speaker: "Agente", text: "jonathan punto gomez arroba salesforce punto com, ¿es correcto?" },
            { speaker: "Cliente", text: "Sí." },
            { speaker: "Agente", text: "Gracias. Un momento mientras valido sus datos. Mientras tanto, ¿en qué le puedo ayudar hoy?" },
            { speaker: "Cliente", text: "Quiero agendar una recolección a domicilio normal." },
            { speaker: "Agente", text: "Claro. Primero, ¿qué contiene el paquete que va a enviar?", nota: "GE-001 — validar contra PAM." },
            { speaker: "Cliente", text: "Son libros." },
            { speaker: "Agente", text: "Perfecto. Antes de continuar, necesito confirmar que su envío cumple con nuestra política de aceptación de mercancía. ¿Podemos continuar con ese entendido?", nota: "GE-002." },
            { speaker: "Cliente", text: "Sí." },
            { speaker: "Agente", text: "¿Su recolección es con guía prepagada, con guía documentada en línea, o es una recolección normal?", nota: "GE-003." },
            { speaker: "Cliente", text: "Normal." },
            { speaker: "Agente", text: "Muy bien, comencemos con los datos del origen. ¿Me proporciona su llave de cliente? Si no la tiene a la mano, con su RFC también puedo buscarlo.", nota: "NO-001." },
            { speaker: "Cliente", text: "Mi clave es cinco, seis, uno, nueve, nueve, cuatro, seis." },
            { speaker: "Sistema", text: "GlpBuscarCliente(clave=5619946) → cliente 5619946 PRUEBA SALESFORCE RAD · HIDALGO 10 JUAREZ 06600 · sucursal MEX14 · colonia 25655." },
            { speaker: "Agente", text: "Encontré su cuenta. La dirección registrada es Hidalgo diez, colonia Juárez, código postal cero seis seis cero cero. ¿Es esta la dirección para la recolección, o me indica otra?" },
            { speaker: "Cliente", text: "Sí, en esa dirección." },
            { speaker: "Sistema", text: "GlpConsultarZona(CP=06600) → fronteriza=sí, plus=no → se continúa." },
            { speaker: "Agente", text: "¿Me indica el nombre completo y teléfono de la persona que estará en el domicilio para entregar el paquete, más alguna referencia útil?" },
            { speaker: "Cliente", text: "María López, cinco cinco cinco ocho seis cuatro nueve cero siete cero. Entre Juárez y Reforma." },
            { speaker: "Agente", text: "Cinco cinco cinco, ocho seis cuatro, nueve cero, siete cero. ¿Es correcto?" },
            { speaker: "Cliente", text: "Sí." },
            { speaker: "Agente", text: "¿Cuántos paquetes va a enviar en esta recolección?" },
            { speaker: "Cliente", text: "Uno." },
            { speaker: "Agente", text: "Le pido de favor no usar cartones de huevo como empaque para su envío. Vamos con el paquete uno. ¿De qué es el empaque?" },
            { speaker: "Cliente", text: "Caja de cartón, con libros." },
            { speaker: "Agente", text: "¿Cuánto pesa aproximadamente, en kilos?" },
            { speaker: "Cliente", text: "Un kilo." },
            { speaker: "Agente", text: "¿Cuál es el largo en centímetros?" },
            { speaker: "Cliente", text: "Treinta." },
            { speaker: "Agente", text: "¿Y el ancho?" },
            { speaker: "Cliente", text: "Veinte." },
            { speaker: "Agente", text: "¿Y el alto?" },
            { speaker: "Cliente", text: "Diez centímetros." },
            { speaker: "Agente", text: "¿Me proporciona la clave del producto del SAT? Si no la tiene, con gusto uso una clave genérica." },
            { speaker: "Cliente", text: "No la tengo." },
            { speaker: "Sistema", text: "GlpConsultarSucursalesOcurre valida dimensiones vs cap de sucursal → OK." },
            { speaker: "Agente", text: "Perfecto. Ahora los datos de destino. ¿Me proporciona la llave de cliente del destinatario?" },
            { speaker: "Cliente", text: "No tengo. La dirección es Calle Industrial dos, número catorce, Centro Sinaloa, código postal ocho cero cero cero cero, Culiacán." },
            { speaker: "Sistema", text: "GlpConsultarZona(CP=80000) → sin cortes." },
            { speaker: "Agente", text: "¿Me proporciona el nombre y teléfono del contacto de entrega?" },
            { speaker: "Cliente", text: "Pedro Díaz, cinco cinco cinco ocho seis cuatro nueve cero siete cero." },
            { speaker: "Agente", text: "¿La entrega será en el domicilio del destinatario, o prefiere que se recoja en sucursal?" },
            { speaker: "Cliente", text: "A domicilio." },
            { speaker: "Agente", text: "¿La forma de pago será en origen, flete por cobrar, por el solicitante, o por un tercero?" },
            { speaker: "Cliente", text: "En origen." },
            { speaker: "Agente", text: "¿Será en efectivo o por transferencia bancaria?" },
            { speaker: "Cliente", text: "Efectivo.", nota: "Se guarda PAID + N (NO-028, NO-029)." },
            { speaker: "Agente", text: "¿Cuál es el valor declarado del paquete, en pesos mexicanos?" },
            { speaker: "Cliente", text: "Mil pesos." },
            { speaker: "Agente", text: "Mil pesos, ¿es correcto?", nota: "Si cliente dijera > 50,000 aquí, corte y escalar (NO-032)." },
            { speaker: "Cliente", text: "Sí." },
            { speaker: "Agente", text: "¿Desea contratar cobertura adicional para el envío?" },
            { speaker: "Cliente", text: "No, sin seguro." },
            { speaker: "Agente", text: "¿Requiere algún servicio adicional? Por ejemplo, contra entrega, acuse de recibo, o ninguno." },
            { speaker: "Cliente", text: "Ninguno." },
            { speaker: "Agente", text: "¿Qué día y en qué horario le viene bien la recolección?" },
            { speaker: "Cliente", text: "Mañana cinco de octubre, por la mañana." },
            { speaker: "Sistema", text: "GlpCotizar(06600→80000, Paquete 30×20×10, 1kg, EAD=1, PAID) → Standard STD-T 696.61 MXN · GlpConsultarFechas(MEX14, CUL01, 05/10/2026) → ventana 10:00–18:30." },
            { speaker: "Sistema", text: "GlpCrearRecoleccion(docType=G, PAID+N, cliente=5619946, MEX14→CUL01, 05/10/2026, 696.61, EAD=1) → trackingNumber 21168675514." },
            { speaker: "Agente", text: "Listo. Su recolección quedó agendada y recibirá un correo electrónico con la confirmación. El número de rastreo es: dos uno uno, seis ocho seis, siete cinco, uno cuatro. ¿Le ayudo con algo más?", nota: "⚠️ M-1: verificar que el email realmente se dispara." },
            { speaker: "Cliente", text: "No, muchas gracias." },
          ],
          resultadoEsperado:
            "GLP crea recolección docType=G asociada al cliente 5619946, HIDALGO 10 → CALLE INDUSTRIAL 2, importe 696.61 MXN, PAID + N, fecha 05/10/2026, ventana 10:00–18:30. Agente lee el trackingNumber dígito por dígito y cierra ofreciendo otra recolección (reset_rad_full_state disponible).",
        },
        {
          id: "rad-prepago-01",
          flujo: "Prepago (RPP)",
          titulo: "RAD Prepago · agendamiento con guía prepagada única",
          descripcion:
            "El cliente ya tiene una guía prepagada emitida por volumen/frecuencia y solo necesita que un operador pase por el paquete. El flujo invoca BuscarGuia → DatesToCollection → RadCreate (docType=P). En RPP no se envían clave SAT, acuse ni COD. **Gap A-3: hoy no valida medidas vs. guía — Ola 3 lo arregla.**",
          precondiciones: [
            "Cliente verificado en Salesforce.",
            "El cliente tiene al menos un número de guía prepagada no agendada (ver 'siguiente número' en Datos de prueba).",
            "Mercancía permitida por la PAM.",
            "Las medidas que el cliente dicta coinciden con las de la guía (si no, PP-021 debería transferir — gap actual).",
          ],
          datosDePrueba: [
            { campo: "Guía prepagada no usada (siguiente)", valor: "13167470703 — rango disponible 13167470703 a 13167471693" },
            { campo: "Dos guías juntas (consecutivas)", valor: "13167470703|13167470704" },
            { campo: "Guías ya agendadas (NO re-agendar)", valor: "13167470700, 13167470701, 13167470702, 13167471000" },
            { campo: "Pago para pruebas", valor: "PAID + N (en prepago no se envían clave SAT, acuse ni COD)" },
            { campo: "Fechas que ya funcionaron en QA", valor: "07/10/2026, 08/10/2026, 09/10/2026, 12/10/2026 · ventana 10:00–18:30" },
            { campo: "Paquete de ejemplo", valor: "1 paquete, ropa, 1 kg, 30 x 20 x 10 cm · referencias quedan solo en la conversación" },
            ...DATOS_IDENTIFICACION.slice(0, 2),
            ...DATOS_DIRECCION_ORIGEN,
            ...DATOS_DIRECCION_DESTINO,
          ],
          conversacion: [
            { speaker: "Agente", text: "Hola, buen día. Soy el asistente virtual de Paquetexpress. Para ayudarle mejor, ¿me indica su nombre completo, por favor?" },
            { speaker: "Cliente", text: "Ana Torres López." },
            { speaker: "Agente", text: "¿Ana Torres López, es correcto?" },
            { speaker: "Cliente", text: "Sí." },
            { speaker: "Agente", text: "Gracias. Y para completar la validación, ¿me dicta su correo electrónico?" },
            { speaker: "Cliente", text: "a punto torres arroba empaques h b dos punto com." },
            { speaker: "Agente", text: "Gracias. Un momento mientras valido sus datos. ¿En qué le puedo ayudar hoy?" },
            { speaker: "Cliente", text: "Necesito agendar una recolección con guía prepagada." },
            { speaker: "Agente", text: "Claro. Primero, ¿qué contiene el paquete?", nota: "GE-001." },
            { speaker: "Cliente", text: "Ropa." },
            { speaker: "Agente", text: "Gracias. Antes de continuar, necesito confirmar que su envío cumple con nuestra política de aceptación de mercancía. ¿Podemos continuar con ese entendido?", nota: "GE-002." },
            { speaker: "Cliente", text: "Sí, confirmo." },
            { speaker: "Agente", text: "¿Su recolección es con guía prepagada, con guía documentada en línea, o es una recolección normal?", nota: "GE-003." },
            { speaker: "Cliente", text: "Con guía prepagada." },
            { speaker: "Agente", text: "Perfecto. ¿Me dicta el número de guía prepagada, por favor?" },
            { speaker: "Cliente", text: "Uno tres uno seis siete cuatro siete cero siete cero tres." },
            { speaker: "Agente", text: "Uno tres uno, seis siete cuatro, siete cero siete, cero tres. ¿Es correcto?", nota: "Readback dígito por dígito en bloques de tres." },
            { speaker: "Cliente", text: "Sí." },
            { speaker: "Sistema", text: "MOCK_GLP_BuscarGuia(13167470703) → found=True, voiceSummary='Guía a nombre de Ana Torres López, con ropa, un kilo, origen Hidalgo 10 Juárez, destino Calle Industrial 2 Culiacán.'" },
            { speaker: "Agente", text: "Guía a nombre de Ana Torres López, con ropa, un kilo, origen Hidalgo diez Juárez, destino Calle Industrial dos Culiacán. ¿Los datos son correctos?" },
            { speaker: "Cliente", text: "Sí." },
            { speaker: "Sistema", text: "MOCK_GLP_DatesToCollection → OPT_1 'mañana jueves siete de octubre, de nueve a once' · OPT_2 'viernes ocho de octubre, de diez a doce' · OPT_3 'sábado nueve de octubre, de ocho a diez'." },
            { speaker: "Agente", text: "Tengo disponible mañana jueves siete de octubre de nueve a once, viernes ocho de octubre de diez a doce, o sábado nueve de octubre de ocho a diez. ¿Cuál prefiere?" },
            { speaker: "Cliente", text: "La del viernes." },
            { speaker: "Sistema", text: "capture_rad_selected_option = OPT_2 → MOCK_GLP_RadCreate(13167470703, OPT_2) → trackingNumber 21168675515." },
            { speaker: "Agente", text: "Listo. Su recolección quedó agendada y recibirá un correo electrónico con la confirmación. El número de rastreo es: dos uno uno, seis ocho seis, siete cinco, uno cinco. ¿Le ayudo con algo más?" },
            { speaker: "Cliente", text: "No, gracias." },
          ],
          resultadoEsperado:
            "GLP crea la recolección asociada a la guía 13167470703 con docType=P, formaPago=PAID, tipoPago=N, ventana 08/10/2026 10:00–12:00. Agente comunica el trackingNumber dígito por dígito. La guía queda 'en uso' — si el cliente intenta re-agendarla, PP-037 corta ('esa guía ya no se puede agendar').",
        },
        {
          id: "rad-ww-01",
          flujo: "WW",
          titulo: "RAD WW · recolección para guía generada en línea con Case en Salesforce",
          descripcion:
            "El cliente generó la guía por su cuenta en el portal/app. **⚠️ Hallazgo C-2: hoy el Draft colapsa este flujo a escalación directa — solo da el aviso de 'no cajas de huevo' y transfiere.** Este escenario documenta cómo DEBE funcionar según WW-002 → WW-010 del Excel; es lo que la Ola 2 construye.",
          precondiciones: [
            "Cliente verificado en Salesforce.",
            "La guía ya fue generada en línea y aparece en SIPWEB vía GlpConsultarGuia.",
            "Mercancía permitida por la PAM; aviso 'no cajas de huevo' obligatorio.",
            "La dirección de recolección debe coincidir con la Dirección origen devuelta por la guía — cualquier cambio de plaza corta el flujo (WW-007).",
          ],
          datosDePrueba: [
            { campo: "Guía documentada en línea (solo consultar)", valor: "19168671204" },
            { campo: "Cliente registrado en la guía", valor: "BODEGA GARCIA (sin guías relacionadas)" },
            { campo: "Datos de ejemplo de envío", valor: "EAD · CP destino 66023 · peso 29.85 kg · medidas 72 x 50 x 40 cm · distancia 200 km" },
            { campo: "Rastreos ya creados (solo consultar, no agendar)", valor: "21168675514, 21168675515, 21168675516, 21168675517, 21168674207" },
            { campo: "Pago en SIPWEB", valor: "PAID y N" },
            { campo: "Contacto RAD de ejemplo", valor: "Juan Pérez López · ventana 10:00–14:00 · teléfono 8110000000" },
            ...DATOS_DIRECCION_ORIGEN,
          ],
          conversacion: [
            { speaker: "Agente", text: "Hola, buen día. Soy el asistente virtual de Paquetexpress. Para ayudarle mejor, ¿me indica su nombre completo, por favor?" },
            { speaker: "Cliente", text: "Juan Pérez López." },
            { speaker: "Agente", text: "¿Juan Pérez López, es correcto?" },
            { speaker: "Cliente", text: "Sí." },
            { speaker: "Agente", text: "Gracias. ¿Me dicta su correo electrónico?" },
            { speaker: "Cliente", text: "j punto perez arroba bodega garcia punto com." },
            { speaker: "Agente", text: "Gracias. Un momento mientras valido sus datos. ¿En qué le puedo ayudar hoy?" },
            { speaker: "Cliente", text: "Quiero agendar una recolección; ya documenté la guía en línea." },
            { speaker: "Agente", text: "Claro. Primero, ¿qué contiene el paquete?" },
            { speaker: "Cliente", text: "Ropa." },
            { speaker: "Agente", text: "¿Confirma que su envío cumple con nuestra política de aceptación de mercancía?" },
            { speaker: "Cliente", text: "Sí." },
            { speaker: "Agente", text: "¿Su recolección es con guía prepagada, con guía documentada en línea, o es una recolección normal?" },
            { speaker: "Cliente", text: "Con guía documentada en línea." },
            { speaker: "Agente", text: "Le pido de favor no usar cartones de huevo como empaque. ¿Cuál es el número de guía o de rastreo?", nota: "WW-001 + WW-002." },
            { speaker: "Cliente", text: "Uno nueve uno seis ocho seis siete uno dos cero cuatro." },
            { speaker: "Agente", text: "Uno nueve uno, seis ocho seis, siete uno dos, cero cuatro. ¿Es correcto?" },
            { speaker: "Cliente", text: "Sí." },
            { speaker: "Sistema", text: "GlpConsultarGuia(19168671204) → éxito=True, BODEGA GARCIA, servicio EAD, Hidalgo 10 Juárez, CP destino 66023, 29.85 kg, 72×50×40 cm, distancia 200 km. (WW-003)" },
            { speaker: "Agente", text: "La guía está a nombre de BODEGA GARCIA, con origen en Hidalgo diez Juárez, destino al código postal seis seis cero dos tres, peso veintinueve con ochenta y cinco kilos, medidas setenta y dos por cincuenta por cuarenta centímetros. ¿Los datos son correctos?", nota: "WW-004." },
            { speaker: "Cliente", text: "Sí, son correctos." },
            { speaker: "Agente", text: "¿La recolección es en Hidalgo diez, Juárez, código postal cero seis seis cero cero?", nota: "WW-005." },
            { speaker: "Cliente", text: "Sí, en esa dirección." },
            { speaker: "Agente", text: "Para coordinar al operador, ¿me proporciona el nombre completo de contacto en la recolección?", nota: "WW-006." },
            { speaker: "Cliente", text: "Juan Pérez López." },
            { speaker: "Agente", text: "¿En qué ventana horaria lo esperamos?" },
            { speaker: "Cliente", text: "De diez a dos de la tarde." },
            { speaker: "Agente", text: "¿Me confirma su teléfono de contacto?" },
            { speaker: "Cliente", text: "Ocho uno, uno cero, cero cero, cero cero, cero cero." },
            { speaker: "Agente", text: "Ocho uno, uno cero, cero cero, cero cero, cero cero. ¿Es correcto?" },
            { speaker: "Cliente", text: "Sí." },
            { speaker: "Sistema", text: "WW-007: flow autolanzado Create_case_RAD_WW crea Case 00001234 con guía, dirección, contacto. WW-008: Email Alert dispara correo a sucursal MEX14 con los datos de la recolección." },
            { speaker: "Agente", text: "Listo. Su solicitud quedó registrada con el número de caso cero cero cero uno dos tres cuatro, y el equipo de recolección fue notificado. ¿Le ayudo con algo más?" },
            { speaker: "Cliente", text: "No, gracias." },
          ],
          resultadoEsperado:
            "GlpConsultarGuia(19168671204) confirma la guía. Se crea un Case en Salesforce (origen WW) y se envía un correo a la sucursal RAD de origen con los datos de contacto, dirección y ventana horaria. NO se crea un nuevo trackingNumber en GLP: el número a comunicar al cliente, cuando WW-007 esté construido, será el número de Case. **Hoy el Draft solo da el aviso y escala — ver Ola 2 del plan.**",
        },
      ],
    },
    {
      id: "customer_verification",
      number: 3,
      name: "Verificación del Cliente",
      developerName: "Customer_Verification_16j1dade3eb0b10",
      category: "Entrada y verificación",
      estado: "Implementado · Draft",
      descripcion:
        "Gate de identidad obligatorio antes de abrir cualquier subagente de dominio. Captura nombre + apellido + correo. Ejecuta `AG_Get_and_create_contact` para buscar o crear el Contact y setea `isVerified`, `verifiedContactId`, `contactRecord`. Guarda `pendingIntent` (incluye 'RAD') para retomar el subagente correcto post-verificación. **Gap vs Active V14 (C-3):** este Draft NO pide teléfono ni usa isExistingContact — Ola 0 lo porta.",
      activacion: "Al inicio de la conversación, o cuando cualquier subagente detecta isVerified != True.",
      respuestas:
        "Regla de dos turnos: primero nombre completo, luego correo. Readback silábico para el correo. Al capturar los datos responde 'Gracias. Un momento mientras valido sus datos. Mientras tanto, ¿en qué le puedo ayudar hoy?'",
      acciones: [
        { name: "capture_customer_details", target: "@utils.setVariables" },
        { name: "capture_pending_intent", target: "@utils.setVariables", description: "Valores: Quote, Order, Case, GeneralInfo, JobBranch, Escalation, **RAD**." },
        { name: "AG_Get_and_create_contact", target: "flow://AG_Get_and_create_contact" },
      ],
      criterios: [
        "Dado que el cliente dicta nombre y correo, cuando ambos están capturados, entonces el flow verifica/crea el contacto y setea isVerified = True.",
        "Dado que la verificación aún no termina, cuando el agente responde, entonces NO confirma al cliente que ya está verificado.",
      ],
    },
    {
      id: "quote_management",
      number: 4,
      name: "Gestión de Cotización",
      developerName: "Quote_Management_16j9427bc776003",
      category: "Cotización",
      estado: "Implementado · Draft",
      descripcion:
        "Clasifica el envío como Domestic o International. Para Domestic recorre el cuestionario determinista. Para International crea caso + ofrece transferir. **Gap vs Active V14 (C-3):** en el Draft la rama internacional vive dentro de este subagente — en el Active V14 se separó en International_Quote_Management; Ola 0 lo porta. También incluye un capture_pending_intent_quote_to_rad para pivotar al subagente RAD cuando quoteRAD == 'Yes' y el cliente acepta.",
      activacion: "pendingIntent == 'Quote' o palabras clave (cotizar, cotización, precio, tarifa).",
      respuestas: "Pregunta-por-pregunta determinista: CP origen → CP destino → tipo → dimensiones → RAD → EAD → IVPF → importe. Al obtener la tarifa comparte quoteResult sin inventar números.",
      acciones: [
        { name: "capture_shipment_classification", target: "@utils.setVariables" },
        { name: "capture_cp_origen / capture_cp_destino / capture_tipo / capture_peso / capture_largo / capture_ancho / capture_alto / capture_rad / capture_ead / capture_ivpf / capture_amt", target: "@utils.setVariables" },
        { name: "capture_pending_intent_quote_to_rad", target: "@utils.setVariables", description: "Post-cotización: si quoteRAD = Yes y el cliente acepta → pendingIntent = 'RAD'." },
        { name: "Obtener_Cotizaci_n_Paqueteria_V2", target: "flow://Obtener_Cotizaci_n_Paqueter_a" },
        { name: "Crea_caso_cotizacion_nacional_v2", target: "flow://Crea_caso_cotizacion_nacional" },
        { name: "Crea_caso_cotizacion_internacional_v2A", target: "flow://Crea_caso_cotizacion_internacional" },
      ],
      criterios: [
        "Dado que quoteRAD == 'Yes' y la cotización ya se compartió, cuando el cliente acepta agendar, entonces pendingIntent='RAD' y transiciona a RAD_Management_voice.",
      ],
    },
    {
      id: "orden_management",
      number: 5,
      name: "Gestión de Órdenes",
      developerName: "Orden_Management_16je7f3f3223af5",
      category: "Rastreo y envíos",
      estado: "Implementado · Draft",
      descripcion:
        "Rastrea envíos usando el número de guía o rastreo. Captura con capture_tracking_number, consulta con PE_GetOrderStatus. Crea caso de seguimiento automático.",
      activacion: "pendingIntent == 'Order' o palabras clave (rastreo, guía, estatus).",
      respuestas: "Readback dígito por dígito en voice. Comparte el OutpoutMessage devuelto sin inventar.",
      acciones: [
        { name: "capture_tracking_number", target: "@utils.setVariables" },
        { name: "Obtener_estatus_de_la_orden", target: "flow://PE_GetOrderStatus" },
        { name: "Crea_caso_seguimiento_de_una_orden_v2A", target: "flow://Crea_caso_seguimiento_de_una_orden" },
      ],
      criterios: [
        "Dado que PE_GetOrderStatus devuelve OutpoutMessage, cuando el agente responde, entonces lo comparte literal — nunca inventa estado.",
      ],
    },
    {
      id: "case_management",
      number: 6,
      name: "Gestión de Casos",
      developerName: "CaseManagement_v2_16jf9db4b526803",
      category: "Casos y escalamiento",
      estado: "Implementado · Draft",
      descripcion:
        "Consulta por número, lista todos los casos del contacto, comentarios y creación de nuevos casos (reclamación explícita). Captura caseSubject (<7 palabras) + caseDescription (≤3 oraciones). Nunca comparte CaseId.",
      activacion: "pendingIntent == 'Case' o solicitud explícita de levantar caso.",
      respuestas: "Al crear caso: 'Gracias por compartir su información; su caso ha sido registrado con el número de caso: [case number]. Dentro de las próximas 24 horas su caso será atendido.'",
      acciones: [
        { name: "capture_case_details", target: "@utils.setVariables" },
        { name: "GetCaseByCaseNumber_1792c1c327ab424", target: "flow://SvcCopilotTmpl__GetCaseByCaseNumber" },
        { name: "GetAllCasesForContact", target: "flow://SvcCopilotTmpl__GetCasesForContact" },
        { name: "AddCaseComment_179e67ef5aa18da", target: "flow://SvcCopilotTmpl__AddCaseComment" },
        { name: "Crea_caso_solicitud_de_servicio_v2A", target: "flow://Crea_caso_solicitud_de_servicio" },
      ],
      criterios: [
        "Dado que caseCreated == True, cuando el agente responde, entonces usa la plantilla estándar y comunica el CaseNumber — nunca el ID interno.",
      ],
    },
    {
      id: "general_information",
      number: 7,
      name: "Gestión de Información General",
      developerName: "General_Information_Management_16jeb86fca18701",
      category: "Información y servicios",
      estado: "Implementado · Draft",
      descripcion:
        "FAQs predefinidas (identificaciones, formas de pago, frontera, OCURRE, RAD requisitos, proceso envío). Captura la pregunta y crea Case 'Consulta de información general'. En voice no lee URLs.",
      activacion: "pendingIntent == 'GeneralInfo' o pregunta informativa que no requiere cuenta.",
      respuestas: "Texto fijo por FAQ. Si no cae en texto fijo, FAQ_Search sobre Knowledge.",
      acciones: [
        { name: "capture_faq_question", target: "@utils.setVariables" },
        { name: "Create_case_Agent_paquete_v2", target: "flow://Create_case_Agent_paquete" },
        { name: "FAQ_Search", target: "generatePromptResponse://FAQ_Search" },
      ],
      criterios: [
        "Dado que la pregunta coincide con una FAQ predefinida, cuando el agente responde, entonces devuelve el texto exacto y nada más.",
      ],
    },
    {
      id: "job_search",
      number: 8,
      name: "Información de Empleo/Sucursales",
      developerName: "Job_Search_16jfb5eb38adcd9",
      category: "Información y servicios",
      estado: "Implementado · Draft",
      descripcion: "Sucursales (URL /sucursales) o vacantes (portal Pandape). Captura jobBranchType = 'Branch' | 'Job'.",
      activacion: "pendingIntent == 'JobBranch' o pregunta por sucursales/empleo.",
      respuestas: "Texto predefinido + URL. Crea caso automático según tipo.",
      acciones: [
        { name: "capture_job_branch_type", target: "@utils.setVariables" },
        { name: "Crea_caso_b_squeda_de_empleo_v2A", target: "flow://Crea_caso_b_squeda_de_empleo" },
        { name: "Crea_caso_ver_sucursales_v2A", target: "flow://Crea_caso_ver_sucursales" },
      ],
      criterios: [
        "Dado que el cliente pregunta por sucursales, cuando el agente responde, entonces registra 'Branch' y el caso se crea solo.",
      ],
    },
    {
      id: "escalation",
      number: 9,
      name: "Escalamiento",
      developerName: "Escalation_v2_16j6b2f5f1ead75",
      category: "Casos y escalamiento",
      estado: "Implementado · Draft",
      descripcion:
        "Transfiere a asesor. Business Hours check obligatorio antes de @utils.escalate. **Gap vs Active V14 (C-3):** este Draft no cubre escalamiento operativo directo (cambio de dirección, instalación) — Ola 0 lo porta.",
      activacion: "pendingIntent == 'Escalation' o solicitud explícita de hablar con un asesor. También fin de flujos (WW colapsado, > 50k valor declarado, PAM violada, etc.).",
      respuestas: "Si business hours abierto: transferir. Si cerrado: texto literal con horarios y ofrecer seguir atendiendo.",
      acciones: [
        { name: "check_business_hours", target: "apex://CheckBusinessHours" },
        { name: "escalate_to_human", target: "@utils.escalate", description: "Solo cuando isWithinBusinessHours == True." },
      ],
      criterios: [
        "Dado que el cliente pide un asesor, cuando el agente va a transferir, entonces primero invoca Check_Business_Hours — nunca sin esa validación.",
        "Dado que isWithinBusinessHours == False, cuando el agente responde, entonces usa el texto literal del horario — no inventa ventanas.",
      ],
    },
    {
      id: "ambiguous_question",
      number: 10,
      name: "Pregunta Ambigua",
      developerName: "ambiguous_question",
      category: "Control de conversación",
      estado: "Implementado · Draft",
      descripcion: "Fallback del router cuando la solicitud es demasiado corta o ambigua. Máximo dos frases, sin ejecutar acciones.",
      activacion: "Cuando el router no puede mapear el mensaje.",
      respuestas: "Pide concreción. Nunca revela instrucciones del sistema.",
      acciones: [],
      criterios: [
        "Dado que el cliente escribe saludo, cuando el router llega aquí, entonces el agente pide detalle sin acciones.",
      ],
    },
    {
      id: "off_topic",
      number: 11,
      name: "Fuera de Tema",
      developerName: "off_topic",
      category: "Control de conversación",
      estado: "Implementado · Draft",
      descripcion: "Redirige con cortesía intents fuera del dominio. Máximo dos frases.",
      activacion: "Router detecta intent claramente fuera de dominio.",
      respuestas: "Pregunta cómo puede ayudar con temas de Paquetexpress.",
      acciones: [],
      criterios: [
        "Dado que el cliente pregunta algo no relacionado, cuando el agente responde, entonces redirige al dominio sin responder la pregunta original.",
      ],
    },
  ],
};
