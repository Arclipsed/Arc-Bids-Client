"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Timestamp, type Identity } from "spacetimedb";
import { format } from "date-fns";
import {
  Activity,
  Calendar as CalendarIcon,
  Check,
  CheckCircle2,
  Copy,
  DollarSign,
  Eye,
  Gavel,
  Info,
  LogOut,
  Mail,
  Package,
  Pencil,
  Plus,
  Ticket,
  Trash2,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import type { DbConnection } from "@/module_bindings";
import { createReconnectingSpacetimeConnection, clearSavedToken } from "@/lib/spacetime";
import { clearOidcSession, saveOidcIdToken } from "@/lib/auth";
import { formatCountdown, formatCurrency } from "@/lib/format";
import { InteractivePill } from "@/components/ui/interactive-pill";
import { IconButton } from "@/components/ui/icon-button";
import { Dialog } from "@/components/ui/dialog";
import { NumberTicker } from "@/components/ui/number-ticker";
import {
  BentoGrid,
  GlowCard,
  GlowCardHeader,
  GlowLiveBadge,
} from "@/components/ui/glow-bento-card";
import {
  OrganizationWidget,
  type OrganizationProfile,
} from "@/components/dashboard/OrganizationWidget";
import {
  BuyerListsWidget,
  type BuyerListMemberRow,
  type BuyerListRow,
} from "@/components/dashboard/BuyerListsWidget";
import { DangerZoneWidget } from "@/components/dashboard/DangerZoneWidget";
import {
  DevicesWidget,
  type DeviceRow,
} from "@/components/dashboard/DevicesWidget";
import { getDeviceDetails } from "@/lib/device-info";
import { ArcBidsLogo } from "@/components/ArcBidsLogo";
import { Locale, Translations, getClientLocale } from "@/translations/Translations";
import {
  CreateAuctionForm,
  type CreateAuctionPayload,
} from "@/components/dashboard/CreateAuctionForm";
import { CreateLotForm, type DraftLot } from "@/components/dashboard/CreateLotForm";
import { normalizeCategory } from "@/lib/lot-categories";

interface OrgRow extends OrganizationProfile {
  id: bigint;
  ownerHex: string;
  auctionCredits: number;
}

interface RoomRow {
  id: bigint;
  orgId: bigint;
  title: string;
  status: string;
  activeItemId: bigint | null;
  lotDurationSec: number;
  antiSnipeSec: number;
  minBidIncrement: bigint;
  currency: "EUR" | "USD";
  scheduledAtMs: number | null;
  isPublic: boolean;
  roomCode: string;
  allowedListIds: bigint[];
  allowAutoBid: boolean;
  isPaid: boolean;
}

interface ItemRow {
  id: bigint;
  roomId: bigint;
  orderIndex: number;
  title: string;
  description: string;
  images: string[];
  startingPrice: bigint;
  status: string;
  currentBid: bigint;
  quantity: number;
  category: string;
  metadataJson: string;
  endsAtMs: number | null;
}

interface BuyerRow {
  id: bigint;
  orgId: bigint;
  companyName: string;
  magicToken: string;
  isBanned: boolean;
}

interface BidRow {
  id: bigint;
  itemId: bigint;
  buyerId: bigint;
  buyerName: string;
  buyerEmail: string;
  amount: bigint;
}

const ORG_ADJECTIVES = [
  "Apex",
  "Nordic",
  "Prime",
  "Vertex",
  "Atlas",
  "Nova",
  "Summit",
  "Metro",
  "Krono",
  "Beacon",
  "Vanguard",
  "Harbor",
];

const ORG_NOUNS = [
  "Wholesale",
  "Trading",
  "Supply",
  "Exchange",
  "Commerce",
  "Ventures",
  "Logistics",
  "Merchants",
];

function buildRandomDefaultOrg(): { name: string; slug: string } {
  const adj = ORG_ADJECTIVES[Math.floor(Math.random() * ORG_ADJECTIVES.length)];
  const noun = ORG_NOUNS[Math.floor(Math.random() * ORG_NOUNS.length)];
  const suffix = Math.random().toString(36).slice(2, 6);
  return {
    name: `${adj} ${noun}`,
    slug: `${adj.toLowerCase()}-${noun.toLowerCase()}-${suffix}`,
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const connRef = useRef<DbConnection | null>(null);
  const autoCreatedRef = useRef(false);
  const pendingLotRef = useRef<CreateAuctionPayload | null>(null);

  const [authChecked, setAuthChecked] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [locale, setLocale] = useState<Locale>(Locale.EN);
  const isDe = locale === Locale.DE;
  const d = Translations[locale].DashboardPage.Copy;
  const [myIdentityHex, setMyIdentityHex] = useState<string | null>(null);
  const [tablesSynced, setTablesSynced] = useState(false);
  const [connState, setConnState] = useState<"connecting" | "connected" | "error">(
    "connecting"
  );

  const [orgs, setOrgs] = useState<OrgRow[]>([]);
  const [rooms, setRooms] = useState<RoomRow[]>([]);
  const [items, setItems] = useState<ItemRow[]>([]);
  const [buyers, setBuyers] = useState<BuyerRow[]>([]);
  const [buyerLists, setBuyerLists] = useState<BuyerListRow[]>([]);
  const [buyerListMembers, setBuyerListMembers] = useState<BuyerListMemberRow[]>([]);
  const [bids, setBids] = useState<BidRow[]>([]);
  const [devices, setDevices] = useState<DeviceRow[]>([]);
  const [roomPresenceCounts, setRoomPresenceCounts] = useState<Record<string, number>>({});
  const [currentDeviceId] = useState<string>(() =>
    typeof window !== "undefined" ? getDeviceDetails().deviceId : ""
  );

  const [createAuctionOpen, setCreateAuctionOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<RoomRow | null>(null);
  const [addingLotRoom, setAddingLotRoom] = useState<RoomRow | null>(null);
  const [editingLot, setEditingLot] = useState<{
    room: RoomRow;
    item: ItemRow;
  } | null>(null);
  const [resultsLot, setResultsLot] = useState<{
    room: RoomRow;
    item: ItemRow;
  } | null>(null);
  const [buyerCompany, setBuyerCompany] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [stripeConfigured, setStripeConfigured] = useState(false);
  const [buyingTicket, setBuyingTicket] = useState(false);
  const [pendingTicketRedeem, setPendingTicketRedeem] = useState<{
    orgId: string;
    sessionId: string;
    quantity: number;
  } | null>(null);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  useEffect(() => {
    setLocale(getClientLocale());
    let active = true;
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data: { email?: string | null; spacetimeToken?: string }) => {
        if (!active) return;
        if (!data.email) {
          router.replace("/login");
          return;
        }
        if (data.spacetimeToken) {
          saveOidcIdToken(data.spacetimeToken);
        }
        setUserEmail(data.email);
        setAuthChecked(true);
        void fetch("/api/stripe/verify-auction")
          .then((r) => r.json())
          .then((s: { configured?: boolean }) => {
            if (active) setStripeConfigured(Boolean(s.configured));
          })
          .catch(() => {});

        const params = new URLSearchParams(window.location.search);
        const ticketOrg = params.get("ticket_org")?.trim();
        const sessionId = params.get("session_id")?.trim();
        if (ticketOrg && sessionId) {
          void fetch("/api/stripe/verify-auction", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orgId: ticketOrg, sessionId }),
          })
            .then((r) => r.json())
            .then((v: { paid?: boolean; quantity?: number }) => {
              if (active && v.paid) {
                setPendingTicketRedeem({
                  orgId: ticketOrg,
                  sessionId,
                  quantity: v.quantity ?? 1,
                });
                window.history.replaceState({}, "", "/dashboard");
              }
            })
            .catch(() => {});
        }
      })
      .catch(() => {
        if (active) router.replace("/login");
      });
    return () => {
      active = false;
    };
  }, [router]);

  useEffect(() => {
    if (!userEmail) return;

    const sync = (conn: DbConnection) => {
      setOrgs(
        Array.from(conn.db.organization.iter()).map((o) => ({
          id: o.id,
          ownerHex: o.ownerIdentity.toHexString(),
          name: o.name,
          slug: o.slug,
          contactEmail: o.contactEmail ?? "",
          phone: o.phone ?? "",
          website: o.website ?? "",
          addressLine1: o.addressLine1 ?? "",
          addressLine2: o.addressLine2 ?? "",
          city: o.city ?? "",
          state: o.state ?? "",
          postalCode: o.postalCode ?? "",
          country: o.country ?? "",
          vatNumber: o.vatNumber ?? "",
          description: o.description ?? "",
          auctionCredits: o.auctionCredits ?? 0,
        }))
      );
      setRooms(
        Array.from(conn.db.auction.iter()).map((r) => ({
          id: r.id,
          orgId: r.orgId,
          title: r.title,
          status: r.status.tag,
          activeItemId: r.activeItemId ?? null,
          lotDurationSec: r.lotDurationSec,
          antiSnipeSec: r.antiSnipeSec,
          minBidIncrement: r.minBidIncrement,
          currency: r.currency?.toUpperCase() === "EUR" ? "EUR" : "USD",
          scheduledAtMs: r.scheduledAt ? Number(r.scheduledAt.toMillis()) : null,
          isPublic: r.isPublic,
          roomCode: r.roomCode || r.id.toString(),
          allowedListIds: r.allowedListIds ?? [],
          allowAutoBid: r.allowAutoBid ?? true,
          isPaid: r.isPaid ?? false,
        }))
      );
      setItems(
        Array.from(conn.db.auctionItem.iter()).map((i) => ({
          id: i.id,
          roomId: i.roomId,
          orderIndex: i.orderIndex,
          title: i.title,
          description: i.description,
          images: i.images,
          startingPrice: i.startingPrice,
          status: i.status.tag,
          currentBid: i.currentBid,
          quantity: i.quantity ?? 1,
          category: i.category || "General",
          metadataJson: i.metadataJson || "",
          endsAtMs: i.endsAt ? Number(i.endsAt.toMillis()) : null,
        }))
      );
      setBuyers(
        Array.from(conn.db.organizationWhitelist.iter()).map((b) => ({
          id: b.id,
          orgId: b.orgId,
          companyName: b.companyName,
          magicToken: b.magicToken,
          isBanned: b.isBanned,
        }))
      );
      setBuyerLists(
        Array.from(conn.db.buyerList.iter()).map((l) => ({
          id: l.id,
          orgId: l.orgId,
          name: l.name,
          description: l.description,
        }))
      );
      setBuyerListMembers(
        Array.from(conn.db.buyerListMember.iter()).map((m) => ({
          id: m.id,
          listId: m.listId,
          orgId: m.orgId,
          companyName: m.companyName,
          email: m.email,
          isBanned: m.isBanned,
        }))
      );
      setBids(
        Array.from(conn.db.auctionItemBid.iter()).map((b) => ({
          id: b.id,
          itemId: b.itemId,
          buyerId: b.buyerId,
          buyerName: b.buyerName,
          buyerEmail: b.buyerEmail ?? "",
          amount: b.amount,
        }))
      );
      setDevices(
        Array.from(conn.db.myDevices.iter()).map((d) => ({
          id: d.id,
          deviceId: d.deviceId,
          deviceName: d.deviceName,
          deviceType: d.deviceType,
          isOnline: d.isOnline,
          lastSeenMs: Number(d.lastSeenAt.toMillis()),
        }))
      );
      const counts: Record<string, number> = {};
      for (const p of conn.db.auctionPresence.iter()) {
        const key = p.roomId.toString();
        counts[key] = (counts[key] ?? 0) + 1;
      }
      setRoomPresenceCounts(counts);
    };

    const client = createReconnectingSpacetimeConnection({
      onReconnecting: () => setConnState("connecting"),
      onConnect: (connectedConn, _tok, identity: Identity) => {
        connRef.current = connectedConn;
        setConnState("connected");
        setMyIdentityHex(identity.toHexString());
        try {
          const info = getDeviceDetails();
          connectedConn.reducers.registerDevice({
            deviceId: info.deviceId,
            deviceName: info.deviceName,
            deviceType: info.deviceType,
          });
        } catch {
          // Ignore device registration errors
        }
        connectedConn
          .subscriptionBuilder()
          .onApplied(() => {
            sync(connectedConn);
            setTablesSynced(true);
          })
          .subscribe([
            "SELECT * FROM organization",
            "SELECT * FROM auction",
            "SELECT * FROM auction_item",
            "SELECT * FROM organization_whitelist",
            "SELECT * FROM buyer_list",
            "SELECT * FROM buyer_list_member",
            "SELECT * FROM auction_item_bid",
            "SELECT * FROM auction_presence",
            "SELECT * FROM my_devices",
          ]);
        connectedConn.db.organization.onInsert(() => sync(connectedConn));
        connectedConn.db.organization.onUpdate(() => sync(connectedConn));
        connectedConn.db.auction.onInsert((_ctx, newRoom) => {
          sync(connectedConn);
          const pending = pendingLotRef.current;
          if (pending && newRoom.title === pending.roomTitle) {
            pendingLotRef.current = null;
            pending.lots.forEach((lot, idx) => {
              try {
                connectedConn.reducers.addAuctionItem({
                  roomId: newRoom.id,
                  orderIndex: idx,
                  title: lot.title,
                  description: lot.description,
                  images: lot.images,
                  startingPrice: lot.startingPriceCents,
                  quantity: lot.quantity,
                  category: lot.category ?? "General",
                  metadataJson: lot.metadataJson ?? "",
                });
              } catch {
                // Ignore if item insert fails
              }
            });
          }
        });
        connectedConn.db.auction.onUpdate(() => sync(connectedConn));
        connectedConn.db.auction.onDelete(() => sync(connectedConn));
        connectedConn.db.auctionItem.onInsert(() => sync(connectedConn));
        connectedConn.db.auctionItem.onUpdate(() => sync(connectedConn));
        connectedConn.db.auctionItem.onDelete(() => sync(connectedConn));
        connectedConn.db.organizationWhitelist.onInsert(() => sync(connectedConn));
        connectedConn.db.organizationWhitelist.onUpdate(() => sync(connectedConn));
        connectedConn.db.organizationWhitelist.onDelete(() => sync(connectedConn));
        connectedConn.db.buyerList.onInsert(() => sync(connectedConn));
        connectedConn.db.buyerList.onUpdate(() => sync(connectedConn));
        connectedConn.db.buyerList.onDelete(() => sync(connectedConn));
        connectedConn.db.buyerListMember.onInsert(() => sync(connectedConn));
        connectedConn.db.buyerListMember.onUpdate(() => sync(connectedConn));
        connectedConn.db.buyerListMember.onDelete(() => sync(connectedConn));
        connectedConn.db.auctionItemBid.onInsert(() => sync(connectedConn));
        connectedConn.db.auctionItemBid.onDelete(() => sync(connectedConn));
        connectedConn.db.auctionPresence.onInsert(() => sync(connectedConn));
        connectedConn.db.auctionPresence.onUpdate(() => sync(connectedConn));
        connectedConn.db.auctionPresence.onDelete(() => sync(connectedConn));
        connectedConn.db.myDevices.onInsert(() => sync(connectedConn));
        connectedConn.db.myDevices.onUpdate(() => sync(connectedConn));
        connectedConn.db.myDevices.onDelete((_ctx, deletedDevice) => {
          sync(connectedConn);
          if (deletedDevice.deviceId === getDeviceDetails().deviceId) {
            clearOidcSession();
            void fetch("/api/auth/logout", { method: "POST" }).finally(() => {
              router.replace("/login");
            });
          }
        });
      },
      onDisconnect: () => {
        connRef.current = null;
        setConnState("connecting");
      },
      onError: () => {
        connRef.current = null;
        setConnState("error");
      },
    });

    return () => {
      client.disconnect();
      connRef.current = null;
    };
  }, [userEmail]);

  const myOrg = useMemo(() => {
    if (!myIdentityHex) return null;
    return orgs.find((o) => o.ownerHex === myIdentityHex) ?? null;
  }, [orgs, myIdentityHex]);

  // Automatically create a default organization if the signed-in user doesn't have one yet
  useEffect(() => {
    if (!tablesSynced || !userEmail || !myIdentityHex || myOrg || autoCreatedRef.current) {
      return;
    }
    const conn = connRef.current;
    if (!conn) return;
    autoCreatedRef.current = true;
    const { name, slug } = buildRandomDefaultOrg();
    try {
      conn.reducers.createOrganization({
        name,
        slug,
        contactEmail: userEmail,
        phone: "",
        website: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        vatNumber: "",
        description: "",
      });
    } catch {
      // Ignore if already created concurrently
    }
  }, [tablesSynced, userEmail, myIdentityHex, myOrg]);

  const myRooms = useMemo(() => {
    if (!myOrg) return [];
    const statusOrder: Record<string, number> = {
      Live: 0,
      Draft: 1,
      Lobby: 1,
      Ended: 2,
    };
    return rooms
      .filter((r) => r.orgId === myOrg.id)
      .sort(
        (a, b) =>
          (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9) ||
          Number(b.id - a.id)
      );
  }, [rooms, myOrg]);

  const myBuyers = useMemo(() => {
    if (!myOrg) return [];
    return buyers.filter((b) => b.orgId === myOrg.id);
  }, [buyers, myOrg]);

  const stats = useMemo(() => {
    const activeAuctions = myRooms.filter((r) => r.status === "Live").length;
    const finishedAuctions = myRooms.filter((r) => r.status === "Ended").length;
    const myRoomIds = new Set(myRooms.map((r) => r.id));
    const soldItems = items.filter(
      (i) => myRoomIds.has(i.roomId) && i.status === "Sold"
    );
    const totalSoldCents = soldItems.reduce(
      (sum, i) => sum + i.currentBid,
      BigInt(0)
    );
    return {
      activeAuctions,
      finishedAuctions,
      soldCount: soldItems.length,
      totalSoldCents,
    };
  }, [myRooms, items]);

  const handleLogout = async () => {
    clearOidcSession();
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  };

  const handleDeleteAccount = async () => {
    setActionError(null);
    const conn = connRef.current;
    const myRoomIds = new Set(myRooms.map((r) => r.id));
    const allMyImageUrls = items
      .filter((i) => myRoomIds.has(i.roomId))
      .flatMap((i) => i.images)
      .filter((u) => Boolean(u.trim()));

    try {
      if (allMyImageUrls.length > 0) {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: allMyImageUrls }),
        }).catch(() => {});
      }

      if (conn) {
        conn.reducers.deleteAccount({});
      }

      clearOidcSession();
      clearSavedToken();
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/");
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete account.");
    }
  };

  const myBuyerLists = useMemo(() => {
    if (!myOrg) return [];
    return buyerLists.filter((l) => l.orgId === myOrg.id);
  }, [buyerLists, myOrg]);

  const myBuyerListMembers = useMemo(() => {
    if (!myOrg) return [];
    return buyerListMembers.filter((m) => m.orgId === myOrg.id);
  }, [buyerListMembers, myOrg]);

  const buyerListOptions = useMemo(() => {
    return myBuyerLists.map((l) => ({
      id: l.id,
      name: l.name,
      memberCount: myBuyerListMembers.filter((m) => m.listId === l.id).length,
    }));
  }, [myBuyerLists, myBuyerListMembers]);

  const handleUpdateOrg = (profile: OrganizationProfile) => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn || !myOrg) return;
    try {
      conn.reducers.updateOrganization({
        orgId: myOrg.id,
        name: profile.name,
        slug: profile.slug,
        contactEmail: profile.contactEmail,
        phone: profile.phone,
        website: profile.website,
        addressLine1: profile.addressLine1,
        addressLine2: profile.addressLine2,
        city: profile.city,
        state: profile.state,
        postalCode: profile.postalCode,
        country: profile.country,
        vatNumber: profile.vatNumber,
        description: profile.description,
      });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update organization.");
    }
  };

  const handleCreateBuyerList = (name: string, description = "") => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn || !myOrg) return;
    try {
      conn.reducers.createBuyerList({ orgId: myOrg.id, name, description });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to create list.");
    }
  };

  const handleUpdateBuyerList = (
    listId: bigint,
    name: string,
    description = ""
  ) => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn) return;
    try {
      conn.reducers.updateBuyerList({ listId, name, description });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update list.");
    }
  };

  const handleDeleteBuyerList = (listId: bigint) => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn) return;
    try {
      conn.reducers.deleteBuyerList({ listId });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete list.");
    }
  };

  const handleAddBuyerListMember = (
    listId: bigint,
    companyName: string,
    email: string
  ) => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn) return;
    try {
      conn.reducers.addBuyerListMember({ listId, companyName, email });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to add buyer to list.");
    }
  };

  const handleToggleBuyerListMemberBan = (memberId: bigint, isBanned: boolean) => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn) return;
    try {
      conn.reducers.setBuyerListMemberBanned({ memberId, isBanned });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update buyer status.");
    }
  };

  const handleDeleteBuyerListMember = (memberId: bigint) => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn) return;
    try {
      conn.reducers.deleteBuyerListMember({ memberId });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to remove buyer.");
    }
  };

  const handleRemoveDevice = (deviceRowId: bigint) => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn) return;
    try {
      conn.reducers.removeDevice({ deviceRowId });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to remove device.");
    }
  };

  const handleCreateAuction = (payload: CreateAuctionPayload) => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn || !myOrg) return;
    pendingLotRef.current = payload;

    let scheduledAt: Timestamp | undefined = undefined;
    if (payload.scheduledDate && payload.scheduledTime) {
      const [hh, mm] = payload.scheduledTime.split(":").map(Number);
      const dt = new Date(payload.scheduledDate);
      dt.setHours(hh || 0, mm || 0, 0, 0);
      scheduledAt = Timestamp.fromDate(dt);
    }

    try {
      conn.reducers.createRoom({
        orgId: myOrg.id,
        title: payload.roomTitle,
        lotDurationSec: payload.lotDurationSec,
        antiSnipeSec: payload.antiSnipeSec,
        minBidIncrement: payload.minBidIncrementCents,
        currency: payload.currency,
        scheduledAt,
        isPublic: payload.isPublic,
        allowedListIds: payload.allowedListIds,
        allowAutoBid: payload.allowAutoBid,
      });
      setCreateAuctionOpen(false);
    } catch (err) {
      pendingLotRef.current = null;
      setActionError(err instanceof Error ? err.message : "Failed to create auction.");
    }
  };

  const handleUpdateAuction = (payload: CreateAuctionPayload) => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn || !editingRoom) return;

    let scheduledAt: Timestamp | undefined = undefined;
    if (payload.scheduledDate && payload.scheduledTime) {
      const [hh, mm] = payload.scheduledTime.split(":").map(Number);
      const dt = new Date(payload.scheduledDate);
      dt.setHours(hh || 0, mm || 0, 0, 0);
      scheduledAt = Timestamp.fromDate(dt);
    }

    try {
      conn.reducers.updateRoom({
        roomId: editingRoom.id,
        title: payload.roomTitle,
        lotDurationSec: payload.lotDurationSec,
        antiSnipeSec: payload.antiSnipeSec,
        minBidIncrement: payload.minBidIncrementCents,
        currency: payload.currency,
        scheduledAt,
        isPublic: payload.isPublic,
        allowedListIds: payload.allowedListIds,
        allowAutoBid: payload.allowAutoBid,
      });

      setEditingRoom(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update auction.");
    }
  };

  const handleSaveLot = (lot: DraftLot) => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn) return;

    try {
      if (editingLot) {
        conn.reducers.updateAuctionItem({
          itemId: editingLot.item.id,
          title: lot.title,
          description: lot.description,
          images: lot.images,
          startingPrice: lot.startingPriceCents,
          quantity: lot.quantity,
          category: lot.category ?? "General",
          metadataJson: lot.metadataJson ?? "",
        });
        setEditingLot(null);
      } else if (addingLotRoom) {
        const roomLots = items.filter((i) => i.roomId === addingLotRoom.id);
        const maxOrder = roomLots.reduce((max, i) => Math.max(max, i.orderIndex), -1);
        conn.reducers.addAuctionItem({
          roomId: addingLotRoom.id,
          orderIndex: maxOrder + 1,
          title: lot.title,
          description: lot.description,
          images: lot.images,
          startingPrice: lot.startingPriceCents,
          quantity: lot.quantity,
          category: lot.category ?? "General",
          metadataJson: lot.metadataJson ?? "",
        });
        setAddingLotRoom(null);
      }
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to save lot.");
    }
  };

  const handleDeleteLot = (itemId: bigint) => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn) return;
    try {
      conn.reducers.deleteAuctionItem({ itemId });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete lot.");
    }
  };

  const hasLiveRoom = useMemo(
    () => rooms.some((r) => r.status === "Live"),
    [rooms]
  );

  useEffect(() => {
    if (!hasLiveRoom) return;
    setNowMs(Date.now());
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [hasLiveRoom]);

  useEffect(() => {
    if (!tablesSynced || !pendingTicketRedeem) return;
    const conn = connRef.current;
    if (!conn) return;
    try {
      conn.reducers.redeemAuctionTickets({
        orgId: BigInt(pendingTicketRedeem.orgId),
        sessionId: pendingTicketRedeem.sessionId,
        quantity: pendingTicketRedeem.quantity,
      });
      setPendingTicketRedeem(null);
    } catch {
      // Retry on next sync if needed
    }
  }, [tablesSynced, pendingTicketRedeem]);

  const handleBuyTicket = async (quantity = 1) => {
    if (!myOrg) return;
    setActionError(null);
    setBuyingTicket(true);
    try {
      const res = await fetch("/api/stripe/auction-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgId: myOrg.id.toString(),
          orgName: myOrg.name,
          quantity,
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setActionError(data.error ?? "Unable to start checkout.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setActionError("Network error starting checkout.");
    } finally {
      setBuyingTicket(false);
    }
  };

  const handleStartAuction = (roomId: bigint) => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn) return;
    try {
      conn.reducers.startAuction({ roomId });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to start auction.");
    }
  };

  const handleDeleteRoom = (roomId: bigint) => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn) return;
    const roomImageUrls = items
      .filter((i) => i.roomId === roomId)
      .flatMap((i) => i.images)
      .filter((u) => Boolean(u.trim()));

    try {
      conn.reducers.deleteRoom({ roomId });
      if (roomImageUrls.length > 0) {
        void fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: roomImageUrls }),
        }).catch(() => {
          // Best-effort cleanup
        });
      }
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete auction.");
    }
  };

  const handleDeleteBuyer = (buyerId: bigint) => {
    setActionError(null);
    const conn = connRef.current;
    if (!conn) return;
    try {
      conn.reducers.deleteApprovedBuyer({ buyerId });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete buyer.");
    }
  };

  const handleAddBuyer = (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    const conn = connRef.current;
    if (!conn || !myOrg || !buyerCompany.trim()) return;
    const raw = buyerCompany.trim();
    const email = raw.toLowerCase();
    const displayName = raw.includes("@")
      ? raw
          .split("@")[0]
          .replace(/[._-]+/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
      : raw;
    try {
      conn.reducers.addApprovedBuyer({
        orgId: myOrg.id,
        companyName: displayName,
        magicToken: email,
      });
      setBuyerCompany("");
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to whitelist buyer.");
    }
  };

  const copyRoomLink = (room: RoomRow) => {
    const key = `room-${room.id.toString()}`;
    const url = `${window.location.origin}/auction?room=${encodeURIComponent(room.roomCode)}`;
    navigator.clipboard.writeText(url);
    setCopiedId(key);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const copyInviteLink = (token: string, key: string) => {
    const url = `${window.location.origin}/auction?token=${encodeURIComponent(token)}`;
    navigator.clipboard.writeText(url);
    setCopiedId(key);
    setTimeout(() => setCopiedId(null), 1800);
  };

  if (!authChecked || !userEmail || (!tablesSynced && connState !== "error")) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#05070c] text-zinc-100">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        <p className="mt-4 text-xs font-medium text-zinc-400">
          {d.Loading}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#05070c] text-zinc-100">
      {/* Minimal Workspace Header */}
      <header className="border-b border-white/[0.06] bg-[#05070c]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-center gap-2.5">
              <ArcBidsLogo size="sm" />
              <span className="text-sm font-semibold text-white transition group-hover:text-[#e4fffb]">
                {myOrg ? myOrg.name : "ArcBids"}
              </span>
            </Link>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                connState === "connected"
                  ? "bg-[#3ff2e0]/10 text-[#3ff2e0]"
                  : "bg-white/[0.05] text-zinc-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  connState === "connected" ? "bg-[#3ff2e0]" : "bg-amber-400"
                }`}
              />
              {connState === "connected" ? d.LiveBadge : d.ConnectingBadge}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-zinc-400 sm:inline">
              {userEmail}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              {d.SignOut}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-5 px-4 py-10 sm:px-6">
        {actionError && (
          <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-xs text-rose-300">
            {actionError}
          </div>
        )}

        {!myOrg ? (
          <div className="flex justify-center py-20">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
          </div>
        ) : (
          <>
            {/* Top Statistics Row */}
            <BentoGrid>
              <GlowCard accent="teal" className="lg:col-span-3">
                <GlowCardHeader
                  title={d.ActiveAuctions}
                  icon={<Activity className="h-4 w-4 text-[#3ff2e0]" />}
                  right={stats.activeAuctions > 0 ? <GlowLiveBadge label={d.LiveBadge} /> : null}
                />
                <p className="font-mono text-3xl font-bold tracking-tight text-white tabular-nums">
                  <NumberTicker
                    value={stats.activeAuctions}
                    className="tracking-tight text-white dark:text-white"
                  />
                </p>
              </GlowCard>

              <GlowCard accent="indigo" className="lg:col-span-3">
                <GlowCardHeader
                  title={d.FinishedAuctions}
                  icon={<CheckCircle2 className="h-4 w-4 text-indigo-300" />}
                />
                <p className="font-mono text-3xl font-bold tracking-tight text-white tabular-nums">
                  <NumberTicker
                    value={stats.finishedAuctions}
                    className="tracking-tight text-white dark:text-white"
                  />
                </p>
              </GlowCard>

              <GlowCard accent="amber" className="lg:col-span-3">
                <GlowCardHeader
                  title={d.TotalSold}
                  icon={<DollarSign className="h-4 w-4 text-amber-300" />}
                />
                <p className="font-mono text-3xl font-bold tracking-tight text-[#e4fffb] tabular-nums">
                  {formatCurrency(stats.totalSoldCents)}
                </p>
              </GlowCard>

              <GlowCard accent="teal" className="lg:col-span-3">
                <GlowCardHeader
                  title={isDe ? "Auktions-Tickets" : "Auction Tickets"}
                  icon={<Ticket className="h-4 w-4 text-[#3ff2e0]" />}
                  right={
                    <div className="group relative">
                      <button
                        type="button"
                        aria-label={
                          isDe
                            ? "Was ist ein Auktions-Ticket?"
                            : "What is an Auction Ticket?"
                        }
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition hover:bg-white/[0.06] hover:text-[#3ff2e0] focus:outline-none focus:text-[#3ff2e0]"
                      >
                        <Info className="h-3.5 w-3.5" />
                      </button>
                      <div
                        role="tooltip"
                        className="pointer-events-none absolute right-0 bottom-full z-50 mb-2 w-64 rounded-2xl border border-white/10 bg-[#0b101b]/95 p-3 text-[11px] leading-relaxed text-zinc-300 opacity-0 shadow-xl backdrop-blur-md transition duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
                      >
                        <p className="font-semibold text-white">
                          {isDe
                            ? "Was ist ein Auktions-Ticket?"
                            : "What is an Auction Ticket?"}
                        </p>
                        <p className="mt-1 text-zinc-400">
                          {isDe ? (
                            <>
                              Entwürfe und Tests sind kostenlos. Sie verbrauchen{" "}
                              <span className="text-zinc-200">1 Ticket (10 €)</span>,
                              wenn Sie eine Auktion planen oder live starten. Bei
                              Stornierung oder Löschung vor Start wird das Ticket
                              erstattet.
                            </>
                          ) : (
                            <>
                              Drafting and testing auctions is free. You spend{" "}
                              <span className="text-zinc-200">1 Ticket (€10)</span>{" "}
                              when you schedule or launch a live auction. Cancelled
                              or deleted drafts refund the ticket automatically.
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  }
                />
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-3xl font-bold tracking-tight text-white tabular-nums">
                    <NumberTicker
                      value={myOrg.auctionCredits}
                      className="tracking-tight text-white dark:text-white"
                    />
                  </p>
                  {stripeConfigured && (
                    <button
                      type="button"
                      disabled={buyingTicket}
                      onClick={() => void handleBuyTicket(1)}
                      className="cursor-pointer whitespace-nowrap rounded-full bg-[#e4fffb] px-3 py-1 text-[11px] font-semibold text-[#04070b] transition hover:bg-white disabled:opacity-50"
                    >
                      {buyingTicket
                        ? isDe
                          ? "Weiterleiten…"
                          : "Redirecting…"
                        : isDe
                          ? "+ Kaufen · 10 €"
                          : "+ Buy · €10"}
                    </button>
                  )}
                </div>
              </GlowCard>
            </BentoGrid>

            {/* Full-Width Organization Card */}
            <BentoGrid>
              <OrganizationWidget
                org={myOrg}
                onSave={handleUpdateOrg}
                copy={d}
                className="lg:col-span-12"
              />
            </BentoGrid>

            {/* Full-Width Auctions Widget */}
            <BentoGrid>
              <GlowCard accent="indigo" className="lg:col-span-12">
                <GlowCardHeader
                  title={d.AuctionsTitle}
                  icon={<Gavel className="h-4 w-4 text-indigo-300" />}
                  right={
                    <IconButton
                      variant="accent"
                      size="sm"
                      onClick={() => setCreateAuctionOpen(true)}
                      aria-label={d.CreateAuctionTitle}
                      title={d.CreateAuctionTitle}
                    >
                      <Plus className="h-4 w-4" />
                    </IconButton>
                  }
                />

                <div className="space-y-2.5">
                  {myRooms.length === 0 ? (
                    <p className="rounded-2xl border border-white/[0.05] bg-[#0e1420]/60 p-6 text-center text-xs text-zinc-400">
                      {d.NoAuctionsYet}
                    </p>
                  ) : (
                    myRooms.map((r) => {
                      const isLive = r.status === "Live";
                      const isEnded = r.status === "Ended";
                      const isEditable = r.status === "Draft" || r.status === "Lobby";
                      const roomLots = items
                        .filter((i) => i.roomId === r.id)
                        .sort((a, b) => a.orderIndex - b.orderIndex);
                      return (
                        <div
                          key={r.id.toString()}
                          className={`relative overflow-hidden rounded-2xl border px-4 py-3 transition ${
                            isLive
                              ? "border-[#3ff2e0]/35 bg-[#0b181c]/85 shadow-[0_0_28px_rgba(63,242,224,0.12)]"
                              : isEnded
                                ? "border-white/[0.04] bg-[#080b12]/60 opacity-70 hover:opacity-100"
                                : "border-white/[0.06] bg-[#0e1420]/70"
                          }`}
                        >
                          {isLive && (
                            <>
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_12%_50%,rgba(63,242,224,0.12),transparent_55%)]"
                              />
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-[live-sweep_4s_linear_infinite] bg-gradient-to-r from-transparent via-[#3ff2e0]/[0.09] to-transparent"
                              />
                            </>
                          )}
                          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <p
                                className={`truncate text-sm font-semibold ${
                                  isEnded ? "text-zinc-300" : "text-white"
                                }`}
                              >
                                {r.title}
                              </p>
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold ${
                                  isLive
                                    ? "border border-[#3ff2e0]/30 bg-[#3ff2e0]/10 text-[#3ff2e0]"
                                    : isEnded
                                      ? "border border-white/10 bg-white/[0.04] text-zinc-400"
                                      : "border border-indigo-400/25 bg-indigo-500/10 text-indigo-300"
                                }`}
                              >
                                {isLive && (
                                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3ff2e0]" />
                                )}
                                {isEnded && <CheckCircle2 className="h-3 w-3 text-zinc-500" />}
                                {r.status === "Draft"
                                  ? d.PreviewStatus
                                  : r.status === "Live"
                                    ? d.LiveStatus
                                    : r.status === "Ended"
                                      ? d.EndedStatus
                                      : r.status}
                              </span>
                              <span
                                className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold ${
                                  r.isPublic
                                    ? "border border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
                                    : "border border-white/10 bg-white/[0.04] text-zinc-400"
                                }`}
                              >
                                {r.isPublic ? d.PublicBadge : d.InviteOnlyBadge}
                              </span>
                              {isLive && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-[#3ff2e0]">
                                  <Users className="h-3 w-3" />
                                  {roomPresenceCounts[r.id.toString()] ?? 0}{" "}
                                  {isDe
                                    ? "Käufer"
                                    : (roomPresenceCounts[r.id.toString()] ?? 0) === 1
                                      ? "buyer"
                                      : "buyers"}
                                </span>
                              )}
                              {r.scheduledAtMs !== null && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-[#3ff2e0]">
                                  <CalendarIcon className="h-3 w-3" />
                                  {format(new Date(r.scheduledAtMs), "EEE, MMM d · HH:mm")}
                                </span>
                              )}
                              {(r.status === "Draft" || r.status === "Lobby") && r.isPaid && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-emerald-300">
                                  <Ticket className="h-3 w-3" />
                                  {isDe ? "Ticket bereit" : "Ticket Ready"}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 font-mono text-[11px] text-zinc-400">
                              {r.lotDurationSec}{d.LotTimerSuffix} ·{" "}
                              {formatCurrency(r.minBidIncrement, r.currency)} {d.MinIncrementSuffix}
                            </p>
                          </div>

                          <div className="relative z-10 flex items-center gap-2">
                          {(r.status === "Draft" || r.status === "Lobby") && (
                            stripeConfigured && !r.isPaid && (myOrg?.auctionCredits ?? 0) === 0 ? (
                              <InteractivePill
                                tone="accent"
                                active
                                onClick={() => void handleBuyTicket(1)}
                                className="h-8 px-3.5 text-[11px]"
                              >
                                {buyingTicket
                                  ? isDe
                                    ? "Weiterleiten…"
                                    : "Redirecting…"
                                  : isDe
                                    ? "Ticket kaufen"
                                    : "Buy Ticket"}
                              </InteractivePill>
                            ) : (
                              <InteractivePill
                                tone="accent"
                                active
                                disabled={roomLots.length === 0}
                                title={
                                  roomLots.length === 0
                                    ? isDe
                                      ? "Mindestens 1 Los hinzufügen"
                                      : "Add at least 1 lot to start"
                                    : undefined
                                }
                                onClick={() => handleStartAuction(r.id)}
                                className="h-8 px-3.5 text-[11px] disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                {d.StartAction}
                              </InteractivePill>
                            )
                          )}
                          {isEditable && (
                            <IconButton
                              variant="subtle"
                              size="sm"
                              onClick={() => setAddingLotRoom(r)}
                              aria-label={`Add lot to ${r.title}`}
                              title={isDe ? "Los hinzufügen" : "Add lot"}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3.5 w-3.5 text-[#3ff2e0]" />
                            </IconButton>
                          )}
                          <Link
                            href={`/auction?room=${encodeURIComponent(r.roomCode)}`}
                            aria-label={`Open ${r.title}`}
                            title="Open room"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-white/25 hover:bg-white/[0.1] hover:text-white"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Link>
                          <IconButton
                            variant="subtle"
                            size="sm"
                            onClick={() => copyRoomLink(r)}
                            aria-label={`Copy link for ${r.title}`}
                            title="Copy invite link"
                            className="h-8 w-8"
                          >
                            {copiedId === `room-${r.id.toString()}` ? (
                              <Check className="h-3.5 w-3.5 text-[#3ff2e0]" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </IconButton>
                          {(r.status === "Draft" || r.status === "Lobby") && (
                            <IconButton
                              variant="subtle"
                              size="sm"
                              onClick={() => setEditingRoom(r)}
                              aria-label={`Edit ${r.title}`}
                              className="h-8 w-8"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </IconButton>
                          )}
                          <IconButton
                            variant="subtle"
                            size="sm"
                            onClick={() => handleDeleteRoom(r.id)}
                            aria-label={`Delete ${r.title}`}
                            className="h-8 w-8 enabled:hover:border-rose-400/40 enabled:hover:text-rose-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </IconButton>
                        </div>
                      </div>

                      {/* Nested Lots List */}
                      {(roomLots.length > 0 || isEditable) && (
                        <div className="relative z-10 mt-3 space-y-1.5 border-t border-white/[0.06] pt-2.5 pl-3">
                          {roomLots.length === 0 ? (
                            <button
                              type="button"
                              onClick={() => setAddingLotRoom(r)}
                              className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/10 bg-white/[0.015] py-2 text-[11px] font-medium text-zinc-400 transition hover:border-[#3ff2e0]/40 hover:bg-[#3ff2e0]/[0.04] hover:text-[#3ff2e0]"
                            >
                              <Plus className="h-3 w-3" />
                              {isDe ? "Erstes Los hinzufügen" : "Add first lot"}
                            </button>
                          ) : (
                            roomLots.map((lot, idx) => {
                              const isActiveLot =
                                isLive &&
                                (r.activeItemId === lot.id || lot.status === "Active");
                              const isSoldLot = lot.status === "Sold";
                              const isUnsoldLot = lot.status === "Unsold";
                              const firstImg = lot.images.find((u) => u.trim());
                              const remainingMs =
                                isActiveLot && lot.endsAtMs !== null
                                  ? Math.max(0, lot.endsAtMs - nowMs)
                                  : null;

                              return (
                                <div
                                  key={lot.id.toString()}
                                  className={`relative flex items-center justify-between gap-2 overflow-hidden rounded-xl border px-3 py-2 transition ${
                                    isActiveLot
                                      ? "border-[#3ff2e0]/40 bg-[#0b181c]/90 shadow-[0_0_20px_rgba(63,242,224,0.12)]"
                                      : isSoldLot
                                        ? "border-emerald-400/25 bg-emerald-500/[0.06]"
                                        : isUnsoldLot
                                          ? "border-rose-500/25 bg-rose-500/[0.06]"
                                          : "border-white/[0.05] bg-[#080c14]/80"
                                  }`}
                                >
                                  {isActiveLot && (
                                    <>
                                      <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_10%_50%,rgba(63,242,224,0.12),transparent_55%)]"
                                      />
                                      <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-[live-sweep_4s_linear_infinite] bg-gradient-to-r from-transparent via-[#3ff2e0]/[0.1] to-transparent"
                                      />
                                    </>
                                  )}
                                  <div className="relative z-10 flex min-w-0 flex-wrap items-center gap-2">
                                    {firstImg ? (
                                      <img
                                        src={firstImg}
                                        alt={lot.title}
                                        className="h-7 w-7 shrink-0 rounded-lg border border-white/10 object-cover"
                                      />
                                    ) : (
                                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-zinc-500">
                                        <Package className="h-3.5 w-3.5" />
                                      </span>
                                    )}
                                    <span className="font-mono text-[10px] text-zinc-500">
                                      #{idx + 1}
                                    </span>
                                    <p
                                      className={`truncate text-xs font-medium ${
                                        isActiveLot ? "text-white" : "text-zinc-200"
                                      }`}
                                    >
                                      {lot.title}
                                    </p>
                                    {lot.category !== "General" && (
                                      <span className="rounded-full border border-[#3ff2e0]/20 bg-[#3ff2e0]/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-[#3ff2e0]">
                                        {lot.category}
                                      </span>
                                    )}
                                    {isActiveLot && (
                                      <span className="inline-flex items-center gap-1 rounded-full border border-[#3ff2e0]/30 bg-[#3ff2e0]/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-[#3ff2e0]">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3ff2e0]" />
                                        {isDe ? "Aktiv" : "Live"}
                                      </span>
                                    )}
                                    {isSoldLot && (
                                      <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-emerald-300">
                                        {isDe ? "Verkauft" : "Sold"}
                                      </span>
                                    )}
                                    {isUnsoldLot && (
                                      <span className="rounded-full border border-rose-400/30 bg-rose-500/15 px-2 py-0.5 font-mono text-[9px] font-semibold text-rose-300">
                                        {isDe ? "Unverkauft" : "Unsold"}
                                      </span>
                                    )}
                                    <span className="font-mono text-[10px] text-zinc-400">
                                      {lot.quantity > 1 ? `${lot.quantity}× · ` : ""}
                                      {lot.currentBid > BigInt(0)
                                        ? formatCurrency(lot.currentBid, r.currency)
                                        : formatCurrency(lot.startingPrice, r.currency)}
                                      {lot.images.length > 0 && !firstImg
                                        ? ` · ${lot.images.length} img`
                                        : ""}
                                    </span>
                                  </div>
                                  <div className="relative z-10 flex shrink-0 items-center gap-1.5">
                                    {(isActiveLot || isSoldLot) && (
                                      <span
                                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums ${
                                          lot.currentBid > BigInt(0)
                                            ? "border-emerald-400/35 bg-emerald-500/15 text-emerald-200"
                                            : "border-white/15 bg-white/[0.05] text-zinc-300"
                                        }`}
                                      >
                                        {lot.currentBid > BigInt(0)
                                          ? `${isDe ? "Gebot" : "Bid"} ${formatCurrency(lot.currentBid, r.currency)}`
                                          : `${isDe ? "Start" : "Start"} ${formatCurrency(lot.startingPrice, r.currency)}`}
                                      </span>
                                    )}
                                    {remainingMs !== null && (
                                      <span
                                        className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold tabular-nums ${
                                          remainingMs <= 10_000
                                            ? "border-rose-400/35 bg-rose-500/15 text-rose-300"
                                            : "border-[#3ff2e0]/25 bg-[#3ff2e0]/10 text-[#3ff2e0]"
                                        }`}
                                      >
                                        {formatCountdown(remainingMs)}
                                      </span>
                                    )}
                                    {isSoldLot && (
                                      <IconButton
                                        variant="subtle"
                                        size="sm"
                                        onClick={() => setResultsLot({ room: r, item: lot })}
                                        aria-label={`View winner for ${lot.title}`}
                                        title={isDe ? "Gewinner & Kontakt" : "Winner & contact info"}
                                        className="h-7 w-7 border-amber-400/25 text-amber-300 enabled:hover:border-amber-400/50 enabled:hover:bg-amber-500/10"
                                      >
                                        <Trophy className="h-3 w-3" />
                                      </IconButton>
                                    )}
                                    {isEditable && (
                                      <>
                                        <IconButton
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setEditingLot({ room: r, item: lot })}
                                          aria-label={`Edit ${lot.title}`}
                                          className="h-7 w-7"
                                        >
                                          <Pencil className="h-3 w-3" />
                                        </IconButton>
                                        <IconButton
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleDeleteLot(lot.id)}
                                          aria-label={`Delete ${lot.title}`}
                                          className="h-7 w-7 enabled:hover:text-rose-400"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </IconButton>
                                      </>
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>
                      );
                    })
                  )}
                </div>
              </GlowCard>
            </BentoGrid>

            {/* Full-Width Buyer Email Lists Widget */}
            <BentoGrid>
              <BuyerListsWidget
                lists={myBuyerLists}
                members={myBuyerListMembers}
                onCreateList={handleCreateBuyerList}
                onUpdateList={handleUpdateBuyerList}
                onDeleteList={handleDeleteBuyerList}
                onAddMember={handleAddBuyerListMember}
                onToggleBan={handleToggleBuyerListMemberBan}
                onDeleteMember={handleDeleteBuyerListMember}
                className="lg:col-span-12"
              />
            </BentoGrid>

            {/* Logged-In Devices */}
            <BentoGrid>
              <DevicesWidget
                devices={devices}
                currentDeviceId={currentDeviceId}
                onRemoveDevice={handleRemoveDevice}
                className="lg:col-span-12"
              />
            </BentoGrid>

            {/* Danger Zone */}
            <DangerZoneWidget
              orgName={myOrg.name}
              isDe={isDe}
              onDeleteAccount={handleDeleteAccount}
            />

            <Dialog
              open={createAuctionOpen}
              onClose={() => setCreateAuctionOpen(false)}
              title={d.CreateAuctionTitle}
              description={d.CreateAuctionDesc}
            >
              <CreateAuctionForm
                buyerLists={buyerListOptions}
                copy={d}
                isDe={isDe}
                auctionCredits={myOrg.auctionCredits}
                stripeConfigured={stripeConfigured}
                onBuyTicket={() => void handleBuyTicket(1)}
                onSubmit={handleCreateAuction}
                onCancel={() => setCreateAuctionOpen(false)}
              />
            </Dialog>

            <Dialog
              open={Boolean(editingRoom)}
              onClose={() => setEditingRoom(null)}
              title={d.EditAuctionTitle}
              description={d.EditAuctionDesc}
            >
              {editingRoom && (
                <CreateAuctionForm
                  key={editingRoom.id.toString()}
                  mode="edit"
                  buyerLists={buyerListOptions}
                  copy={d}
                  isDe={isDe}
                  auctionCredits={myOrg.auctionCredits}
                  initialHasTicket={editingRoom.isPaid}
                  stripeConfigured={stripeConfigured}
                  onBuyTicket={() => void handleBuyTicket(1)}
                  initialValues={{
                    roomTitle: editingRoom.title,
                    currency: editingRoom.currency,
                    lotDurationSec: editingRoom.lotDurationSec,
                    antiSnipeSec: editingRoom.antiSnipeSec,
                    minBidIncrementCents: editingRoom.minBidIncrement,
                    isPublic: editingRoom.isPublic,
                    allowedListIds: editingRoom.allowedListIds,
                    allowAutoBid: editingRoom.allowAutoBid,
                    scheduledAtMs: editingRoom.scheduledAtMs,
                    lots: items
                      .filter((i) => i.roomId === editingRoom.id)
                      .sort((a, b) => a.orderIndex - b.orderIndex)
                      .map((i) => ({
                        id: i.id,
                        title: i.title,
                        description: i.description,
                        startingPriceCents: i.startingPrice,
                        quantity: i.quantity,
                        images: i.images,
                        category: i.category === "Car" ? "Car" : "General",
                        metadataJson: i.metadataJson,
                      })),
                  }}
                  onSubmit={handleUpdateAuction}
                  onCancel={() => setEditingRoom(null)}
                />
              )}
            </Dialog>

            <Dialog
              open={Boolean(addingLotRoom || editingLot)}
              onClose={() => {
                setAddingLotRoom(null);
                setEditingLot(null);
              }}
              title={editingLot ? d.EditLotTitle : d.AddLotTitle}
              description={
                editingLot
                  ? d.EditLotDesc
                  : addingLotRoom
                    ? `${addingLotRoom.title} — ${d.AddLotDesc}`
                    : d.AddLotDesc
              }
            >
              {(addingLotRoom || editingLot) && (
                <CreateLotForm
                  key={
                    editingLot
                      ? `edit-lot-${editingLot.item.id.toString()}`
                      : `add-lot-${addingLotRoom?.id.toString()}`
                  }
                  currencySymbol={
                    (editingLot?.room.currency ?? addingLotRoom?.currency) === "EUR"
                      ? "€"
                      : "$"
                  }
                  initialLot={
                    editingLot
                      ? {
                          id: editingLot.item.id,
                          title: editingLot.item.title,
                          description: editingLot.item.description,
                          startingPriceCents: editingLot.item.startingPrice,
                          quantity: editingLot.item.quantity,
                          images: editingLot.item.images,
                          category: normalizeCategory(editingLot.item.category),
                          metadataJson: editingLot.item.metadataJson,
                        }
                      : undefined
                  }
                  submitLabel={editingLot ? d.SaveLotAction : d.AddLot}
                  copy={d}
                  onSubmit={handleSaveLot}
                  onCancel={() => {
                    setAddingLotRoom(null);
                    setEditingLot(null);
                  }}
                />
              )}
            </Dialog>

            <Dialog
              open={Boolean(resultsLot)}
              onClose={() => setResultsLot(null)}
              title={
                resultsLot
                  ? `${resultsLot.item.title} · ${d.WinnersTitleSuffix}`
                  : d.WinnersTitleSuffix
              }
              description={resultsLot ? resultsLot.room.title : d.WinnersDesc}
            >
              {resultsLot && (() => {
                const { room, item: lot } = resultsLot;
                const winningBid = bids
                  .filter((b) => b.itemId === lot.id)
                  .sort((a, b) => Number(b.amount - a.amount) || Number(b.id - a.id))[0];
                const matchedBuyer =
                  winningBid && winningBid.buyerId > BigInt(0)
                    ? buyers.find((b) => b.id === winningBid.buyerId)
                    : undefined;
                const winnerContact =
                  winningBid?.buyerEmail || matchedBuyer?.magicToken || "";
                const isEmailContact = winnerContact.includes("@");
                const isSold = lot.status === "Sold" && Boolean(winningBid);

                return (
                  <div className="rounded-2xl border border-white/[0.07] bg-[#0e1420]/80 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Lot #{lot.orderIndex + 1} · {lot.title}
                        </p>
                        {isSold && winningBid ? (
                          <p className="mt-1 text-xs text-zinc-300">
                            {d.WinnerLabel}{" "}
                            <span className="font-semibold text-white">
                              {winningBid.buyerName}
                            </span>
                            {winnerContact && (
                              <span className="ml-1.5 font-mono text-zinc-400">
                                ({winnerContact})
                              </span>
                            )}
                          </p>
                        ) : (
                          <p className="mt-1 text-xs text-zinc-500">
                            {d.NoWinningBids}
                          </p>
                        )}
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${
                          isSold
                            ? "border border-[#3ff2e0]/30 bg-[#3ff2e0]/10 text-[#3ff2e0]"
                            : "border border-white/10 bg-white/[0.04] text-zinc-400"
                        }`}
                      >
                        {isSold
                          ? formatCurrency(lot.currentBid, room.currency)
                          : d.UnsoldLabel}
                      </span>
                    </div>

                    {isSold && winnerContact && (
                      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-3">
                        {isEmailContact && (
                          <a
                            href={`mailto:${encodeURIComponent(winnerContact)}?subject=${encodeURIComponent(
                              `You won Lot #${lot.orderIndex + 1}: ${lot.title} (${room.title})`
                            )}&body=${encodeURIComponent(
                              `Hi ${winningBid?.buyerName ?? ""},\n\nCongratulations on winning Lot #${lot.orderIndex + 1} (${lot.title}) in ${room.title} for ${formatCurrency(lot.currentBid, room.currency)}.\n\nPlease reply to arrange payment and delivery.\n`
                            )}`}
                            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#e4fffb] px-3.5 text-xs font-semibold text-[#04070b] transition hover:bg-white"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            {d.EmailWinner}
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={async () => {
                            await navigator.clipboard.writeText(winnerContact);
                            setCopiedId(`winner-${lot.id.toString()}`);
                            window.setTimeout(() => setCopiedId(null), 1800);
                          }}
                          className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.09] hover:text-white"
                        >
                          {copiedId === `winner-${lot.id.toString()}` ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-[#3ff2e0]" />
                              {d.Copied}
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              {isEmailContact
                                ? d.CopyEmail
                                : isDe
                                  ? "Kontakt kopieren"
                                  : "Copy contact"}
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </Dialog>
          </>
        )}
      </main>
    </div>
  );
}
