/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as factories from '../../../src/factories';
import { mockObservationDocument } from '../../mocks';

describe('ObservationsController', () => {
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

  it('should retrieve all observations using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockObservationDocument]);

    vi.spyOn(factories, 'getAllObservationsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: {} };
    await factories.observationsController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith(undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockObservationDocument]);
  });

  it('should retrieve all observations using a specified sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockObservationDocument]);

    vi.spyOn(factories, 'getAllObservationsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: { order: 'desc' } };
    await factories.observationsController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockObservationDocument]);
  });

  it('should retrieve an observation by its id', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockObservationDocument);

    vi.spyOn(factories, 'getObservationByIdUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.observationsController().show(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockObservationDocument);
  });

  it('should create and return a new observation', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockObservationDocument);

    vi.spyOn(factories, 'createObservationUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { body: { name: 'New Observation' } };
    await factories.observationsController().create(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith({ name: 'New Observation' });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockObservationDocument);
  });

  it('should update and return an existing observation', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockObservationDocument);

    vi.spyOn(factories, 'updateObservationUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      params: { id: '1' },
      body: { name: 'Updated Observation' },
    };

    await factories.observationsController().update(mockRequest, mockResponse);

    expect(executeMock).toHaveBeenCalledWith('1', {
      name: 'Updated Observation',
    });

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockObservationDocument);
  });

  it('should delete an observation by its id and return no content', async () => {
    const executeMock = vi.fn().mockResolvedValue(undefined);

    vi.spyOn(factories, 'deleteObservationUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.observationsController().delete(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });
});
