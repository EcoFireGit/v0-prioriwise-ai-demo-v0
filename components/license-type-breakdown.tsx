interface License {
  type: string
  unusedSeats: number
  monthlyCostPerSeat: number
  potentialRecovery: number
}

interface LicenseTypeBreakdownProps {
  licenses: License[]
  totalMonthlyRecovery: number
}

export function LicenseTypeBreakdown({ licenses, totalMonthlyRecovery }: LicenseTypeBreakdownProps) {
  return (
    <div className="rounded-lg border border-secondary bg-card p-4">
      <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-primary">
        License Breakdown
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-secondary">
              <th className="pb-2 text-left font-medium text-muted-foreground">License Type</th>
              <th className="pb-2 text-right font-medium text-muted-foreground">Unused Seats</th>
              <th className="pb-2 text-right font-medium text-muted-foreground">Cost/Seat</th>
              <th className="pb-2 text-right font-medium text-muted-foreground">Recovery</th>
            </tr>
          </thead>
          <tbody>
            {licenses.map((license, idx) => (
              <tr key={idx} className="border-b border-secondary/50">
                <td className="py-2 text-primary">{license.type}</td>
                <td className="py-2 text-right text-primary">{license.unusedSeats}</td>
                <td className="py-2 text-right text-primary">${license.monthlyCostPerSeat}</td>
                <td className="py-2 text-right font-medium text-accent">${license.potentialRecovery}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-secondary">
              <td colSpan={3} className="pt-2 text-right font-medium text-primary">
                Total Monthly Recovery:
              </td>
              <td className="pt-2 text-right font-semibold text-accent">${totalMonthlyRecovery}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
