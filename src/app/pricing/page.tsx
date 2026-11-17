import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import FooterSection from "@/components/FooterSection";
import { SiteNav } from "@/components/SiteNav";
import { PricingSection } from "@/components/PricingSection";

export default function PricingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-[#05070c] text-zinc-100">
      {/* Header */}
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

      {/* Subtle ambient background */}
      <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6 sm:py-24">
        <PricingSection />
      </main>

      <FooterSection />
    </div>
  );
}
