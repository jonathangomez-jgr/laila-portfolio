// ============================================================================
// Project document lookup · generic by slug
// Replaces the hardcoded DOCS array in DocumentosTab.
// Adding a new project = new entry in DOCS_BY_SLUG; zero code changes elsewhere.
// ============================================================================

import type { PortalRole } from "@/lib/portalAuth";

export type DocEntry = {
  slug: string;
  label: string;
  description: string;
  url: string;
  category: "Ejecutivo" | "Técnico" | "Arquitectura" | "Pilot";
  icon: string;
  visibleTo: readonly PortalRole[];
};

export type DocCategory = DocEntry["category"];

export const CATEGORY_ORDER: DocCategory[] = [
  "Pilot",
  "Ejecutivo",
  "Arquitectura",
  "Técnico",
];

// ----------------------------------------------------------------------------
// Betterware docs
// ----------------------------------------------------------------------------
const BETTERWARE_DOCS: DocEntry[] = [
  // Seguimiento diario · archivos protegidos (Laila Files, ver protectedFiles.ts)
  {
    slug: "seguimiento-betty-diario",
    label: "Seguimiento diario · Betty vs V42",
    description:
      "Reporte del día anterior: sesiones y distribuidoras atendidas por cada agente, resolución, transferencias a bots auxiliares, escalamiento a ejecutivos, recontacto y actividad del programa Insiders. Se actualiza todos los días.",
    url: "/api/portal/files/betterware-seguimiento-diario-pdf",
    category: "Pilot",
    icon: "📈",
    visibleTo: ["Salesforce", "Client"],
  },
  {
    slug: "seguimiento-betty-diario-xlsx",
    label: "Seguimiento diario · detalle (Excel)",
    description:
      "Detalle por sesión del día anterior: agente, ruta, destino, escalamiento, recontacto y encuesta. Teléfonos enmascarados.",
    url: "/api/portal/files/betterware-seguimiento-diario-xlsx",
    category: "Pilot",
    icon: "📊",
    visibleTo: ["Salesforce", "Client"],
  },
  {
    slug: "seguimiento-betty-consolidado",
    label: "Seguimiento consolidado · desde la salida con Insiders",
    description:
      "Acumulado desde el 22 de octubre: participación de Betty día a día, efectividad por destino, top 10 de distribuidoras, Insiders sin uso de Betty y altas y bajas del programa. Se actualiza todos los días.",
    url: "/api/portal/files/betterware-seguimiento-consolidado-pdf",
    category: "Pilot",
    icon: "📈",
    visibleTo: ["Salesforce", "Client"],
  },
  {
    slug: "seguimiento-betty-consolidado-xlsx",
    label: "Seguimiento consolidado · detalle (Excel)",
    description:
      "Todas las sesiones de ambos agentes desde la salida con Insiders, más las hojas de destinos, rutas, top 10, Insiders sin Betty y altas y bajas.",
    url: "/api/portal/files/betterware-seguimiento-consolidado-xlsx",
    category: "Pilot",
    icon: "📊",
    visibleTo: ["Salesforce", "Client"],
  },
  {
    slug: "remediaciones-betty-v37",
    label: "Remediaciones atendidas · Betty v37",
    description:
      "Snapshot del cierre técnico aplicado al agente antes de iniciar la nueva ronda de pruebas. Cubre el cierre de F02/F03 del EVAL-000012, las 7 remediaciones del EVAL-000013, los componentes propios con prefijo FDE_ creados o extendidos, el hallazgo técnico sobre URLs con JWT y el checklist canónico para probar cada escenario. 6 páginas.",
    url: "/Customers/Betterware/files/remediaciones_v37.pdf",
    category: "Pilot",
    icon: "🧪",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "condiciones-betty-v28",
    label: "Condiciones del Agente · Betty v28",
    description:
      "Documento oficial del estado del agente al momento de la aceptación. Arquitectura, reglas duras globales, capacidades por subagente, mejoras funcionales incluidas en v28 y riesgos conocidos aceptados para el release. 7 páginas.",
    url: "/Customers/Betterware/files/Condiciones_Betty_v28.pdf",
    category: "Pilot",
    icon: "📘",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "gaps-v42-vs-betty-v28",
    label: "Análisis Comparativo · Gaps V42 vs Betty v28",
    description:
      "Transparencia sobre divergencias intencionales respecto a V42 productivo. 9 fichas que explican qué hace V42, qué hace Betty v28, por qué divergimos y el beneficio para el distribuidor. Clasificación por tipo: mejora funcional, equivalente, paridad. 8 páginas.",
    url: "/Customers/Betterware/files/Gaps_V42_vs_Betty_v28.pdf",
    category: "Pilot",
    icon: "🔍",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "backlog-cliente-betty-v28",
    label: "Backlog Abierto · Preguntas para Betterware",
    description:
      "6 fichas de temas pendientes que requieren decisión o respuesta de Betterware. Cada ficha trae descripción, nuestra propuesta y una pregunta explícita destacada. Incluye temas pre-cutover (bloqueantes para pilot) y post-cutover (optimizaciones). 8 páginas.",
    url: "/Customers/Betterware/files/Backlog_Cliente_Betty_v28.pdf",
    category: "Pilot",
    icon: "📋",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "deck-golive-insiders-22oct",
    label: "Deck · Go-Live Insiders · 22-oct",
    description:
      "Presentación ejecutiva del arranque del Programa Insiders con Betty v38. 6 slides: resumen en números (11 subagentes · 50 acciones · 38% ya son FDE propias · 22 Insiders), confirmación de la firma consolidada EVAL-000021 con cumplimiento por severidad y firmantes, lista completa de Insiders con nombre y código de Distribuidor, próximos pasos (monitoreo + evaluación lunes 26-oct para subir flujo al 20%), cierre.",
    url: "/Customers/Betterware/files/Deck_GoLive_Insiders_22oct.pdf",
    category: "Pilot",
    icon: "🚀",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "matriz-escalamientos-v42-vs-betty-v28",
    label: "Matriz de Escalamientos · V42 vs Betty v28",
    description:
      "Referencia operativa que inventaría cada escenario de escalamiento del agente productivo V42 y lo contrasta uno a uno contra Betty v28. Para cada escenario declara tipo (ofrecido · silencioso · forzado · condicional), precondiciones, destino final (humano o bot) y cita literal del instruction origen. Incluye top 10 brechas priorizadas y resumen ejecutivo. 11 páginas.",
    url: "/Customers/Betterware/files/Matriz_Escalamientos_V42_vs_Betty_v28.pdf",
    category: "Pilot",
    icon: "🔀",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "snapshot-semanal-2026-10-23",
    label: "Snapshot Semanal · Viernes 23-oct",
    description:
      "Reporte ejecutivo de 1 página con el estado del agente al cierre de la semana del 19 al 23 de octubre. Salida con Insiders, aceptación formal de Betterware, 10 versiones de mejora y app Seguimiento Betty · próximo hito: escalada al 20% el Lun 26-oct · gauge del Reporte de Descubrimientos. Formato institucional Salesforce FDE · cadencia Viernes.",
    url: "/Customers/Betterware/files/Snapshot_Viernes_2026_10_23.pdf",
    category: "Ejecutivo",
    icon: "📊",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "snapshot-viernes-16-oct",
    label: "Snapshot Semanal · Viernes 16-oct",
    description:
      "Reporte ejecutivo de 1 página con el estado del agente al cierre de la semana del 12 al 16 de octubre. Progreso de fase actual, Etapa 1 (Eficacia) y global · entregables de la semana · valor para el negocio · gauge radial con avance del Reporte de Descubrimientos (110 hallazgos). Formato institucional Salesforce FDE · cadencia Viernes.",
    url: "/Customers/Betterware/files/Snapshot_Viernes_2026_10_16.pdf",
    category: "Ejecutivo",
    icon: "📊",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "presentacion-kickoff",
    label: "Presentación · Kick-off CS (compartida con Jafra)",
    description:
      "Deck del kick-off ejecutivo del martes 2026-10-07. Compartido Betterware + Jafra. Squad Salesforce + Partner Capptus, organigrama y timeline conjunto del piloto.",
    url: "/Customers/Betterware/files/Presentacion_Kickoff_Betterware.html",
    category: "Ejecutivo",
    icon: "🎤",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "programa-insiders",
    label: "Programa Insiders · Betty",
    description:
      "Narrativa del pilot con 15–25 distribuidores. Cutover 2026-10-16. Tono business.",
    url: "/Customers/Betterware/files/Programa_Insiders_Betty.pdf",
    category: "Pilot",
    icon: "📘",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "notificacion-habilitacion-v2",
    label: "Notificación · Habilitación del Agente V2",
    description:
      "Por qué trabajamos excepcionalmente en producción, cómo se identifica a los Insiders con el campo FDE_Insider__c, y cómo opera el ruteo entre el agente nuevo y el Legacy.",
    url: "/Customers/Betterware/files/Notificacion_Habilitacion_Agente_V2.pdf",
    category: "Pilot",
    icon: "🚦",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "presentacion-partner",
    label: "Presentación · Partner + Betterware",
    description: "Deck del kickoff. 10 slides. Horizontal.",
    url: "/Customers/Betterware/files/Presentacion_Partner_FDE.html",
    category: "Ejecutivo",
    icon: "🎯",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "estrategia-recomendada",
    label: "Estrategia FDE recomendada",
    description: "Resumen del plan de ejecución y decisiones de diseño.",
    url: "/Customers/Betterware/files/FDE_Estrategia_Recomendada.html",
    category: "Ejecutivo",
    icon: "🧭",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "reporte-descubrimientos",
    label: "Reporte de descubrimientos · BW_AGENT_N",
    description:
      "16 hallazgos del agente actual, verificados contra la org.",
    url: "/Customers/Betterware/files/BW_AGENT_N%20%E2%80%94%20Reporte%20de%20descubrimientos.pdf",
    category: "Técnico",
    icon: "🧪",
    visibleTo: ["Salesforce", "Partner"],
  },
  {
    slug: "reporte-remediaciones",
    label: "Reporte de remediaciones · Betty",
    description:
      "Avance del audit: 7 resueltos en V42 producción, 10 completados en V2, 25 fixes nuevos, 6 al roadmap.",
    url: "/Customers/Betterware/files/Reporte_Remediaciones_Betty.pdf",
    category: "Ejecutivo",
    icon: "✅",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "reporte-observaciones",
    label: "Reporte de observaciones · Betterware",
    description:
      "Tracker consolidado: 40 ajustes pendientes (24 observaciones técnicas + 16 de plataforma) y 136 modificaciones (82% cerradas).",
    url: "/Customers/Betterware/files/Reporte_Observaciones_Betterware.pdf",
    category: "Ejecutivo",
    icon: "📊",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "reporte-cobertura-v42",
    label: "Cobertura V42 en el agente nuevo",
    description:
      "Punto por punto de los 17 cambios liberados en V42 entre 29-sep y 07-oct, con el estado de cada uno en Betty V2. Cobertura 100%.",
    url: "/Customers/Betterware/files/Reporte_Cobertura_Cambios_V42.pdf",
    category: "Ejecutivo",
    icon: "🔄",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "agent-deep-dive",
    label: "BW_AGENT_N · Agent Deep Dive (sesión 2)",
    description: "Workshop técnico sobre el agente actual.",
    url: "/Customers/Betterware/BW_AGENT_N-Agent-Deep-Dive-Sesion-2.pdf",
    category: "Técnico",
    icon: "🔬",
    visibleTo: ["Salesforce", "Partner"],
  },
  {
    slug: "req-servicenow-distribuidor-code",
    label: "Requerimiento · Exposición del Distribuidor dueño en ServiceNow",
    description:
      "Requerimiento técnico de integración sobre el endpoint MuleSoft `/api/tickets/incident`. Documenta la observación de que el response actual no expone un campo que identifique al Distribuidor titular del ticket, bloqueando la validación de pertenencia (propio · hija · nieta) en Betty. Incluye evidencia del response real, análisis de por qué sys_created_by no resuelve el caso, 3 caminos técnicos candidatos para exponer el campo y el comportamiento esperado tras el ajuste. 7 páginas.",
    url: "/Customers/Betterware/files/Requerimiento_ServiceNow_DistribuidorCode.pdf",
    category: "Técnico",
    icon: "🔌",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "reporte-remediacion-eval12",
    label: "Reporte de remediación · EVAL-000012 (v2)",
    description:
      "Reporte de cierre del trabajo de remediación sobre los 12 findings marcados como 'no cumple' en el EVAL-000012 del 20-OCT-2026. Resume por finding la causa raíz identificada, el fix aplicado y la validación realizada. Incluye estado final (10 resueltos · 3 en espera de terceros), inventario de entregables técnicos (6 clases Apex nuevas, 7 ajustes al bundle v34 activo, 3 documentos publicados), 6 observaciones generales de estilo y tono surgidas durante las pruebas (nuevas en v2) y agenda de siguientes pasos. 7 páginas.",
    url: "/Customers/Betterware/files/Reporte_Remediacion_EVAL-000012.pdf",
    category: "Pilot",
    icon: "📊",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
];

// ----------------------------------------------------------------------------
// Jafra · Janet v2 docs
// ----------------------------------------------------------------------------
const JAFRA_DOCS: DocEntry[] = [
  {
    slug: "deep-dive-deck",
    label: "Deck ejecutivo · Deep-dive 9-oct · Janet v2.1 a live",
    description:
      "Deck de la sesión de trabajo del vie 2026-10-09 con JAFRA México. Base propuesta Janet v2.1 (V42) = V41 + paquete V2 con valores de prod + 6 ediciones. Cifras AA-30d prod (31,001 sesiones), 5 hallazgos con fuente, criterios go/no-go G1-G8 y plan de 4 pasos para la próxima semana. 24 slides interactivos.",
    url: "/Customers/Jafra/files/janet-jafra-deck/index.html",
    category: "Ejecutivo",
    icon: "🎤",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "dossier-ejecutivo",
    label: "Dossier ejecutivo · Deep-dive 9-oct (PDF)",
    description:
      "Documento fuente de verdad post-deep-dive: cifras del tablero (Agent Analytics 30 días, 9-sep a 9-oct 2026), configuración de prod y sandbox, cambios de V41 con línea del script, 5 hallazgos con fuente y plan para la próxima semana con criterios go/no-go. 21 páginas, nivel A/B/C de evidencia por afirmación.",
    url: "/Customers/Jafra/files/Janet-JAFRA-Dossier-Ejecutivo.pdf",
    category: "Ejecutivo",
    icon: "📘",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "presentacion-kickoff",
    label: "Presentación · Kick-off (compartida con Betterware)",
    description:
      "Deck del kick-off ejecutivo del martes 2026-10-07. Compartido Jafra + Betterware. Squad Salesforce + Partner Capptus, organigrama y timeline conjunto.",
    url: "/Customers/Betterware/files/Presentacion_Kickoff_Betterware.html",
    category: "Ejecutivo",
    icon: "🎤",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "conociendo-agente",
    label: "Conociendo a Janet · agente actual",
    description:
      "Documento interno con la ficha del agente Jafra_Agentforce en producción. Tono comercial. Documento histórico — las cifras actuales viven en el dossier del 9-oct.",
    url: "/Customers/Jafra/files/Conociendo-a-nuestro-agente.html",
    category: "Técnico",
    icon: "📘",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
];

// ----------------------------------------------------------------------------
// Telasist · Voice AI · Retención Invex TDC docs
// ----------------------------------------------------------------------------
const TELASIST_RETENCION_DOCS: DocEntry[] = [
  {
    slug: "reporte-pruebas-ronda0",
    label: "Reporte de Pruebas · Ronda 0 (línea base v8)",
    description:
      "Resultados del 27-oct. 7 páginas. 48 conversaciones con acciones reales en el sandbox: 27 casos de mecánica sobre la v8 activa y 21 escenarios difíciles de retención sobre un build con mitigaciones. Rúbrica de supervisor, causa y mitigación del bloqueo de identidad, 46 hallazgos priorizados (5 críticos) y lo que corrige la v9.",
    url: "/Customers/Telasist/files/Reporte_Pruebas_Ronda0_Invex_TDC.pdf",
    category: "Pilot",
    icon: "🧪",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "reporte-semanal-2026-10-29",
    label: "Reporte Semanal · Semana 3 (26 al 30 oct)",
    description:
      "8 páginas. v9 activa y v10 en borrador; escritura del caso y lectura de la cuenta corregidas (una cancelación sin saldo ya sale CC); catálogo de la Knowledge cargado; lo que ya hace el agente en pruebas; avance del plan, bloqueantes (filtro de contenido, voz en sandbox, definiciones de Invex) y decisiones para el corte del 30-oct.",
    url: "/Customers/Telasist/files/Reporte_Semanal_Invex_Retencion_TDC_2026-10-29.pdf",
    category: "Ejecutivo",
    icon: "🗓️",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "agenda-corte-definiciones-2026-10-30",
    label: "Agenda · Corte de definiciones (30-oct)",
    description:
      "6 páginas. 19 decisiones abiertas de Invex, Telasist Operación y Telasist IT, cada una con opciones, dueño, actividad del plan y el supuesto por defecto que se configurará detrás de un interruptor si no se decide; compromisos del Equipo FDE Salesforce.",
    url: "/Customers/Telasist/files/Agenda_Corte_Definiciones_Invex_TDC_2026-10-30.pdf",
    category: "Ejecutivo",
    icon: "📋",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "playbook-retencion",
    label: "Playbook de Retención · Cuentas Especiales (v1.0)",
    description:
      "Guía de supervisor para ejecutivos y el agente de voz. 27 páginas. Clasificar en los primeros 30 segundos, escucha activa y empatía en voz, mapa de motivos, escalera de negociación por perfil, biblioteca de objeciones, reglas de paro y salida digna, guardarraíles regulatorios y de la Cédula v10, y 32 escenarios difíciles. Para validar con supervisores de Telasist el 30-oct.",
    url: "/Customers/Telasist/files/Playbook_Retencion_Invex_TDC.pdf",
    category: "Ejecutivo",
    icon: "🎯",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "guia-maestra-invex-retencion",
    label: "Guía Maestra · Invex Retención TDC (v1)",
    description:
      "Libro de estudio para el Equipo FDE Salesforce y el partner TS4/Skala (26-oct). 226 páginas, 23 capítulos, 16 diagramas. Banco Invex y sus tarjetas de marca compartida, regulación mexicana de cancelación, operación humana de retención en Telasist, la retención a fondo (motivos, catálogo de beneficios, matriz y elegibilidad, folios y tipificación, 7 casos narrados), el agente de voz v8, historia del proyecto y el replan al 12-nov. Glosario con estado de confirmación y trazabilidad a DM/INV.",
    url: "/Customers/Telasist/files/Invex_Retencion_TDC_Guia_Maestra_Negocio_y_Agentforce.pdf",
    category: "Arquitectura",
    icon: "📘",
    visibleTo: ["Salesforce", "Partner"],
  },
  {
    slug: "reporte-semanal-2026-10-22",
    label: "Reporte Semanal · Semana 2 (19 al 23 oct)",
    description:
      "Actividades de la semana y conciliación de la sesión de capacitación de Telasist (20-oct) contra el agente v7 y los datos reales de QA y PROD. 8 páginas. Qué valida el ejecutivo vs qué lee el agente, Custom Data y tipificaciones generales, folio, comentarios de trámite, 12 ajustes en la escritura al caso, 21 pendientes de negocio con dueño y plan de la semana 3.",
    url: "/Customers/Telasist/files/Reporte_Semanal_Invex_Retencion_TDC_2026-10-22.pdf",
    category: "Ejecutivo",
    icon: "🗓️",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "mapa-datos-agente-v7",
    label: "Mapa de datos del agente v7 · qué consulta y dónde registra",
    description:
      "Revisión de solo lectura del agente AF_Voice_Invex_Retenciones_TDC v7 en el sandbox QA (20-oct). 8 páginas. Cada lectura y escritura en Salesforce por etapa de la llamada: búsqueda y validación del tarjetahabiente, memoria entre llamadas, Custom Metadata, campos del Case al cerrar, resultado de las 6 pruebas del 16-oct, 12 desajustes por prioridad, cobertura del contrato del Discovery Brief §7 y 7 preguntas para el equipo.",
    url: "/Customers/Telasist/files/Agente_Invex_Datos_Consulta_y_Registro.pdf",
    category: "Técnico",
    icon: "🗺️",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "plan-estado-agente",
    label: "Plan de Estado · Agente de Voz Invex Retención TDC",
    description:
      "Fotografía al 19-oct del agente AF_Voice_Invex_Retenciones_TDC v7 en el sandbox. 10 páginas. Qué hace hoy el agente en lenguaje de negocio, inventario verificado contra la org (15 clases Apex productivas + 4 de prueba, 48 variables tipadas, 3 diálogos), línea base operativa, plan por 8 etapas con responsables, bloqueantes duros y 7 pendientes del Manual v2.0.",
    url: "/Customers/Telasist/files/Plan_Estado_Agente_Invex_Retencion_TDC.pdf",
    category: "Pilot",
    icon: "🧭",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "presentacion-arranque",
    label: "Presentación · Sesión de arranque Telasist × Skala × Invex",
    description:
      "Deck ejecutivo de la sesión del 12-oct. 10 slides horizontales con brand Salesforce. Cubre: contexto de la campaña (~930 llamadas/día), estado F1 (14/17 completas en 4 días), los dos agentes del sandbox, timeline F0→F4, qué necesitamos de cada parte, RACI y portal walkthrough. Abre como presentación horizontal.",
    url: "/Customers/Telasist/files/Presentacion_Arranque_Telasist.html",
    category: "Ejecutivo",
    icon: "🎤",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "followup-01",
    label: "Follow-up #1 · Estado del proyecto",
    description:
      "Seguimiento al Snapshot externo. 5 páginas. Qué construyó el Equipo FDE Salesforce desde el 10-oct, qué está completo, qué necesitamos de Invex (4 bloqueantes), qué necesitamos de Skala (5 preguntas técnicas) y qué necesitamos de Telasist (3 decisiones operativas). Para la reunión del 12-oct.",
    url: "/Customers/Telasist/files/Telasist-Invex-Retencion-TDC-Followup-01.pdf",
    category: "Ejecutivo",
    icon: "📊",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "snapshot-externo",
    label: "Snapshot de preparación · versión externa (v1)",
    description:
      "Documento original compartido con Telasist antes del arranque. 12 páginas. Qué tenemos en la plataforma, qué necesitamos definir, 6 decisiones iniciales y plan de fases con duración orientativa. Sin IDs, sin usernames, sin PII.",
    url: "/Customers/Telasist/files/Telasist-Invex-Retencion-TDC-Snapshot-Externo.pdf",
    category: "Ejecutivo",
    icon: "📘",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
];

// ----------------------------------------------------------------------------
// PAM Hotels · Agente Concierge Digital Paradise Pass docs
// ----------------------------------------------------------------------------
const PAM_DOCS: DocEntry[] = [
  {
    slug: "estado-actual-agente",
    label: "Deck · Estado del Agente Concierge Digital (12-oct)",
    description:
      "Snapshot ejecutivo del Agente_ConciergeDigital (BotDefinition 0XxO40000006sVZKAY · V5 Active desde 2026-07-08). 10 slides horizontales con brand Salesforce. Cubre: TL;DR a 60 seg, ficha técnica del agente, los 8 subagentes productivos con sus acciones, inventario KB (44 Online + 7 Draft) con los bloqueantes por bucket, los 4 open items técnicos del .agent, timeline F0→F5 a 7 semanas de go-live, 7 riesgos activos y los 4 asks a PAM para la semana. Abre como presentación horizontal — navegación con flechas, teclado o click en los dots.",
    url: "/Customers/PAM/files/PAM_Estado_Agente_ConciergeDigital.html",
    category: "Ejecutivo",
    icon: "🎯",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "concierge-presentation",
    label: "Deck · Paradise Pass Concierge Digital",
    description:
      "Presentación original del diseño del Concierge Digital de Paradise Pass: audiencias (PPass descubrimiento vs. LVC pertenencia), arquitectura híbrida (KB + UDMO Files Data Cloud), 5 Custom Retrievers, Data Categories ortogonales y mapping a los 9 resorts.",
    url: "/Customers/PAM/PAM_Concierge_Digital_Presentation.html",
    category: "Ejecutivo",
    icon: "🎤",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "data-model-overview",
    label: "Data Model Overview · 6 Record Types + 4 Data Category Groups",
    description:
      "Modelo de datos del Knowledge para PAM. 6 Record Types FWD_* (Property Fact Sheet, Room Description, Policy, FAQ Article, Benefit & Program, How-To). 3 DCGs activos (Audience · Topic · Property) + Lifecycle como picklist por hard-limit. Desplegado en PAM-Sandbox 2026-07-02.",
    url: "/Customers/PAM/PAM_DataModel_Overview.html",
    category: "Arquitectura",
    icon: "🧩",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
  {
    slug: "paradise-pass-kb-analysis",
    label: "Paradise Pass · KB Analysis",
    description:
      "Catalogación verificada del repositorio PAM_Hotels_Knowledge_Base_RAG (74 documentos en 16 carpetas tras la entrega actualizada de junio 2026). Mapping documento → destino: KB Article citable, UDMO File para RAG, Form adjunto o System Prompt.",
    url: "/Customers/PAM/Paradise_Pass_KB_Analysis.html",
    category: "Técnico",
    icon: "📚",
    visibleTo: ["Salesforce", "Partner", "Client"],
  },
];

// ----------------------------------------------------------------------------
// Lookup
// ----------------------------------------------------------------------------
const DOCS_BY_SLUG: Record<string, DocEntry[]> = {
  betterware: BETTERWARE_DOCS,
  jafra: JAFRA_DOCS,
  "telasist-retencion": TELASIST_RETENCION_DOCS,
  pam: PAM_DOCS,
};

export function getDocsForSlug(slug: string): DocEntry[] {
  return DOCS_BY_SLUG[slug] ?? [];
}

// Overview tab uses "key docs" — a role-filtered subset (first 3 of each project).
export function getKeyDocsForSlug(slug: string, role: PortalRole): DocEntry[] {
  return getDocsForSlug(slug)
    .filter((d) => d.visibleTo.includes(role))
    .slice(0, 3);
}
