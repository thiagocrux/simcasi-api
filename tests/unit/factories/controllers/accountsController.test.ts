import { describe, expect, it } from 'vitest';

import { accountsController } from '../../../../src/factories/controllers/accountsController';

describe('accountsController factory', () => {
  it('should export a function', () => {
    expect(typeof accountsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = accountsController();
    expect(controller).toBeDefined();
  });
});
