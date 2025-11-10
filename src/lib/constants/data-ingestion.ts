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
 *
 * Rules implemented:
 * - Rule 1: Common task → Use existing model (downgrade)
 * - Rule 2: New pattern + Level 2 + Efficiency + Data ready → AutoML (matched)
 * - Rule 3: New cognitive + Level 3 + Data ready → Custom model (matched)
 * - Rule 4: New pattern/cognitive + Data not ready → Project blocked (blocked)
 * - Rule 5: New pattern/cognitive + Level 1 → Capability mismatch (warning)
 * - Rule 6: New cognitive + Level 2 → Capability mismatch (warning)
 * - Rule 7: Common + Level 2/3 → Over-design (downgrade)
 * - Rule 8: Critical + Level 1 → High risk warning (warning)
 * - Rule 9: Efficiency + Level 3 → Cost-benefit review (matched with info)
 */
export function generateAIRecommendation(
  q3_1?: string,  // Problem type: common | new_pattern | new_cognitive
  q3_2?: string,  // Capability level: level1 | level2 | level3 | none
  q3_3?: string,  // Business criticality: efficiency | critical
  q3_4?: string   // Data readiness: ready | partial | not_ready
): RecommendationResult | null {
  // Validate inputs
  if (!q3_1 || !q3_2 || !q3_3) {
    return null;
  }

  // Rule 4: Data Not Ready - Project Blocked
  // If problem is new_pattern or new_cognitive AND data is not ready, block the project
  if ((q3_1 === 'new_pattern' || q3_1 === 'new_cognitive') && q3_4 === 'not_ready') {
    return {
      type: 'blocked',
      strategy: '项目阻断：数据未就绪',
      technology: 'N/A',
      description:
        'L2/L3 模型无法在"数据未就绪"的情况下启动。您的样本数量不足（<50）或数据质量差。必须首先转向数据收集和治理。',
      details: [
        '样本数量不足（<50个标注样本）',
        '数据质量差或不一致',
        '数据治理流程不清晰',
        '无法开始AI模型开发',
      ],
      warning: '停止所有AI开发',
      suggestions: [
        '转向数据收集和治理工作',
        '建立数据标注流程',
        '预计时间：1-3个月',
        '完成数据准备后重新评估此项目',
      ],
      nextSteps: [
        '停止AI模型开发',
        '启动数据收集和治理项目',
        '建立数据标注和验证流程',
        '预计1-3个月后重新评估',
        '数据就绪后重新运行此诊断',
      ],
    };
  }

  // Rule 1 & Rule 8: Common Task + Any Level
  // Rule 1: Use existing general capability (Level 1)
  // Rule 8: If Business Critical + Level 1, add high risk warning
  if (q3_1 === 'common') {
    const isHighRisk = q3_3 === 'critical' && q3_2 === 'level1';

    return {
      type: isHighRisk ? 'warning' : 'downgrade',
      strategy: 'Use Existing General Capability' + (isHighRisk ? ' (High Risk)' : ''),
      technology: 'Platform General Model API',
      description: isHighRisk
        ? '您的需求是"业务关键"（需>99%准确率），但您将使用 Level 1 通用模型 API。通用模型可能无法满足此 SLA。'
        : '您的需求是"通用任务"，已有现成的功能。使用 AutoML 或定制开发会过度设计。',
      details: isHighRisk
        ? [
            '平台提供通用模型 API，但通常准确率为 80-95%',
            '您的需求是"业务关键"，需要 >99% 准确率',
            '通用模型可能无法满足此 SLA',
            '必须进行严格的 PoC 测试来验证准确率',
            '如果 PoC 失败，项目必须升级为 L2/L3 项目',
          ]
        : [
            '平台提供现成的通用模型 API',
            '现有功能已满足典型的准确率要求',
            '无需 AI 开发或训练',
            '快速部署，立即获得结果',
            '成本效益高',
          ],
      warning: isHighRisk ? '高风险警告' : 'Over-design detected',
      suggestions: isHighRisk
        ? [
            '必须进行严格的 PoC 测试',
            '在生产环境中部署前，测量准确率是否达到 >99%',
            '如果 PoC 失败，此项目必须升级为 L2/L3 项目',
            '考虑升级到 Level 2（AutoML）或 Level 3（定制开发）',
          ]
        : [
            '首先尝试平台的通用模型 API',
            '只有当通用模型的准确率无法满足您的"业务关键"（>99%）要求时，才升级到 Level 2/3',
          ],
      nextSteps: isHighRisk
        ? [
            '进行严格的 PoC 测试',
            '测量准确率是否达到 >99%',
            '如果成功，集成平台通用模型 API',
            '如果失败，升级为 L2/L3 项目',
          ]
        : [
            '集成平台通用模型 API',
            '使用您的数据进行测试',
            '如果准确率不足，考虑定制训练',
          ],
    };
  }

  // Rule 5: New Pattern/Cognitive + Level 1
  // Warning: Severe capability mismatch
  if ((q3_1 === 'new_pattern' || q3_1 === 'new_cognitive') && q3_2 === 'level1') {
    return {
      type: 'warning',
      strategy: '严重能力不匹配 - 寻求AI CoE帮助',
      technology: 'N/A',
      description:
        '您的问题是 L2/L3 复杂度，但您的资源只有 Level 1（业务/规则专家）。您的团队无法训练或运营 AI 模型。',
      details: [
        'Level 2/3 问题需要 Level 2/3 资源（公民开发者 + AutoML 或专业AI团队）',
        '您的团队只能维护业务规则，不能维护AI模型',
        '没有适当的工具和培训，AI模型开发会失败',
        '项目失败和资源浪费的风险很高',
      ],
      warning: '严重能力不匹配',
      suggestions: [
        '选项1：升级团队能力到 Level 2（获取公民开发者和 AutoML 平台访问权限）',
        '选项2：提交给 AI CoE（集团AI团队，需排队等待）',
        '选项3：简化问题范围，使用模板化提取',
      ],
      nextSteps: [
        '评估哪个选项对您的组织可行',
        '如果选择选项1，规划培训和平台设置',
        '如果选择选项2，向 AI CoE 提交需求（预计排队时间：2-4周）',
        '如果选择选项3，重新评估问题范围',
      ],
    };
  }

  // Rule 2: New Data Pattern + Level 2 + Efficiency + Data Ready
  // Recommendation: AutoML Training (matched)
  if (q3_1 === 'new_pattern' && q3_2 === 'level2' && q3_3 === 'efficiency') {
    // Check data readiness
    if (q3_4 === 'not_ready') {
      // Data not ready - should have been caught by Rule 4, but handle it here too
      return {
        type: 'warning',
        strategy: 'AutoML Training (需要数据准备)',
        technology: 'Platform AutoML / No-code Training Tools',
        description:
          '您的问题和资源完美匹配，但数据未就绪。您需要先完成数据准备工作。',
        details: [
          '您的"新数据模式"问题与 Level 2 资源完美匹配',
          '但您的数据未就绪（样本<50）',
          '必须首先进行数据收集和标注',
          '预计时间：1-3个月',
        ],
        warning: '数据准备是前提条件',
        suggestions: [
          '启动数据收集和标注项目',
          '建立数据质量验证流程',
          '准备好后重新运行此诊断',
        ],
        nextSteps: [
          '停止AI模型开发',
          '启动数据收集和治理项目',
          '预计1-3个月后重新评估',
        ],
      };
    }

    // Data is ready or partially ready
    return {
      type: 'matched',
      strategy: 'AutoML Model Training',
      technology: 'Platform AutoML / No-code Training Tools',
      description:
        '完美匹配！您的"新数据模式"问题与 Level 2 资源完美对齐。您的公民开发者可以使用 AutoML 训练自定义模型。',
      details: [
        '平台提供 AutoML 和无代码训练界面',
        '您的团队使用标注的训练数据训练模型',
        '适合特定领域的模式和自定义场景',
        '通常需要 100-1000+ 个标注样本',
        '比通用模型对您的特定用例有更好的准确性',
        '您的团队根据需要维护和重新训练模型',
      ],
      nextSteps: [
        ...(q3_4 === 'partial'
          ? [
              '数据准备：清理和标注现有数据（预计 2-4 周）',
              '收集额外的训练样本以达到 100-1000+ 个',
            ]
          : []),
        '准备和标注训练数据（100-1000+ 个样本）',
        '使用平台 AutoML 界面训练模型',
        '在测试数据上验证模型准确性',
        '部署训练的模型',
        '根据需要监控性能和重新训练',
        '进行到第3阶段：流程编排',
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

  // Rule 3: New Cognitive Task + Level 3 + Data Ready
  // Recommendation: Custom Development (matched)
  if (q3_1 === 'new_cognitive' && q3_2 === 'level3') {
    // Check data readiness
    if (q3_4 === 'not_ready') {
      // Data not ready - should have been caught by Rule 4, but handle it here too
      return {
        type: 'warning',
        strategy: '定制模型开发（需要数据准备）',
        technology: 'Professional AI/ML Team + Advanced Tools',
        description:
          '您的问题和资源完美匹配，但数据未就绪。您需要先完成数据准备工作。',
        details: [
          '您的"新认知任务"问题与 Level 3 资源完美匹配',
          '但您的数据未就绪（样本<50）',
          '必须首先进行数据收集和标注',
          '预计时间：1-3个月',
        ],
        warning: '数据准备是前提条件',
        suggestions: [
          '启动数据收集和标注项目',
          '建立数据质量验证流程',
          '准备好后重新运行此诊断',
        ],
        nextSteps: [
          '停止AI模型开发',
          '启动数据收集和治理项目',
          '预计1-3个月后重新评估',
        ],
      };
    }

    // Rule 9: Cost-benefit review for Efficiency + Level 3
    const hasCostBenefitReview = q3_3 === 'efficiency';

    return {
      type: 'matched',
      strategy: '定制模型开发' + (hasCostBenefitReview ? '（需成本效益审查）' : ''),
      technology: 'Professional AI/ML Team + Advanced Tools',
      description:
        '完美匹配！您的"新认知任务"需要 Level 3 专业知识。您的AI团队可以构建专业化解决方案。' +
        (hasCostBenefitReview
          ? '但您的需求是"提升效率"，请在项目开始前确认 TCO 和 ROI。'
          : ''),
      details: [
        '专业AI/ML团队设计和构建定制模型',
        '可能使用高级技术（VLLM、自定义算法等）',
        '通过 API 网关与平台集成',
        '最高的准确性和灵活性',
        '适合复杂的、新颖的问题',
        ...(hasCostBenefitReview
          ? [
              '注意：您的需求是"提升效率"（可容忍错误），但您将使用最昂贵的 L3 资源',
              '必须确认此投入的成本效益是否合理',
            ]
          : []),
      ],
      ...(hasCostBenefitReview
        ? {
            warning: '成本效益审查',
            suggestions: [
              '在项目开始前确认 TCO（总拥有成本）',
              '评估 ROI（投资回报率）是否合理',
              '确保此投入值得',
              '考虑是否可以使用 Level 2 AutoML 作为替代方案',
            ],
          }
        : {}),
      nextSteps: [
        ...(hasCostBenefitReview
          ? [
              '确认 TCO（总拥有成本）和 ROI（投资回报率）',
              '评估此投入是否值得',
              '与财务部门讨论预算和回报',
            ]
          : []),
        ...(q3_4 === 'partial'
          ? [
              '数据准备：清理和标注现有数据（预计 2-4 周）',
              '收集额外的训练样本',
            ]
          : []),
        '让专业AI/ML团队参与',
        '定义问题范围和成功标准',
        '开发或采购专业化模型',
        '实现与平台的 API 集成',
        '进行彻底的测试和验证',
        '部署并进行到第3阶段：流程编排',
      ],
    };
  }

  // Rule 6: New Cognitive Task + Level 2
  // Warning: Capability mismatch (L3 problem vs L2 resources)
  if (q3_1 === 'new_cognitive' && q3_2 === 'level2') {
    return {
      type: 'warning',
      strategy: '能力不匹配 - 寻求AI CoE帮助',
      technology: 'N/A',
      description:
        '您的问题是 L3"新认知任务"（如推理、生成），但您的资源是 L2 AutoML。AutoML 平台通常无法处理 L3 任务。',
      details: [
        '新认知任务需要专业的AI/ML知识',
        'Level 2 (公民开发者) 缺乏处理新问题的专业知识',
        'AutoML 平台有局限性，无法处理复杂的推理或生成任务',
        '没有专业支持，项目失败的风险很高',
      ],
      warning: '问题复杂度超过团队能力',
      suggestions: [
        '选项1：升级到 Level 3（您自己的专业AI团队）',
        '选项2：提交给 AI CoE（集团AI团队，需排队等待）',
        '选项3：简化问题范围，使其适合 Level 2 AutoML',
      ],
      nextSteps: [
        '评估哪个选项对您的组织可行',
        '如果选择选项1，让您的专业AI团队参与',
        '如果选择选项2，向 AI CoE 提交需求（预计排队时间：2-4周）',
        '如果选择选项3，重新定义问题范围',
      ],
    };
  }

  // Rule 5 (continued): New Cognitive Task + Level 1
  // Already handled above in the combined rule 5 check
  // This is just for clarity in the code structure

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

