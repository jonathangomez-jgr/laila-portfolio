// Tab de análisis de Recolección a Domicilio (RAD) para el proyecto Paquetexpress.
// Fuente primaria: Files/Copy JGR of Análisis RAD.xlsx (hoja RAD-Diseño).
// Fuente técnica adicional: Files/Documentacion_RAD_Agentforce_Paquetexpress_Freeway_v4.pdf (sept 2026).
// Fuentes oficiales secundarias: paquetexpress.com.mx/servicios y /politica-de-aceptacion-de-mercancia.
// Todas las suposiciones (marcadas ⚠️) están listadas al final para validar con el cliente.

const content = `> 🚚 **RAD (Recolección a Domicilio)** es el servicio en el que Paquetexpress envía a un operador a recoger el paquete directamente donde está el cliente, en lugar de que el cliente lo lleve a una sucursal. Esta ficha documenta el flujo funcional completo tal como lo describe el análisis interno del cliente (\`Copy JGR of Análisis RAD.xlsx\` — hoja *RAD-Diseño*), y traduce cada paso a **qué debe hacer el Agente de Agentforce**, qué queda dentro del alcance actual y qué queda fuera.

## 🎯 En una frase

El Agente de Agentforce necesita orquestar hasta **73 pasos** —entre preguntas al cliente, validaciones contra la Política de Aceptación de Mercancía (PAM), consultas al ERP interno **GLP** y creación de casos en Salesforce— para agendar una recolección; el agente rediseñado \`Paquetexpress_Service_Agent_Split v29\` **hoy sólo captura RAD como una bandera Sí/No** dentro del flujo de cotización, sin ejecutar el flujo transaccional.

## 📌 TL;DR — los 5 puntos que importan

1. **RAD tiene 3 modalidades operativas** con flujos distintos: **Normal** (agendar desde cero), **RPP** (Recolección con guía Pre-Pagada) y **WW** (recolección para una **guía generada en línea** por el propio cliente).
2. **Los 3 flujos comparten los mismos primeros 3 pasos** (\`GE-001\` → \`GE-003\`): validar contenido contra la PAM, aceptar la PAM y elegir la modalidad.
3. **Integraciones a \`GLP\`** — el ERP/back-office logístico interno. El análisis inicial listaba 10 acciones planas; el **PDF v4 de Freeway (sept 2026) precisa** que en realidad se trata de **3 apps con múltiples endpoints REST** (\`RadRestFul\` :7007, \`SalesForceRestFul\` :7009, \`WsQuotePaquetexpress\`). Algunas acciones se agrupan: \`zonaInfo\` unifica *Zona Plus + Frontera* en una sola llamada; \`ValidarDimensionesGLP\` queda absorbida en la validación por sucursal (\`brncOCU\`). Ver *Integraciones GLP · arquitectura real*.
4. **El análisis original marca 30 de 73 pasos como "Fuera de alcance"** — Salesforce puede automatizar la captura conversacional, pero varias piezas dependen de decisiones o integraciones que hoy no están disponibles.
5. **El agente rediseñado (v29) no cubre RAD transaccionalmente** — sólo pregunta *"¿Requiere recolección a domicilio?"* dentro de la cotización nacional y guarda un \`Sí/No\` en \`quoteRAD\`. Ninguna de las acciones GLP requeridas está implementada.

---

## 📖 Glosario — términos que aparecen en el flujo

| Sigla / término | Significado | Fuente |
|---|---|---|
| **RAD** | Recolección a Domicilio — un operador de Paquetexpress pasa por el paquete donde esté el cliente | ✅ Sitio oficial [/servicios](https://www.paquetexpress.com.mx/servicios/) |
| **EAD** | Entrega a Domicilio — contraparte de RAD, entrega en casa/oficina del destinatario | ✅ Sitio oficial [/servicios](https://www.paquetexpress.com.mx/servicios/) |
| **PAM** | Política de Aceptación de Mercancía — reglas de qué se puede transportar y cómo debe embalarse | ✅ Sitio oficial [/politica-de-aceptacion-de-mercancia](https://www.paquetexpress.com.mx/politica-de-aceptacion-de-mercancia) |
| **RPP** | Recolección con guía **Pre-Pagada** — el cliente ya compró la guía por volumen/frecuencia y sólo agenda cuándo pasar por el paquete | ✅ Sitio oficial la llama *"Guías Pre-pagadas"*; la sigla RPP viene del CSV |
| **WW** | Modalidad para **guías generadas en línea** por el propio cliente (portal web, app o integración) — Paquetexpress ya tiene la guía en su sistema, sólo falta agendar cuándo pasar por el paquete. | ✅ Confirmado por el cliente |
| **GLP** | Sistema legacy tipo ERP/back-office logístico. Es donde vive la información de clientes, direcciones, tarifas, dimensiones máximas, sucursales, zonas plus, guías prepago y donde se generan las guías nuevas. Se expone hacia Salesforce como **3 apps REST** (\`RadRestFul\` :7007, \`SalesForceRestFul\` :7009, \`WsQuotePaquetexpress\`) — ver *Integraciones GLP · arquitectura real*. | ✅ Arquitectura confirmada por PDF v4 (Freeway sept 2026). Falta confirmar auth (tipo de Named Credential). |
| **SIPWEB** | Sistema legado con datos de guías **generadas en línea** por el cliente. Salesforce **NO se conecta directamente** — pasa siempre por el endpoint \`SalesForceRestFul/sipwebClient\` (dado un número de guía/rastreo, devuelve los datos capturados online). | ✅ Confirmado por PDF v4 (Freeway sept 2026) |
| **OCURRE** | Modalidad de entrega en la que el destinatario **recoge en sucursal** en lugar de recibir en domicilio | ✅ Sitio oficial + CSV paso \`NO-018\` |
| **Zona Plus** | Zonas geográficas con costos/tiempos especiales que GLP identifica por CP | ⚠️ Inferencia del CSV (\`NO-035\`) — no aparece en el sitio público |
| **Sucursal frontera / fronteriza** | Sucursales cerca de la frontera con requisitos aduanales/documentales especiales | ⚠️ Inferencia del CSV (\`NO-009\`, \`NO-026\`) |
| **Clave SAT del producto** | Clave del producto ante el SAT — dato obligatorio para la CFDI/carta porte | ✅ Regulación fiscal MX + CSV \`NO-013\` |
| **Valor declarado** | Monto en pesos por el que se asegura el paquete. Umbral crítico en **50 000 MXN**: si se supera, aplica una **regla de excepción validada** — no es transferencia automática, requiere revisión operativa antes de continuar. | ✅ CSV \`NO-032\`, \`NO-033\` + precisión PDF v4 (Freeway sept 2026) |
| **COD** | *Cash On Delivery* — servicio adicional donde el destinatario paga al recibir | ✅ CSV \`NO-036\` |
| **Acuse** | Copia digital del documento firmado por el receptor | ✅ Sitio oficial (*Acuse XT*) + CSV \`NO-036\` |
| **Regla "cajas de huevo"** | El CSV pide un mensaje explícito de **no usar cajas de huevo como embalaje**. Aparece en los 3 flujos (\`WW-001\`, \`NO-012\`, mensaje repetido) — es un pain-point operativo real del cliente. | ✅ CSV |

> 🎯 **Cómo leer el resto del documento:** las filas con ✅ vienen literalmente del \`Análisis RAD.xlsx\` o del sitio oficial. Las filas con ⚠️ son suposiciones o inferencias que **hay que confirmar con el cliente** antes de construir sobre ellas — todas están listadas al final en *Suposiciones a validar*.

---

## 🧭 Qué es RAD para Paquetexpress *(fuente oficial)*

De acuerdo con la [página oficial de servicios](https://www.paquetexpress.com.mx/servicios/), **Recolección a Domicilio (RAD)** es uno de los **servicios agregados** de Paquetexpress: *"recogen envíos donde estés"*. Es complementario a la recepción estándar en sucursal y se factura como servicio adicional en la guía.

La operación end-to-end de un RAD toca **5 sistemas** y flujos:

| # | Sistema / proceso | Rol en RAD |
|---|---|---|
| 1 | **Canal conversacional** (chat · voz · WhatsApp) | Punto donde el cliente inicia y captura toda la información necesaria |
| 2 | **PAM** — página web pública | Referencia legal/operativa: qué se puede transportar, cómo debe embalarse |
| 3 | **GLP** — ERP logístico | Master de clientes, direcciones, tarifas, dimensiones máximas, sucursales, zonas plus, generación de guía |
| 4 | **SAT** *(externo)* | Clave de producto para la CFDI/carta porte |
| 5 | **Salesforce** (Casos + Sucursales) | Registro del caso y notificación al departamento RAD (sólo en el flujo WW) |

## 🧩 Las 3 modalidades de RAD

| Modalidad | Cuándo aplica | Qué la distingue del flujo Normal | # pasos únicos en el CSV |
|---|---|---|---|
| **Normal** | Cliente que quiere agendar una recolección desde cero y necesita **cotización + generación de guía** nueva. | Es el flujo más largo — captura origen, destino, paquete, pago, cobertura, servicios adicionales, cotización y confirmación; al final **genera la guía en GLP**. | 42 pasos (\`NO-001\` → \`NO-042\`) |
| **RPP** *(Recolección con guía Pre-Pagada)* | Cliente empresarial que ya compró guías prepago; **sólo necesita agendar cuándo pasar**. | El agente busca la guía prepagada en GLP, valida que las tarifas/dimensiones cargadas coincidan con lo que el cliente reporta, y **actualiza** la guía en lugar de generar una nueva. Si no coinciden, **transfiere a un humano**. | 38 pasos (\`PP-001\` → \`PP-038\`) |
| **WW** *(guía generada en línea)* | Cliente que **ya generó su guía en línea** (portal web, app o integración) y ahora sólo quiere agendar la recolección. Los datos de la guía viven en \`SIPWEB\`. **No cotiza ni genera guía.** | El agente busca la guía en \`SIPWEB\`, valida los datos con el cliente, confirma la dirección de recolección, captura contacto + horario, y **abre un caso en Salesforce que se enruta al departamento RAD por email a la sucursal correspondiente**. | 10 pasos (\`WW-001\` → \`WW-010\`) |

> 💡 **Por qué WW existe como flujo separado:** el cliente ya hizo el trabajo de crear la guía en línea (dimensiones, contenido, destino, pago), así que el agente **no debe volver a preguntar** todo eso. Su trabajo se reduce a *agendar cuándo pasar* y *notificar a la sucursal responsable de la recolección*.

## 🔗 Los 3 pasos "General" — punto de entrada común

Los tres flujos comparten los mismos primeros 3 pasos antes de bifurcarse:

| ID | Paso | Tipo | ¿En alcance para el agente? | Nota |
|---|---|---|---|---|
| \`GE-001\` | Preguntar al cliente qué transporta y validar contra la lista de artículos prohibidos de la **PAM** | Pregunta abierta | ✅ **En alcance** | El agente debe conocer la lista de mercancías no aceptadas y las reglas de mercancía especial (Grupos A–E de la PAM). Ver *Recomendaciones · #2*. |
| \`GE-002\` | Compartir URL de la PAM y de las especificaciones de embalaje; pedir aceptación explícita. **Si no se acepta, no se puede continuar.** | Selección del cliente | ✅ **En alcance** | Es un consentimiento bloqueante — sirve de escudo legal y operativo. |
| \`GE-003\` | El cliente elige la modalidad: **Normal / RPP / WW** | Selección del cliente | ✅ **En alcance** | Único paso donde el LLM debe entender las siglas y ofrecerlas al cliente en lenguaje claro. |
| \`GE-004\` | Al final: *"¿Deseas agendar otra recolección?"* — si \`Sí\`, vuelve a \`GE-001\`. | Selección del cliente | ✅ **En alcance** | Loop de cortesía. |`;

const contentAfter = `## 🗺️ Diagrama de contexto — visión general

\`\`\`mermaid
flowchart TB
  cli([👤 Cliente<br/>Chat · Voz · WhatsApp])
  ag{{🤖 Agente Agentforce}}
  pam[/📄 PAM — Política de<br/>Aceptación de Mercancía/]
  glp[(🗄️ GLP<br/>ERP logístico)]
  sat[/🇲🇽 SAT<br/>Clave de producto/]
  sf[(⚡ Salesforce<br/>Casos + Sucursales)]
  dep([📧 Departamento RAD<br/>por sucursal])
  op([🚚 Operador de<br/>recolección])

  cli <--> ag
  ag -.consulta.-> pam
  ag <-->|BuscarCliente · CrearCliente<br/>ValidarDimensiones · ZonaPlus<br/>SucursalFronteriza · EnviarInformacion<br/>BuscarGuia · ActualizarFacturacion| glp
  ag -.solicita clave.-> sat
  ag -->|sólo flujo WW| sf
  sf -->|email a Sucursal.Email| dep
  glp -->|guía + tracking| ag
  ag -.dispatch operacional.-> op
  op -.recoge paquete.-> cli
\`\`\`

**Cómo leerlo:** el agente **conversa con el cliente**, **consulta la PAM** para validar contenido, **integra con GLP** para todo lo transaccional (a través de 3 apps REST: \`RadRestFul\` :7007, \`SalesForceRestFul\` :7009, \`WsQuotePaquetexpress\` — ver *Integraciones GLP · arquitectura real*), **usa clave SAT \`01010101\`** cuando el cliente no la conoce, y **solamente en el flujo WW** crea un caso en Salesforce que se enruta por email a la sucursal correspondiente. El dispatch al operador de recolección real ya ocurre dentro de GLP — está fuera del scope del agente.

> 💡 **Los bloques Mermaid de esta pestaña se ven aquí como código.** Para verlos como diagrama, copia el bloque y pégalo en [mermaid.live](https://mermaid.live) o en cualquier renderer Mermaid.

---

## 🟩 Flujo Normal · agendar una recolección desde cero

**En una frase:** el agente captura origen, destino, paquete, pago, cobertura y servicios adicionales; pide a GLP cotizar; el cliente confirma opción de fecha y precio; el agente pide a GLP generar la guía y comparte el número de rastreo.

### Sub-procesos del flujo Normal

| Sub-proceso | Rango de pasos | Objetivo |
|---|---|---|
| **Recolección** — Origen | \`NO-001\` → \`NO-009\` | Identificar quién envía y desde dónde |
| **Recolección** — Paquete | \`NO-010\` → \`NO-015\` | Detalles del/los paquete(s) |
| **Entrega** — Destino | \`NO-016\` → \`NO-026\` | Identificar quién recibe y dónde |
| **Pago** | \`NO-027\` → \`NO-031\` | Método de pago y facturación |
| **Paquete** — Valor y cobertura | \`NO-032\` → \`NO-036\` | Valor declarado, cobertura, servicios adicionales |
| **Recolección** — Fecha y cotización | \`NO-037\` → \`NO-040\` | Fecha, opciones de precio, confirmación |
| **Cierre** | \`NO-041\` → \`NO-042\` | Guía generada + tracking compartido |

### Diagrama del flujo Normal

\`\`\`mermaid
flowchart TB
  start([Cliente selecciona Normal]) --> ge1[GE-001<br/>¿Qué transporta?]
  ge1 --> pamcheck{¿Prohibido<br/>por la PAM?}
  pamcheck -- Sí --> stop([❌ No se puede<br/>continuar])
  pamcheck -- No --> ge2[GE-002<br/>Aceptar PAM]
  ge2 --> ge3[GE-003<br/>Elegir modalidad]
  ge3 --> ori[NO-001 a NO-009<br/>Origen del paquete]
  ori --> pkg[NO-010 a NO-015<br/>Detalles del paquete<br/><i>Valida dimensiones vs GLP</i>]
  pkg --> dest[NO-016 a NO-026<br/>Destino del paquete]
  dest --> pay[NO-027 a NO-031<br/>Método de pago + facturación]
  pay --> val[NO-032 a NO-036<br/>Valor declarado + cobertura]
  val --> over50{Valor > 50 000 MXN?}
  over50 -- Sí --> transfer([⚠️ NO-033<br/>Regla de excepción<br/>validada — revisión operativa])
  over50 -- No --> fh[NO-037<br/>Fecha y horario deseado]
  fh --> quote[NO-038 · GLP<br/>Opciones de<br/>precio + fecha]
  quote --> confirm[NO-039<br/>Cliente confirma opción]
  confirm --> guia[NO-041 · GLP<br/>Genera guía + tracking]
  guia --> share[NO-042<br/>Comparte guía y tracking]
  share --> ge4{GE-004<br/>¿Otro envío?}
  ge4 -- Sí --> ge1
  ge4 -- No --> done([✅ Fin])
\`\`\`

### Puntos que hay que resolver *antes* de construirlo

- **Identificación del cliente (\`NO-001\`)** usa una lógica de *fallback en cascada*: **Clave de cliente → RFC → Nombre + Teléfono**. El agente rediseñado v29 hoy identifica **sólo por Email + Nombre completo**. Los identificadores del CSV no están mapeados a Salesforce todavía — hay que decidir si:
  - **A:** Se adopta la triada del CSV solo para RAD *(implica extender el mapeo del contacto)*.
  - **B:** Se mantiene Email + Nombre y se adapta el CSV *(implica cambiar el flujo interno)*.
- **Valor > 50 000 MXN (\`NO-033\`)** es una **regla de excepción validada** — no transferencia automática, sino pausa operativa hasta que se aplique la política. Si finalmente se decide transferir a humano y es fuera de horario, reusar \`Check_Now_is_within_Business_Hours_by_Name\` (ya existe en la org) para no transferir a cola cerrada.
- **Cliente nuevo (\`NO-005\` a \`NO-007\`)** requiere que el agente cree el registro en GLP. Hoy sólo crea/actualiza el Contact en Salesforce. **Sin \`CrearClienteGLP\` implementado, RAD para clientes nuevos no puede completarse por el agente.**

---

## 🟨 Flujo RPP · recolección con guía Pre-Pagada

**En una frase:** el cliente ya compró la guía; el agente busca la guía en GLP por su número RPP, valida que las dimensiones/tarifas cargadas coincidan con lo que el cliente reporta y **actualiza la guía** con la fecha de recolección.

### Puntos que lo hacen distinto del Normal

- **No hay cotización ni generación de guía nueva** — sólo **actualización** de la guía existente (\`PP-037\` — \`EnviarInformacionRecoleccionPrepagoGLP\`).
- **Puede registrar varias guías consecutivas** en una sola conversación (\`PP-001\`, \`PP-002\`).
- Si las tarifas/dimensiones del paquete físico **no coinciden** con las de la guía prepagada, **se transfiere a humano** (\`PP-021\`). No hay renegociación conversacional.
- Cuando la guía prepagada no tiene los datos de origen registrados, el flujo se **convierte en flujo Normal** desde \`PP-006\` hasta completar origen, destino, paquete, pago y confirmar fecha.

### Diagrama del flujo RPP

\`\`\`mermaid
flowchart TB
  start([Cliente selecciona RPP]) --> pp1[PP-001<br/>¿Cuántas guías?]
  pp1 --> pp2{PP-002<br/>¿Consecutivas?}
  pp2 --> pp3[PP-003<br/>Solicitar número RPP]
  pp3 --> pp4[PP-004 · GLP<br/>BuscarGuiaGLP<br/>Devuelve tarifas + dims]
  pp4 --> pp5{PP-005<br/>¿Info correcta<br/>y completa?}
  pp5 -- No / faltante --> pp6[PP-006<br/>Cae en flujo Normal<br/>desde Origen]
  pp6 --> pp7[PP-007 a PP-030<br/>Origen · Destino · Paquete<br/>Facturación]
  pp5 -- Sí --> pp34[PP-034<br/>Fecha y horario deseado]
  pp7 --> pp34
  pp34 --> pp35[PP-035 · GLP<br/>Opciones de recolección]
  pp35 --> pp36[PP-036<br/>Cliente confirma fecha]
  pp36 --> matchcheck{¿Dim físicas<br/>≠ dim registradas?}
  matchcheck -- Sí --> transferpp([👤 PP-021<br/>Transferir a humano])
  matchcheck -- No --> pp37[PP-037 · GLP<br/>Actualizar guía prepagada]
  pp37 --> pp38[PP-038<br/>Compartir info actualizada]
  pp38 --> done([✅ Fin])
\`\`\`

---

## 🟦 Flujo WW · recolección para una guía generada en línea

**En una frase:** el cliente **ya generó la guía en línea** por su cuenta (portal web, app o integración); el agente **no cotiza ni actualiza tarifa**; sólo captura contacto + horario de recolección y abre un caso en Salesforce que se enruta al departamento RAD de la sucursal correspondiente por email.

### Puntos que lo hacen distinto de Normal / RPP

- **Único flujo que crea un registro en Salesforce (objeto Caso)** y **envía un email** — el resto de RAD escribe directamente en GLP.
- Requiere el **objeto Sucursal en Salesforce** con un campo **Email** para saber a quién enrutar.
- La propietaria del caso propuesta en el CSV es **"Jessica"** — probablemente una supervisora del departamento RAD. Debe parametrizarse como Queue u Owner variable, no un usuario hardcoded.
- Si el cliente pide un **cambio de plaza** (dirección en distinta ciudad), se transfiere a humano (\`WW-007\`).

### Diagrama del flujo WW

\`\`\`mermaid
flowchart TB
  start([Cliente selecciona WW]) --> ww1[WW-001<br/>Mensaje: no usar<br/>cajas de huevo]
  ww1 --> ww2[WW-002<br/>Solicitar # de guía<br/>o rastreo]
  ww2 --> ww3[WW-003 · GLP<br/>Obtener datos desde SIPWEB]
  ww3 --> ww4{WW-004<br/>¿Datos correctos?}
  ww4 -- No --> transfer1([👤 WW-005<br/>Transferir a humano])
  ww4 -- Sí --> ww6{WW-006<br/>¿Dirección RAD<br/>correcta?}
  ww6 -- No · cambio de plaza --> transfer2([👤 WW-007<br/>Transferir a humano])
  ww6 -- Sí --> ww8[WW-008<br/>Capturar contacto RAD<br/>Nombre + tel + horario]
  ww8 --> ww9[WW-009 · Salesforce<br/>Flujo autolanzado<br/>Crea Caso · propietaria: Jessica]
  ww9 --> ww10[WW-010 · Salesforce<br/>Email a sucursal + copias]
  ww10 --> done([✅ Fin])
\`\`\`

---

## 📋 Tabla consolidada — todos los pasos con alcance para Agentforce

**Cómo leerla:**
- **En alcance** ✅ = el análisis del cliente lo deja dentro del alcance del agente.
- **Fuera de alcance** 🚫 = el análisis lo marca como fuera del alcance actual del agente (podría abordarse en una ola siguiente).
- **Interacción** = tipo de intercambio (P = pregunta abierta · S = selección · M = mensaje informativo · G = llamada a GLP · T = transferencia a humano · SF = proceso en Salesforce).

### Pasos generales (aplican a los 3 flujos)

| ID | Sub-proceso | Paso | Interacción | Alcance |
|---|---|---|---|---|
| \`GE-001\` | PAM | Preguntar qué transporta el cliente | P | ✅ |
| \`GE-002\` | PAM | Compartir URL de PAM y pedir aceptación | S | ✅ |
| \`GE-003\` | Modalidad | Elegir Normal / RPP / WW | S | ✅ |
| \`GE-004\` | Cierre | ¿Otra recolección? | S | ✅ |

### Flujo Normal (\`NO-*\`)

| ID | Sub-proceso | Paso | Interacción | Alcance |
|---|---|---|---|---|
| \`NO-001\` | Origen | Identificar cliente origen (Clave → RFC → Nombre + Tel) | P | ✅ |
| \`NO-002\` | Origen | Buscar cliente en GLP | G · \`BuscarClienteGLP\` | ✅ |
| \`NO-003\` | Origen | Confirmar dirección de recolección — GLP retorna **máximo 5 direcciones**; si no elige ninguna y no dicta una nueva, **transferir a humano** | S | ✅ |
| \`NO-004\` | Origen | Solicitar nueva dirección completa | P | ✅ |
| \`NO-005\` | Origen | Cliente no existe en GLP: pedir nombre + RFC + tel | P | 🚫 |
| \`NO-006\` | Origen | Cliente nuevo: pedir información de facturación | P | 🚫 |
| \`NO-007\` | Origen | Crear cliente nuevo en GLP | G · \`CrearClienteGLP\` | 🚫 |
| \`NO-008\` | Origen | Solicitar contacto extra para el servicio | P | 🚫 |
| \`NO-009\` | Origen | Requisitos sucursal frontera origen | G · \`ConsultarSucursalFronterizaGLP\` | 🚫 |
| \`NO-010\` | Paquete | ¿Cuántos paquetes? | P | ✅ |
| \`NO-011\` | Paquete | Tipo embalaje + contenido + peso + dimensiones (uno a uno) | P | ✅ |
| \`NO-012\` | Paquete | Mensaje: no usar cajas de huevo | M | 🚫 |
| \`NO-013\` | Paquete | Clave del producto ante el SAT — si no la conoce, usar clave genérica **\`01010101\`** (valor fijo confirmado por PDF v4) | P | 🚫 |
| \`NO-014\` | Paquete | ¿Agregar más artículos? | P | ✅ |
| \`NO-015\` | Paquete | Validar dimensiones máximas contra GLP | G · \`ValidarDimensionesGLP\` | 🚫 |
| \`NO-016\` | Destino | Identificar cliente destino (Clave → RFC → Nombre + Tel) | P | ✅ |
| \`NO-017\` | Destino | Buscar cliente destino en GLP | G · \`BuscarClienteGLP\` | ✅ |
| \`NO-018\` | Destino | Condiciones de embarque (ocurre / domicilio) | S | ✅ |
| \`NO-019\` | Destino | Ocurre: sucursales disponibles por CP y dimensiones | G · \`SucursalesOcurreGLP\` | 🚫 |
| \`NO-020\` | Destino | Confirmar dirección destino — GLP retorna **máximo 5 direcciones**; si no elige y no dicta nueva, **transferir a humano** | S | ✅ |
| \`NO-021\` | Destino | Nueva dirección destino completa | P | ✅ |
| \`NO-022\` | Destino | Cliente destino no existe: nombre + RFC + tel | P | 🚫 |
| \`NO-023\` | Destino | Cliente destino nuevo: facturación | P | 🚫 |
| \`NO-024\` | Destino | Crear cliente destino en GLP | G · \`CrearClienteGLP\` | 🚫 |
| \`NO-025\` | Destino | Contacto extra destino | P | 🚫 |
| \`NO-026\` | Destino | Requisitos sucursal frontera destino | G · \`ConsultarSucursalFronterizaGLP\` | 🚫 |
| \`NO-027\` | Pago | Método de pago (1 · Origen · 2 · Flete por cobrar · 3 · Solicitante o tercero) | S | 🚫 |
| \`NO-028\` | Pago | Info subtipo pago (efectivo / transferencia) | M | 🚫 |
| \`NO-029\` | Pago | Elegir subtipo pago si aplica | S | 🚫 |
| \`NO-030\` | Pago | Alta de datos fiscales — los datos previos **no se modifican**, se **da de alta un registro nuevo**. La ciudad debe permanecer igual a la original | P | ✅ |
| \`NO-031\` | Pago | Alta del registro fiscal en GLP | G · \`SalesForceRestFul/clientAddress\` | 🚫 |
| \`NO-032\` | Paquete | Valor declarado | P | ✅ |
| \`NO-033\` | Paquete | Si > 50 000 MXN → **regla de excepción validada** (no transferencia automática; requiere revisión operativa antes de continuar) | T | 🚫 |
| \`NO-034\` | Paquete | Tipo de cobertura si aplica | P | ✅ |
| \`NO-035\` | Paquete | Identificar Zona Plus por CP | G · \`ConsultarZonaPlusGLP\` | 🚫 |
| \`NO-036\` | Paquete | Servicios adicionales: COD y/o Acuse | S | ✅ |
| \`NO-037\` | Recolección | Fecha y horario deseado en horario de servicio | P | ✅ |
| \`NO-038\` | Recolección | Opciones de servicio con precio + fecha desde GLP | G · \`EnviarInformacionRecoleccionGLP\` | ✅ |
| \`NO-039\` | Recolección | Confirmar opción de precio y fecha | S | ✅ |
| \`NO-040\` | Recolección | ¿Otra recolección? | S | ✅ |
| \`NO-041\` | Cierre | Enviar info a GLP y generar guía | G · \`EnviarInformacionRecoleccionGLP\` | ✅ |
| \`NO-042\` | Cierre | Compartir guía y # de rastreo con el cliente | M | ✅ |

### Flujo RPP (\`PP-*\`)

| ID | Sub-proceso | Paso | Interacción | Alcance |
|---|---|---|---|---|
| \`PP-001\` | RPP | ¿Cuántas guías se van a registrar? | P | 🚫 |
| \`PP-002\` | RPP | ¿Son consecutivas? | S | 🚫 |
| \`PP-003\` | RPP | Solicitar número RPP (guía prepagada) | P | ✅ |
| \`PP-004\` | RPP | Validar tarifas + dimensiones + kilometraje contra GLP | G · \`BuscarGuiaGLP\` | ✅ |
| \`PP-005\` | RPP | Confirmar información con el cliente | S | ✅ |
| \`PP-006\` | RPP | Si no hay origen registrado: cae en flujo Normal desde \`NO-001\` | P | ✅ |
| \`PP-007\` — \`PP-020\` | Origen · Paquete | Equivalentes a \`NO-002\` — \`NO-015\` | (varias) | ver Normal |
| \`PP-021\` | RPP | Si dimensiones físicas ≠ dimensiones prepagadas → transferir a humano | T | ✅ |
| \`PP-022\` — \`PP-030\` | Destino | Equivalentes a \`NO-016\` — \`NO-024\` | (varias) | ver Normal |
| \`PP-031\` | Pago | Modificar facturación si cliente pre-existente | P | ✅ |
| \`PP-032\` | Pago | Actualizar facturación en GLP | G · \`ActualizarInformacionFacturacionGLP\` | ✅ |
| \`PP-033\` | Paquete | Identificar Zona Plus | G · \`ConsultarZonaPlusGLP\` | ✅ |
| \`PP-034\` | Recolección | Fecha y horario deseado | P | ✅ |
| \`PP-035\` | Recolección | Opciones de recolección desde GLP | G · \`EnviarInformacionRecoleccionGLP\` | ✅ |
| \`PP-036\` | Recolección | Cliente confirma fecha | S | ✅ |
| \`PP-037\` | Cierre | Enviar info y **actualizar** guía en GLP | G · \`EnviarInformacionRecoleccionPrepagoGLP\` | ✅ |
| \`PP-038\` | Cierre | Compartir información actualizada de la guía | M | ✅ |

### Flujo WW (\`WW-*\`)

| ID | Sub-proceso | Paso | Interacción | Alcance |
|---|---|---|---|---|
| \`WW-001\` | Aviso | Mensaje: no usar cajas de huevo | M | 🚫 |
| \`WW-002\` | Origen | Solicitar número de guía o rastreo | P | ✅ |
| \`WW-003\` | Origen | Obtener datos desde SIPWEB | G · \`BuscarGuiaGLP\` | ✅ |
| \`WW-004\` | Confirmar | Confirmar datos obtenidos con el cliente | S | ✅ |
| \`WW-005\` | Confirmar | Si datos no correctos: transferir a humano | T | ✅ |
| \`WW-006\` | Recolección | Confirmar dirección RAD registrada | S | ✅ |
| \`WW-007\` | Recolección | Cambio de plaza: transferir a humano | T | ✅ |
| \`WW-008\` | Recolección | Capturar contacto RAD (nombre + tel + horario) | P | ✅ |
| \`WW-009\` | Salesforce | Crear caso en Salesforce (propietaria: Jessica) | SF | ✅ |
| \`WW-010\` | Salesforce | Enviar email a departamento RAD de la sucursal | SF | ✅ |

---

## 🔌 Integraciones GLP — arquitectura real de endpoints

El **PDF v4 de Freeway (sept 2026)** precisa que GLP no expone 10 acciones planas sino **una capa de integración con 3 apps y múltiples endpoints REST**. Todos deben implementarse como **Apex Actions + Named Credentials**.

### App 1 · \`RadRestFul\` (Port 7007) — flujo de recolección

| Endpoint | Entrada | Salida | Se usa en |
|---|---|---|---|
| \`SearchClient\` | Clave / RFC / (Nombre + Tel) | Cliente + hasta 5 direcciones | \`NO-002\`, \`NO-017\` |
| \`datesToCollection\` | CP + payload | Opciones de fecha | \`NO-038\`, \`PP-035\` |
| \`brncOCU\` | CP + dimensiones | Sucursales OCURRE disponibles | \`NO-019\` |
| \`radCreate\` | Payload completo + **\`docType\`** (\`G\` = Normal, \`P\` = RPP) | Guía + tracking | \`NO-041\`, \`PP-037\` |

### App 2 · \`SalesForceRestFul\` (Port 7009) — datos maestros y complementarios

| Endpoint | Entrada | Salida | Se usa en |
|---|---|---|---|
| \`sipwebClient\` | Datos completos del cliente | ID cliente creado | \`NO-007\`, \`NO-024\` |
| \`zonaInfo\` | CP | Zona Plus **y** Frontera **en una sola llamada** | \`NO-009\`, \`NO-026\`, \`NO-035\` |
| \`/guia\` | # de guía / rastreo | Datos de la guía + **\`distanceKm\`** | \`PP-004\`, \`WW-003\` |
| \`clientAddress\` | Alta de dirección fiscal | OK / error | \`NO-031\` (alta, no update) |

### App 3 · \`WsQuotePaquetexpress\`

| Endpoint | Entrada | Salida | Se usa en |
|---|---|---|---|
| \`getQuotation\` | Payload de cotización | Opciones de precio | Fase de cotización previa a \`NO-038\` |

### Servicios adicionales referenciados

| Servicio | Endpoint | Uso |
|---|---|---|
| \`PTXWS\` | \`postalCode\` | Búsqueda de colonias por CP |
| \`wsReportPaquetexpress\` | \`generateReport\` | Genera la Carta Porte final |

> ⚠️ **\`ValidarDimensionesGLP\` (nomenclatura del CSV original):** el PDF aclara que **las dimensiones aceptadas cambian por sucursal**, así que la validación no es un endpoint aislado — opera junto con el resultado de sucursal (\`brncOCU\`). Puede vivir dentro de \`radCreate\` o como validación local antes de invocarlo.

> ⚠️ **Cotizar vs. generar guía:** \`radCreate\` se dispara con \`docType\` distinto según el flujo (Normal = \`G\`, RPP = \`P\`). La cotización previa vive en \`WsQuotePaquetexpress/getQuotation\` — es una app distinta, evitando el patrón anterior de reusar un mismo endpoint para dos momentos funcionales.

---

## 🎯 Alcance para el Agente de Agentforce

### ✅ Qué cubre / cubriría fácilmente el agente

Los pasos marcados como **"En alcance"** en el CSV son **43 de 73**. Se agrupan en 4 grandes categorías:

1. **Captura conversacional pura** — hacer las preguntas al cliente en el orden correcto, en el idioma correcto, con validaciones básicas (Sí/No, número, CP, etc.). El agente ya sabe hacer esto muy bien.
2. **Selección entre opciones dinámicas** — cuando GLP devuelve N direcciones, N sucursales o N opciones de fecha/precio, el agente presenta la lista y el cliente elige.
3. **Búsqueda de información existente** — clientes ya registrados, guías ya emitidas, direcciones ya almacenadas. Requiere \`BuscarClienteGLP\` y \`BuscarGuiaGLP\`.
4. **Cierre transaccional** — enviar el payload final y compartir la guía + rastreo (\`NO-041\`, \`NO-042\`, \`PP-037\`, \`PP-038\`).

### 🚫 Qué queda fuera del alcance actual (30 pasos)

El análisis marca como fuera de alcance principalmente:

- **La creación de clientes nuevos en GLP** (\`NO-005\` → \`NO-007\`, \`NO-022\` → \`NO-024\`, PP equivalentes). Sin esto, RAD sólo funciona para clientes que ya existen en GLP.
- **La lógica de sucursal fronteriza** (\`NO-009\`, \`NO-026\`) — implica saber qué requisitos aduanales aplican y explicárselos al cliente.
- **La lógica de OCURRE con selección de sucursal por CP + dimensiones** (\`NO-019\`) — implica lookups compuestos en GLP.
- **La lógica completa de método de pago** (\`NO-027\` → \`NO-031\`) — 5 pasos con reglas de negocio (efectivo / transferencia / origen / flete por cobrar / tercero).
- **La validación de valor > 50 000 MXN + regla de excepción validada** (\`NO-033\`) — el PDF v4 aclara que **no es transferencia automática**, sino pausa operativa hasta que la política se aplique.
- **Zona Plus** (\`NO-035\`, \`PP-033\`).
- **Clave del producto ante el SAT** (\`NO-013\`) — implica lista larga y validación.
- **Contactos extra** (\`NO-008\`, \`NO-025\`).
- **Mensajes operativos** — no usar cajas de huevo, indicaciones de subtipo de pago (\`NO-012\`, \`NO-028\`, \`WW-001\`).
- **La lógica RPP de múltiples guías consecutivas** (\`PP-001\`, \`PP-002\`).

### 🔍 Alcance vs. estado real del agente rediseñado v29

El agente rediseñado (Regina Segura, agosto 2026) **hoy no ejecuta ningún paso transaccional de RAD**. Lo único que hace hoy relacionado con RAD:

- **En \`General Information Management\`** tiene una respuesta predefinida sobre *"Requisitos para solicitar recolección a domicilio (RAD)"* — **informativa, no accionable**.
- **En \`Quote Management\` (rama nacional)** captura una bandera \`quoteRAD\` (\`Sí/No\`) — pero esa bandera **sólo alimenta la cotización**, no agenda el servicio.

Ninguno de los endpoints GLP listados arriba está implementado.

---

## 🕳️ Brechas identificadas — lo que hay que resolver

| # | Brecha | Impacto si no se resuelve | Dependencia |
|---|---|---|---|
| G1 | **Sin integración a GLP.** Cero de los endpoints REST de las 3 apps (\`RadRestFul\`, \`SalesForceRestFul\`, \`WsQuotePaquetexpress\`) están conectados. | RAD end-to-end no es viable. | Acceso a GLP + Named Credentials para cada app + tipo de auth (pendiente). |
| G2 | **Identificación del cliente asimétrica.** CSV usa Clave / RFC / Tel; agente v29 usa Email. | El agente RAD tendría un modelo de identificación distinto al del resto del agente. | Decisión de negocio: adoptar la triada del CSV o mantener Email + lookup a GLP. |
| G3 | ~~La sigla WW no está confirmada~~ **RESUELTA.** WW = guías generadas en línea por el cliente. La brecha residual es la conexión con \`SIPWEB\` (ver G1 y S3). | — | — |
| G4 | **La lista de artículos prohibidos y reglas de embalaje no está estructurada dentro del agente.** Sólo está la URL de la PAM. | El agente no puede validar \`GE-001\` de forma programática — depende del LLM interpretando lenguaje natural del cliente. | Extraer PAM como Knowledge Article y/o Named Data Set. |
| G5 | **El agente v29 no puentea Quote con RAD.** \`quoteRAD == true\` no dispara nada. | El cliente puede pedir cotizar RAD y luego querer agendarla, y el agente no sabe puentear. | Definir el "handoff intra-agente" entre Quote y RAD. |
| G6 | **El objeto Sucursal en Salesforce (flujo WW) no tiene el campo Email todavía.** | \`WW-008\` → \`WW-010\` no pueden completarse. | Metadata: campo Email en Sucursal + poblar registros. Plantilla de email en Salesforce. |
| G7 | **La lista de correos adjuntos al email de sucursal no está definida** — el CSV la deja como *"pendiente correos adjuntos"*. | El email se enviaría incompleto. | Definir con el cliente los destinatarios BCC/CC. |
| G8 | **No hay conexión implementada a SAT para claves de producto.** | \`NO-013\` fuerza clave genérica siempre. | Decidir si se acepta clave genérica como default operativo o si se busca API SAT. Valor fijo: \`01010101\`. |
| G9 | **WW referencia una "instrucción 60" que no existe** en el topic \`RAD_16j0096742ecba5\` del DEV (confirmado por retrieve directo del \`GenAiPluginDefinition\` + PDF v4 §4.3 y p.67). El cierre del flujo WW queda **funcionalmente vacío**. | El agente no puede completar un caso WW end-to-end en la demo. | Para la demo: mockear el cierre con un mensaje tipo *"su solicitud quedó registrada, la sucursal X le contactará"*. En producción: pedir a Freeway completar la instrucción faltante. |

---

## 💡 Recomendaciones para que RAD funcione bien en Agentforce

### 1 · Empezar por RPP (guía Pre-Pagada) — es el flujo más corto y de más alto valor

- RPP es el flujo con **menos ramas** (38 pasos, gran parte reusables del Normal).
- **Todos los pasos "En alcance"** en RPP viven en el core del flujo.
- Los clientes empresariales que compran guías prepago tienen **mayor volumen de RAD** — un agente que resuelve RPP self-service tiene un ROI conversacional inmediato.
- Requiere sólo **3 endpoints GLP nuevos**: \`SalesForceRestFul/guia\`, \`RadRestFul/SearchClient\`, \`RadRestFul/radCreate\` (con \`docType = P\`).

### 2 · Modelar la PAM como Knowledge estructurado, no sólo un link

- Hoy el agente comparte la URL. Al validar \`GE-001\` el LLM decide si el contenido es prohibido — puede fallar en la interpretación de mercancías especiales (Grupos A–E de la PAM).
- Extraer la PAM a un **Knowledge Article estructurado** (categorías prohibidas + grupos de mercancía especial con reglas), o a un objeto de referencia consultable por el agente.
- El agente puede seguir compartiendo la URL como consentimiento en \`GE-002\`, pero **la validación programática de \`GE-001\` debe basarse en datos**.

### 3 · Un Named Credential por app GLP — no uno por acción

- El CSV original pedía "Crear Named credential, External Credential y Clase Test" **por cada acción**. Es duplicación innecesaria.
- El PDF v4 revela que GLP se expone como **3 apps distintas** (\`RadRestFul\` :7007, \`SalesForceRestFul\` :7009, \`WsQuotePaquetexpress\`) — cada una con su base URL y probablemente su propia auth.
- **Recomendación:** un Named Credential **por app** (3 en total), reusado por todas las Apex classes que consumen esa app. Menos duplicación, menos superficie de configuración.

### 4 · Tratar el umbral 50 000 MXN como excepción validada, no como transferencia

- El PDF v4 aclara que \`NO-033\` **no es un ruteo forzoso a humano** — es una **regla de excepción validada** que requiere revisión operativa antes de continuar.
- **Recomendación:** en el agente, cuando el valor declarado supera 50 000 MXN, pausar el flujo, informar al cliente que la política requiere revisión, ofrecer *"crear un caso para que un ejecutivo te contacte"* y ejecutar \`Check_Now_is_within_Business_Hours_by_Name\` sólo si finalmente se opta por transferencia inmediata.

### 5 · Puentear Quote Management con el flujo RAD

- Hoy \`quoteRAD == true\` sólo se guarda como bandera. Al terminar la cotización, el agente podría ofrecer: *"Ya que necesitas recolección a domicilio, ¿te agendo la recolección ahora?"* → salta a flujo Normal desde \`GE-003\` con la modalidad Normal ya seleccionada.
- Reusa origen, destino, dimensiones y valor ya capturados en la cotización → **el flujo RAD real se reduce en ~15 pasos**.

### 6 · Cotización y generación de guía viven en apps distintas

- El PDF v4 aclara la separación real: **cotizar** vive en \`WsQuotePaquetexpress/getQuotation\`; **generar guía** vive en \`RadRestFul/radCreate\` con \`docType\` = \`G\` (Normal) o \`P\` (RPP).
- Ya no es un mismo endpoint invocado dos veces — son apps diferentes. **La confusión inicial del CSV (usar \`EnviarInformacionRecoleccionGLP\` para ambos momentos) queda resuelta por la arquitectura real.**

### 7 · Registrar el caso RAD en Salesforce siempre, no sólo en el flujo WW

- El agente rediseñado v29 crea un caso automáticamente al cerrar cada intención. Aplicar el mismo patrón a RAD **en los tres flujos** — no sólo en WW — da:
  - Trazabilidad operativa desde Salesforce (ola, canal, tiempo, contacto).
  - Base para reporting de RAD self-service vs. atendido.
  - Un hilo único con el operador si algo falla.

### 8 · Definir el modelo de "cliente identificado" para RAD

- Alinear el modelo de identificación entre el agente v29 (Email + Nombre) y lo que pide el CSV (Clave / RFC / Tel). Sugerencia: **el agente empieza por Email** (compatible con la verificación existente) y **al entrar al flujo RAD** hace un lookup por Email → Clave GLP mediante un mapeo Salesforce ↔ GLP.

### 9 · Propietaria del caso WW no debe ser un usuario específico

- El CSV asigna la propiedad del Caso WW a *"Jessica"*. Parametrizar como **Queue "Departamento RAD"** o como Owner variable derivado de la sucursal — evita que la lógica se rompa si Jessica cambia de rol.

---

## 🧪 Suposiciones a validar con el cliente

Lista completa de cosas que el análisis actual **infiere** o **no confirma**, y que hay que preguntar antes de escribir instrucciones al agente:

| # | Suposición | Fuente | Pregunta al cliente |
|---|---|---|---|
| ~~S1~~ | ~~WW significa Worldwide~~ **RESUELTA:** WW = guías generadas en línea por el cliente (portal / app / integración). | ✅ Confirmado por el cliente | — |
| ~~S2~~ | ~~GLP es el nombre del ERP logístico~~ **PARCIALMENTE RESUELTA:** PDF v4 confirma la arquitectura de **3 apps con puertos 7007/7009 y endpoints REST** (\`RadRestFul\`, \`SalesForceRestFul\`, \`WsQuotePaquetexpress\`). Falta confirmar auth (tipo de Named Credential por app). | ✅ PDF v4 (Freeway sept 2026) | ¿Qué tipo de auth usan cada una de las 3 apps? |
| ~~S3~~ | ~~SIPWEB es la fuente de datos para guías generadas en línea~~ **RESUELTA:** SIPWEB **nunca se llama directo desde Salesforce** — pasa siempre por el endpoint \`SalesForceRestFul/sipwebClient\` (port 7009). Usa el mismo Named Credential que \`SalesForceRestFul\`. | ✅ PDF v4 (Freeway sept 2026) | — |
| S4 | **La modalidad del RAD la elige el cliente conscientemente** (\`GE-003\`) — el cliente sabe si tiene prepago o no. | CSV | ¿Es realista pedirle al cliente que elija Normal / RPP / WW, o debería el agente determinarlo automáticamente por señales (tiene guía activa, es cliente B2B, etc.)? |
| S5 | **La propietaria del caso WW se llama "Jessica"**. | CSV \`WW-007\` | ¿Es una persona específica o un role/queue? ¿Se puede parametrizar? |
| S6 | **El objeto Sucursal en Salesforce ya existe** — sólo falta el campo Email. | CSV \`WW-008\` | ¿Podemos ver el schema actual del objeto Sucursal? ¿Cuántos registros hay? |
| S7 | **La lista de correos adjuntos al email de sucursal** es un valor conocido por operaciones. | CSV \`WW-008\` deja *"pendiente correos adjuntos"* | ¿Quién define esta lista? ¿Es fija o depende del tipo de servicio? |
| S8 | **La identificación en cascada (Clave → RFC → Nombre + Tel)** es la forma canónica en Paquetexpress. | CSV \`NO-001\` | ¿Qué % de clientes tiene "Clave"? Si es bajo, empezar por Email tiene más sentido. |
| S9 | **El umbral de 50 000 MXN** es un valor fijo, no varía por tipo de cliente / servicio. | CSV \`NO-033\` + PDF v4 (regla de excepción validada) | ¿Es fijo o depende de servicio, cliente o cobertura? ¿Qué revisión operativa aplica cuando se supera? |
| ~~S10~~ | ~~La clave del producto ante el SAT admite un fallback genérico~~ **RESUELTA:** El valor de la clave genérica es **\`01010101\`** (fijo). | ✅ PDF v4 (Freeway sept 2026) | — |
| S11 | **La cotización (\`NO-038\`) siempre devuelve varias opciones de fecha + precio.** | CSV | ¿Cuál es el shape típico de la respuesta? ¿Cuándo devuelve una sola opción? |
| S12 | **El horario de servicio para agendar recolección** es el mismo *"Horario Paquete"* que ya existe en Salesforce Business Hours. | CSV \`NO-037\` + hallazgo C-1 previo del agente legacy | ¿Confirmar? Si es distinto, hay que crear otro Business Hours. |

---

## 📚 Fuente de verdad

- **Fuente primaria:** \`Files/Copy JGR of Análisis RAD.xlsx\` — hoja *RAD-Diseño* (~73 filas de diseño, procesadas de forma consolidada; el archivo repite 3 secciones separadas por modalidad, aquí quedaron unificadas).
- **Fuente técnica adicional:** \`Files/Documentacion_RAD_Agentforce_Paquetexpress_Freeway_v4.pdf\` — documento técnico de Freeway (sept 2026, 76 pp.) que precisa la arquitectura real de integración con GLP (3 apps + endpoints REST), el valor fijo de la clave SAT genérica (\`01010101\`), el matiz operativo del umbral 50 000 MXN (regla de excepción validada, no transferencia automática), y confirma que Salesforce nunca se conecta directamente a SIPWEB.
- **Fuentes secundarias oficiales de Paquetexpress:**
  - [Sitio web · Servicios](https://www.paquetexpress.com.mx/servicios/) — confirmación de RAD, EAD, RPP.
  - [Sitio web · Política de Aceptación de Mercancía (PAM)](https://www.paquetexpress.com.mx/politica-de-aceptacion-de-mercancia) — mercancías prohibidas y grupos de mercancía especial.
- **Fuente del agente actual:** ficha del agente rediseñado \`Paquetexpress_Service_Agent_Split v29\` en la pestaña *🌟 Agente rediseñado*.

> 📝 **Metodología:** todo lo marcado ✅ viene literalmente del CSV, del sitio oficial o del PDF v4 de Freeway. Todo lo marcado ⚠️ es **inferencia** que aún requiere validación — está listado explícitamente en la sección *Suposiciones a validar con el cliente*. Las suposiciones tachadas (S1, S2 parcial, S3, S10) quedaron resueltas por el cliente o por el PDF v4; las restantes siguen abiertas.`;

export const paquetexpressRadTab = {
  id: "rad-analysis",
  label: "🚚 RAD · Recolección a Domicilio",
  title: "Análisis funcional del proceso de Recolección a Domicilio (RAD) para Agentforce",
  content,
  contentAfter,
};
