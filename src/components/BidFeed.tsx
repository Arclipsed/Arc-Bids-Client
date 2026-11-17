"use client";

import { AnimatePresence } from "motion/react";
import type { UiBid } from "@/lib/auction-types";
import { formatCurrency, formatRelativeTime } from "@/lib/format";
import { AnimatedListItem } from "@/components/ui/animated-list";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface BidFeedProps {
  bids: UiBid[];
  nowMs: number;
  className?: string;
}

export function BidFeed({ bids, nowMs, className }: BidFeedProps) {
  return (
    <section
      className={cn(
        "relative flex h-[340px] max-h-[340px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#090d14] p-5 shadow-2xl shadow-black/60 lg:h-auto lg:max-h-none",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Activity</h3>
        <span className="font-mono text-xs font-medium text-zinc-400">
          {bids.length} {bids.length === 1 ? "bid" : "bids"}
        </span>
      </div>

      {bids.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-white/[0.06] bg-[#0e1420]/70 px-4 py-6 text-center text-xs text-zinc-400">
          No bids placed on this lot yet. Be the first!
        </div>
      ) : (
        <div className="relative min-h-0 flex-1">
          <div className="flex h-full flex-col gap-2 overflow-y-auto pb-2 no-scrollbar">
            <AnimatePresence initial={false}>
              {bids.slice(0, 8).map((bid, index) => {
                const initial = bid.buyerName.trim().charAt(0).toUpperCase() || "B";
                const isTop = index === 0;
                return (
                  <AnimatedListItem key={bid.id.toString()}>
                    <div
                      className={`flex items-center justify-between gap-3 rounded-2xl border px-3.5 py-2.5 transition-colors ${
                        isTop
                          ? "border-[#3ff2e0]/25 bg-[#3ff2e0]/[0.06]"
                          : "border-white/[0.05] bg-[#0e1420]/60"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Avatar className="h-9 w-9 shrink-0">
                          <AvatarFallback
                            className={`text-xs font-semibold ${
                              isTop
                                ? "bg-[#3ff2e0]/20 text-[#3ff2e0]"
                                : "bg-white/[0.08] text-zinc-300"
                            }`}
                          >
                            {initial}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-zinc-100">
                            {bid.buyerName}
                          </p>
                          <p className="text-xs text-zinc-400">
                            {formatRelativeTime(bid.createdAtMs, nowMs)}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 font-mono text-sm font-semibold tabular-nums ${
                          isTop ? "text-[#3ff2e0]" : "text-zinc-200"
                        }`}
                      >
                        {formatCurrency(bid.amount)}
                      </span>
                    </div>
                  </AnimatedListItem>
                );
              })}
            </AnimatePresence>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#090d14] to-transparent" />
        </div>
      )}
    </section>
  );
}
