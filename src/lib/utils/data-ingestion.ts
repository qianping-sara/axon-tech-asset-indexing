/**
 * Data Ingestion Selector Utilities
 */

import { DataIngestionStep, DataIngestionAnswers } from '@/lib/types/data-ingestion';
import { QUESTION_Q1_1, QUESTION_Q1_2, QUESTION_Q1_3, getRecommendation } from '@/lib/constants/data-ingestion';

/**
 * Determine the next step based on current answers
 */
export function getNextStep(answers: DataIngestionAnswers): DataIngestionStep {
  // If Q1.1 is answered
  if (answers.q1_1) {
    if (answers.q1_1 === 'yes') {
      // Shift-Left strategy - go to result
      return 'result';
    }
    // If Q1.1 is 'no', continue to Q1.2
    if (answers.q1_2) {
      if (answers.q1_2 === 'structured') {
        // Template-based extraction - go to result
        return 'result';
      }
      // If Q1.2 is 'unstructured', continue to Q1.3
      if (answers.q1_3) {
        // Q1.3 answered - go to result
        return 'result';
      }
      // Q1.3 not answered yet
      return 'q1.3';
    }
    // Q1.2 not answered yet
    return 'q1.2';
  }

  // Q1.1 not answered yet
  return 'q1.1';
}

/**
 * Get the current question based on step
 */
export function getCurrentQuestion(step: DataIngestionStep) {
  switch (step) {
    case 'q1.1':
      return QUESTION_Q1_1;
    case 'q1.2':
      return QUESTION_Q1_2;
    case 'q1.3':
      return QUESTION_Q1_3;
    default:
      return null;
  }
}

/**
 * Calculate progress percentage
 */
export function getProgressPercentage(step: DataIngestionStep): number {
  switch (step) {
    case 'q1.1':
      return 25;
    case 'q1.2':
      return 50;
    case 'q1.3':
      return 75;
    case 'result':
      return 100;
    default:
      return 0;
  }
}

/**
 * Generate summary of answers for display
 */
export function generateAnswersSummary(answers: DataIngestionAnswers): string[] {
  const summary: string[] = [];

  if (answers.q1_1) {
    const q1_1Label = answers.q1_1 === 'yes' ? 'Yes' : 'No';
    summary.push(`Q1.1 Strategic Choice: ${q1_1Label}`);
  }

  if (answers.q1_2) {
    const q1_2Label = answers.q1_2 === 'structured' ? 'Structured Data' : 'Unstructured Data';
    summary.push(`Q1.2 Data Characteristics: ${q1_2Label}`);
  }

  if (answers.q1_3) {
    const q1_3Map: Record<string, string> = {
      level1: 'Level 1: Common Scenario',
      level2: 'Level 2: Differentiated Scenario',
      level3: 'Level 3: Highly Specific Scenario',
    };
    summary.push(`Q1.3 AI Capability: ${q1_3Map[answers.q1_3]}`);
  }

  return summary;
}

/**
 * Export recommendation as CSV
 */
export function exportRecommendationAsCSV(
  answers: DataIngestionAnswers,
  recommendation: any
): string {
  const lines: string[] = [];

  lines.push('Data Ingestion Assessment Report');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');

  lines.push('Answers:');
  const summary = generateAnswersSummary(answers);
  summary.forEach((s) => lines.push(s));
  lines.push('');

  lines.push('Recommendation:');
  lines.push(`Strategy: ${recommendation.strategy}`);
  lines.push(`Technology: ${recommendation.technology}`);
  lines.push(`Description: ${recommendation.description}`);
  lines.push('');

  lines.push('Details:');
  recommendation.details.forEach((detail: string) => lines.push(`- ${detail}`));
  lines.push('');

  if (recommendation.nextSteps) {
    lines.push('Next Steps:');
    recommendation.nextSteps.forEach((step: string) => lines.push(`- ${step}`));
  }

  return lines.join('\n');
}

/**
 * Download recommendation as file
 */
export function downloadRecommendation(
  answers: DataIngestionAnswers,
  recommendation: any
): void {
  const csv = exportRecommendationAsCSV(answers, recommendation);
  const blob = new Blob([csv], { type: 'text/plain;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `data-ingestion-assessment-${new Date().toISOString().split('T')[0]}.txt`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

