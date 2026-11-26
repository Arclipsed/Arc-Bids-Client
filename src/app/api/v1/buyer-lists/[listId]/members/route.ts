import { NextRequest } from "next/server";
import { proxyToSpacetimeApi } from "@/lib/spacetime-http";

type RouteContext = {
  params: Promise<{ listId: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  const { listId } = await context.params;
  return proxyToSpacetimeApi(
    req,
    `/v1/buyer-lists/members?listId=${encodeURIComponent(listId)}`
  );
}

export async function POST(req: NextRequest, context: RouteContext) {
  const { listId } = await context.params;
  return proxyToSpacetimeApi(
    req,
    `/v1/buyer-lists/members/create?listId=${encodeURIComponent(listId)}`
  );
}
