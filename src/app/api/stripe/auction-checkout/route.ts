import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/email-auth";

const AUCTION_FEE_CENTS = 2500; // €25.00

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured (STRIPE_SECRET_KEY missing)." },
      { status: 500 }
    );
  }

  try {
    const body = (await req.json()) as {
      orgId?: string;
      orgName?: string;
      quantity?: number;
    };
    const orgId = body.orgId?.trim();
    const orgName = body.orgName?.trim();
    const quantity = Math.min(20, Math.max(1, Math.floor(Number(body.quantity ?? 1) || 1)));

    if (!orgId || !/^\d+$/.test(orgId)) {
      return NextResponse.json({ error: "Invalid orgId." }, { status: 400 });
    }

    const stripe = new Stripe(secretKey);
    const origin =
      process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "") ||
      req.nextUrl.origin;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: session.email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name:
                quantity > 1
                  ? `ArcBids Auction Tickets (×${quantity})`
                  : "ArcBids Auction Ticket",
              description: orgName
                ? `1 ticket = 1 scheduled or live auction for ${orgName}. Drafts are always free.`
                : "1 ticket = 1 scheduled or live auction. Drafts are always free.",
            },
            unit_amount: AUCTION_FEE_CENTS,
          },
          quantity,
        },
      ],
      success_url: `${origin}/dashboard?ticket_org=${encodeURIComponent(orgId)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard`,
      metadata: {
        orgId,
        quantity: String(quantity),
        email: session.email,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Failed to start Stripe checkout.",
      },
      { status: 500 }
    );
  }
}
