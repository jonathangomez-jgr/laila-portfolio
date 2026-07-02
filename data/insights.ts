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
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      source?: { label: string; url: string };
      tone?: "light" | "dark";
      maxWidth?: "narrow" | "regular" | "wide";
    }
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
  coverImage?: {
    src: string;
    alt: string;
    source?: { label: string; url: string };
  };
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
    "Cuándo Agentforce debe ser el orquestador, cuándo solo el cerebro de experiencia y cuándo conviene posicionarlo como un participante de primera clase dentro de un ecosistema gobernado por MuleSoft, Data Cloud, MCP y A2A. Documento escrito para usted, desde la mirada de un arquitecto técnico en IA y Agentforce.",
  summary:
    "Una arquitectura multiagente que pone a Salesforce en el centro funciona cuando el proceso de su organización gira alrededor del cliente, los datos transaccionales viven en la plataforma y la experiencia se entrega por canales digitales. Fuera de ese eje, Salesforce debe ser un participante de primera clase, no un cerebro forzado. Este documento desarrolla la postura, distingue claramente entre agente, herramienta / acción y proceso, recorre cinco opciones de arquitectura realistas, explica la diferencia entre MCP y A2A, propone una arquitectura de referencia accionable, criterios de decisión, recomendaciones consultivas y un modelo de madurez de tres niveles para su organización.",
  author: "Jonathan Gomez",
  authorRole: "Arquitecto técnico · IA & Agentforce",
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
  coverImage: {
    src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/05/AFDC-Overview-Story-TransformAnyTeam-Complete-Enterprise-Agentic-Platform.webp",
    alt: "Plataforma agéntica empresarial completa de Salesforce: Agentforce sobre Data 360 y Customer 360.",
    source: {
      label: "Salesforce — Agentforce platform overview",
      url: "https://www.salesforce.com/agentforce/",
    },
  },
  sections: [
    {
      id: "resumen-ejecutivo",
      eyebrow: "Statement ejecutivo",
      title: "La tesis en una página",
      blocks: [
        {
          type: "statement",
          text: "Salesforce debe ser el orquestador de experiencia, contexto y acción cuando el proceso de su organización gira alrededor del cliente. Agentforce maneja conversación, intención y delegación a especialistas. MuleSoft es la capa de interoperabilidad, gobierno y observabilidad cuando el ecosistema incluye agentes y herramientas / acciones de múltiples plataformas. Data Cloud aporta contexto unificado. Flow y Apex controlan lo determinístico. MCP se usa para herramientas / acciones. A2A se reserva para colaboración real entre agentes autónomos.",
        },
        {
          type: "paragraph",
          text: "Este documento está escrito desde la mirada de un arquitecto técnico especializado en IA y Agentforce, dirigido a usted como responsable de la decisión — sea un líder de negocio, un CIO o un equipo de arquitectura empresarial. No es un manifiesto de producto. Es una postura consultiva: hay escenarios en los que Salesforce debe ser el cerebro de su arquitectura, otros en los que conviene que sea un especialista invocado por otros agentes, y otros en los que forzarlo como único orquestador sería un error de diseño que pagará caro más adelante. Aquí desarrollamos cuál es cuál y por qué.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Cómo leer este documento",
          text: "Cada sección es autocontenida. Con 5 minutos basta el statement, la postura estratégica y la conclusión. Con 30 minutos recorre las opciones A–E, la arquitectura de referencia y la matriz de decisión. Para llevar la conversación a un comité o a una reunión de negocio, las recomendaciones y el modelo de madurez funcionan como hoja de ruta para su equipo.",
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
          text: "Existen cinco lecturas posibles y todas son válidas en distintos contextos de su organización. El error no es elegir mal entre ellas: es asumir que solo una es correcta para todos los casos de uso. Como arquitecto, mi recomendación es que evalúe cada una de las cinco contra su propio mapa de procesos antes de comprometer una arquitectura objetivo.",
        },
        {
          type: "image",
          src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/05/AFDC-Overview-Story-TransformAnyTeam-Complete-Enterprise-Agentic-Platform.webp",
          alt: "Plataforma agéntica empresarial de Salesforce: Agentforce, Data 360 y Customer 360 como tres capas integradas.",
          caption:
            "La promesa nativa de Salesforce: una sola plataforma donde agentes, datos y CRM comparten contexto, seguridad y observabilidad. Esa es la base sobre la que se discuten las cinco lecturas que siguen.",
          source: {
            label: "Salesforce · Agentforce platform overview",
            url: "https://www.salesforce.com/agentforce/",
          },
          maxWidth: "wide",
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
            "Existe ya un orquestador corporativo (interno, sobre MuleSoft, Camunda, Azure o un hub propio) y su organización decidió que la IA empresarial se gobierna desde ahí.",
            "El caso de uso no es centrado en cliente — por ejemplo, un asistente para ingeniería, devops, finanzas internas o un copiloto de Microsoft 365.",
            "El cliente no tiene una historia de canal en Salesforce y forzar la conversación en Service Cloud sería sobre-ingeniería.",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Honestidad consultiva",
          text: "Como arquitecto, mi trabajo no es defender a Salesforce en todos los escenarios. Es ayudarle a posicionarlo donde claramente gana — y decirle abiertamente dónde es mejor que sea un participante de primera clase dentro de algo mayor. Esa franqueza es lo que protege la inversión de su organización a tres años, no la elegancia del diagrama del día uno.",
        },
      ],
    },
    {
      id: "agente-herramienta-proceso",
      eyebrow: "Parte 2 · Conceptos",
      title: "Agente, herramienta / acción y proceso: tres cosas distintas",
      blocks: [
        {
          type: "paragraph",
          text: "Una de las disciplinas más importantes al diseñar arquitecturas con LLMs es no convertir todo en agente. La mayoría de los problemas que vemos en sus mesas de discovery no necesitan un agente: necesitan una herramienta / acción bien definida, un proceso determinístico o una composición de ambos. Cuándo introducir razonamiento autónomo no es una decisión estética; es una decisión de costo, riesgo y gobernanza que conviene tomar con criterio arquitectónico.",
        },
        {
          type: "callout",
          tone: "note",
          title: "Por qué la terminología importa",
          text: "Aquí usamos 'herramienta / acción' (en lugar de solo 'herramienta') para alinear con la terminología de Agentforce, donde una Action es exactamente eso: una función determinística — Flow, Apex, Prompt Template, External Service, MCP — que el agente puede invocar. Esto deja claro qué la separa de un Proceso: la acción es la unidad de ejecución; el proceso es la orquestación de varias acciones a lo largo del tiempo, con estado, transaccionalidad y reglas de negocio.",
        },
        {
          type: "image",
          src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/05/AFDC-Overview-Story-TransformAnyTeam-Relevant-Accurate-Results.webp",
          alt: "Atlas Reasoning Engine: ciclo de entendimiento, decisión y acción de Agentforce.",
          caption:
            "El motor de razonamiento de Agentforce entiende la intención, decide qué acción invocar y actúa. Ese ciclo es lo que distingue a un agente — y lo que justifica su costo. Si su caso no necesita esos tres pasos, probablemente lo que busca no es un agente, sino una acción o un proceso.",
          source: {
            label: "Salesforce · Atlas Reasoning Engine",
            url: "https://www.salesforce.com/agentforce/",
          },
        },
        {
          type: "table",
          headers: ["Pieza", "Definición operativa", "Cuándo aplica", "Cuándo NO"],
          rows: [
            [
              "Agente",
              "Componente que recibe una intención en lenguaje natural, planifica, decide qué acciones invocar, mantiene contexto y puede delegar a otros agentes.",
              "Cuando la entrada es ambigua, el camino no es predecible y necesita razonamiento, planificación o redacción.",
              "Cuando el proceso es fijo, regulado o el costo de un error semántico del LLM es alto sin supervisión humana.",
            ],
            [
              "Herramienta / Acción",
              "Función determinística que el agente o un proceso invoca: Apex, Flow, Prompt Template, External Service, MCP server, API REST. En Agentforce se modela explícitamente como Action.",
              "Cuando la operación tiene parámetros claros, resultados verificables y reglas de negocio explícitas. Es atómica: una entrada, una salida, sin estado a largo plazo.",
              "Cuando intenta que la acción reemplace al razonamiento o que oculte ambigüedad. Y cuando la operación requiere coordinar varios pasos con estado — eso ya es un proceso.",
            ],
            [
              "Proceso",
              "Orquestación determinística que compone varias acciones a lo largo del tiempo, con estado, transacciones y compensaciones: Flow Orchestration, Apex Queueable, OmniStudio, BPMN, MuleSoft flow.",
              "Procesos regulados, transaccionales, con SLAs, ramas de excepción y necesidad de auditoría punto-a-punto.",
              "Cuando la entrada es naturalmente conversacional y la lógica no se puede codificar como árbol de decisión.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "La diferencia que más se confunde",
          text: "Herramienta / Acción ≠ Proceso. La acción es la unidad atómica que el agente invoca (un Flow simple, un Apex, una llamada a una API). El proceso compone varias acciones con estado, reintentos y reglas — eso ya pide gobernanza de proceso (Flow Orchestration, MuleSoft, BPMN). Mantener esta separación clara en su diseño le ahorra discusiones de ownership y debates de 'esto debería ser un agente' que en realidad eran 'esto debería ser un proceso'.",
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
            "Si la entrada se puede normalizar a parámetros y la salida se valida con reglas, es una herramienta / acción — no un agente.",
            "Si el flujo tiene pasos fijos, transacciones y rollback, es un proceso — Flow o Apex, no LLM.",
            "Si lo único que aporta el LLM es redactar la respuesta final, el supuesto agente es un wrapper sobre Prompt Templates, no un agente autónomo.",
            "Si necesita planificar, descomponer, elegir acciones distintas según el contexto, mantener memoria de la conversación o delegar a otro especialista — entonces sí, es un agente.",
          ],
        },
        {
          type: "callout",
          tone: "critical",
          title: "Anti-patrón frecuente",
          text: "Convertir en agente lo que era un Flow con buenas etiquetas. El resultado es un componente más caro, más lento, más difícil de auditar y con menor cobertura de pruebas que la versión determinística que ya funcionaba en su organización. La regla de oro: si no necesita razonamiento, no pague por razonamiento.",
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
          text: "No hay una única topología correcta. Hay cinco patrones que cubren la mayoría de los escenarios empresariales. Las opciones no son excluyentes: en organizaciones maduras suele convivir una combinación de A + B + C, y las más grandes incorporan D y E para escalar. Le recomiendo leerlas como un menú, no como una secuencia.",
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
          text: "Opción B · Agentforce como orquestador de herramientas / acciones",
        },
        {
          type: "paragraph",
          text: "El agente principal no delega a otros agentes; consume herramientas / acciones — Flow, Apex, Prompt Templates, External Services, MuleSoft API, MCP servers. Es la arquitectura más simple y la que mejor resultado entrega en la mayoría de los casos: una sola superficie conversacional y muchas Actions bien definidas detrás. En el modelo de Agentforce, estas Actions son la unidad de trabajo que el agente conoce, prueba y audita.",
        },
        {
          type: "callout",
          tone: "success",
          title: "Cuándo una acción vence a un agente",
          text: "Cuando la operación es 'consulta este sistema y devuélveme estos campos', 'crea este registro con estos datos', 'calcula esta elegibilidad con estas reglas'. No hay ambigüedad, no hay planificación, no hay razonamiento. Ahí no quiere un agente — quiere una herramienta / acción confiable, idempotente y auditable.",
        },
        {
          type: "list",
          items: [
            "Flow Actions cuando la lógica vive en Salesforce y debe respetar reglas de negocio declarativas.",
            "Apex Invocable Actions cuando hay SOQL/DML complejo, validaciones cruzadas o lógica que ya está implementada en su organización.",
            "Prompt Templates cuando la acción es 'redacta', 'resume', 'clasifica' o 'extrae' usando contexto CRM.",
            "External Services / Named Credentials para APIs corporativas con OpenAPI definido.",
            "MuleSoft API como acción cuando el dato vive fuera de Salesforce y necesita reuso, gobierno y rate limiting transversales.",
            "MCP server como acción cuando la fuente externa expone una superficie estandarizada (documentos, inventario, conocimiento, sistemas legacy con wrapper MCP).",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Opción C · Proceso determinístico al mando, agente como componente inteligente",
        },
        {
          type: "paragraph",
          text: "Aquí Flow, Apex Orchestrator o MuleSoft son los que conducen el proceso, y Agentforce participa solo en los pasos donde se necesita razonamiento: clasificar, redactar, recomendar, interpretar lenguaje natural. El proceso mantiene la transaccionalidad y el agente aporta inteligencia donde aporta valor real. Es la opción que solemos recomendar cuando su organización tiene compromisos regulatorios o transaccionales que no admiten un LLM al volante.",
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
          text: "Cuando su organización tiene muchos agentes — propios y de terceros — la conversación deja de ser 'qué agente uso' y pasa a ser 'cómo los gobierno'. Ahí entra MuleSoft como capa transversal: registro de agentes y herramientas / acciones, descubrimiento, control de acceso, observabilidad, métricas, políticas de uso y rate limiting. En 2025 Salesforce posicionó esta capa con MuleSoft Agent Fabric y el soporte de MCP server en Anypoint.",
        },
        {
          type: "image",
          src: "https://www.salesforce.com/news/wp-content/uploads/sites/3/2025/09/MuleSoft-Visualizer_UPDATED.png?w=1024",
          alt: "MuleSoft Agent Visualizer: mapa visual de la red de agentes con interacciones, dependencias y flujos de decisión.",
          caption:
            "MuleSoft Agent Visualizer le da al arquitecto un mapa en tiempo real de cómo interactúan los agentes, qué dependencias tienen y dónde están los cuellos de botella. Sin esta visibilidad, el ecosistema multiagente se vuelve una caja negra costosa.",
          source: {
            label: "Salesforce News · MuleSoft Agent Fabric",
            url: "https://www.salesforce.com/news/press-releases/2025/05/28/mulesoft-agent-fabric-announcement/",
          },
          maxWidth: "wide",
        },
        {
          type: "image",
          src: "https://www.salesforce.com/news/wp-content/uploads/sites/3/2025/09/MuleSoft-Agent-Broker_UPDATED.png?w=1024",
          alt: "MuleSoft Agent Broker: enrutamiento dinámico de tareas hacia los agentes y MCP servers más adecuados.",
          caption:
            "MuleSoft Agent Broker estructura agentes y MCP servers en dominios de negocio y rutea cada solicitud al mejor agente o herramienta disponible. Es el ‘policy & discovery layer’ que permite escalar de tres agentes a treinta sin perder gobernanza.",
          source: {
            label: "Salesforce News · MuleSoft Agent Fabric",
            url: "https://www.salesforce.com/news/press-releases/2025/05/28/mulesoft-agent-fabric-announcement/",
          },
          maxWidth: "wide",
        },
        {
          type: "list",
          items: [
            "Registry: catálogo único de agentes y MCP servers disponibles, con metadata de dominio, owner, versión y SLA.",
            "Discovery: cómo un agente encuentra otro agente o una herramienta / acción sin acoplarse a su endpoint físico.",
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
          text: "En la mayoría de los proyectos que vemos, los equipos inician sin esta capa y la introducen cuando llegan al tercer o cuarto agente y se les hace inmanejable la gobernanza. Mi recomendación: si su roadmap apunta a más de tres agentes en dos años, planee esta capa desde el día uno, aunque no se construya completa en la primera ola.",
        },
        {
          type: "heading",
          level: 3,
          text: "Opción E · Agentforce como agente headless invocado desde otro orquestador",
        },
        {
          type: "paragraph",
          text: "Su organización ya tiene un orquestador corporativo, un copiloto de Microsoft, un asistente en Vertex AI o un hub propio. Salesforce no controla el canal — pero sí los datos CRM, los procesos transaccionales y los objetos de negocio. La respuesta correcta no es pelear el canal: es exponer Agentforce como un agente especializado invocable, a través de Agentforce API, MCP server o A2A.",
        },
        {
          type: "cards",
          columns: 2,
          items: [
            {
              eyebrow: "Vía Agentforce API",
              title: "Invocación directa al agente",
              description:
                "Un orquestador externo llama al agente con sesiones autenticadas y consume su respuesta. Útil cuando su organización quiere mantener su shell pero usar el cerebro CRM.",
              tone: "primary",
            },
            {
              eyebrow: "Vía MCP server",
              title: "Salesforce como herramienta / acción estandarizada",
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
                "Su organización pierde la oportunidad de unificar canal y datos. Útil técnicamente, pero obliga a una conversación de negocio honesta sobre dónde vive realmente la experiencia.",
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
              title: "Agente ↔ Herramienta / Acción",
              description:
                "Estandariza cómo un agente descubre, autentica y consume herramientas / acciones, recursos y prompts expuestos por un servidor. Es 'USB-C para agentes': el agente pide; el servidor responde. No hay razonamiento del otro lado.",
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
              "Cliente–servidor (agente → herramienta / acción).",
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
            "Agentforce llama a un MCP server expuesto por MuleSoft para obtener la póliza vigente del cliente → es MCP, herramienta / acción determinística.",
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
          text: "Exponer como A2A lo que en realidad es una herramienta / acción. Síntoma: la 'parte agente' del otro lado solo formatea respuestas. Si no hay razonamiento real, es MCP — más simple, más rápido, más auditable. Reserve A2A para cuando el otro lado verdaderamente piensa.",
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
          text: "Esta arquitectura de referencia está pensada para una organización empresarial donde Salesforce es el actor principal y conviven agentes, herramientas / acciones y sistemas externos. El diagrama no muestra todos los productos posibles — muestra los roles y las fronteras de responsabilidad. Le sugiero usarlo como base para mapear su propia realidad antes de elegir su arquitectura objetivo.",
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
          type: "paragraph",
          text: "Use esta matriz como filtro inicial al evaluar un caso de uso concreto en su organización. Identifique el escenario que más se parezca al suyo y empiece la conversación de arquitectura desde el patrón recomendado, en lugar de partir desde una página en blanco.",
        },
        {
          type: "table",
          headers: ["Escenario de su organización", "Patrón recomendado", "Por qué"],
          rows: [
            [
              "Todo el caso vive dentro de Salesforce.",
              "Opción A o B — Agentforce orquesta agentes propios o herramientas / acciones.",
              "No hay ecosistema externo significativo; introducir MuleSoft o A2A sería sobre-ingeniería.",
            ],
            [
              "Salesforce + sistemas externos vía APIs.",
              "Opción B + MuleSoft como capa de tools / acciones.",
              "Necesita gobierno y reuso de APIs; A2A todavía es prematuro.",
            ],
            [
              "Salesforce + agentes de otras plataformas (Vertex / Bedrock / Azure).",
              "Opción A para Salesforce + A2A para colaborar con externos.",
              "Hay razonamiento del otro lado; A2A respeta autonomía y permite gobernanza.",
            ],
            [
              "Su organización ya tiene un orquestador corporativo.",
              "Opción E — Agentforce headless, invocado vía API/MCP/A2A.",
              "No vale la pena pelear el canal; gana exponiendo capacidades CRM.",
            ],
            [
              "Proceso regulado o financiero.",
              "Opción C — proceso determinístico al mando, agente como componente.",
              "El LLM no puede ser quien decida la transacción; el proceso protege auditoría.",
            ],
            [
              "Muchos agentes creados por áreas distintas dentro de su organización.",
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
              "Opción B o E según su realidad: Slack + Agentforce, o copiloto corporativo + Agentforce headless.",
              "Depende de dónde viva la productividad del empleado en su día a día.",
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
      title: "Recomendaciones consultivas para su organización",
      blocks: [
        {
          type: "paragraph",
          text: "Estas recomendaciones funcionan como contrato de diseño y, también, como brújula para una conversación de negocio. Si una propuesta concreta para su organización rompe tres o más, vale la pena pausarla y revisarla — sea cual sea la plataforma o el proveedor que la presente.",
        },
        {
          type: "image",
          src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/05/AFDC-Overview-Story-TransformAnyTeam-Trust-Guardrails.webp",
          alt: "Einstein Trust Layer y guardrails de Agentforce: capas de protección de datos, masking de PII y políticas de uso.",
          caption:
            "Einstein Trust Layer y los guardrails de Agentforce dan auditoría, masking de PII y políticas de uso ‘de fábrica’. Por eso la recomendación 06 — gobernar desde el día uno — no es opcional: la gobernanza no se agrega después, se diseña desde el primer agente.",
          source: {
            label: "Salesforce · Einstein Trust Layer",
            url: "https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_layer.htm",
          },
        },
        {
          type: "cards",
          columns: 2,
          items: [
            {
              eyebrow: "01",
              title: "No crear agentes por moda",
              description:
                "Si la tarea se resuelve con una herramienta / acción (Flow, Apex, Prompt Template), ahí termina. Un agente añade costo, latencia y superficie de error sin valor proporcional.",
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
                "Ninguna organización seria llega a Nivel 3 en seis meses. Defina etapas y comunique honestamente al negocio cuándo cada capacidad se vuelve realista para su realidad.",
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
          text: "Este modelo no es de marketing — es operativo. Le ayuda a entender en qué nivel está hoy su organización, qué capacidades necesita para subir y cuáles son los riesgos de saltar etapas.",
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
                "Primary + secondary por dominio. Herramientas / acciones robustas vía Flow/Apex/External Services. Data Cloud como contexto compartido. Métricas operativas, evaluación continua, governance del catálogo de topics y actions.",
              tone: "success",
            },
            {
              eyebrow: "Nivel 3 · Ecosystem",
              title: "Ecosistema multiagente gobernado",
              description:
                "MuleSoft Agent Fabric como control plane. MCP para herramientas / acciones, A2A para agentes externos. Observabilidad transversal, policy engine, registry, discovery. Agentes propios y de terceros coexisten con seguridad y trazabilidad.",
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
          text: "Saltar de Nivel 1 directo a Nivel 3 'porque suena más moderno'. Resultado: control plane sin agentes maduros que gobernar, gasto en MuleSoft Agent Fabric sin ROI y un equipo abrumado. El nivel 2 — composabilidad sólida dentro de Salesforce — es donde la mayoría de las organizaciones deben vivir uno o dos años antes de pensar en ecosistema.",
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
          text: "Casos típicos donde Salesforce orquesta agentes o herramientas / acciones con resultado defendible. Cada uno indica el patrón recomendado y por qué — para que pueda contrastarlos con los suyos.",
        },
        {
          type: "table",
          headers: ["Caso de uso", "Patrón", "Por qué"],
          rows: [
            [
              "Consulta de contratos del cliente",
              "B · Acciones + Data Cloud + MCP de documentos",
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
              "A + B · Primary + acciones de loyalty",
              "Personalización + acción sobre miembro. CRM y loyalty viven en Salesforce.",
            ],
            [
              "Servicio al cliente por WhatsApp",
              "A · Primary Agentforce + secondary por dominio",
              "Caso sweet spot. Canal, contexto y acción nativos.",
            ],
            [
              "Asistente de ventas",
              "A + B · Primary + acciones de oportunidad, lead, conocimiento",
              "Aumenta capacidad del vendedor sin reemplazar su criterio.",
            ],
            [
              "Preparación de reuniones",
              "B · Acciones sobre cuenta, oportunidad, historial, Data Cloud, MCP de documentos",
              "Razonamiento + síntesis; un solo agente con herramientas / acciones.",
            ],
            [
              "Resolución de casos",
              "A · Primary delega a secondary por producto / tipo",
              "Domain-specific reasoning con mantenibilidad.",
            ],
            [
              "Consulta de pólizas",
              "B + D · Acción sobre core de pólizas vía MuleSoft",
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
              "A + B · Agentforce sobre Field Service + acciones de scheduling y inventario",
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
          text: "Una arquitectura multiagente con Salesforce no se evalúa por cuántos agentes tiene ni por qué tan vistoso es el diagrama. Se evalúa por tres preguntas que, como arquitecto, le invito a hacerse cuando reciba cualquier propuesta: ¿su cliente final recibe una sola experiencia coherente?, ¿su negocio entiende quién es dueño de cada agente y qué garantías ofrece?, ¿su área de tecnología puede auditar, evolucionar y desactivar componentes sin pedir permiso a un proveedor? Si las tres respuestas son sí, la arquitectura está sana — independientemente de su sofisticación.",
        },
        {
          type: "paragraph",
          text: "Salesforce gana cuando el proceso de su organización gira alrededor del cliente, el canal y el contexto. Pierde cuando se le pide ser el cerebro de procesos que no son suyos. La elegancia consultiva está en saber cuándo defenderlo como centro y cuándo posicionarlo como participante de primera clase dentro de algo mayor.",
        },
        {
          type: "statement",
          text: "Salesforce debe ser el orquestador de experiencia, contexto y acción cuando el proceso gira alrededor del cliente. Agentforce maneja conversación, intención y delegación a especialistas. MuleSoft es la capa de interoperabilidad, gobierno y observabilidad cuando el ecosistema incluye agentes y herramientas / acciones de múltiples plataformas. Data Cloud aporta contexto unificado. Flow y Apex controlan procesos determinísticos. MCP se usa para herramientas / acciones. A2A se reserva para colaboración real entre agentes autónomos.",
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
          text: "Esta postura está construida sobre documentación oficial y materiales de plataforma. Quien quiera profundizar puede ir directamente a las fuentes: las especificaciones evolucionan rápido y la lectura primaria es la mejor defensa contra desactualización.",
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

const customerFeedback: Insight = {
  slug: "customer-feedback-strategy-salesforce",
  topic: "Customer Feedback",
  audience: ["executive", "architect", "deep"],
  heroEyebrow: "Postura técnica · Voz del cliente",
  title:
    "Estrategia de Customer Feedback con Salesforce: de la encuesta puntual al sistema continuo de voz del cliente",
  subtitle:
    "Cómo combinar Surveys, Feedback Management, Customer Signals Intelligence y Agentforce for Service para pasar de medir satisfacción a actuar sobre la experiencia. Documento escrito para usted, desde la mirada de un arquitecto técnico en IA y Agentforce.",
  summary:
    "Capturar feedback hoy no es enviar una encuesta — es operar un sistema continuo que combina señales activas (encuestas) y pasivas (sentiment) a lo largo de todo el ciclo del cliente, las analiza con IA, las conecta al perfil unificado y dispara acciones reales en el CRM. Salesforce ofrece tres bloques vigentes que, bien combinados, cubren todo el espectro: Salesforce Surveys (incluido en Service Cloud), Feedback Management (add-on) y Customer Signals Intelligence (consumo). Sobre eso, una estrategia consultiva — qué medir, cuándo medir, cómo no quemar al cliente con encuestas y cómo cerrar el loop — define si la inversión genera valor real o si se convierte en otra carpeta de dashboards que nadie mira.",
  author: "Jonathan Gomez",
  authorRole: "Arquitecto técnico · IA & Agentforce",
  publishedAt: "2026-06-26",
  updatedAt: "2026-06-26",
  readingMinutes: 24,
  tags: [
    "Feedback Management",
    "Salesforce Surveys",
    "Customer Signals",
    "Agentforce",
    "CSAT",
    "NPS",
    "Sentiment",
    "Voice of Customer",
  ],
  coverImage: {
    src: "https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/05/AFDC-Overview-Story-TransformAnyTeam-Trust-Guardrails.webp",
    alt: "Capa de confianza y observabilidad de Agentforce, base sobre la que se gobiernan los datos de feedback del cliente.",
    source: {
      label: "Salesforce · Agentforce / Trust Layer",
      url: "https://www.salesforce.com/agentforce/",
    },
  },
  sections: [
    {
      id: "resumen",
      eyebrow: "Statement ejecutivo",
      title: "La tesis en una página",
      blocks: [
        {
          type: "statement",
          text: "Una estrategia de Customer Feedback madura combina señales activas (encuestas) y pasivas (sentiment de interacciones) a lo largo del ciclo del cliente, las unifica con el perfil 360, las analiza con IA y cierra el loop con acciones en el CRM. En Salesforce eso se construye sobre tres bloques vigentes: Salesforce Surveys (incluido), Feedback Management (add-on Starter o Growth) y Customer Signals Intelligence (consumo). La parte difícil no es comprar la licencia — es decidir qué medir, en qué momento, cómo evitar la fatiga de encuestas, y cómo asegurarse de que cada respuesta dispare una acción.",
        },
        {
          type: "paragraph",
          text: "Este documento está escrito desde la mirada de un arquitecto técnico especializado en IA y Agentforce, dirigido a usted como responsable de la decisión — sea un líder de CX, un director de servicio, un CMO o un equipo de arquitectura. No vengo a venderle encuestas: vengo a ayudarle a diseñar un sistema de voz del cliente que su organización pueda operar, medir y evolucionar durante años.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Cómo leer este documento",
          text: "Con 5 minutos basta el statement, el mapa de productos y la conclusión. Con 25 minutos recorre los siete momentos del ciclo, la diferencia entre señales activas y pasivas, las recomendaciones consultivas, el modelo de madurez y las trampas más comunes que vemos en campo.",
        },
      ],
    },
    {
      id: "por-que-hoy",
      eyebrow: "Parte 1 · Contexto",
      title: "Por qué la conversación de Customer Feedback cambió",
      blocks: [
        {
          type: "paragraph",
          text: "Durante años, capturar la experiencia del cliente significó enviarle una encuesta NPS al final del trimestre y agregar los resultados en un PowerPoint. Ese modelo no escala, no es accionable y, peor, le pide al cliente trabajo sin devolverle nada. Lo que cambió en los últimos dos años — y por qué esta entrada existe — es que ya tenemos las piezas para hacerlo distinto: encuestas dinámicas asistidas por IA, análisis de sentimiento sobre cada interacción, perfil unificado del cliente en Data Cloud y agentes que pueden actuar sobre lo que la voz del cliente revela.",
        },
        {
          type: "callout",
          tone: "warning",
          title: "El problema que casi todas las organizaciones tienen",
          text: "Encuestas dispersas en tres herramientas distintas, sin trazabilidad al cliente, con tasas de respuesta cayendo, sin conexión al CRM, sin disparo de acciones cuando la respuesta es mala. Resultado: la dirección recibe un NPS agregado, pero el agente de servicio no sabe que su cliente de hoy lleva tres encuestas mal calificadas en un mes. Eso es exactamente lo que esta estrategia busca evitar.",
        },
        {
          type: "list",
          items: [
            "Tasas de respuesta a encuestas en caída: el cliente no diferencia entre una encuesta corporativa y un spam.",
            "Métricas agregadas (NPS, CSAT, CES) que no se conectan al registro del cliente — imposible accionarlas a nivel individual.",
            "Análisis de comentarios abiertos que vive en una hoja de cálculo, no en el CRM — los temas críticos se pierden.",
            "Falta de coordinación entre 'medir' y 'actuar': las áreas que envían encuestas no son las mismas que pueden cerrar el loop.",
          ],
        },
      ],
    },
    {
      id: "que-ofrece-salesforce",
      eyebrow: "Parte 2 · Productos vigentes",
      title: "Qué ofrece hoy Salesforce para capturar la experiencia del cliente",
      blocks: [
        {
          type: "paragraph",
          text: "Antes de hablar de estrategia, conviene aclarar qué piezas tiene Salesforce hoy en producción y cuál es el rol de cada una. Existen tres bloques vigentes — más una capa transversal de inteligencia — que cubren el espectro completo de Customer Feedback.",
        },
        {
          type: "cards",
          columns: 3,
          items: [
            {
              eyebrow: "Bloque 1 · Base incluida",
              title: "Salesforce Surveys",
              description:
                "Capacidad de encuestas básica incluida con Service Cloud y otras ediciones. Permite crear encuestas, distribuirlas por email, comunidad o link directo, y registrar las respuestas como objetos estándar en el CRM. Ideal para empezar a medir sin licencia adicional.",
              tone: "success",
            },
            {
              eyebrow: "Bloque 2 · Add-on Feedback Management",
              title: "Salesforce Feedback Management",
              description:
                "Add-on profesional con dos niveles: Starter y Growth. Habilita encuestas dinámicas asistidas por IA, traducción a 18 idiomas, summarization, merge fields personalizados, Data Mapper para automatizar acciones, Customer Lifecycle Maps (en Growth) y los dashboards de Customer Lifecycle Analytics.",
              tone: "primary",
            },
            {
              eyebrow: "Bloque 3 · Consumo",
              title: "Customer Signals Intelligence",
              description:
                "Captura sentimiento y señales pasivas de cada interacción de servicio 24/7, sin pedirle nada al cliente. Genera Experience Signals que alimentan los mismos dashboards y el contexto de Agentforce. Modelo de consumo, no de suscripción.",
              tone: "violet",
            },
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "Cómo se relacionan",
          text: "Surveys es la base; Feedback Management es la herramienta profesional que la mayoría de las organizaciones empresariales necesitan; Customer Signals Intelligence agrega la dimensión pasiva (sentimiento de interacciones) que las encuestas por sí solas nunca capturarán. Agentforce for Service es la capa transversal que resume issues, sugiere acciones y entrega guía a los representantes y a la dirección — funciona encima de los tres bloques anteriores.",
        },
        {
          type: "heading",
          level: 3,
          text: "Capacidades clave de Salesforce Feedback Management (vigentes)",
        },
        {
          type: "list",
          items: [
            "AI Survey Generation — generación de encuestas adaptadas al público, industria y objetivos del negocio.",
            "AI Survey Translation — traducción automática a 18 idiomas para encuestas multinacionales.",
            "AI Survey Summarization — resúmenes individuales o por grupo para extraer insights sin leer respuesta por respuesta.",
            "Dynamic Surveys — encuestas con ramificación condicional en tiempo real según las respuestas previas.",
            "Data Mapper — workflows no-code para automatizar follow-up de casos, escalaciones y disparos en el CRM.",
            "Merge Fields — personalización con datos del CRM (número de caso, agente que atendió, producto, etc.).",
            "Customer Lifecycle Analytics — dashboards prebuilt de CSAT y NPS a lo largo del journey del cliente.",
            "Customer Lifecycle Maps (Growth tier) — mapeo de momentos clave del ciclo del cliente con disparo automático de encuestas.",
            "Intelligent Survey Reminders — recordatorios adaptativos según el nivel de engagement de cada participante.",
            "Prebuilt Reports & Dashboards — biblioteca de reportes listos para usar.",
            "My Service Journey — guía de mejores prácticas de implementación.",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Capacidades de Customer Signals Intelligence",
        },
        {
          type: "list",
          items: [
            "AI-Powered Sentiment Analytics — análisis continuo del sentimiento de cada interacción de servicio.",
            "24/7 Omnichannel Sentiment Analysis — análisis transversal de canales, no solo de un canal aislado.",
            "Customer Experience Analytics out-of-the-box — patrones surgidos automáticamente, sin construir reportes a mano.",
            "AI-Powered Recommendations and Actions — sugerencias de próximo paso integradas al Service Console.",
            "Agentforce for Service — summarization de issues, generación de artículos de Knowledge, guía a representantes y líderes.",
            "Customer 360 Data — integración nativa con el perfil unificado: el sentiment vive junto al historial de engagement y a las respuestas de encuesta.",
          ],
        },
        {
          type: "table",
          headers: ["Producto", "Tipo de señal", "Modelo comercial", "Cuándo es el adecuado"],
          rows: [
            [
              "Salesforce Surveys",
              "Activa (el cliente responde).",
              "Incluido con Service Cloud (y otras ediciones).",
              "Punto de partida cuando el feedback es esporádico, simple y no requiere ramificación dinámica ni IA.",
            ],
            [
              "Feedback Management — Starter",
              "Activa, dinámica, multicanal.",
              "Add-on por org/mes + Survey Response Pack por consumo.",
              "Organizaciones que necesitan encuestas profesionales, dinámicas, post-chat y dashboards listos.",
            ],
            [
              "Feedback Management — Growth",
              "Activa + lifecycle journey orquestado.",
              "Add-on por org/mes (tier superior).",
              "Cuando se opera un journey completo con Customer Lifecycle Maps y volumen alto de respuestas.",
            ],
            [
              "Customer Signals Intelligence",
              "Pasiva (sentiment de cada interacción).",
              "Consumo por Experience Signals.",
              "Cuando ya hay flujo conversacional alto en Service Cloud y se quiere medir sin pedir nada al cliente.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Una nota sobre licenciamiento",
          text: "Los modelos comerciales evolucionan. Antes de tomar cualquier decisión, valide la lista de precios y SKUs vigentes con su cuenta de Salesforce: lo que aquí se describe es la combinación funcional, no una propuesta comercial. El valor estratégico está en cómo combina las piezas, no en cuál SKU compra primero.",
        },
      ],
    },
    {
      id: "senales-activas-pasivas",
      eyebrow: "Parte 3 · Modelo conceptual",
      title: "Señales activas y señales pasivas: por qué necesita ambas",
      blocks: [
        {
          type: "paragraph",
          text: "Toda estrategia de feedback se mueve en dos ejes. Las señales activas son las que su organización solicita explícitamente (encuestas, NPS, CSAT, CES, feedback in-app). Las señales pasivas son las que el cliente emite sin saber que las está emitiendo (tono de la llamada, lenguaje del chat, tiempo de resolución, abandono del journey). Una sola dimensión nunca alcanza.",
        },
        {
          type: "cards",
          columns: 2,
          items: [
            {
              eyebrow: "Señales activas",
              title: "Encuestas — voz declarada",
              description:
                "El cliente responde lo que dice pensar. Son específicas, controladas y permiten comparación estructurada (NPS, CSAT, CES). Costo: la fatiga si abusa de ellas. Limitación: el cliente que más sufre rara vez responde.",
              tone: "primary",
            },
            {
              eyebrow: "Señales pasivas",
              title: "Sentiment — voz observada",
              description:
                "Captura sentimiento desde llamadas, chats, emails y casos. No requiere acción del cliente. Costo: no se pueden hacer preguntas específicas. Limitación: necesita volumen y calidad de transcripción.",
              tone: "violet",
            },
          ],
        },
        {
          type: "callout",
          tone: "success",
          title: "La combinación que sí funciona",
          text: "Use señales pasivas (Customer Signals Intelligence) para detectar quién necesita atención y por qué. Use señales activas (Feedback Management) para confirmar la hipótesis con el cliente y para medir el cierre del loop. Cuando ambas se cruzan en el mismo perfil, el agente de servicio y la dirección ven la misma realidad — y pueden actuar sin pelear con interpretaciones distintas.",
        },
      ],
    },
    {
      id: "siete-momentos",
      eyebrow: "Parte 4 · Diseño del ciclo",
      title: "Los siete momentos donde tiene sentido capturar feedback",
      blocks: [
        {
          type: "paragraph",
          text: "Una estrategia de Customer Feedback no es 'mandar más encuestas'. Es elegir bien los momentos. Estos son los siete que cubren al menos el 80% del valor en una organización empresarial. Cada uno tiene una métrica de referencia, un canal sugerido y un disparador natural dentro del CRM.",
        },
        {
          type: "table",
          headers: ["Momento", "Métrica típica", "Canal sugerido", "Disparo en Salesforce"],
          rows: [
            [
              "Post-interacción de servicio (caso cerrado)",
              "CSAT + CES",
              "Email, post-chat survey, SMS",
              "Workflow al cerrar el caso · Customer Lifecycle Map con Data Mapper.",
            ],
            [
              "Post-onboarding (primeros 30–60 días)",
              "Onboarding Score + comentario abierto",
              "Email + in-app",
              "Customer Lifecycle Map al alcanzar hito de onboarding.",
            ],
            [
              "Post-compra / post-entrega",
              "CSAT producto + recomendación",
              "Email, WhatsApp, in-app",
              "Disparo al cambiar estado de pedido a 'Entregado'.",
            ],
            [
              "Renewal / aniversario de contrato",
              "Relationship NPS",
              "Email programado",
              "Customer Lifecycle Map en fecha aniversario.",
            ],
            [
              "Churn anunciado o detectado",
              "Exit survey + razón estructurada",
              "Email + entrevista cualitativa",
              "Disparo cuando la oportunidad cambia a 'Closed Lost' o el cliente pide cancelar.",
            ],
            [
              "Eventos críticos (incidente, escalación, queja)",
              "Recovery survey",
              "Email + llamada de seguimiento",
              "Disparo desde Case con severidad alta o desde escalación.",
            ],
            [
              "Relacional periódica (semestral / anual)",
              "Relationship NPS + drivers",
              "Email, in-app",
              "Customer Lifecycle Map con ventana configurable, respetando fatiga.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Regla práctica de fatiga",
          text: "Un cliente no debería recibir más de una encuesta cada 30–45 días, salvo eventos críticos que justifiquen una recovery survey adicional. Las Intelligent Survey Reminders de Feedback Management ayudan, pero no reemplazan la disciplina de no sobre-medir. Si su estrategia genera tres encuestas por mes al mismo cliente, no tiene estrategia: tiene spam corporativo.",
        },
      ],
    },
    {
      id: "arquitectura-referencia",
      eyebrow: "Parte 5 · Arquitectura",
      title: "Arquitectura de referencia de Customer Feedback",
      blocks: [
        {
          type: "paragraph",
          text: "Esta es una arquitectura realista para una organización empresarial que decide operar Customer Feedback como un sistema continuo, no como un proyecto de encuestas. El diagrama muestra roles y fronteras de responsabilidad — no productos puntuales.",
        },
        {
          type: "ascii",
          title: "Vista lógica · Customer Feedback como sistema continuo",
          content: String.raw`
┌──────────────────────────────────────────────────────────────────────────────┐
│  TOUCHPOINTS  ·  Donde el cliente interactúa                                 │
│  Web · App · Email · WhatsApp · Chat · Voz · Tienda · Field · Portal         │
└────────────────────────────────┬─────────────────────────────────────────────┘
                                 │
            ┌────────────────────┴────────────────────┐
            ▼                                         ▼
┌──────────────────────────┐               ┌──────────────────────────┐
│  SEÑALES ACTIVAS         │               │  SEÑALES PASIVAS         │
│  Salesforce Surveys      │               │  Customer Signals        │
│  Feedback Management     │               │  Intelligence            │
│  · AI Survey Gen/Trans   │               │  · Sentiment 24/7        │
│  · Dynamic + Merge       │               │  · Omnichannel           │
│  · Lifecycle Maps        │               │  · Experience Signals    │
└────────────┬─────────────┘               └────────────┬─────────────┘
             │                                          │
             └──────────────────┬───────────────────────┘
                                ▼
                ┌──────────────────────────────────┐
                │  DATA CLOUD  ·  Perfil unificado │
                │  Survey responses + Sentiment +  │
                │  Engagement history + CRM data   │
                └──────────────┬───────────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
       ┌────────────┐   ┌────────────┐   ┌────────────────┐
       │ Agentforce │   │ Customer   │   │ Service Cloud  │
       │ for        │   │ Lifecycle  │   │ + Data Mapper  │
       │ Service    │   │ Analytics  │   │ (cerrar loop)  │
       │ summariza  │   │ CSAT · NPS │   │ acciones reales│
       │ recomienda │   │ trends     │   │ en el CRM      │
       └────────────┘   └────────────┘   └────────────────┘
                               │
                               ▼
                ┌──────────────────────────────────┐
                │  ACCIÓN  ·  Cierre del loop      │
                │  Caso · Tarea · Escalación ·     │
                │  Journey de recuperación · KPI   │
                └──────────────────────────────────┘
`,
        },
        {
          type: "list",
          items: [
            "Los touchpoints son cualquier canal donde el cliente interactúa — algunos generan señales activas, otros pasivas, varios ambas.",
            "Las señales activas pasan por Surveys o Feedback Management. Las pasivas son producidas continuamente por Customer Signals Intelligence.",
            "Ambas convergen en Data Cloud como perfil unificado — el sentiment de la llamada de ayer vive junto al CSAT de la encuesta de la semana pasada.",
            "Agentforce for Service consume el perfil para resumir, recomendar y entregar guía al agente humano y a la dirección.",
            "Customer Lifecycle Analytics es la vista ejecutiva — CSAT y NPS por canal, por momento del ciclo, por industria.",
            "El cierre del loop ocurre en el CRM: Data Mapper convierte una respuesta mala en un caso, una tarea o una journey de recuperación.",
          ],
        },
      ],
    },
    {
      id: "buenas-practicas",
      eyebrow: "Parte 6 · Buenas prácticas",
      title: "Diez recomendaciones consultivas para su estrategia",
      blocks: [
        {
          type: "paragraph",
          text: "Estas diez recomendaciones funcionan como contrato de diseño y como brújula para una conversación con su comité ejecutivo. Si su programa actual rompe tres o más, vale la pena pausarlo y rediseñarlo antes de seguir invirtiendo en licencias adicionales.",
        },
        {
          type: "cards",
          columns: 2,
          items: [
            {
              eyebrow: "01",
              title: "Mida solo lo que vaya a accionar",
              description:
                "Antes de lanzar una pregunta, defina quién hará algo distinto si la respuesta sale mal. Si nadie hace nada, la pregunta sobra — y le cuesta credibilidad con el cliente.",
              tone: "primary",
            },
            {
              eyebrow: "02",
              title: "Diseñe el cierre del loop antes que la encuesta",
              description:
                "Una respuesta de 2/5 debería disparar un caso, una llamada o una journey de recuperación. Use Data Mapper para automatizarlo desde el día uno — no a los seis meses.",
              tone: "primary",
            },
            {
              eyebrow: "03",
              title: "No mezcle relacional con transaccional",
              description:
                "Un Relationship NPS pregunta por la marca. Un CSAT post-interacción pregunta por el caso. Confundirlos contamina las métricas y desorienta al cliente.",
              tone: "neutral",
            },
            {
              eyebrow: "04",
              title: "Cuide la fatiga como cuida la conversión",
              description:
                "Aplique una regla de exclusión: máximo una encuesta cada 30–45 días por cliente, salvo evento crítico. Documente quién no encuestar (clientes inactivos, vips en riesgo, etc.).",
              tone: "warn",
            },
            {
              eyebrow: "05",
              title: "Trabaje con preguntas cortas y ramificación",
              description:
                "Las Dynamic Surveys de Feedback Management permiten que la encuesta cambie según la respuesta. Empiece con dos preguntas — luego profundice solo si la respuesta lo amerita.",
              tone: "success",
            },
            {
              eyebrow: "06",
              title: "Combine activo + pasivo desde el inicio",
              description:
                "No espere a estar 'maduro' en Surveys para empezar con Signals. El valor real está en cruzar ambos sobre el mismo perfil — y eso se diseña, no se improvisa.",
              tone: "violet",
            },
            {
              eyebrow: "07",
              title: "Use IA para leer comentarios abiertos",
              description:
                "AI Survey Summarization convierte miles de comentarios en clusters accionables. Sin IA, el comentario abierto se queda en un Excel que nadie procesa.",
              tone: "success",
            },
            {
              eyebrow: "08",
              title: "Mida 'tiempo a cierre de loop', no solo el score",
              description:
                "El KPI que diferencia un programa serio de un dashboard es: ¿cuánto tarda su organización en responder a una respuesta mala? Si la respuesta es 'no sabemos', empiece por ahí.",
              tone: "warn",
            },
            {
              eyebrow: "09",
              title: "Defina ownership claro por dominio",
              description:
                "Cada momento del ciclo tiene un dueño: servicio, ventas, producto, marketing. Si todos miden y nadie actúa, el programa muere por anemia organizacional.",
              tone: "neutral",
            },
            {
              eyebrow: "10",
              title: "Cierre el loop con el cliente, no solo con la dirección",
              description:
                "Cuando un cliente reportó algo y alguien actuó, dígaselo. 'Gracias a su feedback hicimos X.' Ese mensaje vale más que diez campañas de retención.",
              tone: "primary",
            },
          ],
        },
      ],
    },
    {
      id: "modelo-madurez",
      eyebrow: "Parte 7 · Madurez",
      title: "Modelo de madurez de tres niveles",
      blocks: [
        {
          type: "paragraph",
          text: "Este modelo es operativo. Le ayuda a entender en qué nivel está hoy su organización, qué capacidades necesita para subir y cuáles son los riesgos de saltar etapas.",
        },
        {
          type: "cards",
          columns: 3,
          items: [
            {
              eyebrow: "Nivel 1 · Foundational",
              title: "Encuestas estándar conectadas al CRM",
              description:
                "Salesforce Surveys activo. CSAT post-caso enviado por email. Respuestas registradas en el cliente. Reportes básicos. Cierre del loop manual en los casos con peor score.",
              tone: "primary",
            },
            {
              eyebrow: "Nivel 2 · Lifecycle",
              title: "Feedback Management orquestado por ciclo",
              description:
                "Customer Lifecycle Maps activos para 3–5 momentos. Encuestas dinámicas con ramificación. Data Mapper cierra loop automáticamente. Dashboards de Customer Lifecycle Analytics en producción.",
              tone: "success",
            },
            {
              eyebrow: "Nivel 3 · Continuous Signals",
              title: "Activas + pasivas unificadas con Agentforce",
              description:
                "Customer Signals Intelligence en producción 24/7. Sentiment integrado al perfil unificado. Agentforce for Service resume issues y sugiere acciones a representantes y líderes. Programa medido por 'tiempo a cierre de loop', no solo por NPS.",
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
              "Salesforce Surveys, CSAT post-caso, reportes básicos, cierre del loop manual.",
              "Tiempo a valor corto, baja inversión, primer baseline de CSAT y NPS.",
              "Quedarse aquí cuando el negocio necesita más; encuestas estáticas; tasa de respuesta sin gestión activa.",
            ],
            [
              "2 · Lifecycle",
              "Feedback Management, Customer Lifecycle Maps, Dynamic Surveys, Data Mapper, dashboards prebuilt.",
              "Orquestación real del ciclo, cierre del loop automatizado, métricas por momento del journey.",
              "Sobre-medir si no se gestiona fatiga; dashboards que nadie mira si falta ownership.",
            ],
            [
              "3 · Continuous Signals",
              "Customer Signals Intelligence, Agentforce for Service, perfil unificado en Data Cloud, KPI de tiempo de cierre.",
              "Visión 360 real, intervención proactiva, voz del cliente conectada a la acción del agente.",
              "Costo de consumo de Experience Signals; requiere volumen conversacional para que el ROI sea claro.",
            ],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Salto típico mal hecho",
          text: "Saltar de Nivel 1 directo a Nivel 3 'porque suena más moderno'. Resultado: sentiment captado sin un proceso de acción detrás, agentes que reciben alertas que no saben cómo gestionar y una dirección que pierde confianza en el programa. El Nivel 2 — Lifecycle bien operado — es donde la mayoría de las organizaciones deben vivir un año antes de añadir señales pasivas.",
        },
      ],
    },
    {
      id: "trampas",
      eyebrow: "Parte 8 · Trampas comunes",
      title: "Cinco errores que vemos en campo (y cómo evitarlos)",
      blocks: [
        {
          type: "cards",
          columns: 2,
          items: [
            {
              eyebrow: "Error 01",
              title: "Convertir el NPS en un objetivo, no en una métrica",
              description:
                "Cuando el bonus depende de subir el NPS, los equipos aprenden a 'gestionar la encuesta', no la experiencia. Use NPS como termómetro, no como meta de venta interna.",
              tone: "warn",
            },
            {
              eyebrow: "Error 02",
              title: "Encuestas larguísimas 'porque ya tenemos al cliente'",
              description:
                "Si tarda más de 90 segundos en responder, la tasa de respuesta cae y los datos se sesgan al cliente sobre-comprometido. Use ramificación dinámica, no longitud.",
              tone: "warn",
            },
            {
              eyebrow: "Error 03",
              title: "Comentarios abiertos sin lectura",
              description:
                "Capturar texto libre sin AI Survey Summarization es decirle al cliente que no le importa lo suficiente como para leerlo. Léalo todo, o no lo pida.",
              tone: "warn",
            },
            {
              eyebrow: "Error 04",
              title: "Programas duplicados entre áreas",
              description:
                "Servicio envía su CSAT, marketing su NPS, producto su feedback in-app. Sin governance, el cliente recibe tres encuestas en una semana de tres áreas distintas de la misma empresa.",
              tone: "warn",
            },
            {
              eyebrow: "Error 05",
              title: "No medir el cierre del loop",
              description:
                "El KPI más importante no es el score. Es el porcentaje de respuestas malas que terminaron en una acción documentada y el tiempo promedio para hacerlo. Si no lo mide, no lo gestiona.",
              tone: "warn",
            },
          ],
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
          text: "Casos típicos donde Salesforce orquesta una estrategia de Customer Feedback con resultado defendible. Cada uno indica el bloque recomendado y por qué.",
        },
        {
          type: "table",
          headers: ["Caso de uso", "Bloque recomendado", "Por qué"],
          rows: [
            [
              "Servicio al cliente: CSAT post-caso",
              "Surveys (base) + Data Mapper en Feedback Management",
              "Volumen alto, pregunta simple, requiere cerrar el loop sobre el caso mismo.",
            ],
            [
              "Banca: relación post-onboarding",
              "Feedback Management — Growth (Lifecycle Maps)",
              "Momento crítico con ramificación según producto contratado; valor alto del primer mes.",
            ],
            [
              "Seguros: post-claim experience",
              "Feedback Management + Customer Signals Intelligence",
              "Encuesta corta + sentimiento de la llamada de claims juntos dan la imagen real.",
            ],
            [
              "Retail: post-compra y post-entrega",
              "Feedback Management (Dynamic Surveys multicanal)",
              "Personalización por producto + canal preferido del cliente (email, WhatsApp, in-app).",
            ],
            [
              "Telco / utilities: voz de contact center",
              "Customer Signals Intelligence + Agentforce for Service",
              "El volumen conversacional justifica medir 24/7 sin pedirle al cliente otra encuesta.",
            ],
            [
              "B2B SaaS: renewal y health score",
              "Feedback Management — Growth + Data Cloud",
              "Lifecycle Map para renewal + cruce con uso del producto = health score real.",
            ],
            [
              "Salud / pacientes: post-consulta",
              "Surveys + Data Mapper",
              "Volumen alto, pregunta corta, regulación que pide trazabilidad — cierre del loop manual o semi.",
            ],
            [
              "Sector público: experiencia de trámite",
              "Feedback Management + Customer Lifecycle Analytics",
              "Procesos largos con varios momentos clave — mapeo de ciclo y reporte público.",
            ],
            [
              "Industria / B2B field service",
              "Feedback Management + Service Cloud Mobile",
              "Encuesta corta al finalizar el work order; el técnico recibe el resultado en su perfil.",
            ],
            [
              "Programas de fidelización / loyalty",
              "Feedback Management — Growth + Agentforce",
              "Lifecycle Map cruzado con tier de loyalty; Agentforce alerta al gestor de cuenta cuando un VIP baja.",
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
          text: "Una estrategia de Customer Feedback no se evalúa por el NPS que se publica en el reporte trimestral. Se evalúa por tres preguntas: ¿cuántas respuestas malas terminaron en una acción documentada el mismo mes?, ¿el agente que atiende a un cliente sabe lo que ese cliente ha dicho los últimos 90 días?, ¿la dirección decide en función de patrones reales — sentiment + encuestas — o solo de un score agregado? Si las tres respuestas son sí, el programa está sano.",
        },
        {
          type: "paragraph",
          text: "Salesforce tiene hoy las piezas para construirlo: Surveys como base, Feedback Management como orquestador de ciclo, Customer Signals Intelligence como sensor continuo y Agentforce for Service como capa que conecta voz del cliente con acción concreta. La parte técnica es la fácil. La difícil es decidir qué medir, cuándo medir, cómo no quemar al cliente y cómo asegurarse de que cada respuesta dispare una acción — y eso es exactamente lo que esta postura busca dejar claro.",
        },
        {
          type: "statement",
          text: "Customer Feedback debe operarse como un sistema continuo, no como un proyecto de encuestas. Combine señales activas (Surveys + Feedback Management) y pasivas (Customer Signals Intelligence), unifíquelas en Data Cloud, conviértalas en acción con Agentforce y Data Mapper, y mida el programa por tiempo a cierre del loop — no solo por el score que aparece en el dashboard.",
        },
      ],
    },
    {
      id: "fuentes",
      eyebrow: "Referencias",
      title: "Fuentes oficiales",
      blocks: [
        {
          type: "paragraph",
          text: "Esta postura está construida sobre páginas oficiales de Salesforce vigentes a la fecha de publicación. Las capacidades y nombres de producto evolucionan rápido: confirme con su cuenta de Salesforce la lista exacta de SKUs y precios antes de cualquier decisión comercial.",
        },
        {
          type: "sources",
          items: [
            {
              label: "Salesforce Feedback Management — página de producto",
              url: "https://www.salesforce.com/products/feedback-management/",
            },
            {
              label:
                "Salesforce Feedback Management dentro de Service Cloud Operations",
              url: "https://www.salesforce.com/service/customer-service-operations/feedback-management/",
            },
            {
              label:
                "Service Intelligence y Customer Signals Intelligence",
              url: "https://www.salesforce.com/service/customer-service-operations/",
            },
            {
              label: "Service Cloud — visión general",
              url: "https://www.salesforce.com/service/cloud/",
            },
            {
              label: "Agentforce for Service",
              url: "https://www.salesforce.com/agentforce/",
            },
            {
              label: "Data Cloud — perfil unificado",
              url: "https://www.salesforce.com/data/",
            },
            {
              label: "State of Service Report — Salesforce Research",
              url: "https://www.salesforce.com/resources/research-reports/state-of-service/",
            },
            {
              label: "Pricing · Service Cloud",
              url: "https://www.salesforce.com/service/pricing/",
            },
            {
              label: "Valoir CX Intelligence — white paper",
              url: "https://www.salesforce.com/form/service-cloud/valoir-customer-signals-intelligence-report/",
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

export const insights: Insight[] = [multiAgent, customerFeedback];
