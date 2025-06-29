import { describe, expect, it } from 'vitest';

import { GetExamByIdUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockExamDocument,
  mockExamsRepository,
  mockInvalidObjectId,
  mockObjectId,
} from '../../../mocks';

describe('GetExamByIdUseCase', async () => {
  const useCase = new GetExamByIdUseCase(mockExamsRepository);
  mockExamsRepository.find.mockResolvedValue(mockExamDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should throw NotFoundError when exam does not exist', async () => {
    mockExamsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockExamsRepository.find).toHaveBeenCalled();
  });

  it('should get the exam after passing the validations', async () => {
    const useCaseReturn = await useCase.execute(mockObjectId);
    expect(mockExamsRepository.find).toHaveBeenCalled();
    expect(useCaseReturn).toBe(mockExamDocument);
  });
});
