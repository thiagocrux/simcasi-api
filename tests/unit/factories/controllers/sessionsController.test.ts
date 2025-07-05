import { describe, expect, it } from 'vitest';

import { sessionsController } from '../../../../src/factories/controllers/sessionsController';

describe('sessionsController factory', () => {
  it('should export a function', () => {
    expect(typeof sessionsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = sessionsController();
    expect(controller).toBeDefined();
  });
});
