"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/format";
import { IconButton } from "@/components/ui/icon-button";
import { Dialog } from "@/components/ui/dialog";
import Calendar14 from "@/components/ui/c-calendar-14";
import { CreateLotForm, type DraftLot } from "@/components/dashboard/CreateLotForm";
import type { ITranslation } from "@/translations/ITranslation";
import { EN } from "@/translations/en/en";

export type CurrencyCode = "EUR" | "USD";

export interface CreateAuctionPayload {
  roomTitle: string;
  currency: CurrencyCode;
  lotDurationSec: number;
  antiSnipeSec: number;
  minBidIncrementCents: bigint;
  allowAutoBid: boolean;
  isPublic: boolean;
  scheduledDate?: Date;
  scheduledTime?: string | null;
  lots: DraftLot[];
}

export interface CreateAuctionFormInitialValues {
  roomTitle?: string;
  currency?: CurrencyCode;
  lotDurationSec?: number;
  antiSnipeSec?: number;
  minBidIncrementCents?: bigint;
  isPublic?: boolean;
  scheduledAtMs?: number | null;
  lots?: DraftLot[];
}

interface CreateAuctionFormProps {
  mode?: "create" | "edit";
  initialValues?: CreateAuctionFormInitialValues;
  copy?: ITranslation["DashboardPage"]["Copy"];
  onSubmit: (payload: CreateAuctionPayload) => void;
  onCancel: () => void;
}

export function CreateAuctionForm({
  mode = "create",
  initialValues,
  copy = EN.DashboardPage.Copy,
  onSubmit,
  onCancel,
}: CreateAuctionFormProps) {
  const isEdit = mode === "edit";
  const initialScheduled = initialValues?.scheduledAtMs
    ? new Date(initialValues.scheduledAtMs)
    : null;

  const [roomTitle, setRoomTitle] = useState(initialValues?.roomTitle ?? "");
  const [currency, setCurrency] = useState<CurrencyCode>(
    initialValues?.currency ?? "EUR"
  );
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [lotDurationSec, setLotDurationSec] = useState(
    String(initialValues?.lotDurationSec ?? 120)
  );
  const [antiSnipeSec, setAntiSnipeSec] = useState(
    String(initialValues?.antiSnipeSec ?? 15)
  );
  const [minStepDollars, setMinStepDollars] = useState(
    initialValues?.minBidIncrementCents
      ? String(Number(initialValues.minBidIncrementCents) / 100)
      : "50"
  );
  const [allowAutoBid, setAllowAutoBid] = useState(true);
  const [isPublic, setIsPublic] = useState(initialValues?.isPublic ?? false);
  const [showSchedule, setShowSchedule] = useState(Boolean(initialScheduled));
  const [scheduledDate, setScheduledDate] = useState<Date>(
    () => initialScheduled ?? new Date()
  );
  const [scheduledTime, setScheduledTime] = useState<string | null>(
    initialScheduled ? format(initialScheduled, "HH:mm") : null
  );

  const [lots, setLots] = useState<DraftLot[]>(initialValues?.lots ?? []);
  const [addLotOpen, setAddLotOpen] = useState(false);
  const [editingLotIndex, setEditingLotIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomTitle.trim() || lots.length === 0) return;

    onSubmit({
      roomTitle: roomTitle.trim(),
      currency,
      lotDurationSec: Math.max(15, Number(lotDurationSec) || 120),
      antiSnipeSec: Math.max(0, Number(antiSnipeSec) || 15),
      minBidIncrementCents: BigInt(
        Math.max(100, Math.round((Number(minStepDollars) || 50) * 100))
      ),
      allowAutoBid,
      isPublic,
      scheduledDate: scheduledTime ? scheduledDate : undefined,
      scheduledTime,
      lots,
    });
  };

  const currencySymbol = currency === "EUR" ? "€" : "$";

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Room Settings */}
        <div className="space-y-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3ff2e0]">
            {copy.RoomSettingsHeading}
          </p>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-4">
            <div className="sm:col-span-3">
              <label className="text-xs font-medium text-zinc-300">
                {copy.RoomTitleLabel}
              </label>
              <input
                type="text"
                required
                value={roomTitle}
                onChange={(e) => setRoomTitle(e.target.value)}
                placeholder={copy.RoomTitlePlaceholder}
                className="mt-1.5 h-10 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
              />
            </div>

            <div className="relative">
              <label className="text-xs font-medium text-zinc-300">
                {copy.CurrencyLabel}
              </label>
              <button
                type="button"
                onClick={() => setCurrencyOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={currencyOpen}
                className="mt-1.5 flex h-10 w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-[#0e1420] px-3 text-sm font-semibold text-white outline-none transition hover:border-white/20 focus:border-[#3ff2e0]"
              >
                <span>{currencySymbol}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-150 ${
                    currencyOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {currencyOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 top-full z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0e1420] p-1 shadow-xl shadow-black/60"
                >
                  {(
                    [
                      { code: "EUR", symbol: "€" },
                      { code: "USD", symbol: "$" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      role="option"
                      aria-selected={currency === opt.code}
                      onClick={() => {
                        setCurrency(opt.code);
                        setCurrencyOpen(false);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-center rounded-lg py-1.5 text-sm font-semibold transition ${
                        currency === opt.code
                          ? "bg-[#e4fffb] text-[#04070b]"
                          : "text-zinc-200 hover:bg-white/[0.08]"
                      }`}
                    >
                      {opt.symbol}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="text-[11px] font-medium text-zinc-400">
                {copy.LotTimerLabel}
              </label>
              <input
                type="number"
                min={15}
                value={lotDurationSec}
                onChange={(e) => setLotDurationSec(e.target.value)}
                className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 font-mono text-xs text-white outline-none focus:border-[#3ff2e0]"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-400">
                {copy.AntiSnipeLabel}
              </label>
              <input
                type="number"
                min={0}
                value={antiSnipeSec}
                onChange={(e) => setAntiSnipeSec(e.target.value)}
                className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 font-mono text-xs text-white outline-none focus:border-[#3ff2e0]"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-400">
                {copy.MinStepLabel} ({currencySymbol})
              </label>
              <input
                type="number"
                min={1}
                value={minStepDollars}
                onChange={(e) => setMinStepDollars(e.target.value)}
                className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 font-mono text-xs text-white outline-none focus:border-[#3ff2e0]"
              />
            </div>
          </div>

          {/* Public / Invite-Only Toggle */}
          <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-[#0e1420]/70 px-3.5 py-2.5">
            <div>
              <p className="text-xs font-medium text-white">
                {copy.PublicAuctionTitle}
              </p>
              <p className="text-[11px] text-zinc-400">
                {isPublic ? copy.PublicAuctionOnDesc : copy.PublicAuctionOffDesc}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isPublic}
              aria-label="Public Auction"
              onClick={() => setIsPublic((v) => !v)}
              className="inline-flex cursor-pointer items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ff2e0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1420]"
            >
              <span
                className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-200 ${
                  isPublic
                    ? "border-[#3ff2e0]/50 bg-[#3ff2e0]/25"
                    : "border-white/15 bg-white/[0.06]"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 rounded-full transition-transform duration-200 ${
                    isPublic
                      ? "translate-x-[18px] bg-[#3ff2e0] shadow-[0_0_8px_rgba(63,242,224,0.6)]"
                      : "translate-x-[3px] bg-zinc-400"
                  }`}
                />
              </span>
            </button>
          </div>

          {/* Enable Auto-Bid Toggle */}
          <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-[#0e1420]/70 px-3.5 py-2.5">
            <div>
              <p className="text-xs font-medium text-white">
                {copy.AutoBidTitle}
              </p>
              <p className="text-[11px] text-zinc-400">
                {copy.AutoBidDesc}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={allowAutoBid}
              aria-label="Enable Auto-Bid"
              onClick={() => setAllowAutoBid((v) => !v)}
              className="inline-flex cursor-pointer items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ff2e0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1420]"
            >
              <span
                className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-200 ${
                  allowAutoBid
                    ? "border-[#3ff2e0]/50 bg-[#3ff2e0]/25"
                    : "border-white/15 bg-white/[0.06]"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 rounded-full transition-transform duration-200 ${
                    allowAutoBid
                      ? "translate-x-[18px] bg-[#3ff2e0] shadow-[0_0_8px_rgba(63,242,224,0.6)]"
                      : "translate-x-[3px] bg-zinc-400"
                  }`}
                />
              </span>
            </button>
          </div>

          {/* Schedule Start Date & Time */}
          <div className="space-y-2.5">
            <div className="flex w-full items-center justify-between gap-2 rounded-2xl border border-white/[0.06] bg-[#0e1420]/70 px-3.5 py-2.5 transition hover:border-white/15">
              <button
                type="button"
                onClick={() => setShowSchedule((v) => !v)}
                className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
              >
                <CalendarIcon className="h-4 w-4 shrink-0 text-[#3ff2e0]" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white">
                    {copy.ScheduleTitle}
                  </p>
                  <p className="truncate text-[11px] text-zinc-400">
                    {scheduledTime
                      ? `${format(scheduledDate, "EEE, MMM d")} ${copy.ScheduleAtWord} ${scheduledTime}`
                      : copy.ScheduleOptionalPrefix}
                  </p>
                </div>
              </button>

              <div className="flex shrink-0 items-center gap-1.5">
                {scheduledTime && (
                  <IconButton
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setScheduledTime(null);
                      setShowSchedule(false);
                    }}
                    aria-label="Clear scheduled start time"
                    className="enabled:hover:text-rose-400"
                  >
                    <X className="h-3.5 w-3.5" />
                  </IconButton>
                )}
                <IconButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSchedule((v) => !v)}
                  aria-label={showSchedule ? "Collapse schedule" : "Expand schedule"}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      showSchedule ? "rotate-180" : ""
                    }`}
                  />
                </IconButton>
              </div>
            </div>

            {showSchedule && (
              <div className="w-full">
                <Calendar14
                  selectedDate={scheduledDate}
                  selectedTime={scheduledTime}
                  onSelect={(d, t) => {
                    setScheduledDate(d);
                    setScheduledTime(t);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Lots List */}
        <div className="space-y-3 border-t border-white/[0.06] pt-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3ff2e0]">
              {copy.LotsHeading} ({lots.length})
            </p>
          </div>

          {lots.length > 0 && (
            <ul className="space-y-2">
              {lots.map((lot, idx) => (
                <li
                  key={lot.id ? lot.id.toString() : `${lot.title}-${idx}`}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-[#0e1420]/70 px-3.5 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-white">
                      #{idx + 1} · {lot.title}
                    </p>
                    <p className="font-mono text-[11px] text-zinc-400">
                      {lot.quantity > 1 ? `${lot.quantity} units · ` : ""}
                      Start {formatCurrency(lot.startingPriceCents, currency)}
                      {lot.images.length > 0
                        ? ` · ${lot.images.length} ${lot.images.length === 1 ? "image" : "images"}`
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconButton
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingLotIndex(idx)}
                      aria-label={`Edit ${lot.title}`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </IconButton>
                    <IconButton
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setLots((prev) => prev.filter((_, i) => i !== idx))
                      }
                      aria-label={`Remove ${lot.title}`}
                      className="enabled:hover:text-rose-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={() => setAddLotOpen(true)}
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] text-xs font-semibold text-zinc-200 transition hover:border-[#3ff2e0]/40 hover:bg-[#3ff2e0]/[0.05] hover:text-[#3ff2e0]"
          >
            <Plus className="h-3.5 w-3.5" />
            {copy.AddLot}
          </button>
          {lots.length === 0 && (
            <p className="text-[11px] text-amber-300/90">
              {isEdit ? copy.AddLotHintEdit : copy.AddLotHintCreate}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 border-t border-white/[0.06] pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 cursor-pointer rounded-full border border-white/10 bg-white/[0.04] px-5 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.08]"
          >
            {copy.Cancel}
          </button>
          <button
            type="submit"
            disabled={lots.length === 0}
            className="h-10 cursor-pointer rounded-full bg-[#e4fffb] px-6 text-xs font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_20px_rgba(63,242,224,0.2)] transition enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isEdit ? copy.SaveChanges : copy.CreateAuctionAction}
          </button>
        </div>
      </form>

      <Dialog
        open={addLotOpen || editingLotIndex !== null}
        onClose={() => {
          setAddLotOpen(false);
          setEditingLotIndex(null);
        }}
        title={editingLotIndex !== null ? copy.EditLotTitle : copy.AddLotTitle}
        description={
          editingLotIndex !== null ? copy.EditLotDesc : copy.AddLotDesc
        }
      >
        <CreateLotForm
          key={editingLotIndex !== null ? `edit-${editingLotIndex}` : "add-lot"}
          currencySymbol={currencySymbol}
          initialLot={
            editingLotIndex !== null ? lots[editingLotIndex] : undefined
          }
          submitLabel={editingLotIndex !== null ? copy.SaveLotAction : copy.AddLot}
          copy={copy}
          onSubmit={(lot) => {
            if (editingLotIndex !== null) {
              setLots((prev) =>
                prev.map((item, i) => (i === editingLotIndex ? lot : item))
              );
              setEditingLotIndex(null);
            } else {
              setLots((prev) => [...prev, lot]);
              setAddLotOpen(false);
            }
          }}
          onCancel={() => {
            setAddLotOpen(false);
            setEditingLotIndex(null);
          }}
        />
      </Dialog>
    </>
  );
}
