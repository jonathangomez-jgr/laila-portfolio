export type PresenterSlide = {
  index: number;
  title: string;
  timing: string;
  role: "Inspiration" | "Information";
  goal: string;
  script: string;
  tips?: string[];
};

const retailAiTed: PresenterSlide[] = [
  {
    index: 1,
    title: "Portada · El cliente ya cambió",
    timing: "0:00 – 0:15",
    role: "Inspiration",
    goal: "Establecer autoridad y tono en 15 segundos. Que la sala deje de mirar el teléfono.",
    script:
      "[Antes de hablar, mirar la sala 3 segundos completos]\n\n\"El retail no está esperando… a nadie.\"\n\n[Silencio de 2 segundos]\n\n\"En los próximos 20 minutos voy a intentar convencerlos de que esa frase no es una advertencia. Es una invitación.\"",
    tips: [
      "No leer el subtítulo. Se lee solo.",
      "El QR queda visible en pantalla — invita a la audiencia a escanear con: 'y para quienes quieran seguir la presentación desde su teléfono, ahí queda el QR.'",
      "No arrancar con 'buenas tardes, gracias por venir'. Eso lo hizo quien te presentó.",
    ],
  },
  {
    index: 2,
    title: "Video · Cómo se ve el retail bien construido",
    timing: "0:15 – 3:00",
    role: "Inspiration",
    goal: "Dejar que Salesforce cuente en imágenes lo que después conversaremos en palabras. Empatía visual antes de argumento.",
    script:
      "[Introducir el video en una línea, casual]\n\n\"Antes de que empecemos a hablar, permítanme mostrarles algo. Es un video corto — dos minutos y medio. Miren, no la marca. Miren la <em>experiencia</em>.\"\n\n[Reproducir el video. No hablar mientras corre. Al terminar]\n\n\"Eso es lo que ya está pasando. Ahora hablemos de cómo.\"",
    tips: [
      "No comentar durante el video.",
      "Si el auditorio no tiene buen sonido, subir volumen o usar subtítulos en YouTube.",
      "Al terminar, dejar 1 segundo de silencio antes de avanzar.",
    ],
  },
  {
    index: 3,
    title: "Escena WhatsApp · Sara",
    timing: "3:00 – 3:45",
    role: "Inspiration",
    goal: "Anclar toda la sesión en una escena concreta. La audiencia debe visualizar a Sara — o a su equivalente — antes de escuchar un solo número.",
    script:
      "\"Un martes cualquiera. Nueve y cuarenta y siete de la noche.\"\n\n[Esperar la primera burbuja]\n\n\"Sara acaba de acostar a su hijo. Se acuerda que se le acabó el café que usa todas las mañanas.\"\n\n[Esperar burbuja out]\n\n\"No abre la app del retailer. No entra al sitio. Abre WhatsApp.\"\n\n[Esperar la respuesta con stock]\n\n\"Y del otro lado — no la atiende un humano. Pero la conversación se siente humana.\"\n\n[Esperar 'Mándalo a casa']\n\n<b>Cierre:</b> \"Esta conversación duró 40 segundos. Del otro lado no había nadie escribiendo. Y esta cliente acaba de comprarle a un retailer que hace 18 meses no existía como opción para ella.\"",
    tips: [
      "Ritmo lento. Pausa después de cada burbuja.",
      "Camina un paso hacia la audiencia al decir 'no había nadie escribiendo'.",
    ],
  },
  {
    index: 4,
    title: "Encuesta · 6 sí, 4 no",
    timing: "3:45 – 4:30",
    role: "Inspiration",
    goal: "Convertir a la audiencia en participante. Que dejen de escuchar y empiecen a estar involucrados.",
    script:
      "[Cambio de tono: más directo, casual, caminar hacia la audiencia]\n\n\"Levanten la mano — quien crea que su empresa puede entregar esa experiencia hoy. Tal cual. Un martes a las 10 de la noche.\"\n\n[Esperar. Contar rápido con la vista]\n\n\"Si en esta sala — con los CEOs, CMOs y CFOs del retail mexicano — seis de cada diez no pueden levantar la mano… la pregunta ya no es <em>si</em> vamos a construir ese cliente. Es <em>quién</em> lo va a construir primero.\"",
    tips: [
      "Muchas manos: 'Bueno, esta sala está adelantada.'",
      "Pocas manos: 'Perfecto. Entonces la conversación que sigue es para ustedes.'",
      "Cero manos: '…y eso, en sí mismo, ya es un dato.'",
    ],
  },
  {
    index: 5,
    title: "La ola llegó · Contexto global",
    timing: "4:30 – 6:00",
    role: "Information",
    goal: "Fijar el marco global con fuentes primarias. La audiencia deja de dudar si 'esto está pasando'.",
    script:
      "\"Tres de cada cuatro retailers globales — no cualquiera, los que compiten al top — dicen que los agentes de IA <em>no</em> son un experimento más. Son esenciales para 2026.\"\n\n<b>Punchline:</b> \"Y ya se refleja en el marcador. El liderazgo del top-3 retail de Estados Unidos se está redistribuyendo — con base en <em>stack de datos y de IA</em>, no en superficie de tienda.\"\n\n[Dejar la timeline en pantalla 20 segundos]\n\n<b>Cierre / puente:</b> \"Y esta reasignación no es solo un fenómeno gringo. Ahora vamos a ver por qué México ya está adentro.\"",
    tips: [
      "No nombrar a Walmart explícito en voz alta — la timeline lo dice implícitamente.",
      "Fuentes verificables: Salesforce Connected Shoppers · Gartner CIO Agenda · Amazon Shareholder Letter · J.P. Morgan.",
    ],
  },
  {
    index: 6,
    title: "México ya está adentro",
    timing: "6:00 – 7:30",
    role: "Information",
    goal: "Aterrizar. La audiencia siente que dejamos de hablar del mundo y empezamos a hablar de su casa.",
    script:
      "\"Aquí viene la parte que a mí me sorprendió cuando la vi por primera vez. México no es un mercado retail rezagado. México es el <em>segundo</em> mercado retail más grande de Latinoamérica.\"\n\n\"Y el ochenta y ocho punto dos por ciento de los internautas mexicanos <em>ya</em> compra en línea.\"\n\n[Pausa]\n\n\"Cincuenta y cinco mil tiendas bajo ANTAD. Nueve de cada diez municipios del país. Seis punto cuatro por ciento del PIB. Cuarenta y dos mil setecientos millones en Hot Sale del año pasado.\"\n\n<b>Cierre:</b> \"La pregunta ya no es si el cliente mexicano está listo para la IA. Es si la industria mexicana está lista para el cliente que ya la está usando.\"",
    tips: [
      "88.2% es sobre internautas, no sobre la población total.",
      "No comparar con Colombia, Brasil o Chile — la sala está en México.",
    ],
  },
  {
    index: 7,
    title: "El cliente cambió sin permiso",
    timing: "7:30 – 9:00",
    role: "Information",
    goal: "Mover a la audiencia del 'esto es tecnología' al 'esto es mi cliente'.",
    script:
      "\"El cliente cambió sin pedirnos permiso.\"\n\n[Pausa]\n\n\"El cincuenta y tres por ciento — más de la mitad — ya descubre productos hablando. Con IA. En canales sociales. En mensajería. Hace tres años eran el cuarenta y seis. En dos años más, esto va a ser mayoría absoluta.\"\n\n\"Esto no es lo que las marcas están haciendo. Esto es lo que el cliente <em>ya está haciendo</em>.\"\n\n<b>La pregunta:</b> \"¿Nuestro cliente nos encuentra donde nos busca, o nos busca donde lo obligamos a buscarnos?\"",
    tips: [
      "Cita Forrester: 'La búsqueda se está volviendo respuesta. El sitio se está volviendo conversación.' Léela pausado.",
    ],
  },
  {
    index: 8,
    title: "Tres frentes · Servicio · Comercio · Operación",
    timing: "9:00 – 10:30",
    role: "Information",
    goal: "Dar a la audiencia el mapa mental que va a usar para procesar todo lo que sigue.",
    script:
      "\"La IA no es <em>una</em> cosa que hace el retail. Son tres cosas — que se sienten distintas del lado del cliente pero que comparten el mismo cerebro por atrás.\"\n\n<b>Servicio:</b> \"Conversar antes, durante y después de la compra. Un agente 24/7 que recuerda todo, resuelve devoluciones y escala al humano cuando importa.\"\n\n<b>Comercio:</b> \"Descubrir, elegir y pagar sin fricción. Un asistente que entiende lo que el cliente quiere en <em>sus</em> palabras. No en filtros.\"\n\n<b>Operación:</b> \"Anticipar, planear y ejecutar mejor que ayer. El cerebro que trabaja mientras la tienda duerme.\"\n\n<b>Cierre:</b> \"Tres frentes. Un cerebro. Cualquier proyecto que ataque uno de estos sin resolver los otros dos… se rompe al segundo trimestre.\"",
  },
  {
    index: 9,
    title: "Evidencia pública · 5 casos",
    timing: "10:30 – 13:00",
    role: "Information",
    goal: "Quitarle a la audiencia la objeción 'sí, pero eso no ha funcionado a escala'. Cinco casos, cinco métricas, cinco fuentes públicas.",
    script:
      "<b>Apertura:</b> \"Cuando hablamos de IA en retail, muchas veces la conversación se queda en el terreno de <em>lo posible</em>. Yo les voy a mostrar cinco casos donde ya no es posible. Es hecho. En producción.\"\n\n<b>Pandora (25 s):</b> \"Joyería. Cien países. Sesenta por ciento de los casos de servicio se resuelven <em>sin</em> intervención humana. Diez puntos de NPS arriba. Cuarenta mil conversaciones al mes. Y cerca de una quinta parte de las ventas asistidas por chat.\"\n\n<b>SharkNinja (15 s):</b> \"Marca de electrodomésticos de tres mil millones. Catorce países en producción. Más seis por ciento de conversión anual. Veinte mil chats por semana automatizados.\"\n\n<b>Fisher & Paykel (15 s):</b> \"Cien mil perfiles unificados en un solo cliente. Resultado: más treinta y tres por ciento en conversión.\"\n\n<b>Williams-Sonoma (15 s):</b> \"Nueve marcas. Siete meses y medio. Veintiún millones de nuevos suscriptores. Sesenta por ciento de las consultas de chat se anticipan solas.\"\n\n<b>Janie and Jack (10 s):</b> \"Y en tienda física — ciento seis tiendas en dieciocho semanas.\"\n\n[Pausa larga]\n\n<b>Cierre:</b> \"Ninguna de estas cinco compañías compite directamente con ustedes. Pero las cinco compraron el mismo tipo de arquitectura. Y todas cifras las han reportado ellas mismas — no las publica el proveedor.\"",
    tips: [
      "Este es el slide más denso. Baja el ritmo.",
      "PepsiCo, Home Depot, Saks y Sam's Club están intencionalmente fuera del deck.",
    ],
  },
  {
    index: 10,
    title: "LATAM · Tres reglas propias",
    timing: "13:00 – 14:30",
    role: "Information",
    goal: "Convertir los ejemplos globales del slide anterior en oportunidad local. Sembrar la relevancia de WhatsApp para la demo del partner.",
    script:
      "\"Todo lo que acaban de ver funcionó en Europa, Estados Unidos y Asia. Pero LATAM no es una versión atrasada de esos mercados.\"\n\n<b>Regla 1:</b> \"WhatsApp es <em>el</em> canal. No un canal. El. Un millón de empresas ya venden con un agente de IA en WhatsApp. Si su estrategia no arranca por WhatsApp, está mal diseñada. Punto.\"\n\n<b>Regla 2:</b> \"El retailer también es el banco de su cliente. Cincuenta por ciento con cuenta bancaria — menos del veinte por ciento con tarjeta de crédito. Eso convierte al retailer con red física en la financiera más cercana al consumidor.\"\n\n<b>Regla 3:</b> \"Publicidad propia sobre datos propios. La región crece a poco más del diez por ciento contra veintidós global. El margen que hoy se fuga a Meta y Google puede regresar al retailer que active sus datos propios.\"",
  },
  {
    index: 11,
    title: "La ventana · 12–24 meses",
    timing: "14:30 – 16:00",
    role: "Information",
    goal: "Instalar urgencia sin dramatismo. La audiencia debe sentir el reloj — no ser sermoneada.",
    script:
      "[Baja la voz. Postura seria pero tranquila]\n\n\"Aquí es donde me toca decir la parte que no es agradable de escuchar.\"\n\n[Pausa de 2 segundos]\n\n\"Varios operadores del top diez ANTAD — no todos, pero suficientes — <em>ya se movieron</em>. Están en producción con IA. Con datos unificados. Con equipos internos que llevan 18 a 24 meses ejecutando.\"\n\n\"La brecha entre ellos y el resto se ensancha cada trimestre. Hay una ventana — que BCG y McKinsey coinciden en ubicar entre 18 y 24 meses — antes de que la brecha se vuelva estructural. Después, cerrarla ya no es tecnología. Es una decisión de fusión o adquisición.\"\n\n<b>Callback a Sara:</b> \"Cada trimestre que pasa, mil Saras eligen al retailer que sí les contestó a las 10 de la noche.\"",
    tips: [
      "No nombrar operadores específicos. Si alguien pregunta: 'Es información pública, mi trabajo aquí no es señalar competidores.'",
    ],
  },
  {
    index: 12,
    title: "40% + Cuatro pilares",
    timing: "16:00 – 17:30",
    role: "Information",
    goal: "Pivote clave + marco decisional en el mismo slide. Movemos la conversación de 'adoptar IA' a 'adoptarla bien'.",
    script:
      "<b>Apertura (30 s):</b> \"No quiero ser el consultor que sube y dice 'todo funciona, corran a comprar'. Gartner publicó que más del cuarenta por ciento de los proyectos de IA agéntica se cancelará antes de 2027. No por la tecnología. Por cómo se compraron.\"\n\n<b>El giro:</b> \"El error no es adoptar IA. Es adoptarla <em>sin un marco de decisión</em> que la sostenga. Los pilotos que <em>sí</em> llegan a producción tienen cuatro cosas en común.\"\n\n<b>Pilar 1:</b> \"Un solo cerebro de datos.\"\n<b>Pilar 2:</b> \"Una capa de confianza desde el día cero.\"\n<b>Pilar 3:</b> \"Reglas duras y razonamiento suave.\"\n<b>Pilar 4:</b> \"Métrica de negocio o se cancela.\"\n\n<b>Cierre:</b> \"Si su próxima inversión no cumple estos cuatro, van a estar en el cuarenta por ciento que se cancela.\"",
    tips: [
      "No nombrar Coppel ni ninguna empresa víctima específica en el pilar 2.",
    ],
  },
  {
    index: 13,
    title: "Cómo lo resuelve Salesforce",
    timing: "17:30 – 18:45",
    role: "Information",
    goal: "Cerrar el ciclo argumentativo: los pilares que describí existen construidos como una sola plataforma. Sin extenderme — la demo profundiza.",
    script:
      "\"Y aquí es donde por fin les respondo la pregunta que muchos de ustedes tienen desde hace 15 minutos. ¿Existe algo que empaquete estos cuatro pilares? La respuesta es sí. Se llama Salesforce.\"\n\n[Pausa breve para señalar el card de arquitectura]\n\n\"En cuatro capas: la capa de confianza — desde el día cero. El cerebro de datos unificado — con Zero Copy, sin mover el data lake. Comercio, servicio, marketing y tienda sobre el <em>mismo</em> modelo de metadatos. Y encima, agentes retail-tuned que combinan razonamiento con reglas duras.\"\n\n\"Y no es teoría. Los cinco casos que les mostré corren <em>sobre esta misma plataforma</em>. Es la única reconocida como Leader simultáneamente en Comercio, Marketing, CDP y Servicio.\"",
    tips: [
      "No detallar cada producto — la demo del partner profundiza.",
      "Sugerencia de transición al partner: 'Y precisamente cómo se ve esto ejecutándose sobre un cliente mexicano — un martes a las 10 de la noche — es lo que sigue en los próximos 30 minutos.'",
    ],
  },
  {
    index: 14,
    title: "Tres frases para llevar",
    timing: "18:45 – 19:30",
    role: "Inspiration",
    goal: "Que la audiencia salga con tres frases sticky que puedan repetir en su comité ejecutivo el lunes.",
    script:
      "\"Si de estos veinte minutos sólo se llevan tres frases… que sean estas.\"\n\n[Léelas pausado, en voz alta. Toma UNA para ahondar 20 segundos.]\n\n<b>Elegir según composición de la sala:</b>\n· Mayoría CEO → ahonda #03 (la ventana).\n· Mayoría CFO → ahonda #01 (el cliente cambió).\n· Mayoría CMO → ahonda #02 (WhatsApp).\n· Sala mixta → ahonda #01.",
  },
  {
    index: 15,
    title: "Cierre · La ventana está abierta",
    timing: "19:30 – 20:00",
    role: "Inspiration",
    goal: "Dejar a la audiencia con una emoción — no con una conclusión. La emoción es ilusión, no urgencia.",
    script:
      "[Baja el volumen. Baja el ritmo. Postura relajada]\n\n\"Cuando empecé les dije que estos veinte minutos no eran una advertencia. Eran una invitación.\"\n\n[Pausa larga]\n\n\"La IA en retail dejó de ser diferenciador. Ya es condición de supervivencia — sí. Pero también es, para quien la construya bien, el primer momento en veinte años donde un retailer mexicano puede volver a competir de igual a igual con cualquiera del mundo.\"\n\n<b>Callback a Sara y última frase:</b> \"La ventana está abierta. Sara existe. Y hoy la pueden servir. Gracias — y ahora, si me permiten, les paso la voz a [Nombre del partner], que les va a mostrar cómo se ve todo esto en la pantalla de <em>su</em> cliente.\"",
    tips: [
      "Contacto visual con 3 personas antes de la última frase.",
      "El botón 'Descargar la presentación' está visible al final para la audiencia.",
    ],
  },
];

const retailAiTedColombia: PresenterSlide[] = [
  {
    index: 1,
    title: "Portada · El cliente ya cambió",
    timing: "0:00 – 0:15",
    role: "Inspiration",
    goal: "Establecer autoridad y tono en 15 segundos. Que la sala deje de mirar el teléfono.",
    script:
      "[Antes de hablar, mirar la sala 3 segundos completos]\n\n\"El retail no está esperando… a nadie.\"\n\n[Silencio de 2 segundos]\n\n\"En los próximos 20 minutos voy a intentar convencerlos de que esa frase no es una advertencia. Es una invitación.\"",
    tips: [
      "No leer el subtítulo. Se lee solo.",
      "El QR queda visible en pantalla — invita a la audiencia a escanear con: 'y para quienes quieran seguir la presentación desde su teléfono, ahí queda el QR.'",
      "No arrancar con 'buenas tardes, gracias por venir'. Eso lo hizo quien te presentó.",
    ],
  },
  {
    index: 2,
    title: "Video · Cómo se ve el retail bien construido",
    timing: "0:15 – 3:00",
    role: "Inspiration",
    goal: "Dejar que Salesforce cuente en imágenes lo que después conversaremos en palabras. Empatía visual antes de argumento.",
    script:
      "[Introducir el video en una línea, casual]\n\n\"Antes de que empecemos a hablar, permítanme mostrarles algo. Es un video corto — dos minutos y medio. Miren, no la marca. Miren la <em>experiencia</em>.\"\n\n[Reproducir el video. No hablar mientras corre. Al terminar]\n\n\"Eso es lo que ya está pasando. Ahora hablemos de cómo.\"",
    tips: [
      "No comentar durante el video.",
      "Si el auditorio no tiene buen sonido, subir volumen o usar subtítulos en YouTube.",
      "Al terminar, dejar 1 segundo de silencio antes de avanzar.",
    ],
  },
  {
    index: 3,
    title: "Escena WhatsApp · Sara",
    timing: "3:00 – 3:45",
    role: "Inspiration",
    goal: "Anclar toda la sesión en una escena concreta. La audiencia debe visualizar a Sara — o a su equivalente — antes de escuchar un solo número.",
    script:
      "\"Un martes cualquiera. Nueve y cuarenta y siete de la noche.\"\n\n[Esperar la primera burbuja]\n\n\"Sara acaba de acostar a su hijo. Se acuerda que se le acabó el café que usa todas las mañanas.\"\n\n[Esperar burbuja out]\n\n\"No abre la app del retailer. No entra al sitio. Abre WhatsApp.\"\n\n[Esperar la respuesta con stock]\n\n\"Y del otro lado — no la atiende un humano. Pero la conversación se siente humana.\"\n\n[Esperar 'Mándalo a casa']\n\n<b>Cierre:</b> \"Esta conversación duró 40 segundos. Del otro lado no había nadie escribiendo. Y esta cliente acaba de comprarle a un retailer que hace 18 meses no existía como opción para ella.\"",
    tips: [
      "Ritmo lento. Pausa después de cada burbuja.",
      "Camina un paso hacia la audiencia al decir 'no había nadie escribiendo'.",
    ],
  },
  {
    index: 4,
    title: "Encuesta · 6 sí, 4 no",
    timing: "3:45 – 4:30",
    role: "Inspiration",
    goal: "Convertir a la audiencia en participante. Que dejen de escuchar y empiecen a estar involucrados.",
    script:
      "[Cambio de tono: más directo, casual, caminar hacia la audiencia]\n\n\"Levanten la mano — quien crea que su empresa puede entregar esa experiencia hoy. Tal cual. Un martes a las 10 de la noche.\"\n\n[Esperar. Contar rápido con la vista]\n\n\"Si en esta sala — con los CEOs, CMOs y CFOs del retail colombiano — seis de cada diez no pueden levantar la mano… la pregunta ya no es <em>si</em> vamos a construir ese cliente. Es <em>quién</em> lo va a construir primero.\"",
    tips: [
      "Muchas manos: 'Bueno, esta sala está adelantada.'",
      "Pocas manos: 'Perfecto. Entonces la conversación que sigue es para ustedes.'",
      "Cero manos: '…y eso, en sí mismo, ya es un dato.'",
    ],
  },
  {
    index: 5,
    title: "La ola llegó · Contexto global",
    timing: "4:30 – 6:00",
    role: "Information",
    goal: "Fijar el marco global con fuentes primarias. La audiencia deja de dudar si 'esto está pasando'.",
    script:
      "\"Tres de cada cuatro retailers globales — no cualquiera, los que compiten al top — dicen que los agentes de IA <em>no</em> son un experimento más. Son esenciales para 2026.\"\n\n<b>Punchline:</b> \"Y ya se refleja en el marcador. El liderazgo del top-3 retail de Estados Unidos se está redistribuyendo — con base en <em>stack de datos y de IA</em>, no en superficie de tienda.\"\n\n[Dejar la timeline en pantalla 20 segundos]\n\n<b>Cierre / puente:</b> \"Y esta reasignación no es solo un fenómeno gringo. Ahora vamos a ver por qué Colombia ya está adentro.\"",
    tips: [
      "No nombrar a Walmart explícito en voz alta — la timeline lo dice implícitamente.",
      "Fuentes verificables: Salesforce Connected Shoppers · Gartner CIO Agenda · Amazon Shareholder Letter · J.P. Morgan.",
    ],
  },
  {
    index: 6,
    title: "Colombia ya está adentro",
    timing: "6:00 – 7:30",
    role: "Information",
    goal: "Aterrizar. La audiencia siente que dejamos de hablar del mundo y empezamos a hablar de su casa.",
    script:
      "\"Aquí viene la parte que a mí me sorprendió cuando la vi por primera vez. Colombia no es un mercado retail rezagado. Es un mercado que se acaba de inflectar.\"\n\n\"El comercio minorista colombiano creció <em>once punto siete por ciento real</em> en 2025 — y aceleró a catorce punto nueve por ciento en abril de 2026. No es un país estancado. Es uno que se está calentando.\"\n\n[Pausa]\n\n\"Nueve punto tres millones de colombianos ya compran en línea. Ciento cuarenta y cinco billones de pesos en ventas online. Seiscientas ochenta y cuatro millones de transacciones — casi veinte por ciento más que el año anterior. Y la participación e-commerce, que estuvo estable tres años en dos punto cuatro por ciento, saltó a dos punto seis en dos meses. Ese es el punto de inflexión.\"\n\n<b>Cierre:</b> \"La pregunta ya no es si el cliente colombiano está listo para la IA. Es si la industria colombiana está lista para el cliente que ya la está usando.\"",
    tips: [
      "Fuentes: DANE (retail físico), CCCE (e-commerce), Superfinanciera (bancarización).",
      "No comparar con México, Brasil o Chile — la sala está en Colombia.",
    ],
  },
  {
    index: 7,
    title: "El cliente cambió sin permiso",
    timing: "7:30 – 9:00",
    role: "Information",
    goal: "Mover a la audiencia del 'esto es tecnología' al 'esto es mi cliente'.",
    script:
      "\"El cliente cambió sin pedirnos permiso.\"\n\n[Pausa]\n\n\"El cincuenta y tres por ciento — más de la mitad — ya descubre productos hablando. Con IA. En canales sociales. En mensajería. Hace tres años eran el cuarenta y seis. En dos años más, esto va a ser mayoría absoluta.\"\n\n\"Esto no es lo que las marcas están haciendo. Esto es lo que el cliente <em>ya está haciendo</em>.\"\n\n<b>La pregunta:</b> \"¿Nuestro cliente nos encuentra donde nos busca, o nos busca donde lo obligamos a buscarnos?\"",
    tips: [
      "Cita Forrester: 'La búsqueda se está volviendo respuesta. El sitio se está volviendo conversación.' Léela pausado.",
    ],
  },
  {
    index: 8,
    title: "Tres frentes · Servicio · Comercio · Operación",
    timing: "9:00 – 10:30",
    role: "Information",
    goal: "Dar a la audiencia el mapa mental que va a usar para procesar todo lo que sigue.",
    script:
      "\"La IA no es <em>una</em> cosa que hace el retail. Son tres cosas — que se sienten distintas del lado del cliente pero que comparten el mismo cerebro por atrás.\"\n\n<b>Servicio:</b> \"Conversar antes, durante y después de la compra. Un agente 24/7 que recuerda todo, resuelve devoluciones y escala al humano cuando importa.\"\n\n<b>Comercio:</b> \"Descubrir, elegir y pagar sin fricción. Un asistente que entiende lo que el cliente quiere en <em>sus</em> palabras. No en filtros.\"\n\n<b>Operación:</b> \"Anticipar, planear y ejecutar mejor que ayer. El cerebro que trabaja mientras la tienda duerme.\"\n\n<b>Cierre:</b> \"Tres frentes. Un cerebro. Cualquier proyecto que ataque uno de estos sin resolver los otros dos… se rompe al segundo trimestre.\"",
  },
  {
    index: 9,
    title: "Evidencia pública · 5 casos",
    timing: "10:30 – 13:00",
    role: "Information",
    goal: "Quitarle a la audiencia la objeción 'sí, pero eso no ha funcionado a escala'. Cinco casos, cinco métricas, cinco fuentes públicas.",
    script:
      "<b>Apertura:</b> \"Cuando hablamos de IA en retail, muchas veces la conversación se queda en el terreno de <em>lo posible</em>. Yo les voy a mostrar cinco casos donde ya no es posible. Es hecho. En producción.\"\n\n<b>Pandora (25 s):</b> \"Joyería. Cien países. Sesenta por ciento de los casos de servicio se resuelven <em>sin</em> intervención humana. Diez puntos de NPS arriba. Cuarenta mil conversaciones al mes. Y cerca de una quinta parte de las ventas asistidas por chat.\"\n\n<b>SharkNinja (15 s):</b> \"Marca de electrodomésticos de tres mil millones. Catorce países en producción. Más seis por ciento de conversión anual. Veinte mil chats por semana automatizados.\"\n\n<b>Fisher & Paykel (15 s):</b> \"Cien mil perfiles unificados en un solo cliente. Resultado: más treinta y tres por ciento en conversión.\"\n\n<b>Williams-Sonoma (15 s):</b> \"Nueve marcas. Siete meses y medio. Veintiún millones de nuevos suscriptores. Sesenta por ciento de las consultas de chat se anticipan solas.\"\n\n<b>Janie and Jack (10 s):</b> \"Y en tienda física — ciento seis tiendas en dieciocho semanas.\"\n\n[Pausa larga]\n\n<b>Cierre:</b> \"Ninguna de estas cinco compañías compite directamente con ustedes. Pero las cinco compraron el mismo tipo de arquitectura. Y todas cifras las han reportado ellas mismas — no las publica el proveedor.\"",
    tips: [
      "Este es el slide más denso. Baja el ritmo.",
      "PepsiCo, Home Depot, Saks y Sam's Club están intencionalmente fuera del deck.",
    ],
  },
  {
    index: 10,
    title: "LATAM · Tres reglas propias",
    timing: "13:00 – 14:30",
    role: "Information",
    goal: "Convertir los ejemplos globales del slide anterior en oportunidad local. Sembrar la relevancia de WhatsApp para la demo del partner.",
    script:
      "\"Todo lo que acaban de ver funcionó en Europa, Estados Unidos y Asia. Pero LATAM no es una versión atrasada de esos mercados.\"\n\n<b>Regla 1:</b> \"WhatsApp es <em>el</em> canal. No un canal. El. Un millón de empresas ya venden con un agente de IA en WhatsApp. Si su estrategia no arranca por WhatsApp, está mal diseñada. Punto.\"\n\n<b>Regla 2:</b> \"El retailer también es el banco de su cliente. Noventa y seis por ciento de los adultos colombianos tiene un producto financiero — pero sólo veintitrés por ciento tarjeta de crédito. Eso convierte al retailer con red física en la financiera más cercana al consumidor.\"\n\n<b>Regla 3:</b> \"Publicidad propia sobre datos propios. La región crece a poco más del diez por ciento contra veintidós global. El margen que hoy se fuga a Meta y Google puede regresar al retailer que active sus datos propios.\"",
  },
  {
    index: 11,
    title: "La ventana · 12–24 meses",
    timing: "14:30 – 16:00",
    role: "Information",
    goal: "Instalar urgencia sin dramatismo. La audiencia debe sentir el reloj — no ser sermoneada.",
    script:
      "[Baja la voz. Postura seria pero tranquila]\n\n\"Aquí es donde me toca decir la parte que no es agradable de escuchar.\"\n\n[Pausa de 2 segundos]\n\n\"Rappi ya se movió — adquirió Fountain9 hace veintidós meses y hoy corre IA de supply chain en dark stores en todo LATAM. Falabella lanzó su asistente conversacional. Bancolombia y Davivienda llevan años cruzando datos financieros y de consumo con IA. <em>Ya se movieron</em>. Con data unificada. Con equipos internos ejecutando desde 2024.\"\n\n\"La brecha entre ellos y el resto se ensancha cada trimestre. Hay una ventana — que BCG y McKinsey coinciden en ubicar entre 18 y 24 meses — antes de que la brecha se vuelva estructural. Después, cerrarla ya no es tecnología. Es una decisión de fusión o adquisición.\"\n\n<b>Callback a Sara:</b> \"Cada trimestre que pasa, mil Saras eligen al retailer que sí les contestó a las 10 de la noche.\"",
    tips: [
      "Rappi/Falabella/Bancolombia/Davivienda son públicos. Otros retailers colombianos en piloto: no nombrar.",
      "Si alguien pregunta por Grupo Éxito, D1 o Cencosud: 'Es información pública, mi trabajo aquí no es señalar competidores.'",
    ],
  },
  {
    index: 12,
    title: "40% + Cuatro pilares",
    timing: "16:00 – 17:30",
    role: "Information",
    goal: "Pivote clave + marco decisional en el mismo slide. Movemos la conversación de 'adoptar IA' a 'adoptarla bien'.",
    script:
      "<b>Apertura (30 s):</b> \"No quiero ser el consultor que sube y dice 'todo funciona, corran a comprar'. Gartner publicó que más del cuarenta por ciento de los proyectos de IA agéntica se cancelará antes de 2027. No por la tecnología. Por cómo se compraron.\"\n\n<b>El giro:</b> \"El error no es adoptar IA. Es adoptarla <em>sin un marco de decisión</em> que la sostenga. Los pilotos que <em>sí</em> llegan a producción tienen cuatro cosas en común.\"\n\n<b>Pilar 1:</b> \"Un solo cerebro de datos.\"\n<b>Pilar 2:</b> \"Una capa de confianza desde el día cero — Ley 1581 vigente y SIC vigilante sobre decisiones automatizadas.\"\n<b>Pilar 3:</b> \"Reglas duras y razonamiento suave.\"\n<b>Pilar 4:</b> \"Métrica de negocio o se cancela.\"\n\n<b>Cierre:</b> \"Si su próxima inversión no cumple estos cuatro, van a estar en el cuarenta por ciento que se cancela.\"",
    tips: [
      "No nombrar incidentes de datos específicos de retailers colombianos en el pilar 2.",
    ],
  },
  {
    index: 13,
    title: "Cómo lo resuelve Salesforce",
    timing: "17:30 – 18:45",
    role: "Information",
    goal: "Cerrar el ciclo argumentativo: los pilares que describí existen construidos como una sola plataforma. Sin extenderme — la demo profundiza.",
    script:
      "\"Y aquí es donde por fin les respondo la pregunta que muchos de ustedes tienen desde hace 15 minutos. ¿Existe algo que empaquete estos cuatro pilares? La respuesta es sí. Se llama Salesforce.\"\n\n[Pausa breve para señalar el card de arquitectura]\n\n\"En cuatro capas: la capa de confianza — desde el día cero. El cerebro de datos unificado — con Zero Copy, sin mover el data lake. Comercio, servicio, marketing y tienda sobre el <em>mismo</em> modelo de metadatos. Y encima, agentes retail-tuned que combinan razonamiento con reglas duras.\"\n\n\"Y no es teoría. Los cinco casos que les mostré corren <em>sobre esta misma plataforma</em>. Es la única reconocida como Leader simultáneamente en Comercio, Marketing, CDP y Servicio.\"",
    tips: [
      "No detallar cada producto — la demo del partner profundiza.",
      "Sugerencia de transición al partner: 'Y precisamente cómo se ve esto ejecutándose sobre un cliente colombiano — un martes a las 10 de la noche — es lo que sigue en los próximos 30 minutos.'",
    ],
  },
  {
    index: 14,
    title: "Tres frases para llevar",
    timing: "18:45 – 19:30",
    role: "Inspiration",
    goal: "Que la audiencia salga con tres frases sticky que puedan repetir en su comité ejecutivo el lunes.",
    script:
      "\"Si de estos veinte minutos sólo se llevan tres frases… que sean estas.\"\n\n[Léelas pausado, en voz alta. Toma UNA para ahondar 20 segundos.]\n\n<b>Elegir según composición de la sala:</b>\n· Mayoría CEO → ahonda #03 (la ventana).\n· Mayoría CFO → ahonda #01 (el cliente cambió).\n· Mayoría CMO → ahonda #02 (WhatsApp).\n· Sala mixta → ahonda #01.",
  },
  {
    index: 15,
    title: "Cierre · La ventana está abierta",
    timing: "19:30 – 20:00",
    role: "Inspiration",
    goal: "Dejar a la audiencia con una emoción — no con una conclusión. La emoción es ilusión, no urgencia.",
    script:
      "[Baja el volumen. Baja el ritmo. Postura relajada]\n\n\"Cuando empecé les dije que estos veinte minutos no eran una advertencia. Eran una invitación.\"\n\n[Pausa larga]\n\n\"La IA en retail dejó de ser diferenciador. Ya es condición de supervivencia — sí. Pero también es, para quien la construya bien, el primer momento en veinte años donde un retailer colombiano puede volver a competir de igual a igual con cualquiera del mundo.\"\n\n<b>Callback a Sara y última frase:</b> \"La ventana está abierta. Sara existe. Y hoy la pueden servir. Gracias — y ahora, si me permiten, les paso la voz a [Nombre del partner], que les va a mostrar cómo se ve todo esto en la pantalla de <em>su</em> cliente.\"",
    tips: [
      "Contacto visual con 3 personas antes de la última frase.",
      "El botón 'Descargar la presentación' está visible al final para la audiencia.",
    ],
  },
];

const retailAiTedCentroamerica: PresenterSlide[] = [
  {
    index: 1,
    title: "Portada · El cliente ya cambió",
    timing: "0:00 – 0:15",
    role: "Inspiration",
    goal: "Establecer autoridad y tono en 15 segundos. Que la sala deje de mirar el teléfono.",
    script:
      "[Antes de hablar, mirar la sala 3 segundos completos]\n\n\"El retail no está esperando… a nadie.\"\n\n[Silencio de 2 segundos]\n\n\"En los próximos 20 minutos voy a intentar convencerlos de que esa frase no es una advertencia. Es una invitación.\"",
    tips: [
      "No leer el subtítulo. Se lee solo.",
      "El QR queda visible en pantalla — invita a la audiencia a escanear con: 'y para quienes quieran seguir la presentación desde su teléfono, ahí queda el QR.'",
      "No arrancar con 'buenas tardes, gracias por venir'. Eso lo hizo quien te presentó.",
      "Presentarte una sola vez: 'Soy Pablo Hernández, especialista en CG Cloud y Retail para Centroamérica en Salesforce.'",
    ],
  },
  {
    index: 2,
    title: "Video · Cómo se ve el retail bien construido",
    timing: "0:15 – 3:00",
    role: "Inspiration",
    goal: "Dejar que Salesforce cuente en imágenes lo que después conversaremos en palabras. Empatía visual antes de argumento.",
    script:
      "[Introducir el video en una línea, casual]\n\n\"Antes de que empecemos a hablar, permítanme mostrarles algo. Es un video corto — dos minutos y medio. Miren, no la marca. Miren la <em>experiencia</em>.\"\n\n[Reproducir el video. No hablar mientras corre. Al terminar]\n\n\"Eso es lo que ya está pasando. Ahora hablemos de cómo.\"",
    tips: [
      "No comentar durante el video.",
      "Si el auditorio no tiene buen sonido, subir volumen o usar subtítulos en YouTube.",
      "Al terminar, dejar 1 segundo de silencio antes de avanzar.",
    ],
  },
  {
    index: 3,
    title: "Escena WhatsApp · Sara",
    timing: "3:00 – 3:45",
    role: "Inspiration",
    goal: "Anclar toda la sesión en una escena concreta. La audiencia debe visualizar a Sara — o a su equivalente centroamericano — antes de escuchar un solo número.",
    script:
      "\"Un martes cualquiera. Nueve y cuarenta y siete de la noche.\"\n\n[Esperar la primera burbuja]\n\n\"Sara acaba de acostar a su hijo. Se acuerda que se le acabó el café que usa todas las mañanas.\"\n\n[Esperar burbuja out]\n\n\"No abre la app del retailer. No entra al sitio. Abre WhatsApp.\"\n\n[Esperar la respuesta con stock]\n\n\"Y del otro lado — no la atiende un humano. Pero la conversación se siente humana.\"\n\n[Esperar 'Mándalo a casa']\n\n<b>Cierre:</b> \"Esta conversación duró 40 segundos. Del otro lado no había nadie escribiendo. Y esta cliente acaba de comprarle a un retailer que hace 18 meses no existía como opción para ella.\"",
    tips: [
      "Ritmo lento. Pausa después de cada burbuja.",
      "Camina un paso hacia la audiencia al decir 'no había nadie escribiendo'.",
      "Si la sala es predominantemente costarricense: 'Sara vive en Escazú.' Panameña: 'en San Francisco.' Guatemalteca: 'en zona 10.' Salvadoreña: 'en la Escalón.' Hondureña: 'en Tegucigalpa.' Nicaragüense: 'en Managua.' Elige la ciudad de la mayoría, no seis.",
    ],
  },
  {
    index: 4,
    title: "Encuesta · 6 sí, 4 no",
    timing: "3:45 – 4:30",
    role: "Inspiration",
    goal: "Convertir a la audiencia en participante. Que dejen de escuchar y empiecen a estar involucrados.",
    script:
      "[Cambio de tono: más directo, casual, caminar hacia la audiencia]\n\n\"Levanten la mano — quien crea que su empresa puede entregar esa experiencia hoy. Tal cual. Un martes a las 10 de la noche.\"\n\n[Esperar. Contar rápido con la vista]\n\n\"Si en esta sala — con los CEOs, CMOs y CFOs del retail centroamericano — seis de cada diez no pueden levantar la mano… la pregunta ya no es <em>si</em> vamos a construir ese cliente. Es <em>quién</em> lo va a construir primero.\"",
    tips: [
      "Muchas manos: 'Bueno, esta sala está adelantada.'",
      "Pocas manos: 'Perfecto. Entonces la conversación que sigue es para ustedes.'",
      "Cero manos: '…y eso, en sí mismo, ya es un dato.'",
    ],
  },
  {
    index: 5,
    title: "La ola llegó · Contexto global",
    timing: "4:30 – 6:00",
    role: "Information",
    goal: "Fijar el marco global con fuentes primarias. La audiencia deja de dudar si 'esto está pasando'.",
    script:
      "\"Tres de cada cuatro retailers globales — no cualquiera, los que compiten al top — dicen que los agentes de IA <em>no</em> son un experimento más. Son esenciales para 2026.\"\n\n<b>Punchline:</b> \"Y ya se refleja en el marcador. El liderazgo del top-3 retail de Estados Unidos se está redistribuyendo — con base en <em>stack de datos y de IA</em>, no en superficie de tienda.\"\n\n[Dejar la timeline en pantalla 20 segundos]\n\n<b>Cierre / puente:</b> \"Y esta reasignación no es solo un fenómeno gringo. Ahora vamos a ver por qué Centroamérica ya está adentro.\"",
    tips: [
      "No nombrar a Walmart explícito en voz alta — la timeline lo dice implícitamente.",
      "Fuentes verificables: Salesforce Connected Shoppers · Gartner CIO Agenda · Amazon Shareholder Letter · J.P. Morgan.",
    ],
  },
  {
    index: 6,
    title: "Centroamérica ya está adentro",
    timing: "6:00 – 7:30",
    role: "Information",
    goal: "Aterrizar. La audiencia siente que dejamos de hablar del mundo y empezamos a hablar de su región.",
    script:
      "\"Aquí viene la parte que a mí me sorprendió cuando la puse en cifras por primera vez. Centroamérica no es un mercado pequeño. Es un mercado de <em>trescientos ochenta y ocho mil millones de dólares</em>.\"\n\n[Pausa]\n\n\"Seis países. Trescientos ochenta y ocho mil millones. Casi mil tiendas Walmart. Cincuenta y siete clubes de PriceSmart. Y una diferencia que muchos no ven: Panamá saltó de cuarenta y cinco a sesenta y cuatro por ciento de adultos bancarizados en tres años. El mayor salto de inclusión financiera de la región.\"\n\n[Pausa]\n\n\"Ochenta y siete por ciento de los ticos ya usan Internet. Sesenta y cuatro por ciento de los panameños tiene cuenta bancaria. Pero al mismo tiempo — tres de cada cuatro nicaragüenses todavía <em>no está</em> bancarizado. Y uno de cada dos guatemaltecos u hondureños tampoco.\"\n\n<b>Cierre:</b> \"La pregunta ya no es si el cliente centroamericano está listo para la IA. Es si la industria centroamericana está lista para servir seis mercados con un solo cerebro — porque hasta ahora hemos hecho seis pilotos aislados.\"",
    tips: [
      "Fuentes: Banco Mundial 2024, Global Findex 2025 (base 2024), Walmart Corporate, PriceSmart IR.",
      "Ajustar la ciudad de referencia según el país anfitrión — no citar los seis países en cadena.",
      "Si preguntan por Nicaragua en detalle: 'Es un mercado de USD 19,7B con la bancarización más baja y en retroceso — dato preocupante, no juicio político.'",
    ],
  },
  {
    index: 7,
    title: "El cliente cambió sin permiso",
    timing: "7:30 – 9:00",
    role: "Information",
    goal: "Mover a la audiencia del 'esto es tecnología' al 'esto es mi cliente'.",
    script:
      "\"El cliente cambió sin pedirnos permiso.\"\n\n[Pausa]\n\n\"El cincuenta y tres por ciento — más de la mitad — ya descubre productos hablando. Con IA. En canales sociales. En mensajería. Hace tres años eran el cuarenta y seis. En dos años más, esto va a ser mayoría absoluta.\"\n\n\"Esto no es lo que las marcas están haciendo. Esto es lo que el cliente <em>ya está haciendo</em>.\"\n\n<b>La pregunta:</b> \"¿Nuestro cliente nos encuentra donde nos busca, o nos busca donde lo obligamos a buscarnos?\"",
    tips: [
      "Cita Forrester: 'La búsqueda se está volviendo respuesta. El sitio se está volviendo conversación.' Léela pausado.",
    ],
  },
  {
    index: 8,
    title: "Tres frentes · Servicio · Comercio · Operación",
    timing: "9:00 – 10:30",
    role: "Information",
    goal: "Dar a la audiencia el mapa mental que va a usar para procesar todo lo que sigue.",
    script:
      "\"La IA no es <em>una</em> cosa que hace el retail. Son tres cosas — que se sienten distintas del lado del cliente pero que comparten el mismo cerebro por atrás.\"\n\n<b>Servicio:</b> \"Conversar antes, durante y después de la compra. Un agente 24/7 que recuerda todo, resuelve devoluciones y escala al humano cuando importa.\"\n\n<b>Comercio:</b> \"Descubrir, elegir y pagar sin fricción. Un asistente que entiende lo que el cliente quiere en <em>sus</em> palabras. No en filtros.\"\n\n<b>Operación:</b> \"Anticipar, planear y ejecutar mejor que ayer. El cerebro que trabaja mientras la tienda duerme.\"\n\n<b>Cierre:</b> \"Tres frentes. Un cerebro. Cualquier proyecto que ataque uno de estos sin resolver los otros dos… se rompe al segundo trimestre.\"",
  },
  {
    index: 9,
    title: "Evidencia pública · 5 casos",
    timing: "10:30 – 13:00",
    role: "Information",
    goal: "Quitarle a la audiencia la objeción 'sí, pero eso no ha funcionado a escala'. Cinco casos, cinco métricas, cinco fuentes públicas.",
    script:
      "<b>Apertura:</b> \"Cuando hablamos de IA en retail, muchas veces la conversación se queda en el terreno de <em>lo posible</em>. Yo les voy a mostrar cinco casos donde ya no es posible. Es hecho. En producción.\"\n\n<b>Pandora (25 s):</b> \"Joyería. Cien países. Sesenta por ciento de los casos de servicio se resuelven <em>sin</em> intervención humana. Diez puntos de NPS arriba. Cuarenta mil conversaciones al mes. Y cerca de una quinta parte de las ventas asistidas por chat.\"\n\n<b>SharkNinja (15 s):</b> \"Marca de electrodomésticos de tres mil millones. Catorce países en producción. Más seis por ciento de conversión anual. Veinte mil chats por semana automatizados.\"\n\n<b>Fisher & Paykel (15 s):</b> \"Cien mil perfiles unificados en un solo cliente. Resultado: más treinta y tres por ciento en conversión.\"\n\n<b>Williams-Sonoma (15 s):</b> \"Nueve marcas. Siete meses y medio. Veintiún millones de nuevos suscriptores. Sesenta por ciento de las consultas de chat se anticipan solas.\"\n\n<b>Janie and Jack (10 s):</b> \"Y en tienda física — ciento seis tiendas en dieciocho semanas.\"\n\n[Pausa larga]\n\n<b>Cierre:</b> \"Ninguna de estas cinco compañías compite directamente con ustedes. Pero las cinco compraron el mismo tipo de arquitectura. Y todas cifras las han reportado ellas mismas — no las publica el proveedor.\"",
    tips: [
      "Este es el slide más denso. Baja el ritmo.",
      "PepsiCo, Home Depot, Saks y Sam's Club están intencionalmente fuera del deck.",
    ],
  },
  {
    index: 10,
    title: "LATAM · Tres reglas propias",
    timing: "13:00 – 14:30",
    role: "Information",
    goal: "Convertir los ejemplos globales del slide anterior en oportunidad local. Sembrar la relevancia de WhatsApp para la demo que Pablo va a conducir.",
    script:
      "\"Todo lo que acaban de ver funcionó en Europa, Estados Unidos y Asia. Pero LATAM — y Centroamérica en particular — no es una versión atrasada de esos mercados.\"\n\n<b>Regla 1:</b> \"WhatsApp es <em>el</em> canal. No un canal. El. Un millón de empresas ya venden con un agente de IA en WhatsApp. Si su estrategia no arranca por WhatsApp, está mal diseñada. Punto.\"\n\n<b>Regla 2:</b> \"El retailer también es el banco de su cliente. En Costa Rica y Panamá dos de cada tres adultos ya tiene cuenta. Pero en Guatemala y Nicaragua, uno de cada tres o menos. Y entre ese hueco viven Yappy, Tigo Money, Chivo Wallet, SINPE Móvil — el retailer con red física es la financiera más cercana al consumidor sin cuenta bancaria.\"\n\n<b>Regla 3:</b> \"Servir seis mercados con un solo cerebro. Ningún retailer regional puede darse el lujo de seis pilotos aislados. El primero que tenga un stack multi-país sobre una sola fundación es el que captura la ventaja estructural de la región.\"",
  },
  {
    index: 11,
    title: "La ventana · 12–24 meses",
    timing: "14:30 – 16:00",
    role: "Information",
    goal: "Instalar urgencia sin dramatismo. La audiencia debe sentir el reloj — no ser sermoneada.",
    script:
      "[Baja la voz. Postura seria pero tranquila]\n\n\"Aquí es donde me toca decir la parte que no es agradable de escuchar.\"\n\n[Pausa de 2 segundos]\n\n\"Walmart Centroamérica opera novecientas cincuenta y dos tiendas en cinco países desde su HQ en San José — con la ventaja de datos y stack de un top-3 retailer mundial. PriceSmart consolida cincuenta y siete clubes en doce países sobre una sola plataforma. Los grupos regionales con crédito propio — Unicomer, Grupo Q, farmacias regionales — llevan años acumulando datos primarios sin activarlos. <em>Ya tienen la escala</em>. Con data unificada. Con equipos internos ejecutando.\"\n\n\"La brecha entre ellos y el resto se ensancha cada trimestre. Hay una ventana — que BCG y McKinsey coinciden en ubicar entre 18 y 24 meses — antes de que la brecha se vuelva estructural. Después, cerrarla ya no es tecnología. Es una decisión de fusión o adquisición.\"\n\n<b>Callback a Sara:</b> \"Cada trimestre que pasa, mil Saras eligen al retailer que sí les contestó a las 10 de la noche.\"",
    tips: [
      "Walmart CA y PriceSmart son datos públicos (Walmart Corporate, PriceSmart IR). Otros retailers regionales en piloto: no nombrar por respeto competitivo.",
      "Si alguien pregunta por un retailer específico: 'Es información pública, mi trabajo aquí no es señalar competidores.'",
    ],
  },
  {
    index: 12,
    title: "40% + Cuatro pilares",
    timing: "16:00 – 17:30",
    role: "Information",
    goal: "Pivote clave + marco decisional en el mismo slide. Movemos la conversación de 'adoptar IA' a 'adoptarla bien'.",
    script:
      "<b>Apertura (30 s):</b> \"No quiero ser el especialista que sube y dice 'todo funciona, corran a comprar'. Gartner publicó que más del cuarenta por ciento de los proyectos de IA agéntica se cancelará antes de 2027. No por la tecnología. Por cómo se compraron.\"\n\n<b>El giro:</b> \"El error no es adoptar IA. Es adoptarla <em>sin un marco de decisión</em> que la sostenga. Los pilotos que <em>sí</em> llegan a producción tienen cuatro cosas en común.\"\n\n<b>Pilar 1:</b> \"Un solo cerebro de datos — que pueda operar los seis mercados.\"\n<b>Pilar 2:</b> \"Una capa de confianza desde el día cero — seis países, seis marcos legales de datos personales.\"\n<b>Pilar 3:</b> \"Reglas duras y razonamiento suave.\"\n<b>Pilar 4:</b> \"Métrica de negocio o se cancela.\"\n\n<b>Cierre:</b> \"Si su próxima inversión no cumple estos cuatro, van a estar en el cuarenta por ciento que se cancela.\"",
    tips: [
      "Los seis marcos legales: CR Ley 8968, PA Ley 81/2019, SV LPDP 2024, NI Ley 787, HN Ley de Transparencia, GT en discusión.",
      "No nombrar incidentes de datos específicos de retailers CA en el pilar 2.",
    ],
  },
  {
    index: 13,
    title: "Cómo lo resuelve Salesforce",
    timing: "17:30 – 18:45",
    role: "Information",
    goal: "Cerrar el ciclo argumentativo: los pilares que describí existen construidos como una sola plataforma. Sin extenderme — la demo que sigue profundiza.",
    script:
      "\"Y aquí es donde por fin les respondo la pregunta que muchos de ustedes tienen desde hace 15 minutos. ¿Existe algo que empaquete estos cuatro pilares? La respuesta es sí. Se llama Salesforce.\"\n\n[Pausa breve para señalar el card de arquitectura]\n\n\"En cuatro capas: la capa de confianza — desde el día cero. El cerebro de datos unificado — con Zero Copy, sin mover el data lake. Comercio, servicio, marketing y tienda sobre el <em>mismo</em> modelo de metadatos — con configuración nativa multi-país. Y encima, agentes retail-tuned que combinan razonamiento con reglas duras.\"\n\n\"Y no es teoría. Los cinco casos que les mostré corren <em>sobre esta misma plataforma</em>. Es la única reconocida como Leader simultáneamente en Comercio, Marketing, CDP y Servicio.\"",
    tips: [
      "No detallar cada producto — la demo que sigue profundiza.",
      "Transición sugerida: 'Y precisamente cómo se ve esto ejecutándose sobre un cliente centroamericano — un martes a las 10 de la noche — es lo que voy a mostrarles ahora en pantalla, en vivo.'",
    ],
  },
  {
    index: 14,
    title: "Tres frases para llevar",
    timing: "18:45 – 19:30",
    role: "Inspiration",
    goal: "Que la audiencia salga con tres frases sticky que puedan repetir en su comité ejecutivo el lunes.",
    script:
      "\"Si de estos veinte minutos sólo se llevan tres frases… que sean estas.\"\n\n[Léelas pausado, en voz alta. Toma UNA para ahondar 20 segundos.]\n\n<b>Elegir según composición de la sala:</b>\n· Mayoría CEO → ahonda #03 (la ventana).\n· Mayoría CFO → ahonda #01 (el cliente cambió).\n· Mayoría CMO → ahonda #02 (WhatsApp).\n· Sala mixta → ahonda #01.",
  },
  {
    index: 15,
    title: "Cierre · La ventana está abierta",
    timing: "19:30 – 20:00",
    role: "Inspiration",
    goal: "Dejar a la audiencia con una emoción — no con una conclusión. La emoción es ilusión, no urgencia. Transición limpia a la demo que Pablo conduce.",
    script:
      "[Baja el volumen. Baja el ritmo. Postura relajada]\n\n\"Cuando empecé les dije que estos veinte minutos no eran una advertencia. Eran una invitación.\"\n\n[Pausa larga]\n\n\"La IA en retail dejó de ser diferenciador. Ya es condición de supervivencia — sí. Pero también es, para quien la construya bien, el primer momento en veinte años donde un retailer centroamericano puede volver a competir de igual a igual con cualquiera del mundo. Con una ventaja que muchos no ven: la región misma. Seis mercados, un solo cerebro.\"\n\n<b>Callback a Sara y última frase:</b> \"La ventana está abierta. Sara existe. Y hoy la pueden servir. Ahora, si me permiten treinta segundos para tomar aire — les voy a mostrar en pantalla, en vivo, exactamente cómo se ve todo esto ejecutándose sobre <em>su</em> cliente.\"",
    tips: [
      "Contacto visual con 3 personas antes de la última frase.",
      "El botón 'Descargar la presentación' está visible al final para la audiencia.",
      "No cerrar con 'gracias' — la charla no termina aquí. Termina cuando termine la demo que vas a correr enseguida.",
      "Transición operativa: dejar el deck cerrado y cambiar a la ventana/tab de la demo antes de retomar la palabra.",
    ],
  },
];

const headlessCioMexicoTed: PresenterSlide[] = [
  {
    index: 1,
    title: "Portada · El cerebro invisible",
    timing: "0:00 – 0:20",
    role: "Inspiration",
    goal: "Establecer autoridad y tono en 20 segundos. Que la sala deje de mirar el teléfono y se prepare para una conversación distinta.",
    script:
      "[Antes de hablar, mirar la sala 3 segundos completos]\n\n\"El software que va a decidir la próxima década de sus empresas… no tiene rostro.\"\n\n[Pausa de 2 segundos]\n\n\"En los próximos minutos vamos a hablar de por qué la ventaja competitiva ya no vive en la pantalla. Y de qué significa eso para quien decide arquitectura empresarial en México.\"",
    tips: [
      "No leer el subtítulo. Se lee solo.",
      "No arrancar con 'buenas tardes, gracias por venir'. Eso lo hizo quien te presentó.",
      "El QR queda visible — invita a escanear con: 'y para quienes quieran seguir la presentación desde su teléfono, ahí queda el QR.'",
    ],
  },
  {
    index: 2,
    title: "Escena · La torre de control",
    timing: "0:20 – 1:30",
    role: "Inspiration",
    goal: "Instalar la analogía maestra en 60 segundos. Que la sala visualice el eje conceptual antes de escuchar un solo dato.",
    script:
      "[Bajar el tono, casi contando una historia. Movimiento lento]\n\n\"Piensen en una torre de control de un aeropuerto grande. Ochenta millones de pasajeros al año. Cientos de vuelos por hora.\"\n\n[Pausa]\n\n\"La torre no vuela ningún avión. No embarca a ningún pasajero. No factura una sola maleta. Pero sin la torre… nada aterriza.\"\n\n[Un paso hacia la audiencia]\n\n\"La torre <em>sabe</em>: quién va llegando, qué pista está libre, qué avión tiene prioridad, cuál necesita combustible, cuál trae una emergencia. Coordina. Decide. Y es invisible para el pasajero.\"\n\n<b>El pivote:</b> \"El próximo salto de sus empresas es dejar de comprar 'aviones' — dejar de comprar apps y pantallas — y empezar a construir la torre de control. La capa que sabe, coordina y decide detrás de cada canal donde vive su cliente.\"",
    tips: [
      "La analogía es TODO el hilo conductor. Repítela literal en los slides 4, 9 y 15.",
      "No mencionar Heathrow todavía — se cita en el slide de casos como el 'cierre' de la analogía.",
      "Si la sala tiene muchos ejecutivos de manufactura/logística/aeronáutica, subraya 'coordina, no vuela'.",
    ],
  },
  {
    index: 3,
    title: "El estándar se movió",
    timing: "1:30 – 3:30",
    role: "Information",
    goal: "Fijar el marco global con fuentes primarias. La audiencia deja de dudar si 'esto está pasando' y entra al modo receptivo.",
    script:
      "[Tono ejecutivo, casi de brief. Sin adornos]\n\n\"Gartner encuestó a dos mil quinientos directores de tecnología con doscientos setenta y cuatro mil millones de dólares de gasto en TI. El resultado del CIO Agenda 2026: <em>noventa y cuatro por ciento</em> esperan cambios mayores a sus planes en los próximos veinticuatro meses.\"\n\n[Pausa]\n\n\"McKinsey — su reporte State of AI de este año — confirma la otra cara: ochenta y ocho por ciento de las organizaciones ya usa IA de forma regular. Pero <em>solo seis por ciento</em> se considera 'AI high performer'. El resto experimenta. Pilotea. Y no escala.\"\n\n<b>El punchline:</b> \"La conversación ya no es 'adoptar IA o no'. Es <em>por qué la mayoría no logra escalarla</em>. Y esa respuesta no está en el modelo — está en la arquitectura de abajo.\"",
    tips: [
      "Cita literal recomendada — mientras aparece en pantalla — de McKinsey: 'Systems are no longer organized around screens and forms but around machine-readable interfaces, autonomous workflows, and agent-led decision flows.' Léela pausado.",
      "Es la única cita literal en inglés. Léela con ritmo, luego tradúcela: 'los sistemas dejaron de organizarse alrededor de pantallas y formularios; giran alrededor de interfaces legibles por máquina.'",
      "Si preguntan la fuente exacta: 'Seizing the Agentic AI Advantage, McKinsey, junio 2025.'",
    ],
  },
  {
    index: 4,
    title: "La otra cara · El 40% que se cancela",
    timing: "3:30 – 5:00",
    role: "Information",
    goal: "Instalar humildad. Preventivamente desactivar el escepticismo del CIO — reconocer que la mayoría de proyectos fracasa, y decir por qué.",
    script:
      "[Cambio de tono: más franco, casi confesional]\n\n\"Aquí es donde me toca decir la parte incómoda. Gartner también publicó — en junio del año pasado — que <em>más del cuarenta por ciento</em> de los proyectos de IA agentic van a ser cancelados antes del cierre de 2027.\"\n\n[Pausa larga]\n\n\"Y quiero leer una frase textual de Anushree Verma, la analista responsable de esa predicción: 'La mayoría de las propuestas de IA agentic <em>carece</em> de valor significativo o de retorno de inversión.' Palabras de Gartner. No mías.\"\n\n<b>El giro:</b> \"El error no es adoptar IA. Es adoptarla sin arquitectura debajo. Sin fundación de datos. Sin gobernanza. Sin métrica dura desde el día uno. Y ese es el marco que quiero proponerles hoy — la torre de control, no los aviones.\"",
    tips: [
      "Reconocer la crítica sube credibilidad. No la ocultes — apoderátela.",
      "'La torre de control, no los aviones' — repítela. Es el callback #1 al slide 2.",
      "Si preguntan por 'agent washing', respuesta corta: 'exactamente por eso hablamos de arquitectura, no de agentes sueltos'.",
    ],
  },
  {
    index: 5,
    title: "México · El terreno donde caemos",
    timing: "5:00 – 7:00",
    role: "Information",
    goal: "Aterrizar. Dejar de hablar del mundo y empezar a hablar de la casa. La audiencia debe sentir que las cifras son suyas.",
    script:
      "\"México no es un mercado atrasado en tecnología empresarial. Es un mercado con reglas propias.\"\n\n[Pausa. Postura firme]\n\n\"Ciento cuatro punto nueve millones de internautas. Noventa y siete punto dos por ciento con smartphone. Noventa punto seis por ciento usa apps de mensajería como canal principal. Fuente: INEGI, ENDUTIH del año pasado.\"\n\n[Un paso hacia la audiencia]\n\n\"Sesenta y cinco por ciento de las organizaciones mexicanas alcanzó adopción sistemática de IA en 2025 según IDC. Pero <em>solo cuarenta y cuatro por ciento</em> reporta alto impacto — Select, mayo de este año. Es la <em>misma brecha</em> global. Y probablemente es la brecha que muchos de ustedes viven en su propia organización.\"\n\n<b>Cierre:</b> \"La pregunta ya no es si su cliente está listo para hablar por WhatsApp con su empresa. Es si su arquitectura está lista para <em>contestarle</em>.\"",
    tips: [
      "88.2% vs 90.6%: usar el 90.6% (INEGI ENDUTIH 2025, publicado junio 2026). Es el más reciente y verificable.",
      "NO decir 'México top 3 mundial en WhatsApp'. Está en top 5–6. Si quieres cifra: '~77M usuarios activos'.",
      "Si preguntan por el sucesor del INAI: 'Sus funciones migraron a un órgano bajo la Secretaría Anticorrupción — obligaciones vigentes, gobierno reconfigurándose.' No entres al debate político.",
    ],
  },
  {
    index: 6,
    title: "El nombre correcto · Nomenclatura oficial",
    timing: "7:00 – 9:00",
    role: "Information",
    goal: "Aterrizar la charla al lenguaje técnico oficial. Que el CIO se lleve el vocabulario preciso para su próxima reunión de arquitectura.",
    script:
      "[Cambio de tono: más didáctico, casi de arquitecto]\n\n\"Antes de seguir, permítanme fijar el vocabulario. Porque si compran 'algo headless' sin saber a qué se refiere Salesforce oficialmente, se van a exponer a ambigüedad contractual.\"\n\n[Con calma, señalando la tabla en pantalla]\n\n\"Uno: <em>Agent API</em>. Es el endpoint oficial. La documentación pública lo dice literal: 'headless agents to automate functionality without UI constraints'. Es la puerta que permite invocar el razonamiento de Agentforce desde <em>cualquier</em> canal — web, mobile, Slack, voz, un agente de otro proveedor.\"\n\n\"Dos: <em>MCP Servers hosted</em>. En general availability desde abril de este año. Cita textual de la documentación: 'un endpoint gestionado por Salesforce que expone la lógica y los activos de su organización — datos, flows, acciones Apex, queries'. Autenticación OAuth con PKCE. Cada transacción corre <em>como el usuario autenticado</em>, sin cuentas de servicio anónimas.\"\n\n\"Tres: <em>MuleSoft Agent Fabric</em>. La capa de gobernanza cuando su ecosistema tiene múltiples agentes.\"\n\n<b>La analogía de cierre:</b> \"Agent API es el idioma que hablan los canales con el cerebro. MCP es el idioma que habla el cerebro con los sistemas. MuleSoft Agent Fabric es la torre que los ordena a todos.\"",
    tips: [
      "El detalle técnico es intencional — para un CIO, precisión de nomenclatura = confianza en el proveedor.",
      "Si algún asistente no técnico se pierde, cerrar con la analogía y seguir. Los que necesitan el detalle lo agradecerán.",
      "GA de MCP Servers hosted: abril 2026. Fecha exacta si preguntan: 29 de abril de 2026.",
    ],
  },
  {
    index: 7,
    title: "Los 6 casos · Evidencia pública",
    timing: "9:00 – 12:00",
    role: "Information",
    goal: "Quitarle a la audiencia la objeción 'sí, pero eso no ha funcionado a escala'. Seis casos, seis métricas, seis fuentes públicas.",
    script:
      "\"Vamos a mirar seis casos donde esto ya no es teoría. Está en producción, con números publicados, con clientes reales.\"\n\n[Ritmo controlado, dejando que las tarjetas se lean]\n\n\"<b>Heathrow.</b> Ochenta y tres millones de pasajeros al año. Canal principal: WhatsApp. Concierge digital llamado 'Hallie'. Noventa por ciento de los chats se resuelven sin transferencia. Más treinta por ciento de ingreso digital en cuatro años. Peter Burns, su ejecutivo responsable, lo describió como 'un concierge digital que te toma de la mano por todo el aeropuerto'. Palabras textuales.\"\n\n\"<b>Wiley.</b> Editorial académica global. Más cuarenta por ciento de resolución de casos versus el bot anterior. Doscientos trece por ciento de ROI. Doscientos treinta mil dólares de ahorro anual. Onboarding de agentes estacionales cincuenta por ciento más rápido.\"\n\n\"<b>OpenTable.</b> Setenta y tres por ciento de resolución <em>en tres semanas</em> post-lanzamiento. Once mil conversaciones a la semana.\"\n\n\"<b>LY Corporation — Yahoo! Japón.</b> Ochenta por ciento de FAQs resueltos por Agentforce. El usuario nunca ve Salesforce. Ve Yahoo. Ése es el punto arquitectónico exacto.\"\n\n\"<b>Pandora.</b> Cuarenta y cinco mil conversaciones al mes. Sesenta por ciento resueltas sin humano. Diez puntos NPS arriba.\"\n\n[Cambio de tono — más cercano]\n\n\"Y el que quiero cerrar es mexicano. <b>Grupo Posadas.</b> Doscientos hoteles. Agentforce con WhatsApp y SMS como concierge digital. Quince puntos NPS acumulados. Diez puntos sobre benchmark. Leslie Gómez, su responsable, lo dijo así: 'Al integrar toda esta información a través de Agentforce, logramos construir una visión integral de cada huésped.' Aquí. En México. En producción.\"",
    tips: [
      "Pandora, Wiley, Heathrow y OpenTable son casos globales. Grupo Posadas es la referencia local — remátalo con orgullo.",
      "NO citar Home Depot ni Williams-Sonoma como casos headless commerce Salesforce — no lo son públicamente.",
      "Si alguien pregunta por métricas independientes: 'Todas estas cifras las publican las propias compañías o Salesforce con fuente rastreable. HFS Research las cataloga como vendor-reported — es honesto reconocerlo. La decisión no se toma sobre logos, se toma sobre patrón arquitectónico.'",
      "El patrón común es LO IMPORTANTE — no los logos. Deletréalo: 'el cliente nunca ve Salesforce. Ve el aeropuerto, el hotel, la joyería. Detrás — invisible — está la torre.'",
    ],
  },
  {
    index: 8,
    title: "Reconocer la crítica · HFS Research",
    timing: "12:00 – 12:45",
    role: "Information",
    goal: "Instalar honestidad consultiva. Reconocer proactivamente el contraargumento antes de que la audiencia lo tenga en la cabeza.",
    script:
      "[Tono más serio, mirar a los ojos]\n\n\"Antes de seguir. Todas las métricas que acaban de ver son publicadas por las propias compañías, o por Salesforce con fuente rastreable. HFS Research — un analista independiente serio — lo señala públicamente: son <em>vendor-reported</em>, no auditadas por tercero.\"\n\n[Pausa]\n\n\"Lo reconozco porque es cierto. Y porque la decisión que ustedes toman no se debería tomar sobre logos. Se toma sobre el <em>patrón arquitectónico</em>. Y ese patrón es reproducible: canal donde vive el cliente, agente que razona, datos gobernados, procesos auditables. Cada pieza es verificable en su propia realidad.\"",
    tips: [
      "Esta es la slide 'de credibilidad'. Es corta a propósito. No te extiendas — el reconocimiento vale por sí solo.",
      "Si alguien del comité pregunta por benchmarks independientes: 'Forrester Wave, Gartner Magic Quadrant y HFS son las tres referencias. Y todas coinciden en la <em>categoría</em>, aunque discutan el ranking.'",
    ],
  },
  {
    index: 9,
    title: "Los tres takeaways · El marco de decisión",
    timing: "12:45 – 15:00",
    role: "Information",
    goal: "Entregar el marco de decisión en tres frases. Que el CIO se las lleve y las use en su comité el lunes.",
    script:
      "[Postura firme, tono de conclusión]\n\n\"Si de estos minutos solo se llevan tres frases… que sean estas.\"\n\n[Pausa. Dejar que la primera tarjeta respire]\n\n\"<b>Uno. El CRM ya no es una app. Es una API con juicio.</b> El valor dejó la pantalla y se mudó al modelo de datos gobernado, la lógica auditable y el contexto que se entrega por API a cualquier canal. La métrica que traigan al consejo se llama <em>cost-per-channel-added</em>: cuánto cuesta habilitar un canal nuevo. Bajarla de meses y millones a semanas y decenas de miles. Ése es el mensaje al consejo.\"\n\n[Pausa]\n\n\"<b>Dos. Un agente sin gobernanza no es innovación. Es pasivo contingente.</b> Cada agente debe poder mostrar a auditoría <em>quién</em> lo autorizó, <em>qué</em> datos tocó, <em>qué</em> acción ejecutó. Sin ese trazo, es un empleado sin contrato. Trust Layer, Command Center, Data 360: el equivalente de SOX para agentes. IDC lo dice: hasta veinte por ciento de organizaciones globales van a enfrentar multas o despidos de CIOs por mala gobernanza de agentes para 2030.\"\n\n[Pausa]\n\n\"<b>Tres. La ventaja no es tener el dato. Es tener el dato listo para razonar.</b> El dato ya vive en su SAP, en su Oracle, en su mainframe, en su WMS. Lo que le falta es una capa que lo sirva a cualquier canal con latencia sub-segundo y derechos aplicados por registro. Data 360 con Zero Copy resuelve exactamente eso: el dato puede quedarse en su Snowflake, en su BigQuery, en su Databricks, en AWS — y Salesforce lo consulta sin duplicarlo.\"",
    tips: [
      "Léelas pausado. Deja 3 segundos entre frases.",
      "Si el consejo es mayoritariamente CFO/CIO técnico → énfasis en #2 (gobernanza).",
      "Si es mayoritariamente comercial/CMO → énfasis en #1 (cost-per-channel-added).",
      "Si es un CIO con inversión legacy grande (SAP/Oracle) → énfasis en #3 (Zero Copy no duplica).",
    ],
  },
  {
    index: 10,
    title: "Las cinco objeciones del lunes",
    timing: "15:00 – 17:30",
    role: "Information",
    goal: "Preparar al CIO para el comité del lunes. Cinco preguntas que le van a hacer y las cinco respuestas consultivas.",
    script:
      "\"En las próximas setenta y dos horas su comité les va a hacer estas cinco preguntas. Este es el guion para responderlas — no defensivo, no vendedor. Consultivo.\"\n\n[Ritmo ejecutivo. Sin dramatismo]\n\n\"<b>Uno: 'Ya invertimos millones en SAP y Oracle, ¿lo tiramos?'</b> Respuesta: al contrario. Su core es la fuente de verdad transaccional. Salesforce Headless 360 no lo reemplaza, lo expone. Zero Copy, MuleSoft, agentes consumiendo esas APIs. El ROI de su core acaba de subir, no de bajar.\"\n\n\"<b>Dos: '¿Cómo confío que un agente no rompa mi core?'</b> Los agentes no ejecutan acciones libremente. Trabajan contra acciones declarativas — flows, Apex, APIs — con parámetros validados y logs por ejecución. Es <em>least-privilege</em> aplicado a razonamiento.\"\n\n\"<b>Tres: '¿Data residency? ¿Soberanía?'</b> Tres capas. Hyperforce elige región. Zero Copy: el dato puede quedarse en su lakehouse. Trust Layer: los prompts no persisten datos del cliente.\"\n\n\"<b>Cuatro: '¿Mi equipo actual se vuelve obsoleto?'</b> Al contrario. Sus admins de Salesforce ya saben construir esto. Un flow es un flow — invocado por humano o agente. Upskill de seis a ocho semanas. En un mercado donde el sesenta y siete por ciento de empresas mexicanas no puede cubrir sus vacantes de TI, su equipo actual es su activo escaso.\"\n\n\"<b>Cinco: '¿ROI defendible en 12 meses?'</b> Sí, con un principio: no empiecen por el caso más sexy — empiecen por el más medible. Servicio L1 en un canal digital de alto volumen. Regla noventa-ciento ochenta-noventa: piloto acotado noventa días, despliegue ciento ochenta, medición dura noventa más.\"",
    tips: [
      "Estas cinco objeciones también están impresas en la guía del presentador — la audiencia se lleva el material.",
      "Objeción bonus si preguntan: '¿Y si mi cliente no usa WhatsApp?' Respuesta: 'noventa punto seis por ciento de internautas mexicanos usa mensajería. La pregunta real es si su operación está lista para recibirlo por ahí.'",
      "NO responder ninguna con 'confía en nosotros'. Cada respuesta debe tener un mecanismo técnico concreto.",
    ],
  },
  {
    index: 11,
    title: "Hoja de ruta · 12 meses",
    timing: "17:30 – 19:00",
    role: "Information",
    goal: "Convertir los mensajes en un plan defendible ante el consejo. Tres trimestres, tres hitos, una métrica visible.",
    script:
      "[Tono operativo]\n\n\"El plan no es de 5 años. Es de 12 meses. Y se defiende trimestre a trimestre.\"\n\n\"<b>Primer semestre — Fundación.</b> Un solo canal. Un solo dominio. Un solo KPI. Servicio L1 sobre canal digital de alto volumen. Data 360 con Zero Copy sobre una fuente ancla. Trust Layer y auditoría desde el día cero. Métrica dura, publicada semanalmente al comité.\"\n\n\"<b>Segundo y tercer trimestre — Escala controlada.</b> Habilitar el segundo canal — WhatsApp, app propia, portal — sobre el <em>mismo</em> agente por Agent API. Cero rewrites. Y aquí es donde publican el número que convence al consejo: el <em>cost-per-channel-added</em> — cuánto costó habilitar el segundo canal versus el primero. Esa curva bajando trimestre a trimestre es el mensaje al inversionista.\"\n\n\"<b>Cuarto trimestre — Interoperabilidad.</b> Si su ecosistema tiene múltiples agentes — de Salesforce y de otros proveedores — es cuando entra MuleSoft Agent Fabric. Registry, discovery, policy, observabilidad. <em>Si solo tienen Salesforce, esperen.</em> No es un patrón que se compre 'por si acaso'.\"",
    tips: [
      "'No es un patrón que se compre por si acaso' — es una frase que credibiliza. Los CIOs escuchan mucho el opuesto.",
      "'Cost-per-channel-added' es la métrica que se lleva el CIO al consejo. Repítela en el cierre del slide 15.",
      "Si preguntan cuánto cuesta la fase 1: 'Depende radicalmente del punto de partida. Un piloto real de 6 meses en México se calibra 5-10% de una implementación completa.'",
    ],
  },
  {
    index: 12,
    title: "Cierre · La ventana",
    timing: "19:00 – 20:30",
    role: "Inspiration",
    goal: "Dejar a la audiencia con una emoción — ilusión, no urgencia. La urgencia ya se instaló en la slide de McKinsey y Gartner. Ahora toca esperanza técnica.",
    script:
      "[Bajar el volumen. Bajar el ritmo. Postura relajada. Contacto visual con 3 personas]\n\n\"Cuando empezamos les propuse imaginar una torre de control.\"\n\n[Pausa larga]\n\n\"El próximo salto no lo van a ganar las empresas que compren más IA. Lo van a ganar las que construyan la torre correcta debajo. La capa de datos gobernados. La lógica auditable. El razonamiento accesible por API. Servido donde ya vive el cliente.\"\n\n[Un paso hacia la audiencia]\n\n\"En México tienen la ventana abierta hoy. En veinticuatro meses, la brecha entre quienes construyeron y quienes esperaron va a ser estructural. No es un cliché — es lo que Gartner, McKinsey e IDC dicen al mismo tiempo, cada uno con su lenguaje.\"\n\n<b>Última frase:</b> \"El software que va a decidir la próxima década no tiene rostro. Tiene juicio. Y hoy, aquí, en esta sala, hay una decisión que se puede tomar: construir la torre — o seguir comprando aviones.\"",
    tips: [
      "Callback perfecto al slide 2: 'la torre de control' y 'construir la torre / comprar aviones' cierran el arco.",
      "Contacto visual con al menos 3 personas antes de la última frase. Los ojos que buscas son los del CIO más silencioso — normalmente el que va a decidir.",
      "Silencio de 3 segundos después de la última frase. Antes del aplauso.",
      "Después del cierre, si hay Q&A, apuntar a que las primeras dos preguntas conecten con las cinco objeciones que ya se cubrieron. Se responde rápido y se pasa a lo nuevo.",
    ],
  },
];

const byInsight: Record<string, PresenterSlide[]> = {
  "retail-ia-mexico-salesforce": retailAiTed,
  "retail-ia-colombia-salesforce": retailAiTedColombia,
  "retail-ia-centroamerica-salesforce": retailAiTedCentroamerica,
  "salesforce-headless-cio-mexico": headlessCioMexicoTed,
};

export function getPresenterNotes(slug: string): PresenterSlide[] | null {
  return byInsight[slug] ?? null;
}
