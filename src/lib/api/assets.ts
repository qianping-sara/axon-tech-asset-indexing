import { prisma } from '@/lib/db/client';
import { AssetListQuery, AssetListItem, PaginatedResponse } from '@/lib/types/asset';
import { Category, Status } from '@prisma/client';

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
  const whereConditions: any[] = [];

  if (query.category) {
    whereConditions.push({ category: query.category as Category });
  }
  if (query.assetType) {
    whereConditions.push({ assetType: { equals: query.assetType, mode: 'insensitive' } });
  }
  if (query.status) {
    whereConditions.push({ status: query.status as Status });
  }
  if (query.owner) {
    whereConditions.push({ owner: query.owner });
  }
  if (query.search) {
    whereConditions.push({
      OR: [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ],
    });
  }
  if (query.tag) {
    whereConditions.push({
      axon_asset_tag: {
        some: {
          axon_tag: {
            name: query.tag,
          },
        },
      },
    });
  }

  const where: any =
    whereConditions.length > 0 ? { AND: whereConditions } : {};

  // Build order by
  const orderBy: any = {};
  if (query.sortBy) {
    orderBy[query.sortBy] = query.sortOrder || 'desc';
  } else {
    orderBy.updatedAt = 'desc';
  }

  // Execute queries in parallel
  const [assets, total] = await Promise.all([
    prisma.axon_asset.findMany({
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
        axon_asset_tag: {
          select: {
            axon_tag: {
              select: {
                id: true,
                name: true,
                description: true,
                category: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.axon_asset.count({ where }),
  ]);

  // Transform data
  const data: AssetListItem[] = assets.map((asset) => ({
    ...asset,
    axon_asset_tag: asset.axon_asset_tag.map((at) => at.axon_tag),
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
  return prisma.axon_asset.findUnique({
    where: { id },
    include: {
      axon_asset_tag: {
        include: {
          axon_tag: true,
        },
      },
      axon_asset_relation_axon_asset_relation_fromAssetIdToaxon_asset: {
        include: {
          axon_asset_axon_asset_relation_toAssetIdToaxon_asset: {
            select: {
              id: true,
              name: true,
              category: true,
            },
          },
        },
      },
      axon_asset_relation_axon_asset_relation_toAssetIdToaxon_asset: {
        include: {
          axon_asset_axon_asset_relation_fromAssetIdToaxon_asset: {
            select: {
              id: true,
              name: true,
              category: true,
            },
          },
        },
      },
      axon_asset_version: {
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
  return prisma.axon_asset.create({
    data: {
      name: data.name,
      description: data.description,
      category: data.category as Category,
      assetType: data.assetType,
      version: data.version,
      status: data.status as Status,
      owner: data.owner,
      contentPath: data.contentPath,
      contentHash: data.contentHash,
      sourceSystem: data.sourceSystem,
      sourceLink: data.sourceLink,
      axon_asset_tag: data.tags
        ? {
            create: data.tags.map((tagId) => ({
              tagId,
            })),
          }
        : undefined,
    },
    include: {
      axon_asset_tag: {
        include: {
          axon_tag: true,
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
  return prisma.axon_asset.update({
    where: { id },
    data: {
      ...data,
      status: data.status ? (data.status as Status) : undefined,
    },
    include: {
      axon_asset_tag: {
        include: {
          axon_tag: true,
        },
      },
    },
  });
}

/**
 * Delete asset
 */
export async function deleteAsset(id: string) {
  return prisma.axon_asset.delete({
    where: { id },
  });
}

/**
 * Get assets by category
 */
export async function getAssetsByCategory(category: string, limit = 10) {
  return prisma.axon_asset.findMany({
    where: { category: category as Category },
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
  return prisma.axon_asset.findMany({
    where: {
      axon_asset_tag: {
        some: {
          axon_tag: {
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

