-- Add IT Architecture Artefacts Asset
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
  'asset_it_architecture_artefacts',
  'IT Architecture Artefacts',
  'A comprehensive catalogue or repository listing and defining the mandatory and optional architectural artefacts, deliverables, and views produced by the Enterprise Architecture function (e.g., Application Maps, Decision Records, Patterns, Standards).',
  'ARCHITECTURE_GOVERNANCE',
  'Checklists',
  'v1',
  'PUBLISHED',
  'EA Team',
  'public/assets/architecture/checklists/it-architecture-artefacts.md',
  'placeholder_hash_it_architecture_artefacts',
  'SharePoint | Enterprise Architecture',
  'https://zaomlac.sharepoint.com/sites/OM-SA-OMiX/Enterprise-Architecture/SitePages/IT-Architect.aspx',
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
  (gen_random_uuid(), 'Architecture Artefacts', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Catalogue', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Deliverables', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Reference', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'OMIX', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset to tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId")
SELECT gen_random_uuid(), 'asset_it_architecture_artefacts', id
FROM "axon_tag"
WHERE name IN (
  'Enterprise Architecture',
  'Governance',
  'Architecture Artefacts',
  'Catalogue',
  'Deliverables',
  'Reference',
  'OMIX'
)
ON CONFLICT ("assetId", "tagId") DO NOTHING;

