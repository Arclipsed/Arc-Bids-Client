import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/email-auth";
import { getStripeClient } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    return NextResponse.json({ configured: false, plan: "free", status: null });
  }

  const stripe = getStripeClient();
  if (!stripe) {
    return NextResponse.json({ configured: false, plan: "free", status: null });
  }

  try {
    const customers = await stripe.customers.list({
      email: session.email,
      limit: 1,
    });
    const customer = customers.data[0];
    if (!customer) {
      return NextResponse.json({ configured: true, plan: "free", status: null });
    }

    const subs = await stripe.subscriptions.list({
      customer: customer.id,
      status: "all",
      limit: 5,
    });
    const activeSub =
      subs.data.find((s) => s.status === "active" || s.status === "trialing") ??
      subs.data[0];

    if (!activeSub) {
      return NextResponse.json({ configured: true, plan: "free", status: null });
    }

    const metaPlan = activeSub.metadata?.plan;
    const planLabel =
      metaPlan === "enterprise"
        ? "Enterprise"
        : metaPlan === "wholesale_desk"
          ? "Wholesale Desk"
          : "Pro";

    return NextResponse.json({
      configured: true,
      plan: planLabel,
      status: activeSub.status,
      hasCustomer: true,
    });
  } catch {
    return NextResponse.json({ configured: true, plan: "free", status: null });
  }
}
