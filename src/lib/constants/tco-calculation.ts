/**
 * TCO Calculation Constants
 */

import { CostItem } from '@/lib/types/tco-calculation';

/**
 * Cost Items for TCO Calculation
 * 12 items total: 5 Direct + 7 Indirect
 */
export const TCO_COST_ITEMS: CostItem[] = [
  // Direct Costs
  {
    id: 'software-license',
    name: 'Software License/Subscription Fees',
    category: 'Direct',
    description: 'Annual software licensing or subscription costs',
  },
  {
    id: 'implementation',
    name: 'Initial Implementation & Configuration Costs',
    category: 'Direct',
    description: 'One-time costs for system setup and configuration',
  },
  {
    id: 'data-migration',
    name: 'Data Migration Costs',
    category: 'Direct',
    description: 'Costs associated with migrating data from legacy systems',
  },
  {
    id: 'hardware',
    name: 'Hardware/Infrastructure Costs',
    category: 'Direct',
    description: 'Hardware, servers, and infrastructure investments',
  },
  {
    id: 'initial-training',
    name: 'Initial User Training',
    category: 'Direct',
    description: 'One-time training costs for end users',
  },

  // Indirect Costs
  {
    id: 'maintenance-support',
    name: 'Ongoing Maintenance & Support Fees',
    category: 'Indirect',
    description: 'Annual maintenance and vendor support costs',
  },
  {
    id: 'integration-development',
    name: 'Integration Development & Maintenance',
    category: 'Indirect',
    description: 'Costs for integrating with other systems and ongoing maintenance',
  },
  {
    id: 'it-staff-time',
    name: 'Internal IT Staff Management Time',
    category: 'Indirect',
    description: 'Internal IT resources spent on system management',
  },
  {
    id: 'ongoing-training',
    name: 'Ongoing/Advanced Training',
    category: 'Indirect',
    description: 'Continuous training and skill development costs',
  },
  {
    id: 'downtime-opportunity',
    name: 'Downtime/Opportunity Costs',
    category: 'Indirect',
    description: 'Costs associated with system downtime and lost productivity',
  },
  {
    id: 'security-compliance',
    name: 'Security & Compliance Audit Costs',
    category: 'Indirect',
    description: 'Costs for security audits and compliance verification',
  },
  {
    id: 'decommissioning',
    name: 'System Decommissioning Costs',
    category: 'Indirect',
    description: 'End-of-life costs for system retirement and data disposal',
  },
];

/**
 * Get cost item by ID
 */
export function getCostItemById(id: string): CostItem | undefined {
  return TCO_COST_ITEMS.find((item) => item.id === id);
}

/**
 * Get all direct cost items
 */
export function getDirectCostItems(): CostItem[] {
  return TCO_COST_ITEMS.filter((item) => item.category === 'Direct');
}

/**
 * Get all indirect cost items
 */
export function getIndirectCostItems(): CostItem[] {
  return TCO_COST_ITEMS.filter((item) => item.category === 'Indirect');
}

/**
 * Years for TCO calculation
 */
export const TCO_YEARS = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'] as const;

/**
 * Year keys for data access
 */
export const YEAR_KEYS = ['year1', 'year2', 'year3', 'year4', 'year5'] as const;

