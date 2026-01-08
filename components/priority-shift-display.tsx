"use client"

import { TrendingDown, AlertCircle, Users, BarChart3, Quote } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PriorityShiftData } from "@/lib/mock-data"

interface PriorityShiftDisplayProps {
  data: PriorityShiftData
}

export function PriorityShiftDisplay({ data }: PriorityShiftDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-heading text-sm font-semibold text-amber-900">Strategic Priority Shift Detected</h3>
            <p className="text-sm text-amber-800 mt-1">
              {data.shiftPercentage}% of executive communications have shifted from{" "}
              <span className="font-semibold">"{data.previousFocus}"</span> to{" "}
              <span className="font-semibold">"{data.currentFocus}"</span> over{" "}
              <span className="font-semibold">{data.analysisWindow}</span>. This represents a measurable pivot requiring
              your strategic response.
            </p>
          </div>
        </div>
      </div>

      {/* Before/After Comparison */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-secondary bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Previous Strategic Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-heading font-semibold text-primary">{data.previousFocus}</p>
                <p className="text-xs text-muted-foreground">Pre-shift baseline</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-destructive uppercase tracking-wide">
              Current Strategic Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-lg font-heading font-semibold text-destructive">{data.currentFocus}</p>
                <p className="text-xs text-red-700 font-medium">{data.shiftPercentage}% of communications</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Linguistic Indicators */}
      <Card className="border-secondary bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-wide text-primary">
            Linguistic Shift Evidence
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            AI-detected keyword frequency changes in executive communications
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.linguisticIndicators.map((indicator, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{indicator}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stakeholder Changes */}
      <Card className="border-secondary bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <Users className="h-4 w-4" />
            Stakeholder Engagement Changes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.stakeholderChanges.map((stakeholder, idx) => (
              <div key={idx} className="rounded-lg bg-secondary p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-primary text-sm">{stakeholder.name}</p>
                    <p className="text-xs text-muted-foreground">{stakeholder.role}</p>
                  </div>
                  {idx === 1 && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      New
                    </Badge>
                  )}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Previous</p>
                    <p className="font-medium text-primary">{stakeholder.previousEngagement}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current</p>
                    <p className="font-medium text-primary">{stakeholder.currentEngagement}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="font-medium">Influence:</span> {stakeholder.departmentInfluence}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Activity Changes */}
      <Card className="border-secondary bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <BarChart3 className="h-4 w-4" />
            Department Activity Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.departmentActivity.map((dept, idx) => {
              const percentChange = ((dept.currentActivity - dept.previousActivity) / dept.previousActivity) * 100
              const isIncrease = dept.changeDirection === "up"

              return (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary">{dept.department}</p>
                    <Badge
                      variant="outline"
                      className={
                        isIncrease
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-green-50 text-green-700 border-green-200"
                      }
                    >
                      {isIncrease ? "↑" : "↓"} {Math.abs(percentChange).toFixed(0)}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={isIncrease ? "h-full bg-red-500" : "h-full bg-green-500"}
                        style={{ width: `${Math.min(100, (dept.currentActivity / 70) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium w-12 text-right">
                      {dept.previousActivity} → {dept.currentActivity}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Evidence Examples */}
      <Card className="border-secondary bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <Quote className="h-4 w-4" />
            Supporting Evidence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.evidenceExamples.map((example, idx) => (
              <div key={idx} className="rounded-lg bg-secondary p-3 border border-border">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-start gap-2 flex-1">
                    <Badge variant="outline" className="text-xs">
                      {example.category}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{example.date}</p>
                  </div>
                  <p className="text-xs text-muted-foreground italic">{example.source}</p>
                </div>
                <p className="text-sm text-primary italic">"{example.quote}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alignment Gauge */}
      <Card
        className={`border-2 ${data.alignmentGauge.currentAlignment === "red" ? "border-red-200 bg-red-50" : data.alignmentGauge.currentAlignment === "amber" ? "border-amber-200 bg-amber-50" : "border-green-200 bg-green-50"}`}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-wide">Service Alignment Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{data.alignmentGauge.reason}</p>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Recommended Actions:</p>
              <ul className="space-y-1">
                {data.alignmentGauge.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
