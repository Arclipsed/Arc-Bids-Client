"use client";

import { useRef, useState } from "react";
import {
  Check,
  Copy,
  FileSpreadsheet,
  Pencil,
  Plus,
  ShieldBan,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { GlowCard, GlowCardHeader } from "@/components/ui/glow-bento-card";
import { IconButton } from "@/components/ui/icon-button";
import { Dialog } from "@/components/ui/dialog";

export interface BuyerListRow {
  id: bigint;
  orgId: bigint;
  name: string;
  description: string;
}

export interface BuyerListMemberRow {
  id: bigint;
  listId: bigint;
  orgId: bigint;
  companyName: string;
  email: string;
  isBanned: boolean;
}

interface BuyerListsWidgetProps {
  lists: BuyerListRow[];
  members: BuyerListMemberRow[];
  onCreateList: (name: string, description?: string) => void;
  onUpdateList: (listId: bigint, name: string, description?: string) => void;
  onDeleteList: (listId: bigint) => void;
  onAddMember: (listId: bigint, companyName: string, email: string) => void;
  onToggleBan: (memberId: bigint, isBanned: boolean) => void;
  onDeleteMember: (memberId: bigint) => void;
  className?: string;
}

function parseCsvBuyers(
  text: string
): Array<{ companyName: string; email: string }> {
  const results: Array<{ companyName: string; email: string }> = [];
  const seen = new Set<string>();
  const lines = text.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const parts = line
      .split(/[,;\t]/)
      .map((p) => p.trim().replace(/^["']|["']$/g, ""));

    let email = "";
    let companyName = "";

    for (const part of parts) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(part)) {
        email = part.toLowerCase();
      } else if (part && !companyName) {
        companyName = part;
      }
    }

    if (!email || seen.has(email)) continue;
    seen.add(email);

    results.push({
      email,
      companyName:
        companyName ||
        email
          .split("@")[0]
          .replace(/[._-]+/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
    });
  }

  return results;
}

export function BuyerListsWidget({
  lists,
  members,
  onCreateList,
  onUpdateList,
  onDeleteList,
  onAddMember,
  onToggleBan,
  onDeleteMember,
  className,
}: BuyerListsWidgetProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingList, setEditingList] = useState<BuyerListRow | null>(null);
  const [managingListId, setManagingListId] = useState<bigint | null>(null);

  const [listName, setListName] = useState("");
  const [listDesc, setListDesc] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [csvFeedback, setCsvFeedback] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const csvInputRef = useRef<HTMLInputElement | null>(null);

  const managingList =
    lists.find((l) => l.id === managingListId) ?? null;
  const managingMembers = managingList
    ? members.filter((m) => m.listId === managingList.id)
    : [];

  const openCreate = () => {
    setListName("");
    setListDesc("");
    setCreateOpen(true);
  };

  const openEdit = (list: BuyerListRow) => {
    setListName(list.name);
    setListDesc(list.description);
    setEditingList(list);
  };

  const openManage = (list: BuyerListRow) => {
    setCompanyName("");
    setEmail("");
    setCsvFeedback(null);
    setManagingListId(list.id);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listName.trim()) return;
    onCreateList(listName.trim(), listDesc.trim());
    setCreateOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingList || !listName.trim()) return;
    onUpdateList(editingList.id, listName.trim(), listDesc.trim());
    setEditingList(null);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!managingList || !email.trim()) return;
    const cleanEmail = email.trim().toLowerCase();
    const cleanCompany =
      companyName.trim() ||
      cleanEmail
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    onAddMember(managingList.id, cleanCompany, cleanEmail);
    setCompanyName("");
    setEmail("");
    setCsvFeedback(null);
  };

  const handleCsvUpload = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file || !managingList) return;
    try {
      const text = await file.text();
      const parsed = parseCsvBuyers(text);
      const existingEmails = new Set(
        managingMembers.map((m) => m.email.toLowerCase())
      );
      let added = 0;
      for (const row of parsed) {
        if (existingEmails.has(row.email)) continue;
        existingEmails.add(row.email);
        onAddMember(managingList.id, row.companyName, row.email);
        added++;
      }
      setCsvFeedback(
        added > 0
          ? `Imported ${added} ${added === 1 ? "buyer" : "buyers"} from CSV.`
          : "No new valid email addresses found in CSV."
      );
    } catch {
      setCsvFeedback("Failed to read CSV file.");
    } finally {
      if (csvInputRef.current) csvInputRef.current.value = "";
    }
  };

  const copyInvite = async (member: BuyerListMemberRow) => {
    const url = `${window.location.origin}/auction?token=${encodeURIComponent(member.email)}`;
    await navigator.clipboard.writeText(url);
    const key = member.id.toString();
    setCopiedId(key);
    window.setTimeout(
      () => setCopiedId((prev) => (prev === key ? null : prev)),
      1500
    );
  };

  return (
    <>
      <GlowCard accent="emerald" className={className}>
        <GlowCardHeader
          title="Buyer Email Lists"
          icon={<Users className="h-4 w-4 text-emerald-300" />}
          right={
            <IconButton
              variant="accent"
              size="sm"
              onClick={openCreate}
              aria-label="Create email list"
              title="Create email list"
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </IconButton>
          }
        />

        <div className="space-y-2">
          {lists.length === 0 ? (
            <p className="rounded-2xl border border-white/[0.05] bg-[#0e1420]/60 p-6 text-center text-xs text-zinc-400">
              No email lists yet. Click + above to create a list and whitelist buyers per auction.
            </p>
          ) : (
            lists.map((list) => {
              const count = members.filter((m) => m.listId === list.id).length;
              return (
                <div
                  key={list.id.toString()}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-[#0e1420]/70 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-semibold text-white">
                        {list.name}
                      </p>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] font-medium text-zinc-300">
                        {count} {count === 1 ? "buyer" : "buyers"}
                      </span>
                    </div>
                    {list.description && (
                      <p className="mt-0.5 truncate text-xs text-zinc-400">
                        {list.description}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <IconButton
                      variant="subtle"
                      size="sm"
                      onClick={() => openManage(list)}
                      aria-label={`Add or manage buyers in ${list.name}`}
                      title="Add / manage emails"
                      className="h-8 w-8"
                    >
                      <UserPlus className="h-3.5 w-3.5 text-[#3ff2e0]" />
                    </IconButton>
                    <IconButton
                      variant="subtle"
                      size="sm"
                      onClick={() => openEdit(list)}
                      aria-label={`Edit ${list.name}`}
                      title="Edit list"
                      className="h-8 w-8"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </IconButton>
                    <IconButton
                      variant="subtle"
                      size="sm"
                      onClick={() => onDeleteList(list.id)}
                      aria-label={`Delete ${list.name}`}
                      title="Delete list"
                      className="h-8 w-8 enabled:hover:border-rose-400/40 enabled:hover:text-rose-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </IconButton>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </GlowCard>

      {/* Create List Dialog */}
      <Dialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create Email List"
        description="Group buyer emails so you can whitelist them on any private auction."
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-medium text-zinc-400">
              List Name
            </label>
            <input
              type="text"
              required
              autoFocus
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="VIP Fleet Buyers"
              className="mt-1 h-10 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-zinc-400">
              Description (optional)
            </label>
            <input
              type="text"
              value={listDesc}
              onChange={(e) => setListDesc(e.target.value)}
              placeholder="Approved dealers for EU vehicle auctions"
              className="mt-1 h-10 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="h-9 cursor-pointer rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs font-medium text-zinc-300 hover:bg-white/[0.08]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-9 cursor-pointer rounded-full bg-[#e4fffb] px-5 text-xs font-semibold text-[#04070b] hover:bg-white"
            >
              Create List
            </button>
          </div>
        </form>
      </Dialog>

      {/* Edit List Dialog */}
      <Dialog
        open={Boolean(editingList)}
        onClose={() => setEditingList(null)}
        title="Edit Email List"
        description="Update the name or description for this buyer list."
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-medium text-zinc-400">
              List Name
            </label>
            <input
              type="text"
              required
              autoFocus
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="mt-1 h-10 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 text-sm text-white outline-none focus:border-[#3ff2e0]"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-zinc-400">
              Description (optional)
            </label>
            <input
              type="text"
              value={listDesc}
              onChange={(e) => setListDesc(e.target.value)}
              className="mt-1 h-10 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 text-xs text-white outline-none focus:border-[#3ff2e0]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingList(null)}
              className="h-9 cursor-pointer rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs font-medium text-zinc-300 hover:bg-white/[0.08]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-9 cursor-pointer rounded-full bg-[#e4fffb] px-5 text-xs font-semibold text-[#04070b] hover:bg-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Dialog>

      {/* Manage Buyers / Add Emails / CSV Import Dialog */}
      <Dialog
        open={Boolean(managingList)}
        onClose={() => setManagingListId(null)}
        title={managingList ? `${managingList.name} · Buyers` : "Manage Buyers"}
        description="Add buyers individually or import a CSV file (company,email or email per line)."
      >
        {managingList && (
          <div className="space-y-4">
            <form
              onSubmit={handleAddMember}
              className="flex flex-col gap-2 sm:flex-row sm:items-center"
            >
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company / Buyer name"
                className="h-9 w-full min-w-0 rounded-xl border border-white/10 bg-[#0e1420] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0] sm:w-auto sm:flex-1"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="buyer@company.com"
                className="h-9 w-full min-w-0 rounded-xl border border-white/10 bg-[#0e1420] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0] sm:w-auto sm:flex-1"
              />
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="submit"
                  className="inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-1 rounded-xl bg-[#e4fffb] px-3.5 text-xs font-semibold text-[#04070b] hover:bg-white sm:flex-initial"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Add
                </button>
                <input
                  ref={csvInputRef}
                  type="file"
                  accept=".csv,.txt,text/csv,text/plain"
                  className="hidden"
                  onChange={(e) => void handleCsvUpload(e.target.files)}
                />
                <IconButton
                  variant="subtle"
                  size="sm"
                  onClick={() => csvInputRef.current?.click()}
                  title="Import from CSV / TXT"
                  aria-label="Import from CSV or TXT"
                  className="h-9 w-9"
                >
                  <FileSpreadsheet className="h-4 w-4 text-[#3ff2e0]" />
                </IconButton>
              </div>
            </form>

            {csvFeedback && (
              <p className="text-xs font-medium text-[#3ff2e0]">
                {csvFeedback}
              </p>
            )}

            <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
              {managingMembers.length === 0 ? (
                <p className="rounded-2xl border border-white/[0.05] bg-[#0e1420]/60 p-5 text-center text-xs text-zinc-400">
                  No buyers in this list yet.
                </p>
              ) : (
                managingMembers.map((m) => {
                  const key = m.id.toString();
                  const isCopied = copiedId === key;
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-2 rounded-2xl border border-white/[0.06] bg-[#0e1420]/70 px-3.5 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-white">
                          {m.companyName}
                          {m.isBanned && (
                            <span className="ml-2 rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-medium text-rose-400">
                              Banned
                            </span>
                          )}
                        </p>
                        <p className="truncate font-mono text-[11px] text-zinc-400">
                          {m.email}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <IconButton
                          variant="subtle"
                          size="sm"
                          onClick={() => void copyInvite(m)}
                          title="Copy invite link"
                          aria-label={`Copy invite link for ${m.email}`}
                        >
                          {isCopied ? (
                            <Check className="h-3.5 w-3.5 text-[#3ff2e0]" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </IconButton>
                        <IconButton
                          variant="subtle"
                          size="sm"
                          onClick={() => onToggleBan(m.id, !m.isBanned)}
                          title={m.isBanned ? "Unban buyer" : "Ban buyer"}
                          aria-label={m.isBanned ? "Unban buyer" : "Ban buyer"}
                        >
                          <ShieldBan className="h-3.5 w-3.5" />
                        </IconButton>
                        <IconButton
                          variant="subtle"
                          size="sm"
                          onClick={() => onDeleteMember(m.id)}
                          title="Remove from list"
                          aria-label={`Remove ${m.email}`}
                          className="enabled:hover:border-rose-400/40 enabled:hover:text-rose-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </IconButton>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
