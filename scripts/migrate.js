#!/usr/bin/env node

/**
 * Database migration script for Vercel deployment
 * Run this after deploying to Vercel to initialize the database
 * 
 * Usage:
 *   node scripts/migrate.js
 * 
 * Environment variables required:
 *   - DATABASE_URL_UNPOOLED: Non-pooled PostgreSQL connection string
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { execSync } = require('child_process');

const isDev = process.env.NODE_ENV !== 'production';

console.log('🚀 Starting database migration...');
console.log(`📍 Environment: ${isDev ? 'development' : 'production'}`);

try {
  // Check if DATABASE_URL_UNPOOLED is set
  if (!process.env.DATABASE_URL_UNPOOLED && !isDev) {
    console.error('❌ DATABASE_URL_UNPOOLED environment variable is not set');
    console.error('Please set DATABASE_URL_UNPOOLED in your Vercel environment variables');
    process.exit(1);
  }

  // Run migrations
  console.log('\n📦 Running Prisma migrations...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });

  console.log('\n✅ Database migration completed successfully!');
  console.log('🎉 Your database is ready to use');
} catch (error) {
  console.error('\n❌ Migration failed:', error.message);
  process.exit(1);
}

