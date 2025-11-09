/**
 * Data Ingestion Selector Types
 */

export type DataIngestionStep = 'q1.1' | 'q1.2' | 'q1.3a' | 'q1.3b' | 'q1.3c' | 'q1.3d' | 'result';

export type Q1_1Answer = 'yes' | 'no';
export type Q1_2Answer = 'structured' | 'unstructured';
export type Q1_3aAnswer = 'yes' | 'no';
export type Q1_3bAnswer = 'yes' | 'no';
export type Q1_3cAnswer = 'config' | 'training' | 'specialized';
export type Q1_3dAnswer = 'yes' | 'no';

export interface DataIngestionAnswers {
  q1_1?: Q1_1Answer;
  q1_2?: Q1_2Answer;
  q1_3a?: Q1_3aAnswer;
  q1_3b?: Q1_3bAnswer;
  q1_3c?: Q1_3cAnswer;
  q1_3d?: Q1_3dAnswer;
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

