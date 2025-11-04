# Asset Golden Index - API 文档

## 基础信息

- **基础 URL**: `https://your-domain.vercel.app/api`
- **认证**: 暂无（MVP 阶段）
- **响应格式**: JSON

## 资产 API

### 获取资产列表

**请求**
```
GET /api/assets
```

**查询参数**
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| page | number | 1 | 页码 |
| limit | number | 20 | 每页数量（最大 100） |
| category | string | - | 分类过滤（CODE_COMPONENTS, SERVICES_APIS, 等） |
| status | string | - | 状态过滤（DRAFT, PUBLISHED, DEPRECATED, ARCHIVED） |
| tag | string | - | 标签过滤（标签名称） |
| search | string | - | 搜索关键词（搜索名称和描述） |
| owner | string | - | 所有者过滤（邮箱） |
| sortBy | string | updatedAt | 排序字段（createdAt, updatedAt, name） |
| sortOrder | string | desc | 排序顺序（asc, desc） |

**示例**
```bash
# 获取第一页资产
curl "https://your-domain.vercel.app/api/assets"

# 获取 CODE_COMPONENTS 分类的资产
curl "https://your-domain.vercel.app/api/assets?category=CODE_COMPONENTS"

# 搜索包含 "python" 的资产
curl "https://your-domain.vercel.app/api/assets?search=python"

# 获取带有 "python" 标签的已发布资产
curl "https://your-domain.vercel.app/api/assets?tag=python&status=PUBLISHED"

# 分页查询
curl "https://your-domain.vercel.app/api/assets?page=2&limit=10"
```

**响应**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx1234567890",
      "name": "Python Data Processing Script",
      "description": "A script for processing data with Python",
      "category": "CODE_COMPONENTS",
      "assetType": "Script",
      "version": "1.0.0",
      "status": "PUBLISHED",
      "owner": "team@company.com",
      "updatedAt": "2024-11-04T12:00:00Z",
      "tags": [
        {
          "id": "tag1",
          "name": "python",
          "category": "language"
        }
      ]
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

### 创建资产

**请求**
```
POST /api/assets
```

**请求体**
```json
{
  "name": "New Asset",
  "description": "Asset description",
  "category": "CODE_COMPONENTS",
  "assetType": "Script",
  "version": "1.0.0",
  "status": "PUBLISHED",
  "owner": "team@company.com",
  "contentPath": "assets/code/scripts/new-asset.md",
  "contentHash": "abc123def456",
  "sourceSystem": "GitHub",
  "sourceLink": "https://github.com/example/repo",
  "tags": ["tag-id-1", "tag-id-2"]
}
```

**响应**
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

## 搜索 API

### 搜索资产和标签

**请求**
```
GET /api/search
```

**查询参数**
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| q | string | - | 搜索关键词（必需） |
| limit | number | 20 | 返回结果数量（最大 100） |
| suggestions | boolean | false | 返回建议而不是完整结果 |

**示例**
```bash
# 搜索资产和标签
curl "https://your-domain.vercel.app/api/search?q=python"

# 获取搜索建议
curl "https://your-domain.vercel.app/api/search?q=py&suggestions=true"

# 限制结果数量
curl "https://your-domain.vercel.app/api/search?q=python&limit=10"
```

**响应（搜索结果）**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx1234567890",
      "name": "Python Data Processing Script",
      "description": "A script for processing data with Python",
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

**响应（搜索建议）**
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

## 错误处理

所有错误响应都遵循以下格式：

```json
{
  "success": false,
  "error": "Error message"
}
```

**常见错误**

| 状态码 | 错误 | 说明 |
|--------|------|------|
| 400 | Missing required field | 缺少必需字段 |
| 400 | Search query is required | 搜索查询为空 |
| 404 | Not found | 资源不存在 |
| 500 | Failed to fetch assets | 服务器错误 |

## 分类列表

```
CODE_COMPONENTS         # 代码和组件
SERVICES_APIS          # 服务和 API
AUTOMATION_WORKFLOWS   # 自动化和工作流
DATA_ANALYTICS         # 数据和分析
ARCHITECTURE_GOVERNANCE # 架构和治理
KNOWLEDGE_PRACTICES    # 知识和实践
```

## 状态列表

```
DRAFT      # 草稿
PUBLISHED  # 已发布
DEPRECATED # 已弃用
ARCHIVED   # 已归档
```

## 性能优化

### 缓存策略

- 列表查询结果缓存 5 分钟
- 搜索结果缓存 10 分钟
- 单个资产缓存 15 分钟

### 查询优化

- 使用分页避免一次加载过多数据
- 使用过滤器减少返回的数据量
- 索引优化：category, status, owner, updatedAt

## 速率限制

暂无速率限制（MVP 阶段）

## 版本控制

当前版本：v1（隐含）

未来版本将通过 URL 前缀标识：`/api/v2/assets`

