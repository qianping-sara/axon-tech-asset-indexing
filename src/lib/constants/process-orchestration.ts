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
    title: 'Strategic Intent Diagnosis',
    description:
      'What is the strategic intent of this new process? Our core principle is "Prioritize Integration, Eliminate Fragmentation".',
    options: [
      {
        id: 'integrate',
        label: 'Integrate Capability',
        description:
          'I want to integrate this process capability into our existing core workbench (e.g., UAW-T1, DAE-advisor).',
        example:
          'Insurance Servicing: I want claims staff to click a button in UAW-T1 to trigger a backend "quick claim approval" workflow.',
      },
      {
        id: 'new_strategic',
        label: 'New Strategic Process',
        description:
          'This is a new, long-term, core business process that currently has no suitable workbench and will become a strategic asset managed and iterated over time.',
        example:
          'Insurance Servicing: We are designing a new end-to-end policy lifecycle management process for our new "On-Demand Travel Insurance" business.',
      },
      {
        id: 'new_tactical',
        label: 'New Tactical Application',
        description:
          'This is a tactical, urgent, or temporary application that is not within the scope of core workbenches and needs rapid delivery.',
        example:
          'Insurance Servicing: We need to quickly build a temporary simple claims registration portal for the upcoming typhoon season, to be used for only 3 months.',
      },
    ],
  } as Question,

  Q2: {
    id: 'q2',
    title: 'Integration Strategy Diagnosis',
    description:
      'You have chosen "Integrate". What type of automation capability does this existing workbench need?',
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
      {
        id: 'workbench_enhancement',
        label: 'Workbench Enhancement',
        description:
          'I need the workbench itself to be enhanced, not a backend process or atomic task.',
        example:
          'Insurance Servicing: I need to add a new "Customer Claim History" tab to the main screen of UAW-T1, which requires the UAW-T1 team to develop.',
      },
    ],
  } as Question,

  Q3: {
    id: 'q3',
    title: 'New Path Confirmation',
    description:
      'You have chosen a new path. Please confirm your choice and we will guide you through the appropriate diagnostic steps.',
    options: [
      {
        id: 'confirmed',
        label: 'Confirmed',
        description: 'I confirm my choice and want to proceed with the diagnosis.',
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

  // Rule 0: Workbench Enhancement - Exit
  if (input.q2 === 'workbench_enhancement') {
    return {
      type: 'redirect',
      strategy: 'Redirect to Core System Team',
      description:
        'Your requirement is "workbench enhancement", which is outside the scope of Automation CoE. Please contact the responsible team for that core workbench.',
      details: [
        'Workbench enhancements are managed by the core system team',
        'Submit your enhancement request through their process',
        'This is not an automation CoE responsibility',
      ],
      nextSteps: [
        'Contact the core workbench team',
        'Submit enhancement request through their process',
      ],
    };
  }

  // Rule 1: BPA Integration Path (Integrate + Backend Engine + Level 2)
  if (
    input.q1 === 'integrate' &&
    input.q2 === 'backend_engine' &&
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

  // Rule 2: LCAP New Tactical Path (New Tactical + Level 2)
  if (input.q1 === 'new_tactical' && input.q6 === 'level2') {
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

  // Rule 3: BPA New Strategic Path (New Strategic + Level 2)
  if (input.q1 === 'new_strategic' && input.q6 === 'level2') {
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

  // Rule 4: L1 Atomic Task (Integrate + Atomic Task)
  if (input.q1 === 'integrate' && input.q2 === 'atomic_task') {
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

  // Rule 8: Severe Capability Mismatch (L2 problem + L1 resources)
  if (
    ((input.q1 === 'integrate' && input.q2 === 'backend_engine') ||
      input.q1 === 'new_strategic' ||
      input.q1 === 'new_tactical') &&
    input.q6 === 'level1'
  ) {
    return {
      type: 'warning',
      strategy: 'Severe Capability Mismatch - Seek CoE Help',
      description:
        'You have an L2 problem (new process/application) but only L1 resources (business experts). Your team cannot build or operate this solution.',
      details: [
        'L2 problems require L2 resources (citizen developers + LCAP/BPA)',
        'Your team can only define rules, not build or maintain processes',
        'Without proper tools and training, project failure risk is high',
      ],
      warnings: ['Problem complexity exceeds team capability'],
      suggestions: [
        'Option 1: Upgrade to Level 2 (get citizen developers and LCAP/BPA platform)',
        'Option 2: Submit to CoE (corporate AI team, requires queuing)',
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

  // Rule 10: Over-Engineering (L1 problem + L2/L3 resources)
  if (
    input.q1 === 'integrate' &&
    input.q2 === 'atomic_task' &&
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
      '\nYour process needs to interact with modern systems (e.g., OCS/BarCIS APIs). Your L2 "brain" (Bizagi/PP) should call a generic L1 iPaaS service.';
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
    'Strategic Intent',
    'Integration Strategy',
    'Confirmation',
    'Integration Footprint',
    'Logic Complexity',
    'Capability Match',
  ],
  totalSteps: 6,
  getStepNumber: (step: string): number => {
    const stepMap: Record<string, number> = {
      q1: 1,
      q2: 2,
      q3: 3,
      q4: 4,
      q5: 5,
      q6: 6,
      recommendation: 6,
    };
    return stepMap[step] || 1;
  },
};

