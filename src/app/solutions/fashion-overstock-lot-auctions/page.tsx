import { Suspense } from "react";
import type { Metadata } from "next";
import { MetaTagService } from "@/services/MetaTagService";
import {
  SolutionPageTemplate,
  type SolutionPageData,
} from "@/components/SolutionPageTemplate";

export const metadata: Metadata = MetaTagService.CreateMetaTags({
  url: "/solutions/fashion-overstock-lot-auctions",
  title: "Fashion, Apparel & Retail Overstock B2B Auctions — ArcBids",
  description:
    "Sell seasonal fashion overstock, footwear stocklots, and retail B-ware privately to vetted outlet and off-price buyers in live 15-minute auctions.",
  imgUrl: "/opengraph-image",
  tags: [
    "fashion overstock auction",
    "Textil Restposten B2B",
    "apparel stocklot wholesale",
    "off-price retail liquidation",
    "ArcBids",
  ],
});

const DATA: SolutionPageData = {
  EN: {
    eyebrow: "Solution · Apparel & Retail Overstock",
    headline: "Move Seasonal Fashion & Retail Overstock Discreetly",
    subheadline:
      "Clear past-season apparel, footwear cartons, and retail B-ware without listing on public marketplaces. Invite only your trusted off-price buyers to bid live in a private room.",
    ctaPrimary: "Start a Private Stocklot Auction",
    ctaSecondary: "See How It Works",
    problemTitle: "Brand Protection Meets Fast Seasonal Clearance",
    problemBody:
      "Apparel and lifestyle wholesalers often can't dump branded overstock on public portals without hurting brand positioning. ArcBids gives you invite-only rooms where only your vetted outlet partners see the lots and compete live.",
    benefitsTitle: "Built for Apparel, Footwear & Brand Stocklots",
    benefits: [
      {
        title: "100% Invite-Only Brand Discretion",
        body: "Lock rooms by email whitelist so stocklots never leak to unapproved public marketplaces.",
      },
      {
        title: "Zero Commission on Carton Lots",
        body: "Sell 500-piece or 5,000-piece assortments without giving away 10% to a broker.",
      },
      {
        title: "Competitive Live Price Discovery",
        body: "Let regional outlet buyers bid against each other in real time instead of accepting the lowest offer.",
      },
      {
        title: "Fast Post-Season Turnaround",
        body: "Launch a drop in minutes and clear warehouse racks before the next collection arrives.",
      },
    ],
    workflowTitle: "Discreet Off-Price Drops in Three Steps",
    workflowSteps: [
      {
        step: "01",
        title: "Create a Private Room",
        body: "Upload carton photos, size-run notes, and starting bid inside an invite-only room.",
      },
      {
        step: "02",
        title: "Invite Vetted Off-Price Buyers",
        body: "Share the private link exclusively with your approved outlet and export partners.",
      },
      {
        step: "03",
        title: "Close & Ship",
        body: "Invoice the winning buyer immediately after the 15-minute live drop ends.",
      },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Can Google or uninvited visitors see my private stocklot room?",
        a: "No. Invite-only rooms require email verification against your buyer whitelist.",
      },
      {
        q: "Can I auction multiple size-run cartons in one event?",
        a: "Yes. Add multiple lots to a single room so your buyers can bid across your full seasonal drop.",
      },
      {
        q: "Is there any fee per piece or percentage cut?",
        a: "No—0% commission on every lot.",
      },
    ],
    closingTitle: "Clear seasonal stocklots without losing margin or control.",
    closingBody:
      "Launch a private live auction for your vetted off-price buyers in minutes.",
    relatedTitle: "Explore More B2B Solutions",
    relatedLinks: [
      {
        href: "/solutions/liquidation-pallet-auctions",
        label: "Liquidation & Return Pallet Auctions",
      },
      {
        href: "/solutions/whatsapp-b2b-auction-alternative",
        label: "WhatsApp B2B Auction Alternative",
      },
      { href: "/tools", label: "Free Wholesale Margin Calculator" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  DE: {
    eyebrow: "Lösung · Mode-, Schuh- & Marken-Restposten",
    headline: "Saison-Überhänge & Marken-Restposten diskret versteigern",
    subheadline:
      "Verkaufen Sie Vorjahreskollektionen, Schuh-Kartonware und Handels-B-Ware geschützt an Ihre geprüften Outlet- und Sonderpostenpartner – ohne öffentliche Marktplätze.",
    ctaPrimary: "Privaten Stocklot-Raum starten",
    ctaSecondary: "So funktioniert's",
    problemTitle: "Markenschutz und schneller Abverkauf gleichzeitig",
    problemBody:
      "Im Textil- und Markenhandel sollen Restposten nicht für jeden sichtbar auf offenen Portalen landen. Bei ArcBids laden Sie per E-Mail-Freigabe ausschließlich Ihre ausgewählten Partner in einen geschlossenen Live-Raum ein.",
    benefitsTitle: "Vorteile für Textil- & Konsumgüter-Großhändler",
    benefits: [
      {
        title: "Diskrete Einladungs-Räume",
        body: "Nur freigegebene Outlet- und Export-Partner sehen Ihre Ware und dürfen bieten.",
      },
      {
        title: "0 % Vermittlungsprovision",
        body: "Versteigern Sie ganze Karton-Posten direkt ohne teure Zwischenhändler.",
      },
      {
        title: "Bessere Preise durch Live-Wettbewerb",
        body: "Statt dem niedrigsten Einzelgebot zuzustimmen, überbieten sich Ihre Abnehmer live.",
      },
      {
        title: "Schnell Platz für neue Kollektionen",
        body: "In wenigen Minuten erstellt, in 15 Minuten abgeschlossen.",
      },
    ],
    workflowTitle: "In drei Schritten zum diskreten Abverkauf",
    workflowSteps: [
      {
        step: "01",
        title: "Geschlossenen Raum anlegen",
        body: "Karton-Fotos, Größenschlüssel und Startpreis hinterlegen.",
      },
      {
        step: "02",
        title: "Partner einladen",
        body: "Privaten Link exklusiv an Ihre geprüften Sonderpostenkäufer senden.",
      },
      {
        step: "03",
        title: "Zuschlag & Versand",
        body: "Direkt nach Auktionsende an den Höchstbietenden fakturieren.",
      },
    ],
    faqTitle: "Häufige Fragen",
    faqs: [
      {
        q: "Sind meine privaten Räume öffentlich sichtbar?",
        a: "Nein. Bei aktivierter E-Mail-Whitelist haben nur Ihre eingeladenen Käufer Zugriff.",
      },
      {
        q: "Kann ich mehrere Karton-Posten nacheinander versteigern?",
        a: "Ja, beliebig viele Lose lassen sich in einem Raum bündeln.",
      },
      {
        q: "Fallen Verkaufsprovisionen an?",
        a: "Nein, 0 % Provision.",
      },
    ],
    closingTitle: "Saisonware diskret und mit voller Marge abverkaufen.",
    closingBody:
      "Testen Sie ArcBids kostenlos mit Ihren nächsten Überhang-Posten.",
    relatedTitle: "Weitere B2B-Lösungen & Tools",
    relatedLinks: [
      {
        href: "/solutions/liquidation-pallet-auctions",
        label: "Restposten- & Retourenpaletten-Auktionen",
      },
      {
        href: "/solutions/whatsapp-b2b-auction-alternative",
        label: "Alternative zu WhatsApp-B2B-Verkäufen",
      },
      { href: "/tools", label: "Kostenloser Margen-Rechner" },
      { href: "/pricing", label: "Preise" },
    ],
  },
};

export default function FashionOverstockLotAuctionsPage() {
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
