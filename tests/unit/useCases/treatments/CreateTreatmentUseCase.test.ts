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

describe('CreateTreatmentUseCase', async () => {
  const useCase = new CreateTreatmentUseCase(
    mockTreatmentsRepository,
    mockPatientsRepository
  );

  mockPatientsRepository.find.mockResolvedValue(mockPatientDocument);
  mockTreatmentsRepository.create.mockResolvedValue(mockTreatmentDocument);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(CreateTreatmentSchema, 'parse');

    await expect(
      // @ts-expect-error: deliberate wrong param type for testing purposes
      useCase.execute({ ...mockCreateTreatmentDTO, healthCenter: 0 })
    ).rejects.toThrow();

    expect(validationSpy).toHaveBeenCalled();
  });

  it('should find the patient associated to the treatment', async () => {
    await useCase.execute(mockCreateTreatmentDTO);
    expect(mockPatientsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when associated patient does not exist', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(null);

    await expect(useCase.execute(mockCreateTreatmentDTO)).rejects.toThrow(
      NotFoundError
    );

    expect(mockPatientsRepository.find).toHaveBeenCalled();
  });

  it('should create a new treatment after passing the validations', async () => {
    await useCase.execute(mockCreateTreatmentDTO);
    expect(mockPatientsRepository.find).toHaveBeenCalled();
    expect(mockTreatmentsRepository.create).toHaveBeenCalled();
  });
});
