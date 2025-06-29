import { describe, expect, it, vi } from 'vitest';

import { CreateNotificationSchema } from '../../../../src/schemas';
import { CreateNotificationUseCase } from '../../../../src/useCases';
import { NotFoundError } from '../../../../src/utils';

import {
  mockCreateNotificationDTO,
  mockExamDocument,
  mockExamsRepository,
  mockNotificationDocument,
  mockNotificationsRepository,
  mockPatientDocument,
  mockPatientsRepository,
} from '../../../mocks';

describe('CreateNotificationUseCase', async () => {
  const useCase = new CreateNotificationUseCase(
    mockNotificationsRepository,
    mockPatientsRepository
  );

  mockNotificationsRepository.create.mockResolvedValue(
    mockNotificationDocument
  );

  mockExamsRepository.find.mockResolvedValue(mockExamDocument);
  mockPatientsRepository.find.mockResolvedValue(mockPatientDocument);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(CreateNotificationSchema, 'parse');

    await expect(
      // @ts-expect-error: deliberate wrong param type for testing purposes
      useCase.execute({ ...mockCreateNotificationDTO, sinan: 0 })
    ).rejects.toThrow();

    expect(validationSpy).toHaveBeenCalled();
  });

  it('should find the patient associated to the notification', async () => {
    await useCase.execute(mockCreateNotificationDTO);
    expect(mockPatientsRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundError when associated patient does not exist', async () => {
    mockPatientsRepository.find.mockResolvedValueOnce(null);

    await expect(useCase.execute(mockCreateNotificationDTO)).rejects.toThrow(
      NotFoundError
    );

    expect(mockPatientsRepository.find).toHaveBeenCalled();
  });

  it('should create a new notification after passing the validations', async () => {
    await useCase.execute(mockCreateNotificationDTO);
    expect(mockPatientsRepository.find).toHaveBeenCalled();
    expect(mockNotificationsRepository.create).toHaveBeenCalled();
  });
});
