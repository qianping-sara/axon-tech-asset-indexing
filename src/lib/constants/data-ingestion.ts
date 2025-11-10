/**
 * Data Ingestion Advisor Constants (Redesigned)
 */

import { Question, RecommendationResult, DataIngestionAnswers } from '@/lib/types/data-ingestion';

/**
 * Q1 - Strategic Choice: Can we eliminate the problem at the source?
 */
export const QUESTION_Q1: Question = {
  id: 'q1',
  title: 'Strategic Choice: Shift-Left',
  description:
    'Can the input data be fully digitized at the source channel to eliminate unstructured data at the origin?',
  helpText:
    'This is the highest priority strategy. If you can modify the source channel to provide structured, digital input, you eliminate the need for complex data extraction downstream.',
  options: [
    {
      value: 'yes',
      label: 'Yes, we can modify the source channel',
      description: 'We have the ability to implement structured input at the source (e.g., digital form, API)',
      examples: [
        'Insurance Servicing: Require customers to submit claims through a structured digital form instead of email/PDF',
        'Insurance Servicing: Implement a mobile app for policy updates instead of accepting handwritten forms',
        'Insurance Servicing: Use API integration with partner systems to receive structured policy data',
      ],
    },
    {
      value: 'no',
      label: 'No, we must accept data as-is',
      description: 'The source channel cannot be modified; we must process existing data formats',
      examples: [
        'Insurance Servicing: Customers submit claims via email with scanned documents (legacy process)',
        'Insurance Servicing: Processing handwritten claim forms from field agents',
        'Insurance Servicing: Receiving unstructured policy documents from external partners',
      ],
    },
  ],
};

/**
 * Q2 - Tactical Diagnosis: What is the main challenge?
 */
export const QUESTION_Q2: Question = {
  id: 'q2',
  title: 'Tactical Diagnosis: Mapping vs. Interpretation',
  description:
    'What is the main challenge you face when processing this data?',
  helpText:
    'This diagnosis determines whether you need a simple template or a complex AI solution. "Mapping" means the data is clean and predictable; "Interpretation" means the data is messy and requires intelligence.',
  options: [
    {
      value: 'mapping',
      label: 'Challenge is "Mapping"',
      description:
        'The data is clean, predictable, and machine-readable. My main work is telling the system where each field goes.',
      examples: [
        'Insurance Servicing: Structured claim forms with fixed fields (claim amount, date, type)',
        'Insurance Servicing: Policy documents with consistent layout and field positions',
        'Insurance Servicing: Standardized customer information from CRM systems',
      ],
    },
    {
      value: 'interpretation',
      label: 'Challenge is "Interpretation"',
      description:
        'The data is messy, variable, or non-standard. The system needs intelligence to understand what the data means.',
      examples: [
        'Insurance Servicing: Handwritten claim notes with varying formats and abbreviations',
        'Insurance Servicing: Customer emails describing policy issues in natural language',
        'Insurance Servicing: Scanned documents with different layouts, fonts, and quality levels',
        'Insurance Servicing: Determining claim eligibility from complex policy language and customer context',
      ],
    },
  ],
};

/**
 * Q3.1 - Problem Type Diagnosis
 */
export const QUESTION_Q3_1: Question = {
  id: 'q3.1',
  title: 'Problem Type Diagnosis',
  description: 'Which type of AI challenge does your use case most resemble?',
  helpText:
    'This helps us understand the complexity and maturity of your problem. Common tasks have existing solutions; new patterns need custom training; new cognitive tasks need specialized expertise.',
  options: [
    {
      value: 'common',
      label: 'Common Task',
      description:
        'This is a well-known, common industry problem with existing off-the-shelf capabilities.',
      examples: [
        'Insurance Servicing: Standard document OCR for claim forms',
        'Insurance Servicing: General invoice/receipt extraction',
        'Insurance Servicing: Basic text classification (claim type, urgency level)',
      ],
    },
    {
      value: 'new_pattern',
      label: 'New Data Pattern',
      description:
        'The task type is known (e.g., extraction, classification), but the data is new, unique to our business, or existing models cannot handle it.',
      examples: [
        'Insurance Servicing: Extracting policy details from company-specific policy documents with unique formats',
        'Insurance Servicing: Classifying claim types based on company-specific claim categories and terminology',
        'Insurance Servicing: Processing handwritten claim forms with company-specific abbreviations and formats',
      ],
    },
    {
      value: 'new_cognitive',
      label: 'New Cognitive Task',
      description:
        'The task itself is new and complex, beyond simple extraction/classification.',
      examples: [
        'Insurance Servicing: Determining claim eligibility by reasoning over policy terms, customer history, and claim details',
        'Insurance Servicing: Generating personalized claim response letters based on policy and customer context',
        'Insurance Servicing: Predicting customer churn risk and recommending retention actions',
      ],
    },
  ],
};

/**
 * Q3.2 - Capability-Platform-Operations Match
 */
export const QUESTION_Q3_2: Question = {
  id: 'q3.2',
  title: 'Capability-Platform-Operations Match',
  description: 'Which description best matches your team, platform, and operational commitment?',
  helpText:
    'This is critical. We match your problem type with your actual capabilities. A Level 2 problem requires Level 2 resources; mismatches will fail.',
  options: [
    {
      value: 'level1',
      label: 'Level 1: Business/Rule Expert',
      description:
        'Team: BA or SME. Platform: Business systems or configuration tools. Commitment: Low - we can only maintain business rules or configurations, not AI models.',
      examples: [
        'Insurance Servicing: Claims team with Excel/SQL skills, using company CRM',
        'Insurance Servicing: Policy experts who can define rules but cannot code',
        'Insurance Servicing: No dedicated data science team',
      ],
    },
    {
      value: 'level2',
      label: 'Level 2: Citizen Developer + AutoML',
      description:
        'Team: Technical BA or citizen developer. Platform: Confirmed access to AutoML/no-code training platform. Commitment: Medium - our team will self-manage model monitoring and retraining.',
      examples: [
        'Insurance Servicing: Technical BA with Python basics, using AutoML platform',
        'Insurance Servicing: 1-2 citizen developers who can manage model training and monitoring',
        'Insurance Servicing: Access to cloud AutoML services (Azure ML, AWS SageMaker)',
      ],
    },
    {
      value: 'level3',
      label: 'Level 3: Professional AI Team',
      description:
        'Team: Professional AI/ML engineers. Platform: Professional tools (Python, VLLM). Commitment: High - dedicated MLOps team manages full model lifecycle.',
      examples: [
        'Insurance Servicing: Dedicated ML engineering team with 2+ years experience',
        'Insurance Servicing: In-house MLOps infrastructure and model deployment pipeline',
        'Insurance Servicing: Ability to fine-tune LLMs and manage production models',
      ],
    },
    {
      value: 'none',
      label: 'None of the above',
      description: 'We don\'t have a clear capability-platform-operations combination yet.',
    },
  ],
};

/**
 * Q3.3 - Business Criticality
 */
export const QUESTION_Q3_3: Question = {
  id: 'q3.3',
  title: 'Business Criticality',
  description: 'What is your true business requirement for accuracy?',
  helpText:
    'This determines whether you can tolerate manual corrections or need near-perfect automation.',
  options: [
    {
      value: 'efficiency',
      label: 'Efficiency Gain',
      description: 'Higher accuracy is better, but we can tolerate some manual corrections (e.g., <95% accuracy is acceptable).',
      examples: [
        'Insurance Servicing: Extracting claim amounts - 90% accuracy is acceptable, manual review for edge cases',
        'Insurance Servicing: Categorizing claim types - 85% accuracy is fine, claims team reviews misclassifications',
        'Insurance Servicing: Routing claims to departments - 92% accuracy acceptable, manual routing for uncertain cases',
      ],
    },
    {
      value: 'critical',
      label: 'Business Critical',
      description: 'We need >99% accuracy. We cannot tolerate errors.',
      examples: [
        'Insurance Servicing: Determining claim eligibility - errors directly impact customer satisfaction and legal compliance',
        'Insurance Servicing: Calculating claim payouts - errors result in financial loss or customer disputes',
        'Insurance Servicing: Fraud detection - false positives damage customer relationships, false negatives cause losses',
      ],
    },
  ],
};

/**
 * Q3.4 - Data Readiness
 */
export const QUESTION_Q3_4: Question = {
  id: 'q3.4',
  title: 'Data Readiness',
  description: 'How ready is your data for AI model training or processing?',
  helpText:
    'Data readiness is critical for success. Unready data leads to poor model performance and wasted effort. Be honest about your data quality and availability.',
  options: [
    {
      value: 'ready',
      label: 'Data is Ready',
      description:
        'We have sufficient labeled/clean data (100-1000+ samples), good data quality, and clear data governance. We can start immediately.',
      examples: [
        'Insurance Servicing: 500+ labeled claim forms with consistent quality and clear labels',
        'Insurance Servicing: Structured customer data with 95%+ completeness and validation rules',
        'Insurance Servicing: Historical policy documents with clear metadata and categorization',
      ],
    },
    {
      value: 'partial',
      label: 'Data is Partially Ready',
      description:
        'We have some data, but need preparation work (cleaning, labeling, augmentation). We can start in 2-4 weeks.',
      examples: [
        'Insurance Servicing: 200+ claim forms but need manual labeling and quality review',
        'Insurance Servicing: Customer data with 70% completeness, needs data cleaning and enrichment',
        'Insurance Servicing: Historical documents exist but need to be digitized and categorized',
      ],
    },
    {
      value: 'not_ready',
      label: 'Data is Not Ready',
      description:
        'We lack sufficient data, have poor quality, or unclear governance. We need 1-3 months of preparation before starting.',
      examples: [
        'Insurance Servicing: <50 labeled examples, need significant data collection effort',
        'Insurance Servicing: Data scattered across multiple systems with inconsistent formats',
        'Insurance Servicing: No clear data ownership or governance, need to establish processes first',
      ],
    },
  ],
};



/**
 * Recommendation Results Mapping
 */
export const RECOMMENDATIONS: Record<string, RecommendationResult> = {
  'shift-left': {
    type: 'matched',
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
    type: 'matched',
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
    type: 'matched',
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
    type: 'matched',
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
    type: 'matched',
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
    type: 'matched',
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
 * Generate recommendation based on Q3 diagnosis answers
 * This implements the "profile matching" logic described in the design
 */
export function generateAIRecommendation(
  q3_1?: string,  // Problem type: common | new_pattern | new_cognitive
  q3_2?: string,  // Capability level: level1 | level2 | level3 | none
  q3_3?: string   // Business criticality: efficiency | critical
): RecommendationResult | null {
  // Validate inputs
  if (!q3_1 || !q3_2 || !q3_3) {
    return null;
  }

  // Scenario 1: Common Task + Any Level
  // Recommendation: Use existing general capability (Level 1)
  if (q3_1 === 'common') {
    return {
      type: 'downgrade',
      strategy: 'Use Existing General Capability',
      technology: 'Platform General Model API',
      description:
        'Your need is a "common task" with existing off-the-shelf capabilities. Using AutoML or custom development would be over-engineering.',
      details: [
        'Platform provides ready-to-use General Model API for common tasks',
        'Existing capability already meets typical accuracy requirements',
        'No AI development or training needed',
        'Fast deployment, immediate results',
        'Cost-effective solution',
      ],
      warning: 'Over-design detected',
      suggestions: [
        'First, try the platform\'s general model API',
        'Only upgrade to Level 2/3 if the general model\'s accuracy cannot meet your "Business Critical" (>99%) requirement',
      ],
      nextSteps: [
        'Integrate platform General Model API',
        'Test with your data',
        'If accuracy is insufficient, consider custom training',
      ],
    };
  }

  // Scenario 2: New Data Pattern + Level 1
  // Warning: Capability mismatch
  if (q3_1 === 'new_pattern' && q3_2 === 'level1') {
    return {
      type: 'warning',
      strategy: 'Capability Mismatch - Cannot Proceed',
      technology: 'N/A',
      description:
        'You have a "new data pattern" problem (Level 2 complexity) but only Level 1 resources (BA/SME). This combination will fail.',
      details: [
        'Level 2 problems require Level 2 resources (citizen developers + AutoML)',
        'Your team can only maintain business rules, not AI models',
        'Without proper tools and training, custom model development will fail',
        'Risk of project failure and wasted resources',
      ],
      warning: 'Capability-Problem Mismatch',
      suggestions: [
        'Option 1: Upgrade your team capability to Level 2 (get citizen developers + AutoML platform access)',
        'Option 2: Escalate to professional AI team (Level 3)',
        'Option 3: Simplify the problem to use template-based extraction instead',
      ],
      nextSteps: [
        'Assess which option is feasible for your organization',
        'If choosing Option 1, plan training and platform setup',
        'If choosing Option 2, engage professional AI team',
      ],
    };
  }

  // Scenario 3: New Data Pattern + Level 2 + Efficiency
  // Recommendation: AutoML Training (matched)
  if (q3_1 === 'new_pattern' && q3_2 === 'level2' && q3_3 === 'efficiency') {
    return {
      type: 'matched',
      strategy: 'AutoML Model Training',
      technology: 'Platform AutoML / No-code Training Tools',
      description:
        'Perfect match! Your "new data pattern" problem aligns with Level 2 resources. Your citizen developers can train a custom model using AutoML.',
      details: [
        'Platform provides AutoML and no-code training interface',
        'Your team trains model using labeled training data',
        'Suitable for domain-specific patterns and custom scenarios',
        'Typically requires 100-1000+ labeled samples',
        'Better accuracy than general models for your specific use case',
        'Your team maintains and retrains the model as needed',
      ],
      nextSteps: [
        'Prepare and label training data (100-1000+ samples)',
        'Use platform AutoML interface to train model',
        'Validate model accuracy on test data',
        'Deploy trained model',
        'Monitor performance and retrain as needed',
        'Proceed to Phase 3: Process Orchestration',
      ],
    };
  }

  // Scenario 4: New Data Pattern + Level 2 + Critical
  // Warning: May need Level 3
  if (q3_1 === 'new_pattern' && q3_2 === 'level2' && q3_3 === 'critical') {
    return {
      type: 'warning',
      strategy: 'AutoML Training (with caution)',
      technology: 'Platform AutoML / No-code Training Tools',
      description:
        'Your "new data pattern" + Level 2 resources can work, but your "business critical" (>99%) requirement is challenging for citizen developers.',
      details: [
        'AutoML can achieve high accuracy, but requires careful tuning',
        'Business critical scenarios need rigorous testing and validation',
        'Your team must be committed to continuous monitoring and retraining',
        'May need professional support for optimization',
      ],
      warning: 'High accuracy requirement with Level 2 resources',
      suggestions: [
        'Proceed with AutoML but plan for professional support during optimization',
        'Invest in thorough testing and validation',
        'Consider hybrid approach: Level 2 for initial training, Level 3 for optimization',
      ],
      nextSteps: [
        'Prepare comprehensive training data',
        'Use platform AutoML with professional guidance',
        'Conduct extensive testing to achieve >99% accuracy',
        'Plan for ongoing professional support',
      ],
    };
  }

  // Scenario 5: New Cognitive Task + Level 3
  // Recommendation: Custom Development (matched)
  if (q3_1 === 'new_cognitive' && q3_2 === 'level3') {
    return {
      type: 'matched',
      strategy: 'Custom Model Development',
      technology: 'Professional AI/ML Team + Advanced Tools',
      description:
        'Perfect match! Your "new cognitive task" requires Level 3 professional expertise. Your AI team can build a specialized solution.',
      details: [
        'Professional AI/ML team designs and builds custom model',
        'May use advanced techniques (VLLM, custom algorithms, etc.)',
        'Integrates with platform via API Gateway',
        'Highest accuracy and flexibility',
        'Suitable for complex, novel problems',
      ],
      nextSteps: [
        'Engage professional AI/ML team',
        'Define problem scope and success criteria',
        'Develop or procure specialized model',
        'Implement API integration with platform',
        'Conduct thorough testing and validation',
        'Deploy and proceed to Phase 3: Process Orchestration',
      ],
    };
  }

  // Scenario 6: New Cognitive Task + Level 1 or 2
  // Warning: Insufficient resources
  if (q3_1 === 'new_cognitive' && (q3_2 === 'level1' || q3_2 === 'level2')) {
    return {
      type: 'warning',
      strategy: 'Insufficient Resources',
      technology: 'N/A',
      description:
        'Your "new cognitive task" is too complex for Level 1 or 2 resources. You need professional AI expertise.',
      details: [
        'New cognitive tasks require specialized AI/ML knowledge',
        'Level 1 (BA/SME) cannot handle this complexity',
        'Level 2 (citizen developers) lacks the expertise for novel problems',
        'Risk of project failure without professional support',
      ],
      warning: 'Problem complexity exceeds team capability',
      suggestions: [
        'Escalate to professional AI team (Level 3)',
        'Consider simplifying the problem scope',
        'Partner with external AI/ML specialists',
      ],
      nextSteps: [
        'Engage professional AI/ML team',
        'Reassess problem scope and feasibility',
        'Plan for professional development and support',
      ],
    };
  }

  // Scenario 7: Any problem + Level "none"
  // Warning: No clear capability
  if (q3_2 === 'none') {
    return {
      type: 'warning',
      strategy: 'Capability Assessment Required',
      technology: 'N/A',
      description:
        'You don\'t have a clear capability-platform-operations combination yet. You need to assess your resources before proceeding.',
      details: [
        'Identify which level (1, 2, or 3) your organization can support',
        'Secure necessary tools and platform access',
        'Ensure team commitment and training',
        'Align with organizational AI strategy',
      ],
      suggestions: [
        'Assess your team\'s AI/ML expertise',
        'Evaluate available platforms and tools',
        'Determine operational commitment level',
        'Plan for capability building if needed',
      ],
      nextSteps: [
        'Conduct capability assessment',
        'Identify gaps and plan improvements',
        'Revisit this assessment after capability building',
      ],
    };
  }

  // Default: Other combinations
  return {
    type: 'matched',
    strategy: 'Custom Solution Required',
    technology: 'Professional AI/ML Team',
    description: 'Your specific combination requires a tailored approach. Please consult with your AI team.',
    details: [
      'Your problem type and resources require custom assessment',
      'Professional AI team can provide detailed guidance',
    ],
    nextSteps: [
      'Engage professional AI/ML team',
      'Conduct detailed assessment',
      'Develop customized solution plan',
    ],
  };
}

