import { NextRequest, NextResponse } from 'next/server';
import { getAssetById, updateAsset, deleteAsset } from '@/lib/api/assets';
import { validateAssetUpdate } from '@/lib/utils/validation';

/**
 * GET /api/assets/[id]
 * Get asset details by ID
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
          error: 'Asset ID is required',
        },
        { status: 400 }
      );
    }

    const asset = await getAssetById(id);

    if (!asset) {
      return NextResponse.json(
        {
          success: false,
          error: 'Asset not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: asset,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching asset:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch asset',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/assets/[id]
 * Update asset by ID
 *
 * Request body (all fields optional):
 * {
 *   "name": "Updated Name",
 *   "description": "Updated description",
 *   "status": "PUBLISHED",
 *   "version": "2.0.0",
 *   "contentHash": "new_hash_value",
 *   "bizDomain": "FINANCIAL_CHANGE"
 * }
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Asset ID is required',
        },
        { status: 400 }
      );
    }

    // Check if asset exists
    const existingAsset = await getAssetById(id);
    if (!existingAsset) {
      return NextResponse.json(
        {
          success: false,
          error: 'Asset not found',
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Validate update data
    const validation = validateAssetUpdate(body);
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

    // Update asset
    const updatedAsset = await updateAsset(id, body);

    return NextResponse.json(
      {
        success: true,
        data: updatedAsset,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating asset:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update asset',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/assets/[id]
 * Delete asset by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Asset ID is required',
        },
        { status: 400 }
      );
    }

    // Check if asset exists
    const existingAsset = await getAssetById(id);
    if (!existingAsset) {
      return NextResponse.json(
        {
          success: false,
          error: 'Asset not found',
        },
        { status: 404 }
      );
    }

    // Delete asset
    await deleteAsset(id);

    return NextResponse.json(
      {
        success: true,
        message: 'Asset deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting asset:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete asset',
      },
      { status: 500 }
    );
  }
}

