"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/header"
import { Selectors } from "@/components/selectors"
import { InsightCard } from "@/components/insight-card"
import { InsightModal } from "@/components/insight-modal"
import { QuestionInput } from "@/components/question-input"
import { EmptyState } from "@/components/empty-state"
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

  const showDashboard = persona && customer && project

  return (
    <div className="flex min-h-screen flex-col bg-[#f9fafb]">
      <Header />

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

      <main className="flex flex-1 flex-col p-6">
        {!showDashboard ? (
          <EmptyState hasPersona={!!persona} hasCustomer={!!customer && !!project} />
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
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      <InsightModal insight={selectedInsight} isLoading={isModalLoading} onClose={handleCloseModal} />
    </div>
  )
}
