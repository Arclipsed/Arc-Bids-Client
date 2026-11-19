import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { CheckCircle2, Clock } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import { SiteNav } from "@/components/SiteNav";
import { ArcBidsLogo } from "@/components/ArcBidsLogo";
import { MetaTagService } from "@/services/MetaTagService";
import { TranslationService } from "@/services/TranslationService";
import { Locale } from "@/translations/Translations";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog-posts";
import { fetchPycieBlogPost } from "@/lib/pycie-blog";

const POST_COPY: Record<
  Locale,
  {
    backToAll: string;
    relatedResources: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  }
> = {
  EN: {
    backToAll: "Back to all articles",
    relatedResources: "Related Resources",
    ctaTitle: "Ready to run your next B2B auction?",
    ctaBody:
      "Draft rooms for free and launch live for €25 per ticket with 0% commission for all of 2026 (normally 5%).",
    ctaButton: "Open Dashboard",
  },
  DE: {
    backToAll: "Zurück zu allen Artikeln",
    relatedResources: "Weiterführende Ressourcen",
    ctaTitle: "Bereit für Ihre nächste B2B-Auktion?",
    ctaBody:
      "Erstellen Sie Auktionsräume kostenlos als Entwurf und starten Sie live für 25 € pro Ticket bei 0 % Provision in 2026 (regulär 5 %).",
    ctaButton: "Zum Dashboard",
  },
  ES: {
    backToAll: "Volver a todos los artículos",
    relatedResources: "Recursos relacionados",
    ctaTitle: "¿Listo para tu próxima subasta B2B?",
    ctaBody:
      "Crea borradores gratis y sal en vivo por €25 por ticket con 0% de comisión durante todo 2026 (normalmente 5%).",
    ctaButton: "Abrir Panel",
  },
  FR: {
    backToAll: "Retour aux articles",
    relatedResources: "Ressources associées",
    ctaTitle: "Prêt pour votre prochaine enchère B2B ?",
    ctaBody:
      "Préparez vos salles gratuitement et lancez en direct pour 25 € par ticket avec 0 % de commission en 2026 (normalement 5 %).",
    ctaButton: "Ouvrir le Tableau de Bord",
  },
  NL: {
    backToAll: "Terug naar alle artikelen",
    relatedResources: "Gerelateerde bronnen",
    ctaTitle: "Klaar voor je volgende B2B-veiling?",
    ctaBody:
      "Maak gratis concepten en start live voor €25 per ticket met 0% commissie in heel 2026 (normaal 5%).",
    ctaButton: "Dashboard Openen",
  },
  TR: {
    backToAll: "Tüm makalelere dön",
    relatedResources: "İlgili Kaynaklar",
    ctaTitle: "Bir sonraki B2B açık artırmanıza hazır mısınız?",
    ctaBody:
      "Ücretsiz taslak hazırlayın ve 2026 boyunca %0 komisyonla (normalde %5) bilet başına €25'a canlı başlatın.",
    ctaButton: "Paneli Aç",
  },
  RU: {
    backToAll: "Ко всем статьям",
    relatedResources: "Полезные материалы",
    ctaTitle: "Готовы запустить следующий B2B-аукцион?",
    ctaBody:
      "Создавайте черновики бесплатно и запускайте live-комнаты за €25 за билет с комиссией 0% весь 2026 год (обычно 5%).",
    ctaButton: "Открыть Панель",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://arcbids.com";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    const pyciePost = await fetchPycieBlogPost(slug);
    if (pyciePost) {
      return MetaTagService.CreateMetaTags({
        url: `/blog/${slug}`,
        title: `${pyciePost.title} — ArcBids`,
        description:
          pyciePost.description ||
          "B2B wholesale auction guides and playbooks from ArcBids.",
        imgUrl: "/opengraph-image",
        tags: ["ArcBids", "B2B auction blog"],
      });
    }
    return MetaTagService.CreateMetaTags({
      url: "/blog",
      title: "Article Not Found — ArcBids",
      description: "B2B wholesale auction guides and playbooks from ArcBids.",
      imgUrl: "/opengraph-image",
      tags: ["ArcBids", "B2B auction blog"],
    });
  }

  return MetaTagService.CreateMetaTags({
    url: `/blog/${post.slug}`,
    title: `${post.title} — ArcBids`,
    description: post.description,
    imgUrl: "/opengraph-image",
    tags: post.keywords,
  });
}

async function BlogPostContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await TranslationService.GetUserLocale();
  const post = getBlogPostBySlug(slug, locale);
  const pyciePost = post ? null : await fetchPycieBlogPost(slug, "", locale);
  if (!post && !pyciePost) notFound();

  const t = TranslationService.GetTranslations(locale);
  const copy = POST_COPY[locale] ?? POST_COPY.EN;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post?.title ?? pyciePost!.title,
    description: post?.description ?? pyciePost!.description,
    datePublished: post?.publishedAt ?? pyciePost!.publishedAt,
    dateModified: post?.publishedAt ?? pyciePost!.publishedAt,
    author: {
      "@type": "Organization",
      name: "ArcBids",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "ArcBids",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    keywords: post ? post.keywords.join(", ") : "ArcBids, B2B auctions",
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-[#05070c] text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

      <main className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition hover:text-[#3ff2e0]"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          {copy.backToAll}
        </Link>

        {post ? (
          <article className="mt-8">
            <div className="flex flex-wrap items-center gap-2.5 text-[11px]">
              <span className="rounded-full border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 px-2.5 py-0.5 font-mono font-semibold text-[#3ff2e0]">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-zinc-500">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
              <span className="font-mono text-zinc-500">{post.publishedAt}</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-zinc-300">
              {post.description}
            </p>

            <div className="mt-10 space-y-9 border-t border-white/[0.08] pt-9">
              {post.sections.map((section) => (
                <section key={section.heading} className="space-y-4">
                  <h2 className="text-xl font-semibold tracking-tight text-white">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-sm leading-relaxed text-zinc-300 sm:text-[15px]"
                    >
                      {p}
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2.5 rounded-2xl border border-white/[0.06] bg-[#090d14]/80 p-5">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-sm text-zinc-300"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#3ff2e0]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </article>
        ) : (
          <article className="mt-8">
            <div className="flex flex-wrap items-center gap-2.5 text-[11px]">
              <span className="rounded-full border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 px-2.5 py-0.5 font-mono font-semibold text-[#3ff2e0]">
                {pyciePost!.category}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-zinc-500">
                <Clock className="h-3 w-3" />
                {pyciePost!.readTime}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {pyciePost!.title}
            </h1>
            {pyciePost!.description && (
              <p className="mt-4 text-base leading-relaxed text-zinc-300">
                {pyciePost!.description}
              </p>
            )}

            {pyciePost!.sections.length > 0 ? (
              <div className="mt-10 space-y-9 border-t border-white/[0.08] pt-9">
                {pyciePost!.sections.map((section, idx) => (
                  <section key={`${section.heading}-${idx}`} className="space-y-4">
                    {section.heading && (
                      <h2 className="text-xl font-semibold tracking-tight text-white">
                        {section.heading}
                      </h2>
                    )}
                    {section.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-sm leading-relaxed text-zinc-300 sm:text-[15px]"
                      >
                        {p}
                      </p>
                    ))}
                    {section.bullets.length > 0 && (
                      <ul className="space-y-2.5 rounded-2xl border border-white/[0.06] bg-[#090d14]/80 p-5">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2.5 text-sm text-zinc-300"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#3ff2e0]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            ) : (
              <div
                className="prose prose-invert mt-10 max-w-none border-t border-white/[0.08] pt-9 text-sm leading-relaxed text-zinc-300"
                dangerouslySetInnerHTML={{ __html: pyciePost!.rawHtml }}
              />
            )}
          </article>
        )}

        {post && post.relatedLinks.length > 0 && (
          <div className="mt-12 rounded-3xl border border-white/[0.08] bg-[#090d14]/90 p-6">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3ff2e0]">
              {copy.relatedResources}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {post.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-200 transition hover:border-[#3ff2e0]/35 hover:text-white"
                >
                  {link.label}
                  <ArrowRightIcon className="h-3.5 w-3.5 text-[#3ff2e0]" />
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#3ff2e0]/25 bg-[#091217]/90 p-6">
          <div>
            <h3 className="text-base font-semibold text-white">
              {copy.ctaTitle}
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              {copy.ctaBody}
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#e4fffb] px-5 py-2.5 text-xs font-semibold text-[#04070b] transition hover:bg-white"
          >
            {copy.ctaButton}
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
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

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#05070c]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        </div>
      }
    >
      <BlogPostContent params={params} />
    </Suspense>
  );
}
