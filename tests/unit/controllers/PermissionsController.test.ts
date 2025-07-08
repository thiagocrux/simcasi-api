/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as factories from '../../../src/factories';
import { mockPermissionDocument } from '../../mocks';

describe('PermissionsController', () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      sendStatus: vi.fn().mockReturnThis(),
    };
  });

  it('should retrieve all permissions using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockPermissionDocument]);

    vi.spyOn(factories, 'getAllPermissionsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: {} };
    await factories.permissionsController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith(undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockPermissionDocument]);
  });

  it('should retrieve all permissions using a specified sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockPermissionDocument]);

    vi.spyOn(factories, 'getAllPermissionsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: { order: 'desc' } };
    await factories.permissionsController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockPermissionDocument]);
  });

  it('should retrieve a permission by its id', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockPermissionDocument);

    vi.spyOn(factories, 'getPermissionByIdUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.permissionsController().show(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockPermissionDocument);
  });

  it('should create and return a new permission', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockPermissionDocument);

    vi.spyOn(factories, 'createPermissionUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { body: { name: 'New Permission' } };
    await factories.permissionsController().create(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith({ name: 'New Permission' });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockPermissionDocument);
  });

  it('should update and return an existing permission', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockPermissionDocument);

    vi.spyOn(factories, 'updatePermissionUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      params: { id: '1' },
      body: { name: 'Updated Permission' },
    };

    await factories.permissionsController().update(mockRequest, mockResponse);

    expect(executeMock).toHaveBeenCalledWith('1', {
      name: 'Updated Permission',
    });

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockPermissionDocument);
  });

  it('should delete a permission by its id and return no content', async () => {
    const executeMock = vi.fn().mockResolvedValue(undefined);

    vi.spyOn(factories, 'deletePermissionUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.permissionsController().delete(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });
});
