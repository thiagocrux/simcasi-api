/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as factories from '../../../src/factories';
import { mockRoleDocument } from '../../mocks';

describe('RolesController', () => {
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

  it('should retrieve all roles using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockRoleDocument]);

    vi.spyOn(factories, 'getAllRolesUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: {} };
    await factories.rolesController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith(undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockRoleDocument]);
  });

  it('should retrieve all roles using a specified sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockRoleDocument]);

    vi.spyOn(factories, 'getAllRolesUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: { order: 'desc' } };
    await factories.rolesController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockRoleDocument]);
  });

  it('should retrieve a role by its id', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockRoleDocument);

    vi.spyOn(factories, 'getRoleByIdUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.rolesController().show(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockRoleDocument);
  });

  it('should create and return a new role', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockRoleDocument);

    vi.spyOn(factories, 'createRoleUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { body: { name: 'New Role' } };
    await factories.rolesController().create(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith({ name: 'New Role' });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockRoleDocument);
  });

  it('should update and return an existing role', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockRoleDocument);

    vi.spyOn(factories, 'updateRoleUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      params: { id: '1' },
      body: { name: 'Updated Role' },
    };

    await factories.rolesController().update(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1', { name: 'Updated Role' });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockRoleDocument);
  });

  it('should delete a role by its id and return no content', async () => {
    const executeMock = vi.fn().mockResolvedValue(undefined);

    vi.spyOn(factories, 'deleteRoleUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.rolesController().delete(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });
});
