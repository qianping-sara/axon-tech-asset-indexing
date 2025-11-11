import {
  PreliminaryEvaluationData,
  PreliminaryEvaluationResult,
  InitialAssessmentData,
  COTSEvaluationData,
  CustomDevelopmentEvaluationData,
  OSSEvaluationData,
} from '@/lib/types/preliminary-evaluation';
import {
  INITIAL_ASSESSMENT_CRITERIA_GROUPS,
  COTS_EVALUATION_CRITERIA,
  CUSTOM_DEVELOPMENT_CRITERIA,
  OSS_EVALUATION_CRITERIA,
} from '@/lib/constants/preliminary-evaluation';

export function calculateInitialAssessmentScore(data: InitialAssessmentData): number {
  let totalScore = 0;
  let totalWeight = 0;

  INITIAL_ASSESSMENT_CRITERIA_GROUPS.forEach((group) => {
    group.criteria.forEach((criteria) => {
      const score = (data[criteria.id as keyof InitialAssessmentData] as { score: number; notes: string })?.score || 0;
      if (score > 0) {
        totalScore += (score / 5) * criteria.weight;
        totalWeight += criteria.weight;
      }
    });
  });

  return totalWeight > 0 ? totalScore / totalWeight : 0;
}

export function calculateSourcingModelScore(
  data: COTSEvaluationData | CustomDevelopmentEvaluationData | OSSEvaluationData,
  criteria: typeof COTS_EVALUATION_CRITERIA | typeof CUSTOM_DEVELOPMENT_CRITERIA | typeof OSS_EVALUATION_CRITERIA
): number {
  let totalScore = 0;
  let totalWeight = 0;

  criteria.forEach((crit) => {
    const criteriaData = (data as unknown) as Record<string, { score: number; notes: string }>;
    const score = criteriaData[crit.id]?.score || 0;
    if (score > 0) {
      totalScore += (score / 5) * crit.weight;
      totalWeight += crit.weight;
    }
  });

  return totalWeight > 0 ? totalScore / totalWeight : 0;
}

export function calculatePreliminaryEvaluationResult(
  data: PreliminaryEvaluationData,
  selectedModel: 'buy' | 'build' | 'openSource'
): PreliminaryEvaluationResult {
  const initialScore = calculateInitialAssessmentScore(data.initialAssessment);

  let sourcingModelScore = 0;
  if (selectedModel === 'buy') {
    sourcingModelScore = calculateSourcingModelScore(
      data.sourcingModelSpecific.buy,
      COTS_EVALUATION_CRITERIA
    );
  } else if (selectedModel === 'build') {
    sourcingModelScore = calculateSourcingModelScore(
      data.sourcingModelSpecific.build,
      CUSTOM_DEVELOPMENT_CRITERIA
    );
  } else {
    sourcingModelScore = calculateSourcingModelScore(
      data.sourcingModelSpecific.openSource,
      OSS_EVALUATION_CRITERIA
    );
  }

  // Weighted average: 40% initial assessment, 60% sourcing model specific
  const totalScore = initialScore * 0.4 + sourcingModelScore * 0.6;
  const percentage = totalScore * 100;

  let recommendation: 'Proceed' | 'Review' | 'Reject' = 'Review';
  if (percentage >= 75) {
    recommendation = 'Proceed';
  } else if (percentage < 50) {
    recommendation = 'Reject';
  }

  return {
    initialAssessmentScore: initialScore * 100,
    sourcingModelScore: sourcingModelScore * 100,
    totalScore: totalScore * 100,
    percentage,
    recommendation,
  };
}

export function downloadPreliminaryEvaluationReport(
  data: PreliminaryEvaluationData,
  result: PreliminaryEvaluationResult,
  selectedModel: 'buy' | 'build' | 'openSource'
): void {
  const headers = [
    'Evaluation Section',
    'Dimension',
    'Weight (%)',
    'Your Score (1-5)',
    'Notes',
    'Weighted Score',
  ];

  const rows: string[][] = [];

  // Part 1: Initial Assessment
  rows.push(['PART 1: INITIAL ASSESSMENT', '', '', '', '', '']);
  INITIAL_ASSESSMENT_CRITERIA_GROUPS.forEach((group) => {
    rows.push([group.title, '', group.totalWeight.toString(), '', '', '']);
    group.criteria.forEach((criteria) => {
      const score = ((data.initialAssessment as unknown) as Record<string, { score: number; notes: string }>)[criteria.id]?.score || 0;
      const notes = ((data.initialAssessment as unknown) as Record<string, { score: number; notes: string }>)[criteria.id]?.notes || '';
      rows.push([
        '',
        criteria.title,
        criteria.weight.toString(),
        score > 0 ? score.toString() : '',
        notes,
        score > 0 ? ((score / 5) * criteria.weight).toFixed(2) : '',
      ]);
    });
  });
  rows.push(['', 'Initial Assessment Score', '', '', '', result.initialAssessmentScore.toFixed(2)]);

  // Part 2: Sourcing Model Specific
  rows.push(['', '', '', '', '', '']);
  rows.push(['PART 2: SOURCING MODEL SPECIFIC', '', '', '', '', '']);

  let modelCriteria: typeof COTS_EVALUATION_CRITERIA = COTS_EVALUATION_CRITERIA;
  let modelData: Record<string, { score: number; notes: string }> = (data.sourcingModelSpecific.buy as unknown) as Record<string, { score: number; notes: string }>;
  let modelName = 'COTS (Buy)';

  if (selectedModel === 'build') {
    modelCriteria = CUSTOM_DEVELOPMENT_CRITERIA;
    modelData = (data.sourcingModelSpecific.build as unknown) as Record<string, { score: number; notes: string }>;
    modelName = 'Custom Development (Build)';
  } else if (selectedModel === 'openSource') {
    modelCriteria = OSS_EVALUATION_CRITERIA;
    modelData = (data.sourcingModelSpecific.openSource as unknown) as Record<string, { score: number; notes: string }>;
    modelName = 'Open Source Software (OSS)';
  }

  rows.push([modelName, '', '', '', '', '']);
  modelCriteria.forEach((criteria) => {
    const score = modelData[criteria.id]?.score || 0;
    const notes = modelData[criteria.id]?.notes || '';
    rows.push([
      '',
      criteria.title,
      criteria.weight.toString(),
      score > 0 ? score.toString() : '',
      notes,
      score > 0 ? ((score / 5) * criteria.weight).toFixed(2) : '',
    ]);
  });
  rows.push(['', 'Sourcing Model Score', '', '', '', result.sourcingModelScore.toFixed(2)]);

  // Summary
  rows.push(['', '', '', '', '', '']);
  rows.push(['SUMMARY', '', '', '', '', '']);
  rows.push(['Total Score', '', '', '', '', result.totalScore.toFixed(2)]);
  rows.push(['Percentage', '', '', '', '', result.percentage.toFixed(2) + '%']);
  rows.push(['Recommendation', '', '', '', '', result.recommendation]);

  // Convert to CSV
  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

  // Download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `preliminary-evaluation-${selectedModel}-${new Date().toISOString().split('T')[0]}.csv`
  );
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

