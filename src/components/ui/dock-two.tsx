"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DockItem {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  active?: boolean;
  badge?: number;
  variant?: "default" | "primary";
}

interface DockProps {
  className?: string;
  items: DockItem[];
}

interface DockIconButtonProps extends DockItem {
  className?: string;
}

const DockIconButton = React.forwardRef<HTMLButtonElement, DockIconButtonProps>(
  ({ icon: Icon, label, onClick, active, badge, variant = "default", className }, ref) => {
    const isPrimary = variant === "primary";

    return (
      <motion.button
        ref={ref}
        type="button"
        whileHover={{ scale: isPrimary ? 1.06 : 1.04, y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={onClick}
        aria-label={label}
        className={cn(
          "relative group flex cursor-pointer flex-col items-center justify-center gap-1 transition-colors",
          // Mobile: full-width grid cell with label underneath
          "py-1.5 sm:flex-row sm:gap-0 sm:rounded-xl sm:p-3",
          !isPrimary &&
            (active
              ? "text-[#3ff2e0] sm:bg-[#3ff2e0]/15 sm:shadow-[inset_0_0_0_1px_rgba(63,242,224,0.3)]"
              : "text-zinc-400 hover:text-white sm:hover:bg-white/[0.06]"),
          className
        )}
      >
        {isPrimary ? (
          <span className="relative -mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e4fffb] via-[#8af7ea] to-[#3ff2e0] text-[#04070b] shadow-[0_0_24px_rgba(63,242,224,0.45)] ring-1 ring-[#3ff2e0]/60 sm:mt-0 sm:h-10 sm:w-10 sm:rounded-xl">
            <Icon className="h-5 w-5 stroke-[2.5]" />
          </span>
        ) : (
          <span
            className={cn(
              "relative flex h-8 w-11 items-center justify-center rounded-xl transition-colors sm:h-auto sm:w-auto sm:rounded-none",
              active ? "bg-[#3ff2e0]/15 sm:bg-transparent" : ""
            )}
          >
            <Icon className="h-5 w-5" />
            {typeof badge === "number" && badge > 0 && (
              <span className="absolute -top-0.5 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3ff2e0] px-1 font-mono text-[9px] font-bold text-[#04070b] tabular-nums sm:-top-2 sm:-right-2">
                {badge}
              </span>
            )}
          </span>
        )}

        {/* Mobile label */}
        <span
          className={cn(
            "max-w-full truncate px-0.5 text-[10px] font-semibold tracking-wider uppercase sm:hidden",
            isPrimary
              ? "text-[#e4fffb]"
              : active
                ? "text-[#3ff2e0]"
                : "text-zinc-400"
          )}
        >
          {label}
        </span>

        {/* Desktop hover tooltip */}
        <span
          className={cn(
            "pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#0b101b]/95 px-2 py-1 text-[11px] font-medium text-zinc-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block"
          )}
        >
          {label}
        </span>
      </motion.button>
    );
  }
);
DockIconButton.displayName = "DockIconButton";

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ items, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full sm:flex sm:items-center sm:justify-center sm:px-3",
          className
        )}
      >
        <div
          className={cn(
            "grid w-full grid-cols-5 items-end border-t border-white/10 bg-[#080c14]/95 px-1.5 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl",
            "sm:flex sm:w-auto sm:items-center sm:gap-1.5 sm:rounded-2xl sm:border sm:bg-[#090d16]/90 sm:p-2 sm:shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
          )}
        >
          {items.map((item) => (
            <DockIconButton key={item.label} {...item} />
          ))}
        </div>
      </div>
    );
  }
);
Dock.displayName = "Dock";

export { Dock };
