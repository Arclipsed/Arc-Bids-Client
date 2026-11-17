"use client";

import { AnimatePresence, motion } from "motion/react";
import { Crown } from "lucide-react";
import type { UiBid } from "@/lib/auction-types";
import { formatCurrency } from "@/lib/format";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HighestBidderCardProps {
  topBid?: UiBid | null;
}

export function HighestBidderCard({ topBid }: HighestBidderCardProps) {
  const initial = topBid?.buyerName.trim().charAt(0).toUpperCase() || "—";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-amber-400/25 bg-gradient-to-b from-amber-400/[0.08] via-[#090d14] to-[#090d14] p-5 shadow-2xl shadow-black/60">
      <div className="mb-3 flex items-center gap-2">
        <motion.span
          key={topBid ? `crown-${topBid.id.toString()}` : "crown-empty"}
          initial={{ scale: 0.85, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 40 }}
          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/15 text-amber-300"
        >
          <Crown className="h-3.5 w-3.5" />
        </motion.span>
        <h3 className="text-sm font-semibold text-white">Highest Bidder</h3>
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        {topBid ? (
          <motion.div
            key={topBid.id.toString()}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, originY: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 40 }}
            className="flex items-center justify-between gap-3 rounded-2xl border border-amber-400/20 bg-[#0e1420]/80 px-3.5 py-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Avatar className="h-10 w-10 shrink-0 ring-1 ring-amber-400/40">
                <AvatarFallback className="bg-amber-400/15 text-sm font-bold text-amber-300">
                  {initial}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {topBid.buyerName}
                </p>
                <p className="text-xs text-amber-200/70">Current top offer</p>
              </div>
            </div>

            <span className="shrink-0 font-mono text-base font-bold tabular-nums text-amber-300">
              {formatCurrency(topBid.amount)}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-white/[0.06] bg-[#0e1420]/70 px-4 py-4 text-center text-xs text-zinc-400"
          >
            No bids placed yet — waiting for opening bid.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
