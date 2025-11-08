'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import TCOSolutionManager from '@/components/utilities/tco-calculation/TCOSolutionManager';
import TCOChart from '@/components/utilities/tco-calculation/TCOChart';
import { Solution } from '@/lib/types/tco-calculation';

export default function TCOCalculationPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [visibleSolutions, setVisibleSolutions] = useState<Set<string>>(new Set());

  // Load solutions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tco-solutions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSolutions(parsed);
        setVisibleSolutions(new Set(parsed.map((s: Solution) => s.id)));
      } catch (error) {
        console.error('Failed to load solutions:', error);
      }
    }
  }, []);

  // Save solutions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tco-solutions', JSON.stringify(solutions));
  }, [solutions]);

  const handleAddSolution = (solution: Solution) => {
    setSolutions([...solutions, solution]);
    setVisibleSolutions(new Set([...visibleSolutions, solution.id]));
  };

  const handleDeleteSolution = (solutionId: string) => {
    setSolutions(solutions.filter((s) => s.id !== solutionId));
    const newVisible = new Set(visibleSolutions);
    newVisible.delete(solutionId);
    setVisibleSolutions(newVisible);
  };

  const handleUpdateSolution = (updatedSolution: Solution) => {
    setSolutions(solutions.map((s) => (s.id === updatedSolution.id ? updatedSolution : s)));
  };

  const handleVisibilityToggle = (solutionId: string) => {
    const newVisible = new Set(visibleSolutions);
    if (newVisible.has(solutionId)) {
      newVisible.delete(solutionId);
    } else {
      newVisible.add(solutionId);
    }
    setVisibleSolutions(newVisible);
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* White Background Section - Header and Description */}
      <div className="bg-white border-b border-gray-200">
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">TCO Calculation</h1>
            <p className="text-gray-600 text-lg">
              Calculate and compare the Total Cost of Ownership for different solutions over a 5-year period
            </p>
          </div>

          {/* Objective Description */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Objective</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              This tool helps you calculate and visualize the Total Cost of Ownership (TCO) for different solutions
              across a 5-year period. By analyzing both direct costs (software licenses, implementation, hardware) and
              indirect costs (maintenance, support, training), you can make informed decisions based on comprehensive
              financial analysis. Compare multiple solutions side-by-side to identify the most cost-effective option for
              your organization.
            </p>
          </div>
        </main>
      </div>

      {/* Gray Background Section - Content */}
      <div className="bg-gray-50">
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Solution Manager */}
            <div className="lg:col-span-2">
              <TCOSolutionManager
                solutions={solutions}
                onAddSolution={handleAddSolution}
                onDeleteSolution={handleDeleteSolution}
                onUpdateSolution={handleUpdateSolution}
              />
            </div>

            {/* Right Column: Chart */}
            <div className="lg:col-span-1">
              <TCOChart
                solutions={solutions}
                visibleSolutions={visibleSolutions}
                onVisibilityToggle={handleVisibilityToggle}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

