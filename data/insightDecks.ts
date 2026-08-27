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
  {
    slug: "deck",
    customerSlug: "insight",
    insightSlug: "headless-feedback-management-salesforce",
    title: "Headless Feedback Management",
    subtitle:
      "Salesforce como motor de encuesta, con un frontend construido por fuera",
    duration: "15 min",
    slides: [
      // 1 · Portada
      {
        layout: "title",
        eyebrow: "Insights · Postura técnica de integración",
        title:
          "Headless Salesforce\nFeedback Management",
        subtitle:
          "Cómo usar Salesforce como motor de encuesta y construir el frontend por fuera — sin reimplementar el motor y sin bajar SObjects a mano.",
        footnote: "Postura técnica · Laila Portfolio · 2026",
      },

      // 2 · Statement
      {
        layout: "quote",
        quote:
          "Sí — Salesforce Feedback Management puede operarse como un motor de encuesta headless. Existe una API oficial que permite iniciar una respuesta, enviar las respuestas de la página actual y dejar que Salesforce decida server-side cuál es la siguiente página según la ramificación configurada en Survey Builder. No reimplemente el motor: úselo.",
        context: "Statement técnico · Postura completa",
      },

      // 3 · Sección · Para todos
      {
        layout: "section",
        eyebrow: "Parte 0 · Para todos",
        title: "La analogía del restaurante",
        subtitle:
          "Salesforce mantiene la cocina; usted pone el comedor. Cambia el envase, no el contenido.",
      },

      // 4 · Cocina vs Comedor
      {
        layout: "comparison",
        eyebrow: "Sin tecnicismos",
        title: "La cocina  vs  El comedor",
        before: {
          heading: "En la cocina (Salesforce)",
          items: [
            "El cerebro: reglas 'si contesta X, salta a Y'.",
            "La memoria: cada respuesta queda guardada en los objetos de siempre.",
            "La sesión: recuerda en qué página va cada persona.",
            "El vínculo: amarra la encuesta al caso, la llamada, la sesión de WhatsApp.",
          ],
        },
        after: {
          heading: "En el comedor (su app)",
          items: [
            "Pintar las preguntas con su diseño y su marca.",
            "Un intermediario (BFF) que hable con la cocina — obligatorio.",
            "Dos botones de navegación: siguiente y anterior.",
            "El canal: web, móvil, WhatsApp, voz, kiosco.",
          ],
        },
      },

      // 5 · Limitantes reales
      {
        layout: "bullets",
        eyebrow: "Sin endulzar",
        title: "Las limitantes reales",
        bullets: [
          "Solo dos verbos: 'siguiente' y 'anterior'. Ni saltar páginas, ni guardar borrador para mañana, ni editar respuestas anteriores.",
          "No todos los tipos de pregunta están en la API pública con contrato oficial — Ranking, Slider, Date, Picklist y Scoring exigen validación en org.",
          "El modo público-anónimo (unAuth) requiere licencia Feedback Management Growth.",
          "El navegador no puede llamar directo a Salesforce en unAuth por reglas de seguridad de dominio — por eso el BFF no es opcional.",
          "La lógica vive del lado servidor: si Salesforce no manda la pregunta 4, su app no puede forzarla.",
          "El fin de la encuesta lo decide el servidor, no su frontend.",
        ],
        highlight:
          "Cambia el envase, no el contenido. Usted pone la cara y el canal; Salesforce pone el cerebro, la memoria y las reglas.",
      },

      // 6 · Sección marco
      {
        layout: "section",
        eyebrow: "Parte 1 · Marco",
        title: "Qué significa headless aquí",
        subtitle:
          "Salesforce es dueño de la lógica y del dato. El frontend externo es dueño de la experiencia y del canal. Fronteras explícitas.",
      },

      // 4 · Dos responsabilidades
      {
        layout: "comparison",
        eyebrow: "Fronteras claras",
        title: "Motor  vs  Experiencia",
        before: {
          heading: "Salesforce (motor)",
          items: [
            "Survey y SurveyVersion.",
            "Pages, Questions, Choices.",
            "Page branching y display logic.",
            "Required, merge fields, traducciones.",
            "SurveyInvitation, SurveyResponse, SurveyQuestionResponse.",
          ],
        },
        after: {
          heading: "Frontend externo (experiencia)",
          items: [
            "Look & feel completo.",
            "Componentes por tipo de pregunta.",
            "Responsive · accesibilidad · animaciones.",
            "Analítica de interacción propia.",
            "Canal: web, app móvil, portal, WebView.",
          ],
        },
      },

      // 5 · Sección API
      {
        layout: "section",
        eyebrow: "Parte 2 · Superficie oficial",
        title: "Qué expone Salesforce hoy",
        subtitle:
          "Business API oficial · dos familias · un contrato coherente. Todo lo que sigue está verificado contra la Feedback Management Developer Guide.",
      },

      // 6 · Tres endpoints
      {
        layout: "pillars",
        eyebrow: "Familias de endpoints",
        title: "Dos caminos · un mismo patrón",
        pillars: [
          {
            title: "Autenticado · POST + PATCH",
            body: "/connect/surveys/{surveyId}/survey-response · o su variante con /invitation/{surveyInvitationId}. OAuth 2.0 bearer. Disponible desde API v56.0 (Winter '23).",
            accent: "indigo",
          },
          {
            title: "No autenticado · unAuth API",
            body: "salesforce-scrt.com/surveys/v1/survey-response en el dominio de Omni-Channel Engagement. Token per-org emitido por /accessToken. Requiere Feedback Management Growth.",
            accent: "violet",
          },
          {
            title: "Invitaciones por email",
            body: "POST /connect/surveys/{surveyId}/survey-invitation-emails a hasta 300 recipients. Complemento natural para journeys que envían la invitación por email antes del rendering.",
            accent: "emerald",
          },
        ],
      },

      // 7 · Los tres campos de sesión
      {
        layout: "bullets",
        eyebrow: "El estado de la sesión",
        title: "Tres campos sostienen toda la respuesta",
        bullets: [
          "flowInterviewState · estado opaco server-side (el cliente no lo interpreta, solo lo re-envía).",
          "invitationId · Id de la SurveyInvitation asociada a esta respuesta.",
          "invitationUuid · refuerzo de seguridad exigido en cada PATCH del flujo unAuth.",
          "Bonus (v63.0+): shouldLoadPartiallyCmplSurvey permite retomar una respuesta parcialmente completada.",
        ],
        highlight:
          "Sin este trío, el servidor no reconoce la sesión. Nunca lo guarde en localStorage — vive en la sesión del BFF.",
      },

      // 8 · navigationAction
      {
        layout: "quote",
        quote:
          "navigationAction acepta exactamente dos valores oficiales: 'Back' y 'Next'. No hay Finish ni Submit. La encuesta termina cuando el servidor devuelve un Survey Thank You Page Output en lugar de un Survey Question Page Output. El cliente detecta la finalización por la forma del payload, no por un booleano.",
        context: "Enum verdadero · Detalle no negociable",
      },

      // 9 · Sección flujo
      {
        layout: "section",
        eyebrow: "Parte 3 · Flujo end-to-end",
        title: "POST inicia · PATCH navega · Thank You cierra",
        subtitle:
          "El mismo patrón para autenticado y no autenticado. Solo cambia el host, el token y dos campos extra en el body.",
      },

      // 10 · Pasos del flujo
      {
        layout: "bullets",
        eyebrow: "Ciclo canónico",
        title: "Cómo se ve una respuesta desde el primer clic",
        bullets: [
          "01 · POST /survey-response · Salesforce devuelve Survey Description Output con la Página 1.",
          "02 · Frontend renderiza · valida required · usuario responde.",
          "03 · PATCH /survey-response con navigationAction: Next y las respuestas de la página.",
          "04 · Salesforce evalúa branching server-side y devuelve la Página 2 o 5 correcta.",
          "05 · Repite hasta que el server devuelve Survey Thank You Page Output.",
          "06 · SurveyResponse.Status → Completed · SurveyQuestionResponse por cada pregunta.",
        ],
        highlight:
          "Cero código de branching en el frontend. El único condicional del cliente es: '¿el surveyPage tiene surveyQuestions[] o thankYouMessage?'",
      },

      // 11 · Sección lógica condicional
      {
        layout: "section",
        eyebrow: "Parte 4 · Lógica condicional",
        title: "Page branching vs question display logic",
        subtitle:
          "Dos conceptos distintos. Uno resuelto por contrato. El otro muy probablemente también — se confirma en el POC.",
      },

      // 12 · Comparación
      {
        layout: "comparison",
        eyebrow: "Dos capas de condicionalidad",
        title: "Server evalúa el flujo · frontend solo renderiza",
        before: {
          heading: "Page branching · resuelto server-side",
          items: [
            "'Si Q1 = Sí, ir a Página 2' se configura en Survey Builder.",
            "PATCH con Next devuelve la página correcta.",
            "Ningún dato de reglas llega al cliente — imposible reimplementar.",
            "Feature confirmada en las tres licencias de la feature table.",
          ],
        },
        after: {
          heading: "Question display logic · requiere validación",
          items: [
            "Question Output no expone dependsOn ni displayIf.",
            "Muy probablemente el server omite preguntas ocultas.",
            "Feature 'Dynamic Surveys' está en Starter y Growth.",
            "POC de dos preguntas con dependencia lo confirma en minutos.",
          ],
        },
      },

      // 13 · Sección frontend
      {
        layout: "section",
        eyebrow: "Parte 5 · Frontend",
        title: "Un contenedor · una página · un dispatcher",
        subtitle:
          "El árbol de componentes se aplana porque el motor no vive en el cliente. Un switch(questionType) resuelve el rendering.",
      },

      // 14 · Árbol
      {
        layout: "bullets",
        eyebrow: "Árbol de componentes",
        title: "React · sin decisiones de flujo",
        bullets: [
          "SurveyContainer · guarda la sesión y decide entre SurveyPage o ThankYouPage.",
          "SurveyPage · valida required · pinta Back cuando navigationActions lo incluye.",
          "QuestionRenderer · switch(questionType) → SingleChoice · MultiChoice · Rating · NPS · TextInput · TextArea · YesNo.",
          "Unsupported · fallback con telemetría cuando aparece un tipo no mapeado.",
          "ThankYouPage · thankYouMessage · redirectUrl · urlButtons.",
        ],
        highlight:
          "Cada hoja emite un shape uniforme hacia arriba. Un solo mapper (buildSurveyPageResponses) traduce a la forma que espera Salesforce.",
      },

      // 15 · Sección BFF
      {
        layout: "section",
        eyebrow: "Parte 6 · Integración",
        title: "El BFF no es opcional",
        subtitle:
          "OAuth token en el navegador es tóxico. Token unAuth per-org filtrado compromete toda la org. CORS entre dos hosts sin whitelist documentada.",
      },

      // 16 · Sin BFF vs con BFF
      {
        layout: "comparison",
        eyebrow: "Decisión de arquitectura",
        title: "Antipatrón  vs  Camino recomendado",
        before: {
          heading: "Sin BFF · browser → Salesforce",
          items: [
            "OAuth token expuesto en el bundle.",
            "Access token unAuth visible desde el cliente.",
            "CORS resuelto ad-hoc — frágil, no documentado.",
            "Rotación de credenciales imposible sin redeploy.",
            "Auditoría distribuida y difícil de centralizar.",
          ],
        },
        after: {
          heading: "Con BFF · browser → BFF → Salesforce",
          items: [
            "Secretos en variables de entorno server-side.",
            "Sesión httpOnly con { invitationId, invitationUuid, flowInterviewState }.",
            "Retries · rate limiting · logging estructurado.",
            "Feature flags y observabilidad centralizadas.",
            "CORS eliminado por diseño — el browser habla con su propio dominio.",
          ],
        },
      },

      // 17 · Sección comparación
      {
        layout: "section",
        eyebrow: "Parte 7 · Decisión clave",
        title:
          "Bajar SObjects a mano  vs.  usar la Business API",
        subtitle:
          "El error más caro que un equipo puede cometer al empezar. La API oficial es más barata, más segura y más sostenible.",
      },

      // 18 · Tabla de opciones
      {
        layout: "kpi-table",
        eyebrow: "Comparación honesta",
        title: "Opción A · reconstruir  vs  Opción B · Business API",
        rows: [
          {
            label: "Branching",
            baseline: "Reimplementar en TypeScript",
            goal6m: "Salesforce lo evalúa server-side",
            goal12m: "El frontend nunca ve la regla.",
            accent: "indigo",
          },
          {
            label: "Display logic",
            baseline: "Reglas propias en cliente",
            goal6m: "Muy probablemente server-side",
            goal12m: "Confirmable en POC en minutos.",
            accent: "violet",
          },
          {
            label: "Persistencia",
            baseline: "DML manual · fácil equivocarse",
            goal6m: "SurveyResponse + SurveyQuestionResponse automáticos",
            goal12m: "Dashboards y automation heredados intactos.",
            accent: "emerald",
          },
          {
            label: "Versionamiento",
            baseline: "Sincronización manual con publish",
            goal6m: "Sesión anclada a SurveyVersion activa",
            goal12m: "Salesforce garantiza la coherencia.",
            accent: "sky",
          },
          {
            label: "Esfuerzo inicial",
            baseline: "6–10 semanas para paridad",
            goal6m: "Un sprint para POC serio",
            goal12m: "Diferencia de ~5× en time-to-market.",
            accent: "indigo",
          },
          {
            label: "Mantenimiento",
            baseline: "Cada feature nueva → código nuevo",
            goal6m: "Capacidades nuevas del motor · gratis",
            goal12m: "Bajo TCO sostenido en el tiempo.",
            accent: "violet",
          },
        ],
      },

      // 19 · Sección riesgos
      {
        layout: "section",
        eyebrow: "Parte 8 · Riesgos",
        title: "Lo que la documentación oficial soporta — y lo que no",
        subtitle:
          "Cuatro estados: soportado · parcial · requiere validación · no soportado. Ninguna afirmación optimista sin base documentada.",
      },

      // 20 · Riesgos clasificados
      {
        layout: "bullets",
        eyebrow: "Puntos críticos",
        title: "Los aspectos que definen el diseño",
        bullets: [
          "✅ RadioButton · MultiChoice · Boolean · Rating · NPS · ShortText · FreeText — soportados con ejemplos.",
          "⚠️ Date · Ranking · Slider · Scoring · Picklist — requieren validación en POC (sin schema Connect REST público).",
          "✅ Page branching · Required · Back · Save & Resume (v63.0+) — todo soportado.",
          "⚠️ Question display logic — muy probablemente server-side, sin frase textual en docs.",
          "❌ SurveyVersion switching en vuelo · Content-Type ≠ JSON · License base 'Response Pack' para Connect REST.",
          "⚠️ CORS desde browser directo a salesforce-scrt.com — sin whitelist documentada. Un BFF lo resuelve.",
        ],
        highlight:
          "Ningún riesgo bloquea el patrón. Todos los 'requiere validación' se cierran en el POC de dos semanas.",
      },

      // 21 · Sección POC
      {
        layout: "section",
        eyebrow: "Parte 9 · POC",
        title: "Un sprint · cuatro páginas · todo probado",
        subtitle:
          "Diseño mínimo que demuestra que Salesforce puede seguir siendo el motor mientras una aplicación externa controla la experiencia completa.",
      },

      // 22 · POC estructura
      {
        layout: "bullets",
        eyebrow: "Diseño del POC",
        title: "Encuesta 'Post-visita' · v1 publicada",
        bullets: [
          "Página 1 · Q1 RadioButton '¿Eres cliente?' — Sí branchea a Página 2 · No a Página 3.",
          "Página 2 · Q2 MultiChoice productos · Q3 NPS · Q4 FreeText visible solo si Q3 ≤ 6.",
          "Página 3 · Q5 RadioButton canal · Q6 ShortText opcional.",
          "Página 4 · Thank You con thankYouMessage y redirectUrl · Response.Status → Completed.",
          "Probado autenticado (con SurveyInvitation existente) y no autenticado (Guest User + Growth).",
        ],
        highlight:
          "Objetivo del sprint: cero líneas de código de branching o display logic en el frontend. Auditable buscando 'goToPage' o 'if(answer'.",
      },

      // 23 · Cierre
      {
        layout: "closing",
        title: "Próximos pasos",
        bullets: [
          "Alinee al equipo en el patrón Opción B — Business API + BFF.",
          "Construya la encuesta del POC en una sandbox Developer o Partial con Feedback Management activo.",
          "Implemente el BFF en Route Handlers de Next.js con sesión firmada.",
          "Codifique el árbol de componentes con un solo switch(questionType).",
          "Convierta el POC en receta reutilizable — el siguiente paso natural del portfolio.",
        ],
        cta: "¿Conversamos sobre cómo hacer headless una encuesta real de Salesforce en su próximo sprint?",
      },

      // 24 · Gracias
      {
        layout: "thanks",
        eyebrow: "Insights · Laila Portfolio",
        title: "Gracias",
        subtitle:
          "Salesforce es el motor. Su frontend es la experiencia. La Business API es el puente que los mantiene coherentes.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // Deck · Nuevo Agentforce Builder + Enhanced Web Chat (ECv2)
  // ═══════════════════════════════════════════════════════════════════
  {
    slug: "deck",
    customerSlug: "insight",
    insightSlug: "nuevo-agentforce-builder-y-enhanced-messaging-web-2",
    title: "El nuevo Agentforce Builder",
    subtitle: "De configurar un bot a escribir un agente — con Agent Script, Agentforce DX y Enhanced Web Chat",
    duration: "18 min",
    slides: [
      // 1 · Portada
      {
        layout: "title",
        eyebrow: "Insights · Nueva generación de Agentforce",
        title: "El nuevo Agentforce Builder\nDe configurar un bot a escribir un agente",
        subtitle:
          "Agent Script, AiAuthoringBundle, Agentforce DX y Enhanced Web Chat — recorrido Zero-to-Hero.",
        footnote: "Postura técnica · Laila Portfolio · Agosto 2026",
      },

      // 2 · Statement ejecutivo
      {
        layout: "quote",
        quote:
          "Salesforce dejó de tratar a un agente como una configuración de varias metadatas sueltas y empezó a tratarlo como un artefacto de software. Un archivo `.agent`, un `AiAuthoringBundle`, una CLI oficial y una capa de testing y observabilidad de primera clase.",
        context: "Statement técnico · Postura completa",
      },

      // 3 · Sección · Parte 0
      {
        layout: "section",
        eyebrow: "Parte 0 · Para todos",
        title: "Sin tecnicismos — la analogía",
        subtitle:
          "De contratar por piezas sueltas a escribir un guion. Un solo cuaderno, un solo idioma, un solo diff.",
      },

      // 4 · Antes vs Ahora
      {
        layout: "comparison",
        eyebrow: "El cambio en una imagen",
        title: "Configurar por piezas vs escribir un guion",
        before: {
          heading: "Antes (Agentforce v1)",
          items: [
            "Bot + BotVersion + GenAiPlanner + N GenAiPlugin + N GenAiFunction.",
            "Cada pieza en su propia metadata XML — coordinar cambios entre archivos.",
            "Testing manual vía Preview del bot.",
            "Multi-agente era artesanía — no pattern oficial.",
            "El diff en Git leía metadata, no lógica de negocio.",
          ],
        },
        after: {
          heading: "Ahora (Agentforce Builder + Agent Script)",
          items: [
            "Un archivo `.agent` empaquetado en un `AiAuthoringBundle`.",
            "Bloques declarativos: `system`, `config`, `variables`, `start_agent`, subagents.",
            "Testing de primera clase con `sf agent test` + `run-eval` (Beta).",
            "Router + N subagents como patrón oficial documentado.",
            "El diff en Git lee lógica de negocio — versionable como código.",
          ],
        },
      },

      // 5 · Sección · Parte 1
      {
        layout: "section",
        eyebrow: "Parte 1 · Ejecutivo",
        title: "Por qué Salesforce lanzó un builder nuevo",
        subtitle:
          "Cuatro deudas del modelo anterior atacadas al mismo tiempo: dispersión, versionado, testing y multi-agente.",
      },

      // 6 · Cuatro deudas
      {
        layout: "pillars",
        eyebrow: "Deudas resueltas",
        title: "Qué problemas del modelo anterior estaba resolviendo",
        pillars: [
          {
            title: "1 · Configuración dispersa",
            body: "Un agente vivía en 4-6 metadatas coordinadas. Un cambio pequeño era una mini-operación.",
            accent: "indigo",
          },
          {
            title: "2 · Difícil de versionar",
            body: "El diff en Git era metadata de plataforma, no lógica de negocio. Code review lento y ruidoso.",
            accent: "violet",
          },
          {
            title: "3 · Testing frágil",
            body: "Probar era manual. Corner cases y batch evals había que armarlos por afuera del builder.",
            accent: "sky",
          },
          {
            title: "4 · Multi-agente hostil",
            body: "Coordinar varios agentes no era pattern oficial. Cada equipo lo hacía distinto.",
            accent: "emerald",
          },
        ],
      },

      // 7 · Sección · Parte 2
      {
        layout: "section",
        eyebrow: "Parte 2 · Arquitectura",
        title: "Anatomía del stack nuevo",
        subtitle:
          "Un archivo `.agent` con bloques declarativos, empaquetado en `AiAuthoringBundle`. El vocabulario nuevo.",
      },

      // 8 · Los 6 bloques del .agent
      {
        layout: "bullets",
        eyebrow: "Los 6 bloques declarativos",
        title: "Anatomía de un archivo `.agent`",
        bullets: [
          "`system:` — instrucciones globales, mensajes de bienvenida y de error.",
          "`config:` — nombre, descripción, metadatos del agente.",
          "`access:` — usuario dueño / default user.",
          "`language:` — `default_locale` + `additional_locales`.",
          "`variables:` — tipadas, mutables, con `description:` legible por el LLM.",
          "`start_agent <name>:` — sub-agente raíz + `reasoning: instructions:` + sub-agentes y acciones.",
        ],
        highlight:
          "En abril 2026 lo que antes se llamaba `Topic` pasó a llamarse `Subagent`. Es rename cosmético — no hay cambio de funcionalidad.",
      },

      // 9 · Referencias y operadores
      {
        layout: "split",
        eyebrow: "El lenguaje interno",
        title: "Referencias y operadores del Agent Script",
        left: {
          heading: "Referencias (@)",
          items: [
            "`@variables.<name>` — apunta a una variable declarada.",
            "`@actions.<name>` — apunta a una acción del bundle (Apex, Flow, prompt).",
            "`@subagents.<name>` — apunta a otro sub-agente del script.",
          ],
        },
        right: {
          heading: "Operadores de flujo",
          items: [
            "`|` — pipe LLM. El modelo razona la siguiente decisión.",
            "`->` — flecha determinística. Enrutamiento sin llamar al LLM.",
            "Mezclar ambos permite decisiones LLM-flexibles + guardrails de negocio duros.",
          ],
        },
      },

      // 10 · Sección · Parte 3
      {
        layout: "section",
        eyebrow: "Parte 3 · Developer",
        title: "Agentforce DX — la CLI oficial",
        subtitle:
          "Ciclo de vida completo desde CLI: diseñar, empaquetar, validar, previsualizar, publicar, testear y observar.",
      },

      // 11 · Comandos CLI
      {
        layout: "bullets",
        eyebrow: "sf agent · comandos verificados",
        title: "Ciclo de vida completo con Salesforce CLI",
        bullets: [
          "`sf agent generate agent-spec / authoring-bundle / test-spec / template`",
          "`sf agent validate authoring-bundle` — compila y valida sin desplegar.",
          "`sf agent preview` + `start / send / sessions / end` — chat local, integrable en CI.",
          "`sf agent publish authoring-bundle` + `activate / deactivate`.",
          "`sf agent test create / list / run / resume / results` — suites de test cases.",
          "`sf agent test run-eval` (Beta) — evaluación LLM-as-judge.",
          "`sf agent trace list / read / delete` — trazas de producción.",
          "`sf agent adl ...` — Agentforce Data Libraries. `sf agent mcp ...` — MCP (Developer Preview).",
        ],
        highlight:
          "Extensión oficial de VS Code (Agentforce DX) + bundle Markdown `AgentScriptDocs.zip` para grounding de coding agents.",
      },

      // 12 · Sección · Parte 4
      {
        layout: "section",
        eyebrow: "Parte 4 · Decisión",
        title: "Qué cambia en el alcance",
        subtitle:
          "Capacidades nuevas verificadas, capacidades legacy que persisten, y preguntas abiertas que no hay que fabricar.",
      },

      // 13 · Cambio de alcance
      {
        layout: "comparison",
        eyebrow: "Alcance funcional",
        title: "Qué se puede hacer hoy que antes no",
        before: {
          heading: "Persistía en v1",
          items: [
            "Trust Layer, Data Cloud grounding, Custom Retrievers, Knowledge Articles.",
            "Actions basadas en Apex, Flow y Prompt Templates.",
            "Integración con Service Cloud, Experience Cloud y canales de Messaging.",
            "EinsteinServiceAgent + GenAiPlanner ReAct — sigue funcionando por coexistencia.",
          ],
        },
        after: {
          heading: "Nuevo en v2",
          items: [
            "Router + N subagents como patrón oficial (guidance: 1-5 subagents).",
            "Variables tipadas mutables con `description:` legible por el LLM.",
            "Testing built-in (`sf agent test`, `run-eval` Beta) integrable en CI.",
            "Observabilidad con `sf agent trace` + Session Trace Data Model en Data 360.",
            "MCP tools externos (Developer Preview).",
            "Agentforce Data Libraries con CLI dedicada.",
          ],
        },
      },

      // 14 · Preguntas abiertas
      {
        layout: "bullets",
        eyebrow: "Verificación honesta",
        title: "Preguntas abiertas — no fabricar respuestas",
        bullets: [
          "GA date exacta del Agentforce Builder — no verificable en URL oficial fetchable.",
          "Retirement del stack v1 (Bot + GenAiPlanner + EinsteinServiceAgent) — no anunciado según lo verificable.",
          "Motor de razonamiento explícito del builder v2 (ReAct legacy vs Atlas Reasoning Engine) — no confirmado.",
          "Migración forzada — no confirmada. Coexistencia es la política observable.",
        ],
        highlight:
          "Regla honesta: no refactorizar por refactorizar. Nuevos agentes → v2. Agentes v1 funcionales en producción → quedarse hasta que aparezca razón concreta.",
      },

      // 15 · Sección · Parte 5
      {
        layout: "section",
        eyebrow: "Parte 5 · Canal",
        title: "Enhanced Web Chat (ECv2)",
        subtitle:
          "La evolución del widget MIAW — bot input control por default, APIs modernas, LWC embebibles, session controls.",
      },

      // 16 · Cambios ECv2
      {
        layout: "pillars",
        eyebrow: "Qué cambia respecto a Gen1",
        title: "Cuatro diferencias verificables",
        pillars: [
          {
            title: "Bot input por default",
            body: "El setting `enableUserInputForConversationWithBot` desaparece — el comportamiento es correcto por default.",
            accent: "emerald",
          },
          {
            title: "APIs modernas",
            body: "User Verification (JWT), Hidden Pre-Chat, Auto-Response, Utilities — todas de primera clase.",
            accent: "indigo",
          },
          {
            title: "LWC dentro del widget",
            body: "Custom UI vía Lightning Web Components como contrato interno, no configuración externa.",
            accent: "violet",
          },
          {
            title: "Session controls",
            body: "`restrictSessionOnMessagingChannel`, `shouldMinimizeWindowOnNewTab` — decisiones session-scoped explícitas.",
            accent: "sky",
          },
        ],
      },

      // 17 · Sección · Parte 6
      {
        layout: "section",
        eyebrow: "Parte 6 · Accionable",
        title: "Cómo empezar en un sprint",
        subtitle:
          "Semana 1: setup + primer agente en sandbox. Semana 2: testing, canal y observabilidad.",
      },

      // 18 · Sprint plan
      {
        layout: "split",
        eyebrow: "Sprint de 2 semanas",
        title: "De cero a agente v2 en producción interna",
        left: {
          heading: "Semana 1 · Setup + primer agente",
          items: [
            "Instalar Salesforce CLI + extensión Agentforce DX en VS Code.",
            "Autenticar CLI a sandbox — `sf org login web`.",
            "`sf agent generate agent-spec` + `generate authoring-bundle`.",
            "Editar el `.agent` — 1 subagente + 1 acción simple.",
            "`sf agent validate authoring-bundle` + `publish` + `activate`.",
            "Previsualizar con `sf agent preview`.",
          ],
        },
        right: {
          heading: "Semana 2 · Testing + canal + observabilidad",
          items: [
            "10-15 test cases con `sf agent generate test-spec`.",
            "`sf agent test run` — iterar hasta pasar.",
            "Enhanced Web Chat: Embedded Service Deployment + dominios permitidos.",
            "Embeber widget con `embeddedservice_bootstrap.init(...)`.",
            "10 conversaciones reales de prueba.",
            "`sf agent trace list` — validar routing y uso de acciones.",
          ],
        },
      },

      // 19 · Checklist prod
      {
        layout: "bullets",
        eyebrow: "Listo para producción",
        title: "Checklist honesto antes del go-live",
        bullets: [
          "El `.agent` está en Git con revisión por pares aprobada.",
          "Test suite corre en CI y bloquea merges si falla.",
          "Acciones críticas con `isConfirmationRequired` cuando aplica.",
          "Guardrails de scope explícitos (no consejos legales/médicos, no competidores).",
          "sessionTimeout definido — 15-30 min chat, 24h email.",
          "ECv2 desplegado con dominios permitidos correctos.",
          "Al menos una alerta de observabilidad sobre trazas (error rate, latencia p95).",
        ],
      },

      // 20 · Cierre
      {
        layout: "closing",
        title: "Regla final",
        bullets: [
          "El nuevo builder no lo hace mejor arquitecto — lo hace más rápido.",
          "La calidad sigue viniendo de las instrucciones, del diseño de acciones y de la disciplina de testing.",
          "El AiAuthoringBundle es un empaque mejor; lo que empaqueta sigue siendo su trabajo.",
        ],
        cta: "¿Conversamos sobre cómo llevar su primer agente v2 a producción en un sprint?",
      },

      // 21 · Gracias
      {
        layout: "thanks",
        eyebrow: "Insights · Laila Portfolio",
        title: "Gracias",
        subtitle:
          "Un archivo `.agent`, una CLI oficial, testing y observabilidad de primera clase. El agente vuelve a ser software.",
      },
    ],
  },
];

export function getInsightDeck(insightSlug: string): InsightDeck | undefined {
  return insightDecks.find((deck) => deck.insightSlug === insightSlug);
}
