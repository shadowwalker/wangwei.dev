export interface ResumeProfile {
  name: string
  email: string
  phone: string
  role: string
  location: {
    city: string
    state: string
    country: string
    googleMapsUrl: string
  }
  yearsOfExperience: number
  links: {
    label: string
    url: string
    icon?: string
  }[]
}

export interface ResumeExperience {
  company: string
  location: string
  title: string
  startDate: string
  endDate: string
  description: string[]
}

export interface ResumeEducation {
  school: string
  location: string
  degree: string
  startDate: string
  endDate: string
  gpa?: string
  details: string[]
}

export interface ResumeProject {
  title: string
  subtitle?: string
  startDate?: string
  endDate?: string
  description: string[]
}

export interface ResumeInternship {
  company: string
  team: string
  period: string
}

export interface ResumeData {
  profile: ResumeProfile
  summary?: string
  education: ResumeEducation[]
  internships?: ResumeInternship[]
  experience: ResumeExperience[]
  technicalSkills: string[]
  recentProjects: ResumeProject[]
}

const YOE: number = new Date().getFullYear() - 2016

export const RESUME_DATA: ResumeData = {
  profile: {
    name: 'Wei Wang',
    email: 'hi@wangwei.dev',
    phone: '+1 (425) 417-8117',
    role: 'Full Stack AI Engineer',
    location: {
      city: 'Redmond',
      state: 'WA',
      country: 'USA',
      googleMapsUrl: 'https://maps.app.goo.gl/iSsAE1oCGx8BFwou9'
    },
    yearsOfExperience: YOE,
    links: [
      {
        label: 'weiwio',
        url: 'https://linkedin.com/in/weiwio',
        icon: 'linkedin'
      },
      {
        label: 'shadowwalker',
        url: 'https://github.com/shadowwalker',
        icon: 'github'
      },
      { label: 'wangwei.dev', url: 'https://wangwei.dev', icon: 'website' }
    ]
  },
  summary:
    'Senior full-stack software engineer with 10+ years of experience building large-scale cloud platforms, developer tools, and production AI systems at Amazon, Microsoft, and Roblox. Passionate about AI and Agentic AI, with hands-on experience build LLM inference infrastructure, agent workflows, and AI-powered developer tools. Open-source contributor and founder of widely adopted projects, combining deep systems thinking with product-driven execution.',
  education: [
    {
      school: 'Johns Hopkins University',
      location: 'Baltimore, Maryland, USA',
      degree: 'Master of Science in Engineering (M.S.E.) of Computer Science',
      startDate: 'Aug 2015',
      endDate: 'Dec 2016',
      gpa: '3.64 / 4',
      details: []
    },
    {
      school: 'Shanghai University',
      location: 'Shanghai, China',
      degree: 'Bachelor of Science (B.S.) in Telecommunications Engineering',
      startDate: 'Aug 2011',
      endDate: 'Jul 2015',
      gpa: '3.34 / 4',
      details: []
    }
  ],
  experience: [
    {
      company: 'Amazon',
      location: 'Bellevue, WA, USA',
      title: 'Software Engineer II, AI Infrastructure',
      startDate: 'April 2025',
      endDate: 'Now',
      description: [
        'Architected Kubernetes-based LLM inference infrastructure (vLLM, SGLang) using helm charts and LeaderWorkerSet to reliably serve 100B+ parameter models in production, reducing NVMe model-load latency by 40% and improving startup stability at scale.',
        'Built a HPC capacity management portal (Next.js/React) with automated AWS resource validation (VPC/ENI), eliminating manual checks and preventing failed scale-up events.',
        'Led early adoption of Agentic AI by building MCP auto-discovery tooling and custom agents for Amazon Kiro CLI, enabling faster developer workflows and accelerating AI-native infrastructure adoption across teams.',
        'Mentored engineers on the team to deliver a cloud-native observability tool for job failure visualization that significantly reduced infrastructure troubleshooting time.'
      ]
    },
    {
      company: 'Amazon',
      location: 'Bellevue, WA, USA',
      title: 'Software Engineer II, Last Mile Transportation Technology',
      startDate: 'Jul 2022',
      endDate: 'March 2025',
      description: [
        'Engineered next-gen ML-based capacity planning system (UI/API/ML Orchestration), expanded the system to US, MX, and CA markets. Reduced 52-week cost forecast errors to <20% and slashed planner override rates to <20%, directly optimizing long-term delivery cost reduction.',
        "Designed and implemented a delivery capacity check parallelization algorithm that decreased service latency by 50% as part of checkout flow, significantly improving system throughput and contributing to Amazon's ultra fast delivery goal.",
        'Modernized the Australian driver onboarding funnel by automating critical vehicle data collection, achieving feature parity with US/UK markets. Eliminated manual survey workflows to save operational hours and improved data accuracy for precise, target-based recruiting.',
        'Supported maintenance and on-call incident response for global services and mentored 2 engineers to drive engineering best practices and operational stability.'
      ]
    },
    {
      company: 'Roblox',
      location: 'San Mateo, CA, USA',
      title: 'Senior Software Engineer, Engineering Efficiency',
      startDate: 'Feb 2021',
      endDate: 'May 2022',
      description: [
        'Developed tools to aggregate test results from GitHub Actions workflows with .NET 5, TypeScript, next.js, GraphQL and NATS message queue.',
        'Improved and supported CI/CD workflows for the whole company on TeamCity and GitHub Actions with HashiCorp stack (Terraform, Nomad, Vault, Consul), JFrog Artifactory and other tools.',
        'Administered and supported third party engineering tools for the whole company, developed services to collect engineering efficiency metrics for each team.'
      ]
    },
    {
      company: 'Microsoft',
      location: 'Redmond, WA, USA',
      title: 'Software Engineer II, Windows Notification Services',
      startDate: 'Jul 2019',
      endDate: 'Feb 2021',
      description: [
        'Built and maintained backend services connecting billions of Windows platform devices and serve half million RPS for push notifications through live TCP connections.',
        'Refactored and modernized tech stacks using REST and gRPC, built internal development tools and CI/CD pipelines to improve services performance and reliability.',
        'Built service and internal test suites supporting web push notification feature of new Edge browser.'
      ]
    },
    {
      company: 'Microsoft',
      location: 'Redmond, WA, USA',
      title: 'Software Engineer, CSD CFE Toolkit',
      startDate: 'Jun 2018',
      endDate: 'Jul 2019',
      description: [
        'Maintained packaging tools for enterprise Windows customers. Built first CI/CD pipelines for the team.'
      ]
    },
    {
      company: 'Amazon Web Services',
      location: 'Seattle, WA, USA',
      title: 'SDE I, AWS CodePipeline',
      startDate: 'Feb 2017',
      endDate: 'Jun 2018',
      description: [
        'Built CI/CD services, tools and region expansion. Reduced ticket resolution from 2 weeks to 2 days.'
      ]
    }
  ],
  internships: [
    {
      company: 'Amazon',
      team: 'Last Mile Transportation Technology',
      period: 'May 2016 - Aug 2016'
    },
    {
      company: 'SAP Labs China',
      team: 'Global Technology Legal Compliance',
      period: 'Sep 2014 - Mar 2015'
    },
    {
      company: 'Shanghai Limei Advertising Co., Ltd',
      team: 'Product & Technology Department',
      period: 'Jul 2014 - Aug 2014'
    }
  ],
  technicalSkills: [
    'Agentic AI, AWS, Azure, GCP, Kubernetes, Docker, Microservices, TypeScript, JavaScript, Java, C#, Python, React.js, Next.js, Tailwind CSS, tRPC, Drizzle, PostgreSQL, Stripe, Model Context Protocol (MCP), Agentic Workflows, LLM Inference Optimization, vLLM, SGLang, MLOps'
  ],
  recentProjects: [
    {
      title: 'Shortcuts AI',
      subtitle: 'Founder & Builder, getshortcuts.ai, 500+ users',
      startDate: 'May 2024',
      endDate: 'Now',
      description: [
        'Founded and built the first AI Agent product from 0 to 1 across Apple Devices preceding Apple Intelligence. Integrating Siri and Shortcuts app with leading LLMs (e.g., Claude, Gemini, ChatGPT, DeepSeek, Grok, etc.) to enable users get answers and get things done faster than ever.',
        'Prototyped and launched the product in 2 months and grew users from 0 to 500+ through product-led growth and community-driven marketing. Executed marketing posts, videos and user outreach on X, Reddit, LinkedIn and Xiaohongshu. Researched use cases and gathered feedbacks for feature development and product improvement.'
      ]
    },
    {
      title: 'Next PWA',
      subtitle: 'Open Source Project, 4.1K GitHub stars, 34.8M downloads',
      startDate: 'March 2019',
      endDate: 'Jan 2024',
      description: [
        'Built and maintained a zero-configuration Progressive Web App (PWA) plugin for Next.js. Leveraged Workbox, service workers, and Webpack to enable offline support, optimized caching, and seamless PWA adoption for modern web apps.',
        'Drove open-source adoption and collaboration, grew the project to 4,000+ GitHub stars and contributions from dozens of developers by prioritizing clear documentation, examples, and backward-compatible upgrades.'
      ]
    }
  ]
}
