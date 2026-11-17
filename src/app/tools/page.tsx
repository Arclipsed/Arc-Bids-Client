import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { SiteNav } from "@/components/SiteNav";
import { ArcBidsLogo } from "@/components/ArcBidsLogo";
import FooterSection from "@/components/FooterSection";
import {
  WholesaleCalculator,
  type CalculatorCopy,
} from "@/components/WholesaleCalculator";
import { MetaTagService } from "@/services/MetaTagService";
import { TranslationService } from "@/services/TranslationService";
import { Locale } from "@/translations/Translations";

export const metadata: Metadata = MetaTagService.CreateMetaTags({
  url: "/tools",
  title: "Free B2B Pallet Margin & Auction Savings Calculator — ArcBids",
  description:
    "Calculate wholesale pallet net profit, break-even starting bids, ideal live auction bid increments, and how much you save with 0% commission vs B2B marketplaces.",
  imgUrl: "/opengraph-image",
  tags: [
    "wholesale pallet margin calculator",
    "Paletten Kalkulator Restposten",
    "B2B auction fee savings calculator",
    "liquidation ROI calculator",
    "ArcBids",
  ],
});

const COPY: Record<
  "EN" | "DE",
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    calculator: CalculatorCopy;
    faqTitle: string;
    faqs: { q: string; a: string }[];
    relatedTitle: string;
    relatedLinks: { href: string; label: string }[];
  }
> = {
  EN: {
    eyebrow: "Free B2B Tools",
    title: "Wholesale Pallet Margin & Fee Savings Calculator",
    subtitle:
      "Plan your next liquidation pallet, ITAD batch, or smartphone drop. Estimate net profit, see how much 10–15% marketplace commissions cost you, and get a smart starting bid + increment.",
    calculator: {
      currencyLabel: "Currency",
      inputsTitle: "Lot & Cost Inputs",
      unitsLabel: "Units in Lot",
      avgUnitSaleLabel: "Target Avg. Price / Unit",
      lotCostLabel: "Lot Purchase Cost",
      logisticsCostLabel: "Prep & Freight Cost",
      marketplaceFeeLabel: "Competing Marketplace Commission",
      resultsTitle: "Margin & Auction Strategy",
      expectedRevenueLabel: "Estimated Lot Value",
      netProfitArcBidsLabel: "Net Profit (ArcBids 0%)",
      netProfitMarketplaceLabel: "Net After Marketplace Fee",
      commissionSavedLabel: "Saved with ArcBids",
      suggestedStartLabel: "Suggested Starting Bid",
      suggestedIncrementLabel: "Suggested Bid Step",
      suggestedIncrementHint:
        "Starting slightly above break-even with clean increments keeps 15-minute live auctions fast and competitive.",
      ctaLabel: "Launch This Lot as a Free Auction",
    },
    faqTitle: "How to Price a Wholesale Auction Lot",
    faqs: [
      {
        q: "Where should I set my starting bid?",
        a: "Set your starting bid right around your break-even cost (purchase + prep/freight) or 70–75% of expected hammer value so buyers jump in early and bid against each other.",
      },
      {
        q: "What bid increment works best for 15-minute live drops?",
        a: "Aim for roughly 1% to 2% of the total lot value (e.g. +€50 on a €5,000 batch or +€100 on a €15,000 batch). Too small slows the room down; too large scares off marginal bids.",
      },
      {
        q: "Why does 0% commission matter so much in wholesale?",
        a: "Wholesale margins are often 10–25%. Paying a 12% marketplace fee can wipe out half your net profit on every pallet or hardware batch.",
      },
    ],
    relatedTitle: "Explore B2B Auction Solutions",
    relatedLinks: [
      {
        href: "/solutions/itad-hardware-auctions",
        label: "ITAD & Refurbished Hardware",
      },
      {
        href: "/solutions/liquidation-pallet-auctions",
        label: "Liquidation & Return Pallets",
      },
      {
        href: "/solutions/b2b-smartphone-stock-auctions",
        label: "B2B Smartphone Stocklots",
      },
      {
        href: "/solutions/whatsapp-b2b-auction-alternative",
        label: "WhatsApp B2B Alternative",
      },
    ],
  },
  DE: {
    eyebrow: "Kostenlose B2B-Tools",
    title: "Paletten-Margen- & Provisions-Rechner für Großhändler",
    subtitle:
      "Planen Sie Ihren nächsten Restposten-, ITAD- oder Smartphone-Drop: Berechnen Sie Ihren Netto-Gewinn, die Ersparnis gegenüber 10–15 % Marktplatz-Gebühren sowie Startpreis & Gebotsschritt.",
    calculator: {
      currencyLabel: "Währung",
      inputsTitle: "Posten & Kosten",
      unitsLabel: "Stückzahl im Los",
      avgUnitSaleLabel: "Zielpreis pro Stück",
      lotCostLabel: "Einkaufspreis (Los)",
      logisticsCostLabel: "Handling & Fracht",
      marketplaceFeeLabel: "Marktplatz-Provision (Vergleich)",
      resultsTitle: "Marge & Auktions-Empfehlung",
      expectedRevenueLabel: "Geschätzter Los-Erlös",
      netProfitArcBidsLabel: "Nettogewinn (ArcBids 0 %)",
      netProfitMarketplaceLabel: "Netto nach Marktplatz-Gebühr",
      commissionSavedLabel: "Mit ArcBids gespart",
      suggestedStartLabel: "Empfohlener Startpreis",
      suggestedIncrementLabel: "Empfohlener Gebotsschritt",
      suggestedIncrementHint:
        "Ein Startpreis knapp über Break-even mit klaren Schritten sorgt in 15-Minuten-Auktionen für schnelle Gebote.",
      ctaLabel: "Dieses Los jetzt kostenlos starten",
    },
    faqTitle: "Tipps für die richtige Auktions-Kalkulation",
    faqs: [
      {
        q: "Wie hoch sollte der Startpreis sein?",
        a: "Idealerweise knapp über Ihrem Break-even (Einkauf + Fracht) oder bei ca. 70–75 % des Zielpreises, damit sofort mehrere Händler einsteigen.",
      },
      {
        q: "Welcher Gebotsschritt passt für 15-Minuten-Auktionen?",
        a: "Rund 1–2 % des Loswerts (z. B. +50 € bei 5.000 € oder +100 € bei 15.000 €). So bleibt das Tempo hoch, ohne Käufer abzuschrecken.",
      },
      {
        q: "Warum macht 0 % Provision im B2B so viel aus?",
        a: "Im Großhandel liegen Netto-Margen oft bei 10–25 %. Eine 12-%-Marktplatzgebühr frisst schnell die Hälfte Ihres Gewinns auf.",
      },
    ],
    relatedTitle: "B2B-Auktionslösungen entdecken",
    relatedLinks: [
      {
        href: "/solutions/itad-hardware-auctions",
        label: "ITAD & Refurbished Hardware",
      },
      {
        href: "/solutions/liquidation-pallet-auctions",
        label: "Restposten & Retourenpaletten",
      },
      {
        href: "/solutions/b2b-smartphone-stock-auctions",
        label: "Smartphone-Großhandel",
      },
      {
        href: "/solutions/whatsapp-b2b-auction-alternative",
        label: "WhatsApp-B2B-Alternative",
      },
    ],
  },
};

async function ToolsContent() {
  const locale = await TranslationService.GetUserLocale();
  const t = TranslationService.GetTranslations(locale);
  const copy = locale === Locale.DE ? COPY.DE : COPY.EN;

  return (
    <div className="flex min-h-screen flex-col bg-[#05070c] text-zinc-100">
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05070c]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <ArcBidsLogo />
            <span className="text-base font-bold tracking-tight text-white">
              ArcBids
            </span>
          </Link>

          <SiteNav nav={t.Nav} />

          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-1.5 rounded-full bg-[#e4fffb] px-4 py-2 text-xs font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_20px_rgba(63,242,224,0.18)] transition hover:bg-white hover:shadow-[0_0_26px_rgba(63,242,224,0.3)]"
            >
              {t.Nav.GetStarted}
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
          {copy.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
          {copy.subtitle}
        </p>

        <div className="mt-10">
          <WholesaleCalculator copy={copy.calculator} />
        </div>

        <section className="mt-14">
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {copy.faqTitle}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {copy.faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-3xl border border-white/[0.07] bg-[#090d14] p-6"
              >
                <h3 className="text-sm font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <nav
          aria-label={copy.relatedTitle}
          className="mt-12 border-t border-white/[0.06] pt-8"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            {copy.relatedTitle}
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {copy.relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 text-xs text-zinc-300 transition hover:border-[#3ff2e0]/40 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </main>

      <FooterSection
        tagline={t.Footer.Tagline}
        badge={t.Footer.Badge}
        homeLabel={t.Footer.Home}
        featuresLabel={t.Footer.Features}
        howItWorksLabel={t.Footer.HowItWorks}
        pricingLabel={t.Nav.Pricing}
        quickLinksTitle={t.Footer.NavTitle}
        legalTitle={t.Footer.LegalTitle}
        contactTitle={t.Footer.ContactTitle}
        privacyLabel={t.Footer.Privacy}
        termsLabel={t.Footer.Terms}
        imprintLabel={t.Footer.Imprint}
        copyright={t.Footer.Copyright}
        craftedWith={t.Footer.CraftedWith}
      />
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#05070c]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        </div>
      }
    >
      <ToolsContent />
    </Suspense>
  );
}
