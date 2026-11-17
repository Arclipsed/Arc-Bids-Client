"use client";

import { useEffect, useState } from "react";
import type { UiBid, UiItem } from "@/lib/auction-types";
import { ActiveLotCard } from "@/components/ActiveLotCard";
import { BidFeed } from "@/components/BidFeed";
import { HighestBidderCard } from "@/components/HighestBidderCard";

const SAMPLE_BUYERS = [
  "Nordic Tech Supply",
  "Apex Retail Group",
  "Metro Wholesale BV",
  "EuroDistribute GmbH",
  "Vertex Electronics",
  "Krono Logistics AS",
];

const BASE_PRICE = BigInt(1800000); // $18,000
const MIN_STEP = BigInt(5000); // $50
const LOT_DURATION_MS = 45_000;

function createInitialBids(now: number): UiBid[] {
  return [
    {
      id: BigInt(3),
      itemId: BigInt(1),
      buyerName: "Nordic Tech Supply",
      amount: BigInt(1825000),
      createdAtMs: now - 4_000,
    },
    {
      id: BigInt(2),
      itemId: BigInt(1),
      buyerName: "Apex Retail Group",
      amount: BigInt(1815000),
      createdAtMs: now - 14_000,
    },
    {
      id: BigInt(1),
      itemId: BigInt(1),
      buyerName: "Metro Wholesale BV",
      amount: BigInt(1805000),
      createdAtMs: now - 28_000,
    },
  ];
}

export function LiveAuctionShowcase() {
  const [nowMs, setNowMs] = useState<number>(0);
  const [endsAtMs, setEndsAtMs] = useState<number>(LOT_DURATION_MS);
  const [bids, setBids] = useState<UiBid[]>(() => createInitialBids(0));

  // Smooth real-time countdown clock; resets cleanly when the timer reaches 0
  useEffect(() => {
    const initialNow = Date.now();
    setNowMs(initialNow);
    setEndsAtMs(initialNow + LOT_DURATION_MS);
    setBids(createInitialBids(initialNow));

    const timer = window.setInterval(() => {
      const now = Date.now();
      setNowMs(now);
      setEndsAtMs((prevEnd) => {
        if (now >= prevEnd) {
          setBids(createInitialBids(now));
          return now + LOT_DURATION_MS;
        }
        return prevEnd;
      });
    }, 250);
    return () => window.clearInterval(timer);
  }, []);

  // Simulated incoming bids every 3.5s so businesses see live updates
  useEffect(() => {
    const interval = window.setInterval(() => {
      const now = Date.now();
      setBids((prev) => {
        const latest = prev[0];
        const nextAmount = latest ? latest.amount + MIN_STEP : BASE_PRICE + MIN_STEP;
        if (prev.length >= 10) {
          setEndsAtMs(now + LOT_DURATION_MS);
          return createInitialBids(now);
        }
        const buyer = SAMPLE_BUYERS[(prev.length + 1) % SAMPLE_BUYERS.length];
        return [
          {
            id: BigInt(now),
            itemId: BigInt(1),
            buyerName: buyer,
            amount: nextAmount,
            createdAtMs: now,
          },
          ...prev,
        ];
      });
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  const topBid = bids[0];

  const previewItem: UiItem = {
    id: BigInt(1),
    orderIndex: 0,
    title: "Refurbished MacBook Air M2 (Grade A)",
    description:
      "8GB / 256GB wholesale pallet, tested & factory sealed with 90-day distributor warranty.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&auto=format&fit=crop",
    ],
    startingPrice: BASE_PRICE,
    currentBid: topBid ? topBid.amount : BASE_PRICE,
    highestBidderId: topBid ? BigInt(1) : null,
    status: "Active",
    endsAtMs,
    quantity: 40,
  };

  return (
    <section id="live-preview" className="scroll-mt-24">
      <div className="mb-8 max-w-2xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3ff2e0]">
          Live Room Experience
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          See every bid land in real time.
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
          Buyers browse lot photos, unit quantities, and per-unit pricing while
          competing live—with automatic anti-snipe timer protection.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-7">
          <ActiveLotCard
            item={previewItem}
            lotDurationSec={45}
            minIncrement={MIN_STEP}
            nowMs={nowMs}
            bidCount={bids.length}
          />
        </div>

        <div className="relative lg:col-span-5">
          <div className="flex flex-col gap-4 lg:absolute lg:inset-0">
            <HighestBidderCard topBid={topBid} />
            <BidFeed bids={bids} nowMs={nowMs} className="lg:min-h-0 lg:flex-1" />
          </div>
        </div>
      </div>
    </section>
  );
}
