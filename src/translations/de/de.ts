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
      imgUrl: "/og-image.png",
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
  },
  HowItWorksPage: {
    MetaTags: {
      url: "/how-it-works",
      title: "So funktioniert's — ArcBids B2B-Auktionen",
      description:
        "Schritt-für-Schritt-Erklärung, wie Verkäufer Großhandelsauktionen starten und Käufer auf ArcBids in Echtzeit mitbieten.",
      imgUrl: "/og-image.png",
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
      imgUrl: "/og-image.png",
      tags: ["ArcBids Preise", "B2B Auktion Kosten"],
    },
  },
  AuctionPage: {
    MetaTags: {
      url: "/auction",
      title: "Live-Auktionsraum — ArcBids",
      description:
        "Nehmen Sie in Echtzeit an einer B2B-Großhandelsauktion auf ArcBids teil.",
      imgUrl: "/og-image.png",
      tags: ["Live Auktion", "B2B Gebote", "ArcBids"],
    },
  },
  DashboardPage: {
    MetaTags: {
      url: "/dashboard",
      title: "Verkäufer-Dashboard — ArcBids",
      description:
        "Verwalten Sie Ihre Organisation, Käufer-Whitelist, Auktionsräume und Gewinnerkontakte.",
      imgUrl: "/og-image.png",
      tags: ["Dashboard", "Auktionsverwaltung", "ArcBids"],
    },
  },
  LoginPage: {
    MetaTags: {
      url: "/login",
      title: "Anmelden — ArcBids",
      description:
        "Melden Sie sich mit einem 6-stelligen E-Mail-Code oder Magic-Link in Ihrem ArcBids-Workspace an.",
      imgUrl: "/og-image.png",
      tags: ["ArcBids Login", "Anmelden"],
    },
  },
};
