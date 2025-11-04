import { NextRequest, NextResponse } from 'next/server';
import { getCategoryDetail, isValidCategory } from '@/lib/api/categories';

/**
 * GET /api/categories/[category]
 * Get category details with all assets in that category
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category name is required',
        },
        { status: 400 }
      );
    }

    // Validate category
    if (!isValidCategory(category)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid category. Valid categories are: CODE_COMPONENTS, SERVICES_APIS, AUTOMATION_WORKFLOWS, DATA_ANALYTICS, ARCHITECTURE_GOVERNANCE, KNOWLEDGE_PRACTICES`,
        },
        { status: 400 }
      );
    }

    const categoryDetail = await getCategoryDetail(category);

    if (!categoryDetail) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: categoryDetail,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch category',
      },
      { status: 500 }
    );
  }
}

