// Mock data for Prioriwise demo

export type Persona = "Sales" | "Account Management" | "Engineering"

export interface Customer {
  id: string
  name: string
  industry: string
  employees: number
  contractValue: number
  healthScore: number
}

export interface Project {
  id: string
  name: string
  customerId: string
  status: "Active" | "At Risk" | "Healthy"
  startDate: string
}

export interface InsightCard {
  id: string
  title: string
  category: string
  severity: "high" | "medium" | "low"
  summary: string
  data: Record<string, string | number>
  recommendation: string
  persona: Persona
  dataSources: {
    internal: {
      structured: string[]
      unstructured: string[]
    }
    external: string[]
  }
}

export const customers: Customer[] = [
  {
    id: "acme",
    name: "Acme Corp",
    industry: "Manufacturing",
    employees: 450,
    contractValue: 125000,
    healthScore: 72,
  },
  {
    id: "globex",
    name: "Globex Inc",
    industry: "Financial Services",
    employees: 280,
    contractValue: 89000,
    healthScore: 85,
  },
  {
    id: "initech",
    name: "Initech Solutions",
    industry: "Technology",
    employees: 120,
    contractValue: 45000,
    healthScore: 91,
  },
]

export const projects: Project[] = [
  { id: "acme-managed", name: "Managed IT Services", customerId: "acme", status: "At Risk", startDate: "2023-01-15" },
  { id: "acme-security", name: "Security Operations", customerId: "acme", status: "Active", startDate: "2023-06-01" },
  { id: "globex-cloud", name: "Cloud Migration", customerId: "globex", status: "Healthy", startDate: "2023-03-20" },
  { id: "globex-support", name: "24/7 Support", customerId: "globex", status: "Active", startDate: "2022-11-10" },
  {
    id: "initech-infra",
    name: "Infrastructure Modernization",
    customerId: "initech",
    status: "Healthy",
    startDate: "2024-01-05",
  },
]

export const insightCards: InsightCard[] = [
  // Sales persona cards
  {
    id: "security-gap",
    title: "Security Gap Upsell",
    category: "Revenue Opportunity",
    severity: "high",
    summary: "23 endpoints lack EDR protection despite being in scope for managed security.",
    data: {
      "RMM Patching Coverage": "87%",
      "Contract Scope": "100 endpoints",
      "Actual Managed": "77 endpoints",
      "Gap Value": "$12,400/yr",
    },
    recommendation: "Schedule security review meeting to discuss expanding EDR coverage to all endpoints.",
    persona: "Sales",
    dataSources: {
      internal: {
        structured: ["RMM Platform - Asset Database", "CRM - Contract Management", "EDR Console - Deployment Status"],
        unstructured: ["Security Audit Reports", "Ticketing System - Security Incidents"],
      },
      external: ["Gartner EDR Market Report 2025", "NIST Cybersecurity Framework"],
    },
  },
  {
    id: "seat-count",
    title: "Seat Count True-Up",
    category: "Revenue Recovery",
    severity: "medium",
    summary: "Active Directory shows 47 more users than currently billed.",
    data: {
      "Active AD Users": 497,
      "Billed Seats": 450,
      Variance: 47,
      "Monthly Revenue Gap": "$2,115",
    },
    recommendation: "Initiate true-up conversation for Q1 billing adjustment.",
    persona: "Sales",
    dataSources: {
      internal: {
        structured: ["Active Directory - User Database", "CRM - Billing Records", "License Management System"],
        unstructured: ["Contract Documents", "Email - Billing Communications"],
      },
      external: ["Industry Benchmarking - SaaS Pricing Models"],
    },
  },
  {
    id: "eol-refresh",
    title: "EOL Tech Refresh",
    category: "Hardware Opportunity",
    severity: "high",
    summary: "32% of workstations are running Windows 10 and over 4 years old.",
    data: {
      "Total Assets": 156,
      "Assets >4 Years": 50,
      "Percentage Aging": "32%",
      "Estimated Refresh Value": "$87,500",
    },
    recommendation: "Propose hardware refresh program with financing options.",
    persona: "Sales",
    dataSources: {
      internal: {
        structured: ["Asset Management Database", "RMM - OS Version Reports", "Procurement History"],
        unstructured: ["IT Budget Planning Documents", "Email - Hardware Performance Complaints"],
      },
      external: [
        "Microsoft Windows 10 EOL Schedule",
        "Gartner Hardware Lifecycle Best Practices",
        "IDC PC Market Analysis",
      ],
    },
  },
  {
    id: "shadow-it",
    title: "Shadow IT Opportunity",
    category: "Security & Compliance",
    severity: "medium",
    summary: "Detected 12 unauthorized SaaS applications in network traffic.",
    data: {
      "Unapproved Apps": 12,
      "Top Offenders": "Dropbox, WeTransfer, Notion",
      "Data Transfer": "2.4 TB/month",
      "Compliance Risk": "High",
    },
    recommendation: "Present managed SaaS governance solution to IT leadership.",
    persona: "Sales",
    dataSources: {
      internal: {
        structured: ["Firewall Logs", "Network Traffic Analytics", "SaaS Management Platform"],
        unstructured: ["IT Policy Documents", "Slack - IT Support Channels", "Email - Application Requests"],
      },
      external: [
        "Cloud Security Alliance - SaaS Risk Assessment",
        "Forrester SaaS Governance Report",
        "GDPR Compliance Requirements",
      ],
    },
  },
  // Account Management persona cards
  {
    id: "champion-departure",
    title: "Champion Departure Alert",
    category: "Retention Risk",
    severity: "high",
    summary: "Primary contact Sarah Chen's emails are bouncing since last week.",
    data: {
      "Contact Name": "Sarah Chen",
      Role: "IT Director",
      Tenure: "3.2 years",
      "Last Successful Contact": "Dec 28, 2025",
    },
    recommendation: "Reach out to secondary contact immediately to confirm relationship status.",
    persona: "Account Management",
    dataSources: {
      internal: {
        structured: ["CRM - Contact Records", "Email Server - Bounce Logs", "Calendar System - Meeting History"],
        unstructured: ["Email Communications Archive", "LinkedIn - Profile Activity"],
      },
      external: ["LinkedIn Public Profile Data", "Company Press Releases", "ZoomInfo Contact Intelligence"],
    },
  },
  {
    id: "quiet-client",
    title: "The Quiet Client Risk",
    category: "Engagement Alert",
    severity: "medium",
    summary: "Support ticket volume dropped 68% over the past 90 days.",
    data: {
      "Tickets (90 days ago)": 34,
      "Tickets (Current)": 11,
      "Drop Rate": "68%",
      "Last Proactive Check-in": "45 days ago",
    },
    recommendation: "Schedule QBR to re-engage and understand current IT priorities.",
    persona: "Account Management",
    dataSources: {
      internal: {
        structured: [
          "Ticketing System - Volume Analytics",
          "CRM - Account Activity Logs",
          "Calendar - Meeting Records",
        ],
        unstructured: ["Support Tickets - Historical Conversations", "Email - Communication Frequency Analysis"],
      },
      external: ["Customer Success Benchmarks - Engagement Patterns", "Gainsight Churn Risk Indicators"],
    },
  },
  {
    id: "sentiment-drift",
    title: "Sentiment Drift",
    category: "Relationship Health",
    severity: "high",
    summary: "AI detected shift from 'Friendly' to 'Terse' in recent email communications.",
    data: {
      "Baseline Sentiment": "Friendly (8.2/10)",
      "Current Sentiment": "Terse (4.1/10)",
      "Trend Duration": "3 weeks",
      "Key Phrases Detected": "delays, still waiting, frustrated",
    },
    recommendation: "Executive sponsor should reach out personally to address underlying concerns.",
    persona: "Account Management",
    dataSources: {
      internal: {
        structured: ["CRM - Customer Interaction History", "NPS Survey Responses"],
        unstructured: [
          "Email Communications - Sentiment Analysis",
          "Slack - Customer Channel Messages",
          "Support Tickets - Text Mining",
          "Call Recordings - Transcripts",
        ],
      },
      external: ["Industry NPS Benchmarks", "Customer Health Score Models - ChurnZero"],
    },
  },
  {
    id: "customer-satisfaction-decline",
    title: "Customer Satisfaction Decline",
    category: "Customer Health",
    severity: "high",
    summary: "CSAT score dropped from 8.5 to 7.2 over last quarter with declining NPS trend.",
    data: {
      "Current CSAT": "7.2/10",
      "Previous Quarter": "8.5/10",
      "Score Decline": "-1.3 points",
      "Current NPS": "+24",
      "Previous NPS": "+42",
      "Response Count": 42,
    },
    recommendation:
      "Conduct customer feedback interviews to identify pain points and implement service improvement initiatives.",
    persona: "Account Management",
    dataSources: {
      internal: {
        structured: [
          "CRM - CSAT Survey Responses",
          "CRM - NPS Survey Database",
          "Ticketing System - Support Quality Metrics",
          "Customer Database - Account Health Scores",
          "Service Delivery Platform - SLA Performance",
        ],
        unstructured: [
          "Support Tickets - Customer Comments",
          "Email - Customer Feedback",
          "Call Recordings - Customer Satisfaction Surveys",
          "Slack - Customer Support Channel",
          "QBR Meeting Notes",
        ],
      },
      external: [
        "Industry CSAT Benchmarks",
        "Customer Health Score Models - ChurnZero",
        "Gainsight NPS Standards",
        "Forrester Customer Experience Index",
      ],
    },
  },
  // Engineering persona cards
  {
    id: "sla-breach",
    title: "SLA Breach Risk",
    category: "Operations",
    severity: "high",
    summary: "P1 ticket response time trending toward breach threshold.",
    data: {
      "Current Avg Response": "12 min",
      "SLA Threshold": "15 min",
      "Margin Remaining": "3 min",
      "Open P1 Tickets": 4,
    },
    recommendation: "Allocate additional on-call engineer to handle ticket surge.",
    persona: "Engineering",
    dataSources: {
      internal: {
        structured: [
          "Ticketing System - SLA Tracking",
          "CRM - Contract SLA Terms",
          "Time Tracking System - Response Logs",
        ],
        unstructured: ["Support Tickets - P1 Incident Details", "Team Chat - On-Call Handoff Notes"],
      },
      external: ["ITIL Service Management Framework", "HDI Support Center Benchmarks"],
    },
  },
  {
    id: "resource-util",
    title: "Resource Utilization",
    category: "Capacity Planning",
    severity: "medium",
    summary: "Server cluster running at 87% CPU utilization during peak hours.",
    data: {
      "Peak CPU Usage": "87%",
      "Memory Usage": "72%",
      "Storage Remaining": "340 GB",
      "Projected Limit Date": "Feb 15, 2026",
    },
    recommendation: "Plan capacity upgrade or workload optimization before threshold breach.",
    persona: "Engineering",
    dataSources: {
      internal: {
        structured: [
          "Monitoring Platform - Performance Metrics",
          "CMDB - Server Inventory",
          "Capacity Planning Database",
        ],
        unstructured: ["Infrastructure Runbooks", "Slack - DevOps Alerts Channel"],
      },
      external: ["AWS Well-Architected Framework", "Uptime Institute - Capacity Planning Guidelines"],
    },
  },
  {
    id: "patch-compliance",
    title: "Patch Compliance Gap",
    category: "Security Operations",
    severity: "medium",
    summary: "14 servers missing critical security patches from December cycle.",
    data: {
      "Total Servers": 48,
      Compliant: 34,
      "Non-Compliant": 14,
      "Critical CVEs Unpatched": 3,
    },
    recommendation: "Schedule emergency maintenance window for patch deployment.",
    persona: "Engineering",
    dataSources: {
      internal: {
        structured: [
          "Patch Management System - Compliance Reports",
          "Vulnerability Scanner - Asset Status",
          "Change Management Database",
        ],
        unstructured: ["Security Team Email - Patch Bulletins", "Ticketing System - Maintenance Windows"],
      },
      external: [
        "NIST National Vulnerability Database (NVD)",
        "CISA Known Exploited Vulnerabilities",
        "Microsoft Security Response Center",
      ],
    },
  },
]

export function getProjectsForCustomer(customerId: string): Project[] {
  return projects.filter((p) => p.customerId === customerId)
}

export function getInsightsForPersona(persona: Persona): InsightCard[] {
  return insightCards.filter((card) => card.persona === persona)
}
