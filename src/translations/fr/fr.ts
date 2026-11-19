import type { ITranslation } from "../ITranslation";

export const FR: ITranslation = {
  Nav: {
    Auctions: "Enchères",
    Features: "Fonctionnalités",
    HowItWorks: "Fonctionnement",
    Pricing: "Tarifs",
    Tools: "Outils gratuits",
    GetStarted: "Commencer",
    Solutions: "Solutions",
    SolutionItems: [
      {
        href: "/solutions/itad-hardware-auctions",
        title: "ITAD & Matériel Reconditionné",
        description: "Vendez des lots de PC, téléphones et serveurs en salles live de 15 min.",
      },
      {
        href: "/solutions/liquidation-pallet-auctions",
        title: "Palettes de Liquidation & Retours",
        description: "Écoulez vos palettes mixtes et surstocks plus vite avec 0 % de commission.",
      },
      {
        href: "/solutions/b2b-smartphone-stock-auctions",
        title: "Grossistes Smartphones & Télécoms",
        description: "Vendez aux enchères des lots iPhone et Samsung gradés en temps réel.",
      },
      {
        href: "/solutions/industrial-surplus-machinery-auctions",
        title: "Surplus Industriel & Outillage",
        description: "Liquidez outils, pièces et équipements sans frais acheteur.",
      },
      {
        href: "/solutions/fashion-overstock-lot-auctions",
        title: "Surstocks Mode & Retail",
        description: "Vendez vos fins de série discrètement à des acheteurs vérifiés.",
      },
      {
        href: "/solutions/whatsapp-b2b-auction-alternative",
        title: "Alternative B2B à WhatsApp",
        description: "Remplacez 20 discussions séparées par un seul lien d'enchère privé.",
      },
    ],
    DropTitle: "Salle d'Enchères en Direct",
    DropDesc: "Rejoignez une vente en gros active avec enchères en temps réel.",
    FeaturesDropTitle: "Fonctionnalités",
    FeaturesDropDesc: "Synchronisation instantanée, anti-snipe et accès vérifié.",
  },
  HomePage: {
    MetaTags: {
      url: "/",
      title: "ArcBids — Enchères B2B en Gros en Temps Réel",
      description:
        "Lancez des salles d'enchères B2B privées ou publiques en quelques minutes avec enchères en direct et protection anti-snipe.",
      imgUrl: "/opengraph-image",
      tags: [
        "enchères B2B",
        "plateforme d'enchères de gros",
        "enchères en direct",
        "remarketing ITAD",
        "liquidation",
        "ArcBids",
      ],
    },
    HeroTitleStart: "Enchères B2B en temps réel,",
    HeroTitleHighlight: "conçues pour la vitesse.",
    HeroSubtitle:
      "Lancez des salles d'enchères privées en quelques minutes — enchères instantanées, protection anti-snipe et invitations simples.",
    PrimaryCta: "Commencer",
    SecondaryCta: "Fonctionnement",
    StepsEyebrow: "Fonctionnement",
    StepsTitle: "Lancez une salle en trois étapes.",
    Steps: [
      {
        step: "01",
        title: "Créez votre salle d'enchères",
        description:
          "Ajoutez vos lots, prix de départ, quantités, paliers minimums et règles anti-snipe en quelques minutes.",
      },
      {
        step: "02",
        title: "Invitez vos acheteurs",
        description:
          "Partagez un lien public ou privé pour que vos acheteurs vérifiés rejoignent avec leur nom et e-mail ou téléphone.",
      },
      {
        step: "03",
        title: "Vendez en direct et concluez vite",
        description:
          "Suivez les enchères en temps réel, laissez l'anti-snipe assurer l'équité et contactez le gagnant dès la clôture.",
      },
    ],
    Showcase: {
      Eyebrow: "Salle en Direct",
      Title: "Voyez chaque offre en temps réel.",
      Subtitle:
        "Les acheteurs consultent photos, quantités et prix unitaires tout en enchérissant en direct avec protection anti-snipe.",
    },
    Features: {
      Eyebrow: "Plateforme",
      Title: "Conçue pour la rapidité du commerce de gros.",
      AutoBidTitle: "Enchère Auto & Plafond Max",
      AutoBidDesc:
        "Laissez vos acheteurs fixer un plafond maximum une seule fois. Les paliers automatiques maintiennent la concurrence.",
      AutoBidToggleLabel: "Enchère auto",
      AntiSnipeTitle: "Protection Anti-Snipe",
      AntiSnipeDesc:
        "Les offres de dernière seconde prolongent automatiquement le chrono afin que chaque acheteur puisse réagir.",
      AntiSnipeExtended: "+15s prolongé",
      InvitesTitle: "Listes d'Acheteurs",
      InvitesDesc:
        "Organisez vos acheteurs approuvés (e-mail ou téléphone), importez en CSV et choisissez les listes autorisées.",
      InvitedLabel: "Invité",
      PausedLabel: "En pause",
    },
    BottomCtaTitle: "Prêt pour votre prochain drop B2B ?",
    BottomCtaSubtitle:
      "Lancez une salle en quelques minutes et recevez des offres en temps réel.",
  },
  HowItWorksPage: {
    MetaTags: {
      url: "/how-it-works",
      title: "Fonctionnement — ArcBids Enchères B2B",
      description:
        "Découvrez étape par étape comment les vendeurs organisent des enchères de gros et comment les acheteurs participent sur ArcBids.",
      imgUrl: "/opengraph-image",
      tags: ["fonctionnement ArcBids", "enchères B2B", "anti-snipe", "ventes en gros"],
    },
    Eyebrow: "Fonctionnement",
    TitleStart: "Des lots en gros aux ventes conclues —",
    TitleHighlight: "étape par étape.",
    Subtitle:
      "ArcBids exécute des salles d'enchères synchronisées en direct directement dans le navigateur.",
    SellerEyebrow: "Pour les Vendeurs",
    SellerTitle: "Organiser une vente en direct",
    SellerSteps: [
      {
        step: "01",
        title: "Configurez votre organisation",
        summary:
          "Connectez-vous par code e-mail ou lien magique sans mot de passe. ArcBids crée votre espace et votre page publique.",
        detail:
          "Personnalisez le nom et le slug de votre organisation à tout moment depuis le tableau de bord.",
      },
      {
        step: "02",
        title: "Définissez les règles et l'accès",
        summary:
          "Choisissez titre, devise (EUR ou USD), durée par lot, fenêtre anti-snipe et palier minimum.",
        detail:
          "Mode Public ou Sur invitation (listes d'acheteurs autorisés), avec planification optionnelle.",
      },
      {
        step: "03",
        title: "Ajoutez vos lots en gros",
        summary:
          "Ajoutez des lots avec titre, quantité, prix de départ, description et photos.",
        detail:
          "Les photos sont compressées automatiquement. La quantité permet d'afficher le prix par unité en direct.",
      },
      {
        step: "04",
        title: "Partagez le lien et démarrez",
        summary:
          "Partagez le lien privé de votre salle avec vos acheteurs.",
        detail:
          "Avant le début, les acheteurs voient un aperçu avec compte à rebours et ajout au calendrier.",
      },
      {
        step: "05",
        title: "Clôture automatique et suivi",
        summary:
          "À zéro, le plus offrant remporte le lot et la vente passe automatiquement au lot suivant.",
        detail:
          "Consultez ensuite les gagnants et leurs coordonnées en un clic depuis votre tableau de bord.",
      },
    ],
    BuyerEyebrow: "Pour les Acheteurs",
    BuyerTitle: "Rejoindre et enchérir",
    BuyerSteps: [
      {
        step: "01",
        title: "Ouvrez le lien de la vente",
        summary:
          "Ouvrez le lien partagé par le vendeur pour consulter les lots à venir ou enchérir.",
      },
      {
        step: "02",
        title: "Entrez votre nom et contact",
        summary:
          "Indiquez votre nom (ou société) et votre e-mail ou téléphone vérifié.",
      },
      {
        step: "03",
        title: "Enchérissez en temps réel",
        summary:
          "Suivez photos, prix unitaire et activité en direct. Enchérissez en un clic.",
      },
      {
        step: "04",
        title: "Clôture équitable et livraison",
        summary:
          "L'anti-snipe protège la fin du chrono. Le vendeur vous contacte directement après la vente.",
      },
    ],
    MechanicsEyebrow: "Sous le Capot",
    MechanicsTitle: "Règles intégrées",
    Mechanics: [
      {
        title: "Chrono Anti-Snipe",
        description:
          "Toute offre dans les dernières secondes réinitialise le délai pour garantir une concurrence équitable.",
      },
      {
        title: "Session Unique par Acheteur",
        description:
          "Un même contact ne peut être actif qu'une fois par salle pour éviter les doublons.",
      },
      {
        title: "Enchaînement Automatique",
        description:
          "Les lots s'enchaînent automatiquement dans l'ordre défini jusqu'à la fin de la vente.",
      },
      {
        title: "Contact Direct Vendeur-Gagnant",
        description:
          "ArcBids enregistre le gagnant pour facturer et expédier sans intermédiaire.",
      },
    ],
    CtaTitle: "Prêt à lancer votre première salle ?",
    CtaSubtitle:
      "Créez votre organisation, ajoutez vos lots et invitez vos acheteurs en quelques minutes.",
    CtaPrimary: "Ouvrir le Tableau de Bord",
    CtaSecondary: "Voir les Tarifs",
  },
  PricingPage: {
    MetaTags: {
      url: "/pricing",
      title: "Tarifs — ArcBids",
      description:
        "Tarification simple et transparente pour vos enchères B2B. 0 % de commission en 2026.",
      imgUrl: "/opengraph-image",
      tags: ["tarifs ArcBids", "tarifs enchères B2B", "logiciel grossiste"],
    },
    Section: {
      Eyebrow: "Tarifs",
      Title: "Des tarifs simples pour acheteurs et grossistes.",
      Plans: [
        {
          name: "Pass Acheteur",
          description: "Pour acheteurs professionnels vérifiés",
          price: "Gratuit",
          period: "",
          original: "",
          badge: "",
          cta: "Rejoindre une Salle",
          features: [
            "Accès aux salles publiques et privées",
            "Mises à jour en temps réel",
            "Fil d'activité en direct",
            "Protection anti-snipe",
            "File des lots à venir",
          ],
        },
        {
          name: "À l'Enchère",
          description: "Aucun abonnement — payez uniquement au lancement",
          price: "25 €",
          period: "/enchère",
          original: "",
          badge: "Offre 2026",
          cta: "Commencer à Vendre",
          features: [
            "Tout le Pass Acheteur inclus",
            "0 % de commission en 2026 (puis 5 %)",
            "Sans abonnement mensuel",
            "Listes d'acheteurs & import CSV",
            "Enchère auto & anti-snipe",
          ],
        },
        {
          name: "Enterprise",
          description: "Pour les réseaux B2B à fort volume",
          price: "Sur devis",
          period: "",
          original: "",
          badge: "",
          cta: "Contacter l'équipe",
          features: [
            "Tout l'offre À l'Enchère",
            "Taux sur volume personnalisés",
            "Gestionnaire de compte dédié",
            "Intégrations ERP & webhooks",
            "SLA 99,99 %",
          ],
        },
      ],
    },
  },
  Footer: {
    Tagline:
      "Plateforme d'enchères B2B en gros conçue pour la vitesse en temps réel.",
    Badge: "Moteur Live · Sync Instantanée",
    Home: "Accueil",
    Features: "Fonctionnalités",
    HowItWorks: "Fonctionnement",
    NavTitle: "Navigation",
    LegalTitle: "Légal",
    ContactTitle: "Contact",
    Privacy: "Confidentialité",
    Terms: "Conditions",
    Imprint: "Mentions légales",
    Copyright: "© 2026 ArcBids. Tous droits réservés.",
    CraftedWith: "Infrastructure temps réel haute disponibilité",
  },
  AuctionPage: {
    MetaTags: {
      url: "/auction",
      title: "Salle d'Enchères en Direct — ArcBids",
      description:
        "Participez à une enchère B2B en temps réel sur ArcBids avec prix unitaire et protection anti-snipe.",
      imgUrl: "/opengraph-image",
      tags: ["salle d'enchères en direct", "enchères B2B", "ArcBids"],
    },
  },
  DashboardPage: {
    MetaTags: {
      url: "/dashboard",
      title: "Tableau de Bord Vendeur — ArcBids",
      description:
        "Gérez votre organisation, vos listes d'acheteurs, vos salles d'enchères et vos gagnants.",
      imgUrl: "/opengraph-image",
      tags: ["tableau de bord vendeur", "gestion enchères", "ArcBids"],
    },
    Copy: {
      Loading: "Chargement du tableau de bord…",
      LiveBadge: "En direct",
      ConnectingBadge: "Connexion",
      SignOut: "Déconnexion",
      ActiveAuctions: "Enchères Actives",
      FinishedAuctions: "Terminées",
      TotalSold: "Total Vendu",
      OrganizationTitle: "Organisation",
      EditOrganizationTitle: "Modifier l'Organisation",
      EditOrganizationDesc: "Mettez à jour le nom et le slug public.",
      OrganizationNameLabel: "Nom de l'Organisation",
      SlugLabel: "Slug",
      Cancel: "Annuler",
      SaveChanges: "Enregistrer",
      InvitedBuyersTitle: "Acheteurs Invités",
      InvitedBuyerPlaceholder: "acheteur@entreprise.com",
      WhitelistAction: "Autoriser",
      NoBuyersYet: "Aucun acheteur invité pour le moment.",
      Active: "Actif",
      Paused: "En pause",
      Revoke: "Révoquer",
      Restore: "Rétablir",
      AuctionsTitle: "Enchères",
      NoAuctionsYet: "Aucune enchère créée. Cliquez sur + pour commencer.",
      PreviewStatus: "Aperçu",
      LiveStatus: "En direct",
      EndedStatus: "Terminée",
      PublicBadge: "Public",
      InviteOnlyBadge: "Sur invitation",
      LotTimerSuffix: "s par lot",
      MinIncrementSuffix: "palier min.",
      StartAction: "Démarrer",
      CreateAuctionTitle: "Créer une Enchère",
      CreateAuctionDesc: "Configurez les règles de votre salle d'enchères.",
      EditAuctionTitle: "Modifier l'Enchère",
      EditAuctionDesc: "Modifiez les paramètres ou l'horaire avant le lancement.",
      WinnersTitleSuffix: "Gagnants",
      WinnersDesc: "Contactez directement les acheteurs gagnants.",
      LotsSoldSummary: "lots vendus",
      TotalLabel: "Total",
      WinnerLabel: "Gagnant :",
      NoWinningBids: "Aucune offre gagnante",
      UnsoldLabel: "Invendu",
      EmailWinner: "Contacter par e-mail",
      CopyEmail: "Copier l'e-mail",
      Copied: "Copié",
      RoomSettingsHeading: "Paramètres de la Salle",
      RoomTitleLabel: "Titre de la Salle",
      RoomTitlePlaceholder: "Vente en Gros Électronique T1",
      CurrencyLabel: "Devise",
      LotTimerLabel: "Chrono Lot (sec)",
      AntiSnipeLabel: "Anti-Snipe (sec)",
      MinStepLabel: "Palier Min.",
      PublicAuctionTitle: "Enchère Publique",
      PublicAuctionOnDesc: "Toute personne avec le lien peut rejoindre et enchérir",
      PublicAuctionOffDesc: "Sur invitation · requiert une liste d'acheteurs",
      AutoBidTitle: "Activer l'Enchère Auto",
      AutoBidDesc: "Permettre aux acheteurs de fixer un plafond max",
      ScheduleTitle: "Planifier le Démarrage",
      ScheduleOptionalPrefix: "Optionnel · Choisir une date et heure",
      ScheduleAtWord: "à",
      ClearSchedule: "Effacer",
      LotsHeading: "Lots",
      AddLot: "Ajouter un Lot",
      EditLotTitle: "Modifier le Lot",
      AddLotTitle: "Ajouter un Lot",
      EditLotDesc: "Modifiez le titre, prix de départ ou photos du lot.",
      AddLotDesc: "Ajoutez un article ou une palette à cette enchère.",
      AddLotHintCreate: "Ajoutez au moins un lot avant de créer cette enchère.",
      AddLotHintEdit: "Ajoutez au moins un lot avant d'enregistrer.",
      CreateAuctionAction: "Créer l'Enchère",
      SaveLotAction: "Enregistrer le Lot",
      LotTitleLabel: "Titre du Lot",
      QuantityLabel: "Quantité",
      StartPriceLabel: "Prix de Départ",
      DescriptionLabel: "Description",
      DescriptionPlaceholder: "Lot grade A, testé et scellé d'usine.",
      LotImagesLabel: "Photos du Lot",
      UploadingPhotos: "Envoi en cours…",
      DropPhotos: "Cliquez ou glissez des photos ici",
      PhotoHint: "PNG, JPG, WebP, GIF jusqu'à 10 Mo",
    },
  },
  LoginPage: {
    MetaTags: {
      url: "/login",
      title: "Connexion — ArcBids",
      description:
        "Connectez-vous à votre espace vendeur ArcBids avec un code à 6 chiffres ou un lien magique.",
      imgUrl: "/opengraph-image",
      tags: ["connexion ArcBids", "espace vendeur"],
    },
  },
};
