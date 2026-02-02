import type { ResumeData } from './data-en'

const YOE: number = new Date().getFullYear() - 2016

export const RESUME_DATA_ZH: ResumeData = {
  profile: {
    name: '王巍',
    email: 'hi@wangwei.dev',
    phone: '+1 (425) 417-8117',
    role: '全栈 AI 工程师',
    location: {
      city: '雷德蒙德',
      state: '华盛顿州',
      country: '美国',
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
    '资深全栈软件工程师，拥有 10 年以上在亚马逊、微软和 Roblox 构建大规模云平台、开发者工具和生产级 AI 系统的经验。热衷于 AI 和 Agentic AI，在构建 LLM 推理基础设施、智能体工作流和 AI 驱动的开发者工具方面拥有实践经验。开源贡献者和广泛采用项目的创始人，结合了深厚的系统思维与产品驱动的执行力。',
  education: [
    {
      school: '约翰霍普金斯大学',
      location: '巴尔的摩，马里兰州，美国',
      degree: '计算机科学工程硕士 (M.S.E.)',
      startDate: '2015年8月',
      endDate: '2016年12月',
      gpa: '3.64 / 4',
      details: []
    },
    {
      school: '上海大学',
      location: '上海，中国',
      degree: '通信工程理学学士 (B.S.)',
      startDate: '2011年8月',
      endDate: '2015年7月',
      gpa: '3.34 / 4',
      details: []
    }
  ],
  experience: [
    {
      company: '亚马逊 (Amazon)',
      location: '贝尔维尤，华盛顿州，美国',
      title: '软件工程师 II，AI 基础设施',
      startDate: '2025年4月',
      endDate: '至今',
      description: [
        '使用 helm charts 和 LeaderWorkerSet 构建了基于 Kubernetes 的 LLM 推理基础设施 (vLLM, SGLang)，可靠地在生产环境中服务 100B+ 参数模型，将 NVMe 模型加载延迟降低了 40%，并提高了大规模启动的稳定性。',
        '构建了 HPC 容量管理门户 (Next.js/React)，具有自动化的 AWS 资源验证 (VPC/ENI)，消除了手动检查并防止了扩展失败事件。',
        '通过构建 MCP 自动发现工具和 Amazon Kiro CLI 的自定义智能体，领导了 Agentic AI 的早期采用，加快了开发人员的工作流程，并加速了跨团队的 AI 原生基础设施采用。',
        '指导团队工程师交付了一个云原生可观测性工具，用于作业失败可视化，显著减少了基础设施故障排除时间。'
      ]
    },
    {
      company: '亚马逊 (Amazon)',
      location: '贝尔维尤，华盛顿州，美国',
      title: '软件工程师 II，最后一公里运输技术',
      startDate: '2022年7月',
      endDate: '2025年3月',
      description: [
        '设计了下一代基于机器学习的容量规划系统 (UI/API/ML 编排)，并将系统扩展到美国、墨西哥和加拿大市场。将 52 周成本预测误差降低到 <20%，并将计划员覆盖率削减到 <20%，直接优化了长期交付成本的降低。',
        '设计并实施了交付容量检查并行化算法，作为结账流程的一部分，将服务延迟降低了 50%，显著提高了系统吞吐量，助力亚马逊实现超快交付目标。',
        '通过自动化关键车辆数据收集，实现了澳大利亚司机入职流程的现代化，达到了与美国/英国市场的功能对等。消除了手动调查工作流程，节省了运营时间，并提高了基于目标的精确招聘的数据准确性。',
        '支持全球服务的维护和随叫随到的事件响应，并指导 2 名工程师推动工程最佳实践和运营稳定性。'
      ]
    },
    {
      company: 'Roblox',
      location: '圣马特奥，加利福尼亚州，美国',
      title: '高级软件工程师，工程效率',
      startDate: '2021年2月',
      endDate: '2022年5月',
      description: [
        '开发了使用 .NET 5, TypeScript, next.js, GraphQL 和 NATS 消息队列从 GitHub Actions 工作流聚合测试结果的工具。',
        '使用 HashiCorp 技术栈 (Terraform, Nomad, Vault, Consul), JFrog Artifactory 等工具，改进并支持了全公司的 TeamCity 和 GitHub Actions CI/CD 工作流。',
        '管理和支持全公司的第三方工程工具，开发了收集每个团队工程效率指标的服务。'
      ]
    },
    {
      company: '微软 (Microsoft)',
      location: '雷德蒙德，华盛顿州，美国',
      title: '软件工程师 II，Windows 通知服务',
      startDate: '2019年7月',
      endDate: '2021年2月',
      description: [
        '构建和维护了连接数十亿 Windows 平台设备的后端服务，并通过实时 TCP 连接为推送通知提供每秒 50 万次请求 (RPS) 的服务。',
        '使用 REST 和 gRPC 重构和现代化了技术栈，构建了内部开发工具和 CI/CD 管道，以提高服务性能和可靠性。',
        '构建了支持新 Edge 浏览器 Web 推送通知功能的服务和内部测试套件。'
      ]
    },
    {
      company: '微软 (Microsoft)',
      location: '雷德蒙德，华盛顿州，美国',
      title: '软件工程师，CSD CFE 工具包',
      startDate: '2018年6月',
      endDate: '2019年7月',
      description: [
        '维护企业级 Windows 客户的打包工具。为团队构建了首个 CI/CD 管道。'
      ]
    },
    {
      company: '亚马逊云科技 (AWS)',
      location: '西雅图，华盛顿州，美国',
      title: '软件开发工程师 I，AWS CodePipeline',
      startDate: '2017年2月',
      endDate: '2018年6月',
      description: [
        '构建 CI/CD 服务、工具和区域扩展。将工单解决时间从 2 周减少到 2 天。'
      ]
    }
  ],
  internships: [
    {
      company: '亚马逊 (Amazon)',
      team: '最后一公里运输技术',
      period: '2016年5月 - 2016年8月'
    },
    {
      company: 'SAP 中国研究院',
      team: '全球技术法律合规',
      period: '2014年9月 - 2015年3月'
    },
    {
      company: '上海力美广告有限公司',
      team: '产品技术部',
      period: '2014年7月 - 2014年8月'
    }
  ],
  technicalSkills: [
    'Agentic AI, AWS, Azure, GCP, Kubernetes, Docker, Microservices, TypeScript, JavaScript, Java, C#, Python, React.js, Next.js, Tailwind CSS, tRPC, Drizzle, PostgreSQL, Stripe, Model Context Protocol (MCP), Agentic Workflows, LLM Inference Optimization, vLLM, SGLang, MLOps'
  ],
  recentProjects: [
    {
      title: 'Shortcuts AI',
      subtitle: '创始人 & 构建者, getshortcuts.ai, 500+ 用户',
      startDate: '2024年5月',
      endDate: '至今',
      description: [
        '创立并构建了首个跨 Apple 设备的 AI 智能体产品（从 0 到 1），领先于 Apple Intelligence。将 Siri 和快捷指令应用与领先的 LLM（例如 Claude, Gemini, ChatGPT, DeepSeek, Grok 等）集成，使用户能够比以往更快地获得答案并完成任务。',
        '在 2 个月内构建原型并发布产品，通过产品驱动增长和社区驱动营销，将用户从 0 增长到 500+。在 X, Reddit, LinkedIn 和小红书上执行营销发布、视频和用户推广。研究用例并收集反馈以进行功能开发和产品改进。'
      ]
    },
    {
      title: 'Next PWA',
      subtitle: '开源项目, 4.1K GitHub stars, 3480 万次下载',
      startDate: '2019年3月',
      endDate: '2024年1月',
      description: [
        '构建并维护了 Next.js 的零配置渐进式 Web 应用程序 (PWA) 插件。利用 Workbox、Service Workers 和 Webpack 启用离线支持、优化缓存，并为现代 Web 应用程序实现无缝 PWA 采用。',
        '通过优先考虑清晰的文档、示例和向后兼容的升级，推动了开源采用和协作，将项目发展到 4,000+ GitHub stars 和数十名开发人员的贡献。'
      ]
    }
  ]
}
