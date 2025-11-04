import { Asset, Tag, AssetTag, AssetRelation, AssetVersion } from '@prisma/client';

/**
 * Asset with all relations
 */
export type AssetWithRelations = Asset & {
  tags: (AssetTag & { tag: Tag })[];
  relations: (AssetRelation & { toAsset: Asset })[];
  relatedBy: (AssetRelation & { fromAsset: Asset })[];
  versions: AssetVersion[];
};

/**
 * Asset list item (simplified for list view)
 */
export type AssetListItem = Pick<
  Asset,
  'id' | 'name' | 'description' | 'category' | 'assetType' | 'version' | 'status' | 'owner' | 'updatedAt'
> & {
  tags: Tag[];
};

/**
 * Query parameters for asset list
 */
export interface AssetListQuery {
  page?: number;
  limit?: number;
  category?: string;
  assetType?: string;
  status?: string;
  tag?: string;
  search?: string;
  owner?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'name';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response
 */
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

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Search result
 */
export interface SearchResult {
  id: string;
  name: string;
  description: string;
  category: string;
  type: 'asset' | 'tag';
  relevance: number;
}

