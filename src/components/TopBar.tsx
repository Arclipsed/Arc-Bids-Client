"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, LayoutDashboard, Share2 } from "lucide-react";
import type { RoomStatusTag } from "@/lib/auction-types";

interface TopBarProps {
  roomTitle: string;
  status: RoomStatusTag;
  viewerCount: number;
  connectionState: "connecting" | "connected" | "error";
  isDemo: boolean;
  showDashboardLink?: boolean;
  roomCode?: string;
}

export function TopBar({
  roomTitle,
  status,
  viewerCount,
  connectionState,
  isDemo,
  showDashboardLink = false,
  roomCode,
}: TopBarProps) {
  const isLive = status === "Live";
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = roomCode
      ? `${window.location.origin}/auction/${encodeURIComponent(roomCode)}`
      : window.location.href;
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({ title: roomTitle, url });
        return;
      }
    } catch {
      // User cancelled native share or unsupported; fall back to clipboard
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard errors
    }
  };

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
          {!isDemo && roomCode && (
            <button
              type="button"
              onClick={() => void handleShare()}
              aria-label="Share auction link"
              title="Share auction link"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-200 transition hover:border-[#3ff2e0]/40 hover:bg-white/[0.08] hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#3ff2e0]" />
                  <span className="text-[#3ff2e0]">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-[#3ff2e0]" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          )}
          {showDashboardLink && (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-200 transition hover:border-[#3ff2e0]/40 hover:bg-white/[0.08] hover:text-white"
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-[#3ff2e0]" />
              Dashboard
            </Link>
          )}
          <span
            title={
              isDemo
                ? "Demo"
                : connectionState === "connected"
                  ? "Connected"
                  : connectionState === "error"
                    ? "Offline"
                    : "Connecting"
            }
            aria-label={
              isDemo
                ? "Demo"
                : connectionState === "connected"
                  ? "Connected"
                  : connectionState === "error"
                    ? "Offline"
                    : "Connecting"
            }
            className={`inline-flex items-center gap-1.5 rounded-full border text-xs font-medium ${
              !isDemo && connectionState === "connected"
                ? "border-white/[0.08] bg-white/[0.04] p-2"
                : isDemo
                  ? "border-sky-500/20 bg-sky-500/10 px-2.5 py-1 text-sky-400"
                  : connectionState === "error"
                    ? "border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-rose-400"
                    : "border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-zinc-400"
            }`}
          >
            {!isDemo && connectionState === "connected" ? (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
            ) : (
              <>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isDemo
                      ? "bg-sky-400"
                      : connectionState === "error"
                        ? "bg-rose-400"
                        : "bg-amber-400"
                  }`}
                />
                {isDemo
                  ? "Demo"
                  : connectionState === "error"
                    ? "Offline"
                    : "Connecting"}
              </>
            )}
          </span>
        </div>
      </div>
    </header>
  );
}
