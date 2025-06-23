import { describe, expect, it } from 'vitest';

import { GetObservationByIdUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockObservationDocument,
  mockObservationsRepository,
} from '../../../mocks';

describe('GetObservationByIdUseCase.ts', async () => {
  const useCase = new GetObservationByIdUseCase(mockObservationsRepository);
  mockObservationsRepository.find.mockResolvedValue(mockObservationDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should throw NotFoundError when observation does not exist', async () => {
    mockObservationsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockObservationsRepository.find).toHaveBeenCalled();
  });

  it('should get the observation after passing the validations', async () => {
    const useCaseReturn = await useCase.execute(mockObjectId);
    expect(mockObservationsRepository.find).toHaveBeenCalled();
    expect(useCaseReturn).toBe(mockObservationDocument);
  });
});
