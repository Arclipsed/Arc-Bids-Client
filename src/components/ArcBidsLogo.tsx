export function ArcBidsLogo({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const dim = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${dim} ${className}`}
      aria-hidden="true"
    >
      <img
        src="/arcbids-logo.png"
        alt="ArcBids"
        className="h-full w-full object-contain drop-shadow-[0_0_12px_rgba(63,242,224,0.18)]"
      />
    </span>
  );
}
