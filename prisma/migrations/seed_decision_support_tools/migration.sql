-- Seed initial Decision Support tool
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
  'tool-business-case-001',
  'Business Case and Strategic Alignment',
  'Validating the legitimacy of the business need and its alignment with corporate strategy',
  'decision-support',
  'briefcase',
  '/utilities/business-case',
  '1.0.0',
  'PUBLISHED',
  'AutomationCoE Team',
  ARRAY['decision-support', 'business-case', 'strategy'],
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT ("id") DO NOTHING;

