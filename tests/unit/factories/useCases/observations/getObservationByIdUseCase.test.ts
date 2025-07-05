import { describe, expect, it } from 'vitest';

import { getObservationByIdUseCase } from '../../../../../src/factories/useCases/observations/getObservationByIdUseCase';
import { GetObservationByIdUseCase } from '../../../../../src/useCases/observations/GetObservationByIdUseCase';

describe('getObservationByIdUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getObservationByIdUseCase).toBe('function');
  });

  it('should return an instance of GetObservationByIdUseCase', () => {
    const useCase = getObservationByIdUseCase();
    expect(useCase).toBeInstanceOf(GetObservationByIdUseCase);
  });
});
