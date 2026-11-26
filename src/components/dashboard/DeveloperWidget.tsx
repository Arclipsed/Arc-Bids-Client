"use client";

import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Ban,
  Check,
  ChevronDown,
  Code2,
  Copy,
  KeyRound,
  Plus,
  ShieldAlert,
  Terminal,
  Trash2,
} from "lucide-react";
import { GlowCard, GlowCardHeader } from "@/components/ui/glow-bento-card";
import { IconButton } from "@/components/ui/icon-button";
import { Dialog } from "@/components/ui/dialog";

export interface ApiKeyRow {
  id: bigint;
  orgId: bigint;
  name: string;
  keyPrefix: string;
  createdAtMs: number;
  lastUsedAtMs: number | null;
  isRevoked: boolean;
}

interface DeveloperWidgetProps {
  apiKeys: ApiKeyRow[];
  isDe?: boolean;
  onCreateApiKey: (payload: {
    name: string;
    keyPrefix: string;
    keyHash: string;
  }) => void;
  onRevokeApiKey: (keyId: bigint) => void;
  onDeleteApiKey: (keyId: bigint) => void;
  className?: string;
}

const KEY_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateRawApiKey(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  let body = "";
  for (let i = 0; i < bytes.length; i += 1) {
    body += KEY_ALPHABET[bytes[i] % KEY_ALPHABET.length];
  }
  return `ab_live_${body}`;
}

async function sha256Hex(value: string): Promise<string> {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function DeveloperWidget({
  apiKeys,
  isDe = false,
  onCreateApiKey,
  onRevokeApiKey,
  onDeleteApiKey,
  className,
}: DeveloperWidgetProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [creating, setCreating] = useState(false);
  const [revealedKey, setRevealedKey] = useState<{
    name: string;
    secret: string;
  } | null>(null);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [showDocs, setShowDocs] = useState(false);

  const sorted = [...apiKeys].sort((a, b) => {
    if (a.isRevoked !== b.isRevoked) return a.isRevoked ? 1 : -1;
    return b.createdAtMs - a.createdAtMs;
  });

  const activeCount = sorted.filter((k) => !k.isRevoked).length;

  const handleOpenCreate = () => {
    setKeyName("");
    setRevealedKey(null);
    setCopiedSecret(false);
    setCreateOpen(true);
  };

  const handleCloseModal = () => {
    setCreateOpen(false);
    setKeyName("");
    setRevealedKey(null);
    setCopiedSecret(false);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = keyName.trim();
    if (!trimmed || creating) return;

    setCreating(true);
    try {
      const secret = generateRawApiKey();
      const keyHash = await sha256Hex(secret);
      const keyPrefix = secret.slice(0, 16);

      onCreateApiKey({
        name: trimmed,
        keyPrefix,
        keyHash,
      });

      setRevealedKey({ name: trimmed, secret });
      setKeyName("");
    } finally {
      setCreating(false);
    }
  };

  const handleCopySecret = async () => {
    if (!revealedKey) return;
    await navigator.clipboard.writeText(revealedKey.secret);
    setCopiedSecret(true);
    window.setTimeout(() => setCopiedSecret(false), 2000);
  };

  return (
    <>
      <GlowCard accent="teal" className={className}>
        <GlowCardHeader
          title={isDe ? "Entwickler & API-Schlüssel" : "Developer & API Keys"}
          icon={<Code2 className="h-4 w-4 text-[#3ff2e0]" />}
          right={
            <div className="flex items-center gap-2.5">
              <span className="hidden font-mono text-[11px] text-zinc-400 sm:inline">
                {activeCount} {isDe ? "aktiv" : "active"}
              </span>
              <button
                type="button"
                onClick={handleOpenCreate}
                className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full bg-[#e4fffb] px-3 text-xs font-semibold text-[#04070b] transition hover:bg-white"
              >
                <Plus className="h-3.5 w-3.5" />
                {isDe ? "Neuer API-Key" : "New API Key"}
              </button>
            </div>
          }
        />

        <p className="mb-4 text-xs text-zinc-400">
          {isDe
            ? "Erstelle API-Schlüssel, um Auktionen und Lose programmatisch über die ArcBids-API zu erstellen und zu verwalten."
            : "Create API keys to programmatically create and manage auctions and lots via the ArcBids API."}
        </p>

        <div className="space-y-2">
          {sorted.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/[0.08] bg-[#0e1420]/50 p-6 text-center">
              <KeyRound className="mx-auto h-5 w-5 text-zinc-500" />
              <p className="mt-2 text-xs font-medium text-zinc-300">
                {isDe ? "Noch keine API-Schlüssel" : "No API keys yet"}
              </p>
              <p className="mt-1 text-[11px] text-zinc-500">
                {isDe
                  ? "Erstelle deinen ersten Schlüssel, um Integrationen vorzubereiten."
                  : "Generate your first secret key to connect external scripts or ERP systems."}
              </p>
            </div>
          ) : (
            sorted.map((k) => (
              <div
                key={k.id.toString()}
                className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition ${
                  k.isRevoked
                    ? "border-white/[0.04] bg-[#0e1420]/40 opacity-65"
                    : "border-white/[0.06] bg-[#0e1420]/70"
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#090d14]">
                    <KeyRound
                      className={`h-4 w-4 ${
                        k.isRevoked ? "text-zinc-500" : "text-[#3ff2e0]"
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-semibold text-white">
                        {k.name}
                      </p>
                      {k.isRevoked ? (
                        <span className="rounded-full border border-rose-400/25 bg-rose-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-rose-300">
                          {isDe ? "Widerrufen" : "Revoked"}
                        </span>
                      ) : (
                        <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
                          {isDe ? "Aktiv" : "Active"}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 font-mono text-[11px] text-zinc-400">
                      <span className="text-zinc-300">{k.keyPrefix}••••••••</span>
                      <span>·</span>
                      <span>
                        {isDe ? "Erstellt" : "Created"}{" "}
                        {format(new Date(k.createdAtMs), "MMM d, yyyy")}
                      </span>
                      <span>·</span>
                      <span>
                        {k.lastUsedAtMs
                          ? `${isDe ? "Zuletzt genutzt" : "Last used"} ${formatDistanceToNow(
                              new Date(k.lastUsedAtMs),
                              { addSuffix: true }
                            )}`
                          : isDe
                            ? "Noch nicht genutzt"
                            : "Never used"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {!k.isRevoked && (
                    <IconButton
                      variant="subtle"
                      size="sm"
                      onClick={() => onRevokeApiKey(k.id)}
                      aria-label={`Revoke ${k.name}`}
                      title={isDe ? "Schlüssel widerrufen" : "Revoke key"}
                      className="h-8 w-8 enabled:hover:border-amber-400/40 enabled:hover:text-amber-300"
                    >
                      <Ban className="h-3.5 w-3.5" />
                    </IconButton>
                  )}
                  <IconButton
                    variant="subtle"
                    size="sm"
                    onClick={() => onDeleteApiKey(k.id)}
                    aria-label={`Delete ${k.name}`}
                    title={isDe ? "Schlüssel löschen" : "Delete key"}
                    className="h-8 w-8 enabled:hover:border-rose-400/40 enabled:hover:text-rose-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </IconButton>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Collapsible API usage preview */}
        <div className="mt-4 rounded-2xl border border-white/[0.06] bg-[#090d14]/80">
          <button
            type="button"
            onClick={() => setShowDocs((v) => !v)}
            className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left text-xs font-medium text-zinc-300 transition hover:text-white"
          >
            <span className="inline-flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-[#3ff2e0]" />
              {isDe
                ? "API-Authentifizierung (Vorschau)"
                : "API Authentication (Preview)"}
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-zinc-400 transition-transform ${
                showDocs ? "rotate-180" : ""
              }`}
            />
          </button>
          {showDocs && (
            <div className="border-t border-white/[0.06] px-4 py-3">
              <p className="mb-2 text-[11px] text-zinc-400">
                {isDe
                  ? "Sende deinen API-Schlüssel als Bearer-Token im Authorization-Header:"
                  : "Send your secret key as a Bearer token in the Authorization header:"}
              </p>
              <pre className="overflow-x-auto rounded-xl border border-white/[0.06] bg-[#05070c] p-3 font-mono text-[11px] leading-relaxed text-zinc-300">
{`curl -X POST https://arcbids.com/api/v1/auctions \\
  -H "Authorization: Bearer ab_live_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Q2 Wholesale Drop", "currency": "EUR"}'`}
              </pre>
            </div>
          )}
        </div>
      </GlowCard>

      <Dialog
        open={createOpen}
        onClose={handleCloseModal}
        title={
          revealedKey
            ? isDe
              ? "API-Schlüssel erstellt"
              : "API Key Created"
            : isDe
              ? "Neuen API-Schlüssel erstellen"
              : "Create New API Key"
        }
        description={
          revealedKey
            ? isDe
              ? "Kopiere diesen Schlüssel jetzt — aus Sicherheitsgründen wird er nicht erneut angezeigt."
              : "Copy this key now — for security reasons it will never be shown again."
            : isDe
              ? "Vergib einen eindeutigen Namen, damit du später weißt, wo der Schlüssel genutzt wird."
              : "Give this key a descriptive name so you can identify where it is used."
        }
      >
        {revealedKey ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-amber-400/25 bg-amber-500/10 p-3.5 text-xs text-amber-200">
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <p>
                  {isDe
                    ? "Speichere diesen Schlüssel sicher (z. B. in deinem Passwort-Manager oder als Umgebungsvariable). Wir speichern nur einen kryptografischen Hash."
                    : "Store this secret safely (e.g. in your password manager or environment variables). We only store a SHA-256 hash on our servers."}
                </p>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium text-zinc-400">
                {revealedKey.name}
              </label>
              <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-[#3ff2e0]/30 bg-[#05070c] px-3 py-2.5">
                <code className="min-w-0 flex-1 break-all font-mono text-xs text-[#3ff2e0]">
                  {revealedKey.secret}
                </code>
                <button
                  type="button"
                  onClick={() => void handleCopySecret()}
                  className="inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-[#e4fffb] px-3 text-xs font-semibold text-[#04070b] transition hover:bg-white"
                >
                  {copiedSecret ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      {isDe ? "Kopiert" : "Copied"}
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      {isDe ? "Kopieren" : "Copy"}
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleCloseModal}
                className="h-9 cursor-pointer rounded-full border border-white/10 bg-white/[0.06] px-4 text-xs font-semibold text-white transition hover:bg-white/[0.12]"
              >
                {isDe ? "Fertig" : "Done"}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => void handleCreateSubmit(e)} className="space-y-4">
            <div>
              <label
                htmlFor="api-key-name"
                className="text-xs font-medium text-zinc-300"
              >
                {isDe ? "Schlüsselname" : "Key Name"}
              </label>
              <input
                id="api-key-name"
                type="text"
                required
                autoFocus
                maxLength={80}
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder={
                  isDe ? "z. B. ERP-Integration, Lager-Sync" : "e.g. ERP Integration, Inventory Sync"
                }
                className="mt-1.5 h-10 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={handleCloseModal}
                className="h-9 cursor-pointer rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
              >
                {isDe ? "Abbrechen" : "Cancel"}
              </button>
              <button
                type="submit"
                disabled={creating || !keyName.trim()}
                className="h-9 cursor-pointer rounded-full bg-[#e4fffb] px-4 text-xs font-semibold text-[#04070b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {creating
                  ? isDe
                    ? "Wird erstellt…"
                    : "Creating…"
                  : isDe
                    ? "Schlüssel erstellen"
                    : "Create Key"}
              </button>
            </div>
          </form>
        )}
      </Dialog>
    </>
  );
}
