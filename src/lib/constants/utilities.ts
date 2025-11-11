/**
 * Utilities Constants
 * Configuration for CoE Utilities system
 *
 * NOTE: All utility data (name, description, icon, etc.) is now stored in the database.
 * This file only contains category definitions.
 * Do NOT duplicate utility definitions here - they should only exist in the database.
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

