export interface PycieBlogEntry {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
}

export interface PycieBlogSection {
  heading: string;
  paragraphs: string[];
  bullets: string[];
}

export interface PycieBlogPost extends PycieBlogEntry {
  sections: PycieBlogSection[];
  rawHtml: string;
}

const PYCIE_BASE = "https://pycie.com/client-blog/arcbids-com";
const PYCIE_LANGS = new Set(["de", "en", "tr", "ru"]);

function toPycieLang(locale?: string): string {
  const code = (locale ?? "EN").toLowerCase();
  return PYCIE_LANGS.has(code) ? code : "en";
}

function slugToTitle(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function parseArticleSections(articleHtml: string): PycieBlogSection[] {
  const withoutH1 = articleHtml.replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, "");
  const sections: PycieBlogSection[] = [];
  let current: PycieBlogSection = { heading: "", paragraphs: [], bullets: [] };

  const tokenRegex = /<(h2|h3|p|li)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(withoutH1)) !== null) {
    const tag = match[1].toLowerCase();
    const text = stripTags(match[2]);
    if (!text) continue;

    if (tag === "h2" || tag === "h3") {
      if (
        current.heading ||
        current.paragraphs.length > 0 ||
        current.bullets.length > 0
      ) {
        sections.push(current);
      }
      current = { heading: text, paragraphs: [], bullets: [] };
    } else if (tag === "li") {
      current.bullets.push(text);
    } else if (tag === "p") {
      current.paragraphs.push(text);
    }
  }

  if (
    current.heading ||
    current.paragraphs.length > 0 ||
    current.bullets.length > 0
  ) {
    sections.push(current);
  }

  return sections;
}

export async function fetchPycieBlogPost(
  slug: string,
  publishedAt = "",
  locale = "EN"
): Promise<PycieBlogPost | null> {
  try {
    const lang = toPycieLang(locale);
    const res = await fetch(
      `${PYCIE_BASE}/${encodeURIComponent(slug)}?lang=${lang}`,
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(4000),
      }
    );
    if (!res.ok) return null;
    const html = await res.text();

    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const descMatch =
      html.match(
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
      ) ??
      html.match(
        /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i
      );

    const articleMatch =
      html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ??
      html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);

    const rawTitle = stripTags(
      h1Match?.[1] ?? titleMatch?.[1]?.replace(/\s*\|\s*ArcBids\s*$/i, "") ?? slugToTitle(slug)
    );

    const articleHtml = articleMatch?.[1] ?? "";
    const sections = parseArticleSections(articleHtml);
    const plainWords = stripTags(articleHtml).split(/\s+/).filter(Boolean).length;
    const mins = Math.max(2, Math.round(plainWords / 200));

    const firstParagraph = sections.find((s) => s.paragraphs.length > 0)?.paragraphs[0] ?? "";
    const description = decodeHtmlEntities(descMatch?.[1]?.trim() ?? "") || firstParagraph;

    return {
      slug,
      title: rawTitle || slugToTitle(slug),
      description,
      category: "Guide",
      readTime: `${mins} min read`,
      publishedAt,
      sections,
      rawHtml: articleHtml.replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, ""),
    };
  } catch {
    return null;
  }
}

export async function fetchPycieBlogEntries(
  locale = "EN"
): Promise<PycieBlogEntry[]> {
  try {
    const res = await fetch(`${PYCIE_BASE}/sitemap.xml`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const rawEntries: Array<{ slug: string; publishedAt: string }> = [];
    const seen = new Set<string>();

    const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/gi) ?? [];
    for (const block of urlBlocks) {
      const locMatch = block.match(/<loc>\s*([^<\s]+)\s*<\/loc>/i);
      if (!locMatch?.[1]) continue;
      const loc = locMatch[1].trim();
      const prefix = `${PYCIE_BASE}/`;
      if (!loc.startsWith(prefix)) continue;

      const slug = loc.slice(prefix.length).replace(/\/+$/, "");
      if (!slug || slug.includes("/") || seen.has(slug)) continue;
      seen.add(slug);

      const lastmodMatch = block.match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/i);
      const publishedAt = lastmodMatch?.[1]?.slice(0, 10) ?? "";
      rawEntries.push({ slug, publishedAt });
    }

    const hydrated = await Promise.all(
      rawEntries.map(async ({ slug, publishedAt }) => {
        const post = await fetchPycieBlogPost(slug, publishedAt, locale);
        if (post) {
          return {
            slug: post.slug,
            title: post.title,
            description: post.description,
            category: post.category,
            readTime: post.readTime,
            publishedAt: post.publishedAt,
          };
        }
        return {
          slug,
          title: slugToTitle(slug),
          description: "",
          category: "Guide",
          readTime: "4 min read",
          publishedAt,
        };
      })
    );

    return hydrated;
  } catch {
    return [];
  }
}
