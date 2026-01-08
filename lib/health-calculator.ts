import type { InsightCard, Customer } from "./mock-data"

export interface HealthMetricCalculation {
  engagement: {
    score: number
    trend: "up" | "down" | "stable"
    reasoning: string
  }
  sentiment: {
    score: number
    trend: "up" | "down" | "stable"
    reasoning: string
  }
  productAdoption: {
    score: number
    trend: "up" | "down" | "stable"
    reasoning: string
  }
  financialRisk: {
    score: number
    trend: "up" | "down" | "stable"
    reasoning: string
  }
}

interface ScoringFactors {
  highSeverity: number
  mediumSeverity: number
  lowSeverity: number
  positiveFactors: string[]
  negativeFactors: string[]
}

/**
 * Calculates health metrics from insight cards for a specific customer
 */
export function calculateHealthMetrics(customerInsights: InsightCard[], customer: Customer): HealthMetricCalculation {
  const engagementInsights = customerInsights.filter(
    (insight) => insight.persona === "Account Management" || insight.category === "Engagement Alert",
  )

  const engagement = calculateEngagement(engagementInsights, customer)

  const sentimentInsights = customerInsights.filter(
    (insight) =>
      insight.category === "Relationship Health" ||
      insight.title.toLowerCase().includes("sentiment") ||
      insight.summary.toLowerCase().includes("sentiment"),
  )

  const sentiment = calculateSentiment(sentimentInsights, customer, engagementInsights)

  const adoptionInsights = customerInsights.filter(
    (insight) =>
      insight.category === "Revenue Opportunity" ||
      insight.title.toLowerCase().includes("seat") ||
      insight.title.toLowerCase().includes("shadow it"),
  )

  const productAdoption = calculateProductAdoption(adoptionInsights, customer)

  const financialInsights = customerInsights.filter(
    (insight) =>
      insight.category === "Revenue Recovery" || insight.category === "Retention Risk" || insight.severity === "high",
  )

  const financialRisk = calculateFinancialRisk(financialInsights, customer)

  return {
    engagement,
    sentiment,
    productAdoption,
    financialRisk,
  }
}

function calculateEngagement(
  insights: InsightCard[],
  customer: Customer,
): { score: number; trend: "up" | "down" | "stable"; reasoning: string } {
  const factors = analyzeInsights(insights)

  // Base score from data
  let score = 85 - factors.highSeverity * 20 - factors.mediumSeverity * 10 - factors.lowSeverity * 5

  // Check for specific engagement issues
  const quietClient = insights.find((i) => i.title.includes("Quiet Client"))
  const championDeparture = insights.find((i) => i.title.includes("Champion Departure"))

  if (quietClient) {
    const dropRate = quietClient.data["Drop Rate"] as string
    const drop = Number.parseInt(dropRate)
    score = Math.max(40, 100 - drop)
  }

  if (championDeparture) {
    score -= 15
  }

  score = Math.max(0, Math.min(100, score))

  const trend = determineTrend(factors)

  // Build reasoning from actual insights
  let reasoning = ""
  if (quietClient) {
    reasoning = `Support ticket volume dropped ${quietClient.data["Drop Rate"]} in 90 days, last contact ${quietClient.data["Last Proactive Check-in"]} ago`
  } else if (championDeparture) {
    reasoning = `Primary contact ${championDeparture.data["Contact Name"]} no longer responding since ${championDeparture.data["Last Successful Contact"]}`
  } else if (customer.healthMetrics.engagement.emailResponseRate) {
    reasoning = `${customer.healthMetrics.engagement.emailResponseRate}% email response rate with regular communication patterns`
  } else {
    reasoning = "Consistent engagement across support channels and proactive check-ins"
  }

  return { score, trend, reasoning }
}

function calculateSentiment(
  insights: InsightCard[],
  customer: Customer,
  engagementInsights: InsightCard[],
): { score: number; trend: "up" | "down" | "stable"; reasoning: string } {
  const factors = analyzeInsights(insights)

  let score = 85 - factors.highSeverity * 25 - factors.mediumSeverity * 12 - factors.lowSeverity * 5

  const sentimentDrift = insights.find((i) => i.title.includes("Sentiment Drift"))

  if (sentimentDrift) {
    const currentSentiment = sentimentDrift.data["Current Sentiment"] as string
    const sentimentScore = Number.parseFloat(currentSentiment.match(/[\d.]+/)?.[0] || "5")
    score = Math.round(sentimentScore * 10)
  }

  score = Math.max(0, Math.min(100, score))

  const trend = determineTrend(factors)

  // Build reasoning from insights
  let reasoning = ""
  if (sentimentDrift) {
    const phrases = sentimentDrift.data["Key Phrases Detected"] as string
    reasoning = `Sentiment shifted from ${sentimentDrift.data["Baseline Sentiment"]} to ${sentimentDrift.data["Current Sentiment"]}, detecting phrases like "${phrases}"`
  } else if (customer.healthMetrics.sentiment.currentSentiment) {
    reasoning = `${customer.healthMetrics.sentiment.currentSentiment} sentiment in communications with NPS score of ${customer.healthMetrics.sentiment.npsScore}/10`
  } else {
    reasoning = "Positive sentiment maintained across all communication channels"
  }

  return { score, trend, reasoning }
}

function calculateProductAdoption(
  insights: InsightCard[],
  customer: Customer,
): { score: number; trend: "up" | "down" | "stable"; reasoning: string } {
  const factors = analyzeInsights(insights)

  let score = 90 - factors.highSeverity * 15 - factors.mediumSeverity * 8 - factors.lowSeverity * 3

  const seatGap = insights.find((i) => i.title.includes("Seat Count"))
  const shadowIT = insights.find((i) => i.title.includes("Shadow IT"))
  const securityGap = insights.find((i) => i.title.includes("Security Gap"))

  if (seatGap) {
    const activeUsers = seatGap.data?.["Active AD Users"] as number | undefined
    const billedSeats = seatGap.data?.["Billed Seats"] as number | undefined

    if (typeof activeUsers === "number" && activeUsers > 0 && typeof billedSeats === "number") {
      const utilization = (billedSeats / activeUsers) * 100
      score = Math.round(Math.min(utilization, 100)) // Cap at 100
    }
  }

  if (securityGap) {
    const coverage = securityGap.data?.["RMM Patching Coverage"] as string | undefined
    if (coverage) {
      const coverageNum = Number.parseInt(coverage)
      if (!isNaN(coverageNum)) {
        score = Math.min(score, coverageNum)
      }
    }
  }

  score = Math.max(0, Math.min(100, score))

  if (isNaN(score)) {
    score = 75 // Default fallback score
  }

  const trend = determineTrend(factors)

  // Build reasoning
  let reasoning = ""
  if (seatGap) {
    const variance = seatGap.data?.["Variance"] as number | undefined
    const billed = seatGap.data?.["Billed Seats"] ?? "—"
    const active = seatGap.data?.["Active AD Users"] ?? "—"
    reasoning = `${billed} of ${active} users covered${variance ? ` (${variance} user gap)` : ""}, expansion opportunity identified`
  } else if (securityGap) {
    reasoning = `${securityGap.data?.["RMM Patching Coverage"] || "—"} endpoint coverage with ${securityGap.data?.["Actual Managed"] || "—"} of ${securityGap.data?.["Contract Scope"] || "—"} endpoints managed`
  } else if (shadowIT) {
    reasoning = `Core platform adoption strong, but ${shadowIT.data?.["Unapproved Apps"] || "—"} unauthorized tools detected in use`
  } else if (customer.healthMetrics.productAdoption.seatUtilization) {
    reasoning = `${customer.healthMetrics.productAdoption.seatUtilization}% seat utilization with ${customer.healthMetrics.productAdoption.featureUsage}% feature adoption`
  } else {
    reasoning = "Strong adoption across licensed features with high daily engagement"
  }

  return { score, trend, reasoning }
}

function calculateFinancialRisk(
  insights: InsightCard[],
  customer: Customer,
): { score: number; trend: "up" | "down" | "stable"; reasoning: string } {
  const factors = analyzeInsights(insights)

  // Start high, reduce for risks
  let score = 95 - factors.highSeverity * 30 - factors.mediumSeverity * 15 - factors.lowSeverity * 5

  const championDeparture = insights.find((i) => i.title.includes("Champion Departure"))
  const eolRefresh = insights.find((i) => i.title.includes("EOL"))

  if (championDeparture && championDeparture.severity === "high") {
    score -= 25 // Major risk
  }

  // High-value upsell opportunities indicate growth potential
  const revenueOpportunities = insights.filter((i) => i.category === "Revenue Opportunity")
  if (revenueOpportunities.length > 0) {
    score += 5
  }

  score = Math.max(0, Math.min(100, score))

  const trend = determineTrend(factors)

  // Build reasoning
  let reasoning = ""
  if (championDeparture) {
    reasoning = `Critical contact departed, renewal in ${customer.healthMetrics.financialRisk.daysUntilRenewal} days - immediate relationship rebuild needed`
  } else if (eolRefresh) {
    const refreshValue = eolRefresh.data["Estimated Refresh Value"] as string
    reasoning = `${refreshValue} hardware refresh opportunity identified, contract renewal in ${customer.healthMetrics.financialRisk.daysUntilRenewal} days`
  } else if (customer.healthMetrics.financialRisk.paymentStatus === "Current") {
    const growth = customer.healthMetrics.financialRisk.contractGrowth
    reasoning = `Payments current with ${growth > 0 ? `${growth}% contract growth` : "stable revenue"}, ${customer.healthMetrics.financialRisk.daysUntilRenewal} days until renewal`
  } else {
    reasoning = "Strong financial health with on-time payments and expansion opportunities"
  }

  return { score, trend, reasoning }
}

function analyzeInsights(insights: InsightCard[]): ScoringFactors {
  const highSeverity = insights.filter((i) => i.severity === "high").length
  const mediumSeverity = insights.filter((i) => i.severity === "medium").length
  const lowSeverity = insights.filter((i) => i.severity === "low").length

  const positiveFactors: string[] = []
  const negativeFactors: string[] = []

  insights.forEach((insight) => {
    if (insight.category.includes("Opportunity")) {
      positiveFactors.push(insight.title)
    } else if (insight.category.includes("Risk") || insight.category.includes("Alert")) {
      negativeFactors.push(insight.title)
    }
  })

  return {
    highSeverity,
    mediumSeverity,
    lowSeverity,
    positiveFactors,
    negativeFactors,
  }
}

function determineTrend(factors: ScoringFactors): "up" | "down" | "stable" {
  if (factors.highSeverity > 0) return "down"
  if (factors.negativeFactors.length > factors.positiveFactors.length) return "down"
  if (factors.positiveFactors.length > factors.negativeFactors.length) return "up"
  return "stable"
}

/**
 * Calculate overall health score from pillar scores
 */
export function calculateOverallHealthScore(metrics: HealthMetricCalculation): number {
  const weights = {
    financialRisk: 0.35, // Highest weight
    productAdoption: 0.25,
    sentiment: 0.2,
    engagement: 0.2,
  }

  const financialScore =
    typeof metrics.financialRisk.score === "number" && !isNaN(metrics.financialRisk.score)
      ? metrics.financialRisk.score
      : 75
  const adoptionScore =
    typeof metrics.productAdoption.score === "number" && !isNaN(metrics.productAdoption.score)
      ? metrics.productAdoption.score
      : 75
  const sentimentScore =
    typeof metrics.sentiment.score === "number" && !isNaN(metrics.sentiment.score) ? metrics.sentiment.score : 75
  const engagementScore =
    typeof metrics.engagement.score === "number" && !isNaN(metrics.engagement.score) ? metrics.engagement.score : 75

  const weightedScore =
    financialScore * weights.financialRisk +
    adoptionScore * weights.productAdoption +
    sentimentScore * weights.sentiment +
    engagementScore * weights.engagement

  let finalScore = Math.round(weightedScore)

  if (isNaN(finalScore)) {
    finalScore = 75
  }

  return finalScore
}
