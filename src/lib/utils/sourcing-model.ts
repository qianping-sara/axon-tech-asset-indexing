import { SourcingModelData, SourcingModelResult } from '@/lib/types/sourcing-model';

// Scoring matrix: how each criterion favors each sourcing model
// Scale: 0-5, where 5 is most favorable
const SCORING_MATRIX: Record<keyof SourcingModelData, { build: number; buy: number; openSource: number }> = {
  strategicDifferentiation: { build: 5, buy: 1, openSource: 2 },
  requirementsFit: { build: 5, buy: 4, openSource: 2 },
  timeToMarket: { build: 1, buy: 5, openSource: 4 },
  roadmapControl: { build: 5, buy: 1, openSource: 3 },
  tcoPrediability: { build: 2, buy: 5, openSource: 2 },
  internalSkillset: { build: 3, buy: 5, openSource: 4 },
  vendorLockIn: { build: 5, buy: 1, openSource: 4 },
  integrationFriendliness: { build: 3, buy: 4, openSource: 5 },
};

const WEIGHTS: Record<keyof SourcingModelData, number> = {
  strategicDifferentiation: 25,
  requirementsFit: 20,
  timeToMarket: 15,
  roadmapControl: 10,
  tcoPrediability: 10,
  internalSkillset: 10,
  vendorLockIn: 5,
  integrationFriendliness: 5,
};

export function calculateSourcingModelScores(data: SourcingModelData): SourcingModelResult {
  let buildScore = 0;
  let buyScore = 0;
  let openSourceScore = 0;
  let totalWeight = 0;

  (Object.keys(data) as Array<keyof SourcingModelData>).forEach((key) => {
    const score = data[key].score;
    if (score > 0) {
      const weight = WEIGHTS[key];
      const matrix = SCORING_MATRIX[key];

      // Calculate weighted scores based on how well each model fits the criterion
      buildScore += (matrix.build / 5) * score * weight;
      buyScore += (matrix.buy / 5) * score * weight;
      openSourceScore += (matrix.openSource / 5) * score * weight;

      totalWeight += weight;
    }
  });

  // Normalize scores
  const normalizer = totalWeight > 0 ? totalWeight : 1;
  buildScore = buildScore / normalizer;
  buyScore = buyScore / normalizer;
  openSourceScore = openSourceScore / normalizer;

  // Determine recommendation
  let recommendation: 'Build' | 'Buy' | 'Open Source' = 'Buy';
  const maxScore = Math.max(buildScore, buyScore, openSourceScore);

  if (maxScore === buildScore) {
    recommendation = 'Build';
  } else if (maxScore === buyScore) {
    recommendation = 'Buy';
  } else {
    recommendation = 'Open Source';
  }

  return {
    build: { build: buildScore, buy: 0, openSource: 0 },
    buy: { build: 0, buy: buyScore, openSource: 0 },
    openSource: { build: 0, buy: 0, openSource: openSourceScore },
    recommendation,
  };
}

export function downloadSourcingModelReport(data: SourcingModelData, result: SourcingModelResult): void {
  const headers = ['Decision Dimension', 'Weight (%)', 'Your Score (1-5)', 'Notes', 'Build Score', 'Buy Score', 'OSS Score'];

  const rows: string[][] = [];

  (Object.keys(data) as Array<keyof SourcingModelData>).forEach((key) => {
    const score = data[key].score;
    const notes = data[key].notes;
    const weight = WEIGHTS[key];
    const matrix = SCORING_MATRIX[key];

    rows.push([
      key.replace(/([A-Z])/g, ' $1').trim(),
      weight.toString(),
      score > 0 ? score.toString() : '',
      notes,
      ((matrix.build / 5) * score).toFixed(2),
      ((matrix.buy / 5) * score).toFixed(2),
      ((matrix.openSource / 5) * score).toFixed(2),
    ]);
  });

  // Add summary row
  rows.push([
    'Weighted Total Score',
    '100',
    '',
    '',
    result.build.build.toFixed(2),
    result.buy.buy.toFixed(2),
    result.openSource.openSource.toFixed(2),
  ]);

  rows.push(['Recommendation', '', '', '', result.recommendation, '', '']);

  // Convert to CSV
  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

  // Download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `sourcing-model-analysis-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

