'use client';

import React from 'react';
import { CriteriaData } from '@/lib/types/business-case';
import { BUSINESS_CASE_CRITERIA } from '@/lib/constants/business-case';
import CriteriaRow from './CriteriaRow';

interface KeyEvaluationCriteriaProps {
  criteriaData: CriteriaData;
  onCriteriaChange: (key: keyof CriteriaData, data: any) => void;
}

export default function KeyEvaluationCriteria({
  criteriaData,
  onCriteriaChange,
}: KeyEvaluationCriteriaProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Evaluation Criteria</h2>

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

