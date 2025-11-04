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
  const whereConditions: Prisma.TagWhereInput[] = [];

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

  const where: Prisma.TagWhereInput =
    whereConditions.length > 0 ? { AND: whereConditions } : {};

  // Determine sort order
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sortOrder || 'desc';

  // Execute queries in parallel
  const [tags, total] = await Promise.all([
    prisma.tag.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { assets: true },
        },
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    prisma.tag.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: tags.map((tag) => ({
      ...tag,
      assetCount: tag._count.assets,
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
  return prisma.tag.findUnique({
    where: { id },
    include: {
      assets: {
        select: {
          asset: {
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
        select: { assets: true },
      },
    },
  });
}

/**
 * Get tag by name
 */
export async function getTagByName(name: string) {
  return prisma.tag.findUnique({
    where: { name },
    include: {
      _count: {
        select: { assets: true },
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
  return prisma.tag.create({
    data,
    include: {
      _count: {
        select: { assets: true },
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
  return prisma.tag.update({
    where: { id },
    data,
    include: {
      _count: {
        select: { assets: true },
      },
    },
  });
}

/**
 * Delete tag
 */
export async function deleteTag(id: string) {
  return prisma.tag.delete({
    where: { id },
  });
}

/**
 * Get all unique tag categories
 */
export async function getTagCategories(): Promise<string[]> {
  const tags = await prisma.tag.findMany({
    select: { category: true },
    distinct: ['category'],
  });

  return tags.map((t) => t.category).sort();
}

/**
 * Get tags by category
 */
export async function getTagsByCategory(category: string) {
  return prisma.tag.findMany({
    where: { category },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: { assets: true },
      },
    },
    orderBy: { name: 'asc' },
  });
}

