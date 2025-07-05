import { describe, expect, it } from 'vitest';

import { deleteSessionUseCase } from '../../../../../src/factories/useCases/sessions/deleteSessionUseCase';
import { DeleteSessionUseCase } from '../../../../../src/useCases/sessions/DeleteSessionUseCase';

describe('deleteSessionUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof deleteSessionUseCase).toBe('function');
  });

  it('should return an instance of DeleteSessionUseCase', () => {
    const useCase = deleteSessionUseCase();
    expect(useCase).toBeInstanceOf(DeleteSessionUseCase);
  });
});
