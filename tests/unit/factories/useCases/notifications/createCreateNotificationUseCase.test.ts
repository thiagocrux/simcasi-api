import { describe, expect, it } from 'vitest';

import { createCreateNotificationUseCase } from '../../../../../src/factories/useCases/notifications/createCreateNotificationUseCase';
import { CreateNotificationUseCase } from '../../../../../src/useCases/notifications/CreateNotificationUseCase';

describe('createCreateNotificationUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createCreateNotificationUseCase).toBe('function');
  });

  it('should return an instance of CreateNotificationUseCase', () => {
    const useCase = createCreateNotificationUseCase();
    expect(useCase).toBeInstanceOf(CreateNotificationUseCase);
  });
});
