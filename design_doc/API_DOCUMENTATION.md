# Axon Platform - API Reference

**Version**: 2.0
**Last Updated**: 2025-12-15
**Status**: Production
**Base URL**: `https://your-domain.vercel.app/api`

---

## 📋 Overview

This document provides a concise reference for all API endpoints in the Axon platform. Each endpoint includes its HTTP method, path, file location, and brief description.

**API Design Principles**:
- RESTful architecture
- JSON request/response format
- Consistent error handling
- Pagination for list endpoints

**Authentication**: No authentication required (MVP phase)

---

## 📚 API Endpoints

### Asset Management

| Method | Endpoint | File | Description |
|--------|----------|------|-------------|
| **GET** | `/api/assets` | `src/app/api/assets/route.ts` | List assets with pagination, filtering, and search |
| **POST** | `/api/assets` | `src/app/api/assets/route.ts` | Create a new asset |
| **GET** | `/api/assets/[id]` | `src/app/api/assets/[id]/route.ts` | Get asset details by ID |
| **PUT** | `/api/assets/[id]` | `src/app/api/assets/[id]/route.ts` | Update asset by ID |
| **DELETE** | `/api/assets/[id]` | `src/app/api/assets/[id]/route.ts` | Delete asset by ID |
| **GET** | `/api/assets/[id]/content` | `src/app/api/assets/[id]/content/route.ts` | Get asset markdown content |

**Key Features**:
- Pagination support (page, limit)
- Filtering by category, assetType, status, tag, owner, bizDomain
- Full-text search in name and description
- Sorting by createdAt, updatedAt, name

---

### Tag Management

| Method | Endpoint | File | Description |
|--------|----------|------|-------------|
| **GET** | `/api/tags` | `src/app/api/tags/route.ts` | List tags with pagination and filtering |
| **GET** | `/api/tags/[id]` | `src/app/api/tags/[id]/route.ts` | Get tag details with associated assets |

**Key Features**:
- Pagination support
- Filter by tag category
- Search in name and description
- Sort by name, createdAt, updatedAt

---

### Category Management

| Method | Endpoint | File | Description |
|--------|----------|------|-------------|
| **GET** | `/api/categories` | `src/app/api/categories/route.ts` | List all categories with optional statistics |
| **GET** | `/api/categories/[category]` | `src/app/api/categories/[category]/route.ts` | Get category details with assets |

**Key Features**:
- Optional statistics (asset counts by status)
- Valid categories: CODE_COMPONENTS, SERVICES_APIS, AI_ML_SERVICES, AUTOMATION_WORKFLOWS, DATA_ANALYTICS, ARCHITECTURE_GOVERNANCE, KNOWLEDGE_PRACTICES

---

### Business Domain Management

| Method | Endpoint | File | Description |
|--------|----------|------|-------------|
| **GET** | `/api/biz-domains` | `src/app/api/biz-domains/route.ts` | List all business domains with optional statistics |

**Key Features**:
- Optional statistics (asset counts per domain)
- 11 business domains across 3 tiers (Core Servicing, Support, General)

---

### Search

| Method | Endpoint | File | Description |
|--------|----------|------|-------------|
| **GET** | `/api/search` | `src/app/api/search/route.ts` | Search assets and tags by query |

**Key Features**:
- Required query parameter: `q`
- Optional limit (max: 100)
- Optional suggestions mode (returns suggestions instead of results)

---

### Utility Management

| Method | Endpoint | File | Description |
|--------|----------|------|-------------|
| **GET** | `/api/utilities` | `src/app/api/utilities/route.ts` | List utilities with filtering |

**Key Features**:
- Filter by category, status
- Search in name and description
- Default status: PUBLISHED

---

### Sync & Webhook

| Method | Endpoint | File | Description |
|--------|----------|------|-------------|
| **GET** | `/api/sync` | `src/app/api/sync/route.ts` | Get sync status |
| **POST** | `/api/sync` | `src/app/api/sync/route.ts` | GitHub webhook endpoint for syncing assets |

**Key Features**:
- GitHub webhook signature verification
- Automatic asset synchronization from repository
- Requires `GITHUB_WEBHOOK_SECRET` environment variable

---

### System & Health

| Method | Endpoint | File | Description |
|--------|----------|------|-------------|
| **GET** | `/api/health` | `src/app/api/health/route.ts` | Health check endpoint |
| **GET** | `/api/init` | `src/app/api/init/route.ts` | Check database initialization status |
| **POST** | `/api/init` | `src/app/api/init/route.ts` | Initialize database (requires auth token) |

**Key Features**:
- Database connectivity check
- Uptime monitoring
- Protected initialization endpoint (requires `INIT_TOKEN`)

---

## 📊 Response Format Standards

### Success Response

```json
{
  "success": true,
  "data": {},
  "pagination": {}  // Optional, only for list endpoints
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "details": {}  // Optional, for validation errors
}
```

### Pagination Object

```json
{
  "page": 1,
  "limit": 20,
  "total": 100,
  "totalPages": 5,
  "hasMore": true
}
```

---

## 🔑 Common Query Parameters

### Pagination
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

### Filtering
- `category`: Filter by category (e.g., CODE_COMPONENTS)
- `assetType`: Filter by asset type (e.g., Scripts)
- `status`: Filter by status (DRAFT, PUBLISHED, DEPRECATED, ARCHIVED)
- `tag`: Filter by tag name
- `owner`: Filter by owner email
- `bizDomain`: Filter by business domain

### Sorting
- `sortBy`: Sort field (createdAt, updatedAt, name)
- `sortOrder`: Sort order (asc, desc)

### Search
- `q`: Search query (required for /api/search)
- `search`: Search in name and description
- `suggestions`: Return suggestions instead of results (boolean)

---

## 📋 Data Enums

### Categories (7)
```
CODE_COMPONENTS
SERVICES_APIS
AI_ML_SERVICES
AUTOMATION_WORKFLOWS
DATA_ANALYTICS
ARCHITECTURE_GOVERNANCE
KNOWLEDGE_PRACTICES
```

### Statuses (4)
```
DRAFT      - Not yet published
PUBLISHED  - Available for use
DEPRECATED - Use alternative
ARCHIVED   - No longer maintained
```

### Business Domains (11)
**Core Servicing (5)**:
```
CLAIM
FINANCIAL_CHANGE
INQUIRY_GENERAL_CHANGES
MONEY_OUT
WEALTH
```

**Support (5)**:
```
CUSTOMER_ENGAGEMENT
CUSTOMER_RELATIONSHIP_MANAGEMENT
PAYMENT_SETTLEMENT
FINANCE_ACCOUNTING
RISK_COMPLIANCE
```

**General (1)**:
```
COMMON_CAPABILITIES
```

---

## 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `GITHUB_WEBHOOK_SECRET` | No | Secret for GitHub webhook verification |
| `INIT_TOKEN` | No | Token for database initialization endpoint |

---

## 📚 Related Documentation

- **Database Schema**: `design_doc/DATABASE_OVERVIEW.md`
- **Asset Classification**: `design_doc/ASSET_CLASSIFICATION_GUIDE.md`
- **Utilities**: `design_doc/COE_UTILITIES_IMPLEMENTATION_SUMMARY.md`

---

**Document Version**: 2.0
**Last Verified**: 2025-12-15
**Status**: Production
