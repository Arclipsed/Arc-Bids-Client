"use client";

import { useState } from "react";
import {
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ShieldCheck,
  Timer,
} from "lucide-react";
import type { UiItem } from "@/lib/auction-types";
import { formatCountdown, formatCurrency } from "@/lib/format";
import {
  getCarHighlights,
  getCarSpecRows,
  normalizeCategory,
  parseLotMetadata,
} from "@/lib/lot-categories";
import { NumberTicker } from "@/components/ui/number-ticker";

interface ActiveLotCardProps {
  item: UiItem;
  lotDurationSec: number;
  minIncrement: bigint;
  nowMs: number;
  bidCount: number;
}

export function ActiveLotCard({
  item,
  lotDurationSec,
  minIncrement,
  nowMs,
  bidCount,
}: ActiveLotCardProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const category = normalizeCategory(item.category);
  const carMeta = parseLotMetadata(item.category, item.metadataJson);
  const carHighlights = carMeta ? getCarHighlights(carMeta) : [];
  const carSpecRows = carMeta ? getCarSpecRows(carMeta) : [];
  const hasExpandableDetails = Boolean(item.description?.trim()) || carSpecRows.length > 0;

  const remainingMs = item.endsAtMs !== null ? Math.max(0, item.endsAtMs - nowMs) : 0;
  const totalMs = Math.max(1, lotDurationSec * 1000);
  const progressPct =
    item.endsAtMs !== null ? Math.min(100, Math.max(0, (remainingMs / totalMs) * 100)) : 0;
  const isUrgent = item.endsAtMs !== null && remainingMs > 0 && remainingMs <= 10_000;
  const isExpired = item.endsAtMs !== null && remainingMs === 0;
  const validImages = item.images.map((u) => u.trim()).filter(Boolean);
  const hasImage = validImages.length > 0;
  const safeIndex = hasImage
    ? ((activeImg % validImages.length) + validImages.length) % validImages.length
    : 0;
  const currentImgUrl = hasImage ? validImages[safeIndex] : null;
  const currentBidDollars = Number(item.currentBid) / 100;
  const bidDecimalPlaces = currentBidDollars % 1 === 0 ? 0 : 2;
  const hasBids = item.highestBidderId !== null;
  const nextMinBid = hasBids ? item.currentBid + minIncrement : item.startingPrice;

  return (
    <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#090d14] shadow-2xl shadow-black/60">
      {/* Media */}
      <div className="relative aspect-[16/10] w-full bg-[#0e1420]">
        {currentImgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentImgUrl}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-zinc-500">
            <span className="text-xs font-medium uppercase tracking-wider">
              Lot #{item.orderIndex + 1}
            </span>
            <span className="text-sm font-medium text-zinc-400">Wholesale Inventory</span>
          </div>
        )}

        {/* Smooth blend into card body */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090d14] via-[#090d14]/15 to-transparent" />

        {/* Floating Lot Pill */}
        <div className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#05070c]/80 px-3 py-1 text-xs font-semibold text-[#e4fffb] shadow-sm backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3ff2e0]" />
          Lot #{item.orderIndex + 1}
        </div>

        {/* Floating Countdown Pill */}
        {item.endsAtMs !== null && (
          <div
            className={`absolute right-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-semibold tabular-nums shadow-sm backdrop-blur-md ${
              isUrgent
                ? "border-rose-400/40 bg-rose-600/90 text-white"
                : isExpired
                  ? "border-white/10 bg-[#05070c]/85 text-zinc-400"
                  : "border-[#3ff2e0]/25 bg-[#05070c]/80 text-[#3ff2e0]"
            }`}
          >
            <Timer className="h-3 w-3" />
            {isExpired ? "ENDED" : formatCountdown(remainingMs)}
          </div>
        )}

        {/* Prev / Next + Image Counter + Dots */}
        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setActiveImg(
                  (prev) => (prev - 1 + validImages.length) % validImages.length
                )
              }
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#05070c]/75 text-white shadow-lg backdrop-blur-md transition hover:border-[#3ff2e0]/40 hover:bg-[#05070c]/90 active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveImg((prev) => (prev + 1) % validImages.length)
              }
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#05070c]/75 text-white shadow-lg backdrop-blur-md transition hover:border-[#3ff2e0]/40 hover:bg-[#05070c]/90 active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-[#05070c]/75 px-3 py-1.5 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                {validImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImg(idx)}
                    aria-label={`View photo ${idx + 1}`}
                    className={`h-1.5 cursor-pointer rounded-full transition-all ${
                      idx === safeIndex
                        ? "w-4 bg-[#3ff2e0]"
                        : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] text-zinc-300 tabular-nums">
                {safeIndex + 1}/{validImages.length}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Slim Timer Bar */}
      <div className="h-1 w-full bg-white/[0.06]">
        <div
          className={`h-full transition-all duration-300 ${
            isUrgent ? "bg-rose-500" : "bg-[#3ff2e0]"
          }`}
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Details & Hero Price */}
      <div className="p-5 sm:p-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
              {item.title}
            </h2>
            {category === "Car" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#3ff2e0]">
                <Car className="h-3 w-3" />
                Vehicle
              </span>
            )}
          </div>
          {item.description && (
            <p
              className={`mt-1.5 text-sm leading-relaxed text-zinc-400 ${
                expanded ? "whitespace-pre-line" : "line-clamp-2"
              }`}
            >
              {item.description}
            </p>
          )}
        </div>

        {/* Quick Lot Specs */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-300">
            <ShieldCheck className="h-3.5 w-3.5 text-[#3ff2e0]" />
            Verified Batch
          </span>
          {(item.quantity ?? 1) > 1 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 px-3 py-1 font-mono text-[11px] font-semibold text-[#3ff2e0]">
              {item.quantity} units
            </span>
          )}
          {carHighlights.map((highlight) => (
            <span
              key={highlight}
              className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] font-medium text-zinc-200"
            >
              {highlight}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] font-medium text-zinc-300">
            Start {formatCurrency(item.startingPrice)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] font-medium text-zinc-300">
            +{formatCurrency(minIncrement)} min step
          </span>
        </div>

        {hasExpandableDetails && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-[#3ff2e0] transition hover:text-[#e4fffb]"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" />
                  Hide lot details
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" />
                  {carSpecRows.length > 0
                    ? `Expand vehicle specs (${carSpecRows.length})`
                    : "Expand full description"}
                </>
              )}
            </button>

            {expanded && carSpecRows.length > 0 && (
              <dl className="mt-3 grid grid-cols-2 gap-2.5 rounded-2xl border border-white/[0.08] bg-[#0e1420]/70 p-3.5 sm:grid-cols-3">
                {carSpecRows.map((row) => (
                  <div key={row.label} className="min-w-0">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      {row.label}
                    </dt>
                    <dd className="mt-0.5 truncate text-xs font-medium text-zinc-100">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}

        {/* Price Block */}
        <div className="mt-5 rounded-2xl border border-[#3ff2e0]/20 bg-gradient-to-b from-[#0e1722] to-[#080d14] p-4 shadow-[inset_0_1px_0_rgba(63,242,224,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-zinc-400">
                {hasBids ? "Current highest bid" : "Starting price"}
              </p>
              <p className="mt-0.5 text-3xl font-bold tracking-tight text-[#e4fffb] tabular-nums sm:text-4xl">
                $
                <NumberTicker
                  key={item.id.toString()}
                  value={currentBidDollars}
                  decimalPlaces={bidDecimalPlaces}
                  className="tracking-tight text-[#e4fffb] dark:text-[#e4fffb]"
                />
              </p>
              {(item.quantity ?? 1) > 1 && (
                <p className="mt-1 font-mono text-[11px] text-zinc-400">
                  ~{formatCurrency(item.currentBid / BigInt(item.quantity ?? 1))} / unit
                </p>
              )}
            </div>

            <div className="text-right">
              <p className="font-mono text-xs font-medium text-zinc-400">
                {bidCount} {bidCount === 1 ? "bid" : "bids"}
              </p>
              <p className="mt-1 font-mono text-xs font-medium text-zinc-400">
                Next min{" "}
                <span className="font-semibold text-[#3ff2e0]">
                  {formatCurrency(nextMinBid)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
