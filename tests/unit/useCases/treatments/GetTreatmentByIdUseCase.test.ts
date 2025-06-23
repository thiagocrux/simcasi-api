import { describe, expect, it } from 'vitest';

import { GetTreatmentByIdUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockTreatmentDocument,
  mockTreatmentsRepository,
} from '../../../mocks';

describe('GetTreatmentByIdUseCase.ts', async () => {
  const useCase = new GetTreatmentByIdUseCase(mockTreatmentsRepository);
  mockTreatmentsRepository.find.mockResolvedValue(mockTreatmentDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should throw NotFoundError when treatment does not exist', async () => {
    mockTreatmentsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockTreatmentsRepository.find).toHaveBeenCalled();
  });

  it('should get the treatment after passing the validations', async () => {
    const useCaseReturn = await useCase.execute(mockObjectId);
    expect(mockTreatmentsRepository.find).toHaveBeenCalled();
    expect(useCaseReturn).toBe(mockTreatmentDocument);
  });
});
