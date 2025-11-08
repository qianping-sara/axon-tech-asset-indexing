export interface CriteriaDefinition {
  id: string;
  title: string;
  weight: number;
  description: string;
}

// Part 1: Initial Assessment Criteria
export const INITIAL_ASSESSMENT_CRITERIA: CriteriaDefinition[] = [
  {
    id: 'vendorStability',
    title: 'Vendor Stability & Support',
    weight: 25,
    description:
      'Evaluate the vendor\'s financial stability, market position, and commitment to product support. Consider company size, market share, and track record of supporting customers long-term.',
  },
  {
    id: 'implementationComplexity',
    title: 'Implementation Complexity',
    weight: 20,
    description:
      'Assess the complexity of implementing the solution. Consider deployment time, configuration requirements, data migration needs, and integration with existing systems.',
  },
  {
    id: 'supportMaintenance',
    title: 'Support & Maintenance',
    weight: 20,
    description:
      'Evaluate the quality and availability of support services. Consider SLA terms, support channels, response times, and availability of documentation and training.',
  },
  {
    id: 'costConsiderations',
    title: 'Cost Considerations',
    weight: 20,
    description:
      'Assess total cost of ownership including licensing, implementation, training, and ongoing maintenance. Consider budget constraints and cost predictability.',
  },
  {
    id: 'riskAssessment',
    title: 'Risk Assessment',
    weight: 15,
    description:
      'Evaluate potential risks including technical risks, vendor risks, integration risks, and organizational change management risks. Consider mitigation strategies.',
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

