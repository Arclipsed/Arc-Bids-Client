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
    updated: "Last updated: November 18, 2026",
    sections: [
      {
        heading: "1. Controller",
        body: "This website and the ArcBids platform are operated by PYCIE Studio (Owner: Refik Emre Ak), Rötestraße 20, 74321 Bietigheim-Bissingen, Germany (https://www.pycie.com). For platform inquiries contact hello@arcbids.com; for general operator inquiries contact contact@pycie.com.",
      },
      {
        heading: "2. Data We Collect",
        body: "When you sign in via email OTP or magic link, we process your email address and derive a consistent OpenID Connect (OIDC) subject identifier. Sellers may provide organization details (name, slug, contact email, phone, website, address, VAT/Tax ID), auction room settings, lot descriptions, specifications, and uploaded photos, as well as named buyer email lists (company name and email, including CSV imports). Buyers entering or bidding in a room provide a display name/organization name, email address, bid amounts, and optional secret maximum auto-bid amounts. We also record active device metadata (browser/OS label, device type, device ID, and online/last-seen timestamps) so you can view and remotely sign out your devices.",
      },
      {
        heading: "3. Purposes & Legal Bases (GDPR)",
        body: "We process personal data to provide authentication, host real-time auction rooms, enforce private whitelists, execute proxy auto-bids, and enable post-auction contact between Sellers and winning Buyers (Art. 6(1)(b) GDPR — performance of a contract/pre-contractual measures). Security logging, duplicate-session prevention, and device management are processed based on our legitimate interest in platform integrity and fraud prevention (Art. 6(1)(f) GDPR).",
      },
      {
        heading: "4. Cookies, Local Storage & Session Storage",
        body: "We use an essential HttpOnly session cookie (arcbids_session) for authentication and a language preference cookie (MANUAL_NEXT_LOCALE). Browser localStorage stores your OIDC/SpacetimeDB connection token (arcbid_oidc_id_token / arcbid_token_*) and persistent device ID (arcbid_device_id). Browser sessionStorage temporarily stores guest buyer name/email for the active tab (arcbid_buyer_name, arcbid_buyer_token) so guest details are not persisted across browser restarts.",
      },
      {
        heading: "5. Infrastructure & Sub-processors",
        body: "Real-time auction state, device sessions, and OIDC verification run on SpacetimeDB; the web application is hosted on Vercel; uploaded lot images are stored on Vercel Blob; and transactional sign-in emails are delivered via Resend. Data is processed only to the extent required to operate the service.",
      },
      {
        heading: "6. Data Sharing & Visibility",
        body: "We do not sell your personal data. Within an auction room, your display name or organization name and bid amounts are visible in the live bid feed. Your email address is shared only with the Seller organizing that auction room for whitelist verification and post-auction fulfillment. Your secret maximum auto-bid amounts and your logged-in device list are private to your account.",
      },
      {
        heading: "7. Retention & Account Deletion",
        body: "Sellers can delete individual auction rooms (which also removes associated lot images from Vercel Blob), delete buyer lists, and remotely sign out devices at any time. You can also permanently delete your entire account, organization, auctions, lots, uploaded images, bids, buyer lists, and device records directly from the Dashboard under Danger Zone, or by emailing hello@arcbids.com.",
      },
      {
        heading: "8. Your Rights Under GDPR",
        body: "You have the right to request access to your stored personal data (Art. 15 GDPR), rectification of inaccurate data (Art. 16 GDPR), erasure (Art. 17 GDPR), restriction of processing (Art. 18 GDPR), data portability (Art. 20 GDPR), and to object to processing based on legitimate interests (Art. 21 GDPR). You also have the right to lodge a complaint with a competent data protection supervisory authority (such as the Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg).",
      },
    ],
  },
  DE: {
    eyebrow: "Rechtliches",
    title: "Datenschutzerklärung",
    updated: "Stand: 18. November 2026",
    sections: [
      {
        heading: "1. Verantwortlicher",
        body: "Verantwortlicher im Sinne der DSGVO für ArcBids ist PYCIE Studio (Inhaber: Refik Emre Ak), Rötestraße 20, 74321 Bietigheim-Bissingen, Deutschland (https://www.pycie.com). Plattform-Support: hello@arcbids.com; allgemeiner Betreiberkontakt: contact@pycie.com.",
      },
      {
        heading: "2. Welche Daten wir verarbeiten",
        body: "Bei der Anmeldung per E-Mail-Code oder Magic-Link verarbeiten wir Ihre E-Mail-Adresse und erstellen eine konsistente OIDC-Kennung. Verkäufer können Organisationsdaten (Name, Slug, Kontakt-E-Mail, Telefon, Webseite, Adresse, USt-IdNr.), Auktionskonfigurationen, Positionsbeschreibungen, Fahrzeug-/Artikelspezifikationen, hochgeladene Fotos sowie benannte Käufer-E-Mail-Listen (inkl. CSV-Import) hinterlegen. Käufer geben einen Anzeigenamen bzw. Organisationsnamen, eine E-Mail-Adresse, Gebote sowie optional verdeckte Maximalgebote (Auto-Bid) an. Zudem speichern wir Geräteinformationen (Browser/OS, Gerätetyp, Geräte-ID, Online-/Zuletzt-aktiv-Status) für die Geräteverwaltung.",
      },
      {
        heading: "3. Zwecke & Rechtsgrundlagen (DSGVO)",
        body: "Die Verarbeitung erfolgt zur Bereitstellung der Authentifizierung, Durchführung von Echtzeit-Auktionen, Whitelist-Prüfung, automatisierten Gebotsabgabe sowie Kontaktvermittlung nach Zuschlag (Art. 6 Abs. 1 lit. b DSGVO). Sicherheitsfunktionen wie Sitzungsschutz, Missbrauchsprävention und Geräteverwaltung stützen wir auf unser berechtigtes Interesse an einem sicheren Plattformbetrieb (Art. 6 Abs. 1 lit. f DSGVO).",
      },
      {
        heading: "4. Cookies, Local Storage & Session Storage",
        body: "Wir verwenden ein technisch notwendiges HttpOnly-Sitzungscookie (arcbids_session) sowie ein Sprachcookie (MANUAL_NEXT_LOCALE). Im Local Storage speichern wir Ihr OIDC-/SpacetimeDB-Token (arcbid_oidc_id_token / arcbid_token_*) und Ihre Geräte-ID (arcbid_device_id). Im Session Storage werden Gast-Käuferangaben (arcbid_buyer_name, arcbid_buyer_token) nur für den jeweiligen Browser-Tab vorgehalten.",
      },
      {
        heading: "5. Infrastruktur & Auftragsverarbeiter",
        body: "Echtzeit-Auktionsdaten, Gerätesitzungen und OIDC-Prüfungen laufen über SpacetimeDB; die Webanwendung wird über Vercel bereitgestellt; hochgeladene Positionsfotos werden in Vercel Blob gespeichert; Anmelde-E-Mails werden über Resend versendet.",
      },
      {
        heading: "6. Weitergabe & Sichtbarkeit von Daten",
        body: "Wir verkaufen keine personenbezogenen Daten. In einem Auktionsraum sind Ihr angegebener Anzeige- bzw. Organisationsname sowie Gebote im Live-Feed sichtbar. Ihre E-Mail-Adresse wird ausschließlich dem veranstaltenden Verkäufer zur Freigabe und Vertragsabwicklung bereitgestellt. Verdeckte Maximalgebote (Auto-Bid) und Ihre Geräteliste sind ausschließlich für Sie selbst einsehbar.",
      },
      {
        heading: "7. Speicherdauer & Kontolöschung",
        body: "Verkäufer können einzelne Auktionsräume (inklusive Löschung der zugehörigen Fotos in Vercel Blob), Käuferlisten sowie angemeldete Geräte jederzeit löschen. Über die Danger Zone im Dashboard können Sie Ihr gesamtes Konto samt Organisation, Auktionen, Positionen, Fotos, Geboten, Käuferlisten und Gerätedaten vollständig und endgültig löschen oder sich an hello@arcbids.com wenden.",
      },
      {
        heading: "8. Ihre Rechte nach DSGVO",
        body: "Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch (Art. 21 DSGVO). Zudem steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu (z. B. beim Landesbeauftragten für den Datenschutz und die Informationsfreiheit Baden-Württemberg).",
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
