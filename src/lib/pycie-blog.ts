export interface PycieBlogEntry {
  slug: string;
  title: string;
  publishedAt: string;
}

export interface PycieBlogPost extends PycieBlogEntry {
  description: string;
  htmlContent: string;
}

const PYCIE_BASE = "https://pycie.com/client-blog/arcbids-com";

function slugToTitle(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function fetchPycieBlogEntries(): Promise<PycieBlogEntry[]> {
  try {
    const res = await fetch(`${PYCIE_BASE}/sitemap.xml`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const entries: PycieBlogEntry[] = [];
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

      entries.push({
        slug,
        title: slugToTitle(slug),
        publishedAt,
      });
    }

    return entries;
  } catch {
    return [];
  }
}

export async function fetchPycieBlogPost(
  slug: string
): Promise<PycieBlogPost | null> {
  try {
    const res = await fetch(`${PYCIE_BASE}/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });
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
      html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ??
      html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

    const rawTitle = (h1Match?.[1] ?? titleMatch?.[1] ?? slugToTitle(slug))
      .replace(/<[^>]+>/g, "")
      .trim();

    return {
      slug,
      title: rawTitle || slugToTitle(slug),
      description: descMatch?.[1]?.trim() ?? "",
      publishedAt: "",
      htmlContent: articleMatch?.[1] ?? "",
    };
  } catch {
    return null;
  }
}
