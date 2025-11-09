/**
 * Data Ingestion Selector Utilities
 */

import { DataIngestionStep, DataIngestionAnswers } from '@/lib/types/data-ingestion';
import { QUESTION_Q1_1, QUESTION_Q1_2, QUESTION_Q1_3a, QUESTION_Q1_3b, QUESTION_Q1_3c, QUESTION_Q1_3d } from '@/lib/constants/data-ingestion';

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
      // If Q1.2 is 'unstructured', continue to Q1.3a
      if (answers.q1_3a) {
        if (answers.q1_3a === 'yes') {
          // Has existing capability - check precision (Q1.3b)
          if (answers.q1_3b) {
            if (answers.q1_3b === 'yes') {
              // Precision is acceptable - go to result
              return 'result';
            }
            // Precision not acceptable - continue to Q1.3c
            if (answers.q1_3c) {
              if (answers.q1_3c === 'training') {
                // Training approach - check data & tools (Q1.3d)
                if (answers.q1_3d) {
                  // Q1.3d answered - go to result
                  return 'result';
                }
                // Q1.3d not answered yet
                return 'q1.3d';
              }
              // Config or specialized - go to result
              return 'result';
            }
            // Q1.3c not answered yet
            return 'q1.3c';
          }
          // Q1.3b not answered yet
          return 'q1.3b';
        }
        // No existing capability - continue to Q1.3c
        if (answers.q1_3c) {
          if (answers.q1_3c === 'training') {
            // Training approach - check data & tools (Q1.3d)
            if (answers.q1_3d) {
              // Q1.3d answered - go to result
              return 'result';
            }
            // Q1.3d not answered yet
            return 'q1.3d';
          }
          // Config or specialized - go to result
          return 'result';
        }
        // Q1.3c not answered yet
        return 'q1.3c';
      }
      // Q1.3a not answered yet
      return 'q1.3a';
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
    case 'q1.3a':
      return QUESTION_Q1_3a;
    case 'q1.3b':
      return QUESTION_Q1_3b;
    case 'q1.3c':
      return QUESTION_Q1_3c;
    case 'q1.3d':
      return QUESTION_Q1_3d;
    default:
      return null;
  }
}

/**
 * Calculate progress percentage and get step info
 */
export function getProgressInfo(step: DataIngestionStep): { percentage: number; stepNumber: number; totalSteps: number } {
  const stepMap: Record<DataIngestionStep, { percentage: number; stepNumber: number }> = {
    'q1.1': { percentage: 20, stepNumber: 1 },
    'q1.2': { percentage: 40, stepNumber: 2 },
    'q1.3a': { percentage: 50, stepNumber: 3 },
    'q1.3b': { percentage: 60, stepNumber: 3 },
    'q1.3c': { percentage: 70, stepNumber: 3 },
    'q1.3d': { percentage: 80, stepNumber: 3 },
    'result': { percentage: 100, stepNumber: 4 },
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

  if (answers.q1_1) {
    const q1_1Label = answers.q1_1 === 'yes' ? 'Yes' : 'No';
    summary.push(`Q1.1 Strategic Choice: ${q1_1Label}`);
  }

  if (answers.q1_2) {
    const q1_2Label = answers.q1_2 === 'structured' ? 'Structured Data' : 'Unstructured Data';
    summary.push(`Q1.2 Data Characteristics: ${q1_2Label}`);
  }

  if (answers.q1_3a) {
    const q1_3aLabel = answers.q1_3a === 'yes' ? 'Yes' : 'No';
    summary.push(`Q1.3a Reusable Capability: ${q1_3aLabel}`);
  }

  if (answers.q1_3b) {
    const q1_3bLabel = answers.q1_3b === 'yes' ? 'Acceptable' : 'Needs Improvement';
    summary.push(`Q1.3b Precision Check: ${q1_3bLabel}`);
  }

  if (answers.q1_3c) {
    const q1_3cMap: Record<string, string> = {
      config: 'Simple Configuration',
      training: 'Model Training',
      specialized: 'Specialized Development',
    };
    summary.push(`Q1.3c Build/Improve: ${q1_3cMap[answers.q1_3c]}`);
  }

  if (answers.q1_3d) {
    const q1_3dLabel = answers.q1_3d === 'yes' ? 'Yes' : 'No';
    summary.push(`Q1.3d Data & Tools: ${q1_3dLabel}`);
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

