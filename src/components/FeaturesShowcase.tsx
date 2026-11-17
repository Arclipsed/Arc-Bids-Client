"use client";

import { useState } from "react";
import { Check, Copy, Timer, UserPlus, Zap } from "lucide-react";
import { InteractivePill } from "@/components/ui/interactive-pill";

const MAX_BID_OPTIONS = [20_000, 22_000, 25_000];

export function FeaturesShowcase() {
  const [maxBid, setMaxBid] = useState<number>(22_000);
  const [autoBidOn, setAutoBidOn] = useState<boolean>(true);
  const [copiedInvite, setCopiedInvite] = useState<boolean>(false);
  const [buyerAllowed, setBuyerAllowed] = useState<boolean>(true);

  return (
    <section id="features" className="scroll-mt-24">
      <div className="mb-8 max-w-xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
          Platform
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Engineered for live wholesale speed.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Card 1: Max Bid & Auto-Bidding */}
        <div className="flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#090d14] p-6 transition hover:border-white/15">
          <div>
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 text-[#3ff2e0]">
              <Zap className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              Auto-Bid &amp; Max Ceiling
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              Let your buyers set a maximum ceiling once. Automated minimum
              increments keep competition going and drive stronger close prices
              on your lots.
            </p>
          </div>

          {/* Interactive Mini Widget */}
          <div className="mt-5 rounded-2xl border border-white/[0.07] bg-[#0e1420]/80 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-zinc-400">
                Auto-Bidding
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={autoBidOn}
                aria-label="Toggle auto-bidder"
                onClick={() => setAutoBidOn((v) => !v)}
                className="group inline-flex cursor-pointer items-center focus-visible:outline-none"
              >
                <span
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-200 ${
                    autoBidOn
                      ? "border-[#3ff2e0]/50 bg-[#3ff2e0]/25"
                      : "border-white/15 bg-white/[0.06] group-hover:border-white/25"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 rounded-full transition-transform duration-200 ${
                      autoBidOn
                        ? "translate-x-[18px] bg-[#3ff2e0] shadow-[0_0_8px_rgba(63,242,224,0.6)]"
                        : "translate-x-[3px] bg-zinc-400"
                    }`}
                  />
                </span>
              </button>
            </div>

            <div className="mt-3 flex items-center gap-1.5">
              {MAX_BID_OPTIONS.map((amount) => (
                <InteractivePill
                  key={amount}
                  active={maxBid === amount}
                  disabled={!autoBidOn}
                  onClick={() => setMaxBid(amount)}
                  className="flex-1 py-1.5"
                >
                  ${(amount / 1000).toFixed(0)}k
                </InteractivePill>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5 text-[11px]">
              <span className="text-zinc-400">Next auto-step</span>
              <span
                className={`font-mono font-semibold ${
                  autoBidOn ? "text-[#3ff2e0]" : "text-zinc-500"
                }`}
              >
                {autoBidOn
                  ? `+$50 up to $${maxBid.toLocaleString("en-US")}`
                  : "Auto-bidding paused"}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Anti-Snipe Protection */}
        <div className="flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#090d14] p-6 transition hover:border-white/15">
          <div>
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-400/25 bg-indigo-500/10 text-indigo-300">
              <Timer className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              Anti-Snipe Protection
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              Last-second bids automatically extend your lot timer so competing
              buyers always have time to counter—maximizing final sale value.
            </p>
          </div>

          {/* Visual Timeline */}
          <div className="mt-5 rounded-2xl border border-white/[0.07] bg-[#0e1420]/80 p-3.5">
            <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#070a10] px-3 py-2.5">
              <span className="font-mono text-xs text-zinc-400 line-through">
                00:03
              </span>
              <span className="font-mono text-[11px] font-semibold text-[#3ff2e0]">
                +15s extended
              </span>
              <span className="font-mono text-sm font-bold tabular-nums text-[#e4fffb]">
                00:18
              </span>
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-[#3ff2e0]"
                style={{ width: "68%" }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Private Buyer Invites */}
        <div className="flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#090d14] p-6 transition hover:border-white/15">
          <div>
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-500/10 text-emerald-300">
              <UserPlus className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              Private Buyer Invites
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              Invite only the wholesale buyers you trust with private room
              links, and control who can bid anytime from your desk.
            </p>
          </div>

          {/* Interactive Buyer Invite Control */}
          <div className="mt-5 rounded-2xl border border-white/[0.07] bg-[#0e1420]/80 p-3.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3ff2e0]/15 text-[10px] font-bold text-[#3ff2e0]">
                  N
                </span>
                <span className="truncate text-xs font-semibold text-white">
                  Nordic Tech Supply
                </span>
              </div>
              <InteractivePill
                tone="accent"
                active={buyerAllowed}
                onClick={() => setBuyerAllowed((v) => !v)}
                className="px-2.5 py-0.5 text-[10px]"
              >
                {buyerAllowed ? "Invited" : "Paused"}
              </InteractivePill>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-white/[0.05] bg-[#070a10] px-3 py-2">
              <span className="truncate font-mono text-[11px] text-zinc-400">
                arcbids.com/auction?invite=nordic
              </span>
              <InteractivePill
                tone="subtle"
                onClick={() => {
                  setCopiedInvite(true);
                  setTimeout(() => setCopiedInvite(false), 1800);
                }}
                className="shrink-0 gap-1 px-2.5 py-1 text-[10px]"
              >
                {copiedInvite ? (
                  <>
                    <Check className="h-3 w-3 text-[#3ff2e0]" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy Link
                  </>
                )}
              </InteractivePill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
