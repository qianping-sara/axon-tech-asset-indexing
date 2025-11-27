-- Add IT and IS Risk Policy Framework Asset
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
  'asset_it_is_risk_policy_framework',
  'IT and IS Risk Policy Framework',
  'A comprehensive framework documenting IT and Information Security risk policies, standards, and guidelines covering areas such as IT continuity, access management, data security, endpoint protection, asset management, security operations, incident management, and vulnerability management.',
  'ARCHITECTURE_GOVERNANCE',
  'Standards',
  'V1',
  'PUBLISHED',
  'EA Team',
  'public/assets/architecture/standards/it-is-risk-policy-framework.md',
  'placeholder_hash_it_is_risk_policy_framework',
  'SharePoint | Risk and Information Security',
  'https://zaomlac.sharepoint.com/:u:/r/sites/OM-SA-OMiX/Risk-and-Information-Security/SitePages/Policy,-Process-and-Standards.aspx?csf=1&web=1&e=5KscO8',
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
  (gen_random_uuid(), 'Security', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Standards', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'IT Authorities', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'OMIX', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset to tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId")
SELECT gen_random_uuid(), 'asset_it_is_risk_policy_framework', id
FROM "axon_tag"
WHERE name IN (
  'Enterprise Architecture',
  'Governance',
  'Risk Management',
  'Security',
  'Standards',
  'IT Authorities',
  'OMIX'
)
ON CONFLICT ("assetId", "tagId") DO NOTHING;

