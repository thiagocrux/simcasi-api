import { describe, expect, it } from 'vitest';

import { rolesController } from '../../../../src/factories/controllers/rolesController';

describe('rolesController factory', () => {
  it('should export a function', () => {
    expect(typeof rolesController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = rolesController();
    expect(controller).toBeDefined();
  });
});
