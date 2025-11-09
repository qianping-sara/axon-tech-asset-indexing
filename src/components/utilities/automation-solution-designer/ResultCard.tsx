'use client';

import React from 'react';
import { RecommendationResult } from '@/lib/types/data-ingestion';
import { Download, RotateCcw, CheckCircle } from 'lucide-react';
import { downloadRecommendation } from '@/lib/utils/data-ingestion';

interface ResultCardProps {
  recommendation: RecommendationResult;
  answers: any;
  onRestart: () => void;
}

export default function ResultCard({ recommendation, answers, onRestart }: ResultCardProps) {
  const handleDownload = () => {
    downloadRecommendation(answers, recommendation);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      {/* Success Indicator */}
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle className="w-6 h-6 text-green-700" />
        <h2 className="text-2xl font-bold text-gray-900">Assessment Complete</h2>
      </div>

      {/* Recommendation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-green-900 mb-2">Recommended Strategy</h3>
        <p className="text-green-800 font-medium text-lg mb-3">{recommendation.strategy}</p>
        <p className="text-green-700 text-sm">
          <span className="font-semibold">Technology:</span> {recommendation.technology}
        </p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
        <p className="text-gray-700 leading-relaxed">{recommendation.description}</p>
      </div>

      {/* Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Points</h3>
        <ul className="space-y-2">
          {recommendation.details.map((detail, index) => (
            <li key={index} className="flex gap-3 text-gray-700">
              <span className="text-green-700 font-bold flex-shrink-0">•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next Steps */}
      {recommendation.nextSteps && recommendation.nextSteps.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Next Steps</h3>
          <ol className="space-y-2">
            {recommendation.nextSteps.map((step, index) => (
              <li key={index} className="flex gap-3 text-gray-700">
                <span className="text-green-700 font-bold flex-shrink-0">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white font-medium rounded hover:bg-green-800 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Start Over
        </button>
      </div>
    </div>
  );
}

