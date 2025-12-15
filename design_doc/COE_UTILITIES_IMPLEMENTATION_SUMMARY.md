# CoE Utilities Implementation Guide

**Version**: 2.0
**Last Updated**: 2025-12-15
**Status**: Active

---

## 📋 Overview

This document describes the CoE Utilities system, which provides a registry and entry point for various decision-support and automation tools. Each utility can be an independent application, and this platform maintains the utility registration, metadata, and access points.

---

## 🏗️ Utility Data Structure

### Database Schema: `axon_utility`

**Location**: `prisma/schema.prisma`

| Field | Type | Constraints | Description |
|------|------|------|------|
| `id` | TEXT | PRIMARY KEY | Unique utility identifier |
| `name` | VARCHAR(255) | NOT NULL | Utility name |
| `description` | TEXT | NOT NULL | Utility description |
| `category` | VARCHAR(100) | NOT NULL | Utility category (e.g., decision-support) |
| `icon` | VARCHAR(100) | NOT NULL | lucide-react icon name |
| `url` | VARCHAR(500) | NOT NULL | Utility access path |
| `version` | VARCHAR(50) | NOT NULL | Semantic version number |
| `status` | Status ENUM | DEFAULT: PUBLISHED | Status (DRAFT/PUBLISHED/DEPRECATED/ARCHIVED) |
| `owner` | VARCHAR(255) | NULLABLE | Owner/Team |
| `tags` | TEXT[] | DEFAULT: [] | Tag array for categorization |
| `createdAt` | TIMESTAMP | DEFAULT: NOW() | Creation timestamp |
| `updatedAt` | TIMESTAMP | NOT NULL | Last update timestamp |
| `publishedAt` | TIMESTAMP | NULLABLE | Publication timestamp |

**Indexes**:
- `category` - Filter by category
- `status` - Filter by status
- `owner` - Filter by owner

### Classification Dimensions

#### 1. Category Dimension
Currently supports one category with potential for expansion:
- **decision-support** - Tools for decision-making processes

**Future categories** (extensible):
- automation-tools
- analytics-tools
- integration-tools
- etc.

#### 2. Status Dimension
Four lifecycle states:
- **DRAFT** - Under development, not visible to users
- **PUBLISHED** - Active and available to users
- **DEPRECATED** - Still accessible but marked for retirement
- **ARCHIVED** - Hidden from main listing, kept for historical reference

#### 3. Tag Dimension
Flexible array of tags for cross-cutting classification:
- Technology tags (e.g., 'automation', 'ml', 'rpa')
- Domain tags (e.g., 'claim', 'underwriting', 'finance')
- Purpose tags (e.g., 'evaluation', 'calculation', 'analysis')

### TypeScript Type Definition

**Location**: `src/lib/types/utility.ts`

```typescript
export type UtilityStatus = 'DRAFT' | 'PUBLISHED' | 'DEPRECATED' | 'ARCHIVED';

export interface Utility {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string; // lucide-react icon name
  url: string;
  version: string;
  status: UtilityStatus;
  owner?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;
}
```

---

## 🛠️ Current Registered Utilities

The platform currently hosts **5 decision-support utilities** for automation solution design:

### 1. Business Case and Strategic Alignment
- **ID**: `tool-business-case-001`
- **Icon**: briefcase
- **URL**: `/utilities/business-case`
- **Purpose**: Evaluate business case strength and strategic alignment
- **Key Features**: 5 weighted evaluation criteria, scoring system, CSV export

### 2. Sourcing Model Analysis
- **ID**: `tool-sourcing-model-001`
- **Icon**: bar-chart-3
- **URL**: `/utilities/sourcing-model`
- **Purpose**: Determine optimal sourcing strategy (Build vs Buy vs Open Source)
- **Key Features**: 8 decision dimensions, multi-criteria scoring matrix, recommendation engine

### 3. Preliminary Evaluation and Shortlisting
- **ID**: `tool-preliminary-evaluation-001`
- **Icon**: filter
- **URL**: `/utilities/preliminary-evaluation`
- **Purpose**: Conduct preliminary solution evaluation and create shortlist
- **Key Features**: Two-step assessment (17 initial + sourcing-specific criteria), integration with Sourcing Model tool

### 4. TCO Calculation
- **ID**: `tool-tco-calculation-001`
- **Icon**: calculator
- **URL**: `/utilities/tco-calculation`
- **Purpose**: Calculate and compare Total Cost of Ownership over 5 years
- **Key Features**: Multi-solution comparison, direct/indirect cost breakdown, visualization charts, localStorage persistence

### 5. Automation Solution Designer
- **ID**: `tool-automation-solution-designer-001`
- **Icon**: zap
- **URL**: `/utilities/automation-solution-designer`
- **Purpose**: Guide structured assessment for automation technology stack design
- **Key Features**: Principled technology selection, architecture guidance, standardized approach

**Note**: Each utility is designed to be potentially independent. The platform's role is to:
- Maintain utility registry and metadata
- Provide unified entry point and navigation
- Enable discovery through search and categorization
- Track utility lifecycle (versioning, status)

---

## 🎨 Platform UI Components

### Utilities Listing Page: `/utilities`

**File**: `src/app/utilities/page.tsx`

**Core Features**:
- **Search**: Real-time search across utility names and descriptions (500ms debounce)
- **Category Filter**: Filter utilities by category
- **URL State Management**: Search and filter state persisted in URL parameters
- **Responsive Grid**: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)

**Component Hierarchy**:
```
UtilitiesPage
├─ Header (Navigation)
├─ UtilitySearch (Search input)
├─ UtilityCategoryFilter (Category buttons)
└─ UtilityGrid (Utility cards grid)
   └─ UtilityCard[] (Individual utility cards)
```

### Utility Card Component

**File**: `src/components/utilities/UtilityCard.tsx`

**Displays**:
- Utility icon (lucide-react)
- Utility name
- Category badge
- Description (max 3 lines, truncated)
- "Open" button linking to utility URL

---

## 🔌 API Endpoints

### GET /api/utilities

**File**: `src/app/api/utilities/route.ts`

**Query Parameters**:
- `category` - Filter by category
- `search` - Search by name/description
- `status` - Filter by status (default: PUBLISHED)

**Response Format**:
```json
{
  "success": true,
  "data": [
    {
      "id": "tool-xxx",
      "name": "Tool Name",
      "description": "...",
      "category": "decision-support",
      "icon": "calculator",
      "url": "/utilities/xxx",
      "version": "1.0.0",
      "status": "PUBLISHED",
      "owner": "Team Name",
      "tags": ["tag1", "tag2"],
      "createdAt": "2025-11-05T...",
      "updatedAt": "2025-11-05T...",
      "publishedAt": "2025-11-05T..."
    }
  ],
  "total": 5
}
```

**Data Flow**:
```
1. Page mount (useEffect)
   ↓
2. Call GET /api/utilities
   ↓
3. Prisma query axon_utility table
   ↓
4. Return utility list
   ↓
5. Frontend renders UtilityGrid
   ↓
6. Group by category and display
```

---

## 📁 File Structure

### Core Platform Files

```
src/
├── app/
│   ├── api/
│   │   └── utilities/
│   │       └── route.ts              # API endpoint for utility listing
│   └── utilities/
│       ├── page.tsx                  # Main utilities listing page
│       ├── business-case/
│       │   └── page.tsx              # Business Case utility
│       ├── sourcing-model/
│       │   └── page.tsx              # Sourcing Model utility
│       ├── preliminary-evaluation/
│       │   └── page.tsx              # Preliminary Evaluation utility
│       ├── tco-calculation/
│       │   └── page.tsx              # TCO Calculation utility
│       └── automation-solution-designer/
│           └── page.tsx              # Automation Solution Designer utility
├── components/
│   └── utilities/
│       ├── UtilityCard.tsx           # Utility card component
│       ├── UtilityGrid.tsx           # Grid layout component
│       ├── UtilitySearch.tsx         # Search input component
│       └── UtilityCategoryFilter.tsx # Category filter component
└── lib/
    ├── types/
    │   └── utility.ts                # TypeScript type definitions
    └── constants/
        └── utilities.ts              # Utility category constants

prisma/
├── schema.prisma                     # Database schema (axon_utility model)
└── migrations/
    ├── add_axon_utility_table/       # Create utility table
    ├── seed_decision_support_tools/  # Seed Business Case utility
    ├── seed_sourcing_model_tool/     # Seed Sourcing Model utility
    ├── seed_preliminary_evaluation_tool/  # Seed Preliminary Evaluation utility
    ├── seed_tco_calculation_tool/    # Seed TCO Calculation utility
    └── seed_automation_solution_designer_tool/  # Seed Automation Solution Designer
```

---

## 🔄 Utility Management Operations

### Adding a New Utility

**Step 1**: Create migration file
```bash
mkdir -p prisma/migrations/seed_new_utility
cat > prisma/migrations/seed_new_utility/migration.sql << 'EOF'
INSERT INTO "axon_utility" (
  "id", "name", "description", "category", "icon", "url",
  "version", "status", "owner", "tags",
  "createdAt", "updatedAt", "publishedAt"
) VALUES (
  'tool-new-utility-001',
  'New Utility Name',
  'Description of the utility',
  'decision-support',
  'icon-name',
  '/utilities/new-utility',
  '1.0.0',
  'PUBLISHED',
  'Team Name',
  ARRAY['tag1', 'tag2'],
  NOW(), NOW(), NOW()
) ON CONFLICT ("id") DO NOTHING;
EOF
```

**Step 2**: Run migration
```bash
npx prisma migrate deploy
```

**Step 3**: Create utility page (optional, if hosted on this platform)
```bash
# Create page directory
mkdir -p src/app/utilities/new-utility

# Create page.tsx
# Implement utility-specific functionality
```

**Note**: The utility can be hosted externally. In that case, only the database registration is needed with an external URL.

### Updating a Utility

Update utility metadata through database migration or direct SQL:
```sql
UPDATE "axon_utility"
SET
  "name" = 'Updated Name',
  "description" = 'Updated description',
  "version" = '2.0.0',
  "updatedAt" = NOW()
WHERE "id" = 'tool-xxx';
```

### Deprecating a Utility

Mark utility as deprecated without removing it:
```sql
UPDATE "axon_utility"
SET
  "status" = 'DEPRECATED',
  "updatedAt" = NOW()
WHERE "id" = 'tool-xxx';
```

### Archiving a Utility

Archive utility (hidden from main listing):
```sql
UPDATE "axon_utility"
SET
  "status" = 'ARCHIVED',
  "updatedAt" = NOW()
WHERE "id" = 'tool-xxx';
```

---

## 🎯 Platform Responsibilities

The CoE Utilities platform serves as a **registry and entry point** for utilities. Its core responsibilities are:

### 1. Utility Registration
- Maintain utility metadata in `axon_utility` table
- Track utility lifecycle (DRAFT → PUBLISHED → DEPRECATED → ARCHIVED)
- Version management for utilities

### 2. Discovery and Navigation
- Provide searchable listing page (`/utilities`)
- Enable filtering by category and tags
- Display utility cards with metadata
- Route users to utility URLs (internal or external)

### 3. Metadata Management
- Store utility information (name, description, icon, URL, version, owner, tags)
- Support categorization and tagging
- Track creation, update, and publication timestamps

### 4. Utility Independence
- Each utility can be an independent application
- Utilities can be hosted on this platform or externally
- Platform only needs to maintain registration and entry point
- Utility-specific implementation details are not the platform's concern


