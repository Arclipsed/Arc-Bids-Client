"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/format";

interface BidControlsProps {
  minNextBid: bigint;
  minIncrement: bigint;
  currentPrice: bigint;
  hasBids: boolean;
  currency?: "USD" | "EUR";
  ended?: boolean;
  disabled: boolean;
  errorMessage?: string | null;
  onPlaceBid: (amount: bigint) => void;
}

export function BidControls({
  minNextBid,
  minIncrement,
  currentPrice,
  hasBids,
  currency = "USD",
  ended = false,
  disabled,
  errorMessage,
  onPlaceBid,
}: BidControlsProps) {
  const stepAmount = minIncrement > BigInt(0) ? minIncrement : BigInt(100);
  const [selectedOffset, setSelectedOffset] = useState<bigint | null>(null);

  const presets = hasBids
    ? [
        { label: "Min", amount: minNextBid },
        { label: `+${formatCurrency(stepAmount * BigInt(2), currency)}`, amount: currentPrice + stepAmount * BigInt(2) },
        { label: `+${formatCurrency(stepAmount * BigInt(3), currency)}`, amount: currentPrice + stepAmount * BigInt(3) },
        { label: `+${formatCurrency(stepAmount * BigInt(5), currency)}`, amount: currentPrice + stepAmount * BigInt(5) },
      ]
    : [
        { label: "Min", amount: minNextBid },
        { label: `+${formatCurrency(stepAmount, currency)}`, amount: currentPrice + stepAmount },
        { label: `+${formatCurrency(stepAmount * BigInt(2), currency)}`, amount: currentPrice + stepAmount * BigInt(2) },
        { label: `+${formatCurrency(stepAmount * BigInt(5), currency)}`, amount: currentPrice + stepAmount * BigInt(5) },
      ];

  const selectedAmount =
    selectedOffset !== null && currentPrice + selectedOffset >= minNextBid
      ? currentPrice + selectedOffset
      : minNextBid;

  const handleSubmit = () => {
    if (disabled) return;
    onPlaceBid(selectedAmount);
    setSelectedOffset(null);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#05070c]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-4 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
        {errorMessage && (
          <p className="mb-2 text-center text-xs font-medium text-rose-400">
            {errorMessage}
          </p>
        )}

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          {/* Quick Step Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {presets.map((preset) => {
              const active = selectedAmount === preset.amount;
              return (
                <button
                  key={preset.label}
                  type="button"
                  disabled={disabled}
                  onClick={() =>
                    setSelectedOffset(
                      preset.label === "Min" ? null : preset.amount - currentPrice
                    )
                  }
                  className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all enabled:active:scale-95 ${
                    active
                      ? "border border-[#3ff2e0]/40 bg-[#3ff2e0]/15 text-[#3ff2e0] shadow-sm"
                      : "bg-white/[0.04] text-zinc-300 ring-1 ring-white/[0.08] enabled:hover:bg-white/[0.08] enabled:hover:text-white"
                  } disabled:pointer-events-none disabled:opacity-40`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Primary Pill CTA */}
          <button
            type="button"
            disabled={disabled}
            onClick={handleSubmit}
            className="flex h-12 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e4fffb] px-7 text-sm font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_24px_rgba(63,242,224,0.2)] transition-all enabled:hover:bg-white enabled:hover:shadow-[0_0_30px_rgba(63,242,224,0.3)] enabled:active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:min-w-[230px]"
          >
            {ended ? (
              <span>Auction Finished</span>
            ) : (
              <>
                <span>Place Bid</span>
                <span className="font-mono tabular-nums">
                  · {formatCurrency(selectedAmount, currency)}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
