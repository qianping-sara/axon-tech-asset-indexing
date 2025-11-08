/**
 * GET /api/utilities/[id]
 * Fetch a specific utility by ID
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Utility ID is required',
        },
        { status: 400 }
      );
    }

    const utility = await prisma.axon_utility.findUnique({
      where: { id },
    });

    if (!utility) {
      return NextResponse.json(
        {
          success: false,
          error: 'Utility not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: utility,
    });
  } catch (error) {
    console.error('Error fetching utility:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch utility',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

