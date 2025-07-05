/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MissingDataError, UnauthorizedError } from '../../../src/utils';
import { mockRoleDocument } from '../../mocks';

const mockRolesRepositoryInstance = {
  find: vi.fn(),
};

vi.mock('../../../src/repositories/RolesRepository', () => ({
  default: vi.fn().mockImplementation(() => mockRolesRepositoryInstance),
}));

describe('AuthorizationMiddleware', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.doUnmock('../../../src/config');
  });

  it('should return `{ data: {} }` when authorization is disabled', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHORIZATION_DISABLED: true,
    }));

    const { AuthorizationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const mockRequest = {};
    const mockRolesRepository = {} as any;

    const middleware = new AuthorizationMiddleware(
      'accounts:find',
      mockRolesRepository
    );

    const response = await middleware.handle(mockRequest as any);
    expect(response).toStrictEqual({ data: {} });
  });

  it('should throw MissingDataError when the role id is missing from the request', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHORIZATION_DISABLED: false,
    }));

    const { AuthorizationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthorizationMiddleware(
      'accounts:find',
      mockRolesRepositoryInstance as any
    );

    const promise = middleware.handle({} as any);

    await expect(promise).rejects.toThrowError(
      new MissingDataError('role id').message
    );
  });

  it('should throw UnauthorizedError when the role does not exist', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHORIZATION_DISABLED: false,
    }));

    mockRolesRepositoryInstance.find.mockResolvedValueOnce(null);

    const { AuthorizationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthorizationMiddleware(
      'accounts:find',
      mockRolesRepositoryInstance as any
    );

    const promise = middleware.handle({
      account: { role: 'role_id' },
    } as any);

    await expect(promise).rejects.toThrowError(new UnauthorizedError().message);
  });

  it('should throw UnauthorizedError when the role lacks the required permission', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHORIZATION_DISABLED: false,
    }));

    mockRolesRepositoryInstance.find.mockResolvedValueOnce({
      ...mockRoleDocument,
      permissions: ['other:permission'],
    });

    const { AuthorizationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthorizationMiddleware(
      'accounts:find',
      mockRolesRepositoryInstance as any
    );

    const promise = middleware.handle({
      account: { role: 'role_id' },
    } as any);

    await expect(promise).rejects.toThrowError(new UnauthorizedError().message);
  });

  it('should return `{ data: {} }` when the role exists and has the required permission', async () => {
    vi.doMock('../../../src/config', () => ({
      IS_AUTHORIZATION_DISABLED: false,
    }));

    mockRolesRepositoryInstance.find.mockResolvedValueOnce({
      ...mockRoleDocument,
      permissions: ['accounts:find'],
    });

    const { AuthorizationMiddleware } = await import(
      '../../../src/middlewares'
    );

    const middleware = new AuthorizationMiddleware(
      'accounts:find',
      mockRolesRepositoryInstance as any
    );

    const response = await middleware.handle({
      account: { role: 'role_id' },
    } as any);

    expect(response).toStrictEqual({ data: {} });
  });
});
