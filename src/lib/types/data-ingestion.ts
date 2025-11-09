/**
 * Data Ingestion Selector Types
 */

export type DataIngestionStep = 'q1.1' | 'q1.2' | 'q1.3' | 'result';

export type Q1_1Answer = 'yes' | 'no';
export type Q1_2Answer = 'structured' | 'unstructured';
export type Q1_3Answer = 'level1' | 'level2' | 'level3';

export interface DataIngestionAnswers {
  q1_1?: Q1_1Answer;
  q1_2?: Q1_2Answer;
  q1_3?: Q1_3Answer;
}

export interface RecommendationResult {
  strategy: string;
  technology: string;
  description: string;
  details: string[];
  nextSteps?: string[];
}

export interface QuestionOption {
  value: string;
  label: string;
  description: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  options: QuestionOption[];
  helpText?: string;
}

