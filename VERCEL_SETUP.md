# Vercel Deployment Setup Guide

This guide explains how to set up the Asset Golden Index MVP on Vercel with Neon PostgreSQL.

## Prerequisites

- Vercel account
- GitHub repository connected to Vercel
- Neon PostgreSQL database created
- Database credentials ready

## Step 1: Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Click "Import"

## Step 2: Configure Environment Variables

In Vercel project settings, add the following environment variables:

### Required Variables

```
DATABASE_URL=postgres://user:password@host-pooler.region.aws.neon.tech/database?sslmode=require
DATABASE_URL_UNPOOLED=postgresql://user:password@host.region.aws.neon.tech/database?sslmode=require
NEXT_PUBLIC_APP_NAME=Asset Golden Index
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
GITHUB_WEBHOOK_SECRET=your_webhook_secret_here
```

### Important Notes

- **DATABASE_URL**: Use the **pooled** connection string (with `-pooler` in hostname)
  - Used by the application for regular connections
  - Recommended for serverless environments

- **DATABASE_URL_UNPOOLED**: Use the **non-pooled** connection string (without `-pooler`)
  - Used only for database migrations
  - Required for Prisma migrate to work correctly

- **NEXT_PUBLIC_APP_URL**: Set to your Vercel deployment URL
  - Example: `https://asset-golden-index.vercel.app`

## Step 3: Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Once deployed, you'll see the deployment URL

## Step 4: Run Database Migration

After the first deployment, you need to initialize the database:

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Connect to your project
vercel link

# Run migration
vercel env pull
DATABASE_URL_UNPOOLED="your_unpooled_connection_string" npx prisma migrate deploy
```

### Option B: Using Vercel Deployment Hooks

1. Create a deployment hook in Vercel settings
2. Call the hook after setting up environment variables
3. The migration will run automatically

### Option C: Manual via Vercel CLI

```bash
# SSH into Vercel environment and run migration
vercel ssh
npm run prisma:migrate:deploy
```

## Step 5: Verify Deployment

1. Visit your Vercel deployment URL
2. Check that the application loads without errors
3. Verify database connection in Prisma Studio:

```bash
DATABASE_URL_UNPOOLED="your_unpooled_connection_string" npx prisma studio
```

## Troubleshooting

### Database Connection Error

**Error**: `Can't reach database server`

**Solution**:
- Verify DATABASE_URL is correct
- Check that Neon database is active
- Ensure IP whitelist allows Vercel IPs (usually automatic)

### Migration Failed

**Error**: `Migration failed`

**Solution**:
- Use DATABASE_URL_UNPOOLED for migrations
- Check that the database user has proper permissions
- Verify the migration files exist in `prisma/migrations/`

### Build Failed

**Error**: `Build failed during deployment`

**Solution**:
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify TypeScript compilation: `npm run type-check`

## Subsequent Deployments

For subsequent deployments:

1. Push changes to GitHub
2. Vercel automatically deploys
3. If schema changes:
   - Create migration locally: `npm run prisma:migrate -- --name <migration_name>`
   - Commit and push
   - Run migration in production: `DATABASE_URL_UNPOOLED="..." npx prisma migrate deploy`

## Monitoring

### Check Deployment Status

```bash
vercel status
```

### View Logs

```bash
vercel logs
```

### Database Monitoring

Use Neon Console to monitor:
- Query performance
- Connection count
- Storage usage

## Security Best Practices

1. ✅ Never commit `.env.local` to Git
2. ✅ Use Vercel's environment variable encryption
3. ✅ Rotate webhook secrets regularly
4. ✅ Use non-pooled connection only for migrations
5. ✅ Enable Vercel's built-in DDoS protection

## Next Steps

After successful deployment:

1. Set up GitHub webhook for content sync
2. Configure custom domain (optional)
3. Set up monitoring and alerts
4. Create backup strategy for database

## Support

For issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Check [Prisma Documentation](https://www.prisma.io/docs)
- Check [Neon Documentation](https://neon.tech/docs)

