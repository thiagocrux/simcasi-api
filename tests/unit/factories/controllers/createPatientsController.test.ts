import { describe, expect, it } from 'vitest';

import { createPatientsController } from '../../../../src/factories/controllers/createPatientsController';

describe('createPatientsController factory', () => {
  it('should export a function', () => {
    expect(typeof createPatientsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = createPatientsController();
    expect(controller).toBeDefined();
  });
});
