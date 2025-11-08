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

