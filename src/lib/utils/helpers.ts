import crypto from 'crypto';

/**
 * Calculate SHA256 hash of content
 */
export function calculateHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date with time
 */
export function formatDateTime(date: Date): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Slugify string for URLs
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Get category label
 */
export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    CODE_COMPONENTS: 'Code & Components',
    SERVICES_APIS: 'Services & APIs',
    AUTOMATION_WORKFLOWS: 'Automation & Workflows',
    DATA_ANALYTICS: 'Data & Analytics',
    ARCHITECTURE_GOVERNANCE: 'Architecture & Governance',
    KNOWLEDGE_PRACTICES: 'Knowledge & Practices',
  };
  return labels[category] || category;
}

/**
 * Get status label
 */
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    DRAFT: 'Draft',
    PUBLISHED: 'Published',
    DEPRECATED: 'Deprecated',
    ARCHIVED: 'Archived',
  };
  return labels[status] || status;
}

/**
 * Get status color
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    DRAFT: 'bg-gray-100 text-gray-800',
    PUBLISHED: 'bg-green-100 text-green-800',
    DEPRECATED: 'bg-yellow-100 text-yellow-800',
    ARCHIVED: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

