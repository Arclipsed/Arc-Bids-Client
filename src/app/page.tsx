import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import FooterSection from "@/components/FooterSection";
import { SiteNav } from "@/components/SiteNav";
import HalftoneNebula from "@/components/ui/halftone-nebula";
import { LiveAuctionShowcase } from "@/components/LiveAuctionShowcase";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";

const STEPS = [
  {
    step: "01",
    title: "Create your auction room",
    description:
      "Add your wholesale lots, set starting prices, minimum increments, and anti-snipe rules in minutes.",
  },
  {
    step: "02",
    title: "Invite your buyers",
    description:
      "Share private invite links with your approved wholesale buyers so only vetted accounts can bid.",
  },
  {
    step: "03",
    title: "Run live & close fast",
    description:
      "Watch bids land in real time, let anti-snipe keep bidding fair, and lock in winning buyers automatically.",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-[#05070c] text-zinc-100">
      {/* Header (z-50 so NavigationMenu dropdown stays above everything) */}
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

      {/* Interactive Halftone Nebula Hero */}
      <HalftoneNebula
        preset="abyssal"
        params={{ density: 0.34, band: 0.25, vignette: 0.55 }}
        height="auto"
        className="flex min-h-[calc(100svh-65px)] items-center border-b border-white/[0.06] py-14 sm:py-20"
      >
        <div className="relative z-10 mx-auto my-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-[#e4fffb] drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.06]">
              Real-time B2B auctions,{" "}
              <span className="bg-gradient-to-r from-[#e4fffb] via-[#3ff2e0] to-[#0f8f9f] bg-clip-text text-transparent">
                built for speed.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] sm:text-lg">
              Launch private wholesale auction rooms in minutes—with instant
              live bidding, anti-snipe protection, and effortless buyer invites.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="group pointer-events-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#e4fffb] px-7 text-sm font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_28px_rgba(63,242,224,0.2)] transition hover:bg-white hover:shadow-[0_0_34px_rgba(63,242,224,0.32)] active:scale-[0.98]"
              >
                Get Started
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#features"
                className="pointer-events-auto inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-medium text-zinc-200 backdrop-blur-md transition hover:border-white/25 hover:bg-white/[0.09] hover:text-white active:scale-[0.98]"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>
      </HalftoneNebula>

      {/* Below-the-fold sections */}
      <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 space-y-20 px-4 py-20 sm:px-6">
        {/* Live Auction Preview (Lot Card + Real-Time Bidder Feed) */}
        <LiveAuctionShowcase />

        {/* Interactive Features */}
        <FeaturesShowcase />

        {/* How It Works */}
        <section id="how-it-works" className="scroll-mt-24">
          <div className="mb-8 max-w-xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
              How It Works
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              From invite to winning bid in three steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-white/[0.07] bg-[#090d14] p-6"
              >
                <span className="font-mono text-xs font-semibold text-[#3ff2e0]">
                  {item.step}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#09121a] via-[#070b12] to-[#09121a] p-8 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Ready for the next wholesale drop?
              </h2>
              <p className="mt-1.5 text-sm text-zinc-400">
                Join the live room to inspect active lots and place bids in real time.
              </p>
            </div>
            <Link
              href="/auction"
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#e4fffb] px-6 text-sm font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_24px_rgba(63,242,224,0.18)] transition hover:bg-white"
            >
              Enter Live Auction
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
