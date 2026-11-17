import type { ITranslation } from "../ITranslation";

export const DE: ITranslation = {
  Nav: {
    Auctions: "Auktionen",
    Features: "Funktionen",
    HowItWorks: "So funktioniert's",
    Pricing: "Preise",
    GetStarted: "Jetzt starten",
    DropTitle: "Live-Auktionsraum",
    DropDesc: "Treten Sie einem aktiven Großhandels-Auktionsraum in Echtzeit bei.",
    FeaturesDropTitle: "Plattform-Funktionen",
    FeaturesDropDesc: "Echtzeit-Sync, Anti-Snipe-Timer und verifizierter Käuferzugang.",
  },
  HomePage: {
    MetaTags: {
      url: "/",
      title: "ArcBids — B2B-Großhandelsauktionen in Echtzeit",
      description:
        "Starten Sie private oder öffentliche Großhandels-Auktionsräume in wenigen Minuten – mit Live-Geboten, Anti-Snipe-Schutz und einfachen Käufereinladungen.",
      imgUrl: "/opengraph-image",
      tags: [
        "B2B Auktionen",
        "Großhandel Auktionsplattform",
        "Live Gebote",
        "Restposten Auktion",
        "ArcBids",
      ],
    },
    HeroTitleStart: "B2B-Auktionen in Echtzeit,",
    HeroTitleHighlight: "gebaut für Tempo.",
    HeroSubtitle:
      "Starten Sie private Großhandels-Auktionsräume in Minuten – mit sofortigen Live-Geboten, Anti-Snipe-Schutz und einfachen Käufereinladungen.",
    PrimaryCta: "Jetzt starten",
    SecondaryCta: "So funktioniert's",
    StepsEyebrow: "So funktioniert's",
    StepsTitle: "In drei Schritten zum Live-Raum.",
    Steps: [
      {
        step: "01",
        title: "Auktionsraum erstellen",
        description:
          "Legen Sie Positionen mit Startpreis, Stückzahl, Mindestschritt und Anti-Snipe-Regeln in wenigen Minuten an.",
      },
      {
        step: "02",
        title: "Käufer einladen",
        description:
          "Teilen Sie öffentliche oder exklusive Einladungslinks – geprüfte Käufer treten einfach per Name und E-Mail ohne Passwort bei.",
      },
      {
        step: "03",
        title: "Live durchführen & abschließen",
        description:
          "Verfolgen Sie jedes Gebot in Echtzeit, lassen Sie den Anti-Snipe-Timer fair verlängern und kontaktieren Sie Gewinner direkt.",
      },
    ],
    Showcase: {
      Eyebrow: "Live-Auktions-Erlebnis",
      Title: "Jedes Gebot in Echtzeit erleben.",
      Subtitle:
        "Käufer sehen Fotos, Stückzahlen und Stückpreise live im synchronisierten Raum – inklusive automatischem Anti-Snipe-Schutz.",
    },
    Features: {
      Eyebrow: "Plattform",
      Title: "Entwickelt für Tempo im B2B-Großhandel.",
      AutoBidTitle: "Auto-Gebot & Maximalbetrag",
      AutoBidDesc:
        "Lassen Sie Käufer einmalig ein Maximalgebot festlegen. Automatische Mindestschritte halten den Wettbewerb aktiv und erzielen bessere Preise.",
      AutoBidToggleLabel: "Auto-Gebot",
      AntiSnipeTitle: "Anti-Snipe-Schutz",
      AntiSnipeDesc:
        "Gebote in letzter Sekunde verlängern den Timer automatisch, damit Mitbieter fair reagieren können und der Endpreis maximiert wird.",
      AntiSnipeExtended: "+15s verlängert",
      InvitesTitle: "Private Käufereinladungen",
      InvitesDesc:
        "Laden Sie nur geprüfte Großhandelskunden über exklusive Raum-Links ein und steuern Sie den Zugang jederzeit über Ihre Whitelist.",
      InvitedLabel: "Eingeladen",
      PausedLabel: "Pausiert",
    },
    BottomCtaTitle: "Bereit für Ihren nächsten Großhandels-Drop?",
    BottomCtaSubtitle:
      "Starten Sie in wenigen Minuten Ihren eigenen Auktionsraum mit Live-Geboten.",
  },
  HowItWorksPage: {
    MetaTags: {
      url: "/how-it-works",
      title: "So funktioniert's — ArcBids B2B-Auktionen",
      description:
        "Schritt-für-Schritt-Erklärung, wie Verkäufer Großhandelsauktionen starten und Käufer auf ArcBids in Echtzeit mitbieten.",
      imgUrl: "/opengraph-image",
      tags: ["ArcBids Ablauf", "B2B Auktion", "Anti-Snipe", "Großhandel"],
    },
    Eyebrow: "So funktioniert's",
    TitleStart: "Von Großhandelsposten zum Abschluss —",
    TitleHighlight: "Schritt für Schritt.",
    Subtitle:
      "ArcBids betreibt synchronisierte Live-Auktionsräume direkt im Browser. Hier erfahren Sie genau, wie Verkäufer Räume verwalten und Käufer mitbieten.",
    SellerEyebrow: "Für Verkäufer",
    SellerTitle: "Eine Live-Auktion veranstalten",
    SellerSteps: [
      {
        step: "01",
        title: "Organisation einrichten",
        summary:
          "Melden Sie sich per 6-stelligem E-Mail-Code oder Magic-Link an – ganz ohne Passwort. ArcBids erstellt automatisch Ihren Workspace und Ihre öffentliche Seite (arcbids.com/ihr-name).",
        detail:
          "Organisationsname und URL-Slug können jederzeit im Verkäufer-Dashboard angepasst werden.",
      },
      {
        step: "02",
        title: "Regeln & Zugang festlegen",
        summary:
          "Wählen Sie Titel, Währung (EUR oder USD), Timer pro Position, Anti-Snipe-Zeitfenster und den Mindestgebotsschritt.",
        detail:
          "Wählen Sie zwischen Öffentlich (jeder mit Link kann beitreten) oder Nur auf Einladung (nur freigegebene E-Mails Ihrer Whitelist). Optional können Sie einen Starttermin planen.",
      },
      {
        step: "03",
        title: "Positionen & Fotos hinzufügen",
        summary:
          "Fügen Sie mindestens eine Position mit Titel, Stückzahl, Startpreis, Beschreibung und Fotos hinzu.",
        detail:
          "Hochgeladene Fotos werden automatisch komprimiert. Bei Stückzahlen (z. B. 40 Stück) sehen Käufer live den effektiven Stückpreis.",
      },
      {
        step: "04",
        title: "Link teilen & live gehen",
        summary:
          "Teilen Sie den zufälligen, nicht erratbaren Raum-Link oder Ihre Organisationsseite mit Ihren Käufern.",
        detail:
          "Vor dem Start sehen Käufer eine Vorschau mit Countdown und Kalender-Button. Starten Sie jederzeit manuell oder automatisch zum geplanten Zeitpunkt.",
      },
      {
        step: "05",
        title: "Automatisch abschließen & Gewinner kontaktieren",
        summary:
          "Läuft der Timer einer Position ab, erhält der Höchstbietende den Zuschlag und die nächste Position startet automatisch.",
        detail:
          "Nach Ende der Auktion öffnen Sie im Dashboard das Gewinner-Fenster mit Namen, Endpreis und E-Mail-Kontakt für jeden Zuschlag.",
      },
    ],
    BuyerEyebrow: "Für Käufer",
    BuyerTitle: "Beitreten & mitbieten",
    BuyerSteps: [
      {
        step: "01",
        title: "Auktions-Link öffnen",
        summary:
          "Öffnen Sie den Link des Verkäufers. Vor Beginn sehen Sie die Vorschau aller Positionen und können den Termin in Ihren Kalender übernehmen.",
      },
      {
        step: "02",
        title: "Name & E-Mail angeben",
        summary:
          "Geben Sie Namen (oder Firma) und E-Mail-Adresse ein. Bei privaten Auktionen wird Ihre E-Mail gegen die Whitelist geprüft; öffentliche Räume stehen jedem offen.",
      },
      {
        step: "03",
        title: "In Echtzeit mitbieten",
        summary:
          "Fotos, Stückzahlen, Stückpreise und der Live-Aktivitätsfeed aktualisieren sich sofort. Bieten Sie bequem per Schnellauswahl (Min, +100 € usw.).",
      },
      {
        step: "04",
        title: "Fairer Abschluss & Abwicklung",
        summary:
          "Der Anti-Snipe-Schutz verhindert Last-Second-Sniping. Nach Ablauf der Zeit meldet sich der Verkäufer direkt per E-Mail zur Abwicklung.",
      },
    ],
    MechanicsEyebrow: "Technik & Regeln",
    MechanicsTitle: "Integrierte Auktionslogik",
    Mechanics: [
      {
        title: "Anti-Snipe-Timer",
        description:
          "Geht in den letzten Sekunden einer Position ein Gebot ein (innerhalb des Anti-Snipe-Fensters, z. B. 15s), verlängert sich der Timer automatisch auf dieses Fenster.",
      },
      {
        title: "Eine Sitzung pro E-Mail",
        description:
          "Jede E-Mail-Adresse kann pro Auktionsraum nur einmal gleichzeitig aktiv sein. So werden doppelte Tabs oder geteilte Zugänge zuverlässig verhindert.",
      },
      {
        title: "Automatischer Positionswechsel",
        description:
          "Alle Positionen laufen nacheinander in Ihrer Reihenfolge ab. Nach Ablauf wird jede Position als Verkauft oder Unverkauft markiert und die nächste aktiviert.",
      },
      {
        title: "Direkter Gewinner-Kontakt",
        description:
          "ArcBids speichert zu jedem Gebot Namen und E-Mail-Adresse des Bieters, sodass Verkäufer nach Auktionsende sofort Rechnungen und Versand klären können.",
      },
    ],
    CtaTitle: "Bereit für Ihren ersten Auktionsraum?",
    CtaSubtitle:
      "Erstellen Sie Ihre Organisation, fügen Sie Ihre Positionen hinzu und laden Sie Käufer in wenigen Minuten ein.",
    CtaPrimary: "Dashboard öffnen",
    CtaSecondary: "Preise ansehen",
  },
  PricingPage: {
    MetaTags: {
      url: "/pricing",
      title: "Preise — ArcBids",
      description:
        "Transparente Preise für B2B-Großhandelsauktionen ohne Verkaufsprovision.",
      imgUrl: "/opengraph-image",
      tags: ["ArcBids Preise", "B2B Auktion Kosten"],
    },
    Section: {
      Eyebrow: "Preise",
      Title: "Klare Pläne für Käufer und Großhändler.",
      Plans: [
        {
          name: "Käufer-Pass",
          description: "Für verifizierte Großhandelskunden",
          price: "Kostenlos",
          period: "",
          original: "",
          badge: "",
          cta: "Raum beitreten",
          features: [
            "Zugang per Whitelist & öffentliche Links",
            "Live-Gebote in Echtzeit",
            "Live-Aktivitätsfeed",
            "Anti-Snipe-Timer-Schutz",
            "Sofortige Übersicht kommender Positionen",
          ],
        },
        {
          name: "Wholesale Desk",
          description: "Für aktive Distributoren & Aufkäufer",
          price: "149 €",
          period: "/Monat",
          original: "199 €",
          badge: "Beliebt",
          cta: "Jetzt starten",
          features: [
            "Alles aus dem Käufer-Pass",
            "Eigene Organisationsseite",
            "Konfigurierbare Anti-Snipe-Timer",
            "E-Mail-Whitelist-Verwaltung",
            "Gewinner-Kontakte & Abschlussübersicht",
          ],
        },
        {
          name: "Enterprise",
          description: "Für große B2B-Netzwerke",
          price: "499 €",
          period: "/Monat",
          original: "649 €",
          badge: "",
          cta: "Vertrieb kontaktieren",
          features: [
            "Alles aus Wholesale Desk",
            "Multi-Organisations-Steuerung",
            "Persönlicher Ansprechpartner",
            "Individuelle ERP- & Webhook-Anbindung",
            "99,99 % Uptime-SLA",
          ],
        },
      ],
    },
  },
  Footer: {
    Tagline:
      "B2B-Großhandels-Auktionsplattform für maximale Geschwindigkeit in Echtzeit.",
    Badge: "Live-Engine · Echtzeit-Sync",
    Home: "Startseite",
    Features: "Funktionen",
    HowItWorks: "So funktioniert's",
    LiveRoom: "Live-Auktionsraum",
    NavTitle: "Navigation",
    LegalTitle: "Rechtliches",
    ContactTitle: "Kontakt",
    Privacy: "Datenschutz",
    Terms: "AGB",
    Copyright: "© 2026 ArcBids. Alle Rechte vorbehalten.",
    CraftedWith: "Hochverfügbare Echtzeit-Infrastruktur",
  },
  AuctionPage: {
    MetaTags: {
      url: "/auction",
      title: "Live-Auktionsraum — ArcBids",
      description:
        "Nehmen Sie in Echtzeit an einer B2B-Großhandelsauktion auf ArcBids teil.",
      imgUrl: "/opengraph-image",
      tags: ["Live Auktion", "B2B Gebote", "ArcBids"],
    },
  },
  DashboardPage: {
    MetaTags: {
      url: "/dashboard",
      title: "Verkäufer-Dashboard — ArcBids",
      description:
        "Verwalten Sie Ihre Organisation, Käufer-Whitelist, Auktionsräume und Gewinnerkontakte.",
      imgUrl: "/opengraph-image",
      tags: ["Dashboard", "Auktionsverwaltung", "ArcBids"],
    },
    Copy: {
      Loading: "Dashboard wird geladen…",
      LiveBadge: "Live",
      ConnectingBadge: "Verbindet",
      SignOut: "Abmelden",
      ActiveAuctions: "Aktive Auktionen",
      FinishedAuctions: "Beendete Auktionen",
      TotalSold: "Gesamtumsatz",
      OrganizationTitle: "Organisation",
      EditOrganizationTitle: "Organisation bearbeiten",
      EditOrganizationDesc: "Organisationsnamen und öffentlichen URL-Slug aktualisieren.",
      OrganizationNameLabel: "Organisationsname",
      SlugLabel: "Slug",
      Cancel: "Abbrechen",
      SaveChanges: "Speichern",
      InvitedBuyersTitle: "Eingeladene Käufer",
      InvitedBuyerPlaceholder: "kaeufer@firma.de",
      WhitelistAction: "Freigeben",
      NoBuyersYet: "Noch keine Käufer eingeladen.",
      Active: "Aktiv",
      Paused: "Pausiert",
      Revoke: "Sperren",
      Restore: "Freigeben",
      AuctionsTitle: "Auktionen",
      NoAuctionsYet: "Noch keine Auktionen erstellt. Klicken Sie auf +, um zu starten.",
      PreviewStatus: "Vorschau",
      LiveStatus: "Live",
      EndedStatus: "Beendet",
      PublicBadge: "Öffentlich",
      InviteOnlyBadge: "Nur Einladung",
      LotTimerSuffix: "s Positions-Timer",
      MinIncrementSuffix: "Mindestschritt",
      StartAction: "Starten",
      CreateAuctionTitle: "Auktion erstellen",
      CreateAuctionDesc: "Regeln festlegen und erste Großhandelsposition hinzufügen.",
      EditAuctionTitle: "Auktion bearbeiten",
      EditAuctionDesc: "Raumregeln oder Startzeit vor Beginn anpassen.",
      WinnersTitleSuffix: "Gewinner",
      WinnersDesc: "Gewinner direkt kontaktieren, um Zahlung und Versand zu klären.",
      LotsSoldSummary: "Positionen verkauft",
      TotalLabel: "Gesamt",
      WinnerLabel: "Gewinner:",
      NoWinningBids: "Keine Gebote abgegeben",
      UnsoldLabel: "Unverkauft",
      EmailWinner: "E-Mail senden",
      CopyEmail: "E-Mail kopieren",
      Copied: "Kopiert",
      RoomSettingsHeading: "Raum-Einstellungen",
      RoomTitleLabel: "Titel des Auktionsraums",
      RoomTitlePlaceholder: "Q1 Elektronik-Großhandels-Drop",
      CurrencyLabel: "Währung",
      LotTimerLabel: "Timer (Sek.)",
      AntiSnipeLabel: "Anti-Snipe (Sek.)",
      MinStepLabel: "Mindestschritt",
      PublicAuctionTitle: "Öffentliche Auktion",
      PublicAuctionOnDesc: "Jeder mit dem Link kann beitreten und bieten",
      PublicAuctionOffDesc: "Nur mit Einladung · erfordert freigegebene E-Mail",
      AutoBidTitle: "Auto-Gebot aktivieren",
      AutoBidDesc: "Käufern ermöglichen, ein Maximalgebot festzulegen",
      ScheduleTitle: "Startzeit planen",
      ScheduleOptionalPrefix: "Optional · Datum & Uhrzeit wählen",
      ScheduleAtWord: "um",
      ClearSchedule: "Löschen",
      LotsHeading: "Positionen",
      AddLot: "Position hinzufügen",
      EditLotTitle: "Position bearbeiten",
      AddLotTitle: "Position hinzufügen",
      EditLotDesc: "Titel, Startpreis oder Bilder dieser Position bearbeiten.",
      AddLotDesc: "Artikel oder Großhandelsposten zu dieser Auktion hinzufügen.",
      AddLotHintCreate: "Fügen Sie mindestens eine Position hinzu, bevor Sie die Auktion erstellen.",
      AddLotHintEdit: "Fügen Sie mindestens eine Position hinzu, bevor Sie speichern.",
      CreateAuctionAction: "Auktion erstellen",
      SaveLotAction: "Position speichern",
      LotTitleLabel: "Titel der Position",
      QuantityLabel: "Stückzahl",
      StartPriceLabel: "Startpreis",
      DescriptionLabel: "Beschreibung",
      DescriptionPlaceholder: "Grade-A Großhandelsposten, geprüft & versiegelt.",
      LotImagesLabel: "Positionsbilder",
      UploadingPhotos: "Wird hochgeladen…",
      DropPhotos: "Klicken oder Fotos hierher ziehen",
      PhotoHint: "PNG, JPG, WebP, GIF bis 10 MB",
    },
  },
  LoginPage: {
    MetaTags: {
      url: "/login",
      title: "Anmelden — ArcBids",
      description:
        "Melden Sie sich mit einem 6-stelligen E-Mail-Code oder Magic-Link in Ihrem ArcBids-Workspace an.",
      imgUrl: "/opengraph-image",
      tags: ["ArcBids Login", "Anmelden"],
    },
  },
};
