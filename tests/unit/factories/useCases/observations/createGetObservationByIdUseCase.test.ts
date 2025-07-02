import { describe, expect, it } from 'vitest';

import { createGetObservationByIdUseCase } from '../../../../../src/factories/useCases/observations/createGetObservationByIdUseCase';
import { GetObservationByIdUseCase } from '../../../../../src/useCases/observations/GetObservationByIdUseCase';

describe('createGetObservationByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGetObservationByIdUseCase).toBe('function');
  });

  it('should return an instance of GetObservationByIdUseCase', () => {
    const useCase = createGetObservationByIdUseCase();
    expect(useCase).toBeInstanceOf(GetObservationByIdUseCase);
  });
});
