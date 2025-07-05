import { describe, expect, it } from 'vitest';

import { updateObservationUseCase } from '../../../../../src/factories/useCases/observations/updateObservationUseCase';
import { UpdateObservationUseCase } from '../../../../../src/useCases/observations/UpdateObservationUseCase';

describe('updateObservationUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof updateObservationUseCase).toBe('function');
  });

  it('should return an instance of UpdateObservationUseCase', () => {
    const useCase = updateObservationUseCase();
    expect(useCase).toBeInstanceOf(UpdateObservationUseCase);
  });
});
