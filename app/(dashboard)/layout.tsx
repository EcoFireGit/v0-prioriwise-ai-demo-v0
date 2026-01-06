"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutGrid, TrendingUp, AlertTriangle, BookOpen, Users, Plug } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Growth Signals", href: "/growth-signals", icon: TrendingUp },
  { name: "Risk Center", href: "/risk-center", icon: AlertTriangle },
  { name: "Value Library", href: "/value-library", icon: BookOpen },
  { name: "Client Portfolio", href: "/client-portfolio", icon: Users },
  { name: "Data Connectors", href: "/data-connectors", icon: Plug },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-[#1a1f4d]">
      <aside className="w-72 flex-shrink-0 bg-[#1e2555] flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-8">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#f05523] to-[#ff7849] flex items-center justify-center">
            <div className="h-5 w-5 rounded border-2 border-white" />
          </div>
          <span className="text-2xl font-semibold text-white">Prioriwise</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-transparent border-2 border-[#f05523] text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 text-sm text-white/50">© 2026 Prioriwise</div>
      </aside>

      <main className="flex-1 bg-gradient-to-br from-[#1a1f4d] via-[#2d3470] to-[#4a3d6b]">{children}</main>
    </div>
  )
}
