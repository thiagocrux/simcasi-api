/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as factories from '../../../src/factories';
import { mockNotificationDocument } from '../../mocks';

describe('NotificationsController', () => {
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

  it('should retrieve all notifications using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockNotificationDocument]);

    vi.spyOn(factories, 'getAllNotificationsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: {} };
    await factories.notificationsController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith(undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockNotificationDocument]);
  });

  it('should retrieve all notifications using a specified sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockNotificationDocument]);

    vi.spyOn(factories, 'getAllNotificationsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: { order: 'desc' } };
    await factories.notificationsController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockNotificationDocument]);
  });

  it('should retrieve a notification by its id', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockNotificationDocument);

    vi.spyOn(factories, 'getNotificationByIdUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.notificationsController().show(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockNotificationDocument);
  });

  it('should create and return a new notification', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockNotificationDocument);

    vi.spyOn(factories, 'createNotificationUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { body: { name: 'New Notification' } };
    await factories.notificationsController().create(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith({ name: 'New Notification' });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockNotificationDocument);
  });

  it('should update and return an existing notification', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockNotificationDocument);

    vi.spyOn(factories, 'updateNotificationUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      params: { id: '1' },
      body: { name: 'Updated Notification' },
    };

    await factories.notificationsController().update(mockRequest, mockResponse);

    expect(executeMock).toHaveBeenCalledWith('1', {
      name: 'Updated Notification',
    });

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockNotificationDocument);
  });

  it('should delete a notification by its id and return no content', async () => {
    const executeMock = vi.fn().mockResolvedValue(undefined);

    vi.spyOn(factories, 'deleteNotificationUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.notificationsController().delete(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });
});
