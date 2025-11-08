'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import TCOObjective from '@/components/utilities/tco-calculation/TCOObjective';
import TCOSolutionManager from '@/components/utilities/tco-calculation/TCOSolutionManager';
import TCOChart from '@/components/utilities/tco-calculation/TCOChart';
import { Solution } from '@/lib/types/tco-calculation';
import { createNewSolution, downloadCSV } from '@/lib/utils/tco-calculation';
import { ArrowLeft, Download } from 'lucide-react';

export default function TCOCalculationPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [visibleSolutions, setVisibleSolutions] = useState<Set<string>>(new Set());

  // Load solutions from localStorage on mount, or create default Solution A
  useEffect(() => {
    const saved = localStorage.getItem('tco-solutions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSolutions(parsed);
        setVisibleSolutions(new Set(parsed.map((s: Solution) => s.id)));
      } catch (error) {
        console.error('Failed to load solutions:', error);
        // Create default Solution A if loading fails
        const defaultSolution = createNewSolution('Solution A');
        setSolutions([defaultSolution]);
        setVisibleSolutions(new Set([defaultSolution.id]));
      }
    } else {
      // Create default Solution A on first load
      const defaultSolution = createNewSolution('Solution A');
      setSolutions([defaultSolution]);
      setVisibleSolutions(new Set([defaultSolution.id]));
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
          <h1 className="text-3xl font-bold text-gray-900">TCO Calculation</h1>
        </div>

        {/* Objective Section */}
        <div className="mb-8">
          <TCOObjective />
        </div>

        {/* Download Button */}
        {solutions.length > 0 && (
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => downloadCSV(solutions)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium text-sm"
            >
              <Download className="w-4 h-4" />
              Download CSV
            </button>
          </div>
        )}

        {/* Content Grid */}
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
  );
}

