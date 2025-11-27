-- Add Triage - Technology Architecture Change Assessment Asset
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
  'asset_triage_technology_architecture_assessment',
  'Triage - Technology Architecture Change Assessment',
  'A formal assessment document for evaluating proposed changes to the Technology Architecture domain, ensuring alignment with standards, identifying risks, and guiding governance decisions',
  'ARCHITECTURE_GOVERNANCE',
  'Checklists',
  'V1.0',
  'PUBLISHED',
  'EA Team',
  'public/assets/architecture/checklists/triage-technology-architecture-assessment.md',
  'placeholder_hash_triage_technology_architecture_assessment',
  'SharePoint | Enterprise Architecture',
  'https://zaomlac.sharepoint.com/:b:/r/sites/OM-SA-OMiX/Enterprise-Architecture/Shared%20Documents/Architecture%20Practice%20Playbook/Architecture%20Governance%20Triage/Triage%20-%20Technology%20Architecture%20Change%20assessment%20V1.0_Final.pdf?csf=1&web=1&e=vEuUgJ',
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
  (gen_random_uuid(), 'Technology Architecture', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Assessment', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Change Management', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'OMIX', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Risk Assessment', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset to tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId")
SELECT gen_random_uuid(), 'asset_triage_technology_architecture_assessment', id
FROM "axon_tag"
WHERE name IN (
  'Enterprise Architecture',
  'Governance',
  'Technology Architecture',
  'Assessment',
  'Change Management',
  'OMIX',
  'Risk Assessment'
)
ON CONFLICT ("assetId", "tagId") DO NOTHING;

