import { NextRequest } from "next/server";
import { proxyToSpacetimeApi } from "@/lib/spacetime-http";

export async function GET(req: NextRequest) {
  return proxyToSpacetimeApi(req, "/v1/buyer-lists");
}

export async function POST(req: NextRequest) {
  return proxyToSpacetimeApi(req, "/v1/buyer-lists/create");
}
