"use client"

import { Building2, Users, DollarSign, Activity } from "lucide-react"
import type { Customer, Project } from "@/lib/mock-data"

interface CustomerSummaryProps {
  customer: Customer
  project: Project
}

export function CustomerSummary({ customer, project }: CustomerSummaryProps) {
  const healthColor =
    customer.healthScore >= 80
      ? "text-green-600 bg-green-50"
      : customer.healthScore >= 60
        ? "text-amber-600 bg-amber-50"
        : "text-red-600 bg-red-50"

  const statusColor =
    project.status === "Healthy"
      ? "bg-green-100 text-green-700"
      : project.status === "At Risk"
        ? "bg-red-100 text-red-700"
        : "bg-blue-100 text-blue-700"

  return (
    <div className="rounded-xl border border-secondary bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold text-primary">{customer.name}</h2>
            <p className="text-sm text-muted-foreground">
              {project.name} •{" "}
              <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusColor}`}>
                {project.status}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Employees</p>
              <p className="font-heading font-semibold text-primary">{customer.employees}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Contract Value</p>
              <p className="font-heading font-semibold text-primary">${customer.contractValue.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Health Score</p>
              <p className={`font-heading rounded-md px-2 py-0.5 font-semibold ${healthColor}`}>
                {customer.healthScore}/100
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
