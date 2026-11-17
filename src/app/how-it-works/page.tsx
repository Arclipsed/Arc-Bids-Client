import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import {
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  Gavel,
  Globe,
  Layers,
  Lock,
  Mail,
  Package,
  ShieldCheck,
  Trophy,
  UserCheck,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import FooterSection from "@/components/FooterSection";

const SELLER_STEPS = [
  {
    step: "01",
    icon: Building2,
    title: "Set up your organization",
    summary:
      "Sign in with your email magic link—no passwords required. ArcBid creates your organization workspace and public storefront page (arcbids.com/your-slug) automatically.",
    detail:
      "You can customize your organization name and URL slug anytime from the Seller Dashboard.",
  },
  {
    step: "02",
    icon: ShieldCheck,
    title: "Configure room rules & access",
    summary:
      "Choose your auction title, currency (EUR or USD), per-lot countdown timer, anti-snipe window, and minimum bid increment.",
    detail:
      "Set the room to Public (anyone with the link can join) or Invite-Only (only emails on your Organization Whitelist can enter). You can also schedule a future start date and time.",
  },
  {
    step: "03",
    icon: Package,
    title: "Add your wholesale lots",
    summary:
      "Add at least one lot with a title, unit quantity, starting price, description, and photos.",
    detail:
      "Uploaded photos are automatically resized and compressed for fast loading. Setting a quantity (e.g. 40 units) lets buyers see live per-unit pricing as bids climb.",
  },
  {
    step: "04",
    icon: CalendarClock,
    title: "Share the room link & go live",
    summary:
      "Share your private unguessable room link or your organization page with buyers.",
    detail:
      "Before the auction starts, buyers see an Auction Preview with a live countdown and an Add to Calendar button. Click Start anytime—or let scheduled rooms open automatically.",
  },
  {
    step: "05",
    icon: Trophy,
    title: "Close automatically & contact winners",
    summary:
      "When a lot timer hits zero, the highest bidder wins and the room advances to the next queued lot automatically.",
    detail:
      "Once all lots finish, open the Winners dialog on your dashboard to view every sold lot, winning bid, and buyer email with one-click copy and email actions.",
  },
];

const BUYER_STEPS = [
  {
    step: "01",
    icon: Globe,
    title: "Open the auction link",
    summary:
      "Open the room link shared by the seller. If the room is in Preview, you can inspect the upcoming lots and add the start time to your calendar.",
  },
  {
    step: "02",
    icon: UserCheck,
    title: "Enter your name & email",
    summary:
      "Provide your name (or company) and email address to enter. Invite-only rooms verify your email against the seller's whitelist; public rooms let anyone join with their name.",
  },
  {
    step: "03",
    icon: Gavel,
    title: "Place bids in real time",
    summary:
      "Watch photos, unit counts, per-unit pricing, and the live Activity feed update instantaneously. Use the quick-step buttons (Min, +$100, etc.) to bid in one click.",
  },
  {
    step: "04",
    icon: CheckCircle2,
    title: "Fair close & fulfillment",
    summary:
      "Anti-snipe protection keeps last-second bidding fair. When the timer finishes, the highest bidder locks in the lot and the seller follows up directly via email.",
  },
];

const MECHANICS = [
  {
    icon: Clock,
    title: "Anti-Snipe Timer",
    description:
      "If a bid is placed during the final seconds of a lot (inside the room's anti-snipe window, e.g. 15s), the countdown automatically extends back to that window so every buyer has a fair chance to respond.",
  },
  {
    icon: Lock,
    title: "Single Session Per Email",
    description:
      "Each email address can only be active once in a given auction room at a time. This prevents duplicate sessions across multiple tabs or devices while keeping bidding clean and accountable.",
  },
  {
    icon: Layers,
    title: "Automatic Lot Progression",
    description:
      "Lots run sequentially in the order you set. When one lot expires, it is marked Sold (if it received bids) or Unsold, and the next queued lot activates immediately until the auction ends.",
  },
  {
    icon: Mail,
    title: "Direct Seller-to-Winner Contact",
    description:
      "ArcBid captures the winning buyer's name and email on every bid so sellers can immediately invoice and coordinate delivery from the Winners panel after the auction finishes.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#05070c] text-zinc-100">
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05070c]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.02] text-sm font-bold text-white shadow-inner shadow-white/10 transition group-hover:border-sky-400/40">
              A
            </span>
            <span className="text-base font-bold tracking-tight text-white">
              ArcBid
            </span>
          </Link>

          <SiteNav />

          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-1.5 rounded-full bg-[#e4fffb] px-4 py-2 text-xs font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_20px_rgba(63,242,224,0.18)] transition hover:bg-white hover:shadow-[0_0_26px_rgba(63,242,224,0.3)]"
          >
            Get Started
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-20 px-4 py-14 sm:px-6 sm:py-20">
        {/* Hero */}
        <section className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
            How It Works
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.08]">
            From wholesale lots to closed deals —{" "}
            <span className="bg-gradient-to-r from-[#e4fffb] via-[#3ff2e0] to-[#0f8f9f] bg-clip-text text-transparent">
              step by step.
            </span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            ArcBid runs live, synchronized wholesale auction rooms directly in
            the browser. Here is a clear walkthrough of how sellers host rooms
            and how buyers join and bid.
          </p>
        </section>

        {/* Seller Walkthrough */}
        <section className="space-y-6">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
              For Sellers
            </p>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Hosting a live auction
            </h2>
          </div>

          <div className="space-y-4">
            {SELLER_STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="rounded-3xl border border-white/[0.08] bg-[#090d14] p-6 sm:p-7"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                    <div className="flex items-center gap-3 sm:w-28 sm:shrink-0">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 text-[#3ff2e0]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs font-bold text-zinc-500">
                        STEP {item.step}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-200">
                        {item.summary}
                      </p>
                      <p className="text-xs leading-relaxed text-zinc-400">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Buyer Walkthrough */}
        <section className="space-y-6">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
              For Buyers
            </p>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Joining & placing bids
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {BUYER_STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="rounded-3xl border border-white/[0.08] bg-[#090d14] p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#3ff2e0]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-bold text-zinc-500">
                      STEP {item.step}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {item.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Core Mechanics */}
        <section className="space-y-6">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
              Under the Hood
            </p>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Built-in auction rules
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {MECHANICS.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="rounded-3xl border border-white/[0.07] bg-[#0e1420]/60 p-6"
                >
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#3ff2e0]/20 bg-[#3ff2e0]/10 text-[#3ff2e0]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-3.5 text-base font-semibold text-white">
                    {m.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                    {m.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-[#3ff2e0]/20 bg-gradient-to-br from-[#0b181c] via-[#090d14] to-[#090d14] p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to launch your first auction room?
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-sm text-zinc-400">
            Create your organization, add your wholesale lots, and invite buyers
            in minutes.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#e4fffb] px-6 text-sm font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_24px_rgba(63,242,224,0.2)] transition hover:bg-white"
            >
              Open Dashboard
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.08] hover:text-white"
            >
              View Pricing
            </Link>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
