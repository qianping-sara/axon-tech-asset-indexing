-- Add IT Governance, Risk, and Compliance (GRC) Overview Asset
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
  'asset_it_grc_overview',
  'IT Governance, Risk, and Compliance (GRC) Overview',
  'A high-level document summarizing the IT Governance, Risk Management, and Compliance framework, strategy, and key focus areas for the year 2024.',
  'ARCHITECTURE_GOVERNANCE',
  'Policies',
  '2024 Annual Version',
  'PUBLISHED',
  'EA Team',
  'public/assets/architecture/policies/it-grc-overview.md',
  'placeholder_hash_it_grc_overview',
  'SharePoint | Enterprise Architecture',
  'https://zaomlac.sharepoint.com/:b:/r/sites/OM-SA-OMiX/Enterprise-Architecture/Shared%20Documents/Architecture%20Practice%20Playbook/IT%20Authorities/IT%20Governance,%20Risk%20and%20Compliance/IT%20GRC%20Overview%202024.pdf?csf=1&web=1&e=gyJHD2',
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
  (gen_random_uuid(), 'Risk Management', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Compliance', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'GRC', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'IT Authorities', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Strategy', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset to tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId")
SELECT gen_random_uuid(), 'asset_it_grc_overview', id
FROM "axon_tag"
WHERE name IN (
  'Enterprise Architecture',
  'Governance',
  'Risk Management',
  'Compliance',
  'GRC',
  'IT Authorities',
  'Strategy'
)
ON CONFLICT ("assetId", "tagId") DO NOTHING;

