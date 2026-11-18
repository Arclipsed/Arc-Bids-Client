import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/email-auth";

export async function GET() {
  return NextResponse.json({
    configured: Boolean(process.env.STRIPE_SECRET_KEY?.trim()),
  });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) {
    return NextResponse.json({ paid: false, configured: false });
  }

  try {
    const body = (await req.json()) as { sessionId?: string; orgId?: string };
    const sessionId = body.sessionId?.trim();
    const orgId = body.orgId?.trim();

    if (!sessionId || !orgId) {
      return NextResponse.json({ paid: false }, { status: 400 });
    }

    const stripe = new Stripe(secretKey);
    const checkout = await stripe.checkout.sessions.retrieve(sessionId);

    const isPaid =
      checkout.payment_status === "paid" &&
      checkout.metadata?.orgId === orgId &&
      checkout.metadata?.email === session.email;

    const quantity = Math.max(1, Number(checkout.metadata?.quantity ?? 1) || 1);

    return NextResponse.json({ paid: isPaid, orgId, quantity });
  } catch {
    return NextResponse.json({ paid: false }, { status: 500 });
  }
}
