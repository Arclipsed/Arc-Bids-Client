"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { ITranslation } from "@/translations/ITranslation"
import { EN } from "@/translations/en/en"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function SiteNav({ nav = EN.Nav }: { nav?: ITranslation["Nav"] }) {
  return (
    <NavigationMenu className="hidden sm:flex">
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
          <NavigationMenuLink asChild>
            <Link
              href="/how-it-works"
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent text-zinc-300 hover:bg-white/[0.06] hover:text-white"
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
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent text-zinc-300 hover:bg-white/[0.06] hover:text-white"
              )}
            >
              {nav.Pricing}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
