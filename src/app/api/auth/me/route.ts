import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/email-auth";
import { signSpacetimeIdToken } from "@/lib/oidc-issuer";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ email: null }, { status: 200 });
  }
  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ email: null }, { status: 200 });
  }
  const issuer =
    process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "") ||
    req.nextUrl.origin;
  const spacetimeToken = await signSpacetimeIdToken(session.email, issuer);

  return NextResponse.json(
    {
      email: session.email,
      ...(spacetimeToken ? { spacetimeToken } : {}),
    },
    { status: 200 }
  );
}
