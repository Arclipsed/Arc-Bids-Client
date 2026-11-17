"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Calculator, Percent, TrendingUp } from "lucide-react";

export interface CalculatorCopy {
  currencyLabel: string;
  inputsTitle: string;
  unitsLabel: string;
  avgUnitSaleLabel: string;
  lotCostLabel: string;
  logisticsCostLabel: string;
  marketplaceFeeLabel: string;
  resultsTitle: string;
  expectedRevenueLabel: string;
  netProfitArcBidsLabel: string;
  netProfitMarketplaceLabel: string;
  commissionSavedLabel: string;
  suggestedStartLabel: string;
  suggestedIncrementLabel: string;
  suggestedIncrementHint: string;
  ctaLabel: string;
}

function roundNiceStep(value: number): number {
  if (value <= 500) return 10;
  if (value <= 2500) return 25;
  if (value <= 10000) return 50;
  if (value <= 25000) return 100;
  return 250;
}

export function WholesaleCalculator({ copy }: { copy: CalculatorCopy }) {
  const [currency, setCurrency] = useState<"EUR" | "USD" | "GBP">("EUR");
  const [units, setUnits] = useState<number>(40);
  const [avgUnitSale, setAvgUnitSale] = useState<number>(145);
  const [lotCost, setLotCost] = useState<number>(3800);
  const [logisticsCost, setLogisticsCost] = useState<number>(150);
  const [marketplaceFeePct, setMarketplaceFeePct] = useState<number>(12);

  const metrics = useMemo(() => {
    const safeUnits = Math.max(1, units || 0);
    const safeUnitPrice = Math.max(0, avgUnitSale || 0);
    const safeCost = Math.max(0, lotCost || 0);
    const safeLogistics = Math.max(0, logisticsCost || 0);
    const safeFee = Math.min(40, Math.max(0, marketplaceFeePct || 0));

    const expectedRevenue = safeUnits * safeUnitPrice;
    const totalCost = safeCost + safeLogistics;
    const netArcBids = expectedRevenue - totalCost;
    const marketplaceFee = expectedRevenue * (safeFee / 100);
    const netMarketplace = netArcBids - marketplaceFee;
    const marginPct =
      expectedRevenue > 0 ? (netArcBids / expectedRevenue) * 100 : 0;

    // Suggest starting bid slightly above break-even or ~75% of expected hammer
    const suggestedStart = Math.max(
      Math.round(totalCost / 10) * 10,
      Math.round((expectedRevenue * 0.72) / 10) * 10
    );
    const suggestedIncrement = roundNiceStep(expectedRevenue);

    return {
      expectedRevenue,
      netArcBids,
      netMarketplace,
      marketplaceFee,
      marginPct,
      suggestedStart,
      suggestedIncrement,
    };
  }, [units, avgUnitSale, lotCost, logisticsCost, marketplaceFeePct]);

  const fmt = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Inputs */}
      <div className="rounded-3xl border border-white/[0.08] bg-[#090d14] p-6 sm:p-7 lg:col-span-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Calculator className="h-4 w-4 text-[#3ff2e0]" />
            <span>{copy.inputsTitle}</span>
          </div>

          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-xs">
            {(["EUR", "USD", "GBP"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`cursor-pointer rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold transition ${
                  currency === c
                    ? "bg-[#3ff2e0] text-[#04070b]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-zinc-400">
                {copy.unitsLabel}
              </span>
              <input
                type="number"
                min={1}
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#05070c] px-3.5 py-2.5 font-mono text-sm text-white outline-none transition focus:border-[#3ff2e0]/60"
              />
            </label>

            <label className="block">
              <span className="text-xs font-medium text-zinc-400">
                {copy.avgUnitSaleLabel} ({currency})
              </span>
              <input
                type="number"
                min={0}
                value={avgUnitSale}
                onChange={(e) => setAvgUnitSale(Number(e.target.value))}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#05070c] px-3.5 py-2.5 font-mono text-sm text-white outline-none transition focus:border-[#3ff2e0]/60"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-zinc-400">
                {copy.lotCostLabel} ({currency})
              </span>
              <input
                type="number"
                min={0}
                value={lotCost}
                onChange={(e) => setLotCost(Number(e.target.value))}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#05070c] px-3.5 py-2.5 font-mono text-sm text-white outline-none transition focus:border-[#3ff2e0]/60"
              />
            </label>

            <label className="block">
              <span className="text-xs font-medium text-zinc-400">
                {copy.logisticsCostLabel} ({currency})
              </span>
              <input
                type="number"
                min={0}
                value={logisticsCost}
                onChange={(e) => setLogisticsCost(Number(e.target.value))}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#05070c] px-3.5 py-2.5 font-mono text-sm text-white outline-none transition focus:border-[#3ff2e0]/60"
              />
            </label>
          </div>

          <label className="block">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-400">
              <span>{copy.marketplaceFeeLabel}</span>
              <span className="font-mono text-[#3ff2e0]">
                {marketplaceFeePct}%
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={25}
              step={1}
              value={marketplaceFeePct}
              onChange={(e) => setMarketplaceFeePct(Number(e.target.value))}
              className="mt-2 w-full accent-[#3ff2e0]"
            />
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col justify-between rounded-3xl border border-[#3ff2e0]/20 bg-gradient-to-br from-[#0b141a] to-[#090d14] p-6 sm:p-7 lg:col-span-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <TrendingUp className="h-4 w-4 text-[#3ff2e0]" />
            <span>{copy.resultsTitle}</span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.07] bg-[#05070c]/80 p-4">
              <p className="text-[11px] uppercase tracking-wider text-zinc-400">
                {copy.expectedRevenueLabel}
              </p>
              <p className="mt-1 font-mono text-2xl font-bold text-white">
                {fmt(metrics.expectedRevenue)}
              </p>
            </div>

            <div className="rounded-2xl border border-[#3ff2e0]/30 bg-[#3ff2e0]/10 p-4">
              <p className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#3ff2e0]">
                <Percent className="h-3 w-3" />
                {copy.commissionSavedLabel}
              </p>
              <p className="mt-1 font-mono text-2xl font-bold text-[#e4fffb]">
                {fmt(metrics.marketplaceFee)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#05070c]/80 p-4">
              <p className="text-[11px] uppercase tracking-wider text-zinc-400">
                {copy.netProfitArcBidsLabel}
              </p>
              <p
                className={`mt-1 font-mono text-xl font-bold ${
                  metrics.netArcBids >= 0 ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {fmt(metrics.netArcBids)}{" "}
                <span className="text-xs font-normal text-zinc-400">
                  ({metrics.marginPct.toFixed(1)}%)
                </span>
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#05070c]/80 p-4">
              <p className="text-[11px] uppercase tracking-wider text-zinc-400">
                {copy.netProfitMarketplaceLabel}
              </p>
              <p className="mt-1 font-mono text-xl font-bold text-zinc-300">
                {fmt(metrics.netMarketplace)}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/[0.07] bg-[#05070c]/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-zinc-400">{copy.suggestedStartLabel}</span>
              <span className="font-mono font-semibold text-white">
                {fmt(metrics.suggestedStart)}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-zinc-400">
                {copy.suggestedIncrementLabel}
              </span>
              <span className="font-mono font-semibold text-[#3ff2e0]">
                +{fmt(metrics.suggestedIncrement)}
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
              {copy.suggestedIncrementHint}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/dashboard"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e4fffb] px-5 py-3 text-xs font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 transition hover:bg-white"
          >
            {copy.ctaLabel}
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
