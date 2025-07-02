import { describe, expect, it } from 'vitest';

import { createPermissionsController } from '../../../../src/factories/controllers/createPermissionsController';

describe('createPermissionsController factory', () => {
  it('should export a function', () => {
    expect(typeof createPermissionsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = createPermissionsController();
    expect(controller).toBeDefined();
  });
});
