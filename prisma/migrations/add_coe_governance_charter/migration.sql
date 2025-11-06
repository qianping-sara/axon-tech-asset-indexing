-- Add CoE Governance Charter Asset
-- This migration adds the CoE Governance Charter policy asset to the ARCHITECTURE_GOVERNANCE category

-- Insert CoE Governance Charter Asset
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
  'asset-coe-governance-charter-001',
  'CoE Governance Charter',
  'Comprehensive governance framework defining the Automation CoE''s vision, operating model, domain-driven approach, and adoption strategy',
  'ARCHITECTURE_GOVERNANCE',
  'Policies',
  '1.0.0',
  'DRAFT',
  'AutomationCoE',
  'public/assets/architecture/policies/coe-governance-charter.md',
  'e39e83ba2b1a6c2ebaaffbc1357c84da61a6a2c208efcee770fadbc7b9341063',
  'Internal',
  'https://internal.company.com/coe-governance',
  NOW(),
  NOW(),
  NULL
)
ON CONFLICT (id) DO NOTHING;

