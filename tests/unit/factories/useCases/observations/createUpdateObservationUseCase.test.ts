import { describe, expect, it } from 'vitest';

import { createUpdateObservationUseCase } from '../../../../../src/factories/useCases/observations/createUpdateObservationUseCase';
import { UpdateObservationUseCase } from '../../../../../src/useCases/observations/UpdateObservationUseCase';

describe('createUpdateObservationUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createUpdateObservationUseCase).toBe('function');
  });

  it('should return an instance of UpdateObservationUseCase', () => {
    const useCase = createUpdateObservationUseCase();
    expect(useCase).toBeInstanceOf(UpdateObservationUseCase);
  });
});
