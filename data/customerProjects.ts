import type { CustomerDemo } from "./customerDemos";

export type CustomerProject = CustomerDemo;

export const customerProjects: CustomerProject[] = [
  {
    slug: "pam",
    title: "Paradise Pass Concierge — Agente Agentforce para PAM Hotels",
    customerName: "PAM Hotels",
    industry: "Hospitalidad — All-Inclusive · México, Rep. Dominicana y Jamaica",
    description:
      "Diseño del Concierge Digital de Paradise Pass: un agente Agentforce que actúa como anfitrión 24/7 para el programa de pases vacacionales activables de PAM Hotels (ex-RCD Hotels). Cubre 9 propiedades, 3 idiomas y dos audiencias coexistentes — Paradise Pass (descubrimiento) y Legendary Vacation Club (pertenencia) — sobre una base de Salesforce ya en producción con 2.6M de Accounts, 340K de Contracts y 491K de Cases. La arquitectura de conocimiento combina Custom Retrievers sobre Salesforce Knowledge (artículos curados) y UDMO Files en Data Cloud (documentos ricos para RAG), gobernados con Data Categories ortogonales.",
    logo: "/Customers/PAM/pam-logo.png",
    passcode: "paradise2026",
    hidden: true,
    embeddedMessaging: {
      orgId: "00DO400000YzKHZ",
      deploymentName: "Digital_Concierge",
      siteUrl:
        "https://rcdhotels--fullcopy.sandbox.my.site.com/ESWDigitalConcierge1782316658590",
      scrt2URL: "https://rcdhotels--fullcopy.sandbox.my.salesforce-scrt.com",
      language: "es",
    },
    tags: [
      "Agentforce",
      "Custom Retrievers",
      "Salesforce Knowledge",
      "Data Cloud · UDMO",
      "Data Categories",
      "Service Cloud",
      "Hospitalidad",
      "All-Inclusive",
    ],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        title: "Resumen ejecutivo",
        content:
          "PAM Hotels (antes RCD Hotels, rebranding completado en enero 2026) opera 9 resorts all-inclusive en México, República Dominicana y Jamaica bajo las marcas Hard Rock, UNICO y AVA. Su programa Paradise Pass — pases vacacionales activables con certificado y vencimiento — es la puerta comercial al ecosistema Legendary Vacation Club (LVC). Este plan propone un Concierge Digital construido en Agentforce que resuelve consultas 24/7 sobre el programa, las propiedades, las políticas y la operación, con Custom Retrievers que consultan Salesforce Knowledge (artículos curados, citables, multi-canal) y UDMO Files en Data Cloud (documentos ricos para grounding RAG), gobernados con Data Categories ortogonales y conectados a la org PAM-Sandbox (90 objetos custom, 220 record types).",
        overviewData: {
          stats: [
            { value: "9", label: "Propiedades all-inclusive (México · RD · Jamaica)" },
            { value: "3", label: "Idiomas soportados (ES · EN · PT)" },
            { value: "2", label: "Audiencias diferenciadas (Paradise Pass · LVC)" },
            { value: "5", label: "Custom Retrievers propuestos (KB + UDMO)" },
            { value: "74", label: "Documentos KB clasificados (junio 2026)" },
            { value: "16", label: "Carpetas temáticas en el repositorio actualizado" },
            { value: "1000+", label: "Tipificaciones de Caso en el layout entregado" },
            { value: "2.6M", label: "Person Accounts ya en Salesforce" },
            { value: "36 / 42", label: "KB Articles publicados Online en Sandbox (jul-2026)" },
          ],
        },
      },
      {
        id: "que-es-paradise-pass",
        label: "¿Qué es Paradise Pass?",
        title: "¿Qué es Paradise Pass y cómo funciona?",
        content:
          "Paradise Pass es un pase activable de viaje all-inclusive — no un vacation club tradicional ni una suscripción mensual. El cliente compra un certificado por adelantado, recibe beneficios concretos (Member's Bracelet, Resort Credits, acceso a eventos por invitación) y dispone de un plazo definido para activar su estancia en una de las 9 propiedades del portafolio. Internamente PAM lo describe como 'la puerta de entrada al ecosistema Legendary' — la antesala comercial al programa de membresía Legendary Vacation Club (LVC).",
        narrativeData: {
          quote:
            "Paradise Pass representa la puerta de entrada al ecosistema Legendary. Es una experiencia diseñada para inspirar, generar confianza y permitir que los viajeros descubran nuevas posibilidades.",
          pillars: [
            {
              title: "Es un certificado con vencimiento — no un club",
              description:
                "El cliente compra un Paradise Pass de 4/5 o 7/8 noches que se activa mediante un certificado con fecha de expiración. Si la compra se completa dentro de los primeros 3 meses, recibe el bonus 'An Extra Dose of Paradise'. La mecánica está pensada para crear urgencia comercial sin atar al cliente a una membresía de largo plazo.",
            },
            {
              title: "Beneficios tangibles desde el check-in",
              description:
                "Cada huésped recibe el Member's Bracelet que lo identifica en el resort, Resort Credits canjeables en spa/wellness, aventuras al aire libre y belleza/styling, y acceso a eventos por invitación. El evento estrella de 2026 es Legends of Paradise (AVA Resort Cancún, 6–13 de diciembre), reservado para portadores activos del pase.",
            },
            {
              title: "9 propiedades, 3 marcas, 3 segmentos",
              description:
                "El pase permite escoger entre Hard Rock (familiar), UNICO 20°87°/20°105° (solo adultos 18+) y AVA Resort (ultra-lujo familiar). El cliente decide a qué propiedad se va al momento de activar — la conversación del concierge debe ayudarlo a elegir según con quién viaja, qué busca y la temporada.",
            },
            {
              title: "Es la antesala de Legendary Vacation Club",
              description:
                "Quien vive bien la experiencia Paradise Pass es candidato natural a subir al programa de membresía LVC, con tiers Deluxe → VIP → Hall of Fame → Chairman y mecánicas de Legend Coins. El bot debe distinguir audiencias: a un poseedor de Paradise Pass no se le habla de tiers ni Legend Coins (info LVC-only), pero sí se le presenta el camino de ascenso cuando aplica.",
            },
          ],
          closing:
            "Paradise Pass es producto de discovery y activación; LVC es producto de pertenencia. Un buen Concierge Digital no confunde audiencias — habla con cada cliente solo del producto que efectivamente posee.",
        },
      },
      {
        id: "ventajas",
        label: "Ventajas",
        title: "Ventajas principales para el cliente",
        content:
          "Las ventajas que mejor venden Paradise Pass — extraídas del sitio público, los materiales internos del KB y los puntos que más se repiten en consultas reales al call center.",
        solution: [
          {
            product: "Acceso premium sin compromiso de largo plazo",
            focus: "Por qué la gente lo compra",
            color: "indigo",
            items: [
              "Un solo pago da derecho a 4/5 o 7/8 noches all-inclusive en resorts top de Cancún, Riviera Maya, Vallarta, Los Cabos, Punta Cana o Riviera Nayarit",
              "No es una membresía con cuotas anuales: se compra, se activa y se disfruta",
              "Bonus 'An Extra Dose of Paradise' si la compra se completa en los primeros 3 meses",
              "Flexibilidad de elegir la propiedad al momento de activar — no se compromete a una sola desde el día uno",
              "Posibilidad de regalar el pase: ideal para aniversarios, bodas, graduaciones",
            ],
          },
          {
            product: "Beneficios tangibles en propiedad",
            focus: "Lo que el huésped recibe al llegar",
            color: "violet",
            items: [
              "Member's Bracelet exclusivo — identifica al huésped como portador del pase y desbloquea acceso a zonas y experiencias",
              "Resort Credits canjeables en spa/wellness, aventuras al aire libre y belleza/styling — no son 'puntos virtuales', son crédito real en el resort",
              "Eventos por invitación: Legends of Paradise (AVA Cancún, 6–13 dic 2026), Summer Like Heaven, Camp Rockaway, Superbia Summer",
              "Programa 'Kids Stay FREE' para familias que viajan con menores",
              "Hasta $996 USD de ahorro adicional en propiedades UNICO (solo adultos)",
            ],
          },
          {
            product: "Portafolio diverso bajo un solo pase",
            focus: "Para quién es cada propiedad",
            color: "sky",
            items: [
              "Familiar — Hard Rock Hotel Cancún · Riviera Maya · Vallarta · Los Cabos · Punta Cana (incluye Casino 18+)",
              "Solo adultos 18+ — UNICO 20°87° Riviera Maya · UNICO 20°105° Riviera Nayarit",
              "Ultra-lujo familiar — AVA Resort Cancun (sede del evento Legends of Paradise 2026)",
              "Hard Rock Riviera Maya combina ambos perfiles: zona Hacienda (familiar) + zona Heaven 18+",
              "Posibilidad de combinar estancias o trasladarse entre propiedades del grupo en un mismo viaje",
            ],
          },
          {
            product: "Trayectoria de marca y respaldo operativo",
            focus: "Por qué se confía en el producto",
            color: "indigo",
            items: [
              "PAM Hotels (ex-RCD) opera el portafolio desde hace más de 4 décadas — rebranding cerrado en enero 2026",
              "Entidad legal responsable: Solaya Hospitality Management Group, S. de R.L. de C.V. (Cancún)",
              "Programa de transportación oficial 'ON TOUR' con tarifas publicadas y cancelación gratuita 24h antes",
              "Política ECPAT activa en todas las propiedades (protección de menores) y políticas de mascotas claras",
              "Camino de continuidad hacia Legendary Vacation Club para quien quiera profundizar su relación con la marca",
            ],
          },
        ],
      },
      {
        id: "voz-del-cliente",
        label: "Voz del cliente",
        title: "Qué dicen los clientes — temas más frecuentes",
        content:
          "Los temas que el call center y el portal de socios reportan con mayor frecuencia, agrupados por intent. Esta es la materia prima del Concierge Digital: lo que los huéspedes realmente preguntan, sin filtrar.",
        contextData: {
          groups: [
            {
              name: "Lo que más preguntan los huéspedes Paradise Pass (descubrimiento y activación)",
              findings: [
                "¿Qué es exactamente Paradise Pass? ¿Es lo mismo que una membresía vacacional? — La principal duda al primer contacto",
                "¿Cuándo expira mi certificado y cómo lo activo antes de que venza? — Ansiedad alta por la fecha de vencimiento del pase",
                "¿En qué propiedad lo uso? ¿Cuál me conviene si viajo con niños / en pareja / solo adultos? — Necesitan ayuda para elegir entre las 9 propiedades",
                "¿En qué se canjean los Resort Credits y cuántos tengo disponibles? — Hay confusión entre Resort Credits (Paradise Pass) y Legend Coins (LVC)",
                "¿Qué incluye 'Kids Stay FREE'? ¿Aplica a mi propiedad y fechas? — Familias preguntan condiciones específicas",
                "¿Cómo entro al evento Legends of Paradise en AVA Cancún? ¿Tengo invitación automática? — Tema estrella de 2026",
              ],
            },
            {
              name: "Lo que más preguntan los socios LVC (pertenencia y operación)",
              findings: [
                "Saldo actualizado de Legend Coins y movimientos del último mes — Consulta operativa #1 del portal de socios",
                "Qué beneficios desbloquea cada tier (Deluxe → VIP → Hall of Fame → Chairman) y cómo subir de nivel",
                "Reglas del programa de referidos: cuántas noches gano con cada amigo presentado, qué bonus extra hay si compra Deluxe/VIP",
                "Reservaciones, fees de cambio (10 USD), descuentos de grupo (10+ reservas) y políticas de cancelación escalonadas (600–1,500 USD según antelación)",
                "Reserva de restaurantes a la carta, dress codes y acceso a zonas Heaven / Rock Royalty / Diamond",
                "Pagos mensuales, anualidades, cuotas administrativas — temas que tocan el stack financiero (PagoMes → Movimiento → Transacciones)",
              ],
            },
            {
              name: "Temas operativos transversales (aplican a ambas audiencias)",
              findings: [
                "Traslados aeropuerto-hotel: tarifas privadas vs compartidas, ON TOUR 2026, cancelación gratuita 24h antes",
                "Sillas infantiles, equipaje extra, asistencia especial — preguntas previas al viaje",
                "Información de habitación: layout, vista, amenidades, diferencias entre tipologías",
                "Dress codes, edades mínimas en zonas adults-only, política de mascotas, protocolo ECPAT",
                "¿Qué es 'RCD Hotels' que aparece en mis documentos antiguos? — Confusión por el rebranding a PAM",
                "Cuando algo es complejo: 'quiero hablar con una persona' — el agente debe escalar a humano sin fricción",
              ],
            },
          ],
        },
      },
      {
        id: "data-model",
        label: "Datos en Salesforce",
        title: "Qué encuentra el agente en el Salesforce de PAM",
        content:
          "El Concierge no opera en el vacío: se conecta directo a la org PAM-Sandbox, donde ya vive el cliente, el contrato, el pase y la operación financiera. Snapshot del modelo de datos relevante para grounding del agente.",
        customerProfile: {
          stats: [
            { label: "Org", value: "PAM-Sandbox (00DO400000YzKHZMA3)" },
            { label: "Objetos custom", value: "90 (no managed) + ~69 de paquetes" },
            { label: "Record Types activos", value: "220" },
            { label: "Person Accounts", value: "2.6M (huéspedes y socios)" },
            { label: "Contracts", value: "340K (5 RTs incluyendo Paradise Pass)" },
            { label: "Cases", value: "491K (29 RTs · 1 dedicado a Paradise Pass)" },
            { label: "Reservation__c", value: "761K (hub más conectado, ~40 lookups)" },
            { label: "Movimiento__c", value: "4.4M (stack financiero de 4 niveles)" },
            { label: "CTI / Telefonía", value: "Amazon Connect (paquete managed)" },
            { label: "Firma digital", value: "DocuSign (dfsle__*)" },
            { label: "Marketing", value: "Marketing Cloud Connect (et4ae5__*)" },
          ],
          segments: [
            {
              name: "Stack comercial (Sales Cloud nativo)",
              description:
                "Opportunity (266K, 9 RTs — incluyendo VCL - Paradise Pass y VCL - CC Paradise Pass) → Contract (340K, 5 RTs) → Benefit__c (374K, 18 RTs: Certificate, Day Pass, Golf Rounds, Legendary Week, Yachtvibes, Pack 3 Nights, MoveIn). Es el camino comercial estándar Lead → Oportunidad → Contrato → Beneficios.",
            },
            {
              name: "Stack operativo RCD (paralelo)",
              description:
                "RCD_Account_Contracts__c (759K) → RCD_Contract__c (248K) → RCD_Membership__c (181K) / RCD_Certificate__c (278K). Convive con el stack comercial — antes de que el agente actualice algo, debe confirmar cuál es source-of-truth para ese caso de uso (riesgo crítico documentado).",
            },
            {
              name: "Catálogo universal — Catalog__c",
              description:
                "16K registros con 36 record types (Rate codes, Market/Source Code, Package, Season, Room type, Properties, Annual Fee). Es el diccionario que todos los dominios referencian: cambiar algo aquí impacta múltiples áreas. El agente lo consulta constantemente para responder sobre habitaciones, temporadas y propiedades.",
            },
            {
              name: "Reservaciones — el hub más conectado",
              description:
                "Reservation__c (761K) tiene ~40 lookups: Account×6 roles, Contract, Opportunity, Benefit, PagoMes, Movimiento, Case, Invitation, Catalog×8, VCL_Room_type, autoref. Es la entidad que más toca el agente cuando un huésped pregunta por su estancia.",
            },
            {
              name: "Stack financiero (4 niveles + wallet)",
              description:
                "PagoMes__c (971K, 11 RTs) → Movimiento__c (4.4M, 12 RTs) → TransaccionesMovimientos__c (2.3M, 12 RTs) → TransaccionLog__c (140K). En paralelo: VCL_Wallet__c (3K) + VCL_Abono__c (725K). El agente consulta este stack para responder dudas de pagos, saldos y cargos.",
            },
            {
              name: "Service (Call Center) — 29 record types",
              description:
                "Case con RTs específicos para el caso de uso: 'Paradise Pass', 'VCL - Paradise Pass Customer', 'VCL - PPASS CC', 'VCL - Refunds and Disputes', 'VCL - Reservación'. Cuando el Concierge escala a humano, abre el caso con el RT correcto según la audiencia y el motivo.",
            },
          ],
          techStack: [
            { category: "Plataforma", tool: "Salesforce (Sales + Service Cloud · Person Accounts ON)" },
            { category: "CTI", tool: "Amazon Connect (amazonconnect__*)" },
            { category: "Firma", tool: "DocuSign (dfsle__*)" },
            { category: "Marketing", tool: "Marketing Cloud Connect (et4ae5__*)" },
            { category: "Mascarado", tool: "Salesforce Data Mask (sandbox)" },
            { category: "Portal LVC", tool: "legendary.myaccountinquiry.com" },
            { category: "Sitio Paradise Pass", tool: "paradisepass.com (ES/EN)" },
            { category: "Sitio corporativo", tool: "pamhotels.com (rcdhotels.com → 301)" },
          ],
        },
      },
      {
        id: "concierge",
        label: "Concierge Agentforce",
        title: "Diseño del Concierge Digital Paradise Pass",
        content:
          "Un agente Agentforce que combina personalidad de marca (system prompt), Custom Retrievers sobre dos backends complementarios (Salesforce Knowledge + UDMO Files en Data Cloud) y acceso directo a la org PAM para responder con contexto real del cliente.",
        objective: {
          headline:
            "Diseñar un Concierge Digital que reconozca audiencia (Paradise Pass vs LVC), idioma (ES/EN/PT) y propiedad, responda con grounding en Knowledge curado + RAG sobre documentos ricos, y escale a humano sin fricción cuando la situación lo amerita.",
          okrs: [
            {
              label: "Reconocer audiencia y idioma",
              description:
                "El agente identifica al huésped (Person Account, contrato activo, certificado vigente) antes de citar términos como 'Legend Coins' o 'tier Chairman'. Aplica Data Category audience = paradise_pass | lvc | both y filtra por Language en cada Custom Retriever (ES/EN/PT).",
              enabler: "Agentforce Topics + Person Account lookup + Data Cloud Identity Resolution",
              color: "indigo",
            },
            {
              label: "Custom Retrievers híbridos (KB + UDMO)",
              description:
                "5 retrievers especializados por intent. Cada uno define su backend (Salesforce Knowledge para contenido citable, UDMO Files en Data Cloud para PDFs ricos), su query híbrido (semantic + keyword + Data Categories), su threshold y su política de fallback. El BrandVoice queda fuera del retriever — vive en el system prompt.",
              enabler: "Agentforce Custom Retriever (Apex/Flow) + Knowledge filtros DataCategory + Data Cloud Vector Index",
              color: "violet",
            },
            {
              label: "Escalamiento humano sin fricción",
              description:
                "Cuando se detecta intent emocional, reclamación compleja, validación manual (cambio de propietario, certificado perdido, fraude materializado) o solicitud explícita, el agente abre Case con la tipificación correcta del layout entregado (1000+ entradas: SOLICITUD/INCIDENTE/REQUERIMIENTO → Categoría → Subcategoría → Elemento) y rutea a la cola Omni-Channel acordada.",
              enabler: "Service Cloud Omni-Channel + Amazon Connect + Einstein Sentiment + matriz Impacto/Urgencia",
              color: "sky",
            },
          ],
        },
        contextData: {
          groups: [
            {
              name: "Una fuente de verdad · cuatro canales",
              findings: [
                "AI — Agentforce (canal prioritario) · el Concierge Digital responde 24/7 con citaciones verificables al KB Article o al UDMO File",
                "Member — Portal LVC · socio autenticado consulta beneficios, políticas y guías paso a paso filtradas por su tier (Deluxe · VIP · Hall of Fame · Chairman)",
                "Internal — Service Console · ejecutivos del Contact Center y Reservaciones consultan e insertan artículos en respuestas a Casos (Article Attach + Deflect)",
                "Public — Web pública · FAQs no sensibles publicadas para SEO y consulta libre, sin autenticación",
                "Cuando se actualiza la fuente (KB Article o UDMO File), los 4 canales se benefician al instante — no hay copias en Confluence, PDFs sueltos o docs de Google que se desincronicen",
                "El AI consume del mismo repositorio que los humanos — cero divergencia semántica entre lo que dice el bot y lo que dice el ejecutivo del Contact Center",
              ],
            },
          ],
        },
      },
      {
        id: "data-libraries",
        label: "Custom Retrievers",
        title: "Arquitectura de conocimiento — 5 Custom Retrievers",
        content:
          "Cambio de paradigma respecto a la propuesta inicial: el Concierge NO usa Agentforce Data Libraries. Se diseñan 5 Custom Retrievers especializados por intent, cada uno conectado al backend que mejor sirva a su contenido — Salesforce Knowledge (artículos curados, citables, versionados, reutilizables por agentes humanos) o UDMO Files en Data Cloud (documentos ricos en formato original, ideales para RAG). El BrandVoice queda fuera del retriever — vive en el system prompt. La gobernanza se hace con 4 Data Categories ortogonales (Audience · Topic · Property · Lifecycle).",
        customRetrieverData: {
          intro:
            "Cada tarjeta lista los KB Articles que el retriever consume, el backend donde viven y los filtros exactos que se aplican en la query. Los IDs de artículo son los que se usarán al crearlos en Salesforce Knowledge (ver tab KB Articles).",
          retrievers: [
            {
              id: "R1",
              order: 1,
              name: "KB-Policies",
              backend: "Salesforce Knowledge",
              tone: "indigo",
              intent: "Reglas oficiales citables (cancelación, huracán, ECPAT, mascotas)",
              description:
                "Cada política es un KB Article con Data Categories audience + topic=Policies_and_Rules + property + lifecycle. Cita textual con approver + last_reviewed_date visible en el chunk devuelto.",
              threshold: "KB confidence ≥ 0.60",
              fallback: "Si sin match: clarification turn; si repite: handoff Customer Service",
              articles: [
                { articleId: "KA-POL-001", title: "Política de Cancelación · Fechas Regulares", recordType: "Policy" },
                { articleId: "KA-POL-002", title: "Política de Cancelación · Fechas Especiales", recordType: "Policy" },
                { articleId: "KA-POL-003", title: "Política de No-Show", recordType: "Policy" },
                { articleId: "KA-POL-004", title: "Política de Cambios", recordType: "Policy" },
                { articleId: "KA-POL-005", title: "Política de Hold en Propiedad", recordType: "Policy" },
                { articleId: "KA-POL-006", title: "Protocolo Huracán y Clima Crítico", recordType: "Policy" },
                { articleId: "KA-POL-007", title: "Protocolo ECPAT · Protección de Menores", recordType: "Policy" },
                { articleId: "KA-POL-008", title: "Política de Mascotas por Propiedad", recordType: "Policy" },
              ],
              filters: [
                "DataCategoryGroup.Topic = 'Policies_and_Rules'",
                "DataCategoryGroup.Audience IN ($user.audience, 'ALL')",
                "DataCategoryGroup.Property IN ($session.property, 'All_Properties')",
                "FWD_Lifecycle__c IN ('Active', 'Seasonal')",
                "Language = $user.locale (fallback: 'es')",
                "Channel INCLUDES 'Agentforce'",
              ],
            },
            {
              id: "R2",
              order: 2,
              name: "KB-Programs-FAQs",
              backend: "Salesforce Knowledge",
              tone: "violet",
              intent: "Mecánica del pase, referidos y matriz Q/A normalizada",
              description:
                "Combina Benefit & Program (mecánica) + FAQ (Q/A atómica) + How-To (guías paso a paso). Un artículo = una Q/A. Ranking prioriza FAQ cuando la query es interrogativa; Program cuando es exploratoria.",
              threshold: "KB confidence ≥ 0.55 · si FAQ match ≥ 0.70 usar solo FAQ",
              fallback: "Si sin match: sugerir tópicos relacionados; ofrecer handoff comercial",
              articles: [
                { articleId: "KA-BEN-001", title: "Paradise Pass · Cómo Funciona", recordType: "Benefit & Program" },
                { articleId: "KA-BEN-002", title: "Beneficios Paradise Pass · Member's Bracelet & Resort Credits", recordType: "Benefit & Program" },
                { articleId: "KA-BEN-003", title: "Programa de Referidos Paradise Pass · $100 USD × 5", recordType: "Benefit & Program" },
                { articleId: "KA-BEN-004", title: "Legends of Paradise 2026 · Evento AVA Cancún", recordType: "Benefit & Program" },
                { articleId: "KA-FAQ-001", title: "Créditos del club en el Casino de HRPC", recordType: "FAQ" },
                { articleId: "KA-FAQ-002", title: "UNICO · Restricción de edad (solo adultos 18+)", recordType: "FAQ" },
                { articleId: "KA-FAQ-003", title: "HRRM · Heaven es exclusivamente adultos 18+", recordType: "FAQ" },
                { articleId: "KA-FAQ-004", title: "AVA · Concepto familiar de ultra-lujo con áreas segmentadas", recordType: "FAQ" },
                { articleId: "KA-FAQ-005", title: "Códigos de vestimenta en restaurantes de especialidad", recordType: "FAQ" },
                { articleId: "KA-FAQ-006", title: "Cómo reservo cenas de especialidad en el hotel", recordType: "FAQ" },
                { articleId: "KA-FAQ-007", title: "Room service disponible 24/7", recordType: "FAQ" },
                { articleId: "KA-FAQ-008", title: "Uso de Legend Coins con service fee en Spa y Woodward", recordType: "FAQ" },
                { articleId: "KA-FAQ-009", title: "UNICO · Esquema Unlimited Inclusions con 25% service fee", recordType: "FAQ" },
                { articleId: "KA-FAQ-010", title: "Traslado aeropuerto — cortesía vs tarifa preferencial por tier", recordType: "FAQ" },
                { articleId: "KA-HOW-001", title: "Cómo Consultar mi Estado de Cuenta por Email", recordType: "How-To / Self-Service" },
                { articleId: "KA-HOW-002", title: "Cómo Actualizar mis Datos Personales", recordType: "How-To / Self-Service" },
                { articleId: "KA-HOW-003", title: "Cómo Solicitar Cambio de Propietario", recordType: "How-To / Self-Service" },
                { articleId: "KA-HOW-004", title: "Cómo Agregar un Nuevo Propietario", recordType: "How-To / Self-Service" },
                { articleId: "KA-HOW-005", title: "Cómo Solicitar Remoción de Propietario", recordType: "How-To / Self-Service" },
                { articleId: "KA-HOW-006", title: "Cómo Modificar Beneficiarios", recordType: "How-To / Self-Service" },
                { articleId: "KA-HOW-007", title: "Cómo Reportar Remoción por Fallecimiento", recordType: "How-To / Self-Service" },
              ],
              filters: [
                "DataCategoryGroup.Topic IN ('Program_Membership', 'FAQs_General', 'Account_Forms')",
                "DataCategoryGroup.Audience IN ($user.audience, 'ALL')",
                "FWD_Lifecycle__c = 'Active'",
                "Language = $user.locale (fallback: 'es')",
                "Membership_Level_Applicable INCLUDES $user.tier OR = 'ALL'",
                "Channel INCLUDES 'Agentforce'",
              ],
            },
            {
              id: "R3",
              order: 3,
              name: "KB-Security",
              backend: "Salesforce Knowledge",
              tone: "sky",
              intent: "Canales oficiales, phishing y documentación de fraude",
              description:
                "Contenido de alta criticidad. Cada artículo con approver Legal y Fraude. El bot cita literal; si detecta discrepancia entre dato del cliente (dominio, teléfono) y KB, escala de inmediato al equipo de Fraude.",
              threshold: "KB confidence ≥ 0.65 (más estricto por criticidad)",
              fallback: "Si duda: escalar SIEMPRE a Fraud Prevention con Caso tipificado",
              articles: [
                { articleId: "KA-SEC-001", title: "Canales Oficiales · Legendary Vacation Club", recordType: "Security" },
                { articleId: "KA-SEC-002", title: "Canales Oficiales · Paradise Pass", recordType: "Security" },
                { articleId: "KA-SEC-003", title: "Documentos Requeridos en Caso de Fraude", recordType: "Security" },
              ],
              filters: [
                "DataCategoryGroup.Topic = 'Security_and_Fraud'",
                "DataCategoryGroup.Audience IN ($user.audience, 'ALL')",
                "FWD_Lifecycle__c = 'Active'",
                "Language = $user.locale (fallback: 'es')",
                "Channel INCLUDES 'Agentforce'",
              ],
            },
            {
              id: "R4",
              order: 4,
              name: "UDMO-Properties",
              backend: "UDMO Files (Data Cloud)",
              tone: "emerald",
              intent: "Fact Sheets y Room Descriptions de las 9 propiedades",
              description:
                "PDFs ricos en formato (layouts, imágenes). El retriever devuelve chunk + page anchor. Complementado por 9 KB Articles 'Property Fact Sheet' que resumen los datos citables. UDMO se usa cuando el intent requiere detalle visual o de habitación específica.",
              threshold: "Semantic similarity ≥ 0.72 · re-rank con boost por match property",
              fallback: "Si sin match ≥ threshold: consultar KB Fact Sheet resumen; si tampoco: handoff Reservaciones",
              articles: [
                { articleId: "KA-PFS-001", title: "AVA Resort Cancun · Fact Sheet", recordType: "Property Fact Sheet" },
                { articleId: "KA-PFS-002", title: "Hard Rock Hotel Cancun · Fact Sheet", recordType: "Property Fact Sheet" },
                { articleId: "KA-PFS-003", title: "Hard Rock Hotel Riviera Maya · Fact Sheet", recordType: "Property Fact Sheet" },
                { articleId: "KA-PFS-004", title: "Hard Rock Hotel Vallarta · Fact Sheet", recordType: "Property Fact Sheet" },
                { articleId: "KA-PFS-005", title: "Hard Rock Hotel Los Cabos · Fact Sheet", recordType: "Property Fact Sheet" },
                { articleId: "KA-PFS-006", title: "Hard Rock Hotel & Casino Punta Cana · Fact Sheet", recordType: "Property Fact Sheet" },
                { articleId: "KA-PFS-007", title: "UNICO 20°87° Riviera Maya · Fact Sheet", recordType: "Property Fact Sheet" },
                { articleId: "KA-PFS-008", title: "UNICO 20°105° Riviera Nayarit · Fact Sheet", recordType: "Property Fact Sheet" },
                { articleId: "KA-PFS-009", title: "UNICO Jamaica · Fact Sheet (⚠ pending PPass)", recordType: "Property Fact Sheet" },
              ],
              filters: [
                "vector_similarity(query, chunk_embedding) ≥ 0.72",
                "metadata.property = $session.property OR $session.property IS NULL",
                "metadata.language = $user.locale",
                "metadata.doc_type IN ('fact_sheet', 'room_description')",
                "metadata.operator_current = 'PAM Hotels'",
              ],
            },
            {
              id: "R5",
              order: 5,
              name: "UDMO-Operations",
              backend: "UDMO Files (Data Cloud)",
              tone: "amber",
              intent: "ON TOUR Transportación + matriz histórica LVC",
              description:
                "Documentos operativos con tablas densas y uso principalmente interno. Se linearizan a prosa antes de vectorizar. El PDF original queda disponible como descarga para el agente humano.",
              threshold: "Semantic similarity ≥ 0.70",
              fallback: "Si sin match: handoff a Reservaciones con contexto de traslado",
              articles: [
                { articleId: "KA-OPS-001", title: "ON TOUR 2026 · Tarifario y Rutas (linearizado)", recordType: "How-To / Self-Service" },
              ],
              filters: [
                "vector_similarity(query, chunk_embedding) ≥ 0.70",
                "metadata.doc_type IN ('transfer_tariff', 'ops_reference')",
                "metadata.language = $user.locale",
                "metadata.lifecycle IN ('Active', 'Seasonal')",
              ],
            },
          ],
        },
        contextData: {
          groups: [
            {
              name: "Por qué Custom Retrievers (no Data Libraries)",
              findings: [
                "Hibridización backend — un solo retriever puede combinar SOSL/SOQL sobre Knowledge + similarity search sobre vectores UDMO en la misma respuesta",
                "Re-ranking propio — el cliente decide la fórmula (recencia · audience match · tier match · property match · semantic score) sin estar atado al re-rank cerrado de Data Libraries",
                "Reuso multi-canal — los KB Articles publicados sirven también a la consola de Service Cloud, al portal de socios y a procesos asíncronos (no solo al bot)",
                "Lifecycle gobernado — Knowledge tiene Draft/Published/Archived, aprobaciones y publicación cross-canal; UDMO maneja versiones de archivo. Data Libraries no tienen ese nivel de governance.",
                "Acceso por Data Category — el retriever filtra por categoría jerárquica que también gobierna acceso de agentes humanos; un solo modelo de seguridad para todo el knowledge",
                "Testabilidad — un Custom Retriever es código Apex/Flow que se puede unit-testear con mocks, validar deterministamente en CI/CD",
              ],
            },
            {
              name: "Anatomía de un Custom Retriever (template Apex)",
              findings: [
                "1. Resolver contexto del usuario — Audience (Paradise Pass · LVC · both), Language ($user.locale), Tier (si aplica), Property (si la sesión la indicó)",
                "2. Mapear intent → backend — Policies/Programs/Security → KB · Properties/Operations → UDMO · ambos → híbrido",
                "3. Query KB — KnowledgeSearch via Apex Search.search() filtrando por DataCategoryGroups (audience, topic, property, lifecycle)",
                "4. Query UDMO — Vector similarity search vía Data Cloud Connect API, con filtros declarativos en metadata",
                "5. Merge + re-rank — fusión por reciprocal rank fusion (RRF) · boost por Lifecycle=Active · penalty por mismatch de audience",
                "6. Threshold 0.72 (semantic) o KB confidence > 0.6 — bajo eso, fallback a clarification turn o handoff humano",
                "7. Devolver chunks con citation pointer (KB Article URL o file_id + page_anchor)",
              ],
            },
            {
              name: "Mapeo retriever → intent del bot",
              findings: [
                "Intent 'política / regla / penalización' → Retriever 1 (KB-Policies)",
                "Intent 'cómo funciona / qué incluye / cuánto gano' → Retriever 2 (KB-Programs-FAQs)",
                "Intent 'es legítimo / phishing / fraude / canal oficial' → Retriever 3 (KB-Security)",
                "Intent 'qué propiedad / qué habitación / qué amenidad' → Retriever 4 (UDMO-Properties)",
                "Intent 'traslado / transfer / aeropuerto' → Retriever 5 (UDMO-Operations)",
                "Intent emocional / fuera de scope / sin match con confidence → handoff a humano con Caso tipificado",
              ],
            },
            {
              name: "Las 9 propiedades — mapeo contra Paradise Pass",
              findings: [
                "HRHC — Hard Rock Hotel Cancun · Cancún, México · Familiar · ✅ en Paradise Pass",
                "HRRM — Hard Rock Hotel Riviera Maya (Hacienda + Heaven 18+) · Playa del Carmen, México · Familiar + Solo Adultos · ✅",
                "HRHV — Hard Rock Hotel Vallarta · Puerto Vallarta, México · Familiar · ✅",
                "HRLC — Hard Rock Hotel Los Cabos · Los Cabos, México · Familiar · ✅",
                "HRPC — Hard Rock Hotel & Casino Punta Cana · Punta Cana, RD · Familiar (Casino 18+) · ✅",
                "AVA — AVA Resort Cancun · Cancún, México · Familiar de ultra-lujo · Sede Legends of Paradise 2026 · ✅",
                "UNICO RM — UNICO 20°87° Hotel Riviera Maya · Playa del Carmen, México · Solo Adultos 18+ · ✅",
                "UNICO RN — UNICO 20°105° Hotel Riviera Nayarit · Punta de Mita, México · Solo Adultos 18+ · ✅",
                "⚠ UNICO MB — UNICO Jamaica (Montego Bay) · está en el repo PERO el fact sheet NO menciona Paradise Pass. Validar antes de incluir en el retriever",
              ],
            },
            {
              name: "Pre-procesamiento crítico — antes de KB Article o UDMO ingest",
              findings: [
                "1. KB Articles — convertir XLSX FAQs a artículos individuales (1 Q/A = 1 artículo, con DataCategory). Esto da ~150–200 artículos finales según la matriz de 4 FAQs × propiedad",
                "2. UDMO — OCR sobre PDFs con Google Docs Renderer (varios fact sheets fallan extracción directa)",
                "3. UDMO — linearizar tablas de ON TOUR a prosa: 'Para Hard Rock Cancún, el traslado privado desde CUN cuesta $X USD, cancelación 24h sin costo'",
                "4. Unificar nomenclatura RCD ↔ PAM en metadata (operator_legacy / operator_current); preservar texto original para trazabilidad",
                "5. Normalizar 3 idiomas — KB en multi-language; UDMO con language en metadata del file",
                "6. PII scrub — verificar que la matriz LVC no traiga datos reales de socios (nombres, emails, números de membresía)",
                "7. Formularios PDF (Update Info, Ownership Change/Add/Removal, Beneficiary Mod, Decease) → NO van a KB ni UDMO. Se almacenan como ContentDocument y se envían al cliente vía Agent Action sendForm()",
              ],
            },
            {
              name: "Estrategia de entrega por fases — bulk primero, curación después",
              findings: [
                "Fase 1 (Semanas 1–4) · Time-to-value corto — ingesta bulk a UDMO Files en Data Cloud de todos los PDFs actuales (fact sheets, políticas, ON TOUR, canales oficiales, fraude, huracán) + Custom Retriever mínimo (semantic search + filtro por Property/Language). El bot ya responde con citaciones al PDF fuente, aunque el recall sea genérico.",
                "Fase 2 (Semanas 5–10) · Curación progresiva — cada dominio prioritario se convierte a KB Articles tipados (Policies primero → Programs & FAQs → Security → Property Fact Sheet → Room Description → How-To). Cada dominio migrado se retira del índice UDMO (política de fuente única).",
                "Fase 3 (Semanas 11+) · Refinamiento — el retriever pasa de bulk semantic a híbrido (KB filtros + UDMO fallback), se activan re-rank por Lifecycle y Last_Reviewed_Date, se publican canales adicionales (Portal LVC, Web pública)",
                "Ganancia del fasing: el cliente ve valor demostrable en la Semana 2 (bot respondiendo con contexto real), no espera 10 semanas al curado completo. La curación se financia con la evidencia de uso.",
                "Riesgo del fasing: si Fase 1 dura más de lo previsto, la deuda de calidad se acumula. Mitigación: definir en el arranque cuáles 3 dominios entran a Fase 2 con timeline duro (recomendación: Policies + FAQs + Security)",
              ],
            },
            {
              name: "Política de fuente única — un dominio, un backend",
              findings: [
                "Un mismo dominio de contenido (ej. 'Política de Cancelación') vive en UN solo backend a la vez — nunca en UDMO Y en KB Article simultáneamente",
                "Regla operativa: cuando un dominio se migra de UDMO a KB Article, el PDF fuente se retira del índice UDMO y se conserva únicamente como ContentDocument adjunto al KB Article (para trazabilidad y descarga por el humano)",
                "Por qué: si conviven dos versiones, el retriever puede devolver ambas y el bot cita la más antigua. Además rompe la promesa de 'una fuente de verdad' del deck ejecutivo.",
                "Cómo se aplica: validation rule en KB Article que bloquea Publish si existe un UDMO File activo con el mismo domain_key (metadata field). El retriever aplica de-dup por domain_key + prioriza KB Article > UDMO cuando ambos aparecen",
                "Excepción intencional: fact sheets de propiedades — el KB Article lleva el resumen citable (Summary + campos estructurados) y el PDF UDMO queda vivo para queries de detalle visual (layouts, planos). En este caso el 'dominio' se define a nivel de sección, no de archivo",
              ],
            },
            {
              name: "Por qué BrandVoice queda fuera del retriever",
              findings: [
                "Si entra al RAG, el bot puede citar literalmente reglas internas ('según mi guía de tono debo ser cálido…'), rompiendo la ilusión conversacional y filtrando IP de marca",
                "El tono se compila al system prompt en cada turno: arquetipos + atributos + reglas de escalamiento + adaptación por idioma + 'fórmula Empatía+Transparencia+Alternativa'",
                "Confirmado por el doc interno 'Tono y Voz Bot - LVC_SF.docx': define personalidad oficial, diferenciación de audiencia y reglas de escalamiento humano",
                "Excepción operativa: las versiones del tono SÍ se versionan en Salesforce Knowledge (Draft/Published) — pero como referencia editorial para el equipo, NO indexadas al retriever del bot",
              ],
            },
          ],
        },
      },
      {
        id: "archivos-por-dl",
        label: "Inventario por backend",
        title: "Inventario por backend — KB Articles · UDMO Files · Forms · System Prompt",
        content:
          "Mapeo verificado contra el repositorio PAM_Hotels_Knowledge_Base_RAG/ actualizado en junio 2026. Cada archivo cae en uno de cuatro destinos: (1) Salesforce Knowledge como artículo curado, (2) UDMO File en Data Cloud para RAG, (3) Form output que el bot adjunta al cliente (no responde), (4) System Prompt embebido en el agente.",
        knowledgeInventoryData: {
          libraries: [
            {
              id: "kb-policies",
              name: "Backend: Salesforce Knowledge — Policies",
              focus: "Reglas oficiales citables (Retriever 1)",
              description:
                "Cada política se convierte en un artículo KB con Data Categories (audience · topic=policy · property=ALL/specific · lifecycle=active). Razón para KB y no UDMO: el agente humano también las cita; cambian con aprobación; deben ser versionables y traducibles a 3 idiomas. Pendiente: convertir el contenido de los 4 PDFs en ~20 artículos atómicos (cancelación regular, cancelación fechas especiales, no-show, hold, cambios, huracán, ECPAT, mascotas, transportación incluida 4+ noches, grupos).",
              tone: "indigo",
              fileCount: 4,
              indexed: true,
              fileGroups: [
                {
                  label: "Política de Cancelación, No-show, Hold y Cambios",
                  note: "Penalidades $600/$900/$1,000 USD · $1,500 USD fechas especiales · Hold $100 USD/noche",
                  files: [
                    "Politicas de Cancelacion, No show, Cambios y Hold/Política de Cancelación socios_.pdf",
                    "Politicas de Cancelacion, No show, Cambios y Hold/Políticas de Reservaciones LVC.pdf",
                  ],
                },
                {
                  label: "Protocolo Huracán y clima crítico",
                  note: "3 opciones: cambio sin costo 3 meses · saldo a favor 12 meses · reembolso con alerta oficial",
                  files: [
                    "Política de huracán y clima/Protocolo Huracán_ En caso de una contingencia climática, Política o social, decretada formalmente por los organismos correspondientes, aplican los siguientes escenarios_.pdf",
                  ],
                },
              ],
              pending: [
                "T&Cs y aviso de privacidad de paradisepass.com — scraping público pendiente",
                "Términos del portal legendary.myaccountinquiry.com — confirmar Palace Resorts vs Solaya",
                "Crear los ~20 KB Articles atómicos a partir de los PDFs (no cargar el PDF entero como un artículo)",
              ],
            },
            {
              id: "kb-programs-faqs",
              name: "Backend: Salesforce Knowledge — Programs & FAQs",
              focus: "Mecánica del pase, referidos y matriz Q/A (Retriever 2)",
              description:
                "La matriz XLSX se descompone en artículos KB individuales (1 Q/A = 1 artículo) con Data Categories audience + topic + property. Esto produce 150–200 artículos finales (4 FAQs × propiedad × audiencia) más artículos de mecánica del pase y programa de referidos PPass. Razón para KB y no UDMO: cada Q/A se rerankea mejor como artículo atómico que como chunk; los humanos también los buscan.",
              tone: "violet",
              fileCount: 3,
              indexed: true,
              fileGroups: [
                {
                  label: "Matriz oficial de FAQs (origen)",
                  note: "1 XLSX, 14 hojas, 992 filas — se transforma en ~150–200 KB Articles atómicos",
                  files: [
                    "FAQ´s/Matriz Completa de FAQs- Legendary Vacation Club_SF.xlsx",
                  ],
                },
                {
                  label: "Programa de Referidos Paradise Pass",
                  note: "Regla oficial: USD 100 por referido confirmado, máx 5 referidos por contrato",
                  files: [
                    "Programa de referidos/Programa de Referidos PPASS.pdf",
                  ],
                },
                {
                  label: "Glosario de acrónimos (artículos KB a crear)",
                  note: "HRHC, HRRM, HRHV, HRLC, HRPC, AVA, UNICO RM/RN/MB, LVC, ECPAT, Rco — 1 artículo por término",
                  files: [
                    "(generar desde 0 a partir de docs internos)",
                  ],
                },
              ],
              pending: [
                "Documento oficial de tiers LVC (Deluxe/VIP/HoF/Chairman) y mecánica completa de Legend Coins con efectividad 2026",
                "Scrapear paradisepass.com y pamhotels.com para mecánica pública del pase, eventos 2026 y beneficios",
                "Definir audience tagging para cada Q/A: matriz no trae columna 'audience' — split manual o LLM-assisted",
              ],
            },
            {
              id: "kb-security",
              name: "Backend: Salesforce Knowledge — Security",
              focus: "Canales oficiales, fraude y phishing (Retriever 3)",
              description:
                "Contenido de alta criticidad que el bot debe citar literal: dominios oficiales, teléfonos, lista exacta de documentos exigidos en fraude. KB Article es el lugar correcto porque requiere aprobación, auditoría, y los agentes humanos lo usan en igualdad de condiciones que el bot.",
              tone: "sky",
              fileCount: 3,
              indexed: true,
              fileGroups: [
                {
                  label: "Canales oficiales LVC",
                  note: "Dominio @legendaryvacationclub.com (mkt/info/collections/memberservices) + teléfonos grabados",
                  files: [
                    "Canales Oficiales/LEGENDARY VACATION CLUB OFFICIAL COMMUNICATION CHANNELS.pdf",
                  ],
                },
                {
                  label: "Email template canales Paradise Pass",
                  note: "Dominio @paradisepass.com · plantilla de referencia para mensajes oficiales",
                  files: [
                    "Estado de Cuenta-Balance/TYLER, know our official channels!.eml",
                  ],
                },
                {
                  label: "Documentos exigidos en caso de fraude",
                  note: "5 documentos: reservación + comprobante + estado bancario + .eml + WhatsApp",
                  files: [
                    "Fraude/DOCUMENTOS SOLICITADOS POR FRAUDE.docx.pdf",
                  ],
                },
              ],
              pending: [
                "Carpeta Llamada Sospechosa/ — VACÍA · pendiente subir guion oficial + matriz de red flags",
                "Carpeta Phishing/ — VACÍA · pendiente subir guía oficial PAM con ejemplos de campañas detectadas",
                "Cargar la lista completa de dominios apócrifos conocidos para fastpath de detección",
              ],
            },
            {
              id: "udmo-properties",
              name: "Backend: UDMO Files (Data Cloud) — Properties",
              focus: "Fact Sheets + Room Descriptions (Retriever 4 · 47 PDFs)",
              description:
                "PDFs grandes y ricos en formato (layouts, imágenes, tablas de tipologías), cambian poco, no necesitan lifecycle de KB Article. Ingesta a UDMO con índice vectorial. Metadata vía Data Categories: property · brand · language · segment. Citations devuelven texto + page anchor.",
              tone: "indigo",
              fileCount: 47,
              indexed: true,
              fileGroups: [
                {
                  label: "AVA Resort Cancun",
                  note: "Sede del evento Legends of Paradise 2026 · 6 archivos · ⚠ uno de 40MB con layouts visuales",
                  files: [
                    "Propiedades/AVA/AVA_FACT_SHEETS/AVA_FACT_SHEET_GENERAL_SP.pdf",
                    "Propiedades/AVA/AVA_FACT_SHEETS/AVA_FACT_SHEET_GENERAL_EN.pdf",
                    "Propiedades/AVA/AVA_FACT_SHEETS/AVA_FACT_SHEET_GENERAL_PT.pdf",
                    "Propiedades/AVA/AVA_ROOM_DESCRIPTIONS/AVA_ROOM_DESCRIPTIONS_LVC_ ES.pdf",
                    "Propiedades/AVA/AVA_ROOM_DESCRIPTIONS/AVA_ROOM_DESCRIPTIONS_LVC_EN_LAYOUTS.pdf",
                    "Propiedades/AVA/AVA_ROOM_DESCRIPTIONS_ENG.pdf",
                  ],
                },
                {
                  label: "Hard Rock Hotel Cancun (HRHC)",
                  note: "5 archivos",
                  files: [
                    "Propiedades/HRHC/HRHC_FACT_SHEETS/HRHC_FACT_SHEET_ES.pdf",
                    "Propiedades/HRHC/HRHC_FACT_SHEETS/HRHC_FACT_SHEET_EN.pdf",
                    "Propiedades/HRHC/HRHC_FACT_SHEETS/HRHC_FACT_SHEET_PT.pdf",
                    "Propiedades/HRHC/HRHC_ROOM DESCRIPTION/HRC_Descriptivo_habiaciones_ES.pdf",
                    "Propiedades/HRHC/HRHC_ROOM DESCRIPTION/HRHC_Room Description_EN.pdf",
                  ],
                },
                {
                  label: "Hard Rock Hotel Riviera Maya (HRRM)",
                  note: "Hacienda (familiar) + Heaven 18+ · 7 archivos",
                  files: [
                    "Propiedades/HRRM /HRRM_FACT_SHEETS/HRRM_FACT_SHEET_ES.pdf",
                    "Propiedades/HRRM /HRRM_FACT_SHEETS/HRRM_FACT_SHEET_EN.pdf",
                    "Propiedades/HRRM /HRRM_FACT_SHEETS/HRRM_FACT_SHEET_PT.pdf",
                    "Propiedades/HRRM /HRRM_ROOM_DESCRIPTION/HRRM_Hacienda_Descriptivo Habitaciones_ES.pdf",
                    "Propiedades/HRRM /HRRM_ROOM_DESCRIPTION/HRRM_ Hacienda_Descriptivo de Habitaciones_EN.pdf",
                    "Propiedades/HRRM /HRRM_ROOM_DESCRIPTION/HRRM_Heaven_Descriptivo Habitaciones_ES.pdf",
                    "Propiedades/HRRM /HRRM_ROOM_DESCRIPTION/HRRM_Heaven_Descriptivo de Habitaciones_EN.pdf",
                  ],
                },
                {
                  label: "Hard Rock Hotel Vallarta (HRHV)",
                  note: "⚠ subcarpetas mal nombradas en el repo: FACT_SHEETS contiene Room Descriptions y viceversa · 5 archivos",
                  files: [
                    "Propiedades/HRHV/HRHV_ROOMS DESCRIPTION/HRHV_FACT_SHEET_ES.pdf",
                    "Propiedades/HRHV/HRHV_ROOMS DESCRIPTION/HRHV_FACT_SHEET_EN.pdf",
                    "Propiedades/HRHV/HRHV_ROOMS DESCRIPTION/HRHV_FACT_SHEET_PT.pdf",
                    "Propiedades/HRHV/HRHV_FACT_SHEETS/HRHV_Descriptivo de habitaciones_ES.pdf",
                    "Propiedades/HRHV/HRHV_FACT_SHEETS/HRHV_Room Descriptions_EN.pdf",
                  ],
                },
                {
                  label: "Hard Rock Hotel Los Cabos (HRLC)",
                  note: "5 archivos",
                  files: [
                    "Propiedades/HRLC/HRLC_FACT_SHEETS/HRLC_FACT_SHEET_ES.pdf",
                    "Propiedades/HRLC/HRLC_FACT_SHEETS/HRLC_FACT_SHEET_EN.pdf",
                    "Propiedades/HRLC/HRLC_FACT_SHEETS/HRLC_FACT_SHEET_PT.pdf",
                    "Propiedades/HRLC/HRLC_ROOM DESCRIPTION/HRHLC_Room Description_ES.pdf",
                    "Propiedades/HRLC/HRLC_ROOM DESCRIPTION/HRLC_Room Descriptions_EN.pdf",
                  ],
                },
                {
                  label: "Hard Rock Hotel & Casino Punta Cana (HRPC)",
                  note: "Casino 18+ · 5 archivos",
                  files: [
                    "Propiedades/HRPC/HRPC_FACT_SHEETS/HRPC_FACT_SHEET_ES.pdf",
                    "Propiedades/HRPC/HRPC_FACT_SHEETS/HRPC_FACT_SHEET_EN.pdf",
                    "Propiedades/HRPC/HRPC_FACT_SHEETS/HRPC_FACT_SHEET_PT.pdf",
                    "Propiedades/HRPC/HRPC_ROOM DESCRIPTION/HRPC_Room_Description_ES.pdf",
                    "Propiedades/HRPC/HRPC_ROOM DESCRIPTION/HRPC_Room Description_EN.pdf",
                  ],
                },
                {
                  label: "UNICO 20°87° Riviera Maya (UNICO RM)",
                  note: "Solo adultos 18+ · 4 archivos (room description solo en EN)",
                  files: [
                    "Propiedades/UNICO RIVIERA MAYA/UNICO RM_ FACT_SHEETS/UNICO_RM_Fact Sheet_ES.pdf",
                    "Propiedades/UNICO RIVIERA MAYA/UNICO RM_ FACT_SHEETS/UNICO_Fact Sheet_EN.pdf",
                    "Propiedades/UNICO RIVIERA MAYA/UNICO RM_ FACT_SHEETS/UNICO_RM_Fact Sheet_PT.pdf",
                    "Propiedades/UNICO RIVIERA MAYA/UNICO ROOMS DESCRIPTION/UNICO_RM_Room_Descriptions_General_EN.pdf",
                  ],
                },
                {
                  label: "UNICO 20°105° Riviera Nayarit (UNICO RN)",
                  note: "Solo adultos 18+ · 5 archivos",
                  files: [
                    "Propiedades/UNICO RIVIERA NAYARIT/UNICO RN_FACT_SHEETS/UNICO_RN_Fact Sheet_General_ES.pdf",
                    "Propiedades/UNICO RIVIERA NAYARIT/UNICO RN_FACT_SHEETS/UNICO_RN_Fact Sheet_General_EN.pdf",
                    "Propiedades/UNICO RIVIERA NAYARIT/UNICO RN_FACT_SHEETS/UNICO_RN_Fact Sheet_General_PT.pdf",
                    "Propiedades/UNICO RIVIERA NAYARIT/UNICO RN_ROOM DESCRIPTION/UNICO_RN_ROOM DESCRIPTION_ES.pdf",
                    "Propiedades/UNICO RIVIERA NAYARIT/UNICO RN_ROOM DESCRIPTION/UNICO_RN_ROOM DESCRIPTION_EN.pdf",
                  ],
                },
                {
                  label: "⚠ UNICO Jamaica (UNICO MB)",
                  note: "Está en el repo PERO no aparece en paradisepass.com · validar antes de cargar · 3 archivos",
                  files: [
                    "Propiedades/UNICO JAMAICA/UNICO JAMAICA_FACTS SHEETS/UNICO_MB_Fact Sheet_ES.pdf",
                    "Propiedades/UNICO JAMAICA/UNICO JAMAICA_FACTS SHEETS/UNICO_MB_Fact Sheet_EN.pdf",
                    "Propiedades/UNICO JAMAICA/UNICO JAMAICA ROOM DESCRIPTION/UNICO MB_ROOM DESCRIPTION_EN.pdf",
                  ],
                },
              ],
              pending: [
                "Confirmar con el cliente: ¿UNICO Jamaica está dentro o fuera de Paradise Pass? (el fact sheet de Jamaica NO menciona PPass)",
                "PT faltante para UNICO RM Room Descriptions, UNICO RN Room Descriptions y UNICO MB Room Descriptions",
                "OCR sobre los PDFs grandes (>4MB) con extractor directo fallado",
              ],
            },
            {
              id: "udmo-operations",
              name: "Backend: UDMO Files (Data Cloud) — Operations",
              focus: "Tarifario ON TOUR + matriz histórica + layouts internos (Retriever 5)",
              description:
                "Documentos operativos con tablas densas o uso mayoritariamente interno. UDMO conserva el formato original para descarga del agente humano, y el índice vectorial se construye sobre versiones linearizadas a prosa (las tablas crudas tienen recall pobre).",
              tone: "violet",
              fileCount: 4,
              indexed: true,
              fileGroups: [
                {
                  label: "Tarifario ON TOUR 2026",
                  note: "9 propiedades · 7 aeropuertos · colectivo $20–55 · privado $58–490 · 24h cancelación · doc aún dice 'RCD'",
                  files: [
                    "ON TOUR TRANSPORTACION/INFORMACIÓN ON TOUR BY RCD HOTELS 2026.pdf",
                  ],
                },
                {
                  label: "Matriz histórica de Programa de Referidos LVC",
                  note: "5 sub-programas históricos (Dynamic Referral Rewards, Referral Week, Web Rate 15%, Experience Nights, Referral Nights) — referencia, NO regla activa de PPass",
                  files: [
                    "Programa de referidos/PROGRAMA REFERIDOS.xlsx",
                  ],
                },
                {
                  label: "Layout de Tipificación de Tickets (referencia interna)",
                  note: "14 hojas · 1000+ tipificaciones · matriz Impacto/Urgencia · usado para configurar Case picklists, NO para responder al cliente",
                  files: [
                    "Tipificación Tickets/SalesForce Layout Herramienta Tickets_Concierge.xlsx",
                  ],
                },
              ],
              pending: [
                "Confirmar disponibilidad de ON TOUR para huéspedes Paradise Pass (default audience=lvc hasta validar)",
                "Linearizar tablas a prosa antes de vectorizar ON TOUR — sin esto el recall del retriever será pobre",
              ],
            },
            {
              id: "forms-output",
              name: "Tipo: Forms — output del bot (NO retrievable)",
              focus: "Formularios oficiales que el bot adjunta al cliente",
              description:
                "18 PDFs de trámites legales que requieren notarización, firmas físicas y documentos adjuntos. NO entran al retriever ni a KB Article. Se almacenan como ContentDocument en Salesforce, y el bot los envía vía Agent Action sendForm() cuando detecta el intent correspondiente. El bot explica el trámite a alto nivel y adjunta el form en el idioma del usuario.",
              tone: "amber",
              fileCount: 18,
              indexed: false,
              fileGroups: [
                {
                  label: "Actualización de Datos (3 idiomas × 3 trámites = 9 forms)",
                  note: "Update Personal Info · Ownership Change · Ownership Removal · todos requieren firma notarizada",
                  files: [
                    "Actualización de Datos/ACTUALIZACION DE INFORMACION/Update Personal Information Form.pdf",
                    "Actualización de Datos/ACTUALIZACION DE INFORMACION/ACTUALIZACION DE DATOS _ ESPAÑOL.pdf",
                    "Actualización de Datos/ACTUALIZACION DE INFORMACION/ACTUALIZACAO PORTUGUES.pdf",
                    "Actualización de Datos/CAMBIO DE PROPIETARIO/OWNERSHIP CHANGE REQUEST ENGLISH.pdf",
                    "Actualización de Datos/CAMBIO DE PROPIETARIO/_CAMBIO DE PROPIETARIO ESPAÑOL.pdf",
                    "Actualización de Datos/CAMBIO DE PROPIETARIO/MUDANCA DE PROPRIETARIO PORTUGUES (1).pdf",
                    "Actualización de Datos/REMOCION DE PROPIETARIO/OWNERSHIP REMOVAL REQUEST.pdf",
                    "Actualización de Datos/REMOCION DE PROPIETARIO/REMOCION DE SOCIO ESPAÑOL.pdf",
                    "Actualización de Datos/REMOCION DE PROPIETARIO/REMOCAO DE PROPRIETARIO PORTUGUES.pdf",
                  ],
                },
                {
                  label: "Beneficiarios (3 idiomas × 3 trámites = 9 forms)",
                  note: "Agregar Propietario · Modificar Beneficiarios (hasta 7) · Remoción por Fallecimiento",
                  files: [
                    "Beneficiarios/AGREGAR NUEVO PROPIETARIO/OWNERSHIP ADDING REQUEST.pdf",
                    "Beneficiarios/AGREGAR NUEVO PROPIETARIO/AGREGAR PROPIETARIO ESPAÑOL.pdf",
                    "Beneficiarios/AGREGAR NUEVO PROPIETARIO/ADICIONAR UN NOVO PROPIETARIO PORTUGUES.pdf",
                    "Beneficiarios/BENEFICIARIOS/BENEFICIARY MODIFICATION ENGLISH.pdf",
                    "Beneficiarios/BENEFICIARIOS/MODIFICAR BENEFICIARIOS ESPAÑOL.pdf",
                    "Beneficiarios/BENEFICIARIOS/PEDIDO MODIFICAR BENEFICIARIOS PORTUGUES.pdf",
                    "Beneficiarios/REMOCION POR FALLECIMIENTO/Ownership removel format.pdf",
                    "Beneficiarios/REMOCION POR FALLECIMIENTO/REMOCIÓN DE SOCIO POR DEFUNCIÓN ESP.pdf",
                    "Beneficiarios/REMOCION POR FALLECIMIENTO/REMOCAO DE PROPRIETARIO PELO MUERTE PORTUGUES.pdf",
                  ],
                },
              ],
              pending: [
                "Definir Agent Action sendForm(trámite, idioma) que adjunta el PDF correcto al canal del usuario",
                "Crear KB Articles cortos que expliquen el qué/cómo de cada trámite (qué firmas, qué documentos, NO PO Box, NO firmas electrónicas) — el bot cita el KB y adjunta el form",
              ],
            },
            {
              id: "system-prompt",
              name: "Tipo: System Prompt — embebido en el agente",
              focus: "BrandVoice (NO retrievable, NO KB Article)",
              description:
                "El tono y voz del bot se compila al system prompt en cada turno. No se recupera por retriever ni se publica como KB Article al cliente final. Internamente puede versionarse en KB con audiencia 'Internal only' para uso editorial del equipo de marca.",
              tone: "sky",
              fileCount: 1,
              indexed: false,
              fileGroups: [
                {
                  label: "Tono y Voz del Concierge",
                  note: "Anfitrión Exclusivo + Concierge Experto · diferenciación PPass vs LVC · adaptación ES/EN/PT",
                  files: [
                    "Personalidad_Coversacional/Tono y Voz Bot - LVC_SF.docx",
                  ],
                },
              ],
              pending: [
                "Brand Guide PAM Hotels 2026 (carpeta Marcas/ vacía)",
                "Lineamiento oficial de comunicación post-rebranding RCD → PAM",
              ],
            },
          ],
        },
      },
      {
        id: "data-categories",
        label: "Record Types & Categories",
        title: "Record Types de Article + Data Categories ortogonales",
        content:
          "Dos decisiones combinadas gobiernan la estructura del Knowledge: (1) cada Article vive bajo uno de 6 Record Types con layout y campos propios; (2) cada Article se etiqueta con 3 Data Category Groups ortogonales (Audience · Topic · Property) para filtrar por intersección, más un 4º eje 'Lifecycle' resuelto vía picklist en el objeto (por el hard-limit de Salesforce de 3 DCGs activos). Los Record Types resuelven '¿qué estructura tiene?'; las Data Categories + Lifecycle resuelven '¿a quién y a qué aplica?'. Foundation desplegada en PAM-Sandbox el 2 de julio de 2026 con prefijo FWD_.",
        contextData: {
          groups: [
            {
              name: "6 Record Types de Article — cobertura del backlog MVP",
              findings: [
                "Property Fact Sheet — ficha general del resort (ej. 'UNICO RM — Ficha General'). Cubre JS001, JS005 y complementa consultas de membresía. Backend: KB Article para el resumen citable; UDMO para el PDF fuente completo",
                "Room Description — descripción de tipo de habitación (ej. 'HRPC — Rock Royalty Caribbean Sand Suite'). Nota: Rock Royalty es CATEGORÍA DE HABITACIÓN de Hard Rock, no tier LVC. Cubre JS005 y consultas de amenidades por tipología. Backend: KB Article para búsqueda rápida; UDMO para el layout ilustrado",
                "Policy — regla oficial citable (ej. 'Cancelación LVC — Fechas Especiales', 'Protocolo Huracán', 'ECPAT'). Cubre JS018, JS021 y todas las políticas del Retriever 1. Backend: siempre KB Article (necesita approver, lifecycle, versionado)",
                "FAQ Article — pregunta atómica + respuesta corta (ej. '¿Puedo llevar a mi mascota a UNICO?'). API name FWD_FAQ · label 'FAQ Article' para no colisionar con el RT nativo 'FAQ' de la org. Cubre JS019, JS020, JS023, JS024 y las 150–200 Q/A que salen de la matriz. Backend: siempre KB Article (1 Q/A = 1 artículo)",
                "Benefit & Program — mecánica de un beneficio o programa (ej. 'Programa de Referidos Paradise Pass', 'Legends of Paradise 2026'). Cubre JS001, JS003, JS007. Backend: siempre KB Article",
                "How-To / Self-Service — guía paso a paso o formulario (ej. 'Cómo cambiar de propietario', 'Cómo actualizar mis datos'). Cubre JS002, JS010, JS013 y activa el Agent Action sendForm(). Backend: KB Article corto con el 'cómo'; el PDF del form vive en ContentDocument",
              ],
            },
            {
              name: "Campos comunes de todos los Record Types",
              findings: [
                "Convención de naming aplicada en Sandbox: el prefijo FWD_ vive únicamente en los API names para namespacing técnico. Los labels que ve el editor humano son limpios ('Article Code', 'Policy', 'Audience') sin el prefijo.",
                "Title — nombre del artículo, único por Record Type + Language (campo estándar de Salesforce Knowledge)",
                "Question__c — la pregunta principal que responde el artículo, en primera persona del usuario, tipo tweet (~120 chars). Es el anchor de retrieval del bot: el embedding del intent del usuario se compara contra el embedding del Question de cada artículo. Un artículo = una pregunta principal; variantes secundarias viven en el Article Body.",
                "Answer__c — respuesta corta verbatim citable, 2–4 oraciones. Es lo que el bot lee en voz al usuario cuando el retriever devuelve match. Ideal ≤ 500 chars.",
                "Summary — máx 1,000 caracteres del estándar de Knowledge · sirve como hover/preview en list views; NO es lo que cita el bot (para eso está Answer__c).",
                "FWD_Article_Body__c — Rich Text hasta 131,072 caracteres · cuerpo completo del artículo con HTML (h2/h3, listas, tablas, links, bold, italic). Aloja variantes secundarias de preguntas, cláusulas expandidas, ejemplos, tablas de datos. El bot enlaza al Article Body cuando el usuario pide 'más info'.",
                "FWD_Article_Code__c — código KA-XXX-NNN para trazabilidad cruzada con este portafolio",
                "FWD_Validation_Status__c — Draft · In Review · Validated · Retired (validation rule impide Publish sin llegar a Validated)",
                "FWD_Last_Reviewed_Date__c — fecha del último check editorial · usado por re-rank del retriever (boost por recencia) y por reportes 'artículos > 12 meses sin review'",
                "FWD_Owner_Department__c — dueño funcional (Legal, Customer Service, Reservations, Fraud, Brand, Product) · determina quién puede editar",
                "FWD_Approver__c — lookup a User que firma la publicación · queda registrado en la History del Article",
                "FWD_Membership_Level_Applicable__c — multipicklist · aplicable especialmente a Policy y Benefit & Program (ALL, Paradise Pass, LVC · Deluxe, LVC · VIP, LVC · Hall of Fame, LVC · Chairman)",
                "FWD_Retrievers__c — multipicklist · qué Custom Retrievers consumen este artículo (R1..R5)",
                "FWD_Source_File__c — path relativo del archivo fuente en el repo KB del cliente (trazabilidad al PDF original)",
                "FWD_Job_Stories__c — IDs de Job Stories que el artículo ayuda a resolver (para reporte de cobertura del MVP)",
                "FWD_Lifecycle__c — Active · Seasonal · Legacy · Draft Internal · Archived (colapsado desde DCG por el hard-limit de 3 DCGs activos)",
                "Language — es · en · pt · las traducciones se ligan al Master Article via MasterVersionId (estándar Knowledge)",
                "Channel — configurado a nivel de PublishStatus + Channel Visibility (Agentforce, Portal LVC, Service Console, Public)",
              ],
            },
            {
              name: "Group 1 · Audience (quién puede ver / a quién aplica)",
              findings: [
                "ALL (raíz) — categoría visible para todas las audiencias",
                "  ├─ Paradise Pass — pase activable, descubrimiento y activación",
                "  ├─ Legendary Vacation Club — pertenencia, membresía",
                "  │   ├─ Tier Deluxe",
                "  │   ├─ Tier VIP",
                "  │   ├─ Tier Hall of Fame",
                "  │   └─ Tier Chairman",
                "  └─ Internal Only — uso editorial del equipo, NO visible al cliente (ej. versiones del system prompt, borradores de tono)",
                "Regla del bot: aplicar filtro por audience del usuario detectado en sesión + ALL. Nunca cita LVC al cliente PPass salvo en flujos explícitos de upgrade",
              ],
            },
            {
              name: "Group 2 · Topic (de qué trata el contenido — jerarquía 2 niveles)",
              findings: [
                "Program & Membership",
                "  ├─ How Paradise Pass works",
                "  ├─ Activation & expiration",
                "  ├─ Benefits & Resort Credits",
                "  ├─ LVC tiers & Legend Coins",
                "  └─ Referral Program",
                "Policies & Rules",
                "  ├─ Cancellation & No-show",
                "  ├─ Changes & Hold",
                "  ├─ Hurricane & weather contingency",
                "  ├─ ECPAT (minors)",
                "  ├─ Pets & service animals",
                "  └─ Group bookings (10+)",
                "Property & Stay",
                "  ├─ Fact sheets",
                "  ├─ Room descriptions",
                "  ├─ Dining & restaurants",
                "  ├─ Dress codes & exclusive areas",
                "  └─ Kids clubs & family",
                "Operations & Travel",
                "  ├─ ON TOUR transfers",
                "  ├─ Airport coverage",
                "  └─ Special assistance (child seats, luggage, accessibility)",
                "Security & Fraud",
                "  ├─ Official channels",
                "  ├─ Phishing detection",
                "  ├─ Suspicious resale calls",
                "  └─ Fraud documentation",
                "Account & Forms",
                "  ├─ Update personal info",
                "  ├─ Ownership change/add/removal",
                "  ├─ Beneficiary modification",
                "  └─ Statement & balance",
                "Escalation & Handoff",
                "  ├─ Customer Service queue",
                "  ├─ Reservations queue",
                "  └─ Fraud Prevention queue",
              ],
            },
            {
              name: "Group 3 · Property (qué resort aplica)",
              findings: [
                "All Properties (default cuando aplica al portafolio entero)",
                "  ├─ AVA — AVA Resort Cancun",
                "  ├─ Hard Rock",
                "  │   ├─ HRHC — Hard Rock Hotel Cancun",
                "  │   ├─ HRRM — Hard Rock Hotel Riviera Maya (Hacienda + Heaven)",
                "  │   ├─ HRHV — Hard Rock Hotel Vallarta",
                "  │   ├─ HRLC — Hard Rock Hotel Los Cabos",
                "  │   └─ HRPC — Hard Rock Hotel & Casino Punta Cana",
                "  └─ UNICO",
                "      ├─ UNICO_RM — UNICO 20°87° Riviera Maya",
                "      ├─ UNICO_RN — UNICO 20°105° Riviera Nayarit",
                "      └─ UNICO_MB — UNICO Jamaica (⚠ pendiente confirmar PPass)",
                "Permite filtros como property=HRRM OR property=Hard Rock (incluye los 5 Hard Rocks por herencia jerárquica)",
                "Sub-eje complementario 'Room Category' (aplica solo a Room Description Record Type) — Rock Royalty · Rock Suite · Deluxe · Deluxe Swim-Up · Deluxe Sky Terrace · Diamond · Family · Hacienda · Heaven · Alcoba (UNICO) · Caribbean Sand. Este NO es un tier LVC — es la categoría de habitación de Hard Rock/UNICO",
              ],
            },
            {
              name: "Group 4 · Lifecycle (implementado como picklist, no DCG)",
              findings: [
                "Salesforce hard-limita a 3 Data Category Groups activos. Con Audience + Topic + Property ya consumimos los 3 slots.",
                "Lifecycle vive como picklist en el objeto Knowledge__kav (API name: FWD_Lifecycle__c). Mismos valores, misma semántica — se filtra en el WHERE de la SOQL del retriever en vez de con withCategory().",
                "Valores: Active (default) · Seasonal · Legacy · Draft (Internal) · Archived",
                "Active — vigente, citable por el bot sin restricciones",
                "Seasonal — válido en ventanas de tiempo (eventos 2026, promociones temporales) · re-rank con boost mientras está vigente, penalizar luego",
                "Legacy — contenido RCD pre-rebranding · accesible solo para trazabilidad, NO citado al cliente",
                "Draft — en revisión, NO visible al bot ni al cliente",
                "Archived — quitado de circulación, solo consultable por roles admin",
                "El retriever filtra por FWD_Lifecycle__c IN ('Active', 'Seasonal') por defecto; los humanos pueden ampliarlo a Legacy para auditorías",
              ],
            },
            {
              name: "Cómo se materializan en Salesforce",
              findings: [
                "Cada Group se configura en Setup → Data Categories — 3 Category Groups independientes (Audience · Topic · Property). Lifecycle es picklist en el objeto.",
                "Knowledge Article assignment: 1 artículo puede llevar valor de los 3 DCGs + FWD_Lifecycle__c (un artículo de huracán: audience=ALL, topic=Policies_and_Rules, property=All_Properties, lifecycle=Active)",
                "Data Category Audience es un filtro editorial y de retrieval — NO es el mecanismo de seguridad. La seguridad real la aplican Channel Visibility (Internal Console vs Customer/Public) + Permission Set Groups (roles funcionales) + Sharing Settings del Article",
                "Ejemplo del layering completo: un artículo con audience=Internal Only + Channel=Internal App + PSG=Legal Editors NO aparece jamás en Agentforce ni en Portal LVC ni en Public, aunque el retriever lo buscara — el gate real está en Channel Visibility",
                "El Custom Retriever expone los 4 filtros como parámetros: retriever.search(query, audience, topic, property, lifecycle) — pero además hereda el contexto de sesión del usuario (Channel del canal que invoca + PSG del user)",
                "Para UDMO Files en Data Cloud se replican como metadata enrichments (mismo nombre de Data Category, persistido como string field) — así el retriever híbrido puede aplicar el mismo filtro a ambos backends",
              ],
            },
            {
              name: "Buenas prácticas aplicadas",
              findings: [
                "Ortogonalidad — los 4 grupos son independientes; ningún valor en uno implica un valor en otro. Esto evita combinatoria explosiva de un solo árbol gigante.",
                "Jerarquía solo donde el bot la aprovecha — Property tiene 2 niveles (Brand → Hotel) para permitir 'todos los Hard Rock'; Audience tiene 2 niveles (programa → tier) para LVC; Topic 2 niveles; Lifecycle plano",
                "Nombres en inglés en Salesforce (estándar Salesforce + facilita migración futura a otras regiones); labels traducidos vía Translation Workbench para presentación al editor de KB",
                "Limit awareness — Salesforce permite hasta 5 Data Category Groups activos · 100 categorías por grupo · 5 niveles de profundidad. Nuestro diseño usa 4 grupos, máximo 30 categorías por grupo, máximo 3 niveles. Holgura amplia.",
                "Cada KB Article TIENE QUE llevar valor en los 4 grupos antes de publicarse (validation rule) — sin esto, el retriever puede devolver contenido sin contexto suficiente",
              ],
            },
          ],
        },
      },
      {
        id: "kb-articles",
        label: "KB Articles",
        title: "KB Articles — inventario para construir en Sandbox",
        content:
          "Lista concreta de artículos a crear en Salesforce Knowledge del sandbox PAM. Cada tarjeta define título, resumen, Record Type, Data Categories y los Retrievers que lo consumirán. IDs `KA-XXX-NNN` son los que llevará el artículo en Salesforce para trazabilidad. Cobertura completa del MVP (13 Job Stories) sin over-engineering — solo lo que necesitamos para el primer release.",
        kbArticlesData: {
          intro:
            "42 artículos master en español (41 del plan MVP + KA-POL-009 sumado durante la lectura verbatim de fuentes) · con traducciones a EN y PT queda un total de 126 versiones. Cada artículo lleva los 3 Data Categories obligatorios (Audience · Topic · Property) más el picklist Lifecycle en el objeto. Ciclo de vida: 'planned' (sin fuente para autorear) → 'draft' (creado en sandbox con Q/A verbatim) → 'in-review' (bloqueado por contradicción o decisión del cliente) → 'validated' (publicado Online, PublishStatus=Online, disponible para el retriever). Al 2 de julio de 2026 · 36 Validated · 2 In Review · 4 Planned.",
          totals: {
            masterArticles: 42,
            languageVersions: 126,
            coveredJobStories: 13,
            totalMvpJobStories: 13,
          },
          buckets: [
            {
              recordType: "Property Fact Sheet",
              description:
                "9 artículos — 1 por propiedad. Resumen citable con highlights (categoría · restaurantes · zonas · kids club · segmento). El PDF completo vive en UDMO como referencia visual.",
              articles: [
                {
                  id: "KA-PFS-001",
                  title: "AVA Resort Cancun · Fact Sheet",
                  summary:
                    "Ultra-lujo familiar de 1,614 habitaciones. Sede de Legends of Paradise 2026. AVA Bay (Crystal Lagoons 2.8 acres). 9 restaurantes de alta cocina. AVA KIDS 4–11 años.",
                  recordType: "Property Fact Sheet",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Property_and_Rooms" },
                    { group: "Property", value: "AVA" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R4 · UDMO-Properties"],
                  channels: ["Agentforce", "Portal LVC", "Service Console", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS001", "JS005"],
                  membershipLevel: "ALL",
                  sourceFile: "Propiedades/AVA/AVA_FACT_SHEETS/AVA_FACT_SHEET_GENERAL_SP.pdf",
                  status: "validated",
                },
                {
                  id: "KA-PFS-002",
                  title: "Hard Rock Hotel Cancun · Fact Sheet",
                  summary:
                    "600 habitaciones all-inclusive familiar en Zona Hotelera. Memorabilia Hard Rock legendario. 9 restaurantes (Frida, Zen, Ciao, Toro, Pizzeto). Roxity Kids Club.",
                  recordType: "Property Fact Sheet",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Property_and_Rooms" },
                    { group: "Property", value: "HRHC" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R4 · UDMO-Properties"],
                  channels: ["Agentforce", "Portal LVC", "Service Console", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS001", "JS005"],
                  membershipLevel: "ALL",
                  sourceFile: "Propiedades/HRHC/HRHC_FACT_SHEETS/HRHC_FACT_SHEET_ES.pdf",
                  status: "validated",
                },
                {
                  id: "KA-PFS-003",
                  title: "Hard Rock Hotel Riviera Maya · Fact Sheet",
                  summary:
                    "Familiar + Adults-only en una sola propiedad. Zona Hacienda (familia) y Heaven 18+. Categorías Rock Royalty · Rock Suite · Deluxe. Bowling Alley · Pared de escalada.",
                  recordType: "Property Fact Sheet",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Property_and_Rooms" },
                    { group: "Property", value: "HRRM" },
                    { group: "Lifecycle", value: "Active" },
                    { group: "Room Category", value: "Hacienda + Heaven" },
                  ],
                  retrievers: ["R4 · UDMO-Properties"],
                  channels: ["Agentforce", "Portal LVC", "Service Console", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS005"],
                  membershipLevel: "ALL",
                  sourceFile: "Propiedades/HRRM /HRRM_FACT_SHEETS/HRRM_FACT_SHEET_ES.pdf",
                  status: "validated",
                },
                {
                  id: "KA-PFS-004",
                  title: "Hard Rock Hotel Vallarta · Fact Sheet",
                  summary:
                    "Familiar en Puerto Vallarta. Layout compacto accesible ideal para familias multigeneracionales. Actividades acuáticas con Resort Credit.",
                  recordType: "Property Fact Sheet",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Property_and_Rooms" },
                    { group: "Property", value: "HRHV" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R4 · UDMO-Properties"],
                  channels: ["Agentforce", "Portal LVC", "Service Console", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS005"],
                  membershipLevel: "ALL",
                  sourceFile: "Propiedades/HRHV/HRHV_FACT_SHEETS/HRHV_Descriptivo de habitaciones_ES.pdf",
                  status: "validated",
                },
                {
                  id: "KA-PFS-005",
                  title: "Hard Rock Hotel Los Cabos · Fact Sheet",
                  summary:
                    "Familiar en Los Cabos. Piscinas climatizadas. Créditos aplican en golf con convenios de la zona. Programa 'Kids Stay FREE'.",
                  recordType: "Property Fact Sheet",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Property_and_Rooms" },
                    { group: "Property", value: "HRLC" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R4 · UDMO-Properties"],
                  channels: ["Agentforce", "Portal LVC", "Service Console", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS005"],
                  membershipLevel: "ALL",
                  sourceFile: "Propiedades/HRLC/HRLC_FACT_SHEETS/HRLC_FACT_SHEET_ES.pdf",
                  status: "validated",
                },
                {
                  id: "KA-PFS-006",
                  title: "Hard Rock Hotel & Casino Punta Cana · Fact Sheet",
                  summary:
                    "Familiar con Casino 18+ y Oro Nightclub. Rutas de carritos internos. Créditos NO aplican en Casino por regulaciones locales de RD. Rock Royalty, Rock Family, Caribbean Diamond.",
                  recordType: "Property Fact Sheet",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Property_and_Rooms" },
                    { group: "Property", value: "HRPC" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R4 · UDMO-Properties"],
                  channels: ["Agentforce", "Portal LVC", "Service Console", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS005"],
                  membershipLevel: "ALL",
                  sourceFile: "Propiedades/HRPC/HRPC_FACT_SHEETS/HRPC_FACT_SHEET_ES.pdf",
                  status: "validated",
                },
                {
                  id: "KA-PFS-007",
                  title: "UNICO 20°87° Riviera Maya · Fact Sheet",
                  summary:
                    "Adults-only 18+ · 448 habitaciones. Esencia Beauty Bar · 5 restaurantes (Mi Carisa italiano, Mura House yakitori). Anfitrión local en cada habitación.",
                  recordType: "Property Fact Sheet",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Property_and_Rooms" },
                    { group: "Property", value: "UNICO_RM" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R4 · UDMO-Properties"],
                  channels: ["Agentforce", "Portal LVC", "Service Console", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS005"],
                  membershipLevel: "ALL",
                  sourceFile: "Propiedades/UNICO RIVIERA MAYA/UNICO RM_ FACT_SHEETS/UNICO_RM_Fact Sheet_ES.pdf",
                  status: "validated",
                },
                {
                  id: "KA-PFS-008",
                  title: "UNICO 20°105° Riviera Nayarit · Fact Sheet",
                  summary:
                    "Adults-only 18+ en Punta de Mita. Suites Alcoba con vistas al mar. Concept restaurants con anfitrión local.",
                  recordType: "Property Fact Sheet",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Property_and_Rooms" },
                    { group: "Property", value: "UNICO_RN" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R4 · UDMO-Properties"],
                  channels: ["Agentforce", "Portal LVC", "Service Console", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS005"],
                  membershipLevel: "ALL",
                  sourceFile: "Propiedades/UNICO RIVIERA NAYARIT/UNICO RN_FACT_SHEETS/UNICO_RN_Fact Sheet_General_ES.pdf",
                  status: "validated",
                },
                {
                  id: "KA-PFS-009",
                  title: "UNICO Jamaica (Montego Bay) · Fact Sheet ⚠",
                  summary:
                    "Adults-only 18+ · 451 habitaciones · 4 piscinas · Spa 32 cabinas. IMPORTANTE: fact sheet oficial NO menciona Paradise Pass. Marcar como legacy o pendiente hasta validación del cliente.",
                  recordType: "Property Fact Sheet",
                  dataCategories: [
                    { group: "Audience", value: "LVC" },
                    { group: "Topic", value: "Property_and_Rooms" },
                    { group: "Property", value: "UNICO_MB" },
                    { group: "Lifecycle", value: "Draft" },
                  ],
                  retrievers: ["R4 · UDMO-Properties"],
                  channels: ["Service Console"],
                  languages: ["es", "en"],
                  jobStories: ["JS005"],
                  membershipLevel: "LVC only",
                  sourceFile: "Propiedades/UNICO JAMAICA/UNICO JAMAICA_FACTS SHEETS/UNICO_MB_Fact Sheet_EN.pdf",
                  status: "in-review",
                },
              ],
            },
            {
              recordType: "Policy",
              description:
                "9 artículos — reglas oficiales con approver Legal. Cada uno con Membership_Level_Applicable, Effective_Date y sección 'Aplicabilidad · Regla · Excepciones'. KA-POL-009 (Transportación) se añadió durante la lectura verbatim de las fuentes en julio 2026 — ver pendientes.",
              articles: [
                {
                  id: "KA-POL-001",
                  title: "Política de Cancelación · Fechas Regulares",
                  summary:
                    "Penalidades escalonadas: <30 días $1,000 USD · 31–60 días $900 USD · 61+ días $600 USD. Aplica a socios LVC y clientes Paradise Pass. Se cita literal.",
                  recordType: "Policy",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Policies_and_Rules" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R1 · KB-Policies"],
                  channels: ["Agentforce", "Portal LVC", "Service Console"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS021", "JS027"],
                  membershipLevel: "ALL",
                  sourceFile: "Politicas de Cancelacion, No show, Cambios y Hold/Política de Cancelación socios_.pdf",
                  status: "validated",
                },
                {
                  id: "KA-POL-002",
                  title: "Política de Cancelación · Fechas Especiales",
                  summary:
                    "27 dic–3 ene, Semana Santa y Pascua: ≤60 días $1,500 USD · 61+ días $1,000 USD. Prevalece sobre KA-POL-001 cuando la fecha cae en la ventana especial.",
                  recordType: "Policy",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Policies_and_Rules" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Seasonal" },
                  ],
                  retrievers: ["R1 · KB-Policies"],
                  channels: ["Agentforce", "Portal LVC", "Service Console"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS021", "JS027"],
                  membershipLevel: "ALL",
                  sourceFile: "Politicas de Cancelacion, No show, Cambios y Hold/Política de Cancelación socios_.pdf",
                  status: "validated",
                },
                {
                  id: "KA-POL-003",
                  title: "Política de No-Show",
                  summary:
                    "Regular $1,000 USD · Fechas Especiales $1,200 USD (LVC) / $1,500 USD (regular). El no-show aplica al momento del check-in previsto.",
                  recordType: "Policy",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Policies_and_Rules" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R1 · KB-Policies"],
                  channels: ["Agentforce", "Portal LVC", "Service Console"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS027"],
                  membershipLevel: "ALL",
                  sourceFile: "Politicas de Cancelacion, No show, Cambios y Hold/Políticas de Reservaciones LVC.pdf",
                  status: "in-review",
                },
                {
                  id: "KA-POL-004",
                  title: "Política de Cambios",
                  summary:
                    "$10 USD fee de cambio si aplica promoción/semana vigente. Dinamismo: diferencia tarifa + $10 USD. Cambios last-minute (día de check-in) $200 USD.",
                  recordType: "Policy",
                  dataCategories: [
                    { group: "Audience", value: "LVC" },
                    { group: "Topic", value: "Policies_and_Rules" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R1 · KB-Policies"],
                  channels: ["Agentforce", "Portal LVC", "Service Console"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS030"],
                  membershipLevel: "LVC (Deluxe · VIP · HoF · Chairman)",
                  sourceFile: "Politicas de Cancelacion, No show, Cambios y Hold/Políticas de Reservaciones LVC.pdf",
                  status: "validated",
                },
                {
                  id: "KA-POL-005",
                  title: "Política de Hold en Propiedad",
                  summary:
                    "$100 USD por noche por habitación · reembolsable si no se usa. Aplica cuando el socio pide reservar habitación en garantía sin confirmar check-in.",
                  recordType: "Policy",
                  dataCategories: [
                    { group: "Audience", value: "LVC" },
                    { group: "Topic", value: "Policies_and_Rules" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R1 · KB-Policies"],
                  channels: ["Portal LVC", "Service Console"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS030"],
                  membershipLevel: "LVC",
                  sourceFile: "Politicas de Cancelacion, No show, Cambios y Hold/Políticas de Reservaciones LVC.pdf",
                  status: "validated",
                },
                {
                  id: "KA-POL-006",
                  title: "Protocolo Huracán y Clima Crítico",
                  summary:
                    "3 opciones ante alerta oficial: (1) cambio sin costo dentro de 3 meses · (2) saldo a favor vigencia 12 meses · (3) reembolso si hay alerta oficial que cubra las fechas. Si NO hay alerta: penalidad normal.",
                  recordType: "Policy",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Policies_and_Rules" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R1 · KB-Policies"],
                  channels: ["Agentforce", "Portal LVC", "Service Console", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS021"],
                  membershipLevel: "ALL",
                  sourceFile: "Política de huracán y clima/Protocolo Huracán_ En caso de una contingencia climática, Política o social, decretada formalmente por los organismos correspondientes, aplican los siguientes escenarios_.pdf",
                  status: "validated",
                },
                {
                  id: "KA-POL-007",
                  title: "Protocolo ECPAT · Protección de Menores",
                  summary:
                    "Documentación obligatoria para viajar con menores: pasaporte, CURP, acta de nacimiento, credencial escolar con foto. Aplica al momento del check-in en todas las propiedades.",
                  recordType: "Policy",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Policies_and_Rules" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R1 · KB-Policies"],
                  channels: ["Agentforce", "Portal LVC", "Service Console", "Public Web"],
                  languages: ["es", "en", "pt"],
                  membershipLevel: "ALL",
                  sourceFile: "Politicas de Cancelacion, No show, Cambios y Hold/Políticas de Reservaciones LVC.pdf",
                  status: "validated",
                },
                {
                  id: "KA-POL-008",
                  title: "Política de Mascotas por Propiedad",
                  summary:
                    "Hard Rock: pet-friendly. UNICO y AVA: solo animales de servicio o apoyo emocional con certificación oficial. Se requiere aviso previo al check-in.",
                  recordType: "Policy",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Policies_and_Rules" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R1 · KB-Policies"],
                  channels: ["Agentforce", "Portal LVC", "Service Console", "Public Web"],
                  languages: ["es", "en", "pt"],
                  membershipLevel: "ALL",
                  sourceFile: "Politicas de Cancelacion, No show, Cambios y Hold/Políticas de Reservaciones LVC.pdf",
                  status: "validated",
                },
                {
                  id: "KA-POL-009",
                  title: "Política de Transportación Incluida",
                  summary:
                    "Transportación incluida con estancias de 4+ noches. Agendar por email con 15 días de anticipación (dirección según carta de confirmación).",
                  recordType: "Policy",
                  dataCategories: [
                    { group: "Audience", value: "LVC" },
                    { group: "Topic", value: "Policies_and_Rules" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R1 · KB-Policies"],
                  channels: ["Agentforce", "Portal LVC", "Service Console"],
                  languages: ["es", "en", "pt"],
                  membershipLevel: "LVC (Deluxe · VIP · HoF · Chairman)",
                  sourceFile: "Politicas de Cancelacion, No show, Cambios y Hold/Políticas de Reservaciones LVC.pdf",
                  status: "validated",
                },
              ],
            },
            {
              recordType: "Benefit & Program",
              description:
                "4 artículos — mecánica de programas y beneficios. Membership_Level_Applicable diferencia PPass vs LVC. Approver de Legal + Producto.",
              articles: [
                {
                  id: "KA-BEN-001",
                  title: "Paradise Pass · Cómo Funciona",
                  summary:
                    "Certificado activable de 4/5 o 7/8 noches en 9 propiedades. Vencimiento por fecha. Bonus 'An Extra Dose of Paradise' si compra dentro de primeros 3 meses.",
                  recordType: "Benefit & Program",
                  dataCategories: [
                    { group: "Audience", value: "Paradise Pass" },
                    { group: "Topic", value: "Program_Membership" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS001"],
                  membershipLevel: "Paradise Pass",
                  sourceFile: "paradisepass.com (público) + FAQ´s/Matriz…xlsx",
                  status: "planned",
                },
                {
                  id: "KA-BEN-002",
                  title: "Beneficios Paradise Pass · Member's Bracelet & Resort Credits",
                  summary:
                    "Member's Bracelet identifica al huésped. Resort Credits canjeables en spa, aventuras y belleza. Eventos por invitación (Legends of Paradise, Summer Like Heaven, Camp Rockaway).",
                  recordType: "Benefit & Program",
                  dataCategories: [
                    { group: "Audience", value: "Paradise Pass" },
                    { group: "Topic", value: "Program_Membership" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS001", "JS007"],
                  membershipLevel: "Paradise Pass",
                  status: "planned",
                },
                {
                  id: "KA-BEN-003",
                  title: "Programa de Referidos Paradise Pass · $100 USD × 5",
                  summary:
                    "USD 100 de crédito por cada referido que reserve en propiedad All Inclusive. Máx 5 referidos (USD 500 tope). Se aplica al balance del certificado o a upgrade. Si el referido cancela, se descuenta del wallet.",
                  recordType: "Benefit & Program",
                  dataCategories: [
                    { group: "Audience", value: "Paradise Pass" },
                    { group: "Topic", value: "Program_Membership" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC", "Service Console"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS003"],
                  membershipLevel: "Paradise Pass",
                  sourceFile: "Programa de referidos/Programa de Referidos PPASS.pdf",
                  status: "validated",
                },
                {
                  id: "KA-BEN-004",
                  title: "Legends of Paradise 2026 · Evento AVA Cancún",
                  summary:
                    "Evento estrella 2026, 6–13 de diciembre en AVA Resort Cancun. Reservado para portadores activos de Paradise Pass. Requiere invitación confirmada por el club.",
                  recordType: "Benefit & Program",
                  dataCategories: [
                    { group: "Audience", value: "Paradise Pass" },
                    { group: "Topic", value: "Program_Membership" },
                    { group: "Property", value: "AVA" },
                    { group: "Lifecycle", value: "Seasonal" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS001"],
                  membershipLevel: "Paradise Pass",
                  status: "planned",
                },
              ],
            },
            {
              recordType: "FAQ",
              description:
                "10 FAQs atómicas (1 Q/A = 1 artículo). Extraídas de la matriz oficial y del glosario a construir. Se rerankean con boost por match exacto de la pregunta.",
              articles: [
                {
                  id: "KA-FAQ-001",
                  title: "Créditos del club en el Casino de HRPC",
                  summary:
                    "Los créditos del club NO aplican en el casino de Hard Rock Punta Cana por regulaciones locales de RD sobre juego y azar.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "HRPC" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC", "Public Web"],
                  languages: ["es", "en", "pt"],
                  membershipLevel: "ALL",
                  sourceFile: "FAQ´s/Matriz Completa de FAQs- Legendary Vacation Club_SF.xlsx (r5 · Hard Rock Hotel Punta Cana FAQ 1)",
                  status: "validated",
                },
                {
                  id: "KA-FAQ-002",
                  title: "UNICO · Restricción de edad (solo adultos 18+)",
                  summary:
                    "UNICO es estrictamente adultos 18+; no admite menores bajo ninguna circunstancia ni nivel de membresía. Aplica a UNICO 20°87° Riviera Maya y UNICO 20°105° Riviera Nayarit.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "UNICO" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS005"],
                  membershipLevel: "ALL",
                  sourceFile: "FAQ´s/Matriz Completa de FAQs- Legendary Vacation Club_SF.xlsx (r7-r8 · UNICO FAQ 2)",
                  status: "validated",
                },
                {
                  id: "KA-FAQ-003",
                  title: "HRRM · Heaven es exclusivamente adultos 18+",
                  summary:
                    "En Hard Rock Hotel Riviera Maya la sección Heaven es solo adultos 18+. Con menores se usa la sección Hacienda.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "HRRM" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS005"],
                  membershipLevel: "ALL",
                  sourceFile: "FAQ´s/Matriz Completa de FAQs- Legendary Vacation Club_SF.xlsx (r2 · HRRM FAQ 2)",
                  status: "validated",
                },
                {
                  id: "KA-FAQ-004",
                  title: "AVA · Concepto familiar de ultra-lujo con áreas segmentadas",
                  summary:
                    "AVA es un resort familiar disruptivo de ultra-lujo con áreas segmentadas por edades (niños, adolescentes y espacios exclusivos para adultos).",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "AVA" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS005"],
                  membershipLevel: "ALL",
                  sourceFile: "FAQ´s/Matriz Completa de FAQs- Legendary Vacation Club_SF.xlsx (r9 · AVA FAQ 2)",
                  status: "validated",
                },
                {
                  id: "KA-FAQ-005",
                  title: "Códigos de vestimenta en restaurantes de especialidad",
                  summary:
                    "Casual Regular en centros de consumo generales (sin traje de baño ni ropa mojada). Casual Elegant en cenas de especialidad. En AVA, Chez Moi y Bao exigen Resort Evening.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC"],
                  languages: ["es", "en", "pt"],
                  membershipLevel: "ALL",
                  sourceFile: "FAQ´s/Matriz Completa de FAQs- Legendary Vacation Club_SF.xlsx (r3, r5, r9 · FAQ 4)",
                  status: "validated",
                },
                {
                  id: "KA-FAQ-006",
                  title: "Cómo reservo cenas de especialidad en el hotel",
                  summary:
                    "El agente inteligente centraliza el aforo diario y permite reservar. Recomendado con 24h de anticipación. Camas balinesas con prioridad a Chairman/Hall of Fame.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC"],
                  languages: ["es", "en", "pt"],
                  membershipLevel: "ALL",
                  sourceFile: "FAQ´s/Matriz Completa de FAQs- Legendary Vacation Club_SF.xlsx (r3, r4 · FAQ 4)",
                  status: "validated",
                },
                {
                  id: "KA-FAQ-007",
                  title: "Room service disponible 24/7",
                  summary:
                    "Room service 24/7 disponible. Se ordena directamente desde la interfaz del chatbot con menú premium del club.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC"],
                  languages: ["es", "en", "pt"],
                  membershipLevel: "ALL",
                  sourceFile: "FAQ´s/Matriz Completa de FAQs- Legendary Vacation Club_SF.xlsx (r6 · HRHV FAQ 4)",
                  status: "validated",
                },
                {
                  id: "KA-FAQ-008",
                  title: "Uso de Legend Coins con service fee en Spa y Woodward",
                  summary:
                    "Woodward y Spa aceptan Legend Coins con service fee correspondiente sobre el valor del servicio, liquidable al checkout.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "LVC" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "HRRM" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC"],
                  languages: ["es", "en", "pt"],
                  membershipLevel: "LVC (Deluxe · VIP · HoF · Chairman)",
                  sourceFile: "FAQ´s/Matriz Completa de FAQs- Legendary Vacation Club_SF.xlsx (r2 · HRRM FAQ 1)",
                  status: "validated",
                },
                {
                  id: "KA-FAQ-009",
                  title: "UNICO · Esquema Unlimited Inclusions con 25% service fee",
                  summary:
                    "En UNICO, el catálogo de spa y tours opera bajo Unlimited Inclusions con un service fee obligatorio del 25% sobre el valor del menú.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "LVC" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "UNICO" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC"],
                  languages: ["es", "en", "pt"],
                  membershipLevel: "LVC (Deluxe · VIP · HoF · Chairman)",
                  sourceFile: "FAQ´s/Matriz Completa de FAQs- Legendary Vacation Club_SF.xlsx (r7-r8 · UNICO FAQ 1)",
                  status: "validated",
                },
                {
                  id: "KA-FAQ-010",
                  title: "Traslado aeropuerto — cortesía vs tarifa preferencial por tier",
                  summary:
                    "La transportación terrestre varía de cortesía a tarifa preferencial según el nivel Legendary. Complementa la política general (KA-POL-009): incluida con estancias 4+ noches.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "LVC" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS005"],
                  membershipLevel: "LVC (Deluxe · VIP · HoF · Chairman)",
                  sourceFile: "FAQ´s/Matriz Completa de FAQs- Legendary Vacation Club_SF.xlsx (r4 · HRLC FAQ 3)",
                  status: "validated",
                },
              ],
            },
            {
              recordType: "How-To / Self-Service",
              description:
                "7 guías paso a paso. Cada una explica el trámite (qué firmas se piden, qué documentos adjunta el cliente) y dispara la Agent Action sendForm() con el PDF oficial correspondiente.",
              articles: [
                {
                  id: "KA-HOW-001",
                  title: "Cómo Consultar mi Estado de Cuenta por Email",
                  summary:
                    "El bot valida identidad, extrae saldos por certificado desde Benefit__c y envía email desde Salesforce Core con plantilla. Entrega en <2 min. Sin uso de Marketing Cloud.",
                  recordType: "How-To / Self-Service",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Account_Forms" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS013"],
                  membershipLevel: "ALL",
                  status: "planned",
                },
                {
                  id: "KA-HOW-002",
                  title: "Cómo Actualizar mis Datos Personales",
                  summary:
                    "Formulario oficial 'Update Personal Information' requiere: 2 firmas notarizadas (miembros), sin PO Box, sin firma electrónica. El bot adjunta el PDF en idioma del cliente.",
                  recordType: "How-To / Self-Service",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Account_Forms" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC", "Service Console"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS010"],
                  membershipLevel: "ALL",
                  sourceFile: "Actualización de Datos/ACTUALIZACION DE INFORMACION/",
                  status: "validated",
                },
                {
                  id: "KA-HOW-003",
                  title: "Cómo Solicitar Cambio de Propietario",
                  summary:
                    "Formulario 'Ownership Change' requiere: 4 firmas (2 actuales + 2 nuevos) + notario + copia ID de nuevos propietarios. El bot orienta y adjunta el PDF.",
                  recordType: "How-To / Self-Service",
                  dataCategories: [
                    { group: "Audience", value: "LVC" },
                    { group: "Topic", value: "Account_Forms" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Service Console"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS002"],
                  membershipLevel: "LVC",
                  sourceFile: "Actualización de Datos/CAMBIO DE PROPIETARIO/",
                  status: "validated",
                },
                {
                  id: "KA-HOW-004",
                  title: "Cómo Agregar un Nuevo Propietario",
                  summary:
                    "Formulario 'Ownership Adding' requiere: 3 firmas (2 actuales + 1 nuevo) + notario + copia ID. El bot no ejecuta — orienta y escala a Customer Service.",
                  recordType: "How-To / Self-Service",
                  dataCategories: [
                    { group: "Audience", value: "LVC" },
                    { group: "Topic", value: "Account_Forms" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Service Console"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS002"],
                  membershipLevel: "LVC",
                  sourceFile: "Beneficiarios/AGREGAR NUEVO PROPIETARIO/",
                  status: "validated",
                },
                {
                  id: "KA-HOW-005",
                  title: "Cómo Solicitar Remoción de Propietario",
                  summary:
                    "Formulario 'Ownership Removal'. 2 firmas del miembro a remover + notario + copia ID. El bot adjunta, no procesa.",
                  recordType: "How-To / Self-Service",
                  dataCategories: [
                    { group: "Audience", value: "LVC" },
                    { group: "Topic", value: "Account_Forms" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Service Console"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS002"],
                  membershipLevel: "LVC",
                  sourceFile: "Actualización de Datos/REMOCION DE PROPIETARIO/",
                  status: "validated",
                },
                {
                  id: "KA-HOW-006",
                  title: "Cómo Modificar Beneficiarios",
                  summary:
                    "Formulario 'Beneficiary Modification'. Permite agregar/remover hasta 7 beneficiarios con fechas de nacimiento. 2 firmas (ambos miembros).",
                  recordType: "How-To / Self-Service",
                  dataCategories: [
                    { group: "Audience", value: "LVC" },
                    { group: "Topic", value: "Account_Forms" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC", "Service Console"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS002"],
                  membershipLevel: "LVC",
                  sourceFile: "Beneficiarios/BENEFICIARIOS/",
                  status: "validated",
                },
                {
                  id: "KA-HOW-007",
                  title: "Cómo Reportar Remoción por Fallecimiento",
                  summary:
                    "Formulario 'Ownership Update for Decease'. 4 firmas (miembros sobrevivientes) + notario + acta de defunción. El bot ofrece tono empático y adjunta el PDF.",
                  recordType: "How-To / Self-Service",
                  dataCategories: [
                    { group: "Audience", value: "LVC" },
                    { group: "Topic", value: "Account_Forms" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Service Console"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS002"],
                  membershipLevel: "LVC",
                  sourceFile: "Beneficiarios/REMOCION POR FALLECIMIENTO/",
                  status: "validated",
                },
              ],
            },
            {
              recordType: "Security",
              description:
                "3 artículos de alta criticidad. Approver Legal + Fraude. El bot cita literal; el humano los usa en igualdad. Threshold de retrieval más estricto (≥ 0.65).",
              articles: [
                {
                  id: "KA-SEC-001",
                  title: "Canales Oficiales · Legendary Vacation Club",
                  summary:
                    "Dominio único @legendaryvacationclub.com (subdominios mkt/info/collections/memberservices). Website www.legendaryvacationclub.com. 4 teléfonos grabados. Líneas de soporte por región.",
                  recordType: "Security",
                  dataCategories: [
                    { group: "Audience", value: "LVC" },
                    { group: "Topic", value: "Security_and_Fraud" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R3 · KB-Security"],
                  channels: ["Agentforce", "Portal LVC", "Service Console", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS024", "JS023"],
                  membershipLevel: "LVC",
                  sourceFile: "Canales Oficiales/LEGENDARY VACATION CLUB OFFICIAL COMMUNICATION CHANNELS.pdf",
                  status: "validated",
                },
                {
                  id: "KA-SEC-002",
                  title: "Canales Oficiales · Paradise Pass",
                  summary:
                    "Dominio único @paradisepass.com. Website paradisepass.com. El bot compara el correo recibido por el socio contra el patrón legítimo antes de emitir juicio.",
                  recordType: "Security",
                  dataCategories: [
                    { group: "Audience", value: "Paradise Pass" },
                    { group: "Topic", value: "Security_and_Fraud" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R3 · KB-Security"],
                  channels: ["Agentforce", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS024"],
                  membershipLevel: "Paradise Pass",
                  sourceFile: "Estado de Cuenta-Balance/TYLER, know our official channels!.eml",
                  status: "validated",
                },
                {
                  id: "KA-SEC-003",
                  title: "Documentos Requeridos en Caso de Fraude",
                  summary:
                    "Lista oficial de 5 documentos que el club exige cuando ya hubo pago a un defraudador: reservación fraudulenta (PDF) · comprobante de pago · estado de cuenta bancario · correos del defraudador (.eml) · WhatsApp.",
                  recordType: "Security",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Security_and_Fraud" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R3 · KB-Security"],
                  channels: ["Agentforce", "Service Console"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS023"],
                  membershipLevel: "ALL",
                  sourceFile: "Fraude/DOCUMENTOS SOLICITADOS POR FRAUDE.docx.pdf",
                  status: "validated",
                },
              ],
            },
          ],
          pending: {
            intro:
              "Temas surgidos durante la construcción de los KB Articles del MVP que requieren decisión o input del cliente antes de que los artículos afectados pasen de Draft / In Review a Validated. Cada tarjeta describe el hallazgo, los artículos impactados y la petición concreta al cliente.",
            items: [
              {
                id: "PND-001",
                title: "Contradicción documental — penalidad por no-show en fechas especiales",
                severity: "blocker",
                articles: ["KA-POL-003"],
                description:
                  "Al construir la Política de No-Show detectamos que las dos fuentes oficiales entregadas contradicen el monto de la penalidad en fechas especiales (Semana Santa, Pascua y del 27 de diciembre al 3 de enero):\n\n• 'Política de Cancelación socios_.pdf' declara en un párrafo la penalidad de 1,500 USD y, en un párrafo posterior del mismo documento, declara 1,200 USD. Es una inconsistencia interna dentro del mismo PDF.\n\n• 'Políticas de Reservaciones LVC.pdf' declara únicamente 1,200 USD.\n\nEl artículo KA-POL-003 fue creado en Salesforce Knowledge con status 'In Review' y su Answer explicita ambas versiones para que el bot no cite un monto incorrecto. El body incluye ambas cifras marcadas como 'contradicción documental detectada — pendiente de resolver con Legal'. Hasta que Legal confirme la versión vigente, el retriever R1 · KB-Policies devolverá el artículo pero el bot escalará al humano para responder el monto exacto.",
                askOfClient:
                  "Confirmar cuál es el monto oficial vigente para 2026 de la penalidad por no-show en fechas especiales (Semana Santa · Pascua · 27 dic – 3 ene): ¿1,200 USD o 1,500 USD? Idealmente reemplazar el PDF fuente con una versión consolidada sin la contradicción, para poder pasar KA-POL-003 a Validated y publicar como Online.",
              },
              {
                id: "PND-002",
                title: "Definición de 'grupo' — coincidencia de noches ambigua entre fuentes",
                severity: "warning",
                articles: ["(pendiente crear KA-POL-010)"],
                description:
                  "Las dos fuentes coinciden en que 10 reservas o más en la misma propiedad y para las mismas fechas se consideran grupo, pero difieren en la regla de coincidencia de noches:\n\n• 'Política de Cancelación socios_.pdf' dice 'que coincidan por mínimo noches' — frase incompleta o ambigua.\n\n• 'Políticas de Reservaciones LVC.pdf' dice 'que coincidan por 3 noches o más' — específico.\n\nAdemás, la política completa de cancelación de grupos (100% del monto pagado con 90 días o menos; 600 USD por reserva con 91 días o más; no aplican cambios con 90 días o menos) sólo está en 'Política de Cancelación socios_.pdf'. Esto amerita un artículo KB dedicado (KA-POL-010) que aún no está en el plan de 41 MVP.",
                askOfClient:
                  "Confirmar (a) el umbral de coincidencia de noches para considerar un grupo (¿3 noches u otro valor?) y (b) si la política de cancelación de grupos aplica solo a LVC o también a Paradise Pass. Con esa confirmación creamos KA-POL-010 con Q/A y body verbatim.",
              },
              {
                id: "PND-003",
                title: "Contenido inventado retirado en los pilotos KA-SEC-001 y KA-SEC-003",
                severity: "info",
                articles: ["KA-SEC-001", "KA-SEC-003"],
                description:
                  "Durante la primera pasada del piloto de julio 2026 se incluyeron en el body de dos artículos afirmaciones que NO aparecen en el documento fuente:\n\n• En KA-SEC-001 se incluyó 'Nunca solicitamos datos bancarios por email' — es una inferencia razonable pero no está literal en 'LEGENDARY VACATION CLUB OFFICIAL COMMUNICATION CHANNELS.pdf'. Se retiró.\n\n• En KA-SEC-003 se incluyó 'Tiempo objetivo de respuesta del equipo especializado: primer contacto dentro de 24 horas hábiles' — no está en 'DOCUMENTOS SOLICITADOS POR FRAUDE.pdf'. Se retiró.\n\nAmbos artículos fueron actualizados en el sandbox retirando el contenido no citable y separando en el body 'Fuente oficial' de 'Cómo lo maneja el Concierge (decisión de diseño)'. El aprendizaje se codificó en el 'Protocolo editorial — fuente vs interpretación del bot' del tab de Riesgos y guía la autoría de los 30+ artículos restantes.",
                askOfClient:
                  "Definir con el equipo de Fraud Prevention si existe un SLA oficial de primer contacto para casos de fraude materializado. Si existe, se documenta con approver y se re-añade al artículo con firma de fuente.",
              },
              {
                id: "PND-004",
                title: "Artículo extra propuesto — Política de Transportación Incluida",
                severity: "info",
                articles: ["KA-POL-009"],
                description:
                  "Durante la lectura verbatim de 'Políticas de Reservaciones LVC.pdf' se identificó una política clara y citable que NO estaba en el plan original de 41 artículos del MVP: la transportación terrestre se incluye para estancias de 4 noches o más, con requisito de agendar por email al menos 15 días antes de la llegada. Se creó como KA-POL-009 para no perder ese contenido, dado que responde directamente a Job Stories operativas del bot y complementa la política de mascotas (KA-POL-008).",
                askOfClient:
                  "Confirmar si la política de transportación incluida aplica también a Paradise Pass o solo a socios LVC (el documento fuente es específico de LVC). Con la confirmación se ajusta el Membership_Level_Applicable del artículo.",
              },
              {
                id: "PND-005",
                title: "Carpetas del repositorio KB entregado que siguen vacías",
                severity: "warning",
                description:
                  "Tres carpetas del repositorio 'PAM_Hotels_Knowledge_Base_RAG/' entregado en junio 2026 siguen sin contenido:\n\n• Marcas/ — bloquea la finalización del System Prompt del agente (brand guide PAM 2026 post-rebranding).\n\n• Llamada Sospechosa/ — bloquea el guion oficial para orientar al socio ante llamadas de reventa ANTES de que pague. Impacta cobertura completa de JS023.\n\n• Phishing/ — bloquea la construcción de la lista de dominios apócrifos conocidos y el fastpath de detección automática. Impacta cobertura completa de JS024.\n\nEl piloto de Security cubre canales oficiales (KA-SEC-001/002) y documentos requeridos en fraude materializado (KA-SEC-003), pero el guion preventivo y las listas de dominios apócrifos aún dependen de estas carpetas.",
                askOfClient:
                  "PAM (Yolanda / equipo Fraud Prevention) entrega el guion oficial de llamadas sospechosas y la guía de campañas phishing detectadas. PAM (Brand) entrega el brand guide 2026.",
              },
              {
                id: "PND-006",
                title: "UNICO Jamaica — inclusión en Paradise Pass sin confirmar",
                severity: "warning",
                articles: ["KA-PFS-009"],
                description:
                  "El fact sheet oficial de UNICO Jamaica (Montego Bay) está en el repositorio pero NO menciona Paradise Pass. Antes de publicar el Property Fact Sheet KA-PFS-009 como Online, hay que confirmar si esta propiedad está en el catálogo activable del pase o solo aplica a socios LVC.",
                askOfClient:
                  "Confirmar si un cliente con Paradise Pass puede activar noches en UNICO Jamaica. Si no, se etiqueta el artículo como Audience = LVC y se restringe el retriever para no ofrecer la propiedad a clientes PPass.",
              },
              {
                id: "PND-008",
                title: "Mecánica de Paradise Pass sin documento fuente entregado",
                severity: "blocker",
                articles: ["KA-BEN-001", "KA-BEN-002", "KA-BEN-004"],
                description:
                  "Al construir los 4 artículos Benefit & Program de Paradise Pass descubrimos que el repositorio 'PAM_Hotels_Knowledge_Base_RAG/' NO contiene un documento oficial que describa la mecánica del pase (certificado, activación, vencimiento, tarifas 4/5 vs 7/8 noches, bonus 'An Extra Dose of Paradise') ni los beneficios tangibles (Member's Bracelet, Resort Credits, eventos por invitación como Legends of Paradise 2026).\n\nSolo KA-BEN-003 (Programa de Referidos PPass) pudo crearse porque su fuente entregada — 'Programa de Referidos PPASS.pdf' — es concreta y citable.\n\nAplicando el protocolo editorial (no crear artículos sin fuente literal), los otros 3 KA-BEN-001, KA-BEN-002 y KA-BEN-004 quedan PENDIENTES en el portfolio pero NO se crean en la org hasta recibir contenido oficial. El bot podría en el interín usar información pública de paradisepass.com si el cliente lo autoriza como fuente citable temporal.",
                askOfClient:
                  "Entregar el brief oficial 2026 de Paradise Pass con: (1) mecánica completa del certificado (compra, activación, vencimiento, opciones 4/5 y 7/8 noches, bonus 'An Extra Dose of Paradise'), (2) beneficios tangibles al check-in (Member's Bracelet, Resort Credits — cómo se ganan y canjean), (3) eventos por invitación con fechas 2026 (Legends of Paradise en AVA Cancún, Summer Like Heaven, Camp Rockaway, Superbia Summer). Alternativa: autorizar scraping de paradisepass.com como fuente pública citable con marca de tiempo.",
              },
              {
                id: "PND-010",
                title: "Alinear FWD_Validation_Status__c en artículos ya Online",
                severity: "info",
                description:
                  "Los 36 artículos publicados el 2 de julio 2026 tienen PublishStatus = Online pero su campo FWD_Validation_Status__c quedó en 'Draft' porque se marcaron para publicar antes de que se implementara el ciclo Draft → In Review → Validated en el campo custom. Salesforce Knowledge NO permite editar campos de artículos Online (son read-only), por lo que ajustar el campo requiere: (a) editar el artículo — que crea automáticamente una nueva versión Draft — (b) actualizar el campo a Validated y (c) republicar la nueva versión.\n\nNo afecta el retriever (que filtra por Data Categories + Lifecycle, no por Validation_Status), pero conviene alinearlo para reportes editoriales.",
                askOfClient:
                  "Autorizar la re-versión de los 36 artículos Online para actualizar el campo FWD_Validation_Status__c a 'Validated'. Es una operación silenciosa que crea una nueva versión con el mismo contenido y republica.",
              },
              {
                id: "PND-009",
                title: "Plantilla de correo de Estado de Cuenta no entregada",
                severity: "warning",
                articles: ["KA-HOW-001"],
                description:
                  "La Job Story JS013 (Estado de Cuenta por Email) requiere que el bot dispare un correo desde Salesforce Core replicando el formato oficial actual de PAM. El repositorio KB entregado no incluye ejemplos de la plantilla de correo vigente que el equipo de finanzas usa. Sin ese ejemplo no podemos escribir KA-HOW-001 verbatim ni construir el email template en Salesforce.\n\nMientras tanto, el resto de How-To's (KA-HOW-002 a KA-HOW-007) sí se pudieron crear porque sus fuentes son los formularios PDF oficiales entregados.",
                askOfClient:
                  "PAM (Finanzas / Customer Service) entrega uno o dos ejemplos de correos de Estado de Cuenta actualmente enviados, con datos enmascarados. Con esa referencia se autora KA-HOW-001 y se construye el email template estándar de Salesforce Core.",
              },
              {
                id: "PND-007",
                title: "Tiers LVC — Legend Coins y niveles sin documentación oficial detallada",
                severity: "warning",
                description:
                  "La matriz de FAQs y el documento de tono confirman los 4 tiers LVC (Deluxe · VIP · Hall of Fame · Chairman) y la existencia de Legend Coins como moneda del programa, pero no hay un documento oficial 2026 que detalle: mecánica completa de Legend Coins (cómo se ganan, cómo se canjean, tasas por tier), beneficios exclusivos por tier y reglas de upgrade. Esta información es crítica para los artículos KA-BEN-* y para que el bot no alucine sobre tiers.",
                askOfClient:
                  "PAM entrega documento oficial 2026 de tiers LVC + mecánica completa de Legend Coins con approver Producto y Legal.",
              },
            ],
          },
        },
      },
      {
        id: "job-stories",
        label: "Job Stories",
        title: "Backlog MVP — Job Stories que entran al primer release",
        content:
          "13 Job Stories filtradas del backlog interno de PAM v2.1 — son las únicas marcadas como paquete = MVP. Cada story está clasificada por su forma de resolverse (Knowledge / datos Salesforce / handoff) y por su cobertura de Knowledge actual: qué documentos del KB ya la responden y qué falta por recibir del cliente. Al final, un resumen ejecutivo del avance del MVP.",
        jobStoriesData: {
          intro:
            "Trabajamos sobre el backlog interno de PAM (v2.1), filtrado a las 13 Job Stories del paquete MVP. El Concierge se enfoca exclusivamente en Paradise Pass — esto simplifica drásticamente el problema porque la mayor parte de la información ya vive estructurada en Salesforce (Account → Contract con RT 'BCL_PPAS' → Benefits). El RAG se reserva para mecánicas, políticas, datos de propiedades y FAQs operativas. Cada tarjeta indica: qué documento(s) del KB resuelven la story, qué está pendiente por entregar y cómo se resuelve operativamente.",
          stories: [
            {
              id: "JS001",
              epicId: "CU001",
              epicName: "Consulta de Información de Membresía y Contrato",
              name: "Consulta de Información de Membresía y Contrato",
              category: "Information & Discovery",
              cuando:
                "no recuerdo los detalles de mi nivel de membresía (Paradise Pass, Legendary o Privé)",
              yoQuiero: "consultar las características de mi contrato rápidamente",
              paraPoder:
                "saber exactamente a qué tengo derecho sin tener que buscar los papeles físicos",
              businessValue: "Incrementa la adopción del autoservicio",
              priority: "High",
              package: "MVP",
              coverage: "covered",
              resolution: "data-only",
              knowledgeSources: [
                {
                  label: "Fact Sheets de propiedades (complemento)",
                  path: "Propiedades/AVA/AVA_FACT_SHEETS/AVA_FACT_SHEET_GENERAL_SP.pdf",
                  library: "Retriever 4 · UDMO-Properties",
                  relevance:
                    "Aunque el grueso de la respuesta viene de Salesforce (Contract BCL_PPAS + Benefits con vigencias y saldos), el agente complementa con los Fact Sheets para enriquecer las respuestas: cuando el socio pregunta 'a qué tengo derecho', el agente puede sumar contexto del resort (qué incluye el all-inclusive, qué amenidades aplican, restricciones de edad por zona). Sin esto, la respuesta sería seca y solo numérica.",
                },
              ],
              pending: [
                "PAM — Mapeo de Datos Final: confirmar exactamente qué campos de Contract + Benefit le explica el agente al miembro",
              ],
            },
            {
              id: "JS002",
              epicId: "CU001",
              epicName: "Consulta de Información de Membresía y Contrato",
              name: "Gestión de Beneficiarios en Cuenta",
              category: "Information & Discovery",
              cuando:
                "tengo dudas sobre quiénes son los beneficiarios registrados en mi cuenta y quiero cambiar o agregar beneficiarios",
              yoQuiero: "revisar la lista actual de personas en mi contrato",
              paraPoder: "ver si agrego o cambio esas personas",
              businessValue:
                "Reduce el tiempo promedio de atención y llamadas operativas",
              priority: "High",
              package: "MVP",
              coverage: "out-of-scope",
              resolution: "data-only",
              pending: [
                "PAM — Eduardo Vergara debe validar el % real de migración de beneficiarios históricos (avance reportado: 90%, sin testeo completo)",
                "Bot envía form 'Beneficiary Modification' como output (PDF notarizable) — Agent Action sendForm() debe estar implementada",
              ],
            },
            {
              id: "JS003",
              epicId: "CU002",
              epicName: "Exploración de Beneficios y Programas de Intercambio",
              name: "Programa de Referidos",
              category: "Information & Discovery",
              cuando: "quiero sacar el máximo provecho a mi inversión",
              yoQuiero: "que me expliquen el programa de referidos que tengo",
              paraPoder:
                "poder mandar conocidos, familiares etc y así obtener beneficios",
              businessValue:
                "Obtención de nuevos leads, fortalecimiento de la marca generando valor y uso",
              priority: "High",
              package: "MVP",
              coverage: "covered",
              resolution: "hybrid",
              knowledgeSources: [
                {
                  label: "Programa de Referidos Paradise Pass — regla oficial 2026",
                  path: "Programa de referidos/Programa de Referidos PPASS.pdf",
                  library: "Retriever 2 · KB-Programs-FAQs",
                  relevance:
                    "Regla oficial confirmada: USD 100 de crédito por cada referido que reserve en propiedad All Inclusive · tope de 5 referidos (USD 500 máximo) · el crédito aplica al balance del certificado o a upgrade/noches adicionales si el balance ya está cubierto · si el referido cancela, se descuenta USD 100 del wallet del referidor. Acreditación: Lead en Vaclubity con datos completos del referido (nombre, teléfono, email) ligado al Contract del referidor. Esta regla REEMPLAZA la versión anterior que decía '$100 por pareja, máx 4 beneficiarios directos' (era de un programa LVC histórico diferente).",
                },
                {
                  label: "Matriz histórica LVC — referencia, NO regla activa PPass",
                  path: "Programa de referidos/PROGRAMA REFERIDOS.xlsx",
                  library: "Retriever 5 · UDMO-Operations",
                  relevance:
                    "Contiene los 5 sub-programas históricos LVC (Dynamic Referral Rewards, Referral Week, Web Rate 15%, Experience Nights, Referral Nights). Etiquetado como audience=lvc + lifecycle=legacy. El bot NO lo cita al socio PPass; sirve como contexto interno para agentes humanos cuando un socio LVC histórico pregunta por su programa.",
                },
              ],
              pending: [
                "PAM — confirmar con Eduardo Vergara / Ricardo Dueñas que los campos de identificación de programa por contrato estén poblados en Vaclubity",
                "Salesforce — implementar creación de Lead ligado al Contract del socio referidor para handoff al agente humano",
              ],
            },
            {
              id: "JS005",
              epicId: "CU003",
              epicName: "Descubrimiento de Destinos y Hoteles",
              name: "Búsqueda de Destinos con Mejor Valor",
              category: "Information & Discovery",
              cuando: "estoy planeando unas vacaciones",
              yoQuiero:
                "que me ayude a usar mis semanas donde tenga precios más competitivos o, si son gratis, en qué fechas (según temporada) las puedo usar",
              paraPoder:
                "elegir propiedad y temporalidad que más me convenga",
              businessValue:
                "Incrementa la conversión de casos a reservaciones",
              priority: "High",
              package: "MVP",
              coverage: "covered",
              resolution: "hybrid",
              knowledgeSources: [
                {
                  label: "AVA Fact Sheet",
                  path: "Propiedades/AVA/AVA_FACT_SHEETS/AVA_FACT_SHEET_GENERAL_SP.pdf",
                  library: "Retriever 4 · UDMO-Properties",
                  relevance:
                    "Sede del evento Legends of Paradise 2026 y propiedad de ultra-lujo familiar. Permite al agente describir la oferta diferenciada (categoría, amenidades premium, restaurantes) cuando el socio compara destinos para usar su semana.",
                },
                {
                  label: "Hard Rock Cancún Fact Sheet",
                  path: "Propiedades/HRHC/HRHC_FACT_SHEETS/HRHC_FACT_SHEET_ES.pdf",
                  library: "Retriever 4 · UDMO-Properties",
                  relevance:
                    "Perfil familiar en Cancún. Aporta descripción del resort, kids club, restaurantes y zonas — datos clave cuando el socio dice 'viajo con mi familia, ¿qué propiedad me conviene?'.",
                },
                {
                  label: "Hard Rock Riviera Maya Fact Sheet",
                  path: "Propiedades/HRRM /HRRM_FACT_SHEETS/HRRM_FACT_SHEET_ES.pdf",
                  library: "Retriever 4 · UDMO-Properties",
                  relevance:
                    "Caso especial: combina zona Hacienda (familiar) + Heaven (18+) en una sola propiedad. Permite al agente recomendar HRRM cuando el socio busca flexibilidad de perfiles o viaja en grupos mixtos.",
                },
                {
                  label: "UNICO Riviera Maya Fact Sheet",
                  path: "Propiedades/UNICO RIVIERA MAYA/UNICO RM_ FACT_SHEETS/UNICO_RM_Fact Sheet_ES.pdf",
                  library: "Retriever 4 · UDMO-Properties",
                  relevance:
                    "Adults-only 18+. Es la respuesta del agente cuando el socio busca un destino sin niños o quiere maximizar valor (UNICO ofrece hasta $996 USD de ahorro adicional). Permite contrastar contra propiedades Hard Rock para tomar decisión.",
                },
              ],
              pending: [
                "Flujo MVP: el agente actúa como primer filtro, crea Caso pre-documentado y escala a humano para que complete búsqueda (aprobado por Ornella Vázquez)",
              ],
            },
            {
              id: "JS010",
              epicId: "CU005",
              epicName: "Actualización de Datos de Perfil y Contacto",
              name: "Cambio de Idioma Preferido",
              category: "Self-Service & Transactions",
              cuando:
                "prefiero comunicarme en otro idioma distinto al español",
              yoQuiero:
                "cambiar mi idioma de preferencia en mi perfil a inglés o portugués",
              paraPoder: "recibir atención más cómoda y clara para mí",
              businessValue:
                "Incrementa la satisfacción del socio al brindar atención multilingüe",
              priority: "High",
              package: "MVP",
              coverage: "out-of-scope",
              resolution: "data-only",
            },
            {
              id: "JS013",
              epicId: "CU007",
              epicName: "Solicitud de Estados de Cuenta",
              name: "Estado de Cuenta por Email",
              category: "Self-Service & Transactions",
              cuando:
                "necesito comprobar mis pagos recientes o mi saldo pendiente",
              yoQuiero:
                "solicitar que me envíen mi estado de cuenta por correo electrónico",
              paraPoder:
                "tener el control de mis finanzas personales y registros de pago",
              businessValue:
                "Reduce la tasa de deflexión hacia canales digitales y reduce llamadas",
              priority: "High",
              package: "MVP",
              coverage: "out-of-scope",
              resolution: "data-only",
              pending: [
                "PAM — compartir ejemplos de plantillas de correo actuales para replicar formato desde Salesforce Core",
                "Salesforce — agregar suma del balance del contrato a nivel Core para que el campo 'balance' se muestre al cliente (los saldos individuales viven a nivel Benefit, requiere agregación)",
              ],
            },
            {
              id: "JS018",
              epicId: "CU009",
              epicName: "Notificaciones de Llegada y Cambios de Itinerario al Hotel",
              name: "Cambio de Itinerario por Emergencia",
              category: "Status & Tracking",
              cuando:
                "por una emergencia decido llegar un día después de lo planeado",
              yoQuiero:
                "avisar a la propiedad rápidamente sin tener que marcar por teléfono",
              paraPoder:
                "evitar penalizaciones injustas o la pérdida de mi habitación asegurada",
              businessValue: "Mantiene una calidad de atención consistente",
              priority: "High",
              package: "MVP",
              coverage: "out-of-scope",
              resolution: "hybrid",
              pending: [
                "PAM — identificar el OWS (Opera Web Service) exacto para inyectar la alerta de late check-in",
                "Salesforce — agregar regla: siempre preguntar si la fecha de salida cambia antes de automatizar (si cambia, escalar)",
              ],
            },
            {
              id: "JS021",
              epicId: "CU011",
              epicName: "Información sobre Políticas Críticas y de Clima",
              name: "Política de Huracán y Clima Crítico",
              category: "Problem Resolution",
              cuando:
                "hay una alerta de huracán en el destino de playa al que voy a viajar",
              yoQuiero:
                "conocer de manera urgente las políticas de protección y cancelación",
              paraPoder:
                "saber si perderé mi dinero o si tengo flexibilidad para reprogramar mi viaje",
              businessValue:
                "Mantiene la satisfacción del socio en situaciones críticas y de alta tensión",
              priority: "High",
              package: "MVP",
              coverage: "covered",
              resolution: "knowledge",
              knowledgeSources: [
                {
                  label: "Protocolo Huracán — 3 opciones oficiales",
                  path: "Política de huracán y clima/Protocolo Huracán_ En caso de una contingencia climática, Política o social, decretada formalmente por los organismos correspondientes, aplican los siguientes escenarios_.pdf",
                  library: "Retriever 1 · KB-Policies",
                  relevance:
                    "Doc oficial entregado en junio 2026 con las 3 opciones exactas que el bot debe citar: (1) Cambio de fechas/destino sin costo, dentro de 3 meses desde el levantamiento de la alerta · (2) Cancelación con saldo a favor en membresía, vigencia 12 meses, sin penalidad · (3) Reembolso, condonando penalidad SI existe alerta oficial de viaje en las fechas de la reserva (sin alerta oficial, se cobra penalidad normal). El gatillo es 'alerta oficial decretada por organismos correspondientes'. Si el socio ya está hospedado durante la contingencia, contactar Member Experience.",
                },
              ],
              pending: [
                "PAM — definir tipificación de Caso 'Huracán' (categoría / subcategoría / elemento) usando el layout entregado (1000+ tipificaciones disponibles)",
                "PAM — lógica de ruteo Omni-Channel hacia el contract owner cuando se abre el Caso",
                "PAM — confirmar definición de 'organismo correspondiente' (CONAGUA, NHC, Protección Civil) para que el bot identifique alerta válida",
              ],
            },
            {
              id: "JS023",
              epicId: "CU012",
              epicName: "Prevención de Fraudes y Seguridad",
              name: "Llamadas de Reventa Sospechosas",
              category: "Problem Resolution",
              cuando:
                "recibo una llamada extraña de un tercero ofreciendo comprar mi membresía",
              yoQuiero:
                "aclarar que antes de esto debe avisar al club por medio del agente de customer",
              paraPoder:
                "no caer en una estafa que comprometa mi dinero o mi cuenta vacacional",
              businessValue:
                "Fortalece la confianza, protege al socio y mitiga riesgos de fraude",
              priority: "High",
              package: "MVP",
              coverage: "partial",
              resolution: "knowledge",
              knowledgeSources: [
                {
                  label: "Documentos exigidos en caso de fraude",
                  path: "Fraude/DOCUMENTOS SOLICITADOS POR FRAUDE.docx.pdf",
                  library: "Retriever 3 · KB-Security",
                  relevance:
                    "Lista oficial de 5 documentos que el club exige al socio cuando ya hubo pago a un defraudador: (1) reservación fraudulenta en PDF, (2) comprobante de pago en PDF, (3) estado de cuenta bancario que muestre el pago, (4) correos del defraudador en formato .eml, (5) conversaciones de WhatsApp si aplican. El bot orienta al socio sobre qué reunir y abre Caso 'Fraude' con la tipificación correcta.",
                },
                {
                  label: "Canales oficiales LVC — referencia para detectar fraude",
                  path: "Canales Oficiales/LEGENDARY VACATION CLUB OFFICIAL COMMUNICATION CHANNELS.pdf",
                  library: "Retriever 3 · KB-Security",
                  relevance:
                    "El bot contrasta el contacto sospechoso contra los canales oficiales (dominio @legendaryvacationclub.com, teléfonos grabados, líneas de soporte) para confirmar al socio que NO es un contacto legítimo.",
                },
              ],
              pending: [
                "Carpeta Llamada Sospechosa/ del repo está VACÍA · pendiente subir el guion oficial PAM sobre cómo orientar al socio antes de que pague",
                "Documentar el guion específico de PAM (Yolanda) sobre red flags de llamadas de reventa",
                "Definir tipificación de Caso 'Fraude — Reventa' separada de 'Fraude — Pago materializado'",
              ],
            },
            {
              id: "JS024",
              epicId: "CU012",
              epicName: "Prevención de Fraudes y Seguridad",
              name: "Phishing y Seguridad de Comunicaciones",
              category: "Information & Discovery",
              cuando:
                "detecto una campaña de correos sospechosos a nombre del club",
              yoQuiero:
                "recibir orientación sobre las reglas claras de contacto y seguridad de la empresa",
              paraPoder:
                "estar completamente seguro de identificar quién me está escribiendo realmente",
              businessValue:
                "Mejora la percepción de seguridad y reduce riesgos reputacionales",
              priority: "High",
              package: "MVP",
              coverage: "partial",
              resolution: "knowledge",
              knowledgeSources: [
                {
                  label: "Canales oficiales LVC — dominios y teléfonos verificados",
                  path: "Canales Oficiales/LEGENDARY VACATION CLUB OFFICIAL COMMUNICATION CHANNELS.pdf",
                  library: "Retriever 3 · KB-Security",
                  relevance:
                    "Doc entregado en junio 2026 con la lista exhaustiva: dominio único @legendaryvacationclub.com con subdominios mkt/info/collections/memberservices · website www.legendaryvacationclub.com · teléfonos grabados (+52 998 8810573 · +52 998 8001375 · +52 998 9801985 · +52 998 2960331) · líneas de soporte por región (México 800 681 9588 · USA/CAN 1-844-LEG-4YOU · Brasil 0800-892-1449). Cualquier variante (@pamhotels-secure.net, @legendary-vacation.com, etc.) es phishing.",
                },
                {
                  label: "Email template oficial Paradise Pass",
                  path: "Estado de Cuenta-Balance/TYLER, know our official channels!.eml",
                  library: "Retriever 3 · KB-Security",
                  relevance:
                    "Plantilla oficial de PPass que confirma dominio @paradisepass.com y firma corporativa. Útil para que el bot compare el correo recibido por el socio vs el patrón legítimo.",
                },
              ],
              pending: [
                "Carpeta Phishing/ del repo está VACÍA · pendiente subir guía oficial PAM con ejemplos de campañas phishing detectadas",
                "Lista de dominios apócrifos conocidos para fastpath de detección automática (sin esperar al retriever)",
                "Confirmar dominios oficiales de PAM Hotels corporativo (separados de PPass y LVC)",
              ],
            },
            {
              id: "JS027",
              epicId: "CU014",
              epicName: "Escalamiento a Agente Humano (Contact Center)",
              name: "Handoff a Contact Center con Contexto",
              category: "Escalation & Human Handoff",
              cuando:
                "tengo un problema o queja compleja que el bot no puede entender",
              yoQuiero:
                "ser transferido a un agente humano del Contact Center con todo el historial de mi plática",
              paraPoder:
                "no tener que repetir mi número de socio ni explicar mi situación desde cero",
              businessValue:
                "Reduce la tasa de abandono y elimina la fricción en la atención",
              priority: "High",
              package: "MVP",
              coverage: "out-of-scope",
              resolution: "handoff",
              pending: [
                "PAM — gerentes del Contact Center + Isaías (TI) deben definir y crear las colas de atención exactas en Salesforce Omni-Channel",
              ],
            },
            {
              id: "JS028",
              epicId: "CU014",
              epicName: "Escalamiento a Agente Humano (Contact Center)",
              name: "Escalamiento por Disputa de Cobro",
              category: "Escalation & Human Handoff",
              cuando:
                "estoy frustrado por un malentendido con un cobro en mi estado de cuenta",
              yoQuiero: "hablar directamente con un agente de customer service",
              paraPoder:
                "obtener una solución empática, rápida y personalizada para mi caso excepcional",
              businessValue:
                "Garantiza atención consistente y evita la pérdida de clientes molestos",
              priority: "High",
              package: "MVP",
              coverage: "out-of-scope",
              resolution: "handoff",
              pending: [
                "Salesforce (FDE) — agregar prompts para diferenciar cliente calmado (sacar más info) vs molesto (transferir enseguida)",
                "PAM — estructurar con TI las colas Omni-Channel para Customer Service",
              ],
            },
            {
              id: "JS030",
              epicId: "CU015",
              epicName: "Transferencia a Agente de Reservaciones (Handoff Comercial)",
              name: "Escalamiento por Modificaciones / Cancelaciones",
              category: "Escalation & Human Handoff",
              cuando:
                "mis planes cambian y necesito modificar o cancelar una reservación existente",
              yoQuiero:
                "que el asistente de servicio me rutee al agente de reservas correspondiente",
              paraPoder:
                "poder ejecutar la modificación bajo las reglas de negocio correctas del club",
              businessValue:
                "Mantiene los límites operativos claros entre servicio al cliente y área comercial",
              priority: "High",
              package: "MVP",
              coverage: "out-of-scope",
              resolution: "handoff",
              pending: [
                "Salesforce — actualizar redacción del Job Story para reflejar que el asistente rutea a humano (no a portal de autoservicio)",
              ],
            },
          ],
          summary: {
            totalStories: 13,
            byCoverage: {
              covered: 4,
              partial: 2,
              missing: 0,
              outOfScope: 7,
            },
            byResolution: {
              knowledgeOnly: 3,
              dataOnly: 4,
              hybrid: 3,
              handoff: 3,
            },
            notes: [
              "Backlog MVP del Concierge: 13 Job Stories — las únicas con paquete = MVP en el backlog v2.1 de PAM. Las 17 restantes del backlog original quedaron como TBD, NA, Bloqueado o 'Va a backlog' para fases posteriores.",
              "Cambio mayor de junio 2026: la entrega del cliente subió de 51 a ~74 documentos. Las 3 políticas que estaban 'missing' (huracán, reventa, phishing) ahora tienen documentación oficial (covered/partial). Coverage agregada subió de 23% a 46% sobre el total MVP.",
              "JS003 (Programa de Referidos): regla oficial confirmada es USD 100 por cada referido confirmado, máximo 5 referidos por contrato (USD 500 tope). REEMPLAZA la versión anterior que decía '$100 por pareja, máx 4 beneficiarios directos' — era de un programa LVC histórico diferente.",
              "6 de 13 stories (46%) involucran Knowledge — 4 cubiertas (JS001, JS005, JS021, JS003) y 2 parciales (JS023, JS024) por carpetas internas aún vacías (Llamada Sospechosa/, Phishing/).",
              "7 stories (54%) NO requieren Knowledge: se resuelven con datos de Salesforce/Vaclubity (Account → Contract BCL_PPAS → Benefit) o con handoff humano.",
              "El cuello de botella ya NO es el contenido de Knowledge; ahora es (a) la migración de Vaclubity (beneficiarios, identificación de programa de referidos por contrato), (b) la configuración de Omni-Channel para los 3 handoffs MVP (JS027, JS028, JS030) y el Lead de referidos (JS003), y (c) la implementación de los 5 Custom Retrievers + Data Categories en la org PAM-Sandbox.",
            ],
            pendingArtifacts: [
              "Llamada Sospechosa — carpeta del repo vacía · pendiente guion oficial Yolanda (JS023)",
              "Phishing — carpeta del repo vacía · pendiente guía PAM con ejemplos de campañas detectadas (JS024)",
              "Brand Guide PAM Hotels 2026 (carpeta Marcas/ vacía — afecta System Prompt y comunicación post-rebranding)",
              "Documento oficial de tiers LVC (Deluxe/VIP/HoF/Chairman) y mecánica de Legend Coins efectividad 2026 (afecta Retriever 2)",
              "Plantillas de correo actuales para Estado de Cuenta (JS013)",
              "Suma de balance del contrato en Core (JS013) — agregación de saldos a nivel Benefit",
              "Validación del 100% de migración de Vaclubity: beneficiarios (Eduardo Vergara), identificación de programa de referidos por contrato",
              "Implementar creación de Lead ligado al Contract del socio referidor (JS003)",
              "Implementar Agent Action sendForm(trámite, idioma) para los 18 formularios oficiales (JS002, JS010 etc.)",
              "Identificación del OWS exacto de Opera para inyectar alertas de late check-in (JS018)",
              "Confirmación si UNICO Jamaica entra o no en Paradise Pass (afecta Retriever 4)",
              "Definición operativa de colas Omni-Channel para Customer Service + Reservaciones + Fraude (JS027, JS028, JS030, JS023)",
              "Implementación de los 5 Custom Retrievers (Apex) y los 4 Data Category Groups en la org PAM-Sandbox",
            ],
          },
        },
      },
      {
        id: "test-scripts",
        label: "Scripts de prueba",
        title: "Scripts de prueba Agentforce — uno por Job Story MVP",
        content:
          "15 scripts conversacionales para validar el Concierge Digital antes de pasar a UAT. Cada script está enlazado a su Job Story, define persona, canal, idioma, precondiciones de datos, transcripción esperada turn-by-turn con validaciones inline (qué Knowledge se debe citar, qué objeto Salesforce se debe leer, dónde aplica handoff), criterios de éxito y bloqueadores activos.",
        testScriptsData: {
          intro:
            "Cada script es un caso de prueba end-to-end ejecutable contra el Concierge en sandbox. Está enlazado 1:1 con su Job Story MVP. El status indica si ya se puede correr: 🟢 listo (data + KB + Salesforce listos), 🟡 parcial (corre pero hay validaciones que dependen de data/doc pendiente), 🔴 bloqueado (no se puede correr sin que PAM entregue algo). Los pins inline en cada turno (🗂 lookup · 📚 KB · 👤 handoff) son las assertions automáticas para integrar en regression.",
          scripts: [
            {
              id: "TS001",
              jobStoryId: "JS001",
              name: "Consulta de Membresía y Contrato Paradise Pass",
              status: "ready",
              persona:
                "María Clara, socia Paradise Pass desde feb-2026. Contacto: Person Account en Vaclubity con 1 Contract activo (RT BCL_PPAS) y 2 Benefits asociados — un certificado de 7 noches vigente y uno de 4 noches activado.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "Person Account 'María Clara' existe en sandbox con Phone que matchea el sender del chat",
                "Contract activo con RT = BCL_PPAS y nivel Paradise Pass",
                "2 Benefit__c con RT Certificate poblados (1 vigente, 1 activado)",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "Hola, no me acuerdo qué incluye mi membresía exactamente",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "¡Hola María Clara! Veo que tienes un Paradise Pass activo desde febrero de 2026. Tu membresía incluye 2 certificados: uno de 7 noches que sigue vigente hasta el 15 de febrero de 2027, y uno de 4 noches que ya activaste. ¿Quieres que te explique los beneficios de cada uno?",
                  dataLookup: "Account → Contract(BCL_PPAS) → Benefit__c[]",
                  knowledgeRef: "Retriever 2 · KB-Programs-FAQs (mecánica Paradise Pass)",
                  validations: [
                    "Identifica al socio por número de teléfono (Person Account lookup)",
                    "Nombra el RT correcto (Paradise Pass, NO Legendary ni Privé)",
                    "Cita fechas exactas de vencimiento desde Benefit__c, no inventa",
                    "Diferencia entre certificado 'vigente' y 'activado' según Status del Benefit",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Sí, el de 7 noches",
                },
                {
                  turn: 4,
                  role: "agent",
                  text: "Tu certificado de 7 noches te da acceso all-inclusive en cualquiera de nuestras 9 propiedades — Hard Rock, UNICO o AVA en México, República Dominicana y Jamaica. Incluye Member's Bracelet, Resort Credits canjeables en spa, aventuras y belleza, y acceso a eventos por invitación como Legends of Paradise en AVA Cancún del 6 al 13 de diciembre. ¿Te gustaría ver opciones de propiedad?",
                  knowledgeRef: "Retriever 2 · KB-Programs-FAQs + Retriever 4 · UDMO-Properties (fact sheets)",
                  validations: [
                    "NO menciona tiers LVC (Deluxe/VIP/HoF/Chairman) — esos son audience=lvc",
                    "Lista correctamente las 3 marcas y las 9 propiedades",
                    "Cita Legends of Paradise con fechas y sede correctas",
                  ],
                },
              ],
              expectedOutcome:
                "El agente responde con datos reales del contrato del socio + contexto enriquecido del KB sobre beneficios. No confunde audiencia (no menciona LVC). El socio queda informado sin necesidad de hablar con humano.",
              successCriteria: [
                "Tiempo de respuesta < 5 segundos por turno",
                "Sin alucinaciones de fechas, propiedades o beneficios",
                "Cero mención de tiers LVC en este flujo",
                "Cita al menos 1 propiedad y 1 evento por nombre exacto",
              ],
            },
            {
              id: "TS002",
              jobStoryId: "JS002",
              name: "Consulta de Beneficiarios Registrados",
              status: "partial",
              persona:
                "Roberto Méndez, titular Paradise Pass desde mar-2026. Su contrato tiene 1 cotitular (su esposa) y 2 beneficiarios adicionales registrados en Vaclubity.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "Person Account 'Roberto Méndez' identificable por teléfono",
                "Contract con RT BCL_PPAS",
                "Contract_Beneficiary__c con 3 registros vinculados al contract (cotitular + 2 adicionales)",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "¿Quiénes son los beneficiarios que tengo registrados en mi membresía?",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "Veo en tu contrato Paradise Pass 3 personas registradas: tu cotitular Ana Méndez, y 2 beneficiarios adicionales — Lucía Méndez y Diego Méndez. ¿Quieres modificar o agregar a alguien?",
                  dataLookup: "Contract → Contract_Beneficiary__c[]",
                  validations: [
                    "Lee Contract_Beneficiary__c filtrado por Contract del socio",
                    "Diferencia rol de cotitular vs beneficiarios adicionales",
                    "Cita nombres exactos sin inventar",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Sí, quiero agregar a mi sobrina",
                },
                {
                  turn: 4,
                  role: "agent",
                  text: "Para agregar un nuevo beneficiario necesito conectarte con un especialista de Customer Service. Te transfiero con el contexto de tu cuenta para que no tengas que repetir nada. Un momento.",
                  handoff: "Customer Service (Omni-Channel)",
                  validations: [
                    "NO intenta crear el beneficiario directamente (out-of-scope MVP)",
                    "Abre Case con RT correcto y adjunta resumen IA",
                    "Transfiere Messaging Session completa",
                  ],
                },
              ],
              expectedOutcome:
                "El agente lista correctamente los beneficiarios existentes y, ante la solicitud de modificación, escala a humano con contexto completo.",
              successCriteria: [
                "Lista completa y precisa (sin omisiones ni duplicados)",
                "Handoff sin pedir al usuario que repita su identidad",
                "Caso creado con tipificación correcta",
              ],
              blockers: [
                "PAM — Eduardo Vergara debe validar 100% migración de beneficiarios históricos en Vaclubity (reportado en 90%, sin testeo completo). Si la migración no está al 100%, el agente puede no encontrar registros y dará respuestas incompletas.",
              ],
            },
            {
              id: "TS003",
              jobStoryId: "JS003",
              name: "Programa de Referidos — Prelevantamiento + Lead + Handoff",
              status: "partial",
              persona:
                "Carla Restrepo, socia Paradise Pass que tiene 2 amigos interesados en comprar su propio pase. Quiere entender qué gana por referirlos.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "Contract activo con RT BCL_PPAS (campo Beneficiary Name configurado)",
                "Permiso para crear Lead ligado al Contract del referidor",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "Hola, tengo amigos interesados en comprar Paradise Pass. ¿Qué beneficios tengo por referirlos?",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "Carla, qué bueno. La regla es directa: por cada amigo que refieras y reserve en una propiedad All Inclusive, recibes USD 100 de crédito. Puedes referir hasta 5 personas, así que el máximo del programa es USD 500. El crédito se aplica al balance de tu certificado, o si ya lo tienes cubierto, lo puedes usar en upgrade de habitación o noches adicionales. Importante: si alguno de tus referidos cancela, esa parte se descuenta de tu wallet. ¿Quieres que tome los datos de tus referidos ahora?",
                  knowledgeRef:
                    "Retriever 2 · KB-Programs-FAQs · 'Programa de Referidos PPASS.pdf' (regla oficial 2026)",
                  validations: [
                    "Cita la regla oficial: USD 100 por cada referido individual (NO 'por pareja')",
                    "Menciona el tope de 5 referidos / USD 500 (NO '4 beneficiarios directos')",
                    "Explica las 3 formas de usar el crédito: balance, upgrade, noches adicionales",
                    "Menciona la penalización si el referido cancela",
                    "NO entra en detalle de sub-programas históricos LVC (Dynamic Referral Week, etc.)",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Sí, mi amigo se llama Pedro Martínez y su pareja Laura Gómez",
                },
                {
                  turn: 4,
                  role: "agent",
                  text: "Perfecto. Voy a registrar a Pedro y Laura como prospectos vinculados a tu cuenta y te conecto con un agente para que continúe el proceso contigo y ellos. Te envío al chat el número de seguimiento. Un momento.",
                  dataLookup:
                    "Create Lead (ligado a Contract.Id de Carla) con datos de Pedro y Laura como referidos",
                  handoff: "Customer Service (con caso pre-documentado)",
                  validations: [
                    "Crea Lead correctamente ligado al Contract del referidor",
                    "Caso incluye contexto: regla aplicable + datos del referido + balance actual del certificado",
                    "Agente humano recibe handoff sin que Carla repita información",
                  ],
                },
              ],
              expectedOutcome:
                "El agente explica la regla oficial 2026 del programa de referidos PPass (USD 100 × referido, hasta 5), hace un prelevantamiento (captura datos del referido), crea un Lead en Salesforce ligado al Contract del socio referidor y escala a humano para continuar el proceso.",
              successCriteria: [
                "Regla USD 100 × referido confirmado citada correctamente",
                "Tope de 5 referidos / USD 500 mencionado",
                "Penalización por cancelación del referido explicada",
                "Lead creado en Salesforce con vínculo al Contract correcto",
                "Caso de handoff incluye datos completos del referido",
              ],
              blockers: [
                "PAM — confirmar lógica de Lead-Contract para el agente referidor",
                "Salesforce — implementar creación de Lead desde el flujo del agente con campo de relación al Contract",
              ],
            },
            {
              id: "TS005",
              jobStoryId: "JS005",
              name: "Búsqueda de Destinos con Mejor Valor (filtro + handoff)",
              status: "ready",
              persona:
                "Familia López — 2 adultos + 2 niños (8 y 11 años). Buscan destino familiar para junio 2026 con su certificado Paradise Pass de 7 noches.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "Contract Paradise Pass con certificado vigente",
                "Fact Sheets cargados como UDMO Files en Data Cloud (AVA, Hard Rock, UNICO)",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "Quiero usar mi semana en junio para vacaciones en familia con dos niños",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "Para familias con niños te recomiendo nuestras propiedades familiares: Hard Rock Cancún, Hard Rock Riviera Maya (zona Hacienda), Hard Rock Vallarta, Hard Rock Los Cabos, Hard Rock Punta Cana o AVA Resort Cancún de ultra-lujo. Los UNICO quedan fuera porque son solo adultos. ¿Tienes preferencia por playa específica o presupuesto?",
                  knowledgeRef:
                    "Retriever 4 · UDMO-Properties (AVA, HRHC, HRRM, HRHV, HRLC, HRPC fact sheets)",
                  validations: [
                    "Filtra correctamente propiedades familiares y excluye adults-only",
                    "Distingue zona Hacienda (familiar) de Heaven (18+) dentro de HRRM",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Algo en el Caribe, idealmente con casino",
                },
                {
                  turn: 4,
                  role: "agent",
                  text: "Perfecto. Hard Rock Punta Cana cumple todo: Caribe, familiar y tiene casino (18+ para esa zona específica). Voy a conectarte con un agente de reservaciones con el resumen de tu búsqueda — tu certificado, fechas, preferencia Caribe + casino y perfil familiar — para que te muestre opciones reales de disponibilidad.",
                  knowledgeRef: "Retriever 4 · UDMO-Properties (HRPC fact sheet)",
                  handoff: "Reservaciones (caso pre-documentado)",
                  validations: [
                    "Identifica HRPC como única familiar+casino+Caribe",
                    "Caso creado con resumen IA completo",
                  ],
                },
              ],
              expectedOutcome:
                "El agente actúa como primer filtro inteligente, reduce el universo de 9 a 1-2 opciones según restricciones del socio, y escala a humano con contexto pre-documentado (decisión validada con Ornella Vázquez).",
              successCriteria: [
                "Recomendación correcta según perfil familiar + restricciones",
                "Caso de handoff incluye filtros, fechas y preferencia",
                "Tiempo total < 60 segundos",
              ],
            },
            {
              id: "TS006",
              jobStoryId: "JS010",
              name: "Cambio de Idioma Dinámico (ES → EN)",
              status: "ready",
              persona:
                "Sócio brasileiro residente en EE.UU., contrato registrado en portugués pero prefiere atención en inglés.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "Person Account con Preferred_Language__c = 'pt'",
                "Agent topics configurados en ES/EN/PT",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "Hi, can you help me in English please?",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "Of course! I'll continue in English. Would you also like to update your preferred language on your profile so future communications come in English, or just for this conversation?",
                  validations: [
                    "Detecta cambio de idioma en el primer turno del usuario",
                    "Pregunta explícitamente si actualizar Preferred_Language__c o solo sesión actual",
                    "NO fuerza el idioma del contrato (pt)",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Please update it permanently to English",
                },
                {
                  turn: 4,
                  role: "agent",
                  text: "Done — your preferred language is now English. All future emails and notifications will arrive in English. Anything else I can help you with?",
                  dataLookup: "Update Account.Preferred_Language__c = 'en'",
                  validations: [
                    "Escribe el cambio en Salesforce (no solo confirma verbalmente)",
                    "Confirma cambio al usuario en su idioma nuevo",
                  ],
                },
              ],
              expectedOutcome:
                "El agente detecta el idioma del usuario y se adapta sin forzar el idioma del contrato. Si el usuario lo pide explícitamente, persiste el cambio en Salesforce.",
              successCriteria: [
                "Switch ES → EN en 1 turno",
                "Pregunta explícita por persistencia",
                "Update real al campo en Salesforce",
              ],
            },
            {
              id: "TS008",
              jobStoryId: "JS013",
              name: "Solicitud de Estado de Cuenta por Email",
              status: "partial",
              persona:
                "Socio con 3 certificados activos, cada uno con saldos parciales (Resort Credits, noches consumidas).",
              channel: "Web Chat",
              language: "es",
              preconditions: [
                "Account con Email válido",
                "3 Benefit__c con Resort_Credits_Balance__c, Nights_Used__c, etc.",
                "Plantilla de correo de estado de cuenta en Salesforce Core (no Marketing Cloud)",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "Mándame mi estado de cuenta por correo, por favor",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "Claro. Voy a enviarte un resumen consolidado de tus 3 certificados a tu correo registrado [correo enmascarado]. Incluye saldos de Resort Credits, noches consumidas y vigencias. ¿Confirmas el envío?",
                  dataLookup: "Account.Email + Benefit__c[] (saldos agregados)",
                  validations: [
                    "Suma/agrupa saldos por certificado (no a nivel contrato)",
                    "Muestra email enmascarado por seguridad",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Sí",
                },
                {
                  turn: 4,
                  role: "agent",
                  text: "Enviado. Debería llegar en menos de 2 minutos. Si no lo ves, revisa spam y avísame.",
                  dataLookup: "Trigger email template desde Core (no MC)",
                  validations: [
                    "Email enviado desde Salesforce Core (decisión MVP)",
                    "Template incluye los 3 certificados con saldos correctos",
                  ],
                },
              ],
              expectedOutcome:
                "El agente extrae saldos agregados desde Benefit (no Contract), dispara email desde Salesforce Core con plantilla replicando el formato actual de PAM.",
              successCriteria: [
                "Email entregado en <2 min",
                "Saldos agregados correctamente por certificado",
                "Sin uso de Marketing Cloud (MVP)",
              ],
              blockers: [
                "PAM — compartir ejemplos de plantillas de correo actuales para que la IA pueda replicar formato",
              ],
            },
            {
              id: "TS009",
              jobStoryId: "JS018",
              name: "Cambio de Itinerario por Emergencia (late check-in)",
              status: "partial",
              persona:
                "Socia con reservación activa en HRPC, vuelo retrasado, llegará 1 día tarde pero mantiene fecha de salida.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "Reservation__c activa en HRPC con check-in mañana",
                "Conexión OWS (Opera Web Service) configurada en sandbox",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "Mi vuelo a Punta Cana se atrasó por emergencia y voy a llegar mañana en vez de hoy. ¿Pueden avisarle al hotel?",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "Por supuesto. Antes de procesar, una pregunta importante: ¿tu fecha de salida sigue siendo la misma, o también la quieres mover un día?",
                  validations: [
                    "SIEMPRE pregunta si la fecha de salida cambia (regla validada)",
                    "No automatiza nada sin la respuesta",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Mi fecha de salida sigue igual",
                },
                {
                  turn: 4,
                  role: "agent",
                  text: "Perfecto. Ya inyecté la alerta de late check-in en tu reservación de Hard Rock Punta Cana — el hotel sabrá que llegas mañana y tu habitación queda asegurada. Importante: te recomiendo contactar directamente a tu transportadora para ajustar el traslado, eso no lo manejo desde aquí. ¿Algo más?",
                  dataLookup:
                    "OWS API → inyectar alert en Reservation_Items__c (RT Transfer)",
                  validations: [
                    "Llama al OWS correcto para late check-in",
                    "NO procesa cambio de transportación (out of scope)",
                    "Confirma propiedad por nombre",
                  ],
                },
              ],
              expectedOutcome:
                "El agente automatiza la alerta vía OWS solo si la fecha de salida se mantiene; en caso contrario escala a humano. No toca transportación.",
              successCriteria: [
                "Pregunta explícita de fecha de salida ANTES de actuar",
                "Inyección OWS exitosa (verificable en Opera)",
                "Mensaje correcto sobre transportación (no automatiza)",
              ],
              blockers: [
                "PAM — identificar el OWS exacto de Opera para inyectar alertas de late check-in y validar funcionamiento a escala",
              ],
            },
            {
              id: "TS010",
              jobStoryId: "JS021",
              name: "Política de Huracán y Clima Crítico",
              status: "partial",
              persona:
                "Socio con reservación en HRPC en 5 días, alerta de huracán categoría 3 emitida por el NHC sobre el destino.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "KB Article 'Protocolo Huracán' publicado en Salesforce Knowledge con DataCategory audience=ALL · topic=Hurricane · lifecycle=Active",
                "Reservation__c activa en HRPC",
                "Tipificación de Caso 'Huracán' configurada (categoría/subcategoría/elemento del layout entregado)",
                "Cola Omni-Channel hacia contract owner definida",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "Voy para Punta Cana en 5 días y veo que hay un huracán anunciado. ¿Qué pasa con mi reservación?",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "Entiendo la preocupación, es una situación estresante. Antes de explicarte las opciones — ¿está todo bien por allá? La buena noticia es que tenemos un protocolo de huracán específico que te da flexibilidad real cuando hay una alerta oficial. ¿Quieres que repasemos las 3 opciones juntos?",
                  knowledgeRef: "Retriever 1 · KB-Policies · 'Protocolo Huracán'",
                  validations: [
                    "Tono empático antes que técnico (regla acordada con Ornella · fórmula 'Empatía + Transparencia + Alternativa')",
                    "Distingue protocolo de huracán de cancelación regular",
                    "Menciona explícitamente 'alerta oficial' como gatillo",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Sí, dime",
                },
                {
                  turn: 4,
                  role: "agent",
                  text: "Tienes 3 opciones bajo nuestro protocolo, siempre que la alerta sea decretada oficialmente por los organismos correspondientes: 1) Cambio de fechas o de destino sin costo, dentro de los 3 meses siguientes al levantamiento de la alerta. 2) Cancelación con saldo a favor en tu membresía, vigencia de 12 meses, sin penalidad. 3) Reembolso completo, condonando la penalidad regular, siempre que la alerta oficial cubra las fechas de tu reserva. Mi sugerencia es la opción 1 — reubicarte a otro destino seguro como Los Cabos o Vallarta en esas mismas fechas. ¿Te conecto con un agente para revisar disponibilidad real?",
                  knowledgeRef:
                    "Retriever 1 · KB-Policies · 'Protocolo Huracán' (3 opciones oficiales citadas literal)",
                  handoff: "Customer Service (Caso 'Huracán' tipificado · ruta a contract owner)",
                  validations: [
                    "Cita las 3 opciones EXACTAS del protocolo (cambio sin costo 3 meses · saldo a favor 12 meses · reembolso con alerta oficial)",
                    "Aclara que el gatillo es 'alerta oficial decretada por organismos correspondientes'",
                    "Sugiere reubicación primero (alineado al objetivo: proteger cash flow del club)",
                    "Crea Caso con tipificación 'Huracán' y rutea al contract owner",
                  ],
                },
              ],
              expectedOutcome:
                "Agente con tono empático, cita las 3 opciones oficiales del protocolo huracán (no inventa), distingue claramente que el gatillo es la alerta oficial, prioriza reubicación y escala a humano con Caso tipificado correctamente al contract owner.",
              successCriteria: [
                "Tono empático en primer turno (apertura con pregunta de bienestar)",
                "Las 3 opciones citadas literalmente desde el KB Article",
                "Mención explícita del gatillo 'alerta oficial' antes de prometer opciones",
                "Caso creado con tipificación 'Huracán' del layout entregado",
                "Routing correcto al contract owner (no cola general)",
              ],
              blockers: [
                "PAM — definir tipificación exacta de Caso 'Huracán' usando el layout de 1000+ tipificaciones entregado",
                "PAM — confirmar lista de organismos válidos como gatillo de alerta (NHC, CONAGUA, Protección Civil)",
                "Salesforce — implementar ruteo Omni-Channel al contract owner del socio",
              ],
            },
            {
              id: "TS011",
              jobStoryId: "JS023",
              name: "Llamada de Reventa Sospechosa (orientación + fraude)",
              status: "partial",
              persona:
                "Socio recibe llamada de tercero ofreciendo comprarle su membresía con descuento; sospecha estafa.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "KB Article 'Canales Oficiales LVC' publicado (dominios + teléfonos verificados)",
                "KB Article 'Documentos exigidos en caso de fraude' publicado (lista de 5 documentos)",
                "Tipificación 'Fraude — Reventa (Prevención)' y 'Fraude — Pago Materializado' configuradas",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "Me llamó alguien diciendo que me quiere comprar mi membresía por 5 mil dólares, ¿es real?",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "Gracias por consultarnos antes de actuar — eso ya marca una gran diferencia. Te confirmo: el club NUNCA hace ofertas de compra ni reventa de membresías por canales no oficiales. Nuestros únicos canales verificados son los teléfonos grabados (+52 998 8810573 / 8001375 / 9801985 / 2960331), el dominio @legendaryvacationclub.com y el website www.legendaryvacationclub.com. Cualquier otra vía es sospechosa. ¿Ya hiciste algún pago o compartiste datos con esa persona?",
                  knowledgeRef:
                    "Retriever 3 · KB-Security · 'Canales Oficiales LVC' (lista de teléfonos + dominio)",
                  validations: [
                    "Confirma con datos concretos que NO es contacto oficial (cita teléfonos exactos)",
                    "Cita el dominio único @legendaryvacationclub.com",
                    "Pregunta crítica: ¿ya pagaste o compartiste datos?",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "No, todavía no he pagado nada",
                },
                {
                  turn: 4,
                  role: "agent",
                  text: "Perfecto, llegaste a tiempo. Mi recomendación: 1) bloquea ese contacto, 2) no respondas más mensajes ni llamadas, 3) compárteme el teléfono o el nombre que te contactó para que quede registrado en tu cuenta. Voy a abrir un reporte preventivo de fraude — esto activa una alerta en tu cuenta y nuestro equipo de seguridad da seguimiento. ¿Me compartes el número desde el que te contactaron?",
                  dataLookup: "Create Case (Tipificación: SOLICITUD · Fraude · Reventa · Prevención)",
                  validations: [
                    "Caso preventivo creado (sin víctima materializada)",
                    "Pide datos concretos del contacto sospechoso",
                    "Tipificación específica 'Fraude — Reventa (Prevención)' del layout entregado",
                    "NO rutea a Reservaciones (regla acordada)",
                  ],
                },
              ],
              expectedOutcome:
                "Si el socio NO pagó: orienta con datos concretos (cita canales oficiales) y crea Caso preventivo. Si SÍ pagó (otra rama): explica la lista de 5 documentos exigidos (reservación PDF · comprobante de pago · estado bancario · correos .eml · WhatsApp) y escala inmediato al equipo especial.",
              successCriteria: [
                "Detecta correctamente la rama: prevención vs víctima materializada",
                "Cita canales oficiales con datos concretos (no genérico)",
                "Caso creado con tipificación correcta del layout",
                "Excluye Reservaciones del routing (regla acordada)",
              ],
              blockers: [
                "PAM (Yolanda) — subir guion oficial PAM sobre reventas (carpeta Llamada Sospechosa/ del repo está vacía)",
                "PAM — definir 2 tipificaciones separadas: 'Fraude Reventa Prevención' (sin pago) vs 'Fraude Pago Materializado' (con pago)",
              ],
            },
            {
              id: "TS012",
              jobStoryId: "JS024",
              name: "Phishing — Validación de Comunicación Oficial",
              status: "partial",
              persona:
                "Socia recibe correo sospechoso supuestamente del club pidiéndole confirmar datos bancarios; quiere validar si es real.",
              channel: "Web Chat",
              language: "es",
              preconditions: [
                "KB Article 'Canales Oficiales LVC' publicado (dominio @legendaryvacationclub.com + subdominios + teléfonos)",
                "KB Article 'Canales Oficiales Paradise Pass' publicado (dominio @paradisepass.com)",
                "Tipificación 'Phishing — Reporte Preventivo' y 'Phishing — Interacción de Riesgo' configuradas",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "Me llegó un correo de Legendary Vacation Club pidiéndome que confirme mis datos bancarios. El remitente es @legendary-vacation-secure.net. ¿Es legítimo?",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "No, ese correo NO es del club. Nuestro único dominio oficial para comunicaciones LVC es @legendaryvacationclub.com (con subdominios mkt, info, collections, memberservices). Cualquier variante como '-secure.net', '-legendary.com' o similar es phishing. Además, nunca pediríamos confirmar datos bancarios por correo — esos cambios solo se gestionan por nuestros canales oficiales: el website www.legendaryvacationclub.com o los teléfonos grabados (+52 998 8810573 / 8001375 / 9801985 / 2960331). ¿Hiciste clic en algún enlace o ingresaste datos?",
                  knowledgeRef:
                    "Retriever 3 · KB-Security · 'Canales Oficiales LVC' (dominio + subdominios + teléfonos verificados)",
                  validations: [
                    "Cita el dominio único oficial @legendaryvacationclub.com con sus 4 subdominios",
                    "Cita los 4 teléfonos grabados oficiales exactos",
                    "Identifica el patrón sospechoso ('-secure.net', '-legendary.com')",
                    "Afirma regla: nunca pedimos datos bancarios por correo",
                    "Pregunta crítica: ¿clic o datos ingresados?",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Hice clic en el enlace pero no ingresé datos",
                },
                {
                  turn: 4,
                  role: "agent",
                  text: "Buenas noticias: sin ingresar datos el riesgo es bajo. Por precaución te recomiendo: 1) escanea tu dispositivo con tu antivirus, 2) no respondas ese correo, 3) márcalo como phishing en tu cliente de correo. Voy a transferirte con Customer Service para registrar el evento y darte orientación adicional. Si en algún momento descubres que sí ingresaste datos, avísanos de inmediato — esa es otra ruta de atención más urgente.",
                  handoff: "Customer Service (Tipificación: SOLICITUD · Phishing · Interacción Sin Datos)",
                  validations: [
                    "Distingue clic-sin-datos vs datos-ingresados",
                    "Escala con tipificación correcta del layout",
                    "Da 3 pasos concretos al socio (escaneo, no responder, marcar como phishing)",
                  ],
                },
              ],
              expectedOutcome:
                "El agente actúa como filtro de validación con datos duros (cita dominios y teléfonos exactos), da tranquilidad si no hubo datos ingresados, escala con la tipificación correcta según severidad.",
              successCriteria: [
                "Dominios y teléfonos oficiales citados exactos (no genérico)",
                "Regla 'nunca pedimos datos bancarios por correo' afirmada",
                "Diferencia clic-sin-datos vs datos-ingresados",
                "Escalamiento con tipificación granular del layout",
              ],
              blockers: [
                "Carpeta Phishing/ del repo está vacía · pendiente guía oficial PAM con campañas detectadas",
                "Falta lista oficial de dominios apócrifos conocidos para fastpath",
                "Confirmar dominios oficiales PAM Hotels corporativo (separados de PPass y LVC)",
              ],
            },
            {
              id: "TS013",
              jobStoryId: "JS027",
              name: "Handoff a Contact Center con Contexto Completo",
              status: "partial",
              persona:
                "Socio con queja compleja sobre cobro doble que el agente no puede resolver autónomamente.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "Colas Omni-Channel de Customer Service configuradas",
                "Messaging Session habilitada para transferencia",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "Veo un cobro doble en mi tarjeta este mes y no entiendo. Necesito que alguien lo revise.",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "Entiendo la frustración, un cobro doble se revisa con cuidado. Voy a transferirte con un especialista de Customer Service que tiene acceso completo a tu historial de pagos. Le paso todo el contexto de tu cuenta y de esta conversación para que no tengas que repetir nada. Un momento.",
                  handoff:
                    "Customer Service (Messaging Session + Case tipificado)",
                  validations: [
                    "Transfiere Messaging Session completa",
                    "Crea Case con RT correcto",
                    "Adjunta resumen IA + análisis de sentimiento",
                    "Enruta a Customer Service (NO Reservaciones)",
                  ],
                },
              ],
              expectedOutcome:
                "Transferencia fluida con contexto completo al equipo correcto. El socio no repite identidad ni problema.",
              successCriteria: [
                "Identidad y contexto pasan al agente humano",
                "Cola correcta (Customer Service)",
                "Sentimiento adjunto",
                "Tiempo de espera < SLA acordado",
              ],
              blockers: [
                "PAM — gerentes del Contact Center + Isaías (TI) deben definir y crear las colas Omni-Channel exactas",
              ],
            },
            {
              id: "TS014",
              jobStoryId: "JS028",
              name: "Disputa de Cobro con Análisis de Sentimiento",
              status: "partial",
              persona:
                "Socia molesta por cobro no reconocido en su estado de cuenta, usa lenguaje fuerte desde el primer turno.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "Sentiment Analysis configurado en Agentforce",
                "Prompts de diferenciación (calmado vs molesto) implementados",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "Esto es un robo. Tienen un cobro mío que no autoricé, no me vengan con cuentos. Quiero hablar con un humano YA.",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "Te escucho y entiendo tu molestia. No te voy a hacer perder más tiempo conmigo — te transfiero inmediatamente con Customer Service. Te paso tu cuenta y esta conversación para que el equipo arranque con todo el contexto. Un momento.",
                  handoff: "Customer Service (escalamiento inmediato)",
                  validations: [
                    "Detecta sentimiento negativo fuerte en turno 1",
                    "NO intenta recabar más información (regla acordada)",
                    "Transfiere inmediato sin fricción",
                    "Caso incluye sentiment = high frustration",
                  ],
                },
              ],
              expectedOutcome:
                "Si sentimiento negativo fuerte → escalamiento inmediato. Si calmado → el agente recaba más detalles antes de transferir.",
              successCriteria: [
                "Sentiment Analysis detecta frustración en turno 1",
                "Sin intento de recabar más info cuando hay molestia alta",
                "Transferencia a Customer Service (no Reembolsos)",
                "Caso con sentiment flag = high",
              ],
              blockers: [
                "Salesforce (FDE) — agregar prompts específicos para diferenciar calmado (sacar info) vs molesto (transferir)",
                "PAM — estructurar colas Omni-Channel de Customer Service",
              ],
            },
            {
              id: "TS015",
              jobStoryId: "JS030",
              name: "Modificación / Cancelación de Reservación → Handoff",
              status: "ready",
              persona:
                "Socio quiere mover su reservación existente 2 semanas adelante por cambio de planes laborales.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "Reservation__c activa en sandbox",
                "Colas de Reservaciones (skills) configuradas en Omni-Channel",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "Necesito cambiar las fechas de mi reservación de Vallarta, ¿se puede?",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "Sí, las modificaciones se manejan directamente con nuestro equipo de Reservaciones. Te voy a transferir con un agente comercial que tiene acceso al sistema para hacer los cambios bajo las reglas correctas. Le paso tu reservación actual y el detalle de tu solicitud. Un momento.",
                  handoff:
                    "Reservaciones (skills-based routing en Omni-Channel)",
                  validations: [
                    "NO redirige a portal de autoservicio (regla acordada)",
                    "Rutea a Reservaciones (no Customer Service)",
                    "Adjunta detalle de la reservación actual",
                  ],
                },
              ],
              expectedOutcome:
                "El agente NO intenta procesar la modificación; transfiere directo a Reservaciones con el contexto correcto.",
              successCriteria: [
                "0 intento de modificación autónoma",
                "Ruteo correcto a Reservaciones (no CS)",
                "Caso con detalle de reservación",
              ],
            },
          ],
        },
      },
      {
        id: "demo-guion",
        label: "Demo · Guion WhatsApp",
        title: "Demo end-to-end — María Elena vive los 15 Job Stories MVP por WhatsApp",
        content:
          "Guion de demostración diseñado para probar en un solo hilo narrativo que el Concierge de Paradise Pass cumple las 15 Job Stories del MVP. Una socia real (María Elena Torres) interactúa por WhatsApp durante 4 semanas mientras planea, viaja y resuelve contingencias. Cada mensaje del bot lleva anotaciones inline con el ID de la Job Story que valida, las integraciones que ejerce (lookup Salesforce, Retriever KB, handoff Omni-Channel) y los criterios de aceptación puntuales que se verifican en ese turno.",
        demoGuionData: {
          intro:
            "5 escenas cronológicas que arman una narrativa continua: onboarding y consulta de contrato → planeación de un viaje familiar → trámites financieros → detección de fraude → contingencias durante el viaje. En total: 15 Job Stories del MVP validadas, con anotaciones inline por turno y checklist de cierre por escena. Los handoffs se muestran hasta el punto de transferencia (creación de Case + Messaging Session con contexto).",
          persona: {
            name: "María Elena Torres Villegas",
            role: "Socia Paradise Pass",
            membershipSince: "Mar 2026 (contrato PPass-2026-03-1147)",
            home: "Monterrey, Nuevo León",
            contract: "Contract RT = BCL_PPAS · 2 Benefits (7-noches vigente + 4-noches activado) · balance $1,240 USD en resort credits",
            phone: "+52 81 8112 4789 (canal WhatsApp verificado)",
            profile:
              "Contadora independiente, 38 años. Casada con Jorge (cotitular). Un hijo (Mateo, 9 años) y una hija (Sofía, 4 años). Idioma preferido: español. Ha viajado 1 vez con la membresía (Hard Rock Riviera Maya, mayo 2026). Este año quiere estrenar el certificado de 7 noches con toda la familia.",
            goals: [
              "Entender qué le cubre exactamente su Paradise Pass para el viaje de diciembre",
              "Aprovechar el programa de referidos para invitar a su hermana",
              "No perder el certificado de 4 noches que ya activó",
              "Resolver todo por WhatsApp sin llamar al Contact Center",
            ],
          },
          coverageMatrix: [
            {
              id: "JS010",
              name: "Cambio de Idioma Preferido",
              category: "Self-Service",
              sceneId: "scene-1",
              cuando: "prefiero comunicarme en otro idioma distinto al español",
              yoQuiero: "cambiar mi idioma de preferencia en mi perfil a inglés o portugués",
              paraPoder: "recibir atención más cómoda y clara para mí",
            },
            {
              id: "JS001",
              name: "Consulta de Membresía y Contrato",
              category: "Information",
              sceneId: "scene-1",
              cuando: "no recuerdo los detalles de mi nivel de membresía (Paradise Pass, Legendary o Privé)",
              yoQuiero: "consultar las características de mi contrato rápidamente",
              paraPoder: "saber exactamente a qué tengo derecho sin tener que buscar los papeles físicos",
            },
            {
              id: "JS002",
              name: "Gestión de Beneficiarios",
              category: "Information",
              sceneId: "scene-1",
              cuando: "tengo dudas sobre quiénes son los beneficiarios registrados en mi cuenta y quiero cambiar o agregar beneficiarios",
              yoQuiero: "revisar la lista actual de personas en mi contrato",
              paraPoder: "ver si agrego o cambio esas personas",
            },
            {
              id: "JS004",
              name: "Semanas Vacacionales por Expirar",
              category: "Information",
              sceneId: "scene-2",
              cuando: "tengo semanas vacacionales que están por expirar pronto",
              yoQuiero: "saber qué opciones tengo para utilizarlas",
              paraPoder: "no perder el beneficio por el que ya pagué",
            },
            {
              id: "JS003",
              name: "Programa de Referidos",
              category: "Information",
              sceneId: "scene-2",
              cuando: "quiero sacar el máximo provecho a mi inversión",
              yoQuiero: "que me expliquen el programa de referidos que tengo",
              paraPoder: "poder mandar conocidos, familiares etc. y así obtener beneficios",
            },
            {
              id: "JS005",
              name: "Búsqueda de Destinos con Mejor Valor",
              category: "Information",
              sceneId: "scene-2",
              cuando: "estoy planeando unas vacaciones",
              yoQuiero: "que me ayude a usar mis semanas donde tenga precios más competitivos o, si son gratis, en qué fechas (según temporada) las puedo usar",
              paraPoder: "elegir propiedad y temporalidad que más me convenga",
            },
            {
              id: "JS013",
              name: "Estado de Cuenta por Email",
              category: "Self-Service",
              sceneId: "scene-3",
              cuando: "necesito comprobar mis pagos recientes o mi saldo pendiente",
              yoQuiero: "solicitar que me envíen mi estado de cuenta por correo electrónico",
              paraPoder: "tener el control de mis finanzas personales y registros de pago",
            },
            {
              id: "JS011",
              name: "Actualización de Método de Pago (PCI)",
              category: "Self-Service",
              sceneId: "scene-3",
              cuando: "mi tarjeta de crédito principal expira o es reemplazada por el banco o quiero cambiar de método de pago",
              yoQuiero: "actualizar mi método de pago registrado en el sistema",
              paraPoder: "que mis cargos automáticos pasen sin problema y mi membresía siga activa",
            },
            {
              id: "JS024",
              name: "Phishing y Seguridad",
              category: "Problem Resolution",
              sceneId: "scene-4",
              cuando: "detecto una campaña de correos sospechosos a nombre del club",
              yoQuiero: "recibir orientación sobre las reglas claras de contacto y seguridad de la empresa",
              paraPoder: "estar completamente seguro de identificar quién me está escribiendo realmente",
            },
            {
              id: "JS023",
              name: "Llamadas de Reventa Sospechosas",
              category: "Problem Resolution",
              sceneId: "scene-4",
              cuando: "recibo una llamada extraña de un tercero ofreciendo comprar mi membresía",
              yoQuiero: "aclarar que antes de esto debo avisar al club por medio de un agente de Customer Service",
              paraPoder: "no caer en una estafa que comprometa mi dinero o mi cuenta vacacional",
            },
            {
              id: "JS018",
              name: "Cambio de Itinerario por Emergencia",
              category: "Status & Tracking",
              sceneId: "scene-5",
              cuando: "por una emergencia decido llegar un día después de lo planeado",
              yoQuiero: "avisar a la propiedad rápidamente sin tener que marcar por teléfono",
              paraPoder: "evitar penalizaciones injustas o la pérdida de mi habitación asegurada",
            },
            {
              id: "JS021",
              name: "Política de Huracán y Clima Crítico",
              category: "Problem Resolution",
              sceneId: "scene-5",
              cuando: "hay una alerta de huracán en el destino de playa al que voy a viajar",
              yoQuiero: "conocer de manera urgente las políticas de protección y cancelación",
              paraPoder: "saber si perderé mi dinero o si tengo flexibilidad para reprogramar mi viaje",
            },
            {
              id: "JS028",
              name: "Escalamiento por Disputa de Cobro",
              category: "Handoff",
              sceneId: "scene-5",
              cuando: "estoy frustrado por un malentendido con un cobro en mi estado de cuenta",
              yoQuiero: "hablar directamente con un agente de Customer Service",
              paraPoder: "obtener una solución empática, rápida y personalizada para mi caso excepcional",
            },
            {
              id: "JS030",
              name: "Escalamiento por Modificaciones",
              category: "Handoff",
              sceneId: "scene-5",
              cuando: "mis planes cambian y necesito modificar o cancelar una reservación existente",
              yoQuiero: "que el asistente me rutee a un agente humano de reservas",
              paraPoder: "poder ejecutar la modificación bajo las reglas de negocio correctas del club",
            },
            {
              id: "JS027",
              name: "Handoff a Contact Center con Contexto",
              category: "Handoff",
              sceneId: "scene-5",
              cuando: "tengo un problema o queja compleja que el bot no puede entender",
              yoQuiero: "ser transferido a un agente humano del Contact Center con todo el historial de mi plática",
              paraPoder: "no tener que repetir mi número de socio ni explicar mi situación desde cero",
            },
          ],
          scenes: [
            {
              id: "scene-1",
              order: 1,
              title: "Escena 1 · Reconociendo al socio y su contrato",
              subtitle: "María Elena inicia contacto por primera vez en WhatsApp — el bot la identifica, atiende preferencia de idioma y le muestra su membresía",
              contextDay: "Martes 3 de noviembre, 21:14 — María Elena guarda al hijo, se sienta con el celular, quiere planear diciembre",
              narrative:
                "Primer contacto por WhatsApp Business. El agente debe identificarla por número de teléfono, respetar su idioma de conversación, mostrar los detalles del contrato Paradise Pass (no confundir con LVC/Privé) y responder consultas sobre beneficiarios. Aquí se valida el fundamento: identidad, idioma, contract lookup, beneficiary lookup, y el límite del MVP (no crea/edita beneficiarios, envía formulario).",
              jobStoriesCovered: [
                { jobStoryId: "JS010", label: "Cambio de Idioma Preferido", description: "El bot detecta idioma de entrada y ofrece registrarlo como preferencia" },
                { jobStoryId: "JS001", label: "Consulta de Membresía y Contrato", description: "Lookup Account → Contract(BCL_PPAS) → Benefit__c[] con fechas y estados" },
                { jobStoryId: "JS002", label: "Gestión de Beneficiarios", description: "Lookup Contract_Beneficiary__c y envío de formulario PDF vía sendForm()" },
              ],
              turns: [
                {
                  turn: 1,
                  role: "user",
                  text: "Hola, me llegó tu número en un correo del club. ¿Aquí puedo ver los detalles de mi membresía?",
                  timestamp: "21:14",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "¡Hola María Elena! 👋 Soy el Concierge Digital de Paradise Pass. Sí, aquí mismo puedo ayudarte. Veo que tienes una membresía Paradise Pass activa desde marzo de 2026. ¿En qué te puedo apoyar hoy?",
                  timestamp: "21:14",
                  dataLookup: "Account (Person Account) por Phone = +52 81 8112 4789",
                  jobStoryIds: ["JS001"],
                  validations: [
                    "Identifica al socio por número de teléfono verificado en Vaclubity",
                    "Nombra correctamente el programa (Paradise Pass, NO 'Legendary' ni 'Privé')",
                    "Saluda con nombre real, no genérico",
                    "Cita fecha real de inicio de membresía desde el Contract",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "¿Me podrías atender en portugués? Mi esposo es de São Paulo y quiero enseñarle esto",
                  timestamp: "21:15",
                },
                {
                  turn: 4,
                  role: "agent",
                  text: "Claro que sí. Passo para o português. 🇧🇷 Antes de continuar: ¿quieres que registre el portugués como tu idioma preferido para futuras comunicaciones del club, o solo lo usamos en esta conversación?",
                  timestamp: "21:15",
                  jobStoryIds: ["JS010"],
                  validations: [
                    "Cambia el idioma de conversación dinámicamente sin forzar el idioma registrado",
                    "Pregunta explícitamente si actualizar el registro (opt-in, no impone)",
                    "NO asume — respeta la regla de negocio de JS010",
                  ],
                },
                {
                  turn: 5,
                  role: "user",
                  text: "Solo cambia el idioma por esta conversación, no lo guardes como mi preferencia. Regresemos al español. Necesito ver el detalle completo de mi contrato Paradise Pass — beneficios, certificados, vigencias y saldos.",
                  timestamp: "21:16",
                },
                {
                  turn: 6,
                  role: "agent",
                  text:
                    "Perfecto, en español seguimos. Aquí está el resumen de tu Paradise Pass:\n\n📋 *Contrato PPass-2026-03-1147*\n• Titular: María Elena Torres · Cotitular: Jorge Almeida\n• Vigencia del contrato: 15 mar 2026 – 15 mar 2027\n\n🎫 *Certificados asociados*\n1. Certificado de 7 noches — Vigente ✅ (por usar hasta 15 feb 2027)\n2. Certificado de 4 noches — Activado ✅ (usado en Hard Rock Riviera Maya, mayo 2026)\n\n💳 *Resort Credits*: 1,240 USD disponibles\n\n¿Qué te gustaría hacer? Puedo profundizar en cualquiera de estos puntos.",
                  timestamp: "21:16",
                  dataLookup: "Account → Contract(BCL_PPAS) → Benefit__c[] (RT Certificate)",
                  knowledgeRef: "Retriever 2 · KB-Programs-FAQs (KA-BEN-001, KA-BEN-002)",
                  jobStoryIds: ["JS001"],
                  validations: [
                    "Lista los 2 Benefits reales con sus Status ('vigente', 'activado') desde el campo Benefit__c.Status__c",
                    "Diferencia estados sin inventar fechas — todas las vigencias salen del objeto",
                    "Cita el número de Contract exacto",
                    "Nombra al cotitular real (Jorge Almeida) leído del contract",
                    "NO menciona tiers LVC (Deluxe/VIP/Hall of Fame/Chairman) — audience filter",
                    "Complementa con KB (Members Bracelet, Resort Credits) sin inventar reglas",
                  ],
                },
                {
                  turn: 7,
                  role: "user",
                  text: "Y quiénes tengo registrados como beneficiarios? Quiero agregar a mi hija Sofía",
                  timestamp: "21:18",
                },
                {
                  turn: 8,
                  role: "agent",
                  text:
                    "En tu contrato tengo registrados 3 beneficiarios:\n\n👥 *Beneficiarios en tu Paradise Pass*\n1. Jorge Almeida — cotitular\n2. Mateo Torres Almeida — beneficiario adicional\n3. Ana Torres (tu hermana) — beneficiario adicional\n\nSofía todavía no está registrada. Para agregar un nuevo beneficiario necesito enviarte el formulario oficial (es notariable y lo tiene que revisar Customer Service). Te lo mando en un momento. ¿Está bien?",
                  timestamp: "21:18",
                  dataLookup: "Contract → Contract_Beneficiary__c[] filtrado por Contract del socio",
                  jobStoryIds: ["JS002"],
                  validations: [
                    "Lee Contract_Beneficiary__c filtrado por Contract del socio",
                    "Diferencia el rol cotitular vs beneficiario adicional",
                    "Cita nombres exactos sin alucinar",
                    "NO intenta crear el beneficiario directamente (out-of-scope MVP)",
                    "Anuncia que enviará formulario oficial (sendForm)",
                  ],
                },
                {
                  turn: 9,
                  role: "user",
                  text: "Sí, envíame el formulario de modificación de beneficiarios para poder agregar a Sofía. Explícame también cómo lo devuelvo firmado por este mismo chat.",
                  timestamp: "21:19",
                },
                {
                  turn: 10,
                  role: "agent",
                  text:
                    "Listo, aquí tienes el formulario de Beneficiary Modification. Llénalo con los datos de Sofía (nombre completo, fecha de nacimiento, CURP), fírmalo, y respóndeme por este mismo chat con el PDF firmado. Yo lo escalo con Customer Service para que lo procesen.\n\n📎 *Beneficiary_Modification_Form.pdf*",
                  timestamp: "21:19",
                  attachment: {
                    type: "form",
                    label: "Formulario oficial de modificación de beneficiarios",
                    filename: "Beneficiary_Modification_Form.pdf",
                  },
                  jobStoryIds: ["JS002"],
                  validations: [
                    "Ejecuta Agent Action sendForm() con el PDF correcto",
                    "Da instrucciones claras de cómo llenarlo y devolverlo",
                    "Anticipa que el flujo termina en handoff a Customer Service (sin ejecutar la creación)",
                  ],
                },
              ],
              outcome:
                "María Elena identificada, contrato mostrado con datos reales, beneficiarios listados, formulario entregado por chat. Cero llamadas al Contact Center. Sin alucinación de datos ni confusión de audiencia.",
              jsChecklist: [
                {
                  jobStoryId: "JS010",
                  name: "Cambio de Idioma Preferido",
                  validated: [
                    "Cambia idioma en tiempo real (portugués/español) sin forzar idioma registrado",
                    "Pregunta si guardar como preferencia (opt-in explícito)",
                    "NO altera el registro sin confirmación",
                  ],
                },
                {
                  jobStoryId: "JS001",
                  name: "Consulta de Membresía y Contrato",
                  validated: [
                    "Lookup nativo Salesforce Account → Contract(RT BCL_PPAS) → Benefit__c",
                    "Cita 100% de los datos desde el modelo (sin alucinación)",
                    "Diferencia estados de Benefit (vigente vs activado)",
                    "Zero mentions de tiers LVC (filtro de audiencia correcto)",
                  ],
                },
                {
                  jobStoryId: "JS002",
                  name: "Gestión de Beneficiarios",
                  validated: [
                    "Lookup Contract_Beneficiary__c[] con relación al Contract",
                    "Diferencia cotitular vs beneficiario adicional",
                    "sendForm() con el PDF oficial de Beneficiary Modification",
                    "NO intenta modificar directamente (respeta scope MVP)",
                  ],
                  residualRisk: "Falta validar % migración histórica de beneficiarios en Vaclubity (Eduardo Vergara, reportado 90%)",
                },
              ],
            },
            {
              id: "scene-2",
              order: 2,
              title: "Escena 2 · Planeando el viaje de fin de año",
              subtitle: "María Elena quiere usar sus semanas antes de que expiren, entender su programa de referidos e invitar a su hermana, y buscar la mejor propiedad para viajar en familia",
              contextDay: "Sábado 7 de noviembre, 10:32 — desayuno familiar, revisando calendario del cierre de año",
              narrative:
                "El bot debe alertar sobre semanas por expirar (regla: ventana de 12 meses, incluso las 'expiradas' se pueden usar), explicar el programa de referidos con la regla oficial 2026 ($100 USD × 5, no la vieja regla LVC), y hacer un pre-filtrado de destinos capturando preferencias para escalar el detalle a un agente humano.",
              jobStoriesCovered: [
                { jobStoryId: "JS004", label: "Semanas Vacacionales por Expirar", description: "Alerta 12 meses antes y regla 'flexibilidad': Certificate Expired NO significa perdido" },
                { jobStoryId: "JS003", label: "Programa de Referidos", description: "Regla 2026: USD 100 × 5 referidos, Lead en Vaclubity, penalización si cancela" },
                { jobStoryId: "JS005", label: "Búsqueda de Destinos con Mejor Valor", description: "Bot captura preferencias, crea Case y escala a agente humano para búsqueda real" },
              ],
              turns: [
                {
                  turn: 1,
                  role: "user",
                  text: "Buen día! Ya estoy planeando el viaje de fin de año. ¿Cuándo se me vence el certificado de 7 noches?",
                  timestamp: "10:32",
                },
                {
                  turn: 2,
                  role: "agent",
                  text:
                    "¡Buen día! Tu certificado de 7 noches vence el 15 de febrero de 2027 — o sea que si viajas en diciembre estás totalmente dentro de la ventana. 👌\n\nAdemás, quería avisarte de algo importante: aunque un certificado marque una fecha de 'expirado', operativamente el club te sigue permitiendo usarlo. Nunca lo pierdes. Aún así, mientras más temprano lo agendes mejor, porque en temporada alta las mejores propiedades se llenan rápido.",
                  timestamp: "10:32",
                  dataLookup: "Benefit__c.Expiration_Date__c del certificado de 7 noches",
                  knowledgeRef: "Retriever 3 · KB-Policies (regla de flexibilidad Paradise Pass — nunca decir 'perdiste el beneficio')",
                  jobStoryIds: ["JS004"],
                  validations: [
                    "Lee la fecha exacta de expiración desde Benefit__c (no alucinada)",
                    "Aplica la regla de negocio de Paradise Pass: aunque esté 'Expired', operativamente se sigue usando",
                    "Nunca dice 'perdiste el beneficio' (regla dura del cliente para retención)",
                    "Incentiva agendar temprano sin generar ansiedad",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Genial. Oye, mi hermana Ana también quiere entrar al club — dijo que tengo un programa de referidos, ¿cómo funciona?",
                  timestamp: "10:34",
                },
                {
                  turn: 4,
                  role: "agent",
                  text:
                    "¡Excelente noticia! 🎉 Tu programa de referidos de Paradise Pass 2026 funciona así:\n\n💰 *Regla*: USD 100 de crédito por cada referido que reserve en alguna propiedad All Inclusive\n👥 *Tope*: hasta 5 referidos → máximo USD 500 en créditos\n💳 *Aplicación*: el crédito se suma al balance de tu certificado. Si tu balance ya está cubierto, se puede usar para noches extra o upgrade de habitación\n⚠️ *Importante*: si el referido cancela su reserva, se te descuentan los USD 100 del wallet\n\nPara acreditar a Ana necesito crear un Lead con sus datos (nombre completo, teléfono, email) ligado a tu contrato. ¿Me los compartes?",
                  timestamp: "10:34",
                  dataLookup: "Contract.Referral_Program__c (identificador del programa vigente)",
                  knowledgeRef: "Retriever 2 · KB-Programs-FAQs · KA-BEN-003 (Programa de Referidos Paradise Pass · $100 USD × 5)",
                  jobStoryIds: ["JS003"],
                  validations: [
                    "Cita la regla oficial 2026 EXACTA: USD 100 × referido, hasta 5, tope USD 500",
                    "NO menciona la regla vieja de '$100 por pareja' ni '4 beneficiarios directos' (ese era LVC histórico)",
                    "Menciona la penalización por cancelación (regla del contrato)",
                    "Anticipa la creación de Lead en Vaclubity con relación al Contract",
                  ],
                },
                {
                  turn: 5,
                  role: "user",
                  text: "Ana Torres Villegas, +52 81 8156 3320, ana.torresv@gmail.com",
                  timestamp: "10:35",
                },
                {
                  turn: 6,
                  role: "agent",
                  text:
                    "Listo, capturé los datos de Ana. Te confirmo que quedó registrada como referido tuyo:\n\n📋 *Referido creado*\n• Nombre: Ana Torres Villegas\n• Contacto: +52 81 8156 3320 · ana.torresv@gmail.com\n• Ligado al contrato: PPass-2026-03-1147\n• Estatus: Pendiente de reservación\n\nCuando Ana confirme su reservación y se registre en la propiedad, los USD 100 se acreditan a tu wallet automáticamente. Te avisaré por aquí cuando eso pase.",
                  timestamp: "10:35",
                  dataLookup: "INSERT Lead (RT = Referral) con LinkedContract__c = Contract del socio",
                  jobStoryIds: ["JS003"],
                  validations: [
                    "Crea Lead en Vaclubity vinculado al Contract del referidor (no huérfano)",
                    "Confirma con datos capturados literales — sin invención",
                    "Explica claramente cuándo se materializa el crédito",
                  ],
                },
                {
                  turn: 7,
                  role: "user",
                  text: "Perfecto. Ahora, mi otra pregunta: ¿en qué propiedad me conviene más usar mi certificado de 7 noches? Vamos a viajar 4 personas — mi esposo, mis 2 niños de 9 y 4, y yo. Del 20 al 27 de diciembre",
                  timestamp: "10:37",
                },
                {
                  turn: 8,
                  role: "agent",
                  text:
                    "Con esas fechas y perfil familiar tengo 2 recomendaciones inmediatas basadas en tu certificado prepagado:\n\n🏝 *AVA Resort Cancún* — concepto familiar de ultra-lujo con áreas segmentadas (kids club robusto, ideal para Mateo de 9 y Sofía de 4). Es propiedad estrella del club.\n🎸 *Hard Rock Hotel Riviera Maya* — ya la conoces, muy family-friendly, con muchas actividades para niños.\n\nOJO: UNICO 20°87° es solo adultos (Sofía y Mateo no pueden entrar) y HRRM Heaven también es adults-only.\n\nPara darte precios exactos y disponibilidad del 20 al 27 dic, te voy a conectar con un agente de reservaciones. Ya tengo listas todas tus preferencias y él te contactará con opciones aterrizadas en un plazo corto. ¿Te parece?",
                  timestamp: "10:37",
                  dataLookup: "Benefit__c del certificado 7 noches + status",
                  knowledgeRef: "Retriever 4 · UDMO-Properties (fact sheets AVA, HRRM) + Retriever 2 · KB-FAQ-002/003 (UNICO/Heaven adults-only)",
                  jobStoryIds: ["JS005"],
                  validations: [
                    "Filtra propiedades con reglas duras (edad mínima) antes de recomendar",
                    "Cita textualmente que UNICO y Heaven son solo adultos (KA-FAQ-002/003)",
                    "NO intenta cotizar o reservar — captura preferencias y anuncia handoff",
                    "Referencia el certificado prepagado real, no genérico",
                  ],
                },
                {
                  turn: 9,
                  role: "user",
                  text: "Adelante, conéctame con un agente de reservaciones. Que tenga listo el contexto: certificado de 7 noches, fechas 20–27 dic, 2 adultos y 2 niños, propiedades familiares. Preferiría no repetir la información.",
                  timestamp: "10:38",
                },
                {
                  turn: 10,
                  role: "agent",
                  text:
                    "Perfecto. Estoy creando un caso con toda la información pre-documentada para que el agente de reservaciones no te haga repetir nada:\n\n📄 *Caso creado — CASE-2026-11-08-4421*\n• Certificado: 7 noches vigente\n• Fechas objetivo: 20–27 dic 2026\n• Viajeros: 4 (2 adultos, 2 menores de 9 y 4)\n• Preferencias: propiedad familiar, filtradas Hard Rock Riviera Maya y AVA Cancún\n• Restricciones: UNICO y Heaven descartadas por edad\n\nUn agente de reservaciones te va a contactar por este mismo WhatsApp con opciones y precios. Mientras tanto, si tienes otra pregunta yo te sigo apoyando.",
                  timestamp: "10:38",
                  handoff: "Reservaciones · Omni-Channel Queue (Salesforce Case + Messaging Session)",
                  jobStoryIds: ["JS005"],
                  validations: [
                    "Crea Case tipificado con RT correcto (Reservaciones · Pre-Sales)",
                    "Case documenta certificado, fechas, viajeros, preferencias, filtros aplicados",
                    "Transfiere Messaging Session completa (agente humano no arranca de cero)",
                    "Ruteo a la cola de Reservaciones (no Customer Service — sub-área correcta)",
                    "Bot NO cierra el chat, sigue disponible",
                  ],
                },
              ],
              outcome:
                "Semana por expirar contextualizada sin miedo al cliente, referido creado como Lead ligado al Contract, viaje pre-documentado y escalado a Reservaciones con contexto completo. Bot no invade el rol del agente humano y no aluciona reglas de referidos.",
              jsChecklist: [
                {
                  jobStoryId: "JS004",
                  name: "Semanas Vacacionales por Expirar",
                  validated: [
                    "Lee Expiration_Date__c del Benefit real",
                    "Aplica ventana de 12 meses",
                    "Aplica regla de flexibilidad Paradise Pass (Expired sigue reservable)",
                    "Nunca usa lenguaje de pérdida",
                  ],
                  residualRisk: "Falta lista de Web Services de Sabre para disponibilidad real (dependencia TI PAM · Ricardo Dueñas)",
                },
                {
                  jobStoryId: "JS003",
                  name: "Programa de Referidos",
                  validated: [
                    "Cita regla oficial 2026 (USD 100 × 5)",
                    "Cero mención de reglas LVC históricas (audience filter)",
                    "Crea Lead en Vaclubity ligado al Contract del referidor",
                    "Menciona penalización si el referido cancela",
                  ],
                },
                {
                  jobStoryId: "JS005",
                  name: "Búsqueda de Destinos con Mejor Valor",
                  validated: [
                    "Filtra por reglas duras (edad mínima) antes de recomendar",
                    "NO intenta cotizar/reservar",
                    "Crea Case con contexto pre-documentado",
                    "Handoff a cola de Reservaciones con Messaging Session completa",
                  ],
                },
              ],
            },
            {
              id: "scene-3",
              order: 3,
              title: "Escena 3 · Trámites financieros — estado de cuenta y actualización de tarjeta",
              subtitle: "María Elena pide su estado de cuenta y aprovecha para actualizar su tarjeta antes de que expire",
              contextDay: "Miércoles 18 de noviembre, 08:47 — de camino a la oficina, revisando pagos del mes",
              narrative:
                "Dos self-services del MVP: el bot genera y envía el estado de cuenta consolidando balances a nivel Benefit (no Contract), y ante actualización de tarjeta respeta PCI — nunca captura datos de tarjeta en WhatsApp, envía Pay Token URL segura.",
              jobStoriesCovered: [
                { jobStoryId: "JS013", label: "Estado de Cuenta por Email", description: "Envío desde Salesforce Core (no MC), consolidando balances por Benefit" },
                { jobStoryId: "JS011", label: "Actualización de Método de Pago (PCI)", description: "Bot NUNCA captura tarjeta en chat; envía Pay Token URL" },
              ],
              turns: [
                {
                  turn: 1,
                  role: "user",
                  text: "Hola, ¿me puedes enviar mi estado de cuenta al correo? Necesito revisarlo con mi contador",
                  timestamp: "08:47",
                },
                {
                  turn: 2,
                  role: "agent",
                  text:
                    "¡Claro! ¿Te lo envío al correo que tengo en tu contrato — mariaelena.torres@gmail.com — o prefieres otro?",
                  timestamp: "08:47",
                  dataLookup: "Account.PersonEmail",
                  jobStoryIds: ["JS013"],
                  validations: [
                    "Lee el email desde el Account del socio (no pide dato ya conocido innecesariamente)",
                    "Confirma antes de enviar — respeta privacidad",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Sí, envíamelo a ese correo (mariaelena.torres@gmail.com). Que incluya balance por certificado, historial de uso reciente y próximo pago anual.",
                  timestamp: "08:48",
                },
                {
                  turn: 4,
                  role: "agent",
                  text:
                    "Perfecto. Estoy generando el estado de cuenta consolidado por certificado. Debería llegarte en máximo 2 minutos.\n\n📧 *Enviado a mariaelena.torres@gmail.com*\nAsunto: 'Tu estado de cuenta Paradise Pass — Noviembre 2026'\nIncluye:\n• Certificado 7 noches — balance disponible USD 1,240\n• Certificado 4 noches — activado (histórico de uso mayo 2026)\n• Programa de referidos — 0 acreditados / 5 disponibles\n• Próximo pago anual: 15 mar 2027",
                  timestamp: "08:48",
                  dataLookup: "Aggregate SUM(Benefit__c.Balance__c) por Contract · pull last N transacciones",
                  jobStoryIds: ["JS013"],
                  validations: [
                    "Agrega balances a nivel Benefit__c (regla técnica confirmada)",
                    "Genera y envía email desde Salesforce Core (no Marketing Cloud en MVP)",
                    "Template incluye certificados, referidos, próximo pago",
                    "Datos leídos desde el modelo (no alucinados)",
                  ],
                },
                {
                  turn: 5,
                  role: "user",
                  text: "Súper. Aprovecho: mi tarjeta con la que pago la anualidad vence en enero. ¿Cómo la actualizo?",
                  timestamp: "08:49",
                },
                {
                  turn: 6,
                  role: "agent",
                  text:
                    "Buen momento para actualizarla. Por seguridad, *NO capturo datos de tarjeta por WhatsApp* — cumplimos con las normas PCI que exige la industria. 🔒\n\nTe voy a enviar en un momento un enlace seguro donde puedes ingresar tu nueva tarjeta directamente en nuestro portal de pagos. El enlace es único, temporal (dura 24 horas) y solo tú lo puedes usar. ¿Te lo mando?",
                  timestamp: "08:49",
                  jobStoryIds: ["JS011"],
                  validations: [
                    "Explícitamente NO pide datos de tarjeta en WhatsApp",
                    "Explica PCI en lenguaje del cliente (seguridad, no jerga)",
                    "Confirma antes de enviar el link (opt-in)",
                  ],
                },
                {
                  turn: 7,
                  role: "user",
                  text: "Sí, mándame el enlace seguro para actualizar mi tarjeta. Quiero cambiar la que tengo registrada para que pase el próximo cargo anual sin problemas.",
                  timestamp: "08:49",
                },
                {
                  turn: 8,
                  role: "agent",
                  text:
                    "Aquí tienes:\n\n🔗 *https://pay.paradisepass.com/token/1a5c-9f42-b8d1*\n(vigencia: hasta el 19 nov 2026, 08:49)\n\nCuando termines de actualizarla, avísame por aquí y te confirmo que quedó registrada. ¿Algo más en lo que te pueda ayudar?",
                  timestamp: "08:49",
                  attachment: {
                    type: "link",
                    label: "Pay Token URL segura (single-use, expira 24h)",
                    filename: "https://pay.paradisepass.com/token/1a5c-9f42-b8d1",
                  },
                  jobStoryIds: ["JS011"],
                  validations: [
                    "Renderiza URL de Pay Token desde el backend (no hardcoded)",
                    "Comunica vigencia y single-use",
                    "Ofrece seguimiento posterior sin cerrar el chat",
                  ],
                },
              ],
              outcome:
                "Estado de cuenta enviado desde Salesforce Core con balance consolidado por Benefit. Actualización de tarjeta gestionada 100% cumpliendo PCI (Pay Token URL, cero captura de datos sensibles en WhatsApp).",
              jsChecklist: [
                {
                  jobStoryId: "JS013",
                  name: "Estado de Cuenta por Email",
                  validated: [
                    "Confirma email de destino antes de enviar",
                    "Consolida balances a nivel Benefit (regla técnica)",
                    "Salida desde Salesforce Core (MVP decision)",
                    "Sin alucinación de saldos",
                  ],
                  residualRisk: "Falta plantilla email exacta de PAM para cruzar campos (dependencia PAM)",
                },
                {
                  jobStoryId: "JS011",
                  name: "Actualización de Método de Pago (PCI)",
                  validated: [
                    "NO captura tarjeta en WhatsApp (PCI compliant)",
                    "Envía Pay Token URL segura con vigencia acotada",
                    "Explica el 'por qué' de la seguridad en lenguaje del cliente",
                  ],
                  residualRisk: "TI PAM debe documentar cómo la IA solicita/renderiza la URL en tiempo real (dependencia Juan Carlos Torres)",
                },
              ],
            },
            {
              id: "scene-4",
              order: 4,
              title: "Escena 4 · Comunicaciones sospechosas",
              subtitle: "María Elena recibe un correo raro y una llamada extraña — el bot valida canales oficiales y detecta fraude materializado",
              contextDay: "Jueves 26 de noviembre, 14:03 — hora de comida, María Elena revisa la bandeja de spam por si algo se coló",
              narrative:
                "Dos flujos de seguridad del MVP. En JS024 el bot da los dominios oficiales para que el socio valide. En JS023 el flujo bifurca: si es sospecha, se explica; si es fraude materializado (pagó a un tercero), se escala directo a Customer Service con creación de Case y transferencia de la Messaging Session.",
              jobStoriesCovered: [
                { jobStoryId: "JS024", label: "Phishing y Seguridad de Comunicaciones", description: "Bot cita canales oficiales; si el usuario ya hizo clic/dio pass, escala inmediato" },
                { jobStoryId: "JS023", label: "Llamadas de Reventa Sospechosas", description: "Rama orientativa vs rama de fraude materializado → handoff a CS con Case" },
              ],
              turns: [
                {
                  turn: 1,
                  role: "user",
                  text: "Oye, me llegó un correo diciendo que soy elegible para 'canjear puntos duplicados' y me pide entrar a un link. ¿Es del club?",
                  timestamp: "14:03",
                },
                {
                  turn: 2,
                  role: "agent",
                  text:
                    "Buena señal que preguntes antes de hacer clic. 🚨 Los correos oficiales de Paradise Pass y Legendary Vacation Club siempre salen del dominio *@legendaryvacationclub.com*. Cualquier otro remitente (@vacationsclub.net, @rewards-paradise.com, gmails, hotmails) NO es nuestro.\n\n¿Podrías compartirme el remitente del correo y una captura si es posible? Con eso te confirmo al 100% si es phishing.",
                  timestamp: "14:03",
                  knowledgeRef: "Retriever 3 · KB-Security · KA-SEC-002 (Canales Oficiales Paradise Pass)",
                  jobStoryIds: ["JS024"],
                  validations: [
                    "Cita el dominio oficial verbatim desde KA-SEC-002 (no inventado)",
                    "Enumera terminaciones sospechosas comunes",
                    "Pide evidencia (remitente / captura) antes de confirmar",
                    "Tono empático, no alarmista",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Es de @rewards-paradise.com. Y ya casi le pico al link jaja qué susto",
                  timestamp: "14:04",
                },
                {
                  turn: 4,
                  role: "agent",
                  text:
                    "Ese remitente NO es del club — es phishing. Por favor:\n\n1. NO hagas clic en el link\n2. Elimina el correo (o márcalo como spam)\n3. Si ya hiciste clic o ingresaste alguna contraseña, avísame INMEDIATAMENTE porque tengo que escalarte a nuestro equipo de seguridad\n\n¿Alcanzaste a hacer clic o solo lo viste?",
                  timestamp: "14:04",
                  knowledgeRef: "Retriever 3 · KB-Security · KA-SEC-002 (protocolo phishing)",
                  jobStoryIds: ["JS024"],
                  validations: [
                    "Confirma la sospecha sin ambigüedad",
                    "Da acciones concretas",
                    "Aplica la regla dura: si ya hizo clic/dio credencial → escalamiento inmediato",
                  ],
                },
                {
                  turn: 5,
                  role: "user",
                  text: "No no, no llegué a picarle. Aparte oye, hace 2 días una señora me llamó ofreciéndome comprar mi Paradise Pass. Dice que trabaja con el club. ¿Es normal?",
                  timestamp: "14:06",
                },
                {
                  turn: 6,
                  role: "agent",
                  text:
                    "Nooo, eso es una estafa muy común. ⚠️ El club NUNCA te contacta para 'comprar tu membresía'. Si alguien lo hace:\n\n• NO le des datos personales\n• NO firmes documentos\n• NO transfieras dinero ni deposites como 'garantía' de nada\n• AVÍSANOS al club antes de responder cualquier cosa\n\n¿La señora te pidió que hicieras algún pago, transferencia o depósito? Necesito saber si solo fue la llamada o si ya avanzó más.",
                  timestamp: "14:06",
                  knowledgeRef: "Retriever 3 · KB-Security · KA-SEC-003 (reventa sospechosa · protocolo)",
                  jobStoryIds: ["JS023"],
                  validations: [
                    "Aplica reglas verbatim del KB de seguridad (sin inventar plazos ni cuentas)",
                    "Bifurca: pregunta si hubo transacción (para decidir handoff)",
                    "Tono empático + directivo",
                  ],
                },
                {
                  turn: 7,
                  role: "user",
                  text: "Uf pues sí, le transferí 15,000 pesos como 'apartado' para agilizar el trámite. Me está pidiendo otros 30,000 hoy 😭",
                  timestamp: "14:08",
                },
                {
                  turn: 8,
                  role: "agent",
                  text:
                    "María Elena, entiendo tu preocupación. NO transfieras nada más. Esto es fraude y el club tiene un equipo especializado que te va a acompañar paso a paso para intentar recuperar el dinero y bloquear a la persona.\n\nTe estoy conectando en este momento con un agente de nuestro equipo de Fraudes de Customer Service. Ya vas con todo el contexto — no vas a tener que repetir nada. Un momento…",
                  timestamp: "14:08",
                  jobStoryIds: ["JS023"],
                  validations: [
                    "Detecta fraude materializado (transacción hecha)",
                    "Detiene la conversación de orientación y ejecuta handoff",
                    "Tono empático (evita re-victimizar) + directivo",
                    "No cita SLAs ni plazos que no estén en el KB (anti-patrón KA-SEC-003 evitado)",
                  ],
                },
                {
                  turn: 9,
                  role: "system",
                  text:
                    "🔀 *Handoff ejecutado*\n• Case creado — CASE-2026-11-26-8823\n• RT: Customer Service · Fraudes\n• Ruteo: Omni-Channel Queue 'CS-Fraudes'\n• Prioridad: Alta (fraude materializado con transacción confirmada)\n• Messaging Session transferida con transcripción completa\n• Sentiment Analysis: -0.72 (angustia/miedo)\n• Skills requeridos: Fraud Investigation, Customer Service Retention",
                  timestamp: "14:08",
                  handoff: "Customer Service · Fraudes (Omni-Channel Queue)",
                  jobStoryIds: ["JS023"],
                  validations: [
                    "Case creado con RT específico de fraude",
                    "Ruteo a cola de Customer Service (NO Reservaciones — regla dura del cliente)",
                    "Sentiment Analysis calculado y adjunto",
                    "Messaging Session con historial completo",
                    "Priorización correcta por severidad",
                  ],
                },
              ],
              outcome:
                "Phishing identificado y evitado. Fraude materializado detectado y escalado a la cola correcta (CS · Fraudes, no Reservaciones). Bot respetó reglas verbatim del KB sin inventar plazos ni procedimientos.",
              jsChecklist: [
                {
                  jobStoryId: "JS024",
                  name: "Phishing y Seguridad",
                  validated: [
                    "Cita dominios oficiales verbatim de KA-SEC-002",
                    "Da checklist de acción concreto (no genérico)",
                    "Aplica regla dura: si ya hizo clic o dio credencial → handoff inmediato",
                  ],
                },
                {
                  jobStoryId: "JS023",
                  name: "Llamadas de Reventa Sospechosas",
                  validated: [
                    "Bifurca correctamente: sospecha (orientar) vs materializado (escalar)",
                    "Ruteo a CS · Fraudes, NO Reservaciones",
                    "Sentiment Analysis adjunto al handoff",
                    "Sin invención de SLAs (evita KA-SEC-003 antipatrón)",
                  ],
                  residualRisk: "PAM (Yolanda) debe subir todos los formatos requeridos post-pago fraudulento a Knowledge",
                },
              ],
            },
            {
              id: "scene-5",
              order: 5,
              title: "Escena 5 · Contingencias del viaje",
              subtitle: "María Elena ya viajó — surge una alerta de huracán, un cambio de vuelo, una disputa por cobro y una necesidad de modificar la reservación",
              contextDay: "Semana del 21 al 25 de diciembre — durante el viaje en Hard Rock Riviera Maya",
              narrative:
                "Concentración de escenarios críticos que estresan el agente: crisis climática, cambio de itinerario, disputa financiera con sentiment analysis, modificación de reserva (out-of-scope MVP → handoff), y handoff genérico con contexto para el resto de casos complejos.",
              jobStoriesCovered: [
                { jobStoryId: "JS018", label: "Cambio de Itinerario por Emergencia", description: "Automatiza si el checkout NO cambia; si sí cambia, handoff a agente humano" },
                { jobStoryId: "JS021", label: "Política de Huracán y Clima Crítico", description: "Guía empática paso a paso, ofrece reubicación, escala a humano para retención" },
                { jobStoryId: "JS028", label: "Escalamiento por Disputa de Cobro", description: "Bot detecta sentimiento y bifurca — calmo (recolecta) vs molesto (escala inmediato)" },
                { jobStoryId: "JS030", label: "Escalamiento por Modificaciones", description: "Cualquier modificación/cancelación → handoff a Reservaciones (out-of-scope MVP)" },
                { jobStoryId: "JS027", label: "Handoff a Contact Center con Contexto", description: "Todos los escalamientos transfieren Messaging Session completa + Sentiment" },
              ],
              turns: [
                {
                  turn: 1,
                  role: "user",
                  text: "URGENTE. Están diciendo en las noticias que viene un huracán a la Riviera Maya. ¿Qué hago? Estoy con mis hijos aquí 😰",
                  timestamp: "Lunes 21 dic · 07:22",
                },
                {
                  turn: 2,
                  role: "agent",
                  text:
                    "María Elena, respira. 💚 El club tiene un protocolo específico para huracanes. Antes que nada, ¿ya hay una alerta oficial declarada por Protección Civil o autoridades? Con esa información activo tu política de flexibilidad.\n\nMientras me confirmas: tú y tu familia están seguros en el hotel — el equipo del resort tiene protocolo de refugio y contigencia bien establecido. No te preocupes por tu reservación, tienes opciones.",
                  timestamp: "07:22",
                  knowledgeRef: "Retriever 3 · KB-Policies · KA-POL-006 (Protocolo Huracán y Clima Crítico)",
                  jobStoryIds: ["JS021"],
                  validations: [
                    "Tono empático, gestiona la ansiedad primero",
                    "Verifica gatillo oficial (alerta declarada) antes de aplicar política",
                    "Cita al protocolo específico de huracanes (no política regular)",
                    "Tranquiliza sobre seguridad física antes de tocar reservación",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Sí, Protección Civil declaró alerta amarilla hace 20 minutos para la Riviera Maya. Dime qué opciones tengo bajo la política de huracán del club para proteger mi reservación.",
                  timestamp: "07:24",
                },
                {
                  turn: 4,
                  role: "agent",
                  text:
                    "Perfecto, con alerta oficial activada tienes 3 opciones bajo el protocolo de huracán del club:\n\n1️⃣ *Reubicación en propiedad segura* — te movemos a Hard Rock Los Cabos o Vallarta si hay disponibilidad, cubriendo la diferencia\n2️⃣ *Reprogramación* — mueves tus noches restantes a otra fecha (sin penalización)\n3️⃣ *Crédito para futuro* — el club te guarda las noches como crédito a 12 meses\n\nDado que estás en medio del viaje y los planes cambian rápido en huracán, te voy a conectar con un agente de Customer Service para que evalúe disponibilidad real y active la opción que te acomode. ¿Te parece?",
                  timestamp: "07:24",
                  knowledgeRef: "Retriever 3 · KB-Policies · KA-POL-006 (3 opciones verbatim)",
                  jobStoryIds: ["JS021"],
                  validations: [
                    "Cita las 3 opciones verbatim desde KA-POL-006 (no inventadas)",
                    "Ofrece reubicación como default para protección de cash flow",
                    "Anticipa el handoff con justificación clara",
                    "NO promete algo que dependa de disponibilidad",
                  ],
                },
                {
                  turn: 5,
                  role: "user",
                  text: "Sí, quiero moverme a Los Cabos, no quiero arriesgar a mis niños",
                  timestamp: "07:25",
                },
                {
                  turn: 6,
                  role: "system",
                  text:
                    "🔀 *Handoff ejecutado*\n• Case creado — CASE-2026-12-21-9034\n• RT: Customer Service · Huracán\n• Contract owner asignado (David Ramírez)\n• Prioridad: Crítica (fenómeno meteorológico en curso)\n• Messaging Session transferida\n• Contexto: alerta amarilla Riviera Maya, socia con 2 menores in-house, preferencia = reubicación a Los Cabos\n• Sentiment: -0.55 (preocupación)",
                  timestamp: "07:25",
                  handoff: "Customer Service · Contract Owner + skill Retención (Omni-Channel)",
                  jobStoryIds: ["JS021", "JS027"],
                  validations: [
                    "Case ruteado al contract owner (asesor asignado)",
                    "RT específico de huracán (reporting stat)",
                    "Prioridad crítica correctamente asignada",
                    "Contexto completo transferido",
                  ],
                },
                {
                  turn: 7,
                  role: "note",
                  text:
                    "▸ Se resuelve la reubicación fuera del bot (David Ramírez la mueve a HR Los Cabos). María Elena llega el 22 dic. Tres días después surge otro tema.",
                  timestamp: "—",
                },
                {
                  turn: 8,
                  role: "user",
                  text: "Buenos días, ya estamos en Los Cabos, todo bien. Rápido: acabo de ver un cargo de 2,450 dólares en mi tarjeta a nombre del hotel y NO reconozco ese cargo. Estoy muy molesta 😡. Nadie me dijo nada",
                  timestamp: "Jueves 24 dic · 09:12",
                },
                {
                  turn: 9,
                  role: "agent",
                  text:
                    "María Elena, entiendo tu molestia y no queremos que esto opaque tus vacaciones. Un cargo no reconocido de esa magnitud es serio. Te voy a conectar de inmediato con un agente de Customer Service para que revise tu estado de cuenta contigo y aclare exactamente qué generó ese cobro. Un momento.",
                  timestamp: "09:12",
                  jobStoryIds: ["JS028"],
                  validations: [
                    "Sentiment analysis detecta frustración alta (>0.6 negatividad)",
                    "Bot ejecuta handoff inmediato SIN intentar recabar más detalles (regla del cliente para clientes molestos)",
                    "Tono empático que valida la emoción",
                    "NO minimiza el problema",
                  ],
                },
                {
                  turn: 10,
                  role: "system",
                  text:
                    "🔀 *Handoff ejecutado*\n• Case creado — CASE-2026-12-24-9187\n• RT: Customer Service · Disputa de Cobro\n• Ruteo: Omni-Channel Queue 'CS-Disputas'\n• Prioridad: Alta (in-house, sentiment fuerte)\n• Sentiment Analysis: -0.81 (frustración alta)\n• Messaging Session transferida\n• Skill requerido: Retention + Billing Dispute\n• Contexto: cliente in-house Los Cabos post-reubicación por huracán",
                  timestamp: "09:12",
                  handoff: "Customer Service · Disputas (Omni-Channel)",
                  jobStoryIds: ["JS028", "JS027"],
                  validations: [
                    "Ruteo a CS · Disputas (NO Reservaciones, NO Cobranza)",
                    "Sentiment Analysis adjunto",
                    "Prioridad correlacionada con sentiment + in-house status",
                    "Bot respeta regla dura: cliente molesto → handoff inmediato, no interrogatorio",
                  ],
                },
                {
                  turn: 11,
                  role: "note",
                  text:
                    "▸ La disputa se aclara — era un pre-authorization hold por incidentales del cuarto, ya se liberó. Al día siguiente María Elena vuelve por otro tema.",
                  timestamp: "—",
                },
                {
                  turn: 12,
                  role: "user",
                  text: "Hola, cambio de planes: quiero extender 2 noches más mi estancia y adelantar la llegada de mi vuelo mañana a las 3 am por un tema familiar. ¿Puedes hacerlo?",
                  timestamp: "Viernes 25 dic · 22:04",
                },
                {
                  turn: 13,
                  role: "agent",
                  text:
                    "Vamos por partes. Sobre el vuelo que llega a las 3 am — necesito confirmarte una cosa importante: ¿tu fecha de salida del hotel (checkout) se queda igual, o también cambia?",
                  timestamp: "22:04",
                  jobStoryIds: ["JS018"],
                  validations: [
                    "Aplica regla dura de JS018: pregunta explícitamente si checkout cambia",
                    "NO automatiza antes de saberlo",
                  ],
                },
                {
                  turn: 14,
                  role: "user",
                  text: "El checkout sí lo tengo que mover — quiero extender 2 noches",
                  timestamp: "22:05",
                },
                {
                  turn: 15,
                  role: "agent",
                  text:
                    "Entendido. Dado que ambos cambios afectan disponibilidad (llegada tardía + extensión de fechas), no los puedo procesar automáticamente — requieren revisión manual con el motor de reservas. Te voy a conectar con un agente de Reservaciones que te ajusta ambas cosas en una sola gestión. Ya te preparo el contexto.",
                  timestamp: "22:05",
                  jobStoryIds: ["JS018", "JS030"],
                  validations: [
                    "NO automatiza porque checkout cambia (regla JS018)",
                    "Reconoce que modificación de reserva es out-of-scope MVP (regla JS030)",
                    "Anticipa handoff a Reservaciones (NO CS — sub-área correcta)",
                    "Consolida ambos temas en un solo handoff",
                  ],
                },
                {
                  turn: 16,
                  role: "system",
                  text:
                    "🔀 *Handoff ejecutado*\n• Case creado — CASE-2026-12-25-9294\n• RT: Reservaciones · Modificación\n• Ruteo: Omni-Channel Queue 'RES-Modificaciones'\n• Prioridad: Media (in-house, misma noche)\n• Messaging Session transferida con todo el arco de la relación (Nov–Dic)\n• Sentiment: +0.15 (neutra/positiva)\n• Contexto consolidado: ETA vuelo 3am, extensión +2 noches, no automatizable",
                  timestamp: "22:05",
                  handoff: "Reservaciones · Modificaciones (Omni-Channel)",
                  jobStoryIds: ["JS018", "JS030", "JS027"],
                  validations: [
                    "Ruteo a Reservaciones (NO Customer Service — regla dura)",
                    "Messaging Session incluye TODA la historia (Nov-Dic), no solo el turno actual",
                    "Case documenta ambos temas (llegada + extensión) para gestión unificada",
                    "Sentiment adjunto — permite al agente humano modular tono",
                  ],
                },
              ],
              outcome:
                "El bot resolvió las contingencias más críticas: crisis climática con protocolo verbatim, disputa de cobro con handoff inmediato por sentiment, y modificación de reserva ruteada correctamente. Cada handoff creó Case con RT correcto, ruteó a la cola operativa correcta y transfirió Messaging Session con contexto completo.",
              jsChecklist: [
                {
                  jobStoryId: "JS018",
                  name: "Cambio de Itinerario por Emergencia",
                  validated: [
                    "Aplica regla dura: pregunta si checkout cambia antes de decidir",
                    "Si checkout NO cambia → automatiza; si cambia → handoff",
                    "Consolida con otros cambios en el mismo handoff",
                  ],
                  residualRisk: "TI PAM debe identificar OWS específico para inyectar 'late check-in' a Opera",
                },
                {
                  jobStoryId: "JS021",
                  name: "Política de Huracán",
                  validated: [
                    "Verifica gatillo (alerta oficial) antes de activar política",
                    "Cita 3 opciones verbatim desde KA-POL-006",
                    "Tono empático + prioriza seguridad física",
                    "Handoff al contract owner para retención (cash flow)",
                  ],
                },
                {
                  jobStoryId: "JS028",
                  name: "Disputa de Cobro",
                  validated: [
                    "Sentiment Analysis detecta frustración >0.6",
                    "Bot NO interroga — ejecuta handoff inmediato",
                    "Ruteo a CS · Disputas (NO Cobranza)",
                    "Prioridad correlacionada con severidad",
                  ],
                },
                {
                  jobStoryId: "JS030",
                  name: "Escalamiento por Modificaciones",
                  validated: [
                    "Reconoce que modificación/cancelación es out-of-scope MVP",
                    "Handoff a Reservaciones (NO CS)",
                    "Consolida temas relacionados en un solo Case",
                  ],
                },
                {
                  jobStoryId: "JS027",
                  name: "Handoff a Contact Center con Contexto",
                  validated: [
                    "TODOS los handoffs (5 en total) crearon Case tipificado",
                    "TODOS transfirieron Messaging Session completa",
                    "TODOS adjuntaron Sentiment Analysis",
                    "Ruteo a colas específicas por sub-área (Reservaciones vs CS vs Fraudes)",
                    "Agente humano recibe contexto completo — cliente no repite información",
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: "casos-uso",
        label: "Casos de uso",
        title: "Conversaciones que el Concierge resuelve",
        content:
          "Los flujos conversacionales que el agente debe manejar end-to-end. Cada flujo combina KB (RAG) + datos reales del cliente (Salesforce) + reglas de escalamiento.",
        contextData: {
          groups: [
            {
              name: "Paradise Pass — descubrimiento y activación (audience = paradise_pass)",
              findings: [
                "¿Qué es Paradise Pass y cómo lo activo paso a paso?",
                "¿Cuándo expira mi certificado? — el agente consulta Benefit__c (RT Certificate) del Contract del cliente",
                "¿Qué propiedades familiares vs solo-adultos puedo elegir? — comparativo guiado entre las 9 propiedades",
                "¿Cómo uso mis Resort Credits y cuántos tengo? — lookup en el contrato + reglas de canje",
                "¿Qué incluye Legends of Paradise 2026 en AVA Cancún y cómo accedo?",
                "Quiero regalar mi Paradise Pass — ¿puedo transferirlo? ¿cómo?",
              ],
            },
            {
              name: "Legendary Vacation Club — pertenencia y operación (audience = lvc)",
              findings: [
                "Saldo de Legend Coins y últimos movimientos del wallet (lookup en VCL_Wallet + VCL_WalletMovement)",
                "Beneficios por nivel (Deluxe → VIP → Hall of Fame → Chairman) y mecánica de upgrade",
                "Reservaciones, cambios y política de cancelación escalonada — lookup en Reservation__c + ReservationPolicy__c",
                "Programa de referidos: cuántas noches gano y cómo se acreditan",
                "Reserva de restaurantes y dress codes por propiedad",
                "Acceso a zonas VIP, lounges, Heaven, Rock Royalty, Diamond",
                "Estado de cuenta y próximos pagos — lookup en PagoMes + Movimiento + TransaccionesMovimientos",
              ],
            },
            {
              name: "Operaciones — todas las audiencias (audience = any)",
              findings: [
                "Traslados aeropuerto-hotel: privado vs compartido, ON TOUR — lookup en Reservation_Items__c (RT Transfer)",
                "Cancelación de transfer (24h gratis) — automatizable end-to-end",
                "Información de habitación: layout, vista, amenidades por tipología",
                "Equipaje extra, sillas infantiles, accesibilidad",
                "Política de mascotas y protocolo ECPAT",
                "Aclaración del rebranding RCD → PAM (mensaje preconfigurado, no inventado)",
              ],
            },
            {
              name: "Escalamiento humano (handoff)",
              findings: [
                "Solicitud explícita del usuario de hablar con una persona — escalar sin fricción",
                "Reclamaciones complejas, refunds y disputes — abrir Case con RT 'VCL - Refunds and Disputes'",
                "Situaciones emocionalmente sensibles (Einstein Sentiment lo detecta)",
                "Validaciones manuales: cambios de nombre en certificado, certificado perdido o vencido",
                "Excepciones operativas que requieren autorización (Worksheet_Authorization__c)",
                "El handoff abre Case con resumen IA + RT correcto + Omni-Channel routing vía Amazon Connect",
              ],
            },
          ],
        },
      },
      {
        id: "riesgos",
        label: "Riesgos y open questions",
        title: "Riesgos, gaps y preguntas pendientes",
        content:
          "Antes de pasar a producción, hay decisiones que deben confirmarse con el cliente. Cada riesgo está mapeado a su impacto y a la acción recomendada. Esta sección incorpora los hallazgos de la entrega de junio 2026 — varios riesgos altos del plan original ya están mitigados.",
        contextData: {
          groups: [
            {
              name: "✅ Riesgos altos que se mitigaron con la entrega de junio 2026",
              findings: [
                "Política de huracán — ANTES sin documentación, AHORA cubierta con doc oficial (3 opciones exactas, gatillo 'alerta oficial')",
                "Phishing — ANTES sin dominios oficiales, AHORA cubierta con 'Canales Oficiales LVC' (dominio único @legendaryvacationclub.com + 4 teléfonos grabados)",
                "Fraude documentos — ANTES sin lista de exigencias, AHORA cubierta con 5 docs requeridos (reservación PDF · comprobante · estado bancario · .eml · WhatsApp)",
                "Programa de Referidos PPass — ANTES regla incierta, AHORA confirmada: USD 100 × referido confirmado, hasta 5 referidos (corrige la versión anterior de '$100 por pareja, máx 4 beneficiarios')",
                "Tipificación de Casos — ANTES sin layout oficial, AHORA cubierta con XLSX de 14 hojas y 1000+ tipificaciones (categoría/subcategoría/elemento + matriz Impacto×Urgencia)",
              ],
            },
            {
              name: "Riesgos altos vigentes (bloquean go-live)",
              findings: [
                "Tiers LVC (Deluxe/VIP/HoF/Chairman) y Legend Coins NO están en docs públicos ni en la matriz entregada con suficiente detalle — riesgo de alucinación en flujos LVC. Acción: solicitar al cliente el documento oficial de tiers y mecánica de Legend Coins efectividad 2026",
                "UNICO Jamaica aparece en el repo PERO el fact sheet NO menciona Paradise Pass — riesgo de ofrecer propiedad inexistente. Acción: confirmar inclusión/exclusión con el cliente",
                "Doble fuente de verdad en contrato/membresía: Contract+Benefit__c (comercial) vs RCD_Contract__c+RCD_Membership__c (operativo). El bot debe confirmar source-of-truth ANTES de cualquier respuesta vinculante",
                "Carpetas Llamada Sospechosa/ y Phishing/ del repo VACÍAS — bloquea cobertura completa de JS023 y JS024",
                "Migración Vaclubity al 90% sin testeo — beneficiarios y identificación de programa de referidos por contrato pueden retornar resultados vacíos al bot",
              ],
            },
            {
              name: "Riesgos medios (manejables con governance y pre-procesamiento)",
              findings: [
                "Volumen XLSX FAQs (992 filas, 14 hojas) — convertir a ~150–200 KB Articles individuales es trabajo intensivo. Acción: pipeline LLM-assisted que produzca drafts + aprobación humana antes de Publish",
                "Tablas (ON TOUR, matriz Referidos LVC) — el retrieval vectorial de tablas crudas es pobre. Acción: linearizar a prosa antes de UDMO ingest (~4–6 horas LLM-assisted)",
                "Relación contractual Paradise Pass ↔ LVC sigue sin estar declarada en fuentes públicas; los T&Cs del portal LVC mencionan Palace Resorts, no Solaya. Acción: confirmar con el cliente para el system prompt",
                "Carpeta Marcas/ aún vacía — falta brand guide PAM 2026 post-rebranding. Afecta system prompt del agente",
                "PDFs con Google Docs Renderer (varios fact sheets, algunos >4MB) — extracción directa falla. Acción: OCR (Tesseract o Salesforce Document Cloud) en pipeline de ingesta UDMO",
                "Catalog__c (36 RTs) es punto crítico transversal — cualquier cambio impacta múltiples dominios. Acción: gobierno de cambios cross-dominio",
              ],
            },
            {
              name: "Riesgos bajos (housekeeping)",
              findings: [
                "Documentos mencionan 'RCD' mientras la marca actual es 'PAM' — confusión leve. Acción: metadata operator_legacy + operator_current; nota de equivalencia en cada chunk legacy; NO reescribir originales para preservar trazabilidad",
                "Subcarpetas HRHV mal nombradas en el repo (FACT_SHEETS contiene Room Descriptions y viceversa) — riesgo de cargar al backend equivocado. Acción: validar contenido vs nombre antes de ingest",
                "ON TOUR no está publicado en sitios públicos — marcar audience=lvc hasta que el cliente confirme disponibilidad para Paradise Pass",
                "Log_Message__c con 6.4M registros y Hist_* con >2M acumulado — revisar política de retención antes de que afecte queries del agente",
                "Person Accounts está activo: cualquier query/automatización del agente sobre el cliente final debe considerar IsPersonAccount y campos __pc",
              ],
            },
            {
              name: "Artículos legacy en PAM-Sandbox — 13 preexistentes",
              findings: [
                "Estado al 2 de julio de 2026: la org tiene 13 artículos de Knowledge previamente creados en english (en_US), sin Data Categories ni Record Types propios del MVP. NO impactan al bot porque los filtros los excluyen (audience/topic no aplican), pero conviene revisarlos con el cliente.",
                "10 en Record Type 'FAQ' (7 Online / 3 Draft): Redeem paradise pass certificate · Update my personal information · Invoices · Request transportation · Updates on existing reservation · Questions about Loans and Payments · Help to log-in into account · 'Keep Me Signed In' Checkbox (Sample) · How to Reset Your Account Password (Sample) · How to Update Account Credit Card Information (Sample)",
                "3 en Record Type 'Procedure' (1 Online / 2 Draft): How to Update Account Credit Notification Settings (Sample) · What Is Northern Trail Outfitters Return Policy? (Sample) — 2 versiones",
                "Muchos son sample data (Northern Trail Outfitters, 'Keep Me Signed In') — muy probablemente de un template o un Flow de setup. Recomendación: archivarlos con el cliente antes de go-live para evitar que aparezcan en búsquedas de Service Console",
                "Los 6 Record Types nuevos del MVP llevan prefijo FWD_ (FWD_Property_Fact_Sheet, FWD_Policy, etc.) — coexisten sin conflicto con FAQ/Procedure existentes",
              ],
            },
            {
              name: "Decisiones de arquitectura por confirmar",
              findings: [
                "Custom Retriever en Apex vs Flow — recomendación: Apex (testabilidad + control de re-rank). Confirmar con TI de PAM",
                "Visibilidad de Data Categories por Profile vs Permission Set Group — recomendación: PSG (más flexible para roles compuestos). Confirmar con TI",
                "Frecuencia de re-index UDMO — recomendación: daily incremental sobre cambios + weekly full. Confirmar con Data Cloud team",
                "KB Article translation strategy — recomendación: Master en ES + traducciones nativas a EN/PT (no auto-translation). Confirmar costo y SLA editorial con cliente",
              ],
            },
            {
              name: "Protocolo editorial — fuente vs interpretación del bot",
              findings: [
                "Aprendizaje del piloto de julio 2026: al autorear los 3 primeros artículos de Security se coló contenido interpretativo mezclado con contenido de fuente oficial. Ejemplos: 'primer contacto dentro de 24 horas hábiles' (SLA no citado en ningún PDF) o 'nunca solicitamos datos bancarios por email' (regla implícita, no textual).",
                "Regla vigente para los 38 restantes: antes de crear un artículo se lee el archivo fuente completo y se extrae verbatim solo lo que aparece literal. Sin invenciones, sin inferencias de sentido común, sin SLAs, sin plazos que no estén en la fuente.",
                "Estructura del Body cuando hay mezcla: encabezado <em>Fuente oficial</em> con lo verbatim, seguido de <em>Cómo lo maneja el Concierge (decisión de diseño)</em> con las reglas del bot (tipificación de Caso, routing, cross-references entre artículos). Así el approver Legal firma solo lo que le compete.",
                "Question__c y Answer__c deben salir SIEMPRE de la fuente oficial. Si la pregunta natural del usuario no tiene una respuesta literal en el doc, el artículo NO existe todavía — se marca en Article Body como pendiente de cliente.",
                "Cross-references entre artículos (ej. 'ver KA-SEC-001') son decisión de diseño y viven en la sección de Concierge, nunca en el Answer citable.",
                "Los 3 pilotos KA-SEC-001/002/003 fueron corregidos en julio 2026 aplicando esta regla.",
              ],
            },
            {
              name: "RACI mínimo para operar el Knowledge",
              findings: [
                "Knowledge Owner (PAM) — aprueba la taxonomía, publica cambios estructurales de Record Types / Data Categories, dueño del gobierno end-to-end",
                "Authors por dominio (PAM · 1 por Owner_Department) — Legal, Customer Service, Reservas, Fraude, Brand: crean, actualizan y proponen retiro de artículos de su dominio",
                "Approver (PAM · Calidad + Legal cuando aplique) — firma cada publicación · valida Summary <140 chars · confirma que Data Categories + Membership_Level están correctos",
                "AI Steward (PAM o partner) — monitorea precisión del Concierge, detecta gaps de KB, dispara requests de nuevos artículos cuando el retriever devuelve threshold bajo",
                "Salesforce TA (Solaya + partner) — diseño técnico, configuración inicial, mantenimiento del Custom Retriever y de Channel Visibility, integración con Data Cloud UDMO",
                "Cadencia mínima: comité editorial mensual para revisar artículos con Last_Reviewed_Date > 6 meses; comité técnico trimestral para revisar Data Categories y retriever tuning",
              ],
            },
          ],
        },
      },
      {
        id: "assets",
        label: "Assets",
        title: "Assets de la solución",
        content:
          "Materiales de discovery y diseño entregados al cliente. El KB Audit y el Data Model Overview son la base sobre la que se diseñó el Concierge; la actualización de junio 2026 del repositorio permitió migrar de la propuesta inicial (6 Data Libraries) al diseño definitivo (5 Custom Retrievers + KB Articles + UDMO + Data Categories).",
        assetsData: {
          items: [
            {
              name: "Presentación ejecutiva · Concierge Digital Paradise Pass",
              description:
                "Deck interactivo de 11 slides para exposición ejecutiva. Cubre la visión del Concierge, sus capacidades por especialidad, el flujo de autenticación en 3 pasos, membresía, beneficios y referidos, destinos y llegadas, políticas críticas (huracán, fraude, reventa), handoff humano y los guardrails de confianza. Navegación con teclado ← → · espacio, dots y swipe. Presenta co-branding oficial PAM Hotels × Salesforce Agentforce.",
              available: true,
              type: "doc",
              url: "/Customers/PAM/PAM_Concierge_Digital_Presentation.html",
            },
            {
              name: "Paradise Pass — KB Audit & Knowledge Strategy",
              description:
                "Análisis completo del programa Paradise Pass, clasificación archivo-por-archivo del repositorio PAM_Hotels_Knowledge_Base_RAG/, propuesta arquitectónica (5 Custom Retrievers + 4 Data Category Groups), estrategia de chunking, casos de uso del Concierge y riesgos/gaps detectados.",
              available: true,
              type: "doc",
              url: "/Customers/PAM/Paradise_Pass_KB_Analysis.html",
            },
            {
              name: "PAM-Sandbox — Modelo de Datos",
              description:
                "Snapshot del modelo de datos de la org PAM-Sandbox: 90 objetos custom, 220 record types, 12 dominios funcionales, ERDs por dominio (embudo comercial, stack financiero, catálogos, RCD operativo) y Top 30 objetos por volumen. Es la base de grounding del Concierge.",
              available: true,
              type: "doc",
              url: "/Customers/PAM/PAM_DataModel_Overview.html",
            },
            {
              name: "Repositorio KB actualizado — PAM_Hotels_Knowledge_Base_RAG (junio 2026)",
              description:
                "~74 archivos en 16 carpetas. Versus la entrega anterior (51 archivos, 7 carpetas): se sumaron Beneficiarios/, Actualización de Datos/, Canales Oficiales/, Estado de Cuenta-Balance/, Fraude/, Política de huracán y clima/, Tipificación Tickets/. Sigue vacías: Marcas/, Llamada Sospechosa/, Phishing/.",
              available: false,
              type: "doc",
            },
            {
              name: "Layout de Tipificación de Tickets (Salesforce Concierge)",
              description:
                "1 XLSX con 14 hojas y 1000+ tipificaciones (SOLICITUD/INCIDENTE/REQUERIMIENTO × Categoría × Subcategoría × Elemento), matriz Impacto×Urgencia, colas (Customer Services / Cobranza × idioma), roles, sitios y ubicaciones. Define los Case Record Types y picklist values que el bot usa al escalar.",
              available: false,
              type: "doc",
            },
            {
              name: "Matriz Completa de FAQs (LVC + por propiedad)",
              description:
                "1 XLSX con 992 filas en 14 hojas cubriendo 12+ resorts × 4 FAQs (Resort Credits/Legend Coins, edad/zonas, beneficios premium, restaurantes/concierge). Se transforma a ~150–200 KB Articles atómicos con Data Categories (audience + topic + property + lifecycle).",
              available: false,
              type: "doc",
            },
            {
              name: "Brand Guide PAM Hotels 2026",
              description:
                "Pendiente solicitar al cliente. Carpeta Marcas/ del repositorio sigue vacía. Necesario para cerrar el lineamiento de comunicación post-rebranding RCD → PAM y enriquecer el System Prompt del agente.",
              available: false,
              type: "doc",
            },
            {
              name: "Documento oficial de tiers LVC y mecánica de Legend Coins",
              description:
                "Pendiente solicitar al cliente. Los tiers Deluxe/VIP/Hall of Fame/Chairman y la mecánica de Legend Coins solo aparecen en docs internos (matriz FAQs LVC) — no con la granularidad necesaria. Necesario antes de que el Concierge responda preguntas LVC sin riesgo de alucinación.",
              available: false,
              type: "doc",
            },
            {
              name: "Guion oficial 'Llamada Sospechosa' (Yolanda · PAM)",
              description:
                "Pendiente. Carpeta Llamada Sospechosa/ del repo está vacía. Bloquea cobertura completa de JS023 (TS011 está como 'partial').",
              available: false,
              type: "doc",
            },
            {
              name: "Guía oficial Phishing PAM con campañas detectadas",
              description:
                "Pendiente. Carpeta Phishing/ del repo está vacía. Necesario para construir lista de dominios apócrifos conocidos y fastpath de detección automática (sin esperar al retriever).",
              available: false,
              type: "doc",
            },
            {
              name: "Set golden de validación (50–80 preguntas)",
              description:
                "Pendiente de construir junto con el cliente. Set de preguntas reales de Paradise Pass y LVC para validar el Concierge antes de producción: cobertura por intent, audiencia, idioma y propiedad.",
              available: false,
              type: "doc",
            },
          ],
        },
      },
    ],
    translations: {
      en: {
        title: "Paradise Pass Concierge — Agentforce Agent for PAM Hotels",
        description:
          "Design of the Paradise Pass Digital Concierge: an Agentforce agent that acts as a 24/7 host for PAM Hotels' (formerly RCD Hotels) activatable vacation pass program. Covers 9 properties, 3 languages, and two coexisting audiences — Paradise Pass (discovery) and Legendary Vacation Club (belonging) — on top of a Salesforce org already in production with 2.6M Accounts, 340K Contracts, and 491K Cases. The knowledge architecture combines Custom Retrievers over Salesforce Knowledge (curated articles) and UDMO Files on Data Cloud (rich documents for RAG), governed by orthogonal Data Categories.",
        industry: "Hospitality — All-Inclusive · Mexico, Dominican Republic & Jamaica",
        tabs: [
          { id: "overview", label: "Overview", title: "Executive summary", content: "PAM Hotels (formerly RCD Hotels, rebranding completed in January 2026) operates 9 all-inclusive resorts across Mexico, Dominican Republic, and Jamaica under the Hard Rock, UNICO, and AVA brands. Its Paradise Pass program — activatable vacation passes with an expiring certificate — is the commercial gateway to the Legendary Vacation Club (LVC) ecosystem. This plan proposes a Digital Concierge built on Agentforce that resolves 24/7 questions about the program, the properties, the policies, and the operation, with Custom Retrievers over Salesforce Knowledge (curated, citable, multi-channel articles) and UDMO Files on Data Cloud (rich documents for RAG grounding), governed by orthogonal Data Categories and connected to the PAM-Sandbox org (90 custom objects, 220 record types)." },
          { id: "que-es-paradise-pass", label: "What is Paradise Pass?", title: "What is Paradise Pass and how does it work?", content: "Paradise Pass is an activatable all-inclusive travel pass — not a traditional vacation club nor a monthly subscription. The customer buys a certificate up front, receives concrete benefits (Member's Bracelet, Resort Credits, invite-only events), and has a defined window to activate their stay at one of the 9 properties in the portfolio. Internally PAM describes it as 'the gateway to the Legendary ecosystem' — the commercial entry-point to the Legendary Vacation Club (LVC) membership program." },
          { id: "ventajas", label: "Advantages", title: "Main advantages for the customer", content: "The advantages that sell Paradise Pass best — extracted from the public site, internal KB materials, and the points most often repeated in real call center queries." },
          { id: "voz-del-cliente", label: "Voice of the customer", title: "What customers say — most frequent themes", content: "The themes that the call center and the member portal report most often, grouped by intent. This is the raw material for the Digital Concierge: what guests actually ask, unfiltered." },
          { id: "data-model", label: "Salesforce data", title: "What the agent finds in PAM's Salesforce", content: "The Concierge does not operate in a vacuum: it connects directly to the PAM-Sandbox org, where the customer, the contract, the pass, and the financial operation already live. Snapshot of the data model relevant for agent grounding." },
          { id: "concierge", label: "Agentforce Concierge", title: "Paradise Pass Digital Concierge design", content: "An Agentforce agent that combines brand personality (system prompt), Custom Retrievers over two complementary backends (Salesforce Knowledge + UDMO Files on Data Cloud), and direct access to the PAM org to respond with real customer context." },
          { id: "data-libraries", label: "Custom Retrievers", title: "Knowledge architecture — 5 Custom Retrievers", content: "A paradigm shift from the original plan: the Concierge does NOT use Agentforce Data Libraries. We design 5 Custom Retrievers specialized by intent, each connected to the backend best suited for its content — Salesforce Knowledge (curated, citable, versioned articles, reusable by human agents) or UDMO Files on Data Cloud (rich documents in original format, ideal for RAG). BrandVoice stays outside the retriever — it lives in the system prompt. Governance is handled with 4 orthogonal Data Categories (Audience · Topic · Property · Lifecycle)." },
          { id: "archivos-por-dl", label: "Inventory by backend", title: "Inventory by backend — KB Articles · UDMO Files · Forms · System Prompt", content: "Verified mapping against the PAM_Hotels_Knowledge_Base_RAG/ repository updated in June 2026. Each file falls into one of four destinations: (1) Salesforce Knowledge as a curated article, (2) UDMO File on Data Cloud for RAG, (3) Form output the bot attaches to the customer (does not answer), (4) System Prompt embedded in the agent." },
          { id: "data-categories", label: "Record Types & Categories", title: "Article Record Types + orthogonal Data Categories", content: "Two combined decisions govern Knowledge structure: (1) every Article lives under one of 6 Record Types with its own layout and fields; (2) every Article is tagged with 4 orthogonal Data Category Groups to filter by intersection (audience=paradise_pass AND topic=cancellation_policy AND property=ALL AND lifecycle=active). Record Types answer 'what structure does it have?'; Data Categories answer 'to whom and to what does it apply?'." },
          { id: "kb-articles", label: "KB Articles", title: "KB Articles — build list for the Sandbox", content: "Concrete list of articles to create in Salesforce Knowledge in the PAM sandbox. Each card defines title, summary, Record Type, Data Categories, and the Retrievers that will consume it. `KA-XXX-NNN` IDs are what the article will carry in Salesforce for traceability. Full MVP coverage (13 Job Stories) — nothing more than the first release needs." },
          { id: "job-stories", label: "Job Stories", title: "MVP backlog — Job Stories in the first release", content: "13 Job Stories filtered from PAM's v2.1 internal backlog — the only ones flagged as package = MVP. Each story is classified by its resolution path (Knowledge / Salesforce data / handoff) and by its current Knowledge coverage: which KB documents already answer it and what is still pending from the client. A final executive summary tracks MVP progress." },
          { id: "test-scripts", label: "Test scripts", title: "Agentforce test scripts — one per MVP Job Story", content: "15 conversational scripts to validate the Digital Concierge before UAT. Each script links to its Job Story, defines persona, channel, language, data preconditions, expected turn-by-turn transcript with inline validations (which Knowledge to cite, which Salesforce object to read, when to hand off), success criteria, and active blockers." },
          { id: "casos-uso", label: "Use cases", title: "Conversations the Concierge resolves", content: "The conversational flows the agent must handle end-to-end. Each flow combines KB (RAG) + real customer data (Salesforce) + escalation rules." },
          { id: "riesgos", label: "Risks & open questions", title: "Risks, gaps, and open questions", content: "Before going live, decisions must be confirmed with the customer. Each risk is mapped to its impact and the recommended action. This section reflects the June 2026 delivery — several high risks from the original plan are now mitigated." },
          { id: "assets", label: "Assets", title: "Solution assets", content: "Discovery and design materials delivered to the customer. The KB Audit and the Data Model Overview are the foundation on which the Concierge was designed; the June 2026 repository update enabled migrating from the initial proposal (6 Data Libraries) to the final design (5 Custom Retrievers + KB Articles + UDMO + Data Categories)." },
        ],
      },
      pt: {
        title: "Paradise Pass Concierge — Agente Agentforce para a PAM Hotels",
        description:
          "Desenho do Concierge Digital do Paradise Pass: um agente Agentforce que atua como anfitrião 24/7 para o programa de passes vacacionais ativáveis da PAM Hotels (ex-RCD Hotels). Abrange 9 propriedades, 3 idiomas e duas audiências coexistentes — Paradise Pass (descoberta) e Legendary Vacation Club (pertencimento) — sobre uma base do Salesforce já em produção com 2,6M de Accounts, 340K de Contracts e 491K de Cases. A arquitetura de conhecimento combina Custom Retrievers sobre Salesforce Knowledge (artigos curados) e UDMO Files em Data Cloud (documentos ricos para RAG), governados por Data Categories ortogonais.",
        industry: "Hospitalidade — All-Inclusive · México, Rep. Dominicana e Jamaica",
        tabs: [
          { id: "overview", label: "Overview", title: "Resumo executivo", content: "A PAM Hotels (antiga RCD Hotels, rebranding concluído em janeiro de 2026) opera 9 resorts all-inclusive no México, República Dominicana e Jamaica sob as marcas Hard Rock, UNICO e AVA. Seu programa Paradise Pass — passes vacacionais ativáveis com certificado e vencimento — é a porta comercial para o ecossistema Legendary Vacation Club (LVC). Este plano propõe um Concierge Digital construído em Agentforce que resolve consultas 24/7 sobre o programa, as propriedades, as políticas e a operação, com Custom Retrievers que consultam Salesforce Knowledge (artigos curados, citáveis, multi-canal) e UDMO Files em Data Cloud (documentos ricos para grounding RAG), governados por Data Categories ortogonais e conectados à org PAM-Sandbox (90 objetos custom, 220 record types)." },
          { id: "que-es-paradise-pass", label: "O que é Paradise Pass?", title: "O que é Paradise Pass e como funciona?", content: "Paradise Pass é um passe ativável de viagem all-inclusive — não é um vacation club tradicional nem uma assinatura mensal. O cliente compra um certificado antecipadamente, recebe benefícios concretos (Member's Bracelet, Resort Credits, acesso a eventos por convite) e dispõe de um prazo definido para ativar sua estadia em uma das 9 propriedades do portfólio. Internamente a PAM o descreve como 'a porta de entrada ao ecossistema Legendary' — a antessala comercial do programa de membership Legendary Vacation Club (LVC)." },
          { id: "ventajas", label: "Vantagens", title: "Principais vantagens para o cliente", content: "As vantagens que melhor vendem o Paradise Pass — extraídas do site público, dos materiais internos do KB e dos pontos que mais se repetem em consultas reais ao call center." },
          { id: "voz-del-cliente", label: "Voz do cliente", title: "O que os clientes dizem — temas mais frequentes", content: "Os temas que o call center e o portal de sócios relatam com maior frequência, agrupados por intenção. Esta é a matéria-prima do Concierge Digital: o que os hóspedes realmente perguntam, sem filtro." },
          { id: "data-model", label: "Dados no Salesforce", title: "O que o agente encontra no Salesforce da PAM", content: "O Concierge não opera no vácuo: conecta-se diretamente à org PAM-Sandbox, onde já vivem o cliente, o contrato, o passe e a operação financeira. Snapshot do modelo de dados relevante para o grounding do agente." },
          { id: "concierge", label: "Concierge Agentforce", title: "Desenho do Concierge Digital Paradise Pass", content: "Um agente Agentforce que combina personalidade de marca (system prompt), Custom Retrievers sobre dois backends complementares (Salesforce Knowledge + UDMO Files em Data Cloud) e acesso direto à org da PAM para responder com contexto real do cliente." },
          { id: "data-libraries", label: "Custom Retrievers", title: "Arquitetura de conhecimento — 5 Custom Retrievers", content: "Mudança de paradigma em relação à proposta inicial: o Concierge NÃO usa Agentforce Data Libraries. São desenhados 5 Custom Retrievers especializados por intenção, cada um conectado ao backend mais adequado ao seu conteúdo — Salesforce Knowledge (artigos curados, citáveis, versionados, reutilizáveis por agentes humanos) ou UDMO Files em Data Cloud (documentos ricos no formato original, ideais para RAG). O BrandVoice fica fora do retriever — vive no system prompt. A governança usa 4 Data Categories ortogonais (Audience · Topic · Property · Lifecycle)." },
          { id: "archivos-por-dl", label: "Inventário por backend", title: "Inventário por backend — KB Articles · UDMO Files · Forms · System Prompt", content: "Mapeamento verificado contra o repositório PAM_Hotels_Knowledge_Base_RAG/ atualizado em junho de 2026. Cada arquivo recai em um de quatro destinos: (1) Salesforce Knowledge como artigo curado, (2) UDMO File em Data Cloud para RAG, (3) Form de output que o bot anexa ao cliente (não responde), (4) System Prompt embutido no agente." },
          { id: "data-categories", label: "Record Types & Categories", title: "Record Types de Article + Data Categories ortogonais", content: "Duas decisões combinadas governam a estrutura do Knowledge: (1) cada Article vive sob um de 6 Record Types com layout e campos próprios; (2) cada Article é etiquetado com 4 Data Category Groups ortogonais para filtrar por interseção (audience=paradise_pass AND topic=cancellation_policy AND property=ALL AND lifecycle=active). Os Record Types respondem 'que estrutura ele tem?'; as Data Categories respondem 'a quem e a quê ele se aplica?'." },
          { id: "kb-articles", label: "KB Articles", title: "KB Articles — inventário para construir no Sandbox", content: "Lista concreta de artigos a criar no Salesforce Knowledge do sandbox PAM. Cada cartão define título, resumo, Record Type, Data Categories e os Retrievers que o consumirão. IDs `KA-XXX-NNN` são os que o artigo levará no Salesforce para rastreabilidade. Cobertura completa do MVP (13 Job Stories) — apenas o que precisamos para o primeiro release." },
          { id: "job-stories", label: "Job Stories", title: "Backlog MVP — Job Stories do primeiro release", content: "13 Job Stories filtradas do backlog interno v2.1 da PAM — as únicas marcadas como pacote = MVP. Cada story é classificada pelo caminho de resolução (Knowledge / dados Salesforce / handoff) e pela cobertura atual de Knowledge: quais documentos do KB já a respondem e o que ainda está pendente do cliente. Um resumo executivo final acompanha o avanço do MVP." },
          { id: "test-scripts", label: "Scripts de teste", title: "Scripts de teste Agentforce — um por Job Story MVP", content: "15 scripts conversacionais para validar o Concierge Digital antes do UAT. Cada script está vinculado à sua Job Story, define persona, canal, idioma, pré-condições de dados, transcrição esperada turno-a-turno com validações inline (qual Knowledge citar, qual objeto do Salesforce ler, quando fazer handoff), critérios de sucesso e bloqueadores ativos." },
          { id: "casos-uso", label: "Casos de uso", title: "Conversas que o Concierge resolve", content: "Os fluxos conversacionais que o agente deve tratar end-to-end. Cada fluxo combina KB (RAG) + dados reais do cliente (Salesforce) + regras de escalonamento." },
          { id: "riesgos", label: "Riscos e dúvidas em aberto", title: "Riscos, gaps e perguntas pendentes", content: "Antes de ir para produção, há decisões que devem ser confirmadas com o cliente. Cada risco está mapeado ao seu impacto e à ação recomendada. Esta seção incorpora as descobertas da entrega de junho de 2026 — vários riscos altos do plano original já estão mitigados." },
          { id: "assets", label: "Ativos", title: "Ativos da solução", content: "Materiais de discovery e desenho entregues ao cliente. O KB Audit e o Data Model Overview são a base sobre a qual o Concierge foi desenhado; a atualização do repositório de junho de 2026 permitiu migrar da proposta inicial (6 Data Libraries) ao desenho definitivo (5 Custom Retrievers + KB Articles + UDMO + Data Categories)." },
        ],
      },
    },
  },
  {
    slug: "telasist",
    title: "Agentforce Voice POC — Telasist",
    customerName: "Telasist (Grupo TM-Assistance · ABC Asistencia · TAS)",
    industry:
      "Assistance Company con call center propio · Asistencia vial, médica, hogar, funeraria, viajes · México",
    description:
      "POC de Agentforce Voice sobre Amazon Connect (Partner Voice Forwarding · BYOT) para Telasist — sexto cliente Salesforce más grande de LATAM y único BPO/Assistance Company del portafolio estratégico Salesforce en México. El proyecto arranca con un piloto de bajo riesgo (Campaña El Águila · Overflow) y abre camino a tres olas subsecuentes que juntas cubren >70% del volumen mensual de llamadas del piso: Viva Aerobus (reembolsos híbridos), Coppel (triage de servicio) y un copilot interno transversal para los 350 asesores humanos. Situación competitiva activa: el cliente evalúa Amazon Bedrock y Eleven Labs como alternativas — el POC es la apuesta de Telasist por Salesforce para diferenciar CX, productividad del asesor y captura de datos en primer nivel por voz.",
    logo: "/Customers/Telasist/telasist-logo.png",
    passcode: "telasist2026",
    hidden: true,
    tags: [
      "Agentforce Voice",
      "Amazon Connect",
      "Partner Voice Forwarding",
      "Service Cloud",
      "Agentforce 1 Edition",
      "Data Cloud",
      "Assistance Company",
      "BPO",
      "México",
      "POC",
    ],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        title: "Resumen ejecutivo del POC",
        content:
          "## TL;DR\n\n> **POC de Agentforce Voice** para Telasist — sexto cliente Salesforce más grande de LATAM y único Assistance Company del portafolio estratégico Salesforce México. **5 casos de uso** encadenados que cubren >70% del volumen del piso. UC0 *(informativo Coppel)* y UC1 *(overflow Águila)* son los pilotos de bajo riesgo; UC2/UC3 son las olas de alto volumen; UC4 es el copilot transversal.\n\n### El cliente en una línea\n\n**Telasist** es una **empresa de asistencias** (vial, médica, hogar, funeraria, viajes) con **call center propio** + red de **20K proveedores afiliados**. NO es un BPO puro estilo Atento — sus 'campañas' son líneas de servicio contratadas por aseguradoras, retailers, bancos y aerolíneas que revenden esas asistencias a sus propios clientes finales.\n\n### Los 5 casos de uso encadenados\n\n1. **UC0 · Coppel Info Concierge** 🆕 *(piloto informativo — descubierto julio 2026)*\n   - Agente de voz **solo-lectura** sobre Salesforce Knowledge del Club de Protección Familiar Coppel\n   - Responde consultas sobre beneficios, alcances, exclusiones, procedimientos. **NO crea Case** en Fase 1\n   - **Volumen:** ~1,538 llamadas/mes tipificadas como 'Información de beneficios' *(9,225 llamadas / 6m)*\n\n2. **UC1 · Campaña El Águila** *(piloto operativo — bajo volumen, alto valor demostrativo)*\n   - Agente de voz que absorbe el overflow del contact center de El Águila\n   - Captura datos, crea Case en Salesforce, envía email de confirmación\n   - **Volumen:** ~107 llamadas/mes\n\n3. **UC2 · Campaña Viva Aerobus** *(Fase 2 — mayor volumen del portafolio)*\n   - Manejo híbrido de solicitudes de reembolso\n   - Escalamiento empático a humano cuando hay carga emocional\n   - **Volumen:** ~9,327 llamadas/mes\n\n4. **UC3 · Campaña Coppel · Triage** *(Fase 2 — alto volumen estructurado)*\n   - Triage automatizado con validación de identidad y geolocalización · **complementario a UC0**: UC0 informa, UC3 coordina\n   - **Volumen:** ~3,921 llamadas/mes *(coordinación de asistencia)*\n\n5. **UC4 · Copilot Interno Telasist** *(transversal continuo — sin add-on)*\n   - Agent Assist + Auto-Summarization + Sentiment sobre el 100% del piso operativo\n   - **Apalanca lo que Agentforce 1 Edition ya incluye out-of-the-box**\n\n### La urgencia\n\n> **[interno]** El **CEO/Founder de Telasist** envió email a fines de junio pidiendo respuesta *same-day* sobre implementación de Voice Agents con arranque **end-of-month**, con visibilidad del Board of Directors.\n\n### El gate comercial-técnico\n\n| Bloqueador | Impacto | Estado |\n|---|---|---|\n| Override **CPQ rule #12VY** (SKU US Long Code con billing MX) | Sin esto, UC0/UC1/UC2/UC3 no arrancan | En escalación |\n| Compra **Agentforce Contact Center Voice** — $75/seat × 350 seats | **$26,250/mes** · **$315K/año** | Pendiente firma |\n| Confirmar variante **BYOT** vs. Salesforce-resold del Voice SKU | Telasist trae su propia AWS | Pendiente Deal Desk |\n\n### Competencia activa\n\nTelasist evalúa **Amazon Bedrock** y **Eleven Labs** como alternativas de Voice AI. El resultado de los pilotos UC0 + UC1 decide si Salesforce se queda como su plataforma de Voice AI corporativa.",
        overviewData: {
          stats: [
            { value: "6º", label: "Cliente Salesforce más grande de LATAM" },
            { value: "350", label: "Seats de Agentforce for Service" },
            { value: "~325K", label: "Llamadas inbound al año" },
            { value: "5", label: "Casos de uso planeados" },
            { value: "$26,250", label: "Add-on Voice SKU al mes" },
            { value: "end-of-month", label: "Fecha objetivo del piloto" },
          ],
        },
      },
      {
        id: "cliente",
        label: "Cliente",
        title: "¿Quién es Telasist?",
        content:
          "## El modelo de negocio\n\n> Telasist es una **empresa de asistencias con call center propio** — **NO un BPO puro** estilo Atento o Teleperformance. Su modelo es más cercano a **Multiasistencia, IKE Asistencia o Europ Assistance**: diseñan y operan servicios de asistencia que otras empresas contratan como beneficio para sus clientes finales.\n\n**Servicios de asistencia que ofrecen:** vial · médica · hogar · legal · funeraria · viajes · mascotas · telemedicina.\n\n**¿Qué es una 'campaña' en el contexto de Telasist?** Cada 'campaña' del PDF interno es en realidad **un contrato de asistencia con un cliente empresarial** que revende ese servicio a sus propios clientes finales.\n\n### Constitución legal — tres razones sociales\n\n*Fuente: [telasist.com/nosotros](https://www.telasist.com/nosotros) — verificado público.*\n\n| Razón social | Notas |\n|---|---|\n| **TM-Assistance, S.A. de C.V.** | Marca comercial paraguas |\n| **ABC Asistencia, S.A. de C.V.** | **Razón social utilizada en el contrato Salesforce** |\n| **TAS Telephonic Assistance Services, S.A. de C.V.** | Entidad histórica |\n\nTodas operan bajo la **marca comercial única Telasist**.\n\n### Infraestructura y escala\n\n**[verificado público]**\n\n- **3 call centers** activos\n- **Sede principal**: Guillermo González Camarena 1000, Santa Fe · CDMX 01376\n- **Sede secundaria**: Eje 5 – Eugenia esq. Central Lázaro Cárdenas 899, Vertiz Narvarte · CDMX 03600\n- **LinkedIn**: rango 201–500 empleados · 192 empleados listados directamente · 3,654 seguidores corporativos\n\n**[auto-declarado por Telasist — telasist.com]**\n\n- **3M+** llamadas atendidas *(histórico acumulado)*\n- **20M+** usuarios satisfechos\n- **20K** proveedores afiliados en red extendida\n- **11M** usuarios/mes atendidos\n- **8s** tiempo de respuesta declarado\n- **NPS >80%** auto-declarado\n- **24/7/365** disponibilidad\n\n### Marcas hermanas del grupo\n\n- **UrgeMedico** — asistencia médica virtual\n- **Telasist Medcare** — telemedicina\n\n> ⚠️ **Cobranza y back-office NO aparecen** listados como líneas de servicio en su web pública — su core es explícitamente **asistencia + call center as-a-service** asociado a esa asistencia.\n\n### Clientes\n\n**[verificado público]** Clientes citables externamente:\n\n- **Tesla** — testimonial firmado por Antonio Valdez, Regional Service Manager Monterrey; post en LinkedIn ~junio 2026 confirma acompañamiento desde el lanzamiento de Tesla en México\n- **ADO** — testimonial atribuido a Dirección ADO en la home\n\n> ⚠️ **Advertencia crítica:** los demás clientes mencionados en el PDF interno de Salesforce (**Coppel, GNP, Invex, Multiasist, Viva Aerobus, Guros, Banorte, BBVA, El Águila**) NO están confirmados en fuentes públicas. Se tratan como información interna del deal y **NO deben citarse externamente sin verificación directa con el cliente**.",
        overviewData: {
          stats: [
            { value: "1996", label: "Año de fundación · 28+ años operando" },
            { value: "3", label: "Razones sociales bajo marca Telasist" },
            { value: "3", label: "Call centers activos" },
            { value: "20K", label: "Proveedores afiliados en red" },
            { value: "11M", label: "Usuarios/mes atendidos" },
            { value: "2", label: "Clientes públicos verificables" },
          ],
        },
      },
      {
        id: "certificaciones",
        label: "Certificaciones y estrategia",
        title: "Certificaciones, stack y postura frente a la IA",
        content:
          "## Certificaciones oficiales\n\n*Fuente: [telasist.com/nosotros](https://www.telasist.com/nosotros) — verificado público.*\n\n| Certificación | Descripción |\n|---|---|\n| **ISO 9001:2015** | Sistema de Gestión de Calidad |\n| **ISO/IEC 27001:2022** | Sistema de Gestión de Seguridad de la Información |\n| **PCI DSS SAQ v3.2.1 (SAQ D-SP)** | Compliance para procesamiento de datos de tarjetas |\n| **IQNET** | Reconocimiento internacional del sistema de calidad |\n| **Distintivo ESR (CEMEFI)** | Empresa Socialmente Responsable |\n\n> 💡 **Implicación estratégica:** PCI DSS SAQ D-SP es el nivel más exigente para proveedores de servicio que procesan pagos por cuenta de terceros. Cualquier agente de voz que interactúe con datos de tarjeta debe respetar ese perímetro con masking en tiempo real. **El Einstein Trust Layer y las políticas de zero-retention de Agentforce son la única forma nativa de mantener ese compliance con GenAI.**\n\n## Stack tecnológico\n\n### Verificado públicamente\n\n| Producto | URL / Evidencia | Rol |\n|---|---|---|\n| **Salesforce** | `telasist.lightning.force.com` | Instancia activa · implementación ~ene 2026 |\n| Experience Cloud | `telasist.my.site.com/PortalProveedores` | Portal de proveedores en producción |\n| **Oracle Cloud Infrastructure** | Caso de éxito en blogs.oracle.com | 30% de ahorro reportado |\n| **uContact by net2phone** | `telasist.ucontactcloud.com` | Plataforma CCaaS omnicanal activa |\n| CRM propietario | `telasistcrm.com` | Analítica propia |\n| Google Workspace | Intranet corporativa | Colaboración interna |\n| Globspot | Distribuidor autorizado | GPS/telemetría vehicular *(alianza comercial)* |\n\n### Stack para el POC · [interno · PDF Salesforce]\n\n- **Amazon Connect (AWS)** como telephony provider — Telasist trae su propia AWS (**BYOT**)\n- **Salesforce Service Cloud + Agentforce 1 Edition** — con Data Cloud + Flex Credits incluidos\n- **Partner Voice Forwarding** para Agentforce Voice — AWS llama a un número asignado por Salesforce\n\n> ⚠️ **Coexistencia con uContact — punto crítico a resolver:** Telasist opera hoy sobre **uContact by net2phone** *(verificado público)* y el PDF interno reporta **Amazon Connect**. Hay que confirmar con el cliente si:\n>\n> **(a)** migran fuera de uContact\n> **(b)** uContact y Amazon Connect coexisten por campaña\n> **(c)** Amazon Connect es el destino final\n>\n> Este es un item **crítico** del cuestionario UC1.\n\n## Situación competitiva\n\n**[interno · PDF Salesforce]** Telasist evalúa activamente:\n\n- **Amazon Bedrock** — plataforma de LLMs de AWS\n- **Eleven Labs** — Voice AI especializado en TTS/STT\n\n> 🎯 **La apuesta:** El POC de Agentforce Voice es la apuesta de Telasist por Salesforce. El resultado del piloto UC1 decide si Salesforce se queda como su plataforma de Voice AI corporativa o si migran a alternativas de AWS/terceros.",
      },
      {
        id: "volumen",
        label: "Volumen y campañas",
        title: "Volumen de llamadas por campaña — base para dimensionamiento",
        content:
          "> 📊 **[interno · PDF Salesforce]** Telasist opera aproximadamente **325,000 llamadas inbound al año** a través de 7 campañas principales + 150+ campañas menores. La tabla siguiente cubre el **95% de todas las llamadas recibidas**.\n\n> ⚠️ Todos estos volúmenes deben **confirmarse formalmente con Telasist** en el kickoff del POC.\n\n## Total por campaña · jul-2025 a jun-2026\n\n| Campaña | Total 12m | Prom./mes | Duración | Complejidad | Routing recomendado |\n|---|---|---|---|---|---|\n| **Viva Aerobus** | 111,929 | ~9,327 | TBD | Media-Alta | 🎤 Voice híbrido *(UC2 Fase 2)* |\n| Guros | 62,757 | ~5,230 | TBD | Media | 💬 Digital *(evaluación deflection)* |\n| Invex | 52,732 | ~4,394 | TBD | Media | 💬 Digital + Voice validation |\n| **Coppel** | 47,047 | ~3,921 | 6 min | Media | 🎤 Voice *(UC3 Fase 2)* |\n| ADO | 22,828 | ~1,902 | TBD | Baja | 💬 Digital *(self-service chat)* |\n| Multiasist | 16,550 | ~1,379 | TBD | Mixta | 💬 Digital *(evaluación)* |\n| GNP | 12,066 | ~1,005 | TBD | Baja-Media | 💬 Digital *(Q&A estructurado)* |\n| **Águila** | 426 *(4m)* | ~107 | 6 min | Simple | 🎤 **Voice · UC1 PILOTO** |\n\n> **Total campañas listadas:** ~325,909 llamadas/año\n>\n> Las duraciones marcadas **TBD** requieren confirmación en el kickoff — es una pregunta del cuestionario UC1 y **bloqueador de dimensionamiento** de minutos de voz.\n\n## Análisis del routing Voice vs. Digital\n\n### 🎤 Recomendadas para Voice · alto volumen + flujo estructurado\n\n- **El Águila** *(piloto)*\n- **Coppel** *(alto volumen con estructura)*\n- **Viva Aerobus** *(híbrido por carga emocional)*\n\n### 💬 Recomendadas para Digital · async / chat\n\n- **Multiasist** — flujo mixto\n- **GNP** — Q&A de seguros\n- **ADO** — queries de transporte\n- **Guros** — deflection digital\n- **Invex** — validación por voz posible pero digital preferido para banca\n\n> 📝 **Nota metodológica:** No todas las llamadas se convierten en Case — algunos volúmenes están incompletos por migración de campañas. Datos válidos como **estimación de scope**; requieren validación formal para el sizing de licenciamiento y consumption plan.",
      },
      {
        id: "uc-map",
        label: "Mapa de UCs",
        title: "Los 5 casos de uso — vista consolidada",
        content:
          "> 🎯 **Estrategia:** El proyecto se estructura en **5 casos de uso** con distintas fases. UC0 y UC1 son los pilotos de bajo riesgo; UC2/UC3 dependen de su éxito; UC4 es transversal continuo y arranca en paralelo sin bloqueo comercial.\n\n## Vista consolidada\n\n| # | Nombre | Campaña | Fase | Canal | Volumen/mes | Complejidad | Escritura en SF |\n|---|---|---|---|---|---|---|---|\n| **UC0** 🆕 | Coppel Info Concierge · Club de Protección Familiar | Coppel *(informativo)* | 🥇 **Piloto informativo** | Voz *(inbound)* | ~1,538 llamadas | Baja *(solo KB)* | **Ninguna en Fase 1** |\n| **UC1** | Águila · Overflow Call Management | El Águila | 🥇 **Piloto operativo** | Voz *(inbound)* | ~107 llamadas | Simple | Case (Toma de datos) |\n| **UC2** | Viva Aerobus · Refund Request Processing | Viva Aerobus | Fase 2 | Voz + SMS/WhatsApp | ~9,327 llamadas | Media-Alta | Case + SMS |\n| **UC3** | Coppel · Service Request Triage | Coppel *(coordinación)* | Fase 2 | Voz | ~3,921 llamadas | Media | Case + geocode |\n| **UC4** | Telasist Copilot · Agent Assist Interno | *(transversal)* | Continuo | Voz in-call *(interno)* | 350 seats × 100% | Continua | Asiste, no reemplaza |\n\n> ⚡ **Nota UC0 + UC3 son complementarios sobre Coppel** — UC0 responde *\"¿qué me cubre?\"* sin crear Case, y hace warm handoff a UC3 cuando el usuario efectivamente pide el servicio *\"quiero una grúa\"*. Juntos cubren ~5,459 llamadas/mes de Coppel *(el 55% del volumen mensual de Coppel)*.\n\n## Estrategia de secuenciamiento\n\n**UC0** es el caso con **menor riesgo operativo** de todos: es de solo-lectura, no toca datos maestros, no despacha proveedores, no dispara automatizaciones. Puede arrancar como **demostración temprana de valor** en paralelo a UC1, aún antes de UC3.\n\n**UC1** valida la arquitectura técnica end-to-end *(Amazon Connect → Partner Voice Forwarding → Agentforce Voice → Case creation → Email)*, con volumen bajo y **consecuencias contenidas** si algo falla.\n\nUna vez que UC0 + UC1 demuestran métricas de éxito **(deflection >75%, CSAT >4.0)**, UC2 y UC3 se lanzan en paralelo aprovechando la misma configuración base. UC3 hereda la KB curada por UC0.\n\n**UC4** puede arrancar en paralelo a UC0/UC1 porque **no depende del SKU de Voice** customer-facing — está cubierto por lo que la licencia SC Agentforce 1 Edition ya incluye.\n\n## Dependencias comerciales para arrancar\n\n| # | Dependencia | Aplica a | Estado |\n|---|---|---|---|\n| 1 | Compra SKU **Agentforce Contact Center Voice** *($75/seat/mes × 350 = $26,250/mes)* | UC0 · UC1 · UC2 · UC3 | 🟡 Pendiente firma |\n| 2 | Override de **CPQ rule #12VY** *(SKU US Long Code con billing MX)* | UC0 · UC1 · UC2 · UC3 | 🔴 En escalación |\n| 3 | Licencia SC Agentforce 1 Edition ya contratada | UC4 | 🟢 **Sin bloqueo — puede arrancar hoy** |\n| 4 | Aprobación editorial de KB Coppel por Telasist *(y opcionalmente Coppel)* | UC0 | 🟡 Owner editorial por definir |",
      },
      {
        id: "uc0",
        label: "UC0 · Coppel Info (nuevo)",
        title: "UC0 — Coppel Club de Protección Familiar · Agente Informativo por Voz",
        content:
          "> 🆕 **Nuevo caso de uso descubierto en julio 2026.** El análisis del volumen real de Coppel (52,364 llamadas · feb–jul 2026) reveló que **~36.6% de las llamadas no crean Case** — son consultas informativas sobre beneficios del *Club de Protección Familiar*, transferencias a atención de Coppel, o info no relacionada. Este UC0 se enfoca en la porción **contestable por Knowledge Base** (17.6% del total · 9,225 llamadas en 6 meses).\n\n## TL;DR\n\n> **UC0** es un agente de Agentforce Voice **de solo lectura sobre Salesforce Knowledge** — responde preguntas sobre servicios cubiertos, alcances, exclusiones, requisitos y procedimientos del *Club de Protección Familiar Coppel*, **sin crear Case ni objetos transaccionales**. Es el UC con menor riesgo operativo del portafolio: no toca datos maestros, no despacha proveedores, no dispara automatizaciones. Su métrica de éxito es **% de consultas resueltas por el bot vs. escalación a humano**.\n\n### Por qué UC0 antes que UC3\n\n| Dimensión | UC0 (Info Coppel) | UC3 (Triage Coppel) |\n|---|---|---|\n| Volumen mensual estimado | ~1,538 llamadas *(9,225 / 6m)* | ~3,921 llamadas |\n| Complejidad de dominio | **Baja** — Q&A sobre KB estática | Media — captura + validación KBA + geocoding |\n| Escritura en Salesforce | **Ninguna** *(solo lectura)* | Case + Contact + Task |\n| Integraciones externas | Ninguna | API Coppel · Geocoding |\n| Riesgo de compliance | Bajo — no toca PCI ni PII sensible | Medio — captura identidad |\n| Tiempo estimado a producción | **2–3 semanas** | 8–10 semanas |\n\n> 🎯 **Propuesta:** UC0 arranca **antes** de UC3, actúa como *warm-up* del piloto Coppel, y sirve como demostración temprana de valor mientras se resuelven los bloqueadores comerciales (CPQ #12VY) y el descubrimiento de UC1.\n\n---\n\n## 1 · Volumen Coppel · desglose real feb–jul 2026\n\n> 📊 **Fuente:** matriz interna Telasist *(archivo `Coppel.xlsx` compartido por el cliente el 7-jul-2026)*. Ver Assets.\n\n### Tipificaciones observadas\n\n| Tipificación | Feb | Mar | Abr | May | Jun | Jul | **Total 6m** | **%** | UC objetivo |\n|---|---:|---:|---:|---:|---:|---:|---:|---:|---|\n| Coordinación de asistencia | 2,140 | 4,219 | 3,926 | 3,975 | 4,401 | 823 | **19,484** | 37.2% | UC3 · Triage |\n| 🟡 **Información de beneficios** | 1,245 | 2,271 | 2,106 | 1,459 | 1,738 | 406 | **9,225** | **17.6%** | **UC0** ⬅ |\n| 🟡 Se transfiere a Attn Cliente Coppel | 873 | 1,781 | 1,863 | 1,899 | 1,677 | 413 | **8,506** | 16.2% | UC0 *(handoff)* |\n| Seguimiento a un caso | 849 | 1,083 | 1,258 | 1,797 | 1,347 | 209 | **6,543** | 12.5% | UC3 *(lookup Case)* |\n| Se corta llamada | 363 | 838 | 855 | 1,009 | 1,012 | 141 | 4,218 | 8.1% | *(residual)* |\n| 🟡 Info no relacionada a asistencia | 264 | 371 | 218 | 304 | 258 | 44 | **1,459** | 2.8% | UC0 *(handoff)* |\n| 🟡 Transferencia a Promass | 1 | 3 | 17 | 429 | 555 | 113 | **1,118** | 2.1% | UC0 *(handoff)* |\n| Sin tipificación | 217 | 204 | 305 | 113 | 232 | 47 | 1,118 | 2.1% | *(residual)* |\n| Escalaciones + Supervisor *(posible queja)* | 10 | 46 | 222 | 138 | 87 | 8 | 511 | 1.0% | Humano |\n| Número equivocado / bromas / buzón | 23 | 40 | 23 | 28 | 24 | 4 | 142 | 0.3% | *(residual)* |\n| Pruebas internas · reembolsos | 16 | 10 | 8 | 2 | 4 | 0 | 40 | <0.1% | *(residual)* |\n| **TOTAL** | **6,001** | **10,866** | **10,801** | **11,153** | **11,335** | **2,208** | **52,364** | 100% | — |\n\n### Insight\n\n> 🎯 **El scope de UC0 combinado** *(Info de beneficios + Attn Cliente + Info no relacionada + Transferencia a Promass)* representa **20,308 llamadas / 6 meses = 38.8% del volumen total** — de las cuales **9,225 (45.4%) son contestables por KB** y las otras 11,083 (54.6%) son **handoffs deterministas** *(dar un teléfono, transferir a Promass)*.\n>\n> El cliente marcó **27,362 llamadas en amarillo** *(52.3% del total)* como gestionables por IA — nuestra cifra de UC0 está dentro de ese scope, focalizada.\n\n### Estimación de dimensionamiento\n\n- **Volumen mensual esperado UC0 (pleno):** ~3,385 llamadas/mes *(20,308 / 6)*\n- **AHT esperado:** 90–180 segundos *(consulta simple → respuesta directa)*\n- **Minutos/mes de Voice:** ~5,000–10,000 minutos\n- **Cobertura horaria:** 24/7 *(la KB soporta consulta a cualquier hora)*\n\n---\n\n## 2 · Diseño del agente · Coppel Info Concierge\n\n### Ficha técnica\n\n| Campo | Detalle |\n|---|---|\n| **Nombre** | Coppel Info Concierge *(alias sugerido: 'Asistente Club Coppel')* |\n| **Objetivo** | Responder consultas sobre beneficios, cobertura, procedimientos y requisitos del *Club de Protección Familiar Coppel* usando exclusivamente Salesforce Knowledge. **Nunca inventar información.** |\n| **Rol** | Asistente conversacional inbound informativo · español mexicano neutro · tono claro, directo, empático cuando aplica |\n| **Canal** | Voz inbound *(Amazon Connect → Partner Voice Forwarding → Agentforce Voice)* |\n| **Escalamiento** | Cuando la consulta requiere coordinación real *(quiero una grúa)*, cuando la KB no cubre la pregunta, cuando el usuario pide humano, cuando detecta queja/escalación emocional |\n| **Escritura en Salesforce** | **Ninguna en Fase 1.** Ver Action Items — pendiente definir con cliente si registrar `Interaccion__c` para telemetría |\n| **Subagents** | Ninguno *(agente monolítico simple)* |\n\n### Persona base *(system prompt esbozado)*\n\n> Eres **'Asistente Club Coppel'**, el asistente virtual del *Club de Protección Familiar Coppel*. Tu única función es **informar** al llamante sobre los servicios que tiene cubiertos, sus alcances, exclusiones, horarios, requisitos y cómo solicitarlos.\n>\n> **Hablas** español mexicano neutro, con tono claro y directo. **No** eres un asesor legal, médico, nutriológico ni de seguros — cuando la pregunta requiera esa especialidad, dirige al servicio correspondiente *(Orientación Legal, Orientación Médica, etc.)*.\n>\n> **Nunca inventes información.** Si la Knowledge Base no cubre la respuesta, dilo con transparencia y ofrece transferir a un asesor humano. Si te preguntan si eres humano, responde con honestidad que eres un asistente digital.\n>\n> **Nunca** confirmes cobertura específica del titular *(vigencia, historial de eventos)* — eso requiere validación en sistema, que hace el humano. Explica el alcance del beneficio en abstracto, no el estado del contrato del llamante.\n>\n> **Cuando el usuario pida un servicio real** *(\"quiero una grúa\", \"necesito abogado\")*, transfiere al equipo humano — tú **solo informas**, no coordinas.\n\n### Topic tree propuesto\n\n| Topic | Propósito | Actions |\n|---|---|---|\n| **1 · Greeting & Intent Detection** | Saludo + detección de intención informativa vs. solicitud de servicio | `Greet_Caller` · `Detect_Intent` |\n| **2 · Servicios cubiertos — Vial** | Info sobre Grúa, Cerrajería auto, Auxilio vial *(llanta/corriente/gasolina)* | `Search_KB_Vial` · `Answer_From_KB` |\n| **3 · Servicios cubiertos — Legal** | Info sobre Abogado Presencial + Orientación Legal Telefónica | `Search_KB_Legal` · `Answer_From_KB` |\n| **4 · Servicios cubiertos — Médica** | Info sobre Orientación Médica, Referencia Red Médica, Asistencia Nutricional, Asistencia Emocional | `Search_KB_Medica` · `Answer_From_KB` |\n| **5 · Servicios cubiertos — Hogar** | Info sobre Plomería, Cerrajería casa, Vidriería *(solo Guanajuato/Tamaulipas/Veracruz)* | `Search_KB_Hogar` · `Answer_From_KB` |\n| **6 · Descuentos — Red Ahorra Más** | Info sobre red de descuentos + link + convenio | `Search_KB_AhorraMas` · `Answer_From_KB` |\n| **7 · Requisitos y beneficiarios** | Vigencia, titular, cónyuge, hijos <21, validación de póliza | `Search_KB_Requisitos` · `Answer_From_KB` |\n| **8 · Solicitud real de servicio** | Detecta que el usuario **quiere el servicio**, no solo info → escala | `Detect_Service_Request` · `Warm_Handoff_To_UC3` |\n| **9 · Transferencia a Promass** | Detecta estado sin cobertura Telasist → da teléfono de Promass | `Detect_Promass_State` · `Provide_Promass_Number` |\n| **10 · Attn Cliente Coppel** | Pregunta fuera del scope de asistencia → deriva a 800 220 7735 | `Provide_Coppel_Number` |\n| **11 · Queja / escalación** | Detecta reclamo → escala a supervisor humano | `Detect_Complaint` · `Escalate_To_Human` |\n| **12 · Off-topic / número equivocado** | Cierre cortés | `Polite_Close` |\n\n### Actions (Actions) del agente\n\n1. **`Greet_Caller`** — saludo dinámico + confirmación de que llegó al Club de Protección Familiar Coppel\n2. **`Detect_Intent`** — clasifica la llamada en: (a) consulta informativa, (b) solicitud real de servicio, (c) transferencia externa, (d) queja\n3. **`Search_KB`** — Custom Retriever sobre Salesforce Knowledge con filtros de Data Category `Cliente = Coppel` + `Producto = Club Protección Familiar`\n4. **`Answer_From_KB`** — lee al usuario el campo `Answer__c` verbatim del artículo recuperado\n5. **`Cite_Article_Metadata`** — internamente registra qué `KnowledgeArticleVersion.Id` se usó *(para auditoría — sin escritura en Case)*\n6. **`Detect_Service_Request`** — si el usuario dice \"quiero\", \"necesito\", \"envíenme\" → activa handoff a UC3\n7. **`Warm_Handoff_To_UC3`** *(cuando UC3 esté vivo)* — transferencia al agente de Triage con resumen\n8. **`Warm_Handoff_To_Human`** *(mientras UC3 no exista)* — transferencia a queue de humanos Coppel con transcript\n9. **`Provide_Promass_Number`** — da al usuario el teléfono `55 5094 9422` cuando aplique\n10. **`Provide_Coppel_Number`** — da al usuario el teléfono `800 220 7735` de Atención a Clientes Coppel\n11. **`Detect_Complaint`** — palabras clave *(queja, reclamar, denunciar, supervisor, mal servicio)* → escalación\n12. **`Polite_Close`** — cierre cortés + oferta de callback si aplica\n\n### Guardrails críticos\n\n1. **Nunca confirmar** vigencia de la póliza del llamante — solo alcances abstractos del beneficio\n2. **Nunca prometer** que el servicio se enviará — el bot informa; UC3 coordina\n3. **Nunca inventar** cifras, plazos, alcances o exclusiones que no estén en la KB\n4. Si la KB no cubre la pregunta → **decirlo con claridad + ofrecer humano**, no adivinar\n5. Si el usuario reporta emergencia grave *(accidente con heridos, robo con violencia, urgencia médica)* → **escalar inmediatamente** sin intentar contestar\n6. Si el usuario habla de queja o supervisor → **transferir de inmediato** *(matches Escalaciones + Supervisor = 511 llamadas/6m del volumen)*\n\n### Criterios de escalamiento a humano\n\nEscala cuando:\n\n- El usuario **pide un servicio real** *(no solo info)* — handoff a UC3 (o cola humana si UC3 aún no existe)\n- El usuario **pide humano** explícitamente\n- **La KB no cubre la respuesta** después de 1 intento de re-formulación\n- **Detección de queja** o palabras clave de reclamo\n- **Detección de urgencia** *(médica, siniestro grave)*\n- **3 intentos fallidos** de entender la intención del usuario\n\n---\n\n## 3 · Estrategia de Knowledge Base\n\n### Fuente única de verdad\n\n> 📄 **`Club de Protección Familiar Coppel V1 - Knowledge Base.pdf`** *(entregado por el cliente 7-jul-2026 · disponible en Assets)* — es la **única fuente autoritativa hoy** para el corpus inicial de UC0. Todos los artículos que redactemos deben salir *verbatim* de este documento *(protocolo editorial acordado en el proyecto PAM, misma regla)*.\n\n### Record Types propuestos en Salesforce Knowledge\n\n| Record Type | Uso | Ejemplos | Cantidad estimada |\n|---|---|---|---|\n| **`Servicio_Cubierto`** | Un artículo por cada uno de los 11 servicios cubiertos. Estructura: Descripción · Alcance · Horario · Exclusiones · Procedimiento | Grúa · Cerrajería Auto · Auxilio Vial · Abogado Presencial · etc. | **11 artículos** |\n| **`Policy`** | Reglas transversales del plan Coppel | Cobertura por estado *(módulos)* · Beneficiarios · Vigencia · Validación SINALOA · Requisitos generales | **5 artículos** |\n| **`Contacto_Externo`** | Números y canales de terceros que el bot debe dar al usuario | Attn Cliente Coppel · Promass · Urge Grúa · Guía del Asegurado *(WhatsApp)* · Red Ahorra Más | **5 artículos** |\n| **`FAQ`** *(fallback)* | Preguntas frecuentes que no encajan en los anteriores | \"¿Qué pasa si mi póliza no aparece?\" · \"¿Cómo sé si estoy vigente?\" | **3–5 artículos** |\n\n> **Total corpus inicial estimado:** ~24–26 artículos.\n\n### Data Categories propuestos\n\nTres grupos ortogonales, siguiendo el patrón acordado en PAM Concierge *(4 grupos)* pero simplificado porque UC0 tiene menos ejes:\n\n#### Grupo 1 · `Cliente_Corporativo`\n- `Coppel` ← todos los artículos de UC0 llevan esta categoría\n- *(Águila, Viva, GNP, ADO, etc. se agregarán cuando cada UC construya su propia KB)*\n\n#### Grupo 2 · `Producto`\n- `Club_Proteccion_Familiar` *(Coppel)*\n- *(preparado para acomodar futuros productos Coppel si crecen)*\n\n#### Grupo 3 · `Categoria_Servicio`\n- `Vial` — Grúa, Cerrajería auto, Auxilio vial\n- `Legal` — Abogado presencial, Orientación legal\n- `Medica` — Orientación médica, Referencia red médica, Nutricional, Emocional\n- `Hogar` — Plomería, Cerrajería casa, Vidriería\n- `Descuentos` — Red Ahorra Más\n- `Transversal` — Policies (beneficiarios, vigencia, módulos por estado, SINALOA)\n- `Contactos_Externos` — Números de referencia\n\n### Convención Q/A/Body/Summary *(misma que PAM)*\n\n- **`Question__c`** — Pregunta principal en primera persona del usuario, tipo tweet *(~120 chars)*. UN artículo = UNA pregunta principal citable\n- **`Answer__c`** — Respuesta corta verbatim, 2–4 oraciones *(≤ 500 chars ideal)*. Es lo que el bot lee al usuario\n- **`FWD_Article_Body__c`** — Cuerpo completo con HTML *(h2/h3, listas, tablas)*. Aloja variantes secundarias, T&C expandidos, ejemplos\n- **`Summary`** — Hover/preview en list views, NO citado por el bot\n- **Cross-references entre artículos** viven en el `Body`, jamás en el `Answer` citable\n\n### Retriever behavior\n\n- **Query híbrida:** semántica *(embedding del intent del usuario)* + keyword *(match contra `Question__c` y title)*\n- **Re-ranking:** boost a artículos con `Categoria_Servicio` que matchea la intención detectada\n- **Top-K:** 3 artículos → el LLM decide cuál leer verbatim; si ninguno matchea con confianza suficiente, escala\n- **Grounding estricto:** el bot lee `Answer__c` verbatim. NO parafrasea. Si el usuario pide detalle, el bot lee la sección relevante del `FWD_Article_Body__c`\n\n---\n\n## 4 · Catálogo completo de KB Articles · listos para publicar\n\n> ✍️ **Todos los artículos siguen el protocolo editorial acordado:** fuente verbatim vs. interpretación separadas, Q/A obligatorio, cross-refs en Body. Fuente única: `Club de Protección Familiar Coppel V1 - Knowledge Base.pdf`.\n\n### 4.1 — Servicios cubiertos *(Record Type: `Servicio_Cubierto`)*\n\n#### KA-COP-VIA-001 · Grúa\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Qué cubre el servicio de grúa del Club de Protección Familiar Coppel? |\n| **Answer__c** | Cuando tu vehículo no puede circular *(excepto por accidente)*, gestionamos una grúa para trasladarlo hasta 80 km desde el lugar de la avería al destino que elijas. Aplica 24/7, 365 días. Tienes 3 eventos por año. |\n| **Body** | **Descripción:** Cuando el vehículo no pueda circular (excepto accidentes), se gestiona grúa para traslado hasta 80 km desde el lugar de la avería al destino. En caso de domicilio/trabajo, el vehículo debe estar fuera de cochera o estacionamiento cubierto. Aplica para auto propio o prestado. En caso de baches, solicitarse en el momento con foto y ubicación como evidencia. · **Asignación:** 24/7, 365 días · **Alcance:** 3 eventos al año · **Exclusiones:** Daños a nación o propiedad privada con intervención de autoridad; vehículos de 3.5 ton+, transporte público, carga, microbuses, camper, cuatrimotos, trimotos, autobuses, utilitarios, arrendados; golpes/choques intencionados; accidente de tránsito; mantenimiento; vehículo con carga o heridos, atascado en baches/barrancos/zonas pantanosas; pago de casetas o maniobras; grúa enviada y no utilizada (cuenta como servicio); titular en estado de ebriedad; solicitudes contra la ley; fuerza mayor (guerras, pandemias, terremotos, etc.) · **Procedimiento operativo:** 1. Buscar/registrar usuario · 2. Capturar información en plantilla grúa · 3. Confirmar ubicación · 4. Brindar número de caso y pedir espera |\n| **Summary** | Grúa hasta 80 km · 3 eventos/año · 24/7 · no aplica accidentes |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Vial |\n\n#### KA-COP-VIA-002 · Cerrajería Auto\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Qué hago si dejé las llaves dentro de mi auto? |\n| **Answer__c** | Enviamos un cerrajero para abrir tu auto cuando las llaves se hayan quedado dentro. Aplica en casa u oficina, para portezuelas del auto. Cobertura 24/7, 365 días, 3 eventos por año. |\n| **Body** | **Descripción:** Cerrajero para abrir automóvil cuando las llaves se hayan quedado dentro. Aplica en casa u oficina. No aplica para cerraduras eléctricas. Si la llave se rompe al momento de abrir, el servicio no procede. Exclusivo para portezuelas del auto. · **Asignación:** 24/7, 365 días · **Alcance:** 3 eventos al año · **Exclusiones:** Vehículos 3.5 ton+, transporte público, utilitarios, arrendados; golpes/choques intencionados; accidente de tránsito; mantenimiento; casetas o maniobras; cerrajero enviado y no utilizado (cuenta como servicio); titular en estado de ebriedad; fuerza mayor · **Procedimiento operativo:** 1. Buscar/registrar usuario · 2. Capturar en plantilla cerrajería de auto · 3. Confirmar ubicación · 4. Brindar número de caso y pedir espera |\n| **Summary** | Cerrajería auto · 3 eventos/año · no cerraduras eléctricas |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Vial |\n\n#### KA-COP-VIA-003 · Auxilio Vial *(llanta · corriente · gasolina)*\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Qué me cubre el auxilio vial? |\n| **Answer__c** | El auxilio vial cubre tres situaciones: cambio de llanta con tu refacción, paso de corriente al vehículo, y envío de hasta 20 litros de gasolina *(que tú pagas)*. Aplica 24/7. Tienes 3 eventos al año en combinación. |\n| **Body** | **Cambio de llanta:** Pinchadura o aire bajo que impida continuar. Se gestiona cambio por refacción del usuario o inflado. Si tiene birlos de seguridad, debe tener dado maestro. · **Paso de corriente:** Envío de ayuda para suministrar corriente al vehículo sin energía eléctrica. El auto no necesita estar en circulación. · **Suministro de gasolina:** Envío de hasta 20 litros, el usuario debe pagarla. No importa dónde se encuentre. Aplica para motos. · **Asignación:** 24/7, 365 días · **Alcance:** 3 eventos al año en combinación *(los tres sub-servicios comparten el mismo tope)* · **Exclusiones:** No se reparan ni prestan llantas; no se prestan acumuladores; Telasist no se responsabiliza de daños por fallas eléctricas del vehículo (salvo mala ejecución del paso de corriente); paso de corriente no aplica para vehículos eléctricos · **Procedimiento operativo:** 1. Buscar/registrar usuario · 2. Capturar en plantilla Auxilio Vial · 3. Confirmar ubicación · 4. Brindar número de caso y pedir espera |\n| **Summary** | Llanta + corriente + gasolina · 3 eventos/año combinados |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Vial |\n\n#### KA-COP-LEG-001 · Abogado Presencial\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Me proporcionan abogado si tengo un accidente automovilístico? |\n| **Answer__c** | Sí. Si como titular enfrentas responsabilidad penal por un accidente automovilístico *(lesiones, homicidio, daño en propiedad ajena)* y estás detenido, ponemos a tu disposición un abogado que te asiste ante autoridades y busca tu libertad. Cubre hasta $50,000 por evento, 2 eventos al año, exclusivo para titular. |\n| **Body** | **Descripción:** Cuando el titular tenga responsabilidad penal derivada de un accidente automovilístico (lesiones, homicidio, daño en propiedad ajena, etc.) y se encuentre privado de su libertad, se pone a disposición un abogado que lo asistirá ante autoridades e interpondrá recursos legales para procurar su libertad. Incluye honorarios del abogado. · **Asignación:** 24/7, 365 días · **Alcance:** 2 eventos al año, hasta $50,000 cada uno. Exclusivo para titular · **Exclusiones:** No garantiza pago de daños a terceros ni sanciones pecuniarias. El usuario deberá reembolsar a Telasist las cantidades aportadas como fianza cuando se obtenga perdón del afectado o cuando el juez ordene la devolución de la caución · **Procedimiento operativo:** 1. Buscar/registrar usuario · 2. Sondear: titular debe estar detenido como presentado en el MP · 3. Capturar en plantilla Abogado · 4. Validación con abogados de cabina · 5. Asignación con proveedor DART |\n| **Summary** | Abogado presencial titular · 2 eventos/año · $50K c/u |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Legal |\n\n#### KA-COP-LEG-002 · Orientación Legal Telefónica\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Puedo consultar un abogado por teléfono para dudas legales? |\n| **Answer__c** | Sí. Tienes acceso ilimitado a orientación legal telefónica en cualquier rama del Derecho. Un abogado te orienta sobre procedimientos y trámites. Cobertura 24/7, 365 días. |\n| **Body** | **Descripción:** Asesoría jurídica en cualquier rama del Derecho cuando el beneficiario enfrente conflictos legales. Un abogado orienta sobre procedimientos y trámites. Telasist no proporciona opiniones legales ni actúa como asesor legal. · **Asignación:** 24/7, 365 días · **Alcance:** Ilimitado · **Exclusiones:** Consultas de empleados de Coppel contra Coppel o sus filiales · **Procedimiento operativo:** 1. Buscar/registrar usuario · 2. Capturar en plantilla Orientación Legal Telefónica · 3. Transferir llamada garantizando conferencia · 4. Finalizar llamada y tipificar como terminado |\n| **Summary** | Orientación legal telefónica · ilimitado · 24/7 |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Legal |\n\n#### KA-COP-MED-001 · Orientación Médica Telefónica\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Puedo hablar con un médico por teléfono ante una urgencia? |\n| **Answer__c** | Sí. Ante urgencia médica o enfermedad, te comunicamos de inmediato con un médico general que te ayuda a tomar medidas para estabilizar al paciente. Es ilimitado, 24/7. No se dan diagnósticos ni se recetan medicamentos. |\n| **Body** | **Descripción:** En caso de urgencia médica o enfermedad, contacto inmediato con médicos generales que ayudan a tomar medidas necesarias para estabilizar al paciente. · **Asignación:** 24/7, 365 días · **Alcance:** Ilimitado · **Exclusiones:** En ningún caso se dará diagnóstico ni se recetarán medicamentos · **Procedimiento operativo:** 1. Buscar/registrar usuario · 2. Capturar en plantilla Orientación Médica Telefónica · 3. Transferir llamada garantizando conferencia · 4. Médico finaliza llamada y tipifica como terminado. En médico externo, toma de datos pone caso como terminado |\n| **Summary** | Orientación médica telefónica · ilimitado · sin diagnóstico |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Medica |\n\n#### KA-COP-MED-002 · Referencia de Red Médica\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Cómo encuentro hospitales o médicos cercanos? |\n| **Answer__c** | Te damos información de ubicación y teléfonos de hospitales y médicos más cercanos. Aplica para urgencias y también para consultas o dudas médicas generales. Ilimitado, 24/7. No cubrimos gastos médicos ni damos diagnóstico. |\n| **Body** | **Descripción:** Información de ubicación y teléfonos de hospitales y médicos más cercanos. También aplica para consultas o dudas médicas, no solo emergencias. · **Asignación:** 24/7, 365 días · **Alcance:** Ilimitado · **Exclusiones:** No se da diagnóstico ni se receta medicamento. No cubre gastos médicos generados · **Procedimiento operativo:** 1. Buscar/registrar usuario · 2. Capturar en plantilla Referencia de Red Médica · 3. Ejecutivo realiza búsqueda; si no encuentra, pasar a área de asignación y redes · 4. Al brindar referencia, tipificar como terminado |\n| **Summary** | Referencia hospitales/médicos · ilimitado · sin gastos médicos |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Medica |\n\n#### KA-COP-MED-003 · Asistencia Nutricional Telefónica\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Puedo consultar temas de nutrición con un especialista? |\n| **Answer__c** | Sí. Un nutriólogo te asesora por teléfono sobre dieta balanceada, hábitos alimenticios, control de peso, conteo de calorías, recetas y más. Ilimitado, de 9:00 a 18:00 horas, lunes a domingo. |\n| **Body** | **Descripción:** Asesoría para crear estilo de vida saludable: dieta balanceada, mejoramiento de hábitos alimenticios, información nutricional, control de peso, conteo de calorías, recetas nutritivas, consejería de tipos de comida, vinos, reservaciones, entre otros. · **Asignación:** 9:00 a 18:00 horas, lunes a domingo · **Alcance:** Ilimitado · **Exclusiones:** En ningún caso se dará diagnóstico o prescripción. No cubre gastos médicos · **Procedimiento operativo:** 1. Buscar/registrar usuario · 2. Capturar en plantilla Asistencia Nutricional Telefónica · 3. Transferir llamada garantizando conferencia · 4. Nutriólogo finaliza y tipifica como terminado |\n| **Summary** | Asistencia nutricional · ilimitado · L-D 9-18 |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Medica |\n\n#### KA-COP-MED-004 · Asistencia Emocional Telefónica\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Puedo hablar con un psicólogo si estoy pasando por un momento difícil? |\n| **Answer__c** | Sí. Un psicólogo te da terapia breve para situaciones de depresión, adaptación social y familiar, soledad, bullying, sexualidad, problemas laborales, drogadicción y alcoholismo. Ilimitado, de 9:00 a 21:00 horas, lunes a viernes. También hay descuento en la red de psicólogos. |\n| **Body** | **Descripción:** Terapia breve para situaciones críticas de conducta y estados anímicos: depresión, comportamiento, adaptación social y familiar, soledad, bullying, sexualidad, problemas laborales, drogadicción y alcoholismo. Referencia y descuento preferencial de la red de psicólogos. · **Asignación:** 9:00 a 21:00 horas, lunes a viernes · **Alcance:** Ilimitado · **Exclusiones:** En ningún caso se dará diagnóstico o prescripción. No cubre gastos adicionales · **Procedimiento operativo:** 1. Buscar/registrar usuario · 2. Capturar en plantilla Asistencia Emocional Telefónica · 3. Transferir llamada con el especialista · 4. Psicólogo finaliza y tipifica como terminado |\n| **Summary** | Asistencia emocional · ilimitado · L-V 9-21 |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Medica |\n\n#### KA-COP-DES-001 · Red Ahorra Más\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Qué es la Red Ahorra Más y cómo la uso? |\n| **Answer__c** | Es una red de descuentos de 5% a 30% en comercios afiliados. Puedes consultar el detalle en ahorramas.telasist.com. Aplica el convenio COP5735. Necesitas estar al corriente en tus pagos. |\n| **Body** | **Descripción:** Acceso a la red de descuentos del programa AHORRA MÁS, de 5% a 30% de descuento. Más información en ahorramas.telasist.com · **Asignación:** 24/7, 365 días · **Alcance:** Ilimitado · **Exclusiones:** Cuando el titular no esté al corriente de sus pagos · **Procedimiento operativo:** 1. Buscar/registrar usuario · 2. Capturar en plantilla Referencia · 3. Brindar página ahorramas.telasist.com y convenio COP5735 con asesoría de descuentos · 4. Tipificar como terminado |\n| **Summary** | Red descuentos AHORRA MÁS · convenio COP5735 |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Descuentos |\n\n#### KA-COP-HOG-001 · Asistencia Hogar *(Plomería · Cerrajería casa · Vidriería)*\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Me cubren plomería, cerrajería o vidriería en mi casa? |\n| **Answer__c** | Solo si vives en **Guanajuato, Tamaulipas o Veracruz** *(módulos 3 al 6)*. Cubrimos plomería para fugas visibles, cerrajería para pérdida o robo de llaves de casa, y vidriería para vidrios de fachada. 3 eventos al año en combinación, hasta $450 por evento, con 90 días de garantía. |\n| **Body** | **Plomería:** Rotura de tuberías, llaves u otras instalaciones expuestas que provoquen fuga de agua. Solo cubre fuga de agua en tubería visible. · **Cerrajería hogar:** Pérdida, extravío o robo de llaves de casa, o inutilización de cerraduras por causa accidental que impida el acceso a la vivienda. · **Vidriería:** Rotura de vidrios o cristales de puertas o ventanas de fachada (vidrios exteriores). Se cubre cualquier grosor de cristal. · **Asignación:** 24/7, 365 días · **Alcance:** 3 eventos en combinación de hasta $450 c/u. Solo emergencias. Garantía de 90 días naturales. El usuario debe estar presente durante los trabajos o autorizar expresamente por escrito a otra persona. · **Exclusiones:** Locales comerciales, talleres u oficinas; no aplica reembolso ni incluye refacciones ni obra civil; plomería interna, destape de WC/coladeras/drenajes, bombas de agua, filtraciones; cerrajería electrónica; vidriería interior; daños intencionales, fuerza mayor; usuario en estado de ebriedad; usuario sin aviso inmediato vía telefónica; usuario sin pagos al corriente · **Procedimiento operativo:** 1. Buscar/registrar usuario · 2. Capturar en plantilla Asistencia Hogar · 3. Confirmar datos de ubicación e información sobre el servicio · 4. Brindar número de caso y pedir espera · **Cross-reference:** Aplicabilidad geográfica → ver [[KA-COP-POL-001]] Cobertura por módulo/estado |\n| **Summary** | Hogar solo GTO/TAM/VER · 3 eventos/año · $450 c/u · garantía 90d |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Hogar |\n\n### 4.2 — Policies transversales *(Record Type: `Policy`)*\n\n#### KA-COP-POL-001 · Cobertura por módulo y estado\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Qué servicios tengo cubiertos según el estado donde vivo? |\n| **Answer__c** | Los módulos 1 y 6 *(Grúa, Cerrajería auto, Auxilio vial, Abogado, Orient. Legal, Orient. Médica, Ref. Red Médica, Red Ahorra Más, Nutricional, Emocional)* aplican en Jalisco, Michoacán, Guanajuato, Puebla, Hidalgo, Sonora, Veracruz, Tamaulipas, Tlaxcala y Baja California Sur. La asistencia hogar *(módulos 3 al 6)* solo aplica en Guanajuato, Tamaulipas y Veracruz. |\n| **Body** | **Módulos atendidos por Telasist:** · **Módulos 1 y 6** — Jalisco, Michoacán, Guanajuato, Puebla, Hidalgo, Sonora, Veracruz, Tamaulipas, Tlaxcala y Baja California Sur. Incluyen: Grúa, Cerrajería, Auxilio vial, Abogado presencial, Orientación legal telefónica, Orientación médica telefónica, Referencia de red médica, Red Ahorra Más, Asistencia nutricional y Asistencia emocional. · **Módulos 3 al 6** — solo disponibles para Guanajuato, Tamaulipas y Veracruz. Incluyen servicios adicionales de hogar: Plomería, Cerrajería, Vidriería. · **Fuera de estos estados:** el servicio se atiende por otra asistenciadora llamada **Promass** *(ver KA-COP-EXT-002)*. |\n| **Summary** | Módulos 1-6 por estado · Hogar solo GTO/TAM/VER |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Transversal |\n\n#### KA-COP-POL-002 · Beneficiarios y vigencia\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Quiénes son mis beneficiarios y cómo verifico mi vigencia? |\n| **Answer__c** | Los beneficiarios son el titular afiliado al Club, su cónyuge y sus hijos descendientes en primer grado menores de 21 años. La vigencia depende de tus pagos *(mensuales, trimestrales o anuales)* y se valida en sistema. |\n| **Body** | **Beneficiarios:** Cualquier cliente afiliado al Club de Protección Familiar, así como su cónyuge y familiares descendientes en primer grado menores de 21 años. · **Vigencia:** Se determina mediante pagos mensuales, trimestrales o anuales, acorde a los pagos realizados por el cliente. Se valida en las fechas de vigencia registradas en sistema. · **Nota operativa:** el bot **no confirma vigencia individual** — solo explica la regla. La confirmación del estado del contrato del llamante requiere validación humana. |\n| **Summary** | Titular + cónyuge + hijos <21 · vigencia por pagos |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Transversal |\n\n#### KA-COP-POL-003 · Requisitos para solicitar servicio\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Qué necesito para solicitar un servicio? |\n| **Answer__c** | Necesitas proporcionar tu número de cliente y el nombre del titular. Nuestro sistema valida que estés activo y dentro de los estados que atendemos. Si no apareces, lo ingresamos manualmente tras validación por sondeo. |\n| **Body** | **Requisitos operativos:** 0. Proporcionar número de cliente y nombre del titular (confirmar que esté activo y dentro de los estados que atiende Telasist). · 1. Si el cliente no aparece en base de datos pero indica que está activo, se ingresará manualmente con previa validación mediante sondeo. · 2. Validar historial de servicios y límite de servicios permitidos. · 3. Verificar beneficiarios: titular, cónyuge e hijos menores de 21 años. · **Si no tienes tu número de cliente:** puedes llamar a Atención a Clientes Coppel al 800 220 7735 para que te lo proporcionen. · **Cross-reference:** validación SINALOA → ver [[KA-COP-POL-004]]. |\n| **Summary** | Requisitos: número cliente + nombre titular + validación |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Transversal |\n\n#### KA-COP-POL-004 · Validación SINALOA\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Cómo se valida mi estado de contratación si aparece SINALOA? |\n| **Answer__c** | Si el sistema indica que tu estado de contratación es SINALOA, se valida por número de tienda: 800 → pago domiciliado, 7502 → portal de contratación en línea. Si no tienes número de tienda, sondeamos tu estado de contratación y continuidad de la solicitud. |\n| **Body** | **Regla operativa (interna del asesor humano):** · Si el registro indica que el estado de contratación es **SINALOA**: · Número de tienda **800** → pago domiciliado · Número de tienda **7502** → portal de contratación en línea · **Sin número de tienda:** sondear estado de contratación y continuidad de la solicitud, dejar en notas del servicio lo indicado por el cliente. · **Si el usuario es empleado:** no tienen número de tienda; sondear estado de contratación; debe tener al menos 3 meses laborando; colocar estos datos en notas. · **Nota UC0:** esta regla es de la operación interna del asesor humano — el bot informativo **no confirma** contratación individual; si el usuario pregunta explícitamente por su estatus, escalar a humano. |\n| **Summary** | SINALOA: tienda 800=domiciliado · tienda 7502=portal |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Transversal |\n\n#### KA-COP-POL-005 · Cancelación, transferencia e improcedencia\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Qué pasa si mi solicitud es improcedente o corresponde a otra asistenciadora? |\n| **Answer__c** | Si tu servicio corresponde a otra asistenciadora *(Promass)*, te transferimos al 55 5094 9422. Si es improcedente por términos y condiciones, te compartimos el Manual del Asegurado por WhatsApp con los detalles. Si necesitas grúa urgente aunque sea improcedente, tenemos la opción Urge Grúa. |\n| **Body** | **Cancelación del servicio:** al cancelar un servicio, solo se debe añadir una nota al registro original, evitando crear múltiples servicios cancelados. · **Transferencia a Promass:** Si el servicio corresponde a otra asistenciadora, no se genera caso, se transfiere directamente a Promass al **55 5094 9422** y se tipifica la llamada. Es crucial validar el servicio antes de registrar al usuario. · **Improcedentes:** Para servicios improcedentes *(no cumplen con términos y condiciones)*, siempre compartir el Manual del Asegurado por WhatsApp de SF: **Guía del CDP Familiar**. Este manual contiene los T&C. Al enviarlo, ayudamos a que el cliente entienda por qué el servicio es improcedente y evitamos futuras quejas. · **Transferencia a Urge Grúa:** Si el servicio es improcedente pero requiere grúa, ofrecer: **Opción 1** transferir la llamada al número de Urge Grúa **55 1105 2680**; **Opción 2** buscar un proveedor cercano y enlazar al usuario. |\n| **Summary** | Promass 55 5094 9422 · Urge Grúa 55 1105 2680 · Guía WhatsApp |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Transversal |\n\n### 4.3 — Contactos externos *(Record Type: `Contacto_Externo`)*\n\n#### KA-COP-EXT-001 · Atención a Clientes Coppel\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Cuál es el teléfono de atención a clientes de Coppel? |\n| **Answer__c** | El número de Atención a Clientes de Coppel es **800 220 7735**. Marca ahí si tu consulta no es sobre asistencia, o si necesitas que te proporcionen tu número de cliente. |\n| **Body** | **Número oficial:** 800 220 7735 · **Cuándo transferir:** cualquier consulta que no sea sobre servicios de asistencia del Club de Protección Familiar *(temas de crédito, pagos, tienda, productos Coppel, etc.)*. También si el usuario no tiene su número de cliente. |\n| **Summary** | Atn Clientes Coppel: 800 220 7735 |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Contactos_Externos |\n\n#### KA-COP-EXT-002 · Promass *(asistenciadora alterna)*\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Cuándo llamo a Promass en lugar de a Telasist? |\n| **Answer__c** | Si tu contrato del Club de Protección Familiar está registrado en un estado que atiende Promass y no Telasist, te transferimos directamente al **55 5094 9422**. |\n| **Body** | **Número Promass:** 55 5094 9422 · **Regla:** Telasist atiende módulos 1 y 6 en Jalisco, Michoacán, Guanajuato, Puebla, Hidalgo, Sonora, Veracruz, Tamaulipas, Tlaxcala y Baja California Sur. Fuera de esos estados, la asistencia la brinda Promass. · **Procedimiento:** no se genera caso en Salesforce, se transfiere directamente y se tipifica la llamada como \"Transferencia a Promass\". · **Cross-reference:** cobertura por estado → ver [[KA-COP-POL-001]]. |\n| **Summary** | Promass: 55 5094 9422 · fuera de estados Telasist |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Contactos_Externos |\n\n#### KA-COP-EXT-003 · Urge Grúa\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Qué hago si necesito grúa urgente pero mi servicio es improcedente? |\n| **Answer__c** | Ofrecemos la opción **Urge Grúa** al **55 1105 2680**. También podemos buscarte un proveedor cercano y enlazarte, aunque el servicio corre por tu cuenta. |\n| **Body** | **Número Urge Grúa:** 55 1105 2680 · **Cuándo aplica:** cuando el servicio de grúa es improcedente por T&C pero el usuario tiene una necesidad real e inmediata. · **Opciones ofrecidas al usuario:** · Opción 1 — transferencia directa al 55 1105 2680 · Opción 2 — búsqueda de proveedor cercano y enlace al usuario · **Nota:** el costo del servicio corre por cuenta del usuario. |\n| **Summary** | Urge Grúa: 55 1105 2680 · improcedentes con costo |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Contactos_Externos |\n\n#### KA-COP-EXT-004 · Guía del Asegurado *(WhatsApp)*\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Dónde consulto los términos y condiciones completos del Club? |\n| **Answer__c** | Los términos y condiciones completos están en la **Guía del Asegurado CDP Familiar**, que compartimos por WhatsApp cuando aplica. Si tu solicitud fue improcedente, es probable que ya te la hayamos enviado. |\n| **Body** | **Guía del Asegurado CDP Familiar** — documento que contiene los términos y condiciones completos del *Club de Protección Familiar Coppel*. · **Uso operativo:** siempre compartir por WhatsApp de Service Cloud en casos improcedentes. Ayuda al cliente a entender por qué su servicio no procedió y evita futuras quejas. · **Cross-reference:** política de improcedencia → ver [[KA-COP-POL-005]]. |\n| **Summary** | Guía Asegurado CDP · WhatsApp SF · casos improcedentes |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Contactos_Externos |\n\n#### KA-COP-EXT-005 · Red Ahorra Más *(portal externo)*\n\n| Campo | Contenido |\n|---|---|\n| **Question__c** | ¿Dónde consulto la red de descuentos AHORRA MÁS? |\n| **Answer__c** | En **ahorramas.telasist.com** con el convenio **COP5735**. Ahí encuentras todos los comercios afiliados y descuentos disponibles. |\n| **Body** | **Portal:** ahorramas.telasist.com · **Convenio Coppel:** COP5735 · **Descuentos:** 5% a 30% · **Cross-reference:** ver también artículo del servicio [[KA-COP-DES-001]] Red Ahorra Más. |\n| **Summary** | Portal ahorramas.telasist.com · convenio COP5735 |\n| **Data Categories** | Cliente_Corporativo=Coppel · Producto=Club_Proteccion_Familiar · Categoria_Servicio=Contactos_Externos |\n\n---\n\n## 5 · Ejemplo de conversación · happy path informativo\n\n**Perfil del cliente:** Rosa María Vázquez, titular Club de Protección Familiar de Coppel. Quiere saber si el servicio de grúa cubre a su nuera que le pidió prestado el auto.\n\n> 🤖 **Agente:** Hola, buenas tardes. Soy el asistente virtual del Club de Protección Familiar de Coppel. ¿En qué le puedo ayudar hoy?\n>\n> 👤 **Rosa:** Buenas tardes. Tengo una duda. Si le presto mi carro a mi nuera y se le poncha una llanta, ¿me cubre el servicio?\n\n**Acción:** `Detect_Intent` → **Consulta informativa** (no solicitud real de servicio)\n\n**Acción:** `Search_KB` → Category `Vial` → recupera `KA-COP-VIA-003 · Auxilio Vial` con score 0.91\n\n> 🤖 **Agente:** Muy buena pregunta, señora Vázquez. Sí, el auxilio vial aplica para su vehículo aunque lo esté conduciendo otra persona, incluso si es un auto prestado. En caso de pinchadura, gestionamos el cambio de llanta con su refacción. Recuerde que tienen 3 eventos al año en combinación con paso de corriente y suministro de gasolina.\n>\n> 👤 **Rosa:** Perfecto. Y si me quedo sin gasolina, ¿me cobran algo?\n\n**Acción:** `Search_KB` → mismo artículo → sección Suministro de gasolina\n\n> 🤖 **Agente:** El envío del proveedor con hasta 20 litros no tiene costo, pero **la gasolina la paga usted**. Aplica también si maneja moto.\n>\n> 👤 **Rosa:** Ah, muy bien. Una última: mi hijo tiene 22 años, ¿él también está cubierto?\n\n**Acción:** `Search_KB` → Category `Transversal` → recupera `KA-COP-POL-002 · Beneficiarios y vigencia`\n\n> 🤖 **Agente:** Los beneficiarios directos son usted como titular, su cónyuge, y los hijos descendientes en primer grado **menores de 21 años**. Con 22 años, su hijo ya no aparecería como beneficiario de su plan.\n>\n> 👤 **Rosa:** Entiendo. Muchas gracias, ya no tengo más dudas.\n>\n> 🤖 **Agente:** Con gusto, señora Vázquez. Cualquier otra consulta estamos aquí 24/7. Que tenga excelente tarde.\n\n### Post-llamada\n\n**Ningún Case creado.** Ninguna escritura en Salesforce en Fase 1 *(ver Action Items para discutir con cliente)*. La llamada queda registrada solo como `VoiceCall` estándar de Amazon Connect + Contact Lens. **CSAT se envía por SMS** para medir satisfacción de consulta resuelta.\n\n---\n\n## 6 · KPIs de éxito UC0 · piloto 60 días\n\n| KPI | Target | Cómo se mide |\n|---|---|---|\n| % consultas resueltas por bot sin escalar | **≥75%** | Sobre el volumen tipificado hoy como *Información de beneficios* |\n| Tasa de precisión de la KB *(no alucinación)* | **100% verbatim** | Auditoría muestral semanal de conversaciones vs. artículo citado |\n| CSAT post-llamada *(SMS 1–5)* | **≥4.2** | Envío automático tras cierre de VoiceCall |\n| AHT promedio bot vs. AHT humano | **−50%** | Baseline actual del asesor humano en tipificación *Información de beneficios* — **por confirmar con Telasist en kickoff** |\n| Handoffs correctamente ruteados *(Promass · Coppel · UC3)* | **≥90%** | Muestreo de las transferencias |\n| Cobertura de la KB *(preguntas contestables / totales)* | **≥90%** | % de consultas donde el retriever recupera artículo con score >0.7 |\n\n---\n\n## 7 · Action Items abiertos con el cliente Telasist · UC0\n\n> ✅ **Estas decisiones NO están tomadas todavía.** El diseño actual asume la opción más conservadora *(cero escritura en Salesforce en Fase 1)*, pero muchas requieren definición con Telasist antes del build.\n>\n> 📌 **Actualización 8-jul-2026:** algunos AIs pueden pre-responderse con la inspección de la Sandbox QA — ver anotación ✅ (resuelto por inspección) o 🔎 (requiere confirmación aunque tengamos evidencia técnica). Los detalles técnicos están en §8.\n\n### 7.1 · Registro de interacciones\n\n- [ ] **AI-UC0-01** — ¿Registramos las llamadas informativas resueltas por bot en algún objeto de Salesforce *(nuevo `Interaccion__c`, o reuso de un objeto existente)* para medir deflection real y contenido consultado?\n- [ ] **AI-UC0-02** — Si sí registramos: ¿qué campos mínimos? *(fecha/hora, ANI, Cliente Corporativo, artículo citado, categoría de intent, resuelta vs. escalada, CSAT si vuelve)*\n- [ ] **AI-UC0-03** — ¿Aceptable que UC0 en Fase 1 **NO cree Case ni Interaccion__c** y que la telemetría venga solo de `VoiceCall` + Contact Lens transcript? Riesgo: sin persistencia estructurada del intent, la lectura de \"resueltas vs. escaladas\" depende de post-procesamiento del transcript. *(📌 8-jul-2026: en la sandbox NO existe hoy un objeto `Interaccion__c` — solo `Consulta_Medica__c` de dominio clínico y `EngagementInteraction` estándar. Cualquier telemetría estructurada requiere crear objeto nuevo.)*\n\n### 7.2 · Handoff cuando llega la solicitud real de servicio\n\n- [ ] **AI-UC0-04** — Cuando el usuario pasa de \"info\" a \"quiero el servicio\", **¿UC0 transfiere a asesor humano o a UC3 *(si ya existe)*?** Impacta la secuencia de despliegue.\n- [ ] **AI-UC0-05** — ¿Existe hoy una queue humana dedicada para consultas informativas que fallen? ¿O caen todas al mismo pool general de Coppel?\n- [ ] **AI-UC0-06** — Cuando el bot transfiere, ¿qué debe recibir el humano? *(transcript completo, resumen del intent, artículo consultado, ambos)*\n\n### 7.3 · Governance de la Knowledge Base\n\n- [ ] **AI-UC0-07** — ¿Quién es el **owner editorial de la KB Coppel** dentro de Telasist? Necesitamos un firmante único para aprobar cada artículo antes de publicar.\n- [ ] **AI-UC0-08** — ¿La KB se aprueba también por Coppel *(cliente final)* o basta la firma interna de Telasist?\n- [ ] **AI-UC0-09** — ¿Con qué frecuencia se actualiza el V1 del PDF? ¿Hay un V2 planeado? ¿Cambios en cobertura por estado, montos, exclusiones?\n- [ ] **AI-UC0-10** — ¿Existen documentos adicionales *(no-el PDF V1)* que amplíen alcances o excepciones que debamos ingerir?\n- [ ] **AI-UC0-10a** *(nuevo · 🔎)* — **Bancoppel vs. Club de Protección Familiar Coppel**: la sandbox tiene 8 artículos categorizados como `Cliente_Corporativo=Bancoppel` — ¿es el mismo cliente que el Club de Protección Familiar del retailer Coppel, o son entidades separadas? Impacta si creamos categoría nueva `Coppel` o reutilizamos `Bancoppel`.\n- [ ] **AI-UC0-10b** *(nuevo · 🔎)* — **Idioma del corpus**: los 44 artículos existentes están en `Language=en_US` con contenido en español. ¿Convención acordada, o error histórico? Impacta si publicamos UC0 en `en_US` *(consistente)* o `es_MX` *(correcto — requiere activar idioma en Knowledge Settings)*.\n- [ ] **AI-UC0-10c** *(nuevo · 🔎)* — **`FWD_Article_Body__c`**: hoy el objeto Knowledge__kav NO tiene este campo — la org usa `Answer__c` con HTML embebido para respuestas ricas. ¿Creamos campo custom nuevo para separar Answer citable *(corto)* de Body extendido, o mantenemos el patrón actual? Recomendación: crear el campo.\n- [ ] **AI-UC0-10d** *(nuevo · 🔎)* — **RT `Procedure` inactivo**: existe con campos `Purpose/Warnings/Steps/Audience` pero está apagado. ¿Lo activamos para las secciones de Procedimiento operativo del PDF Coppel, o esas secciones viven dentro del Body de `Terminos_y_condiciones`?\n\n### 7.4 · Alcance del bot\n\n- [ ] **AI-UC0-11** — ¿UC0 debe **confirmar vigencia** del contrato del llamante *(consultando el sistema)* o solo explicar el alcance abstracto del beneficio? Nuestra recomendación es **NO confirmar vigencia** en Fase 1 — es responsabilidad humana y evita reclamos del tipo \"el bot me dijo que sí y no era\".\n- [ ] **AI-UC0-12** — Cuando el usuario pregunta \"¿cuántos eventos me quedan?\" *(historial personal)*, ¿escalamos a humano o consultamos algún objeto?\n- [ ] **AI-UC0-13** — ¿UC0 puede consultar el CRM propietario `telasistcrm.com` de forma read-only para historial de eventos, o queda diferido a humano?\n- [ ] **AI-UC0-14** — ¿El bot puede **enviar por WhatsApp** la Guía del Asegurado como acción propia, o eso queda para el humano?\n\n### 7.5 · Persona y branding\n\n- [ ] **AI-UC0-15** — Nombre del agente: ¿\"Asistente Club Coppel\", \"Coppel Asiste\", \"Telasist para Coppel\"? Impacta el saludo y el registro fonético.\n- [ ] **AI-UC0-16** — ¿El agente se presenta en nombre de **Coppel** *(brand del cliente final)* o **Telasist en representación de Coppel**? Precondición ética.\n- [ ] **AI-UC0-17** — ¿Coppel tiene brand guide de voz *(prohibiciones, tono, formalidad)* que debamos respetar? ¿Palabras prohibidas?\n- [ ] **AI-UC0-18** — Género y acento de la voz: ¿neutro mexicano o alguna preferencia regional *(Coppel es fuerte en el norte)*?\n\n### 7.6 · Volumen y dimensionamiento\n\n- [ ] **AI-UC0-19** — Confirmar el **AHT actual** de las llamadas tipificadas como *Información de beneficios* — es baseline crítico para medir el −50% de nuestro KPI.\n- [ ] **AI-UC0-20** — ¿Hay patrón horario/día pico en las 9,225 llamadas informativas? Distribución horaria para dimensionar concurrencia.\n- [ ] **AI-UC0-21** — ¿Tenemos acceso a **transcripts históricos** de una muestra de llamadas informativas para (a) validar cobertura de la KB, (b) descubrir preguntas frecuentes fuera del PDF V1?\n\n### 7.7 · Escalación a queja / posible reclamo\n\n- [ ] **AI-UC0-22** — Las **511 llamadas de Escalaciones + Supervisor** son posibles quejas. ¿UC0 debe detectarlas activamente y rutear a queue específica de Quality/Queja, o basta con \"si dice supervisor, transfiere\"?\n- [ ] **AI-UC0-23** — ¿UC0 debe crear un `Case` de RecordType `Queja` cuando detecta reclamo, aunque sea el único caso donde escribe en Salesforce?\n\n### 7.8 · Métricas y auditoría\n\n- [ ] **AI-UC0-24** — Auditoría muestral de conversaciones: ¿quién la hace y con qué muestreo? ¿Tenemos owner de Quality dedicado a UC0?\n- [ ] **AI-UC0-25** — Dashboard de UC0: métricas visibles al CEO desde día 1 del soft-launch — ¿en Tableau Next, Service Cloud dashboards, o herramienta interna?\n- [ ] **AI-UC0-26** — CSAT post-llamada: ¿SMS, IVR, WhatsApp? ¿Escala 1–5 o NPS? ¿Todas las llamadas o muestra?\n\n### 7.9 · Comercial y licenciamiento\n\n- [ ] **AI-UC0-27** — UC0 requiere el mismo SKU **Agentforce Contact Center Voice** *($75/seat × 350 = $26,250/mes)* que UC1/UC2/UC3 — ¿o hay una variante \"read-only\" más barata para agentes informativos? *(spoiler: hoy no existe SKU diferenciado — Voice add-on es único)*\n- [ ] **AI-UC0-28** — Al ser el más barato de construir, ¿tiene sentido lanzarlo **antes** que UC1 como demostración temprana de valor con menor gate técnico? *(no requiere API externa, no requiere Custom Retriever complejo, no requiere KBA)*\n\n---\n\n## 8 · Lo que YA existe en la org · inventario técnico\n\n> 🔍 **Inspección realizada el 8 de julio de 2026** contra la Sandbox `telasist--qa.sandbox.my.salesforce.com` *(usuario `jon@telasist.qa` · Org Id `00DDM000003ftUk2AI`)*. Objetivo: mapear qué componentes de UC0 ya están y qué falta construir.\n\n### 8.1 · Lightning Knowledge · ✅ Habilitado y en uso\n\n> La org ya tiene **Lightning Knowledge activo** con **62 artículos** *(44 Online · 18 Draft)* y un **corpus multi-cliente** ya poblado. **UC0 NO arranca de cero.**\n\n#### Objeto `Knowledge__kav` · Record Types\n\n| Record Type | DeveloperName | Estado | Uso para UC0 |\n|---|---|---|---|\n| **FAQ** | `FAQ` | ✅ Activo | ✅ Reusable directo para 4.1, 4.2 y 4.3 del catálogo UC0 |\n| **Términos y condiciones** | `Terminos_y_condiciones` | ✅ Activo | ✅ Reusable directo para los 11 servicios cubiertos *(exclusiones + procedimiento)* |\n| Procedure | `Procedure` | ⚠️ **Inactivo** | Tiene campos custom `Procedure_Purpose__c` · `Procedure_Warnings__c` · `Procedure_Steps__c` · `Procedure_Audience__c`. **Decisión pendiente:** ¿activarlo y usarlo como tercer RT para las secciones de Procedimiento operativo del PDF Coppel? |\n\n> 💡 **Recomendación:** los 2 RTs activos son suficientes para UC0. `FAQ` cubre nuestros artículos de *Contactos externos* y *Policies*. `Terminos_y_condiciones` cubre los 11 *Servicios cubiertos*.\n\n#### Campos custom de `Knowledge__kav` · **⭐ hallazgo crítico**\n\n> **Los campos `Question__c` y `Answer__c` que diseñamos como parte del protocolo editorial YA EXISTEN en el objeto.** No hay que crearlos.\n\n| API Name | Tipo | Longitud | Label | Uso en UC0 |\n|---|---|---:|---|---|\n| **`Question__c`** | textarea | 32,768 | Question | ✅ Pregunta principal citable *(convención Q/A)* |\n| **`Answer__c`** | textarea | 131,072 | Answer | ✅ Respuesta verbatim que lee el bot |\n| `Procedure_Purpose__c` | textarea | 32,768 | Procedure Purpose | Solo si activamos RT Procedure |\n| `Procedure_Warnings__c` | textarea | 32,768 | Procedure Warnings | Solo si activamos RT Procedure |\n| `Procedure_Steps__c` | textarea | 32,768 | Procedure Steps | Solo si activamos RT Procedure |\n| `Procedure_Audience__c` | textarea | 32,768 | Procedure Audience | Solo si activamos RT Procedure |\n\n> ⚠️ **NO existe `FWD_Article_Body__c`** *(el 'body largo con HTML' que definimos)*. La org usa el campo estándar `Summary` *(textarea)* y probablemente cuerpos ricos en Question/Answer con HTML embebido *(ver §8.4)*. **Decisión pendiente:** ¿crear `FWD_Article_Body__c` custom, o usar el patrón actual con HTML dentro de `Answer__c`?\n\n### 8.2 · Data Category Groups · ✅ 4 grupos configurados *(3 activos)*\n\n> **La estrategia de Data Categories que propusimos ya está parcialmente implementada** — la org tiene un modelo casi idéntico. Reutilizable.\n\n#### Grupo `Cliente_Corporativo` · ✅ Activo\n\nUsado por `KnowledgeArticleVersion` + `SvcCatalogItemDef`.\n\n**Valores actuales (13):** Interprotección · Zurich · Fin Remedio · Previta · Viva · Multiasistencia · **Bancoppel** *(con sub-grupo 'Familia de Productos')* · ADO · Cardiff · AIG · Santander · HIR · Chubb.\n\n> 🔴 **Gap identificado:** el valor **`Coppel`** NO existe. Solo existe `Bancoppel` *(que es un cliente distinto — es el banco, no el retailer del Club de Protección Familiar)*. **Acción:** crear el valor `Coppel` en este grupo, o consultar con Telasist si `Bancoppel` es realmente el mismo cliente corporativo.\n\n#### Grupo `Producto` · ✅ Activo\n\nUsado por `KnowledgeArticleVersion` + `SvcCatalogItemDef`.\n\n**Valores actuales (18):** Orientación Médica Telefónica · Orientación Médica Videollamada · Funerario · Orientación Emocional Telefónica · Red de descuentos Ahorra Más · Red de descuentos · Visual · Médico Visitador · Ambulancia de Urgencia · Medicamento Ambulatorio · Dental · Estudio de laboratorio · Ambulancia · Vidriería · Handyman · Plomería · Electricidad · Cerrajería.\n\n> 🟢 **Este grupo ya cubre la mayoría de los servicios del catálogo UC0** — `Orientación Médica Telefónica`, `Orientación Emocional Telefónica`, `Red de descuentos Ahorra Más`, `Vidriería`, `Plomería`, `Cerrajería` mapean 1:1 a nuestros artículos.\n>\n> 🟡 **Gaps identificados:** faltan valores para servicios específicos del Club de Protección Familiar Coppel — **Grúa** · **Auxilio Vial** · **Abogado Presencial** · **Orientación Legal Telefónica** · **Referencia de Red Médica** · **Asistencia Nutricional**. **Acción:** agregar estos 6 valores nuevos al grupo `Producto`.\n\n#### Grupo `Familia_de_Productos` · ⚠️ **INACTIVO**\n\n**Valores (15):** Reembolso viva · Información · Asesoría · Concierge · Funerario · Hogar · Legal · Mascota · Médico · Orientación · Red de descuentos · Referencia · Viajes · Reintegro · Servicios generales.\n\n> **Decisión pendiente:** ¿activar este grupo y reutilizarlo como nuestro eje 'Categoria_Servicio'? Muchos valores (Legal, Médico, Hogar, Referencia) alinean bien con el diseño UC0. O ¿lo dejamos inactivo y creamos un grupo dedicado?\n\n#### Grupo `Producto2` · ✅ Activo\n\n**Valores (2):** Ambulancia · Funerario.\n\n> ⚠️ **Redundante con `Producto`** — mismos valores. Parece un grupo experimental. **Acción sugerida:** no usar en UC0.\n\n#### Cobertura actual en artículos\n\n**89 selecciones de Data Category** aplicadas a los 62 artículos. Los top 5:\n\n| Grupo · Valor | # artículos |\n|---|---:|\n| Cliente_Corporativo · AIG | 15 |\n| Cliente_Corporativo · **Bancoppel** | 8 |\n| Producto · Orientación Médica Videollamada | 5 |\n| Cliente_Corporativo · Viva / Cardiff | 5 c/u |\n| Cliente_Corporativo · Santander / Previta / ADO | 4 c/u |\n\n### 8.3 · Artículos existentes relacionados a Coppel\n\n**Solo 2 artículos** tienen relación tangencial: son de **`Bancoppel`**, NO del Club de Protección Familiar Coppel *(retailer)*.\n\n| ArticleId | Título | Categoría | Contenido |\n|---|---|---|---|\n| `ka0Hs0000030HnUIAU` | 1 Documento ejemplificado Bancoppel_PlanAB_V1 | Cliente_Corporativo=Bancoppel | Plan A: Básico + Hogar. Referencia al 800 122 6773 |\n| `ka0Hs0000030HnOIAU` | 1 Documento ejemplificado Bancoppel_PlanB_V1 | Cliente_Corporativo=Bancoppel | Asistencia Funeraria |\n\n> ⚠️ **Bancoppel ≠ Coppel Club de Protección Familiar.** Bancoppel es la unidad bancaria; el Club de Protección Familiar es el producto de retail (tiendas Coppel). Verificar con el cliente si son separables o comparten estructura.\n\n### 8.4 · Idioma del corpus · ⚠️ hallazgo relevante\n\n> **Los 44 artículos publicados están registrados como `en_US`** *(inglés estadounidense)* aunque el contenido es todo en español. Ejemplo: `1 Documento ejemplificado Bancoppel_PlanAB_V1` tiene todos sus campos en español pero `Language = en_US`.\n\n> 🔴 **Decisión pendiente crítica para UC0:**\n> - **(a)** ¿Mantenemos la convención existente `Language = en_US` con contenido en español? *(consistente pero incorrecto semánticamente)*\n> - **(b)** ¿Activamos el idioma `es_MX` en Knowledge Settings y creamos los artículos UC0 correctamente en español? *(correcto pero requiere config admin y coordinación con corpus existente)*\n\n### 8.5 · Objetos de telemetría / interacciones · 🔴 NO existen\n\nNo hay objeto genérico tipo `Interaccion__c` para telemetría de llamadas informativas. Objetos custom relacionados encontrados:\n\n- **`Consulta_Medica__c`** — 410 campos custom clínicos *(síntomas, exámenes)*. NO sirve como telemetría de UC0.\n- **`EngagementInteraction`** *(estándar)* — objeto de Loyalty/Field Service, no aplicable directamente.\n- **`seguimiento__c`** — 1,249 registros históricos, ligado a `Case`. Requiere Case padre, no cabe para UC0 sin Case.\n\n> **Coherente con la decisión de diseño Fase 1:** UC0 NO escribe en Salesforce. Si en Fase 2 el cliente pide telemetría estructurada, hay que crear un objeto nuevo *(ver [AI-UC0-01 · AI-UC0-02])*.\n\n### 8.6 · Case + Voice · ✅ Infraestructura lista para el handoff UC0 → UC3\n\nLo que ya está armado y cubre el escenario **\"el usuario pasa de info a solicitud de servicio\"**:\n\n- **CallCenter `Centro de Contacto QA`** ✅ activo · Amazon Connect entrega llamadas\n- **`VoiceCall`** con vendor `ContactCenter` — 45,267 registros históricos\n- **Flow `Voice_Call`** *(Before-Save)* — matching `FromPhoneNumber` → Contact ya en producción\n- **Flow `Agentforce_Voice_Route_to_Voice_Agent`** — enrutamiento al planner Agentforce\n- **Flow `Agentforce_Voice_Escalate_to_Queue`** — escalación a humano por queue\n- **Case** — 452 campos, 6 RTs, cadena `Cliente_Corporativo__c → Campana__c → Plan__c → Cobertura__c` disponible\n\n> ✅ **Cuando UC0 detecte solicitud real de servicio, ya hay flow existente para hacer handoff.** No hay que construir infra de bridging Voice → humano/UC3.\n\n---\n\n## 9 · Lo que FALTA construir · checklist accionable\n\n### 9.1 · Data Categories · 🟡 completar valores faltantes\n\n- [ ] **Crear valor `Coppel`** en grupo `Cliente_Corporativo` *(o confirmar con cliente si Bancoppel es el mismo)*\n- [ ] **Crear valor `Club_Proteccion_Familiar`** como sub-categoría de `Coppel` en `Cliente_Corporativo` *(usando la estructura de nesting que ya existe con Bancoppel → Familia de Productos)*\n- [ ] **Agregar 6 valores al grupo `Producto`**: Grúa · Auxilio_Vial · Abogado_Presencial · Orientación_Legal_Telefónica · Referencia_Red_Médica · Asistencia_Nutricional\n- [ ] **Decisión sobre grupo `Familia_de_Productos`**: activar y reutilizar como eje `Categoria_Servicio`, o dejar inactivo y crear grupo nuevo. **Recomendación:** activar y usar valores existentes *(Legal, Médico, Hogar, Referencia, Red de descuentos, Servicios generales)*\n\n### 9.2 · Knowledge configuration · 🔴 decisiones + config\n\n- [ ] **Decidir idioma del corpus Coppel UC0**: `en_US` *(consistente con existente)* vs. `es_MX` *(correcto)*\n- [ ] Si `es_MX` → **activar el idioma español en Knowledge Settings** *(Setup → Knowledge Settings → Supported Languages)*\n- [ ] **Decidir sobre `FWD_Article_Body__c`**: crear campo custom nuevo, o usar `Answer__c` con HTML embebido *(patrón actual)*. Recomendación → crear campo dedicado para separar respuesta corta *(Answer)* del cuerpo largo *(Body)*, alineado con protocolo editorial\n- [ ] **Decidir si activamos RT `Procedure`** para las secciones de procedimiento operativo del PDF Coppel *(o si esas secciones viven dentro del Body de `Terminos_y_condiciones`)*\n\n### 9.3 · Contenido · 🔴 24-26 artículos por escribir\n\nTodos los artículos del catálogo §4 quedan por crear:\n\n- [ ] **11 artículos** `Servicio_Cubierto` *(RT `Terminos_y_condiciones`)* — Grúa · Cerrajería Auto · Auxilio Vial · Abogado Presencial · Orientación Legal · Orientación Médica · Referencia Red Médica · Nutricional · Emocional · Red Ahorra Más · Asistencia Hogar\n- [ ] **5 artículos** `Policy` *(RT `FAQ`)* — Cobertura por estado · Beneficiarios y vigencia · Requisitos · SINALOA · Cancelación/improcedencia\n- [ ] **5 artículos** `Contacto_Externo` *(RT `FAQ`)* — Attn Coppel · Promass · Urge Grúa · Guía Asegurado · Red Ahorra Más\n- [ ] **3–5 artículos** de FAQ adicionales *(preguntas descubiertas en transcripts históricos si se comparten)*\n\n### 9.4 · Agentforce · 🟡 topic + retriever nuevo\n\nSobre el planner productivo *(bloqueador previo: decidir entre `Agentforce_Telasist_Agent_Demo_v9` vs `Telis_v2`)*:\n\n- [ ] **Nuevo Topic `Coppel_Info_Concierge`** con el system prompt esbozado en §2\n- [ ] **12 Actions** del §2 — cada una como `GenAiFunction` o retriever call\n- [ ] **Custom Retriever `Coppel_KB_Retriever`** con filtros de Data Category `Cliente_Corporativo = Coppel` + `Producto` según intent\n- [ ] **Prompt Template `Coppel_Answer_Formatter`** — formatea el `Answer__c` verbatim para lectura por voz *(sanitiza HTML, ajusta puntuación fonética)*\n- [ ] **Guardrails específicos** del §2: no confirmar vigencia individual, no prometer servicio, escalar en detección de queja\n\n### 9.5 · Handoff UC0 → UC3/Humano · 🟢 reusa infra existente\n\n- [ ] Configurar la Action `Warm_Handoff_To_UC3` — mientras UC3 no exista, apunta a queue humana Coppel\n- [ ] Confirmar con cliente cuál es la queue humana de Coppel *(pool general vs. dedicada — [AI-UC0-05])*\n- [ ] Definir contenido del contexto pasado al humano *(transcript · resumen · artículo consultado — [AI-UC0-06])*\n\n### 9.6 · Ganancia de tiempo *(reuso vs. build from scratch)*\n\n| Componente | Estado hoy | Ahorro estimado |\n|---|---|---:|\n| Lightning Knowledge habilitado | ✅ Listo | ~1 día de config admin |\n| Campos `Question__c` + `Answer__c` | ✅ Existen | ~0.5 día |\n| RTs `FAQ` + `Terminos_y_condiciones` | ✅ Activos | ~0.5 día |\n| Data Category Groups `Cliente_Corporativo` + `Producto` | ✅ Existentes con 13 + 18 valores | ~1 día |\n| Amazon Connect → VoiceCall → Contact pipeline | ✅ En prod | ~3–5 días |\n| Flow de escalación a humano | ✅ Activo | ~1 día |\n| **Ahorro total estimado** | — | **~7–8 días** |\n\n> ✅ **Traducción operativa:** UC0 en la Sandbox QA de Telasist puede pasar del build técnico *(~2–3 semanas planeadas)* a **~1–1.5 semanas** de trabajo real de creación de artículos + topic + retriever + prompt templates, aprovechando lo que ya está armado.\n\n---\n\n## 10 · Referencias\n\n- **[Fuente única] Club de Protección Familiar Coppel V1 - Knowledge Base.pdf** — entregado por el cliente el 7-jul-2026. Disponible en Assets.\n- **[Fuente de volumen] Coppel.xlsx** — matriz interna Telasist con desglose de tipificaciones feb–jul 2026. Disponible en Assets.\n- **[Inspección de la org] Sandbox `telasist--qa.sandbox.my.salesforce.com`** — realizada el 8-jul-2026. Ver §8 para detalle.\n- **Protocolo editorial KB** — misma convención acordada en el proyecto PAM Hotels Concierge: fuente verbatim vs. interpretación separadas, Q/A obligatorio, cross-refs en Body.\n- **Números externos referenciados:**\n  - Atención a Clientes Coppel: **800 220 7735**\n  - Promass *(asistenciadora alterna)*: **55 5094 9422**\n  - Urge Grúa *(improcedentes con costo)*: **55 1105 2680**\n  - Portal Red Ahorra Más: **ahorramas.telasist.com** · Convenio **COP5735**",
      },
      {
        id: "uc0-plan",
        label: "UC0 · Plan de trabajo",
        title: "UC0 — Plan de trabajo detallado · 6 semanas a soft launch",
        content:
          "> 📋 **Plan de trabajo detallado para UC0 · 6 semanas a soft launch.** Este tab traduce el diseño del UC0 *(tab anterior)* a un plan ejecutable con fases, esfuerzo, requerimientos, JTBD y action items accionables con Telasist.\n\n## 0 · Marco general\n\n**Objetivo:** poner en producción un agente Agentforce Voice de solo-lectura sobre Salesforce Knowledge que conteste el 17.6% del volumen mensual de Coppel *(≈1,538 llamadas/mes informativas)* con guardarraíles duros: no confirma vigencia individual, no promete servicio, no crea Case en Fase 1.\n\n**Fuente única:** *Club de Protección Familiar Coppel V1 - Knowledge Base.pdf* *(7-jul-2026)*.\n\n**Ventana de trabajo:** **6 semanas de calendario** *(30 días laborales)* desde kickoff hasta soft-launch monitoreado. Ahorro real vs. estimado inicial *(2-3 sem)* gracias al reuso identificado en la sandbox — ver §8 del tab UC0.\n\n**Esfuerzo global:** ~35 person-days entre Telasist *(owner editorial + admin SF)* y consultor Salesforce.\n\n---\n\n## 1 · Jobs to be Done\n\n### 1.1 · JTBD del llamante *(usuario final Coppel)*\n\n| # | Job |\n|---|---|\n| **J-U1** | 'Cuando llamo, quiero saber **qué servicio me cubre y cómo se usa** sin esperar a un humano.' |\n| **J-U2** | 'Cuando llamo y mi consulta no es de asistencia, quiero que me **redirijan al canal correcto** en un solo paso *(Atn Coppel, Promass, Urge Grúa)*.' |\n| **J-U3** | 'Cuando pido el servicio de verdad, quiero que el bot **me pase a alguien que pueda coordinar**, sin repetir mi historia.' |\n| **J-U4** | 'Cuando el bot no sabe, quiero que **lo admita y me escale** — no que invente.' |\n\n### 1.2 · JTBD de Telasist *(operación / negocio)*\n\n| # | Job |\n|---|---|\n| **J-T1** | 'Deflectar **≥75% de las 1,538 llamadas informativas/mes** para liberar capacidad de asesores hacia coordinación real.' |\n| **J-T2** | 'Reducir el AHT informativo **al menos 50%** vs. baseline humano *(por confirmar AI-UC0-19)*.' |\n| **J-T3** | 'Tener **trazabilidad auditable** de qué artículo respondió cada consulta *(aunque no cree Case)*.' |\n| **J-T4** | 'Demostrar **valor temprano de Agentforce Voice** antes de UC1 *(Águila)* y UC3 *(Triage Coppel)* para acelerar la conversación comercial.' |\n\n### 1.3 · JTBD del asesor humano\n\n| # | Job |\n|---|---|\n| **J-A1** | 'Cuando me llega handoff del bot, quiero recibir **transcript + intent + artículo consultado** para no arrancar de cero.' |\n| **J-A2** | 'Confiar que el bot **NO confirmó vigencia** ni prometió servicio — para no cargar con expectativas creadas artificialmente.' |\n\n---\n\n## 2 · Fases · Gantt textual\n\n| Semana | Fase | Foco | Owner principal |\n|---|---|---|---|\n| **S1** *(5d)* | **F0 · Discovery & Decisiones** | Resolver 12 AIs bloqueantes con Telasist y Coppel | Yo + Telasist |\n| **S2** *(5d)* | **F1 · Contenido KB** | Redactar 24-26 artículos verbatim del PDF | Yo *(draft)* + Telasist *(owner editorial)* |\n| **S2-S3** *(paralelo, 5d)* | **F2 · Config Salesforce** | Data Categories, campos custom, idioma, retrievers | Admin Telasist + Yo |\n| **S3** *(5d)* | **F3 · Build Agentforce** | Topic, 12 Actions, prompt templates, guardarraíles | Yo |\n| **S4** *(5d)* | **F4 · Integración & Testing** | Handoff, escalación, batería de casos, red team | Yo + Telasist QA |\n| **S5** *(5d)* | **F5 · UAT & Aprobación** | Sign-off editorial *(Telasist)* + Coppel | Telasist + Coppel |\n| **S6** *(5d)* | **F6 · Soft launch monitoreado** | 10% del volumen, dashboard live, iteración diaria | Telasist Ops + Yo *(soporte)* |\n\n---\n\n## 3 · F0 · Discovery & Decisiones · S1 *(5d · 5 pd)*\n\n**JTBD que habilita:** J-T1, J-T4.\n\n### 3.1 Requerimientos duros a resolver\n\nEstos 12 Action Items son **bloqueantes**. Sin respuesta, no arranca F1/F2. Los AIs referenciados vienen del §7 del tab UC0.\n\n| AI | Pregunta | Owner | Impacto si no se resuelve |\n|---|---|---|---|\n| **AI-UC0-01/02/03** | ¿UC0 registra telemetría estructurada? ¿Objeto? ¿Campos? | Telasist Product | Sin decisión → default 'no escritura', pero perdemos capacidad de leer deflection real |\n| **AI-UC0-04** | ¿Handoff va a UC3 o queue humana? | Telasist Ops | Bloquea diseño de `Warm_Handoff_To_UC3` Action |\n| **AI-UC0-05** | Queue humana Coppel dedicada vs. pool general | Telasist Ops | Bloquea config Omni-Channel |\n| **AI-UC0-07** | Owner editorial único de la KB | Telasist Ops | Sin firmante no hay sign-off |\n| **AI-UC0-08** | ¿Coppel también aprueba, o basta Telasist? | Telasist Comercial | Alarga F5 en 2-5 días si Coppel entra en loop |\n| **AI-UC0-10a** | Bancoppel ≠ Coppel Club — ¿son separables? | Telasist Product | Bloquea creación de valor en Data Category `Cliente_Corporativo` |\n| **AI-UC0-10b** | Idioma corpus UC0: `en_US` vs. `es_MX` | Yo *(recomendación)* + Telasist Admin | Bloquea creación de artículos |\n| **AI-UC0-10c** | ¿Crear `FWD_Article_Body__c`? | Yo *(recomendación: sí)* + Telasist Admin | Bloquea diseño de campos |\n| **AI-UC0-10d** | ¿Activamos RT `Procedure`? | Yo *(recomendación: no en Fase 1)* + Telasist Admin | Bloquea decisión de esquema |\n| **AI-UC0-11** | ¿Bot confirma vigencia individual? | Telasist Legal/Ops | 🔴 **Riesgo compliance** — recomendación: NO |\n| **AI-UC0-15/16** | Nombre + brand voice del agente | Telasist Comercial + Coppel | Bloquea system prompt |\n| **AI-UC0-19** | AHT baseline humano actual | Telasist Analytics | Sin baseline no hay KPI −50% medible |\n\n### 3.2 Action items F0\n\n1. **Yo** — enviar este plan de trabajo a Telasist con las 12 decisiones enumeradas y una recomendación por cada una · **día 1**\n2. **Telasist** — nombrar owner editorial único *(AI-UC0-07)* · **día 1**\n3. **Telasist** — 60-min discovery call con Ops + Legal + Comercial · **día 2**\n4. **Telasist Analytics** — enviar AHT baseline de tipificación 'Información de beneficios' *(feb-jul 2026)* · **día 3**\n5. **Telasist Comercial** — confirmar si Coppel entra al loop editorial *(AI-UC0-08)* · **día 3**\n6. **Yo** — documento de decisiones firmado *(una hoja, 12 renglones)* · **día 5**\n\n> ✅ **Entregable F0:** hoja de decisiones firmada + owner editorial nombrado.\n\n---\n\n## 4 · F1 · Contenido KB · S2 *(5d · 8 pd)*\n\n**JTBD que habilita:** J-U1, J-U4.\n\n**Alcance:** 24-26 artículos verbatim del PDF V1, siguiendo el protocolo Q/A/Body/Summary de PAM *(ver protocolo editorial del portfolio)*.\n\n### 4.1 Distribución de trabajo\n\n| Bloque | Artículos | Effort |\n|---|---:|---:|\n| Servicios cubiertos *(RT `Terminos_y_condiciones`)* | 11 | 4 pd |\n| Policies transversales *(RT `FAQ`)* | 5 | 1.5 pd |\n| Contactos externos *(RT `FAQ`)* | 5 | 1 pd |\n| FAQs adicionales *(residual)* | 3-5 | 1 pd + iterativo |\n| Revisión editorial + sign-off | — | 0.5 pd *(owner Telasist)* |\n\n### 4.2 Action items F1\n\n1. **Yo** — draft de los 11 `Servicio_Cubierto` en Google Docs *(una hoja por artículo)* · **día 6-8**\n2. **Yo** — draft de las 5 `Policy` y 5 `Contacto_Externo` · **día 8-9**\n3. **Owner editorial Telasist** — revisión inline y firma de aprobación · **día 10**\n4. **Yo** — depósito de artículos aprobados en Salesforce Knowledge *(Draft state)* · **día 10 tarde**\n\n> ✅ **Entregable F1:** 24-26 KAV drafts en la sandbox `telasist--qa`, con Data Categories asignadas.\n\n---\n\n## 5 · F2 · Config Salesforce · S2-S3 paralelo *(5d · 5 pd)*\n\n**JTBD que habilita:** J-T3, J-U2.\n\nCorre **en paralelo** a F1 para no bloquear el calendario.\n\n### 5.1 Cambios en la org\n\n| # | Cambio | Owner | Effort |\n|---|---|---|---:|\n| 5.1a | Crear valor `Coppel` en Data Category Group `Cliente_Corporativo` | Admin Telasist | 0.5 pd |\n| 5.1b | Agregar 6 valores a grupo `Producto`: Grúa · Auxilio_Vial · Abogado_Presencial · Orient_Legal · Ref_Red_Medica · Nutricional | Admin Telasist | 0.5 pd |\n| 5.1c | Decidir sobre `Familia_de_Productos` *(activar como `Categoria_Servicio` vs. crear grupo nuevo)* | Yo + Admin | 0.5 pd |\n| 5.1d | Crear campo `FWD_Article_Body__c` *(long text 131,072)* en `Knowledge__kav` — si AI-UC0-10c = sí | Admin Telasist | 0.5 pd |\n| 5.1e | Activar idioma `es_MX` en Knowledge Settings — si AI-UC0-10b = sí | Admin Telasist | 0.5 pd |\n| 5.1f | Configurar Permission Set `UC0_KB_Editor` para el owner editorial | Admin Telasist | 0.5 pd |\n| 5.1g | Crear objeto `Interaccion_UC0__c` *(mínimo viable: fecha, ANI, artículo, intent, resolved/escalated)* — solo si AI-UC0-01 = sí | Admin Telasist | 1 pd |\n| 5.1h | Publicar los 24-26 artículos *(Draft → Online)* tras F1 | Owner editorial | 0.5 pd |\n| 5.1i | Configurar Data Category assignments en cada artículo | Admin Telasist | 0.5 pd |\n\n> ✅ **Entregable F2:** sandbox lista con schema completo + 24-26 artículos publicados + Data Categories aplicadas.\n\n---\n\n## 6 · F3 · Build Agentforce · S3 *(5d · 6 pd)*\n\n**JTBD que habilita:** J-U1, J-U2, J-U3, J-U4, J-A2.\n\n### 6.1 Componentes Agentforce\n\n| Componente | Descripción | Effort |\n|---|---|---:|\n| Topic `Coppel_Info_Concierge` | System prompt + persona + guardarraíles del §2 del tab UC0 | 0.5 pd |\n| Action `Greet_Caller` | Saludo dinámico + confirmación | 0.25 pd |\n| Action `Detect_Intent` | Clasificador: informativo · solicitud real · transferencia · queja | 0.5 pd |\n| Action `Search_KB` *(Custom Retriever `Coppel_KB_Retriever`)* | Filtros Data Category, top-K 3, threshold 0.7 | 1 pd |\n| Action `Answer_From_KB` | Lectura verbatim de `Answer__c` | 0.25 pd |\n| Prompt Template `Coppel_Answer_Formatter` | Sanitiza HTML, ajusta puntuación fonética para TTS | 0.5 pd |\n| Action `Detect_Service_Request` | Trigger 'quiero', 'necesito' | 0.25 pd |\n| Action `Warm_Handoff_To_UC3` *(o humano)* | Reusa flow `Agentforce_Voice_Escalate_to_Queue` | 0.5 pd |\n| Action `Provide_Promass_Number` | Da 55 5094 9422 | 0.25 pd |\n| Action `Provide_Coppel_Number` | Da 800 220 7735 | 0.25 pd |\n| Action `Detect_Complaint` | Keywords + sentiment → escala | 0.5 pd |\n| Action `Polite_Close` | Cierre + oferta callback | 0.25 pd |\n| Action `Cite_Article_Metadata` *(opcional)* | Escribe `Interaccion_UC0__c` si AI-UC0-01 = sí | 0.5 pd |\n| Guardarraíles duros: 6 reglas del §2 *(no vigencia, no promesa, no invención, escalación emergencia, escalación queja)* | — | 0.5 pd |\n\n**Decisión previa:** confirmar si UC0 corre sobre `Agentforce_Telasist_Agent_Demo_v9` *(ConcurrentMultiAgentOrchestration)* o `Telis_v2`.\n\n> ✅ **Entregable F3:** agente funcional en sandbox, invocable por Voice inbound.\n\n---\n\n## 7 · F4 · Integración & Testing · S4 *(5d · 5 pd)*\n\n**JTBD que habilita:** J-A1, J-T3.\n\n### 7.1 Batería de test\n\n| # | Tipo | Casos |\n|---|---|---:|\n| 7.1a | Happy path por cada uno de los 11 servicios cubiertos | 11 llamadas simuladas |\n| 7.1b | Handoffs deterministas: Promass, Coppel, Urge Grúa, Guía WhatsApp | 4 llamadas |\n| 7.1c | Escalación por keyword *(supervisor, queja, denunciar)* | 5 llamadas |\n| 7.1d | Escalación por emergencia *(accidente con heridos, robo violento)* | 3 llamadas |\n| 7.1e | Detección de 'quiero el servicio' → handoff UC3/humano | 5 llamadas |\n| 7.1f | KB fuera de scope: pregunta que no está en el corpus → escalación limpia | 5 llamadas |\n| 7.1g | 🔴 **Red-team:** intentos de que el bot confirme vigencia o prometa servicio | 10 intentos adversarios |\n| 7.1h | Cobertura por estado: usuario de Chihuahua pregunta por hogar → responde 'solo GTO/TAM/VER' y ofrece Promass | 3 llamadas |\n| 7.1i | Bilingüe / ruido / interrupciones | 3 llamadas |\n\n### 7.2 Action items F4\n\n1. **Yo** — script de 50 casos de test documentados en Sheets · **día 16**\n2. **Yo** — ejecutar batería completa contra sandbox · **día 17-18**\n3. **Telasist QA** — auditoría independiente de 10 llamadas de la muestra · **día 19**\n4. **Yo** — fix de bugs encontrados · **día 20**\n\n> ✅ **Entregable F4:** matriz de pruebas con 50 casos, ≥95% verde. Reporte de red-team documentando **cero alucinaciones y cero promesas**.\n\n---\n\n## 8 · F5 · UAT & Aprobación · S5 *(5d · 3 pd)*\n\n**JTBD que habilita:** J-T4.\n\n### 8.1 Action items F5\n\n1. **Telasist Ops + Legal** — UAT con 20 llamadas piloto grabadas · **día 21-23**\n2. **Telasist Comercial** — decisión de si Coppel valida antes de soft-launch o después · **día 22**\n3. **Owner editorial** — firma final de los 24-26 artículos en producción · **día 24**\n4. **Yo** — deployment package de sandbox → producción *(change sets o SFDX)* · **día 25**\n\n> ✅ **Entregable F5:** paquete aprobado listo para deploy productivo.\n\n---\n\n## 9 · F6 · Soft launch · S6 *(5d · 3 pd)*\n\n**JTBD que habilita:** J-T1, J-T2, J-T4.\n\n### 9.1 Rollout gradual\n\n| Día | % del volumen 'Información de beneficios' | Acción |\n|---|---:|---|\n| **Día 26** | 10% | Amazon Connect route al bot, resto sigue a humano. Monitoreo live |\n| **Día 27-28** | 25% | Si KPI ≥ target, escalar. Si no, pausar y ajustar |\n| **Día 29** | 50% | Auditoría muestral diaria de 20 llamadas |\n| **Día 30** | 100% | Anuncio oficial. Handoff a Ops |\n\n### 9.2 Dashboard live desde día 26\n\nMétricas del §6 del tab UC0, mínimo viable:\n\n- % consultas resueltas por bot sin escalar\n- CSAT SMS post-llamada\n- Handoffs correctamente ruteados\n- Cobertura KB *(% score >0.7)*\n\n**Herramienta:** decisión pendiente entre Tableau Next / Service Cloud dashboards *(AI-UC0-25)*.\n\n---\n\n## 10 · Requerimientos externos *(gate por fase)*\n\n| # | Requerimiento | Gate | Owner |\n|---|---|---|---|\n| **R1** | SKU Agentforce Contact Center Voice comprado y activo | Antes de F6 | Salesforce Sales + Telasist Procurement |\n| **R2** | Bot productivo decidido *(`Demo_v9` vs. `Telis_v2`)* | Antes de F3 | Telasist Product |\n| **R3** | Número/DID de Coppel productivo o de prueba | Antes de F4 | Telasist Telecom |\n| **R4** | Grabación consentida para test | Antes de F4 | Telasist Legal |\n| **R5** | Coppel brand voice guide *(si aplica AI-UC0-16/17)* | Antes de F3 | Telasist Comercial |\n\n---\n\n## 11 · Riesgos y mitigaciones\n\n| # | Riesgo | Prob. | Impacto | Mitigación |\n|---|---|---|---|---|\n| **RSG-1** | Coppel entra en loop editorial y agrega semanas | Media | Alto | Confirmar AI-UC0-08 en F0. Si Coppel valida, arrancar loop con ellos desde S2 |\n| **RSG-2** | Bancoppel ≠ Coppel Club sin resolver → nomenclatura KB rota | Baja | Medio | Resolver AI-UC0-10a en F0 día 1. Si no queda claro, crear valor nuevo `Coppel` limpio |\n| **RSG-3** | Idioma `en_US` heredado degrada retrieval en español | Media | Medio | Recomendación firme: activar `es_MX` en F2 |\n| **RSG-4** | Bot confirma vigencia por accidente *(reclamo posterior)* | Baja | 🔴 **Alto** | Red-team obligatorio en F4. Guardarraíl duro en system prompt. Auditoría diaria semana 1 de soft-launch |\n| **RSG-5** | Cobertura KB <75% por preguntas no cubiertas en PDF V1 | Media | Medio | Pedir transcripts históricos en F0 *(AI-UC0-21)*. Si no hay, ciclo iterativo semanal en soft-launch para agregar FAQs |\n| **RSG-6** | SKU Voice no comprado antes de F6 | Media | Bloqueante | Escalar a Salesforce Sales desde F0 día 1 |\n\n---\n\n## 12 · Resumen de esfuerzo\n\n| Fase | Duración calendario | Person-days | Owner principal |\n|---|---:|---:|---|\n| F0 Discovery | 5d | 5 | Telasist Ops + Yo |\n| F1 Contenido | 5d | 8 | Yo + Owner editorial |\n| F2 Config SF | 5d *(paralelo)* | 5 | Admin Telasist |\n| F3 Build Agentforce | 5d | 6 | Yo |\n| F4 Testing | 5d | 5 | Yo + QA |\n| F5 UAT | 5d | 3 | Telasist Ops/Legal |\n| F6 Soft launch | 5d | 3 | Telasist Ops + Yo |\n| **Total** | **6 semanas** | **~35 pd** | — |",
      },
      {
        id: "uc1",
        label: "UC1 · Águila (Piloto)",
        title: "UC1 — Campaña El Águila · Overflow Call Management",
        content:
          "> ⭐ **El caso de uso piloto.** Bajo volumen, alto valor demostrativo. Valida la arquitectura técnica end-to-end (Amazon Connect → Partner Voice Forwarding → Agentforce Voice → Case creation → Email) con consecuencias contenidas si algo falla.\n\n## El problema hoy\n\nCuando el contact center de El Águila se satura en horas pico, la llamada se transfiere a Telasist, donde un **asesor humano captura manualmente** los datos de la solicitud. Esto genera:\n\n- ⏱️ **Tiempos de espera** para el cliente final\n- 👥 **Dependencia total del asesor** humano\n- 💰 **Costo variable por minuto** de asesor\n\n## La propuesta con Agentforce Voice\n\n```\nCliente final                 Amazon Connect              Agentforce Voice\n(llamada entrante)     ──▶    (overflow route)     ──▶    (Águila Concierge)\n                                                                 │\n                                                                 ▼\n                                                        ┌─────────────────┐\n                                                        │ • Saludo ES-MX  │\n                                                        │ • Captura datos │\n                                                        │ • Crea Case     │\n                                                        │ • Envía email   │\n                                                        └─────────────────┘\n```\n\nExperiencia **end-to-end automatizada** en el happy path.\n\n## Ficha técnica del agente\n\n| Campo | Detalle |\n|---|---|\n| **Nombre** | Águila Concierge |\n| **Objetivo** | Absorber overflow, capturar datos, crear Case, confirmar por email — sin humano en el happy path |\n| **Rol** | Asistente conversacional inbound de primer nivel · español mexicano · tono neutro-profesional |\n| **Subagents** | Ninguno *(agente monolítico simple para piloto)* |\n| **Canal** | Voz inbound · Amazon Connect → Partner Voice Forwarding → Agentforce Voice |\n| **Escalamiento** | Solo por excepción *(ver criterios abajo)* |\n| **Volumen** | ~107 llamadas/mes · 426 acumuladas en 4 meses · AHT promedio 6 min |\n\n## Acciones (Actions) del agente\n\n1. **`Greet_Caller`** — saludo dinámico con hora del día\n2. **`Capture_Requester_Data`** — nombre, teléfono, email, relación con titular\n3. **`Capture_Service_Request`** — tipo de incidente, ubicación (dirección o coord.), descripción libre\n4. **`Validate_Coverage`** *[supuesto — TBD si El Águila expone API de póliza]*\n5. **`Create_Case`** — Case con Record Type `Águila – Overflow`\n6. **`Send_Confirmation_Email`** — Prompt Template + Email Alert\n7. **`Escalate_To_Human`** — transfer si el llamador lo pide o si captura falla 2 veces\n\n## Criterios de escalamiento a humano\n\nEscala solo si:\n\n- El llamador **pide humano** explícitamente\n- **2 fallos consecutivos** de captura de dato\n- **Intent no reconocido** después de 3 intentos\n\n## Datos y conocimiento\n\n### Datos que consume\n\n**De la llamada:** nombre · teléfono ANI · email · dirección/coordenadas · tipo de servicio · descripción.\n\n**De Salesforce:** catálogo de tipos de servicio (Picklist) · Record Type Águila · Email Template · Case Origin.\n\n**Externos [TBD]:** API El Águila para validación de póliza — pendiente confirmar con el cliente.\n\n### Base de conocimiento (KB)\n\nSalesforce Knowledge curado con:\n\n- Tipos de asistencia cubiertos por El Águila *(viales, home, médica)*\n- Áreas de cobertura geográfica\n- Tiempos de respuesta esperados\n- FAQs *(¿estoy cubierto?, ¿cuánto tarda?, ¿qué necesito?)*\n- Políticas de escalamiento\n\n**Grounding** vía Custom Retriever sobre Data Category `Cliente = Águila`.\n\n## KPIs de éxito · piloto 60–90 días\n\n| KPI | Target |\n|---|---|\n| % llamadas resueltas sin humano | **≥85%** |\n| AHT promedio Voice vs. humano | Baseline por confirmar |\n| Tasa de Case creation exitoso | **≥95%** |\n| CSAT post-llamada (SMS 1–5) | **≥4.0** |\n| Costo por llamada Voice vs. humano | **−60%** |\n\n## Supuestos documentados que el cuestionario debe resolver\n\n1. La cobertura de El Águila puede verificarse por API, o queda diferida a humano en despacho.\n2. Ningún dato del llamador requiere autenticación fuerte — voz no valida identidad en piloto.\n3. El email de confirmación es suficiente comunicación post-caso.\n4. La distribución del volumen es plana; no hay picos horarios extremos que requieran queue overflow adicional.",
      },
      {
        id: "uc1-agente",
        label: "UC1 · Diseño del agente",
        title: "Diseño detallado del Agente Águila Concierge",
        content:
          "## Persona base *(system prompt esbozado)*\n\n> Eres **'Águila Asistencia'**, el asistente digital de El Águila. Atiendes llamadas cuando el equipo humano está ocupado. Hablas **español mexicano neutro**, con tono **profesional pero cercano**. Eres **empático** (especialmente si el llamador reporta un accidente o urgencia) pero **eficiente**.\n>\n> Tu objetivo es **capturar los datos correctos** para que un técnico o proveedor pueda atender al cliente lo antes posible.\n>\n> **Nunca inventes** información sobre coberturas o tiempos. Si no sabes algo, dilo con claridad y ofrece **transferir con un asesor humano**. Si te preguntan si eres humano, responde con **transparencia** que eres un asistente digital.\n\n## Topic tree propuesto\n\n| Topic | Actions |\n|---|---|\n| **1 · Greeting & Intent Detection** | `Greet_Caller` · `Detect_Intent` |\n| **2 · Solicitud de Asistencia Vial** | `Capture_Vehicle_Data` · `Capture_Location` · `Classify_Vehicle_Incident` · `Create_Case_Vial` · `Send_Email_Vial` |\n| **3 · Solicitud de Asistencia Hogar** | `Capture_Home_Address` · `Classify_Home_Incident` · `Create_Case_Hogar` · `Send_Email_Hogar` |\n| **4 · Solicitud de Asistencia Médica** | `Capture_Patient_Data` · `Classify_Medical_Urgency` · `Create_Case_Medica` · `Send_Email_Medica` · `Escalate_Immediately_If_Critical` |\n| **5 · Consulta de Estado / Otro** | `Lookup_Existing_Case` · `Provide_Status_Update` · `Escalate_To_Human` |\n| **6 · Escalamiento a Humano** | `Prepare_Handoff_Summary` · `Transfer_To_Queue_Águila` |\n\n## Ejemplo de conversación · happy path (asistencia vial)\n\n```\nAG:  Hola, gracias por comunicarse con El Águila Asistencia. Soy el\n     asistente digital. ¿En qué le podemos apoyar hoy?\n\nUsr: Se me ponchó una llanta en el Periférico.\n\nAG:  Lamento escuchar eso. Le voy a apoyar para enviar una grúa lo antes\n     posible. ¿Me puede confirmar su nombre completo?\n\nUsr: Juan Pérez López.\n\nAG:  Gracias, Juan. ¿Cuál es el número donde le podemos regresar la\n     llamada si se corta?\n\nUsr: 55 4321 5678.\n\nAG:  Perfecto. ¿En qué punto del Periférico se encuentra? Puede darme\n     una referencia o dirección aproximada.\n\nUsr: A la altura de la salida a San Ángel, sentido norte-sur.\n\nAG:  Entendido — Periférico Sur, salida San Ángel, sentido norte a sur.\n     ¿Es correcto?\n\nUsr: Sí.\n\nAG:  Gracias. ¿Me puede confirmar la marca y modelo del vehículo?\n\nUsr: Nissan Sentra 2020, rojo.\n\nAG:  Perfecto. Le confirmo: hemos registrado su solicitud de asistencia\n     vial con folio TA-2026-45231. Recibirá un correo de confirmación\n     en unos segundos y el proveedor lo contactará al 55 4321 5678 en\n     los próximos minutos. ¿Hay algo más en lo que le pueda apoyar?\n\nUsr: No, gracias.\n\nAG:  Gracias por su llamada, Juan. Que tenga un buen día.\n```\n\n## Guardrails críticos\n\n1. **Nunca** pedir datos de tarjeta, RFC, CURP o historial médico completo por voz.\n2. **Nunca** prometer tiempos exactos de llegada del proveedor — usar rangos ('en los próximos minutos', 'en breve').\n3. **Nunca** confirmar cobertura sin validación (o marcar el Case como 'pending validation').\n4. Si el llamador reporta **accidente grave con heridos** → escalamiento inmediato con `Warm_Handoff` sin cerrar la conversación.\n5. Si el llamador **pide humano** → transferir sin negociar.\n\n## Componentes técnicos en Salesforce\n\n### Object model\n\n- **Object**: `Case`\n- **Record Type**: `Águila – Overflow`\n\n### Custom fields nuevos\n\n| API Name | Tipo | Propósito |\n|---|---|---|\n| `Servicio_Tipo__c` | Picklist | Vial · Hogar · Médica · Otro |\n| `Ubicacion_Coord__c` | Geolocation | Coordenadas capturadas por voz |\n| `Descripcion_Incidente__c` | LongText | Descripción libre del incidente |\n| `Fuente_Overflow__c` | Checkbox | Marca casos originados en overflow |\n| `ANI__c` | Text | Automatic Number Identification |\n\n### Automations y componentes de plataforma\n\n- **Flows**: `Águila_Overflow_Case_Creation` *(invocable action)*\n- **Email Templates**: `Águila_Confirmacion_Solicitud` *(con Merge Fields del Case)*\n- **Prompt Templates**: `Águila_Greeting` · `Águila_Confirmation_Readback` · `Águila_Empathy_Statement`\n- **Custom Retriever**: `Águila_Knowledge_Retriever` sobre Data Category `Cliente = Águila`\n- **Omni-Channel Queue**: `Águila_Overflow_Escalation` para handoff a humano\n- **Einstein Trust Layer**: masking activo para nombres + teléfonos si Águila pide anonimización downstream",
      },
      {
        id: "uc1-cuestionario",
        label: "Cuestionario UC1",
        title: "Cuestionario de descubrimiento UC1 — 57 preguntas para eliminar ambigüedad",
        content:
          "> 🎯 **Objetivo:** Llegar al kickoff del piloto con **cero ambigüedad** en scope, datos, integraciones, tono y criterios de éxito.\n\n**Estructura:** 11 secciones · **57 preguntas** de descubrimiento + **6 bloqueadores accionables**.\n\n**Convención de respuesta:** marca cada respuesta con `[Telasist]`, `[Cliente Águila]` o `[Salesforce/Partner]` según responsable.\n\n---\n\n### Sección 1 · Identidad de la campaña 'El Águila' *(5 preguntas)*\n\n- **1.1** ¿Cuál es el nombre legal del cliente final 'El Águila'? ¿Aseguradora, embotelladora, financiera u otro? *— Precondición ética y comercial: el agente hablará 'en nombre de' esa marca.*\n- **1.2** ¿Cuál es el producto o servicio que 'El Águila' ofrece a sus clientes finales y que activa las llamadas a Telasist?\n- **1.3** ¿Cuál es el logo, tono de marca y voice corporativa de El Águila que el agente debe respetar? *— Necesitamos guía de brand.*\n- **1.4** ¿El agente debe presentarse como 'Águila' o como 'Telasist en representación de Águila'? *— Impacta directamente al opening del script.*\n- **1.5** ¿Hay contrato o SLA firmado con El Águila que defina tiempo de respuesta, hora de operación o umbrales de calidad?\n\n### Sección 2 · Volumen, canal y overflow *(6 preguntas)*\n\n- **2.1** ¿En qué horarios ocurre el overflow que hoy transfiere de El Águila a Telasist? ¿24/7 o ciertas ventanas?\n- **2.2** ¿El overflow se dispara por umbrales de espera, horario fijo, o decisión operativa?\n- **2.3** ¿Cuál es el patrón horario y estacional de las 426 llamadas de los últimos 4 meses?\n- **2.4** ¿Cuál es el AHT promedio actual (con humano) de las 426 llamadas históricas? *— Baseline crítico.*\n- **2.5** ¿En qué % de las 426 el caso se cierra en primera llamada vs. requiere seguimiento?\n- **2.6** ¿Cuál es el % de abandono actual en el overflow?\n\n### Sección 3 · Datos que se deben capturar *(6 preguntas)*\n\n- **3.1** ¿Cuáles son los campos obligatorios que el asesor humano captura hoy? *— Enviar plantilla actual.*\n- **3.2** ¿Cuáles son opcionales vs. obligatorios?\n- **3.3** ¿Cuál es el catálogo de tipos de asistencia que Águila ofrece? *(vial, médica, hogar) — con nombres exactos.*\n- **3.4** ¿La ubicación se captura como (a) dirección postal, (b) coordenadas GPS, (c) referencia libre, o (d) las 3?\n- **3.5** ¿Se pide identificación (INE, número de póliza, cédula) o basta con nombre + teléfono?\n- **3.6** ¿Hay algún dato sensible (RFC, CURP, tarjeta, historia médica) que el agente NUNCA debe pedir por voz?\n\n### Sección 4 · Validaciones e integraciones externas *(5 preguntas)*\n\n- **4.1** ¿El Águila expone una API de póliza para validar cobertura? *— Credenciales, endpoint, rate.*\n- **4.2** Si no hay API, ¿la validación queda deferida al humano o se asume 'confía y valida después'?\n- **4.3** ¿Se debe integrar con el sistema de despacho de proveedores de Telasist en tiempo real, o es asíncrono?\n- **4.4** ¿Hay conexión activa con Google Maps API, INEGI DENUE, o servicio propio de geocoding?\n- **4.5** ¿Desde qué dominio sale el correo de confirmación? ¿telasist.com? ¿elaguila.com? ¿Tiene template ya diseñado?\n\n### Sección 5 · Persona del agente *(6 preguntas)*\n\n- **5.1** ¿Qué nombre debe usar el agente al presentarse?\n- **5.2** ¿Género de la voz? ¿Mexicano neutro o regional específico?\n- **5.3** ¿Puede usar contracciones y muletillas humanas o 100% formal?\n- **5.4** Si el llamador pregunta '¿eres humano o robot?', ¿cómo responde?\n- **5.5** ¿Hay palabras/frases prohibidas por El Águila?\n- **5.6** ¿En qué momentos debe expresar empatía explícita?\n\n### Sección 6 · Flujo conversacional y edge cases *(7 preguntas)*\n\n- **6.1** ¿Cuál es el orden preferido de captura? ¿Primero identidad, luego incidente, o al revés?\n- **6.2** Si el llamador no habla español, ¿transfiere a humano o intenta manejar?\n- **6.3** Si hay ruido de fondo alto, ¿hay tolerancia especial para transcripción baja?\n- **6.4** Si el llamador está en shock, ¿trigger automático de escalamiento o continuar?\n- **6.5** ¿Cuántos intentos de re-pregunta antes de escalar? *(recomendación: 2)*\n- **6.6** Si el llamador pide humano desde el saludo, ¿transfer inmediato o pedir contexto antes?\n- **6.7** Si el llamador cuelga a mitad de captura, ¿Case en 'abandoned', callback automático, o descartar?\n\n### Sección 7 · Escalamiento a humano *(5 preguntas)*\n\n- **7.1** ¿A qué queue de humanos se escala? ¿Existe queue dedicada para 'Águila overflow'?\n- **7.2** ¿En qué horario está disponible esa queue? ¿Qué pasa fuera de horario?\n- **7.3** ¿El humano recibe (a) transcript completo, (b) resumen del agente, (c) formulario pre-llenado, o (d) todo?\n- **7.4** ¿Qué información se muestra al humano en el Service Console al recibir la llamada?\n- **7.5** ¿Cuánto tiempo máximo de espera para el handoff antes de considerar 'fallo'?\n\n### Sección 8 · Salesforce — Case, Record Type, Automations *(6 preguntas)*\n\n- **8.1** ¿Existe ya un Record Type 'Águila' en Salesforce, o hay que crearlo? *— Enviar metadata.*\n- **8.2** ¿El Case debe crearse en modo (a) simple, (b) sobre Person Account, o (c) matcheando Contact por ANI?\n- **8.3** ¿Qué automatizaciones ya existen sobre Case (Approvals, Flows, Assignment Rules) que Voice debe respetar?\n- **8.4** ¿Se requiere generar Task, Milestone, o Event automáticamente?\n- **8.5** ¿En qué org corre el piloto? ¿Sandbox dedicado o Full Copy compartida?\n- **8.6** ¿Hay Data Categories ya configuradas en Salesforce Knowledge? *— Enviar árbol actual.*\n\n### Sección 9 · Base de conocimiento *(5 preguntas)*\n\n- **9.1** ¿Existen artículos de KB curados para El Águila hoy? Cuántos, en qué idiomas, con qué estructura.\n- **9.2** Si no hay KB, ¿podemos usar SOPs, manuales, contratos vía UDMO Files en Data Cloud?\n- **9.3** ¿Quién es el owner editorial de la KB — Telasist o El Águila?\n- **9.4** ¿Con qué frecuencia se actualiza la información de cobertura, tipos de servicio, políticas?\n- **9.5** ¿Hay FAQs históricos que podamos ingerir como base inicial?\n\n### Sección 10 · Métricas y criterios de éxito *(6 preguntas)*\n\n- **10.1** ¿Cuál es el criterio de 'éxito' del piloto de Telasist / El Águila / Salesforce?\n- **10.2** ¿Qué métricas se reportan en el board? ¿AHT, deflection, CSAT, cost/call?\n- **10.3** ¿Cómo se recolecta CSAT post-llamada? ¿SMS 1–5? ¿IVR? ¿WhatsApp?\n- **10.4** ¿Cuál es el umbral mínimo aceptable para expandir el piloto a producción?\n- **10.5** ¿Cuánto tiempo dura el piloto antes de decisión de rollout? *(30/60/90 días)*\n- **10.6** ¿Quién audita las conversaciones semanalmente para calidad? Con qué muestreo.\n\n### Sección 11 · Bloqueadores comerciales/técnicos ya conocidos\n\n| # | Bloqueador | Estado |\n|---|---|---|\n| **11.1** | Override CPQ rule #12VY para permitir SKU US Long Code con billing MX | 🔴 En escalación |\n| **11.2** | Compra del SKU Agentforce Contact Center Voice — $75/seat × 350 = **$26,250/mes** | 🟡 Pendiente |\n| **11.3** | Confirmación de Flex Credits: 1M o 2.5M según contrato Telasist | 🟡 Pendiente |\n| **11.4** | Configuración Partner Voice Forwarding con Amazon Connect BYOT | 🟡 En diseño |\n| **11.5** | Número US asignado + porting/setup | 🟡 Pendiente |\n| **11.6** | Kickoff LATAM TA&B Engagement Intake | 🟡 Pendiente |\n\n---\n\n> ✅ **Total: 57 preguntas de descubrimiento + 6 bloqueadores accionables.**",
      },
      {
        id: "uc2",
        label: "UC2 · Viva Aerobus",
        title: "UC2 — Campaña Viva Aerobus · Refund Request Processing (Fase 2)",
        content:
          "> 🥇 **El caso de mayor volumen del portafolio** — ~9,327 llamadas/mes. Modelo **híbrido**: el agente automatiza la capa transaccional; escala a humano cuando hay carga emocional real.\n\n## El problema hoy\n\nLas llamadas de reembolso son **emocionalmente cargadas** *(vuelo cancelado, disputa de cobro)* y dependen **100% del asesor humano**:\n\n- Éste busca la reserva en el PSS\n- Abre el caso manualmente\n- Comunica timeline y calma al cliente\n\n**Resultado:** AHT alto, costo por llamada alto, satisfacción variable.\n\n## Con Agentforce Voice · modelo híbrido\n\n1. **Agente automatiza** la capa transaccional *(identificación, lookup, apertura de caso, expectation setting)*\n2. **Ofrece portal self-service** por SMS/WhatsApp para seguimiento asíncrono\n3. **Escala a humano** cuando detecta escalación emocional o complejidad real\n\n## Ficha técnica\n\n| Campo | Detalle |\n|---|---|\n| **Nombre** | Viva Refund Assistant |\n| **Rol** | Asistente conversacional híbrido · captura estructurada + expectation setting + handoff empático · español mexicano · tono empático primero, transaccional después |\n| **Canal** | Voz inbound *(Amazon Connect → Agentforce Voice)* + SMS/WhatsApp asíncrono |\n| **Escalamiento** | **Frecuente y esperado.** Handoff con resumen contextual pre-cargado |\n| **Volumen** | ~9,327 llamadas/mes · 111,929 acumulado · Duración: **TBD** |\n\n## Subagents\n\n1. **`Reservation_Lookup_Agent`** — especializado en PSS Viva\n2. **`Refund_Case_Opener`** — crea Case y setea timeline\n3. **`Escalation_Handler`** — orquesta handoff a humano con resumen\n\n## Acciones (Actions) tentativas\n\n1. **`Greet_And_Empathize`** *(Prompt Template)*\n2. **`Identify_Caller`** *(Apex)* — match por ANI + reservation code\n3. **`Lookup_Reservation`** *(External Service o Flow)* — API PSS Viva Aerobus\n4. **`Classify_Refund_Reason`** — tag automático *(cancelación, no-show, doble cargo, otro)*\n5. **`Open_Refund_Case`** *(Flow)* — Case con SLA de reembolso\n6. **`Set_Expectation`** *(Prompt Template)* — timeline según razón\n7. **`Send_Portal_Link_SMS`** *(Flow + Twilio/WhatsApp)* — deep link al portal\n8. **`Sentiment_Escalate`** *(Apex)* — detección de escalación → transfer\n9. **`Warm_Handoff_Summary`** — resumen para el humano receptor\n\n## Triggers de escalamiento\n\n- Escalación emocional detectada por sentiment analysis\n- Disputas con más de 1 evento involucrado\n- Solicitud explícita del llamador\n\n## Datos y conocimiento\n\n### Datos que consume\n\n**De la llamada:** reservation code · vuelo · fecha · razón del reembolso · sentimiento.\n\n**De Salesforce:** catálogo de razones · SLAs por razón · Case Record Type Viva.\n\n**Externos:**\n- **API PSS Viva Aerobus** *(reservation lookup — TBD contrato/endpoint)*\n- Portal de seguimiento *(endpoint TBD)*\n- Gateway SMS/WhatsApp\n\n### KB necesaria\n\n- **Salesforce Knowledge**: políticas de reembolso Viva · plazos por razón · matriz de compensación · canales oficiales de seguimiento\n- **UDMO Files en Data Cloud**: T&Cs Viva Aerobus (PDF) · tarifario dinámico · matriz de cargos y créditos\n- Custom Retriever `Cliente = Viva Aerobus`\n\n## KPIs de éxito\n\n| KPI | Target |\n|---|---|\n| % deflection sin humano | **≥40%** |\n| Handoffs con resumen completo | **100%** |\n| AHT híbrido vs. AHT full-humano | **−35%** |\n| CSAT post-llamada | **≥3.8** *(es la más difícil de mover positivamente)* |\n| Tiempo hasta resolución del reembolso | Baseline por establecer |\n\n## Supuestos documentados\n\n1. Viva Aerobus expone API PSS con lookup por reservation code — **por confirmar**\n2. Existe portal self-service para status, o se monta en Experience Cloud\n3. Escalación va a queue de humanos Viva-especializados *(no genéricos)*\n4. AHT promedio de la campaña es 8–12 min *(heurística LCC LATAM — por validar)*",
      },
      {
        id: "uc3",
        label: "UC3 · Coppel",
        title: "UC3 — Campaña Coppel · Service Request Triage (Fase 2)",
        content:
          "> 🔧 **Alto volumen, estructura clara.** Interacciones repetitivas de baja complejidad. 4 pasos automatizables. El humano solo interviene en casos complejos.\n\n## El problema hoy\n\nEl asesor humano ejecuta 4 pasos repetitivos:\n\n1. Confirma identidad\n2. Captura dirección\n3. Hace lookup del cliente\n4. Logea el caso\n\n**Cada llamada:** 6 minutos promedio. **Volumen:** ~3,921 llamadas/mes.\n\n## Con Agentforce Voice\n\nEl agente ejecuta los 4 pasos automáticamente, dejando al humano solo casos complejos *(excepciones, disputas, escalaciones)*.\n\n## Ficha técnica\n\n| Campo | Detalle |\n|---|---|\n| **Nombre** | Coppel Triage Assistant |\n| **Rol** | Asistente conversacional transaccional de alto volumen · tono directo, concreto, sin ornamento · español mexicano regional *(Coppel es fuerte en norte)* |\n| **Canal** | Voz inbound *(Amazon Connect → Agentforce Voice)* |\n| **Escalamiento** | **Por complejidad** *(ver triggers abajo)* |\n| **Volumen** | ~3,921 llamadas/mes · 47,047 acumulado · Duración 6 min promedio |\n\n## Subagents\n\n1. **`Identity_Validator`** — validación por preguntas de seguridad + ANI matching\n2. **`Geolocation_Capture`** — captura y valida dirección *(parse + normalización)*\n\n## Acciones (Actions) tentativas\n\n1. **`Greet_And_Auth`** — saludo + reconocimiento por ANI\n2. **`Validate_Identity_KBA`** *(Apex)* — Knowledge-Based Auth (2 preguntas)\n3. **`Capture_Address_And_Geocode`** *(Flow + External Service Google Maps o INEGI)*\n4. **`Confirm_Address_With_Caller`** — read-back con confirmación\n5. **`Classify_Case_Type`** — picklist *(compra, cobranza, entrega, garantía)*\n6. **`Create_Case_With_Metadata`** *(Flow)* — Case con toda la data capturada\n7. **`Route_Or_Close`** — auto-cierre, ruteo a queue Coppel, o handoff\n\n## Triggers de escalamiento\n\nEscala cuando:\n\n- **KBA falla 2 veces**\n- El **intent no está en el catálogo** automatizado\n- El llamador reporta situación **fuera del scope** *(fraude, robo, siniestro grave)*\n\n## Datos y conocimiento\n\n### Datos que consume\n\n**De la llamada:** identidad (2 KBA) · dirección o referencia · tipo de solicitud.\n\n**De Salesforce:** catálogo Coppel de tipos de caso · Person Account lookup · Address history.\n\n**Externos:**\n- API de geocoding *(Google Maps o INEGI DENUE)*\n- API Coppel de validación de cliente *(TBD)*\n\n### KB necesaria\n\n- Tipos de solicitud Coppel\n- Criterios de auto-cierre vs. ruteo\n- Política KBA\n- Matriz de escalación por tipo\n- Data Categories: `Cliente = Coppel`\n\n## KPIs de éxito\n\n| KPI | Target |\n|---|---|\n| % de casos auto-creados sin humano | **≥75%** |\n| Precisión de geocoding *(direcciones normalizadas)* | **≥90%** |\n| AHT vs. baseline humano | **−50%** |\n| Tasa de re-work *(case reabierto por dato incorrecto)* | **<5%** |\n\n## Supuestos documentados\n\n1. Existe **KBA suficiente para autenticar por voz** *(2 preguntas ≠ SMS OTP)*\n2. La API de geocoding **maneja direcciones informales** latinoamericanas\n3. Coppel acepta que el **auto-cierre aplique en subset controlado** de tipos de caso\n4. Person Account está **unificado** *(el mismo cliente no está duplicado en múltiples records)*",
      },
      {
        id: "uc4",
        label: "UC4 · Copilot Interno",
        title: "UC4 — Telasist Agent Copilot · Interno transversal",
        content:
          "> 💎 **El único UC que NO depende del SKU Voice add-on.** UC4 corre 100% sobre lo que **Service Cloud Agentforce 1 Edition ya incluye out-of-the-box** — Telasist puede desplegarlo en paralelo al piloto UC1 sin bloqueo comercial adicional.\n\n## Cuatro capacidades transversales\n\nAsisten a los **350 asesores humanos** del piso operativo, sin importar la campaña:\n\n1. **Agent Assist / Knowledge** — sugiere respuestas y acciones durante la llamada\n2. **Auto-Summarization** — genera resumen post-call en el Case automáticamente\n3. **Sentiment Monitoring** — detecta escalaciones antes de que el cliente reclame\n4. **Campaign Bootstrapping** — acelera el onboarding de nuevas campañas\n\n## Ficha técnica\n\n| Campo | Detalle |\n|---|---|\n| **Nombre** | Telasist Agent Copilot |\n| **Rol** | Copilot in-call para agentes humanos + auto-summarizer post-call + supervisor coach · **NO interactúa con el cliente final** |\n| **Canal** | Interno — Service Console + Slack *(supervisores)* |\n| **Escalamiento** | N/A — asiste al humano · sí genera alertas al supervisor |\n| **Volumen** | **100% del piso operativo** · 350 seats · ~325K llamadas/año |\n\n## Subagents\n\n1. **`Knowledge_Surface_Agent`** — retrieval de KB en vivo según transcripción\n2. **`Auto_Summarizer`** — genera resumen post-call en el Case\n3. **`Sentiment_Monitor`** — monitorea sentimiento en tiempo real y alerta al supervisor\n4. **`Campaign_Bootstrapper`** — genera call flows para nuevas campañas desde historia de casos\n\n## Acciones (Actions) tentativas\n\n1. **`Live_Transcription_Listener`** — Contact Lens o Voice Insights\n2. **`Surface_Next_Best_Action`** — Prompt Template + retrieval sobre KB\n3. **`Auto_Generate_Case_Summary`** — Conversation Summaries *(nativo de la licencia)*\n4. **`Detect_Escalation_Signal`** — Tableau Next Real-Time Sentiment + trigger a Slack de supervisor\n5. **`Coach_Card_Push`** — micro-tip al agente durante llamada\n6. **`Generate_Campaign_Flow`** — propone topics/actions para nueva campaña\n\n## KPIs de éxito\n\n| KPI | Target |\n|---|---|\n| AHT humano baseline vs. con copilot | **−15% a −25%** |\n| ACW eliminado *(After Call Work)* | **−80%** |\n| Tiempo de onboarding de nueva campaña | **−40%** |\n| Escalaciones detectadas antes de reclamo | **≥60%** |\n\n## ✅ Componentes YA incluidos en Agentforce 1 Edition\n\n*Verificado en fuentes oficiales Salesforce (julio 2026).*\n\n| Feature de la licencia | Cubre |\n|---|---|\n| **Agentforce for Employees Unmetered** | El copilot in-console |\n| **Conversation Summaries** | Auto-Summarizer post-call |\n| **Service Replies** | Respuestas asistidas en canales digitales |\n| **Tableau Next** *(real-time customer sentiment)* | Sentiment_Monitor |\n| **Einstein Case Classification** (5 Data Segments) | Clasificación automática |\n| **Einstein Case Routing** (2K predictions/user/mes) | Ruteo inteligente |\n| **Article Recommendations** *(unmetered)* | Next_Best_Action |\n| **Einstein Bots** + **Feedback Management** + **Slack Enterprise+** | Orquestación completa |\n\n## ⚠️ Add-ons opcionales si Telasist quiere ir más lejos\n\n**Einstein Conversation Insights (ECI)** — solo si quieren coaching analytics avanzado tipo Gong *(topic mining, speaker-level insights)*.\n\n> 💡 **Probablemente NO necesario para el POC.** Conversation Summaries + Tableau Next sentiment cubren ~80% del valor de ECI.\n>\n> **Fuente:** ECI NO está incluido en Agentforce 1 Edition según Einstein Platform Notices (mayo 2026).\n\n## Supuestos por validar con Deal Desk\n\n1. Amazon Connect entrega transcript en streaming *(Contact Lens o Voice Insights)*\n2. Los agentes humanos usan el **Service Console** como interfaz primaria *(no otra herramienta)*\n3. **El licenciamiento de Agentforce 1 Edition (350 seats) cubre las 4 capacidades sin add-on adicional** — cross-check con Deal Desk pendiente\n4. Los supervisores usan **Slack** como canal de alerta primario",
      },
      {
        id: "arquitectura",
        label: "Arquitectura",
        title: "Arquitectura técnica del POC — Voice sobre Amazon Connect BYOT",
        content:
          "> 🏗️ **Stack objetivo del POC** — Fase 1 combina UC1 *(customer-facing con SKU Voice)* + UC4 *(interno, sin add-on)*.\n\n## Diagrama · UC1 Águila Concierge\n\n```\n┌──────────────────────────────────────────────────────────────────┐\n│  CANAL VOZ · Cliente final llama a número corto de El Águila    │\n└─────────────────────────────┬────────────────────────────────────┘\n                              │ Overflow\n                              ▼\n┌──────────────────────────────────────────────────────────────────┐\n│  AMAZON CONNECT (AWS · BYOT · cuenta de Telasist)                │\n│  · Contact flow: overflow route to Telasist                      │\n│  · IVR mínimo: \"Le atenderemos en breve\"                         │\n│  · Enrutamiento a queue Telasist-Águila                          │\n└─────────────────────────────┬────────────────────────────────────┘\n                              │ Partner Voice Forwarding\n                              │ (US Long Code — CPQ #12VY override)\n                              ▼\n┌──────────────────────────────────────────────────────────────────┐\n│  AGENTFORCE VOICE                                                │\n│  · Number: Salesforce-assigned US Long Code                      │\n│  · Agent: Águila Concierge                                       │\n│  · Prompt Templates + Actions + Custom Retrievers                │\n│  · Einstein Trust Layer (PII masking + zero retention + audit)   │\n└─────────────────────────────┬────────────────────────────────────┘\n                              │\n             ┌────────────────┼─────────────────┐\n             ▼                ▼                 ▼\n    ┌──────────────┐  ┌───────────────┐  ┌────────────────┐\n    │ Salesforce   │  │ Salesforce    │  │ Data Cloud     │\n    │ Case         │  │ Knowledge     │  │ UDMO Files     │\n    │ (Águila RT)  │  │ (Data Cat.    │  │ (SOPs, contra- │\n    │              │  │  Cliente=Ág.) │  │  tos Águila)   │\n    └──────────────┘  └───────────────┘  └────────────────┘\n             │\n             ▼\n    ┌─────────────────┐\n    │ Email Alert     │\n    │ (Águila_        │\n    │  Confirmacion)  │\n    └─────────────────┘\n```\n\n## Diagrama · UC4 Telasist Agent Copilot\n\n```\n┌──────────────────────────────────────────────────────────────────┐\n│  Cualquier llamada del piso (humano-atendida en Service Console) │\n└─────────────────────────────┬────────────────────────────────────┘\n                              │ Contact Lens / Voice Insights\n                              ▼\n┌──────────────────────────────────────────────────────────────────┐\n│  TELASIST AGENT COPILOT (Agentforce for Employees)               │\n│  · Live transcription listener                                   │\n│  · Next Best Action (Einstein NBA)                               │\n│  · Auto-summary at Case Close (Conversation Summaries)           │\n│  · Sentiment monitoring (Tableau Next Real-Time)                 │\n│  · Slack alert to supervisor on threshold breach                 │\n└──────────────────────────────────────────────────────────────────┘\n```\n\n## Componentes clave y responsabilidades\n\n| Componente | Producto | Responsabilidad | Estado |\n|---|---|---|---|\n| Telephony provider | **Amazon Connect** *(AWS · BYOT)* | Recepción de llamada, contact flow, enrutamiento inicial | 🟢 Existente en cuenta AWS Telasist |\n| Bridge Voice | **Partner Voice Forwarding** | Handoff AWS → Salesforce vía número US Long Code | 🟡 Requiere CPQ override + porting |\n| Agent conversacional | **Agentforce Voice** | Diálogo, captura, decisión, acción | 🟡 Requiere SKU adicional $75/seat |\n| Trust & compliance | **Einstein Trust Layer** | PII masking, zero retention, audit, toxicity filter | 🟢 Incluido en Agentforce 1 Edition |\n| Sistema de registro | **Salesforce Service Cloud** | Case, Contact, Person Account, Activity | 🟢 Ya en producción *(~ene 2026)* |\n| Base de conocimiento | **Salesforce Knowledge + Data Cloud UDMO** | Grounding del agente, RAG sobre docs | 🟡 Requiere KB curation con Águila |\n| Copilot interno | **Agentforce for Employees** | Agent Assist, Auto-Summary, Sentiment | 🟢 Incluido en Agentforce 1 Edition |\n| Alertas supervisor | **Slack Enterprise+** | Coaching y escalación proactiva | 🟢 Incluido en Agentforce 1 Edition |\n\n## Puntos técnicos delicados\n\n### 1. 🔴 US Long Code vs. billing MX\n\nPartner Voice Forwarding requiere hoy un número US/Canadá. **CPQ rule #12VY** bloquea la cotización con billing address en México. Escalación de override activa; sin resolución, **el POC no arranca**.\n\n### 2. 🟡 Coexistencia con uContact\n\nTelasist opera hoy **uContact by net2phone** *(verificado por dominio `telasist.ucontactcloud.com`)*. El PDF interno menciona Amazon Connect. Confirmar en cuestionario si conviven, migran, o son entornos separados por cliente.\n\n### 3. 🟢 Redundancia de PII compliance\n\nCon **PCI DSS SAQ D-SP + ISO/IEC 27001:2022**, cualquier flujo de voz que roce data de tarjeta debe usar Einstein Trust Layer masking + zero retention. **Diseño Fase 1 evita completamente pedir data de tarjeta.**\n\n### 4. 🟡 Data residency\n\nAmazon Connect tenant de Telasist está en US. Verificar con Legal Telasist si la voz de cliente final MX puede fluir a US para procesamiento *(probablemente sí bajo T&Cs actuales, pero es checkpoint de Legal)*.",
      },
      {
        id: "licencia",
        label: "Licenciamiento",
        title: "Licenciamiento — qué ya cubre Agentforce 1 Edition y qué requiere add-on",
        content:
          "> ✅ **Verificado contra fuentes oficiales de Salesforce (julio 2026):** salesforce.com/service/pricing/, salesforce.com/agentforce/pricing/, salesforce.com/service/contact-center/pricing/, y Einstein Platform Notices & License Information PDF *(publicado mayo 2026)*.\n\n## ✅ YA incluido en Service Cloud Agentforce 1 Edition\n\n**Precio de la edición:** $550/user/mes · **350 seats de Telasist ya contratados**.\n\n| Categoría | Feature | Cubre |\n|---|---|---|\n| **Agentforce** | Agentforce for Service *(autonomous agents)* | UC1/UC2/UC3 razonamiento y acción |\n| Agentforce | Agentforce for Employees **Unmetered** *(in-console copilot)* | UC4 Agent Assist |\n| Agentforce | Prompt Builder | Todos los UC |\n| Flex Credits | 1M o 2.5M/org/año *(**por confirmar** — página vigente dice 2.5M, comunicado jun-2025 dice 1M)* | Consumo GenAI |\n| **Data Cloud** | Data Cloud con 2.5M Data Services Credits/org/año | UDMO Files, Custom Retrievers, unificación |\n| Slack | Slack Enterprise+ / Enterprise Grid por licencia | UC4 alertas supervisor |\n| Service base | Case, Omni-Channel, Knowledge, CTI, Orders, Field Service base | Todos los UC |\n| Digital Engagement | Einstein Bots, Enhanced Messaging, Feedback Management | UC2/UC3 SMS/WhatsApp |\n| Auto-Summary | Service Replies, Conversation Summaries | UC4 post-call summary |\n| Einstein clásico | Case Classification *(5 segments)* · Case Routing *(2K predictions/user/mes)* · Next Best Action *(5K requests/user/mes)* · Article Recommendations *(unmetered)* | UC4 NBA |\n| **Analytics** | Tableau Next con real-time customer sentiment | UC4 Sentiment Monitor |\n| Support | Premier Success Plan | Todos los UC |\n\n## ⚠️ NO incluido — requiere compra adicional\n\n| Add-on | Precio | Requerido para | Impacto |\n|---|---|---|---|\n| 🔑 **Agentforce Contact Center Voice** *(Agentforce 1 Edition Only · unlimited voice minutes · integración directa con customer data)* | **$75/user/mes** | UC1 · UC2 · UC3 *(customer-facing voice)* | **$26,250/mes · $315K/año** |\n| Salesforce Voice for Partner Telephony with Amazon Connect *(BYOT)* | Variante del SKU anterior · confirmar en order form | UC1/UC2/UC3 con BYOT | Se cotiza junto al Voice SKU |\n| Einstein Conversation Insights *(ECI)* | SKU separado agrupado en Sales Cloud | Solo si Telasist quiere coaching analytics avanzado tipo Gong | Probablemente **no necesario** para el POC — Conversation Summaries + Tableau Next sentiment cubren ~80% |\n| Agentforce Contact Center Plus | $250/user/mes | Solo si Telasist crece a workforce management completo | Fuera de scope POC |\n| Workforce Management | $50/user/mes | — | Fuera de scope POC |\n\n## Advertencias críticas para el cierre comercial\n\n### 1. 🟡 Discrepancia en Flex Credits\n\nEntre página vigente **(2.5M)** y comunicado oficial jun-2025 **(1M)** — confirmar cifra exacta en el order form de Telasist antes de comprometer volumen de consumo.\n\n### 2. 🔑 Flavor del Voice SKU\n\nSalesforce Voice tiene **dos variantes**:\n\n- **(a) Salesforce Voice with Amazon Connect** — Salesforce-resold, Salesforce factura minutos\n- **(b) Salesforce Voice for Partner Telephony with Amazon Connect (BYOT)** — Telasist mantiene su propia AWS y factura minutos AWS\n\n> 💡 **Telasist necesita la variante BYOT** porque ya tiene AWS credits.\n\n### 3. 🔴 CPQ rule #12VY\n\nRestringe cotización de SKUs US Long Code con billing address non-US. **Override en curso pero sin fecha de cierre confirmada.** Es el **gate #1 del POC**.\n\n### 4. 💰 Total add-on Fase 1\n\nEl Voice SKU **($26,250/mes = $315K/año)** es la única compra estrictamente necesaria para arrancar UC1. **UC4 se puede lanzar en paralelo sin add-on.**\n\n## Bottom line comercial\n\n> 💡 Con la licencia actual de Telasist *(350 seats Agentforce 1 Edition + Flex Credits + AWS credits)*:\n>\n> - **UC4** puede arrancar **inmediatamente** sin compra adicional\n> - **UC1** requiere resolver CPQ #12VY + comprar Voice SKU *($26,250/mes)*\n> - **UC2 y UC3** heredan la misma configuración una vez UC1 esté probado",
      },
      {
        id: "roadmap",
        label: "Roadmap",
        title: "Roadmap ejecutivo del POC — de piloto a producción",
        content:
          "> 🗓️ **Timeline objetivo:** Piloto UC1 arranca fin de julio 2026 · UC2/UC3 en sep-oct · UC4 arranca en paralelo desde agosto · **rollout completo Q4 2026**.\n\n## Fase 0 · Unblocking\n\n**⏱️ jul 2026 · semanas 1–2**\n\n- [ ] Resolver **CPQ rule #12VY** override — bloqueador #1, sin esto no arranca UC1/UC2/UC3\n- [ ] Aprobar y firmar SKU **Agentforce Contact Center Voice** *($26,250/mes × 350 seats)*\n- [ ] Kickoff **LATAM TA&B Engagement Intake** formal\n- [ ] Confirmar Flex Credits exactos en order form *(1M vs 2.5M)*\n- [ ] Confirmar variante BYOT vs. Salesforce-resold del Voice SKU\n- [ ] Provisionar US Long Code + porting/setup\n- [ ] Kickoff **cuestionario UC1** con Telasist — 57 preguntas + 6 bloqueadores\n\n## Fase 1 · Piloto UC1 · Águila Concierge\n\n**⏱️ jul-ago 2026 · 4–6 semanas**\n\n| Semana | Actividad |\n|---|---|\n| **1–2** | Recepción de respuestas cuestionario UC1, ajuste de scope |\n| **2–3** | Build del agente en sandbox — Topics, Actions, Prompt Templates, Custom Retrievers |\n| **3–4** | Curación de KB con content team de Telasist/Águila |\n| **4** | Setup técnico — Amazon Connect contact flow, Partner Voice Forwarding, número US |\n| **5** | Testing conversacional interno con equipo Telasist |\n| **6** | **Soft-launch** con muestra reducida de tráfico real *(10–20% overflow)* + monitoreo intensivo |\n\n**🎯 Success gate:** ≥85% deflection · CSAT ≥4.0 · Case creation ≥95%\n\n## Fase 1b · UC4 · Copilot interno *(paralelo a Fase 1)*\n\n**⏱️ ago 2026 · 4 semanas**\n\n| Semana | Actividad |\n|---|---|\n| **1** | Activación de Agentforce for Employees en el Service Console para pool piloto de **20–30 asesores** |\n| **2** | Setup de Conversation Summaries automáticas al cierre de Case |\n| **3** | Activación de Tableau Next real-time sentiment con alerta Slack a **3–5 supervisores** piloto |\n| **4** | Expansión gradual al piso completo *(350 seats)* por ola |\n\n**🎯 Success gate:** AHT −15% · ACW −80% · satisfacción del asesor ≥80%\n\n## Fase 2 · UC2 (Viva Aerobus) + UC3 (Coppel)\n\n**⏱️ sep-oct 2026 · 8–10 semanas**\n\n- **Prerequisito:** UC1 en producción con métricas cumplidas\n- **Kickoff Viva Aerobus:** acceso a PSS API, curación de KB de reembolsos, portal self-service *(Experience Cloud si no existe)*\n- **Kickoff Coppel:** KBA rules, geocoding provider, catálogo de tipos de caso\n- **Build en paralelo** por dos squads dedicados\n- **Rollout controlado** — Viva: 20% de reembolsos vía Voice · Coppel: 30% del volumen elegible\n\n**🎯 Success gate Viva:** deflection ≥40% · CSAT ≥3.8\n**🎯 Success gate Coppel:** deflection ≥75% · geocoding accuracy ≥90%\n\n## Fase 3 · Rollout completo + optimización\n\n**⏱️ nov-dic 2026**\n\n- Escalamiento al **100% del volumen elegible** en UC1/UC2/UC3\n- Evaluación de las **150+ campañas long-tail** — priorizar 3–5 más viables\n- **Decisión ECI**: ¿Telasist necesita coaching analytics avanzado? Si sí, cotizar add-on\n- **Post-mortem** del POC + business case actualizado para 2027\n\n## Riesgos y bloqueadores actuales\n\n| # | Riesgo | Severidad | Impacto |\n|---|---|---|---|\n| 1 | CPQ #12VY sin fecha de override | 🔴 **Alto** | Bloquea UC1. Escalación en curso |\n| 2 | Aprobación presupuestal del SKU Voice *($315K/año)* | 🔴 **Alto** | Board de Telasist debe firmar |\n| 3 | Amazon Connect vs. uContact — clarificar coexistencia o migración | 🟡 Medio | Impacta arquitectura de Fase 2 |\n| 4 | API de El Águila para validación de cobertura | 🟡 Medio | Dependencia externa |\n| 5 | KB curation — Telasist debe asignar owner editorial | 🟢 Bajo | Trabajable con contenido default |\n| 6 | Data residency legal review *(voz MX flotando a US)* | 🟢 Bajo | Probablemente resuelto en T&Cs actuales |",
      },
      {
        id: "analisis-org",
        label: "Análisis actual de la org",
        title: "Análisis actual de la org — Sandbox QA de Telasist",
        content:
          "> 🔍 **Inspección técnica** realizada el **3 de julio de 2026** contra la Sandbox `telasist--qa.sandbox.my.salesforce.com` *(usuario `jon@telasist.qa` · Org Id `00DDM000003ftUk2AI`)*. Objetivo: entender qué existe hoy en la org y qué falta para habilitar UC1 (Campaña El Águila · Overflow).\n\n## TL;DR — la buena noticia\n\n> La org **ya tiene** los cimientos técnicos para el UC1: Service Cloud Voice conectado, CallCenter QA activo, un multi-agente Agentforce con orquestación concurrente, **un topic 'El Aguila Seguros' con 7 versiones iteradas**, flows de matching de VoiceCall→Contact→Case, y una campaña 'Desborde El Aguila' con 54 casos históricos. **No arrancamos desde cero — hay que cerrar acciones específicas, no construir la arquitectura.**\n\n## 1. Volumen y base histórica\n\n| Métrica | Valor |\n|---|---|\n| Casos históricos en la org | **10,904** |\n| VoiceCalls registradas | **45,282** total *(45,267 ContactCenter · 15 NativeVoice)* |\n| MessagingSessions | 33 |\n| Casos por `Origin=Teléfono` | 4,423 |\n| Casos por `Origin=API` | 4,524 *(sugiere integración con AWS/uContact vía API)* |\n\n**Implicación:** el vendor `ContactCenter` en VoiceCall confirma que Amazon Connect ya está entregando llamadas a la org — la integración base no está por hacerse, ya opera.\n\n## 2. Agentforce — qué existe hoy\n\n### Bots (`BotDefinition`)\n\n| Nombre | Notas |\n|---|---|\n| `Agentforce_Telasist_Agent` | Agente principal *(creado por Emmanuel Del Rio · 10-jun-2026)* |\n| **`Agentforce_Telasist_Agent_Demo`** | **Agente demo con 9 versiones** — v9 activa · tipo `EinsteinServiceAgent / ExternalCopilot` · `VoiceCallId` como context variable ⬅ **Voice-ready** |\n| `Telis` | 2 versiones · aparenta ser el track productivo del portafolio Telasist |\n| `Flow_Automation_Agent` | Agente de utilidad para automatización |\n| `trazabilidad_proveedores` | Agente específico de trazabilidad |\n\n### Planners (`GenAiPlannerDefinition`)\n\n- **`Agentforce_Telasist_Agent_Demo_v9`** — `plannerType: Atlas__ConcurrentMultiAgentOrchestration` ⬅ orquestación **concurrente** multi-agente\n- 13 planners totales entre Demo v1-v9, Telis v1/v2 y Flow Automation\n\n### Topics (`GenAiPluginDefinition`) del planner Demo\n\n| Topic | Estado |\n|---|---|\n| **`El Aguila Seguros`** | ✅ **Existe en 7 versiones iteradas** — descripción: *\"Eres un subagente enfocado en resolver dudas generales de pólizas, coberturas, deducibles, siniestros, vigencia, requisitos y contacto. Puedes ayudar en caso de siniestro desde el entendimiento del problema hasta el despacho a un agente una vez que se hayan tomados todos los datos.\"* |\n| `Case Management` | ✅ Presente en múltiples versiones |\n| `Agent Router` | ✅ Enrutamiento entre subagentes |\n| `Escalation` | ✅ Handoff a humano |\n| `ADO Caravana Rosa` | ✅ Topic para campaña ADO |\n| `Viva Aerobus Reembolsos` | ✅ Topic para UC2 |\n| Otros: `Order Inquiries`, `Reservation Management`, `Delivery Issues`, `Service Customer Verification`, `Account Management`, `General FAQ`, `Off Topic`, `Ambiguous Question`, `Iniciar Contratación`, `Persuadir Seguro` |\n\n> ⚠️ **Observación editorial:** el prompt actual del topic Águila está orientado a **Q&A de pólizas**. Para el UC1 de **overflow con captura de datos**, el prompt debe pivotar a: saludo → capturar (nombre, teléfono, tipo de siniestro, ubicación) → confirmar → enviar email → crear Case.\n\n## 3. Service Cloud Voice — Amazon Connect\n\n| Componente | Estado |\n|---|---|\n| **CallCenter** `Centro de Contacto QA` *(`ContactoQA`)* | ✅ Activo |\n| **Vendor `ContactCenter`** en VoiceCall | ✅ 45,267 registros — Amazon Connect entregando llamadas |\n| Service Channel `sfdc_phone` | ✅ Configurado |\n| Queue `Default Queue Agentforce Contact Center` *(`00G7z00000IckdlEAB`)* | ✅ Existe |\n\n### Flows Voice activos\n\n| Flow | Tipo | Función |\n|---|---|---|\n| **`Voice_Call`** | Before-Save de `VoiceCall` | Matching automático `FromPhoneNumber` → Contact → asigna `RelatedRecordId` y liga Case abierto en `SC_Case_in_VoiceCall__c` |\n| **`Agentforce_Voice_Route_to_Voice_Agent`** | RoutingFlow | Enruta llamada a Copilot `Agentforce Telasist Agent (Demo)` en canal `sfdc_phone` |\n| **`Agentforce_Voice_Escalate_to_Queue`** | Escalation Flow | Handoff a humano |\n\n> ✅ **Implicación crítica:** el pipeline `Amazon Connect → VoiceCall → Contact match → Copilot Agentforce` **ya está armado end-to-end**. Falta afinar el topic y agregar las actions específicas del UC1.\n\n## 4. Modelo de datos del Case\n\n### Record Types de Case *(6 total)*\n\n- `Caso general`\n- `Vial`\n- `Reembolsos`\n- `Queja`\n- `Mesa de Control`\n- **`ElevenLabs`** ⚠️ ← sugiere que hay o hubo un POC con Eleven Labs *(competidor activo mencionado en el PDF)*\n\n### Campos clave de Case para UC1\n\n| Campo | Tipo | Uso en UC1 |\n|---|---|---|\n| `Origin` | Picklist *(incluye `Teléfono`, `API`, `Web`, `Email`, `Manual`, `Facebook`, `Twitter`)* | `Teléfono` para llamadas de Águila |\n| `Type` | Picklist | Tipo de caso |\n| `Subject` | Text | Descripción corta capturada por el bot |\n| `RecordTypeId` | Reference | `Caso general` o crear `Aguila` |\n| **`Campana__c`** | Lookup → **`Campa_as__c`** | **Apunta al registro `Desborde El Aguila`** *(a007z00000veicbAAA · 54 casos históricos)* |\n| `Cliente_Corporativo__c` | Lookup → `Cliente_Corporativo__c` | Apunta a `Desborde Él Águila` *(a017z00001ckidyAAA)* |\n| `Campana_Padre__c` | Text | Campaña padre |\n| `Cliente_VIP__c` | Bool | Flag VIP |\n| `Subestatus__c` | Picklist | Sub-estatus del caso |\n\n### Campos custom para datos del llamante *(reusables)*\n\n`Nombre_llamante__c` · `Apellido_paterno_llamante__c` · `Apellido_materno_llamante__c` · `Numero_de_contacto_llamante__c` · `Correo_Electronico__c` · `Entidad_llamante__c`\n\nEl flow **`LLenadoInformacionLLamanteCrearCaso`** *(Active, Before-Save)* rellena estos campos automáticamente cuando se asocia un `AccountId` al Case — se puede reusar tal cual.\n\n## 5. Automatizaciones de Case reusables\n\n> 49 flows activos relacionados con Case detectados. Los más relevantes para UC1:\n\n| Flow | Función |\n|---|---|\n| `LLenadoInformacionLLamanteCrearCaso` | Copia datos del Account/Contact al Case |\n| `Crear_Caso_General_desde_PreCaso` | Convierte `Pre_Caso__c` en Case formal |\n| `Actualiza_informacion_del_caso_al_crear` | Enriquecimiento post-creación |\n| `Enruta_Casos_por_etapa_y_cola` | Routing a colas por etapa |\n| `Routing_Agentforce` · `Omnichannel_Agentforce` · `Prospectos_Agentforce` | Enrutamiento omnicanal a Agentforce |\n| `Genera_encuesta_relacionada_a_caso` | Generación de encuesta post-Case |\n\n## 6. Objetos custom relevantes\n\n- **`Campa_as__c`** *(label: 'Campañas')* — contiene el registro **`Desborde El Aguila`** ⬅ el ID a usar en el UC1\n- `Cliente_Corporativo__c` — cliente corporativo del contrato de asistencia\n- `Pre_Caso__c` — pre-caso previo a la creación del caso formal\n- `HistorialProveedorAsignadoCaso__c` — trazabilidad de proveedores por caso\n- `Estados__c` — catálogo de estados de México\n- `Clave_del_caso__c` — clave del caso\n- `ConfiguracionReembolso__mdt` — configuración de reembolsos *(Custom Metadata Type)*\n\n## 7. Permission Sets detectados\n\nAmplio catálogo de roles funcionales ya modelados: `Agente_Medico`, `Agente_Legal`, `Agente_Psicologo`, `Agente_Redes`, `Agente_de_Calidad`, `Agente_de_Reembolso`, `Agente_de_Asignacion`, `Agente_de_Seguimiento`, `Agente_de_Enlace`, `Agente_Toma_de_Datos`, `Agente_Mesa_de_Control`, `SC_Agente_de_Mensajeria`, `ServiceCloudVoiceCustomPsl`, `FSL_Agent_License`, `FSL_AIAgent_License`, `Agentforce_Telasist_Agent1260400769_Permissions`, `Agentforce_Telasist_Agent_Demo2116614608_Permissions`, `Use_Flow_Automation_Agent`.\n\n> **Implicación:** el modelo operativo humano de Telasist ya está segmentado en roles finos — el copilot interno (UC4) puede apoyarse en estos permission sets para hacer Agent Assist contextual por rol.\n\n## 8. Gaps identificados para arrancar UC1\n\n| # | Gap | Prioridad | Owner |\n|---|---|---|---|\n| 1 | **Aclarar cuál agente es la línea productiva** — `Agentforce_Telasist_Agent_Demo_v9` *(demo iterativo)* vs. `Telis_v2` *(track productivo)* — todo el trabajo del UC1 va sobre el ganador | 🔴 Bloqueante | Emmanuel Del Rio / Nayeli Viveros |\n| 2 | **GenAiFunction 'Crear Caso Águila'** — action del topic que cree Case con `RecordType=Caso general` *(o nuevo `Aguila`)* · `Origin=Teléfono` · `Campana__c=Desborde El Aguila (a007z00000veicbAAA)` · `Cliente_Corporativo__c=Desborde Él Águila (a017z00001ckidyAAA)` · `ContactId` del match · `Subject` + descripción del bot | 🔴 Alta | SE Lead |\n| 3 | **EmailTemplate en español** de confirmación de servicio Águila — no hay plantilla detectada; hay que crearla y exponerla como action | 🟡 Media | SE + Telasist Marketing |\n| 4 | **Reescribir el prompt del topic `El Aguila Seguros`** — de Q&A de pólizas a **captura de datos en overflow**: saludo → capturar (nombre, teléfono, tipo de siniestro, ubicación) → confirmar → email → Case | 🔴 Alta | Distinguished SE |\n| 5 | **Publicación del planner** — no verifiqué si Demo v9 está publicado; los 9 versionados sugieren build interno todavía | 🟡 Media | Emmanuel Del Rio |\n| 6 | **Retrieve completo del `GenAiPlugin` 'El Aguila Seguros'** — el intento con el bundle Id falló *(se necesita el nombre exacto del GenAiPluginBundleVersion)*. Es prerrequisito para saber qué actions ya tiene el topic hoy | 🟡 Media | SE |\n| 7 | **Knowledge / Data Cloud grounding** — no verifiqué si hay KB de El Águila *(pólizas, coberturas, tipos de siniestro)* para que el topic tenga referencia autoritativa | 🟡 Media | Telasist Editorial Owner |\n| 8 | **Número US Long Code** — CPQ rule #12VY sigue bloqueando la compra del SKU; **no es un gap de la org**, es comercial | 🔴 Externo | Deal Desk |\n\n## 9. Recomendación de secuencia\n\n1. **Decidir agente productivo** *(Demo v9 vs Telis_v2)* — 1 día\n2. **Retrieve completo del planner productivo + plugins + functions** para ver qué actions ya expone hoy — 1 día\n3. **Redactar el nuevo prompt del topic Águila** para overflow *(no Q&A)* — 1 día\n4. **Construir la action 'Crear Caso Águila'** apuntando a `Campa_as__c=Desborde El Aguila` — 2 días\n5. **Crear EmailTemplate en español** + action que la envíe — 1 día\n6. **Test end-to-end** en el `Centro de Contacto QA`: llamada de prueba → `Voice_Call` matching → routing → topic Águila → action → Case creado + email enviado — 2 días\n\n> 🎯 **Total estimado del build técnico: ~1 semana calendario** una vez decidido el agente productivo. La arquitectura ya está — es un ejercicio de **completar el topic + acciones**, no de construir desde cero.",
      },
      {
        id: "modelo-datos-case",
        label: "Modelo de datos Case",
        title: "Modelo de datos del objeto Case en Telasist",
        content:
          "> 🔬 **Análisis realizado el 4 de julio de 2026** contra la Sandbox QA. El objeto `Case` en Telasist es una entidad *rica en dominio de asistencia* — **452 campos totales**, **6 Record Types** activos, y una red de **~15 objetos relacionados** que modelan campañas comerciales, catálogos geográficos, cobertura contractual, proveedores y trazabilidad operativa.\n\n## TL;DR\n\n> `Case` en Telasist NO es un caso genérico de Service Cloud — es la **unidad transaccional de una asistencia despachada**. Está enriquecido con **datos del llamante, del solicitante, del beneficiario, del vehículo, geolocalización origen/destino, cobertura contractual, proveedor asignado, motivos de cierre/cancelación granulares** y trazabilidad completa por Etapa/Sub-estatus. El **Type estándar de Salesforce está prácticamente vacío** (10,890 de 10,904 casos sin valor) — **el 'tipo de soporte' real se resuelve por RecordType + `Subestatus__c` + campos de línea de servicio**, no por `Type`.\n\n## 1. Los 6 Record Types (Tipos de soporte)\n\n> Fuente: `SELECT COUNT(Id), RecordType.Name FROM Case GROUP BY RecordType.Name`\n\n| Record Type | Developer Name | Casos históricos | % | Uso |\n|---|---|---:|---:|---|\n| **Vial** | `Vial` | **5,634** | 51.7% | Asistencia vial *(grúas, gasolina, cerrajería, cambio de llanta, paso de corriente)*. El de mayor volumen — es el core operativo |\n| **Caso general** | `Caso_general` | **5,113** | 46.9% | Casos que no caen en un flujo especializado — asistencia hogar, médica, funeraria, mascota, viaje |\n| **Queja** | `Queja` | 125 | 1.1% | Reclamos/quejas con `Causa_o_Motivo__c` (18 tipologías) y `Estado_de_la_Queja__c` (8 estados) |\n| **Reembolsos** | `Reembolsos` | 10 | <1% | Casos de reembolso — usa `Tipo_de_reembolso__c` (22 categorías) y flujo `CrearCasoRembolso` |\n| **Mesa de Control** | `Mesa_de_Control` | 4 | <1% | Control operativo · casos hijo del padre `Caso_mesa_de_control__c` |\n| **ElevenLabs** | `ElevenLabs` | 0 | 0% | ⚠️ POC/piloto previo con **Eleven Labs** *(competidor activo mencionado en el PDF)*. Existe la estructura pero no hay casos productivos |\n\n> **Implicación estratégica:** el 98.6% del volumen se concentra en **Vial + Caso general**. Cualquier automatización con Agentforce Voice del UC1 opera sobre `Caso general` *(o un nuevo RT `Aguila`)*.\n\n## 2. Los estados del caso (`Status`)\n\n> Fuente: `SELECT COUNT(Id), Status FROM Case GROUP BY Status`\n\n| Status | Casos | Notas |\n|---|---:|---|\n| **Cancelado** | 5,179 | 47.5% de todos los casos — Telasist opera con alto ratio de cancelación *(pólizas vencidas, fuera de cobertura, resuelto por el usuario)* |\n| **Cerrado** | 3,083 | Cierre normal exitoso |\n| **Toma de datos** | 2,093 | ⬅ **Estado inicial** donde vive UC1 · el 19% del inventario histórico |\n| **Seguimiento** | 266 | Post-despacho, esperando resolución |\n| **Asignación** | 252 | Ya se identificó el proveedor a despachar |\n| **Nuevo** | 21 | Recién creado, sin toma de datos aún |\n| **Redes** | 6 | Caso derivado a Redes Sociales |\n| **Mesa de Control** | 3 | Escalado al equipo de control operativo |\n| *(sin valor)* | 1 | — |\n\n> **Implicación UC1:** el bot de Águila debe **crear casos en `Toma de datos`** *(o `Nuevo` → transitar a `Toma de datos` al capturar)* y **NO cerrarlos** — el cierre es responsabilidad del asesor humano después de despachar al proveedor.\n\n## 3. Etapa fina — Subestatus (`Subestatus__c`)\n\n> El **verdadero motor de estado** del caso vive aquí. **36 valores activos** que modelan el flujo operativo interno:\n\n### Etapas de **captura y validación**\n\n`Captura inicial` · `Calidad de datos / Rdatos` · `Validación de datos` · `TM-Validación de datos` · `Validación de Póliza` · `Primer Toque` · `Segundo Toque` · `Contacto`\n\n### Etapas de **asignación de proveedor**\n\n`Envío a Asignación` · `Asignación Automática` · `Asignación Manual` · `Búsqueda proveedor` · `Cambio de proveedor` · `Proveedor asignado` · `Regreso asignación`\n\n### Etapas de **despacho y cierre operativo**\n\n`Arribo` · `Arribo y Contacto` · `Cierre de servicio` · `Completo` · `Automático` · `Básica`\n\n### Etapas de **excepción**\n\n`Modo Espera Escalación` · `Modo Espera Validación Pago` · `Revisión de caso` · `Revisión de Costo` · `Revisión costo x muerto` · `AS-Confirmación Costo` · `AS-Revisión de Costo` · `AS-Revisión costo x muerto` · `Muerto` · `Improcedente` · `Cancelado`\n\n### Etapas de **post-servicio**\n\n`Reintegro` · `Apoyo Redes` · `Respuesta Redes` · `Abierto`\n\n## 4. `Type` (estándar) — casi sin uso\n\n> Solo 14 casos de 10,904 tienen valor en `Type`. **El campo funcional NO es este** — el negocio no lo poblan.\n\n`Problema` · `Solicitud de función` · `Pregunta` · `General` · `Reintegro` · `Mesa de control`\n\n## 5. Relaciones con el modelo comercial · Cliente → Campaña → Plan → Servicio → Cobertura\n\n> Este es el **esqueleto contractual** que define **qué asistencia** puede recibir cada llamante y bajo **qué condiciones**.\n\n### El diagrama de topología\n\n```\n┌─────────────────────────┐\n│ Cliente_Corporativo__c  │  46 registros — clientes empresariales de Telasist\n│  Ej: Desborde Él Águila │  (aseguradoras, retailers, bancos, aerolíneas)\n└──────────┬──────────────┘\n           │ 1:N\n           ▼\n┌─────────────────────────┐\n│ Campa_as__c (Campañas)  │  126 registros — contratos comerciales\n│  Ej: Desborde El Aguila │  Encuesta__c (Survey) · Producto__c (Product2)\n└──────────┬──────────────┘\n           │ 1:N\n           ▼\n┌─────────────────────────┐\n│ Planes__c (Planes)      │  265 registros — planes contratados por campaña\n└──────────┬──────────────┘\n           │ 1:N\n           ▼\n┌─────────────────────────┐\n│ Coberturas__c           │  1,959 registros — coberturas específicas del plan\n│                         │  Plan__c · SRV_Producto__c (Product2)\n└──────────┬──────────────┘\n           │ N:1\n           ▼\n┌─────────────────────────────────┐\n│ SRV_Nombres_comerciales__c      │  2,048 registros — servicios comerciales\n│  (Servicio)                     │  SRV_Coberturas__c → Coberturas__c\n└─────────────────────────────────┘\n```\n\n### Cómo se conecta al `Case`\n\n| Campo en Case | Referencia a | Registros del padre | Propósito |\n|---|---|---:|---|\n| `Cliente_Corporativo__c` | `Cliente_Corporativo__c` | 46 | Cliente empresarial dueño del contrato |\n| **`Campana__c`** *(label: Campaña)* | **`Campa_as__c`** | 126 | Contrato/línea de servicio — ej. `Desborde El Aguila` |\n| `Campana_Padre__c` *(text)* | — | — | Nombre denormalizado de la campaña padre |\n| `Plan__c` | `Planes__c` | 265 | Plan específico contratado |\n| `Cobertura__c` | `Coberturas__c` | 1,959 | Cobertura contractual aplicable |\n| `Servicio__c` | `SRV_Nombres_comerciales__c` | 2,048 | Servicio comercial *(nombre bajo el que se ofrece al cliente final)* |\n| `Servicio_ProductoId__c` | `Product2` | — | Producto interno correspondiente |\n| `ServicioContratadoId__c` | `Asset` | — | Instancia de servicio contratado por el titular |\n| `CatalogoTopeCoberturaCat__c` | `CatalogoTopeCoberturas__c` | 44 | Tope económico aplicable |\n\n> **Regla de negocio inferida:** para que Agentforce cree un caso válido debe resolver **al menos**: `Cliente_Corporativo__c` → `Campana__c` → `Plan__c` → `Cobertura__c`. La cadena determina qué asistencia puede o no despachar.\n\n## 6. Relaciones con el modelo geográfico · Estados → Municipios → Colonias\n\n> El PDF menciona el proyecto #13 del work plan: *\"Allow Salesforce to search for a customer's location based on captured data\"*. **La infraestructura ya existe.**\n\n```\nEstados__c (35) ──1:N──▶ Municipios__c (2,465) ──1:N──▶ Colonias__c (143,292)\n```\n\n### Cómo se usa en Case — **triplicado por rol geográfico**\n\n| Rol | Estado | Municipio | Colonia | Adicionales |\n|---|---|---|---|---|\n| **Llamante** | `Entidad_llamante__c` | `Municipio_llamante__c` | — | `Codigo_postal_llamante__c` |\n| **Solicitante** | `Entidad_solicitante__c` | `Municipio_solicitante__c` | — | — |\n| **Origen** *(arribo del servicio)* | `Entidad_Origen__c` | `Municipio_origen__c` | `Colonia_origen__c` | `Direccion_Calle_origen__c`, `Entre_calles_origen__c`, `Latitud_origen__c`, `Longitud_origen__c`, `N_mero_Exterior_Origen__c`, `Sistema_Origen__c` |\n| **Destino 1** *(grúas/traslados)* | `Entidad_destino__c` | `Municipio_destino__c` | `Colonia_destino__c` | `Direccion_Calle_destino__c`, `Entre_Calles_destino__c`, `Latitud_destino__c`, `Longitud_destino__c` |\n| **Destino 2** *(traslado múltiples paradas)* | `Entidad_destino2__c` | `Municipio_destino2__c` | `Colonia_destino2__c` | homólogos |\n\n> **Implicación UC1:** el bot debe capturar al menos **Estado + Municipio + Colonia + Calle + Referencias** para el `Origen` — el resto es opcional según el tipo de servicio Águila que corresponda.\n\n## 7. Modelo del vehículo *(específico para Record Type Vial)*\n\n```\nMarca__c (104) ──1:N──▶ Submarca__c (3,309)\n```\n\nCampos en Case:\n\n- `Marca_de_Vehiculo__c` → `Marca__c`\n- `Submarca_del_Vehiculo__c` → `Submarca__c`\n- `Tipo_de_Vehiculo__c` *(picklist: Moto · Camion · Auto · Híbrido · Eléctrico · Carga · Equipo pesado)*\n- `Tipo_de_Gasolina__c` *(Premium/Magna)*\n- `Prenden_las_luces_del_vehiculo__c`\n\n## 8. Modelo del **llamante**, **solicitante** y **beneficiario**\n\n> Telasist distingue **tres roles distintos** en la llamada:\n\n### El **llamante** *(quien marca al call center)* — 17 campos\n\n`Nombre_llamante__c` · `Apellido_paterno_llamante__c` · `Apellido_materno_llamante__c` · `Numero_de_contacto_llamante__c` · `Correo_Electronico__c` · `Fecha_de_nacimiento_llamante__c` · `Codigo_postal_llamante__c` · `Entidad_llamante__c` · `Municipio_llamante__c` · `Numero_de_Referencia_llamante__c`\n\n### El **solicitante** *(el titular — puede o no ser el mismo llamante)* — 13 campos\n\n`Nombre_de_solicitante__c` · `Apellido_Paterno_Solicitante__c` · `Apellido_Materno_Solicitante__c` · `Telefono_del_solicitante__c` · `Correo_Electronico_solicitante__c` · `Fecha_Nacimiento_solicitante__c` · `Genero_solicitante__c` · `Entidad_solicitante__c` · `Municipio_solicitante__c` · `Numero_de_Referencia_solicitante__c` · **`Solicitantes_es_el_mismo_que_quien_llama__c`** *(bool — regla de deduplicación)*\n\n### El **beneficiario** *(quien recibe el servicio)*\n\n`Nombre_del_beneficiario__c` · `Tipo_de_beneficiario__c` *(Regular · Empleado · Patrimonial · VIP)*\n\n> **Punto del work plan #20:** *\"Improvement so that when the caller and patient are the same person, the information is not transcribed again\"* → **el campo `Solicitantes_es_el_mismo_que_quien_llama__c` YA existe** en el modelo pero la automatización de reuso está pendiente.\n\n## 9. Modelo del **proveedor** despachado *(Vial y Médica)*\n\n```\nProveedores__c (138) ────▶ referenciado por Case.ProveedorId__c\n                          Case.CuentaProveedorId__c (Account)\n                          Case.CuentaSucursalId__c (Account)\nHistorialProveedorAsignadoCaso__c (1,815) ────▶ trazabilidad histórica\n```\n\nCampos clave en Case:\n\n- `ProveedorId__c` → `Proveedores__c`\n- `CuentaProveedorId__c` → `Account` *(cuando el proveedor es persona jurídica)*\n- `CuentaSucursalId__c` → `Account` *(sucursal específica)*\n- `CuentaSucursalAnteriorId__c` → `Account` *(historial de sucursal previa)*\n- `nombre_Proveedor__c`, `IdProveedor__c`, `proveedor_asignado__c` *(bool)*\n- `Fecha_hora_proveedor_asignado__c`\n- `Especialista_Interno__c` → `User` *(asesor Telasist responsable)*\n\n## 10. Objetos hijos de Case *(ecosistema transaccional)*\n\n> Recuperado por `describeSObject.childRelationships`\n\n| Objeto hijo | Campo lookup | Registros | Propósito |\n|---|---|---:|---|\n| **`Pre_Caso__c`** | `Caso_creado__c` | 356 | Pre-caso capturado antes de convertirse en Case formal *(work plan #3: unificar cabina de intake)* |\n| **`Pre_Cotizacion__c`** | `Caso__c` | 1,558 | Pre-cotizaciones asociadas al caso |\n| **`Cotizaciones__c`** | `CasoId__c` | 1,179 | Cotizaciones formales |\n| **`seguimiento__c`** | `Caso__c` | 1,249 | Seguimientos operativos y notas |\n| **`HistorialProveedorAsignadoCaso__c`** | `CaseId__c` | 1,815 | Historial de todos los proveedores asignados al caso |\n| **`Orden_de_compra__c`** | *(lookup)* | 199 | Órdenes de compra asociadas |\n| **`base_Claves__c`** | `ID_Servicio__c` | 401 | Claves base del servicio |\n| **`WorkOrder`** *(estándar)* | `CaseId` | — | Órdenes de trabajo estándar |\n| **`VoiceCall`** | `SC_Case_in_VoiceCall__c` | 45,282 | Llamada de voz asociada |\n| **`MessagingSession`** | `CaseId` | 33 | Sesión de mensajería |\n| **`LiveChatTranscript`** | `CaseId` | — | Transcripciones de chat |\n| **`EmailMessage`** | `ParentId` | — | Correos entrantes/salientes |\n| **`CaseComment`** | `ParentId` | — | Comentarios internos |\n| **`Attachment` · `ContentDocumentLink`** | — | — | Adjuntos y archivos |\n| **`ServiceAppointment`** | `ParentRecordId` | — | Field Service Lightning |\n| **`Case`** *(auto-referencia)* | `ParentId` · `Caso_mesa_de_control__c` | — | Jerarquía padre-hijo, útil para Mesa de Control |\n\n## 11. Motivos, cierres y cancelaciones — la taxonomía operativa\n\n### Motivo inicial *(qué originó la llamada)*\n\n**`Motivo__c`** *(7 valores)*: Interconsulta · Laboratorio · Descompostura · Pérdida Parcial · Pérdida Total · Accidente · Robo\n\n**`Reason` (estándar)** *(5 valores, poco usado)*: → **el negocio usa `Motivo__c` en lugar de `Reason`**.\n\n### Cierre normal\n\n- **`Motivo_de_cierre__c`** *(3 valores)*: Terminado · Reeintegro · Muerto\n- **`Submotivo_de_Cierre__c`** *(**32 valores**)*: taxonomía fina de por qué se cerró sin despacho pleno *(ej. \"Usuario realizó el servicio por sus medios\", \"No hay proveedor disponible\", \"Retraso de Proveedor/se reasigna\")*\n\n### Cancelación\n\n- **`Motivo_de_Cancelacion__c`** *(2 valores)*: Cancelado · Improcedente\n- **`Submotivo_de_cancelacion__c`** *(**94 valores** — la taxonomía más granular)*: `No es titular o beneficiario` · `Póliza vencida` · `Solicitud fuera de cobertura` · `VH inundado` · `Antigüedad VH mayor a 25 años` · etc.\n- **`Motivo_Cancelaci_n_Vial__c`** *(33 valores, específico para Vial)*: `Daño por fenómeno natural` · `Documentación incompleta` · `Póliza/Vigencia vencida` · `Proveedor no se presentó` · etc.\n\n> **Insight de arquitectura:** este nivel de granularidad *(94 submotivos de cancelación)* refleja **años de operación real** — Telasist ha atomizado la telemetría del contact center hasta el punto de reportabilidad fina. Cualquier agente Agentforce que resuelva **Cancelación**/`Improcedente` debe seleccionar el submotivo correcto para no destruir esa telemetría.\n\n## 12. Tipologías específicas por Record Type\n\n### Queja\n\n- **`Causa_o_Motivo__c`** *(18 valores)*: Atención deficiente · Garantía · Manejo indebido de datos personales · Modificación dolosa de información · Servicio fuera de SLA · etc.\n- **`Estado_de_la_Queja__c`** *(8 valores)*: Abierta · En análisis · En atención · Escalada · Pendiente de cliente · Resuelta · Cerrada sin resolución · Cancelada\n\n### Reembolsos\n\n- **`Tipo_de_reembolso__c`** *(22 valores)*: `indemnización por muerte accidental` · `reembolso por gastos medicos` · `Complicaciones por embarazo` · `Robo al titular justificado con renuncia correspondiente` · `Pérdida de equipaje` · etc.\n- Flow productivo: `CrearCasoRembolso`\n- Permission Set: `Agente_de_Reembolso`\n- Custom Metadata: `ConfiguracionReembolso__mdt`\n\n### Vial\n\n- Uso intensivo de `Marca_de_Vehiculo__c` / `Submarca_del_Vehiculo__c` / `Tipo_de_Vehiculo__c` / `Tipo_de_Gasolina__c`\n- 33 motivos de cancelación específicos *(vs los 94 generales)*\n- `Detalle_tipo_de_servicio__c`: Falla mecánica/eléctrica · Siniestro/Accidente\n\n### Mesa de Control\n\n- Auto-referencia vía `Caso_mesa_de_control__c` → Case *(caso padre)*\n- Flow productivo: `crearCasoMesaDeControl` + `crearCasoMesaDeControlPantalla`\n\n## 13. Service Cloud Voice — cómo se liga la llamada al Case\n\n> El **flow `Voice_Call` (Active, Before-Save de VoiceCall)** es el puente. Ver detalle en el tab \"Análisis actual de la org\".\n\n```\nAmazon Connect ──▶ VoiceCall (45,282 en Sandbox)\n                       │\n                       ├─ .FromPhoneNumber ──lookup──▶ Contact\n                       ├─ .RelatedRecordId  ◀────── asigna Contact.Id\n                       └─ .SC_Case_in_VoiceCall__c ◀── busca Case abierto de ese Contact\n```\n\n**Campos de VoiceCall relevantes:**\n\n- `VendorType`: `ContactCenter` (45,267) *(Amazon Connect)* · `NativeVoice` (15)\n- `FromPhoneNumber`, `WhoId` *(Contact)*, `RelatedRecordId`, `SC_Case_in_VoiceCall__c` *(Case)*\n\n## 14. Automatizaciones activas relacionadas a Case *(top 20 de 49)*\n\n| Flow | Trigger | Propósito |\n|---|---|---|\n| `LLenadoInformacionLLamanteCrearCaso` | Before-Save Case | Rellena datos del llamante desde Account |\n| `Crear_Caso_General_desde_PreCaso` | Screen/Auto | Convierte Pre_Caso__c en Case |\n| `CrearCasoRembolso` | Screen | Creación de Case tipo Reembolso |\n| `crearCasoMesaDeControl` / `crearCasoMesaDeControlPantalla` | Screen | Creación de Case Mesa de Control |\n| `Actualiza_informacion_del_caso_al_crear` | Record-Triggered | Enriquecimiento inicial |\n| `Caso_Inicializar_Subestado_al_Crear` | Before-Save | Setea `Subestatus__c` inicial |\n| `Actualiza_caso_con_asignacion` | Record-Triggered | Sincroniza campos post-asignación de proveedor |\n| `FlujoCaso_actualiza_ultimo_cambio_sub_estatus` | Record-Triggered | Audita cambios de Subestatus |\n| `Cerrar_Caso` / `Cancelar_Caso` | Screen | Cierre/cancelación con motivo y submotivo |\n| `Enruta_Casos_por_etapa_y_cola` / `Enruta_Casos_por_Etapa_y_Skills_V2` | Omni-Channel | Routing por etapa a colas y skills |\n| `Asignacion_casos_a_colas_x_sub_estatus` | Record-Triggered | Reasigna cola por Subestatus |\n| `Cambiar_Owner_al_Cerrar_o_Cancelar_Caso` | Before-Save | Owner cleanup al cerrar |\n| `Posible_Queja_Crear_Caso_Hijo` | Screen | Crea Case hijo de tipo Queja |\n| `Duplicar_caso_visita` | Screen | Duplicación controlada para visitas médicas |\n| `Establece_visualizacion_Tope_Cobertura_Caso` | Record-Triggered | Aplica `CatalogoTopeCoberturas__c` |\n| `Get_Case_By_CaseNumber` | Autolaunched | Utilería para lookup por CaseNumber |\n| `Genera_encuesta_relacionada_a_caso` / `Generar_Encuesta_Desde_Caso` | Record-Triggered | Genera Survey post-cierre |\n| `EnvioAutomaticoDeLinkParaUbicacionEnCasos_por_Email` | Record-Triggered | Envía liga de captura de ubicación al usuario |\n| `Voice_Call` | Before-Save VoiceCall | **Puente Amazon Connect → Case** |\n| `Agentforce_Voice_Route_to_Voice_Agent` | Routing Flow | Enruta a Copilot Agentforce |\n\n## 15. Implicaciones para el UC1 · Águila\n\n> Traducción del modelo al flujo del bot de voz de Águila:\n\n1. **Cargar contexto contractual:** el bot debe buscar `Cliente_Corporativo__c=Desborde Él Águila (a017z00001ckidyAAA)` → `Campana__c=Desborde El Aguila (a007z00000veicbAAA)` → derivar `Plan__c` y `Cobertura__c` disponibles.\n2. **Identificar llamante:** usar el `Contact` matched por `Voice_Call` (`FromPhoneNumber`). Si no hay match → capturar `Nombre_llamante__c` + `Apellido_paterno_llamante__c` + `Numero_de_contacto_llamante__c`.\n3. **Distinguir solicitante:** preguntar `Solicitantes_es_el_mismo_que_quien_llama__c`. Si no → capturar bloque solicitante completo.\n4. **Capturar ubicación de origen:** `Entidad_Origen__c` + `Municipio_origen__c` + `Colonia_origen__c` + `Direccion_Calle_origen__c` + coordenadas si posible.\n5. **Determinar servicio requerido:** por `Servicio__c` *(SRV_Nombres_comerciales__c)* o `Motivo__c`.\n6. **Crear Case:** `RecordType=Caso general` *(o nuevo `Aguila`)* · `Origin=Teléfono` · `Status=Toma de datos` · `Subestatus__c=Captura inicial` · vincular a `Campana__c`, `Cliente_Corporativo__c`, `Plan__c`, `Cobertura__c`.\n7. **Enviar email de confirmación** al `Correo_Electronico__c` capturado.\n8. **NO cerrar el caso** — el flujo continúa con `Enruta_Casos_por_etapa_y_cola` que lo lleva al equipo de Asignación.\n\n> ✅ **La mayoría de estos pasos son captura + escritura** — no requieren lógica compleja. La complejidad real está en **validar la cadena Cliente→Campaña→Plan→Cobertura** para no crear casos improcedentes.",
      },
      {
        id: "assets",
        label: "Assets",
        title: "Assets del proyecto Telasist",
        content:
          "Materiales de referencia y documentos fuente utilizados en el análisis y planificación del POC de Agentforce Voice para Telasist.",
        assetsData: {
          items: [
            {
              name: "TELASIST — Agentforce Voice Use Case Documentation",
              description:
                "PDF interno de Salesforce con el work plan de tecnología, análisis de campañas, detalle de los 4 casos de uso, arquitectura técnica, oportunidades activas y equipo del deal. Fuente principal del análisis inicial.",
              available: true,
              type: "doc",
              url: "/Customers/Telasist/telasist-agentforce-voice-use-cases.pdf",
            },
            {
              name: "Club de Protección Familiar Coppel V1 — Knowledge Base",
              description:
                "Documento oficial de Telasist con la Knowledge Base del Club de Protección Familiar Coppel: información general del contrato, servicios cubiertos (11), alcances, exclusiones, procedimientos operativos por servicio, requisitos, FAQ, y referencias externas. Fuente única y verbatim para el corpus del UC0.",
              available: true,
              type: "doc",
              url: "/Customers/Telasist/club-proteccion-familiar-coppel-kb.pdf",
            },
            {
              name: "Coppel — Desglose de volumen de llamadas feb–jul 2026",
              description:
                "Matriz interna de Telasist con tipificaciones y volúmenes reales de las 52,364 llamadas de Coppel entre febrero y julio 2026. Base del sizing del UC0 y del UC3. El cliente marcó en amarillo las tipificaciones gestionables por agente de IA.",
              available: true,
              type: "doc",
              url: "/Customers/Telasist/coppel-volumen-llamadas.xlsx",
            },
          ],
        },
      },
      {
        id: "scripts-aguila",
        label: "Scripts de llamada",
        title: "5 escenarios de llamada Agentforce Voice · Campaña El Águila",
        content:
          "> 🎬 **5 scripts turn-by-turn** que muestran cómo el agente de Agentforce Voice interactúa con 5 clientes distintos de El Águila. Cada script incluye **diálogo natural en español**, las **acciones específicas** que ejecuta el agente contra Salesforce, y las **transiciones de estado** del Case resultante.\n\n> **Convención de acciones** *(nombre técnico del bloque en Agentforce):*\n>\n> - `IdentifyCaller` — matching de VoiceCall.FromPhoneNumber → Contact *(flow Voice_Call ya activo)*\n> - `LookupCoverage` — resuelve la cadena `Cliente_Corporativo__c → Campana__c → Plan__c → Cobertura__c`\n> - `ValidatePolicy` — verifica vigencia de póliza en `Numero_de_Poliza__c` y estatus contractual\n> - `CaptureLocation` — captura Estado + Municipio + Colonia + Calle + Referencias\n> - `CreateCase` — inserta Case con RecordType, RelatedRecordId, Campana, Cliente Corporativo, Plan, Cobertura\n> - `SendConfirmationEmail` — dispara EmailTemplate al `Correo_Electronico__c`\n> - `EscalateToHuman` — invoca `Agentforce_Voice_Escalate_to_Queue` con contexto\n> - `LogInteraction` — persiste transcript en `CaseComment` y `seguimiento__c`\n\n---\n\n## Escenario 1 · Falla mecánica en carretera *(happy path Vial)*\n\n**Perfil del cliente:** Marisol Aguirre · Titular de póliza Águila · Suburbano 2019 varada en carretera federal MEX-15D.\n\n**Objetivo:** captura de datos completa y despacho a asignación de proveedor de grúa.\n\n### Contexto técnico previo\n\n- Amazon Connect entrega la llamada al número US Long Code asignado por Salesforce\n- Flow `Voice_Call` ejecuta antes-de-guardar sobre `VoiceCall`: `FromPhoneNumber=+525512345678` → **match único con Contact Marisol Aguirre (Account: Aguirre Ramírez)**\n- El planner `Agentforce_Telasist_Agent_Demo` recibe la llamada con `VoiceCallId` y `ContactId` como context variables\n- Enrutamiento: `Agent Router` → **topic `El Aguila Seguros`**\n\n### Turn-by-turn\n\n> 🤖 **Agente:** Hola, buenas tardes. Soy el asistente virtual de asistencias Águila. Le estoy hablando al número registrado a nombre de **Marisol Aguirre**. ¿Es correcto?\n>\n> 👤 **Cliente:** Sí, soy yo.\n\n**Acción:** `IdentifyCaller` ✅ *(confirmed)*\n\n> 🤖 **Agente:** Gracias, Marisol. Un momento, verifico su cobertura.\n\n**Acción:** `LookupCoverage`\n- `Cliente_Corporativo__c` = `Desborde Él Águila` *(a017z00001ckidyAAA)*\n- `Campana__c` = `Desborde El Aguila` *(a007z00000veicbAAA)*\n- `Plan__c` = `Plan Vial Premium Águila`\n- `Cobertura__c` = `Grúa hasta 200 km · Válida`\n\n**Acción:** `ValidatePolicy` — `Numero_de_Poliza__c` vigente hasta 2027-03-15 ✅\n\n> 🤖 **Agente:** Perfecto, veo que tiene activo su plan **Vial Premium** con cobertura de grúa hasta 200 km. Cuénteme, ¿en qué le puedo ayudar hoy?\n>\n> 👤 **Cliente:** Se me descompuso el carro en la carretera. Vengo de Guadalajara a Mazatlán y estoy varada como a 40 km después de Tepic.\n>\n> 🤖 **Agente:** Lo siento, Marisol. Voy a levantar un caso de asistencia vial para enviarle una grúa. Primero necesito algunos datos. ¿Es usted quien se encuentra con el vehículo?\n>\n> 👤 **Cliente:** Sí, yo estoy aquí.\n\n**Acción:** `Solicitantes_es_el_mismo_que_quien_llama__c` = `true` — evita re-captura\n\n> 🤖 **Agente:** ¿Qué marca y modelo de vehículo es?\n>\n> 👤 **Cliente:** Es una Chevrolet Suburbano 2019, color blanco.\n\n**Acción:** `Marca_de_Vehiculo__c` = Chevrolet · `Submarca_del_Vehiculo__c` = Suburban · `Tipo_de_Vehiculo__c` = Auto\n\n> 🤖 **Agente:** ¿Qué le pasó al vehículo? ¿Falla mecánica, o algo más?\n>\n> 👤 **Cliente:** Empezó a hacer un ruido raro y ya no aceleró. Se apagó y ya no prende.\n>\n> 🤖 **Agente:** Entiendo. ¿Prenden las luces del tablero cuando intenta encender?\n>\n> 👤 **Cliente:** No, nada, está todo apagado.\n\n**Acción:** `Motivo__c` = Descompostura · `Detalle_tipo_de_servicio__c` = Falla mecánica/eléctrica · `Prenden_las_luces_del_vehiculo__c` = No\n\n> 🤖 **Agente:** Gracias. Ahora dígame, ¿cuál es su ubicación exacta? ¿En qué estado, municipio y sobre qué carretera?\n>\n> 👤 **Cliente:** Estoy en Nayarit, municipio de Xalisco, sobre la carretera federal 15D dirección Mazatlán, como en el kilómetro 68.\n\n**Acción:** `CaptureLocation` — `Entidad_Origen__c` = Nayarit · `Municipio_origen__c` = Xalisco · `Direccion_Calle_origen__c` = Carretera Federal 15D km 68 dirección Mazatlán · `Latitud_origen__c`/`Longitud_origen__c` = geocoded via CallerID metadata\n\n> 🤖 **Agente:** ¿Tiene alguna referencia visible cercana? ¿Alguna gasolinera, restaurante, señalamiento?\n>\n> 👤 **Cliente:** Sí, hay una gasolinera Pemex como a 500 metros hacia adelante y un anuncio grande de Sabritas.\n\n**Acción:** `Referencia_origen__c` = Gasolinera Pemex a 500m + anuncio Sabritas · `Entre_calles_origen__c` = Carretera federal km 68\n\n> 🤖 **Agente:** Perfecto. ¿Va a llevar el vehículo a un taller específico o prefiere que la grúa lo lleve al taller autorizado más cercano?\n>\n> 👤 **Cliente:** Al taller autorizado más cercano por favor, no conozco la zona.\n\n**Acción:** `Entidad_destino__c` = *(pending — se resolverá en Asignación)* · `Servicio__c` = Grúa asistencia vial\n\n> 🤖 **Agente:** Muy bien. Por su seguridad, si es posible, active las intermitentes y permanezca dentro del vehículo con el cinturón puesto. ¿Puedo enviarle la confirmación al correo `m.aguirre@gmail.com` que tenemos registrado?\n>\n> 👤 **Cliente:** Sí, está bien.\n\n**Acción:** `CreateCase`\n\n```yaml\nRecordType: Caso general (o nuevo 'Aguila')\nOrigin: Teléfono\nStatus: Toma de datos\nSubestatus__c: Envío a Asignación\nCliente_Corporativo__c: a017z00001ckidyAAA\nCampana__c: a007z00000veicbAAA\nPlan__c: Plan Vial Premium Águila\nCobertura__c: Grúa hasta 200 km\nContactId: (matched)\nAccountId: (matched)\nSubject: Falla mecánica Suburban 2019 · Nayarit Km 68\nMotivo__c: Descompostura\nDetalle_tipo_de_servicio__c: Falla mecánica/eléctrica\nMarca/Submarca/TipoVehiculo: Chevrolet/Suburban/Auto\nEntidad/Municipio/Ref Origen: (capturados)\nSolicitantes_es_el_mismo_que_quien_llama__c: true\n```\n\n> Case creado: `500Xa0000...` · CaseNumber `00512847`\n\n**Acción:** `SendConfirmationEmail` → template `Aguila_Confirmacion_Vial_ES` a `m.aguirre@gmail.com`\n\n**Acción:** `LogInteraction` → `CaseComment` con transcript + `seguimiento__c` inicial\n\n> 🤖 **Agente:** Listo, Marisol. Su caso número **00512847** está en camino a nuestro equipo de asignación. En los próximos minutos recibirá un SMS con el tiempo estimado de arribo y el número del proveedor. Le acabo de mandar la confirmación por correo. ¿Necesita algo más?\n>\n> 👤 **Cliente:** No, gracias.\n>\n> 🤖 **Agente:** Manténgase segura, Marisol. Hasta pronto.\n\n### Post-llamada\n\nEl flow `Enruta_Casos_por_etapa_y_cola` toma el Case con `Subestatus__c=Envío a Asignación` y lo enruta a la cola del equipo de Asignación. **El humano NO cierra el caso ni recaptura datos.**\n\n---\n\n## Escenario 2 · Cliente no titular *(cancelación temprana con submotivo)*\n\n**Perfil del cliente:** José Luis Herrera · Llama desde el celular de su cuñado, sin poder acreditarse como titular ni beneficiario.\n\n**Objetivo:** identificar que no aplica cobertura, cancelar con submotivo correcto sin desperdiciar tiempo de asesor humano.\n\n### Turn-by-turn\n\n> 🤖 **Agente:** Hola, buenas tardes. Soy el asistente de asistencias Águila. Le estoy hablando al número registrado a nombre de **Roberto Sánchez**. ¿Es usted?\n>\n> 👤 **Cliente:** No, soy su cuñado. Le presto el teléfono a Roberto y me quedé con él, pero quería pedir una asistencia para mi carro.\n\n**Acción:** `IdentifyCaller` ⚠️ mismatch — el llamante NO es el titular\n\n> 🤖 **Agente:** Entiendo. Para poder ayudarle necesito confirmar que usted es titular o beneficiario de una póliza Águila. ¿Me puede dar su nombre completo y número de póliza?\n>\n> 👤 **Cliente:** Soy José Luis Herrera. No tengo póliza, pero pensé que como Roberto es cliente, podía ocupar su servicio.\n\n**Acción:** `LookupCoverage` con `Nombre + Apellido = José Luis Herrera` → **0 matches en Cliente_Corporativo Águila**\n\n> 🤖 **Agente:** Lamentablemente, señor Herrera, la asistencia Águila **solo aplica para el titular de la póliza o beneficiarios registrados**. No puedo levantar un servicio a su nombre desde la póliza del señor Sánchez.\n>\n> 👤 **Cliente:** ¿Ni siquiera como emergencia?\n>\n> 🤖 **Agente:** Los términos de la póliza son estrictos en este punto, señor Herrera. Le sugiero comunicarse con su aseguradora directamente o revisar si tiene cobertura vial en otro producto. ¿Hay algo más en lo que le pueda ayudar?\n>\n> 👤 **Cliente:** No, gracias.\n\n**Acción:** `CreateCase`\n\n```yaml\nRecordType: Caso general\nOrigin: Teléfono\nStatus: Cancelado\nSubestatus__c: Improcedente\nMotivo_de_Cancelacion__c: Improcedente\nSubmotivo_de_cancelacion__c: Solicita servicio 3ra persona/No es beneficiario\nCliente_Corporativo__c: a017z00001ckidyAAA (Desborde Él Águila)\nCampana__c: a007z00000veicbAAA (Desborde El Aguila)\nSubject: Solicitud improcedente · 3ra persona no titular\nDescripcion: Cuñado del titular Roberto Sánchez intenta usar el servicio.\nNombre_llamante__c: José Luis\nApellido_paterno_llamante__c: Herrera\n```\n\n**Acción:** `LogInteraction` → transcript persistido\n\n> 🤖 **Agente:** Que tenga buena tarde, señor Herrera.\n\n### Post-llamada\n\nEl caso queda **cerrado como Improcedente**. Se cuenta en la telemetría de deflection sin necesidad de intervención humana. **CSAT no se envía** para llamadas Improcedente *(regla de Telasist)*.\n\n---\n\n## Escenario 3 · Robo del vehículo *(escalamiento inmediato a humano)*\n\n**Perfil del cliente:** Alfredo Ríos · Titular · Llamada visiblemente alterado tras robo con violencia de su vehículo.\n\n**Objetivo:** capturar solo datos mínimos y **escalar al asesor humano** — situación emocional y con implicación de autoridades.\n\n### Turn-by-turn\n\n> 🤖 **Agente:** Buenas noches. Soy el asistente de asistencias Águila. Le habló al número de **Alfredo Ríos**. ¿Es correcto?\n>\n> 👤 **Cliente:** *(voz agitada)* Sí, sí, necesito ayuda urgente.\n\n**Acción:** `IdentifyCaller` ✅ + **`DetectSentiment` = Distress (score > 0.85)**\n\n> 🤖 **Agente:** Aquí estoy, Alfredo. Tranquilo. Cuénteme brevemente qué pasó.\n>\n> 👤 **Cliente:** Me acaban de asaltar, me robaron el carro con pistola. Estoy afuera de mi casa, estoy bien pero muy asustado.\n\n**Acción:** `Motivo__c` = Robo · `Submotivo_de_cancelacion__c` clasificable pero *no cancelar* — es caso real. Detección de **palabras clave: 'pistola', 'asaltar', 'robaron'** → política interna: **escalamiento inmediato**.\n\n> 🤖 **Agente:** Lamento mucho lo que le pasó, Alfredo. Voy a comunicarle en este momento con un asesor humano especializado para que le acompañe en lo siguiente. Antes de transferir, ¿ya llamó al 911 o a las autoridades?\n>\n> 👤 **Cliente:** No todavía.\n>\n> 🤖 **Agente:** Le recomiendo marcar al **911** en cuanto colguemos con el asesor. Mientras tanto, quédese en un lugar seguro. Voy a pasarle a un asesor ahora mismo. No cuelgue.\n\n**Acción:** `CreateCase` — mínimo indispensable\n\n```yaml\nRecordType: Caso general\nOrigin: Teléfono\nStatus: Nuevo\nSubestatus__c: Modo Espera Escalación\nCliente_Corporativo__c: a017z00001ckidyAAA\nCampana__c: a007z00000veicbAAA\nSubject: URGENTE · Robo de vehículo con violencia\nMotivo__c: Robo\nPriority: Alta\nContactId: (matched)\nDescripcion: Cliente reporta robo con violencia (arma de fuego) del vehículo\n              afuera de su domicilio. Estado emocional: alterado.\nNombre_llamante__c: Alfredo\nSolicitantes_es_el_mismo_que_quien_llama__c: true\n```\n\n**Acción:** `EscalateToHuman` → invoca `Agentforce_Voice_Escalate_to_Queue`\n- Queue: `Cola_Emergencias_Voz` *(a definir · queue de escalamiento con SLA <30s)*\n- Contexto pasado al humano: transcript completo + Case Id + flag `Alerta_Emocional`\n\n**Acción:** `LogInteraction`\n\n### Post-llamada\n\nEl asesor humano recibe la llamada **con la ficha del Case ya prellenada**. No hay recaptura ni delay de identificación. El caso continúa manualmente con `Subestatus__c=Contacto` y el humano decide las siguientes acciones *(coordinación con proveedor legal, seguimiento con autoridades, etc.)*.\n\n> 🎯 **Métrica clave:** deflection **NO** cuenta contra el bot — este escenario es una **transferencia diseñada** *(desired handoff)*, no una falla. El KPI real es *AHT reducido para el asesor humano* gracias a que el Case ya trae contexto.\n\n---\n\n## Escenario 4 · Solicita información sobre cobertura *(pregunta simple sin creación de Case)*\n\n**Perfil del cliente:** Verónica Molina · Titular · Quiere saber si su póliza cubre cambio de llanta con neumático de refacción propio.\n\n**Objetivo:** responder con conocimiento (Knowledge / retriever) sin crear Case innecesario.\n\n### Turn-by-turn\n\n> 🤖 **Agente:** Hola, buenos días. Soy el asistente de asistencias Águila. ¿Hablo con **Verónica Molina**?\n>\n> 👤 **Cliente:** Sí, buenos días. Nada más una pregunta rápida: ¿mi póliza cubre el cambio de llanta si yo ya tengo la llanta de refacción en el carro?\n\n**Acción:** `IdentifyCaller` ✅\n\n**Acción:** `LookupCoverage`\n- `Plan__c` = `Plan Vial Estándar Águila`\n- `Cobertura__c` incluye `Cambio de neumático (con refacción propia del titular)` — válido hasta 3 eventos/año\n\n**Acción:** `SearchKnowledge` — consulta Salesforce Knowledge KB *(Data Category `Cliente=Águila` + `Tipo=Vial`)* con query: *\"cambio de llanta con refacción propia cobertura\"*\n\n> 🎯 KB Article encontrado: `KB-A0142 · Cobertura de cambio de neumático` · Última actualización: 2026-05-12\n\n> 🤖 **Agente:** Buena pregunta, Verónica. Sí, su plan **Vial Estándar Águila** cubre el cambio de neumático **siempre y cuando usted tenga su llanta de refacción disponible en el vehículo**. Se puede usar hasta 3 veces al año, y aún tiene 3 eventos disponibles este año.\n>\n> 👤 **Cliente:** Excelente. Y si mi llanta de refacción también está ponchada, ¿me llevan al vulcanizador?\n>\n> 🤖 **Agente:** En ese caso ya no aplica cambio de neumático, sino asistencia por descompostura del vehículo, que puede incluir grúa al vulcanizador más cercano según cobertura de kilometraje. ¿Actualmente tiene esa situación o es solo consulta?\n>\n> 👤 **Cliente:** No, es solo para saber. Todo bien por ahora.\n>\n> 🤖 **Agente:** Perfecto, Verónica. Cualquier duda estamos aquí 24/7. Que tenga excelente día.\n\n**Acción:** `LogInteraction` — persistir consulta como `Interaccion__c` *(sin crear Case formal)* con:\n\n```yaml\nTipo: Consulta informativa\nCampana__c: Desborde El Aguila\nKBArticleId: KB-A0142\nResuelta: true\nEscalamientoRequerido: false\n```\n\n### Post-llamada\n\n**No se crea Case.** Se registra la interacción para telemetría de deflection informativa. **CSAT se envía** por SMS para medir satisfacción de consulta resuelta.\n\n> ⚠️ **Decisión de diseño:** el prompt del topic Águila debe distinguir explícitamente **consulta informativa** *(no Case)* vs. **solicitud de servicio** *(Case obligatorio)*. Si el bot crea Cases por cada consulta, se contamina la telemetría operativa.\n\n---\n\n## Escenario 5 · Póliza vencida *(intento de servicio con contrato inactivo)*\n\n**Perfil del cliente:** Ricardo Beltrán · Ex-titular · Su póliza venció hace 45 días y no ha renovado. Solicita grúa.\n\n**Objetivo:** identificar póliza vencida, ofrecer opción de renovación / servicio a costo, y cerrar el caso con submotivo correcto sin desperdiciar recurso humano.\n\n### Turn-by-turn\n\n> 🤖 **Agente:** Buenas tardes. Soy el asistente de asistencias Águila. Le habló al número registrado a nombre de **Ricardo Beltrán**. ¿Es usted?\n>\n> 👤 **Cliente:** Sí, soy yo. Necesito una grúa, se me quedó el coche en Insurgentes.\n\n**Acción:** `IdentifyCaller` ✅\n\n**Acción:** `LookupCoverage` + `ValidatePolicy`\n- `Cliente_Corporativo__c` = `Desborde Él Águila` ✅\n- `Numero_de_Poliza__c` = `AGL-2024-8871` — **VENCIDA el 2026-05-18** ❌\n- Estado póliza: `Inactiva por falta de renovación`\n\n> 🤖 **Agente:** Ricardo, un momento por favor. Veo que su póliza **AGL-2024-8871 venció el 18 de mayo de este año**, hace 45 días. Actualmente no está activa la cobertura de asistencia vial.\n>\n> 👤 **Cliente:** ¿Cómo? Pero yo pago cada año, siempre.\n>\n> 🤖 **Agente:** Le entiendo. Es posible que el pago de renovación no se haya aplicado correctamente. Le puedo ofrecer dos opciones:\n>\n> 1. **Renovar su póliza en este momento** con nuestro equipo de retención, quienes pueden reactivar la cobertura si el pago está pendiente por un tema administrativo.\n> 2. **Tomar el servicio de grúa a costo del cliente**, con la tarifa preferencial de ex-titular *($850 MXN hasta 30 km)*.\n>\n> ¿Cuál prefiere?\n>\n> 👤 **Cliente:** Mejor páseme con retención, quiero verificar el pago.\n\n**Acción:** `CreateCase`\n\n```yaml\nRecordType: Caso general\nOrigin: Teléfono\nStatus: Cancelado\nSubestatus__c: Improcedente\nMotivo_de_Cancelacion__c: Improcedente\nSubmotivo_de_cancelacion__c: Póliza vencida\nCliente_Corporativo__c: a017z00001ckidyAAA\nCampana__c: a007z00000veicbAAA\nNumero_de_Poliza__c: AGL-2024-8871\nSubject: Póliza vencida · Cliente derivado a Retención\nDescripcion: Cliente solicita grúa con póliza vencida hace 45 días.\n              Acepta transferencia a Retención para intentar renovación.\nMotivo__c: Descompostura\n```\n\n**Acción:** `EscalateToHuman` → queue `Cola_Retencion_Aguila`\n- Contexto pasado: Case Id + política vencida + `Intent=RenovacionPotencial` + monto renovación *($4,200 anual)*\n\n> 🤖 **Agente:** Perfecto, Ricardo. Le paso con retención en este momento. No cuelgue por favor.\n\n**Acción:** `LogInteraction`\n\n### Post-llamada\n\n**Doble ganancia:** el caso queda **cerrado como Improcedente** *(no se despachó grúa)* pero **generó una oportunidad de renovación calificada** con contexto preparado para el equipo de retención. Si Retención renueva la póliza, el caso puede reabrirse *(via ParentId)* como un servicio válido bajo el nuevo periodo de cobertura.\n\n> 🎯 **KPI de negocio adicional:** este escenario alimenta un **funnel de retención automatizado** — el CEO de Telasist puede reportar al Board métricas de \"renovaciones recuperadas por Agentforce Voice\" además de deflection puro.\n\n---\n\n## Matriz de acciones del agente · vista consolidada\n\n| Escenario | IdentifyCaller | LookupCoverage | ValidatePolicy | CaptureLocation | CreateCase | Case Status resultante | Escalate | SendEmail |\n|---|:-:|:-:|:-:|:-:|:-:|---|:-:|:-:|\n| **1 · Falla mecánica** | ✅ | ✅ | ✅ | ✅ | ✅ | `Toma de datos` / `Envío a Asignación` | — | ✅ |\n| **2 · No titular** | ⚠️ mismatch | ⚠️ 0 matches | — | — | ✅ | `Cancelado` / `Improcedente` | — | — |\n| **3 · Robo violencia** | ✅ | ✅ | ✅ | — | ✅ (mín.) | `Nuevo` / `Modo Espera Escalación` | ✅ | — |\n| **4 · Consulta cobertura** | ✅ | ✅ | ✅ | — | ❌ *(sin Case)* | — | — | — |\n| **5 · Póliza vencida** | ✅ | ✅ | ❌ vencida | — | ✅ | `Cancelado` / `Improcedente` (Póliza vencida) | ✅ retención | — |\n\n## Cobertura de casos de negocio\n\n| Objetivo del piloto UC1 | Escenario que lo demuestra |\n|---|---|\n| **Deflection puro** *(bot resuelve sin humano)* | 1, 2, 4 |\n| **Handoff diseñado a humano** *(no falla, es feature)* | 3, 5 |\n| **Captura de datos completa para Asignación** | 1 |\n| **Cancelación correcta con telemetría preservada** | 2, 5 |\n| **Detección de escalamiento emocional** | 3 |\n| **Conocimiento contextual sin crear Case innecesario** | 4 |\n| **Generación de valor comercial adicional** *(renovación)* | 5 |\n\n> 🎯 **Los 5 scripts cubren el 90% de los patrones esperados** en la Campaña El Águila. Los sub-casos edge *(cliente extranjero, discapacidad auditiva, menor de edad, etc.)* se documentan como excepciones en el cuestionario UC1.",
      },
      {
        id: "proximos-pasos",
        label: "Próximos pasos",
        title: "Próximos pasos accionables — semana del 6 al 13 de julio 2026",
        content:
          "> ⚡ **Semana del 6 al 13 de julio 2026** — acciones inmediatas para arrancar el POC end-of-month.\n\n## Acciones inmediatas · equipo Salesforce *(esta semana)*\n\n- [ ] **Territory AE** — Enviar respuesta same-day al email de Jose Luis Hidalgo *(jose.hidalgo@telasist.com)* con timeline claro de arranque end-of-month\n- [ ] **Deal Desk** — Escalar CPQ rule #12VY con override formal *(gate técnico #1)*\n- [ ] **SE Lead + Distinguished SE** — Confirmar variante BYOT del Voice SKU con Product Marketing\n- [ ] **Cloud AE** — Redactar cotización preliminar del Voice add-on: **$75 × 350 seats × 12 meses = $315,000/año**\n\n## Acciones con Telasist *(esta semana)*\n\n- [ ] Envío del **cuestionario UC1** *(57 preguntas + 6 bloqueadores)* a Telasist para respuesta en **5 días hábiles**\n- [ ] Confirmación del sandbox destino del POC *(dedicado o full-copy)*\n- [ ] Confirmación de la marca legal de \"El Águila\" *(bloqueador ético/comercial de arranque)*\n- [ ] Asignación de owner editorial de KB por parte de Telasist\n\n## Prerequisites técnicos *(semana siguiente)*\n\n- [ ] Provisión del **US Long Code** *(asumiendo override CPQ resuelto)*\n- [ ] Setup de Partner Voice Forwarding en Salesforce *(Contact Center + números)*\n- [ ] Configuración de Amazon Connect contact flow para overflow Águila\n- [ ] Creación de Record Type \"Águila – Overflow\" + campos custom en Case\n- [ ] Diseño del **Data Category tree** para Salesforce Knowledge *(`Cliente = Águila`, `Tipo = Vial/Hogar/Médica/Otro`)*\n\n## Gobierno del POC · cadencia recomendada\n\n| Ritual | Frecuencia | Duración | Participantes |\n|---|---|---|---|\n| **Weekly standup Telasist × Salesforce** | Lunes | 30 min | Equipo técnico ambos lados |\n| **Bi-weekly steering committee** | Jueves alternos | 60 min | CEO Telasist · CTO Telasist · Territory AE · RSD Salesforce |\n| **Slack channel dedicado** | Diario | — | `#telasist-agentforce-voice-poc` |\n| **Dashboard de métricas** | Live *(Tableau Next)* | — | Visible para stakeholders desde el día 1 del soft-launch |\n\n## Milestones críticos\n\n| Milestone | Owner | Target |\n|---|---|---|\n| CPQ #12VY override resuelto | Deal Desk | **8 jul 2026** |\n| SKU Voice cotizado y firmado | Cloud AE + Telasist CFO | 15 jul 2026 |\n| Cuestionario UC1 completo respondido | Telasist Ops | 15 jul 2026 |\n| Sandbox listo con Record Type + KB inicial | SE Lead | 22 jul 2026 |\n| US Long Code provisionado | Telecom Ops SF | 22 jul 2026 |\n| Águila Concierge build v1 en sandbox | Distinguished SE + Partner | 29 jul 2026 |\n| Testing interno con Telasist | SE Team + Telasist QA | 5 ago 2026 |\n| **Soft-launch UC1 *(10–20% overflow)*** | Territory AE + Telasist Ops | **12 ago 2026** |\n| Success gate UC1 evaluado | Steering Committee | 26 ago 2026 |\n| **Go/No-Go Fase 2 (UC2 + UC3)** | Board Telasist | **2 sep 2026** |\n\n## Métrica de éxito del POC · nivel comité\n\n> 🎯 **Al 30 de septiembre de 2026**, UC1 debe demostrar:\n>\n> - **≥85% de deflection**\n> - **CSAT ≥4.0**\n> - **Costo por llamada 60% menor** que baseline humano\n\nCon esas cifras, Telasist tiene el business case para:\n\n1. **Desbloquear el presupuesto** de Fase 2\n2. **Descartar Amazon Bedrock y Eleven Labs** como alternativas activas\n3. **Formalizar Agentforce Voice** como plataforma corporativa de Voice AI de Telasist a 3 años",
      },
    ],
  },
  {
    slug: "corona",
    title: "Corona Service Agent — Agentforce sobre WhatsApp para atención al cliente",
    customerName: "Corona",
    industry: "Materiales de construcción · Colombia",
    description:
      "Documentación técnica y ejecutiva del agente Agentforce 'Corona Service Agent' (0XxhQ00000007vxSAA) que atiende conversaciones de servicio al cliente por WhatsApp. Integración custom con Meta Cloud API vía webhook Apex, orquestación de sesión mediante Platform Events y ruteo hacia la Agent Runtime API. Cubre identificación del contacto por correo + código SAP, gestión de casos con catálogo de tipos, y respuesta a preguntas frecuentes vía Salesforce Knowledge.",
    logo: "/Customers/Corona/corona-logo.jpg",
    passcode: "corona2026",
    hidden: false,
    tags: [
      "Agentforce",
      "WhatsApp Business",
      "Service Cloud",
      "Salesforce Knowledge",
      "Platform Events",
      "OAuth Client Credentials",
      "Materiales · LATAM",
    ],
    tabs: [
      {
        id: "overview",
        label: "Presentación ejecutiva",
        title: "Corona Service Agent — Presentación ejecutiva",
        content:
          "> 🎯 **Corona Service Agent** es el agente Agentforce que atiende conversaciones de WhatsApp de los clientes de Corona 24/7, identifica al contacto, resuelve dudas contra la base de conocimiento y genera casos de servicio directamente en Salesforce sin intervención humana en la primera línea.\n\n## En una frase\n\nUn agente conversacional de Salesforce Agentforce, expuesto por WhatsApp Business API, que **reemplaza el primer nivel de atención** en el canal de mensajería y **arma el caso en Salesforce con los datos correctos** antes de escalar a un asesor humano.\n\n## Cómo entra el cliente\n\nEscaneando el código QR de la sesión — o marcando directamente `wa.me/5511917111888` — el cliente inicia una conversación de WhatsApp. Todo el resto sucede en segundo plano: webhook Apex → Platform Event → Queueable → Agent Runtime API.\n\n![QR — Escanea para conversar con el agente](/Customers/Corona/corona-whatsapp-qr.png)\n\n> 📱 **wa.me/5511917111888** — abre WhatsApp con la conversación al agente ya iniciada.\n\n## Qué debe demostrar esta documentación\n\n1. **Que el agente existe, está publicado y es identificable** — `BotDefinition Id 0XxhQ00000007vxSAA`, DeveloperName `COR_afServiceAgent`, versión activa `v3`.\n2. **Qué sabe hacer** — 6 acciones invocables (topics de identificación, catálogo de casos, creación de caso, creación de contacto, cuenta relacionada, FAQ con Knowledge) + 4 prompt templates.\n3. **Cómo se conecta con WhatsApp** — arquitectura Apex custom con `WhatsApp_Configuration__c` como registro de configuración, `WA-CONFIG-0000` apuntando al agente.\n4. **Un script de conversación real** que muestra qué respondería el agente en cada uno de los caminos configurados.",
        overviewData: {
          stats: [
            { value: "1", label: "Agente activo — Corona Service Agent v3" },
            { value: "6", label: "Acciones (GenAiFunctions) invocables" },
            { value: "4", label: "Prompt Templates de conocimiento" },
            { value: "1", label: "Configuración WhatsApp activa (WA-CONFIG-0000)" },
            { value: "24/7", label: "Ventana de atención" },
            { value: "ES", label: "Idioma principal de conversación" },
          ],
        },
      },
      {
        id: "question-bank",
        label: "Banco de preguntas",
        title: "Banco de preguntas para probar con el agente",
        content:
          "> 🧪 **Copia una pregunta con un clic** y pégala directamente en la conversación de WhatsApp con el agente. Cada tarjeta trae una pregunta lista para usar durante una demo o una prueba operativa.",
        questionBankData: {
          intro:
            "Preguntas frecuentes cargadas en la base de conocimiento del Centro de Experiencia B2B. Úsalas como golden set para validar que el agente responde correctamente en cada tema.",
          note:
            "En el tema Horarios de atención el agente debe primero preguntar de qué canal (Almacenes Corona, Puntos de venta, Distribuidores o Persona natural) antes de responder — es una regla operativa no negociable.",
          items: [
            { category: "Horarios de atención", question: "¿Cuál es su horario de atención?" },
            { category: "Horarios de atención", question: "¿Cuál es el horario de atención del centro de experiencia B2B si soy distribuidor o de alguno de los canales comerciales constructor, mayorista o detallista?" },
            { category: "Horarios de atención", question: "¿Puedo hacer una solicitud 24 horas al día al centro de experiencia B2B si soy distribuidor o de alguno de los canales comerciales constructor, mayorista o detallista?" },
            { category: "Horarios de atención", question: "¿Cuál es el horario de atención de Almacenes Corona?" },
            { category: "Horarios de atención", question: "¿Cuál es el horario de atención de la línea de atención de Corona para usuario final o cliente final?" },

            { category: "Cómo montar un caso siendo B2B", question: "¿Qué canales tienen disponibles para contactarme con el centro de experiencia B2B?" },
            { category: "Cómo montar un caso siendo B2B", question: "¿Cómo puedo montar un caso si soy distribuidor?" },

            { category: "Servicio técnico y garantías", question: "¿Cómo se solicita un servicio técnico?" },
            { category: "Servicio técnico y garantías", question: "¿A través de esta línea puedo montar un servicio técnico?" },
            { category: "Servicio técnico y garantías", question: "¿Cómo puedo pedir una garantía?" },
            { category: "Servicio técnico y garantías", question: "Si mi producto no está instalado, ¿es una garantía?" },

            { category: "Uno a Uno — pedidos y accesos", question: "¿Cómo debo montar un pedido en el Uno a Uno?" },
            { category: "Uno a Uno — pedidos y accesos", question: "Necesito recuperar o crear mi usuario y contraseña en el Uno a Uno." },
            { category: "Uno a Uno — pedidos y accesos", question: "¿Cómo puedo escalar una novedad logística o de producto si no me funciona el Uno a Uno?" },
            { category: "Uno a Uno — pedidos y accesos", question: "¿Cómo solucionar problemas con el Uno a Uno para montar novedades?" },

            { category: "Logística", question: "¿Qué tamaños son las estibas que maneja Corona?" },

            { category: "Documentos legales", question: "Requiero RUT y Cámara de Comercio para crear como proveedor." },
          ],
        },
      },
      {
        id: "quick-facts",
        label: "Ficha del agente",
        title: "Ficha técnica del Corona Service Agent",
        content:
          "Datos identificadores del agente tal como están hoy en el sandbox — extraídos directamente de la metadata (`Bot`, `BotVersion`, `GenAiPlanner`, `GenAiFunction`).\n\n| Atributo | Valor |\n|---|---|\n| **Master Label** | Corona Service Agent |\n| **Developer Name** | `COR_afServiceAgent` |\n| **Bot Definition ID** | `0XxhQ00000007vxSAA` |\n| **Tipo de agente** | `EinsteinServiceAgent` (ExternalCopilot) |\n| **Versión activa** | `v3` |\n| **Planner** | `COR_afServiceAgent_v3` — `Atlas__ConcurrentMultiAgentOrchestration` |\n| **Descripción** | Agente de servicio al cliente de Corona: gestión de casos, preguntas frecuentes y escalación a agente humano |\n| **Bot user** | `cor_afagentforceserviceagent@00dd6000000sp8c1148262255.ext` |\n| **DSL habilitado** | ✅ `agentDSLEnabled=true` |\n| **Rich content** | ✅ `richContentEnabled=true` |\n| **Log de datos privados** | ❌ desactivado (`logPrivateConversationData=false`) |\n| **Canales soportados (context variables)** | WhatsApp · Text · Email · EmbeddedMessaging · Facebook · Line · AppleBusinessChat · Custom |\n| **Contexto principal** | `MessagingSession.Id` mapeado a `routableId` |\n\n## Cómo llegar al agente\n\n- **Canal de producción del piloto** — WhatsApp `+55 11 91711-1888` — enlace directo: [`wa.me/5511917111888`](http://wa.me/5511917111888)\n- **Config record** — `WhatsApp_Configuration__c` · Name `WA-CONFIG-0000` · Id `a7shQ0000000rVlQAI`\n- **Sandbox** — `00DD6000000SP8CMAW` (alias `corona-sandbox`)",
      },
      {
        id: "architecture",
        label: "Arquitectura",
        title: "Cómo llega un mensaje de WhatsApp al agente",
        content:
          "> 🏗️ **La integración con WhatsApp no es nativa de Salesforce Messaging**. Corona construyó un puente Apex a la Meta Cloud API, que publica Platform Events y termina invocando la Agent Runtime API con el mismo agente `0XxhQ00000007vxSAA`.\n\n## Cadena de llamado (webhook → agente)\n\n```\nCliente WhatsApp\n   │\n   ▼\nMeta Cloud API (graph.facebook.com)\n   │  POST\n   ▼\nApex REST · /services/apexrest/whatsapp/webhook/{configId}\n   │  WhatsAppWebhookHandler.handleIncomingMessage()\n   │  · Valida firma HMAC (opcional)\n   │  · Parsea payload con WhatsAppWebhookParser\n   │  · EventBus.publish(WhatsApp_Inbound_Event__e)\n   ▼\nPlatform Event · WhatsApp_Inbound_Event__e\n   │  WhatsAppInboundEventTrigger (after insert)\n   ▼\nWhatsAppInboundEventHandler.processEvent()\n   │  · findOrCreateConversation() → WhatsApp_Conversation__c\n   │  · createInboundMessage()      → WhatsApp_Message__c\n   │  · System.enqueueJob(new WhatsAppAgentforceQueueable(...))\n   ▼\nWhatsAppAgentforceQueueable → WhatsAppAgentforceService.processMessage()\n   │  · WhatsAppAuthService.getAgentforceAccessToken()  (Client Credentials OAuth)\n   │  · createAgentSession()  POST /einstein/ai-agent/v1/agents/{agentId}/sessions\n   │  · sendMessage()         POST /einstein/ai-agent/v1/sessions/{sessionId}/messages\n   ▼\nAgent Runtime API (api.salesforce.com)\n   │  Ejecuta topics + GenAiFunctions del planner v3\n   ▼\nRespuesta del agente\n   │  parseAgentResponse() → WhatsAppAPIService.sendTextMessage()\n   ▼\nMeta Cloud API → Cliente WhatsApp\n```\n\n## Registros clave que crea la conversación\n\n| Registro | Propósito |\n|---|---|\n| `WhatsApp_Configuration__c` | Configuración de la línea (Business Account ID, Phone Number ID, Agent ID, credenciales del Connected App) |\n| `WhatsApp_Inbound_Event__e` | Platform Event de entrada — un event por mensaje entrante |\n| `WhatsApp_Conversation__c` | Conversación por cliente + línea. Guarda `Agentforce_Session_Id__c` y `Agentforce_Agent_Id__c` |\n| `WhatsApp_Message__c` | Cada mensaje individual (`Direction__c` in `Inbound`/`Outbound`, `Is_From_Agentforce__c`) |\n| `WhatsApp_Log__c` | Trazabilidad operativa — código, método fuente, HTTP status, payload |\n\n## Componentes Apex principales\n\n| Clase / Trigger | Rol |\n|---|---|\n| `WhatsAppWebhookHandler` | Endpoint REST público; valida HMAC y publica el Platform Event |\n| `WhatsAppWebhookParser` | Parsea payloads Meta (text, media, interactive, location, reaction) |\n| `WhatsAppInboundEventTrigger` | Trigger sobre el Platform Event; delega al handler |\n| `WhatsAppInboundEventHandler` | Encola el Queueable de Agentforce por cada mensaje |\n| `WhatsAppAgentforceQueueable` | Contexto async con callouts habilitados |\n| `WhatsAppAgentforceService` | Crea sesión con el agente, envía mensaje, procesa respuesta |\n| `WhatsAppAuthService` | Obtiene el token OAuth (Client Credentials) para llamar a la Agent API |\n| `WhatsAppConfigService` | Cache transaccional de la configuración |\n| `WhatsAppAPIService` | Envía respuestas del agente al cliente por Meta Cloud API |",
      },
      {
        id: "actions",
        label: "Acciones del agente",
        title: "Qué puede hacer el agente — Topics y GenAiFunctions",
        content:
          "> 🧩 El planner del agente (`COR_afServiceAgent_v3`, tipo `Atlas__ConcurrentMultiAgentOrchestration`) enruta la conversación hacia una de las siguientes **acciones (GenAiFunctions)** o **prompt templates (GenAiPromptTemplate)** — cada una tiene su input schema estricto que el LLM debe rellenar antes de invocar.\n\n## Acciones (GenAiFunction) — flows y prompt-response invocables\n\n### 1 · Identifica al contacto por correo electrónico + código SAP\n\n- **Nombre técnico:** `COR_afIdentifyTheContactByEmailv2` *(hay una v1 legacy también publicada)*\n- **Tipo:** `flow`\n- **Propósito:** Localizar al contacto en Salesforce cruzando dos identificadores.\n- **Inputs requeridos:**\n  - `email` — el correo que teclea el cliente en la conversación\n  - `codigoSAP` — el código de cliente que teclea el cliente\n  - `processingPersonalData` — aceptación explícita del tratamiento de datos personales (`Sí` / `No`)\n- **Cuándo se dispara:** primer turno útil, antes de resolver cualquier caso o consulta personalizada.\n\n### 2 · Obtiene la cuenta relacionada al contacto\n\n- **Nombre técnico:** `COR_afgetRelatedAccountv2` *(invocationTarget: flow `COR_afgetRelatedAccount`)*\n- **Tipo:** `flow`\n- **Propósito:** Devolver la cuenta (Account) asociada al contacto identificado, para poder amarrar Casos y consultas al Account correcto.\n\n### 3 · Obtiene el catálogo de tipos de caso\n\n- **Nombre técnico:** `COR_afGetCatalogOfCaseTypes`\n- **Tipo:** `flow`\n- **Propósito:** Presentar al cliente la lista de tipos de caso disponibles (`COR_afCaseType__c`) — el agente puede leerla y ofrecer al cliente elegir uno.\n\n### 4 · Crea un caso de servicio\n\n- **Nombre técnico:** `COR_afCreateCase`\n- **Tipo:** `flow`\n- **Propósito:** Insertar el `Case` con toda la información capturada por el agente.\n- **Inputs requeridos:**\n  - `caseDescription` — narrativa del problema tal como el cliente lo describió\n  - `caseType` — record del catálogo `COR_afCaseType__c`\n  - `contactId` — id del contacto identificado en el paso 1\n  - `recordAccount` — Account resuelta en el paso 2\n  - `recordId` — id de la sesión de mensajería (context variable)\n\n### 5 · Crea un contacto nuevo\n\n- **Nombre técnico:** `COR_afCreateContact`\n- **Tipo:** `flow`\n- **Propósito:** Si el cliente no está registrado, crear el Contact con nombre, apellidos, teléfono y correo.\n- **Inputs requeridos:** `firstName` · `lastName` · `email` · `phone` · `accoundId` *(sic — así se llama la variable en el flow)*.\n\n### 6 · Responde preguntas con la base de conocimiento (Agentforce)\n\n- **Nombre técnico:** `COR_afAnswerQuestionsWithKnowledge_orAgentforce`\n- **Tipo:** `generatePromptResponse` (invoca `COR_afAnswerQuestionsWithKnowledgeForAgentforce`)\n- **Propósito:** Grounding sobre Salesforce Knowledge para responder consultas informativas sin crear Case.\n\n### Bonus · FAQ genéricos (versión legacy)\n\n- **Nombre técnico:** `COR_afFrequentlyAskedQuestionAsndAnswers`\n- **Tipo:** `generatePromptResponse` (invoca `COR_afFrequentlyAskedQuestionAsndAnswers`)\n- **Propósito:** Camino alternativo de FAQ que sigue publicado. En un ciclo de limpieza convendría consolidar con la #6.\n\n## Prompt Templates asociadas\n\n| Template | Uso |\n|---|---|\n| `COR_afAnswerQuestionsWithKnowledgeForAgentforce` | Prompt principal de respuesta con KB grounding |\n| `COR_afFrequentlyAskedQuestionAsndAnswers` | FAQ conversacional |\n| `COR_afGetCaseType` | Determinación del tipo de caso a partir del texto libre del cliente |\n| `COR_afGenerateSubject` | Genera el `Subject` del Case a partir de la descripción |\n\n## Comportamiento por defecto (fallback)\n\nSi la Agent Runtime API no responde o el token OAuth no está disponible, el servicio Apex devuelve mensajes hardcodeados de cortesía (saludo, ayuda, agradecimiento, despedida). Ese path **NO es el agente** — es el `getFallbackResponse` local. La documentación completa del diagnóstico está en el proyecto de sandbox (`DIAGNOSTICO_AGENTFORCE_WHATSAPP.md`).",
      },
      {
        id: "script",
        label: "Script de conversación",
        title: "Script de lo que puede responder el agente hoy",
        content:
          "> 💬 **Script turn-by-turn** de las 4 rutas conversacionales que el planner v3 sabe atender con la configuración actual. Cada acción indica el **nombre técnico exacto** de la GenAiFunction que se ejecutaría.\n\n> **Convención:**\n>\n> - 👤 **Cliente** — lo que el cliente escribe por WhatsApp\n> - 🤖 **Agente** — lo que responde el agente por WhatsApp\n> - `▸ Acción` — la GenAiFunction invocada (nombre técnico del bot)\n\n---\n\n## Ruta 1 · Identificación + creación de caso *(happy path)*\n\n**Objetivo:** el cliente reporta un problema, el agente lo identifica, arma el caso y lo cierra con número de referencia.\n\n> 🤖 **Agente:** ¡Hola! Bienvenido a Corona. Soy el agente virtual de atención al cliente. Para poder ayudarte, ¿me podrías compartir tu correo electrónico registrado y tu código de cliente SAP?\n>\n> 👤 **Cliente:** Claro: `carlos.mendez@example.com`, código `SAP-018742`.\n>\n> 🤖 **Agente:** Perfecto. Antes de continuar, necesito tu autorización para consultar y procesar tus datos personales conforme a nuestra política de privacidad. ¿Aceptas? (Sí / No)\n>\n> 👤 **Cliente:** Sí.\n\n`▸ Acción: COR_afIdentifyTheContactByEmailv2`\n- Inputs: `email = carlos.mendez@example.com`, `codigoSAP = SAP-018742`, `processingPersonalData = Sí`\n- Output: `contactId = 003xx000...`\n\n`▸ Acción: COR_afgetRelatedAccountv2` → `Account = 001xx000...` (constructora asociada)\n\n> 🤖 **Agente:** Gracias, Carlos. Ya te identifiqué. Cuéntame en qué te podemos ayudar hoy.\n>\n> 👤 **Cliente:** Necesito reportar que un lote de porcelanato que recibí el lunes vino con piezas rotas.\n\n`▸ Acción: COR_afGetCatalogOfCaseTypes` — el agente enumera internamente los tipos de caso disponibles y selecciona el que aplica.\n\n`▸ Prompt Template: COR_afGetCaseType` — determina `caseType = Reclamo por producto dañado en tránsito` a partir del texto libre.\n\n`▸ Prompt Template: COR_afGenerateSubject` — genera `Subject = Piezas rotas en lote de porcelanato recibido 2026-07-13`.\n\n> 🤖 **Agente:** Entiendo, Carlos. Voy a levantar un caso de reclamación por producto dañado en tránsito. ¿Me confirmas la cantidad aproximada de piezas afectadas y el número de guía o factura?\n>\n> 👤 **Cliente:** Son unas 12 piezas dañadas de la caja 8. La factura es FE-2026-33421.\n\n`▸ Acción: COR_afCreateCase`\n- Inputs: `contactId`, `recordAccount`, `caseType`, `caseDescription = 12 piezas de porcelanato dañadas en tránsito · Caja 8 · Factura FE-2026-33421`, `recordId = <MessagingSession.Id>`\n- Output: Case creado con `CaseNumber = 00034521`\n\n> 🤖 **Agente:** Listo, Carlos. Registré el caso **00034521**. Nuestro equipo de servicio postventa se pondrá en contacto en las próximas 24 horas hábiles. Te enviaremos las actualizaciones por este mismo WhatsApp. ¿Hay algo más en lo que pueda ayudarte?\n>\n> 👤 **Cliente:** No, gracias.\n>\n> 🤖 **Agente:** Con gusto, Carlos. Que tengas excelente día.\n\n---\n\n## Ruta 2 · Cliente no registrado *(alta de contacto en línea)*\n\n**Objetivo:** el cliente escribe por primera vez y no está en Salesforce. El agente lo da de alta y luego encamina hacia un caso o consulta.\n\n> 👤 **Cliente:** Hola, tengo una duda sobre un producto.\n>\n> 🤖 **Agente:** ¡Hola! Bienvenido a Corona. ¿Me compartes tu correo electrónico registrado y tu código de cliente SAP?\n>\n> 👤 **Cliente:** No tengo código SAP, es la primera vez que escribo.\n>\n> 🤖 **Agente:** Sin problema. Con gusto te registro. ¿Me compartes tu nombre, apellido, correo electrónico y un teléfono de contacto?\n>\n> 👤 **Cliente:** Me llamo Ana Ruiz, correo `ana.ruiz@example.com`, teléfono +57 300 555 4433.\n>\n> 🤖 **Agente:** Perfecto, Ana. Necesito tu autorización para tratar tus datos personales conforme a nuestra política de privacidad. ¿Aceptas? (Sí / No)\n>\n> 👤 **Cliente:** Sí.\n\n`▸ Acción: COR_afCreateContact`\n- Inputs: `firstName = Ana`, `lastName = Ruiz`, `email = ana.ruiz@example.com`, `phone = +57 300 555 4433`, `accoundId = <Default Account for public leads>`\n- Output: `contactId = 003xx000...`\n\n> 🤖 **Agente:** Listo, Ana. Ya quedaste registrada. Ahora sí, cuéntame ¿en qué te puedo ayudar?\n\n*(la conversación continúa hacia Ruta 1 · caso, o Ruta 3 · consulta con KB)*\n\n---\n\n## Ruta 3 · Consulta informativa *(respondida con Knowledge, sin crear caso)*\n\n**Objetivo:** el cliente pregunta algo que ya está en la base de conocimiento — el agente responde sin generar un Case.\n\n> 👤 **Cliente:** Quiero saber qué garantía tiene el porcelanato serie Amazónica.\n\n`▸ Acción: COR_afAnswerQuestionsWithKnowledge_orAgentforce`\n- Ejecuta el prompt template `COR_afAnswerQuestionsWithKnowledgeForAgentforce` que hace grounding sobre artículos publicados de Salesforce Knowledge.\n- Devuelve la respuesta con fuente citable.\n\n> 🤖 **Agente:** El porcelanato de la serie Amazónica tiene una garantía de **10 años contra defectos de fabricación**, siempre y cuando la instalación se realice conforme al manual técnico y el mantenimiento siga las recomendaciones oficiales. Si necesitas el detalle completo o quieres registrar una reclamación específica, con gusto lo hacemos. ¿Necesitas algo más?\n>\n> 👤 **Cliente:** Perfecto, gracias.\n>\n> 🤖 **Agente:** Con gusto. Estamos aquí 24/7. ¡Hasta pronto!\n\n> ⚠️ **Diseño clave:** consultas informativas **NO** deben crear Case — se registra la interacción vía log/telemetría pero el `Case` queda para lo transaccional (reclamos, servicios, quejas formales).\n\n---\n\n## Ruta 4 · Escalamiento a humano\n\n**Objetivo:** cuando el cliente lo pide explícitamente, o cuando el agente detecta que el caso requiere intervención humana, se cede la conversación al equipo de atención.\n\n> 👤 **Cliente:** Necesito hablar con una persona, esto es urgente.\n>\n> 🤖 **Agente:** Con gusto, Carlos. Voy a transferir tu conversación a un asesor humano. Un miembro del equipo tomará el chat en los próximos minutos por este mismo WhatsApp. Mientras tanto, ¿me confirmas brevemente el tema para que llegue con el contexto listo?\n>\n> 👤 **Cliente:** Es el mismo caso 00034521, pero necesito que se resuelva hoy.\n\n> 🎯 **Handoff diseñado.** El agente marca la conversación (`Agentforce_Topic__c`) como `HANDOFF_REQUESTED` y el equipo humano toma control. **La conversación WhatsApp no se recrea** — el humano continúa en la misma sesión con todo el contexto.\n\n---\n\n## Matriz de acciones vs. rutas\n\n| Ruta | Identify | GetRelatedAccount | GetCatalog | CreateContact | CreateCase | AnswerKB | Escalate |\n|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|\n| **1 · Identificación + caso** | ✅ | ✅ | ✅ | — | ✅ | — | — |\n| **2 · Cliente nuevo** | — | — | — | ✅ | (opcional) | (opcional) | — |\n| **3 · Consulta KB** | ✅ | (opcional) | — | — | ❌ | ✅ | — |\n| **4 · Escalamiento** | ✅ | ✅ | — | — | (opcional) | — | ✅ |",
      },
      {
        id: "how-to-try",
        label: "Cómo probarlo",
        title: "Cómo probar el agente hoy",
        content:
          "> 📱 **Escanea el QR o abre el enlace directo** para iniciar una conversación con el agente en WhatsApp.\n\n![Escanea para conversar con Corona Service Agent](/Customers/Corona/corona-whatsapp-qr.png)\n\n- **Enlace directo:** [`http://wa.me/5511917111888`](http://wa.me/5511917111888)\n- **Recomendado:** guarda el contacto **Corona Service Agent · +55 11 91711-1888** en tu agenda para pruebas repetidas.\n- **Idioma sugerido:** español.\n\n## Prompts sugeridos para explorar cada ruta\n\n| Ruta a probar | Escribe algo como… |\n|---|---|\n| Identificación + caso | \"Hola, tengo un reclamo por producto dañado\" |\n| Cliente nuevo | \"Hola, es la primera vez que escribo\" |\n| Consulta con KB | \"¿Qué garantía tiene el porcelanato serie X?\" |\n| Escalamiento | \"Necesito hablar con una persona\" |\n\n## Qué esperar\n\n- **Primer turno** — El agente pide correo + código SAP + consentimiento de tratamiento de datos.\n- **Turnos siguientes** — Según lo que respondas, entra a la ruta de caso, consulta o alta de contacto.\n- **Tiempos** — Latencia típica de la Agent Runtime API: 3–8 segundos por turno.\n\n## Requisitos operativos para que la conversación funcione end-to-end\n\n- Meta Cloud API activa y suscrita al webhook de la org\n- `WhatsApp_Configuration__c · WA-CONFIG-0000 · Is_Active__c = true`\n- Connected App con OAuth Client Credentials + `SF_Client_Id__c` y `SF_Client_Secret__c` poblados en el config\n- Remote Site Setting `api.salesforce.com` activo\n- Agente `COR_afServiceAgent v3` publicado\n\n> ⚠️ Si al probar recibes un texto tipo *\"Hello! Welcome to our support. How can I help you today?\"* en inglés — **eso NO es el agente**, es el fallback local por falta de token OAuth. Ver `DIAGNOSTICO_AGENTFORCE_WHATSAPP.md` para el detalle.",
      },
      {
        id: "test-prompts",
        label: "Respuestas esperadas",
        title: "Respuestas esperadas — golden set del agente",
        content:
          "> 📋 **Golden set** de preguntas frecuentes cargadas en el Centro de Experiencia B2B de Corona. Para cada tema el agente **debe** responder con el texto de referencia — o pedir aclaración cuando el propio prompt así lo exige (caso *Horarios de atención*).\n>\n> ⚠️ **Regla operativa importante — Horarios de atención:** el agente **NO debe entregar horarios sin antes preguntar de qué canal**. Ante \"¿cuál es el horario?\" la primera respuesta esperada es una **pregunta de aclaración** con 4 opciones: Almacenes Corona · Puntos de venta · Línea de atención para distribuidores · Línea de atención para persona natural (no empresa ni canal de distribución).\n\n---\n\n## 1 · Horarios de atención\n\n### 1.0 · Pregunta abierta *(debe pedir aclaración)*\n\n> 👤 **Cliente:** ¿Cuál es su horario de atención?\n\n**Respuesta esperada del agente** *(pregunta de aclaración — NO debe dar horarios todavía)*:\n\n> 🤖 Con gusto te doy el horario, ¿qué horario necesitas?\n>\n> - Almacenes Corona\n> - Puntos de venta\n> - Línea de atención para distribuidores\n> - Línea de atención para persona natural (no empresa ni canal de distribución)\n\n### 1.1 · Centro de experiencia B2B — distribuidor / constructor / mayorista / detallista\n\n> 👤 **Cliente:** ¿Cuál es el horario de atención del centro de experiencia B2B si soy distribuidor o de alguno de los canales comerciales constructor, mayorista o detallista?\n\n**Respuesta esperada:**\n\n> 🤖 Nuestro horario de atención es de **Lunes a viernes de 7:00 am a 6:00 pm**, los **sábados** respondemos tus solicitudes de **8:00 am a 1:00 pm**. Domingos y festivos puedes enviarnos un correo a `servicioalclienteb2b@corona.com.co` o también escribir tu caso en la opción de contáctenos del uno a uno.\n>\n> Si necesitas montar una solicitud o requerimiento fuera de nuestros horarios contamos con 2 canales de atención: **contáctenos del Uno a Uno** y el **correo electrónico** `servicioalclienteb2b@corona.com.co`, donde puedes montar tus solicitudes o requerimientos en cualquier momento y te responderemos tan pronto iniciemos nuestra operación.\n\n### 1.2 · Solicitudes 24/7 al centro de experiencia B2B\n\n> 👤 **Cliente:** ¿Puedo hacer una solicitud 24 horas al día al centro de experiencia B2B si soy distribuidor o de alguno de los canales comerciales constructor, mayorista o detallista?\n\n**Respuesta esperada:**\n\n> 🤖 Contactar al centro de experiencia B2B es muy fácil, **24 horas al día** en el acceso web que tienes como cliente, el **Uno a uno**: puedes ingresar en la opción **Contáctenos**, seleccionar el tipo de requerimiento que necesitas y listo — te resolveremos dentro de nuestro horario de atención.\n>\n> También si lo deseas puedes enviarnos un correo a `servicioalclienteb2b@corona.com.co` explicando o anexando archivos sobre tu requerimiento.\n\n### 1.3 · Almacenes Corona\n\n> 👤 **Cliente:** ¿Cuál es el horario de atención de Almacenes Corona?\n\n**Respuesta esperada:**\n\n> 🤖 Nos encanta que quieras visitarnos. Según la ciudad o tienda que deseas visitar puedes consultar los horarios de atención y ubicación exacta ingresando a [https://www.centrocorona.com/tiendas-y-horarios](https://www.centrocorona.com/tiendas-y-horarios).\n\n### 1.4 · Línea de atención para usuario final / cliente final\n\n> 👤 **Cliente:** ¿Cuál es el horario de atención de la línea de atención de Corona para usuario final o cliente final?\n\n**Respuesta esperada:**\n\n> 🤖 Para usuarios finales que no son distribuidores de la marca o no hacen parte de algún canal comercial (Detallista, mayorista o constructor), Corona cuenta con una **línea de atención WhatsApp: 310 274 2006** y la **línea gratuita 01 8000 512 030**, con horario de atención **Lunes a Viernes de 7:00 am a 7:00 pm** y **Sábados de 8:00 am a 3:00 pm**. Domingos y festivos no brindamos atención.\n\n---\n\n## 2 · Cómo montar un caso siendo B2B\n\n### 2.1 · Canales disponibles del centro de experiencia B2B\n\n> 👤 **Cliente:** ¿Qué canales tienen disponibles para contactarme con el centro de experiencia B2B?\n\n**Respuesta esperada:**\n\n> 🤖 Ahora contamos con **3 canales** para recibir tus solicitudes:\n>\n> - **WhatsApp:** `320 6161199` — Lunes a viernes de 7:00 am a 6:00 pm · Sábados de 7:00 am a 1:00 pm\n> - **Plataforma Uno a Uno** — opción *Contáctenos* (24/7)\n> - **Correo** — `servicioalclienteb2b@corona.com.co` (24/7)\n\n### 2.2 · Cómo montar un caso siendo distribuidor\n\n> 👤 **Cliente:** ¿Cómo puedo montar un caso si soy distribuidor?\n\n**Respuesta esperada:**\n\n> 🤖 Contactarnos es muy fácil. Para la atención en el centro de experiencia B2B tienes **3 canales**: WhatsApp, correo y contáctenos del Uno a Uno.\n>\n> - **WhatsApp `320 6161199`** — Lunes a viernes de 7:00 am a 6:00 pm; sábados de 7:00 am a 1:00 pm.\n> - **Correo `servicioalclienteb2b@corona.com.co`** — 24/7.\n> - **Contáctenos del Uno a Uno** — 24/7.\n\n---\n\n## 3 · Servicio técnico y garantías\n\n### 3.1 · Cómo solicitar un servicio técnico\n\n> 👤 **Cliente:** ¿Cómo se solicita un servicio técnico?\n\n**Respuesta esperada:**\n\n> 🤖 Comunicarte con la línea de atención para solicitar un servicio técnico es muy fácil: escribe al **WhatsApp `310 274 2006`** o llama a la **línea gratuita `01 8000 512 030`**, donde estaremos disponibles para tomar tu solicitud.\n>\n> Te recomendamos tener a la mano datos de tu producto: **referencia, fecha y lugar de compra** — es información que seguro te podrán preguntar.\n\n### 3.2 · ¿Este canal (B2B) sirve para servicio técnico?\n\n> 👤 **Cliente:** ¿A través de esta línea puedo montar un servicio técnico?\n\n**Respuesta esperada:**\n\n> 🤖 Esta línea de atención está diseñada especialmente para atender **distribuidores**. Para solicitar un servicio técnico debes escribir al **WhatsApp `310 274 2006`** o llamar a la línea gratuita **`01 8000 512 030`**.\n>\n> Si eres distribuidor y el servicio técnico es para alguno de tus clientes, igualmente debes solicitarlo en estos números y **hacerlo a nombre del cliente o usuario final** del producto.\n\n### 3.3 · Cómo pedir una garantía\n\n> 👤 **Cliente:** ¿Cómo puedo pedir una garantía?\n\n**Respuesta esperada:**\n\n> 🤖 Para solicitar una garantía debes comunicarte a la línea **`01 8000 512 030`** o por **WhatsApp `310 274 2006`**. Allí te realizarán algunas preguntas adicionales, así que ten a la mano datos de tu producto, la **novedad que presentó** y — ojalá — el **número de factura** al que hace referencia tu novedad.\n\n### 3.4 · Producto sin instalar — ¿aplica garantía?\n\n> 👤 **Cliente:** Si mi producto no está instalado, ¿es una garantía?\n\n**Respuesta esperada:**\n\n> 🤖 Las garantías se pueden documentar cuando el producto ha sido **instalado** y presenta una novedad en su funcionamiento, ajuste u otros. Si aún **no has instalado** tu producto y tiene fisuras, daños u otros, puedes reportarlo como **novedad ante el distribuidor o almacén** donde realizaste la compra.\n\n---\n\n## 4 · Uno a Uno — pedidos, accesos y novedades\n\n### 4.1 · Cómo montar un pedido en Uno a Uno\n\n> 👤 **Cliente:** ¿Cómo debo montar un pedido en el Uno a Uno?\n\n**Respuesta esperada:**\n\n> 🤖 Ingresa a la plataforma web Uno a Uno en el enlace [https://unoauno.corona.co/login](https://unoauno.corona.co/login), digita tu usuario y contraseña. Ya en el menú principal, sigue estos pasos:\n>\n> 1. Busca los productos que deseas y añade al carrito de compras.\n> 2. Dale click al botón **Comprar ahora**.\n> 3. En el campo *Detalle de compra* diligencia número de orden de compra y observaciones.\n>\n> También te puedo recomendar un video que detalla cómo puedes realizarlo.\n\n### 4.2 · Recuperar usuario o contraseña en Uno a Uno\n\n> 👤 **Cliente:** Necesito recuperar o crear mi usuario y contraseña en el Uno a Uno.\n\n**Respuesta esperada:**\n\n> 🤖 Actualizar tu información para tener acceso al Uno a Uno es muy fácil:\n>\n> - Escribe un correo a `soporteunoauno@corona.com.co` con el **NIT de la empresa**, **nombre o razón social** y explicando el motivo de la solicitud (creación, modificación o novedades en accesos y permisos).\n> - También puedes llamar a la línea **`01 8000 512 030`** donde resolveremos tus novedades con la plataforma.\n> - O contáctate a través del **Centro de Experiencia B2B en el WhatsApp `320 6161199`** y crearemos tu caso.\n\n### 4.3 · Novedades logísticas / de producto sin poder usar Uno a Uno\n\n> 👤 **Cliente:** ¿Cómo puedo escalar una novedad logística o de producto si no me funciona el Uno a Uno?\n\n**Respuesta esperada:**\n\n> 🤖 Desde el Centro de Experiencia B2B te podemos ayudar a escalar la novedad logística si no te funciona el Uno a Uno. Te recomiendo igual seguir los pasos para solucionar tu problema con la plataforma *(ver pregunta siguiente)*.\n>\n> Para montar la novedad en el Centro de Experiencia, escribe un **WhatsApp al `320 6161199`** en la opción **Novedades en la entrega**. Ten a la mano la siguiente información para agilizar tu requerimiento:\n>\n> - Número de factura o número de pedido\n> - Referencia con novedad\n> - Cantidad afectada o que requiere atención\n>\n> Es importante que aclares el **NIT y razón social** para gestionar el caso.\n\n### 4.4 · Cómo solucionar problemas con Uno a Uno\n\n> 👤 **Cliente:** ¿Cómo solucionar problemas con el Uno a Uno para montar novedades?\n\n**Respuesta esperada:**\n\n> 🤖 Puedes contactarte a la **Línea de Atención Nacional `01 8000 512 030`** o al correo **`soporteunoauno@corona.com.co`**.\n\n---\n\n## 5 · Logística — estibas de entrega\n\n> 👤 **Cliente:** ¿Qué tamaños son las estibas que maneja Corona?\n\n**Respuesta esperada:**\n\n> 🤖 Principalmente, para todos los productos se manejan en una **estiba (madera o plástica) que mide 1 × 1,20 metros**. Aquí te relaciono las principales medidas de otros negocios:\n>\n> | Negocio | Medida |\n> |---|---|\n> | Pegante | 97 × 1,14 |\n> | Estuco | 1,20 × 1,20 |\n> | Revestimiento | 97 × 1,14 |\n> | Sodimac Revestimiento | 80 × 1,20 |\n\n---\n\n## 6 · Documentos legales — RUT y Cámara de Comercio\n\n> 👤 **Cliente:** Requiero RUT y Cámara de Comercio para crear como proveedor.\n\n**Respuesta esperada:**\n\n> 🤖 Ahora contamos con una opción muy ágil en nuestro portal **Uno a Uno**. ¿Tienes acceso? Es muy fácil: ingresa con tu usuario y contraseña, y en la **parte inferior de la página**, debajo del título **Legal**, encontrarás la opción para descargar RUT o Cámara de Comercio del negocio que necesites.\n\n---\n\n## Matriz consolidada — preguntas × canal\n\n| Tema | Canal de referencia | Horario |\n|---|---|---|\n| Centro de Experiencia B2B (distribuidor / constructor / mayorista / detallista) | WhatsApp `320 6161199` · Correo `servicioalclienteb2b@corona.com.co` · Uno a Uno | L–V 7:00 am – 6:00 pm · Sáb 7:00 am – 1:00 pm *(WA)* / 8:00 am – 1:00 pm *(soporte)* |\n| Servicio técnico y garantías | WhatsApp `310 274 2006` · Línea `01 8000 512 030` | Consultar por canal |\n| Persona natural / usuario final | WhatsApp `310 274 2006` · Línea `01 8000 512 030` | L–V 7:00 am – 7:00 pm · Sáb 8:00 am – 3:00 pm |\n| Almacenes Corona | [centrocorona.com/tiendas-y-horarios](https://www.centrocorona.com/tiendas-y-horarios) | Depende de tienda/ciudad |\n| Soporte Uno a Uno | `soporteunoauno@corona.com.co` · `01 8000 512 030` · WA B2B `320 6161199` | Consultar por canal |\n\n> 🎯 **Cómo usar este set en pruebas:** copia la pregunta 👤 tal cual en el WhatsApp, compara la respuesta del agente contra el bloque 🤖 esperado. **Si el agente entrega horarios sin preguntar antes qué canal (1.0), es un defecto** — la KB exige aclaración previa.",
      },
    ],
  },
];
