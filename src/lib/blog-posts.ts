import { Locale } from "@/translations/Translations";

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogRelatedLink {
  label: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readTime: string;
  keywords: string[];
  sections: BlogSection[];
  relatedLinks: BlogRelatedLink[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-run-a-private-b2b-wholesale-auction",
    title: "How to Run a Private B2B Wholesale Auction Without WhatsApp Chaos",
    description:
      "Learn how wholesalers, liquidators, and distributors replace messy WhatsApp broadcasts and Excel sheets with structured 15-minute private B2B live auctions.",
    category: "Playbook",
    publishedAt: "2026-11-18",
    readTime: "5 min read",
    keywords: [
      "private B2B auction",
      "wholesale auction platform",
      "WhatsApp B2B auction alternative",
      "live wholesale bidding",
      "0% commission auction",
    ],
    sections: [
      {
        heading: "Why WhatsApp and Spreadsheets Break Down at Scale",
        paragraphs: [
          "Most B2B wholesale stock still moves through broadcast lists, PDF price sheets, and 1-on-1 WhatsApp negotiations. When ten buyers ask for the same lot at once, you spend hours replying manually, tracking who offered what, and defending against claims that a lot was sold out of turn.",
          "Worse, static price lists anchor buyers to discounts. Without visible competition, your best stock sells at the lowest acceptable price instead of true market clearing value.",
        ],
        bullets: [
          "No real-time price discovery across all vetted buyers simultaneously",
          "Manual follow-ups delay invoicing and warehouse dispatch",
          "Buyers hesitate when they cannot see if a lot is still available",
        ],
      },
      {
        heading: "The 15-Minute Private Auction Room Format",
        paragraphs: [
          "Instead of running week-long listings, high-velocity wholesalers run focused 15-to-30-minute live rooms. You upload your lots once, set a starting price and minimum bid increment, and share a single invite link with your approved buyer list.",
          "Every buyer joins the same live room in their browser—no app download or password reset required—and competes in real time as each lot counts down.",
        ],
        bullets: [
          "Draft and test your auction room for free before going live",
          "Restrict access to vetted B2B buyers via private invite lists",
          "Use 1 Auction Ticket (€25) only when you schedule or launch live",
        ],
      },
      {
        heading: "Zero Commission Means Higher Net Recovery",
        paragraphs: [
          "Traditional B2B auction marketplaces charge 10% to 15% seller or buyer fees on every pallet. On a €20,000 liquidation drop, that is €2,000 to €3,000 lost to platform commission.",
          "With a flat €25 ticket per live auction room and 0% commission on sales, your net recovery stays in your business.",
        ],
      },
    ],
    relatedLinks: [
      { label: "WhatsApp B2B Auction Alternative", href: "/solutions/whatsapp-b2b-auction-alternative" },
      { label: "Free Margin & Fee Savings Calculator", href: "/tools" },
      { label: "See Auction Ticket Pricing", href: "/pricing" },
    ],
  },
  {
    slug: "anti-sniping-in-live-b2b-auctions-explained",
    title: "Anti-Sniping in Live B2B Auctions: Why Soft-Close Timers Increase Lot Prices",
    description:
      "Discover how anti-sniping soft-close timers stop last-second bid sniping, keep wholesale buyers engaged, and consistently lift final hammer prices.",
    category: "Auction Mechanics",
    publishedAt: "2026-11-16",
    readTime: "4 min read",
    keywords: [
      "anti-sniping auction",
      "soft close timer",
      "B2B live bidding",
      "wholesale auction mechanics",
      "increase auction recovery",
    ],
    sections: [
      {
        heading: "What Is Bid Sniping in Wholesale Auctions?",
        paragraphs: [
          "In a hard-close auction, experienced buyers wait until the final two seconds to place a bid so competitors have no time to react. When that happens, other buyers walk away frustrated and you leave money on the table.",
        ],
      },
      {
        heading: "How Soft-Close Anti-Sniping Works",
        paragraphs: [
          "An anti-snipe timer automatically extends the lot countdown whenever a bid arrives in the final seconds. For example, with a 15-second anti-snipe window, any bid placed with 5 seconds left resets the timer back to 15 seconds.",
          "This gives every serious buyer in the room a fair chance to counter, turning the final moments of a lot into true price discovery.",
        ],
        bullets: [
          "Configurable anti-snipe window per auction room (e.g. 10s, 15s, 30s)",
          "Real-time WebSocket updates so every bidder sees the exact clock",
          "Supports optional auto-bid maximums for buyers who cannot watch every second",
        ],
      },
      {
        heading: "Choosing the Right Lot Timer and Bid Increment",
        paragraphs: [
          "For fast-moving wholesale drops with 10 to 30 lots, a 60-to-120-second lot duration paired with a 15-second anti-snipe window keeps momentum high without dragging out the event.",
        ],
      },
    ],
    relatedLinks: [
      { label: "How ArcBids Works", href: "/how-it-works" },
      { label: "Calculate Ideal Bid Increments", href: "/tools" },
    ],
  },
  {
    slug: "itad-and-refurbished-electronics-liquidation-guide",
    title: "ITAD & Refurbished Smartphone Liquidation: Fixed-Price Lists vs. Live Lot Auctions",
    description:
      "Compare static CSV stocklists against live B2B lot auctions for ITAD hardware, Grade A/B/C smartphones, laptops, and enterprise servers.",
    category: "ITAD & Electronics",
    publishedAt: "2026-11-14",
    readTime: "5 min read",
    keywords: [
      "ITAD hardware auctions",
      "B2B smartphone stock auctions",
      "refurbished electronics wholesale",
      "IT asset disposition liquidation",
    ],
    sections: [
      {
        heading: "The Problem With Static Stocklists in Electronics Wholesale",
        paragraphs: [
          "Electronics and smartphone stock depreciates weekly. Sending a CSV to 40 buyers means your A-grade iPhones get cherry-picked immediately while lower-margin Grade B/C lots sit unsold in the warehouse.",
        ],
      },
      {
        heading: "Structuring Lots for Maximum ITAD Recovery",
        paragraphs: [
          "In a live B2B auction room, you can group mixed grades into balanced lots or run sequential lots by model and grade. Buyers bid on the exact lot manifest with transparent starting prices and clear condition notes.",
        ],
        bullets: [
          "Clear grade, IMEI/serial batch counts, and battery/cosmetic notes per lot",
          "Vetted buyer lists so only verified ITAD & refurbishers can bid",
          "Instant post-auction results showing winning buyer, email, and final price",
        ],
      },
    ],
    relatedLinks: [
      { label: "ITAD Hardware Auctions", href: "/solutions/itad-hardware-auctions" },
      { label: "B2B Smartphone Stock Auctions", href: "/solutions/b2b-smartphone-stock-auctions" },
    ],
  },
  {
    slug: "how-to-price-liquidation-pallets-and-overstock-lots",
    title: "How to Price Liquidation Pallets and Overstock Lots for Maximum Recovery",
    description:
      "A practical framework for setting starting bids, reserve floors, and minimum bid steps on liquidation pallets, customer returns, and fashion stocklots.",
    category: "Pricing Strategy",
    publishedAt: "2026-11-12",
    readTime: "4 min read",
    keywords: [
      "liquidation pallet pricing",
      "overstock lot auction",
      "wholesale starting bid",
      "B2B liquidation recovery",
    ],
    sections: [
      {
        heading: "Start Low Enough to Trigger Early Competition",
        paragraphs: [
          "The biggest mistake in pallet liquidation is setting the starting bid at your target retail recovery. High opening prices freeze the room—nobody wants to place the first bid.",
          "Setting your opening bid slightly below target wholesale value encourages 3 to 5 buyers to enter early, and competition carries the lot past your target.",
        ],
      },
      {
        heading: "Pick a Minimum Bid Increment That Fits the Lot Size",
        paragraphs: [
          "If a pallet is worth €2,000, a €5 minimum increment slows bidding down, while a €250 step scares off incremental raises. Aim for roughly 2% to 5% of the expected lot value.",
        ],
        bullets: [
          "€500–€1,500 lots: €20–€50 minimum increment",
          "€2,000–€10,000 lots: €50–€200 minimum increment",
          "€10,000+ machinery or bulk stocklots: €250–€500 minimum increment",
        ],
      },
    ],
    relatedLinks: [
      { label: "Liquidation Pallet Auctions", href: "/solutions/liquidation-pallet-auctions" },
      { label: "Fashion Overstock Lot Auctions", href: "/solutions/fashion-overstock-lot-auctions" },
      { label: "Free Wholesale Margin Calculator", href: "/tools" },
    ],
  },
  {
    slug: "invite-only-buyer-lists-why-vetted-b2b-rooms-win",
    title: "Invite-Only Buyer Lists: Why Vetted B2B Auction Rooms Outperform Open Marketplaces",
    description:
      "Why serious wholesalers prefer private, invite-only buyer lists over open public marketplaces—protecting brand pricing, preventing non-payers, and speeding up settlement.",
    category: "Buyer Management",
    publishedAt: "2026-11-10",
    readTime: "4 min read",
    keywords: [
      "invite only B2B auction",
      "vetted buyer list",
      "private wholesale marketplace",
      "B2B auction room",
    ],
    sections: [
      {
        heading: "Protect Your Brand and Distribution Channels",
        paragraphs: [
          "Open liquidation marketplaces expose your wholesale prices and overstock volume to the public. With an invite-only auction room, only approved trade buyers you have vetted can view lots and place bids.",
        ],
      },
      {
        heading: "Eliminate Time-Wasters and Non-Paying Bidders",
        paragraphs: [
          "When every bidder in the room is an approved trade partner from your Buyer Lists, post-auction fulfillment is fast and predictable. If a buyer ever violates terms, you can ban them from a list or organization with one click.",
        ],
        bullets: [
          "Segment buyers by niche (e.g. EU Electronics, Pallet Liquidators, Export)",
          "Share one magic invite link—no complex account onboarding for buyers",
          "Export winning bids immediately after the room closes",
        ],
      },
    ],
    relatedLinks: [
      { label: "Industrial Surplus Machinery", href: "/solutions/industrial-surplus-machinery-auctions" },
      { label: "Launch Your First Room", href: "/dashboard" },
    ],
  },
];

export const BLOG_POSTS_DE: BlogPost[] = [
  {
    slug: "how-to-run-a-private-b2b-wholesale-auction",
    title: "Wie Sie eine private B2B-Großhandelsauktion ohne WhatsApp-Chaos durchführen",
    description:
      "Erfahren Sie, wie Großhändler, Liquidatoren und Distributoren unübersichtliche WhatsApp-Broadcasts und Excel-Listen durch strukturierte 15-Minuten-Live-Auktionen ersetzen.",
    category: "Leitfaden",
    publishedAt: "2026-11-18",
    readTime: "5 Min. Lesezeit",
    keywords: [
      "private B2B Auktion",
      "Großhandel Auktionsplattform",
      "WhatsApp B2B Auktion Alternative",
      "Live Großhandelsauktion",
      "0% Provision Auktion",
    ],
    sections: [
      {
        heading: "Warum WhatsApp und Excel-Listen bei Wachstum scheitern",
        paragraphs: [
          "Ein Großteil des B2B-Großhandels läuft noch immer über Broadcast-Listen, PDF-Preislisten und 1-zu-1-Verhandlungen per WhatsApp. Wenn zehn Käufer gleichzeitig nach demselben Posten fragen, verbringen Sie Stunden mit manuellen Antworten und müssen rechtfertigen, wer zuerst geboten hat.",
          "Noch schlimmer: Statische Preislisten verleiten Käufer zum Feilschen. Ohne sichtbaren Wettbewerb verkaufen Sie Ihre besten Posten oft zum Mindestpreis statt zum echten Marktwert.",
        ],
        bullets: [
          "Keine Echtzeit-Preisfindung über alle geprüften Käufer hinweg",
          "Manuelle Rückfragen verzögern Rechnungsstellung und Versand",
          "Käufer zögern, wenn die aktuelle Verfügbarkeit unklar ist",
        ],
      },
      {
        heading: "Das 15-Minuten-Format für private Auktionsräume",
        paragraphs: [
          "Statt wochenlanger Inserate setzen schnelle Großhändler auf fokussierte 15- bis 30-minütige Live-Räume. Sie laden Ihre Lose einmal hoch, legen Startpreis und Gebotsschritt fest und teilen einen einzigen Einladungslink mit Ihrer freigegebenen Käuferliste.",
          "Jeder Käufer tritt demselben Live-Raum direkt im Browser bei – ohne App-Download oder Passwort-Reset – und bietet in Echtzeit mit.",
        ],
        bullets: [
          "Auktionsräume vorab kostenlos als Entwurf erstellen und testen",
          "Zugriff über private Käuferlisten auf geprüfte B2B-Händler beschränken",
          "Nur beim Planen oder Live-Schalten 1 Auktions-Ticket (25 €) einsetzen",
        ],
      },
      {
        heading: "0 % Provision bedeutet höhere Netto-Erlöse",
        paragraphs: [
          "Klassische B2B-Auktionsmarktplätze verlangen 10 % bis 15 % Provision pro Palette. Bei einem Abverkauf von 20.000 € gehen so schnell 2.000 € bis 3.000 € an Gebühren verloren.",
          "Mit pauschal 25 € pro Live-Auktion und 0 % Verkaufsprovision bleibt der gesamte Erlös in Ihrem Unternehmen.",
        ],
      },
    ],
    relatedLinks: [
      { label: "WhatsApp B2B-Auktions-Alternative", href: "/solutions/whatsapp-b2b-auction-alternative" },
      { label: "Kostenloser Margen- & Gebührenrechner", href: "/tools" },
      { label: "Auktions-Ticket-Preise ansehen", href: "/pricing" },
    ],
  },
  {
    slug: "anti-sniping-in-live-b2b-auctions-explained",
    title: "Anti-Sniping in Live-B2B-Auktionen: Warum Soft-Close-Timer höhere Preise erzielen",
    description:
      "Erfahren Sie, wie Anti-Sniping-Timer Gebote in letzter Sekunde verhindern, Großhandelskäufer aktiv halten und den Zuschlagspreis steigern.",
    category: "Auktionsmechanik",
    publishedAt: "2026-11-16",
    readTime: "4 Min. Lesezeit",
    keywords: [
      "Anti-Sniping Auktion",
      "Soft-Close Timer",
      "B2B Live-Gebote",
      "Großhandel Auktionsmechanik",
      "Auktionserlös steigern",
    ],
    sections: [
      {
        heading: "Was ist Bid-Sniping bei Großhandelsauktionen?",
        paragraphs: [
          "Bei einer Auktion mit hartem Ende warten erfahrene Käufer bis zu den letzten zwei Sekunden, damit Konkurrenten nicht mehr reagieren können. Andere Bieter springen frustriert ab und Sie verschenken Marge.",
        ],
      },
      {
        heading: "So funktioniert der Soft-Close-Anti-Snipe-Timer",
        paragraphs: [
          "Ein Anti-Snipe-Timer verlängert den Countdown automatisch, sobald in den letzten Sekunden ein neues Gebot eingeht. Bei einem 15-Sekunden-Fenster springt der Timer beispielsweise bei einem späten Gebot wieder auf 15 Sekunden zurück.",
          "So erhält jeder seriöse Käufer eine faire Chance zum Nachlegen – und die Schlussphase wird zur echten Preisfindung.",
        ],
        bullets: [
          "Konfigurierbares Anti-Snipe-Fenster pro Raum (z. B. 10s, 15s, 30s)",
          "Echtzeit-Synchronisation über WebSockets für alle Bieter",
          "Optionales Auto-Bid-Maximum für Käufer, die nicht jede Sekunde zusehen können",
        ],
      },
      {
        heading: "Die richtige Los-Laufzeit und Schrittweite wählen",
        paragraphs: [
          "Für schnelle Großhandels-Drops mit 10 bis 30 Losen sorgt eine Los-Dauer von 60 bis 120 Sekunden kombiniert mit 15 Sekunden Anti-Snipe für hohes Tempo ohne unnötige Wartezeiten.",
        ],
      },
    ],
    relatedLinks: [
      { label: "So funktioniert ArcBids", href: "/how-it-works" },
      { label: "Optimale Gebotsschritte berechnen", href: "/tools" },
    ],
  },
  {
    slug: "itad-and-refurbished-electronics-liquidation-guide",
    title: "ITAD & Refurbished-Smartphones: Statische Preislisten vs. Live-Los-Auktionen",
    description:
      "Vergleichen Sie statische CSV-Bestandslisten mit Live-B2B-Auktionen für ITAD-Hardware, Grade-A/B/C-Smartphones, Laptops und Server.",
    category: "ITAD & Elektronik",
    publishedAt: "2026-11-14",
    readTime: "5 Min. Lesezeit",
    keywords: [
      "ITAD Hardware Auktionen",
      "B2B Smartphone Restposten Auktion",
      "Refurbished Elektronik Großhandel",
      "IT Asset Disposition Verwertung",
    ],
    sections: [
      {
        heading: "Das Problem statischer Bestandslisten im Elektronik-Großhandel",
        paragraphs: [
          "Elektronik und Smartphone-Bestände verlieren wöchentlich an Wert. Wenn Sie eine CSV-Liste an 40 Händler senden, werden die A-Ware-iPhones sofort herausgepickt, während B/C-Grade-Posten im Lager liegen bleiben.",
        ],
      },
      {
        heading: "Lose optimal für maximale ITAD-Verwertung strukturieren",
        paragraphs: [
          "In einem Live-Auktionsraum bündeln Sie gemischte Zustandsstufen zu ausgewogenen Losen oder versteigern Modellreihen sequenziell mit klarem Startpreis und Zustandsbeschreibung.",
        ],
        bullets: [
          "Klare Angaben zu Grading, Stückzahl, IMEI-/Serienchargen und Akkuzustand",
          "Geprüfte Käuferlisten, damit nur verifizierte ITAD- & Refurbishing-Partner bieten",
          "Sofortige Auswertung nach Auktionsende inkl. Käufername, E-Mail und Endpreis",
        ],
      },
    ],
    relatedLinks: [
      { label: "ITAD-Hardware-Auktionen", href: "/solutions/itad-hardware-auctions" },
      { label: "B2B-Smartphone-Restposten", href: "/solutions/b2b-smartphone-stock-auctions" },
    ],
  },
  {
    slug: "how-to-price-liquidation-pallets-and-overstock-lots",
    title: "Liquidationspaletten und Überbestände richtig bepreisen für maximale Erlöse",
    description:
      "Ein praxiserprobter Leitfaden für Startgebote, Mindestpreise und Gebotsschritte bei Retourenpaletten, Sonderposten und Mode-Überhängen.",
    category: "Preisstrategie",
    publishedAt: "2026-11-12",
    readTime: "4 Min. Lesezeit",
    keywords: [
      "Liquidationspaletten Preisgestaltung",
      "Überbestände versteigern",
      "Großhandel Startgebot festlegen",
      "B2B Retouren Verwertung",
    ],
    sections: [
      {
        heading: "Niedrig genug starten, um frühen Wettbewerb auszulösen",
        paragraphs: [
          "Der häufigste Fehler bei Palettenauktionen ist ein Startpreis auf Höhe des Wunsch-Endpreises. Hohe Startgebote bremsen den Raum aus – niemand möchte das erste Gebot abgeben.",
          "Ein Startpreis leicht unter dem Zielwert motiviert 3 bis 5 Käufer zum Einstieg; der Wettbewerb treibt den Preis anschließend oft über das Ziel hinaus.",
        ],
      },
      {
        heading: "Den passenden Gebotsschritt zur Losgröße wählen",
        paragraphs: [
          "Bei einer Palette im Wert von 2.000 € bremst ein 5-€-Schritt die Auktion, während 250 € zu hoch sind. Ideal sind etwa 2 % bis 5 % des erwarteten Loswerts.",
        ],
        bullets: [
          "500 € – 1.500 € Lose: 20 € – 50 € Mindestschritt",
          "2.000 € – 10.000 € Lose: 50 € – 200 € Mindestschritt",
          "10.000 €+ Maschinen oder Großposten: 250 € – 500 € Mindestschritt",
        ],
      },
    ],
    relatedLinks: [
      { label: "Liquidationspaletten-Auktionen", href: "/solutions/liquidation-pallet-auctions" },
      { label: "Mode-Überhang-Auktionen", href: "/solutions/fashion-overstock-lot-auctions" },
      { label: "Kostenloser Margenrechner", href: "/tools" },
    ],
  },
  {
    slug: "invite-only-buyer-lists-why-vetted-b2b-rooms-win",
    title: "Exklusive Käuferlisten: Warum geprüfte B2B-Räume offenen Marktplätzen überlegen sind",
    description:
      "Warum professionelle Großhändler private Invite-Only-Auktionen offenen Plattformen vorziehen: Preisschutz, zahlungssichere Bieter und schnelle Abwicklung.",
    category: "Käufermanagement",
    publishedAt: "2026-11-10",
    readTime: "4 Min. Lesezeit",
    keywords: [
      "Invite-Only B2B Auktion",
      "geprüfte Käuferliste",
      "privater Großhandelsmarktplatz",
      "B2B Auktionsraum",
    ],
    sections: [
      {
        heading: "Schützen Sie Ihre Marke und Vertriebskanäle",
        paragraphs: [
          "Offene Liquidationsportale machen Ihre Großhandelspreise und Überbestände öffentlich sichtbar. In einem privaten Auktionsraum sehen nur freigegebene Handelspartner Ihre Lose und Gebote.",
        ],
      },
      {
        heading: "Keine Spaßbieter und schnelle Abwicklung",
        paragraphs: [
          "Wenn ausschließlich geprüfte B2B-Käufer aus Ihren Käuferlisten teilnehmen, verläuft die Abwicklung nach Auktionsende reibungslos. Verstößt ein Käufer gegen Regeln, lässt er sich mit einem Klick sperren.",
        ],
        bullets: [
          "Käufer nach Branchen segmentieren (z. B. EU-Elektronik, Palettenhändler, Export)",
          "Einen einzigen Einladungslink teilen – kein kompliziertes Onboarding",
          "Zuschläge direkt nach Auktionsende auswerten und exportieren",
        ],
      },
    ],
    relatedLinks: [
      { label: "Industriemaschinen & Überbestände", href: "/solutions/industrial-surplus-machinery-auctions" },
      { label: "Ersten Raum starten", href: "/dashboard" },
    ],
  },
];

export const BLOG_POSTS_ES: BlogPost[] = [
  {
    slug: "how-to-run-a-private-b2b-wholesale-auction",
    title: "Cómo organizar una subasta B2B privada sin el caos de WhatsApp",
    description:
      "Descubre cómo los mayoristas y liquidadores reemplazan las listas de difusión de WhatsApp y hojas de Excel por subastas en vivo de 15 minutos.",
    category: "Guía",
    publishedAt: "2026-11-18",
    readTime: "5 min de lectura",
    keywords: ["subasta B2B privada", "subasta mayorista", "alternativa WhatsApp B2B"],
    sections: [
      {
        heading: "Por qué WhatsApp y Excel fallan al escalar",
        paragraphs: [
          "Gran parte del stock mayorista aún se vende por listas de WhatsApp y hojas PDF. Cuando diez compradores preguntan por el mismo lote a la vez, pierdes horas respondiendo manualmente.",
          "Sin competencia visible, tus mejores lotes se venden al precio mínimo en lugar del valor real de mercado.",
        ],
        bullets: [
          "Sin descubrimiento de precios en tiempo real entre compradores verificados",
          "Seguimientos manuales que retrasan la facturación y el envío",
          "Dudas de los compradores al no ver si el lote sigue disponible",
        ],
      },
      {
        heading: "El formato de sala privada de 15 minutos",
        paragraphs: [
          "Sube tus lotes una sola vez, fija precio inicial e incremento mínimo y comparte un único enlace con tu lista de compradores aprobados.",
          "Todos compiten en el navegador en tiempo real con protección anti-snipe.",
        ],
        bullets: [
          "Crea y prueba borradores gratis antes de salir en vivo",
          "Restringe el acceso por correo electrónico o número de teléfono",
          "Usa 1 Ticket (€25) solo al programar o iniciar en vivo",
        ],
      },
    ],
    relatedLinks: [
      { label: "Alternativa B2B a WhatsApp", href: "/solutions/whatsapp-b2b-auction-alternative" },
      { label: "Calculadora de Margen Gratuita", href: "/tools" },
      { label: "Ver Precios", href: "/pricing" },
    ],
  },
  {
    slug: "anti-sniping-in-live-b2b-auctions-explained",
    title: "Anti-Sniping en Subastas B2B: Por qué el cierre flexible sube el precio final",
    description:
      "Cómo los temporizadores anti-snipe evitan las pujas de último segundo y aumentan el valor de cierre de tus lotes.",
    category: "Mecánica",
    publishedAt: "2026-11-16",
    readTime: "4 min de lectura",
    keywords: ["anti-sniping", "subastas B2B", "temporizador flexible"],
    sections: [
      {
        heading: "¿Qué es el Bid Sniping?",
        paragraphs: [
          "En subastas de cierre fijo, los compradores esperan a los últimos 2 segundos para pujar sin dar tiempo de reacción a sus competidores.",
        ],
      },
      {
        heading: "Cómo funciona el temporizador Anti-Snipe",
        paragraphs: [
          "Cada puja en los últimos segundos reinicia la ventana anti-snipe (por ejemplo, 15 segundos), dando a todos una oportunidad justa de responder.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Cómo funciona ArcBids", href: "/how-it-works" },
      { label: "Calcular Incrementos", href: "/tools" },
    ],
  },
  {
    slug: "itad-and-refurbished-electronics-liquidation-guide",
    title: "ITAD y Smartphones Reacondicionados: Listas fijas vs. Subastas en vivo",
    description:
      "Compara las listas CSV estáticas con las subastas B2B en vivo para hardware ITAD, smartphones Grade A/B/C, portátiles y servidores.",
    category: "ITAD y Electrónica",
    publishedAt: "2026-11-14",
    readTime: "5 min de lectura",
    keywords: ["subastas ITAD", "smartphones B2B", "electrónica reacondicionada"],
    sections: [
      {
        heading: "El problema de las listas estáticas",
        paragraphs: [
          "La electrónica pierde valor cada semana. Con listas CSV, los compradores eligen solo el Grado A y el resto se queda en el almacén.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Subastas de Hardware ITAD", href: "/solutions/itad-hardware-auctions" },
      { label: "Subastas de Smartphones B2B", href: "/solutions/b2b-smartphone-stock-auctions" },
    ],
  },
  {
    slug: "how-to-price-liquidation-pallets-and-overstock-lots",
    title: "Cómo fijar el precio de palés de liquidación para maximizar el retorno",
    description:
      "Guía práctica para definir pujas iniciales e incrementos mínimos en palés de devoluciones y sobrestock.",
    category: "Estrategia de Precios",
    publishedAt: "2026-11-12",
    readTime: "4 min de lectura",
    keywords: ["precios palés liquidación", "sobrestock B2B"],
    sections: [
      {
        heading: "Empieza lo bastante bajo para activar la competencia",
        paragraphs: [
          "Un precio de salida ligeramente por debajo del objetivo anima a 3–5 compradores a pujar pronto y eleva el precio final.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Subastas de Palés", href: "/solutions/liquidation-pallet-auctions" },
      { label: "Calculadora de Margen", href: "/tools" },
    ],
  },
  {
    slug: "invite-only-buyer-lists-why-vetted-b2b-rooms-win",
    title: "Listas Privadas de Compradores: Por qué ganan frente a mercados abiertos",
    description:
      "Por qué los mayoristas prefieren salas privadas con compradores verificados para proteger precios y agilizar cobros.",
    category: "Gestión de Compradores",
    publishedAt: "2026-11-10",
    readTime: "4 min de lectura",
    keywords: ["subasta privada B2B", "lista de compradores"],
    sections: [
      {
        heading: "Protege tu marca y evita impagos",
        paragraphs: [
          "Solo los socios comerciales aprobados en tus Listas de Compradores (por correo o teléfono) pueden ver y pujar en tus salas privadas.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Maquinaria y Excedentes", href: "/solutions/industrial-surplus-machinery-auctions" },
      { label: "Abrir Panel", href: "/dashboard" },
    ],
  },
];

export const BLOG_POSTS_FR: BlogPost[] = [
  {
    slug: "how-to-run-a-private-b2b-wholesale-auction",
    title: "Comment organiser une enchère B2B privée sans le chaos WhatsApp",
    description:
      "Découvrez comment les grossistes remplacent les messages WhatsApp et fichiers Excel par des enchères en direct de 15 minutes.",
    category: "Guide",
    publishedAt: "2026-11-18",
    readTime: "5 min de lecture",
    keywords: ["enchère B2B privée", "vente en gros", "alternative WhatsApp"],
    sections: [
      {
        heading: "Pourquoi WhatsApp et Excel atteignent leurs limites",
        paragraphs: [
          "Gérer dix acheteurs en parallèle par message fait perdre des heures et empêche la découverte réelle des prix.",
        ],
        bullets: [
          "Enchères synchronisées en temps réel entre acheteurs vérifiés",
          "Brouillons gratuits et 1 Ticket (25 €) uniquement au lancement",
          "0 % de commission pendant tout 2026",
        ],
      },
    ],
    relatedLinks: [
      { label: "Alternative B2B à WhatsApp", href: "/solutions/whatsapp-b2b-auction-alternative" },
      { label: "Calculateur de Marge", href: "/tools" },
      { label: "Voir les Tarifs", href: "/pricing" },
    ],
  },
  {
    slug: "anti-sniping-in-live-b2b-auctions-explained",
    title: "Anti-Sniping en Enchères B2B : Pourquoi le Soft-Close augmente les prix",
    description:
      "Comment le chronomètre anti-snipe empêche les offres de dernière seconde et maximise le prix final.",
    category: "Mécanique",
    publishedAt: "2026-11-16",
    readTime: "4 min de lecture",
    keywords: ["anti-sniping", "enchères B2B"],
    sections: [
      {
        heading: "Comment fonctionne l'Anti-Snipe",
        paragraphs: [
          "Toute offre dans les dernières secondes prolonge automatiquement le chrono (ex. 15s) pour laisser une chance équitable de surenchérir.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Fonctionnement d'ArcBids", href: "/how-it-works" },
      { label: "Calculer les Paliers", href: "/tools" },
    ],
  },
  {
    slug: "itad-and-refurbished-electronics-liquidation-guide",
    title: "ITAD & Smartphones Reconditionnés : Listes fixes vs Enchères Live",
    description:
      "Comparez les listes CSV statiques aux enchères B2B en direct pour le matériel ITAD et les lots de smartphones.",
    category: "ITAD & Électronique",
    publishedAt: "2026-11-14",
    readTime: "5 min de lecture",
    keywords: ["ITAD", "smartphones B2B"],
    sections: [
      {
        heading: "Évitez l'écrémage de vos stocks",
        paragraphs: [
          "Les enchères par lots permettent d'écouler tous vos grades A, B et C rapidement à leur juste valeur.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Enchères ITAD", href: "/solutions/itad-hardware-auctions" },
      { label: "Lots Smartphones", href: "/solutions/b2b-smartphone-stock-auctions" },
    ],
  },
  {
    slug: "how-to-price-liquidation-pallets-and-overstock-lots",
    title: "Comment fixer le prix des palettes de liquidation et surstocks",
    description:
      "Méthode pratique pour définir le prix de départ et le palier minimum sur vos palettes.",
    category: "Stratégie Prix",
    publishedAt: "2026-11-12",
    readTime: "4 min de lecture",
    keywords: ["palettes liquidation", "surstock B2B"],
    sections: [
      {
        heading: "Déclenchez la concurrence dès le départ",
        paragraphs: [
          "Un prix de départ légèrement sous l'objectif attire plusieurs enchérisseurs dès les premières secondes.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Enchères Palettes", href: "/solutions/liquidation-pallet-auctions" },
      { label: "Calculateur gratuit", href: "/tools" },
    ],
  },
  {
    slug: "invite-only-buyer-lists-why-vetted-b2b-rooms-win",
    title: "Listes d'Acheteurs Privées : Pourquoi les salles vérifiées gagnent",
    description:
      "Protégez vos prix de gros et évitez les acheteurs non sérieux grâce aux listes privées par e-mail ou téléphone.",
    category: "Gestion Acheteurs",
    publishedAt: "2026-11-10",
    readTime: "4 min de lecture",
    keywords: ["liste acheteurs B2B", "enchère privée"],
    sections: [
      {
        heading: "Des partenaires commerciaux vérifiés uniquement",
        paragraphs: [
          "Seuls les acheteurs approuvés dans vos Listes d'Acheteurs peuvent entrer et enchérir dans vos salles privées.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Surplus Industriel", href: "/solutions/industrial-surplus-machinery-auctions" },
      { label: "Ouvrir le Tableau de Bord", href: "/dashboard" },
    ],
  },
];

export const BLOG_POSTS_NL: BlogPost[] = [
  {
    slug: "how-to-run-a-private-b2b-wholesale-auction",
    title: "Hoe je een besloten B2B-groothandelsveiling start zonder WhatsApp-chaos",
    description:
      "Ontdek hoe groothandels WhatsApp-lijsten en Excel vervangen door gestructureerde live veilingen van 15 minuten.",
    category: "Handleiding",
    publishedAt: "2026-11-18",
    readTime: "5 min leestijd",
    keywords: ["besloten B2B veiling", "groothandel", "WhatsApp alternatief"],
    sections: [
      {
        heading: "Waarom WhatsApp en Excel niet schalen",
        paragraphs: [
          "Handmatig reageren op tien kopers tegelijk kost uren en leidt vaak tot verkopen onder de marktwaarde.",
        ],
        bullets: [
          "Real-time prijsvorming met goedgekeurde kopers",
          "Concepten zijn gratis — €25 per ticket bij start of planning",
          "0% commissie gedurende heel 2026",
        ],
      },
    ],
    relatedLinks: [
      { label: "WhatsApp B2B Alternatief", href: "/solutions/whatsapp-b2b-auction-alternative" },
      { label: "Gratis Margecalculator", href: "/tools" },
      { label: "Prijzen Bekijken", href: "/pricing" },
    ],
  },
  {
    slug: "anti-sniping-in-live-b2b-auctions-explained",
    title: "Anti-Sniping bij Live B2B-Veilingen: Waarom soft-close timers meer opleveren",
    description:
      "Hoe een anti-snipe timer biedingen in de laatste seconde opvangt en de eindprijs verhoogt.",
    category: "Veilingmechaniek",
    publishedAt: "2026-11-16",
    readTime: "4 min leestijd",
    keywords: ["anti-sniping", "B2B veiling"],
    sections: [
      {
        heading: "Zo werkt Anti-Snipe",
        paragraphs: [
          "Een bod in de laatste seconden verlengt de klok automatisch (bijv. 15s) zodat elke koper eerlijk kan reageren.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Hoe ArcBids werkt", href: "/how-it-works" },
      { label: "Biedstappen Berekenen", href: "/tools" },
    ],
  },
  {
    slug: "itad-and-refurbished-electronics-liquidation-guide",
    title: "ITAD & Refurbished Smartphones: Vaste lijsten vs. Live Veilingen",
    description:
      "Vergelijk statische CSV-lijsten met live B2B-veilingen voor ITAD-hardware en smartphone-partijen.",
    category: "ITAD & Elektronica",
    publishedAt: "2026-11-14",
    readTime: "5 min leestijd",
    keywords: ["ITAD veilingen", "smartphones groothandel"],
    sections: [
      {
        heading: "Voorkom dat alleen A-grade wordt weggekaapt",
        paragraphs: [
          "Met live kavelveilingen verkoop je zowel Grade A als B/C-partijen sneller tegen eerlijke marktprijzen.",
        ],
      },
    ],
    relatedLinks: [
      { label: "ITAD Hardware Veilingen", href: "/solutions/itad-hardware-auctions" },
      { label: "Smartphone Voorraad", href: "/solutions/b2b-smartphone-stock-auctions" },
    ],
  },
  {
    slug: "how-to-price-liquidation-pallets-and-overstock-lots",
    title: "Liquidatiepallets en overstock slim prijzen voor maximaal rendement",
    description:
      "Praktische richtlijnen voor startprijzen en biedstappen op retour- en overstockpallets.",
    category: "Prijsstrategie",
    publishedAt: "2026-11-12",
    readTime: "4 min leestijd",
    keywords: ["liquidatiepallets", "overstock veiling"],
    sections: [
      {
        heading: "Start laag genoeg om concurrentie te wekken",
        paragraphs: [
          "Een toegankelijk startbod trekt direct meerdere bieders aan en duwt de uiteindelijke verkoopprijs omhoog.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Liquidatiepallet Veilingen", href: "/solutions/liquidation-pallet-auctions" },
      { label: "Gratis Calculator", href: "/tools" },
    ],
  },
  {
    slug: "invite-only-buyer-lists-why-vetted-b2b-rooms-win",
    title: "Besloten Koperslijsten: Waarom geverifieerde B2B-ruimtes beter presteren",
    description:
      "Bescherm je groothandelsprijzen en voorkom wanbetalers met besloten koperslijsten (e-mail of telefoon).",
    category: "Kopersbeheer",
    publishedAt: "2026-11-10",
    readTime: "4 min leestijd",
    keywords: ["besloten koperslijst", "B2B veiling"],
    sections: [
      {
        heading: "Alleen geverifieerde handelspartners",
        paragraphs: [
          "Kopers krijgen alleen toegang als hun e-mailadres of telefoonnummer op een geselecteerde koperslijst staat.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Industrieel Surplus", href: "/solutions/industrial-surplus-machinery-auctions" },
      { label: "Naar Dashboard", href: "/dashboard" },
    ],
  },
];

export const BLOG_POSTS_TR: BlogPost[] = [
  {
    slug: "how-to-run-a-private-b2b-wholesale-auction",
    title: "WhatsApp Karmaşası Olmadan Özel B2B Toptan Açık Artırma Nasıl Yapılır",
    description:
      "Toptancıların WhatsApp gruplarını ve Excel tablolarını 15 dakikalık canlı açık artırma odalarıyla nasıl değiştirdiğini öğrenin.",
    category: "Rehber",
    publishedAt: "2026-11-18",
    readTime: "5 dk okuma",
    keywords: ["özel B2B açık artırma", "toptan satış", "WhatsApp alternatifi"],
    sections: [
      {
        heading: "WhatsApp ve Excel Neden Yetersiz Kalır?",
        paragraphs: [
          "On alıcıya aynı anda mesajla yanıt vermek saatler sürer ve gerçek piyasa rekabetini engeller.",
        ],
        bullets: [
          "Onaylı alıcılar arasında anlık gerçek zamanlı fiyat oluşumu",
          "Taslaklar ücretsiz — yalnızca başlatırken veya planlarken 1 Bilet (€25)",
          "2026 boyunca %0 komisyon",
        ],
      },
    ],
    relatedLinks: [
      { label: "WhatsApp B2B Alternatifi", href: "/solutions/whatsapp-b2b-auction-alternative" },
      { label: "Ücretsiz Marj Hesaplayıcı", href: "/tools" },
      { label: "Fiyatları Gör", href: "/pricing" },
    ],
  },
  {
    slug: "anti-sniping-in-live-b2b-auctions-explained",
    title: "Canlı B2B Açık Artırmalarda Anti-Sniping: Son Saniye Koruması Neden Kazandırır?",
    description:
      "Anti-snipe zamanlayıcının son saniye tekliflerini nasıl engellediğini ve lot fiyatlarını nasıl artırdığını keşfedin.",
    category: "Mekanik",
    publishedAt: "2026-11-16",
    readTime: "4 dk okuma",
    keywords: ["anti-sniping", "B2B açık artırma"],
    sections: [
      {
        heading: "Anti-Snipe Nasıl Çalışır?",
        paragraphs: [
          "Son saniyelerde gelen her teklif sayacı otomatik uzatır (ör. 15 sn), böylece tüm alıcılar adil şekilde karşılık verebilir.",
        ],
      },
    ],
    relatedLinks: [
      { label: "ArcBids Nasıl Çalışır", href: "/how-it-works" },
      { label: "Artış Miktarını Hesapla", href: "/tools" },
    ],
  },
  {
    slug: "itad-and-refurbished-electronics-liquidation-guide",
    title: "ITAD ve Yenilenmiş Akıllı Telefonlar: Sabit Liste vs. Canlı Açık Artırma",
    description:
      "ITAD donanımları ve Grade A/B/C telefon partileri için statik CSV listelerini canlı B2B açık artırmalarla karşılaştırın.",
    category: "ITAD ve Elektronik",
    publishedAt: "2026-11-14",
    readTime: "5 dk okuma",
    keywords: ["ITAD açık artırma", "toptan telefon"],
    sections: [
      {
        heading: "Stokların Seçilip Kalmasını Önleyin",
        paragraphs: [
          "Canlı lot açık artırmaları tüm kalite sınıflarını hızlı ve şeffaf biçimde elden çıkarmanızı sağlar.",
        ],
      },
    ],
    relatedLinks: [
      { label: "ITAD Donanım Açık Artırmaları", href: "/solutions/itad-hardware-auctions" },
      { label: "B2B Akıllı Telefon Stokları", href: "/solutions/b2b-smartphone-stock-auctions" },
    ],
  },
  {
    slug: "how-to-price-liquidation-pallets-and-overstock-lots",
    title: "Maksimum Gelir İçin Tasfiye Paletleri Nasıl Fiyatlandırılır",
    description:
      "İade ve stok fazlası paletlerde başlangıç teklifi ve minimum artış belirleme rehberi.",
    category: "Fiyatlandırma",
    publishedAt: "2026-11-12",
    readTime: "4 dk okuma",
    keywords: ["tasfiye paleti", "toptan fiyatlandırma"],
    sections: [
      {
        heading: "Erken Rekabeti Başlatacak Seviyeden Açın",
        paragraphs: [
          "Hedefin biraz altından açılan lotlar daha fazla alıcıyı çeker ve rekabet fiyatı yukarı taşır.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Tasfiye Paleti Açık Artırmaları", href: "/solutions/liquidation-pallet-auctions" },
      { label: "Ücretsiz Hesaplayıcı", href: "/tools" },
    ],
  },
  {
    slug: "invite-only-buyer-lists-why-vetted-b2b-rooms-win",
    title: "Özel Alıcı Listeleri: Onaylı B2B Odaları Neden Daha Verimlidir?",
    description:
      "E-posta veya telefonla oluşturulan özel alıcı listeleriyle fiyatlarınızı koruyun ve ödemeleri hızlandırın.",
    category: "Alıcı Yönetimi",
    publishedAt: "2026-11-10",
    readTime: "4 dk okuma",
    keywords: ["özel alıcı listesi", "B2B açık artırma"],
    sections: [
      {
        heading: "Yalnızca Onaylı İş Ortakları",
        paragraphs: [
          "Özel odalara yalnızca Alıcı Listelerinizde kayıtlı e-posta veya telefon numarasına sahip alıcılar girebilir.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Endüstriyel Stok Fazlası", href: "/solutions/industrial-surplus-machinery-auctions" },
      { label: "Paneli Aç", href: "/dashboard" },
    ],
  },
];

export const BLOG_POSTS_RU: BlogPost[] = [
  {
    slug: "how-to-run-a-private-b2b-wholesale-auction",
    title: "Как провести закрытый B2B-аукцион без хаоса в WhatsApp",
    description:
      "Узнайте, как оптовики заменяют рассылки в WhatsApp и Excel-таблицы на 15-минутные живые аукционы.",
    category: "Руководство",
    publishedAt: "2026-11-18",
    readTime: "5 мин чтения",
    keywords: ["закрытый B2B аукцион", "оптовые торги", "альтернатива WhatsApp"],
    sections: [
      {
        heading: "Почему WhatsApp и Excel тормозят продажи",
        paragraphs: [
          "Ручная переписка с десятками покупателей отнимает часы и не дает реального рыночного роста цены.",
        ],
        bullets: [
          "Прозрачная конкуренция среди проверенных покупателей в реальном времени",
          "Черновики бесплатны — €25 за билет только при запуске или планировании",
          "Комиссия 0% весь 2026 год",
        ],
      },
    ],
    relatedLinks: [
      { label: "Альтернатива WhatsApp для B2B", href: "/solutions/whatsapp-b2b-auction-alternative" },
      { label: "Калькулятор Маржи", href: "/tools" },
      { label: "Смотреть Цены", href: "/pricing" },
    ],
  },
  {
    slug: "anti-sniping-in-live-b2b-auctions-explained",
    title: "Анти-снайпинг на B2B-аукционах: как мягкое закрытие повышает цену",
    description:
      "Как таймер анти-снайпинга защищает последние секунды торгов и увеличивает итоговую выручку.",
    category: "Механика",
    publishedAt: "2026-11-16",
    readTime: "4 мин чтения",
    keywords: ["анти-снайпинг", "B2B аукцион"],
    sections: [
      {
        heading: "Как работает Анти-Снайпинг",
        paragraphs: [
          "Ставка в последние секунды автоматически продлевает таймер (например, на 15с), давая конкурентам шанс ответить.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Как работает ArcBids", href: "/how-it-works" },
      { label: "Расчет шага ставки", href: "/tools" },
    ],
  },
  {
    slug: "itad-and-refurbished-electronics-liquidation-guide",
    title: "ITAD и смартфоны: статичные прайс-листы против живых аукционов",
    description:
      "Сравнение CSV-прайсов и живых B2B-аукционов для ITAD-оборудования и партий смартфонов.",
    category: "ITAD и Электроника",
    publishedAt: "2026-11-14",
    readTime: "5 мин чтения",
    keywords: ["ITAD аукционы", "смартфоны оптом"],
    sections: [
      {
        heading: "Продавайте все грейды, а не только Grade A",
        paragraphs: [
          "Живые лоты позволяют быстро реализовать сбалансированные партии электроники до падения рыночной цены.",
        ],
      },
    ],
    relatedLinks: [
      { label: "ITAD-аукционы", href: "/solutions/itad-hardware-auctions" },
      { label: "Партии смартфонов", href: "/solutions/b2b-smartphone-stock-auctions" },
    ],
  },
  {
    slug: "how-to-price-liquidation-pallets-and-overstock-lots",
    title: "Как оценить паллеты ликвидации и стоки для максимальной выручки",
    description:
      "Практические советы по выбору стартовой цены и минимального шага для оптовых паллет.",
    category: "Ценообразование",
    publishedAt: "2026-11-12",
    readTime: "4 мин чтения",
    keywords: ["оценка паллет", "оптовые стоки"],
    sections: [
      {
        heading: "Стартуйте достаточно низко, чтобы запустить конкуренцию",
        paragraphs: [
          "Доступная стартовая цена вовлекает нескольких покупателей с первых секунд и поднимает финальную ставку.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Паллеты ликвидации", href: "/solutions/liquidation-pallet-auctions" },
      { label: "Бесплатный калькулятор", href: "/tools" },
    ],
  },
  {
    slug: "invite-only-buyer-lists-why-vetted-b2b-rooms-win",
    title: "Закрытые списки покупателей: почему приватные B2B-залы эффективнее",
    description:
      "Защитите оптовые цены и исключите случайных участников с помощью списков по email или телефону.",
    category: "Покупатели",
    publishedAt: "2026-11-10",
    readTime: "4 мин чтения",
    keywords: ["список покупателей", "закрытый B2B аукцион"],
    sections: [
      {
        heading: "Только проверенные партнеры",
        paragraphs: [
          "Доступ в закрытую комнату получают только покупатели из ваших списков по email или номеру телефона.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Промышленные излишки", href: "/solutions/industrial-surplus-machinery-auctions" },
      { label: "Открыть Панель", href: "/dashboard" },
    ],
  },
];

const BLOG_BY_LOCALE: Record<Locale, BlogPost[]> = {
  [Locale.EN]: BLOG_POSTS,
  [Locale.DE]: BLOG_POSTS_DE,
  [Locale.ES]: BLOG_POSTS_ES,
  [Locale.FR]: BLOG_POSTS_FR,
  [Locale.NL]: BLOG_POSTS_NL,
  [Locale.TR]: BLOG_POSTS_TR,
  [Locale.RU]: BLOG_POSTS_RU,
};

export function getBlogPosts(locale: Locale = Locale.EN): BlogPost[] {
  return BLOG_BY_LOCALE[locale] ?? BLOG_POSTS;
}

export function getBlogPostBySlug(
  slug: string,
  locale: Locale = Locale.EN
): BlogPost | undefined {
  return getBlogPosts(locale).find((post) => post.slug === slug);
}
