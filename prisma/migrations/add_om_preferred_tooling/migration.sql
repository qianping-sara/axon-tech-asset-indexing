-- Add OM Preferred Tooling Asset
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
  'asset_om_preferred_tooling',
  'OM Preferred Tooling',
  'A comprehensive guide documenting the preferred technology tools, platforms, and tooling standards recommended for use across Old Mutual''s enterprise architecture and technology initiatives.',
  'ARCHITECTURE_GOVERNANCE',
  'Technology Stacks',
  'V1',
  'PUBLISHED',
  'EA Team',
  'public/assets/architecture/technology-stacks/om-preferred-tooling.md',
  'placeholder_hash_om_preferred_tooling',
  'Confluence',
  'https://oldmutual.atlassian.net/wiki/spaces/OE/pages/975536241/Preferred+Tooling+at+OM',
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
  (gen_random_uuid(), 'Technology', 'domain', NOW(), NOW()),
  (gen_random_uuid(), 'Tooling', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'Standards', 'general', NOW(), NOW()),
  (gen_random_uuid(), 'OMIX', 'general', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Link asset to tags
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId")
SELECT gen_random_uuid(), 'asset_om_preferred_tooling', id
FROM "axon_tag"
WHERE name IN (
  'Enterprise Architecture',
  'Governance',
  'Technology',
  'Tooling',
  'Standards',
  'OMIX'
)
ON CONFLICT ("assetId", "tagId") DO NOTHING;

