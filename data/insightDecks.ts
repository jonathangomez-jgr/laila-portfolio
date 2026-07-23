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
  {
    slug: "deck",
    customerSlug: "insight",
    insightSlug: "customer-feedback-strategy-salesforce",
    title: "Customer Feedback con Salesforce",
    subtitle:
      "De la encuesta puntual al sistema continuo de voz del cliente",
    duration: "12 min",
    slides: [
      // 1 · Portada
      {
        layout: "title",
        eyebrow: "Insights · Postura técnica y estratégica",
        title:
          "Estrategia de Customer Feedback\ncon Salesforce",
        subtitle:
          "Cómo combinar Surveys, Feedback Management, Customer Signals Intelligence y Agentforce para pasar de medir a actuar.",
        footnote: "Postura ejecutiva · Laila Portfolio · 2026",
      },

      // 2 · Statement
      {
        layout: "quote",
        quote:
          "Customer Feedback debe operarse como un sistema continuo, no como un proyecto de encuestas. Señales activas + pasivas, unificadas en Data Cloud, accionadas con Agentforce y medidas por tiempo a cierre del loop — no solo por el score.",
        context: "Statement ejecutivo · Postura completa",
      },

      // 3 · Sección contexto
      {
        layout: "section",
        eyebrow: "Parte 1 · Contexto",
        title:
          "Por qué la conversación de Customer Feedback cambió",
        subtitle:
          "Las encuestas trimestrales agregadas ya no alcanzan. La diferencia hoy se hace con señales continuas y acciones automáticas.",
      },

      // 4 · El problema
      {
        layout: "bullets",
        eyebrow: "Lo que vemos en campo",
        title: "El problema que casi todas las organizaciones tienen",
        bullets: [
          "Encuestas dispersas en tres herramientas distintas, sin trazabilidad al cliente.",
          "Tasas de respuesta cayendo — el cliente no diferencia entre encuesta corporativa y spam.",
          "Métricas agregadas (NPS, CSAT, CES) que no se conectan al registro del cliente.",
          "Comentarios abiertos en hojas de cálculo que nadie procesa.",
          "Sin disparo de acciones cuando la respuesta es mala — el dashboard sube, la experiencia no.",
        ],
        highlight:
          "El programa de feedback se mide por dashboards, no por acciones. Esa es exactamente la trampa que esta postura busca evitar.",
      },

      // 5 · Sección productos
      {
        layout: "section",
        eyebrow: "Parte 2 · Productos vigentes",
        title:
          "Qué ofrece hoy Salesforce para capturar la experiencia del cliente",
        subtitle:
          "Tres bloques vigentes que cubren el espectro completo. Más Agentforce for Service como capa transversal.",
      },

      // 6 · Tres bloques
      {
        layout: "pillars",
        eyebrow: "Mapa de productos",
        title: "Tres bloques. Una sola estrategia.",
        pillars: [
          {
            title: "Salesforce Surveys",
            body: "Base incluida con Service Cloud. Encuestas simples, registradas en el CRM como objetos estándar. Punto de partida sin licencia adicional.",
            accent: "emerald",
          },
          {
            title: "Feedback Management",
            body: "Add-on (Starter / Growth). AI Survey Generation, Translation y Summarization. Dynamic Surveys, Data Mapper, Customer Lifecycle Maps, dashboards prebuilt.",
            accent: "indigo",
          },
          {
            title: "Customer Signals Intelligence",
            body: "Consumo por Experience Signals. Sentiment 24/7 sobre toda interacción de servicio. Captura señales pasivas sin pedirle nada al cliente.",
            accent: "violet",
          },
        ],
      },

      // 7 · Tabla productos
      {
        layout: "kpi-table",
        eyebrow: "Comparación operativa",
        title: "Qué producto resuelve cuál necesidad",
        rows: [
          {
            label: "Salesforce Surveys",
            baseline: "Activa",
            goal6m: "Incluido en Service Cloud",
            goal12m: "Punto de partida — encuestas simples y volumen bajo.",
            accent: "emerald",
          },
          {
            label: "Feedback Management — Starter",
            baseline: "Activa dinámica",
            goal6m: "Add-on por org/mes + Survey Pack",
            goal12m: "Encuestas profesionales multicanal con dashboards listos.",
            accent: "indigo",
          },
          {
            label: "Feedback Management — Growth",
            baseline: "Activa + Lifecycle",
            goal6m: "Add-on por org/mes (tier superior)",
            goal12m: "Customer Lifecycle Maps + volumen alto de respuestas.",
            accent: "violet",
          },
          {
            label: "Customer Signals Intelligence",
            baseline: "Pasiva 24/7",
            goal6m: "Consumo por Experience Signal",
            goal12m: "Sentiment continuo sobre cada interacción de servicio.",
            accent: "sky",
          },
        ],
      },

      // 8 · Sección conceptos
      {
        layout: "section",
        eyebrow: "Parte 3 · Conceptos",
        title:
          "Señales activas y pasivas: por qué necesita ambas",
        subtitle:
          "Una sola dimensión nunca alcanza. La combinación es la que genera valor real.",
      },

      // 9 · Activa vs Pasiva
      {
        layout: "comparison",
        eyebrow: "Dos dimensiones complementarias",
        title:
          "Voz declarada  vs.  Voz observada",
        before: {
          heading: "Señales activas — Surveys / Feedback Management",
          items: [
            "El cliente responde lo que dice pensar.",
            "Específicas, controladas, comparables (NPS, CSAT, CES).",
            "Costo: fatiga si se abusa de ellas.",
            "Limitación: el cliente que más sufre rara vez responde.",
          ],
        },
        after: {
          heading: "Señales pasivas — Customer Signals Intelligence",
          items: [
            "Sentimiento captado desde cada interacción de servicio.",
            "No requiere acción del cliente.",
            "Costo: necesita volumen y calidad conversacional.",
            "Limitación: no se pueden hacer preguntas específicas.",
          ],
        },
      },

      // 10 · Sección momentos
      {
        layout: "section",
        eyebrow: "Parte 4 · Diseño",
        title: "Los siete momentos donde tiene sentido medir",
        subtitle:
          "Una estrategia de Customer Feedback no es 'mandar más encuestas'. Es elegir bien los momentos.",
      },

      // 11 · Tabla de momentos
      {
        layout: "kpi-table",
        eyebrow: "Los siete momentos",
        title: "Métrica · canal · disparador en Salesforce",
        rows: [
          {
            label: "Post-interacción de servicio",
            baseline: "CSAT + CES",
            goal6m: "Email · post-chat · SMS",
            goal12m: "Workflow al cerrar el caso + Data Mapper.",
            accent: "indigo",
          },
          {
            label: "Post-onboarding (30–60 días)",
            baseline: "Onboarding Score",
            goal6m: "Email + in-app",
            goal12m: "Customer Lifecycle Map al hito de onboarding.",
            accent: "violet",
          },
          {
            label: "Post-compra / post-entrega",
            baseline: "CSAT producto",
            goal6m: "Email · WhatsApp · in-app",
            goal12m: "Disparo al pasar el pedido a 'Entregado'.",
            accent: "sky",
          },
          {
            label: "Renewal / aniversario",
            baseline: "Relationship NPS",
            goal6m: "Email programado",
            goal12m: "Customer Lifecycle Map por fecha aniversario.",
            accent: "emerald",
          },
          {
            label: "Eventos críticos / escalación",
            baseline: "Recovery survey",
            goal6m: "Email + llamada",
            goal12m: "Disparo desde Case severidad alta.",
            accent: "indigo",
          },
        ],
      },

      // 12 · Sección arquitectura
      {
        layout: "section",
        eyebrow: "Parte 5 · Arquitectura",
        title:
          "Customer Feedback como sistema continuo",
        subtitle:
          "Activas + pasivas convergen en Data Cloud. Agentforce y Data Mapper convierten la voz del cliente en acción real en el CRM.",
      },

      // 13 · Pilares de la arquitectura
      {
        layout: "pillars",
        eyebrow: "Roles claros, fronteras claras",
        title: "Quién hace qué",
        pillars: [
          {
            title: "Captura",
            body: "Surveys + Feedback Management para activas. Customer Signals Intelligence para pasivas. Ambas alimentan el mismo perfil.",
            accent: "indigo",
          },
          {
            title: "Unificación",
            body: "Data Cloud consolida survey + sentiment + engagement history en un solo perfil del cliente. Una sola verdad.",
            accent: "violet",
          },
          {
            title: "Acción",
            body: "Agentforce resume y recomienda. Data Mapper convierte respuestas malas en casos, tareas o journeys de recuperación.",
            accent: "sky",
          },
        ],
      },

      // 14 · Sección recomendaciones
      {
        layout: "section",
        eyebrow: "Parte 6 · Recomendaciones",
        title: "Diez principios de diseño",
        subtitle:
          "Si su programa rompe tres o más, pause antes de seguir invirtiendo en licencias.",
      },

      // 15 · Recomendaciones 1–5
      {
        layout: "bullets",
        eyebrow: "Recomendaciones (1/2)",
        title: "Cinco principios para no quemar al cliente",
        bullets: [
          "01 · Mida solo lo que vaya a accionar — si nadie hace nada con la respuesta, no la pida.",
          "02 · Diseñe el cierre del loop antes que la encuesta — Data Mapper desde el día uno.",
          "03 · No mezcle relacional con transaccional — NPS de marca ≠ CSAT de caso.",
          "04 · Cuide la fatiga — máximo una encuesta cada 30–45 días por cliente, salvo evento crítico.",
          "05 · Use preguntas cortas con ramificación dinámica — empiece con dos y profundice si amerita.",
        ],
      },

      // 16 · Recomendaciones 6–10
      {
        layout: "bullets",
        eyebrow: "Recomendaciones (2/2)",
        title: "Cinco principios para escalar con confianza",
        bullets: [
          "06 · Combine activo + pasivo desde el inicio — el valor está en cruzar señales sobre el mismo perfil.",
          "07 · Use IA para leer comentarios abiertos — AI Survey Summarization convierte texto en clusters.",
          "08 · Mida 'tiempo a cierre del loop', no solo el score — ese es el KPI que diferencia un programa serio.",
          "09 · Defina ownership claro por dominio — todos miden, alguien actúa.",
          "10 · Cierre el loop con el cliente, no solo con la dirección — 'gracias a su feedback hicimos X'.",
        ],
        highlight:
          "Las recomendaciones funcionan como contrato de diseño y como brújula para la conversación con su comité ejecutivo.",
      },

      // 17 · Modelo de madurez
      {
        layout: "pillars",
        eyebrow: "Parte 7 · Madurez",
        title: "Modelo de tres niveles",
        pillars: [
          {
            title: "Nivel 1 · Foundational",
            body: "Salesforce Surveys + CSAT post-caso + reportes básicos. Cierre del loop manual. Primer baseline de NPS y CSAT.",
            accent: "indigo",
          },
          {
            title: "Nivel 2 · Lifecycle",
            body: "Feedback Management + Customer Lifecycle Maps + Dynamic Surveys + Data Mapper. Dashboards prebuilt en producción.",
            accent: "violet",
          },
          {
            title: "Nivel 3 · Continuous Signals",
            body: "Customer Signals Intelligence 24/7 + Agentforce for Service + perfil unificado en Data Cloud. KPI de tiempo de cierre.",
            accent: "sky",
          },
        ],
      },

      // 18 · Trampas
      {
        layout: "bullets",
        eyebrow: "Parte 8 · Trampas comunes",
        title: "Cinco errores que vemos en campo",
        bullets: [
          "01 · Convertir el NPS en un objetivo, no en una métrica — el equipo gestiona la encuesta, no la experiencia.",
          "02 · Encuestas larguísimas — la tasa de respuesta cae y los datos se sesgan al cliente sobre-comprometido.",
          "03 · Comentarios abiertos sin lectura — si no usa AI Summarization, no los pida.",
          "04 · Programas duplicados entre áreas — sin governance, tres encuestas en una semana al mismo cliente.",
          "05 · No medir el cierre del loop — el KPI que importa es el porcentaje de respuestas malas que terminaron en acción.",
        ],
      },

      // 19 · Casos
      {
        layout: "kpi-table",
        eyebrow: "Parte 9 · Casos de uso",
        title: "Casos empresariales — bloque recomendado",
        rows: [
          {
            label: "Servicio al cliente: CSAT post-caso",
            baseline: "—",
            goal6m: "Surveys + Data Mapper",
            goal12m: "Volumen alto, pregunta simple, cierre del loop sobre el caso mismo.",
            accent: "indigo",
          },
          {
            label: "Seguros: post-claim",
            baseline: "—",
            goal6m: "Feedback Mgmt + Signals",
            goal12m: "Encuesta corta + sentiment de la llamada de claims juntos.",
            accent: "violet",
          },
          {
            label: "Retail: post-compra y post-entrega",
            baseline: "—",
            goal6m: "Feedback Mgmt — Dynamic",
            goal12m: "Personalización por producto + canal preferido del cliente.",
            accent: "sky",
          },
          {
            label: "Telco: voz de contact center",
            baseline: "—",
            goal6m: "Signals + Agentforce",
            goal12m: "Volumen conversacional alto justifica medir 24/7 sin encuesta.",
            accent: "emerald",
          },
          {
            label: "B2B SaaS: renewal + health score",
            baseline: "—",
            goal6m: "FM Growth + Data Cloud",
            goal12m: "Lifecycle Map para renewal + uso del producto = health real.",
            accent: "indigo",
          },
        ],
      },

      // 20 · Conclusión
      {
        layout: "quote",
        quote:
          "Una estrategia de Customer Feedback no se evalúa por el NPS del reporte trimestral. Se evalúa por tres preguntas: ¿cuántas respuestas malas terminaron en acción este mes?, ¿el agente sabe lo que su cliente ha dicho los últimos 90 días?, ¿la dirección decide en función de patrones reales o solo de un score agregado?",
        context: "Conclusión · Tres preguntas que importan",
      },

      // 21 · Cierre con CTA
      {
        layout: "closing",
        title: "Próximos pasos",
        bullets: [
          "Defina los 3–5 momentos del ciclo donde sí tiene sentido medir.",
          "Diseñe el cierre del loop con Data Mapper antes de enviar la primera encuesta.",
          "Combine activas + pasivas desde el diseño — no espere a estar maduro en una para empezar la otra.",
          "Mida el programa por 'tiempo a cierre del loop' además del score.",
          "Crezca en madurez por capacidades, no por marketing.",
        ],
        cta: "¿Conversamos sobre su estrategia de Customer Feedback?",
      },

      // 22 · Gracias
      {
        layout: "thanks",
        eyebrow: "Insights · Laila Portfolio",
        title: "Gracias",
        subtitle:
          "La voz del cliente importa cuando la convierte en acción.",
      },
    ],
  },
  {
    slug: "deck",
    customerSlug: "insight",
    insightSlug: "digital-engagement-agentforce-flujo-conversacional",
    title: "Digital Engagement + Agentforce + Humano",
    subtitle:
      "Cómo viaja una conversación dentro de Salesforce, de extremo a extremo",
    duration: "14 min",
    slides: [
      // 1 · Portada
      {
        layout: "title",
        eyebrow: "Insights · Postura técnica",
        title:
          "Digital Engagement, Agentforce\ny el agente humano",
        subtitle:
          "Zero-to-Hero: canal → sesión → Agentforce → handoff. Cómo se conecta cada capa y qué toca configurar un admin.",
        footnote: "Postura técnica · Laila Portfolio · 2026",
      },

      // 2 · Statement
      {
        layout: "quote",
        quote:
          "Un canal externo no habla con Agentforce: habla con Digital Engagement, que traduce ese mensaje a MessagingSession, lo entrega a Omni-Channel y — según la política — lo pone en manos del agente conversacional o del humano. Handoff, contexto e historial se preservan porque los tres actores viven sobre el mismo hilo de objetos Salesforce.",
        context: "Statement técnico · Postura completa",
      },

      // 3 · Sección panorama
      {
        layout: "section",
        eyebrow: "Parte 1 · Panorama",
        title: "Qué es Digital Engagement",
        subtitle:
          "Tres capas: provider externo, la traducción de Salesforce y el consumidor de la sesión.",
      },

      // 4 · Tres capas
      {
        layout: "pillars",
        eyebrow: "Tres capas, un solo circuito",
        title: "Cada capa tiene una responsabilidad clara",
        pillars: [
          {
            title: "Provider externo",
            body: "Meta (WhatsApp / Messenger), Apple, operadores SMS, telefonía. Es quien realmente se conecta con el cliente. Salesforce nunca habla con el celular.",
            accent: "indigo",
          },
          {
            title: "Digital Engagement",
            body: "Traduce a objetos: MessagingChannel, MessagingEndUser, MessagingSession, ConversationEntry. Aplica plantillas HSM. Mantiene la sesión viva y auditable.",
            accent: "violet",
          },
          {
            title: "Consumidor de la sesión",
            body: "Agentforce Agent, humano vía Omni-Channel, o bot legacy. Ninguno habla directo con el provider — todos pasan por Digital Engagement.",
            accent: "sky",
          },
        ],
      },

      // 5 · Vocabulario clave
      {
        layout: "kpi-table",
        eyebrow: "Parte 2 · Vocabulario mínimo",
        title: "Los seis objetos que un admin debe reconocer",
        rows: [
          {
            label: "MessagingChannel",
            baseline: "Puente",
            goal6m: "Provider externo",
            goal12m: "Un canal por línea WhatsApp, deployment MIAW, ID Apple.",
            accent: "indigo",
          },
          {
            label: "MessagingEndUser",
            baseline: "Cliente",
            goal6m: "Identidad por canal",
            goal12m: "Puede o no matchear a un Contact real.",
            accent: "violet",
          },
          {
            label: "MessagingSession",
            baseline: "Conversación viva",
            goal6m: "Status + owner",
            goal12m: "Es el registro que Omni-Channel rutea.",
            accent: "sky",
          },
          {
            label: "ConversationEntry",
            baseline: "Cada mensaje",
            goal6m: "Ligado a la sesión",
            goal12m: "Texto, media, botones, eventos de sistema.",
            accent: "emerald",
          },
          {
            label: "Omni-Channel Flow",
            baseline: "Conmutador",
            goal6m: "Agentforce vs cola humana",
            goal12m: "Aquí se decide el destino de cada sesión.",
            accent: "indigo",
          },
        ],
      },

      // 6 · Sección canales
      {
        layout: "section",
        eyebrow: "Parte 3 · Canales",
        title: "Todos los canales que convergen en el mismo objeto",
        subtitle:
          "WhatsApp, MIAW Web/App, Apple Messages, Facebook Messenger, SMS y Service Cloud Voice.",
      },

      // 7 · Tabla canales
      {
        layout: "kpi-table",
        eyebrow: "Reglas propias de cada canal",
        title: "Qué necesita saber un admin por canal",
        rows: [
          {
            label: "WhatsApp Business",
            baseline: "Meta Cloud API / BSP",
            goal6m: "Ventana 24h + HSM",
            goal12m: "Buttons, lists, media, ubicación.",
            accent: "emerald",
          },
          {
            label: "Messaging for Web/App (MIAW)",
            baseline: "Salesforce nativo",
            goal6m: "JWT + Embedded Deployment",
            goal12m: "Rich content + persistencia entre recargas.",
            accent: "indigo",
          },
          {
            label: "Apple Messages for Business",
            baseline: "Solo inbound",
            goal6m: "Apple Register",
            goal12m: "Apple Pay, list picker, time picker, form.",
            accent: "violet",
          },
          {
            label: "SMS",
            baseline: "Partner connector",
            goal6m: "Opt-in obligatorio",
            goal12m: "Solo texto — ideal OTP y alertas.",
            accent: "sky",
          },
          {
            label: "Service Cloud Voice",
            baseline: "Amazon Connect / BYOT",
            goal6m: "Transcript en vivo",
            goal12m: "Agentforce Voice + handoff a humano.",
            accent: "emerald",
          },
        ],
      },

      // 8 · Sección viaje
      {
        layout: "section",
        eyebrow: "Parte 4 · Viaje del mensaje",
        title: "Del ‘hola’ del cliente al primer objeto en Salesforce",
        subtitle:
          "Cinco pasos que un admin debe conocer de memoria — son el 80% del troubleshooting.",
      },

      // 9 · Cinco pasos
      {
        layout: "bullets",
        eyebrow: "Los cinco pasos",
        title: "Del provider hasta la respuesta al cliente",
        bullets: [
          "01 · Provider recibe el mensaje y valida su propio contrato (número activo, ventana vigente).",
          "02 · Dispara webhook firmado a Salesforce — Digital Engagement rechaza cualquier request sin firma válida.",
          "03 · Digital Engagement crea/reanuda MessagingEndUser + MessagingSession + ConversationEntry.",
          "04 · Omni-Channel Flow (Route Work) decide destino: Agentforce, cola humana o skill específica.",
          "05 · Outbound: la respuesta se persiste como ConversationEntry y Digital Engagement la empuja al provider.",
        ],
        highlight:
          "Si algo falla, el 80% de las veces está en los pasos 2 o 3 — no en Agentforce. Revise MessagingChannel y Channel Health antes que Topics.",
      },

      // 10 · Sección Agentforce
      {
        layout: "section",
        eyebrow: "Parte 5 · Agentforce entra",
        title: "Cuándo entra Agentforce y qué hace en cada turno",
        subtitle:
          "Reasoning Engine + Topics + Actions + Data Cloud grounding — decide el turno completo.",
      },

      // 11 · Ciclo del turno
      {
        layout: "pillars",
        eyebrow: "Un solo turno, cuatro salidas posibles",
        title: "Qué decide el Reasoning Engine",
        pillars: [
          {
            title: "Responder directo",
            body: "Prompt Template con contexto del CRM y del canal. Ideal para preguntas informativas resueltas por conocimiento del agente.",
            accent: "indigo",
          },
          {
            title: "Invocar una Action",
            body: "Flow, Apex, External Service, MCP tool o Data Cloud Query. Es cómo el agente ejecuta operaciones reales.",
            accent: "violet",
          },
          {
            title: "Pedir más información",
            body: "Cuando la intención es ambigua o falta un dato crítico. Evita ejecutar Actions con supuestos.",
            accent: "sky",
          },
          {
            title: "Handoff a humano",
            body: "Invoca Agent Handoff Action con summary. Cambia el owner de la MessagingSession y rutea vía Omni-Channel.",
            accent: "emerald",
          },
        ],
      },

      // 12 · Convivencia con DE
      {
        layout: "comparison",
        eyebrow: "Convivencia clara",
        title: "Digital Engagement vs Agentforce — no compiten",
        before: {
          heading: "Digital Engagement responsabilidad",
          items: [
            "Traducir provider ↔ objetos Salesforce.",
            "Mantener sesiones vivas y expirarlas.",
            "Aplicar plantillas HSM y ventanas de canal.",
            "Persistir cada ConversationEntry.",
            "Serializar outbound al canal correcto.",
          ],
        },
        after: {
          heading: "Agentforce responsabilidad",
          items: [
            "Razonar sobre la intención del cliente.",
            "Elegir topic y action pertinente.",
            "Grounding con Data Cloud en vivo.",
            "Componer la respuesta con contexto.",
            "Decidir cuándo escalar al humano.",
          ],
        },
      },

      // 13 · Sección handoff
      {
        layout: "section",
        eyebrow: "Parte 6 · Handoff",
        title: "Cómo se transfiere al humano sin perder contexto",
        subtitle:
          "El paso donde más despliegues fallan — no por tecnología, sino por diseño del momento humano.",
      },

      // 14 · Qué se preserva
      {
        layout: "bullets",
        eyebrow: "Qué recibe el humano",
        title: "Todo el contexto llega con la sesión",
        bullets: [
          "Historial completo de ConversationEntry — cada mensaje textual del cliente y del agente.",
          "Summary generado por Prompt Template — 2–3 frases con el problema y motivo del handoff.",
          "Contexto CRM enlazado — Contact, Cases, Orders, actividad de Data Cloud.",
          "Archivos adjuntos compartidos durante la conversación con el agente.",
          "Mismo canal — el cliente sigue en WhatsApp/Web/Voz sin percibir la transición.",
        ],
        highlight:
          "Regla: la Handoff Action siempre publica un summary. Handoff sin summary = 90 segundos de silencio + cliente escribiendo ‘¿hay alguien ahí?’.",
      },

      // 15 · Bot-back
      {
        layout: "quote",
        quote:
          "El handoff no siempre es unidireccional. Un humano puede devolver la sesión al Agentforce Agent — bot-back — después de resolver el punto que requería criterio humano. El agente continúa con la misma sesión, mismo canal, mismo historial. El humano gasta minutos donde aporta valor; el agente cierra el resto.",
        context: "Bot-back · Diseño responsable del tiempo humano",
      },

      // 16 · Sección arquitectura
      {
        layout: "section",
        eyebrow: "Parte 7 · Arquitectura",
        title: "Todo el sistema en una sola vista",
        subtitle:
          "Canales, Digital Engagement, Omni-Channel, Agentforce, Data Cloud y humano — en un solo hilo.",
      },

      // 17 · Roles
      {
        layout: "pillars",
        eyebrow: "Roles claros, fronteras claras",
        title: "Quién hace qué",
        pillars: [
          {
            title: "Captura",
            body: "Canales convergen en Digital Engagement. Todo se traduce a MessagingSession + ConversationEntry sin excepciones.",
            accent: "indigo",
          },
          {
            title: "Ruteo",
            body: "Omni-Channel Flow decide Agentforce, bot legacy o cola humana. Es el conmutador único.",
            accent: "violet",
          },
          {
            title: "Atención",
            body: "Agentforce razona y actúa; el humano toma cuando corresponde. Cambia el owner de la sesión — no se duplica.",
            accent: "sky",
          },
        ],
      },

      // 18 · Checklist admin
      {
        layout: "bullets",
        eyebrow: "Parte 8 · Checklist",
        title: "Lo que un admin activa, en orden",
        bullets: [
          "01 · Digital Engagement habilitado + permission sets (Service, DE, Agent).",
          "02 · Service Channels + Queues + Presence Configurations definidos.",
          "03 · MessagingChannel creado y validado con Channel Health.",
          "04 · Omni-Channel Flow con ramas Agentforce vs cola humana.",
          "05 · Agentforce Agent publicado con Topics, Actions y Handoff Action.",
          "06 · Enhanced Messaging Component en el Service Console (no chat viejo).",
          "07 · Wrap-up + retención + consent configurados según regulación.",
          "08 · Session Analytics + Agent Metrics activos desde el día uno.",
        ],
        highlight:
          "Encienda un canal, estabilice 3 semanas, después el segundo. Multiplicar canales en paralelo multiplica los tickets internos.",
      },

      // 19 · Trampas
      {
        layout: "bullets",
        eyebrow: "Parte 9 · Trampas comunes",
        title: "Los cinco errores más frecuentes",
        bullets: [
          "01 · Confundir Embedded Chat con MIAW — el chat viejo no crea MessagingSession.",
          "02 · Handoff sin summary — el humano tarda 90 segundos leyendo mientras el cliente se impacienta.",
          "03 · Ignorar la ventana 24h de WhatsApp — outbound fuera de ventana requiere plantilla HSM.",
          "04 · Presence con capacidad irreal — 2 a 4 chats simultáneos por humano es lo sostenible.",
          "05 · Agentforce sin Data Cloud — respuestas genéricas, pérdida de confianza del cliente.",
        ],
      },

      // 20 · Conclusión
      {
        layout: "quote",
        quote:
          "La calidad de un despliegue no se ve en el diagrama, se ve en tres momentos: cuando el cliente escribe y ve respuesta en menos de tres segundos, cuando Agentforce reconoce su límite e invoca handoff con summary claro, y cuando el humano toma la sesión sin que el cliente perciba la transición. Si esos tres momentos funcionan, el resto es iteración fina.",
        context: "Conclusión · Tres momentos que definen calidad",
      },

      // 21 · Cierre
      {
        layout: "closing",
        title: "Próximos pasos",
        bullets: [
          "Mapee los canales prioritarios y las plantillas HSM que necesita para operar en cada uno.",
          "Diseñe el Omni-Channel Flow — ramas Agentforce vs humano — antes que los topics del agente.",
          "Configure Handoff Action con Prompt Template de summary desde el primer sprint.",
          "Habilite Session Analytics y Agent Metrics antes del piloto — sin telemetría no hay iteración.",
          "Encienda un canal, estabilice tres semanas, después el siguiente.",
        ],
        cta: "¿Conversamos sobre el despliegue de Digital Engagement con Agentforce?",
      },

      // 22 · Gracias
      {
        layout: "thanks",
        eyebrow: "Insights · Laila Portfolio",
        title: "Gracias",
        subtitle:
          "Digital Engagement traduce, Agentforce razona, el humano interviene donde aporta. Tres capas, un solo hilo.",
      },
    ],
  },
];

export function getInsightDeck(insightSlug: string): InsightDeck | undefined {
  return insightDecks.find((deck) => deck.insightSlug === insightSlug);
}
