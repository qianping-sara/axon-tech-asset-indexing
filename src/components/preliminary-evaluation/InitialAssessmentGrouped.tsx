'use client';

import { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { CriteriaGroup } from '@/lib/constants/preliminary-evaluation';
import { InitialAssessmentData } from '@/lib/types/preliminary-evaluation';

interface InitialAssessmentGroupedProps {
  data: InitialAssessmentData;
  groups: CriteriaGroup[];
  onScoreChange: (criteriaId: string, score: number) => void;
  onNotesChange: (criteriaId: string, notes: string) => void;
}

export function InitialAssessmentGrouped({
  data,
  groups,
  onScoreChange,
  onNotesChange,
}: InitialAssessmentGroupedProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const getGroupScore = (group: CriteriaGroup): number => {
    let totalScore = 0;
    let totalWeight = 0;
    group.criteria.forEach((criterion) => {
      const score = (data[criterion.id as keyof InitialAssessmentData] as { score: number; notes: string })?.score || 0;
      totalScore += score * criterion.weight;
      totalWeight += criterion.weight;
    });
    return totalWeight > 0 ? totalScore / totalWeight : 0;
  };

  return (
    <div className="space-y-4">
      {groups.map((group) => {
        const isExpanded = expandedGroups.has(group.id);
        const groupScore = getGroupScore(group);

        return (
          <div key={group.id} className="border rounded-lg overflow-hidden">
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3 flex-1 text-left">
                <ChevronDown
                  size={20}
                  className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
                <div>
                  <h3 className="font-semibold text-lg">{group.title}</h3>
                  <p className="text-sm text-orange-100">{group.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Weight: {group.totalWeight}%</div>
                <div className="text-sm">Score: {groupScore.toFixed(1)}/5</div>
              </div>
            </button>

            {/* Group Content */}
            {isExpanded && (
              <div className="bg-white p-6 space-y-6">
                {group.criteria.map((criterion) => {
                  const criterionData = (data[criterion.id as keyof InitialAssessmentData] as { score: number; notes: string }) || {
                    score: 0,
                    notes: '',
                  };
                  const isTooltipVisible = hoveredTooltip === criterion.id;

                  return (
                    <div key={criterion.id} className="border-b last:border-b-0 pb-6 last:pb-0">
                      {/* Criterion Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900">{criterion.title}</h4>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {criterion.weight}%
                            </span>
                            {/* Tooltip Icon */}
                            <div className="relative">
                              <button
                                onMouseEnter={() => setHoveredTooltip(criterion.id)}
                                onMouseLeave={() => setHoveredTooltip(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                <Info size={16} />
                              </button>
                              {isTooltipVisible && (
                                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 z-10 shadow-lg">
                                  <p className="font-semibold mb-2">Scoring Guide:</p>
                                  <p>{criterion.scoringGuide}</p>
                                  <div className="absolute left-2 -top-1 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{criterion.description}</p>
                        </div>
                      </div>

                      {/* Score Selection */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-medium text-gray-700 min-w-fit">Score:</span>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((score) => (
                            <button
                              key={score}
                              onClick={() => onScoreChange(criterion.id, score)}
                              className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                                criterionData.score === score
                                  ? 'bg-orange-500 text-white shadow-md'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {score}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          Notes:
                        </label>
                        <textarea
                          value={criterionData.notes}
                          onChange={(e) => onNotesChange(criterion.id, e.target.value)}
                          placeholder="Add notes or evidence for this criterion..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                          rows={2}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

