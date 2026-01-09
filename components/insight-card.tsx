"use client"

import type React from "react"

import {
  AlertTriangle,
  TrendingUp,
  Shield,
  Users,
  Server,
  Clock,
  DollarSign,
  TrendingDown,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { InsightCard as InsightCardType } from "@/lib/mock-data"
import { extractMonthlyOpportunity, formatOpportunity } from "@/lib/opportunity-calculator"

interface InsightCardProps {
  insight: InsightCardType
  onClick: () => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Security Gap Upsell": Shield,
  "Seat Count True-Up": Users,
  "EOL Tech Refresh": Server,
  "Shadow IT Opportunity": AlertTriangle,
  "Champion Departure Alert": Users,
  "The Quiet Client Risk": Clock,
  "Sentiment Drift": TrendingUp,
  "Customer Satisfaction Decline": TrendingDown,
  "SLA Breach Risk": AlertTriangle,
  "Resource Utilization": Server,
  "Patch Compliance Gap": Shield,
  "Priority Shift Detection": AlertCircle, // added icon mapping for Priority Shift Detection
  "VIP Identification": Users, // Added icon mapping for VIP Identification
}

const severityColors = {
  high: "bg-red-50 text-destructive border-red-200",
  medium: "bg-amber-50 text-accent border-amber-200",
  low: "bg-green-50 text-green-600 border-green-200",
}

export function InsightCard({ insight, onClick }: InsightCardProps) {
  const Icon = iconMap[insight.title] || AlertTriangle
  const monthlyOpportunity = extractMonthlyOpportunity(insight)
  const showOpportunityPill = insight.persona === "Sales" && monthlyOpportunity > 0
  const hasRiskProfile = insight.riskProfile !== undefined

  return (
    <Card
      className="group cursor-pointer border-secondary bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] animate-slide-in-up"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
            <Icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {showOpportunityPill && (
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 transition-all duration-300 hover:scale-110 hover:shadow-md"
              >
                <DollarSign className="h-3 w-3" />
                {formatOpportunity(monthlyOpportunity)}/mo
              </Badge>
            )}
            {insight.persona === "Sales" && !showOpportunityPill && (
              <Badge
                variant="outline"
                className="bg-slate-50 text-slate-600 border-slate-200 gap-1 transition-all duration-300 hover:scale-110 hover:shadow-md"
              >
                <TrendingUp className="h-3 w-3" />
                Strategic
              </Badge>
            )}
            <Badge
              variant="outline"
              className={`${severityColors[insight.severity]} transition-all duration-300 hover:scale-110 hover:shadow-md`}
            >
              {insight.severity.toUpperCase()}
            </Badge>
            {hasRiskProfile && insight.riskProfile && (
              <Badge
                variant="outline"
                className="bg-red-50 text-red-600 border-red-200 transition-all duration-300 hover:scale-110 hover:shadow-md"
              >
                Risk: {insight.riskProfile.overallScore}
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="mt-3 font-heading text-lg font-semibold text-primary transition-colors duration-300 group-hover:text-accent">
          {insight.title}
        </CardTitle>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{insight.category}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
          {insight.summary}
        </p>
        {insight.affectedDevices && (
          <p className="mt-2 text-xs font-medium text-accent transition-all duration-300 group-hover:scale-105">
            {insight.affectedDevices.length} devices affected
          </p>
        )}
      </CardContent>
    </Card>
  )
}
