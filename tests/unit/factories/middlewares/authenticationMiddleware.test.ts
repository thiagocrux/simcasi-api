import { describe, expect, it } from 'vitest';

import { authenticationMiddleware } from '../../../../src/factories/middlewares/authenticationMiddleware';

describe('authenticationMiddleware factory', () => {
  it('should export a function', () => {
    expect(typeof authenticationMiddleware).toBe('function');
  });

  it('should return a middleware function when called', () => {
    const middleware = authenticationMiddleware();
    expect(typeof middleware).toBe('function');
    expect(middleware.length).toBe(3); // check if it has (req, res, next) signature
  });
});
