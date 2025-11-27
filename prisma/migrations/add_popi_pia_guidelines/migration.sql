-- Add Protection of Personal Information (POPI) Privacy Impact Assessment (PIA) Guidelines Asset
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
  'asset_popi_pia_guidelines',
  'Protection of Personal Information (POPI) Privacy Impact Assessment (PIA) Guidelines',
  'Official guidelines and procedures for conducting Privacy Impact Assessments (PIA) to ensure compliance with the Protection of Personal Information (POPI) Act for all initiatives at Old Mutual.',
  'ARCHITECTURE_GOVERNANCE',
  'Policies',
  'ver02.00',
  'PUBLISHED',
  'EA Team',
  'public/assets/architecture/policies/popi-pia-guidelines.md',
  'placeholder_hash_popi_pia_guidelines',
  'SharePoint | Enterprise Architecture',
  'https://zaomlac.sharepoint.com/:b:/r/sites/OM-SA-OMiX/Enterprise-Architecture/Shared%20Documents/Architecture%20Practice%20Playbook/IT%20Authorities/Personal%20Information%20(aka%20Data%20Privacy)/Old%20Mutual%20Protection%20of%20Personal%20Information%20Privacy%20Impact%20Assessment%20Guidelines_ver02.00_FINAL%20(2017).pdf?csf=1&web=1&e=pgJeAz',
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
  (gen_random_uuid(), 'Privacy', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Compliance', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'POPI', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'IT Authorities', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Data Protection', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset to tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId")
SELECT gen_random_uuid(), 'asset_popi_pia_guidelines', id
FROM "axon_tag"
WHERE name IN (
  'Enterprise Architecture',
  'Governance',
  'Privacy',
  'Compliance',
  'POPI',
  'IT Authorities',
  'Data Protection'
)
ON CONFLICT ("assetId", "tagId") DO NOTHING;

