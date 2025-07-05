import { describe, expect, it } from 'vitest';

import { getNotificationByIdUseCase } from '../../../../../src/factories/useCases/notifications/getNotificationByIdUseCase';
import { GetNotificationByIdUseCase } from '../../../../../src/useCases/notifications/GetNotificationByIdUseCase';

describe('getNotificationByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getNotificationByIdUseCase).toBe('function');
  });

  it('should return an instance of GetNotificationByIdUseCase', () => {
    const useCase = getNotificationByIdUseCase();
    expect(useCase).toBeInstanceOf(GetNotificationByIdUseCase);
  });
});
