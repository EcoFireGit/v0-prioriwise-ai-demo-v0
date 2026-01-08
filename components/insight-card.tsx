"use client"
import type React from "react"
import {
  AlertTriangle,
  TrendingUp,
  Shield,
  Users,
  Server,
  Clock,
  UserPlus,
  DollarSign,
  TrendingDown,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { InsightCard as InsightCardType } from "@/lib/mock-data"

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
  "Identifying & Winning Referrals": UserPlus,
  "SLA Breach Risk": AlertTriangle,
  "Resource Utilization": Server,
  "Patch Compliance Gap": Shield,
  "Priority Shift Detection": AlertCircle,
}

const severityColors = {
  high: "bg-red-50 text-destructive border-red-200",
  medium: "bg-amber-50 text-accent border-amber-200",
  low: "bg-green-50 text-green-600 border-green-200",
}

export function InsightCard({ insight, onClick }: InsightCardProps) {
  const Icon = iconMap[insight.title] || AlertTriangle
  return (
    <Card
      className="cursor-pointer border-secondary bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-lg"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <Badge variant="outline" className={severityColors[insight.severity]}>
            {insight.severity.toUpperCase()}
          </Badge>
        </div>
        <CardTitle className="mt-3 font-heading text-lg font-semibold text-primary">{insight.title}</CardTitle>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{insight.category}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">{insight.summary}</p>
      </CardContent>
    </Card>
  )
}
