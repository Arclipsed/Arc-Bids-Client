import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/email-auth";
import {
  STRIPE_PLANS,
  getStripeClient,
  type StripePlanId,
} from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
  }

  const stripe = getStripeClient();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured yet (STRIPE_SECRET_KEY missing)." },
      { status: 500 }
    );
  }

  try {
    const body = (await req.json()) as { plan?: string };
    const planKey = body.plan as StripePlanId | undefined;
    if (!planKey || !(planKey in STRIPE_PLANS)) {
      return NextResponse.json({ error: "Invalid plan selected." }, { status: 400 });
    }

    const plan = STRIPE_PLANS[planKey];
    const origin =
      process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "") ||
      req.nextUrl.origin;

    const existingCustomers = await stripe.customers.list({
      email: session.email,
      limit: 1,
    });
    const customerId = existingCustomers.data[0]?.id;

    const lineItem = plan.envPriceId
      ? { price: plan.envPriceId, quantity: 1 }
      : {
          price_data: {
            currency: "usd",
            product_data: { name: plan.name },
            unit_amount: plan.unitAmountCents,
            recurring: { interval: "month" as const },
          },
          quantity: 1,
        };

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      ...(customerId ? { customer: customerId } : { customer_email: session.email }),
      line_items: [lineItem],
      success_url: `${origin}/dashboard?billing=success`,
      cancel_url: `${origin}/pricing?billing=cancelled`,
      metadata: {
        email: session.email,
        plan: planKey,
      },
      subscription_data: {
        metadata: {
          email: session.email,
          plan: planKey,
        },
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
