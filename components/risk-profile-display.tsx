"use client"

import { Badge } from "@/components/ui/badge"

interface RiskProfile {
  os: string
  version: string
  endOfLife: string
  severity: "critical" | "high" | "medium"
}

interface RiskProfileDisplayProps {
  riskProfile: RiskProfile
}

const severityColors = {
  critical: "bg-red-100 text-red-700 border-red-300",
  high: "bg-orange-100 text-orange-700 border-orange-300",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
}

export function RiskProfileDisplay({ riskProfile }: RiskProfileDisplayProps) {
  return (
    <div className="rounded-lg border border-secondary bg-card p-4">
      <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-primary">Risk Profile</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-xs text-muted-foreground">Operating System</span>
          <p className="font-semibold text-primary">{riskProfile.os}</p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground">Version</span>
          <p className="font-semibold text-primary">{riskProfile.version}</p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground">End of Life</span>
          <p className="font-semibold text-primary">{riskProfile.endOfLife}</p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground">Severity</span>
          <Badge variant="outline" className={severityColors[riskProfile.severity]}>
            {riskProfile.severity.toUpperCase()}
          </Badge>
        </div>
      </div>
    </div>
  )
}
