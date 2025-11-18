-- Fix STP Automation Pattern sourceLink and sourceSystem
-- Update the sourceLink to point to the detail page instead of GitHub
-- Update the sourceSystem from GitHub to Internal

UPDATE "axon_asset"
SET
  "sourceSystem" = 'Internal',
  "sourceLink" = 'https://axon-tech-asset-indexing.vercel.app/assets/arch_stp_automation_pattern',
  "updatedAt" = NOW()
WHERE id = 'arch_stp_automation_pattern';

