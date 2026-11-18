"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building, Briefcase, CheckCircle2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as PricingCard from "@/components/ui/pricing-card"
import { cn } from "@/lib/utils"
import type { ITranslation } from "@/translations/ITranslation"
import { EN } from "@/translations/en/en"

const PLAN_META = [
  { icon: <Users />, variant: "outline" as const, href: "/auction", stripePlan: null },
  { icon: <Briefcase />, variant: "default" as const, href: "/dashboard", stripePlan: "wholesale_desk" as const },
  { icon: <Building />, variant: "outline" as const, href: "/dashboard", stripePlan: "enterprise" as const },
]

export function PricingSection({
  copy = EN.PricingPage.Section,
}: {
  copy?: ITranslation["PricingPage"]["Section"];
}) {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async (plan: "wholesale_desk" | "enterprise") => {
    setCheckoutError(null);
    setLoadingPlan(plan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setCheckoutError(data.error ?? "Unable to start checkout.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setCheckoutError("Network error. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="scroll-mt-24">
      <div className="mb-8 max-w-xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
          {copy.Eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {copy.Title}
        </h2>
        {checkoutError && (
          <p className="mt-2 text-xs font-medium text-rose-400">
            {checkoutError}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {copy.Plans.map((plan, idx) => {
          const meta = PLAN_META[idx] ?? PLAN_META[0];
          return (
          <PricingCard.Card
            key={plan.name}
            className={cn(
              "max-w-none rounded-3xl border-white/[0.08] bg-[#090d14]/90",
              plan.badge && "border-[#3ff2e0]/30 shadow-[0_0_32px_rgba(63,242,224,0.08)]"
            )}
          >
            <PricingCard.Header className="rounded-2xl border-white/[0.07] bg-[#0e1420]/80">
              <PricingCard.Plan>
                <PricingCard.PlanName className="text-zinc-300">
                  {meta.icon}
                  <span>{plan.name}</span>
                </PricingCard.PlanName>
                {plan.badge && (
                  <PricingCard.Badge className="border-[#3ff2e0]/35 bg-[#3ff2e0]/10 font-semibold text-[#3ff2e0]">
                    {plan.badge}
                  </PricingCard.Badge>
                )}
              </PricingCard.Plan>

              <PricingCard.Price>
                <PricingCard.MainPrice className="text-white">
                  {plan.price}
                </PricingCard.MainPrice>
                {plan.period && (
                  <PricingCard.Period className="text-zinc-400">
                    {plan.period}
                  </PricingCard.Period>
                )}
                {plan.original && (
                  <PricingCard.OriginalPrice className="text-zinc-500">
                    {plan.original}
                  </PricingCard.OriginalPrice>
                )}
              </PricingCard.Price>

              {meta.stripePlan ? (
                <Button
                  type="button"
                  disabled={loadingPlan !== null}
                  onClick={() => void handleCheckout(meta.stripePlan)}
                  variant={meta.variant}
                  className={cn(
                    "w-full cursor-pointer rounded-full font-semibold",
                    meta.variant === "default"
                      ? "bg-[#e4fffb] text-[#04070b] hover:bg-white"
                      : "border-white/15 bg-white/[0.04] text-zinc-100 hover:bg-white/[0.08] hover:text-white"
                  )}
                >
                  {loadingPlan === meta.stripePlan ? "Redirecting…" : plan.cta}
                </Button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-white/15 bg-white/[0.04] font-semibold text-zinc-100 hover:bg-white/[0.08] hover:text-white"
                >
                  <Link href={meta.href}>{plan.cta}</Link>
                </Button>
              )}
            </PricingCard.Header>

            <PricingCard.Body>
              <PricingCard.Description className="text-zinc-400">
                {plan.description}
              </PricingCard.Description>
              <PricingCard.List>
                {plan.features.map((item) => (
                  <PricingCard.ListItem key={item} className="text-zinc-300">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#3ff2e0]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </PricingCard.ListItem>
                ))}
              </PricingCard.List>
            </PricingCard.Body>
          </PricingCard.Card>
          );
        })}
      </div>
    </section>
  )
}
