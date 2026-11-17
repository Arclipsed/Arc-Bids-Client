import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { SiteNav } from "@/components/SiteNav";
import { ArcBidsLogo } from "@/components/ArcBidsLogo";
import { LanguageSwitchButton } from "@/components/LanguageSwitchButton";
import FooterSection from "@/components/FooterSection";
import { MetaTagService } from "@/services/MetaTagService";
import { TranslationService } from "@/services/TranslationService";
import { Locale } from "@/translations/Translations";

export const metadata: Metadata = MetaTagService.CreateMetaTags({
  url: "/privacy",
  title: "Privacy Policy — ArcBids",
  description:
    "How ArcBids collects, stores, and protects seller, buyer, and auction data.",
  imgUrl: "/opengraph-image",
  tags: ["ArcBids privacy policy", "GDPR", "data protection"],
});

const CONTENT = {
  EN: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    updated: "Last updated: November 17, 2026",
    sections: [
      {
        heading: "1. Data We Collect",
        body: "When you sign in as a Seller, we collect your email address to send verification codes and magic links. When you join or bid in an auction room as a Buyer, we collect the name/company and email address you enter so the Seller can verify whitelist eligibility and contact winning bidders.",
      },
      {
        heading: "2. Cookies & Local Storage",
        body: "We use an essential HttpOnly session cookie (arcbids_session) for Seller authentication, a language preference cookie (MANUAL_NEXT_LOCALE), and browser localStorage keys to remember your SpacetimeDB connection token and entered buyer details.",
      },
      {
        heading: "3. Infrastructure & Sub-processors",
        body: "Real-time auction state is hosted on SpacetimeDB, uploaded lot images are stored on Vercel Blob, transactional sign-in emails are delivered via Resend, and the web application is hosted on Vercel.",
      },
      {
        heading: "4. Data Sharing",
        body: "We do not sell your personal data. Within an auction room, your entered display name is visible in the live bid feed, and your email address is shared with the Seller organizing that auction room for whitelist verification and post-auction fulfillment.",
      },
      {
        heading: "5. Retention & Deletion",
        body: "Sellers can delete their auction rooms and whitelisted buyer entries directly from the Seller Dashboard. To request deletion of your account or stored data, contact hello@arcbids.com.",
      },
    ],
  },
  DE: {
    eyebrow: "Rechtliches",
    title: "Datenschutzerklärung",
    updated: "Stand: 17. November 2026",
    sections: [
      {
        heading: "1. Welche Daten wir verarbeiten",
        body: "Bei der Anmeldung als Verkäufer verarbeiten wir Ihre E-Mail-Adresse zum Versand von Verifizierungscodes und Magic-Links. Beim Beitritt oder Bieten in einem Auktionsraum erfassen wir den angegebenen Namen bzw. Firmennamen sowie Ihre E-Mail-Adresse zur Whitelist-Prüfung und Kontaktaufnahme nach Zuschlag.",
      },
      {
        heading: "2. Cookies & Local Storage",
        body: "Wir verwenden ein technisch notwendiges HttpOnly-Sitzungscookie (arcbids_session) für die Verkäufer-Anmeldung, ein Sprachcookie (MANUAL_NEXT_LOCALE) sowie Local-Storage-Einträge im Browser für Ihre SpacetimeDB-Verbindung und Käuferangaben.",
      },
      {
        heading: "3. Infrastruktur & Auftragsverarbeiter",
        body: "Echtzeit-Auktionsdaten laufen über SpacetimeDB, hochgeladene Positionsfotos werden in Vercel Blob gespeichert, Anmelde-E-Mails werden über Resend versendet und die Webanwendung wird auf Vercel betrieben.",
      },
      {
        heading: "4. Weitergabe von Daten",
        body: "Wir verkaufen keine personenbezogenen Daten. In einem Auktionsraum ist Ihr angegebener Anzeigename im Live-Aktivitätsfeed sichtbar; Ihre E-Mail-Adresse wird ausschließlich dem veranstaltenden Verkäufer zur Freigabe und Vertragsabwicklung bereitgestellt.",
      },
      {
        heading: "5. Speicherdauer & Löschung",
        body: "Verkäufer können Auktionsräume und Whitelist-Einträge direkt im Dashboard löschen. Für Auskunfts- oder Löschanfragen wenden Sie sich bitte an hello@arcbids.com.",
      },
    ],
  },
} as const;

async function PrivacyContent() {
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

          <div className="flex items-center gap-2">
            <LanguageSwitchButton currentLocale={locale} />
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

export default function PrivacyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#05070c]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        </div>
      }
    >
      <PrivacyContent />
    </Suspense>
  );
}
