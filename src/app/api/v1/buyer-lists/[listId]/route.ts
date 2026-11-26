import { NextRequest } from "next/server";
import { proxyToSpacetimeApi } from "@/lib/spacetime-http";

type RouteContext = {
  params: Promise<{ listId: string }>;
};

export async function PATCH(req: NextRequest, context: RouteContext) {
  const { listId } = await context.params;
  return proxyToSpacetimeApi(
    req,
    `/v1/buyer-lists/update?listId=${encodeURIComponent(listId)}`
  );
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const { listId } = await context.params;
  return proxyToSpacetimeApi(
    req,
    `/v1/buyer-lists/delete?listId=${encodeURIComponent(listId)}`
  );
}
