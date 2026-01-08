"use client"

import { Building2, Users, DollarSign, Activity, HelpCircle, TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { Customer, Project } from "@/lib/mock-data"
import { useState } from "react"
import { calculateHealthMetrics, calculateOverallHealthScore } from "@/lib/health-calculator"
import { getInsightsForCustomer } from "@/lib/mock-data"
import { createPortal } from "react-dom"

interface CustomerSummaryProps {
  customer: Customer
  project: Project
}

interface HealthScorePillar {
  name: string
  score: number
  trend: "up" | "down" | "stable"
  reasoning: string
  impact: number
}

export function CustomerSummary({ customer, project }: CustomerSummaryProps) {
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [iconPosition, setIconPosition] = useState({ top: 0, left: 0 })

  const customerInsights = getInsightsForCustomer(customer.id)
  const calculatedMetrics = calculateHealthMetrics(customerInsights, customer)
  const calculatedHealthScore = calculateOverallHealthScore(calculatedMetrics)

  const healthColor =
    calculatedHealthScore >= 80
      ? "text-green-600 bg-green-50"
      : calculatedHealthScore >= 60
        ? "text-amber-600 bg-amber-50"
        : "text-red-600 bg-red-50"

  const statusColor =
    project.status === "Healthy"
      ? "bg-green-100 text-green-700"
      : project.status === "At Risk"
        ? "bg-red-100 text-red-700"
        : "bg-blue-100 text-blue-700"

  const healthScorePillars: HealthScorePillar[] = [
    {
      name: "Financial Risk",
      score: calculatedMetrics.financialRisk.score,
      trend: calculatedMetrics.financialRisk.trend,
      reasoning: calculatedMetrics.financialRisk.reasoning,
      impact: 4,
    },
    {
      name: "Product Adoption",
      score: calculatedMetrics.productAdoption.score,
      trend: calculatedMetrics.productAdoption.trend,
      reasoning: calculatedMetrics.productAdoption.reasoning,
      impact: 3,
    },
    {
      name: "Sentiment",
      score: calculatedMetrics.sentiment.score,
      trend: calculatedMetrics.sentiment.trend,
      reasoning: calculatedMetrics.sentiment.reasoning,
      impact: 2,
    },
    {
      name: "Engagement",
      score: calculatedMetrics.engagement.score,
      trend: calculatedMetrics.engagement.trend,
      reasoning: calculatedMetrics.engagement.reasoning,
      impact: 1,
    },
  ].sort((a, b) => b.impact - a.impact)

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    if (trend === "up") return <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
    if (trend === "down") return <TrendingDown className="h-3.5 w-3.5 text-rose-600" />
    return <Minus className="h-3.5 w-3.5 text-slate-600" />
  }

  const getScoreColor = (score: number, trend: "up" | "down" | "stable") => {
    if (trend === "up") return "text-emerald-700 bg-emerald-50"
    if (trend === "down") return "text-rose-700 bg-rose-50"
    return "text-slate-700 bg-slate-50"
  }

  return (
    <div className="relative rounded-xl border border-secondary bg-card p-5 animate-slide-in-up transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary animate-pulse-glow transition-transform duration-300 hover:scale-110">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold text-primary transition-colors duration-300 hover:text-accent">
              {customer.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {project.name} •{" "}
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusColor} transition-all duration-300 hover:scale-110`}
              >
                {project.status}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2 transition-transform duration-300 hover:scale-110">
            <Users className="h-4 w-4 text-muted-foreground transition-colors duration-300 hover:text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Employees</p>
              <p className="font-heading font-semibold text-primary">{customer.employees}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 transition-transform duration-300 hover:scale-110">
            <DollarSign className="h-4 w-4 text-muted-foreground transition-colors duration-300 hover:text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Contract Value</p>
              <p className="font-heading font-semibold text-primary">${customer.contractValue.toLocaleString()}</p>
            </div>
          </div>
          <div className="relative flex items-center gap-2 transition-transform duration-300 hover:scale-110">
            <Activity className="h-4 w-4 text-muted-foreground transition-colors duration-300 hover:text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Health Score</p>
              <div className="flex items-center gap-1.5">
                <p
                  className={`font-heading rounded-md px-2 py-0.5 font-semibold ${healthColor} transition-all duration-300 hover:scale-110`}
                >
                  {calculatedHealthScore}/100
                </p>
                <div
                  className="relative"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    setIconPosition({ top: rect.bottom + window.scrollY, left: rect.right + window.scrollX })
                    setShowBreakdown(true)
                  }}
                  onMouseLeave={() => setShowBreakdown(false)}
                >
                  <HelpCircle className="h-3.5 w-3.5 cursor-help text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-125" />

                  {showBreakdown &&
                    typeof document !== "undefined" &&
                    createPortal(
                      <div
                        className="fixed z-[9999] w-80 rounded-lg border border-secondary bg-card p-4 shadow-xl animate-slide-in-up"
                        style={{
                          top: `${iconPosition.top + 8}px`,
                          left: `${iconPosition.left - 320}px`,
                        }}
                        onMouseEnter={() => setShowBreakdown(true)}
                        onMouseLeave={() => setShowBreakdown(false)}
                      >
                        <h3 className="font-heading mb-3 text-sm font-semibold text-primary">Health Score Breakdown</h3>

                        <div className="mb-3 rounded-md bg-muted/50 p-2 text-xs text-muted-foreground">
                          <p className="mb-1 font-medium">Trend over last 30 days</p>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-emerald-600" /> Improving
                            </span>
                            <span className="flex items-center gap-1">
                              <Minus className="h-3 w-3 text-slate-600" /> Stable
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingDown className="h-3 w-3 text-rose-600" /> Declining
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {healthScorePillars.map((pillar) => (
                            <div key={pillar.name} className="space-y-1 transition-all duration-300 hover:scale-105">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-primary">{pillar.name}</span>
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`rounded px-1.5 py-0.5 text-xs font-semibold ${getScoreColor(pillar.score, pillar.trend)}`}
                                  >
                                    {pillar.score}
                                  </span>
                                  {getTrendIcon(pillar.trend)}
                                </div>
                              </div>
                              <p className="text-xs leading-relaxed text-muted-foreground">{pillar.reasoning}</p>
                            </div>
                          ))}
                        </div>
                      </div>,
                      document.body,
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
