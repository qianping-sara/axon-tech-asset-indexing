import { prisma } from '@/lib/db/client';
import { SearchResult } from '@/lib/types/asset';

/**
 * Search assets and tags
 */
export async function searchAssets(
  query: string,
  limit = 20
): Promise<SearchResult[]> {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.trim();

  // Search assets
  const assets = await prisma.asset.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { assetType: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
    },
    take: limit,
  });

  // Search tags
  const tags = await prisma.tag.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
    },
    take: limit,
  });

  // Combine and rank results
  const results: SearchResult[] = [
    ...assets.map((asset) => ({
      id: asset.id,
      name: asset.name,
      description: asset.description,
      category: asset.category,
      type: 'asset' as const,
      relevance: calculateRelevance(asset.name, searchTerm),
    })),
    ...tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      description: tag.description || '',
      category: tag.category,
      type: 'tag' as const,
      relevance: calculateRelevance(tag.name, searchTerm),
    })),
  ];

  // Sort by relevance
  return results.sort((a, b) => b.relevance - a.relevance).slice(0, limit);
}

/**
 * Calculate relevance score for search results
 */
function calculateRelevance(text: string, query: string): number {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  // Exact match
  if (lowerText === lowerQuery) {
    return 100;
  }

  // Starts with
  if (lowerText.startsWith(lowerQuery)) {
    return 80;
  }

  // Contains
  if (lowerText.includes(lowerQuery)) {
    return 60;
  }

  // Word match
  const words = lowerText.split(/\s+/);
  if (words.some((word) => word.startsWith(lowerQuery))) {
    return 40;
  }

  return 0;
}

/**
 * Get search suggestions
 */
export async function getSearchSuggestions(
  query: string,
  limit = 10
): Promise<string[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.trim();

  // Get asset names
  const assetNames = await prisma.asset.findMany({
    where: {
      name: { contains: searchTerm, mode: 'insensitive' },
    },
    select: {
      name: true,
    },
    distinct: ['name'],
    take: limit,
  });

  // Get tag names
  const tagNames = await prisma.tag.findMany({
    where: {
      name: { contains: searchTerm, mode: 'insensitive' },
    },
    select: {
      name: true,
    },
    distinct: ['name'],
    take: limit,
  });

  // Combine and deduplicate
  const suggestions = Array.from(
    new Set([
      ...assetNames.map((a) => a.name),
      ...tagNames.map((t) => t.name),
    ])
  ).slice(0, limit);

  return suggestions;
}

