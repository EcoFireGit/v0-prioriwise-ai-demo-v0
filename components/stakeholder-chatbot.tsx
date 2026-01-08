"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

type FAQ = {
  question: string
  answer: string
  category?: string
}

const faqs: FAQ[] = [
  {
    question: "What's the ROI?",
    answer:
      "Prioriwise typically delivers 3-5x ROI within the first year by increasing customer retention, identifying expansion opportunities, and reducing churn. Our customers see an average 25% increase in net retention rate.",
    category: "value",
  },
  {
    question: "How does integration work?",
    answer:
      "Prioriwise seamlessly integrates with your existing CRM, support tickets, product usage data, and communication tools. Setup typically takes 2-4 weeks with our dedicated onboarding team.",
    category: "technical",
  },
  {
    question: "Who is it for?",
    answer:
      "Prioriwise is designed for Customer Success Managers, Account Executives, and Customer Success Leaders. Each persona gets tailored insights - CSMs see account health and risks, AEs see expansion opportunities, and leaders get strategic portfolio views.",
    category: "users",
  },
  {
    question: "Is our data secure?",
    answer:
      "We take security seriously. Prioriwise is SOC 2 Type II certified, GDPR compliant, and uses enterprise-grade encryption. Your data is isolated in dedicated environments and never shared with third parties.",
    category: "security",
  },
  {
    question: "What's the pricing?",
    answer:
      "Pricing is based on the number of customer accounts and users. We offer flexible plans starting at $10,000/year for growing teams, with enterprise options for larger organizations. Contact sales for a custom quote tailored to your needs.",
    category: "value",
  },
  {
    question: "What makes you different?",
    answer:
      "Unlike traditional CS platforms that just aggregate data, Prioriwise uses AI to transform you from a vendor into a trusted business partner. We provide actionable insights tailored to each stakeholder, not just health scores.",
    category: "value",
  },
  {
    question: "How long to implement?",
    answer:
      "Most customers are fully operational within 2-4 weeks. This includes data integration, team training, and custom configuration. Our dedicated onboarding team ensures a smooth transition with minimal disruption.",
    category: "technical",
  },
  {
    question: "What support is included?",
    answer:
      "We offer 24/7 technical support, dedicated customer success management, and comprehensive training programs. You'll have access to our knowledge base, live chat, and regular strategic business reviews.",
    category: "support",
  },
]

export function StakeholderChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "Hi! Choose any question below to learn more about Prioriwise.",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleQuestionClick = (faq: FAQ, index: number) => {
    setSelectedIndex(index)
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: faq.question,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: faq.answer,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
      setSelectedIndex(null)
    }, 600)
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-accent shadow-lg hover:bg-accent/90 hover:scale-110 transition-all duration-300 animate-pulse z-50"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chatbot</span>
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-24 right-8 w-80 shadow-2xl border-2 animate-in slide-in-from-bottom-4 duration-300 z-50">
          <div className="flex items-center justify-between bg-gradient-to-r from-primary to-accent px-4 py-3 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary-foreground animate-pulse" />
              <h3 className="font-heading text-sm font-semibold text-primary-foreground">Ask Prioriwise</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20 hover:rotate-90 transition-all duration-300"
            >
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">Close chatbot</span>
            </Button>
          </div>

          <ScrollArea className="h-64 p-3 bg-background/50" ref={scrollRef}>
            <div className="space-y-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-200`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 shadow-sm ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-xs leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start animate-in fade-in duration-200">
                  <div className="max-w-[85%] rounded-xl bg-secondary px-3 py-2 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.3s]"></div>
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.15s]"></div>
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t border-border bg-muted/30 p-3">
            <p className="mb-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
              Quick Questions
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {faqs.map((faq, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleQuestionClick(faq, index)}
                  disabled={isTyping}
                  className={`h-auto justify-start text-left text-[10px] leading-tight py-2 px-2 hover:bg-primary/10 hover:scale-105 hover:shadow-md transition-all duration-200 ${
                    selectedIndex === index ? "bg-primary/20 scale-105" : ""
                  }`}
                >
                  {faq.question}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
