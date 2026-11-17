import { Suspense } from "react";
import type { Metadata } from "next";
import { MetaTagService } from "@/services/MetaTagService";
import {
  SolutionPageTemplate,
  type SolutionPageData,
} from "@/components/SolutionPageTemplate";

export const metadata: Metadata = MetaTagService.CreateMetaTags({
  url: "/solutions/industrial-surplus-machinery-auctions",
  title: "Industrial Surplus, Tools & MRO B2B Auctions — ArcBids",
  description:
    "Sell industrial surplus, warehouse equipment, power tools, and MRO spare parts directly to your B2B trade buyers in fast, commission-free live auctions.",
  imgUrl: "/opengraph-image",
  tags: [
    "industrial surplus auction software",
    "Industrie Restposten Auktion",
    "B2B Werkzeug Sonderposten",
    "MRO overstock bidding",
    "ArcBids",
  ],
});

const DATA: SolutionPageData = {
  EN: {
    eyebrow: "Solution · Industrial Surplus & Tools",
    headline: "Turn Industrial Surplus & Tool Lots Into Cash Faster",
    subheadline:
      "Clear warehouse overstock, power tool pallets, MRO parts, and workshop equipment by inviting trade buyers into a focused live auction—without paying 10–15% to traditional auction houses.",
    ctaPrimary: "Start an Industrial Auction",
    ctaSecondary: "See How It Works",
    problemTitle: "Traditional Industrial Auctioneers Charge Too Much and Move Too Slowly",
    problemBody:
      "Handing surplus tools or warehouse gear to a traditional auction house means weeks of waiting plus steep seller and buyer premiums. With ArcBids, you run your own private 20-minute auction directly for your trade network and keep 100% of the hammer price.",
    benefitsTitle: "Why Industrial & Tool Wholesalers Use ArcBids",
    benefits: [
      {
        title: "Keep 100% of the Hammer Price",
        body: "No 12% seller fee and no surprise buyer premiums that make dealers bid lower.",
      },
      {
        title: "Clear Warehouse Space on Schedule",
        body: "Set a fixed drop window when pallets or machines need to leave your floor.",
      },
      {
        title: "Private Trade-Buyer Access",
        body: "Invite only verified B2B tool dealers, contractors, or export buyers via email whitelist.",
      },
      {
        title: "Fair Anti-Snipe Closing",
        body: "Late bids automatically add extra seconds so serious buyers don't lose out at the buzzer.",
      },
    ],
    workflowTitle: "Simple Three-Step Surplus Liquidation",
    workflowSteps: [
      {
        step: "01",
        title: "Upload Lot Photos & Specs",
        body: "Add equipment photos, pallet counts, condition notes, and starting bid.",
      },
      {
        step: "02",
        title: "Notify Your Trade List",
        body: "Send one private link to your regular buyers by email or WhatsApp.",
      },
      {
        step: "03",
        title: "Invoice & Arrange Pickup",
        body: "Receive the winning buyer's details immediately after closing to coordinate freight.",
      },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Can I set a minimum starting price for heavy equipment?",
        a: "Yes. Every lot lets you define the exact starting price and minimum bid increment.",
      },
      {
        q: "Are there any buyer premiums?",
        a: "No. ArcBids charges 0% commission and 0% buyer premium so buyers can bid their full budget.",
      },
      {
        q: "Can I run auctions in EUR, USD, or GBP?",
        a: "Yes. Choose the currency that fits your trade buyers.",
      },
    ],
    closingTitle: "Ready to clear surplus stock without auction-house fees?",
    closingBody:
      "Create your first industrial surplus room in minutes and invite your trade buyers.",
    relatedTitle: "Explore More B2B Solutions",
    relatedLinks: [
      {
        href: "/solutions/liquidation-pallet-auctions",
        label: "Liquidation & Return Pallet Auctions",
      },
      {
        href: "/solutions/itad-hardware-auctions",
        label: "ITAD & Refurbished Hardware Auctions",
      },
      { href: "/tools", label: "Free Wholesale Margin Calculator" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  DE: {
    eyebrow: "Lösung · Industrie-Restposten & Werkzeuge",
    headline: "Industrie-Sonderposten & Werkzeug-Paletten direkt versteigern",
    subheadline:
      "Räumen Sie Lagerüberhänge, Werkzeug-Paletten, MRO-Ersatzteile und Betriebsausstattung in fokussierten Live-Auktionen mit Ihren Fachhändlern – ohne 10–15 % Auktionshaus-Gebühren.",
    ctaPrimary: "Industrie-Auktion starten",
    ctaSecondary: "So funktioniert's",
    problemTitle: "Warum klassische Verwertungs-Portale zu teuer und zu langsam sind",
    problemBody:
      "Externe Auktionshäuser verlangen oft zweistellige Verkäufer- und Käuferaufgelder – das drückt direkt auf Ihre Netto-Marge. Mit ArcBids versteigern Sie direkt an Ihre eigenen B2B-Abnehmer und behalten 100 % des Zuschlagspreises.",
    benefitsTitle: "Vorteile für Industrie- & Werkzeug-Großhändler",
    benefits: [
      {
        title: "Keine Auktionsgebühren, kein Aufgeld",
        body: "0 % Verkaufsprovision und 0 % Käuferaufgeld bedeuten höhere Gebote direkt für Sie.",
      },
      {
        title: "Planbare Lagerräumung",
        body: "Starten Sie feste 20-Minuten-Drops, wenn Paletten oder Maschinen schnell vom Hof müssen.",
      },
      {
        title: "Exklusiv für gewerbliche Abnehmer",
        body: "Per E-Mail-Whitelist bieten nur Ihre geprüften Händler, Handwerksbetriebe oder Exporteure mit.",
      },
      {
        title: "Saubere Verlängerung bei Schlussgeboten",
        body: "Kommt kurz vor Ende ein Gebot, verlängert sich der Timer automatisch.",
      },
    ],
    workflowTitle: "In drei Schritten vom Lager zum Zuschlag",
    workflowSteps: [
      {
        step: "01",
        title: "Posten beschreiben",
        body: "Fotos, Stückzahl, Zustand und Startgebot im privaten Raum anlegen.",
      },
      {
        step: "02",
        title: "Stammkunden einladen",
        body: "Privaten Link per Mail oder WhatsApp an Ihre Einkäufer senden.",
      },
      {
        step: "03",
        title: "Abholung & Rechnung",
        body: "Direkt nach Ablauf erhalten Sie die Gewinner-Daten für Rechnung und Spedition.",
      },
    ],
    faqTitle: "Häufige Fragen",
    faqs: [
      {
        q: "Kann ich einen Mindest-Startpreis festlegen?",
        a: "Ja, für jedes Los definieren Sie Startpreis und Gebotsschritt frei.",
      },
      {
        q: "Zahlen meine Käufer ein Aufgeld?",
        a: "Nein. Bei ArcBids gibt es weder Käuferaufgeld noch Verkaufsprovision.",
      },
      {
        q: "Welche Währungen werden unterstützt?",
        a: "Sie können Ihre Räume flexibel u. a. in EUR, USD oder GBP führen.",
      },
    ],
    closingTitle: "Lagerplatz freimachen ohne Auktionshaus-Provision?",
    closingBody:
      "Testen Sie ArcBids für Ihren nächsten Sonderposten- oder Werkzeug-Drop.",
    relatedTitle: "Weitere B2B-Lösungen & Tools",
    relatedLinks: [
      {
        href: "/solutions/liquidation-pallet-auctions",
        label: "Restposten- & Retourenpaletten-Auktionen",
      },
      {
        href: "/solutions/itad-hardware-auctions",
        label: "ITAD & Refurbished-Hardware-Auktionen",
      },
      { href: "/tools", label: "Kostenloser Margen-Rechner" },
      { href: "/pricing", label: "Preise" },
    ],
  },
};

export default function IndustrialSurplusMachineryAuctionsPage() {
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
