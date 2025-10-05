"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  BarChart,
  ShoppingBag,
  Package,
  Users,
  Settings,
  LifeBuoy,
  Send,
  ChevronDown,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart,
  },
  {
    title: "Órdenes",
    href: "/orders",
    icon: ShoppingBag,
  },
  {
    title: "Productos",
    href: "/products",
    icon: Package,
  },
  {
    title: "Clientes",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Configuración",
    href: "/settings",
    icon: Settings,
  },
]

const secondaryItems: NavItem[] = [
  {
    title: "Soporte",
    href: "/support",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    href: "/feedback",
    icon: Send,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const toggleItem = (title: string) => {
    setOpenItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const NavItems = ({ items }: { items: NavItem[] }) => {
    return (
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const isOpen = openItems.includes(item.title)
          const hasChildren = item.children && item.children.length > 0

          return (
            <div key={item.title}>
              {item.href ? (
                <Link href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => toggleItem(item.title)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                  {hasChildren && (
                    <ChevronDown
                      className={cn(
                        "ml-auto h-4 w-4 transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  )}
                </Button>
              )}
              {hasChildren && isOpen && (
                <div className="ml-6 mt-1">
                  <NavItems items={item.children} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <h2 className="text-lg font-semibold">Mi Dashboard</h2>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <NavItems items={navItems} />
        <div className="mt-auto pt-4">
          <div className="my-4 border-t" />
          <NavItems items={secondaryItems} />
        </div>
      </SidebarContent>
    </Sidebar>
  )
}