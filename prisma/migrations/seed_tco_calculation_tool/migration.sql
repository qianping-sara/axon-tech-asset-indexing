-- Seed TCO Calculation tool
INSERT INTO "axon_utility" (
  "id",
  "name",
  "description",
  "category",
  "icon",
  "url",
  "version",
  "status",
  "owner",
  "tags",
  "createdAt",
  "updatedAt",
  "publishedAt"
) VALUES (
  'tool-tco-calculation-001',
  'TCO Calculation',
  'Calculate and compare the Total Cost of Ownership for different solutions over a 5-year period',
  'decision-support',
  'calculator',
  '/utilities/tco-calculation',
  '1.0.0',
  'PUBLISHED',
  'AutomationCoE Team',
  ARRAY['decision-support', 'tco', 'financial-analysis', 'cost-comparison'],
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT ("id") DO NOTHING;

