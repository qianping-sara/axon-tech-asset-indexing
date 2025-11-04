/**
 * API handler wrapper for error handling and logging
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger, logApiError } from '@/lib/utils/logger';
import { handleError } from '@/lib/utils/errors';

export type ApiHandlerFunction = (
  request: NextRequest,
  context?: Record<string, unknown>
) => Promise<NextResponse>;

/**
 * Wrap API handler with error handling and logging
 */
export function withErrorHandling(
  handler: ApiHandlerFunction,
  options?: {
    method?: string;
    path?: string;
  }
): ApiHandlerFunction {
  return async (request: NextRequest, context?: Record<string, unknown>) => {
    const startTime = Date.now();
    const method = options?.method || request.method;
    const path = options?.path || request.nextUrl.pathname;

    try {
      const response = await handler(request, context);
      const duration = Date.now() - startTime;

      logger.info(`${method} ${path} ${response.status}`, {
        status: response.status,
        duration,
      });

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorInfo = handleError(error);

      logApiError(method, path, errorInfo.statusCode, error instanceof Error ? error : new Error(String(error)), {
        duration,
      });

      return NextResponse.json(
        {
          success: false,
          error: errorInfo.message,
          details: errorInfo.details,
        },
        { status: errorInfo.statusCode }
      );
    }
  };
}

/**
 * Create a safe API handler that catches all errors
 */
export function createApiHandler(handler: ApiHandlerFunction): ApiHandlerFunction {
  return withErrorHandling(handler);
}

