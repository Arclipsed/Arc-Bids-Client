"use client";

import Link from "next/link";
import type { RoomStatusTag } from "@/lib/auction-types";

interface TopBarProps {
  roomTitle: string;
  status: RoomStatusTag;
  viewerCount: number;
  connectionState: "connecting" | "connected" | "error";
  isDemo: boolean;
}

export function TopBar({
  roomTitle,
  status,
  viewerCount,
  connectionState,
  isDemo,
}: TopBarProps) {
  const isLive = status === "Live";

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#05070c]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.02] text-sm font-bold tracking-tight text-white transition hover:border-[#3ff2e0]/40"
            title="Back to Home"
          >
            A
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-sm font-semibold tracking-tight text-white sm:text-base">
                {roomTitle}
              </h1>
              {isLive && (
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 px-2 py-0.5 text-[11px] font-semibold text-[#3ff2e0]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3ff2e0]" />
                  LIVE
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400">
              {viewerCount} {viewerCount === 1 ? "buyer" : "buyers"} in room
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
              isDemo
                ? "border-sky-500/20 bg-sky-500/10 text-sky-400"
                : connectionState === "connected"
                  ? "border-white/[0.08] bg-white/[0.04] text-zinc-200"
                  : connectionState === "error"
                    ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
                    : "border-white/[0.08] bg-white/[0.04] text-zinc-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isDemo
                  ? "bg-sky-400"
                  : connectionState === "connected"
                    ? "bg-emerald-400"
                    : connectionState === "error"
                      ? "bg-rose-400"
                      : "bg-amber-400"
              }`}
            />
            {isDemo
              ? "Demo"
              : connectionState === "connected"
                ? "Connected"
                : connectionState === "error"
                  ? "Offline"
                  : "Connecting"}
          </span>
        </div>
      </div>
    </header>
  );
}
