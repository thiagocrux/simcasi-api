import { describe, expect, it } from 'vitest';

import { createDeleteSessionUseCase } from '../../../../../src/factories/useCases/sessions/createDeleteSessionUseCase';
import { DeleteSessionUseCase } from '../../../../../src/useCases/sessions/DeleteSessionUseCase';

describe('createDeleteSessionUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createDeleteSessionUseCase).toBe('function');
  });

  it('should return an instance of DeleteSessionUseCase', () => {
    const useCase = createDeleteSessionUseCase();
    expect(useCase).toBeInstanceOf(DeleteSessionUseCase);
  });
});
