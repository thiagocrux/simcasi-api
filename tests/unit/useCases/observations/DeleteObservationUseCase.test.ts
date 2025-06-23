import { describe, expect, it } from 'vitest';

import { DeleteObservationUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockObservationDocument,
  mockObservationsRepository,
} from '../../../mocks';

describe('DeleteObservationUseCase.ts', async () => {
  const useCase = new DeleteObservationUseCase(mockObservationsRepository);
  mockObservationsRepository.find.mockResolvedValue(mockObservationDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should find an existing observation before deleting', async () => {
    await useCase.execute(mockObjectId);
    expect(mockObservationsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when observation does not exist', async () => {
    mockObservationsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockObservationsRepository.find).toHaveBeenCalled();
  });

  it('should delete observation after passing the validations', async () => {
    await useCase.execute(mockObjectId);
    expect(mockObservationsRepository.find).toHaveBeenCalled();
    expect(mockObservationsRepository.delete).toHaveBeenCalled();
  });
});
