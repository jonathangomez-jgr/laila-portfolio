export type InsightBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | {
      type: "callout";
      tone: "info" | "warning" | "success" | "critical" | "note";
      title?: string;
      text: string;
    }
  | { type: "ascii"; title?: string; content: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "quote"; text: string; author?: string }
  | {
      type: "cards";
      columns?: 2 | 3;
      items: Array<{
        title: string;
        description: string;
        tone?: "primary" | "neutral" | "warn" | "success" | "violet";
        eyebrow?: string;
      }>;
    }
  | { type: "kpis"; items: Array<{ value: string; label: string }> }
  | { type: "divider" }
  | { type: "statement"; text: string }
  | { type: "sources"; items: Array<{ label: string; url: string }> };

export type InsightSection = {
  id: string;
  eyebrow?: string;
  title: string;
  blocks: InsightBlock[];
};

export type InsightAudience = "executive" | "architect" | "deep";

export type Insight = {
  slug: string;
  topic: string;
  audience: InsightAudience[];
  title: string;
  subtitle: string;
  summary: string;
  heroEyebrow: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  tags: string[];
  sections: InsightSection[];
  hidden?: boolean;
};

const multiAgent: Insight = {
  slug: "salesforce-multi-agent-orchestrator",
  topic: "Arquitectura multiagente",
  audience: ["executive", "architect", "deep"],
  heroEyebrow: "Postura técnica · Arquitectura empresarial",
  title:
    "Salesforce como actor principal en arquitecturas multiagente empresariales",
  subtitle:
    "Cuándo Agentforce debe ser el orquestador, cuándo solo el cerebro de experiencia y cuándo es un participante más dentro de un ecosistema gobernado por MuleSoft, Data Cloud, MCP y A2A.",
  summary:
    "Una arquitectura multiagente que pone a Salesforce en el centro funciona cuando el proceso gira alrededor del cliente, los datos transaccionales viven en la plataforma y la experiencia se entrega por canales digitales. Fuera de ese eje, Salesforce debe ser un participante de primera clase, no un cerebro forzado. Esta entrada desarrolla la postura, las cinco opciones de arquitectura realistas, la diferencia entre MCP y A2A, una arquitectura de referencia accionable, criterios de decisión, recomendaciones consultivas y un modelo de madurez de tres niveles.",
  author: "Jonathan Gomez",
  authorRole: "Principal Solution Engineer · Salesforce",
  publishedAt: "2026-06-23",
  updatedAt: "2026-06-23",
  readingMinutes: 28,
  tags: [
    "Agentforce",
    "MuleSoft",
    "Data Cloud",
    "MCP",
    "A2A",
    "Multiagente",
    "Gobierno de IA",
  ],
  sections: [
    {
      id: "resumen-ejecutivo",
      eyebrow: "Statement ejecutivo",
      title: "La tesis en una página",
      blocks: [
        {
          type: "statement",
          text: "Salesforce debe ser el orquestador de experiencia, contexto y acción cuando el proceso gira alrededor del cliente. Agentforce maneja conversación, intención y delegación a especialistas. MuleSoft es la capa de interoperabilidad, gobierno y observabilidad cuando el ecosistema incluye agentes y herramientas de múltiples plataformas. Data Cloud aporta contexto unificado. Flow y Apex controlan lo determinístico. MCP se usa para herramientas. A2A se reserva para colaboración real entre agentes autónomos.",
        },
        {
          type: "paragraph",
          text: "Esta entrada está pensada para arquitectos empresariales y líderes técnicos que están diseñando — o defendiendo — una arquitectura multiagente donde Salesforce convive con Vertex AI, Bedrock, Azure AI Foundry, copilotos internos, agentes custom, APIs legacy y core systems. No es un manifiesto de producto, es una postura consultiva: hay escenarios en que Salesforce debe ser el cerebro, otros en los que debe ser un especialista invocado, y otros donde forzarlo como único orquestador es un error de arquitectura.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Cómo leer esta entrada",
          text: "Cada sección es autocontenida. Si tienes 5 minutos, lee el statement, la postura estratégica y la conclusión. Si tienes 30 minutos, recorre las opciones A–E, la arquitectura de referencia y la matriz de decisión. Si vas a defender el diseño en un comité, llévate las recomendaciones y el modelo de madurez.",
        },
      ],
    },
    {
      id: "postura-estrategica",
      eyebrow: "Parte 1 · Postura",
      title: "¿Qué debe ser Salesforce dentro de una arquitectura multiagente?",
      blocks: [
        {
          type: "paragraph",
          text: "Hay cinco lecturas posibles y todas son válidas en distintos contextos. El error no es elegir mal entre ellas: es asumir que solo una es correcta para todo el cliente.",
        },
        {
          type: "cards",
          columns: 2,
          items: [
            {
              eyebrow: "Lectura A",
              title: "Orquestador principal de todos los agentes",
              description:
                "Agentforce coordina agentes propios y externos como subagentes o herramientas. Tiene sentido cuando el flujo de valor está dominado por procesos CRM (servicio, ventas, loyalty, field service) y el ecosistema externo es secundario.",
              tone: "primary",
            },
            {
              eyebrow: "Lectura B",
              title: "Front door de experiencia",
              description:
                "Salesforce concentra el canal (Service Cloud, Digital Engagement, Experience Cloud, WhatsApp, Slack) pero delega razonamiento o ejecución a otros orquestadores. Útil cuando la inversión en canal y CRM está hecha pero el cerebro de IA vive en otra plataforma.",
              tone: "neutral",
            },
            {
              eyebrow: "Lectura C",
              title: "Sistema de contexto y acción transaccional",
              description:
                "Salesforce aporta el Customer 360, los objetos transaccionales y la capacidad de ejecutar cambios reales (crear caso, modificar póliza, generar cotización). Otro agente conversa, Salesforce ejecuta.",
              tone: "success",
            },
            {
              eyebrow: "Lectura D",
              title: "Participante en un ecosistema mayor",
              description:
                "Un orquestador corporativo (frecuentemente construido sobre MuleSoft, una capa propia o un hub multiagente) coordina muchos agentes, y Salesforce es uno más, especializado en dominio comercial. Realista en grandes corporaciones reguladas.",
              tone: "violet",
            },
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Cuándo Salesforce debe ser el centro",
        },
        {
          type: "list",
          items: [
            "El cliente, el caso, el contrato o la oportunidad son el objeto central de la conversación.",
            "El canal de interacción (chat, voz, WhatsApp, portal) vive en Service Cloud, Digital Engagement o Experience Cloud.",
            "El equipo de negocio que adopta la solución es comercial, de servicio o de field service — no un equipo de plataforma corporativa.",
            "El Customer 360 unificado, las reglas de elegibilidad, los SLAs y la trazabilidad CRM son críticos para el caso de uso.",
            "El cliente ya tiene Salesforce como sistema de registro de la interacción y no quiere fragmentar la verdad operativa.",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Cuándo NO forzar a Salesforce como único cerebro",
        },
        {
          type: "list",
          items: [
            "El proceso es de back-office puro: ETL, conciliaciones, reporting financiero, riesgo de crédito a gran escala.",
            "La fuente de verdad y la lógica de negocio principal viven en el ERP, el core bancario, el sistema de billing, el WMS o el LIMS.",
            "Existe ya un orquestador corporativo (interno, sobre MuleSoft, Camunda, Azure o un hub propio) y el cliente decidió que la IA empresarial se gobierna desde ahí.",
            "El caso de uso no es centrado en cliente — por ejemplo, un asistente para ingeniería, devops, finanzas internas o un copiloto de Microsoft 365.",
            "El cliente no tiene una historia de canal en Salesforce y forzar la conversación en Service Cloud sería sobre-ingeniería.",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Honestidad consultiva",
          text: "Ningún cliente serio necesita que defendamos a Salesforce en todos los escenarios. Necesita que lo defendamos donde claramente gana — y que reconozcamos abiertamente dónde es mejor un participante. Ese segundo movimiento es lo que construye credibilidad técnica.",
        },
      ],
    },
    {
      id: "agente-herramienta-proceso",
      eyebrow: "Parte 2 · Conceptos",
      title: "Agente, herramienta y proceso: tres cosas distintas",
      blocks: [
        {
          type: "paragraph",
          text: "Una de las disciplinas más importantes al diseñar arquitecturas con LLMs es no convertir todo en agente. La mayoría de los problemas no necesitan un agente: necesitan una herramienta bien definida, un proceso determinístico o una composición de ambos. Cuándo introducir razonamiento autónomo no es una decisión estética; es una decisión de costo, riesgo y gobernanza.",
        },
        {
          type: "table",
          headers: ["Pieza", "Definición operativa", "Cuándo aplica", "Cuándo NO"],
          rows: [
            [
              "Agente",
              "Componente que recibe una intención en lenguaje natural, planifica, decide qué herramientas usar, mantiene contexto y puede delegar.",
              "Cuando la entrada es ambigua, el camino no es predecible y necesitas razonamiento, planificación o redacción.",
              "Cuando el proceso es fijo, regulado o el costo de un error semántico del LLM es alto sin supervisión.",
            ],
            [
              "Herramienta",
              "Función determinística invocable por un agente o por un proceso: Apex, Flow, External Service, MCP server, API REST.",
              "Cuando la operación tiene parámetros claros, resultados verificables y reglas de negocio explícitas.",
              "Cuando intentas que la herramienta reemplace al razonamiento o que oculte ambigüedad.",
            ],
            [
              "Proceso",
              "Orquestación determinística: Flow Orchestration, Apex Queueable, OmniStudio, BPMN, MuleSoft flow.",
              "Procesos regulados, transaccionales, con SLAs, ramas de excepción y necesidad de auditoría.",
              "Cuando la entrada es naturalmente conversacional y la lógica no se puede codificar como árbol de decisión.",
            ],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Regla práctica para evitar agentes innecesarios",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Si la entrada se puede normalizar a parámetros y la salida se valida con reglas, es una herramienta — no un agente.",
            "Si el flujo tiene pasos fijos, transacciones y rollback, es un proceso — Flow o Apex, no LLM.",
            "Si lo único que aporta el LLM es redactar la respuesta final, el agente es un wrapper sobre Prompt Templates, no un agente autónomo.",
            "Si necesitas planificar, descomponer, elegir herramientas distintas según el contexto, mantener memoria de la conversación o delegar a otro especialista — entonces sí, es un agente.",
          ],
        },
        {
          type: "callout",
          tone: "critical",
          title: "Anti-patrón frecuente",
          text: "Convertir en agente lo que era un Flow con buenas etiquetas. El resultado es un componente más caro, más lento, más difícil de auditar y con menor cobertura de pruebas que la versión determinística que ya funcionaba. La regla de oro: si no necesitas razonamiento, no pagues por razonamiento.",
        },
      ],
    },
    {
      id: "opciones-arquitectura",
      eyebrow: "Parte 3 · Opciones",
      title: "Cinco arquitecturas reales con Salesforce como actor principal",
      blocks: [
        {
          type: "paragraph",
          text: "No hay una única topología correcta. Hay cinco patrones que cubren la mayoría de los escenarios empresariales. Las opciones no son excluyentes: la mayoría de los clientes maduros terminan con una combinación de A+B+C, y los más grandes incorporan D y E para escalar.",
        },
        {
          type: "heading",
          level: 3,
          text: "Opción A · Agentforce como orquestador nativo (primary + secondary)",
        },
        {
          type: "paragraph",
          text: "Un agente primario en Agentforce recibe la intención del usuario y delega a agentes secundarios especializados por dominio (servicio, ventas, loyalty, claims). El primary mantiene contexto y handoff, los secondary tienen topics y actions propios. Es el patrón nativo más limpio dentro de Salesforce: comparten Trust Layer, Data Cloud, observabilidad y modelo de seguridad.",
        },
        {
          type: "cards",
          columns: 2,
          items: [
            {
              eyebrow: "Cuándo recomendarlo",
              title: "Equipos por dominio dentro del mismo cliente",
              description:
                "Cuando hay agentes propios de servicio, ventas, marketing o field service que ya tienen ownership claro. Cada dominio mantiene su agente; el primary los compone.",
              tone: "success",
            },
            {
              eyebrow: "Ventajas",
              title: "Gobierno y trazabilidad de fábrica",
              description:
                "Einstein Trust Layer, mascarado de PII, auditoría unificada, métricas en Agentforce Analytics y permisos heredados del modelo Salesforce.",
              tone: "primary",
            },
            {
              eyebrow: "Riesgos",
              title: "Mega-agente disfrazado",
              description:
                "Cuando un equipo decide que el primary haga todo y los secondary se vuelven cosméticos. Resultado: pérdida de mantenibilidad y conflictos de topic.",
              tone: "warn",
            },
            {
              eyebrow: "Ejemplo",
              title: "Servicio bancario",
              description:
                "Primary: 'Banking Concierge'. Secondary: 'Card Servicing', 'Lending Status', 'Wealth Inquiry'. Cada uno con topics propios; el primary delega y mantiene la conversación.",
              tone: "neutral",
            },
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Opción B · Agentforce como orquestador de herramientas",
        },
        {
          type: "paragraph",
          text: "El agente principal no delega a otros agentes; consume herramientas — Flow, Apex, Prompt Templates, External Services, MuleSoft API, MCP servers. Es la arquitectura más simple y la que mejor resultado da en la mayoría de los casos: una sola superficie conversacional y muchas acciones bien definidas detrás.",
        },
        {
          type: "callout",
          tone: "success",
          title: "Cuándo una herramienta vence a un agente",
          text: "Cuando la operación es 'consulta este sistema y devuélveme estos campos', 'crea este registro con estos datos', 'calcula esta elegibilidad con estas reglas'. No hay ambigüedad, no hay planificación, no hay razonamiento. Ahí no quieres un agente — quieres una herramienta confiable, idempotente y auditable.",
        },
        {
          type: "list",
          items: [
            "Flow Actions cuando la lógica vive en Salesforce y debe respetar reglas de negocio declarativas.",
            "Apex Invocable Actions cuando hay SOQL/DML complejo, validaciones cruzadas o lógica que ya está implementada.",
            "Prompt Templates cuando la herramienta es 'redacta', 'resume', 'clasifica' o 'extrae' usando contexto CRM.",
            "External Services / Named Credentials para APIs corporativas con OpenAPI definido.",
            "MuleSoft API como herramienta cuando el dato vive fuera y necesitas reuso, gobierno y rate limiting.",
            "MCP server como herramienta cuando la fuente externa expone una superficie estandarizada (documentos, inventario, conocimiento, sistemas legacy con wrapper MCP).",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Opción C · Proceso determinístico al mando, agente como componente inteligente",
        },
        {
          type: "paragraph",
          text: "Aquí Flow, Apex Orchestrator o MuleSoft son los que conducen el proceso, y Agentforce participa solo en los pasos donde se necesita razonamiento: clasificar, redactar, recomendar, interpretar lenguaje natural. El proceso mantiene la transaccionalidad y el agente aporta inteligencia donde aporta valor real.",
        },
        {
          type: "cards",
          columns: 3,
          items: [
            {
              title: "El proceso manda",
              description:
                "Flow / Apex / MuleSoft definen pasos, estados, transacciones, reintentos y compensaciones.",
              tone: "primary",
            },
            {
              title: "El agente interpreta",
              description:
                "Llamadas puntuales para clasificar intención, redactar comunicaciones, resumir contexto o recomendar próximo paso.",
              tone: "success",
            },
            {
              title: "El humano supervisa",
              description:
                "Human-in-the-loop obligatorio en pasos sensibles: aprobación de pago, modificación contractual, escalamiento legal.",
              tone: "warn",
            },
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Cuándo elegir esta opción",
          text: "Procesos regulados (banca, seguros, salud, energía), transaccionales (pagos, claims, billing) o con SLAs duros. Aquí el LLM no puede ser quien decida la transacción — debe ser el proceso. El agente solo aporta donde el lenguaje natural es valor (clasificación, redacción, explicación).",
        },
        {
          type: "heading",
          level: 3,
          text: "Opción D · MuleSoft como control plane del ecosistema multiagente",
        },
        {
          type: "paragraph",
          text: "Cuando el cliente tiene muchos agentes — propios y de terceros — la conversación deja de ser 'qué agente uso' y pasa a ser 'cómo los gobierno'. Ahí entra MuleSoft como capa transversal: registro de agentes y herramientas, descubrimiento, control de acceso, observabilidad, métricas, políticas de uso y rate limiting. En 2025 Salesforce posicionó esta capa con MuleSoft Agent Fabric y el soporte de MCP server en Anypoint.",
        },
        {
          type: "list",
          items: [
            "Registry: catálogo único de agentes y MCP servers disponibles, con metadata de dominio, owner, versión y SLA.",
            "Discovery: cómo un agente encuentra otro o una herramienta sin acoplarse a su endpoint físico.",
            "Policy enforcement: quién puede llamar qué, con qué datos, bajo qué condiciones (PII, compliance, geografía).",
            "Observabilidad: logs unificados de invocaciones, costos por token, latencia, tasa de error, hand-offs.",
            "API management: rate limiting, versionado, depreciación, contratos OpenAPI y MCP estables.",
            "Control plane: cambios de comportamiento (rutas, modelos, políticas) sin redeploy de cada agente.",
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "Realidad de campo",
          text: "Muchos clientes inician sin esta capa y la introducen cuando llegan al tercer o cuarto agente y se les hace inmanejable la gobernanza. Recomendación: si el roadmap del cliente apunta a más de tres agentes en dos años, plantea esta capa desde el día uno aunque no se construya completa en la primera ola.",
        },
        {
          type: "heading",
          level: 3,
          text: "Opción E · Agentforce como agente headless invocado desde otro orquestador",
        },
        {
          type: "paragraph",
          text: "El cliente ya tiene un orquestador corporativo, un copiloto de Microsoft, un asistente en Vertex AI o un hub propio. Salesforce no controla el canal — pero controla los datos CRM, los procesos transaccionales y los objetos de negocio. La respuesta correcta no es pelear el canal: es exponer Agentforce como un agente especializado invocable, a través de Agentforce API, MCP server o A2A.",
        },
        {
          type: "cards",
          columns: 2,
          items: [
            {
              eyebrow: "Vía Agentforce API",
              title: "Invocación directa al agente",
              description:
                "Un orquestador externo llama al agente con sesiones autenticadas y consume su respuesta. Útil cuando el cliente quiere mantener su shell pero usar el cerebro CRM.",
              tone: "primary",
            },
            {
              eyebrow: "Vía MCP server",
              title: "Salesforce como herramienta estandarizada",
              description:
                "Agentforce expone capacidades como tools MCP — consulta de cuenta, creación de caso, actualización de oportunidad — invocables por cualquier agente compatible.",
              tone: "success",
            },
            {
              eyebrow: "Vía A2A",
              title: "Agente especializado en un protocolo agente-a-agente",
              description:
                "El agente externo y Agentforce se descubren, negocian capacidades y colaboran. Patrón realista para ecosistemas multiplataforma maduros.",
              tone: "violet",
            },
            {
              eyebrow: "Riesgo",
              title: "Pérdida de control de experiencia",
              description:
                "El cliente pierde la oportunidad de unificar canal y datos. Útil técnicamente, pero obliga a una conversación de negocio honesta sobre dónde vive realmente la experiencia.",
              tone: "warn",
            },
          ],
        },
      ],
    },
    {
      id: "mcp-vs-a2a",
      eyebrow: "Parte 4 · Protocolos",
      title: "MCP vs A2A: cuándo usar cada uno",
      blocks: [
        {
          type: "paragraph",
          text: "Son dos protocolos abiertos que la industria adoptó en 2024–2025 para resolver problemas distintos. Confundirlos es una de las fuentes más comunes de mala arquitectura multiagente.",
        },
        {
          type: "cards",
          columns: 2,
          items: [
            {
              eyebrow: "MCP — Model Context Protocol",
              title: "Agente ↔ Herramienta",
              description:
                "Estandariza cómo un agente descubre, autentica y consume herramientas, recursos y prompts expuestos por un servidor. Es 'USB-C para agentes': el agente pide; el servidor responde. No hay razonamiento del otro lado.",
              tone: "primary",
            },
            {
              eyebrow: "A2A — Agent-to-Agent",
              title: "Agente ↔ Agente",
              description:
                "Estandariza cómo dos agentes autónomos se descubren, negocian capacidades, delegan tareas y reportan resultados. El otro lado sí razona, planifica y puede rechazar. Es protocolo entre pares.",
              tone: "violet",
            },
          ],
        },
        {
          type: "table",
          headers: ["Dimensión", "MCP", "A2A"],
          rows: [
            [
              "Relación",
              "Cliente–servidor (agente → herramienta).",
              "Par–par (agente ↔ agente).",
            ],
            [
              "El otro lado razona",
              "No. Ejecuta acciones determinísticas o expone recursos.",
              "Sí. Planifica, decide, puede delegar a su vez.",
            ],
            [
              "Caso típico",
              "Consultar documentos, inventario, ubicación, póliza, sistema externo.",
              "Delegar a un especialista de riesgo, legal, pricing, compliance, claims.",
            ],
            [
              "Estado de conversación",
              "Stateless por invocación (con session opcional).",
              "Stateful: ambas partes mantienen contexto de la tarea.",
            ],
            [
              "Cuándo prefiero MCP",
              "Operación clara, parametrizable, idempotente, validable.",
              "—",
            ],
            [
              "Cuándo prefiero A2A",
              "—",
              "Cuando la sub-tarea requiere razonamiento propio del otro agente.",
            ],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Ejemplos concretos",
        },
        {
          type: "list",
          items: [
            "Agentforce llama a un MCP server para consultar el estado de un envío en el WMS → es MCP, no necesita razonamiento del otro lado.",
            "Agentforce llama a un MCP server expuesto por MuleSoft para obtener la póliza vigente del cliente → es MCP, herramienta determinística.",
            "Agentforce delega a un agente de riesgo crediticio en Vertex AI que evalúa probabilidad de default → es A2A, el otro lado razona.",
            "Agentforce delega a un agente legal interno que decide si una cláusula es aceptable → es A2A, el especialista tiene su propio criterio.",
            "Agentforce delega a un agente de pricing dinámico que evalúa elasticidad y devuelve oferta → es A2A.",
            "Agentforce consulta un repositorio de conocimiento expuesto por un MCP server con búsqueda semántica → es MCP, recurso de lectura.",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Trampa común",
          text: "Exponer como A2A lo que en realidad es una herramienta. Síntoma: la 'parte agente' del otro lado solo formatea respuestas. Si no hay razonamiento real, es MCP — más simple, más rápido, más auditable. Reserva A2A para cuando el otro lado verdaderamente piensa.",
        },
      ],
    },
    {
      id: "arquitectura-referencia",
      eyebrow: "Parte 5 · Arquitectura",
      title: "Arquitectura de referencia",
      blocks: [
        {
          type: "paragraph",
          text: "Esta es una arquitectura realista para un cliente empresarial donde Salesforce es el actor principal y conviven agentes, herramientas y sistemas externos. El diagrama no muestra todos los productos posibles — muestra los roles y las fronteras de responsabilidad.",
        },
        {
          type: "ascii",
          title: "Vista lógica · Salesforce como actor principal en ecosistema multiagente",
          content: String.raw`
┌──────────────────────────────────────────────────────────────────────────────┐
│  CANALES                                                                     │
│  WhatsApp · Web · App · Portal · Slack · Contact Center · Email · Voz        │
└────────────────────────────────┬─────────────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  AGENTFORCE  ·  Primary Agent (front door · intención · delegación)          │
│  Topics · Actions · Reasoning · Einstein Trust Layer · Audit                 │
└─┬────────────────┬─────────────────────┬──────────────────────┬──────────────┘
  │ A2A            │ A2A                 │ Tools                │ Tools
  ▼                ▼                     ▼                      ▼
┌──────────┐   ┌──────────┐    ┌──────────────────────┐   ┌────────────────────┐
│ Service  │   │ Sales    │    │ Flow · Apex          │   │ Prompt Templates   │
│ Agent    │   │ Agent    │    │ Orchestration        │   │ + Data Cloud RAG   │
│ (SF 2°)  │   │ (SF 2°)  │    │ (proceso determ.)    │   │                    │
└──────────┘   └──────────┘    └─────────┬────────────┘   └────────────────────┘
                                         │
                                         ▼
                              ┌──────────────────────┐
                              │ MULESOFT             │
                              │ · API Mgmt           │
                              │ · Agent Fabric       │
                              │ · MCP Servers        │
                              │ · Policy & Observ.   │
                              │ · Registry/Discovery │
                              └─────────┬────────────┘
                                        │
            ┌───────────────┬───────────┼────────────┬────────────────┐
            ▼               ▼           ▼            ▼                ▼
       ┌─────────┐    ┌──────────┐ ┌─────────┐ ┌──────────┐    ┌──────────────┐
       │ ERP /   │    │ Core     │ │ Billing │ │ Docs /   │    │ Agentes ext. │
       │ Inv.    │    │ Bancario │ │ / WMS   │ │ KB / Leg.│    │ Vertex /     │
       │ Legacy  │    │          │ │         │ │ MCP      │    │ Bedrock /    │
       └─────────┘    └──────────┘ └─────────┘ └──────────┘    │ Azure / Own  │
                                                                └──────────────┘
                                        ▲                              ▲
                                        │ MCP (herramientas)           │ A2A (agentes)
                                        │                              │
┌────────────────────────────────────────┴──────────────────────────────┴──────┐
│  DATA CLOUD  ·  Unified Profile · Data Spaces · Zero Copy · Activation       │
│  Contexto compartido para todos los agentes (interno y externo)              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  GOVERNANCE LAYER  (transversal a todo)                                      │
│  Einstein Trust Layer · Audit Trail · PII Masking · Toxicity Filter ·        │
│  Agent Analytics · Cost & Token Telemetry · Policy Engine · Human-in-Loop    │
└──────────────────────────────────────────────────────────────────────────────┘
`,
        },
        {
          type: "heading",
          level: 3,
          text: "Lectura del diagrama",
        },
        {
          type: "list",
          items: [
            "Los canales convergen en un primary agent en Agentforce. El cliente vive una sola conversación.",
            "El primary delega vía A2A a agentes secundarios de Salesforce por dominio (servicio, ventas, etc.).",
            "Las herramientas determinísticas (Flow, Apex, Prompt Templates) viven dentro de Salesforce y se invocan como tools.",
            "Para acciones que tocan sistemas externos, el agente nunca llama el endpoint corporativo directo: pasa por MuleSoft.",
            "MuleSoft es la capa de gobierno, control y observabilidad para todo lo que cruza la frontera de Salesforce.",
            "Agentes externos (Vertex, Bedrock, Azure, propios) participan vía A2A — colaboran, no son consumidos como APIs.",
            "Data Cloud da contexto unificado a todos los agentes: el agente interno y el externo ven el mismo perfil de cliente.",
            "El Governance Layer es transversal: aplica a Trust Layer dentro de Salesforce y a políticas dentro de MuleSoft.",
            "Human-in-the-loop es explícito en pasos sensibles (no asumido).",
          ],
        },
      ],
    },
    {
      id: "criterios-decision",
      eyebrow: "Parte 6 · Decisión",
      title: "Matriz de decisión: qué patrón recomendar según el escenario",
      blocks: [
        {
          type: "table",
          headers: ["Escenario del cliente", "Patrón recomendado", "Por qué"],
          rows: [
            [
              "Todo el caso vive dentro de Salesforce.",
              "Opción A o B — Agentforce orquesta agentes propios o herramientas.",
              "No hay ecosistema externo significativo; introducir MuleSoft o A2A es sobre-ingeniería.",
            ],
            [
              "Salesforce + sistemas externos vía APIs.",
              "Opción B + MuleSoft como capa de tools.",
              "Necesitas gobierno y reuso de APIs; A2A es prematuro.",
            ],
            [
              "Salesforce + agentes de otras plataformas (Vertex / Bedrock / Azure).",
              "Opción A para Salesforce + A2A para colaborar con externos.",
              "Hay razonamiento del otro lado; A2A respeta autonomía y permite gobernanza.",
            ],
            [
              "El cliente ya tiene un orquestador corporativo.",
              "Opción E — Agentforce headless, invocado vía API/MCP/A2A.",
              "No vale la pena pelear el canal; gana exponiendo capacidades CRM.",
            ],
            [
              "Proceso regulado o financiero.",
              "Opción C — proceso determinístico al mando, agente como componente.",
              "El LLM no puede ser quien decida la transacción; el proceso protege auditoría.",
            ],
            [
              "Cliente con muchos agentes creados por áreas distintas.",
              "Opción D — MuleSoft Agent Fabric como control plane.",
              "Sin gobernanza transversal, el ecosistema se vuelve inmanejable.",
            ],
            [
              "Servicio al cliente conversacional.",
              "Opción A o B sobre Service Cloud + Digital Engagement.",
              "Es el sweet spot de Agentforce: canal, contexto y acción nativos.",
            ],
            [
              "Asistente interno para empleados.",
              "Opción B o E según el cliente. Slack + Agentforce o copiloto corporativo + Agentforce headless.",
              "Depende de dónde viva la productividad del empleado.",
            ],
            [
              "Caso transaccional crítico (pagos, claims, contratos).",
              "Opción C con human-in-the-loop obligatorio.",
              "Riesgo de error alto; el LLM solo asiste, nunca decide la transacción.",
            ],
            [
              "Caso de conocimiento / documentos.",
              "Opción B con Data Cloud RAG y/o MCP server de documentos.",
              "Es razonamiento + lookup; no necesita agentes especialistas externos.",
            ],
          ],
        },
      ],
    },
    {
      id: "recomendaciones",
      eyebrow: "Parte 7 · Recomendaciones",
      title: "Recomendaciones consultivas para clientes empresariales",
      blocks: [
        {
          type: "paragraph",
          text: "Estas recomendaciones funcionan como contrato de diseño. Si una arquitectura propuesta viola tres o más, vale la pena pausar y revisarla — independientemente de la plataforma.",
        },
        {
          type: "cards",
          columns: 2,
          items: [
            {
              eyebrow: "01",
              title: "No crear agentes por moda",
              description:
                "Si la tarea se resuelve con Flow, Apex o un Prompt Template, ahí termina. Un agente añade costo, latencia y superficie de error sin valor proporcional.",
              tone: "primary",
            },
            {
              eyebrow: "02",
              title: "Nunca un mega-agente que lo haga todo",
              description:
                "El primary debe componer, no concentrar. Un agente con 30 topics se vuelve impredecible, difícil de evaluar y de evolucionar.",
              tone: "warn",
            },
            {
              eyebrow: "03",
              title: "Diseñar agentes por dominio",
              description:
                "Servicio, ventas, claims, pricing, legal — cada uno con su agente, su owner, su backlog y su modelo de evaluación.",
              tone: "success",
            },
            {
              eyebrow: "04",
              title: "Definir contratos entre agentes",
              description:
                "Inputs esperados, outputs garantizados, errores manejados, SLA. Si no hay contrato, no hay colaboración estable.",
              tone: "neutral",
            },
            {
              eyebrow: "05",
              title: "Separar razonamiento de ejecución transaccional",
              description:
                "El agente razona y recomienda; el proceso ejecuta y persiste. El LLM no debe ser quien escriba el commit de una transacción crítica.",
              tone: "violet",
            },
            {
              eyebrow: "06",
              title: "Gobernar desde el día uno",
              description:
                "Trust Layer, auditoría, PII masking, telemetría de tokens, métricas de comportamiento. No se agrega después: se diseña desde el primer agente.",
              tone: "primary",
            },
            {
              eyebrow: "07",
              title: "Trazabilidad, ownership y observabilidad",
              description:
                "Cada agente tiene un dueño, cada acción deja huella, cada conversación es auditable. Sin esto, el ecosistema se vuelve frágil bajo escrutinio regulatorio.",
              tone: "neutral",
            },
            {
              eyebrow: "08",
              title: "Humano en el loop donde haya riesgo",
              description:
                "No es debilidad del agente; es diseño responsable. Aprobaciones, escalamientos y revisiones explícitas en pasos sensibles.",
              tone: "warn",
            },
            {
              eyebrow: "09",
              title: "Empezar por alto valor y bajo riesgo",
              description:
                "Servicio asistido, resumen de casos, recomendación al asesor, preparación de reuniones. Allí se construye confianza antes de tocar transacciones críticas.",
              tone: "success",
            },
            {
              eyebrow: "10",
              title: "Evolucionar por niveles de madurez",
              description:
                "Ningún cliente serio llega a Nivel 3 en seis meses. Asume etapas y comunica honestamente cuándo cada capacidad se vuelve realista.",
              tone: "violet",
            },
          ],
        },
      ],
    },
    {
      id: "modelo-madurez",
      eyebrow: "Parte 8 · Madurez",
      title: "Modelo de madurez de tres niveles",
      blocks: [
        {
          type: "paragraph",
          text: "El modelo no es de marketing — es operativo. Ayuda al cliente a entender en qué nivel está, qué capacidades necesita para subir y cuáles son los riesgos de saltar etapas.",
        },
        {
          type: "cards",
          columns: 3,
          items: [
            {
              eyebrow: "Nivel 1 · Foundational",
              title: "Agentforce como agente principal",
              description:
                "Conectado a CRM, Knowledge, Flow y algunas APIs. Un solo agente o un primary con uno o dos secondary. Trust Layer activo. Casos de uso de alto valor y bajo riesgo: servicio asistido, recomendación, resumen.",
              tone: "primary",
            },
            {
              eyebrow: "Nivel 2 · Composable",
              title: "Agentforce orquesta agentes especializados",
              description:
                "Primary + secondary por dominio. Tools robustas vía Flow/Apex/External Services. Data Cloud como contexto compartido. Métricas operativas, evaluación continua, governance del catálogo de topics y actions.",
              tone: "success",
            },
            {
              eyebrow: "Nivel 3 · Ecosystem",
              title: "Ecosistema multiagente gobernado",
              description:
                "MuleSoft Agent Fabric como control plane. MCP para herramientas, A2A para agentes externos. Observabilidad transversal, policy engine, registry, discovery. Agentes propios y de terceros coexisten con seguridad y trazabilidad.",
              tone: "violet",
            },
          ],
        },
        {
          type: "table",
          headers: ["Nivel", "Capacidades clave", "Beneficios", "Riesgos"],
          rows: [
            [
              "1 · Foundational",
              "Agentforce, Trust Layer, Flow/Apex, Data Cloud básico, Knowledge.",
              "Tiempo a valor corto, ROI rápido en servicio/ventas, baja superficie de riesgo.",
              "Quedarse aquí cuando el negocio necesita más; subestimar el cambio organizacional.",
            ],
            [
              "2 · Composable",
              "Primary+secondary, Data Cloud unificado, evaluación, governance interno.",
              "Escalabilidad, ownership por dominio, evolución por roadmap, evaluación continua.",
              "Mega-agente disfrazado, conflictos de topics, deuda técnica si no hay disciplina.",
            ],
            [
              "3 · Ecosystem",
              "MuleSoft Agent Fabric, MCP, A2A, registry, policy engine, observabilidad transversal.",
              "Interoperabilidad real, gobierno corporativo, reuso entre áreas, cumplimiento regulatorio.",
              "Complejidad alta, costo de governance, riesgo de over-engineering si no hay caso real.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Salto típico mal hecho",
          text: "Saltar de Nivel 1 directo a Nivel 3 'porque suena más moderno'. Resultado: control plane sin agentes maduros que gobernar, gasto en MuleSoft Agent Fabric sin ROI, y un equipo abrumado. El nivel 2 — composabilidad sólida dentro de Salesforce — es donde la mayoría debe vivir uno o dos años antes de pensar en ecosistema.",
        },
      ],
    },
    {
      id: "casos-uso",
      eyebrow: "Parte 9 · Casos de uso",
      title: "Ejemplos empresariales concretos",
      blocks: [
        {
          type: "paragraph",
          text: "Casos donde Salesforce orquesta agentes o herramientas con resultado defendible. Cada caso indica el patrón recomendado y por qué.",
        },
        {
          type: "table",
          headers: ["Caso de uso", "Patrón", "Por qué"],
          rows: [
            [
              "Consulta de contratos del cliente",
              "B · Tools + Data Cloud + MCP de documentos",
              "Es razonamiento + lookup; no necesita un segundo agente.",
            ],
            [
              "Cambio de reserva (viajes)",
              "A + C · Primary delega a Servicio, proceso determinístico ejecuta la modificación",
              "Conversación + transacción regulada. El agente conversa; el proceso modifica.",
            ],
            [
              "Atención de reclamos / siniestros",
              "C · Proceso determinístico al mando, agente clasifica e interpreta",
              "Caso regulado con auditoría obligatoria. El LLM no decide el pago.",
            ],
            [
              "Facturación / billing",
              "C · Proceso determinístico, agente solo redacta y explica",
              "Es lógica determinística pura. El LLM aporta solo en la explicación al cliente.",
            ],
            [
              "Loyalty",
              "A + B · Primary + tools de loyalty",
              "Personalización + acción sobre miembro. CRM y loyalty viven en Salesforce.",
            ],
            [
              "Servicio al cliente por WhatsApp",
              "A · Primary Agentforce + secondary por dominio",
              "Caso sweet spot. Canal, contexto y acción nativos.",
            ],
            [
              "Asistente de ventas",
              "A + B · Primary + tools de oportunidad, lead, conocimiento",
              "Aumenta capacidad del vendedor sin reemplazar su criterio.",
            ],
            [
              "Preparación de reuniones",
              "B · Tools sobre cuenta, oportunidad, historial, Data Cloud, MCP de documentos",
              "Razonamiento + síntesis; un solo agente con herramientas.",
            ],
            [
              "Resolución de casos",
              "A · Primary delega a secondary por producto / tipo",
              "Domain-specific reasoning con mantenibilidad.",
            ],
            [
              "Consulta de pólizas",
              "B + D · Tool sobre core de pólizas vía MuleSoft",
              "El core no es Salesforce; MuleSoft gobierna el acceso.",
            ],
            [
              "Pricing / elegibilidad",
              "A + A2A · Primary delega a agente externo de pricing",
              "Si el motor de pricing razona, A2A respeta su autonomía.",
            ],
            [
              "Claims",
              "C + A2A · Proceso determinístico, agente legal externo vía A2A para cláusulas",
              "Regulado en el corazón; razonamiento legal especializado donde aporta.",
            ],
            [
              "Field service",
              "A + B · Agentforce sobre Field Service + tools de scheduling y inventario",
              "Caso nativo de Salesforce con extensiones externas vía MuleSoft.",
            ],
            [
              "Procesos financieros / regulados",
              "C + governance · Proceso al mando, evaluación continua, HITL",
              "Riesgo regulatorio; el LLM solo asiste donde no compromete control.",
            ],
          ],
        },
      ],
    },
    {
      id: "conclusion",
      eyebrow: "Cierre",
      title: "Conclusión",
      blocks: [
        {
          type: "paragraph",
          text: "Una arquitectura multiagente con Salesforce no se evalúa por cuántos agentes tiene ni por qué tan vistoso es el diagrama. Se evalúa por tres preguntas: ¿el cliente recibe una sola experiencia coherente?, ¿el negocio entiende quién es dueño de cada agente y qué garantías ofrece?, ¿el área de tecnología puede auditar, evolucionar y desactivar componentes sin pedir permiso a un proveedor? Si las tres respuestas son sí, la arquitectura está sana — independientemente de su sofisticación.",
        },
        {
          type: "paragraph",
          text: "Salesforce gana cuando el proceso gira alrededor del cliente, el canal y el contexto. Pierde cuando se le pide ser el cerebro de procesos que no son suyos. La elegancia consultiva está en saber cuándo defenderlo como centro y cuándo posicionarlo como participante de primera clase dentro de algo mayor.",
        },
        {
          type: "statement",
          text: "Salesforce debe ser el orquestador de experiencia, contexto y acción cuando el proceso gira alrededor del cliente. Agentforce maneja conversación, intención y delegación a especialistas. MuleSoft es la capa de interoperabilidad, gobierno y observabilidad cuando el ecosistema incluye agentes y herramientas de múltiples plataformas. Data Cloud aporta contexto unificado. Flow y Apex controlan procesos determinísticos. MCP se usa para herramientas. A2A se reserva para colaboración real entre agentes autónomos.",
        },
      ],
    },
    {
      id: "fuentes",
      eyebrow: "Referencias",
      title: "Fuentes oficiales y de alta confiabilidad",
      blocks: [
        {
          type: "paragraph",
          text: "Esta postura está construida sobre documentación oficial y materiales de plataforma. Recomendamos a cualquier arquitecto profundizar directamente en las fuentes — las especificaciones evolucionan rápido y la lectura primaria es la única defensa contra desactualización.",
        },
        {
          type: "sources",
          items: [
            {
              label:
                "Agentforce · Salesforce Help (Topics, Actions, Primary/Secondary Agents)",
              url: "https://help.salesforce.com/s/articleView?id=sf.agentforce.htm",
            },
            {
              label: "Agentforce Developer Guide · Building Agents",
              url: "https://developer.salesforce.com/docs/einstein/genai/guide/agent-overview.html",
            },
            {
              label:
                "Einstein Trust Layer · Architecture and Data Protection",
              url: "https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_layer.htm",
            },
            {
              label: "Data Cloud · Unified Profile and Data Spaces",
              url: "https://help.salesforce.com/s/articleView?id=sf.c360_a_data_cloud.htm",
            },
            {
              label: "MuleSoft Anypoint Platform · API Manager and Governance",
              url: "https://docs.mulesoft.com/general/",
            },
            {
              label: "MuleSoft · Agent Fabric / AI Agents",
              url: "https://www.mulesoft.com/platform/ai-agents",
            },
            {
              label: "Model Context Protocol (MCP) · Specification",
              url: "https://modelcontextprotocol.io/",
            },
            {
              label: "Agent2Agent (A2A) Protocol · Specification",
              url: "https://google.github.io/A2A/",
            },
            {
              label: "Flow Orchestration · Salesforce Help",
              url: "https://help.salesforce.com/s/articleView?id=sf.flow_orchestrator.htm",
            },
            {
              label: "Apex Developer Guide",
              url: "https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/",
            },
            {
              label: "External Services and Named Credentials",
              url: "https://help.salesforce.com/s/articleView?id=sf.external_services.htm",
            },
            {
              label: "Salesforce Architects · Well-Architected Framework",
              url: "https://architect.salesforce.com/well-architected",
            },
          ],
        },
      ],
    },
  ],
};

export const insights: Insight[] = [multiAgent];
