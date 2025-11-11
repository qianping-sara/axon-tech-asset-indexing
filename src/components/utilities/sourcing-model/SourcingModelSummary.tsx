'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { SourcingModelData } from '@/lib/types/sourcing-model';
import { calculateSourcingModelScores, downloadSourcingModelReport } from '@/lib/utils/sourcing-model';

interface SourcingModelSummaryProps {
  criteriaData: SourcingModelData;
}

export default function SourcingModelSummary({ criteriaData }: SourcingModelSummaryProps) {
  const hasScores = Object.values(criteriaData).some((c) => c.score > 0);

  if (!hasScores) {
    return null;
  }

  const result = calculateSourcingModelScores(criteriaData);

  const handleDownload = () => {
    downloadSourcingModelReport(criteriaData, result);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Sourcing Model Scores</h2>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Build Score */}
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Build Score</p>
          <p className="text-3xl font-bold text-gray-900">
            {result.build.build.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {((result.build.build / 5) * 100).toFixed(0)}%
          </p>
        </div>

        {/* Buy Score */}
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Buy Score</p>
          <p className="text-3xl font-bold text-gray-900">
            {result.buy.buy.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {((result.buy.buy / 5) * 100).toFixed(0)}%
          </p>
        </div>

        {/* Open Source Score */}
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Open Source Score</p>
          <p className="text-3xl font-bold text-gray-900">
            {result.openSource.openSource.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {((result.openSource.openSource / 5) * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600 mb-1">Recommended Sourcing Model</p>
        <p className="text-lg font-semibold text-green-700">{result.recommendation}</p>
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

