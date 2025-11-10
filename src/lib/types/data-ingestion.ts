/**
 * Data Ingestion Advisor Types (Redesigned)
 */

// Main flow steps
export type DataIngestionStep = 'q1' | 'q2' | 'q3' | 'recommendation';

// Question 1: Strategic Choice
export type Q1Answer = 'yes' | 'no';

// Question 2: Tactical Diagnosis
export type Q2Answer = 'mapping' | 'interpretation';

// Question 3.1: Problem Type Diagnosis
export type Q3_1Answer = 'common' | 'new_pattern' | 'new_cognitive';

// Question 3.2: Capability-Platform-Operations Match
export type Q3_2Answer = 'level1' | 'level2' | 'level3' | 'none';

// Question 3.3: Business Criticality
export type Q3_3Answer = 'efficiency' | 'critical';

export interface DataIngestionAnswers {
  // Step 1: Strategic Choice
  q1?: Q1Answer;

  // Step 2: Tactical Diagnosis
  q2?: Q2Answer;

  // Step 3: AI Capability & Resource Diagnosis
  q3_1?: Q3_1Answer;  // Problem type
  q3_2?: Q3_2Answer;  // Capability-Platform-Operations
  q3_3?: Q3_3Answer;  // Business criticality
}

export type RecommendationType = 'matched' | 'warning' | 'downgrade';

export interface RecommendationResult {
  type: RecommendationType;
  strategy: string;
  technology: string;
  description: string;
  details: string[];
  nextSteps?: string[];
  warning?: string;  // For warning/mismatch scenarios
  suggestions?: string[];  // For warning scenarios
}

export interface QuestionOption {
  value: string;
  label: string;
  description: string;
  examples?: string[];  // Domain-specific examples to help users understand
}

export interface Question {
  id: string;
  title: string;
  description: string;
  options: QuestionOption[];
  helpText?: string;
}

