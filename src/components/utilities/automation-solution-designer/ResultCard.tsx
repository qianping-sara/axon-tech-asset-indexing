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
  const isDowngrade = recommendation.type === 'downgrade';
  const isMatched = recommendation.type === 'matched';

  const headerColor = isBlocked ? 'text-red-700' : isWarning ? 'text-amber-700' : 'text-green-700';
  const headerBgColor = isBlocked ? 'bg-red-50' : isWarning ? 'bg-amber-50' : 'bg-green-50';
  const headerBorderColor = isBlocked ? 'border-red-200' : isWarning ? 'border-amber-200' : 'border-green-200';
  const headerTextColor = isBlocked ? 'text-red-900' : isWarning ? 'text-amber-900' : 'text-green-900';
  const headerTextColorLight = isBlocked ? 'text-red-800' : isWarning ? 'text-amber-800' : 'text-green-800';
  const headerTextColorLighter = isBlocked ? 'text-red-700' : isWarning ? 'text-amber-700' : 'text-green-700';
  const bulletColor = isBlocked ? 'text-red-700' : isWarning ? 'text-amber-700' : 'text-green-700';
  const buttonColor = isBlocked ? 'bg-red-700 hover:bg-red-800' : isWarning ? 'bg-amber-700 hover:bg-amber-800' : 'bg-green-700 hover:bg-green-800';
  const headerIcon = isBlocked ? AlertCircle : isWarning ? AlertTriangle : CheckCircle;
  const HeaderIcon = headerIcon;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      {/* Status Indicator */}
      <div className="flex items-center gap-3 mb-6">
        <HeaderIcon className={`w-6 h-6 ${headerColor}`} />
        <h2 className="text-2xl font-bold text-gray-900">
          {isBlocked ? '评估完成 - 项目阻断' : isWarning ? '评估完成 - 需要注意' : '评估完成'}
        </h2>
      </div>

      {/* Recommendation */}
      <div className={`${headerBgColor} border ${headerBorderColor} rounded-lg p-6 mb-6`}>
        <h3 className={`text-lg font-semibold ${headerTextColor} mb-2`}>推荐策略</h3>
        <p className={`${headerTextColorLight} font-medium text-lg mb-3`}>{recommendation.strategy}</p>
        <p className={`${headerTextColorLighter} text-sm`}>
          <span className="font-semibold">技术：</span> {recommendation.technology}
        </p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">概述</h3>
        <p className="text-gray-700 leading-relaxed">{recommendation.description}</p>
      </div>

      {/* Warning Message (if applicable) */}
      {recommendation.warning && (
        <div className={`${isBlocked ? 'bg-red-50 border-red-200' : isWarning ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'} border rounded-lg p-4 mb-6`}>
          <p className={`${isBlocked ? 'text-red-800' : isWarning ? 'text-amber-800' : 'text-green-800'} font-semibold`}>
            ⚠️ {recommendation.warning}
          </p>
        </div>
      )}

      {/* Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">关键点</h3>
        <ul className="space-y-2">
          {recommendation.details.map((detail, index) => (
            <li key={index} className="flex gap-3 text-gray-700">
              <span className={`${bulletColor} font-bold flex-shrink-0`}>•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggestions (if applicable) */}
      {recommendation.suggestions && recommendation.suggestions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">建议</h3>
          <ul className="space-y-2">
            {recommendation.suggestions.map((suggestion, index) => (
              <li key={index} className="flex gap-3 text-gray-700">
                <span className={`${bulletColor} font-bold flex-shrink-0`}>→</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps */}
      {recommendation.nextSteps && recommendation.nextSteps.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">后续步骤</h3>
          <ol className="space-y-2">
            {recommendation.nextSteps.map((step, index) => (
              <li key={index} className="flex gap-3 text-gray-700">
                <span className={`${bulletColor} font-bold flex-shrink-0`}>{index + 1}.</span>
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
          className={`flex items-center gap-2 px-4 py-2 ${buttonColor} text-white font-medium rounded transition-colors`}
        >
          <Download className="w-4 h-4" />
          下载报告
        </button>
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          重新开始
        </button>
      </div>
    </div>
  );
}

