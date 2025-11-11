'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import SourcingModelObjective from '@/components/utilities/sourcing-model/SourcingModelObjective';
import SourcingModelCriteria from '@/components/utilities/sourcing-model/SourcingModelCriteria';
import SourcingModelSummary from '@/components/utilities/sourcing-model/SourcingModelSummary';
import { ArrowLeft } from 'lucide-react';
import { SourcingModelData } from '@/lib/types/sourcing-model';

export default function SourcingModelPage() {
  const [criteriaData, setCriteriaData] = useState<SourcingModelData>({
    strategicDifferentiation: { notes: '', score: 0 },
    requirementsFit: { notes: '', score: 0 },
    timeToMarket: { notes: '', score: 0 },
    roadmapControl: { notes: '', score: 0 },
    tcoPrediability: { notes: '', score: 0 },
    internalSkillset: { notes: '', score: 0 },
    vendorLockIn: { notes: '', score: 0 },
    integrationFriendliness: { notes: '', score: 0 },
  });

  const handleCriteriaChange = (key: keyof SourcingModelData, data: { notes: string; score: number }) => {
    setCriteriaData((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all data?')) {
      setCriteriaData({
        strategicDifferentiation: { notes: '', score: 0 },
        requirementsFit: { notes: '', score: 0 },
        timeToMarket: { notes: '', score: 0 },
        roadmapControl: { notes: '', score: 0 },
        tcoPrediability: { notes: '', score: 0 },
        internalSkillset: { notes: '', score: 0 },
        vendorLockIn: { notes: '', score: 0 },
        integrationFriendliness: { notes: '', score: 0 },
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
          className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to CoE Utilities
        </Link>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Sourcing Model Analysis
          </h1>
        </div>

        {/* Objective Section */}
        <div className="mb-8">
          <SourcingModelObjective />
        </div>

        {/* Key Evaluation Criteria */}
        <div className="mb-8">
          <SourcingModelCriteria
            criteriaData={criteriaData}
            onCriteriaChange={handleCriteriaChange}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Evaluation Summary */}
        <SourcingModelSummary criteriaData={criteriaData} />
      </main>
    </div>
  );
}

