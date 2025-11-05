/**
 * GET /api/assets/[id]/content
 * 获取资产的 Markdown 内容
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAssetById } from '@/lib/api/assets';
import { parseMarkdownFileFromDisk } from '@/lib/markdown/parser';
import { ContentResponse } from '@/lib/markdown/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ContentResponse>> {
  try {
    const { id: assetId } = await params;

    // 获取资产元数据
    const asset = await getAssetById(assetId);

    if (!asset) {
      return NextResponse.json(
        { success: false, error: 'Asset not found' },
        { status: 404 }
      );
    }

    // 检查是否有 contentPath
    if (!asset.contentPath) {
      return NextResponse.json(
        { success: true, data: undefined },
        { status: 200 }
      );
    }

    // 解析 markdown 文件
    const parsed = await parseMarkdownFileFromDisk(asset.contentPath);

    return NextResponse.json(
      {
        success: true,
        data: {
          frontmatter: parsed.frontmatter,
          content: parsed.content,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching content:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch content';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

