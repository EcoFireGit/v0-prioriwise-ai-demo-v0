"use client"

import { X, ArrowRight, Database, FileText, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SegmentedRingLoader } from "@/components/segmented-ring-loader"
import { RiskProfileDisplay } from "@/components/risk-profile-display"
import { DeviceGapTable } from "@/components/device-gap-table"
import { SecurityPlaybook } from "@/components/security-playbook"
import type { InsightCard } from "@/lib/mock-data"

interface InsightModalProps {
  insight: InsightCard | null
  isLoading: boolean
  onClose: () => void
  onReturnToDashboard?: () => void
}

const severityColors = {
  high: "bg-red-50 text-destructive border-red-200",
  medium: "bg-amber-50 text-accent border-amber-200",
  low: "bg-green-50 text-green-600 border-green-200",
}

export function InsightModal({ insight, isLoading, onClose, onReturnToDashboard }: InsightModalProps) {
  if (!insight && !isLoading) return null

  const isSecurityGap = insight?.id === "security-gap"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl rounded-xl border border-secondary bg-card shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
        >
          <X className="h-5 w-5" />
        </button>

        {isLoading ? (
          <div className="flex h-80 flex-col items-center justify-center gap-4">
            <SegmentedRingLoader />
            <p className="font-heading text-lg font-medium text-primary">Analyzing data...</p>
            <p className="text-sm text-muted-foreground">Generating insights and recommendations</p>
          </div>
        ) : insight ? (
          <div className="max-h-[90vh] overflow-y-auto p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-3">
                <h2 className="font-heading text-2xl font-semibold text-primary">{insight.title}</h2>
                <Badge variant="outline" className={severityColors[insight.severity]}>
                  {insight.severity.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{insight.category}</p>
            </div>

            {/* Summary */}
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">{insight.summary}</p>

            {/* Data Points */}
            <div className="mb-6 rounded-lg bg-secondary p-4">
              <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-primary">
                Key Data Points
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(insight.data).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{key}</span>
                    <span className="font-heading text-lg font-semibold text-primary">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {isSecurityGap && insight.riskProfile && (
              <div className="mb-6">
                <RiskProfileDisplay riskProfile={insight.riskProfile} />
              </div>
            )}

            {isSecurityGap && insight.affectedDevices && (
              <div className="mb-6">
                <DeviceGapTable devices={insight.affectedDevices} />
              </div>
            )}

            {isSecurityGap && insight.playbook && (
              <div className="mb-6">
                <SecurityPlaybook playbook={insight.playbook} />
              </div>
            )}

            {/* Data Sources */}
            <div className="mb-6 rounded-lg border border-secondary bg-card p-4">
              <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-primary">
                Data Sources
              </h3>
              <div className="space-y-4">
                {/* Internal Structured */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Database className="h-4 w-4 text-primary" />
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-primary">
                      Internal - Structured
                    </h4>
                  </div>
                  <ul className="ml-6 space-y-1">
                    {insight.dataSources.internal.structured.map((source, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        • {source}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Internal Unstructured */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-primary">
                      Internal - Unstructured
                    </h4>
                  </div>
                  <ul className="ml-6 space-y-1">
                    {insight.dataSources.internal.unstructured.map((source, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        • {source}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* External */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-primary">External Sources</h4>
                  </div>
                  <ul className="ml-6 space-y-1">
                    {insight.dataSources.external.map((source, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        • {source}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Recommendation - only show if not security gap (since playbook replaces it) */}
            {!isSecurityGap && (
              <div className="mb-6 rounded-lg border border-accent/20 bg-accent/5 p-4">
                <h3 className="mb-2 font-heading text-sm font-semibold uppercase tracking-wide text-accent">
                  Recommended Action
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{insight.recommendation}</p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="space-y-2">
              <Button className="w-full bg-accent font-heading text-accent-foreground hover:bg-accent/90">
                Take Action
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={onReturnToDashboard}
                variant="outline"
                className="w-full bg-transparent font-heading text-primary hover:bg-secondary"
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
