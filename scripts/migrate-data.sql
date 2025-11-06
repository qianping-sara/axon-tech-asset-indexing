-- Data migration script for bizDomain values
-- Maps old domain names to new ones

-- 1. Migrate CHANNEL_EXPERIENCE → CUSTOMER_ENGAGEMENT
UPDATE "axon_asset" 
SET "bizDomain" = 'CUSTOMER_ENGAGEMENT'::text::"BizDomain"
WHERE "bizDomain" = 'CHANNEL_EXPERIENCE';

-- 2. Migrate CUSTOMER_COMMUNICATION → CUSTOMER_ENGAGEMENT
UPDATE "axon_asset" 
SET "bizDomain" = 'CUSTOMER_ENGAGEMENT'::text::"BizDomain"
WHERE "bizDomain" = 'CUSTOMER_COMMUNICATION';

-- 3. Migrate CUSTOMER_MANAGEMENT → CUSTOMER_RELATIONSHIP_MANAGEMENT
UPDATE "axon_asset" 
SET "bizDomain" = 'CUSTOMER_RELATIONSHIP_MANAGEMENT'::text::"BizDomain"
WHERE "bizDomain" = 'CUSTOMER_MANAGEMENT';

-- Verify the migration
SELECT "bizDomain", COUNT(*) as count 
FROM "axon_asset" 
WHERE "bizDomain" IS NOT NULL 
GROUP BY "bizDomain" 
ORDER BY "bizDomain";

