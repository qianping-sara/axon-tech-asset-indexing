'use client';

import React from 'react';
import { SourcingModelData } from '@/lib/types/sourcing-model';
import { SOURCING_MODEL_CRITERIA } from '@/lib/constants/sourcing-model';
import SourcingModelCriteriaRow from './SourcingModelCriteriaRow';

interface SourcingModelCriteriaProps {
  criteriaData: SourcingModelData;
  onCriteriaChange: (key: keyof SourcingModelData, data: { notes: string; score: number }) => void;
  onClearAll: () => void;
}

export default function SourcingModelCriteria({
  criteriaData,
  onCriteriaChange,
  onClearAll,
}: SourcingModelCriteriaProps) {
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
        {SOURCING_MODEL_CRITERIA.map((criteria) => (
          <SourcingModelCriteriaRow
            key={criteria.id}
            title={criteria.title}
            weight={criteria.weight}
            description={criteria.description}
            data={criteriaData[criteria.id as keyof SourcingModelData]}
            onChange={(data) => onCriteriaChange(criteria.id as keyof SourcingModelData, data)}
          />
        ))}
      </div>
    </div>
  );
}

