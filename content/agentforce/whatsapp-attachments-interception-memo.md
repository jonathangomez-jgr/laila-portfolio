---
title: "Memo ejecutivo — Interceptar el error de attachment en Agentforce por WhatsApp"
date: 2026-08-01
author: Jonathan Gomez
audience: [Sales, SE, Customer, Architects]
---

# Memo ejecutivo — Interceptar el error de attachment en Agentforce por WhatsApp

## El problema

Cuando un usuario final envía un archivo (foto, audio, video, documento) por WhatsApp a un canal Enhanced conectado a un Agentforce Service Agent, el agente responde con un error tipo *"no pude procesar el archivo"*. Esto pasa incluso con imagen/PDF (los formatos que Salesforce oficialmente soporta) si no hay Flex Prompt Template + acción custom preconfigurada. Audio, video y Office quedan bloqueados sin excepción.

## Los tres approaches que se probaron

1. **Instruir al agente vía topic instructions** para que omita el error → **inefectivo**. Salesforce documenta explícitamente que el ordenamiento de acciones y la fidelidad al prompt son no-determinísticos (Developer Blog 29-jul-2025). El agente a veces omite el error, a veces lo manda, a veces truena la conversación.

2. **Bypass completo del canal (approach Corona)** → **funciona**. Reemplazar el canal Enhanced por webhook custom a Meta + Platform Events + Prompt Templates + Custom LWC + ~30 Apex classes + 6 objetos custom. Verificado en producción, costoso.

3. **Intercepción liviana en el path estándar** (investigación 2026-08-01) → **no viable**. Después de probar empíricamente 10+ hipótesis en la org Laila, se confirmó que **no existe un punto de intercepción programático que permita modificar la respuesta del agente antes de que salga a Meta**.

## Los hallazgos empíricos que cierran la puerta a la Opción 3

Todos estos se probaron en `jgr@laila.demo` el 2026-08-01 con triggers reales, TraceFlags reales, y sesiones de WhatsApp reales:

- **`ConversationEntry` no es triggerable** en Enhanced Messaging. Confirmado en el describe: `triggerable=false`.
- **El campo `ConversationEntry.Message` está vacío** en el 100% de los ~2000 registros consultados. El texto que el agente le dice al usuario nunca aparece on-platform.
- **Los `ConversationEntry` de la sesión activa no son consultables** ni durante ni justo después del cierre — se materializan mucho después.
- **`AgentMessageCount` no incrementa** aunque el agente sí responde al usuario. Prueba adicional de que el pipeline outbound vive off-platform.
- **`ConversationEntry` es DML-insertable** desde Apex — el DML sucede, el registro persiste, pero **no dispara ni notificación al usuario ni turno del agente**. Se probó con `ActorType=Bot` y `ActorType=EndUser`. Ninguno funciona como vector de write-back.
- **No hay API pública Apex/REST para inyectar mensajes al canal Enhanced** — se buscó en `ConnectApi`, `Messaging`, `RichMessaging`, endpoints REST `/services/messaging/*`, `/connect/messaging/*`. Nada existe.
- **`ConvMessageSendRequest` es read-only** — no es un vector de write-back, es un log del sistema.
- **La única API oficial para enviar outbound al canal desde afuera del agente es BYOC** (Bring Your Own Channel), que requiere reemplazar el canal Enhanced completamente.

**Sí existen puntos de intercepción sync:** `ContentDocumentLink BEFORE_INSERT` dispara cuando llega un archivo, con `LinkedEntityType=MessagingSession` correcto. Se puede observar y reaccionar en Apex — pero cualquier reacción termina siendo cosmética porque no hay canal outbound que use.

## Recomendación por escenario

| Situación del cliente | Recomendación |
|---|---|
| Cliente pequeño, casos ocasionales de adjunto, no crítico | **Aceptar el error del agente** o **escalar a humano** cuando se detecte adjunto en Omni-Channel Flow inbound (solo funciona en primer turno de sesión) |
| Cliente mediano, solo imagen/PDF, mid-conversación tolerable | Configurar **Flex Prompt Template + acción custom** — es el path oficial de Salesforce para imagen/PDF, requiere admin work en Prompt Builder |
| Cliente enterprise, audio/video/office, canal crítico | **Bypass Corona-style** — asumir el costo, tener control total. Referencia: `whatsappAttachmentsCustom` y `whatsappV2Handoff` en el portafolio |
| Cliente nuevo evaluando Agentforce | **Setear expectativas claras**: multimodal completo por WhatsApp no está resuelto out-of-the-box en 2026-08. Ir hacia otro canal (MIAW, In-App) si es opción, o presupuestar bypass |

## Lo que sí evolucionó del research

- Confirmamos que **`aiplatform.ModelsAPI`** funciona en la org — GPT-4o texto responde con Trust Layer aplicado. Sirve para futuras iniciativas de IA no relacionadas con este bloqueo.
- Descubrimos que **`AutomatedProcess`** es el user que corre el pipeline de Enhanced Messaging. Para debugging futuro de messaging, hay que activar TraceFlag sobre ese user, no solo sobre el user humano.
- Documentamos la lista de 10 opciones descartadas con evidencia — sirve para no repetir el mismo research cuando otro equipo pregunte.

## Referencias

- Receta detallada: `data/buildRecipes.ts` → `whatsappLightweightInterception` (líneas 2012-2451)
- Bypass Corona verificado: `data/buildRecipes.ts` → `whatsappAttachmentsCustom` (líneas 145-1237) y `whatsappV2Handoff` (líneas 1239-2010)
- Object Reference oficial: `developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_conversationentry.htm`
- Non-determinismo de topic action sequencing: `developer.salesforce.com/blogs/2025/07/best-practices-for-building-agentforce-apex-actions`
- BYOC (única alternativa oficial): `developer.salesforce.com/docs/service/messaging-partner`
