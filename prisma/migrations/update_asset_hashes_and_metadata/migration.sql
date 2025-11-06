-- Update CoE Governance Charter metadata
-- Update sourceSystem and sourceLink to point to Axon platform

UPDATE "axon_asset"
SET
  "sourceSystem" = 'Axon',
  "sourceLink" = 'https://axon-tech-asset-indexing.vercel.app/assets/asset-coe-governance-charter-001',
  "updatedAt" = NOW()
WHERE id = 'asset-coe-governance-charter-001';

