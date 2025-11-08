'use client';

import React, { useState, useEffect } from 'react';
import { Solution, CostData } from '@/lib/types/tco-calculation';
import { createNewSolution } from '@/lib/utils/tco-calculation';
import { Trash2, Edit2, Check, X, ChevronDown, ChevronRight } from 'lucide-react';
import TCOCostTable from './TCOCostTable';

interface TCOSolutionManagerProps {
  solutions: Solution[];
  onAddSolution: (solution: Solution) => void;
  onDeleteSolution: (solutionId: string) => void;
  onUpdateSolution: (solution: Solution) => void;
}

export default function TCOSolutionManager({
  solutions,
  onAddSolution,
  onDeleteSolution,
  onUpdateSolution,
}: TCOSolutionManagerProps) {
  const [newSolutionName, setNewSolutionName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Set the first solution as expanded when solutions change
  useEffect(() => {
    if (solutions.length > 0 && !expandedId) {
      setExpandedId(solutions[0].id);
    }
  }, [solutions, expandedId]);

  const handleAddSolution = () => {
    if (newSolutionName.trim()) {
      const newSolution = createNewSolution(newSolutionName.trim());
      onAddSolution(newSolution);
      setNewSolutionName('');
      setExpandedId(newSolution.id);
    }
  };

  const handleStartEdit = (solution: Solution) => {
    setEditingId(solution.id);
    setEditingName(solution.name);
  };

  const handleSaveEdit = (solution: Solution) => {
    if (editingName.trim()) {
      onUpdateSolution({
        ...solution,
        name: editingName.trim(),
        updatedAt: new Date(),
      });
      setEditingId(null);
    }
  };

  const handleCostChange = (
    solutionId: string,
    costItemId: string,
    year: 'year1' | 'year2' | 'year3' | 'year4' | 'year5',
    value: number
  ) => {
    const solution = solutions.find((s) => s.id === solutionId);
    if (solution) {
      const updatedCosts = { ...solution.costs };
      updatedCosts[costItemId] = {
        ...updatedCosts[costItemId],
        [year]: value,
      };
      onUpdateSolution({
        ...solution,
        costs: updatedCosts,
        updatedAt: new Date(),
      });
    }
  };

  const handleClearAllCosts = (solutionId: string) => {
    const solution = solutions.find((s) => s.id === solutionId);
    if (solution) {
      // Create empty cost data
      const emptyCosts: CostData = {};
      Object.keys(solution.costs).forEach((costItemId) => {
        emptyCosts[costItemId] = {
          year1: 0,
          year2: 0,
          year3: 0,
          year4: 0,
          year5: 0,
        };
      });
      onUpdateSolution({
        ...solution,
        costs: emptyCosts,
        updatedAt: new Date(),
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Solutions List */}
      {solutions.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-base">No solutions added yet. Add your first solution to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {solutions.map((solution) => (
            <div key={solution.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Solution Header */}
              <div
                className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setExpandedId(expandedId === solution.id ? null : solution.id)}
              >
                <div className="flex items-center gap-3 flex-1">
                  {/* Collapse/Expand Icon */}
                  <div className="text-gray-600">
                    {expandedId === solution.id ? (
                      <ChevronDown size={20} />
                    ) : (
                      <ChevronRight size={20} />
                    )}
                  </div>

                  {editingId === solution.id ? (
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveEdit(solution);
                        }}
                        className="p-1 text-green-700 hover:bg-green-50 rounded"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(null);
                        }}
                        className="p-1 text-gray-500 hover:bg-gray-200 rounded"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <h4 className="text-base font-semibold text-gray-900">{solution.name}</h4>
                  )}
                </div>

                <div className="flex gap-2 items-center" onClick={(e) => e.stopPropagation()}>
                  {editingId !== solution.id && (
                    <>
                      <button
                        onClick={() => handleStartEdit(solution)}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        title="Edit solution name"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => onDeleteSolution(solution.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete solution"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Solution Content - Cost Table */}
              {expandedId === solution.id && (
                <div className="p-6 border-t border-gray-200">
                  <TCOCostTable
                    solution={solution}
                    onCostChange={(costItemId, year, value) =>
                      handleCostChange(solution.id, costItemId, year, value)
                    }
                    onClearAll={() => handleClearAllCosts(solution.id)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add New Solution - At the bottom */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Solution</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={newSolutionName}
            onChange={(e) => setNewSolutionName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSolution()}
            placeholder="Enter solution name (e.g., Solution A, Vendor X)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
          />
          <button
            onClick={handleAddSolution}
            className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium text-sm"
          >
            + Add Solution
          </button>
        </div>
      </div>
    </div>
  );
}

