/**
 * Data Ingestion Selector Constants
 */

import { Question, RecommendationResult } from '@/lib/types/data-ingestion';

/**
 * Q1.1 - Strategic Choice: Shift-Left
 */
export const QUESTION_Q1_1: Question = {
  id: 'q1.1',
  title: 'Strategic Choice: Shift-Left',
  description:
    'Can the input be fully digitized at the source channel (e.g., UAW-T1 workbench) to eliminate unstructured data at the origin?',
  helpText:
    'This is the highest priority option. If you can modify the source channel to provide structured, digital input, you eliminate the need for complex data extraction downstream.',
  options: [
    {
      value: 'yes',
      label: 'Yes, we can modify the source channel',
      description: 'We have the ability to implement structured input at the source (e.g., digital form, API)',
    },
    {
      value: 'no',
      label: 'No, we must accept data as-is',
      description: 'The source channel cannot be modified; we must process existing data formats',
    },
  ],
};

/**
 * Q1.2 - Tactical Filter: Data Characteristics
 */
export const QUESTION_Q1_2: Question = {
  id: 'q1.2',
  title: 'Tactical Filter: Data Characteristics',
  description: 'What is the primary characteristic of the data you need to process?',
  helpText:
    'Understanding your data type helps determine the right extraction approach. Structured data can use simple templates; unstructured data requires AI capabilities.',
  options: [
    {
      value: 'structured',
      label: 'Structured Data',
      description: 'Fixed-template Excel, digital PDF forms, or other standardized formats',
    },
    {
      value: 'unstructured',
      label: 'Unstructured or Non-Text Data',
      description: 'Scans, emails, images, voice, or other variable formats',
    },
  ],
};

/**
 * Q1.3 - AI Capability Assessment: Pyramid Model
 */
export const QUESTION_Q1_3: Question = {
  id: 'q1.3',
  title: 'AI Capability Assessment: Pyramid Model',
  description:
    'Select the level that best matches your scenario specificity and team AI capability:',
  helpText:
    'The pyramid model has three levels: Level 1 (Common/General), Level 2 (Scenario/AutoML), Level 3 (Custom/Specialized). Choose based on your use case complexity and team expertise.',
  options: [
    {
      value: 'level1',
      label: 'Level 1: Common Scenario',
      description:
        'General use case (e.g., standard OCR, general invoice processing) with no AI development capability',
    },
    {
      value: 'level2',
      label: 'Level 2: Differentiated Scenario',
      description:
        'Specific use case (e.g., custom form, domain-specific jargon) with business team (no-code) capability',
    },
    {
      value: 'level3',
      label: 'Level 3: Highly Specific Scenario',
      description:
        'Highly specialized use case (e.g., VLLM, custom CV algorithm) with professional AI development team',
    },
  ],
};

/**
 * Recommendation Results Mapping
 */
export const RECOMMENDATIONS: Record<string, RecommendationResult> = {
  'shift-left': {
    strategy: 'Shift-Left (Channel-side Transformation)',
    technology: 'Platform LCAP / Front-end Components',
    description:
      'Modify the source channel to provide fully digitized, structured input. This eliminates unstructured data at the origin.',
    details: [
      'Platform provides "Common" LCAP and front-end components',
      'Channel team (e.g., UAW-T1) modifies its workbench based on "Differentiated" needs',
      'Add structured forms or digital input mechanisms',
      'Unstructured data is eliminated at the source',
    ],
    nextSteps: [
      'Proceed to Phase 3: Process Orchestration',
      'No data extraction needed',
      'Focus on process design and automation',
    ],
  },
  'template-based': {
    strategy: 'Template-based Extraction',
    technology: 'RPA / LCAP Data Mapping / Script',
    description:
      'Use template-based extraction for structured data with fixed formats. This is a simple, low-cost approach.',
    details: [
      'Parse using RPA, LCAP data mapping, or simple scripts',
      'Works well for fixed-template Excel, digital PDF forms',
      'Minimal AI/ML required',
      'High accuracy and reliability',
    ],
    nextSteps: [
      'Proceed to Phase 3: Process Orchestration',
      'Configure extraction rules based on template',
      'Set up validation and error handling',
    ],
  },
  'level1-general': {
    strategy: 'Level 1: General Model API',
    technology: 'Platform General Model API',
    description:
      'Use the platform\'s pre-built general model for common scenarios. No training or customization needed.',
    details: [
      'Platform provides ready-to-use General Model API',
      'Suitable for standard OCR, general invoice processing, etc.',
      'No AI development capability required',
      'Fast deployment, immediate results',
      'Accuracy may vary for domain-specific cases',
    ],
    nextSteps: [
      'Integrate platform General Model API',
      'Test with sample data',
      'Proceed to Phase 3 if accuracy is acceptable',
      'Consider Level 2 if accuracy is insufficient',
    ],
  },
  'level2-scenario': {
    strategy: 'Level 2: Scenario Model (AutoML)',
    technology: 'Platform AutoML / No-code Training',
    description:
      'Use the platform\'s AutoML capability to train a custom model for your specific scenario. Business teams can train without coding.',
    details: [
      'Platform provides AutoML / No-code training capability',
      'Business team trains model on the platform using differentiated data',
      'Suitable for specific forms, custom jargon, domain-specific patterns',
      'Requires labeled training data (typically 100-1000 samples)',
      'Better accuracy than Level 1 for specific scenarios',
    ],
    nextSteps: [
      'Prepare labeled training data',
      'Use platform AutoML interface to train model',
      'Validate model accuracy on test data',
      'Deploy trained model',
      'Proceed to Phase 3',
    ],
  },
  'level3-custom': {
    strategy: 'Level 3: Custom Model (Specialized)',
    technology: 'Custom Model Integration via API Gateway',
    description:
      'Build or buy a specialized model for highly specific scenarios. Requires professional AI development team.',
    details: [
      'Platform provides Custom Model ingestion capability (e.g., API Gateway)',
      'Dev team builds or buys specialized model (VLLM, custom CV algorithm, etc.)',
      'Integrates with platform via API',
      'Highest accuracy and flexibility',
      'Requires significant development effort and expertise',
    ],
    nextSteps: [
      'Assess build vs. buy decision',
      'Develop or procure specialized model',
      'Implement API integration with platform',
      'Conduct thorough testing and validation',
      'Proceed to Phase 3',
    ],
  },
};

/**
 * Get recommendation based on answers
 */
export function getRecommendation(
  q1_1?: string,
  q1_2?: string,
  q1_3?: string
): RecommendationResult | null {
  if (q1_1 === 'yes') {
    return RECOMMENDATIONS['shift-left'];
  }

  if (q1_2 === 'structured') {
    return RECOMMENDATIONS['template-based'];
  }

  if (q1_3 === 'level1') {
    return RECOMMENDATIONS['level1-general'];
  }

  if (q1_3 === 'level2') {
    return RECOMMENDATIONS['level2-scenario'];
  }

  if (q1_3 === 'level3') {
    return RECOMMENDATIONS['level3-custom'];
  }

  return null;
}

