import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Calculator } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { ArcBidsLogo } from "@/components/ArcBidsLogo";
import FooterSection from "@/components/FooterSection";
import { MetaTagService } from "@/services/MetaTagService";
import { TranslationService } from "@/services/TranslationService";
import { Locale } from "@/translations/Translations";

export const metadata: Metadata = MetaTagService.CreateMetaTags({
  url: "/solutions",
  title: "B2B Wholesale Auction Solutions & Industry Guides — ArcBids",
  description:
    "Explore how ITAD remarketers, pallet liquidators, smartphone wholesalers, industrial surplus dealers, and fashion stocklot sellers run 0% commission live auctions on ArcBids.",
  imgUrl: "/opengraph-image",
  tags: [
    "B2B auction solutions",
    "ITAD remarketing",
    "liquidation pallet auctions",
    "wholesale auction guides",
    "ArcBids",
  ],
});

const COPY = {
  EN: {
    eyebrow: "Industry Solutions",
    title: "Built for Every High-Velocity B2B Wholesale Niche",
    subtitle:
      "See how wholesale teams replace slow spreadsheets and 1-on-1 WhatsApp chats with private 15-minute live auctions at 0% commission.",
    toolsBannerTitle: "Free B2B Wholesale Margin & Fee Savings Calculator",
    toolsBannerBody:
      "Calculate your break-even starting bid, ideal bid increment, and how much you save with 0% commission vs traditional 10–15% marketplaces.",
    toolsCta: "Open Free Calculator",
    readGuide: "Read guide",
  },
  DE: {
    eyebrow: "Branchenlösungen",
    title: "Gemacht für schnellen B2B-Großhandel",
    subtitle:
      "Erfahren Sie, wie Großhändler langsame Excel-Listen und 1-zu-1-WhatsApp-Chats durch private 15-Minuten-Live-Auktionen mit 0 % Provision ersetzen.",
    toolsBannerTitle: "Kostenloser Paletten-Margen- & Provisions-Rechner",
    toolsBannerBody:
      "Berechnen Sie Ihren Mindest-Startpreis, den optimalen Gebotsschritt und Ihre Ersparnis bei 0 % Provision gegenüber klassischen Marktplätzen.",
    toolsCta: "Zum kostenlosen Rechner",
    readGuide: "Mehr erfahren",
  },
} as const;

async function SolutionsContent() {
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

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.Nav.SolutionItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col justify-between rounded-3xl border border-white/[0.07] bg-[#090d14] p-6 transition hover:border-[#3ff2e0]/40 hover:bg-[#0c121c]"
            >
              <div>
                <h2 className="text-base font-semibold text-white group-hover:text-[#e4fffb]">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#3ff2e0]">
                {copy.readGuide}
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-14 rounded-3xl border border-[#3ff2e0]/20 bg-gradient-to-br from-[#0b141a] to-[#090d14] p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3ff2e0]">
                <Calculator className="h-4 w-4" />
                <span>{t.Nav.Tools}</span>
              </div>
              <h2 className="mt-2 text-xl font-bold text-white">
                {copy.toolsBannerTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                {copy.toolsBannerBody}
              </p>
            </div>
            <Link
              href="/tools"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#e4fffb] px-5 py-3 text-xs font-semibold text-[#04070b] transition hover:bg-white"
            >
              {copy.toolsCta}
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
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

export default function SolutionsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#05070c]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        </div>
      }
    >
      <SolutionsContent />
    </Suspense>
  );
}
