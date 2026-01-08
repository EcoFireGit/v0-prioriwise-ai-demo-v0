interface RiskProfileProps {
  riskProfile: {
    industry: string
    companySize: string
    dataClassification: string
    complianceFrameworks: string[]
  }
}

export function RiskProfileDisplay({ riskProfile }: RiskProfileProps) {
  return (
    <div className="rounded-lg border border-secondary bg-card p-4">
      <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-primary">Risk Profile</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-xs text-muted-foreground">Industry</span>
          <p className="text-sm font-medium text-primary">{riskProfile.industry}</p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground">Company Size</span>
          <p className="text-sm font-medium text-primary">{riskProfile.companySize}</p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground">Data Classification</span>
          <p className="text-sm font-medium text-primary">{riskProfile.dataClassification}</p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground">Compliance Frameworks</span>
          <p className="text-sm font-medium text-primary">{riskProfile.complianceFrameworks.join(", ")}</p>
        </div>
      </div>
    </div>
  )
}
