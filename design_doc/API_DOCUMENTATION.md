# Axon Asset Golden Index - API Documentation

**Version**: 1.0
**Last Updated**: 2025-11-05
**Status**: Production Ready
**Base URL**: `https://your-domain.vercel.app/api`

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Assets API](#assets-api)
4. [Tags API](#tags-api)
5. [Categories API](#categories-api)
6. [Search API](#search-api)
7. [Health Check API](#health-check-api)
8. [Data Validation](#data-validation)
9. [Error Handling](#error-handling)

---

## Overview

The Axon Asset Golden Index API provides comprehensive endpoints for managing and discovering technical assets. The API supports:

- **Asset Management**: Create, read, update, delete assets
- **Categorization**: Browse assets by 7 categories and 34+ asset types
- **Tagging**: Organize assets with flexible tagging system
- **Search**: Full-text search across assets and tags
- **Filtering**: Advanced filtering by category, status, owner, and more

### Key Features

✅ RESTful API design
✅ JSON request/response format
✅ Pagination support for list endpoints
✅ Advanced filtering and sorting
✅ Full-text search capabilities
✅ Comprehensive error handling
✅ Health check monitoring

---

## Authentication

**Current Status**: No authentication required (MVP phase)

Future versions will implement:
- API key authentication
- Role-based access control (RBAC)
- Rate limiting

---

## Assets API

### 1. List Assets

**Endpoint**: `GET /api/assets`

**Query Parameters**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | number | 1 | Page number for pagination |
| `limit` | number | 20 | Items per page (max: 100) |
| `category` | string | - | Filter by category |
| `assetType` | string | - | Filter by asset type |
| `status` | string | - | Filter by status |
| `tag` | string | - | Filter by tag name |
| `search` | string | - | Search in name and description |
| `owner` | string | - | Filter by owner email |
| `sortBy` | string | updatedAt | Sort field (createdAt, updatedAt, name) |
| `sortOrder` | string | desc | Sort order (asc, desc) |

**Examples**

```bash
# Get first page
curl "https://your-domain.vercel.app/api/assets"

# Filter by category
curl "https://your-domain.vercel.app/api/assets?category=CODE_COMPONENTS"

# Search
curl "https://your-domain.vercel.app/api/assets?search=python"

# Complex filter
curl "https://your-domain.vercel.app/api/assets?category=SERVICES_APIS&status=PUBLISHED"
```

**Response**

```json
{
  "success": true,
  "data": [
    {
      "id": "clx1234567890",
      "name": "Python Data Processing Script",
      "description": "A script for processing data",
      "category": "CODE_COMPONENTS",
      "assetType": "Scripts",
      "version": "1.0.0",
      "status": "PUBLISHED",
      "owner": "team@company.com",
      "contentPath": "assets/code/scripts/python-script.md",
      "contentHash": "abc123def456...",
      "sourceSystem": "GitHub",
      "sourceLink": "https://github.com/example/repo",
      "createdAt": "2024-11-04T12:00:00Z",
      "updatedAt": "2024-11-04T12:00:00Z",
      "tags": [{"id": "tag1", "name": "python"}]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "totalPages": 3,
    "hasMore": true
  }
}
```

---

### 2. Get Asset Details

**Endpoint**: `GET /api/assets/[id]`

**Example**

```bash
curl "https://your-domain.vercel.app/api/assets/clx1234567890"
```

**Response**

```json
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "name": "Asset Name",
    "description": "Asset description",
    "category": "CODE_COMPONENTS",
    "assetType": "Scripts",
    "version": "1.0.0",
    "status": "PUBLISHED",
    "owner": "team@company.com",
    "contentPath": "assets/code/scripts/asset.md",
    "contentHash": "abc123...",
    "sourceSystem": "GitHub",
    "sourceLink": "https://github.com/...",
    "createdAt": "2024-11-04T12:00:00Z",
    "updatedAt": "2024-11-04T12:00:00Z",
    "tags": [
      {
        "id": "tag1",
        "name": "python",
        "category": "language",
        "description": "Python programming language"
      }
    ]
  }
}
```

---

### 3. Get Asset Content

**Endpoint**: `GET /api/assets/[id]/content`

**Description**: Fetch the Markdown content of an asset

**Example**

```bash
curl "https://your-domain.vercel.app/api/assets/clx1234567890/content"
```

**Response**

```json
{
  "success": true,
  "data": {
    "frontmatter": {
      "title": "Asset Title",
      "description": "Asset description"
    },
    "content": "# Asset Title\n\nMarkdown content here..."
  }
}
```

---

### 4. Create Asset

**Endpoint**: `POST /api/assets`

**Request Body** (all fields required)

```json
{
  "name": "New Asset",
  "description": "Asset description (at least 10 characters)",
  "category": "CODE_COMPONENTS",
  "assetType": "Scripts",
  "version": "1.0.0",
  "status": "PUBLISHED",
  "owner": "team@company.com",
  "contentPath": "assets/code/scripts/new-asset.md",
  "contentHash": "a1b2c3d4e5f6...(64 hex characters)",
  "sourceSystem": "GitHub",
  "sourceLink": "https://github.com/example/repo",
  "tags": ["tag-id-1", "tag-id-2"]
}
```

**Response**

```json
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "name": "New Asset",
    ...
  }
}
```

---

### 5. Update Asset

**Endpoint**: `PUT /api/assets/[id]`

**Request Body** (all fields optional)

```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "status": "DEPRECATED",
  "version": "2.0.0"
}
```

**Response**

```json
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "name": "Updated Name",
    ...
  }
}
```

---

### 6. Delete Asset

**Endpoint**: `DELETE /api/assets/[id]`

**Response**

```json
{
  "success": true,
  "message": "Asset deleted successfully"
}
```

---

## Tags API

### 1. List Tags

**Endpoint**: `GET /api/tags`

**Query Parameters**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page (max: 100) |
| `category` | string | - | Filter by tag category |
| `search` | string | - | Search in name and description |
| `sortBy` | string | createdAt | Sort field |


---

## API Endpoints Summary

### Assets Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/assets` | List assets with pagination and filters |
| POST | `/api/assets` | Create a new asset |
| GET | `/api/assets/[id]` | Get asset details by ID |
| GET | `/api/assets/[id]/content` | Get asset Markdown content |
| PUT | `/api/assets/[id]` | Update asset by ID |
| DELETE | `/api/assets/[id]` | Delete asset by ID |

### Tags Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tags` | List tags with pagination and filters |
| GET | `/api/tags/[id]` | Get tag details with associated assets |

### Categories Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | List all categories with optional stats |
| GET | `/api/categories/[category]` | Get category details with assets |

### Search Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/search` | Search assets and tags |

### System Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check endpoint |

---

## Response Format Standards

### Success Response Structure

```json
{
  "success": true,
  "data": {},
  "pagination": {}  // Optional, only for list endpoints
}
```

### Error Response Structure

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

## Asset Categories & Types

### 7 Main Categories

1. **CODE_COMPONENTS** - Code & Components
   - Scripts
   - Frontend Components
   - Backend Libraries
   - Development Frameworks
   - Open Source Projects

2. **SERVICES_APIS** - Services & APIs
   - REST APIs
   - GraphQL APIs
   - Microservices
   - Integration Services

3. **AI_ML_SERVICES** - AI/ML Services ⭐ NEW
   - ML Models
   - LLM Services
   - AI Agents
   - ML Pipelines
   - Feature Stores

4. **AUTOMATION_WORKFLOWS** - Automation & Workflows
   - RPA Bots
   - No-Code Workflows
   - Business Processes
   - Scheduled Jobs

5. **DATA_ANALYTICS** - Data & Analytics
   - Data Products
   - Data Schemas
   - Datasets
   - Data Pipelines
   - Data Dictionaries

6. **ARCHITECTURE_GOVERNANCE** - Architecture & Governance
   - Reference Architectures
   - Solution Patterns
   - Technology Stacks
   - Standards
   - Principles
   - Checklists
   - Policies
   - Decision Records

7. **KNOWLEDGE_PRACTICES** - Knowledge & Practices
   - SOPs
   - Playbooks
   - Best Practices
   - Tutorials
   - Quick Start Guides

---

## Asset Statuses

```
DRAFT      - Asset is in draft state, not yet published
PUBLISHED  - Asset is published and available for use
DEPRECATED - Asset is deprecated, use alternative
ARCHIVED   - Asset is archived, no longer maintained
```

---

## Common Use Cases

### Use Case 1: Browse Assets by Category

```bash
# Get all published CODE_COMPONENTS
curl "https://your-domain.vercel.app/api/assets?category=CODE_COMPONENTS&status=PUBLISHED"

# Get all AI/ML Services
curl "https://your-domain.vercel.app/api/assets?category=AI_ML_SERVICES"
```

### Use Case 2: Search for Specific Asset

```bash
# Search for Python-related assets
curl "https://your-domain.vercel.app/api/search?q=python&limit=10"

# Get search suggestions
curl "https://your-domain.vercel.app/api/search?q=py&suggestions=true"
```

### Use Case 3: Get Asset with Content

```bash
# Get asset metadata
curl "https://your-domain.vercel.app/api/assets/clx1234567890"

# Get asset Markdown content
curl "https://your-domain.vercel.app/api/assets/clx1234567890/content"
```

### Use Case 4: Filter by Multiple Criteria

```bash
# Get published REST APIs owned by specific team
curl "https://your-domain.vercel.app/api/assets?category=SERVICES_APIS&assetType=REST%20APIs&status=PUBLISHED&owner=team@company.com"

# Get assets with specific tag
curl "https://your-domain.vercel.app/api/assets?tag=python&status=PUBLISHED"
```

### Use Case 5: Pagination

```bash
# Get second page with 10 items per page
curl "https://your-domain.vercel.app/api/assets?page=2&limit=10"

# Get all assets sorted by name
curl "https://your-domain.vercel.app/api/assets?sortBy=name&sortOrder=asc"
```

### Use Case 6: Browse Tags

```bash
# Get all tags
curl "https://your-domain.vercel.app/api/tags"

# Get tags in specific category
curl "https://your-domain.vercel.app/api/tags?category=language"

# Get tag details with associated assets
curl "https://your-domain.vercel.app/api/tags/tag1"
```

### Use Case 7: Category Statistics

```bash
# Get categories with statistics
curl "https://your-domain.vercel.app/api/categories?stats=true"

# Get specific category details
curl "https://your-domain.vercel.app/api/categories/CODE_COMPONENTS"
```

---

## Implementation Notes

### Database Indexes

The following fields are indexed for optimal query performance:
- `category`
- `status`
- `owner`
- `updatedAt`
- `createdAt`

### Content Path Convention

All assets should follow this path convention:
```
assets/[category]/[assetType]/[asset-name].md
```

Examples:
```
assets/code/scripts/deployment-script.md
assets/services/rest-apis/policy-api.md
assets/ai-ml/models/fraud-detection.md
```

### Content Hash

The `contentHash` field should be a SHA256 hash of the file content:
```bash
# Generate SHA256 hash
sha256sum filename.md
```

### Semantic Versioning

The `version` field should follow semantic versioning (MAJOR.MINOR.PATCH):
```
1.0.0
1.0.1
1.1.0
2.0.0
```

---

## Rate Limiting (Future)

Currently no rate limiting is implemented. Future versions will include:

- **Per-IP Rate Limiting**: 1000 requests per hour
- **Per-API-Key Rate Limiting**: 5000 requests per hour
- **Burst Allowance**: 100 requests per minute

---

## Changelog

### Version 1.0 (2025-11-05)

- Initial API release
- Assets CRUD operations
- Tags management
- Categories browsing
- Full-text search
- Health check endpoint
- Support for 7 categories and 34+ asset types
- AI/ML Services category support

---

## Migration Guide

### From Previous Versions

If migrating from an older API version:

1. Update all API endpoints to use `/api/` prefix
2. Update category names to match new enum values
3. Ensure all assets have valid `contentHash` (SHA256)
4. Update asset paths to follow new convention
5. Migrate tags to new tag system

---

## Troubleshooting

### Common Issues

**Issue**: "Asset not found" error
- **Solution**: Verify the asset ID is correct and the asset exists

**Issue**: "Validation failed" error
- **Solution**: Check all required fields are provided and valid

**Issue**: "Database connection failed" error
- **Solution**: Check database connectivity and health endpoint

**Issue**: Search returns no results
- **Solution**: Try broader search terms or check asset status

---

## Best Practices

1. **Always use pagination** for list endpoints to avoid performance issues
2. **Use filters** to reduce the amount of data returned
3. **Cache responses** when appropriate (see caching strategy)
4. **Handle errors gracefully** with proper error handling
5. **Use search** for discovering assets instead of listing all
6. **Validate input** before sending to API
7. **Use appropriate HTTP methods** (GET for retrieval, POST for creation, etc.)
8. **Include proper headers** (Content-Type: application/json)

---

## Support & Contact

For API issues, feature requests, or questions:
- Contact the development team
- Check the GitHub repository for issues
- Review the design documentation

---

**Last Updated**: 2025-11-05
**API Version**: 1.0
**Status**: Production Ready
| `sortOrder` | string | desc | Sort order |

**Response**

```json
{
  "success": true,
  "data": [
    {
      "id": "tag1",
      "name": "python",
      "description": "Python programming language",
      "category": "language",
      "createdAt": "2024-11-04T12:00:00Z",
      "updatedAt": "2024-11-04T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "totalPages": 1,
    "hasMore": false
  }
}
```

---

### 2. Get Tag Details

**Endpoint**: `GET /api/tags/[id]`

**Response**

```json
{
  "success": true,
  "data": {
    "id": "tag1",
    "name": "python",
    "description": "Python programming language",
    "category": "language",
    "assetCount": 5,
    "assets": [
      {
        "id": "asset1",
        "name": "Python Script",
        "category": "CODE_COMPONENTS"
      }
    ]
  }
}
```

---

## Categories API

### 1. List Categories

**Endpoint**: `GET /api/categories`

**Query Parameters**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `stats` | boolean | false | Include detailed statistics |

**Response (Basic)**

```json
{
  "success": true,
  "data": [
    {
      "id": "CODE_COMPONENTS",
      "name": "Code & Components",
      "description": "Reusable code modules, libraries, frameworks",
      "assetCount": 12
    },
    {
      "id": "SERVICES_APIS",
      "name": "Services & APIs",
      "description": "Microservices, REST/GraphQL APIs",
      "assetCount": 8
    },
    {
      "id": "AI_ML_SERVICES",
      "name": "AI/ML Services",
      "description": "Machine learning models, LLM services",
      "assetCount": 3
    }
  ]
}
```

**Response (With Stats)**

```json
{
  "success": true,
  "data": [
    {
      "id": "CODE_COMPONENTS",
      "name": "Code & Components",
      "assetCount": 12,
      "stats": {
        "published": 10,
        "draft": 2,
        "deprecated": 0,
        "archived": 0
      }
    }
  ]
}
```

---

### 2. Get Category Details

**Endpoint**: `GET /api/categories/[category]`

**Valid Categories**

```
CODE_COMPONENTS
SERVICES_APIS
AI_ML_SERVICES
AUTOMATION_WORKFLOWS
DATA_ANALYTICS
ARCHITECTURE_GOVERNANCE
KNOWLEDGE_PRACTICES
```

**Response**

```json
{
  "success": true,
  "data": {
    "id": "CODE_COMPONENTS",
    "name": "Code & Components",
    "description": "Reusable code modules...",
    "assetCount": 12,
    "assets": [
      {
        "id": "asset1",
        "name": "Python Script",
        "assetType": "Scripts",
        "status": "PUBLISHED"
      }
    ]
  }
}
```

---

## Search API

### Search Assets and Tags

**Endpoint**: `GET /api/search`

**Query Parameters**

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `q` | string | Yes | - | Search query |
| `limit` | number | No | 20 | Results limit (max: 100) |
| `suggestions` | boolean | No | false | Return suggestions |

**Examples**

```bash
# Search
curl "https://your-domain.vercel.app/api/search?q=python"

# Get suggestions
curl "https://your-domain.vercel.app/api/search?q=py&suggestions=true"
```

**Response (Results)**

```json
{
  "success": true,
  "data": [
    {
      "id": "clx1234567890",
      "name": "Python Data Processing Script",
      "description": "A script for processing data",
      "category": "CODE_COMPONENTS",
      "type": "asset",
      "relevance": 100
    },
    {
      "id": "tag1",
      "name": "python",
      "description": "Python programming language",
      "category": "language",
      "type": "tag",
      "relevance": 80
    }
  ],
  "query": "python",
  "count": 2
}
```

**Response (Suggestions)**

```json
{
  "success": true,
  "data": [
    "Python Data Processing Script",
    "Python Web Framework",
    "python"
  ],
  "query": "py",
  "count": 3
}
```

---

## Health Check API

### Health Status

**Endpoint**: `GET /api/health`

**Response (Healthy)**

```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2024-11-05T10:30:00Z",
  "uptime": 3600.5
}
```

**Response (Unhealthy)**

```json
{
  "status": "unhealthy",
  "database": "disconnected",
  "error": "Connection timeout",
  "timestamp": "2024-11-05T10:30:00Z"
}
```

---

## Data Validation

### Field Validation Rules

| Field | Type | Length | Rules |
|---|---|---|---|
| `name` | string | 3-255 | Required, at least 3 characters |
| `description` | string | 10-5000 | Required, at least 10 characters |
| `category` | enum | - | Required, must be valid category |
| `assetType` | string | 1-100 | Required |
| `status` | enum | - | Required (DRAFT, PUBLISHED, DEPRECATED, ARCHIVED) |
| `version` | string | 1-50 | Required, semantic versioning |
| `owner` | email | - | Required, valid email format |
| `contentPath` | string | 1-500 | Required, must start with "assets/" |
| `contentHash` | string | 64 | Required, valid SHA256 hash |
| `sourceSystem` | string | 1-100 | Required |
| `sourceLink` | string | - | Required, valid URL |

### Validation Error Example

```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "name": "Name must be at least 3 characters long",
    "category": "Category must be one of: CODE_COMPONENTS, SERVICES_APIS, ...",
    "owner": "Invalid email format"
  }
}
```

---

## Error Handling

### HTTP Status Codes

| Status | Error | Description |
|---|---|---|
| 200 | - | Success |
| 400 | Bad Request | Invalid parameters or validation failed |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Database connection failed |

### Common Errors

| Error | Status | Description |
|---|---|---|
| Missing required field | 400 | Required field not provided |
| Search query is required | 400 | Search query parameter missing |
| Asset not found | 404 | Asset ID does not exist |
| Category not found | 404 | Category does not exist |
| Validation failed | 400 | Data validation error |
| Failed to fetch assets | 500 | Server error |

---

## Performance & Optimization

### Caching Strategy

- List queries: 5 minutes
- Search results: 10 minutes
- Single asset: 15 minutes
- Categories: 30 minutes

### Query Optimization

- Use pagination to avoid loading large datasets
- Use filters to reduce result size
- Indexed fields: category, status, owner, updatedAt

---

## Versioning

**Current Version**: v1 (implicit)

Future versions will use URL prefix: `/api/v2/assets`

---

## Support

For API issues or feature requests, please contact the development team.

