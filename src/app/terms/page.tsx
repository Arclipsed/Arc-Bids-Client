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
    updated: "Last updated: November 18, 2026",
    sections: [
      {
        heading: "1. Scope & Operator",
        body: "ArcBids is a B2B wholesale auction platform operated by PYCIE Studio (Owner: Refik Emre Ak), Rötestraße 20, 74321 Bietigheim-Bissingen, Germany (https://www.pycie.com). ArcBids provides real-time software enabling organizations ('Sellers') to host public or private auction rooms and enabling approved or invited participants ('Buyers') to place bids. ArcBids acts strictly as a technical platform provider and is not a party to purchase contracts, invoicing, shipping, or warranty obligations between Sellers and Buyers.",
      },
      {
        heading: "2. B2B Eligibility",
        body: "ArcBids is designed for commercial and business users (entrepreneurs within the meaning of § 14 of the German Civil Code, BGB). By creating an organization, hosting an auction, or placing bids, you confirm that you are acting in a commercial or professional capacity and are authorized to represent your organization.",
      },
      {
        heading: "3. Accounts, Authentication & Devices",
        body: "Access to Seller features uses passwordless email verification codes and magic links. You are responsible for safeguarding your email inbox, maintaining accurate organization details, and reviewing or signing out unfamiliar devices in your Dashboard.",
      },
      {
        heading: "4. Seller Responsibilities & Prohibited Content",
        body: "Sellers are solely responsible for the accuracy, completeness, and legality of all lot titles, descriptions, categories, vehicle or product specifications, quantities, starting prices, currencies, and uploaded images. Sellers warrant that they hold full title or authorization to sell the listed goods and may not list counterfeit, stolen, hazardous, or unlawful items.",
      },
      {
        heading: "5. Private Rooms, Email Lists & Session Rules",
        body: "Sellers may restrict rooms to 'Private Auction Only' and select one or more whitelisted buyer email lists. Only one active session per email address is permitted in a given auction room at a time to ensure fair and accountable bidding.",
      },
      {
        heading: "6. Bidding, Auto-Bid & Anti-Snipe",
        body: "All bids are timestamped and recorded on the server. When Auto-Bid is enabled by the Seller, Buyers may submit a confidential maximum bid; the server automatically bids in the configured minimum increment steps up to that maximum, with earlier timestamps breaking ties. If anti-snipe protection is enabled, bids placed within the extension window automatically extend the lot countdown. Sellers may void an erroneous last bid during live operation where justified.",
      },
      {
        heading: "7. Post-Auction Settlement",
        body: "When a lot closes as Sold, ArcBids makes the winning Buyer's display/organization name and email address available to the Seller. Invoicing, VAT/tax compliance, payment, and freight/pickup must be arranged directly between Seller and Buyer outside the platform.",
      },
      {
        heading: "8. Acceptable Use",
        body: "You may not attempt to bypass access controls, scrape or probe private rooms, manipulate auctions (including shill bidding), or interfere with real-time WebSocket infrastructure. We reserve the right to suspend or remove organizations or rooms that violate these terms.",
      },
      {
        heading: "9. Availability & Limitation of Liability",
        body: "We strive for high availability and sub-second synchronization but provide the platform without guarantee of uninterrupted operation. PYCIE Studio is liable without limitation for intent, gross negligence, and injury to life, body, or health. For slight negligence, liability is limited to foreseeable, contract-typical damages arising from breach of essential contractual obligations (cardinal duties); any further liability for indirect damages or lost profits is excluded to the extent permitted by German law.",
      },
      {
        heading: "10. Account Deletion, Governing Law & Contact",
        body: "You may delete your account and all associated data at any time via the Dashboard Danger Zone. These Terms are governed by the laws of the Federal Republic of Germany, excluding the UN Convention on Contracts for the International Sale of Goods (CISG). For platform support contact hello@arcbids.com; for operator inquiries contact contact@pycie.com.",
      },
    ],
  },
  DE: {
    eyebrow: "Rechtliches",
    title: "Allgemeine Geschäftsbedingungen (AGB)",
    updated: "Stand: 18. November 2026",
    sections: [
      {
        heading: "1. Geltungsbereich & Betreiber",
        body: "ArcBids ist eine B2B-Großhandels-Auktionsplattform, betrieben von PYCIE Studio (Inhaber: Refik Emre Ak), Rötestraße 20, 74321 Bietigheim-Bissingen, Deutschland (https://www.pycie.com). ArcBids stellt ausschließlich die technische Echtzeit-Software für öffentliche oder private Auktionsräume bereit und wird nicht Vertragspartei der zwischen Verkäufern und Käufern geschlossenen Kaufverträge.",
      },
      {
        heading: "2. B2B-Nutzung (Unternehmer)",
        body: "Das Angebot richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB. Mit der Registrierung, Erstellung einer Organisation oder Abgabe eines Gebots bestätigen Sie, im Rahmen Ihrer gewerblichen oder selbstständigen beruflichen Tätigkeit zu handeln.",
      },
      {
        heading: "3. Konten, Anmeldung & Gerätesicherheit",
        body: "Die Anmeldung erfolgt passwortlos per E-Mail-Verifizierungscode oder Magic-Link. Sie sind verpflichtet, den Zugang zu Ihrem E-Mail-Postfach zu schützen, Organisationsdaten aktuell zu halten und Ihre angemeldeten Geräte im Dashboard zu kontrollieren.",
      },
      {
        heading: "4. Pflichten der Verkäufer & unzulässige Inhalte",
        body: "Verkäufer tragen die alleinige Verantwortung für die Richtigkeit, Vollständigkeit und Rechtmäßigkeit aller Artikelbezeichnungen, Kategorien, Fahrzeug-/Produktspezifikationen, Stückzahlen, Startpreise, Währungen und hochgeladenen Fotos. Das Anbieten gestohlener, gefälschter oder rechtswidriger Waren ist untersagt.",
      },
      {
        heading: "5. Private Räume, E-Mail-Listen & Sitzungsregeln",
        body: "Verkäufer können Auktionen als ‚Private Auction Only‘ auf ausgewählte Käufer-E-Mail-Listen beschränken. Pro E-Mail-Adresse ist in einem Auktionsraum jeweils nur eine aktive Sitzung gleichzeitig zulässig.",
      },
      {
        heading: "6. Gebote, Auto-Bid & Anti-Snipe-Schutz",
        body: "Alle Gebote werden serverseitig mit Zeitstempel erfasst. Ist Auto-Bid aktiviert, können Käufer ein verdecktes Maximalgebot hinterlegen; der Server bietet automatisch in den festgelegten Mindestschritten bis zu diesem Maximum mit (bei Gleichstand entscheidet der frühere Zeitstempel). Bei aktiviertem Anti-Snipe-Fenster verlängern späte Gebote den Countdown automatisch. Verkäufer können im begründeten Ausnahmefall das letzte Gebot stornieren (Void).",
      },
      {
        heading: "7. Abwicklung nach Zuschlag",
        body: "Nach erfolgreichem Zuschlag erhält der Verkäufer den Anzeige-/Organisationsnamen sowie die E-Mail-Adresse des Höchstbietenden. Rechnungsstellung, Umsatzsteuerprüfung, Zahlung und Lieferung erfolgen direkt zwischen Verkäufer und Käufer außerhalb der Plattform.",
      },
      {
        heading: "8. Zulässige Nutzung",
        body: "Jede Manipulation von Auktionen (einschließlich Scheingeboten), das Umgehen von Zugangskontrollen, automatisiertes Auslesen (Scraping) sowie Störungen der Echtzeit-Infrastruktur sind untersagt.",
      },
      {
        heading: "9. Verfügbarkeit & Haftungsbeschränkung",
        body: "Der Dienst wird nach aktuellem Stand der Technik ohne Gewähr für ununterbrochene Verfügbarkeit bereitgestellt. PYCIE Studio haftet unbeschränkt bei Vorsatz, grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit. Bei leichter Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), begrenzt auf den vertragstypischen, vorhersehbaren Schaden.",
      },
      {
        heading: "10. Kontolöschung, anwendbares Recht & Kontakt",
        body: "Sie können Ihr Konto samt aller Daten jederzeit über die Danger Zone im Dashboard löschen. Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG). Plattform-Support: hello@arcbids.com; Betreiberkontakt: contact@pycie.com.",
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
