"use client"

interface LicenseType {
  type: string
  currentSeats: number
  activeUsers: number
  unusedSeats: number
  costPerSeat: number
  monthlyRecovery: number
}

interface LicenseTypeBreakdownProps {
  licenses: LicenseType[]
  totalMonthlyRecovery: number
}

export function LicenseTypeBreakdown({ licenses, totalMonthlyRecovery }: LicenseTypeBreakdownProps) {
  return (
    <div className="rounded-lg border border-secondary bg-card p-4">
      <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-primary">
        License Type Breakdown
      </h3>
      <div className="space-y-4">
        {licenses.map((license, idx) => (
          <div key={idx} className="rounded-lg border border-secondary/50 bg-secondary/30 p-3">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-semibold text-primary">{license.type}</h4>
              <span className="text-sm font-semibold text-accent">${license.monthlyRecovery.toLocaleString()}/mo</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Current Seats:</span>
                <span className="ml-2 font-semibold text-primary">{license.currentSeats}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Active Users:</span>
                <span className="ml-2 font-semibold text-primary">{license.activeUsers}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Unused Seats:</span>
                <span className="ml-2 font-semibold text-destructive">{license.unusedSeats}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Cost/Seat:</span>
                <span className="ml-2 font-semibold text-primary">${license.costPerSeat}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-secondary pt-3">
          <span className="font-heading font-semibold text-primary">Total Monthly Recovery</span>
          <span className="font-heading text-lg font-bold text-accent">${totalMonthlyRecovery.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
