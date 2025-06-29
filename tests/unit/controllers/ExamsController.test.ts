/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ExamsController } from '../../../src/controllers';
import * as factories from '../../../src/factories';
import { mockExamDocument } from '../../mocks';

describe('ExamsController', () => {
  let controller: ExamsController;
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      sendStatus: vi.fn().mockReturnThis(),
    };

    controller = new ExamsController();
  });

  it('should retrieve all exams using the default sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockExamDocument]);

    vi.spyOn(factories, 'createGetAllExamsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: {} };
    await controller.index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith(undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockExamDocument]);
  });

  it('should retrieve all exams using a specified sort order', async () => {
    const executeMock = vi.fn().mockResolvedValue([mockExamDocument]);

    vi.spyOn(factories, 'createGetAllExamsUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { query: { order: 'desc' } };
    await controller.index(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('desc');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([mockExamDocument]);
  });

  it('should retrieve an exam by its id', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockExamDocument);

    vi.spyOn(factories, 'createGetExamByIdUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await controller.show(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockExamDocument);
  });

  it('should create and return a new exam', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockExamDocument);

    vi.spyOn(factories, 'createCreateExamUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { body: { name: 'New Exam' } };
    await controller.create(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith({ name: 'New Exam' });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockExamDocument);
  });

  it('should update and return an existing exam', async () => {
    const executeMock = vi.fn().mockResolvedValue(mockExamDocument);

    vi.spyOn(factories, 'createUpdateExamUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = {
      params: { id: '1' },
      body: { name: 'Updated Exam' },
    };

    await controller.update(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1', { name: 'Updated Exam' });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockExamDocument);
  });

  it('should delete an exam by its id and return no content', async () => {
    const executeMock = vi.fn().mockResolvedValue(undefined);

    vi.spyOn(factories, 'createDeleteExamUseCase').mockReturnValue({
      execute: executeMock,
    } as any);

    mockRequest = { params: { id: '1' } };
    await controller.delete(mockRequest, mockResponse);
    expect(executeMock).toHaveBeenCalledWith('1');
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });
});
