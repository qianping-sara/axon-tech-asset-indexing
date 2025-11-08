import { CriteriaData, EvaluationResult } from '@/lib/types/business-case';
import { BUSINESS_CASE_CRITERIA } from '@/lib/constants/business-case';

export function calculateEvaluationResult(criteriaData: CriteriaData): EvaluationResult {
  let totalScore = 0;
  let maxScore = 0;

  const details: EvaluationResult['details'] = {} as EvaluationResult['details'];

  BUSINESS_CASE_CRITERIA.forEach((criteria) => {
    const data = criteriaData[criteria.id];
    const weight = criteria.weight;
    const score = data.score;

    const weightedScore = (score / 5) * weight;
    totalScore += weightedScore;
    maxScore += weight;

    details[criteria.id] = {
      title: criteria.title,
      weight,
      score,
      weightedScore,
      notes: data.notes,
    };
  });

  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  return {
    totalScore,
    maxScore,
    percentage,
    details,
  };
}

export function generateReportJSON(criteriaData: CriteriaData): string {
  const result = calculateEvaluationResult(criteriaData);
  const timestamp = new Date().toISOString();

  const report = {
    timestamp,
    evaluation: {
      totalScore: result.totalScore.toFixed(2),
      maxScore: result.maxScore,
      percentage: result.percentage.toFixed(2),
    },
    criteria: result.details,
  };

  return JSON.stringify(report, null, 2);
}

export function downloadReport(criteriaData: CriteriaData, format: 'json' | 'csv' = 'json') {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `business-case-evaluation-${timestamp}`;

  if (format === 'json') {
    const jsonContent = generateReportJSON(criteriaData);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else if (format === 'csv') {
    const result = calculateEvaluationResult(criteriaData);
    let csv = 'Business Case Evaluation Report\n';
    csv += `Generated: ${new Date().toISOString()}\n\n`;
    csv += `Total Score,${result.totalScore.toFixed(2)}\n`;
    csv += `Max Score,${result.maxScore}\n`;
    csv += `Percentage,${result.percentage.toFixed(2)}%\n\n`;
    csv += 'Criteria,Weight,Score,Weighted Score,Notes\n';

    Object.values(result.details).forEach((detail) => {
      const notes = detail.notes.replace(/"/g, '""');
      csv += `"${detail.title}",${detail.weight}%,${detail.score}/5,${detail.weightedScore.toFixed(2)},"${notes}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

