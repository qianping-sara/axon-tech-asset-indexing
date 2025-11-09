# CoE Utilities 实现总结

**最后更新**: 2025-11-09  
**状态**: 已实现并运行中

---

## 📋 目录

1. [表设计](#表设计)
2. [页面布局](#页面布局)
3. [后台实现](#后台实现)
4. [数据流](#数据流)

---

## 表设计

### axon_utility 表

**位置**: `prisma/schema.prisma` (第96-115行)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| `id` | TEXT | PRIMARY KEY | 工具唯一标识 |
| `name` | VARCHAR(255) | NOT NULL | 工具名称 |
| `description` | TEXT | NOT NULL | 工具描述 |
| `category` | VARCHAR(100) | NOT NULL | 工具分类 (如: decision-support) |
| `icon` | VARCHAR(100) | NOT NULL | lucide-react 图标名称 |
| `url` | VARCHAR(500) | NOT NULL | 工具访问路径 |
| `version` | VARCHAR(50) | NOT NULL | 版本号 (语义化版本) |
| `status` | Status ENUM | DEFAULT: PUBLISHED | 状态 (DRAFT/PUBLISHED/DEPRECATED/ARCHIVED) |
| `owner` | VARCHAR(255) | NULLABLE | 所有者/团队 |
| `tags` | TEXT[] | DEFAULT: [] | 标签数组 |
| `createdAt` | TIMESTAMP | DEFAULT: NOW() | 创建时间 |
| `updatedAt` | TIMESTAMP | NOT NULL | 更新时间 |
| `publishedAt` | TIMESTAMP | NULLABLE | 发布时间 |

**索引**:
- `category` - 按分类过滤
- `status` - 按状态过滤
- `owner` - 按所有者过滤

### 初始化数据

4个决策支持工具已通过迁移脚本初始化:

1. **Business Case and Strategic Alignment** (tool-business-case-001)
   - 图标: briefcase
   - 路径: /utilities/business-case

2. **Sourcing Model Analysis** (tool-sourcing-model-001)
   - 图标: bar-chart-3
   - 路径: /utilities/sourcing-model

3. **Preliminary Evaluation and Shortlisting** (tool-preliminary-evaluation-001)
   - 图标: zap
   - 路径: /utilities/preliminary-evaluation

4. **TCO Calculation** (tool-tco-calculation-001)
   - 图标: calculator
   - 路径: /utilities/tco-calculation

---

## 页面布局

### 主页面: `/utilities`

**文件**: `app/src/app/utilities/page.tsx`

#### 布局结构

```
┌─────────────────────────────────────────┐
│         Header (导航栏)                  │
├─────────────────────────────────────────┤
│  白色背景区域                            │
│  ├─ 页面标题: "CoE Utilities"           │
│  ├─ 描述文本                            │
│  ├─ 搜索框 (UtilitySearch)              │
│  └─ 分类过滤按钮 (UtilityCategoryFilter) │
├─────────────────────────────────────────┤
│  灰色背景区域                            │
│  └─ 工具网格 (UtilityGrid)              │
│     ├─ 按分类分组                       │
│     └─ 每个分类下显示工具卡片            │
└─────────────────────────────────────────┘
```

#### 核心功能

- **搜索**: 实时搜索工具名称和描述 (500ms 防抖)
- **分类过滤**: 按 category 过滤工具
- **URL 参数**: 搜索和分类状态保存在 URL 中
- **响应式网格**: 1列(移动) → 2列(平板) → 3列(桌面)

### 工具卡片: UtilityCard

**文件**: `app/src/components/utilities/UtilityCard.tsx`

显示内容:
- 工具图标 (lucide-react)
- 工具名称
- 分类徽章
- 工具描述 (最多3行)
- "Open" 按钮

### 组件树

```
UtilitiesPage
├─ Header
├─ UtilitySearch (搜索框)
├─ UtilityCategoryFilter (分类按钮)
└─ UtilityGrid (工具网格)
   └─ UtilityCard[] (工具卡片)
```

---

## Utility 工具页面的共性布局

### 页面结构 (所有工具页面通用)

**文件位置**:
- Business Case: `app/src/app/utilities/business-case/page.tsx`
- Sourcing Model: `app/src/app/utilities/sourcing-model/page.tsx`
- Preliminary Evaluation: `app/src/app/utilities/preliminary-evaluation/page.tsx`
- TCO Calculation: `app/src/app/utilities/tco-calculation/page.tsx`

#### 统一的页面布局

```
┌─────────────────────────────────────────┐
│         Header (导航栏)                  │
├─────────────────────────────────────────┤
│  max-w-7xl mx-auto px-6 py-12           │
│                                         │
│  ← Back to CoE Utilities (绿色链接)     │
│                                         │
│  页面标题 (text-3xl font-bold)          │
│                                         │
│  Objective 组件 (灰色文本段落)          │
│  ├─ 工具目标说明                       │
│  └─ mb-8 间距                          │
│                                         │
│  [工具特定内容]                         │
│  ├─ 评估标准/表格/图表等               │
│  └─ 根据工具类型不同                   │
│                                         │
│  总结/导出组件                          │
│  ├─ 结果展示                           │
│  └─ 导出按钮                           │
└─────────────────────────────────────────┘
```

### 共性 UI 元素

#### 1. 返回按钮 (Back Button)
```
- 样式: inline-flex items-center gap-2
- 颜色: text-green-700 hover:text-green-800
- 图标: ArrowLeft (lucide-react)
- 文本: "Back to CoE Utilities"
- 间距: mb-8
```

#### 2. 页面标题 (Page Title)
```
- 样式: text-3xl font-bold text-gray-900
- 间距: mb-6
```

#### 3. Objective 组件 (所有工具都有)
```
- 样式: mb-8
- 内容: 灰色文本段落 (text-gray-700 leading-relaxed)
- 作用: 说明工具的目标和用途
- 文件: [ToolName]Objective.tsx
```

#### 4. 评估标准行 (CriteriaRow)
```
- 样式: bg-white border border-gray-200 rounded-lg p-5 mb-4
- 包含:
  ├─ 标题 + 权重徽章 (text-base font-semibold)
  ├─ 描述 (text-sm text-gray-600)
  ├─ 评分按钮 (1-5 分数选择)
  └─ 备注文本框 (textarea)
```

#### 5. 评估标准容器 (KeyEvaluationCriteria)
```
- 样式: bg-gray-50 rounded-lg p-6
- 包含:
  ├─ 标题 + Clear 按钮
  └─ CriteriaRow[] 列表
```

#### 6. 总结/结果组件 (EvaluationSummary)
```
- 样式: bg-white rounded-lg border border-gray-200 p-6 mb-8
- 包含:
  ├─ 3列网格 (grid-cols-1 md:grid-cols-3)
  │  ├─ 总分
  │  ├─ 百分比
  │  └─ 建议
  └─ 导出按钮 (Download CSV)
```

### 工具特定的布局变化

#### Business Case & Sourcing Model
```
页面结构:
1. 返回按钮
2. 页面标题
3. Objective
4. KeyEvaluationCriteria (评估标准)
5. EvaluationSummary (结果总结)
```

#### Preliminary Evaluation (多步骤)
```
页面结构:
1. 返回按钮
2. 页面标题
3. Objective
4. 步骤导航 (Tab 切换)
   ├─ Step 1 - Initial Assessment
   └─ Step 2 - Sourcing Model Specific Assessment
5. 条件渲染的内容
6. PreliminaryEvaluationSummary
```

#### TCO Calculation (数据驱动)
```
页面结构:
1. 返回按钮
2. 页面标题
3. Objective
4. Download CSV 按钮
5. 2列网格布局
   ├─ 左列 (2/3): TCOSolutionManager
   └─ 右列 (1/3): TCOChart
```

### 颜色和样式规范

| 元素 | 颜色 | 说明 |
|------|------|------|
| 返回链接 | green-700 | 主品牌色 |
| 页面标题 | gray-900 | 深灰色 |
| 描述文本 | gray-700 | 中灰色 |
| 背景 (容器) | gray-50 | 浅灰色 |
| 边框 | gray-200 | 浅灰色边框 |
| 权重徽章 | green-50/green-700 | 绿色背景 |
| 评分按钮 (选中) | gray-900 | 深灰色 |
| 导出按钮 | green-700 | 绿色按钮 |

---

## 组件架构

### 工具页面组件树 (以 Business Case 为例)

```
BusinessCasePage (page.tsx)
├─ Header
├─ 返回按钮 (Link)
├─ 页面标题 (h1)
├─ BusinessCaseObjective
│  └─ 目标说明段落
├─ KeyEvaluationCriteria
│  ├─ 标题 + Clear 按钮
│  └─ CriteriaRow[]
│     ├─ 标题 + 权重徽章
│     ├─ 描述
│     ├─ 评分按钮 (1-5)
│     └─ 备注文本框
└─ EvaluationSummary
   ├─ 总分卡片
   ├─ 百分比卡片
   ├─ 建议卡片
   └─ 导出按钮
```

### 可复用组件

#### Objective 组件 (所有工具都有)
- `BusinessCaseObjective.tsx`
- `SourcingModelObjective.tsx`
- `PreliminaryObjective.tsx`
- `TCOObjective.tsx`

**特点**: 简单的文本段落，展示工具目标

#### CriteriaRow 组件 (评估标准行)
- 位置: `business-case/CriteriaRow.tsx`
- 用途: 显示单个评估标准
- 功能: 评分 + 备注输入

#### 评估标准容器
- `KeyEvaluationCriteria` (Business Case)
- `SourcingModelCriteria` (Sourcing Model)
- `InitialAssessmentCriteria` (Preliminary Evaluation)

#### 总结组件
- `EvaluationSummary` (Business Case)
- `SourcingModelSummary` (Sourcing Model)
- `PreliminaryEvaluationSummary` (Preliminary Evaluation)
- `TCOChart` (TCO Calculation)

---

## 数据持久化和状态管理

### 状态管理方式

#### 1. React State (useState)
所有工具页面都使用 React 的 `useState` 来管理评估数据：

```typescript
// Business Case 示例
const [criteriaData, setCriteriaData] = useState<CriteriaData>({
  clearProblemDefinition: { notes: '', score: 0 },
  explicitStrategicLink: { notes: '', score: 0 },
  // ...
});
```

#### 2. localStorage 持久化

**TCO Calculation** (完整持久化):
```typescript
// 保存到 localStorage
useEffect(() => {
  localStorage.setItem('tco-solutions', JSON.stringify(solutions));
}, [solutions]);

// 从 localStorage 加载
useEffect(() => {
  const saved = localStorage.getItem('tco-solutions');
  if (saved) {
    const parsed = JSON.parse(saved);
    setSolutions(parsed);
  }
}, []);
```

**Preliminary Evaluation** (跨工具数据共享):
```typescript
// 从 Sourcing Model 工具读取推荐结果
const sourcingModelData = localStorage.getItem('sourcingModelData');
if (sourcingModelData) {
  const parsed = JSON.parse(sourcingModelData);
  if (parsed.recommendation) {
    setSelectedModel(modelMap[parsed.recommendation]);
  }
}
```

**Sourcing Model** (导出结果到 localStorage):
- 在 SourcingModelSummary 中保存推荐结果
- 供 Preliminary Evaluation 工具使用

#### 3. 其他工具 (无持久化)
- Business Case
- Sourcing Model (仅在内存中)
- Preliminary Evaluation (仅在内存中)

### 数据流

#### 工具内部数据流
```
用户输入
  ↓
onChange 事件处理
  ↓
setState 更新状态
  ↓
组件重新渲染
  ↓
计算结果 (EvaluationSummary)
  ↓
显示结果 + 导出选项
```

#### 工具间数据流 (Preliminary Evaluation)
```
Sourcing Model 工具
  ↓
用户完成评估
  ↓
保存推荐结果到 localStorage
  ↓
用户导航到 Preliminary Evaluation
  ↓
读取 localStorage 中的推荐
  ↓
自动选择对应的采购模型
```

### 导出功能

#### CSV 导出
所有工具都支持 CSV 导出：

```typescript
// 通用导出流程
1. 收集评估数据
2. 计算结果
3. 格式化为 CSV
4. 创建 Blob
5. 触发浏览器下载
```

**导出文件名格式**:
- `business-case-analysis-YYYY-MM-DD.csv`
- `sourcing-model-analysis-YYYY-MM-DD.csv`
- `preliminary-evaluation-YYYY-MM-DD.csv`
- `tco-calculation-YYYY-MM-DD.csv`

---

## 后台实现

### API 端点

**GET /api/utilities**

**查询参数**:
- `category` - 按分类过滤
- `search` - 按名称/描述搜索
- `status` - 按状态过滤 (默认: PUBLISHED)

**文件**: `app/src/app/api/utilities/route.ts`

**响应格式**:
```json
{
  "success": true,
  "data": [
    {
      "id": "tool-xxx",
      "name": "Tool Name",
      "description": "...",
      "category": "decision-support",
      "icon": "calculator",
      "url": "/utilities/xxx",
      "version": "1.0.0",
      "status": "PUBLISHED",
      "owner": "AutomationCoE Team",
      "tags": ["tag1", "tag2"],
      "createdAt": "2025-11-05T...",
      "updatedAt": "2025-11-05T...",
      "publishedAt": "2025-11-05T..."
    }
  ],
  "total": 4
}
```

### 类型定义

**文件**: `app/src/lib/types/utility.ts`

```typescript
export type UtilityStatus = 'DRAFT' | 'PUBLISHED' | 'DEPRECATED' | 'ARCHIVED';

export interface Utility {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  url: string;
  version: string;
  status: UtilityStatus;
  owner?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;
}
```

### 常量配置

**文件**: `app/src/lib/constants/utilities.ts`

- `UTILITY_CATEGORIES` - 工具分类列表
- `DECISION_SUPPORT_TOOLS` - 决策支持工具配置

---

## 工具特定的类型和常量

### Business Case 工具

**类型** (`app/src/lib/types/business-case.ts`):
```typescript
interface CriteriaScore {
  notes: string;
  score: number; // 1-5
}

interface CriteriaData {
  clearProblemDefinition: CriteriaScore;
  explicitStrategicLink: CriteriaScore;
  capabilityBasedDefinition: CriteriaScore;
  identificationOfStakeholders: CriteriaScore;
  preliminaryBuyIn: CriteriaScore;
}

interface EvaluationResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  details: { /* 详细评分 */ };
}
```

**评估标准** (5个):
1. Clear Problem Definition (20%)
2. Explicit Strategic Link (20%)
3. Capability-Based Definition (20%)
4. Identification of Stakeholders (20%)
5. Preliminary Buy-In (20%)

### Sourcing Model 工具

**类型** (`app/src/lib/types/sourcing-model.ts`):
```typescript
interface SourcingModelData {
  strategicDifferentiation: CriteriaScore;
  requirementsFit: CriteriaScore;
  timeToMarket: CriteriaScore;
  roadmapControl: CriteriaScore;
  tcoPrediability: CriteriaScore;
  internalSkillset: CriteriaScore;
  vendorLockIn: CriteriaScore;
  integrationFriendliness: CriteriaScore;
}

interface SourcingModelResult {
  build: SourcingModelScores;
  buy: SourcingModelScores;
  openSource: SourcingModelScores;
  recommendation: 'Build' | 'Buy' | 'Open Source';
}
```

**评估标准** (8个):
- 每个标准都有一个评分矩阵，用于计算 Build/Buy/OSS 的得分
- 根据用户评分和权重计算最终建议

### Preliminary Evaluation 工具

**类型** (`app/src/lib/types/preliminary-evaluation.ts`):
```typescript
// Part 1: 初始评估 (17个标准)
interface InitialAssessmentData {
  businessValuePotential: CriteriaScore;
  coreFeatureCompleteness: CriteriaScore;
  // ... 15 more criteria
}

// Part 2: 采购模型特定评估
interface COTSEvaluationData { /* Buy 模型 */ }
interface CustomDevelopmentEvaluationData { /* Build 模型 */ }
interface OSSEvaluationData { /* Open Source 模型 */ }

interface PreliminaryEvaluationData {
  initialAssessment: InitialAssessmentData;
  sourcingModelSpecific: {
    buy: COTSEvaluationData;
    build: CustomDevelopmentEvaluationData;
    openSource: OSSEvaluationData;
  };
}
```

### TCO Calculation 工具

**类型** (`app/src/lib/types/tco-calculation.ts`):
```typescript
interface CostItem {
  id: string;
  name: string;
  category: 'Direct' | 'Indirect';
}

interface CostData {
  [costItemId: string]: {
    year1: number;
    year2: number;
    year3: number;
    year4: number;
    year5: number;
  };
}

interface Solution {
  id: string;
  name: string;
  costs: CostData;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TCOSummary {
  solutionId: string;
  solutionName: string;
  year1Total: number;
  year2Total: number;
  year3Total: number;
  year4Total: number;
  year5Total: number;
  fiveYearTotal: number;
  directCostsTotal: number;
  indirectCostsTotal: number;
}
```

**成本项目** (直接 + 间接):
- 直接成本: 软件许可、实施、硬件
- 间接成本: 维护、支持、培训

---

## 数据流

### 页面加载流程

```
1. 页面挂载 (useEffect)
   ↓
2. 调用 GET /api/utilities
   ↓
3. Prisma 查询 axon_utility 表
   ↓
4. 返回工具列表
   ↓
5. 前端渲染 UtilityGrid
   ↓
6. 按分类分组显示
```

### 搜索/过滤流程

```
用户输入搜索词或选择分类
   ↓
防抖 500ms
   ↓
更新 URL 参数
   ↓
前端过滤 (客户端)
   ↓
更新 filteredUtilities 状态
   ↓
重新渲染网格
```

---

## 迁移文件

所有工具通过 Prisma 迁移初始化:

- `add_axon_utility_table` - 创建表
- `seed_decision_support_tools` - 初始化 Business Case
- `seed_sourcing_model_tool` - 初始化 Sourcing Model
- `seed_preliminary_evaluation_tool` - 初始化 Preliminary Evaluation
- `seed_tco_calculation_tool` - 初始化 TCO Calculation

---

## 关键特性

✅ 数据库持久化 (PostgreSQL)
✅ 实时搜索和过滤
✅ URL 状态管理
✅ 响应式设计
✅ 类型安全 (TypeScript)
✅ 防抖优化
✅ 错误处理
✅ 加载状态
✅ CSV 导出功能
✅ 工具间数据共享 (localStorage)
✅ 多步骤评估流程
✅ 实时计算和建议

---

## 文件结构总览

### 核心目录结构

```
app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── utilities/
│   │   │       └── route.ts (API 端点)
│   │   └── utilities/
│   │       ├── page.tsx (主列表页面)
│   │       ├── business-case/
│   │       │   └── page.tsx
│   │       ├── sourcing-model/
│   │       │   └── page.tsx
│   │       ├── preliminary-evaluation/
│   │       │   └── page.tsx
│   │       └── tco-calculation/
│   │           └── page.tsx
│   ├── components/
│   │   └── utilities/
│   │       ├── UtilityCard.tsx
│   │       ├── UtilityGrid.tsx
│   │       ├── UtilitySearch.tsx
│   │       ├── UtilityCategoryFilter.tsx
│   │       ├── business-case/
│   │       │   ├── BusinessCaseObjective.tsx
│   │       │   ├── KeyEvaluationCriteria.tsx
│   │       │   ├── CriteriaRow.tsx
│   │       │   └── EvaluationSummary.tsx
│   │       ├── sourcing-model/
│   │       │   ├── SourcingModelObjective.tsx
│   │       │   ├── SourcingModelCriteria.tsx
│   │       │   └── SourcingModelSummary.tsx
│   │       ├── preliminary-evaluation/
│   │       │   ├── PreliminaryObjective.tsx
│   │       │   ├── InitialAssessmentCriteria.tsx
│   │       │   ├── SourcingModelSpecificCriteria.tsx
│   │       │   └── PreliminaryEvaluationSummary.tsx
│   │       └── tco-calculation/
│   │           ├── TCOObjective.tsx
│   │           ├── TCOSolutionManager.tsx
│   │           └── TCOChart.tsx
│   └── lib/
│       ├── types/
│       │   ├── utility.ts
│       │   ├── business-case.ts
│       │   ├── sourcing-model.ts
│       │   ├── preliminary-evaluation.ts
│       │   └── tco-calculation.ts
│       ├── constants/
│       │   ├── utilities.ts
│       │   ├── business-case.ts
│       │   ├── sourcing-model.ts
│       │   ├── preliminary-evaluation.ts
│       │   └── tco-calculation.ts
│       └── utils/
│           ├── business-case.ts
│           ├── sourcing-model.ts
│           ├── preliminary-evaluation.ts
│           └── tco-calculation.ts
└── prisma/
    ├── schema.prisma
    └── migrations/
        ├── add_axon_utility_table/
        ├── seed_decision_support_tools/
        ├── seed_sourcing_model_tool/
        ├── seed_preliminary_evaluation_tool/
        └── seed_tco_calculation_tool/
```

### 关键文件说明

| 文件 | 用途 |
|------|------|
| `app/src/app/utilities/page.tsx` | 工具列表主页面 |
| `app/src/app/api/utilities/route.ts` | 获取工具列表 API |
| `app/src/lib/types/*.ts` | 类型定义 |
| `app/src/lib/constants/*.ts` | 常量配置 (评估标准、权重等) |
| `app/src/lib/utils/*.ts` | 计算逻辑 (评分、导出等) |
| `app/prisma/schema.prisma` | 数据库模型定义 |

---

## 实现总结

### 已完成的功能

#### 1. 工具列表页面 (/utilities)
- ✅ 工具卡片网格展示
- ✅ 实时搜索功能
- ✅ 分类过滤
- ✅ 响应式布局
- ✅ 工具导航

#### 2. Business Case 工具
- ✅ 5个评估标准
- ✅ 评分系统 (1-5)
- ✅ 加权计算
- ✅ 结果展示
- ✅ CSV 导出

#### 3. Sourcing Model 工具
- ✅ 8个决策维度
- ✅ Build/Buy/OSS 评分矩阵
- ✅ 自动推荐
- ✅ 结果可视化
- ✅ CSV 导出
- ✅ localStorage 保存推荐

#### 4. Preliminary Evaluation 工具
- ✅ 两步骤评估流程
- ✅ 17个初始评估标准
- ✅ 采购模型特定评估 (8个标准 × 3个模型)
- ✅ 自动读取 Sourcing Model 推荐
- ✅ 综合评估总结
- ✅ CSV 导出

#### 5. TCO Calculation 工具
- ✅ 多方案对比
- ✅ 5年成本预测
- ✅ 直接/间接成本分类
- ✅ 图表可视化
- ✅ localStorage 持久化
- ✅ CSV 导出

### 技术栈

- **前端框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **数据库**: PostgreSQL (Neon)
- **ORM**: Prisma
- **状态管理**: React Hooks + localStorage
- **API**: Next.js Route Handlers

### 设计模式

1. **组件复用**: Objective、CriteriaRow、EvaluationSummary 等可复用组件
2. **类型安全**: 完整的 TypeScript 类型定义
3. **关注点分离**: 页面、组件、类型、常量、工具函数分离
4. **数据流**: 单向数据流，状态集中管理
5. **工具间通信**: 通过 localStorage 实现工具间数据共享

---

**准备好进行下一步了吗?**

