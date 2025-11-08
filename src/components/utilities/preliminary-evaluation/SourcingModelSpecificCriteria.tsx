'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { SourcingModelSpecificData } from '@/lib/types/preliminary-evaluation';
import {
  COTS_EVALUATION_CRITERIA,
  CUSTOM_DEVELOPMENT_CRITERIA,
  OSS_EVALUATION_CRITERIA,
} from '@/lib/constants/preliminary-evaluation';

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
  const [expandedModels, setExpandedModels] = useState<Set<string>>(new Set([selectedModel]));
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);
  const [showMultipleModelsWarning, setShowMultipleModelsWarning] = useState(false);

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
    if (model === 'buy') return 'COTS Solution (Buy)';
    if (model === 'build') return 'Custom Development (Build)';
    return 'Open Source Software (OSS)';
  };

  const getModelDescription = (model: 'buy' | 'build' | 'openSource') => {
    if (model === 'buy') return 'Evaluate commercial off-the-shelf solutions';
    if (model === 'build') return 'Evaluate custom development approach';
    return 'Evaluate open source software options';
  };

  const toggleModel = (model: string) => {
    const newExpanded = new Set(expandedModels);
    if (newExpanded.has(model)) {
      newExpanded.delete(model);
    } else {
      newExpanded.add(model);
    }
    setExpandedModels(newExpanded);
  };

  const handleScoreChange = (model: 'buy' | 'build' | 'openSource', criteriaId: string, score: number) => {
    // Check if user is filling multiple models
    const filledModels = (['buy', 'build', 'openSource'] as const).filter((m) => {
      const modelData = getModelData(m);
      return Object.values(modelData).some((c) => c.score > 0 || c.notes.trim() !== '');
    });

    if (filledModels.length > 0 && !filledModels.includes(model)) {
      setShowMultipleModelsWarning(true);
      return;
    }

    const currentData = (getModelData(model) as any)[criteriaId] || { score: 0, notes: '' };
    onDataChange(model, criteriaId, {
      ...currentData,
      score,
    });
  };

  const handleNotesChange = (model: 'buy' | 'build' | 'openSource', criteriaId: string, notes: string) => {
    const currentData = (getModelData(model) as any)[criteriaId] || { score: 0, notes: '' };
    onDataChange(model, criteriaId, {
      ...currentData,
      notes,
    });
  };

  const getModelScore = (model: 'buy' | 'build' | 'openSource'): number => {
    const criteria = getModelCriteria(model);
    const modelData = getModelData(model);

    let totalScore = 0;
    let totalWeight = 0;
    criteria.forEach((criterion) => {
      const score = (modelData as any)[criterion.id]?.score || 0;
      totalScore += score * criterion.weight;
      totalWeight += criterion.weight;
    });
    return totalWeight > 0 ? totalScore / totalWeight : 0;
  };

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Part 2: Sourcing Model Specific Evaluation</h2>
        <p className="text-sm text-gray-600 mt-2">
          Note: Fill only the section corresponding to your selected sourcing model ({selectedModel})
        </p>
      </div>

      {/* Multiple Models Warning Modal */}
      {showMultipleModelsWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Models Detected</h3>
            <p className="text-gray-600 mb-4">
              You are filling evaluation data for multiple sourcing models. Please fill only one model at a time based on your selected sourcing model.
            </p>
            <button
              onClick={() => setShowMultipleModelsWarning(false)}
              className="w-full px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Collapsible Model Sections */}
      <div className="space-y-3">
        {(['buy', 'build', 'openSource'] as const).map((model) => {
          const isExpanded = expandedModels.has(model);
          const modelData = getModelData(model);
          const modelCriteria = getModelCriteria(model);
          const modelScore = getModelScore(model);
          const hasInput = Object.values(modelData).some((c) => c.score > 0 || c.notes.trim() !== '');

          return (
            <div key={model} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              {/* Model Header */}
              <button
                onClick={() => toggleModel(model)}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between border-b border-gray-200"
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <ChevronDown
                    size={20}
                    className={`transition-transform flex-shrink-0 text-gray-600 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{getModelTitle(model)}</h3>
                    <p className="text-sm text-gray-600">{getModelDescription(model)}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4 text-sm text-gray-700">
                  <div className="font-medium">Score: {modelScore.toFixed(1)}/5</div>
                  {selectedModel === model && (
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded mt-1">
                      Selected
                    </div>
                  )}
                </div>
              </button>

              {/* Model Content - Table Layout */}
              {isExpanded && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                          Criterion
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 w-32">
                          Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 w-48">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {modelCriteria.map((criterion, idx) => {
                        const criterionData = (modelData as any)[criterion.id] || {
                          score: 0,
                          notes: '',
                        };
                        const isTooltipVisible = hoveredTooltip === `${model}-${criterion.id}`;

                        return (
                          <tr
                            key={criterion.id}
                            className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                              idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
                          >
                            {/* Criterion Column */}
                            <td className="px-6 py-4">
                              <div className="flex items-start gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium text-gray-900 text-sm">{criterion.title}</h4>
                                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                                      {criterion.weight}%
                                    </span>
                                    {/* Tooltip Icon */}
                                    <div className="relative">
                                      <button
                                        onMouseEnter={() => setHoveredTooltip(`${model}-${criterion.id}`)}
                                        onMouseLeave={() => setHoveredTooltip(null)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                      >
                                        <Info size={14} />
                                      </button>
                                      {isTooltipVisible && (
                                        <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-10 shadow-lg">
                                          <p className="font-semibold mb-2">Scoring Guide:</p>
                                          <p>{criterion.scoringGuide}</p>
                                          <div className="absolute left-2 -top-1 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-600">{criterion.description}</p>
                                </div>
                              </div>
                            </td>

                            {/* Score Column */}
                            <td className="px-6 py-4">
                              <div className="flex gap-1 justify-center">
                                {[1, 2, 3, 4, 5].map((score) => (
                                  <button
                                    key={score}
                                    onClick={() => handleScoreChange(model, criterion.id, score)}
                                    className={`w-8 h-8 rounded font-semibold text-xs transition-all ${
                                      criterionData.score === score
                                        ? 'bg-green-700 text-white shadow-md'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                  >
                                    {score}
                                  </button>
                                ))}
                              </div>
                            </td>

                            {/* Notes Column */}
                            <td className="px-6 py-4">
                              <textarea
                                value={criterionData.notes}
                                onChange={(e) => handleNotesChange(model, criterion.id, e.target.value)}
                                placeholder="Add notes..."
                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-700 focus:border-transparent resize-none"
                                rows={2}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Clear Button */}
              {isExpanded && hasInput && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={() => onClearAll(model)}
                    className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors font-medium"
                  >
                    Clear This Section
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

