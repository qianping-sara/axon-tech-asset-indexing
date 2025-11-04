import { NextRequest, NextResponse } from 'next/server';
import { searchAssets, getSearchSuggestions } from '@/lib/api/search';

/**
 * GET /api/search
 * Search assets and tags
 *
 * Query parameters:
 * - q: string (search query, required)
 * - limit: number (default: 20, max: 100)
 * - suggestions: boolean (return suggestions instead of results, default: false)
 *
 * Examples:
 * - GET /api/search?q=python
 * - GET /api/search?q=python&limit=10
 * - GET /api/search?q=py&suggestions=true
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const suggestions = searchParams.get('suggestions') === 'true';

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: 'Search query is required',
        },
        { status: 400 }
      );
    }

    let results;
    if (suggestions) {
      results = await getSearchSuggestions(query, limit);
    } else {
      results = await searchAssets(query, limit);
    }

    return NextResponse.json(
      {
        success: true,
        data: results,
        query,
        count: results.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error searching:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to search',
      },
      { status: 500 }
    );
  }
}
