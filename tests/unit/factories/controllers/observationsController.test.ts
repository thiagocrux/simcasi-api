import { describe, expect, it } from 'vitest';

import { observationsController } from '../../../../src/factories/controllers/observationsController';

describe('observationsController factory', () => {
  it('should export a function', () => {
    expect(typeof observationsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = observationsController();
    expect(controller).toBeDefined();
  });
});
