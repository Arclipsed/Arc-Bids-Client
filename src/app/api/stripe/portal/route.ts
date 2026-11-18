import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/email-auth";
import { getStripeClient } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripe = getStripeClient();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 500 }
    );
  }

  try {
    const customers = await stripe.customers.list({
      email: session.email,
      limit: 1,
    });
    const customer = customers.data[0];

    if (!customer) {
      return NextResponse.json(
        { error: "No billing account found yet." },
        { status: 404 }
      );
    }

    const origin =
      process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "") ||
      req.nextUrl.origin;

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${origin}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Failed to open billing portal.",
      },
      { status: 500 }
    );
  }
}
