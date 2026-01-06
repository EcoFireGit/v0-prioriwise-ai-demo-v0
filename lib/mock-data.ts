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
  riskProfile?: RiskProfile
  playbook?: Playbook
  affectedDevices?: DeviceGap[]
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
    riskProfile: {
      overallScore: 78,
      exploitationLikelihood: "High",
      businessImpact:
        "Unprotected endpoints create significant attack surface. Single breach could lead to ransomware deployment, data exfiltration, or lateral movement across network. Manufacturing operations at risk of disruption.",
      complianceRisks: ["CMMC Level 2 non-compliance", "Cyber insurance policy violation", "PCI-DSS scope concerns"],
      detectionGaps: [
        "No real-time threat detection on 23 workstations",
        "Limited visibility into process-level activity",
        "No automated response capability for zero-day threats",
      ],
    },
    affectedDevices: [
      {
        deviceName: "ACME-SHOP-WS-07",
        osVersion: "Windows 10 Pro 22H2",
        lastSeen: "2025-01-05 14:32",
        vulnerabilities: ["CVE-2024-43582", "CVE-2024-43583", "Outdated Chrome v121"],
        riskScore: 82,
      },
      {
        deviceName: "ACME-SHOP-WS-12",
        osVersion: "Windows 10 Pro 21H2",
        lastSeen: "2025-01-05 09:18",
        vulnerabilities: ["CVE-2024-43582", "CVE-2024-38063", "Missing EDR agent"],
        riskScore: 89,
      },
      {
        deviceName: "ACME-OFFICE-WS-03",
        osVersion: "Windows 11 Pro 23H2",
        lastSeen: "2025-01-06 08:45",
        vulnerabilities: ["Unpatched Office 2019", "Weak password policy"],
        riskScore: 65,
      },
      {
        deviceName: "ACME-SHOP-WS-19",
        osVersion: "Windows 10 Pro 22H2",
        lastSeen: "2025-01-04 16:22",
        vulnerabilities: ["CVE-2024-43582", "Legacy Java v8 installed"],
        riskScore: 76,
      },
      {
        deviceName: "ACME-ADMIN-WS-01",
        osVersion: "Windows 10 Pro 21H2",
        lastSeen: "2025-01-05 11:05",
        vulnerabilities: ["CVE-2024-43583", "CVE-2024-38063", "Admin rights misconfigured"],
        riskScore: 91,
      },
      {
        deviceName: "ACME-SHOP-WS-22",
        osVersion: "Windows 10 Pro 22H2",
        lastSeen: "2025-01-05 13:47",
        vulnerabilities: ["Outdated Firefox v115", "No EDR coverage"],
        riskScore: 70,
      },
      {
        deviceName: "ACME-CONF-WS-08",
        osVersion: "Windows 11 Pro 22H2",
        lastSeen: "2025-01-06 07:12",
        vulnerabilities: ["CVE-2024-43582", "SMBv1 enabled"],
        riskScore: 79,
      },
      {
        deviceName: "ACME-SHOP-WS-31",
        osVersion: "Windows 10 Pro 21H2",
        lastSeen: "2025-01-03 15:38",
        vulnerabilities: ["CVE-2024-38063", "Unencrypted drive", "No TPM enabled"],
        riskScore: 88,
      },
      {
        deviceName: "ACME-LAB-WS-05",
        osVersion: "Windows 10 Pro 22H2",
        lastSeen: "2025-01-05 10:29",
        vulnerabilities: ["Legacy TLS 1.0 enabled", "Outdated drivers"],
        riskScore: 68,
      },
      {
        deviceName: "ACME-SHOP-WS-14",
        osVersion: "Windows 11 Pro 23H2",
        lastSeen: "2025-01-06 08:01",
        vulnerabilities: ["CVE-2024-43582", "No BitLocker"],
        riskScore: 73,
      },
      {
        deviceName: "ACME-OFFICE-WS-11",
        osVersion: "Windows 10 Pro 22H2",
        lastSeen: "2025-01-04 14:55",
        vulnerabilities: ["Missing security patches", "Unauthorized USB devices detected"],
        riskScore: 81,
      },
      {
        deviceName: "ACME-SHOP-WS-27",
        osVersion: "Windows 11 Pro 23H2",
        lastSeen: "2025-01-05 12:18",
        vulnerabilities: ["CVE-2024-43583", "CVE-2024-38063", "Guest account enabled"],
        riskScore: 85,
      },
      {
        deviceName: "ACME-ADMIN-WS-04",
        osVersion: "Windows 11 Pro 23H2",
        lastSeen: "2025-01-06 09:33",
        vulnerabilities: ["Outdated PowerShell v5.1", "No application whitelisting"],
        riskScore: 71,
      },
      {
        deviceName: "ACME-SHOP-WS-09",
        osVersion: "Windows 10 Pro 22H2",
        lastSeen: "2025-01-05 15:02",
        vulnerabilities: ["CVE-2024-43582", "Weak firewall rules"],
        riskScore: 77,
      },
      {
        deviceName: "ACME-CONF-WS-02",
        osVersion: "Windows 10 Pro 21H2",
        lastSeen: "2025-01-04 11:44",
        vulnerabilities: ["CVE-2024-38063", "No endpoint encryption"],
        riskScore: 83,
      },
      {
        deviceName: "ACME-SHOP-WS-18",
        osVersion: "Windows 11 Pro 22H2",
        lastSeen: "2025-01-06 07:56",
        vulnerabilities: ["Legacy software installed", "Unpatched Adobe Reader"],
        riskScore: 69,
      },
      {
        deviceName: "ACME-LAB-WS-12",
        osVersion: "Windows 10 Pro 22H2",
        lastSeen: "2025-01-05 13:21",
        vulnerabilities: ["CVE-2024-43582", "Open RDP port to internet"],
        riskScore: 92,
      },
      {
        deviceName: "ACME-OFFICE-WS-06",
        osVersion: "Windows 10 Pro 21H2",
        lastSeen: "2025-01-03 16:47",
        vulnerabilities: ["Missing critical updates", "Shadow IT apps detected"],
        riskScore: 80,
      },
      {
        deviceName: "ACME-SHOP-WS-25",
        osVersion: "Windows 11 Pro 23H2",
        lastSeen: "2025-01-06 08:29",
        vulnerabilities: ["CVE-2024-43583", "No MFA configured"],
        riskScore: 74,
      },
      {
        deviceName: "ACME-ADMIN-WS-09",
        osVersion: "Windows 10 Pro 22H2",
        lastSeen: "2025-01-05 14:08",
        vulnerabilities: ["Outdated antivirus definitions", "No network segmentation"],
        riskScore: 78,
      },
      {
        deviceName: "ACME-SHOP-WS-33",
        osVersion: "Windows 10 Pro 21H2",
        lastSeen: "2025-01-04 10:52",
        vulnerabilities: ["CVE-2024-38063", "Local admin access widespread"],
        riskScore: 87,
      },
      {
        deviceName: "ACME-CONF-WS-15",
        osVersion: "Windows 11 Pro 23H2",
        lastSeen: "2025-01-06 09:14",
        vulnerabilities: ["Outdated Zoom client", "No DLP policies"],
        riskScore: 67,
      },
      {
        deviceName: "ACME-LAB-WS-08",
        osVersion: "Windows 10 Pro 22H2",
        lastSeen: "2025-01-05 11:36",
        vulnerabilities: ["CVE-2024-43582", "Unmonitored USB storage use"],
        riskScore: 75,
      },
    ],
    playbook: {
      generatedAt: "2025-01-06T10:30:00Z",
      timeline: "4 weeks",
      estimatedCost: 12400,
      costOfInaction: 45000,
      expectedRiskReduction: 68,
      conversationScript:
        "I wanted to share something important I discovered during our routine security assessment. Our AI monitoring detected 23 workstations in your environment that currently lack EDR protection, creating a significant blind spot in your security posture. Here's what concerns me: these devices are processing production data daily, but we have no visibility into potential threats or malicious activity. With the current threat landscape, particularly ransomware targeting manufacturing, this represents about $45,000 in potential incident response costs if just one endpoint is compromised. The good news? We can close this gap completely for $12,400 annually, reducing your overall risk by 68%. This investment also brings you into CMMC compliance and satisfies your cyber insurance requirements. Can we schedule 30 minutes this week to walk through the specific devices at risk and the deployment plan?",
      roiSummary:
        "Annual EDR investment of $12,400 prevents potential breach costs of $45,000+ (incident response, downtime, data recovery). Achieves compliance requirements, reduces insurance premiums by est. $3,200/year, and provides 24/7 threat monitoring. Net ROI: 263% in year one.",
      steps: [
        {
          phase: "Assessment & Planning",
          action: "Complete security gap analysis and obtain customer approval",
          owner: "Account Executive",
          duration: "Week 1",
          dependencies: [],
        },
        {
          phase: "Assessment & Planning",
          action: "Validate device inventory and EDR licensing requirements",
          owner: "Solutions Engineer",
          duration: "Week 1",
          dependencies: ["Complete security gap analysis and obtain customer approval"],
        },
        {
          phase: "Deployment",
          action: "Deploy EDR agents to first 10 workstations (pilot group)",
          owner: "Security Engineer",
          duration: "Week 2",
          dependencies: ["Validate device inventory and EDR licensing requirements"],
        },
        {
          phase: "Deployment",
          action: "Configure monitoring policies and alert thresholds",
          owner: "Security Engineer",
          duration: "Week 2",
          dependencies: ["Deploy EDR agents to first 10 workstations (pilot group)"],
        },
        {
          phase: "Rollout",
          action: "Deploy EDR agents to remaining 13 workstations",
          owner: "Security Engineer",
          duration: "Week 3",
          dependencies: ["Configure monitoring policies and alert thresholds"],
        },
        {
          phase: "Rollout",
          action: "Conduct end-user security awareness training",
          owner: "Customer Success Manager",
          duration: "Week 3",
          dependencies: [],
        },
        {
          phase: "Validation",
          action: "Perform penetration testing on protected endpoints",
          owner: "Security Consultant",
          duration: "Week 4",
          dependencies: ["Deploy EDR agents to remaining 13 workstations"],
        },
        {
          phase: "Validation",
          action: "Document compliance improvements and deliver executive report",
          owner: "Account Executive",
          duration: "Week 4",
          dependencies: ["Perform penetration testing on protected endpoints"],
        },
      ],
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
