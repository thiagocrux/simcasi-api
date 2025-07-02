import { describe, expect, it } from 'vitest';

import { createGetNotificationByIdUseCase } from '../../../../../src/factories/useCases/notifications/createGetNotificationByIdUseCase';
import { GetNotificationByIdUseCase } from '../../../../../src/useCases/notifications/GetNotificationByIdUseCase';

describe('createGetNotificationByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetNotificationByIdUseCase).toBe('function');
  });

  it('should return an instance of GetNotificationByIdUseCase', () => {
    const useCase = createGetNotificationByIdUseCase();
    expect(useCase).toBeInstanceOf(GetNotificationByIdUseCase);
  });
});
