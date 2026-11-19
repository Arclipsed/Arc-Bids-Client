"use client";

import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";

const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "DE", label: "Deutsch" },
  { code: "ES", label: "Español" },
  { code: "FR", label: "Français" },
  { code: "NL", label: "Nederlands" },
  { code: "TR", label: "Türkçe" },
  { code: "RU", label: "Русский" },
] as const;

interface LanguageSwitchButtonProps {
  currentLocale: string;
}

export function LanguageSwitchButton({
  currentLocale,
}: LanguageSwitchButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectLanguage = (code: string) => {
    document.cookie = `MANUAL_NEXT_LOCALE=${code.toLowerCase()}; path=/; max-age=31536000; SameSite=Lax`;
    setOpen(false);
    window.location.reload();
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        aria-expanded={open}
        aria-label="Select language"
        className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 text-[11px] font-bold tracking-wider text-zinc-300 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
      >
        <Globe className="h-3.5 w-3.5 text-[#3ff2e0]" />
        {currentLocale}
      </button>

      {open && (
        <div className="absolute right-0 bottom-full z-50 mb-2 w-40 overflow-hidden rounded-2xl border border-white/10 bg-[#0b101b]/95 p-1.5 shadow-2xl backdrop-blur-md">
          {LANGUAGES.map((lang) => {
            const active = lang.code === currentLocale;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => selectLanguage(lang.code)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-2.5 py-1.5 text-left text-xs transition ${
                  active
                    ? "bg-[#3ff2e0]/15 font-semibold text-[#3ff2e0]"
                    : "text-zinc-300 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span>{lang.label}</span>
                <span className="font-mono text-[10px] opacity-75">
                  {lang.code}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
