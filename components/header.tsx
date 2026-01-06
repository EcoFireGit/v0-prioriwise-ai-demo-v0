"use client"

import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Persona, Customer, Project } from "@/lib/mock-data"

interface HeaderProps {
  persona: Persona | null
  setPersona: (p: Persona) => void
  customer: Customer | null
  setCustomer: (c: Customer) => void
  project: Project | null
  setProject: (p: Project) => void
  customers: Customer[]
  projects: Project[]
}

export function Header({
  persona,
  setPersona,
  customer,
  setCustomer,
  project,
  setProject,
  customers,
  projects,
}: HeaderProps) {
  const personas: Persona[] = ["Sales", "Account Management", "Engineering"]

  return (
    <header className="sticky top-0 z-50 border-b border-[#D2E5F6] bg-[#242E65]">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center">
          <Image src="/prioriwise-logo.png" alt="Prioriwise" width={180} height={40} className="h-8 w-auto" priority />
        </div>

        {/* Selectors */}
        <div className="flex items-center gap-3">
          {/* Persona Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[160px] justify-between border-white/20 bg-white/10 font-heading text-white backdrop-blur-sm hover:bg-white/20"
              >
                {persona || "Select Persona"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
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
                className="min-w-[160px] justify-between border-white/20 bg-white/10 font-heading text-white backdrop-blur-sm hover:bg-white/20"
              >
                {customer?.name || "Select Customer"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
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
                className="min-w-[180px] justify-between border-white/20 bg-white/10 font-heading text-white backdrop-blur-sm hover:bg-white/20"
                disabled={!customer}
              >
                {project?.name || "Select Project"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {projects.map((p) => (
                <DropdownMenuItem key={p.id} onClick={() => setProject(p)} className="cursor-pointer">
                  {p.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
