"use client"

import { Header } from "@/components/header"
import { AppFooter } from "@/components/app-footer"
import { Sidebar } from "@/components/sidebar"
import { BookOpen, FileText, Video, Presentation, Download, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ValueLibraryPage() {
  const resources = [
    {
      title: "ROI Calculator Template",
      type: "Template",
      category: "Business Case",
      description: "Quantify customer value and build compelling business cases",
      usage: 45,
      icon: FileText,
    },
    {
      title: "Customer Success Best Practices",
      type: "Guide",
      category: "Strategy",
      description: "Proven strategies for driving adoption and retention",
      usage: 38,
      icon: BookOpen,
    },
    {
      title: "QBR Presentation Framework",
      type: "Template",
      category: "QBR",
      description: "Structure impactful quarterly business reviews",
      usage: 52,
      icon: Presentation,
    },
    {
      title: "Onboarding Checklist",
      type: "Checklist",
      category: "Onboarding",
      description: "Ensure smooth customer onboarding experiences",
      usage: 41,
      icon: FileText,
    },
    {
      title: "Product Demo Video Library",
      type: "Video",
      category: "Training",
      description: "Feature walkthroughs and product demonstrations",
      usage: 29,
      icon: Video,
    },
    {
      title: "Renewal Playbook",
      type: "Playbook",
      category: "Renewals",
      description: "Step-by-step guide for successful renewals",
      usage: 36,
      icon: BookOpen,
    },
  ]

  const categories = [
    { name: "Business Case", count: 8 },
    { name: "QBR", count: 12 },
    { name: "Onboarding", count: 15 },
    { name: "Training", count: 22 },
    { name: "Renewals", count: 10 },
    { name: "Strategy", count: 18 },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 flex-col bg-background ml-64">
          <main className="flex flex-1 flex-col p-6">
            <div className="mx-auto w-full max-w-7xl">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                    <BookOpen className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-primary">Value Library</h1>
                    <p className="text-sm text-muted-foreground">Access proven strategies and best practices</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">85</div>
                  <div className="text-sm text-muted-foreground">Total Resources</div>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:bg-muted"
                  >
                    {category.name} <span className="text-muted-foreground">({category.count})</span>
                  </button>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource, index) => {
                  const Icon = resource.icon
                  return (
                    <div
                      key={index}
                      className="rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-lg"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                          <Icon className="h-5 w-5 text-blue-500" />
                        </div>
                        <Badge variant="secondary">{resource.type}</Badge>
                      </div>
                      <h3 className="mb-2 font-semibold text-primary">{resource.title}</h3>
                      <p className="mb-3 text-sm text-muted-foreground">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">{resource.usage} downloads</div>
                        <div className="flex gap-2">
                          <button className="rounded p-1 hover:bg-muted">
                            <Download className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button className="rounded p-1 hover:bg-muted">
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </main>
          <AppFooter />
        </div>
      </div>
    </div>
  )
}
