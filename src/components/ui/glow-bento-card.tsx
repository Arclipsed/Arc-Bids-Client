"use client";

import { useState } from "react";
import type { MouseEvent, ReactNode, TouchEvent } from "react";
import { cn } from "@/lib/utils";

export type GlowAccent = "teal" | "indigo" | "cyan" | "emerald" | "fuchsia" | "amber";

const ACCENTS: Record<GlowAccent, string> = {
  teal: "63, 242, 224",
  indigo: "129, 140, 248",
  cyan: "34, 211, 238",
  emerald: "52, 211, 153",
  fuchsia: "232, 121, 249",
  amber: "251, 191, 36",
};

const GRID_IMAGE =
  "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)";

export function GlowCard({
  accent = "teal",
  className,
  children,
}: {
  accent?: GlowAccent;
  className?: string;
  children: ReactNode;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const rgb = ACCENTS[accent];

  const moveTo = (clientX: number, clientY: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    setPos({ x: clientX - rect.left, y: clientY - rect.top });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) =>
    moveTo(e.clientX, e.clientY, e.currentTarget);

  const handleTouch = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      moveTo(touch.clientX, touch.clientY, e.currentTarget);
      setActive(true);
    }
  };

  const gridMask = `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, black, transparent 75%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setActive(false);
        }
      }}
      className={cn("relative rounded-3xl", className)}
    >
      {/* Dim outer border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl bg-white/[0.09]"
      />

      {/* Cursor-following border glow */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-500",
          active ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(240px circle at ${pos.x}px ${pos.y}px, rgba(${rgb}, 0.85), transparent 70%)`,
        }}
      />

      {/* Card face + inner spotlight + subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-px overflow-hidden rounded-[23px] bg-[#090d14]"
      >
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            active ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, rgba(${rgb}, 0.12), transparent 65%)`,
          }}
        />
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            active ? "opacity-100" : "opacity-0"
          )}
          style={{
            backgroundImage: GRID_IMAGE,
            backgroundSize: "26px 26px",
            maskImage: gridMask,
            WebkitMaskImage: gridMask,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
        {children}
      </div>
    </div>
  );
}

export function GlowCardHeader({
  title,
  icon,
  right,
}: {
  title: ReactNode;
  icon?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        {icon && <span className="text-[#3ff2e0]">{icon}</span>}
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      {right}
    </div>
  );
}

export function GlowLiveBadge({ label = "Live" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#3ff2e0]">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3ff2e0]" />
      {label}
    </span>
  );
}

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-5 lg:grid-cols-12", className)}>
      {children}
    </div>
  );
}
