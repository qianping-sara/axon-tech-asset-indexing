import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { BIZ_DOMAINS } from '@/lib/constants/bizDomains';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const stats = searchParams.get('stats') === 'true';

  try {
    if (stats) {
      // Get asset counts per biz domain
      const counts = await prisma.axon_asset.groupBy({
        by: ['bizDomain'],
        _count: true,
      });

      const countMap = Object.fromEntries(
        counts.map((c: { bizDomain: string | null; _count: number }) => [c.bizDomain, c._count])
      );

      const data = BIZ_DOMAINS.map(domain => ({
        ...domain,
        assetCount: countMap[domain.name] || 0,
      }));

      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ success: true, data: BIZ_DOMAINS });
  } catch (error) {
    console.error('Error fetching biz domains:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch biz domains' },
      { status: 500 }
    );
  }
}

