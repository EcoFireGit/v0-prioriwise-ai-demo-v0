import type { InsightCard, Customer } from "./mock-data"

export interface HealthMetrics {
  engagement: number
  satisfaction: number
  usage: number
  financial: number
}

export function calculateHealthMetrics(insights: InsightCard[], customer: Customer): HealthMetrics {
  // Base metrics from customer data
  let engagement = 85
  let satisfaction = customer.healthScore
  const usage = 88
  const financial = 90

  // Adjust metrics based on insights
  insights.forEach((insight) => {
    switch (insight.id) {
      case "quiet-client":
        engagement -= 15
        break
      case "sentiment-drift":
        satisfaction -= 20
        engagement -= 10
        break
      case "champion-departure":
        engagement -= 25
        satisfaction -= 15
        break
      case "customer-satisfaction-decline":
        satisfaction -= 15
        break
      case "priority-shift-detection":
        engagement -= 5
        break
    }
  })

  // Ensure metrics stay within 0-100 range
  return {
    engagement: Math.max(0, Math.min(100, engagement)),
    satisfaction: Math.max(0, Math.min(100, satisfaction)),
    usage: Math.max(0, Math.min(100, usage)),
    financial: Math.max(0, Math.min(100, financial)),
  }
}

export function calculateOverallHealthScore(metrics: HealthMetrics): number {
  // Weighted average of all metrics
  const weights = {
    engagement: 0.25,
    satisfaction: 0.35,
    usage: 0.25,
    financial: 0.15,
  }

  const score =
    metrics.engagement * weights.engagement +
    metrics.satisfaction * weights.satisfaction +
    metrics.usage * weights.usage +
    metrics.financial * weights.financial

  return Math.round(score)
}
