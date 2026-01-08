import { CheckCircle2 } from "lucide-react"

interface PlaybookStep {
  step: string
  action: string
  owner: string
}

interface SecurityPlaybookProps {
  playbook: {
    title: string
    steps: PlaybookStep[]
  }
}

export function SecurityPlaybook({ playbook }: SecurityPlaybookProps) {
  return (
    <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
      <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-accent">{playbook.title}</h3>
      <div className="space-y-3">
        {playbook.steps.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <div className="flex-1">
              <p className="text-sm font-medium text-primary">{item.step}</p>
              <p className="text-xs text-muted-foreground">{item.action}</p>
              <p className="text-xs text-muted-foreground">Owner: {item.owner}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
