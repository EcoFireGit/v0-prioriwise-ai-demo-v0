"use client"

import { useState, useCallback } from "react"
import { LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Selectors } from "@/components/selectors"
import { InsightCard } from "@/components/insight-card"
import { InsightModal } from "@/components/insight-modal"
import { QuestionInput } from "@/components/question-input"
import { CustomerSummary } from "@/components/customer-summary"
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

  const availableProjects = customer ? getProjectsForCustomer(customer.id) : []
  const insights = persona ? getInsightsForPersona(persona) : []

  const handleCustomerChange = useCallback((c: Customer) => {
    setCustomer(c)
    setProject(null)
  }, [])

  const handleCardClick = useCallback((insight: InsightCardType) => {
    setIsModalLoading(true)
    setSelectedInsight(null)
    // Simulate processing delay
    setTimeout(() => {
      setSelectedInsight(insight)
      setIsModalLoading(false)
    }, 1500)
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
  }, [])

  const showDashboard = persona && customer && project

  return (
    <div className="flex min-h-screen flex-col bg-[#f9fafb]">
      <Header />

      <main className="flex flex-1 flex-col p-6">
        {!showDashboard ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#D2E5F6]">
                <LayoutDashboard className="h-10 w-10 text-[#242E65]/40" />
              </div>
              <h2 className="mb-6 font-heading text-xl font-semibold text-[#242E65]">Select your context</h2>
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
        ) : (
          <div className="mx-auto w-full max-w-7xl space-y-6">
            {/* Customer Summary */}
            <CustomerSummary customer={customer} project={project} />

            {/* Question Input */}
            <QuestionInput onSubmit={handleQuestionSubmit} />

            {/* Insights Grid */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-[#242d64]">
                {persona} Insights
                <span className="ml-2 text-sm font-normal text-[#6b7280]">({insights.length} opportunities)</span>
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {insights.map((insight) => (
                  <InsightCard key={insight.id} insight={insight} onClick={() => handleCardClick(insight)} />
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={handleReturnToDashboard}
                  variant="outline"
                  className="font-heading text-[#242E65] hover:bg-[#D2E5F6] bg-transparent"
                >
                  Return to Dashboard
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <InsightModal
        insight={selectedInsight}
        isLoading={isModalLoading}
        onClose={handleCloseModal}
        onReturnToDashboard={handleReturnToDashboard}
      />
    </div>
  )
}
