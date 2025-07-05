/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TreatmentsController } from '../../../src/controllers';
import * as factories from '../../../src/factories';
import { mockTreatmentDocument } from '../../mocks';

describe('TreatmentsController', () => {
  let controller: TreatmentsController;
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      sendStatus: vi.fn().mockReturnThis(),
    };

    controller = new TreatmentsController();
  });

  it('should retrieve all treatments using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockTreatmentDocument]);

    vi.spyOn(factories, 'getAllTreatmentsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: {} };
    await controller.index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith(undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockTreatmentDocument]);
  });

  it('should retrieve all treatments using a specified sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockTreatmentDocument]);

    vi.spyOn(factories, 'getAllTreatmentsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: { order: 'desc' } };
    await controller.index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockTreatmentDocument]);
  });

  it('should retrieve a treatment by its id', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockTreatmentDocument);

    vi.spyOn(factories, 'getTreatmentByIdUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await controller.show(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockTreatmentDocument);
  });

  it('should create and return a new treatment', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockTreatmentDocument);

    vi.spyOn(factories, 'createTreatmentUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { body: { name: 'New Treatment' } };
    await controller.create(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith({ name: 'New Treatment' });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockTreatmentDocument);
  });

  it('should update and return an existing treatment', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockTreatmentDocument);

    vi.spyOn(factories, 'updateTreatmentUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      params: { id: '1' },
      body: { name: 'Updated Treatment' },
    };

    await controller.update(mockRequest, mockResponse);

    expect(executeMock).toHaveBeenCalledWith('1', {
      name: 'Updated Treatment',
    });

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockTreatmentDocument);
  });

  it('should delete a treatment by its id and return no content', async () => {
    const executeMock = vi.fn().mockResolvedValue(undefined);

    vi.spyOn(factories, 'deleteTreatmentUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await controller.delete(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });
});
