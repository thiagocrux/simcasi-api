import { describe, expect, it } from 'vitest';

import { DeleteSessionUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockSessionDocument,
  mockSessionsRepository,
} from '../../../mocks';

describe('DeleteSessionUseCase.ts', async () => {
  const useCase = new DeleteSessionUseCase(mockSessionsRepository);
  mockSessionsRepository.find.mockResolvedValue(mockSessionDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should find an existing session before deleting', async () => {
    await useCase.execute(mockObjectId);
    expect(mockSessionsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when session does not exist', async () => {
    mockSessionsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockSessionsRepository.find).toHaveBeenCalled();
  });

  it('should delete session after passing the validations', async () => {
    await useCase.execute(mockObjectId);
    expect(mockSessionsRepository.find).toHaveBeenCalled();
    expect(mockSessionsRepository.delete).toHaveBeenCalled();
  });
});
