import { NextRequest } from "next/server";
import { proxyToSpacetimeApi } from "@/lib/spacetime-http";

type RouteContext = {
  params: Promise<{ auctionId: string }>;
};

export async function POST(req: NextRequest, context: RouteContext) {
  const { auctionId } = await context.params;
  return proxyToSpacetimeApi(
    req,
    `/v1/auctions/start?auctionId=${encodeURIComponent(auctionId)}`
  );
}
