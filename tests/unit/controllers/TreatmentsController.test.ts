/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as factories from '../../../src/factories';
import { mockTreatmentDocument } from '../../mocks';

describe('TreatmentsController', () => {
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

  it('should retrieve all treatments using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockTreatmentDocument]);

    vi.spyOn(factories, 'getAllTreatmentsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: {} };
    await factories.treatmentsController().index(mockRequest, mockResponse);
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
    await factories.treatmentsController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockTreatmentDocument]);
  });

  it('should retrieve all treatments by patient using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockTreatmentDocument]);

    vi.spyOn(factories, 'getAllTreatmentsByPatientUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { patientId: 'patient123' }, query: {} };
    await factories
      .treatmentsController()
      .indexByPatient(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('patient123', undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockTreatmentDocument]);
  });

  it('should retrieve all treatments by patient using a specified sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockTreatmentDocument]);

    vi.spyOn(factories, 'getAllTreatmentsByPatientUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      params: { patientId: 'patient123' },
      query: { order: 'desc' },
    };
    await factories
      .treatmentsController()
      .indexByPatient(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('patient123', 'desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockTreatmentDocument]);
  });

  it('should retrieve a treatment by its id', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockTreatmentDocument);

    vi.spyOn(factories, 'getTreatmentByIdUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.treatmentsController().show(mockRequest, mockResponse);
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
    await factories.treatmentsController().create(mockRequest, mockResponse);
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

    await factories.treatmentsController().update(mockRequest, mockResponse);

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
    await factories.treatmentsController().delete(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });
});
