"use client"

import { Header } from "@/components/header"
import { AppFooter } from "@/components/app-footer"
import { Sidebar } from "@/components/sidebar"
import { Plug, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function DataConnectorsPage() {
  const connectors = [
    {
      name: "Salesforce",
      description: "Sync customer and opportunity data",
      status: "connected",
      lastSync: "2 minutes ago",
      records: "1,247",
      logo: "https://logo.clearbit.com/salesforce.com",
    },
    {
      name: "HubSpot",
      description: "Marketing and sales automation data",
      status: "connected",
      lastSync: "15 minutes ago",
      records: "892",
      logo: "https://logo.clearbit.com/hubspot.com",
    },
    {
      name: "Intercom",
      description: "Customer support and messaging",
      status: "connected",
      lastSync: "1 hour ago",
      records: "3,456",
      logo: "https://logo.clearbit.com/intercom.com",
    },
    {
      name: "Stripe",
      description: "Payment and subscription data",
      status: "warning",
      lastSync: "2 days ago",
      records: "645",
      logo: "https://logo.clearbit.com/stripe.com",
    },
    {
      name: "Zendesk",
      description: "Customer support tickets",
      status: "disconnected",
      lastSync: "Never",
      records: "0",
      logo: "https://logo.clearbit.com/zendesk.com",
    },
    {
      name: "Segment",
      description: "Product analytics and events",
      status: "connected",
      lastSync: "5 minutes ago",
      records: "12,345",
      logo: "https://logo.clearbit.com/segment.com",
    },
  ]

  const stats = [
    { label: "Active Connectors", value: "4" },
    { label: "Total Records", value: "18.6K" },
    { label: "Last Updated", value: "2 mins ago" },
  ]

  const getStatusBadge = (status: string) => {
    if (status === "connected") {
      return (
        <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Connected
        </Badge>
      )
    }
    if (status === "warning") {
      return (
        <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">
          <AlertCircle className="mr-1 h-3 w-3" />
          Needs Attention
        </Badge>
      )
    }
    return (
      <Badge variant="secondary">
        <XCircle className="mr-1 h-3 w-3" />
        Disconnected
      </Badge>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 flex-col bg-background">
          <main className="flex flex-1 flex-col p-6">
            <div className="mx-auto w-full max-w-7xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <Plug className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary">Data Connectors</h1>
                  <p className="text-sm text-muted-foreground">Connect and manage your data sources</p>
                </div>
              </div>

              <div className="mb-6 grid gap-4 md:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {connectors.map((connector, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-lg"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <img
                            src={connector.logo || "/placeholder.svg"}
                            alt={connector.name}
                            className="h-6 w-6"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = "none"
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">{connector.name}</h3>
                        </div>
                      </div>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">{connector.description}</p>
                    <div className="mb-3">{getStatusBadge(connector.status)}</div>
                    <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
                      <div className="text-muted-foreground">Last sync: {connector.lastSync}</div>
                      <div className="font-medium text-primary">{connector.records} records</div>
                    </div>
                    {connector.status === "disconnected" && (
                      <button className="mt-3 w-full rounded-lg bg-[#ff6b35] px-4 py-2 text-sm font-medium text-white hover:bg-[#ff6b35]/90">
                        Connect
                      </button>
                    )}
                    {connector.status === "warning" && (
                      <button className="mt-3 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted">
                        Reconnect
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </main>
          <AppFooter />
        </div>
      </div>
    </div>
  )
}
