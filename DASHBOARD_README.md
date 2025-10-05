# Dashboard Template

Este es un template de dashboard moderno construido con Next.js 14+, Tailwind CSS v4, y shadcn/ui, con soporte para múltiples temas incluyendo un hermoso tema inspirado en Studio Ghibli.

## 🎨 Características

- **Múltiples Temas**: Incluye 3 temas predefinidos:
  - 🌿 **Matsu (Ghibli)** (Default): El auténtico tema Studio Ghibli con colores cálidos, naturales y textura de papel
  - 🔷 **Modern**: Tema minimalista y profesional
  - 🌊 **Ocean**: Tonos azules relajantes
- **Tema Matsu Especial**: Incluye textura de papel, bordes estilo hand-drawn, y tipografías Nunito y PT Sans
- **Modo Oscuro**: Cada tema tiene su variante oscura
- **Componentes Reutilizables**: Basado en shadcn/ui con componentes personalizables
- **Sidebar Responsive**: Menú lateral que se adapta a dispositivos móviles
- **Arquitectura Modular**: Fácil de extender con nuevas páginas y componentes

## 🚀 Inicio Rápido

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
dashboard_templete/
├── app/
│   ├── layout.tsx          # Layout principal con ThemeProvider
│   ├── page.tsx           # Página principal del dashboard
│   ├── dashboard-layout.tsx # Layout específico del dashboard
│   └── globals.css        # Estilos globales y variables de temas
├── components/
│   ├── ui/                # Componentes base de shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── sidebar.tsx
│   ├── dashboard/         # Componentes específicos del dashboard
│   │   ├── app-sidebar.tsx
│   │   └── site-header.tsx
│   ├── theme-provider.tsx # Provider de next-themes
│   └── theme-selector.tsx # Selector de temas
└── lib/
    └── utils.ts           # Utilidades (cn function)
```

## 🎨 Sistema de Temas

### Cambiar de Tema

El selector de temas está en el header del dashboard. Puedes:
- Cambiar entre los 3 temas disponibles
- Activar/desactivar el modo oscuro
- Los temas se guardan en localStorage

### Crear un Nuevo Tema

Para agregar un nuevo tema, edita `app/globals.css`:

```css
/* Tu nuevo tema */
.theme-custom {
  --radius: 0.5rem;
  --background: 210 100% 98%;
  --foreground: 222.2 84% 4.9%;
  /* ... más variables */
}

/* Versión oscura */
.dark.theme-custom {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... más variables */
}
```

Luego agrégalo al selector en `components/theme-selector.tsx`:

```typescript
export const themes = [
  { name: "Matsu (Ghibli)", value: "matsu", color: "oklch(0.71 0.097 111.7)" },
  { name: "Modern", value: "theme-modern", color: "hsl(240 5.9% 10%)" },
  { name: "Ocean", value: "theme-ocean", color: "hsl(217 91% 60%)" },
  { name: "Custom", value: "theme-custom", color: "hsl(0 0% 50%)" }, // Tu nuevo tema
] as const
```

## 🧩 Componentes Principales

### DashboardLayout

Envuelve las páginas con el sidebar y header:

```tsx
import DashboardLayout from "@/app/dashboard-layout"

export default function MyPage() {
  return (
    <DashboardLayout>
      {/* Tu contenido aquí */}
    </DashboardLayout>
  )
}
```

### AppSidebar

Configura los items del menú en `components/dashboard/app-sidebar.tsx`:

```tsx
const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  // Agrega más items aquí
]
```

## 📝 Personalización

### Cambiar el Logo/Título

Edita `components/dashboard/app-sidebar.tsx`:

```tsx
<SidebarHeader className="border-b p-4">
  <h2 className="text-lg font-semibold">Tu Logo/Título</h2>
</SidebarHeader>
```

### Agregar Nuevas Páginas

1. Crea un nuevo archivo en `app/[tu-pagina]/page.tsx`
2. Usa el `DashboardLayout`
3. Agrega la ruta al sidebar en `navItems`

### Modificar Colores Base

Los colores base están definidos en `app/globals.css` usando variables CSS HSL.

## 🛠 Tecnologías Utilizadas

- **Next.js 14+**: Framework de React con App Router
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: Componentes accesibles y personalizables
- **Radix UI**: Primitivos de UI sin estilos
- **Lucide Icons**: Iconos modernos y consistentes
- **next-themes**: Gestión de temas

## 📄 Licencia

Este es un template de código abierto. Úsalo libremente para tus proyectos personales o comerciales.