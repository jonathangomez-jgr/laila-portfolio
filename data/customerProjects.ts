import type { CustomerDemo } from "./customerDemos";

export type CustomerProject = CustomerDemo;

export const customerProjects: CustomerProject[] = [
  {
    slug: "pam",
    title: "Paradise Pass Concierge — Agente Agentforce para PAM Hotels",
    customerName: "PAM Hotels",
    industry: "Hospitalidad — All-Inclusive · México, Rep. Dominicana y Jamaica",
    description:
      "Diseño del Concierge Digital de Paradise Pass: un agente Agentforce que actúa como anfitrión 24/7 para el programa de pases vacacionales activables de PAM Hotels (ex-RCD Hotels). Cubre 9 propiedades, 3 idiomas y dos audiencias coexistentes — Paradise Pass (descubrimiento) y Legendary Vacation Club (pertenencia) — sobre una base de Salesforce ya en producción con 2.6M de Accounts, 340K de Contracts y 491K de Cases.",
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
      "Data Cloud",
      "Service Cloud",
      "RAG · Data Libraries",
      "Hospitalidad",
      "All-Inclusive",
    ],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        title: "Resumen ejecutivo",
        content:
          "PAM Hotels (antes RCD Hotels, rebranding completado en enero 2026) opera 9 resorts all-inclusive en México, República Dominicana y Jamaica bajo las marcas Hard Rock, UNICO y AVA. Su programa Paradise Pass — pases vacacionales activables con certificado y vencimiento — es la puerta comercial al ecosistema Legendary Vacation Club (LVC). Este plan propone un Concierge Digital construido en Agentforce que resuelve consultas 24/7 sobre el programa, las propiedades, las políticas y la operación, con RAG sobre 6 Data Libraries especializadas y grounding directo en el Salesforce org PAM-Sandbox (90 objetos custom, 220 record types).",
        overviewData: {
          stats: [
            { value: "9", label: "Propiedades all-inclusive (México · RD · Jamaica)" },
            { value: "3", label: "Idiomas soportados (ES · EN · PT)" },
            { value: "2", label: "Audiencias diferenciadas (Paradise Pass · LVC)" },
            { value: "6", label: "Data Libraries RAG propuestas" },
            { value: "51", label: "Documentos KB clasificados y mapeados" },
            { value: "2.6M", label: "Person Accounts ya en Salesforce" },
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
          "Un agente Agentforce que combina personalidad de marca, RAG sobre 6 Data Libraries especializadas y acceso directo a la org de PAM para responder con contexto del cliente real.",
        objective: {
          headline:
            "Diseñar un Concierge Digital que reconozca audiencia (Paradise Pass vs LVC), idioma (ES/EN/PT) y propiedad, responda con grounding en KB curada y datos reales del cliente, y escale a humano sin fricción cuando la situación lo amerita.",
          okrs: [
            {
              label: "Reconocer audiencia y idioma",
              description:
                "El agente identifica al huésped (Person Account, contrato activo, certificado vigente) antes de citar términos como 'Legend Coins' o 'tier Chairman'. Filtra retriever por audience = paradise_pass | lvc | any y language = ES/EN/PT.",
              enabler: "Agentforce Topics + Person Account lookup + Data Cloud Identity Resolution",
              color: "indigo",
            },
            {
              label: "RAG sobre 6 Data Libraries",
              description:
                "BrandVoice (system prompt) + Programs + Policies + Properties + Operations + FAQs. Cada chunk con metadata enriquecida (property, language, audience, tier, segment, effective_date). Top-K 5–8 por library con re-ranqueo cross-encoder.",
              enabler: "Agentforce Data Libraries + retriever con pre-filter + threshold 0.72",
              color: "violet",
            },
            {
              label: "Escalamiento humano sin fricción",
              description:
                "Cuando se detecta intent emocional, reclamación compleja, validación manual (cambio de nombre, certificado perdido) o solicitud explícita, el agente abre Case con RT correcto (Paradise Pass o PPASS CC), adjunta resumen IA y enruta vía Omni-Channel.",
              enabler: "Service Cloud Omni-Channel + Amazon Connect + Einstein Sentiment",
              color: "sky",
            },
          ],
        },
      },
      {
        id: "data-libraries",
        label: "Knowledge",
        title: "Knowledge — KB del Concierge",
        content:
          "En lugar de cargar los 51 documentos del KB como un solo corpus monolítico, se proponen 6 Data Libraries separadas. Esto habilita: (1) control de acceso por audiencia, (2) routing del retriever por intent, (3) actualizaciones independientes sin re-indexar todo. Abajo: las 6 DLs, el mapeo archivo-por-archivo del repositorio entregado, la estrategia de chunking, el metadata schema obligatorio y el pre-procesamiento crítico.",
        solution: [
          {
            product: "DL-BrandVoice (NO indexada)",
            focus: "Personalidad del agente",
            color: "indigo",
            items: [
              "Arquetipos: 'Anfitrión Exclusivo' + 'Concierge Experto'",
              "Atributos: calidez, elegancia, cercanía, precisión",
              "Diferenciación de tono Paradise Pass (descubrimiento, inspiración) vs LVC (pertenencia, operación)",
              "Vive en el system prompt — NO se retrieva, para que el bot no cite reglas internas literalmente",
              "Adaptación de idioma: ES (informal cercano) · EN (warm professional) · PT (calidoso brasileiro)",
              "Reglas explícitas de escalamiento humano",
            ],
          },
          {
            product: "DL-Programs",
            focus: "Programas comerciales y mecánica",
            color: "violet",
            items: [
              "Definición y mecánica de Paradise Pass: certificado, activación, vencimiento, 4/5 vs 7/8 noches",
              "Beneficios concretos: Member's Bracelet, Resort Credits, eventos por invitación",
              "Eventos 2026: Legends of Paradise (AVA Cancún 6–13 dic), Summer Like Heaven, Camp Rockaway, Superbia Summer, Kids Stay FREE",
              "Ecosistema Legendary: tiers Deluxe/VIP/HoF/Chairman, Legend Coins (filtrado audience = lvc)",
              "5 sub-programas de referidos LVC (Dynamic Referral Rewards, Referral Week, Web Rate 15%, Experience Nights, Referral Nights)",
              "Bonus 'An Extra Dose of Paradise' (compra en 3 meses)",
            ],
          },
          {
            product: "DL-Policies",
            focus: "Términos, cancelaciones y reglas",
            color: "sky",
            items: [
              "Política de cancelación con penalizaciones escalonadas (600–1,500 USD según antelación)",
              "Políticas de Reservaciones LVC (fees de cambio 10 USD, descuentos de grupo 10+ reservas)",
              "Política de no-show",
              "Protocolo ECPAT (protección de menores) — obligatorio en todas las propiedades",
              "Política de mascotas (qué propiedades aplican)",
              "T&Cs de certificados Paradise Pass y vigencias",
            ],
          },
          {
            product: "DL-Properties",
            focus: "Fact sheets y habitaciones (45 PDFs)",
            color: "indigo",
            items: [
              "AVA Resort Cancun · sede Legends of Paradise 2026",
              "Hard Rock Hotel: Cancun · Riviera Maya (Hacienda + Heaven 18+) · Vallarta · Los Cabos · Punta Cana (Casino 18+)",
              "UNICO 20°87° Riviera Maya · UNICO 20°105° Riviera Nayarit (ambos solo adultos 18+)",
              "UNICO Jamaica (Montego Bay) — ⚠ pendiente confirmar inclusión en Paradise Pass",
              "Fact Sheets + Room Descriptions en ES/EN/PT",
              "Metadata por chunk: property, language, doc_type, segment (family/adults_only)",
            ],
          },
          {
            product: "DL-Operations",
            focus: "Operación de viaje (ON TOUR)",
            color: "violet",
            items: [
              "Tarifario ON TOUR 2026 (act. 20/02/2026) para las 9 propiedades",
              "Traslados privados vs compartidos: tarifas, capacidades, condiciones",
              "Política de cancelación de transfer: gratuita 24h antes",
              "Sillas infantiles, equipaje extra, asistencia especial",
              "Cobertura aeroportuaria: Cancún, Cozumel, Puerto Vallarta, Los Cabos, Punta Cana, Montego Bay",
              "Nota interna: documentos aún dicen 'RCD Hotels' (legacy) — se etiqueta con operator_legacy + operator_current en metadata",
            ],
          },
          {
            product: "DL-FAQs",
            focus: "Preguntas frecuentes normalizadas",
            color: "sky",
            items: [
              "Matriz Q/A reconstruida desde el XLSX original (un Q/A = 1 chunk, sin agrupar)",
              "Resort Credits / Legend Coins / Unlimited Inclusions explicados por audiencia",
              "Restricciones de edad por propiedad y zona (Heaven, Rock Royalty, Hacienda, UNICO)",
              "Beneficios por tier (audience = lvc) vs beneficios universales (audience = any)",
              "Reserva de restaurantes y dress codes",
              "Glosario de acrónimos (HRHC, HRRM, HRHV, HRLC, HRPC, AVA, UNICO RM/RN/MB, RCo, LVC, ECPAT)",
            ],
          },
        ],
        contextData: {
          groups: [
            {
              name: "Estructura del repositorio entregado — PAM_Hotels_Knowledge_Base_RAG/",
              findings: [
                "FAQ´s/ — 1 archivo XLSX (Matriz Completa de FAQs - Legendary Vacation Club_SF.xlsx)",
                "Marcas/ — VACÍO (pendiente: brand guide PAM 2026 post-rebranding)",
                "ON TOUR TRANSPORTACION/ — 1 PDF (INFORMACIÓN ON TOUR BY RCD HOTELS 2026.pdf, act. 20/02/2026)",
                "Personalidad_Coversacional/ — 1 DOCX (Tono y Voz Bot - LVC_SF.docx)",
                "Politicas de Cancelacion, No show, Cambios y Hold/ — 2 PDFs (Política de Cancelación socios_.pdf + Políticas de Reservaciones LVC.pdf)",
                "Programa de referidos/ — 1 XLSX (PROGRAMA REFERIDOS.xlsx con 5 sub-programas)",
                "Propiedades/ — 45 PDFs en 9 hoteles (Fact Sheets + Room Descriptions en ES/EN/PT)",
                "Total: 51 archivos · 7 carpetas principales · 3 idiomas (ES/EN/PT)",
              ],
            },
            {
              name: "Clasificación de aplicabilidad — qué entra a qué Data Library",
              findings: [
                "✅ ~46 archivos aplican directa o transversalmente a Paradise Pass (Tono y Voz, Políticas, FAQs, Referidos, ON TOUR, fichas de 9 propiedades)",
                "⚠ ~5 archivos son LVC-only (Políticas de Reservaciones LVC, parte de la matriz de FAQs sobre tiers y Legend Coins)",
                "❌ 1 carpeta vacía (Marcas/) — necesario solicitar brand guide PAM 2026",
                "Tono y Voz Bot — LVC_SF.docx → DL-BrandVoice (system prompt, NO indexado)",
                "Matriz Completa de FAQs (XLSX) → DL-FAQs (split por audiencia: edad/dress codes = any; Legend Coins/tiers = lvc)",
                "Política de Cancelación socios + Políticas de Reservaciones LVC → DL-Policies (tag tier-específico)",
                "PROGRAMA REFERIDOS.xlsx → DL-Programs (marcar audience = lvc hasta confirmar disponibilidad para Paradise Pass)",
                "INFORMACIÓN ON TOUR 2026.pdf → DL-Operations (mantener nombre legacy 'RCD' en metadata: operator_legacy + operator_current)",
                "45 PDFs de Propiedades → DL-Properties (Fact Sheets + Room Descriptions × 9 hoteles × ES/EN/PT)",
              ],
            },
            {
              name: "Las 9 propiedades del KB — mapeo contra Paradise Pass",
              findings: [
                "HRHC — Hard Rock Hotel Cancun · Cancún, México · Familiar · ✅ en Paradise Pass",
                "HRRM — Hard Rock Hotel Riviera Maya (Hacienda + Heaven 18+) · Playa del Carmen, México · Familiar + Solo Adultos · ✅",
                "HRHV — Hard Rock Hotel Vallarta · Puerto Vallarta, México · Familiar · ✅",
                "HRLC — Hard Rock Hotel Los Cabos · Los Cabos, México · Familiar · ✅",
                "HRPC — Hard Rock Hotel & Casino Punta Cana · Punta Cana, RD · Familiar (Casino 18+) · ✅",
                "AVA — AVA Resort Cancun · Cancún, México · Familiar de ultra-lujo · Sede Legends of Paradise 2026 · ✅",
                "UNICO RM — UNICO 20°87° Hotel Riviera Maya · Playa del Carmen, México · Solo Adultos 18+ · ✅",
                "UNICO RN — UNICO 20°105° Hotel Riviera Nayarit · Punta de Mita, México · Solo Adultos 18+ · ✅",
                "⚠ UNICO MB — UNICO Jamaica (Montego Bay) · está en el repo PERO no aparece en paradisepass.com ni en el portafolio público PAM. Validar antes de incluir en el KB del bot",
              ],
            },
            {
              name: "Estrategia de chunking — reglas por tipo de documento",
              findings: [
                "Fact Sheet (PDF, prosa) → 500–800 tokens · overlap 10–15% · corte por sección semántica (amenidades, restaurantes, kids club), NO por página",
                "Room Descriptions (PDF, tabular) → 1 habitación = 1 chunk · overlap 0% · cada chunk autocontenido por tipología",
                "FAQs (XLSX) → 1 Q/A = 1 chunk · overlap 0% · pregunta + respuesta como unidad atómica, NUNCA agrupar",
                "Políticas (PDF) → 200–400 tokens · overlap 20% · por cláusula (overlap alto porque las cláusulas se referencian entre sí)",
                "ON TOUR Tarifario → 1 propiedad = 1 chunk · overlap 0% · tabla por hotel como bloque único, reescrita a prosa para mejor recall",
                "Programa Referidos (XLSX) → 1 sub-programa = 1 chunk · overlap 0% · cada uno de los 5 programas como chunk independiente con mecánica completa",
              ],
            },
            {
              name: "Metadata schema obligatorio — campos mínimos por chunk",
              findings: [
                "doc_id — identificador único versionado (ej: ava_factsheet_es_v2026-03)",
                "library — 1 de 6 (DL-BrandVoice | DL-Programs | DL-Policies | DL-Properties | DL-Operations | DL-FAQs)",
                "property — AVA | HRHC | HRRM | HRHV | HRLC | HRPC | UNICO_RM | UNICO_RN | UNICO_MB | null si transversal",
                "property_brand — Hard Rock | UNICO | AVA Resort | null",
                "language — es | en | pt (mismo doc_id base, distinto language = chunks separados; el retriever filtra por language = user.locale)",
                "audience — any | paradise_pass | lvc (array, puede ser multivalor)",
                "tier — Deluxe | VIP | HoF | Chairman | null (solo para chunks LVC-specific)",
                "segment — family | adults_only | mixed",
                "doc_type — fact_sheet | room_desc | faq | policy | program | ops",
                "topic — array de tópicos (amenities, dining, transfer, etc.) para retrieval por intent",
                "source_file — nombre original del archivo (preserva trazabilidad)",
                "effective_date + last_updated — para re-rank por recencia y cumplimiento",
                "operator_legacy / operator_current — 'RCD Hotels' / 'PAM Hotels' para manejo de docs pre-rebranding",
              ],
            },
            {
              name: "Pre-procesamiento crítico — antes de cargar al vectorstore",
              findings: [
                "1. OCR + corrección manual de PDFs con extractor fallado (varios fact sheets están en formato Google Docs Renderer comprimido — usar OCR como fallback)",
                "2. Reescribir tablas a prosa (ON TOUR, FAQs matrix). Las tablas pierden contexto al vectorizar. Ejemplo: convertir fila a oración: 'Para el Hard Rock Hotel Cancún, el traslado privado desde el Aeropuerto Internacional de Cancún tiene una tarifa de X USD; la cancelación es gratuita con 24h de anticipación.'",
                "3. Unificar nomenclatura RCD ↔ PAM. Anexar nota a cada chunk legacy: 'RCD Hotels evolucionó a PAM Hotels en 2026; ambos nombres refieren al mismo grupo operador.'",
                "4. Normalizar idiomas — cargar ES/EN/PT como chunks separados con el mismo doc_id base, solo language diferente",
                "5. Quitar PII de las matrices — revisar que la matriz LVC no contenga datos de socios reales (nombres, emails, números de membresía)",
                "6. Glosario de acrónimos como chunks dedicados — HRHC, HRRM, HRHV, HRLC, HRPC, AVA, UNICO RM/RN/MB, RCo, LVC, ECPAT (un chunk por término con expansión completa)",
              ],
            },
            {
              name: "Estructura física recomendada en Agentforce",
              findings: [
                "Knowledge Library raíz: 'Paradise Pass & PAM Hotels Concierge'",
                "Topic: BrandVoice → no-retrieval (vive solo en system prompt)",
                "Topic: Programs → DL-Programs",
                "Topic: Policies → DL-Policies",
                "Topic: Properties → DL-Properties (filtered by property + language)",
                "Topic: Operations → DL-Operations",
                "Topic: FAQs → DL-FAQs",
                "Retriever pre-filter: language = $user.locale AND (audience = 'any' OR audience CONTAINS $user.product)",
                "Top-K: 5–8 por library, agregado y re-ranqueado con cross-encoder",
                "Re-rank: relevancia + recencia (last_updated DESC tiebreaker)",
                "Fallback: si no hay match con threshold > 0.72, escalar a humano",
              ],
            },
            {
              name: "Por qué BrandVoice NO se indexa",
              findings: [
                "El documento de tono no debe ser recuperable por el retriever — debe vivir en el system prompt o como instrucciones de la Agent Topic",
                "Si entra al RAG, el bot puede citar literalmente reglas internas al usuario ('según mi guía de tono debo ser cálido…'), lo cual rompe la ilusión conversacional y filtra IP de marca",
                "El tono se compila en el system prompt: arquetipos + atributos + reglas de escalamiento + adaptación por idioma — todo cargado en cada turno, no recuperado por similitud",
                "Esta decisión la confirma el documento interno 'Tono y Voz Bot - LVC_SF.docx' del cliente: define personalidad oficial, diferenciación de audiencia Paradise Pass vs Legendary, y reglas explícitas de escalamiento humano",
              ],
            },
          ],
        },
      },
      {
        id: "archivos-por-dl",
        label: "Archivos por DL",
        title: "Inventario de archivos por Data Library",
        content:
          "Mapeo concreto y verificado contra el repositorio PAM_Hotels_Knowledge_Base_RAG/. Cada Data Library lista los archivos exactos que entran al pipeline de ingesta del Concierge.",
        knowledgeInventoryData: {
          libraries: [
            {
              id: "dl-brandvoice",
              name: "DL-BrandVoice",
              focus: "Personalidad y tono del agente",
              description:
                "Define quién es el Concierge: arquetipos (Anfitrión Exclusivo + Concierge Experto), atributos, diferenciación de audiencia Paradise Pass vs LVC, vocabulario, adaptación por idioma y reglas de escalamiento humano. Este DL NO se indexa en el retriever — se compila al system prompt en cada turno para evitar que el bot cite reglas internas literalmente.",
              tone: "indigo",
              fileCount: 1,
              indexed: false,
              fileGroups: [
                {
                  label: "Personalidad conversacional",
                  files: [
                    "Personalidad_Coversacional/Tono y Voz Bot - LVC_SF.docx",
                  ],
                },
              ],
              pending: [
                "Brand Guide PAM Hotels 2026 (la carpeta Marcas/ del repo está vacía)",
                "Lineamiento oficial de comunicación post-rebranding RCD → PAM",
              ],
            },
            {
              id: "dl-programs",
              name: "DL-Programs",
              focus: "Mecánica de Paradise Pass + ecosistema Legendary",
              description:
                "Cubre la definición y mecánica del pase (4/5 vs 7/8 noches, certificado con vencimiento, bonus 'An Extra Dose of Paradise'), beneficios (Member's Bracelet, Resort Credits, eventos por invitación 2026), ecosistema Legendary con sus tiers y Legend Coins (tag audience = lvc), y los 5 sub-programas de referidos. Cada chunk lleva tag de audiencia para filtrar Paradise Pass vs LVC.",
              tone: "violet",
              fileCount: 2,
              indexed: true,
              fileGroups: [
                {
                  label: "Programa de referidos",
                  note: "5 sub-programas en una sola hoja",
                  files: [
                    "Programa de referidos/PROGRAMA REFERIDOS.xlsx",
                  ],
                },
                {
                  label: "Extractos de FAQ (tiers y mecánicas)",
                  note: "compartido con DL-FAQs · split por chunk con tag audience",
                  files: [
                    "FAQ´s/Matriz Completa de FAQs- Legendary Vacation Club_SF.xlsx",
                  ],
                },
              ],
              pending: [
                "Documento oficial de tiers (Deluxe/VIP/HoF/Chairman) y mecánica completa de Legend Coins con efectividad 2026",
                "Contenido público a scrapear: paradisepass.com (mecánica del pase, eventos, beneficios)",
              ],
            },
            {
              id: "dl-policies",
              name: "DL-Policies",
              focus: "Cancelaciones, no-show, ECPAT, mascotas y T&Cs",
              description:
                "Reglas de negocio que el agente debe citar con precisión: penalizaciones escalonadas de cancelación (600–1,500 USD según antelación), fees de cambio LVC (10 USD), descuentos de grupo (10+ reservas), protocolo ECPAT para protección de menores, políticas de mascotas por propiedad y T&Cs de los certificados Paradise Pass.",
              tone: "sky",
              fileCount: 2,
              indexed: true,
              fileGroups: [
                {
                  label: "Políticas oficiales",
                  files: [
                    "Politicas de Cancelacion, No show, Cambios y Hold/Política de Cancelación socios_.pdf",
                    "Politicas de Cancelacion, No show, Cambios y Hold/Políticas de Reservaciones LVC.pdf",
                  ],
                },
              ],
              pending: [
                "T&Cs y aviso de privacidad de paradisepass.com (scraping público)",
                "Términos del portal legendary.myaccountinquiry.com — matiz Palace Resorts vs Solaya pendiente de validar con el cliente",
              ],
            },
            {
              id: "dl-properties",
              name: "DL-Properties",
              focus: "Fact Sheets + Room Descriptions de las 9 propiedades",
              description:
                "Información estructural de cada resort: amenidades, restaurantes, kids clubs, zonas adults-only, tipologías de habitación y layouts. Cada chunk lleva metadata por property + language + segment (family/adults_only) para que el retriever filtre por propiedad y locale del usuario. Idiomas: la mayoría en ES/EN/PT.",
              tone: "indigo",
              fileCount: 45,
              indexed: true,
              fileGroups: [
                {
                  label: "AVA Resort Cancun",
                  note: "Sede del evento Legends of Paradise 2026 · 4 archivos",
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
                "Confirmar con el cliente: ¿UNICO Jamaica está dentro o fuera de Paradise Pass?",
                "PT faltante para UNICO RM Room Descriptions, UNICO RN Room Descriptions y UNICO MB Room Descriptions",
              ],
            },
            {
              id: "dl-operations",
              name: "DL-Operations",
              focus: "Tarifario ON TOUR + traslados aeropuerto-hotel",
              description:
                "Operación de viaje: traslados privados vs compartidos, tarifas por propiedad, política de cancelación gratuita 24h antes, sillas infantiles, equipaje extra y cobertura aeroportuaria (Cancún, Cozumel, Puerto Vallarta, Los Cabos, Punta Cana, Montego Bay). El tarifario debe linearizarse a prosa antes de vectorizar — las tablas crudas tienen recall pobre.",
              tone: "violet",
              fileCount: 1,
              indexed: true,
              fileGroups: [
                {
                  label: "Tarifario ON TOUR 2026",
                  note: "Actualizado 20/02/2026 · nombre legacy 'RCD HOTELS' · etiquetar operator_legacy / operator_current",
                  files: [
                    "ON TOUR TRANSPORTACION/INFORMACIÓN ON TOUR BY RCD HOTELS 2026.pdf",
                  ],
                },
              ],
              pending: [
                "Confirmar disponibilidad de ON TOUR para huéspedes Paradise Pass (por defecto tag audience = lvc)",
              ],
            },
            {
              id: "dl-faqs",
              name: "DL-FAQs",
              focus: "Matriz Q/A normalizada con split por audiencia",
              description:
                "Preguntas frecuentes reconstruidas como Q/A atómicas (un chunk = 1 pregunta + 1 respuesta). Cubre 4 FAQs × 9 propiedades. Cada chunk lleva tag de audiencia: edad mínima/dress codes/áreas familiares vs adults-only → audience = any · Legend Coins/tiers/beneficios por nivel → audience = lvc · Resort Credits/Unlimited Inclusions → audience = any pero con terminología diferenciada por producto.",
              tone: "sky",
              fileCount: 1,
              indexed: true,
              fileGroups: [
                {
                  label: "Matriz oficial de FAQs",
                  note: "1 XLSX que se trocea a Q/A · también alimenta DL-Programs en sus extractos de tiers",
                  files: [
                    "FAQ´s/Matriz Completa de FAQs- Legendary Vacation Club_SF.xlsx",
                  ],
                },
              ],
              pending: [
                "Glosario de acrónimos como chunks dedicados (HRHC, HRRM, HRHV, HRLC, HRPC, AVA, UNICO RM/RN/MB, RCo, LVC, ECPAT) — construir desde cero",
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
          "15 Job Stories filtradas del backlog interno de PAM v2 — son las únicas marcadas como paquete = MVP. Cada story está clasificada por su forma de resolverse (Knowledge / datos Salesforce / handoff) y por su cobertura de Knowledge actual: qué documentos del KB ya la responden y qué falta por recibir del cliente. Al final, un resumen ejecutivo del avance del MVP.",
        jobStoriesData: {
          intro:
            "Trabajamos sobre el backlog interno de PAM (V2), filtrado a las 15 Job Stories del paquete MVP. El Concierge se enfoca exclusivamente en Paradise Pass — esto simplifica drásticamente el problema porque la mayor parte de la información ya vive estructurada en Salesforce (Account → Contract con RT 'BCL_PPAS' → Benefits). El RAG se reserva para mecánicas, políticas, datos de propiedades y FAQs operativas. Cada tarjeta indica: qué documento(s) del KB resuelven la story, qué está pendiente por entregar y cómo se resuelve operativamente.",
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
                  library: "DL-Properties",
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
                  label: "Programa de Referidos — matriz oficial (5 sub-programas)",
                  path: "Programa de referidos/PROGRAMA REFERIDOS.xlsx",
                  library: "DL-Programs",
                  relevance:
                    "Es la fuente única para esta story. La matriz cruza fecha de venta del contrato × programa de referidos vigente en ese momento (Dynamic Referral Rewards, Dynamic Referral Week, Web Rate 15%, Experience Nights, Dynamic Referral Nights). Cuando el socio pregunta '¿cómo funciona mi programa de referidos?', el agente lee la bandera de programa en el Contract, busca esa fila en la matriz y explica mecánica exacta: cuántas noches gana, qué bonus si el referido compra Deluxe/VIP, etc. Sin este archivo, el bot no podría dar la respuesta correcta porque cada año tiene reglas distintas.",
                },
              ],
              pending: [
                "PAM — confirmar con Eduardo Vergara / Ricardo Dueñas que los campos de identificación de programa por contrato estén poblados en Vaclubity",
                "Salesforce — revisar lógica que cruce fecha de venta del contrato con la matriz para entregar la promo correcta",
              ],
            },
            {
              id: "JS004",
              epicId: "CU002",
              epicName: "Exploración de Beneficios y Programas de Intercambio",
              name: "Semanas Vacacionales por Expirar",
              category: "Information & Discovery",
              cuando: "tengo semanas vacacionales que están por expirar pronto",
              yoQuiero: "saber qué opciones tengo para utilizarlas",
              paraPoder: "no perder el beneficio por el que ya pagué",
              businessValue: "Mejora el nivel de contacto y retención de socios",
              priority: "High",
              package: "MVP",
              coverage: "partial",
              resolution: "hybrid",
              knowledgeSources: [
                {
                  label: "Política de Cancelación / vigencias",
                  path: "Politicas de Cancelacion, No show, Cambios y Hold/Política de Cancelación socios_.pdf",
                  library: "DL-Policies",
                  relevance:
                    "Aporta el marco formal de vigencias y reglas de uso de semanas/certificados (penalizaciones escalonadas, ventanas de antelación, condicionantes por temporada). El agente cita estas reglas para explicar al socio sus opciones reales. NO cubre la regla especial Paradise Pass — 'aunque el certificado esté Expired el club permite reservar para incentivar la venta' — esa excepción la dijo Ornella en sesión pero todavía no está documentada por escrito; por eso esta story queda en cobertura PARCIAL.",
                },
              ],
              pending: [
                "PAM — Ricardo Dueñas debe compartir lista exacta de Web Services Sabre/Synxis para consulta de disponibilidad",
                "Regla especial Paradise Pass: aunque el certificado marque Expired, el club permite reservar — documentar esta excepción en KB",
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
                  library: "DL-Properties",
                  relevance:
                    "Sede del evento Legends of Paradise 2026 y propiedad de ultra-lujo familiar. Permite al agente describir la oferta diferenciada (categoría, amenidades premium, restaurantes) cuando el socio compara destinos para usar su semana.",
                },
                {
                  label: "Hard Rock Cancún Fact Sheet",
                  path: "Propiedades/HRHC/HRHC_FACT_SHEETS/HRHC_FACT_SHEET_ES.pdf",
                  library: "DL-Properties",
                  relevance:
                    "Perfil familiar en Cancún. Aporta descripción del resort, kids club, restaurantes y zonas — datos clave cuando el socio dice 'viajo con mi familia, ¿qué propiedad me conviene?'.",
                },
                {
                  label: "Hard Rock Riviera Maya Fact Sheet",
                  path: "Propiedades/HRRM /HRRM_FACT_SHEETS/HRRM_FACT_SHEET_ES.pdf",
                  library: "DL-Properties",
                  relevance:
                    "Caso especial: combina zona Hacienda (familiar) + Heaven (18+) en una sola propiedad. Permite al agente recomendar HRRM cuando el socio busca flexibilidad de perfiles o viaja en grupos mixtos.",
                },
                {
                  label: "UNICO Riviera Maya Fact Sheet",
                  path: "Propiedades/UNICO RIVIERA MAYA/UNICO RM_ FACT_SHEETS/UNICO_RM_Fact Sheet_ES.pdf",
                  library: "DL-Properties",
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
              id: "JS011",
              epicId: "CU006",
              epicName: "Gestión de Métodos de Pago",
              name: "Actualización de Método de Pago (PCI)",
              category: "Self-Service & Transactions",
              cuando:
                "mi tarjeta de crédito principal expira o quiero cambiar de método de pago",
              yoQuiero: "actualizar mi método de pago registrado en el sistema",
              paraPoder:
                "que mis cargos automáticos pasen sin problema y mi membresía siga activa",
              businessValue:
                "Reduce el riesgo de morosidad y disminuye las llamadas operativas",
              priority: "High",
              package: "MVP",
              coverage: "out-of-scope",
              resolution: "handoff",
              pending: [
                "PAM — TI debe documentar cómo la IA solicita y renderiza la URL de Pay Token en tiempo real",
              ],
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
              coverage: "missing",
              resolution: "knowledge",
              pending: [
                "PAM — subir la política específica de huracanes a Knowledge (reglas distintas a cancelación regular y no-show)",
                "PAM — definir tipificación de casos (categorías, tópicos, subtópicos) al crear Caso de huracán",
                "PAM — lógica de ruteo (colas Omni-Channel) hacia el contract owner",
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
              coverage: "missing",
              resolution: "knowledge",
              pending: [
                "PAM (Yolanda) — subir archivos y políticas oficiales sobre reventas sospechosas al repositorio de Knowledge",
                "Documentación específica: qué formatos exige el club cuando el socio ya pagó a un tercero fraudulento",
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
              coverage: "missing",
              resolution: "knowledge",
              pending: [
                "PAM — compartir la lista exacta de dominios y terminaciones de correo oficiales del club",
                "Documentar reglas de comunicación oficial en Knowledge",
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
            totalStories: 15,
            byCoverage: {
              covered: 3,
              partial: 1,
              missing: 3,
              outOfScope: 8,
            },
            byResolution: {
              knowledgeOnly: 3,
              dataOnly: 4,
              hybrid: 4,
              handoff: 4,
            },
            notes: [
              "Backlog MVP del Concierge: 15 Job Stories filtradas (las únicas con paquete = MVP en el backlog v2 de PAM). Las otras 15 del backlog original son TBD, NA o están bloqueadas — quedan fuera del scope inicial.",
              "7 de 15 stories (47%) involucran Knowledge — 3 ya están totalmente cubiertas con el KB actual, 1 está parcialmente cubierta y 3 todavía no tienen documentación entregada.",
              "8 stories (53%) NO requieren Knowledge: se resuelven directo con datos estructurados de Salesforce/Vaclubity (Account → Contract BCL_PPAS → Benefit) o con escalamiento humano. Es consecuencia del scope MVP solo Paradise Pass — la información ya vive estructurada.",
              "Las 3 stories con coverage 'missing' son las más críticas para cerrar el MVP: política de huracán (JS021), reventa sospechosa (JS023) y phishing (JS024). Todas dependen de que PAM suba documentación oficial al KB.",
              "El verdadero cuello de botella NO es el RAG: son (a) la migración de Vaclubity (beneficiarios, programas de referidos por contrato), (b) la definición de colas Omni-Channel para los 3 handoffs MVP (JS027, JS028, JS030), y (c) las 3 políticas críticas pendientes de subir a Knowledge.",
            ],
            pendingArtifacts: [
              "Política oficial de huracán y clima crítico (Knowledge — JS021)",
              "Políticas y formatos sobre reventas sospechosas (Yolanda → Knowledge — JS023)",
              "Lista oficial de dominios y terminaciones de correo legítimos del club (Knowledge — JS024)",
              "Plantillas de correo actuales para Estado de Cuenta (JS013)",
              "Brand Guide PAM Hotels 2026 (carpeta Marcas/ vacía — afecta DL-BrandVoice)",
              "Documento oficial de tiers (Deluxe/VIP/HoF/Chairman) y mecánica de Legend Coins con efectividad 2026 (afecta DL-Programs)",
              "Validación del 100% de migración de Vaclubity: beneficiarios (Eduardo Vergara), programas de referidos por contrato",
              "Lista de Web Services de Sabre/Synxis para consulta de disponibilidad (Ricardo Dueñas — JS004)",
              "Identificación del OWS exacto de Opera para inyectar alertas de late check-in (JS018)",
              "Confirmación si UNICO Jamaica entra o no en Paradise Pass (afecta DL-Properties)",
              "Definición operativa de colas Omni-Channel para Customer Service + Reservaciones (JS027, JS028, JS030)",
              "PAM — TI debe documentar cómo la IA solicita y renderiza la URL de Pay Token PCI (JS011)",
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
                  knowledgeRef: "DL-Programs (mecánica Paradise Pass)",
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
                  knowledgeRef: "DL-Programs, DL-Properties (fact sheets)",
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
              name: "Explicación del Programa de Referidos por Año de Compra",
              status: "ready",
              persona:
                "Carla Restrepo, compró su Paradise Pass en mayo 2025 → aplica el programa 'Dynamic Referral Week' según la matriz vigente en esa fecha.",
              channel: "Web Chat",
              language: "es",
              preconditions: [
                "Contract con campo 'Programa de Referidos' poblado en Vaclubity (debe identificar a qué programa aplica según fecha de venta)",
                "Matriz de referidos cargada en DL-Programs",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "¿Cómo funciona el programa de referidos que tengo?",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "Carla, tu contrato Paradise Pass de mayo 2025 aplica al programa Dynamic Referral Week: por cada 2 referidos que presentes y atendamos, recibes 1 semana adicional. Si llegan a 4 referidos, son 2 semanas, y si llegan a 6, son 3 semanas. ¿Te ayudo con cómo registrar a alguien?",
                  dataLookup: "Contract.Programa_Referidos__c",
                  knowledgeRef:
                    "DL-Programs · PROGRAMA REFERIDOS.xlsx (sub-programa Dynamic Referral Week)",
                  validations: [
                    "Cruza fecha de venta del contrato con la matriz para identificar el programa correcto",
                    "Cita la mecánica exacta 2x1, 4x2, 6x3 sin inventar variantes",
                    "No mezcla beneficios de otros sub-programas (Web Rate 15%, Experience Nights, etc.)",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Y si mi amigo compra una membresía, ¿gano algo extra?",
                },
                {
                  turn: 4,
                  role: "agent",
                  text: "Sí. Si tu referido compra Paradise Pass, no aplica bonus adicional bajo este programa específico — solo el conteo de noches. Los bonus por compra de membresía (Deluxe/VIP) aplican a programas Legendary, que no es tu caso. ¿Quieres que te conecte con un agente para iniciar el registro del referido?",
                  knowledgeRef: "DL-Programs (límites del sub-programa)",
                  handoff: "Reservaciones (opcional)",
                  validations: [
                    "Distingue audience: programa LVC vs Paradise Pass",
                    "No promete bonus que no aplica al socio",
                  ],
                },
              ],
              expectedOutcome:
                "El agente identifica correctamente el sub-programa por fecha de venta, explica la mecánica exacta y no confunde reglas LVC con Paradise Pass.",
              successCriteria: [
                "Programa correcto identificado por cruce fecha × matriz",
                "Mecánica numérica precisa (2x1, 4x2, 6x3)",
                "No menciona Legend Coins, tiers ni reglas LVC",
              ],
            },
            {
              id: "TS004",
              jobStoryId: "JS004",
              name: "Semanas Vacacionales por Expirar (incluye regla especial)",
              status: "partial",
              persona:
                "Andrés Hoyos, Paradise Pass con 1 certificado de 7 noches que vence en 4 meses (status = vigente) y 1 certificado de 4 noches con status = Expired hace 2 meses.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "Contract con 2 Benefits con fechas controladas en sandbox",
                "Regla especial Paradise Pass documentada en KB: 'aunque Expired, el club permite reservar'",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "¿Tengo semanas por vencer?",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "Andrés, sí tienes movimiento. Tu certificado de 7 noches vence en 4 meses, el 24 de octubre. Además, tu certificado de 4 noches aparece como Expired desde abril, pero buenas noticias: en Paradise Pass aún puedes usarlo — el club te permite agendar la estancia aunque la fecha técnica haya pasado. ¿Quieres que te muestre opciones de propiedad para usar alguno?",
                  dataLookup: "Benefit__c (Status, Expiration_Date__c)",
                  knowledgeRef: "DL-Policies (regla especial Paradise Pass)",
                  validations: [
                    "Detecta semanas que vencen en ≤12 meses (ventana acordada con Roberto González)",
                    "Aplica regla especial: certificado Expired sigue siendo usable",
                    "NO dice 'lo perdiste'",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Quiero algo para diciembre en Riviera Maya",
                },
                {
                  turn: 4,
                  role: "agent",
                  text: "Voy a conectarte con un especialista para revisar disponibilidad real en diciembre. Le paso tu perfil, tus 2 certificados y tu preferencia de Riviera Maya para que arme las opciones contigo. Un momento.",
                  handoff: "Reservaciones (con caso pre-documentado)",
                  validations: [
                    "Crea Caso con datos pre-llenados (certificados, preferencia, destino)",
                    "Agente NO intenta consultar Sabre directamente (pendiente API)",
                  ],
                },
              ],
              expectedOutcome:
                "El agente alerta sobre semanas próximas a vencer 12 meses antes (no 3-6), aplica la regla especial Paradise Pass y escala a humano con caso pre-documentado para búsqueda en Sabre.",
              successCriteria: [
                "Ventana de alerta = 12 meses",
                "Aplica regla especial Expired",
                "Caso de handoff incluye contexto completo",
              ],
              blockers: [
                "Regla 'Expired sigue siendo usable' debe estar documentada en KB — confirmar con Ornella que ya esté subida",
                "Ricardo Dueñas — lista de Web Services de Sabre/Synxis pendiente (afecta paso siguiente de búsqueda de disponibilidad)",
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
                "Fact Sheets cargados en DL-Properties (AVA, Hard Rock, UNICO)",
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
                    "DL-Properties (AVA, HRHC, HRRM, HRHV, HRLC, HRPC fact sheets)",
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
                  knowledgeRef: "DL-Properties (HRPC fact sheet)",
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
              id: "TS007",
              jobStoryId: "JS011",
              name: "Actualización de Método de Pago vía Pay Token (PCI-safe)",
              status: "blocked",
              persona:
                "Socia con tarjeta de crédito principal próxima a expirar; quiere actualizarla antes de que falle el cargo mensual.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "Endpoint de Pay Token funcional en sandbox",
                "Documentación del flow de URL renderizada por IA",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "Mi tarjeta vence el mes que viene, ¿cómo la actualizo?",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "Por seguridad, no puedo recibir datos de tarjetas por WhatsApp. Te voy a enviar un enlace seguro de un solo uso para que actualices tu método de pago directamente en nuestro portal protegido. ¿Te lo mando ahora?",
                  validations: [
                    "Rechaza explícitamente recibir datos de tarjeta por el canal",
                    "Explica el motivo (PCI compliance) sin tecnicismos",
                  ],
                },
                {
                  turn: 3,
                  role: "user",
                  text: "Sí, mándamelo",
                },
                {
                  turn: 4,
                  role: "agent",
                  text: "Aquí está tu enlace seguro: [URL Pay Token única]. Es válido por 30 minutos y solo lo puedes usar una vez. Cuando termines la actualización, recibirás una confirmación automática. ¿Algo más mientras tanto?",
                  dataLookup:
                    "Generar Pay Token URL única (call externo a TI PAM)",
                  validations: [
                    "Genera URL única no adivinable",
                    "Comunica caducidad y single-use",
                    "Cita correctamente que la confirmación llega después",
                  ],
                },
              ],
              expectedOutcome:
                "El agente nunca captura datos de tarjeta, genera y entrega una URL Pay Token segura, y el socio puede actualizar su método sin romper PCI.",
              successCriteria: [
                "0 mención/petición de datos de tarjeta en chat",
                "URL renderizada correctamente",
                "Confirmación automática al completar",
              ],
              blockers: [
                "PAM — TI debe entregar la documentación de cómo la IA solicita y renderiza la URL de Pay Token en tiempo real. Validado por Ornella + Enrique Koh con Juan Carlos Torres pero NO documentado todavía.",
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
              status: "blocked",
              persona:
                "Socio con reservación en HRPC en 5 días, alerta de huracán categoría 3 acercándose al destino.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "Política de huracán cargada en DL-Policies (Knowledge)",
                "Reservation__c activa en HRPC",
                "Tipificación de Casos de huracán configurada",
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
                  text: "Entiendo la preocupación. Antes de explicarte las opciones, ¿estás bien? La buena noticia es que tenemos políticas de protección específicas para huracanes que te dan flexibilidad real. ¿Quieres que las repase contigo?",
                  knowledgeRef: "DL-Policies (política de huracán)",
                  validations: [
                    "Tono empático antes que técnico (regla acordada con Ornella)",
                    "Distingue política de huracán de cancelación regular",
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
                  text: "Tienes 3 opciones bajo nuestra política de huracán: 1) Reprogramar tu estancia sin penalización hasta 12 meses, 2) Cambiar de propiedad a otro destino del portafolio sin costo adicional, o 3) Cancelar con crédito a futuro. Mi sugerencia es reubicarte a otro destino — por ejemplo, Los Cabos o Vallarta están seguros en esas fechas. ¿Quieres que te conecte con un agente para evaluar opciones reales de disponibilidad?",
                  knowledgeRef:
                    "DL-Policies (3 opciones específicas para huracán)",
                  handoff: "Customer Service (Caso tipificado 'Huracán')",
                  validations: [
                    "Lista las 3 opciones exactas según política",
                    "Sugiere reubicación (alineado al objetivo: proteger cash flow)",
                    "Crea Caso con tipificación 'Huracán' y asigna al contract owner",
                  ],
                },
              ],
              expectedOutcome:
                "Agente con tono empático, recita política exacta de huracán (no cancelación regular), facilita reubicación y escala a humano con caso tipificado correctamente.",
              successCriteria: [
                "Tono empático en primer turno",
                "Política exacta sin alucinar opciones",
                "Caso creado con RT/tipificación correcta",
                "Asignación al contract owner",
              ],
              blockers: [
                "PAM — subir política específica de huracán a Knowledge (NO está cargada todavía)",
                "PAM — definir tipificación de casos (categorías, tópicos, subtópicos) para huracán",
                "PAM — lógica de ruteo (colas Omni-Channel) hacia contract owner",
              ],
            },
            {
              id: "TS011",
              jobStoryId: "JS023",
              name: "Llamada de Reventa Sospechosa (orientación + fraude)",
              status: "blocked",
              persona:
                "Socio recibe llamada de tercero ofreciendo comprarle su membresía con descuento; sospecha estafa.",
              channel: "WhatsApp",
              language: "es",
              preconditions: [
                "Política oficial sobre reventas sospechosas cargada en Knowledge",
                "Formatos exigidos por el club para casos de pago a tercero fraudulento",
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
                  text: "Gracias por preguntar antes de actuar — eso ya es una red flag importante. NO es una llamada oficial del club. Nuestra regla es clara: cualquier oferta de compra o reventa de tu membresía debe pasar SIEMPRE primero por nuestro equipo de Customer Service. ¿Ya hiciste algún pago o transferencia a esa persona?",
                  knowledgeRef:
                    "DL-Policies (política de reventas sospechosas)",
                  validations: [
                    "Confirma que NO es contacto oficial",
                    "Explica la regla: avisar a Customer Service ANTES",
                    "Pregunta clave: ¿ya pagaste?",
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
                  text: "Perfecto, llegaste a tiempo. Mi recomendación: bloquea ese contacto, no respondas más mensajes y comparte con nosotros el teléfono o nombre que te contactó. Voy a generar un reporte de fraude preventivo en tu cuenta para que quede registrado. ¿Me compartes el número?",
                  dataLookup: "Create Case (RT = Fraud Prevention)",
                  validations: [
                    "Caso preventivo (no víctima aún)",
                    "Pide datos del contacto sospechoso para registro",
                  ],
                },
              ],
              expectedOutcome:
                "Si el socio NO pagó: orienta y crea caso preventivo. Si SÍ pagó (otra rama): escala inmediato al equipo especial de fraudes.",
              successCriteria: [
                "Detecta correctamente si hay víctima materializada vs prevención",
                "Caso generado con tipificación correcta",
                "Excluye al área de Reservaciones (regla acordada)",
              ],
              blockers: [
                "PAM (Yolanda) — subir archivos y políticas oficiales sobre reventas sospechosas al Knowledge",
                "Documentación específica: qué formatos exige el club cuando hay pago fraudulento materializado",
              ],
            },
            {
              id: "TS012",
              jobStoryId: "JS024",
              name: "Phishing — Validación de Comunicación Oficial",
              status: "blocked",
              persona:
                "Socia recibe correo sospechoso supuestamente del club pidiéndole confirmar datos bancarios; quiere validar si es real.",
              channel: "Web Chat",
              language: "es",
              preconditions: [
                "Lista oficial de dominios y terminaciones de correo del club cargada en Knowledge",
              ],
              steps: [
                {
                  turn: 1,
                  role: "user",
                  text: "Me llegó un correo de PAM Hotels pidiéndome que confirme mis datos bancarios. El dominio es @pamhotels-secure.net. ¿Es legítimo?",
                },
                {
                  turn: 2,
                  role: "agent",
                  text: "No, ese correo NO es nuestro. Nuestros dominios oficiales son exclusivamente @pamhotels.com y nuestras campañas de marketing salen desde dominios verificados de Marketing Cloud que terminan en nuestro nombre oficial. Cualquier variante como '-secure.net' es phishing. ¿Hiciste clic en algún enlace o ingresaste algún dato?",
                  knowledgeRef:
                    "DL-Policies (dominios oficiales del club)",
                  validations: [
                    "Compara dominio recibido vs lista oficial",
                    "Identifica claramente el patrón sospechoso",
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
                  text: "Buenas noticias: sin ingresar datos el riesgo es bajo, pero por precaución te recomiendo escanear tu dispositivo. Voy a transferirte con Customer Service para que dejen registro y te orienten sobre pasos adicionales. Si en algún momento ingresaste contraseña o datos, avísanos de inmediato.",
                  handoff: "Customer Service (caso Phishing)",
                  validations: [
                    "Distingue clic sin datos vs datos ingresados",
                    "Escala correctamente según severidad",
                  ],
                },
              ],
              expectedOutcome:
                "El agente actúa como filtro de validación dando tranquilidad o escalando según severidad (clic vs datos ingresados).",
              successCriteria: [
                "Dominios oficiales citados correctamente",
                "Diferencia clic vs datos ingresados",
                "Escalamiento solo si hubo interacción de riesgo",
              ],
              blockers: [
                "PAM — compartir lista exacta de dominios y terminaciones de correo oficiales del club",
                "Documentar reglas de comunicación oficial en Knowledge",
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
          "Antes de pasar a producción, hay decisiones que deben confirmarse con el cliente. Cada riesgo está mapeado a su impacto y a la acción recomendada.",
        contextData: {
          groups: [
            {
              name: "Riesgos altos (bloquean go-live)",
              findings: [
                "Tiers (Deluxe/VIP/HoF/Chairman) y Legend Coins NO están publicados en paradisepass.com ni pamhotels.com — riesgo de que el bot invente información o filtre datos internos. Acción: solicitar al cliente el documento oficial de tiers y mecánica de Legend Coins con efectividad 2026",
                "UNICO Jamaica aparece en el repositorio del cliente pero NO en paradisepass.com ni en el portafolio público PAM. Riesgo: el bot podría ofrecer una propiedad inexistente al cliente. Acción: validar si está operativa, en pipeline o legacy",
                "Tablas (ON TOUR, matriz FAQs) están sin reescribir a prosa — el retrieval vectorial de tablas crudas es pobre. Acción: linearizar a oraciones completas antes de vectorizar (~4–6 horas LLM-assisted)",
                "Doble fuente de verdad en contrato/membresía: Contract+Benefit__c (comercial) vs RCD_Contract__c+RCD_Membership__c (operativo). Antes de que el agente escriba algo, debe confirmar source-of-truth para el caso de uso",
              ],
            },
            {
              name: "Riesgos medios (manejables con metadata y filtros)",
              findings: [
                "Relación contractual Paradise Pass ↔ LVC no está declarada en fuentes públicas; los T&Cs del portal LVC mencionan a Palace Resorts, no a Solaya. Acción: confirmar con el cliente",
                "Carpeta Marcas/ está vacía — falta la guía oficial post-rebranding RCD → PAM. Acción: solicitar brand guide PAM 2026",
                "Varios PDFs usan Google Docs Renderer que dificulta extracción de texto. Acción: OCR (Tesseract o Salesforce Document Cloud) en pipeline de ingesta",
                "Catalog__c (36 RTs) es punto crítico transversal — cualquier cambio en sus campos o RTs impacta múltiples dominios. Acción: gobierno de cambios cross-dominio",
              ],
            },
            {
              name: "Riesgos bajos (housekeeping)",
              findings: [
                "Documentos mencionan 'RCD' mientras la marca actual es 'PAM' — confusión de marca. Acción: anexar nota de equivalencia en chunk; no reescribir originales (preservar trazabilidad)",
                "ON TOUR y Programa de Referidos no están publicados en sitios públicos — marcar audience = lvc hasta confirmar disponibilidad para Paradise Pass",
                "Log_Message__c con 6.4M registros y Hist_* con >2M acumulado — revisar política de retención antes de que afecte queries del agente",
                "Person Accounts está activo: cualquier query/automatización del agente sobre el cliente final debe considerar IsPersonAccount y campos __pc",
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
          "Materiales de discovery y diseño entregados al cliente. Los dos análisis HTML son la base sobre la que se diseñó el Concierge: el KB Audit clasificó los 51 documentos y propuso las 6 Data Libraries; el Data Model Overview mapeó la org PAM-Sandbox para grounding del agente.",
        assetsData: {
          items: [
            {
              name: "Paradise Pass — KB Audit & RAG Data Library Strategy",
              description:
                "Análisis completo del programa Paradise Pass, clasificación archivo-por-archivo de los 51 documentos del repositorio PAM_Hotels_Knowledge_Base_RAG/, propuesta de las 6 Data Libraries, estrategia de chunking y metadata schema, casos de uso del Concierge y riesgos/gaps detectados.",
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
              name: "Repositorio KB original — PAM_Hotels_Knowledge_Base_RAG",
              description:
                "51 archivos en 7 carpetas: FAQ's, Marcas (vacía), ON TOUR Transportación, Personalidad Conversacional (Tono y Voz Bot LVC_SF), Políticas, Programa de Referidos y Propiedades (45 PDFs en 9 hoteles, ES/EN/PT).",
              available: false,
              type: "doc",
            },
            {
              name: "Brand Guide PAM Hotels 2026",
              description:
                "Pendiente solicitar al cliente. Carpeta Marcas/ del repositorio está vacía. Necesario para cerrar el lineamiento de comunicación post-rebranding RCD → PAM y para enriquecer DL-BrandVoice.",
              available: false,
              type: "doc",
            },
            {
              name: "Documento oficial de tiers LVC y mecánica de Legend Coins",
              description:
                "Pendiente solicitar al cliente. Los tiers Deluxe/VIP/Hall of Fame/Chairman y la mecánica de Legend Coins solo aparecen en documentación interna (matriz FAQs LVC) — no en sitios públicos. Necesario antes de que el Concierge responda preguntas LVC sin riesgo de alucinación.",
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
          "Design of the Paradise Pass Digital Concierge: an Agentforce agent that acts as a 24/7 host for PAM Hotels' (formerly RCD Hotels) activatable vacation pass program. Covers 9 properties, 3 languages, and two coexisting audiences — Paradise Pass (discovery) and Legendary Vacation Club (belonging) — on top of a Salesforce org already in production with 2.6M Accounts, 340K Contracts, and 491K Cases.",
        industry: "Hospitality — All-Inclusive · Mexico, Dominican Republic & Jamaica",
        tabs: [
          { id: "overview", label: "Overview", title: "Executive summary", content: "PAM Hotels (formerly RCD Hotels, rebranding completed in January 2026) operates 9 all-inclusive resorts across Mexico, Dominican Republic, and Jamaica under the Hard Rock, UNICO, and AVA brands. Its Paradise Pass program — activatable vacation passes with an expiring certificate — is the commercial gateway to the Legendary Vacation Club (LVC) ecosystem. This plan proposes a Digital Concierge built on Agentforce that resolves 24/7 questions about the program, the properties, the policies, and the operation, with RAG over 6 specialized Data Libraries and direct grounding in the PAM-Sandbox Salesforce org (90 custom objects, 220 record types)." },
          { id: "que-es-paradise-pass", label: "What is Paradise Pass?", title: "What is Paradise Pass and how does it work?", content: "Paradise Pass is an activatable all-inclusive travel pass — not a traditional vacation club nor a monthly subscription. The customer buys a certificate up front, receives concrete benefits (Member's Bracelet, Resort Credits, invite-only events), and has a defined window to activate their stay at one of the 9 properties in the portfolio. Internally PAM describes it as 'the gateway to the Legendary ecosystem' — the commercial entry-point to the Legendary Vacation Club (LVC) membership program." },
          { id: "ventajas", label: "Advantages", title: "Main advantages for the customer", content: "The advantages that sell Paradise Pass best — extracted from the public site, internal KB materials, and the points most often repeated in real call center queries." },
          { id: "voz-del-cliente", label: "Voice of the customer", title: "What customers say — most frequent themes", content: "The themes that the call center and the member portal report most often, grouped by intent. This is the raw material for the Digital Concierge: what guests actually ask, unfiltered." },
          { id: "data-model", label: "Salesforce data", title: "What the agent finds in PAM's Salesforce", content: "The Concierge does not operate in a vacuum: it connects directly to the PAM-Sandbox org, where the customer, the contract, the pass, and the financial operation already live. Snapshot of the data model relevant for agent grounding." },
          { id: "concierge", label: "Agentforce Concierge", title: "Paradise Pass Digital Concierge design", content: "An Agentforce agent that combines brand personality, RAG over 6 specialized Data Libraries, and direct access to the PAM org to respond with real customer context." },
          { id: "data-libraries", label: "Knowledge", title: "Knowledge — Concierge KB", content: "Instead of loading the KB's 51 documents as a single monolithic corpus, 6 separate Data Libraries are proposed. This enables: (1) audience-based access control, (2) intent-based retriever routing, (3) independent updates without re-indexing everything. Below: the 6 DLs, the file-by-file mapping of the delivered repository, chunking strategy, mandatory metadata schema, and critical pre-processing." },
          { id: "archivos-por-dl", label: "Files per DL", title: "File inventory per Data Library", content: "Concrete mapping of the PAM_Hotels_Knowledge_Base_RAG/ repository files to each of the 6 Data Libraries. This is the load list for the Concierge ingestion pipeline." },
          { id: "job-stories", label: "Job Stories", title: "MVP backlog — Job Stories in the first release", content: "15 Job Stories filtered from PAM's v2 internal backlog — the only ones flagged as package = MVP. Each story is classified by its resolution path (Knowledge / Salesforce data / handoff) and by its current Knowledge coverage: which KB documents already answer it and what is still pending from the client. A final executive summary tracks MVP progress." },
          { id: "test-scripts", label: "Test scripts", title: "Agentforce test scripts — one per MVP Job Story", content: "15 conversational scripts to validate the Digital Concierge before UAT. Each script links to its Job Story, defines persona, channel, language, data preconditions, expected turn-by-turn transcript with inline validations (which Knowledge to cite, which Salesforce object to read, when to hand off), success criteria, and active blockers." },
          { id: "casos-uso", label: "Use cases", title: "Conversations the Concierge resolves", content: "The conversational flows the agent must handle end-to-end. Each flow combines KB (RAG) + real customer data (Salesforce) + escalation rules." },
          { id: "riesgos", label: "Risks & open questions", title: "Risks, gaps, and open questions", content: "Before going live, decisions must be confirmed with the customer. Each risk is mapped to its impact and the recommended action." },
          { id: "assets", label: "Assets", title: "Solution assets", content: "Discovery and design materials delivered to the customer. The two HTML analyses are the foundation on which the Concierge was designed: the KB Audit classified the 51 documents and proposed the 6 Data Libraries; the Data Model Overview mapped the PAM-Sandbox org for agent grounding." },
        ],
      },
      pt: {
        title: "Paradise Pass Concierge — Agente Agentforce para a PAM Hotels",
        description:
          "Desenho do Concierge Digital do Paradise Pass: um agente Agentforce que atua como anfitrião 24/7 para o programa de passes vacacionais ativáveis da PAM Hotels (ex-RCD Hotels). Abrange 9 propriedades, 3 idiomas e duas audiências coexistentes — Paradise Pass (descoberta) e Legendary Vacation Club (pertencimento) — sobre uma base do Salesforce já em produção com 2,6M de Accounts, 340K de Contracts e 491K de Cases.",
        industry: "Hospitalidade — All-Inclusive · México, Rep. Dominicana e Jamaica",
        tabs: [
          { id: "overview", label: "Overview", title: "Resumo executivo", content: "A PAM Hotels (antiga RCD Hotels, rebranding concluído em janeiro de 2026) opera 9 resorts all-inclusive no México, República Dominicana e Jamaica sob as marcas Hard Rock, UNICO e AVA. Seu programa Paradise Pass — passes vacacionais ativáveis com certificado e vencimento — é a porta comercial para o ecossistema Legendary Vacation Club (LVC). Este plano propõe um Concierge Digital construído em Agentforce que resolve consultas 24/7 sobre o programa, as propriedades, as políticas e a operação, com RAG sobre 6 Data Libraries especializadas e grounding direto na org PAM-Sandbox (90 objetos custom, 220 record types)." },
          { id: "que-es-paradise-pass", label: "O que é Paradise Pass?", title: "O que é Paradise Pass e como funciona?", content: "Paradise Pass é um passe ativável de viagem all-inclusive — não é um vacation club tradicional nem uma assinatura mensal. O cliente compra um certificado antecipadamente, recebe benefícios concretos (Member's Bracelet, Resort Credits, acesso a eventos por convite) e dispõe de um prazo definido para ativar sua estadia em uma das 9 propriedades do portfólio. Internamente a PAM o descreve como 'a porta de entrada ao ecossistema Legendary' — a antessala comercial do programa de membership Legendary Vacation Club (LVC)." },
          { id: "ventajas", label: "Vantagens", title: "Principais vantagens para o cliente", content: "As vantagens que melhor vendem o Paradise Pass — extraídas do site público, dos materiais internos do KB e dos pontos que mais se repetem em consultas reais ao call center." },
          { id: "voz-del-cliente", label: "Voz do cliente", title: "O que os clientes dizem — temas mais frequentes", content: "Os temas que o call center e o portal de sócios relatam com maior frequência, agrupados por intenção. Esta é a matéria-prima do Concierge Digital: o que os hóspedes realmente perguntam, sem filtro." },
          { id: "data-model", label: "Dados no Salesforce", title: "O que o agente encontra no Salesforce da PAM", content: "O Concierge não opera no vácuo: conecta-se diretamente à org PAM-Sandbox, onde já vivem o cliente, o contrato, o passe e a operação financeira. Snapshot do modelo de dados relevante para o grounding do agente." },
          { id: "concierge", label: "Concierge Agentforce", title: "Desenho do Concierge Digital Paradise Pass", content: "Um agente Agentforce que combina personalidade de marca, RAG sobre 6 Data Libraries especializadas e acesso direto à org da PAM para responder com contexto real do cliente." },
          { id: "data-libraries", label: "Knowledge", title: "Knowledge — KB do Concierge", content: "Em vez de carregar os 51 documentos do KB como um único corpus monolítico, propõem-se 6 Data Libraries separadas. Isso habilita: (1) controle de acesso por audiência, (2) roteamento do retriever por intent, (3) atualizações independentes sem reindexar tudo. Abaixo: as 6 DLs, o mapeamento arquivo-por-arquivo do repositório entregue, a estratégia de chunking, o schema de metadata obrigatório e o pré-processamento crítico." },
          { id: "archivos-por-dl", label: "Arquivos por DL", title: "Inventário de arquivos por Data Library", content: "Mapeamento concreto dos arquivos do repositório PAM_Hotels_Knowledge_Base_RAG/ para cada uma das 6 Data Libraries. É a lista de carga para o pipeline de ingestão do Concierge." },
          { id: "job-stories", label: "Job Stories", title: "Backlog MVP — Job Stories do primeiro release", content: "15 Job Stories filtradas do backlog interno v2 da PAM — as únicas marcadas como pacote = MVP. Cada story é classificada pelo caminho de resolução (Knowledge / dados Salesforce / handoff) e pela cobertura atual de Knowledge: quais documentos do KB já a respondem e o que ainda está pendente do cliente. Um resumo executivo final acompanha o avanço do MVP." },
          { id: "test-scripts", label: "Scripts de teste", title: "Scripts de teste Agentforce — um por Job Story MVP", content: "15 scripts conversacionais para validar o Concierge Digital antes do UAT. Cada script está vinculado à sua Job Story, define persona, canal, idioma, pré-condições de dados, transcrição esperada turno-a-turno com validações inline (qual Knowledge citar, qual objeto do Salesforce ler, quando fazer handoff), critérios de sucesso e bloqueadores ativos." },
          { id: "casos-uso", label: "Casos de uso", title: "Conversas que o Concierge resolve", content: "Os fluxos conversacionais que o agente deve tratar end-to-end. Cada fluxo combina KB (RAG) + dados reais do cliente (Salesforce) + regras de escalonamento." },
          { id: "riesgos", label: "Riscos e dúvidas em aberto", title: "Riscos, gaps e perguntas pendentes", content: "Antes de ir para produção, há decisões que devem ser confirmadas com o cliente. Cada risco está mapeado ao seu impacto e à ação recomendada." },
          { id: "assets", label: "Ativos", title: "Ativos da solução", content: "Materiais de discovery e desenho entregues ao cliente. Os dois análises em HTML são a base sobre a qual o Concierge foi desenhado: o KB Audit classificou os 51 documentos e propôs as 6 Data Libraries; o Data Model Overview mapeou a org PAM-Sandbox para grounding do agente." },
        ],
      },
    },
  },
];
