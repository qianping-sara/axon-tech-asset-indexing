-- Seed Preliminary Evaluation and Shortlisting tool
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
  'tool-preliminary-evaluation-001',
  'Preliminary Evaluation and Shortlisting',
  'Conducting preliminary evaluation of potential solutions and creating a shortlist of viable candidates',
  'decision-support',
  'filter',
  '/utilities/preliminary-evaluation',
  '1.0.0',
  'PUBLISHED',
  'AutomationCoE Team',
  ARRAY['decision-support', 'evaluation', 'shortlisting'],
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT ("id") DO NOTHING;

