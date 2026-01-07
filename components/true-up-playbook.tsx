"use client"

import { BookOpen, Lightbulb, MessageSquare, CheckCircle, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export interface UsageDocumentation {
  title: string
  description: string
  dataPoint: string
}

export interface DiscussionFramework {
  title: string
  approach: string
  keyTalkingPoints: string[]
}

export interface TrueUpPlaybookData {
  overviewMessage: string
  usageDocumentation: UsageDocumentation[]
  discussionFrameworks: DiscussionFramework[]
  relationshipGuidance: string[]
  nextSteps: string[]
}

interface TrueUpPlaybookProps {
  playbook: TrueUpPlaybookData
}

export function TrueUpPlaybook({ playbook }: TrueUpPlaybookProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("overview")

  return (
    <div className="space-y-6 rounded-lg border border-accent/20 bg-accent/5 p-6">
      <div className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-accent" />
        <h3 className="font-heading text-lg font-semibold text-primary">True-Up Playbook & Guidance</h3>
      </div>

      {/* Overview Message */}
      <div className="rounded-lg border border-secondary bg-card p-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{playbook.overviewMessage}</p>
      </div>

      {/* Usage Documentation */}
      <div className="rounded-lg border border-secondary bg-card p-4">
        <button
          onClick={() => setExpandedSection(expandedSection === "usage" ? null : "usage")}
          className="w-full flex items-start justify-between gap-3 text-left"
        >
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-accent flex-shrink-0" />
            <h4 className="text-sm font-semibold uppercase tracking-wide text-primary">
              Usage Documentation Framework
            </h4>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform ${
              expandedSection === "usage" ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSection === "usage" && (
          <div className="mt-4 space-y-3 border-t border-secondary/30 pt-4">
            {playbook.usageDocumentation.map((doc, idx) => (
              <div key={idx} className="rounded-lg border border-secondary/50 bg-background p-3">
                <p className="font-medium text-primary">{doc.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{doc.description}</p>
                <Badge variant="outline" className="mt-2 text-xs">
                  {doc.dataPoint}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discussion Frameworks */}
      <div className="rounded-lg border border-secondary bg-card p-4">
        <button
          onClick={() => setExpandedSection(expandedSection === "discussion" ? null : "discussion")}
          className="w-full flex items-start justify-between gap-3 text-left"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-accent flex-shrink-0" />
            <h4 className="text-sm font-semibold uppercase tracking-wide text-primary">Discussion Frameworks</h4>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform ${
              expandedSection === "discussion" ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSection === "discussion" && (
          <div className="mt-4 space-y-3 border-t border-secondary/30 pt-4">
            {playbook.discussionFrameworks.map((framework, idx) => (
              <div key={idx} className="rounded-lg border border-secondary/50 bg-background p-3">
                <p className="font-medium text-primary">{framework.title}</p>
                <p className="mt-1 text-xs font-medium text-accent">Approach: {framework.approach}</p>
                <ul className="mt-2 space-y-1">
                  {framework.keyTalkingPoints.map((point, pointIdx) => (
                    <li key={pointIdx} className="flex gap-2 text-xs text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Relationship Guidance */}
      <div className="rounded-lg border border-secondary bg-card p-4">
        <button
          onClick={() => setExpandedSection(expandedSection === "relationship" ? null : "relationship")}
          className="w-full flex items-start justify-between gap-3 text-left"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
            <h4 className="text-sm font-semibold uppercase tracking-wide text-primary">Relationship Management</h4>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform ${
              expandedSection === "relationship" ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSection === "relationship" && (
          <div className="mt-4 space-y-2 border-t border-secondary/30 pt-4">
            {playbook.relationshipGuidance.map((guidance, idx) => (
              <div key={idx} className="flex gap-3 text-sm text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                <span>{guidance}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="rounded-lg border border-accent/20 bg-accent/10 p-4">
        <h4 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-accent">
          Recommended Next Steps
        </h4>
        <ol className="space-y-2">
          {playbook.nextSteps.map((step, idx) => (
            <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
              <span className="font-semibold text-accent">{idx + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
