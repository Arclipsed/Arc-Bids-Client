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
  url: "/imprint",
  title: "Imprint / Impressum — ArcBids",
  description:
    "Legal disclosure and imprint information according to § 5 TMG / DDG for ArcBids, operated by Hamit Kiziltas in Saarbrücken, Germany.",
  imgUrl: "/opengraph-image",
  tags: ["ArcBids imprint", "Impressum", "legal disclosure", "§ 5 TMG"],
});

const CONTENT = {
  EN: {
    eyebrow: "Legal Disclosure",
    title: "Imprint",
    updated: "Information according to § 5 TMG",
    contactTitle: "Operator & Contact",
    operatorLines: [
      "Hamit Kiziltas",
      "Schutzbergstraße 17",
      "66119 Saarbrücken",
      "Germany",
    ],
    emailLabel: "Email",
    email: "hello@arcbids.com",
    legalEmail: "legal@arcbids.com",
    sections: [
      {
        heading: "1. Liability Disclaimer for Content",
        body: "The content on our pages has been created with the utmost care. However, we cannot guarantee the accuracy, completeness, and timeliness of the content. As a service provider, we are responsible for our own content on these pages in accordance with § 7 para. 1 of the German Telemedia Act (TMG) under general laws. However, according to §§ 8 to 10 of the TMG, as a service provider, we are not obligated to monitor transmitted or stored third-party information or to search for circumstances indicating illegal activity. Obligations to remove or block the use of information under general laws remain unaffected. Liability in this regard is only possible from the time of knowledge of a specific violation of the law. Upon becoming aware of corresponding violations, we will promptly remove such content.",
      },
      {
        heading: "2. Liability Disclaimer for Links",
        body: "Our offer includes links to external third-party websites over which we have no influence regarding their content. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the linked pages is always responsible for the contents of the linked pages. The linked pages were checked for possible legal violations at the time of linking, and illegal contents were not recognizable at that time. However, permanent content control of the linked pages is not reasonable without concrete evidence of a legal infringement. Upon becoming aware of legal violations, we will remove such links immediately.",
      },
      {
        heading: "3. Copyright",
        body: "The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution, and any kind of exploitation beyond the limits of copyright require the written consent of the respective author or creator. Downloads and copies of these pages are only permitted for private, non-commercial use. Insofar as content on this site was not created by the operator, the copyrights of third parties are respected and identified as such. If you become aware of a copyright infringement, please notify us accordingly so we can remove the content promptly.",
      },
      {
        heading: "4. Privacy & Unsolicited Contact",
        body: "Using our website is generally possible without providing personal data. Where personal data (such as email addresses for seller authentication or bidding) is collected, this is processed strictly to provide the auction service as described in our Privacy Policy. The use of contact data published within the framework of the imprint obligation by third parties for sending unsolicited advertising and promotional materials (spam) is hereby expressly prohibited.",
      },
    ],
  },
  DE: {
    eyebrow: "Rechtliche Angaben",
    title: "Impressum",
    updated: "Angaben gemäß § 5 TMG / DDG",
    contactTitle: "Betreiber & Kontakt",
    operatorLines: [
      "Hamit Kiziltas",
      "Schutzbergstraße 17",
      "66119 Saarbrücken",
      "Deutschland",
    ],
    emailLabel: "E-Mail",
    email: "hello@arcbids.com",
    legalEmail: "legal@arcbids.com",
    sections: [
      {
        heading: "1. Haftung für Inhalte",
        body: "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
      },
      {
        heading: "2. Haftung für Links",
        body: "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
      },
      {
        heading: "3. Urheberrecht",
        body: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis.",
      },
      {
        heading: "4. Datenschutz & Werbewiderspruch",
        body: "Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise E-Mail-Adressen zur Verkäufer-Anmeldung oder Gebotsabgabe) erhoben werden, erfolgt dies ausschließlich im Rahmen unserer Datenschutzerklärung. Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen.",
      },
    ],
  },
} as const;

async function ImprintContent() {
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
          <section className="rounded-3xl border border-white/[0.07] bg-[#090d14] p-6">
            <h2 className="text-base font-semibold text-white">
              {copy.contactTitle}
            </h2>
            <div className="mt-3 space-y-1 text-sm leading-relaxed text-zinc-300">
              {copy.operatorLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-4 space-y-1 text-sm text-zinc-400">
              <p>
                {copy.emailLabel}:{" "}
                <a
                  href={`mailto:${copy.email}`}
                  className="text-[#3ff2e0] transition hover:underline"
                >
                  {copy.email}
                </a>{" "}
                /{" "}
                <a
                  href={`mailto:${copy.legalEmail}`}
                  className="text-[#3ff2e0] transition hover:underline"
                >
                  {copy.legalEmail}
                </a>
              </p>
            </div>
          </section>

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

export default function ImprintPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#05070c]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        </div>
      }
    >
      <ImprintContent />
    </Suspense>
  );
}
