#!/bin/bash

# Database setup script for Vercel deployment
# This script runs database migrations after deployment

set -e

echo "🚀 Starting database setup..."

# Check if DATABASE_URL_UNPOOLED is set
if [ -z "$DATABASE_URL_UNPOOLED" ]; then
  echo "⚠️  DATABASE_URL_UNPOOLED not set, skipping migration"
  echo "To run migrations manually, execute:"
  echo "  DATABASE_URL_UNPOOLED='your_url' npx prisma migrate deploy"
  exit 0
fi

# Run migrations
echo "📦 Running Prisma migrations..."
DATABASE_URL="$DATABASE_URL_UNPOOLED" npx prisma migrate deploy

echo "✅ Database setup completed!"

