import { axon_asset, axon_tag, axon_asset_tag, axon_asset_relation, axon_asset_version } from '@prisma/client';

/**
 * Asset with all relations
 */
export type AssetWithRelations = axon_asset & {
  axon_asset_tag: (axon_asset_tag & { axon_tag: axon_tag })[];
  axon_asset_relation_axon_asset_relation_fromAssetIdToaxon_asset: (axon_asset_relation & { axon_asset_axon_asset_relation_toAssetIdToaxon_asset: axon_asset })[];
  axon_asset_relation_axon_asset_relation_toAssetIdToaxon_asset: (axon_asset_relation & { axon_asset_axon_asset_relation_fromAssetIdToaxon_asset: axon_asset })[];
  axon_asset_version: axon_asset_version[];
};

/**
 * Asset list item (simplified for list view)
 */
export type AssetListItem = Pick<
  axon_asset,
  'id' | 'name' | 'description' | 'category' | 'assetType' | 'version' | 'status' | 'owner' | 'bizDomain' | 'updatedAt'
> & {
  axon_asset_tag: axon_tag[];
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
  bizDomain?: string;
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

