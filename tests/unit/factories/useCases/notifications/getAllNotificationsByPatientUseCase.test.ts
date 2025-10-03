import { describe, expect, it } from 'vitest';

import { getAllNotificationsByPatientUseCase } from '../../../../../src/factories/useCases/notifications/getAllNotificationsByPatientUseCase';
import { GetAllNotificationsByPatientUseCase } from '../../../../../src/useCases/notifications/GetAllNotificationsByPatientUseCase';

describe('getAllNotificationsByPatientUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getAllNotificationsByPatientUseCase).toBe('function');
  });

  it('should return an instance of GetAllNotificationsByPatientUseCase', () => {
    const useCase = getAllNotificationsByPatientUseCase();
    expect(useCase).toBeInstanceOf(GetAllNotificationsByPatientUseCase);
  });
});
