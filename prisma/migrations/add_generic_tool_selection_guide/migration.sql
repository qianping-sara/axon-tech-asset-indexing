-- Add Generic Tool Selection Guide Asset
-- This migration adds the Generic Tool Selection Guide best practice asset to the KNOWLEDGE_PRACTICES category

-- Insert Generic Tool Selection Guide Asset
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
  "createdAt",
  "updatedAt",
  "publishedAt"
) VALUES
(
  'asset-generic-tool-selection-guide-001',
  'Generic Tool Selection Guide',
  'A comprehensive six-stage, funnel-based evaluation process for conducting strategic tool and technology selection with progressive filtering and rigorous decision-making',
  'KNOWLEDGE_PRACTICES',
  'Best Practices',
  '1.0.0',
  'DRAFT',
  'AutomationCoE Team',
  'public/assets/knowledge/practices/generic-tool-selection-guide.md',
  '2399ad476c1f4580ea76ec52d4ec56cbdabb1e0e898b6642c8f1fca9aa0e11b0',
  'Axon',
  'https://axon-tech-asset-indexing.vercel.app/assets/asset-generic-tool-selection-guide-001',
  NOW(),
  NOW(),
  NULL
)
ON CONFLICT (id) DO NOTHING;

