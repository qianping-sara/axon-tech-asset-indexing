/**
 * Asset Classification Constants
 * Based on CLASSIFICATION_QUICK_GUIDE.md
 */

export interface CategoryInfo {
  name: string;
  displayName: string;
  description: string;
  icon: string;
  assetTypes: string[];
}

export interface AssetTypeInfo {
  name: string;
  description: string;
}

/**
 * 6 Primary Categories with Asset Types
 */
export const CATEGORIES: CategoryInfo[] = [
  {
    name: 'CODE_COMPONENTS',
    displayName: 'Code & Components',
    description: 'Scripts, libraries, frameworks, components, and reusable code modules',
    icon: '💻',
    assetTypes: [
      'Scripts',
      'Frontend Components',
      'Backend Libraries',
      'Development Frameworks',
      'Open Source Projects',
    ],
  },
  {
    name: 'SERVICES_APIS',
    displayName: 'Services & APIs',
    description: 'REST APIs, GraphQL endpoints, microservices, and web services',
    icon: '🔌',
    assetTypes: [
      'REST APIs',
      'GraphQL APIs',
      'Microservices',
      'Integration Services',
    ],
  },
  {
    name: 'AI_ML_SERVICES',
    displayName: 'AI/ML Services',
    description: 'Machine learning models, LLM services, AI agents, and ML pipelines',
    icon: '🤖',
    assetTypes: [
      'ML Models',
      'LLM Services',
      'AI Agents',
      'ML Pipelines',
      'Feature Stores',
    ],
  },
  {
    name: 'AUTOMATION_WORKFLOWS',
    displayName: 'Automation & Workflows',
    description: 'RPA bots, workflows, processes, and automation scripts',
    icon: '⚙️',
    assetTypes: [
      'RPA Bots',
      'No-Code Workflows',
      'Business Processes',
      'Scheduled Jobs',
    ],
  },
  {
    name: 'DATA_ANALYTICS',
    displayName: 'Data & Analytics',
    description: 'Data products, schemas, pipelines, and analytics solutions',
    icon: '📊',
    assetTypes: [
      'Data Products',
      'Data Schemas',
      'Datasets',
      'Data Pipelines',
      'Data Dictionaries',
    ],
  },
  {
    name: 'ARCHITECTURE_GOVERNANCE',
    displayName: 'Architecture & Governance',
    description: 'Architectures, patterns, standards, policies, and governance frameworks',
    icon: '🏗️',
    assetTypes: [
      'Reference Architectures',
      'Solution Patterns',
      'Technology Stacks',
      'Standards',
      'Principles',
      'Checklists',
      'Policies',
      'Decision Records',
    ],
  },
  {
    name: 'KNOWLEDGE_PRACTICES',
    displayName: 'Knowledge & Practices',
    description: 'SOPs, playbooks, tutorials, guides, and best practices',
    icon: '📚',
    assetTypes: [
      'SOPs',
      'Playbooks',
      'Best Practices',
      'Tutorials',
      'Quick Start Guides',
    ],
  },
];

/**
 * Asset Types by Category (for quick lookup)
 */
export const ASSET_TYPES_BY_CATEGORY: Record<string, string[]> = {
  CODE_COMPONENTS: [
    'Scripts',
    'Frontend Components',
    'Backend Libraries',
    'Development Frameworks',
    'Open Source Projects',
  ],
  SERVICES_APIS: [
    'REST APIs',
    'GraphQL APIs',
    'Microservices',
    'Integration Services',
  ],
  AI_ML_SERVICES: [
    'ML Models',
    'LLM Services',
    'AI Agents',
    'ML Pipelines',
    'Feature Stores',
  ],
  AUTOMATION_WORKFLOWS: [
    'RPA Bots',
    'No-Code Workflows',
    'Business Processes',
    'Scheduled Jobs',
  ],
  DATA_ANALYTICS: [
    'Data Products',
    'Data Schemas',
    'Datasets',
    'Data Pipelines',
    'Data Dictionaries',
  ],
  ARCHITECTURE_GOVERNANCE: [
    'Reference Architectures',
    'Solution Patterns',
    'Technology Stacks',
    'Standards',
    'Principles',
    'Checklists',
    'Policies',
    'Decision Records',
  ],
  KNOWLEDGE_PRACTICES: [
    'SOPs',
    'Playbooks',
    'Best Practices',
    'Tutorials',
    'Quick Start Guides',
  ],
};

/**
 * All Asset Types (flattened)
 */
export const ALL_ASSET_TYPES: string[] = [
  'Scripts',
  'Frontend Components',
  'Backend Libraries',
  'Development Frameworks',
  'Open Source Projects',
  'REST APIs',
  'GraphQL APIs',
  'Microservices',
  'Integration Services',
  'ML Models',
  'LLM Services',
  'AI Agents',
  'ML Pipelines',
  'Feature Stores',
  'RPA Bots',
  'No-Code Workflows',
  'Business Processes',
  'Scheduled Jobs',
  'Data Products',
  'Data Schemas',
  'Datasets',
  'Data Pipelines',
  'Data Dictionaries',
  'Reference Architectures',
  'Solution Patterns',
  'Technology Stacks',
  'Standards',
  'Principles',
  'Checklists',
  'Policies',
  'Decision Records',
  'SOPs',
  'Playbooks',
  'Best Practices',
  'Tutorials',
  'Quick Start Guides',
];

/**
 * Get category info by name
 */
export function getCategoryByName(name: string): CategoryInfo | undefined {
  return CATEGORIES.find((cat) => cat.name === name);
}

/**
 * Get asset types for a category
 */
export function getAssetTypesForCategory(categoryName: string): string[] {
  return ASSET_TYPES_BY_CATEGORY[categoryName] || [];
}

/**
 * Get all category names
 */
export function getAllCategoryNames(): string[] {
  return CATEGORIES.map((cat) => cat.name);
}

/**
 * Check if asset type is valid
 */
export function isValidAssetType(assetType: string): boolean {
  return ALL_ASSET_TYPES.includes(assetType);
}

/**
 * Check if asset type belongs to category
 */
export function isAssetTypeInCategory(assetType: string, categoryName: string): boolean {
  const types = getAssetTypesForCategory(categoryName);
  return types.includes(assetType);
}

