-- Update assetType from 'Checklists' to 'Standards'
UPDATE "axon_asset"
SET "assetType" = 'Standards'
WHERE "assetType" = 'Checklists';

