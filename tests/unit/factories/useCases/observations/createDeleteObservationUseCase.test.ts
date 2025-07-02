import { describe, expect, it } from 'vitest';

import { createDeleteObservationUseCase } from '../../../../../src/factories/useCases/observations/createDeleteObservationUseCase';
import { DeleteObservationUseCase } from '../../../../../src/useCases/observations/DeleteObservationUseCase';

describe('createDeleteObservationUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createDeleteObservationUseCase).toBe('function');
  });

  it('should return an instance of DeleteObservationUseCase', () => {
    const useCase = createDeleteObservationUseCase();
    expect(useCase).toBeInstanceOf(DeleteObservationUseCase);
  });
});
