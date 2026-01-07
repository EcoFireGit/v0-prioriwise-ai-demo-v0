"use client"

import { Header } from "@/components/header"
import { AppFooter } from "@/components/app-footer"
import { Sidebar } from "@/components/sidebar"
import { Users, Building2, DollarSign, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ClientPortfolioPage() {
  const clients = [
    {
      company: "Acme Corporation",
      industry: "Technology",
      tier: "Enterprise",
      arr: "$250K",
      healthScore: 92,
      users: 450,
      csm: "Sarah Johnson",
      renewalDate: "2026-08-15",
    },
    {
      company: "Global Dynamics",
      industry: "Manufacturing",
      tier: "Enterprise",
      arr: "$180K",
      healthScore: 85,
      users: 320,
      csm: "Michael Chen",
      renewalDate: "2026-06-22",
    },
    {
      company: "Nexus Solutions",
      industry: "Finance",
      tier: "Growth",
      arr: "$95K",
      healthScore: 78,
      users: 145,
      csm: "Sarah Johnson",
      renewalDate: "2026-09-10",
    },
    {
      company: "Vertex Systems",
      industry: "Healthcare",
      tier: "Growth",
      arr: "$120K",
      healthScore: 88,
      users: 210,
      csm: "Emily Rodriguez",
      renewalDate: "2026-07-05",
    },
    {
      company: "Stellar Enterprises",
      industry: "Retail",
      tier: "Starter",
      arr: "$48K",
      healthScore: 71,
      users: 85,
      csm: "Michael Chen",
      renewalDate: "2026-10-18",
    },
  ]

  const portfolioStats = [
    { label: "Total Clients", value: "127", icon: Building2, color: "text-blue-600" },
    { label: "Total ARR", value: "$12.4M", icon: DollarSign, color: "text-green-600" },
    { label: "Avg Health Score", value: "82", icon: TrendingUp, color: "text-[#ff6b35]" },
  ]

  const getTierBadgeVariant = (tier: string) => {
    if (tier === "Enterprise") return "default"
    if (tier === "Growth") return "secondary"
    return "outline"
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 flex-col bg-background ml-64">
          <main className="flex flex-1 flex-col p-6">
            <div className="mx-auto w-full max-w-7xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary">Client Portfolio</h1>
                  <p className="text-sm text-muted-foreground">Manage and analyze your client relationships</p>
                </div>
              </div>

              <div className="mb-6 grid gap-4 md:grid-cols-3">
                {portfolioStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                        </div>
                        <Icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="rounded-lg border border-border bg-card">
                <div className="border-b border-border p-4">
                  <h2 className="font-semibold text-primary">Active Clients</h2>
                  <p className="text-sm text-muted-foreground">Your complete client portfolio overview</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border bg-muted/50">
                      <tr>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Company</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Industry</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Tier</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">ARR</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Health</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Users</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">CSM</th>
                        <th className="p-3 text-left text-sm font-medium text-muted-foreground">Renewal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client, index) => (
                        <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/50">
                          <td className="p-3">
                            <div className="font-medium text-primary">{client.company}</div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm text-muted-foreground">{client.industry}</div>
                          </td>
                          <td className="p-3">
                            <Badge variant={getTierBadgeVariant(client.tier)}>{client.tier}</Badge>
                          </td>
                          <td className="p-3">
                            <div className="font-semibold text-primary">{client.arr}</div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-16 rounded-full bg-muted">
                                <div
                                  className={`h-2 rounded-full ${getHealthScoreColor(client.healthScore)}`}
                                  style={{ width: `${client.healthScore}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{client.healthScore}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm">{client.users}</div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm">{client.csm}</div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm text-muted-foreground">
                              {new Date(client.renewalDate).toLocaleDateString()}
                            </div>
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
