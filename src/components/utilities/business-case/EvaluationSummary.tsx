'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { CriteriaData } from '@/lib/types/business-case';
import { calculateEvaluationResult, downloadReport } from '@/lib/utils/business-case';

interface EvaluationSummaryProps {
  criteriaData: CriteriaData;
}

export default function EvaluationSummary({ criteriaData }: EvaluationSummaryProps) {
  const result = calculateEvaluationResult(criteriaData);
  const hasScores = Object.values(criteriaData).some((c) => c.score > 0);

  // Only render if there are scores
  if (!hasScores) {
    return null;
  }

  const getRecommendation = (percentage: number) => {
    if (percentage >= 70) return 'Proceed';
    return 'Review';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Score */}
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">Total Score</p>
          <p className="text-3xl font-bold text-gray-900">
            {result.totalScore.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-1">of {result.maxScore}</p>
        </div>

        {/* Percentage */}
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">Overall Score</p>
          <p className="text-3xl font-bold text-gray-900">{result.percentage.toFixed(1)}%</p>
        </div>

        {/* Recommendation */}
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">Recommendation</p>
          <p className="text-lg font-semibold text-gray-900">
            {getRecommendation(result.percentage)}
          </p>
        </div>
      </div>

      {/* Export Button */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => downloadReport(criteriaData, 'csv')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>
    </div>
  );
}

