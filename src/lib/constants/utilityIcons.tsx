/**
 * Utility Icon Components
 * Maps icon names (stored in database) to lucide-react components
 *
 * This file is the ONLY place where icon names are mapped to React components.
 * Icon names are stored in the database (axon_utility.icon field).
 * When adding a new icon:
 * 1. Add the icon import from lucide-react
 * 2. Add the mapping in UTILITY_ICON_MAP
 * 3. Update the database record with the icon name
 */

import React from 'react';
import {
  Briefcase,
  BarChart3,
  Zap,
  TrendingUp,
  Package,
  Settings,
  Database,
  Code2,
  Calculator,
  Filter,
} from 'lucide-react';

export const UTILITY_ICON_MAP: Record<string, React.ReactNode> = {
  'briefcase': <Briefcase className="w-8 h-8 text-green-700" />,
  'bar-chart-3': <BarChart3 className="w-8 h-8 text-green-700" />,
  'zap': <Zap className="w-8 h-8 text-green-700" />,
  'trending-up': <TrendingUp className="w-8 h-8 text-green-700" />,
  'package': <Package className="w-8 h-8 text-green-700" />,
  'settings': <Settings className="w-8 h-8 text-green-700" />,
  'database': <Database className="w-8 h-8 text-green-700" />,
  'code-2': <Code2 className="w-8 h-8 text-green-700" />,
  'calculator': <Calculator className="w-8 h-8 text-green-700" />,
  'filter': <Filter className="w-8 h-8 text-green-700" />,
};

/**
 * Get lucide-react icon component by icon name
 * @param iconName - The icon name
 * @returns React component or default package icon
 */
export function getUtilityIconComponent(iconName: string): React.ReactNode {
  return UTILITY_ICON_MAP[iconName] || UTILITY_ICON_MAP['package'];
}

