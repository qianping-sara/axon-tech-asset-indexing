/**
 * Process Orchestration Selector - Type Definitions
 * Defines all types for the process orchestration diagnostic tool
 */

// ============================================================================
// Question Answers
// ============================================================================

/** Q1: Process Scope - What is the scope of this process? */
export type Q1Answer = 'new' | 'modify' | 'replace';

/** Q2: Business Nature - Only shown when Q1='new' */
export type Q2Answer = 'strategic' | 'tactical';

/** Q3: Integration Requirement - Shown for all processes */
export type Q3Answer = 'integrate_to_workbench' | 'standalone';

/** Q3.5: Integration Strategy - Only shown when Q3='integrate_to_workbench' */
export type Q3_5Answer = 'backend_engine' | 'atomic_task';

/** Q4: Integration Footprint - What systems does it need to interact with? */
export type Q4Answer = 'modern_only' | 'legacy_involved' | 'mix';

/** Q5: Logic Complexity - How complex is the decision logic? */
export type Q5Answer = 'standard_rules' | 'high_performance';

/** Q6: Capability Match - What is your team's capability level? */
export type Q6Answer = 'level1' | 'level2' | 'level3' | 'none';

// ============================================================================
// Recommendation Types
// ============================================================================

/** Type of recommendation result */
export type RecommendationType = 'matched' | 'warning' | 'blocked' | 'redirect';

/** Primary brain/platform for the solution */
export type PrimaryBrain = 'BPA' | 'LCAP' | 'L1_TASK' | 'NONE';

/** Additional components that may be needed */
export type AdditionalComponent = 'L1_RPA' | 'L1_IPAAS' | 'L3_CUSTOM';

// ============================================================================
// Main Recommendation Result
// ============================================================================

export interface ProcessOrchestrationRecommendation {
  /** Type of recommendation: matched, warning, blocked, or redirect */
  type: RecommendationType;

  /** Strategy name/title */
  strategy: string;

  /** Primary brain/platform (BPA, LCAP, L1 Task, etc.) */
  primaryBrain?: PrimaryBrain;

  /** Additional components needed (L1 RPA, L1 iPaaS, L3 Custom, etc.) */
  additionalComponents?: AdditionalComponent[];

  /** Technology stack description */
  technology?: string;

  /** Main description of the recommendation */
  description: string;

  /** Detailed points about the recommendation */
  details: string[];

  /** Warning messages (if type='warning') */
  warnings?: string[];

  /** Suggestions for the user */
  suggestions?: string[];

  /** Next steps to take */
  nextSteps: string[];

  /** Governance or compliance notes */
  governance?: string;
}

// ============================================================================
// Rule Engine Input
// ============================================================================

export interface ProcessOrchestrationInput {
  q1: Q1Answer;
  q2?: Q2Answer;
  q3?: Q3Answer;
  q3_5?: Q3_5Answer;
  q4?: Q4Answer;
  q5?: Q5Answer;
  q6?: Q6Answer;
}

// ============================================================================
// Component State
// ============================================================================

export interface ProcessOrchestrationState {
  /** Current step (1-7, including Q3.5) */
  currentStep: 1 | 2 | 3 | 3.5 | 4 | 5 | 6 | 7;

  /** User's answers to all questions */
  answers: Partial<ProcessOrchestrationInput>;

  /** Generated recommendation result */
  recommendation: ProcessOrchestrationRecommendation | null;

  /** Loading state */
  isLoading: boolean;

  /** Error message if any */
  error: string | null;
}

// ============================================================================
// Question Option Definition
// ============================================================================

export interface QuestionOption {
  id: string;
  label: string;
  description: string;
  example?: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  options: QuestionOption[];
}

// ============================================================================
// Form Props
// ============================================================================

export interface FormProps {
  onNext: (answer: Partial<ProcessOrchestrationInput>) => void;
  onPrevious?: () => void;
  currentAnswer?: string;
}

export interface ResultCardProps {
  recommendation: ProcessOrchestrationRecommendation;
  onRestart: () => void;
  onExport?: (format: 'pdf' | 'json') => void;
}

