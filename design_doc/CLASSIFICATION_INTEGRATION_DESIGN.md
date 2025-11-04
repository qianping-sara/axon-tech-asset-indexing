# 分类体系集成设计 - Task 3 前端实现

## 📋 分类体系概览

基于 `CLASSIFICATION_QUICK_GUIDE.md`，系统包含：

### 6个一级Category

| # | Category | 显示名称 | 描述 | Asset Type数量 |
|---|----------|---------|------|---------------|
| 1 | CODE_COMPONENTS | Code & Components | 可直接集成和使用的代码资产 | 5 |
| 2 | SERVICES_APIS | Services & APIs | 可调用的运行时服务和接口 | 5 |
| 3 | AUTOMATION_WORKFLOWS | Automation & Workflows | 流程自动化和工作流资产 | 4 |
| 4 | DATA_ANALYTICS | Data & Analytics | 数据相关的资产 | 5 |
| 5 | ARCHITECTURE_GOVERNANCE | Architecture & Governance | 指导性和规范性资产 | 8 |
| 6 | KNOWLEDGE_PRACTICES | Knowledge & Practices | 知识和最佳实践资产 | 5 |

**总计**: 32个Asset Type

### Asset Type映射

```typescript
const ASSET_TYPES_BY_CATEGORY = {
  CODE_COMPONENTS: [
    'Scripts',
    'Frontend Components',
    'Backend Libraries',
    'Development Frameworks',
    'Open Source Projects'
  ],
  SERVICES_APIS: [
    'REST APIs',
    'GraphQL APIs',
    'Microservices',
    'Integration Services',
    'AI/ML Services'
  ],
  AUTOMATION_WORKFLOWS: [
    'RPA Bots',
    'No-Code Workflows',
    'Business Processes',
    'Scheduled Jobs'
  ],
  DATA_ANALYTICS: [
    'Data Products',
    'Data Schemas',
    'Datasets',
    'Data Pipelines',
    'Data Dictionaries'
  ],
  ARCHITECTURE_GOVERNANCE: [
    'Reference Architectures',
    'Solution Patterns',
    'Technology Stacks',
    'Standards',
    'Principles',
    'Checklists',
    'Policies',
    'Decision Records'
  ],
  KNOWLEDGE_PRACTICES: [
    'SOPs',
    'Playbooks',
    'Best Practices',
    'Tutorials',
    'Quick Start Guides'
  ]
};
```

## 🎨 UI设计更新

### 1. 首页 - SolutionIntro 组件

**原设计**: 显示简单的分类统计（如截图中的"APIs & Services 40+"）

**新设计**: 显示6个Category卡片，每个卡片包含：
- Category名称（如"Code & Components"）
- 简短描述
- 资产总数
- 主要Asset Type列表（显示3-4个）
- 点击卡片跳转到该Category的搜索结果

**布局**: 2行3列网格

```
┌─────────────────────────────────────────────────────┐
│ Code & Components (40+)                             │
│ Scripts, libraries, frameworks, components...       │
│ • Scripts                                           │
│ • Frontend Components                               │
│ • Backend Libraries                                 │
│ • Development Frameworks                            │
└─────────────────────────────────────────────────────┘
```

### 2. 搜索结果页 - Filters 组件

**原设计**: 单级过滤（Category、Status、Tags）

**新设计**: 两级过滤
- **一级**: Category（6个选项，单选或多选）
- **二级**: Asset Type（根据选中的Category动态显示，单选或多选）
- **其他**: Status、Tags

**交互流程**:
1. 用户选择Category
2. Asset Type列表动态更新
3. 用户选择Asset Type
4. 发送API请求：`GET /api/assets?category=X&assetType=Y&search=keyword`

### 3. 搜索结果卡片 - AssetCard 组件

**原设计**: 显示Category

**新设计**: 显示Category和Asset Type
- Category标签（绿色背景）
- Asset Type标签（浅绿背景）
- 其他信息保持不变

```
┌─────────────────────────────────────────────────────┐
│ REST API Service                                    │
│ [Services & APIs] [REST APIs]                       │
│ A service for managing REST API endpoints...        │
│ REST API | Published | Nov 3, 2025                 │
└─────────────────────────────────────────────────────┘
```

## 🔌 API集成

### 现有API支持情况

✅ **GET /api/categories** - 获取所有Category及统计
```
GET /api/categories?stats=true
响应: [
  {
    name: 'CODE_COMPONENTS',
    description: '...',
    total: 40,
    published: 35,
    draft: 5,
    deprecated: 0,
    archived: 0
  },
  ...
]
```

✅ **GET /api/assets** - 支持按Category过滤
```
GET /api/assets?category=CODE_COMPONENTS&search=keyword
```

✅ **GET /api/assets** - 返回assetType字段
```
响应中包含: assetType: 'Scripts'
```

### 需要的API改进

❓ **Asset Type过滤** - 检查是否支持
```
GET /api/assets?category=CODE_COMPONENTS&assetType=Scripts
```

**建议**: 如果不支持，需要在后端添加assetType过滤支持

## 📦 新增组件

### 1. CategoryCard 组件
**位置**: `src/components/home/CategoryCard.tsx`

```typescript
interface CategoryCardProps {
  category: {
    name: string;
    displayName: string;
    description: string;
    icon: string;
    assetTypes: string[];
    assetCount: number;
  };
  onClick?: () => void;
}
```

### 2. AssetTypeFilter 组件
**位置**: `src/components/search/AssetTypeFilter.tsx`

```typescript
interface AssetTypeFilterProps {
  selectedCategory?: string;
  selectedAssetTypes: string[];
  onChange: (assetTypes: string[]) => void;
}
```

## 📝 常量文件

**位置**: `src/lib/constants/categories.ts`

```typescript
export const CATEGORIES = [
  {
    name: 'CODE_COMPONENTS',
    displayName: 'Code & Components',
    description: 'Scripts, libraries, frameworks, components, and reusable code modules',
    icon: '💻',
    assetTypes: ['Scripts', 'Frontend Components', 'Backend Libraries', 'Development Frameworks', 'Open Source Projects']
  },
  // ... 其他5个Category
];

export const ASSET_TYPES_BY_CATEGORY = {
  CODE_COMPONENTS: ['Scripts', 'Frontend Components', 'Backend Libraries', 'Development Frameworks', 'Open Source Projects'],
  // ... 其他Category
};

export const ASSET_TYPE_DESCRIPTIONS = {
  'Scripts': '可执行脚本',
  'Frontend Components': '前端UI组件',
  // ... 其他Asset Type
};
```

## 🔄 数据流更新

### 首页流程
```
首页加载
  ↓
调用 GET /api/categories?stats=true
  ↓
获取6个Category及其统计信息
  ↓
渲染6个CategoryCard组件
  ↓
用户点击Category卡片
  ↓
导航到 /search?category=CODE_COMPONENTS
```

### 搜索结果页流程
```
搜索结果页加载 (query=keyword, category=CODE_COMPONENTS)
  ↓
调用 GET /api/categories?stats=true
  ↓
获取Category列表和Asset Type映射
  ↓
渲染Filters组件（显示所有Category和对应的Asset Type）
  ↓
用户选择Category和Asset Type
  ↓
调用 GET /api/assets?search=keyword&category=CODE_COMPONENTS&assetType=Scripts
  ↓
显示过滤后的结果
```

## ✅ 验收标准

### 功能验收
- [ ] 首页显示6个Category卡片
- [ ] 每个Category卡片显示正确的信息
- [ ] 点击Category卡片跳转到搜索结果页
- [ ] 搜索结果页显示Category过滤器
- [ ] 选择Category后Asset Type列表动态更新
- [ ] 搜索结果卡片显示Asset Type标签
- [ ] 过滤功能正常工作

### 设计验收
- [ ] Category卡片布局美观
- [ ] Asset Type标签显示清晰
- [ ] 颜色方案一致
- [ ] 响应式设计适配

### 代码质量
- [ ] 常量文件完整
- [ ] 类型定义完整
- [ ] 无硬编码的Category和Asset Type
- [ ] 易于维护和扩展

## 📚 参考文档

- `CLASSIFICATION_QUICK_GUIDE.md` - 分类体系快速指南
- `ASSET_CLASSIFICATION_V2.md` - 完整的分类体系设计
- `TASK_3_DESIGN_SUMMARY.md` - Task 3总体设计方案

