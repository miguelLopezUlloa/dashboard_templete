"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSelector } from "@/components/theme-selector"
import { useSidebar } from "@/components/ui/sidebar"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header 
      className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:px-6"
      style={{ 
        backgroundColor: "var(--color-card)",
        borderColor: "var(--color-border)"
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex-1">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <ThemeSelector />
    </header>
  )
}