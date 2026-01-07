"use client"

import { useEffect, useState } from "react"

export function AgentMeshAnimation() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const duration = 5000
    const stageInterval = duration / 4
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 4)
    }, stageInterval)

    return () => clearInterval(interval)
  }, [])

  const stages = [
    { name: "Account Analysis", color: "from-blue-400" },
    { name: "Health Assessment", color: "from-green-400" },
    { name: "Trend Analysis", color: "from-purple-400" },
    { name: "Insights Generation", color: "from-orange-400" },
  ]

  const agentNames = [
    { name: "Account Analysis Agent", cx: 100, cy: 50 },
    { name: "Risk Assessment Agent", cx: 140, cy: 90 },
    { name: "Trend Analysis Agent", cx: 60, cy: 90 },
    { name: "Insights Agent", cx: 100, cy: 100 },
    { name: "Financial Agent", cx: 140, cy: 150 },
    { name: "Health Agent", cx: 60, cy: 150 },
  ]

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Mesh visualization with agent labels */}
      <div className="relative h-48 w-48">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <style>{`
              @keyframes pulse-node {
                0%, 100% { r: 6px; opacity: 1; }
                50% { r: 8px; opacity: 0.9; }
              }
              @keyframes pulse-node-2 {
                0%, 100% { r: 6px; opacity: 0.95; }
                50% { r: 8px; opacity: 0.75; }
              }
              @keyframes pulse-node-3 {
                0%, 100% { r: 6px; opacity: 0.9; }
                50% { r: 8px; opacity: 0.7; }
              }
              @keyframes flow-1 {
                0% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -20; }
              }
              @keyframes flow-2 {
                0% { stroke-dashoffset: -10; }
                100% { stroke-dashoffset: -30; }
              }
              .agent-node { fill: #242e65; }
              .agent-pulse-1 { animation: pulse-node 2s ease-in-out infinite; }
              .agent-pulse-2 { animation: pulse-node-2 2.2s ease-in-out 0.4s infinite; }
              .agent-pulse-3 { animation: pulse-node-3 2.4s ease-in-out 0.8s infinite; }
              .connection-line {
                stroke: #242e65;
                stroke-width: 1.5;
                opacity: 0.8;
                stroke-dasharray: 5, 5;
              }
              .flow-1 { animation: flow-1 4s linear infinite; }
              .flow-2 { animation: flow-2 4s linear infinite; }
              .accent-pulse {
                fill: #f05523;
                animation: pulse-node 1.8s ease-in-out infinite;
              }
            `}</style>
          </defs>

          {/* Connection lines - mesh pattern */}
          <line x1="100" y1="50" x2="140" y2="90" className="connection-line flow-1" />
          <line x1="100" y1="50" x2="60" y2="90" className="connection-line flow-2" />
          <line x1="140" y1="90" x2="140" y2="150" className="connection-line flow-1" />
          <line x1="60" y1="90" x2="60" y2="150" className="connection-line flow-2" />
          <line x1="140" y1="150" x2="60" y2="150" className="connection-line flow-1" />
          <line x1="100" y1="50" x2="100" y2="200" className="connection-line flow-2" />

          {/* Agent nodes - top */}
          <circle cx="100" cy="50" className="agent-node agent-pulse-1" r="6" />

          {/* Agent nodes - middle */}
          <circle cx="140" cy="90" className="agent-node agent-pulse-2" r="6" />
          <circle cx="60" cy="90" className="agent-node agent-pulse-3" r="6" />
          <circle cx="100" cy="100" className="accent-pulse" r="6" />

          {/* Agent nodes - bottom */}
          <circle cx="140" cy="150" className="agent-node agent-pulse-2" r="6" />
          <circle cx="60" cy="150" className="agent-node agent-pulse-3" r="6" />

          {agentNames.map((agent, idx) => (
            <text
              key={idx}
              x={agent.cx}
              y={agent.cy - 18}
              textAnchor="middle"
              className="text-xs font-medium"
              fill="#ffffff"
              opacity="0.95"
              fontSize="12"
            >
              {agent.name.split(" ")[0]}
            </text>
          ))}
        </svg>
      </div>

      {/* Agent title and description */}
      <div className="text-center">
        <p className="font-heading text-2xl font-medium text-white">Agents analyzing...</p>
        <p className="text-base text-white/80">Mesh network processing insights</p>
      </div>

      <div className="w-64 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-base font-medium text-white">{stages[stage].name}</span>
          <span className="text-sm text-white/60">{stage + 1} of 4</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className={`h-full bg-gradient-to-r ${stages[stage].color} to-orange-400 transition-all duration-300`}
            style={{ width: `${((stage + 1) / 4) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/60">
          {stages.map((s, idx) => (
            <span key={idx} className={idx <= stage ? "text-white/80" : ""}>
              {s.name.split(" ")[0]}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
