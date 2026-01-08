"use client"

import { FileText, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { QBROutput } from "@/lib/mock-data"

interface QBROutputDisplayProps {
  qbrOutput: QBROutput
}

export function QBROutputDisplay({ qbrOutput }: QBROutputDisplayProps) {
  return (
    <div className="rounded-lg border border-accent/20 bg-accent/5 p-6">
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-accent" />
        <h3 className="font-heading text-lg font-semibold text-primary">{qbrOutput.title}</h3>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{qbrOutput.description}</p>

      <div className="flex gap-3">
        {qbrOutput.previewAvailable && (
          <Button
            variant="outline"
            className="flex-1 gap-2 border-accent/30 text-accent hover:bg-accent/10 bg-transparent"
          >
            <Eye className="h-4 w-4" />
            Preview QBR Slide
          </Button>
        )}
        <Button className="flex-1 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
          <Download className="h-4 w-4" />
          Export for Presentation
        </Button>
      </div>

      <div className="mt-4 rounded-lg bg-background p-3">
        <p className="text-xs font-medium text-primary">What's included in the QBR output:</p>
        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
          <li>• Executive summary with total business value headline</li>
          <li>• Value breakdown table with technical actions and business outcomes</li>
          <li>• Full audit trail with calculation methodology and data sources</li>
          <li>• Industry benchmark references for credibility</li>
          <li>• Ready-to-present format optimized for C-level review</li>
        </ul>
      </div>
    </div>
  )
}
