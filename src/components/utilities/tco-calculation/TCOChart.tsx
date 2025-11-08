'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Solution, ChartDataPoint } from '@/lib/types/tco-calculation';
import { generateChartData, formatCurrency } from '@/lib/utils/tco-calculation';

interface TCOChartProps {
  solutions: Solution[];
  visibleSolutions: Set<string>;
  onVisibilityToggle: (solutionId: string) => void;
}

// Color palette for solutions
const SOLUTION_COLORS: Record<number, string> = {
  0: '#15803d', // green-700
  1: '#4b5563', // gray-600
  2: '#9ca3af', // gray-400
  3: '#d1d5db', // gray-300
  4: '#e5e7eb', // gray-200
};

export default function TCOChart({ solutions, visibleSolutions, onVisibilityToggle }: TCOChartProps) {
  const chartData = generateChartData(solutions);

  const handleLegendClick = (data: any) => {
    const solutionId = data.dataKey;
    onVisibilityToggle(solutionId);
  };

  const customTooltip = (props: any) => {
    const { active, payload, label } = props;
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="text-sm font-semibold text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">TCO Trend (5-Year)</h3>

      {solutions.length === 0 ? (
        <div className="flex items-center justify-center h-96 text-gray-500">
          <p>Add solutions to view TCO trends</p>
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
              <Tooltip content={customTooltip} />
              <Legend
                onClick={(e) => handleLegendClick(e)}
                wrapperStyle={{ cursor: 'pointer', paddingTop: '20px' }}
              />

              {solutions.map((solution, index) => (
                visibleSolutions.has(solution.id) && (
                  <Line
                    key={solution.id}
                    type="monotone"
                    dataKey={solution.id}
                    name={solution.name}
                    stroke={SOLUTION_COLORS[index] || '#9ca3af'}
                    strokeWidth={2}
                    dot={{ fill: SOLUTION_COLORS[index] || '#9ca3af', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>

          {/* Legend with Checkboxes */}
          <div className="mt-6 flex flex-wrap gap-4">
            {solutions.map((solution, index) => (
              <label
                key={solution.id}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <input
                  type="checkbox"
                  checked={visibleSolutions.has(solution.id)}
                  onChange={() => onVisibilityToggle(solution.id)}
                  className={`w-4 h-4 rounded border-2 transition-colors ${
                    visibleSolutions.has(solution.id)
                      ? 'border-green-700 bg-green-700 text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                />
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: SOLUTION_COLORS[index] || '#9ca3af' }}
                ></span>
                <span className="text-sm text-gray-700">
                  {solution.name}
                </span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

