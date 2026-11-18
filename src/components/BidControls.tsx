"use client";

import { useState } from "react";
import { Timer, X, Zap } from "lucide-react";
import { formatCountdown, formatCurrency } from "@/lib/format";

interface BidControlsProps {
  minNextBid: bigint;
  minIncrement: bigint;
  currentPrice: bigint;
  hasBids: boolean;
  currency?: "USD" | "EUR";
  ended?: boolean;
  endsAtMs?: number | null;
  nowMs?: number;
  allowAutoBid?: boolean;
  myAutoBidMax?: bigint | null;
  disabled: boolean;
  errorMessage?: string | null;
  onPlaceBid: (amount: bigint) => void;
  onSetAutoBid?: (maxAmount: bigint) => void;
  onCancelAutoBid?: () => void;
}

export function BidControls({
  minNextBid,
  minIncrement,
  currentPrice,
  hasBids,
  currency = "USD",
  ended = false,
  endsAtMs = null,
  nowMs = 0,
  allowAutoBid = false,
  myAutoBidMax = null,
  disabled,
  errorMessage,
  onPlaceBid,
  onSetAutoBid,
  onCancelAutoBid,
}: BidControlsProps) {
  const stepAmount = minIncrement > BigInt(0) ? minIncrement : BigInt(100);
  const [selectedOffset, setSelectedOffset] = useState<bigint | null>(null);
  const [autoBidOpen, setAutoBidOpen] = useState(false);
  const [maxBidInput, setMaxBidInput] = useState("");

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

  const openAutoBid = () => {
    const defaultVal =
      myAutoBidMax && myAutoBidMax > BigInt(0)
        ? Math.round(Number(myAutoBidMax) / 100)
        : Math.round(Number(minNextBid + stepAmount * BigInt(2)) / 100);
    setMaxBidInput(String(defaultVal));
    setAutoBidOpen((v) => !v);
  };

  const handleAutoBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !onSetAutoBid) return;
    const dollars = Number(maxBidInput);
    if (!Number.isFinite(dollars) || dollars <= 0) return;
    const cents = BigInt(Math.round(dollars * 100));
    onSetAutoBid(cents);
    setAutoBidOpen(false);
  };

  const remainingMs = endsAtMs !== null ? Math.max(0, endsAtMs - nowMs) : 0;
  const isUrgent = endsAtMs !== null && remainingMs > 0 && remainingMs <= 10_000;
  const isExpired = endsAtMs !== null && remainingMs === 0;
  const currencySymbol = currency === "EUR" ? "€" : "$";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#05070c]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-4 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
        {errorMessage && (
          <p className="mb-2 text-center text-xs font-medium text-rose-400">
            {errorMessage}
          </p>
        )}

        {autoBidOpen && allowAutoBid && !ended && (
          <form
            onSubmit={handleAutoBidSubmit}
            className="mb-3 flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-[#3ff2e0]/25 bg-[#0e1420]/95 p-3 shadow-xl"
          >
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <Zap className="h-3.5 w-3.5 text-[#3ff2e0]" />
                Auto-Bid Max ({currencySymbol})
              </p>
              <p className="text-[11px] text-zinc-400">
                Server automatically bids in {formatCurrency(stepAmount, currency)} steps up to your secret max.
              </p>
            </div>
            <div className="flex flex-1 items-center justify-end gap-2 sm:flex-initial">
              <input
                type="number"
                min={1}
                step="1"
                required
                value={maxBidInput}
                onChange={(e) => setMaxBidInput(e.target.value)}
                className="h-9 w-28 rounded-xl border border-white/15 bg-[#05070c] px-3 font-mono text-xs font-semibold text-white outline-none focus:border-[#3ff2e0]"
              />
              <button
                type="submit"
                disabled={disabled}
                className="h-9 cursor-pointer rounded-full bg-[#3ff2e0] px-4 text-xs font-semibold text-[#04070b] transition hover:bg-[#e4fffb] disabled:opacity-40"
              >
                Set Max
              </button>
              {myAutoBidMax !== null && myAutoBidMax > BigInt(0) && onCancelAutoBid && (
                <button
                  type="button"
                  onClick={() => {
                    onCancelAutoBid();
                    setAutoBidOpen(false);
                  }}
                  className="h-9 cursor-pointer rounded-full border border-rose-400/30 bg-rose-500/10 px-3 text-xs font-medium text-rose-300 transition hover:bg-rose-500/20"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={() => setAutoBidOpen(false)}
                aria-label="Close auto-bid"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
          {/* Sticky Current Bid + Timer */}
          <div className="flex items-center justify-between gap-3 lg:justify-start">
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                {hasBids ? "Current Bid" : "Starting Price"}
              </p>
              <p className="font-mono text-lg font-bold tracking-tight text-[#e4fffb] tabular-nums">
                {formatCurrency(currentPrice, currency)}
              </p>
            </div>

            {endsAtMs !== null && (
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-xs font-semibold tabular-nums ${
                  isUrgent
                    ? "border-rose-400/40 bg-rose-600/90 text-white"
                    : isExpired
                      ? "border-white/10 bg-white/[0.04] text-zinc-400"
                      : "border-[#3ff2e0]/25 bg-[#3ff2e0]/10 text-[#3ff2e0]"
                }`}
              >
                <Timer className="h-3 w-3" />
                {isExpired ? "ENDED" : formatCountdown(remainingMs)}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 lg:justify-end">
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

            <div className="flex items-center gap-2">
              {allowAutoBid && !ended && onSetAutoBid && (
                <button
                  type="button"
                  disabled={disabled}
                  onClick={openAutoBid}
                  className={`inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full border px-4 text-xs font-semibold transition enabled:active:scale-95 disabled:pointer-events-none disabled:opacity-40 ${
                    myAutoBidMax !== null && myAutoBidMax > BigInt(0)
                      ? "border-[#3ff2e0]/50 bg-[#3ff2e0]/15 text-[#3ff2e0]"
                      : "border-white/15 bg-white/[0.04] text-zinc-200 hover:border-white/25 hover:bg-white/[0.08]"
                  }`}
                >
                  <Zap className="h-3.5 w-3.5" />
                  {myAutoBidMax !== null && myAutoBidMax > BigInt(0)
                    ? `Auto · ${formatCurrency(myAutoBidMax, currency)}`
                    : "Auto-Bid"}
                </button>
              )}

              {/* Primary Pill CTA */}
              <button
                type="button"
                disabled={disabled}
                onClick={handleSubmit}
                className="flex h-11 flex-1 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e4fffb] px-6 text-sm font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_24px_rgba(63,242,224,0.2)] transition-all enabled:hover:bg-white enabled:hover:shadow-[0_0_30px_rgba(63,242,224,0.3)] enabled:active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 sm:flex-initial sm:min-w-[190px]"
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
      </div>
    </div>
  );
}
