/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

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

let mockIsAuthenticationDisabled = false;
let mockEnv = { jwtSecret: 'test-secret' };

vi.mock('../../../src/config', () => ({
  get IS_AUTHENTICATION_DISABLED() {
    return mockIsAuthenticationDisabled;
  },
  get env() {
    return mockEnv;
  },
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    verify: vi.fn(),
  },
}));

vi.mock('../../../src/repositories/SessionsRepository', () => ({
  SessionsRepository: vi.fn().mockImplementation(() => ({
    find: vi.fn(),
  })),
}));

import jwt from 'jsonwebtoken';
import { AuthenticationMiddleware } from '../../../src/middlewares';
import { SessionsRepository } from '../../../src/repositories/SessionsRepository';

const mockJwt = vi.mocked(jwt);
const MockedSessionsRepository = vi.mocked(SessionsRepository);

describe('AuthenticationMiddleware', () => {
  let mockSessionsRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockIsAuthenticationDisabled = false;
    mockEnv = { jwtSecret: 'test-secret' };

    mockSessionsRepository = {
      find: vi.fn(),
    };

    MockedSessionsRepository.mockImplementation(() => mockSessionsRepository);

    (mockJwt.verify as any).mockReturnValue({
      sub: mockObjectId,
      rid: mockObjectId,
      sid: mockObjectId,
    });
  });

  it('should return `{ data: {} }` when authentication is disabled', async () => {
    mockIsAuthenticationDisabled = true;

    const middleware = new AuthenticationMiddleware(mockSessionsRepository);
    const response = await middleware.handle(mockRequest);
    expect(response).toStrictEqual({ data: {} });
  });

  it('should throw MissingAccessTokenError when the authorization header is missing', async () => {
    const middleware = new AuthenticationMiddleware(mockSessionsRepository);

    const promise = middleware.handle({
      ...mockRequest,
      headers: {},
    });

    await expect(promise).rejects.toThrowError(
      new MissingAccessTokenError().message
    );
  });

  it("should throw InvalidAccessTokenError when the authorization token is missing the 'Bearer' prefix", async () => {
    const middleware = new AuthenticationMiddleware(mockSessionsRepository);

    const promise = middleware.handle({
      ...mockRequest,
      headers: { authorization: mockJwtToken },
    });

    await expect(promise).rejects.toThrowError(
      new InvalidAccessTokenError().message
    );
  });

  it("should throw a 'jwt malformed' error when the JWT token format is invalid", async () => {
    (mockJwt.verify as any).mockImplementation(() => {
      throw new Error('jwt malformed');
    });

    const middleware = new AuthenticationMiddleware(mockSessionsRepository);

    const promise = middleware.handle({
      ...mockRequest,
      headers: { authorization: `Bearer ${mockJwtToken}` },
    });

    await expect(promise).rejects.toThrowError('jwt malformed');
  });

  it('should throw InvalidAccessTokenError when the JWT payload is missing the account id (`sub`)', async () => {
    (mockJwt.verify as any).mockReturnValue({
      sub: false, // or null/undefined to trigger the error
      rid: mockObjectId,
      sid: mockObjectId,
    });

    const middleware = new AuthenticationMiddleware(mockSessionsRepository);

    const promise = middleware.handle({
      ...mockRequest,
      headers: { authorization: `Bearer ${mockJwtToken}` },
    });

    await expect(promise).rejects.toThrowError(
      new InvalidAccessTokenError().message
    );
  });

  it('should throw UnauthorizedError when the account-related session does not exist', async () => {
    (mockJwt.verify as any).mockReturnValue({
      sub: mockObjectId,
      rid: mockObjectId,
      sid: mockObjectId,
    });

    mockSessionsRepository.find.mockResolvedValue(null);

    const middleware = new AuthenticationMiddleware(mockSessionsRepository);

    const promise = middleware.handle({
      ...mockRequest,
      headers: { authorization: `Bearer ${mockJwtToken}` },
    });

    await expect(promise).rejects.toThrowError(new UnauthorizedError().message);
  });

  it('should throw UnauthorizedError when the session is not active', async () => {
    (mockJwt.verify as any).mockReturnValue({
      sub: mockObjectId,
      rid: mockObjectId,
      sid: mockObjectId,
    });

    mockSessionsRepository.find.mockResolvedValue({
      ...mockSessionDocument,
      isActive: false,
    });

    const middleware = new AuthenticationMiddleware(mockSessionsRepository);

    const promise = middleware.handle({
      ...mockRequest,
      headers: { authorization: `Bearer ${mockJwtToken}` },
    });

    await expect(promise).rejects.toThrowError(new UnauthorizedError().message);
  });

  it('should return the account id and role when all validations pass', async () => {
    (mockJwt.verify as any).mockReturnValue({
      sub: mockObjectId,
      rid: mockObjectId,
      sid: mockObjectId,
    });

    mockSessionsRepository.find.mockResolvedValue(mockSessionDocument);

    const middleware = new AuthenticationMiddleware(mockSessionsRepository);

    const response = await middleware.handle({
      ...mockRequest,
      headers: { authorization: `Bearer ${mockJwtToken}` },
    });

    expect(response).toStrictEqual({
      data: {
        id: mockObjectId,
        role: mockObjectId,
      },
    });
  });
});
