'use client';

import React from 'react';
import { RecommendationResult } from '@/lib/types/data-ingestion';
import { Download, RotateCcw, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
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

  // Determine styling based on recommendation type
  const isBlocked = recommendation.type === 'blocked';
  const isWarning = recommendation.type === 'warning';

  const borderLeftColor = isBlocked ? 'border-l-gray-600' : isWarning ? 'border-l-orange-600' : 'border-l-green-600';
  const iconColor = isBlocked ? 'text-gray-600' : isWarning ? 'text-orange-600' : 'text-green-600';
  const warningBorderColor = isWarning ? 'border-orange-300' : 'border-gray-300';

  return (
    <div className="space-y-4">
      {/* Header Card with Left Border */}
      <div className={`border rounded-lg p-4 border-l-4 ${borderLeftColor}`}>
        <div className="flex items-start gap-3">
          {isBlocked ? (
            <AlertCircle className={`w-6 h-6 ${iconColor} flex-shrink-0`} />
          ) : isWarning ? (
            <AlertTriangle className={`w-6 h-6 ${iconColor} flex-shrink-0`} />
          ) : (
            <CheckCircle className={`w-6 h-6 ${iconColor} flex-shrink-0`} />
          )}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-black">
              {recommendation.strategy}
            </h2>
            <p className="text-sm text-gray-700 mt-1">{recommendation.description}</p>
            <div className="mt-3 pt-3 border-t border-gray-300">
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Technology:</span> {recommendation.technology}
              </p>
              {recommendation.details && recommendation.details.length > 0 && (
                <div className="mt-2">
                  {recommendation.details.map((detail, index) => (
                    <p key={index} className="text-xs text-gray-600 ml-4">
                      • {detail}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Warning Section (if applicable) */}
      {recommendation.warning && (
        <div className={`border ${warningBorderColor} rounded-lg p-4 bg-white`}>
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-black mb-2 flex items-center gap-2">
                Warnings
              </h3>
              <p className="text-xs text-gray-700 ml-6">
                • {recommendation.warning}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Suggestions Section (if applicable) */}
      {recommendation.suggestions && recommendation.suggestions.length > 0 && (
        <div className="border border-green-300 rounded-lg p-4 bg-white">
          <h3 className="text-sm font-bold text-black mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Suggestions
          </h3>
          <div>
            {recommendation.suggestions.map((suggestion, index) => (
              <p key={index} className="text-xs text-gray-700 ml-6">
                • {suggestion}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps Section (if applicable) */}
      {recommendation.nextSteps && recommendation.nextSteps.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-bold text-black mb-2">Next Steps</h3>
          <ol className="space-y-1">
            {recommendation.nextSteps.map((step, index) => (
              <li key={index} className="text-xs text-gray-600 ml-4">
                {index + 1}. {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between gap-3 pt-2">
        <button
          onClick={handleDownload}
          className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Restart Assessment
        </button>
      </div>
    </div>
  );
}

