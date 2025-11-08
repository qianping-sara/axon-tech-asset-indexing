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

  const getScoreColor = (percentage: number) => {
    if (percentage === 0) return 'bg-gray-100 text-gray-700';
    if (percentage < 40) return 'bg-red-100 text-red-700';
    if (percentage < 60) return 'bg-orange-100 text-orange-700';
    if (percentage < 80) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  const getScoreLabel = (percentage: number) => {
    if (percentage === 0) return 'Not Scored';
    if (percentage < 40) return 'Poor';
    if (percentage < 60) return 'Fair';
    if (percentage < 80) return 'Good';
    return 'Excellent';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Evaluation Summary</h2>

      {!hasScores ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            Complete the evaluation criteria below to see your assessment score
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Score Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Score */}
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600 text-sm font-medium mb-2">Total Score</p>
              <p className="text-4xl font-bold text-gray-900">
                {result.totalScore.toFixed(1)}
              </p>
              <p className="text-gray-500 text-sm mt-2">out of {result.maxScore}</p>
            </div>

            {/* Percentage */}
            <div className={`rounded-lg p-6 ${getScoreColor(result.percentage)}`}>
              <p className="font-medium mb-2">Overall Score</p>
              <p className="text-4xl font-bold">{result.percentage.toFixed(1)}%</p>
              <p className="text-sm mt-2">{getScoreLabel(result.percentage)}</p>
            </div>

            {/* Status */}
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-blue-900 text-sm font-medium mb-2">Recommendation</p>
              <p className="text-lg font-semibold text-blue-900">
                {result.percentage >= 70 ? 'Proceed' : 'Review'}
              </p>
              <p className="text-blue-700 text-sm mt-2">
                {result.percentage >= 70
                  ? 'Meets criteria for technology evaluation'
                  : 'Address gaps before proceeding'}
              </p>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => downloadReport(criteriaData, 'json')}
              className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export JSON
            </button>
            <button
              onClick={() => downloadReport(criteriaData, 'csv')}
              className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

