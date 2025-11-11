/**
 * Unit tests for logger utility
 * 
 * Run with: npm test -- tests/unit/logger.test.ts
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { logger, LogLevel, logRequest, logResponse, logApiError } from '@/lib/utils/logger';

describe('Logger Utility', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'debug').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('logger.debug', () => {
    it('should log debug message', () => {
      logger.debug('Debug message', { key: 'value' });

      expect(console.debug).toHaveBeenCalled();
    });

    it('should include timestamp', () => {
      logger.debug('Test');

      const call = (console.debug as jest.Mock).mock.calls[0][0];
      const parsed = JSON.parse(call);

      expect(parsed.timestamp).toBeDefined();
      expect(parsed.level).toBe(LogLevel.DEBUG);
    });
  });

  describe('logger.info', () => {
    it('should log info message', () => {
      logger.info('Info message', { key: 'value' });

      expect(console.log).toHaveBeenCalled();
    });

    it('should include context', () => {
      const context = { userId: '123', action: 'login' };
      logger.info('User logged in', context);

      const call = (console.log as jest.Mock).mock.calls[0][0];
      const parsed = JSON.parse(call);

      expect(parsed.context).toEqual(context);
      expect(parsed.level).toBe(LogLevel.INFO);
    });
  });

  describe('logger.warn', () => {
    it('should log warning message', () => {
      logger.warn('Warning message');

      expect(console.warn).toHaveBeenCalled();
    });

    it('should include level', () => {
      logger.warn('Test warning');

      const call = (console.warn as jest.Mock).mock.calls[0][0];
      const parsed = JSON.parse(call);

      expect(parsed.level).toBe(LogLevel.WARN);
    });
  });

  describe('logger.error', () => {
    it('should log error message', () => {
      const error = new Error('Test error');
      logger.error('Error occurred', error);

      expect(console.error).toHaveBeenCalled();
    });

    it('should include error details', () => {
      const error = new Error('Test error');
      logger.error('Error occurred', error);

      const call = (console.error as jest.Mock).mock.calls[0][0];
      const parsed = JSON.parse(call);

      expect(parsed.error).toBeDefined();
      expect(parsed.error.name).toBe('Error');
      expect(parsed.error.message).toBe('Test error');
      expect(parsed.level).toBe(LogLevel.ERROR);
    });
  });

  describe('logRequest', () => {
    it('should log request with method and path', () => {
      logRequest('GET', '/api/assets');

      const call = (console.log as jest.Mock).mock.calls[0][0];
      const parsed = JSON.parse(call);

      expect(parsed.message).toContain('GET /api/assets');
      expect(parsed.context.type).toBe('request');
    });

    it('should include context', () => {
      logRequest('POST', '/api/assets', { userId: '123' });

      const call = (console.log as jest.Mock).mock.calls[0][0];
      const parsed = JSON.parse(call);

      expect(parsed.context.userId).toBe('123');
    });
  });

  describe('logResponse', () => {
    it('should log response with status and duration', () => {
      logResponse('GET', '/api/assets', 200, 150);

      const call = (console.log as jest.Mock).mock.calls[0][0];
      const parsed = JSON.parse(call);

      expect(parsed.message).toContain('GET /api/assets 200');
      expect(parsed.context.status).toBe(200);
      expect(parsed.context.duration).toBe(150);
      expect(parsed.context.type).toBe('response');
    });
  });

  describe('logApiError', () => {
    it('should log API error', () => {
      const error = new Error('API error');
      logApiError('POST', '/api/assets', 400, error);

      expect(console.error).toHaveBeenCalled();
    });

    it('should include error details', () => {
      const error = new Error('Validation failed');
      logApiError('POST', '/api/assets', 400, error, { field: 'name' });

      const call = (console.error as jest.Mock).mock.calls[0][0];
      const parsed = JSON.parse(call);

      expect(parsed.error.message).toBe('Validation failed');
      expect(parsed.context.status).toBe(400);
      expect(parsed.context.field).toBe('name');
    });
  });
});

