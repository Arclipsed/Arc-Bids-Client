import type { IMetaTags } from "@/services/MetaTagService";

export interface ITranslation {
  Nav: {
    Auctions: string;
    Features: string;
    HowItWorks: string;
    Pricing: string;
    GetStarted: string;
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
    LiveRoom: string;
    NavTitle: string;
    LegalTitle: string;
    ContactTitle: string;
    Privacy: string;
    Terms: string;
    Copyright: string;
    CraftedWith: string;
  };
  AuctionPage: {
    MetaTags: IMetaTags;
  };
  DashboardPage: {
    MetaTags: IMetaTags;
  };
  LoginPage: {
    MetaTags: IMetaTags;
  };
}
