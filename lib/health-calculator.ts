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

/**
 * Safely extracts a numeric value from an object, returning a fallback if invalid
 */
function safeGetNumber(obj: any, key: string, fallback = 0): number {
  const value = obj?.[key]
  const num = typeof value === "number" ? value : Number.parseFloat(String(value))
  return !isNaN(num) && isFinite(num) ? num : fallback
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
    const activeUsers = safeGetNumber(seatGap.data, "Active AD Users", 1) // Default to 1 to avoid division by zero
    const billedSeats = safeGetNumber(seatGap.data, "Billed Seats", 0)

    // Validate before division
    if (activeUsers > 0) {
      const utilization = (billedSeats / activeUsers) * 100
      score = Math.round(utilization)
      console.log(
        "[v0] Product Adoption - Seat Gap: activeUsers:",
        activeUsers,
        "billedSeats:",
        billedSeats,
        "utilization:",
        utilization,
      )
    } else {
      console.log("[v0] Product Adoption - Invalid seat data, using fallback")
      score = customer.healthMetrics.productAdoption.seatUtilization ?? 90
    }
  }

  if (securityGap) {
    const coverage = safeGetNumber(securityGap.data, "RMM Patching Coverage", 100)
    score = Math.min(score, coverage)
  }

  score = Math.max(0, Math.min(100, score))

  const trend = determineTrend(factors)

  // Build reasoning
  let reasoning = ""
  if (seatGap) {
    const activeUsers = safeGetNumber(seatGap.data, "Active AD Users", 0)
    const billedSeats = safeGetNumber(seatGap.data, "Billed Seats", 0)
    const variance = safeGetNumber(seatGap.data, "Variance", 0)
    reasoning = `${billedSeats} of ${activeUsers} users covered (${variance} user gap), expansion opportunity identified`
  } else if (securityGap) {
    const coverage = safeGetNumber(securityGap.data, "RMM Patching Coverage", 0)
    const managed = safeGetNumber(securityGap.data, "Actual Managed", 0)
    const scope = safeGetNumber(securityGap.data, "Contract Scope", 1)
    reasoning = `${coverage}% endpoint coverage with ${managed} of ${scope} endpoints managed`
  } else if (shadowIT) {
    const unapprovedApps = safeGetNumber(shadowIT.data, "Unapproved Apps", 0)
    reasoning = `Core platform adoption strong, but ${unapprovedApps} unauthorized tools detected in use`
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

  const weightedScore =
    metrics.financialRisk.score * weights.financialRisk +
    metrics.productAdoption.score * weights.productAdoption +
    metrics.sentiment.score * weights.sentiment +
    metrics.engagement.score * weights.engagement

  return Math.round(weightedScore)
}
