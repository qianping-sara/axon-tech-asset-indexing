-- Add Contract Process Flow Asset
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
  'asset_contract_process_flow',
  'Contract Process Flow',
  'Documentation detailing the end-to-end process and workflow for managing contracts within the organization, likely showing steps from initiation through approval and execution.',
  'ARCHITECTURE_GOVERNANCE',
  'Policies',
  'v1',
  'PUBLISHED',
  'EA Team',
  'public/assets/architecture/policies/contract-process-flow.md',
  'placeholder_hash_contract_process_flow',
  'SharePoint | Enterprise Architecture',
  'https://zaomlac.sharepoint.com/:b:/r/sites/OM-SA-OMiX/Enterprise-Architecture/Shared%20Documents/Architecture%20Practice%20Playbook/IT%20Authorities/Contracts%20and%20Sourcing/Contract%20Process%20Flow.pdf?csf=1&web=1&e=FDKbzF',
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
  (gen_random_uuid(), 'Process', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Contracts', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Workflow', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'IT Authorities', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Sourcing', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset to tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId")
SELECT gen_random_uuid(), 'asset_contract_process_flow', id
FROM "axon_tag"
WHERE name IN (
  'Enterprise Architecture',
  'Governance',
  'Process',
  'Contracts',
  'Workflow',
  'IT Authorities',
  'Sourcing'
)
ON CONFLICT ("assetId", "tagId") DO NOTHING;

