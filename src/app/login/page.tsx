"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { ArcBidsLogo } from "@/components/ArcBidsLogo";
import { Pattern as OtpPattern } from "@/components/ui/c-input-otp-1";
import { saveOidcIdToken } from "@/lib/auth";
import { clearDeviceRegisteredMarkers } from "@/lib/device-info";

export default function LoginPage() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [challengeToken, setChallengeToken] = useState<string | null>(null);
  const [codeInput, setCodeInput] = useState("");
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [devVerifyUrl, setDevVerifyUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data: { email?: string | null }) => {
        if (!active) return;
        if (data.email) {
          router.replace("/dashboard");
          return;
        }
        setCheckingSession(false);
      })
      .catch(() => {
        if (active) setCheckingSession(false);
      });
    return () => {
      active = false;
    };
  }, [router]);

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#05070c]">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        devVerifyUrl?: string;
        challengeToken?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Failed to send sign-in link.");
        return;
      }
      setSentTo(email.trim().toLowerCase());
      setChallengeToken(data.challengeToken ?? null);
      setCodeInput("");
      setDevVerifyUrl(data.devVerifyUrl ?? null);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengeToken || !codeInput.trim()) return;
    setError(null);
    setVerifyingCode(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeToken,
          code: codeInput.trim(),
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        spacetimeToken?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Invalid or expired code.");
        return;
      }
      if (data.spacetimeToken) {
        saveOidcIdToken(data.spacetimeToken);
      }
      clearDeviceRegisteredMarkers();
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setVerifyingCode(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#05070c] px-4 text-zinc-100">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(63,242,224,0.14),transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to ArcBids
        </Link>

        <div className="rounded-3xl border border-white/[0.08] bg-[#090d14]/95 p-7 shadow-2xl shadow-black/70 backdrop-blur-xl sm:p-8">
          <div className="flex items-center gap-2.5">
            <ArcBidsLogo />
            <span className="text-base font-bold tracking-tight text-white">
              ArcBids
            </span>
          </div>

          {!sentTo ? (
            <>
              <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">
                Sign in to your desk
              </h1>
              <p className="mt-1.5 text-sm text-zinc-400">
                Enter your work email and we&apos;ll send you an instant sign-in
                link. No password needed.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Work email
                  </label>
                  <div className="relative mt-1.5">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <input
                      id="email"
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="h-11 w-full rounded-2xl border border-white/10 bg-[#0e1420] pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-[#3ff2e0]"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs font-medium text-rose-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e4fffb] text-sm font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_24px_rgba(63,242,224,0.2)] transition enabled:hover:bg-white enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Sending link…" : "Continue with Email"}
                  {!loading && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="mt-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#3ff2e0]/30 bg-[#3ff2e0]/10 text-[#3ff2e0]">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h1 className="mt-4 text-xl font-bold tracking-tight text-white">
                Check your inbox
              </h1>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                We sent a 6-digit code and sign-in link to{" "}
                <strong className="text-white">{sentTo}</strong>. Enter the code
                below to stay in this browser, or click the link in your email.
              </p>

              <form onSubmit={handleVerifyCode} className="mt-5 space-y-4">
                <OtpPattern
                  id="login-code"
                  label="6-digit code"
                  value={codeInput}
                  onChange={(value) => setCodeInput(value)}
                  disabled={verifyingCode}
                  autoFocus
                  className="justify-start"
                />

                {error && (
                  <p className="text-xs font-medium text-rose-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={verifyingCode || codeInput.replace(/\s+/g, "").length < 6}
                  className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-[#e4fffb] text-sm font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_24px_rgba(63,242,224,0.2)] transition enabled:hover:bg-white enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {verifyingCode ? "Verifying…" : "Verify & Sign In"}
                </button>
              </form>

              {devVerifyUrl && (
                <div className="mt-5 rounded-2xl border border-[#3ff2e0]/25 bg-[#3ff2e0]/[0.06] p-3.5 text-xs">
                  <p className="font-semibold text-[#3ff2e0]">
                    Dev Preview (No RESEND_API_KEY set)
                  </p>
                  <p className="mt-1 text-zinc-400">
                    Add your Resend key in <code className="font-mono">.env.local</code>{" "}
                    to send real emails, or click below to test now:
                  </p>
                  <Link
                    href={devVerifyUrl}
                    className="mt-2.5 inline-flex items-center gap-1 font-semibold text-[#e4fffb] underline underline-offset-4 hover:text-[#3ff2e0]"
                  >
                    Open magic sign-in link →
                  </Link>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setSentTo(null);
                  setChallengeToken(null);
                  setCodeInput("");
                  setError(null);
                  setDevVerifyUrl(null);
                }}
                className="mt-6 cursor-pointer text-xs font-medium text-zinc-400 transition hover:text-white"
              >
                Use a different email address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
