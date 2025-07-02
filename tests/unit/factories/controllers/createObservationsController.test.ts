import { describe, expect, it } from 'vitest';

import { createObservationsController } from '../../../../src/factories/controllers/createObservationsController';

describe('createObservationsController factory', () => {
  it('should export a function', () => {
    expect(typeof createObservationsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = createObservationsController();
    expect(controller).toBeDefined();
  });
});
