/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as factories from '../../../src/factories';
import { mockExamDocument } from '../../mocks';

describe('ExamsController', () => {
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

  it('should retrieve all exams using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockExamDocument]);

    vi.spyOn(factories, 'getAllExamsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: {} };
    await factories.examsController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith(undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockExamDocument]);
  });

  it('should retrieve all exams using a specified sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockExamDocument]);

    vi.spyOn(factories, 'getAllExamsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: { order: 'desc' } };
    await factories.examsController().index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockExamDocument]);
  });

  it('should retrieve all exams by patient using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockExamDocument]);

    vi.spyOn(factories, 'getAllExamsByPatientUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { patientId: 'patient123' }, query: {} };
    await factories.examsController().indexByPatient(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('patient123', undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockExamDocument]);
  });

  it('should retrieve all exams by patient using a specified sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockExamDocument]);

    vi.spyOn(factories, 'getAllExamsByPatientUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      params: { patientId: 'patient123' },
      query: { order: 'desc' },
    };
    await factories.examsController().indexByPatient(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('patient123', 'desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockExamDocument]);
  });

  it('should retrieve an exam by its id', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockExamDocument);

    vi.spyOn(factories, 'getExamByIdUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.examsController().show(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockExamDocument);
  });

  it('should create and return a new exam', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockExamDocument);

    vi.spyOn(factories, 'createExamUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { body: { name: 'New Exam' } };
    await factories.examsController().create(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith({ name: 'New Exam' });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockExamDocument);
  });

  it('should update and return an existing exam', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockExamDocument);

    vi.spyOn(factories, 'updateExamUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      params: { id: '1' },
      body: { name: 'Updated Exam' },
    };

    await factories.examsController().update(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1', { name: 'Updated Exam' });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockExamDocument);
  });

  it('should delete an exam by its id and return no content', async () => {
    const executeMock = vi.fn().mockResolvedValue(undefined);

    vi.spyOn(factories, 'deleteExamUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await factories.examsController().delete(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });
});
