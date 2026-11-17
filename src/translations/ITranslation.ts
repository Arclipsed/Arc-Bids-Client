import type { IMetaTags } from "@/services/MetaTagService";

export interface ITranslation {
  Nav: {
    Auctions: string;
    Features: string;
    HowItWorks: string;
    Pricing: string;
    Tools: string;
    GetStarted: string;
    Solutions: string;
    SolutionItems: Array<{
      href: string;
      title: string;
      description: string;
    }>;
    DropTitle: string;
    DropDesc: string;
    FeaturesDropTitle: string;
    FeaturesDropDesc: string;
  };
  HomePage: {
    MetaTags: IMetaTags;
    HeroTitleStart: string;
    HeroTitleHighlight: string;
    HeroSubtitle: string;
    PrimaryCta: string;
    SecondaryCta: string;
    StepsEyebrow: string;
    StepsTitle: string;
    Steps: Array<{
      step: string;
      title: string;
      description: string;
    }>;
    Showcase: {
      Eyebrow: string;
      Title: string;
      Subtitle: string;
    };
    Features: {
      Eyebrow: string;
      Title: string;
      AutoBidTitle: string;
      AutoBidDesc: string;
      AutoBidToggleLabel: string;
      AntiSnipeTitle: string;
      AntiSnipeDesc: string;
      AntiSnipeExtended: string;
      InvitesTitle: string;
      InvitesDesc: string;
      InvitedLabel: string;
      PausedLabel: string;
    };
    BottomCtaTitle: string;
    BottomCtaSubtitle: string;
  };
  HowItWorksPage: {
    MetaTags: IMetaTags;
    Eyebrow: string;
    TitleStart: string;
    TitleHighlight: string;
    Subtitle: string;
    SellerEyebrow: string;
    SellerTitle: string;
    SellerSteps: Array<{
      step: string;
      title: string;
      summary: string;
      detail: string;
    }>;
    BuyerEyebrow: string;
    BuyerTitle: string;
    BuyerSteps: Array<{
      step: string;
      title: string;
      summary: string;
    }>;
    MechanicsEyebrow: string;
    MechanicsTitle: string;
    Mechanics: Array<{
      title: string;
      description: string;
    }>;
    CtaTitle: string;
    CtaSubtitle: string;
    CtaPrimary: string;
    CtaSecondary: string;
  };
  PricingPage: {
    MetaTags: IMetaTags;
    Section: {
      Eyebrow: string;
      Title: string;
      Plans: Array<{
        name: string;
        description: string;
        price: string;
        period: string;
        original: string;
        badge: string;
        cta: string;
        features: string[];
      }>;
    };
  };
  Footer: {
    Tagline: string;
    Badge: string;
    Home: string;
    Features: string;
    HowItWorks: string;
    NavTitle: string;
    LegalTitle: string;
    ContactTitle: string;
    Privacy: string;
    Terms: string;
    Imprint: string;
    Copyright: string;
    CraftedWith: string;
  };
  AuctionPage: {
    MetaTags: IMetaTags;
  };
  DashboardPage: {
    MetaTags: IMetaTags;
    Copy: {
      Loading: string;
      LiveBadge: string;
      ConnectingBadge: string;
      SignOut: string;
      ActiveAuctions: string;
      FinishedAuctions: string;
      TotalSold: string;
      OrganizationTitle: string;
      EditOrganizationTitle: string;
      EditOrganizationDesc: string;
      OrganizationNameLabel: string;
      SlugLabel: string;
      Cancel: string;
      SaveChanges: string;
      InvitedBuyersTitle: string;
      InvitedBuyerPlaceholder: string;
      WhitelistAction: string;
      NoBuyersYet: string;
      Active: string;
      Paused: string;
      Revoke: string;
      Restore: string;
      AuctionsTitle: string;
      NoAuctionsYet: string;
      PreviewStatus: string;
      LiveStatus: string;
      EndedStatus: string;
      PublicBadge: string;
      InviteOnlyBadge: string;
      LotTimerSuffix: string;
      MinIncrementSuffix: string;
      StartAction: string;
      CreateAuctionTitle: string;
      CreateAuctionDesc: string;
      EditAuctionTitle: string;
      EditAuctionDesc: string;
      WinnersTitleSuffix: string;
      WinnersDesc: string;
      LotsSoldSummary: string;
      TotalLabel: string;
      WinnerLabel: string;
      NoWinningBids: string;
      UnsoldLabel: string;
      EmailWinner: string;
      CopyEmail: string;
      Copied: string;
      RoomSettingsHeading: string;
      RoomTitleLabel: string;
      RoomTitlePlaceholder: string;
      CurrencyLabel: string;
      LotTimerLabel: string;
      AntiSnipeLabel: string;
      MinStepLabel: string;
      PublicAuctionTitle: string;
      PublicAuctionOnDesc: string;
      PublicAuctionOffDesc: string;
      AutoBidTitle: string;
      AutoBidDesc: string;
      ScheduleTitle: string;
      ScheduleOptionalPrefix: string;
      ScheduleAtWord: string;
      ClearSchedule: string;
      LotsHeading: string;
      AddLot: string;
      EditLotTitle: string;
      AddLotTitle: string;
      EditLotDesc: string;
      AddLotDesc: string;
      AddLotHintCreate: string;
      AddLotHintEdit: string;
      CreateAuctionAction: string;
      SaveLotAction: string;
      LotTitleLabel: string;
      QuantityLabel: string;
      StartPriceLabel: string;
      DescriptionLabel: string;
      DescriptionPlaceholder: string;
      LotImagesLabel: string;
      UploadingPhotos: string;
      DropPhotos: string;
      PhotoHint: string;
    };
  };
  LoginPage: {
    MetaTags: IMetaTags;
  };
}
