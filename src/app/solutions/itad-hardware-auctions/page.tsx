import { Suspense } from "react";
import type { Metadata } from "next";
import { MetaTagService } from "@/services/MetaTagService";
import {
  SolutionPageTemplate,
  type SolutionPageData,
} from "@/components/SolutionPageTemplate";

export const metadata: Metadata = MetaTagService.CreateMetaTags({
  url: "/solutions/itad-hardware-auctions",
  title: "B2B ITAD & Refurbished Hardware Live Auctions — ArcBids",
  description:
    "Sell corporate laptops, smartphones, and refurbished ITAD hardware lots in private 15-minute live B2B auctions with zero commission and automatic anti-snipe timer extensions.",
  imgUrl: "/opengraph-image",
  tags: [
    "ITAD auction software",
    "B2B refurbished hardware auctions",
    "sell corporate laptops wholesale",
    "IT remarketing live bidding",
    "ArcBids",
  ],
});

const DATA: SolutionPageData = {
  EN: {
    eyebrow: "Solution · ITAD & IT Remarketing",
    headline: "Sell Refurbished Hardware Lots in 15-Minute Live Auctions",
    subheadline:
      "Stop emailing Excel stocklists and waiting days for cherry-picked replies. Invite your vetted B2B buyers to a private live room where they compete in real time for your laptop, smartphone, and server batches.",
    ctaPrimary: "Launch an ITAD Auction Room",
    ctaSecondary: "See How It Works",
    problemTitle: "Why Excel Stocklists Cost ITAD Sellers Margin",
    problemBody:
      "When you send a PDF or spreadsheet of graded ThinkPads, MacBooks, or iPhones to 30 wholesale buyers, they reply individually, cherry-pick A-grade units, and negotiate downward in isolation. With ArcBids, every approved buyer sees the same live lot and competes transparently—pushing prices up instead of down.",
    benefitsTitle: "Built for ITAD & Refurbished Wholesale Teams",
    benefits: [
      {
        title: "0% Commission on Hardware Volume",
        body: "Keep 100% of your wholesale margin. Whether a laptop batch sells for €4,000 or €45,000, ArcBids takes zero percentage cut.",
      },
      {
        title: "Automatic Timer Extension",
        body: "Last-second snipe bids automatically extend the countdown so serious buyers can counter-bid and your lot reaches true market value.",
      },
      {
        title: "Private Buyer Whitelist",
        body: "Restrict rooms to your verified B2B reseller list by email. Buyers join via one link—no password setup or app download.",
      },
      {
        title: "Instant Winner Summary",
        body: "As soon as the timer hits zero, you receive the winning buyer's company name and email to issue your invoice immediately.",
      },
    ],
    workflowTitle: "From Stocklist to Sold in Three Steps",
    workflowSteps: [
      {
        step: "01",
        title: "Create Your Private Room",
        body: "Set your currency, reserve price, and minimum bid increment. Upload lot photos and grading specs in minutes.",
      },
      {
        step: "02",
        title: "Share One Private Link",
        body: "Send the room link to your regular ITAD buyers via email or WhatsApp. Only whitelisted buyers can bid.",
      },
      {
        step: "03",
        title: "Invoice the Highest Bidder",
        body: "Watch bids climb live in real time and close the batch with full price transparency and zero back-and-forth.",
      },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Do my hardware buyers need to create an ArcBids account?",
        a: "No. Buyers open your room link, verify their whitelisted email with a quick code, and start bidding immediately—no password required.",
      },
      {
        q: "Can I run invite-only rooms for closed dealer groups?",
        a: "Yes. Every room supports an email whitelist so only your approved B2B dealers can see or bid on sensitive corporate IT batches.",
      },
      {
        q: "Does ArcBids handle escrow or shipping?",
        a: "No. ArcBids is your real-time bidding engine. Once the lot closes, you invoice and ship to the winner directly using your existing B2B terms.",
      },
    ],
    closingTitle: "Ready to run your next ITAD drop live?",
    closingBody:
      "Set up your first private hardware auction room in under two minutes and test it with your own buyer list.",
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
      { href: "/how-it-works", label: "How ArcBids Works" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  DE: {
    eyebrow: "Lösung · ITAD & Refurbished Hardware",
    headline: "Refurbished-Hardware-Lots in 15 Minuten live versteigern",
    subheadline:
      "Schluss mit endlosen Excel-Listen per E-Mail und Einzelverhandlungen. Laden Sie Ihre Stammhändler in einen privaten Live-Raum ein – und lassen Sie alle gleichzeitig auf Ihre Laptop-, Smartphone- und Server-Posten bieten.",
    ctaPrimary: "ITAD-Auktionsraum starten",
    ctaSecondary: "So funktioniert's",
    problemTitle: "Warum Excel-Stocklisten Marge kosten",
    problemBody:
      "Wer eine Bestandsliste mit gegradeten ThinkPads, MacBooks oder iPhones per Mail an 30 Händler schickt, bekommt Einzelantworten, Rosinenpickerei bei A-Ware und Preisdruck im 1-zu-1-Chat. Bei ArcBids sehen alle freigegebenen Händler dasselbe Los gleichzeitig und überbieten sich live.",
    benefitsTitle: "Gemacht für ITAD- & Refurbished-Großhändler",
    benefits: [
      {
        title: "0 % Provision auf Ihr Handelsvolumen",
        body: "Behalten Sie 100 % Ihrer Marge. Ob ein Notebook-Posten für 4.000 € oder 45.000 € weggeht – wir nehmen keinen Prozentanteil.",
      },
      {
        title: "Automatische Timer-Verlängerung",
        body: "Gebote in den letzten Sekunden verlängern den Countdown automatisch, damit kein Händler ein Last-Second-Schnäppchen abgreift.",
      },
      {
        title: "Private Händler-Freigabe",
        body: "Beschränken Sie den Raum per E-Mail-Liste auf Ihre geprüften B2B-Käufer. Einstieg über einen Link – ohne Passwort oder App.",
      },
      {
        title: "Sofortige Gewinner-Daten",
        body: "Direkt nach Ablauf des Timers erhalten Sie Name und E-Mail des Höchstbietenden für Ihre Rechnungsstellung.",
      },
    ],
    workflowTitle: "Vom Bestand zur Rechnung in drei Schritten",
    workflowSteps: [
      {
        step: "01",
        title: "Privaten Raum anlegen",
        body: "Währung, Startpreis und Gebotsschritt festlegen, Fotos und Grading-Infos hinzufügen – fertig in wenigen Minuten.",
      },
      {
        step: "02",
        title: "Einen Link teilen",
        body: "Link per E-Mail oder WhatsApp an Ihre Stammhändler senden. Nur freigegebene Adressen dürfen mitbieten.",
      },
      {
        step: "03",
        title: "An den Höchstbietenden fakturieren",
        body: "Verfolgen Sie steigende Gebote live in Echtzeit und schließen Sie den Posten ohne Einzel-Chats ab.",
      },
    ],
    faqTitle: "Häufige Fragen",
    faqs: [
      {
        q: "Müssen meine Käufer ein Passwort oder Konto anlegen?",
        a: "Nein. Ihre Händler öffnen einfach den Link, bestätigen kurz ihre freigegebene E-Mail-Adresse und bieten sofort mit.",
      },
      {
        q: "Kann ich geschlossene Auktionen nur für Stammhändler machen?",
        a: "Ja. Jeder Raum lässt sich per E-Mail-Whitelist auf Ihre eigenen B2B-Käufer beschränken.",
      },
      {
        q: "Übernimmt ArcBids Zahlung oder Versand?",
        a: "Nein. ArcBids ist Ihre Live-Auktionssoftware. Nach Auktionsende stellen Sie die Rechnung wie gewohnt direkt an den Gewinner.",
      },
    ],
    closingTitle: "Bereit für Ihren nächsten ITAD-Drop?",
    closingBody:
      "Erstellen Sie Ihren ersten privaten Auktionsraum in unter zwei Minuten und testen Sie ihn direkt mit Ihrer Händlerliste.",
    relatedTitle: "Weitere B2B-Lösungen entdecken",
    relatedLinks: [
      {
        href: "/solutions/liquidation-pallet-auctions",
        label: "Restposten- & Retourenpaletten-Auktionen",
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

export default function ItadHardwareAuctionsPage() {
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
