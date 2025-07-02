import { describe, expect, it } from 'vitest';

import { createDeleteNotificationUseCase } from '../../../../../src/factories/useCases/notifications/createDeleteNotificationUseCase';
import { DeleteNotificationUseCase } from '../../../../../src/useCases/notifications/DeleteNotificationUseCase';

describe('createDeleteNotificationUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createDeleteNotificationUseCase).toBe('function');
  });

  it('should return an instance of DeleteNotificationUseCase', () => {
    const useCase = createDeleteNotificationUseCase();
    expect(useCase).toBeInstanceOf(DeleteNotificationUseCase);
  });
});
