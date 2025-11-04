# 前端实现指南 - Task 3

## 🚀 快速开始

### 开发环境
```bash
cd /Users/qianping/Documents/Source/axon/app
npm run dev
# 访问 http://localhost:3000
```

### 项目结构
```
src/
├── app/
│   ├── page.tsx                 # 首页
│   ├── search/
│   │   └── page.tsx             # 搜索结果页
│   └── layout.tsx               # 根布局
├── components/
│   ├── layout/
│   │   └── Header.tsx           # 导航头
│   ├── home/
│   │   ├── SearchBlock.tsx      # 搜索框
│   │   ├── SolutionIntro.tsx    # 解决方案介绍
│   │   └── FourPillars.tsx      # 四个支柱
│   ├── search/
│   │   ├── SearchResults.tsx    # 搜索结果容器
│   │   ├── Filters.tsx          # 过滤器
│   │   └── ResultsList.tsx      # 结果列表
│   └── assets/
│       └── AssetCard.tsx        # 资产卡片
├── hooks/
│   ├── useSearch.ts            # 搜索Hook
│   └── useFilters.ts           # 过滤Hook
└── lib/
    └── types/
        └── asset.ts            # 类型定义
```

## 📝 组件实现清单

### 3.1 Header 组件
**文件**: `src/components/layout/Header.tsx`

```typescript
// 功能
- Logo + "Axon" 文字
- 导航菜单（Discover、Docs）
- 右侧Docs链接
- 绿色主题

// Props
interface HeaderProps {
  currentPage?: 'home' | 'discover' | 'docs';
}

// 样式
- 背景: 白色
- 边框: 下边框灰色
- 高度: 64px
- 内边距: 16px 24px
```

### 3.2 SearchBlock 组件
**文件**: `src/components/home/SearchBlock.tsx`

```typescript
// 功能
- 大标题和副标题
- 搜索输入框
- 搜索按钮
- 热门标签展示

// Props
interface SearchBlockProps {
  onSearch: (query: string) => void;
}

// 状态
- query: string (搜索关键词)

// 事件
- 输入框变化: 更新query
- 点击搜索: 调用onSearch(query)
- 点击热门标签: 搜索该标签
```

### 3.3 SolutionIntro 组件
**文件**: `src/components/home/SolutionIntro.tsx`

```typescript
// 功能
- 左侧: 标题、描述、按钮
- 右侧: 分类统计

// 分类数据
const categories = [
  { name: 'APIs & Services', count: 40 },
  { name: 'Business Processes', count: 15 },
  { name: 'RPA Bots', count: 25 },
  { name: 'AI Models', count: 10 },
  { name: 'Knowledge Base', count: 50 },
  { name: 'Governance Docs', count: 20 },
];

// 样式
- 两列布局
- 左列宽度: 50%
- 右列宽度: 50%
```

### 3.4 FourPillars 组件
**文件**: `src/components/home/FourPillars.tsx`

```typescript
// 功能
- 4个卡片展示
- 每个卡片: 图标 + 标题 + 描述

// 数据
const pillars = [
  {
    title: 'Reliable',
    description: 'Validated and trustworthy assets from source systems',
    icon: 'shield'
  },
  {
    title: 'Re-usable',
    description: 'Build once, use multiple times across scenarios',
    icon: 'repeat'
  },
  {
    title: 'Scalable',
    description: 'Support future automation with sustainable architecture',
    icon: 'trending-up'
  },
  {
    title: 'Trackable',
    description: 'Know which assets are used by whom and where',
    icon: 'search'
  }
];

// 样式
- 4列网格
- 卡片宽度: 25%
- 卡片间距: 16px
```

### 3.5 AssetCard 组件
**文件**: `src/components/assets/AssetCard.tsx`

```typescript
// Props
interface AssetCardProps {
  asset: AssetListItem;
}

// 显示内容
- 资产名称
- 标签（彩色标签）
- 描述（截断到2行）
- 元数据: 类型、状态、更新时间
- 操作: 查看、分享

// 样式
- 卡片: 白色背景、灰色边框、圆角
- 标签: 绿色背景、白色文字
- 悬停: 阴影增加、边框变绿
```

### 3.6 SearchResults 组件
**文件**: `src/components/search/SearchResults.tsx`

```typescript
// Props
interface SearchResultsProps {
  query: string;
}

// 功能
- 搜索框（固定顶部）
- 左侧过滤器
- 右侧结果列表
- 分页

// 子组件
- Filters: 过滤器面板
- ResultsList: 结果列表
- Pagination: 分页控件

// 状态
- results: AssetListItem[]
- filters: FilterState
- page: number
- loading: boolean
```

## 🪝 Hooks实现

### 3.7 useSearch Hook
**文件**: `src/hooks/useSearch.ts`

```typescript
interface UseSearchReturn {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
}

// 功能
- 调用 GET /api/search?q=query
- 管理加载状态
- 处理错误
- 缓存结果（可选）
```

### 3.8 useFilters Hook
**文件**: `src/hooks/useFilters.ts`

```typescript
interface FilterState {
  category?: string;
  status?: string;
  tag?: string;
  search?: string;
}

interface UseFiltersReturn {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  clearFilters: () => void;
  applyFilters: () => Promise<void>;
}

// 功能
- 管理过滤器状态
- 应用过滤器到API
- 清除过滤器
```

## 📄 页面实现

### 3.9 首页
**文件**: `src/app/page.tsx`

```typescript
// 结构
export default function Home() {
  const router = useRouter();
  
  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <Header />
      <SearchBlock onSearch={handleSearch} />
      <SolutionIntro />
      <FourPillars />
    </div>
  );
}
```

### 3.10 搜索结果页
**文件**: `src/app/search/page.tsx`

```typescript
// 结构
export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';

  return (
    <div>
      <Header />
      <SearchResults query={query} />
    </div>
  );
}
```

## 🧪 测试策略

### 3.11 组件测试
- Header: 导航链接、Logo
- SearchBlock: 输入、搜索按钮、热门标签
- SolutionIntro: 内容显示、分类数据
- FourPillars: 4个卡片显示
- AssetCard: 资产信息显示
- SearchResults: 结果列表、过滤器、分页

### 3.12 Hook测试
- useSearch: API调用、加载状态、错误处理
- useFilters: 过滤器状态、应用过滤器

## 🎨 Tailwind CSS 类名参考

```typescript
// 容器
'container mx-auto px-4'

// 网格
'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'

// 卡片
'bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg'

// 按钮
'bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700'

// 标签
'inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-sm'

// 文本
'text-2xl font-bold' // 标题
'text-gray-600' // 副文本
```

## 🔗 API调用示例

```typescript
// 搜索
const response = await fetch(`/api/search?q=${query}`);
const data = await response.json();

// 获取资产列表
const response = await fetch(
  `/api/assets?search=${query}&category=${category}&page=${page}`
);
const data = await response.json();

// 获取分类
const response = await fetch('/api/categories');
const data = await response.json();
```

## ✅ 完成检查清单

- [ ] 所有组件创建完成
- [ ] 所有Hooks创建完成
- [ ] 首页集成完成
- [ ] 搜索结果页集成完成
- [ ] TypeScript类型检查通过
- [ ] ESLint验证通过
- [ ] 单元测试通过
- [ ] 功能测试通过
- [ ] 响应式设计验证
- [ ] 浏览器兼容性验证

