-- Fix Preliminary Evaluation icon from 'zap' to 'filter'
-- This migration updates the icon for the Preliminary Evaluation tool
-- It only updates if the record exists and currently has 'zap' as the icon
UPDATE "axon_utility"
SET "icon" = 'filter', "updatedAt" = NOW()
WHERE "id" = 'tool-preliminary-evaluation-001'
  AND "icon" = 'zap';

