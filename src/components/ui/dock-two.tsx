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
}

interface DockProps {
  className?: string;
  items: DockItem[];
}

interface DockIconButtonProps extends DockItem {
  className?: string;
}

const DockIconButton = React.forwardRef<HTMLButtonElement, DockIconButtonProps>(
  ({ icon: Icon, label, onClick, active, badge, className }, ref) => {
    return (
      <motion.button
        ref={ref}
        type="button"
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={onClick}
        aria-label={label}
        className={cn(
          "relative group flex cursor-pointer items-center justify-center rounded-xl p-3 transition-colors",
          active
            ? "bg-[#3ff2e0]/15 text-[#3ff2e0] shadow-[inset_0_0_0_1px_rgba(63,242,224,0.3)]"
            : "text-zinc-400 hover:bg-white/[0.06] hover:text-white",
          className
        )}
      >
        <Icon className="h-5 w-5" />
        {typeof badge === "number" && badge > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3ff2e0] px-1 font-mono text-[9px] font-bold text-[#04070b] tabular-nums">
            {badge}
          </span>
        )}
        <span
          className={cn(
            "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#0b101b]/95 px-2 py-1 text-[11px] font-medium text-zinc-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
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
        className={cn("flex items-center justify-center px-3", className)}
      >
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-2xl border border-white/10 bg-[#090d16]/90 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl"
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
