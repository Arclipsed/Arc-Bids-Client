import type { ITranslation } from "../ITranslation";

export const TR: ITranslation = {
  Nav: {
    Auctions: "Açık Artırmalar",
    Features: "Özellikler",
    HowItWorks: "Nasıl Çalışır",
    Pricing: "Fiyatlandırma",
    Tools: "Ücretsiz Araçlar",
    GetStarted: "Başla",
    Solutions: "Çözümler",
    SolutionItems: [
      {
        href: "/solutions/itad-hardware-auctions",
        title: "ITAD ve Yenilenmiş Donanım",
        description: "Sınıflandırılmış laptop, telefon ve sunucu lotlarını 15 dakikalık canlı odalarda satın.",
      },
      {
        href: "/solutions/liquidation-pallet-auctions",
        title: "Tasfiye ve İade Paletleri",
        description: "Karışık paletleri ve stok fazlasını %0 komisyonla daha hızlı satın.",
      },
      {
        href: "/solutions/b2b-smartphone-stock-auctions",
        title: "Akıllı Telefon Toptan Satışı",
        description: "Grade A/B/C iPhone ve Samsung partilerini canlı olarak açık artırmaya çıkarın.",
      },
      {
        href: "/solutions/industrial-surplus-machinery-auctions",
        title: "Endüstriyel Stok Fazlası ve Ekipman",
        description: "Takım, yedek parça ve makineleri alıcı komisyonu olmadan satın.",
      },
      {
        href: "/solutions/fashion-overstock-lot-auctions",
        title: "Moda ve Perakende Stok Fazlası",
        description: "Sezonluk stokları onaylı alıcılara gizli şekilde satın.",
      },
      {
        href: "/solutions/whatsapp-b2b-auction-alternative",
        title: "WhatsApp B2B Alternatifi",
        description: "20 ayrı sohbeti tek bir özel teklif bağlantısıyla değiştirin.",
      },
    ],
    DropTitle: "Canlı Açık Artırma Odası",
    DropDesc: "Gerçek zamanlı tekliflerle aktif bir B2B toptan açık artırmaya katılın.",
    FeaturesDropTitle: "Platform Özellikleri",
    FeaturesDropDesc: "Anlık senkronizasyon, anti-snipe zamanlayıcı ve doğrulanmış alıcı erişimi.",
  },
  HomePage: {
    MetaTags: {
      url: "/",
      title: "ArcBids — Gerçek Zamanlı B2B Toptan Açık Artırmalar",
      description:
        "Dakikalar içinde özel veya herkese açık toptan açık artırma odaları açın — canlı teklif ve anti-snipe korumasıyla.",
      imgUrl: "/opengraph-image",
      tags: [
        "B2B açık artırma",
        "toptan satış platformu",
        "canlı teklif",
        "ITAD",
        "tasfiye açık artırması",
        "ArcBids",
      ],
    },
    HeroTitleStart: "Gerçek zamanlı B2B açık artırmalar,",
    HeroTitleHighlight: "hız için tasarlandı.",
    HeroSubtitle:
      "Dakikalar içinde özel toptan açık artırma odaları başlatın — anlık canlı teklifler, anti-snipe koruması ve kolay davetlerle.",
    PrimaryCta: "Başla",
    SecondaryCta: "Nasıl Çalışır",
    StepsEyebrow: "Nasıl Çalışır",
    StepsTitle: "Üç adımda oda başlatın.",
    Steps: [
      {
        step: "01",
        title: "Açık artırma odanızı oluşturun",
        description:
          "Toptan lotlarınızı ekleyin; başlangıç fiyatı, adet, minimum artış ve anti-snipe kurallarını belirleyin.",
      },
      {
        step: "02",
        title: "Alıcılarınızı davet edin",
        description:
          "Herkese açık veya davetiyeye özel bağlantılar paylaşın; onaylı alıcılar şifre olmadan ad ve e-posta veya telefonla katılsın.",
      },
      {
        step: "03",
        title: "Canlı yönetin ve hızla kapatın",
        description:
          "Teklifleri anlık izleyin, anti-snipe ile adil rekabet sağlayın ve kapanışta kazananla doğrudan iletişime geçin.",
      },
    ],
    Showcase: {
      Eyebrow: "Canlı Oda Deneyimi",
      Title: "Her teklifi anında canlı görün.",
      Subtitle:
        "Alıcılar fotoğrafları, adetleri ve birim fiyatları görerek anti-snipe korumalı odada canlı teklif verir.",
    },
    Features: {
      Eyebrow: "Platform",
      Title: "Toptan ticaret hızına özel geliştirildi.",
      AutoBidTitle: "Otomatik Teklif ve Maks. Tavan",
      AutoBidDesc:
        "Alıcılar tek seferde maksimum bütçe belirlesin. Otomatik artışlar rekabeti canlı tutar.",
      AutoBidToggleLabel: "Otomatik Teklif",
      AntiSnipeTitle: "Anti-Snipe Koruması",
      AntiSnipeDesc:
        "Son saniye teklifleri sayacı otomatik uzatarak rakiplere karşılık verme süresi tanır.",
      AntiSnipeExtended: "+15sn uzatıldı",
      InvitesTitle: "Alıcı Listeleri",
      InvitesDesc:
        "Onaylı alıcıları listelerde toplayın (e-posta veya telefon), CSV içe aktarın ve özel odalara yetki verin.",
      InvitedLabel: "Davetli",
      PausedLabel: "Duraklatıldı",
    },
    BottomCtaTitle: "Bir sonraki toptan satışınız için hazır mısınız?",
    BottomCtaSubtitle:
      "Dakikalar içinde bir oda başlatın ve gerçek zamanlı teklifler almaya başlayın.",
  },
  HowItWorksPage: {
    MetaTags: {
      url: "/how-it-works",
      title: "Nasıl Çalışır — ArcBids Canlı B2B Açık Artırmalar",
      description:
        "Satıcıların toptan açık artırma odalarını nasıl yönettiğini ve alıcıların nasıl teklif verdiğini adım adım inceleyin.",
      imgUrl: "/opengraph-image",
      tags: ["ArcBids nasıl çalışır", "B2B açık artırma", "anti-snipe", "toptan"],
    },
    Eyebrow: "Nasıl Çalışır",
    TitleStart: "Toptan lotlardan kapanan anlaşmalara —",
    TitleHighlight: "adım adım.",
    Subtitle:
      "ArcBids, senkronize canlı açık artırma odalarını doğrudan tarayıcıda çalıştırır.",
    SellerEyebrow: "Satıcılar İçin",
    SellerTitle: "Canlı açık artırma düzenleme",
    SellerSteps: [
      {
        step: "01",
        title: "Organizasyonunuzu kurun",
        summary:
          "Şifre olmadan e-posta kodu veya sihirli bağlantıyla giriş yapın. Çalışma alanınız otomatik oluşturulur.",
        detail:
          "Organizasyon adını ve URL adresini Satıcı Paneli'nden dilediğiniz zaman güncelleyin.",
      },
      {
        step: "02",
        title: "Oda kurallarını ve erişimi ayarlayın",
        summary:
          "Başlık, para birimi (EUR veya USD), lot süresi, anti-snipe penceresi ve minimum artışı seçin.",
        detail:
          "Herkese açık veya Sadece Davetli (alıcı listeleriyle) olarak ayarlayın; isterseniz başlangıç saati planlayın.",
      },
      {
        step: "03",
        title: "Toptan lotlarınızı ekleyin",
        summary:
          "Başlık, adet, başlangıç fiyatı, açıklama ve fotoğraflarla lotları ekleyin.",
        detail:
          "Fotoğraflar otomatik sıkıştırılır. Adet girildiğinde birim fiyat canlı hesaplanır.",
      },
      {
        step: "04",
        title: "Bağlantıyı paylaşın ve başlatın",
        summary:
          "Tahmin edilemeyen özel oda bağlantısını alıcılarınızla paylaşın.",
        detail:
          "Başlamadan önce alıcılar geri sayım ve takvime ekleme butonunu görür.",
      },
      {
        step: "05",
        title: "Otomatik kapanış ve iletişim",
        summary:
          "Süre sıfırlandığında en yüksek teklif sahibi kazanır ve oda sonraki lota geçer.",
        detail:
          "Panelinizden kazanan alıcıları ve iletişim bilgilerini tek tıkla görüntüleyin.",
      },
    ],
    BuyerEyebrow: "Alıcılar İçin",
    BuyerTitle: "Katılma ve teklif verme",
    BuyerSteps: [
      {
        step: "01",
        title: "Açık artırma bağlantısını açın",
        summary:
          "Satıcının paylaştığı bağlantıyı açarak lotları inceleyin veya canlı teklif verin.",
      },
      {
        step: "02",
        title: "Ad ve iletişim bilgilerinizi girin",
        summary:
          "Adınızı (veya firmanızı) ve onaylı e-posta ya da telefon numaranızı girin.",
      },
      {
        step: "03",
        title: "Gerçek zamanlı teklif verin",
        summary:
          "Fotoğrafları, birim fiyatları ve canlı akışı izleyin; tek tıkla teklif verin.",
      },
      {
        step: "04",
        title: "Adil kapanış ve teslimat",
        summary:
          "Anti-snipe son saniyeleri korur. Satıcı doğrudan sizinle iletişime geçer.",
      },
    ],
    MechanicsEyebrow: "Altyapı",
    MechanicsTitle: "Yerleşik açık artırma kuralları",
    Mechanics: [
      {
        title: "Anti-Snipe Zamanlayıcı",
        description:
          "Son saniyelerde gelen teklifler sayacı otomatik uzatarak adil rekabet sağlar.",
      },
      {
        title: "Alıcı Başına Tek Oturum",
        description:
          "Her e-posta veya telefon aynı anda bir odada tek oturumla aktif olabilir.",
      },
      {
        title: "Otomatik Lot Geçişi",
        description:
          "Lotlar belirlediğiniz sırayla otomatik ilerler ve oda tamamlandığında kapanır.",
      },
      {
        title: "Doğrudan Satıcı-Kazanan İletişimi",
        description:
          "Kazananın adı ve iletişim bilgisi fatura ve teslimat için anında kaydedilir.",
      },
    ],
    CtaTitle: "İlk açık artırma odanızı başlatmaya hazır mısınız?",
    CtaSubtitle:
      "Dakikalar içinde organizasyonunuzu oluşturun, lot ekleyin ve alıcıları davet edin.",
    CtaPrimary: "Paneli Aç",
    CtaSecondary: "Fiyatları Gör",
  },
  PricingPage: {
    MetaTags: {
      url: "/pricing",
      title: "Fiyatlandırma — ArcBids",
      description:
        "B2B toptan açık artırmalar için şeffaf fiyatlandırma. 2026 boyunca %0 komisyon.",
      imgUrl: "/opengraph-image",
      tags: ["ArcBids fiyatlar", "B2B açık artırma fiyat", "toptan yazılım"],
    },
    Section: {
      Eyebrow: "Fiyatlandırma",
      Title: "Alıcılar ve toptancılar için sade planlar.",
      Plans: [
        {
          name: "Alıcı Girişi",
          description: "Onaylı toptan alıcılar için",
          price: "Ücretsiz",
          period: "",
          original: "",
          badge: "",
          cta: "Odaya Katıl",
          features: [
            "Açık ve davetli odalara erişim",
            "Anlık canlı teklif güncellemeleri",
            "Canlı etkinlik akışı",
            "Anti-snipe koruması",
            "Sıradaki lotları anında görme",
          ],
        },
        {
          name: "Açık Artırma Başına",
          description: "Aylık ücret yok — sadece başlatırken ödeyin",
          price: "€25",
          period: "/açık artırma",
          original: "",
          badge: "2026 Fırsatı",
          cta: "Satışa Başla",
          features: [
            "Alıcı Girişi özelliklerinin tümü",
            "2026 boyunca %0 komisyon (normalde %5)",
            "Aylık abonelik gerekmez",
            "Alıcı listeleri ve CSV içe aktarma",
            "Otomatik teklif ve anti-snipe",
          ],
        },
        {
          name: "Kurumsal",
          description: "Yüksek hacimli B2B ağları için",
          price: "Özel",
          period: "",
          original: "",
          badge: "",
          cta: "Satışla İletişime Geç",
          features: [
            "Açık Artırma Başına planın tümü",
            "Özel hacim komisyon oranları",
            "Özel müşteri temsilcisi",
            "ERP ve webhook entegrasyonları",
            "%99,99 çalışma süresi SLA",
          ],
        },
      ],
    },
  },
  Footer: {
    Tagline:
      "Gerçek zamanlı hız için geliştirilmiş B2B toptan açık artırma platformu.",
    Badge: "Canlı Motor · Anlık Senkron",
    Home: "Ana Sayfa",
    Features: "Özellikler",
    HowItWorks: "Nasıl Çalışır",
    NavTitle: "Gezinti",
    LegalTitle: "Yasal",
    ContactTitle: "İletişim",
    Privacy: "Gizlilik Politikası",
    Terms: "Kullanım Koşulları",
    Imprint: "Künye",
    Copyright: "© 2026 ArcBids. Tüm hakları saklıdır.",
    CraftedWith: "Yüksek erişilebilirlikli gerçek zamanlı altyapı",
  },
  AuctionPage: {
    MetaTags: {
      url: "/auction",
      title: "Canlı Açık Artırma Odası — ArcBids",
      description:
        "Canlı teklif, birim fiyat ve anti-snipe korumasıyla gerçek zamanlı B2B açık artırmaya katılın.",
      imgUrl: "/opengraph-image",
      tags: ["canlı açık artırma", "B2B teklif", "ArcBids"],
    },
  },
  DashboardPage: {
    MetaTags: {
      url: "/dashboard",
      title: "Satıcı Paneli — ArcBids",
      description:
        "Organizasyonunuzu, alıcı listelerinizi, açık artırma odalarınızı ve kazananları yönetin.",
      imgUrl: "/opengraph-image",
      tags: ["satıcı paneli", "açık artırma yönetimi", "ArcBids"],
    },
    Copy: {
      Loading: "Panel yükleniyor…",
      LiveBadge: "Canlı",
      ConnectingBadge: "Bağlanıyor",
      SignOut: "Çıkış Yap",
      ActiveAuctions: "Aktif Açık Artırmalar",
      FinishedAuctions: "Tamamlanan",
      TotalSold: "Toplam Satış",
      OrganizationTitle: "Organizasyon",
      EditOrganizationTitle: "Organizasyonu Düzenle",
      EditOrganizationDesc: "Organizasyon adını ve herkese açık URL adresini güncelleyin.",
      OrganizationNameLabel: "Organizasyon Adı",
      SlugLabel: "Slug",
      Cancel: "İptal",
      SaveChanges: "Kaydet",
      InvitedBuyersTitle: "Davetli Alıcılar",
      InvitedBuyerPlaceholder: "alici@sirket.com",
      WhitelistAction: "Onayla",
      NoBuyersYet: "Henüz davetli alıcı yok.",
      Active: "Aktif",
      Paused: "Duraklatıldı",
      Revoke: "Askıya Al",
      Restore: "Geri Yükle",
      AuctionsTitle: "Açık Artırmalar",
      NoAuctionsYet: "Henüz açık artırma yok. İlkini oluşturmak için + simgesine tıklayın.",
      PreviewStatus: "Önizleme",
      LiveStatus: "Canlı",
      EndedStatus: "Bitti",
      PublicBadge: "Herkese Açık",
      InviteOnlyBadge: "Sadece Davetli",
      LotTimerSuffix: "sn lot süresi",
      MinIncrementSuffix: "min. artış",
      StartAction: "Başlat",
      CreateAuctionTitle: "Açık Artırma Oluştur",
      CreateAuctionDesc: "Oda kurallarınızı belirleyin.",
      EditAuctionTitle: "Açık Artırmayı Düzenle",
      EditAuctionDesc: "Başlamadan önce oda ayarlarını veya zamanlamayı güncelleyin.",
      WinnersTitleSuffix: "Kazananlar",
      WinnersDesc: "Kazanan alıcılarla doğrudan iletişime geçin.",
      LotsSoldSummary: "lot satıldı",
      TotalLabel: "Toplam",
      WinnerLabel: "Kazanan:",
      NoWinningBids: "Kazanan teklif yok",
      UnsoldLabel: "Satılmadı",
      EmailWinner: "E-posta Gönder",
      CopyEmail: "E-postayı Kopyala",
      Copied: "Kopyalandı",
      RoomSettingsHeading: "Oda Ayarları",
      RoomTitleLabel: "Oda Başlığı",
      RoomTitlePlaceholder: "Q1 Elektronik Toptan Satış",
      CurrencyLabel: "Para Birimi",
      LotTimerLabel: "Lot Süresi (sn)",
      AntiSnipeLabel: "Anti-Snipe (sn)",
      MinStepLabel: "Min. Artış",
      PublicAuctionTitle: "Herkese Açık Artırma",
      PublicAuctionOnDesc: "Bağlantıya sahip herkes katılıp teklif verebilir",
      PublicAuctionOffDesc: "Sadece davetli · onaylı alıcı listesi gerektirir",
      AutoBidTitle: "Otomatik Teklifi Aç",
      AutoBidDesc: "Alıcıların maksimum teklif tavanı belirlemesine izin ver",
      ScheduleTitle: "Başlangıç Zamanı Planla",
      ScheduleOptionalPrefix: "İsteğe bağlı · Tarih ve saat seçin",
      ScheduleAtWord: "saat",
      ClearSchedule: "Temizle",
      LotsHeading: "Lotlar",
      AddLot: "Lot Ekle",
      EditLotTitle: "Lotu Düzenle",
      AddLotTitle: "Lot Ekle",
      EditLotDesc: "Lot başlığını, başlangıç fiyatını veya fotoğrafları güncelleyin.",
      AddLotDesc: "Bu açık artırmaya bir ürün veya toptan palet ekleyin.",
      AddLotHintCreate: "Oluşturmadan önce en az bir lot ekleyin.",
      AddLotHintEdit: "Kaydetmeden önce en az bir lot ekleyin.",
      CreateAuctionAction: "Açık Artırma Oluştur",
      SaveLotAction: "Lotu Kaydet",
      LotTitleLabel: "Lot Başlığı",
      QuantityLabel: "Adet",
      StartPriceLabel: "Başlangıç Fiyatı",
      DescriptionLabel: "Açıklama",
      DescriptionPlaceholder: "A sınıfı toptan parti, test edilmiş ve kapalı kutu.",
      LotImagesLabel: "Lot Fotoğrafları",
      UploadingPhotos: "Yükleniyor…",
      DropPhotos: "Fotoğrafları tıklayın veya sürükleyin",
      PhotoHint: "10 MB'a kadar PNG, JPG, WebP, GIF",
    },
  },
  LoginPage: {
    MetaTags: {
      url: "/login",
      title: "Giriş Yap — ArcBids",
      description:
        "6 haneli e-posta kodu veya sihirli bağlantı ile ArcBids satıcı alanınıza giriş yapın.",
      imgUrl: "/opengraph-image",
      tags: ["ArcBids giriş", "satıcı girişi"],
    },
  },
};
