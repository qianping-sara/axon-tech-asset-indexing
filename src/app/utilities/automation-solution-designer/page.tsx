'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import AutomationObjective from '@/components/utilities/automation-solution-designer/AutomationObjective';
import AutomationPrinciples from '@/components/utilities/automation-solution-designer/AutomationPrinciples';
import DataIngestionSelector from '@/components/utilities/automation-solution-designer/DataIngestionSelector';
import ProcessOrchestrationSelector from '@/components/utilities/automation-solution-designer/ProcessOrchestrationSelector';
import { ArrowLeft } from 'lucide-react';

export default function AutomationSolutionDesignerPage() {
  const [activeTab, setActiveTab] = useState<'data-ingestion' | 'process-orchestration'>('data-ingestion');

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
          <h1 className="text-3xl font-bold text-gray-900">Automation Solution Designer</h1>
        </div>

        {/* Objective Section */}
        <div className="mb-8">
          <AutomationObjective />
        </div>

        {/* Principles Section */}
        <div className="mb-8">
          <AutomationPrinciples />
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('data-ingestion')}
            className={`pb-3 font-semibold transition-colors ${
              activeTab === 'data-ingestion'
                ? 'text-gray-900 border-b-2 border-green-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Data Ingestion Selector
          </button>
          <button
            onClick={() => setActiveTab('process-orchestration')}
            className={`pb-3 font-semibold transition-colors ${
              activeTab === 'process-orchestration'
                ? 'text-gray-900 border-b-2 border-green-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Process Orchestration Selector
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'data-ingestion' && <DataIngestionSelector />}
        {activeTab === 'process-orchestration' && <ProcessOrchestrationSelector />}
      </main>
    </div>
  );
}

