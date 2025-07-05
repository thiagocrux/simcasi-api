import { describe, expect, it } from 'vitest';

import { deleteNotificationUseCase } from '../../../../../src/factories/useCases/notifications/deleteNotificationUseCase';
import { DeleteNotificationUseCase } from '../../../../../src/useCases/notifications/DeleteNotificationUseCase';

describe('deleteNotificationUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof deleteNotificationUseCase).toBe('function');
  });

  it('should return an instance of DeleteNotificationUseCase', () => {
    const useCase = deleteNotificationUseCase();
    expect(useCase).toBeInstanceOf(DeleteNotificationUseCase);
  });
});
