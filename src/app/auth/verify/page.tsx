"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { saveOidcIdToken } from "@/lib/auth";
import { clearDeviceRegisteredMarkers } from "@/lib/device-info";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("Missing sign-in token.");
      return;
    }

    let active = true;
    fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = (await res.json()) as {
          error?: string;
          spacetimeToken?: string;
        };
        if (!res.ok) {
          throw new Error(data.error ?? "Invalid or expired link.");
        }
        if (data.spacetimeToken) {
          saveOidcIdToken(data.spacetimeToken);
        }
        clearDeviceRegisteredMarkers();
        if (active) router.replace("/dashboard");
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : "Verification failed.");
        }
      });

    return () => {
      active = false;
    };
  }, [router, searchParams]);

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#090d14] p-8 text-center shadow-2xl shadow-black/60">
      {error ? (
        <>
          <p className="text-sm font-semibold text-rose-400">
            Link invalid or expired
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-400">{error}</p>
          <Link
            href="/login"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[#e4fffb] px-5 text-xs font-semibold text-[#04070b]"
          >
            Request a new link
          </Link>
        </>
      ) : (
        <>
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
          <p className="mt-4 text-sm font-semibold text-white">
            Verifying your sign-in link…
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Taking you to your organization portal.
          </p>
        </>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#05070c] px-4 text-zinc-100">
      <Suspense
        fallback={
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        }
      >
        <VerifyContent />
      </Suspense>
    </div>
  );
}
