import { describe, expect, it } from 'vitest';

import { createTreatmentsController } from '../../../../src/factories/controllers/createTreatmentsController';

describe('createTreatmentsController factory', () => {
  it('should export a function', () => {
    expect(typeof createTreatmentsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = createTreatmentsController();
    expect(controller).toBeDefined();
  });
});
