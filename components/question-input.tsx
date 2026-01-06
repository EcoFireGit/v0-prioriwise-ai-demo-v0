"use client"

import type React from "react"

import { useState } from "react"
import { Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface QuestionInputProps {
  onSubmit: (question: string) => void
  disabled?: boolean
}

export function QuestionInput({ onSubmit, disabled }: QuestionInputProps) {
  const [question, setQuestion] = useState("")

  const handleSubmit = () => {
    if (question.trim()) {
      onSubmit(question.trim())
      setQuestion("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="rounded-xl border border-[#D2E5F6] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-[#F05523]" />
        <span className="font-heading text-sm font-medium text-[#242E65]">Ask AI about this client</span>
      </div>
      <div className="flex gap-3">
        <Textarea
          placeholder="What would you like to know about this client? e.g., 'What are the biggest risks for this account?'"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="min-h-[80px] flex-1 resize-none border-[#D2E5F6] bg-[#D2E5F6]/30 placeholder:text-[#797575] focus-visible:ring-[#242E65]"
        />
        <Button
          onClick={handleSubmit}
          disabled={!question.trim() || disabled}
          className="self-end bg-[#F05523] font-heading text-white hover:bg-[#D94A1F] disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
