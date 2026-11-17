import { DbConnection } from "@/module_bindings";
import type { Identity } from "spacetimedb";
import { getOidcIdToken } from "@/lib/auth";

export const SPACETIMEDB_URI =
  process.env.NEXT_PUBLIC_SPACETIMEDB_URI ?? "wss://maincloud.spacetimedb.com";

export const SPACETIMEDB_DB =
  process.env.NEXT_PUBLIC_SPACETIMEDB_DB ?? "arc-bid-6ws40";

const TOKEN_STORAGE_KEY = `arcbid_token_${SPACETIMEDB_DB}`;

export function getSavedToken(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY) ?? undefined;
}

export function saveToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function createSpacetimeConnection(handlers: {
  onConnect: (conn: DbConnection, token: string, identity: Identity) => void;
  onDisconnect?: () => void;
  onError?: (err: unknown) => void;
}): DbConnection {
  const oidcToken = getOidcIdToken();
  const initialToken = oidcToken ?? getSavedToken();

  return DbConnection.builder()
    .withUri(SPACETIMEDB_URI)
    .withDatabaseName(SPACETIMEDB_DB)
    .withToken(initialToken)
    .onConnect((conn, identity, token) => {
      if (!oidcToken) {
        saveToken(token);
      }
      handlers.onConnect(conn, token, identity);
    })
    .onDisconnect(() => {
      handlers.onDisconnect?.();
    })
    .onConnectError((_ctx, err) => {
      handlers.onError?.(err);
    })
    .build();
}
