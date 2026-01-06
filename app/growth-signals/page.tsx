"use client"

import { Header } from "@/components/header"
import { AppFooter } from "@/components/app-footer"
import { Sidebar } from "@/components/sidebar"
import { TrendingUp, ArrowUpRight, Zap, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function GrowthSignalsPage() {
  const growthOpportunities = [
    {
      company: "TechVision Corp",
      signal: "High Feature Adoption",
      score: 92,
      potential: "$45K",
      action: "Upsell to Enterprise",
      category: "expansion",
    },
    {
      company: "DataFlow Systems",
      signal: "User Growth +35%",
      score: 88,
      potential: "$32K",
      action: "Add Premium Features",
      category: "expansion",
    },
    {
      company: "CloudNine Inc",
      signal: "API Usage Surge",
      score: 85,
      potential: "$28K",
      action: "Increase API Limits",
      category: "upsell",
    },
    {
      company: "InnovateLabs",
      signal: "Multiple Power Users",
      score: 82,
      potential: "$38K",
      action: "Team Plan Upgrade",
      category: "expansion",
    },
    {
      company: "MetricsPro",
      signal: "Storage Near Limit",
      score: 79,
      potential: "$22K",
      action: "Storage Upgrade",
      category: "upsell",
    },
  ]

  const signalCategories = [
    { label: "Product Engagement", count: 12, trend: "+8%" },
    { label: "Usage Growth", count: 8, trend: "+15%" },
    { label: "Feature Requests", count: 5, trend: "+3%" },
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-64 flex flex-1 flex-col bg-background">
        <Header />
        <main className="flex flex-1 flex-col p-6">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ff6b35]/10">
                  <TrendingUp className="h-6 w-6 text-[#ff6b35]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary">Growth Signals</h1>
                  <p className="text-sm text-muted-foreground">Identify expansion opportunities and upsell potential</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#ff6b35]">$165K</div>
                <div className="text-sm text-muted-foreground">Total Opportunity</div>
              </div>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-3">
              {signalCategories.map((category) => (
                <div key={category.label} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">{category.label}</div>
                      <div className="text-2xl font-bold text-primary">{category.count}</div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-green-500">
                      <ArrowUpRight className="h-4 w-4" />
                      {category.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-border bg-card">
              <div className="border-b border-border p-4">
                <h2 className="font-semibold text-primary">Top Growth Opportunities</h2>
                <p className="text-sm text-muted-foreground">Accounts showing strong expansion signals</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="p-3 text-left text-sm font-medium text-muted-foreground">Company</th>
                      <th className="p-3 text-left text-sm font-medium text-muted-foreground">Signal</th>
                      <th className="p-3 text-left text-sm font-medium text-muted-foreground">Score</th>
                      <th className="p-3 text-left text-sm font-medium text-muted-foreground">Potential</th>
                      <th className="p-3 text-left text-sm font-medium text-muted-foreground">Recommended Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {growthOpportunities.map((opportunity, index) => (
                      <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="p-3">
                          <div className="font-medium text-primary">{opportunity.company}</div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-[#ff6b35]" />
                            <span className="text-sm">{opportunity.signal}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-muted">
                              <div
                                className="h-2 rounded-full bg-[#ff6b35]"
                                style={{ width: `${opportunity.score}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{opportunity.score}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1 font-semibold text-green-600">
                            <DollarSign className="h-4 w-4" />
                            {opportunity.potential}
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant={opportunity.category === "expansion" ? "default" : "secondary"}>
                            {opportunity.action}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
        <AppFooter />
      </div>
    </div>
  )
}
