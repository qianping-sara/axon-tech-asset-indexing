// Asset Categories
export const ASSET_CATEGORIES = [
  'CODE_COMPONENTS',
  'SERVICES_APIS',
  'AUTOMATION_WORKFLOWS',
  'DATA_ANALYTICS',
  'ARCHITECTURE_GOVERNANCE',
  'KNOWLEDGE_PRACTICES',
] as const;

// Asset Types by Category
export const ASSET_TYPES: Record<string, string[]> = {
  CODE_COMPONENTS: [
    'Script',
    'Frontend Component',
    'Backend Library',
    'Development Framework',
    'Open Source Project',
  ],
  SERVICES_APIS: [
    'REST API',
    'GraphQL API',
    'Microservice',
    'Integration Service',
    'AI/ML Service',
  ],
  AUTOMATION_WORKFLOWS: [
    'RPA Bot',
    'No-Code Workflow',
    'Business Process',
    'Scheduled Job',
  ],
  DATA_ANALYTICS: [
    'Data Product',
    'Data Schema',
    'Dataset',
    'Data Pipeline',
    'Data Dictionary',
  ],
  ARCHITECTURE_GOVERNANCE: [
    'Reference Architecture',
    'Solution Pattern',
    'Technology Stack',
    'Standard',
    'Principle',
    'Checklist',
    'Policy',
    'Decision Record',
  ],
  KNOWLEDGE_PRACTICES: [
    'SOP',
    'Playbook',
    'Best Practice',
    'Tutorial',
    'Quick Start Guide',
  ],
};

// Asset Status
export const ASSET_STATUS = ['DRAFT', 'PUBLISHED', 'DEPRECATED', 'ARCHIVED'] as const;

// Relation Types
export const RELATION_TYPES = [
  'USES',
  'IMPLEMENTS',
  'EXTENDS',
  'RELATED_TO',
  'DEPENDS_ON',
  'SUPERSEDES',
] as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Search
export const MIN_SEARCH_LENGTH = 2;
export const MAX_SEARCH_LENGTH = 100;

// File paths
export const ASSETS_DIR = 'assets';
export const MARKDOWN_EXT = '.md';

// API
export const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const API_TIMEOUT = 30000; // 30 seconds

// Tag categories
export const TAG_CATEGORIES = ['domain', 'technology', 'team', 'other'] as const;

