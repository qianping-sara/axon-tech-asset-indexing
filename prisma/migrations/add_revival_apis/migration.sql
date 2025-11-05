-- CreateTable for Revival APIs Tags
-- This migration adds 7 tags and 3 API assets for the Revival qualification scenario

-- Insert Tags
INSERT INTO "axon_tag" (id, name, description, category, "createdAt", "updatedAt") VALUES
('tag-revival-001', 'revival', 'Policy revival related assets', 'SERVICES_APIS', NOW(), NOW()),
('tag-banking-001', 'banking', 'Banking and payment related assets', 'SERVICES_APIS', NOW(), NOW()),
('tag-qualification-001', 'qualification', 'Qualification and eligibility checks', 'SERVICES_APIS', NOW(), NOW()),
('tag-stp-001', 'stp', 'Straight Through Processing related assets', 'SERVICES_APIS', NOW(), NOW()),
('tag-partial-stp-001', 'partial-stp', 'Partial STP scenario assets', 'SERVICES_APIS', NOW(), NOW()),
('tag-policy-001', 'policy', 'Policy information and management', 'SERVICES_APIS', NOW(), NOW()),
('tag-orchestration-001', 'orchestration', 'API orchestration and coordination', 'SERVICES_APIS', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Insert Assets
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
  'asset-bank-detail-check-001',
  'Bank Detail Check API',
  'Validates banking details and mandate status including CDV and AVSR checks for policy revival qualification in partial STP scenario',
  'SERVICES_APIS',
  'REST APIs',
  '1.0.0',
  'DRAFT',
  'AutomationCoE Team',
  'public/assets/services/rest-apis/bank-detail-check-api.md',
  '',
  'Servicing Layer',
  'https://github.com/example/insurance-api-suite',
  NOW(),
  NOW(),
  NULL
),
(
  'asset-policy-basic-info-001',
  'Policy Basic Info API',
  'Retrieves basic policy information including status, dates, and product details for policy revival qualification checks',
  'SERVICES_APIS',
  'REST APIs',
  '1.0.0',
  'DRAFT',
  'AutomationCoE Team',
  'public/assets/services/rest-apis/policy-basic-info-api.md',
  '',
  'Servicing Layer',
  'https://github.com/example/insurance-api-suite',
  NOW(),
  NOW(),
  NULL
),
(
  'asset-revival-qualification-001',
  'Revival Qualification Summary API',
  'Orchestrates comprehensive partial STP qualification checks for policy revival including cover eligibility, underwriting, and banking verification',
  'SERVICES_APIS',
  'REST APIs',
  '1.0.0',
  'DRAFT',
  'AutomationCoE Team',
  'public/assets/services/rest-apis/revival-qualification-api.md',
  '',
  'Servicing Layer',
  'https://github.com/example/insurance-api-suite',
  NOW(),
  NOW(),
  NULL
)
ON CONFLICT (id) DO NOTHING;

-- Associate Tags with Assets
-- Bank Detail Check API: revival, banking, qualification, stp, partial-stp
INSERT INTO "axon_asset_tag" (id, "assetId", "tagId", "createdAt") VALUES
('asset-tag-001', 'asset-bank-detail-check-001', 'tag-revival-001', NOW()),
('asset-tag-002', 'asset-bank-detail-check-001', 'tag-banking-001', NOW()),
('asset-tag-003', 'asset-bank-detail-check-001', 'tag-qualification-001', NOW()),
('asset-tag-004', 'asset-bank-detail-check-001', 'tag-stp-001', NOW()),
('asset-tag-005', 'asset-bank-detail-check-001', 'tag-partial-stp-001', NOW()),
-- Policy Basic Info API: revival, policy, qualification, stp
('asset-tag-006', 'asset-policy-basic-info-001', 'tag-revival-001', NOW()),
('asset-tag-007', 'asset-policy-basic-info-001', 'tag-policy-001', NOW()),
('asset-tag-008', 'asset-policy-basic-info-001', 'tag-qualification-001', NOW()),
('asset-tag-009', 'asset-policy-basic-info-001', 'tag-stp-001', NOW()),
-- Revival Qualification Summary API: revival, qualification, stp, partial-stp, orchestration
('asset-tag-010', 'asset-revival-qualification-001', 'tag-revival-001', NOW()),
('asset-tag-011', 'asset-revival-qualification-001', 'tag-qualification-001', NOW()),
('asset-tag-012', 'asset-revival-qualification-001', 'tag-stp-001', NOW()),
('asset-tag-013', 'asset-revival-qualification-001', 'tag-partial-stp-001', NOW()),
('asset-tag-014', 'asset-revival-qualification-001', 'tag-orchestration-001', NOW())
ON CONFLICT (id) DO NOTHING;

