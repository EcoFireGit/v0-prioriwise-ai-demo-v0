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

// New TypeScript interfaces for Priority Shift Detection feature
export interface PriorityShiftData {
  previousFocus: string
  currentFocus: string
  shiftPercentage: number
  analysisWindow: string
  linguisticIndicators: string[]
  stakeholderChanges: StakeholderChange[]
  departmentActivity: DepartmentActivity[]
  evidenceExamples: EvidenceExample[]
  alignmentGauge: AlignmentGaugeData
}

export interface StakeholderChange {
  name: string
  role: string
  previousEngagement: string
  currentEngagement: string
  departmentInfluence: string
}

export interface DepartmentActivity {
  department: string
  previousActivity: number
  currentActivity: number
  changeDirection: "up" | "down"
}

export interface EvidenceExample {
  date: string
  source: string
  quote: string
  category: string
}

export interface AlignmentGaugeData {
  currentAlignment: "red" | "amber" | "green"
  reason: string
  recommendations: string[]
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
  riskProfile?: RiskProfile
  playbook?: Playbook
  affectedDevices?: DeviceGap[]
  conversationPlaybook?: ConversationPlaybook
  licenseTypes?: LicenseType[]
  trueUpPlaybook?: TrueUpPlaybookData
  totalMonthlyRecovery?: number
  priorityShiftData?: PriorityShiftData
}

export interface RiskProfile {
  overallScore: number // 0-100
  exploitationLikelihood: "Critical" | "High" | "Medium" | "Low"
  businessImpact: string
  complianceRisks: string[]
  detectionGaps: string[]
}

export interface DeviceGap {
  deviceName: string
  osVersion: string
  lastSeen: string
  vulnerabilities: string[]
  riskScore: number
}

export interface Playbook {
  generatedAt: string
  steps: PlaybookStep[]
  timeline: string
  estimatedCost: number
  costOfInaction: number
  expectedRiskReduction: number
  conversationScript: string
  roiSummary: string
}

export interface PlaybookStep {
  phase: string
  action: string
  owner: string
  duration: string
  dependencies: string[]
}

export interface ConversationPlaybook {
  discussionPoints: string[]
  successStories: SuccessStory[]
  stakeholderTalks: StakeholderTalkTrack[]
  objectionHandling: ObjectionHandler[]
}

export interface SuccessStory {
  title: string
  company: string
  metric: string
  result: string
}

export interface StakeholderTalkTrack {
  stakeholder: string
  focus: string
  keyMessages: string[]
}

export interface ObjectionHandler {
  objection: string
  response: string
}

export interface LicenseType {
  type: string
  icon: "software" | "device" | "service"
  contracted: number
  active: number
  variance: number
  monthlyRecovery: number
}

export interface UsageDocumentation {
  title: string
  description: string
  dataPoint: string
}

export interface DiscussionFramework {
  title: string
  approach: string
  keyTalkingPoints: string[]
}

export interface TrueUpPlaybookData {
  overviewMessage: string
  usageDocumentation: UsageDocumentation[]
  discussionFrameworks: DiscussionFramework[]
  relationshipGuidance: string[]
  nextSteps: string[]
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
    id: "referral-opportunity",
    title: "Identifying & Winning Referrals",
    category: "Growth Opportunity",
    severity: "high",
    summary:
      "Client satisfaction score of 9.2/10 and 3 peer connections identified make this account a high-potential referral source.",
    data: {
      "Client Satisfaction": "9.2/10",
      "Peer Connections": "3 companies",
      "Estimated Pipeline Value": "$180,000",
      "Referral Likelihood": "87%",
      "Best Contact": "Sarah Chen, IT Director",
      "Optimal Timing": "Next 30 days",
    },
    recommendation:
      "Schedule referral discussion during next QBR. Prepare case study highlighting 40% cost savings and security improvements achieved. Offer referral incentive program.",
    persona: "Account Management",
    dataSources: {
      internal: {
        structured: [
          "CRM - Account Relationships",
          "Customer Database - Satisfaction Scores",
          "Sales Pipeline Database",
          "Service Delivery Platform - Success Metrics",
        ],
        unstructured: [
          "Email - Customer Communications",
          "QBR Meeting Notes",
          "Customer Success Channel - Slack",
          "Support Tickets - Positive Feedback",
        ],
      },
      external: [
        "LinkedIn - Account Mapping",
        "ZoomInfo - Organizational Connections",
        "Industry Referral Benchmarks",
        "G2 Customer Reviews",
      ],
    },
  },
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
    category: "Relationship Health",
    severity: "high",
    summary: "NPS score dropped from 8 to 5 over Q4, with CSAT declining to 72% amid rising complaint volume.",
    data: {
      "Current NPS": "5",
      "Previous NPS": "8",
      "NPS Decline": "-3 points",
      "Current CSAT": "72%",
      "Complaint Trend": "Rising",
      "Analysis Period": "Q4",
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
  {
    id: "priority-shift-detection",
    title: "Priority Shift Detection",
    category: "Strategic Alignment Risk",
    severity: "high",
    summary: "Client focus shifted from User Experience to Data Security in 70% of communications over 45 days.",
    data: {
      "Shift Detected": "70%",
      "Analysis Period": "45 days",
      "Previous Focus": "User Experience",
      "Current Focus": "Data Security",
      "New Stakeholders": "3 (CIO, CISO, Compliance Officer)",
      "Communication Volume": "47 interactions",
    },
    recommendation:
      "Schedule strategic realignment meeting to understand security priorities and adjust service delivery accordingly.",
    persona: "Account Management",
    dataSources: {
      internal: {
        structured: [
          "CRM - Executive Communication Log",
          "Email Server - Sentiment Analysis Database",
          "Meeting Platform - Transcript Archive",
          "Support System - Ticket Categorization",
          "Project Management - Request Priority Tracking",
        ],
        unstructured: [
          "Email Communications - AI Linguistic Analysis",
          "Meeting Notes - Keyword Extraction",
          "Support Tickets - Topic Modeling",
          "Slack/Teams - Channel Activity Mining",
        ],
      },
      external: [
        "Gartner Industry Trend Reports",
        "Compliance Framework Updates (SOC2, GDPR, CMMC)",
        "Market Intelligence - Competitive Analysis",
      ],
    },
    priorityShiftData: {
      previousFocus: "User Experience & Growth",
      currentFocus: "Data Security & Compliance",
      shiftPercentage: 70,
      analysisWindow: "45 days",
      linguisticIndicators: [
        "Use of 'compliance' increased 340%",
        "Security terminology frequency up 280%",
        "Cost reduction language up 156%",
        "Growth language declined 45%",
      ],
      stakeholderChanges: [
        {
          name: "Jennifer Walsh",
          role: "CIO",
          previousEngagement: "Quarterly check-ins",
          currentEngagement: "Weekly security discussions",
          departmentInfluence: "IT Operations (increased)",
        },
        {
          name: "Marcus Chen",
          role: "CISO (New)",
          previousEngagement: "N/A",
          currentEngagement: "Leading security evaluation",
          departmentInfluence: "Security & Compliance",
        },
        {
          name: "Sarah Rodriguez",
          role: "Compliance Officer",
          previousEngagement: "Minimal",
          currentEngagement: "Active in all planning",
          departmentInfluence: "Risk & Compliance",
        },
      ],
      departmentActivity: [
        {
          department: "IT Operations",
          previousActivity: 35,
          currentActivity: 62,
          changeDirection: "up",
        },
        {
          department: "Security & Compliance",
          previousActivity: 8,
          currentActivity: 41,
          changeDirection: "up",
        },
        {
          department: "Business Development",
          previousActivity: 28,
          currentActivity: 12,
          changeDirection: "down",
        },
        {
          department: "Product/UX",
          previousActivity: 19,
          currentActivity: 5,
          changeDirection: "down",
        },
      ],
      evidenceExamples: [
        {
          date: "2024-12-18",
          source: "Executive Email",
          quote: "We need to accelerate our zero-trust security model implementation across all systems.",
          category: "Security Focus",
        },
        {
          date: "2024-12-15",
          source: "Meeting Notes - Security Strategy",
          quote: "Compliance with CMMC Level 2 is now a board-level priority for 2025.",
          category: "Compliance Priority",
        },
        {
          date: "2024-12-10",
          source: "Project Request",
          quote: "We're deprioritizing the UX dashboard refresh to focus budget on security audit remediation.",
          category: "Budget Reallocation",
        },
        {
          date: "2024-12-08",
          source: "Support Ticket",
          quote: "Can we get a detailed security compliance report for our SOC 2 audit next month?",
          category: "Compliance Documentation",
        },
      ],
      alignmentGauge: {
        currentAlignment: "amber",
        reason: "Current service offerings focus on UX/growth but client priority shifted to security/compliance.",
        recommendations: [
          "Highlight security capabilities in current solution",
          "Discuss data governance and compliance features",
          "Propose security-focused roadmap adjustments",
          "Introduce compliance team for deeper security conversations",
        ],
      },
    },
    conversationPlaybook: {
      discussionPoints: [
        "70% of executive communications now focused on security and compliance (vs. UX previously)",
        "New stakeholders entering conversations: CISO, Compliance Officer, Security Council",
        "Shift from growth language ('expand', 'innovate') to efficiency/security language ('zero-trust', 'compliance', 'risk mitigation')",
        "This represents fundamental strategic pivot requiring service delivery alignment",
        "Early detection enables proactive support and prevents perception of misalignment",
      ],
      successStories: [
        {
          title: "Security Pivot Enabled Expansion",
          company: "Financial Services Provider",
          metric: "70% security focus shift detected",
          result:
            "Quickly pivoted solution to security/compliance focus, retained $180K contract, upsold security module for $35K",
        },
        {
          title: "Compliance Priority Deepened Relationship",
          company: "Healthcare Technology Company",
          metric: "New CISO involvement, compliance language increased 300%",
          result: "Positioned as security partner, expanded to 5 new departments, grew contract 42%",
        },
        {
          title: "Early Alert Prevented Churn",
          company: "Manufacturing Enterprise",
          metric: "Budget reallocation from growth to compliance",
          result:
            "Proactive security conversation prevented consideration of competitors, renewed with strategic security roadmap",
        },
      ],
      stakeholderTalks: [
        {
          stakeholder: "CIO / IT Director",
          focus: "Strategic Technology Alignment",
          keyMessages: [
            "We've identified your strategic shift toward security and compliance—we want to ensure our solution supports this evolution",
            "Our platform's security architecture and compliance features position you well for your zero-trust initiative",
            "Let's discuss how we can accelerate your security roadmap and reduce implementation risk",
          ],
        },
        {
          stakeholder: "CISO / Security Officer",
          focus: "Risk Mitigation & Compliance",
          keyMessages: [
            "Your security and compliance requirements are now the foundation of our partnership strategy",
            "We can provide the visibility, control, and audit trails your CMMC and SOC 2 initiatives require",
            "Our security team is ready to partner on your zero-trust architecture and risk assessment",
          ],
        },
        {
          stakeholder: "Compliance Officer",
          focus: "Regulatory & Risk Management",
          keyMessages: [
            "We understand your regulatory requirements and can support your audit and compliance workflows",
            "Our solution provides the documentation and traceability needed for compliance frameworks",
            "Let's align on governance policies and risk controls that benefit your entire organization",
          ],
        },
        {
          stakeholder: "CFO / Finance",
          focus: "Risk-Adjusted Investing",
          keyMessages: [
            "Investing in security and compliance reduces operational risk and insurance costs",
            "Our platform's compliance capabilities protect against costly breaches and audit findings",
            "This shift strengthens your risk posture and supports better financial outcomes",
          ],
        },
      ],
      objectionHandling: [
        {
          objection: "We're evaluating different security solutions that might be better suited for our needs.",
          response:
            "That's a natural part of this transition. We've worked with many organizations through similar pivots. Can we schedule time with your security team to discuss how our platform specifically addresses your zero-trust and compliance goals? We have deep expertise in CMMC and SOC 2 implementations.",
        },
        {
          objection: "Our priorities haven't really changed—we're just being more careful about security.",
          response:
            "I appreciate that perspective. Our data shows a significant shift in how executives are communicating about priorities. This isn't a criticism—it's actually a positive sign of security maturity. Let's use this as an opportunity to align our roadmap with where your organization is heading.",
        },
        {
          objection: "This is just temporary. We'll likely refocus on growth next year.",
          response:
            "Security and compliance investments typically reflect structural organizational changes. Rather than seeing this as temporary, what if we position our partnership to support both security discipline and sustainable growth? That's how leading organizations think about it.",
        },
      ],
    },
  },
]

export function getProjectsForCustomer(customerId: string): Project[] {
  return projects.filter((p) => p.customerId === customerId)
}

export function getInsightsForPersona(persona: Persona): InsightCard[] {
  const filtered = insightCards.filter((card) => card.persona === persona)

  if (persona === "Account Management") {
    const priorityShift = filtered.find((card) => card.id === "priority-shift-detection")
    const customerSatisfaction = filtered.find((card) => card.id === "customer-satisfaction-decline")
    const others = filtered.filter(
      (card) => card.id !== "priority-shift-detection" && card.id !== "customer-satisfaction-decline",
    )

    const reordered = []
    if (priorityShift) reordered.push(priorityShift)
    if (customerSatisfaction) reordered.push(customerSatisfaction)
    reordered.push(...others)

    return reordered
  }

  return filtered
}

export function getInsightsForCustomer(customerId: string): InsightCard[] {
  // Return all insights for now - in a real app, this would filter by customer
  return insightCards
}
