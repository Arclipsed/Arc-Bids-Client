import type { ITranslation } from "../ITranslation";

export const EN: ITranslation = {
  Nav: {
    Auctions: "Auctions",
    Features: "Features",
    HowItWorks: "How It Works",
    Pricing: "Pricing",
    GetStarted: "Get Started",
    DropTitle: "Live Auction Room",
    DropDesc: "Join an active wholesale auction room with real-time bidding.",
    FeaturesDropTitle: "Platform Features",
    FeaturesDropDesc: "Sub-second live sync, anti-snipe timers, and verified buyer access.",
  },
  HomePage: {
    MetaTags: {
      url: "/",
      title: "ArcBids — Real-Time B2B Wholesale Auctions",
      description:
        "Launch private or public wholesale auction rooms in minutes—with instant live bidding, anti-snipe protection, and effortless buyer invites.",
      imgUrl: "/opengraph-image",
      tags: [
        "B2B auctions",
        "wholesale auction platform",
        "live bidding",
        "ITAD remarketing",
        "liquidation auctions",
        "ArcBids",
      ],
    },
    HeroTitleStart: "Real-time B2B auctions,",
    HeroTitleHighlight: "built for speed.",
    HeroSubtitle:
      "Launch private wholesale auction rooms in minutes—with instant live bidding, anti-snipe protection, and effortless buyer invites.",
    PrimaryCta: "Get Started",
    SecondaryCta: "How It Works",
    StepsEyebrow: "How It Works",
    StepsTitle: "Launch a room in three steps.",
    Steps: [
      {
        step: "01",
        title: "Create your auction room",
        description:
          "Add your wholesale lots, set starting prices, unit quantities, minimum increments, and anti-snipe rules in minutes.",
      },
      {
        step: "02",
        title: "Invite your buyers",
        description:
          "Share public or invite-only room links so vetted buyers can join with their name and email—no passwords required.",
      },
      {
        step: "03",
        title: "Run live & close fast",
        description:
          "Watch bids land in real time, let anti-snipe keep bidding fair, and contact winning buyers directly when the room closes.",
      },
    ],
  },
  HowItWorksPage: {
    MetaTags: {
      url: "/how-it-works",
      title: "How It Works — ArcBids Live B2B Auctions",
      description:
        "Step-by-step walkthrough of how sellers host wholesale auction rooms and how buyers join, bid, and close deals on ArcBids.",
      imgUrl: "/opengraph-image",
      tags: ["how ArcBids works", "B2B auction workflow", "anti-snipe", "wholesale drops"],
    },
    Eyebrow: "How It Works",
    TitleStart: "From wholesale lots to closed deals —",
    TitleHighlight: "step by step.",
    Subtitle:
      "ArcBids runs live, synchronized wholesale auction rooms directly in the browser. Here is a clear walkthrough of how sellers host rooms and how buyers join and bid.",
    SellerEyebrow: "For Sellers",
    SellerTitle: "Hosting a live auction",
    SellerSteps: [
      {
        step: "01",
        title: "Set up your organization",
        summary:
          "Sign in with your email code or magic link—no passwords required. ArcBids creates your organization workspace and public storefront page (arcbids.com/your-slug) automatically.",
        detail:
          "You can customize your organization name and URL slug anytime from the Seller Dashboard.",
      },
      {
        step: "02",
        title: "Configure room rules & access",
        summary:
          "Choose your auction title, currency (EUR or USD), per-lot countdown timer, anti-snipe window, and minimum bid increment.",
        detail:
          "Set the room to Public (anyone with the link can join) or Invite-Only (only emails on your Organization Whitelist can enter). You can also schedule a future start date and time.",
      },
      {
        step: "03",
        title: "Add your wholesale lots",
        summary:
          "Add at least one lot with a title, unit quantity, starting price, description, and photos.",
        detail:
          "Uploaded photos are automatically resized and compressed for fast loading. Setting a quantity (e.g. 40 units) lets buyers see live per-unit pricing as bids climb.",
      },
      {
        step: "04",
        title: "Share the room link & go live",
        summary:
          "Share your private unguessable room link or your organization page with buyers.",
        detail:
          "Before the auction starts, buyers see an Auction Preview with a live countdown and an Add to Calendar button. Click Start anytime—or let scheduled rooms open automatically.",
      },
      {
        step: "05",
        title: "Close automatically & contact winners",
        summary:
          "When a lot timer hits zero, the highest bidder wins and the room advances to the next queued lot automatically.",
        detail:
          "Once all lots finish, open the Winners dialog on your dashboard to view every sold lot, winning bid, and buyer email with one-click copy and email actions.",
      },
    ],
    BuyerEyebrow: "For Buyers",
    BuyerTitle: "Joining & placing bids",
    BuyerSteps: [
      {
        step: "01",
        title: "Open the auction link",
        summary:
          "Open the room link shared by the seller. If the room is in Preview, you can inspect the upcoming lots and add the start time to your calendar.",
      },
      {
        step: "02",
        title: "Enter your name & email",
        summary:
          "Provide your name (or company) and email address to enter. Invite-only rooms verify your email against the seller's whitelist; public rooms let anyone join with their name.",
      },
      {
        step: "03",
        title: "Place bids in real time",
        summary:
          "Watch photos, unit counts, per-unit pricing, and the live Activity feed update instantaneously. Use the quick-step buttons (Min, +$100, etc.) to bid in one click.",
      },
      {
        step: "04",
        title: "Fair close & fulfillment",
        summary:
          "Anti-snipe protection keeps last-second bidding fair. When the timer finishes, the highest bidder locks in the lot and the seller follows up directly via email.",
      },
    ],
    MechanicsEyebrow: "Under the Hood",
    MechanicsTitle: "Built-in auction rules",
    Mechanics: [
      {
        title: "Anti-Snipe Timer",
        description:
          "If a bid is placed during the final seconds of a lot (inside the room's anti-snipe window, e.g. 15s), the countdown automatically extends back to that window so every buyer has a fair chance to respond.",
      },
      {
        title: "Single Session Per Email",
        description:
          "Each email address can only be active once in a given auction room at a time. This prevents duplicate sessions across multiple tabs or devices while keeping bidding clean and accountable.",
      },
      {
        title: "Automatic Lot Progression",
        description:
          "Lots run sequentially in the order you set. When one lot expires, it is marked Sold (if it received bids) or Unsold, and the next queued lot activates immediately until the auction ends.",
      },
      {
        title: "Direct Seller-to-Winner Contact",
        description:
          "ArcBids captures the winning buyer's name and email on every bid so sellers can immediately invoice and coordinate delivery from the Winners panel after the auction finishes.",
      },
    ],
    CtaTitle: "Ready to launch your first auction room?",
    CtaSubtitle:
      "Create your organization, add your wholesale lots, and invite buyers in minutes.",
    CtaPrimary: "Open Dashboard",
    CtaSecondary: "View Pricing",
  },
  PricingPage: {
    MetaTags: {
      url: "/pricing",
      title: "Pricing — ArcBids",
      description:
        "Simple, transparent pricing for B2B wholesale auction rooms. Start running live drops with zero commission fees.",
      imgUrl: "/opengraph-image",
      tags: ["ArcBids pricing", "B2B auction pricing", "wholesale software"],
    },
  },
  AuctionPage: {
    MetaTags: {
      url: "/auction",
      title: "Live Auction Room — ArcBids",
      description:
        "Join a real-time B2B wholesale auction room on ArcBids with live bidding, unit pricing, and anti-snipe protection.",
      imgUrl: "/opengraph-image",
      tags: ["live auction room", "B2B bidding", "ArcBids"],
    },
  },
  DashboardPage: {
    MetaTags: {
      url: "/dashboard",
      title: "Seller Dashboard — ArcBids",
      description:
        "Manage your organization, whitelist buyers, create wholesale auction rooms, and contact winning bidders.",
      imgUrl: "/opengraph-image",
      tags: ["seller dashboard", "auction management", "ArcBids"],
    },
  },
  LoginPage: {
    MetaTags: {
      url: "/login",
      title: "Sign In — ArcBids",
      description:
        "Sign in to your ArcBids seller workspace with an instant 6-digit email verification code or magic link.",
      imgUrl: "/opengraph-image",
      tags: ["ArcBids login", "seller sign in"],
    },
  },
};
