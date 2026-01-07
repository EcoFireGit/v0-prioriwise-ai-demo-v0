"use client"

import { Header } from "@/components/header"
import { AppFooter } from "@/components/app-footer"
import { Sidebar } from "@/components/sidebar"
import { TriangleAlert, AlertCircle, XCircle, TrendingDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function RiskCenterPage() {
  const atRiskCustomers = [
    {
      company: "RetailMax Solutions",
      healthScore: 42,
      risk: "Critical",
      reason: "Login activity down 65%",
      daysToRenewal: 28,
      arr: "$85K",
    },
    {
      company: "FinTech Innovations",
      healthScore: 55,
      risk: "High",
      reason: "3 support tickets unresolved",
      daysToRenewal: 45,
      arr: "$120K",
    },
    {
      company: "MediaStream Co",
      healthScore: 58,
      risk: "High",
      reason: "Feature adoption declining",
      daysToRenewal: 62,
      arr: "$65K",
    },
    {
      company: "AutoLogistics Inc",
      healthScore: 63,
      risk: "Medium",
      reason: "No executive engagement",
      daysToRenewal: 90,
      arr: "$95K",
    },
    {
      company: "EduTech Platform",
      healthScore: 68,
      risk: "Medium",
      reason: "Payment issues detected",
      daysToRenewal: 120,
      arr: "$48K",
    },
  ]

  const riskMetrics = [
    { label: "Critical Risk", count: 3, color: "text-red-600" },
    { label: "High Risk", count: 7, color: "text-orange-500" },
    { label: "Medium Risk", count: 12, color: "text-yellow-500" },
  ]

  const getRiskBadgeVariant = (risk: string) => {
    if (risk === "Critical") return "destructive"
    if (risk === "High") return "default"
    return "secondary"
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 flex-col bg-background">
          <main className="flex flex-1 flex-col p-6">
            <div className="mx-auto w-full max-w-7xl">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                    <TriangleAlert className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-primary">Risk Center</h1>
                    <p className="text-sm text-muted-foreground">Monitor and mitigate customer health risks</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">$413K</div>
                  <div className="text-sm text-muted-foreground">At-Risk ARR</div>
                </div>
              </div>

              <div className="mb-6 grid gap-4 md:grid-cols-3">
                {riskMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                        <div className={`text-2xl font-bold ${metric.color}`}>{metric.count}</div>
                      </div>
                      {metric.label === "Critical Risk" && <XCircle className="h-8 w-8 text-red-600" />}
                      {metric.label === "High Risk" && <AlertCircle className="h-8 w-8 text-orange-500" />}
                      {metric.label === "Medium Risk" && <TrendingDown className="h-8 w-8 text-yellow-500" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-border bg-card">
                <div className="border-b border-border p-4">
                  <h2 className="font-semibold text-primary">At-Risk Accounts</h2>
                  <p className="text-sm text-muted-foreground">Customers requiring immediate attention</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border bg-muted/50">
                      <tr>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Company</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Health Score</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Risk Level</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Primary Reason</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Renewal</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">ARR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {atRiskCustomers.map((customer, index) => (
                        <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/50">
                          <td className="p-3">
                            <div className="font-medium text-primary">{customer.company}</div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-16 rounded-full bg-muted">
                                <div
                                  className={`h-2 rounded-full ${
                                    customer.healthScore < 50
                                      ? "bg-red-600"
                                      : customer.healthScore < 65
                                        ? "bg-orange-500"
                                        : "bg-yellow-500"
                                  }`}
                                  style={{ width: `${customer.healthScore}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{customer.healthScore}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant={getRiskBadgeVariant(customer.risk)}>{customer.risk}</Badge>
                          </td>
                          <td className="p-3">
                            <div className="text-sm text-muted-foreground">{customer.reason}</div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm">{customer.daysToRenewal} days</div>
                          </td>
                          <td className="p-3">
                            <div className="font-semibold text-primary">{customer.arr}</div>
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
    </div>
  )
}
