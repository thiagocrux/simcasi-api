/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PatientsController } from '../../../src/controllers';
import * as factories from '../../../src/factories';
import { mockPatientDocument } from '../../mocks';

describe('PatientsController', () => {
  let controller: PatientsController;
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      sendStatus: vi.fn().mockReturnThis(),
    };

    controller = new PatientsController();
  });

  it('should retrieve all patients using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockPatientDocument]);

    vi.spyOn(factories, 'createGetAllPatientsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: {} };
    await controller.index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith(undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockPatientDocument]);
  });

  it('should retrieve all patients using a specified sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockPatientDocument]);

    vi.spyOn(factories, 'createGetAllPatientsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: { order: 'desc' } };
    await controller.index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockPatientDocument]);
  });

  it('should retrieve a patient by its id', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockPatientDocument);

    vi.spyOn(factories, 'createGetPatientByIdUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await controller.show(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockPatientDocument);
  });

  it('should create and return a new patient', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockPatientDocument);

    vi.spyOn(factories, 'createCreatePatientUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { body: { name: 'New Patient' } };
    await controller.create(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith({ name: 'New Patient' });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockPatientDocument);
  });

  it('should update and return an existing patient', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockPatientDocument);

    vi.spyOn(factories, 'createUpdatePatientUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      params: { id: '1' },
      body: { name: 'Updated Patient' },
    };

    await controller.update(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1', { name: 'Updated Patient' });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockPatientDocument);
  });

  it('should delete a patient by its id and return no content', async () => {
    const executeMock = vi.fn().mockResolvedValue(undefined);

    vi.spyOn(factories, 'createDeletePatientUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await controller.delete(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });
});
