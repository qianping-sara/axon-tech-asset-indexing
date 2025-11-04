/**
 * Logging utility for API requests and errors
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

/**
 * Format log entry as JSON
 */
function formatLogEntry(entry: LogEntry): string {
  return JSON.stringify(entry);
}

/**
 * Logger utility
 */
export const logger = {
  /**
   * Log debug message
   */
  debug(message: string, context?: Record<string, unknown>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.DEBUG,
      message,
      context,
    };
    console.debug(formatLogEntry(entry));
  },

  /**
   * Log info message
   */
  info(message: string, context?: Record<string, unknown>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      message,
      context,
    };
    console.log(formatLogEntry(entry));
  },

  /**
   * Log warning message
   */
  warn(message: string, context?: Record<string, unknown>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.WARN,
      message,
      context,
    };
    console.warn(formatLogEntry(entry));
  },

  /**
   * Log error message
   */
  error(message: string, error?: Error, context?: Record<string, unknown>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      message,
      context,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
    };
    console.error(formatLogEntry(entry));
  },
};

/**
 * Log API request
 */
export function logRequest(
  method: string,
  path: string,
  context?: Record<string, unknown>
) {
  logger.info(`${method} ${path}`, {
    type: 'request',
    ...context,
  });
}

/**
 * Log API response
 */
export function logResponse(
  method: string,
  path: string,
  status: number,
  duration: number,
  context?: Record<string, unknown>
) {
  logger.info(`${method} ${path} ${status}`, {
    type: 'response',
    status,
    duration,
    ...context,
  });
}

/**
 * Log API error
 */
export function logApiError(
  method: string,
  path: string,
  status: number,
  error: Error,
  context?: Record<string, unknown>
) {
  logger.error(`${method} ${path} ${status}`, error, {
    type: 'api_error',
    status,
    ...context,
  });
}

