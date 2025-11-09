'use client';

import React from 'react';

interface ProcessOrchestrationSelectorProps {
  // Props will be defined when implementing the actual content
}

export default function ProcessOrchestrationSelector({}: ProcessOrchestrationSelectorProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-8 text-center">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Process Orchestration Selector</h3>
        <p className="text-gray-600 mb-4">
          This section will guide you through selecting the appropriate process orchestration approach for your automation use case.
        </p>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-500 text-sm">Content coming soon...</p>
        </div>
      </div>
    </div>
  );
}

