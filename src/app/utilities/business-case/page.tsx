'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import BusinessCaseObjective from '@/components/utilities/business-case/BusinessCaseObjective';
import KeyEvaluationCriteria from '@/components/utilities/business-case/KeyEvaluationCriteria';
import EvaluationSummary from '@/components/utilities/business-case/EvaluationSummary';
import { ArrowLeft } from 'lucide-react';
import { CriteriaData, CriteriaScore } from '@/lib/types/business-case';

export default function BusinessCasePage() {
  const [criteriaData, setCriteriaData] = useState<CriteriaData>({
    clearProblemDefinition: { notes: '', score: 0 },
    explicitStrategicLink: { notes: '', score: 0 },
    capabilityBasedDefinition: { notes: '', score: 0 },
    identificationOfStakeholders: { notes: '', score: 0 },
    preliminaryBuyIn: { notes: '', score: 0 },
  });

  const handleCriteriaChange = (key: keyof CriteriaData, data: CriteriaScore) => {
    setCriteriaData((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      setCriteriaData({
        clearProblemDefinition: { notes: '', score: 0 },
        explicitStrategicLink: { notes: '', score: 0 },
        capabilityBasedDefinition: { notes: '', score: 0 },
        identificationOfStakeholders: { notes: '', score: 0 },
        preliminaryBuyIn: { notes: '', score: 0 },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/utilities"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Utilities
        </Link>

        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Business Case and Strategic Alignment
          </h1>
          <p className="text-gray-600">
            Validate business needs and ensure strategic alignment before technology decisions
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Objective Section */}
          <BusinessCaseObjective />

          {/* Evaluation Summary */}
          <EvaluationSummary criteriaData={criteriaData} />

          {/* Key Evaluation Criteria */}
          <KeyEvaluationCriteria
            criteriaData={criteriaData}
            onCriteriaChange={handleCriteriaChange}
          />

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8 border-t border-gray-200">
            <button
              onClick={handleClearAll}
              className="px-6 py-3 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

