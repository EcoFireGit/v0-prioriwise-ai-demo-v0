"use client"

import type React from "react"

import { AlertTriangle, TrendingUp, Shield, Users, Server, Clock } from "lucide-react"
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
  "SLA Breach Risk": AlertTriangle,
  "Resource Utilization": Server,
  "Patch Compliance Gap": Shield,
}

const severityColors = {
  high: "bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5]",
  medium: "bg-[#FFF7ED] text-[#F05523] border-[#FDBA74]",
  low: "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
}

export function InsightCard({ insight, onClick }: InsightCardProps) {
  const Icon = iconMap[insight.title] || AlertTriangle

  return (
    <Card
      className="cursor-pointer border-[#D2E5F6] bg-white transition-all duration-200 hover:border-[#242E65]/30 hover:shadow-lg"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D2E5F6]">
            <Icon className="h-5 w-5 text-[#242E65]" />
          </div>
          <Badge variant="outline" className={severityColors[insight.severity]}>
            {insight.severity.toUpperCase()}
          </Badge>
        </div>
        <CardTitle className="mt-3 font-heading text-lg font-semibold text-[#242E65]">{insight.title}</CardTitle>
        <p className="text-xs font-medium uppercase tracking-wide text-[#797575]">{insight.category}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-[#797575]">{insight.summary}</p>
      </CardContent>
    </Card>
  )
}
