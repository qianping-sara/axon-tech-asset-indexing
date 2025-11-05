# Asset Classification System v2.0: Implementation Guide

**Status**: Ready for Implementation  
**Priority**: High  
**Estimated Effort**: 2-3 days

---

## 🎯 Implementation Overview

This guide provides step-by-step instructions for implementing the new AI/ML Services category.

---

## 📋 Phase 1: Database Schema Update

### Step 1.1: Update Prisma Schema

**File**: `prisma/schema.prisma`

```prisma
enum Category {
  CODE_COMPONENTS
  SERVICES_APIS
  AI_ML_SERVICES          // ← ADD THIS
  AUTOMATION_WORKFLOWS
  DATA_ANALYTICS
  ARCHITECTURE_GOVERNANCE
  KNOWLEDGE_PRACTICES
}
```

### Step 1.2: Create Database Migration

```bash
cd app
npx prisma migrate dev --name add_ai_ml_services_category
```

This will:
- Generate migration file
- Update database schema
- Regenerate Prisma client

---

## 🎨 Phase 2: Frontend Constants Update

### Step 2.1: Update `src/lib/constants/categories.ts`

Add new category definition:

```typescript
{
  name: 'AI_ML_SERVICES',
  displayName: 'AI/ML Services',
  description: 'Machine learning models, LLM services, and AI agents',
  icon: '🤖',
  color: 'purple',
  assetTypes: [
    'ML Models',
    'LLM Services',
    'AI Agents',
    'ML Pipelines',
    'Feature Stores',
  ],
},
```

### Step 2.2: Update `ASSET_TYPES_BY_CATEGORY`

```typescript
AI_ML_SERVICES: [
  'ML Models',
  'LLM Services',
  'AI Agents',
  'ML Pipelines',
  'Feature Stores',
],
```

### Step 2.3: Update `SERVICES_APIS`

Remove `'AI/ML Services'` from the array:

```typescript
SERVICES_APIS: [
  'REST APIs',
  'GraphQL APIs',
  'Microservices',
  'Integration Services',
  // 'AI/ML Services' ← REMOVE THIS
],
```

---

## 🔄 Phase 3: Data Migration

### Step 3.1: Create Migration Script

**File**: `scripts/migrate-ai-ml-services.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateAiMlServices() {
  try {
    // Find all assets with assetType = 'AI/ML Services'
    const aiMlAssets = await prisma.axon_asset.findMany({
      where: {
        assetType: 'AI/ML Services',
      },
    });

    console.log(`Found ${aiMlAssets.length} AI/ML Service assets`);

    // Update category to AI_ML_SERVICES
    const updated = await prisma.axon_asset.updateMany({
      where: {
        assetType: 'AI/ML Services',
      },
      data: {
        category: 'AI_ML_SERVICES',
      },
    });

    console.log(`Updated ${updated.count} assets`);
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrateAiMlServices();
```

### Step 3.2: Run Migration Script

```bash
cd app
npx ts-node scripts/migrate-ai-ml-services.ts
```

### Step 3.3: Verify Migration

```bash
# Check updated assets
npx prisma studio

# Or query directly
SELECT COUNT(*) FROM axon_asset WHERE category = 'AI_ML_SERVICES';
```

---

## 🧪 Phase 4: Testing

### Step 4.1: Update Test Data

**File**: `tests/fixtures/assets.ts`

Add test asset for AI/ML Services category:

```typescript
{
  id: 'ai-ml-test-1',
  name: 'Fraud Detection Model',
  category: 'AI_ML_SERVICES',
  assetType: 'ML Models',
  // ... other fields
},
```

### Step 4.2: Update Unit Tests

**Files to update**:
- `tests/unit/components/CategoryFilter.test.tsx`
- `tests/unit/components/AssetTypeFilter.test.tsx`
- `tests/unit/lib/constants/categories.test.ts`

Add tests for:
- New category appears in filters
- Asset types for AI_ML_SERVICES are correct
- Migration data is accessible

### Step 4.3: Run Tests

```bash
npm run test
npm run test:e2e
```

---

## 🚀 Phase 5: UI/UX Updates

### Step 5.1: Update Category Filter

**File**: `src/components/search/CategoryFilter.tsx`

No code changes needed - automatically picks up new category from constants.

### Step 5.2: Update Asset Type Filter

**File**: `src/components/search/AssetTypeFilter.tsx`

No code changes needed - automatically picks up new asset types from constants.

### Step 5.3: Update Category Display

**File**: `src/components/assets/CategoryBadge.tsx`

Verify icon and color display correctly for new category.

### Step 5.4: Update Search Page

**File**: `src/app/discover/page.tsx`

Verify new category appears in:
- Category filter list
- Category statistics
- Search results

---

## 📝 Phase 6: Documentation & Communication

### Step 6.1: Update User Documentation

- Update help text in UI
- Update API documentation
- Update user guides

### Step 6.2: Communicate Changes

- Notify users about new category
- Provide migration information
- Share best practices for AI/ML assets

---

## ✅ Verification Checklist

- [ ] Database migration completed successfully
- [ ] Prisma schema updated and client regenerated
- [ ] Frontend constants updated
- [ ] Data migration script executed
- [ ] All existing AI/ML assets migrated to new category
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Category filter shows new category
- [ ] Asset type filter works for new category
- [ ] Search functionality works with new category
- [ ] Asset detail page displays correctly
- [ ] No console errors or warnings
- [ ] Documentation updated
- [ ] Team notified

---

## 🔍 Rollback Plan

If issues occur, rollback steps:

1. **Database Rollback**
   ```bash
   npx prisma migrate resolve --rolled-back add_ai_ml_services_category
   ```

2. **Code Rollback**
   ```bash
   git revert <commit-hash>
   ```

3. **Data Rollback**
   ```sql
   UPDATE axon_asset 
   SET category = 'SERVICES_APIS' 
   WHERE category = 'AI_ML_SERVICES';
   ```

---

## 📞 Support & Questions

For implementation questions or issues, contact the development team.

---

## 📚 Related Documents

- `ASSET_CLASSIFICATION_SYSTEM.md` - Complete system design
- `CLASSIFICATION_V1_VS_V2.md` - Comparison and changes

