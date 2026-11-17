"use client";

import type { UiItem } from "@/lib/auction-types";
import { formatCurrency } from "@/lib/format";

interface UpcomingQueueProps {
  items: UiItem[];
}

export function UpcomingQueue({ items }: UpcomingQueueProps) {
  if (items.length === 0) return null;

  return (
    <section className="rounded-3xl border border-white/[0.08] bg-[#090d14] p-5 shadow-2xl shadow-black/60">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Up Next</h3>
        <span className="font-mono text-xs font-medium text-zinc-400">
          {items.length} {items.length === 1 ? "lot" : "lots"}
        </span>
      </div>

      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item.id.toString()}
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.05] bg-[#0e1420]/60 px-3.5 py-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.08] font-mono text-xs font-semibold text-zinc-300">
                {item.orderIndex + 1}
              </span>
              <p className="truncate text-sm font-medium text-zinc-100">
                {item.title}
              </p>
            </div>
            <span className="shrink-0 font-mono text-xs font-semibold text-[#3ff2e0] tabular-nums">
              {formatCurrency(item.startingPrice)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
