import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  convertDurationStringToMiliseconds,
  generateSessionTimeframe,
} from '../../../src/utils';

describe('dateTime.ts', () => {
  describe('convertDurationStringToMiliseconds', () => {
    it('should return null for non-string input', () => {
      // @ts-expect-error: deliberate wrong param type for testing purposes
      expect(convertDurationStringToMiliseconds(null)).toBeNull();
      // @ts-expect-error: deliberate wrong param type for testing purposes
      expect(convertDurationStringToMiliseconds(undefined)).toBeNull();
      // @ts-expect-error: deliberate wrong param type for testing purposes
      expect(convertDurationStringToMiliseconds(123)).toBeNull();
      // @ts-expect-error: deliberate wrong param type for testing purposes
      expect(convertDurationStringToMiliseconds({})).toBeNull();
    });

    it('should return null if regex match fails', () => {
      ['0s', '00m', 's', '30', '3.5h', '30ss', ' 30s', '30s ', ''].forEach(
        (input) => {
          expect(convertDurationStringToMiliseconds(input)).toBeNull();
        }
      );
    });

    it('should return null for invalid unit', () => {
      expect(convertDurationStringToMiliseconds('10u'));
    });

    it('should convert seconds correctly', () => {
      expect(convertDurationStringToMiliseconds('30s')).toBe(30000);
    });

    it('should convert minutes correctly', () => {
      expect(convertDurationStringToMiliseconds('5m')).toBe(300000);
    });

    it('should convert hours correctly', () => {
      expect(convertDurationStringToMiliseconds('2h')).toBe(7200000);
    });

    it('should convert days correctly', () => {
      expect(convertDurationStringToMiliseconds('1d')).toBe(86400000);
    });

    it('should return null for unknown units', () => {
      expect(convertDurationStringToMiliseconds('1y')).toBeNull();
    });
  });

  describe('generateSessionTimeframe', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return null for invalid duration string', () => {
      expect(generateSessionTimeframe('invalid')).toBeNull();
    });

    it('should generate correct timeframe for seconds', () => {
      const mockDate = new Date('2023-01-01T00:00:00Z');
      vi.setSystemTime(mockDate);

      const result = generateSessionTimeframe('30s');

      expect(result).toEqual({
        issuedAt: mockDate,
        expiresAt: new Date(mockDate.getTime() + 30000),
      });
    });

    it('should generate correct timeframe for minutes', () => {
      const mockDate = new Date('2023-01-01T00:00:00Z');
      vi.setSystemTime(mockDate);

      const result = generateSessionTimeframe('5m');

      expect(result).toEqual({
        issuedAt: mockDate,
        expiresAt: new Date(mockDate.getTime() + 300000),
      });
    });

    it('should generate correct timeframe for hours', () => {
      const mockDate = new Date('2023-01-01T00:00:00Z');
      vi.setSystemTime(mockDate);

      const result = generateSessionTimeframe('2h');

      expect(result).toEqual({
        issuedAt: mockDate,
        expiresAt: new Date(mockDate.getTime() + 7200000),
      });
    });

    it('should generate correct timeframe for days', () => {
      const mockDate = new Date('2023-01-01T00:00:00Z');
      vi.setSystemTime(mockDate);

      const result = generateSessionTimeframe('1d');

      expect(result).toEqual({
        issuedAt: mockDate,
        expiresAt: new Date(mockDate.getTime() + 86400000),
      });
    });
  });
});
