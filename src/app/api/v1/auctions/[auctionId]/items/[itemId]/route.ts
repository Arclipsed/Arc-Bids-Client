import { NextRequest } from "next/server";
import { proxyToSpacetimeApi } from "@/lib/spacetime-http";

type RouteContext = {
  params: Promise<{ auctionId: string; itemId: string }>;
};

export async function PATCH(req: NextRequest, context: RouteContext) {
  const { auctionId, itemId } = await context.params;
  return proxyToSpacetimeApi(
    req,
    `/v1/items/update?auctionId=${encodeURIComponent(auctionId)}&itemId=${encodeURIComponent(itemId)}`
  );
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const { auctionId, itemId } = await context.params;
  return proxyToSpacetimeApi(
    req,
    `/v1/items/delete?auctionId=${encodeURIComponent(auctionId)}&itemId=${encodeURIComponent(itemId)}`
  );
}
