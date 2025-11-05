import { NextRequest, NextResponse } from 'next/server';
import { execSync } from 'child_process';

/**
 * Initialize database on first deployment
 * POST /api/init
 * 
 * This endpoint runs database migrations and seeds initial data
 * Should only be called once after deployment
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authorization header
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.INIT_TOKEN || 'dev-token';

    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🚀 Starting database initialization...');

    // Check if DATABASE_URL_UNPOOLED is available
    if (!process.env.DATABASE_URL_UNPOOLED) {
      return NextResponse.json(
        {
          error: 'DATABASE_URL_UNPOOLED not configured',
          message: 'Please set DATABASE_URL_UNPOOLED in environment variables',
        },
        { status: 400 }
      );
    }

    // Run migrations
    console.log('📦 Running Prisma migrations...');
    try {
      execSync('npx prisma migrate deploy', {
        env: {
          ...process.env,
          DATABASE_URL: process.env.DATABASE_URL_UNPOOLED,
        },
        stdio: 'inherit',
      });
      console.log('✅ Migrations completed');
    } catch (error) {
      console.error('❌ Migration failed:', error);
      throw error;
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Database initialized successfully',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Initialization failed:', error);
    return NextResponse.json(
      {
        error: 'Initialization failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Check initialization status
 * GET /api/init
 */
export async function GET() {
  try {
    const { prisma } = await import('@/lib/db/client');

    // Try to query the database
    const assetCount = await prisma.axon_asset.count();

    return NextResponse.json(
      {
        status: 'initialized',
        database: 'connected',
        assets: assetCount,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'not_initialized',
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}

