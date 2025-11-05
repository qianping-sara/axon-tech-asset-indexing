/**
 * Tag API business logic
 */

import { prisma } from '@/lib/db/client';
import { Prisma } from '@prisma/client';

export interface TagListQuery {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface TagWithCount {
  id: string;
  name: string;
  description: string | null;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  assetCount: number;
}

/**
 * Get all tags with pagination and filtering
 */
export async function getTags(query: TagListQuery): Promise<PaginatedResponse<TagWithCount>> {
  const page = Math.max(1, query.page || 1);
  const limit = Math.min(100, Math.max(1, query.limit || 20));
  const skip = (page - 1) * limit;

  // Build where conditions
  const whereConditions: Prisma.axon_tagWhereInput[] = [];

  if (query.category) {
    whereConditions.push({ category: query.category });
  }

  if (query.search) {
    whereConditions.push({
      OR: [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ],
    });
  }

  const where: Prisma.axon_tagWhereInput =
    whereConditions.length > 0 ? { AND: whereConditions } : {};

  // Determine sort order
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sortOrder || 'desc';

  // Execute queries in parallel
  const [tags, total] = await Promise.all([
    prisma.axon_tag.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { axon_asset_tag: true },
        },
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    prisma.axon_tag.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: tags.map((tag) => ({
      ...tag,
      assetCount: tag._count.axon_asset_tag,
      _count: undefined,
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  };
}

/**
 * Get tag by ID with asset count
 */
export async function getTagById(id: string) {
  return prisma.axon_tag.findUnique({
    where: { id },
    include: {
      axon_asset_tag: {
        select: {
          axon_asset: {
            select: {
              id: true,
              name: true,
              category: true,
              status: true,
              version: true,
              owner: true,
              updatedAt: true,
            },
          },
        },
      },
      _count: {
        select: { axon_asset_tag: true },
      },
    },
  });
}

/**
 * Get tag by name
 */
export async function getTagByName(name: string) {
  return prisma.axon_tag.findUnique({
    where: { name },
    include: {
      _count: {
        select: { axon_asset_tag: true },
      },
    },
  });
}

/**
 * Create a new tag
 */
export async function createTag(data: {
  name: string;
  description?: string;
  category: string;
}) {
  const { randomUUID } = require('crypto');

  return prisma.axon_tag.create({
    data: {
      id: randomUUID(),
      ...data,
      updatedAt: new Date(),
    },
    include: {
      _count: {
        select: { axon_asset_tag: true },
      },
    },
  });
}

/**
 * Update tag
 */
export async function updateTag(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    category: string;
  }>
) {
  return prisma.axon_tag.update({
    where: { id },
    data,
    include: {
      _count: {
        select: { axon_asset_tag: true },
      },
    },
  });
}

/**
 * Delete tag
 */
export async function deleteTag(id: string) {
  return prisma.axon_tag.delete({
    where: { id },
  });
}

/**
 * Get all unique tag categories
 */
export async function getTagCategories(): Promise<string[]> {
  const tags = await prisma.axon_tag.findMany({
    select: { category: true },
    distinct: ['category'],
  });

  return tags.map((t) => t.category).sort();
}

/**
 * Get tags by category
 */
export async function getTagsByCategory(category: string) {
  return prisma.axon_tag.findMany({
    where: { category },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: { axon_asset_tag: true },
      },
    },
    orderBy: { name: 'asc' },
  });
}

