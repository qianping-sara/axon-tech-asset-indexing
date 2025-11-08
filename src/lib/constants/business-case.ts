import { CriteriaDefinition } from '@/lib/types/business-case';

export const BUSINESS_CASE_CRITERIA: CriteriaDefinition[] = [
  {
    id: 'clearProblemDefinition',
    title: 'Problem or Opportunity Definition',
    weight: 30,
    description:
      'Articulate the current business problem or desired opportunity in concrete, measurable terms. For example, instead of "improve efficiency", specify "reduce claims cycle time by 30%". This clarity ensures everyone understands what needs to be solved.',
  },
  {
    id: 'explicitStrategicLink',
    title: 'Explicit Strategic Link',
    weight: 25,
    description:
      'The need clearly aligns with corporate experience, strategy objectives, or competitive imperatives. For example, if the company strategy is digital transformation, show how this tool enables that specific goal.',
  },
  {
    id: 'capabilityBasedDefinition',
    title: 'Capability-Based Definition',
    weight: 20,
    description:
      'The need should be defined as a set of business "capabilities", not specific product features. For example: "We need claims automation capability" rather than "We need product X with feature Y".',
  },
  {
    id: 'identificationOfStakeholders',
    title: 'Identification of User-Functional Stakeholders',
    weight: 15,
    description:
      'The business case must clearly identify all stakeholders from the project\'s inception into a particular department. This ensures a holistic view from the project\'s inception.',
  },
  {
    id: 'preliminaryBuyIn',
    title: 'Preliminary Buy-in from Key Stakeholders',
    weight: 10,
    description:
      'Information security and compliance teams have provided preliminary approval. This prevents maximum flexibility for the subsequent sourcing model analysis (build, buy, or open source).',
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

export const SCORE_COLORS: Record<number, string> = {
  0: 'bg-gray-100 text-gray-700',
  1: 'bg-red-100 text-red-700',
  2: 'bg-orange-100 text-orange-700',
  3: 'bg-yellow-100 text-yellow-700',
  4: 'bg-blue-100 text-blue-700',
  5: 'bg-green-100 text-green-700',
};

