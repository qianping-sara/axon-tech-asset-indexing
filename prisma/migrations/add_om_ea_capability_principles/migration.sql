-- Add Old Mutual EA Capability Development: Architecture Principles Asset
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
  'asset_om_ea_capability_principles',
  'Old Mutual EA Capability Development: Architecture Principles',
  'Old Mutual Enterprise Architecture Capability Development: Architecture Principles. Defines the core values and guidelines to govern decisions across Business, Information, Data, Application, Technology, Integration, and Security architectures, ensuring alignment with strategic goals',
  'ARCHITECTURE_GOVERNANCE',
  'Principles',
  '7Mar25',
  'PUBLISHED',
  'EA Team',
  'public/assets/architecture/principles/om-ea-capability-principles.md',
  'placeholder_hash_om_ea_capability_principles',
  'SharePoint | Enterprise Architecture',
  'https://zaomlac.sharepoint.com/:b:/s/OM-SA-OMiX/Enterprise-Architecture/IQAOI_C15Zg2SpSCAa7v-Y_BAcBEsGadSh4vyaRAqYtA-ns?e=aDsiUy',
  NULL,
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Create tags if they don't exist
INSERT INTO "axon_tag" (id, name, category, "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'Enterprise Architecture', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Architecture Principles', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Governance', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Framework', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'OMIX', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Strategy', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Capability Development', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset to tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId")
SELECT gen_random_uuid(), 'asset_om_ea_capability_principles', id
FROM "axon_tag"
WHERE name IN (
  'Enterprise Architecture',
  'Architecture Principles',
  'Governance',
  'Framework',
  'OMIX',
  'Strategy',
  'Capability Development'
)
ON CONFLICT ("assetId", "tagId") DO NOTHING;

