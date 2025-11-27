-- Add OM Enterprise Architecture Governance Framework Asset
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
) VALUES (
  'asset_om_ea_governance_framework',
  'OM Enterprise Architecture Governance Framework',
  'The official framework document defining the OMIX Enterprise Architecture (EA) strategy, governance structure, key roles (like the ARC and Chief EA), operating model, and 10 strategic priorities (like the AI Insurer of the Future). It serves as the authoritative source for EA principles and compliance.',
  'ARCHITECTURE_GOVERNANCE',
  'Policies',
  '2025',
  'PUBLISHED',
  'EA Team',
  'public/assets/architecture/policies/om-ea-governance-framework.md',
  'placeholder_hash_om_ea_governance_framework',
  'SharePoint | Enterprise Architecture',
  'https://zaomlac.sharepoint.com/:b:/s/OM-SA-OMiX/Enterprise-Architecture/IQC5jBbEBql_RpQdnBJ8CHkNAc1VI4yXcbE-FggU3lJ0XEc?e=jKvRCn',
  NULL,
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Create tags if they don't exist
INSERT INTO "axon_tag" (id, name, category, "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'Enterprise Architecture', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Governance', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Framework', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Strategy', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'OMIX', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'EA Governance', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Compliance', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Strategic Priorities', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset to tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId")
SELECT gen_random_uuid(), 'asset_om_ea_governance_framework', id
FROM "axon_tag"
WHERE name IN (
  'Enterprise Architecture',
  'Governance',
  'Framework',
  'Strategy',
  'OMIX',
  'EA Governance',
  'Compliance',
  'Strategic Priorities'
)
ON CONFLICT ("assetId", "tagId") DO NOTHING;

