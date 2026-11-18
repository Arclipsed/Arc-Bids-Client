import Link from "next/link";

interface FooterSectionProps {
  brandName?: string;
  tagline?: string;
  badge?: string;
  homeLabel?: string;
  featuresLabel?: string;
  howItWorksLabel?: string;
  pricingLabel?: string;
  quickLinksTitle?: string;
  legalTitle?: string;
  contactTitle?: string;
  privacyLabel?: string;
  termsLabel?: string;
  imprintLabel?: string;
  address?: string;
  email?: string;
  copyright?: string;
  craftedWith?: string;
}

export default function FooterSection({
  brandName = "ArcBids",
  tagline = "Enterprise-grade B2B wholesale auction platform built for real-time speed.",
  badge = "Live Engine · Sub-Second Sync",
  homeLabel = "Home",
  featuresLabel = "Features",
  howItWorksLabel = "How It Works",
  pricingLabel = "Pricing",
  quickLinksTitle = "Navigation",
  legalTitle = "Legal",
  contactTitle = "Contact",
  privacyLabel = "Privacy Policy",
  termsLabel = "Terms of Service",
  imprintLabel = "Imprint",
  address = "74321 Bietigheim-Bissingen, Germany",
  email = "hello@arcbids.com",
  copyright = "© 2026 ArcBids · A product of PYCIE Studio. All rights reserved.",
  craftedWith = "High-availability real-time infrastructure",
}: FooterSectionProps) {
  return (
    <footer className="border-t border-white/[0.06] bg-[#05070c] text-sm text-zinc-400">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-[#e4fffb] transition-colors group-hover:text-[#3ff2e0]">
                {brandName}
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-400">{tagline}</p>
            <span className="inline-block rounded-full border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 px-2.5 py-1 text-[10px] font-semibold text-[#3ff2e0]">
              {badge}
            </span>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              {quickLinksTitle}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/" className="transition-colors hover:text-[#e4fffb]">
                  {homeLabel}
                </Link>
              </li>
              <li>
                <Link href="/#features" className="transition-colors hover:text-[#e4fffb]">
                  {featuresLabel}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="transition-colors hover:text-[#e4fffb]">
                  {howItWorksLabel}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition-colors hover:text-[#e4fffb]">
                  {pricingLabel}
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="transition-colors hover:text-[#e4fffb]">
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="font-medium text-[#3ff2e0] transition-colors hover:text-[#e4fffb]"
                >
                  Free Margin Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              {contactTitle}
            </h4>
            <div className="space-y-1 text-xs text-zinc-400">
              <p>{address}</p>
              <p>
                <a href={`mailto:${email}`} className="transition-colors hover:text-[#e4fffb]">
                  {email}
                </a>
              </p>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              {legalTitle}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/imprint" className="transition-colors hover:text-[#e4fffb]">
                  {imprintLabel}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-[#e4fffb]">
                  {termsLabel}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-[#e4fffb]">
                  {privacyLabel}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-zinc-500 sm:flex-row">
          <p>{copyright}</p>
          <p className="flex flex-wrap items-center gap-2">
            <span>{craftedWith}</span>
            <span aria-hidden="true">·</span>
            <span>
              Designed by{" "}
              <a
                href="https://www.pycie.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#e4fffb] transition-colors hover:text-[#3ff2e0]"
              >
                PYCIE
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
