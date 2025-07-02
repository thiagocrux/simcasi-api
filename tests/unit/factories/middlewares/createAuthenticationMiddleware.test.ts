import { describe, expect, it } from 'vitest';

import { createAuthenticationMiddleware } from '../../../../src/factories/middlewares/createAuthenticationMiddleware';

describe('createAuthenticationMiddleware factory', () => {
  it('should export a function', () => {
    expect(typeof createAuthenticationMiddleware).toBe('function');
  });

  it('should return a middleware function when called', () => {
    const middleware = createAuthenticationMiddleware();
    expect(typeof middleware).toBe('function');
    expect(middleware.length).toBe(3); // check if it has (req, res, next) signature
  });
});
