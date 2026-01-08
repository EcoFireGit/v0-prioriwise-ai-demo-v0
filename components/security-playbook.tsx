"use client"

interface PlaybookStep {
  title: string
  description: string
}

interface SecurityPlaybookProps {
  playbook: PlaybookStep[]
}

export function SecurityPlaybook({ playbook }: SecurityPlaybookProps) {
  return (
    <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
      <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-accent">Security Playbook</h3>
      <div className="space-y-4">
        {playbook.map((step, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                {idx + 1}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="mb-1 font-semibold text-primary">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
