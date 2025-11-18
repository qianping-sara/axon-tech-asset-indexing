# 如何添加技术资产 - 快速参考

## 📋 三层架构

| 层级 | 位置 | 说明 |
|------|------|------|
| **文件层** | `public/assets/{category}/{type}/{name}.md` | Markdown + YAML Frontmatter |
| **数据库层** | PostgreSQL `axon_asset` 表 | 自动同步 |
| **API层** | `GET/POST /api/assets` | 前端查询 |

## 🚀 快速流程（推荐）

### 方式一：通过 Markdown 文件 + Webhook（自动同步）

```bash
# 1. 创建文件
mkdir -p public/assets/services/rest-apis
cat > public/assets/services/rest-apis/my-api.md << 'EOF'
---
name: My API
description: Brief description
category: SERVICES_APIS
assetType: REST APIs
version: 1.0.0
status: PUBLISHED
owner: Team Name
sourceSystem: GitHub
sourceLink: https://axon-tech-asset-indexing.vercel.app/assets/{asset-id}
---
# Content here
EOF

# 2. 提交到 GitHub
git add public/assets/services/rest-apis/my-api.md
git commit -m "Add My API asset"
git push origin main

# ✅ 完成！Webhook 自动同步到数据库
```

### 方式二：通过 Migration（推荐用于生产环境）

当需要确保数据库记录与 Markdown 文件同步时，使用 Migration：

```bash
# 1. 创建 Markdown 文件（同上）

# 2. 创建 Migration 文件
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
  NULL,
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;
EOF

# 3. 运行 Migration
npx prisma migrate deploy

# 4. 提交到 GitHub
git add public/assets/services/rest-apis/my-api.md prisma/migrations/add_my_asset/
git commit -m "Add My API asset via migration"
git push origin main
```

## 📂 文件位置规范

```
public/assets/
├── code/                    # CODE_COMPONENTS
├── services/                # SERVICES_APIS (rest-apis, graphql-apis, ai-ml-services 等)
├── automation/              # AUTOMATION_WORKFLOWS
├── data/                    # DATA_ANALYTICS
├── architecture/            # ARCHITECTURE_GOVERNANCE
└── knowledge/               # KNOWLEDGE_PRACTICES
```

## 🏷️ Frontmatter 必需字段

| 字段 | 类型 | 示例 | 说明 |
|------|------|------|------|
| `name` | string | "Customer Info API" | 资产名称 |
| `description` | string | "Retrieves customer info" | 简短描述 |
| `category` | enum | SERVICES_APIS, CODE_COMPONENTS 等 | 资产分类 |
| `assetType` | string | "REST APIs", "Scripts" 等 | 资产类型 |
| `version` | string | "1.0.0" | 版本号 (x.y.z 格式) |
| `status` | enum | DRAFT, PUBLISHED, DEPRECATED, ARCHIVED | 发布状态 |
| `owner` | string | "Team Name" | 所有者/团队 |
| `sourceSystem` | string | "Internal" 或 "GitHub" | 来源系统 |
| `sourceLink` | string | "https://axon-tech-asset-indexing.vercel.app/assets/{id}" | **指向详情页面 URL，不是 GitHub 链接** |
| `bizDomain` | enum | 可选，CLAIM, FINANCIAL_CHANGE 等 | 业务域（可选） |

## 🔄 同步流程

### 方式一：Webhook 自动同步（开发环境）

```
Markdown 文件 → GitHub Push → Webhook → 验证签名 → 解析 Markdown
→ 验证元数据 → 计算 Hash → 检查现有记录 → CREATE/UPDATE → 完成
```

**关键代码**:
- 解析: `app/src/lib/markdown/parser.ts` → `parseAssetMarkdown()`
- Webhook: `app/src/app/api/sync/route.ts` → `POST /api/sync`
- 同步: `app/src/lib/api/sync.ts` → `syncAssetsFromWebhook()`
- 数据库: `app/prisma/schema.prisma` → `axon_asset` model

### 方式二：Migration 同步（生产环境）

```
创建 Migration SQL → 定义 INSERT/UPDATE 语句 → 创建 Tags（如需要）
→ 链接 Asset-Tag 关系 → npx prisma migrate deploy → 完成
```

**优势**:
- ✅ 确保数据库记录与 Markdown 文件同步
- ✅ 支持版本控制和回滚
- ✅ 适合生产环境部署
- ✅ 可以同时创建 Tags 和 Asset-Tag 关系

## 📊 有效枚举值

**Category** (7个): CODE_COMPONENTS, SERVICES_APIS, AI_ML_SERVICES, AUTOMATION_WORKFLOWS, DATA_ANALYTICS, ARCHITECTURE_GOVERNANCE, KNOWLEDGE_PRACTICES

**Status** (4个): DRAFT, PUBLISHED, DEPRECATED, ARCHIVED

**BizDomain** (11个): CLAIM, FINANCIAL_CHANGE, INQUIRY_GENERAL_CHANGES, MONEY_OUT, WEALTH, CUSTOMER_ENGAGEMENT, CUSTOMER_RELATIONSHIP_MANAGEMENT, PAYMENT_SETTLEMENT, FINANCE_ACCOUNTING, RISK_COMPLIANCE, COMMON_CAPABILITIES

## ✅ 验证清单

### Markdown 文件检查
- [ ] 文件路径: `public/assets/{category}/{type}/{name}.md`
- [ ] Frontmatter 完整: 10 个必需字段
- [ ] Category 有效: 7 个分类之一
- [ ] Status 有效: 4 个状态之一
- [ ] Version 格式: x.y.z
- [ ] **sourceLink 指向详情页面**: `https://axon-tech-asset-indexing.vercel.app/assets/{asset-id}`
- [ ] **sourceSystem 为 "Internal"**（不是 GitHub）

### 数据库同步检查
- [ ] 已提交到 main 分支
- [ ] **使用 Migration 方式**（推荐）或等待 Webhook 同步（5-10 秒）
- [ ] 通过 API 验证: `GET /api/assets?search=...`
- [ ] 网页详情页面可正常访问: `/assets/{asset-id}`
- [ ] Markdown 内容在详情页面正确显示

## 🔧 直接 API 创建（不推荐）

⚠️ **仅在开发环境使用，需要本地服务器运行**

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
    "sourceLink": "https://axon-tech-asset-indexing.vercel.app/assets/asset_my_api"
  }'
```

**注意**:
- 生产环境应使用 Migration 方式
- contentHash 可通过 `sha256sum` 计算
- sourceLink 必须指向详情页面 URL

## 📚 相关文档

- `ASSET_CLASSIFICATION_SYSTEM.md` - 资产分类体系
- `DATABASE_INIT.md` - 数据库初始化
- `API_DOCUMENTATION.md` - API 文档

