"use client"

import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SegmentedRingLoader } from "@/components/segmented-ring-loader"
import type { InsightCard } from "@/lib/mock-data"

interface InsightModalProps {
  insight: InsightCard | null
  isLoading: boolean
  onClose: () => void
}

const severityColors = {
  high: "bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5]",
  medium: "bg-[#FFF7ED] text-[#F05523] border-[#FDBA74]",
  low: "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
}

export function InsightModal({ insight, isLoading, onClose }: InsightModalProps) {
  if (!insight && !isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl rounded-xl border border-[#D2E5F6] bg-white shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-[#797575] transition-colors hover:bg-[#D2E5F6] hover:text-[#242E65]"
        >
          <X className="h-5 w-5" />
        </button>

        {isLoading ? (
          <div className="flex h-80 flex-col items-center justify-center gap-4">
            <SegmentedRingLoader />
            <p className="font-heading text-lg font-medium text-[#242E65]">Analyzing data...</p>
            <p className="text-sm text-[#797575]">Generating insights and recommendations</p>
          </div>
        ) : insight ? (
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-3">
                <h2 className="font-heading text-2xl font-semibold text-[#242E65]">{insight.title}</h2>
                <Badge variant="outline" className={severityColors[insight.severity]}>
                  {insight.severity.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm font-medium uppercase tracking-wide text-[#797575]">{insight.category}</p>
            </div>

            {/* Summary */}
            <p className="mb-6 text-base leading-relaxed text-[#797575]">{insight.summary}</p>

            {/* Data Points */}
            <div className="mb-6 rounded-lg bg-[#D2E5F6] p-4">
              <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-[#242E65]">
                Key Data Points
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(insight.data).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-xs text-[#797575]">{key}</span>
                    <span className="font-heading text-lg font-semibold text-[#242E65]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div className="mb-6 rounded-lg border border-[#F05523]/20 bg-[#FFF7ED] p-4">
              <h3 className="mb-2 font-heading text-sm font-semibold uppercase tracking-wide text-[#F05523]">
                Recommended Action
              </h3>
              <p className="text-sm leading-relaxed text-[#797575]">{insight.recommendation}</p>
            </div>

            {/* CTA */}
            <Button className="w-full bg-[#F05523] font-heading text-white hover:bg-[#D94A1F]">
              Take Action
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
