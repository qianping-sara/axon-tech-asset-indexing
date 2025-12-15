# Axon Database Overview

**Version**: 3.0  
**Last Updated**: 2025-12-15  
**Status**: Active

---

## 📋 Overview

This document provides a concise overview of the Axon platform database schema, tech stack, and version management approach.

---

## 🗄️ Database Tables

### Asset Management Tables (5)

| Table | Purpose | Key Fields |
|-------|---------|------------|
| **axon_asset** | Core asset metadata and information | id, name, description, category, assetType, version, status, owner, contentPath, contentHash, sourceSystem, sourceLink, bizDomain, timestamps |
| **axon_tag** | Reusable tags for asset categorization | id, name, description, category, timestamps |
| **axon_asset_tag** | Many-to-many relationship between assets and tags | id, assetId, tagId, createdAt |
| **axon_asset_relation** | Asset dependency graph (ArchiMate 3.x relationships) | id, fromAssetId, toAssetId, relationType, timestamps |
| **axon_asset_version** | Version history and changelog for assets | id, assetId, version, status, contentHash, changeLog, createdAt |

### Utility Management Tables (1)

| Table | Purpose | Key Fields |
|-------|---------|------------|
| **axon_utility** | CoE utilities registry and metadata | id, name, description, category, icon, url, version, status, owner, tags, timestamps |

---

## 🏷️ Enums

### 1. Category (7 values)
Technical classification for assets:
- `CODE_COMPONENTS` - Reusable code libraries, scripts, functions
- `SERVICES_APIS` - REST APIs, microservices, integrations
- `AI_ML_SERVICES` - AI/ML models, services, algorithms
- `AUTOMATION_WORKFLOWS` - RPA workflows, automation scripts
- `DATA_ANALYTICS` - Reports, dashboards, analytics tools
- `ARCHITECTURE_GOVERNANCE` - Architecture patterns, principles, ADRs
- `KNOWLEDGE_PRACTICES` - SOPs, best practices, documentation

### 2. Status (4 values)
Lifecycle states for assets and utilities:
- `DRAFT` - Under development, not visible to users
- `PUBLISHED` - Active and available to users
- `DEPRECATED` - Still accessible but marked for retirement
- `ARCHIVED` - Hidden from main listing, kept for historical reference

### 3. BizDomain (11 values)
Business domain classification in 3-tier architecture:

**Core Servicing Domains (5)**:
- `CLAIM` - Claims processing and management
- `FINANCIAL_CHANGE` - Financial transactions and changes
- `INQUIRY_GENERAL_CHANGES` - Customer inquiries and general changes
- `MONEY_OUT` - Payment and disbursement processes
- `WEALTH` - Wealth management and investment services

**Support Domain Capabilities (5)**:
- `CUSTOMER_ENGAGEMENT` - Customer interaction and experience
- `CUSTOMER_RELATIONSHIP_MANAGEMENT` - CRM and customer data
- `PAYMENT_SETTLEMENT` - Payment processing and settlement
- `FINANCE_ACCOUNTING` - Financial accounting and reporting
- `RISK_COMPLIANCE` - Risk management and compliance

**General Domain Capabilities (1)**:
- `COMMON_CAPABILITIES` - Shared/cross-domain capabilities

### 4. RelationType (8 values - ArchiMate 3.x Standard)

**Structural Relationships**:
- `COMPOSITION` - Strong lifecycle dependency (A is composed of B)
- `AGGREGATION` - Weak lifecycle dependency (A aggregates B)
- `ASSIGNMENT` - Allocation of responsibility/behavior/storage
- `REALIZATION` - Concrete implementation of abstract element

**Dependency Relationships**:
- `SERVING` - A serves/provides functionality to B
- `ACCESS` - A accesses/uses B (active element accesses passive)
- `INFLUENCE` - A influences B's implementation/achievement
- `ASSOCIATION` - Unspecified relationship between A and B

---

## 🔍 Indexes

### Performance Optimization

| Table | Indexed Columns | Purpose |
|-------|----------------|---------|
| axon_asset | category, status, owner, bizDomain, updatedAt | Fast filtering and sorting |
| axon_tag | name (UNIQUE), category | Tag lookup and categorization |
| axon_asset_tag | assetId, tagId, (assetId + tagId) UNIQUE | Asset-tag queries and duplicate prevention |
| axon_asset_relation | fromAssetId, toAssetId, (fromAssetId + toAssetId + relationType) UNIQUE | Relationship queries and duplicate prevention |
| axon_asset_version | assetId, version | Version history queries |
| axon_utility | category, status, owner | Utility filtering |

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js**: 16.0.7 (App Router)
- **React**: 19.2.1
- **TypeScript**: 5.x
- **Node.js**: >=20.9.0

### Database & ORM
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: Prisma 6.18.0
- **Schema Location**: `prisma/schema.prisma`

### Styling & UI
- **CSS Framework**: Tailwind CSS 4.x
- **Icons**: Lucide React 0.552.0
- **Charts**: Recharts 3.3.0

### Markdown & Content
- **Parser**: gray-matter 4.0.3, marked 16.4.1
- **Renderer**: react-markdown 10.1.0
- **Syntax Highlighting**: rehype-highlight 7.0.2
- **GFM Support**: remark-gfm 4.0.1

### Development Tools
- **Linting**: ESLint 9.x
- **Formatting**: Prettier 3.6.2
- **Testing**: Jest 29.7.0, React Testing Library 16.3.0

---

## 🔄 Version Management

### Prisma Migration Workflow

**Migration Strategy**: Sequential timestamp-based migrations

1. **Schema Changes**: Modify `prisma/schema.prisma`
2. **Generate Migration**: `npx prisma migrate dev --name <migration_name>`
3. **Apply Migration**: `npx prisma migrate deploy` (production)
4. **Generate Client**: `npx prisma generate`

### Migration Types

| Type | Example | Purpose |
|------|---------|---------|
| **Schema** | `0_init`, `add_biz_domain` | Create/modify tables and enums |
| **Data** | `add_revival_apis`, `seed_*` | Insert/update data |
| **Fix** | `fix_om_ea_governance_assettype` | Correct data or schema issues |
| **Update** | `update_biz_domain_structure` | Restructure enums or migrate data |

### Build Process

**Development**:
```bash
npm run dev                    # Start dev server
npm run prisma:migrate         # Create and apply migration
npm run prisma:studio          # Open Prisma Studio
```

**Production** (Vercel):
```bash
# Automated in package.json build script:
prisma generate                # Generate Prisma Client
prisma migrate deploy          # Apply pending migrations
next build                     # Build Next.js app
```

### Migration History

**Key Milestones**:
- `0_init` - Initial schema (5 tables, 3 enums)
- `add_biz_domain` - Added BizDomain enum (10 values)
- `update_biz_domain_structure` - Restructured to 3-tier (11 values)
- `add_ai_ml_services_category` - Added AI_ML_SERVICES category
- `add_axon_utility_table` - Added utilities system
- `seed_*` - Data seeding for utilities and assets

**Total Migrations**: 30+ migrations (as of 2025-12-15)

---

## 🔗 Relationships

### Entity Relationship Summary

```
axon_asset (1) ──< (M) axon_asset_tag (M) >── (1) axon_tag
    │
    ├──< (M) axon_asset_relation (self-referencing graph)
    │
    └──< (M) axon_asset_version (history)

axon_utility (independent)
```

### Cascade Delete Behavior

All foreign keys use `CASCADE DELETE`:
- Deleting an asset removes all its tags, relations, and versions
- Deleting a tag removes all asset-tag associations
- Utilities are independent (no foreign key relationships)

---

## 📊 Database Statistics

| Metric | Count |
|--------|-------|
| **Total Tables** | 6 |
| **Asset Tables** | 5 |
| **Utility Tables** | 1 |
| **Enums** | 4 |
| **Enum Values** | 30 (7 + 4 + 11 + 8) |
| **Indexes** | 17 |
| **Foreign Keys** | 5 |
| **Unique Constraints** | 3 |

---

## 🔐 Environment Variables

Required for database connection:

```bash
# Pooled connection (for application queries)
DATABASE_URL="postgresql://user:password@host/database?schema=public"

# Non-pooled connection (for migrations)
DATABASE_URL_UNPOOLED="postgresql://user:password@host/database?schema=public"
```

**Note**: Neon provides both pooled and unpooled connection strings.

---

## 📚 Related Documentation

- **ASSET_CLASSIFICATION_GUIDE.md** - Asset classification system and CRUD operations
- **COE_UTILITIES_IMPLEMENTATION_SUMMARY.md** - Utilities platform overview
- **prisma/schema.prisma** - Complete Prisma schema definition
- **prisma/migrations/** - Migration history and SQL files

---

## 🚀 Quick Commands

```bash
# Development
npm run dev                          # Start dev server
npm run prisma:studio                # Open database GUI

# Database Operations
npm run prisma:generate              # Generate Prisma Client
npm run prisma:migrate               # Create migration (dev)
npm run prisma:migrate:deploy        # Apply migrations (prod)

# Code Quality
npm run lint                         # Run ESLint
npm run format                       # Format with Prettier
npm run type-check                   # TypeScript check
npm run test                         # Run tests

# Build & Deploy
npm run build                        # Build for production
npm start                            # Start production server
```

---

## ✅ Schema Verification

**Current State** (as of 2025-12-15):
- ✅ 6 tables (5 asset + 1 utility)
- ✅ 4 enums (Category: 7, Status: 4, BizDomain: 11, RelationType: 8)
- ✅ All migrations applied
- ✅ All indexes created
- ✅ Foreign keys with CASCADE delete
- ✅ Prisma schema synchronized with database

---

**Document Version**: 3.0
**Schema Version**: Current
**Last Verified**: 2025-12-15

