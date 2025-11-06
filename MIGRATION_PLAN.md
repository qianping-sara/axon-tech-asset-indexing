# BizDomain 设计更新 - 迁移计划

## 📋 设计变更总结

### 旧设计（11个域）
- **Core Servicing Domains (5)**: Claim, Financial Change, Inquiry & General Changes, Money Out, Wealth
- **Horizontal Capabilities (6)**: Channel Experience, Payment & Settlement, Finance & Accounting, Risk & Compliance, Customer Communication, Customer Management

### 新设计（11个域）
- **Core Servicing Domains (5)**: Claim, Financial Change, Inquiry & General Changes, Money Out, Wealth
- **Support Domain Capabilities (5)**:
  - Customer Engagement (合并 Channel Experience + Customer Communication)
  - Customer & Relationship Management (重命名 Customer Management)
  - Payment & Settlement
  - Finance & Accounting
  - Risk & Compliance
- **General Domain Capabilities (1)**: Common Capabilities

---

## 🔧 需要修改的内容

### 1. 数据库层 (Prisma)
**文件**: `prisma/schema.prisma`

**修改内容**:
- [ ] 添加 `COMMON_CAPABILITIES` 到 `BizDomain` 枚举
- [ ] 创建新的迁移文件

**迁移步骤**:
```bash
npx prisma migrate dev --name add_common_capabilities_biz_domain
```

---

### 2. 代码层 - 常量定义
**文件**: `src/lib/constants/bizDomains.ts`

**修改内容**:
- [ ] 更新 `BizDomainInfo` 接口：`category` 类型改为 `'core' | 'support' | 'common'`
- [ ] 删除 `CHANNEL_EXPERIENCE` 和 `CUSTOMER_COMMUNICATION`
- [ ] 添加 `CUSTOMER_ENGAGEMENT` (合并两者)
- [ ] 重命名 `CUSTOMER_MANAGEMENT` 为 `CUSTOMER_RELATIONSHIP_MANAGEMENT`
- [ ] 添加 `COMMON_CAPABILITIES` 域
- [ ] 更新过滤函数：
  - `CORE_BIZ_DOMAINS` - 保持不变
  - `SUPPORT_BIZ_DOMAINS` - 新增（替代 HORIZONTAL_BIZ_DOMAINS）
  - `COMMON_BIZ_DOMAINS` - 新增
  - 保留 `HORIZONTAL_BIZ_DOMAINS` 作为向后兼容

---

### 3. 数据库数据迁移
**需要处理的资产**:

#### 3.1 CHANNEL_EXPERIENCE → CUSTOMER_ENGAGEMENT
- Corporate API
- 其他相关资产

#### 3.2 CUSTOMER_COMMUNICATION → CUSTOMER_ENGAGEMENT
- Document API
- 其他相关资产

#### 3.3 CUSTOMER_MANAGEMENT → CUSTOMER_RELATIONSHIP_MANAGEMENT
- 所有现有资产自动更新

#### 3.4 新增 COMMON_CAPABILITIES 映射
- 需要识别哪些资产应该属于 COMMON_CAPABILITIES
- 例如：SSO、数据管理、文档管理相关的资产

---

### 4. 代码层 - UI 组件
**文件**: `src/components/assets/BizDomainSelect.tsx`

**修改内容**:
- [ ] 更新分组逻辑以支持三层分类
- [ ] 更新显示标签（Core / Support / Common）
- [ ] 更新样式和分组展示

---

### 5. 代码层 - 其他组件
**需要检查的文件**:
- [ ] `src/components/assets/AssetCard.tsx` - 检查 bizDomain 显示
- [ ] `src/app/assets/[id]/page.tsx` - 检查详情页显示
- [ ] `src/components/search/SearchResults.tsx` - 检查搜索结果显示
- [ ] `src/components/discover/RecentlyUpdatedAssets.tsx` - 检查发现页显示

---

### 6. 数据迁移脚本
**需要创建/更新**:
- [ ] 更新 `scripts/update-biz-domain.js` 中的关键词映射
- [ ] 创建 `scripts/migrate-biz-domain.js` 来处理旧值到新值的映射
- [ ] 创建 `scripts/identify-common-assets.js` 来识别应该属于 COMMON 的资产

---

## 📊 映射规则更新

### 旧 → 新 映射
```
CHANNEL_EXPERIENCE → CUSTOMER_ENGAGEMENT
CUSTOMER_COMMUNICATION → CUSTOMER_ENGAGEMENT
CUSTOMER_MANAGEMENT → CUSTOMER_RELATIONSHIP_MANAGEMENT
(新增) → COMMON_CAPABILITIES
```

### 关键词映射更新
**CUSTOMER_ENGAGEMENT** (合并):
- 原 CHANNEL_EXPERIENCE: channel, experience, app, web, call center, authentication, sso, journey
- 原 CUSTOMER_COMMUNICATION: communication, notification, template, dispatch, sms, email, letter, document

**COMMON_CAPABILITIES** (新增):
- 需要定义关键词：data, mdm, identity, access, sso, authentication, document, archive

---

## 🚀 执行步骤

1. **更新 Prisma Schema**
   - 添加 COMMON_CAPABILITIES 枚举值
   - 创建迁移

2. **更新代码常量**
   - 修改 bizDomains.ts
   - 更新 category 类型

3. **更新 UI 组件**
   - 修改 BizDomainSelect
   - 更新其他显示组件

4. **数据迁移**
   - 创建迁移脚本
   - 执行数据更新

5. **测试验证**
   - 类型检查
   - 功能测试
   - 数据验证

---

## ⚠️ 注意事项

- 需要保持向后兼容性（HORIZONTAL_BIZ_DOMAINS）
- 需要更新所有相关的测试文件
- 需要更新 API 文档（如有）
- 需要通知前端团队关于 UI 变更

