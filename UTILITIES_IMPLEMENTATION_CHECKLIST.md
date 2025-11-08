# CoE Utilities 功能实施检查清单

## 📋 项目信息

**功能名称**: CoE Utilities - 工具管理和展示系统  
**目标**: 在 Axon 系统中添加工具管理模块，支持工具分类、搜索和展示  
**优先级**: 高  
**预计工作量**: 5-8 天

---

## ✅ Phase 1: 基础设施 (1-2 天)

### Task 1.1: 数据库设计和迁移

- [ ] 1.1.1 设计 `axon_utility` 表结构
  - [ ] 定义字段：id, name, description, category, icon, url, version, status, owner, tags
  - [ ] 设置主键和索引
  - [ ] 考虑与 axon_asset 的关系

- [ ] 1.1.2 更新 Prisma schema
  - [ ] 添加 `axon_utility` 模型
  - [ ] 定义关系（如果需要）
  - [ ] 运行 `prisma generate`

- [ ] 1.1.3 创建数据库迁移
  - [ ] 创建迁移文件 `add_axon_utility_table`
  - [ ] 编写 SQL 创建表
  - [ ] 执行迁移验证

- [ ] 1.1.4 添加初始工具数据
  - [ ] 创建迁移文件 `seed_decision_support_tools`
  - [ ] 插入初期预设工具：Business Case and Strategic Alignment
  - [ ] 验证数据完整性

### Task 1.2: 常量和类型定义

- [ ] 1.2.1 创建工具常量文件
  - [ ] 创建 `src/lib/constants/utilities.ts`
  - [ ] 定义 UTILITY_CATEGORIES 常量（仅 Decision Support）
  - [ ] 定义初期工具数据（Business Case and Strategic Alignment）

- [ ] 1.2.2 创建 TypeScript 类型
  - [ ] 创建 `src/lib/types/utility.ts`
  - [ ] 定义 Utility 接口
  - [ ] 定义 API 响应类型

### Task 1.3: API 端点开发

- [ ] 1.3.1 创建 API 路由
  - [ ] 创建 `src/app/api/utilities/route.ts`
  - [ ] 实现 GET 方法获取所有工具

- [ ] 1.3.2 实现分类过滤
  - [ ] 添加 `?category=X` 查询参数支持
  - [ ] 实现过滤逻辑

- [ ] 1.3.3 实现搜索功能
  - [ ] 添加 `?search=X` 查询参数支持
  - [ ] 在 name、description、tags 中搜索
  - [ ] 实现模糊匹配

- [ ] 1.3.4 创建工具详情端点
  - [ ] 创建 `src/app/api/utilities/[id]/route.ts`
  - [ ] 实现 GET 方法获取单个工具

---

## ✅ Phase 2: 前端组件 (2-3 天)

### Task 2.1: 基础组件开发

- [ ] 2.1.1 创建 UtilityCard 组件
  - [ ] 创建 `src/components/utilities/UtilityCard.tsx`
  - [ ] 显示工具 icon、名称、分类、描述
  - [ ] 添加 "Open Tool" 按钮
  - [ ] 实现悬停效果

- [ ] 2.1.2 创建 UtilityGrid 组件
  - [ ] 创建 `src/components/utilities/UtilityGrid.tsx`
  - [ ] 实现响应式网格布局（lg/md/sm）
  - [ ] 支持按分类分组显示
  - [ ] 添加加载状态

- [ ] 2.1.3 创建 UtilityCategoryFilter 组件
  - [ ] 创建 `src/components/utilities/UtilityCategoryFilter.tsx`
  - [ ] 显示分类标签
  - [ ] 实现分类选择逻辑
  - [ ] 支持"全部"选项

- [ ] 2.1.4 创建 UtilitySearch 组件
  - [ ] 创建 `src/components/utilities/UtilitySearch.tsx`
  - [ ] 实现搜索输入框
  - [ ] 添加搜索图标
  - [ ] 支持清除搜索

### Task 2.2: 页面开发

- [ ] 2.2.1 创建 Utilities 主页面
  - [ ] 创建 `src/app/utilities/page.tsx`
  - [ ] 集成 Header 组件
  - [ ] 添加页面标题和描述

- [ ] 2.2.2 集成搜索和过滤
  - [ ] 集成 UtilitySearch 组件
  - [ ] 集成 UtilityCategoryFilter 组件
  - [ ] 实现状态管理（搜索词、选中分类）

- [ ] 2.2.3 集成工具展示
  - [ ] 集成 UtilityGrid 组件
  - [ ] 从 API 获取工具数据
  - [ ] 实现数据过滤和搜索

- [ ] 2.2.4 实现响应式布局
  - [ ] 测试桌面端布局
  - [ ] 测试平板端布局
  - [ ] 测试移动端布局

- [ ] 2.2.5 添加空状态
  - [ ] 无工具时显示提示
  - [ ] 搜索无结果时显示提示

### Task 2.3: Header 集成

- [ ] 2.3.1 在 Header 中添加菜单项
  - [ ] 修改 `src/components/layout/Header.tsx`
  - [ ] 添加 "CoE Utilities" 链接
  - [ ] 设置链接到 `/utilities`

- [ ] 2.3.2 实现活跃状态样式
  - [ ] 检测当前路径
  - [ ] 当在 `/utilities` 时高亮菜单项
  - [ ] 保持与其他菜单项一致的样式

- [ ] 2.3.3 测试导航
  - [ ] 测试从首页导航到 Utilities
  - [ ] 测试从 Discover 导航到 Utilities
  - [ ] 测试从 Utilities 导航回首页

---

## ✅ Phase 3: 功能完善 (1-2 天)

### Task 3.1: 搜索和过滤优化

- [ ] 3.1.1 实现实时搜索
  - [ ] 添加防抖处理
  - [ ] 实时更新搜索结果
  - [ ] 显示搜索结果数量

- [ ] 3.1.2 多条件过滤
  - [ ] 支持分类 + 搜索词组合过滤
  - [ ] 实现过滤逻辑
  - [ ] 显示活跃过滤条件

- [ ] 3.1.3 搜索结果高亮
  - [ ] 在搜索结果中高亮匹配词
  - [ ] 改进搜索体验

- [ ] 3.1.4 过滤状态持久化
  - [ ] 将过滤条件保存到 URL 参数
  - [ ] 支持分享过滤链接
  - [ ] 页面刷新保持过滤状态

### Task 3.2: 工具详情页面（后续实现）

- [ ] 3.2.1 创建工具详情页面
  - [ ] 创建 `src/app/utilities/[id]/page.tsx`
  - [ ] 显示工具完整信息
  - [ ] 添加返回按钮

- [ ] 3.2.2 实现工具链接功能
  - [ ] 添加"复制链接"功能
  - [ ] 支持在其他资产中引用

### Task 3.3: 资产链接支持

- [ ] 3.3.1 在 Markdown 中支持工具链接
  - [ ] 定义工具链接语法（如 `[tool:tool-id]`）
  - [ ] 创建工具链接解析器

- [ ] 3.3.2 创建工具链接组件
  - [ ] 创建 `ToolLink.tsx` 组件
  - [ ] 显示工具卡片预览
  - [ ] 支持点击打开工具

- [ ] 3.3.3 在 SOP/Practice 资产中测试
  - [ ] 在现有资产中添加工具链接
  - [ ] 验证链接正确显示
  - [ ] 测试链接功能

---

## ✅ Phase 4: 测试和优化 (1 天)

### Task 4.1: 单元测试

- [ ] 4.1.1 测试 API 端点
  - [ ] 测试获取所有工具
  - [ ] 测试分类过滤
  - [ ] 测试搜索功能
  - [ ] 测试错误处理

- [ ] 4.1.2 测试组件
  - [ ] 测试 UtilityCard 渲染
  - [ ] 测试 UtilityGrid 渲染
  - [ ] 测试过滤和搜索组件

### Task 4.2: 集成测试

- [ ] 4.2.1 测试完整用户流程
  - [ ] 导航到 Utilities 页面
  - [ ] 搜索工具
  - [ ] 过滤工具
  - [ ] 打开工具

- [ ] 4.2.2 测试响应式布局
  - [ ] 桌面端显示正确
  - [ ] 平板端显示正确
  - [ ] 移动端显示正确

- [ ] 4.2.3 性能测试
  - [ ] 测试加载时间
  - [ ] 测试搜索响应速度
  - [ ] 测试大数据集性能

### Task 4.3: 文档和部署

- [ ] 4.3.1 编写使用文档
  - [ ] 创建用户指南
  - [ ] 编写工具添加指南
  - [ ] 编写 API 文档

- [ ] 4.3.2 更新 README
  - [ ] 添加 Utilities 功能说明
  - [ ] 更新功能列表

- [ ] 4.3.3 部署到生产环境
  - [ ] 执行数据库迁移
  - [ ] 部署代码
  - [ ] 验证功能正常

---

## 📊 进度跟踪

| Phase | 任务 | 状态 | 完成度 |
|-------|------|------|--------|
| 1 | 基础设施 | ⏳ 未开始 | 0% |
| 2 | 前端组件 | ⏳ 未开始 | 0% |
| 3 | 功能完善 | ⏳ 未开始 | 0% |
| 4 | 测试优化 | ⏳ 未开始 | 0% |

---

## 🔗 相关文件

- `UTILITIES_FEATURE_DESIGN.md` - 详细设计文档
- `src/lib/constants/utilities.ts` - 工具常量
- `src/lib/types/utility.ts` - 类型定义
- `src/components/utilities/` - 工具组件
- `src/app/utilities/` - Utilities 页面
- `src/app/api/utilities/` - API 端点
- `prisma/schema.prisma` - 数据库 schema

