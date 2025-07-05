import { describe, expect, it } from 'vitest';

import { permissionsController } from '../../../../src/factories/controllers/permissionsController';

describe('permissionsController factory', () => {
  it('should export a function', () => {
    expect(typeof permissionsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = permissionsController();
    expect(controller).toBeDefined();
  });
});
