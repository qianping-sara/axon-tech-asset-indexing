# Asset Golden Index MVP

A technical asset discovery portal for Center of Excellence (CoE). Built with Next.js, Prisma, and Neon PostgreSQL.

## 🎯 Overview

Asset Golden Index is a "content as code" platform where users maintain Markdown files for asset details, and the website automatically indexes and renders them. It supports 6 asset categories with 30+ asset types.

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
- **Category**: 6 asset categories
- **Status**: DRAFT, PUBLISHED, DEPRECATED, ARCHIVED
- **RelationType**: USES, IMPLEMENTS, EXTENDS, RELATED_TO, DEPENDS_ON, SUPERSEDES

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
- `GET /api/assets` - List assets with filters
- `GET /api/assets/[id]` - Get asset details
- `POST /api/assets` - Create asset
- `PUT /api/assets/[id]` - Update asset
- `DELETE /api/assets/[id]` - Delete asset

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

## 📚 Documentation

- [Database Design](../design/DB_DESIGN.md)
- [Workspace Structure](../design/WORKSPACE_STRUCTURE.md)
- [Development Tasks](../design/DEVELOPMENT_TASKS.md)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📄 License

MIT

## 👥 Team

Asset Golden Index MVP - Center of Excellence

---

## ✅ Project Status

### Phase 1: Project Setup (COMPLETED)
- [x] Task 1.1: Project creation and dependencies installation
- [x] Task 1.2: Database initialization (schema created, ready for Vercel setup)
- [x] Task 1.3: Project structure creation
- [x] Task 1.4: Git and CI/CD initialization

### Phase 2: Backend API Development (IN PROGRESS)
- [x] Task 2.1: Asset API - List, Search, and Filtering
  - [x] GET /api/assets (pagination, filtering, sorting)
  - [x] GET /api/assets?search=keyword (search)
  - [x] GET /api/assets?category=CODE_COMPONENTS (category filter)
  - [x] GET /api/assets?tag=python (tag filter)
  - [x] Query optimization and caching strategy
  - [x] Unit tests for asset API
  - [x] Integration tests for API endpoints
  - [x] API documentation

- [x] Task 2.3: Asset API - Create, Update, and Delete
  - [x] POST /api/assets (create asset)
  - [x] GET /api/assets/[id] (get asset details)
  - [x] PUT /api/assets/[id] (update asset)
  - [x] DELETE /api/assets/[id] (delete asset)
  - [x] Comprehensive data validation
  - [x] Validation utilities for all fields
  - [x] Unit tests for validation
  - [x] Unit tests for asset detail operations
  - [x] Integration tests for detail API endpoints
  - [x] API documentation with examples

- [x] Task 2.4: Tags and Categories API
  - [x] GET /api/tags (list tags with pagination and filtering)
  - [x] GET /api/tags/[id] (get tag details with associated assets)
  - [x] GET /api/categories (list all categories with asset counts)
  - [x] GET /api/categories/[category] (get category details with assets)
  - [x] Category statistics and metadata
  - [x] Unit tests for tags API
  - [x] Unit tests for categories API

- [x] Task 2.5: Markdown Parsing and GitHub Webhook Sync
  - [x] Markdown file parsing with Frontmatter extraction (gray-matter)
  - [x] Asset metadata validation
  - [x] SHA256 content hash calculation for change detection
  - [x] GitHub webhook signature verification
  - [x] File change detection (added, modified, removed)
  - [x] Asset sync business logic (create, update, delete)
  - [x] POST /api/sync (GitHub webhook endpoint)
  - [x] GET /api/sync (sync status endpoint)
  - [x] Unit tests for Markdown parser (15 tests)
  - [x] Unit tests for hash and webhook utilities (20 tests)
  - [x] Unit tests for sync business logic (8 tests)

### Next Steps
- Task 2.6: Frontend pages development
- Task 2.7: Integration tests for sync API
- Task 2.8: Testing and optimization

### Database Setup Notes
- Prisma schema is ready in `prisma/schema.prisma`
- Database migration will be executed in Vercel environment
- Use `DATABASE_URL_UNPOOLED` for migrations in production
- Use `DATABASE_URL` (pooled) for application connections
- All tables prefixed with `axon_` for isolation from existing tables
