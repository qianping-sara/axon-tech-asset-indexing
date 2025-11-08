export interface CriteriaDefinition {
  id: string;
  title: string;
  weight: number;
  description: string;
  scoringGuide: string;
}

export interface CriteriaGroup {
  id: string;
  title: string;
  description: string;
  totalWeight: number;
  criteria: CriteriaDefinition[];
}

// Part 1: Initial Assessment Criteria (Generic Tool Selection Scorecard)
export const INITIAL_ASSESSMENT_CRITERIA_GROUPS: CriteriaGroup[] = [
  {
    id: 'strategicFunctionalAlignment',
    title: '1.0 Strategic & Functional Alignment',
    description: 'Evaluate how well the solution aligns with business strategy and functional requirements.',
    totalWeight: 25,
    criteria: [
      {
        id: 'businessValuePotential',
        title: '1.1 Business Value Potential',
        weight: 8,
        description: 'Link to business case and opportunity creation',
        scoringGuide:
          '1: Weak link to business case. 3: Solves the core pain point. 5: Solves pain point and opens new opportunities.',
      },
      {
        id: 'coreFeatureCompleteness',
        title: '1.2 Core Feature Completeness',
        weight: 8,
        description: 'Coverage of must-have and nice-to-have features',
        scoringGuide:
          '1: Missing "must-have" features. 3: Covers all "must-have" features. 5: Covers most "nice-to-have" features.',
      },
      {
        id: 'usabilityUserExperience',
        title: '1.3 Usability & User Experience',
        weight: 5,
        description: 'Ease of use and intuitiveness of the interface',
        scoringGuide:
          '1: Complex interface, counter-intuitive workflow. 3: Clear interface, usable after training. 5: Intuitive interface, usable without training.',
      },
      {
        id: 'futureProofingScalability',
        title: '1.4 Future-Proofing & Scalability',
        weight: 4,
        description: 'Ability to support business growth and evolution',
        scoringGuide:
          '1: Rigid architecture, difficult to scale. 3: Can support foreseeable business growth. 5: Highly elastic architecture, can handle multiples of growth.',
      },
    ],
  },
  {
    id: 'architectureIntegrationFit',
    title: '2.0 Architecture & Integration Fit',
    description: 'Assess technical architecture and integration capabilities with existing systems.',
    totalWeight: 30,
    criteria: [
      {
        id: 'apiFirstDesign',
        title: '2.1 API-First Design',
        weight: 10,
        description: 'Quality and comprehensiveness of API offerings',
        scoringGuide:
          '1: Almost no APIs. 3: Provides APIs for core functions. 5: Comprehensive, well-documented APIs.',
      },
      {
        id: 'cloudNativeArchitecture',
        title: '2.2 Cloud-Native Architecture',
        weight: 7,
        description: 'Cloud readiness and optimization',
        scoringGuide:
          '1: Traditional monolithic application. 3: "Cloud-friendly", can be deployed in the cloud. 5: Fully cloud-native, maximizes cloud value.',
      },
      {
        id: 'integrationWithCoreSystems',
        title: '2.3 Integration with Core Systems',
        weight: 8,
        description: 'Pre-built connectors and integration ease',
        scoringGuide:
          '1: Requires extensive custom development. 3: Provides standard APIs, requires self-development. 5: Offers pre-built connectors.',
      },
      {
        id: 'dataModelInteroperability',
        title: '2.4 Data Model & Interoperability',
        weight: 5,
        description: 'Data portability and interoperability standards',
        scoringGuide:
          '1: Closed, proprietary model, data lock-in. 3: Can import/export via standard formats. 5: Open model, supports real-time sync.',
      },
    ],
  },
  {
    id: 'complianceGovernance',
    title: '3.0 Compliance & Governance',
    description: 'Verify compliance with regulatory requirements and security standards.',
    totalWeight: 15,
    criteria: [
      {
        id: 'popiaCompliance',
        title: '3.1 POPIA Compliance',
        weight: 10,
        description: 'Protection of Personal Information Act compliance',
        scoringGuide:
          '1: Unclear on key issues, poses risk. 3: Provides compliance statement, has basic measures. 5: Has detailed documentation and third-party certification.',
      },
      {
        id: 'fscaJointStandardCompliance',
        title: '3.2 FSCA Joint Standard Compliance',
        weight: 10,
        description: 'Financial Sector Conduct Authority standards',
        scoringGuide:
          '1: Cannot provide evidence of meeting FSCA requirements. 3: Follows some standards, needs supplemental controls. 5: Design follows FSCA standards, has audit reports.',
      },
      {
        id: 'generalSecurityPosture',
        title: '3.3 General Security Posture',
        weight: 5,
        description: 'Authentication, authorization, and security features',
        scoringGuide:
          '1: Lacks basic features like SSO, RBAC. 3: Supports IAM integration, basic RBAC. 5: Offers strong features like MFA, granular RBAC.',
      },
    ],
  },
  {
    id: 'vendorSolutionViability',
    title: '4.0 Vendor/Solution Viability',
    description: 'Evaluate vendor stability, roadmap, and support capabilities.',
    totalWeight: 15,
    criteria: [
      {
        id: 'vendorFinancialHealthMarketPosition',
        title: '4.1 Vendor Financial Health & Market Position',
        weight: 4,
        description: 'Financial stability and market standing',
        scoringGuide:
          '1: Small scale, unclear financial status. 3: Financially stable, has a position in its niche. 5: Industry leader, financially robust.',
      },
      {
        id: 'productRoadmapVision',
        title: '4.2 Product Roadmap & Vision',
        weight: 3,
        description: 'Strategic alignment and product evolution',
        scoringGuide:
          '1: Roadmap is stagnant or misaligned with OMs strategy. 3: Continuously evolving, partially aligned with OMs strategy. 5: Clear vision, highly aligned with OMs strategy.',
      },
      {
        id: 'supportModelSLA',
        title: '4.3 Support Model & SLA',
        weight: 5,
        description: 'Quality of support and service level agreements',
        scoringGuide:
          '1: Limited support channels, vague SLA. 3: Standard commercial support, SLA meets industry average. 5: Dedicated enterprise support, SLA exceeds industry standards.',
      },
      {
        id: 'customerReferences',
        title: '4.4 Customer References',
        weight: 3,
        description: 'Relevant customer case studies and references',
        scoringGuide:
          '1: No successful/local financial industry case studies. 3: Has relevant industry cases, but with scale differences. 5: Has highly similar local customer references.',
      },
    ],
  },
  {
    id: 'preliminaryFinancialAssessment',
    title: '5.0 Preliminary Financial Assessment',
    description: 'Initial evaluation of cost and pricing model.',
    totalWeight: 8,
    criteria: [
      {
        id: 'initialAcquisitionSubscriptionCost',
        title: '5.1 Initial Acquisition/Subscription Cost',
        weight: 3,
        description: 'Cost relative to preliminary budget',
        scoringGuide:
          '1: Far exceeds preliminary budget. 3: Within preliminary budget. 5: Significantly below preliminary budget.',
      },
      {
        id: 'pricingModelClarity',
        title: '5.2 Pricing Model Clarity',
        weight: 2,
        description: 'Transparency and predictability of pricing',
        scoringGuide:
          '1: Complex model, high risk. 3: Clear model, but with variable costs. 5: Simple, transparent, and fully predictable model.',
      },
    ],
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
    scoringGuide:
      '1: Limited support, slow response times. 3: Standard support with reasonable SLAs. 5: Premium support with excellent response times and expertise.',
  },
  {
    id: 'implementationSupport',
    title: 'Implementation Support',
    weight: 15,
    description:
      'Assess vendor-provided implementation services. Consider availability of implementation partners, training programs, and documentation quality.',
    scoringGuide:
      '1: Minimal implementation support. 3: Standard implementation services available. 5: Comprehensive implementation support with dedicated resources.',
  },
  {
    id: 'customizationCapability',
    title: 'Customization Capability',
    weight: 12,
    description:
      'Evaluate how well the product can be customized to meet specific requirements. Consider configuration options, custom development capabilities, and API flexibility.',
    scoringGuide:
      '1: Limited customization options. 3: Moderate customization through configuration. 5: Highly customizable with flexible APIs.',
  },
  {
    id: 'costPredictability',
    title: 'Cost Predictability',
    weight: 12,
    description:
      'Assess cost predictability and transparency. Consider licensing model, upgrade costs, support costs, and hidden fees. Evaluate multi-year pricing stability.',
    scoringGuide:
      '1: Unpredictable costs with hidden fees. 3: Clear pricing with some variable costs. 5: Fully transparent and predictable pricing.',
  },
  {
    id: 'vendorLockInRisk',
    title: 'Vendor Lock-in Risk',
    weight: 12,
    description:
      'Evaluate the risk of vendor lock-in. Consider data portability, API standards, migration path to alternatives, and contract terms.',
    scoringGuide:
      '1: High lock-in risk, proprietary formats. 3: Moderate lock-in risk, standard formats available. 5: Low lock-in risk, open standards and easy migration.',
  },
  {
    id: 'integrationCapability',
    title: 'Integration Capability',
    weight: 12,
    description:
      'Assess how easily the product integrates with existing systems. Consider available APIs, pre-built connectors, and integration complexity.',
    scoringGuide:
      '1: Difficult integration, limited APIs. 3: Standard APIs available, moderate integration effort. 5: Comprehensive APIs and pre-built connectors.',
  },
  {
    id: 'scalability',
    title: 'Scalability',
    weight: 11,
    description:
      'Evaluate the product\'s ability to scale with business growth. Consider performance under load, multi-tenant capabilities, and upgrade paths.',
    scoringGuide:
      '1: Limited scalability. 3: Adequate scalability for foreseeable growth. 5: Highly scalable, handles significant growth.',
  },
  {
    id: 'securityCompliance',
    title: 'Security & Compliance',
    weight: 11,
    description:
      'Assess security features and compliance certifications. Consider data encryption, access controls, audit trails, and compliance with industry standards.',
    scoringGuide:
      '1: Basic security features. 3: Good security with standard certifications. 5: Comprehensive security with multiple certifications.',
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
    scoringGuide:
      '1: Unrealistic timeline, high risk of delays. 3: Realistic timeline with moderate risk. 5: Well-planned timeline with low risk.',
  },
  {
    id: 'resourceAvailability',
    title: 'Resource Availability',
    weight: 15,
    description:
      'Assess availability of skilled resources for development. Consider internal team capacity, external contractor availability, and technology expertise.',
    scoringGuide:
      '1: Insufficient resources available. 3: Adequate resources with some gaps. 5: Abundant skilled resources available.',
  },
  {
    id: 'technicalComplexity',
    title: 'Technical Complexity',
    weight: 12,
    description:
      'Evaluate the technical complexity of building the solution. Consider technology stack, architectural challenges, and integration requirements.',
    scoringGuide:
      '1: Very high complexity, high risk. 3: Moderate complexity, manageable. 5: Low complexity, straightforward implementation.',
  },
  {
    id: 'maintenanceBurden',
    title: 'Maintenance Burden',
    weight: 12,
    description:
      'Assess the ongoing maintenance burden. Consider code quality, documentation, knowledge transfer, and long-term support requirements.',
    scoringGuide:
      '1: High maintenance burden expected. 3: Moderate maintenance requirements. 5: Low maintenance burden with good documentation.',
  },
  {
    id: 'scalabilityPotential',
    title: 'Scalability Potential',
    weight: 12,
    description:
      'Evaluate the potential for scaling the custom solution. Consider architecture design, technology choices, and future enhancement capabilities.',
    scoringGuide:
      '1: Limited scalability potential. 3: Adequate scalability with some limitations. 5: Highly scalable architecture.',
  },
  {
    id: 'securityImplementation',
    title: 'Security Implementation',
    weight: 12,
    description:
      'Assess security implementation in custom development. Consider security best practices, code review processes, and compliance requirements.',
    scoringGuide:
      '1: Weak security practices. 3: Standard security practices implemented. 5: Strong security practices with rigorous review.',
  },
  {
    id: 'knowledgeTransfer',
    title: 'Knowledge Transfer',
    weight: 11,
    description:
      'Evaluate knowledge transfer and documentation. Consider code documentation, team training, and knowledge retention within the organization.',
    scoringGuide:
      '1: Minimal documentation and knowledge transfer. 3: Adequate documentation and training. 5: Comprehensive documentation and knowledge transfer.',
  },
  {
    id: 'longTermSupport',
    title: 'Long-term Support',
    weight: 11,
    description:
      'Assess long-term support capabilities. Consider team retention, documentation quality, and ability to maintain and enhance the solution over time.',
    scoringGuide:
      '1: Uncertain long-term support. 3: Reasonable long-term support plan. 5: Strong long-term support commitment.',
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
    scoringGuide:
      '1: Inactive community, slow issue resolution. 3: Active community with reasonable support. 5: Very active community with excellent support.',
  },
  {
    id: 'codeQualityMaturity',
    title: 'Code Quality & Maturity',
    weight: 15,
    description:
      'Assess the quality and maturity of the codebase. Consider code standards, test coverage, release stability, and version history.',
    scoringGuide:
      '1: Low code quality, unstable releases. 3: Good code quality, stable releases. 5: Excellent code quality, production-ready.',
  },
  {
    id: 'licenseCompatibility',
    title: 'License Compatibility',
    weight: 12,
    description:
      'Evaluate license compatibility with organizational policies. Consider license type, commercial use restrictions, and derivative work requirements.',
    scoringGuide:
      '1: License incompatible with policies. 3: License compatible with some restrictions. 5: License fully compatible with policies.',
  },
  {
    id: 'securityPatching',
    title: 'Security Patching',
    weight: 12,
    description:
      'Assess the frequency and responsiveness of security patches. Consider vulnerability disclosure process, patch availability, and security track record.',
    scoringGuide:
      '1: Slow security patching. 3: Regular security patches. 5: Rapid security patching with proactive disclosure.',
  },
  {
    id: 'documentationQuality',
    title: 'Documentation Quality',
    weight: 12,
    description:
      'Evaluate the quality and completeness of documentation. Consider API documentation, user guides, troubleshooting resources, and community forums.',
    scoringGuide:
      '1: Poor or incomplete documentation. 3: Adequate documentation. 5: Comprehensive and well-maintained documentation.',
  },
  {
    id: 'integrationEcosystem',
    title: 'Integration Ecosystem',
    weight: 12,
    description:
      'Assess the availability of integrations and plugins. Consider pre-built connectors, extension capabilities, and third-party ecosystem.',
    scoringGuide:
      '1: Limited integrations available. 3: Good selection of integrations. 5: Extensive ecosystem with many integrations.',
  },
  {
    id: 'customizationFlexibility',
    title: 'Customization Flexibility',
    weight: 11,
    description:
      'Evaluate the flexibility for customization. Consider source code availability, modification capabilities, and community contribution process.',
    scoringGuide:
      '1: Limited customization options. 3: Moderate customization possible. 5: Highly flexible and customizable.',
  },
  {
    id: 'longTermViability',
    title: 'Long-term Viability',
    weight: 11,
    description:
      'Assess the long-term viability of the project. Consider project governance, funding, maintainer commitment, and adoption trends.',
    scoringGuide:
      '1: Uncertain viability, at-risk project. 3: Stable project with reasonable prospects. 5: Strong viability with active governance.',
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

