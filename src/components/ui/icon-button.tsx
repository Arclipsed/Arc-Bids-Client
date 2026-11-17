"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "accent" | "subtle" | "ghost";
  size?: "sm" | "md";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, variant = "accent", size = "md", type = "button", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex shrink-0 cursor-pointer select-none items-center justify-center rounded-full transition-all duration-150",
          "enabled:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ff2e0]/60",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
          size === "sm" && "h-7 w-7",
          size === "md" && "h-9 w-9",
          variant === "accent" &&
            "bg-[#e4fffb] text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_16px_rgba(63,242,224,0.2)] enabled:hover:bg-white enabled:hover:shadow-[0_0_22px_rgba(63,242,224,0.32)]",
          variant === "subtle" &&
            "border border-white/10 bg-white/[0.05] text-zinc-200 enabled:hover:border-[#3ff2e0]/35 enabled:hover:bg-white/[0.1] enabled:hover:text-white",
          variant === "ghost" &&
            "text-zinc-400 enabled:hover:bg-white/[0.08] enabled:hover:text-white",
          className
        )}
        {...props}
      />
    );
  }
);
IconButton.displayName = "IconButton";
