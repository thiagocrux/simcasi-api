import { describe, expect, it } from 'vitest';

import { createCreateObservationUseCase } from '../../../../../src/factories/useCases/observations/createCreateObservationUseCase';
import { CreateObservationUseCase } from '../../../../../src/useCases/observations/CreateObservationUseCase';

describe('createCreateObservationUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createCreateObservationUseCase).toBe('function');
  });

  it('should return an instance of CreateObservationUseCase', () => {
    const useCase = createCreateObservationUseCase();
    expect(useCase).toBeInstanceOf(CreateObservationUseCase);
  });
});
