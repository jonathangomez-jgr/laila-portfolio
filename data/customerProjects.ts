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
            { value: "✅", label: "Foundation FWD_ desplegada en Sandbox (jul-2026)" },
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
                { articleId: "KA-FAQ-001", title: "Resort Credits · qué son y dónde se canjean", recordType: "FAQ" },
                { articleId: "KA-FAQ-002", title: "Legend Coins vs Resort Credits", recordType: "FAQ" },
                { articleId: "KA-FAQ-003", title: "Créditos y Casino · restricciones locales", recordType: "FAQ" },
                { articleId: "KA-FAQ-004", title: "Restricciones de edad por propiedad y zona", recordType: "FAQ" },
                { articleId: "KA-FAQ-005", title: "Reserva de restaurantes y dress code", recordType: "FAQ" },
                { articleId: "KA-FAQ-006", title: "Kids Stay FREE · condiciones", recordType: "FAQ" },
                { articleId: "KA-FAQ-007", title: "Expiración del certificado Paradise Pass", recordType: "FAQ" },
                { articleId: "KA-FAQ-008", title: "Diferencia Paradise Pass vs Legendary Vacation Club", recordType: "FAQ" },
                { articleId: "KA-FAQ-009", title: "Rebranding RCD Hotels → PAM Hotels", recordType: "FAQ" },
                { articleId: "KA-FAQ-010", title: "Glosario de Acrónimos (HRHC, AVA, UNICO, LVC, ECPAT, Rco)", recordType: "FAQ" },
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
            "41 artículos master en español · con traducciones a EN y PT queda un total de 123 versiones. Cada artículo lleva los 4 Data Categories obligatorios (Audience · Topic · Property · Lifecycle). El status inicial es 'planned'; pasa a 'draft' al crearlo en sandbox, 'in-review' al enviarlo a approver, 'validated' al publicarse.",
          totals: {
            masterArticles: 41,
            languageVersions: 123,
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
                },
              ],
            },
            {
              recordType: "Policy",
              description:
                "8 artículos — reglas oficiales con approver Legal. Cada uno con Membership_Level_Applicable, Effective_Date y sección 'Aplicabilidad · Regla · Excepciones'.",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  title: "Resort Credits · qué son y dónde se canjean",
                  summary:
                    "Crédito real (no puntos virtuales) canjeable en spa/wellness, aventuras al aire libre y belleza/styling. Aplica al catálogo del hotel y a agencias aliadas seleccionadas.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS001"],
                  membershipLevel: "ALL",
                  status: "planned",
                },
                {
                  id: "KA-FAQ-002",
                  title: "Legend Coins vs Resort Credits · diferencia",
                  summary:
                    "Legend Coins: moneda del programa LVC (audience=lvc). Resort Credits: crédito del programa Paradise Pass. Terminología diferenciada por producto.",
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
                  jobStories: ["JS001"],
                  membershipLevel: "ALL",
                  status: "planned",
                },
                {
                  id: "KA-FAQ-003",
                  title: "Créditos y Casino · restricciones locales",
                  summary:
                    "En HRPC (Punta Cana) los créditos NO aplican en Casino por regulaciones locales de RD sobre juego y azar. En otras propiedades sin casino no aplica.",
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
                  status: "planned",
                },
                {
                  id: "KA-FAQ-004",
                  title: "Restricciones de edad por propiedad y zona",
                  summary:
                    "UNICO RM/RN: 18+. AVA/Hard Rock: familiar. HRRM tiene zona Heaven 18+ y zona Hacienda familiar. Zonas exclusivas (Rock Royalty, VIP) requieren nivel LVC.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS005"],
                  membershipLevel: "ALL",
                  status: "planned",
                },
                {
                  id: "KA-FAQ-005",
                  title: "Reserva de restaurantes y dress code",
                  summary:
                    "Reserva vía app/chatbot con 24h de anticipación. Casual Regular en la mayoría; Casual Elegant en cenas de especialidad. Nunca traje de baño ni ropa mojada.",
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
                  status: "planned",
                },
                {
                  id: "KA-FAQ-006",
                  title: "Kids Stay FREE · condiciones",
                  summary:
                    "Aplica en propiedades familiares (AVA, HRHC, HRRM Hacienda, HRHV, HRLC, HRPC). Requiere reserva del adulto tarifa full. Verificar temporada — hay ventanas donde no aplica.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Seasonal" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Public Web"],
                  languages: ["es", "en", "pt"],
                  membershipLevel: "ALL",
                  status: "planned",
                },
                {
                  id: "KA-FAQ-007",
                  title: "Expiración del certificado Paradise Pass",
                  summary:
                    "El certificado tiene fecha de expiración. Ejemplo: certificado de 7 noches con vigencia hasta la fecha X del año siguiente. Al activar la estancia se congela el vencimiento.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "Paradise Pass" },
                    { group: "Topic", value: "Program_Membership" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS001"],
                  membershipLevel: "Paradise Pass",
                  status: "planned",
                },
                {
                  id: "KA-FAQ-008",
                  title: "Diferencia Paradise Pass vs Legendary Vacation Club",
                  summary:
                    "Paradise Pass = producto activable de descubrimiento (certificado con vencimiento). LVC = programa de membresía con tiers (Deluxe/VIP/HoF/Chairman). PPass es la antesala de LVC.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "Program_Membership" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC", "Public Web"],
                  languages: ["es", "en", "pt"],
                  jobStories: ["JS001"],
                  membershipLevel: "ALL",
                  status: "planned",
                },
                {
                  id: "KA-FAQ-009",
                  title: "Rebranding RCD Hotels → PAM Hotels",
                  summary:
                    "RCD Hotels evolucionó a PAM Hotels en enero 2026. Ambos nombres refieren al mismo grupo operador. Documentos legacy que dicen 'RCD' siguen siendo válidos.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Portal LVC", "Public Web"],
                  languages: ["es", "en", "pt"],
                  membershipLevel: "ALL",
                  status: "planned",
                },
                {
                  id: "KA-FAQ-010",
                  title: "Glosario de Acrónimos (HRHC · AVA · UNICO · LVC · ECPAT · Rco)",
                  summary:
                    "Diccionario de términos internos: HRHC=Hard Rock Hotel Cancun, HRRM=Riviera Maya, HRHV=Vallarta, HRLC=Los Cabos, HRPC=Punta Cana, AVA=AVA Resort, UNICO=UNICO 20°87°, LVC=Legendary Vacation Club, ECPAT=protección de menores, Rco=Resort credits.",
                  recordType: "FAQ",
                  dataCategories: [
                    { group: "Audience", value: "ALL" },
                    { group: "Topic", value: "FAQs_General" },
                    { group: "Property", value: "All_Properties" },
                    { group: "Lifecycle", value: "Active" },
                  ],
                  retrievers: ["R2 · KB-Programs-FAQs"],
                  channels: ["Agentforce", "Service Console"],
                  languages: ["es", "en", "pt"],
                  membershipLevel: "ALL",
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "planned",
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
                  status: "draft",
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
                  status: "draft",
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
                  status: "draft",
                },
              ],
            },
          ],
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
];
