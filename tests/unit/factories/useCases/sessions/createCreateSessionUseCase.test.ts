import { describe, expect, it } from 'vitest';

import { createCreateSessionUseCase } from '../../../../../src/factories/useCases/sessions/createCreateSessionUseCase';
import { CreateSessionUseCase } from '../../../../../src/useCases/sessions/CreateSessionUseCase';

describe('createCreateSessionUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createCreateSessionUseCase).toBe('function');
  });

  it('should return an instance of CreateSessionUseCase', () => {
    const useCase = createCreateSessionUseCase();
    expect(useCase).toBeInstanceOf(CreateSessionUseCase);
  });
});
