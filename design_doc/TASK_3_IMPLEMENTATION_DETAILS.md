# Task 3 实现细节指南

## 🎨 设计规范

### 颜色方案
```typescript
const colors = {
  primary: '#16a34a',      // 绿色 - 主色
  primaryLight: '#dcfce7', // 浅绿 - 标签背景
  background: '#ffffff',   // 白色 - 背景
  text: '#000000',         // 黑色 - 文本
  textSecondary: '#666666',// 灰色 - 副文本
  border: '#e5e7eb',       // 灰色 - 边框
  hover: '#15803d',        // 深绿 - 悬停
};
```

### 字体规范
```typescript
const typography = {
  h1: { size: '32px', weight: 700 },  // 页面标题
  h2: { size: '24px', weight: 700 },  // 组件标题
  h3: { size: '18px', weight: 600 },  // 副标题
  body: { size: '14px', weight: 400 }, // 正文
  small: { size: '12px', weight: 400 }, // 小文本
};
```

### 间距规范
```typescript
const spacing = {
  container: '24px',  // 容器内边距
  component: '16px',  // 组件间距
  element: '8px',     // 元素间距
};
```

---

## 📦 组件实现细节

### 3.1 Header 组件

**结构**:
```
Header
├── Logo + App Name
├── Navigation Menu
│   ├── Discover (disabled for now)
│   └── Docs (disabled for now)
└── Search Link
```

**关键点**:
- 使用 Next.js Link 组件进行导航
- 响应式设计：桌面版显示完整菜单，移动版显示汉堡菜单
- 固定在顶部或粘性定位

**样式**:
- 背景色：白色
- 边框：底部 1px 灰色边框
- 高度：60px
- 内边距：0 24px

---

### 3.2 SearchBlock 组件

**结构**:
```
SearchBlock
├── 标题 "One Search, All Assets"
├── 搜索框
│   ├── 输入框
│   └── 搜索按钮
└── 热门标签
    └── Tag (x N)
```

**关键点**:
- 搜索框宽度：100%（最大 600px）
- 热门标签从 API 获取（GET /api/tags?limit=10）
- 点击标签自动搜索
- 搜索按钮点击导航到 `/search?q=keyword`

**样式**:
- 背景：浅绿色（#f0fdf4）
- 内边距：48px 24px
- 搜索框高度：44px
- 标签：浅绿背景，绿色文本

---

### 3.3 CategoryCard 组件

**结构**:
```
CategoryCard
├── 图标
├── Category 名称
├── 描述
├── 资产数量
└── Asset Type 列表
```

**关键点**:
- 卡片宽度：100%（在网格中）
- 最小高度：280px
- 悬停效果：阴影增加，背景色变化
- 点击导航到 `/search?category=CODE_COMPONENTS`

**样式**:
- 背景：白色
- 边框：1px 灰色
- 圆角：8px
- 内边距：24px
- 阴影：0 1px 3px rgba(0,0,0,0.1)

---

### 3.4 SolutionIntro 组件

**结构**:
```
SolutionIntro
├── 标题 "Asset Categories"
├── 描述
└── Category Grid (2行3列)
    └── CategoryCard (x 6)
```

**关键点**:
- 网格布局：2行3列
- 响应式：移动端 1列，平板 2列，桌面 3列
- 从 API 获取数据：GET /api/categories?stats=true
- 加载状态显示

**样式**:
- 背景：白色
- 内边距：48px 24px
- 网格间距：24px
- 最大宽度：1200px

---

### 3.5 FourPillars 组件

**结构**:
```
FourPillars
├── 标题 "Four Pillars"
├── 描述
└── Pillar Grid (1行4列)
    └── Pillar Card (x 4)
```

**关键点**:
- 网格布局：1行4列
- 响应式：移动端 1列，平板 2列，桌面 4列
- 静态内容（无API调用）
- 每个卡片包含图标、标题、描述

**样式**:
- 背景：浅灰色（#f9fafb）
- 内边距：48px 24px
- 网格间距：24px
- 卡片高度：200px

---

### 3.6 AssetCard 组件

**结构**:
```
AssetCard
├── 标题
├── 描述
├── 标签行
│   ├── Category 标签
│   └── Asset Type 标签
├── 元数据行
│   ├── 版本
│   ├── 状态
│   └── 更新时间
└── 点击区域
```

**关键点**:
- 卡片宽度：100%（在列表中）
- 最小高度：160px
- 悬停效果：背景色变化，阴影增加
- 点击导航到资产详情页

**样式**:
- 背景：白色
- 边框：1px 灰色
- 圆角：8px
- 内边距：16px
- 阴影：0 1px 3px rgba(0,0,0,0.1)

---

### 3.7 AssetTypeFilter 组件

**结构**:
```
AssetTypeFilter
├── 标题 "Asset Type"
├── 清除按钮
└── Checkbox 列表
    └── Checkbox (x N)
```

**关键点**:
- 根据 selectedCategory 动态显示 Asset Types
- 使用 categories.ts 中的 ASSET_TYPES_BY_CATEGORY
- 支持多选
- 清除按钮清空所有选择

**样式**:
- 背景：白色
- 边框：1px 灰色
- 圆角：8px
- 内边距：16px
- 最大高度：400px（超出滚动）

---

### 3.8 SearchResults 组件

**结构**:
```
SearchResults
├── 搜索框（可选）
├── 结果容器
│   ├── 左侧过滤器
│   │   ├── Category Filter
│   │   ├── Asset Type Filter
│   │   ├── Status Filter
│   │   └── Tag Filter
│   └── 右侧结果列表
│       ├── 结果数量
│       ├── AssetCard (x N)
│       └── 分页
```

**关键点**:
- 左侧过滤器宽度：280px（桌面）
- 右侧结果列表：flex-grow
- 响应式：移动端过滤器在顶部
- 分页：每页 20 条

**样式**:
- 背景：白色
- 内边距：24px
- 网格间距：24px
- 最大宽度：1400px

---

## 🎣 Hook 实现细节

### 3.9 useSearch Hook

**状态管理**:
```typescript
const [query, setQuery] = useState('');
const [results, setResults] = useState<SearchResult[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

**API 调用**:
```typescript
const search = async (q: string) => {
  setLoading(true);
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data = await response.json();
    setResults(data.data || []);
  } catch (err) {
    setError('Search failed');
  } finally {
    setLoading(false);
  }
};
```

**防抖处理**:
- 使用 useCallback 和 useEffect 实现防抖
- 延迟 300ms 后发送请求

---

### 3.10 useFilters Hook

**状态管理**:
```typescript
const [filters, setFilters] = useState({
  category: undefined,
  assetType: undefined,
  status: undefined,
  tags: [],
});
const [page, setPage] = useState(1);
const [results, setResults] = useState<AssetListItem[]>([]);
const [pagination, setPagination] = useState({...});
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

**API 调用**:
```typescript
const fetchResults = async () => {
  setLoading(true);
  try {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.assetType) params.append('assetType', filters.assetType);
    if (filters.status) params.append('status', filters.status);
    filters.tags.forEach(tag => params.append('tag', tag));
    params.append('page', page.toString());
    params.append('limit', '20');
    
    const response = await fetch(`/api/assets?${params}`);
    const data = await response.json();
    setResults(data.data || []);
    setPagination(data.pagination);
  } catch (err) {
    setError('Failed to fetch results');
  } finally {
    setLoading(false);
  }
};
```

---

## 📄 页面实现细节

### 3.11 首页 (page.tsx)

**布局**:
```
Header
SearchBlock
SolutionIntro
FourPillars
Footer (可选)
```

**关键点**:
- 使用 Suspense 处理异步组件
- 错误边界处理
- SEO 优化（meta 标签）

---

### 3.12 搜索结果页 (search/page.tsx)

**URL 参数解析**:
```typescript
const searchParams = useSearchParams();
const query = searchParams.get('q') || '';
const category = searchParams.get('category');
const assetType = searchParams.get('assetType');
const status = searchParams.get('status');
const page = searchParams.get('page') || '1';
```

**初始化过滤器**:
```typescript
useEffect(() => {
  setFilters({
    category,
    assetType,
    status,
    tags: [],
  });
}, [searchParams]);
```

---

## 🧪 测试策略

### 组件测试
- 使用 Jest + React Testing Library
- 测试 props 传递
- 测试用户交互
- 测试 API 调用（mock）
- 测试加载和错误状态

### Hook 测试
- 使用 @testing-library/react-hooks
- 测试状态更新
- 测试 API 调用（mock）
- 测试错误处理

---

## 📚 相关文件

- `src/lib/constants/categories.ts` - Category 和 Asset Type 常量
- `src/lib/types/asset.ts` - 类型定义
- `src/lib/api/assets.ts` - Asset API 业务逻辑
- `src/lib/api/categories.ts` - Category API 业务逻辑
- `src/lib/api/search.ts` - Search API 业务逻辑

