"use client"

import { MessageCircle, Users, AlertCircle, TrendingUp, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import type { ConversationPlaybook as ConversationPlaybookType } from "@/lib/mock-data"

interface ConversationPlaybookProps {
  playbook: ConversationPlaybookType
}

export function ConversationPlaybook({ playbook }: ConversationPlaybookProps) {
  const [expandedObjection, setExpandedObjection] = useState<number | null>(null)

  return (
    <div className="space-y-6 rounded-lg border border-accent/20 bg-accent/5 p-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-accent" />
        <h3 className="font-heading text-lg font-semibold text-primary">Conversation Playbook</h3>
      </div>

      {/* Key Discussion Points */}
      <div className="rounded-lg border border-secondary bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent" />
          <h4 className="text-sm font-semibold uppercase tracking-wide text-primary">Key Discussion Points</h4>
        </div>
        <ul className="space-y-2">
          {playbook.discussionPoints.map((point, idx) => (
            <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Success Stories */}
      <div className="rounded-lg border border-secondary bg-card p-4">
        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Wins / Success Stories</h4>
        <div className="space-y-3">
          {playbook.successStories.map((story, idx) => (
            <div key={idx} className="rounded-lg border border-secondary/50 bg-background p-3">
              <div className="mb-2 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-primary">{story.title}</p>
                  <p className="text-xs text-muted-foreground">{story.company}</p>
                </div>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {story.metric}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{story.result}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholder Talk Tracks */}
      <div className="rounded-lg border border-secondary bg-card p-4">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-4 w-4 text-accent" />
          <h4 className="text-sm font-semibold uppercase tracking-wide text-primary">Stakeholder Talk Tracks</h4>
        </div>
        <div className="space-y-3">
          {playbook.stakeholderTalks.map((track, idx) => (
            <div key={idx} className="rounded-lg border border-secondary/50 bg-background p-3">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-primary">{track.stakeholder}</p>
                  <p className="text-xs text-accent">Focus: {track.focus}</p>
                </div>
              </div>
              <ul className="space-y-1.5">
                {track.keyMessages.map((message, msgIdx) => (
                  <li key={msgIdx} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground flex-shrink-0" />
                    <span>{message}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Objection Handling */}
      <div className="rounded-lg border border-secondary bg-card p-4">
        <div className="mb-4 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-accent" />
          <h4 className="text-sm font-semibold uppercase tracking-wide text-primary">Objection Handling</h4>
        </div>
        <div className="space-y-2">
          {playbook.objectionHandling.map((handler, idx) => (
            <div key={idx} className="rounded-lg border border-secondary/50 bg-background p-3">
              <button
                onClick={() => setExpandedObjection(expandedObjection === idx ? null : idx)}
                className="w-full flex items-start justify-between gap-3 text-left"
              >
                <p className="text-sm font-medium text-primary">{handler.objection}</p>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform ${
                    expandedObjection === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedObjection === idx && (
                <div className="mt-3 border-t border-secondary/30 pt-3">
                  <p className="text-sm text-muted-foreground">{handler.response}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
