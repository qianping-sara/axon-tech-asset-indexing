-- Add OML Security Approval Process Asset
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
  'asset_oml_security_approval_process',
  'OML Security Approval Process',
  'A documented process outlining the steps and requirements for obtaining security approval for systems, applications, or changes within Old Mutual (OML).',
  'ARCHITECTURE_GOVERNANCE',
  'Policies',
  'v0.2',
  'DRAFT',
  'EA Team',
  'public/assets/architecture/policies/oml-security-approval-process.md',
  'placeholder_hash_oml_security_approval_process',
  'SharePoint | Enterprise Architecture',
  'https://zaomlac.sharepoint.com/:b:/r/sites/OM-SA-OMiX/Enterprise-Architecture/Shared%20Documents/Architecture%20Practice%20Playbook/IT%20Authorities/Security/OML%20Security%20Approval%20Process%20v0.2.pdf?csf=1&web=1&e=05Ckfb',
  NULL,
  NOW(),
  NOW(),
  NULL
) ON CONFLICT (id) DO NOTHING;

-- Create tags if they don't exist
INSERT INTO "axon_tag" (id, name, category, "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'Enterprise Architecture', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Security', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Governance', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'IT Authorities', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Process', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Approval', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'OMIX', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset to tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId")
SELECT gen_random_uuid(), 'asset_oml_security_approval_process', id
FROM "axon_tag"
WHERE name IN (
  'Enterprise Architecture',
  'Security',
  'Governance',
  'IT Authorities',
  'Process',
  'Approval',
  'OMIX'
)
ON CONFLICT ("assetId", "tagId") DO NOTHING;

