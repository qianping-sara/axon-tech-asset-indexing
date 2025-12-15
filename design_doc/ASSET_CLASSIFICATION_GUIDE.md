# Asset Classification and Management Guide

**Version**: 3.0
**Last Updated**: 2025-12-15
**Status**: Active

---

## 📋 Overview

This document defines the complete classification system and management operations guide for the Axon Tech Asset Indexing system, including:
- Dual-dimension classification system (Technical Classification + Business Domain Classification)
- Classification hierarchy and enumeration values
- CRUD operations for classifications and assets

---

## 🏗️ Classification Architecture

Axon uses a **dual-dimension classification system** to categorize assets from both technical and business perspectives:

### 1️⃣ Technical Classification Dimension

Technical classification uses a two-level hierarchy:

#### **L1 Level: Asset Categories** - 7 Categories

| # | Category ID | Display Name | Description | Icon |
|---|---------|---------|------|------|
| 1 | `CODE_COMPONENTS` | Code & Components | Reusable code modules, libraries, frameworks, and UI components | 💻 |
| 2 | `SERVICES_APIS` | Services & APIs | Microservices, REST/GraphQL APIs, and integration services | 🔌 |
| 3 | `AI_ML_SERVICES` | AI/ML Services | Machine learning models, LLM services, and AI agents | 🤖 |
| 4 | `AUTOMATION_WORKFLOWS` | Automation & Workflows | RPA bots, no-code workflows, and business processes | ⚙️ |
| 5 | `DATA_ANALYTICS` | Data & Analytics | Datasets, data pipelines, schemas, and data products | 📊 |
| 6 | `ARCHITECTURE_GOVERNANCE` | Architecture & Governance | Architecture designs, standards, policies, and governance documents | 🏛️ |
| 7 | `KNOWLEDGE_PRACTICES` | Knowledge & Practices | SOPs, playbooks, tutorials, and best practices | 📚 |

#### **L2 Level: Asset Types** - 34 Types

Each category contains multiple specific asset types:

**CODE_COMPONENTS** (5 types)
- Scripts - Reusable automation scripts
- Frontend Components - Reusable UI components
- Backend Libraries - Reusable backend modules and packages
- Development Frameworks - SDKs, scaffolding, and development toolkits
- Open Source Projects - Curated and approved open-source tools

**SERVICES_APIS** (4 types)
- REST APIs - HTTP-based services for system-to-system interaction
- GraphQL APIs - Flexible query language APIs
- Microservices - Domain-driven services oriented to business scenarios
- Integration Services - Middleware components connecting disparate systems

**AI_ML_SERVICES** (5 types)
- ML Models - Trained machine learning models for prediction/classification
- LLM Services - Large Language Model services and APIs
- AI Agents - Autonomous AI agents for specific tasks
- ML Pipelines - End-to-end ML workflows (training, evaluation, deployment)
- Feature Stores - Centralized repositories for ML features

**AUTOMATION_WORKFLOWS** (4 types)
- RPA Bots - Robotic Process Automation components
- No-Code Workflows - Low-code/no-code automation platforms
- Business Processes - Business logic and process definitions (BPMN)
- Scheduled Jobs - Batch processing tasks

**DATA_ANALYTICS** (5 types)
- Data Products - Standardized, governed datasets for business scenarios
- Data Schemas - Formal data structure definitions (JSON, Avro, etc.)
- Datasets - Cleansed, curated foundational data collections
- Data Pipelines - ETL/ELT workflows for data movement and transformation
- Data Dictionaries - Centralized data element definitions and relationships

**ARCHITECTURE_GOVERNANCE** (8 types)
- Reference Architectures - High-level technical architecture designs
- Solution Patterns - Standardized designs for recurring business problems
- Technology Stacks - Approved technology combinations for project types
- Standards - Mandatory rules and specifications
- Principles - High-level direction statements
- Checklists - Verifiable quality assurance lists
- Policies - Governance documents defining operating models
- Decision Records - Immutable logs of architectural decisions

**KNOWLEDGE_PRACTICES** (5 types)
- SOPs - Step-by-step operational procedures
- Playbooks - Strategic guides for complex tasks
- Best Practices - Curated principles and successful patterns
- Tutorials - Hands-on learning materials
- Quick Start Guides - Concise actionable instructions

---

### 2️⃣ Business Domain Classification Dimension

Business domain classification uses a three-tier architecture with **11 business domains**:

#### **Core Servicing Domains** - 5 Domains

Primary value-delivering processes that directly fulfill insurance service promises:

| Domain | Display Name | Description | Icon |
|--------|---------|------|------|
| `CLAIM` | Claim | Manages all customer requests arising from an insured event, fulfilling the core promise of the insurance contract | 📋 |
| `FINANCIAL_CHANGE` | Financial Change | Handles changes related to the financial attributes of a policy, focusing on policy maintenance, corrections, and status | 💰 |
| `INQUIRY_GENERAL_CHANGES` | Inquiry & General Changes | Responds to routine customer queries and processes non-financial updates to policyholder information | 💬 |
| `MONEY_OUT` | Money Out | Processes all non-claim related fund withdrawals initiated by the customer or as scheduled by the contract | 💸 |
| `WEALTH` | Wealth | Provides specialized services related to investment-linked or wealth management products | 📈 |

#### **Support Domain Capabilities** - 5 Domains

Cross-cutting support services that enable and enhance core servicing processes:

| Domain | Display Name | Description | Icon |
|--------|---------|------|------|
| `CUSTOMER_ENGAGEMENT` | Customer Engagement | Ensures a consistent, seamless, and personalized service experience across all customer touchpoints | 👥 |
| `CUSTOMER_RELATIONSHIP_MANAGEMENT` | Customer & Relationship Management | Manages the master data and single source of truth for customer information | 🤝 |
| `PAYMENT_SETTLEMENT` | Payment & Settlement | Provides the underlying infrastructure for all fund movements supporting business processes | 💳 |
| `FINANCE_ACCOUNTING` | Finance & Accounting | Manages all financial bookkeeping, reconciliation, and settlement generated by service activities | 📊 |
| `RISK_COMPLIANCE` | Risk & Compliance | Ensures all service processes adhere to regulatory requirements and internal risk controls | 🛡️ |

#### **General Domain Capabilities** - 1 Domain

Fundamental infrastructure, utilities, and platform services that support all other domains:

| Domain | Display Name | Description | Icon |
|--------|---------|------|------|
| `COMMON_CAPABILITIES` | Common Capabilities | Provides shared infrastructure, data management, identity services, and document management capabilities | 🔧 |

---

### 3️⃣ Tagging System

Flexible tagging system for cross-cutting concerns and secondary classification:

- **Purpose**: Cross-cutting concerns, technology stacks, programming languages, etc.
- **Structure**: Tags have a category attribute (e.g., domain, language, technology, general)
- **Relationship**: Many-to-many relationship, one asset can have multiple tags
- **Examples**:
  - Tags with `category="domain"` can represent sub-domains within a business domain
  - Tags with `category="language"` represent programming languages (Java, Python, TypeScript)
  - Tags with `category="technology"` represent technology stacks (React, Spring Boot, PostgreSQL)

---

## 🔧 Classification and Asset Management Operations

### Operation 1: Query Classification Information

#### Query All Technical Categories

**API Endpoint**: `GET /api/categories`

**Query Parameters**:
- `stats=true` - Include asset count statistics for each category

**Code Location**:
- API: `src/app/api/categories/route.ts`
- Business Logic: `src/lib/api/categories.ts`
- Constants: `src/lib/constants/categories.ts`

**Example**:
```bash
# Get all categories
curl http://localhost:3000/api/categories

# Get categories with statistics
curl http://localhost:3000/api/categories?stats=true
```

#### Query Assets by Category

**API Endpoint**: `GET /api/categories/{category}`

**Code Location**:
- API: `src/app/api/categories/[category]/route.ts`

**Example**:
```bash
# Get all assets in SERVICES_APIS category
curl http://localhost:3000/api/categories/SERVICES_APIS
```

#### Query All Business Domains

**API Endpoint**: `GET /api/biz-domains`

**Query Parameters**:
- `stats=true` - Include asset count statistics for each domain

**Code Location**:
- API: `src/app/api/biz-domains/route.ts`
- Constants: `src/lib/constants/bizDomains.ts`

**Example**:
```bash
# Get all business domains
curl http://localhost:3000/api/biz-domains

# Get domains with statistics
curl http://localhost:3000/api/biz-domains?stats=true
```

---

### Operation 2: Add New Classification Values

Adding new classification values (Category or BizDomain) follows a similar pattern with specific differences in the files to modify.

#### Specific Actions by Classification Type

**For Category (Technical Classification)**:
- Update enum in: `prisma/schema.prisma` → `enum Category`
- Update constants in: `src/lib/constants/categories.ts` → `CATEGORIES` array
- Include: `name`, `displayName`, `description`, `icon`, `assetTypes[]`

**For BizDomain (Business Domain)**:
- Update enum in: `prisma/schema.prisma` → `enum BizDomain`
- Update constants in: `src/lib/constants/bizDomains.ts` → `BIZ_DOMAINS` array
- Include: `name`, `displayName`, `description`, `icon`, `category` (core/support/common)

#### Common Steps for Adding New Enum Values

**Step 1**: Update Prisma Schema
```prisma
// prisma/schema.prisma
enum Category {  // or enum BizDomain
  // ... existing values
  NEW_VALUE  // Add new value
}
```

**Step 2**: Create Database Migration
```bash
# Create migration directory
mkdir -p prisma/migrations/add_new_value

# Create migration SQL file
cat > prisma/migrations/add_new_value/migration.sql << 'EOF'
-- Add NEW_VALUE to Category (or BizDomain) enum
ALTER TYPE "Category" ADD VALUE 'NEW_VALUE';  -- or "BizDomain"
EOF

# Run migration
npx prisma migrate deploy
```

**Step 3**: Update Frontend Constants
```typescript
// src/lib/constants/categories.ts (or bizDomains.ts)
export const CATEGORIES: CategoryInfo[] = [  // or BIZ_DOMAINS
  // ... existing values
  {
    name: 'NEW_VALUE',
    displayName: 'Display Name',
    description: 'Description',
    icon: '🆕',  // emoji for categories, lucide-react icon name for domains
    // ... type-specific fields
  },
];
```

**Step 4**: Regenerate Prisma Client
```bash
npx prisma generate
```

**Reference Examples**:
- Category addition: `prisma/migrations/add_ai_ml_services_category/migration.sql`
- BizDomain addition: `prisma/migrations/add_biz_domain/migration.sql`

---

### Operation 3: Modify Existing Classification Values

Renaming or merging classification values requires careful data migration to preserve existing asset references.

#### Common Steps for Renaming/Merging Enum Values

**Step 1**: Create temporary enum type with both old and new values
```sql
CREATE TYPE "EnumName_new" AS ENUM (
  'EXISTING_VALUE_1',
  'EXISTING_VALUE_2',
  'OLD_VALUE',
  'NEW_VALUE'  -- New value
);
```

**Step 2**: Alter table column to use new type
```sql
ALTER TABLE "axon_asset"
ALTER COLUMN "columnName" TYPE "EnumName_new"
USING "columnName"::text::"EnumName_new";
```

**Step 3**: Migrate data from old to new values
```sql
UPDATE "axon_asset"
SET "columnName" = 'NEW_VALUE'
WHERE "columnName" = 'OLD_VALUE';
```

**Step 4**: Drop old type and rename new type
```sql
DROP TYPE "EnumName";
ALTER TYPE "EnumName_new" RENAME TO "EnumName";
```

**Step 5**: Update Prisma Schema and frontend constants to reflect changes

**Reference Examples**:
- `prisma/migrations/update_biz_domain_structure/migration.sql` - Complete restructuring example
- `scripts/migrate-biz-domain.js` - Data migration script example

---

### Operation 4: Delete Classification Values

#### ⚠️ Important Notice

**Direct deletion of enum values is NOT recommended** because:
1. PostgreSQL does not support direct removal of enum values
2. Existing assets may reference the value
3. It breaks historical data integrity

#### Recommended Approaches

**Approach 1: Mark as Deprecated** (Recommended)
- Add `deprecated: true` flag in frontend constants
- Hide the option in UI but preserve display for existing data
- Migrate existing assets to new classification values through data migration

**Approach 2: Complete Enum Rebuild** (Use with Caution)
- Create new enum type without the value to be removed
- Migrate all data to new values
- Drop old enum type
- Rename new enum type

**Example**:
```typescript
// src/lib/constants/categories.ts
export const CATEGORIES: CategoryInfo[] = [
  {
    name: 'OLD_CATEGORY',
    displayName: 'Old Category (Deprecated)',
    description: 'This category is deprecated',
    icon: '⚠️',
    assetTypes: [],
    deprecated: true, // Mark as deprecated
  },
  // ... other categories
];
```

---

### Operation 5: Add Assets (Without Changing Classifications)

When classifications remain unchanged, adding new assets is straightforward and can be done through multiple methods.

#### Method 1: Markdown File + Webhook (Recommended for Development)

**Step 1**: Create Markdown file with YAML frontmatter
```bash
# Create directory structure
mkdir -p public/assets/{category}/{type}

# Create asset file
cat > public/assets/services/rest-apis/my-api.md << 'EOF'
---
name: My API
description: Brief description
category: SERVICES_APIS
assetType: REST APIs
version: 1.0.0
status: PUBLISHED
owner: Team Name
sourceSystem: Internal
sourceLink: https://axon-tech-asset-indexing.vercel.app/assets/{asset-id}
bizDomain: CLAIM  # Optional
---
# Asset Content
Your markdown content here...
EOF
```

**Step 2**: Commit and push to GitHub
```bash
git add public/assets/services/rest-apis/my-api.md
git commit -m "Add My API asset"
git push origin main
```

**Result**: Webhook automatically syncs to database (5-10 seconds)

**Code Flow**:
- Parser: `src/lib/markdown/parser.ts` → `parseAssetMarkdown()`
- Webhook: `src/app/api/sync/route.ts` → `POST /api/sync`
- Sync Logic: `src/lib/api/sync.ts` → `syncAssetsFromWebhook()`

#### Method 2: Migration (Recommended for Production)

**Step 1**: Create Markdown file (same as Method 1)

**Step 2**: Create migration file
```bash
mkdir -p prisma/migrations/add_my_asset
cat > prisma/migrations/add_my_asset/migration.sql << 'EOF'
-- Add My Asset
INSERT INTO "axon_asset" (
  id, name, description, category, "assetType", version, status, owner,
  "contentPath", "contentHash", "sourceSystem", "sourceLink", "bizDomain",
  "createdAt", "updatedAt", "publishedAt"
) VALUES (
  'asset_my_api',
  'My API',
  'Brief description',
  'SERVICES_APIS',
  'REST APIs',
  '1.0.0',
  'PUBLISHED',
  'Team Name',
  'public/assets/services/rest-apis/my-api.md',
  'hash_value_here',
  'Internal',
  'https://axon-tech-asset-indexing.vercel.app/assets/asset_my_api',
  'CLAIM',
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;
EOF
```

**Step 3**: Run migration
```bash
npx prisma migrate deploy
```

**Advantages**:
- ✅ Ensures database and Markdown file synchronization
- ✅ Supports version control and rollback
- ✅ Suitable for production deployment
- ✅ Can create tags and asset-tag relationships simultaneously

#### Method 3: Direct API Call (Development Only)

⚠️ **Only for local development with server running**

```bash
curl -X POST http://localhost:3000/api/assets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My API",
    "description": "Description",
    "category": "SERVICES_APIS",
    "assetType": "REST APIs",
    "version": "1.0.0",
    "status": "PUBLISHED",
    "owner": "team@company.com",
    "contentPath": "public/assets/services/rest-apis/my-api.md",
    "contentHash": "abc123...",
    "sourceSystem": "Internal",
    "sourceLink": "https://axon-tech-asset-indexing.vercel.app/assets/asset_my_api",
    "bizDomain": "CLAIM"
  }'
```

**Code Location**:
- API: `src/app/api/assets/route.ts` → `POST /api/assets`
- Business Logic: `src/lib/api/assets.ts` → `createAsset()`

---

### Operation 6: Manage Tags

The tagging system provides flexible classification without modifying database enums.

#### Create Tag

**API Endpoint**: `POST /api/tags`

**Request Body**:
```json
{
  "name": "Tag Name",
  "description": "Tag description",
  "category": "domain" // or "language", "technology", "general"
}
```

**Code Location**: `src/lib/api/tags.ts` → `createTag()`

#### Update Tag

**API Endpoint**: `PUT /api/tags/{id}`

**Code Location**: `src/lib/api/tags.ts` → `updateTag()`

#### Delete Tag

**API Endpoint**: `DELETE /api/tags/{id}`

**Note**: Deleting a tag automatically removes all asset-tag associations (cascade delete)

**Code Location**: `src/lib/api/tags.ts` → `deleteTag()`

#### Add Tags to Assets

**Option 1**: Specify tags when creating asset
```json
{
  "name": "Asset Name",
  // ... other fields
  "tags": ["tag-id-1", "tag-id-2"]
}
```

**Option 2**: Create tags and associations via migration
```sql
-- Create tag if not exists
INSERT INTO "axon_tag" (id, name, category, "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'Tag Name', 'domain', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset and tag
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId", "createdAt")
SELECT
  gen_random_uuid(),
  'asset_id',
  id,
  NOW()
FROM "axon_tag"
WHERE name = 'Tag Name'
ON CONFLICT ("assetId", "tagId") DO NOTHING;
```

---

## 📊 Database Structure

### Core Tables

| Table Name | Purpose | Key Fields |
|------|------|---------|
| `axon_asset` | Main asset table | `category`, `assetType`, `bizDomain` |
| `axon_tag` | Tag table | `name`, `category` |
| `axon_asset_tag` | Asset-tag association table | `assetId`, `tagId` |

### Enum Types

| Enum Name | Value Count | Purpose |
|--------|--------|------|
| `Category` | 7 | Technical categories (L1) |
| `BizDomain` | 11 | Business domain classification |
| `Status` | 4 | Asset status |
| `RelationType` | 8 | Asset relationship types |

### Indexes

```sql
-- Asset table indexes
CREATE INDEX "axon_asset_category_idx" ON "axon_asset"("category");
CREATE INDEX "axon_asset_bizDomain_idx" ON "axon_asset"("bizDomain");
CREATE INDEX "axon_asset_status_idx" ON "axon_asset"("status");
CREATE INDEX "axon_asset_owner_idx" ON "axon_asset"("owner");
CREATE INDEX "axon_asset_updatedAt_idx" ON "axon_asset"("updatedAt");

-- Tag table indexes
CREATE INDEX "axon_tag_category_idx" ON "axon_tag"("category");

-- Association table indexes
CREATE INDEX "axon_asset_tag_assetId_idx" ON "axon_asset_tag"("assetId");
CREATE INDEX "axon_asset_tag_tagId_idx" ON "axon_asset_tag"("tagId");
```

---

## 🔍 Classification Use Cases

### Use Case 1: Browse Assets by Technical Category

**User Need**: "I want to see all REST APIs"

**Implementation**:
1. Filter by `category = 'SERVICES_APIS'`
2. Further filter by `assetType = 'REST APIs'`

**API Call**:
```bash
GET /api/assets?category=SERVICES_APIS&assetType=REST%20APIs
```

### Use Case 2: Browse Assets by Business Domain

**User Need**: "I want to see all claim-related assets"

**Implementation**:
1. Filter by `bizDomain = 'CLAIM'`

**API Call**:
```bash
GET /api/assets?bizDomain=CLAIM
```

### Use Case 3: Multi-Dimensional Combined Query

**User Need**: "I want to see all API services in the claim domain"

**Implementation**:
1. Filter by `category = 'SERVICES_APIS'` for technical category
2. Filter by `bizDomain = 'CLAIM'` for business domain

**API Call**:
```bash
GET /api/assets?category=SERVICES_APIS&bizDomain=CLAIM
```

### Use Case 4: Cross-Cutting Query Using Tags

**User Need**: "I want to see all assets using Java"

**Implementation**:
1. Query through tag system for all assets with `tag.name = 'Java'`

**API Call**:
```bash
GET /api/assets?tags=Java
```

---

## 📚 Related Documentation

- `DATABASE_SCHEMA_SUMMARY.md` - Database structure overview
- `API_DOCUMENTATION.md` - Detailed API documentation
- `DATABASE_INIT.md` - Database initialization guide

---

## 🔄 Version History

### v3.0 (2025-12-15)
- Consolidated `HOW_TO_ADD_ASSETS.md`, `ASSET_CLASSIFICATION_SYSTEM.md`, and `BIZ_DOMAIN.md`
- Added complete CRUD operations guide for classifications
- Updated based on current code implementation
- Translated to English
- Simplified and reorganized CRUD operations (common steps + specific differences)
- Added dedicated section for adding assets without changing classifications

### v2.0 (2025-11-05)
- Added business domain classification dimension
- Restructured business domains into three-tier architecture (core, support, common)

### v1.0 (2025-10-01)
- Initial version with 6 technical categories

