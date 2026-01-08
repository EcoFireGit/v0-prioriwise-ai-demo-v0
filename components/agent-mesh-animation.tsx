"use client"

import { useEffect, useState } from "react"

// Agent nodes: Onboarding (O), Account Mgmt (A), Value Delivery (V), Growth (G)
const AGENTS = [
  { id: "O", label: "Onboarding", fullName: "Onboarding" },
  { id: "A", label: "Account Mgmt", fullName: "Account Management" },
  { id: "V", label: "Value Delivery", fullName: "Value Delivery" },
  { id: "G", label: "Growth", fullName: "Growth Analysis" },
]

const ANIMATION_DURATION = 5000

export function AgentMeshAnimation() {
  const [progress, setProgress] = useState(0)
  const [activeAgents, setActiveAgents] = useState<string[]>([])

  useEffect(() => {
    const startTime = Date.now()

    const animationInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / ANIMATION_DURATION) * 100, 100)

      setProgress(newProgress)

      // Cycle through agents becoming active based on progress
      const activeCount = Math.floor((newProgress / 100) * AGENTS.length)
      setActiveAgents(AGENTS.slice(0, activeCount).map((a) => a.id))

      if (newProgress >= 100) {
        clearInterval(animationInterval)
      }
    }, 50)

    return () => clearInterval(animationInterval)
  }, [])

  const getAgentPosition = (index: number) => {
    const angles = [315, 45, 225, 135] // Top-left, top-right, bottom-left, bottom-right
    const angle = (angles[index] * Math.PI) / 180
    const radius = 25 // Reduced from 150 to properly fit in viewport
    const centerX = 50
    const centerY = 50

    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* SVG for lines and connections */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Dashed lines from center to each agent */}
          {AGENTS.map((agent, index) => {
            const pos = getAgentPosition(index)
            const isActive = activeAgents.includes(agent.id)

            return (
              <line
                key={`line-${agent.id}`}
                x1="50"
                y1="50"
                x2={pos.x}
                y2={pos.y}
                stroke={isActive ? "#f97316" : "#d4d4d8"}
                strokeWidth="0.5"
                strokeDasharray="2,1"
                opacity={isActive ? 1 : 0.4}
                style={{
                  transition: "all 0.5s ease",
                }}
              />
            )
          })}
        </svg>

        {/* Center Prioriwise node */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-20 blur-lg"
              style={{
                width: "90px",
                height: "90px",
                left: "-45px",
                top: "-45px",
              }}
            />

            {/* Main center circle */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center shadow-xl">
              <div className="text-center">
                <div className="text-sm font-bold text-white">Priori</div>
                <div className="text-sm font-bold text-white">wise</div>
              </div>
            </div>
          </div>
        </div>

        {AGENTS.map((agent, index) => {
          const pos = getAgentPosition(index)
          const isActive = activeAgents.includes(agent.id)

          return (
            <div
              key={`agent-${agent.id}`}
              className="absolute"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 20,
              }}
            >
              {/* Agent circle */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
                    : "bg-indigo-400 text-white shadow-md"
                }`}
                style={{
                  animation: isActive ? "pulse-agent 2s ease-in-out infinite" : "none",
                }}
              >
                {agent.id}
              </div>

              {/* Agent label below */}
              <div className="text-center mt-3">
                <p className="text-sm font-semibold text-slate-900">{agent.label}</p>
              </div>
            </div>
          )
        })}

        {/* Status text and progress bar container */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-md px-8 z-10">
          {/* Status text */}
          <p className="text-center text-lg font-semibold text-slate-900 mb-4">Generating insights...</p>

          {/* Progress bar */}
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* Progress percentage */}
          <p className="text-center text-xs text-slate-600 mt-2">{Math.round(progress)}%</p>
        </div>

        {/* CSS animations */}
        <style>{`
          @keyframes pulse-agent {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.7);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 0 0 8px rgba(79, 70, 229, 0);
            }
          }
        `}</style>
      </div>
    </div>
  )
}
