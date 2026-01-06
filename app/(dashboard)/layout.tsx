"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  TrendingUp,
  AlertTriangle,
  Library,
  Briefcase,
  Database,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { AppFooter } from "@/components/app-footer"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Growth Signals", href: "/growth-signals", icon: TrendingUp },
  { name: "Risk Center", href: "/risk-center", icon: AlertTriangle },
  { name: "Value Library", href: "/value-library", icon: Library },
  { name: "Client Portfolio", href: "/client-portfolio", icon: Briefcase },
  { name: "Data Connectors", href: "/data-connectors", icon: Database },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "sticky top-0 h-[calc(100vh-4rem)] border-r border-border bg-card transition-all duration-300",
            collapsed ? "w-16" : "w-64",
          )}
        >
          <div className="flex h-full flex-col">
            {/* Navigation Links */}
            <nav className="flex-1 space-y-1 p-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-secondary text-primary"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                    )}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                  </Link>
                )
              })}
            </nav>

            {/* Collapse Toggle */}
            <div className="border-t border-border p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(!collapsed)}
                className="w-full justify-center"
              >
                {collapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="ml-2">Collapse</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
      <AppFooter />
    </div>
  )
}
