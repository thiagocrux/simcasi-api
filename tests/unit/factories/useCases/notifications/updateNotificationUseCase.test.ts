import { describe, expect, it } from 'vitest';

import { updateNotificationUseCase } from '../../../../../src/factories/useCases/notifications/updateNotificationUseCase';
import { UpdateNotificationUseCase } from '../../../../../src/useCases/notifications/UpdateNotificationUseCase';

describe('updateNotificationUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof updateNotificationUseCase).toBe('function');
  });

  it('should return an instance of UpdateNotificationUseCase', () => {
    const useCase = updateNotificationUseCase();
    expect(useCase).toBeInstanceOf(UpdateNotificationUseCase);
  });
});
