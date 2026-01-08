"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Persona, Customer, Project } from "@/lib/mock-data"

interface SelectorsProps {
  persona: Persona | null
  setPersona: (p: Persona) => void
  customer: Customer | null
  setCustomer: (c: Customer) => void
  project: Project | null
  setProject: (p: Project) => void
  customers: Customer[]
  projects: Project[]
}

export function Selectors({
  persona,
  setPersona,
  customer,
  setCustomer,
  project,
  setProject,
  customers,
  projects,
}: SelectorsProps) {
  const personas: Persona[] = ["Sales", "Account Management", "Engineering"]

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* Persona Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="min-w-[160px] justify-between border-secondary bg-card font-heading text-primary hover:bg-muted hover:text-primary animate-slide-in-up transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/40"
          >
            {persona || "Select Department"}
            <ChevronDown className="ml-2 h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-y-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[160px] animate-slide-in-up">
          {personas.map((p) => (
            <DropdownMenuItem
              key={p}
              onClick={() => setPersona(p)}
              className="cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-primary/10"
            >
              {p}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Customer Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="min-w-[160px] justify-between border-secondary bg-card font-heading text-primary hover:bg-muted hover:text-primary animate-slide-in-up transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/40"
            style={{ animationDelay: "0.1s" }}
          >
            {customer?.name || "Select Customer"}
            <ChevronDown className="ml-2 h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-y-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[180px] animate-slide-in-up">
          {customers.map((c) => (
            <DropdownMenuItem
              key={c.id}
              onClick={() => setCustomer(c)}
              className="cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-primary/10"
            >
              {c.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Project Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="min-w-[180px] justify-between border-secondary bg-card font-heading text-primary hover:bg-muted hover:text-primary animate-slide-in-up transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/40"
            style={{ animationDelay: "0.2s" }}
            disabled={!customer}
          >
            {project?.name || "Select Project"}
            <ChevronDown className="ml-2 h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-y-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[200px] animate-slide-in-up">
          {projects.map((p) => (
            <DropdownMenuItem
              key={p}
              onClick={() => setProject(p)}
              className="cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-primary/10"
            >
              {p.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
