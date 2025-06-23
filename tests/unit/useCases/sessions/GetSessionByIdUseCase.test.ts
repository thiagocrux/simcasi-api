import { describe, expect, it } from 'vitest';

import { GetSessionByIdUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockObjectId,
  mockSessionDocument,
  mockSessionsRepository,
} from '../../../mocks';

describe('GetSessionByIdUseCase.ts', async () => {
  const useCase = new GetSessionByIdUseCase(mockSessionsRepository);
  mockSessionsRepository.find.mockResolvedValue(mockSessionDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should throw NotFoundError when session does not exist', async () => {
    mockSessionsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockSessionsRepository.find).toHaveBeenCalled();
  });

  it('should get the session after passing the validations', async () => {
    const useCaseReturn = await useCase.execute(mockObjectId);
    expect(mockSessionsRepository.find).toHaveBeenCalled();
    expect(useCaseReturn).toBe(mockSessionDocument);
  });
});
