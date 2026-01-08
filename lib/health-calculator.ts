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
  let satisfaction = customer.healthScore || 75
  let usage = 88
  const financial = 90

  // Adjust based on insights
  insights.forEach((insight) => {
    if (insight.id === "customer-satisfaction-decline") {
      satisfaction = 72
    }
    if (insight.id === "sentiment-drift") {
      engagement = 65
      satisfaction = Math.min(satisfaction, 70)
    }
    if (insight.id === "quiet-client") {
      engagement = 60
      usage = 70
    }
    if (insight.id === "champion-departure") {
      engagement = Math.min(engagement, 75)
    }
  })

  return {
    engagement,
    satisfaction,
    usage,
    financial,
  }
}

export function calculateOverallHealthScore(metrics: HealthMetrics): number {
  // Weighted average of health metrics
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
