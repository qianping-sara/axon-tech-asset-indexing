import { NextRequest, NextResponse } from 'next/server';
import { getTagById } from '@/lib/api/tags';

/**
 * GET /api/tags/[id]
 * Get tag details by ID with associated assets
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tag ID is required',
        },
        { status: 400 }
      );
    }

    const tag = await getTagById(id);

    if (!tag) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tag not found',
        },
        { status: 404 }
      );
    }

    // Transform the response
    const response = {
      id: tag.id,
      name: tag.name,
      description: tag.description,
      category: tag.category,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
      assetCount: tag._count.axon_asset_tag,
      assets: tag.axon_asset_tag.map((at) => at.axon_asset),
    };

    return NextResponse.json(
      {
        success: true,
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching tag:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tag',
      },
      { status: 500 }
    );
  }
}

