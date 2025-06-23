import { describe, expect, it } from 'vitest';

import { GetNotificationByIdUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockNotificationDocument,
  mockNotificationsRepository,
  mockObjectId,
} from '../../../mocks';

describe('GetNotificationByIdUseCase.ts', async () => {
  const useCase = new GetNotificationByIdUseCase(mockNotificationsRepository);
  mockNotificationsRepository.find.mockResolvedValue(mockNotificationDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should throw NotFoundError when notification does not exist', async () => {
    mockNotificationsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockNotificationsRepository.find).toHaveBeenCalled();
  });

  it('should get the notification after passing the validations', async () => {
    const useCaseReturn = await useCase.execute(mockObjectId);
    expect(mockNotificationsRepository.find).toHaveBeenCalled();
    expect(useCaseReturn).toBe(mockNotificationDocument);
  });
});
