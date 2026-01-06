"use client"

import { useState } from "react"
import { ArrowUpDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { DeviceGap } from "@/lib/mock-data"

interface DeviceGapTableProps {
  devices: DeviceGap[]
}

type SortField = "deviceName" | "riskScore" | "lastSeen"
type SortDirection = "asc" | "desc"

export function DeviceGapTable({ devices }: DeviceGapTableProps) {
  const [sortField, setSortField] = useState<SortField>("riskScore")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [expanded, setExpanded] = useState(false)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection(field === "riskScore" ? "desc" : "asc")
    }
  }

  const sortedDevices = [...devices].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1
    if (sortField === "riskScore") {
      return (a.riskScore - b.riskScore) * multiplier
    }
    if (sortField === "deviceName") {
      return a.deviceName.localeCompare(b.deviceName) * multiplier
    }
    if (sortField === "lastSeen") {
      return a.lastSeen.localeCompare(b.lastSeen) * multiplier
    }
    return 0
  })

  const displayedDevices = expanded ? sortedDevices : sortedDevices.slice(0, 5)

  const getRiskColor = (score: number) => {
    if (score >= 85) return "bg-red-600 text-white"
    if (score >= 75) return "bg-orange-500 text-white"
    if (score >= 65) return "bg-amber-500 text-white"
    return "bg-green-600 text-white"
  }

  const exportToCSV = () => {
    const headers = ["Device Name", "OS Version", "Last Seen", "Risk Score", "Vulnerabilities"]
    const rows = devices.map((d) => [
      d.deviceName,
      d.osVersion,
      d.lastSeen,
      d.riskScore.toString(),
      d.vulnerabilities.join("; "),
    ])

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "security-gap-devices.csv"
    a.click()
  }

  return (
    <div className="space-y-4 rounded-lg border border-secondary bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-primary">Affected Devices ({devices.length})</h3>
        <Button variant="outline" size="sm" onClick={exportToCSV} className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-secondary">
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort("deviceName")}
                  className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-primary hover:text-accent"
                >
                  Device Name
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-semibold uppercase tracking-wide text-primary">OS Version</span>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort("lastSeen")}
                  className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-primary hover:text-accent"
                >
                  Last Seen
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-semibold uppercase tracking-wide text-primary">Vulnerabilities</span>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort("riskScore")}
                  className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-primary hover:text-accent"
                >
                  Risk Score
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedDevices.map((device, idx) => (
              <tr key={idx} className="border-b border-secondary/50 transition-colors hover:bg-secondary/30">
                <td className="px-4 py-3 font-mono text-sm text-primary">{device.deviceName}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{device.osVersion}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{device.lastSeen}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {device.vulnerabilities.slice(0, 2).map((vuln, vIdx) => (
                      <Badge key={vIdx} variant="outline" className="text-xs">
                        {vuln}
                      </Badge>
                    ))}
                    {device.vulnerabilities.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{device.vulnerabilities.length - 2}
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge className={getRiskColor(device.riskScore)}>{device.riskScore}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {devices.length > 5 && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Show Less" : `Show All ${devices.length} Devices`}
          </Button>
        </div>
      )}
    </div>
  )
}
