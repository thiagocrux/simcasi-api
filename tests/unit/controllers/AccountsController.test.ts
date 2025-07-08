/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as factories from '../../../src/factories';
import { mockAccountDocument } from '../../mocks';

describe('AccountsController', () => {
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

  it('should retrieve all accounts using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockAccountDocument]);

    vi.spyOn(factories, 'getAllAccountsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: {} };
    await factories.accountsController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith(undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockAccountDocument]);
  });

  it('should retrieve all accounts using a specified sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockAccountDocument]);

    vi.spyOn(factories, 'getAllAccountsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: { order: 'desc' } };
    await factories.accountsController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockAccountDocument]);
  });

  it('should retrieve an account by its id', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockAccountDocument);

    vi.spyOn(factories, 'getAccountByIdUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.accountsController().show(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockAccountDocument);
  });

  it('should create and return a new account', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockAccountDocument);

    vi.spyOn(factories, 'createAccountUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { body: { name: 'New Account' } };
    await factories.accountsController().create(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith({ name: 'New Account' });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockAccountDocument);
  });

  it('should update and return an existing account', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockAccountDocument);

    vi.spyOn(factories, 'updateAccountUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      params: { id: '1' },
      body: { name: 'Updated Account' },
    };

    await factories.accountsController().update(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1', { name: 'Updated Account' });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockAccountDocument);
  });

  it('should delete an account by its id and return no content', async () => {
    const executeMock = vi.fn().mockResolvedValue(undefined);

    vi.spyOn(factories, 'deleteAccountUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.accountsController().delete(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });
});
