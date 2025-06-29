/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AccountsController } from '../../../src/controllers';
import * as factories from '../../../src/factories';
import { mockAccountDocument } from '../../mocks';

describe('AccountsController', () => {
  let controller: AccountsController;
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      sendStatus: vi.fn().mockReturnThis(),
    };

    controller = new AccountsController();
  });

  it('should retrieve all accounts using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockAccountDocument]);

    vi.spyOn(factories, 'createGetAllAccountsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: {} };
    await controller.index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith(undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockAccountDocument]);
  });

  it('should retrieve all accounts using a specified sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockAccountDocument]);

    vi.spyOn(factories, 'createGetAllAccountsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: { order: 'desc' } };
    await controller.index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockAccountDocument]);
  });

  it('should retrieve an account by its id', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockAccountDocument);

    vi.spyOn(factories, 'createGetAccountByIdUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await controller.show(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockAccountDocument);
  });

  it('should create and return a new account', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockAccountDocument);

    vi.spyOn(factories, 'createCreateAccountUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { body: { name: 'New Account' } };
    await controller.create(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith({ name: 'New Account' });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockAccountDocument);
  });

  it('should update and return an existing account', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockAccountDocument);

    vi.spyOn(factories, 'createUpdateAccountUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      params: { id: '1' },
      body: { name: 'Updated Account' },
    };

    await controller.update(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1', { name: 'Updated Account' });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockAccountDocument);
  });

  it('should delete an account by its id and return no content', async () => {
    const executeMock = vi.fn().mockResolvedValue(undefined);

    vi.spyOn(factories, 'createDeleteAccountUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await controller.delete(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });
});
