import { describe, expect, it } from 'vitest';

import { DeleteExamUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockExamDocument,
  mockExamsRepository,
  mockInvalidObjectId,
  mockObjectId,
} from '../../../mocks';

describe('DeleteExamUseCase', async () => {
  const useCase = new DeleteExamUseCase(mockExamsRepository);
  mockExamsRepository.find.mockResolvedValue(mockExamDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should find an existing exam before deleting', async () => {
    await useCase.execute(mockObjectId);
    expect(mockExamsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when exam does not exist', async () => {
    mockExamsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockExamsRepository.find).toHaveBeenCalled();
  });

  it('should delete exam after passing the validations', async () => {
    await useCase.execute(mockObjectId);
    expect(mockExamsRepository.find).toHaveBeenCalled();
    expect(mockExamsRepository.delete).toHaveBeenCalled();
  });
});
