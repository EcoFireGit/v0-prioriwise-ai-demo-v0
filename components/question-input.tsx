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
    <div className="rounded-xl border border-secondary bg-card p-4 shadow-sm animate-slide-in-up transition-all duration-300 hover:shadow-md hover:border-primary/30">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-accent animate-float" />
        <span className="font-heading text-sm font-medium text-primary">Ask AI about this client</span>
      </div>
      <div className="flex gap-3">
        <Textarea
          placeholder="What would you like to know about this client? e.g., 'What are the biggest risks for this account?'"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="min-h-[80px] flex-1 resize-none border-secondary bg-secondary/30 placeholder:text-muted-foreground focus-visible:ring-primary transition-all duration-300 focus:scale-[1.01]"
        />
        <Button
          onClick={handleSubmit}
          disabled={!question.trim() || disabled}
          className="self-end bg-accent font-heading text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
        >
          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  )
}
