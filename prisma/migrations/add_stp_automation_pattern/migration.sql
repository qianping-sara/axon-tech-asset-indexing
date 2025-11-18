-- Add STP Automation Pattern Asset
-- This migration adds the Straight-Through Processing (STP) Automation Pattern solution design asset

-- Insert STP Automation Pattern Asset
INSERT INTO "axon_asset" (
  id,
  name,
  description,
  category,
  "assetType",
  version,
  status,
  owner,
  "contentPath",
  "contentHash",
  "sourceSystem",
  "sourceLink",
  "bizDomain",
  "createdAt",
  "updatedAt",
  "publishedAt"
) VALUES
(
  'arch_stp_automation_pattern',
  'Straight-Through Processing (STP) Automation Pattern',
  'Architecture pattern for automating insurance claims and revivals processing with STP-first approach, microservices, and orchestration',
  'ARCHITECTURE_GOVERNANCE',
  'Solution Patterns',
  '1.0.0',
  'PUBLISHED',
  'Architecture Team',
  'public/assets/architecture/patterns/stp-automation-pattern.md',
  '3de76c0d17cd6ae00f7089975fb9b06ea54a70ffdd8699cf2c4fbed2a1e1d977',
  'GitHub',
  'https://github.com/qianping-sara/axon-tech-asset-indexing',
  'CLAIM',
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Create tags if they don't exist
INSERT INTO "axon_tag" (id, name, category, "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'Architecture', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Automation', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Claims', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'STP', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Orchestration', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset with tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId", "createdAt")
SELECT
  gen_random_uuid(),
  'arch_stp_automation_pattern',
  t.id,
  NOW()
FROM "axon_tag" t
WHERE t.name IN ('Architecture', 'Automation', 'Claims', 'STP', 'Orchestration')
ON CONFLICT ("assetId", "tagId") DO NOTHING;

