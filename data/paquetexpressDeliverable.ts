import type { AgentDeliverable } from "./agentDeliverables";

export const paquetexpressDeliverable: AgentDeliverable = {
  slug: "paquetexpress",
  title: "Agente de servicio — Paquetexpress",
  subtitle:
    "Entregable formal del agente Agentforce de Paquetexpress reconstruido sobre la generación nueva de Agentforce (Agent Script), con verificación única de identidad, gating por horario laboral y tipificación automática de casos.",
  customerName: "Paquetexpress",
  customerLogo: "/Customers/Paquetexpress/paquetexpress-logo.png",
  agentName: "Paquetexpress Service Agent",
  agentId: "0Xxdh0000005T7pCAE",
  environment: "Sandbox QA · paquetexpress--qa2020.sandbox.my.salesforce.com",
  version: "v43",
  publishedAt: "2026-09-24",
  preparedBy: {
    name: "Equipo FDE Salesforce",
    role: "Regina Segura · Ximena Macias · Andres Rivas · Jonathan Gómez",
    email: "jonathan.gomez@salesforce.com",
  },

  tabs: [
    {
      id: "resumen",
      label: "Resumen del agente",
      section: "Resumen",
      title: "¿Qué recibe Paquetexpress hoy?",
      intro:
        "Un asistente conversacional de servicio al cliente que primero verifica quién es la persona, después la lleva al equipo experto adecuado, y crea automáticamente el caso correspondiente en Salesforce al terminar cada solicitud — sin que el cliente tenga que pedirlo.",
      content: `## 🎯 En una frase

Un asistente conversacional para clientes de Paquetexpress que **verifica identidad una sola vez**, enruta la conversación al subagente correcto (cotización, rastreo, información, sucursales/empleo, caso o transferencia humana), y **tipifica automáticamente** cada caso en Salesforce.

## 🧾 Ficha del agente

| Atributo | Valor |
|---|---|
| **Nombre técnico** | \`Paquetexpress_Service_Agent_Split\` |
| **Bot Id** | \`0Xxdh0000005T7pCAE\` |
| **Versión activa** | v43 |
| **Bundle activo** | \`Paquetexpress_Service_Agent_Split_43\` (AiAuthoringBundle · Agent Script) |
| **Generación** | Nueva — \`Atlas__ConcurrentMultiAgentOrchestration\` |
| **Ambiente** | Sandbox QA · \`paquetexpress--qa2020\` |
| **Idioma** | Español de México (\`es_MX\`) |
| **Canales** | WhatsApp · Facebook · Line · Apple Business Chat · Text · Email · Web (Embedded Messaging) · Custom |

## 🏗️ Arquitectura en un vistazo

El agente está compuesto por **un enrutador** que decide qué subagente debe atender al cliente, un **gate obligatorio de verificación de identidad**, **seis subagentes especialistas** y **dos subagentes de contención** (fallbacks).

| # | Subagente | Rol |
|---|---|---|
| 1 | 🚦 **Agent Router** | Da la bienvenida y decide a qué subagente enviar al cliente. |
| 2 | 🔐 **Customer Verification** | Verifica identidad (nombre + correo). Gate único: nadie entra a ningún tema sin verificarse. |
| 3 | 💰 **Quote Management** | Cotizaciones nacionales e internacionales. |
| 4 | 📦 **Orden Management** | Rastreo de envíos por número de guía. |
| 5 | 🎫 **Case Management** | Consultar, comentar y crear casos. |
| 6 | ℹ️ **General Information** | FAQ, sitio web y respuestas informativas. |
| 7 | 🏢 **Job/Branch Information** | Sucursales físicas y vacantes de empleo. |
| 8 | 👤 **Escalation** | Transferencia a humano con gating por horario. |
| — | 🤔 Ambiguous Question · 🧭 Off Topic | Contención: redirige al cliente cuando la pregunta es vaga o fuera de alcance. |

## ✅ Qué resuelve estructuralmente

- **Verificación única de identidad** — el cliente da nombre + correo una sola vez, y todos los subagentes downstream lo respetan (bloqueados con \`available when isVerified == True\`).
- **Gating por horario** — antes de transferir a un humano, el agente ejecuta obligatoriamente el chequeo del Business Hours *"Horario Paquete"*. Si está cerrado, ofrece crear un caso en lugar de transferir a una cola vacía.
- **Tipificación automática de casos** — cada intención (rastreo, cotización nacional, cotización internacional, sucursales, empleo, FAQ, servicio) dispara su acción específica de creación de caso. La operación recibe casos correctamente etiquetados desde el inicio.
- **Creación silenciosa** — el caso se crea al terminar cualquier interacción, sin que el cliente tenga que pedirlo. Cuando corresponde (rastreo, sucursales, empleo, FAQ) el cliente ni siquiera ve el número de caso — es telemetría interna para operaciones.
- **Nunca se muestra el ID interno del caso** — solo el CaseNumber legible cuando aplica.

## 💬 Probar el agente

En esta misma página encontrarás el **widget de chat** (esquina inferior derecha) apuntando al canal de Embedded Messaging del sandbox de QA. Iniciar sesión requiere entregar **nombre completo + correo electrónico** para pasar la verificación de identidad — a partir de ahí puedes probar cualquiera de los subagentes descritos arriba.

> 💡 Para ver la configuración exacta del Embedded Service Deployment y el code snippet que se está usando en esta página, revisa la tab **"Chat embebido"**.

> 🎯 **Estado actual:** publicado en el sandbox \`paquetexpress--qa2020\`, disponible para pruebas del equipo de Paquetexpress vía el widget de chat de esta página o vía los canales configurados en la org.`,
    },
    {
      id: "chat-embebido",
      label: "Chat embebido",
      section: "Chat embebido",
      title: "Configuración del widget de chat",
      intro:
        "El widget de chat que aparece en la esquina inferior derecha de esta página no es un componente propio del portfolio — está inicializado con el mismo Embedded Service Deployment que Paquetexpress ya tiene publicado en la org de QA.",
      content: `## 🔌 Embedded Service Deployment en uso

El chat de esta página inicializa el Embedded Service Deployment **\`fde_Web_messaging\`** publicado en la org \`paquetexpress--qa2020\`. Es la misma configuración que Paquetexpress puede embeber en su propio sitio.

| Atributo | Valor |
|---|---|
| **Deployment Name** | \`fde_Web_messaging\` |
| **Tipo** | Embedded Service Deployment · **Web (v2)** |
| **Messaging Channel** | Web messaging |
| **Site Endpoint** | \`ESW_fde_Web_messaging_17878537432761\` |
| **Status** | ✅ **Active** |
| **Deployment Version** | \`262.14.6\` |
| **Última publicación** | 27/08/2026 04:57:24 PM MST |
| **Org Id** | \`00Ddh000001pK4B\` |
| **Site URL** | \`https://paquetexpress--qa2020.sandbox.my.site.com/ESWfdeWebmessaging1787853743276\` |
| **SCRT2 URL** | \`https://paquetexpress--qa2020.sandbox.my.salesforce-scrt.com\` |
| **Idioma** | \`es_MX\` |

## 🧭 Secciones configurables del deployment

El deployment expone las siguientes secciones de configuración desde Setup (**Setup > Embedded Service Deployments > fde_Web_messaging**):

- **Settings** — pie de página del chat y horarios de atención.
- **Branding** — colores, tipografía, avatares y logo.
- **Pre-Chat** — campos de captura previos al chat *(actualmente inactivo)*.
- **Custom Labels** — etiquetas personalizadas para adaptar el idioma/tono.
- **Code Snippet** — el fragmento HTML que hay que pegar en el sitio destino.
- **Notifications** — notificaciones push del widget.

## 📋 Code Snippet que se está ejecutando en esta página

Este es el fragmento exacto que se levanta cuando cargas esta página — es el mismo que Setup genera en la sección *Code Snippet* del deployment. Cópialo y pégalo antes del cierre de \`</body>\` en cualquier sitio para replicar exactamente el mismo widget de chat:

\`\`\`html
<script type='text/javascript'>
    function initEmbeddedMessaging() {
        try {
            embeddedservice_bootstrap.settings.language = 'es_MX'; // For example, enter 'en' or 'en-US'

            embeddedservice_bootstrap.init(
                '00Ddh000001pK4B',
                'fde_Web_messaging',
                'https://paquetexpress--qa2020.sandbox.my.site.com/ESWfdeWebmessaging1787853743276',
                {
                    scrt2URL: 'https://paquetexpress--qa2020.sandbox.my.salesforce-scrt.com'
                }
            );
        } catch (err) {
            console.error('Error loading Embedded Messaging: ', err);
        }
    };
</script>
<script type='text/javascript' src='https://paquetexpress--qa2020.sandbox.my.site.com/ESWfdeWebmessaging1787853743276/assets/js/bootstrap.min.js' onload='initEmbeddedMessaging()'></script>
\`\`\`

## ⚙️ Cómo funciona por debajo

1. La segunda etiqueta \`<script>\` carga de forma asíncrona el bootstrap oficial de Salesforce (\`bootstrap.min.js\`) desde el Site Endpoint del deployment.
2. Al terminar de cargar (\`onload\`), invoca \`initEmbeddedMessaging()\`.
3. Esa función setea el idioma (\`es_MX\`) y llama a \`embeddedservice_bootstrap.init(orgId, deploymentName, siteUrl, { scrt2URL })\`.
4. El bootstrap monta el widget en el DOM y lo conecta a Messaging → Omni-Channel → el agente \`Paquetexpress_Service_Agent_Split\` v43.

> 🔒 **Nota:** este deployment apunta al **sandbox de QA** (\`paquetexpress--qa2020\`). Para producción, Paquetexpress deberá publicar un deployment equivalente en la org productiva y sustituir los cuatro valores (\`orgId\`, \`deploymentName\`, \`siteUrl\`, \`scrt2URL\`) por los productivos antes de embeberlo en el sitio real.`,
    },
  ],
};
