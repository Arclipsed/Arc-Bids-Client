export type RoomStatusTag = "Draft" | "Lobby" | "Live" | "Ended";
export type ItemStatusTag = "Queued" | "Active" | "Sold" | "Unsold";

export interface UiRoom {
  id: bigint;
  orgId?: bigint;
  title: string;
  status: RoomStatusTag;
  activeItemId: bigint | null;
  currency?: "EUR" | "USD";
  scheduledAtMs?: number | null;
  isPublic?: boolean;
  roomCode?: string;
  allowedListIds?: bigint[];
  allowAutoBid?: boolean;
}

export interface UiItem {
  id: bigint;
  orderIndex: number;
  title: string;
  description: string;
  images: string[];
  startingPrice: bigint;
  currentBid: bigint;
  highestBidderId: bigint | null;
  status: ItemStatusTag;
  endsAtMs: number | null;
  quantity?: number;
  category?: string;
  metadataJson?: string;
  lotDurationSec: number;
  antiSnipeSec: number;
  minBidIncrement: bigint;
}

export interface UiBid {
  id: bigint;
  itemId: bigint;
  buyerName: string;
  amount: bigint;
  createdAtMs: number;
}
