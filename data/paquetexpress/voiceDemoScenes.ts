// Escenas del guión de la llamada demo del agente de voz de Paquetexpress.
// Se sincronizan con la grabación real del teléfono que se superpone en OBS
// sobre la figura del teléfono de la presentación. Cada escena representa
// un momento cronológico de la llamada — el usuario avanza con flecha
// derecha o clic. El lenguaje está pensado para gerentes de sucursal,
// sin detalle técnico.

export type VoiceDemoIcon =
  | "chat"
  | "person"
  | "doc"
  | "shield"
  | "search"
  | "check"
  | "calendar"
  | "barcode"
  | "hangup";

export type VoiceDemoScene = {
  /** Título del momento — aparece en el timeline y en el detalle */
  title: string;
  /** Etiqueta corta bajo el título */
  subtitle: string;
  /** Descripción larga que aparece en la tarjeta de detalle activa */
  description: string;
  /** Etiquetas que se muestran como chips al pie del detalle */
  tags: string[];
  /** Icono que aparece junto al título en el timeline */
  icon: VoiceDemoIcon;
};

export const paquetexpressVoiceDemoScenes: VoiceDemoScene[] = [
  {
    title: "Saludo",
    subtitle: "Bienvenida al cliente",
    description:
      "El asistente virtual da la bienvenida con una voz clara y con acento mexicano. Desde el primer segundo la llamada se siente natural, como si el cliente hablara con una persona de Paquetexpress.",
    tags: ["Voz con acento mexicano", "Bienvenida natural"],
    icon: "chat",
  },
  {
    title: "Verificación del cliente",
    subtitle: "Nombre y correo · alta automática",
    description:
      "El asistente le pide al cliente su nombre y su correo para saber quién es. Si ya está en los registros, lo reconoce al instante; si es nuevo, lo da de alta automáticamente. Todo pasa sin fricción y sin formularios.",
    tags: ["Captura nombre y correo", "Alta automática si es nuevo"],
    icon: "person",
  },
  {
    title: "Solicitud de recolección",
    subtitle: "El cliente dice qué necesita",
    description:
      "El cliente le dice al asistente lo que necesita — en este caso, agendar una recolección con su guía prepagada. El asistente lo entiende de inmediato y arranca el proceso, sin volver a preguntarle qué quiere hacer.",
    tags: ["Entiende la intención", "Continúa sin repetir preguntas"],
    icon: "doc",
  },
  {
    title: "Política de Aceptación de Mercancía",
    subtitle: "Valida contenido y confirma con el cliente",
    description:
      "El asistente pregunta qué contiene el paquete y verifica que sea una mercancía permitida por Paquetexpress. Antes de continuar, le pide al cliente que confirme que su envío cumple con la política de aceptación.",
    tags: ["Valida el contenido", "Confirma política con el cliente"],
    icon: "shield",
  },
  {
    title: "Consulta de guía",
    subtitle: "Consulta al sistema de guías",
    description:
      "El cliente dicta el número de guía y el asistente lo repite dígito por dígito para asegurarse de haberlo escuchado bien. En segundos consulta el sistema y trae los detalles del envío: contenido, peso y origen.",
    tags: [
      "Lectura dígito por dígito",
      "Consulta al sistema de guías",
      "Trae detalles del envío",
    ],
    icon: "search",
  },
  {
    title: "Confirmación de datos",
    subtitle: "Lectura clara antes de avanzar",
    description:
      "El asistente le lee al cliente los datos que encontró — de forma clara, sin códigos ni tecnicismos — y espera que confirme que todo está correcto antes de agendar la recolección.",
    tags: ["Lectura clara al cliente", "Confirma antes de avanzar"],
    icon: "check",
  },
  {
    title: "Programación de recolección",
    subtitle: "Tres opciones de fecha · el cliente elige",
    description:
      "El asistente le ofrece al cliente tres opciones de fecha y hora para pasar por su paquete. El cliente elige la que le acomoda y esa selección queda registrada al momento.",
    tags: ["Tres opciones de fecha", "El cliente elige la que prefiere"],
    icon: "calendar",
  },
  {
    title: "Número de rastreo",
    subtitle: "Recolección agendada · entrega de folio",
    description:
      "El asistente confirma que la recolección quedó agendada y le entrega al cliente su número de rastreo, leyéndolo despacio para que pueda anotarlo. Pregunta si necesita algo más antes de cerrar.",
    tags: ["Agendamiento confirmado", "Número de rastreo entregado"],
    icon: "barcode",
  },
  {
    title: "Despedida",
    subtitle: "El asistente cierra la llamada",
    description:
      "El asistente se despide con una frase amable y cierra la llamada. La conversación termina con la sensación de un servicio rápido, sin tiempos muertos ni pasos innecesarios.",
    tags: ["Despedida amable", "Cierre sin fricción"],
    icon: "hangup",
  },
];
