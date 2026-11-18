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

export function clearSavedToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
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

export function createReconnectingSpacetimeConnection(handlers: {
  onConnect: (conn: DbConnection, token: string, identity: Identity) => void;
  onReconnecting?: () => void;
  onDisconnect?: () => void;
  onError?: (err: unknown) => void;
}): { disconnect: () => void } {
  let disposed = false;
  let isConnected = false;
  let attempt = 0;
  let currentConn: DbConnection | null = null;
  let reconnectTimer: number | null = null;

  const clearTimer = () => {
    if (reconnectTimer !== null && typeof window !== "undefined") {
      window.clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
  };

  const scheduleReconnect = () => {
    if (disposed || typeof window === "undefined" || reconnectTimer !== null) return;
    const delayMs = Math.min(10_000, 1000 * 2 ** Math.min(attempt, 4));
    attempt += 1;
    reconnectTimer = window.setTimeout(() => {
      reconnectTimer = null;
      connect();
    }, delayMs);
  };

  const connect = () => {
    if (disposed) return;
    clearTimer();

    if (currentConn) {
      try {
        currentConn.disconnect();
      } catch {
        // Ignore cleanup errors on stale socket
      }
      currentConn = null;
    }

    handlers.onReconnecting?.();

    const conn = createSpacetimeConnection({
      onConnect: (connectedConn, token, identity) => {
        if (disposed) {
          connectedConn.disconnect();
          return;
        }
        isConnected = true;
        attempt = 0;
        handlers.onConnect(connectedConn, token, identity);
      },
      onDisconnect: () => {
        if (disposed) return;
        isConnected = false;
        handlers.onDisconnect?.();
        scheduleReconnect();
      },
      onError: (err) => {
        if (disposed) return;
        isConnected = false;
        handlers.onError?.(err);
        scheduleReconnect();
      },
    });

    currentConn = conn;
  };

  const handleWake = () => {
    if (disposed) return;
    if (typeof document !== "undefined" && document.visibilityState !== "visible") {
      return;
    }
    if (!isConnected || (currentConn && !currentConn.isActive)) {
      attempt = 0;
      connect();
    }
  };

  if (typeof window !== "undefined") {
    document.addEventListener("visibilitychange", handleWake);
    window.addEventListener("online", handleWake);
    window.addEventListener("pageshow", handleWake);
  }

  connect();

  return {
    disconnect: () => {
      disposed = true;
      isConnected = false;
      clearTimer();
      if (typeof window !== "undefined") {
        document.removeEventListener("visibilitychange", handleWake);
        window.removeEventListener("online", handleWake);
        window.removeEventListener("pageshow", handleWake);
      }
      if (currentConn) {
        try {
          currentConn.disconnect();
        } catch {
          // Ignore disconnect errors
        }
        currentConn = null;
      }
    },
  };
}
