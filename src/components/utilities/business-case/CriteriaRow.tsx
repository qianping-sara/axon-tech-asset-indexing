'use client';

import React from 'react';
import { CriteriaScore } from '@/lib/types/business-case';
import { SCORE_LABELS } from '@/lib/constants/business-case';

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
  const handleScoreChange = (score: number) => {
    onChange({ ...data, score });
  };

  const handleNotesChange = (notes: string) => {
    onChange({ ...data, notes });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-5 mb-4">
      {/* Header: Title, Weight, and Score Selection */}
      <div className="flex items-start justify-between gap-6 mb-4">
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            <span className="text-xs text-gray-500 font-medium">{weight}%</span>
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        {/* Score Selection */}
        <div className="flex-shrink-0">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                onClick={() => handleScoreChange(score)}
                className={`w-9 h-9 rounded font-medium text-xs transition-all ${
                  data.score === score
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {score}
              </button>
            ))}
          </div>
          {data.score > 0 && (
            <p className="text-xs text-gray-500 text-right mt-1">
              {SCORE_LABELS[data.score]}
            </p>
          )}
        </div>
      </div>

      {/* Notes Input */}
      <textarea
        value={data.notes}
        onChange={(e) => handleNotesChange(e.target.value)}
        placeholder="Notes..."
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
        rows={2}
      />
    </div>
  );
}

