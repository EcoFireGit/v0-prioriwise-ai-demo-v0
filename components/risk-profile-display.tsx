"use client"

import { AlertTriangle, Shield, TrendingDown, FileWarning } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { RiskProfile } from "@/lib/mock-data"

interface RiskProfileDisplayProps {
  riskProfile: RiskProfile
}

const likelihoodColors = {
  Critical: "bg-red-600 text-white",
  High: "bg-orange-500 text-white",
  Medium: "bg-amber-500 text-white",
  Low: "bg-green-600 text-white",
}

export function RiskProfileDisplay({ riskProfile }: RiskProfileDisplayProps) {
  const riskPercentage = riskProfile.overallScore
  const riskColor =
    riskPercentage >= 75
      ? "text-red-600"
      : riskPercentage >= 50
        ? "text-orange-500"
        : riskPercentage >= 25
          ? "text-amber-500"
          : "text-green-600"

  return (
    <div className="space-y-6 rounded-lg border border-secondary bg-card p-6">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold text-primary">AI-Generated Risk Profile</h3>
      </div>

      {/* Risk Score Gauge */}
      <div className="flex items-center gap-6">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <svg className="h-32 w-32 -rotate-90 transform">
            <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted" />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(riskPercentage / 100) * 351.86} 351.86`}
              className={riskColor}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={`font-heading text-3xl font-bold ${riskColor}`}>{riskPercentage}</span>
            <span className="text-xs text-muted-foreground">Risk Score</span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Exploitation Likelihood</span>
            </div>
            <Badge className={likelihoodColors[riskProfile.exploitationLikelihood]}>
              {riskProfile.exploitationLikelihood.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Business Impact */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-accent" />
          <h4 className="text-sm font-semibold uppercase tracking-wide text-primary">Business Impact</h4>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{riskProfile.businessImpact}</p>
      </div>

      {/* Compliance Risks */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <FileWarning className="h-4 w-4 text-destructive" />
          <h4 className="text-sm font-semibold uppercase tracking-wide text-primary">Compliance Risks</h4>
        </div>
        <ul className="space-y-1">
          {riskProfile.complianceRisks.map((risk, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
              {risk}
            </li>
          ))}
        </ul>
      </div>

      {/* Detection Gaps */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Shield className="h-4 w-4 text-orange-500" />
          <h4 className="text-sm font-semibold uppercase tracking-wide text-primary">Detection Gaps</h4>
        </div>
        <ul className="space-y-1">
          {riskProfile.detectionGaps.map((gap, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              {gap}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
