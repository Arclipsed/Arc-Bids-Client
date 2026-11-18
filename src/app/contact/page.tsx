import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { SiteNav } from "@/components/SiteNav";
import { ArcBidsLogo } from "@/components/ArcBidsLogo";
import FooterSection from "@/components/FooterSection";
import { ContactPageForm } from "@/components/ContactPageForm";
import { MetaTagService } from "@/services/MetaTagService";
import { TranslationService } from "@/services/TranslationService";
import { Locale } from "@/translations/Translations";

export const metadata: Metadata = MetaTagService.CreateMetaTags({
  url: "/contact",
  title: "Contact Us — ArcBids",
  description:
    "Get in touch with the ArcBids team for seller onboarding, technical support, or general inquiries.",
  imgUrl: "/opengraph-image",
  tags: ["ArcBids contact", "support", "B2B wholesale auctions"],
});

const CONTENT = {
  EN: {
    eyebrow: "Support & Inquiries",
    title: "Contact Us",
    subtitle:
      "Have a question about launching a wholesale auction room, onboarding buyers, or custom enterprise features? Send us a message and our team will reply to your email.",
    directLabel: "Or email us directly at",
    form: {
      nameLabel: "Full Name",
      namePlaceholder: "Jane Doe",
      emailLabel: "Work Email",
      emailPlaceholder: "you@company.com",
      companyLabel: "Company (optional)",
      companyPlaceholder: "Nordic Commerce GmbH",
      topicLabel: "Topic",
      topics: [
        "General Inquiry",
        "Seller Onboarding",
        "Technical Support",
        "Legal & Privacy",
      ],
      messageLabel: "Message",
      messagePlaceholder: "Tell us how we can help…",
      submitLabel: "Send Message",
      sendingLabel: "Sending…",
      successTitle: "Message sent",
      successDesc:
        "Thanks for reaching out. Your message has been delivered to our support team and we will get back to you shortly.",
      sendAnother: "Send another message",
    },
  },
  DE: {
    eyebrow: "Support & Anfragen",
    title: "Kontakt",
    subtitle:
      "Fragen zum Start eines Großhandels-Auktionsraums, zum Käufer-Onboarding oder zu individuellen Anforderungen? Schreiben Sie uns – unser Team meldet sich zeitnah per E-Mail.",
    directLabel: "Oder schreiben Sie uns direkt an",
    form: {
      nameLabel: "Vollständiger Name",
      namePlaceholder: "Max Mustermann",
      emailLabel: "Geschäftliche E-Mail",
      emailPlaceholder: "sie@unternehmen.de",
      companyLabel: "Unternehmen (optional)",
      companyPlaceholder: "Nordic Commerce GmbH",
      topicLabel: "Thema",
      topics: [
        "Allgemeine Anfrage",
        "Verkäufer-Onboarding",
        "Technischer Support",
        "Rechtliches & Datenschutz",
      ],
      messageLabel: "Nachricht",
      messagePlaceholder: "Wie können wir Ihnen helfen?",
      submitLabel: "Nachricht senden",
      sendingLabel: "Wird gesendet…",
      successTitle: "Nachricht gesendet",
      successDesc:
        "Vielen Dank für Ihre Anfrage. Ihre Nachricht wurde an unser Support-Team übermittelt und wir melden uns in Kürze.",
      sendAnother: "Weitere Nachricht senden",
    },
  },
} as const;

async function ContactContent() {
  const locale = await TranslationService.GetUserLocale();
  const t = TranslationService.GetTranslations(locale);
  const copy = locale === Locale.DE ? CONTENT.DE : CONTENT.EN;

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

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
          {copy.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {copy.subtitle}
        </p>

        <div className="mt-8">
          <ContactPageForm copy={copy.form} />
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          {copy.directLabel}{" "}
          <a
            href="mailto:support@arcbids.com"
            className="font-medium text-[#3ff2e0] hover:underline"
          >
            support@arcbids.com
          </a>
        </p>
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

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#05070c]" />}>
      <ContactContent />
    </Suspense>
  );
}
