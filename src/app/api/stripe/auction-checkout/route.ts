import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/email-auth";

const AUCTION_FEE_CENTS = 1000; // €10.00

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
    const body = (await req.json()) as { roomId?: string; roomTitle?: string };
    const roomId = body.roomId?.trim();
    const roomTitle = body.roomTitle?.trim() || "Auction Room";

    if (!roomId || !/^\d+$/.test(roomId)) {
      return NextResponse.json({ error: "Invalid roomId." }, { status: 400 });
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
              name: `ArcBids Auction Launch — ${roomTitle}`,
              description: "One-time fee to unlock and start this auction room",
            },
            unit_amount: AUCTION_FEE_CENTS,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?paid_room=${encodeURIComponent(roomId)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard`,
      metadata: {
        roomId,
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
