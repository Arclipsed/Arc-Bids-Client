import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { BookOpen, Clock } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import { SiteNav } from "@/components/SiteNav";
import { ArcBidsLogo } from "@/components/ArcBidsLogo";
import { MetaTagService } from "@/services/MetaTagService";
import { TranslationService } from "@/services/TranslationService";
import { Locale } from "@/translations/Translations";
import { getBlogPosts } from "@/lib/blog-posts";
import { fetchPycieBlogEntries } from "@/lib/pycie-blog";

const BLOG_COPY: Record<
  Locale,
  { eyebrow: string; title: string; subtitle: string; readArticle: string }
> = {
  EN: {
    eyebrow: "ArcBids Journal",
    title: "B2B Wholesale & Live Auction Playbooks",
    subtitle:
      "Practical guides on running private wholesale auctions, setting anti-sniping timers, pricing liquidation pallets, and replacing messy WhatsApp broadcasts.",
    readArticle: "Read article",
  },
  DE: {
    eyebrow: "ArcBids Journal",
    title: "B2B-Großhandel & Live-Auktions-Leitfäden",
    subtitle:
      "Praxisnahe Guides für private Großhandelsauktionen, Anti-Sniping-Timer, Paletten-Preisgestaltung und Alternativen zum WhatsApp-Chaos.",
    readArticle: "Artikel lesen",
  },
  ES: {
    eyebrow: "Diario ArcBids",
    title: "Guías de Subastas B2B y Comercio Mayorista",
    subtitle:
      "Guías prácticas para organizar subastas privadas, configurar temporizadores anti-snipe, fijar precios de palés y reemplazar los chats de WhatsApp.",
    readArticle: "Leer artículo",
  },
  FR: {
    eyebrow: "Journal ArcBids",
    title: "Guides d'Enchères B2B & Vente en Gros",
    subtitle:
      "Guides pratiques pour lancer des enchères privées, régler les timers anti-snipe, fixer les prix des palettes et remplacer WhatsApp.",
    readArticle: "Lire l'article",
  },
  NL: {
    eyebrow: "ArcBids Journaal",
    title: "B2B-Groothandel & Live Veiling Gidsen",
    subtitle:
      "Praktische gidsen voor besloten veilingen, anti-snipe timers, palletprijzen en alternatieven voor WhatsApp-groepen.",
    readArticle: "Artikel lezen",
  },
  TR: {
    eyebrow: "ArcBids Günlüğü",
    title: "B2B Toptan Satış ve Canlı Açık Artırma Rehberleri",
    subtitle:
      "Özel toptan açık artırmalar düzenleme, anti-snipe zamanlayıcıları, palet fiyatlandırması ve WhatsApp karmaşasını bitirme rehberleri.",
    readArticle: "Makaleyi oku",
  },
  RU: {
    eyebrow: "Журнал ArcBids",
    title: "Руководства по B2B-Опту и Live-Аукционам",
    subtitle:
      "Практические советы по запуску закрытых оптовых аукционов, настройке анти-снайпинга, оценке паллет и отказу от хаоса в WhatsApp.",
    readArticle: "Читать статью",
  },
};

export const metadata: Metadata = MetaTagService.CreateMetaTags({
  url: "/blog",
  title: "B2B Wholesale & Live Auction Blog — ArcBids",
  description:
    "Playbooks, pricing strategies, and guides on running private B2B wholesale auctions, ITAD liquidation, anti-sniping timers, and 0% commission lot rooms.",
  imgUrl: "/opengraph-image",
  tags: [
    "B2B auction blog",
    "wholesale liquidation guides",
    "live auction playbooks",
    "ITAD remarketing tips",
    "ArcBids",
  ],
});

async function BlogIndexContent() {
  const locale = await TranslationService.GetUserLocale();
  const t = TranslationService.GetTranslations(locale);
  const copy = BLOG_COPY[locale] ?? BLOG_COPY.EN;
  const localPosts = getBlogPosts(locale);
  const localSlugs = new Set(localPosts.map((p) => p.slug));
  const pycieEntries = (await fetchPycieBlogEntries()).filter(
    (entry) => !localSlugs.has(entry.slug)
  );

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-[#05070c] text-zinc-100">
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

      <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
            <BookOpen className="h-3.5 w-3.5" />
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {localPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#090d14]/90 p-6 transition hover:border-[#3ff2e0]/35 hover:bg-[#0c121c]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2.5 text-[11px]">
                  <span className="rounded-full border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 px-2.5 py-0.5 font-mono font-semibold text-[#3ff2e0]">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-zinc-500">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                  <span className="font-mono text-zinc-500">
                    {post.publishedAt}
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-semibold leading-snug text-white transition group-hover:text-[#e4fffb]">
                  {post.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                  {post.description}
                </p>
              </div>

              <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#3ff2e0]">
                {copy.readArticle}
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
          {pycieEntries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/blog/${entry.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#090d14]/90 p-6 transition hover:border-[#3ff2e0]/35 hover:bg-[#0c121c]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2.5 text-[11px]">
                  <span className="rounded-full border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 px-2.5 py-0.5 font-mono font-semibold text-[#3ff2e0]">
                    Article
                  </span>
                  {entry.publishedAt && (
                    <span className="font-mono text-zinc-500">
                      {entry.publishedAt}
                    </span>
                  )}
                </div>

                <h2 className="mt-4 text-lg font-semibold leading-snug text-white transition group-hover:text-[#e4fffb]">
                  {entry.title}
                </h2>
              </div>

              <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#3ff2e0]">
                {copy.readArticle}
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
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

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#05070c]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        </div>
      }
    >
      <BlogIndexContent />
    </Suspense>
  );
}
