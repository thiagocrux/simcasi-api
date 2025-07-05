import { describe, expect, it } from 'vitest';

import { authorizationMiddleware } from '../../../../src/factories/middlewares/authorizationMiddleware';

describe('authorizationMiddleware factory', () => {
  it('should export a function', () => {
    expect(typeof authorizationMiddleware).toBe('function');
  });

  it('should return a middleware function when called', () => {
    const middleware = authorizationMiddleware('accounts:read');
    expect(typeof middleware).toBe('function');
    expect(middleware.length).toBe(3); // check if it has (req, res, next) signature
  });
});
