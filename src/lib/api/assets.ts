import { prisma } from '@/lib/db/client';
import { AssetListQuery, AssetListItem, PaginatedResponse } from '@/lib/types/asset';
import { Prisma } from '@prisma/client';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

/**
 * Get paginated list of assets with filters
 */
export async function getAssets(
  query: AssetListQuery
): Promise<PaginatedResponse<AssetListItem>> {
  const page = Math.max(1, query.page || DEFAULT_PAGE);
  const limit = Math.min(query.limit || DEFAULT_LIMIT, MAX_LIMIT);
  const skip = (page - 1) * limit;

  // Build where clause
  const where: Prisma.AssetWhereInput = {
    AND: [
      query.category ? { category: query.category } : {},
      query.status ? { status: query.status } : {},
      query.owner ? { owner: query.owner } : {},
      query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: 'insensitive' } },
              { description: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {},
      query.tag
        ? {
            tags: {
              some: {
                tag: {
                  name: query.tag,
                },
              },
            },
          }
        : {},
    ].filter((obj) => Object.keys(obj).length > 0),
  };

  // Build order by
  const orderBy: Prisma.AssetOrderByWithRelationInput = {};
  if (query.sortBy) {
    orderBy[query.sortBy] = query.sortOrder || 'desc';
  } else {
    orderBy.updatedAt = 'desc';
  }

  // Execute queries in parallel
  const [assets, total] = await Promise.all([
    prisma.asset.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        assetType: true,
        version: true,
        status: true,
        owner: true,
        updatedAt: true,
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
                category: true,
              },
            },
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.asset.count({ where }),
  ]);

  // Transform data
  const data: AssetListItem[] = assets.map((asset) => ({
    ...asset,
    tags: asset.tags.map((at) => at.tag),
  }));

  const totalPages = Math.ceil(total / limit);

  return {
    data,
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
 * Get single asset by ID with all relations
 */
export async function getAssetById(id: string) {
  return prisma.asset.findUnique({
    where: { id },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
      relations: {
        include: {
          toAsset: {
            select: {
              id: true,
              name: true,
              category: true,
            },
          },
        },
      },
      relatedBy: {
        include: {
          fromAsset: {
            select: {
              id: true,
              name: true,
              category: true,
            },
          },
        },
      },
      versions: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
}

/**
 * Create new asset
 */
export async function createAsset(data: {
  name: string;
  description: string;
  category: string;
  assetType: string;
  version: string;
  status: string;
  owner: string;
  contentPath: string;
  contentHash: string;
  sourceSystem: string;
  sourceLink: string;
  tags?: string[];
}) {
  return prisma.asset.create({
    data: {
      name: data.name,
      description: data.description,
      category: data.category as any,
      assetType: data.assetType,
      version: data.version,
      status: data.status as any,
      owner: data.owner,
      contentPath: data.contentPath,
      contentHash: data.contentHash,
      sourceSystem: data.sourceSystem,
      sourceLink: data.sourceLink,
      tags: data.tags
        ? {
            create: data.tags.map((tagId) => ({
              tagId,
            })),
          }
        : undefined,
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
}

/**
 * Update asset
 */
export async function updateAsset(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    status: string;
    version: string;
    contentHash: string;
  }>
) {
  return prisma.asset.update({
    where: { id },
    data: {
      ...data,
      status: data.status ? (data.status as any) : undefined,
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
}

/**
 * Delete asset
 */
export async function deleteAsset(id: string) {
  return prisma.asset.delete({
    where: { id },
  });
}

/**
 * Get assets by category
 */
export async function getAssetsByCategory(category: string, limit = 10) {
  return prisma.asset.findMany({
    where: { category },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      assetType: true,
      version: true,
      status: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
    take: limit,
  });
}

/**
 * Get assets by tag
 */
export async function getAssetsByTag(tagName: string, limit = 10) {
  return prisma.asset.findMany({
    where: {
      tags: {
        some: {
          tag: {
            name: tagName,
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      assetType: true,
      version: true,
      status: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
    take: limit,
  });
}

