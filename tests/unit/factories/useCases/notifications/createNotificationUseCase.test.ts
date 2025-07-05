import { describe, expect, it } from 'vitest';

import { createNotificationUseCase } from '../../../../../src/factories/useCases/notifications/createNotificationUseCase';
import { CreateNotificationUseCase } from '../../../../../src/useCases/notifications/CreateNotificationUseCase';

describe('createNotificationUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createNotificationUseCase).toBe('function');
  });

  it('should return an instance of CreateNotificationUseCase', () => {
    const useCase = createNotificationUseCase();
    expect(useCase).toBeInstanceOf(CreateNotificationUseCase);
  });
});
