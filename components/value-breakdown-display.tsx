"use client"

import { DollarSign, TrendingUp, Shield, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ValueBreakdownEntry } from "@/lib/mock-data"

interface ValueBreakdownDisplayProps {
  breakdown: ValueBreakdownEntry[]
}

const categoryConfig = {
  cost_avoided: {
    label: "Cost Avoided",
    icon: Shield,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  productivity_gained: {
    label: "Productivity Gained",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  risk_mitigated: {
    label: "Risk Mitigated",
    icon: Shield,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
}

export function ValueBreakdownDisplay({ breakdown }: ValueBreakdownDisplayProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="rounded-lg border border-secondary bg-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold text-primary">Executive Value Summary</h3>
      </div>

      <div className="space-y-4">
        {breakdown.map((entry, index) => {
          const config = categoryConfig[entry.category]
          const Icon = config.icon

          return (
            <div
              key={index}
              className={`rounded-lg border ${config.borderColor} ${config.bgColor} p-4 transition-all hover:shadow-md`}
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${config.color}`} />
                    <Badge variant="outline" className={`${config.bgColor} ${config.color} border-transparent`}>
                      {config.label}
                    </Badge>
                  </div>
                  <p className="mb-1 text-sm font-medium text-primary">{entry.technicalAction}</p>
                  <p className="text-sm text-muted-foreground">→ {entry.businessOutcome}</p>
                </div>
                <div className="flex flex-shrink-0 items-start gap-1">
                  <DollarSign className={`h-5 w-5 ${config.color}`} />
                  <span className={`font-heading text-xl font-bold ${config.color}`}>
                    {formatCurrency(entry.dollarValue)}
                  </span>
                </div>
              </div>

              <div className="mt-3 space-y-2 border-t border-secondary/50 pt-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Calculation Methodology:</p>
                  <p className="text-xs text-muted-foreground">{entry.calculation}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Data Source:</p>
                  <p className="text-xs text-muted-foreground">{entry.dataSource}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 rounded-lg bg-primary/5 p-4">
        <p className="text-xs text-muted-foreground">
          All values are auditable and based on documented calculations using client-specific data and industry-standard
          benchmarks. Transparency is built into every metric.
        </p>
      </div>
    </div>
  )
}
