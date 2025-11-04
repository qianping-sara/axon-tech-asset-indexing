import { NextRequest, NextResponse } from 'next/server';
import { getCategories, getCategoryStats } from '@/lib/api/categories';

/**
 * GET /api/categories
 * Get all asset categories with asset counts
 *
 * Query parameters:
 * - stats: boolean (optional, include detailed statistics)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeStats = searchParams.get('stats') === 'true';

    if (includeStats) {
      const stats = await getCategoryStats();
      return NextResponse.json(
        {
          success: true,
          data: stats,
        },
        { status: 200 }
      );
    }

    const categories = await getCategories();

    return NextResponse.json(
      {
        success: true,
        data: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
      },
      { status: 500 }
    );
  }
}

