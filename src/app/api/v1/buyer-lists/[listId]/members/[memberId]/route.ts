import { NextRequest } from "next/server";
import { proxyToSpacetimeApi } from "@/lib/spacetime-http";

type RouteContext = {
  params: Promise<{ listId: string; memberId: string }>;
};

export async function PATCH(req: NextRequest, context: RouteContext) {
  const { listId, memberId } = await context.params;
  return proxyToSpacetimeApi(
    req,
    `/v1/buyer-lists/members/update?listId=${encodeURIComponent(listId)}&memberId=${encodeURIComponent(memberId)}`
  );
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const { listId, memberId } = await context.params;
  return proxyToSpacetimeApi(
    req,
    `/v1/buyer-lists/members/delete?listId=${encodeURIComponent(listId)}&memberId=${encodeURIComponent(memberId)}`
  );
}
