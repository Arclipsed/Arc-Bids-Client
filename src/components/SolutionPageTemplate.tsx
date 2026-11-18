import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { CheckCircle2 } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { ArcBidsLogo } from "@/components/ArcBidsLogo";
import FooterSection from "@/components/FooterSection";
import { TranslationService } from "@/services/TranslationService";
import { Locale } from "@/translations/Translations";

export interface SolutionCopy {
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  problemTitle: string;
  problemBody: string;
  benefitsTitle: string;
  benefits: { title: string; body: string }[];
  workflowTitle: string;
  workflowSteps: { step: string; title: string; body: string }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  relatedTitle: string;
  relatedLinks: { href: string; label: string }[];
  closingTitle: string;
  closingBody: string;
}

export interface SolutionPageData {
  EN: SolutionCopy;
  DE: SolutionCopy;
}

export async function SolutionPageTemplate({ data }: { data: SolutionPageData }) {
  const locale = await TranslationService.GetUserLocale();
  const t = TranslationService.GetTranslations(locale);
  const copy = locale === Locale.DE ? data.DE : data.EN;

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

          <div className="hidden items-center gap-2 min-[850px]:flex">
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

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
          {copy.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {copy.headline}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
          {copy.subheadline}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-full bg-[#e4fffb] px-6 py-3 text-sm font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_24px_rgba(63,242,224,0.2)] transition hover:bg-white"
          >
            {copy.ctaPrimary}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-zinc-200 transition hover:border-[#3ff2e0]/40 hover:text-white"
          >
            {copy.ctaSecondary}
          </Link>
        </div>

        <section className="mt-14 rounded-3xl border border-white/[0.07] bg-[#090d14] p-7">
          <h2 className="text-lg font-semibold text-white">
            {copy.problemTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {copy.problemBody}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {copy.benefitsTitle}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {copy.benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-3xl border border-white/[0.07] bg-[#090d14] p-6"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3ff2e0]" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {b.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                      {b.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {copy.workflowTitle}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {copy.workflowSteps.map((w) => (
              <div
                key={w.step}
                className="rounded-3xl border border-white/[0.07] bg-[#090d14] p-6"
              >
                <span className="font-mono text-xs font-semibold text-[#3ff2e0]">
                  {w.step}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-white">
                  {w.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {copy.faqTitle}
          </h2>
          <div className="mt-6 space-y-4">
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

        <section className="mt-14 rounded-3xl border border-[#3ff2e0]/20 bg-gradient-to-br from-[#0b141a] to-[#090d14] p-8">
          <h2 className="text-xl font-bold text-white">{copy.closingTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">
            {copy.closingBody}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 rounded-full bg-[#e4fffb] px-5 py-2.5 text-xs font-semibold text-[#04070b] transition hover:bg-white"
            >
              {copy.ctaPrimary}
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="text-xs font-medium text-[#3ff2e0] transition hover:underline"
            >
              {t.Nav.Pricing} →
            </Link>
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
