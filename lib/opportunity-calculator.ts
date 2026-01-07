// Utility to calculate monthly opportunity from insight card data
import type { InsightCard } from "./mock-data"

/**
 * Extracts and standardizes opportunity value to monthly from an insight card
 * Only returns data-driven monetary values, not hypothetical or risk-based numbers
 */
export function extractMonthlyOpportunity(insight: InsightCard): number {
  const data = insight.data

  // Priority order for extracting opportunity values
  const priorityKeys = [
    "Total Monthly Recovery",
    "Monthly Revenue Gap",
    "Monthly Opportunity",
    "Total Monthly Value",
    "Monthly Value",
  ]

  // Check for direct monthly values first
  for (const key of priorityKeys) {
    if (key in data) {
      const value = data[key]
      const parsed = parseMonetaryValue(value)
      if (parsed !== null) return parsed
    }
  }

  // Check for annual values to convert
  const annualKeys = ["Annual Opportunity", "Gap Value", "Estimated Refresh Value"]

  for (const key of annualKeys) {
    if (key in data) {
      const value = data[key]
      const parsed = parseMonetaryValue(value)
      if (parsed !== null) return parsed / 12 // Convert annual to monthly
    }
  }

  // No valid monetary value found
  return 0
}

/**
 * Parses a monetary value from various formats
 * Examples: "$12,400/yr", "$2,115", "87500", 2115
 */
function parseMonetaryValue(value: string | number): number | null {
  if (typeof value === "number") return value

  if (typeof value === "string") {
    // Remove currency symbols, commas, and extract the number
    const match = value.match(/[\d,]+/)
    if (match) {
      const numericValue = Number.parseFloat(match[0].replace(/,/g, ""))
      return isNaN(numericValue) ? null : numericValue
    }
  }

  return null
}

/**
 * Calculates total opportunity across all insights
 */
export function calculateTotalOpportunity(insights: InsightCard[]): number {
  return insights.reduce((total, insight) => {
    return total + extractMonthlyOpportunity(insight)
  }, 0)
}

/**
 * Formats a monetary value for display
 */
export function formatOpportunity(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
