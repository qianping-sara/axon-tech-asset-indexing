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
    if (window.confirm('Clear all data?')) {
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
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/utilities"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Business Case and Strategic Alignment
          </h1>
        </div>

        {/* Objective Section */}
        <div className="mb-8">
          <BusinessCaseObjective />
        </div>

        {/* Key Evaluation Criteria */}
        <div className="mb-8">
          <KeyEvaluationCriteria
            criteriaData={criteriaData}
            onCriteriaChange={handleCriteriaChange}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Evaluation Summary */}
        <EvaluationSummary criteriaData={criteriaData} />
      </main>
    </div>
  );
}

