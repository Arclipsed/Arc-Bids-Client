"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ITranslation } from "@/translations/ITranslation"
import { EN } from "@/translations/en/en"
import { LanguageSwitchButton } from "@/components/LanguageSwitchButton"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function SiteNav({ nav = EN.Nav }: { nav?: ITranslation["Nav"] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isSolutionsActive =
    pathname === "/solutions" || pathname.startsWith("/solutions/")
  const isHowItWorksActive = pathname === "/how-it-works"
  const isPricingActive = pathname === "/pricing"
  const isBlogActive = pathname === "/blog" || pathname.startsWith("/blog/")
  const isToolsActive = pathname === "/tools"

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <>
      <NavigationMenu className="hidden min-[850px]:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a
                href="/#features"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-zinc-300 hover:bg-white/[0.06] hover:text-white"
                )}
              >
                {nav.Features}
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "bg-transparent hover:bg-white/[0.06] hover:text-white data-[state=open]:bg-white/[0.06] data-[state=open]:text-white",
                isSolutionsActive ? "bg-[#3ff2e0]/10 text-[#3ff2e0]" : "text-zinc-300"
              )}
            >
              {nav.Solutions}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[540px] rounded-2xl border border-white/[0.08] bg-[#090d14] p-3 shadow-2xl">
                <ul className="grid grid-cols-2 gap-1.5">
                  {nav.SolutionItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "block rounded-xl p-3 transition hover:bg-white/[0.05]",
                              active && "bg-[#3ff2e0]/10 ring-1 ring-[#3ff2e0]/25"
                            )}
                          >
                            <div
                              className={cn(
                                "text-sm font-semibold",
                                active ? "text-[#3ff2e0]" : "text-white"
                              )}
                            >
                              {item.title}
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-2 flex items-center justify-between border-t border-white/[0.06] px-3 pt-2.5 text-xs">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/solutions"
                      className="font-medium text-zinc-300 transition hover:text-white"
                    >
                      {nav.Solutions} →
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/tools"
                      className="font-semibold text-[#3ff2e0] transition hover:text-[#e4fffb]"
                    >
                      {nav.Tools} →
                    </Link>
                  </NavigationMenuLink>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/how-it-works"
                aria-current={isHowItWorksActive ? "page" : undefined}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent hover:bg-white/[0.06] hover:text-white",
                  isHowItWorksActive
                    ? "bg-[#3ff2e0]/10 text-[#3ff2e0]"
                    : "text-zinc-300"
                )}
              >
                {nav.HowItWorks}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/pricing"
                aria-current={isPricingActive ? "page" : undefined}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent hover:bg-white/[0.06] hover:text-white",
                  isPricingActive
                    ? "bg-[#3ff2e0]/10 text-[#3ff2e0]"
                    : "text-zinc-300"
                )}
              >
                {nav.Pricing}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/blog"
                aria-current={isBlogActive ? "page" : undefined}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent hover:bg-white/[0.06] hover:text-white",
                  isBlogActive
                    ? "bg-[#3ff2e0]/10 text-[#3ff2e0]"
                    : "text-zinc-300"
                )}
              >
                {nav.Blog ?? "Blog"}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <div className="ml-2">
          <LanguageSwitchButton placement="down" />
        </div>
      </NavigationMenu>

      <div className="flex items-center gap-2 min-[850px]:hidden">
        <LanguageSwitchButton placement="down" />
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-200 transition hover:border-[#3ff2e0]/40 hover:text-white"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 top-[61px] z-40 bg-black/60 backdrop-blur-xs"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <nav
              aria-label="Mobile navigation"
              className="fixed inset-x-0 top-[61px] z-50 border-b border-white/[0.08] bg-[#05070c]/95 px-4 py-4 shadow-2xl backdrop-blur-xl"
            >
              <ul className="flex flex-col gap-1">
                <li>
                  <a
                    href="/#features"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    {nav.Features}
                  </a>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    onClick={() => setOpen(false)}
                    aria-current={isHowItWorksActive ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-3.5 py-2.5 text-sm font-medium transition hover:bg-white/[0.06] hover:text-white",
                      isHowItWorksActive
                        ? "bg-[#3ff2e0]/10 text-[#3ff2e0]"
                        : "text-zinc-200"
                    )}
                  >
                    {nav.HowItWorks}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    onClick={() => setOpen(false)}
                    aria-current={isPricingActive ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-3.5 py-2.5 text-sm font-medium transition hover:bg-white/[0.06] hover:text-white",
                      isPricingActive
                        ? "bg-[#3ff2e0]/10 text-[#3ff2e0]"
                        : "text-zinc-200"
                    )}
                  >
                    {nav.Pricing}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    onClick={() => setOpen(false)}
                    aria-current={isBlogActive ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-3.5 py-2.5 text-sm font-medium transition hover:bg-white/[0.06] hover:text-white",
                      isBlogActive
                        ? "bg-[#3ff2e0]/10 text-[#3ff2e0]"
                        : "text-zinc-200"
                    )}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools"
                    onClick={() => setOpen(false)}
                    aria-current={isToolsActive ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#3ff2e0] transition hover:bg-white/[0.06] hover:text-[#e4fffb]",
                      isToolsActive && "bg-[#3ff2e0]/10"
                    )}
                  >
                    {nav.Tools}
                  </Link>
                </li>
              </ul>
              <div className="mt-3 border-t border-white/[0.06] pt-3">
                <p className="px-3.5 pb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3ff2e0]">
                  {nav.Solutions}
                </p>
                <ul className="flex flex-col gap-1">
                  {nav.SolutionItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-3.5 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3 border-t border-white/[0.06] pt-3">
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-[#e4fffb] px-4 py-2.5 text-xs font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 transition hover:bg-white"
                >
                  {nav.GetStarted}
                </Link>
              </div>
            </nav>
          </>
        )}
      </div>
    </>
  )
}
