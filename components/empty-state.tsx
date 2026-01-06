"use client"

import { Sparkles, Users, FolderOpen } from "lucide-react"

interface EmptyStateProps {
  hasPersona: boolean
  hasCustomer: boolean
  username: string
}

export function EmptyState({ hasPersona, hasCustomer, username }: EmptyStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
          <Sparkles className="h-10 w-10 text-primary/40" />
        </div>
        <h2 className="mb-3 font-heading text-xl font-semibold text-primary">Welcome back, {username}</h2>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          Choose a persona, customer, and project to see tailored insights and opportunities.
        </p>
        <div className="flex flex-col gap-3">
          <div
            className={`flex items-center gap-3 rounded-lg border p-3 ${hasPersona ? "border-green-200 bg-green-50" : "border-secondary bg-card"}`}
          >
            <Users className={`h-5 w-5 ${hasPersona ? "text-green-600" : "text-muted-foreground"}`} />
            <span className={`text-sm ${hasPersona ? "text-green-700" : "text-muted-foreground"}`}>
              {hasPersona ? "Persona selected ✓" : "Select a persona"}
            </span>
          </div>
          <div
            className={`flex items-center gap-3 rounded-lg border p-3 ${hasCustomer ? "border-green-200 bg-green-50" : "border-secondary bg-card"}`}
          >
            <FolderOpen className={`h-5 w-5 ${hasCustomer ? "text-green-600" : "text-muted-foreground"}`} />
            <span className={`text-sm ${hasCustomer ? "text-green-700" : "text-muted-foreground"}`}>
              {hasCustomer ? "Customer selected ✓" : "Select a customer & project"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
