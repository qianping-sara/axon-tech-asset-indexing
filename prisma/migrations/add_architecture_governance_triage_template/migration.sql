-- Add Architecture Governance Triage Assessment Template Asset
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
  'asset_architecture_governance_triage_template',
  'Architecture Governance Triage Assessment Template',
  'A reusable template for conducting triage assessments and capturing results for architecture governance reviews, including definitions of key terms used in the assessment process.',
  'ARCHITECTURE_GOVERNANCE',
  'Checklists',
  'v03',
  'PUBLISHED',
  'EA Team',
  'public/assets/architecture/checklists/architecture-governance-triage-template.md',
  'placeholder_hash_architecture_governance_triage_template',
  'SharePoint | Enterprise Architecture',
  'https://zaomlac.sharepoint.com/:x:/r/sites/OM-SA-OMiX/Enterprise-Architecture/Shared%20Documents/Architecture%20Practice%20Playbook/Architecture%20Governance%20Triage/Architecture%20Governance%20Triage%20Assessment%20Template%20v03.xlsx?d=w8384608ab4ca46c6b17a24fb8711e6b6&csf=1&web=1&e=V2N1ra',
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
  (gen_random_uuid(), 'Assessment', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Template', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Triage', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'OMIX', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Architecture Review', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset to tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId")
SELECT gen_random_uuid(), 'asset_architecture_governance_triage_template', id
FROM "axon_tag"
WHERE name IN (
  'Enterprise Architecture',
  'Governance',
  'Assessment',
  'Template',
  'Triage',
  'OMIX',
  'Architecture Review'
)
ON CONFLICT ("assetId", "tagId") DO NOTHING;

