import { NextRequest, NextResponse } from 'next/server';
import { getTags } from '@/lib/api/tags';
import { TagListQuery } from '@/lib/api/tags';

/**
 * GET /api/tags
 * Get all tags with pagination and filtering
 *
 * Query parameters:
 * - page: number (default: 1)
 * - limit: number (default: 20, max: 100)
 * - category: string (optional, filter by tag category)
 * - search: string (optional, search in name and description)
 * - sortBy: 'name' | 'createdAt' | 'updatedAt' (default: 'createdAt')
 * - sortOrder: 'asc' | 'desc' (default: 'desc')
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const query: TagListQuery = {
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
      sortBy: (searchParams.get('sortBy') as 'name' | 'createdAt' | 'updatedAt' | undefined) || undefined,
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc' | undefined) || undefined,
    };

    const result = await getTags(query);

    return NextResponse.json(
      {
        success: true,
        data: result.data,
        pagination: result.pagination,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tags',
      },
      { status: 500 }
    );
  }
}

