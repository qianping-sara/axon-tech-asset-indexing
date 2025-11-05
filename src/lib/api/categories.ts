/**
 * Category API business logic
 */

import { prisma } from '@/lib/db/client';
import { Category } from '@prisma/client';

export interface CategoryDetail {
  name: Category;
  description: string;
  assetCount: number;
  assets: Array<{
    id: string;
    name: string;
    status: string;
    version: string;
    owner: string;
    updatedAt: Date;
  }>;
}

/**
 * Category metadata
 */
const CATEGORY_METADATA: Record<Category, { description: string; icon?: string }> = {
  CODE_COMPONENTS: {
    description: 'Scripts, libraries, frameworks, components, and reusable code modules',
    icon: '💻',
  },
  SERVICES_APIS: {
    description: 'REST APIs, GraphQL endpoints, microservices, and web services',
    icon: '🔌',
  },
  AI_ML_SERVICES: {
    description: 'Machine learning models, LLM services, AI agents, ML pipelines, and feature stores',
    icon: '🤖',
  },
  AUTOMATION_WORKFLOWS: {
    description: 'RPA bots, workflows, processes, and automation scripts',
    icon: '⚙️',
  },
  DATA_ANALYTICS: {
    description: 'Data products, schemas, pipelines, and analytics solutions',
    icon: '📊',
  },
  ARCHITECTURE_GOVERNANCE: {
    description: 'Architectures, patterns, standards, policies, and governance frameworks',
    icon: '🏗️',
  },
  KNOWLEDGE_PRACTICES: {
    description: 'SOPs, playbooks, tutorials, guides, and best practices',
    icon: '📚',
  },
};

/**
 * Get all categories with asset counts
 */
export async function getCategories() {
  const categories = Object.values(Category) as Category[];

  // Get asset counts for each category
  const counts = await prisma.axon_asset.groupBy({
    by: ['category'],
    _count: {
      id: true,
    },
  });

  const countMap = new Map(counts.map((c) => [c.category, c._count.id]));

  return categories.map((category) => ({
    name: category,
    description: CATEGORY_METADATA[category].description,
    icon: CATEGORY_METADATA[category].icon,
    assetCount: countMap.get(category) || 0,
  }));
}

/**
 * Get category details with assets
 */
export async function getCategoryDetail(categoryName: string): Promise<CategoryDetail | null> {
  // Validate category
  if (!Object.values(Category).includes(categoryName as Category)) {
    return null;
  }

  const category = categoryName as Category;

  // Get assets in this category
  const assets = await prisma.axon_asset.findMany({
    where: { category },
    select: {
      id: true,
      name: true,
      status: true,
      version: true,
      owner: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
  });

  return {
    name: category,
    description: CATEGORY_METADATA[category].description,
    assetCount: assets.length,
    assets,
  };
}

/**
 * Get category statistics
 */
export async function getCategoryStats() {
  const categories = Object.values(Category) as Category[];

  const stats = await Promise.all(
    categories.map(async (category) => {
      const [total, published, draft, deprecated, archived] = await Promise.all([
        prisma.axon_asset.count({ where: { category } }),
        prisma.axon_asset.count({ where: { category, status: 'PUBLISHED' } }),
        prisma.axon_asset.count({ where: { category, status: 'DRAFT' } }),
        prisma.axon_asset.count({ where: { category, status: 'DEPRECATED' } }),
        prisma.axon_asset.count({ where: { category, status: 'ARCHIVED' } }),
      ]);

      return {
        name: category,
        description: CATEGORY_METADATA[category].description,
        assetCount: total,
        total,
        published,
        draft,
        deprecated,
        archived,
      };
    })
  );

  return stats;
}

/**
 * Get valid category names
 */
export function getValidCategories(): Category[] {
  return Object.values(Category) as Category[];
}

/**
 * Check if category is valid
 */
export function isValidCategory(category: string): category is Category {
  return Object.values(Category).includes(category as Category);
}

