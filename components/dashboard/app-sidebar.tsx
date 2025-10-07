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
  Search,
  User,
  CreditCard,
  Bell,
  LogOut,
  ChevronDown,
  MoreVertical,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
]

const bottomItems: NavItem[] = [
  {
    title: "Configuración",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Buscar",
    href: "/search",
    icon: Search,
  },
  {
    title: "Cuenta",
    href: "/account",
    icon: User,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = React.useState<string[]>([])
  const { state, toggleSidebar } = useSidebar()

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
                    variant="ghost"
                    className={cn(
                      "transition-all duration-200 rounded-lg sidebar-menu-item",
                      isCollapsed ? "w-full justify-center px-2" : "w-full justify-start",
                      isActive && "font-bold"
                    )}
                    style={{
                      backgroundColor: isActive 
                        ? "var(--color-sidebar-accent)" 
                        : "transparent",
                      color: isActive
                        ? "var(--color-sidebar-accent-foreground)"
                        : "var(--color-sidebar-foreground)",
                      border: isActive ? "2px solid var(--color-border)" : "2px solid transparent",
                    }}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <Icon className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start transition-all duration-200 rounded-lg sidebar-menu-item"
                  onClick={() => toggleItem(item.title)}
                  style={{
                    border: "2px solid transparent",
                  }}
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

  const isCollapsed = state === "collapsed"

  return (
    <Sidebar>
      <SidebarHeader 
        className="flex h-14 items-center justify-between border-b px-4"
        style={{ borderColor: "var(--color-border)" }}
      >
        {!isCollapsed && <h2 className="text-lg font-semibold">Mi Dashboard</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="sidebar-menu-item"
          style={{ border: "2px solid transparent" }}
          title={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
      </SidebarHeader>
      <SidebarContent className={cn("flex flex-col", isCollapsed ? "p-2" : "p-4")}>
        <div className="flex-1">
          <NavItems items={navItems} />
        </div>
        <div className="mt-auto space-y-4">
          <div className="border-t pt-4" style={{ borderColor: "var(--color-border)" }}>
            <NavItems items={bottomItems} />
          </div>
          
          {/* User Menu */}
          <div className="border-t pt-4" style={{ borderColor: "var(--color-border)" }}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full rounded-lg sidebar-menu-item h-auto",
                    isCollapsed ? "justify-center px-2 py-2" : "justify-between px-3 py-2"
                  )}
                  style={{ border: "2px solid transparent" }}
                  title={isCollapsed ? "Menú de usuario" : undefined}
                >
                  {isCollapsed ? (
                    <div 
                      className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-primary-foreground)",
                      }}
                    >
                      MZ
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div 
                          className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{
                            backgroundColor: "var(--color-primary)",
                            color: "var(--color-primary-foreground)",
                          }}
                        >
                          MZ
                        </div>
                        <div className="flex flex-col items-start text-sm">
                          <span className="font-semibold">Usuario Demo</span>
                          <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
                            usuario@demo.com
                          </span>
                        </div>
                      </div>
                      <MoreVertical className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56"
                style={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-card-foreground)",
                }}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Cuenta</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Facturación</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notificaciones</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator style={{ backgroundColor: "var(--color-border)" }} />
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}