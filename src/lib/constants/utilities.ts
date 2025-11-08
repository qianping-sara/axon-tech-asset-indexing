/**
 * Utilities Constants
 * Configuration for CoE Utilities system
 */

import { UtilityCategory } from '@/lib/types/utility';

/**
 * Utility Categories
 * Currently only Decision Support, can be extended in the future
 */
export const UTILITY_CATEGORIES: UtilityCategory[] = [
  {
    id: 'decision-support',
    name: 'Decision Support',
  },
];

/**
 * Initial Decision Support Tools
 * These are the tools that will be seeded into the database
 */
export const DECISION_SUPPORT_TOOLS = [
  {
    id: 'tool-business-case',
    name: 'Business Case and Strategic Alignment',
    description: 'Validating the legitimacy of the business need and its alignment with corporate strategy',
    category: 'decision-support',
    icon: 'briefcase', // lucide-react icon
    url: '/utilities/business-case',
    version: '1.0.0',
    status: 'PUBLISHED' as const,
    owner: 'AutomationCoE Team',
    tags: ['decision-support', 'business-case', 'strategy'],
  },
  {
    id: 'tool-sourcing-model',
    name: 'Sourcing Model Analysis',
    description: 'Making a strategic decision on the sourcing model: Build, Buy, or Open Source',
    category: 'decision-support',
    icon: 'bar-chart-3', // lucide-react icon
    url: '/utilities/sourcing-model',
    version: '1.0.0',
    status: 'PUBLISHED' as const,
    owner: 'AutomationCoE Team',
    tags: ['decision-support', 'sourcing-model', 'build-buy-oss'],
  },
];

/**
 * Get category name by ID
 */
export function getCategoryName(categoryId: string): string {
  const category = UTILITY_CATEGORIES.find((c) => c.id === categoryId);
  return category?.name || 'Unknown';
}

/**
 * Get all category IDs
 */
export function getAllCategoryIds(): string[] {
  return UTILITY_CATEGORIES.map((c) => c.id);
}

