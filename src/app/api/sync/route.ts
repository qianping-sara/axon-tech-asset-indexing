import { NextRequest, NextResponse } from 'next/server';
import { syncAssetsFromWebhook, getSyncStatus } from '@/lib/api/sync';
import { verifyGitHubWebhookSignature, GitHubWebhookPayload } from '@/lib/utils/webhook';

/**
 * GET /api/sync
 * Get sync status
 */
export async function GET() {
  try {
    const status = await getSyncStatus();

    return NextResponse.json(
      {
        success: true,
        data: status,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting sync status:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get sync status',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/sync
 * GitHub Webhook endpoint for syncing assets
 *
 * Expected headers:
 * - X-Hub-Signature-256: HMAC-SHA256 signature
 * - X-GitHub-Event: push (or other event types)
 *
 * Expected body:
 * - GitHub webhook payload with commits and file changes
 * - fileContents: Record<string, string> (file paths to contents)
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature
    const signature = request.headers.get('X-Hub-Signature-256');
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      console.warn('Missing webhook signature or secret');
      return NextResponse.json(
        {
          success: false,
          error: 'Webhook verification failed',
        },
        { status: 401 }
      );
    }

    // Get raw body for signature verification
    const bodyText = await request.text();

    // Verify signature
    if (!verifyGitHubWebhookSignature(bodyText, signature, webhookSecret)) {
      console.warn('Invalid webhook signature');
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid webhook signature',
        },
        { status: 401 }
      );
    }

    // Parse payload
    const payload: GitHubWebhookPayload & { fileContents?: Record<string, string> } =
      JSON.parse(bodyText);

    // Only process push events
    if (!payload.commits || payload.commits.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'No commits to process',
          stats: {
            processed: 0,
            created: 0,
            updated: 0,
            deleted: 0,
            failed: 0,
          },
        },
        { status: 200 }
      );
    }

    // Get file contents (in real scenario, would fetch from GitHub API)
    const fileContents = payload.fileContents || {};

    // Sync assets
    const result = await syncAssetsFromWebhook(payload, fileContents);

    return NextResponse.json(
      {
        success: result.success,
        message: result.message,
        stats: result.stats,
        errors: result.errors.length > 0 ? result.errors : undefined,
      },
      { status: result.success ? 200 : 207 }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process webhook',
      },
      { status: 500 }
    );
  }
}

