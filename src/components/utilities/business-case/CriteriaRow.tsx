'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CriteriaScore } from '@/lib/types/business-case';
import { SCORE_LABELS, SCORE_COLORS } from '@/lib/constants/business-case';

interface CriteriaRowProps {
  title: string;
  weight: number;
  description: string;
  data: CriteriaScore;
  onChange: (data: CriteriaScore) => void;
}

export default function CriteriaRow({
  title,
  weight,
  description,
  data,
  onChange,
}: CriteriaRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScoreChange = (score: number) => {
    onChange({ ...data, score });
  };

  const handleNotesChange = (notes: string) => {
    onChange({ ...data, notes });
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 p-6 cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                {weight}%
              </span>
            </div>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0 text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6 border-t border-gray-200 space-y-6">
          {/* Score Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Score (1-5)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => handleScoreChange(score)}
                  className={`w-12 h-12 rounded-lg font-semibold transition-all ${
                    data.score === score
                      ? 'bg-green-700 text-white ring-2 ring-green-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
            {data.score > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: <span className="font-medium">{SCORE_LABELS[data.score]}</span>
              </p>
            )}
          </div>

          {/* Notes Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Supporting Notes
            </label>
            <textarea
              value={data.notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Enter your assessment notes, evidence, or observations..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={4}
            />
            <p className="mt-1 text-xs text-gray-500">
              {data.notes.length} / 500 characters
            </p>
          </div>

          {/* Score Summary */}
          {data.score > 0 && (
            <div className={`p-4 rounded-lg ${SCORE_COLORS[data.score]}`}>
              <p className="text-sm font-medium">
                Score: {data.score}/5 • Weighted: {((data.score / 5) * weight).toFixed(2)} points
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

