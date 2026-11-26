import { NextRequest } from "next/server";
import { proxyToSpacetimeApi } from "@/lib/spacetime-http";

type RouteContext = {
  params: Promise<{ auctionId: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  const { auctionId } = await context.params;
  return proxyToSpacetimeApi(
    req,
    `/v1/items?auctionId=${encodeURIComponent(auctionId)}`
  );
}

export async function POST(req: NextRequest, context: RouteContext) {
  const { auctionId } = await context.params;
  return proxyToSpacetimeApi(
    req,
    `/v1/items/create?auctionId=${encodeURIComponent(auctionId)}`
  );
}
