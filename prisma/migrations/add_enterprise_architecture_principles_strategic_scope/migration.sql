-- Add Enterprise Architecture Principles - Strategic Scope Asset
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
  'asset_ea_principles_strategic_scope',
  'Enterprise Architecture Principles - Strategic Scope',
  'A document outlining the core enterprise architecture principles and strategic scope that guide architectural decisions and initiatives across the organization.',
  'ARCHITECTURE_GOVERNANCE',
  'Principles',
  'V1',
  'PUBLISHED',
  'EA Team',
  'public/assets/architecture/principles/enterprise-architecture-principles-strategic-scope.md',
  'placeholder_hash_ea_principles_scope',
  'Confluence',
  'https://oldmutual.atlassian.net/wiki/spaces/EA/pages/1637941569/Enterprise+Architecture+Principles+-+Strategic+Scope',
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
  (gen_random_uuid(), 'Principles', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Strategy', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Scope', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'OMIX', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset to tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId")
SELECT gen_random_uuid(), 'asset_ea_principles_strategic_scope', id
FROM "axon_tag"
WHERE name IN (
  'Enterprise Architecture',
  'Governance',
  'Principles',
  'Strategy',
  'Scope',
  'OMIX'
)
ON CONFLICT ("assetId", "tagId") DO NOTHING;

