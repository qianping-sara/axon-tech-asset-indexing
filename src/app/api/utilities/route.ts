/**
 * GET /api/utilities
 * Fetch utilities with optional filtering and search
 * 
 * Query Parameters:
 * - category: Filter by category (e.g., 'decision-support')
 * - search: Search by name or description
 * - status: Filter by status (DRAFT, PUBLISHED, DEPRECATED, ARCHIVED)
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const statusParam = searchParams.get('status') || 'PUBLISHED';

    // Build filter conditions
    const where: Prisma.axon_utilityWhereInput = {
      status: statusParam as Prisma.EnumStatusFilter<'axon_utility'>,
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    // Fetch utilities
    const utilities = await prisma.axon_utility.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { createdAt: 'asc' },
      ],
    });

    return NextResponse.json({
      success: true,
      data: utilities,
      total: utilities.length,
    });
  } catch (error) {
    console.error('Error fetching utilities:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch utilities',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

