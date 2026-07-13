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

const byInsight: Record<string, PresenterSlide[]> = {
  "retail-ia-mexico-salesforce": retailAiTed,
  "retail-ia-colombia-salesforce": retailAiTedColombia,
};

export function getPresenterNotes(slug: string): PresenterSlide[] | null {
  return byInsight[slug] ?? null;
}
