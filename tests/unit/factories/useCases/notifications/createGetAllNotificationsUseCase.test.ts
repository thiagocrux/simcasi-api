import { describe, expect, it } from 'vitest';

import { createGetAllNotificationsUseCase } from '../../../../../src/factories/useCases/notifications/createGetAllNotificationsUseCase';
import { GetAllNotificationsUseCase } from '../../../../../src/useCases/notifications/GetAllNotificationsUseCase';

describe('createGetAllNotificationsUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetAllNotificationsUseCase).toBe('function');
  });

  it('should return an instance of GetAllNotificationsUseCase', () => {
    const useCase = createGetAllNotificationsUseCase();
    expect(useCase).toBeInstanceOf(GetAllNotificationsUseCase);
  });
});
