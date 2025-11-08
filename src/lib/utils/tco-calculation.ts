/**
 * TCO Calculation Utilities
 */

import { Solution, TCOSummary, ChartDataPoint, CostData } from '@/lib/types/tco-calculation';
import { TCO_COST_ITEMS, getDirectCostItems, getIndirectCostItems, YEAR_KEYS } from '@/lib/constants/tco-calculation';

/**
 * Calculate yearly total for a solution
 */
export function calculateYearlyTotal(costs: CostData, year: 'year1' | 'year2' | 'year3' | 'year4' | 'year5'): number {
  return TCO_COST_ITEMS.reduce((total, item) => {
    const costValue = costs[item.id]?.[year] || 0;
    return total + costValue;
  }, 0);
}

/**
 * Calculate 5-year total for a solution
 */
export function calculateFiveYearTotal(costs: CostData): number {
  let total = 0;
  YEAR_KEYS.forEach((year) => {
    total += calculateYearlyTotal(costs, year);
  });
  return total;
}

/**
 * Calculate direct costs total for a solution
 */
export function calculateDirectCostsTotal(costs: CostData): number {
  const directItems = getDirectCostItems();
  let total = 0;
  YEAR_KEYS.forEach((year) => {
    directItems.forEach((item) => {
      total += costs[item.id]?.[year] || 0;
    });
  });
  return total;
}

/**
 * Calculate indirect costs total for a solution
 */
export function calculateIndirectCostsTotal(costs: CostData): number {
  const indirectItems = getIndirectCostItems();
  let total = 0;
  YEAR_KEYS.forEach((year) => {
    indirectItems.forEach((item) => {
      total += costs[item.id]?.[year] || 0;
    });
  });
  return total;
}

/**
 * Generate TCO Summary for a solution
 */
export function generateTCOSummary(solution: Solution): TCOSummary {
  return {
    solutionId: solution.id,
    solutionName: solution.name,
    year1Total: calculateYearlyTotal(solution.costs, 'year1'),
    year2Total: calculateYearlyTotal(solution.costs, 'year2'),
    year3Total: calculateYearlyTotal(solution.costs, 'year3'),
    year4Total: calculateYearlyTotal(solution.costs, 'year4'),
    year5Total: calculateYearlyTotal(solution.costs, 'year5'),
    fiveYearTotal: calculateFiveYearTotal(solution.costs),
    directCostsTotal: calculateDirectCostsTotal(solution.costs),
    indirectCostsTotal: calculateIndirectCostsTotal(solution.costs),
  };
}

/**
 * Generate chart data from solutions
 */
export function generateChartData(solutions: Solution[]): ChartDataPoint[] {
  const chartData: ChartDataPoint[] = [
    { year: 'Year 1' },
    { year: 'Year 2' },
    { year: 'Year 3' },
    { year: 'Year 4' },
    { year: 'Year 5' },
  ];

  solutions.forEach((solution) => {
    chartData[0][solution.id] = calculateYearlyTotal(solution.costs, 'year1');
    chartData[1][solution.id] = calculateYearlyTotal(solution.costs, 'year2');
    chartData[2][solution.id] = calculateYearlyTotal(solution.costs, 'year3');
    chartData[3][solution.id] = calculateYearlyTotal(solution.costs, 'year4');
    chartData[4][solution.id] = calculateYearlyTotal(solution.costs, 'year5');
  });

  return chartData;
}

/**
 * Create empty cost data for a new solution
 */
export function createEmptyCostData(): CostData {
  const costData: CostData = {};
  TCO_COST_ITEMS.forEach((item) => {
    costData[item.id] = {
      year1: 0,
      year2: 0,
      year3: 0,
      year4: 0,
      year5: 0,
    };
  });
  return costData;
}

/**
 * Create a new solution
 */
export function createNewSolution(name: string): Solution {
  return {
    id: `solution-${Date.now()}`,
    name,
    costs: createEmptyCostData(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Export solutions to CSV format
 */
export function exportToCSV(solutions: Solution[]): string {
  if (solutions.length === 0) {
    return '';
  }

  const lines: string[] = [];

  // Header row
  const headers = ['Cost Item', 'Category', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', '5-Year Total'];
  lines.push(headers.join(','));

  // For each solution
  solutions.forEach((solution, solutionIndex) => {
    // Add solution name as a section header
    if (solutionIndex > 0) {
      lines.push(''); // Empty line between solutions
    }
    lines.push(`${solution.name},,,,,,`);

    // Direct Costs Section
    lines.push('Direct Costs,,,,,,');
    const directItems = getDirectCostItems();
    directItems.forEach((item) => {
      const costs = solution.costs[item.id];
      const year1 = costs?.year1 || 0;
      const year2 = costs?.year2 || 0;
      const year3 = costs?.year3 || 0;
      const year4 = costs?.year4 || 0;
      const year5 = costs?.year5 || 0;
      const total = year1 + year2 + year3 + year4 + year5;
      lines.push(`${item.name},${item.category},${year1},${year2},${year3},${year4},${year5},${total}`);
    });

    // Indirect Costs Section
    lines.push('Indirect Costs,,,,,,');
    const indirectItems = getIndirectCostItems();
    indirectItems.forEach((item) => {
      const costs = solution.costs[item.id];
      const year1 = costs?.year1 || 0;
      const year2 = costs?.year2 || 0;
      const year3 = costs?.year3 || 0;
      const year4 = costs?.year4 || 0;
      const year5 = costs?.year5 || 0;
      const total = year1 + year2 + year3 + year4 + year5;
      lines.push(`${item.name},${item.category},${year1},${year2},${year3},${year4},${year5},${total}`);
    });

    // Totals
    const directTotal = calculateDirectCostsTotal(solution.costs);
    const indirectTotal = calculateIndirectCostsTotal(solution.costs);
    const fiveYearTotal = calculateFiveYearTotal(solution.costs);
    lines.push(`Direct Costs Total,,${directTotal / 5},,,,${directTotal}`);
    lines.push(`Indirect Costs Total,,${indirectTotal / 5},,,,${indirectTotal}`);
    lines.push(`Total Cost of Ownership,,,,,,,${fiveYearTotal}`);
  });

  return lines.join('\n');
}

/**
 * Download CSV file
 */
export function downloadCSV(solutions: Solution[]): void {
  const csv = exportToCSV(solutions);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `tco-calculation-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

