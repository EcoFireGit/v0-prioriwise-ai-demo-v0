"use client"

export function AgentMeshAnimation() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <style>{`
              @keyframes pulse-node {
                0%, 100% { r: 6px; opacity: 1; }
                50% { r: 8px; opacity: 0.7; }
              }
              @keyframes pulse-node-2 {
                0%, 100% { r: 6px; opacity: 0.6; }
                50% { r: 8px; opacity: 0.3; }
              }
              @keyframes pulse-node-3 {
                0%, 100% { r: 6px; opacity: 0.4; }
                50% { r: 8px; opacity: 0.1; }
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
                opacity: 0.4;
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
        </svg>
      </div>
      <p className="font-heading text-lg font-medium text-white">Agents analyzing...</p>
      <p className="text-sm text-white/80">Mesh network processing insights</p>
    </div>
  )
}
