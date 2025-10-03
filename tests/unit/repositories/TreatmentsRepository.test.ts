/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Treatment } from '../../../src/models';
import { TreatmentsRepository } from '../../../src/repositories/TreatmentsRepository';

import {
  mockCreateTreatmentDTO,
  mockTreatmentDocument,
  mockUpdateTreatmentDTO,
} from '../../mocks/treatmentMocks';

vi.mock('../../../src/models', () => ({
  Treatment: {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
  },
}));

describe('TreatmentsRepository', () => {
  let treatmentsRepository: TreatmentsRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    treatmentsRepository = new TreatmentsRepository();
  });

  it('should retrieve all treatments in descending order', async () => {
    (Treatment.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          { ...mockTreatmentDocument, _id: 'other' },
          mockTreatmentDocument,
        ]),
    });

    const result = await treatmentsRepository.findAll('desc');
    expect(Treatment.find).toHaveBeenCalled();

    expect(result).toEqual([
      { ...mockTreatmentDocument, _id: 'other' },
      mockTreatmentDocument,
    ]);
  });

  it('should retrieve all treatments in ascending order', async () => {
    (Treatment.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          mockTreatmentDocument,
          { ...mockTreatmentDocument, _id: 'other' },
        ]),
    });

    const result = await treatmentsRepository.findAll('asc');
    expect(Treatment.find).toHaveBeenCalled();

    expect(result).toEqual([
      mockTreatmentDocument,
      { ...mockTreatmentDocument, _id: 'other' },
    ]);
  });

  it('should retrieve all treatments by patient in descending order', async () => {
    (Treatment.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          { ...mockTreatmentDocument, _id: 'other' },
          mockTreatmentDocument,
        ]),
    });

    const result = await treatmentsRepository.findAllByPatient(
      'patient123',
      'desc'
    );
    expect(Treatment.find).toHaveBeenCalledWith({ patient: 'patient123' });

    expect(result).toEqual([
      { ...mockTreatmentDocument, _id: 'other' },
      mockTreatmentDocument,
    ]);
  });

  it('should retrieve all treatments by patient in ascending order', async () => {
    (Treatment.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          mockTreatmentDocument,
          { ...mockTreatmentDocument, _id: 'other' },
        ]),
    });

    const result = await treatmentsRepository.findAllByPatient(
      'patient123',
      'asc'
    );
    expect(Treatment.find).toHaveBeenCalledWith({ patient: 'patient123' });

    expect(result).toEqual([
      mockTreatmentDocument,
      { ...mockTreatmentDocument, _id: 'other' },
    ]);
  });

  it('should find a treatment by filter', async () => {
    (Treatment.findOne as any).mockResolvedValueOnce(mockTreatmentDocument);

    const result = await treatmentsRepository.find({
      _id: mockTreatmentDocument._id,
    });

    expect(Treatment.findOne).toHaveBeenCalledWith({
      _id: mockTreatmentDocument._id,
    });

    expect(result).toEqual(mockTreatmentDocument);
  });

  it('should create a new treatment', async () => {
    (Treatment.create as any).mockResolvedValueOnce(mockTreatmentDocument);
    const result = await treatmentsRepository.create(mockCreateTreatmentDTO);
    expect(Treatment.create).toHaveBeenCalledWith(mockCreateTreatmentDTO);
    expect(result).toEqual(mockTreatmentDocument);
  });

  it('should update an existing treatment', async () => {
    (Treatment.findOneAndUpdate as any).mockResolvedValueOnce(
      mockTreatmentDocument
    );

    const result = await treatmentsRepository.update(
      { _id: mockTreatmentDocument._id },
      mockUpdateTreatmentDTO
    );

    expect(Treatment.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockTreatmentDocument._id },
      mockUpdateTreatmentDTO,
      { new: true }
    );

    expect(result).toEqual(mockTreatmentDocument);
  });

  it('should delete a treatment by filter', async () => {
    (Treatment.findOneAndDelete as any).mockResolvedValueOnce(undefined);
    await treatmentsRepository.delete({ _id: mockTreatmentDocument._id });

    expect(Treatment.findOneAndDelete).toHaveBeenCalledWith({
      _id: mockTreatmentDocument._id,
    });
  });
});
