'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { PreliminaryEvaluationData } from '@/lib/types/preliminary-evaluation';
import {
  calculatePreliminaryEvaluationResult,
  downloadPreliminaryEvaluationReport,
} from '@/lib/utils/preliminary-evaluation';

interface PreliminaryEvaluationSummaryProps {
  data: PreliminaryEvaluationData;
  selectedModel: 'buy' | 'build' | 'openSource';
}

export default function PreliminaryEvaluationSummary({
  data,
  selectedModel,
}: PreliminaryEvaluationSummaryProps) {
  const hasInitialScores = Object.values(data.initialAssessment).some((c) => c.score > 0);
  const modelData =
    selectedModel === 'buy'
      ? data.sourcingModelSpecific.buy
      : selectedModel === 'build'
        ? data.sourcingModelSpecific.build
        : data.sourcingModelSpecific.openSource;
  const hasModelScores = Object.values(modelData).some((c) => c.score > 0);

  if (!hasInitialScores || !hasModelScores) {
    return null;
  }

  const result = calculatePreliminaryEvaluationResult(data, selectedModel);

  const handleDownload = () => {
    downloadPreliminaryEvaluationReport(data, result, selectedModel);
  };

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation === 'Proceed') return 'text-green-700';
    if (recommendation === 'Reject') return 'text-red-700';
    return 'text-yellow-700';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Part 3: Comprehensive Conclusion</h2>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Initial Assessment Score */}
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Initial Assessment Score</p>
          <p className="text-3xl font-bold text-gray-900">
            {result.initialAssessmentScore.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {(result.initialAssessmentScore / 100).toFixed(0)}%
          </p>
        </div>

        {/* Sourcing Model Score */}
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Sourcing Model Score</p>
          <p className="text-3xl font-bold text-gray-900">
            {result.sourcingModelScore.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {(result.sourcingModelScore / 100).toFixed(0)}%
          </p>
        </div>

        {/* Total Score */}
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Total Score</p>
          <p className="text-3xl font-bold text-gray-900">{result.totalScore.toFixed(1)}</p>
          <p className="text-xs text-gray-500 mt-2">{result.percentage.toFixed(0)}%</p>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600 mb-1">Recommendation</p>
        <p className={`text-lg font-semibold ${getRecommendationColor(result.recommendation)}`}>
          {result.recommendation}
        </p>
      </div>

      {/* Export Button */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>
    </div>
  );
}

