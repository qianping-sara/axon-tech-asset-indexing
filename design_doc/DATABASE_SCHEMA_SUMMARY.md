# Database Schema Summary - Current State

**Last Updated**: 2025-11-15  
**Status**: ✅ Verified and Synchronized

---

## 📊 Current Database State

### Tables (5 total)

| Table | Purpose | Records | Status |
|-------|---------|---------|--------|
| `axon_asset` | Core asset metadata | Multiple | ✅ Active |
| `axon_tag` | Reusable tags | Multiple | ✅ Active |
| `axon_asset_tag` | Asset-tag relationships (M:M) | Multiple | ✅ Active |
| `axon_asset_relation` | Asset dependency graph | Multiple | ✅ Active |
| `axon_asset_version` | Version history | Multiple | ✅ Active |

### Enums (4 total)

#### 1. Category (7 values)
```
CODE_COMPONENTS
SERVICES_APIS
AI_ML_SERVICES
AUTOMATION_WORKFLOWS
DATA_ANALYTICS
ARCHITECTURE_GOVERNANCE
KNOWLEDGE_PRACTICES
```

#### 2. Status (4 values)
```
DRAFT
PUBLISHED
DEPRECATED
ARCHIVED
```

#### 3. BizDomain (11 values) ⭐ UPDATED
**Core Servicing Domains (5)**:
- CLAIM
- FINANCIAL_CHANGE
- INQUIRY_GENERAL_CHANGES
- MONEY_OUT
- WEALTH

**Support Domain Capabilities (5)**:
- CUSTOMER_ENGAGEMENT
- CUSTOMER_RELATIONSHIP_MANAGEMENT
- PAYMENT_SETTLEMENT
- FINANCE_ACCOUNTING
- RISK_COMPLIANCE

**General Domain Capabilities (1)**:
- COMMON_CAPABILITIES

**Migration History**:
- ❌ CHANNEL_EXPERIENCE → ✅ CUSTOMER_ENGAGEMENT (migrated)
- ❌ CUSTOMER_COMMUNICATION → ✅ CUSTOMER_ENGAGEMENT (migrated)

#### 4. RelationType (8 values - ArchiMate 3.x) ⭐ UPDATED
**Structural Relationships**:
- COMPOSITION (strong lifecycle dependency)
- AGGREGATION (weak lifecycle dependency)
- ASSIGNMENT (allocation of responsibility)
- REALIZATION (concrete implementation)

**Dependency Relationships**:
- SERVING (provides functionality)
- ACCESS (uses/accesses)
- INFLUENCE (affects implementation)
- ASSOCIATION (unspecified relationship)

---

## 🔄 Migration Timeline

### Phase 1: Initial Setup
- **0_init**: Created 5 tables, 3 enums (Category, Status, RelationType)

### Phase 2: Business Domain Addition
- **add_biz_domain**: Added BizDomain enum (10 values)
  - Initial values: CLAIM, FINANCIAL_CHANGE, INQUIRY_GENERAL_CHANGES, MONEY_OUT, WEALTH, CHANNEL_EXPERIENCE, PAYMENT_SETTLEMENT, FINANCE_ACCOUNTING, RISK_COMPLIANCE, CUSTOMER_COMMUNICATION

### Phase 3: Business Domain Restructuring
- **update_biz_domain_structure**: Restructured to 3-tier architecture
  - Added: CUSTOMER_ENGAGEMENT, CUSTOMER_RELATIONSHIP_MANAGEMENT, COMMON_CAPABILITIES
  - Migrated: CHANNEL_EXPERIENCE → CUSTOMER_ENGAGEMENT
  - Migrated: CUSTOMER_COMMUNICATION → CUSTOMER_ENGAGEMENT
  - Final count: 11 values

### Phase 4: Category Enhancement
- **add_ai_ml_services_category**: Added AI_ML_SERVICES to Category enum

### Phase 5: Utilities System
- **add_axon_utility_table**: Added axon_utility table for CoE utilities

### Phase 6: Data Seeding
- **seed_* migrations**: Populated tools and utilities data

---

## ✅ Verification Checklist

- ✅ Prisma schema matches database state
- ✅ BizDomain enum: 11 values (5 core + 5 support + 1 common)
- ✅ RelationType enum: 8 values (ArchiMate 3.x standard)
- ✅ Category enum: 7 values
- ✅ Status enum: 4 values
- ✅ All migrations applied successfully
- ✅ No orphaned enum values
- ✅ All foreign keys with CASCADE delete
- ✅ All indexes created
- ✅ Documentation synchronized

---

## 📝 Documentation Status

| Document | Status | Last Updated |
|----------|--------|--------------|
| DATABASE_INIT.md | ✅ Updated | 2025-11-15 |
| prisma/schema.prisma | ✅ Correct | 2025-11-15 |
| Migration files | ✅ Complete | Various |

---

## 🚀 Key Points

1. **BizDomain Structure**: 3-tier architecture (5 core + 5 support + 1 common)
2. **RelationType Standard**: Follows ArchiMate 3.x specification
3. **Data Migration**: Old domain values automatically migrated to new structure
4. **Backward Compatibility**: All existing data preserved during migrations
5. **Performance**: 14 strategic indexes for query optimization

---

## 📞 Support

For questions about the database schema:
- See `DATABASE_INIT.md` for complete documentation
- Check migration files in `prisma/migrations/` for change history
- Review `prisma/schema.prisma` for current Prisma model definitions

