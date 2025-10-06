"use client"

import * as React from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

type TimeRange = "year" | "6months" | "3months" | "month"

interface SalesData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
  }[]
}

// Datos de ejemplo para cada rango de tiempo
const generateData = (range: TimeRange): SalesData => {
  const colors = {
    primary: "rgba(159, 181, 105, 1)", // Color verde Matsu
    primaryLight: "rgba(159, 181, 105, 0.2)",
    secondary: "rgba(217, 201, 168, 1)", // Color beige
    secondaryLight: "rgba(217, 201, 168, 0.2)",
  }

  switch (range) {
    case "year":
      return {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        datasets: [
          {
            label: "Ventas 2025",
            data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 29000, 35000, 38000, 42000],
            borderColor: colors.primary,
            backgroundColor: colors.primaryLight,
          },
          {
            label: "Ventas 2024",
            data: [10000, 15000, 13000, 20000, 18000, 24000, 22000, 26000, 24000, 28000, 30000, 33000],
            borderColor: colors.secondary,
            backgroundColor: colors.secondaryLight,
          },
        ],
      }
    case "6months":
      return {
        labels: ["Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        datasets: [
          {
            label: "Ventas",
            data: [28000, 32000, 29000, 35000, 38000, 42000],
            borderColor: colors.primary,
            backgroundColor: colors.primaryLight,
          },
        ],
      }
    case "3months":
      return {
        labels: ["Oct", "Nov", "Dic"],
        datasets: [
          {
            label: "Ventas",
            data: [35000, 38000, 42000],
            borderColor: colors.primary,
            backgroundColor: colors.primaryLight,
          },
        ],
      }
    case "month":
      return {
        labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
        datasets: [
          {
            label: "Ventas Diciembre",
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 2000) + 1000),
            borderColor: colors.primary,
            backgroundColor: colors.primaryLight,
          },
        ],
      }
  }
}

export function SalesChart() {
  const [timeRange, setTimeRange] = React.useState<TimeRange>("3months")
  const [chartData, setChartData] = React.useState<SalesData>(generateData("3months"))

  React.useEffect(() => {
    setChartData(generateData(timeRange))
  }, [timeRange])

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          usePointStyle: false,
          boxWidth: 12,
          boxHeight: 12,
          padding: 15,
          font: {
            size: 12,
            family: "Nunito, sans-serif",
            weight: "700",
          },
          color: "#5a5244", // Color foreground fijo para mejor contraste
        },
      },
      tooltip: {
        enabled: true,
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(235, 224, 203, 0.98)", // Color card con opacidad
        titleColor: "#5a5244", // Color foreground
        bodyColor: "#5a5244",
        borderColor: "#b8a88a", // Color border
        borderWidth: 2,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxWidth: 12,
        boxHeight: 12,
        boxPadding: 6,
        usePointStyle: false,
        titleFont: {
          size: 13,
          family: "Nunito, sans-serif",
          weight: "700",
        },
        bodyFont: {
          size: 12,
          family: "Nunito, sans-serif",
          weight: "700",
        },
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y)
            }
            return label
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: "var(--color-muted-foreground)",
          font: {
            size: 11,
            family: "Nunito, sans-serif",
          },
          callback: function (value) {
            return "$" + (value as number).toLocaleString()
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "var(--color-muted-foreground)",
          font: {
            size: 11,
            family: "Nunito, sans-serif",
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Esto hace las líneas suaves/curvas
        borderWidth: 2,
      },
      point: {
        radius: 3,
        hoverRadius: 6,
        borderWidth: 2,
        backgroundColor: "var(--color-background)",
      },
    },
  }

  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: "year", label: "Último año" },
    { value: "6months", label: "6 meses" },
    { value: "3months", label: "3 meses" },
    { value: "month", label: "Mes actual" },
  ]

  return (
    <div className="space-y-4">
      {/* Botones de filtro de tiempo */}
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-lg border-2 p-1"
        style={{ 
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-border)"
        }}
      >
        {timeRanges.map((range) => (
          <Button
            key={range.value}
            variant={timeRange === range.value ? "default" : "ghost"}
            size="sm"
            onClick={() => setTimeRange(range.value)}
            className={cn(
              "flex-1 transition-all",
              timeRange === range.value && "shadow-sm"
            )}
            style={
              timeRange === range.value
                ? {
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-primary-foreground)",
                  }
                : {}
            }
          >
            {range.label}
          </Button>
        ))}
      </div>

      {/* Gráfica */}
      <div className="h-[300px] w-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}
