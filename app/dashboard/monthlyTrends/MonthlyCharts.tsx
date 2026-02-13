"use client"

import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

// -----------------------------
// Props type
// -----------------------------
type Trend = {
  month: string // "YYYY-MM"
  totalSpent: number
  transactionCount: number
  averageTransaction: number
}

type MonthlyChartsProps = {
  trends?: Trend[] // optional
}

// -----------------------------
// Helper: convert YYYY-MM to readable month
// -----------------------------
function formatMonth(monthStr: string) {
  const [year, month] = monthStr.split("-")
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleString("en-US", { month: "short", year: "numeric" }) // e.g., "Nov 2025"
}

// -----------------------------
// Chart config (required by ChartContainer)
// -----------------------------
const chartConfig = {
  totalSpent: {
    label: "Total Spent",
    color: "#009DE0", 
  },
} satisfies ChartConfig

// -----------------------------
// Component
// -----------------------------
export function MonthlyCharts({ trends }: MonthlyChartsProps) {
  const chartData = trends?.map((t) => ({
    ...t,
    month: formatMonth(t.month),
  })) ?? []

  // Show placeholder if no data
  if (chartData.length === 0) {
    return <div className="text-center text-gray-500">No data available</div>
  }

  // Calculate dynamic bar size and chart width
  const barSize = chartData.length <= 6 ? 40 : 30
  const chartWidth = chartData.length * (barSize + 10) // add gap between bars

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          barCategoryGap="20%"
          width={chartWidth} // dynamic width based on bars
        >
          {/* X Axis */}
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          
          {/* Y Axis */}
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `R ${value.toLocaleString()}`}
          />
          
          {/* Tooltip */}
          <Tooltip formatter={(value: number) => `R ${value.toLocaleString()}`} />

          {/* Bars */}
          <Bar dataKey="totalSpent" radius={6} barSize={barSize}>
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={chartConfig.totalSpent.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
