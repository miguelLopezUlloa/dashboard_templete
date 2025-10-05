"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Check, Palette, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export const themes = [
  { name: "Matsu (Ghibli)", value: "matsu", color: "#9fb569" },
  { name: "Modern", value: "theme-modern", color: "#0f172a" },
  { name: "Ocean", value: "theme-ocean", color: "#3b82f6" },
] as const

export function ThemeSelector() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [currentColorTheme, setCurrentColorTheme] = React.useState("matsu")

  React.useEffect(() => {
    setMounted(true)
    // Leer el tema de color guardado
    const savedColorTheme = localStorage.getItem("color-theme") || "matsu"
    setCurrentColorTheme(savedColorTheme)
    
    // Aplicar tema al montar
    const root = document.documentElement
    themes.forEach(t => root.classList.remove(t.value))
    root.classList.add(savedColorTheme)
  }, [])

  if (!mounted) {
    return null
  }

  const handleColorThemeChange = (themeName: string) => {
    setCurrentColorTheme(themeName)
    localStorage.setItem("color-theme", themeName)
    
    // Aplicar inmediatamente
    const root = document.documentElement
    themes.forEach(t => root.classList.remove(t.value))
    root.classList.add(themeName)
  }

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const isDark = theme === "dark"

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleDarkMode}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Cambiar modo oscuro</span>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Palette className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Seleccionar tema de color</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Tema de color</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {themes.map((t) => (
            <DropdownMenuItem
              key={t.value}
              onClick={() => handleColorThemeChange(t.value)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="h-4 w-4 rounded-full border-2"
                  style={{ backgroundColor: t.color }}
                />
                <span>{t.name}</span>
              </div>
              {currentColorTheme === t.value && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
