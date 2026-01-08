"use client"

import { MessageSquare } from "lucide-react"

interface ConversationStep {
  step: string
  talking_points: string[]
}

interface ConversationPlaybookProps {
  playbook: ConversationStep[]
}

export function ConversationPlaybook({ playbook }: ConversationPlaybookProps) {
  return (
    <div className="rounded-lg border border-secondary bg-card p-4">
      <div className="mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-primary">
          Conversation Playbook
        </h3>
      </div>
      <div className="space-y-4">
        {playbook.map((step, idx) => (
          <div key={idx}>
            <h4 className="mb-2 font-semibold text-primary">{step.step}</h4>
            <ul className="ml-4 space-y-1">
              {step.talking_points.map((point, pointIdx) => (
                <li key={pointIdx} className="text-sm text-muted-foreground">
                  • {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
