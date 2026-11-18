"use client";

import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";

interface DangerZoneWidgetProps {
  orgName: string;
  onDeleteAccount: () => Promise<void>;
  className?: string;
}

export function DangerZoneWidget({
  orgName,
  onDeleteAccount,
  className,
}: DangerZoneWidgetProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const canConfirm = confirmText.trim().toUpperCase() === "DELETE";

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canConfirm || deleting) return;
    setDeleting(true);
    try {
      await onDeleteAccount();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <section
        className={`rounded-3xl border border-rose-500/20 bg-rose-950/10 p-6 ${className ?? ""}`}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <h2 className="text-sm font-semibold tracking-tight">
                Danger Zone
              </h2>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-zinc-400">
              Permanently delete <strong className="text-zinc-200">{orgName}</strong>, all
              auction rooms, lots, uploaded images, bids, buyer email lists, and any
              unused or reserved <strong className="text-rose-300">Auction Tickets</strong>{" "}
              (tickets are <strong className="text-rose-300">lost and non-refundable</strong>).
              This cannot be undone.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setConfirmText("");
              setConfirmOpen(true);
            }}
            className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border border-rose-500/35 bg-rose-500/15 px-5 text-xs font-semibold text-rose-300 transition hover:border-rose-400/60 hover:bg-rose-500/25 hover:text-white"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete Account &amp; Data
          </button>
        </div>
      </section>

      <Dialog
        open={confirmOpen}
        onClose={() => !deleting && setConfirmOpen(false)}
        title="Delete Account & All Data"
        description="This will permanently erase your organization, all auctions, lots, bids, uploaded images, and buyer email lists. Any unused or reserved Auction Tickets will be permanently lost and are non-refundable."
      >
        <form onSubmit={handleConfirm} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-zinc-300">
              Type <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-rose-300">DELETE</code> to confirm
            </label>
            <input
              type="text"
              autoFocus
              required
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              className="mt-1.5 h-10 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 font-mono text-sm text-white placeholder:text-zinc-600 outline-none focus:border-rose-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              disabled={deleting}
              onClick={() => setConfirmOpen(false)}
              className="h-9 cursor-pointer rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.08] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canConfirm || deleting}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full bg-rose-500 px-5 text-xs font-semibold text-white transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {deleting ? "Deleting…" : "Permanently Delete"}
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
