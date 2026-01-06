"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
}

const faqs: FAQ[] = [
  {
    question: "What's the ROI of Prioriwise?",
    answer:
      "Prioriwise typically delivers 3-5x ROI within the first year by increasing customer retention, identifying expansion opportunities, and reducing churn. Our customers see an average 25% increase in net retention rate.",
  },
  {
    question: "How does Prioriwise integrate with our systems?",
    answer:
      "Prioriwise seamlessly integrates with your existing CRM, support tickets, product usage data, and communication tools. Setup typically takes 2-4 weeks with our dedicated onboarding team.",
  },
  {
    question: "Who can use Prioriwise?",
    answer:
      "Prioriwise is designed for Customer Success Managers, Account Executives, and Customer Success Leaders. Each persona gets tailored insights - CSMs see account health and risks, AEs see expansion opportunities, and leaders get strategic portfolio views.",
  },
  {
    question: "How secure is our customer data?",
    answer:
      "We take security seriously. Prioriwise is SOC 2 Type II certified, GDPR compliant, and uses enterprise-grade encryption. Your data is isolated in dedicated environments and never shared with third parties.",
  },
  {
    question: "What does Prioriwise cost?",
    answer:
      "Pricing is based on the number of customer accounts and users. We offer flexible plans starting at $10,000/year for growing teams, with enterprise options for larger organizations. Contact sales for a custom quote tailored to your needs.",
  },
  {
    question: "How is Prioriwise different from other CS platforms?",
    answer:
      "Unlike traditional CS platforms that just aggregate data, Prioriwise uses AI to transform you from a vendor into a trusted business partner. We provide actionable insights tailored to each stakeholder, not just health scores.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Most customers are fully operational within 2-4 weeks. This includes data integration, team training, and custom configuration. Our dedicated onboarding team ensures a smooth transition with minimal disruption.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer 24/7 technical support, dedicated customer success management, and comprehensive training programs. You'll have access to our knowledge base, live chat, and regular strategic business reviews.",
  },
]

export function StakeholderChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "Hi! I'm here to answer common questions about Prioriwise. Choose a question below to learn more!",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleQuestionClick = (faq: FAQ) => {
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
    }, 800)
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-accent shadow-lg hover:bg-accent/90 hover:shadow-xl transition-all"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chatbot</span>
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary px-6 py-4">
            <CardTitle className="font-heading text-lg font-semibold text-primary-foreground">
              Prioriwise Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close chatbot</span>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg bg-secondary px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-4">
              <p className="mb-3 text-xs font-medium text-muted-foreground">Select a question:</p>
              <div className="flex flex-col gap-2">
                {faqs.map((faq, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleQuestionClick(faq)}
                    disabled={isTyping}
                    className="h-auto justify-start text-left text-xs leading-relaxed py-2"
                  >
                    {faq.question}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
