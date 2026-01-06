"use client"

import { CheckCircle2, DollarSign, TrendingUp, Download, Calendar, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { Playbook } from "@/lib/mock-data"

interface SecurityPlaybookProps {
  playbook: Playbook
}

export function SecurityPlaybook({ playbook }: SecurityPlaybookProps) {
  const costData = [
    {
      name: "EDR Investment",
      value: playbook.estimatedCost,
      fill: "hsl(var(--accent))",
    },
    {
      name: "Potential Breach Cost",
      value: playbook.costOfInaction,
      fill: "hsl(var(--destructive))",
    },
  ]

  // Group steps by phase
  const phases = playbook.steps.reduce(
    (acc, step) => {
      if (!acc[step.phase]) {
        acc[step.phase] = []
      }
      acc[step.phase].push(step)
      return acc
    },
    {} as Record<string, typeof playbook.steps>,
  )

  return (
    <div className="space-y-6 rounded-lg border border-accent/20 bg-accent/5 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-accent" />
          <h3 className="font-heading text-lg font-semibold text-primary">AI-Generated Security Playbook</h3>
        </div>
        <Badge variant="outline" className="bg-background">
          Timeline: {playbook.timeline}
        </Badge>
      </div>

      {/* ROI Summary */}
      <div className="rounded-lg border border-secondary bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-accent" />
          <h4 className="text-sm font-semibold uppercase tracking-wide text-primary">ROI Analysis</h4>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{playbook.roiSummary}</p>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={costData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
            <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))" }} fontSize={12} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="value" name="Cost ($)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-secondary p-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-primary">Expected Risk Reduction</span>
          </div>
          <span className="font-heading text-xl font-bold text-green-600">{playbook.expectedRiskReduction}%</span>
        </div>
      </div>

      {/* Conversation Script */}
      <div className="rounded-lg border border-secondary bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-accent" />
          <h4 className="text-sm font-semibold uppercase tracking-wide text-primary">Sales Conversation Script</h4>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{playbook.conversationScript}</p>
      </div>

      {/* Implementation Steps */}
      <div className="rounded-lg border border-secondary bg-card p-4">
        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Implementation Timeline</h4>

        <div className="space-y-6">
          {Object.entries(phases).map(([phase, steps], phaseIdx) => (
            <div key={phaseIdx} className="relative">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                  {phaseIdx + 1}
                </div>
                <h5 className="font-heading text-base font-semibold text-primary">{phase}</h5>
              </div>

              <div className="ml-11 space-y-3">
                {steps.map((step, stepIdx) => (
                  <div key={stepIdx} className="rounded-lg border border-secondary/50 bg-background p-3">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <p className="text-sm font-medium text-primary">{step.action}</p>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {step.duration}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>
                        <strong>Owner:</strong> {step.owner}
                      </span>
                      {step.dependencies.length > 0 && (
                        <span>
                          <strong>Depends on:</strong> {step.dependencies.length} task(s)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="flex-1 bg-accent font-heading text-accent-foreground hover:bg-accent/90">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Security Review
        </Button>
        <Button variant="outline" className="flex-1 font-heading bg-transparent">
          <Download className="mr-2 h-4 w-4" />
          Download Full Playbook
        </Button>
      </div>
    </div>
  )
}
