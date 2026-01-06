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
            className="min-w-[160px] justify-between border-[#D2E5F6] bg-white font-heading text-[#242e65] hover:bg-[#f3f4f6]"
          >
            {persona || "Select Persona"}
            <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[160px]">
          {personas.map((p) => (
            <DropdownMenuItem key={p} onClick={() => setPersona(p)} className="cursor-pointer">
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
            className="min-w-[160px] justify-between border-[#D2E5F6] bg-white font-heading text-[#242e65] hover:bg-[#f3f4f6]"
          >
            {customer?.name || "Select Customer"}
            <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[180px]">
          {customers.map((c) => (
            <DropdownMenuItem key={c.id} onClick={() => setCustomer(c)} className="cursor-pointer">
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
            className="min-w-[180px] justify-between border-[#D2E5F6] bg-white font-heading text-[#242e65] hover:bg-[#f3f4f6]"
            disabled={!customer}
          >
            {project?.name || "Select Project"}
            <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[200px]">
          {projects.map((p) => (
            <DropdownMenuItem key={p.id} onClick={() => setProject(p)} className="cursor-pointer">
              {p.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
