-- Update CoE Governance Charter content hash
-- Fix image paths from relative to absolute paths

UPDATE "axon_asset"
SET 
  "contentHash" = 'e39e83ba2b1a6c2ebaaffbc1357c84da61a6a2c208efcee770fadbc7b9341063',
  "updatedAt" = NOW()
WHERE id = 'asset-coe-governance-charter-001';

