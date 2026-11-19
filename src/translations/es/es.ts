import type { ITranslation } from "../ITranslation";

export const ES: ITranslation = {
  Nav: {
    Auctions: "Subastas",
    Features: "Funciones",
    HowItWorks: "Cómo funciona",
    Pricing: "Precios",
    Tools: "Herramientas",
    GetStarted: "Empezar",
    Solutions: "Soluciones",
    SolutionItems: [
      {
        href: "/solutions/itad-hardware-auctions",
        title: "ITAD y Hardware Reacondicionado",
        description: "Vende lotes de portátiles, móviles y servidores en salas en vivo de 15 min.",
      },
      {
        href: "/solutions/liquidation-pallet-auctions",
        title: "Palés de Liquidación y Devoluciones",
        description: "Mueve palés mixtos y sobrestock más rápido con 0% de comisión.",
      },
      {
        href: "/solutions/b2b-smartphone-stock-auctions",
        title: "Mayoristas de Smartphones",
        description: "Subasta lotes clasificados de iPhone y Samsung en tiempo real.",
      },
      {
        href: "/solutions/industrial-surplus-machinery-auctions",
        title: "Excedentes Industriales y Herramientas",
        description: "Liquida herramientas, repuestos y maquinaria sin primas al comprador.",
      },
      {
        href: "/solutions/fashion-overstock-lot-auctions",
        title: "Excedentes de Moda y Retail",
        description: "Vende lotes de temporada de forma discreta a compradores verificados.",
      },
      {
        href: "/solutions/whatsapp-b2b-auction-alternative",
        title: "Alternativa B2B a WhatsApp",
        description: "Sustituye 20 chats separados por un único enlace privado de puja.",
      },
    ],
    DropTitle: "Sala de Subasta en Vivo",
    DropDesc: "Únete a una subasta mayorista activa con pujas en tiempo real.",
    FeaturesDropTitle: "Funciones de la Plataforma",
    FeaturesDropDesc: "Sincronización en vivo, temporizador anti-snipe y acceso verificado.",
  },
  HomePage: {
    MetaTags: {
      url: "/",
      title: "ArcBids — Subastas B2B Mayoristas en Tiempo Real",
      description:
        "Lanza salas de subastas mayoristas privadas o públicas en minutos, con pujas en vivo, protección anti-snipe e invitaciones sencillas.",
      imgUrl: "/opengraph-image",
      tags: [
        "subastas B2B",
        "plataforma de subastas mayoristas",
        "pujas en vivo",
        "remarketing ITAD",
        "subastas de liquidación",
        "ArcBids",
      ],
    },
    HeroTitleStart: "Subastas B2B en tiempo real,",
    HeroTitleHighlight: "diseñadas para la velocidad.",
    HeroSubtitle:
      "Lanza salas privadas de subastas mayoristas en minutos, con pujas instantáneas en vivo, protección anti-snipe e invitaciones sin fricción.",
    PrimaryCta: "Empezar",
    SecondaryCta: "Cómo funciona",
    StepsEyebrow: "Cómo funciona",
    StepsTitle: "Lanza una sala en tres pasos.",
    Steps: [
      {
        step: "01",
        title: "Crea tu sala de subasta",
        description:
          "Añade tus lotes mayoristas, define precios de salida, cantidades, incrementos mínimos y reglas anti-snipe en minutos.",
      },
      {
        step: "02",
        title: "Invita a tus compradores",
        description:
          "Comparte enlaces públicos o privados para que compradores verificados entren con su nombre y correo o teléfono, sin contraseñas.",
      },
      {
        step: "03",
        title: "Opera en vivo y cierra rápido",
        description:
          "Observa las pujas en tiempo real, deja que el anti-snipe mantenga la puja justa y contacta al ganador al cerrar la sala.",
      },
    ],
    Showcase: {
      Eyebrow: "Experiencia en Vivo",
      Title: "Cada puja al instante en tiempo real.",
      Subtitle:
        "Los compradores ven fotos, cantidades y precio por unidad mientras compiten en vivo con protección automática anti-snipe.",
    },
    Features: {
      Eyebrow: "Plataforma",
      Title: "Diseñada para la velocidad del comercio mayorista.",
      AutoBidTitle: "Puja Automática y Límite Máximo",
      AutoBidDesc:
        "Permite a tus compradores fijar un tope máximo una sola vez. Los incrementos automáticos mantienen la competencia y mejoran el precio final.",
      AutoBidToggleLabel: "Puja automática",
      AntiSnipeTitle: "Protección Anti-Snipe",
      AntiSnipeDesc:
        "Las pujas de último segundo amplían automáticamente el reloj del lote para que otros compradores puedan responder y maximizar el valor.",
      AntiSnipeExtended: "+15s ampliado",
      InvitesTitle: "Listas de Compradores",
      InvitesDesc:
        "Organiza compradores aprobados en listas (por correo o teléfono), importa desde CSV y elige qué listas acceden a cada subasta.",
      InvitedLabel: "Invitado",
      PausedLabel: "Pausado",
    },
    BottomCtaTitle: "¿Listo para tu próximo lote mayorista?",
    BottomCtaSubtitle:
      "Lanza una sala en minutos para mostrar lotes activos y recibir pujas en tiempo real.",
  },
  HowItWorksPage: {
    MetaTags: {
      url: "/how-it-works",
      title: "Cómo Funciona — ArcBids Subastas B2B en Vivo",
      description:
        "Guía paso a paso de cómo los vendedores crean salas de subastas mayoristas y cómo los compradores pujan en ArcBids.",
      imgUrl: "/opengraph-image",
      tags: ["cómo funciona ArcBids", "flujo subasta B2B", "anti-snipe", "lotes mayoristas"],
    },
    Eyebrow: "Cómo funciona",
    TitleStart: "De lotes mayoristas a ventas cerradas —",
    TitleHighlight: "paso a paso.",
    Subtitle:
      "ArcBids ejecuta salas de subastas mayoristas sincronizadas en vivo directamente en el navegador. Así es como vendedores y compradores operan.",
    SellerEyebrow: "Para Vendedores",
    SellerTitle: "Organizar una subasta en vivo",
    SellerSteps: [
      {
        step: "01",
        title: "Configura tu organización",
        summary:
          "Inicia sesión con tu código por correo o enlace mágico, sin contraseñas. ArcBids crea tu espacio y página pública automáticamente.",
        detail:
          "Puedes personalizar el nombre y la URL de tu organización en cualquier momento desde el Panel de Vendedor.",
      },
      {
        step: "02",
        title: "Configura reglas y acceso",
        summary:
          "Elige título, moneda (EUR o USD), tiempo por lote, ventana anti-snipe e incremento mínimo de puja.",
        detail:
          "Configura la sala como Pública o Solo con Invitación (solo listas de compradores aprobados). También puedes programar fecha y hora.",
      },
      {
        step: "03",
        title: "Añade tus lotes mayoristas",
        summary:
          "Añade lotes con título, cantidad de unidades, precio inicial, descripción y fotos.",
        detail:
          "Las fotos se optimizan automáticamente para cargar rápido. Indicar unidades permite ver el precio unitario en tiempo real.",
      },
      {
        step: "04",
        title: "Comparte el enlace y sal en vivo",
        summary:
          "Comparte el enlace único de la sala o la página de tu organización con tus compradores.",
        detail:
          "Antes de empezar, los compradores ven una vista previa con cuenta atrás y botón de calendario.",
      },
      {
        step: "05",
        title: "Cierre automático y contacto",
        summary:
          "Cuando el reloj llega a cero, el mejor postor gana y la sala avanza automáticamente al siguiente lote.",
        detail:
          "Al finalizar, consulta cada lote vendido y contacta al comprador ganador en un clic desde tu panel.",
      },
    ],
    BuyerEyebrow: "Para Compradores",
    BuyerTitle: "Unirse y pujar",
    BuyerSteps: [
      {
        step: "01",
        title: "Abre el enlace de la subasta",
        summary:
          "Abre el enlace compartido por el vendedor. Si está en vista previa, puedes revisar los lotes y añadirlo a tu calendario.",
      },
      {
        step: "02",
        title: "Introduce tu nombre y contacto",
        summary:
          "Introduce tu nombre (o empresa) y correo o teléfono. Las salas privadas verifican tu acceso en la lista del vendedor.",
      },
      {
        step: "03",
        title: "Puja en tiempo real",
        summary:
          "Observa fotos, cantidades, precio por unidad y actividad en vivo. Usa los botones rápidos para pujar en un clic.",
      },
      {
        step: "04",
        title: "Cierre justo y entrega",
        summary:
          "El anti-snipe protege los últimos segundos. Al terminar el reloj, el ganador asegura el lote y el vendedor contacta directamente.",
      },
    ],
    MechanicsEyebrow: "Detalles Técnicos",
    MechanicsTitle: "Reglas integradas",
    Mechanics: [
      {
        title: "Temporizador Anti-Snipe",
        description:
          "Si entra una puja en los últimos segundos, el contador vuelve a ampliarse automáticamente para dar tiempo justo a responder.",
      },
      {
        title: "Una Sesión por Comprador",
        description:
          "Cada correo o teléfono solo puede estar activo una vez por sala, evitando duplicados entre pestañas o dispositivos.",
      },
      {
        title: "Avance Automático de Lotes",
        description:
          "Los lotes avanzan en orden automáticamente. Al expirar uno, pasa a Vendido o No vendido y comienza el siguiente.",
      },
      {
        title: "Contacto Directo Vendedor-Ganador",
        description:
          "ArcBids guarda el nombre y contacto del postor ganador para facturar y coordinar el envío al instante.",
      },
    ],
    CtaTitle: "¿Listo para lanzar tu primera sala?",
    CtaSubtitle:
      "Crea tu organización, añade tus lotes mayoristas e invita compradores en minutos.",
    CtaPrimary: "Abrir Panel",
    CtaSecondary: "Ver Precios",
  },
  PricingPage: {
    MetaTags: {
      url: "/pricing",
      title: "Precios — ArcBids",
      description:
        "Precios simples y transparentes para salas de subastas B2B. Lanza subastas en vivo con 0% de comisión en 2026.",
      imgUrl: "/opengraph-image",
      tags: ["precios ArcBids", "precios subastas B2B", "software mayorista"],
    },
    Section: {
      Eyebrow: "Precios",
      Title: "Planes simples para compradores y mayoristas.",
      Plans: [
        {
          name: "Pase Comprador",
          description: "Para compradores mayoristas verificados",
          price: "Gratis",
          period: "",
          original: "",
          badge: "",
          cta: "Entrar a Sala",
          features: [
            "Acceso a salas públicas y por lista",
            "Actualizaciones de puja en vivo",
            "Historial de actividad en tiempo real",
            "Protección anti-snipe",
            "Cola de lotes al instante",
          ],
        },
        {
          name: "Pago por Subasta",
          description: "Sin cuotas mensuales — paga solo al lanzar",
          price: "€25",
          period: "/subasta",
          original: "",
          badge: "Oferta 2026",
          cta: "Empezar a Vender",
          features: [
            "Todo lo incluido en Pase Comprador",
            "0% de comisión en 2026 (luego 5%)",
            "Sin suscripción mensual",
            "Listas de compradores e importación CSV",
            "Puja automática y anti-snipe",
          ],
        },
        {
          name: "Enterprise",
          description: "Para redes B2B de alto volumen",
          price: "A medida",
          period: "",
          original: "",
          badge: "",
          cta: "Contactar Ventas",
          features: [
            "Todo lo de Pago por Subasta",
            "Tarifas por volumen personalizadas",
            "Gestor de cuenta dedicado",
            "Integraciones ERP y webhooks",
            "SLA 99.99%",
          ],
        },
      ],
    },
  },
  Footer: {
    Tagline:
      "Plataforma B2B de subastas mayoristas diseñada para la velocidad en tiempo real.",
    Badge: "Motor en Vivo · Sync Instantáneo",
    Home: "Inicio",
    Features: "Funciones",
    HowItWorks: "Cómo funciona",
    NavTitle: "Navegación",
    LegalTitle: "Legal",
    ContactTitle: "Contacto",
    Privacy: "Privacidad",
    Terms: "Términos",
    Imprint: "Aviso legal",
    Copyright: "© 2026 ArcBids. Todos los derechos reservados.",
    CraftedWith: "Infraestructura en tiempo real de alta disponibilidad",
  },
  AuctionPage: {
    MetaTags: {
      url: "/auction",
      title: "Sala de Subasta en Vivo — ArcBids",
      description:
        "Únete a una subasta B2B en tiempo real en ArcBids con pujas en vivo, precios por unidad y protección anti-snipe.",
      imgUrl: "/opengraph-image",
      tags: ["sala de subasta en vivo", "pujas B2B", "ArcBids"],
    },
  },
  DashboardPage: {
    MetaTags: {
      url: "/dashboard",
      title: "Panel de Vendedor — ArcBids",
      description:
        "Gestiona tu organización, listas de compradores, salas de subastas mayoristas y ganadores.",
      imgUrl: "/opengraph-image",
      tags: ["panel de vendedor", "gestión de subastas", "ArcBids"],
    },
    Copy: {
      Loading: "Cargando panel…",
      LiveBadge: "En vivo",
      ConnectingBadge: "Conectando",
      SignOut: "Cerrar sesión",
      ActiveAuctions: "Subastas Activas",
      FinishedAuctions: "Finalizadas",
      TotalSold: "Total Vendido",
      OrganizationTitle: "Organización",
      EditOrganizationTitle: "Editar Organización",
      EditOrganizationDesc: "Actualiza el nombre y el slug público de tu organización.",
      OrganizationNameLabel: "Nombre de Organización",
      SlugLabel: "Slug",
      Cancel: "Cancelar",
      SaveChanges: "Guardar cambios",
      InvitedBuyersTitle: "Compradores Invitados",
      InvitedBuyerPlaceholder: "comprador@empresa.com",
      WhitelistAction: "Autorizar",
      NoBuyersYet: "Aún no hay compradores invitados.",
      Active: "Activo",
      Paused: "Pausado",
      Revoke: "Revocar",
      Restore: "Restaurar",
      AuctionsTitle: "Subastas",
      NoAuctionsYet: "Aún no hay subastas. Pulsa + para crear tu primera subasta.",
      PreviewStatus: "Vista previa",
      LiveStatus: "En vivo",
      EndedStatus: "Finalizada",
      PublicBadge: "Pública",
      InviteOnlyBadge: "Solo invitación",
      LotTimerSuffix: "s por lote",
      MinIncrementSuffix: "incremento mín.",
      StartAction: "Iniciar",
      CreateAuctionTitle: "Crear Subasta",
      CreateAuctionDesc: "Configura las reglas de tu sala de subasta.",
      EditAuctionTitle: "Editar Subasta",
      EditAuctionDesc: "Actualiza la configuración o el horario antes de empezar.",
      WinnersTitleSuffix: "Ganadores",
      WinnersDesc: "Contacta directamente con los compradores ganadores.",
      LotsSoldSummary: "lotes vendidos",
      TotalLabel: "Total",
      WinnerLabel: "Ganador:",
      NoWinningBids: "Sin pujas ganadoras",
      UnsoldLabel: "No vendido",
      EmailWinner: "Enviar correo",
      CopyEmail: "Copiar correo",
      Copied: "Copiado",
      RoomSettingsHeading: "Ajustes de la Sala",
      RoomTitleLabel: "Título de la Subasta",
      RoomTitlePlaceholder: "Lote Mayorista Electrónica Q1",
      CurrencyLabel: "Moneda",
      LotTimerLabel: "Tiempo por Lote (seg)",
      AntiSnipeLabel: "Anti-Snipe (seg)",
      MinStepLabel: "Paso Mín.",
      PublicAuctionTitle: "Subasta Pública",
      PublicAuctionOnDesc: "Cualquiera con el enlace puede entrar y pujar",
      PublicAuctionOffDesc: "Solo invitación · requiere estar en una lista",
      AutoBidTitle: "Activar Puja Automática",
      AutoBidDesc: "Permitir a los compradores fijar una puja máxima",
      ScheduleTitle: "Programar Hora de Inicio",
      ScheduleOptionalPrefix: "Opcional · Elige fecha y hora",
      ScheduleAtWord: "a las",
      ClearSchedule: "Limpiar",
      LotsHeading: "Lotes",
      AddLot: "Añadir Lote",
      EditLotTitle: "Editar Lote",
      AddLotTitle: "Añadir Lote",
      EditLotDesc: "Actualiza el título, precio inicial o imágenes del lote.",
      AddLotDesc: "Añade un artículo o palé mayorista a esta subasta.",
      AddLotHintCreate: "Añade al menos un lote antes de crear esta subasta.",
      AddLotHintEdit: "Añade al menos un lote antes de guardar.",
      CreateAuctionAction: "Crear Subasta",
      SaveLotAction: "Guardar Lote",
      LotTitleLabel: "Título del Lote",
      QuantityLabel: "Cantidad",
      StartPriceLabel: "Precio Inicial",
      DescriptionLabel: "Descripción",
      DescriptionPlaceholder: "Lote grado A, probado y sellado de fábrica.",
      LotImagesLabel: "Imágenes del Lote",
      UploadingPhotos: "Subiendo imágenes…",
      DropPhotos: "Haz clic o arrastra fotos aquí",
      PhotoHint: "PNG, JPG, WebP, GIF hasta 10 MB",
    },
  },
  LoginPage: {
    MetaTags: {
      url: "/login",
      title: "Iniciar Sesión — ArcBids",
      description:
        "Accede a tu espacio de vendedor ArcBids con un código de 6 dígitos o enlace mágico.",
      imgUrl: "/opengraph-image",
      tags: ["login ArcBids", "acceso vendedor"],
    },
  },
};
