import { MessageSquare } from "lucide-react"

interface ConversationStep {
  step: string
  talking_point: string
}

interface ConversationPlaybookProps {
  playbook: {
    title: string
    steps: ConversationStep[]
  }
}

export function ConversationPlaybook({ playbook }: ConversationPlaybookProps) {
  return (
    <div className="rounded-lg border border-secondary bg-card p-4">
      <h3 className="mb-4 flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wide text-primary">
        <MessageSquare className="h-4 w-4" />
        {playbook.title}
      </h3>
      <div className="space-y-3">
        {playbook.steps.map((item, idx) => (
          <div key={idx} className="border-l-2 border-accent pl-3">
            <p className="text-sm font-medium text-primary">{item.step}</p>
            <p className="text-xs text-muted-foreground">{item.talking_point}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
