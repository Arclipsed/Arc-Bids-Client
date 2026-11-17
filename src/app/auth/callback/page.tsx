"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { completeSpacetimeAuthCallback } from "@/lib/auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    completeSpacetimeAuthCallback()
      .then(() => {
        if (active) router.replace("/dashboard");
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : "Authentication failed.");
        }
      });

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#05070c] px-4 text-zinc-100">
      <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#090d14] p-8 text-center shadow-2xl shadow-black/60">
        {error ? (
          <>
            <p className="text-sm font-semibold text-rose-400">Sign-in error</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">{error}</p>
            <Link
              href="/dashboard"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[#e4fffb] px-5 text-xs font-semibold text-[#04070b]"
            >
              Back to Seller Portal
            </Link>
          </>
        ) : (
          <>
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
            <p className="mt-4 text-sm font-semibold text-white">
              Completing sign-in…
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Redirecting to your organization portal.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
