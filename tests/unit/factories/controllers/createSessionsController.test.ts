import { describe, expect, it } from 'vitest';

import { createSessionsController } from '../../../../src/factories/controllers/createSessionsController';

describe('createSessionsController factory', () => {
  it('should export a function', () => {
    expect(typeof createSessionsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = createSessionsController();
    expect(controller).toBeDefined();
  });
});
