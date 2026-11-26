"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  ArrowRight,
  Building2,
  Calendar as CalendarIcon,
  Gavel,
  Globe,
  Lock,
} from "lucide-react";
import type { DbConnection } from "@/module_bindings";
import { createSpacetimeConnection } from "@/lib/spacetime";
import { formatCurrency } from "@/lib/format";
import { GlowCard, GlowLiveBadge } from "@/components/ui/glow-bento-card";
import { ArcBidsLogo } from "@/components/ArcBidsLogo";
import FooterSection from "@/components/FooterSection";

interface OrgInfo {
  id: bigint;
  name: string;
  slug: string;
}

interface OrgRoom {
  id: bigint;
  orgId: bigint;
  title: string;
  status: string;
  currency: "USD" | "EUR";
  scheduledAtMs: number | null;
  isPublic: boolean;
  roomCode: string;
}

export function OrganizationPublicClient({ slug }: { slug: string }) {
  const normalizedSlug = slug.toLowerCase();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [orgs, setOrgs] = useState<OrgInfo[]>([]);
  const [rooms, setRooms] = useState<OrgRoom[]>([]);
  const [lotCounts, setLotCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let isCancelled = false;

    const syncTables = (conn: DbConnection) => {
      if (isCancelled) return;
      setOrgs(
        Array.from(conn.db.organization.iter()).map((o) => ({
          id: o.id,
          name: o.name,
          slug: o.slug.toLowerCase(),
        }))
      );
      setRooms(
        Array.from(conn.db.auction.iter()).map((r) => ({
          id: r.id,
          orgId: r.orgId,
          title: r.title,
          status: r.status.tag,
          currency: r.currency?.toUpperCase() === "EUR" ? "EUR" : "USD",
          scheduledAtMs: r.scheduledAt ? Number(r.scheduledAt.toMillis()) : null,
          isPublic: r.isPublic,
          roomCode: r.roomCode || r.id.toString(),
        }))
      );
      const counts: Record<string, number> = {};
      for (const item of conn.db.auctionItem.iter()) {
        const key = item.roomId.toString();
        counts[key] = (counts[key] ?? 0) + 1;
      }
      setLotCounts(counts);
    };

    const conn = createSpacetimeConnection({
      onConnect: (connectedConn) => {
        if (isCancelled) return;
        connectedConn
          .subscriptionBuilder()
          .onApplied(() => {
            if (isCancelled) return;
            syncTables(connectedConn);
            setHasLoaded(true);
          })
          .subscribe([
            "SELECT * FROM organization",
            "SELECT * FROM auction",
            "SELECT * FROM auction_item",
          ]);

        connectedConn.db.organization.onInsert(() => syncTables(connectedConn));
        connectedConn.db.organization.onUpdate(() => syncTables(connectedConn));
        connectedConn.db.auction.onInsert(() => syncTables(connectedConn));
        connectedConn.db.auction.onUpdate(() => syncTables(connectedConn));
        connectedConn.db.auction.onDelete(() => syncTables(connectedConn));
        connectedConn.db.auctionItem.onInsert(() => syncTables(connectedConn));
        connectedConn.db.auctionItem.onDelete(() => syncTables(connectedConn));
      },
      onDisconnect: () => {
        if (!isCancelled) setHasLoaded(true);
      },
      onError: () => {
        if (!isCancelled) setHasLoaded(true);
      },
    });

    return () => {
      isCancelled = true;
      conn.disconnect();
    };
  }, []);

  const org = useMemo(
    () => orgs.find((o) => o.slug === normalizedSlug) ?? null,
    [orgs, normalizedSlug]
  );

  const orgRooms = useMemo(() => {
    if (!org) return [];
    const statusOrder: Record<string, number> = {
      Live: 0,
      Lobby: 1,
      Draft: 2,
      Ended: 3,
    };
    return rooms
      .filter((r) => r.orgId === org.id)
      .sort(
        (a, b) =>
          (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9) ||
          Number(b.id - a.id)
      );
  }, [org, rooms]);

  if (!hasLoaded) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#05070c] text-zinc-100">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        <p className="mt-4 text-xs font-medium text-zinc-400">
          Loading organization…
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#05070c] text-zinc-100">
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#05070c]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <ArcBidsLogo size="sm" />
            <span className="text-sm font-bold tracking-tight text-white">
              ArcBids
            </span>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            Seller Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        {!org ? (
          <div className="mx-auto max-w-md rounded-3xl border border-white/[0.08] bg-[#090d14] p-8 text-center">
            <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-400">
              <Building2 className="h-5 w-5" />
            </div>
            <h1 className="mt-4 text-xl font-bold tracking-tight text-white">
              Organization not found
            </h1>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              We couldn&apos;t find an organization at{" "}
              <span className="font-mono text-zinc-200">/{normalizedSlug}</span>.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[#e4fffb] px-5 text-xs font-semibold text-[#04070b] transition hover:bg-white"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/[0.08] bg-[#090d14] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 text-[#3ff2e0]">
                    <Building2 className="h-6 w-6" />
                  </span>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                      {org.name}
                    </h1>
                    <p className="mt-0.5 font-mono text-xs text-zinc-400">
                      arcbids.com/{org.slug}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-zinc-300">
                  {orgRooms.length}{" "}
                  {orgRooms.length === 1 ? "auction" : "auctions"}
                </span>
              </div>
            </div>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Gavel className="h-4 w-4 text-[#3ff2e0]" />
                <h2 className="text-sm font-semibold text-white">Auctions</h2>
              </div>

              {orgRooms.length === 0 ? (
                <GlowCard accent="teal">
                  <p className="py-8 text-center text-xs text-zinc-400">
                    No active or upcoming auctions have been published yet.
                  </p>
                </GlowCard>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {orgRooms.map((r) => {
                    const lots = lotCounts[r.id.toString()] ?? 0;
                    return (
                      <div
                        key={r.id.toString()}
                        className="flex flex-col justify-between gap-4 rounded-3xl border border-white/[0.08] bg-[#090d14] p-5 transition hover:border-white/15"
                      >
                        <div className="space-y-2.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-semibold text-white">
                              {r.title}
                            </h3>
                            {r.status === "Live" ? (
                              <GlowLiveBadge label="Live" />
                            ) : (
                              <span
                                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                                  r.status === "Lobby" || r.status === "Draft"
                                    ? "border-indigo-400/25 bg-indigo-400/10 text-indigo-300"
                                    : "border-white/10 bg-white/[0.04] text-zinc-400"
                                }`}
                              >
                                {r.status === "Lobby" || r.status === "Draft"
                                  ? "Preview"
                                  : r.status}
                              </span>
                            )}
                            <span
                              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                                r.isPublic
                                  ? "border-sky-400/25 bg-sky-400/10 text-sky-300"
                                  : "border-amber-400/25 bg-amber-400/10 text-amber-300"
                              }`}
                            >
                              {r.isPublic ? (
                                <>
                                  <Globe className="h-2.5 w-2.5" />
                                  Public
                                </>
                              ) : (
                                <>
                                  <Lock className="h-2.5 w-2.5" />
                                  Invite Only
                                </>
                              )}
                            </span>
                          </div>

                          <p className="font-mono text-xs text-zinc-400">
                            {lots} {lots === 1 ? "lot" : "lots"} · {r.currency}
                          </p>

                          {r.scheduledAtMs &&
                            (r.status === "Lobby" || r.status === "Draft") && (
                            <p className="inline-flex items-center gap-1.5 text-[11px] text-[#3ff2e0]">
                              <CalendarIcon className="h-3 w-3" />
                              Starts{" "}
                              {format(
                                new Date(r.scheduledAtMs),
                                "EEE, MMM d · HH:mm"
                              )}
                            </p>
                          )}
                        </div>

                        <Link
                          href={`/auction/${encodeURIComponent(r.roomCode)}`}
                          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#e4fffb] px-4 text-xs font-semibold text-[#04070b] transition hover:bg-white"
                        >
                          {r.status === "Live" ? "Join Live Auction" : "Open Room"}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  );
}
