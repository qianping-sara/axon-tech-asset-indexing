export interface SourcingCriteriaDefinition {
  id: string;
  title: string;
  weight: number;
  description: string;
}

export const SOURCING_MODEL_CRITERIA: SourcingCriteriaDefinition[] = [
  {
    id: 'strategicDifferentiation',
    title: 'Strategic Differentiation',
    weight: 25,
    description:
      'Evaluate whether this capability provides competitive advantage or is a commodity. Commodities are better suited for buy/OSS, while strategic differentiators may justify custom build. Example: A unique claims processing algorithm is strategic; standard reporting is commodity.',
  },
  {
    id: 'requirementsFit',
    title: 'Requirements Fit',
    weight: 20,
    description:
      'Assess how well existing solutions meet your specific needs. Perfect fit suggests buying; significant customization needs suggest building. Consider both functional and non-functional requirements.',
  },
  {
    id: 'timeToMarket',
    title: 'Time to Market',
    weight: 15,
    description:
      'Evaluate implementation speed requirements. Buying or using OSS typically accelerates time to market (6-12 months), while custom build takes longer (12+ months). Rapid deployment needs favor buy/OSS.',
  },
  {
    id: 'roadmapControl',
    title: 'Roadmap Control',
    weight: 10,
    description:
      'Determine how much control you need over the product roadmap. Custom build provides full control; commercial products offer limited influence; OSS offers community-driven control. Consider your strategic flexibility needs.',
  },
  {
    id: 'tcoPrediability',
    title: 'TCO Predictability',
    weight: 10,
    description:
      'Assess cost predictability. Commercial solutions have clear licensing costs; custom builds have variable costs with hidden factors; OSS has unpredictable support and maintenance costs. Evaluate your budget certainty.',
  },
  {
    id: 'internalSkillset',
    title: 'Internal Skillset Match',
    weight: 10,
    description:
      'Evaluate whether your team has the skills to build, implement, or maintain the solution. Skill gaps require training or hiring. Existing skills reduce risk and support costs.',
  },
  {
    id: 'vendorLockIn',
    title: 'Vendor Lock-in Risk',
    weight: 5,
    description:
      'Assess dependency on a single vendor. High lock-in risk with commercial products; no vendor lock-in with custom build; moderate risk with OSS. Consider exit strategies and data portability.',
  },
  {
    id: 'integrationFriendliness',
    title: 'Integration Friendliness',
    weight: 5,
    description:
      'Evaluate how easily the solution integrates with existing systems. Open APIs and standard formats reduce integration complexity. Closed systems increase integration costs and timelines.',
  },
];

export const SOURCING_MODELS = ['Build', 'Buy', 'Open Source'] as const;

export const SCORE_LABELS: Record<number, string> = {
  0: 'Not Scored',
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

