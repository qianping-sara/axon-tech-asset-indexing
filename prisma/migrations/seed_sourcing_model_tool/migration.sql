-- Seed Sourcing Model Analysis tool
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
  'tool-sourcing-model-001',
  'Sourcing Model Analysis',
  'Making a strategic decision on the sourcing model: Build, Buy, or Open Source',
  'decision-support',
  'bar-chart-3',
  '/utilities/sourcing-model',
  '1.0.0',
  'PUBLISHED',
  'AutomationCoE Team',
  ARRAY['decision-support', 'sourcing-model', 'build-buy-oss'],
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT ("id") DO NOTHING;

