-- Fix OM Enterprise Architecture Governance Framework assetType from 'Policy' to 'Policies'
UPDATE "axon_asset"
SET "assetType" = 'Policies'
WHERE id = 'asset_om_ea_governance_framework' AND "assetType" = 'Policy';

