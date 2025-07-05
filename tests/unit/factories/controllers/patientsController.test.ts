import { describe, expect, it } from 'vitest';

import { patientsController } from '../../../../src/factories/controllers/patientsController';

describe('patientsController factory', () => {
  it('should export a function', () => {
    expect(typeof patientsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = patientsController();
    expect(controller).toBeDefined();
  });
});
