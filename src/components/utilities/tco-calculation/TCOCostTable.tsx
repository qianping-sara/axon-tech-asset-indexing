'use client';

import React from 'react';
import { Solution, CostData } from '@/lib/types/tco-calculation';
import { TCO_COST_ITEMS, getDirectCostItems, getIndirectCostItems, YEAR_KEYS } from '@/lib/constants/tco-calculation';
import { calculateYearlyTotal, calculateFiveYearTotal, calculateDirectCostsTotal, calculateIndirectCostsTotal, formatCurrency } from '@/lib/utils/tco-calculation';

interface TCOCostTableProps {
  solution: Solution;
  onCostChange: (costItemId: string, year: 'year1' | 'year2' | 'year3' | 'year4' | 'year5', value: number) => void;
}

export default function TCOCostTable({ solution, onCostChange }: TCOCostTableProps) {
  const directItems = getDirectCostItems();
  const indirectItems = getIndirectCostItems();

  const renderCostRow = (item: typeof TCO_COST_ITEMS[0]) => {
    const costs = solution.costs[item.id];
    const rowTotal = YEAR_KEYS.reduce((sum, year) => sum + (costs?.[year] || 0), 0);

    return (
      <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{item.name}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{item.category}</td>
        {YEAR_KEYS.map((year) => (
          <td key={year} className="px-2 py-3 text-sm">
            <input
              type="number"
              value={costs?.[year] || 0}
              onChange={(e) => onCostChange(item.id, year, parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-right text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="0"
            />
          </td>
        ))}
        <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900 bg-gray-50">
          {formatCurrency(rowTotal)}
        </td>
      </tr>
    );
  };

  const year1Total = calculateYearlyTotal(solution.costs, 'year1');
  const year2Total = calculateYearlyTotal(solution.costs, 'year2');
  const year3Total = calculateYearlyTotal(solution.costs, 'year3');
  const year4Total = calculateYearlyTotal(solution.costs, 'year4');
  const year5Total = calculateYearlyTotal(solution.costs, 'year5');
  const fiveYearTotal = calculateFiveYearTotal(solution.costs);
  const directTotal = calculateDirectCostsTotal(solution.costs);
  const indirectTotal = calculateIndirectCostsTotal(solution.costs);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Cost Item</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Category</th>
            <th className="px-2 py-3 text-center text-xs font-semibold text-gray-700">Year 1</th>
            <th className="px-2 py-3 text-center text-xs font-semibold text-gray-700">Year 2</th>
            <th className="px-2 py-3 text-center text-xs font-semibold text-gray-700">Year 3</th>
            <th className="px-2 py-3 text-center text-xs font-semibold text-gray-700">Year 4</th>
            <th className="px-2 py-3 text-center text-xs font-semibold text-gray-700">Year 5</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">5-Year Total</th>
          </tr>
        </thead>
        <tbody>
          {/* Direct Costs Section */}
          <tr className="bg-gray-100 border-b border-gray-300">
            <td colSpan={8} className="px-4 py-2 text-sm font-bold text-gray-900">
              Direct Costs
            </td>
          </tr>
          {directItems.map(renderCostRow)}

          {/* Indirect Costs Section */}
          <tr className="bg-gray-100 border-b border-gray-300">
            <td colSpan={8} className="px-4 py-2 text-sm font-bold text-gray-900">
              Indirect Costs
            </td>
          </tr>
          {indirectItems.map(renderCostRow)}

          {/* Subtotals */}
          <tr className="bg-gray-50 border-b border-gray-300 font-semibold">
            <td colSpan={2} className="px-4 py-3 text-sm text-gray-900">
              Direct Costs Total
            </td>
            <td className="px-4 py-3 text-sm text-right text-gray-900">{formatCurrency(directTotal / 5)}</td>
            <td colSpan={4}></td>
            <td className="px-4 py-3 text-sm text-right text-gray-900">{formatCurrency(directTotal)}</td>
          </tr>
          <tr className="bg-gray-50 border-b border-gray-300 font-semibold">
            <td colSpan={2} className="px-4 py-3 text-sm text-gray-900">
              Indirect Costs Total
            </td>
            <td className="px-4 py-3 text-sm text-right text-gray-900">{formatCurrency(indirectTotal / 5)}</td>
            <td colSpan={4}></td>
            <td className="px-4 py-3 text-sm text-right text-gray-900">{formatCurrency(indirectTotal)}</td>
          </tr>

          {/* Total Cost of Ownership */}
          <tr className="bg-green-50 border-t-2 border-green-700 font-bold">
            <td colSpan={2} className="px-4 py-3 text-sm text-green-900">
              Total Cost of Ownership (TCO)
            </td>
            <td className="px-4 py-3 text-sm text-right text-green-900">{formatCurrency(year1Total)}</td>
            <td className="px-4 py-3 text-sm text-right text-green-900">{formatCurrency(year2Total)}</td>
            <td className="px-4 py-3 text-sm text-right text-green-900">{formatCurrency(year3Total)}</td>
            <td className="px-4 py-3 text-sm text-right text-green-900">{formatCurrency(year4Total)}</td>
            <td className="px-4 py-3 text-sm text-right text-green-900">{formatCurrency(year5Total)}</td>
            <td className="px-4 py-3 text-sm text-right text-green-900">{formatCurrency(fiveYearTotal)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

