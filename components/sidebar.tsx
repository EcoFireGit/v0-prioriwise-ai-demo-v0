"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, TrendingUp, TriangleAlert, BookOpen, Users, Plug } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Growth Signals", href: "/growth-signals", icon: TrendingUp },
  { name: "Risk Center", href: "/risk-center", icon: TriangleAlert },
  { name: "Value Library", href: "/value-library", icon: BookOpen },
  { name: "Client Portfolio", href: "/client-portfolio", icon: Users },
  { name: "Data Connectors", href: "/data-connectors", icon: Plug },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 flex-col bg-[#1e2555] text-white">
      <div className="flex h-full flex-col">
        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-2 border-[#ff6b35] bg-[#1e2555] text-white"
                    : "border-2 border-transparent text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 px-6 py-4">
          <p className="text-xs text-white/50">© 2026 Prioriwise</p>
        </div>
      </div>
    </aside>
  )
}
