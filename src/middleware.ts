import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/utils/logger';

/**
 * Middleware for logging API requests and responses
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const method = request.method;

  // Log incoming request
  logger.info(`Incoming request: ${method} ${pathname}${search}`, {
    method,
    path: pathname,
    userAgent: request.headers.get('user-agent'),
  });

  // Create response
  const response = NextResponse.next();

  // Log response
  const status = response.status;
  logger.info(`Response: ${method} ${pathname} ${status}`, {
    method,
    path: pathname,
    status,
  });

  return response;
}

/**
 * Configure which routes to apply middleware to
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

