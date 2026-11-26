import { NextRequest } from "next/server";
import { proxyToSpacetimeApi } from "@/lib/spacetime-http";

type RouteContext = {
  params: Promise<{ auctionId: string }>;
};

export async function PATCH(req: NextRequest, context: RouteContext) {
  const { auctionId } = await context.params;
  return proxyToSpacetimeApi(
    req,
    `/v1/auctions/update?auctionId=${encodeURIComponent(auctionId)}`
  );
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const { auctionId } = await context.params;
  return proxyToSpacetimeApi(
    req,
    `/v1/auctions/delete?auctionId=${encodeURIComponent(auctionId)}`
  );
}
