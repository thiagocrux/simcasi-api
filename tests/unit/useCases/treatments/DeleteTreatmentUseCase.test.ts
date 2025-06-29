import { describe, expect, it } from 'vitest';

import { DeleteTreatmentUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockTreatmentDocument,
  mockTreatmentsRepository,
} from '../../../mocks';

describe('DeleteTreatmentUseCase', async () => {
  const useCase = new DeleteTreatmentUseCase(mockTreatmentsRepository);
  mockTreatmentsRepository.find.mockResolvedValue(mockTreatmentDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should find an existing treatment before deleting', async () => {
    await useCase.execute(mockObjectId);
    expect(mockTreatmentsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when treatment does not exist', async () => {
    mockTreatmentsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockTreatmentsRepository.find).toHaveBeenCalled();
  });

  it('should delete treatment after passing the validations', async () => {
    await useCase.execute(mockObjectId);
    expect(mockTreatmentsRepository.find).toHaveBeenCalled();
    expect(mockTreatmentsRepository.delete).toHaveBeenCalled();
  });
});
