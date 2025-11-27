-- Add Old Mutual Business Architecture Practice Asset
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
  'asset_old_mutual_business_architecture_practice',
  'Old Mutual Business Architecture Practice',
  'A comprehensive resource detailing the Old Mutual Business Architecture Practice, including its purpose, the 15 core guiding principles (EAB-P01 to EAB-P15), methodology, key deliverables (Playbook, Handbook), governance model (CoE, CoP), and collaboration tools.',
  'KNOWLEDGE_PRACTICES',
  'Best Practices',
  '1.0',
  'PUBLISHED',
  'EA Team',
  'public/assets/knowledge/best-practices/old-mutual-business-architecture-practice.md',
  'placeholder_hash_old_mutual_business_architecture_practice',
  'SharePoint | Enterprise Architecture',
  'https://zaomlac.sharepoint.com/sites/OM-SA-OMiX/Enterprise-Architecture/SitePages/Old-Mutual-Business-Architecture-Practice.aspx?web=1&EntityRepresentationId=d3fc5ba8-cbc1-4af7-b372-67e26b8bb0c4&Mode=Edit',
  NULL,
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Create tags if they don't exist
INSERT INTO "axon_tag" (id, name, category, "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'Enterprise Architecture', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Business Architecture', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Governance', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Principles', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Methodology', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'OMIX', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset to tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId")
SELECT gen_random_uuid(), 'asset_old_mutual_business_architecture_practice', id
FROM "axon_tag"
WHERE name IN (
  'Enterprise Architecture',
  'Business Architecture',
  'Governance',
  'Principles',
  'Methodology',
  'OMIX'
)
ON CONFLICT ("assetId", "tagId") DO NOTHING;

