/**
 * Process Orchestration Selector - Constants and Rule Engine
 * Defines all questions, options, and recommendation rules
 */

import {
  Question,
  ProcessOrchestrationInput,
  ProcessOrchestrationRecommendation,
} from '@/lib/types/process-orchestration';

// ============================================================================
// Question Definitions
// ============================================================================

export const PROCESS_ORCHESTRATION_QUESTIONS = {
  Q1: {
    id: 'q1',
    title: 'Process Scope Diagnosis',
    description:
      'What is the scope of this process? Are you building something new, modifying an existing process, or replacing one?',
    options: [
      {
        id: 'new',
        label: 'New Process',
        description:
          'I am building a completely new process that does not currently exist in our organization.',
        example:
          'Insurance Servicing: We are designing a new end-to-end policy lifecycle management process for our new "On-Demand Travel Insurance" business.',
      },
      {
        id: 'modify',
        label: 'Modify Existing Process',
        description:
          'I want to enhance or improve an existing process that is already running in our organization.',
        example:
          'Insurance Servicing: Our current claims approval process is slow. We want to add automation to speed it up.',
      },
      {
        id: 'replace',
        label: 'Replace Existing Process',
        description:
          'I want to replace an existing process with a new solution due to technical debt, cost, or functionality issues.',
        example:
          'Insurance Servicing: Our legacy claims system is outdated. We want to replace it with a modern solution.',
      },
    ],
  } as Question,

  Q2: {
    id: 'q2',
    title: 'Business Nature Diagnosis',
    description:
      'You have chosen to build a new process. What is the business nature of this process?',
    options: [
      {
        id: 'strategic',
        label: 'Strategic Process',
        description:
          'This is a long-term, core business process that will become a strategic asset managed and iterated over time.',
        example:
          'Insurance Servicing: We are designing a new end-to-end policy lifecycle management process for our new "On-Demand Travel Insurance" business.',
      },
      {
        id: 'tactical',
        label: 'Tactical Application',
        description:
          'This is a tactical, urgent, or temporary application that needs rapid delivery and may have a limited lifespan.',
        example:
          'Insurance Servicing: We need to quickly build a temporary simple claims registration portal for the upcoming typhoon season, to be used for only 3 months.',
      },
    ],
  } as Question,

  Q3: {
    id: 'q3',
    title: 'Integration Requirement Diagnosis',
    description:
      'Does this process need to be integrated into an existing workbench, or will it run independently?',
    options: [
      {
        id: 'integrate_to_workbench',
        label: 'Integrate to Existing Workbench',
        description:
          'I want to integrate this process capability into our existing core workbench (e.g., UAW-T1, DAE-advisor).',
        example:
          'Insurance Servicing: I want claims staff to click a button in UAW-T1 to trigger a backend "quick claim approval" workflow.',
      },
      {
        id: 'standalone',
        label: 'Standalone Application',
        description:
          'This process will run independently and does not need to be integrated into an existing workbench.',
        example:
          'Insurance Servicing: We are building a new standalone policy management portal that will be accessed directly by users.',
      },
    ],
  } as Question,

  Q3_5: {
    id: 'q3_5',
    title: 'Integration Strategy Diagnosis',
    description:
      'You have chosen to integrate into an existing workbench. What type of automation capability does this workbench need?',
    options: [
      {
        id: 'backend_engine',
        label: 'Backend Process Engine',
        description:
          'The workbench UI is fine, but the backend process it triggers is "out of control" (long cycle, cross-department, unclear status).',
        example:
          'Insurance Servicing: When claims staff click "Submit" in UAW-T1, I need a backend engine to manage the subsequent 3-day SLA and approvals across underwriting and finance, and push the "approved" status back to UAW-T1.',
      },
      {
        id: 'atomic_task',
        label: 'Atomic Task Automation',
        description:
          'The workbench needs a new "button" or "function" to automatically execute a single, repeatable task.',
        example:
          'Insurance Servicing: I need a callable "task" that automatically logs into the money system and retrieves the customer\'s payment history based on policy number.',
      },
    ],
  } as Question,

  Q4: {
    id: 'q4',
    title: 'Integration Footprint Diagnosis',
    description:
      'Now we need to understand which systems this process/task needs to interact with.',
    options: [
      {
        id: 'modern_only',
        label: 'Modern Systems Only',
        description:
          'My process only needs to call REST APIs from modern systems (e.g., CMOS/Bizagi/ServicingAPI).',
        example:
          'Insurance Servicing: My process only needs to call CMOS and Servicing APIs.',
      },
      {
        id: 'legacy_involved',
        label: 'Legacy Systems Involved',
        description:
          'I must interact with legacy systems that have no API (e.g., mainframes).',
        example:
          'Insurance Servicing: I must query customer payment history from a legacy "green-screen" mainframe terminal.',
      },
      {
        id: 'mix',
        label: 'A Mix of Both',
        description:
          'My process needs to interact with both modern systems and legacy systems.',
        example:
          'Insurance Servicing: I need to call modern APIs (CMOS, ServicingAPI) AND query legacy mainframe terminals.',
      },
    ],
  } as Question,

  Q5: {
    id: 'q5',
    title: 'Logic Complexity Diagnosis',
    description:
      'How complex is the decision logic in this process? How "smart" does it need to be?',
    options: [
      {
        id: 'standard_rules',
        label: 'Standard Business Rules',
        description:
          'The logic is configurable business rules (e.g., "if claim amount < $5000 AND product = OMP , then auto-approve").',
        example:
          'Insurance Servicing: The approval logic is simple rules like "if amount < $5000 AND product = OMP, then auto-approve".',
      },
      {
        id: 'high_performance',
        label: 'High-Performance / Algorithmic',
        description:
          'I need to call a real-time AI model and route the process based on its probability score (not simple rules).',
        example:
          'Insurance Servicing: I need to call a real-time fraud detection AI model and route the claim based on its fraud probability score.',
      },
    ],
  } as Question,

  Q6: {
    id: 'q6',
    title: 'Capability-Platform-Operations Match',
    description:
      'This is the most critical step. To build and maintain your process, you need to match "team, platform, and operations" commitment.',
    options: [
      {
        id: 'level1',
        label: 'Level 1: Business/Rule Expert',
        description:
          'We are business/policy experts. We can define rules, but we cannot code or maintain automation processes.',
        example:
          'Insurance Servicing: We are underwriting policy experts. We can define approval rules, but we cannot code or maintain automation.',
      },
      {
        id: 'level2',
        label: 'Level 2: Citizen Developer + LCAP/BPA Platform',
        description:
          'We are technical BAs who can use Power Platform or Bizagi, and we commit to iterating and maintaining the processes we build.',
        example:
          'Insurance Servicing: We are claims operations technical BAs. We can use Power Platform or Bizagi and commit to maintaining our processes.',
      },
      {
        id: 'level3',
        label: 'Level 3: Professional Development Team',
        description:
          'We are professional developers with professional platforms (Java/K8s) and professional DevOps support.',
        example:
          'Insurance Servicing: We are the core IT "Policy System" development team with Java/K8s and professional DevOps support.',
      },
      {
        id: 'none',
        label: 'No Clear Combination',
        description:
          'We do not currently have a clear "capability-platform-operations" combination.',
      },
    ],
  } as Question,
};

// ============================================================================
// Rule Engine
// ============================================================================

export function generateProcessOrchestrationRecommendation(
  input: ProcessOrchestrationInput
): ProcessOrchestrationRecommendation | null {
  // Validate input
  if (!input.q1 || !input.q6) {
    return null;
  }

  // Rule 1: Integration to Workbench + Backend Engine + Level 2 → BPA (Bizagi)
  if (
    input.q3 === 'integrate_to_workbench' &&
    input.q3_5 === 'backend_engine' &&
    input.q6 === 'level2'
  ) {
    const recommendation: ProcessOrchestrationRecommendation = {
      type: 'matched',
      strategy: 'Backend Process Engine (BPA)',
      primaryBrain: 'BPA',
      technology: 'Bizagi',
      description:
        'Your L2 team should use Bizagi as the "backend engine" to manage SLA and approvals, and push tasks back to your existing workbench (e.g., UAW-T1).',
      details: [
        'Bizagi manages backend process flow, SLA, and approvals',
        'Your existing workbench (UAW-T1) remains the UI',
        'Bidirectional integration: workbench → Bizagi → workbench',
        'Your L2 citizen developers can configure and maintain the process',
      ],
      nextSteps: [
        'Assess current workbench integration points',
        'Design backend process flow in Bizagi',
        'Configure API integration between workbench and Bizagi',
        'Test end-to-end flow',
        'Deploy and monitor',
      ],
    };

    // Apply attachment rules
    applyAttachmentRules(recommendation, input);
    return recommendation;
  }

  // Rule 2: Integration to Workbench + Atomic Task → L1 Task API
  if (
    input.q3 === 'integrate_to_workbench' &&
    input.q3_5 === 'atomic_task'
  ) {
    const recommendation: ProcessOrchestrationRecommendation = {
      type: 'matched',
      strategy: 'Atomic Task Automation (L1)',
      primaryBrain: 'L1_TASK',
      technology: 'L1 Task API',
      description:
        'Your requirement is an L1 "atomic task" (e.g., fetch payment history from legacy system). This should be built by CoE team as a reusable L1 API for your existing workbench to call.',
      details: [
        'L1 task is a single, repeatable automation',
        'CoE team builds and maintains as a generic API',
        'Your workbench calls this API when needed',
        'No custom development needed for your team',
      ],
      nextSteps: [
        'Submit L1 task requirement to CoE',
        'CoE team builds the task automation',
        'Integrate task API into your workbench',
        'Test and validate',
        'Deploy',
      ],
    };

    applyAttachmentRules(recommendation, input);
    return recommendation;
  }

  // Rule 3: New + Strategic + Standalone + Level 2 → BPA (Bizagi)
  if (
    input.q1 === 'new' &&
    input.q2 === 'strategic' &&
    input.q3 === 'standalone' &&
    input.q6 === 'level2'
  ) {
    const recommendation: ProcessOrchestrationRecommendation = {
      type: 'matched',
      strategy: 'Backend Process Architecture (BPA)',
      primaryBrain: 'BPA',
      technology: 'Bizagi',
      description:
        'Your L2 team should use Bizagi to build this new strategic core process.',
      details: [
        'Bizagi is the "brain" for strategic, long-term processes',
        'Includes built-in work portal for end users',
        'Your L2 citizen developers design and configure the process',
        'Supports complex workflows, SLA management, and reporting',
      ],
      nextSteps: [
        'Define end-to-end process flow',
        'Model process in Bizagi',
        'Configure business rules and SLA',
        'Set up work portal and user roles',
        'Test and validate',
        'Deploy and establish governance',
      ],
    };

    applyAttachmentRules(recommendation, input);
    return recommendation;
  }

  // Rule 4: New + Tactical + Standalone + Level 2 → LCAP (Power Platform)
  if (
    input.q1 === 'new' &&
    input.q2 === 'tactical' &&
    input.q3 === 'standalone' &&
    input.q6 === 'level2'
  ) {
    const recommendation: ProcessOrchestrationRecommendation = {
      type: 'matched',
      strategy: 'Low-Code Application Platform (LCAP)',
      primaryBrain: 'LCAP',
      technology: 'Power Platform',
      description:
        'Your L2 team should use Power Platform to rapidly deliver this tactical/temporary application.',
      details: [
        'Power Platform enables rapid development and deployment',
        'Suitable for tactical, time-bound applications',
        'Your L2 citizen developers can build and maintain',
        'Quick iteration and agile approach',
      ],
      governance:
        'WARNING: This is a new, decentralized application. Ensure its TCO and lifecycle have been approved by CoE.',
      nextSteps: [
        'Define application scope and timeline',
        'Design data model and UI in Power Platform',
        'Implement business logic and workflows',
        'Test with end users',
        'Deploy and plan sunset date',
      ],
    };

    applyAttachmentRules(recommendation, input);
    return recommendation;
  }

  // Rule 4.5: Modify/Replace + Integrate to Workbench + Backend Engine + Level 2 → BPA (Bizagi)
  if (
    (input.q1 === 'modify' || input.q1 === 'replace') &&
    input.q3 === 'integrate_to_workbench' &&
    input.q3_5 === 'backend_engine' &&
    input.q6 === 'level2'
  ) {
    const recommendation: ProcessOrchestrationRecommendation = {
      type: 'matched',
      strategy: 'Backend Process Engine (BPA)',
      primaryBrain: 'BPA',
      technology: 'Bizagi',
      description:
        input.q1 === 'modify'
          ? 'Your L2 team should use Bizagi to enhance the backend process and integrate with your existing workbench.'
          : 'Your L2 team should use Bizagi to replace the legacy process with a modern backend engine integrated with your existing workbench.',
      details: [
        'Bizagi manages backend process flow, SLA, and approvals',
        'Your existing workbench remains the UI',
        'Bidirectional integration: workbench → Bizagi → workbench',
        'Your L2 citizen developers can configure and maintain the process',
      ],
      nextSteps: [
        'Assess current process and integration points',
        'Design improved backend process flow in Bizagi',
        'Configure API integration between workbench and Bizagi',
        'Test end-to-end flow',
        'Deploy and monitor',
      ],
    };

    applyAttachmentRules(recommendation, input);
    return recommendation;
  }

  // Rule 4.6: Modify/Replace + Integrate to Workbench + Atomic Task → L1 Task API
  if (
    (input.q1 === 'modify' || input.q1 === 'replace') &&
    input.q3 === 'integrate_to_workbench' &&
    input.q3_5 === 'atomic_task'
  ) {
    const recommendation: ProcessOrchestrationRecommendation = {
      type: 'matched',
      strategy: 'Atomic Task Automation (L1)',
      primaryBrain: 'L1_TASK',
      technology: 'L1 Task API',
      description:
        input.q1 === 'modify'
          ? 'Your requirement is an L1 "atomic task" to enhance your existing workbench. This should be built by CoE team as a reusable L1 API.'
          : 'Your requirement is an L1 "atomic task" to replace a legacy capability. This should be built by CoE team as a reusable L1 API.',
      details: [
        'L1 task is a single, repeatable automation',
        'CoE team builds and maintains as a generic API',
        'Your workbench calls this API when needed',
        'No custom development needed for your team',
      ],
      nextSteps: [
        'Submit L1 task requirement to CoE',
        'CoE team builds the task automation',
        'Integrate task API into your workbench',
        'Test and validate',
        'Deploy',
      ],
    };

    applyAttachmentRules(recommendation, input);
    return recommendation;
  }

  // Rule 4.7: Modify/Replace + Standalone + Level 2 → BPA or LCAP
  if (
    (input.q1 === 'modify' || input.q1 === 'replace') &&
    input.q3 === 'standalone' &&
    input.q6 === 'level2'
  ) {
    const recommendation: ProcessOrchestrationRecommendation = {
      type: 'matched',
      strategy: 'Backend Process Architecture (BPA)',
      primaryBrain: 'BPA',
      technology: 'Bizagi',
      description:
        input.q1 === 'modify'
          ? 'Your L2 team should use Bizagi to enhance this standalone process.'
          : 'Your L2 team should use Bizagi to replace this legacy standalone process with a modern solution.',
      details: [
        'Bizagi is suitable for both new and replacement processes',
        'Includes built-in work portal for end users',
        'Your L2 citizen developers design and configure the process',
        'Supports complex workflows, SLA management, and reporting',
      ],
      nextSteps: [
        'Assess current process and pain points',
        'Define improved process flow',
        'Model process in Bizagi',
        'Configure business rules and SLA',
        'Set up work portal and user roles',
        'Test and validate',
        'Deploy and establish governance',
      ],
    };

    applyAttachmentRules(recommendation, input);
    return recommendation;
  }

  // Rule 5: Severe Capability Mismatch (L2 problem + L1 resources)
  if (
    ((input.q3 === 'integrate_to_workbench' && input.q3_5 === 'backend_engine') ||
      (input.q1 === 'new' && input.q2 === 'strategic') ||
      (input.q1 === 'new' && input.q2 === 'tactical') ||
      (input.q1 === 'modify' && input.q3 === 'integrate_to_workbench') ||
      (input.q1 === 'replace' && input.q3 === 'integrate_to_workbench')) &&
    input.q6 === 'level1'
  ) {
    return {
      type: 'warning',
      strategy: 'Severe Capability Mismatch - Seek CoE Help',
      description:
        'You have an L2 problem (new process/application, modification, or integration) but only L1 resources (business experts). Your team cannot build or operate this solution.',
      details: [
        'L2 problems require L2 resources (citizen developers + LCAP/BPA)',
        'Your team can only define rules, not build or maintain processes',
        'Without proper tools and training, project failure risk is high',
      ],
      warnings: ['Problem complexity exceeds team capability'],
      suggestions: [
        'Option 1: Upgrade to Level 2 (get citizen developers and LCAP/BPA platform)',
        'Option 2: Submit to CoE (or corespondent platform team, requires queuing)',
        'Option 3: Simplify problem scope to fit L1 capability',
      ],
      nextSteps: [
        'Evaluate which option is feasible for your organization',
        'If Option 1: plan training and platform setup',
        'If Option 2: submit request to CoE (estimated queue: 2-4 weeks)',
        'If Option 3: redefine problem scope',
      ],
    };
  }

  // Rule 9: Missing Operations Commitment (Q6 = 'none')
  if (input.q6 === 'none') {
    return {
      type: 'warning',
      strategy: 'Missing Operations Commitment',
      description:
        'You lack a clear "capability-platform-operations" combination. An unattended L2 application will quickly fail and become technical debt.',
      details: [
        'No clear team/platform/operations commitment',
        'Unattended applications become technical debt',
        'Requires ongoing maintenance and support',
      ],
      warnings: ['No clear team/platform/operations commitment'],
      suggestions: [
        'Ensure you can meet Level 2 commitment (citizen developers + LCAP/BPA + ongoing operations)',
        'Or ensure you can meet Level 3 commitment (professional team + professional platform)',
        'Do not proceed without clear commitment',
      ],
      nextSteps: [
        'Confirm which level (2 or 3) your organization can support',
        'Secure necessary tools and platform access',
        'Ensure team commitment and training',
        'Then re-run this assessment',
      ],
    };
  }

  // Rule 6: Over-Engineering (L1 problem + L2/L3 resources)
  if (
    input.q3 === 'integrate_to_workbench' &&
    input.q3_5 === 'atomic_task' &&
    (input.q6 === 'level2' || input.q6 === 'level3')
  ) {
    return {
      type: 'warning',
      strategy: 'Over-Engineering - Downgrade to L1',
      description:
        'Your problem is L1 "atomic task". Do not waste scarce L2/L3 resources. This should be built by CoE as a generic L1 API.',
      details: [
        'Your problem is a single, repeatable task',
        'L2/L3 resources are scarce and expensive',
        'CoE should build this as a reusable L1 API',
      ],
      suggestions: [
        'Submit this as an L1 task requirement to CoE',
        'Let CoE build it as a reusable API',
        'Your team calls the API, no custom development needed',
      ],
      nextSteps: [
        'Submit L1 task requirement to CoE',
        'CoE team builds the task automation',
        'Integrate task API into your workbench',
      ],
    };
  }

  // Rule 7: L3 Professional Development Team → Custom Solution
  if (input.q6 === 'level3') {
    const recommendation: ProcessOrchestrationRecommendation = {
      type: 'matched',
      strategy: 'Professional Development Solution (L3)',
      primaryBrain: 'L3_CUSTOM',
      technology: 'Custom Microservice / Professional Platform',
      description:
        'Your L3 professional development team should build a custom solution using professional platforms (Java/K8s, microservices, etc.).',
      details: [
        'L3 team has professional development expertise and infrastructure',
        'Can build complex, high-performance solutions',
        'Supports enterprise-grade scalability and reliability',
        'Full control over architecture and technology stack',
      ],
      nextSteps: [
        'Define detailed technical requirements',
        'Design system architecture and microservices',
        'Implement using professional platforms (Java/K8s, etc.)',
        'Set up professional DevOps and monitoring',
        'Test and validate at scale',
        'Deploy with professional SLA and support',
      ],
    };

    applyAttachmentRules(recommendation, input);
    return recommendation;
  }

  // Rule 11: L3 Logic Capability Mismatch (L3 logic + L1/L2 resources)
  if (
    input.q5 === 'high_performance' &&
    (input.q6 === 'level1' || input.q6 === 'level2')
  ) {
    return {
      type: 'warning',
      strategy: 'L3 Logic Capability Mismatch',
      description:
        'Your process needs L3 "high-performance/algorithmic" logic (e.g., fraud model), but your core team is L1/L2.',
      details: [
        'High-performance logic requires professional AI/ML expertise',
        'L1/L2 teams cannot build or maintain AI models',
        'Requires L3 professional development team',
      ],
      suggestions: [
        'You can use L2 "brain" (Bizagi/PP) for orchestration',
        'But you MUST submit the L3 logic requirement to professional L3 team',
        'Your process will call the L3 microservice',
      ],
      nextSteps: [
        'Define L3 logic requirements',
        'Submit to L3 professional development team',
        'L3 team builds the microservice',
        'Integrate microservice into your L2 process',
        'Test and deploy',
      ],
    };
  }

  return null;
}

// ============================================================================
// Helper Functions
// ============================================================================

function applyAttachmentRules(
  recommendation: ProcessOrchestrationRecommendation,
  input: ProcessOrchestrationInput
): void {
  if (!recommendation.additionalComponents) {
    recommendation.additionalComponents = [];
  }

  // Rule 5: L1 RPA (Legacy Systems)
  if (input.q4 === 'legacy_involved' || input.q4 === 'mix') {
    recommendation.additionalComponents.push('L1_RPA');
    recommendation.description +=
      '\nYour process needs to interact with legacy systems (e.g., green-screen terminals). Your L2 "brain" (Bizagi/PP) should call a generic L1 RPA robot.';
    recommendation.details?.push('L1 RPA (BluePrism) handles legacy system integration');
  }

  // Rule 6: L1 iPaaS (Modern Systems)
  if (input.q4 === 'modern_only' || input.q4 === 'mix') {
    recommendation.additionalComponents.push('L1_IPAAS');
    recommendation.description +=
      '\nYour process needs to interact with modern systems (e.g., ECCM/Servicing APIs). Your L2 "brain" (Bizagi/PP) should call a generic L1 iPaaS service.';
    recommendation.details?.push('L1 iPaaS (Gravitee) handles modern API integration');
  }

  // Rule 7: L3 Custom (High-Performance Logic)
  if (input.q5 === 'high_performance') {
    recommendation.additionalComponents.push('L3_CUSTOM');
    recommendation.description +=
      '\nYour process needs "high-performance/algorithmic" logic (e.g., fraud detection model). Your L2 "brain" (Bizagi/PP) should call a custom microservice built by L3 team.';
    recommendation.details?.push('L3 Custom Microservice handles complex logic');
  }
}

// ============================================================================
// Progress Information
// ============================================================================

export const PROCESS_ORCHESTRATION_PROGRESS = {
  stepLabels: [
    'Process Scope',
    'Business Nature',
    'Integration Requirement',
    'Integration Strategy',
    'System Interaction',
    'Logic Complexity',
    'Capability Match',
  ],
  totalSteps: 7,
  getStepNumber: (step: string): number => {
    const stepMap: Record<string, number> = {
      q1: 1,
      q2: 2,
      q3: 3,
      q3_5: 4,
      q4: 5,
      q5: 6,
      q6: 7,
      recommendation: 7,
    };
    return stepMap[step] || 1;
  },
};

