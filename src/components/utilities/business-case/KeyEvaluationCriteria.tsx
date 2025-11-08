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
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Key Evaluation Criteria</h2>
      <p className="text-gray-600 mb-8">
        Evaluate your business case against these five critical dimensions. Click on each criterion
        to expand and provide your assessment.
      </p>

      <div className="space-y-4">
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

      {/* Info Box */}
      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-amber-900 text-sm">
          <span className="font-semibold">Tip:</span> A score of 70% or higher indicates that your
          business case is ready for technology evaluation. Lower scores suggest you should address
          the identified gaps before proceeding.
        </p>
      </div>
    </div>
  );
}

