import { describe, expect, it, vi } from 'vitest';

import { UpdateNotificationSchema } from '../../../../src/schemas';
import { UpdateNotificationUseCase } from '../../../../src/useCases';
import { InvalidIdentifierError, NotFoundError } from '../../../../src/utils';

import {
  mockInvalidObjectId,
  mockNotificationDocument,
  mockNotificationsRepository,
  mockObjectId,
  mockUpdateNotificationDTO,
} from '../../../mocks';

describe('UpdateNotificationUseCase.ts', async () => {
  const useCase = new UpdateNotificationUseCase(mockNotificationsRepository);
  mockNotificationsRepository.find.mockResolvedValue(mockNotificationDocument);

  mockNotificationsRepository.update.mockResolvedValue(
    mockNotificationDocument
  );

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(UpdateNotificationSchema, 'parse');

    await expect(
      useCase.execute(mockObjectId, {
        ...mockUpdateNotificationDTO,
        // @ts-expect-error: deliberate error for testing purposes
        observations: 0,
      })
    ).rejects.toThrow();

    expect(validationSpy).toHaveBeenCalled();
  });

  it('should throw InvalidIdentifierError when id has invalid mongodb objectId format', async () => {
    await expect(
      useCase.execute(mockInvalidObjectId, mockUpdateNotificationDTO)
    ).rejects.toThrow(InvalidIdentifierError);
  });

  it('should find an existing notification before updating', async () => {
    await useCase.execute(mockObjectId, mockUpdateNotificationDTO);
    expect(mockNotificationsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when notification does not exist', async () => {
    mockNotificationsRepository.find.mockResolvedValueOnce(null);

    await expect(
      useCase.execute(mockObjectId, mockUpdateNotificationDTO)
    ).rejects.toThrow(NotFoundError);

    expect(mockNotificationsRepository.find).toHaveBeenCalled();
  });

  it('should update the notification after passing the validations', async () => {
    const updatedNotification = await useCase.execute(
      mockObjectId,
      mockUpdateNotificationDTO
    );

    expect(mockNotificationsRepository.find).toHaveBeenCalled();
    expect(mockNotificationsRepository.update).toHaveBeenCalled();
    expect(updatedNotification?._id).toBe(mockNotificationDocument._id);
  });
});
