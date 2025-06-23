import { describe, expect, it, vi } from 'vitest';

import { UpdateExamSchema } from '../../../../src/schemas';
import { UpdateExamUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockExamDocument,
  mockExamsRepository,
  mockInvalidObjectId,
  mockObjectId,
  mockUpdateExamDTO,
} from '../../../mocks';

describe('UpdateExamUseCase.ts', async () => {
  const useCase = new UpdateExamUseCase(mockExamsRepository);
  mockExamsRepository.find.mockResolvedValue(mockExamDocument);
  mockExamsRepository.update.mockResolvedValue(mockExamDocument);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(UpdateExamSchema, 'parse');

    await expect(
      useCase.execute(mockObjectId, {
        ...mockUpdateExamDTO,
        // @ts-expect-error: deliberate error for testing purposes
        treponemalTestType: 0,
      })
    ).rejects.toThrow();

    expect(validationSpy).toHaveBeenCalled();
  });

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(
      useCase.execute(mockInvalidObjectId, mockUpdateExamDTO)
    ).rejects.toThrow(InvalidIdentifierError);
  });

  it('should find an existing exam before updating', async () => {
    await useCase.execute(mockObjectId, mockUpdateExamDTO);
    expect(mockExamsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when exam does not exist', async () => {
    mockExamsRepository.find.mockResolvedValueOnce(null);

    await expect(
      useCase.execute(mockObjectId, mockUpdateExamDTO)
    ).rejects.toThrow(NotFoundError);

    expect(mockExamsRepository.find).toHaveBeenCalled();
  });

  it('should update the exam after passing the validations', async () => {
    const updatedExam = await useCase.execute(mockObjectId, mockUpdateExamDTO);
    expect(mockExamsRepository.find).toHaveBeenCalled();
    expect(mockExamsRepository.update).toHaveBeenCalled();
    expect(updatedExam?._id).toBe(mockExamDocument._id);
  });
});
