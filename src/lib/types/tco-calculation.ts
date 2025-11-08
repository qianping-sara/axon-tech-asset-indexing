/**
 * TCO Calculation Types
 */

/**
 * Cost Item Definition
 */
export interface CostItem {
  id: string;
  name: string;
  category: 'Direct' | 'Indirect';
  description?: string;
}

/**
 * Cost Data for a single solution
 * Maps cost item ID to yearly costs
 */
export interface CostData {
  [costItemId: string]: {
    year1: number;
    year2: number;
    year3: number;
    year4: number;
    year5: number;
  };
}

/**
 * Solution for TCO Calculation
 */
export interface Solution {
  id: string;
  name: string;
  costs: CostData;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * TCO Summary for a solution
 */
export interface TCOSummary {
  solutionId: string;
  solutionName: string;
  year1Total: number;
  year2Total: number;
  year3Total: number;
  year4Total: number;
  year5Total: number;
  fiveYearTotal: number;
  directCostsTotal: number;
  indirectCostsTotal: number;
}

/**
 * Chart Data Point
 */
export interface ChartDataPoint {
  year: string;
  [key: string]: string | number;
}

/**
 * TCO Calculation State
 */
export interface TCOCalculationState {
  solutions: Solution[];
  visibleSolutions: Set<string>; // Solution IDs to display in chart
}

