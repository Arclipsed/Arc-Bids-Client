"use client"

import Link from "next/link"
import { Building, Briefcase, CheckCircle2, Ticket, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as PricingCard from "@/components/ui/pricing-card"
import { cn } from "@/lib/utils"
import type { ITranslation } from "@/translations/ITranslation"
import { EN } from "@/translations/en/en"
import { Locale } from "@/translations/Translations"

const SHOW_TIER_PLANS = false;

const TICKET_PRICING_COPY = {
  EN: {
    title: "Simple Pay-Per-Auction Tickets",
    subtitleLead:
      "We currently use a simple pay-per-auction ticket model with no monthly commitment — and as our 2026 launch offer, we take 0% commission for all of 2026 (standard 5% thereafter).",
    subtitleNote:
      "Pricing and volume plans will be adjusted in the future as we roll out new tiers.",
    planName: "Auction Ticket",
    badge: "2026 Offer · 0% Fee",
    price: "€25",
    period: "/ per live auction",
    cta: "Buy Tickets in Dashboard",
    description:
      "Drafting and testing auctions is always free. You only spend 1 Auction Ticket when you schedule or launch a live auction room.",
    features: [
      "Free to create, edit & test draft auctions",
      "1 Ticket (€25) = 1 scheduled or live auction room",
      "Automatic ticket refund if cancelled or deleted before start",
      "Unlimited lots, real-time bidding & private buyer lists",
      "0% commission for all of 2026 (normally 5%)",
    ],
  },
  DE: {
    title: "Einfache Auktions-Tickets pro Auktion",
    subtitleLead:
      "Aktuell nutzen wir ein einfaches Pay-per-Auction-Modell ohne monatliche Bindung — und als unser 2026-Angebot berechnen wir das gesamte Jahr 2026 lang 0 % Provision (regulär 5 %).",
    subtitleNote:
      "Preise und Volumenpakete werden in Zukunft mit neuen Tarifen angepasst.",
    planName: "Auktions-Ticket",
    badge: "2026-Angebot · 0 %",
    price: "25 €",
    period: "/ pro Live-Auktion",
    cta: "Tickets im Dashboard kaufen",
    description:
      "Das Erstellen und Testen von Entwürfen ist immer kostenlos. Sie verbrauchen erst 1 Auktions-Ticket, wenn Sie eine Auktion planen oder live starten.",
    features: [
      "Entwürfe kostenlos erstellen, bearbeiten & testen",
      "1 Ticket (25 €) = 1 geplanter oder Live-Auktionsraum",
      "Automatische Ticket-Rückerstattung bei Stornierung oder Löschung vor Start",
      "Unbegrenzte Lose, Echtzeit-Gebote & private Käuferlisten",
      "0 % Provision für ganz 2026 (regulär 5 %)",
    ],
  },
  ES: {
    title: "Tickets Simples por Subasta",
    subtitleLead:
      "Actualmente usamos un modelo de pago por subasta sin cuotas mensuales — y como oferta de 2026 cobramos 0% de comisión todo 2026 (normalmente 5%).",
    subtitleNote:
      "Los precios y planes por volumen se ajustarán en el futuro.",
    planName: "Ticket de Subasta",
    badge: "Oferta 2026 · 0%",
    price: "€25",
    period: "/ por subasta en vivo",
    cta: "Comprar Tickets en el Panel",
    description:
      "Crear y probar borradores es siempre gratis. Solo gastas 1 Ticket al programar o iniciar una subasta en vivo.",
    features: [
      "Crea, edita y prueba borradores gratis",
      "1 Ticket (€25) = 1 sala programada o en vivo",
      "Reembolso automático del ticket si cancelas o eliminas antes de empezar",
      "Lotes ilimitados, pujas en vivo y listas privadas de compradores",
      "0% de comisión durante todo 2026 (normalmente 5%)",
    ],
  },
  FR: {
    title: "Tickets Simples par Enchère",
    subtitleLead:
      "Nous utilisons un modèle simple à l'enchère sans abonnement — et pour notre offre 2026, nous prenons 0 % de commission toute l'année 2026 (5 % ensuite).",
    subtitleNote:
      "Les tarifs et forfaits volume évolueront avec de nouvelles formules.",
    planName: "Ticket d'Enchère",
    badge: "Offre 2026 · 0 %",
    price: "25 €",
    period: "/ par enchère en direct",
    cta: "Acheter des Tickets",
    description:
      "Créer et tester des brouillons est toujours gratuit. Vous utilisez 1 Ticket uniquement au lancement ou à la planification.",
    features: [
      "Création et test de brouillons gratuits",
      "1 Ticket (25 €) = 1 salle planifiée ou en direct",
      "Remboursement automatique du ticket si annulé avant le début",
      "Lots illimités, enchères en direct & listes d'acheteurs",
      "0 % de commission pour tout 2026 (normalement 5 %)",
    ],
  },
  NL: {
    title: "Eenvoudige Veilingtickets per Veiling",
    subtitleLead:
      "Momenteel gebruiken we een pay-per-auction model zonder maandelijkse kosten — en als 2026-actie rekenen we heel 2026 0% commissie (normaal 5%).",
    subtitleNote:
      "Prijzen en volumepakketten worden in de toekomst uitgebreid.",
    planName: "Veilingticket",
    badge: "2026 Actie · 0%",
    price: "€25",
    period: "/ per live veiling",
    cta: "Tickets Kopen in Dashboard",
    description:
      "Concepten maken en testen is altijd gratis. Je gebruikt pas 1 Ticket wanneer je een veiling plant of live start.",
    features: [
      "Gratis concepten maken, bewerken & testen",
      "1 Ticket (€25) = 1 geplande of live veilingruimte",
      "Automatische ticketteruggave bij annulering vóór aanvang",
      "Onbeperkte kavels, live bieden & koperslijsten",
      "0% commissie voor heel 2026 (normaal 5%)",
    ],
  },
  TR: {
    title: "Açık Artırma Başına Basit Biletler",
    subtitleLead:
      "Şu anda aylık abonelik olmadan açık artırma başına ödeme modeli sunuyoruz — ve 2026 fırsatımızla tüm 2026 boyunca %0 komisyon alıyoruz (normalde %5).",
    subtitleNote:
      "Fiyatlar ve hacim paketleri gelecekte yeni planlarla güncellenecektir.",
    planName: "Açık Artırma Bileti",
    badge: "2026 Fırsatı · %0",
    price: "€25",
    period: "/ canlı açık artırma başına",
    cta: "Panelden Bilet Al",
    description:
      "Taslak oluşturmak ve test etmek her zaman ücretsizdir. Yalnızca planlarken veya canlı başlatırken 1 Bilet harcarsınız.",
    features: [
      "Ücretsiz taslak oluşturma, düzenleme ve test",
      "1 Bilet (€25) = 1 planlı veya canlı açık artırma odası",
      "Başlamadan önce iptal edilirse otomatik bilet iadesi",
      "Sınırsız lot, canlı teklif ve özel alıcı listeleri",
      "2026 boyunca %0 komisyon (normalde %5)",
    ],
  },
  RU: {
    title: "Простые билеты на каждый аукцион",
    subtitleLead:
      "Сейчас действует оплата за каждый аукцион без абонплаты — а по акции 2026 года комиссия 0% весь 2026 год (обычно 5%).",
    subtitleNote:
      "В будущем появятся пакеты и тарифы для больших объемов.",
    planName: "Билет на аукцион",
    badge: "Акция 2026 · 0%",
    price: "€25",
    period: "/ за живой аукцион",
    cta: "Купить билеты в панели",
    description:
      "Создание и тест черновиков всегда бесплатны. 1 Билет списывается только при планировании или запуске аукциона.",
    features: [
      "Бесплатное создание и тест черновиков",
      "1 Билет (€25) = 1 запланированный или живой зал",
      "Автовозврат билета при отмене до старта",
      "Безлимитные лоты, live-ставки и списки покупателей",
      "0% комиссии весь 2026 год (обычно 5%)",
    ],
  },
} as const;

const PLAN_META = [
  { icon: <Users />, variant: "outline" as const, href: "/auction" },
  { icon: <Briefcase />, variant: "default" as const, href: "/dashboard" },
  { icon: <Building />, variant: "outline" as const, href: "/contact" },
]

export function PricingSection({
  copy = EN.PricingPage.Section,
  locale = Locale.EN,
}: {
  copy?: ITranslation["PricingPage"]["Section"];
  locale?: Locale;
}) {
  const ticketCopy =
    TICKET_PRICING_COPY[locale as keyof typeof TICKET_PRICING_COPY] ??
    TICKET_PRICING_COPY.EN;

  return (
    <section id="pricing" className="scroll-mt-24">
      <div className="mb-8 max-w-2xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
          {copy.Eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {SHOW_TIER_PLANS ? copy.Title : ticketCopy.title}
        </h2>
        {!SHOW_TIER_PLANS && (
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {ticketCopy.subtitleLead}{" "}
            <span className="text-zinc-300">{ticketCopy.subtitleNote}</span>
          </p>
        )}
      </div>

      {!SHOW_TIER_PLANS ? (
        <div className="max-w-lg">
          <PricingCard.Card className="max-w-none rounded-3xl border-[#3ff2e0]/30 bg-[#090d14]/90 shadow-[0_0_32px_rgba(63,242,224,0.08)]">
            <PricingCard.Header className="rounded-2xl border-white/[0.07] bg-[#0e1420]/80">
              <PricingCard.Plan>
                <PricingCard.PlanName className="text-zinc-200">
                  <Ticket className="text-[#3ff2e0]" />
                  <span>{ticketCopy.planName}</span>
                </PricingCard.PlanName>
                <PricingCard.Badge className="border-[#3ff2e0]/35 bg-[#3ff2e0]/10 font-semibold text-[#3ff2e0]">
                  {ticketCopy.badge}
                </PricingCard.Badge>
              </PricingCard.Plan>

              <PricingCard.Price>
                <PricingCard.MainPrice className="text-white">
                  {ticketCopy.price}
                </PricingCard.MainPrice>
                <PricingCard.Period className="text-zinc-400">
                  {ticketCopy.period}
                </PricingCard.Period>
              </PricingCard.Price>

              <Button
                asChild
                variant="default"
                className="w-full rounded-full bg-[#e4fffb] font-semibold text-[#04070b] hover:bg-white"
              >
                <Link href="/dashboard">{ticketCopy.cta}</Link>
              </Button>
            </PricingCard.Header>

            <PricingCard.Body>
              <PricingCard.Description className="text-zinc-400">
                {ticketCopy.description}
              </PricingCard.Description>
              <PricingCard.List>
                {ticketCopy.features.map((item) => (
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
        </div>
      ) : (
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

                  <Button
                    asChild
                    variant={meta.variant}
                    className={cn(
                      "w-full rounded-full font-semibold",
                      meta.variant === "default"
                        ? "bg-[#e4fffb] text-[#04070b] hover:bg-white"
                        : "border-white/15 bg-white/[0.04] text-zinc-100 hover:bg-white/[0.08] hover:text-white"
                    )}
                  >
                    <Link href={meta.href}>{plan.cta}</Link>
                  </Button>
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
      )}
    </section>
  )
}
