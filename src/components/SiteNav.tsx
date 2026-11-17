"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const ROOM_LINKS: { title: string; href: string; description: string }[] = [
  {
    title: "Q4 Electronics Drop",
    href: "/auction",
    description: "Live wholesale room with MacBook Air, Dell 4K, and Sony lots.",
  },
  {
    title: "Platform Features",
    href: "/#features",
    description: "Sub-second live sync, anti-snipe timers, and verified buyer access.",
  },
]

export function SiteNav() {
  return (
    <NavigationMenu className="hidden sm:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-zinc-300 hover:bg-white/[0.06] hover:text-white data-[state=open]:bg-white/[0.06]">
            Auctions
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[360px] gap-2 p-3 md:w-[420px]">
              {ROOM_LINKS.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a
              href="/#features"
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent text-zinc-300 hover:bg-white/[0.06] hover:text-white"
              )}
            >
              Features
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/how-it-works"
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent text-zinc-300 hover:bg-white/[0.06] hover:text-white"
              )}
            >
              How It Works
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/pricing"
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent text-zinc-300 hover:bg-white/[0.06] hover:text-white"
              )}
            >
              Pricing
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-white/[0.06] hover:text-white focus:bg-white/[0.06]",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none text-white">
            {title}
          </div>
          <p className="line-clamp-2 text-xs leading-snug text-zinc-400">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
