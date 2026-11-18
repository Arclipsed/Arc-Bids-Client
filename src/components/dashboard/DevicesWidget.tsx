"use client";

import { formatDistanceToNow } from "date-fns";
import { Laptop, Monitor, Smartphone, Tablet, Trash2 } from "lucide-react";
import { GlowCard, GlowCardHeader } from "@/components/ui/glow-bento-card";
import { IconButton } from "@/components/ui/icon-button";

export interface DeviceRow {
  id: bigint;
  deviceId: string;
  deviceName: string;
  deviceType: string;
  isOnline: boolean;
  lastSeenMs: number;
}

interface DevicesWidgetProps {
  devices: DeviceRow[];
  currentDeviceId: string;
  onRemoveDevice: (id: bigint) => void;
  className?: string;
}

function DeviceIcon({ type }: { type: string }) {
  if (type === "mobile") return <Smartphone className="h-4 w-4 text-[#3ff2e0]" />;
  if (type === "tablet") return <Tablet className="h-4 w-4 text-[#3ff2e0]" />;
  return <Laptop className="h-4 w-4 text-[#3ff2e0]" />;
}

export function DevicesWidget({
  devices,
  currentDeviceId,
  onRemoveDevice,
  className,
}: DevicesWidgetProps) {
  const sorted = [...devices].sort((a, b) => {
    if (a.deviceId === currentDeviceId) return -1;
    if (b.deviceId === currentDeviceId) return 1;
    if (a.isOnline !== b.isOnline) return a.isOnline ? -1 : 1;
    return b.lastSeenMs - a.lastSeenMs;
  });

  return (
    <GlowCard accent="teal" className={className}>
      <GlowCardHeader
        title="Logged-In Devices"
        icon={<Monitor className="h-4 w-4 text-[#3ff2e0]" />}
        right={
          <span className="font-mono text-[11px] text-zinc-400">
            {sorted.length} {sorted.length === 1 ? "device" : "devices"}
          </span>
        }
      />

      <div className="space-y-2">
        {sorted.length === 0 ? (
          <p className="rounded-2xl border border-white/[0.05] bg-[#0e1420]/60 p-5 text-center text-xs text-zinc-400">
            No devices registered yet.
          </p>
        ) : (
          sorted.map((d) => {
            const isCurrent = d.deviceId === currentDeviceId;
            return (
              <div
                key={d.id.toString()}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-[#0e1420]/70 px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#090d14]">
                    <DeviceIcon type={d.deviceType} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-semibold text-white">
                        {d.deviceName}
                      </p>
                      {isCurrent && (
                        <span className="rounded-full border border-[#3ff2e0]/30 bg-[#3ff2e0]/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#3ff2e0]">
                          This device
                        </span>
                      )}
                      {d.isOnline ? (
                        <span
                          title="Online"
                          aria-label="Online"
                          className="inline-flex items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-500/10 p-1.5"
                        >
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                          </span>
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-zinc-500">
                          Last seen{" "}
                          {formatDistanceToNow(new Date(d.lastSeenMs), {
                            addSuffix: true,
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {!isCurrent && (
                  <IconButton
                    variant="subtle"
                    size="sm"
                    onClick={() => onRemoveDevice(d.id)}
                    aria-label={`Remove ${d.deviceName}`}
                    title="Remove device"
                    className="h-8 w-8 shrink-0 enabled:hover:border-rose-400/40 enabled:hover:text-rose-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </IconButton>
                )}
              </div>
            );
          })
        )}
      </div>
    </GlowCard>
  );
}
