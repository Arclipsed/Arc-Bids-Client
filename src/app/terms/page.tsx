import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { SiteNav } from "@/components/SiteNav";
import { ArcBidsLogo } from "@/components/ArcBidsLogo";
import FooterSection from "@/components/FooterSection";
import { MetaTagService } from "@/services/MetaTagService";
import { TranslationService } from "@/services/TranslationService";
import { Locale } from "@/translations/Translations";

export const metadata: Metadata = MetaTagService.CreateMetaTags({
  url: "/terms",
  title: "Terms of Service — ArcBids",
  description:
    "Terms of Service governing B2B wholesale auction rooms, seller listings, and buyer bids on ArcBids.",
  imgUrl: "/opengraph-image",
  tags: ["ArcBids terms", "terms of service", "B2B auction terms"],
});

const CONTENT = {
  EN: {
    eyebrow: "Legal",
    title: "Terms of Service",
    updated: "Last updated: November 17, 2026",
    sections: [
      {
        heading: "1. Platform Scope",
        body: "ArcBids provides real-time B2B wholesale auction software enabling organizations ('Sellers') to host public or invite-only auction rooms and enabling approved or guest participants ('Buyers') to place bids. ArcBids is a technology provider only and is not a party to transactions, contracts, invoicing, or fulfillment between Sellers and Buyers.",
      },
      {
        heading: "2. Accounts & Access",
        body: "Sellers authenticate via email verification codes or magic links. You are responsible for maintaining access to your email account, managing your organization's buyer whitelist, and ensuring all lot descriptions, quantities, currencies, and images you publish are accurate and lawful.",
      },
      {
        heading: "3. Bidding & Anti-Snipe Rules",
        body: "Bids placed in a live auction room are timestamped and recorded on the server. When a room has anti-snipe protection enabled, bids submitted within the configured extension window automatically extend the lot countdown. Each email address may hold at most one active session per auction room.",
      },
      {
        heading: "4. Fulfillment & Payment",
        body: "When a lot closes with a winning bid, ArcBids makes the winning Buyer's submitted name and email available to the Seller so the parties can arrange invoicing, payment, and delivery directly outside the platform.",
      },
      {
        heading: "5. Acceptable Use & Availability",
        body: "You may not probe, scrape, manipulate auctions, submit fraudulent bids, or upload unlawful content. We strive for high availability and real-time synchronization but provide the service on an 'as-is' basis without warranties of uninterrupted operation.",
      },
      {
        heading: "6. Contact",
        body: "ArcBids is operated by PYCIE Studio (https://www.pycie.com). Questions regarding these Terms of Service can be sent to contact@pycie.com.",
      },
    ],
  },
  DE: {
    eyebrow: "Rechtliches",
    title: "Allgemeine Geschäftsbedingungen (AGB)",
    updated: "Stand: 17. November 2026",
    sections: [
      {
        heading: "1. Leistungsgegenstand",
        body: "ArcBids stellt eine B2B-Software für Großhandelsauktionen in Echtzeit bereit, mit der Unternehmen („Verkäufer“) öffentliche oder private Auktionsräume betreiben und Teilnehmer („Käufer“) Gebote abgeben können. ArcBids ist ausschließlich technischer Plattformbetreiber und wird nicht Vertragspartei der zwischen Verkäufern und Käufern geschlossenen Kaufverträge.",
      },
      {
        heading: "2. Konten & Zugang",
        body: "Verkäufer melden sich per 6-stelligem E-Mail-Code oder Magic-Link an. Sie sind verantwortlich für den Schutz Ihres E-Mail-Zugangs, die Pflege Ihrer Käufer-Whitelist sowie für die Richtigkeit aller veröffentlichten Artikelbeschreibungen, Stückzahlen, Währungen und Fotos.",
      },
      {
        heading: "3. Gebote & Anti-Snipe-Regeln",
        body: "Alle Gebote in einem Live-Auktionsraum werden serverseitig mit Zeitstempel erfasst. Ist ein Anti-Snipe-Zeitfenster aktiviert, verlängern Gebote in den letzten Sekunden automatisch den Countdown. Pro E-Mail-Adresse ist jeweils nur eine aktive Sitzung pro Auktionsraum zulässig.",
      },
      {
        heading: "4. Abwicklung & Zahlung",
        body: "Nach Zuschlag stellt ArcBids dem Verkäufer Namen und E-Mail-Adresse des Höchstbietenden zur Verfügung, damit Rechnungsstellung, Zahlung und Versand direkt zwischen den Parteien abgewickelt werden können.",
      },
      {
        heading: "5. Zulässige Nutzung & Verfügbarkeit",
        body: "Missbrauch der Plattform, Manipulation von Geboten, unbefugtes Auslesen von Räumen sowie das Hochladen rechtswidriger Inhalte sind untersagt. Der Dienst wird nach aktuellem Stand der Technik ohne Gewähr für unterbrechungsfreie Verfügbarkeit bereitgestellt.",
      },
      {
        heading: "6. Kontakt",
        body: "ArcBids wird betrieben von PYCIE Studio (https://www.pycie.com). Bei Fragen zu diesen AGB erreichen Sie uns unter contact@pycie.com.",
      },
    ],
  },
} as const;

async function TermsContent() {
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

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
          {copy.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-2 font-mono text-xs text-zinc-500">{copy.updated}</p>

        <div className="mt-10 space-y-6">
          {copy.sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-3xl border border-white/[0.07] bg-[#090d14] p-6"
            >
              <h2 className="text-base font-semibold text-white">
                {section.heading}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {section.body}
              </p>
            </section>
          ))}
        </div>
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

export default function TermsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#05070c]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        </div>
      }
    >
      <TermsContent />
    </Suspense>
  );
}
