/**
 * Error handling utilities
 */

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, string>) {
    super(400, message, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(404, message);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(403, message);
    this.name = 'ForbiddenError';
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = 'Conflict') {
    super(409, message);
    this.name = 'ConflictError';
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = 'Internal server error') {
    super(500, message);
    this.name = 'InternalServerError';
  }
}

/**
 * Handle error and return standardized response
 */
export function handleError(error: unknown): {
  statusCode: number;
  message: string;
  details?: Record<string, unknown>;
} {
  if (error instanceof ApiError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      statusCode: 500,
      message: error.message || 'Internal server error',
    };
  }

  return {
    statusCode: 500,
    message: 'Unknown error occurred',
  };
}

/**
 * Check if error is an API error
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Check if error is a validation error
 */
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

