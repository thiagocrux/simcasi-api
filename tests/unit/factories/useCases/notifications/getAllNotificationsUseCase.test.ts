import { describe, expect, it } from 'vitest';

import { getAllNotificationsUseCase } from '../../../../../src/factories/useCases/notifications/getAllNotificationsUseCase';
import { GetAllNotificationsUseCase } from '../../../../../src/useCases/notifications/GetAllNotificationsUseCase';

describe('getAllNotificationsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getAllNotificationsUseCase).toBe('function');
  });

  it('should return an instance of GetAllNotificationsUseCase', () => {
    const useCase = getAllNotificationsUseCase();
    expect(useCase).toBeInstanceOf(GetAllNotificationsUseCase);
  });
});
