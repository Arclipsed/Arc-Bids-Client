const DEVICE_ID_KEY = "arcbid_device_id";
const DEVICE_REGISTERED_PREFIX = "arcbid_device_registered_";

export function isDeviceRegisteredForIdentity(identityHex: string): boolean {
  if (typeof window === "undefined" || !identityHex) return false;
  return window.localStorage.getItem(`${DEVICE_REGISTERED_PREFIX}${identityHex}`) === "1";
}

export function markDeviceRegisteredForIdentity(identityHex: string): void {
  if (typeof window === "undefined" || !identityHex) return;
  window.localStorage.setItem(`${DEVICE_REGISTERED_PREFIX}${identityHex}`, "1");
}

export function clearDeviceRegisteredMarkers(): void {
  if (typeof window === "undefined") return;
  try {
    for (let i = window.localStorage.length - 1; i >= 0; i--) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(DEVICE_REGISTERED_PREFIX)) {
        window.localStorage.removeItem(key);
      }
    }
  } catch {
    // Ignore storage access errors
  }
}

export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return "server";
  const existing = window.localStorage.getItem(DEVICE_ID_KEY)?.trim();
  if (existing) return existing;
  const generated =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(DEVICE_ID_KEY, generated);
  return generated;
}

export function getDeviceDetails(): {
  deviceId: string;
  deviceName: string;
  deviceType: "desktop" | "mobile" | "tablet";
} {
  const deviceId = getOrCreateDeviceId();
  if (typeof navigator === "undefined") {
    return { deviceId, deviceName: "Unknown Device", deviceType: "desktop" };
  }

  const ua = navigator.userAgent || "";

  let browser = "Browser";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/i.test(ua)) browser = "Opera";
  else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) browser = "Chrome";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = "Safari";

  let os = "Device";
  let deviceType: "desktop" | "mobile" | "tablet" = "desktop";

  if (/iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) {
    deviceType = "tablet";
    os = /iPad/i.test(ua) ? "iPad" : "Android Tablet";
  } else if (/iPhone/i.test(ua)) {
    deviceType = "mobile";
    os = "iPhone";
  } else if (/Android/i.test(ua)) {
    deviceType = "mobile";
    os = "Android";
  } else if (/Windows/i.test(ua)) {
    os = "Windows";
  } else if (/Mac OS X|Macintosh/i.test(ua)) {
    os = "macOS";
  } else if (/Linux/i.test(ua)) {
    os = "Linux";
  }

  return {
    deviceId,
    deviceName: `${browser} on ${os}`,
    deviceType,
  };
}
