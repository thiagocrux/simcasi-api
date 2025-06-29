import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  InvalidAccessTokenError,
  MissingAccessTokenError,
  UnauthorizedError,
} from '../../../src/utils';

import {
  mockJwtToken,
  mockObjectId,
  mockRequest,
  mockSessionDocument,
} from '../../mocks';

describe('AuthenticationMiddleware', async () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unmock('jsonwebtoken');
    vi.unmock('../../../src/repositories');
    vi.unmock('../../../src/config');
  });

  it('should return `{ data: {} }` when authentication is disabled', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHENTICATION_DISABLED: true,
    }));

    const { IS_AUTHENTICATION_DISABLED } = await import('../../../src/config');

    const { AuthenticationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthenticationMiddleware();
    const response = await middleware.handle(mockRequest);
    expect(IS_AUTHENTICATION_DISABLED).toBe(true);
    expect(response).toStrictEqual({ data: {} });
  });

  it('should throw MissingAccessTokenError when the authorization header is missing', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHENTICATION_DISABLED: false,
    }));

    const { AuthenticationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthenticationMiddleware().handle({
      ...mockRequest,
      headers: {},
    });

    await expect(middleware).rejects.toThrowError(
      new MissingAccessTokenError().message
    );
  });

  it("should throw InvalidAccessTokenError when the authorization token is missing the 'Bearer' prefix", async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHENTICATION_DISABLED: false,
    }));

    const { AuthenticationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthenticationMiddleware().handle({
      ...mockRequest,
      headers: { authorization: mockJwtToken },
    });

    await expect(middleware).rejects.toThrowError(
      new InvalidAccessTokenError().message
    );
  });

  it("should throw a 'jwt malformed' error when the JWT token format is invalid", async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHENTICATION_DISABLED: false,
      env: { jwtSecret: 'jwt-secret' },
    }));

    vi.doMock('jsonwebtoken', () => ({
      default: {
        verify: vi.fn(() => {
          throw new Error('jwt malformed');
        }),
      },
    }));

    vi.doMock('../../../src/repositories', () => ({
      SessionsRepository: {
        find: vi.fn(),
      },
    }));

    const { AuthenticationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthenticationMiddleware().handle({
      ...mockRequest,
      headers: { authorization: 'Bearer malformed_token' },
    });

    await expect(middleware).rejects.toThrow('jwt malformed');
  });

  it('should throw InvalidAccessTokenError when the JWT payload is missing the account id (`sub`)', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHENTICATION_DISABLED: false,
      env: { jwtSecret: 'jwt-secret' },
    }));

    vi.doMock('jsonwebtoken', () => ({
      default: {
        verify: vi.fn().mockResolvedValueOnce({
          sub: false,
          rid: mockObjectId,
          sid: mockObjectId,
        }),
      },
    }));

    vi.mock('../../../src/repositories', () => ({
      SessionsRepository: {
        find: vi.fn().mockResolvedValueOnce(null),
      },
    }));

    const { AuthenticationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthenticationMiddleware().handle(mockRequest);

    await expect(middleware).rejects.toThrow(
      new InvalidAccessTokenError().message
    );
  });

  it('should throw UnauthorizedError when the account-related session does not exist', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHENTICATION_DISABLED: false,
      env: { jwtSecret: 'jwt-secret' },
    }));

    vi.doMock('jsonwebtoken', () => ({
      default: {
        verify: vi.fn(() => ({
          sub: mockObjectId,
          rid: mockObjectId,
          sid: mockObjectId,
        })),
      },
    }));

    vi.doMock('../../../src/repositories', () => ({
      SessionsRepository: {
        find: vi.fn().mockResolvedValueOnce(null),
      },
    }));

    const { AuthenticationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthenticationMiddleware().handle(mockRequest);
    await expect(middleware).rejects.toThrow(new UnauthorizedError().message);
  });

  it('should throw UnauthorizedError when the session is not active', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHENTICATION_DISABLED: false,
      env: { jwtSecret: 'jwt-secret' },
    }));

    vi.doMock('jsonwebtoken', () => ({
      default: {
        verify: vi.fn(() => ({
          sub: mockObjectId,
          rid: mockObjectId,
          sid: mockObjectId,
        })),
      },
    }));

    vi.doMock('../../../src/repositories', () => ({
      SessionsRepository: {
        find: vi
          .fn()
          .mockResolvedValueOnce({ ...mockSessionDocument, isActive: false }),
      },
    }));

    const { AuthenticationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthenticationMiddleware().handle(mockRequest);
    await expect(middleware).rejects.toThrow(new UnauthorizedError().message);
  });

  it('should return the account id and role when all validations pass', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHENTICATION_DISABLED: false,
      env: { jwtSecret: 'jwt-secret' },
    }));

    vi.doMock('jsonwebtoken', () => ({
      default: {
        verify: vi.fn(() => ({
          sub: mockObjectId,
          rid: mockObjectId,
          sid: mockObjectId,
        })),
      },
    }));

    vi.doMock('../../../src/repositories', () => ({
      SessionsRepository: {
        find: vi.fn().mockResolvedValueOnce(mockSessionDocument),
      },
    }));

    const { AuthenticationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthenticationMiddleware();
    const response = await middleware.handle(mockRequest);

    await expect(response).toEqual({
      data: {
        id: mockObjectId,
        role: mockObjectId,
      },
    });
  });
});
