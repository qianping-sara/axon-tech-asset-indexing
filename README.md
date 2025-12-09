# Asset Golden Index MVP

A technical asset discovery portal for Center of Excellence (CoE). Built with Next.js, Prisma, and Neon PostgreSQL.

## 🎯 Overview

**Axon** is the **AutomationCoE Hub** that unifies assets, guides solutions, and connects needs with emerging tech. It serves as the **Golden Index** for automation assets—a unified discovery portal that transforms scattered automation capabilities into circulating value.

### The Problem We Solve

**For Automation Developers & Solution Architects** - *The "Internal Silos" Need*
When automation assets (APIs, bots, processes) are scattered across multiple, siloed systems (Spax, Bizagi, Gravitee, RPA, Confluence), teams struggle to discover reusable assets. This leads to searching, wasting development time, and increasing future maintenance costs. Your automation would lead to "reinventing the wheel."

**For Solution Architects/FA & Enterprise Architects** - *The "Decision Paralysis" Need*
A clear way to make informed choice: Only relying on experience or manual reviews is unscalable. The CoE needs a way to embed its "playbook" and design standards directly into the decision process to ensure compliance, security, and quality before bad decisions are made.

**For Process Owners & Solution Architects/FA** - *The "Inspiration Gap" Need*
(Biz-to-Tech): Business teams lack a contextual channel to explore external technology trends (e.g., GenAI) that could solve their problems in new ways.

### Our Solution

Axon is the **Golden Index** for automation assets. We don't replace your existing systems—we connect them, providing a **single search interface** to discover all automation capabilities across your organization.

**Key Capabilities:**
- **Reliable**: Validated and trustworthy assets from source systems
- **Re-usable**: Build once, use multiple times across scenarios
- **Scalable**: Support future automation with sustainable architecture
- **Trackable**: Know which assets are used by whom and where

**What Makes Axon Different:**
- **Unified Asset Discovery**: Enterprise-wide "asset catalog" indexing all internal systems (APIs, bots, processes), transforming siloed, static technical accumulation into a portable library of dynamic, reusable components
- **Solution Design Advisor**: The CoE's "governance engine" that externalizes architectural wisdom into playbooks, decision trees, and reference architectures, guiding teams to select the correct solution (API vs. RPA vs. Low-code) for their specific problem
- **Innovation & Opportunity Marketplace**: The CoE's strategic "engagement center" creating a horizontal marketplace for real-time needs (via the Challenge Board) and intriguing opportunities (via the Innovation Radar), moving from a reactive "order-taker" to a proactive value orchestrator

This is a "content as code" platform where users maintain Markdown files for asset details, and the website automatically indexes and renders them. It supports 6 asset categories with 30+ asset types.

## 🏗️ Architecture

- **Framework**: Next.js 16 with App Router
- **Database**: Neon PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS 4
- **Content**: Markdown with YAML frontmatter
- **Deployment**: Vercel

## 📁 Project Structure

```
app/                          # Next.js App Router
├── api/                       # Backend API routes
├── (dashboard)/               # Frontend pages
└── layout.tsx

lib/                          # Shared libraries
├── db/                        # Database client
├── api/                       # Business logic
├── markdown/                  # Markdown parsing
├── types/                     # TypeScript types
└── utils/                     # Utilities

components/                   # React components
├── layout/                    # Layout components
├── assets/                    # Asset components
├── common/                    # Common UI components
└── markdown/                  # Markdown renderer

assets/                       # Content (Markdown files)
├── code/
├── services/
├── automation/
├── data/
├── architecture/
└── knowledge/

prisma/                       # Database schema
styles/                       # Global styles
hooks/                        # React hooks
tests/                        # Test files
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Neon PostgreSQL account

### Installation

1. **Clone and install**
```bash
cd app
npm install
```

2. **Configure environment**
```bash
cp .env.example .env.local
# Edit .env.local with your Neon database URL
```

3. **Setup database**
```bash
npm run prisma:migrate -- --name init
npm run prisma:generate
```

4. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000`

## 📦 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Run TypeScript type check
npm run test             # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
```

## 🗄️ Database Schema

### Core Models
- **Asset**: Main asset entity with metadata
- **Tag**: Asset tags for categorization
- **AssetTag**: Junction table for asset-tag relationships
- **AssetRelation**: Asset-to-asset relationships
- **AssetVersion**: Version history tracking

### Enums
- **Category**: 7 asset categories
- **Status**: DRAFT, PUBLISHED, DEPRECATED, ARCHIVED
- **RelationType**: 8 ArchiMate relationship types
  - **Structural**: COMPOSITION, AGGREGATION, ASSIGNMENT, REALIZATION
  - **Dependency**: SERVING, ACCESS, INFLUENCE, ASSOCIATION

## 📝 Asset Categories

1. **Code & Components** - Scripts, libraries, frameworks, components
2. **Services & APIs** - REST APIs, GraphQL, microservices
3. **Automation & Workflows** - RPA bots, workflows, processes
4. **Data & Analytics** - Data products, schemas, pipelines
5. **Architecture & Governance** - Architectures, patterns, standards, policies
6. **Knowledge & Practices** - SOPs, playbooks, tutorials, guides

## 🔄 Content as Code

Assets are stored as Markdown files in the `assets/` directory with YAML frontmatter:

```markdown
---
name: "Asset Name"
description: "Asset description"
category: "CODE_COMPONENTS"
assetType: "Script"
version: "1.0.0"
status: "PUBLISHED"
owner: "team@company.com"
tags:
  - python
  - data-processing
---

# Asset Details

Detailed content in Markdown format...
```

## 🔌 API Endpoints

### Assets
- `GET /api/assets` - List assets with filters (supports category, assetType, status, tag, search)
- `GET /api/assets/[id]` - Get asset details
- `POST /api/assets` - Create asset
- `PUT /api/assets/[id]` - Update asset
- `DELETE /api/assets/[id]` - Delete asset

**Query Parameters**:
- `category` - Filter by category (e.g., CODE_COMPONENTS)
- `assetType` - Filter by asset type (e.g., Scripts, REST APIs)
- `status` - Filter by status (PUBLISHED, DRAFT, DEPRECATED, ARCHIVED)
- `tag` - Filter by tag name
- `search` - Search in name and description
- `owner` - Filter by owner email
- `page` - Pagination page (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `sortBy` - Sort field (createdAt, updatedAt, name)
- `sortOrder` - Sort order (asc, desc)

### Tags
- `GET /api/tags` - List all tags
- `GET /api/tags/[id]` - Get tag details

### Categories
- `GET /api/categories` - List all categories

### Search
- `GET /api/search?q=keyword` - Search assets

### Sync
- `POST /api/sync` - GitHub webhook for content sync

### Health
- `GET /api/health` - Health check

## 🧪 Testing

```bash
npm run test              # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect repository**
   ```bash
   git push origin main
   ```
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

2. **Configure environment variables**
   - Add `DATABASE_URL` (pooled connection)
   - Add `DATABASE_URL_UNPOOLED` (for migrations)
   - Add `NEXT_PUBLIC_APP_NAME`
   - Add `NEXT_PUBLIC_APP_URL`
   - Add `GITHUB_WEBHOOK_SECRET`

3. **Run database migration**
   ```bash
   DATABASE_URL_UNPOOLED="your_unpooled_url" npx prisma migrate deploy
   ```

4. **Deploy**
   - Vercel automatically deploys on push to main

### Environment Variables

Required for production:
- `DATABASE_URL` - Neon PostgreSQL pooled connection string
- `DATABASE_URL_UNPOOLED` - Non-pooled connection (for migrations only)
- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXT_PUBLIC_APP_URL` - Application URL
- `GITHUB_WEBHOOK_SECRET` - GitHub webhook secret

**See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for detailed deployment instructions.**

## 📄 License

MIT

