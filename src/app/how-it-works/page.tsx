import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import {
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  Gavel,
  Globe,
  Layers,
  Lock,
  Mail,
  Package,
  ShieldCheck,
  Trophy,
  UserCheck,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { ArcBidsLogo } from "@/components/ArcBidsLogo";
import FooterSection from "@/components/FooterSection";
import { MetaTagService } from "@/services/MetaTagService";
import { TranslationService } from "@/services/TranslationService";
import { EN } from "@/translations/en/en";

export const metadata: Metadata = MetaTagService.CreateMetaTags(
  EN.HowItWorksPage.MetaTags
);

const SELLER_ICONS = [Building2, ShieldCheck, Package, CalendarClock, Trophy];
const BUYER_ICONS = [Globe, UserCheck, Gavel, CheckCircle2];
const MECHANIC_ICONS = [Clock, Lock, Layers, Mail];

async function HowItWorksContent() {
  const locale = await TranslationService.GetUserLocale();
  const t = TranslationService.GetTranslations(locale);
  const page = t.HowItWorksPage;

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

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-20 px-4 py-14 sm:px-6 sm:py-20">
        {/* Hero */}
        <section className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
            {page.Eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.08]">
            {page.TitleStart}{" "}
            <span className="bg-gradient-to-r from-[#e4fffb] via-[#3ff2e0] to-[#0f8f9f] bg-clip-text text-transparent">
              {page.TitleHighlight}
            </span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            {page.Subtitle}
          </p>
        </section>

        {/* Seller Walkthrough */}
        <section className="space-y-6">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
              {page.SellerEyebrow}
            </p>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {page.SellerTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {page.SellerSteps.map((item, idx) => {
              const Icon = SELLER_ICONS[idx] ?? Building2;
              return (
                <div
                  key={item.step}
                  className="rounded-3xl border border-white/[0.08] bg-[#090d14] p-6 sm:p-7"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                    <div className="flex items-center gap-3 sm:w-28 sm:shrink-0">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 text-[#3ff2e0]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs font-bold text-zinc-500">
                        STEP {item.step}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-200">
                        {item.summary}
                      </p>
                      <p className="text-xs leading-relaxed text-zinc-400">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Buyer Walkthrough */}
        <section className="space-y-6">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
              {page.BuyerEyebrow}
            </p>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {page.BuyerTitle}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {page.BuyerSteps.map((item, idx) => {
              const Icon = BUYER_ICONS[idx] ?? Globe;
              return (
                <div
                  key={item.step}
                  className="rounded-3xl border border-white/[0.08] bg-[#090d14] p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#3ff2e0]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-bold text-zinc-500">
                      STEP {item.step}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {item.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Core Mechanics */}
        <section className="space-y-6">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
              {page.MechanicsEyebrow}
            </p>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {page.MechanicsTitle}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {page.Mechanics.map((m, idx) => {
              const Icon = MECHANIC_ICONS[idx] ?? Clock;
              return (
                <div
                  key={m.title}
                  className="rounded-3xl border border-white/[0.07] bg-[#0e1420]/60 p-6"
                >
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#3ff2e0]/20 bg-[#3ff2e0]/10 text-[#3ff2e0]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-3.5 text-base font-semibold text-white">
                    {m.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                    {m.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-[#3ff2e0]/20 bg-gradient-to-br from-[#0b181c] via-[#090d14] to-[#090d14] p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {page.CtaTitle}
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-sm text-zinc-400">
            {page.CtaSubtitle}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#e4fffb] px-6 text-sm font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_24px_rgba(63,242,224,0.2)] transition hover:bg-white"
            >
              {page.CtaPrimary}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.08] hover:text-white"
            >
              {page.CtaSecondary}
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

export default function HowItWorksPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#05070c]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        </div>
      }
    >
      <HowItWorksContent />
    </Suspense>
  );
}
