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
 * Q1.3a - Reusable Capability Check
 */
export const QUESTION_Q1_3a: Question = {
  id: 'q1.3a',
  title: 'Reusable Capability Check',
  description: 'Is there an existing general capability that could handle your use case?',
  helpText:
    'Examples of existing general capabilities: standard OCR, general invoice recognition, common form extraction, general document classification. If you\'re unsure, answer "No" to explore custom solutions.',
  options: [
    {
      value: 'yes',
      label: 'Yes, there is an existing general capability',
      description: 'We can leverage existing platform capabilities (e.g., standard OCR, general invoice processing)',
    },
    {
      value: 'no',
      label: 'No, we need a custom or specialized solution',
      description: 'Our use case is unique or requires specialized handling',
    },
  ],
};

/**
 * Q1.3b - Precision Check
 */
export const QUESTION_Q1_3b: Question = {
  id: 'q1.3b',
  title: 'Precision Check',
  description: 'Does the existing capability meet your precision/accuracy requirements?',
  helpText:
    'Consider your business tolerance for errors. If the existing capability achieves 95% accuracy but you need 99%, you may need to improve it.',
  options: [
    {
      value: 'yes',
      label: 'Yes, the precision is acceptable',
      description: 'The existing capability meets our accuracy requirements',
    },
    {
      value: 'no',
      label: 'No, we need better precision',
      description: 'We need to improve or customize the capability',
    },
  ],
};

/**
 * Q1.3c - Build/Improve Approach
 */
export const QUESTION_Q1_3c: Question = {
  id: 'q1.3c',
  title: 'Build/Improve Approach',
  description: 'What approach is needed to build or improve the capability?',
  helpText:
    'Consider your team\'s capabilities and resources. Simple configuration can be done by business teams; model training requires data and tools; specialized scenarios need expert teams.',
  options: [
    {
      value: 'config',
      label: 'Simple Configuration',
      description:
        'Parameter tuning, rule adjustments, or template configuration that our team can handle without AI expertise',
    },
    {
      value: 'training',
      label: 'Model Training',
      description:
        'We have sufficient training data and want to use platform AutoML/no-code tools to train a custom model',
    },
    {
      value: 'specialized',
      label: 'Specialized Development',
      description:
        'The scenario is too complex or unique; we need a professional AI/ML team to build a custom solution',
    },
  ],
};

/**
 * Q1.3d - Data & Tools Availability
 */
export const QUESTION_Q1_3d: Question = {
  id: 'q1.3d',
  title: 'Data & Tools Availability',
  description: 'Do you have sufficient data and access to no-code training tools?',
  helpText:
    'For model training: typically need 100-1000+ labeled samples depending on complexity. Platform provides AutoML, AutoOCR, and other no-code tools. If you lack either, professional help is recommended.',
  options: [
    {
      value: 'yes',
      label: 'Yes, we have data and tools',
      description: 'We have sufficient labeled training data and access to platform no-code training tools',
    },
    {
      value: 'no',
      label: 'No, we lack data or tools',
      description: 'We don\'t have enough training data or lack access to no-code training capabilities',
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
  'use-existing': {
    strategy: 'Use Existing General Capability',
    technology: 'Platform General Model API',
    description:
      'Leverage the existing general capability that already meets your precision requirements. No customization needed.',
    details: [
      'Platform provides ready-to-use General Model API',
      'Existing capability already meets your accuracy requirements',
      'No AI development or training needed',
      'Fast deployment, immediate results',
      'Cost-effective solution',
    ],
    nextSteps: [
      'Integrate platform General Model API',
      'Configure for your specific use case',
      'Proceed to Phase 3: Process Orchestration',
    ],
  },
  'config-improve': {
    strategy: 'Configuration-based Improvement',
    technology: 'Parameter Tuning / Rule Configuration',
    description:
      'Improve the existing capability through simple configuration, parameter tuning, or rule adjustments. Your team can handle this without AI expertise.',
    details: [
      'Adjust model parameters or extraction rules',
      'Add domain-specific rules or templates',
      'Configure platform settings for your use case',
      'No model training or coding required',
      'Quick implementation by business team',
    ],
    nextSteps: [
      'Access platform configuration interface',
      'Adjust parameters based on your requirements',
      'Test with sample data',
      'Deploy and monitor results',
      'Proceed to Phase 3: Process Orchestration',
    ],
  },
  'automl-training': {
    strategy: 'AutoML Model Training',
    technology: 'Platform AutoML / No-code Training Tools',
    description:
      'Train a custom model using platform AutoML tools. Your team can do this with sufficient training data and no coding required.',
    details: [
      'Platform provides AutoML and no-code training interface',
      'Your team trains model using labeled training data',
      'Suitable for domain-specific patterns and custom scenarios',
      'Typically requires 100-1000+ labeled samples',
      'Better accuracy than general models for your specific use case',
    ],
    nextSteps: [
      'Prepare and label training data (100-1000+ samples)',
      'Use platform AutoML interface to train model',
      'Validate model accuracy on test data',
      'Deploy trained model',
      'Monitor performance and retrain as needed',
      'Proceed to Phase 3: Process Orchestration',
    ],
  },
  'custom-specialist': {
    strategy: 'Custom Model Development',
    technology: 'Professional AI/ML Team + API Integration',
    description:
      'Build or procure a specialized model with professional AI/ML team support. Required for complex scenarios or when data/tools are insufficient.',
    details: [
      'Professional AI/ML team designs and builds custom model',
      'May use advanced techniques (VLLM, custom CV algorithms, etc.)',
      'Integrates with platform via API Gateway',
      'Highest accuracy and flexibility',
      'Requires significant development effort and expertise',
    ],
    nextSteps: [
      'Assess build vs. buy decision',
      'Engage professional AI/ML team',
      'Develop or procure specialized model',
      'Implement API integration with platform',
      'Conduct thorough testing and validation',
      'Deploy and proceed to Phase 3: Process Orchestration',
    ],
  },
};

/**
 * Get recommendation based on answers
 */
export function getRecommendation(
  q1_1?: string,
  q1_2?: string,
  q1_3a?: string,
  q1_3b?: string,
  q1_3c?: string,
  q1_3d?: string
): RecommendationResult | null {
  if (q1_1 === 'yes') {
    return RECOMMENDATIONS['shift-left'];
  }

  if (q1_2 === 'structured') {
    return RECOMMENDATIONS['template-based'];
  }

  // Q1.3 logic for unstructured data
  if (q1_3a === 'yes' && q1_3b === 'yes') {
    return RECOMMENDATIONS['use-existing'];
  }

  if (q1_3c === 'config') {
    return RECOMMENDATIONS['config-improve'];
  }

  if (q1_3c === 'training' && q1_3d === 'yes') {
    return RECOMMENDATIONS['automl-training'];
  }

  if (q1_3c === 'training' && q1_3d === 'no') {
    return RECOMMENDATIONS['custom-specialist'];
  }

  if (q1_3c === 'specialized') {
    return RECOMMENDATIONS['custom-specialist'];
  }

  return null;
}

