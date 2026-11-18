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
  LogOut,
  Mail,
  Pencil,
  Plus,
  Trash2,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import type { DbConnection } from "@/module_bindings";
import { createSpacetimeConnection, clearSavedToken } from "@/lib/spacetime";
import { clearOidcSession, saveOidcIdToken } from "@/lib/auth";
import { formatCurrency } from "@/lib/format";
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

interface OrgRow extends OrganizationProfile {
  id: bigint;
  ownerHex: string;
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
  const [currentDeviceId] = useState<string>(() =>
    typeof window !== "undefined" ? getDeviceDetails().deviceId : ""
  );

  const [createAuctionOpen, setCreateAuctionOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<RoomRow | null>(null);
  const [resultsRoom, setResultsRoom] = useState<RoomRow | null>(null);
  const [buyerCompany, setBuyerCompany] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

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
    };

    const conn = createSpacetimeConnection({
      onConnect: (connectedConn, _tok, identity: Identity) => {
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
      onDisconnect: () => setConnState("error"),
      onError: () => setConnState("error"),
    });

    connRef.current = conn;
    return () => {
      conn.disconnect();
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

      const existingRoomLots = items.filter((i) => i.roomId === editingRoom.id);
      const keptIds = new Set(
        payload.lots.map((l) => l.id).filter((id): id is bigint => id !== undefined)
      );

      // Delete removed lots
      for (const existing of existingRoomLots) {
        if (!keptIds.has(existing.id)) {
          conn.reducers.deleteAuctionItem({ itemId: existing.id });
        }
      }

      // Update existing lots & add new ones
      payload.lots.forEach((lot, idx) => {
        if (lot.id !== undefined) {
          conn.reducers.updateAuctionItem({
            itemId: lot.id,
            title: lot.title,
            description: lot.description,
            images: lot.images,
            startingPrice: lot.startingPriceCents,
            quantity: lot.quantity,
            category: lot.category ?? "General",
            metadataJson: lot.metadataJson ?? "",
          });
        } else {
          conn.reducers.addAuctionItem({
            roomId: editingRoom.id,
            orderIndex: existingRoomLots.length + idx,
            title: lot.title,
            description: lot.description,
            images: lot.images,
            startingPrice: lot.startingPriceCents,
            quantity: lot.quantity,
            category: lot.category ?? "General",
            metadataJson: lot.metadataJson ?? "",
          });
        }
      });

      setEditingRoom(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update auction.");
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
              <GlowCard accent="teal" className="lg:col-span-4">
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

              <GlowCard accent="indigo" className="lg:col-span-4">
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

              <GlowCard accent="amber" className="lg:col-span-4">
                <GlowCardHeader
                  title={d.TotalSold}
                  icon={<DollarSign className="h-4 w-4 text-amber-300" />}
                />
                <p className="font-mono text-3xl font-bold tracking-tight text-[#e4fffb] tabular-nums">
                  {formatCurrency(stats.totalSoldCents)}
                </p>
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
                      return (
                        <div
                          key={r.id.toString()}
                          className={`relative flex flex-wrap items-center justify-between gap-3 overflow-hidden rounded-2xl border px-4 py-3 transition ${
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
                          <div className="relative z-10 min-w-0">
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
                              {r.scheduledAtMs !== null && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-[#3ff2e0]">
                                  <CalendarIcon className="h-3 w-3" />
                                  {format(new Date(r.scheduledAtMs), "EEE, MMM d · HH:mm")}
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
                            <InteractivePill
                              tone="accent"
                              active
                              onClick={() => handleStartAuction(r.id)}
                              className="h-8 px-3.5 text-[11px]"
                            >
                              {d.StartAction}
                            </InteractivePill>
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
                          {isEnded && (
                            <IconButton
                              variant="subtle"
                              size="sm"
                              onClick={() => setResultsRoom(r)}
                              aria-label={`View winners for ${r.title}`}
                              title="Winners & contact info"
                              className="h-8 w-8 border-amber-400/25 text-amber-300 enabled:hover:border-amber-400/50 enabled:hover:bg-amber-500/10"
                            >
                              <Trophy className="h-3.5 w-3.5" />
                            </IconButton>
                          )}
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
              open={Boolean(resultsRoom)}
              onClose={() => setResultsRoom(null)}
              title={resultsRoom ? `${resultsRoom.title} · ${d.WinnersTitleSuffix}` : d.WinnersTitleSuffix}
              description={d.WinnersDesc}
            >
              {resultsRoom && (() => {
                const roomLots = items
                  .filter((i) => i.roomId === resultsRoom.id)
                  .sort((a, b) => a.orderIndex - b.orderIndex);
                const soldLots = roomLots.filter((i) => i.status === "Sold");
                const totalSales = soldLots.reduce(
                  (sum, i) => sum + i.currentBid,
                  BigInt(0)
                );

                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-[#0e1420]/70 px-4 py-3 text-xs">
                      <span className="text-zinc-400">
                        {soldLots.length} / {roomLots.length} {d.LotsSoldSummary}
                      </span>
                      <span className="font-mono font-semibold text-[#3ff2e0]">
                        {d.TotalLabel} {formatCurrency(totalSales, resultsRoom.currency)}
                      </span>
                    </div>

                    <div className="max-h-[55vh] space-y-2.5 overflow-y-auto pr-1">
                      {roomLots.map((lot) => {
                        const winningBid = bids
                          .filter((b) => b.itemId === lot.id)
                          .sort((a, b) => Number(b.amount - a.amount) || Number(b.id - a.id))[0];
                        const matchedBuyer =
                          winningBid && winningBid.buyerId > BigInt(0)
                            ? buyers.find((b) => b.id === winningBid.buyerId)
                            : undefined;
                        const winnerEmail =
                          winningBid?.buyerEmail || matchedBuyer?.magicToken || "";
                        const isSold = lot.status === "Sold" && Boolean(winningBid);

                        return (
                          <div
                            key={lot.id.toString()}
                            className="rounded-2xl border border-white/[0.07] bg-[#0e1420]/80 p-4"
                          >
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
                                    {winnerEmail && (
                                      <span className="ml-1.5 font-mono text-zinc-400">
                                        ({winnerEmail})
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
                                  ? formatCurrency(lot.currentBid, resultsRoom.currency)
                                  : d.UnsoldLabel}
                              </span>
                            </div>

                            {isSold && winnerEmail && (
                              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-3">
                                <a
                                  href={`mailto:${encodeURIComponent(winnerEmail)}?subject=${encodeURIComponent(
                                    `You won Lot #${lot.orderIndex + 1}: ${lot.title} (${resultsRoom.title})`
                                  )}&body=${encodeURIComponent(
                                    `Hi ${winningBid?.buyerName ?? ""},\n\nCongratulations on winning Lot #${lot.orderIndex + 1} (${lot.title}) in ${resultsRoom.title} for ${formatCurrency(lot.currentBid, resultsRoom.currency)}.\n\nPlease reply to arrange payment and delivery.\n`
                                  )}`}
                                  className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#e4fffb] px-3.5 text-xs font-semibold text-[#04070b] transition hover:bg-white"
                                >
                                  <Mail className="h-3.5 w-3.5" />
                                  {d.EmailWinner}
                                </a>
                                <button
                                  type="button"
                                  onClick={async () => {
                                    await navigator.clipboard.writeText(winnerEmail);
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
                                      {d.CopyEmail}
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
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
