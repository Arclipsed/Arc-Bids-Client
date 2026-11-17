"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InteractivePillProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  tone?: "default" | "accent" | "subtle";
}

export const InteractivePill = React.forwardRef<
  HTMLButtonElement,
  InteractivePillProps
>(({ className, active = false, tone = "default", type = "button", ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex cursor-pointer select-none items-center justify-center rounded-full font-mono text-xs font-semibold transition-all duration-150",
        "enabled:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ff2e0]/60",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
        tone === "default" &&
          (active
            ? "bg-[#e4fffb] text-[#04070b] shadow-[0_0_16px_rgba(63,242,224,0.22)] enabled:hover:bg-white"
            : "border border-white/10 bg-white/[0.04] text-zinc-300 enabled:hover:border-[#3ff2e0]/35 enabled:hover:bg-white/[0.1] enabled:hover:text-white"),
        tone === "accent" &&
          (active
            ? "border border-[#3ff2e0]/35 bg-[#3ff2e0]/15 text-[#3ff2e0] enabled:hover:border-[#3ff2e0]/60 enabled:hover:bg-[#3ff2e0]/25"
            : "border border-white/10 bg-white/[0.05] text-zinc-400 enabled:hover:border-white/25 enabled:hover:bg-white/[0.1] enabled:hover:text-zinc-200"),
        tone === "subtle" &&
          "border border-white/10 bg-white/[0.05] text-zinc-200 enabled:hover:border-[#3ff2e0]/35 enabled:hover:bg-white/[0.1] enabled:hover:text-white",
        className
      )}
      {...props}
    />
  );
});
InteractivePill.displayName = "InteractivePill";
