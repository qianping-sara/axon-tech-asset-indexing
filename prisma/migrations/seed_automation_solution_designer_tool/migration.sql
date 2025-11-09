-- Seed Automation Solution Designer tool
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
  'tool-automation-solution-designer-001',
  'Automation Solution Designer',
  'Guide architects, developers, and business analysts through a structured assessment process to design a standardized, architecturally sound, and cost-effective technology stack for automation use cases. Replace experience-based or subjective technology selection with a principled approach.',
  'decision-support',
  'zap',
  '/utilities/automation-solution-designer',
  '1.0.0',
  'PUBLISHED',
  'CoE',
  ARRAY['automation', 'solution-design', 'technology-stack', 'architecture'],
  NOW(),
  NOW(),
  NOW()
);

