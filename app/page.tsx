"use client"

import { useState, useCallback, useEffect } from "react"
import { LayoutDashboard, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Selectors } from "@/components/selectors"
import { InsightCard } from "@/components/insight-card"
import { InsightModal } from "@/components/insight-modal"
import { QuestionInput } from "@/components/question-input"
import { CustomerSummary } from "@/components/customer-summary"
import { AppFooter } from "@/components/app-footer"
import { StakeholderChatbot } from "@/components/stakeholder-chatbot"
import { Sidebar } from "@/components/sidebar"
import { redirect } from "next/navigation"
import { AgentMeshAnimation } from "@/components/agent-mesh-animation"
import {
  customers,
  getProjectsForCustomer,
  getInsightsForPersona,
  type Persona,
  type Customer,
  type Project,
  type InsightCard as InsightCardType,
} from "@/lib/mock-data"

export default function Dashboard() {
  const [persona, setPersona] = useState<Persona | null>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [selectedInsight, setSelectedInsight] = useState<InsightCardType | null>(null)
  const [isModalLoading, setIsModalLoading] = useState(false)
  const [isDashboardAnalyzing, setIsDashboardAnalyzing] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showOpportunityTooltip, setShowOpportunityTooltip] = useState(false)

  const availableProjects = customer ? getProjectsForCustomer(customer.id) : []
  const insights = persona ? getInsightsForPersona(persona) : []

  // Calculate total opportunity for Sales persona
  const formatOpportunity = (value: number) => {
    if (value >= 10000) return `$${(value / 1000).toFixed(0)}k`
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`
    return `$${Math.round(value)}`
  }

  const totalOpportunity = insights
    .filter((insight) => insight.persona === "Sales")
    .reduce((total, insight) => {
      const monthlyGap = insight.data["Monthly Revenue Gap"]
        ? parseFloat(insight.data["Monthly Revenue Gap"].toString().replace(/[$,]/g, ""))
        : 0
      const gapValue = insight.data["Gap Value"]
        ? parseFloat(insight.data["Gap Value"].toString().replace(/[$,\/yr]/g, "")) / 12
        : 0
      return total + (monthlyGap || gapValue)
    }, 0)

  useEffect(() => {
    if (persona && customer && project && !showDashboard) {
      setIsDashboardAnalyzing(true)
      // Simulate analyzing delay
      setTimeout(() => {
        setIsDashboardAnalyzing(false)
        setShowDashboard(true)
      }, 1500)
    }
  }, [persona, customer, project, showDashboard])

  const handleCustomerChange = useCallback((c: Customer) => {
    setCustomer(c)
    setProject(null)
  }, [])

  const handleCardClick = useCallback((insight: InsightCardType) => {
    setSelectedInsight(insight)
  }, [])

  const handleQuestionSubmit = useCallback(
    (question: string) => {
      // For demo, show a relevant insight based on the question
      if (insights.length > 0) {
        handleCardClick(insights[0])
      }
    },
    [insights, handleCardClick],
  )

  const handleCloseModal = useCallback(() => {
    setSelectedInsight(null)
    setIsModalLoading(false)
  }, [])

  const handleReturnToDashboard = useCallback(() => {
    setPersona(null)
    setCustomer(null)
    setProject(null)
    setSelectedInsight(null)
    setIsModalLoading(false)
    setShowDashboard(false)
    setIsDashboardAnalyzing(false)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 flex-col bg-background ml-64">
          <main className="flex flex-1 flex-col p-6">
            {!showDashboard ? (
              <>
                <div className="flex flex-1 items-center justify-center">
                  <div className="mx-auto max-w-md text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary animate-float">
                      <LayoutDashboard className="h-10 w-10 text-primary/40" />
                    </div>
                    <h2 className="mb-6 font-heading text-xl font-semibold text-primary">Welcome back, Urvashi</h2>
                    <Selectors
                      persona={persona}
                      setPersona={setPersona}
                      customer={customer}
                      setCustomer={handleCustomerChange}
                      project={project}
                      setProject={setProject}
                      customers={customers}
                      projects={availableProjects}
                    />
                  </div>
                </div>
                {isDashboardAnalyzing && (
                  <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-16 w-16 animate-spin rounded-full border-4 border-secondary border-t-primary"></div>
                      <p className="font-heading text-lg font-medium text-white">Analyzing data...</p>
                      <p className="text-sm text-white/80">Generating insights and recommendations</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="mx-auto w-full max-w-7xl space-y-6">
                {/* Customer Summary */}
                <CustomerSummary customer={customer!} project={project!} />

                {/* Question Input */}
                <QuestionInput onSubmit={handleQuestionSubmit} />

                {/* Insights Grid */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      {persona} Insights
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        ({insights.length} opportunities)
                      </span>
                    </h3>
                    {persona === "Sales" && totalOpportunity > 0 && (
                      <div
                        className="relative flex cursor-help items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 transition-all duration-300 hover:bg-emerald-100"
                        onMouseEnter={() => setShowOpportunityTooltip(true)}
                        onMouseLeave={() => setShowOpportunityTooltip(false)}
                      >
                        <span className="text-sm text-muted-foreground">Total Opportunity</span>
                        <span className="font-heading text-lg font-semibold text-primary transition-all duration-300 hover:scale-110">
                          {formatOpportunity(totalOpportunity)} / month
                        </span>
                        <HelpCircle className="h-3.5 w-3.5 cursor-help text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-125" />

                        {showOpportunityTooltip && (
                          <div className="absolute right-0 top-6 z-50 w-72 rounded-lg border border-secondary bg-card p-3 shadow-lg animate-slide-in-up">
                            <p className="text-xs text-muted-foreground">
                              Sum of data-driven revenue opportunity across all Sales insights below.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {insights.map((insight) => (
                      <InsightCard key={insight.id} insight={insight} onClick={() => handleCardClick(insight)} />
                    ))}
                  </div>
                  <div className="mt-8 flex justify-center">
                    <Button
                      onClick={handleReturnToDashboard}
                      variant="outline"
                      className="font-heading text-primary hover:bg-secondary bg-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      Return to Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </main>
          <AppFooter />
        </div>
      </div>

      <div className="fixed bottom-4 right-4">
        <StakeholderChatbot />
      </div>

      <InsightModal
        insight={selectedInsight}
        isLoading={isModalLoading}
        onClose={handleCloseModal}
        onReturnToDashboard={handleReturnToDashboard}
      />
    </div>
  )
}

export function RootPage() {
  redirect("/dashboard")
}
