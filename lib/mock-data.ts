// Mock data for Prioriwise demo

export type Persona = "Sales" | "Account Management" | "Engineering"

export interface Customer {
  id: string
  name: string
  industry: string
  employees: number
  contractValue: number
  healthScore: number
  healthMetrics: {
    engagement: {
      score: number
      trend: "up" | "down" | "stable"
      emailResponseRate: number // percentage
      lastContact: string
      ticketVolume: number
      ticketVolumeChange: number // percentage change
    }
    sentiment: {
      score: number
      trend: "up" | "down" | "stable"
      currentSentiment: string
      baselineSentiment: string
      recentKeywords: string[]
      npsScore: number
    }
    productAdoption: {
      score: number
      trend: "up" | "down" | "stable"
      seatUtilization: number // percentage
      featureUsage: number // percentage
      loginFrequency: string
    }
    financialRisk: {
      score: number
      trend: "up" | "down" | "stable"
      paymentStatus: string
      contractGrowth: number // percentage
      daysUntilRenewal: number
    }
  }
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
  conversationPlaybook?: ConversationPlaybook
  licenseTypes?: LicenseType[] // New field for true-up insights
  trueUpPlaybook?: TrueUpPlaybookData // New field for true-up frameworks
  totalMonthlyRecovery?: number // New field for total recovery amount
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
    healthMetrics: {
      engagement: {
        score: 58,
        trend: "down",
        emailResponseRate: 45,
        lastContact: "14 days ago",
        ticketVolume: 11,
        ticketVolumeChange: -68,
      },
      sentiment: {
        score: 65,
        trend: "down",
        currentSentiment: "Neutral",
        baselineSentiment: "Positive",
        recentKeywords: ["delays", "waiting", "concerned"],
        npsScore: 6,
      },
      productAdoption: {
        score: 77,
        trend: "stable",
        seatUtilization: 77,
        featureUsage: 62,
        loginFrequency: "Weekly",
      },
      financialRisk: {
        score: 88,
        trend: "up",
        paymentStatus: "Current",
        contractGrowth: 15,
        daysUntilRenewal: 180,
      },
    },
  },
  {
    id: "globex",
    name: "Globex Inc",
    industry: "Financial Services",
    employees: 280,
    contractValue: 89000,
    healthScore: 85,
    healthMetrics: {
      engagement: {
        score: 82,
        trend: "stable",
        emailResponseRate: 78,
        lastContact: "3 days ago",
        ticketVolume: 24,
        ticketVolumeChange: 5,
      },
      sentiment: {
        score: 88,
        trend: "up",
        currentSentiment: "Very Positive",
        baselineSentiment: "Positive",
        recentKeywords: ["excellent", "helpful", "satisfied"],
        npsScore: 9,
      },
      productAdoption: {
        score: 85,
        trend: "up",
        seatUtilization: 92,
        featureUsage: 78,
        loginFrequency: "Daily",
      },
      financialRisk: {
        score: 85,
        trend: "stable",
        paymentStatus: "Current",
        contractGrowth: 8,
        daysUntilRenewal: 90,
      },
    },
  },
  {
    id: "initech",
    name: "Initech Solutions",
    industry: "Technology",
    employees: 120,
    contractValue: 45000,
    healthScore: 91,
    healthMetrics: {
      engagement: {
        score: 92,
        trend: "up",
        emailResponseRate: 95,
        lastContact: "1 day ago",
        ticketVolume: 18,
        ticketVolumeChange: 12,
      },
      sentiment: {
        score: 94,
        trend: "stable",
        currentSentiment: "Excellent",
        baselineSentiment: "Very Positive",
        recentKeywords: ["impressed", "innovative", "partnership"],
        npsScore: 10,
      },
      productAdoption: {
        score: 89,
        trend: "up",
        seatUtilization: 98,
        featureUsage: 85,
        loginFrequency: "Daily",
      },
      financialRisk: {
        score: 90,
        trend: "stable",
        paymentStatus: "Current",
        contractGrowth: 22,
        daysUntilRenewal: 240,
      },
    },
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
    conversationPlaybook: {
      discussionPoints: [
        "23 workstations lack EDR protection despite being in scope for managed services",
        "Current threat landscape makes unprotected endpoints a primary target for ransomware",
        "Recent manufacturing sector attacks show average breach cost of $2.4M+ incident response",
        "EDR deployment closes compliance gaps (CMMC Level 2, cyber insurance requirements)",
        "Real-time visibility prevents lateral movement in multi-stage attacks",
      ],
      successStories: [
        {
          title: "Automotive Supplier Ransomware Prevention",
          company: "Midwest Auto Parts Inc.",
          metric: "23 endpoints protected",
          result: "Prevented simulated ransomware spread in penetration test, avoided estimated $180K breach cost",
        },
        {
          title: "Medical Device Manufacturer Compliance",
          company: "PrecisionMed Corp",
          metric: "47 devices brought into compliance",
          result: "Achieved CMMC Level 2 certification, renewed cyber insurance with 12% premium reduction",
        },
        {
          title: "Manufacturing Floor Security",
          company: "Precision Manufacturing LLC",
          metric: "35 shop floor workstations",
          result: "Detected and blocked 3 zero-day attempts within first 30 days, prevented operational downtime",
        },
      ],
      stakeholderTalks: [
        {
          stakeholder: "CIO / IT Director",
          focus: "Risk Reduction & Compliance",
          keyMessages: [
            "Closes critical compliance gaps and audit findings",
            "Provides 24/7 threat monitoring across all endpoints",
            "Enables rapid incident response and forensics capabilities",
            "Demonstrates due diligence to board and insurance carriers",
          ],
        },
        {
          stakeholder: "CFO / Finance",
          focus: "Cost-Benefit Analysis",
          keyMessages: [
            "$12,400 annual investment prevents $45,000+ breach response costs",
            "Reduces cyber insurance premiums by approximately $3,200 annually",
            "Avoids operational downtime (manufacturing: $5,000-$50,000 per hour)",
            "263% ROI in year one through breach prevention and savings",
          ],
        },
        {
          stakeholder: "Operations Manager",
          focus: "Operational Continuity",
          keyMessages: [
            "Maintains 99.99% uptime during deployment and ongoing operation",
            "Non-disruptive agent installation can be scheduled during maintenance windows",
            "Provides real-time alerting for anomalous activity before systems are impacted",
            "Supports business continuity and disaster recovery requirements",
          ],
        },
      ],
      objectionHandling: [
        {
          objection: "We already have antivirus, isn't that enough?",
          response:
            "Antivirus handles known threats, but EDR detects sophisticated attacks using behavior analysis. Recent ransomware bypasses antivirus 60% of the time. EDR catches these threats in execution phase, stopping them before damage occurs. You need both layers for complete protection.",
        },
        {
          objection: "This seems expensive. Can we just monitor more closely with our current tools?",
          response:
            "Manual monitoring creates response gaps during off-hours and on weekends. EDR provides 24/7 automated monitoring and can block threats in milliseconds. One ransomware incident costs $45,000+ in response alone. This $12,400 investment pays for itself with just one prevented incident.",
        },
        {
          objection: "Will EDR slow down our workstations or disrupt operations?",
          response:
            "Modern EDR agents use less than 2% CPU and 150MB RAM. Deployment is done in phases during maintenance windows. Our customers report zero user impact post-deployment. We can pilot on 5 devices first to prove this to your team.",
        },
        {
          objection: "How long does deployment take? We can't afford downtime.",
          response:
            "We deploy in phases over 4 weeks with zero downtime. Week 1: Planning & validation. Week 2-3: Phased rollout of agents during evening hours. Week 4: Testing & validation. Your users experience no service interruption.",
        },
      ],
    },
  },
  {
    id: "seat-count",
    title: "Seat Count True-Up",
    category: "Revenue Recovery",
    severity: "medium",
    summary:
      "AI agents identified 127 untracked users across multiple license types, representing $12,732/month in recovery opportunity.",
    data: {
      "Active AD Users": 497,
      "Billed Seats": 450,
      Variance: 47,
      "Software Seat Overage": 47,
      "Managed Device Overage": 38,
      "Service Tier Gap": 42,
      "Total Monthly Recovery": "$12,732",
      "Annual Opportunity": "$152,784",
    },
    recommendation: "Initiate true-up conversations for Q1 billing adjustment across all license categories.",
    persona: "Sales",
    dataSources: {
      internal: {
        structured: [
          "Active Directory - User Database",
          "Mobile Device Management (MDM) System",
          "CRM - Billing Records",
          "License Management System",
          "Usage Analytics Platform",
        ],
        unstructured: ["Contract Documents", "Email - Billing Communications", "Slack - Team Channel History"],
      },
      external: ["Industry Benchmarking - SaaS Pricing Models", "Customer Health Indicators"],
    },
    licenseTypes: [
      {
        type: "Software Seats (Office 365)",
        icon: "software",
        contracted: 450,
        active: 497,
        variance: 47,
        monthlyRecovery: 2115,
      },
      {
        type: "Managed Devices (Mobile/Laptop)",
        icon: "device",
        contracted: 280,
        active: 318,
        variance: 38,
        monthlyRecovery: 3800,
      },
      {
        type: "Premium Support Tier",
        icon: "service",
        contracted: 300,
        active: 342,
        variance: 42,
        monthlyRecovery: 6817,
      },
    ],
    totalMonthlyRecovery: 12732,
    trueUpPlaybook: {
      overviewMessage:
        "These aren't difficult sales conversations—this is revenue you've already earned, just not yet collected. Our AI agents tracked active users against contracted counts in real time. When clients exceed their agreements, we've identified the gap with precise data. The true-up process positions billing adjustments as routine contract updates, not corrections.",
      usageDocumentation: [
        {
          title: "Active Directory Audit Results",
          description:
            "Real-time user counts from AD sync show 47 additional users actively consuming licenses that aren't billed.",
          dataPoint: "47 active users identified | 30-day average",
        },
        {
          title: "Device Management Records",
          description:
            "MDM enrollment data confirms 38 devices beyond contracted allocation actively receiving security updates and management.",
          dataPoint: "38 managed devices | Verified enrollment dates",
        },
        {
          title: "Usage Analytics Timeline",
          description:
            "Service tier usage logs demonstrate consistent consumption patterns exceeding contracted capacity over 90+ days.",
          dataPoint: "42 service tier users | 95% consistent usage",
        },
      ],
      discussionFrameworks: [
        {
          title: "Growth Conversation (Finance/Procurement)",
          approach: "Position true-up as natural business growth requiring billing alignment, not a correction.",
          keyTalkingPoints: [
            "Your team has grown—these users weren't tracked in initial planning but have been active for 3-4 months",
            "We're catching this now to keep you compliant and avoid licensing audit flags",
            "True-up cost locks in your rate for 12 months and qualifies for volume discount aggregation",
            "Retroactive adjustment simplifies Q1 and Q2 reconciliation vs. future corrections",
          ],
        },
        {
          title: "Operational Conversation (IT Director)",
          approach: "Emphasize compliance, governance, and operational benefits of accurate licensing.",
          keyTalkingPoints: [
            "Ensures full SAM (Software Asset Management) compliance across all categories",
            "Audit trail protects your company from licensing violations and unexpected penalties",
            "Accurate license count enables better capacity planning and resource allocation",
            "Prevents compliance drift as your organization continues growing",
          ],
        },
        {
          title: "Risk Conversation (General Counsel/Compliance)",
          approach: "Focus on minimizing legal and financial exposure through proactive true-up.",
          keyTalkingPoints: [
            "Staying current with licensing prevents expensive compliance audits and penalties",
            "Documented agreement adjustment creates clear legal trail vs. undiscovered violations",
            "Vendor audits are increasingly common—being proactive demonstrates good governance",
            "True-up now is significantly less expensive than license reconciliation charges later",
          ],
        },
      ],
      relationshipGuidance: [
        "Frame as 'catching up with your growth' rather than a billing correction",
        "Emphasize that accurate licensing is a sign of healthy compliance, not failure",
        "Offer to review other software to identify consolidation or underutilization opportunities",
        "Position quarterly true-up reviews as part of ongoing relationship optimization",
        "Use success stories from similar organizations to normalize the conversation",
        "Be prepared with clear usage data—transparency builds trust even when delivering change orders",
      ],
      nextSteps: [
        "Schedule true-up review call with Finance and IT leadership within 5 business days",
        "Send pre-call summary with license breakdown, usage documentation, and recovery calculation",
        "Prepare contracts amendment reflecting Q1 retroactive true-up and ongoing monthly adjustment",
        "Discuss bundling opportunity—can other renewals be aggregated for volume discount?",
        "Schedule quarterly 'licensing optimization' reviews to prevent future gaps and identify consolidation",
      ],
    },
    conversationPlaybook: {
      discussionPoints: [
        "AI agents tracked 127 additional users not currently billed across multiple license types",
        "Software seats, managed devices, and service tiers all exceed contracted allocations",
        "Users added organically over time often aren't reflected in license reconciliation until audited",
        "Compliance audit will flag these discrepancies as unlicensed software usage",
        "True-up is straightforward process and can be applied retroactively to Q1",
        "Bundling true-up with other renewals creates volume discount opportunities",
        "Quarterly licensing reviews prevent future gaps and identify consolidation savings",
      ],
      successStories: [
        {
          title: "Multi-Category License Consolidation",
          company: "CloudTech Solutions",
          metric: "127 total users across 3 license types",
          result:
            "True-up completed in Q1, identified 23 duplicate software licenses and 12 unused device licenses for consolidation, saved $28,400 annually",
        },
        {
          title: "Manufacturing Compliance Win",
          company: "Industrial Systems Corp",
          metric: "89 untracked users discovered",
          result:
            "True-up led to complete software asset audit, reallocated premium tier seats more efficiently, eliminated unused licenses, achieved full SAM compliance",
        },
        {
          title: "Financial Services Governance",
          company: "Apex Financial Group",
          metric: "62 device management gaps",
          result:
            "True-up conversation expanded to device lifecycle review, implemented automated provisioning, reduced overspend by 34%, improved security posture",
        },
      ],
      stakeholderTalks: [
        {
          stakeholder: "Finance / Procurement",
          focus: "Cost Management & Budgeting",
          keyMessages: [
            "True-up cost is $12,732/month going forward, locked in rate for 12 months",
            "Can aggregate with other software renewals for 15-20% volume discount savings",
            "Retroactive adjustment simplifies Q1-Q2 reconciliation and prevents future complications",
            "Quarterly reviews identify consolidation and underutilization to offset new costs",
          ],
        },
        {
          stakeholder: "IT Director / CISO",
          focus: "Compliance, Governance & Risk Reduction",
          keyMessages: [
            "Ensures full SAM compliance across all software, device, and service categories",
            "Audit trail creates legal protection and demonstrates proactive governance",
            "Accurate license counts enable better capacity planning and security baseline",
            "Prevents licensing violations that carry penalties and reputational risk",
          ],
        },
        {
          stakeholder: "General Counsel / Compliance Officer",
          focus: "Legal Risk Mitigation",
          keyMessages: [
            "Undiscovered licensing violations expose company to vendor audits and penalties",
            "Proactive true-up demonstrates good faith compliance vs. reactive discovery",
            "Documented agreement amendment creates clear legal trail protecting all parties",
            "True-up cost now is significantly less than compliance audit exposure later",
          ],
        },
      ],
      objectionHandling: [
        {
          objection: "Why are we being charged for users we didn't request?",
          response:
            "This is a common scenario with growing teams. New hires, contractors, and departments are often added to Active Directory before formal license requests are submitted. This isn't a billing error—it's a recognition that these users should have been licensed all along. We're catching it now to keep you compliant and avoid compliance risk. Think of it as paying for the value you've already received.",
        },
        {
          objection: "Can we just remove these users from the license pool instead?",
          response:
            "If they're actively using the software, devices, or service tier, removing them would disrupt operations and break workflows. Our data shows consistent usage patterns—these aren't orphaned accounts. True-up brings licensing in line with actual consumption and ensures compliance without operational disruption. Plus, you've already received the value; true-up simply formalizes the agreement.",
        },
        {
          objection: "This seems like a billing mistake on your vendor's part—shouldn't they absorb it?",
          response:
            "Both sides benefit from accurate licensing. From their perspective, they've been under-billed; from your perspective, you've had appropriate access. True-up adjustments are mutual agreement to fix the discrepancy going forward. The good news is we can position this as a cost-shared opportunity—bundling with other renewals often qualifies you for volume discounts that offset or exceed the true-up cost.",
        },
        {
          objection: "We don't have budget for additional software licenses this quarter.",
          response:
            "I understand. Here are your options: (1) Retroactive true-up spreads cost across Q1-Q2; (2) Quarterly pricing lock-in stabilizes future costs; (3) License audit often reveals consolidation or underutilization opportunities that create budget offsets; (4) Volume bundling with upcoming renewals typically yields 15-20% discounts. Let's identify which approach works best for your budget cycle.",
        },
      ],
    },
    conversationPlaybook: {
      discussionPoints: [
        "Active Directory shows 47 additional users beyond current licensing",
        "Users added over time often aren't reflected in license count",
        "Compliance audit will flag this discrepancy as unlicensed software usage",
        "True-up is straightforward process and can be applied retroactively to Q1",
        "Opportunity to discuss other underutilized licenses or consolidation",
      ],
      successStories: [
        {
          title: "Tech Company License Consolidation",
          company: "CloudTech Solutions",
          metric: "47 additional users identified",
          result: "True-up completed in Q1, identified 23 duplicate licenses for consolidation, saved $8,400 annually",
        },
        {
          title: "Manufacturing Seat Count Discovery",
          company: "Industrial Systems Corp",
          metric: "34 untracked users",
          result:
            "True-up led to license audit, reallocated seats more efficiently, eliminated unused premium licenses",
        },
      ],
      stakeholderTalks: [
        {
          stakeholder: "Finance / Procurement",
          focus: "Cost Management",
          keyMessages: [
            "True-up cost is $2,115/month going forward, locked in rate for 12 months",
            "Can aggregate with other software renewals for volume discount",
            "Retroactive adjustment simplifies Q1 and Q2 reconciliation",
          ],
        },
        {
          stakeholder: "IT Director",
          focus: "Compliance & Governance",
          keyMessages: [
            "Ensures full SAM (Software Asset Management) compliance",
            "Audit trail protects company from licensing violations",
            "Accurate license count enables better capacity planning",
          ],
        },
      ],
      objectionHandling: [
        {
          objection: "Why are we being charged for users we didn't request?",
          response:
            "This is a common scenario with growing teams. New hires or contractors are often added to Active Directory before license requests are submitted. This isn't a billing error—it's a recognition that these users should have been licensed all along. We're catching it now to keep you compliant.",
        },
        {
          objection: "Can we just remove these users from Active Directory instead?",
          response:
            "If they're in Active Directory, they likely have data, email, or folder access that's business-critical. Removing them could break workflows. True-up brings licensing in line with actual usage and ensures compliance without disrupting operations.",
        },
      ],
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
    conversationPlaybook: {
      discussionPoints: [
        "Sarah Chen's contact bouncing suggests email or employment status change",
        "Champion departure is highest early-warning signal for account churn risk",
        "Relationship transfer to secondary contact is critical immediately",
        "Understanding why champion left is valuable for account retention",
        "Early action prevents account stall and relationship deterioration",
      ],
      successStories: [
        {
          title: "Proactive Transition Saved Account",
          company: "Enterprise Manufacturing Co",
          metric: "CIO departed, account at risk",
          result:
            "CSM reached out immediately, built relationship with replacement, account renewed with 15% expansion",
        },
        {
          title: "Prevented Account Loss",
          company: "Retail Systems Inc",
          metric: "IT Director promoted, lost day-to-day contact",
          result: "Escalation manager engaged before relationship atrophied, secured multi-year renewal",
        },
      ],
      stakeholderTalks: [
        {
          stakeholder: "Secondary Contact / New Champion",
          focus: "Continuity & Support",
          keyMessages: [
            "We value your partnership and want to ensure continuity during transitions",
            "Our CSM is here to support your initiatives and business goals",
            "Let's schedule brief intro call to make sure we support your priorities",
          ],
        },
        {
          stakeholder: "Executive Sponsor (if escalating)",
          focus: "Relationship Value",
          keyMessages: [
            "Sarah was a valued partner and advocate for our solution",
            "We want to ensure your organization continues to realize value from our platform",
            "Let's discuss how our roadmap aligns with your evolving needs",
          ],
        },
      ],
      objectionHandling: [
        {
          objection: "Sarah moved on and we're re-evaluating our needs.",
          response:
            "Transitions are natural. This is a great opportunity for us to reset and make sure we're meeting current priorities. Can I schedule time with your new IT leader to understand how we can better support your goals? We've helped many organizations through similar transitions.",
        },
      ],
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
    conversationPlaybook: {
      discussionPoints: [
        "68% drop in support tickets over 90 days is significant engagement decline",
        "Could indicate: system stability, user adoption drop, or customer dissatisfaction",
        "Last proactive check-in was 45 days ago, no recent business reviews",
        "Low engagement precedes churn—early action prevents account loss",
        "QBR is opportunity to reassess business alignment and priorities",
      ],
      successStories: [
        {
          title: "Quiet Client Re-Engagement",
          company: "Manufacturing Solutions Ltd",
          metric: "Support tickets dropped 71%",
          result: "QBR uncovered unmet needs, expanded platform adoption to additional teams, grew contract 28%",
        },
        {
          title: "Prevented Churn Through Check-In",
          company: "Regional IT Services",
          metric: "Silent for 50+ days",
          result:
            "CSM outreach discovered budget re-prioritization, helped secure next year's commitment with new use cases",
        },
      ],
      stakeholderTalks: [
        {
          stakeholder: "Primary Contact",
          focus: "Value Realization",
          keyMessages: [
            "We haven't connected in a while and want to make sure we're delivering value",
            "Let's review how your team is using the platform and identify optimization opportunities",
            "Are there evolving needs or priorities we should discuss for 2026?",
          ],
        },
        {
          stakeholder: "Finance (if churn risk high)",
          focus: "Business Continuity",
          keyMessages: [
            "Understanding your evolving IT priorities helps us align our roadmap",
            "Let's discuss how we can continue to support your operational goals",
            "Any budget or strategic changes we should know about for planning?",
          ],
        },
      ],
      objectionHandling: [
        {
          objection: "We've been quiet because we haven't had any issues.",
          response:
            "That's great to hear! Stability is important. But quiet can also mean the team isn't maximizing the full platform. Let's do a quick audit of how you're using our solution. Many customers discover new capabilities that solve other pain points they're managing manually.",
        },
        {
          objection: "We're evaluating other solutions right now.",
          response:
            "That's understandable. Before you decide, let's make sure you understand everything our platform offers. Many customers discover they can consolidate other tools with our solution. Can I show you three features you might not be using today?",
        },
      ],
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
    conversationPlaybook: {
      discussionPoints: [
        "Email sentiment shifted from 'Friendly' to 'Terse' over 3-week period",
        "Key phrases detected: 'delays', 'still waiting', 'frustrated' suggest frustration",
        "Sentiment drift often precedes formal complaint or escalation",
        "Early intervention prevents relationship deterioration and churn",
        "Executive sponsor involvement shows customer importance and commitment",
      ],
      successStories: [
        {
          title: "Sentiment Drift Intervention",
          company: "Financial Services Inc",
          metric: "Friendly to Frustrated in 2 weeks",
          result:
            "Executive outreach addressed underlying issues, resolved in 5 days, customer became internal advocate",
        },
        {
          title: "Prevented Escalation",
          company: "Healthcare Systems Corp",
          metric: "Terse communication detected",
          result:
            "Immediate CSM and manager response uncovered performance issue, implemented fix within 72 hours, renewed with expansion",
        },
      ],
      stakeholderTalks: [
        {
          stakeholder: "Primary Contact",
          focus: "Issue Resolution",
          keyMessages: [
            "We noticed some challenges in recent communications and want to make things right",
            "I'm personally taking ownership to resolve any issues you've experienced",
            "Let's schedule a call today to discuss what's frustrated you and find solutions",
          ],
        },
        {
          stakeholder: "Executive Sponsor (VP/C-suite)",
          focus: "Relationship & Commitment",
          keyMessages: [
            "I wanted to reach out personally because we value your partnership",
            "Our team has noted some service concerns and I'm committed to fixing them",
            "Your feedback is invaluable—let's discuss how we can restore your confidence",
          ],
        },
      ],
      objectionHandling: [
        {
          objection: "We've had too many issues with your platform lately.",
          response:
            "I understand your frustration, and I take full responsibility. Let's get specific about what's happened. [Listen]. Here's what I'm going to do: [specific action]. I'll personally follow up with you in 48 hours with status. Can we schedule time tomorrow to dig deeper?",
        },
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
    conversationPlaybook: {
      discussionPoints: [
        "P1 response time trending toward 15-minute SLA breach (currently 12 min avg)",
        "Only 3-minute buffer remaining with 4 open P1 tickets",
        "SLA breaches trigger customer escalations and contract penalties",
        "Early staffing adjustment prevents breach and customer dissatisfaction",
        "Predictive staffing shows trend will breach by EOW without action",
      ],
      successStories: [
        {
          title: "Prevented SLA Breach",
          company: "Critical Infrastructure Client",
          metric: "4 P1 tickets with 3-min buffer",
          result:
            "Allocated additional engineer, maintained 99.2% SLA compliance, prevented $50K penalty and escalation",
        },
      ],
      stakeholderTalks: [
        {
          stakeholder: "Engineering Lead",
          focus: "Team Capacity",
          keyMessages: [
            "Current ticket volume trending toward SLA breach this week",
            "Allocate on-call engineer Thursday-Sunday to maintain compliance",
            "Monitor P1 trends—if sustained, we need permanent capacity adjustment",
          ],
        },
      ],
      objectionHandling: [
        {
          objection: "Can we ask the customer to be patient with response times?",
          response:
            "No—SLA is contractual commitment. Breach triggers penalties and escalation. Better to allocate temporary capacity now than manage customer complaint and financial penalty later.",
        },
      ],
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
    conversationPlaybook: {
      discussionPoints: [
        "Server cluster at 87% CPU during peak hours—only 13% headroom to critical threshold",
        "Storage projections show capacity limit by Feb 15, 2026 (40 days)",
        "Performance degradation expected before threshold—customer impact imminent",
        "Capacity planning decision needed: scale infrastructure or optimize workloads",
        "Proactive upgrade prevents outages and customer dissatisfaction",
      ],
      successStories: [
        {
          title: "Capacity Upgrade Prevented Outage",
          company: "E-Commerce Platform",
          metric: "87% CPU utilization",
          result: "Planned upgrade completed before holiday traffic spike, maintained 99.99% uptime during peak season",
        },
      ],
      stakeholderTalks: [
        {
          stakeholder: "Infrastructure Lead",
          focus: "Capacity Planning",
          keyMessages: [
            "Current utilization trending toward critical threshold by Feb 15",
            "Two options: scale infrastructure (12-day lead time) or optimize workloads (2-week analysis)",
            "Recommend immediate decision to avoid customer impact",
          ],
        },
        {
          stakeholder: "Finance (if budget required)",
          focus: "Business Continuity ROI",
          keyMessages: [
            "Proactive capacity upgrade costs $15K now",
            "Emergency scaling during outage costs 3x and damages customer trust",
            "Avoiding even one customer outage justifies the investment",
          ],
        },
      ],
      objectionHandling: [
        {
          objection: "Can we wait to see if usage stabilizes before upgrading?",
          response:
            "We're past the safe observation window. At 87% CPU, performance degradation begins, and storage hits limit in 40 days. Waiting risks customer impact. Let's start the upgrade process today—if usage drops, we can pause it.",
        },
      ],
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
    conversationPlaybook: {
      discussionPoints: [
        "14 servers missing critical security patches from December cycle",
        "3 unpatched CVEs have active exploits in the wild",
        "Compliance audit will flag this as critical finding",
        "Emergency maintenance window is lowest-risk patching window",
        "Delay increases breach likelihood and regulatory exposure",
      ],
      successStories: [
        {
          title: "Emergency Patch Deployment",
          company: "Financial Institution",
          metric: "14 unpatched servers",
          result:
            "Emergency patching completed in 24 hours, prevented post-exploitation of known CVEs during compliance audit",
        },
      ],
      stakeholderTalks: [
        {
          stakeholder: "Security Team",
          focus: "Risk Mitigation",
          keyMessages: [
            "14 servers have exploitable CVEs—this is critical priority",
            "Emergency patching window recommended for this week",
            "Post-deployment validation confirms no functionality impact",
          ],
        },
        {
          stakeholder: "Operations Manager",
          focus: "Minimal Disruption",
          keyMessages: [
            "Patching window scheduled for Sunday 2-4 AM to minimize operational impact",
            "Rollback plan in place in case of issues",
            "Estimated recovery time: 45 minutes per server",
          ],
        },
      ],
      objectionHandling: [
        {
          objection: "We can't patch during business operations—too risky.",
          response:
            "Absolutely—agreed on off-hours patching. Sunday 2-4 AM is lowest-usage window. We have rollback plan for each server. Staying unpatched is higher risk: these CVEs are actively exploited. We need emergency window this week.",
        },
        {
          objection: "Can this wait until our next planned maintenance window?",
          response:
            "These are active exploits—not something we can wait on. Next planned window isn't for 6 weeks. Risk is too high. One compromised server could spread laterally across your environment. Emergency patching is justified here.",
        },
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

export function getInsightsForCustomer(customerId: string): InsightCard[] {
  // Map customers to their relevant insights
  const customerInsightMap: Record<string, string[]> = {
    acme: [
      "security-gap",
      "seat-count",
      "eol-refresh",
      "champion-departure",
      "quiet-client",
      "sentiment-drift",
      "sla-breach",
      "patch-compliance",
    ],
    globex: ["shadow-it", "resource-util"],
    initech: [],
  }

  const insightIds = customerInsightMap[customerId] || []
  return insightCards.filter((card) => insightIds.includes(card.id))
}
