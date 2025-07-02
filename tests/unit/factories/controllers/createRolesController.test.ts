import { describe, expect, it } from 'vitest';

import { createRolesController } from '../../../../src/factories/controllers/createRolesController';

describe('createRolesController factory', () => {
  it('should export a function', () => {
    expect(typeof createRolesController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = createRolesController();
    expect(controller).toBeDefined();
  });
});
