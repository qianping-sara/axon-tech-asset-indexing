# Database Initialization Guide

This guide explains how to initialize the database after deploying to Vercel.

## Quick Start

### Option 1: Using the Init API (Recommended)

After deployment, call the initialization endpoint:

```bash
curl -X POST https://your-domain.vercel.app/api/init \
  -H "Authorization: Bearer your-init-token" \
  -H "Content-Type: application/json"
```

**Steps:**

1. Set `INIT_TOKEN` environment variable in Vercel
2. Call the endpoint with the token
3. Wait for migrations to complete

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Pull environment variables
vercel env pull

# Run migration
DATABASE_URL_UNPOOLED="your_unpooled_url" npx prisma migrate deploy
```

### Option 3: Manual via Vercel Dashboard

1. Go to Vercel Dashboard → Project Settings
2. Open "Environment Variables"
3. Ensure `DATABASE_URL_UNPOOLED` is set
4. Redeploy the project
5. SSH into the deployment and run:
   ```bash
   npx prisma migrate deploy
   ```

## Checking Database Status

### Check if database is initialized

```bash
curl https://your-domain.vercel.app/api/health
```

Response if initialized:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2024-11-04T12:00:00.000Z",
  "uptime": 123.45
}
```

Response if not initialized:
```json
{
  "status": "unhealthy",
  "database": "disconnected",
  "error": "relation \"Asset\" does not exist",
  "timestamp": "2024-11-04T12:00:00.000Z"
}
```

### Check initialization status

```bash
curl https://your-domain.vercel.app/api/init
```

## Environment Variables Required

For database initialization to work, ensure these are set in Vercel:

- `DATABASE_URL` - Pooled connection (for application)
- `DATABASE_URL_UNPOOLED` - Non-pooled connection (for migrations)
- `INIT_TOKEN` - Token for initialization endpoint (optional, defaults to 'dev-token')

## Troubleshooting

### Error: "DATABASE_URL_UNPOOLED not configured"

**Solution:** Add `DATABASE_URL_UNPOOLED` to Vercel environment variables

### Error: "relation does not exist"

**Solution:** Run the initialization endpoint or migration manually

### Error: "Connection timeout"

**Solution:** 
- Check that Neon database is active
- Verify connection string is correct
- Check Vercel logs for more details

## Vercel Logs

To view deployment and initialization logs:

```bash
vercel logs
```

Or in Vercel Dashboard:
1. Go to Deployments
2. Click on the deployment
3. View "Build Logs" or "Runtime Logs"

## Database Verification

After initialization, verify tables were created:

```bash
# Using Prisma Studio
DATABASE_URL_UNPOOLED="your_url" npx prisma studio

# Or using psql
psql "your_connection_string" -c "\dt"
```

## Next Steps

After database initialization:

1. ✅ Verify database connection with `/api/health`
2. ✅ Check tables exist in Neon console
3. ✅ Start using the application
4. ✅ Set up GitHub webhook for content sync (optional)

## Support

For issues:
- Check [Prisma Docs](https://www.prisma.io/docs)
- Check [Neon Docs](https://neon.tech/docs)
- Check [Vercel Docs](https://vercel.com/docs)

