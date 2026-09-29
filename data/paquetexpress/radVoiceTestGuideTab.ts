// Guía de pruebas del sub-agente RAD_Management_voice — versión extendida (2026-09-29).
// Cubre las tres ramas RPP / WW / Normal desplegadas como Draft en QA, con guiones
// turn-by-turn, datos de prueba y qué debe pasar en cada escenario.
// Complementa `radVoiceImplTab` (implementación técnica de la v3 con RPP happy path).

const content = `> 🧪 **Guía de pruebas RAD-voice — v4 (Draft en QA)** — el 2026-09-29 se desplegó como **Draft del Agent Builder** una versión extendida del sub-agente \`RAD_Management_voice\` que cubre las tres modalidades del proceso RAD: **RPP** (guía prepagada, ya en v3), **WW** (guía documentada en línea, nueva) y **Normal** (recolección natural, nueva). Esta pestaña documenta cómo probar cada rama en el Agent Preview del Builder — qué preguntar, qué datos usar y qué debe hacer el agente en cada turno.

> 🔍 **Complemento técnico:** si quieres el detalle de arquitectura, contrato de swap de mocks y el resumen de la v3 RPP, revisa la pestaña **[🚚 RAD-voice · Implementación](#rad-voice-impl)**. Esta pestaña se enfoca solo en cómo probar.

## 🎯 En una frase

Un guion práctico para probar las **tres ramas del RAD** en el Preview del Agent Builder — con datos válidos preparados en los mocks, tres flujos determinísticos verificables paso a paso, y expectativas claras de qué debe decir/hacer el agente en cada turno.

## 📌 Qué cambió en la v4 vs. la v3

| Aspecto | v3 (RPP happy path) | **v4 (RPP + WW + Normal)** |
|---|---|---|
| Ramas soportadas | 1 (RPP) | **3** (RPP · WW · Normal) |
| Intake común (contenido + política + tipo) | Estaba embebido en la rama RPP | **Extraído a fase común obligatoria** — ninguna rama arranca sin pasar por el intake |
| Variables del sub-agente | 6 | **45+** (radType, radContentAccepted, radPolicyConfirmed, radOrigCustomer*, radDestCustomer*, radPackageCount, radDeclaredValue…) |
| Mocks Apex | 3 (\`MOCK_GLP_BuscarGuia\`, \`_DatesToCollection\`, \`_RadCreate\`) | **8** — se agregaron \`MOCK_GLP_BuscarCliente\`, \`_CrearCliente\`, \`_ConsultarSucursalFronteriza\`, \`_ValidarDimensiones\`, \`_SucursalesDisponibles\` |
| Determinismo | Buscar guía + crear recolección automáticos | + Buscar cliente (origen y destino) + Consultar zona fronteriza + Validar dimensiones + Consultar sucursales + Reset de estado |
| Escenarios de escalación forzada | Guía no encontrada | + Contenido prohibido · Dimensiones excedidas · Valor declarado > 50k · Datos de guía incorrectos · WW (por inst. 60 incompleta) |
| Estado en QA | Publicado v3 (BotVersion) | **Draft en Agent Builder** — no crea BotVersion nueva hasta activación manual |

---

## 🚀 Cómo entrar al Preview

**Pasos:**

1. Abrir el Agent Builder de QA:
   \`https://paquetexpress--qa2020.sandbox.lightning.force.com/lightning/setup/EinsteinCopilot/page?address=%2FaiCopilot%2FcopilotStudio.app%23%2Fcopilot%2Fbuilder%3FcopilotId%3D0Xxdh0000005hifCAA\`
2. Seleccionar el bundle \`FDE_Paquetexpress_Service_Agent_Split_voice\`.
3. Verificar que en la parte superior aparezca **"Draft"** — significa que estás sobre la versión con los cambios de la v4, no sobre la última publicada.
4. Click en **"Preview conversation"**.
5. En el modo Preview, dictar los turnos del cliente según la rama que quieras probar (ver escenarios abajo).

**Antes de arrancar cualquier escenario, siempre pasa por la verificación:**

\`\`\`
Turno 1 · Agente
  "¡Hola, buen día! Soy el asistente virtual de Paquetexpress. Para
   poder ayudarle mejor, ¿me indica su nombre completo, por favor?"

Turno 1 · Cliente
  "Ana María Torres López. Quiero agendar una recolección."

Turno 2 · Agente
  "Gracias, Ana María. ¿Me dicta su correo electrónico?"

Turno 2 · Cliente
  "a punto torres arroba empaques hb dos punto com"

Turno 3 · Agente
  "Entendí: a punto torres arroba empaques h b dos punto com,
   ¿es correcto?"

Turno 3 · Cliente
  "Sí."

Turno 4 · Agente
  "Gracias. Un momento mientras valido sus datos, mientras tanto
   ¿en qué le puedo ayudar hoy?"
  ← isVerified = True
  ← pendingIntent = "RAD"
  ← transiciona automáticamente a RAD_Management_voice
\`\`\`

> ⚠️ **Regla en toda la prueba:** el agente **NO** te vuelve a pedir nombre ni correo cuando ya estás verificado. Si te los pide, es un bug.

---

## 🧭 Fase de intake común — obligatoria antes de cualquier rama

Es la primera fase del sub-agente RAD. Aplica a **RPP, WW y Normal** por igual. Sin ella no se puede elegir el tipo de recolección.

**Turnos esperados:**

\`\`\`
Turno 5 · Agente (recién entrado al sub-agente RAD)
  "¿Qué contiene el paquete que quiere que recojan?"

Turno 5 · Cliente (contenido válido)
  "Ropa nueva para retail."

Turno 6 · Agente
  "Gracias. Antes de continuar, necesito confirmar que su envío
   cumple con nuestra política de aceptación de mercancía.
   ¿Podemos continuar con ese entendido?"
  ← capture_rad_content_accepted → radContentDescription = "Ropa nueva…"
                                    radContentAccepted = True

Turno 6 · Cliente
  "Sí, todo en orden."

Turno 7 · Agente
  "Perfecto. ¿Su recolección es con guía prepagada, con guía
   documentada en línea, o es una recolección normal?"
  ← capture_rad_policy_confirmed → radPolicyConfirmed = True
\`\`\`

**Qué debe pasar en el intake:**

- El agente **NO** debe leer la URL \`https://www.paquetexpress.com.mx/politica-de-aceptacion-de-mercancia\` al cliente.
- El agente **NO** debe leer las siglas RPP, WW, RAD, EAD. En su lugar usa "guía prepagada", "guía documentada en línea", "recolección a domicilio", "entrega a domicilio".
- Debe hacer la pregunta del tipo en **una sola frase natural** con "o" separando las opciones — no una lista numerada.

**Escenario negativo — contenido prohibido:**

\`\`\`
Turno 5 · Cliente
  "Es una pistola nueva, sin cargar."

Turno 6 · Agente
  "Lamento informarle que ese contenido no es transportable
   con nuestro servicio. Le voy a comunicar con un asesor
   para cerrar la conversación."
  ← transición a Escalation
\`\`\`

Cualquier contenido de la lista PAM (armas, explosivos, drogas, dinero, joyería, metales preciosos, animales, restos humanos, mercancías NOM-002-SCT, artículos piratas, boletos de lotería extranjera) debe disparar la transferencia inmediata.

---

## 🅰️ Escenario RPP · Happy path (Ana María Torres López)

**Perfil demo:** Ana María Torres López · \`a.torres@empaqueshb2.com\` · guía \`77834215906\` · Ropa nueva para retail · CDMX intracity · 5 kg.

**Continúa el turno 7:**

\`\`\`
Turno 7 · Cliente
  "Con guía prepagada, ya la tengo."
  ← capture_rad_type → radType = "RPP"

Turno 8 · Agente
  "Perfecto. ¿Me dicta el número de guía prepagada, por favor?"

Turno 8 · Cliente
  "Setenta y siete, ochenta y tres, cuarenta y dos, quince,
   nueve cero seis."

Turno 9 · Agente
  "Entendí: siete siete ocho, tres cuatro dos, uno cinco nueve,
   cero seis. ¿Es correcto?"

Turno 9 · Cliente
  "Sí, correcto."
  ← capture_rad_guia_number → radGuiaNumber = "77834215906"

Turno 10 · Agente
  "Permítame un momento…"
  [MOCK_GLP_BuscarGuia — automático]
  "La guía corresponde a un envío de Ropa nueva para retail con
   peso de cinco kilos, origen en Ciudad de México. ¿Los datos
   son correctos?"
  ← radGuiaFound = True
  ← radGuiaVoiceSummary poblado
  ← radGuiaSearched = True

Turno 10 · Cliente
  "Sí."

Turno 11 · Agente
  "Enseguida lo consulto…"
  [MOCK_GLP_DatesToCollection]
  "Tengo disponible mañana entre nueve y once de la mañana,
   mañana entre once y una de la tarde, o pasado mañana entre
   nueve y once de la mañana. ¿Cuál prefiere?"

Turno 11 · Cliente
  "La primera."

Turno 12 · Agente
  "Un momento mientras la agendo…"
  [MOCK_GLP_RadCreate — automático]
  "Listo. Su recolección quedó agendada y recibirá un correo
   electrónico con la confirmación. El número de rastreo es:
   pe equis rad demo, nueve cero seis. ¿Le ayudo con algo más?"
  ← capture_rad_selected_option → radSelectedOptionId = "OPT_1"
  ← MOCK_GLP_RadCreate devuelve trackingNumber = "PX-RAD-DEMO-906"
\`\`\`

**Qué verificar en este happy path:**

- ✅ Readback dígito por dígito en bloques de tres, con "¿es correcto?" al final.
- ✅ La búsqueda de la guía se dispara **automáticamente** — no espera a que el LLM la invoque.
- ✅ El resumen de voz lee **contenido, peso, ciudad origen** — NO lee dirección completa, NO lee IDs internos.
- ✅ Las opciones se presentan como una sola frase con "o" — no como lista numerada.
- ✅ La creación de la recolección se dispara **automáticamente** al capturar la opción.
- ✅ El tracking se lee dígito por dígito.
- ✅ El agente **NO** dice "voy a transferirte a otro agente" al pasar por Customer_Verification → RAD.

---

## 🅱️ Escenario RPP · Guía no encontrada + reintento

**Datos:** cualquier número que no sea \`77834215906\`, \`77834215907\` o \`61240857309\`.

\`\`\`
Turno 9 · Cliente (después del readback)
  "Sí, correcto."
  ← radGuiaNumber = "12345678900"

Turno 10 · Agente
  "Permítame un momento…"
  [MOCK_GLP_BuscarGuia devuelve found = False]
  "No encontré esa guía en el sistema. ¿Le transfiero con un
   asesor para que lo revise?"
  ← radGuiaSearched = True
  ← radGuiaFound = False

Turno 10 · Cliente (opción A — acepta transferencia)
  "Sí, por favor."
  → transición a Escalation

Turno 10 · Cliente (opción B — quiere reintentar)
  "Espere, me equivoqué, es siete siete ocho tres cuatro dos
   uno cinco nueve cero seis."

Turno 11 · Agente
  ← reset_rad_guia_state → radGuiaNumber = ""
                          radGuiaFound = False
                          radGuiaSearched = False
  "Perfecto. Entendí siete siete ocho, tres cuatro dos, uno
   cinco nueve, cero seis. ¿Es correcto?"
\`\`\`

**Qué verificar:**

- ✅ El agente NO se queda en loop diciendo "no encontré la guía" turno tras turno.
- ✅ Al pedir reintentar, limpia el estado y vuelve al readback.

---

## 🅲 Escenario RPP · Perfil alterno (Jonathan Gómez)

**Perfil demo:** Jonathan Gómez · \`jonathan@gmail.com\` · guía \`61240857309\` · Documentos · Monterrey → Guadalajara · 2 kg.

Sirve para probar con un correo corto (una sola palabra, sin puntos internos) y una ruta interior (Monterrey→GDL, 700 km). Mismo flujo turn-by-turn que Ana María, con estos cambios:

| Turno | Cliente dicta | Agente responde |
|---|---|---|
| 2 | \`jonathan@gmail.com\` | Readback en 4 tokens: *"jonathan arroba gmail punto com"* |
| 5 | *"Documentos"* | Contenido válido → política |
| 8 | \`61240857309\` | Readback: *"seis uno dos, cuatro cero ocho, cinco siete tres, cero nueve"* |
| 10 | Confirmación | Resumen: *"envío de documentos con peso de dos kilos, origen en Monterrey"* |
| 12 | Elige opción | Tracking: *"pe equis rad demo, tres cero nueve"* |

---

## 🅳 Escenario WW · Guía documentada en línea

**Contexto:** WW cubre a clientes que ya generaron su guía en el portal en línea. En el proceso RAD documentado por el equipo de negocio, la instrucción 60 (que definía el cierre real de WW) quedó **incompleta**. Mientras se define, el sub-agente hace lo siguiente:

\`\`\`
Turno 7 · Cliente
  "Con guía documentada en línea."
  ← capture_rad_type → radType = "WW"

Turno 8 · Agente
  "Le pido de favor no usar cartones de huevo como empaque
   para su envío."
  "Para completar el agendamiento con guía documentada en
   línea, le voy a comunicar con un asesor especializado.
   Le mantengo en línea."
  ← transición a Escalation
\`\`\`

**Qué verificar:**

- ✅ El agente **sí** entrega el mensaje de los cartones de huevo (paso 21 del doc RAD).
- ✅ El agente **NO** intenta capturar ningún dato adicional en la rama WW.
- ✅ Transiciona a Escalation, no crea caso en Salesforce por WW aún.

> 📝 **Nota de negocio:** cuando el equipo de Paquetexpress defina la instrucción 60 (¿crear caso? ¿enviar email a sucursal? ¿otra cosa?), esta rama debe reemplazar la transferencia por el cierre real. Está aislada como "pendiente de negocio" para que sea trivial de reemplazar.

---

## 🅴 Escenario Normal · Cliente conocido con dirección registrada

**Perfil demo:** cliente Ana María Torres López (mismo perfil que RPP), pero pidiendo recolección **normal** (sin guía prepagada).

\`\`\`
Turno 7 · Cliente
  "Es una recolección normal, no tengo guía."
  ← capture_rad_type → radType = "Normal"

Turno 8 · Agente
  "Muy bien, comencemos con los datos del origen. ¿Me
   proporciona su llave de cliente? Si no la tiene a la
   mano, con su RFC también puedo buscarlo."

Turno 8 · Cliente
  "No tengo llave. Mi RFC es TOLA ochocientos cincuenta y
   siete, doce, eme ene cuatro."

Turno 9 · Agente
  "Entendí: TOLA-850712-MN4, ¿es correcto?"

Turno 9 · Cliente
  "Sí."
  ← capture_orig_customer_search → radOrigRfc = "TOLA850712MN4"

Turno 10 · Agente
  "Un instante mientras la consulto…"
  [MOCK_GLP_BuscarCliente — automático]
  "Encontré el registro de Ana María Torres López con
   dirección en Avenida Insurgentes Sur mil doscientos
   treinta y cuatro, interior cinco B, colonia Del Valle
   Centro, código postal cero tres uno cero cero, en
   Ciudad de México. ¿Es esta la dirección de origen para
   la recolección, o me indica otra?"
  ← radOrigCustomerFound = True
  ← radOrigHasAddresses = True
  ← radOrigAddressVoiceSummary poblado

Turno 10 · Cliente
  "Sí, esa está bien."

Turno 11 · Agente
  ← confirm_orig_address → radOrigAddressConfirmed = True
  ← capture_orig_postal_code → radOrigPostalCode = "03100"
  [MOCK_GLP_ConsultarSucursalFronteriza — automático · CDMX no es frontera]
  "Ahora dígame nombre completo y teléfono de la persona
   que estará en el domicilio, más alguna referencia útil
   como color de casa o punto de referencia."

Turno 11 · Cliente
  "Ana María Torres, cinco cinco, uno dos tres cuatro,
   cinco seis siete ocho. Casa blanca con portón azul."

Turno 12 · Agente
  "Entendí: cinco cinco, uno dos tres, cuatro cinco seis,
   siete ocho, ¿es correcto?"

Turno 12 · Cliente
  "Sí."
  ← capture_orig_contact → radOrigContactCaptured = True

Turno 13 · Agente
  "¿Cuántos paquetes va a enviar en esta recolección?"

Turno 13 · Cliente
  "Uno."
  ← capture_package_count → radPackageCount = 1

Turno 14 · Agente
  "Le pido de favor no usar cartones de huevo como empaque
   para su envío. Vamos con el paquete uno. ¿De qué es el
   empaque?"

Turno 14 · Cliente
  "Caja de cartón."

Turno 15 · Agente
  "¿Qué contiene?"

Turno 15 · Cliente
  "Ropa nueva."

Turno 16 · Agente
  "¿Cuánto pesa aproximadamente, en kilos?"

Turno 16 · Cliente
  "Cinco kilos."

Turno 17 · Agente
  "¿Cuál es el largo en centímetros?"

Turno 17 · Cliente
  "Cuarenta."

Turno 18 · Agente
  "¿Y el ancho?"

Turno 18 · Cliente
  "Treinta."

Turno 19 · Agente
  "¿Y el alto?"

Turno 19 · Cliente
  "Veinte."
  ← capture_packages_summary → radPackagesSummary = "Un paquete de caja
                                                     de cartón con ropa
                                                     nueva, 5 kg, 40x30x20 cm."
                                radTotalWeight = 5
                                radMaxLength = 40
                                radMaxWidth = 30
                                radMaxHeight = 20

Turno 20 · Agente
  "¿Me proporciona la clave del producto del SAT? Si no
   la tiene, con gusto uso una clave genérica."

Turno 20 · Cliente
  "No la tengo."
  ← capture_sat_key → radSatKey = "01010101"

Turno 21 · Agente
  [MOCK_GLP_ValidarDimensiones — automático]
  ← radDimensionsValid = True
  "Perfecto. Ahora los datos de destino. ¿Me proporciona
   la llave de cliente del destinatario? Si no la tiene,
   con su RFC también puedo buscarlo."

… (continúa con los mismos pasos para destino, después
     tipo de entrega, pago, valor declarado, cobertura,
     servicios adicionales, fecha de recolección)
\`\`\`

**Qué verificar en la primera parte:**

- ✅ El agente **NO** pide dirección del origen — la lee del sistema y solo pide confirmación.
- ✅ La búsqueda de cliente se dispara **automáticamente** cuando hay al menos uno de los identificadores (llave / RFC / nombre+teléfono).
- ✅ La consulta de zona fronteriza se dispara automáticamente cuando hay CP de origen.
- ✅ El mensaje de "no cartones de huevo" se dice **una sola vez**, antes de pedir detalles del primer paquete.
- ✅ Los detalles del paquete se piden **uno por turno** — no una pregunta con múltiples datos.

---

## 🅵 Escenario Normal · Cliente NO encontrado (alta manual)

**Datos:** cualquier RFC/nombre que no sea de los 3 clientes mock (\`TOLA850712MN4\` / \`DNO120345XYZ\` / \`GOJO900215HN7\`).

\`\`\`
Turno 9 · Cliente
  "Mi RFC es XAXX 010101 000." (o cualquier RFC no reconocido)
  ← radOrigRfc = "XAXX010101000"

Turno 10 · Agente
  [MOCK_GLP_BuscarCliente — automático]
  "No encontré ese registro. Voy a tomar sus datos y a
   darlo de alta. ¿Me indica su apellido paterno?"
  ← radOrigCustomerFound = False

Turno 10 · Cliente
  "Torres."

Turno 11 · Agente
  "¿Apellido materno?"

Turno 11 · Cliente
  "López."

Turno 12 · Agente
  "¿Primer nombre?"

Turno 12 · Cliente
  "Ana María."

Turno 13 · Agente
  "¿RFC? Puede saltarlo si no lo recuerda."

Turno 13 · Cliente
  "TOLA ochocientos cincuenta y siete doce eme ene cuatro."

Turno 14 · Agente
  "¿La calle?"

Turno 14 · Cliente
  "Insurgentes Sur."

… (continúa uno por turno: número exterior, interior,
     colonia, código postal con readback dígito por dígito)

Turno 20 · Agente
  ← capture_orig_address_manual → radOrigAddressVoiceSummary,
                                  radOrigPostalCode = "03100"
  ← confirm_orig_address → radOrigAddressConfirmed = True
  "Ahora dígame nombre completo y teléfono de la persona…"
\`\`\`

**Qué verificar:**

- ✅ El agente pide los datos **uno por turno**, no en bloque.
- ✅ Aplica readback en el código postal, dígito por dígito.
- ✅ Cuando termina el alta, avanza al contacto sin repetir datos.

---

## 🅶 Escenario Normal · Dimensiones excedidas

**Datos:** cualquier medida > 300 cm largo, > 200 cm ancho, > 180 cm alto, o peso > 2000 kg.

\`\`\`
Turno 19 · Cliente (largo excesivo)
  "El largo es tres metros y medio."   → 350 cm

Turno 21 · Agente
  [MOCK_GLP_ValidarDimensiones — devuelve valid=False]
  "Alguna de las medidas del envío excede los límites del
   servicio. Le voy a comunicar con un asesor para revisarlo.
   Le mantengo en línea."
  ← transición a Escalation
\`\`\`

**Qué verificar:** transferencia inmediata al detectar dimensiones fuera de límites.

---

## 🅷 Escenario Normal · Valor declarado > 50,000

\`\`\`
Turno N · Cliente
  "Sesenta mil pesos."   → radDeclaredValue = 60000

Turno N+1 · Agente
  "Por el monto del envío, necesito comunicarle con un
   asesor especializado. Le mantengo en línea."
  ← transición a Escalation
\`\`\`

**Qué verificar:** transferencia inmediata cuando el valor supera el umbral definido en el doc RAD (instrucción 41).

---

## 🅸 Escenario Normal · Zona fronteriza

**Datos:** CP de origen que empiece con \`32\` (Chihuahua), \`88\` (Tamaulipas) o \`22\` (Baja California).

\`\`\`
Turno N (captura del CP origen)
  ← radOrigPostalCode = "32000"
  [MOCK_GLP_ConsultarSucursalFronteriza — automático]
  ← radOrigIsFronteriza = True
\`\`\`

En esta primera versión el flag se calcula pero **no cambia la conversación** — se deja como base para futuras iteraciones donde negocio decida qué requerimientos adicionales aplican en frontera. Verificar solo que la acción se dispara y el flag queda en True.

---

## 🅹 Escenario Normal · Ocurre (recoger en sucursal)

**Datos:** CP de destino \`06700\` (Roma Norte, CDMX), \`44630\` (Providencia, GDL), o \`64000\` (Centro, MTY).

\`\`\`
Turno N · Agente (después de capturar contacto de destino)
  "¿La entrega será en el domicilio del destinatario, o
   prefiere que se recoja en sucursal?"

Turno N · Cliente
  "En sucursal."
  ← capture_shipment_delivery → radShipmentDelivery = "Ocurre"

Turno N+1 · Agente
  [MOCK_GLP_SucursalesDisponibles — automático]
  "Cerca de ese código postal tengo dos sucursales: Roma
   Norte, en Avenida Álvaro Obregón doscientos, o Reforma
   Centro, en Paseo de la Reforma quinientos. ¿En cuál
   prefiere recoger?"

Turno N+1 · Cliente
  "Roma Norte."
  ← capture_branch_name → radBranchName = "Sucursal Roma Norte"
\`\`\`

**Qué verificar:**

- ✅ Las sucursales se consultan **automáticamente** al elegir Ocurre.
- ✅ Se presentan como frase natural, no lista numerada.

---

## 📊 Datos de prueba consolidados

### Clientes en el mock GLP

| Identificador | Cliente | Uso |
|---|---|---|
| Customer key \`PXCUST001\` · RFC \`TOLA850712MN4\` · Nombre "Ana María Torres" | Ana María Torres López | Cliente feliz por defecto en RPP y Normal. Dirección: CDMX. |
| Customer key \`PXCUST002\` · RFC \`DNO120345XYZ\` · Nombre "Distribuidora del Norte" | Distribuidora del Norte S.A. de C.V. | Cliente B2B fronterizo. Dirección: Ciudad Juárez. |
| Customer key \`PXCUST003\` · RFC \`GOJO900215HN7\` · Nombre "Jonathan Gómez" | Jonathan Gómez | Perfil alterno con datos limpios de voz. Dirección: Monterrey. |
| Cualquier otro identificador | (No encontrado) | Dispara la rama de alta manual en Normal. |

### Guías prepagadas en el mock

| Guía | Cliente | Ruta | Contenido | Peso |
|---|---|---|---|---|
| \`77834215906\` | Ana María Torres López | CDMX → CDMX | Ropa retail | 5 kg |
| \`77834215907\` | Distribuidora del Norte | (sin origen) → Cd. Juárez | Autopartes | 22 kg |
| \`61240857309\` | Jonathan Gómez | MTY → GDL | Documentos | 2 kg |
| Cualquier otro número | — | — | — | Devuelve found=False |

### Códigos postales especiales

| CP | Zona | Comportamiento |
|---|---|---|
| \`32xxx\` | Frontera Chihuahua | \`radOrigIsFronteriza = True\` |
| \`88xxx\` | Frontera Tamaulipas | \`radOrigIsFronteriza = True\` |
| \`22xxx\` | Frontera Baja California | \`radOrigIsFronteriza = True\` |
| \`06700\` | Roma Norte (CDMX destino) | Ofrece Roma Norte + Reforma Centro |
| \`44630\` | Providencia (GDL destino) | Ofrece Providencia + Centro Guadalajara |
| \`64000\` | Centro (MTY destino) | Ofrece Monterrey Centro + San Pedro |
| Cualquier otro | Nacional / genérico | Sucursal genérica de referencia |

### Umbrales que disparan escalación

| Trigger | Valor límite | Instrucción del doc RAD |
|---|---|---|
| Contenido prohibido | Lista PAM (armas, drogas, dinero, etc.) | Instrucción 2 |
| Guía prepagada no encontrada | — | (Diseño interno del sub-agente) |
| Datos de guía incorrectos | Cliente responde "no" al resumen | (Diseño interno) |
| Dimensiones fuera de límites | > 300×200×180 cm o > 2000 kg | Instrucción 25 |
| Valor declarado excesivo | > 50,000 MXN | Instrucción 41 |
| Rama WW | (Todo el flujo) | Instrucción 60 pendiente |

---

## 🎙️ Reglas de voz que deben cumplirse en TODAS las ramas

- **Nunca leer siglas.** \`RPP\` = "guía prepagada"; \`WW\` = "guía documentada en línea"; \`RAD\` = "recolección a domicilio"; \`EAD\` = "entrega a domicilio". Los ids internos (OPT_1, OPT_2, OPT_3, docType, customer keys) nunca se leen al cliente.
- **Readback obligatorio con dígito por dígito** en: número de guía (bloques de tres), teléfono (bloques de 2-3-3-2), código postal (cinco dígitos claros), RFC (letras + números por segmentos).
- **Readback natural** en: nombre completo, direcciones (calle + colonia + CP como frase), montos de dinero (en palabras).
- **Frases de espera** rotadas antes de cada acción síncrona: *"Permítame un momento", "Un instante, por favor", "Déjeme revisar eso", "Enseguida lo consulto", "Un segundo mientras lo reviso", "Permítame verificar", "Un momento, revisando"*. Nunca la misma dos veces seguidas.
- **Ladder de repair:** dos fallas consecutivas en el mismo dato → transferencia a asesor.
- **Anti-URL absoluto.** Ni la política de aceptación de mercancía ni ninguna otra URL se lee al cliente.
- **Continuidad:** al pasar entre sub-agentes (verificación → RAD → Escalation) NUNCA decir "voy a transferirte a otro agente" — para el cliente siempre es el mismo asistente.
- **Audio tags de ElevenLabs v3.** El agente puede insertar tags entre corchetes ([warm], [calm], [excited], [inhales], [exhales], etc.) para naturalidad. Verificar que NO se lean como texto literal — si escuchas "corchete guarm corchete" en el audio, ese tag se "leakea" y hay que retirarlo de la paleta.

---

## 🧾 Cheat sheet — cómo saber si algo se rompió

| Síntoma | Diagnóstico probable | Cómo verificar |
|---|---|---|
| El agente pide dirección en el flujo RPP | La instrucción "no le pidas dirección" no se está aplicando | Revisar bloque \`if radType == "RPP" and radGuiaNumber == ""\` |
| El agente responde "No encontré esa guía" antes de que el cliente diga nada | El guard \`radGuiaSearched == True\` no está funcionando | Verificar que la variable existe y se resetea con \`reset_rad_guia_state\` |
| El agente pide nombre y correo dos veces | El pivote Quote→RAD limpió \`pendingIntent\` | Verificar el \`before_reasoning\` del subagente origen (debe limpiar SOLO su intent) |
| El agente lee "opción OPT uno" al cliente | La regla anti-ID se rompió | Revisar la instrucción del bloque de fechas |
| El agente crea el caso antes de ejecutar la acción | Orden de instrucciones invertido | Revisar el orden en \`reasoning: instructions:\` |
| El agente NO invoca la acción aunque la instrucción la nombra | Falta el wrap \`{!@actions.X}\` | Editar desde el Agent Builder UI y re-retrievar |
| El TTS pronuncia un tag como texto ("corchete warm corchete") | Leak del audio tag | Retirar ese tag específico de la paleta en el system prompt |
| El agente pregunta el tipo antes de confirmar la política | El intake común no se está respetando | Verificar guards \`radContentAccepted != True or radPolicyConfirmed != True\` |

---

## 🚀 Cuando el test pase — cómo publicar

Mientras se itera, el bundle vive como **Draft** en el Agent Builder y **no atiende tráfico**. Publica solo cuando el sample de la rama que estás probando pasa completo:

\`\`\`bash
# Publica el bundle como nueva BotVersion
sf agent publish authoring-bundle \\
  --api-name FDE_Paquetexpress_Service_Agent_Split_voice \\
  --target-org paquetexpress-sandbox \\
  --skip-retrieve
\`\`\`

**Durante iteración (más común):** solo hacer deploy del bundle sin publish para actualizar el Draft:

\`\`\`bash
sf project deploy start \\
  --source-dir force-app/main/default/aiAuthoringBundles/FDE_Paquetexpress_Service_Agent_Split_voice \\
  --target-org paquetexpress-sandbox
\`\`\`

---

## 🕳️ Fuera de scope de esta versión

- **Cotización previa en Normal.** El doc RAD original menciona un paso de cotización antes del agendamiento en Normal. En esta versión se omite — el cliente ya conoce su tarifa o se resuelve por el agente humano en la escalación por valor >50k.
- **Recolección con múltiples guías consecutivas** (pasos 5-6 del doc RAD). La versión actual soporta una guía por conversación en RPP.
- **Endpoints GLP reales.** Los 8 mocks siguen activos. El swap a producción es cambiar \`target: "apex://MOCK_GLP_X"\` por el nombre real cuando el otro equipo publique.
- **Guía prepagada sin origen registrado** (paso PP-006 del CSV) — el mock \`77834215907\` cubre el edge case pero el agente aún transfiere; en siguiente iteración debería caer al flujo Normal desde ese punto.
- **Instrucción 60 de WW** — pendiente de definición por parte del equipo de negocio.

---

> 🎯 **Estado summary:** las tres ramas del RAD (RPP + WW + Normal) están desplegadas como Draft en QA con datos mock listos. RPP ya se probó exitosamente en la iteración anterior. WW y Normal quedan listos para prueba manual guiada por esta pestaña. Cuando la prueba pase, el equipo publica la versión con un solo comando y comienza el ciclo de pilotos con audio real.`;

export const paquetexpressRadVoiceTestGuideTab = {
  id: "rad-voice-test-guide",
  label: "🧪 RAD-voice · Guía de pruebas",
  title: "Guía de pruebas del sub-agente RAD_Management_voice — RPP · WW · Normal",
  content,
};
