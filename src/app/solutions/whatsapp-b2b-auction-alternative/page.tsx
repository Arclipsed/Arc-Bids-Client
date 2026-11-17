import { Suspense } from "react";
import type { Metadata } from "next";
import { MetaTagService } from "@/services/MetaTagService";
import {
  SolutionPageTemplate,
  type SolutionPageData,
} from "@/components/SolutionPageTemplate";

export const metadata: Metadata = MetaTagService.CreateMetaTags({
  url: "/solutions/whatsapp-b2b-auction-alternative",
  title: "The Faster Alternative to WhatsApp B2B Wholesale Chats — ArcBids",
  description:
    "Replace messy WhatsApp broadcast replies and 1-on-1 price haggling with one private live auction link. Buyers bid in real time with no password and 0% commission.",
  imgUrl: "/opengraph-image",
  tags: [
    "WhatsApp B2B wholesale alternative",
    "B2B Händler-Auktion statt WhatsApp",
    "private wholesale bidding link",
    "ArcBids",
  ],
});

const DATA: SolutionPageData = {
  EN: {
    eyebrow: "Solution · Beyond WhatsApp Broadcasts",
    headline: "Replace Messy WhatsApp Wholesale Chats With One Live Link",
    subheadline:
      "Keep using WhatsApp to notify your buyers—just send them one private ArcBids link instead of juggling 20 separate chat threads, 'still available?' messages, and lowball offers.",
    ctaPrimary: "Create a Private Drop Link",
    ctaSecondary: "See How It Works",
    problemTitle: "The Hidden Cost of Selling B2B Lots Over WhatsApp",
    problemBody:
      "WhatsApp broadcasts are great for getting attention, but terrible for closing deals. Buyers reply privately at different times, ask for discounts because they can't see competing demand, and you spend hours answering the same questions before picking a winner.",
    benefitsTitle: "Keep the Speed of WhatsApp—Upgrade the Checkout",
    benefits: [
      {
        title: "One Link Replaces 20 Private Chats",
        body: "Paste your private ArcBids room link straight into your WhatsApp group or broadcast list. All bids happen in one live room.",
      },
      {
        title: "Transparent Live Competition",
        body: "When buyers see real-time counter-bids and a ticking clock, price resistance drops and urgency kicks in.",
      },
      {
        title: "Zero Friction for Repeat Dealers",
        body: "No app store download, no password to remember. Dealers click the link on mobile or desktop and bid in seconds.",
      },
      {
        title: "Clean Audit Trail for Invoicing",
        body: "Never scroll through chat history to prove who offered what. Every bid and winner is recorded cleanly.",
      },
    ],
    workflowTitle: "Upgrade Your Existing Broadcast Workflow",
    workflowSteps: [
      {
        step: "01",
        title: "Prep Your Drop in 2 Minutes",
        body: "Add your batch photos, starting price, and 15-minute countdown inside ArcBids.",
      },
      {
        step: "02",
        title: "Post the Link in WhatsApp",
        body: "Send your buyers: 'New lot going live at 14:00—bid directly here.'",
      },
      {
        step: "03",
        title: "Collect the Winning Offer",
        body: "At 14:15, the highest bidder wins automatically and you get their details ready for invoicing.",
      },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Do I have to stop using WhatsApp to use ArcBids?",
        a: "Not at all! Most sellers keep their WhatsApp broadcast lists to announce the drop and simply drop the ArcBids link so bidding happens cleanly in one place.",
      },
      {
        q: "Does ArcBids work well on mobile phones?",
        a: "Yes. The live bidding room is built mobile-first so dealers opening your link from WhatsApp on their phone can bid effortlessly.",
      },
      {
        q: "What happens if someone bids in the last 10 seconds?",
        a: "The timer automatically extends so other buyers in the room can react—maximizing your final sale price.",
      },
    ],
    closingTitle: "Stop negotiating one chat at a time.",
    closingBody:
      "Send your next WhatsApp broadcast with an ArcBids link and watch your buyers compete live.",
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
      { href: "/how-it-works", label: "How ArcBids Works" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  DE: {
    eyebrow: "Lösung · Besser als WhatsApp-Einzelchats",
    headline: "Schluss mit 20 parallelen WhatsApp-Chats pro Posten",
    subheadline:
      "Nutzen Sie WhatsApp weiter für die Ankündigung – aber schicken Sie Ihren Händlern einen privaten ArcBids-Link, statt einzeln über Preise zu verhandeln.",
    ctaPrimary: "Privaten Drop-Link erstellen",
    ctaSecondary: "So funktioniert's",
    problemTitle: "Warum der Direktverkauf per WhatsApp-Chat Zeit und Marge kostet",
    problemBody:
      "WhatsApp-Verteiler erreichen Ihre Händler schnell, aber danach beginnt das Chaos: zwanzig Einzel-Chats, ständige Rückfragen wie „Noch da?“, zähes Nachverhandeln und unklare Zusagen. Weil kein Käufer sieht, dass andere mitbieten, drücken alle den Preis.",
    benefitsTitle: "WhatsApp-Tempo behalten – Abschluss professionalisieren",
    benefits: [
      {
        title: "Ein Link statt 20 Einzel-Chats",
        body: "Posten Sie Ihren privaten ArcBids-Raum-Link direkt in Ihre WhatsApp-Gruppe oder Broadcast-Liste. Alle Gebote laufen zentral ein.",
      },
      {
        title: "Echter Wettbewerb unter Händlern",
        body: "Sobald Käufer live sehen, dass ein anderer Händler überbietet, steigt die Zahlungsbereitschaft spürbar.",
      },
      {
        title: "Mobil optimiert, ohne Passwort",
        body: "Händler tippen am Smartphone auf Ihren Link, bestätigen kurz ihre E-Mail und bieten in Sekunden – ohne App-Download.",
      },
      {
        title: "Saubere Dokumentation",
        body: "Kein Scrollen durch Chat-Verläufe mehr: Jedes Gebot und der finale Gewinner werden sauber protokolliert.",
      },
    ],
    workflowTitle: "So kombinieren Sie WhatsApp & ArcBids",
    workflowSteps: [
      {
        step: "01",
        title: "Posten in 2 Minuten anlegen",
        body: "Fotos, Startpreis und 15-Minuten-Timer in ArcBids einstellen.",
      },
      {
        step: "02",
        title: "Link in WhatsApp teilen",
        body: "Kurze Nachricht an Ihren Verteiler: „Neuer Posten live um 14:00 Uhr – hier direkt mitbieten.“",
      },
      {
        step: "03",
        title: "Höchstgebot kassieren",
        body: "Um 14:15 Uhr steht der Gewinner fest – inklusive Kontaktdaten für Ihre Rechnung.",
      },
    ],
    faqTitle: "Häufige Fragen",
    faqs: [
      {
        q: "Muss ich meine WhatsApp-Gruppen aufgeben?",
        a: "Überhaupt nicht! Sie nutzen WhatsApp weiter als schnellen Benachrichtigungskanal und verlagern nur die Gebotsabgabe in den ArcBids-Raum.",
      },
      {
        q: "Funktioniert das Bieten sauber am Handy?",
        a: "Ja. Der Live-Raum ist mobil optimiert, damit Händler den Link direkt aus WhatsApp heraus bequem bedienen können.",
      },
      {
        q: "Was passiert bei Geboten in den letzten Sekunden?",
        a: "Der Timer verlängert sich automatisch, damit andere Bieter reagieren können – für maximalen Verkaufspreis.",
      },
    ],
    closingTitle: "Nie wieder einzeln nachverhandeln.",
    closingBody:
      "Packen Sie beim nächsten WhatsApp-Broadcast einfach einen ArcBids-Link dazu und lassen Sie Ihre Käufer live bieten.",
    relatedTitle: "Weitere B2B-Lösungen entdecken",
    relatedLinks: [
      {
        href: "/solutions/liquidation-pallet-auctions",
        label: "Restposten- & Retourenpaletten-Auktionen",
      },
      {
        href: "/solutions/itad-hardware-auctions",
        label: "ITAD & Refurbished-Hardware-Auktionen",
      },
      { href: "/how-it-works", label: "So funktioniert ArcBids" },
      { href: "/pricing", label: "Preise" },
    ],
  },
};

export default function WhatsappB2bAuctionAlternativePage() {
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
