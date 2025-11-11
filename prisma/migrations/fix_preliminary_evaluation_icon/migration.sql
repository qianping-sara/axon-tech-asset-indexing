-- Fix Preliminary Evaluation icon from 'zap' to 'filter'
UPDATE "axon_utility"
SET "icon" = 'filter'
WHERE "id" = 'tool-preliminary-evaluation-001' AND "name" = 'Preliminary Evaluation and Shortlisting';

