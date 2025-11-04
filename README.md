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

### Vercel

1. **Connect repository**
   - Push code to GitHub
   - Connect repo to Vercel

2. **Configure environment**
   - Add `DATABASE_URL` to Vercel environment variables
   - Add other required env vars

3. **Deploy**
   - Vercel automatically deploys on push to main

### Environment Variables

Required for production:
- `DATABASE_URL` - Neon PostgreSQL connection string
- `DATABASE_URL_UNPOOLED` - Non-pooled connection (for migrations)
- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXT_PUBLIC_APP_URL` - Application URL
- `GITHUB_WEBHOOK_SECRET` - GitHub webhook secret

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
