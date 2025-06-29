import { describe, expect, it, vi } from 'vitest';

import { CreateExamSchema } from '../../../../src/schemas';
import { CreateExamUseCase } from '../../../../src/useCases';
import { NotFoundError } from '../../../../src/utils';

import {
  mockCreateExamDTO,
  mockExamDocument,
  mockExamsRepository,
  mockPatientDocument,
  mockPatientsRepository,
} from '../../../mocks';

describe('CreateExamUseCase.ts', async () => {
  const useCase = new CreateExamUseCase(
    mockExamsRepository,
    mockPatientsRepository
  );

  mockExamsRepository.create.mockResolvedValue(mockExamDocument);
  mockPatientsRepository.find.mockResolvedValue(mockPatientDocument);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(CreateExamSchema, 'parse');

    await expect(
      // @ts-expect-error: deliberate wrong param type for testing purposes
      useCase.execute({ ...mockCreateExamDTO, treponemalTestType: 0 })
    ).rejects.toThrow();

    expect(validationSpy).toHaveBeenCalled();
  });

  it('should find the patient associated to the exam', async () => {
    await useCase.execute(mockCreateExamDTO);
    expect(mockPatientsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when associated patient does not exist', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(null);

    await expect(useCase.execute(mockCreateExamDTO)).rejects.toThrow(
      NotFoundError
    );

    expect(mockPatientsRepository.find).toHaveBeenCalled();
  });

  it('should create a new exam after passing the validations', async () => {
    await useCase.execute(mockCreateExamDTO);
    expect(mockPatientsRepository.find).toHaveBeenCalled();
    expect(mockExamsRepository.create).toHaveBeenCalled();
  });
});
