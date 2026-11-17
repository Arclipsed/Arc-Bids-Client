"use client";

interface LanguageSwitchButtonProps {
  currentLocale: "EN" | "DE";
}

export function LanguageSwitchButton({
  currentLocale,
}: LanguageSwitchButtonProps) {
  const nextLabel = currentLocale === "EN" ? "DE" : "EN";

  const handleToggle = () => {
    const nextCookie = nextLabel.toLowerCase();
    document.cookie = `MANUAL_NEXT_LOCALE=${nextCookie}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      className="inline-flex h-8 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 text-[11px] font-bold tracking-wider text-zinc-300 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
      title={`Switch language to ${nextLabel}`}
      aria-label={`Switch language to ${nextLabel}`}
    >
      {currentLocale}
    </button>
  );
}
