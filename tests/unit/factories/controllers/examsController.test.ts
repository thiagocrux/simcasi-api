import { describe, expect, it } from 'vitest';

import { examsController } from '../../../../src/factories/controllers/examsController';

describe('examsController factory', () => {
  it('should export a function', () => {
    expect(typeof examsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = examsController();
    expect(controller).toBeDefined();
  });
});
