/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Patient } from '../../../src/models';
import PatientsRepository from '../../../src/repositories/PatientsRepository';

import {
  mockCreatePatientDTO,
  mockPatientDocument,
  mockUpdatePatientDTO,
} from '../../mocks/patientMocks';

vi.mock('../../../src/models', () => ({
  Patient: {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
  },
}));

describe('PatientsRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should retrieve all patients in descending order', async () => {
    (Patient.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          { ...mockPatientDocument, _id: 'other' },
          mockPatientDocument,
        ]),
    });

    const result = await PatientsRepository.findAll('desc');
    expect(Patient.find).toHaveBeenCalled();

    expect(result).toEqual([
      { ...mockPatientDocument, _id: 'other' },
      mockPatientDocument,
    ]);
  });

  it('should retrieve all patients in ascending order', async () => {
    (Patient.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          mockPatientDocument,
          { ...mockPatientDocument, _id: 'other' },
        ]),
    });

    const result = await PatientsRepository.findAll('asc');
    expect(Patient.find).toHaveBeenCalled();

    expect(result).toEqual([
      mockPatientDocument,
      { ...mockPatientDocument, _id: 'other' },
    ]);
  });

  it('should find a patient by filter', async () => {
    (Patient.findOne as any).mockResolvedValueOnce(mockPatientDocument);

    const result = await PatientsRepository.find({
      _id: mockPatientDocument._id,
    });

    expect(Patient.findOne).toHaveBeenCalledWith({
      _id: mockPatientDocument._id,
    });

    expect(result).toEqual(mockPatientDocument);
  });

  it('should create a new patient', async () => {
    (Patient.create as any).mockResolvedValueOnce(mockPatientDocument);
    const result = await PatientsRepository.create(mockCreatePatientDTO);
    expect(Patient.create).toHaveBeenCalledWith(mockCreatePatientDTO);
    expect(result).toEqual(mockPatientDocument);
  });

  it('should update an existing patient', async () => {
    (Patient.findOneAndUpdate as any).mockResolvedValueOnce(
      mockPatientDocument
    );

    const result = await PatientsRepository.update(
      { _id: mockPatientDocument._id },
      mockUpdatePatientDTO
    );

    expect(Patient.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockPatientDocument._id },
      mockUpdatePatientDTO,
      { new: true }
    );

    expect(result).toEqual(mockPatientDocument);
  });

  it('should delete a patient by filter', async () => {
    (Patient.findOneAndDelete as any).mockResolvedValueOnce(undefined);
    await PatientsRepository.delete({ _id: mockPatientDocument._id });

    expect(Patient.findOneAndDelete).toHaveBeenCalledWith({
      _id: mockPatientDocument._id,
    });
  });
});
