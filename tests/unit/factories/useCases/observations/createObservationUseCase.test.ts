import { describe, expect, it } from 'vitest';

import { createObservationUseCase } from '../../../../../src/factories/useCases/observations/createObservationUseCase';
import { CreateObservationUseCase } from '../../../../../src/useCases/observations/CreateObservationUseCase';

describe('createObservationUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createObservationUseCase).toBe('function');
  });

  it('should return an instance of CreateObservationUseCase', () => {
    const useCase = createObservationUseCase();
    expect(useCase).toBeInstanceOf(CreateObservationUseCase);
  });
});
