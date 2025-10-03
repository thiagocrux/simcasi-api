import { describe, expect, it } from 'vitest';

import { getAllObservationsByPatientUseCase } from '../../../../../src/factories/useCases/observations/getAllObservationsByPatientUseCase';
import { GetAllObservationsByPatientUseCase } from '../../../../../src/useCases/observations/GetAllObservationsByPatientUseCase';

describe('getAllObservationsByPatientUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof getAllObservationsByPatientUseCase).toBe('function');
  });

  it('should return an instance of GetAllObservationsByPatientUseCase', () => {
    const useCase = getAllObservationsByPatientUseCase();
    expect(useCase).toBeInstanceOf(GetAllObservationsByPatientUseCase);
  });
});
