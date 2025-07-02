import { describe, expect, it } from 'vitest';

import { createUpdateNotificationUseCase } from '../../../../../src/factories/useCases/notifications/createUpdateNotificationUseCase';
import { UpdateNotificationUseCase } from '../../../../../src/useCases/notifications/UpdateNotificationUseCase';

describe('createUpdateNotificationUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createUpdateNotificationUseCase).toBe('function');
  });

  it('should return an instance of UpdateNotificationUseCase', () => {
    const useCase = createUpdateNotificationUseCase();
    expect(useCase).toBeInstanceOf(UpdateNotificationUseCase);
  });
});
