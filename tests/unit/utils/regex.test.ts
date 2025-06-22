import { describe, expect, it } from 'vitest';

import { isDurationString } from '../../../src/utils';

describe('regex.ts', () => {
  describe('isDurationString()', () => {
    it('returns true for valid params"', () => {
      ['1s', '30m', '24h', '365d'].forEach((input) => {
        expect(isDurationString(input)).toBeTruthy();
      });
    });

    it('returns null for invalid params', () => {
      ['0s', '00m', 's', '30', '3.5h', '30ss', ' 30s', '30s ', ''].forEach(
        (input) => {
          expect(isDurationString(input)).toBe(null);
        }
      );
    });
  });
});
