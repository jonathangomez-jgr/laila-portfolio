import type { ExecutiveDeck } from "./executiveDecks";

export type InsightDeck = ExecutiveDeck & {
  insightSlug: string;
};

export const insightDecks: InsightDeck[] = [
  {
    slug: "deck",
    customerSlug: "insight",
    insightSlug: "salesforce-multi-agent-orchestrator",
    title: "Salesforce en arquitecturas multiagente",
    subtitle:
      "Cuándo orquestar, cuándo participar y cómo gobernar el ecosistema",
    duration: "15 min",
    slides: [
      // 1 · Portada
      {
        layout: "title",
        eyebrow: "Insights · Postura técnica y estratégica",
        title: "Salesforce como actor principal\nen arquitecturas multiagente",
        subtitle:
          "Cuándo Agentforce debe ser el orquestador, cuándo solo el cerebro de experiencia y cuándo es un participante de un ecosistema gobernado.",
        footnote: "Postura ejecutiva · Laila Portfolio · 2026",
      },

      // 2 · Statement ejecutivo
      {
        layout: "quote",
        quote:
          "Salesforce debe ser el orquestador de experiencia, contexto y acción cuando el proceso gira alrededor del cliente. Agentforce maneja conversación, intención y delegación a especialistas. MuleSoft gobierna la interoperabilidad. Data Cloud aporta contexto. Flow y Apex controlan lo determinístico. MCP se usa para herramientas / acciones. A2A se reserva para colaboración real entre agentes.",
        context: "Statement ejecutivo · Postura completa",
      },

      // 3 · Sección: postura estratégica
      {
        layout: "section",
        eyebrow: "Parte 1 · Postura",
        title: "¿Qué debe ser Salesforce dentro de la arquitectura?",
        subtitle:
          "Cinco lecturas posibles. Todas válidas en distintos contextos. El error no es elegir mal entre ellas — es asumir que una sola sirve para todo.",
      },

      // 4 · Cuatro lecturas en pilares
      {
        layout: "pillars",
        eyebrow: "Lecturas posibles",
        title: "Cuatro formas de posicionar Salesforce",
        pillars: [
          {
            title: "A · Orquestador principal",
            body: "Agentforce coordina agentes propios y externos. Recomendado cuando el flujo de valor está dominado por procesos CRM (servicio, ventas, loyalty, field service).",
            accent: "indigo",
          },
          {
            title: "B · Front door de experiencia",
            body: "Salesforce concentra el canal y delega el razonamiento a otros orquestadores. Útil cuando la inversión en canal está hecha pero el cerebro de IA vive en otra plataforma.",
            accent: "violet",
          },
          {
            title: "C · Contexto y acción transaccional",
            body: "Salesforce aporta el Customer 360 y la capacidad de ejecutar cambios reales. Otro agente conversa, Salesforce ejecuta.",
            accent: "sky",
          },
          {
            title: "D · Participante de un ecosistema",
            body: "Existe un orquestador corporativo. Salesforce es uno más, especializado en dominio comercial. Realista en grandes corporaciones reguladas.",
            accent: "emerald",
          },
        ],
      },

      // 5 · Cuándo sí y cuándo no
      {
        layout: "comparison",
        eyebrow: "Criterio honesto",
        title: "Cuándo Salesforce debe ser el centro — y cuándo no",
        before: {
          heading: "NO forzar a Salesforce como único cerebro",
          items: [
            "Procesos de back-office puros: ETL, conciliaciones, reporting interno.",
            "La verdad de negocio vive en ERP, core bancario, billing, WMS o LIMS.",
            "Ya existe un orquestador corporativo de IA gobernado por otra plataforma.",
            "El caso de uso no es centrado en cliente — ingeniería, devops, finanzas internas.",
            "No hay historia de canal en Salesforce; forzar Service Cloud sería sobre-ingeniería.",
          ],
        },
        after: {
          heading: "SÍ es el centro",
          items: [
            "El cliente, caso, contrato u oportunidad son el objeto central de la conversación.",
            "El canal vive en Service Cloud, Digital Engagement o Experience Cloud.",
            "El Customer 360, las reglas de elegibilidad y los SLAs son críticos.",
            "Salesforce es la verdad operativa de la interacción con el cliente.",
            "El equipo dueño es comercial, de servicio o de field service.",
          ],
        },
      },

      // 6 · Sección: conceptos
      {
        layout: "section",
        eyebrow: "Parte 2 · Conceptos",
        title: "Agente, herramienta / acción y proceso: tres cosas distintas",
        subtitle:
          "La mayoría de problemas no necesitan un agente. Necesitan una herramienta / acción bien definida o un proceso determinístico — y conviene no confundirlas.",
      },

      // 7 · Tres pilares: agente / herramienta-acción / proceso
      {
        layout: "pillars",
        eyebrow: "Disciplina de diseño",
        title: "Cuándo cada uno y por qué",
        pillars: [
          {
            title: "Agente",
            body: "Cuando la entrada es ambigua, el camino no es predecible y se necesita razonamiento, planificación o redacción. Si no hay nada de eso, no pague por razonamiento.",
            accent: "indigo",
          },
          {
            title: "Herramienta / Acción",
            body: "Función determinística que el agente invoca (Action en Agentforce): Flow, Apex, Prompt Template, External Service, MCP server. Atómica, parametrizable, idempotente, auditable.",
            accent: "sky",
          },
          {
            title: "Proceso",
            body: "Orquestación de varias acciones con estado, transacciones, rollback, SLAs y auditoría regulatoria. Flow Orchestration, Apex, MuleSoft. El LLM no decide la transacción.",
            accent: "violet",
          },
        ],
      },

      // 8 · Anti-patrón
      {
        layout: "quote",
        quote:
          "Si la tarea se resuelve con Flow, Apex o un Prompt Template, ahí termina. Convertirla en agente añade costo, latencia y superficie de error sin valor proporcional. No crear agentes por moda.",
        context: "Anti-patrón frecuente · Regla práctica",
      },

      // 9 · Sección: opciones
      {
        layout: "section",
        eyebrow: "Parte 3 · Opciones",
        title: "Cinco arquitecturas reales",
        subtitle:
          "No son excluyentes. La mayoría de clientes maduros combina A + B + C. Los más grandes incorporan D y E para escalar.",
      },

      // 10 · Opción A
      {
        layout: "split",
        eyebrow: "Opción A",
        title: "Agentforce como orquestador nativo (primary + secondary)",
        left: {
          heading: "Cuándo aplica",
          items: [
            "Equipos por dominio dentro del mismo cliente.",
            "Cada dominio tiene su agente con ownership claro.",
            "El primary compone; los secondary mantienen su backlog.",
            "Ejemplo: 'Banking Concierge' que delega a Card Servicing, Lending y Wealth.",
          ],
        },
        right: {
          heading: "Ventajas y riesgos",
          items: [
            "Trust Layer, Data Cloud, observabilidad y seguridad nativos.",
            "Auditoría y métricas en Agentforce Analytics de fábrica.",
            "Riesgo: el primary absorbe todo y los secondary se vuelven cosméticos.",
            "Mitigación: definir contratos entre agentes y separar topics.",
          ],
        },
      },

      // 11 · Opción B
      {
        layout: "split",
        eyebrow: "Opción B",
        title: "Agentforce como orquestador de herramientas / acciones",
        left: {
          heading: "Cuándo aplica",
          items: [
            "Una sola superficie conversacional + muchas Actions bien definidas detrás.",
            "Operaciones determinísticas y bien parametrizadas.",
            "Es el patrón más simple — y el de mejor relación valor/riesgo.",
            "Ejemplo: agente de ventas con Flow + Apex + Prompt Templates.",
          ],
        },
        right: {
          heading: "Herramientas / acciones típicas",
          items: [
            "Flow Actions para lógica declarativa.",
            "Apex Invocable Actions para lógica compleja existente.",
            "Prompt Templates para redactar, clasificar, resumir.",
            "External Services / MuleSoft / MCP servers para datos externos.",
          ],
        },
      },

      // 12 · Opción C
      {
        layout: "split",
        eyebrow: "Opción C",
        title: "Proceso determinístico al mando, agente como componente",
        left: {
          heading: "El proceso conduce",
          items: [
            "Flow, Apex Orchestrator o MuleSoft definen pasos y transacciones.",
            "Estado, reintentos y compensaciones bajo control determinístico.",
            "Human-in-the-loop en pasos sensibles, explícito.",
          ],
        },
        right: {
          heading: "El agente aporta razonamiento",
          items: [
            "Clasificar intención.",
            "Redactar comunicación al cliente.",
            "Resumir el contexto del caso.",
            "Recomendar próximo paso para que el humano decida.",
          ],
        },
      },

      // 13 · Opción D
      {
        layout: "bullets",
        eyebrow: "Opción D",
        title: "MuleSoft como control plane del ecosistema multiagente",
        bullets: [
          "Registry: catálogo único de agentes y MCP servers con metadata, owner y SLA.",
          "Discovery: cómo un agente encuentra otro sin acoplarse a su endpoint.",
          "Policy enforcement: quién puede llamar qué, con qué datos, bajo qué condiciones.",
          "Observabilidad: logs unificados, costos por token, latencia, hand-offs.",
          "API management: rate limiting, versionado, contratos OpenAPI y MCP estables.",
          "Control plane: cambiar rutas, modelos o políticas sin redeploy de cada agente.",
        ],
        highlight:
          "Si el roadmap apunta a más de tres agentes en dos años, esta capa se planea desde el día uno aunque no se construya completa en la primera ola.",
      },

      // 14 · Opción E
      {
        layout: "bullets",
        eyebrow: "Opción E",
        title: "Agentforce headless invocado desde otro orquestador",
        bullets: [
          "Vía Agentforce API: el orquestador externo consume al agente directamente.",
          "Vía MCP: Salesforce expone capacidades como herramientas / acciones estandarizadas (cuenta, caso, oportunidad).",
          "Vía A2A: Agentforce y el agente externo se descubren, negocian capacidades y colaboran.",
          "Aplica cuando su organización ya tiene su orquestador corporativo o su copiloto.",
        ],
        highlight:
          "No es derrota — es elegir bien la pelea. Si el canal vive afuera, gana exponiendo capacidades CRM, no peleando el canal.",
      },

      // 15 · Sección protocolos
      {
        layout: "section",
        eyebrow: "Parte 4 · Protocolos",
        title: "MCP vs A2A: cuándo usar cada uno",
        subtitle:
          "Confundirlos es una de las fuentes más comunes de mala arquitectura multiagente.",
      },

      // 16 · Comparación MCP vs A2A
      {
        layout: "comparison",
        eyebrow: "Diferencia operativa",
        title: "Agente ↔ Herramienta / Acción  vs.  Agente ↔ Agente",
        before: {
          heading: "MCP — el otro lado NO razona",
          items: [
            "Cliente–servidor: el agente pide, el servidor responde.",
            "Operación clara, parametrizable, idempotente.",
            "Ejemplo: consultar póliza, inventario, ubicación, documento.",
            "Salesforce expone capacidades CRM como Actions / tools MCP estandarizadas.",
          ],
        },
        after: {
          heading: "A2A — el otro lado SÍ razona",
          items: [
            "Par–par: ambos agentes mantienen estado y autonomía.",
            "Sub-tarea requiere planificación propia del especialista.",
            "Ejemplo: delegar a agente de riesgo, legal, pricing, claims.",
            "Reservar A2A para cuando el otro lado verdaderamente piensa.",
          ],
        },
      },

      // 17 · Sección arquitectura
      {
        layout: "section",
        eyebrow: "Parte 5 · Arquitectura",
        title: "Una arquitectura de referencia, viva y defendible",
        subtitle:
          "Canales convergen en un primary. Herramientas / acciones y procesos viven en Salesforce. MuleSoft gobierna lo que cruza la frontera. Data Cloud da contexto unificado.",
      },

      // 18 · Pilares de la referencia
      {
        layout: "pillars",
        eyebrow: "Roles claros, fronteras claras",
        title: "Quién hace qué",
        pillars: [
          {
            title: "Agentforce",
            body: "Front door, intención, delegación. Trust Layer, audit y métricas nativas. Primary + secondary por dominio.",
            accent: "indigo",
          },
          {
            title: "MuleSoft",
            body: "Interoperabilidad, governance, observabilidad. Registry, discovery, policy engine y Agent Fabric.",
            accent: "violet",
          },
          {
            title: "Data Cloud",
            body: "Contexto unificado para todos los agentes — internos y externos. Mismo perfil, misma verdad.",
            accent: "sky",
          },
        ],
      },

      // 19 · Sección decisión
      {
        layout: "section",
        eyebrow: "Parte 6 · Decisión",
        title: "Qué patrón recomendar según el escenario",
        subtitle:
          "Cinco escenarios típicos. Cinco respuestas defendibles. Sin recetas mágicas.",
      },

      // 20 · KPI-style: matriz de decisión
      {
        layout: "kpi-table",
        eyebrow: "Matriz de decisión",
        title: "Escenario → Patrón → Por qué",
        rows: [
          {
            label: "Todo vive en Salesforce",
            baseline: "—",
            goal6m: "Opción A o B",
            goal12m: "Sin ecosistema externo; introducir MuleSoft/A2A es exceso.",
            accent: "indigo",
          },
          {
            label: "Salesforce + sistemas externos",
            baseline: "—",
            goal6m: "B + MuleSoft",
            goal12m: "Gobierno y reuso de APIs; A2A es prematuro.",
            accent: "violet",
          },
          {
            label: "Multi-plataforma de agentes",
            baseline: "—",
            goal6m: "A + A2A",
            goal12m: "Hay razonamiento del otro lado; A2A respeta autonomía.",
            accent: "sky",
          },
          {
            label: "Proceso regulado / financiero",
            baseline: "—",
            goal6m: "Opción C + HITL",
            goal12m: "El LLM no decide la transacción; el proceso protege auditoría.",
            accent: "emerald",
          },
          {
            label: "Muchos agentes por áreas",
            baseline: "—",
            goal6m: "Opción D",
            goal12m: "Sin governance transversal el ecosistema se vuelve inmanejable.",
            accent: "indigo",
          },
        ],
      },

      // 21 · Sección recomendaciones
      {
        layout: "section",
        eyebrow: "Parte 7 · Recomendaciones",
        title: "Diez principios de diseño",
        subtitle:
          "Si una propuesta concreta rompe tres o más, vale la pena pausarla — sea cual sea la plataforma.",
      },

      // 22 · 10 recomendaciones en dos slides — slide 1 (5)
      {
        layout: "bullets",
        eyebrow: "Recomendaciones (1/2)",
        title: "Cinco principios para no crear ruido",
        bullets: [
          "01 · No crear agentes por moda — si Flow/Apex/Prompt lo resuelve, ahí termina.",
          "02 · Nunca un mega-agente que lo haga todo — el primary compone, no concentra.",
          "03 · Diseñar agentes por dominio con owner, backlog y métricas propias.",
          "04 · Definir contratos entre agentes: inputs, outputs, errores y SLA.",
          "05 · Separar razonamiento de ejecución transaccional.",
        ],
      },

      // 23 · Recomendaciones 6–10
      {
        layout: "bullets",
        eyebrow: "Recomendaciones (2/2)",
        title: "Cinco principios para escalar con confianza",
        bullets: [
          "06 · Gobernar desde el día uno: Trust Layer, audit, PII masking, telemetría.",
          "07 · Trazabilidad, ownership y observabilidad transversal.",
          "08 · Humano en el loop en pasos sensibles, siempre explícito.",
          "09 · Empezar por alto valor y bajo riesgo: servicio asistido, resúmenes, recomendaciones.",
          "10 · Evolucionar por madurez — nadie llega a Nivel 3 en seis meses.",
        ],
        highlight:
          "Las recomendaciones funcionan como contrato de diseño y como brújula para la conversación de negocio.",
      },

      // 24 · Modelo de madurez
      {
        layout: "pillars",
        eyebrow: "Parte 8 · Madurez",
        title: "Modelo de tres niveles",
        pillars: [
          {
            title: "Nivel 1 · Foundational",
            body: "Agentforce conectado a CRM, Knowledge, Flow y APIs. Trust Layer activo. Casos de alto valor y bajo riesgo: servicio asistido, recomendación, resumen.",
            accent: "indigo",
          },
          {
            title: "Nivel 2 · Composable",
            body: "Primary + secondary por dominio. Herramientas / acciones robustas. Data Cloud como contexto compartido. Evaluación continua y governance del catálogo.",
            accent: "violet",
          },
          {
            title: "Nivel 3 · Ecosystem",
            body: "MuleSoft Agent Fabric como control plane. MCP para herramientas / acciones, A2A para agentes externos. Observabilidad y policy engine transversales.",
            accent: "sky",
          },
        ],
      },

      // 25 · Casos de uso
      {
        layout: "kpi-table",
        eyebrow: "Parte 9 · Casos de uso",
        title: "Casos empresariales — patrón recomendado",
        rows: [
          {
            label: "Servicio al cliente por WhatsApp",
            baseline: "—",
            goal6m: "A · Primary + secondary",
            goal12m: "Sweet spot — canal, contexto y acción nativos.",
            accent: "indigo",
          },
          {
            label: "Claims / siniestros",
            baseline: "—",
            goal6m: "C + A2A legal",
            goal12m: "Regulado en el corazón; razonamiento legal donde aporta.",
            accent: "violet",
          },
          {
            label: "Pricing / elegibilidad",
            baseline: "—",
            goal6m: "A + A2A pricing",
            goal12m: "Si el motor razona, A2A respeta su autonomía.",
            accent: "sky",
          },
          {
            label: "Consulta de contratos",
            baseline: "—",
            goal6m: "B + Data Cloud + MCP",
            goal12m: "Razonamiento + lookup; un solo agente con herramientas / acciones.",
            accent: "emerald",
          },
          {
            label: "Field service",
            baseline: "—",
            goal6m: "A + B",
            goal12m: "Nativo de Salesforce con extensiones externas vía MuleSoft.",
            accent: "indigo",
          },
        ],
      },

      // 26 · Conclusión / criterio final
      {
        layout: "quote",
        quote:
          "Una arquitectura multiagente con Salesforce no se evalúa por cuántos agentes tiene ni por qué tan vistoso es el diagrama. Se evalúa por tres preguntas: ¿el cliente recibe una sola experiencia coherente?, ¿el negocio entiende quién es dueño de cada agente?, ¿el área de tecnología puede auditar y evolucionar sin pedir permiso?",
        context: "Conclusión · Tres preguntas que importan",
      },

      // 27 · Cierre con CTA
      {
        layout: "closing",
        title: "Próximos pasos",
        bullets: [
          "Identificar dónde Salesforce claramente gana — y dónde es participante.",
          "Empezar por un caso de alto valor y bajo riesgo en Nivel 1.",
          "Diseñar gobernanza desde el día uno, no como capa retroactiva.",
          "Crecer en madurez por capacidades, no por marketing.",
        ],
        cta: "¿Conversamos sobre tu arquitectura multiagente?",
      },

      // 28 · Gracias
      {
        layout: "thanks",
        eyebrow: "Insights · Laila Portfolio",
        title: "Gracias",
        subtitle:
          "Una postura clara hoy ahorra una refactorización dolorosa mañana.",
      },
    ],
  },
];

export function getInsightDeck(insightSlug: string): InsightDeck | undefined {
  return insightDecks.find((deck) => deck.insightSlug === insightSlug);
}
