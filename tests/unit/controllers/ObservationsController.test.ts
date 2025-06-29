/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ObservationsController } from '../../../src/controllers';
import * as factories from '../../../src/factories';
import { mockObservationDocument } from '../../mocks';

describe('ObservationsController', () => {
  let controller: ObservationsController;
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      sendStatus: vi.fn().mockReturnThis(),
    };

    controller = new ObservationsController();
  });

  it('should retrieve all observations using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockObservationDocument]);

    vi.spyOn(factories, 'createGetAllObservationsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: {} };
    await controller.index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith(undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockObservationDocument]);
  });

  it('should retrieve all observations using a specified sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockObservationDocument]);

    vi.spyOn(factories, 'createGetAllObservationsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: { order: 'desc' } };
    await controller.index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockObservationDocument]);
  });

  it('should retrieve an observation by its id', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockObservationDocument);

    vi.spyOn(factories, 'createGetObservationByIdUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await controller.show(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockObservationDocument);
  });

  it('should create and return a new observation', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockObservationDocument);

    vi.spyOn(factories, 'createCreateObservationUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { body: { name: 'New Observation' } };
    await controller.create(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith({ name: 'New Observation' });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockObservationDocument);
  });

  it('should update and return an existing observation', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockObservationDocument);

    vi.spyOn(factories, 'createUpdateObservationUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      params: { id: '1' },
      body: { name: 'Updated Observation' },
    };

    await controller.update(mockRequest, mockResponse);

    expect(executeMock).toHaveBeenCalledWith('1', {
      name: 'Updated Observation',
    });

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockObservationDocument);
  });

  it('should delete an observation by its id and return no content', async () => {
    const executeMock = vi.fn().mockResolvedValue(undefined);

    vi.spyOn(factories, 'createDeleteObservationUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await controller.delete(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });
});
