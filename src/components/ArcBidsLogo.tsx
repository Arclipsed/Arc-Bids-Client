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
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="h-full w-full drop-shadow-[0_0_12px_rgba(63,242,224,0.18)]"
      >
        <defs>
          <linearGradient
            id="arcbids-logo-bg"
            x1="0"
            y1="0"
            x2="64"
            y2="64"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0e1726" />
            <stop offset="100%" stopColor="#05080f" />
          </linearGradient>
          <linearGradient
            id="arcbids-logo-accent"
            x1="24"
            y1="38"
            x2="49"
            y2="17"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0f8f9f" />
            <stop offset="55%" stopColor="#3ff2e0" />
            <stop offset="100%" stopColor="#e4fffb" />
          </linearGradient>
        </defs>
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="16"
          fill="url(#arcbids-logo-bg)"
          stroke="#3ff2e0"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
        <path
          d="M21 47L32 18L43 47"
          stroke="#e4fffb"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.5 38L34.5 38C40.5 38 45.5 29.5 49 17"
          stroke="url(#arcbids-logo-accent)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="49" cy="17" r="3.5" fill="#3ff2e0" />
      </svg>
    </span>
  );
}
