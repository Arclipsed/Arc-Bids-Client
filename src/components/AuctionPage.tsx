"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CalendarPlus, CheckCircle2, ChevronLeft, ChevronRight, Globe, Lock, Mail, User } from "lucide-react";
import type { DbConnection } from "@/module_bindings";
import type { UiBid, UiItem, UiRoom } from "@/lib/auction-types";
import { createReconnectingSpacetimeConnection } from "@/lib/spacetime";
import { formatCountdown, normalizeBuyerContact } from "@/lib/format";
import { TopBar } from "./TopBar";
import { ActiveLotCard } from "./ActiveLotCard";
import { BidControls } from "./BidControls";
import { BidFeed } from "./BidFeed";
import { HighestBidderCard } from "./HighestBidderCard";
import { UpcomingQueue } from "./UpcomingQueue";

export function AuctionPage({ initialRoomKey }: { initialRoomKey?: string } = {}) {
  const connRef = useRef<DbConnection | null>(null);
  const [connectionState, setConnectionState] = useState<"connecting" | "connected" | "error">(
    "connecting"
  );
  const [hasLoaded, setHasLoaded] = useState(false);
  const [notFoundReady, setNotFoundReady] = useState(false);
  const [nowMs, setNowMs] = useState<number>(0);
  const [selectedRoomKey, setSelectedRoomKey] = useState<string | null>(() => {
    if (initialRoomKey?.trim()) return initialRoomKey.trim();
    if (typeof window === "undefined") return null;
    const roomParam = new URLSearchParams(window.location.search).get("room")?.trim();
    return roomParam || null;
  });
  const [magicToken, setMagicToken] = useState<string>("");
  const [buyerName, setBuyerName] = useState<string>("");
  const [inviteNameInput, setInviteNameInput] = useState<string>("");
  const [inviteEmailInput, setInviteEmailInput] = useState<string>("");
  const [inviteGateError, setInviteGateError] = useState<string | null>(null);
  const [bidError, setBidError] = useState<string | null>(null);

  // Live SpacetimeDB state
  const [liveRooms, setLiveRooms] = useState<UiRoom[]>([]);
  const [liveItems, setLiveItems] = useState<UiItem[]>([]);
  const [liveBids, setLiveBids] = useState<UiBid[]>([]);
  const [approvedBuyers, setApprovedBuyers] = useState<
    Array<{ orgId: bigint; magicToken: string; isBanned: boolean }>
  >([]);
  const [buyerListMembers, setBuyerListMembers] = useState<
    Array<{ orgId: bigint; listId: bigint; email: string; isBanned: boolean }>
  >([]);
  const [myAutoBids, setMyAutoBids] = useState<
    Array<{ itemId: bigint; maxAmount: bigint }>
  >([]);
  const [orgs, setOrgs] = useState<Array<{ id: bigint; ownerHex: string; name: string }>>([]);
  const [roomPresences, setRoomPresences] = useState<
    Array<{ identityHex: string; roomId: bigint; email: string }>
  >([]);
  const [myIdentityHex, setMyIdentityHex] = useState<string | null>(null);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const isLoggedIn = Boolean(sessionEmail);
  const [liveViewers, setLiveViewers] = useState<number>(0);
  const [inspectedItemId, setInspectedItemId] = useState<bigint | null>(null);
  const joinedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    setNowMs(Date.now());
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get("room")?.trim();
    if (roomParam) {
      setSelectedRoomKey(roomParam);
    }
    const tokenFromUrl = params.get("token")?.trim() ?? "";
    window.localStorage.removeItem("arcbid_buyer_token");
    window.localStorage.removeItem("arcbid_buyer_name");
    const saved = window.sessionStorage.getItem("arcbid_buyer_token")?.trim() ?? "";
    const savedName = window.sessionStorage.getItem("arcbid_buyer_name")?.trim() ?? "";
    const resolved = tokenFromUrl || saved;
    if (resolved) {
      setMagicToken(resolved);
      setInviteEmailInput(resolved);
      if (tokenFromUrl) {
        window.sessionStorage.setItem("arcbid_buyer_token", tokenFromUrl);
      }
    }
    if (savedName) {
      setBuyerName(savedName);
      setInviteNameInput(savedName);
    }

    let active = true;
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data: { email?: string | null }) => {
        if (active && data.email) {
          setSessionEmail(data.email.trim().toLowerCase());
        }
      })
      .catch(() => {
        // Ignore auth check failures for public spectators
      });

    const interval = window.setInterval(() => setNowMs(Date.now()), 250);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const syncTables = (conn: DbConnection) => {
      if (isCancelled) return;
      const rooms: UiRoom[] = Array.from(conn.db.auction.iter()).map((r) => ({
        id: r.id,
        orgId: r.orgId,
        title: r.title,
        status: r.status.tag,
        activeItemId: r.activeItemId ?? null,
        minBidIncrement: r.minBidIncrement,
        lotDurationSec: r.lotDurationSec,
        currency: r.currency?.toUpperCase() === "EUR" ? "EUR" : "USD",
        scheduledAtMs: r.scheduledAt ? Number(r.scheduledAt.toMillis()) : null,
        isPublic: r.isPublic,
        roomCode: r.roomCode || "",
        allowedListIds: r.allowedListIds ?? [],
        allowAutoBid: r.allowAutoBid ?? true,
      }));

      const items: UiItem[] = Array.from(conn.db.auctionItem.iter()).map((i) => ({
        id: i.id,
        orderIndex: i.orderIndex,
        title: i.title,
        description: i.description,
        images: i.images,
        startingPrice: i.startingPrice,
        currentBid: i.currentBid,
        highestBidderId: i.highestBidderId ?? null,
        status: i.status.tag,
        endsAtMs: i.endsAt ? Number(i.endsAt.toMillis()) : null,
        quantity: i.quantity ?? 1,
        category: i.category || "General",
        metadataJson: i.metadataJson || "",
      }));

      const bids: UiBid[] = Array.from(conn.db.auctionItemBid.iter()).map((b) => ({
        id: b.id,
        itemId: b.itemId,
        buyerName: b.buyerName,
        amount: b.amount,
        createdAtMs: Number(b.createdAt.toMillis()),
      }));

      const presences = Array.from(conn.db.auctionPresence.iter()).map((p) => ({
        identityHex: p.identity.toHexString(),
        roomId: p.roomId,
        email: (p.email ?? "").toLowerCase(),
      }));
      const viewers = presences.length;

      const buyers = Array.from(conn.db.organizationWhitelist.iter()).map((b) => ({
        orgId: b.orgId,
        magicToken: b.magicToken.toLowerCase(),
        isBanned: b.isBanned,
      }));

      const listMembers = Array.from(conn.db.buyerListMember.iter()).map((m) => ({
        orgId: m.orgId,
        listId: m.listId,
        email: m.email.toLowerCase(),
        isBanned: m.isBanned,
      }));

      const orgRows = Array.from(conn.db.organization.iter()).map((o) => ({
        id: o.id,
        ownerHex: o.ownerIdentity.toHexString(),
        name: o.name,
      }));

      const autoBids = Array.from(conn.db.myAutoBids.iter()).map((a) => ({
        itemId: a.itemId,
        maxAmount: a.maxAmount,
      }));

      setLiveRooms(rooms);
      setLiveItems(items);
      setLiveBids(bids);
      setApprovedBuyers(buyers);
      setBuyerListMembers(listMembers);
      setMyAutoBids(autoBids);
      setOrgs(orgRows);
      setRoomPresences(presences);
      setLiveViewers(viewers);
    };

    const client = createReconnectingSpacetimeConnection({
      onReconnecting: () => {
        if (!isCancelled) setConnectionState("connecting");
      },
      onConnect: (connectedConn, _token, identity) => {
        if (isCancelled) return;
        connRef.current = connectedConn;
        joinedKeyRef.current = null;
        setMyIdentityHex(identity.toHexString());
        setConnectionState("connected");
        connectedConn
          .subscriptionBuilder()
          .onApplied(() => {
            if (isCancelled) return;
            syncTables(connectedConn);
            setHasLoaded(true);
          })
          .subscribe([
            "SELECT * FROM auction",
            "SELECT * FROM auction_item",
            "SELECT * FROM auction_item_bid",
            "SELECT * FROM auction_presence",
            "SELECT * FROM organization_whitelist",
            "SELECT * FROM buyer_list_member",
            "SELECT * FROM organization",
            "SELECT * FROM my_auto_bids",
          ]);

        connectedConn.db.organization.onInsert(() => syncTables(connectedConn));
        connectedConn.db.organization.onUpdate(() => syncTables(connectedConn));

        connectedConn.db.auction.onInsert(() => syncTables(connectedConn));
        connectedConn.db.auction.onUpdate(() => syncTables(connectedConn));
        connectedConn.db.auctionItem.onInsert(() => syncTables(connectedConn));
        connectedConn.db.auctionItem.onUpdate(() => syncTables(connectedConn));
        connectedConn.db.auctionItemBid.onInsert(() => syncTables(connectedConn));
        connectedConn.db.auctionItemBid.onDelete(() => syncTables(connectedConn));
        connectedConn.db.auctionPresence.onInsert(() => syncTables(connectedConn));
        connectedConn.db.auctionPresence.onDelete(() => syncTables(connectedConn));
        connectedConn.db.organizationWhitelist.onInsert(() => syncTables(connectedConn));
        connectedConn.db.organizationWhitelist.onUpdate(() => syncTables(connectedConn));
        connectedConn.db.organizationWhitelist.onDelete(() => syncTables(connectedConn));
        connectedConn.db.buyerListMember.onInsert(() => syncTables(connectedConn));
        connectedConn.db.buyerListMember.onUpdate(() => syncTables(connectedConn));
        connectedConn.db.buyerListMember.onDelete(() => syncTables(connectedConn));
        connectedConn.db.myAutoBids.onInsert(() => syncTables(connectedConn));
        connectedConn.db.myAutoBids.onUpdate(() => syncTables(connectedConn));
        connectedConn.db.myAutoBids.onDelete(() => syncTables(connectedConn));
      },
      onDisconnect: () => {
        if (isCancelled) return;
        connRef.current = null;
        setConnectionState("connecting");
      },
      onError: () => {
        if (isCancelled) return;
        connRef.current = null;
        setConnectionState("error");
        setHasLoaded(true);
      },
    });

    return () => {
      isCancelled = true;
      client.disconnect();
      connRef.current = null;
    };
  }, []);

  const activeRoom: UiRoom | null = useMemo(() => {
    if (liveRooms.length === 0) return null;
    if (selectedRoomKey) {
      return (
        liveRooms.find(
          (r) =>
            (r.roomCode && r.roomCode === selectedRoomKey) ||
            (!r.roomCode && /^\d+$/.test(selectedRoomKey) && r.id === BigInt(selectedRoomKey))
        ) ?? null
      );
    }
    return liveRooms.find((r) => r.status === "Live") ?? liveRooms[0] ?? null;
  }, [liveRooms, selectedRoomKey]);

  useEffect(() => {
    if (!hasLoaded || activeRoom) {
      const resetTimer = window.setTimeout(() => setNotFoundReady(false), 0);
      return () => window.clearTimeout(resetTimer);
    }
    const timer = window.setTimeout(() => setNotFoundReady(true), 800);
    return () => window.clearTimeout(timer);
  }, [hasLoaded, activeRoom]);

  const roomItems = useMemo(() => {
    if (!activeRoom) return [];
    if (connRef.current) {
      const rawItems = Array.from(connRef.current.db.auctionItem.iter()).filter(
        (i) => i.roomId === activeRoom.id
      );
      return rawItems
        .map((i) => ({
          id: i.id,
          orderIndex: i.orderIndex,
          title: i.title,
          description: i.description,
          images: i.images,
          startingPrice: i.startingPrice,
          currentBid: i.currentBid,
          highestBidderId: i.highestBidderId ?? null,
          status: i.status.tag,
          endsAtMs: i.endsAt ? Number(i.endsAt.toMillis()) : null,
          quantity: i.quantity ?? 1,
          category: i.category || "General",
          metadataJson: i.metadataJson || "",
        }))
        .sort((a, b) => a.orderIndex - b.orderIndex);
    }
    return [...liveItems].sort((a, b) => a.orderIndex - b.orderIndex);
  }, [liveItems, activeRoom]);

  const activeItem = useMemo(() => {
    if (!activeRoom) return null;
    if (activeRoom.status !== "Live" && inspectedItemId !== null) {
      const inspected = roomItems.find((i) => i.id === inspectedItemId);
      if (inspected) return inspected;
    }
    if (activeRoom.activeItemId !== null) {
      const found = roomItems.find((i) => i.id === activeRoom.activeItemId);
      if (found) return found;
    }
    return roomItems.find((i) => i.status === "Active") ?? roomItems[0] ?? null;
  }, [activeRoom, roomItems, inspectedItemId]);

  const activeBids = useMemo(() => {
    if (!activeItem) return [];
    return liveBids
      .filter((b) => b.itemId === activeItem.id)
      .sort((a, b) => b.createdAtMs - a.createdAtMs || Number(b.id - a.id));
  }, [activeItem, liveBids]);

  const upcomingItems = useMemo(() => {
    return roomItems.filter(
      (i) => i.status === "Queued" && (!activeItem || i.id !== activeItem.id)
    );
  }, [roomItems, activeItem]);

  const doneCount = useMemo(
    () => roomItems.filter((i) => i.status === "Sold" || i.status === "Unsold").length,
    [roomItems]
  );

  const activeIndex = useMemo(
    () => (activeItem ? roomItems.findIndex((i) => i.id === activeItem.id) : -1),
    [roomItems, activeItem]
  );

  const minNextBid = useMemo(() => {
    if (!activeItem || !activeRoom) return BigInt(0);
    return activeItem.highestBidderId !== null
      ? activeItem.currentBid + activeRoom.minBidIncrement
      : activeItem.startingPrice;
  }, [activeItem, activeRoom]);

  const handlePlaceBid = (amount: bigint) => {
    if (!activeItem || !activeRoom) return;
    setBidError(null);

    const conn = connRef.current;
    if (!conn) {
      setBidError("Not connected to server.");
      return;
    }

    if (!activeRoom.isPublic && !isRoomOwner && !magicToken.trim()) {
      setBidError("Enter your whitelisted email to place bids.");
      return;
    }

    try {
      conn.reducers.placeBid({
        roomId: activeRoom.id,
        itemId: activeItem.id,
        magicToken: effectiveMagicToken.trim(),
        amount,
        bidderName: effectiveBuyerName.trim() || undefined,
        bidderEmail: effectiveMagicToken.trim().toLowerCase() || undefined,
      });
    } catch (err) {
      setBidError(err instanceof Error ? err.message : "Failed to place bid.");
    }
  };

  const myAutoBidMax = useMemo(() => {
    if (!activeItem) return null;
    const match = myAutoBids.find((a) => a.itemId === activeItem.id);
    return match ? match.maxAmount : null;
  }, [myAutoBids, activeItem]);

  const handleSetAutoBid = (maxAmount: bigint) => {
    if (!activeItem || !activeRoom) return;
    setBidError(null);
    const conn = connRef.current;
    if (!conn) {
      setBidError("Not connected to server.");
      return;
    }
    try {
      conn.reducers.setAutoBid({
        roomId: activeRoom.id,
        itemId: activeItem.id,
        magicToken: effectiveMagicToken.trim(),
        maxAmount,
        bidderName: effectiveBuyerName.trim() || undefined,
        bidderEmail: effectiveMagicToken.trim().toLowerCase() || undefined,
      });
    } catch (err) {
      setBidError(err instanceof Error ? err.message : "Failed to set auto-bid.");
    }
  };

  const handleCancelAutoBid = () => {
    if (!activeItem) return;
    setBidError(null);
    const conn = connRef.current;
    if (!conn) return;
    try {
      conn.reducers.cancelAutoBid({ itemId: activeItem.id });
    } catch (err) {
      setBidError(err instanceof Error ? err.message : "Failed to cancel auto-bid.");
    }
  };

  const myOrg = useMemo(() => {
    if (!myIdentityHex) return null;
    return orgs.find((o) => o.ownerHex === myIdentityHex) ?? null;
  }, [orgs, myIdentityHex]);

  const effectiveBuyerName = useMemo(() => {
    if (sessionEmail && myOrg?.name) return myOrg.name;
    return buyerName;
  }, [sessionEmail, myOrg, buyerName]);

  const effectiveMagicToken = useMemo(() => {
    if (sessionEmail) return sessionEmail;
    return magicToken;
  }, [sessionEmail, magicToken]);

  const isRoomOwner = useMemo(() => {
    if (!activeRoom || !myIdentityHex || activeRoom.orgId === undefined) return false;
    const roomOrg = orgs.find((o) => o.id === activeRoom.orgId);
    return roomOrg?.ownerHex === myIdentityHex;
  }, [myIdentityHex, activeRoom, orgs]);

  const isEmailApprovedForRoom = (room: UiRoom, normalizedEmail: string) => {
    const allowedLists = room.allowedListIds ?? [];
    if (allowedLists.length === 0) return false;
    return buyerListMembers.some(
      (m) =>
        m.orgId === room.orgId &&
        allowedLists.some((id) => id === m.listId) &&
        m.email === normalizedEmail &&
        !m.isBanned
    );
  };

  const isInviteVerified = useMemo(() => {
    if (!activeRoom) return false;
    if (isRoomOwner) return true;
    const normalizedEmail = normalizeBuyerContact(effectiveMagicToken);
    if (!normalizedEmail) return false;
    if (activeRoom.isPublic) {
      return Boolean(effectiveBuyerName.trim());
    }
    return isEmailApprovedForRoom(activeRoom, normalizedEmail);
  }, [
    activeRoom,
    isRoomOwner,
    effectiveMagicToken,
    effectiveBuyerName,
    approvedBuyers,
    buyerListMembers,
  ]);

  const isDuplicateEmailSession = useMemo(() => {
    if (!activeRoom || isRoomOwner || !myIdentityHex) return false;
    const normalizedEmail = normalizeBuyerContact(effectiveMagicToken);
    if (!normalizedEmail) return false;
    return roomPresences.some(
      (p) =>
        p.roomId === activeRoom.id &&
        p.email === normalizedEmail &&
        p.identityHex !== myIdentityHex
    );
  }, [isRoomOwner, myIdentityHex, effectiveMagicToken, roomPresences, activeRoom]);

  useEffect(() => {
    if (!hasLoaded || !activeRoom || !isInviteVerified || isDuplicateEmailSession) {
      return;
    }
    const conn = connRef.current;
    if (!conn) return;
    const email = normalizeBuyerContact(effectiveMagicToken);
    const key = `${activeRoom.id.toString()}:${email}`;
    if (joinedKeyRef.current === key) return;
    joinedKeyRef.current = key;
    try {
      conn.reducers.joinRoom({
        roomId: activeRoom.id,
        magicToken: email,
      });
    } catch {
      // Ignore if rejected; roomPresence subscription will reflect state
    }
  }, [hasLoaded, activeRoom, isInviteVerified, isDuplicateEmailSession, effectiveMagicToken]);

  const handleVerifyInviteEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRoom) return;
    setInviteGateError(null);
    const trimmedName = inviteNameInput.trim();
    const normalized = normalizeBuyerContact(inviteEmailInput);
    if (!trimmedName || !normalized) return;

    if (!activeRoom.isPublic) {
      const allowedLists = activeRoom.allowedListIds ?? [];
      if (allowedLists.length === 0) {
        setInviteGateError("No buyer lists are whitelisted for this private auction.");
        return;
      }
      const listMatches = buyerListMembers.filter(
        (m) =>
          m.orgId === activeRoom.orgId &&
          m.email === normalized &&
          allowedLists.some((id) => id === m.listId)
      );

      if (listMatches.length === 0) {
        setInviteGateError("This email or phone number is not whitelisted for this auction.");
        return;
      }
      if (!listMatches.some((m) => !m.isBanned)) {
        setInviteGateError("Access for this buyer has been revoked.");
        return;
      }
    }

    if (
      !isRoomOwner &&
      myIdentityHex &&
      roomPresences.some(
        (p) =>
          p.roomId === activeRoom.id &&
          p.email === normalized &&
          p.identityHex !== myIdentityHex
      )
    ) {
      setInviteGateError(
        "This buyer is already active in this auction from another device or tab."
      );
      return;
    }

    setBuyerName(trimmedName);
    setMagicToken(normalized);
    window.sessionStorage.setItem("arcbid_buyer_name", trimmedName);
    window.sessionStorage.setItem("arcbid_buyer_token", normalized);
  };

  const handleDownloadIcs = () => {
    if (!activeRoom?.scheduledAtMs) return;
    const start = new Date(activeRoom.scheduledAtMs);
    const durationMs = Math.max(30 * 60_000, activeRoom.lotDurationSec * Math.max(1, roomItems.length) * 1000);
    const end = new Date(start.getTime() + durationMs);
    const toIcsDate = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ArcBids//Live Auction//EN",
      "BEGIN:VEVENT",
      `UID:arcbids-room-${activeRoom.id.toString()}@arcbids.com`,
      `DTSTAMP:${toIcsDate(new Date())}`,
      `DTSTART:${toIcsDate(start)}`,
      `DTEND:${toIcsDate(end)}`,
      `SUMMARY:ArcBids · ${activeRoom.title}`,
      `DESCRIPTION:Join the live wholesale auction at ${window.location.href}`,
      `URL:${window.location.href}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeRoom.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "auction"}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!hasLoaded || (!activeRoom && !notFoundReady && connectionState !== "error")) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#05070c] text-zinc-100">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        <p className="mt-4 text-xs font-medium text-zinc-400">
          Loading auction room…
        </p>
      </div>
    );
  }

  if (!activeRoom) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#05070c] px-4 text-center text-zinc-100">
        <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#090d14] p-8 shadow-2xl shadow-black/70">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Auction Room Not Found
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-zinc-400">
            This auction link is invalid or the room no longer exists.
          </p>
        </div>
      </div>
    );
  }

  if (!isInviteVerified || isDuplicateEmailSession) {
    return (
      <div className="flex min-h-screen flex-col bg-[#05070c] text-zinc-100">
        <TopBar
          roomTitle={activeRoom.title}
          status={activeRoom.status}
          viewerCount={liveViewers}
          connectionState={connectionState}
          isDemo={false}
          showDashboardLink={isLoggedIn}
        />

        <main className="mx-auto flex w-full max-w-md flex-1 items-center px-4 py-12">
          <div className="w-full rounded-3xl border border-white/[0.08] bg-[#090d14] p-7 shadow-2xl shadow-black/70">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 text-[#3ff2e0]">
              {activeRoom.isPublic ? (
                <Globe className="h-5 w-5" />
              ) : (
                <Lock className="h-5 w-5" />
              )}
            </div>
            <h2 className="mt-4 text-xl font-bold tracking-tight text-white">
              {activeRoom.isPublic ? "Join Public Auction" : "Invite-Only Auction"}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              {activeRoom.isPublic ? (
                <>
                  Enter your name and email or phone number to join and bid in{" "}
                  <strong className="text-zinc-200">{activeRoom.title}</strong>.
                </>
              ) : (
                <>
                  Enter your name and whitelisted email or phone number to access{" "}
                  <strong className="text-zinc-200">{activeRoom.title}</strong>.
                </>
              )}
            </p>

            <form onSubmit={handleVerifyInviteEmail} className="mt-5 space-y-3">
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  required
                  autoFocus
                  value={inviteNameInput}
                  onChange={(e) => setInviteNameInput(e.target.value)}
                  placeholder="Your name or company"
                  className="h-11 w-full rounded-2xl border border-white/10 bg-[#0e1420] pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
                />
              </div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={inviteEmailInput}
                  onChange={(e) => setInviteEmailInput(e.target.value)}
                  placeholder="Email or phone (+49 170 1234567)"
                  className="h-11 w-full rounded-2xl border border-white/10 bg-[#0e1420] pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
                />
              </div>

              {(inviteGateError || isDuplicateEmailSession) && (
                <p className="text-xs font-medium text-rose-400">
                  {inviteGateError ??
                    "This email is already active in this auction from another device or tab."}
                </p>
              )}

              <button
                type="submit"
                className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-[#e4fffb] text-sm font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_20px_rgba(63,242,224,0.2)] transition hover:bg-white"
              >
                Join Auction
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#05070c] text-zinc-100">
      <TopBar
        roomTitle={activeRoom.title}
        status={activeRoom.status}
        viewerCount={liveViewers}
        connectionState={connectionState}
        isDemo={false}
        showDashboardLink={isLoggedIn}
        roomCode={activeRoom.roomCode}
      />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-32 pt-5 sm:px-6 sm:pb-28 sm:pt-8">
        {(activeRoom.status === "Draft" || activeRoom.status === "Lobby") && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#3ff2e0]/25 bg-[#3ff2e0]/[0.06] px-4 py-3 text-xs">
            <div className="flex items-center gap-2.5">
              <CalendarIcon className="h-4 w-4 shrink-0 text-[#3ff2e0]" />
              <div>
                <span className="font-semibold text-[#e4fffb]">
                  Auction Preview
                </span>
                <span className="mx-2 text-zinc-500">·</span>
                <span className="text-zinc-300">
                  {activeRoom.scheduledAtMs
                    ? `Starts ${format(new Date(activeRoom.scheduledAtMs), "EEE, MMM d · HH:mm")}`
                    : "Bidding opens when the seller starts the room"}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {activeRoom.scheduledAtMs && activeRoom.scheduledAtMs > nowMs && (
                <span className="rounded-full border border-[#3ff2e0]/30 bg-[#05070c]/80 px-3 py-1 font-mono text-xs font-semibold tabular-nums text-[#3ff2e0]">
                  Starts in {formatCountdown(activeRoom.scheduledAtMs - nowMs)}
                </span>
              )}
              {activeRoom.scheduledAtMs && (
                <button
                  type="button"
                  onClick={handleDownloadIcs}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-[#e4fffb] transition hover:border-[#3ff2e0]/40 hover:bg-white/[0.12] active:scale-95"
                >
                  <CalendarPlus className="h-3.5 w-3.5 text-[#3ff2e0]" />
                  Add to Calendar
                </button>
              )}
            </div>
          </div>
        )}

        {activeRoom.status === "Live" && roomItems.length > 0 && (
          <div className="mb-4 rounded-2xl border border-white/[0.07] bg-[#090d14]/90 px-4 py-2.5 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#3ff2e0]" />
                <span className="font-semibold text-white">
                  Lot {activeIndex >= 0 ? activeIndex + 1 : 1} of {roomItems.length}
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-400">
                <span>
                  <strong className="text-zinc-200">{doneCount}</strong> done
                </span>
                <span className="text-zinc-600">·</span>
                <span>
                  <strong className="text-[#3ff2e0]">{upcomingItems.length}</strong> upcoming
                </span>
              </div>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-[#3ff2e0] transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(
                      5,
                      (((activeIndex >= 0 ? activeIndex + 1 : 1) / roomItems.length) * 100)
                    )
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        {activeRoom.status === "Ended" && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-400/25 bg-amber-500/[0.07] px-4 py-3 text-xs">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
              <div>
                <span className="font-semibold text-amber-100">
                  Auction Finished
                </span>
                <span className="mx-2 text-zinc-500">·</span>
                <span className="text-zinc-300">
                  Bidding is closed ·{" "}
                  {roomItems.filter((i) => i.status === "Sold").length} of{" "}
                  {roomItems.length} {roomItems.length === 1 ? "lot" : "lots"} sold
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {roomItems.length > 1 && activeIndex >= 0 && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={activeIndex <= 0}
                    onClick={() => setInspectedItemId(roomItems[activeIndex - 1].id)}
                    aria-label="Previous lot"
                    className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#05070c]/80 text-zinc-200 transition hover:border-amber-300/40 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-1.5 font-mono text-[11px] text-zinc-300 tabular-nums">
                    {activeIndex + 1}/{roomItems.length}
                  </span>
                  <button
                    type="button"
                    disabled={activeIndex >= roomItems.length - 1}
                    onClick={() => setInspectedItemId(roomItems[activeIndex + 1].id)}
                    aria-label="Next lot"
                    className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#05070c]/80 text-zinc-200 transition hover:border-amber-300/40 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              <span className="rounded-full border border-amber-400/30 bg-[#05070c]/80 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                Closed
              </span>
            </div>
          </div>
        )}

        {activeItem ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch">
            {/* Left Column: Hero Lot + Bid Controls */}
            <div className="flex flex-col gap-4 lg:col-span-7">
              <ActiveLotCard
                key={activeItem.id.toString()}
                item={activeItem}
                lotDurationSec={activeRoom.lotDurationSec}
                minIncrement={activeRoom.minBidIncrement}
                nowMs={nowMs}
                bidCount={activeBids.length}
              />
            </div>

            {/* Right Column: Highest Bidder + Activity Feed + Upcoming Lots */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              <HighestBidderCard topBid={activeBids[0]} />
              <BidFeed bids={activeBids} nowMs={nowMs} className="flex-1" />
              <UpcomingQueue
                items={activeRoom.status === "Live" ? upcomingItems : roomItems}
                title={
                  activeRoom.status === "Live"
                    ? "Up Next"
                    : activeRoom.status === "Ended"
                      ? "All Lots"
                      : "Preview Lots"
                }
                currency={activeRoom.currency}
                selectedItemId={activeRoom.status !== "Live" ? activeItem.id : null}
                onSelectItem={
                  activeRoom.status !== "Live"
                    ? (id) => setInspectedItemId(id)
                    : undefined
                }
                showStatus={activeRoom.status === "Ended"}
              />
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/[0.07] bg-[#0e121b] p-10 text-center shadow-2xl shadow-black/40">
            <p className="text-base font-semibold text-zinc-100">No active lot</p>
            <p className="mt-1 text-sm text-zinc-400">
              Waiting for the seller to start the next item.
            </p>
          </div>
        )}
      </main>

      {activeItem && (
        <BidControls
          minNextBid={minNextBid}
          minIncrement={activeRoom.minBidIncrement}
          currentPrice={
            activeItem.highestBidderId !== null
              ? activeItem.currentBid
              : activeItem.startingPrice
          }
          hasBids={activeItem.highestBidderId !== null}
          currency={activeRoom.currency}
          ended={activeRoom.status === "Ended"}
          endsAtMs={activeItem.endsAtMs}
          nowMs={nowMs}
          allowAutoBid={activeRoom.allowAutoBid ?? true}
          myAutoBidMax={myAutoBidMax}
          disabled={activeRoom.status !== "Live" || activeItem.status !== "Active"}
          errorMessage={bidError}
          onPlaceBid={handlePlaceBid}
          onSetAutoBid={handleSetAutoBid}
          onCancelAutoBid={handleCancelAutoBid}
        />
      )}
    </div>
  );
}
