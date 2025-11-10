/**
 * Data Ingestion Advisor Utilities (Redesigned)
 */

import { DataIngestionStep, DataIngestionAnswers } from '@/lib/types/data-ingestion';
import { QUESTION_Q1, QUESTION_Q2, QUESTION_Q3_1, QUESTION_Q3_2, QUESTION_Q3_3 } from '@/lib/constants/data-ingestion';

/**
 * Determine the next step based on current answers
 */
export function getNextStep(answers: DataIngestionAnswers): DataIngestionStep {
  // Step 1: Strategic Choice
  if (!answers.q1) {
    return 'q1';
  }

  // If Q1 = 'yes' (can modify source), go to recommendation
  if (answers.q1 === 'yes') {
    return 'recommendation';
  }

  // Step 2: Tactical Diagnosis
  if (!answers.q2) {
    return 'q2';
  }

  // If Q2 = 'mapping' (structured data), go to recommendation
  if (answers.q2 === 'mapping') {
    return 'recommendation';
  }

  // Step 3: AI Capability & Resource Diagnosis (only if Q2 = 'interpretation')
  if (!answers.q3_1 || !answers.q3_2 || !answers.q3_3) {
    return 'q3';
  }

  // All answers collected, go to recommendation
  return 'recommendation';
}

/**
 * Get the current question based on step
 */
export function getCurrentQuestion(step: DataIngestionStep) {
  switch (step) {
    case 'q1':
      return QUESTION_Q1;
    case 'q2':
      return QUESTION_Q2;
    case 'q3':
      // Q3 is a multi-part form, return null here
      // The Q3DiagnosisForm component will handle all three sub-questions
      return null;
    default:
      return null;
  }
}

/**
 * Calculate progress percentage and get step info
 */
export function getProgressInfo(step: DataIngestionStep): { percentage: number; stepNumber: number; totalSteps: number } {
  const stepMap: Record<DataIngestionStep, { percentage: number; stepNumber: number }> = {
    'q1': { percentage: 33, stepNumber: 1 },
    'q2': { percentage: 66, stepNumber: 2 },
    'q3': { percentage: 100, stepNumber: 3 },
    'recommendation': { percentage: 100, stepNumber: 3 },
  };

  const info = stepMap[step] || { percentage: 0, stepNumber: 0 };
  return {
    percentage: info.percentage,
    stepNumber: info.stepNumber,
    totalSteps: 3,
  };
}

/**
 * Generate summary of answers for display
 */
export function generateAnswersSummary(answers: DataIngestionAnswers): string[] {
  const summary: string[] = [];

  if (answers.q1) {
    const q1Label = answers.q1 === 'yes' ? 'Can modify source' : 'Must accept as-is';
    summary.push(`Q1 Strategic Choice: ${q1Label}`);
  }

  if (answers.q2) {
    const q2Label = answers.q2 === 'mapping' ? 'Mapping (Structured)' : 'Interpretation (Unstructured)';
    summary.push(`Q2 Tactical Diagnosis: ${q2Label}`);
  }

  if (answers.q3_1) {
    const q3_1Map: Record<string, string> = {
      common: 'Common Task',
      new_pattern: 'New Data Pattern',
      new_cognitive: 'New Cognitive Task',
    };
    summary.push(`Q3.1 Problem Type: ${q3_1Map[answers.q3_1]}`);
  }

  if (answers.q3_2) {
    const q3_2Map: Record<string, string> = {
      level1: 'Level 1: Business/Rule Expert',
      level2: 'Level 2: Citizen Developer + AutoML',
      level3: 'Level 3: Professional AI Team',
      none: 'No clear capability',
    };
    summary.push(`Q3.2 Capability Match: ${q3_2Map[answers.q3_2]}`);
  }

  if (answers.q3_3) {
    const q3_3Label = answers.q3_3 === 'efficiency' ? 'Efficiency Gain' : 'Business Critical';
    summary.push(`Q3.3 Business Criticality: ${q3_3Label}`);
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

  lines.push('=== YOUR ANSWERS ===');
  lines.push('');

  // Q1: Strategic Choice
  if (answers.q1) {
    const q1Label = answers.q1 === 'yes' ? 'Can modify source' : 'Must accept as-is';
    lines.push(`Q1 - Strategic Choice: ${q1Label}`);
  }

  // Q2: Tactical Diagnosis
  if (answers.q2) {
    const q2Label = answers.q2 === 'mapping' ? 'Mapping (Structured Data)' : 'Interpretation (Unstructured Data)';
    lines.push(`Q2 - Tactical Diagnosis: ${q2Label}`);
  }

  // Q3: AI Capability & Resource Diagnosis
  if (answers.q3_1) {
    const q3_1Map: Record<string, string> = {
      common: 'Common Task',
      new_pattern: 'New Data Pattern',
      new_cognitive: 'New Cognitive Task',
    };
    lines.push(`Q3.1 - Problem Type: ${q3_1Map[answers.q3_1]}`);
  }

  if (answers.q3_2) {
    const q3_2Map: Record<string, string> = {
      level1: 'Level 1: Business/Rule Expert',
      level2: 'Level 2: Citizen Developer + AutoML',
      level3: 'Level 3: Professional AI Team',
      none: 'No clear capability',
    };
    lines.push(`Q3.2 - Capability Match: ${q3_2Map[answers.q3_2]}`);
  }

  if (answers.q3_3) {
    const q3_3Label = answers.q3_3 === 'efficiency' ? 'Efficiency Gain' : 'Business Critical';
    lines.push(`Q3.3 - Business Criticality: ${q3_3Label}`);
  }

  if (answers.q3_4) {
    const q3_4Map: Record<string, string> = {
      ready: 'Data Ready (>100 samples)',
      partial: 'Partial (50-100 samples)',
      not_ready: 'Not Ready (<50 samples)',
    };
    lines.push(`Q3.4 - Data Readiness: ${q3_4Map[answers.q3_4]}`);
  }

  lines.push('');
  lines.push('=== RECOMMENDATION ===');
  lines.push('');
  lines.push(`Strategy: ${recommendation.strategy}`);
  lines.push(`Technology: ${recommendation.technology}`);
  lines.push('');
  lines.push('Description:');
  lines.push(recommendation.description);
  lines.push('');

  if (recommendation.details && recommendation.details.length > 0) {
    lines.push('Key Points:');
    recommendation.details.forEach((detail: string) => lines.push(`• ${detail}`));
    lines.push('');
  }

  if (recommendation.warning) {
    lines.push('Warnings:');
    lines.push(`⚠️ ${recommendation.warning}`);
    lines.push('');
  }

  if (recommendation.suggestions && recommendation.suggestions.length > 0) {
    lines.push('Suggestions:');
    recommendation.suggestions.forEach((suggestion: string) => lines.push(`→ ${suggestion}`));
    lines.push('');
  }

  if (recommendation.nextSteps && recommendation.nextSteps.length > 0) {
    lines.push('Next Steps:');
    recommendation.nextSteps.forEach((step: string, index: number) => lines.push(`${index + 1}. ${step}`));
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

