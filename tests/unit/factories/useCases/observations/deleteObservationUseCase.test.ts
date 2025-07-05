import { describe, expect, it } from 'vitest';

import { deleteObservationUseCase } from '../../../../../src/factories/useCases/observations/deleteObservationUseCase';
import { DeleteObservationUseCase } from '../../../../../src/useCases/observations/DeleteObservationUseCase';

describe('deleteObservationUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof deleteObservationUseCase).toBe('function');
  });

  it('should return an instance of DeleteObservationUseCase', () => {
    const useCase = deleteObservationUseCase();
    expect(useCase).toBeInstanceOf(DeleteObservationUseCase);
  });
});
