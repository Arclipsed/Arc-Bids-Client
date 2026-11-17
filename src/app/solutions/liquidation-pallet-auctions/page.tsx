import { Suspense } from "react";
import type { Metadata } from "next";
import { MetaTagService } from "@/services/MetaTagService";
import {
  SolutionPageTemplate,
  type SolutionPageData,
} from "@/components/SolutionPageTemplate";

export const metadata: Metadata = MetaTagService.CreateMetaTags({
  url: "/solutions/liquidation-pallet-auctions",
  title: "Liquidation & Return Pallet B2B Auction Platform — ArcBids",
  description:
    "Move mixed return pallets, Amazon customer returns, and overstock wholesale lots faster with live 15-minute B2B auctions and 0% commission.",
  imgUrl: "/opengraph-image",
  tags: [
    "liquidation pallet auction",
    "Restposten Auktion B2B",
    "Retourenpaletten versteigern",
    "wholesale overstock bidding",
    "ArcBids",
  ],
});

const DATA: SolutionPageData = {
  EN: {
    eyebrow: "Solution · Liquidation & Return Pallets",
    headline: "Move Return Pallets & Overstock at Higher Margins",
    subheadline:
      "Turn incoming mixed pallets, A/B/C returns, and seasonal overstock into competitive 15-minute live auctions for your regular resellers—with 0% marketplace commission.",
    ctaPrimary: "Start a Pallet Auction",
    ctaSecondary: "See How It Works",
    problemTitle: "Why Fixed-Price Pallet Lists Leave Money on the Table",
    problemBody:
      "Posting fixed prices on wholesale portals or messaging buyers one-by-one forces you to guess the ceiling price—and still invites haggling. Live bidding lets your buyers reveal what a pallet is truly worth when they see another dealer bidding against them.",
    benefitsTitle: "Designed for Pallet Liquidators & Surplus Wholesalers",
    benefits: [
      {
        title: "Zero Marketplace Commission",
        body: "Unlike public liquidation marketplaces that take 8–15% per pallet, ArcBids charges 0% commission on your sales.",
      },
      {
        title: "No Last-Second Sniping",
        body: "Automatic countdown extension ensures late bids always give competing buyers a fair chance to bid higher.",
      },
      {
        title: "Your Buyers Stay Your Buyers",
        body: "Run private, invite-only rooms for your own reseller network without exposing your buyers to competing wholesalers.",
      },
      {
        title: "Fast Turnover from Dock to Sold",
        body: "List new pallets as soon as they hit the warehouse floor and close bids within 15 to 30 minutes.",
      },
    ],
    workflowTitle: "How Liquidators Use ArcBids",
    workflowSteps: [
      {
        step: "01",
        title: "Snap & List Pallets",
        body: "Add pallet photos, manifest notes, starting bid, and bid increment in a clean private room.",
      },
      {
        step: "02",
        title: "Invite Your Resellers",
        body: "Drop the private room link into your existing WhatsApp broadcast or email list.",
      },
      {
        step: "03",
        title: "Close & Dispatch",
        body: "Get the winning buyer's contact details immediately at the buzzer and arrange pickup or freight.",
      },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Can I sell multiple pallets in one auction room?",
        a: "Yes. You can queue multiple pallet lots inside a single room so your buyers stay engaged through the entire drop.",
      },
      {
        q: "Will competing sellers see my buyers?",
        a: "No. Your private room and buyer whitelist belong strictly to your organization.",
      },
      {
        q: "How fast can I set up my first pallet auction?",
        a: "In just a few minutes—sign in with your email, create a room, and share the link.",
      },
    ],
    closingTitle: "Ready to clear your warehouse faster?",
    closingBody:
      "Test ArcBids on your next return pallet drop and see how live competition lifts your average pallet price.",
    relatedTitle: "Explore More B2B Solutions",
    relatedLinks: [
      {
        href: "/solutions/itad-hardware-auctions",
        label: "ITAD & Refurbished Hardware Auctions",
      },
      {
        href: "/solutions/whatsapp-b2b-auction-alternative",
        label: "WhatsApp B2B Auction Alternative",
      },
      { href: "/how-it-works", label: "How ArcBids Works" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  DE: {
    eyebrow: "Lösung · Restposten & Retourenpaletten",
    headline: "Retourenpaletten & Restposten mit höherer Marge abverkaufen",
    subheadline:
      "Verwandeln Sie Mischpaletten, Retourenware und Überbestände in knackige 15-Minuten-Live-Auktionen für Ihre Stammhändler – bei 0 % Verkaufsprovision.",
    ctaPrimary: "Paletten-Auktion starten",
    ctaSecondary: "So funktioniert's",
    problemTitle: "Warum Festpreis-Listen im Restpostenhandel Marge verschenken",
    problemBody:
      "Bei festen Preisen per WhatsApp oder PDF raten Sie den Maximalpreis – und Händler verhandeln trotzdem nach unten. In einer Live-Auktion sehen Ihre Käufer echte Konkurrenz und treiben den Preis für gefragte Paletten sauber nach oben.",
    benefitsTitle: "Vorteile für Restposten- & Palettenhändler",
    benefits: [
      {
        title: "0 % Provision pro Palette",
        body: "Anders als klassische B2B-Marktplätze mit 8–15 % Gebühr zahlen Sie bei ArcBids null Prozent Provision auf Ihren Umsatz.",
      },
      {
        title: "Keine Last-Second-Schnäppchen",
        body: "Geht kurz vor Schluss ein Gebot ein, verlängert sich der Timer automatisch – so steigt der Preis fair weiter.",
      },
      {
        title: "Ihre Stammkunden bleiben Ihre Kunden",
        body: "Private Räume nur für Ihre eingeladenen Händler – keine fremden Verkäufer, die Ihre Kontakte abgreifen.",
      },
      {
        title: "Schneller Lagerumschlag",
        body: "Neue Ware direkt nach Wareneingang einstellen, Link teilen und innerhalb von 15–30 Minuten verbindlich zuschlagen.",
      },
    ],
    workflowTitle: "So läuft ein Paletten-Drop mit ArcBids",
    workflowSteps: [
      {
        step: "01",
        title: "Palette einstellen",
        body: "Fotos, Warenwert-Infos, Startpreis und Gebotsschritt im Raum hinterlegen.",
      },
      {
        step: "02",
        title: "Link an Händler senden",
        body: "Den privaten Raum-Link einfach in Ihren bestehenden WhatsApp-Verteiler oder per Mail verschicken.",
      },
      {
        step: "03",
        title: "Gewinner direkt abrechnen",
        body: "Nach Ablauf der Zeit liegen Name und E-Mail des Höchstbietenden sofort für Rechnung und Abholung vor.",
      },
    ],
    faqTitle: "Häufige Fragen",
    faqs: [
      {
        q: "Kann ich mehrere Paletten nacheinander in einem Raum versteigern?",
        a: "Ja. Sie können mehrere Posten in einem einzigen Raum anlegen, sodass Ihre Händler beim kompletten Drop dabei bleiben.",
      },
      {
        q: "Sehen andere Großhändler meine Käuferliste?",
        a: "Nein. Ihre Räume und Händler-Whitelists sind komplett privat und nur für Ihr Unternehmen sichtbar.",
      },
      {
        q: "Wie schnell bin ich startklar?",
        a: "In wenigen Minuten: Per E-Mail anmelden, Raum anlegen und den Link an Ihre ersten Händler schicken.",
      },
    ],
    closingTitle: "Bereit für den nächsten Paletten-Drop?",
    closingBody:
      "Testen Sie ArcBids kostenlos an einem Ihrer nächsten Restposten und erleben Sie, wie Live-Gebote den Preis nach oben ziehen.",
    relatedTitle: "Weitere B2B-Lösungen entdecken",
    relatedLinks: [
      {
        href: "/solutions/itad-hardware-auctions",
        label: "ITAD & Refurbished-Hardware-Auktionen",
      },
      {
        href: "/solutions/whatsapp-b2b-auction-alternative",
        label: "Alternative zu WhatsApp-B2B-Verkäufen",
      },
      { href: "/how-it-works", label: "So funktioniert ArcBids" },
      { href: "/pricing", label: "Preise" },
    ],
  },
};

export default function LiquidationPalletAuctionsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#05070c]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        </div>
      }
    >
      <SolutionPageTemplate data={DATA} />
    </Suspense>
  );
}
