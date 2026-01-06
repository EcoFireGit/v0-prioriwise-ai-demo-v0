"use client"

import { Header } from "@/components/header"
import { AppFooter } from "@/components/app-footer"
import { Sidebar } from "@/components/sidebar"
import { TriangleAlert } from "lucide-react"

export default function RiskCenterPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-64 flex flex-1 flex-col bg-background">
        <Header />
        <main className="flex flex-1 flex-col p-6">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                <TriangleAlert className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Risk Center</h1>
                <p className="text-sm text-muted-foreground">Monitor and mitigate customer health risks</p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">Risk Center content coming soon...</p>
            </div>
          </div>
        </main>
        <AppFooter />
      </div>
    </div>
  )
}
