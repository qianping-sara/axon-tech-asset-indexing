'use client';

import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { InitialAssessmentData } from '@/lib/types/preliminary-evaluation';
import { INITIAL_ASSESSMENT_CRITERIA_GROUPS } from '@/lib/constants/preliminary-evaluation';

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
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);

  const hasInput = Object.values(data).some((c) => c.score > 0 || c.notes.trim() !== '');

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const getGroupScore = (groupId: string): number => {
    const group = INITIAL_ASSESSMENT_CRITERIA_GROUPS.find((g) => g.id === groupId);
    if (!group) return 0;

    let totalScore = 0;
    let totalWeight = 0;
    group.criteria.forEach((criterion) => {
      const score = (data as any)[criterion.id]?.score || 0;
      totalScore += score * criterion.weight;
      totalWeight += criterion.weight;
    });
    return totalWeight > 0 ? totalScore / totalWeight : 0;
  };

  const handleScoreChange = (criteriaId: string, score: number) => {
    const currentData = (data as any)[criteriaId] || { score: 0, notes: '' };
    onDataChange(criteriaId as keyof InitialAssessmentData, {
      ...currentData,
      score,
    });
  };

  const handleNotesChange = (criteriaId: string, notes: string) => {
    const currentData = (data as any)[criteriaId] || { score: 0, notes: '' };
    onDataChange(criteriaId as keyof InitialAssessmentData, {
      ...currentData,
      notes,
    });
  };

  return (
    <div className="mb-12">
      {hasInput && (
        <div className="flex justify-end mb-6">
          <button
            onClick={onClearAll}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Clear All
          </button>
        </div>
      )}

      <div className="space-y-3">
        {INITIAL_ASSESSMENT_CRITERIA_GROUPS.map((group) => {
          const isExpanded = expandedGroups.has(group.id);
          const groupScore = getGroupScore(group.id);

          return (
            <div key={group.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              {/* Group Header - Minimalist Black/White/Gray */}
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between border-b border-gray-200"
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <ChevronDown
                    size={20}
                    className={`transition-transform flex-shrink-0 text-gray-600 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{group.title}</h3>
                    <p className="text-sm text-gray-600">{group.description}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4 text-sm text-gray-700">
                  <div className="font-medium">Weight: {group.totalWeight}%</div>
                  <div className="text-gray-600">Score: {groupScore.toFixed(1)}/5</div>
                </div>
              </button>

              {/* Group Content - Table Layout */}
              {isExpanded && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 w-1/3">
                          Dimension
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 w-1/3">
                          Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 w-1/3">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.criteria.map((criterion, idx) => {
                        const criterionData = (data as any)[criterion.id] || {
                          score: 0,
                          notes: '',
                        };
                        const isTooltipVisible = hoveredTooltip === criterion.id;

                        return (
                          <tr
                            key={criterion.id}
                            className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                              idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
                          >
                            {/* Dimension Column */}
                            <td className="px-6 py-4">
                              <div className="flex items-start gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium text-gray-900 text-sm">{criterion.title}</h4>
                                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                                      {criterion.weight}%
                                    </span>
                                    {/* Tooltip Icon */}
                                    <div className="relative">
                                      <button
                                        onMouseEnter={() => setHoveredTooltip(criterion.id)}
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
                                    onClick={() => handleScoreChange(criterion.id, score)}
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
                                onChange={(e) => handleNotesChange(criterion.id, e.target.value)}
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

