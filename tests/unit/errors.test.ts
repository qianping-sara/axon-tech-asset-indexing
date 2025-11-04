/**
 * Unit tests for error handling utilities
 * 
 * Run with: npm test -- tests/unit/errors.test.ts
 */

import { describe, it, expect } from '@jest/globals';
import {
  ApiError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  InternalServerError,
  handleError,
  isApiError,
  isValidationError,
} from '@/lib/utils/errors';

describe('Error Classes', () => {
  describe('ApiError', () => {
    it('should create ApiError with status code and message', () => {
      const error = new ApiError(400, 'Bad request');

      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Bad request');
      expect(error.name).toBe('ApiError');
    });

    it('should include details', () => {
      const details = { field: 'name', reason: 'required' };
      const error = new ApiError(400, 'Validation failed', details);

      expect(error.details).toEqual(details);
    });
  });

  describe('ValidationError', () => {
    it('should create ValidationError with 400 status', () => {
      const error = new ValidationError('Invalid input');

      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid input');
      expect(error.name).toBe('ValidationError');
    });

    it('should include validation details', () => {
      const details = { name: 'required', email: 'invalid format' };
      const error = new ValidationError('Validation failed', details);

      expect(error.details).toEqual(details);
    });
  });

  describe('NotFoundError', () => {
    it('should create NotFoundError with 404 status', () => {
      const error = new NotFoundError('Asset not found');

      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Asset not found');
      expect(error.name).toBe('NotFoundError');
    });

    it('should have default message', () => {
      const error = new NotFoundError();

      expect(error.message).toBe('Resource not found');
    });
  });

  describe('UnauthorizedError', () => {
    it('should create UnauthorizedError with 401 status', () => {
      const error = new UnauthorizedError('Invalid token');

      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Invalid token');
      expect(error.name).toBe('UnauthorizedError');
    });
  });

  describe('ForbiddenError', () => {
    it('should create ForbiddenError with 403 status', () => {
      const error = new ForbiddenError('Access denied');

      expect(error.statusCode).toBe(403);
      expect(error.message).toBe('Access denied');
      expect(error.name).toBe('ForbiddenError');
    });
  });

  describe('ConflictError', () => {
    it('should create ConflictError with 409 status', () => {
      const error = new ConflictError('Resource already exists');

      expect(error.statusCode).toBe(409);
      expect(error.message).toBe('Resource already exists');
      expect(error.name).toBe('ConflictError');
    });
  });

  describe('InternalServerError', () => {
    it('should create InternalServerError with 500 status', () => {
      const error = new InternalServerError('Database connection failed');

      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Database connection failed');
      expect(error.name).toBe('InternalServerError');
    });
  });
});

describe('Error Handling', () => {
  describe('handleError', () => {
    it('should handle ApiError', () => {
      const error = new ValidationError('Invalid input', { field: 'name' });
      const result = handleError(error);

      expect(result.statusCode).toBe(400);
      expect(result.message).toBe('Invalid input');
      expect(result.details).toEqual({ field: 'name' });
    });

    it('should handle standard Error', () => {
      const error = new Error('Something went wrong');
      const result = handleError(error);

      expect(result.statusCode).toBe(500);
      expect(result.message).toBe('Something went wrong');
    });

    it('should handle unknown error', () => {
      const result = handleError('Unknown error');

      expect(result.statusCode).toBe(500);
      expect(result.message).toBe('Unknown error occurred');
    });

    it('should handle null error', () => {
      const result = handleError(null);

      expect(result.statusCode).toBe(500);
      expect(result.message).toBe('Unknown error occurred');
    });
  });

  describe('isApiError', () => {
    it('should identify ApiError', () => {
      const error = new ApiError(400, 'Bad request');

      expect(isApiError(error)).toBe(true);
    });

    it('should identify ValidationError as ApiError', () => {
      const error = new ValidationError('Invalid');

      expect(isApiError(error)).toBe(true);
    });

    it('should reject standard Error', () => {
      const error = new Error('Standard error');

      expect(isApiError(error)).toBe(false);
    });
  });

  describe('isValidationError', () => {
    it('should identify ValidationError', () => {
      const error = new ValidationError('Invalid');

      expect(isValidationError(error)).toBe(true);
    });

    it('should reject other ApiErrors', () => {
      const error = new NotFoundError();

      expect(isValidationError(error)).toBe(false);
    });

    it('should reject standard Error', () => {
      const error = new Error('Standard error');

      expect(isValidationError(error)).toBe(false);
    });
  });
});

