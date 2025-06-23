import { describe, expect, it, vi } from 'vitest';

import { CreateTreatmentSchema } from '../../../../src/schemas';
import { CreateTreatmentUseCase } from '../../../../src/useCases';
import { NotFoundError } from '../../../../src/utils';

import {
  mockCreateTreatmentDTO,
  mockPatientDocument,
  mockPatientsRepository,
  mockTreatmentDocument,
  mockTreatmentsRepository,
} from '../../../mocks';

describe('CreateTreatmentUseCase.ts', async () => {
  const useCase = new CreateTreatmentUseCase(
    mockTreatmentsRepository,
    mockPatientsRepository
  );

  mockTreatmentsRepository.create.mockResolvedValue(mockTreatmentDocument);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(CreateTreatmentSchema, 'parse');
    await expect(
      // @ts-expect-error: deliberate wrong param type for testing purposes
      useCase.execute({ ...mockCreateTreatmentDTO, treponemalTestType: 0 })
    ).rejects.toThrow();
    expect(validationSpy).toBeCalled();
  });

  it('should find the patient associated to the treatment', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(mockPatientDocument);
    await useCase.execute(mockCreateTreatmentDTO);
    expect(mockPatientsRepository.find).toBeCalled();
  });

  it('should throw NotFoundError when associated patient does not exist', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(null);

    await expect(useCase.execute(mockCreateTreatmentDTO)).rejects.toThrow(
      NotFoundError
    );

    expect(mockPatientsRepository.find).toBeCalled();
  });

  it('should create a new treatment after passing the validations', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(mockPatientDocument);

    mockTreatmentsRepository.create.mockResolvedValueOnce(
      mockTreatmentDocument
    );

    await useCase.execute(mockCreateTreatmentDTO);
    expect(mockPatientsRepository.find).toBeCalled();
    expect(mockTreatmentsRepository.create).toBeCalled();
  });
});
