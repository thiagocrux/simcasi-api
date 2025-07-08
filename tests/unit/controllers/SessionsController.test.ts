/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as factories from '../../../src/factories';
import { mockSessionDocument } from '../../mocks';

describe('SessionsController', () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      sendStatus: vi.fn().mockReturnThis(),
      cookie: vi.fn().mockReturnThis(),
    };
  });

  it('should retrieve all sessions using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockSessionDocument]);

    vi.spyOn(factories, 'getAllSessionsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: {} };
    await factories.sessionsController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith(undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockSessionDocument]);
  });

  it('should retrieve all sessions using a specified sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockSessionDocument]);

    vi.spyOn(factories, 'getAllSessionsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: { order: 'desc' } };

    await factories.sessionsController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockSessionDocument]);
  });

  it('should retrieve a session by its id', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockSessionDocument);

    vi.spyOn(factories, 'getSessionByIdUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.sessionsController().show(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockSessionDocument);
  });

  it('should create and return a new session', async () => {
    const executeMock = vi.fn().mockResolvedValue({
      accessToken: 'mockAccessToken',
      session: mockSessionDocument,
    });

    vi.spyOn(factories, 'createSessionUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      body: {
        name: 'New Session',
      },
      ip: '127.0.0.1',
      get: vi.fn((header: string) => {
        if (header === 'User-Agent') return 'Vitest';
        return undefined;
      }),
    };

    await factories.sessionsController().create(mockRequest, mockResponse);

    expect(executeMock).toHaveBeenCalledWith(mockRequest.body, {
      ipAddress: '127.0.0.1',
      userAgent: 'Vitest',
    });

    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledWith({
      accessToken: 'mockAccessToken',
      session: mockSessionDocument,
    });
  });

  it('should delete a session by its id and return no content', async () => {
    const executeMock = vi.fn().mockResolvedValue(undefined);

    vi.spyOn(factories, 'deleteSessionUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.sessionsController().delete(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });

  it('should refresh and return a new access token', async () => {
    const executeMock = vi.fn().mockResolvedValue('newMockAccessToken');

    vi.spyOn(factories, 'generateNewAccessTokenUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      body: { session: 'mockSessionId' },
    };

    await factories
      .sessionsController()
      .refreshToken(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('mockSessionId');

    expect(mockResponse.cookie).toHaveBeenCalledWith(
      'accessToken',
      'newMockAccessToken',
      {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
      }
    );

    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledWith({
      accessToken: 'newMockAccessToken',
    });
  });

  it('should create a session with null ipAddress when request.ip is undefined', async () => {
    const executeMock = vi.fn().mockResolvedValue({
      accessToken: 'mockAccessToken',
      session: mockSessionDocument,
    });

    vi.spyOn(factories, 'createSessionUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      body: {
        name: 'New Session',
      },
      ip: undefined,
      get: vi.fn((header: string) => {
        if (header === 'User-Agent') return 'Vitest';
        return undefined;
      }),
    };

    await factories.sessionsController().create(mockRequest, mockResponse);

    expect(executeMock).toHaveBeenCalledWith(mockRequest.body, {
      ipAddress: null,
      userAgent: 'Vitest',
    });

    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });

  it('should create a session with null userAgent when User-Agent header is undefined', async () => {
    const executeMock = vi.fn().mockResolvedValue({
      accessToken: 'mockAccessToken',
      session: mockSessionDocument,
    });

    vi.spyOn(factories, 'createSessionUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      body: {
        name: 'New Session',
      },
      ip: '127.0.0.1',
      get: vi.fn(() => undefined),
    };

    await factories.sessionsController().create(mockRequest, mockResponse);

    expect(executeMock).toHaveBeenCalledWith(mockRequest.body, {
      ipAddress: '127.0.0.1',
      userAgent: null,
    });

    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });

  it('should create a session with null ipAddress and userAgent when both are undefined', async () => {
    const executeMock = vi.fn().mockResolvedValue({
      accessToken: 'mockAccessToken',
      session: mockSessionDocument,
    });

    vi.spyOn(factories, 'createSessionUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      body: {
        name: 'New Session',
      },
      ip: undefined,
      get: vi.fn(() => undefined),
    };

    await factories.sessionsController().create(mockRequest, mockResponse);

    expect(executeMock).toHaveBeenCalledWith(mockRequest.body, {
      ipAddress: null,
      userAgent: null,
    });

    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });
});
