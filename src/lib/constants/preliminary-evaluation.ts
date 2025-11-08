export interface CriteriaDefinition {
  id: string;
  title: string;
  weight: number;
  description: string;
}

// Part 1: Initial Assessment Criteria (Generic Tool Selection Scorecard)
export const INITIAL_ASSESSMENT_CRITERIA: CriteriaDefinition[] = [
  // 1.0 Strategic & Functional Alignment (25%)
  {
    id: 'businessValuePotential',
    title: '1.1 Business Value Potential',
    weight: 8,
    description:
      '1: Weak link to business case. 3: Solves the core pain point. 5: Solves pain point and opens new opportunities.',
  },
  {
    id: 'coreFeatureCompleteness',
    title: '1.2 Core Feature Completeness',
    weight: 8,
    description:
      '1: Missing "must-have" features. 3: Covers all "must-have" features. 5: Covers most "nice-to-have" features.',
  },
  {
    id: 'usabilityUserExperience',
    title: '1.3 Usability & User Experience',
    weight: 5,
    description:
      '1: Complex interface, counter-intuitive workflow. 3: Clear interface, usable after training. 5: Intuitive interface, usable without training.',
  },
  {
    id: 'futureProofingScalability',
    title: '1.4 Future-Proofing & Scalability',
    weight: 4,
    description:
      '1: Rigid architecture, difficult to scale. 3: Can support foreseeable business growth. 5: Highly elastic architecture, can handle multiples of growth.',
  },

  // 2.0 Architecture & Integration Fit (30%)
  {
    id: 'apiFirstDesign',
    title: '2.1 API-First Design',
    weight: 10,
    description:
      '1: Almost no APIs. 3: Provides APIs for core functions. 5: Comprehensive, well-documented APIs.',
  },
  {
    id: 'cloudNativeArchitecture',
    title: '2.2 Cloud-Native Architecture',
    weight: 7,
    description:
      '1: Traditional monolithic application. 3: "Cloud-friendly", can be deployed in the cloud. 5: Fully cloud-native, maximizes cloud value.',
  },
  {
    id: 'integrationWithCoreSystems',
    title: '2.3 Integration with Core Systems',
    weight: 8,
    description:
      '1: Requires extensive custom development. 3: Provides standard APIs, requires self-development. 5: Offers pre-built connectors.',
  },
  {
    id: 'dataModelInteroperability',
    title: '2.4 Data Model & Interoperability',
    weight: 5,
    description:
      '1: Closed, proprietary model, data lock-in. 3: Can import/export via standard formats. 5: Open model, supports real-time sync.',
  },

  // 3.0 Compliance & Governance (15%)
  {
    id: 'popiaCompliance',
    title: '3.1 POPIA Compliance',
    weight: 10,
    description:
      '1: Unclear on key issues, poses risk. 3: Provides compliance statement, has basic measures. 5: Has detailed documentation and third-party certification.',
  },
  {
    id: 'fscaJointStandardCompliance',
    title: '3.2 FSCA Joint Standard Compliance',
    weight: 10,
    description:
      '1: Cannot provide evidence of meeting FSCA requirements. 3: Follows some standards, needs supplemental controls. 5: Design follows FSCA standards, has audit reports.',
  },
  {
    id: 'generalSecurityPosture',
    title: '3.3 General Security Posture',
    weight: 5,
    description:
      '1: Lacks basic features like SSO, RBAC. 3: Supports IAM integration, basic RBAC. 5: Offers strong features like MFA, granular RBAC.',
  },

  // 4.0 Vendor/Solution Viability (15%)
  {
    id: 'vendorFinancialHealthMarketPosition',
    title: '4.1 Vendor Financial Health & Market Position',
    weight: 4,
    description:
      '1: Small scale, unclear financial status. 3: Financially stable, has a position in its niche. 5: Industry leader, financially robust.',
  },
  {
    id: 'productRoadmapVision',
    title: '4.2 Product Roadmap & Vision',
    weight: 3,
    description:
      '1: Roadmap is stagnant or misaligned with OMs strategy. 3: Continuously evolving, partially aligned with OMs strategy. 5: Clear vision, highly aligned with OMs strategy.',
  },
  {
    id: 'supportModelSLA',
    title: '4.3 Support Model & SLA',
    weight: 5,
    description:
      '1: Limited support channels, vague SLA. 3: Standard commercial support, SLA meets industry average. 5: Dedicated enterprise support, SLA exceeds industry standards.',
  },
  {
    id: 'customerReferences',
    title: '4.4 Customer References',
    weight: 3,
    description:
      '1: No successful/local financial industry case studies. 3: Has relevant industry cases, but with scale differences. 5: Has highly similar local customer references.',
  },

  // 5.0 Preliminary Financial Assessment (8%)
  {
    id: 'initialAcquisitionSubscriptionCost',
    title: '5.1 Initial Acquisition/Subscription Cost',
    weight: 3,
    description:
      '1: Far exceeds preliminary budget. 3: Within preliminary budget. 5: Significantly below preliminary budget.',
  },
  {
    id: 'pricingModelClarity',
    title: '5.2 Pricing Model Clarity',
    weight: 2,
    description:
      '1: Complex model, high risk. 3: Clear model, but with variable costs. 5: Simple, transparent, and fully predictable model.',
  },
];

// Part 2: COTS (Buy) Evaluation Criteria
export const COTS_EVALUATION_CRITERIA: CriteriaDefinition[] = [
  {
    id: 'vendorSupport',
    title: 'Vendor Support Quality',
    weight: 15,
    description:
      'Evaluate the quality and responsiveness of vendor support. Consider support tiers, SLA guarantees, technical expertise, and customer satisfaction ratings.',
  },
  {
    id: 'implementationSupport',
    title: 'Implementation Support',
    weight: 15,
    description:
      'Assess vendor-provided implementation services. Consider availability of implementation partners, training programs, and documentation quality.',
  },
  {
    id: 'customizationCapability',
    title: 'Customization Capability',
    weight: 12,
    description:
      'Evaluate how well the product can be customized to meet specific requirements. Consider configuration options, custom development capabilities, and API flexibility.',
  },
  {
    id: 'costPredictability',
    title: 'Cost Predictability',
    weight: 12,
    description:
      'Assess cost predictability and transparency. Consider licensing model, upgrade costs, support costs, and hidden fees. Evaluate multi-year pricing stability.',
  },
  {
    id: 'vendorLockInRisk',
    title: 'Vendor Lock-in Risk',
    weight: 12,
    description:
      'Evaluate the risk of vendor lock-in. Consider data portability, API standards, migration path to alternatives, and contract terms.',
  },
  {
    id: 'integrationCapability',
    title: 'Integration Capability',
    weight: 12,
    description:
      'Assess how easily the product integrates with existing systems. Consider available APIs, pre-built connectors, and integration complexity.',
  },
  {
    id: 'scalability',
    title: 'Scalability',
    weight: 11,
    description:
      'Evaluate the product\'s ability to scale with business growth. Consider performance under load, multi-tenant capabilities, and upgrade paths.',
  },
  {
    id: 'securityCompliance',
    title: 'Security & Compliance',
    weight: 11,
    description:
      'Assess security features and compliance certifications. Consider data encryption, access controls, audit trails, and compliance with industry standards.',
  },
];

// Part 2: Custom Development (Build) Evaluation Criteria
export const CUSTOM_DEVELOPMENT_CRITERIA: CriteriaDefinition[] = [
  {
    id: 'developmentTimeline',
    title: 'Development Timeline',
    weight: 15,
    description:
      'Evaluate the realistic timeline for custom development. Consider complexity, team size, resource availability, and project management approach.',
  },
  {
    id: 'resourceAvailability',
    title: 'Resource Availability',
    weight: 15,
    description:
      'Assess availability of skilled resources for development. Consider internal team capacity, external contractor availability, and technology expertise.',
  },
  {
    id: 'technicalComplexity',
    title: 'Technical Complexity',
    weight: 12,
    description:
      'Evaluate the technical complexity of building the solution. Consider technology stack, architectural challenges, and integration requirements.',
  },
  {
    id: 'maintenanceBurden',
    title: 'Maintenance Burden',
    weight: 12,
    description:
      'Assess the ongoing maintenance burden. Consider code quality, documentation, knowledge transfer, and long-term support requirements.',
  },
  {
    id: 'scalabilityPotential',
    title: 'Scalability Potential',
    weight: 12,
    description:
      'Evaluate the potential for scaling the custom solution. Consider architecture design, technology choices, and future enhancement capabilities.',
  },
  {
    id: 'securityImplementation',
    title: 'Security Implementation',
    weight: 12,
    description:
      'Assess security implementation in custom development. Consider security best practices, code review processes, and compliance requirements.',
  },
  {
    id: 'knowledgeTransfer',
    title: 'Knowledge Transfer',
    weight: 11,
    description:
      'Evaluate knowledge transfer and documentation. Consider code documentation, team training, and knowledge retention within the organization.',
  },
  {
    id: 'longTermSupport',
    title: 'Long-term Support',
    weight: 11,
    description:
      'Assess long-term support capabilities. Consider team retention, documentation quality, and ability to maintain and enhance the solution over time.',
  },
];

// Part 2: Open Source Software (OSS) Evaluation Criteria
export const OSS_EVALUATION_CRITERIA: CriteriaDefinition[] = [
  {
    id: 'communityActivity',
    title: 'Community Activity & Support',
    weight: 15,
    description:
      'Evaluate the activity level and health of the open source community. Consider commit frequency, issue resolution time, and community engagement.',
  },
  {
    id: 'codeQualityMaturity',
    title: 'Code Quality & Maturity',
    weight: 15,
    description:
      'Assess the quality and maturity of the codebase. Consider code standards, test coverage, release stability, and version history.',
  },
  {
    id: 'licenseCompatibility',
    title: 'License Compatibility',
    weight: 12,
    description:
      'Evaluate license compatibility with organizational policies. Consider license type, commercial use restrictions, and derivative work requirements.',
  },
  {
    id: 'securityPatching',
    title: 'Security Patching',
    weight: 12,
    description:
      'Assess the frequency and responsiveness of security patches. Consider vulnerability disclosure process, patch availability, and security track record.',
  },
  {
    id: 'documentationQuality',
    title: 'Documentation Quality',
    weight: 12,
    description:
      'Evaluate the quality and completeness of documentation. Consider API documentation, user guides, troubleshooting resources, and community forums.',
  },
  {
    id: 'integrationEcosystem',
    title: 'Integration Ecosystem',
    weight: 12,
    description:
      'Assess the availability of integrations and plugins. Consider pre-built connectors, extension capabilities, and third-party ecosystem.',
  },
  {
    id: 'customizationFlexibility',
    title: 'Customization Flexibility',
    weight: 11,
    description:
      'Evaluate the flexibility for customization. Consider source code availability, modification capabilities, and community contribution process.',
  },
  {
    id: 'longTermViability',
    title: 'Long-term Viability',
    weight: 11,
    description:
      'Assess the long-term viability of the project. Consider project governance, funding, maintainer commitment, and adoption trends.',
  },
];

export const SCORE_LABELS: Record<number, string> = {
  0: 'Not Scored',
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

export const SOURCING_MODELS = ['buy', 'build', 'openSource'] as const;
export type SourcingModel = typeof SOURCING_MODELS[number];

