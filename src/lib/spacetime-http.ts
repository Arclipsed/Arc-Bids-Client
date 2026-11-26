import { NextRequest, NextResponse } from "next/server";
import { SPACETIMEDB_DB, SPACETIMEDB_URI } from "@/lib/spacetime";

function getSpacetimeHttpBaseUrl(): string {
  return SPACETIMEDB_URI.replace(/^wss:\/\//i, "https://")
    .replace(/^ws:\/\//i, "http://")
    .replace(/\/$/, "");
}

export async function proxyToSpacetimeApi(
  req: NextRequest,
  routePath: string
): Promise<NextResponse> {
  const baseUrl = getSpacetimeHttpBaseUrl();
  const extraSearch = req.nextUrl.search ? req.nextUrl.search.slice(1) : "";
  const separator = routePath.includes("?") ? "&" : "?";
  const suffix = extraSearch ? `${separator}${extraSearch}` : "";
  const targetUrl = `${baseUrl}/v1/database/${encodeURIComponent(SPACETIMEDB_DB)}/route${routePath}${suffix}`;

  const headers: Record<string, string> = {};
  const auth = req.headers.get("authorization");
  if (auth) {
    headers["authorization"] = auth;
  }

  let body: string | undefined;
  if (req.method !== "GET" && req.method !== "HEAD" && req.method !== "DELETE") {
    body = await req.text();
    headers["content-type"] =
      req.headers.get("content-type") || "application/json";
  }

  try {
    const upstream = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      cache: "no-store",
    });

    const text = await upstream.text();
    const contentType =
      upstream.headers.get("content-type") || "application/json; charset=utf-8";

    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "content-type": contentType,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Upstream SpacetimeDB API unavailable." },
      { status: 502 }
    );
  }
}
