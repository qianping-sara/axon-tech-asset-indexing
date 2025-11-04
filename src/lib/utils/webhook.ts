/**
 * GitHub Webhook utilities
 */

import { createHmac } from 'crypto';

/**
 * Verify GitHub webhook signature
 * GitHub sends X-Hub-Signature-256 header with HMAC-SHA256 signature
 */
export function verifyGitHubWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    // GitHub signature format: sha256=<hex_digest>
    if (!signature.startsWith('sha256=')) {
      return false;
    }

    const expectedSignature = signature.slice(7); // Remove 'sha256=' prefix
    const hmac = createHmac('sha256', secret);
    hmac.update(payload);
    const calculatedSignature = hmac.digest('hex');

    // Use timing-safe comparison to prevent timing attacks
    return timingSafeEqual(calculatedSignature, expectedSignature);
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

/**
 * Timing-safe string comparison
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Parse GitHub webhook payload
 */
export interface GitHubWebhookPayload {
  action?: string;
  ref?: string;
  repository?: {
    name: string;
    full_name: string;
    owner: {
      login: string;
    };
  };
  pusher?: {
    name: string;
    email: string;
  };
  commits?: Array<{
    id: string;
    message: string;
    author: {
      name: string;
      email: string;
    };
    added: string[];
    modified: string[];
    removed: string[];
  }>;
  pull_request?: {
    number: number;
    title: string;
    action: string;
  };
}

/**
 * Extract file changes from GitHub webhook
 */
export function extractFileChanges(payload: GitHubWebhookPayload): {
  added: string[];
  modified: string[];
  removed: string[];
} {
  const added: string[] = [];
  const modified: string[] = [];
  const removed: string[] = [];

  if (payload.commits) {
    for (const commit of payload.commits) {
      added.push(...(commit.added || []));
      modified.push(...(commit.modified || []));
      removed.push(...(commit.removed || []));
    }
  }

  // Remove duplicates
  return {
    added: [...new Set(added)],
    modified: [...new Set(modified)],
    removed: [...new Set(removed)],
  };
}

/**
 * Check if webhook is a push event
 */
export function isPushEvent(payload: GitHubWebhookPayload): boolean {
  return payload.commits !== undefined && payload.commits.length > 0;
}

/**
 * Check if webhook is a pull request event
 */
export function isPullRequestEvent(payload: GitHubWebhookPayload): boolean {
  return payload.pull_request !== undefined;
}

/**
 * Get branch name from webhook
 */
export function getBranchName(payload: GitHubWebhookPayload): string | null {
  if (payload.ref) {
    // ref format: refs/heads/main
    const parts = payload.ref.split('/');
    return parts[parts.length - 1] || null;
  }
  return null;
}

