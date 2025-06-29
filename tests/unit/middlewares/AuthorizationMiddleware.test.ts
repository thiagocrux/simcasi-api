/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MissingDataError, UnauthorizedError } from '../../../src/utils';
import { mockRoleDocument, mockRolesRepository } from '../../mocks';

describe('AuthorizationMiddleware.ts', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unmock('../../../src/config');
  });

  mockRolesRepository.find.mockResolvedValue(() => mockRoleDocument);

  it('should return `{ data: {} }` when authorization is disabled', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHORIZATION_DISABLED: true,
    }));

    const mockRequest = {};

    const { IS_AUTHORIZATION_DISABLED } = await import('../../../src/config');

    const { AuthorizationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthorizationMiddleware('accounts:find');
    const response = await middleware.handle(mockRequest as any);
    expect(IS_AUTHORIZATION_DISABLED).toBe(true);
    expect(response).toStrictEqual({ data: {} });
  });

  it('should throw MissingDataError when the role id is missing from the request', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHORIZATION_DISABLED: false,
    }));

    const { AuthorizationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthorizationMiddleware('accounts:find').handle(
      {} as any
    );

    await expect(middleware).rejects.toThrowError(
      new MissingDataError('role id').message
    );
  });

  it('should throw UnauthorizedError when the role does not exist', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHORIZATION_DISABLED: false,
    }));

    vi.doMock('../../../src/repositories', () => ({
      RolesRepository: {
        find: vi.fn().mockResolvedValueOnce(null),
      },
    }));

    const { AuthorizationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthorizationMiddleware('accounts:find').handle({
      account: { role: 'role_id' },
    } as any);

    await expect(middleware).rejects.toThrowError(
      new UnauthorizedError().message
    );
  });

  it('should throw UnauthorizedError when the role lacks the required permission', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHORIZATION_DISABLED: false,
    }));

    vi.doMock('../../../src/repositories', () => ({
      RolesRepository: {
        find: vi.fn().mockResolvedValueOnce({
          ...mockRoleDocument,
          permissions: ['unauthorized_permission'],
        }),
      },
    }));

    const { AuthorizationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthorizationMiddleware('accounts:find').handle({
      account: { role: 'role_id' },
    } as any);

    await expect(middleware).rejects.toThrowError(
      new UnauthorizedError().message
    );
  });

  it('should return `{ data: {} }` when the role exists and has the required permission', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHORIZATION_DISABLED: false,
    }));

    vi.doMock('../../../src/repositories', () => ({
      RolesRepository: {
        find: vi.fn().mockResolvedValueOnce({
          ...mockRoleDocument,
          permissions: ['accounts:find'],
        }),
      },
    }));

    const { AuthorizationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthorizationMiddleware('accounts:find').handle({
      account: { role: 'role_id' },
    } as any);

    await expect(middleware).resolves.toStrictEqual({ data: {} });
  });
});
