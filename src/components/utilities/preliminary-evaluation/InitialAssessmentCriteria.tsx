'use client';

import React from 'react';
import { InitialAssessmentData } from '@/lib/types/preliminary-evaluation';
import { INITIAL_ASSESSMENT_CRITERIA } from '@/lib/constants/preliminary-evaluation';
import PreliminaryCriteriaRow from './PreliminaryCriteriaRow';

interface InitialAssessmentCriteriaProps {
  data: InitialAssessmentData;
  onDataChange: (key: keyof InitialAssessmentData, value: any) => void;
  onClearAll: () => void;
}

export default function InitialAssessmentCriteria({
  data,
  onDataChange,
  onClearAll,
}: InitialAssessmentCriteriaProps) {
  const hasInput = Object.values(data).some((c) => c.score > 0 || c.notes.trim() !== '');

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Part 1: Initial Assessment</h2>
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
        {INITIAL_ASSESSMENT_CRITERIA.map((criteria) => (
          <PreliminaryCriteriaRow
            key={criteria.id}
            title={criteria.title}
            weight={criteria.weight}
            description={criteria.description}
            data={data[criteria.id as keyof InitialAssessmentData]}
            onChange={(value) => onDataChange(criteria.id as keyof InitialAssessmentData, value)}
          />
        ))}
      </div>
    </div>
  );
}

