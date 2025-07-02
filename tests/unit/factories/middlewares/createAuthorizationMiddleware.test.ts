import { describe, expect, it } from 'vitest';

import { createAuthorizationMiddleware } from '../../../../src/factories/middlewares/createAuthorizationMiddleware';

describe('createAuthorizationMiddleware factory', () => {
  it('should export a function', () => {
    expect(typeof createAuthorizationMiddleware).toBe('function');
  });

  it('should return a middleware function when called', () => {
    const middleware = createAuthorizationMiddleware('accounts:read');
    expect(typeof middleware).toBe('function');
    expect(middleware.length).toBe(3); // check if it has (req, res, next) signature
  });
});
