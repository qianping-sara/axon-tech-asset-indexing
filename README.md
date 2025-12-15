# Axon Platform

**AutomationCoE Hub** - A unified discovery portal for automation assets, solution design guidance, and innovation opportunities.

## 🎯 Overview

**Axon** transforms scattered automation capabilities into circulating value by providing:

1. **Unified Asset Discovery** - Enterprise-wide catalog indexing all automation assets (APIs, bots, processes, workflows)
2. **Solution Design Advisor** - Decision-support utilities guiding teams to select the right solution approach
3. **Innovation Marketplace** - Platform for challenges, opportunities, and emerging tech exploration

**Built with**: Next.js 16, React 19, TypeScript, Prisma, PostgreSQL (Neon), Tailwind CSS 4

**Content as Code**: Markdown files with YAML frontmatter, automatically indexed and rendered

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes (18 endpoints)
│   └── (dashboard)/          # Frontend pages
├── components/               # React components
├── lib/                      # Business logic & utilities
└── hooks/                    # React hooks

assets/                       # Markdown content files
prisma/                       # Database schema & migrations
design_doc/                   # Technical documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js >=20.9.0
- PostgreSQL database (Neon recommended)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL

# 3. Setup database
npm run prisma:generate
npm run prisma:migrate -- --name init

# 4. Start development
npm run dev
```

Visit `http://localhost:3000`

## 📦 Common Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type check
npm run format           # Format with Prettier

# Database
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio

# Testing
npm run test             # Run tests
npm run test:coverage    # Coverage report
```

## 🚢 Deployment

**Platform**: Vercel (recommended)

**Required Environment Variables**:
- `DATABASE_URL` - PostgreSQL connection string (pooled)
- `DATABASE_URL_UNPOOLED` - For migrations only
- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXT_PUBLIC_APP_URL` - Application URL
- `GITHUB_WEBHOOK_SECRET` - Webhook verification (optional)

**See**: [VERCEL_SETUP.md](./VERCEL_SETUP.md) for detailed instructions

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [DATABASE_OVERVIEW.md](design_doc/DATABASE_OVERVIEW.md) | Database schema, tables, enums, tech stack |
| [API_DOCUMENTATION.md](design_doc/API_DOCUMENTATION.md) | All API endpoints with file locations |
| [ASSET_CLASSIFICATION_GUIDE.md](design_doc/ASSET_CLASSIFICATION_GUIDE.md) | Asset classification system and operations |
| [COE_UTILITIES_IMPLEMENTATION_SUMMARY.md](design_doc/COE_UTILITIES_IMPLEMENTATION_SUMMARY.md) | Utility registry and management |
| [AUTOMATION_SOLUTION_DESIGNER_GUIDE.md](design_doc/AUTOMATION_SOLUTION_DESIGNER_GUIDE.md) | Solution design evaluation logic |
| [STYLE_GUIDE_SUMMARY.md](design_doc/STYLE_GUIDE_SUMMARY.md) | UI design principles and standards |

---

## 📄 License

MIT
