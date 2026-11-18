import Stripe from "stripe";

export type StripePlanId = "wholesale_desk" | "enterprise";

export const STRIPE_PLANS: Record<
  StripePlanId,
  {
    name: string;
    unitAmountCents: number;
    envPriceId: string | undefined;
  }
> = {
  wholesale_desk: {
    name: "ArcBids Wholesale Desk",
    unitAmountCents: 14900,
    envPriceId: process.env.STRIPE_PRICE_WHOLESALE_DESK?.trim(),
  },
  enterprise: {
    name: "ArcBids Enterprise",
    unitAmountCents: 49900,
    envPriceId: process.env.STRIPE_PRICE_ENTERPRISE?.trim(),
  },
};

export function getStripeClient(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key);
}
