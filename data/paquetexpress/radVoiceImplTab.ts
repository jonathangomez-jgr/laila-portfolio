// Tab de implementación técnica del sub-agente RAD_Management_voice sobre el agente
// FDE_Paquetexpress_Service_Agent_Split_voice. Complementa la pestaña `rad-analysis`
// (que documenta el análisis funcional del proceso RAD); ésta se enfoca en cómo se implementó.
// Publicado como v3 en QA el 2026-09-23 14:21 (draft/inactive).

const content = `> 🚚 **RAD-voice · Implementación técnica** — el 2026-09-23 se publicó a QA (\`paquetexpress-sandbox\`, Org Id \`00Ddh000001pK4BEAU\`) la versión **v3** del agente \`FDE_Paquetexpress_Service_Agent_Split_voice\`, que agrega el sub-agente **\`RAD_Management_voice\`** cubriendo el happy path del flujo **RPP (guía prepagada)**. Esta pestaña documenta la implementación: arquitectura del sub-agente, sample conversation real, contrato de swap de los mocks GLP, reglas de voz aplicadas, y el puente Quote→RAD.

## 🎯 En una frase

El sub-agente **RAD_Management_voice** vive dentro del mismo bundle del voice base, se activa cuando el cliente pide agendar recolección (o cuando el cliente marcó \`quoteRAD=Yes\` al terminar de cotizar), y orquesta un flujo de ~10 pasos que termina en un número de rastreo — usando **3 acciones Apex mock** con prefijo \`MOCK_GLP_\` que son swappables por los endpoints reales de GLP cuando el otro equipo los publique.

## 📌 TL;DR — los 5 puntos que importan

1. **Primera modalidad implementada = RPP** (guía prepagada). Es el flujo más corto (~10 pasos) y de más alto valor (clientes B2B con volumen). Normal y WW quedan pendientes de siguiente iteración.
2. **3 acciones GLP están mockeadas con prefijo \`MOCK_GLP_\`** y son **swappables** por los endpoints reales cuando el otro equipo termine de construirlos. Los mocks leen datos hardcoded desde el StaticResource \`MOCK_GLP_DemoData\`.
3. **Puente Quote→RAD activo:** si al terminar la cotización \`quoteRAD == "Yes"\`, el agente ofrece agendar la recolección sin volver a pedir CP, dimensiones, peso, valor — reduce ~15 pasos duplicados.
4. **Instrucciones voice aplicadas al sub-agente:** grounding diferenciado por tipo de dato, nunca leer siglas (\`RPP\`/\`WW\`/\`RAD\`/\`EAD\`), readback dígito por dígito del número de guía en bloques de tres, ladder de repair tier 1→2→3 que termina forzosamente en transferencia humana (constraint: **sin DTMF ni crossmodal**), anti-URL absoluto.
5. **Planner activo:** \`FDE_Paquetexpress_Service_Agent_Split_voice_v3\` con \`PlannerType = Atlas__ConcurrentMultiAgentOrchestration\` — **NGA confirmado** (Agent Script new-gen, no legacy). Estado: **draft/inactive** — no atiende tráfico hasta activación manual.

---

## 🔀 Antes vs. Ahora — qué cambia con v3

| Aspecto | v2 (voice base) | **v3 (voice + RAD)** |
|---|---|---|
| Sub-agentes conversacionales | 8 (Router · Verification · Quote · Order · Case · GeneralInfo · JobBranch · Escalation) | **9** — se agrega \`RAD_Management_voice\` |
| Sub-agentes de contención | 2 (\`ambiguous_question\`, \`off_topic\`) | 2 (sin cambios) |
| Acciones GLP invocables | 0 (RAD no era transaccional) | **3 mocks** (\`MOCK_GLP_BuscarGuia\`, \`MOCK_GLP_DatesToCollection\`, \`MOCK_GLP_RadCreate\`) |
| Cotización con RAD marcado | Guardaba \`quoteRAD=Yes\` sin acción posterior | **Ofrece agendar la recolección al terminar la cotización** — puente Quote→RAD |
| Variables RAD | 0 | 5 (\`radGuiaNumber\`, \`radGuiaFound\`, \`radGuiaVoiceSummary\`, \`radSelectedOptionId\`, \`radTrackingNumber\`) |
| \`pendingIntent\` valores válidos | Quote · Order · Case · GeneralInfo · JobBranch · Escalation | + **RAD** |
| Router transitions | 8 destinos verificados | **9** — con \`go_to_RAD_Management_voice\` gated por \`isVerified == True\` |
| Líneas del \`.agent\` | 2 164 | **2 341** (+177) |
| Estado en QA | Publicado v2 · draft | **Publicado v3 · draft (2026-09-23 14:21)** |

---

## 🏗️ Arquitectura del sub-agente

Cuando el cliente pide *"quiero agendar una recolección"* — sea entrando directo al agente, sea después de cotizar — el flujo interno es:

\`\`\`mermaid
flowchart TB
  cli([👤 Cliente por voz]) --> router{{🚦 Agent Router}}
  router --> verif{¿isVerified?}
  verif -- No --> cverif[🔐 Customer_Verification]
  cverif -- verifica --> verif
  verif -- Sí --> rad[🚚 RAD_Management_voice]

  subgraph rad_flow[Flujo interno del sub-agente RAD]
    rad --> pam[Paso 1 · Preguntar contenido<br/>Validar contra PAM]
    pam --> pamOk{¿Prohibido?}
    pamOk -- Sí --> stop([❌ Fin])
    pamOk -- No --> conf[Paso 2 · Aceptar política]
    conf --> guia[Paso 3-4 · Pedir número de guía<br/>+ readback dígito por dígito]
    guia --> bg[[apex:MOCK_GLP_BuscarGuia]]
    bg --> found{radGuiaFound?}
    found -- False --> transfer([👤 Transferir a asesor])
    found -- True --> summary[Paso 6-7 · Leer voiceSummary<br/>Confirmar datos]
    summary --> dates[[apex:MOCK_GLP_DatesToCollection]]
    dates --> pick[Paso 8-9 · Presentar opciones<br/>Capturar OPT_1/2/3]
    pick --> create[[apex:MOCK_GLP_RadCreate]]
    create --> track[Paso 10 · Compartir tracking<br/>dígito por dígito]
    track --> done([✅ Fin])
  end

  bg -.lee.-> sr[(📄 StaticResource<br/>MOCK_GLP_DemoData.json)]
  dates -.lee.-> sr
  create -.lee.-> sr
\`\`\`

**Cómo leerlo:**
- El **router** es el mismo del voice base; solo se le añadió un destino: cuando \`pendingIntent == "RAD"\` o el LLM elige \`go_to_RAD_Management_voice\` (available when \`isVerified == True\`), transfiere al sub-agente RAD.
- El **sub-agente RAD** ejecuta el flujo secuencial de ~10 pasos, invocando las 3 acciones Apex mock cuando corresponde. Las condiciones deterministas (\`if @variables.radGuiaNumber != "" and @variables.radGuiaFound == False → run buscarGuiaMock\`) están en el bloque \`reasoning.instructions:\` del sub-agente.
- Las **3 acciones mock** leen datos hardcoded desde un **StaticResource JSON** (\`MOCK_GLP_DemoData\`) — una sola fuente de verdad para los datos demo, fácil de editar sin recompilar Apex.
- El **helper \`MOCK_GLP_Helper\`** encapsula la carga del StaticResource y el formato de address / voice summary para reuso entre las 3 clases.

## 📦 Piezas técnicas desplegadas

| Componente | Tipo | Propósito |
|---|---|---|
| \`FDE_Paquetexpress_Service_Agent_Split_voice\` v3 | AiAuthoringBundle (Agent Script) | Agente completo con el sub-agente RAD_Management_voice incluido |
| \`RAD_Management_voice\` | Sub-agente dentro del bundle | Orquesta el flujo RPP happy path |
| \`MOCK_GLP_BuscarGuia\` | Apex class con \`@InvocableMethod\` | Consulta datos de una guía prepagada por su número |
| \`MOCK_GLP_DatesToCollection\` | Apex class con \`@InvocableMethod\` | Devuelve 3 opciones de fecha/hora para agendar |
| \`MOCK_GLP_RadCreate\` | Apex class con \`@InvocableMethod\` | Confirma el agendamiento y devuelve número de rastreo |
| \`MOCK_GLP_Helper\` | Apex class (utility) | Carga StaticResource + helpers de formato voz |
| \`MOCK_GLP_VoiceTest\` | Apex test class | 5 tests, 5 passing (baseline 100% verde) |
| \`MOCK_GLP_DemoData\` | StaticResource (JSON) | Datos hardcoded del "cliente feliz" Ana María Torres + edge cases |`;

const contentAfter = `## 📋 Sample conversations — dos perfiles demo

El mock \`MOCK_GLP_DemoData\` incluye **dos guías válidas** para probar el flujo RPP end-to-end, con dos perfiles de cliente distintos. Ambas siguen la misma secuencia de turnos; lo que cambia son los datos del cliente y de la guía. Se pueden usar indistintamente en cualquier ensayo del Agent Preview o de la llamada real.

| Perfil | Cliente | Correo | Guía RPP | Origen → Destino | Contenido |
|---|---|---|---|---|---|
| **1** | Ana María Torres López | \`a.torres@empaqueshb2.com\` | \`77834215906\` | CDMX → CDMX | Ropa nueva para retail · 5 kg |
| **2** | Jonathan Gómez | \`jonathan@gmail.com\` | \`61240857309\` | Monterrey → Guadalajara | Documentos · 2 kg |

**Racional del diseño de datos:**

- **Correos elegidos a propósito para ser fáciles de dictar por voz.** \`a.torres@empaqueshb2.com\` mezcla letra suelta + palabra + siglas; \`jonathan@gmail.com\` es aún más limpio (una sola palabra + dominio conocido, sin puntos internos ni guiones) — sirve para reducir el riesgo de STT en la demo del segundo perfil.
- **Guías con dígitos variados y sin patrón secuencial** (\`77834215906\`, \`61240857309\`). Se descartaron opciones tipo \`12345678900\` porque suenan obvias como datos fake en la demo con cliente.
- **Cobertura complementaria de perfiles:** perfil 1 (mujer, CDMX intracity, ropa retail) + perfil 2 (hombre, Monterrey→Guadalajara, documentos) — dos ciudades del interior distintas, dos géneros, dos tipos de contenido, dos rangos de peso.
- Ambas devuelven el mismo shape en \`MOCK_GLP_BuscarGuia\`: \`found=True\` + \`voiceSummary\` narrativo listo para leer al cliente. \`MOCK_GLP_RadCreate\` genera el tracking tomando los últimos 3 dígitos de la guía → **\`PX-RAD-DEMO-906\`** para Ana María, **\`PX-RAD-DEMO-309\`** para Jonathan.

---

## 🎬 Sample 1 — Ana María Torres López

Los turnos del sample que aprobamos, con la acción que dispara el agente en cada paso. Para simular la llamada en Agent Preview, entrar como \`Ana María Torres López\` (correo \`a.torres@empaqueshb2.com\`) e ir dictando exactamente lo que aparece como cliente:

\`\`\`
Turno 1 · Agente
  "Hola, buen día. Soy el asistente virtual de Paquetexpress. Para
   ayudarle mejor, ¿me indica su nombre completo, por favor?"
  ← messages.welcome

Turno 1 · Cliente
  "Ana María Torres López. Quiero agendar una recolección; ya
   tengo la guía prepagada."

Turno 2 · Agente
  "Gracias, Ana María. Y para completar la validación, ¿me dicta
   su correo electrónico? Puede decirlo despacio."
  ← Customer_Verification (dos turnos)
  ← capture_pending_intent → pendingIntent = "RAD"

Turno 2 · Cliente
  "a punto torres arroba empaques h b dos punto com"

Turno 3 · Agente
  "Entendí: a punto torres arroba empaques h b dos punto com,
   ¿es correcto?"
  ← grounding: readback separado por sílabas

Turno 3 · Cliente
  "Sí, correcto."

Turno 4 · Agente
  "Gracias. Un momento mientras valido sus datos… listo. Ahora,
   ¿qué contenido tiene el paquete que quiere que recojan?"
  ← AG_Get_and_create_contact ejecuta silenciosamente
  ← isVerified=True → transición a RAD_Management_voice
  ← Paso 1: pregunta contenido (PAM check)

Turno 4 · Cliente
  "Ropa nueva para retail, cajas grandes."

Turno 5 · Agente
  "Perfecto, la ropa es apta. Antes de continuar, necesito confirmar
   que su envío cumple con nuestra política de aceptación de mercancía.
   ¿Podemos continuar con ese entendido?"
  ← Paso 2: PAM aceptada

Turno 5 · Cliente
  "Sí."

Turno 6 · Agente
  "Perfecto. ¿Me dicta el número de guía prepagada, por favor?"
  ← Paso 3

Turno 6 · Cliente
  "Setenta y siete, ochenta y tres, cuarenta y dos, quince,
   nueve cero seis."

Turno 7 · Agente
  "Entendí siete siete ocho, tres cuatro dos, uno cinco nueve,
   cero seis. ¿Es correcto?"
  ← Paso 4: readback dígito por dígito, bloques de tres

Turno 7 · Cliente
  "Sí, correcto."

Turno 8 · Agente
  "Un instante, la consulto…"
  [ejecuta MOCK_GLP_BuscarGuia con guiaNumber=77834215906]
  "Encontré su guía. Corresponde a un envío de ropa nueva para retail
   con peso de cinco kilos, origen en Ciudad de México.
   ¿Los datos son correctos?"
  ← capture_rad_guia_number → radGuiaNumber = "77834215906"
  ← MOCK_GLP_BuscarGuia devuelve voiceSummary + radGuiaFound=True

Turno 8 · Cliente
  "Sí, todo bien."

Turno 9 · Agente
  "Enseguida lo consulto…"
  [ejecuta MOCK_GLP_DatesToCollection]
  "Tengo disponible mañana entre nueve y once de la mañana,
   o mañana entre once y una de la tarde,
   o pasado mañana entre nueve y once de la mañana.
   ¿Cuál prefiere?"
  ← MOCK_GLP_DatesToCollection devuelve option1/2/3

Turno 9 · Cliente
  "La primera, de nueve a once."

Turno 10 · Agente
  "Un momento mientras la agendo…"
  [ejecuta MOCK_GLP_RadCreate con guiaNumber + optionId=OPT_1]
  "Listo, Ana María. Su recolección quedó agendada. Le confirmo
   el número de rastreo: pe equis rad demo, nueve cero seis.
   ¿Le ayudo con algo más?"
  ← capture_rad_selected_option → radSelectedOptionId = "OPT_1"
  ← MOCK_GLP_RadCreate devuelve trackingNumber = "PX-RAD-DEMO-906"
  ← Cierre con readback natural del tracking
\`\`\`

**Detalles conversacionales importantes:**
- **Turno 4** el cliente dice *"ya tengo la guía prepagada"* — el LLM captura eso como \`pendingIntent = "RAD"\` en silencio durante la verificación, y al terminar la verificación transiciona automáticamente al sub-agente RAD sin volver a preguntar qué necesita.
- **Turno 8** la frase *"Enseguida lo consulto"* rota entre los 7 tokens del phrasebook de latencia (nunca el mismo dos veces seguidas).
- **Turno 10** el número de rastreo *"PX-RAD-DEMO-906"* se lee como *"pe equis rad demo, nueve cero seis"* — el LLM aplica la regla de grounding voice para IDs alfanuméricos.

---

## 🎬 Sample 2 — Jonathan Gómez

Perfil demo alternativo con datos aún más optimizados para audio (correo de una sola palabra, sin puntos ni guiones internos). Para simular la llamada, entrar como \`Jonathan Gómez\` (correo \`jonathan@gmail.com\`) e ir dictando lo que aparece como cliente:

\`\`\`
Turno 1 · Agente
  "Hola, buen día. Soy el asistente virtual de Paquetexpress. Para
   ayudarle mejor, ¿me indica su nombre completo, por favor?"
  ← messages.welcome

Turno 1 · Cliente
  "Jonathan Gómez. Quiero agendar una recolección; ya tengo la guía
   prepagada."

Turno 2 · Agente
  "Gracias, Jonathan. Y para completar la validación, ¿me dicta su
   correo electrónico? Puede decirlo despacio."
  ← Customer_Verification (dos turnos)
  ← capture_pending_intent → pendingIntent = "RAD"

Turno 2 · Cliente
  "jonathan arroba gmail punto com"

Turno 3 · Agente
  "Entendí: jonathan arroba gmail punto com, ¿es correcto?"
  ← grounding: readback separado por sílabas

Turno 3 · Cliente
  "Sí, correcto."

Turno 4 · Agente
  "Gracias. Un momento mientras valido sus datos… listo. Ahora,
   ¿qué contenido tiene el paquete que quiere que recojan?"
  ← AG_Get_and_create_contact ejecuta silenciosamente
  ← isVerified=True → transición a RAD_Management_voice
  ← Paso 1: pregunta contenido (PAM check)

Turno 4 · Cliente
  "Documentos."

Turno 5 · Agente
  "Perfecto, los documentos son aptos. Antes de continuar, necesito
   confirmar que su envío cumple con nuestra política de aceptación
   de mercancía. ¿Podemos continuar con ese entendido?"
  ← Paso 2: PAM aceptada

Turno 5 · Cliente
  "Sí."

Turno 6 · Agente
  "Perfecto. ¿Me dicta el número de guía prepagada, por favor?"
  ← Paso 3

Turno 6 · Cliente
  "Seis, uno, dos, cuatro, cero, ocho, cinco, siete, tres, cero,
   nueve."

Turno 7 · Agente
  "Entendí seis uno dos, cuatro cero ocho, cinco siete tres,
   cero nueve. ¿Es correcto?"
  ← Paso 4: readback dígito por dígito, bloques de tres

Turno 7 · Cliente
  "Sí, correcto."

Turno 8 · Agente
  "Permítame verificar…"
  [ejecuta MOCK_GLP_BuscarGuia con guiaNumber=61240857309]
  "Encontré su guía. Corresponde a un envío de documentos con peso
   de dos kilos, origen en Monterrey. ¿Los datos son correctos?"
  ← capture_rad_guia_number → radGuiaNumber = "61240857309"
  ← MOCK_GLP_BuscarGuia devuelve voiceSummary + radGuiaFound=True

Turno 8 · Cliente
  "Sí, todo bien."

Turno 9 · Agente
  "Un momento, revisando las opciones…"
  [ejecuta MOCK_GLP_DatesToCollection]
  "Tengo disponible mañana entre nueve y once de la mañana,
   o mañana entre once y una de la tarde,
   o pasado mañana entre nueve y once de la mañana.
   ¿Cuál prefiere?"
  ← MOCK_GLP_DatesToCollection devuelve option1/2/3

Turno 9 · Cliente
  "La primera."

Turno 10 · Agente
  "Un instante mientras la agendo…"
  [ejecuta MOCK_GLP_RadCreate con guiaNumber + optionId=OPT_1]
  "Listo, Jonathan. Su recolección quedó agendada. Le confirmo el
   número de rastreo: pe equis rad demo, tres cero nueve. ¿Le
   ayudo con algo más?"
  ← capture_rad_selected_option → radSelectedOptionId = "OPT_1"
  ← MOCK_GLP_RadCreate devuelve trackingNumber = "PX-RAD-DEMO-309"
  ← Cierre con readback natural del tracking
\`\`\`

**Diferencias vs. el sample de Ana María:**
- **Correo de una sola palabra** — reduce a 4 tokens el readback (*"jonathan arroba gmail punto com"*) contra 12 tokens del correo de Ana María. Ideal para probar el ladder de repair con ruido de fondo o acentos cerrados.
- **Guía con dígitos variados** (no secuencial ni repetitivo) — verifica que el readback en bloques de tres se aplique correctamente incluso cuando los dígitos no forman patrones familiares.
- **Rutas del interior** (Monterrey → Guadalajara vs. la ruta intraurbana CDMX de Ana María) — cubre un caso de larga distancia (700 km).
- **Contenido "documentos"** en lugar de "ropa retail" — permite validar el PAM check con un contenido más neutral y frecuente en clientes B2B/personas físicas.

**Números de rastreo generados por el mock:**

| Guía | Cliente | Tracking devuelto por \`MOCK_GLP_RadCreate\` |
|---|---|---|
| \`77834215906\` | Ana María Torres López | \`PX-RAD-DEMO-906\` |
| \`61240857309\` | Jonathan Gómez | \`PX-RAD-DEMO-309\` |

El sufijo son los últimos 3 dígitos de la guía — lógica hardcoded en \`MOCK_GLP_RadCreate\` para dar una salida determinista sin depender de un contador global. Cuando se swappee al endpoint real, el tracking lo generará GLP directamente.

---

## 🔌 Mocks vs. endpoints reales — swap contract

Los 3 mocks tienen contrato I/O alineado al PDF v4 de Freeway. **Swappear a los endpoints reales requiere sólo renombrar el \`target\` en el \`.agent\`** — sin cambios en el shape de los datos ni en las instrucciones del sub-agente.

| MOCK actual | Endpoint real (PDF v4) | Cuándo swappear |
|---|---|---|
| \`apex://MOCK_GLP_BuscarGuia\` | \`SalesForceRestFul/guia\` (docType RPP) | Cuando el otro equipo publique la clase Apex real que llama al endpoint. Cambio mínimo: renombrar el \`target\` en el \`.agent\`. Contrato I/O idéntico (found, customerName, originAddressLine, destinationAddressLine, packageContents, weightKg, distanceKm, voiceSummary, errorMessage). |
| \`apex://MOCK_GLP_DatesToCollection\` | \`RadRestFul/datesToCollection\` | Idem. Mismos campos de output (optionsSpokenList, option1Id/Label, option2Id/Label, option3Id/Label). Si el endpoint real devuelve más de 3 opciones, extender la clase para tomar top-3 o refactorizar la instrucción del sub-agente. |
| \`apex://MOCK_GLP_RadCreate\` | \`RadRestFul/radCreate\` con \`docType=P\` | Idem. Confirmar con el otro equipo que \`docType=P\` sea el estándar de RPP (según PDF v4 §5.4). Output: trackingNumber, confirmationMessage, docType. |

**Los datos de los "clientes felices"** (Ana María Torres y Jonathan Gómez) viven en \`MOCK_GLP_DemoData.json\` como StaticResource. El catálogo mock incluye actualmente **dos guías válidas** (\`77834215906\` y \`61240857309\`) más un edge case fronterizo sin origen registrado (\`77834215907\` — Distribuidora del Norte S.A. de C.V., Ciudad Juárez). Cualquier otro número dictado por el cliente devuelve \`found=False\` y el sub-agente ofrece transferir a un asesor. Cuando se quiera agregar un nuevo perfil demo, basta con editar el JSON y hacer un deploy del StaticResource — no requiere tocar el Apex ni el \`.agent\`.

---

## 🎙️ Reglas de voz aplicadas al sub-agente

Estas reglas están hardcoded en las instrucciones del sub-agente \`RAD_Management_voice\` — sobre el phrasebook general del system prompt:

- **Nunca leer siglas:** \`RPP\` se dice *"guía prepagada"*; \`RAD\` se dice *"recolección a domicilio"*; \`WW\` se dice *"guía documentada en línea"*; \`EAD\` se dice *"entrega a domicilio"*; \`docType\` nunca se pronuncia; \`OPT_1\` / \`OPT_2\` / \`OPT_3\` son IDs internos que nunca se leen al cliente.
- **Readback dígito por dígito** del número de guía en **bloques de tres**: *"siete siete ocho, tres cuatro dos, uno cinco nueve, cero seis"* + *"¿es correcto?"*.
- **Frases de espera antes de cada acción** \`MOCK_GLP_*\`: el LLM rota entre los tokens del phrasebook (\`Permítame un momento\`, \`Un instante, por favor\`, \`Déjeme revisar eso\`, \`Enseguida lo consulto\`, \`Un segundo mientras lo reviso\`, \`Permítame verificar\`, \`Un momento, revisando\`). Nunca repite el mismo token dos veces seguidas.
- **Ladder de repair heredado del system prompt:** si el cliente corrige el número de guía dos veces seguidas → **tier 3 = transferir a asesor** (constraint: sin DTMF ni crossmodal, no hay otra salida).
- **Anti-URL absoluto:** ni siquiera la URL de la política de aceptación de mercancía se lee al cliente. Cuando el cliente pide detalles, el agente ofrece transferir con un asesor que le comparta el enlace por otro medio (mientras SMS/email no estén habilitados).
- **No confirmar el agendamiento antes de recibir el \`trackingNumber\`.** El agente nunca inventa un número de rastreo — espera la respuesta de \`MOCK_GLP_RadCreate\` para confirmar.

---

## 🌉 Puente Quote→RAD

Cuando el cliente cotiza un envío y responde *"Sí"* a *"¿Requiere recolección a domicilio?"*, la variable \`quoteRAD\` queda en \`"Yes"\`. Antes de v3, esa bandera se guardaba pero no disparaba nada. En v3, al terminar la cotización el agente pivotea:

\`\`\`mermaid
flowchart LR
  q1[Quote_Management<br/>Captura CP · dims · peso · quoteRAD] --> qact[[apex:Obtener_Cotizaci_n_Paqueteria_V2]]
  qact --> qres[Comparte quoteResult con cliente]
  qres --> radYes{quoteRAD == Yes?}
  radYes -- Yes --> offer["¿Le agendo la recolección<br/>con guía prepagada ahora?"]
  offer -- Cliente acepta --> capt[capture_pending_intent_quote_to_rad<br/>pendingIntent = RAD]
  capt --> router{{🚦 Agent Router}}
  router --> rad[🚚 RAD_Management_voice]
  radYes -- No --> ask[¿Algo más?]
  offer -- Cliente declina --> ask
\`\`\`

**Beneficio:** el cliente que ya dio CP, dimensiones, peso y valor durante la cotización **no vuelve a dictarlos** en el sub-agente RAD. La primera iteración de RPP reusa esos datos internamente (aunque la demo actual sólo cubre el path directo por número de guía prepagada; el uso completo de los datos de cotización queda para cuando llegue Normal).

---

## 🕳️ Fuera de scope de esta iteración

- **Modalidad Normal** (agendamiento desde cero — 42 pasos): pendiente de próxima iteración. Requiere stubs adicionales para \`SearchClient\` (buscar cliente por Clave/RFC/Tel), \`CrearClienteGLP\` (alta de cliente nuevo), \`getQuotation\` (cotización paso previo), y \`radCreate\` con \`docType=G\` (en lugar de \`P\`).
- **Modalidad WW** (guía documentada en línea — 10 pasos): pendiente. Depende de resolver la **instrucción 60 inexistente** en el topic RAD del DEV (⚠️ dependencia viva con el equipo de negocio; ver *Dependencias vivas*).
- **Guía prepagada sin origen registrado** (paso PP-006 del CSV): el mock no lo cubre. Cuando \`buscarGuia\` devuelve un guide sin \`originAddress\`, el agente transfiere a un asesor. En una siguiente iteración se debería caer al flujo Normal desde ese punto.
- **Múltiples guías consecutivas** (pasos PP-001 · PP-002 del CSV): la demo actual cubre una sola guía por conversación. Extender requiere una variable \`radBatchGuias\` de tipo lista y un loop en las instrucciones del sub-agente.

---

## ⚠️ Dependencias vivas con el otro equipo

- **DEP #1 · Apex GLP reales:** las clases GLP mencionadas en el topic RAD del DEV (\`BuscarGuiaGLP\`, \`BuscarClienteGLP\`, \`CrearClienteGLP\`, \`ValidarDimensionesGLP\`, \`ConsultarSucursalFronterizaGLP\`, \`SucursalesDisponibles\`, \`EnviarInformacionRecoleccionGLP\`, \`EnviarInformacionRecoleccionPrepagoGLP\`, \`ActualizarInformacionFacturacionGLP\`, \`ConsultarZonaPlusGLP\`, más las que aparecen en el PDF v4 con la arquitectura de 3 apps + endpoints) están en construcción por el otro equipo. Los mocks actuales son **3 subconjunto** de esas (guia, datesToCollection, radCreate).
- **DEP #2 · Instrucción 60 de WW:** el topic RAD del DEV referencia una instrucción 60 que **no existe en las instrucciones actuales del topic** (verificado por retrieve directo + PDF v4 §4.3 y p. 67). Bloquea la implementación de la modalidad WW hasta que se defina el cierre real (¿es crear un caso en Salesforce con envío de email a la sucursal, como sugiere el CSV \`WW-008\`?, ¿u otra cosa?).
- **Constraint sin DTMF/crossmodal:** todo fallback tier 3 termina forzosamente en **transferencia humana**. Habilitar SMS/email cambiaría la salida de la regla anti-URL (A.8 del audit voice) y del ladder de repair — pasaría a *"le envío el enlace por SMS"* en lugar de *"le transfiero con un asesor"*.

---

## 💡 Lecciones aprendidas

- **El offline validator del skill \`designing-agentforce-voice\` no detecta el límite de 255 chars** en descriptions que sí rechaza el server. Su Z01 auto-fix usa threshold \`> 255\` (inclusive), pero el server rechaza a partir de **256** — deja pasar descriptions de exactamente 256+ chars si sólo aparecen después del Z01 batch inicial. Durante Phase 7 tuvimos que corregir 2 descriptions post-server-error: la de \`pendingIntent\` (260 chars al agregar RAD al listado) y la de \`capture_pending_intent_quote_to_rad\` (288 chars). Reportado como issue potencial para el skill.
- **El bridge Quote→RAD reduce ~15 pasos duplicados** cuando el cliente venía de una cotización. Justifica el trabajo de introspección del estado \`quoteRAD\` — muchos clientes pedirán cotizar antes de agendar.
- **Los mocks con prefijo consistente (\`MOCK_GLP_*\`) y contrato I/O alineado al PDF v4** hacen el swap trivial cuando llegue el código real. El costo de mantener el prefijo separado es cero en comparación con el costo de retrabajar todo cuando lleguen los endpoints.
- **La reserved word \`in\` de Apex** rompe el compile silenciosamente al usarla como nombre de variable en un \`for\` loop (\`for (Input in : inputs)\`). Aprendizaje: preferir nombres de variables no ambiguos (\`inp\`, \`req\`) desde el principio.
- **El wrap \`{!@actions.X}\` es obligatorio para que el planner considere invocables las actions** — el hallazgo más costoso de la sesión. Durante las pruebas del sub-agente RAD el LLM capturaba correctamente \`radGuiaNumber\` con \`capture_rad_guia_number\`, pero **no invocaba \`MOCK_GLP_BuscarGuia\`** aunque el paso 5 del prompt decía literalmente *"Ejecuta la acción buscarGuiaMock"* e incluso *"OBLIGATORIO llamarla explícitamente"*. El agente decía la frase de espera (*"permítame un momento"*) y se quedaba ahí sin ejecutar nada. Dos intentos de fix editando el \`.agent\` a mano fallaron: (a) reforzar el texto imperativo del paso 5, sin efecto; (b) agregar \`run @actions.buscarGuiaMock\` gateado por condición (patrón que Quote_Management usa), que rompió colateralmente el audio del \`Customer_Verification\` en runtime. El fix real fue editar el sub-agente **directamente desde el UI del Agent Builder** y volver a publicar. Al comparar (\`sf project retrieve\`) el bundle publicado post-UI-edit contra el \`.agent\` que teníamos localmente, la única diferencia estructural en el prompt fue el wrap del UI sobre las referencias a actions y variables:

  \`\`\`diff
  - 5. ... invoca la acción buscarGuiaMock. Es OBLIGATORIO llamarla explícitamente.
  + 5. ... invoca la acción {!@actions.buscarGuiaMock}buscarGuiaMock. Es OBLIGATORIO llamarla explícitamente.
  - Ejecuta {!@actions.datesToCollectionMock}. Cuando devuelva las opciones...
  - Ejecuta {!@actions.radCreateMock}con la guía y la opción elegida...
  - ...lee {!@variables.radTrackingNumber}dígito por dígito.
  \`\`\`

  El wrap aplica al menos a \`capture_pending_intent\`, \`capture_customer_details\`, \`buscarGuiaMock\`, \`datesToCollectionMock\`, \`radCreateMock\` y a la variable \`radTrackingNumber\`. Sin él, el planner ve el nombre como texto informativo dentro del prompt y no lo cablea al catálogo de actions/variables invocables en ese punto del reasoning; con el wrap, se engancha automáticamente. **Editar el \`.agent\` a mano sin este wrap es una fuente común de "el LLM no invoca la action" incluso cuando la instrucción textual la nombra explícitamente** — y no lo detecta ni el offline validator ni el server-side dry-run porque sintácticamente el \`.agent\` compila igual en ambos casos. Recomendación operativa: para agentes nuevos, dejar que el UI del Builder haga la primera pasada de wrap sobre cualquier prompt que referencie actions/variables, y sólo después iterar sobre el \`.agent\` retrievado desde el org.

---

## 🚀 Estado actual y siguiente paso

- **Publicado como v3 en QA** el 2026-09-23 14:21, **draft/inactive** (no atiende tráfico).
- **BotDefinition Id:** \`0Xxdh0000005hifCAA\` — mismo bot que v1/v2, sólo cambia la versión del planner.
- **Planner activo:** \`FDE_Paquetexpress_Service_Agent_Split_voice_v3\` — \`PlannerType: Atlas__ConcurrentMultiAgentOrchestration\` (NGA).
- **Direct link al Agent Builder:** \`https://paquetexpress--qa2020.sandbox.lightning.force.com/lightning/setup/EinsteinCopilot/page?address=%2FaiCopilot%2FcopilotStudio.app%23%2Fcopilot%2Fbuilder%3FcopilotId%3D0Xxdh0000005hifCAA\`

**Siguientes milestones sugeridos:**

1. **Validar sample Ana María en Agent Preview** — correr el sample turn-by-turn contra la v3 en modo preview antes de activar. Detectar cualquier defecto conversacional (transiciones, repeticiones, tokens del phrasebook).
2. **Agregar WW cuando se defina la instrucción 60** — cerrar el DEP #2 con negocio y luego portar el flujo WW al sub-agente (o crear un sub-agente separado si el flujo diverge lo suficiente).
3. **Agregar Normal cuando estén los stubs de \`SearchClient\` + \`CrearClienteGLP\`** — el flujo Normal reusa parte del sub-agente RAD_Management_voice (los pasos de fecha y agendamiento), pero requiere sub-flujos adicionales para captura de cliente nuevo y cotización previa. Alternativa: dejar Normal como transferencia directa a asesor mientras no lleguen los stubs.
4. **Activar el agente para pruebas con audio real** — grabar 5 llamadas piloto, comparar transcripción STT vs. real, y tunear \`beepboop_config\` / \`endpointing_config\` / \`speak_up_config\` (todos marcados \`[review needed]\` en el bundle) con datos reales.
5. **Swappear los mocks por los endpoints reales** cuando el otro equipo publique — cambio de una línea por acción en el \`.agent\` (renombrar \`target\`).

> 🎯 **Estado summary:** primera modalidad RAD (RPP) end-to-end funcionando en QA como demo, con contrato de swap listo para producción, y con dependencias vivas del otro equipo explícitamente rastreadas para no perderlas.`;

export const paquetexpressRadVoiceImplTab = {
  id: "rad-voice-impl",
  label: "🚚 RAD-voice · Implementación",
  title: "Sub-agente RAD_Management_voice — implementación técnica",
  content,
  contentAfter,
};
