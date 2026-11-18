import { UserManager, WebStorageStateStore, type User } from "oidc-client-ts";

export const SPACETIME_AUTH_AUTHORITY =
  process.env.NEXT_PUBLIC_SPACETIME_AUTH_URI ?? "https://auth.spacetimedb.com/oidc";

export const SPACETIME_AUTH_CLIENT_ID =
  process.env.NEXT_PUBLIC_SPACETIME_AUTH_CLIENT_ID ?? "";

const OIDC_ID_TOKEN_KEY = "arcbid_oidc_id_token";
const OIDC_PROFILE_KEY = "arcbid_oidc_profile";

export interface AuthProfile {
  name?: string;
  email?: string;
  sub?: string;
}

export function isAuthConfigured(): boolean {
  return Boolean(SPACETIME_AUTH_CLIENT_ID.trim());
}

let cachedManager: UserManager | null = null;

export function getUserManager(): UserManager {
  if (typeof window === "undefined") {
    throw new Error("UserManager can only be initialized in the browser.");
  }
  if (!cachedManager) {
    cachedManager = new UserManager({
      authority: SPACETIME_AUTH_AUTHORITY,
      client_id: SPACETIME_AUTH_CLIENT_ID,
      redirect_uri: `${window.location.origin}/auth/callback`,
      post_logout_redirect_uri: `${window.location.origin}/`,
      response_type: "code",
      scope: "openid profile email",
      userStore: new WebStorageStateStore({ store: window.localStorage }),
    });
  }
  return cachedManager;
}

export function getOidcIdToken(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.localStorage.getItem(OIDC_ID_TOKEN_KEY) ?? undefined;
}

export function saveOidcIdToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(OIDC_ID_TOKEN_KEY, token);
}

export function getStoredAuthProfile(): AuthProfile | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(OIDC_PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthProfile;
  } catch {
    return null;
  }
}

export function saveOidcSession(user: User): void {
  if (typeof window === "undefined") return;
  if (user.id_token) {
    window.localStorage.setItem(OIDC_ID_TOKEN_KEY, user.id_token);
  }
  const profile: AuthProfile = {
    name: typeof user.profile?.name === "string" ? user.profile.name : undefined,
    email: typeof user.profile?.email === "string" ? user.profile.email : undefined,
    sub: user.profile?.sub,
  };
  window.localStorage.setItem(OIDC_PROFILE_KEY, JSON.stringify(profile));
}

export function clearOidcSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(OIDC_ID_TOKEN_KEY);
  window.localStorage.removeItem(OIDC_PROFILE_KEY);
}

export async function signInWithSpacetimeAuth(): Promise<void> {
  if (!isAuthConfigured()) {
    throw new Error("NEXT_PUBLIC_SPACETIME_AUTH_CLIENT_ID is not configured.");
  }
  const manager = getUserManager();
  await manager.signinRedirect();
}

export async function completeSpacetimeAuthCallback(): Promise<User> {
  const manager = getUserManager();
  const user = await manager.signinRedirectCallback();
  saveOidcSession(user);
  return user;
}

export async function signOutSpacetimeAuth(): Promise<void> {
  clearOidcSession();
  if (!isAuthConfigured()) {
    window.location.href = "/";
    return;
  }
  const manager = getUserManager();
  await manager.removeUser();
  await manager.signoutRedirect();
}
