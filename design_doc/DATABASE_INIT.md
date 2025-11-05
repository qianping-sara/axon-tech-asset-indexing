# Axon Asset Golden Index - Database Schema & Initialization

**Version**: 2.0
**Last Updated**: 2025-11-05
**Database**: PostgreSQL (Neon)
**ORM**: Prisma

---

## 📋 Table of Contents

1. [Database Overview](#database-overview)
2. [Schema Design](#schema-design)
3. [Tables & Models](#tables--models)
4. [Enums](#enums)
5. [Relationships](#relationships)
6. [Indexes](#indexes)
7. [Initialization](#initialization)
8. [Verification](#verification)

---

## Database Overview

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Axon Asset Database                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐      ┌──────────────┐               │
│  │  axon_asset  │◄────►│  axon_tag    │               │
│  │  (5 tables)  │      │  (1 table)   │               │
│  └──────────────┘      └──────────────┘               │
│        │                                               │
│        ├─► axon_asset_tag (junction)                  │
│        ├─► axon_asset_relation (graph)                │
│        └─► axon_asset_version (history)               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Key Statistics

- **Tables**: 5 core tables
- **Enums**: 3 enums (Category, Status, RelationType)
- **Indexes**: 13 indexes for performance
- **Foreign Keys**: 5 relationships with CASCADE delete
- **Unique Constraints**: 3 unique constraints

---

## Schema Design

### Design Principles

1. **Normalization**: Follows 3NF for data integrity
2. **Performance**: Strategic indexing on frequently queried fields
3. **Scalability**: Supports asset relationships and versioning
4. **Auditability**: Timestamps for all records
5. **Flexibility**: Extensible tag and relation systems

### Data Flow

```
Asset Creation
    ↓
axon_asset (main record)
    ├─ axon_asset_tag (tagging)
    ├─ axon_asset_relation (linking)
    └─ axon_asset_version (versioning)
```

---

## Tables & Models

### 1. axon_asset (Core Asset Table)

**Purpose**: Stores asset metadata and core information

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT | PRIMARY KEY | Unique asset identifier |
| `name` | VARCHAR(255) | NOT NULL | Asset name |
| `description` | TEXT | NOT NULL | Asset description |
| `category` | Category ENUM | NOT NULL | Asset category (7 types) |
| `assetType` | VARCHAR(100) | NOT NULL | Asset type (e.g., Scripts, REST APIs) |
| `version` | VARCHAR(50) | NOT NULL | Semantic version (e.g., 1.0.0) |
| `status` | Status ENUM | DEFAULT: PUBLISHED | Asset status (4 states) |
| `owner` | VARCHAR(255) | NOT NULL | Owner email/team |
| `contentPath` | VARCHAR(500) | NOT NULL | Path to markdown file |
| `contentHash` | VARCHAR(64) | NOT NULL | SHA256 hash of content |
| `sourceSystem` | VARCHAR(100) | NOT NULL | Source system (e.g., GitHub) |
| `sourceLink` | VARCHAR(500) | NOT NULL | Link to source |
| `createdAt` | TIMESTAMP | DEFAULT: NOW() | Creation timestamp |
| `updatedAt` | TIMESTAMP | NOT NULL | Last update timestamp |
| `publishedAt` | TIMESTAMP | NULLABLE | Publication timestamp |

**Indexes**:
- `category` - Filter by category
- `status` - Filter by status
- `owner` - Filter by owner
- `updatedAt` - Sort by update time

**Example**:
```json
{
  "id": "asset-bank-detail-check-001",
  "name": "Bank Detail Check API",
  "description": "Validates banking details...",
  "category": "SERVICES_APIS",
  "assetType": "REST APIs",
  "version": "1.0.0",
  "status": "DRAFT",
  "owner": "AutomationCoE Team",
  "contentPath": "public/assets/services/rest-apis/bank-detail-check-api.md",
  "contentHash": "abc123def456...",
  "sourceSystem": "Servicing Layer",
  "sourceLink": "https://github.com/example/insurance-api-suite"
}
```

---

### 2. axon_tag (Tag/Label Table)

**Purpose**: Stores reusable tags for asset categorization

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT | PRIMARY KEY | Unique tag identifier |
| `name` | VARCHAR(100) | UNIQUE, NOT NULL | Tag name |
| `description` | TEXT | NULLABLE | Tag description |
| `category` | VARCHAR(100) | NOT NULL | Tag category (e.g., language, domain) |
| `createdAt` | TIMESTAMP | DEFAULT: NOW() | Creation timestamp |
| `updatedAt` | TIMESTAMP | NOT NULL | Last update timestamp |

**Indexes**:
- `name` - UNIQUE index for fast lookup
- `category` - Filter by tag category

**Example**:
```json
{
  "id": "tag-revival-001",
  "name": "revival",
  "description": "Policy revival related assets",
  "category": "SERVICES_APIS"
}
```

---

### 3. axon_asset_tag (Junction Table)

**Purpose**: Many-to-many relationship between assets and tags

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT | PRIMARY KEY | Unique record identifier |
| `assetId` | TEXT | FOREIGN KEY | Reference to axon_asset |
| `tagId` | TEXT | FOREIGN KEY | Reference to axon_tag |
| `createdAt` | TIMESTAMP | DEFAULT: NOW() | Association timestamp |

**Constraints**:
- UNIQUE(assetId, tagId) - Prevent duplicate associations
- FOREIGN KEY assetId → axon_asset (CASCADE DELETE)
- FOREIGN KEY tagId → axon_tag (CASCADE DELETE)

**Indexes**:
- `assetId` - Find tags for an asset
- `tagId` - Find assets with a tag

---

### 4. axon_asset_relation (Asset Relationship Graph)

**Purpose**: Stores relationships between assets (dependency graph)

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT | PRIMARY KEY | Unique relation identifier |
| `fromAssetId` | TEXT | FOREIGN KEY | Source asset |
| `toAssetId` | TEXT | FOREIGN KEY | Target asset |
| `relationType` | RelationType ENUM | NOT NULL | Type of relationship (8 ArchiMate types) |
| `createdAt` | TIMESTAMP | DEFAULT: NOW() | Creation timestamp |
| `updatedAt` | TIMESTAMP | NOT NULL | Last update timestamp |

**Constraints**:
- UNIQUE(fromAssetId, toAssetId, relationType) - Prevent duplicate relations
- FOREIGN KEY fromAssetId → axon_asset (CASCADE DELETE)
- FOREIGN KEY toAssetId → axon_asset (CASCADE DELETE)

**Indexes**:
- `fromAssetId` - Find outgoing relations
- `toAssetId` - Find incoming relations

**Relation Types** (ArchiMate 3.x Standard):

**Structural Relationships**:
- `COMPOSITION` - A is composed of B (strong lifecycle dependency)
- `AGGREGATION` - A aggregates B (weak lifecycle dependency)
- `ASSIGNMENT` - A is assigned to B (allocation of responsibility/behavior/storage)
- `REALIZATION` - A realizes/implements B (concrete implementation of abstract element)

**Dependency Relationships**:
- `SERVING` - A serves/provides functionality to B
- `ACCESS` - A accesses/uses B (active element accesses passive element)
- `INFLUENCE` - A influences B's implementation/achievement
- `ASSOCIATION` - Unspecified relationship between A and B

**Usage Examples**:
- API-1 calls API-2: `API-1 SERVING API-2` (API-1 serves API-2)
- Process uses API: `Process ACCESS API` (Process accesses API)
- SOP guides Process: `SOP REALIZATION Process` (SOP realizes/implements process)
- Architecture Blueprint guides API: `API REALIZATION ArchitectureBlueprint` (API implements blueprint)
- Architecture Principle guides ADR: `ADR REALIZATION Principle` (ADR implements principle)

---

### 5. axon_asset_version (Version History)

**Purpose**: Maintains version history and changelog for assets

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT | PRIMARY KEY | Unique version record ID |
| `assetId` | TEXT | FOREIGN KEY | Reference to axon_asset |
| `version` | VARCHAR(50) | NOT NULL | Version number (e.g., 1.0.0) |
| `status` | Status ENUM | NOT NULL | Status at this version |
| `contentHash` | VARCHAR(64) | NOT NULL | Content hash for this version |
| `changeLog` | TEXT | NULLABLE | Change description |
| `createdAt` | TIMESTAMP | DEFAULT: NOW() | Version creation timestamp |

**Constraints**:
- FOREIGN KEY assetId → axon_asset (CASCADE DELETE)

**Indexes**:
- `assetId` - Find versions of an asset
- `version` - Find specific version

---

## Enums

### 1. Category (7 values)

Asset classification categories:

```sql
CREATE TYPE "Category" AS ENUM (
  'CODE_COMPONENTS',
  'SERVICES_APIS',
  'AI_ML_SERVICES',
  'AUTOMATION_WORKFLOWS',
  'DATA_ANALYTICS',
  'ARCHITECTURE_GOVERNANCE',
  'KNOWLEDGE_PRACTICES'
);
```

### 2. Status (4 values)

Asset lifecycle states:

```sql
CREATE TYPE "Status" AS ENUM (
  'DRAFT',
  'PUBLISHED',
  'DEPRECATED',
  'ARCHIVED'
);
```

### 3. RelationType (6 values)

Asset relationship types:

```sql
CREATE TYPE "RelationType" AS ENUM (
  'DEPENDS_ON',
  'USED_BY',
  'RELATED_TO',
  'EXTENDS',
  'IMPLEMENTS',
  'REFERENCES'
);
```

---

## Relationships

### Entity Relationship Diagram

```
┌─────────────────────┐
│    axon_asset       │
│  (Core Asset Data)  │
└──────────┬──────────┘
           │
    ┌──────┼──────┐
    │      │      │
    ▼      ▼      ▼
┌────────┐ ┌──────────────┐ ┌──────────────────┐
│ Tags   │ │ Relations    │ │ Versions         │
│ (M:M)  │ │ (Graph)      │ │ (History)        │
└────────┘ └──────────────┘ └──────────────────┘
```

### Cascade Delete Behavior


---

## Complete SQL Schema

### Create Enums

```sql
-- Category Enum (7 values)
CREATE TYPE "Category" AS ENUM (
  'CODE_COMPONENTS',
  'SERVICES_APIS',
  'AI_ML_SERVICES',
  'AUTOMATION_WORKFLOWS',
  'DATA_ANALYTICS',
  'ARCHITECTURE_GOVERNANCE',
  'KNOWLEDGE_PRACTICES'
);

-- Status Enum (4 values)
CREATE TYPE "Status" AS ENUM (
  'DRAFT',
  'PUBLISHED',
  'DEPRECATED',
  'ARCHIVED'
);

-- RelationType Enum (6 values)
CREATE TYPE "RelationType" AS ENUM (
  'DEPENDS_ON',
  'USED_BY',
  'RELATED_TO',
  'EXTENDS',
  'IMPLEMENTS',
  'REFERENCES'
);
```

### Create Tables

```sql
-- Main Asset Table
CREATE TABLE "axon_asset" (
  "id" TEXT PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "category" "Category" NOT NULL,
  "assetType" VARCHAR(100) NOT NULL,
  "version" VARCHAR(50) NOT NULL,
  "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
  "owner" VARCHAR(255) NOT NULL,
  "contentPath" VARCHAR(500) NOT NULL,
  "contentHash" VARCHAR(64) NOT NULL,
  "sourceSystem" VARCHAR(100) NOT NULL,
  "sourceLink" VARCHAR(500) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "publishedAt" TIMESTAMP(3)
);

-- Tag Table
CREATE TABLE "axon_tag" (
  "id" TEXT PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL UNIQUE,
  "description" TEXT,
  "category" VARCHAR(100) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Asset-Tag Junction Table
CREATE TABLE "axon_asset_tag" (
  "id" TEXT PRIMARY KEY,
  "assetId" TEXT NOT NULL,
  "tagId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("assetId") REFERENCES "axon_asset"("id") ON DELETE CASCADE,
  FOREIGN KEY ("tagId") REFERENCES "axon_tag"("id") ON DELETE CASCADE,
  UNIQUE("assetId", "tagId")
);

-- Asset Relationship Table
CREATE TABLE "axon_asset_relation" (
  "id" TEXT PRIMARY KEY,
  "fromAssetId" TEXT NOT NULL,
  "toAssetId" TEXT NOT NULL,
  "relationType" "RelationType" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("fromAssetId") REFERENCES "axon_asset"("id") ON DELETE CASCADE,
  FOREIGN KEY ("toAssetId") REFERENCES "axon_asset"("id") ON DELETE CASCADE,
  UNIQUE("fromAssetId", "toAssetId", "relationType")
);

-- Asset Version History Table
CREATE TABLE "axon_asset_version" (
  "id" TEXT PRIMARY KEY,
  "assetId" TEXT NOT NULL,
  "version" VARCHAR(50) NOT NULL,
  "status" "Status" NOT NULL,
  "contentHash" VARCHAR(64) NOT NULL,
  "changeLog" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("assetId") REFERENCES "axon_asset"("id") ON DELETE CASCADE
);
```

### Create Indexes

```sql
-- axon_asset indexes
CREATE INDEX "axon_asset_category_idx" ON "axon_asset"("category");
CREATE INDEX "axon_asset_status_idx" ON "axon_asset"("status");
CREATE INDEX "axon_asset_owner_idx" ON "axon_asset"("owner");
CREATE INDEX "axon_asset_updatedAt_idx" ON "axon_asset"("updatedAt");

-- axon_tag indexes
CREATE INDEX "axon_tag_category_idx" ON "axon_tag"("category");

-- axon_asset_tag indexes
CREATE INDEX "axon_asset_tag_assetId_idx" ON "axon_asset_tag"("assetId");
CREATE INDEX "axon_asset_tag_tagId_idx" ON "axon_asset_tag"("tagId");

-- axon_asset_relation indexes
CREATE INDEX "axon_asset_relation_fromAssetId_idx" ON "axon_asset_relation"("fromAssetId");
CREATE INDEX "axon_asset_relation_toAssetId_idx" ON "axon_asset_relation"("toAssetId");

-- axon_asset_version indexes
CREATE INDEX "axon_asset_version_assetId_idx" ON "axon_asset_version"("assetId");
CREATE INDEX "axon_asset_version_version_idx" ON "axon_asset_version"("version");
```

---

## Sample Data

### Insert Sample Tags

```sql
INSERT INTO "axon_tag" (id, name, description, category, "createdAt", "updatedAt") VALUES
('tag-revival-001', 'revival', 'Policy revival related assets', 'SERVICES_APIS', NOW(), NOW()),
('tag-banking-001', 'banking', 'Banking and payment related assets', 'SERVICES_APIS', NOW(), NOW()),
('tag-qualification-001', 'qualification', 'Qualification and eligibility checks', 'SERVICES_APIS', NOW(), NOW()),
('tag-stp-001', 'stp', 'Straight Through Processing related assets', 'SERVICES_APIS', NOW(), NOW()),
('tag-partial-stp-001', 'partial-stp', 'Partial STP scenario assets', 'SERVICES_APIS', NOW(), NOW()),
('tag-policy-001', 'policy', 'Policy information and management', 'SERVICES_APIS', NOW(), NOW()),
('tag-orchestration-001', 'orchestration', 'API orchestration and coordination', 'SERVICES_APIS', NOW(), NOW());
```

### Insert Sample Assets

```sql
INSERT INTO "axon_asset" (
  id, name, description, category, "assetType", version, status, owner,
  "contentPath", "contentHash", "sourceSystem", "sourceLink", "createdAt", "updatedAt"
) VALUES
(
  'asset-bank-detail-check-001',
  'Bank Detail Check API',
  'Validates banking details and mandate status including CDV and AVSR checks',
  'SERVICES_APIS',
  'REST APIs',
  '1.0.0',
  'DRAFT',
  'AutomationCoE Team',
  'public/assets/services/rest-apis/bank-detail-check-api.md',
  '',
  'Servicing Layer',
  'https://github.com/example/insurance-api-suite',
  NOW(),
  NOW()
);
```

---

## Query Examples

### Find Assets by Category

```sql
SELECT * FROM "axon_asset"
WHERE category = 'SERVICES_APIS'
AND status = 'PUBLISHED'
ORDER BY "updatedAt" DESC;
```

### Find Assets with Specific Tag

```sql
SELECT a.* FROM "axon_asset" a
JOIN "axon_asset_tag" at ON a.id = at."assetId"
JOIN "axon_tag" t ON at."tagId" = t.id
WHERE t.name = 'revival'
AND a.status = 'PUBLISHED';
```

### Find Asset Dependencies

```sql
SELECT
  from_asset.name as "From Asset",
  to_asset.name as "To Asset",
  r."relationType"
FROM "axon_asset_relation" r
JOIN "axon_asset" from_asset ON r."fromAssetId" = from_asset.id
JOIN "axon_asset" to_asset ON r."toAssetId" = to_asset.id
WHERE from_asset.id = 'asset-id-here';
```

### Get Asset Version History

```sql
SELECT * FROM "axon_asset_version"
WHERE "assetId" = 'asset-id-here'
ORDER BY "createdAt" DESC;
```

### Count Assets by Category

```sql
SELECT category, COUNT(*) as count
FROM "axon_asset"
GROUP BY category
ORDER BY count DESC;
```

---

## Prisma Schema File

Location: `prisma/schema.prisma`

The Prisma schema defines all models and relationships. Key features:

- **Type Safety**: TypeScript types generated from schema
- **Migrations**: Version control for database changes
- **Validation**: Built-in field validation
- **Relations**: Automatic foreign key management

---

## Migration Files

### Location: `prisma/migrations/`

#### 0_init
- Initial schema creation
- All 5 tables and 3 enums
- All indexes and constraints

#### add_revival_apis
- Sample data for revival APIs
- 7 tags and 3 assets
- Asset-tag associations

---

## Performance Considerations

### Query Optimization

1. **Use Indexes**: Always filter by indexed fields
2. **Pagination**: Use limit/offset for large result sets
3. **Selective Fields**: Only select needed columns
4. **Batch Operations**: Use batch inserts for multiple records

### Connection Pooling

- **Pooled Connection**: For application queries (DATABASE_URL)
- **Unpooled Connection**: For migrations (DATABASE_URL_UNPOOLED)

### Scaling Strategy

1. **Read Replicas**: For high-traffic read queries
2. **Caching**: Cache frequently accessed data
3. **Archiving**: Archive old versions periodically
4. **Partitioning**: Partition large tables by date if needed

---

## Backup & Recovery

### Backup Strategy

```bash
# Backup database
pg_dump "your_connection_string" > backup.sql

# Restore database
psql "your_connection_string" < backup.sql
```

### Point-in-Time Recovery

Neon provides automatic backups. Contact support for recovery.

---

## Monitoring

### Key Metrics

- Connection count
- Query performance
- Table sizes
- Index usage
- Slow queries

### Health Check

```bash
curl https://your-domain.vercel.app/api/health
```

---

## Support & Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

**Last Updated**: 2025-11-05
**Schema Version**: 2.0
**Status**: Production Ready
- ✅ All versions are removed (via axon_asset_version)

---

## Indexes

### Performance Optimization

| Table | Column | Type | Purpose |
|---|---|---|---|
| axon_asset | category | INDEX | Filter by category |
| axon_asset | status | INDEX | Filter by status |
| axon_asset | owner | INDEX | Filter by owner |
| axon_asset | updatedAt | INDEX | Sort by update time |
| axon_tag | name | UNIQUE | Fast tag lookup |
| axon_tag | category | INDEX | Filter by tag category |
| axon_asset_tag | assetId | INDEX | Find tags for asset |
| axon_asset_tag | tagId | INDEX | Find assets with tag |
| axon_asset_tag | (assetId, tagId) | UNIQUE | Prevent duplicates |
| axon_asset_relation | fromAssetId | INDEX | Find outgoing relations |
| axon_asset_relation | toAssetId | INDEX | Find incoming relations |
| axon_asset_relation | (fromAssetId, toAssetId, relationType) | UNIQUE | Prevent duplicates |
| axon_asset_version | assetId | INDEX | Find versions |
| axon_asset_version | version | INDEX | Find specific version |

---

## Initialization

### Quick Start

#### Option 1: Automatic (Recommended)

```bash
# Build script automatically runs migrations
npm run build
```

#### Option 2: Manual Migration

```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

#### Option 3: Vercel Deployment

Migrations run automatically during build:
```bash
# In package.json build script
"build": "prisma generate && prisma migrate deploy && next build"
```

---

## Verification

### Check Database Connection

```bash
curl https://your-domain.vercel.app/api/health
```

**Healthy Response**:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2024-11-05T10:30:00Z",
  "uptime": 3600.5
}
```

### View Database Schema

```bash
# Using Prisma Studio
npx prisma studio

# Using psql
psql "your_connection_string" -c "\dt"
```

### Query Sample Data

```bash
# Get all assets
curl "https://your-domain.vercel.app/api/assets"

# Get all tags
curl "https://your-domain.vercel.app/api/tags"

# Get categories
curl "https://your-domain.vercel.app/api/categories"
```

---

## Environment Variables

Required for database connection:

```bash
# Pooled connection (for application)
DATABASE_URL="postgresql://user:password@host/database?schema=public"

# Non-pooled connection (for migrations)
DATABASE_URL_UNPOOLED="postgresql://user:password@host/database?schema=public"
```

---

## Troubleshooting

### Issue: "relation does not exist"

**Solution**: Run migrations
```bash
npx prisma migrate deploy
```

### Issue: "Connection timeout"

**Solution**: Check database is running and connection string is correct

### Issue: "Unique constraint violation"

**Solution**: Check for duplicate asset IDs or tag names

---

## Next Steps

1. ✅ Initialize database with migrations
2. ✅ Verify connection with health check
3. ✅ Seed initial data (optional)
4. ✅ Start using the application

---

**Last Updated**: 2025-11-05
**Schema Version**: 2.0
**Status**: Production Ready

