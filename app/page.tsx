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
import { calculateTotalOpportunity, formatOpportunity } from "@/lib/opportunity-calculator"

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
  const totalOpportunity = persona === "Sales" ? calculateTotalOpportunity(insights) : 0

  useEffect(() => {
    if (persona && customer && project && !showDashboard) {
      setIsDashboardAnalyzing(true)
      setTimeout(() => {
        setIsDashboardAnalyzing(false)
        setShowDashboard(true)
      }, 5000)
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
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <main className="ml-64 flex flex-1 flex-col p-6">
          {!showDashboard ? (
            <>
              <div className="flex flex-1 items-center justify-center">
                <div className="mx-auto max-w-md text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
                    <LayoutDashboard className="h-10 w-10 text-primary/40" />
                  </div>
                  <h2 className="mb-6 font-heading text-xl font-semibold text-primary">Select your context</h2>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
                  <AgentMeshAnimation />
                </div>
              )}
            </>
          ) : (
            <div className="mx-auto w-full max-w-7xl space-y-6">
              {/* Customer Summary */}
              <CustomerSummary customer={customer} project={project} />

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
                      className="relative flex items-center gap-1.5"
                      onMouseEnter={() => setShowOpportunityTooltip(true)}
                      onMouseLeave={() => setShowOpportunityTooltip(false)}
                    >
                      <span className="text-sm text-muted-foreground">Total Opportunity</span>
                      <span className="font-heading text-lg font-semibold text-primary">
                        {formatOpportunity(totalOpportunity)} / month
                      </span>
                      <HelpCircle className="h-3.5 w-3.5 cursor-help text-muted-foreground transition-colors hover:text-primary" />

                      {showOpportunityTooltip && (
                        <div className="absolute right-0 top-6 z-50 w-72 rounded-lg border border-secondary bg-card p-3 shadow-lg">
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
                    className="font-heading text-primary hover:bg-secondary bg-transparent"
                  >
                    Return to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <AppFooter />

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
