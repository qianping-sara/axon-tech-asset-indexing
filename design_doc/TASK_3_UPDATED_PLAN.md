# Task 3 更新方案 - 基于最新分类体系

## 📊 方案更新总结

根据 `CLASSIFICATION_QUICK_GUIDE.md` 的最新分类体系，我已经完整评审并更新了设计方案。

### 关键变化

| 方面 | 原方案 | 新方案 | 影响 |
|------|--------|--------|------|
| 首页分类展示 | 简单的分类统计 | 6个Category卡片 | 新增CategoryCard组件 |
| 搜索过滤 | 单级Category过滤 | 两级Category+Asset Type过滤 | 新增AssetTypeFilter组件 |
| 搜索结果卡片 | 仅显示Category | 显示Category和Asset Type | AssetCard组件更新 |
| 常量管理 | 无 | 专门的categories常量文件 | 新增lib/constants/categories.ts |
| 总任务数 | 12个 | 14个 | +2个新组件 |
| 预计工期 | 7.5小时 | 8.5小时 | +1小时 |

## 🎯 更新后的任务分解

### 第一阶段：组件开发 (8个任务) - 4小时

| 任务 | 组件 | 功能 | 状态 |
|------|------|------|------|
| 3.1 | Header | 导航、Logo、Docs链接 | ⏳ |
| 3.2 | SearchBlock | 搜索框、热门标签 | ⏳ |
| **3.3** | **CategoryCard** | **单个Category卡片** | **新增** |
| 3.4 | SolutionIntro | 解决方案介绍、6个Category统计 | ⏳ |
| 3.5 | FourPillars | 四个支柱卡片 | ⏳ |
| 3.6 | AssetCard | 资产卡片（显示Asset Type） | ⏳ |
| **3.7** | **AssetTypeFilter** | **二级Asset Type过滤器** | **新增** |
| 3.8 | SearchResults | 搜索结果容器 | ⏳ |

### 第二阶段：Hooks开发 (2个任务) - 1小时

| 任务 | Hook | 功能 | 状态 |
|------|------|------|------|
| 3.9 | useSearch | 搜索逻辑、API调用 | ⏳ |
| 3.10 | useFilters | 过滤器状态管理（支持Category和Asset Type） | ⏳ |

### 第三阶段：页面集成 (2个任务) - 1小时

| 任务 | 页面 | 功能 | 状态 |
|------|------|------|------|
| 3.11 | 首页 | 集成所有首页组件 | ⏳ |
| 3.12 | 搜索结果页 | 集成搜索结果组件 | ⏳ |

### 第四阶段：测试 (2个任务) - 2.5小时

| 任务 | 测试 | 覆盖 | 状态 |
|------|------|------|------|
| 3.13 | 组件测试 | 所有组件 | ⏳ |
| 3.14 | Hook测试 | 所有Hooks | ⏳ |

**总计**: 14个任务，8.5小时

## 📁 新增文件

### 新增组件
- `src/components/home/CategoryCard.tsx` - Category卡片组件
- `src/components/search/AssetTypeFilter.tsx` - Asset Type过滤器组件

### 新增常量
- `src/lib/constants/categories.ts` - Category和Asset Type常量定义

### 新增文档
- `CLASSIFICATION_INTEGRATION_DESIGN.md` - 分类体系集成设计详细文档

## 🔌 API兼容性检查

### ✅ 已支持的API功能

1. **GET /api/categories** - 获取Category统计
   ```
   GET /api/categories?stats=true
   返回: 6个Category及其统计信息
   ```

2. **GET /api/assets** - 按Category过滤
   ```
   GET /api/assets?category=CODE_COMPONENTS
   返回: 该Category下的所有资产
   ```

3. **GET /api/assets** - 返回assetType字段
   ```
   响应中包含: assetType: 'Scripts'
   ```

### ❓ 需要验证的API功能

**Asset Type过滤** - 需要确认是否支持
```
GET /api/assets?category=CODE_COMPONENTS&assetType=Scripts
```

**建议**: 
- 如果后端已支持，前端可直接使用
- 如果不支持，需要在后端添加assetType过滤支持

## 🎨 UI设计更新

### 首页变化

**原**: 简单的分类统计（如"APIs & Services 40+"）
**新**: 6个Category卡片，每个包含：
- Category名称
- 简短描述
- 资产总数
- 主要Asset Type列表
- 点击跳转到该Category的搜索结果

### 搜索结果页变化

**原**: 单级Category过滤
**新**: 两级过滤
- 一级: Category（6个选项）
- 二级: Asset Type（根据选中Category动态显示）

### 搜索结果卡片变化

**原**: 仅显示Category标签
**新**: 显示Category和Asset Type两个标签

## 📋 实现清单

### 前置准备
- [ ] 确认后端是否支持Asset Type过滤
- [ ] 如需要，添加Asset Type过滤支持

### 组件开发
- [ ] 3.1: Header 组件
- [ ] 3.2: SearchBlock 组件
- [ ] 3.3: CategoryCard 组件（新增）
- [ ] 3.4: SolutionIntro 组件
- [ ] 3.5: FourPillars 组件
- [ ] 3.6: AssetCard 组件
- [ ] 3.7: AssetTypeFilter 组件（新增）
- [ ] 3.8: SearchResults 组件

### Hooks开发
- [ ] 3.9: useSearch Hook
- [ ] 3.10: useFilters Hook

### 页面集成
- [ ] 3.11: 首页
- [ ] 3.12: 搜索结果页

### 测试
- [ ] 3.13: 组件测试
- [ ] 3.14: Hook测试

### 文档
- [ ] 更新README
- [ ] 更新API文档

## 🚀 下一步行动

1. **确认API支持** - 检查后端是否支持Asset Type过滤
2. **开始实现** - 按照任务分解逐步实现
3. **定期检查** - 每个阶段完成后进行代码审查

## 📚 相关文档

- `TASK_3_DESIGN_SUMMARY.md` - Task 3总体设计方案（已更新）
- `CLASSIFICATION_INTEGRATION_DESIGN.md` - 分类体系集成设计详细文档（新增）
- `CLASSIFICATION_QUICK_GUIDE.md` - 分类体系快速指南
- `FRONTEND_DESIGN_PLAN.md` - 前端设计方案
- `IMPLEMENTATION_GUIDE_FRONTEND.md` - 实现指南

