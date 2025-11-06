-- Step 1: Create a temporary type with all enum values (old + new)
CREATE TYPE "BizDomain_new" AS ENUM (
  'CLAIM',
  'FINANCIAL_CHANGE',
  'INQUIRY_GENERAL_CHANGES',
  'MONEY_OUT',
  'WEALTH',
  'CHANNEL_EXPERIENCE',
  'CUSTOMER_ENGAGEMENT',
  'CUSTOMER_RELATIONSHIP_MANAGEMENT',
  'PAYMENT_SETTLEMENT',
  'FINANCE_ACCOUNTING',
  'RISK_COMPLIANCE',
  'CUSTOMER_COMMUNICATION',
  'COMMON_CAPABILITIES'
);

-- Step 2: Alter the column to use the new type
ALTER TABLE "axon_asset"
ALTER COLUMN "bizDomain" TYPE "BizDomain_new" USING "bizDomain"::text::"BizDomain_new";

-- Step 3: Drop the old type
DROP TYPE "BizDomain";

-- Step 4: Rename the new type to the original name
ALTER TYPE "BizDomain_new" RENAME TO "BizDomain";

-- Step 5: Migrate data from old domain values to new ones
-- CHANNEL_EXPERIENCE → CUSTOMER_ENGAGEMENT
UPDATE "axon_asset"
SET "bizDomain" = 'CUSTOMER_ENGAGEMENT'
WHERE "bizDomain" = 'CHANNEL_EXPERIENCE';

-- CUSTOMER_COMMUNICATION → CUSTOMER_ENGAGEMENT
UPDATE "axon_asset"
SET "bizDomain" = 'CUSTOMER_ENGAGEMENT'
WHERE "bizDomain" = 'CUSTOMER_COMMUNICATION';

