import { describe, expect, it } from 'vitest';

import { GetAllNotificationsByPatientUseCase } from '../../../../src/useCases';
import { mockNotificationsRepository } from '../../../mocks';

describe('GetAllNotificationsByPatientUseCase', async () => {
  const useCase = new GetAllNotificationsByPatientUseCase(
    mockNotificationsRepository
  );
  mockNotificationsRepository.findAllByPatient.mockResolvedValue([]);

  it('should call findAllByPatient with "desc" order when orderBy is equal "desc"', async () => {
    await useCase.execute('patient123', 'desc');
    expect(mockNotificationsRepository.findAllByPatient).toHaveBeenCalledWith(
      'patient123',
      'desc'
    );
  });

  it('should call findAllByPatient with "asc" order when orderBy is not "desc"', async () => {
    await useCase.execute('patient123', 'asc');
    expect(mockNotificationsRepository.findAllByPatient).toHaveBeenCalledWith(
      'patient123',
      'asc'
    );
  });

  it('should get all notifications by patient after passing the validations', async () => {
    const useCaseReturn = await useCase.execute('patient123', 'asc');
    expect(mockNotificationsRepository.findAllByPatient).toHaveBeenCalled();
    expect(useCaseReturn).toStrictEqual([]);
  });
});
