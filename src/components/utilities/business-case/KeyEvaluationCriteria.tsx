'use client';

import React from 'react';
import { CriteriaData } from '@/lib/types/business-case';
import { BUSINESS_CASE_CRITERIA } from '@/lib/constants/business-case';
import CriteriaRow from './CriteriaRow';

interface KeyEvaluationCriteriaProps {
  criteriaData: CriteriaData;
  onCriteriaChange: (key: keyof CriteriaData, data: any) => void;
  onClearAll: () => void;
}

export default function KeyEvaluationCriteria({
  criteriaData,
  onCriteriaChange,
  onClearAll,
}: KeyEvaluationCriteriaProps) {
  const hasInput = Object.values(criteriaData).some(
    (c) => c.score > 0 || c.notes.trim() !== ''
  );

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Evaluation Criteria</h2>
        {hasInput && (
          <button
            onClick={onClearAll}
            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div>
        {BUSINESS_CASE_CRITERIA.map((criteria) => (
          <CriteriaRow
            key={criteria.id}
            title={criteria.title}
            weight={criteria.weight}
            description={criteria.description}
            data={criteriaData[criteria.id]}
            onChange={(data) => onCriteriaChange(criteria.id, data)}
          />
        ))}
      </div>
    </div>
  );
}

