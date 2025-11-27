-- Add Technology Resilience Onboarding Pack Asset
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
  'asset_technology_resilience_onboarding_pack',
  'Technology Resilience Onboarding Pack',
  'A starter pack & guide to introduce concepts, standards, and procedures necessary for ensuring technology resilience within the organization.',
  'KNOWLEDGE_PRACTICES',
  'Playbooks',
  'v3',
  'PUBLISHED',
  'EA Team',
  'public/assets/knowledge/playbooks/technology-resilience-onboarding-pack.md',
  'placeholder_hash_technology_resilience_onboarding_pack',
  'SharePoint | Enterprise Architecture',
  'https://zaomlac.sharepoint.com/:b:/r/sites/OM-SA-OMiX/Enterprise-Architecture/Shared%20Documents/Architecture%20Practice%20Playbook/IT%20Authorities/Technology%20Resilience%20(D100R,%20DR%20and%20OR)/Technology%20Resilience%20-%20%20Onboarding%20Pack%203.pdf?csf=1&web=1&e=67U9MW',
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
  (gen_random_uuid(), 'Technology Resilience', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Onboarding', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Standards', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'IT Authorities', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Disaster Recovery', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset to tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId")
SELECT gen_random_uuid(), 'asset_technology_resilience_onboarding_pack', id
FROM "axon_tag"
WHERE name IN (
  'Enterprise Architecture',
  'Governance',
  'Technology Resilience',
  'Onboarding',
  'Standards',
  'IT Authorities',
  'Disaster Recovery'
)
ON CONFLICT ("assetId", "tagId") DO NOTHING;

