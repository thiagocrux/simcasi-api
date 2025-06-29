import { describe, expect, it } from 'vitest';

import { DeleteNotificationUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockNotificationDocument,
  mockNotificationsRepository,
  mockObjectId,
} from '../../../mocks';

describe('DeleteNotificationUseCase', async () => {
  const useCase = new DeleteNotificationUseCase(mockNotificationsRepository);
  mockNotificationsRepository.find.mockResolvedValue(mockNotificationDocument);

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(useCase.execute(mockInvalidObjectId)).rejects.toThrow(
      InvalidIdentifierError
    );
  });

  it('should find an existing notification before deleting', async () => {
    await useCase.execute(mockObjectId);
    expect(mockNotificationsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when notification does not exist', async () => {
    mockNotificationsRepository.find.mockResolvedValueOnce(null);
    await expect(useCase.execute(mockObjectId)).rejects.toThrow(NotFoundError);
    expect(mockNotificationsRepository.find).toHaveBeenCalled();
  });

  it('should delete notification after passing the validations', async () => {
    await useCase.execute(mockObjectId);
    expect(mockNotificationsRepository.find).toHaveBeenCalled();
    expect(mockNotificationsRepository.delete).toHaveBeenCalled();
  });
});
