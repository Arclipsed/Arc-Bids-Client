"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronDown,
  Lock,
  Ticket,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { IconButton } from "@/components/ui/icon-button";
import Calendar14 from "@/components/ui/c-calendar-14";
import type { DraftLot } from "@/components/dashboard/CreateLotForm";
import type { ITranslation } from "@/translations/ITranslation";
import { EN } from "@/translations/en/en";

export type CurrencyCode = "EUR" | "USD";

export interface BuyerListOption {
  id: bigint;
  name: string;
  memberCount: number;
}

export interface CreateAuctionPayload {
  roomTitle: string;
  currency: CurrencyCode;
  lotDurationSec: number;
  antiSnipeSec: number;
  minBidIncrementCents: bigint;
  allowAutoBid: boolean;
  isPublic: boolean;
  allowedListIds: bigint[];
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
  allowedListIds?: bigint[];
  allowAutoBid?: boolean;
  scheduledAtMs?: number | null;
  lots?: DraftLot[];
}

interface CreateAuctionFormProps {
  mode?: "create" | "edit";
  initialValues?: CreateAuctionFormInitialValues;
  buyerLists?: BuyerListOption[];
  copy?: ITranslation["DashboardPage"]["Copy"];
  isDe?: boolean;
  auctionCredits?: number;
  initialHasTicket?: boolean;
  stripeConfigured?: boolean;
  onBuyTicket?: () => void;
  onSubmit: (payload: CreateAuctionPayload) => void;
  onCancel: () => void;
}

export function CreateAuctionForm({
  mode = "create",
  initialValues,
  buyerLists = [],
  copy = EN.DashboardPage.Copy,
  isDe = false,
  auctionCredits = 0,
  initialHasTicket = false,
  stripeConfigured = false,
  onBuyTicket,
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
  const [allowAutoBid, setAllowAutoBid] = useState(
    initialValues?.allowAutoBid ?? true
  );
  const [isPublic, setIsPublic] = useState(initialValues?.isPublic ?? false);
  const [allowedListIds, setAllowedListIds] = useState<bigint[]>(
    initialValues?.allowedListIds ?? []
  );
  const [showSchedule, setShowSchedule] = useState(Boolean(initialScheduled));
  const [scheduledDate, setScheduledDate] = useState<Date>(
    () => initialScheduled ?? new Date()
  );
  const [scheduledTime, setScheduledTime] = useState<string | null>(
    initialScheduled ? format(initialScheduled, "HH:mm") : null
  );

  const scheduleLocked = !initialHasTicket && auctionCredits === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomTitle.trim()) return;
    if (scheduleLocked && scheduledTime) return;

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
      allowedListIds: isPublic ? [] : allowedListIds,
      scheduledDate: scheduledTime ? scheduledDate : undefined,
      scheduledTime,
      lots: initialValues?.lots ?? [],
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

          {/* Private Auction Only Toggle + Whitelisted Lists */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#0e1420]/70 px-3.5 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="flex items-center gap-1.5 text-xs font-medium text-white">
                  <Lock className="h-3.5 w-3.5 text-[#3ff2e0]" />
                  Private Auction Only
                </p>
                <p className="text-[11px] text-zinc-400">
                  {!isPublic
                    ? "Enabled · only whitelisted buyers can enter and bid"
                    : "Disabled · anyone with the link can join"}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={!isPublic}
                aria-label="Private Auction Only"
                onClick={() => setIsPublic((v) => !v)}
                className="inline-flex cursor-pointer items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ff2e0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1420]"
              >
                <span
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-200 ${
                    !isPublic
                      ? "border-[#3ff2e0]/50 bg-[#3ff2e0]/25"
                      : "border-white/15 bg-white/[0.06]"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 rounded-full transition-transform duration-200 ${
                      !isPublic
                        ? "translate-x-[18px] bg-[#3ff2e0] shadow-[0_0_8px_rgba(63,242,224,0.6)]"
                        : "translate-x-[3px] bg-zinc-400"
                    }`}
                  />
                </span>
              </button>
            </div>

            {!isPublic && (
              <div className="mt-3 space-y-2 border-t border-white/[0.06] pt-3">
                <p className="text-[11px] font-medium text-zinc-300">
                  {isDe
                    ? "Käuferlisten für Whitelist wählen"
                    : "Choose Buyer Lists to Whitelist"}
                </p>
                {buyerLists.length === 0 ? (
                  <p className="text-[11px] text-zinc-400">
                    {isDe
                      ? "Noch keine Käuferlisten erstellt. Erstellen Sie eine Liste im Dashboard, um den Zugang einzuschränken."
                      : "No buyer lists created yet. Create a list on your dashboard to restrict access to specific buyers."}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {buyerLists.map((list) => {
                      const selected = allowedListIds.some((id) => id === list.id);
                      return (
                        <button
                          key={list.id.toString()}
                          type="button"
                          onClick={() =>
                            setAllowedListIds((prev) =>
                              selected
                                ? prev.filter((id) => id !== list.id)
                                : [...prev, list.id]
                            )
                          }
                          className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                            selected
                              ? "border-[#3ff2e0]/50 bg-[#3ff2e0]/15 text-[#3ff2e0]"
                              : "border-white/10 bg-[#090d14] text-zinc-300 hover:border-white/25"
                          }`}
                        >
                          <span
                            className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                              selected
                                ? "border-[#3ff2e0] bg-[#3ff2e0] text-[#04070b]"
                                : "border-white/25"
                            }`}
                          >
                            {selected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                          </span>
                          <span>{list.name}</span>
                          <span className="font-mono text-[10px] opacity-75">
                            ({list.memberCount})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
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
            <div
              className={`flex w-full justify-between gap-3 rounded-2xl border px-3.5 py-3 transition ${
                scheduleLocked
                  ? "flex-col border-amber-400/20 bg-amber-500/[0.04] sm:flex-row sm:items-center"
                  : "items-center border-white/[0.06] bg-[#0e1420]/70 hover:border-white/15"
              }`}
            >
              <button
                type="button"
                disabled={scheduleLocked}
                onClick={() => setShowSchedule((v) => !v)}
                className={`flex min-w-0 flex-1 items-start gap-2.5 text-left sm:items-center ${
                  scheduleLocked ? "cursor-not-allowed opacity-80" : "cursor-pointer"
                }`}
              >
                {scheduleLocked ? (
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-amber-300 sm:mt-0" />
                ) : (
                  <CalendarIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#3ff2e0] sm:mt-0" />
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="whitespace-nowrap text-xs font-medium text-white">
                      {copy.ScheduleTitle}
                    </p>
                    {scheduleLocked && (
                      <span className="whitespace-nowrap rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-300">
                        {isDe ? "1 Ticket nötig" : "Needs 1 Ticket"}
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-0.5 text-[11px] text-zinc-400 ${
                      scheduleLocked ? "leading-relaxed" : "truncate"
                    }`}
                  >
                    {scheduleLocked
                      ? isDe
                        ? "1 Auktions-Ticket (10 €) kaufen, um Startzeiten zu planen"
                        : "Buy 1 Auction Ticket (€10) to unlock scheduled start times"
                      : scheduledTime
                        ? `${format(scheduledDate, "EEE, MMM d")} ${copy.ScheduleAtWord} ${scheduledTime}`
                        : copy.ScheduleOptionalPrefix}
                  </p>
                </div>
              </button>

              <div
                className={`flex shrink-0 items-center gap-1.5 ${
                  scheduleLocked ? "w-full sm:w-auto" : ""
                }`}
              >
                {scheduleLocked ? (
                  stripeConfigured && onBuyTicket ? (
                    <button
                      type="button"
                      onClick={onBuyTicket}
                      className="w-full cursor-pointer whitespace-nowrap rounded-full bg-amber-300 px-3.5 py-1.5 text-center text-[11px] font-semibold text-[#04070b] transition hover:bg-amber-200 sm:w-auto sm:py-1"
                    >
                      {isDe ? "Ticket · 10 €" : "Buy Ticket · €10"}
                    </button>
                  ) : null
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>

            {!scheduleLocked && showSchedule && (
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

        {/* Ticket Notice */}
        {(() => {
          const needsTicketForSchedule =
            (showSchedule || Boolean(scheduledTime)) && scheduleLocked;
          return (
            <>
              <div
                className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-3.5 py-2.5 text-xs ${
                  needsTicketForSchedule
                    ? "border-amber-400/30 bg-amber-500/10 text-amber-200"
                    : "border-white/[0.06] bg-[#0e1420]/60 text-zinc-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Ticket
                    className={`h-4 w-4 shrink-0 ${
                      needsTicketForSchedule ? "text-amber-300" : "text-[#3ff2e0]"
                    }`}
                  />
                  <span>
                    {showSchedule ? (
                      initialHasTicket ? (
                        isDe
                          ? "1 Auktions-Ticket ist bereits für diese geplante Auktion reserviert."
                          : "1 Auction Ticket is already reserved for this scheduled auction."
                      ) : needsTicketForSchedule ? (
                        isDe
                          ? "Für die Planung ist 1 Auktions-Ticket (10 €) erforderlich, damit die Auktion pünktlich startet."
                          : "Scheduling requires 1 Auction Ticket (€10) so it auto-starts on time."
                      ) : isDe ? (
                        `Die Planung reserviert 1 Auktions-Ticket (${auctionCredits} verfügbar). Bei Stornierung vor Start erstattet.`
                      ) : (
                        `Scheduling reserves 1 Auction Ticket (${auctionCredits} available). Refunded if cancelled before start.`
                      )
                    ) : initialHasTicket ? (
                      isDe
                        ? "Beim Entfernen des Zeitplans wird Ihr reserviertes Ticket zurückerstattet."
                        : "Unscheduling will refund your reserved Auction Ticket back to your balance."
                    ) : isDe ? (
                      "Wird als kostenloser Entwurf gespeichert — 1 Auktions-Ticket (10 €) wird erst beim Starten oder Planen verbraucht."
                    ) : (
                      "Saving as a free draft — 1 Auction Ticket (€10) is only used when you Go Live or Schedule."
                    )}
                  </span>
                </div>
                {needsTicketForSchedule && onBuyTicket && (
                  <button
                    type="button"
                    onClick={onBuyTicket}
                    className="cursor-pointer rounded-full bg-amber-300 px-3 py-1 text-[11px] font-semibold text-[#04070b] transition hover:bg-amber-200"
                  >
                    {isDe ? "Ticket · 10 €" : "Buy Ticket · €10"}
                  </button>
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
                  disabled={!roomTitle.trim() || needsTicketForSchedule}
                  className="h-10 cursor-pointer rounded-full bg-[#e4fffb] px-6 text-xs font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_20px_rgba(63,242,224,0.2)] transition enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isEdit ? copy.SaveChanges : copy.CreateAuctionAction}
                </button>
              </div>
            </>
          );
        })()}
      </form>
    </>
  );
}
