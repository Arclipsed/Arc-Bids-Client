"use client";

import { useState } from "react";
import { Check, Lock, Timer, Users, Zap } from "lucide-react";
import { InteractivePill } from "@/components/ui/interactive-pill";
import type { ITranslation } from "@/translations/ITranslation";
import { EN } from "@/translations/en/en";

const MAX_BID_OPTIONS = [20_000, 22_000, 25_000];
const DEMO_LISTS = [
  { id: "fleet", name: "Fleet Buyers", count: 14 },
  { id: "vip", name: "VIP EU Dealers", count: 8 },
  { id: "tech", name: "ITAD Resellers", count: 23 },
];

export function FeaturesShowcase({
  copy = EN.HomePage.Features,
}: {
  copy?: ITranslation["HomePage"]["Features"];
}) {
  const [maxBid, setMaxBid] = useState<number>(22_000);
  const [autoBidOn, setAutoBidOn] = useState<boolean>(true);
  const [selectedLists, setSelectedLists] = useState<string[]>(["fleet", "vip"]);

  return (
    <section id="features" className="scroll-mt-24">
      <div className="mb-8 max-w-xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
          {copy.Eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {copy.Title}
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
              {copy.AutoBidTitle}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              {copy.AutoBidDesc}
            </p>
          </div>

          {/* Interactive Mini Widget */}
          <div className="mt-5 rounded-2xl border border-white/[0.07] bg-[#0e1420]/80 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-zinc-400">
                {copy.AutoBidToggleLabel}
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
              {copy.AntiSnipeTitle}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              {copy.AntiSnipeDesc}
            </p>
          </div>

          {/* Visual Timeline */}
          <div className="mt-5 rounded-2xl border border-white/[0.07] bg-[#0e1420]/80 p-3.5">
            <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#070a10] px-3 py-2.5">
              <span className="font-mono text-xs text-zinc-400 line-through">
                00:03
              </span>
              <span className="font-mono text-[11px] font-semibold text-[#3ff2e0]">
                {copy.AntiSnipeExtended}
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

        {/* Card 3: Buyer Email Lists */}
        <div className="flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#090d14] p-6 transition hover:border-white/15">
          <div>
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-500/10 text-emerald-300">
              <Users className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              {copy.InvitesTitle}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              {copy.InvitesDesc}
            </p>
          </div>

          {/* Interactive Buyer Email List Selector */}
          <div className="mt-5 rounded-2xl border border-white/[0.07] bg-[#0e1420]/80 p-3.5">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                <Lock className="h-3.5 w-3.5 text-[#3ff2e0]" />
                Private Auction Only
              </span>
              <span className="font-mono text-[10px] text-[#3ff2e0]">
                {selectedLists.length} selected
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {DEMO_LISTS.map((list) => {
                const active = selectedLists.includes(list.id);
                return (
                  <button
                    key={list.id}
                    type="button"
                    onClick={() =>
                      setSelectedLists((prev) =>
                        active
                          ? prev.filter((id) => id !== list.id)
                          : [...prev, list.id]
                      )
                    }
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                      active
                        ? "border-[#3ff2e0]/50 bg-[#3ff2e0]/15 text-[#3ff2e0]"
                        : "border-white/10 bg-[#070a10] text-zinc-400 hover:border-white/25"
                    }`}
                  >
                    <span
                      className={`flex h-3 w-3 items-center justify-center rounded-full border ${
                        active
                          ? "border-[#3ff2e0] bg-[#3ff2e0] text-[#04070b]"
                          : "border-white/25"
                      }`}
                    >
                      {active && <Check className="h-2 w-2 stroke-[3]" />}
                    </span>
                    <span>{list.name}</span>
                    <span className="font-mono text-[10px] opacity-75">
                      ({list.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
