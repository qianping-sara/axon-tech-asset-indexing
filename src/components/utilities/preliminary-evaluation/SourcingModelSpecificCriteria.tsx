'use client';

import React, { useState } from 'react';
import { SourcingModelSpecificData } from '@/lib/types/preliminary-evaluation';
import {
  COTS_EVALUATION_CRITERIA,
  CUSTOM_DEVELOPMENT_CRITERIA,
  OSS_EVALUATION_CRITERIA,
} from '@/lib/constants/preliminary-evaluation';
import PreliminaryCriteriaRow from './PreliminaryCriteriaRow';

interface SourcingModelSpecificCriteriaProps {
  data: SourcingModelSpecificData;
  selectedModel: 'buy' | 'build' | 'openSource';
  onDataChange: (model: 'buy' | 'build' | 'openSource', key: string, value: any) => void;
  onClearAll: (model: 'buy' | 'build' | 'openSource') => void;
}

export default function SourcingModelSpecificCriteria({
  data,
  selectedModel,
  onDataChange,
  onClearAll,
}: SourcingModelSpecificCriteriaProps) {
  const [activeTab, setActiveTab] = useState<'buy' | 'build' | 'openSource'>(selectedModel);

  const getModelData = (model: 'buy' | 'build' | 'openSource') => {
    if (model === 'buy') return data.buy;
    if (model === 'build') return data.build;
    return data.openSource;
  };

  const getModelCriteria = (model: 'buy' | 'build' | 'openSource') => {
    if (model === 'buy') return COTS_EVALUATION_CRITERIA;
    if (model === 'build') return CUSTOM_DEVELOPMENT_CRITERIA;
    return OSS_EVALUATION_CRITERIA;
  };

  const getModelTitle = (model: 'buy' | 'build' | 'openSource') => {
    if (model === 'buy') return 'COTS Solution Scorecard';
    if (model === 'build') return 'Custom Development Solution Scorecard';
    return 'Open Source Software Solution Scorecard';
  };

  const currentData = getModelData(activeTab);
  const currentCriteria = getModelCriteria(activeTab);
  const hasInput = Object.values(currentData).some((c) => c.score > 0 || c.notes.trim() !== '');

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Part 2: Sourcing Model Specific Evaluation
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Current Model: <span className="font-semibold text-gray-900 capitalize">{activeTab}</span>
        </p>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-6">
          {(['buy', 'build', 'openSource'] as const).map((model) => (
            <button
              key={model}
              onClick={() => setActiveTab(model)}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                activeTab === model
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {model === 'buy' ? 'Buy' : model === 'build' ? 'Build' : 'OSS'}
            </button>
          ))}
        </div>
      </div>

      {/* Scorecard Content */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-gray-900">{getModelTitle(activeTab)}</h3>
          {hasInput && (
            <button
              onClick={() => onClearAll(activeTab)}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        <div>
          {currentCriteria.map((criteria) => (
            <PreliminaryCriteriaRow
              key={criteria.id}
              title={criteria.title}
              weight={criteria.weight}
              description={criteria.description}
              data={currentData[criteria.id as keyof typeof currentData]}
              onChange={(value) => onDataChange(activeTab, criteria.id, value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

