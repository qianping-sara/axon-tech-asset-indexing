-- Step 1: Migrate data from old domain values to new ones
-- (New enum values CUSTOMER_ENGAGEMENT and CUSTOMER_RELATIONSHIP_MANAGEMENT were already added)
-- CHANNEL_EXPERIENCE → CUSTOMER_ENGAGEMENT
UPDATE "axon_asset" 
SET "bizDomain" = 'CUSTOMER_ENGAGEMENT'
WHERE "bizDomain" = 'CHANNEL_EXPERIENCE';

-- CUSTOMER_COMMUNICATION → CUSTOMER_ENGAGEMENT
UPDATE "axon_asset"
SET "bizDomain" = 'CUSTOMER_ENGAGEMENT'
WHERE "bizDomain" = 'CUSTOMER_COMMUNICATION';

-- Step 2: Drop old enum values (they are no longer used)
-- Note: In PostgreSQL, we need to create a new type and migrate
-- First, create a temporary type with the new values
CREATE TYPE "BizDomain_new" AS ENUM (
  'CLAIM',
  'FINANCIAL_CHANGE',
  'INQUIRY_GENERAL_CHANGES',
  'MONEY_OUT',
  'WEALTH',
  'CUSTOMER_ENGAGEMENT',
  'CUSTOMER_RELATIONSHIP_MANAGEMENT',
  'PAYMENT_SETTLEMENT',
  'FINANCE_ACCOUNTING',
  'RISK_COMPLIANCE',
  'COMMON_CAPABILITIES'
);

-- Alter the column to use the new type
ALTER TABLE "axon_asset" 
ALTER COLUMN "bizDomain" TYPE "BizDomain_new" USING "bizDomain"::text::"BizDomain_new";

-- Drop the old type
DROP TYPE "BizDomain";

-- Rename the new type to the original name
ALTER TYPE "BizDomain_new" RENAME TO "BizDomain";

