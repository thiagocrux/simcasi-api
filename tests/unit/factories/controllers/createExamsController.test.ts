import { describe, expect, it } from 'vitest';

import { createExamsController } from '../../../../src/factories/controllers/createExamsController';

describe('createExamsController factory', () => {
  it('should export a function', () => {
    expect(typeof createExamsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = createExamsController();
    expect(controller).toBeDefined();
  });
});
