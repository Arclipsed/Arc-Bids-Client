"use client";

import type { UiItem } from "@/lib/auction-types";
import { formatCurrency } from "@/lib/format";

interface UpcomingQueueProps {
  items: UiItem[];
  title?: string;
  currency?: "EUR" | "USD";
  selectedItemId?: bigint | null;
  onSelectItem?: (itemId: bigint) => void;
  showStatus?: boolean;
}

export function UpcomingQueue({
  items,
  title = "Up Next",
  currency = "USD",
  selectedItemId,
  onSelectItem,
  showStatus = false,
}: UpcomingQueueProps) {
  if (items.length === 0) return null;

  return (
    <section className="rounded-3xl border border-white/[0.08] bg-[#090d14] p-5 shadow-2xl shadow-black/60">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className="font-mono text-xs font-medium text-zinc-400">
          {items.length} {items.length === 1 ? "lot" : "lots"}
        </span>
      </div>

      <ul className="space-y-2">
        {items.map((item) => {
          const isSelected = selectedItemId === item.id;
          const isSold = item.status === "Sold";
          const isUnsold = item.status === "Unsold";
          const displayPrice =
            isSold && item.currentBid > BigInt(0)
              ? item.currentBid
              : item.startingPrice;

          const content = (
            <>
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                    isSelected
                      ? "bg-[#3ff2e0]/20 text-[#3ff2e0]"
                      : "bg-white/[0.08] text-zinc-300"
                  }`}
                >
                  {item.orderIndex + 1}
                </span>
                <p className="truncate text-sm font-medium text-zinc-100">
                  {item.title}
                </p>
                {showStatus && isSold && (
                  <span className="shrink-0 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
                    Sold
                  </span>
                )}
                {showStatus && isUnsold && (
                  <span className="shrink-0 rounded-full border border-rose-400/25 bg-rose-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-rose-300">
                    Unsold
                  </span>
                )}
              </div>
              <span className="shrink-0 font-mono text-xs font-semibold text-[#3ff2e0] tabular-nums">
                {formatCurrency(displayPrice, currency)}
              </span>
            </>
          );

          return (
            <li key={item.id.toString()}>
              {onSelectItem ? (
                <button
                  type="button"
                  onClick={() => onSelectItem(item.id)}
                  className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border px-3.5 py-2.5 text-left transition ${
                    isSelected
                      ? "border-[#3ff2e0]/45 bg-[#0b181c]/90 shadow-[0_0_16px_rgba(63,242,224,0.12)]"
                      : "border-white/[0.05] bg-[#0e1420]/60 hover:border-white/15 hover:bg-[#121a28]"
                  }`}
                >
                  {content}
                </button>
              ) : (
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.05] bg-[#0e1420]/60 px-3.5 py-2.5">
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
