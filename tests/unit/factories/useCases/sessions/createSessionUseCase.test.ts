import { describe, expect, it } from 'vitest';

import { createSessionUseCase } from '../../../../../src/factories/useCases/sessions/createSessionUseCase';
import { CreateSessionUseCase } from '../../../../../src/useCases/sessions/CreateSessionUseCase';

describe('createSessionUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createSessionUseCase).toBe('function');
  });

  it('should return an instance of CreateSessionUseCase', () => {
    const useCase = createSessionUseCase();
    expect(useCase).toBeInstanceOf(CreateSessionUseCase);
  });
});
