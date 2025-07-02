import { describe, expect, it } from 'vitest';

import { createAccountsController } from '../../../../src/factories/controllers/createAccountsController';

describe('createAccountsController factory', () => {
  it('should export a function', () => {
    expect(typeof createAccountsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = createAccountsController();
    expect(controller).toBeDefined();
  });
});
