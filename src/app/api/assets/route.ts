import { NextRequest, NextResponse } from 'next/server';
import { getAssets, createAsset } from '@/lib/api/assets';
import { AssetListQuery } from '@/lib/types/asset';
import { validateAssetCreation } from '@/lib/utils/validation';

/**
 * GET /api/assets
 * Get paginated list of assets with filters
 *
 * Query parameters:
 * - page: number (default: 1)
 * - limit: number (default: 20, max: 100)
 * - category: string (e.g., CODE_COMPONENTS)
 * - assetType: string (e.g., Scripts, REST APIs)
 * - status: string (e.g., PUBLISHED)
 * - tag: string (tag name)
 * - search: string (search in name and description)
 * - owner: string (owner email)
 * - bizDomain: string (e.g., CLAIM, FINANCIAL_CHANGE)
 * - sortBy: 'createdAt' | 'updatedAt' | 'name' (default: updatedAt)
 * - sortOrder: 'asc' | 'desc' (default: desc)
 *
 * Examples:
 * - GET /api/assets
 * - GET /api/assets?page=1&limit=20
 * - GET /api/assets?category=CODE_COMPONENTS
 * - GET /api/assets?category=CODE_COMPONENTS&assetType=Scripts
 * - GET /api/assets?bizDomain=FINANCIAL_CHANGE
 * - GET /api/assets?search=python
 * - GET /api/assets?tag=python&status=PUBLISHED
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const query: AssetListQuery = {
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      category: searchParams.get('category') || undefined,
      assetType: searchParams.get('assetType') || undefined,
      status: searchParams.get('status') || undefined,
      tag: searchParams.get('tag') || undefined,
      search: searchParams.get('search') || undefined,
      owner: searchParams.get('owner') || undefined,
      bizDomain: searchParams.get('bizDomain') || undefined,
      sortBy: (searchParams.get('sortBy') as 'createdAt' | 'updatedAt' | 'name' | undefined) || undefined,
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc' | undefined) || undefined,
    };

    const result = await getAssets(query);

    return NextResponse.json(
      {
        success: true,
        data: result.data,
        pagination: result.pagination,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch assets',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/assets
 * Create a new asset
 *
 * Request body (all fields required except bizDomain):
 * {
 *   "name": "Asset Name",
 *   "description": "Asset description",
 *   "category": "CODE_COMPONENTS",
 *   "assetType": "Script",
 *   "version": "1.0.0",
 *   "status": "PUBLISHED",
 *   "owner": "team@company.com",
 *   "contentPath": "assets/code/scripts/asset.md",
 *   "contentHash": "abc123...",
 *   "sourceSystem": "GitHub",
 *   "sourceLink": "https://github.com/...",
 *   "bizDomain": "FINANCIAL_CHANGE" (optional)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate asset creation data
    const validation = validateAssetCreation(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    const asset = await createAsset(body);

    return NextResponse.json(
      {
        success: true,
        data: asset,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating asset:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create asset',
      },
      { status: 500 }
    );
  }
}

