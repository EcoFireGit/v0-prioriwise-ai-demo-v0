"use client"

import { Package, Smartphone, Zap, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface LicenseType {
  type: string
  icon: "software" | "device" | "service"
  contracted: number
  active: number
  variance: number
  monthlyRecovery: number
}

interface LicenseTypeBreakdownProps {
  licenses: LicenseType[]
  totalMonthlyRecovery: number
}

const iconMap = {
  software: Package,
  device: Smartphone,
  service: Zap,
}

export function LicenseTypeBreakdown({ licenses, totalMonthlyRecovery }: LicenseTypeBreakdownProps) {
  return (
    <div className="space-y-4 rounded-lg border border-secondary bg-card p-6">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-accent" />
        <h3 className="font-heading text-lg font-semibold text-primary">License Discrepancies</h3>
      </div>

      <div className="space-y-3">
        {licenses.map((license, idx) => {
          const Icon = iconMap[license.icon]
          const utilizationPercent = (license.active / license.contracted) * 100
          const isOverage = license.variance > 0

          return (
            <div key={idx} className="rounded-lg border border-secondary/50 bg-background p-4">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-secondary p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{license.type}</p>
                    {isOverage ? (
                      <Badge className="mt-1 bg-orange-100 text-orange-700">
                        {license.variance} seats over contracted
                      </Badge>
                    ) : (
                      <Badge className="mt-1 bg-green-100 text-green-700">
                        {Math.abs(license.variance)} seats available
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-accent">${license.monthlyRecovery.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Monthly recovery</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Contracted: {license.contracted} seats</span>
                  <span className="text-muted-foreground">Active: {license.active} seats</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full transition-all ${
                      utilizationPercent > 100 ? "bg-orange-500" : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {utilizationPercent > 100
                    ? `${(utilizationPercent - 100).toFixed(1)}% over capacity`
                    : `${(100 - utilizationPercent).toFixed(1)}% utilization`}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Total Recovery Summary */}
      <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Annual Recovery Opportunity</p>
            <p className="text-2xl font-bold text-accent">${(totalMonthlyRecovery * 12).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">Monthly Revenue Impact</p>
            <p className="text-xl font-semibold text-primary">${totalMonthlyRecovery.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
