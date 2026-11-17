import { Suspense } from "react";
import type { Metadata } from "next";
import { MetaTagService } from "@/services/MetaTagService";
import {
  SolutionPageTemplate,
  type SolutionPageData,
} from "@/components/SolutionPageTemplate";

export const metadata: Metadata = MetaTagService.CreateMetaTags({
  url: "/solutions/b2b-smartphone-stock-auctions",
  title: "B2B Smartphone & Mobile Stock Live Auctions — ArcBids",
  description:
    "Auction graded iPhone, Samsung, and refurbished mobile stocklots to vetted B2B dealers in 15-minute private rooms with 0% commission.",
  imgUrl: "/opengraph-image",
  tags: [
    "B2B smartphone wholesale auction",
    "Handy Großhandel Auktion",
    "used iPhone bulk lot bidding",
    "mobile phone remarketing software",
    "ArcBids",
  ],
});

const DATA: SolutionPageData = {
  EN: {
    eyebrow: "Solution · Mobile & Telecom Wholesale",
    headline: "Auction Graded Smartphone Stocklots in Real Time",
    subheadline:
      "Mobile device prices drop every week. Instead of waiting days for Skype, WhatsApp, or email quotes on your iPhone and Samsung batches, let your vetted dealers bid live in 15 minutes.",
    ctaPrimary: "Launch a Mobile Stock Auction",
    ctaSecondary: "See How It Works",
    problemTitle: "Why Static Mobile Stocklists Lose Value Fast",
    problemBody:
      "In B2B telecom trading, inventory depreciates daily. Sending spreadsheets to 40 dealers leads to endless counter-offers, cherry-picking of Grade A+ units, and stalled deals. Live auctions force instant price discovery across your entire buyer list at once.",
    benefitsTitle: "Built for High-Velocity Mobile Distributors",
    benefits: [
      {
        title: "0% Commission on High-Ticket Lots",
        body: "Mobile batches easily cross €20,000+. Keep every euro of margin with flat, commission-free auctions.",
      },
      {
        title: "Private Dealer Whitelist",
        body: "Only your approved telecom resellers and export buyers can enter the room via email verification.",
      },
      {
        title: "Automatic Timer Extension",
        body: "Last-second bids extend the countdown automatically so dealers compete fairly up to their real ceiling.",
      },
      {
        title: "Instant Winner Data",
        body: "Close the batch and get the winning buyer's details immediately for pro-forma invoicing and IMEI manifest handoff.",
      },
    ],
    workflowTitle: "Run Daily or Weekly Device Drops",
    workflowSteps: [
      {
        step: "01",
        title: "List Your Graded Batch",
        body: "Add model mix, grade breakdown, quantity, currency, and starting price in two minutes.",
      },
      {
        step: "02",
        title: "Send One Room Link",
        body: "Share the private link in your dealer WhatsApp or email broadcast before the drop starts.",
      },
      {
        step: "03",
        title: "Close & Invoice Immediately",
        body: "Lock in the highest live bid at the buzzer without haggling across 15 chat windows.",
      },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Can I auction multiple smartphone batches in one session?",
        a: "Yes. Queue separate lots for Grade A, Grade B, or specific carrier-locked batches inside one room.",
      },
      {
        q: "Do my buyers need an account or password?",
        a: "No. Whitelisted dealers verify with a quick email code and bid right from their phone or desktop.",
      },
      {
        q: "Does ArcBids take a percentage of phone sales?",
        a: "Never. We charge 0% commission regardless of lot value.",
      },
    ],
    closingTitle: "Move mobile inventory before prices dip.",
    closingBody:
      "Run your next graded smartphone batch as a 15-minute live auction with your own dealer list.",
    relatedTitle: "Explore More B2B Solutions",
    relatedLinks: [
      {
        href: "/solutions/itad-hardware-auctions",
        label: "ITAD & Refurbished Hardware Auctions",
      },
      {
        href: "/solutions/liquidation-pallet-auctions",
        label: "Liquidation & Return Pallet Auctions",
      },
      { href: "/tools", label: "Free Wholesale Margin Calculator" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  DE: {
    eyebrow: "Lösung · Mobilfunk- & Smartphone-Großhandel",
    headline: "Gegradete Smartphone-Posten in Echtzeit versteigern",
    subheadline:
      "Im Mobilfunk-Großhandel sinken Preise jede Woche. Statt tagelang auf Rückmeldungen zu Ihrer iPhone- oder Samsung-Liste zu warten, bieten Ihre Stammhändler 15 Minuten live gegeneinander.",
    ctaPrimary: "Smartphone-Auktion starten",
    ctaSecondary: "So funktioniert's",
    problemTitle: "Warum statische Bestandslisten im Handy-Großhandel Marge kosten",
    problemBody:
      "Wer Excel-Listen an 40 Händler schickt, bekommt nur Einzelgebote, Rosinenpickerei bei A-Ware und zähe Preisdrückerei. Eine kurze Live-Auktion sorgt für sofortigen Wettbewerb auf das komplette Los.",
    benefitsTitle: "Perfekt für Smartphone-Distributoren & Refurbisher",
    benefits: [
      {
        title: "0 % Provision auch bei hohen Warenwerten",
        body: "Geräte-Posten liegen schnell bei 20.000 € und mehr. Sie behalten 100 % Ihres Erlöses.",
      },
      {
        title: "Geschlossene Händler-Räume",
        body: "Nur Ihre per E-Mail freigegebenen B2B-Käufer und Export-Händler dürfen mitbieten.",
      },
      {
        title: "Automatische Timer-Verlängerung",
        body: "Last-Second-Gebote verlängern den Countdown automatisch – für saubere Preisfindung ohne Sniping.",
      },
      {
        title: "Sofort abrechnen",
        body: "Direkt nach Auktionsende erhalten Sie die Gewinner-Daten für Proforma-Rechnung und IMEI-Liste.",
      },
    ],
    workflowTitle: "Tägliche oder wöchentliche Device-Drops",
    workflowSteps: [
      {
        step: "01",
        title: "Posten einstellen",
        body: "Modell-Mix, Grading, Stückzahl und Startpreis in zwei Minuten anlegen.",
      },
      {
        step: "02",
        title: "Link an Händler senden",
        body: "Privaten Raum-Link in Ihren bestehenden Händler-Verteiler posten.",
      },
      {
        step: "03",
        title: "Ohne Nachverhandlung abschließen",
        body: "Nach 15 Minuten steht das Höchstgebot fest – ganz ohne 15 parallele Chats.",
      },
    ],
    faqTitle: "Häufige Fragen",
    faqs: [
      {
        q: "Kann ich mehrere Geräte-Lots in einem Raum versteigern?",
        a: "Ja, z. B. getrennt nach Grade A, Grade B oder verschiedenen Modellen in derselben Session.",
      },
      {
        q: "Brauchen meine Händler ein Passwort?",
        a: "Nein. Ein Klick auf den Link und ein kurzer E-Mail-Code genügen.",
      },
      {
        q: "Nimmt ArcBids eine Umsatzbeteiligung?",
        a: "Nein, 0 % Verkaufsprovision – egal wie hoch der Warenwert ist.",
      },
    ],
    closingTitle: "Geräte schneller drehen, bevor Preise fallen.",
    closingBody:
      "Testen Sie ArcBids kostenlos für Ihren nächsten Smartphone-Posten.",
    relatedTitle: "Weitere B2B-Lösungen & Tools",
    relatedLinks: [
      {
        href: "/solutions/itad-hardware-auctions",
        label: "ITAD & Refurbished-Hardware-Auktionen",
      },
      {
        href: "/solutions/liquidation-pallet-auctions",
        label: "Restposten- & Retourenpaletten-Auktionen",
      },
      { href: "/tools", label: "Kostenloser Margen-Rechner" },
      { href: "/pricing", label: "Preise" },
    ],
  },
};

export default function B2bSmartphoneStockAuctionsPage() {
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
