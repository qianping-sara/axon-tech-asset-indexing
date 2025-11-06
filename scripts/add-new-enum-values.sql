-- Add new enum values to BizDomain type
-- This script adds the new domain values before data migration

-- Add CUSTOMER_ENGAGEMENT
ALTER TYPE "BizDomain" ADD VALUE 'CUSTOMER_ENGAGEMENT' BEFORE 'CHANNEL_EXPERIENCE';

-- Add CUSTOMER_RELATIONSHIP_MANAGEMENT  
ALTER TYPE "BizDomain" ADD VALUE 'CUSTOMER_RELATIONSHIP_MANAGEMENT' BEFORE 'CHANNEL_EXPERIENCE';

-- Note: COMMON_CAPABILITIES was already added in the schema update

